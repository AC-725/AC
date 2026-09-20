/* GATE — ac-wins.com intro. Seek-driven, so it measures the exact frame it
   reports. Two things at once:
     FIT   · at settle the mark's worst bbox corner must clear the ring stroke
     CLEAR · in NO frame may the mark touch live intro copy
   Requires the page to expose window.acIntroSeek(ms) and window.acIntroBBox().
   Usage: NODE_PATH=/opt/node22/lib/node_modules node qa_intro.js /abs/page.html */
const {chromium}=require('playwright');
const PAGE=process.argv[2];
if(!PAGE){console.error('usage: qa_intro.js /abs/path/page.html');process.exit(2);}
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',
    args:['--allow-file-access-from-files','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  const p=await b.newPage({viewport:{width:1200,height:760},deviceScaleFactor:1});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+PAGE,{waitUntil:'domcontentloaded'});
  /* AC's page dismisses its own overlay on a wall-clock timer. We are seeking,
     not playing, so pin the overlay open for the length of the check. */
  await p.evaluate(()=>{
    const orig=Node.prototype.removeChild;
    Node.prototype.removeChild=function(n){ return (n&&n.id==='intro')?n:orig.call(this,n); };
    window.__pin=()=>{const i=document.getElementById('intro');
      if(!i) return; i.classList.remove('done');
      i.style.display='flex'; i.style.opacity='1';
      document.documentElement.classList.remove('intro-seen');};
    window.__pin();
  });
  await p.waitForFunction(()=>!!window.acIntroSeek,null,{timeout:20000})
    .catch(()=>{throw new Error('page never exposed acIntroSeek — is the module loading?');});

  const hits=[]; let fitWorst=null;
  for(let t=0;t<=4400;t+=40){
    const r=await p.evaluate(ms=>{
      window.__pin(); window.acIntroSeek(ms);
      const bb=window.acIntroBBox&&window.acIntroBBox(); if(!bb) return null;
      const ring=document.querySelector('.intro-logo').getBoundingClientRect();
      const cx=ring.left+ring.width/2, cy=ring.top+ring.height/2, R=ring.width/2;
      let worst=0;[[bb.x0,bb.y0],[bb.x1,bb.y0],[bb.x0,bb.y1],[bb.x1,bb.y1]]
        .forEach(([x,y])=>{const d=Math.hypot(x-cx,y-cy); if(d>worst)worst=d;});
      const out=[];
      document.querySelectorAll('#intro .intro-greet, #intro .intro-quote, #intro .intro-greet span, #intro .intro-quote span')
        .forEach(e=>{
          if((+getComputedStyle(e).opacity)<0.05) return;
          const q=e.getBoundingClientRect(); if(q.width<2||q.height<2) return;
          const ox=Math.min(bb.x1,q.right)-Math.max(bb.x0,q.left);
          const oy=Math.min(bb.y1,q.bottom)-Math.max(bb.y0,q.top);
          if(ox>0&&oy>0) out.push({txt:(e.textContent||'').trim().slice(0,24),ov:[Math.round(ox),Math.round(oy)]});
        });
      return {clear:Math.round(R-worst), hits:out};
    },t);
    if(!r) continue;
    if(t>=2800&&t<=3500) fitWorst=fitWorst===null?r.clear:Math.min(fitWorst,r.clear);
    r.hits.forEach(o=>hits.push({t,...o}));
  }
  errs.forEach(e=>console.log('PAGEERROR:',e));
  let bad=errs.length>0;
  if(fitWorst===null){ console.log('FIT   FAIL — no mark present at settle (2.8–3.5s)'); bad=true; }
  else if(fitWorst<=0){ console.log(`FIT   FAIL — mark crosses the ring by ${-fitWorst}px at settle`); bad=true; }
  else console.log(`FIT   PASS — ${fitWorst}px clear of the ring through the whole hold`);
  if(!hits.length) console.log('CLEAR PASS — the mark never touches live intro copy');
  else{ bad=true; console.log('CLEAR FAIL —',hits.length,'overlapping samples');
    const seen=new Set();
    hits.forEach(h=>{if(seen.has(h.txt))return;seen.add(h.txt);
      console.log(`  t=${h.t}ms "${h.txt}" overlap ${h.ov[0]}x${h.ov[1]}px`);});}
  await b.close();
  process.exit(bad?1:0);
})();
