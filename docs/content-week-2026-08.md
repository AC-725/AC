# Content week — research shortlist
**@itsac.ai · week of 2026-08-01 → 2026-08-07 · compiled 2026-07-31**

Research only. No hooks rendered, no video, no graphics. Every number below was
chased to a primary or near-primary source and cross-checked. Four candidates were
dropped on verification or duplication grounds — they are listed at the bottom with
the reason, because knowing what failed is part of the deliverable.

**Tooling note:** Exa MCP is unauthenticated and the session's egress proxy 403s
direct page fetches (WebFetch and curl both blocked on nber.org, stlouisfed.org,
census.gov, openai.com). Verification was done with domain-pinned search against the
primary host, plus one independent cross-check per number. Where I could only get a
figure through a search index rather than reading the page myself, it is flagged
**[index-read]** so AC knows how hard he can lean on it.

**Pillar spread:** Big Picture · Real Talk · The Shift · For Small Business ·
Austin's Take · Tool of the Day ×2.
**Format mix:** 5 AI News (~11.7s) · 2 Tool of the Day (~31.6s).

**Rotation check against `run-log.md`:** nothing here overlaps Day 17 (Meta business
agents), Day 16 (Microsoft FY26 Q4), Day 15 (Bluevine SMB trends), Day 14 (Cloudflare
bot traffic / Andrew Ng), Day 11 (SBE Council hours saved) or Day 8 (Thryv 66%).
Theme rotation says `crest` is the longest unused News look.

---

## Day 1 · The Big Picture · AI News

**Story.** Workplace AI adoption is not creeping any more. In a single quarter, the
share of US employees saying their own employer has actually integrated AI jumped six
points.

**The number.** **41% → 47% in one quarter.** Gallup's exact wording: "Forty-seven
percent of U.S. employees now say their organization has integrated AI tools to
improve productivity, efficiency or quality, up from 41% in the last quarter." Same
report: "More than half of U.S. workers (52%) now use AI in their role," with 30%
using it a few times a week or more and 15% daily.

- Primary: Gallup, *Organizational AI Adoption Jumps Six Points*, 20 Jul 2026 —
  https://www.gallup.com/workplace/712736/organizational-adoption-jumps-six-points.aspx
- Independent cross-check: U.S. News, 21 Jul 2026 —
  https://www.usnews.com/news/national-news/articles/2026-07-21/survey-more-than-half-of-u-s-employees-now-use-ai-at-work

Confidence: **high.** Gallup is the primary, the six-point move is in the report's own
title, and the 52% is independently reported. Wire coverage (ABC/AP) exists too.

**AC's angle.** The obvious take is "52%, we've hit the tipping point, everyone's on
board." Wrong emphasis. The interesting number is not the level, it's the *slope* —
six points in ninety days, measured inside companies, by the people doing the work.
Levels let you feel late. Slopes tell you how long the window stays open. The
constructive read: six points a quarter means the thing you're deciding about this
month will be table stakes by Christmas, so stop pricing the decision as if you have a
year. Do not run this as "you're behind" — run it as "this is the last quarter where
starting still counts as early."

**Algorithm read.** This is a *send*, not a save. Employee → manager, and manager →
peer manager, with "see, I told you." The share trigger is the quarter-over-quarter
jump: it gives someone who has been losing an internal argument a dated, named,
non-vendor number to end it with. Gallup as the source is half the shareability —
nobody argues with Gallup the way they argue with a software company's blog.

**Draft hook.** `AI adoption at work just moved 6 points in 90 days. Gallup counted
41% to 47%.`
**Grade: A.** Payoff first, topic clear inside four words, two real numbers, a named
credibility anchor, nothing to cut, no ambiguity. Only nit is that "6 points" needs the
"of what" which the second line supplies immediately.

---

## Day 2 · Real Talk / Myth-Bust · AI News

**Story.** Every adoption stat on the internet says two-thirds to three-quarters of
small businesses use AI. The US Census Bureau, which asks about 1.2 million businesses,
puts it under 20% — and it has barely moved in six months.

