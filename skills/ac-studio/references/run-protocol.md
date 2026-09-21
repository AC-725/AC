# The Standing Run Protocol — AI News

Locked 26 Aug 2026 by AC, in full, in one sitting. **Do not re-ask any of it.**
This file replaces the intake interview for AI News runs.

---

## How a run starts

Arrive with the block **already filled on a real story**. Never an empty template.
Never an opening question. Pre-fill every line — story candidates, theme, hook,
beats, camera moves, figure actions, subtitles, VO, caption, hashtags, cover — and
let him strike what is wrong.

He replies **in plain chat words**, not line numbers, not doc edits.

### Story
- **Three candidates. He strikes two.** The survivor gets the deep verification pass.
- Lanes he wants: big-lab releases and model news · tools an SMB can use tomorrow ·
  AI and jobs/labour · money (funding, valuations, spend) · regulation and law ·
  adoption numbers (who is actually using it).
- **Past week.** Any number type — whichever figure is strongest.
- Trackers and aggregators are a **lead, not a citation**. Verify to primary source
  before anything goes on screen.

### Whose call is what
| Agent decides alone | He decides |
| --- | --- |
| Theme rotation | Story |
| Band geometry / layout | Hook wording |
| Which numbers go on screen | Beat count and runtime |
| Hashtags | Camera plan per beat |
| Three pack directions, the 2D/3D + look recommendation, the three-family declaration | The direction, the look, red on/off and its element |
| | Figure action per beat |
| | Subject artwork and scale |
| | Subtitle copy · caption · VO length · cover hero |

### The stops (2026-09-20 — four, each closing on a tick-box form)
0. **The pack brainstorm** — three directions that differ in metaphor, an object per beat,
   the 2D/3D + look recommendation with its reason, the colour declaration (red and team
   colours off unless named), the pick named **and the pick's hero baked** so the choice is
   visual. Before any words. `references/imagery-pack.md` §3.
1a. **The pack board** — every baked object at 600px, at TRUE mount on its ACTUAL ground,
   at 140px. Mandatory now that every run bakes; retires the optional Day 41 bake board.
1. **The stills board** — one frozen frame per beat, each at its BUSIEST moment, pack mounted.
2. **The finished MP4.**

Silence at any stop is a Hold, never a Go.

**Stop 1b · the bake board** (AC, Day 41, 2026-09-11 — **retired into Stop 1a on
2026-09-20**; kept here as the record of where the board came from) — optional, **default ON on any
day a new 3D anchor was baked.** Sits between the stills board and motion. The board
shows the icon at 600px, at mount size on its ACTUAL ground (gold band or black), and at
140px feed size; plus any recoloured vendor marks at cut size and at mount size. AC
approves or strikes in plain words. Nothing mounts before this.

**The headline strike round** (AC, Day 41). On the final confirm, list all six
headlines as tick-boxes. For any headline he leaves unticked, offer three rewrites plus a
free box. Meta line and sub follow the chosen headline. If he submits blank, choose from
the offered set and report the picks. Day 41 picks: "650+ security teams. Not you." ·
"Not for you. Any of them." · "Your door is still open."

Nothing between them needs him. **No reply means no build** — wait however long it
takes. A **failed board loops**: he sends a numbered fix list, one line each, all at
once; fix it, send a revised board, repeat until every frame passes. Motion starts
only after the board passes.

**The follow-up rule** (AC, Day 41 — replaces the 3 Sep version). He will press
"follow-up" repeatedly. Each round: ask ONLY what he could not have answered before the
last round. When nothing changes the build, the round is a single Go/Hold. Never re-ask a
settled item. A blank submit with "decide for me" means pick from the options already
offered and say which.

---

## Runtime and pacing

- **15s default.**
- **~2.8s per content beat** when the story carries a comparison AND a catch —
  six or seven beats, 17.0–19.6s.
- The payoff still lands on frame one. The extra seconds buy reading time, never a
  slower open.
- "Too static" is answered with **camera work**, not faster cuts.

