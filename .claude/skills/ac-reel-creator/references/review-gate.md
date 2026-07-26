# The review gate — fresh-context fact & brand check

Runs at **step 6.5**, after AC approves the creative at the checkpoint and before
the render starts. Reviewing pre-render keeps fixes cheap: a rejected TOD after a
3-minute render is 3 minutes wasted.

## Why this exists

Without it, the same agent that wrote the copy also grades it at step 8. That is
self-assessment with no independent check, and it fails in a specific way: the
writer re-reads its own intent into the words and sees what it meant rather than
what it wrote.

This is not hypothetical. On 2026-07-25 a self-review of this repo's own
infrastructure reported clean while a fresh-context reviewer found two critical
defects — a test that could not detect the failure it was written to guard, and a
case-sensitive verification grep whose false "clean" was then written into a
status document as established fact.

A reel carries the same risk in a different currency. A wrong font hurts nobody,
but a fabricated statistic, an uncited number, or a figure that contradicts its
own source ships straight to the audience. The brand's entire premise is that the
receipts are real.

## Dispatching the reviewer

**Fresh context is the whole mechanism.** Never ask the agent that wrote the copy
to run this — it cannot see its own blind spots. Spawn a new agent with no
history of the build, and hand it files rather than pasted context.

Give it exactly these inputs:

- `script.md` — the shot-by-shot, including the verified-numbers section
- `caption.txt` — caption, SEO first line, hashtags
- the filled `reel.html` / `tod.html` (the `CONTENT` object is the on-screen copy)
- `vo_script.md`
- the `subs` array inside the filled template — subtitle text must match the VO
  script verbatim, line for line; any divergence is a finding
- the path to `itsac-instagram/SKILL.md` for the brand rules
- the self-assessed virality scorecard

### Prompt template

> You are reviewing an Instagram reel before it renders. You did not write it.
> Assume it contains an error and find it.
>
> Inputs (read all of them):
> - shot-by-shot + sources: `<path>/script.md`
> - caption + hashtags: `<path>/caption.txt`
> - on-screen copy: the `CONTENT` object in `<path>/<reel|tod>.html`
> - voice-over: `<path>/vo_script.md`
> - brand rules: `/home/user/AC/.claude/skills/itsac-instagram/SKILL.md`
>
> Self-assessed scorecard: `<paste the x/10 with its rows>`
>
> Check, in this order:
>
> 1. **Number provenance.** List every number that appears on screen or in the
>    caption. For each, name the source in `script.md` that supports it and
>    confirm the wording matches the source's wording. Any number without a
>    source is a BLOCKER.
> 2. **Fabrication.** Any claim not supported by a cited source or by
>    first-party evidence is a BLOCKER. This brand's core rule is that receipts
>    are real.
> 3. **Internal consistency.** Do the on-screen copy, caption, VO script,
>    subtitle track (`CONTENT.subs`), and `script.md` agree on every number and
>    claim? Subtitles must match the VO verbatim. A figure that differs between
>    two of them is a BLOCKER.
> 4. **Brand compliance** against the brand rules file: voice, CTA ladder, post
>    formula, one gold accent per scene, the type pair.
> 5. **Scorecard honesty.** Is each row defensible, or scored generously? Say so
>    plainly and give your own score.
>
> Report findings only. Do NOT fix anything. Do NOT re-litigate the story choice
> or creative direction — those are already approved.
>
> Format: **BLOCKER** / **Important** / **Minor**, each with the exact quoted text
> and what is wrong. End with SHIP or HOLD.

## Handling the verdict

- **SHIP, no blockers** — proceed to step 7 (build). Carry any Minor findings
  into the delivery note.
- **BLOCKER** — fix the copy, then re-run the gate on the corrected text. Never
  render past an unresolved blocker.
- **Reviewer is wrong** — it happens; it has less context than AC by design. Say
  why in one line, record the ruling, and proceed. Never silently discard a
  finding.

## What this gate does NOT do

- It does not judge taste, story choice, or creative direction. AC approved those
  at step 6 and the reviewer has no standing to reopen them.
- It does not fix anything. A reviewer that edits starts solving instead of
  finding, and stops looking once it has something to fix.
- It does not replace the QA frame pass at step 5. That checks whether the pixels
  are right; this checks whether the words are true.
