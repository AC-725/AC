# Technique Day — the prompting-move variant of Tool of the Day

A TOD where the "tool" is a **prompting move**, not a product. Born 2026-08-26 from the
morning shortlist ("AI TOD of the day as technique day"), on AC's call that it must work
in **ChatGPT, Gemini and Claude** alike.

Why it earns its own spec: a product TOD sends people off to *use* something, so it
carries vendor risk — pricing, gated rollouts, a free tier that evaporates. A technique
carries none of that, so the deep-research pass shifts entirely onto **the number**: the
claim that the move works has to be sourced, because the move itself is free and
unfalsifiable-looking.

## What makes it Technique Day

- **No vendor name anywhere on screen.** The closing card names ChatGPT, Gemini and
  Claude *together*, as text, once. Nothing else.
- **The demo UI is neutral and unbranded.** Never recreate a vendor's chat interface — no
  logo, no product colours, no recreated chrome. A plain message bar, plain bubbles, the
  brand's own hairlines.
- **One umbrella number opens the reel** and all the moves hang off it. Three moves with
  three numbers is three stories.
- **A copy beat is mandatory** (see below).
- **No day number, no date** — same as every graphic.

## The shipped shape · 29s · 7 beats

| Beat | Dur | Carries |
|---|---|---|
| Hook | 3.5s | Two headline lines, full width, frame-one loud. No fade. |
| Number | 4.0s | The umbrella figure counting down, its unit label, the plain-English line, the citation. |
| Demo | 6.0s | Camera pushes in. The bad prompt types into the message bar, sends, two jobs are tagged missing, then it splits into prompts that each land. |
| Rule 2 | 3.5s | Ghosted numeral behind the label, hairline, one line of body. |
| Rule 3 | 3.5s | Same frame, next move. |
| **Copy** | 5.0s | **The complete prompt, full width, "Pause here".** |
| Close | 3.5s | Mark, the three app names, the follow line, clears for the loop. |

Runtime is a judgment, not a constant: this story carried a comparison *and* three moves,
so it needed 29s. A single-move technique holds at ~20s.

## The copy beat — the reason the format exists

One beat shows the **complete prompt as plain copyable text**: full width, 34px minimum,
warm ink on `#141414` inside a gold hairline, lines building in sequence, with a
**"Pause here"** cue set in gold caps beside the beat label. The variable slot is set in
gold and bracketed (`[paste one you already like]`) so it reads as a slot, not
instruction.

The figure **drops to the bottom-left** for this beat rather than leaving frame — the
prompt gets the full width, he stays on screen.

Shipped example, all three moves folded into one prompt:

```
Before you start, ask me three questions
about what I need.

Then do one thing only: summarise the text
below in five bullets.

Match the style of this example:
[paste one you already like]
```

A technique the audience cannot copy is a technique they will not use. Without this beat
the reel is a fact, not a tool.

## Layout — the three lanes

A narrated reel columnises HARD BANDS, because the figure occupies the left of the frame
for the whole runtime:

```
FIGURE   x  24 – 354    y  866 – 1279     the narrator, always present
CONTENT  x 400 – 984    y  290 –  830     every beat body
CAPTION  x 400 – 984    y 1090 +          beside him, never under him
```

Full width (x96–984) is legal only **above y830** (the hook headline) or on a beat where
he has dropped down or stepped out (the copy beat). Each lane is a real clipped box —
nothing crosses an edge because the box eats it.

## The figure

The approved PNG, at its own aspect, transform-only. Per beat he has a **mark** — an x, y
and rotation — and travels between marks over 0.75s: centred for the hook and number,
~90px toward the chat for the demo, back out, in again for the last rule, down to the
bottom-left for the copy beat, settled centre-left for the close. Idle underneath all of
it: 13px bob, 9px sway, ±0.8° rotation, a breathing scaleY of ±1.4%.

**The indicator.** The locked akimbo pose has his hand on his hip, so he cannot point. A
gold hairline draws from above his head, up 232px and across to a dot at the content
lane, then retracts on the cut. It runs on beats whose content sits in the right lane —
the number, both rules, the close — and never on the hook (full width) or the copy beat
(he is down at the bottom).

## Hashtag lane

Prompting and technique tags, not news tags:
`#PromptEngineering #PromptingTips #AIProductivity #ChatGPTTips #WorkSmarter`

## Known gap

Built on the DC path (`dc-engine.md`) because the session had no shell — so it has no
`qa_layout.sh` run, no filmstrip contact sheet, and no MP4 gates 3–5. The lane boxes are
the substitute for the measure gate: geometry that cannot overlap beats geometry measured
afterwards. If a future Technique Day runs in a session **with** a shell, port these lanes
into the template and run the full gate stack.
