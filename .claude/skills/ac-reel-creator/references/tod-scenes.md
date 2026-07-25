# Tool of the Day — CONTENT slots, icons, production

Everything you edit lives in the `CONTENT` object (and the one-time `HANDLE` constant)
in `assets/tod.template.html`. Scene structure, timing, animation, and the synced audio
stay fixed. Total ~31.2s + 0.4s tail. Keep big headline lines **≤ ~19 characters**.
One gold idea per scene. No em-dashes on screen.

## Slots, scene by scene

### A · Hook + self-building mockup (0–5s)
`hook.kicker` — keep "Tool of the Day". `hook.typed` — the plain-English prompt that
types into the bar (a believable small-business ask; ≤ ~30 chars reads best).
`hook.line1` / `hook.line2` — two-line payoff; line2 gold. *The website mockup builds
itself — no edits needed.*

### B · Oversized number + news stamp (5–9s)
`number.value` — integer that odometers up; `number.suffix` (e.g. `"+"`).
`number.label` — one line; wrap the tool name in
`<b style="color:var(--white);font-weight:600">…</b>`.
`number.stamp` — the news hook ("Now Free", "Now Live", "1M Users"); `number.stampSub` —
2–4 word qualifier. *No headline stat? Use a different true number (users, % faster,
price) — never invent one.*

### C · What you can build (9–12.8s)
`build.kicker`; `build.cards` — **exactly 4** `{icon,label}`; `build.footer` — one line,
punchy bit in `<span class="gold">`. *Non-builder tool? Reframe as 4 use-cases
(Summarise · Draft · Translate · Analyse).*

### D · The math — old vs now (12.8–17.5s)
`chart.oldValue` — integer counted up on the tall grey bar; `chart.oldPrefix`/`oldUnit`
shape it (cost `{'$',''}` → "$2,000"; time `{'',' min'}` → "180 min"). `chart.newText` —
shown as-is on the short gold bar ("$0", "2 min"). `oldLabel/oldSub`, `newLabel/newSub`,
`capA`/`capB` (capB gold). *Grey = expensive before, gold = cheap now. Keep it honest.*

### E · How to — 3 steps (17.5–24s)
`steps.items` — **exactly 3** `{icon, html}`; `<span class="em">` for a gold keyword,
`<span class="q">` for an italic example quote. ≤ 2 lines each. Dots fill automatically.

### F · The rule (24–27.3s)
`rule.fromIcon` (grey, slashed) → `rule.toIcon` (gold). `rule.line1` (grey) /
`rule.line2` (gold) — the memorable principle. `rule.sub` — one supporting line.

### G · CTA + loop (27.3–31.2s)
`monogram` — keep "AC". `cta.handle` fills from `HANDLE` (don't retype). `cta.save` —
soft CTA. `cta.tagline` — signature line. `cta.loop` — keep `'try it &rarr; _'`.

## Icons
Line-icons in the `ICONS` registry at the top of the template, referenced by key:
`globe · calculator · quiz · browser · calendar · plus · chat · rocket · pdf · tool ·
check · save · gear · bolt (fallback) · chart · doc · audio · cards`.
To add one: one line in `ICONS`, viewBox `0 0 100 100`, stroke-only (`path/line/circle/
rect`, no fill — CSS strokes it gold at width 5), a few strokes max. Test with a QA frame
of scene C. The label carries the meaning; the icon is accent.

## Cover
`assets/cover.template.html` → edit only the `<!--EDIT-->` text (two headline lines +
support line naming the tool and its one-line promise). The handle line must match the
template's `HANDLE`. Screenshot at 2× (deviceScaleFactor 2) and downscale with lanczos
to 1080×1920 for crisp text. Keep key elements inside the center 1080×1350 grid crop.

## Production gotchas (hard-won — respect them)
- Rendering is CPU-bound (~90s for ~950 frames): run the build **backgrounded**
  (`nohup … &`) and poll; a 2-minute tool timeout will otherwise kill it.
- Capture is JPEG q95 by design (~10× faster than PNG, no visible loss after H.264).
- No SVG `feTurbulence` grain in per-frame renders — ~13× slower. The gradients suffice.
- Chart labels live inside the fixed-size plot box; don't restructure the chart DOM.
- Headlines over ~19 chars wrap awkwardly at 1080px.
- Audio is a synced SFX layer (~−22 dB mean): punctuation, not a music bed. Changing
  `SCENES` timings requires matching cue edits in `tod_audio.py`.
- Deps: Playwright + system Chromium (auto-found under `/opt/pw-browsers`), ffmpeg,
  python3 + numpy, and the Lora + Poppins system fonts
  (`fc-list | grep -iE 'lora|poppins'` to verify).
