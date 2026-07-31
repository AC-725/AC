---
name: ac-wins-schedule
description: Use when building, updating, or reviewing a schedule or agenda for an AC Wins client business — pulling the client's meetings, appointments, client/site visits, deliveries, deadlines, commitments, renewals, payments, and staff shifts/rosters into one clear timeline. Trigger on things like "help this business keep track of their schedule", "build a schedule tracker", "what's on this week", "weekly agenda", "staff roster / who's working when", "any deadlines coming up", "any clashes this week", or whenever a client shares a calendar, a roster/timecard spreadsheet, or a list of dated jobs. Produces a plain-language summary of what needs attention plus a bilingual (EN + 繁體中文) HTML weekly agenda the client can open and reuse. Drafts and local files only — never sends messages or edits the client's live calendar. This is for a client business's operational schedule, not the AC personal morning brief.
---

# AC Wins — Client Schedule Tracker

## Overview

Turn whatever a client gives you — a calendar, a roster spreadsheet, a pile of dates, or a two-line chat — into one schedule the business can actually stay on top of: **what's on, what's due, who's working, and the handful of things that need attention** before they become problems.

The value is not a pretty calendar. It's catching the double-booking, the shift with nobody on it, and the deadline that's already overdue — early enough to fix. Lead with those.

**Voice (both outputs):** plain and calm, no jargon, no hype. Short lines a busy owner reads in ten seconds. Every item shows its date/time and where it came from. When you don't know a time, say "time TBC" — never invent one. Times are Asia/Hong_Kong (HKT) unless the client says otherwise.

## Process

```
Any input → Client + week → Collect 3 layers → One timeline → Flag clashes & gaps → Summary + bilingual agenda → (optional) recurring run
```

Work in order. Don't skip the attention pass (step 5) — it's the whole point.

### 1. Intake

Digest whatever is provided: connected Gmail / Google Calendar / Drive, an uploaded roster, timecard, or calendar export (CSV / XLSX / ICS), pasted text, or nothing at all. Mixed English/Chinese is normal — read both, never ask the user to translate.

Read `references/schedule-model.md` for the data model and, importantly, **how to read a staff timecard / duty roster** (the columns, shift codes, and what to do with codes you don't recognise).

If there's no written input, run a short conversational intake using the three layers below as the agenda.

### 2. Set client + horizon

Confirm two things: **which client business** this is (used as the folder slug, e.g. `wing-hing-trading`) and the **window** (default: this week, Monday–Sunday, HKT). If the client isn't known, ask once. On "just proceed", mark `ASSUMED: <slug>` and carry on — never block.

### 3. Collect the three layers

A schedule is all three, not just meetings. Pull every dated thing you can find in each; don't cherry-pick the obvious ones.

- **Appointments** — time-specific: meetings, client/site visits, deliveries, viewings, calls, inspections.
- **Deadlines & commitments** — date-specific: job due dates, quote/contract expiries, licence or insurance renewals, rent, payroll, tax/MPF filings, promises made to a customer.
- **Staff shifts / rosters** — who is working when, including leave (AL), rest days, and overtime. This is often a timecard or duty spreadsheet — see `references/schedule-model.md`.

### 4. Build one timeline

Normalize everything into one ordered list per day, each item tagged by layer and by status (`upcoming` / `today` / `overdue` / `done`), using today's date from the environment. Resolve recurring items (weekly rosters, monthly payments) into concrete dates inside the window. Unknown times sort to the end of their day as "TBC".

### 5. Flag what needs attention

Run the checks in `references/conflict-checks.md`: double-bookings, understaffed or single-cover shifts, coverage gaps, deadlines with no owner, anything due today or overdue, unconfirmed times, back-to-back appointments with no travel buffer. Order them **overdue/today first, then clashes, then staffing, then unconfirmed.** Each becomes one line: the fact, then the suggested action. Help, don't alarm.

### 6. Outputs

Save both to `~/Documents/AC-Wins/clients/<client-slug>/schedule/<YYYY-MM-DD>/`:

| File | Built from | Language | Purpose |
|---|---|---|---|
| `schedule-brief.md` | (write directly) | English | Internal quick-read: the week at a glance + the attention list, every item with its source. |
| `agenda.html` | `assets/agenda-template.html` | Bilingual (EN + 繁體中文) | Client deliverable: self-contained weekly agenda with a language toggle. |

For the agenda, **fill the `DATA` object only** and change nothing else in the template. Write the 繁體中文 fields natively — same facts, real Cantonese-business Chinese, not a word-for-word translation.

Then deliver `agenda.html` to the user with SendUserFile. Because a schedule is something they'll reopen and keep current, also persist it as an artifact if that tool is available (see the persisted-artifacts flow). **Never send anything to the client** — the owner reviews and shares it themselves.

### 7. Optional: recurring run

If they want the schedule kept current without asking each time, offer to set it up as a recurring morning run — see `references/recurring-setup.md`. Use the proper scheduled-task tools, never local cron (which dies when the session ends).

## Rules that override everything

- **Drafts and local files only.** Never send a message or calendar invite, and never edit the client's live calendar. The owner is always the one who sends.
- **Every item carries a date/time and a source.** No invented times — unknown time becomes "time TBC". A missing time is fine; a wrong one erodes trust.
- **Lead with the attention list.** The owner wants the exceptions, not a transcript of their week.
- **The agenda is always bilingual** (EN + 繁體中文), the Chinese written natively.
- **Times are Asia/Hong_Kong** unless the client states otherwise; show the timezone on the agenda.
- **Missing info + "just proceed" → `ASSUMED` markers** in both outputs, never a stall. Otherwise ask one question at a time, plainest wording.
- **Client data stays local.** Send nothing anywhere.

## Common mistakes

| Mistake | Fix |
|---|---|
| Listing only meetings, ignoring deadlines and shifts | All three layers, or it isn't a schedule. |
| Inventing a time to fill a slot | Mark "time TBC". A wrong time is worse than none. |
| A wall of every event with no priority | Lead with the attention list; the exceptions are the product. |
| Guessing what an unknown shift code means | Capture it "as recorded", flag it, or mark `ASSUMED` — don't invent a meaning. |
| Translating the agenda word-for-word into Chinese | Write the 繁體中文 natively from the same facts. |
| Editing or sending to the client's calendar | This skill only drafts and builds local files. |
| Blocking on a missing client name or field | Ask once; on "just proceed", assume and mark. |
