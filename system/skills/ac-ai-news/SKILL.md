---
name: ac-ai-news
description: >-
  SUPERSEDED — do not use this skill for new work. `ac-reel-creator` now produces the AI News
  format (and Tool of the Day) from one engine, and every reference in this skill also exists
  there. Use `ac-reel-creator` for any reel, video, AI news, "day N", or headline-to-reel
  request, including phrasings this skill used to claim like "make me an AI news video",
  "today's AI news", or "turn this headline into a reel". Retained only as a historical record
  of the original sub-12s AI-news scene breakdown; it is not the source of truth for anything.
  For static posts, captions, bio, or highlights use `ac-instagram`.
---

# AC — AI News (front-loaded animated Reel)

> **SUPERSEDED.** `ac-reel-creator` builds this format now, from the same engine plus a run
> log that keeps day numbering and theme rotation consistent. Everything below also lives in
> its references. Use `ac-reel-creator` for new videos; read this only for history.

This skill turns one current AI headline into a finished, on-brand Reel that is engineered to
retain. The engine (animation, render, synced sound) is prebuilt and verified; your job each run
is to **pick a real story, ask AC the three questions, pour front-loaded words in, grade it, and
build**. The whole reason this exists: AC's videos were losing viewers in the first second and
burying the payoff at second 8. This format fixes both by design — it opens loud and leads with
the conclusion.

Deliverables every run: **MP4** (sub-12s, animated + synced sound), **caption + 5 hashtags**,
**shot-by-shot script**. Cover graphic optional.

## What's in the box
- `assets/ainews.template.html` — the front-loaded timeline. Edit only its `CONTENT` object.
- `assets/ainews_audio.py` — synthesizes the synced SFX track for this timeline.
- `assets/render_frames.js` — headless-Chromium frame capture (also QA mode).
- `scripts/build_video.sh` — one command: render → synth audio → encode + mux.
- `references/hook-retention-guidelines.md` — **read this first.** The five rules, anti-patterns,
  the three hook styles, and the grade scale. This is what makes the video retain.
- `references/format-and-scenes.md` — every `CONTENT` slot, copy limits, how to adapt per story.
- `references/voice-and-caption.md` — AC voice, story-pick criteria, caption formula, hashtags.

## Workflow

### 0. Read the guidelines
Open `references/hook-retention-guidelines.md` before writing anything. Everything below assumes
those five rules (open loud, payoff first, one moment per scene, real numbers, loop close).

### 1. Get and verify the story
If AC gave a link or headline, use it. Otherwise web-search current AI news (never rely on
memory for "what happened") and find a real story with a concrete number a normal business owner
should care about. Verify the key figure from 1–2 credible sources and match the source's wording.

### 2. Ask AC three things (do not skip — this is the point of the skill)
Before writing copy, STOP and ask AC these three, so the reel is his angle, not a guess. If the
`AskUserQuestion` tool is available, use it (one call, three questions); otherwise ask in plain
text and wait. If the session is clearly unattended, make the strongest choice, state it, proceed.

1. **The news + source** — confirm the exact story and a link, so the facts are right.
2. **The hook style** — thesis-first, concrete-image, or direct-callout (see the guidelines).
   This decides how scene A's payoff line is phrased.
3. **The big number + angle** — the one proof stat that odometers up, and AC's contrarian "so
   what" (the truth the number points to).

The CTA and tagline default to the brand standard (@itsac.ai · "Daily AI, no hype, no jargon" ·
loop line) unless AC says otherwise.

### 3. Write the words first (front-loaded, AC voice)
Read `references/voice-and-caption.md` and draft, in AC's voice:
- the **on-screen copy** for each scene (becomes the `CONTENT` object), **payoff in scene A**,
  one real number per scene, no em-dashes, big Lora lines ≤ ~16 chars;
- the **caption** (5-beat arc, one big number, a question, soft CTA);
- the **5 hashtags** (one broad-topical, one capability, one category, two audience);
- the **shot-by-shot script** (per scene: on-screen / visual / SFX).
Then fill the `CONTENT` object slot-by-slot per `references/format-and-scenes.md`. Work in a
scratch dir; copy the templates so you never edit the skill's originals:
```bash
mkdir -p ainews && cd ainews
cp /path/to/ac-ai-news/assets/ainews.template.html reel.html
```

### 4. QA the frames, then build
Always eyeball a contact sheet before the full render, and **run the first-frame checklist from
the guidelines on the t=0 frame** (headline fully up, it's the payoff not a tease, one gold idea,
@itsac.ai present):
```bash
node /path/to/ac-ai-news/assets/render_frames.js reel.html qa "0,1.7,3.5,4.6,6.6,7.3,8.6,10.3,11.2"
```
Read the `qa/*.png`, fix the `CONTENT`, re-QA. Then build (backgrounded, so a tool timeout can't
kill the render):
```bash
bash /path/to/ac-ai-news/scripts/build_video.sh reel.html AC_AINews_<story>.mp4
```
Spot-check the MP4: `ffprobe` shows ~11.7s with audio+video; extract the t=0 frame to confirm the
loud open survived encoding.

### 5. Grade and finalize (the feedback step — do this, don't skip it)
Before delivering, grade the finished video against the guidelines and tell AC honestly:
- **Scene A hook grade (A–F)** with a one-line reason, using the grade scale in the guidelines.
- **First-frame check** — pass/fail on the four-point checklist.
- **Retention read** — is the payoff first, does every scene have a moment, does it loop.
If scene A grades below **A-**, rewrite scene A (offer AC the other two hook styles) and rebuild
once, then re-grade. Ship only an A- or better. Present the grade with the file so AC sees why
it will hold attention, and what he could push further next time.

### 6. Deliver + save
`SendUserFile` the **MP4**, a **caption.txt** (caption + 5 hashtags), and the **script.md**. Tell
AC the sound is a baked synced SFX layer (post as-is; if he adds a trending track, duck or replace
this one so they don't clash). If a "Tool of the day" / content project exists, save the package
(story + caption + hashtags + sources + grade) so it's reusable across sessions.

## Guardrails
Black canvas, one gold accent per scene, Lora + Poppins only, plain English (no buzzwords, no
"this changes everything"), no hard selling in feed, @itsac.ai on every frame, **no em-dashes on
screen**, and above all: **frame one is loud and the payoff comes first.** When in doubt on voice,
defer to the `ac-instagram` skill's Part 2.
