---
name: ac-studio
description: >-
  Austin's single front door for the Instagram brand "AC — AI in Plain English"
  (@itsac.ai) — the video studio (Tool of the Day, a 31s animated tool demo; AI News, a
  sub-12s reel that opens on the payoff and loops), the carousel and static-post system,
  and the brand protocol (voice, post formula, captions, bio, Story Highlights, posting
  calendar, hashtags, growth). Researches fresh stories, verifies every number, writes
  algorithm-aware copy, gates on a layout audit and a virality scorecard, checks in with
  AC before rendering, then ships the MP4, cover, VO script, caption, hashtags and A/B
  hooks. Use this WHENEVER Austin touches his Instagram — a reel, video, TOD, tool of the
  day, AI news, "day N" content, a carousel, a slide, a post, caption, bio, highlight,
  hashtag set, weekly plan, growth question, or any AI story, tool or number he drops for
  the page — even when he never names the brand or the format. The single source of truth
  for how the page looks, sounds and grows. Replaces ac-instagram and ac-design.
---

# AC — Studio (@itsac.ai)

One skill, everything the page needs. It exists because the brand only works if the
video, the words and the growth moves sound like the same person — much harder when they
live in separate places that drift apart.

> `SKILL_DIR` below is this skill's base directory. Substitute it in commands.
> Work in a scratch dir; always `cp` templates, never edit the originals.

**Version 2026-07-29 · v3.** Supersedes `ac-instagram` (retired) and `ac-design` (retired —
its carousel system is absorbed into `references/carousel.md`; see the file gap noted
there).

**Update 2026-07-29 · subtitles.** Both video engines carry a baked-in typed-caption
system. Subtitles are **mandatory on every video** — written with the words (step 4),
filled with CONTENT (step 5), verified before shipping (step 8). See
`references/subtitles.md`. Every run ships a clean cut *and* a subtitled cut.

**Update 2026-07-29 · v3 (workflow).** Three changes, born from a session audit:
1. **The persist step (step 9) is now law.** Skill files in a session are a read-only
   cache — run-log entries, new scripts and retimed audio built mid-session are LOST when
   the session ends unless the skill is repackaged and AC saves it. v3 already lost the
   ac-design asset library and a 24s audio variant this way. Every run that changes the
   log or adds an asset ends with a fresh `.skill` package sent to AC.
2. **`scripts/produce.sh`** is the one-command back half: QA gate → every cut in parallel
   (subs + clean + light + silent) → ffprobe verify. `build_video.sh` is now
   collision-proof, so "one build at a time" is retired.
3. **The beat sheet** (`assets/beatsheet.template.md`) writes all the words in one pass —
   scene copy, VO, SUBS, caption, hashtags, A/B hooks all restate the same beats.
   Retimed cuts are now a flag, not a project: `references/variants.md`.

A **morning shortlist** (scheduled task, ~6:45am HKT) researches and verifies 3–5 story
candidates before AC wakes. If today's brief exists, start step 2 from it — don't
re-research from scratch; re-verify only what the brief flags as soft.

## The brand in one breath

- **Brand:** AC — *AI in Plain English* · **Person:** Austin (goes by AC)
- **Handle:** `@itsac.ai`
- **The promise:** *Making AI make sense for normal businesses.* One real AI trend a day,
  plain English, zero jargon. Hong Kong → worldwide.
- **The feeling:** premium, calm, confident. Flat black ground, one gold idea, elegant
  display type. "Quiet luxury," never "hustle bro."

The internet is drowning in AI hype; this page is the antidote. Every piece reinforces one
reputation — **"this person makes AI make sense."**

## Voice — read before writing anything

- **Direct and plain-spoken.** Short sentences. If a 12-year-old couldn't follow it, rewrite.
- **Contrarian but constructive.** Challenge the obvious take, then give a better one.
  Never doom — always a way forward.
- **Grounded in one real number.** The number earns attention; the plain-English
  explanation keeps it.
- **Encouraging, not preachy.** The guide who's been there, warm and a little wry.
- **Anti-hype, pro-action.** AI isn't magic, it's leverage — and leverage only pays people
  who pull it. Start with one boring, painful, repetitive task.
- **Never salesy in-feed.** Value pulls people in. Offers live in Highlights and DMs.

