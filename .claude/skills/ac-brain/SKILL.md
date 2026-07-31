---
name: ac-brain
description: AC Wins' business memory. Use whenever AC reports something that happened in the business — a call, a client conversation, a reply or a no-reply, a price quoted, a decision made or reversed, an outcome, a lesson — or asks what we know about a company, person, price, or past decision ("where are we with X", "what did we decide about Y", "have I talked to Z", "what's in the pipeline"). Also use before advising on pricing, positioning or outreach, so the advice is built on the record instead of guesses.
---

# AC Wins — Business Memory

The stable layer is `context/IDENTITY.md`, `SOUL.md`, `USER.md` — who AC is, what the
business is, how to work with him. Those change rarely.

This skill runs the **moving layer**: `context/memory/`. What happened, what was decided,
what was learned, what is still unknown.

## The one rule that makes it work

**AC talks, you write.** He is sharpest in live conversation and stalls on operational
grind — his own words. Never hand him a template, a form, or a "please log this."
Extract the memory from what he already said, write it yourself, and tell him in one
line what you recorded.

If a detail is missing, ask at most one question, and only if the entry is useless
without it. Otherwise write it with the gap marked and move on.

## The four files

| File | Holds | Written when |
|---|---|---|
| `decisions.md` | What was decided, when, why, what would reverse it | AC settles a question — pricing, positioning, scope, tooling |
| `pipeline.md` | Companies and people: state, last contact, next step | Any contact, reply, no-reply, meeting, intro, referral |
| `lessons.md` | What worked, what didn't, and the evidence | An outcome lands — a channel converts or doesn't, a pitch sticks or dies |
| `open-questions.md` | Unknowns that block a decision | A question surfaces that can't be answered yet |

Read only the file the task needs. Don't load all four to answer one question.

## Provenance — tag every line

Three tags. They exist so speculation never hardens into fact.

- **`[AC]`** — AC said it. Highest trust.
- **`[obs]`** — observed from an artifact: a file, a number, a document, a real result.
- **`[claude]`** — my inference, analysis or recommendation. **Not validated.** Anything
  tagged `[claude]` must never be quoted back later as though AC decided it.

An untagged line is a bug. When a `[claude]` entry is later confirmed by AC or by
evidence, retag it and date the change.

## Writing rules

- **Date every entry** (`YYYY-MM-DD`). Newest first within a section.
- **Supersede, never delete.** A reversed decision keeps its original line, marked
  `SUPERSEDED <date> → <what replaced it>`. The reversal is the useful part.
- **One fact per line.** No paragraphs. This gets scanned, not read.
- **Numbers keep their source.** `HK$6,000 [AC]` is fine; `about six thousand` is not.
- **Pre-revenue facts rot fast.** An entry older than ~90 days with no confirmation is
  stale — say so when citing it rather than presenting it as current.
- **No client PII beyond what the work needs.** Names of companies and roles, yes.
  Personal contact details, no — those live in AC's own tools.

## Retrieval

When AC asks a business question, check memory before answering. Cite the entry and its
date inline: *"Lofty site was pre-launch as of 2026-07-31 [AC] — still true?"* Stale or
`[claude]`-tagged material gets flagged as such in the answer, not laundered into
confidence.

If memory contradicts what AC just said, say so plainly and ask which is current. Then
update the file.

## After writing

Memory lives in the repo, so it survives — unlike `~/.claude/skills/`, which is wiped
between remote sessions. Commit changed memory files on the working branch with a
one-line message naming what moved. Don't batch a week of changes into one commit; the
dates are the point.

## Common mistakes

| Mistake | Fix |
|---|---|
| Asking AC to log something himself | Write it from what he already said |
| Recording an analysis as a decision | `[claude]` until he actually decides |
| Deleting a reversed decision | Mark `SUPERSEDED`; the reversal is the lesson |
| Citing a 4-month-old pipeline state as current | Flag the date, ask if it still holds |
| Loading all four files for one question | Read the one that answers it |
| Drawing a conclusion from one data point | Note the sample size in `lessons.md` |
