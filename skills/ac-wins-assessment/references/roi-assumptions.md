# ROI Assumptions

Owner-editable. Every figure in any report must trace back to a line in this file or an explicitly stated per-client assumption.

## Formula

```
monthly saving range = weekly hours saved (range) × 4.2 × fully-loaded hourly rate (range)
```

- Fully-loaded hourly rate = monthly salary × 1.3 ÷ 176
- Use the **low end** of hours × **low end** of rate for the range floor, high × high for the ceiling — then apply rounding rules below.
- Match the rate to who actually does the work today (see benchmarks). If several roles share the task, split the hours by role.

## Wage benchmarks (Hong Kong, seeded defaults — edit as market moves)

| Role | Assumed monthly salary (HK$) | Fully-loaded HK$/hour |
|---|---|---|
| Admin / clerical | 13,000–16,000 | 95–120 |
| Sales / customer service | 16,000–22,000 | 115–160 |
| Manager / owner time | 25,000–40,000 | 180–290 |

## Rounding rules (conservative, always)

- **Benefits round DOWN** to the nearest HK$500.
- **Costs round UP.**
- Never present a single-point figure — always a range.

## Costs

- Tool cost: state honestly at the **US$20–200/month** tier (typical AI/SaaS tooling AC Wins deploys). Convert or present in US$ as-is; round up.
- Include any per-client cost the pilot actually incurs.

## Co-funding note (client report)

> **Last verified: 2026-07-31.** This section names live government schemes and **expires**.
> Re-verify against primary sources (smelink.gov.hk, itf.gov.hk, tid.gov.hk,
> digitalpolicy.gov.hk) before each quarter's client work and immediately after any HK
> Budget. The previous version of this section named TVP as available for nineteen months
> after it closed — because it had no expiry date on it.

**The Technology Voucher Programme (TVP) is closed.** It ceased accepting new applications
after **31 December 2024** and has not reopened. Never name it as available. A client
approved before the cutoff may still have a live project — that is a different situation
from a new prospect.

Include by default, for Hong Kong-registered businesses:

> **Government support.** The Technology Voucher Programme closed to new applications after
> 31 December 2024. An enhanced Digital Transformation Support Pilot Programme targeting SME
> adoption of off-the-shelf AI and cybersecurity solutions is expected in the second half of
> 2026, with eligibility not yet published. The BUD Fund remains open to non-listed Hong Kong
> enterprises whose project supports business development in the Mainland or other FTA/IPPA
> markets. **The savings in this report assume no subsidy.** Current scheme status is
> published at smelink.gov.hk. Applications are made by you directly to the administering
> body — AC Wins does not prepare, submit or manage funding applications, and is not paid
> from them.

Omit the section entirely when the client is not a Hong Kong-registered business.

**Rules that do not change:**

- **Never promise approval**, and never state a scheme is open without re-verifying first.
- **Savings always assume no subsidy.** Funding is upside, never a load-bearing assumption
  in the ROI. This makes the numbers stronger, not weaker.
- **Never run a client's funding application or source the competing quotations.** HK schemes
  require the applicant to obtain its own quotations, specifically to stop vendors doing this.
  On 2026-01-30 the ICAC reported arrests over HK$150m+ in technology-subsidy fraud that
  included proprietors of IT services suppliers — AC's own vendor category. If a client asks
  for help applying, refer them to the administering body and put the referral in writing.
- **Do not name the AI Subsidy Scheme** to traditional SME clients. It is subsidised Cyberport
  compute for AI *builders* incorporated within the last seven years — naming it signals the
  eligibility was never read.

## Presentation

Under every ROI range, list the assumptions used, e.g.:

> Assumes: 6–8 hrs/week currently spent by admin staff (from your notes); admin fully-loaded rate HK$95–120/hour; 4.2 weeks/month. Benefits rounded down to nearest HK$500.