## Chat style — caveman by default

AC wants every working conversation compressed (his caveman-chat rules): drop filler,
articles, pleasantries, hedging; fragments OK; substance never compressed away. Applies
to ALL chat around the work — updates, options, checkpoints. Does NOT apply to
deliverables: captions, VO scripts, on-screen copy, beat sheets, posting notes ship
full quality. Checkpoints keep every fact (sources, scorecard rows, grades) — compress
wording only. Drop to clear full sentences for irreversible confirmations or multi-step
instructions where order could misread. "stop caveman" / "normal mode" turns it off.

## Task router

Read only what the task needs.

| AC asks for | Load |
| --- | --- |
| A reel / video / TOD / AI News / "day N" | `hooks.md` + `algorithm-2026.md`, then the engine's scene guide + `themes.md` |
| A "Spine" reel / a headline-and-progress-dots look | `spine-reel.md` |
| Hook options / VO opening lines / "more engaging hooks" | `vo-hooks.md` (4 banks · offer 3 per run) |
| A trailer / montage / "like the Squibb video" / figure-as-creator cut | `trailer-scenes.md` (engine: `assets/trailer.template.html`) |
| Subtitles / captions on a video | `subtitles.md` (mandatory on every video) |
| A longer / retimed cut ("24s version") | `variants.md` |
| A carousel, slide deck, static graphic | `carousel.md` + `themes.md` |
| A Prompt Drop (the Saturday prompt pack) | `prompt-drop.md`, then `carousel.md` |
| Which theme / how the frames look | `themes.md`, then `brand.md` |
| A post, caption, or "what should I post" | `content.md` |
| Bio, profile, link-in-bio, Highlights | `foundation.md` |
| Growth, reach, weekly plan, engagement | `growth.md` |
| Hashtags | `content.md` (hashtag banks) |
| Finding a story, verifying a number | `research.md` |
| Palette, type, the laws | `brand.md` |
| Anything is overlapping or looks off | `qa-audit.md` |
| A render looks janky, unpolished, or "not smooth" | `qa-audit.md` + gate 7 (`scripts/qa_filmstrip.sh`) |

If a request spans lanes — "turn this into a reel *and* a carousel" — do the video first;
its verified numbers feed the written post.

---

# The visual system

**Flat `#0A0A0A` ground. One gold idea. Four themes.** Full law in `references/brand.md`;
theme spec in `references/themes.md`. The short version:

> **The progress indicator IS the theme's block.** Where it sits and how much mass it
> carries is the identity. The corner ticks mark the edge it runs along. Hierarchy, type
> case and colour balance move with it.

| | Block | Hero | Face |
|---|---|---|---|
| **`base`** | heavy bar sealing the floor | the figure (≤5 chars) | Gloock |
| **`crest`** | gold band across the ceiling | the headline, in caps | Bricolage Grotesque Bold |
| **`column`** | the upper half is gold | gathers at the fold | Italiana |
| **`margin`** | heavy rule on the right edge | nothing — even weight | Instrument Serif Italic |

Both engines use the same four. Fonts live in `assets/fonts/` and are referenced
relatively — **keep them with the templates** or every theme silently falls back to Lora.

---

# Lane A — the video studio

Three engines, all prebuilt. Never rebuild animation, render or audio ad hoc.

| | AI News reel | Tool of the Day | Spine |
|---|---|---|---|
| Template | `assets/reel.template.html` | `assets/tod.template.html` | `assets/spine.template.html` |
| Length / scenes | ~11.7s · A–E | ~31.6s · A–G | ~11.4s · A–E |
| Signature | Loud open, odometer, toggle, loop | Typing prompt, self-building site, 4 build-cards, old-vs-now chart, 3 steps | Fixed gold-top/black-bottom fold, a full headline above it, a persistent 5-node progress spine below |
| Themes | all four | all four (COLUMN uses a gold header field, not a half) | one fixed identity (not theme-rotated) |
| Audio (auto-detected) | `reel_audio.py` | `tod_audio.py` | none yet — silent/caption-only until a run needs VO |
| Cover | brand system | `assets/cover.template.html` | brand system |
| Scene guide | `references/reel-scenes.md` | `references/tod-scenes.md` | `references/spine-reel.md` |
| Subtitles | baked in · fill `SUBS` (5) | baked in · fill `SUBS` (7) | baked in · fill `SUBS` (5) |

