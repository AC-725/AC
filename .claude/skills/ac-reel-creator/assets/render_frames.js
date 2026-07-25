/* Render a deterministic seek(t) HTML timeline to JPEG frames via headless Chromium.
 * Usage: node render_frames.js <html> <outdir> [fps] [tailSeconds]
 * Defaults: fps=30, tail=0.4. Reads window.__TOTAL for duration.
 * QA mode: node render_frames.js <html> qa "1,3.6,7.6,15,22,29"  (comma times -> qa/ frames)
 */
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');

// Try common Chromium locations (this sandbox pins one under /opt/pw-browsers).
function findChrome(){
  const c=['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'];
  try{ const base='/opt/pw-browsers';
    for(const d of fs.readdirSync(base)){ if(d.startsWith('chromium-')){ const p=path.join(base,d,'chrome-linux','chrome'); if(fs.existsSync(p))c.unshift(p);} }
  }catch(e){}
  for(const p of c){ if(fs.existsSync(p)) return p; }
  return undefined; // let Playwright resolve
}

(async () => {
  const html = path.resolve(process.argv[2] || 'reel.template.html');
  const outArg = process.argv[3] || 'frames';
  const exe = findChrome();
  const browser = await chromium.launch({ executablePath: exe,
    args:['--force-color-profile=srgb','--font-render-hinting=none','--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport:{width:1080,height:1920}, deviceScaleFactor:1 });
  await page.goto('file://'+html, {waitUntil:'load'});
  await page.evaluate(async()=>{await document.fonts.ready;});
  await page.waitForTimeout(300);
  const total = await page.evaluate(()=>window.__TOTAL);
  console.log('TOTAL', total);

  if (outArg === 'qa') {
    const times = (process.argv[4]||'1,3.6,7.6,11,15.5,19,22.5,26,29.5').split(',').map(Number);
    const dir=path.resolve('qa'); fs.mkdirSync(dir,{recursive:true});
    for(const t of times){ await page.evaluate(tt=>window.seek(tt),t); await page.waitForTimeout(50);
      await page.screenshot({path:path.join(dir,'q_'+String(Math.round(t*10)).padStart(4,'0')+'.png')}); console.log('qa',t); }
  } else {
    const fps=Number(process.argv[4]||30), tail=Number(process.argv[5]||0.4);
    const dir=path.resolve(outArg); fs.mkdirSync(dir,{recursive:true});
    const nF=Math.round((total+tail)*fps);
    console.log('rendering',nF,'frames @',fps,'fps');
    for(let i=0;i<nF;i++){ await page.evaluate(tt=>window.seek(tt), i/fps);
      await page.screenshot({path:path.join(dir,'f'+String(i).padStart(5,'0')+'.jpg'), type:'jpeg', quality:95});
      if(i%80===0) console.log('frame',i,'/',nF); }
    console.log('done frames:',nF);
  }
  await browser.close();
})();
