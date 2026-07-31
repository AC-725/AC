---
name: ac-wins-assessment
description: Use when assessing an AC Wins client or prospect for automation opportunities — after a discovery call, when given call notes, transcripts, or questionnaires, or when asked which workflow to automate first. Produces an internal brief plus a bilingual (EN + 繁體中文) client report.
---

# AC Wins — Automation Opportunity Assessment

## Overview

Turn any client information into AC Wins' core deliverable: the single highest-impact workflow to automate, scoped as a 2-week pilot, with a candid internal brief and a polished bilingual client report backed by conservative, assumption-stated ROI ranges.

**Voice (both outputs):** honest assessment, no jargon, no hype. Short sentences. Every number traceable to a stated assumption. Start with one workflow, prove results in ~2 weeks, then expand.

## Process

```
Any input → Client Profile → Gap interview → Candidate workflows → 2-week GATE → Score → ROI → Two outputs
```

Work through the steps in order. Do not skip the gate or merge steps.

### 1. Intake

Digest whatever is provided (rough notes, transcript, questionnaire, or nothing) into the Client Profile per `references/client-profile.md`. Input may be mixed English/Chinese — read both; never ask the user to translate.

If there is no written input at all, run a conversational interview using the profile's required fields as the agenda.

**Conflict rule:** if the user's own notes contradict a transcript, the notes win. Flag the conflict in the internal brief.

### 2. Gap interview

Compare the profile against the required fields in `references/client-profile.md`. Ask the user only for what is missing — **one question at a time**, plainest possible wording.

If the user says "just proceed" (or similar), stop asking. Mark each missing item `ASSUMED: <your assumption>` and carry those markers into **both** outputs. Never block on missing information.

### 3. Candidate workflows

List every automatable workflow found in the input — not just the obvious one. Typical AC Wins territory: document/quote/form processing, invoice and data extraction, Excel cleanup and reporting, WhatsApp/email responses, sales outreach and lead management.

### 4. The 2-week gate (hard filter)

Apply the gate test from `references/scoring-rubric.md` to every candidate: *Can we demonstrate measurable results within 2 weeks using tools the client already has?* Yes → survives. No → moves to the **Phase 2+ list** in the internal brief. Gated-out candidates are never silently dropped and are never scored.

### 5. Score

Score each survivor 1–5 on **Hours saved**, **Error/risk cut**, and **Change-readiness**, using the anchors in `references/scoring-rubric.md`. Equal weights; sum. Tie-breaker: higher Hours saved wins. Name exactly one winner and one runner-up (if a second survivor exists).

### 6. ROI

Compute per `references/roi-assumptions.md`: weekly-hours-saved range × wage benchmark → monthly HK$ range. Round benefits **down** (nearest HK$500), costs **up**. State tool cost honestly at US$20–200/month tier. List every assumption under the figures.

**Co-funding:** use the wording in `references/roi-assumptions.md` verbatim — do not paraphrase it from memory. **TVP closed to new applications after 31 December 2024; never name it as available.** The section is omitted only if the client is not a Hong Kong-registered business. Savings always assume no subsidy. Never run a client's funding application.

### 7. Outputs

Write three files to `~/Documents/AC-Wins/clients/<client-slug>/<YYYY-MM-DD>/` (slug = lowercase hyphenated client name, e.g. `wing-hing-trading`):

| File | Template | Language |
|---|---|---|
| `internal-brief.md` | `references/internal-brief-template.md` | English |
| `client-report-en.md` | `references/report-template-en.md` | English |
| `client-report-zh.md` | `references/report-template-zh.md` | 繁體中文 (written natively, not word-for-word translated) |

The client report is **always bilingual** (both files produced) regardless of the client's language. If no client name is known, ask before saving.

After saving, offer to render the client report to Word via the docx skill (optional — the markdown stands alone if unavailable).

## Rules that override everything

- The 2-week gate is a filter, not a scoring factor. Never score a gated-out candidate.
- Benefits round down, costs round up. No single-figure ROI — always ranges.
- Every figure in any output must have a stated assumption next to it.
- Missing info + "just proceed" → `ASSUMED` markers, never a stall.
- Client data stays local. Send nothing anywhere.

## Common mistakes

| Mistake | Fix |
|---|---|
| Recommending two or three workflows "to be safe" | Exactly one winner. Runner-up named, not recommended. |
| Scoring a candidate that needs new tooling or >2 weeks | It fails the gate — Phase 2+ list, unscored. |
| Single-point ROI ("saves HK$8,000/month") | Ranges only, assumptions listed beneath. |
| Translating the EN report into Chinese literally | Write the 繁體中文 report natively from the same facts. |
| Blocking the assessment on missing fields | Ask one at a time; on "just proceed", assume and mark. |
| Dropping infeasible ideas silently | Phase 2+ list in the internal brief — it's the expansion pipeline. |
