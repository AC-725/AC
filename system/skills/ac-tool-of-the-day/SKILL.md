---
name: ac-tool-of-the-day
description: >-
  SUPERSEDED — do not use this skill for new work. `ac-reel-creator` now produces the Tool of
  the Day format (and AI News) from one engine, and every reference in this skill also exists
  there. Use `ac-reel-creator` for any reel, video, TOD, or daily AI-tool request, including
  phrasings this skill used to claim like "make me a tool of the day video", "new TOD",
  "today's AI tool reel", or "do tomorrow's tool". Retained only as a historical record of the
  original 31s TOD scene breakdown and its render notes; it is not the source of truth for
  anything. For static posts, captions, bio, or highlights use `ac-instagram`.
---

# AC — Tool of the Day (animated Reel)

> **SUPERSEDED.** `ac-reel-creator` builds this format now, from the same engine plus a run
> log that keeps day numbering and theme rotation consistent. Everything below also lives in
> its references. Use `ac-reel-creator` for new videos; read this only for history.

This skill turns one current AI tool into a finished, on-brand Reel package. The heavy
engineering (animation engine, render pipeline, sound design, cover) is prebuilt and
verified — your job each time is to **pick a great tool, pour the words in, and build**.

Deliverables every run: **MP4** (animated + synced sound), **shot-by-shot script**,
**caption**, **cover PNG**, **5 hashtags** — and save the package to the project.

## What's in the box
- `assets/reel.template.html` — the animated timeline. Edit only its `CONTENT` object.
- `assets/cover.template.html` — the grid-safe cover. Edit the `<!--EDIT-->` text.
- `assets/render_frames.js` — headless-Chromium frame capture (also QA mode).
- `assets/synth_audio.py` — synthesizes the synced SFX track (royalty-free).
- `scripts/build_video.sh` — one command: render → synth audio → encode + mux.
- `references/` — read these as needed:
  - `voice-and-formula.md` — AC voice, tool-pick criteria, caption formula, hashtags.
  - `scene-library.md` — every `CONTENT` slot, copy limits, how to adapt per tool.
  - `icon-set.md` — icon keys + how to add one.
  - `production-guide.md` — deps, the one-shot build, QA, and the hard-won gotchas.

## Workflow

### 1. Pick and verify the tool
Unless Austin already named one, **web-search current AI news** (never rely on memory for
"what's new") and propose the best fit against the criteria in `voice-and-formula.md`:
current news hook, positive for general + business users, easy to apply, concrete payoff.
Verify the key facts (and any stat) from 1–2 credible sources; match the tool's own wording
for numbers. If Austin is around, confirm the pick in one line; if unattended, choose the
strongest and say so.

### 2. Write the words first (voice before mechanics)
Read `references/voice-and-formula.md` and draft, in AC's voice:
- the **on-screen copy** for each scene (this becomes the `CONTENT` object),
- the **caption** (5-beat arc, one big number, a question, soft CTA — no hard sell),
- the **5 algorithm hashtags** (one broad-topical, one capability, one category, two audience),
- the **shot-by-shot script** (mirror `AC_ToolOfTheDay_..._SCRIPT.md` layout: on-screen / visual / VO / SFX per scene).
Keep big headline lines ≤ ~19 characters so they fit.

### 3. Fill the template
Work in a scratch dir; **copy** the templates so you never edit the skill's originals:
```bash
mkdir -p tod && cd tod
cp /root/.claude/skills/ac-tool-of-the-day/assets/reel.template.html reel.html
cp /root/.claude/skills/ac-tool-of-the-day/assets/cover.template.html cover.html
```
Edit the `CONTENT` object in `reel.html` slot-by-slot per `references/scene-library.md`
(hook prompt, the number + stamp, 4 build-cards, chart old/now, 3 steps, the rule, CTA).
Pick icons by key from `references/icon-set.md`. Edit the `<!--EDIT-->` text in `cover.html`.

### 4. QA the frames, then build
Always eyeball a contact sheet before the ~90s full render:
```bash
node /root/.claude/skills/ac-tool-of-the-day/assets/render_frames.js reel.html qa "3.6,7.6,11.2,15.5,22.5,26.2,29.6"
```
Read the `qa/*.png`: copy fits, nothing overlaps, chart labels inside the plot, one gold idea
per scene, @itsac.ai present. Fix the `CONTENT` and re-QA. Then build (run it **backgrounded**
so a tool timeout can't kill the ~90s render — see `production-guide.md`):
```bash
bash /root/.claude/skills/ac-tool-of-the-day/scripts/build_video.sh reel.html AC_ToolOfTheDay_<tool>.mp4
```
Spot-check the MP4: `ffprobe` shows ~31.6s with audio+video; extract a frame at an audio-cue
time (6.6s odometer, 14.1s chart) to confirm sound lines up with the motion.

### 5. Render the cover
Screenshot `cover.html` at 1080×1920 (render at 2× and downscale with lanczos for crisp text —
see `production-guide.md`). Keep key elements inside the center 1080×1350 grid crop.

### 6. Deliver + save
`SendUserFile` the **MP4**, the **cover PNG**, a **caption.txt** (caption + 5 hashtags), and the
**script.md**. Tell Austin: the sound is a baked synced SFX layer (best posted as-is; if he adds a
trending track he should duck/replace it so they don't clash), and the cover/caption are ready to paste.
Then `project_write` the package (script + caption + hashtags + tool + sources + which assets) to the
"Tool of the day" project so it's reusable and visible across sessions.

## Defaults & options
- **Full build** (icons + charts + mockup + synced sound) is the default — it's the version Austin liked.
- **Silent version**: add `--silent` to `build_video.sh` (no audio track) if he wants to lay his own audio.
- **Same tool, new angle / different tool**: just change `CONTENT` and rebuild — timings and audio are reusable.
- If a tool doesn't fit a scene (e.g. no "build 4 things" or no cost comparison), adapt that scene's copy
  per `scene-library.md` (reframe the 4 cards as use-cases; use a different true number in the chart).

## Guardrails
Black canvas, one gold accent per scene, Lora + Poppins only, plain English (no buzzwords, no
"this changes everything"), no hard selling in feed, @itsac.ai on every frame. When in doubt on voice,
defer to the `ac-instagram` skill's Part 2.
