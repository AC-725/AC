/* Render the deck engine's slides to PNG.
 * Usage: node render_slides.js <html> <outdir> <prefix> [theme] [look]
 * Writes <outdir>/<prefix>_01.png ... one per CONTENT entry (1080x1350).
 */
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');

function findChrome(){
  const c=[];
  try{ const base='/opt/pw-browsers';
    for(const d of fs.readdirSync(base)){ if(d.startsWith('chromium-')){ const p=path.join(base,d,'chrome-linux','chrome'); if(fs.existsSync(p))c.push(p);} }
  }catch(e){}
  return c[0];
}

(async () => {
  const html = path.resolve(process.argv[2]);
  const outdir = path.resolve(process.argv[3] || 'slides');
  const prefix = process.argv[4] || 'slide';
  const theme = process.argv[5];
  const look  = process.argv[6];
  const card  = process.argv[7];   // 'card' | 'terminal' | 'ledger' (prompt slides)
  fs.mkdirSync(outdir, {recursive:true});

  const browser = await chromium.launch({ executablePath: findChrome(),
    args:['--force-color-profile=srgb','--font-render-hinting=none','--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:1 });
  await page.goto('file://'+html, {waitUntil:'load'});
  await page.evaluate(async()=>{await document.fonts.ready;});
  if (theme) await page.evaluate(t=>{ CONFIG.theme=t; }, theme);
  if (look)  await page.evaluate(l=>{ CONFIG.look=l; }, look);
  if (card)  await page.evaluate(c=>{ CONFIG.card=c; }, card);
  const n = await page.evaluate(()=>window.__SLIDES);

  for(let i=0;i<n;i++){
    await page.evaluate(k=>window.renderSlide(k), i);
    await page.waitForTimeout(60);
    const f = path.join(outdir, prefix+'_'+String(i+1).padStart(2,'0')+'.png');
    await page.screenshot({path:f});
    console.log('slide', i+1, '->', f);
  }
  await browser.close();
})();
