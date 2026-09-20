---
name: ac-studio
description: >-
  Austin's single front door for the Instagram brand "AC — AI in Plain English"
  (@itsac.ai) — the video studio (Tool of the Day, a 31s animated tool demo; AI News, a
  sub-12s reel that opens on the payoff and loops), the carousel and static-post system,
  and the brand protocol (voice, post formula, captions, bio, Story Highlights, posting
  calendar, hashtags, growth). Researches fresh stories, verifies every number, writes
  algorithm-aware copy, brainstorms the post's own imagery pack with AC before drafting
  (Stop 0: hero, anchors and rail as one 2D or 3D family, three colour families per post),
  gates on a layout audit and a virality scorecard, checks in with AC at every stop, then
  ships the MP4, cover, VO script, caption, hashtags and A/B hooks. Use this WHENEVER Austin touches his Instagram — a reel, video, TOD, tool of the
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

**Update 2026-09-20 · THE IMAGERY PACK, THE THREE-COLOUR LAW, STOP 0.** AC's call in a
written round of four questions, then a brainstorm. Every post now ships with its OWN
imagery pack — hero object, one anchor per slide or beat, the rail glyphs — conceived for
the story and built as ONE family, and nothing mounts before it is brainstormed, approved
at true size and gated. Six laws and one engine. Full spec: `references/imagery-pack.md`.

1. **The pack is per topic, in full.** The catalog is a bench of builders, not a shipping
   set: an archived object is legal on a post only RE-BAKED into this pack's look. Every
   pack is filed in `references/pack-archive.md`; no hero repeats inside 14 days.
2. **Stop 0 · the pack brainstorm** — before the beat sheet or any slide CONTENT (Lane A
   step 3c, Lane B right after the interview). Three directions that differ in METAPHOR,
   each with an object per slot and what it means, a 2D/3D + look recommendation WITH the
   reason, the colour declaration, bakes and risk — pre-filled on the real story, the pick
   named. `assets/pack-brainstorm.template.md`. AC answers one tick-box form.
3. **The three-colour law.** BLACK · GOLD · CREAM are the three families on every post,
   the ground counts, shades of one family are one family. RED is the single exception —
   ONE element, for the one thing that must be seen, declared at Stop 0 with the reason;
   never chrome, never an icon, never two. **Gate 10** (`scripts/gate_colours.py`) measures
   every rendered slide and every sampled video frame; `produce.sh` runs it after the
   build, reading the declaration from `pack/pack.json`.
4. **2D or 3D is recommended per topic, with the reason; AC decides.** The rubric is in
   `imagery-pack.md` §4 (a reference → flat; nameable things → matte; systems and
   quantities → wire or a flat diagram; Prompt Drop → polished; ≤60px → hairline; reels
   mount PNGs transform-only). A reference sheet still outranks the recommendation.
5. **Premium is defined in ten checks** (`imagery-pack.md` §2): restraint executed with
   craft — one silhouette, one family, true materials, a scale system, negative space,
   clean edges, one line weight, colour discipline, physical plausibility, one move per
   beat. An object that fails one check does not go on the board.
6. **Questions at every stop; silence is a Hold.** Stop 0 (brainstorm) → **Stop 1a (the
   pack board — mandatory now, every run bakes; retires the optional Day 41 bake board)**
   → Stop 1 (stills board) → Stop 2 (the finished file). Each closes on one
   AskUserQuestion form with tick boxes and Go/Hold. The follow-up rule stands.

**The engine.** `assets/pack-bake.template.html` — ONE `LOOK` per pack (matte · polished
· wire); builders describe shape through the material kit, the family (camera, key, rim,
hemi, contact shadow, exposure) is fixed under ENGINE, so a pack cannot drift into mixed
looks; three.js vendored in `assets/vendor/` (unpkg is blocked in remote sessions) →
`scripts/bake_pack.js` (serves the run dir itself over localhost: no CORS, no wrong-cwd
404) → `scripts/prep_pack.py` (crop to ink, square ×1.08, wire alpha ×1.45, fails a
cropped render) → `pack/pack.json` (the manifest; schema by example in
`assets/pack.example.json`) → `scripts/gate_pack.py` (**Gate 11**: slots covered or
declared, Gate 9 alpha, edge, ink inside the families, no 3D under 60px, one look) →
`scripts/render_pack_board.js` (Stop 1a: every object at 600, at TRUE mount on its ACTUAL
ground, at 140). Verified clean-room this session from skill paths alone: three matte
objects baked, prepped, gated and boarded; the board is kept as the worked example at
`assets/icon-boards/pack-board-example.png`. Gate 10 was proven against the deck
engine's own slides (seven clean, zero false fails at the 8×8 reduce) and against
synthetic defects (a 30×30px foreign block, undeclared red). The `pack/` folder rides in
the run zip.

**Update 2026-07-29 · subtitles.** Both video engines carry a baked-in typed-caption
system. Subtitles are **mandatory on every video** — written with the words (step 4),
filled with CONTENT (step 5), verified before shipping (step 8). See
`references/subtitles.md`.

**Update 2026-08-21 · ONE CUT.** AC's standing rule: **every video run ships exactly one
cut — subtitled, with the AC figure on.** No clean cut, no silent cut, no light pair
unless AC asks for one that day (produce.sh flags: `--clean-also`, `--silent-also`,
`--light`). `FIGURE='on'` is now the default in BOTH engines; a run turns it off only on
AC's explicit call. Three cuts per run was costing build time and phone taps for files
that never got posted.

**Update 2026-08-25 · the DC path + the pacing laws.** From the "A robot beat Usain
Bolt" run (15.2s, crest), built entirely inside **Omelette Design Components** because
the session had no bash, python or ffmpeg. When a session has no shell, the engines in
`assets/` cannot run — build the reel as a Design Component instead; every brand law
survives and AC gets a timeline editor and a video export. The path:
`references/dc-engine.md` (build, QA without `qa_layout.sh`, export) +
`references/reel-geometry.md` (the crest 1080×1920 frame table that passes gates 1, 2
and 6). Five laws proven on that run now bind EVERY build path, shell or not: draw the
subjects (`references/comparisons.md`), ~2.8s per content beat when the story carries a
comparison and a catch (`references/pacing.md`), camera work — not faster cuts — answers
"too static", rising-mask entrances never fades, one composition rendered twice
closes the loop seam (`references/loop-seam.md`), and — from four rounds of AC's
screenshots on the same run — pin the floor line and hang limbs from the joint
(`references/grounding-and-scale.md`), and run the overlap gate at every cue AND every
cue + 0.4s (`references/no-overlap-system.md` — five screenshots in one session were
each a graphic touching type at a zoom nobody measured).

**Update 2026-08-26 · HARD BANDS — stop measuring overlap, make it impossible.** The
same story came back a THIRD time with the same three defects (headline off the left
edge, headline on the subtitle, hero number under the machine). AC's call after ten
rounds of questions: build the frame as **four exclusive clipped bands** —
CHROME 0–176 · TYPE 196–640 · STAGE 640–1160 · SUB 1170–1300 · dead black below 1300 —
each a real `position:absolute` + `overflow:hidden` box, so nothing can cross an edge
because the box eats it. **Type never sits inside a camera transform. The stage camera
pans on X only — no zoom;** closeness comes from scaling each subject about its own
planted foot (`transformOrigin: 50% 100%`), which keeps feet welded to the rule and
leaves lane rules where their labels are. This retires the y-table in
`reel-geometry.md` for AI News reels and kills overlap classes 2 and 3 outright. Two
more laws from the same run: **the stills gate** — one board of frozen frames, one per
beat at its BUSIEST moment, approved by AC BEFORE anything animates — and **one shared
geometry file**, with the board and the reel mounting the identical `Frame(t)` so
approved stills and exported video cannot drift (the engine binding shrinks to ~30
lines holding no geometry). Full spec: `references/no-overlap-system.md` Steps 0, 0b,
0c and 3d.

**Update 2026-08-26 · THE FIGURE IS ART, NOT A RIG + Technique Day.** From the "Your
prompt is doing three jobs at once" run (29s, seven beats, DC path, no shell). Two laws
and one new format.

**The figure law.** The AC figure is a **locked drawing**, never a reconstruction. A
session that redraws him as an SVG rig — even faithfully, even from the v3 brainstorm
sheet — ships a different character: this run drew a four-pose rig with interpolated
limbs and it read as a crude stick figure beside the real art. He mounts as the approved
PNG at his own aspect ratio and is animated by **transform only**: position, rotation,
scale, opacity, a breathing scaleY. No re-posing, no slicing into head and limbs (AC
declined slicing when offered: "keep him whole, transform only"). When a beat needs him
to point, the locked akimbo pose has his hand on his hip and there is no arm to raise —
**a drawn gold hairline does the pointing**, from above his head, up and across to a dot
on the content lane, retracting on the cut. That is the hand-off law applied to gesture:
anything that must be READ gets drawn.

