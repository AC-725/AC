# Research — finding stories and verifying numbers

Step 2 of the studio workflow lives or dies here. Every reel is anchored to one
real number, and the whole positioning is "no hype" — so a number that turns out
to be wrong, or lifted from a blog quoting a blog quoting nobody, costs more than
the reel was ever going to earn.

Two engines, two jobs: **Exa finds, Firecrawl extracts.** Reach for a browser only
when a page actually needs one.

| You have | You want | Use |
| --- | --- | --- |
| A theme, no story yet | Candidate stories | **Exa search** |
| A story, need the source | The actual text | **Exa fetch** |
| A tool's pricing/docs page | The numbers on it | **Exa fetch**, then Firecrawl if it comes back empty |
| A JS app, dashboard, or gated page | What a user would see | **Firecrawl scrape** |
| A whole docs site | Many pages | **Firecrawl map** → targeted scrapes |

## Finding the story (Exa)

Exa searches by meaning, so describe the *ideal page* rather than typing keywords.
This matters more than it sounds — keyword search returns SEO sludge, description
search returns the actual article.

```
mcp__Exa__web_search_exa  query="report with hard numbers on small businesses adopting AI agents in 2026"
mcp__Exa__web_fetch_exa   urls=["https://…","https://…"]  maxCharacters=8000
```

Queries that work for this page's beat:

- `"benchmark showing what AI coding assistants actually cost per seat"` — hunting a number
- `"teardown explaining why a company abandoned its AI rollout"` — hunting a contrarian angle
- `"launch announcement for a free AI tool aimed at non-technical users"` — hunting a TOD candidate
- Add `category:company` when researching the vendor behind a tool

Batch URLs into one `web_fetch_exa` call rather than looping — it's one round trip
instead of five.

## Verifying the number

The workflow asks for 1–2 credible sources and *matching their wording*. Concretely:

1. Search, then read the **primary** source — the report, the filing, the vendor's
   own page — not an article summarizing it. Exa's highlights are often enough to
   tell which result is primary.
2. `web_fetch_exa` the primary source and find the number in context. Note the
   qualifier: "40% of agent projects" is a different claim from "40% of enterprise
   agent projects," and the difference is exactly what a comment-section pedant
   will catch.
3. Find it a second time somewhere independent. Two outlets both citing the same
   press release is one source, not two.
4. If the number only exists in secondary coverage and no primary source is
   findable, that's a signal — pick a different story rather than a softer verb.

Match the source's wording on screen. Rounding "38.6%" to "nearly 40%" is fine;
turning "projected to reach" into "reached" is not.

## Deep research — when one pass isn't enough

Most days a search and a verify is the whole job. Escalate to a deep pass when:

- **The number is surprising or contested.** A stat that sounds too good is either
  the best hook of the week or a trap, and one search can't tell you which.
- **A tool is going to be Tool of the Day.** TOD tells people to go use something.
  Recommending vaporware, or a "free tier" that turns out to be a 7-day trial, costs
  the page more trust than one good reel builds.
- **The angle is "nobody's talking about this."** If the claim is that the obvious
  read is wrong, the obvious read has to be established first.
- **Planning a week or a series** rather than a single post.

If the Exa `search` skill is available it runs this as an orchestrated multi-agent
sweep and is the faster path. Everything below is the same method done by hand, and
it works with the plain MCP tools.

### 1. Filter the noise before deep-reading

Cheaper to discard a bad source than to read it. Disqualifiers:

| Signal | What it looks like |
| --- | --- |
| No skin in the game | Explains the thing, has never shipped the thing |
| Misaligned incentives | Vendor blog, sponsored post, affiliate-heavy roundup |
| Circular credentials | Only ever cited by others in the same bubble |
| **Positive-only advice** | No tradeoffs, no failure modes, "just use X" |
| Temporal decay | Moved from building to advising; check they still practise |

The fourth one is the important one here. Content with no downside discussed *is*
the hype this page exists to counter — so a source exhibiting it is not just weak
evidence, it's the thing being argued against.

**Practitioner vs commentator** is the distinction that matters most. Practitioners
ship and report what happened ("we ran this for a quarter, here's the bill").
Commentators write listicles about what practitioners did. One real practitioner
account beats five roundups.

### 2. Triangulate

Three searches, run when a claim actually carries the reel:

```
web_search_exa  query="<claim> independent results data"      # who else found this
web_search_exa  query="<tool/company> case study real numbers" # track record
web_search_exa  query="<tool/claim> criticism overrated problems limitations"
```

That third one is non-negotiable for a TOD pick. If a tool has *no* criticism
anywhere, it's usually too new to recommend rather than too good to criticise.

### 3. Synthesize

