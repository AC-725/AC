# The 3D story-icon library — `assets/icons3d/`

Twelve pre-baked, transparent, law-safe 3D icons for slides and scenes. Approved by AC
2026-08-22 ("input this inside to the skill"). Everything is wireframe, line, point or
unlit flat fill in brand gold on transparency — **inside flat-gold law** (AC's
2026-08-22 ruling: no lit metal, no liquid, no film grain, permanently).

Files are 900×800 RGBA PNGs (~320K for all twelve). They composite on the flat
`#0A0A0A` ground with no halo and no box — verified on a ground-proof composite the
day they were baked.

## Catalog

| file | icon | reaches for |
|---|---|---|
| `envelope.png` | wireframe envelope, open flap | email stories — the page's most recurring niche |
| `hourglass.png` | twin cones, sand points mid-fall | time-saved stories, every trial result |
| `brain.png` | two point-cloud hemispheres, linked | AI-itself stories |
| `chatbubbles.png` | three bubbles receding in depth | chatbot / support stories |
| `documentstack.png` | four sheets, text rules on the front | paperwork automation (AC Wins overlap) |
| `shield.png` | extruded shield + check | security and scam stories |
| `coinstack.png` | four coins, ink-core occlusion | money and pricing stories |
| `rocket.png` | profile-line rocket, exhaust points | launch stories |
| `robotarm.png` | computed joint chain + claw | automation stories — **DRAFT: silhouette reads desk-lamp-ish; AC verdict pending** |
| `globeroutes.png` | lat/long globe, 3 arcs out of Hong Kong | worldwide rollouts |
| `hkjunkboat.png` | line-art junk, battened sails | the Hong Kong signature |
| `datachart.png` | 3D bars, one hot gold, floor grid | any story whose art is a real number |

## Using one in a CAROUSEL (wired today)

The deck engine's `ART` registry carries a permanent `icon3d` builder. In a beat:

```js
{ kicker:'AI News', art:'icon3d', icon:'envelope', artW:420,
  word:'…', sub:'…' }
```

- `icon` = any file stem from the catalog. `artW` defaults to 420.
- Optional `artlab` renders the standard art caption under it.
- **Copy the folder into the run dir beside deck.html** — same law as fonts:
  `cp -r SKILL_DIR/assets/icons3d .`
- Gates unchanged: the icon is an `<img>` like any hand-drawn art, so `qa_deck.js`
  and the figure gate measure it exactly as they measured Pack 04's neural cover.
  Run them as always; nothing about 3D is exempt.

## Using one in a REEL (route documented, lane pending)

The mount route is the same baked PNG placed in the run dir and shown as a scene
element, animated by the engine's existing moves (`pop`, `rise`, `wipe`) — **no live
canvas and no three.js in the video build**. The reel templates do not yet carry a
dedicated image-slot element; that slot lands together with the first 3D reel theme
(AC's A/B/C/D pick, still open). Until then, do not hand-hack an `<img>` into a scene
without running the full gate battery — geometry gates see an image as one opaque box,
so it needs the same clearances as any art block.

## Re-baking or tuning an icon

Source of truth: `assets/threejs-lab/bake_icons.html` (one builder per icon, alpha
canvases, each wrapped in try/catch so one dead tile cannot kill the page). It imports
`./three.module.min.js`, so run it FROM `threejs-lab/`. Screenshot each canvas element
with Playwright `locator('#i-<name>').screenshot({omitBackground:true})`.

Hard-won build rules (cost two fix rounds + one corrupted file):
- **Stacked wireframe objects need the occlusion trick**: a solid ink-colored
  (`#0A0A0A`) core mesh inside each ring/coin so the depth buffer hides back rims.
  Without it every stack reads as a coiled spring.
- Hemisphere splits need ~0.24 world-unit offset to read; 0.09 reads as one sphere.
- Paper stacks: z-step ~0.2; at 0.55 they read as nested picture frames.
- Cylinders/cones as icons: draw profile lines + rim loops, never full edge
  geometry — the triangulation reads as ribs.
- Element screenshots capture **CSS layout size, not the canvas buffer** — kill any
  CSS width/height on the canvas or the bake silently downsamples.
- When editing the multi-tile file by script, **assert the anchor string is unique
  first** — a `rim` anchor once matched the hourglass tile and deleted five tiles.
- Icon canvases render ONCE (no rAF); `Math.random()` in sand/exhaust is fine for
  stills but means two bakes differ — re-bake ships a new file, not a pixel-identical
  one.

## Adding a new icon

Add a builder in `bake_icons.html` following any existing tile, keep it inside
flat-gold law, bake, READ the render before shipping, add its row to the catalog
above, and re-run the persist step. If it will recur across stories, it belongs here;
one-off art stays a per-run `ART` addition like Pack 04's neural cover.