**The number.** **Between 17% and 20%.** Census wording: overall AI usage "hovered
between 17% and 20%" across the December 2025 to May 2026 period, with 20% to 23% of
businesses expecting to use it within the next six months. By firm size: 37% of firms
with at least 250 employees, 32% of firms with 100 to 249 employees, and **less than
20% of firms with four or fewer employees**, for the collection period ending 3 May
2026. Sector spread: 39.7% in Information, 33.9% in Finance and Insurance, against a
national rate of 19.8%.

- Primary: U.S. Census Bureau, *Large Firms With at Least 20 Employees Biggest AI
  Users*, May 2026 — https://www.census.gov/library/stories/2026/05/ai-use-businesses.html
- Underlying data: Business Trends and Outlook Survey (BTOS) —
  https://www.census.gov/programs-surveys/btos.html
- Independent cross-check: Digital Watch Observatory —
  https://dig.watch/updates/us-census-bureau-reports-higher-ai-adoption-among-larger-firms

Confidence: **high.** Government primary, biggest sample in the field, and the range
wording is consistent across both reads. **[index-read]** on the exact sentence.

**AC's angle.** This is the page's whole positioning in one post, and it costs AC
something to run it, which is exactly why it works. He has posted 66% (Thryv) and 74%
(Bluevine). Those aren't lies — they're *self-selected online panels of business owners
who agreed to answer a survey about AI*. The Census asks a random national sample and
gets under 20%. The contrarian-but-constructive read is not "the stats are fake," it is
**"you are not as behind as the internet is telling you."** The 70% number is
manufacturing urgency; the 20% number is the actual competitive landscape, and in that
landscape one working automation still makes you unusual. Close on the rule: when a
number makes you feel behind, check who was asked.

**Algorithm read.** Highest save-and-comment candidate of the week. Saves because it is
a permission slip people want to keep. Comments because half the audience will type
"finally someone said it" and the other half will argue the methodology, and Instagram
does not care which. Sends go owner → owner in group chats where somebody has been
posting AI panic. The self-correction ("I've posted the 66% number myself") is the
credibility move — do not cut it to save runtime.

**Draft hook.** `Everyone says 70% of businesses use AI. The US Census Bureau says
under 20%.`
**Grade: A.** Maximum contrast on a topic the audience is emotionally invested in,
zero ambiguity, two numbers, an unimpeachable source named in frame one, six words to
the payoff. This is the strongest hook on the sheet.

---

## Day 3 · The Shift · AI News

**Story.** The people who reach your website through an AI chatbot used to be the worst
traffic you got. As of May 2026 they are the best.

**The number.** **54% higher conversion.** Adobe's wording: in May 2026, AI-referred
retail visitors converted at a rate **54% higher than non-AI traffic** — "a reversal
from last year, when conversion rates from AI sources were nearly half as much as those
from non-AI sources." Supporting scale: retail saw a 138% year-over-year increase in AI
visit share, and AI-referred traffic to retail sites has grown 1,324% since October
2024, when Adobe began tracking it. Basis: more than 1 trillion visits to US retail
sites.

- Primary: Adobe Digital Insights, *Q3 AI Traffic Trends Report*, June 2026 —
  https://business.adobe.com/resources/sdk/q3-ai-traffic-trends-report.html
- Primary commentary: Adobe, *AI traffic grows but retail sites lag in AI search
  visibility* — https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable
- Independent cross-check: Digital Commerce 360, 17 Jun 2026 —
  https://www.digitalcommerce360.com/2026/06/17/adobe-ai-referred-traffic-to-retail-sites-doubles-in-a-year/

Confidence: **high** on the 54% and the reversal. Note the qualifier hard: this is
**US retail sites**, not all websites, and it is Adobe's own analytics panel. Say
"retail" on screen. **[index-read]** on the PDF itself.

**AC's angle.** The default take is the doom one everyone has been repeating for a year:
AI is eating your search traffic, fewer clicks, the open web is dying. That story is
about *volume* and it is basically true. It is also the wrong thing to optimise. The
number nobody quotes is the *quality* flip — fewer people arrive, and the ones who do
are already sold, because the AI did the comparison shopping before it handed them over.
Constructive close: stop grieving the traffic you lost and start checking whether the
machine can actually read your site. Adobe's companion finding is that retail homepages
score an average 75% on machine readability and product pages only 66% — the AI is
trying to recommend you and half your pages are unreadable to it. That is a Monday job,
not a strategy offsite.