**Gate 9 · the alpha gate.** The v3 figure PNG shipped **fully opaque** — 872×1114 with
zero transparent pixels — so he mounted inside a white box on the flat black ground, and
AC saw it before any gate did (every pixel gate measures ink, not background). Every
figure and mark PNG is alpha-checked on arrival and knocked out if it is not already
transparent: luminance > 250 to alpha 0, ramp the 225–250 band so the anti-aliased gold
outline keeps its edge.

**Technique Day** is a TOD variant, not a new engine: the "tool" is a *prompting move*
rather than a product, so it carries no vendor name, no pricing and no free-tier risk —
and the deep-research pass shifts entirely onto THE NUMBER, because the move itself is
free and unfalsifiable-looking. It must hold in **ChatGPT, Gemini and Claude alike**; the
closing card names all three together and the demo UI stays neutral and unbranded. A
**copy beat is mandatory**. Spec: `references/technique-day.md`.

**Update 2026-08-26 (later) · THE STANDING RUN PROTOCOL.** AC answered the intake
questions once, in full, in one sitting, and **does not want them asked again**. The
protocol is project law: `references/run-protocol.md`. At the top level — a run
**ARRIVES with the block already filled on a real story** (never an empty template,
never an opening question); three story candidates, he strikes two; theme rotation,
band geometry, which numbers go on screen and hashtags are the agent's call, and
everything else is his (story, hook wording, beat count and runtime, camera plan,
figure action, subject artwork and scale, subtitle copy, caption, VO length, cover
hero); **exactly TWO stops — the stills board, then the finished MP4**; no reply means
no build, however long it takes; a failed board loops on a numbered fix list until
every frame passes, and motion starts only after that. Runtime per story: 15s default,
~2.8s per content beat when the story carries a comparison AND a catch (six or seven
beats, 17.0–19.6s). Deliverables: reel (silent, burnt subtitles, figure on), cover,
caption, hashtags, VO script as a printable page, DM reply — English only unless he
asks; he records the VO himself, so ship a silent cut and a timecoded script.

**Verification is now a NAMED failure mode.** On the 26 Aug run "Oracle cut 30,000"
was a TD Cowen **estimate** that coverage repeated until it read like fact — Oracle's
FY2026 Form 10-K shows headcount 162,000 → 141,000, i.e. **21,000**. The reel was
about exactly that error and the error was in our own script. An estimate repeated by
coverage is not a fact; trackers and aggregators are a **lead, not a citation**.

**The figure law, resolved.** The earlier "art, not a rig" call stands in principle —
no ad-hoc redraws, no generic pictogram reconstructions — but it is now satisfied by
an APPROVED construction, not a PNG: AC was shown three candidates, picked the one
built from his own artwork, and specified every property. The narrator is the stroke
rig in `references/figure-rig.md` (canonical file `AC Figure Rig.dc.html`): flat
`#E4C468` stroke, hollow head, no feet, full face at every size, six nested joints,
seven poses. Nothing outside that file is legal art for the narrator.

**Update 2026-08-29 · PROMPT DROP v2.** From "The Lie Detector" run (7 slides, DC path,
Canva-assisted). The Saturday pack grew from 3 prompts to 5 as standard and gained its
layout law: the cover hero is the PACK TITLE (stat line above it carries the number in
gold), the pack is NAMED on every frame, the walker figure (~120px) stands on the floor
bar at the gold segment's leading edge, one minimal 3D anchor sits right of each
headline, and the slide counter lives INSIDE the floor bar. 3D anchors are three.js
bakes under a simplicity gate (one silhouette, 3–8 parts, matte gold trio + cream).
Canva was probed as an icon source and FAILED the quality gate (no brand kits on the
account, no sized export, ~90px grid objects) — it remains legal for mood/whole-design
generation only. Carousel approval flow is two stops: the icon approval board, then the
finished pack. Full spec: `references/prompt-drop.md` (v2).

**Update 2026-08-30 · PROMPT DROP v3 + THE PACK ENGINE.** From "The Finish Line" run
(9 slides, shell path, three approval boards). Five laws and one reusable engine.

