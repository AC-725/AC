# Personal-skill changes

Durable record of changes made to skills under `~/.claude/skills/`. That directory is repopulated from
the claude.ai skills library every session and local edits never sync back, so anything recorded here
is **not yet live** until the library copies are updated by hand.

Newest first.

---

## 2026-07-26 · Reel-skill supersession finished + domain moved to `itsac.ai`

**Status:** applied locally · **claude.ai library still needs updating**

### Reel skills — three competing, now one

`ac-reel-creator` had declared since its creation that it "merges and supersedes ac-ai-news,
ac-tool-of-the-day" — but both were still installed, and both still said "Use WHENEVER…" and "single
source of truth" for their formats. Three skills answered "make me a reel"; which one won was luck.

Before changing anything, verified `ac-reel-creator` genuinely absorbed both. Every capability area has
a counterpart: all 18 icon keys (`tod-scenes.md` + the template's `ICONS` registry), all six hard-won
render gotchas (feTurbulence, JPEG q95, ≤19-char headlines, fixed plot box, −22 dB audio, CPU-bound
~90s), the first-frame checklist, scene-by-scene breakdowns for both formats, VO/SFX, caption formula,
hashtags, cover, dependencies. Plus a `run-log.md` neither of the others has. Nothing is lost by
retiring them.

Both superseded skills now open with `SUPERSEDED — do not use this skill for new work`, name
`ac-reel-creator` as the replacement, explicitly hand over the trigger phrases they used to claim, and
carry a banner at the top of the body. `ac-reel-creator`'s description already claimed every trigger
and needed no change.

**Cleanest end state:** delete `ac-ai-news` and `ac-tool-of-the-day` from the claude.ai library. The
deferral above is the safe fallback if they stay.

### Domain moved to `itsac.ai`

Austin confirmed the website moves to match the handle. Was `ac-wins.com`, in 3 places, all in
`ac-instagram` — the `ac-wins-*` client-service skills never referenced it and are untouched.

Two things deliberately left as flags rather than assumptions:

- **Exact spelling recorded as `itsac.ai`** to match `@itsac.ai`. Not independently confirmed.
- **The live bio link is gated on the site resolving.** "Moving" is a transition; a bio pointing at a
  domain that doesn't load costs more than an old one that does. Both `brand.md` and the skills say to
  check first and use a link hub in the interim.

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
python3 system/scripts/sync_skills.py            # restore the corrected copies
python3 system/scripts/sync_skills.py --check     # preview only
```

The corrected skills are stored in full under `system/skills/` (360K, all text). The sync script
restores them byte-for-byte, and refuses to overwrite a library copy that already satisfies the
invariants — so once the library is updated it becomes a no-op, and `system/skills/` plus the script
can be deleted.

### Open question — **RESOLVED same day**

*Was:* does the bio link and home base stay `ac-wins.com`, or move to match `itsac.ai`? Left flagged
rather than guessed, since a wrong domain in the bio costs real traffic.

*Answered:* Austin confirmed the move to `itsac.ai`. See the entry above for what changed and the two
caveats that remain (exact spelling, and gating the live bio link on the site resolving).