**Algorithm read.** Save-heavy, with sends into marketing and e-commerce circles. This
one earns its reach by *contradicting a take the audience already holds* — everyone has
seen the "AI killed my traffic" post, nobody has seen the reversal. Anyone who runs a
shop sends it to whoever manages their website. Strong comment bait: "check your own
analytics and tell me what you see."

**Draft hook.** `Visitors who arrive from AI now convert 54% better than everyone
else. Last year they converted half as well.`
**Grade: A-.** Payoff first, huge contrast, two real numbers, plain English. The one
nit: two numbers in a single hook slightly splits the frame, and "retail" has to land
in the very next beat or a pedant catches it. Tighten to the first sentence on screen
and put the flip in scene B if it feels crowded.

---

## Day 4 · For Small Business · AI News

**Story.** A real accounting firm told the Federal Reserve that AI raised its output
capacity by 30% to 40%. Nobody got fired. A planned hire simply never happened.

**The number.** **30% to 40% more output capacity.** St. Louis Fed wording: an
accounting firm reported that AI "increased output capacity by 30% to 40%, reducing the
need for a planned staff expansion." On staffing across all respondents: **49% expect no
noticeable staffing effect during the next 12 months**, nearly 20% anticipate a slight
reduction in staffing needs, and 18% expect skill changes rather than headcount changes.
Adoption context from the same survey: 34% of firms say a small share of employees use
AI tools regularly, 25% say AI tools are being tested or piloted but not used regularly.

- Primary: Federal Reserve Bank of St. Louis, *New Survey Findings on AI Adoption in the
  Eighth District*, July 2026 (Gutkowski, Gascon, Silvanus; special questions in the
  quarterly Eighth District Economic Conditions Survey, May 2026 wave) —
  https://www.stlouisfed.org/on-the-economy/2026/jul/new-survey-findings-ai-adoption-eighth-district
- Survey home: https://www.stlouisfed.org/research/economic-conditions-survey-results
- Catalogue cross-check: Fed in Print — https://fedinprint.org/item/l00001/103542

Confidence: **high** on provenance (Federal Reserve, this month). Two qualifiers AC must
respect on screen: it is **one firm's self-report inside a regional Fed survey**, not a
measured study, and it is the **Eighth District**, not the whole US. Frame it as "a firm
told the Fed," never "the Fed found." **[index-read]**.

**AC's angle.** Everyone argues about whether AI takes jobs. This is the first
concrete, government-collected answer for a *small professional services firm*, which is
exactly AC's client shape, and it is neither of the two takes people are shouting. It
didn't cut staff. It cancelled a hire. That is a much more interesting outcome, because
it is invisible: no layoff announcement, no headline, just a job that quietly stops
existing while everyone at the firm keeps theirs and does more. The constructive read for
an SMB owner: the first return on AI is almost never a payroll cut, it is **the hire you
no longer need to make**, and that is a number you can actually put on a page — the
salary you didn't spend. Contrast it with the 49% who expect no staffing effect at all:
most firms will feel nothing, because most firms are still piloting.

**Algorithm read.** Sends from owner → business partner or spouse, and from accountants
to other accountants (this is *their* industry in the example, which massively raises
send rate inside a profession that never sees itself in AI content). Saves as ammunition
for a budget conversation. The "cancelled hire, nobody fired" frame is the shareable
idea, because it defuses the fear without lying about it — nobody has to feel like a
villain for sharing it.

**Draft hook.** `AI raised one accounting firm's output 30 to 40%. Nobody got fired.
They just stopped hiring.`
**Grade: A.** Concrete-image opener, real number in the first six words, and the
second and third lines close a curiosity loop most viewers didn't know they had. Plain
speech, no jargon, nothing to cut. Credibility anchor (Federal Reserve Bank of St.
Louis, July 2026) goes on the chip directly under it.

---

## Day 5 · Austin's Take · AI News

**Story.** For the first time in nearly 25 years, the FBI's annual internet crime report
has a section on AI. It accounts for 22,364 complaints and nearly $893 million.

