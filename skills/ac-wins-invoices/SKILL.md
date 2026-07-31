---
name: ac-wins-invoices
description: Use when extracting data from invoices, receipts, bills, or purchase documents (PDFs, photos, scans) into structured Excel for an AC Wins client. Trigger on requests like "extract these invoices", "turn these receipts into a spreadsheet", "get this into Excel". Flags anything uncertain, reconciles all totals, never guesses.
---

# AC Wins — Invoice & Document Extraction

Turn messy invoices, receipts, and purchase documents into one clean, verified Excel file a client can trust.

**First: read `references/quality-rules.md` and obey it throughout.**

## Process

```
Receive → Identify client → Read client notes → Extract → Verify → Deliver
```

### 1. Receive

Accept any mix of PDFs, photos, scans, or pasted text. Count the documents and state the count back ("Received 14 files — 12 readable invoices, 2 need attention"). Unreadable or corrupt files are named in the verify-checklist; the batch continues without them.

### 2. Identify client & read notes

Confirm which client this batch belongs to (ask if ambiguous). Read their `client-notes.md` for known quirks — column overrides, GST placement, vendor naming habits.

### 3. Extract

Default columns, one row per line item:

| date | vendor | invoice number | line description | quantity | unit price | amount | currency |

Per-client overrides from client notes replace the defaults. Rules:

- A value you cannot read with confidence → `[?]` in the cell, item added to the verify-checklist. Never guess.
- Mixed languages (English/中文) are read as-is; keep vendor names in their original script.
- Suspected duplicates (same vendor + invoice number + amount) are **flagged, not dropped** — mark both rows and list them in the checklist.

### 4. Verify (always, before delivery)

- Per invoice: line items must sum to the invoice's stated total. Mismatch → flag with both figures.
- Per batch: grand total of extracted amounts stated and reconciled.
- Currency consistency checked; mixed currencies are kept separate, never converted silently.

### 5. Deliver

Produce `extracted-invoices.xlsx` (use the xlsx skill when available) at the standard output location, ending with a **"Verify before sending"** checklist: every `[?]`, every flagged duplicate, every skipped file, every total mismatch. Append any new client quirk learned this run to `client-notes.md`.

## Common mistakes

| Mistake | Fix |
|---|---|
| Guessing a blurry digit "because it's probably a 7" | `[?]` + checklist. The client's books are not a guessing game. |
| Dropping a duplicate row silently | Flag both rows; the client decides which is real. |
| Skipping an unreadable scan without a word | Name it in the checklist — "IMG_2041.jpg unreadable". |
| Accepting a total that doesn't match its line items | Show both figures; flag the gap. |
| Converting currencies to "tidy up" | Keep currencies as found; note the mix. |
