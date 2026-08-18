# Prompt Drop — the Saturday format

A recurring carousel: **cover + 3 to 5 prompts + close** (5 to 7 slides). Shipped
Saturdays. Five is the fuller haul and the stronger save; three is the sustainable
floor when the week is thin. Pack 01 shipped at five.
It is the page's only *instrument* format. Everything else on the feed teaches;
this one hands over something the viewer can paste into a chat window on Monday.

Born 2026-07-31 from a competitor teardown (@itsaiguide, "7 Claude prompts",
strong engagement). The mechanics transferred; the execution did not.

## Why the format works (the parts worth keeping)

1. **A countable pack.** "5 prompts" is a finite haul the viewer cannot absorb in
   one scroll. That is what converts a like into a save.
2. **Copy-paste instruments, not inspiration.** The value sits in a block the
   viewer can literally take. Ideas get scrolled past; tools get kept.
3. **Payload distributed across slides,** so slide 4 still has value and the
   swipe goes deep.
4. **Locked structure.** Every prompt slide is built the same way, so the format
   reads as a series even though the theme rotates with the reels.
5. **It is a format, not a post.** New topic each week, same machine.

## What the source post did that AC does not

- Opened with "BREAKING" on evergreen content and claimed a "$500/hour expert"
  standard. Unverifiable superlative, and nothing broke. The page's whole
  position is the antidote to that.
- Red circuit-brain stock imagery, face on 60% of every slide. That *is* the AI
  hype aesthetic.
- Prompts anyone could write, with no proof and no guidance on the output.

## The edge

Everyone else hands over the prompt. **This format hands over the prompt, what it
gives back, and the one line to change for your business.** The `You get back`
line is not decoration; it is the whole differentiator. Never ship a prompt slide
without it, and never let it restate the prompt. It says what lands in front of
you, in plain English, and ideally names the part that is worth money.

## Slide map

| # | Type | Carries |
|---|---|---|
| first | beat | kicker `Prompt Drop` · the verified number as the hero · the countable promise (`5 prompts`) |
| middle | prompt | `Prompt 01`…`Prompt 05` · a ≤3-word title · the verbatim prompt · `You get back` |
| last | beat | kicker `The rule` · the one-line principle · the comment keyword |

The first and last slides use the normal `kicker / icon / word / sub` beat.
Everything between uses `type:'prompt'`. The engine reads `CONTENT.length`, so the
progress block and the `n / N` counter scale on their own — nothing to change when
the pack grows or shrinks.

**Order the middle by muscle, and end on the general one.** Pack 01 ran money owed
→ money not yet won → the books → the inbox → sound like you. The strongest chore
goes second (it has to earn the swipe to slide 3); the one general-purpose prompt
goes last, because a capstone that improves every prompt above it is a better final
beat than a fifth chore. Say so in the caption ("run the last one first") or it
reads as an afterthought.

```js
{ type:'prompt', kicker:'Prompt 01', num:'01', title:'Get paid.',
  prompt:'the verbatim prompt, 40 to 55 words, brackets for what they swap',
  back:'What lands in front of them. <b>Bold the part that is worth money.</b>' }
```

## Card styles

`CONFIG.card` picks how the prompt block is presented. All three survive all four
themes, both looks, and the layout audit.

| | Character |
|---|---|
| **`card`** ← **AC's pick, 2026-07-31** | Hairline box, gold quote glyph inside the top-left. Reads most obviously as "here is a thing to copy." Safest. |
| **`terminal`** | No box. Gold rail down the left, caret at the end, `PROMPT 01` in a bordered chip. Reads as something typed, and rhymes with the TOD reel's typing-prompt signature. |
| **`ledger`** | No box. Gold rule above the prompt, giant ghosted numeral top-right, hairline above the payoff. Quietest and most premium. |

## Writing the prompts

- **40 to 55 words.** Under 40 and it is a template anyone could write; over 55
  and it stops fitting `column` at a legible size.
- **Square brackets for what the reader swaps in:** `[14] days overdue`,
  `[paste them]`. It makes the block visibly theirs to edit.
- **Every prompt names a role, a constraint, and an output shape.** "You are my
  credit control assistant" + "under 120 words, no apology" + "three versions:
  gentle, firm, final." That specificity is why the output is good, and it is
  the thing a generic prompt list never does.
- **One line in each prompt should surprise.** "Flag anything I have not priced
  or forgot to ask." "Tell me which one is costing me money." That is the line
  that gets screenshotted.
- **Pick one job the audience hates,** and make each prompt a different muscle of
  it. Money owed, money not yet won, the books, the inbox. Not five flavours of the
  same task.
- **One prompt in the pack should be general-purpose** — usable by someone who does
  not run a business at all. It widens the send radius, and it is the slide that
  gets saved by people the rest of the pack does not fit.

## Laws inherited (all still apply)

- **The cover carries one verified number**, checked against 1–2 credible
  sources, in the source's own wording. Same law as every reel.
- No day number or date on a slide. The kicker carries the pillar.
- No em-dashes on screen. The caption may use the em-dash CTA lead.
- One gold idea per slide. On a prompt slide **the gold idea is the prompt** —
  the quote glyph, rail or numeral marks it, and nothing else competes.
- Slide 1 must survive the square centre crop.
- The AC figure bookends the pack: cover and close only, never a prompt slide.
  Run `scripts/qa_deck_figure.js` as well as `qa_deck.js`.
- Run the audit before rendering (see below).

## Build

```bash
cp SKILL_DIR/assets/deck.template.html deck.html
cp -r SKILL_DIR/assets/fonts .
# edit CONFIG (theme, look, card) + CONTENT, then:
node SKILL_DIR/assets/qa_deck.js deck.html <theme> <look> card,terminal,ledger
node SKILL_DIR/assets/render_slides.js deck.html slides <prefix> <theme> <look> <card>
```

**`qa_deck.js` exists because `qa_layout.sh` gate 2 reads `SCENES`, a reel-template
global, and dies on a deck.** So the deck engine had no per-slide ink check at all
until now. `qa_deck.js` walks every slide in every requested card style, measures
**glyph ink** (not element boxes, so a descender cannot sit on the line below),
and fails on anything leaving the safe frame or overlapping. It caught three real
bugs on the first build: the quote glyph's opaque pad eating the first word of the
prompt, the ledger numeral colliding with any title longer than two words, and the
same numeral hanging 26px off the right edge of the canvas.

## Cadence

Saturdays. Theme rotates with the reels (check `run-log.md` for what ran recently)
— the *structure* is what makes it recognisable, not a locked colourway.

The close slide always ends on a **comment keyword**, and the keyword is always
the pack: `Comment PROMPTS and I will send all five as a copy-and-paste doc.`
Comments and DM sends are the two heaviest-weighted 2026 signals, and the DM is
the top of the Save → Follow → Comment → DM ladder.

**The DM must be ONE message, not five.** AC answers DMs by hand, so the standing
rule is that any comment-keyword gate promises a pasteable one-message artifact and
never a list he has to assemble per person. Write `dm_reply.txt` before the post
goes up and paste it verbatim. A keyword with nothing behind it burns trust once
and never recovers.