**The question opener outranks the pack-title cover.** v2 made the pack title the hero
unconditionally; shown three cover directions side by side, AC picked a **rhetorical
question** — "Why is AI still giving you generic answers?" — with the verified stat above
it and the answer in the sub. It must be a REAL question, not an ad question ("Tired
of…?" buys the hook and sells the register), and it needs a qualifier — "*still* getting"
assumes they have been trying, which is what makes a stranger self-identify. Read the
hook back as a sentence before it becomes 112px type: AC's first phrasing was inverted
("struggling to GET generic answers"), and nobody catches that at display size.

**The 9-slide teaching shape, and the spine that justifies it.**
`question → answer → proof → the key → the ask`. Cover asks, the RULE slide answers,
the five prompts prove, the tool slide hands over, the close collects. Two statements in
a row gives the reader nothing to swipe toward. **If slide 2 does not answer slide 1, the
pack is a list wearing a carousel.** The rule slide runs its teaching list as the HERO
(Gloock 52px, hairline ticks, last item in gold, no card, and the only slide with no 3D
anchor) — buried at body size it was invisible; promoted it is the slide people screenshot.

**The tool slide is the EXCHANGE slide. Never headline the disclaimer.** AC killed
"I did not build this. I found it." — the last slide before the CTA builds desire, it
does not manage expectations. Name the thing they get and make that word the keyword, so
slide 8 names it and slide 9 asks for it ("the key" → Comment **KEY**). A vague keyword
wastes the strongest word on the page. `WHAT YOU GET` must describe what is ACTUALLY
sent. Keep a small dim credit at the bottom — off the headline, but present, or the slide
implies AC built the tool.

**An exemption in a gate is a defect in hiding.** The pack gate carried `#fig|#count` as
an allowed pair "because the walker stands on the bar" — and that exemption is precisely
what hid his arm crossing the slide counter at full size. The exemption is gone; the
walker's lead is capped at 820px instead. If two things may not touch, fix the geometry.

**Icons are prepped, never mounted raw.** The baked `icons3d` PNGs carry ~60% transparent
padding, which is why they read as smudges. `scripts/prep_icons.py` crops to the alpha
bbox, squares, and lifts alpha ×2.1. Mount at **208px, not 300** — bigger makes a
wireframe read as mesh. `brain.png` fails at feed size; use `documentstack`.

**The engine.** `assets/promptdrop.template.html` + `scripts/qa_promptdrop.js` +
`scripts/prep_icons.py`. CONFIG / COVERS / SLIDE8 / CONTENT at the top, engine below;
every cover variant lives in `COVERS` so an A/B swap is one word and one render.
Verified clean-room: reproduces the shipped pack byte-for-byte from skill paths alone.
Full spec: `references/prompt-drop.md` (v3).

**Update 2026-09-02 · MATTE GOLD BAKES + THE CAROUSEL TECHNIQUE DAY.** From the "Ask, don't tell"
run (Day 40, 7-slide carousel, DC path, no shell). Three laws.

**The matte law.** AC ruled, in a written round of questions, that the 30 Aug brand block
(matte gold trio, soft warm key + gold rim, 3/4 front-left, soft contact shadow) now governs
in-house three.js bakes too, superseding the 22 Aug wireframe-only ruling for icons. Gold
only, no cream, no black substrate. The wireframe set stays legal; new bakes go in
`assets/icons3d/matte/`. Ten baked this run (chip, bubbles, scale, dial, key, question,
messagestack, hourglass, shield, brain); catalog in `references/icons3d.md`. Bake page:
`ac-studio-lab/threejs-lab/bake_icons_day40.html` (pinned unpkg import map, no vendored
three — it runs inside a Design Components session with no shell, which is the point).

**Technique Day as a carousel.** Same 7-beat spine as the reel (hook → answer → proof →
catch → copy → rule → ask), one 3D anchor per slide at 208px lower-right (never in the
headline band — the anchor at top:252 collided with every headline wider than 640px, three
boards in a row), chip hero 300px on the cover with a 3-icon proof rail at 128px under the
stat line, walker on beat slides only (off on cover, proof and copy slides — one gold mass).
Instagram action icons are drawn as 1.4px gold hairline strokes: two on the cover (save
lit), a labelled four-up on the close (Comment KEYWORD lit). Nowhere else.

**Bake capture without a shell.** Render to an alpha WebGL canvas with
`preserveDrawingBuffer`, dump to `<img>` via `toDataURL`, screenshot each solo at 600px on
the `#0A0A0A` ground, then knock luminance ≤14 to alpha and ramp 14–40 (Gate 9 inverted for
a black ground). Edges carry a faint dark fringe — invisible on the brand ground, so mount
only on `#0A0A0A`.


**Update 2026-09-03 · TIER LIST + ICEBERG, THE REFERENCE LAW, THE NO-OVERLAP GATE.** From the
two-post run "The AI Efficiency Tier List" (Post A, tier grid) and "How far down are you?" (Post B,
iceberg), 1080×1350, base theme, built entirely in Design Components (no shell). Two new Lane B
formats (see Lane B), and three standing rules AC set in his own words: **Reference law** — an
attached photo is the spec: measure it, re-open it every revision, and a flat reference ships a flat
deliverable (nine 3D bakes were rejected against a 2D illustration; the traced SVG shipped).
**No-overlap gate** — bbox every image and every text column before hand-off, never ship and wait
for the verifier. **Taste line** — "directive, informative, innovative and minimalistic unique."
Number verified: Gallup indicator dates 52% / 30% / 15% AI-at-work to **May 2026**, not July.
Ship pack, notes and CLAUDE.md in the project export.


**Update 2026-09-13 · PROMPT DROP v5 — THE SKILL AS THE EXCHANGE + DAY 42.** From Pack 09
"Workflow Builder" (7 slides + Story, Claude Design, no shell) and the Day 42 AI News reel
"76 / 14" (crest, 18.6s, six beats, DC engine). One number carried both days. Twelve laws.

1. **The exchange can be a SKILL, not a tool.** AC's call mid-interview: three prompts on the
   slides "for people who are very interested", and a downloadable skill that writes THEIR OWN
   prompts for everything else. Pack shape drops to **7 slides** — intro → rule → 3 prompts →
   the skill → close. The five-prompt v4 shape stays legal; v5 is the shape when the exchange
   is generative. The keyword names the exchange (GOLD). Spec:
   `references/prompt-drop-skill-exchange.md`.
2. **AC builds the skill himself.** The agent drafts a first `.md`; AC rewrites it in his own
   Claude chat and hands back a 4-file pack (`READ ME FIRST`, `paste anywhere.md` carrying a
   `BRANDING: PUBLIC|CLIENT` line, `workflow-builder.skill`, an owner's guide, plus the
   source). **The agent's draft is a scaffold, not the deliverable — never pack it as final;
   wait for his file and swap it in wholesale.** The DM sends `paste anywhere.md`;
   Claude-skills users get the `.skill`.
3. **Wireframe governed Pack 09, by reference.** The 9 Sep polished-for-Prompt-Drop precedence
   was overridden the moment AC attached a reference sheet. Reference law outranks format
   precedence. Full recipe in `references/icons3d.md`.
4. **The bake board shows the hero at TRUE size.** A 400px hero clips inside a 4-column grid
   card — span it two columns. Show the ink-on-gold capstone ON gold, not on black. Worked
   example kept at `assets/icon-boards/finish-line-icon-board.png`.
5. **Icons prep in one pass:** knock luminance ≤14 → alpha 0, ramp 14–40, crop to alpha bbox,
   square at ×1.08, write back. Then check no bbox edge touches the raw frame.
6. **The stills board becomes the pack by UNWRAPPING,** not re-authoring: strip the 50% scale
   wrapper, stack full-size, snapshot each `[data-screen-label]` at 1x. One source of geometry,
   zero drift — the 26 Aug shared-`Frame(t)` law applied to carousels.
7. **DC reel captions take the engine's `style` prop.** `<Captions>` ships in Inter; pass
   `{font:'400 30px Poppins…', left:80, right:80, top:1500, bottom:'auto',
   textAlign:'left', textShadow:'none'}` or the small-type law breaks silently.
8. **Vendor wordmark in the crest.** When the source IS the story, its wordmark sits in the gold
   band as a `SOURCE` lockup, ink-on-gold (`filter:brightness(0)`), 96px, from the hook onward.
   Prep: invert AC's black-on-white paste to `#E7C765` on alpha, crop, pad 12. Extends the Day
   41 leaf rule from the stage to the chrome band, crest only.
9. **The reel cover is its own static DC,** never a frozen frame of the animation —
   `snapshot_element` on the exportable root captures at stage scale (951×1690) and mid-motion.
   Build `<Reel> Cover.dc.html` at 1080×1920 from the hook geometry.
10. **Rule slide in RED, when AC picks it.** Four rule lines as red gradient text on the gold
    ground (`#D8262F→#8E1219`; the fourth, the rule proper, a second gradient
    `#E5484D→#A32328→#6B0F14`), dashes `#8E1219`. Extends the 12 Sep red-pair exception from
    hero numbers to the rule slide.
11. **Polished-yellow 3D kickers.** Every sub-heading (THE RULE, PROMPT 0N, YOU GET BACK, THE
    SKILL, WHAT YOU GET, WORKS IN, PASTE INTO) renders as gradient-clipped text
    `#FFE29A→#F2B94A→#C97F16`, Poppins 700 20–22px, two-layer drop shadow
    (`1px 1.5px 0 rgba(90,50,0,.9)` + `0 3px 5px rgba(0,0,0,.55)`). On gold ground:
    `#C2600E→#7A2E05` with a light shadow. Header kicker, counter and handle stay flat gold.
    **`text-shadow` does not work on clipped text — use `filter: drop-shadow`.**
12. **The Instagram action pack is an ASSET, not a drawing** — and it now ships in this package
    at `assets/ig/{like,comment,repost,share,save}.png`, cut from AC's supplied sheet,
    recoloured `#C9A961`, alpha from ink, 60–71px native. Close four-up at 40px (the asked-for
    one lit, others `.45`); intro SAVE · SWIPE flanked by `save` + `share` at 34px; nowhere
    else. **Retires the 1.4px drawn hairline glyphs from 2 Sep** — a hand-drawn Instagram glyph
    is recognisably not the Instagram glyph.

**Session memory** (AC, 13 Sep: "Stop forgetting previous sessions"). Every law set in a session
is written to the project `CLAUDE.md` the same turn, alongside the paste-ready UPDATE note. A
session opens by reading `CLAUDE.md` before its first question.

**The overlap gate earned its keep again** — three collisions the builder missed: geartrain on
the rule's second line, a ghost `76` on the docstack, the gear on the bench label after a
scale-about-centre. Fix: scale the dropping object about `50% 50%` but stop the drop 40px short
of the bench rule, and move labels 100px above it.

**The number, verified and now filed.** Goldman Sachs 10,000 Small Businesses Voices, press
release 17 Mar 2026, n=1,256 (Babson College + David Binder Research, fieldwork 27 Jan–4 Feb
2026). **76% use AI · 14% "fully integrating AI into core operations."** Footnote date is
**Mar 2026**, not the day it was read. The sample is 10KSB alumni — say "small businesses
surveyed" or name Goldman; **never "of all small businesses"**. 93% and 84% are of AI USERS,
not all respondents. Full entry with every wording gate: `references/verified-numbers.md`.

**Follow-up rule, observed in the wild.** AC pressed follow-up **seven** rounds on the opening
form and five more on the finalise form. Rounds that changed the build: 1 (shape), 2 (prompts,
hero), 3 (order, rule line), 4 (the hold → the skill idea), 5 (skill shape). Rounds 6–7 and
every finalise round after the file upload were Go/Hold only. The law holds: when nothing
changes, one Go/Hold — **and if he presses again after Go, START.**

**NOT IN THIS PACKAGE:** `Prompt Drop 09 Workflow Builder.dc.html`, `- Stills Board`,
`- Icon Board`, `Prompt Drop 09 Story.dc.html`, `AI News - Goldman 76-14 Reel.dc.html`,
`goldman-reel.jsx`, `AI News 13 Sep Cover.dc.html`, `bake/pd09_icons.html`,
`assets/icons3d/pd09-*.png`, `assets/goldman-sachs-gold.png`, `export/`. All in the Claude
Design project "Weekend content preparation". AC's Workflow Builder 4-file pack ships
separately as `workflow-builder.skill` + `WORKFLOW-BUILDER-paste-anywhere.md`.

**Update 2026-09-12 · CAROUSEL COMPONENTS — THE TWO COUNTS LAW.** AC's update pack from
the "Two Counts" deck (7 slides, crest, Claude Design), folded in verbatim at
`references/carousel-components.md` with a reconciliation header. Three things every
carousel session now does:

1. **Interview first, one form, always** — even when the brief looks complete: theme
   (base/crest/column/margin) · icon per slide from the approved pack (show the proposed
   map, he remaps) · figure on/off per slide · which slide is the save/screenshot slide ·
   accent for the hero numbers (gold default, or the approved red pair) · comment keyword.
   Then a **50% stills board** (`<Deck> - Stills Board.dc.html`) and STOP. Nothing renders
   full-size before he approves the board. This is the carousel form of "arrive filled":
   the map is proposed, not blank.
2. **Component vocabulary, learned every session** — crest frame (gold band 0–88px with the
   approved gradient, hairline frame inset 40, kicker 72px, counter top-right, handle
   bottom-centre), 7-node spine 148px above the floor, source footnote on EVERY slide,
   Bricolage Grotesque 800 hero numbers to 236px, headline caps 80–124px ≤3 lines with
   `right ≥ 400` beside a figure or icon, body Poppins 32px `right ≥ 420` on figure slides,
   lifted checklist rows, **exactly one ink-on-gold slide** (the rule slide by default),
   **exactly one save bookmark** (close only), figure mid-scale ~420px on beat slides only,
   icons top-right 260–400px opposite the headline, the close always takes the diamond
   mark, the checklist slide carries no icon. Two Counts icon map, reusable for any
   "who counted" deck: cover hourglass · split data chart · source A document stack ·
   source B globe · rule shield · close mark.
3. **Layout gate before the board ships** — no text box meets the figure or icon box;
   headline ≤3 lines; body never under the figure; spine node count = slide count and
   fills to the current index; footnote on all slides; exactly one ink-on-gold, exactly one
   bookmark; cover survives the 1080×1080 centre crop; no dates or day numbers on any
   graphic, sources only in the footnote.

Reconciled, not just pasted: the gradient lives on the band only (ground stays flat); the
red pair `#E5484D` / `#A32328` is an approved hero-number exception AC picks in the
interview, everything else gold; the akimbo PNG is the approved figure mounted
transform-only; **never draw a new icon in SVG — bake or ask** (the drawn diamond is the
mark, not an icon); carousels take wireframe or matte per the interview, polished stays
Prompt-Drop-only. **Not in this package:** the Two Counts Stills Board, Caption and DM md,
`assets/ac-figure-akimbo.png`, `assets/icons/*.png`, `bake/icons.html`,
`bake/ac-icons.module.js` — all in AC's Claude Design project. `CLAUDE.md` arrived later
the same day and sits at `references/carousel-house-rules.md` (its numbers are at 50%
board scale — footnote 10px = 20px, body right ≥ 210 = 420 full-size). Fork check before
this fold: `diff -rq` working vs synced = identical.

**Update 2026-09-11 · DAY 41 "THREE LABS LOCKED THE DOOR" — twelve laws from the Claude
Design build.** AC's own update pack, folded in item by item (ADD/REPLACE as he marked
them). Content drafted here 10 Sep on three primaries (OpenAI *Path to Astra* 1 Sep,
Google *Fairwind* 2 Sep, Anthropic *Fable 5.1 and Mythos 5.1* Sep); built and shipped in
Claude Design 11 Sep; column theme, 16.8s, keyword DOOR.

