/* Render a deterministic seek(t) HTML timeline to LOSSLESS PNG frames via headless Chromium.
 * Usage: node render_frames.js <html> <outdir> [fps] [tailSeconds]
 * Defaults: fps=60, tail=0.4. Reads window.__TOTAL for duration.
 * QA mode: node render_frames.js <html> qa "1,3.6,7.6,15,22,29"  (comma times -> qa/ frames)
 *
 * SMOOTHNESS (AC, 2026-08-24) — three changes, all in the frame-sequence path:
 *  1. fps 30 -> 60. Every type move, the odometer cascade and the continuous push-in
 *     travel a few px per frame on a 1080x1920 canvas; at 30fps that reads as judder.
 *     60 is what Instagram accepts and it is the single biggest win here.
 *  2. JPEG q95 -> PNG. The frames were a LOSSY intermediate that libx264 then encoded
 *     AGAIN, so every gradient took two lots of generation loss - which is what mushed
 *     the gold-on-black. PNG is lossless; the final encode is now the only one.
 *  3. A double requestAnimationFrame between seek() and the shutter. .el and .odc>i
 *     both declare will-change, which promotes them to compositor layers; with no
 *     forced commit a screenshot can capture the PREVIOUS frame's layer state, landing
 *     a duplicated or half-updated frame at random. That is the micro-stutter, and it
 *     is invisible in QA because QA shoots one frame at a time.
 * QA-mode filenames are DELIBERATELY unchanged: qa_filmstrip.sh (gate 7) parses
 * q_XXXX.png as tenths of a second, so renaming them silently corrupts the contact
 * sheet's timestamps.
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

// seek, then force a committed compositor frame before the shutter opens.
async function seekSettled(page,t){
  await page.evaluate(async(tt)=>{
    window.seek(tt);
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  }, t);
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
    for(const t of times){ await seekSettled(page,t);
      await page.screenshot({path:path.join(dir,'q_'+String(Math.round(t*10)).padStart(4,'0')+'.png')}); console.log('qa',t); }
  } else {
    const fps=Number(process.argv[4]||60), tail=Number(process.argv[5]||0.4);
    const dir=path.resolve(outArg); fs.mkdirSync(dir,{recursive:true});
    const nF=Math.round((total+tail)*fps);
    console.log('rendering',nF,'frames @',fps,'fps (PNG, lossless)');
    for(let i=0;i<nF;i++){ await seekSettled(page, i/fps);
      await page.screenshot({path:path.join(dir,'f'+String(i).padStart(5,'0')+'.png'), type:'png'});
      if(i%120===0) console.log('frame',i,'/',nF); }
    console.log('done frames:',nF);
  }
  await browser.close();
})();
