/* GATE 7 · figure-vs-copy clearance, sampled ACROSS TIME.
 *
 * Why this exists. Gates 1 and 2 freeze one settle moment per scene and measure
 * there. That is correct for static copy, which does not move once it lands, and
 * useless for the narrator figure, whose arms sweep through the caption lane
 * between those samples. Two defects got through before this script existed:
 * a chart label that only collided while wrapping, and the AC figure's
 * point-at-camera, which reached the first word of the subtitle at t=10.75 while
 * both earlier gates reported CLEAN.
 *
 * Method. For each sampled t, render twice from the SAME seek: once with the
 * figure hidden, once with the copy hidden. That yields two exact ink masks with
 * no guessing about which pixel belongs to whom. Then measure the true 2D
 * distance between them. A 1-D column test is not enough — an arm raised above
 * the cap line shares x with the text and clears it completely.
 *
 * Usage: node qa_figure.js <html> [minGap] [samplesPerSecond]
 *        defaults: minGap=14px, 12 samples/sec
 */
const path = require('path');
const PW = process.env.PW_MODULE || '/home/claude/.npm-global/lib/node_modules/playwright';
const { chromium } = require(PW);

const FILE = process.argv[2];
const MIN_GAP = parseFloat(process.argv[3] || '14');
const SPS = parseFloat(process.argv[4] || '12');
if (!FILE) { console.error('usage: node qa_figure.js <html> [minGap] [samplesPerSec]'); process.exit(2); }

/* Ink mask -> list of set pixels, downsampled by BIN so the distance test stays
 * cheap. BIN=4 means the reported gap is accurate to +/-4px, which is far finer
 * than any gap worth arguing about. */
const BIN = 4;

/* THREE passes, not two. The theme block, corner ticks and watermark are drawn
 * by neither the figure nor the copy, so they survive both hides and land in
 * both masks — which made every sample report a 0px gap on the first run. The
 * baseline pass hides figure AND copy, and is subtracted from both. */
function grid(buf, W, H) {
  const gw = Math.ceil(W / BIN), gh = Math.ceil(H / BIN);
  const g = new Uint8Array(gw * gh);
  for (let y = 0, gy = 0; y < H; y += BIN, gy++) {
    for (let x = 0, gx = 0; x < W; x += BIN, gx++) {
      if (buf[y * W + x] > 70) g[gy * gw + gx] = 1;
    }
  }
  g.gw = gw; g.gh = gh;
  return g;
}
function subtract(a, base) {           // a AND NOT base, dilated by one cell so
  const out = [];                      // antialiasing on a shared edge cannot
  const gw = a.gw, gh = a.gh;          // leak through as a phantom point
  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      if (!a[gy * gw + gx]) continue;
      let near = false;
      for (let dy = -1; dy <= 1 && !near; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const ny = gy + dy, nx = gx + dx;
          if (ny < 0 || nx < 0 || ny >= gh || nx >= gw) continue;
          if (base[ny * gw + nx]) { near = true; break; }
        }
      if (!near) out.push([gx * BIN, gy * BIN]);
    }
  }
  return out;
}

/* min distance between two point sets, with an early exit once we are under the
 * threshold — we only care whether it clears, not the exact number when it fails */
