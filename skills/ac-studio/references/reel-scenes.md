# AI News reel — scenes and slots

Everything you edit lives in two places in `assets/reel.template.html`: the **`CONTENT`
object** and the **`THEME`** constant (plus the one-time `HANDLE`). Scene structure,
timing, animation and the synced audio stay fixed. Total runtime ~11.4s + 0.3s tail
(~11.7s). The order is deliberately payoff-first.

Keep the big headline lines short (**≤ ~16 characters per line**) or they wrap. No
em-dashes. One gold idea per scene. For theme selection see `references/themes.md`.

**The template ships with NEUTRAL MASTER COPY, not a story.** Every field must be
replaced before rendering. *If you see the word "here" on screen, you shipped the blank
template.*

---

## A · Hook — loud open, thesis + proof number (0–2.7s)

- `hook.kicker` — the breaking label (keep `"Breaking · AI"` for news; renders with a
  gold live-dot).
- `hook.line1` / `hook.line2` — the two-line payoff; line2 is gold. **This is the thesis,
  stated first.** Phrase it from the chosen hook style (see `hooks.md`).
- `hook.num` — `{value, decimals, prefix, suffix}` for the number that odometers up.
  `{value:725, decimals:0, prefix:'$', suffix:'B'}` → "$725B". `{value:95, suffix:'%'}` → "95%".
- `hook.label` — one line tying the number to its source.
- *Frame 0 shows kicker + both headline lines already up. Never soften that.*
- **In `base`, the figure is the hero and must be ≤5 characters.**

## B · The shift — animated toggle (2.6–5.1s)

- `shift.kicker` — section label ("Here's the shift").
- `shift.from` / `shift.to` — two chip words; `from` gets struck through, `to` is the gold
  replacement. BUY → USE, SPEND → USE, $20 → 7¢, SLOW → LIVE.
- `shift.line1` (stone) / `shift.line2` (gold) — the reframe in two short lines.

## C · The proof — stat counts up + stamped chip (5.0–7.6s)

- `proof.kicker` — "The proof".
- `proof.num` — same shape; the headline stat that odometers.
- `proof.label` — one or two lines; wrap punchy words in `<b>…</b>`, use `<br>` to control
  the break.
- `proof.chip` — a small stamped chip ("Only 5% see ROI · MIT"). Separator is "·", never
  an em-dash. If there is no second proof point, use a short source stamp.

## D · The rule — callback + final line (7.5–9.7s)

- `rule.line1` (stone) / `rule.line2` (gold) — the memorable takeaway. Make line2 echo
  scene A's thesis so the reel has a spine.
- `rule.sub` — one supporting line; wrap the final phrase in `<span class="gold">…</span>`.

## E · CTA + loop (9.6–11.4s)

- `monogram` — keep `"AC"`. `cta.handle` fills from `HANDLE` automatically.
- `cta.tagline` — the signature line. `cta.loop` — the faint blinking line that echoes the
  open so the reel loops.

*If a story has no clean two-word toggle, reuse B as a before/after pair, or make
`shift.line1/2` a plain reframe.*

---

## Retouch knobs

There is almost nothing left to tune, which is the point. The ground is flat and carries
no effects. What remains:

- **The block** — `#progress` geometry per theme. Changing it changes the theme's identity;
  read `themes.md` first.
- **Leading** — `.h1` line-height is set globally and overridden per theme (caps need the
  least, italic the most). It is tuned so glyphs clear; if you change a font size, re-run
  `scripts/qa_layout.sh`.

## Changing timing

**Never change the `SCENES` timings** without updating `assets/reel_audio.py`, or the
sound desyncs. The carousel/deck engine deliberately matches these same windows
(0.0 / 2.6 / 5.0 / 7.5 / 9.6, total 11.4s) so it can reuse the same audio.
