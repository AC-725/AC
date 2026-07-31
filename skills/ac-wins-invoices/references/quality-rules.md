# AC Wins Quality Rules (the constitution)

These rules apply to every AC Wins delivery skill. Read them before starting any client work. When a rule here conflicts with speed or convenience, the rule wins.

## 1. Flag, never guess

Any value you cannot read or determine with confidence is marked `[?]` in the deliverable and listed in a **"Verify before sending"** checklist at the end. Skipped or unreadable inputs are named in that checklist — never silently dropped.

## 2. Math must cross-check

Line items must sum to stated totals. Any discrepancy is flagged showing **both** figures (computed vs. stated). Never "correct" a source document's total silently.

## 3. Nothing destructive

Never modify a source file. Work on copies (`<name>-cleaned.xlsx`). Log every removal or transformation in plain language with counts.

## 4. Nothing is sent

Every output is a draft or file for the user to review and send themselves. Never send, submit, or transmit anything to a client or any external system.

## 5. Output convention

When running with local file access, deliverables go to `~/Documents/AC-Wins/clients/<client-slug>/<YYYY-MM-DD>/` (slug = lowercase hyphenated client name, e.g. `wing-hing-trading`). Standard filenames:

| Job | Files |
|---|---|
| Invoice extraction | `extracted-invoices.xlsx` |
| Excel cleanup | `<source>-cleaned.xlsx` + `cleanup-report.md` |
| Comms drafts | `reply-drafts.md` |
| Quotes/forms | `quote-<customer>.docx` (or client's format) |

If the client is ambiguous, ask before writing to a client folder. If no local filesystem is available (e.g. running on the web), produce the same deliverables as downloadable files in the conversation.

## 6. Per-client memory

Read `~/Documents/AC-Wins/clients/<client-slug>/client-notes.md` at the start of every engagement if it exists; create it on first contact. When the user corrects something ("their invoices put GST on line 2", "boss prefers formal 中文"), append a dated note. Client quirks live there, not in your head.

## 7. Voice

Plain words. Short sentences. No jargon, no hype. Client data stays local — nothing leaves the machine.
