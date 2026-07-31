# Open questions

Unknowns that block a decision. Each carries what would settle it.
Resolved items move to `decisions.md` or `lessons.md` with the answer and the date.
Tags: `[AC]` he raised it · `[obs]` from an artifact · `[claude]` I raised it, not validated.

---

## Needs AC's ruling — nothing moves until he decides

### The entry price and the flagship are one problem, not two `[claude]` · 2026-07-31

Market research (see caveat below) found the observed HK SME range for productized monthly
AI services runs HK$488–8,000/month, and custom builds start at HK$30,000 one-off.

- **HK$6,000 Quick Win looks badly under-priced** — comparable custom builds start 5–6x
  higher. The damage isn't the lost fee, it's the anchor: a client taught a whole workflow
  costs HK$6,000 will never pay HK$15–20K/month.
- **HK$15–20K flagship sits legitimately at the top of the observed band**, but a competitor
  (mirrorma) publishes what reads as a similar offer at HK$8,000/month, and AC's own ROI
  model justifies only HK$2,000–6,000/month of value.
- **Proposed bridge: price the flagship as "one clerk avoided."** HK admin salary benchmarks
  put a clerk at ~HK$16,000–19,000/month before MPF and turnover cost. That reframe moves
  the justification from hours-saved to headcount-avoided without changing the price.

**Settled by:** AC deciding (a) whether the Quick Win moves up, and (b) whether
`roi-assumptions.md` gets the headcount-avoided conversion path alongside hours-saved.

**Research caveat `[obs]`:** the agent's egress was blocked, so competitor figures come from
search-index extraction, not direct page reads. Three numbers are load-bearing and should be
spot-checked before AC quotes anyone against them: mirrorma HK$8,000/mo, Frasertec
HK$30–50K, OperativeAI HK$2,088/mo.

### The guarantee has no cap, no baseline and no window `[claude]` · raised 2026-07-31

"First automation saves measurable time, or the client doesn't pay." Research found **no HK
SME competitor offers money-back on delivered work** — they de-risk with 7–14 day free
trials, which costs them nothing.

**Proposed scope:** one named workflow, a client-signed baseline captured before build, a
defined measurement window, a data-quality condition, and a remedy capped at the Quick Win
fee — never retainer months.

**Settled by:** AC ruling before the first higher-tier proposal goes out. Not after.

### Cold email: channel problem or copy problem? `[AC]` data · unresolved since 2026-07-31

Still blocked on four numbers AC has not supplied: batch size, list source, sequence length,
follow-up count. Zero replies from 20 sends with no follow-up is noise; zero from 300 with a
4-step sequence is a verdict. **No channel decision should be made until these exist.**

### Is Lofty the right first case study at all? `[claude]` · raised 2026-07-31

Research flagged a problem bigger than the father-company credibility issue: a four-page
brochure site is **web design, not AI enablement**. Publishing it as flagship proof of the
AC Wins offer demonstrates a category where AC has no edge.

**Proposed alternative:** build the enquiry-handling automation at Lofty first, make *that*
the case study, and keep the website as context.

**Settled by:** AC deciding what the case study is actually proving. See `pipeline.md` for
the baseline metrics that decay while this is undecided.

---

## Assessment skill — remaining defects

The TVP defect is fixed (see `decisions.md`). These three are still open. All are in the
spec and the build identically — spec bugs faithfully implemented.

### Admin wage ceiling breaks the rounding rule `[obs]`

Formula is `salary × 1.3 ÷ 176`. HK$16,000 → 118.18. The admin row shows **120** (rounded
up); every other cell rounds down. The same HK$16,000 produces 120 in the admin row and 115
in the sales row. Fix offered 2026-07-31, not actioned — AC has not ruled.

`[claude]` The TVP research flagged these wage benchmarks as seeded defaults of the same
vintage as the rotted TVP line. **They have never been verified against current HK salary
data** and carry identical staleness risk. Independent job-board figures found during pricing
research (~HK$15,900–19,000/month for an admin clerk) sit *above* the table's HK$13,000–16,000
assumption, which means the ROI may be understating savings.

### Single-survivor case underspecified `[obs]`

`SKILL.md:46` says name a runner-up "if a second survivor exists". `scoring-rubric.md:50` and
`report-template-en.md:19` both assume one always exists.

### Report references an instruction never collected `[obs]`

`report-template-en.md:42` sets the AC Wins fee "per the user's instruction", but no step in
the playbook ever asks which. Suggested default: "quoted separately."

---

## The other five skills — 27 defects found 2026-07-31 `[obs]`

Full findings: `docs/ac-wins-skill-audit.md`. None of the five is clean.
comms 2 · excel 6 · invoices 4 · quotes 3 · schedule 10 · cross-cutting 2.

**Three are client-safety issues and should be fixed before any of these touch a real client:**

1. **`ac-wins-schedule/SKILL.md:63` vs `:77` — contradictory data-handling rules.** One line
   says persist as an artifact, the other says send nothing anywhere. Behaviour depends on
   read order. Payload is named staff, leave and rest days, client site visits, rent and
   payroll dates. An automated weekly run would publish client rosters on a schedule.
2. **`ac-wins-excel/SKILL.md:28` — silent date corruption.** Date standardization sits under
   "fix what has one correct answer", so ambiguous dates get rewritten without asking.
   `03/04/2026` has two correct readings (HK DD/MM vs en-US MM/DD). The cleaned file looks
   immaculate afterwards — undetectable by the client, and it lands in the deliverable AC
   hands over as proof.
3. **`ac-wins-schedule/assets/agenda-template.html:244` — roster codes hard-coded against the
   skill's own guidance.** Treats `N` and blank as rest day; `schedule-model.md:39` warns not
   to assume code meanings (`N` is night shift in security, logistics, F&B) and `:42` says a
   blank is a possible coverage gap to flag, not fill. Breaks the coverage-gap check in both
   directions, at render time, so nothing reaches the attention list.

**Settled by:** AC approving the fixes. Not yet actioned.

---

## Watch list — no decision needed yet, but don't be surprised

### Enhanced DTSPP and the Solution List `[obs]` · 2026-07-31

HK$300m allocated in the 2026-27 Budget for SME adoption of off-the-shelf AI and
cybersecurity solutions, targeted H2 2026, terms still being set at LegCo. The **previous**
DTSPP round funded only pre-assessed solutions on an official Solution List, bought from
listed providers — a bespoke consultant could not be paid from it.

`[claude]` If that design carries over, the only shape of AC Wins work that can be funded is
a **productised, fixed-scope offer on the list**. That is a strategic reason to productise
the Quick Win independent of funding. Watch legco.gov.hk ITB Panel papers and
digitalpolicy.gov.hk for launch terms.

### Name collision — `loftygroup.hk` `[obs]` · 2026-07-31

A separate HK company with a similar name is currently outranking `lofty.com.hk`, sells AI
chatbots and IT outsourcing to the same SMEs, and runs an active Chinese-language blog.
Relevant to both the case study and AC's own SEO.

### Lofty incorporation date discrepancy `[obs]` · 2026-07-31

The site claims founded 1995 / 25+ years; the HK registry lists Lofty (HK) Technology Limited
as incorporated 17-MAR-2015. Probably a restructure. **Reconcile before publishing a case
study whose entire premise is honest numbers.**
