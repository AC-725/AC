# Lofty Group — case study prep pack

Prepared 2026-07-31. For AC Wins' first published case study.

**Read section 4 first if you only read one thing.** It is the part that expires.

---

## 0. What I could and could not verify

Honest limits up front, because the rest of this depends on them.

`lofty.com.hk` and `ac-wins.com` are both **blocked by this session's network egress
policy** (403 on CONNECT). Wayback Machine is blocked too. Firecrawl has no API key in
this session. So I could not load either site, could not screenshot them, and could not
diff the current site against an archived older version.

Everything factual below about Lofty comes from **search-engine indexes of the live
site** — the pages Google has crawled, their titles, and the body copy in the index. That
is real evidence about what is published right now. It is not the same as seeing the page.
Where I am inferring rather than observing, I say so.

**What this means for you:** open both sites yourself and fill the gaps marked
`[VERIFY]`. That should take fifteen minutes.

---

## 1. Current state of lofty.com.hk

### Confirmed from the live index

The site is up and crawled. Indexed structure:

| URL | Title |
|---|---|
| `www.lofty.com.hk/en/` | Lofty Group |
| `www.lofty.com.hk/en/about/` | About \| Lofty Group |
| `www.lofty.com.hk/en/services/` | Services \| Lofty Group |
| `www.lofty.com.hk/en/contact/` | Contact \| Lofty Group |
| `www.lofty.com.hk/zh/page-not-found/` | Page Not Found \| Lofty Group |

So: **four English pages, a Chinese locale, and a custom 404.** No blog, no news, no
projects, no case studies, no careers, no privacy page surfaced in any search I ran.

**Positioning copy in the index, close to verbatim:**

- "a full spectrum of IT related services from strategic planning to ongoing support,
  freeing clients to focus on their core business whilst increasing business operational
  efficiency and productivity"
- "one of the few solution providers that can provide true front-to-back solutions to all
  smart office and audio video presentation needs, riding on expertise in structure
  cabling and system integrations"
- "over 25 years of professional experience", "best in class technicians", "multi-industry
  team of experts", "tailor-made solutions"
- "professional advice, committed response time, 7x24 support and cost-effective solutions"
- "proven record of building server rooms for large financial, commercial, medical and
  educational institutions"
- Founded **1995**. Mission framed around "operational efficiency, productivity, time
  management and cost effectiveness".

**Contact path:** address is Unit 501, 5/F International Plaza, 20 Sheung Yuet Road,
Kowloon Bay, Kowloon. The contact page tells visitors to reach out "via email or by phone
during office hours". No phone number or email address appeared in the index. No WhatsApp,
no live chat, no booking link surfaced.

`[VERIFY]` Does the contact page have a working **form**? Is there a **phone number that
is a tap-to-call link on mobile**? Is there **WhatsApp**? These three are the entire
conversion mechanism of a four-page B2B site, and I could not confirm any of them exist.

### Is this the new site or the old one?

**I cannot tell you conclusively.** Here is the actual evidence, both directions.

*Points toward a recent rebuild:*
- Clean locale-prefixed paths with trailing slashes (`/en/about/`, `/zh/`). That pattern
  comes from a modern static site generator or headless CMS. A 2010s-era Hong Kong IT
  company site more typically looks like `/index.php`, `/about.html`, or a Wix/WordPress
  default structure.
