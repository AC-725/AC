---
name: ac-studio
description: >-
  Austin's single front door for the Instagram brand "AC — AI in Plain English"
  (@itsac.ai) — both the video studio (Tool of the Day, a 31s animated tool demo;
  and AI News, a sub-12s reel that opens on the payoff and loops) and the brand
  protocol (voice, post formula, captions, bio, Story Highlights, posting calendar,
  hashtags, growth). Researches fresh stories, verifies every number, writes
  algorithm-aware copy, gates on a virality scorecard, checks in with AC before
  rendering, then ships the MP4, cover, VO script, caption, hashtags and A/B hooks.
  Use this WHENEVER Austin touches his Instagram — a reel, video, TOD, tool of the
  day, AI news, "day N" content, a post, caption, bio, highlight, hashtag set,
  weekly plan, growth question, or any AI story, tool or number he drops for the
  page — even when he never names the brand or the format. The single source of
  truth for how the page looks, sounds and grows. Replaces ac-instagram,
  ac-reel-creator, ac-ai-news and ac-tool-of-the-day.
---

# AC — Studio (@itsac.ai)

One skill, everything the page needs. It exists because the brand only works if
the video, the words, and the growth moves all sound like the same person — and
that's much harder when they live in four separate places that can drift apart.

> `SKILL_DIR` below is this skill's base directory. Substitute it in commands.
> Work in a scratch dir; always `cp` templates, never edit the originals.

## The brand in one breath

- **Brand:** AC — *AI in Plain English* · **Person:** Austin (goes by AC)
- **Handle:** `@itsac.ai`
- **The promise:** *Making AI make sense for normal businesses.* One real AI
  trend a day, plain English, zero jargon. Hong Kong → worldwide.
- **The feeling:** premium, calm, confident. Black canvas, one gold idea,
  elegant serif headline. "Quiet luxury," never "hustle bro."

The internet is drowning in AI hype; this page is the antidote. Every piece of
content reinforces one reputation — **"this person makes AI make sense."**

## Voice — read before writing anything

The visuals are already systematized, so the voice is the asset that actually
varies. Sound like this:

- **Direct and plain-spoken.** Short sentences. If a 12-year-old couldn't follow
  it, rewrite it.
- **Contrarian but constructive.** Challenge the obvious take, then give a better
  one. Never doom — always a way forward.
- **Grounded in one real number.** The number earns attention; the plain-English
  explanation keeps it.
- **Encouraging, not preachy.** The guide who's been there, warm and a little wry.
- **Anti-hype, pro-action.** AI isn't magic, it's leverage — and leverage only
  pays people who pull it. Start with one boring, painful, repetitive task.
- **Never salesy in-feed.** Value pulls people in. Offers live in Highlights and
  DMs, never in daily posts.

## Task router

Read only what the task needs — loading all of it wastes context and blurs focus.

| AC asks for | Lane | Load |
| --- | --- | --- |
| A reel / video / TOD / AI News / "day N" | **A — Studio** | `hooks.md` + `algorithm-2026.md`, then the engine's slot guide |
| A post, caption, or "what should I post" | **B — Protocol** | `content.md` |
| Bio, profile, link-in-bio, Highlights, graphic check | **B — Protocol** | `foundation.md` |
| Growth, reach, weekly plan, engagement routine | **B — Protocol** | `growth.md` |
| Hashtags | **B — Protocol** | `content.md` (hashtag banks) |
| Visual system, palette, type, template internals | either | `brand.md` |

If a request spans both lanes — "turn this story into a reel *and* a carousel" —
run Lane A first; its research and verified numbers feed the written post.

---

# Lane A — the video studio

Two engines, both prebuilt. Never rebuild animation, render, or audio ad hoc.

