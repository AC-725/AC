# Mode: Audit

Find notes that are stale, conflicting, or duplicated — then propose fixes and apply the approved
ones.

The goal is not tidiness. It's that when a skill reaches for a fact, it finds exactly one answer.
Every duplicate is a future conflict, and every conflict means some output already went out wrong.

## Sweep

Work through the inventory in `SKILL.md`. Read the SKILL.md of every skill plus each `references/*`
file; those references are where drift accumulates, because they're written once and rarely reread.

Cheap starting points:

```bash
# Every skill and reference, both layers
ls -d ~/.claude/skills/*/ .claude/skills/*/
find ~/.claude/skills .claude/skills -name '*.md' | sort

# Facts that tend to exist in more than one place, with more than one value
grep -rn "@[a-z][a-z.-]*\b" --include='*.md' ~/.claude/skills .claude/skills   # handles
grep -rniE "\$[0-9]|HK\$|price|pricing|per month|retainer" --include='*.md' ~/.claude/skills
grep -rniE "supersede|deprecated|replaces|instead of|single source of truth" --include='*.md' ~/.claude/skills
grep -rniE "^- \*\*(brand|handle|promise|voice|audience|offer)" --include='*.md' ~/.claude/skills
```

Don't audit from grep alone. Grep finds candidates; only reading the surrounding lines tells you
whether two mentions actually disagree or are just both true in context.

## The four defect classes

### 1. Conflict — the same fact with two values

The expensive class. Something already shipped wrong.

Worked example — **found and fixed 2026-07-26**, kept here because the shape recurs. `ac-instagram`
stated the handle was `@ac.wins` (primary), listing `@itsac.ai` only as a *backup if unavailable*. But
`ac-reel-creator` defaulted its `HANDLE` constant to `@itsac.ai`, and its `run-log.md` recorded Day 8
shipping that way — while `ac-tool-of-the-day` stamped `@ac.wins` on every frame. Same brand, 33
restatements across 4 skills, two handles, videos already published under both.

Resolved to `@itsac.ai` in `system/foundation/brand.md`; see `system/skill-changes.md`. The lesson
worth keeping is the root cause: one of those files offered a *list* of acceptable handles, and a list
of alternates is what allows two to ship. When you find a fact stated as options, that's the bug.

That's the shape to hunt for: not a typo, but a fact that two skills each believe they own.

**Fix:** pick the winner (ask if it isn't obvious — this one is Austin's call, since one handle may
be the account that actually exists). Put it in one place. Make every other file reference that
place rather than restating the value.

### 2. Duplicate — the same content in several files

Brand palettes, voice rules, and CTA formulas get copied between skills. They start identical and
silently diverge, which is how class 1 happens.

**Fix:** promote the canonical copy to `system/foundation/brand.md`, then replace each duplicate with
a one-line pointer. Where a skill genuinely needs the values inline — a template that has to render
without reading another file — keep them, but mark the source of truth in a comment so the next
edit knows which direction to flow.

### 3. Stale — true once, not now

Superseded skills, dated notes, "coming soon" that has come and gone, decisions reversed in chat and
never written down.

Real example: `ac-reel-creator`'s own description says it "Merges and supersedes ac-ai-news,
ac-tool-of-the-day". Both of those are still installed and still load, and `ac-tool-of-the-day` still
calls itself "the single source of truth for that video format". Three skills compete for "make me a
reel", two of them claim authority, and which one wins is luck.

**Fix:** finish the supersession. Either remove the superseded skills or narrow their descriptions so
they stop competing — and for personal skills, that means removing them in the claude.ai library,
which only Austin can do. Flag it explicitly; a local delete would silently come back next session.

### 4. Trigger overlap — two skills claiming the same request

Distinct from staleness: both skills are current, but their descriptions fight. Symptom is the wrong
skill firing, or none firing because the request looked ambiguous.

**Fix:** make each description say what it is *not* for, pointing at its sibling by name. Both sides
need editing; changing one leaves the fight half-resolved.

## Report

One table, worst first. Conflicts before duplicates before stale before overlap.

| # | Class | Fact | Where it disagrees | Proposed fix | Needs Austin? |
| --- | --- | --- | --- | --- | --- |
| 1 | Conflict | Instagram handle | `ac-instagram/SKILL.md:29` said `@ac.wins`; `ac-reel-creator/references/brand.md:10` defaulted to `@itsac.ai` | Confirm the live account, set it in `system/foundation/brand.md`, point both skills there | **Yes** — which account is real |

(That row is the 2026-07-26 finding, shown in past tense because it's since been fixed. Write live
findings in the present tense.)

Rules for the table:

- Cite `file:line`. A finding without a location can't be checked or fixed.
- Quote both sides of a conflict. "These disagree" is not reviewable.
- Separate what you can fix mechanically from what needs a decision from him. Mark the decisions
  clearly — those are the only rows he has to think about.
- If a scan came back clean, say so for that class. Silence reads as "not checked".

Then: apply the approved rows, commit, and close out per `SKILL.md`. Leave the rows he didn't
approve alone — including the ones you're confident about.

## Scope control

A full sweep across every skill is a lot of reading and produces a report too long to act on. Unless
he asked for everything:

- Audit the area he's working in, or the area where the conflict surfaced.
- Cap the report at the ~10 findings that would actually change an output. Note how many you left
  out and where, so the number isn't mistaken for the total.
- Never silently truncate. "12 more duplicate palette definitions across the `ac-*` skills" is
  useful; dropping them without a word makes a partial audit look complete.
