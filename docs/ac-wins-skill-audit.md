# AC Wins Skills Audit — comms, excel, invoices, quotes, schedule

**Date:** 2026-07-31
**Scope:** the five never-audited skills in `/root/.claude/skills/`
**Standard:** the same bar applied to `ac-wins-assessment` (arithmetic/consistency, unhandled edge cases, dangling references), plus bilingual integrity, client-safety, internal contradiction, and the never-stall house rule.
**Method:** every SKILL.md, every reference file, and the 258-line HTML asset read in full. Every finding below was re-read in the file before being written down. Nothing speculative is included.

**Total: 27 defects.** No skill is clean.

| Skill | Defects | Worst class |
|---|---|---|
| Cross-cutting | 2 | Never-stall house rule absent |
| ac-wins-comms | 2 | Wrong voice source; no 繁/简 rule |
| ac-wins-excel | 6 | Silent date corruption |
| ac-wins-invoices | 4 | Reconciliation not verifiable from the deliverable |
| ac-wins-quotes | 3 | Stall on missing fields; issuer details never collected |
| ac-wins-schedule | 10 | Client-safety contradiction; roster code mis-read |

---

## Cross-cutting

### X1 — The never-stall house rule exists in only one of the five skills
**Files:** `ac-wins-quotes/SKILL.md:29` (sharpest instance); also absent from `ac-wins-comms/SKILL.md`, `ac-wins-excel/SKILL.md`, `ac-wins-invoices/SKILL.md` entirely.
**Severity:** High (house-rule violation)

A grep for `ASSUMED` / "just proceed" across all five skills returns hits in `ac-wins-schedule` **only**. The assessment skill and the schedule skill both encode "missing info + 'just proceed' → `ASSUMED` markers, never a stall" (`ac-wins-schedule/SKILL.md:76`). The four constitution-governed skills have no equivalent.

The concrete failure is `ac-wins-quotes/SKILL.md:29`:

> Missing fields that matter (price, quantity, terms, validity date, customer name) → **ask the user one at a time**. Never invent a price, discount, or term.

There is no branch for "AC says just build it". The skill will loop on questions and never produce a document. Note that comms already solved this correctly at `ac-wins-comms/SKILL.md:30` with `[fill in: delivery date]` placeholders — quotes has the same need and no such mechanism (it only has `[?]`, which is for *uncertain* values, not *absent* ones).

**Why it matters:** AC's stated failure mode is stalling on operational grind. A quote skill that answers a Friday-afternoon "just make the quote" with five sequential questions is the exact behaviour the house rule exists to prevent — and the one that gets the skill abandoned.

**Fix:** Add to `ac-wins-quotes/SKILL.md:29` and mirror the pattern into comms/excel/invoices:
> On "just proceed" or any signal the user won't answer now: emit the deliverable with `[fill in: unit price]` placeholders in every unanswered field, list every placeholder in the "Verify before sending" checklist, and state at the top of the checklist that the document is **not sendable until the placeholders are filled**. Never invent a value; never refuse to produce the document.

### X2 — `quality-rules.md` is four byte-identical copies with no single source of truth
**Files:** `ac-wins-comms/references/quality-rules.md`, `ac-wins-excel/references/quality-rules.md`, `ac-wins-invoices/references/quality-rules.md`, `ac-wins-quotes/references/quality-rules.md` (all md5 `6af231a72c3ba40cfed3c70d3af1d005`)
**Severity:** Low

The file calls itself "the constitution" and says it "applies to every AC Wins delivery skill" (line 3), but it is physically duplicated four times. Amending a rule requires four edits; miss one and a skill silently runs an outdated constitution. Two live symptoms already exist: the file's own Rule 3 (line 15) hardcodes the Excel-specific naming `<name>-cleaned.xlsx` as if it were the universal rule, and Rule 5's filename table (lines 25–30) has no row for the schedule skill's outputs.

**Fix:** Keep one canonical copy in the repo (`/home/user/AC/docs/` or a shared skill), have each SKILL.md point at it, or at minimum add a version line (`Constitution v1 — 2026-07-18`) to the top of all four and a check that they match. Add the schedule row to the Rule 5 table.

---

## ac-wins-comms — 2 defects

### C1 — Voice is taken from notes or an AC Wins default, never from the business's own messages in the thread
**File:** `ac-wins-comms/SKILL.md:25`
**Severity:** Medium-High

> **Voice:** the *client's business* voice as recorded in their `client-notes.md` (formality, greetings, sign-offs, emoji habits). No notes → AC Wins default: plain, warm, short sentences, no jargon, no hype.

The constitution (Rule 6, `quality-rules.md:36`) says `client-notes.md` is *created on first contact* — so on the first thread for any client, and on any thread before a voice note has been recorded, there are no notes. The skill therefore falls back to **AC Wins' voice**, not the client's — while the frontmatter (line 3) promises "uses the client's business voice".

The client's actual voice is sitting in the input: a pasted WhatsApp thread or email chain almost always contains the business's own previous replies. The skill never looks at them.

**Why it matters:** An old-school HK trading boss whose WhatsApp reads "收到，星期三出貨，多謝哂🙏" gets handed a draft in AC Wins' clean consulting register. It reads as written by an outsider, which is precisely what the client's customer will notice. First-thread drafts are also the ones AC uses to demo the value.

