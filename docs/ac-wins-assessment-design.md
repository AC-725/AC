# AC Wins Assessment Skill — Design

**Date:** 2026-07-18
**Status:** Built, tested (3 fictional-client runs passed), and spec-reviewed — installed at `~/.claude/skills/ac-wins-assessment/` on 2026-07-18
**Owner:** Austin Cheung (AC Wins, ac-wins.com)

## Goal

A personal Claude Code skill, `ac-wins-assessment`, that productizes AC Wins' core consulting judgment: given any information about a client or prospect, identify the single highest-impact workflow to automate, scope a 2-week pilot, and produce (a) a candid internal brief and (b) a polished bilingual client report with conservative, assumption-backed ROI ranges.

## Business context

AC Wins is an AI-implementation consultancy for Hong Kong SMBs running on manual processes, spreadsheets, and messaging apps. Positioning: honest assessment, no jargon, no hype; start with one workflow, prove results in ~2 weeks, then expand. Trilingual (EN / Cantonese / Mandarin). Mentions government co-funding (e.g., TVP) where relevant. Typical automations: document/quote/form processing, invoice and data extraction, Excel cleanup and reporting, WhatsApp/email responses, sales outreach and lead management.

## Decisions (locked during brainstorming)

| Topic | Decision |
|---|---|
| First skill to build | Automation Opportunity Assessment |
| Input | Any of: rough call notes (mixed EN/中文), full transcript, client questionnaire, or nothing written (conversational interview) |
| Output | Both an internal brief (English) and a client-facing report (always bilingual: English + 繁體中文) |
| Selection logic | 2-week feasibility is a **hard gate** (filter), not a scoring factor. Survivors scored on: Hours saved, Error/risk cut, Change-readiness |
| ROI style | Conservative ranges with every assumption stated. Round benefits down, costs up |
| Report language | Always bilingual (EN + 繁體中文), regardless of client language |
| Build approach | Single playbook skill + editable reference templates. No scripts, no multi-skill suite (YAGNI) |

## Skill anatomy

Location: `~/.claude/skills/ac-wins-assessment/` (user-level skill; available in every session, any directory).

```
~/.claude/skills/ac-wins-assessment/
├── SKILL.md                       # the playbook (process + rules)
└── references/
    ├── client-profile.md          # intake template: required + optional fields
    ├── scoring-rubric.md          # gate definition, 3-factor 1–5 scoring, tie-breakers
    ├── roi-assumptions.md         # HK wage benchmark table, formula, rounding rules
    ├── report-template-en.md      # client report skeleton (English)
    ├── report-template-zh.md      # client report skeleton (繁體中文)
    └── internal-brief-template.md # internal brief skeleton
```

Frontmatter description (triggering): "Use when assessing an AC Wins client or prospect for automation opportunities — after a discovery call, when given call notes, transcripts, or questionnaires, or when asked which workflow to automate first. Produces an internal brief plus a bilingual (EN + 繁體中文) client report."

## Playbook flow (SKILL.md)

```
Any input → Client Profile → Gap interview → Candidate workflows → 2-week GATE → Score → ROI → Two outputs
```

1. **Intake.** Digest whatever is provided into the Client Profile template. Handles mixed English/Chinese input.
2. **Gap interview.** Compare profile against required fields; ask the user only for what is missing, one question at a time. Required fields: business type and size, current manual workflows (who does them, time spent, tools used), pain points, staff tech-comfort, budget signals. If the user says "just proceed," missing items are marked `ASSUMED: <assumption>` in both outputs rather than blocking.
3. **Candidate workflows.** List every automatable workflow found in the input.
4. **Gate.** Discard any candidate not provable within a 2-week pilot using tools the client already has (WhatsApp, Excel, email, existing SaaS). Gated-out candidates are retained in a "Phase 2+" list (expansion pipeline), never silently dropped.
5. **Score.** Each survivor scored 1–5 on: Hours saved, Error/risk cut, Change-readiness. Equal weights. Tie-breaker: higher Hours saved wins. Winner and runner-up named explicitly.
6. **ROI.** Per `roi-assumptions.md`: weekly-hours-saved range × wage benchmark → monthly HK$ range. Benefits rounded down, costs rounded up. Tool cost stated at the honest US$20–200/month tier. Co-funding rule: the client report includes a TVP note by default — worded as "may be eligible; eligibility to be verified" — omitted only when the client is not a Hong Kong-registered business.
7. **Outputs.** Write to `~/Documents/AC-Wins/clients/<client-slug>/<YYYY-MM-DD>/` (slug = lowercase hyphenated client name, e.g. `wing-hing-trading`):
   - `internal-brief.md` (English)
   - `client-report-en.md` and `client-report-zh.md`
   Then offer to render the client report to Word via the docx skill (optional; markdown stands alone if that skill is unavailable). If no client name is known, ask before saving.

