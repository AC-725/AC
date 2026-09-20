# Spine reel — the third engine

A 1080x1920 reel engine, alongside AI News and Tool of the Day. Where those two rotate
through the four themes, Spine is its own fixed identity — always gold-top / black-bottom
— for a story that wants a headline big enough to read at a glance AND a persistent
"which beat am I on" indicator across all five scenes.

```bash
mkdir -p run && cd run
cp -r SKILL_DIR/assets/fonts .                       # fonts must sit beside the template
cp SKILL_DIR/assets/spine.template.html spine.html
# edit CONTENT + SUBS, then QA (below) before rendering
```

## Origin — fixing a lost working copy (2026-08-06)

AC sent three screenshots of an earlier, unnamed working copy with two defects: a
headline's second line overlapping its first (and the spine hairline cutting through
body text), and white (`#F4F0E7`) text in two spots where the brand's on-screen text
colours are black ink, stone grey, or gold — never white. That working copy was never
persisted (session skill files are a read-only cache — see `SKILL.md`'s persist step) and
could not be recovered, so this is a rebuild of the same visual idea from the screenshots,
engineered so the same bug class can't recur. What follows is why it's built this way,
not just what it does — the reasoning is what keeps the next edit from reintroducing it.

## What it looks like

- **The fold is fixed, not measured.** Gold owns the top 640px, always; black owns the
  rest, always. COLUMN's fold (in `deck.template.html` / `reel.template.html`) is
  *dynamic* — it measures each scene's content at load and slides the boundary to the
  best natural gap. That's the right call for COLUMN's kicker+icon stack, but Spine's gold
  zone carries a full headline, and a boundary that moves with copy length is only as safe
  as the copy you tested it with. A fixed boundary, sized generously and tested with real
  copy (per `qa-audit.md`'s stress-test rule), removes the failure mode entirely instead of
  chasing it per scene.
- **Above the fold:** a small ink kicker (optional) + a Gloock headline, up to ~3 lines,
  centred, in ink (`#12100A`) — the same "on gold the accent goes black, never white"
  inversion COLUMN already uses.
- **Below the fold:** kicker + a big gold stat (or a CUTS→HIRES toggle) + a stone-grey
  description, centred in the 640–1540px band via two equal flex spacers — so the block is
  vertically centred in that band NO MATTER how tall any one scene's copy is, instead of
  sitting at a hand-picked Y that only happened to work for the copy it was built with.
- **The spine** — five ring-and-dot nodes joined by upward arc bumps (the posted reel's
  look) on a fixed, reserved lane (1180–1260px), always in the same place. Node state
  (`future` / `now` / `done`) and segment colour (gold up to the active node, faint stone
  after) show progress across the reel. This is deliberately simpler than the old
  `carousel-spine.template.html`, whose hairline's Y-position was hand-tuned *per slide*
  via a `GEO` array and had to obey "exit[n] === entry[n+1], exactly" — a law that only
  holds if nobody changes the copy after tuning it. Spine's lane never depends on scene
  content at all, so there's no matching pair of numbers to keep in sync and no way for
  the line to drift into text.
- **The caption** — the standard typed-caption engine (`subtitles.md`), in a reserved
  band DIRECTLY UNDER THE FOLD (`top:684px`), not at the bottom. See the safe-zone
  section below for why bottom placement is dead on this engine.

## The Instagram-frame safe window (added 2026-08-06, same day)

AC posted a test cut and sent a screenshot from the Reels player. The app's own chrome
covers more of the frame than any spec sheet suggests, and it decided this engine's whole
vertical layout. Measured off his screenshot (mapped to 1080x1920) plus Meta's guidance:

| App chrome | Owns | Rule for this engine |
|---|---|---|
| Top bar | y 0–170 | gold-zone content starts below (goldpad `padding-top:170`) |
| Username / music / caption block | y ~1300–1920 | NOTHING readable below y=1300 |
| Like/comment/share rail | x 930–1080, y ~900–1330 | readable content stays left of x=930 in the lower half; body copy `max-width:780` centred = x 150–930 |

What that did to the layout, and why each piece is where it is:

- **The typed caption moved from the bottom band to directly under the fold (`top:684`).**
  In the test post, the bottom-placed caption sat inside IG's caption block and the
  watermark was literally covered by the post's own caption text. The band right under the
  fold is the one line the app never covers — proven by AC's own post, whose loop line sat
  exactly there and read perfectly. This deliberately overrides `subtitles.md`'s
  "column-style folds drop the caption to the lower black half" default: that rule
  predates checking any engine against the live app frame.
- **The spine dropped from 1560 to the 1180–1260 lane, and the last node sits at x=870.**
  At 1560 the lane was inside the caption block; at the old full-width node spacing the
  fifth node sat under the action rail (visible in AC's screenshot — the rail covers it).
  Only the decorative exit line now continues right of x=870, because losing a plain line
  under the rail costs nothing.
- **The bottom ~620px of the frame is deliberately empty black.** In the raw file it looks
  bottom-heavy; in the app that region is filled with IG's UI. Compose for the app, not
  for the raw file. The tiny watermark rides at y=1268 as file furniture (it may be
  half-covered; the handle the audience actually reads is scene E's).
- **Verify with the overlay check, not by guessing:** composite the three red rectangles
  above onto the five settle frames and READ them — every readable element must sit clear
  of red. This run's check script lives in the run log; rebuild it in three lines of PIL.

## Colour law (tightened 2026-08-06)

Three on-screen text colours only: **ink black** (`#12100A`, above the fold), **stone
grey** (`#B9B1A1`, supporting copy), **gold** (`#E7C765` family, the accent/hero/caption).
**No warm white (`#F4F0E7`) anywhere in this template** — that's the one brand colour the
other two engines use (COLUMN's default headline, CREST's headline) that Spine drops on
purpose, because AC flagged it as unreadable in the field where it showed up (a bold
aside inside body copy) and asked for the palette held to three colours. Two concrete
fixes from the flagged copy: the CUTS→HIRES toggle's "on" chip is ink-on-gold, not
white-on-black (this was already the *spec* in `reel.template.html`'s `.chip.use` — the
white was a drift from it, not a new choice); and bold emphasis inside body copy
(`.desc b`) is gold, not white — matching brand law's "one gold accent per scene" instead
of adding a fourth colour.

## Why the ghost audit failure is worth knowing about

The first build of the spine nodes used a CSS `transition` so the "now" node would ease
into its glow instead of snapping. `scripts/qa_layout.sh`'s gate 2 (ink-collision) flagged
phantom overlaps between unrelated wrapper elements — not a real defect, but a real
lesson: this engine is rendered by calling `seek(t)` and screenshotting, not by playing in
real time, so **anything whose appearance depends on wall-clock time instead of `t` alone
is a bug**, even if it looks fine in a live browser tab. A CSS transition is wall-clock by
definition. Removed; nodes now snap to state instantly inside `spineTick()`, which is the
only correct way to animate anything in a deterministic `seek(t)` engine. If a future edit
wants eased motion here, it has to be keyed to `t` (an interpolated value computed from
`st` inside `seek()`), the same way every other animated element in this file works.

## CONTENT shape

Five beats, same shape as the AI News reel (`hook` A · `shift` B · `proof` C · `rule` D ·
`cta` E) so a story can move between engines without re-deriving beats:

```js
hook:  { gk, ghead, stat, desc }
shift: { gk, was, now, line1, line2 }        // CUTS/HIRES-style before-after toggle
proof: { gk, ghead, kicker, stat, desc }
rule:  { gk, ghead, desc }                    // desc's <b> emphasis is gold, not white
cta:   { mono, ghead, tagline }               // circled monogram + handle (from HANDLE) + tagline
```

`SUBS` follows `subtitles.md` exactly — five entries, one per scene, `""` skips. In the
recovered example the caption **echoes the headline** (shortened), not the description —
match that pattern unless a scene has a better hook.

## QA — same gates, zero new tooling

This template implements the exact contract `scripts/qa_layout.sh` already expects
(`window.__TOTAL`, `window.seek(t)`, `#scenes .scene`, `.el[data-a]`), so the existing
gates work on it unchanged:

```bash
bash SKILL_DIR/scripts/qa_layout.sh spine.html
```

Gate 1 (bounds) and gate 2 (glyph ink, ≥18px clearance) both ran CLEAN on the 2026-08-06
build across the full timeline. Eyeball pass: render the five settle frames
(`start + dur*0.55`, the same convention `audit_capture.js` uses) plus a couple of
crossfade frames either side of each cut:

```bash
node SKILL_DIR/assets/render_frames.js spine.html qa "1.485,3.975,6.43,8.71,10.59"
```

**A timing rule this build had to learn:** every element's entrance animation must finish
comfortably before its scene's `start + dur*0.55` mark, or the standard settle-frame
convention captures it mid-fade and gate 2 checks it in a state it never actually holds at
rest. The first draft had scene B's second headline line finishing at 1.78s into a 2.5s
scene (past the 1.375s settle mark) — visually fine once the animation played out, but a
misleading QA capture. Keep every `data-a` entry finished with margin to spare before the
0.55 mark, scene by scene.

## Guardrails (inherits `brand.md`; nothing here overrides it)

- **Never invent a beat's content.** The template's `proof` beat currently carries copy
  DERIVED from AC's own scene-A caption pair ("Revenue went up. Down for 2%." → "2% say AI
  decreased their revenue") — it introduces no new figure, but AC confirms it before any
  real ship. Cut to four beats and say so if a story has no fifth.
- **The fold height (640px) is a tested constant, not a suggestion.** If a headline needs
  more than ~3 Gloock lines to say the point, the beat is trying to do too much — shorten
  it rather than growing the zone past what's been stress-tested.
- **Keep the reserved band (380px) empty.** It exists so the spine and caption never have
  to be measured against scene content — that guarantee only holds if nothing is ever
  placed there.
- **SCENES timings match the AI News reel windows on purpose** (0.0/2.6/5.0/7.5/9.6,
  total 11.4s). Retiming needs `reel_audio.py` retimed to match — see
  `references/variants.md`.
- **Run `scripts/qa_layout.sh` before every render.** Nothing overlaps. Ever.
