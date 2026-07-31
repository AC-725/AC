# Decisions

What was decided, when, why, and what would reverse it. Newest first.
Tags: `[AC]` he decided · `[obs]` observed from an artifact · `[claude]` my inference, not validated.

---

## 2026-07-31 · TVP retired from all client-facing wording

`[obs]` **The Technology Voucher Programme closed to new applications after 31 December
2024 and has not reopened.** Verified directly against the ITC cessation announcement
(info.gov.hk, 13 Dec 2024) and the government SME portal, which now titles the page
"Technology Voucher Programme (Ceased)". Corroborated independently by a second research
pass. Historical parameters, for reference only: 3:1 ratio, HK$600,000 cumulative cap,
average approved grant ~HK$175,800.

The assessment skill had been putting "may be eligible for government co-funding such as
the Technology Voucher Programme" in **every** client report by default — for nineteen
months after the scheme closed.

**Fixed 2026-07-31** across four files: `roi-assumptions.md`, `SKILL.md`,
`report-template-en.md`, `report-template-zh.md`. New wording names the closure, points at
the enhanced DTSPP (H2 2026, terms unpublished) and BUD Fund, states that savings assume no
subsidy, and builds in a compliance firewall. A **last-verified date and quarterly
re-verify trigger** now sits on the section.

`[obs]` Compliance context that drove the firewall wording: on 2026-01-30 the ICAC reported
Operation Thunder — 33 people, HK$150m+ in technology-subsidy fraud, **including four
proprietors of IT services suppliers**, AC's own vendor category. Standing rules recorded
in `roi-assumptions.md`: never run a client's funding application, never source the
competing quotations, never make funding a selling point, refer in writing.

**Reverses if:** a scheme AC names reopens or changes terms — which is exactly what the
re-verify date exists to catch.

## 2026-07-31 · All six `ac-wins-*` skills are now version-controlled

`[obs]` Copied into `skills/` in this repo. Previously they existed only in
`~/.claude/skills/`, which is wiped between remote sessions.

Forced by the TVP fix: a correction that doesn't survive the session isn't a correction.
This closes the open question raised earlier the same day.

## 2026-07-31 · Business context lives in the repo

`[obs]` `IDENTITY.md`, `SOUL.md`, `USER.md` moved into `context/` and imported from a new
root `CLAUDE.md`. Before this they sat outside the repo and no session loaded them.

**Reverses if:** the files get big enough that loading all three every session costs more
than it returns — then split by task instead.

## 2026-07-18 · Assessment skill: scope and rules

Source: `docs/ac-wins-assessment-design.md`.

- `[AC]` First skill to build is the Automation Opportunity Assessment, not proposals or outreach.
- `[AC]` The 2-week pilot test is a **hard gate**, not a scoring factor. Feasibility never trades against impact.
- `[AC]` Survivors scored on Hours saved · Error/risk cut · Change-readiness, equal weights, tie-break on hours.
- `[AC]` Client report is **always bilingual** (EN + 繁體中文) regardless of the client's own language.
- `[AC]` ROI is conservative ranges only — benefits round down, costs round up, every figure carries a stated assumption.
- `[AC]` Single playbook skill + editable reference files. No scripts, no multi-skill suite (YAGNI).
- `[AC]` Gated-out candidates go to a Phase 2+ list, never silently dropped — that list is the expansion pipeline.

**Reverses if:** assessment volume grows enough to justify helper scripts or a client
database, both explicitly deferred in the design doc.

## 2026-07-16 · Positioning

`[AC]` **"The AI translator for old-school Hong Kong business."** Came out of AC's own
Ikigai work, not a branding exercise. The edge is specifically firms with no in-house
IT/AI knowledge — trilingual delivery (EN / Cantonese / Mandarin) is the moat.

**Reverses if:** the first paying clients turn out to come from a different segment than
the old-school SME target.

## 2026-07-16 · Pricing ladder

`[AC]` AI Quick Win from **HK$6,000** one-off → Enablement Partner **HK$15–20K/month**
(stated as the flagship tier) → Transformation **HK$50–60K/month**.

`[claude]` **Unvalidated concern, 2026-07-31:** the assessment skill's ROI model
monetizes hours saved only, which tops out well below the flagship tier for typical admin
workflows. See `open-questions.md`. No decision taken.

## 2026-07-16 · The guarantee

`[AC]` "First automation saves measurable time, or the client doesn't pay."

`[claude]` Scope above the Quick Win tier is undefined — see `open-questions.md`.

## 2026-07-16 · Delivery model

`[AC]` Find the one workflow worth automating, build it, prove the time/money saved, then
earn the right to do the next one. No six-figure overhauls, no jargon.
Process: **Listen → Pinpoint → Build → Prove & grow.**

## 2026-07-16 · Own framework

`[AC]` **"Where It Clicks"** — your goals × AI's power × your people × my translation =
results. Grew out of the Ikigai work.