Pick Spine when a story needs a headline big enough to read at a glance *and* a visible
"which beat am I on" indicator across all five scenes — a claim-first story more than a
build-up one. All three carry a single `HANDLE` constant (`@itsac.ai`) filling the
watermark and CTA. Change it in one place only; keep `cover.template.html` in sync. All
three also carry the baked-in **subtitle engine** — SUBS is written on the beat sheet
(step 4), filled with CONTENT (step 5), verified before shipping (step 8,
`references/subtitles.md`).

### 0. Read the playbooks
`references/hooks.md` (retention + hook grading) and `references/algorithm-2026.md`
(ranking signals + virality scorecard). Everything below assumes both.

### 1. Greet AC and route
Open by name ("AC — ...") and ask via `AskUserQuestion`: **Tool of the Day or AI News
today?** plus **which day #**. Check `run-log.md` for the last day, theme and grades so
numbering and rotation stay consistent. If AC already named the format or day, confirm in
one line rather than re-asking.

### 2. Research and suggest (3–5 options)
**Check for today's morning shortlist first** (the scheduled task delivers one ~6:45am
HKT with verified candidates). If it exists, present those candidates and top up only if
they're stale or thin. Otherwise: search fresh, never from memory — `references/research.md` covers which engine to use, how
to phrase a semantic query, and how to verify a number down to its primary source. The
positioning is "no hype," so a figure that turns out to be secondhand costs more than the
reel earns.

Verify every key figure against 1–2 credible sources and match their wording. Present
**3–5 candidates**, each with the hook idea, the big number, AC's angle, and an *algorithm
read* — who sends this to whom. Let AC pick; if he defers, choose the strongest and say so.

Escalate to the **deep-research pass** once AC picks, whenever the pick is a TOD tool, a
contested number, or a "nobody's talking about this" angle. TOD sends people off to *use*
something — vaporware or a fake free tier costs more trust than the reel builds.

### 3. Confirm the creative (one AskUserQuestion call)
- **3 theme suggestions** from the four, excluding what recent days used.
- **Hook style:** one of the six in `hooks.md` v2 — thesis-first, concrete-image,
  direct-callout, identity/Gift, dated-prediction, receipts.
