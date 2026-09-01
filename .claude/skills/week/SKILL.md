---
name: week
description: >-
  One-shot weekly planning run for @itsac.ai: drive ac-week to research and lay
  out the coming week's content board (five slots plus two reserves), filed in
  outbox/ for AC to clear in 30-60 minutes. Run when AC types /week; /week
  produce hands already-approved slots to ac-studio for production.
disable-model-invocation: true
argument-hint: "[produce] [--check]"
---

# /week — the week, prepared

Thin runner. **ac-week owns the method** — candidate research to primary
sources, slot logic, the board format, the handoff to ac-studio. This command
sets up the run, keeps it one-shot, and files the board.

## Two modes

- **`/week`** (default) — prepare the board. Research candidates, verify to
  primary sources, lay five slots plus two reserves onto the single scannable
  board. The board is *itself* the approval surface — preparing it never needs
  AC mid-run, so this is naturally one-shot.
- **`/week produce`** — AC has cleared the board: take the approved slots and
  hand each to ac-studio for production, one-shot per slot under the same
  rules as `/post` (no check-in blocks; calls recorded in each slot's
  handoff). `--check` restores ac-studio's interactive gates.

## Run

1. **Preflight.** `python3 scripts/deck.py status --json` — day counter and
   what the last `/post` and `/week` runs covered, so slots continue the
   series instead of colliding with it.
2. **Output dir.** `python3 scripts/deck.py outbox week`.
3. **Drive ac-week** (Skill tool). Not available → stop and say so.
   One repo-specific override: ac-week writes the finished week to AC's
   desktop — in a remote session there is no desktop, so the board and all
   slot files go to the outbox dir instead, and reach AC via SendUserFile.
4. **Close out.** `python3 scripts/deck.py log --command week --summary "..."`.
   Remote session → commit `deck/runs.jsonl` (plus run-log rows if `produce`
   shipped content) and push.

## Reply to AC

Default mode: the board's five slot titles as one line each, then where the
board lives. Produce mode: what shipped per slot, three lines max total.