1. **Stop 1b · the bake board** — optional, default ON on any day a new 3D anchor was
   baked (`run-protocol.md`).
2. **The follow-up rule, replaced** — each round asks only what he could not have
   answered before; nothing-changes = single Go/Hold; blank + "decide for me" = pick from
   what was offered and say which.
3. **The headline strike round** — six tick-boxes on the final confirm, three rewrites +
   free box per unticked, blank = agent picks and reports. Day 41 picks: "650+ security
   teams. Not you." · "Not for you. Any of them." · "Your door is still open."
4. **The VO budget, replaced by a SHAPE law** — one clause per beat, max two; screen
   carries numbers, dates and product names; voice carries the verb; full stop = pause.
   AC struck the ~3.4 syl/s full-sentence v1. **Gate 8 retuned to the cut he approved**
   (55 syl / 16.8s = 3.3 syl/s, 2.0 words/s): body beats warn >3.6, fail >4.2; scene A
   fails >4.7; >2 sentences in a beat fails on shape. His note wrote the target as
   "~2.4 syl/s" — on the approved cut that figure is words per second, so the gate now
   prints both. Beat-sheet table and `vo-hooks.md` budgets retuned to match.
5. **Vendor marks on the stage** — legal on a stage graphic when AC calls it, never in
   the type band; `#C9A961`, 56px leaf / 68px cover, HTML `<img>` not SVG `<image>`;
   `assets/logos/{vendor}.png` (`icons3d.md`).
6. **Matte padlock bake recipe** — full three.js r184 recipe in `icons3d.md`;
   `assets/icons3d/matte/padlock.png`.
7. **Column door-stage geometry** — doors 116×250 on floor y=1120, pitch 156, active
   door 1.18, bolt y=floor−14 inside the jamb, handle y=floor−52, logo drops 54→82
   (`reel-geometry.md`).
8. **Locked-object motion** — drop+settle, quarter spin on the bolt, 4% breathe at 1.8s;
   hook anchor ±8° yaw + 6px bob (`pacing.md`).
9. **Overlap gate leaf rule, replaced** — every ink leaf measured separately, never a
   group; 24 stamps; logo clearance ≥40px, Day 41 passed at 53px
   (`no-overlap-system.md` Step 3e). AC's note calls it "Gate 8 (overlap)"; here Gate 8
   is the VO budget — same rule, this skill's numbering.
10. **Cover stage exception** — when the stage graphic IS the story, the cover may carry
    it under the headline; headline stays the hero; anchor on the fold ~300px; bottom
    620px stays black.
11. **Post-now bundle** — cover PNG ×1, caption+VO+DM md, new assets, zipped; the MP4
    cannot be bundled by the agent, say so in one line (`run-protocol.md`).
12. Run-log row appended.

**NOT IN THIS PACKAGE YET** (Claude Design project): `reel-day41.jsx`, the Day 41 Reel /
Cover / Stills Board / Bake Board `.dc.html`, `bake/day41_padlock.html`,
`assets/icons3d/matte/padlock.png`, `assets/logos/{openai,gemini,anthropic}.png`, `export/`.
Also still missing from 9 Sep: the Prompt Drop v4 template and bake page, the pd08 icons,
the ten matte icons from 2 Sep. Fork check before this fold: `diff -rq` working vs synced
= identical, so this append is safe.

**Update 2026-09-09 · PROMPT DROP v4 — THE CLAUDE DESIGN ENGINE.** From Pack 08 "The
Edges" (content drafted here 4 Sep on the Pew number; built and shipped inside Claude
Design, no shell). AC brought back a standalone `ac-prompt-drop` SKILL.md and asked for it
transferred here — copied in, not cross-called, so a Prompt Drop run never leaves this
skill. The spec is verbatim at `references/prompt-drop-dc.md`; v3 (`prompt-drop.md`, the
shell engine) stays legal. What v4 changes:

1. **The cover is an INTRO, not the v3 question hero.** Label `PACK NN · FIVE PROMPTS ·
   ONE RULE`; heading "Prompt Drop" Gloock 124px cream with the pack name italic in
   gradient gold — **the only gradient text allowed on the page**; hook question Gloock
   44px, last word gold, top ≤500 so it sits inside the centre crop; sub copy in a
   cream / muted / whisper three-step; a `WORKS IN` strip (ChatGPT · Claude · Gemini,
   dim-gold marks in 56px gold rings); hero icon 400px right; the pack's one number in
   cream; five mini icons across the bottom (01–04 at .55 opacity, 05 lit); SAVE · SWIPE.
2. **Rule slide carries an anchor now** — the capstone icon at .85 — plus a `PASTE INTO`
   platform strip. Four lines Gloock 52px, only the fourth in gold (v3 law holds).
3. **Prompt house style: "You are X. Input. Output shape. Done line." No "Act as."**
   Fixed output shape (numbered, labelled, line counts), no disclaimers. Pack 08's five
   were drafted here as "Act as…" and rewritten in Claude Design; the 4 Sep source md gets
   its REVISION line when AC sends the final wording.
4. **Pack icons are POLISHED, a third look.** three.js MeshPhysical — roughness .14,
   metalness .95, clearcoat 1, RoomEnvironment PMREM, ACES; bevelled extrudes, no grey
   slabs; engraving in deep gold `#6E5626`; key 3.0 + gold rim 1.8 + kick 1.2; render 512
   @ pixelRatio 2, capture via snapshot_element scale 2 → `assets/icons3d/pdNN-<name>.png`
   (1024px); check every icon fits its frame before capture. Precedence, stated so it
   cannot drift: **polished governs Prompt Drop packs · matte (2 Sep) governs other
   carousels · wireframe (22 Aug) stays legal.** Whether polished should govern every
   carousel is AC's call and has not been made.
5. **Platform logos are legal on 01 + 02 only** — cut from AC's supplied sheet, recoloured
   `#C9A961`, `assets/logos/{chatgpt,claude,gemini}.png`. The neutral-UI law is untouched:
   a WORKS IN strip is a compatibility claim, not a branded demo.
6. **Ship adds a Story cover.** `export/pdNN-01…09.png` at 1x via snapshot_element on
   `[data-screen-label]`; `Prompt Drop NN Story.dc.html` (1080×1920) → `export/pdNN-story.png`;
   `PDNN caption + DM.md` (base named, one question, em-dash CTA lead, one-message DM);
   the source md updated with final wording and a REVISION line.
7. **Gate before export:** bbox every text and image block, no intersections (walker vs
   payoff is the usual hit); intro hook inside the centre crop; read every slide at
   140px. The header `PROMPT DROP ⟷ @itsac.ai` overlap flag is a known false positive.

Start of a run: copy `templates/prompt-drop/Prompt Drop Template.dc.html` to root as
`Prompt Drop NN <Name>.dc.html` (repoint `../../` to root), copy
`templates/prompt-drop/bake_icons.html` to `bake/pdNN_icons.html`, then ask AC — which
icon per slide, the intro hero object, any shape change — **two question rounds max.**

