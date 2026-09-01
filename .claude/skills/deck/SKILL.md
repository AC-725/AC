---
name: deck
description: >-
  The AC command deck — index and preflight for AC's one-shot terminal commands
  (/post, /week, /brief, /wins, /leads). Run when AC types /deck, asks what
  commands he has, or wants to check whether the deck is ready to run (keys,
  state, recent runs).
disable-model-invocation: true
argument-hint: "[help]"
---

# /deck — index and preflight

The deck turns AC's daily grind into one-shot commands. Each command is a thin
runner: it sets up the run, hands the real work to the heavy skill that owns it,
drops finished files in `outbox/`, and logs the run. The heavy skills own all
brand law, voice, and safety rules — the deck never redefines them.

## On invocation

1. Run `python3 scripts/deck.py status` and show the output as-is (it's already
   formatted): series day, env readiness, last run per command, recent outbox.
2. Then print the command table below.
3. If an env var is missing, say in one line what it unlocks and where setup
   lives — don't lecture. The deck runs degraded, it doesn't block.

## The commands

| Command | What it does in one shot | Heavy skill it drives |
| --- | --- | --- |
| `/post [topic]` | Today's Instagram content, research → render → caption, filed and logged | ac-studio |
| `/week` | Next week's content board, five approved-ready slots plus two reserves | ac-week |
| `/brief [--days N]` | Pull real Instagram numbers, diagnose, hand AC today's 15-minute play | ac-growth |
| `/wins <ask>` | Route a client job (invoices, Excel, quotes, schedule, comms) to the right ac-wins skill | ac-wins-* |
| `/leads [n]` | Scored HK prospect list plus personalised outreach drafts — drafts only | ac-revenue |
| `/deck` | This: readiness + recent runs | — |

## Deck conventions (what every command promises)

- **One-shot.** No mid-run questions. Where a heavy skill would check in, the
  command makes the call and records it — with the runner-up option — in a
  `HANDOFF.md` next to the deliverables. `--check` on any command restores the
  interactive gates.
- **Everything lands in `outbox/YYYY-MM-DD-<command>/`.** Never scattered.
- **Every run is logged** via `scripts/deck.py log`, and series memory
  (`skills/ac-studio/run-log.md`) is updated when content ships.
- **Remote sessions push state.** Containers are ephemeral: after a run, commit
  `deck/runs.jsonl` and any run-log changes to the working branch and push.
  Deliverables in `outbox/` are gitignored — send them to AC with SendUserFile
  instead.

## If a heavy skill is missing

The deck drives skills that live in AC's account (ac-studio also lives in this
repo under `skills/`). If the Skill tool doesn't list the one a command needs,
stop and say which skill to enable — never improvise brand or client work
without it.
