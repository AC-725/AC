# TVP claim verification — AC Wins client reports

Research date: **2026-07-31**
Subject: the co-funding line at `/root/.claude/skills/ac-wins-assessment/references/roi-assumptions.md` line 36.

---

## HEADLINE VERDICT

**The current default wording is NOT safe to keep using. Retire it today.**

The Technology Voucher Programme **stopped accepting applications after 31 December 2024**. It has not
reopened. Telling a prospect in 2026 that they "may be eligible for government co-funding such as the
Technology Voucher Programme" points them at a scheme that has been closed to new applicants for
nineteen months. That is not a hedge problem — "eligibility to be verified" does not save a claim about
a programme that no longer takes applications. It is a factual error, and it appears in *every* report.

Aggravating factor: TVP is currently the subject of an active ICAC fraud crackdown in which **proprietors
of IT services suppliers were among those arrested**. That is AC's own vendor category. A consultant
volunteering TVP in a sales document in 2026 reads as either out of date or, worse, familiar with a
scheme in the news for vendor-side fraud. Both are bad; the second is much worse.

---

## METHOD AND LIMITATIONS — read this before trusting any figure below

Direct page fetching was **blocked in this session**. `WebFetch` returned HTTP 403 for every URL tried
(including non-government sites such as Wikipedia), and outbound `curl` was refused at the egress proxy
(`connect_rejected`, gateway 403) for every host tested. So I could not open and read a single primary
PDF or web page end to end.

What I could do: run domain-restricted web searches limited to `info.gov.hk`, `itf.gov.hk`, `itc.gov.hk`,
`itib.gov.hk`, `cedb.gov.hk`, `tid.gov.hk`, `digitalpolicy.gov.hk`, `smelink.gov.hk`, `budget.gov.hk`,
`legco.gov.hk` and `aud.gov.hk`. The content below is drawn from indexed text of those primary pages.
That is **stronger than a blog post but weaker than a read of the source document**.

Confidence is graded per item:

- **[VERIFIED]** — stated consistently across two or more independent primary government pages.
- **[SINGLE SOURCE]** — one primary page only; directionally reliable, exact figure not double-checked.
- **[NOT VERIFIED]** — I could not confirm this. Not asserted as fact anywhere below.

Anything material that a client might rely on should be confirmed against the administering body's own
current guidance notes before it goes into a document with AC's name on it.

---

## 1. Is TVP still running? — NO

**[VERIFIED]** The Innovation and Technology Commission announced on **13 December 2024** that TVP
would **cease accepting applications after 31 December 2024**.

- EN press release: https://www.info.gov.hk/gia/general/202412/13/P2024121300384.htm
- TC press release: https://www.info.gov.hk/gia/general/202412/13/P2024121300383.htm
- news.gov.hk write-up: https://www.news.gov.hk/eng/2024/12/20241213/20241213_160427_433.html
- Government's own SME portal now lists it as **"Technology Voucher Programme (Ceased)"**:
  https://www.smelink.gov.hk/en/web/sme-portal/w/technology-voucher-programme.html

Stated reason: the Government considered TVP had "achieved its original intent", noted that bureaux had
since introduced more targeted industry-specific schemes, and cited making good use of public finances
and the overall sustainability of the Innovation and Technology Fund.

**[VERIFIED]** Still closed as of 2026. Two later LegCo answers discuss TVP wholly in the past tense
with no reopening:

- LCQ22, 25 June 2025: https://www.info.gov.hk/gia/general/202506/25/P2025062500299.htm
- LCQ2, 25 February 2026 (digital transformation of SMEs):
  https://www.info.gov.hk/gia/general/202602/25/P2026022500282.htm

**Projects already approved** before the cutoff continue through their approved project periods and
claim against their approved amounts. Only *new* applications are barred. So a client who was approved
in or before 2024 may still have a live TVP project — a different situation from a new prospect.

---

## 2. Funding ratio and ceiling — historical, not currently obtainable

These are the parameters TVP operated under at closure. They are **history**, not an offer available to
any prospect AC meets today.

- **[VERIFIED]** Ratio **3:1** government to enterprise, i.e. funding of up to **75% of total approved
  project cost per application**.
  https://www.info.gov.hk/gia/general/202602/25/P2026022500282.htm
- **[VERIFIED]** Cumulative funding ceiling **HK$600,000 per enterprise/organisation**. Same source, and
  the ITF programme page https://www.itf.gov.hk/wcms/index.aspx?section=38&lang=1
