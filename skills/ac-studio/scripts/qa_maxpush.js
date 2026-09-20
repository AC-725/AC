// gate 4b · bounds at MAXIMUM scene push-in.
// Gates 1 and 6 sample each scene at 0.55*dur, where the push-in is only part way in.
// This seeks to just before each scene's END, where the 3% push is full, and re-checks the
// frame, the app-safe window and the margin rail. Added 2026-08-14 (Day 30) with the push-in.
// usage: node qa_maxpush.js [reel.html]
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+path.resolve(process.argv[2]||'reel.html'),{waitUntil:'load'});
await p.evaluate(async()=>{await document.fonts.ready;});await p.waitForTimeout(300);
const bad=await p.evaluate(()=>{
  const out=[];
  SCENES.forEach(s=>{
    const t=s.start+s.dur-0.02; window.seek(t);
    const sc=document.getElementById(s.id); if(!sc)return;
    [...sc.children].forEach(n=>{
      const r=n.getBoundingClientRect(); if(r.height<2||r.width<2)return;
      const cls=(typeof n.className==='string'?n.className:'el');
      if(r.left<46||r.right>1034||r.top<46||r.bottom>1874)
        out.push(`FRAME  ${s.id} ${cls} L${r.left.toFixed(0)} R${r.right.toFixed(0)} T${r.top.toFixed(0)} B${r.bottom.toFixed(0)}`);
      if(r.top<170||r.bottom>1300)
        out.push(`SAFE   ${s.id} ${cls} T${r.top.toFixed(0)} B${r.bottom.toFixed(0)}`);
      if(r.top>960&&r.right>930)
        out.push(`RAIL   ${s.id} ${cls} R${r.right.toFixed(0)}`);
    });
  });
  return out;
});
console.log(bad.length?bad.join('\n'):'CLEAN at max push — every element inside frame, app-safe window and rail');
await b.close();})();
