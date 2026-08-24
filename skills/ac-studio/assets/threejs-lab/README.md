# three.js lab — PROTOTYPES, NOT SHIPPED (2026-08-22)

Status: **draft library**. Nothing here is wired into reel.template.html or any engine.
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
NEXT: AC picks/kills/mixes → winner gets a deck CONFIG entry + baked-art builders +
qa_deck run, ships one real carousel, THEN a reel t-<theme> with live seek(t) canvas and
the full gate battery. New faces vendored here under theme-candidates/fonts/.

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
from frame 0. NEXT on GO: wire scene-E restage + open sting into reel.template.html
behind the FIGURE/theme constants, run full gate battery + 140px, one real reel ships it.