**The number.** **Nearly $893 million.** FBI wording: "For the first time in its nearly
25-year history, the IC3 report features a section on artificial intelligence, which
accounts for 22,364 complaints, costing Americans nearly $893 million." Context from the
same report: IC3 received 1,008,597 total complaints in 2025 (up from 859,532 in 2024)
and cyber-enabled crime cost Americans nearly $21 billion overall. The FBI describes the
tactics plainly: short audio clips cloning a loved one's voice to fake a crisis and
demand money, and AI-generated video of public figures used to prop up investment scams.

- Primary: FBI press release, *Cryptocurrency and AI Scams Bilk Americans of Billions* —
  https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions
- Primary document: 2025 IC3 Annual Report (PDF) —
  https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf
- Standing FBI guidance on the tactic: IC3 PSA, *Criminals Use Generative Artificial
  Intelligence to Facilitate Financial Fraud* — https://www.ic3.gov/PSA/2024/PSA241203

Confidence: **highest of the week.** Law-enforcement primary, exact complaint count, and
the "first time in nearly 25 years" framing is the FBI's own, not a journalist's.

**AC's angle.** This is the one day of the week AC is not talking about tools, and it
should read that way. The lazy version of this post is fear — deepfakes are everywhere,
be terrified. The honest version is that the defence is embarrassingly low-tech: the
entire attack depends on urgency, so the counter is a rule, not a product. One sentence,
agreed with your finance person today: *no money moves on a voice or a video, ever, until
someone calls back on the number already saved in the phone.* That is the whole post.
It costs nothing, it takes five minutes, and it is the single highest-return AI decision
most traditional businesses will make this year — which is a genuinely contrarian thing
to say on a page that spends six days a week on adoption. Anti-hype cuts both ways: AC
should refuse to hype the threat too. 22,364 complaints against a million total is about
2%. Small, growing fast, and cheap to defend against.

**Algorithm read.** The week's biggest *send* by a distance, and the one most likely to
travel outside the existing audience. People forward fraud warnings to family, not just
to colleagues — parents, the finance person, the office manager. Give them a single
sentence they can copy into WhatsApp and it goes further again. Saves are high because
it is a rule people intend to actually implement. The "first time in 25 years" line is
the detail that makes it feel like news rather than a scare post.

**Draft hook.** `AI scams cost Americans nearly $893 million last year. The FBI just
gave them their own chapter.`
**Grade: A.** Payoff first, exact figure matching the source's own "nearly," and the
second line is a genuine curiosity loop with a credibility anchor built in. Clear on
first listen, no jargon, nothing to trim.

---

## Day 6 · Tool of the Day · ~31.6s

**Tool.** **Gemini Notebook** (the product formerly called NotebookLM) —
https://notebooklm.google.com · renamed 16 Jul 2026.

**Verified real, verified free.** Google's own announcement confirms the rename: "NotebookLM
is now Gemini Notebook," same standalone product, existing notebooks carry over untouched,
now with a secure cloud computer for running code and syncing across the Gemini app and
Google Search. Google's own usage figure, verbatim: "more than 30 million people and over
600,000 organizations are using it to transform how they work, from business owners
creating interactive onboarding materials to students converting notes into audio and
video summaries."

**Free tier, from Google's own help pages (not a review site):** 100 notebooks · up to
**50 sources per notebook**, 500,000 words each · **50 chat queries a day** · **3 audio
generations a day**. Works on any Google account. Paid tiers exist (Google AI Plus and
above raise every limit, e.g. 100 sources per notebook) but the free tier is a
permanent tier, not a trial.

- Rename + usage figure: https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/
- Free-tier limits: https://support.google.com/gemininotebook/answer/16213268
- Audio Overviews: https://support.google.com/gemininotebook/answer/16212820
- Sources and file types: https://support.google.com/gemininotebook/answer/16215270

**Criticism pass (required for TOD, and it passes).** Real, findable limitations, which
per the research standard is a good sign rather than a bad one: it cannot search the web,
so it only knows what you upload — that is the *feature* that stops it inventing facts,
but it means no outside context. You can only work inside one notebook at a time, so no
cross-referencing between notebooks. Google's own community forums carry a live
hallucination complaint thread about the Notebooks feature inside the Gemini app (a
different surface from the standalone product — worth AC not conflating the two).
Nothing here is a reason not to recommend it; all of it is worth 3 seconds on screen.