**Fix:** Rewrite line 25 as a three-step precedence:
> **Voice, in order:** (1) the business's own prior messages *in this thread* — mirror their greetings, sign-offs, sentence length, emoji and 口語/書面語 register; (2) `client-notes.md` where it contradicts or adds to what the thread shows; (3) only if the business has sent nothing in the thread and there are no notes, the AC Wins default. State in the deliverable which source was used.

### C2 — No rule for 繁體 vs 简体, and none for Cantonese written register
**File:** `ac-wins-comms/SKILL.md:24`
**Severity:** Medium

> **Language:** draft in the language of the incoming thread by default. EN / 繁體中文 / 简体中文 variants on request. Mixed-language threads get a reply matching the customer's dominant language.

The skill offers both 繁體中文 and 简体中文 but never says how to choose when the thread is simply "Chinese". "Language of the thread" does not resolve script: it is decided by whether the customer is HK/Taiwan or mainland, and the wrong choice is immediately visible. Line 26 handles punctuation（，。：）but not script.

Separately, nothing addresses written register. HK WhatsApp business threads split between colloquial Cantonese (係、唔該、咗、㗎) and standard written Chinese (是、謝謝、了). Writing 書面語 into a 口語 thread reads stiff; writing 口語 into a formal email reads unprofessional. For a skill whose whole positioning is "the AI translator for old-school Hong Kong business", this is the judgement call it most needs to encode.

**Fix:** Replace line 24's second sentence with:
> Match the **script** of the thread: 繁體 if the customer writes 繁體 or the business is HK/Macau/Taiwan; 简体 only if the customer writes 简体 or is mainland-based. Default for a HK client with no signal: 繁體中文. Match the **register** too — if the thread is colloquial Cantonese (係/唔該/咗/㗎), draft colloquial Cantonese; if it is standard written Chinese or an email, draft 書面語. Never switch script or register mid-engagement; record the client's convention in `client-notes.md` on first contact.

---

## ac-wins-excel — 6 defects