- **3 VO hooks from `vo-hooks.md`** (AC's standing rule, 2026-08-18): three filled,
  budget-checked spoken openings from three DIFFERENT banks (Storytelling /
  Controversy / Curiosity / Authority), each with its mirrored screen headline and
  grade. AC picks one; the runners-up become the beat sheet's A/B variants. Rotate
  banks across days and log the used bank in `run-log.md`.
- **Bilingual caption:** ask whether this run also ships in 繁體中文.

### 4. Write the words — ONE pass, on the beat sheet
```bash
cp SKILL_DIR/assets/beatsheet.template.md beatsheet.md
```
Fill the beat sheet top to bottom. The beats come first — one point per scene — and
every deliverable restates them: on-screen copy per scene (payoff first, one real number
per scene, no em-dashes on screen, headline width limits per engine); the timed **VO
script**; the **SUB fragment per scene** (written HERE, not after the render — rules in
`references/subtitles.md`); the **caption** whose first line is a plain-language search
phrase (social SEO), carrying one big number, a question and a soft CTA; **5
trending-but-rankable hashtags**; **2 A/B hook variants**; and the cover slots. Every
reel needs a **share trigger** — v2: a NAMED person-type + motive, plus the stake and
arousal rows (hooks.md v2). Style law: `references/voice-and-caption.md`.
Check the log's recent SEO lines and CTAs — never repeat back-to-back.

### 5. Fill the template, then AUDIT
```bash
mkdir -p run && cd run
cp -r SKILL_DIR/assets/fonts .                       # fonts must sit beside the template
cp SKILL_DIR/assets/reel.template.html reel.html     # or tod.template.html
```
Fill `CONTENT` slot-by-slot per the engine's scene guide **and `SUBS` from the beat
sheet in the same edit** (5 entries News · 7 TOD; `column` theme auto-drops the caption
below the fold). Set `THEME`; confirm `HANDLE`. Filling SUBS now means ONE audit pass
covers caption ink too — no second QA cycle after the render.

**Then run the scene gates. This is not optional:**
```bash
bash SKILL_DIR/scripts/qa_layout.sh reel.html
```

**Then gate 7 · THE FILMSTRIP — mandatory, every video, before any render:**
```bash
bash SKILL_DIR/scripts/qa_filmstrip.sh reel.html    # or tod.html / trailer.html
```
Gates 1-6 freeze each scene at a SETTLED moment (`start + dur*0.55`), so anything wrong
only WHILE something animates is invisible to all of them - a counter mid-count, a rule
mid-draw, an icon mid-swap, a scene that has not composed yet. That blind spot shipped
five defects on Day 35 (a figure with no unit, a price that counted through values the
vendor never charged, a strike drawn across the wrong object, two back-loaded scenes).
Gate 7 samples every scene at entry, **in flight**, settled and exit plus both sides of
every cut, and tiles them into `_filmstrip/FILMSTRIP.jpg` with timestamps burned on.

It returns no verdict. **READ THE SHEET — that reading is the gate.** Every tile is a
frame a viewer sees: does every figure carry its unit while it counts, does every drawn
rule stay inside the thing it marks, does every swap read as one move, is any frame a
lone element over a hole, is the picture composed on both sides of each cut.
It walks every scene, checks nothing leaves the frame, and compares **actual glyph ink**
so a descender can't sit on the line below. Fix anything it reports before going further.
See `references/qa-audit.md`.

**Gates 3–5 run later, on the MP4** — `produce.sh` calls them automatically after the
build, or run them by hand with `bash scripts/qa_layout.sh <render>.mp4`. They exist
because gates 1–2 look at one *frozen scene* at a time and therefore cannot see anything
about the cut:

- **Gate 3 · architecture change.** A real layout change must land in the scroll-decision
  window (2.6–3.6s). New text inside the same frame does not count — the script measures a
  coarse layout signature either side of the cut, so a word swap scores near zero and a
  theme switch scores high.
- **Gate 4 · motion floor.** Nothing may sit near-static longer than 1.0s. With no face on
  screen there is no micro-expression covering a still frame. The 1.0s default is
  calibrated, not guessed — see the note in `audit_motion.py`.
- **Gate 5 · cut budget.** Reports cuts against `duration ÷ 1.9` and how many land in the
  first 3s (spec wants 2). Warns by default; `--strict-cuts` makes it fail.

Thresholds are look-dependent. Run `--calibrate` once on a render you already trust, then
set `--grid-min` / `--row-min` just under what it reports. Pass flags through produce.sh
with `QA_ARGS='--strict-cuts'`.

Then eyeball frames:
```bash
# News:
node SKILL_DIR/assets/render_frames.js reel.html qa "0,1.7,3.5,4.6,6.6,7.3,8.6,10.3,11.2"
# TOD:
node SKILL_DIR/assets/render_frames.js reel.html qa "3.6,7.6,11.2,15.5,22.5,26.2,29.6"
```
Read the PNGs: copy fits, one gold idea per scene, chart labels inside the plot, handle
present. News: run the first-frame checklist on t=0.

### 6. CHECKPOINT with AC — before the final render
Present the chosen story + sources, on-screen copy per scene, 1–2 QA frames, the caption +
hashtags, the VO script, the cover draft, the **layout audit result**, and the **virality
scorecard** from `algorithm-2026.md` (x/10, one line per row). Below 8 → revise before
presenting. Then wait for his go, or apply tweaks and re-audit. Proceed unprompted only if
the session is clearly unattended, and say so plainly.

This checkpoint is where most of the quality comes from. Skipping it ships content that
renders correctly and lands badly.

### 7. Build — every cut, one command
Background it (`nohup … &`, then poll) so a tool timeout can't kill the render — TOD
takes ~90s per cut. Builds run in PARALLEL now (collision-proof frame dirs):
```bash
bash SKILL_DIR/scripts/produce.sh reel.html AC_<Format>_Day<N>_<slug> \
     [--light reel_light.html] [--silent-also]
```
One command: QA gate (hard stop) → `…_subs.mp4` + clean `….mp4` built concurrently
(clean = SUBS auto-stripped, no second working copy to maintain) → light pair →
`--silent-also` for a VO cut → ffprobe verify on everything. For a retimed cut
(e.g. 24s VO pacing) set `AUDIO_ARGS` — see `references/variants.md`.

### 8. Verify the render
Read the outputs, not just the exit code. Durations (~11.7s News / ~31.6s TOD), both
streams present (produce.sh prints this). Extract and READ: the t=0 frame (News: the
loud open survived encoding; TOD: a cue frame — 6.6s odometer, 14.1s chart) and **one
fully-typed caption frame per theme** (scene start +2.3s): caption in the clear zone,
figures intact, caret present. Light look: `#subtxt{color:#12100A!important}` and
`#subcar{background:#12100A!important}` in the light override — ink on gold. Render the
cover; keep key elements inside the centre 1080×1350 grid crop.

### 8b. Ship the VO as a PDF — AC's standing rule (2026-07-29)
Every run delivers the VO script as a black-and-gold PDF, not just markdown — AC reads it
while recording. Write a spec JSON (shape documented at the top of the script) and run:
```bash
python3 SKILL_DIR/scripts/make_vo_pdf.py spec.json AC_DayN_VO.pdf
```
It handles pagination, brand type and the timecode rail. One PDF per cut — if a run ships
both an 11.7s and a 24s cut, that's two PDFs, because the VO differs between them.

**Gate 8 · VO budget — run it before building the PDF:**
```bash
python3 SKILL_DIR/scripts/vo_budget.py spec.json     # engine inferred from the spec
```
Every other gate looks at pixels; words had no gate until 2026-08-14, when a Day 30 script
shipped at ~9.9 syllables/sec — roughly double a natural read, physically unperformable, and
nothing caught it but AC. A calm read is ~3.4 syl/sec; the gate warns over 4.0 and fails over
4.7. Scene A is allowed at the top of the band, the sign-off should be the slowest scene.
If it fails, cut words — never speed up the hook. The engine is inferred from the spec's
scene count (5 = news, 7 = TOD), so a forgotten `--engine` can no longer grade a TOD script
against the news map; an explicit flag that contradicts the spec is announced, not obeyed.

### 9. Grade, deliver, log — then PERSIST
Grade the hook A–F per `hooks.md` — ship A- or better, one rewrite pass if below.
`SendUserFile`: the **subtitled MP4** (primary) *and* the **clean MP4** (plus light/silent
variants if made), **cover PNG**, the **VO script PDF(s)** (step 8b), **beatsheet.md** (it IS the vo_script + caption +
hashtags + A/B hooks in one file), and a short **posting note**. Show the grade and
scorecard so AC sees *why* it will hold attention.

Append to `run-log.md`: date, day #, format, story + source, theme, hook grade,
scorecard, files, metrics (leave `—`, fill when AC drops numbers — never nag for them).

**Persist — the step that makes the log real.** The session's skill files are a cache;
an appended run-log dies with the session. After logging:
```bash
cd SKILL_DIR/.. && zip -r ac-studio.skill ac-studio
```
`SendUserFile` the `.skill` so AC can save it (one tap). Skip ONLY if the run changed
nothing (no log entry, no new asset). New mid-session assets (a retimed audio file, a
fixed script) ride along in the same package — that is how they survive.

---

# Lane B — carousels, posts, profile, growth

Same voice, same guardrails. Carousels and static graphics: `references/carousel.md`.
The **Saturday Prompt Drop** (cover + 3 copy-paste prompts + close, the page's only
instrument format) has its own spec: `references/prompt-drop.md`.

### The post formula
1. **Hook** — punchy, often contrarian, anchored to one real stat.
2. **Reframe** — flip the obvious reading.
3. **Plain-English breakdown** — 2–4 short beats with a concrete example or an
   old-way/new-way contrast.
4. **The rule** — a memorable, repeatable principle.
5. **CTA** — soft, on the value. Em-dash lead, then one of: *Save this · Tag someone ·
   Comment "X" · Follow @itsac.ai for daily AI trends — no hype, no jargon.*

Formatting tics that make it read like AC: one big number per post, line breaks every 1–2
sentences for mobile, a question near the end, and ~30 words max for any line going *on a
graphic*.

### Where the depth lives
- **`foundation.md`** — profile and bio, layout system, post anatomy, the six Story
  Highlights, launch checklist. *How the page looks and is set up.*
- **`content.md`** — content pillars, the seven launch posts (full captions, doubling as
  gold-standard voice examples), the 7-day calendar, hashtag banks. *What to post.*
- **`growth.md`** — cadence, the engagement routine that actually moves reach, pillar
  rotation, the soft-sell CTA ladder. *Gaining traction.*
- **`research.md`** — how to find a story and verify its number. A static post is anchored
  to one real stat exactly like a reel is.
- **`carousel.md`** — the deck engine, the six saved layouts, the light theme.

---

## Guardrails

Few hard rules; everything else is judgment. These exist because the repetition *is* the
branding.

- **Frame one is loud and the payoff comes first.** Never fade from black, never tease.
  This binds the ENGINE, not just the copy: the first scene gets no fade-in envelope, and
  its opening elements are wired live on frame 0. (TOD violated this silently until
  2026-08-06 — its scene container faded in over 0.24s, so frame 0 was black on every
  Tool of the Day ever posted.)
- **The ground is flat `#0A0A0A`.** No gradient, no glow, no grain, no background motif.
  Don't reintroduce any of them.
- **One gold accent per scene or post.** Gold means "look here." On gold ground the accent
  inverts to black — that is the only exception.
- **Poppins for all small type.** One display face per theme; never mix two in a frame.
- **No em-dashes on screen, ever.** Captions may use the em-dash CTA lead.
- **No day number or date on any post graphic** (AC, 2026-07-30 — the page is not a
  numbered series). The kicker carries the pillar only (`AI News`, `Tool of the Day`). Day
  numbers stay in `run-log.md` as internal rotation bookkeeping; they never appear on a
  frame, a cover, a carousel slide, or a caption's first line. A cited source date inside a
  stat line is a citation, not a post date, and is fine.
- **`text-transform: lowercase` is banned on anything that can carry a figure** — it turns
  `$725B` into `$725b`.
- **The handle comes from the `HANDLE` constant** — one line, both spots.
- **Never retime SCENES without retiming the audio.** For the News reel that is a flag,
  not an edit: pass the new starts via `AUDIO_ARGS` (`references/variants.md`). TOD still
  needs its cue map shifted by hand. Log every variant's scene map.
- **Verify every number** against 1–2 credible sources and match their wording.
- **No hard selling in feed.** The ladder is Save → Follow → Comment → DM.
- **Run `scripts/qa_layout.sh` before every render.** Nothing overlaps. Ever. It now also
  runs **gate 6, the app-safe window** — everything readable inside `170 < y < 1300`, and
  `x < 930` below mid-frame, with the caption and watermark clear of the scene ink and of
  each other.
- **Compose for the app, not for the file.** Instagram draws its own chrome over the video:
  a top scrim, an opaque username/caption block, and the action rail. A frame that passes
  every geometry gate can still be unreadable in the player. The bottom ~620px of every
  frame is deliberately empty black. Do not reclaim it. (Law set from AC's own player
  screenshot; applied to Spine 2026-08-05, to TOD and the News reel 2026-08-06.)
- **Decks use `assets/qa_deck.js`, not `qa_layout.sh`.** Gate 2 reads `SCENES`, a
  reel-template global, so it dies on a deck. `qa_deck.js` walks every slide in every
  card style and measures glyph ink. Run it before every carousel render.
  (`produce.sh` runs it as a hard gate — bypassing produce.sh doesn't bypass the law.)
- **And again on the MP4.** Gates 3–5 check the timeline: a layout change at the
  three-second mark, nothing static beyond 1.0s, cuts against budget. A scene audit
  cannot see any of it. `produce.sh` runs this too, after the build.
- **Subtitles on every video.** Written on the beat sheet, filled with `CONTENT`,
  verified per theme (`references/subtitles.md`). Ship a clean cut *and* a `…_subs.mp4`.
- **End every changing run with the persist step.** An unpackaged run-log entry or asset
  does not exist next session.
- **Test every theme at 140px** before believing it works.
- **Don't skip the checkpoint or the scorecard gate.**
- **Show up daily.** The algorithm and the audience both reward reliability over intensity.
