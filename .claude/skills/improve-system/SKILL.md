---
name: improve-system
description: |
  Improve Austin's Claude system itself — the skills, the foundational notes, and the accumulated
  lessons that make Claude work the way he wants. Five modes: Audit (find stale, conflicting, or
  duplicate notes), Skill Review (fold this session's corrections back into a skill), Experience
  (capture a story, win, or lesson he just shared), Historical Review (mine recent Claude Code
  sessions for learnings that never got written down), and Foundation (fill in missing Brand,
  Audience, or Offer content). Use this whenever Austin says "/improve-system", "improve the
  system", "update the system", or asks to fix, clean up, audit, or tighten his skills and notes;
  whenever he says a skill "should have known that", "remember this", "capture this", "add this to
  the skill", "don't make me say this again", or "what did we learn"; whenever he shares a client
  win, a story, or a lesson worth keeping; and whenever a correction he just made is one that will
  obviously come up again. Also use it when a skill produced the wrong thing and the fix belongs in
  the skill rather than in the output. Prefer this over editing a skill ad hoc, because it also
  handles where the change durably lives.
---

# Improve system

The system is what makes Claude behave like Austin's operator instead of a generic assistant. It
drifts: notes contradict each other, corrections get made in chat and never written down, and the
foundational facts every skill depends on stay half-finished. Each mode below fixes one of those
failure modes.

Pick the mode from context. Only ask when genuinely unclear.

## Pick the mode

| Mode | Run it when | Playbook |
| --- | --- | --- |
| **Audit** | "clean this up", "what's out of date", "these contradict", or two sources just disagreed | `references/audit.md` |
| **Skill Review** | A skill just underperformed and this conversation contains the fix — "add that to the skill", "it should have known" | `references/skill-review.md` |
| **Experience** | He just told a story, a client win, a number, or a lesson — "capture this", "remember this one" | `references/experience.md` |
| **Historical Review** | "what did we learn", "mine my sessions", or a periodic sweep for lessons never written down | `references/historical-review.md` |
| **Foundation** | A skill had to guess at brand, audience, or pricing — or he asks to nail down positioning | `references/foundation.md` |

Read only the playbook you need. If two modes fit, run the narrower one first — Experience before
Historical Review, Skill Review before Audit — and offer the wider one at the end.

Ambiguous is rarer than it looks. Something he *just said* is Experience or Skill Review; something
about the system *as a whole* is Audit or Historical Review. Use `AskUserQuestion` only when the
work would differ materially, and never when he named the mode outright.

## What counts as "the system"

Take inventory before changing anything — most modes need to know what already exists.

| Layer | Where | Durable? |
| --- | --- | --- |
| Project skills | `<repo>/.claude/skills/*/SKILL.md` | **Yes** — git |
| Foundation notes | `<repo>/system/foundation/{brand,audience,offer}.md` | **Yes** — git |
| Experience log | `<repo>/system/experiences.md` | **Yes** — git |
| Personal-skill changes | `<repo>/system/skill-changes.md`, `<repo>/system/skills/<name>/` | **Yes** — git |
| Auto-loaded context | `<repo>/CLAUDE.md` | **Yes** — git |
| Personal skills | `~/.claude/skills/*/SKILL.md` (`ac-*`, `pd-*`, …) | **No** — see below |
| Series memory | e.g. `~/.claude/skills/ac-reel-creator/run-log.md` | **No** |
| Session history | `~/.claude/projects/<cwd-slug>/*.jsonl` | **No** |

The `system/` files are created on first use. Don't pre-create empty ones — a stub reading "TBD"
gets treated as authoritative-but-empty by every skill that finds it.

## Durability — read this before editing anything under `~/.claude`

Remote sessions run in a fresh, ephemeral container. `~/.claude/skills/` is repopulated each session
from the claude.ai skills library (see the `skillId` and `"source": "custom"` entries in
`~/.claude/skills/manifest.json`). **Editing a file there does not push back to the library, and the
edit is gone next session.**

So when a change belongs to a personal skill:

1. Make the edit in place, so it takes effect for the rest of this session.
2. Write the durable copy of the change into the repo — either as a patch note in
   `system/skill-changes.md` or, for a substantial rewrite, the full improved file under
   `system/skills/<skill-name>/`. Commit it.
3. Tell Austin plainly that the claude.ai copy still needs updating, and hand him the exact text to
   paste. A change he thinks is saved but isn't is worse than no change.

Project skills under `<repo>/.claude/skills/` have none of this problem. When a rule could
reasonably live in either place, prefer the repo.

## Rules that hold in every mode

- **Never invent a fact about Austin's business.** Not a price, not a client name, not a number, not
  a positioning claim. Ask, or leave it blank and flag it. A plausible invention is the worst
  outcome available here, because it propagates into everything downstream and reads as verified.
- **One fact, one home.** Each fact gets a single authoritative location; everything else points at
  it. Copying a fact into a second file is how conflicts are born — today's convenience is next
  month's contradiction.
- **Propose, then apply.** Show the findings or the diff and get a yes before writing, unless he
  said "just do it". Applying is the fast part; the judgment is his.
- **Subtract as readily as you add.** A note nobody reads costs more than the gap it filled. Deleting
  a superseded line is a real improvement, so include deletions in proposals.
- **Quote him verbatim where his voice matters.** His brand *is* the plain-English voice. Paraphrasing
  a story into corporate-speak destroys the thing that made it worth capturing.
- **Fix the wrong line, don't append a right one.** Appending leaves the contradiction in place and
  grows the file. Find what's wrong and change it.

## Close out the same way every time

End every run with:

- **Changed** — each file touched and what moved, as a short list.
- **Where it lives** — and for anything under `~/.claude`, whether the durable copy is committed.
- **Still needs you** — open questions, blanks left unfilled, claude.ai copies to update. Say
  "nothing" when there's nothing; don't manufacture follow-ups.

Then commit. An uncommitted improvement to an ephemeral system is not an improvement.
