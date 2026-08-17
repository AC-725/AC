# Tool of the Day — CONTENT slots, icons, production

Everything you edit lives in the `CONTENT` object (and the one-time `HANDLE` constant)
in `assets/tod.template.html`. Scene structure, timing, animation, and the synced audio
stay fixed. **Total ~23.1s + 0.4s tail (retimed 2026-08-11 — was 31.2s).** Keep big headline lines **≤ ~19 characters**.
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


---

## Themes (added 2026-07-29)

TOD used to have one fixed look. It now shares the four themes with the news engine —
same names, same block positions, same display faces — so the two formats read as one
system. Set `THEME` near the top of `assets/tod.template.html`:

`'base'` (bar bottom) · `'crest'` (band top) · `'column'` (gold header + left bar) ·
`'margin'` (bar right)

The ground is **flat `#0A0A0A`** — the old gradients, glow and §-era styling are gone.
Full spec in `references/themes.md`.

**COLUMN adaptation.** TOD uses a 220px gold *header field*, not the news engine's gold
half. Its scenes carry built components — the browser mock, the four build cards, the
old-vs-now chart — and those cannot invert to black-on-gold. Do not try to force the
half-split onto TOD; it will destroy the components.

**A progress block was added.** TOD previously had no progress indicator. It now carries
the same full-bleed block as the news engine, positioned by theme, filling across the
~31.6s runtime.

---

## The app-safe window (added 2026-08-06 — this engine never had it)

TOD was composed for the FILE, not for the player. Until this date its typed caption sat at
`y≈1770` and its watermark at `y≈1846` — both underneath Instagram's username/caption block —
so every Tool of the Day that shipped had its burned-in captions covered in the feed. Scenes
also broke the bottom line and the right-hand action rail.

The engine now composes inside the same window Spine uses:

    top     y > 170     ·  bottom  y < 1300  ·  right  x < 930 below mid-frame

What changed, and why each number is what it is:

| | was | now | why |
|---|---|---|---|
| `.scene` padding | `150 110 230` | `190 110 800` | content box ends at y1120; the tallest scene (A) is 891px and centres inside it |
| `#stage.t-crest .scene` padding-top | 230 | 240 | clears the 82px band with the new box |
| `#stage.t-column .scene` padding-top | 340 | 300 | column's gold header is 262px; 300 clears it without pushing content into the caption band |
| `#subline` | `bottom:150px` | `bottom:708px` | y1169..1212, directly under the content, in the clear |
| `#wm` | `bottom:74px` | `bottom:645px` | y1240..1275, the last readable band before the app takes over |

The bottom ~620px is now deliberately empty black. **That is not wasted space — the app fills
it.** Do not "reclaim" it.

Verified across all four themes: deepest scene ink is y1132 (column A), so the caption clears
content by 37px and the watermark clears the caption by 28px. `scripts/audit_safearea.js`
(gate 6) enforces all of this and now runs inside `qa_layout.sh`.

## Frame one (added 2026-08-06)

The scene container used to fade in over `IN=0.24s`, which meant **frame 0 of every TOD was
black** — a fade from black, which the brand guardrails forbid outright. Two changes:

1. `seek()` gives the FIRST scene no fade-in (`st<IN && s.start>0.0001`). It hard-cuts in at
   full strength. Every later cross-fade is untouched.
2. Scene A's kicker and prompt bar are wired LIVE (`#A .kicker,#A .promptbar[data-live]`), so
   frame 0 carries the branded canvas, the gold kicker and the prompt bar with its caret.

**No audio cue moved** — the whoosh at 0.05s, the pop at 0.20s and the typing from 0.40s all
still land where `tod_audio.py` puts them. Only entrance opacity changed.

## The odometer prefix (added 2026-08-06)

`number.prefix` sits alongside `number.suffix`, so scene B can carry a currency figure:
`{value:20, prefix:'$', suffix:''}` renders `$20` and counts up with the `$` attached.
Base theme's hero-figure limit still applies: **5 characters or fewer.**

## Before rendering

```bash
bash SKILL_DIR/scripts/qa_layout.sh tod.html
```
Gates 1, 2 and 6 must pass. See `references/qa-audit.md`.


---

## The retime (2026-08-11, Day 27) — read before touching SCENES

The engine ran at 31.6s until Day 27 and **every scene finished animating 1.4-3.2s before it
ended**, because durations were set by VO pacing rather than motion density. That dead tail
was ~15s of the runtime and it is what gate 4 had been failing on since Day 24.

Current map, each duration = (last beat + a short tail):

| | start | dur |
|---|---|---|
| A | 0.00 | 3.40 |
| B | 3.25 | 3.45 |
| C | 6.55 | 3.30 |
| D | 9.70 | 3.20 |
| E | 12.75 | 4.50 |
| F | 17.10 | 2.90 |
| G | 19.75 | 3.30 |

**Scene A's 3.40 is load-bearing.** It exists so the A->B transition lands inside gate 3's
2.6-3.6s scroll-decision window. Lengthen scene A and gate 3 fails again — it is structurally
impossible to pass while A runs past 3.6s, because no other cut is anywhere near the window.

**`tod_audio.py` deltas are PER SCENE, not one constant:**
A 0.00 · B -1.60 · C -2.30 · D -2.95 · E -4.60 · F -6.75 · G -7.40.
Scene C's pops and scene E's step cues were also respread to follow the new visual stagger
(C cards 0.55s apart, E steps 1.10s apart). Move a scene without editing the matching cue
group and the sound desyncs.

### Frame one, again (Day 24 only half-fixed it)

Day 24 wired the kicker and prompt bar live at t=0. But the prompt bar's text TYPES IN, so
frame 0 was an empty box, and the headline still animated at 3.0s. Every TOD after Day 24
opened on a gold search box saying nothing for three seconds. `#A .h1` is now in the live set
too. **If you add anything to scene A that carries the payoff, wire it live as well.**

### What gate 4 can and cannot do here

Gate 4 is `freezedetect=n=-50dB:d=1.0` and needs a large-area frame change. This engine
animates small elements on a still black field — typing, a 52px icon, a counter — and most of
them are **below the detector's floor**. Measured on Day 27: tightening scene E's steps from
1.35s to 1.10s apart split one 1.37s static window into three ~1.1s ones rather than removing
it. Respacing moves gaps; it cannot close them.

Current state: 7 stretches, longest 1.27s, 8.37s total (was 10 / 2.23s / ~15s). Closing the
rest needs a design decision — ambient drift on the content block, or a different transition
language — not another retime. Do not lower the threshold to go green.
