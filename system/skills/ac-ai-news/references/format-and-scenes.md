# Format & scenes — the CONTENT object, slot by slot

Everything you edit for a new AI-news reel lives in the `CONTENT` object in
`assets/ainews.template.html`. Scene structure, timing, animation, and the synced audio stay
fixed. Total runtime ~11.4s + 0.3s tail (~11.7s). The order is deliberately payoff-first.

Keep the big Lora headline lines short (**≤ ~16 characters** per line) or they wrap. No
em-dashes anywhere. One gold idea per scene.

## A · Hook — loud open, thesis + proof number (0–2.7s)
`hook.kicker` — the breaking label (keep `"Breaking · AI"`; renders with a gold live-dot).
`hook.line1` / `hook.line2` — the two-line payoff; line2 is gold. **This is the thesis, stated
first.** Pick the phrasing from the chosen hook style (see hook-retention-guidelines.md).
`hook.num` — `{value, decimals, prefix, suffix}` for the number that odometers up.
  Money in billions: `{value:2.5, decimals:1, prefix:'$', suffix:'B'}` → "$2.5B".
  Plain count: `{value:6000, decimals:0, prefix:'', suffix:''}` → "6,000".
`hook.label` — one line under the number tying it to the source ("Microsoft just bet on it.").
*Frame 0 shows kicker + both headline lines already up. Never soften that.*

## B · The shift — animated BUILD → USE toggle (2.6–5.1s)
`shift.kicker` — section label ("Here's the shift").
`shift.from` / `shift.to` — the two chip words; `from` gets struck through, `to` is the gold
replacement. Keep them one word each (BUILD → USE, HYPE → USE, WATCH → BUILD, etc.).
`shift.line1` (stone) / `shift.line2` (gold) — the reframe in two short lines.
*If a story has no clean two-word swap, reuse the toggle as before/after (e.g. SLOW → LIVE) or
change `shift.line1/2` to a plain reframe and set from/to to the nearest honest pair.*

## C · The proof — stat counts up + news stamp (5.0–7.6s)
`proof.kicker` — "The proof".
`proof.num` — same `{value, decimals, prefix, suffix}` shape; the headline stat that odometers.
`proof.label` — one or two lines under it; wrap the punchy words in `<b>…</b>` for white weight.
  Use `<br>` to control the line break.
`proof.chip` — a small stamped news chip that snaps in ("Amazon matched it · +$1B"). Keep it to
a few words with the second number. Use "·" as the separator, never an em-dash.
*If there's no second proof point, set `proof.chip` to a short source stamp ("Reported today")
or a one-line consequence.*

## D · The rule — callback + final stat (7.5–9.7s)
`rule.line1` (stone) / `rule.line2` (gold) — the memorable takeaway. Make line2 echo scene A's
thesis so the video has a spine ("Stop building AI." / "Start using it.").
`rule.sub` — one supporting line; wrap the final number in `<span class="gold">…</span>`.

## E · CTA + loop (9.6–11.4s)
`monogram` — keep `"AC"`. `cta.handle` — `@itsac.ai`. `cta.tagline` — the signature line
("Daily AI · no hype, no jargon"). `cta.loop` — the faint blinking line that echoes the open
("don't build. use. → _") so the reel loops.

## Changing timing (advanced)
If you must add/remove a scene or change a duration, edit the `SCENES` array **and** update the
matching cue timestamps in `assets/ainews_audio.py` (its comments list each scene's start), or
the sound desyncs. Keep the total under 12s.

## Icons / extra scenes
This format is intentionally text + number driven (no icon grid). If a story truly needs an
icon or a second toggle, borrow a shape from `ac-tool-of-the-day/references/icon-set.md` and add
a scene, but default to keeping it lean — the speed is part of why it retains.
