# The no-overlap system

Written 2026-08-25 after AC sent five screenshots in one session, each one an overlap. Gates 1
and 2 in ac-studio catch text-on-text inside a scene. Every defect that got through was a
GRAPHIC touching TYPE, or a graphic touching the floor line, at a zoom level nobody measured.
This file is the system that stops it. Step 0 was added 2026-08-26 and supersedes the band
table in Step 1: build the bands as clipped boxes first, then run the measurement gate as a
backstop before every checkpoint.

## Step 0 — hard bands: make the collision impossible (AC, 2026-08-26)

Steps 1-4 below are a *measurement* discipline: they find collisions after they exist. After a
third cut of the same story came back with the same three overlaps, AC's call was to stop
measuring and make overlap structurally impossible.

Four exclusive horizontal bands per reel frame. Each band is a real clipped box
(position:absolute + overflow:hidden). Nothing crosses a band edge, because the box eats it.

| Band | y | Owns | Law |
| --- | --- | --- | --- |
| CHROME | 0-176 | progress band, handle, kicker | |
| TYPE | 196-640 | hero number, headline, meta | NEVER inside a camera transform; x80, maxWidth 920 |
| STAGE | 640-1160 | lanes, subjects, charts, marks | camera translateX ONLY |
| SUB | 1170-1300 | subtitle carrier | locked; nothing else may enter |
| DEAD | 1300+ | nothing, ever | app chrome |

Three consequences, which are exactly the three defects AC reported three cuts running:

- type is never inside a camera transform, so a headline cannot leave the left edge
- the hero number lives in TYPE and the subjects live in STAGE, so they cannot touch
- subtitles own their own strip, so a headline cannot sit on them

**No stage zoom.** A camera that scales moves every lane rule vertically, which detaches fixed
lane labels and multiplies graphic sizes into the type band (overlap class 2 below). Closeness
comes instead from scaling each subject about its own planted foot
(transformOrigin: 50% 100%), which keeps feet welded to the rule and leaves the rules where
their labels are. The camera pans on X only. This single change retires overlap classes 2 and 3.

**A mark label sits clear of its own line.** A label anchored left: x + 10 at the 100m mark runs
off the frame. Default: right-aligned inside a fixed-width box that ends left of the mark; flip
to the right side only when the left side is occupied (last year's runner stands on its own
mark, so that one flips).

**Stack the ruler below the lane tag, not beside it.** Axis labels (0M / 100M) at rule+22 collide
with the lane tag at rule+12. Ruler goes to rule+48.

**Labels go on lane rules, never on a moving subject.** Confirmed again this run: a fixed tag on
each lane's own rule reads as a legend and can never collide. Travelling labels always do.

## Step 0b — the stills gate (AC, 2026-08-26)

Before animating anything, build ONE board of frozen frames, one per beat, each at that beat's
**busiest** moment (mid-move, mid-fill, mid-fall — the frames no screenshot ever covers), and get
AC's approval on the board.

The board and the reel must render from the SAME geometry file: the board mounts Frame(t) at
frozen t values, the reel mounts the identical Frame(t) driven by the engine clock. Approved
stills and exported video then cannot drift, because they are one piece of code. The engine
binding file shrinks to about 30 lines and holds no geometry at all.

## Step 0c — length

AI News is a sub-12s format for a single-payoff story. A story carrying a comparison AND a catch
needs six beats and about 17s (AC, 2026-08-25, reconfirmed 2026-08-26). The payoff still lands on
frame one; the extra seconds buy reading time, not a slower open.

## Step 1 — write the band table before the first pixel

Every element owns a y-band. Two elements may never share one. For a 1080x1920 reel:

| Band | y | Owner |
| --- | --- | --- |
| 0-96 | crest block | theme |
| 112-1332 | frame + ticks | chrome |
| 182-215 | kicker, watermark | chrome |
| 316-345 | eyebrow | scene |
| 358-580 | headline, 2 lines max | scene |
| 596-780 | hero number, chip, or compare row | scene |
| 800-1000 | the graphic band, floor line at 1000 | world |
| 1000-1045 | ticks and lane tags, BELOW the floor | world |
| 1074-1120 | source credit | scene |
| 1150-1245 | subtitle carrier | chrome |
| 1332+ | nothing, ever | app chrome |

A number that grows, a post that grows, a bar that fills: each one gets a band, and its
maximum size is what must fit, not its resting size.

## Step 2 — the four overlap classes that actually ship

1. **Off-by-its-own-height.** `top: BASE - 130` with `height: 146` hangs 16px through the floor.
   Any element anchored to a line must have offset === height, exactly.
2. **Zoom-multiplied graphics.** The opening close-up runs at 2x, so a 300px post becomes 600px
   and lands in the headline. Anything sized in world units must be authored per zoom level:
   short for the close-up, full for the wide shot, crossfaded during the move.
3. **A graphic parked on the number.** A runner that decelerates past the finish stops wherever
   the easing leaves it. Park it deliberately, then pan the camera so the parked mark sits in
   empty frame, not under the hero number.
4. **An entrance helper that eats the exit.** `Object.assign({opacity: vis(...)}, MOTION.enter(...))`
   overwrites the element's own opacity with the entrance value, so the element NEVER fades out.
   Tonight that kept the sign-off handle at full opacity through the loop dissolve and printed it
   inside the hero number for five frames. Rule: the visibility window is assigned LAST, or
   multiplied into the helper's value. Any element carrying both an entrance and a lifetime must
   be measured at the END of its life, not just at its entrance.
5. **Two things queued below the floor.** Lane tags, tick labels and the source credit all want
   the 1000-1120 strip. Give tags 1000-1045 and credits 1074+, and never let a travelling label
   share a column with a credit.

