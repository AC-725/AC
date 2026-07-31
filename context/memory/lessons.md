# Lessons

What worked, what didn't, and the evidence behind it. Sample size always stated —
one data point is an anecdote, not a lesson. Newest first.
Tags: `[AC]` he said it · `[obs]` observed from an artifact · `[claude]` inference, not validated.

---

## 2026-07-31 · A correct fact with no expiry date rots silently

`[obs]` The TVP line in the assessment skill was **true when written**. The scheme closed
31 December 2024 and the line stayed in every client report for nineteen months. Nothing
flagged it, because nothing was watching — it was a fact, not a bug, and facts don't
announce that they've expired.

**Rule, permanent:** any client-facing claim about an external scheme, price, regulation or
third-party product carries a **last-verified date** and a **re-verify trigger** written
next to it. No exceptions for things that feel stable.

`[claude]` The same rot is almost certainly present elsewhere. The HK wage benchmarks in
`roi-assumptions.md` are seeded defaults of identical vintage, never verified, and
independent job-board figures now sit *above* them. Every skill should be swept for
undated external claims, not just this one.

## 2026-07-31 · Auditing found defects in 6 of 6 skills

`[obs]` Every skill audited so far has real defects: 3 in the assessment skill, 27 across
the other five. **Zero clean.** Three are client-safety issues — a contradictory
data-handling rule that could publish client staff rosters, silent date corruption in
spreadsheet cleanup, and roster codes hard-coded against the skill's own guidance.

**Lesson:** these were built fast and never adversarially reviewed. The design doc for the
assessment skill claims "tested (3 fictional-client runs passed) and spec-reviewed" — and
it still shipped three defects, including a table that contradicts its own formula. Passing
your own test runs is not the same as being audited. Sample: 6 skills, 30 defects.

## 2026-07-31 · Building delivery ahead of demand

`[obs]` Six `ac-wins-*` skills exist (assessment, comms, excel, invoices, quotes,
schedule) — a complete delivery stack. Client count: zero. Revenue: zero.

`[claude]` Reads as building the comfortable thing rather than the hard thing. Not
necessarily wrong — the assessment skill is the actual sales instrument, so it earns its
place pre-client. The other five deliver work that hasn't been sold yet. **Unvalidated.**

## 2026-07-31 · Skills built outside version control are lost

`[obs]` All six `ac-wins-*` skills live only in `~/.claude/skills/`, which is wiped
between remote sessions. Only `skills/ac-studio/` is in the repo. Real work has already
been lost this way in the ac-studio line (per its own changelog: an asset library and an
audio variant).

**Lesson:** anything built in a session that should outlive it goes in the repo, same
session. Sample: 2 confirmed losses.

## 2026-07-16 · Cold email into old-school HK SMEs — no signal yet

`[AC]` Batch sent, zero responses.

**Sample size: 1 batch, size unknown.** Not enough to conclude anything. A zero from 20
sends with no follow-up is normal variance; a zero from 300 with a 4-step sequence is a
verdict. Resolve the unknowns in `open-questions.md` before drawing the conclusion.

`[claude]` Working hypothesis, **not validated**: cold email is a poor channel fit here.
The ICP (traditional, relationship-led, family-run HK firms) buys on introduction and
face-to-face, and the channel uses none of AC's stated edge — live conversation,
trilingual, high presence in the room. Would be settled by comparing one referral-sourced
conversation against the next email batch.
