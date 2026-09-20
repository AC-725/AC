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

## Added 2026-08-31 (cover rail)

| `aicore` | the machine itself | chip outline + inner die + 12 dim pins + one lit gold core |
| `agentswarm` | many agents, counted | 9x6 field of mid-gold points, a scatter lit, measuring bracket left |
| `messagestack` | a pile of messages | five offset ruled slips, top one gold |
| `nohuman` | zero humans involved | person pictogram in dim gold, struck through in gold |

Baked from `bake_icons_cover.html` in **ac-studio-lab**. Mount these at **128px** on a
proof rail, not 208 — they are subordinate to the slide's anchor, and three at 208 would
each compete with the headline. First `agentswarm` pass used 13x9 dim points and vanished
at rail size; 9x6 at 0.155/0.225 with a doubled bracket reads.

## Added 2026-08-31

| `rule` | the rule slide, a line being set | straight edge + graduations + one gold measure mark and dot |
| `alternate` | the other option, a swap | two offset panels, front one ruled, swap arrow arcing over |

Both baked from `bake_icons_new.html` in the **ac-studio-lab** skill (the bake bench was split out 2026-08-31). **Bake gotcha:** the lab's ES
module imports are blocked over `file://` by CORS — serve the directory over http
(`python3 -m http.server`) and point Playwright at localhost, or every canvas comes back
empty with no error on the page.

## Re-baking or tuning an icon

Source of truth: `assets/threejs-lab/bake_icons.html` in the **ac-studio-lab** skill (one builder per icon, alpha
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

## Third look — polished, for Prompt Drop packs (2026-09-09)

three.js MeshPhysical: roughness .14, metalness .95, clearcoat 1, RoomEnvironment PMREM,
ACES. Bevelled extrudes, no grey slabs; engraving in deep gold `#6E5626`. Lights: key 3.0 +
gold rim 1.8 + kick 1.2. Render 512 @ pixelRatio 2, capture via snapshot_element scale 2 →
`assets/icons3d/pdNN-<name>.png` (1024px). Check every icon fits its frame before capture.
Bake page: `templates/prompt-drop/bake_icons.html` in the Claude Design project (not in
this package yet).

Precedence across the three looks: **polished → Prompt Drop packs · matte → other
carousels · wireframe → legal everywhere.** Never mix looks inside one pack.

**Matte set (2 Sep) — files missing from this package.** The 2026-09-02 update names ten
matte bakes (chip, bubbles, scale, dial, key, question, messagestack, hourglass, shield,
brain) in `assets/icons3d/matte/`. They were lost in the 4 Sep packaging regression; the
directory is absent here. Source: `ac-studio-lab/threejs-lab/bake_icons_day40.html`, or
AC's 3 Sep `.skill`.

## Vendor marks on the stage (AC, Day 41, 2026-09-11)

Vendor logos are legal on a STAGE graphic — never in the type band — when AC calls it on
the day. Cut from his supplied sheet, recolour flat `#C9A961`, **56px on the reel leaf,
68px on the cover.** Mount as an HTML `<img>` over the lane using the same door math as
the SVG — an SVG `<image>` lost its size under the transform stack. Store at
`assets/logos/{vendor}.png` (Day 41: openai, gemini, anthropic — **files live in AC's
Claude Design project, not yet in this package**). The neutral-UI law is untouched: a
lane label on a stage object is not a branded demo.

## Bake recipe · matte padlock (Day 41, 2026-09-11)

three.js r184. Body: rounded extruded slab 1.6×1.3×0.7, bevel .06. Shackle: half torus
r.5 tube .11 + two legs. Keyhole disc + slot in deep gold `#8F7233`. Material
MeshStandard `#D7B451`, roughness .5, metalness .5. Lights: warm key `#FFF1D6` ×3.4 at
(-3,4,4), gold rim `#E7C765` ×1.6 at (3,2,-3), hemi .9. ACES, exposure 1.35. Camera
(-3.6, 2.5, 6.4) → (0, .85, 0), fov 28. Render 1200 on `#0A0A0A`, then Gate 9 knockout:
luminance ramp 14→40 to alpha, crop to bbox +40, square. Result:
`assets/icons3d/matte/padlock.png`, no edge touch. Bake page `bake/day41_padlock.html`.
**PNG and bake page are in AC's Claude Design project, not yet in this package.**

## Wireframe recipe, Pack 09 form (2026-09-12, reference-driven)

The 9 Sep precedence (polished for Prompt Drop) is overridden the moment AC attaches a
reference sheet — reference law outranks format precedence. Pack 09's sheet asked for
wireframe, so wireframe governed:

Gold edge lines (`EdgesGeometry`, threshold 18°), fill alpha `.035`, and **one lit accent
per icon** (`#E7C765`, fill `.55`) — the small gear inside a train, the front card of a fan,
the dots inside a bubble, the rules on a stack. One accent, never two; the accent is what
tells the eye where the idea is.

Recipe (`bake/pd09_icons.html`, in AC's Claude Design project):
- **Bevels OFF for wire.** A bevelled extrude doubles every edge and the icon reads as mesh.
- `NoToneMapping`.
- Alpha lift **×1.45** on the knock-out — hairlines vanish at 208px without it.

Five bakes this run: gear, geartrain, fanoffive, speechbubble, docstack.

**Prep, one pass:** knock luminance ≤14 → alpha 0, ramp 14–40, crop to alpha bbox, square at
×1.08, write back. Then check no bbox edge touches the raw frame — an alpha cut-out touching
the edge is a cropped render.

## The Instagram action pack — `assets/ig/` (2026-09-13)

Five icons cut from AC's own supplied sheet, recoloured flat `#C9A961`, alpha taken from the
ink: `like` `comment` `repost` `share` `save`. **These retire the 1.4px drawn hairline glyphs
from 2 Sep** — the action row is an asset now, not a drawing, because a hand-drawn Instagram
glyph is recognisably not the Instagram glyph and the eye catches it.

Native sizes are 60–71px square (the source sheet is 554px wide), which is above every legal
mount, so they stay sharp:
- **Close slide, labelled four-up:** 40px. The one being asked for is lit; the others sit at
  `.45` opacity.
- **Intro SAVE · SWIPE cue:** `save` and `share` flanking the line at 34px.
- Nowhere else. An action glyph anywhere but the intro cue and the close reads as clutter.

Cutting method, if the sheet is ever re-supplied: column-project the ink (`255 − min(r,g,b)`,
which catches both the black outlines and the red heart), split on the gaps, crop each column
to its own row extent, square at ×1.08, recolour, alpha from ink. Verify no edge touch.

## Icon boards — `assets/icon-boards/`

`finish-line-icon-board.png` — the Pack 07 board, kept as the worked example of the format:
every anchor shown at TRUE mounted size (280px prompt slides, 300px close), the unmapped rest
of the pack dimmed on a bench below, and a foot line stating the count and whether any new
bake is required. A board that shows icons at a convenient size instead of the real one is
not a gate, it is a mood sheet.
