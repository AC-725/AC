/* Render a deterministic seek(t) Three.js scene to JPEG frames via headless Chromium.
 *
 *   node render.js <scene.html> <outdir> [fps]
 *   node render.js <scene.html> qa "0,1.2,2.6,3.4,4.2"
 *
 * Same window.__TOTAL / window.seek(t) contract as
 * skills/ac-studio/assets/render_frames.js, plus the WebGL flags that sandboxed
 * Chromium needs. Reads duration from window.__TOTAL.
 *
 * Two things this sandbox forced, both worth keeping:
 *   - WebGL only comes up under ANGLE/SwiftShader (software). Measured 5.8x
 *     realtime at 1080x1920, so a 4s beat costs ~23s of wall clock and zero credits.
 *   - three.module.min.js imports three.core.min.js. Vendor BOTH or the module
 *     fails silently with ERR_FILE_NOT_FOUND and the page renders black.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function findChrome() {
  const base = '/opt/pw-browsers';
  try {
    for (const d of fs.readdirSync(base)) {
      if (!d.startsWith('chromium-')) continue;
      const p = path.join(base, d, 'chrome-linux', 'chrome');
      if (fs.existsSync(p)) return p;
    }
  } catch (e) { /* let Playwright resolve */ }
  return undefined;
}

/* The three --use-gl/--use-angle/--enable-unsafe flags are NOT required for WebGL.
 * Measured 24 Aug 2026: this Chromium already defaults to ANGLE/SwiftShader, and the
 * same scene renders identically with and without them (~1,971 vs ~2,001 gold pixels,
 * i.e. antialiasing jitter). They are kept only to pin the backend explicitly so a
 * future Chromium that changes its default cannot alter output silently.
 * The black frames these were once credited with fixing came from a missing
 * three.core.min.js - see README item 1. */
const ARGS = [
  '--allow-file-access-from-files',
  '--use-gl=angle',
  '--use-angle=swiftshader',
  '--enable-unsafe-swiftshader',
  '--force-color-profile=srgb',
  '--font-render-hinting=none',
  '--no-sandbox',
];

(async () => {
  const scene = path.resolve(process.argv[2] || 'scenes/priority-1877.html');
  const outArg = process.argv[3] || 'out/frames';

  const browser = await chromium.launch({ executablePath: findChrome(), args: ARGS, timeout: 60000 });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });

  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

  await page.goto('file://' + scene, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForFunction('window.__READY===true', { timeout: 15000 });

  if (errors.length) {
    console.error('PAGE ERRORS:\n  ' + errors.slice(0, 5).join('\n  '));
    await browser.close();
    process.exit(1);
  }

  const total = await page.evaluate(() => window.__TOTAL);
  console.log('scene:', path.basename(scene), '| duration:', total + 's');

  if (outArg === 'qa') {
    const times = (process.argv[4] || '0,1,2,3,4').split(',').map(Number);
    const dir = path.resolve('out/qa');
    fs.mkdirSync(dir, { recursive: true });
    for (const t of times) {
      await page.evaluate(tt => window.seek(tt), t);
      const name = 'q_' + String(Math.round(t * 100)).padStart(5, '0') + '.png';
      await page.screenshot({ path: path.join(dir, name) });
      console.log('  qa', t + 's');
    }
  } else {
    const fps = Number(process.argv[4] || 30);
    const dir = path.resolve(outArg);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const n = Math.round(total * fps);
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate(tt => window.seek(tt), i / fps);
      await page.screenshot({
        path: path.join(dir, 'f' + String(i).padStart(5, '0') + '.jpg'),
        type: 'jpeg', quality: 95,
      });
      if (i % 30 === 0) process.stdout.write('  frame ' + i + '/' + n + '\r');
    }
    const el = (Date.now() - t0) / 1000;
    console.log(`\n  ${n} frames in ${el.toFixed(1)}s (${(el / total).toFixed(1)}x realtime)`);
  }

  await browser.close();
})().catch(e => { console.error('FAILED:', String(e).split('\n')[0]); process.exit(1); });