| | AI News reel | Tool of the Day |
|---|---|---|
| Template | `assets/reel.template.html` | `assets/tod.template.html` |
| Length / scenes | ~11.7s · A–E | ~31.6s · A–G |
| Signature | Loud open, odometer, toggle, loop | Typing prompt, self-building site, 4 build-cards, old-vs-now chart, 3 steps |
| Look | `THEME`: ember · aurora · spotlight · grid | Fixed premium look (consistency is the brand) |
| Audio (auto-detected) | `reel_audio.py` | `tod_audio.py` |
| Cover | Brand system (`format-scenes-themes.md`) | `assets/cover.template.html` |
| Slot guide | `references/format-scenes-themes.md` | `references/tod-scenes.md` |

Both templates carry a single `HANDLE` constant (`@itsac.ai`) filling the
watermark and CTA. Change it in one place only; keep `cover.template.html` in sync.

### 0. Read the playbooks
`references/hooks.md` (retention + hook grading) and `references/algorithm-2026.md`
(ranking signals + virality scorecard). Everything below assumes both.

### 1. Greet AC and route
Open by name ("AC — ...") and ask via `AskUserQuestion`: **Tool of the Day or AI
News today?** plus **which day #**. Check `run-log.md` for the last day, theme, and
grades so numbering and rotation stay consistent. If AC already named the format or
day, don't re-ask — confirm in one line.

### 2. Research and suggest (3–5 options)
Web-search fresh, never from memory. Verify every key figure against 1–2 credible
sources and match their wording. Screen by the format's pick criteria (news:
`voice-and-caption.md`; tools: current hook, useful to normal businesses, teachable
in 3 steps, concrete payoff). Present **3–5 candidates**, each with the hook idea,
the big number, AC's angle, and an *algorithm read* — who sends this to whom, i.e.
the share trigger. Let AC pick. If he defers, choose the strongest and say so.

### 3. Confirm the creative (one AskUserQuestion call)
- **3 theme suggestions.** News → 3 of the 4 THEMEs matched to the story's energy,
  excluding what recent days used. TOD → the video look is fixed, so offer 3
  cover/hook styling variants instead.
- **Hook style:** thesis-first, concrete-image, or direct-callout (`hooks.md`).
- **Bilingual caption:** ask whether this run also ships in 繁體中文.

### 4. Write the words
Per `references/voice-and-caption.md`: on-screen copy per scene (payoff first, one
real number per scene, no em-dashes on screen, headline width limits per engine);
the **caption** whose first line is a plain-language search phrase (social SEO),
carrying one big number, a question, and a soft CTA; **5 trending-but-rankable
hashtags**; the **timed VO script**; **2 A/B hook variants** for trial reels; and
the **shot-by-shot script**. Every reel needs a **share trigger**.

### 5. Fill the template and QA frames
```bash
mkdir -p run && cd run
cp SKILL_DIR/assets/reel.template.html reel.html   # or tod.template.html
```
Fill `CONTENT` slot-by-slot per the engine's slot guide; set `THEME` (News) and
confirm `HANDLE`. QA before any full render:
```bash
# News:
node SKILL_DIR/assets/render_frames.js reel.html qa "0,1.7,3.5,4.6,6.6,7.3,8.6,10.3,11.2"
# TOD:
node SKILL_DIR/assets/render_frames.js reel.html qa "3.6,7.6,11.2,15.5,22.5,26.2,29.6"
```
Read the PNGs: copy fits, one gold idea per scene, chart labels inside the plot,
handle present. News: run the first-frame checklist on t=0.