- **Lead with the finding.** The first line should carry the value on its own —
  same discipline as the reel itself.
- **Organize by theme, not by source.** "Source A says… source B says…" is notes,
  not research. "Two things are true: X, and despite it, Y" is an angle.
- **Surface disagreement rather than averaging it.** Where credible sources
  genuinely conflict, that gap is frequently the most interesting reel on the
  table — it's the contrarian-but-constructive hook, pre-made.
- **Carry confidence forward.** How many independent sources, how fresh, and
  practitioner or commentator. AC needs to know how hard he can lean on a number
  before it goes on screen at 200pt.

Deep research that ends in a confident wrong number is worse than no research —
it launders a guess into something that looks checked. If it stays uncertain after
a deep pass, say so and pick a different story.

## When a page needs a browser (Firecrawl)

`web_fetch_exa` handles ordinary pages. Escalate only when it returns empty,
truncated, or a "please enable JavaScript" stub — typically pricing pages built as
SPAs, interactive dashboards, or anything behind a cookie or age gate.

```bash
firecrawl scrape "<url>" --only-main-content -o .firecrawl/page.md
firecrawl scrape "<url>" --wait-for 3000 -o .firecrawl/page.md   # let JS settle
firecrawl scrape "<url>" --query "What does the paid tier cost?"  # ask, don't read
firecrawl map "<domain>"                                          # discover URLs
```

The CLI is the `firecrawl-cli` npm package (`npm i -g firecrawl-cli`) — plain
`firecrawl` on npm is something else and ships no executable. It needs
`FIRECRAWL_API_KEY` set: a keyless tier exists, but an unauthenticated run drops
into an interactive login prompt and hangs forever, which inside an agent loop
looks like a stall rather than an error.

For clicking, scrolling, or logging in, use the `firecrawl-interact` skill rather
than scripting it here.

## Competitor and Instagram research

Instagram, LinkedIn, and X serve a login wall to anything without a session
cookie. No amount of escalation gets past it — Exa fetch errors, Firecrawl renders
the wall faithfully, and scraping them breaks their terms of service anyway.

- **This page's own numbers** → Instagram's native Insights, or the Graph API.
  Real figures, permitted, no guessing.
- **What a competitor posted** → `web_search_exa`. Individual post and reel URLs
  are frequently indexed even when the profile page is not. A handle that returns
  nothing simply isn't indexed — new, private, or quiet — and more scraping won't
  change that.
- **What's trending in the niche** → search-first, and accept public-signal
  coverage instead of a complete engagement dump.

## If the network blocks you

Sandboxed environments often egress through a policy-enforcing proxy that denies
hosts outright. The tell is a `403` on CONNECT, or a bare `000` HTTP code, rather
than a timeout. The Firecrawl CLI can also surface `status code 405`, which looks
like an API error but means the proxy rejected a non-CONNECT request.

Check what's actually happening before assuming the tool is broken:

```bash
curl -sS "$HTTPS_PROXY/__agentproxy/status"
```

A 403 there is an organization policy denial. Report the blocked host and switch
approach — don't retry it, and don't try to route around it. In that situation the
Exa MCP tools usually still work, because the connector runs outside the sandbox;
plan on Exa carrying the research and Firecrawl being unavailable.

## Credentials

Never hardcode a key, never commit one, never echo one into output.

| Variable | Needed for |
| --- | --- |
| `EXA_API_KEY` | Direct `api.exa.ai` calls only — **not** needed for `mcp__Exa__*`, which authenticates through the managed connector |
| `FIRECRAWL_API_KEY` | Every non-interactive Firecrawl run. Format `fc-…` |

---

# The WOW gate — added 2026-08-24, and it is a HARD filter

**Why it exists.** On 24 Aug a board of four stories was put to AC. Every one was verified
to a primary source, every one carried a real number, and every one was *correct*. He
killed the whole board in one line: **"I want bigger and more wow news. This is too
informative for general users that don't keep in touch with AI."**

He was right, and the failure is worth naming precisely, because "verified" had been
doing all the work and "worth telling" had been doing none. The four were: an ad rollout,
an adoption survey, a maturity index, and an ROI survey. That is **trade news** — it
informs people already in the room. The replacement board led with a humanoid robot
beating Usain Bolt's 100m record and then crashing into a wall. Same verification bar,
completely different reach.

## The dinner-table test (run this FIRST, before verifying anything)

> **Would someone who does not follow AI repeat this out loud to another person?**

If the story needs a setup sentence explaining what the thing *is* before the news lands,
it is trade news. Kill it. Verification is what you do to a story that has already passed
this test — never the other way round. Verifying first is how a whole morning gets spent
sourcing four stories nobody would retell.

## The five wow ladders — a candidate must be on at least one

