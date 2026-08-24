# Carousels and static posts

Absorbed from the retired `ac-design` skill on 2026-07-29. The rules below are AC's and
still stand; the brand law they inherit from is now `references/brand.md` and
`references/themes.md`.

> **GAP CLOSED 2026-07-30.** `assets/deck.template.html` and `assets/render_slides.js` are
> rebuilt and shipping. The engine now runs on the **four-theme system** (`base` · `crest` ·
> `column` · `margin`), dark or light, 1080x1350 x5, so a deck and a reel read as one system.
>
> ```bash
> cp SKILL_DIR/assets/deck.template.html deck.html
> cp -r SKILL_DIR/assets/fonts .            # fonts must sit beside it
> # edit CONFIG (theme, look) + CONTENT (5 beats), then:
> node SKILL_DIR/assets/render_slides.js deck.html slides <prefix> [theme] [look]
> ```
>
> Still missing from the old `ac-design`: the six named layouts below (`glyph`, `ledger`,
> `field`, `rhythm`, `editorial`, `console`) and `assets/sheets/`. The four themes replace
> them as the selection axis — the table below is kept as design history, not as a promise
> that those styles exist.
>
> **COLUMN's fold is handled deterministically.** `#zoneA` (kicker + icon) is pinned to the
> gold upper half and `#zoneB` (word + sub) to the black lower half, so no glyph can straddle
> the boundary and no gold accent lands on gold ground. This was a real bug on the first
> render, caught by eyeball and not by any audit. Never let the word slot flow across 675px.

---

## The engine — one content block, both formats

`deck.template.html` produces a **carousel or a reel from the same CONTENT**. Edit only
`CONFIG` and `CONTENT` at the top.

```js
CONFIG = { style:'field', theme:'dark', format:'post', handle:'@ITSAC.AI' }
```

| Key | Values |
|---|---|
| `style` | `glyph` · `ledger` · `field` |
| `theme` | `dark` · `light` |
| `format` | `post` (1080×1350 ×5) · `reel` (1080×1920 animated) |

`CONTENT` is five beats: `kicker`, `icon`, `word` (≤3 words, `<span class="g">` marks the
accent word), `sub` (the supporting line — in reel format this becomes the burned-in
subtitle, a standing rule for all AC videos).

The reel timeline deliberately matches the AI News scene windows
(0.0 / 2.6 / 5.0 / 7.5 / 9.6, total 11.4s) so `assets/reel_audio.py` stays in sync.
**Do not change them.**

## Art blocks — added 2026-08-02 (Day 19)

AC asked for more imagery than one icon per slide. A beat can now carry `art:'<name>'`
instead of `icon:'<name>'`, which swaps the single 172px glyph for a full-width art block
and moves a small mark up into the kicker row via `kicon:'<name>'`.

| `art` | Draws | Use it for |
|---|---|---|
| `source` | the Google / Gemini attribution chip | naming whose data this is |
| `split` | two direct-labelled bars, scaled to each other | comparing exactly two figures |
| `depth` | 100 dots, N lit | "N out of every 100" |
| `comb` | shallow teeth, one going all the way down | breadth vs depth |
| `choice` | two tappable A / B cards | the two-option comment device |

Four rules, each of which cost a render to learn:

1. **Art slides reorder to kicker → headline → art → sub.** The default stack puts the
   icon first, which on an art slide means the reader meets the chart *before* the claim
   it proves. Handled by `order` on `#stage.has-art`, which works only because
   `#zoneA`/`#zoneB` are `display:contents` outside COLUMN. Reordering also removed the
   46px gap `#iconwrap` used to hold between kicker and headline — they overlapped by 4px
   until `qa_deck.js` caught it, so the gap is restated on `.word`.
2. **The headline, the art and the sub must each do a different job.** Headline = the
   claim, art = the evidence, sub = what it means. The first Day 19 build stated 20.7 and
   13.5 in all three and wasted the slide.
3. **Art lives inside `#iconwrap` so `qa_deck.js` measures it.** Move it to a new element
   and it ships unaudited unless that element is added to the auditor's `TARGETS`.
