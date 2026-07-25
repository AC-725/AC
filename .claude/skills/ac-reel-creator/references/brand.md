# Brand — the fixed look

One system, infinitely repeatable. Every reel = **black canvas, one gold idea, one real
number.** That consistency is what turns a feed into a brand. The engine already
encodes all of this; use this page when building a cover or checking a frame.

## Who
- **Brand:** AC — *AI tools, tested*. **Person:** Austin (goes by AC).
- **Handle:** on every frame (footer watermark + the CTA card), set in ONE place — the
  `HANDLE` constant in `reel.template.html`. Default and current handle: `@itsac.ai`
  (matches itsac-instagram and ac-tool-of-the-day). To use a different handle, change
  that single line. Never hardcode a handle elsewhere or mix two on one reel.
- **Promise:** making AI make sense for normal businesses. One real AI trend, plain English,
  zero jargon.
- **Feeling:** premium, calm, confident. "Quiet luxury," not "hustle bro."

## Palette (exact values — gold is the only accent)
| Hex | Name | Where |
|-----|------|-------|
| `#0A0A0A` | Base Black | background of every frame |
| `#16130E` | Warm Charcoal | gradient depth |
| `#E7C765` | Signal Gold | primary accent & monogram |
| `#C9A23F` | Deep Gold | gradient mid-tone |
| `#F4DF95` | Light Gold | gradient highlight / sheen |
| `#F4F0E7` | Warm White | main headline text |
| `#B9B1A1` | Muted Stone | body / supporting text |
| `#4ADE80` | Verdict Green | "works" — verdicts only, never decoration |
| `#F87171` | Verdict Red | "failed" — verdicts only, never decoration |

Verdict colors currently render only in the proof-post frame
(`.claude/assets/screenshot-frame.template.html`). The reel templates have no
verdict slot yet — do not reference these two colors in reel scenes until one exists.

Gold gradient (numbers, the `to` chip, buttons): `linear-gradient(118deg,#F4DF95,#E7C765 46%,#C9A23F)`.

## Type — two fonts, never more
- **Space Grotesk** — headlines & big numbers. Geometric, slightly technical.
  Weights 500–700.
- **JetBrains Mono** — kickers, labels, verdicts, and any number presented as data.
  Weights 400–700. Not for paragraph copy — body text stays Space Grotesk.

Neither font is installed by default. Run `.claude/scripts/install-fonts.sh` once per
environment, or headless Chromium silently falls back to a default sans and every render
is wrong with no error. Verify with `NODE_PATH="$(npm root -g)" node tests/render/check-fonts.js`.

## Fixed frame elements
- Thin gold frame border inset ~46px, plus gold **corner ticks** at the four corners.
- Top **kicker**: a gold live-dot + the section label, letter-spaced, uppercase.
- The faint **§ motif** drifting in the background — the same mark used on the carousels,
  tying the reel and grid into one brand. Keep it barely visible.
- Footer **watermark** = the handle (from `HANDLE`), centered, muted gold.

## On-screen guardrails
- One gold accent per scene. Gold means "look here." Verdict green/red carry
  information only and never act as accents. The retouch FX are texture, not accents.
- No em-dashes on screen, ever. Period, comma, or line break.
- Plain English only. Kill buzzwords and "this changes everything."
- ~30 words max on any single frame; lots of black breathing room.
- Never add other colors, stock photos, or clip-art. If a company must be named, use a clean
  gold wordmark, not a multicolor logo.
