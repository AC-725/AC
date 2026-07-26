# @ac.wins — Instagram & Business Deep Research

Deep research into Instagram growth and business strategy for **AC — AI in Plain
English** (`@ac.wins`, `ac-wins.com`): AI education and consulting for normal
(non-tech) businesses, Hong Kong → worldwide.

Run with the Deep-Research workflow (research → research-deep → research-report)
on 2026-07-25.

## Start here

**[EXECUTIVE-SUMMARY.md](./EXECUTIVE-SUMMARY.md)** — the findings that change what
you do, a 30-day plan, and a monthly scorecard. Read this one.

## Files

| File | What it is |
|---|---|
| `EXECUTIVE-SUMMARY.md` | Synthesis, recommendations, 30-day plan, scorecard |
| `report.md` | Full generated report — all 18 items, all fields |
| `outline.yaml` | The 18 research items and execution config |
| `fields.yaml` | 22-field research framework |
| `results/*.json` | Raw structured findings, one file per item |
| `generate_report.py` | Rebuilds `report.md` from `results/` |
| `validate_json.py` | Field-coverage validator |

## What was researched

**Competitors (6)** — God of Prompt, Ole Lehmann / AI Solopreneur, Rowan Cheung /
The Rundown AI, Zain Kahn / Superhuman AI, the 2026 AI-education creator
landscape, Liam Ottley's Skool/AAA community model.

**Platform mechanics (6)** — 2026 algorithm and ranking signals, Trial Reels, the
Edits app, Instagram SEO and Google indexing, format/engagement benchmarks, and
Meta's AI-content labeling and originality policies.

**Growth tactics (4)** — DM automation and WhatsApp funnels, the creator-to-client
funnel and interactive lead magnets, LinkedIn founder-led marketing, bilingual
EN + 繁體中文 strategy for Hong Kong.

**Market demand (2)** — SMB AI adoption in Hong Kong and APAC, and the corporate/SME
AI training workshop market and its pricing.

## Reproducing

```bash
python3 validate_json.py -f fields.yaml -d results   # 18/18, 100% coverage
python3 generate_report.py                            # rebuild report.md
```

## Notes

- Values the researchers could not verify are marked `[uncertain]` in the JSON and
  listed in each file's `uncertain` array; `report.md` omits them.
- `ac-wins.com` could not be fetched — this environment's network policy blocked
  the domain. Website recommendations are grounded in the brand protocol and
  research rather than the live page.
