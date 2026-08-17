/* Per-slide layout audit for the DECK engine.
 * ac-studio's qa_layout.sh gate 2 reads SCENES, a reel-template global, so it
 * dies on a deck. This walks every slide in every requested card style and
 * checks the two things that actually break a carousel:
 *   1. nothing leaves the safe frame
 *   2. no two visible text blocks overlap (measured on GLYPH INK, not boxes,
 *      so a descender cannot sit on the line below)
 * Usage: node qa_deck.js <html> [theme] [look] [card,card,...]
 */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

const SAFE = { x0: 44, y0: 44, x1: 1036, y1: 1306 };
const TARGETS = ['.kicker', '#iconwrap', '.word', '.sub', '.pkick', '.pchip',
                 '.ptitle', '.pcard', '.pback', '#wm', '#step'];

function findChrome(){
  try{ for(const d of fs.readdirSync('/opt/pw-browsers')) if(d.startsWith('chromium-')){
    const p = path.join('/opt/pw-browsers', d, 'chrome-linux', 'chrome');
    if(fs.existsSync(p)) return p; } }catch(e){}
}

(async () => {
  const html  = path.resolve(process.argv[2]);
  const theme = process.argv[3] || 'crest';
  const look  = process.argv[4] || 'dark';
  const cards = (process.argv[5] || 'card,terminal,ledger').split(',');

  const browser = await chromium.launch({ executablePath: findChrome(),
    args:['--force-color-profile=srgb','--font-render-hinting=none','--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:1 });
  await page.goto('file://'+html, {waitUntil:'load'});
  await page.evaluate(async()=>{ await document.fonts.ready; });

  let fails = 0, checked = 0;
  for (const card of cards) {
    await page.evaluate(([t,l,c])=>{ CONFIG.theme=t; CONFIG.look=l; CONFIG.card=c; }, [theme,look,card]);
    const n = await page.evaluate(()=>window.__SLIDES);

    for (let i = 0; i < n; i++) {
      await page.evaluate(k=>window.renderSlide(k), i);
      await page.waitForTimeout(50);

      // Measure INK, not boxes: walk text nodes and union their client rects.
      const boxes = await page.evaluate((sels)=>{
        const out = [];
        for (const sel of sels) {
          const el = document.querySelector(sel);
          if (!el) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || !el.getClientRects().length) continue;
          let r = null;
          const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          const rng = document.createRange();
          for (let t = walk.nextNode(); t; t = walk.nextNode()) {
            if (!t.nodeValue.trim()) continue;
            rng.selectNodeContents(t);
            for (const b of rng.getClientRects()) {
              if (b.width < 1 || b.height < 1) continue;
              r = r ? {x0:Math.min(r.x0,b.left), y0:Math.min(r.y0,b.top),
                       x1:Math.max(r.x1,b.right), y1:Math.max(r.y1,b.bottom)}
                    : {x0:b.left, y0:b.top, x1:b.right, y1:b.bottom};
            }
          }
          // no text (icon/card chrome): fall back to the element box
          if (!r) { const b = el.getBoundingClientRect();
            if (b.width < 1 || b.height < 1) continue;
            r = {x0:b.left, y0:b.top, x1:b.right, y1:b.bottom}; }
          out.push({ sel, ...r });
        }
        return out;
      }, TARGETS);

      const tag = `${card}/slide ${i+1}`;
      for (const b of boxes) {
        checked++;
        if (b.x0 < SAFE.x0-0.5 || b.y0 < SAFE.y0-0.5 || b.x1 > SAFE.x1+0.5 || b.y1 > SAFE.y1+0.5) {
          console.log(`FAIL  ${tag}  ${b.sel} leaves the safe frame ` +
            `(${b.x0.toFixed(0)},${b.y0.toFixed(0)})-(${b.x1.toFixed(0)},${b.y1.toFixed(0)})`);
          fails++;
        }
      }
      for (let a = 0; a < boxes.length; a++) for (let b = a+1; b < boxes.length; b++) {
        const A = boxes[a], B = boxes[b];
        // .pcard legitimately contains .ptext ink; skip container/child pairs
        if (A.sel === '.pcard' || B.sel === '.pcard') {
          const inner = A.sel === '.pcard' ? B : A, outer = A.sel === '.pcard' ? A : B;
          if (inner.x0 >= outer.x0-2 && inner.x1 <= outer.x1+2 &&
              inner.y0 >= outer.y0-2 && inner.y1 <= outer.y1+2) continue;
        }
        const ox = Math.min(A.x1,B.x1) - Math.max(A.x0,B.x0);
        const oy = Math.min(A.y1,B.y1) - Math.max(A.y0,B.y0);
        if (ox > 0 && oy > 0) {
          console.log(`FAIL  ${tag}  ${A.sel} overlaps ${B.sel} by ${ox.toFixed(0)}x${oy.toFixed(0)}px`);
          fails++;
        }
      }
    }
  }
  await browser.close();
  console.log(fails ? `\n${fails} FAILURE(S) across ${checked} measured blocks`
                    : `\nCLEAN - ${checked} blocks measured, nothing overlapping, nothing out of frame`);
  process.exit(fails ? 1 : 0);
})();
