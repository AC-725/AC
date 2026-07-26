# Scene library — the CONTENT object, slot by slot

Everything you edit for a new video lives in the `CONTENT` object in
`assets/reel.template.html`. The scene structure, timing, animation, and the
synced audio stay fixed. Below: what each slot is, the copy constraints, and the
default (Canva Code 2.0) example. Total runtime ~31.2s + 0.4s tail.

## A · Hook + self-building mockup (0–5s)
`hook.kicker` — the pillar label (keep "Tool of the Day").
`hook.typed` — the plain-English prompt that types into the bar (a believable ask a small business would make; ≤ ~30 chars reads best).
`hook.line1` / `hook.line2` — the two-line payoff; line2 is gold. Keep each ≤ ~19 chars.
*The website mockup builds itself automatically — no edits needed.*

## B · The oversized number + news stamp (5–9s)
`number.value` — integer that odometers up (e.g. `6000000`). `number.suffix` — e.g. `"+"`.
`number.label` — one line under it; wrap the tool name in `<b style="color:var(--white);font-weight:600">…</b>`.
`number.stamp` — the news hook as a stamp (`"Now Free"`, `"Now Live"`, `"1M Users"`).
`number.stampSub` — a 2–4 word qualifier.
*If the tool has no headline stat, use a different true number (users, % faster, price) or a short phrase.*

## C · What you can build (9–12.8s)
`build.kicker` — section label. `build.cards` — **exactly 4** `{icon,label}`. Icons by key from
`references/icon-set.md`. `build.footer` — one line; put the punchy bit in `<span class="gold">`.
*For a non-"builder" tool, reframe as 4 use-cases / outputs (e.g. Summarise · Draft · Translate · Analyse).*

## D · The math — old vs now (12.8–17.5s)
`chart.kicker`. `chart.oldValue` — integer that counts up on the grey bar. `chart.oldPrefix`/`chart.oldUnit`
wrap that number so the chart isn't cost-only: cost → `{oldPrefix:'$', oldUnit:''}` shows "$2,000"; time →
`{oldPrefix:'', oldUnit:' min'}` shows "180 min". `chart.oldLabel`/`chart.oldSub` and
`chart.newLabel`/`chart.newSub` — category + sub. `chart.newText` — the "now" value shown as-is on the gold bar
(e.g. `"$0"` or `"2 min"`). `chart.capA`/`chart.capB` — two-line caption; capB gold.
*The grey bar is always the tall/expensive "before"; the gold bar is the short/cheap "now". Keep it honest.*

## E · How to use it — 3 steps (17.5–24s)
`steps.kicker`. `steps.items` — **exactly 3** `{icon, html}`. In `html` use `<span class="em">` for a
gold keyword and `<span class="q">` for an italic example quote. Keep each step to ≤ 2 lines. Progress dots fill automatically.

## F · The rule (24–27.3s)
`rule.fromIcon` — the "old" thing, shown grey and slashed (e.g. `pdf`). `rule.toIcon` — the gold replacement (e.g. `tool`).
`rule.line1` (grey) / `rule.line2` (gold) — the memorable principle. `rule.sub` — one supporting line.

## G · CTA + loop (27.3–31.2s)
`monogram` — keep `"AC"`. `cta.handle` — `@itsac.ai`. `cta.save` — soft CTA. `cta.tagline` — the signature line.
`cta.loop` — the faint cursor that echoes the open (keep `"try it → _"`) so the reel loops.

## Changing timing (advanced)
If you must add/remove a scene or change a duration, edit the `SCENES` array **and** update the matching
cue timestamps in `assets/synth_audio.py` (its comments list each scene's start), or the sound desyncs.
