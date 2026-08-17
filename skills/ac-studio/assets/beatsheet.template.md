# Beat sheet — Day __ · [AI News | Tool of the Day] · <story slug>

One pass, every word deliverable. Fill the beats first; every other column falls out of
them — scene copy, VO, subtitles, caption, hooks. Copy this file into the run dir
(`cp SKILL_DIR/assets/beatsheet.template.md beatsheet.md`), never edit the original.
Rules live in references/voice-and-caption.md and references/subtitles.md.

## Story (verified before anything below is written)

- **Payoff, one sentence:**
- **The number:** · **Primary source (link + their wording):**
- **Second number / chip:** · **Source:**
- **AC's angle (the reframe):**
- **Stake left open after the payoff** (the macro open loop the piece resolves — hooks.md rule 2):
- **Arousal — what the viewer feels** (surprise | indignation | relief | awe | empathy | trust — storytelling.md register):
- **Default assumption the number breaks** (the curiosity gap; can't write one → no post — storytelling.md #4):
- **Pattern interrupt — where + what** (ONE, mid-piece, scene C–D / slide 4 — storytelling.md #5):
- **Send target — NAMED person-type + motive** (Gift | Mirror | Idea | Gossip | Mood):
- **Engine / theme:** [News | TOD] base | crest | column | margin — or [Spine] (fixed, not theme-rotated) · **Hook style:** thesis-first | concrete-image | direct-callout | identity/Gift | dated-prediction | receipts
- **Bilingual (繁體中文)?** yes | no

## Beats → everything

One row per scene (News A–E · TOD A–G). Write the BEAT first — the single point the
scene makes. Copy, VO and SUB all restate that beat, never introduce a new one.
SUB rules: glanceable fragment, figures intact, no em-dashes, `""` skips.

**VO SYLLABLE BUDGET — write the VO to this, not to the beat.** A calm authoritative
read is ~3.4 syl/sec; above 4.7 the line cannot be performed at all. The screen and the
subtitle already carry the detail, so the VO carries only the claim and the instruction.
Do not narrate what is on screen.

| News scene | window | budget | | TOD scene | window | budget |
|---|---|---|---|---|---|---|
| A · hook | 2.6s | 9–11 syl | | A | 3.6s | 12–14 |
| B | 2.4s | 8–9 | | B | 4.0s | 13–16 |
| C | 2.5s | 8–10 | | C | 3.6s | 12–14 |
| D | 2.1s | 6–8 | | D | 4.3s | 14–17 |
| E · sign off | 1.8s | 5–6 | | E | 7.0s | 23–28 |
| **total** | **11.4s** | **~38** | | F / G | 3.7 / 5.4s | 12–15 / 18–22 |

Scene A may sit at the top of its band (it is the loud open). The CLOSING scene should be
the slowest in the reel — that is where the instruction lands. Check it mechanically before
building the PDF: `python3 SKILL_DIR/scripts/vo_budget.py vo_spec.json [--engine tod]`.

| Scene | Beat (the point) | On-screen slots | VO line (timed) | SUB fragment |
|---|---|---|---|---|
| A · hook | | | | |
| B | | | | |
| C | | | | |
| D | | | | |
| E | | | | |
| F (TOD) | | | | |
| G (TOD) | | | | |

When the sheet is full, run the **story pass** (references/storytelling.md): six devices,
one honest line each. A row you have to talk your way through fails — fix the story, not
the wording, before filling the template.

## Caption

- **SEO first line (plain-language search phrase):**
- **Body** (one big number · a question · soft CTA, em-dash lead allowed here):
- **Hashtags (5, trending-but-rankable):**
- **繁體中文 version** (if chosen):

## A/B hooks (grade each: stop A–F / send A–F + motive)

- **A:**
- **B:**

## Cover

- **Kicker:** · **Headline:** · **Number:** · **Label:**
