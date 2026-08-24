# The race scene — SHIPPED 2026-08-24 (robot beats Usain Bolt)

Three.js moves that reached a posted reel. All inside AC's 22 Aug law (line/point/flat
fill, flat gold, no metal, liquid or grain) plus the 24 Aug hand-off law.

- `runner.html` — the two-figure race. GOLD box-head robot (near lane) vs Jamaica-kit
  human (far lane: green singlet, gold saltire sash, black waistband + hair, gold shoes
  and headband, skin limbs). Filled tapered quads between joints with round caps on the
  human and square plates on the robot; that cap chain is what gives a limb real mass.
  `window.seek(u)`, u in 0..1.
- `figure3d.html` — 3D AC narrator. Drawn head contour + jaw arc + one inset arc.
  Built and approved, NOT shipped in the first run (the race band already carried two
  figures and a third crowded the frame).
- `numerals.html` — figures under the hand-off law: three.js grains carry the MOVE and
  hand off to DRAWN Bricolage, which carries the HOLD. Never let grains be the thing read.
- `EXAMPLE_crest_race_reel.html` — the shipped working copy. Shows the integration route.

**Route lesson: LIVE canvas, not baked frames.** The vault mark open/sting bake to PNG
because they are sub-second. A 9.6s continuous animation is the wrong shape for frames —
576 PNGs to render and carry. A live canvas driven from the template's `seek(t)` costs
one `<canvas>` and one module, screenshots identically, and gates fine as long as the
canvas sits in its own clear band (here y 985..1300).

**And it fixed gate 4.** Continuous large-area motion in the race band cleared the motion
floor with no window over 1.0s — the first clean pass on the News engine with this much
static type on screen.

**Eight revisions, every one from reading the render, not the gate:** ran through the wall ·
both figures tangled into one scribble · lanes collapsed to one line · silhouettes read as
prancing toddlers · feet punched through the lane · black head vanished on the black ground ·
saltire read as a block. Read the frame. The gates cannot see any of these.
