# Recurring run setup

A schedule is only useful if it stays current. When the client (or AC) wants it refreshed automatically, set up a recurring scheduled task that re-runs this skill and surfaces the week — especially the attention list.

## Use scheduled tasks, not local cron

Always create these with the **scheduled-task tools** (the `create_trigger` / `send_later` family on the Claude Code Remote MCP server). **Do not use the local cron tools** (`CronCreate` etc.): those run inside a single session and are silently lost when it ends, so the client's refresh would just stop firing. Scheduled tasks survive across sessions.

Each firing starts a **fresh session with no memory of this conversation**, so the scheduled prompt must be fully self-contained: name the client, say where the schedule sources live, and spell out the window and the deliverable.

## Suggested cadence

- **Week-ahead view:** Monday ~07:30 HKT — best default for most SME owners.
- **Daily heads-up:** weekday mornings ~07:30 HKT — for busier operations with shifting rosters.

Confirm the client's timezone (default Asia/Hong_Kong) and preferred time before creating it.

## Ready-to-use prompt

Adapt the bracketed parts, then pass as the scheduled task's `prompt`:

```
Run the ac-wins-schedule skill for the client "[CLIENT NAME]" ([client-slug]).
Window: the week ahead (Mon–Sun), Asia/Hong_Kong time.
Sources: [where the schedule lives — e.g. the shared Google Calendar for X,
the roster spreadsheet at <Drive link/path>, and any dated commitments in
recent client email]. If a source is unreachable, note it and continue.
Produce the schedule-brief.md and the bilingual agenda.html as usual, and
deliver the agenda file. Lead your reply with the attention list — clashes,
coverage gaps, and anything due or overdue this week. Draft only; do not send
anything to the client.
```

## Keep it safe

- The recurring run still **only drafts and delivers to the owner** — it never messages the client or edits a live calendar.
- Remind the user they can change the time, pause, or delete the scheduled task anytime, and that it shows up in their scheduled tasks list.
- If the client's sources aren't connected yet (e.g. no shared calendar), set up the task anyway but say plainly in the prompt what's missing, so each run reports the gap instead of failing.
