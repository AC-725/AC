# Part 1 — Visual System

## Palette

| Hex | Name | Use |
|---|---|---|
| `#0A0A0A` | Base Black | background of every frame |
| `#16130E` | Warm Charcoal | gradient depth |
| `#E7C765` | Signal Gold | primary accent |
| `#C9A23F` | Deep Gold | gradient mid-tone |
| `#F4DF95` | Light Gold | gradient highlight |
| `#F4F0E7` | Warm White | headline text |
| `#B9B1A1` | Muted Stone | body text |
| `#4ADE80` | Verdict Green | "works" — verdicts only |
| `#F87171` | Verdict Red | "failed" — verdicts only |

Gold gradient: `linear-gradient(118deg,#F4DF95,#E7C765 46%,#C9A23F)`.

**Verdict colors are information, not emphasis.** They appear only on
pass/fail marks, verdict chips, and result rows. Never on headlines,
backgrounds, or decoration. Gold remains the only attention color.

## Type — two fonts, never more

- **Space Grotesk** — headlines and big numbers. Geometric, slightly technical.
  Weights 500–700.
- **JetBrains Mono** — kickers, labels, verdicts, any number being presented as
  data. Weights 400–700.

Monospace is the highest-leverage brand cue. It reads "technical" instantly
with no other signal. When in doubt about a label, set it in mono.

Lora and Poppins are retired. Do not reintroduce serif headlines — an elegant
serif signals "consultant/coach", which is the wrong cue for builders.

Fonts are committed at `.claude/assets/fonts/` and installed by
`.claude/scripts/install-fonts.sh`. Renders will silently fall back to a
default sans if that script has not been run in the current environment.

## Screenshot frame

Proof content is screenshot-heavy: terminal output, dashboards, benchmark
tables. Raw screenshots look pasted-in without a consistent frame.

The frame: 1px border `rgba(231,199,101,0.28)`, 12px radius, 2px gold hairline
along the top edge, on the base black canvas. Template lives at
`.claude/assets/screenshot-frame.template.html`.

## Layout rules

- Black canvas, one idea per card.
- One gold accent per frame. Gold means "look here."
- Screenshots are first-class content, not decoration — give them room.
- Footer watermark: the handle, centered, muted gold.
