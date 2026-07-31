---
name: ac-wins-quotes
description: Use when producing a quotation, filling a form, or completing a template with job details for an AC Wins client's business — "make a quote for…", "fill in this form", "prepare the quotation". Uses the client's own template when available; asks for missing fields, never invents prices or terms.
---

# AC Wins — Quotes & Forms

Fill the client's quotation or form with the job's details — complete, correct, and in their own format.

**First: read `references/quality-rules.md` and obey it throughout.**

## Process

```
Receive job details → Identify client & template → Fill → Verify math → Deliver
```

### 1. Receive

Accept job details in any form — a message from the customer, dictated specs, a photo of a handwritten order. Identify the client business (ask if ambiguous) and read their `client-notes.md` (standard terms, pricing habits, numbering format).

### 2. Template

- **Client has a template** (docx/xlsx/PDF): use it — their layout, their branding, their field order. Fill via the docx/xlsx skills when available.
- **No template:** produce a clean generic quote layout carrying the *client's* business details (name, contact, logo placeholder, their terms), flagged clearly: *"generic layout — restyle to client's brand."* The quote is the client's document to their customer, never an AC Wins document.

### 3. Fill — never invent

- Missing fields that matter (price, quantity, terms, validity date, customer name) → **ask the user one at a time**. Never invent a price, discount, or term.
- Values from client notes (standard payment terms, delivery terms) may be pre-filled — marked as from notes so the user can override.
- Anything uncertain in the source ("did he say 40 or 14 units?") → `[?]` + verify-checklist.

### 4. Verify math

Line totals = quantity × unit price. Sum of lines = subtotal; subtotal ± discounts/taxes = grand total. Any mismatch between given figures and computed figures → both shown, flagged. Quote numbering follows the client's format from notes (ask on first quote).

### 5. Deliver

`quote-<customer>.docx` (or the client's format) at the standard output location, plus the "Verify before sending" checklist. Append any new standard (terms, numbering, pricing pattern) to `client-notes.md`.

## Common mistakes

| Mistake | Fix |
|---|---|
| Inventing a plausible price to complete the quote | Ask. Price is the client's decision, every time. |
| Restyling the client's template "to look nicer" | Their template, their brand — fill it as-is. |
| AC Wins branding on a client's quote | The quote belongs to the client's business. |
| Quiet arithmetic fixes | Recompute, show both figures, flag the difference. |
| Skipping the validity date or terms | Standard fields are asked for, not omitted. |
