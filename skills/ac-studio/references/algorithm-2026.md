# Instagram algorithm 2026 — what actually moves reach, and the "will it blow up?" gate

Researched July 2026 (Hootsuite, SocialPilot / Mosseri statements). Re-verify with a quick
web search every few weeks; this page states the current consensus and how this skill uses it.
**Aug 2026 addendum at the bottom — read it; the numbers there are sharper.**

## The ranking signals, in order

1. **Sends per reach** — DM shares are the single most powerful signal for reaching
   non-followers, weighted roughly **3–5× more than likes**. Every reel must contain a
   built-in *share trigger*: a line someone would send to a specific person ("send this to
   the friend still paying an agency"). Design for "tag someone," don't beg for it.
2. **Watch time / completion** — percent watched relative to length; rewatches count.
   The sub-12s loop close (last frame rhymes with the first) exists for this. TOD's 31s
   format earns its length with a moment every ~2s; never pad.
3. **Likes per reach** — a rate, not a raw count. Small accounts can win on rate.
4. **Originality** — recycled/watermarked content is down-ranked across surfaces (expanded
   April 2026). The custom branded engine is an advantage; never repost others' clips.

## The first 3 seconds

Viewers decide in ~3 seconds; motion within the first ~500ms is recommended. This format
already opens loud (headline live on frame 0, odometer/typing motion immediately). Never
soften frame one.

## Captions are search queries now (social SEO)

Keyword-precise captions influence discovery AND feed distribution (June 2026 "Your
Algorithm" update). Rule: the caption's first line contains the plain-language phrase a
target viewer would type or select as an interest, e.g. "AI tools for small business" /
"AI news for business owners." Keywords beat hashtags; hashtags are a supporting signal.
Still ship exactly 5 well-sized hashtags (see voice-and-caption.md), chosen from what's
currently trending in the niche, not only mega-tags.

## Other levers

- **Niche consistency** — ~90% of posts in one lane strengthens categorization. The two
  formats (AI News + Tool of the Day) are the lane; resist off-topic detours.
- **Trial reels** — public accounts with 1,000+ followers can test a reel on non-followers
  first. This is what the delivered A/B hook variants are for.
- **Trending audio** — helps discovery, but the baked SFX layer is synced to the motion.
  If AC adds a trending track, duck or replace the SFX (build `--silent`) so they don't clash.
- **Length** — under ~3 minutes for discovery eligibility; both formats are far inside this.

## The virality scorecard (run BEFORE the final render — the "will this blow up?" gate)

Score the drafted reel honestly, out of 10. **Ship at 8+; below 8, revise before building.**

| Points | Check |
|---|---|
| 3 | Hook grade A/A- on the `hooks.md` scale (B = 1, below = 0) |
| 2 | Share trigger: a named person/type would send this to someone ("who sends this, to whom?") |
| 2 | Watch-time device: loop close lands (News) / a moment every ~2s with no dead scene (TOD) |
| 1 | Caption line 1 is a real search phrase (social SEO) |
| 1 | Every claim carries a verified real number matching the source's wording |
| 1 | Fresh + original: story is current; nothing recycled; theme/look differs from recent days |

Present the score with one line per row in the pre-render checkpoint, and again with the
final delivery. If the share-trigger row scores 0, that is the first thing to fix: name
the person the viewer will think of.

## Posting playbook (include a short note with every delivery)

- Post when AC's audience is on (check IG Insights; consistency beats clock-perfection).
- If 1,000+ followers: run the reel as a **trial reel** first with hook variant A; if
  retention holds, publish; keep variant B for the next test.
- Reply to early comments in the first hour (comment velocity helps the test phase).
- Cover text mirrors the hook so the grid preview sells the same idea.
- Don't delete-and-repost the same file repeatedly; the originality system notices recycling.

## Addendum · 2026-08-14 (hook deep-research pass — sources in HOOK_RESEARCH_REPORT.md)

The July consensus above holds. Sharper numbers now on file:

- **Skip Rate is the official first-3s scoreboard** (rolled out to professional accounts with
  per-reel Retention charts). Brand average: **~63% of viewers skip inside 3s [UNVERIFIED, see note]** (Socialinsider,
  140K business reels, Jan–Jun 2026). Grade hooks against this, not against taste.
- **Average watch time per reel: 8.5s, +117% YoY** (Metricool, 24.4M posts). The retention bar
  doubled in a year; stale internal benchmarks flatter us.
- **Reels shares +67% YoY** — fastest-growing action. Sends remain the #1 non-follower lever.
  **Comments are NOT a top-3 ranking signal** (watch time, likes/reach, sends/reach are) —
  comments matter for DM conversion, not ranking. The comment-binary experiment is a
  conversion play; the send row is the reach play. Both live on the beat sheet.
- **Length, confirmed twice:** 30–60s peaks reach rate (5.60%); **45–60s peaks ER (0.35%) and
  median views (10,374 vs 4,700 sub-30s)** (Socialinsider 140K + 6M samples). See hooks.md v2
  "two length plays": loop play (engineered seam, sub-12s) vs depth play (30–45s, more beats).
- **Replays count in Views; rewatch likelihood is an explicit ranking prediction; Explore
  rewards ≥95% completion.** An engineered loop can post >100% hold — that is the loop play's
  justification.
- **Caption CTAs, measured (Metricool):** comment CTA +202.8% comments · question +36.7% ·
  save CTA +92% saves · **like-begging −4.9%** (never ask for likes).
- **"Your Algorithm" reached the main feed Jun 2026** — interest-matched distribution favors
  the 90%-one-lane discipline even more.
- The virality scorecard stays /10, but its hook row now reads against **hooks.md v2**, which
  grades stake, arousal, and sendability — stricter than v1. The share-trigger row requires a
  NAMED person-type + motive (Gift / Mirror / Idea / Gossip / Mood), not just "who sends this."
- Honesty note on the "3–5× more than likes" figure in ranking-signal #1 above: that weighting
  is vendor speculation (Dataslayer et al.) — Meta has never published signal weights. Sends
  being top-3 and strongest for non-follower reach IS Mosseri-confirmed; the multiplier is not.

> **⚠ 2026-08-17 — the 63% skip benchmark is UNVERIFIED. Do not cite it.**
> Re-checked on 2026-08-17 against Socialinsider's own Instagram benchmarks page: it
> reports engagement rate, comments, saves, views and posting frequency. **It does not
> report skip rate or 3-second retention at all.** Instagram has published no official
> skip-rate benchmark either (Metricool, Feb 2026, states this explicitly). The third-party
> estimates that do exist — Retensis 20-35%, babbleboxx 30-40% — disclose no sample or
> method, so they are not better. A possible origin for the number: Later.com's unsourced
> claim that "63% of top-performing TikTok videos hook within 3 seconds", a different
> metric on a different platform.
> **Consequence:** if the practitioner range is roughly right, @itsac.ai's measured 76.5-85.7%
> is 40-60 points off, not 13-23. The problem is bigger than the rubric said, not smaller.
> **Use instead:** the account's own posts against each other. 76.5% (Intuit, 10 Aug) vs
> 85.7% (ChatGPT Go, 14 Aug) is a real, internally consistent measurement that needs no
> external benchmark. If a 63% figure appears in AC's own Insights comparator, screenshot
> it — that would be a real private number and it belongs here with that provenance.