### E1 — Ambiguous DD/MM vs MM/DD dates are classified as a "mechanical fix with one correct answer"
**File:** `ac-wins-excel/SKILL.md:28` (heading at :26, the flag-don't-fix list at :30)
**Severity:** **High — silent data corruption**

> ### 3. Clean — mechanical fixes only, every one logged
> Fix what has one correct answer: exact duplicates removed, **date formats standardized**, number-stored-as-text converted, whitespace trimmed, headers normalized.

`03/04/2026` in a messy HK spreadsheet has **two** correct answers — 3 April (HK/UK convention) or 4 March (US convention, and Excel's default under an en-US locale). The skill classifies date standardization as mechanical, which by its own structure means it is done without asking and without appearing in the flag-don't-fix list at line 30. Any value where both components are ≤12 can be silently transposed, and the cleaned file *looks* immaculate afterwards — a uniform column of YYYY-MM-DD with no evidence of the choice made. The log entry the skill does produce ("standardized 3 date formats to YYYY-MM-DD", line 28) records the format change but not the interpretation.

**Why it matters:** Roughly 12/31 of the dates in any real client sheet are ambiguous. Corrupting them scrambles a client's payment ledger, delivery schedule or ageing report, and the cleaned file is the one they'll start using. This is the single most damaging defect found in the five skills: it is undetectable by the client, it's caused by the skill, and it lands in the deliverable AC hands over as proof the engagement worked.

**Fix:** Move ambiguous dates out of the mechanical list and into flag-don't-fix. Insert after line 28:
> **Dates are only mechanical when unambiguous.** Before standardizing, scan the column: if *any* value has both components ≤12, the DD/MM vs MM/DD convention is undetermined. Resolve it once — evidence first (any value with a component >12 fixes the convention for the whole column; a file from a HK business defaults to DD/MM), then confirm with the user, and on "just proceed" mark `ASSUMED: dates read as DD/MM (Hong Kong convention)` at the top of the cleanup report and in a note on the cleaned sheet. Flag any row whose date cannot be parsed under the chosen convention rather than coercing it. Never mix conventions within one column.

### E2 — "number-stored-as-text converted" destroys identifiers, leading zeros and long codes
**File:** `ac-wins-excel/SKILL.md:28`
**Severity:** Medium-High

The same mechanical-fix line converts every text-stored number. Applied blindly this destroys exactly the fields a HK SME sheet is full of: invoice numbers (`0012345` → `12345`), BR numbers, bank account and container numbers (16 digits → `1.23457E+15`), phone numbers (`852 9123 4567`), and product/part codes with leading zeros. These are stored as text *on purpose*. The flag-don't-fix list at line 30 does not cover it.

**Why it matters:** A lost leading zero breaks the join between the cleaned sheet and every other system the client runs. It is also irreversible inside the deliverable, and unlike an outlier it is not visually obvious.

**Fix:** Amend line 28 to:
> number-stored-as-text converted **only in columns that are genuinely quantitative** (amounts, quantities, rates — judged by the header and the value distribution). Identifier-like columns — invoice/order/BR/account/phone/product codes, anything with leading zeros, anything longer than 15 digits — stay as text, always. If a column is genuinely mixed, convert nothing, flag it, and say which rows differ.

### E3 — Exact duplicates are deleted outright; the sibling invoices skill flags the same thing instead of dropping it
**File:** `ac-wins-excel/SKILL.md:28` and `:50`, contradicting `ac-wins-invoices/SKILL.md:36`
**Severity:** Medium-High

Excel (`:28`, `:50`): "exact duplicates removed", "Only exact duplicates are removed; near-matches are flagged."
Invoices (`:36`): "Suspected duplicates (same vendor + invoice number + amount) are **flagged, not dropped** — mark both rows and list them in the checklist."

Two skills under the same constitution take opposite actions on the same data. Two byte-identical rows in a sales ledger are frequently two real transactions — the same customer buying the same item twice on the same day is ordinary retail and ordinary trading. Excel deletes one; invoices would have flagged both. The excel skill's own Rule 1 ("Flag, never guess") points to the invoices behaviour.

The deliverable also retains no record of *which* rows went — only a count ("removed 14 duplicate rows"). The client can only recover them by diffing against the original themselves.

**Why it matters:** Under-reported revenue in a client's own books, produced by the tool AC sold them as a cleanup. It is also the fastest possible way to lose a first client.

**Fix:** Change line 28 to: "exact duplicates removed **only when the row carries no independent transaction identity** (no distinct invoice/receipt/order number, no distinct timestamp). Otherwise flag both rows as the invoices skill does and let the client decide." And in every case, copy the removed rows to the `needs-review` sheet (see E4) so the deliverable is self-contained.

### E4 — The `needs-review` sheet is a dangling reference
**File:** `ac-wins-excel/SKILL.md:53`
**Severity:** Medium

> | Silently dropping unparseable rows | Quarantine them on a `needs-review` sheet and say so. |

`needs-review` appears in the Common mistakes table and **nowhere else in the skill** (verified by grep across the whole skill directory). Step 3 (`:26–:30`) never instructs its creation; step 5 Deliver (`:36–:43`) lists the contents of the two output files and does not mention it. This is the same class as the assessment skill's "state the fee per the user's instruction" defect: a remedy named in a rule that no step in the playbook ever establishes.

**Why it matters:** Unparseable rows are either dropped (the exact mistake the table forbids) or dumped into the report as prose the client cannot re-import.

**Fix:** Add to step 3 after line 30: "Rows that cannot be parsed, and rows removed as duplicates, are written to a `needs-review` sheet in the cleaned workbook — original row number, the row's contents as found, and one-line reason. Nothing leaves the workbook." And add the sheet to step 5's description of `<source>-cleaned.xlsx`.

### E5 — Recomputed totals will false-flag mismatches the skill itself caused
**File:** `ac-wins-excel/SKILL.md:34`
**Severity:** Medium-High

> If the sheet contains totals or subtotals, recompute them against the cleaned data — mismatches flagged with both figures. Row counts stated: before, removed, after.

If step 3 removed 14 duplicate rows, the total recomputed *against the cleaned data* will differ from the sheet's stated total by the value of those 14 rows — every time. The instruction produces a flagged discrepancy on essentially every cleaned file, presented to the client as "your stated total doesn't match your line items". It also puts the deliverable at odds with constitution Rule 2 (`quality-rules.md:11`, "Never 'correct' a source document's total silently"): the cleaned file now carries a different total with no reconciliation.

**Why it matters:** Either AC delivers a report implying the client's books are wrong when they aren't, or the client concludes the cleanup broke their numbers. Both destroy the "prove it" moment the whole business model rests on.

**Fix:** Replace line 34 with a three-figure reconciliation:
> Recompute totals **twice**: against the *original* rows (this is the check of the client's own arithmetic — a mismatch here is a genuine finding, flag with both figures) and against the *cleaned* rows. Then state the bridge explicitly: original total → minus the value of removed rows → cleaned total, so every dollar of the difference is attributed to a change the report already lists. Never present a cleaning-induced difference as a discrepancy in the client's data.

### E6 — Single-sheet assumption: multi-sheet workbooks, formulas and formatting are unaddressed
**File:** `ac-wins-excel/SKILL.md` — whole file; "sheet" appears only at `:34` ("If **the** sheet contains totals") and `:53`
**Severity:** Medium

The skill speaks throughout of "a messy client spreadsheet" as one table. Real HK SME workbooks are five tabs, cross-sheet formulas, a pivot, and a print-formatted summary. Nothing says which sheet is the target, whether the other sheets survive into `<source>-cleaned.xlsx`, or what happens to formulas that reference the rows being deleted. Writing a cleaned dataframe out to a new xlsx — the natural implementation — silently drops every other tab, every formula, and all formatting.

**Why it matters:** The client opens the "cleaned" file, finds their summary tab and all their formulas gone, and the engagement is over. Note the original is safe (Rule 3), so this is recoverable — but only after the client has lost confidence.

**Fix:** Add to step 1 (after `:20`): "List every sheet in the workbook and confirm which one is the target (ask if more than one holds data). All other sheets are carried into the cleaned copy **untouched**." Add to step 5: "State in `cleanup-report.md` which sheets were changed, which were passed through unchanged, and warn explicitly if any formula referenced removed rows — those formulas are listed, not silently recalculated."

---

## ac-wins-invoices — 4 defects

### I1 — The extraction schema cannot support the reconciliation the skill promises
**File:** `ac-wins-invoices/SKILL.md:30` (columns) vs `:40–:41` (verification)
**Severity:** **High**

Columns (`:30`): `date | vendor | invoice number | line description | quantity | unit price | amount | currency`
Verify (`:40`): "Per invoice: line items must sum to the invoice's stated total. Mismatch → flag with both figures."
Verify (`:41`): "Per batch: grand total of extracted amounts stated and reconciled."

The invoice's **stated total is never captured in a column**. Nor is tax, discount, shipping, or any other non-line charge. Two consequences, both real:

1. **The reconciliation is not reproducible from the deliverable.** The check happens in the model's head at extraction time; the client's spreadsheet contains no stated-total column to check it against, and nobody can re-run it next month. "Reconciled" against what is undefined at line 41.
2. **Systematic false mismatches.** Any invoice with a discount line, delivery charge, rounding adjustment or tax will have `Σ(quantity × unit price) ≠ stated total` by construction. The skill will flag correct invoices as broken. The constitution's own Rule 6 example (`quality-rules.md:36`, "their invoices put GST on line 2") shows tax was anticipated — the schema just has nowhere to put it.

**Why it matters:** Invoice extraction is one of AC's named flagship automations. A deliverable where the headline promise ("reconciles all totals", frontmatter line 3) cannot be verified by the client, and which cries wolf on clean invoices, fails the "prove it before you scale it" test on first delivery.

**Fix:** Split the deliverable into two sheets in `extracted-invoices.xlsx`:
> **`line-items`** — one row per line: `source file | page | date | vendor | invoice number | line description | quantity | unit price | amount | currency`.
> **`invoice-summary`** — one row per invoice: `source file | date | vendor | invoice number | currency | sum of line items (computed) | tax/other charges | stated total | variance | status`. Variance ≠ 0 is the flag; a variance fully explained by a captured tax/charge line is not a mismatch. The batch reconciliation is the summary sheet's totals, **per currency**.

### I2 — No source-file/page column: flagged items can't be traced back to the document
**File:** `ac-wins-invoices/SKILL.md:30`
**Severity:** Medium

The schema has no column recording which file (or which page of a file) each row came from. Step 5 (`:46`) then promises a checklist naming "every `[?]`, every flagged duplicate, every skipped file, every total mismatch" — but a checklist entry pointing at a row in a 400-row sheet gives the client no route back to the original scan.

The schedule skill gets this exactly right by contrast: `schedule-model.md:17` makes `source` mandatory on every item ("Every item needs one"). The invoices skill, where provenance matters most, omits it.

**Why it matters:** Resolving 12 `[?]` cells across a 200-row batch means hunting through 60 photos by hand. That is the manual grind the automation was sold to remove.

**Fix:** Add `source file` and `page` as the first two columns (as in the I1 fix), populated for every row, and make the "Verify before sending" checklist cite them: "Row 137 — `IMG_2041.jpg` p.2 — unit price `[?]`".

### I3 — "Grand total" for the batch contradicts "mixed currencies are kept separate"
**File:** `ac-wins-invoices/SKILL.md:41` vs `:42`
**Severity:** Medium

> - Per batch: grand total of extracted amounts stated and reconciled.
> - Currency consistency checked; mixed currencies are kept separate, never converted silently.

Two adjacent bullets. A single "grand total of extracted amounts" across a batch containing HK$, US$ and RMB invoices is a meaningless number — and producing one is itself a silent conversion at an implied rate of 1.0. HK trading firms and banks' vendors, AC's named target segment, routinely have exactly this mix.

**Why it matters:** A summed figure that mixes currencies is worse than no figure: it looks authoritative and it is wrong. If the client uses it for a payables total, they misjudge cash.

**Fix:** Change line 41 to: "Per batch: a **subtotal per currency**, each stated and reconciled against the summary sheet. Never produce a single cross-currency total; if the client needs one, they supply the rate and it is shown as a separate, clearly labelled line with the rate and its date."

### I4 — One invoice per file is assumed; multi-invoice PDFs and multi-page invoices are unhandled
**File:** `ac-wins-invoices/SKILL.md:20`
**Severity:** Medium

> Count the documents and state the count back ("Received 14 files — 12 readable invoices, 2 need attention").

(The arithmetic here checks out: 12 + 2 = 14.) But the framing equates files with invoices. The two most common real intakes in HK SME bookkeeping are neither: a single scanned PDF containing 30 receipts, and a 3-page invoice whose totals appear only on the last page. Nothing in the skill says to split a multi-invoice file into its constituent invoices, or to treat continuation pages as one invoice rather than three.

**Why it matters:** A 30-receipt PDF processed as one document either produces one nonsense row or 30 rows nobody reconciled per-invoice. A 3-page invoice processed as three invoices produces two "line items don't match the total" false flags plus a duplicate-invoice-number flag — noise on the very first batch.

**Fix:** Add to step 1 after line 20: "Files and invoices are not the same count. Open each file and count **invoices**, not pages: one PDF may hold many receipts (split them; each gets its own invoice number and summary row) and one invoice may span several pages (merge them; the stated total is the one on the final page). State both counts back — 'Received 14 files containing 31 invoices' — and record the page range per invoice in the `page` column."

---

## ac-wins-quotes — 3 defects

*(The stall on missing fields, `SKILL.md:29`, is reported as cross-cutting finding X1 and is the most serious problem in this skill.)*

### Q1 — The client's own business identity and payment details are never collected by any step
**File:** `ac-wins-quotes/SKILL.md:25`, with the collection steps at `:20` and `:29`
**Severity:** Medium-High

> **No template:** produce a clean generic quote layout carrying the *client's* business details (name, contact, logo placeholder, their terms) …

Nothing in the skill ever obtains those details. Step 1 (`:20`) reads `client-notes.md` for "standard terms, pricing habits, numbering format". Step 3 (`:29`) asks for "price, quantity, terms, validity date, customer name" — all of which are about the *job and the end customer*, not the issuing business. The constitution's Rule 6 (`quality-rules.md:36`) scopes `client-notes.md` to "client quirks", not business identity. So the registered company name, address, phone, email, BR number and bank/payment details required for the document to function are referenced at line 25 and collected nowhere.

This is the assessment skill's defect #3 repeated exactly: a template instructs the use of information no step ever gathers.

**Why it matters:** A quotation without the issuer's contact and payment details is not a quotation — the customer cannot pay it. It fails only when AC is filling in the gap by hand under time pressure, which is when errors get sent.

**Fix:** Add a business-identity block to step 1: "On first quote for a client, capture and store in `client-notes.md`: registered business name (EN + 中文), address, phone, email, BR number, quote-number format, default validity period, standard payment and delivery terms, bank/payment details, and the logo file path if they have one. Reuse it on every later quote; on 'just proceed' with any of it missing, insert `[fill in: …]` and list it in the checklist."

### Q2 — The generic-layout warning and logo placeholder can ship inside a customer-facing document
**File:** `ac-wins-quotes/SKILL.md:25`
**Severity:** Medium

> … (name, contact, **logo placeholder**, their terms), **flagged clearly**: *"generic layout — restyle to client's brand."*

Line 25 never says *where* the flag goes, and the deliverable at line 39 is `quote-<customer>.docx` — a finished document that the client forwards to their own customer. The literal reading puts an internal production note and an empty logo box on the page. AC's own rule at line 47 ("AC Wins branding on a client's quote → The quote belongs to the client's business") shows the intent; the placement is just unspecified.

**Why it matters:** A HK SME forwarding a PDF to a customer with "generic layout — restyle to client's brand" across the header is a reputational hit for both the client and AC Wins, and it is the kind of thing that gets noticed only after it's sent.

**Fix:** Amend line 25: "The document itself contains **nothing but the client's own content** — no production notes, no placeholder graphics, no AC Wins marks. If no logo is available, omit the logo area entirely rather than leaving a placeholder box. The 'generic layout — restyle to client's brand' warning goes in the chat reply and at the top of the 'Verify before sending' checklist, never in the document."

### Q3 — The ask-list omits currency, tax treatment and lead time, though the maths step assumes taxes
**File:** `ac-wins-quotes/SKILL.md:29` vs `:35`
**Severity:** Low-Medium

Step 3 (`:29`) lists the fields worth asking for: "price, quantity, terms, validity date, customer name". Step 4 (`:35`) then computes "subtotal ± discounts/taxes = grand total" — a tax line the skill never asked about. Currency appears nowhere in the skill at all, and delivery/lead time appears only obliquely as "delivery terms" pre-filled from notes (`:30`).

**Why it matters:** For AC's named target segment — trading firms and banks' vendors — a quote without an explicit currency is genuinely ambiguous (HK$ / US$ / RMB), and a quote without a lead time is the single most common cause of a follow-up phone call. The mismatch between :29 and :35 also means a quote can reach the verify step with a tax line nobody confirmed.

**Fix:** Extend line 29's list to: "price, **currency**, quantity, **tax treatment (usually none in HK — confirm for export/cross-border)**, discount, terms, **delivery / lead time**, validity date, customer name". Add to line 35: "If a tax or discount line appears in the arithmetic, it must trace to a value the user supplied or a note in `client-notes.md` — never to an assumption."

---

## ac-wins-schedule — 10 defects

### S1 — "Persist it as an artifact" contradicts "Client data stays local. Send nothing anywhere."
**File:** `ac-wins-schedule/SKILL.md:63` vs `:77`
**Severity:** **High — client safety**

Line 63: "Because a schedule is something they'll reopen and keep current, also **persist it as an artifact** if that tool is available…"
Line 77: "- **Client data stays local.** Send nothing anywhere."

Publishing an artifact uploads the page to hosted infrastructure and mints a URL. Even starting private, that is client data leaving the machine — and the payload here is unusually sensitive: named staff and their leave and rest days, the client's customer meetings and site visits, rent and payroll dates, and unannounced deadlines. The same contradiction reaches the reference file: `recurring-setup.md:36` re-states "only drafts and delivers to the owner", so an automated weekly run would publish client rosters on a schedule.

Two rules in the same skill give opposite instructions on the same action, which means the behaviour is decided by whichever the model reads last.

**Why it matters:** This is the one defect in the five skills with consequences beyond a bad deliverable. AC's clients are traditional HK firms whose first question about AI is "where does my data go" — and his positioning is built on being the honest alternative to vendors who were careless with exactly this. Staff names and leave records also carry HK PDPO obligations that are not AC's to decide unilaterally.

**Fix:** Delete the artifact instruction from line 63. Replace with:
> Deliver `agenda.html` as a local file only. **Do not publish it as an artifact or to any hosted location** — the file contains staff names, leave records and client commitments, and client data never leaves the machine (see the rule below). Because it is a plain self-contained HTML file, the owner can reopen it, mail it, or print it themselves; re-running this skill regenerates it with current dates.

If AC decides hosted artifacts are genuinely wanted, that must be an explicit, per-client, opt-in decision recorded in `client-notes.md` — never a default, and never inside a recurring run.

### S2 — "(see the persisted-artifacts flow)" is a dangling reference, and `SendUserFile` is named unconditionally
**File:** `ac-wins-schedule/SKILL.md:63`
**Severity:** Medium

> Then deliver `agenda.html` to the user with SendUserFile. … also persist it as an artifact if that tool is available (**see the persisted-artifacts flow**).

There is no persisted-artifacts flow. The skill's references are `schedule-model.md`, `conflict-checks.md` and `recurring-setup.md`; grep across the entire skill directory returns this line and nothing else. Same defect class as the assessment skill's dangling fee instruction.

`SendUserFile` is also named as the delivery mechanism with no availability hedge, unlike every other tool reference in the suite ("use the xlsx skill **when available**", `ac-wins-excel/SKILL.md:40`; "Fill via the docx/xlsx skills **when available**", `ac-wins-quotes/SKILL.md:24`). Where that tool doesn't exist, the delivery step has no fallback.

**Why it matters:** A pointer to nothing sends the model looking for guidance it will end up inventing, and an unconditional tool name turns a missing tool into a failed delivery at the last step of the job.

**Fix:** With S1 applied, line 63 becomes: "Deliver `agenda.html` to the user with SendUserFile when available; otherwise state the saved file path and offer to print the agenda inline." Remove the parenthetical entirely.

### S3 — The agenda template hard-codes `n` and blank as "rest day", contradicting the roster guidance
**File:** `ac-wins-schedule/assets/agenda-template.html:244`, contradicting `references/schedule-model.md:39` and `:42`
**Severity:** **High**

Template line 244:
```js
if(key==="off"||key==="n"||key==="") return '<td class="mk-off">'+(lang==="zh"?"休":"–")+'</td>';
```

`schedule-model.md:39` warns: "codes vary per client… **Do not assume what a code means if you're not sure** — capture it 'as recorded', surface it, and ask the owner once… Guessing a leave code as a working shift is exactly the kind of error that breaks trust." The template then hard-codes precisely such a guess. **`N` means "night shift" in a large share of shift rosters** — security, logistics, F&B, plant operations, all core AC target industries. Where it does, the agenda renders a fully-staffed night as an empty rest day.

The same line maps `""` (blank) to rest day, directly against `schedule-model.md:42`: "Blank cells are normal. A blank on a working day is a **possible coverage gap — note it, don't fill it**." The template fills it, with "off".

The render path bypasses the flagging rule entirely: the code is silently reinterpreted at display time, so it never reaches the attention list.

**Why it matters:** The skill's own stated product is catching "the shift with nobody on it" (`SKILL.md:12`) and `conflict-checks.md:25` calls the coverage gap "the one owners most want caught". This defect breaks that check in both directions — inventing gaps that don't exist (night shifts shown as off) and hiding gaps that do (blanks shown as deliberate rest days). Either way the owner acts on a wrong roster, and staffing errors are the most visible kind of failure to an SME.

**Fix:** Change line 244 to treat only the explicitly confirmed code as off, and render everything else as recorded:
```js
if(key==="off") return '<td class="mk-off">'+(lang==="zh"?"休":"–")+'</td>';
if(key==="")    return '<td class="mk-unknown" title="not recorded">?</td>';
if(key==="al")  return '<td class="mk-al">'+(lang==="zh"?"假":"AL")+'</td>';
return '<td>'+esc(m)+'</td>';   // any other code, including "N": show as recorded
```
And add to `SKILL.md` step 3: "Before filling the roster grid, confirm what each non-obvious code means for **this** client — `N` in particular is 'night shift' as often as 'not working'. Record the mapping in `client-notes.md`. Unconfirmed codes go into the grid verbatim and into the attention list as an `ASSUMED` line; blank cells render as `?` and are checked as possible coverage gaps."

### S4 — `todayDate` is frozen at generation time in a file the client is told to reopen
**File:** `ac-wins-schedule/assets/agenda-template.html:125`, against `SKILL.md:63` and `:46`
**Severity:** Medium

```js
todayDate:"2026-07-21"          /* ISO; the matching day gets the "today" highlight */
```

`SKILL.md:63` explicitly frames the agenda as a file "they'll reopen and keep current", and `SKILL.md:46` requires status to be derived "using today's date from the environment". But `todayDate` is a literal baked in when the file is written, and the `overdue` tinting (template `:210`) is baked in the same way. Opened on Thursday, a Monday-generated agenda still highlights Monday as today and still shows Tuesday's passed deadline as merely upcoming.

**Why it matters:** A schedule that confidently highlights the wrong day is worse than one with no highlight — the owner glances, misreads, and stops trusting it. It also silently degrades the exact artefact the recurring run (`recurring-setup.md`) is meant to keep fresh.

**Fix:** Make the highlight live, keeping the baked value only as a fallback. In the render engine at template `:205`:
```js
const today = new Date(new Date().toLocaleString("en-CA",{timeZone:"Asia/Hong_Kong"}))
                .toISOString().slice(0,10) || DATA.meta.todayDate;
```
and add a line to the footer when the file is more than a day older than its `prepared` date: "Generated {date} — re-run for the current week."

### S5 — Missing 繁體中文 fields silently fall back to English
**File:** `ac-wins-schedule/assets/agenda-template.html:181`, against `SKILL.md:74` and `references/schedule-model.md:11`
**Severity:** Medium (bilingual integrity)

```js
function t(v){ if(v==null) return ""; return (typeof v==="object") ? (v[lang]??v.en??"") : v; }
```

`SKILL.md:74` makes it a rule that overrides everything: "**The agenda is always bilingual** (EN + 繁體中文), the Chinese written natively." `schedule-model.md:11` requires every `title` in both. But `t()` fills any missing `zh` with the English string, and nothing anywhere checks that every `{en, zh}` pair is populated before delivery.

The result is a Chinese view that looks complete and is quietly part English — and the failure is invisible to whoever generated it, because it renders cleanly. A model filling twenty items will drop a `zh` key eventually; the fallback guarantees nobody notices.

**Why it matters:** The bilingual agenda is the client-facing deliverable, handed to an owner who may read Chinese primarily. Half-translated is a worse impression than English-only, and it undercuts the trilingual translator positioning that is AC's whole differentiator.

**Fix:** Two changes. In the template, make the gap visible instead of papering over it:
```js
function t(v){
  if(v==null) return "";
  if(typeof v!=="object") return v;
  if(v[lang]) return v[lang];
  return (lang==="zh" ? "【待譯】" : "[missing]") + " " + (v.en ?? v.zh ?? "");
}
```
And add a hard step to `SKILL.md:61`: "Before delivering, walk every `{en, zh}` pair in `DATA` — meta, every attention line, every item title and meta, every staff name — and confirm both are filled and that the 繁體中文 was written natively (full-width punctuation, Cantonese-business phrasing), not translated from the English. Any pair you cannot complete goes in the brief as an open item, not into the file."

### S6 — Client text is injected into `innerHTML` unescaped
**File:** `ac-wins-schedule/assets/agenda-template.html:199–201`, `:212–:216`, `:237–:247`
**Severity:** Medium

Every render path builds HTML by string concatenation and assigns via `innerHTML`, interpolating client-supplied values — `t(x.text)`, `t(it.time)`, `t(it.title)`, `t(it.meta)`, `t(r.name)`, and the raw shift code `m` at `:246` — with no escaping.

The realistic failure is not an attack; it is ordinary content. A deadline titled `P&L <draft>`, a note `Total < 5 staff`, or a site name in angle brackets will silently swallow the rest of that element. The `<` disappears along with everything after it, and the agenda renders looking fine — just missing an item's text.

**Why it matters:** Rule `SKILL.md:72` — "Every item carries a date/time and a source… A missing time is fine; a wrong one erodes trust." A silently truncated item is the same failure at a larger scale, and the owner has no way to detect it.

**Fix:** Add an escape helper next to `t()` at template `:181` and route every interpolated value through it:
```js
function esc(s){ return String(s).replace(/[&<>"']/g, c =>
  ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
```
then use `esc(t(...))` at every interpolation site listed above. Leave the structural markup as-is.

### S7 — The schedule skill is outside the constitution: no `quality-rules.md`, no `client-notes.md`, no no-filesystem fallback, divergent output path
**File:** `ac-wins-schedule/SKILL.md` (whole file; output path at `:54`), against `quality-rules.md:3`, `:23`, `:32`, `:36`
**Severity:** Medium

`quality-rules.md:3` states it "applies to every AC Wins delivery skill", yet:
- The schedule skill has no copy of it and never tells the model to read it (grep for `quality-rules` in the skill returns nothing).
- It never reads or writes `client-notes.md` (grep returns nothing) — so it is the only one of the five with no per-client memory. This compounds S3 directly: the mapping "for this client `N` = night shift" has nowhere to live, so the same code gets re-guessed every week.
- Its output path, `~/Documents/AC-Wins/clients/<client-slug>/schedule/<YYYY-MM-DD>/` (`:54`), inserts a `schedule/` level the constitution's convention (`quality-rules.md:23`) doesn't have, and the constitution's filename table (`:25–:30`) has no row for `schedule-brief.md` / `agenda.html`.
- It has no equivalent of `quality-rules.md:32` ("If no local filesystem is available (e.g. running on the web), produce the same deliverables as downloadable files in the conversation"). `SKILL.md:54` says "Save both to ~/Documents/…" unconditionally, so a web session has no defined behaviour at the delivery step.

**Why it matters:** Client quirks learned in a schedule run are lost, and quirks recorded by the other four skills are invisible to it. The path divergence scatters one client's files across two conventions. And the missing web fallback means the skill's last step is undefined in one of the environments AC actually works in.

**Fix:** Add `references/quality-rules.md` to the schedule skill (or point at the shared copy per X2) and add to `SKILL.md` after line 22: "**First: read `references/quality-rules.md` and obey it throughout.**" Add reading and appending `client-notes.md` to step 2, with shift-code mappings, staffing minimums, opening hours and travel-buffer preferences named as the things to record. Either adopt the constitution's path or add the `schedule/` variant and both filenames to the Rule 5 table so the two agree. Add the no-filesystem fallback to step 6.

### S8 — The recurring-run doc asserts fresh-session behaviour that the tool only provides under a parameter it never mentions
**File:** `ac-wins-schedule/references/recurring-setup.md:9` (tools named at `:7`)
**Severity:** Medium

> Each firing starts a **fresh session with no memory of this conversation**, so the scheduled prompt must be fully self-contained…

Line 7 correctly directs the model to `create_trigger` / `send_later` and correctly warns off local cron. But `create_trigger`'s **default** mode fires into the *calling* session and resumes that same conversation; a fresh session per firing requires `create_new_session_on_fire: true`, which appears nowhere in the file. `send_later` is self-bind by definition. So a trigger created by following this doc will most likely do the opposite of what the doc states.

**Why it matters:** Every Monday 07:30 firing lands back in one ageing conversation, which will drift, accumulate context from unrelated work, or be gone. The client's schedule refresh then either silently degrades or stops — and this is a service AC would have told the client is running. Completion notifications, which the tool only supports for fresh-session triggers, are unavailable too.

**Fix:** Amend line 9: "Create the trigger with **`create_new_session_on_fire: true`** — this is what makes each firing a fresh session with no memory of this conversation, and it is not the default. (`send_later` and a default `create_trigger` both fire back into the *current* session, which will not survive as a weekly client service.) Because each run starts from nothing, the prompt must be fully self-contained: name the client, say where the sources live, and spell out the window and the deliverable."

### S9 — The template's sample attention list is ordered against the documented order
**File:** `ac-wins-schedule/assets/agenda-template.html:128–135`, against `SKILL.md:50` and `references/conflict-checks.md:9–13`
**Severity:** Low

`SKILL.md:50`: "Order them **overdue/today first, then clashes, then staffing, then unconfirmed.**" `conflict-checks.md:9–13` gives the same five-step order.

The sample data runs: overdue (`:128`) → **staffing** (`:130`) → **clash** (`:132`) → unconfirmed (`:134`). Staffing and clashes are swapped.

**Why it matters:** Sample content in a template is the pattern the model imitates when it fills the file — this is how a documented rule quietly stops being followed. Low impact on its own, but it's the template teaching the wrong behaviour.

**Fix:** Swap the two objects at `:130` and `:132` so the sample matches the documented order, and add a comment above the `attention` array: `/* order: overdue → due today → clashes → staffing → unconfirmed (see conflict-checks.md) */`.

### S10 — The data model defines four statuses; the template renders one
**File:** `ac-wins-schedule/assets/agenda-template.html:210`, against `references/schedule-model.md:18` and `:26`
**Severity:** Low

`schedule-model.md:18` defines `status` as `upcoming | today | overdue | done`, and `:26` explains how each is derived. The template's item renderer handles only one:
```js
const cls = "item "+(it.layer||"")+((it.status==="overdue")?" overdue":"");
```
A `done` item renders identically to an outstanding one. The template's fill-in comment (`:116`) even reduces the field to "status: add 'overdue' to an item to tint it red", so three of the four defined values have no effect on the deliverable.

**Why it matters:** The client's copy gives no way to tell a completed job from an open one, so the agenda reads as a longer to-do list than it is — mild, but it works against "lead with the exceptions" (`SKILL.md:50`, `:84`).

**Fix:** Add `.item.done{opacity:.55;text-decoration:line-through}` to the stylesheet near `:52`, extend the class expression to `(it.status?" "+it.status:"")`, and update the comment at `:116` to list all four values and what each does.

---

## Verified clean

Stated so the absence of a finding is not mistaken for an oversight:

- **Arithmetic.** The only computable figures in the five skills are the count-back example at `ac-wins-invoices/SKILL.md:20` (12 + 2 = 14 ✓) and the quote formula chain at `ac-wins-quotes/SKILL.md:35` (line total = qty × unit price; Σ lines = subtotal; subtotal ± discounts/taxes = grand total — internally consistent ✓). There is no wage table, rate table or worked ROI example in any of the five, so the assessment skill's arithmetic-defect class has no surface here.
- **Chinese punctuation.** Every 繁體中文 string in `agenda-template.html` uses full-width punctuation correctly (`：（），。` at `:129`, `:131`, `:133`, `:178`), with half-width colons retained only inside clock times, which is right. Phrasing reads as natively written Cantonese business Chinese ("恐人手不足", "需調動其一", "供東主審閱之草稿"), not translation. The `LABELS` block (`:170–179`) is fully populated in both languages. The defects in this area are structural (S5) and roster-semantic (S3), not linguistic.
- **No external transmission** in comms, excel, invoices or quotes. Rule 4 is stated in all four and reinforced in each Common-mistakes table. The schedule skill is the sole exception, and that is S1.
- **No source-file overwrites.** Rule 3 plus `ac-wins-excel/SKILL.md:20` and `:51` cover this properly; the copy-first instruction is unambiguous.
- **No invented prices or unbacked promises.** `ac-wins-quotes/SKILL.md:29` and `:45`, `ac-wins-comms/SKILL.md:30` and `:47`, `ac-wins-invoices/SKILL.md:34` and `:52` all handle this well. Nothing in the five skills promises an outcome the business can't deliver.
- **Reference-file integrity.** Every `references/…` and `assets/…` path cited in any SKILL.md resolves to a file that exists. The only dangling pointer is the prose one in S2.

---

## Suggested order of work

1. **S1** (schedule `:63`/`:77`) — client data leaving the machine; one-line deletion, do it first.
2. **E1** (excel `:28`) — silent date corruption in the deliverable.
3. **S3** (template `:244`) — roster codes; breaks the skill's core promise in both directions.
4. **I1** (invoices `:30`/`:40`) — schema rework; largest edit, but the flagship automation depends on it.
5. **X1 / Q1** (quotes `:29`, `:25`) — stall behaviour and issuer details; both cheap, both fire on the first real quote.
6. Everything else, in severity order within each skill.
