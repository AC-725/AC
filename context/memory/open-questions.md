# Open questions

Unknowns that block a decision. Each carries what would settle it.
Resolved items move to `decisions.md` or `lessons.md` with the answer and the date.
Tags: `[AC]` he raised it · `[obs]` from an artifact · `[claude]` I raised it, not validated.

---

## Strategy

### Does the ROI model support the flagship tier? `[claude]` · raised 2026-07-31

The assessment skill monetizes **hours saved only**. A typical admin workflow (6–12
hrs/week at HK$95–120 fully loaded) yields HK$2,000–6,000/month after the mandatory
round-down. The Enablement Partner tier asks HK$15–20K/month. Even the model's absolute
ceiling — owner time, 15–20 hrs/week at HK$180–290/hr — reaches only ~HK$11,000–24,000.

The rubric scores **Error/risk cut** 1–5 and then converts none of it to money, so the
figure the client anchors on excludes exactly the value that would justify a five-figure
retainer.

**Settled by:** deciding whether `roi-assumptions.md` gets a second conversion path
(error rate × cost per error, or deals lost × margin), or whether the flagship is sold on
a different basis entirely. AC has not ruled.

### What is the guarantee's scope above the Quick Win? `[claude]` · raised 2026-07-31

"First automation saves measurable time, or the client doesn't pay" is well-matched to a
HK$6,000 one-off. Carried unqualified into a HK$20K/month engagement it is open-ended
exposure.

**Settled by:** AC stating whether the guarantee attaches to the pilot only. Needs to be
answered before the first higher-tier proposal goes out, not after.

### Cold email: channel problem or copy problem? `[AC]` data, `[claude]` framing · raised 2026-07-31

Zero responses, but batch size, list source, sequence length and follow-up count are all
unrecorded.

**Settled by:** AC supplying those four numbers. Until then the zero is uninterpretable
and no channel decision should be made on it.

---

## Assessment skill defects

Found 2026-07-31 auditing the built skill against `docs/ac-wins-assessment-design.md`.
All three are in the spec and the build identically — spec bugs faithfully implemented.

### Admin wage ceiling breaks the rounding rule `[obs]`

Formula is `salary × 1.3 ÷ 176`. HK$16,000 → 118.18. The admin row shows **120** (rounded
up); every other cell in the table rounds down. The same HK$16,000 salary produces 120 in
the admin row and 115 in the sales row.

**Settled by:** changing 120 → 118 in `roi-assumptions.md`, or AC saying the round-up is
deliberate. Fix offered 2026-07-31, not yet actioned.

### Single-survivor case underspecified `[obs]`

`SKILL.md:46` says name a runner-up "if a second survivor exists". `scoring-rubric.md:50`
and `report-template-en.md:19` both assume one always exists. A client with one candidate
past the gate leaves an unfillable report section.

### Report references an instruction never collected `[obs]`

`report-template-en.md:42` sets the AC Wins fee "per the user's instruction", but no step
in the playbook ever asks which. Suggested default: "quoted separately."

---

## Operations

### Should the six `ac-wins-*` skills be version-controlled? `[obs]` · raised 2026-07-31

They exist only in `~/.claude/skills/`, wiped between remote sessions. `skills/ac-studio/`
is in the repo; these are not.

**Settled by:** AC deciding. Offer stands.
