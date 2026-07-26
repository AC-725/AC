# Mode: Historical Review

Mine recent Claude Code sessions for learnings that were never written down.

Skill Review harvests the conversation you're in. This mode harvests the ones you weren't — weeks of
corrections that fixed one output and changed nothing permanent. The transcripts are the only honest
record of that, because they contain Austin's words verbatim rather than anyone's memory of them.

## Check what history actually exists — first

Transcripts live at `~/.claude/projects/<cwd-slug>/<session-id>.jsonl`, one file per session.

```bash
python3 .claude/skills/improve-system/scripts/mine_sessions.py --inventory
```

**A fresh remote container almost always has exactly one transcript: this session.** `~/.claude` is
rebuilt per session, so there is no history here to mine. When that's the case, say it plainly and
stop — do not present a one-session harvest as a completed historical review. The honest options are:

- Run this mode on the machine that owns the history (the local CLI), where months of transcripts sit.
- Fall back to what *is* durable in the repo: git log and commit messages, `system/experiences.md`,
  and any series memory like `ac-reel-creator/run-log.md`. Those hold real signal — just say that's
  what you mined.

Reporting a thin harvest as thorough is the main way this mode goes wrong, and it's invisible to
Austin unless you tell him.

## Mine

```bash
python3 .claude/skills/improve-system/scripts/mine_sessions.py                 # 14 days, tagged turns
python3 .claude/skills/improve-system/scripts/mine_sessions.py --days 30
python3 .claude/skills/improve-system/scripts/mine_sessions.py --project AC    # one project's sessions
python3 .claude/skills/improve-system/scripts/mine_sessions.py --all           # every turn, untagged too
```

The script pulls Austin's own turns — filtering out tool results, hook output, system reminders, and
subagent chatter — and tags each one:

| Tag | Meaning | Worth |
| --- | --- | --- |
| `RULE` | "from now on", "always", "never" | Highest — a standing instruction, stated outright |
| `CORRECTION` | "no", "that's wrong", "I said" | High — each one is a missing instruction |
| `FRICTION` | "again", "still", "you keep" | Highest — repetition proves the gap outlasted one session |
| `VOICE` | "too long", "sounds salesy", "plain English" | Real, and the most commonly lost |
| `PRAISE` | "perfect", "exactly", "ship it" | What to preserve — usually never captured |

Tags are a filter, not a verdict. Read the surrounding turns before treating one as a learning: "no,
use the other file" was about one file, while "no, never open with a question" is a rule. The script
can't tell those apart and shouldn't try.

`--all` is worth a pass when the tagged output looks thin — a habit can show up as a dozen calm,
untagged repetitions of the same request, which is a strong signal the script won't flag.

## Dedupe before proposing

Most of what surfaces is already handled. Check each candidate against the skills before it reaches
the report — a report full of rules the system already follows teaches Austin to skim these.

```bash
grep -rniE "no em.?dash|handle|plain english" --include='*.md' ~/.claude/skills .claude/skills
```

Three outcomes per candidate: **already covered** (drop it), **covered but ignored** (the rule exists
and didn't fire — that's a placement problem, and more valuable than a new rule), or **genuinely
missing**.

The middle case deserves attention. A rule that exists and gets skipped is usually buried at the
bottom of a long file, or written in the wrong file entirely. Moving it beats restating it.

## Report

| # | Learning (his words) | Seen | Evidence | Status | Destination |
| --- | --- | --- | --- | --- | --- |
| 1 | "no em-dashes on screen, ever" | 3 sessions | 07-14, 07-19, 07-23 | Exists in `brand.md`, ignored | Move into the render step where frames are built |
| 2 | "lead with hours saved, not the tech" | 2 sessions | 07-11, 07-22 | Missing | `ac-wins-assessment` |

- Rank by frequency. Something he said three times is three times as expensive as something he said
  once, and the count is the argument for fixing it.
- Quote him. His phrasing is usually already the right instruction text.
- Cite dates so any row can be checked.
- Cap at ~10 rows and state how many you left out. A capped report that admits its cap is honest; one
  that doesn't reads as the complete set.

Then apply the approved rows — routing each per `references/skill-review.md` — and log anything that's
a story or win into `system/experiences.md` rather than forcing it into a skill.

## Close out

Per `SKILL.md`, plus two specifics to this mode: the window you actually covered (how many sessions,
which dates), and whether that window is the real history or just what this container had. Commit,
and note any `~/.claude` skill whose claude.ai copy still needs the change.