| Ladder | What it looks like | Why it travels |
| --- | --- | --- |
| **Impossible-made-real** | A machine did the thing people said needed a human | Breaks a belief the viewer holds |
| **Price collapse** | What cost $X now costs pennies | Money is legible to everyone |
| **Something you can SEE** | A robot, a video, a demo, a photo | Survives sound-off, survives the thumbnail |
| **A named human consequence** | One person gained or lost something real | Empathy is the #1 share emotion, ~3x anything else |
| **A number that breaks intuition** | Only when the unit is everyday — a year of work, a salary, a city's power | "38.6% of enterprises" is not this |

## The kill list — these do not reach AC's board on their own

Adoption surveys · percentage-of-businesses stats · maturity indices · ROI studies ·
pricing-tier changes · enterprise policy · developer tooling · compliance and regulation ·
funding rounds · model benchmark scores · partnership announcements.

Not because they are false — because they are **wallpaper to a non-specialist**. Any of
them may still ride along as scene C proof *under* a story that passed the gate. None of
them is the story.

**The meta-rule:** a story that only lands for someone who already follows AI has already
lost the audience this page is for.

## What this changes in the search layer

The first board failed partly because of *where* it looked. AI trade press surfaces trade
stories — that is its job. So:

1. **Sweep mainstream and wire desks FIRST** — Reuters, AP, BBC, CNN, Guardian, CBS, and
   the general-interest sections rather than the tech vertical. If Reuters ran it in
   *Sports* and CNN ran the video, that is a wow signal no AI newsletter will give you.
2. **Then check what actually travelled** — the story a mainstream outlet gave a video to
   has already passed the dinner-table test with a real audience.
3. **Treat AI trade press as CORROBORATION, not discovery.** It is where you confirm the
   number, not where you find the story.
4. Phrase the semantic query for the *reaction*, not the topic: "AI story that went viral
   with the general public this week" beats "AI news August 2026".

## Then, and only then, verify

Everything above this line is selection. Everything in the rest of this file is
verification, and none of it is relaxed: a wow story with a soft number is worse than a
dull one, because it will actually be seen. Open the primary page before any figure
reaches a render (the standing rule from Day 38). Where two outlets place the same figure
at different events, put the better-sourced one on screen and leave the other off
entirely — that is what happened with the 9.32s / 9.39s split on the Bolt story.

---

# The morning shortlist — rebuilt 2026-08-24 to gauge views, not just verify facts

The ~6:45am HKT scheduled run used to deliver "3-5 verified candidates." On 24 Aug that
output was rejected wholesale: every candidate was true and none was worth telling. The
brief below replaces it. **The shortlist's job is to predict reach, not to prove accuracy** —
accuracy is the floor, not the product.

## What the run does now, in order

1. **Sweep for reaction first.** Mainstream and wire desks before any AI vertical —
   Reuters, AP, BBC, CNN, Guardian, CBS, plus general-interest and video sections. Query
   for the reaction ("AI story the general public shared this week"), not the topic.
2. **Apply the WOW gate above.** Anything that fails the dinner-table test is dead on
   arrival, however well sourced. Anything on the kill list is dead as a lead story.
3. **Only then verify** the survivors to primary sources, per the rest of this file.
4. **Score each survivor for predicted views** on the card below, and rank by it.
5. Deliver **3 candidates, ranked, with the score visible**, plus one line naming what was
   killed and why — so AC can see the gate working rather than trust it blindly.

## The view-gauge card (score each candidate /10 before it reaches the board)

| Pts | Row |
|---|---|
| 3 | **Wow ladder** — on one of the five (3), arguably on one (1), on none (0). This row alone can kill a candidate. |
| 2 | **Retells in one sentence** with no setup sentence required |
| 2 | **Sendable to a NAMED person-type** with a motive (Gift / Mirror / Idea / Gossip / Mood) |
| 1 | **Visible** — there is a picture, a video, or a thing the reel can SHOW |
| 1 | **Same-week**, ideally same-day |
| 1 | **Has a business read** under the headline that AC can land in one line |

Below 7 it does not reach the board. A 10 that cannot be verified to a primary source is
still dead — the gate selects, verification decides.

## Worked example, the run this brief came from

- **Robot beats Usain Bolt** (Beijing, 22 Aug) — wow 3 (impossible-made-real + you can
  see it), retells 2, sendable 2 (Gossip AND Gift, both directions), visible 1, same-week
  1, business read 1 = **10/10.** Shipped.
- **ChatGPT ads reach 31 markets** — wow 0 (policy/pricing), retells 1, sendable 1,
  visible 0, same-day 1, business read 1 = **4/10.** Killed, and it had been the
  recommended pick under the old brief. That gap is the whole reason this card exists.
