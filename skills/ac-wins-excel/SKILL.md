---
name: ac-wins-excel
description: Use when cleaning, restructuring, or reporting on a messy client spreadsheet for AC Wins — duplicates, malformed rows, inconsistent dates or formats, or "make sense of this Excel". Produces a cleaned copy plus a plain-language report of every change. Original file is never touched.
---

# AC Wins — Excel Cleanup & Reporting

Turn a messy client spreadsheet into clean data plus a report the owner can read in two minutes.

**First: read `references/quality-rules.md` and obey it throughout.**

## Process

```
Receive → Identify client → Copy → Diagnose → Clean (logged) → Report → Deliver
```

### 1. Receive & copy

Confirm which client this belongs to (ask if ambiguous); read their `client-notes.md`. **Work on a copy named `<source>-cleaned.xlsx` — the original is never modified.**

### 2. Diagnose before touching

Scan and list what's wrong: duplicate rows, malformed rows, inconsistent date formats, mixed number/text columns, stray headers, merged-cell traps, trailing spaces, mixed 中文/English headers. State the diagnosis before cleaning.

### 3. Clean — mechanical fixes only, every one logged

Fix what has one correct answer: exact duplicates removed, date formats standardized, number-stored-as-text converted, whitespace trimmed, headers normalized. Every action logged with counts ("removed 14 duplicate rows", "standardized 3 date formats to YYYY-MM-DD").

**Flag, don't fix**, anything that requires judgment: out-of-range values, suspicious outliers (an amount 100× its neighbors), near-duplicates that differ in one field, rows that might be intentional. These go in the report as findings, values marked `[?]` where relevant.

### 4. Verify

If the sheet contains totals or subtotals, recompute them against the cleaned data — mismatches flagged with both figures. Row counts stated: before, removed, after.

### 5. Deliver

Two files at the standard output location:

- `<source>-cleaned.xlsx` (use the xlsx skill when available)
- `cleanup-report.md` — plain language: what was wrong, what was changed (with counts), what was **flagged but left alone and why**, ending with the "Verify before sending" checklist.

Append any recurring quirk of this client's data to `client-notes.md`.

## Common mistakes

| Mistake | Fix |
|---|---|
| "Fixing" an outlier that might be a real transaction | Flag it; the client knows their business. |
| Deleting near-duplicates as if exact | Only exact duplicates are removed; near-matches are flagged. |
| Editing the original file | Copy first, always. The original is the client's source of truth. |
| A report that lists changes without counts | Counts make it checkable — "removed 14", not "removed some". |
| Silently dropping unparseable rows | Quarantine them on a `needs-review` sheet and say so. |
