# three.js lab — SHIPPED (vault soft launch, Day 38 · 2026-08-24)

Status: **in production**, was a draft library. Nothing here is wired into reel.template.html or any engine.
AC deferred the brand-law question ("draft first, ask me later"), so integrating ANY of
these into a shipping reel first needs his call on the law-breakers, then a per-move
integration behind the one-canvas-in-a-scene pattern (new scene element, existing scenes
untouched, all gates re-run).

Pipeline facts, proven this session:
- WebGL works in the render engine's exact chromium launch args (software GL). No change
  to render_frames.js / build_video.sh needed; a three.js canvas screenshots like any DOM.
- three r185 vendored here (three.module.min.js + three.core.min.js — BOTH needed, the
  module imports the core). jsm/ carries the postprocessing passes used, with their
  transitive deps resolved offline (Pass.js, shaders/*).
- Scenes are driven by window.seek(t), never rAF — matches the engine architecture.
- Renderers per page: 8 tested fine.

Sheets (open the .html, or read the .png contact sheets):
- sheetA: globe(1) node-graph(2) bars(3) extruded-type(4, CSS-3D) metal-knot(5, LAW-BREAKER)
  particle-figure(6)
- sheetB: 3D AC figure(7) phone mockup(8) dissolve(9, superseded by 9b) DOF(10, superseded)
  camera-flight(11, superseded by 19) 2D reference(12)
- sheetC: HK skyline(12) coin(13) padlock(14) neural layers(15) data stream(16)
  liquid-gold shader(17, LAW-BREAKER) extruded AC monogram(18) camera-flight fixed(19)
- sheetD: motion trails(20) film grain(21, LAW-QUESTION + needs color calibration —
  FilmPass saturates the gold) dolly zoom(22) orbit reveal(23) dissolve fixed(9b)
  DOF fixed(10b)

Known calibration debts (logged, not hidden):
- coin(13): AC face reads upside-down at the frozen flip angle — face orientation must
  counter-rotate or the freeze angle must be chosen so the monogram is upright.
- data stream(16): endpoint spheres clip the demo frame; pull camera back ~15%.
- liquid gold(17): reads as a blob, not liquid — needs a specular streak or higher-frequency
  waves before it earns anything.
- film grain(21): FilmPass at 0.18 still saturates the gold toward orange; needs a
  colorspace pass or custom grain shader if ever used.
- monogram(18): ring is TRUE extrusion; the AC letters are voxel-sampled from canvas ink.
  Exact glyph extrusion needs the logo as SVG paths (SVGLoader is available offline) —
  ask AC for the SVG.
- Figure lesson (sheet 1st test): rotating rings/tilts read as broken, not premium — depth
  yes, spin no. Premium archetype holds in 3D too.

Lessons that transfer to ANY future 3D-in-reel work:
- background: set scene.background = 0x0A0A0A (or alpha:true canvas over the ground);
  composer passes (Bokeh) otherwise paint an opaque black square that breaks the ground.
- gradients: `.gold` background-clip:text does NOT reach WebGL; per-object materials only.
- text: never rasterize brand type into WebGL when it can stay DOM — it blurs. Voxel/particle
  sampling of type is the exception (deliberately not-typographic).
- normalize sampled point clouds by their OWN bounds (short strings under-scale otherwise).
- a readable mid-morph still needs ~70% of points settled ON the target, fringe minority.

## FIRST SHIPPED MOVE — Pack 04 cover (2026-08-22)

The neural-web family (move 15) is the first lab move to ship, as the Prompt Drop
Pack 04 cover. The integration route that made it gate-safe, reusable for any deck art:

- **Bake, don't embed.** Render the three.js scene ONCE to a transparent PNG and wire it
  through the deck's existing `ART` registry as an `<img>` (`neural3d` entry in the Pack 04
  run's deck.html). Both geometry gates then cover it like hand-drawn art; the shipped deck
  carries no live canvas and no three.js dependency.
- **Alpha recipe** (`deck_art_neural.html`, this dir): do NOT set `scene.background`,
  use `renderer = new THREE.WebGLRenderer({alpha:true, ...})`, screenshot with Playwright
  `omitBackground:true`. Output: RGBA PNG that sits on any theme ground.
- **Feed-size legibility:** line material opacity 0.35 read as floating dots at cover size;
  0.5 reads as a network. Tune line opacity at the SHEET size you will actually post at.
- **Brand law held:** wireframe gold lines + points on flat ground only — no metal, liquid
  or grain (those three still await AC's law call, see LAW-BREAKERS above).
- **Bookend restraint:** a 3D echo on the close failed the figure gate three times
  (300→220→170px) and still crowded the keyword; cut for the check icon. 3D cover-only
  is the default until a close-art layout earns its space.

## LAW DECISION (AC, 2026-08-22) — flat gold locked

The deferred brand-law question is ANSWERED: **wireframe, line and point 3D only.**
Metal knot (5), liquid shader (17) and film grain (21) are REJECTED permanently —
delete from consideration, never re-pitch. Everything shipped or drafted stays inside
flat-gold law.

## THEME CANDIDATES (theme-candidates/, 2026-08-22) — awaiting AC's pick

Four NEW 3D-native theme identities drafted (AC chose "new themes" over extending the
four, deck + reel both targeted, carousel proves first). Each keeps: flat #0A0A0A ground,
gold accent, Poppins small type, corner ticks, 5-node progress living IN the block.
- **A · VAULT** — Marcellus. Block = perspective floor grid receding to the horizon with
  fog; progress = 5 nodes across the foreground floor. Hero = the figure (base's heir).
- **B · LATTICE** — Fraunces (opsz 72, 600). Block = 3D node-lattice slab across the
  ceiling; progress = 5 anchor nodes under the band. Hero = headline (crest's heir).
- **C · ORBIT** — Cormorant Garamond 500 (oldstyle figures — "11.7" renders as text
  figures, flag to AC before shipping numerals). Block = tilted orbital ring bleeding
  off the right edge + wireframe core; progress = 5 beads ON the orbit (placed by
  projecting curve samples, see below). Hero = none, even weight (margin's heir).
- **D · STRATA** — DM Serif Display. Block = stacked wireframe strata under the fold;
  progress = 5 nodes on the top stratum's front edge. Hero = headline at the fold
  (column's heir).

Build lessons (cost 3 blind rounds before switching to computed placement):
- **Never hand-guess screen positions of 3D elements.** Compute in-page: update camera
  matrices FIRST (`c.updateMatrixWorld(true); c.matrixWorldInverse.copy(c.matrixWorld)
  .invert();` — Vector3.project uses stale identity before first render), THEN project
  candidate points and pick ones landing in safe screen zones. Orbit beads + strata rail
  are both placed this way in the candidate files.
- Group transforms must be SET before projecting through g.matrixWorld (a solve block
  pasted before position/rotation assignment projects the untransformed geometry).
- Frustum reality check: at depth d with vertical FOV f and aspect 0.8, halfWidth =
  d·tan(f/2)·0.8 — a rail spaced wider than that leaves one orphan node on screen.
~~NEXT: AC picks/kills/mixes~~ **RESOLVED 2026-08-23: A · VAULT WINS**, the first new
theme since the original four. B · LATTICE remains the named second candidate,
unscheduled. C and D are not scheduled. New faces vendored under theme-candidates/fonts/.
The winner shipped as `t-vault` on Day 38 via the BAKED-frame route, not the live
seek(t) canvas this line anticipated — see STATUS.

### v2 fine-tune (2026-08-22, same day)
AC: "ABCD looks great but more fine tuned." Applied: VAULT floor split near/far
(opacity 0.62/0.30 at z -10) + dots 0.085; LATTICE nodes depth-graded per z-layer
(0.9/0.55/0.3), x-pitch 0.86, lines 0.35, anchors 0.125; ORBIT second inner ring
(0.62 scale, opacity 0.26), core -1.72; STRATA layer gaps 1.1, lit/unlit 0.6/0.16,
rail solved to sy 728. GLOBAL: dim-node color 0x4a4030 -> 0x655838 (old value near
invisible on phone). Candidate files here are v2; THEME_SHEET.png = v1,
THEME_SHEET_v2.png = current.

## STORY-ICON LIBRARY DRAFTS (icons_sheet.html / ICONS_SHEET.png, 2026-08-22)

Menu 1 drafted: 12 law-safe story icons, one page, one renderer per tile, each builder
wrapped in try/catch so a dead tile can't kill the sheet (sheet-D lesson applied).
READS CLEAN: 1 envelope · 2 hourglass · 3 brain (hemisphere split 0.24 — at 0.09 it
read as a plain sphere) · 4 chat bubbles (separated, dots as Points) · 5 document stack
(z-step 0.2; at 0.55 it read as nested picture frames) · 6 shield (extrude + check) ·
8 rocket (profile lines + rims; full cylinder/cone edges read as ribs) · 10 globe+routes
(lat/long + bezier arcs, HK-anchored) · 11 HK junk (pure line art, battened sails) ·
12 data chart (unlit flat-fill bars + edges, one hot bar).
WEAKEST: 9 robot arm — chain is computed (seg helper: box between joint points,
atan2 rotation) and connected, but the silhouette still reads desk-lamp-ish; AC to
keep/kill/rework. 7 coin stack fixed by the OCCLUSION TRICK: a solid INK-colored
cylinder core inside each coin lets the depth buffer hide back rims — without it any
rim-stack reads as a coiled spring. That trick generalizes to every "stacked wireframe
object" build.
PROCESS ERROR logged: a python slice-replace anchored on `const rim=circle(0.95);`
matched the HOURGLASS tile first (non-unique anchor), splicing coin code into it and
silently deleting tiles 3-7 — caught only by reading the render. Rule: assert an
anchor is UNIQUE before slice-editing a multi-section file; prefer whole-file rewrite
when sections repeat helper names (also why tile 2's rim var is now `hrim`, 7's `crim`).
Baking route per icon: same as deck_art_neural.html (alpha canvas + omitBackground).

### Decision drafts (2026-08-22, DECIDE_1/2/3 + arm_variants.html + monogram_drafts.html)
Three sheets built so AC's open verdicts are one glance each: (1) THEMES — v2 candidates
at feed size + the 140px grid-crop law test side by side; (2) ROBOT ARM — V1 current /
V2 industrial gripper (base plate, piston, parallel fingers over a task box) / V3 gantry
claw on a package (reads strongest); (3) MONOGRAM — Gloock "AC" ink sampled in-page
(FontFace load → 2D canvas → getImageData threshold) into M-A particle cloud, M-B voxel
extrusion, M-C mark-in-extruded-ring. Monogram geometry is a STAND-IN until AC's SVG;
treatment choice carries over. Ring v1 ate the C — mark scaled 0.58 inside ring 1.78.

## PRIME LOGO drafts (logo3d.html / LOGO_SHEET.png, 2026-08-23)

AC declared the interlocked A+C pendant mark the PRIME LOGO and asked for three.js
treatments. The photo arrived vision-only (never on disk), so the mark is RECONSTRUCTED
as drawn 2D-canvas geometry — C arc first, A over it (miter apex, double-stroke left
leg), C's lower arc re-drawn on top for the weave, diamond + loop bail — then sampled
into treatments (same ink-sampling pipeline as the monogram drafts). Tiles: L-0 mask
(judge against original) · L-A solid voxel extrusion · L-B particle · L-C edge-trace
outline · L-D sign-off sting on the vault floor. Three rounds to converge: round 1 C
too low/deep, round 2 C terminals overreached the apex, round 3 miter apex + C span
0.8..2pi-0.5 landed it. GEOMETRY IS A DRAFT — AC's actual file (SVG ideal, PNG fine)
replaces the drawn paths exactly; treatment choice carries over. The pendant photo's
lit-metal look stays OUT of content by the flat-gold law; the MARK's geometry is what
enters the system.

### Logo deployment drafts (2026-08-23) — AC's calls: BAIL IN · L-A sign-offs · L-B reel opens
SIGNOFF_DRAFT (signoff_draft.html): full 1080x1920 scene-E restage — solid mark (bail in,
sample step 2, voxel 0.032) standing over the vault floor, @itsac.ai + "AI in Plain
English" beneath, ticks. Round-1 defects: mark oversized with handle text ON its ink,
floor too low, voxels chunky — fixed by scale 0.62 + floor -2.35 + finer sampling.
OPEN_DRAFT (open_draft.html): 3-phase frame-0 assemble — deterministic per-particle
scatter (sin-hash seeds, NO Math.random so phases are reproducible across canvases),
per-particle arrival times so ~70% are settled mid-phase (lab morph law), kicker live
from frame 0. ~~NEXT on GO: wire scene-E restage + open sting into reel.template.html
behind the FIGURE/theme constants, run full gate battery + 140px, one real reel ships it.~~
**DONE — Day 38, see STATUS at the foot of this file.** Left struck rather than deleted:
it read as pending work for a day after it had already shipped, which is exactly the
failure this file exists to prevent.

---

## STATUS — what is shipped, what is not (2026-08-24)

**SHIPPED.** Day 38, the vault soft launch, carries all of it:
- `t-vault` theme in `reel.template.html` (Marcellus, baked floor grid, rail on the floor)
- the **mark particle open** over scene A — 20 baked frames, `vaultTick()` drives 0–0.85s,
  then holds and fades before scene B
- the **mark sign-off sting** as scene E's ground — 24 baked frames swapped through the
  `--vbg` CSS var
- Gates: 1/2/6 CLEAN · 3 PASS (row-decorrelation 0.482) · 4 PASS · 5 WARN-by-design ·
  7 READ · 8 CLEAN 3.6

The sting is a **background, not an element**, and that is load-bearing rather than
incidental: the geometry gates measure ink, so a background is the theme's ground exactly
like the floor it replaces and cannot trip them.

**NOT shipped: the live `seek(t)` canvas.** The theme-candidate notes above anticipated a
reel driving three.js live. What actually shipped bakes to PNG and lets the existing
engine composite them. Keep it that way unless something needs per-reel variation — the
baked route inherits every gate for free and adds no three.js dependency to a shipping
reel. "Bake, don't embed" earned its place twice now.

**Open, unchanged by the launch:** the robot-arm icon verdict, and AC's actual logo file
(the mark here is still a redraw). A 48-hour watch on the vault reel decides whether the
look rolls to everything.

## THE BAKE PIPELINE — `bake_vault.js`

    node bake_vault.js            # regenerate assets/baked-vault/ in place
    node bake_vault.js --check    # bake to a temp dir and diff against the shipped set
    node bake_vault.js /some/dir  # bake somewhere else

Built 2026-08-24 to close a real hole: **the 46 shipped PNGs had no generator anywhere in
the skill.** `open_draft.html` and `signoff_draft.html` are three-tile contact sheets
frozen at fixed phases — they never produced a frame sequence. Since the mark is a redraw
standing in until AC's file arrives, every one of those frames is going to need rebuilding,
and until now that meant by hand.

Everything the frames depend on now lives in **`lib/vault.js`** — palette, mark geometry,
the deterministic scatter, the floor, the stage. Change the mark there, re-run, and the
whole set moves together. `lib/vault.js` also ends the `const GOLD=0xE7C765` duplication:
it was declared **17 times** across this lab, and duplicated helper names are precisely
what silently deleted five icon tiles in the incident logged above.

Scenes live in `bake/`, each exposing the same `window.__TOTAL` / `window.seek(t)` /
`window.__READY` contract as `render_frames.js`, so a scene that bakes here also renders in
the reel engine unchanged.

### Reconstructing the shipped motion, and how close it gets

The original parameters were lost with the generator, so they were recovered from the
frames themselves:

- **The sting is `rotation.y = REST + SWAY·sin(2πk/24)`.** Proven, not guessed: frames 3
  and 9 are *byte-identical*, so are 4 and 8, and 16 and 20. That is exactly the symmetry
  a single sine over 24 frames predicts and nothing else does. It also explains why the
  loop is seamless — frame 24 would equal frame 0.
- **`open` framing was solved, not eyeballed**: PAD 1.148 makes the settled cloud span
  444×525 of 720×792, matching the shipped frames exactly. At PAD 1.0 it rendered 15% large.

Fidelity actually achieved, measured rather than asserted:

| asset | agreement with the shipped frames |
|---|---|
| `vault_floor.png` | exact |
| `sting` at rest (k=0, k=12) | exact — same gold count, same centroid |
| `sting` under sway | centroid within ~3px of 1080 (0.3%) |
| `open` frames 0–10, 16–19 | exact spread |
| `open` frames 12–14 | ~10px of 720 (1.5%), assemble runs marginally ahead |
| `mark_corner.png` | identical ink bbox, 0..149 × 0..177 |

**No single sway amplitude fits both extremes** — k=6 wants ~0.36, k=18 wants ~0.20 — so
the original carried one more degree of freedom that 24 PNGs cannot reveal. 0.26 is kept:
it ties for the lowest maximum error and is the clean value (yaw sweeping 0 → 0.52).

⚠ **Do not re-bake over the shipped Day 38 frames.** They are not reproducible to the byte
and there is no reason to disturb a reel that already shipped. This pipeline is for the
*next* regeneration — when AC's real logo lands there is no ground truth to match anyway,
only `lib/vault.js` to change.

## CHROMIUM FLAGS — settled 2026-08-24

This README previously claimed WebGL works in the render engine's launch args, and
`zoneout/anim/README.md` claimed the opposite: that the ANGLE/SwiftShader flags are
required. **This README was right.** Measured with `render_frames.js`'s exact args and none
of the GL flags: `hasGL: true`, renderer `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device
(Subzero)), SwiftShader driver)` — ANGLE is already the default. The same scene renders at
~1,971 gold pixels without the flags against ~2,001 with them, which is antialiasing jitter
between runs.

The ZoneOut note has been corrected. The reasoning error there is worth carrying: a missing
module and an absent GL context produce the **identical** symptom, a silent black frame, and
both were "fixed" in one step so the credit went to the wrong change.

## THE INSTALLED three.js SKILLS, mapped to what is still open here

A three.js skill pack is installed. Reach for the reference rather than re-deriving:

| open item in this lab | skill |
|---|---|
| coin(13) face reads upside-down at the frozen flip angle | `threejs-fundamentals` (transforms, quaternions) |
| data stream(16) endpoint spheres clip the frame | `threejs-fundamentals` (camera frustum) — and see the frustum reality check above |
| monogram(18) exact glyph extrusion, waiting on AC's SVG | `threejs-loaders` (SVGLoader, available offline) |
| the vendored `jsm/postprocessing` passes | `threejs-postprocessing` |
| particle / voxel ink sampling, instancing | `threejs-geometry` |
| `Vector3.project` on stale matrices | `threejs-fundamentals` |

`markInstanced()` in `lib/vault.js` came out of that pack: `signoff_draft.html` built a
Group of ~4,000 individual `Mesh`es for a shape that never changes, which is ~96,000 draw
calls across a 24-frame bake. One `InstancedMesh` makes it 24.

---

## 3D MOVES — three routes drafted (2026-08-24)

AC asked for all three routes drafted rather than one picked. They are rungs of one ladder,
and building them surfaced a division that wasn't obvious up front — see COST below.

### Route 3 · beat moves — `lib/moves.js` + `bake/moves/*.html`

Three moves replacing flat DOM motion on the beats that carry the argument:

| move | scene | replaces |
|---|---|---|
| `toggle` | B · the shift | `strikeB.style.transform='scaleX(...)'` — a 2D line growing sideways |
| `bars` | C · the proof | nothing; the odometer currently counts against an empty frame |
| `dolly` | D · the rule | a static callback |

Every builder returns `{ group, at(p) }`. That one shape is what lets the SAME builder serve
both the baked and the live route — `bake/moves/*.html` steps `p` and screenshots;
`reel.template.html` would call `at(p)` inside `seek(t)`. No move is written twice.

### Route 1 · the registry — `bake_vault.js --moves`

`MOVES[]` in `bake_vault.js` carries name, slot size, frame budget and target scene. Bakes to
`assets/baked-moves/<name>_NN.png`. Adding a move is one registry row plus one HTML file.

**Bake at the slot's CSS box size, never the full frame.** The mark open already proved it:
720×792 frames in a 224×246 box. `bars` and `toggle` are 72K each for 18 frames because of it.

### Route 2 · live canvas — `live-proof.html`

A real three.js canvas inside a reel scene, driven by `seek(t)`, rendering correctly through
`render_frames.js`'s exact launch args. Bars are built from `CONTENT.series` and the odometer
counts to the same figure that sets the hot bar's height — **the animation knows the story.**
A baked sequence rises identically whether the number is 3% or 300%.

Costs, stated rather than buried: three.js ships in a production reel (~750KB); every gate
re-runs against a live canvas; and gate 4 is the subtle one — a live canvas trivially clears
the motion floor, so it can MASK a scene going static behind it. That fault has bitten before,
when gate 4 was passing on scene fades until the loop-seam fix removed them and four dead
windows appeared at once. Ship behind `GL='off'` with a baked twin as the control.

### COST — the division that decides which route a move belongs to

Measured on the first three:

| move | frames | size | total |
|---|---|---|---|
| `bars` | 18 @ 560×420 | 2.5K | 72K |
| `toggle` | 18 @ 620×520 | ~4K | 72K |
| **`dolly`** | 20 @ **1080×1920** | 37K | **736K** |

`dolly` is **83% of the whole library on its own**, and not because it is more complex — it is
a *camera* move, so it changes every pixel and cannot be baked at slot size. That generalises:

> **Object moves bake cheaply. Camera moves do not, and belong on the live route.**

So routes 1 and 2 are not competing options. `bars`, `toggle`, the icon library and anything
else that occupies a slot want the baked registry. `dolly`, orbit reveal, camera flight (19)
and motion trails want the live canvas, where a camera move costs nothing extra.

### Two defects the contact sheet caught that the metrics did not

Both were found by looking at the render, which is the standing rule and it earned its keep:

1. **The demoted card was invisible.** `toggle`'s greyed card faded to 0.28 opacity and read
   as *deleted* rather than *superseded* — the beat's whole point is that the wrong version is
   still there. Floored at 0.5. Same lesson the theme candidates learned when dim nodes at
   `0x4a4030` turned out invisible on a phone.
2. **The dolly zoom did not exist.** The first bake drove the camera over a bare floor and
   frames 0 and 19 were indistinguishable. A dolly zoom is a RELATIONSHIP — a subject holding
   its size while the background stretches — so with no subject there is no effect. It now
   carries a card at the subject plane.

### NOT integrated into `reel.template.html` yet

Deliberate. The moves are baked and readable but no shipping reel references them, so nothing
changed for Day 38 or anything already queued. Integration is a `MOVES3D` constant, three CSS
slots and a `moveTick(t)` beside the existing `vaultTick(t)` — the same shape that wired the
mark open. It waits on AC reading the sheets.
