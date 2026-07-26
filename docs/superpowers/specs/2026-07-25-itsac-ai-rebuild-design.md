# @itsac.ai — Instagram Rebuild Design

**Date:** 2026-07-25
**Status:** Approved (design), pending implementation plan
**Supersedes:** the `@ac.wins` / "AI in Plain English" brand protocol

---

## 1. Summary

Rebrand `@ac.wins` to `@itsac.ai` and rebuild the account for an audience of
builders and indie hackers. The page grows on a two-layer content engine: a
high-volume **reach layer** (existing AI News and Tool of the Day reels) and a
lower-volume **proof layer** (Austin testing and building things in public,
with evidence). The account optimizes for audience size first; monetization is
deliberately deferred.

## 2. Decisions locked

| Decision | Value |
|---|---|
| Account | Rebrand — `@itsac.ai` replaces `@ac.wins` (same account, carried following) |
| Audience | Builders / indie hackers |
| Success metric | Audience growth first; no offer attached yet |
| Capacity | ~7 pieces/week — 5 reels + 2 posts, posting daily |
| Existing grid | Archive (not delete), relaunch clean |
| Approach | Hybrid: reach engine + proof layer |

### Why hybrid over the alternatives

- **Pure tool/news feed** was rejected: it is a commodity. Hundreds of accounts
  post the same headline within an hour, so nothing makes a builder follow this
  account over another. Growth plateaus and the audience is loyal to the topic,
  not the person.
- **Pure build-in-public** was rejected for now: it is the right long-term
  position but the wrong shape for 7 pieces/week, and it starves for reach in
  the early weeks because no discovery engine feeds new viewers in.
- **Hybrid** uses tooling that already exists for the reach layer at near-zero
  marginal cost, and spends the two flexible weekly slots on the content that
  actually differentiates.

## 3. Positioning and voice

**Problem being solved for the audience:** builders are drowning. Dozens of AI
tools launch weekly, each claiming to change everything, and nobody has time to
test them. The valuable person is whoever separates signal from noise with
evidence.

**Positioning:** *"I test AI tools so you don't waste build time."*

**Reputation to own:** "he actually tried it" — not "he heard about it."

`AI in Plain English` retires. It was built to translate for non-technical
business owners; to builders, translating-down reads as condescending.

### Voice — carried over

- Anti-hype. This works harder with builders, who are allergic to hype.
- One real number per post. Builders respect receipts.
- Short lines, zero filler.
- Never salesy in feed.

### Voice — changed

- **Drop the "a 12-year-old must follow it" rule.** Builders want depth. Use
  RAG, MCP, context window, eval without a glossary. Kill jargon when it is
  decorative; keep it when it is precise.