- **[SINGLE SOURCE]** Up to **6 projects** per enterprise/organisation.
  https://www.itf.gov.hk/filemanager/publication/en/upload/1360/TVP_Guidance_Notes-e_September_2024.pdf

Scale at closure, useful context for how ordinary a TVP grant was:

- **[VERIFIED]** **38,440** applications approved, benefiting **35,805** enterprises/organisations,
  average approved funding approximately **HK$175,800** per application.
  https://www.info.gov.hk/gia/general/202602/25/P2026022500282.htm
- **[SINGLE SOURCE]** As at 30 November 2024, 37,059 applications approved totalling about HK$6.6 billion.
  https://www.info.gov.hk/gia/general/202412/13/P2024121300384.htm

Note the gap between the HK$600,000 ceiling and the HK$175,800 average. Anyone quoting "up to
HK$600,000" as the expected outcome was overselling by roughly 3.4x even when the scheme was open.

---

## 3. Eligibility criteria (as at closure) and common disqualifiers

**[VERIFIED / SINGLE SOURCE mix]** From the September 2024 TVP Guidance Notes
(https://www.itf.gov.hk/filemanager/publication/en/upload/1360/TVP_Guidance_Notes-e_September_2024.pdf)
and the ITF programme page (https://www.itf.gov.hk/wcms/index.aspx?section=38&lang=1):

- Registered in Hong Kong under the Business Registration Ordinance.
- **Not a listed company in Hong Kong.**
- **Not** a government-subvented organisation, nor a subsidiary of one.
- **Substantive business operation in Hong Kong**, and that operation must be **related to the project
  applied for** at the time of application.

What commonly disqualified a traditional SME — worth AC knowing regardless, because the same tests recur
in the live schemes below:

1. **Shell or dormant BR.** A business registration certificate alone is not enough. "Substantive
   business operation" is an assessed test — premises, staff, actual trading. Holding companies and
   dormant entities fail.
2. **Project unrelated to the operating business.** The relatedness requirement caught applicants whose
   BR scope did not match what they wanted to automate.
3. **Listed status / subvented status**, including subsidiaries of subvented bodies.
4. **Ceiling already consumed** by prior projects — many active SMEs had already used their HK$600,000.
5. **Retrospective spend.** **[SINGLE SOURCE]** Funding was not provided for expenditure incurred before
   project approval or outside the project period. An SME that had already bought and deployed the
   solution was ineligible for that spend. This is the single most common own-goal and it applies to
   essentially every HK scheme.
6. **Ineligible cost types.** **[SINGLE SOURCE]** Normal-business-operation equipment, maintenance,
   warranty and insurance, and generic items such as USB drives, anti-virus and office suites were not
   funded.

---

## 4. Was AI implementation / workflow automation / software consulting eligible? — partially, with a hard cap

This is the crux the task flagged, and the honest answer is: **it was eligible, but never as the whole
project, and AC's specific shape of work was the constrained half.**

- **[SINGLE SOURCE]** TVP's stated purpose was to support non-listed local enterprises adopting
  **technology services and solutions** to raise productivity or upgrade/transform business processes.
  Software, systems and technological services were within scope.
  https://www.info.gov.hk/gia/general/202602/25/P2026022500282.htm
- **[SINGLE SOURCE — IMPORTANT]** **Technology consultancy and solutions should constitute no more than
  50% of project cost**; above that, the TVP Committee had to be consulted on whether to approve.
  https://www.itf.gov.hk/filemanager/publication/en/upload/1360/TVP_Guidance_Notes-e_September_2024.pdf

I flag that 50% figure as **single source and not read in full context** — I could not open the PDF to
confirm whether it applied to consultancy alone or to a combined consultancy-plus-solution line. Do not
put that number in a client document without reading the guidance notes directly.

The structural point survives the uncertainty and matters more than the exact percentage: **TVP was
designed to fund the adoption of a technology solution, with consultancy as a supporting component — not
to fund advisory engagements.** AC Wins sells diagnosis, translation and bespoke build. That is the
consultancy-weighted end. A pure "AI Quick Win" advisory engagement with no substantial deployed
technology component would have sat awkwardly against this rule even when TVP was open.

So the original claim was doubly weak: it named a closed programme, **and** it implied a fit with AC's
service shape that was never clean.

---

## 5. Application process and realistic timeline

**[NOT VERIFIED]** I could not confirm the historical submission-to-approval timeline from a primary
source in this session. Commonly repeated figures exist in consultancy marketing but the task explicitly
rules those out as a sole source, and I am not going to launder one into a fact.

Since TVP is closed to new applications, this is moot for new prospects. **For the live schemes below the
timeline is genuinely unknown to me and must not be estimated in a client report.**

What I can state:

- **[SINGLE SOURCE]** TVP was administered with HKPC as the TVP Secretariat.
  https://www.info.gov.hk/gia/general/202601/30/P2026013000349p.htm
- **[SINGLE SOURCE]** Applicants had to obtain **written quotations from at least two suppliers** for
  procurement with aggregate value not exceeding HK$50,000, and bidders signed a Probity and
  Non-Collusive Quotation/Tendering Certificate. Procurement via the electronic procurement platform was
  exempt from the minimum-quotation requirement.
  https://www.itf.gov.hk/filemanager/publication/en/upload/1360/TVP_Guidance_Notes-e_September_2024.pdf

---

## 6. What AC should actually be naming instead

### 6a. Enhanced Digital Transformation Support Pilot Programme — the one that matters

**This is the right scheme for AC to be tracking, and it is not open yet.**

- **[VERIFIED]** The 2026-27 Budget allocates an additional **HK$300 million** to enhance the DTSPP,
  specifically to encourage SMEs to adopt **AI and cybersecurity** digital solutions.
  https://www.budget.gov.hk/2026/eng/budget07.html
  https://www.info.gov.hk/gia/general/202607/08/P2026070800534.htm
- **[VERIFIED]** Target is to **roll out in the second half of 2026**, following consultation with the
  Legislative Council. LegCo ITB Panel discussion paper dated 8 June 2026:
  https://www.legco.gov.hk/yr2026/english/panels/itb/papers/itb20260608cb2-730-2-e.pdf
- **[NOT VERIFIED]** Whether it has actually opened for applications as at 31 July 2026. Evidence says
  "target H2 2026", which is a plan, not a live scheme. **Do not tell a client it is open.**
- **[NOT VERIFIED]** Its funding ratio, ceiling, eligible sectors and solution-listing rules. The
  enhancement details were still being settled at the June 2026 LegCo discussion.

The **original** DTSPP parameters, as a guide to what the enhanced round will probably look like:

- **[VERIFIED]** HK$500 million, launched early 2024, funding on a **1:1 matching basis** with a subsidy
  ceiling of **HK$50,000** per eligible applicant.
  https://www.smelink.gov.hk/en/web/sme-portal/w/digital-transformation-support-pilot-programme.html
- **[VERIFIED]** Approved for **8,799 SMEs** — retail 55%, F&B 34%, personal services 11%, plus tourism.
  https://www.budget.gov.hk/2026/eng/budget07.html
- **[SINGLE SOURCE]** Restricted to **F&B, retail, tourism and personal services**; registered in HK
  under the Business Registration Ordinance with **substantive business operation in Hong Kong**;
  **fewer than 50 full-time employees**; not listed companies, statutory bodies, or NGOs subvented by
  public funding.
- **[SINGLE SOURCE — CRITICAL FOR AC]** Funding applies only to **pre-assessed, off-the-shelf solutions
  on an official Solution List**. The SME picks from the list and approaches that solution provider
  directly. Categories were digital payment/shopfront sales, online promotion, and customer management.

**Read that last point carefully.** DTSPP does not fund a consultant's bespoke engagement. It funds the
purchase of a listed product from a listed provider. If AC wants his work paid from this scheme, the
route is **getting an AC Wins productised solution onto the Solution List when the enhanced round opens**
— not writing "you may be eligible" in a report and hoping.

### 6b. BUD Fund — live, but narrower than it looks

- **[VERIFIED]** Live and administered by TID/HKPC.
  https://www.tid.gov.hk/en/our_work/support_for_trade_industry/bud.html
- **[VERIFIED]** For **non-listed Hong Kong enterprises** developing business **in the Chinese Mainland
  and other FTA/IPPA target markets**. https://www.info.gov.hk/gia/general/202602/25/P2026022500282.htm
- **[VERIFIED]** Cumulative funding ceiling **HK$7 million per enterprise**; **HK$800,000** per general
  application. https://www.cedb.gov.hk/en/legco-business/questions/2026/pr01042026b.html
- **[VERIFIED — DO NOT QUOTE THE OLD RATIO]** The funding ratio was **cut in March 2025 from 1:1 (50%
  government) to 1:3 (25% government)**. Anyone still quoting "BUD covers 50%" is out of date by more
  than a year. https://www.info.gov.hk/gia/general/202503/13/P2025031300415.htm
  https://www.info.gov.hk/gia/general/202510/15/P2025101500372.htm
- **[VERIFIED]** Enhancements effective **15 June 2026**: geographical scope expanded to add Saudi
  Arabia, Bangladesh, Egypt, Hungary, Pakistan, Kazakhstan, Mongolia and Brazil; **"Easy BUD" ceiling
  raised 50% from HK$100,000 to HK$150,000**; and **more targeted funding support for BUD projects
  involving AI elements**. https://www.info.gov.hk/gia/general/202604/01/P2026040100529.htm
  https://www.info.gov.hk/gia/general/202607/08/P2026070800534.htm
- **[NOT VERIFIED]** The precise mechanics of the AI-element support — whether a higher ratio, a separate
  ceiling, or priority assessment. Confirm before mentioning specifics.

**The catch:** BUD is a *market development* fund. The project must serve the client's business
development in the Mainland or a listed FTA/IPPA market. A Hong Kong trading firm automating its
back-office quotation process for purely domestic reasons is a poor fit. A client expanding into the
Mainland where AI-assisted operations support that expansion is a good fit. AC should only raise BUD with
clients who genuinely have that outbound dimension — which, given his ICP of trading firms and
import/export SMEs, will be a real subset.

### 6c. AI Subsidy Scheme — live, but almost certainly not for AC's clients

- **[VERIFIED]** HK$3 billion, three-year scheme, administered via Cyberport, launched 7 October 2024.
  https://www.info.gov.hk/gia/general/202410/07/P2024100700266.htm
  https://www.digitalpolicy.gov.hk/en/our_work/digital_infrastructure/industry_development/ai_subsidy_scheme/
- **[SINGLE SOURCE]** Subsidises up to **70% of the service list price of Cyberport's AI Supercomputing
  Centre**. Eligible parties include R&D centres, AI start-ups and SMEs **incorporated within the last
  seven years** with fewer than 250 employees **engaged in AI Projects**, and strategic enterprises in
  designated I&T fields.

**This is subsidised compute, not subsidised adoption.** It pays for AI Supercomputing Centre time for
organisations *building* AI. A 40-year-old family trading company adopting a workflow automation is not
the target and the seven-year incorporation test alone will exclude most of AC's ICP. **AC should not
name this to traditional SME clients.** It would signal he has not read the eligibility.

### 6d. Non-funding support worth naming instead

**[VERIFIED]** For clients who will not qualify for cash, these are real, free and currently active —
and pointing a prospect at them costs AC nothing and builds credibility:

- The **"four-in-one" SME centres**: SUCCESS (Trade and Industry Department), the HKTDC SME Centre,
  SME One (HKPC) and TecONE (HKSTP), offering integrated consultation and referral.
  https://www.info.gov.hk/gia/general/202607/08/P2026070800534.htm
- **HKTDC Digital Academy** — online courses covering AI applications; in 2026-27 adding practical
  courses and thematic seminars with AI experts. Same source.
- **AIRDI** (Hong Kong AI Research and Development Institute) — mandated to make practical AI solutions
  more accessible to SMEs and to provide security assessments and consulting for AI applications. Same
  source.
- **SME Link** government portal, which maintains current status for every scheme:
  https://www.smelink.gov.hk/en/web/sme-portal/home.html

---

## 7. Can a consultant/vendor be paid from these funds? Vendor registration and restrictions

**Under TVP (historical):** yes — vendors were paid as suppliers of technology services and solutions,
and there was **no closed vendor registration list**. But three constraints applied:

- **[SINGLE SOURCE]** Multi-quotation requirement — at least two written quotations for procurement up to
  HK$50,000 aggregate, obtained **by the applicant itself**, not by its agent or sub-contractor. That
  wording explicitly blocks the vendor from running the client's procurement.
- **[SINGLE SOURCE]** A signed Probity and Non-Collusive Quotation/Tendering Certificate from each bidder.
- **[SINGLE SOURCE]** The consultancy proportion cap discussed in section 4.

**Under DTSPP (the live/returning model):** **[SINGLE SOURCE]** effectively **yes but only via listing**.
Funding attaches to pre-assessed solutions on the official Solution List, and the SME approaches the
listed solution provider directly. An unlisted consultant cannot be paid from it.

### The compliance flag AC needs to hear

**[VERIFIED]** On **30 January 2026** the ITC joined an ICAC press briefing on enforcement against fraud
involving government technology funding. ICAC's **Operation Thunder** netted **33 people from two
corruption syndicates** over more than **HK$150 million** in government technology subsidies fraud;
**24 were arrested in the operation reported by ITC, including four proprietors of IT services
suppliers**, a bank manager, an insurance agent, an accounting manager and shell company owners. The
syndicate allegedly bribed a then-Cyberport employee to circumvent regulatory checks and expedite
approvals.

- https://www.info.gov.hk/gia/general/202601/30/P2026013000349p.htm
- https://www.info.gov.hk/gia/general/202601/30/P2026013000346.htm
- https://www.icac.org.hk/en/p/press/index_id_2242.html

The Audit Commission has also reviewed TVP: https://www.aud.gov.hk/pdf_e/e78ch04.pdf

**Operating rules this implies for AC, permanently:**

1. **Never prepare, submit or "help with" a client's funding application in a way that has AC controlling
   the procurement.** The multi-quotation rule exists precisely to stop this, and it is what the arrested
   suppliers are alleged to have subverted.
2. **Never introduce the quotations the client will compare AC against.** The client sources its own.
3. **Never make funding a selling point of the engagement.** Pricing must stand on its own ROI. This
   already matches AC's "prove it before you scale it" model — the funding line was always doing more
   harm than good in a report whose whole credibility rests on conservative, verifiable numbers.
4. If a client raises funding, **refer them to the administering body**, and put that referral in writing.

---

## REWRITTEN WORDING FOR THE CLIENT REPORT

Replace line 36 of `roi-assumptions.md` in full. Two options depending on how much AC wants to say.

### Option A — recommended default (short, safe, still useful)

> **Government support.** The Technology Voucher Programme (TVP) that many Hong Kong SMEs used for
> technology projects **stopped accepting new applications after 31 December 2024** and has not reopened.
> The Government has announced an **enhanced Digital Transformation Support Pilot Programme**, funded at
> HK$300 million and aimed specifically at helping SMEs adopt AI and cybersecurity solutions, targeted to
> launch in the second half of 2026 subject to Legislative Council consultation — details and eligibility
> are not yet published. The **BUD Fund** remains open to non-listed Hong Kong enterprises whose project
> supports business development in the Mainland or other FTA/IPPA markets, and since June 2026 offers
> more targeted support for projects with AI elements.
>
> **The figures in this report do not assume any subsidy.** If you would like to explore funding, the
> current position for every scheme is published at smelink.gov.hk and through the Government's SME
> centres, and any application is made by you directly to the administering body. AC Wins does not
> prepare, submit or manage funding applications and is not paid on the outcome of one.

### Option B — one-liner, where the report needs to stay tight

> **Government support.** The Technology Voucher Programme closed to new applications after 31 December
> 2024. An enhanced Digital Transformation Support Pilot Programme targeting SME adoption of AI is
> expected in the second half of 2026, with eligibility not yet published; the BUD Fund remains open to
> non-listed HK enterprises with Mainland or FTA-market activity. **The savings in this report assume no
> subsidy.** Current scheme status is at smelink.gov.hk — applications are made by you directly, and
> AC Wins neither prepares nor is paid from them.

### Why this wording is better

- **It is true on 2026-07-31**, and every claim in it traces to a primary source above.
- **It corrects a belief the client probably holds.** Most HK SME owners still think TVP is available.
  Being the person who tells them it closed — accurately, with the replacement named — is a credibility
  gain, not a lost selling point. It is exactly the "AI translator" positioning doing real work.
- **It removes the ROI contamination.** "Savings assume no subsidy" makes the numbers stronger, not
  weaker. Any funding becomes upside rather than a load-bearing assumption.
- **It builds the compliance firewall** into the client-facing document, before AC ever meets a client
  who asks him to handle an application.
- **It is forward-dated, not evergreen.** See the maintenance rule below.

### Maintenance rule — add this to the skill

> This paragraph names live funding schemes and **expires**. Re-verify against primary sources
> (smelink.gov.hk, itf.gov.hk, tid.gov.hk, digitalpolicy.gov.hk, info.gov.hk press releases) **before
> each quarter's client work, and immediately after any HK Budget**. Last verified: 2026-07-31.

The absence of a rule like this is the root cause here. The TVP line was correct when written and rotted
silently for nineteen months inside a default-on template.

---

## RECOMMENDED NEXT MOVES FOR AC (beyond the wording fix)

1. **Patch line 36 today.** It is in every report. Every day it stays is another prospect handed a wrong
   fact in a document selling accuracy.
2. **Track the enhanced DTSPP.** Watch the LegCo ITB Panel papers
   (https://www.legco.gov.hk/yr2026/english/panels/itb/) and digitalpolicy.gov.hk for the launch. When
   details publish, the question to answer immediately is whether there is a Solution List and how a
   provider gets on it.
3. **Productise one offer for listability.** The previous DTSPP funded listed off-the-shelf solutions, not
   bespoke consulting. If the enhanced round follows the same design — and "off-the-shelf AI solutions"
   in the Budget language says it will — then a packaged, fixed-scope AC Wins offering is the only shape
   that can be funded. That is a strategic reason to productise the AI Quick Win, independent of funding.
4. **Audit the rest of `roi-assumptions.md` for the same rot.** The HK wage benchmarks on lines 17-21 are
   seeded defaults dated to the same period and carry identical staleness risk in client-facing numbers.
   They were out of scope here and have not been verified.

---

## SOURCE LIST

Primary government sources cited above:

- https://www.info.gov.hk/gia/general/202412/13/P2024121300384.htm — TVP cessation announcement (EN)
- https://www.info.gov.hk/gia/general/202412/13/P2024121300383.htm — TVP cessation announcement (TC)
- https://www.news.gov.hk/eng/2024/12/20241213/20241213_160427_433.html — news.gov.hk
- https://www.smelink.gov.hk/en/web/sme-portal/w/technology-voucher-programme.html — "(Ceased)"
- https://www.info.gov.hk/gia/general/202506/25/P2025062500299.htm — LCQ22, 25 Jun 2025
- https://www.info.gov.hk/gia/general/202602/25/P2026022500282.htm — LCQ2, 25 Feb 2026
- https://www.info.gov.hk/gia/general/202607/08/P2026070800534.htm — LCQ7, 8 Jul 2026, SMEs adopting AI
- https://www.cedb.gov.hk/en/legco-business/questions/2026/pr08072026b.html — same, CEDB
- https://www.itf.gov.hk/wcms/index.aspx?section=38&lang=1 — ITF TVP programme page
- https://www.itf.gov.hk/filemanager/publication/en/upload/1360/TVP_Guidance_Notes-e_September_2024.pdf
- https://www.budget.gov.hk/2026/eng/budget07.html — 2026-27 Budget
- https://www.legco.gov.hk/yr2026/english/panels/itb/papers/itb20260608cb2-730-2-e.pdf — DTSPP paper
- https://www.smelink.gov.hk/en/web/sme-portal/w/digital-transformation-support-pilot-programme.html
- https://www.tid.gov.hk/en/our_work/support_for_trade_industry/bud.html — BUD Fund
- https://www.cedb.gov.hk/en/legco-business/questions/2026/pr01042026b.html — LCQ18 BUD, 1 Apr 2026
- https://www.info.gov.hk/gia/general/202503/13/P2025031300415.htm — BUD/EMF enhancements Mar 2025
- https://www.info.gov.hk/gia/general/202510/15/P2025101500372.htm — LCQ2 BUD, 15 Oct 2025
- https://www.info.gov.hk/gia/general/202604/01/P2026040100529.htm — LCQ18 BUD (info.gov.hk)
- https://www.digitalpolicy.gov.hk/en/our_work/digital_infrastructure/industry_development/ai_subsidy_scheme/
- https://www.info.gov.hk/gia/general/202410/07/P2024100700266.htm — AI Subsidy Scheme launch
- https://www.info.gov.hk/gia/general/202601/30/P2026013000349p.htm — ITC/ICAC fraud enforcement
- https://www.info.gov.hk/gia/general/202601/30/P2026013000346.htm — same (TC)
- https://www.icac.org.hk/en/p/press/index_id_2242.html — ICAC Operation Thunder
- https://www.aud.gov.hk/pdf_e/e78ch04.pdf — Audit Commission review of TVP
