---
name: web-scraping
description: |
  Get information off the web by routing each job to the right engine: Exa for semantic search (finding pages by meaning when you don't know the URL) and Firecrawl for extraction from JavaScript-heavy pages, SPAs, and multi-page crawls. Use when asked to research a topic, find sources, scrape or crawl a site, pull content from a URL, extract structured data from pages, or when a plain fetch returned an empty shell because the content renders client-side.
---

# Web scraping

Two engines, two different jobs. Picking wrong is the main failure mode, so start here.

| You have | You want | Use |
| --- | --- | --- |
| A topic, no URLs | Find the right pages | **Exa search** |
| A URL, static HTML | The text | **Exa fetch** (cheaper, no key) |
| A URL, JS-rendered | The text | **Firecrawl scrape** |
| A URL, need clicks/scroll/login | The text behind the interaction | **Firecrawl interact** |
| A domain | Every URL on it | **Firecrawl map** |
| A domain | Content from many pages | **Firecrawl crawl** |

The short version: **Exa finds, Firecrawl extracts.** Reach for Firecrawl only when the page needs a browser.

## Exa — semantic search

Exa searches by meaning, not keywords. Describe the *ideal page*, don't type search terms.

```
mcp__Exa__web_search_exa   query="blog post benchmarking Postgres vs SQLite for embedded workloads"
mcp__Exa__web_fetch_exa    urls=["https://…", "https://…"]   maxCharacters=8000
```

- Write queries as descriptions: `"teardown explaining why X failed"` beats `"X failure"`.
- `category:people` / `category:company` narrows to LinkedIn-style profiles and org pages.
- Batch URLs into one `web_fetch_exa` call rather than looping.
- Search returns highlights. If they're too thin to answer with, follow up with `web_fetch_exa` on the best 2-3 URLs — don't guess from snippets.

`web_fetch_exa` handles ordinary pages fine. Escalate to Firecrawl only when it comes back empty, truncated, or full of "enable JavaScript".

## Firecrawl — JS-heavy pages

Firecrawl runs a real browser, so it sees what a user sees. Provided by the `firecrawl` plugin, driven by the `firecrawl` CLI.

```bash
firecrawl scrape "<url>" --only-main-content -o .firecrawl/page.md
firecrawl scrape "<url>" --wait-for 3000 -o .firecrawl/page.md   # let JS settle
firecrawl scrape "<url>" --query "What is the enterprise price?"  # ask, don't read
firecrawl map "<domain>"                                          # discover URLs
firecrawl crawl "<domain>" --limit 50 -o .firecrawl/
```

Reach for the dedicated plugin skills for anything beyond a plain scrape: `firecrawl-interact`
(click, type, scroll), `firecrawl-crawl`, `firecrawl-map`, `firecrawl-parse` (PDFs),
`firecrawl-agent` (autonomous multi-source gathering). `firecrawl-cli` documents the full surface.

Signs a page needs Firecrawl rather than Exa fetch:

- The fetched body is a near-empty `<div id="root">` or `__NEXT_DATA__` blob
- Content appears only after scroll, a click, or a cookie/age gate
- The URL is a dashboard, feed, or search-results page rather than a document

## Escalation ladder

Work down it and stop as soon as you have the answer — each rung costs more time and credits than the last.

1. `web_search_exa` — often enough on its own; highlights answer many questions outright
2. `web_fetch_exa` on the best results — full text, no browser
3. `firecrawl scrape` — when a page needs rendering
4. `firecrawl map` then targeted scrapes — when you need many pages but not all of them
5. `firecrawl crawl` — last resort; it's the slowest and most expensive rung

## Credentials

Both keys come from the environment. Never hardcode one, never commit one, never echo one into
output or a log.

| Variable | Needed for | Notes |
| --- | --- | --- |
| `EXA_API_KEY` | Direct `api.exa.ai` calls only | **Not** needed for `mcp__Exa__*` — those authenticate through the managed connector |
| `FIRECRAWL_API_KEY` | All Firecrawl calls | Format `fc-…`. Without it every `firecrawl` command fails |

Set them under Environment variables in the Claude Code web environment settings so the
SessionStart hook and CLI both see them.

## Network policy

Remote sessions egress through a policy-enforcing proxy. At the time this skill was written,
`api.exa.ai` and `api.firecrawl.dev` were both denied (403 on CONNECT).

What that means in practice:

- **Exa via `mcp__Exa__*` works** — the connector runs outside this container, so the block doesn't apply
- **Direct `curl https://api.exa.ai/…` fails**, even with a valid `EXA_API_KEY`
- **The `firecrawl` CLI fails**, because it calls `api.firecrawl.dev`

So in a locked-down session, prefer the Exa MCP tools and expect the Firecrawl rungs to be
unavailable. A 403 on CONNECT is an organization egress-policy denial: report the blocked host,
don't retry it and don't try to route around it. Getting Firecrawl working requires allowing
`api.firecrawl.dev` in the environment's network policy — that's a settings change, not
something to work around in code.
