# Mode: Foundation

Fill in the foundational content every other skill leans on: **Brand**, **Audience**, **Offer**.

When one of these is missing, skills don't stop — they guess. Each one guesses differently, and every
guess hardens into a file. That's where the conflicts Audit mode finds actually come from: not
carelessness, but three skills independently inventing an answer to a question nobody wrote down.

Fixing a foundation gap is the highest-leverage work in this system, because it's upstream of
everything.

## Harvest before you interview

A lot of this is already written, just scattered. Reading first means asking Austin only what genuinely
isn't recorded anywhere — and being asked for something he already wrote down is the fastest way to
make this mode feel like a waste of his time.

```bash
grep -rniE "brand|promise|positioning|voice|palette" --include='*.md' ~/.claude/skills/ac-* | head -40
grep -rniE "audience|who .* for|small business|clients?" --include='*.md' ~/.claude/skills/ac-* | head -40
grep -rniE "price|pricing|package|retainer|offer|service" --include='*.md' ~/.claude/skills/ac-* | head -40
```

As of writing, the three pillars are in very different shape — expect the same pattern unless it's
been fixed since:

- **Brand — written and consolidated (2026-07-26).** `system/foundation/brand.md` is now the source of
  truth: identity, the canonical `@itsac.ai` handle, palette, type, voice, non-negotiables. The skills
  point at it. One open item — the `ac-wins.com` website was never re-confirmed against the handle
  change, and is flagged rather than guessed.
- **Audience — written (2026-07-26).** `system/foundation/audience.md`, confirmed by Austin: five
  overlapping groups unified by "not technical and doesn't want to be", what they want, and two hard
  exclusions. Two things still open and marked as such — willingness-to-pay (belongs with Offer) and
  any platform beyond Instagram. It also records a live tension rather than smoothing it over: owners
  and aspiring consultants are different buyers.
- **Offer — effectively missing.** The `ac-wins-*` skills imply a service menu (assessments, quotes,
  invoices, spreadsheets, scheduling, comms) but no price appears anywhere in the system. Biggest gap.

Note that the existing skills already encode the right instinct here —
`ac-reel-creator/references/tod-scenes.md` says of a price: *"never invent one."* Same rule applies to
everything in this mode.

## What each pillar has to contain

Treat these as checklists. Report which items are present, thin, or absent — a gap named is a gap that
can be filled; a gap silently skipped becomes another invented fact later.

### Brand → `system/foundation/brand.md`
- Name, and the person behind it (AC / Austin)
- Handles per platform — **one canonical value each**, not a primary-plus-backups list, because a list
  is what let two handles ship
- The promise, in one sentence
- Positioning: what he's the antidote to
- Voice rules, concrete enough to check output against
- Visual system: palette with hex values, fonts, fixed frame elements
- Non-negotiables — the "never do this" list

### Audience → `system/foundation/audience.md`
- Who exactly: business type, size, role of the person deciding, geography
- What they already believe about AI — the belief content has to move
- What they're actually trying to get done (usually not "use AI")
- Where they are, and what they're consuming
- What they'll pay for versus what they only want for free
- **Who this is not for.** The exclusion does more work than the inclusion, and it's what keeps
  content from drifting to a broad audience that never buys.

### Offer → `system/foundation/offer.md`
- What's sold, as a plain-language menu
- Price per item, and how it's charged. Never invent, never "estimate", never fill from what similar
  consultants charge — a wrong price in this file will end up quoted to a real client.
- What's included and what isn't
- Delivery: how the work actually happens, and how long
- Proof: real results, cross-referenced to `system/experiences.md`
- The reason to act now
- Anything deliberately undecided — mark it so, so skills stop re-guessing at it

## Interview for gaps only

Batch the questions with `AskUserQuestion` rather than one at a time. Group by pillar, lead with the
ones that unblock the most downstream work — pricing before palette every time.

Rules:

- **Never invent a foundation fact.** This is the hardest rule in the whole skill to keep, because a
  plausible price or a reasonable-sounding audience description reads exactly like a real one, and
  nothing downstream will ever question it. Blank and flagged beats plausible and wrong.
- **Don't fill a blank with the fragments you found.** "AI tools for small business" is a hashtag, not
  an audience definition. Bring it as a starting point for him to confirm or correct, clearly labeled
  as inference.
- **Take partial answers.** Two of three pillars filled is a real improvement. Write what he gave,
  mark the rest `**Not yet decided**`, and stop — dragging him through a full brand workshop when he
  asked about pricing is its own failure.

## Write it, then point the skills at it

For each file: state the fact once, plainly, with a `Last updated` date. No hedging, no alternatives —
this is the file that ends arguments, so a fact with two options in it has failed at its one job.

Mark unknowns explicitly:

```markdown
**Price:** **Not yet decided.** Do not invent one — ask Austin before quoting anything.
```

That line is doing real work. A blank invites a guess; an explicit refusal blocks one.

Then close the loop, or the new file is just a fourth opinion:

1. Replace the now-duplicated values in the skills with a pointer to `system/foundation/<file>.md`.
2. Where a skill needs values inline to render (templates, constants), leave them but note the source
   of truth beside them so the next edit flows the right direction.
3. Consider a short pointer in `<repo>/CLAUDE.md` — it auto-loads every session, so a few lines there
   mean every session knows the brand without any skill firing. Keep it to pointers and the two or
   three facts worth always having; the depth stays in `system/foundation/`. Offer this rather than
   doing it silently, since auto-loaded context costs tokens in every session.

## Close out

Per `SKILL.md`, and be specific about coverage: which pillars are now complete, which are partial, and
exactly which blanks remain. Commit.

The remaining blanks are the useful part of the report — they're the list of things a future session
would otherwise invent.
