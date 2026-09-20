# The imagery pack — one family of objects per post, brainstormed before the words

Set by AC on 2026-09-20 in a written round of questions. Every post — carousel, reel,
Prompt Drop, static — ships with its **own imagery pack**: the objects conceived for
that story, built as **one family**, approved at true size before anything mounts, and
held to **three colour families**. The pack is brainstormed at **Stop 0**, before any
slide copy or beat sheet exists, because the objects decide what the words have to say.

Four decisions, his words paraphrased once so they do not drift:

| Decision | AC's call |
| --- | --- |
| How much is designed per topic | **The full pack** — hero, one anchor per slide/beat, the rail glyphs — all for the story, one family. Catalog objects are legal only re-baked into the pack's look. |
| 2D or 3D | **The agent recommends per topic, with the reason; AC decides.** A reference sheet still outranks the recommendation. |
| Colours | **Three families — BLACK · GOLD · CREAM — counting the ground; shades of one family are one family.** Red is allowed when something very important has to be highlighted. |
| Where it sits in a run | **A new Stop 0**, then questions at every stop. Nothing proceeds on silence. |

---

## 1. What a pack is

| Role | What it does | Mount | Where |
| --- | --- | --- | --- |
| **hero** | the pack's motif; the one object a stranger remembers | 400 (cover) · 300 (exchange / close hero) | cover, the exchange slide, a reel's hook stage |
| **anchor** | one per slide or beat; means THAT slide's idea | 208 (280 on a Prompt Drop prompt slide) | lower-right of a slide, the stage band of a reel |
| **rail** | three small proofs under a stat line | 128 | cover proof rail only |
| **chip** | inside a pill or beside a letter | 72 (3D) · ≤60 is a 2D hairline, always | tier rows, level chips |
| **mark** | the brand diamond, drawn, never baked | 104 (close) · 34 (corner) | the close takes the mark; nothing else does |
| **stage** | a reel's scene graphic (doors, lanes, a bench) | per beat geometry | STAGE band only |

A pack is **one family**: one camera (3/4 front-left, fov 28), one light (warm key + gold
rim + hemi), one material set, one contact shadow, one scale system. Two looks inside one
pack is the defect this whole file exists to stop — it is what makes a deck read as
clip-art pasted from three places.

Slots with **no object by law**: the rule slide (the copy is the hero) and the close (the
mark signs). Declare them in `no_anchor`; the gate treats an undeclared empty slot as a gap.

## 2. Premium — what it means here, in ten checks

AC asked for premium and asked that its requirements be understood. Premium is
**restraint executed with craft**. It is not more detail, more gloss or more motion. An
object that fails one of these does not go on the board.

1. **One silhouette, 3–8 parts.** A stranger names it at 140px with the sound off. Busy
   reads as a smudge; two objects were rejected on this gate already.
2. **One family.** Same camera, light, materials, shadow and scale across every object in
   the pack. Mixed looks read as amateur even when each piece is good.
3. **True materials, not effects.** Matte gold trio (`#C9A961 · #8A7331 · #E7C765`) or
   polished physical gold. No glow, no grain, no gradient behind an object, no lens
   flare, no bevel-on-everything.
4. **A scale system, not ad-hoc sizes.** 400 · 300 · 208 · 128 · 72, and hairline below 60.
   Bigger is not better: at 300 a wireframe stops reading as a mark and reads as mesh.
5. **Negative space is the luxury.** ~30 words per frame; the object never touches type
   (the no-overlap gate) and never crowds the safe frame.
6. **Clean edges.** Real alpha, bbox clear of the frame, no white box, no dark fringe on
   the wrong ground. Gate 9 on arrival, every time.
7. **Consistent line weight (2D).** 1.25–1.5px hairlines at slide size, one stroke width
   per pack, strokes that scale with the object.
8. **Colour discipline.** Three families; gold means look here; the ONE lit accent per
   object is the part that carries the meaning; red is one declared element.
9. **Physical plausibility.** Objects sit (contact shadow), stacks occlude, nothing floats
   unless floating is the point.
10. **One move per beat (reels).** Rising mask or drop-and-settle, a 4% breathe at rest.
    Never a spin, a bounce or a wobble that says nothing.

What premium is **not**: clip-art, stock, emoji stand-ins, multicolour vendor logos,
glossy plastic, 3D for 3D's sake, a different style per slide, "more".

## 3. Stop 0 — the pack brainstorm

Fires **before the beat sheet or any slide CONTENT** — Lane A step 3c (after the
prompt-engineering brief, 3b), Lane B right after the carousel interview. Copy the sheet
and arrive filled:

```bash
mkdir -p pack && cp SKILL_DIR/assets/pack-brainstorm.template.md pack/brainstorm.md
```

The sheet carries, pre-filled on the real story:

- **The read** — the idea a 12-year-old could repeat, the one thing to see first, the
  turn, what the share-trigger person recognises.
- **Three directions that differ in METAPHOR**, not three object lists. Each: an object
  per slot with what it means, the dimension + look recommendation with the reason (§4),
  the colour declaration (§5), bakes needed and what re-bakes from the archive, the risk.