**NOT IN THIS PACKAGE YET:** the two template files above, `assets/logos/*.png`,
`assets/icons3d/pd08-*.png`, and the Pack 08 exports and story cover. They live in AC's
Claude Design project and were not in the upload. The spec is folded in; the engine files
land when he sends them.

**PACKAGING REGRESSION #2 — found 9 Sep, mine.** The 4 Sep package was built on a 1 Sep
working copy and saved over a synced cache that already carried the 2 Sep (matte bakes,
carousel Technique Day) and 3 Sep (tier list, iceberg, reference law, no-overlap gate,
taste line) updates. The four SKILL.md hunks are restored here from the 4 Sep session
transcript, byte-for-byte. **Not recoverable from text:** the ten matte PNGs in
`assets/icons3d/matte/`, the run-log rows for 2 and 3 Sep, and any reference-file edits
those sessions made — AC's 3 Sep `.skill`, if he still has it, is the only source.

**Update 2026-08-31 · THE LAB IS ITS OWN SKILL.** The package hit a file-count ceiling
at 218 files. Nothing was deleted: `assets/threejs-lab/` — the three.js bake pages, the
vendored three.js modules, the icon contact sheets and the whole `theme-candidates/`
decision archive — moved to a second skill, **`ac-studio-lab`** (56 files). ac-studio is
now 148 files and carries everything a RUN needs; the lab is loaded only to bake a new
3D icon or motif, or to look up why a past look decision went the way it did. Nothing in
`scripts/` or any template referenced the lab, so no build path changed;
`references/icons3d.md` now points at the lab skill for bake sources. If the count needs
to fall further the next lever is `assets/baked-vault/` (46 frame PNGs — the vault open
and sting sequences), which would become two sprite strips plus a template change to
`reel.template.html`; that is an engine edit and needs AC's approval and a filmstrip
re-run, so it is NOT done unilaterally.

**Update 2026-08-30 (later) · PROMPT ENGINEERING, FOLDED IN.** AC asked for his separate
`prompt-master` skill folded into ac-studio directly. Confirmed with him in three rounds
of questions: copied in, not cross-called, so a run never leaves this skill mid-task;
fires at ONE moment — right after AC agrees the topic/direction, before drafting starts
(Lane A step **3b**, between "Confirm the creative" and "Write the words"; Lane B right
after a cover/layout direction is picked); and external generative AI becomes a legal
asset source for **icons, motifs and cover art only** — explicitly NOT for reels or
animations, which stay 100% on the existing DOM/CSS/three.js engine so every gate
(filmstrip, layout, motion floor, cut budget) keeps applying untouched, and NEVER for the
AC figure, who stays the approved stroke rig with no exceptions.

Produces two things: an **internal drafting brief** (role, output-format lock, grounding
anchor, stop condition) for beat sheets, captions and on-screen copy — the point is fewer
rework loops, not more ceremony; and, when a piece wants more character than the three.js
bake's simplicity gate can carry, a **structured prompt for an external tool**
(Midjourney/DALL-E/Stable Diffusion for flat art, Meshy/Tripo/Rodin for 3D), always
opening on a fixed brand-constraint block so the result has to earn the same gates a bake
already clears — Gate 9's alpha check first among them. This session has no direct
connection to any of those tools (checked); the deliverable is a ready-to-paste prompt,
AC runs it and brings the PNG back.

**Proved with one worked example the same day:** a baked 3D "key" icon, matching the bow
shape (a diamond outline, echoing the brand mark) established by the hand-drawn inline-SVG
key on that day's Prompt Drop pack — both a Rodin/Meshy 3D prompt and a Midjourney flat
alternative were drafted, so a future pack can bake the same object into `icons3d/` and
retire the hand-drawn version once AC approves the result. Full spec:
`references/prompt-engineering.md`.

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
| The AC figure / narrator / "the figure is missing" | on by default in BOTH engines (AC, 2026-08-21); the `FIGURE` constant per template |
| Subtitles / captions on a video | `subtitles.md` (mandatory on every video) |
| A longer / retimed cut ("24s version") | `variants.md` |
| A carousel, slide deck, static graphic | `carousel-components.md` FIRST (interview form → 50% board → gate) + `carousel-house-rules.md` (the Claude Design project's CLAUDE.md), then `carousel.md` + `themes.md` |
| **The imagery pack — what objects go on the slides / beats, the icon pack, a bake** | `imagery-pack.md` FIRST (Stop 0 sheet → bake → Gate 11 → pack board), then `pack-archive.md` (no hero repeats in 14 days) |
| Colours on a post / "can I use red here" / a gate 10 fail | `imagery-pack.md` §5 — three families, the red exception, `scripts/gate_colours.py` |
| A 3D icon recipe, a look's material numbers, re-baking an archived object | `icons3d.md` (the bench and the recipes — a post's icons come from its pack); wants more character than the bake carries → `prompt-engineering.md` → Meshy/Tripo/Rodin |
| A cover motif or hero image the bake can't deliver | `prompt-engineering.md` → Midjourney/DALL-E/Stable Diffusion |
| Drafting is about to start and the topic/direction is already agreed | `prompt-engineering.md` — the internal brief, before the beat sheet or slide CONTENT |
| A Prompt Drop (the Saturday prompt pack) | `prompt-drop.md` (**v3**) + `assets/promptdrop.template.html`, then `carousel.md` |
| A Prompt Drop in Claude Design / no shell (the standing path since Pack 08) | `prompt-drop-dc.md` (**v4** — intro cover, polished icons, story cover, "You are X" house style) |
| A Prompt Drop whose exchange is a SKILL, not a tool (the lesson generalises) | `prompt-drop-skill-exchange.md` (**v5** — 7 slides, 3 prompts, AC writes the final skill) |
| A number that may already be verified / filing one that just cleared | `verified-numbers.md` FIRST, then `research.md` |
| **A run is starting / "do today's AI News"** | `run-protocol.md` FIRST (arrive filled, two stops) |
| The narrator figure — poses, face, stroke, grounding | `figure-rig.md` |
| A prompting technique / "technique day" / a move that works in every chatbot | `technique-day.md` + `dc-engine.md` |
| Which theme / how the frames look | `themes.md`, then `brand.md` |
| A post, caption, or "what should I post" | `content.md` |
| Bio, profile, link-in-bio, Highlights | `foundation.md` |
| Growth, reach, weekly plan, engagement | `growth.md` |
| Hashtags | `content.md` (hashtag banks) |
| Finding a story, verifying a number | `research.md` |
| Palette, type, the laws | `brand.md` |
| ac-wins.com — the website, its intro, its motion | `site.md` (ADDITIVE patches only; gate `scripts/qa_intro.js`) |
| Anything is overlapping or looks off | `qa-audit.md` |
| A render looks janky, unpolished, or "not smooth" | `qa-audit.md` + gate 7 (`scripts/qa_filmstrip.sh`) |
| **No bash/python/ffmpeg in the session** (an Omelette / Design Components build) | `dc-engine.md` + `reel-geometry.md`, then the brand law as usual |
| A two-subject race / head-to-head comparison scene | `comparisons.md` |
| Pacing feels off — "too fast to read" / "too static" | `pacing.md` |
| A figure floats / feet off the floor / wobbling floor line / runner scale | `grounding-and-scale.md` |
| A graphic touching type / overlaps in a DC build | `no-overlap-system.md` (HARD BANDS first, measure script as backstop) |
| Approving a reel before it animates / a stills board | `no-overlap-system.md` Step 0b |

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
**No shell in the session? The engines can't run — build the reel in Design Components
instead** (`references/dc-engine.md` + `references/reel-geometry.md`); the whole brand
law still applies.

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

### 3c. Brainstorm the imagery pack — Stop 0 (before any words)
```bash
mkdir -p pack && cp SKILL_DIR/assets/pack-brainstorm.template.md pack/brainstorm.md
```
Fill the sheet on the real story — three directions that differ in metaphor, an object per
beat with what it means, the 2D/3D + look recommendation with its reason, the colour
declaration (three families; red only if one thing must be seen, named), bakes and risk —
name the pick, run the concept test, then ask ONE `AskUserQuestion` form: direction · look
· red · remaps · Go/Hold. Nothing proceeds on silence. Then bake the pack, gate it, and
ship the **pack board (Stop 1a)** before the stills board; the reel mounts the prepped
PNGs as stage elements, transform-only. Law: `references/imagery-pack.md`.

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

