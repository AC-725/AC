---
name: brief
description: >-
  One-shot morning brief for @itsac.ai: pull real Instagram numbers via the
  Graph API script, have ac-growth diagnose them against benchmarks, and hand
  AC today's 15-minute engagement play. Run when AC types /brief.
disable-model-invocation: true
argument-hint: "[--days N]"
---

# /brief — numbers, diagnosis, today's play

Thin runner. **ac-growth owns the analysis** — benchmarks, the 3-second
profile test, audience psychology, the 15-minute daily engagement workflow.
This command fetches the data, frames the run, and files the brief.

## Run

1. **Output dir.** `python3 scripts/deck.py outbox brief`.
2. **Pull the numbers.**
   `python3 scripts/instagram_insights.py --days N` (default 28) with a
   `--json` copy saved to the outbox as `snapshot.json`.
   - `IG_ACCESS_TOKEN` unset or expired → **don't stop.** Run the brief
     without numbers, open with one line pointing at
     `docs/instagram-setup.md`, and lean on the qualitative checks instead.
3. **Drive ac-growth** (Skill tool) with the snapshot: what moved since the
   last brief (compare `deck/runs.jsonl` history and any prior snapshots),
   what's flat and why per the benchmarks, and today's 15-minute engagement
   play with the exact accounts/actions. Not available → stop and say so.
4. **File `BRIEF.md`** in the outbox:
   - Numbers — the five that matter, each with delta and one-line read
   - Diagnosis — the single biggest lever right now
   - Today's 15 minutes — a checklist AC can run from his phone
   - Content note — what today's `/post` should lean into, if the data says
5. **Close out.** `python3 scripts/deck.py log --command brief --summary "..."`.
   Remote session → commit `deck/runs.jsonl`, push, send `BRIEF.md` via
   SendUserFile.

## Reply to AC

The brief's TL;DR: biggest mover, biggest lever, first action of the 15
minutes. Three lines. The full read lives in `BRIEF.md`.
