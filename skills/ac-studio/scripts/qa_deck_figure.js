// gate · figure-vs-copy clearance on DECK beat slides.
// usage: node qa_deck_figure.js [deck.html]   (run from the deck's directory)
// Added 2026-08-15. qa_deck.js measures TEXT blocks against each other, so the AC
// figure in #charzone was invisible to it: the first build had the cover's sub
// running 88px THROUGH him and qa_deck reported CLEAN on all 42 blocks. Same blind
// spot that produced gate 7 on the reel engine. A gate only sees what it was told
// to look at, and every new element on the canvas needs its own check or it is
// unmeasured. Minimum acceptable gap is 14px, matching gate 7.
// figure-vs-copy clearance on deck beat slides. qa_deck measures TEXT blocks only,
// so the character in #charzone was invisible to it — same blind spot that produced
// gate 7 on the reel engine. This renders each beat slide twice (figure hidden /
// text hidden) and measures the real gap between their ink.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
await p.goto('file://'+path.resolve(process.argv[2]||'deck.html'),{waitUntil:'load'});
await p.evaluate(async()=>{await document.fonts.ready;});
const n=await p.evaluate(()=>CONTENT.length);
for(let i=0;i<n;i++){
  const isBeat=await p.evaluate(i=>{renderSlide(i);return !CONTENT[i].type;},i);
  if(!isBeat) continue;
  await p.waitForTimeout(120);
  const r=await p.evaluate(()=>{
    const f=document.querySelector('#charzone .acfig');
    if(!f||getComputedStyle(f).display==='none') return null;
    const fr=f.getBoundingClientRect();
    let worst=1e9, who='';
    document.querySelectorAll('.kicker,#iconwrap,.word,.sub,#wm,#step').forEach(el=>{
      const t=el.getBoundingClientRect();
      if(t.width<2||t.height<2) return;
      const ox=Math.min(fr.right,t.right)-Math.max(fr.left,t.left);
      const oy=Math.min(fr.bottom,t.bottom)-Math.max(fr.top,t.top);
      if(ox>0&&oy>0){ if(-Math.min(ox,oy)<worst){worst=-Math.min(ox,oy);who=el.className||el.id;} }
      else { const gx=ox>0?0:-ox, gy=oy>0?0:-oy; const d=Math.hypot(gx,gy);
             if(d<worst){worst=d;who=el.className||el.id;} }
    });
    return {slide:0, fig:[fr.left|0,fr.top|0,fr.right|0,fr.bottom|0], gap:Math.round(worst), who};
  });
  if(r) console.log(`slide ${i+1}  fig[L${r.fig[0]} T${r.fig[1]} R${r.fig[2]} B${r.fig[3]}]  gap ${r.gap}px  vs ${r.who}` + (r.gap<14?'   <-- TOO TIGHT':''));
}
await b.close();})();
