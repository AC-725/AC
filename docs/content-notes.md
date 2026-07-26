# Content notes — AI-explainer niche, July 2026

Research snapshot for the Instagram page. Sourced via Exa, not from the account's
own numbers — `scripts/instagram_insights.py` covers that once a token exists,
and its "top posts by engagement" output is the input that would sharpen all of
this considerably.

## What changed that actually matters

**Instagram now ranks on originality.** Mosseri, as of May 2026: recycled and
obviously AI-spun video gets reduced reach. For an account *about* AI this cuts
close — the failure mode is using AI to generate finished content rather than to
accelerate drafting. AI drafts, you direct and edit. Generic output is
algorithmically throttled now, not just ignored by viewers.

**Retention is the lever, not views.** Watch-through rate and replays drive
amplification to non-followers. Views are the lagging indicator. Instagram
Insights exposes both — worth tracking completion rate per format and dropping
the ones that don't hold.

**Saves are the currency.** The reliable save-trigger is teaching exactly one
useful idea. A Reel that tries to cover everything gets skipped; one that teaches
a single thing well gets saved and re-sent.

**The mute majority is real.** A large share of Reels play silent, so on-screen
text has to carry the message on its own. Every scene needs a 2–6 word label that
survives with the sound off.

## The five structures worth building a swipe library around

Reverse-engineer outliers by *structure*, then translate the pattern to this
niche — don't remake the topic.

| Pattern | Shape | Fit here |
| --- | --- | --- |
| POV | Drop the viewer into a moment | "POV: your boss asks for the report you haven't started" |
| Authority hook | Credibility-loaded claim, specific number | "I've tested 200 AI tools. Three are worth paying for." |
| Micro-story loop | 7–15s setup → turn → payoff looping to the open | Already the AI News format |
| Transformation reveal | Before/after, the gap *is* the hook | Already the old-vs-now chart in Tool of the Day |
| Open loop | Tease an outcome needing resolution | "Don't pay for ChatGPT until you check this setting." |

Two of these are formats the page already runs. The gap is POV, authority hook,
and open loop — all cheap to test against the existing production pipeline.

## Ten concrete angles

Front-load every one of them; the payoff belongs in second 1, not second 25.

1. **"AI agents, explained with a to-do list."** Brain / tools / loop, three
   labels, nothing else. The single clearest agent explainer structure available.
2. **"What took grandma years, AI does in seconds — and why that's the catch."**
   The cookie-recipe metaphor, ending on the limitation. Teaches *and* stays
   honest, which is the account's whole positioning.
3. **"Three settings to change before you post another Reel."** Open loop; the
   niche's own audience is creators.
4. **"I automated my inbox for a week. Here's what broke."** Failure content
   outperforms success content for trust, and almost nobody in this niche posts it.
5. **"The $0 version of the tool everyone's paying for."** Recurring series slot —
   price-anchored, save-bait by construction.
6. **"Chatbot vs agent, in 8 seconds."** Transformation reveal. One split screen.
7. **"Ask AI this one question before you trust its answer."** Single teachable
   tactic, high save rate.
8. **"Everyone's wrong about what AI is actually good at."** Authority hook +
   myth correction; pairs with the plain-English positioning.
9. **"The AI feature already inside the app you use daily."** Google Workspace,
   Notion, Microsoft 365 — discovery content, low production cost.
10. **"What I'd learn first if I were starting today."** Evergreen, re-postable
    quarterly as the answer changes.

## Turn winners into series

A format that lands should become a recurring slot rather than a one-off. It
trains the audience to expect and save it, and gives the algorithm a consistent
signal. The page already does this with Tool of the Day — the same treatment
applied to whichever of the new patterns tests best is the cheapest available
growth move.

Ship volume with structure. Ten pattern-driven attempts a week beats one agonized
"perfect" Reel, because retention data is what actually finds the winner.

## Open question: which handle

The `ac-instagram`, `ac-reel-creator`, `ac-ai-news`, and `ac-tool-of-the-day`
skills are built around **@ac.wins** / ac-wins.com — 36 references across the
four. This research was requested for **@itsac.ai**.

If that's a rebrand, those skills need updating before they'll produce on-brand
output. They're claude.ai-synced skills (they carry `skillId`s in
`manifest.json`), not files in this repo, so they have to be edited in the
claude.ai Skills UI — edits made inside a remote session's container are wiped
when it's reclaimed and never sync back.
