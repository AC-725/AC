---
name: ac-reel-creator
description: >-
  AC's single front door for daily Instagram video. Greets Austin as AC and asks
  which format today: Tool of the Day (31s animated demo with icons, self-building
  website mockup, odometer stat, old-vs-now chart, 3 steps) or AI News (sub-12s
  front-loaded reel that opens loud on the payoff, counts a real number up, and
  loops). Researches fresh stories, offers 3-5 verified suggestions plus 3 theme
  options, writes algorithm-aware copy (share trigger, SEO caption line), runs a
  virality scorecard gate, checks in with AC before the final render, then ships
  the MP4, cover, timed voice-over script, caption, 5 trending hashtags, A/B hook
  variants, posting note, and updates the run log. Use WHENEVER Austin wants a
  reel, video, TOD, tool of the day, AI news, "day N" content, or drops any AI
  story, tool, or number for his page. Merges and supersedes ac-ai-news,
  ac-tool-of-the-day, and the older ac-reel-creator. For static posts, captions,
  bio, or highlights use ac-instagram.
---

# AC — Reel Creator (the studio: Tool of the Day + AI News)

One skill, two verified engines, built for AC's daily cadence. Every run: greet AC,
ask which format, bring researched suggestions, write algorithm-aware words, gate on
the virality scorecard, **check in with AC before the final render**, then build and
deliver the complete package. The engines (animation, render, synced sound) are
prebuilt; never rebuild them ad hoc.

> `SKILL_DIR` below is this skill's base directory. Substitute it in commands.
> Work in a scratch dir; always `cp` templates, never edit the originals.

## The two engines

| | AI News reel | Tool of the Day |
|---|---|---|
| Template | `assets/reel.template.html` | `assets/tod.template.html` |
| Length / scenes | ~11.7s · A–E | ~31.6s · A–G |
| Signature | Loud open, odometer, toggle, loop | Typing prompt, self-building site, 4 build-cards, old-vs-now chart, 3 steps |
| Look | `THEME` constant: ember · aurora · spotlight · grid | Fixed premium look (consistency is the brand) |
| Audio (auto-detected by build script) | `reel_audio.py` | `tod_audio.py` |
| Cover | Build from brand system (see `format-scenes-themes.md`) | `assets/cover.template.html` |
| Slot guide | `references/format-scenes-themes.md` | `references/tod-scenes.md` |

Both templates carry a single `HANDLE` constant (default `@itsac.ai`) that fills the
watermark and CTA. Change it in one place only; keep `cover.template.html` in sync.

## Workflow

### 0. Read the playbooks
`references/hooks.md` (retention + hook grading) and `references/algorithm-2026.md`
(ranking signals + the virality scorecard). Everything below assumes both.

### 1. Greet AC and route
Open by name ("AC — ...") and ask, via `AskUserQuestion` when available:
**"Are we doing Tool of the Day or AI News today?"** plus **which day # in the series**
(check `run-log.md` for the last day, theme used, and grades so numbering and rotation
stay consistent). If AC already named the format or day, don't re-ask; confirm in one line.

### 2. Research and suggest (3–5 options)
Web-search fresh — never from memory. Verify every key figure from 1–2 credible sources
and match the source's wording. Screen by the format's pick criteria (news:
`voice-and-caption.md`; tools: current hook, useful to normal businesses, teachable in
3 steps, concrete payoff). Present **3–5 candidates**, each with: the hook idea, the big
number, AC's angle, and an *algorithm read* (who sends this to whom — the share trigger).
Let AC pick via `AskUserQuestion`. If AC defers, choose the strongest and say so.

### 3. Confirm the creative (one AskUserQuestion call)
- **3 theme suggestions**: News → propose 3 of the 4 THEMEs, matched to the story's
  energy and excluding what recent days used (check `run-log.md`). TOD → the video look
  is fixed, so propose 3 cover/hook styling variants instead.
- **Hook style**: thesis-first, concrete-image, or direct-callout (`hooks.md`).
- **Bilingual caption**: ask if this run's caption should also ship in 繁體中文.

