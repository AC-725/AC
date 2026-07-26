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