## Step 3 — measure it, do not look at it

Seek the END of every layer's life, not just the cues: the last 0.5s of a looping piece is
where two layers coexist, and it is the one stretch no screenshot ever covers.

Screenshots at 28% hide a 14px collision. Run this in the preview at every cue, and again at
each cue plus 0.4s (motion is where things collide):

    const seek=T=>document.querySelector('[data-om-exportable-video-with-duration-secs]')
      .dispatchEvent(new CustomEvent('data-om-seek-to-time-frame',{detail:{time:T,sync:true}}));
    function boxes(){
      const stage=document.querySelector('foreignObject');
      return [...stage.querySelectorAll('div,span,img')].filter(el=>{
        if(el.childElementCount>0) return false;              // LEAVES ONLY
        let p=el,o=1; while(p&&p!==stage){o*=+getComputedStyle(p).opacity;p=p.parentElement;}
        if(o<0.12) return false;                              // inherited opacity counts
        const r=el.getBoundingClientRect(); return r.width>3&&r.height>3;
      }).map(el=>({el,r:el.getBoundingClientRect(),txt:(el.textContent||'').trim().slice(0,18)}));
    }
    function hits(){
      const b=boxes(),out=[];
      for(let i=0;i<b.length;i++)for(let j=i+1;j<b.length;j++){
        const A=b[i].r,B=b[j].r;
        const ox=Math.min(A.right,B.right)-Math.max(A.left,B.left);
        const oy=Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top);
        if(ox>3&&oy>3&&(b[i].txt||b[j].txt))
          out.push([(b[i].txt||'gfx')+' x '+(b[j].txt||'gfx'), Math.round(ox)+'x'+Math.round(oy)]);
      }
      return out;
    }
    const res={}; for(const T of CUES_AND_CUES_PLUS_04){seek(T);const h=hits();if(h.length)res[T]=h;}
    res

**Leaves only, and inherited opacity.** Two filters do all the work. Without `childElementCount===0`
every scene wrapper (a full-frame box) collides with everything and the report is unreadable.
Without the inherited-opacity walk, faded-out beats report collisions they cannot show.

**Two false positives to expect.** A full-width centred text box (a watermark with
`left:0;right:0`) intersects everything on its row: give centred chrome a bounded box
(`left:400;right:400`) and the report goes quiet. And a masked reveal mid-slide straddles the
line above it by a few px inside its own `overflow:hidden` wrapper: that one is invisible and
expected.

Any pair that is not deliberate (a label on its own carrier, a bar inside its track) is a defect.
Fix it before the checkpoint, not after AC screenshots it.

## Step 3b — the gate's own blind spot

The min-size filter (`r.width>3`) is in SCREEN px. A preview at 26% turns a 4px finish post into
1px, so the gate silently drops the thinnest graphics — exactly the ones that slice through type.
Divide the threshold by the measured scale, or measure with the stage at 1:1. Tonight a post
crossed the "9.39s" in the shift beat and the gate reported nothing.

## Step 3c — size a hero pair against the world, not the column

A two-figure compare line ("21.50s to 9.39s") grows to the right until it reaches whatever the
world puts there. At 88px it hit the finish post; 68px clears it by 88px. Before setting a hero
size, measure from the text column's left edge to the nearest world graphic and divide by the
character count, rather than picking a size that looks right in an empty frame.

## Step 3d — three fixes the gate itself needs (2026-08-26)

Run these or the gate lies to you.

1. **Measure the CLIPPED rect, not the layout rect.** With hard bands, a type element's layout
   box can hang below its band while `overflow:hidden` hides it. Walk up from each leaf and
   intersect its rect with every `overflow:hidden` ancestor; drop anything that clips to zero.
   Without this the rule beat reported five collisions that no viewer could ever see.

2. **The empty-wrapper trap.** A full-width positioning wrapper (a lane group, a scene group)
   whose children all returned `null` has zero child ELEMENTS, so "leaves only" promotes it to a
   leaf — a 1080x440 invisible box that collides with every label in the frame. Render group
   wrappers only while something inside them is visible (`{o > 0.002 ? <group/> : null}`). This
   was the entire remaining collision list on the third cut.

3. **Bound centred chrome.** `left:0; width:1080; text-align:center` intersects everything on its
   row. Give the watermark a bounded box (`left:340; width:400`) and the row goes quiet.

**One deliberate hit to expect.** A strikethrough crossing the unit glyph of the number it
strikes (the "s" of 21.50s) reports as a 17x7 collision at every frame of that beat. That is the
strike doing its job — the only pair on this cut's report, and the report should otherwise be
empty at every 0.2s sample across the whole timeline.

## Step 4 — the one-line rule

**If it moves or scales, measure it at both ends of the move.** Every overlap tonight lived in a
frame nobody sampled: mid-zoom, mid-fall, mid-fill.

## Step 3e — measure every ink leaf, never a group (Day 41, 2026-09-11 — replaces the leaf rule)

Measure every ink leaf separately: `img`, `text`, `span`, `line`, `circle`, `rect`. Never a
group box — the Day 41 bolt crossed the vendor mark and the gate reported clean because it
measured the door `<g>`. Run at **24 stamps**: each cue, cue+0.4, mid-beat, pre-cut. Report
the **minimum clearance from every logo to bolt, handle and label; pass at ≥40px.** Day 41
passed at 53px.

Naming note: AC's Day 41 update calls this "Gate 8 (overlap)". In this skill Gate 8 is the
VO budget; the overlap gate is gates 1–2 / this file. Same rule, keep this file's numbering.