**AC's angle.** The obvious pitch is "AI that summarises documents," which sounds like
every other tool and lands on nobody. The sharper one: **this is the only mainstream AI
tool that is not allowed to make things up**, because it can only answer from the files
you gave it. For a traditional business sitting on twenty years of contracts, supplier
terms, SOPs and an operations manual nobody has read since 2019, that constraint is the
entire value. The demo that sells it is not a summary — it is asking a question you
already know the answer to, and watching it cite the page. Concrete use he can show:
drop in the supplier agreement, ask "what is our notice period and what happens if we
miss it," get the answer with the clause attached. Honest caveat on screen: 3 audio
overviews a day on free, and it genuinely cannot look anything up outside your files.

**Algorithm read.** Classic save-then-do. TOD's job is to send people off to actually
use something, and this one has near-zero activation cost: any Google account, no card,
no install. Sends go from the person who has to read the documents to the person who
wrote them. The "30 million people are already using this and you haven't heard of it"
angle drives the comment section, and the rename is a small news peg that makes the day
feel current rather than evergreen.

**Draft hook.** `Upload your 80 page supplier contract. Get an audio breakdown of it.
Free, 3 times a day.`
**Grade: A.** Instant value promise in the first line, concrete and visual, plain
English, and the "3 times a day" is doing real work — it is a specific number *and* it
signals honesty about the limit in the same breath, which is the whole brand. Topic is
clear immediately. Nothing to cut.

---

## Day 7 · Tool of the Day · ~31.6s

**Tool.** **Opal** by Google Labs — https://opal.google · no-code AI mini-app builder.

**Verified real, verified free, verified live.** Launched 24 Jul 2025 in the US;
expanded to **more than 160 countries**; now also surfaced inside the Gemini web app as
a way to create experimental Gems; gained an "agent step" in Feb 2026 that picks its own
tools and models for a stated goal. You describe the tool you want in plain English and
Opal chains prompts, models and tools into a visual workflow you can run and share. It
writes no code at all — it wires steps together, which is why non-technical people can
actually finish something in it.

- Launch: https://developers.googleblog.com/en/introducing-opal/
- 160+ country expansion: https://blog.google/technology/google-labs/opal-expansion-160/
- Agent step update: https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-agent/
- In the Gemini app: https://blog.google/innovation-and-ai/models-and-research/google-labs/mini-apps-opal-gemini-app-experiment/
- Help page: https://support.google.com/gemini/answer/16802014

**Pricing:** free. It is a Google Labs experiment with no subscription tiers and no
published credit limits; usage still falls under Google's general AI usage and Gemini
model limits. Google has **not** committed to a future pricing model — say that out loud
rather than implying free forever.

**Criticism pass (required for TOD — read this before shooting).** Substantial and real.
It is a Labs experiment, so features and availability can change without notice. It is
not suitable for anything business-critical: no authentication, no external API, no
audit logs, no version control, limited integrations outside Google's own ecosystem.
Desktop editing only, English-first. Practitioner reviews report it confidently
presenting outdated information as current and occasionally fabricating plausible
details. The consistent verdict from people who actually used it: **prototypes, not
production.** That caveat is not a footnote here, it is a required beat in the video.

**Availability caveat for AC personally:** the "160+ countries" figure is Google's, but
I could not find a published country list confirming **Hong Kong**. Before he films,
open opal.google on a HK connection and check. If it's blocked locally the reel still
works for the global audience, but he should not say "you can use this today" to a room
of HK owners without having loaded it himself.

**AC's angle.** The obvious pitch — "build an app with no code!" — is exactly the hype
this page exists to counter, and it will get him a wave of people who try to run their
business on a Labs experiment and blame him in six weeks. The better pitch is smaller and
truer: **stop buying software to find out whether you need it.** Most SMB tool spend is
guesswork, because you cannot know if a workflow is worth automating until you have
watched it run. Opal makes the ten-minute throwaway version, so you find out for free
before anyone signs anything. Frame it as a *decision tool*, not a build tool. That
reframe is what makes it AC's post rather than a Google ad, it maps exactly onto his
Listen → Pinpoint → Build → Prove model, and it makes the "prototypes only" limitation a
feature of the argument instead of a disclaimer at the end.