4b. **COLUMN inverts the PROGRESS RAIL too — fixed 2026-08-07.** Same trap as rule 4,
   but on the theme's own furniture rather than on art. COLUMN's rail runs the full
   height of a frame whose ground changes colour at 675px, so the gold rail was
   invisible over the gold half: no visible progress on slides 1 to 4 of a 7-slide
   deck. The rail is now ink above the fold and gold below, with the gradient keyed
   to the **frame** (`background-size:14px 1350px`) rather than to the bar, whose
   height changes with progress. Light COLUMN inverts the fold and carries its own
   rule. `qa_deck.js` passed the broken version every time — **it measures ink
   position and overlap and has no concept of contrast**, so a perfectly-placed
   invisible element scores the same as a correct one. Third contrast bug to walk
   through a geometry gate (see also Day 22c). Eyeball every theme that puts ink on
   a coloured ground.

4. **COLUMN inverts every gold thing in the art to black.** In COLUMN the art sits in
   `#zoneA`, which is the gold half, so gold bars and gold dots go gold-on-gold and
   vanish. The override block exists for exactly this, and the audit cannot see the
   problem: it passed clean while the slide was unreadable.

**On third-party logos.** Source attribution is drawn in the page's own language: a plain
four-point spark for Gemini and "Google" set in Poppins, both gold. A real four-colour
corporate logo would put a second and a third accent on a slide whose entire law is one
gold idea on flat black. This is attribution, not brand artwork, and it is the right call
every time a source needs naming.

**Do not invent an art block to fill a slide.** If the figure behind it is not already on
the slide, cut the art. A chart that cannot be traced to a verified number is the hype
this page exists to counter. A proportion field was cut from Day 19's slide 1 for exactly
this reason: no clean rectangle of bubbles divides to 13.5%, so it would have drawn a
number that was not true.

## The six saved layouts

| Style | Character | Format |
|---|---|---|
| **Glyph** | One 430px icon, two hairlines, five ticks. Most stripped. | post + reel |
| **Ledger** | Left spine, node, giant ghosted step numeral. Best for recall. | post + reel |
| **Field** | Two zones, divider climbs each slide. Animates most naturally. | post + reel |
| **Rhythm** | Shared spine, role per slide, inverted gold slide 3. Balanced. | post |
| **Editorial** | Masthead, folio numerals, pull-quote. Quietest. | post |
| **Console** | UI card, segmented progress, gold button. | post |

## What AC decided a deck should be

- **Job: teaching for recall**, not arguing for shares. Structure beats persuasion.
- **Three words or fewer per slide.** The icon carries the meaning.
- **Thin chrome.** Hairlines, not frames.
- **Slide 1 must survive the square centre-crop** of the profile grid. Nothing critical
  outside the middle 1080×1080.
- **The character zone is FILLED** (2026-08-15). It was reserved "for AC's character
  when it exists"; the character exists (born Day 29, canonical mark 2026-08-13), so the
  condition is met. He stands bottom-left on the zone's line at 132px, on **beat slides
  only** — on a prompt slide the gold idea IS the prompt, and a second gold element
  competing with it breaks that law. `#stage.has-fig #body` reserves his band so copy
  cannot run into him, and **`scripts/qa_deck_figure.js` must be run**: `qa_deck.js`
  measures text blocks against each other and cannot see him at all.

## Light theme

Available via a `light` class. **On gold ground the accent becomes black**, so the "gold
means look here" signal does not survive. Treat light as a deliberate special-occasion
look, not a default. This is the same inversion rule the `column` theme uses.

## Guardrails

- **Verify the number, or don't design the slide.** No hype.
- **No day number or date on a slide.** The kicker is the pillar or the beat's role
  (`AI News`, `The shift`, `The proof`, `The catch`, `The rule`). See `brand.md`.
- **Three words or fewer** on the word slot. If it needs more, use Rhythm, Editorial or
  Console instead of stretching the engine.
- **One accent per slide.** Dark → gold. Light → black.
- **No em-dashes on screen.**
- **Never change the reel SCENES timings** without updating `reel_audio.py`.
- **The handle comes from `CONFIG.handle`** — one place, never hardcoded twice.
- **The character bookends a deck, he does not narrate it.** Beat slides only. Run
  `scripts/qa_deck_figure.js` after any layout change, because `qa_deck.js` is blind to him.
- **Don't invent a number to fill a beat.** If beat 3 has no real content, cut to four
  beats and say so.
- **Run `scripts/qa_layout.sh`** on any animated output, same as the video engines.