function minDist(a, b, floor) {
  let best = Infinity;
  for (const [ax, ay] of a) {
    for (const [bx, by] of b) {
      const dx = ax - bx, dy = ay - by;
      const d2 = dx * dx + dy * dy;
      if (d2 < best) { best = d2; if (best <= floor * floor) return Math.sqrt(best); }
    }
  }
  return Math.sqrt(best);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(FILE));
  await page.waitForFunction(() => document.title === 'ready');

  const total = await page.evaluate(() => window.__TOTAL);
  const hasFig = await page.evaluate(() => !!document.querySelector('.acfig'));
  if (!hasFig) { console.log('gate 7 · figure clearance\nSKIP — no figure in this render'); await browser.close(); return; }

  // grayscale grabber: draw the screenshot into a canvas in-page would need a
  // round trip, so instead we read pixels straight out of a PNG via sharp-free
  // decoding in the page itself.
  await page.addScriptTag({ content: `
    window.__gray = async function(hide){
      const s = document.createElement('style'); s.id='__qa'; s.textContent = hide; document.head.appendChild(s);
      return true;
    };
    window.__unhide = function(){ const e=document.getElementById('__qa'); if(e) e.remove(); };
  `});

  async function grayAt(t, hideCss) {
    await page.evaluate(([tt, css]) => {
      const old = document.getElementById('__qa'); if (old) old.remove();
      const s = document.createElement('style'); s.id = '__qa'; s.textContent = css;
      document.head.appendChild(s);
      window.seek(tt);
    }, [t, hideCss]);
    const png = await page.screenshot({ type: 'png' });
    // decode with the page's own ImageDecoder-free path: use sharp if present,
    // else fall back to pngjs which ships with playwright's deps
    return png;
  }

  // decode PNG -> grayscale Uint8Array
  let decode;
  try {
    const sharp = require('sharp');
    decode = async (png) => {
      const { data, info } = await sharp(png).greyscale().raw().toBuffer({ resolveWithObject: true });
      return { buf: data, W: info.width, H: info.height };
    };
  } catch (e) {
    const { PNG } = require(path.join(PW, '..', 'pngjs')) || require('pngjs');
    decode = async (png) => {
      const p = PNG.sync.read(png);
      const g = new Uint8Array(p.width * p.height);
      for (let i = 0; i < g.length; i++) {
        g[i] = (p.data[i * 4] * 0.299 + p.data[i * 4 + 1] * 0.587 + p.data[i * 4 + 2] * 0.114) | 0;
      }
      return { buf: g, W: p.width, H: p.height };
    };
  }

  const HIDE_FIG = '.acfig{visibility:hidden !important;}';
  const HIDE_COPY = '#scenes,#subline{visibility:hidden !important;}';
  const HIDE_BOTH = '.acfig,#scenes,#subline{visibility:hidden !important;}';

  const step = 1 / SPS;
  const rows = [];
  let worst = { gap: Infinity, t: -1 };

  for (let t = 0; t <= total + 1e-9; t += step) {
    const tt = Math.min(total, +t.toFixed(3));
    const b = await decode(await grayAt(tt, HIDE_BOTH));
    const c = await decode(await grayAt(tt, HIDE_FIG));
    const f = await decode(await grayAt(tt, HIDE_COPY));
    const base = grid(b.buf, b.W, b.H);
    const cp = subtract(grid(c.buf, c.W, c.H), base);
    const fp = subtract(grid(f.buf, f.W, f.H), base);
    if (!cp.length || !fp.length) continue;
    const gap = minDist(fp, cp, MIN_GAP);
    rows.push({ t: tt, gap });
    if (gap < worst.gap) worst = { gap, t: tt };
  }

  console.log('gate 7 · figure-vs-copy clearance  (' + rows.length + ' samples @ ' + SPS + '/s, min ' + MIN_GAP + 'px)');
  const bad = rows.filter(r => r.gap < MIN_GAP);
  if (bad.length) {
    for (const b of bad.slice(0, 20)) {
      console.log('  TIGHT  t=' + b.t.toFixed(2) + 's  gap ' + b.gap.toFixed(0) + 'px');
    }
    if (bad.length > 20) console.log('  ... and ' + (bad.length - 20) + ' more');
    console.log('\nFAIL — figure ink comes within ' + worst.gap.toFixed(0) + 'px of copy at t=' + worst.t.toFixed(2) + 's');
    await browser.close(); process.exit(1);
  }
  console.log('CLEAN — tightest gap ' + worst.gap.toFixed(0) + 'px at t=' + worst.t.toFixed(2) + 's');
  await browser.close();
})().catch(e => { console.error(e); process.exit(2); });