---

## HARD BANDS (1080×1920)

Four exclusive `position:absolute` + `overflow:hidden` boxes. Nothing can cross an
edge because the box eats it.

| Band | y | Holds |
| --- | --- | --- |
| CHROME | 0–176 | kicker left, handle right, progress rule |
| TYPE | 196–640 | hero number, headline, meta · x80, maxWidth 920 · **never inside a camera transform** |
| STAGE | 640–1160 | figure, subjects, charts · floor rule at 478 within the band · **camera translateX ONLY, no zoom** |
| SUB | 1170–1300 | one whole-fragment subtitle, nothing else enters |
| — | 1300+ | dead black — the app's caption block and action rail. Never reclaim it. |

Closeness comes from scaling a subject about its own planted foot
(`transformOrigin: 50% 100%`), never a camera zoom. The floor rule sits at the same
y in every beat, with feet welded to it.

**Depth:** three planes — a dim gold horizon hairline drifting slowest, the stage,
the figure in front.

---

## Colour law on the stage

**One gold mass per frame.** The narrator is gold, so **type is cream**. Gold goes
to the figure, or to the stage graphic with the figure stepped back. Subjects are
cream, never gold. A gold hero number beside a gold figure is the defect this rule
exists to prevent.

---

## Motion law

- Entrances are **rising masks**: `overflow:hidden`, `translateY(104% → 0)`,
  easeOutCubic 0.46s, 0.1s stagger. Never fades.
- Frame-one elements are **fully on at t=0**.
- Give every rise box `padding-bottom: 0.26em` or descenders clip.
- The figure narrates, **the mark signs**. Final beat: figure out, mark in.
- **Loop seam is a hard cut** when the closing and opening compositions differ.

---

## Build path (no shell)

Build the reel as a Design Component on `animations-v3.jsx`. Never hand-roll a
timeline — it removes his timeline editor and video export.

Geometry lives in **ONE file** exporting `Frame(t)`. The stills board and the reel
mount the identical function, so approved stills and exported video cannot drift.
The engine binding is ~30 lines and holds no geometry.

Declare `OM_SCENES` and `OM_PLAYBACK` as JSON string literals in plain inline
`<script>` tags in the helmet, one scene per beat with a true `desc`.

**Reload the page before screenshotting** or you QA the previous build.

---

## Deliverables per run

Reel (silent, burnt subtitles, figure on) · cover · caption · hashtags · VO script
as a printable page · DM reply.

**English only** unless he asks. He records the VO himself, so ship a silent cut and
a timecoded script.

**The post-now bundle** (AC, Day 41). When he says he is posting now, `export/` holds:
the cover PNG at 1080×1920 ×1, the caption + VO + DM md, and any new assets. Zip it.
The MP4 cannot be bundled by the agent — the reel stays open in his tab for timeline
export. Say so in one line, no more.

**The VO shape** (AC, Day 41 — replaces the old budget prose). One clause per beat, max
two. The screen carries numbers, dates and product names; the voice carries the verb.
Full stop = pause. Measured on the approved Day 41 cut: 55 syllables / 16.8s = 3.3
syl/s (2.0 words/s), body beats 2.5–3.6, the hook beat 4.6. Gate 8 now grades to that.

**Cover:** ONE hero — figure or headline, never both. Kicker top-left, mark small
bottom-right with its `markGlow` radial behind it, key ink inside the 1:1 centre
crop (y 420–1500). Both standing taglines present: `AI IN PLAIN ENGLISH` under the
handle, `NO HYPE · NO JARGON` in the footer.

---

## Verification — the named failure mode

On the 26 Aug run, "Oracle cut 30,000" was a TD Cowen estimate that coverage
repeated until it read like fact. Oracle's fiscal 2026 Form 10-K shows headcount
falling 162,000 → 141,000: **21,000**. The reel was about exactly that error, and
the error was in our own script.

Every figure goes to primary source before it goes on screen. An estimate repeated
by coverage is not a fact.
