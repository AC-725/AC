# Schedule data model

One shared shape for every schedule item, whatever it came from. Normalize first, then everything else (timeline, conflict checks, agenda) just works.

## The item

Each schedule item has:

| Field | Notes |
|---|---|
| `layer` | `appt` \| `deadline` \| `shift` — the three layers from the skill. |
| `title` | Short, in EN and 繁體中文. What it is. |
| `date` | ISO `YYYY-MM-DD`. Resolve "next Tue", "月底" etc. against today's date. |
| `start` / `end` | 24-hour HKT (`14:30`). Unknown → `TBC`. A deadline usually has no time. |
| `who` | Owner / assignee / staff name. Blank if genuinely unknown (that's a flag, not a guess). |
| `where` | Location, if any. Useful for travel-buffer checks. |
| `source` | Where you read it: "Google Calendar", "roster sheet row 14", "client WhatsApp 18 Jul", "assumed". Every item needs one. |
| `status` | `upcoming` \| `today` \| `overdue` \| `done`, derived from today's date. |
| `note` | Anything the owner should see: "to confirm", "OT", "public holiday". |

## Normalizing

- **Dates** → ISO. **Times** → 24-hour HKT. Sort each day by start time; `TBC` items sort to the end of the day.
- **Timezone** is Asia/Hong_Kong unless stated. If a source is in another zone (e.g. a supplier's calendar), convert and keep a note.
- **Recurrence** → concrete dates inside the window. Weekly rosters, monthly rent/payroll/MPF, quarterly filings all expand into the specific days they land on.
- **Status** is relative to today (from the environment): before today = `overdue` if not done, equal to today = `today`, after = `upcoming`.

## Reading a staff timecard / duty roster

Client rosters usually arrive as a wide spreadsheet — one row per staff-day or a grid of staff × dates. A common Hong Kong SME layout (seen in real client data) has columns like:

```
Staff No. | Name (EN + 中文) | Date | Day | Shift | Duty | 1st In | Last Out | Remark | Lunch Mins | Total Hours | OT Hours
```

How to read it:

- **Name** is often bilingual in one cell ("CHEUNG HEI SHING AUSTIN 張希誠") — keep both.
- **Shift / Duty** are usually codes, and codes vary per client. Common ones: `N` or `OFF` = not working / rest day, `AL` = annual leave, `1` / `2` = shift number, a plant or site name written in free text = working off-site. **Do not assume what a code means if you're not sure** — capture it "as recorded", surface it, and ask the owner once (or mark `ASSUMED` on "just proceed"). Guessing a leave code as a working shift is exactly the kind of error that breaks trust.
- **1st In / Last Out** are actual clock times — use them only to confirm someone worked, not as their scheduled shift, unless that's all you have.
- **Remark** often hides the real appointment ("direct call WL Plant", "last call BOC Fo Tan", "Annual Dinner") — mine it for appointments and site visits, and lift them into the `appt` layer.
- Blank cells are normal. A blank on a working day is a possible coverage gap — note it, don't fill it.

For "who's working when", collapse the roster to a **staff × day grid** for the window: each cell is a short marker (`✓` working, `AL` leave, `–` off, or the shift code as recorded). That grid feeds both the conflict checks and the agenda's roster table.

## When there's almost nothing

If the client only gives you a few dates in a message, that's still a schedule — build all three layers from it, mark everything's source as the message, and note which layers are empty (e.g. "no roster provided") rather than leaving them silently blank. Empty layers are a prompt for the next conversation, not a failure.
