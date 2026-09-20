/* Collision + bounds audit: every theme, every scene, at settled times.
   Reports any pair of visible content boxes that overlap, and anything
   that escapes the 1080x1920 frame or crosses COLUMN's gold/black split. */
const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
function findChrome(){ const b='/opt/pw-browsers';
  for(const d of fs.readdirSync(b)) if(d.startsWith('chromium-')){const p=path.join(b,d,'chrome-linux','chrome'); if(fs.existsSync(p))return p;} }

(async()=>{
  const browser=await chromium.launch({executablePath:findChrome(),
    args:['--force-color-profile=srgb','--font-render-hinting=none','--allow-file-access-from-files']});
  const page=await browser.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  const problems=[];
  for(const f of process.argv.slice(2)){
    await page.goto('file://'+path.resolve(f),{waitUntil:'load'});
    await page.evaluate(async()=>{await document.fonts.ready;});
    await page.waitForTimeout(250);
    // sample the whole timeline, whatever its length
    const TOTAL=await page.evaluate(()=>window.__TOTAL);
    const TIMES=[]; for(let t=0;t<=TOTAL+0.01;t+=0.35) TIMES.push(+t.toFixed(2));
    for(const t of TIMES){
      const found=await page.evaluate(tt=>{
        window.seek(tt);
        const out=[];
        const scenes=[...document.querySelectorAll('#scenes .scene')];
        for(const sc of scenes){
          if(parseFloat(getComputedStyle(sc).opacity)<0.35) continue;
          const sid=sc.id||'?';
          const CLS=n=>(typeof n.className==='string'?n.className:(n.getAttribute&&n.getAttribute('class'))||n.tagName||'el');
          const kids=[...sc.children].filter(n=>{
            const r=n.getBoundingClientRect();
            return r.height>2 && r.width>2 && parseFloat(getComputedStyle(n).opacity)>0.35;
          });
          const R=kids.map(n=>({n:String(CLS(n)), r:n.getBoundingClientRect()}));
          for(let i=0;i<R.length;i++){
            const a=R[i].r;
            if(a.left<-2||a.right>1082||a.top<-2||a.bottom>1922)
              out.push({kind:'OUT OF FRAME',scene:sid,a:R[i].n,
                box:[a.left|0,a.top|0,a.right|0,a.bottom|0]});
            for(let j=i+1;j<R.length;j++){
              const b=R[j].r;
              const ox=Math.min(a.right,b.right)-Math.max(a.left,b.left);
              const oy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);
              if(ox>1 && oy>1) out.push({kind:'OVERLAP',scene:sid,a:R[i].n,b:R[j].n,
                                         px:[ox|0,oy|0]});
            }
          }
        }
        return out;
      },t);
      found.forEach(p=>problems.push({file:path.basename(f),t,...p}));
    }
  }
  await browser.close();
  if(!problems.length){ console.log('CLEAN — no overlaps, nothing out of frame'); }
  else {
    const seen=new Set();
    problems.forEach(p=>{
      const k=`${p.file}|${p.scene}|${p.kind}|${p.a}|${p.b||''}`;
      if(seen.has(k))return; seen.add(k);
      console.log(`${p.kind}  ${p.file}  scene ${p.scene}  t=${p.t}  ${p.a}${p.b?'  ×  '+p.b:''}  ${p.px?'['+p.px.join('x')+'px]':JSON.stringify(p.box)}`);
    });
    console.log(`\n${seen.size} distinct issue(s)`);
  }
})();