### 4. Write the words (AC voice, algorithm-aware)
Per `references/voice-and-caption.md`: on-screen copy for every scene (payoff first,
one real number per scene, no em-dashes on screen, headline width limits per engine);
the **caption** whose first line is a plain-language search phrase (social SEO), with
one big number, a question, a soft CTA; **5 trending-but-rankable hashtags**; the
**timed voice-over script**; **2 A/B hook variants** (alternate scene-A lines for trial
reels); and the **shot-by-shot script**. Every reel must contain a **share trigger**.

### 5. Fill the template and QA frames
```bash
mkdir -p run && cd run
cp SKILL_DIR/assets/reel.template.html reel.html   # or tod.template.html
```
Fill `CONTENT` slot-by-slot per the engine's slot guide; set `THEME` (News) and confirm
`HANDLE`. QA before any full render:
```bash
# News:
node SKILL_DIR/assets/render_frames.js reel.html qa "0,1.7,3.5,4.6,6.6,7.3,8.6,10.3,11.2"
# TOD:
node SKILL_DIR/assets/render_frames.js reel.html qa "3.6,7.6,11.2,15.5,22.5,26.2,29.6"
```
Read the PNGs: copy fits, one gold idea per scene, chart labels inside the plot, handle
present. News: run the first-frame checklist on t=0 (headline fully up, payoff not
tease, handle, one gold idea).

### 6. CHECKPOINT with AC (mandatory — before the final render)
Present: the chosen story + sources, the on-screen copy per scene, 1–2 QA frames, the
caption + hashtags, the VO script, the cover draft, and the **virality scorecard** from
`algorithm-2026.md` (x/10 with one line per row — this answers "is this going to blow
up?"). Score below 8 → revise first, don't present a weak draft. Then **wait for AC's
go** (or apply his tweaks and re-QA). Only proceed unprompted if the session is clearly
unattended, saying so plainly.

### 7. Build and verify
Backgrounded (`nohup … &`, then poll) so a tool timeout can't kill the render — the TOD
render is ~90s:
```bash
bash SKILL_DIR/scripts/build_video.sh reel.html AC_<Format>_Day<N>_<slug>.mp4
```
The script auto-picks the right audio track per engine. Verify: `ffprobe` duration
(~11.7s News / ~31.6s TOD) with video+audio; extract the t=0 frame (News: loud open
survived encoding) or a cue frame (TOD: 6.6s odometer / 14.1s chart) to confirm sync.
Also build `--silent` when AC plans a voice-over. Render the cover (TOD: edit
`cover.html` EDIT markers, screenshot at 2× then lanczos-downscale to 1080×1920; News:
brand-system cover page). Keep cover key elements inside the center 1080×1350 grid crop.

### 8. Grade, deliver, log
Grade the hook (A–F per `hooks.md`; ship A- or better, one rewrite pass if below) and
finalize the scorecard. `SendUserFile`: **MP4**, **cover PNG**, **vo_script.md**,
**caption.txt** (SEO line + caption + 5 hashtags, + 繁體中文 version if chosen),
**script.md**, **ab_hooks.txt**, and a short **posting note** (trial-reel + timing +
baked-SFX guidance from `algorithm-2026.md`). Present the grade + scorecard so AC sees
why it will hold attention. Then append to `run-log.md`: date, day #, format, story +
source, theme/look, hook grade, scorecard, files. The log is the series memory — keep it.

## Guardrails

- **Frame one is loud and the payoff comes first.** Never a fade from black, never a tease.
- **One gold accent per scene.** Black canvas, Lora + Poppins only, plain English; if a
  12-year-old couldn't follow scene A, rewrite it.
- **No em-dashes on screen, ever** (captions may use the em-dash CTA lead).
- **The handle comes from the `HANDLE` constant** in each template — one line, both spots.
  Never hardcode a second handle or mix two.
- **Never change SCENES timings** without updating the matching audio cues
  (`reel_audio.py` / `tod_audio.py`), or the sound desyncs.
- **Verify every number** from 1–2 credible sources; match their wording. No hype, no
  "this changes everything," no hard selling in feed — value in feed, offer in DMs.
- **Don't skip the checkpoint (step 6) or the scorecard gate.** They are the difference
  between shipping content and shipping retained content. When unsure on voice, defer to
  `ac-instagram` Part 2.