**Algorithm read.** Saves over sends — this is a "when I have an hour" tool, and people
save it against a specific annoying task they already have in mind. Comments come free
if he ends by asking which task people would throw at it, which doubles as lead-gen
research for AC Wins. Sends go to the person in the business who "is good with
computers." Slightly narrower reach than Day 6 because the activation cost is higher, so
this is the right slot for it: the low-friction tool day carries the week, this one goes
deeper with the people already leaning in.

**Draft hook.** `Describe the tool you wish your business had. Google's Opal builds
it. Free, in over 160 countries.`
**Grade: A-.** Clear instant value promise, plain English, real number, no jargon, and
the payoff is stated rather than teased. Two nits keeping it off an A: "builds it" is
doing slightly more work than the product delivers (it builds a workflow, not an app you
can ship), and the number lands third instead of second. If AC wants the A, swap in a
concrete example object in line one — "the tool you wish existed for quoting jobs" — and
the specificity climbs.

---

## Dropped — did not survive verification or duplication check

| Candidate | Number | Why it's out |
|---|---|---|
| Anthropic Economic Index — augmentation vs automation | "Augmentation 52% has overtaken automation 45%" | **Verification failure.** Widely repeated by secondary sites, could not be confirmed on anthropic.com. Domain-pinned search of the Economic Index reports returned a different figure (57%, from the older Claude 3.7 Sonnet report) and no 52/45 split. Exactly the "blog quoting a blog" pattern. Do not run it. |
| Bick, Blandin & Deming — genAI time savings | "5.4% of work hours, roughly 2.2 hours per week" | **Dropped on two counts.** The underlying survey waves are 2024 vintage despite the July 2026 FRED news peg, and the figure directly contradicts the ~16.5 hrs/week SBE Council number AC already posted on Day 11. Reversing his own number needs a deliberate correction post, not a casual Tuesday reel. |
| SMB "AI tool sprawl" spend | "$3,000–$6,000/month on 10 disconnected AI tools" | **Verification failure.** Every trace leads to SEO content marketing with no survey, no sample, no primary. The "15-person agency paying $5,200/month" anecdote is unsourced. Great story, no evidence. |
| Goldman Sachs 10,000 Small Businesses | 76% use AI, only 14% fully embedded in core operations | **Verified fine, killed on duplication.** goldmansachs.com press release, n=1,256, fielded 27 Jan–4 Feb 2026. But launch-week Day 6 already ran "68% of small businesses use AI. Only 15% actually have a plan for it." Same structure, same gap, near-identical numbers. Reposting it looks like the page has one idea. |
| Gartner — agentic AI project cancellations | "Over 40% of agentic AI projects cancelled by 2027" | **Already used.** Launch-week Day 4 ran it verbatim, credited to Gartner. |
| Pew Research — AI Overviews click-through | 8% click rate with an AI summary vs 15% without | **Stale.** Fieldwork is March 2025 browsing data. Over a year old and exhaustively covered. Day 3's Adobe story is the fresher, more contrarian cut of the same theme. |

## Bench — verified, not slotted this week

**NBER w34836, *Firm Data on AI*** (Yotzov, Barrero, Bloom et al., Feb 2026). Survey of
nearly 6,000 senior executives across the US, UK, Germany and Australia: 69% of firms
actively use AI, yet **89% of executives report no impact on labour productivity (sales
per employee) over the past three years**, and more than 90% report no impact on
employment. Executives forecast a 1.4% productivity gain over the next three years.
Sources: https://www.nber.org/papers/w34836 ·
https://www.nber.org/digest/202605/global-evidence-business-use-ai

Verified and strong, held back for two reasons: it is a second myth-bust in a
seven-day window alongside Day 2's Census story, and February is old for the News format.
It is the natural anchor for a standalone "does any of this actually work" post, or the
proof slide in a carousel built on Day 2. Note the qualifier carefully if used — it is
*large-firm executives* reporting at *firm level*, which is precisely why small operators
can beat it, and that is the post.
