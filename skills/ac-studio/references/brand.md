# Brand law — the visual system

One system, infinitely repeatable. Every frame = **flat black ground, one gold idea,
elegant display type**. This file owns the palette, the type and the laws. If a change
would alter any of them system-wide, it belongs here — not in a template.

---

## The ground

**Flat `#0A0A0A`. One value.** No gradient, no glow, no film grain, no background motif,
no drifting particles. If you are tempted to put something behind the type, don't.

*History, so it doesn't get reintroduced:* the § background motif was retired 2026-07-27.
Drifting ember particles and the living glow were removed 2026-07-29. A circled AC
monogram was trialled as a replacement mark and also removed. The ground is now the
absence of all of it, and that is the design.

## Palette (exact values — gold is the only accent)

| Hex | Name | Use |
|---|---|---|
| `#0A0A0A` | Base Black | the ground of every frame |
| `#C9A23F` | Deep Gold | gradient mid-tone |
| `#E7C765` | Signal Gold | primary accent |
| `#F4DF95` | Light Gold | highlight / sheen |
| `#F4F0E7` | Warm White | headline text |
| `#B9B1A1` | Muted Stone | supporting text |

Gold gradient (figures, the `to` chip, blocks): `linear-gradient(118deg,#F4DF95,#E7C765 46%,#C9A23F)`.

**On gold ground the accent inverts to black.** This is the only exception to "gold means
look here", and it exists because gold-on-gold carries no signal. See COLUMN.

## Type

**Poppins** — kickers, labels, body, chips. Every small element, every theme, always.
Weights 400–700. Never substitute.

**One display face per theme** — the headline, the figure and the handle. This replaced
the single-serif rule on 2026-07-29 because four themes that share a face do not read as
four themes. Lora remains the fallback if a face fails to load.

| Theme | Display face | Character |
|---|---|---|
| `base` | **Gloock** | high-contrast luxury serif |
| `crest` | **Bricolage Grotesque Bold** | contemporary grotesque, set in caps |
| `column` | **Italiana** | ultra-fine elegant serif |
| `margin` | **Instrument Serif Italic** | editorial italic |

The `.ttf` files ship in `assets/fonts/` and are referenced relatively. **Keep them with
the templates.** If they go missing every theme silently falls back to Lora and you get
no error — the frames just quietly stop being four themes.

## Fixed frame elements

- Thin gold frame border inset ~46px.
- Gold **corner ticks** — but only two per theme. See the block law below.
- Top **kicker**: a gold live-dot + the section label, letter-spaced, uppercase.
- Footer **watermark** = the handle (from `HANDLE`), centred, muted gold.
- **The progress block** — full bleed, and it is the theme's signature.

## The block law

> **The progress indicator IS the theme's block.** Where it sits and how much mass it
> carries is the identity. The corner ticks mark the edge it runs along. Hierarchy,
> type case and colour balance all move with it.

This exists because the previous system separated themes by lighting and by a 4px inset
hairline, and at feed size all four collapsed into "display type on black". A distinction
that only survives in a spec sheet is not a distinction. **Test every theme at 140px
before you believe it works.**

## On-screen guardrails

- **No day number and no date on any post graphic.** Not on a reel frame, not on a cover,
  not on a carousel slide, not in the caption's first line. AC ruled 2026-07-30: the page
  is not a numbered series, and a "Day 17" badge both dates the post and implies a run the
  viewer thinks they have missed the start of. Day numbers stay in `run-log.md` as internal
  bookkeeping only. The kicker carries the pillar (`AI News`, `Tool of the Day`) and nothing
  else. A source's own date inside a stat line ("Meta Q2 2026 earnings call") is a citation,
  not a post date, and is fine.
- One gold accent per scene. Gold means "look here."
- No em-dashes on screen, ever. Period, comma, or line break.
- Plain English only. Kill buzzwords and "this changes everything."
- ~30 words max on any single frame; lots of black breathing room.
- Never add other colours, stock photos, or clip-art. If a company must be named, use a
  clean gold wordmark, not a multicolour logo.
- **`text-transform: lowercase` is banned on any element that can carry a figure.** It
  turns `$725B` into `$725b`. MARGIN uses italic instead, for exactly this reason.
- **Nothing may overlap.** Separate content groups keep ≥18px of clear glyph space; two
  lines of one headline are judged proportionally. Enforced by `scripts/qa_layout.sh`,
  which is not optional — see `references/qa-audit.md`.
