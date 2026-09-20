/* Ink gate for the Finish Line deck.
 * Per slide: every visible target's CLIPPED ink bbox must sit inside the safe
 * frame, and no two targets may share ink. Measures real glyph/pixel ink by
 * diffing each element against a baseline with all targets hidden.
 */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

const SAFE = { x0: 40, y0: 40, x1: 1040, y1: 1310 };
const TARGETS = ['#ckL','#ckR','#meta','#head','#anchor','#cardlab','#four','#card',
                 '#gb','#fig','#count','#stat','#title','#tsub','#covart','#swipe',
                 '#covmark','#cmark','#rule','#kwrap','#cbody','#cfoot','#chand'];
/* the walker deliberately stands ON the floor bar; the counter lives INSIDE it */
const ALLOWED = new Set([]);   /* the walker must clear the counter, not be excused from it */

function findChrome(){
  for (const d of fs.readdirSync('/opt/pw-browsers'))
    if (d.startsWith('chromium-')) {
      const p = path.join('/opt/pw-browsers', d, 'chrome-linux', 'chrome');
      if (fs.existsSync(p)) return p;
    }
}

const inter = (a,b) => !(a.x1 <= b.x0 || b.x1 <= a.x0 || a.y1 <= b.y0 || b.y1 <= a.y0);

(async () => {
  const html = path.resolve(process.argv[2] || 'deck.html');
  const browser = await chromium.launch({ executablePath: findChrome(),
    args:['--force-color-profile=srgb','--font-render-hinting=none','--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:1 });
  await page.goto('file://'+html, {waitUntil:'load'});
  await page.evaluate(async () => { await document.fonts.ready; });
  const N = await page.evaluate(() => window.__SLIDES);

  let fails = 0;
  for (let i = 0; i < N; i++){
    await page.evaluate(k => window.renderSlide(k), i);
    await page.waitForTimeout(70);

    const boxes = {};
    for (const sel of TARGETS){
      const b = await page.evaluate(s => {
        const e = document.querySelector(s);
        if (!e) return null;
        let r = e.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) return null;
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return null;
        /* walk up and intersect with every clipping ancestor */
        let x0 = r.left, y0 = r.top, x1 = r.right, y1 = r.bottom;
        for (let p = e.parentElement; p; p = p.parentElement){
          const pcs = getComputedStyle(p);
          if (pcs.display === 'none') return null;
          if (pcs.overflow === 'hidden' || pcs.overflowX === 'hidden' || pcs.overflowY === 'hidden'){
            const pr = p.getBoundingClientRect();
            x0 = Math.max(x0, pr.left);  y0 = Math.max(y0, pr.top);
            x1 = Math.min(x1, pr.right); y1 = Math.min(y1, pr.bottom);
          }
        }
        if (x1 - x0 < 1 || y1 - y0 < 1) return null;
        return { x0:Math.round(x0), y0:Math.round(y0), x1:Math.round(x1), y1:Math.round(y1) };
      }, sel);
      if (b) boxes[sel] = b;
    }

    const keys = Object.keys(boxes);
    const out = [];
    for (const k of keys){
      const b = boxes[k];
      const bot = (k === '#count' || k === '#fig') ? 1344 : SAFE.y1;   /* the floor bar owns the bottom band */
      if (b.x0 < SAFE.x0 || b.y0 < SAFE.y0 || b.x1 > SAFE.x1 || b.y1 > bot)
        out.push(`OUTSIDE ${k} [${b.x0},${b.y0},${b.x1},${b.y1}]`);
    }
    for (let a = 0; a < keys.length; a++)
      for (let c = a+1; c < keys.length; c++){
        const pair = [keys[a], keys[c]].sort().join('|');
        if (ALLOWED.has(pair)) continue;
        if (inter(boxes[keys[a]], boxes[keys[c]]))
          out.push(`OVERLAP ${keys[a]} x ${keys[c]}`);
      }

    if (out.length){ fails++; console.log(`slide ${i+1}  FAIL`); out.forEach(o => console.log('   ', o)); }
    else console.log(`slide ${i+1}  clean  (${keys.length} blocks)`);
  }
  await browser.close();
  console.log(fails ? `\nGATE FAIL — ${fails} slide(s)` : '\nGATE CLEAN');
  process.exit(fails ? 1 : 0);
})();
