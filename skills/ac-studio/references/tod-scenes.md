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

---

## Day 35 addendum (2026-08-18) — the polish pass AC called for

Five defects shipped in a TOD that gates 1-6 all passed clean. Every one of them is
fixed in the engine, so no future run inherits them. The lesson underneath all five:
**the gates looked only at settled frames, and most of a video is not settled.**

### The five, and the rule each one leaves behind

1. **A figure with no unit.** The odometer appended `number.suffix` only once the count
   finished (`p>=1`), so the hero number climbed naked and the unit snapped on at the
   end. Day 35 shipped a bare `60`. **Rule: the unit is part of the figure and rides the
   whole count.** Put the unit in `number.suffix` (`' min'`), not only in the label.

2. **A price that counted.** The chart's old value ticked 0 -> 29, so the frame read
   `$28/mo` for a plan that costs $29. A tally may count (every intermediate value is a
   smaller true number); **a price may not — every intermediate value is a false claim.**
   Money now lands whole automatically: any `prefix` starting `$ £ € ¥` skips the count
   on both the hero odometer and the chart. Override with `number.count` / `chart.count`.

3. **A hardcoded icon.** Scene B's mark was `ICONS.globe` in the template body, ignoring
   CONTENT — a globe sat over a figure about minutes. Same bug class as the Day 33
   hardcoded art-builders. It now reads `number.icon` (a `clock` icon was added to the
   registry for time figures). **Rule: nothing in a scene body may be a literal when the
   CONTENT object is the single source of truth.**

4. **A strike that struck nothing.** Scene F's slash was `left:40 width:200` in a 360px
   row whose icons sit at x30-150 and x210-330, and its `rotate()` shared
   `transform-origin:left center` with the `scaleX` draw — so the bar pivoted about its
   left end, rose 42px above the icon's midline, and slid across the gap into the second
   icon. It read as a stray diagonal. The angle now lives on a `.slashwrap` pivoting on
   its own centre (dead on the icon's centre at x90,y100) and the draw stays on the bar
   inside it. **Rule: when one element carries both a rotation and a draw, they need
   separate transform origins or the pivot fights the sweep.**

5. **Back-loaded scenes.** Scene B held a lone figure over ~400px of empty black for 1.9s
   before its label and stamp arrived; scene F held two small icons in a bare field before
   its rule landed. Supporting copy is pulled forward (B: 0.9/1.4/1.9 · F: 0.85/1.05/1.5).
   **Rule: a scene composes while its hero still moves — the explanation arrives with the
   count, not after it** (the News engine learned this on Day 30).

Two smaller ones found in the same pass and fixed: the sign-off tagline broke across two
lines and orphaned its last word at the kicker's 29px/7px tracking, so it now has its own
`.tagline` style (**budget: keep `cta.tagline` under ~40 characters**); and the `stamp`
carries a permanent `rotate(-7deg)`, which makes its ink box taller than its layout box,
so flex gap cannot keep the line beneath it clear — a spacer does.

### Gate 7 · the filmstrip (the reason these are findable now)

`bash SKILL_DIR/scripts/qa_filmstrip.sh tod.html` — run it **after `qa_layout.sh` and
before `produce.sh`, every time.**

It samples each scene at four phases (entry · **in flight** · settled · exit) plus both
sides of every cut, tiles them into `_filmstrip/FILMSTRIP.jpg` with the timestamp burned
on each tile, and prints the map. `audit_capture` freezes scenes at `start + dur*0.55`, a
settled moment, so anything wrong only *while* something animates was invisible to every
other gate — that blind spot was the whole middle of every animation, and it is where all
five defects lived.

The gate returns no verdict. **Reading the sheet is the gate.** Read every tile and ask:
does every figure carry its unit while it counts · does every drawn rule stay inside the
thing it marks · does every swap read as one move · is any frame a lone element over a
hole · is the picture composed on both sides of each cut.

### The VO must be written from the FILLED TEMPLATE, not from the beat sheet

Day 35 also shipped a VO script whose middle three lines sat on the wrong pictures: the
voice said "paste in one long video" while the screen showed the 60-minute figure, and
"it finds the best moments" while the screen showed the four feed-it cards. Nothing was
wrong with either the script or the video on its own — they were written against
**different scene maps**. The draft beat sheet used generic beat names (hook / what it
does / the build / the math), and TOD's slots are fixed and mean something else entirely
(A hook · B the oversized number · C the four cards · D the old-vs-now chart · E three
steps · F the rule · G CTA).

**Rule: name the beat-sheet rows with THIS engine's slot names, taken from the table at
the top of this file, before writing a word of VO. Then write every VO line against the
FILLED `CONTENT` object — read the slot, write its line — and check the pairing once more
against the gate 7 filmstrip, where the picture and its timestamp are side by side.**

A related trap, fixed the same day: `scripts/vo_budget.py` still carried TOD's pre-Day-27
windows (31.6s total) and was grading scripts against windows ~35% longer than the cut
they had to fit. Gate 8 and the engine's `SCENES` array are one fact in two files — change
them in the same edit, always.

### The beat map · no scene may open on a still

Gate 4 measures the whole 1080x1920 frame, and by brand law most of that frame is flat
black. So only **large, bright** events register: a hero number ticking, a browser card
landing, a chart bar growing. Typed text, a blinking cursor, a 200px tile popping and the
slow push-in are all real motion a viewer sees, and all of them sit *below* the -50 dB
floor. Measured on the Day 35 cut: the entry settle reads about -58 dB, the push-in -65 to
-70 dB, the odometer counting -45 to -50 dB. That is the shape of the debt, and no amount
of extra push-in closes it - reaching the floor by zoom alone would need roughly a 35%
drift across a scene, which is a visible lurch.

What DOES close it is the beat map. Two rules, both cheap:

1. **The scene's largest element enters inside its first half-second.** Scene A used to
   open with a kicker, a headline and 12px of typing, then hold for 1.25s before the app
   window popped - a full second of reel that reads as a still. The window now opens at
   0.30 *with* the prompt (it is the app you are typing into), and its result fills in from
   1.30, after the prompt finishes at 1.50.
2. **No gap between beats longer than ~0.9s.** Detection lags roughly 0.3s on each side, so
   a 1.1s gap is a coin-flip and a 1.3s gap is a certain flag. Scene C's card stagger went
   0.55s -> 0.45s on that arithmetic.

Scene E is the honest exception: three steps across 4.50s cannot be spaced under 0.9s and
still leave the VO room, so it keeps one ~1.0s stretch. Log it, do not fake it - and never
close a gate-4 gap by adding motion that says nothing.