- A **custom 404 page** that is itself indexed and branded ("Page Not Found | Lofty
  Group"). Old brochure sites usually serve the host's default error page.
- Consistent `Page | Lofty Group` title templating across every page. That is a template
  doing the work, not hand-written titles.

*Points against, or neutral:*
- The body copy reads as **long-standing corporate boilerplate**, not new writing.
  "riding on expertise in", "best in class technicians", "full spectrum of IT related
  services" — that is inherited text. If this is your redesign, you kept the old words.
  Which is a choice you may have made deliberately, but it is worth knowing that the copy
  is doing none of the work.
- Only four pages, no proof content of any kind. No projects, no clients, no case studies
  on a firm that says it builds server rooms for banks and hospitals. If this is the new
  site, that is the biggest single miss in it.

**My read, stated as inference not fact:** the URL structure and 404 handling look like
your build. The copy looks like theirs. `[claude]` — unvalidated, confirm in one minute by
opening the page.

### Two things I found that you need to know about

**1. There is another company called LoftyGroup, and it is beating this one.**

`loftygroup.hk` — a **different** company. Founded 2018, Unit 2305 Metroplaza Tower II,
Kwai Fong. Phone +852 9175 0707, info@loftygroup.com.hk. It sells **web design, IT
outsourcing, SEO, AI chatbots and AI customer service systems to Hong Kong SMEs**, claims
500+ website projects and 98% satisfaction, and runs an active Chinese-language blog
(`/blog/ai-trends-2026-hongkong/`, `/blog/hong-kong-web-design-company-guide-2026/`,
`/blog/it-outsourcing-guide-2026/`).

Two problems. First, it **outranks lofty.com.hk** for Lofty + IT + AI queries, because it
publishes constantly and your father's site has four static pages. Second, it is selling
almost exactly what AC Wins sells, to exactly AC Wins' target buyer, in Cantonese, with a
content engine already running. That is a live competitor, not a curiosity.

**2. The founding date does not match the company registry.**

The site says founded 1995, over 25 years. The Hong Kong companies registry lists **Lofty
(HK) Technology Limited as incorporated 17-MAR-2015**. There is very likely an innocent
explanation — a restructure, a different entity holding the earlier history, a predecessor
firm. But you are about to publish a case study whose entire selling point is that the
numbers are honest. If a prospect checks the registry and finds a 2015 incorporation under
a "30 years of experience" claim, the case study dies. **Reconcile this with your father
before you publish, and if the history sits in a predecessor entity, say which.**

---

## 2. How AC Wins presents itself right now

I could not load `ac-wins.com`. But I ran the searches, and this is a finding in itself:

**`ac-wins.com` has zero search presence.** Not "ranks poorly" — it returns nothing.
Domain-restricted searches return no links at all. A quoted search on the domain name
returns unrelated results. Google does not appear to have it indexed.

Three consequences, in order of how much they should bother you:

1. Publishing the case study on ac-wins.com reaches **nobody** organically. It only works
   as something you send. So the primary artifact is a **PDF one-pager you attach or hand
   over**, and the web page is the secondary copy. Build it in that order.
2. Cold emails pointing to an unindexed domain look thinner than emails pointing to an
   indexed one. Not the reason batch #1 got zero replies, but not helping.
3. `[VERIFY]` Check Search Console for ac-wins.com today. If the property does not exist,
   create it and submit a sitemap. If it exists and shows "noindex" or "Discovered –
   currently not indexed", fix that before anything else on this list.

**I could not confirm whether ac-wins.com already has a case-study section or format.**
The skeleton in section 3 is therefore written to be **self-contained** — it works as a
standalone page, a PDF, or a section, and does not assume a template exists.

Voice constraints I have applied, taken from your own files rather than guessed: short
sentences, no jargon, no hype, every number carries its assumption, honest about limits,
prove it before you scale it, benefits round down and costs round up.

---

## 3. Case study skeleton

Fill the brackets. Do not soften the sections that look uncomfortable — they are the ones
doing the work.

---

### [Headline: plain and specific. No adjectives.]

Model: *"A 30-year-old Hong Kong IT firm, four pages, and the enquiries that never
arrived."*
Not: *"How we transformed Lofty Group's digital presence."*

**One line under the headline:**
> [Company] · [industry] · [what was done] · [what changed] · measured over [period].

---

### The numbers

Three or four. No more. Each one gets its source and its assumption printed underneath, in
smaller text. If a number does not have a source you can name, it does not go in the box.

> **[Number]** — [what it is]
> *Source: [exactly where it came from]. Compared against: [what period, and why that
> period]. Assumption: [the thing that has to be true for this number to mean what it
> says].*

Worked example of the format:

> **+[N] enquiries a month**
> *Source: the enquiry inbox and the office phone log, counted the same way before and
> after. Compared against: the same three months last year, not the three months before
> launch, because their quiet season is [X]. Assumption: nothing else changed in that
> period — no new advertising, no trade show. [State whether that is true.]*

---

### Who they are

Three sentences. What the company does, how long, how big, who they serve. No praise.

---

### Disclosure

**This goes here — on the first screen, above the story. Not in a footnote.**

Draft:
> Lofty Group is my father's company. That is why they were willing to go first and let me
> measure everything, including the parts that did not work. It also means you should
> weigh this differently to a case study from a client at arm's length. So every number
> below names its source. Check any of them.

Do not apologise, do not over-explain, do not bury it. One paragraph, then move on.

---

### What was wrong

From the interview, in their words. Specific and concrete.

- What the site actually was before. [Screenshot, side by side.]
- What happened when an enquiry came in. Step by step, who touched it, what got retyped.
- How long a reply took, and why.
- The thing that was actually embarrassing. Name it.
- Ideally: one real job where the website came up and it did not help.

---

### What we did

Plain language. No product names, no acronyms, no "leveraged". An SME owner should be able
to read this to a colleague out loud.

- The one thing we changed first, and why that one.
- What we deliberately did **not** do, and why. This section earns more trust than the
  previous one.
- How long it took, in weeks.

---

### What changed

Numbers with dates and comparison basis. Every claim carries the same three lines as the
numbers box: source, comparison period, assumption.

Structure it as a small table: *Measure · Before · After · How it was measured.*

State the measurement window and say plainly that it is short if it is short.

---

### What did not change, and what we got wrong

**Mandatory. Do not skip this section.** Two or three items, specific.

- The thing that has not moved yet, and the honest reason.
- The thing that took longer than promised.
- The thing we would do differently.

This is the highest-trust content in the entire document, and on a case study about the
founder's father it is the section that converts a favour into evidence.

---

### What it cost, and how long

- Scope, price, timeline. Actual, not list price.
- If it was unpaid family work, say so and state the price the same scope would carry.
  See section 5 — this is not optional.

---

### Who this applies to, and who it does not

- The kind of business this result should transfer to.
- The kind it should not. Name at least one.

---

### What happens next

- What we are measuring at 90 days and will publish, whatever it says.
- One CTA. One. A named next step, not "get in touch".

---

## 4. THE METRICS LIST — what to capture, when, and exactly where from

This is the section that expires. Everything else in this document can be written next
month. Most of section (a) cannot.

### STEP ZERO — do this today, before anything else

**Confirm whether the new site is live, and get the exact launch date.**
Where from: the deploy dashboard (Vercel / Netlify / cPanel deploy log), or the DNS change
record, or the hosting control panel's file timestamps. Not memory.

Everything below is dated relative to that timestamp. And the answer changes what you do:

- **If it has NOT launched yet:** stop. Capture (a)1, (a)2, (a)4 and (a)6 *before* you
  push. One day of delay is worth it. There is no second chance at a baseline.
- **If it HAS launched:** you are already losing data. Work through (a) in the order
  written — it is ordered by how fast each item disappears.

---

### (a) BASELINE — capture now or lose permanently

Ordered by urgency. 1 and 2 are the ones that are genuinely unrecoverable.

**1. Search Console: 16 months of old-site search data. THE MOST TIME-CRITICAL ITEM.**
Where from: Google Search Console → property for lofty.com.hk → **Performance → Search
results** → set date range to the maximum available → **Export** to CSV. Do this four
times: total clicks/impressions/CTR/average position; the **Queries** tab; the **Pages**
tab; the **Devices** tab.
Why now: Search Console keeps **16 months and then deletes**, on a rolling basis. Every
week you wait, a week of before-data is gone forever. It cannot be recovered from any
backup.
If the property does not exist: the data was never collected and is gone. Say so in the
case study. Do not estimate it.

**2. Google Analytics: 12+ months of old-site traffic.**
Where from: GA4 → **Reports → Acquisition → Traffic acquisition**, date range set to 12
months ending the day before launch → export. Then the same for **Reports → Engagement →
Pages and screens** (which pages people actually landed on) and **Reports → Tech → Tech
details** (mobile vs desktop share).
Why now: GA4's event-level retention setting is commonly **2 or 14 months** — check
Admin → Data settings → Data retention. If it is set to 2 months, most of your before-data
has already been deleted.
If GA was never installed: that number does not exist. Say so.

**3. A complete copy of the old site.**
Where from, in order: (i) the hosting backup — call the host today, backups typically
rotate on a **30-day** cycle; (ii) the previous web vendor, ask for the original files;
(iii) `web.archive.org/web/*/lofty.com.hk` — screenshot home, about, services, contact, on
both desktop and mobile widths.
Why now: this is your **before picture**. For a non-technical SME owner, the side-by-side
screenshot is more persuasive than every number on this page combined. Without it you have
a case study with no "before".

**4. Old site speed and mobile score.**
Where from: run **PageSpeed Insights** (pagespeed.web.dev) against a Wayback snapshot URL
of the old home page, mobile tab. Screenshot the score.
Honest note: this often cannot be recovered cleanly, because archived pages load assets
differently. If the number is not trustworthy, drop the claim entirely rather than
publishing a soft one.

**5. Old URL list, and whether the old URLs still work.**
Where from: Search Console → **Indexing → Pages** (gives you every URL Google knew), or
the old `sitemap.xml`, or Wayback's URL list.
Why it matters twice: it is baseline data, *and* if those old URLs now 404 the site is
losing whatever rankings it had. Check and redirect.

**6. Enquiry volume, by month, for the 12 months before launch — split by source.**
Where from: the shared enquiry inbox (search by date range, count the threads); the office
phone log or switchboard record; and a **30-minute sit-down with whoever actually answers
the phone**. Not a form, not an email — sit with them.
This is the most valuable number in the whole list and the one nobody keeps. If there is
no record, reconstruct the last 3 months honestly with the person who took the calls, and
label it in the case study as a reconstruction with a stated sample size.

**7. Where enquiries actually come from — the one question that decides the story.**
Where from: ask, directly. The question, verbatim: *"Of the last 20 enquiries, how many
found you online, and how many were introduced by someone?"*
Why this one matters most: if the answer is 18 of 20 were referrals, then a website
redesign **cannot honestly be sold as a lead-generation result**, and the case study has to
be about credibility, speed and how the firm looks when a referral checks them out. That is
still a real story. But you have to know which story you are in before you write it, and
you can only find out by asking now.

**8. Response time to enquiries.**
Where from: the inbox. Take the **last 20 enquiry threads**. For each, record the gap
between the inbound timestamp and the first outbound reply. Report the **median**, not the
average — one holiday weekend wrecks an average — and print the sample size.

**9. What the manual process actually was.**
Where from: sit next to the person who does it and **time it with a stopwatch, once, on a
real enquiry.** Do not ask for an estimate. Estimates inflate, and an inflated baseline is
the fastest way to blow up a case study built on honesty.
Record: who receives it, what they retype and into what, how many times the same
information is entered twice, and total minutes end to end.

**10. What it cost to run before.**
Where from: the client's own invoices and bank records — hosting, domain, any vendor
retainer, any ad spend, per year.
Needed for any ROI claim at all.

**11. One story about work lost.**
Where from: ask. *"In the last year, was there a job you did not get where the website
came up?"*
One concrete story out-persuades any percentage with this audience.

---

### (b) POST-LAUNCH

**At 48 hours — technical, and it protects everything else**

| Check | Where from |
|---|---|
| GA4 is actually firing on the new site | GA4 → **Realtime**. Open the site on your phone and watch yourself appear. |
| Sitemap submitted, no coverage errors, no 404 spike | Search Console → **Indexing → Pages** and **Sitemaps** |
| The enquiry form actually delivers | **Submit a real test enquiry and confirm it lands in the inbox.** This fails more often than anything else on this list. |
| New site speed / Core Web Vitals | PageSpeed Insights, **mobile** tab. Record score and date. |
| Old URLs redirect, nothing 404s | Search Console → Pages, plus manually check the top 10 old URLs from (a)5 |

Miss the first two and the entire 30- and 90-day dataset is worthless.

**At 2 weeks**

| Metric | Where from |
|---|---|
| Sessions, users, traffic by source | GA4 → Acquisition → Traffic acquisition, **comparison mode vs. same period last year** |
| Enquiries and their source | Inbox + phone log, counted the **same way** as baseline (a)6 |
| Indexing errors | Search Console → Indexing → Pages |
| Client's first reaction, verbatim | 10-minute call, recorded with permission |

Say in the case study that two weeks is too short to mean anything, and that you are
reporting it to catch breakage rather than to claim a result. That sentence buys you
credibility for the 90-day numbers.

**At 30 days**

| Metric | Where from |
|---|---|
| Sessions and organic sessions — vs. prior 30 days **and** vs. same 30 days last year | GA4 → Acquisition, comparison mode. **Run both.** The year-over-year one answers the seasonality objection an SME owner will actually raise. |
| Clicks, impressions, average position | Search Console → Performance, compare vs. previous 30 days. Note in the write-up that 30 days is early for ranking movement. |
| Enquiry count and source split | Inbox + phone log vs. baseline monthly average |
| Median response time | Inbox, same 20-thread method as (a)8 |
| Engagement rate and top landing pages | GA4 → Engagement → Pages and screens |
| Mobile share of traffic | GA4 → Tech → Tech details |

**At 90 days — this is the set the case study is actually built on**

| Metric | Where from |
|---|---|
| Organic search clicks, 90 days post vs. 90 days pre | Search Console → Performance, comparison mode. **The number that survives scrutiny.** |
| All 30-day metrics, re-run | As above |
| Enquiries, 90 days post vs. same 90 days last year | Inbox + phone log |
| **Quotes issued, and jobs won, traceable to a web enquiry** | The client's own quotation and invoice records. **This is the money number.** It needs your father's finance cooperation, which is why it gets skipped. Book that conversation this week, not in October. |
| Time per enquiry, re-timed | Same stopwatch, same process, same person as (a)9 |
| What they stopped doing entirely | Ask |

---

### (c) QUALITATIVE — gather in the first two weeks, while memory is fresh

**Two separate recorded interviews, 30 minutes each.**

1. Your father — the owner's view of why it mattered.
2. **Whoever answers the phone and handles enquiries.** This one matters more. The owner
   will be generous because he is your father. The staff member will be accurate.

Ask these, close to verbatim:

- "What did you tell people your website was, before?"
- "What was embarrassing about it?"
- "Did anyone ever complain about it? Who, and what did they say?"
- "What did you actually ask for when you asked for a new site?"
- "What is different about a Monday morning now?"
- "What still is not fixed?"

**Also collect, before the memory fades:**

- **One approved quote, two sentences, with full name, job title and company, in writing.**
  Anonymous testimonials are worth nothing. Get it in an email so it is on the record.
- Before/after screenshots — home page and mobile, side by side.
- A short screen recording or photo of the actual enquiry workflow. Capture the "before"
  version now if any part of it still runs.
- **The one thing that did not work.** Write it down in the first fortnight, while it still
  stings. In three months it will have been quietly forgotten, and it is the single
  highest-trust element in the finished document.

---

## 5. The credibility problem, unsoftened

### Read this first: the bigger problem is not your father

A website redesign is not AI enablement.

AC Wins sells *"find the one workflow worth automating, build it, prove the time and money
saved."* The Lofty engagement, as it stands, is a four-page brochure site. If you publish
it as the flagship proof of the AC Wins offer, you are proving you can build a website —
which is the thing `loftygroup.hk` and a hundred other Hong Kong shops already do, cheaper,
with 500 projects behind them. It proves the wrong capability, in a category where you have
no edge.

**The fix, and this is my recommendation, not a menu:** the enquiry-handling workflow you
are about to measure in section 4 is a real automation candidate sitting in plain sight.
Enquiry arrives, someone retypes it, someone replies late. Build that automation at Lofty
*now*, before you write anything. Then the case study is *"I fixed how a 30-year-old IT
firm handles its enquiries, and here is the clock time before and after"* — with the
website as the context, not the headline. That is the AC Wins offer, demonstrated, on the
exact process you already have a stopwatch on.

If you publish the website-only version, cap what it claims: it is evidence you deliver and
that you measure. It is not evidence of the thing you sell.

### Now the father problem

**A case study on your father's company is not proof. It is a demo.**

A prospect will assume, reasonably: unlimited access, unlimited patience, no commercial
pressure, no risk of being fired, and a client who was always going to say yes. Every one
of those assumptions is probably true. It does not make the work bad. It makes the work
**unfalsifiable as a commercial claim**, which is a different problem and a worse one for
a business whose entire pitch is "prove it before you scale it."

And it will come out. Hong Kong's IT market is small, the companies registry is public and
searchable, you share a surname, and any prospect who is seriously considering a
HK$15–20K/month retainer will spend ten minutes checking. If they find the relationship
after you did not disclose it, you lose the deal and the reputation, and you lose them
permanently. **The downside of concealment is catastrophic; the upside is trivial.**
Disclose.

### How to present it — concretely

**1. Disclose on the first screen, in one paragraph, without apologising.** Draft in
section 3. Not a footnote, not the last line, not "full disclosure" in grey 11px.

**2. Make every number checkable, and name its source in the document.** Disclosure is
neutralised by verifiability. A prospect cannot audit a stranger's client either — the
difference here is that you are showing your working while everyone else shows a logo wall.
Lean into it: *"I could not ask a stranger to let me publish this much detail."*

**3. Get a named quote from someone who is not your father.** The office manager, the
operations lead, the person who answers the phone. Full name and title. Your father's quote
is discounted to zero by any reader; a staff member's is not. This is the highest-leverage
single item in the whole pack.

**4. Publish the failures, in detail.** A father would let his son skip that section.
Publishing it is the clearest available signal that this is not a puff piece. Two or three
specific items, named.

**5. Say what it cost.** If the work was unpaid family work, then as published it proves
only that you will work free for family — it says nothing about the commercial offer.
Two acceptable routes, and I would take the second:
   - Invoice retroactively at your real rate and state the fee.
   - Write plainly: *"This was unpaid. The same scope carries a fee of HK$X."*

   What is not acceptable is leaving it silent. A case study with no price attached cannot
   support a price.

**6. Frame it as what it honestly is.** Not "our first client success". Try:
> *"I needed one company that would let me measure everything and publish all of it,
> including what went wrong. My father's firm said yes. Here is all of it."*

That framing turns the relationship from a thing you are hiding into the reason the case
study contains more evidence than anyone else's.

**7. Get an arm's-length second case study fast — this is the actual solution.** One
non-relative case study, even discounted or free-in-exchange-for-measurement, changes the
family one from *proof of nothing* into *proof of consistency*. Two case studies with the
same measurement discipline read as a method. One reads as a favour. Target: a real second
case by [date], and treat the Lofty write-up as unfinished until it exists.

   Where to find it: your father's own client list is the warmest referral surface you
   have, and a Hong Kong IT infrastructure firm's customers are almost exactly the AC Wins
   ICP. If Lofty introduces you to one of their commercial clients, that referral is
   arm's-length, warm, and comes with a working demonstration attached.

**8. Two rules for using it.** Never make it the only proof on the site. Never lead a cold
email with it — a family case study as the opening credential in a cold email reads as
having nothing else, which is currently true and does not need advertising.

---

## 6. Do this week

1. Confirm launch state and exact launch date. Deploy log, not memory.
2. Export Search Console, all of it, all four tabs. **The clock on this one is real.**
3. Export GA4 and check the data-retention setting.
4. Pull the old site from hosting backup or Wayback. Screenshot everything.
5. Sit down with whoever answers the phone. 30 minutes, recorded. Get the enquiry counts,
   the sources, and the stopwatch timing of the current process.
6. Ask the 20-enquiry question in (a)7 — it decides which story you are writing.
7. Reconcile the 1995 vs. 2015 registry discrepancy with your father.
8. Book the finance conversation for the 90-day revenue number now.
9. Decide whether you are building the enquiry automation at Lofty. My call: build it.
