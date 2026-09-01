---
name: leads
description: >-
  One-shot demand run for AC Wins: drive ac-revenue to research and score Hong
  Kong print / direct-mail / mailing-house prospects and draft personalised
  outreach, filed in outbox/. Drafts only — nothing is ever sent. Run when AC
  types /leads, optionally with a count or segment.
disable-model-invocation: true
argument-hint: "[n] [segment or focus]"
---

# /leads — prospects found, outreach drafted

Thin runner. **ac-revenue owns the method** — where to hunt, how to score,
what a personalised first email sounds like, packaging and pricing. This
command frames the run, keeps it one-shot, and files the output.

## Arguments

- **`n`** — how many scored prospects to deliver (default: ac-revenue's
  standard batch).
- **Segment/focus** — e.g. "mailing houses", "follow-ups for last week's
  batch", "call list". No args → a standard new-prospect batch plus
  follow-ups due on previous batches.

## Run

1. **Preflight.** `python3 scripts/deck.py status --json` — check when
   `/leads` last ran, and read that run's outbox listing if it's still on
   disk. New batches must not re-pitch prospects from recent runs; the
   committed `deck/runs.jsonl` summaries are the cross-session memory, so
   write summaries worth reading later (segment + count + notable names).
2. **Output dir.** `python3 scripts/deck.py outbox leads`.
3. **Drive ac-revenue** (Skill tool). Not available → stop and say so.
   One-shot: scoring calls and pitch-angle choices get made, not asked —
   recorded in the handoff with runner-up angles.
4. **The hard rule survives everything: drafts only.** Nothing is sent, no
   send is scheduled, no tool that sends is touched. Every draft names a real
   human at the prospect, per ac-revenue's rules.
5. **File it** in the outbox: scored prospect list (the format ac-revenue
   specifies), outreach + follow-up drafts, call list, and `HANDOFF.md` —
   TL;DR, top three prospects and why, which draft to send first.
6. **Close out.** `python3 scripts/deck.py log --command leads --summary
   "segment · n prospects · notable names"`. Remote session → commit
   `deck/runs.jsonl`, push, send deliverables via SendUserFile.

## Reply to AC

Top three prospects with one-line whys, then where the drafts are. Nothing
else.