## Reference file contents

**client-profile.md** — the intake template listing required fields (above) plus optional fields: client's preferred language, industry specifics, headcount by role, current software, decision-maker profile, urgency, competitor pressure. (Language is optional because reports are always bilingual; it only informs how the user talks to the client.)

**scoring-rubric.md** — defines the gate test ("Can we demonstrate measurable results within 2 weeks using tools the client already has? Yes/No"), anchors for each 1–5 score on the three factors (e.g., Hours saved: 1 = <2 hrs/week … 5 = >15 hrs/week), equal weighting, and the Hours-saved tie-breaker. Weights and anchors are plain text the owner can edit as his judgment evolves.

**roi-assumptions.md** — formula: `monthly saving range = weekly hours range × 4.2 × fully-loaded hourly rate`. Fully-loaded rate = monthly salary × 1.3 ÷ 176. Seeded default benchmarks (owner-editable):

| Role | Assumed monthly salary (HK$) | Fully-loaded HK$/hour |
|---|---|---|
| Admin / clerical | 13,000–16,000 | 95–120 |
| Sales / customer service | 16,000–22,000 | 115–160 |
| Manager / owner time | 25,000–40,000 | 180–290 |

Rounding rules: benefit ranges round down to nearest HK$500; costs round up. Every figure in a report must be traceable to a stated assumption.

**report-template-en.md / report-template-zh.md** — mirrored skeletons: client's situation in one paragraph; the one recommended workflow; before/after picture; ROI range with assumptions listed beneath; 2-week pilot plan (week 1 build, week 2 measure, one named success metric); tool cost; co-funding note; next step (book the pilot). Voice rules embedded as template comments: short sentences, no jargon, no hype, numbers always with assumptions. 繁體中文 version written natively, not translated word-for-word.

**internal-brief-template.md** — scoring table for all candidates; risks and red flags; likely objections and responses; pricing thoughts; Phase 2+ pipeline; `ASSUMED` items needing verification on the next call.

## Edge cases

- **Notes contradict transcript:** user-authored notes win; the conflict is flagged in the internal brief.
- **Thin input + "just go":** proceed with `ASSUMED` markers; never block.
- **No client name:** ask before saving files.
- **Privacy:** client data stays local; the skill sends nothing anywhere.

## Verification plan (superpowers protocol)

Built under the superpowers workflow: this spec → writing-plans → test-driven build → requesting-code-review. Skill testing per `testing-skills-with-subagents`: run the skill against three fictional clients before live use —

1. Trading company drowning in manual invoice entry (rich transcript input).
2. Clinic with WhatsApp booking chaos (rough mixed-language notes).
3. Thin "from memory" case (forces the gap-interview path).

Pass criteria per run: bilingual client report produced; every figure has stated assumptions; exactly one winner named; 2-week gate visibly enforced (Phase 2+ list present when applicable); voice rules followed (spot-check: no jargon, ranges not single figures). Fix and re-run until all pass; then code review.

## Out of scope (deliberately)

- Helper scripts, auto-ROI calculators, branded .docx generation pipelines, client-tracking databases (revisit if assessment volume grows).
- Separate intake/assess/report skills.
- Proposal/pricing generation, outreach drafting, delivery automation — candidate future skills, each through its own spec → plan → build cycle.
