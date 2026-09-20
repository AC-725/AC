/* Per-element ink capture. For each scene at its settled time we shoot a reference
   with all content hidden, then one frame per element with only that element shown.
   Diffing gives each element's true GLYPH ink, which is what actually collides. */
const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
function findChrome(){ const b='/opt/pw-browsers';
  for(const d of fs.readdirSync(b)) if(d.startsWith('chromium-')){const p=path.join(b,d,'chrome-linux','chrome'); if(fs.existsSync(p))return p;} }

(async()=>{
  const outdir=process.argv[2]; fs.mkdirSync(outdir,{recursive:true});
  const browser=await chromium.launch({executablePath:findChrome(),
    args:['--force-color-profile=srgb','--font-render-hinting=none','--allow-file-access-from-files']});
  const page=await browser.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  const manifest=[];
  for(const f of process.argv.slice(3)){
    const tag=path.basename(f,'.html').replace(/^_/,'');
    await page.goto('file://'+path.resolve(f),{waitUntil:'load'});
    await page.evaluate(async()=>{await document.fonts.ready;});
    await page.waitForTimeout(250);
    // settle times are read from the page's own SCENES array, so this works
    // for either engine without being told the timeline
    const SETTLED=await page.evaluate(()=>Object.fromEntries(
      SCENES.map(s=>[s.id, +(s.start + s.dur*0.55).toFixed(2)])));
    for(const [sid,t] of Object.entries(SETTLED)){
      const names=await page.evaluate(({sid,t})=>{
        window.seek(t);
        const sc=document.getElementById(sid); if(!sc) return [];
        /* Measure the scene UNTRANSFORMED. This gate works by diffing a one-element
           screenshot against an all-hidden reference, and a fractional scale() on the
           scene promotes it to a composited layer whose rasterisation differs between
           the two shots — every element's mask then bleeds across the whole scene and
           the gate reports every pair overlapping every pair. (Seen 2026-08-14 when the
           scene push-in landed: 10 false overlaps in scene A, all of scene A.)
           Neutralising the transform is sound, not a workaround: the scene transform is
           a UNIFORM scale about the centre, which multiplies every gap by the same
           factor. It can widen clearance, never narrow it, so clearance measured at
           scale 1 is the worst case. Anything non-uniform must be measured directly. */
        sc.style.transform='none';
        const CLS=n=>(typeof n.className==='string'?n.className:(n.getAttribute&&n.getAttribute('class'))||n.tagName||'el');
        window.__K=[...sc.children].filter(n=>{const r=n.getBoundingClientRect();
          return r.height>2 && r.width>2;});
        window.__K.forEach(n=>n.style.visibility='hidden');
        return window.__K.map((n,i)=>String(CLS(n)).trim().replace(/\s+/g,'-')+'#'+i);
      },{sid,t});
      if(!names.length) continue;
      await page.screenshot({path:path.join(outdir,`${tag}_${sid}_REF.png`)});
      for(let i=0;i<names.length;i++){
        await page.evaluate(i=>{window.__K.forEach((n,j)=>n.style.visibility=(j===i)?'visible':'hidden');},i);
        await page.screenshot({path:path.join(outdir,`${tag}_${sid}_E${i}.png`)});
      }
      manifest.push({tag,scene:sid,names});
    }
  }
  fs.writeFileSync(path.join(outdir,'manifest.json'),JSON.stringify(manifest));
  await browser.close();
  console.log('captured',manifest.length,'scenes');
})();