- **My pick, named, with two lines of why.** The board is for AC to overrule, not to
  choose from a blank.
- **The concept test** on every object of the pick: means the THING not the
  neighbourhood (a shield-with-tick says *protected*, the opposite of *breached*);
  nameable at 140px; one silhouette; not a hero in the last 14 days
  (`pack-archive.md`); no logo, clip-art or emoji stand-in; the one accent is the meaning.
- **The questions** — one `AskUserQuestion` form, tick boxes: direction A/B/C/other ·
  look accept/override · red off/on + which element · remaps in words · **Go / Hold.**

Silence is a Hold. Blank + "decide for me" = the named pick, and say so.

## 4. 2D or 3D — recommend per topic, with the reason

The recommendation goes on the sheet with its reason; AC decides. The rubric:

| The story is about | Recommend | Because |
| --- | --- | --- |
| AC attached a reference | **flat, traced** from it | the reference law — nine 3D bergs lost against a 2D drawing |
| a nameable physical thing (padlock, door, envelope, coin, bench) | **3D · matte** | mass reads; matte is the house look for carousels |
| a quantity, a system, a flow, "who counted" | **3D · wire** or a flat diagram in the engine's art blocks | structure without mass; a wire globe or a dot field says *system* |
| a Prompt Drop pack | **3D · polished** | the standing precedence — the pack is a product |
| a prompting move / a neutral UI demo | **2D flat glyphs inside the UI + one 3D hero on the cover** | the demo stays unbranded; the cover still needs a thing |
| anything mounting ≤60px | **2D hairline** | three baked sets were rejected in the chip slot |
| a reel | the pack's look, **mounted as prepped PNG, transform-only** | live three.js never runs in a video build; every timeline gate stays intact |

Tie-break: quiet luxury. When unsure, a matte 3D hero and a 2D flat rail, declared as
`"dimension": "mixed"`. Never two 3D looks in one pack.

The 12 Sep law — *never draw a new icon in SVG, bake or ask* — stands. A 2D direction
approved at Stop 0 **is** the ask.

## 5. The three-colour law

Every post carries at most **three colour families**:

| Family | Members | Rule |
| --- | --- | --- |
| **BLACK** | `#0A0A0A` ground · `#12100A` ink · `#141414` card · `#111009` bar | the ground counts |
| **GOLD** | `#F4DF95 · #E7C765 · #C9A23F · #C9A961 · #8A7331 · #796938 · #5E522C · #3A3218`, the band gradient, the tier gradations, the dim footnotes | light to dim, one family |
| **CREAM** | `#F4F0E7 · #E4DDCE · #B9B1A1 · #8A8371 · #6E695C` | warm white, stone and the dim greys |

Shades of one family are one family. Nothing else is on the post — no vendor colour, no
chart palette, no team colour, no "just a hint of blue".

**The red exception.** `#E5484D` (bright) / `#A32328` (deep) is allowed **when something
very important has to be highlighted** — ONE element: a hero number, a rule line, a struck
word. Declared at Stop 0 with the element and the reason; never chrome, never an icon,
never two elements. Gold keeps the brand; red is the one thing.

Open under this law, pending AC's call: a named person's **team colours** on a comparison
stage (`comparisons.md`, 25 Aug) are a fourth family. Until ruled, they are declared at
Stop 0 like red or not used.

**Gate 10 measures it.** `scripts/gate_colours.py` classifies every pixel of a rendered
slide or a sampled video frame into a family (8×8 box-averaged first, so text
anti-aliasing fringes fold into their glyphs while a 30×30px block of foreign colour still
fails) and fails on a foreign family, on undeclared red, or on four families:

```bash
python3 SKILL_DIR/scripts/gate_colours.py slides/                      # a deck
python3 SKILL_DIR/scripts/gate_colours.py AC_DayN_slug_subs.mp4        # a reel (2 fps)
python3 SKILL_DIR/scripts/gate_colours.py slides/ --declare black,gold,cream,red   # red declared
```

`produce.sh` runs it after the build, reading the declaration from `pack/pack.json`.
Decks run it by hand on the slide PNGs before the stills board.

## 6. Building the pack — one file, one look

```bash
cp SKILL_DIR/assets/pack-bake.template.html bake.html
cp -r SKILL_DIR/assets/vendor .                   # three.js, beside the template — same law as fonts
# set LOOK once; add one builder per object in OBJECTS (shape only, 3–8 parts)
node   SKILL_DIR/scripts/bake_pack.js  bake.html pack/raw          # 900px alpha PNGs, served over localhost
python3 SKILL_DIR/scripts/prep_pack.py pack/raw pack/icons --look matte   # crop to ink · square ×1.08 · edge check
```

- **`LOOK` is set once per pack** — `matte` · `polished` · `wire`. The builders describe
  shape through the material kit `K` (`K.base`, `K.deep`, `K.lit` for the one accent;
  `K.mesh`, `K.ext`, `K.core`), so the same builder renders in any look and the family
  (camera, key, rim, hemi, contact shadow, exposure) is fixed under ENGINE. A pack cannot
  drift into mixed looks because there is nowhere to put a second one.
