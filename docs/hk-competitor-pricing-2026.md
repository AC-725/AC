# AC Wins — Competitor & Pricing Research

**Date:** 2026-07-31
**Question:** is HK$6,000 / HK$15–20K per month / HK$50–60K per month defensible in the Hong Kong SME market, and what value basis supports the flagship tier?

---

## Method and a caveat you need to read first

Direct page fetching was blocked in this session — the egress proxy returned 403 on every
commercial domain attempted (mirrorma.com, frasertec.com, hksoka.com, agent88.hk and others),
and no Firecrawl CLI or API key was available. Every figure below therefore comes from
**search-engine extraction of the cited page**, not from a direct read of that page.

What this means in practice:
- The **numbers and the URLs are real** — each figure was returned as content from the page cited.
- I could **not** verify tier structures, footnotes, minimum terms or "from" qualifiers that
  sit next to a headline price on the live page.
- Before AC quotes anyone against these figures, spot-check the three that matter most —
  **mirrorma HK$8,000/mo**, **Frasertec HK$30–50K phased start**, **OperativeAI HK$2,088/mo** —
  by opening the pages himself. That is 10 minutes of work and it de-risks the whole ladder.

Conversions used throughout: **USD 1 = HK$7.8**, **SGD 1 = HK$5.8**. Converted figures are
marked `≈`. Anything marked **[inferred]** is my reasoning, not an observed number.

---

## 1. The competitor table

### Group A — Hong Kong, SME-focused, price published