### 7. Build — one cut, one command
Background it (`nohup … &`, then poll) so a tool timeout can't kill the render — TOD
takes ~90s per cut:
```bash
bash SKILL_DIR/scripts/produce.sh reel.html AC_<Format>_Day<N>_<slug>
```
One command: QA gate (hard stop) → **`…_subs.mp4` only** (AC's one-cut rule,
2026-08-21) → ffprobe verify → timeline gates. Extra cuts exist behind flags when AC
asks: `--clean-also` (SUBS-stripped), `--silent-also` (for a VO recording session),
`--light <light.html>`. For a retimed cut (e.g. 24s VO pacing) set `AUDIO_ARGS` —
see `references/variants.md`.

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
nothing caught it but AC. **Retuned 2026-09-11 (Day 41):** AC struck the full-sentence ~3.4
syl/sec budget as "too much to say." The law is now SHAPE first — one clause per beat, max
two; the screen carries numbers, dates and product names, the voice carries the verb; full
stop = pause. Calibrated to the cut he approved (55 syl / 16.8s = 3.3 syl/s, 2.0 words/s):
body beats warn over 3.6 and fail over 4.2, scene A fails over 4.7, and a beat with more
than two sentences fails on shape regardless of rate. The gate reports words/sec too. Scene A is allowed at the top of the band, the sign-off should be the slowest scene.
If it fails, cut words — never speed up the hook. The engine is inferred from the spec's
scene count (5 = news, 7 = TOD), so a forgotten `--engine` can no longer grade a TOD script
against the news map; an explicit flag that contradicts the spec is announced, not obeyed.

**DC-path reels must declare their engine (2026-08-27).** Six- and seven-beat news reels
at ~2.8s (the 25 Aug pacing law) had NO window map at all, so a 19.6s seven-beat cut would
infer `tod` by scene count and be graded against 24.05s — 23% more time than the cut has.
`news6` and `news7` now exist, and count-inference refuses any length that maps to more
than one engine. **A six- or seven-beat spec MUST carry `"engine": "news6"` / `"news7"`.**

### 9. Grade, deliver, log — then PERSIST
Grade the hook A–F per `hooks.md` — ship A- or better, one rewrite pass if below.
**Deliver as ONE zip** (AC, 2026-08-19 — "compose everything in a zip file for me to
easier download"). Nine separate file cards is nine taps on a phone and an easy way to
grab last week's caption by mistake:
```bash
bash SKILL_DIR/scripts/package_run.sh runs/dayN-slug AC_DayN_<slug>
```
It takes the deliverables only — the subtitled cut (plus any flagged extras), the cover,
the VO PDF(s), caption.txt, dm_reply.txt, the beat sheet, the gate 7 contact sheet
under `qa/`, and the `pack/` folder (brainstorm, manifest, board, prepped icons,
bake.html — never the raw bakes) — and leaves the
render intermediates (frame dirs, master wavs, the qa scratch, the working HTML, the
fonts) out, because produce.sh rebuilds those on demand.

`SendUserFile` the **zip** as the deliverable, and alongside it the **subtitled MP4** on
its own so AC can watch it inline without unzipping. Then a short **posting note**. Show
the grade and scorecard so AC sees *why* it will hold attention.

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

Same voice, same guardrails. Carousels and static graphics: `references/carousel-components.md`
(the interview, the component vocabulary, the board gate — 2026-09-12), then **Stop 0 — the
pack brainstorm** (`references/imagery-pack.md`: the interview's icon question is answered by
the picked direction, baked as one family, boarded at true size), then `references/carousel.md`.
Run gate 10 on the slide PNGs before the stills board.
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

### Static formats added 2026-09-03
- **Tier grid** (S→D). 190px tier column graded S bright → D dim (`#E7C765 · #B08D3F · #796938 ·
  #5E522C · #3A3218`), letter in Gloock 58px, one 72px matte-gold 3D object beside the letter
  (trophy → medal → ribbon → ticket → deflated balloon), vendor logos AC supplies as
  background-removed cut-outs with NO tile behind them (a cream tile reads as a sticker), 3 per
  row, 4 allowed in D. Foot line is a HOOK sentence ending in the ask, not a bare CTA.
- **Iceberg** (Tourist → Beginner → Practitioner → Builder → Operator → Horizon). Flat vector
  berg traced from AC's reference, 440px wide, sea line at crown:body ≈ 1:3.5; pale crown
  `#F4E7BF`, body ~25 shards alternating `#E7C765 / #C9A961 / #B08D3F / #9A7A36 / #8F7233`
  (the alternation IS the definition), 1.25px plane hairlines, 1.5px outline, ripple band clipped
  to stop at the berg. Level chips left column only, pill, 1.25px hairline glyph in the chip's
  text colour (3D was rejected at ≤60px). Habits as single-line nowrap bullets ≤264px at 17px
  Poppins; if one wraps, shorten the words. No band tints, no diamond at the tip.


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
- **Subtitles on every video, figure on every video, ONE cut per video** (AC,
  2026-08-21). The deliverable is `…_subs.mp4` with `FIGURE='on'`. Extra cuts only when
  AC asks that day (`--clean-also` / `--silent-also` / `--light`). Subs written on the
  beat sheet, filled with `CONTENT`, verified per theme (`references/subtitles.md`).
- **End every changing run with the persist step.** An unpackaged run-log entry or asset
  does not exist next session.
- **Test every theme at 140px** before believing it works.
- **The cover rule (AC, 2026-08-23).** Every cover: ONE hero (figure OR headline, never
  both), kicker top-left, the prime mark small bottom-right, key ink inside the square
  grid crop. The grid is a designed set, not a pile of posters.
  **The stage exception** (AC, Day 41, 2026-09-11): when the reel's stage graphic IS the
  story, the cover may carry the stage under the headline. The headline stays the hero
  (128px Italiana on column). The 3D anchor sits on the fold at ~300px, half on gold, half
  on black. All stage ink inside y<1300; the bottom 620px stays empty black.
- **The ending law (AC, 2026-08-23).** The FIGURE narrates, the MARK signs. The AC figure
  stays through the scenes; the final beat cuts to the mark sting (flat-gold mark, bail
  in, over the VAULT floor). Neither replaces the other. The lit-metal pendant PHOTO is
  legal only OFF-feed (avatar, profile surfaces) — in-content the mark is flat gold.
- **The hand-off law (AC, 2026-08-24).** Particles carry the MOVE; a drawn stroke carries
  the HOLD. A mark made of grains IS grain at any density — anything that has to be READ
  gets drawn, never sampled. Governs reel opens and mark sign-offs. **On ac-wins.com AC
  went further:** the mark INKS ITSELF ON by stroke-dashoffset, the same technique his
  ring uses, and hands off to the header lockup on the way out (`site.md`).
- **Draw the subjects in a comparison** (AC, 2026-08-25). Two abstract marks racing read
  as one blob. Separate lanes 120px apart, ~145px pictograms with a head, torso, driving
  arm and a stride cycle; a named person wears their **team colours**; label the lane,
  never the runner. Colour law holds: gold = the new thing, warm ink = the human, dim
  gold = a year ago. `references/comparisons.md`.
- **~2.8s per content beat when the story carries a comparison AND a catch** (AC,
  2026-08-25, reconfirmed 2026-08-26 — the 11.7s five-beat cut was rejected as "too
  fast to read"; six beats landed at 15.2s, then 17.0s on the final cut. The payoff
  still lands on frame one — the extra seconds buy reading time, not a slower open). This is a
  per-story judgment, not a blanket retime: the 11.7s News default stands for
  single-payoff stories. And the fix for "too static" is **camera work, not faster
  cuts** — zoom on the payoff, pull back for the comparison, push in for the catch.
  `references/pacing.md`.
- **Rising-mask entrances, never fades,** for headlines and rows (`overflow:hidden` +
  `translateY(104% → 0)`, easeOutCubic 0.46s, 0.1s stagger). Frame-one elements stay
  fully on at t=0 — the loud-open law outranks any entrance.
- **A rule line names the business stakes**, it never sounds like a proverb. "Speed is
  solved. Work isn't." shipped; "Fast is easy. Useful is hard." was rejected (AC,
  2026-08-25).
- **Close the loop with one composition rendered twice** — the whole comp as a pure
  function of `t`, drawn at `t=T` and again at `t=0` with an opacity ramp over the last
  0.3s. One copy of the opening choreography to maintain. `references/loop-seam.md`.
- **Pin the floor line; hang limbs from the joint** (AC, 2026-08-25 — "the line should
  be fixed entirely throughout the video"). Zero the camera's vertical component and
  pivot the zoom ON the floor; hang a limb from its joint (`transformOrigin: '50% 0%'`),
  lift the BODY by the leg's overshoot instead of sinking feet (no separate sine bob on
  top — the two fight), counter-rotate the shoes, scale the whole figure from ONE
  constant with `transformOrigin: '50% 100%'`, and size a vertical post so height equals
  its offset exactly — animating its world height inverse to the zoom.
  `references/grounding-and-scale.md`.
