# Lane C — ac-wins.com

AC's business site. **It is not ours to redesign.** AC's ruling, 2026-08-23, after a
full redesign was rejected: *"Use this as reference. I do not want a whole new
redesign."* The site is a hand-built bilingual (EN / 繁中) page, ~211KB, and it already
has a voice. We ADD motion to it; we do not restyle it.

## The additive law

Every change to this site is a patch on AC's own file:

- Read AC's current `index.html` first. Never regenerate it.
- New CSS goes in ONE appended `<style>` block. New behaviour goes in ONE appended
  `<script type="module">`. Nothing above them is edited except to insert a canvas.
- Colours, fonts and easings come from the page's own custom properties — read them,
  never restate them: `--bg #0A0908 · --gold #C9A961 · --gold-bright #E8CD8A ·
  --text #F3EEE4 · --muted #948D80 · --card #151310`; Bebas Neue / Inter /
  Playfair Display / Noto Sans TC; `--ease-out: cubic-bezier(0.23,1,0.32,1)`.
- The business is **AI Enablement, Hong Kong** — not print, not mailing. Copy is AC's.
  Never invent a headline for this site.
- Every addition sits behind `prefers-reduced-motion: reduce`.

## What is in place

**Files.** `assets/site/ac-wins.patched.html` is the shipping copy (three.js from
unpkg). To run it locally for QA:
```bash
sed 's|https://unpkg.com/three@0.185.0/build/three.module.min.js|./three.module.min.js|' \
  ac-wins.patched.html > local.html
cp SKILL_DIR/assets/threejs-lab/three.*.min.js .      # local.html needs both files
```

**1 · The intro mark — it INKS ITSELF ON, then HANDS OFF to the header.**

Three rulings got the site here, in order.

1. 2026-08-24, on a settled particle mark: *"this looks very unsmooth."* He was right, and
   no grain count fixes it — **a mark made of grains IS grain.** That is the hand-off law
   in `SKILL.md`, and it still governs the reels.
2. Same day: *"remove the start and finish animation"* · *"remain the ring close"* ·
   *"every 21px clear in the circle."* All dust deleted.
3. Then, off the transition sheet (`assets/site/transitions-lab.html`): **"use draw as the
   animation and hand-off as the transition out."**

**DRAW.** The mark is inline SVG and reveals by `stroke-dashoffset` — the exact technique
his ring already uses, so the circle and the monogram are literally the same gesture.
Chrome **resets dashing per subpath** (verified, not assumed), so each stroke is its own
`<path>` with a computed window; the windows come from real `getTotalLength()` values so
the line never changes speed at a joint. Order: the A's legs, its double stroke, the
crossbar, then the C sweeping round — and **the C's overlap segment draws at exactly the
angle it passes the A's leg**, so the weave happens live instead of appearing. Runs
1.45–2.75s: it starts as the ring is closing and finishes well before the copy settles.
DOM order stays the approved paint order (C behind, A over, weave last); timing is
independent of it.

**HAND-OFF.** The mark lives OUTSIDE `#intro` (fixed, z-index above the curtain) so it
does not fade with it. When his overlay gets `.done`, the mark shrinks and travels to the
`.logo-ac` lockup in his header — `transform 860ms cubic-bezier(.5,0,.2,1) 120ms`, opacity
out at 620ms — arriving as the page does. The intro stops being a gate and becomes the
logo. A second observer catches the case where his script removes the overlay without ever
adding `.done`, and the element removes itself 1.1s later.

**The 21px is solved, not tuned.** The mark is wider than it is tall, so fitting it by
height pushes the A's leg through the ring stroke. A shape clears a circle only when its
half-diagonal clears the radius, so the layout solves
`markHeight = (R - 21) / hypot(width/2, 0.5)` — the gap holds at every ring size and every
screen instead of drifting on resize.

AC's flat `.intro-ac` letters stand down only behind `html.ac-mark-on .intro-ac`, a class
the module adds to itself. If the script ever fails to load, his original intro plays in
full rather than leaving an empty ring.

**2 · The hero floor.** A receding gold grid filling the empty right half of the hero,
under AC's type. It waits for the intro to finish (MutationObserver on `#intro.done`,
6s fallback so it can never strand invisible), then rises the last half-metre and fades
up over 1.1s. Pointer parallax only, and it settles and STOPS — no idle rAF on a phone.

## Gate

