# AC

Home base for AC's two businesses and the automation that runs them:
the Instagram brand **AC — AI in Plain English** (`@itsac.ai`) and the
**AC Wins** client practice.

## The command deck

One-shot slash commands for the daily grind. Each is a thin runner in
`.claude/skills/` that drives a heavy skill, drops finished files in
`outbox/`, and logs the run. Type `/deck` for a live readiness report.

| Command | One shot of |
| --- | --- |
| `/post [topic]` | Today's @itsac.ai content — research → render → caption, filed |
| `/week` | Next week's content board; `/week produce` ships the approved slots |
| `/brief` | Real Instagram numbers, a diagnosis, today's 15-minute play |
| `/wins <ask>` | A client job routed to the right ac-wins skill — drafts, never sends |
| `/leads [n]` | Scored HK prospects plus outreach drafts — drafts, never sends |
| `/deck` | Readiness: series day, keys, last runs |

State that must survive sessions is committed: `deck/runs.jsonl` (deck
memory) and `skills/ac-studio/run-log.md` (series memory). Deliverables in
`outbox/` are gitignored and sent to AC directly.

## What else is here

- `skills/ac-studio/` — the brand's source of truth: voice, templates, the
  video engines, run log.
- `scripts/instagram_insights.py` — Graph API stats pull (`docs/instagram-setup.md`).
- `scripts/deck.py` — the deck's preflight/state tool (stdlib only).
- `.claude/` — project skills and the SessionStart hook that installs the
  firecrawl + exa plugins in remote sessions.