- **Guide becomes peer.** The old voice coached beginners ("I'll help you not
  quit"). The new voice is builder-to-builder: "tried it, here's what broke."
  No mentoring.
- **New rule — show the receipt.** A screenshot, benchmark, or token count, or
  it didn't happen. No claim without evidence.
- **New rule — post the failures.** "This tool didn't work" is the
  highest-trust content in AI and almost nobody posts it. It is a real
  differentiator and free to produce.

### Voice shift, same story

- Old: "AI agents can now handle customer service. Here's what that means for
  your business."
- New: "Ran 200 support tickets through 3 agent frameworks. Two hallucinated
  refund policy. Screenshots + the eval harness below."

## 4. Visual system

### Carried over

- **Black canvas.** Screenshots and terminal output read well on it, and it is
  rare — most AI accounts default to purple/blue gradients.
- **Single gold accent.** Maintains brand continuity through the rename, and no
  other account in this niche owns gold.

### Changed

- **Lora retires.** An elegant serif signals "consultant/coach," which is the
  wrong cue for builders.
- **New type pair:** `Space Grotesk` for headlines, `JetBrains Mono` for
  numbers, labels, and verdicts. Both are free. The monospace is the single
  highest-leverage change — it reads "technical" instantly with no other cue.

### New — screenshot frame system

The largest structural gap. The old system was text-on-black, designed for one
idea per card. Proof-layer content is screenshot-heavy: terminal output,
dashboards, benchmark tables. It needs a consistent frame — thin border,
rounded corner, gold hairline — so raw screenshots look intentional rather than
pasted in.

### Approved guardrail change: verdict colors

The prior protocol stated "one gold accent per post, never add other colors."
Tested-tool content needs a pass/fail signal readable in half a second, so two
functional colors are now permitted **for verdicts only, never decoration**:

- muted green = works
- muted red = failed

Gold remains the only *attention* color. Green and red carry information, not
emphasis.

### Known cost

The `ac-reel-creator` skill (and the `ac-tool-of-the-day` / `ac-ai-news`
formats it supersedes) bakes black/gold and the current type pair into both
reel templates. Adopting the new type pair requires updating those skill files.
This is real work, done once.

## 5. Content engine

### Reach layer — 5 reels/week

Both existing formats survive the rebrand but are re-angled:

| Format | Old angle | New angle |
|---|---|---|
| **AI News** (sub-12s) | "OpenAI released X" | "X shipped — here's what it changes for what you're building." |
| **Tool of the Day** (31s) | "Here's a cool tool" | "Tested it. Verdict + the one thing it can't do." |

Repeating headlines is the commodity trap: every AI account posts the same news
within an hour. The edge is the so-what for someone shipping code.

### Proof layer — 2 posts/week

Four pillars rotate, each landing roughly every two weeks:

1. **Teardown** — built X with AI. Stack, screenshots, what broke.
2. **Bakeoff** — N tools, same task, ranked with evidence. The highest-value
   format for this audience and the widest open lane; almost nobody does it
   properly.
3. **Failure** — tried it, didn't work, why. The trust engine.
4. **Stack** — the actual setup for Y. Real config, real costs.

### Weekly shape

| Day | Slot |
|---|---|
| Mon | Tool of the Day |
| Tue | AI News |
| Wed | Proof — teardown or bakeoff |
| Thu | Tool of the Day |
| Fri | AI News |
| Sat | Proof — stack or failure |
| Sun | Tool of the Day |

### Post formula

The prior arc was hook → reframe → breakdown → rule → CTA. Rebuilt for an
audience that expects receipts:

**Hook (claim + number) → Receipt (evidence, immediately) → What broke →
Verdict → CTA**

The load-bearing change is that **evidence moves to position two**. Builders
bounce on unbacked claims. The old formula buried proof in the third beat,
which was fine for business owners and fatal here.

### CTA ladder

Audience-first, so there is no offer rung: **Save → Follow → Comment**.

Comment prompts perform best when they ask for the reader's counter-data
("what's your stack?") rather than an opinion.

## 6. Profile and launch

### Profile

- **Name field** (Instagram indexes this for search; it is usually wasted):
  `AC · AI tools, tested`
- **Bio:**
  ```
  I test AI tools so you don't waste build time.
  Receipts, not hype. Failures posted too.
  New teardown every Wed.
  ```
- **Link:** `ac-wins.com` sells AI automation to businesses, which is now the
  wrong audience. Since the account is audience-first with no offer attached,
  the link is left in place for now and revisited at monetization.

### Highlights

`Start Here` · `Bakeoffs` · `Stacks` · `Failures`

Four rather than six. Each maps to a proof pillar, so they fill themselves as
posts ship. The prior business-oriented highlights retire with the rebrand.

### Grid reset

**Archive, do not delete.** Archiving is reversible, keeps the data, and
produces the same visual result. Deleting is irreversible and buys nothing.

Order matters:

1. Archive old posts.
2. Update name, bio, avatar. (Handle: this spec assumes `@itsac.ai` is already
   the live handle. If the account still reads `@ac.wins`, rename it in this
   step — Instagram allows it and the follower base carries over.)
3. **Bank 9 pieces before promoting anything.**

Step 3 is the one most people skip. New visitors judge the top nine posts, and
early reach is the scarcest resource — an empty or half-built grid wastes it.

### First 9 posts

Weighted toward the differentiator so a first-time visitor reads "he actually
tests things" rather than "another AI news account":

- 1 bakeoff (make this the strongest piece — widest open lane, best save-rate
  potential)
- 1 teardown
- 1 failure
- 4 Tool of the Day
- 2 AI News

## 7. Out of scope

- Monetization, offers, and any funnel work. Deferred by decision; revisit once
  the audience exists.
- Other platforms (TikTok, YouTube Shorts, X). This spec covers Instagram only.
- A builder-facing product, lead magnet, or replacement link-in-bio asset.
- Paid promotion.

## 8. Open items for the implementation plan

These are known work items, not unresolved questions:

- Update the `ac-instagram` skill to replace the `@ac.wins` protocol with this
  one.
- Update `ac-reel-creator` reel templates for the new type pair and verdict
  colors.
- Produce the screenshot frame template.
- Write the first 9 pieces.

**Constraint affecting the first two items:** `ac-instagram` and
`ac-reel-creator` live in the user-level skills directory (`~/.claude/skills/`),
not in this repository. Edits there are not captured by this repo's git history
and do not survive a fresh container. The implementation plan must decide
whether to (a) vendor those skills into this repo's `.claude/skills/` so the
changes are committed and durable — matching how `caveman` and `superpowers`
were installed — or (b) edit them in place and accept that they are not version
controlled. Option (a) is recommended.

**Scope note:** this spec spans four deliverables (skill rewrite, reel template
update, frame template, first 9 posts). They are sequential and share one
design, so a single implementation plan is appropriate, but the plan should
treat them as distinct phases with their own checkpoints.
