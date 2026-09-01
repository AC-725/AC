---
name: wins
description: >-
  One-shot AC Wins client-work runner: route the job AC drops (invoices, messy
  Excel, a quote, a schedule, a client reply, a discovery assessment) to the
  right ac-wins skill and file the deliverables in outbox/. Run when AC types
  /wins with a request and usually some client files.
disable-model-invocation: true
argument-hint: "<what the client needs> [files]"
---

# /wins — client work, routed and filed

Thin runner. **The ac-wins skills own the craft and the safety rules.** This
command routes, keeps the run one-shot, and files the output.

## Routing

Pick by the shape of what AC dropped, not the words he used:

| AC drops | Drive |
| --- | --- |
| Invoices, receipts, bills — PDFs, photos, scans → Excel | **ac-wins-invoices** |
| A messy spreadsheet to clean, restructure, or report on | **ac-wins-excel** |
| "Make a quote", a form or template to fill | **ac-wins-quotes** |
| A calendar, roster, or list of dated jobs; "what's on this week" | **ac-wins-schedule** |
| A WhatsApp thread or email needing a reply draft | **ac-wins-comms** |
| Call notes, a transcript, a questionnaire; "what should we automate" | **ac-wins-assessment** |

Spans two? Run them in the natural order (extract before you reconcile, assess
before you quote) and say so in the handoff. Genuinely ambiguous with no files
to disambiguate → that's the one case worth a question before running.

## Run

1. **Output dir.** `python3 scripts/deck.py outbox wins`.
2. **Drive the routed skill** (Skill tool). Not available → stop and name it.
3. **The skills' safety rules survive one-shot mode, always:**
   - Originals are never touched — work on copies.
   - Nothing is ever sent — comms produces drafts only.
   - Uncertainty is flagged, never guessed: an unreadable invoice line or a
     missing quote field goes in the handoff as an open item, not a made-up
     value. One-shot means *don't stop to ask*, not *fill gaps silently*.
4. **File it** in the outbox: deliverables plus `HANDOFF.md` — TL;DR, open
   items needing AC's eyes (with file/line references), and what to tell the
   client. Client-facing files bilingual where the source skill says so.
5. **Close out.** `python3 scripts/deck.py log --command wins --summary
   "client · job type"`. Remote session → commit `deck/runs.jsonl`, push,
   send deliverables via SendUserFile. Client files never get committed.

## Reply to AC

What's done, what needs his eyes (the open items count), where the files are.
Three lines.