- **No shell ≠ no reel.** In an Omelette / Design Components session, build the
  `.dc.html` path per `references/dc-engine.md`; QA becomes the seek-and-read filmstrip
  (gate 7's discipline unchanged — the in-flight frames are where the defects are), and
  **reload the page before screenshotting** or you QA the previous build.
- **HARD BANDS — the overlap law** (AC, 2026-08-26, after the same three defects
  survived three cuts). Build the frame as four exclusive CLIPPED boxes, not a y-table
  you measure afterwards: CHROME 0–176 · TYPE 196–640 (hero number, headline, meta —
  x80, maxWidth 920, **never inside a camera transform**) · STAGE 640–1160 (lanes,
  subjects, charts — **camera translateX ONLY, no zoom**) · SUB 1170–1300 (locked,
  nothing else enters) · dead black 1300+. Scale subjects about their planted foot for
  closeness. Labels sit on lane rules, never on a moving subject; a mark label is
  right-aligned inside a box ending left of its mark; the ruler stacks at rule+48, below
  the lane tag at rule+12. `references/no-overlap-system.md` Step 0.
- **The stills gate — approve frozen frames BEFORE motion** (AC, 2026-08-26). One board,
  one frame per beat, each at that beat's BUSIEST moment (mid-move, mid-fill, mid-fall).
  Board and reel render from the SAME geometry file — the board mounts `Frame(t)` at
  frozen t, the reel mounts the identical `Frame(t)` on the engine clock — so approved
  stills and the exported video cannot drift.
- **The measure gate is now the backstop, not the system: if it moves or scales, measure
  it at BOTH ends of the move** (AC's five screenshots, 2026-08-25). Run the script at
  every cue and every cue + 0.4s, leaves-only with inherited opacity, seeking the END of
  every layer's life — the last 0.5s of a loop is the stretch no screenshot covers.
  Three fixes the gate itself needs or it lies to you: measure the CLIPPED rect (walk up
  and intersect with every `overflow:hidden` ancestor), never render a group wrapper
  whose children all returned null (an invisible 1080×440 box promoted to a "leaf"
  collides with everything), and bound centred chrome. Known traps: offset must equal
  height on anything anchored to a line; an entrance helper assigned over `opacity` eats
  the exit; the >3px filter goes blind in a zoomed-out preview; size a hero pair against
  the nearest world graphic, not an empty column. A strikethrough crossing its own unit
  glyph is the one deliberate hit. `references/no-overlap-system.md`.
- **Only APPROVED art is legal for the figure** (AC, 2026-08-26). The morning call
  was "art, not a rig" — a four-pose reconstruction read as a crude stick figure and
  was rejected. Later that day AC approved a construction built from his OWN artwork
  and specced every property: the stroke rig in `references/figure-rig.md`
  (`AC Figure Rig.dc.html`). That rig — or the approved PNG mounted at its own aspect
  and animated transform-only — is the whole legal set. Never redraw, re-pose or
  invent him outside it; the v3 brainstorm sheet (four poses, R1–R4) is a *design
  record*, not a rig spec.
- **Gate 9 · asset alpha.** Alpha-check every figure and mark PNG before mounting it. A
  fully-opaque asset puts a white box on the `#0A0A0A` ground and no pixel gate catches
  it, because the gates measure ink, not background. Knock out luminance > 250 to alpha
  0 and ramp 225–250 so the gold outline keeps its anti-aliased edge.
- **When the locked pose cannot point, draw the pointer.** A gold hairline from above his
  head, elbowed up and across to a dot on the content lane, drawn on when the beat lands
  and retracted on the cut. Never rotate or distort him into a gesture the art does not
  have.
- **No phone status bar on any reel.** No clock, no battery, no signal glyphs — they read
  as a screen recording and collide with the brand header. Top chrome is the brand header
  alone: kicker top-left, `@itsac.ai` top-right, hairline under. A reel that lives inside
  an app frame keeps the message bar and home indicator only.
- **A narrated reel uses three LANES, not a y-table** (HARD BANDS columnised for a figure
  on screen): FIGURE x24–354 / y866–1279 · CONTENT x400–984 / y290–830 · CAPTION
  x400–984 / y1090+. Captions sit **beside** him, never under him. Full width (x96–984)
  is legal only above y830, or on a beat where he has stepped down or out. Each lane is a
  real clipped box.
- **Every technique reel needs a COPY BEAT.** One beat shows the complete prompt as plain
  copyable text, full width, 34px minimum, with a **"Pause here"** cue — the viewer is
  meant to stop the reel and type it. Variable slots set in gold and bracketed so they
  read as slots, not instructions. A technique the audience cannot copy is a technique
  they will not use.
- **A neutral assistant UI, never a branded one.** When a reel demos a prompt inside a
  chat interface, the interface is unbranded: no vendor logo, no vendor colours, no
  recreated product chrome. The three names appear only as text on the closing card.
- **He stays on screen.** The figure narrates the whole reel; he repositions between
  beats (~90px), he does not exit and re-enter on every cut. A full exit is reserved for
  the copy beat, and even then he drops to the bottom-left rather than leaving frame.
- **Arrive filled, never empty** (AC, 2026-08-26). A run opens with the block
  pre-filled on a real story — candidates, theme, hook, beats, camera, figure actions,
  subs, VO, caption, hashtags, cover. He strikes what is wrong in plain chat words. An
  empty template or an opening question is the failure. `references/run-protocol.md`.
- **Two stops, and only two** (AC, 2026-08-26). The stills board and the finished MP4.
  Nothing between them needs him. **No reply means no build.** A failed board loops on
  his numbered fix list until every frame passes; motion starts after that.
  **Stop 1b · the bake board** (AC, Day 41, 2026-09-11) — optional, default ON on any day
  a new 3D anchor was baked: the icon at 600px, at mount size on its actual ground, at
  140px; recoloured vendor marks at cut and mount size. Nothing mounts before he approves.
  **The headline strike round** on the final confirm: six headlines as tick-boxes, three
  rewrites plus a free box for any unticked, blank submit = agent picks and reports.
  **Overlap gate, Day 41 form:** every ink leaf measured separately, never a group; 24
  stamps (cue, cue+0.4, mid-beat, pre-cut); min clearance logo→bolt/handle/label ≥40px.
- **One gold mass per frame, and the figure owns gold by default** (AC, 2026-08-26).
  The narrator is flat gold `#E4C468`, so TYPE is cream. Gold goes to the figure, or to
  the stage graphic with the figure stepped back to the far lane at 55%. Subjects are
  cream, never gold. A gold hero number beside a gold figure is the defect this rule
  exists to stop.
- **The loop seam is a HARD CUT when the end and the open are different
  compositions** (AC, 2026-08-26). "One composition rendered twice" closes a seam only
  when the closing and opening states match. A rule line + mark with the figure gone,
  cross-faded against a hero number + figure, is a double exposure. Cut instead — the
  loud-open law outranks any dissolve.
- **An estimate repeated by coverage is not a fact** (AC's own reel, 2026-08-26).
  "Oracle cut 30,000" was a TD Cowen estimate; the 10-K says 21,000. Trackers and
  aggregators are a LEAD, not a citation. Every figure goes to primary source before it
  goes on screen.
- **Structure the draft before drafting, once the topic is agreed** (AC, 2026-08-30).
  `references/prompt-engineering.md` — role, output-format lock, grounding anchor, stop
  condition — fires once, right after direction is confirmed, before the beat sheet or
  the slide CONTENT. It is cheaper than the rework it prevents.
- **External generative AI is now legal for icons, motifs and cover art — never for
  reels/animations, never for the AC figure** (AC, 2026-08-30, confirmed across three
  rounds of questions). Midjourney/DALL-E/Stable Diffusion for flat art, Meshy/Tripo/Rodin
  for 3D, always opening on the fixed brand-constraint block
  (`prompt-engineering.md`). Three.js stays the default, free, in-house route; reach
  outside only when a piece wants more character than the simplicity gate carries. Every
  result still passes Gate 9's alpha check exactly like a baked icon — a new source is
  not a new exemption. Reels and animations keep building on the existing engine only, so
  every timeline gate still applies; the figure is exempt entirely, locked to the stroke
  rig, always.
- **A thumbnail cover re-scopes slide 1 — and every figure is stated once** (AC,
  2026-09-01). When a pack gains a thumbnail cover, the old slide 1 becomes a second cover
  and AC will reject it on similarity. Rebuild it to do a job the thumbnail cannot: land
  the hook line, then supply the SETUP (the conditions, the honesty gate) the poster has no
  room for. Then sweep the rest of the pack — any slide still leading with a numeral the
  thumbnail already carries gets rebuilt as mechanism, not figures. Numbers land once, on
  the thumbnail; the slides explain how. Adjacent rebuilt slides must use different devices
  (numbered rows vs a dotted timeline rail) or the pack reads as one layout twice.
  A thumbnail counted inside the set carries its own progress bar and every fill rescales
  over n+1 steps, last fill still trimmed to clear the counter.
- **A rail icon must mean the thing, not the neighbourhood** (2026-09-01). `shield` carries
  a tick — it reads *protected*, the exact opposite of "700 tried to break in". Bake the
  icon the sentence needs (`breach`: server rack, pierced) rather than borrowing the nearest
  one. Rail icons mounted at ~132px need ~+45% alpha over the 208px anchor prep, or the
  dim-gold edges read as smudges in the feed.
- **Prompt Drop v3 laws** (AC, 2026-08-30): a rhetorical QUESTION cover outranks
  pack-title-as-hero when the question is strong, and it must be a real question with a
  qualifier, logic-checked as a sentence first; 9 slides run
  `question → answer → proof → the key → the ask` and slide 2 MUST answer slide 1; the
  rule slide's teaching list is the hero (no card, no anchor, last item gold); the tool
  slide is the EXCHANGE slide — never headline the disclaimer, name the thing and reuse
  that word as the keyword, keep a small dim credit at the foot; ONE ask on the close and
  ask WHICH ONE they need; ONE question in the caption, and it is the one that routes to
  the DM; prep icons before mounting and mount at 208px; the walker clears the counter
  (lead cap 820). Build every cover variant into `COVERS`.
- **An exemption in a gate is a defect in hiding** (2026-08-30). `qa_promptdrop.js` runs
  with no allowed-overlap pairs. The one time a pair was excused, that pair shipped a
  collision. Fix the geometry instead. Text blocks must hug their content — a fixed height
  makes the gate report box overlaps that are not ink overlaps, and teaches you to ignore it.
- **Prompt Drop v2 laws** (AC, 2026-08-29): pack title is the cover hero; pack name on
  every frame; walker on the floor bar, feet planted, ~120px; one minimal 3D anchor per
  slide (simplicity gate: 3–8 parts); counter inside the bar (trim a gold segment that
  would run under it); YOU GET BACK ≤2 lines so copy never meets the walker. Prompts
  ship verbatim; only the supporting copy may be tightened.
- **A restore is a fork — diff before you append** (2026-08-31, AC caught it). When the
  synced skill cache is wiped mid-session and the skill is rebuilt from a `.skill` zip,
  that zip is a SNAPSHOT, not the head. Work appended to it silently drops everything
  added between the snapshot and now, and every package shipped afterwards inherits the
  loss. Before appending to any restored copy, diff it against the newest package AC
  holds (file list, SKILL.md length, run-log row count) and merge forward first.
  **Second instance, 2026-09-04 → found 9 Sep:** the diff target is the synced cache AS
  IT IS NOW, not as you last saw it. A package built on a working copy from three days
  earlier erased two days of work that other sessions had already synced. Before any
  `zip`: `diff -rq <working> <synced>`, and merge forward every file that is newer or
  present only on the synced side. The transcript is the last-resort restore, and it
  holds text only — PNGs and run-log rows do not come back.
- **The reference law** (AC, 2026-09-03 — "Always use the photos I give as reference"). An
  attached photo is the spec, not inspiration. Measure it first (width/height, above/below split,
  plane count), re-open it on every revision, never work from memory of it. A flat illustration
  as reference means a flat illustration ships; 3D is for objects he has not shown you. Three
  iceberg rounds were lost rendering 3D against a 2D reference.
- **The no-overlap gate is on the builder, not the verifier** (AC, 2026-09-03 — "No overlapping
  mistakes shall be done"). Before every hand-off compute the bbox of every placed image and
  every text column/chip in page px and assert no intersection; move geometry until it passes.
  For baked assets add the bbox-edge check: an alpha cut-out touching the raw frame edge is a
  cropped render (a flat-topped peak shipped three times before this was caught).
- **Hairline glyphs beat 3D at ≤60px.** Bakes live at 72px+ beside a letter; inside a pill the
  icon is a 1.25px stroke in the text colour. Three baked sets were rejected for the chip slot.
- **Date a figure from the source page, not the day you read it.** "Jul 2026" shipped on two
  boards; Gallup's page says May 2026.
- **The follow-up rule** (AC, Day 41, 2026-09-11 — replaces the 3 Sep wording). He will press
  "follow-up" repeatedly. Each round: ask ONLY what he could not have answered before the last
  round. When nothing changes the build, the round is a single Go/Hold. Never re-ask a settled
  item. A blank submit with "decide for me" means pick from the options already offered and
  say which.
- **Taste line (AC verbatim, 2026-09-03): "directive, informative, innovative and minimalistic
  unique."** Read it before composing anything for @itsac.ai.
- **Prompt house style (AC, 2026-09-09): "You are X. Input. Output shape. Done line."**
  Never "Act as". Fixed output shape, no disclaimers. Applies to every prompt that ships
  on a slide or in a DM.
- **Three icon looks, one precedence** (2026-09-09): polished MeshPhysical for Prompt
  Drop packs · matte for other carousels · wireframe legal everywhere. Do not mix looks
  inside one pack. The pack-name gradient on the Prompt Drop intro is the ONLY gradient
  text on the page; the flat-ground law is untouched.
- **Platform logos: Prompt Drop intro and rule slides, and a reel's STAGE graphic when AC
  calls it on the day** (Day 41, 2026-09-11) — recoloured `#C9A961`, 56px on a reel leaf,
  68px on a cover, HTML `<img>` over the lane (an SVG `<image>` loses its size under the
  transform stack). Never in the type band, never in a demo UI.
- **Every carousel opens with the one-form interview and stops at a 50% stills board**
  (AC, 2026-09-12, Two Counts). Theme · icon per slide · figure per slide · save slide ·
  accent · keyword. Proposed map shown, he remaps. Nothing renders full-size before the
  board passes. `carousel-components.md`.
- **Two approved exceptions, both bounded** (2026-09-12): the gold GRADIENT on the crest
  carousel band (0–88px) — the ground stays flat; and the red hero-number pair `#E5484D`
  / `#A32328` for a two-count contrast when AC picks it — everything else gold.
- **Never draw a new icon in SVG. Bake it or ask** (AC, 2026-09-12). The brand diamond is
  the mark and stays drawn; everything else comes from an approved pack.
- **Exactly one ink-on-gold slide and exactly one save bookmark per deck**; source
  footnote on every slide; the close takes the diamond mark; the checklist slide carries
  no icon (2026-09-12).
- **The exchange may be a skill** (AC, 2026-09-12). When a Prompt Drop hands over a generator
  rather than a tool, the pack is 7 slides with 3 prompts; slide 6's headline builds desire and
  `WHAT YOU GET` lists the actual files. **AC writes the final skill; the agent's draft never
  ships.** `prompt-drop-skill-exchange.md`.
- **A reference sheet overrides icon-look precedence** (AC, 2026-09-12). An attached look is the
  spec even when the format's default says otherwise. Bake to the sheet.
- **The Instagram action pack is an asset** (2026-09-13): `assets/ig/*.png`, `#C9A961`, close
  four-up at 40px and the intro cue at 34px, nowhere else. Never redraw an Instagram glyph.
- **A cover is a static DC at native size.** Never snapshot the animation root for a cover — it
  captures at stage scale and mid-motion.
- **Captions in a DC reel are restyled through the engine's `style` prop**, Poppins, inside the
  SUB band. Check computed `fontFamily` before ship; the default is Inter and it fails silently.
- **`filter: drop-shadow`, never `text-shadow`, on gradient-clipped text** — `text-shadow`
  paints behind the clip and does nothing.
- **Same number, two formats, two days is legal** — Saturday teaches the fix, Sunday lands the
  story. Verify once, footnote identically on both.
- **Check `verified-numbers.md` before re-verifying a figure**, and file one there the day it
  clears primary. The phrasing gates travel with the number, which is what stops the drift.
- **Write every law to the project `CLAUDE.md` in the same turn it is set** (AC, 2026-09-13 —
  "Stop forgetting previous sessions"), and read `CLAUDE.md` before the first question of a run.
- **Every post ships its own imagery pack, as one family** (AC, 2026-09-20). Hero, anchors,
  rail — conceived for the story, baked with ONE `LOOK`, boarded at true size on its actual
  ground before anything mounts. Catalog objects re-bake into the pack's look or stay on the
  bench. No hero repeats inside 14 days. `references/imagery-pack.md`.
- **Three colour families per post — BLACK · GOLD · CREAM — and red only as the declared
  exception** (AC, 2026-09-20). The ground counts; shades of a family are one family; the
  tier gradations, dim footnotes and the band gradient are all GOLD. Red is ONE element,
  named at Stop 0 with the reason, never chrome, never an icon. Gate 10 runs on every slide
  and every video; a foreign colour anywhere fails the post.
- **Stop 0 before any words on a slide, and a form at every stop** (AC, 2026-09-20).
  Brainstorm → pack board → stills board → final; each closes on tick boxes and Go/Hold.
  Silence is a Hold, never a Go. The follow-up rule stands.
- **2D or 3D is recommended per topic, with the reason, and decided by AC** (AC,
  2026-09-20). A reference sheet outranks the recommendation; ≤60px is always a 2D
  hairline; a reel mounts the pack as prepped PNGs, transform-only.
- **Premium has a checklist** (2026-09-20, `imagery-pack.md` §2). An object that fails one
  of the ten checks does not go on the board. More detail, more gloss and more motion are
  not premium; restraint executed with craft is.
- **Don't skip the checkpoint or the scorecard gate.**
- **Show up daily.** The algorithm and the audience both reward reliability over intensity.