| Firm | What they sell | Published pricing | Source |
|---|---|---|---|
| **mirrorma** (brand of THE GOSS) | Custom workflows: lead response, client onboarding, invoicing, reporting. 14-day deployment. | **HK$8,000/month.** No setup fee. Free 7-day trial. Cancel anytime, no minimum commitment. | [mirrorma.com/en](https://mirrorma.com/en) |
| **OperativeAI** | AI invoice processing, chatbot, accounting/HR suite, MPF + IR56 | **Starter HK$488/mo** (HK$5,856/yr) — 5 users, 100 invoices/mo, 300 AI messages. **Popular tier HK$2,088/mo** (HK$25,056/yr) — 20 users, unlimited invoices, full suite, dedicated account manager. 14-day free trial. | [operativeai.hk/en/pricing](https://operativeai.hk/en/pricing) |
| **Frasertec** | Custom software + AI automation for HK SMEs, phased | **Start at HK$30,000–50,000** budget and scale as value proves out. AI agents: one-time dev cost **+ HK$2,000–8,000/mo** hosting/API depending on volume. Results in 4–8 weeks. Free 30-min consult. | [frasertec.com AI automation](https://www.frasertec.com/en/services/ai-automation-hong-kong) · [AI agent development](https://www.frasertec.com/about-us/services/ai-agent-development-hong-kong) |
| **Chronicle** | Low-code AI orchestration, RAG knowledge base, conversational AI | Enterprise-grade low-code platform **under HK$1,000/mo**. Conversational AI ongoing compute **HK$1,000–3,000/mo** by volume, plus optional maintenance. | [chronicle.com.hk workflow automation](https://chronicle.com.hk/en/resources/blog/ai-workflow-automation-hong-kong-sme/) · [conversational AI guide](https://chronicle.com.hk/en/resources/blog/conversational-ai-hong-kong-sme-guide/) |
| **HKSoka** | "Build once, own it" — one-time build, no retainer | **One-time build fee**, then infrastructure **a few hundred HKD/month**. Explicitly attacks retainers: positions against *"HK$3,000–15,000 in ongoing retainer fees for a package that covers more than you need."* | [hksoka.com](https://www.hksoka.com/en/blog/ai-automation-hong-kong-sme.html) |
| **Brocent** | Managed IT + AI automation, IT Token bulk hours | **Many clients start under HK$6,000** (token block, valid 12 months, rolls over). **No 12-month lock-in, no monthly retainer.** Cites HK market rate for pure-local managed IT at **HK$5,000–15,000/mo**. SLA: 15-min P1 response, 4-hr onsite HK. | [brocent.com/pricing](https://www.brocent.com/pricing/) · [AI IT automation blog](https://www.brocent.com/blog/posts/ai-powered-it-automation-in-hong-kong-2026-how-hybrid-managed-it-services-and-it-token-bulk-hours-support-deliver-operational-efficiency-cost-reduction-and-pdpo-compliance) |
| **SleekFlow** (HK-founded, productized) | WhatsApp/omnichannel AI agents, flow builder | **USD 79/mo** entry ≈ HK$616. **Pro AI USD 149/mo** ≈ HK$1,162 (2,000 contacts, AI Agent). **Premium AI USD 349/mo** ≈ HK$2,722. Plus US$15/mo per WhatsApp number and Meta message fees. | [sleekflow.io/pricing](https://sleekflow.io/pricing) · [G2 pricing](https://www.g2.com/products/sleekflow/pricing) |

### Group B — Hong Kong, SME-focused, price NOT published

| Firm | What they sell | Pricing status | Source |
|---|---|---|---|
| **AI Makers** | Custom AI, PDPO-compliant, HKMA TM-G-1-aware, **trilingual EN/Cantonese/Mandarin**, HK/APAC data residency | No price on the service page, but their guide publishes ranges: **USD 5,000–15,000** ≈ HK$39,000–117,000 for a focused chatbot or automation tool; **USD 15,000–50,000** ≈ HK$117,000–390,000 for multi-system integration; **USD 50,000+** enterprise. Ships in 4–12 weeks. Fixed-price quote after free 30-min discovery call. | [aimakers.co HK](https://www.aimakers.co/custom-ai/hong-kong/) · [cost guide](https://www.aimakers.co/blog/custom-ai-development-guide/) |
| **Agent88 HK** | Managed AI agents + private/on-prem deployment for owner-led SMEs, clinics, property services | **No public pricing.** "Book a consultation" only. | [agent88.hk](https://agent88.hk/managed-ai-agents-hong-kong) |
| **ET Consulting HK** | AI deployment + Lean Six Sigma + ISO 9001. Claims **30–40% operational cost reduction** for SMEs | **No public pricing.** | [etconsultinghk.com](https://etconsultinghk.com/) |
| **ThinkCol** | HK AI/data science consultancy — strategy, custom ML/LLM, training, hackathons | **No public pricing.** ~USD 7M revenue 2025. Third-party directory cites HK AI consulting projects at **USD 5,000–100,000+**. | [thinkcol.com](https://thinkcol.com/) · [fixnhour rankings](https://fixnhour.com/companies/top-ai-consulting-companies/hong-kong) |
| **Protiviti Hong Kong** | Enterprise AI consulting arm of a global risk consultancy | **No public pricing.** | [protiviti.com/hk-en](https://www.protiviti.com/hk-en/artificial-intelligence-services) |

### Group C — Regional benchmarks (HK/SEA, mid-market and up)

| Firm | Pricing | Source |
|---|---|---|
| **Pertama Partners** (SEA + HK advisory) | **USD 150–400/hr** advisory and short diagnostics ≈ HK$1,170–3,120/hr. **USD 15,000–120,000** fixed-scope project ≈ HK$117,000–936,000. **Monthly retainer USD 5,000–30,000** ≈ **HK$39,000–234,000/mo**. Discounts: annual retainer 15–20%, multi-project 10–15%, 100% upfront up to 20%. | [AI consulting pricing guide](https://www.pertamapartners.com/insights/ai-consulting-pricing-guide) |
| **Pertama — pilot pricing** | Single use-case pilot **SGD 75,000–180,000** ≈ HK$435,000–1,044,000, 8–16 weeks. Mid-market under 100 staff: **SGD 75K–150K**, 10–20 users, 8–12 weeks. Cost drivers: unstructured data 2.5–3.5x, poor data quality 2–3x. | [AI pilot program pricing](https://www.pertamapartners.com/insights/ai-pilot-program-pricing) |
| **Hashmeta AI** (Singapore) | Ongoing AEO/AI management **SGD 2,000–6,700/mo** ≈ **HK$11,600–38,900/mo**, plus one-time setup **USD 1,000–10,000**. | [hashmeta.ai pricing](https://www.hashmeta.ai/en/ai-seo/ai-marketing-pricing) |
| **Singapore consultant day rates** (context) | Mid-level 3–7 yrs **SGD 300–500/hr**; senior 7–12 yrs **SGD 550–800/hr**; principal **SGD 850–1,500/hr**. | [Pertama pricing guide](https://www.pertamapartners.com/insights/ai-consulting-pricing-guide) |

### Group D — Global AI-automation agency norms (for retainer structure only)

| Benchmark | Figure | Source |
|---|---|---|
| Retainer tiers by hours | Essential advisory 5–10 hrs/mo **USD 2,000–5,000**; Standard 10–25 hrs/mo **USD 5,000–15,000**; Comprehensive 25+ hrs/mo **USD 15,000–50,000** | [agentiveaiq](https://agentiveaiq.com/blog/how-much-should-i-charge-for-ai-consulting-pricing-guide) |
| Post-implementation retainer | **USD 2,000–8,000/mo** for optimization, new workflows, maintenance | [agentiveaiq](https://agentiveaiq.com/blog/how-much-should-i-charge-for-ai-consulting-pricing-guide) |
| Value-based share | **10–40% of documented cost savings or revenue lift**; 73% of clients say they prefer value-based pricing | [agentiveaiq](https://agentiveaiq.com/blog/how-much-should-i-charge-for-ai-consulting-pricing-guide) |
| General retainer range | **USD 500–5,000/mo** typical; alternative source **USD 2,000–20,000+**, average ~USD 3,200/mo | [Arsum](https://arsum.com/blog/posts/ai-automation-agency-pricing/) · [Taskip](https://taskip.net/ai-automation-agency-pricing/) |
| Pilot / POC | **USD 10,000–25,000** for a focused single use case, results in 60–90 days | [Pertama pricing guide](https://www.pertamapartners.com/insights/ai-consulting-pricing-guide) |
| Worked ROI example | 20 hrs/week at USD 50/hr loaded = USD 52,000/yr; a USD 15,000–25,000 automation returns in 6–10 months | [agentiveaiq](https://agentiveaiq.com/blog/how-much-should-i-charge-for-ai-consulting-pricing-guide) |

---

## 2. Where pricing is hidden — and what that tells you

There is a clean split in this market, and it is the single most useful structural finding here.

**Price published** → mirrorma, OperativeAI, Chronicle, Brocent, SleekFlow. All of them sell a
**product**: fixed scope, self-serve or near-self-serve onboarding, trial period, cancel anytime.
Prices cluster **HK$488 – HK$8,000/month**.

**Price hidden** → Agent88, ET Consulting, ThinkCol, Protiviti, and AI Makers' service pages.
All of them sell a **bespoke engagement**: discovery call, written scope, fixed quote. Where
ranges leak out at all, they are **project** figures — HK$39,000 to HK$390,000+ — not monthly retainers.

**The trap this exposes for AC:** his ladder is shaped like the published-price group — three
named tiers, a headline number, a guarantee, "from HK$6,000" — but priced like the hidden group.
A prospect who sees "HK$15–20K/month" on a website will price-compare it against mirrorma's
HK$8,000/month, because that is the only other monthly number in this market with a public
price on it. He will lose that comparison every time, because on paper the two offers describe
the same thing.

Either publish nothing and sell the price in the room, or publish and be prepared to justify
1.9–2.5x mirrorma in the first thirty seconds. Publishing a number he can't yet defend is the
worst of both.

---

## 3. How firms justify retainers above HK$15K — the six value bases actually observed

This was the core question. Nobody in the HK SME segment justifies a five-figure monthly retainer
on hours saved. Here is what they use instead, ranked by how well it transfers to AC's ICP.

**1. Headcount avoided — the strongest, and the one AC is not using.**
Chronicle anchors its entire pitch on it: *"In Hong Kong, hiring a skilled backend engineer costs
between HK$35,000 and HK$60,000 per month. This does not include recruitment fees or mandatory
provident fund (MPF) contributions"*
([chronicle.com.hk](https://chronicle.com.hk/en/resources/blog/ai-workflow-automation-hong-kong-sme/)).
The comparison is never "hours we saved you" — it is "the hire you now don't have to make."
For AC's ICP the relevant anchor is not an engineer but a clerk: HK admin clerk averages
**HK$15,907/month** ([Indeed HK, Apr 2026](https://hk.indeed.com/career/administrative-clerk/salaries)),
JobsDB puts administration clerk at **HK$16,000–19,000/month**
([JobsDB, Jul 2026](https://hk.jobsdb.com/career-advice/role/administration-clerk/salary)).
Note what that means: **HK$15–20K/month is almost exactly one HK admin clerk, before MPF.**
That is not a coincidence AC should waste.

**2. Per-transaction cost — converts volume into money without needing a headcount story.**
OperativeAI prices against a unit cost: manual invoice processing costs
**HK$50–100 per invoice** in labour, errors and delays
([operativeai.hk](https://operativeai.hk/en/blog/ai-invoice-processing-hk-sme)).
A trading firm at 800 invoices/month is HK$40,000–80,000/month of processing cost. That is a
number a family-business owner recognises instantly, and it scales with his business rather
than with AC's hours.

**3. Managed-service SLA — the retainer buys response time, not deliverables.**
Brocent sells **15-minute P1 response and 4-hour onsite SLA in Hong Kong**, backed by a 24/7
multilingual command centre ([brocent.com](https://www.brocent.com/blog/posts/ai-powered-it-automation-in-hong-kong-2026-how-hybrid-managed-it-services-and-it-token-bulk-hours-support-deliver-operational-efficiency-cost-reduction-and-pdpo-compliance)).
This is the classic mechanism for making a retainer survive a month where little was built.
Without an SLA, a retainer is just prepaid hours, and prepaid hours invite the "what did you do
for me this month" conversation that kills renewals.

**4. Risk and compliance — the one basis that has no hours ceiling.**
AI Makers sells **PDPO compliance, HKMA TM-G-1 awareness, and HK/APAC data residency** as
first-class features ([aimakers.co](https://www.aimakers.co/custom-ai/hong-kong/)), and prices
projects at HK$39,000–390,000. Brocent leads with PDPO compliance too. Nobody prices regulatory
exposure by the hour, because the client is not buying time — they are buying the absence of a
problem. **For AC's banks'-vendors segment this is the highest-leverage unused lever in the
entire research set.** A vendor to a HK bank has contractual data-handling obligations; an
automation that touches customer data without a PDPO story is unsellable to them, and one with
a PDPO story is worth a multiple of the hours in it.

**5. Percentage-of-savings.** Value-based structures typically take **10–40% of documented cost
savings or revenue lift** ([agentiveaiq](https://agentiveaiq.com/blog/how-much-should-i-charge-for-ai-consulting-pricing-guide)).
Note what this does to AC's own model: at HK$2,000–6,000/month of demonstrated saving, a 10–40%
share is **HK$200–2,400/month**. His own ROI model, priced the industry-standard way, produces a
number an order of magnitude below his flagship. That is the arithmetic proof that the hours-saved
model cannot carry the tier — not an opinion, just the multiplication.

**6. Revenue and speed-to-response.** mirrorma leads with lead response and onboarding — time-to-first-reply,
not admin hours. Revenue-side automation escapes the hours ceiling because the client compares it
to deals won, not to salary.

---

## 4. Positioning: what is actually differentiated

Blunt answer: **three of AC's four differentiators are already claimed by named competitors in this
market, and the fourth is a phrase rather than a moat.**

| AC's claim | Status | Evidence |
|---|---|---|
| "One workflow at a time, the one worth automating" | **Not differentiated.** Near-verbatim collision. | HKSoka: *"starts from identifying the one workflow in your business that, if automated, would free up the most staff time"* — [hksoka.com](https://www.hksoka.com/en/blog/ai-automation-hong-kong-sme.html). Frasertec sells a *"quick-win phase to deliver value fast, then expansion"* — [frasertec.com](https://www.frasertec.com/en/services/ai-automation-hong-kong) |
| Trilingual EN / Cantonese / Mandarin | **Table stakes.** | AI Makers: *"bilingual English + Cantonese, and trilingual when needed"* — [aimakers.co](https://www.aimakers.co/custom-ai/hong-kong/). Brocent runs a 24/7 multilingual command centre. In Hong Kong this is the baseline, not the edge. |
| Pilot-first / prove before scale | **Not differentiated.** | mirrorma free 7-day trial, OperativeAI 14-day free trial, Frasertec free 30-min consult, Pertama's entire pilot practice. |
| "The AI translator for old-school Hong Kong business" | **Fresh phrase, crowded substance.** | Every firm above claims plain-language, no-jargon, SME-friendly delivery. The wording is his; the promise is generic. |

**What is genuinely unclaimed** — and this is where the positioning work should go:

- **The insider-turned-critic origin story.** Not one firm in this research says "I sold HK
  businesses overpriced, half-used systems and left to fix it." Firms have services; they don't
  have a named person with a confession. That is unique to AC, it is unfakeable, and it is
  precisely the thing that makes a suspicious 60-year-old trading-firm owner take a second meeting.
  It is currently sitting in his USER.md instead of on his homepage.
- **Compliance + trilingual + SME price in one offer.** AI Makers has the compliance story but
  prices from ~HK$39,000/project. mirrorma has the price but no compliance story. Nobody occupies
  the middle. For banks' vendors specifically, that gap is the business.
- **A published case study with real numbers.** Not one HK SME-focused firm in this set publishes
  a verifiable before/after with figures. Everyone asserts percentages — ET Consulting's "30–40%
  cost reduction", Brocent's "30–40% savings" — with nothing behind them. **Lofty Group is the
  single highest-leverage asset AC owns right now**, and it is worth more as a numbers-first case
  study than as a website relaunch.

---

## 5. Results guarantees — nobody else is this exposed

**No HK SME-focused firm found publishes a money-back results guarantee.** What they offer instead
is *pre-purchase risk removal*, which limits exposure to zero delivered work:

- **mirrorma** — free 7-day trial, no setup fee, cancel anytime ([mirrorma.com/en](https://mirrorma.com/en))
- **OperativeAI** — 14-day free trial, no credit card ([operativeai.hk/en/pricing](https://operativeai.hk/en/pricing))
- **Frasertec** — free 30-minute consult ([frasertec.com](https://www.frasertec.com/en/services/ai-automation-hong-kong))
- **Brocent** — no lock-in, unused token hours roll over 12 months ([brocent.com/pricing](https://www.brocent.com/pricing/))

Outside HK, outcome-based guarantees do exist — a "30 Days or It's Free" launch pack
([ISmile](https://ismiletechnologies.com/en_us/ai-agents-in-30-days-launch-pack/)) and explicit
outcome pricing ([JieGou](https://jiegou.ai/blog/outcome-based-pricing-guarantee/)) — but the
counter-argument is loud and, on the merits, correct: AI systems are probabilistic not deterministic,
outputs vary with data quality and model drift, and agencies don't control model updates
([Wellows](https://wellows.com/blog/why-agencies-cant-guarantee-ai-results/)). The standard risk
advice is to *narrowly tailor assurances to reduce the surface area for undeserving claims*
([contextwindows](https://contextwindows.substack.com/p/provider-pays-for-failed-automation)).

**AC's guarantee as currently worded — "first automation saves measurable time, or the client
doesn't pay" — is the most exposed guarantee in this entire research set.** "Measurable time" is
undefined, there is no baseline, no measurement window, no data-quality condition, and no cap.
A client with dirty data and staff who quietly keep using the old process can trigger it in good
faith, and AC eats a full build. That is survivable once. Pre-revenue, it is not survivable twice.

**Scope it before he quotes anyone.** Five clauses, all standard, none of which weaken the sales
pitch: (1) one **named** workflow, written into the SOW; (2) baseline measured and **signed off
by the client before build** — no baseline, no guarantee; (3) client warrants the data they supply
and commits named staff to use the new process; (4) a defined measurement window, 30 days post-go-live;
(5) **remedy capped at the Quick Win fee, and never applicable to retainer months.** The guarantee
should be a door-opener on a fixed-fee first project, not an open liability across a monthly
relationship.

---

## 6. Engagement shapes in this market

| Shape | Observed norm | Source |
|---|---|---|
| HK SME phased entry | Start **HK$30,000–50,000**, expand as value proves | [Frasertec](https://www.frasertec.com/en/blog/hong-kong-sme-ai-automation-guide-industry-transformation-low-cost-digital-first-step) |
| HK SME time-to-value | **4–8 weeks** to measurable results; mirrorma deploys in **14 days**; AI Makers ships in **4–12 weeks** | [Frasertec](https://www.frasertec.com/en/services/ai-automation-hong-kong) · [mirrorma](https://mirrorma.com/en) · [AI Makers](https://www.aimakers.co/blog/custom-ai-development-guide/) |
| Trial before paid | **7–14 days free**, no credit card | [mirrorma](https://mirrorma.com/en) · [OperativeAI](https://operativeai.hk/en/pricing) |
| Contract minimum | **None** at the SME tier — mirrorma, Brocent and OperativeAI all advertise cancel-anytime / no lock-in | as above |
| Formal pilot (mid-market+) | **8–16 weeks**, SGD 75K–180K single use case ≈ HK$435K–1,044K | [Pertama](https://www.pertamapartners.com/insights/ai-pilot-program-pricing) |
| Global POC norm | **USD 10,000–25,000** ≈ HK$78,000–195,000, results in 60–90 days | [Pertama](https://www.pertamapartners.com/insights/ai-consulting-pricing-guide) |

**A 2-week pilot at the SME tier is not a paid product anywhere in this market.** It is either free
(mirrorma's 7-day trial, Frasertec's consult) or it is a paid *build* — HK$30,000+. Paid two-week
pilots start at HK$78,000 and run 8–16 weeks. AC's 2-week pilot is therefore correctly *shaped*
for the segment but must be priced as a small fixed-fee build, not as a discovery exercise —
otherwise he is giving away the only thing that distinguishes him from a free trial.

---

## 7. Funding context — a lever that just closed, and one about to open

This materially affects what SMEs can pay right now.

- **The Technology Voucher Programme (TVP) stopped accepting applications after 31 December 2024.**
  It had funded 75% of project cost, capped at HK$600,000 per enterprise, on a 3:1 basis —
  37,059 applications and ~HK$6.6bn approved by Nov 2024
  ([ITC announcement](https://www.info.gov.hk/gia/general/202412/13/P2024121300384.htm) ·
  [SME Link — listed as Ceased](https://www.smelink.gov.hk/en/web/sme-portal/w/technology-voucher-programme.html)).
  **Consequence: the standard HK "the government pays 75%" close no longer works.** Any competitor
  deck or SME owner still assuming it is out of date, and AC should know that before a prospect
  raises it.
- **The Digital Transformation Support Pilot Programme (DTSPP)** — HK$500M, 1:1 matching, retail
  and F&B — **closed to applications in May 2025.**
- **HK$300M was allocated in the 2026 Budget to relaunch an enhanced DTSPP covering AI and
  cybersecurity.** Funding mode, scope and amount are still being devised; roll-out expected
  **second half of 2026** after LegCo consultation
  ([ITIB, 25 Feb 2026](https://www.itib.gov.hk/en/legislative_council_business/questions/2026/pr_20260225.html) ·
  [HR Online](https://www.humanresourcesonline.net/hong-kong-to-allocate-hk-300mn-to-support-smes-adoption-of-ai)).
- **BUD Fund** received an additional HK$200M with the per-company cap raised to **HK$150,000**
  ([ITIB](https://www.itib.gov.hk/en/legislative_council_business/questions/2026/pr_20260225.html)).
- For larger upgrades, **ITF Enterprise Support Scheme** funds up to **HK$10M on 1:1 match**
  ([Fastlane SME funding guide 2026](https://fastlane-global.com/hk/blog/sme-funding-hong-kong-2026/)).

**[inferred]** The enhanced DTSPP landing in H2 2026 with an explicit AI scope is the single best
timing event available to AC this year. Being able to say "I'll structure this so it qualifies the
day the scheme opens" is a real, differentiated, currently-unclaimed reason for a cautious SME to
start the conversation now rather than in six months. Worth tracking the LegCo consultation directly.

---

## 8. VERDICT

### Tier 1 — AI Quick Win, HK$6,000 one-off: **badly under-priced**

Every comparable custom build in this market starts at 5–6x that number. Frasertec tells SMEs to
budget **HK$30,000–50,000** to start. AI Makers quotes **HK$39,000–117,000** for a focused single
automation. Brocent's entry *token block* — pre-paid hours, no deliverable — is around HK$6,000.
So AC is pricing a finished, working, guaranteed automation at roughly what the market charges for
a block of unallocated support hours.

The real damage is not the lost revenue on the first project. It is the **anchor**. A client who
pays HK$6,000 for a built automation has been taught what AC's work costs. Selling that same client
HK$15–20K/month — 2.5–3.3x the entire build, every month, forever — is then close to impossible,
because he has already demonstrated that a whole workflow costs HK$6,000. **The Quick Win price is
what makes the flagship unsellable.** These two problems are one problem.

**[inferred] Reprice to HK$18,000–25,000 fixed, 2–3 weeks, one named workflow, guarantee attached.**
That is still the cheapest custom build in the market by a wide margin — undercutting Frasertec's
floor and a third of AI Makers' — so it stays a genuinely easy yes, while no longer signalling
hobbyist. It also makes the guarantee credible: a guarantee on HK$6,000 reads as a gimmick; a
guarantee on HK$20,000 reads as conviction.

### Tier 2 — Enablement Partner, HK$15,000–20,000/month: **correctly priced, badly justified**

Two things are true at once and AC needs both.

**The number is defensible.** It sits at the top of the observed HK SME retainer band but inside
it — Brocent cites HK$5,000–15,000/mo for local managed IT, HKSoka concedes the market runs
HK$3,000–15,000/mo, Hashmeta's regional equivalent is HK$11,600–38,900/mo, and Pertama's floor is
HK$39,000/mo. Globally, HK$15–20K/mo is USD 1,920–2,560 — the *entry* advisory tier. Nobody should
tell AC this price is greedy.

**The justification is broken, and by his own arithmetic.** mirrorma sells what reads on paper as
the same offer — custom workflows for lead response, onboarding, invoicing and reporting, deployed
in 14 days — for **HK$8,000/month with no setup fee and cancel anytime**
([mirrorma.com/en](https://mirrorma.com/en)). AC is asking 1.9–2.5x that. Meanwhile his own ROI
model produces HK$2,000–6,000/month of demonstrable value. **He is asking HK$15–20K to deliver
HK$2–6K, against a named competitor at HK$8K.** Priced the industry-standard way — 10–40% of
documented savings — his own model justifies HK$200–2,400/month.

The fix is not a discount. It is a different denominator:

1. **Lead with headcount, not hours.** HK$15,907/month is the HK admin clerk average
   ([Indeed](https://hk.indeed.com/career/administrative-clerk/salaries)); JobsDB says
   HK$16,000–19,000 ([JobsDB](https://hk.jobsdb.com/career-advice/role/administration-clerk/salary)).
   Before MPF, recruitment, sick leave, turnover and training. **The flagship is priced at exactly
   one clerk.** The sentence is: *"This is one headcount you don't hire — except it doesn't quit,
   doesn't need training twice, and works at 2am when your Shenzhen supplier emails."* That single
   reframe moves the justification from HK$2–6K to HK$16–19K+ without changing the price.
2. **Add per-transaction cost.** HK$50–100 per manually processed invoice
   ([OperativeAI](https://operativeai.hk/en/blog/ai-invoice-processing-hk-sme)). For a trading firm
   at 800 invoices/month that is HK$40,000–80,000/month of cost. Scales with the client's business,
   not AC's hours.
3. **Attach an SLA.** Brocent's 15-min P1 / 4-hr onsite is the model. The retainer must buy a
   *commitment*, not a *quantity of work* — otherwise every quiet month invites a cancellation
   conversation.
4. **Sell PDPO and data residency to the banks'-vendors segment.** AI Makers proves this carries
   HK$39,000–390,000 project pricing. Compliance has no hours ceiling.
5. **Commit to shipped volume.** A named number of workflows per quarter — that is what separates
   HK$15–20K from mirrorma's HK$8,000 in a way a prospect can verify.

**[inferred]** If he cannot bring himself to build all five, drop the flagship to **HK$12,000–15,000/mo**
and win on proximity to the HK$8,000 alternative. But the better trade is to hold the price and fix
the story — a stacked value basis of headcount + transaction cost + SLA + compliance supports
HK$15–20K comfortably, and the hours-saved model never will at any price.

### Tier 3 — Transformation, HK$50,000–60,000/month: **correctly priced, wrong customer**

HK$600,000–720,000/year. That sits inside Pertama's HK$39,000–234,000/month retainer band, so the
number is not absurd — but that band serves mid-market and enterprise clients with 100+ staff and
an internal sponsor, not the family trading firm running on spreadsheets and WhatsApp.

Test it against the client's alternative: at HK$50–60K/month a HK SME can hire **three admin clerks**,
or a **senior engineer plus a clerk** (Chronicle's own anchor: HK$35,000–60,000/month for a backend
engineer). No traditional HK SME with no in-house IT makes that trade with a pre-revenue solo
consultant. Nobody in AC's stated ICP will ever buy this tier.

**Keep it, but understand what it is: an anchor, not a product.** Its job is to make HK$15–20K look
like the sensible middle option — which is a real and worthwhile job. Just don't build pipeline on
it, don't forecast it, and don't let it distort who he prospects. **[inferred]** If he ever wants to
actually sell it, the buyer is a 50–200 staff firm with a named ops director, which is a different
prospecting motion from the one he is running.

### The one-line summary

**The ladder's shape is right and only the flagship's *justification* is broken — but the
HK$6,000 entry price is what makes that justification impossible to fix.** Raise the Quick Win to
HK$18–25K so the flagship has somewhere to stand, re-anchor the flagship on one avoided headcount
rather than hours saved, bolt on an SLA and a PDPO story for the banks'-vendors segment, and scope
the guarantee to a single named workflow with a signed baseline and a fee cap before quoting anyone.
