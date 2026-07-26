# Format, scenes, themes & retouch knobs

Everything you edit lives in two places in `assets/reel.template.html`: the **`CONTENT`
object** and the **`THEME`** constant (plus the one-time `HANDLE` constant). Scene
structure, timing, animation, retouch FX, and the synced audio stay fixed. Total runtime
~11.4s + 0.3s tail (~11.7s). The order is deliberately payoff-first.

Keep the big Space Grotesk headline lines short (**≤ ~16 characters per line**) or they wrap. No
em-dashes anywhere. One gold idea per scene.

**AI-news framing:** this format doubles as AC's AI-news reel. For a news story, keep
`hook.kicker` as `"Breaking · AI"` (it renders with a gold live-dot), lead scene A with
the news thesis, and use `proof.chip` as the news stamp (a second proof number or a
source, e.g. "Amazon matched it · +$1B" or "Only 5% see ROI · MIT"). For an evergreen
topic, swap the kicker to a plain section label and drop the news stamp if there's no
second figure.

## The CONTENT object, slot by slot

### A · Hook — loud open, thesis + proof number (0–2.7s)
- `hook.kicker` — the breaking label (keep `"Breaking · AI"` for news; renders with a
  gold live-dot).
- `hook.line1` / `hook.line2` — the two-line payoff; line2 is gold. **This is the thesis,
  stated first.** Phrase it from the chosen hook style (see `hooks.md`).
- `hook.num` — `{value, decimals, prefix, suffix}` for the number that odometers up.
  Money in billions: `{value:725, decimals:0, prefix:'$', suffix:'B'}` → "$725B".
  Percent: `{value:95, decimals:0, prefix:'', suffix:'%'}` → "95%".
  Multiple: `{value:280, decimals:0, prefix:'', suffix:'×'}` → "280×".
  Plain count: `{value:6000, decimals:0, prefix:'', suffix:''}` → "6,000".
- `hook.label` — one line under the number tying it to the source ("Big tech's 2026 AI bill.").
- *Frame 0 shows kicker + both headline lines already up. Never soften that.*

### B · The shift — animated toggle (2.6–5.1s)
- `shift.kicker` — section label ("Here's the shift").
- `shift.from` / `shift.to` — two chip words; `from` gets struck through, `to` is the gold
  replacement. One word (or a short before/after) each: BUY → USE, BUILD → USE, SPEND →
  USE, HYPE → USE, $20 → 7¢, SLOW → LIVE.
- `shift.line1` (stone) / `shift.line2` (gold) — the reframe in two short lines.

### C · The proof — stat counts up + stamped chip (5.0–7.6s)
- `proof.kicker` — "The proof".
- `proof.num` — same `{value, decimals, prefix, suffix}` shape; the headline stat that
  odometers.
- `proof.label` — one or two lines; wrap the punchy words in `<b>…</b>` for white weight,
  use `<br>` to control the line break.
- `proof.chip` — a small stamped chip that snaps in ("Only 5% see ROI · MIT"). A few words
  with a second number or a source stamp. Separator is "·", never an em-dash. *If there's
  no second proof point, use a short source stamp ("Reported today") or a one-line
  consequence.*

### D · The rule — callback + final line (7.5–9.7s)
- `rule.line1` (stone) / `rule.line2` (gold) — the memorable takeaway. Make line2 echo
  scene A's thesis so the reel has a spine ("Don't buy more." / "Use it right.").
- `rule.sub` — one supporting line; wrap the final number/phrase in
  `<span class="gold">…</span>`.

### E · CTA + loop (9.6–11.4s)
- `monogram` — keep `"AC"`. `cta.handle` — fills from the `HANDLE` constant automatically
  (don't retype it here). `cta.tagline` — the signature line ("Daily AI · no hype, no
  jargon"). `cta.loop` — the faint blinking line that echoes the open so the reel loops
  ("don't buy. use. → _").

*If a story has no clean two-word toggle, reuse B as a before/after pair, or make
`shift.line1/2` a plain reframe and set from/to to the nearest honest pair.*

## THEME — rotate the look so daily reels never look the same

Set the `THEME` constant near the bottom of the template. This is the fix for "my videos
all look the same": the format stays reliable, the outfit changes. Rotate day to day.

- `ember` — warm bottom glow + rising gold embers. Energetic newsroom vibe.
- `aurora` — soft diagonal gold light-streaks. Sleek and modern.
- `spotlight` — dramatic top-lit cone, darker corners. Premium and moody.
- `grid` — faint gold data-grid behind the content, no § motif. Analytical/tech vibe.

All themes keep the black canvas, gold accent, Space Grotesk/JetBrains Mono, corner frame, and the retouch
FX. Pick one that suits the story's energy and differs from the previous reel.

## Retouch FX (already on — knobs if you need them)

All motion is computed from the timeline (`seek(t)`), so it renders deterministically and
stays synced. These are subtle by design; the headline must still own the frame. To adjust,
edit the small `RETOUCH FX` CSS block and the `fxTick(t)` function:
- **Film grain** — `#grain { opacity }` (default ~0.42). Lower for a cleaner look.
- **Embers/particles** — the `counts` map in the FX setup sets how many per THEME; the
  `.particle` CSS sets size/glow. Fewer = calmer.
- **§ brand motif** — `#motif { color }` opacity (default ~0.05). It ties the reel to the
  carousels; keep it faint.
- **Living glow** — `#glow` opacity/size; driven gently in `fxTick`.
- **Story progress bar** — `#progress` at the bottom; fills across the runtime.

## Changing timing (advanced)
If you must add/remove a scene or change a duration, edit the `SCENES` array **and** update
the matching cue timestamps in `assets/reel_audio.py` (its comments list each scene's
start), or the sound desyncs. Keep the total under 12s.

## Icons / extra scenes
This format is intentionally text + number driven (no icon grid) — the speed is part of
why it retains. If a story truly needs an icon or a second toggle, borrow a shape from
`ac-tool-of-the-day/references/icon-set.md` and add a scene, but default to keeping it lean.

## Optional cover graphic
Offer a matching 1080×1920 cover (grid thumbnail). Build it as a static HTML page in the
same brand system — thin gold frame + corner ticks, `Breaking · AI` kicker, the payoff
headline (Space Grotesk, gold accent word), the hero number big, the handle, and the tagline — with
all key elements centered so they survive Instagram's 4:5 / 1:1 grid crop. Render it with a
headless-Chromium screenshot at 1080×1920. Keep the palette and fonts in `brand.md`.

## Subtitles — `subs` (required on every reel)

`subs:[ {t0,t1,text}, ... ]` — free-form timing windows, text **verbatim from the
VO script**, one entry per VO line. Bakes a lower-third caption bar (mono, warm
white on a dark pill, above the watermark and Instagram's UI zone). Absent `subs`
= no bar, but shipping without subtitles is a guardrail violation. The same array
feeds `assets/make_srt.js` for the `.srt` sidecar, so video captions, VO, and SRT
cannot drift apart.