- The recipes the looks encode: matte = the 2 Sep law (matte trio, warm key + gold rim,
  3/4 front-left, contact shadow); polished = the 9 Sep Prompt Drop law (MeshPhysical,
  clearcoat, bevelled extrudes, engraving `#6E5626`, a warm room for reflections);
  wire = the 22 Aug / 12 Sep law (edges at 18°, faint fill, one lit accent, bevels off,
  alpha ×1.45 at prep). Details and the cost-a-fix-round gotchas stay in `icons3d.md`.
- **prep_pack fails a cropped render.** An ink bbox touching the raw frame means the
  camera was too close — raise `FAMILY.camera.pad`, re-bake. Never ship it.
- **Flat (2D) packs** are traced SVG under the reference law or hairline glyphs, exported
  to PNG at 2× the mount, then prepped and gated exactly like a bake.
- **External generators** (Meshy / Midjourney, `prompt-engineering.md`) remain legal for
  a hero that wants more character than 3–8 parts carries — the result enters the pack
  through the same prep and gates, and must match the family's angle and light or it is
  a sticker.
- **Re-baking from the archive:** copy the builder from the archived pack's `bake.html`
  into this one. The look and family come from THIS file; that is the whole point.

## 7. The manifest — `pack/pack.json`

One declaration per pack; the gates and the board read it. Schema by example:
`assets/pack.example.json`.

```json
{ "pack": "The Finish Line", "topic": "…the number, the source…", "format": "promptdrop",
  "dimension": "3d", "look": "matte",
  "colours": { "families": ["black","gold","cream"], "red": { "on": false, "element": "", "reason": "" } },
  "slots": ["cover","02","03","04","05","06","07","08","close"], "no_anchor": ["02","close"],
  "objects": [
    { "key": "hourglass", "slot": "cover", "role": "hero",   "mount": 400, "ground": "black",
      "concept": "Sand caught mid-fall. Knowing when to stop.", "source": "bake", "file": "icons/hourglass.png" },
    { "key": "envelope",  "slot": "03",    "role": "anchor", "mount": 208, "ground": "black", "concept": "…", "source": "bake", "file": "icons/envelope.png" }
  ] }
```

`source` is `bake` · `trace` · `asset` (the mark, the IG pack) · `archive` (re-baked —
name the pack in `concept`). `ground` is `black` or `gold` (the ink-on-gold slide).

## 8. Gate 11 and the pack board — Stop 1a

```bash
python3 SKILL_DIR/scripts/gate_pack.py pack/pack.json                 # Gate 11 — hard stop
node    SKILL_DIR/scripts/render_pack_board.js pack/pack.json         # -> pack/pack-board.png
```

Gate 11 holds the manifest to the disk: every slot covered or declared `no_anchor`; every
file present, transparent (Gate 9), bbox clear of the edge; every object's ink inside the
declared families (red on an icon is never legal); no 3D under 60px; one look per pack;
red, when on, names its element and reason.

The board shows **every object at 600px, at its TRUE mount size on its ACTUAL ground
(black or the gold band), and at 140px feed size**, with the three swatches and the red
row. A board that shows icons at a convenient size is a mood sheet, not a gate. Worked
example: `assets/icon-boards/pack-board-example.png` (three matte objects, this pipeline,
2026-09-20).

**Stop 1a is mandatory now** — every run bakes, so the optional Day 41 bake board is
retired into this one. AC answers one form: objects to strike (multi-select) · family
reads as one (yes/no) · red placement confirmed · **Go / Hold**. A struck object loops on
his fix line until it passes; nothing mounts before the board passes.

## 9. The stops — four, each closing on a form

| Stop | What AC sees | The form |
| --- | --- | --- |
| **0 · pack brainstorm** | the sheet: three directions, the pick named | direction · look · red · remaps · Go/Hold |
| **1a · pack board** | every object at true size on its ground | strike list · one family? · red placement · Go/Hold |
| **1 · stills board** | one frozen frame per beat/slide at its busiest moment, pack mounted | fix list (numbered) · Go/Hold |
| **2 · the finished file** | the MP4 / the slide PNGs, gates run | headline strike round · Go/Hold |

The follow-up rule holds at every one: each round asks only what he could not have
answered before; nothing changes = a single Go/Hold; blank + "decide for me" = pick from
the offered set and say which. **Silence is a Hold, never a Go.**

## 10. Deliverables and the archive

The `pack/` folder rides in the run zip: `brainstorm.md`, `pack.json`, `pack-board.png`,
`icons/`, and `bake.html` (so the family can be re-baked later). Raw bakes stay out —
`bake.html` regenerates them.

After Stop 2, file the row in `references/pack-archive.md` (hero first, colours as
declared, where the PNGs live) and run the persist step. A pack that exists only in a
session's scratch dir did not happen.
