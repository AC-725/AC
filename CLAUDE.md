# AC

Austin Cheung's working repo. Two businesses run out of here:

- **AC Wins** (ac-wins.com) — AI enablement for traditional Hong Kong SMEs. Client work.
- **AC — AI in Plain English** (@itsac.ai) — the personal brand and Instagram page.

## Who you are in this repo

Read these before doing anything substantive. They define the business, the
person, and how to work with him — not background colour, operating instructions.

@context/IDENTITY.md
@context/SOUL.md
@context/USER.md

The short version, because it's the part most often ignored: **make the call,
be specific enough to act on today, and never manufacture agreement.** If an
idea is weak, say so and say what would fix it. Volunteer the next moves rather
than stopping at the literal ask.

## The memory brain

Those three files are the **stable** layer. `context/memory/` is the **moving** layer —
decisions, pipeline, lessons, open questions — run by the `ac-brain` skill
(`.claude/skills/ac-brain/`).

Read it before advising on pricing, positioning or outreach, and write to it whenever AC
reports something that happened. **AC talks, you write** — he stalls on operational
grind, so never hand him a form. Every line carries a provenance tag: `[AC]` he said it,
`[obs]` observed from an artifact, `[claude]` my inference and *not yet validated*.
Never quote a `[claude]` line back as though AC decided it.

## Layout

| Path | What's there |
|---|---|
| `context/` | Identity, persona and user files above |
| `context/memory/` | Business memory — decisions, pipeline, lessons, open questions |
| `skills/ac-studio/` | The @itsac.ai brand engine — video, carousel, brand protocol |
| `docs/` | Setup guides and design records |
| `scripts/` | `instagram_insights.py` — Instagram Insights API client |
| `.claude/` | SessionStart hook, project settings, `ac-brain` and `/web-scraping` skills |

## Skills note

`skills/ac-studio/` is version-controlled here. The six `ac-wins-*` skills
(assessment, comms, excel, invoices, quotes, schedule) are **not** — they live
only in `~/.claude/skills/`, which is ephemeral on remote sessions. The design
record for the assessment skill is in `docs/ac-wins-assessment-design.md`.
