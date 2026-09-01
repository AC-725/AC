---
name: post
description: >-
  One-shot daily content run for @itsac.ai: pick or take a story, drive
  ac-studio end to end (research, verify, write, render), and file the finished
  post in outbox/ with a handoff note. Run when AC types /post, with or without
  a topic.
disable-model-invocation: true
argument-hint: "[topic] [--news|--tod|--carousel|--static] [--check]"
---

# /post — today's content, end to end

Thin runner. **ac-studio owns everything creative** — voice, brand law,
research and verification, the virality scorecard, templates, render pipeline.
This command only sets up the run, keeps it one-shot, and files the output.

## Arguments

- **Topic given** → that's the story. Still verify it through ac-studio's
  research pass; AC drops headlines, not sources.
- **No topic** → ac-studio's research pass finds and vets today's story.
- **Format flags:** `--news` (AI News reel), `--tod` (Tool of the Day),
  `--carousel`, `--static`. No flag → let ac-studio's content mix and the
  run-log rotation decide, and say what was picked and why in one line.
- **`--check`** → keep ac-studio's interactive check-in gate (see below).

## Run

1. **Preflight.** `python3 scripts/deck.py status --json`. Note the next day
   number — and if the last run-log row is *in progress*, finishing that day is
   the default move unless AC gave a topic; say so in the handoff.
2. **Output dir.** `python3 scripts/deck.py outbox post` — everything lands
   there.
3. **Drive ac-studio** (Skill tool) for the whole pipeline. If ac-studio isn't
   available, stop and say so — never improvise the brand.
4. **One-shot override.** ac-studio checks in with AC before rendering. In a
   deck run, don't block: make the call (story, hook, theme), render, and
   record each call *plus the runner-up* under "Calls I made" in `HANDOFF.md`.
   Quality gates are not question gates — the scorecard and verification
   still apply at full strength; a story that fails them gets replaced, not
   shipped. `--check` restores the interactive gate.
5. **File it.** Deliverables (MP4/PNGs, cover, caption, hashtags, VO script,
   A/B hooks) in the outbox dir, plus `HANDOFF.md`:
   - TL;DR — what shipped, one line
   - Calls I made — each decision + runner-up
   - Post it — when to post (algorithm guidance), first comment, story share
6. **Close out.** Append the shipped row to `skills/ac-studio/run-log.md`
   (ac-studio's own format), then
   `python3 scripts/deck.py log --command post --day N --summary "..."`.
   Remote session → commit run-log + `deck/runs.jsonl`, push, and send the
   deliverables with SendUserFile (outbox/ is gitignored).

## Reply to AC

Three lines, not a report: what shipped, the one call most worth reviewing,
where the files are.
