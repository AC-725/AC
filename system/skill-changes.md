# Personal-skill changes

Durable record of changes made to skills under `~/.claude/skills/`. That directory is repopulated from
the claude.ai skills library every session and local edits never sync back, so anything recorded here
is **not yet live** until the library copies are updated by hand.

Newest first.

---

## 2026-07-26 · Instagram handle consolidated to `@itsac.ai`

**Status:** applied locally · **claude.ai library still needs updating**

Austin confirmed `@itsac.ai` is the handle every Instagram surface optimizes for. `@ac.wins` is
retired. Canonical value now lives in `system/foundation/brand.md`; the skills point at it rather than
restating it.

### What was wrong

Two handles were live at once. `ac-instagram` recorded `@ac.wins` as primary with `@itsac.ai` as a
*backup if unavailable*, while `ac-reel-creator` defaulted its `HANDLE` constant to `@itsac.ai` — and
its `run-log.md` shows Day 8 shipped that way. `ac-tool-of-the-day` and `ac-ai-news` stamped
`@ac.wins`. Which handle a reel carried depended on which skill produced it.

The root cause was structural, not a typo: the handle was restated in 33 places across 4 skills, and
one of those places offered a *list* of acceptable handles. A list of alternates is what let two ship.

### Changed — 4 skills, 20 files, 33 occurrences

| Skill | Files | Notes |
| --- | --- | --- |
| `ac-instagram` | SKILL.md, part-1-foundation.md, part-2-content.md | Backup-handle list removed entirely |
| `ac-tool-of-the-day` | SKILL.md + 4 references + 2 templates | Mechanical swap |
| `ac-ai-news` | SKILL.md + 3 references + 1 template | Mechanical swap |
| `ac-reel-creator` | brand.md, 2 template comments | Already correct; stale "switch to `@ac.wins`" instruction removed |

Five blocks needed rewriting rather than substituting, because a plain swap left them
self-contradicting — `part-1-foundation.md` would have named `@itsac.ai` as both primary and its own
backup, and `brand.md` would have read "Default `@itsac.ai`. To use `@itsac.ai` instead".

Deliberately **not** changed: `ac-wins.com`. The website is a separate fact from the handle, and the
`ac-wins-*` client-service skills are a different business, not Instagram surfaces. See the open
question below.

### To make it live

Update the four skills in the claude.ai library. Until then, each new session starts with `@ac.wins`
restored — re-apply with:

```bash
python3 system/scripts/reapply_handle.py            # idempotent
python3 system/scripts/reapply_handle.py --check     # preview only
```

That script reproduces this change byte-for-byte (verified against the hand-edited result). Once the
library copies are updated it becomes a no-op and can be deleted along with this entry.

### Open question for Austin

**Does the bio link and home base stay `ac-wins.com`, or move to something matching `itsac.ai`?**
Left as `ac-wins.com` and flagged in `ac-instagram/SKILL.md` and `system/foundation/brand.md`. Not
guessed at — a wrong domain in the bio costs real traffic.