### 6. CHECKPOINT with AC — before the final render
Present the chosen story + sources, on-screen copy per scene, 1–2 QA frames, the
caption + hashtags, the VO script, the cover draft, and the **virality scorecard**
from `algorithm-2026.md` (x/10, one line per row — this answers "is this going to
blow up?"). Below 8 → revise before presenting; a weak draft wastes AC's review.
Then wait for his go, or apply tweaks and re-QA. Proceed unprompted only if the
session is clearly unattended, and say so plainly.

This checkpoint is where most of the quality comes from. Skipping it ships content
that renders correctly and lands badly.

### 7. Build and verify
Background it (`nohup … &`, then poll) so a tool timeout can't kill the render —
TOD takes ~90s:
```bash
bash SKILL_DIR/scripts/build_video.sh reel.html AC_<Format>_Day<N>_<slug>.mp4
```
The script auto-picks the right audio per engine. Verify with `ffprobe`: duration
(~11.7s News / ~31.6s TOD) with both video and audio streams. Extract the t=0 frame
(News: confirm the loud open survived encoding) or a cue frame (TOD: 6.6s odometer,
14.1s chart) to confirm sync. Also build `--silent` when AC plans a voice-over.
Render the cover (TOD: edit `cover.html` EDIT markers, screenshot at 2× then
lanczos-downscale to 1080×1920; News: brand-system cover). Keep cover key elements
inside the center 1080×1350 grid crop.

### 8. Grade, deliver, log
Grade the hook A–F per `hooks.md` — ship A- or better, one rewrite pass if below.
`SendUserFile`: **MP4**, **cover PNG**, **vo_script.md**, **caption.txt** (SEO line
+ caption + 5 hashtags, plus 繁體中文 if chosen), **script.md**, **ab_hooks.txt**,
and a short **posting note** (trial-reel, timing, baked-SFX guidance from
`algorithm-2026.md`). Show the grade and scorecard so AC sees *why* it will hold
attention. Append to `run-log.md`: date, day #, format, story + source, theme, hook
grade, scorecard, files. The log is the series memory — keep it current.

---

# Lane B — the brand protocol

Static posts, profile, and growth. Same voice, same guardrails, no render step.

### The post formula
Every strong post follows this arc — use it as the default skeleton:

1. **Hook** — punchy, often contrarian, anchored to one real stat.
   ("Nobody posts this part: 40% of AI agent projects will be scrapped by 2027.")
2. **Reframe** — flip the obvious reading. ("Sounds like bad news. It's actually
   the most useful stat I'll share all week.")
3. **Plain-English breakdown** — 2–4 short beats with a concrete example or an
   old-way/new-way contrast. One idea, explained simply.
4. **The rule** — a memorable, repeatable principle. ("Small wins compound. Hype
   evaporates.")
5. **CTA** — soft, on the value. Em-dash lead, then one of: *Save this · Tag
   someone · Comment "X" · Follow @itsac.ai for daily AI trends — no hype, no jargon.*

Formatting tics that make it read like AC: one big number per post, line breaks
every 1–2 sentences for mobile, a question near the end to pull comments, and ~30
words max for any line going *on a graphic* (captions can run longer).

### Where the depth lives

- **`references/foundation.md`** — profile and bio, the exact colour/type/layout
  system, post anatomy, the six Story Highlights, launch checklist. Anything about
  *how the page looks or is set up*.
- **`references/content.md`** — content pillars, the seven launch posts (full
  captions, doubling as gold-standard voice examples), the 7-day calendar, hashtag
  banks. Anything about *what to post*.
- **`references/growth.md`** — cadence, the engagement routine that actually moves
  reach, pillar rotation, the soft-sell CTA ladder. Anything about *gaining traction*.

---

## Guardrails

Few hard rules; everything else is judgment. These exist because the repetition
*is* the branding — break them and the page stops reading as a brand.

- **Frame one is loud and the payoff comes first.** Never fade from black, never tease.
- **One gold accent per scene or post.** Gold means "look here." No other colours,
  no stock photos, no clip-art.
- **Lora for headlines, Poppins for labels and body.** Never substitute.
- **No em-dashes on screen, ever.** Captions may use the em-dash CTA lead.
- **The handle comes from the `HANDLE` constant** — one line, both spots. Never
  hardcode a second handle or mix two.
- **Never change SCENES timings** without updating the matching audio cues
  (`reel_audio.py` / `tod_audio.py`), or the sound desyncs.
- **Verify every number** against 1–2 credible sources and match their wording. No
  hype, no "this changes everything," no fear-mongering.
- **No hard selling in feed.** The ladder is Save → Follow → Comment → DM; the offer
  appears only in Highlights and DMs.
- **Don't skip the checkpoint or the scorecard gate.** They are the difference
  between shipping content and shipping content that gets retained.
- **Show up daily.** The algorithm and the audience both reward reliability over
  intensity.