`scripts/qa_intro.js` — seek-driven, so it measures the frame it reports. FIT: the
mark's worst bbox corner must clear the ring stroke — this is the check that keeps AC's
21px honest. CLEAR: in no frame may the mark touch live intro copy. Both must PASS
before anything ships. (With the mark static the seek is a no-op, but the hook stays:
the moment anything on this overlay moves again, the gate is already seek-correct.)
```bash
NODE_PATH=/opt/node22/lib/node_modules node scripts/qa_intro.js /abs/path/local.html
```

## Hard-won rules (each cost a round)

- **A mark of grains is grain.** See the law above. Particles animate; they do not
  render a logo. Anything that has to be READ gets drawn, not sampled.
- **SVG dashing RESETS per subpath in Chrome.** One `<path>` holding five subpaths will
  not draw as one continuous line — every subpath starts the dash pattern again. Split
  them and compute the windows. (Tested with a two-subpath path at half offset: both
  halves drew fully.)
- **An inserted element's own removal timer will eat your QA.** The mark removes itself
  1.1s after the hand-off on wall-clock, while a seek-driven capture takes seconds — the
  travel photographed as an empty screen until the harness guarded `#ac-mark` from
  `removeChild` the same way it guards `#intro`.
- **`--ease-out` is for entrances, not travels.** cubic-bezier(0.23,1,0.32,1) is so
  front-loaded that a hand-off snaps away and then crawls. A travel wants to gather and
  settle: cubic-bezier(.5,0,.2,1).
- **A text rect carries its line-height leading**, so its centre sits below the visual cap
  centre. Aim a landing at the letters (`top + height*0.46`), not at the box.
- **Take an inserted element out of flow BEFORE appending it.** `#intro` is a flex
  container, so a canvas appended with default styles is a flex item for one layout
  pass — it shoved the ring sideways, and the layout routine then measured the shoved
  ring and pinned the crisp mark a full ring-width to the left.
- **AC's page dismisses its own overlay on a wall-clock timer** (`.done` at 4300ms, node
  removed at 5300ms). A seek-driven gate outlives that, so it must pin the overlay open
  — patch `Node.prototype.removeChild` for `#intro` and re-clear `.done` each sample, or
  the check dies on a null `.intro-logo` halfway through.
- **Never screenshot a running animation.** A settled mark once photographed as an
  empty ring: `waitForTimeout(3000)` + `evaluate` + `screenshot` landed at ~4.3s, after
  the dissolve. The page exposes `window.acIntroSeek(ms)` — freeze, then shoot.
- **`THREE.PointsMaterial` draws hard squares.** Give it a radial-gradient
  `CanvasTexture` map or the whole thing reads 8-bit. `NormalBlending`, not Additive,
  for gold on near-black.
- **Never clamp particles into a safe box — GENERATE them inside it.** Clamping laid a
  hard gold bar along the bottom of the entry and the top of the dissolve: thousands of
  grains stacking on one line. Measure the room off the DOM first, then place. Keep the
  clamp as a safety net only.
- **`fract(sin(i)*k)` aliases on consecutive integers.** It put a bright band and a
  lens-shaped hole through the cloud. Use a real integer hash (`h32` in the patch).
- **A radial cloud needs no minimum radius.** A `0.16` floor on the radius punched a
  visible 96×57px hole at the centre. Let it reach zero and taper with `pow(u,1.35)`
  so density is centre-heavy and the rim thins to nothing instead of ending on an edge.
- **Fit a wide mark to a circle by its HALF-DIAGONAL, not its height.** The AC mark is
  wider than tall; a height fit pushes the A's leg straight through the ring stroke.
- **Per-frame lerps are frame-rate bugs.** `cx += (t-cx)*0.06` runs twice as fast at
  120Hz and lurches after any dropped frame — which is exactly what reads as "not
  smooth". Use `k = 1 - Math.exp(-dt/TAU)`.
- **Cap `setPixelRatio` at 2.** Phones run 3; capping is a 2.25× fill-rate cut nobody
  can see.
- **This container renders GL on the CPU (swiftshader).** Dropped frames here are NOT a
  device verdict — per-frame JS+draw measured 0.77ms. Prove where a stall lives by
  freezing the animation and re-measuring the page alone before tuning the design down.
- **The page cannot reach Google Fonts from here**, so it takes ~12s to run its own
  scripts. Never wait on wall-clock for the intro to finish — wait on the condition
  (`#intro` gone or `.done`).
