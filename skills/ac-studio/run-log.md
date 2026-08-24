# AC Reel Creator — run log

The series memory. Append one entry per shipped video so day numbering, theme rotation,
grades and used SEO/CTA lines stay consistent across sessions. Newest first.

> **This log only survives via the persist step** (SKILL.md step 9): the session copy is
> a cache — after appending, repackage the skill and send AC the `.skill` to save.
> **Metrics** is filled only when AC volunteers numbers (views · saves · shares · follows,
> ~48h after posting). Never ask for them; `—` is a fine permanent value.

| Date | Day | Format | Story / tool | Source | Theme / look | Hook | Scorecard | Files | Metrics (48h) |
|---|---|---|---|---|---|---|---|---|---|
| 2026-08-24 (Mon) | — (numbering RETIRED, AC 24 Aug: "ditch the number, Monday's will always AI news") | AI News (11.7s) — **crest + three.js race** | **"A robot beat Usain Bolt."** A humanoid ran the 100m in **9.39s** at the opening ceremony of the second World Humanoid Robot Games, Beijing, Sat 22 Aug, beating Bolt's **9.58s** (Berlin 2009). The reframe, and the reason this cleared the new WOW gate: **it could not stop** — the robots hit a cushioned pad, went down, and were carried off on stretchers; Bolt jogged a lap. Scene B carries the rate, not the record: **last year's winning time at these same games was 21.50s** (NHK). **9.32s DELIBERATELY LEFT OFF SCREEN** — Guardian/AlJazeera/DW place it in a Honor pre-games trial, NHK in a prelim; conflicting provenance, so the on-screen figure is the one Xinhua/Reuters/AP/CBS all put at the ceremony. **BOARD REJECTED FIRST, and that is the entry's real content:** four verified candidates (ChatGPT ads 31 markets, Stax 80%, CLA 20.2%, Clutch 59%) were killed by AC as "too informative for general users that dont keep in touch with AI". All four were sourced to primary; none was retellable. → **WOW GATE written into research.md** (dinner-table test, five wow ladders, kill list, search-layer rewire: mainstream/wire desks FIRST, AI trade press as corroboration only) + **morning shortlist rebuilt** around a /10 view-gauge card. Under that card the shipped story scores 10/10 and the old recommended pick scores 4/10. **3D, all four of AC's picks:** (A) NEW two-figure race baked as a LIVE three.js canvas in the frame (not baked PNGs — 9.6s of continuous motion made frames the wrong route); GOLD box-head robot in the near lane vs Jamaica-kit human in the far lane (green singlet, gold saltire sash, black waistband + hair, gold shoes/headband, skin limbs — AC 24 Aug, "combination of black yellow green representing his country", robot stays gold). Green is the ONLY palette-law exception and is confined to the human's kit. AC's reference image was a watermarked MAYA STICKERS product — **not traced**; all geometry generated, and the finish is a generic arms-open deceleration, not Bolt's trademarked pose. (C) mark particle open ported to crest. (D) numerals under the HAND-OFF LAW — grains carry the move, drawn Bricolage takes the hold. **8 figure revisions**, each from reading the render: v1 ran THROUGH the wall; v2 tangled both figures into one scribble and the two lanes collapsed to one line; v4 filled silhouettes read as prancing toddlers (head 1/5 of height, stubby limbs); v5 feet punched through the lane; v7 black head vanished into the #0A0A0A ground (headless with a floating gold band) and the 'saltire' was a block down the middle. **ENGINE FIXES:** crest's ground was a **GRADIENT** (`linear-gradient(180deg,#131313,#0A0A0A)`) in violation of the flat-ground law — flattened; crest caption re-homed to the void at y900 (the mark open owns 104..350); scene E side padding widened after the handle clipped to '@itsac.a'; TRANSITION set to **cut** for this run — `fade` passes through near-black at all four cuts and on a sub-12s reel that is four dead frames; mark open remapped to start part-formed because frame 0 was a particle scatter reading as dirt on the one frame that has to be loud. **Gate 2 threw a FALSE POSITIVE** (odometer x sub, 305px) — measured boxes were 600..720 and 841..887, 121px apart, sub at opacity 0; the real defect was scene B's 19-char headline overflowing the 760px column, and gate 2 went clean the moment B was shortened. Measurement disagreed with geometry; geometry was right. **Gate 7 caught the two that mattered**: bare frames at every cut, and the frame-0 blob. **SCOPE CALL, stated not hidden:** the 3D narrator (AC's pick B) was BUILT and approved but NOT shipped — the race band already carries two 3D figures and a third crowded the frame; the 2D SVG narrator stays this run. Gates: 1/2/6 CLEAN · 3 PASS (row-decorr 0.288) · **4 PASS, no window over 1.0s — the continuous race band is what finally cleared the motion floor on this engine** · 5 WARN-by-design (0 cuts detected on flat black, documented threshold limit) · 7 READ (2 catches) · MP4 verified 11.70s video+audio, t=0 frame read. TOOLCHAIN: container shipped no ffmpeg/ffprobe/numpy/pillow/playwright — imageio-ffmpeg 7.0.2 (libx264+aac) + ffprobe shim rebuilt per the Day 38 note. | **PRIMARY-FIRST:** Xinhua 22 Aug (9.39s, ceremony, 666 teams / 2,056 robots / 51 events) · Reuters 22 Aug (Tiangong Ultra, 2nd place 9.47s) · NHK 23 Aug (21.50s last year) · CBS + Fox + CNN (pad, stretchers) · AP · Guardian · Al Jazeera · DW | **crest · dark** (rotation: vault 24 Aug, base 21 Aug, column 37, crest 36, margin 34/35) | A (stop) / A- (send, Gossip + Gift — the friend who says AI is hype AND the friend who says it's taking over, both send it) | 10/10 on the new view-gauge card; virality scorecard 9/10 (ding: gate 5 cut budget unresolved by design) | /root/day-bolt/run: AC_News_robot-beat-bolt_subs.mp4 (11.70s, ONE cut) · COVER.png + COVER_gridcrop.png · caption.txt · vo_script.md · ab_hooks.txt · beatsheet + gate 7 filmstrip | — |
| 2026-08-24 | 38 | AI News (11.7s) — **THE VAULT SOFT LAUNCH** | **"A thousand images for seventeen cents." DeepSeek V4-Flash-Vision-Exp** (21 Aug): budget model reads images at text prices — ~1,000 images ≈ ¥1.15/$0.17 (DeepSeek API docs via BigGo), every image capped at 384 tokens any resolution, live on OpenRouter at $0.22/M input (D37 continuity). EXPERIMENTAL flagged in caption. **REBRAND DEBUT per the 23 Aug decisions, baked-frames route:** t-vault theme (Marcellus, baked floor grid, rail on the floor, wm top-left, caption top lane, figure stands ON the floor at bottom:196), mark PARTICLE OPEN over scene A (20 baked frames, 0–0.85s, holds then fades before B), mark SIGN-OFF STING as scene E's ground (24 baked frames swapped via --vbg CSS var — a background, not an element, so geometry gates measure ink not the ground; ending law: figure narrates, mark signs). ONE CUT ONLY (the 21 Aug law's first outing — produce.sh built _subs.mp4 alone). Hook bank: **Authority** (rotated off D36 Curiosity/D37 Storytelling), stop A / send A- (Gift — the friend typing receipts by hand). Layout fights logged: C's "384 tokens" wrapped mid-word at vault's 210px odometer (→ 138px for C); E text stood on the mark's legs (→ flex-end above the rail); sub lane defaulted into the odometer zone (→ top lane + content pushed to 466px); wm collided with label+chip (→ top-left home). Gates: 1/2/6 CLEAN · 3 PASS (row-decorrelation 0.482 — the vault cut reads structurally, unlike column) · 4 PASS · 5 WARN-by-design · 7 READ · 8 CLEAN 3.6 (A warn allowed). Cover per the new cover rule: headline hero, kicker top-left, mark corner PNG bottom-right. CTA: comment RECEIPTS or INVOICES. SEO "AI that reads images just got absurdly cheap: DeepSeek's new vision model prices 1,000 images at about $0.17." **48-HOUR WATCH starts at posting** (decision 3, 23 Aug): if the vault reel holds vs recent baseline, the look rolls to everything. ENGINE PERSISTED: t-vault + markopen + sting drive ported to reel.template.html; baked frames at assets/baked-vault/ (45 PNGs); Marcellus vendored to assets/fonts/. | OpenRouter model page (21 Aug) · BigGo Finance (DeepSeek API docs) · intelligentliving.co | **vault · dark (debut)** | A (stop) / A- (send, Gift) | 9/10 (ding: experimental model; new-theme risk taken deliberately) | /root/day38/run: AC_News_Day38_deepseek-vision_subs.mp4 (11.7s, ONE cut) · COVER.png · AC_Day38_VO.pdf · caption.txt · zip | — |
| 2026-08-23 | — | DESIGN DECISIONS · next-week brief (no post) | **Designer interview closed SEVEN standing decisions in one sitting — including the theme verdict open since the candidate sheets.** (1) **A · VAULT WINS the 3D theme** — first new theme since the original four; Marcellus face, floor-grid-to-horizon block, figure hero, progress rail on the floor; carries next week's frames. B · LATTICE remains the named second candidate, unscheduled. (2) **Rebrand debuts SOFT: one reel early next week** carries mark sign-off + particle open + VAULT; 48h watch, then roll to everything. (3) **Sign-off law: the FIGURE narrates, the MARK signs** — AC figure stays through the scenes, final beat cuts to the mark sting; neither replaces the other. (4) **Balanced week: 4 AI News reels + 1 carousel with 3D cover + Saturday Prompt Drop 05** — carousel continues the reach test (Pack 03 14 vs reel 91; Pack 04 48h numbers land imminently and feed the bet). (5) **Profile kit ships WITH the soft launch**: pendant photo becomes the avatar (lit metal is legal OFF-feed — profile surfaces are not content frames), highlight covers get the flat-gold mark, bio line reviewed same day so the click-through matches the feed. (6) **COVER RULE LOCKED (new guardrail): every cover = ONE hero (figure OR headline, never both) · kicker top-left · mark small bottom-right · key ink inside the square grid crop.** Grid reads as a designed set within two weeks. (7) **VO daily confirmed** — full pipeline unchanged, no silent-design accommodation needed. Superseded: the Gloock monogram stand-ins (M-A/B/C) — the real prime-logo mark replaces them everywhere. Still open, minor: robot-arm icon verdict; AC's actual logo file (geometry stays my redraw until it arrives). ENGINE WORK QUEUED for the soft launch: t-vault theme into reel template (Marcellus vendored, floor grid as scene ground, rail on floor), mark sign-off sting into scene E behind the FIGURE constant, particle open as scene-A pre-beat, mark PNG baked for the deck cover corner, full gate battery + 140px before any story ships on it. | decisions — no story | vault (incoming) | — | — | decision record; builds follow | — |
| 2026-08-23 | — | PRIME LOGO 3D DRAFTS (no post) | **AC declared the interlocked A+C pendant mark the PRIME LOGO and asked for three.js treatments, draft-and-brainstorm.** The photo arrived vision-only (attachments do not hit disk), so the mark was RECONSTRUCTED as drawn canvas geometry — C arc back layer, A over it (miter-join sharp apex, double-stroke left leg), C's lower arc re-drawn on top for the over-under weave, diamond + loop bail — then run through the monogram ink-sampling pipeline into 4 treatments + a judging tile: L-0 mask · L-A solid voxel extrusion (flat gold, unlit) · L-B particle cloud · L-C edge-trace outline · L-D sign-off sting (mark standing on the vault floor grid). Convergence took 3 read-and-fix rounds (C too low/deep → C terminals overreaching the apex → miter apex + arc span 0.8..2pi-0.5). **Geometry is a stand-in until AC sends the actual file; the lit-metal pendant look stays OUT of content under the flat-gold law — the mark's GEOMETRY is what enters the system.** Open brainstorm put to AC: bail in or out for in-content use (rec: out, bail version reserved for avatar) · law confirmation (photo = profile asset only) · default treatment (rec: L-A for sign-off/watermark moments, L-B for reel frame-0 assemble) · deployment order (rec: reel scene-E sign-off + deck close first, text watermark unchanged for now). | brand asset — no story | lab · dark | — | — | threejs-lab/theme-candidates/: logo3d.html · LOGO_SHEET.png | — |
| 2026-08-22 | — | ICON LIBRARY → PRODUCTION (no post) | **AC approved the 12-icon sheet ("Perfect, input this inside to the skill") — library graduated from lab drafts to permanent skill assets.** Shipped: (1) `assets/icons3d/` — all 12 baked as 900×800 transparent RGBA PNGs (~320K total), alpha verified per file, composite-proofed on the flat ground (no halo, no box). (2) **deck.template.html ART registry now carries a permanent `icon3d` builder** — beat usage `art:'icon3d', icon:'envelope', artW:420`, optional artlab; run dirs copy `icons3d/` beside deck.html same as fonts; gates measure it like any art. (3) `references/icons3d.md` — catalog with per-icon use cases, deck recipe, reel route (baked PNG as scene element; the reel image slot lands WITH the first 3D theme, still awaiting AC's A/B/C/D pick), re-bake recipe, and the build rules (occlusion trick, hemisphere 0.24, paper z-step 0.2, profile-not-edges cylinders, CSS-size screenshot trap, anchor-uniqueness rule). (4) SKILL.md router row. (5) `threejs-lab/bake_icons.html` = re-bake source of truth (per-tile try/catch). Bake trap logged: element screenshots capture CSS layout size not canvas buffer — first bake silently shipped 450×400, second 360×320 (a leftover sheet CSS rule), full-res only after killing both. Robot arm still DRAFT status in the catalog (silhouette verdict AC's). | infrastructure — no story | — | — | — | assets/icons3d/ (12 PNGs) · references/icons3d.md · deck template ART entry · threejs-lab/bake_icons.html | — |
| 2026-08-22 | — | 3D ICON LIBRARY (no post) | **Menu 1 drafted: 12 law-safe story icons on one sheet** (envelope · hourglass · brain · chat bubbles · document stack · shield · coin stack · rocket · robot arm · globe+routes · HK junk boat · data chart), for baking to deck art or mounting live in reel scenes. 10 read clean after 2 fix rounds; **weakest is the robot arm** (chain computed and connected but silhouette reads desk-lamp — AC to keep/kill/rework); coin stack cracked by the **OCCLUSION TRICK: solid ink-colored core inside each wireframe coin so the depth buffer hides back rims** — without it any stacked-rim object reads as a coiled spring; generalizes to all stacked wireframe builds. Fix-round finds worth keeping: hemisphere split needs 0.24 offset to read (0.09 = plain sphere); document z-step 0.2 not 0.55 (else nested picture frames); rocket bodies want profile lines + rim loops, never full cylinder edges (ribs); each tile's builder in try/catch so one dead tile can't kill the sheet (sheet-D lesson). **PROCESS ERROR: a python slice-replace anchored on `const rim=circle(0.95);` hit the HOURGLASS tile first — non-unique anchor spliced coin code into it and silently deleted tiles 3-7; caught only by reading the render. Rule: assert anchor uniqueness before slice-editing a file with repeated helper names; whole-file rewrite when in doubt.** Also this turn: v2 fine-tune of the four theme candidates (depth-graded vault grid + lattice, twin orbit rings, separated strata, dim nodes lifted 0x4a4030→0x655838 — old value invisible on phone). | prototypes only | lab · dark | — | — | ac-studio/assets/threejs-lab/theme-candidates/: icons_sheet.html · ICONS_SHEET.png · THEME_SHEET_v2.png | — |
| 2026-08-22 | — | 3D THEMES (no post) | **Brand-law question CLOSED + four new 3D-native theme identities drafted to AC.** AC's calls (same interview): (1) NEW themes, not extensions of the four; (2) **flat gold stays law — metal knot, liquid shader and film grain REJECTED permanently** (the deferred lab question, now answered; law-breakers deleted from consideration); (3) BOTH lanes — carousel proves first (baked-PNG route), reel/TOD follows with live canvas; (4) draft sheet first, pick after. Drafted 4 candidates as full 1080×1350 frames on one shared story so faces compare fairly, all inside flat-gold law (wireframe/line/point only), all keeping ground/gold/Poppins/ticks and the rule that **the 5-node progress lives IN the theme's 3D block**: **A · VAULT** (Marcellus; floor grid recedes to a fogged horizon, figure hero — base's heir) · **B · LATTICE** (Fraunces opsz72; 3D node-lattice slab across the ceiling, headline hero — crest's heir) · **C · ORBIT** (Cormorant Garamond; tilted orbital ring bleeding off the right edge with wireframe core, beads ride the orbit, even weight — margin's heir; NOTE oldstyle figures render "11.7" as text figures, flag before shipping numerals) · **D · STRATA** (DM Serif Display; stacked wireframe strata under the fold, rail on the top stratum's front edge — column's heir). Four new faces fetched from Google Fonts (latin subsets; first grab took the FIRST unicode-range woff2 = wrong subset, re-fetch takes the LAST). **The build cost 3 blind rounds before the method changed: STOP hand-guessing where 3D lands on screen.** Round 1: vault's rail stacked vertically through the sub text, lattice slab clipped at frame top, orbit arc + a bead crossed hero ink, strata read as one noisy infinite grid with an orphan node. Round 2 (still guessing): vault rail spaced ±5.2 world units when the frustum at that depth holds ±1.9 — one orphan dot; lattice projected BIGGER after lowering. Round 3: switched to IN-PAGE COMPUTED PLACEMENT — project candidate points through the camera and keep only those landing in safe screen zones. Two three.js traps logged for every future 3D build: **Vector3.project uses stale identity matrices before the first render** (update camera matrixWorld + matrixWorldInverse by hand first), and **a solve block pasted before g.position/g.rotation are set projects the untransformed geometry** (orbit's beads vanished twice this way). After the method switch both problem placements landed first try. Sheet itself caught one defect (bottom-row labels colliding), fixed before send. Persisted to assets/threejs-lab/theme-candidates/ (4 HTML + fonts + THEME_SHEET.png) with the law decision + build lessons in README. NEXT (AC's): pick/kill/mix candidates → winner gets deck CONFIG + qa_deck + one real carousel, then reel `t-<theme>` with live seek(t) canvas and the full gate battery + 140px test. | prototypes only — no story; sample copy reuses Pack 04's verified NBER figures | candidates · dark | — | — | ac-studio/assets/threejs-lab/theme-candidates/: cand_vault/lattice/orbit/strata.html · THEME_SHEET.png · fonts (Marcellus, Fraunces, CormorantGaramond, DMSerifDisplay woff2) | — |
| 2026-08-22 | 39 | Carousel (Prompt Drop pack 04, 5 prompts / 7 slides) | **"11.7h" · Write everything better — the deck's FIRST shipped 3D art, engine untouched.** Topic by interview: AC asked for suggestions serving "business and daily use for all types of users"; picked **B · Write everything better** from the option board. Cover fact verified PRIMARY-FIRST (Day 38's standing rule, followed from the start this time): **NBER WP 33795 / arXiv:2504.11436 (Dillon et al., rev. May 2025)** — RCT, **7,137 workers across 66 firms**, verbatim **"11.7 hours per week reading and responding to emails"**; regular Copilot users cut email time **−3.6h/wk (−31%)**, ITT 1.3h; **Microsoft ran the study — named in the caption's disclosure paragraph**, and caption.txt carries 5 wording gates pinning all of it (11.7 never rounds · 31% is regular-users-only · 66/7,137 with US+Europe skew · vendor named · citation string). Prompts 01–05: **Ask for it / The polite no / Shrink the thread / Sound like me, not AI / The one-breath edit** (capstone: "Run 05 on everything you send this week"). Format law held: 40–55 words each with role+constraint+output+surprise line, "You get back" on every card, strongest chore 2nd, general capstone last, no day numbers on slides, comment **PROMPTS** → ONE pasteable dm_reply message. **PACK-OVERLAP CATCH:** drafted P1 "Say the hard thing" duplicated Pack 03's P5 "The one you are avoiding" — caught only because the deck template still held Pack 03's CONTENT when opened; swapped to "Ask for it." **New check for every future pack: read the previous pack's five prompts before drafting.** **3D INTEGRATION ROUTE — the lab's first move to ship, brand-law deferral respected** (no metal / liquid / grain; the art is gold wireframe lines + points on the flat ground, inside current law). three.js neural web (lab move 15 family) rendered ONCE to a transparent PNG — artB.html: alpha canvas = NO scene.background + `omitBackground:true` screenshot — then wired through the deck's existing `ART` registry as `neural3d` returning an `<img>`, so both geometry gates cover it like any hand-drawn art and the shipped deck stays dependency-free (no live canvas, no three.js in the deck). 3-way art render offered (monogram extrusion / neural web / node graph); AC picked neural. **Approval loop:** AC asked to see final touches before finalising → tune list offered → "Touches + show me once more" → v2: (1) cover web line opacity lifted 0.35→0.5 so it reads as a NETWORK at feed size, not floating dots; (2) the close's 3D dot-cluster echo CUT — three gate iterations shrank it 300→220→170px and it still crowded the figure, so the echo was traded for the check icon at `wsize` 96px; 3D became cover-only, which is the right call (the close's job is the rule + keyword, not spectacle) → **GO**. Gates: qa_deck **CLEAN (42 blocks)** · deck-figure gate **CLEAN both bookends (61px / 61px)** after 4 iterations (slide-7 kicker pushed off-frame by the 300px art · −29px · −4px · −1px after the icon swap). **PACKAGING DEBT: package_run.sh globs are video-shaped — no `slides/*.png` pattern — so the pack zip was built by hand. Add a deck lane to the packager.** Close card: "AI writes the draft. You stay the **author**." SEO line: "AI prompts for writing emails and messages faster, without sounding like a robot." | **PRIMARY READ DIRECTLY before any render** via `mcp__Exa__web_fetch_exa`: NBER WP 33795 / arXiv:2504.11436 rev. May 2025 (Dillon et al., generative-AI RCT, 66 firms) — the 11.7h, −31%/−3.6h, ITT 1.3h and 7,137/66 figures are the paper's own; Microsoft's role disclosed | base · dark · card (deck lane rotation: 31 margin, 33 crest → base) | A- (stop) — 3 A/B cover hooks shipped in caption.txt | 9/10 (ding: carousel reach unproven on this page — Prompt Drop 03 did 14 vs 91 for a reel, Day 33's open question; this 3D cover is the test) | /root/pack04/run: AC_PromptDrop04_write_01..07.png · caption.txt (5 wording gates + Microsoft disclosure) · dm_reply.txt (PROMPTS, one message) · beatsheet.md · qa/PACK04_SHEET_v2.png · AC_PromptDrop04_write.zip · art: artB.html + art_neural.png (recipe persisted: threejs-lab/deck_art_neural.html) | — |
| 2026-08-22 | — | THREE.JS LAB (no post) | **23-move 3D prototype library built and drafted to AC — nothing shipped.** AC installed CloudAI-X/threejs-skills (10 skills, vendored to repo, commit a9681c9) and asked to apply them to the videos, draft-first in pictures, everything persisted to the skill; the BRAND-LAW question (lit metal / grain / gradients vs flat-gold law) he explicitly DEFERRED — 'draft first, ask me later' — so the reel engine is UNTOUCHED. Pipeline proven: WebGL runs in the engine's exact chromium args (software GL), three r185 vendored offline (module+core+jsm passes), seek(t)-driven not rAF, 8 renderers/page fine. Full library in assets/threejs-lab/ (sheets A–D html + PNG contact sheets + README with per-move status): WORKS — node graph(2), extruded type via CSS-3D(4), particle figure(6), 3D AC figure(7), phone mockup(8), HK skyline(12), padlock(14), neural layers(15), AC monogram extrusion(18), camera flight w/ fog(19), motion trails(20), dolly zoom(22), orbit reveal(23), dissolve 9b (after THREE failed iterations — fixed-divisor under-scaled short strings, then all-points-jittered read as dust; final: normalize cloud by own bounds + 70% settled/30% fringe), DOF 10b (BokehPass painted an opaque black square until scene.background matched the ground). NEEDS CALIBRATION — globe(1, faint first cut, rebuilt lat/long-only), bars(3), coin(13, face upside-down at freeze angle), data stream(16, endpoint clips), liquid gold(17, reads as blob). LAW-BREAKERS awaiting AC's call — metal knot(5), liquid shader(17), film grain(21, FilmPass saturates gold even at 0.18). DEAD END logged: first-ever test (rotating 3D torus ring) read as broken mid-tilt — depth yes, SPIN no; premium archetype holds in 3D. Also: CSS-3D parallax restage of scene A proved the math but wrecked composition — full depth-layer restage is engine surgery, parked. Process errors logged: sent SHEET_A once without re-reading the fixed render; left a dead mk('d3x') killing sheet D's first build; grain 0.85 washed the frame. NEXT DECISION (AC's): law-breakers in or out; then per-move integration = one canvas as a scene element, existing scenes untouched, all gates re-run. His SVG logo unlocks exact monogram extrusion. | prototypes only — no story, no sources | lab · dark | — | — | ac-studio/assets/threejs-lab/ (1.8M): sheetA–D.html · SHEET_A–D.png · three r185 + jsm · README | — |
| 2026-08-21 | 38 | AI News (11.7s) | **"Claude signs every word." Anthropic text watermark** (CORRECTED POST-BUILD, see below) — Anthropic marks text from new Claude models launched **2 Aug 2026**, **worldwide** (not EU-only), a SynthID-Text variant, driven by the EU AI Act transparency obligation (**Article 50**). The reframe: the mark carries **no identifying information**, answers exactly one question ('how likely is it Claude partly wrote this'), cannot confirm a human wrote anything, cannot spot a different AI, and thins out on short text, factual text and code. Spine chosen by AC from a 3-way board (Article 50 over 'one question' / 'no name'). Hero figure became **`Aug 2`** not `50`: base caps the figure at 5 chars at 276px, so `Art. 50` (7) reaches the frame and a bare `50` trips the Day 35 no-unit rule; Article 50 moved to the label. VO-hooks: 3 banks offered, AC picked **Authority** ('Claude signs its work now. Your name is not on it.'); Controversy + Curiosity = A/B variants. **MOTION-DESIGN PASS (AC's ask, LottieFiles skill installed same day).** Audited the engine against the skill's checklist; 4 findings fixed, 2 declined with reasons, 5 items ruled NOT APPLICABLE (hover / loading / scroll / prefers-reduced-motion / mobile perf — this is a seek-driven offline frame renderer with no rAF loop, so there is no autonomous motion to reduce and the media query cannot reach an MP4). Fixed: (1) **`pop` overshoot ~10% → ~4%** via new `eSoft` — 10% is the PLAYFUL band, this brand is PREMIUM (0%); `eBack` kept for `stamp` since a rubber stamp should overshoot and a badge is Light weight. (2) **Transition envelope was directionally inverted** — `OUT`(0.24) ran LONGER than `IN`(0.22) and both ramps were raw linear; now IN=0.24/OUT=0.16 (entrance 50% longer) both eased through eOut. (3) **Duration palette** collapsed 7 ad-hoc values to quick .28 / std .45 / slow .58, assigned by distance so 48px `up` > 26px `rise`. (4) **Couplet follow-through** 220-300ms → 100ms so the stone/gold line pairs land as one thought. DECLINED: <500ms stagger budget (collides with gate 4's 1.0s motion floor — compressing it would fail a gate to satisfy a guideline) and arcs/counter-motion (brand is architectural; straight travel is the intent). **NEAR-MISS worth logging: the first palette pass would have pushed scene A's headline to 0.58s — A's durations are deliberately SHORT so the headline is fully opaque on frame 0, and lengthening them would have silently softened the loud open. Scene A excluded and verified: kicker/line1 opacity 1.0, line2 0.79 mid-settle.** **GATE-3 DEBT PARTLY REPAID (logged Day 37):** the sharper accelerated exit lifted row-decorrelation to **0.404** (need 0.150) vs Day 37's 0.020 — grid still reads 0.011, so the grid metric remains suspect, but the cut is now measurable. **ENGINE FIX: NEVER-COUNTS generalised** — the Day 36 money guard was `$`-only; an `Aug 2` odometer counted through **'Aug 0'**, which is not a day. Guard is now `spec.whole===true || prefix==='$'`. **Gate 7 caught 2 real defects:** proof odometer showed **'2' beside a three-item list** (fixed with whole:true) and **bare frames at every cut** (7.6s was figure+watermark only) — fixed by giving each scene's LEAD element a negative delay (scene A's own technique), while leaving each scene's LAST onset alone to hold gate 4. Gate 6 took 3 passes (scene A label too wide into the action rail; scene C chip into the watermark band — base lifts #wm to bottom:700px to clear its own floor bar, and the chip's 1.5x stamp entry inflates its box downward; fixed with base floor padding 260→320px). **TOOLCHAIN: this container had no working ffmpeg** — Playwright's bundled build is `--disable-everything` (webm/VP8/png only, no libx264/aac/mp4), so the first build failed at encode. Installed the imageio-ffmpeg wheel (7.0.2 static, x264+aac+mp4). No ffprobe anywhere and static-ffmpeg's download is 403'd by the egress proxy, so wrote a shim at /usr/local/bin/ffprobe that parses real `ffmpeg -i` output for duration + stream types and exits non-zero rather than inventing a value. numpy/pillow/reportlab also installed. Gates 1/2 CLEAN · 6 CLEAN (3 passes) · 7 READ (2 catches) · 3 PASS · 4 PASS · 5 WARN-by-design · 8 CLEAN 3.7 syl/sec (A 4.2 warn, allowed). **POST-BUILD CORRECTION — the single most important lesson of this run.** The reel was BUILT and DELIVERED before the primary source had been read. WebFetch was egress-blocked on anthropic.com and every news domain, so the first cut was triangulated from secondary coverage. AC then invoked /web-scraping, whose network section states that `mcp__Exa__*` runs OUTSIDE the container and is therefore unaffected by the proxy denial — which was true, and had been available the whole time. One `web_fetch_exa` call opened the primary page and falsified TWO on-screen claims: (1) **'Article 50' was not Anthropic's wording** — the Help Centre says the **Article 50(2) Code of Practice on Transparency of AI-Generated Content**, and the news post says only 'the EU AI Act'; (2) **the '3 weak spots' figure asserted a completeness the sources never state** — between the two pages the limitations run to at least six, so the hero 3 was an invented total sitting on a brand whose whole promise is verified numbers. Scene C was rebuilt on a BETTER and fully-quoted fact: **'People often use Claude to proofread, translate, summarize, or convert files. The output can carry a Claude mark even if the underlying ideas, text, or data originated from another source.'** → hero **4**, 'ways it marks your own words. Proofread. Translate. Summarize. Convert.' That is the most audience-relevant fact in the whole story and the first pass missed it entirely by never opening the page. 'Worldwide' was CONFIRMED ('wherever Claude is offered, worldwide'), as was 'no identifying information' ('can't be traced to a specific person, organization, or chat'). Base floor padding went 320→344px to fit the 2-line scene-C label under the watermark. **STANDING RULE ADDED: never ship a number to a render before a primary page has been opened. If WebFetch is egress-blocked, that is not a dead end — go to `mcp__Exa__web_fetch_exa` FIRST, before falling back to search synthesis. Search snippets are a lead, not a source.** **MOTION VOCABULARY ADDED (AC's second motion ask, same day).** AC's verdict on the first motion pass: "looks exactly the same as before" — and he was right. That pass changed overshoot 10%→4%, exit 240ms→160ms, durations by 50-80ms and a couplet gap by 200ms. All correct, all SUB-PERCEPTUAL on an 11.7s phone video. Root cause named honestly: the engine's entire motion language was fade + translateY + one odometer scale + crossfade, so NO amount of retiming could change how a reel looks — nothing new ever happens on screen. Retiming is correctness; looking different needs new moves. AC chose 'visible but brand-safe' and picked three; all are transform/clip only, flat ground and one gold idea untouched: (1) **masked type reveals** — new `wipe` type, clip-path inset uncovers a line left-to-right while it settles 8px, opacity NOT ramped so the mask does the reveal (that is what separates it from a fade); applied to B's couplet, D's couplet and E's handle. (2) **digit-mask slide** — new `setOdo()` paints the figure as per-character clipped columns and rides each up on a 55ms left-to-right cascade. Chosen over a true counting digit-roll precisely BECAUSE it shows no false values: characters arrive from empty space rather than counting through wrong digits, so it composes with the never-counts guard instead of fighting it. (3) **drawn gold rules** — new `grule` element + `rule` type, scaleX from the left; the scene-B strike-through move promoted to something reusable. Placed under scene A's figure and under scene D's gold line. **GATE 7 CAUGHT A TOTAL FAILURE:** the first build of this rendered the odometer COMPLETELY INVISIBLE in both A and C. Cause: `.gold` paints via `background-clip:text` + `color:transparent`, which only works when the text is a DIRECT child — setOdo nests each glyph in `.odc>i`, so children inherited transparency with no background of their own. DOM, transforms and opacity all measured correct; it was a paint bug, invisible to every geometry gate. Fixed by re-applying the gradient at glyph level plus a t-column flatten override. **Two process notes: (a) I twice read `ls` output before the encoder finished flushing and twice mis-reported the build — once as 'no MP4 produced' and once as 'stale file'. Both were my check racing the write. Stat the mtime, do not trust a listing taken seconds after a build returns. (b) The nine-item brief AC pasted is a WEB-APP checklist: hover, loading states, scroll choreography, prefers-reduced-motion and mobile perf have no referent in a seek-driven offline frame renderer with no rAF loop. Said so plainly rather than shipping dead code. Those five are deferred to the itsac.ai site, which AC confirmed is the second half of the job.** Gates after: 1/2/6 CLEAN · 7 READ · 3 PASS (row-decorr 0.369) · 4 PASS · 5 WARN-by-design. **POLISH PASS — two engine defects found that had been shipping for the life of the page.** AC screenshotted scene A and said "polish this". Measuring rather than eyeballing found: **(1) POPPINS WAS NEVER LOADING.** The template set `font-family:'Poppins'` on twelve small-type rules (kicker, sub, chip, arrow, watermark, subtitle, tagline) but declared NO @font-face for it, shipped no Poppins file, and had no <link> or @import. It silently resolved to the system fallback — a SERIF. Brand law is "Poppins for all small type", and the look depends on ONE display serif set against a geometric sans; with both layers serif the typographic contrast collapses, which is precisely why frames read flat. Proof: a width probe rendered 'Poppins' at 883px, identical to 'serif' at 883px. Fixed by fetching the four real weights used (400/500/600/700) from Google Fonts into assets/fonts/ and declaring them, PLUS giving every consumer a 'Helvetica Neue',Arial,sans-serif fallback chain so a missing file can never land on a serif again. **(2) BASE'S HERO WAS AT HALF SIZE.** Scene A's odometer carried an inline `style="font-size:134px"`, which beats every `#stage.t-<theme> .odometer` rule on specificity — so scene A's figure rendered at 134px in EVERY theme while scene C's obeyed the theme. Measured on base: odoA 134px vs odoC 276px, same class, same frame. base exists to make the figure the hero and its loud open had been shipping that hero at under half size. Inline removed. Knock-ons handled: floor padding 344→400px for the taller block; the drawn rule moved ABOVE the figure (under a 276px hero it fought the 'g' descender and read as a stray tick); `.odc` given padding/negative-margin so overflow:hidden stops clipping descenders; glow cut from 20px/0.16 to 12px/0.08 since it was tuned for a 134px figure and read as blur at 276px; word-space narrowed to 0.24em because a display-size space opened a hole in "Aug 2"; rule gradient made SYMMETRIC (a one-sided fade under centred content reads as a mistake). **Scene A's figure now lands ON FRAME 0** — it used to start at 0.5s, leaving a 276px hole through the exact window the scroll decision happens in. **Three of my own mistakes, logged:** (a) a blanket replace of `font-family:'Poppins';` also rewrote the four @font-face blocks I had just written, and a @font-face descriptor takes ONE family, so all four faces were silently discarded — caught only by re-probing widths, never by a gate; (b) the glyph slide originally rose UPWARD, pushing in-flight boxes into the action-rail band and tripping gate 6 on every entry frame, fixed by having glyphs DESCEND so the phantom box travels into empty frame (never bypass the gate, move the geometry); (c) pulling the cascade onto frame 0 made it finish at 0.35s and left scene A static until the rule drew at 1.30s — **gate 4 FAILED**, a real regression from my own change, fixed by lengthening the cascade to land at 0.75s and pulling the rule to 0.62s. Gate 3 row-decorrelation rose to **0.797** (from 0.369) as a side effect of the busier scene A. Final: 1/2/6 CLEAN · 7 READ · 3 PASS · 4 PASS · 5 WARN-by-design. Also installed + vendored CloudAI-X/threejs-skills (10 markdown skills, commit a9681c9) for the itsac.ai half of the motion brief. CTA: comment DISCLOSE → DM the one-line disclosure. SEO "Does Claude watermark AI text? Here is what the new watermark actually detects." | **PRIMARY SOURCES READ DIRECTLY** via `mcp__Exa__web_fetch_exa` (see correction note in the story cell): anthropic.com/news/claude-text-watermark (14 Aug) + support.claude.com/en/articles/16266773 (the Help Centre page, which is the one that carries the exact legal wording). Secondary corroboration: TechCrunch 11 + 15 Aug · Euronews 11 Aug · SearchEngineLand · Gizmodo · Forbes 11/13 Aug | base · dark (rotation: 37 column, 36 crest, 34/35 margin, 32 base) | A- (stop) / A- (send, Gift — the freelancer scared of AI detectors) | 9/10 (dings: loop line is a thematic echo not hooks.md's mid-sentence seam and the last frame does not visually rhyme with frame 0, so the watch-time row scores 1 of 2; story is 6-10 days old, not same-day) | runs at /root/day38/run: AC_News_Day38_claude-watermark_subs.mp4 (11.70s) · COVER_AC_News_Day38.png · AC_Day38_VO.pdf · caption.txt · dm_reply.txt (DISCLOSE) · beatsheet.md · zip AC_Day38_claude-watermark.zip | — |
| 2026-08-21 | — | STANDING RULE (no video) | **ONE CUT PER VIDEO, FIGURE ALWAYS ON — AC's call, same day as the Day 36/37 pair.** "No need to make 3 videos. Just one with subs, followed with the AC figure as well." Changes shipped: produce.sh now builds `_subs.mp4` ONLY by default (clean → `--clean-also`, silent/VO → `--silent-also`, light → `--light`); `FIGURE='on'` is now the default in reel.template.html (TOD already was, Day 35); SKILL.md steps 7/9 + guardrails + subtitles.md rewritten to match. Rationale logged: three cuts per run cost ~3x build time and phone taps for files that never got posted. NOTE for a future VO run: the silent cut AC records over no longer ships by default — pass `--silent-also` on any day he wants to record. | — | — | — | — | produce.sh · reel.template.html · SKILL.md · subtitles.md | — |
| 2026-08-21 | 37 | Tool of the Day (23.4s) | **"One login. Every model." OpenRouter** — one account, 500+ models incl. GPT/Claude/Gemini, browser chat, no code. Free: 50 requests/day on ':free' models; one-time $10 credit lifts to 1,000/day; pay-per-use, no markup, 5.5% ($0.80 min) top-up fee — all vendor docs (openrouter.ai/docs/faq, 21 Aug), RE-CHECK morning of posting. News peg: Stripe's reported $7.5B acquisition (same-day Day 36). VO-hooks: 3 banks offered (rotated off Day 35's Controversy), AC picked **Storytelling** ("Here's how one login replaces three AI subscriptions", stop A- / send A- Gift — the friend paying 3 AI subs); Authority + Curiosity = A/B variants. COLUMN theme + narrator lane, first run of that combo: scenes A/D bottomed into the caption band at column's 300px drop (run-copy margin lifts); C footer trimmed for gate 6; "no card" chart label caught UNVERIFIED on the filmstrip and swapped to 'free models'. **Gate 3 shipped FAIL, logged-not-hidden (Day 26/27 precedent): grid 0.020 vs 0.120 across three builds while the frames visibly transform (mockup scene → 264px gold 50/day landing 0.25s into B). Diagnosis: gate 3 samples ±0.15s around the cut — INSIDE the crossfade — so any smoothed transition in column measures near-zero; the same straddle read 0.021 before and after every content intervention, i.e. the instrument, not the cut. ENGINE DEBT: gate 3 needs to sample outside the transition envelope (e.g. cut±0.45s) or column needs a per-scene block shift.** Gates 1/2/6 CLEAN · 4 PASS (figure) · 5 WARN-by-design · 7 filmstrip READ (caught the 'no card' claim) · 8 CLEAN 3.3 syl/sec (A warn, allowed). CTA: comment ROUTER → DM quickstart. SEO "Free AI without the subscriptions: one OpenRouter login runs GPT, Claude, Gemini and 500+ models." | openrouter.ai/docs/faq + /chat (vendor, 21 Aug) · TechCrunch 19 Aug (deal context) | column · dark | A- (stop) / A- (send, Gift) | 9/10 (ding: gate-3 debt logged; tool skews dev-adjacent for the audience) | runs at /root/day37/run: AC_TOD_Day37_openrouter subs/clean/silent (23.37s) · COVER.png · AC_Day37_VO.pdf · caption.txt · dm_reply.txt (ROUTER) · zip AC_Day37_openrouter.zip | — |
| 2026-08-21 | 36 | AI News (11.7s) | **"Stripe bought the AI middleman." Stripe–OpenRouter** — reported $7.5B (NYT; Stripe has NOT disclosed — 'Reported' chip on screen + 'reported' in VO notes), valuation $1.3B in May → sale three months later (TechCrunch 19 Aug analysis). Angle: the plumbing is the business now; models are becoming interchangeable, the picking/metering layer is what sold. VO-hooks: 3 banks offered, AC picked **Curiosity** ("Stripe just bought the AI middleman", stop A- / send B+ Gossip — the friend on Stripe); Storytelling ($1.3B→$7.5B) + Authority (watch the plumbing) = A/B variants. **ENGINE FIX ported to reel.template.html: MONEY-NEVER-COUNTS** — the News odometer flashed "$7.0B" mid-count on a reported $7.5B price (filmstrip catch; the Day 35 TOD rule had never reached the News engine). $ figures now land whole; spec.count===true overrides. Gate 8 caught D at 4.3 syl/sec → "Plumbing is the business now." (3.8, slowest-line rule kept). Gates 1/2/6 CLEAN · 3 PASS · 4 PASS · 5 WARN-by-design · 7 READ · 8 CLEAN 3.2. CTA: comment SUBS or USAGE (binary; last binaries KEEP/LOSE Day 32, MARK/NO MARK Case 003). SEO "Stripe is buying OpenRouter: what the reported $7.5B AI deal means for your business." | TechCrunch 19 Aug (techcrunch.com/2026/08/19/stripe-didnt-really-buy-openrouter...) · NYT via TC · Bloomberg 16 Aug ("over $7B", said-to) | crest · dark (rotation: 34/35 margin, 32 base) | A- (stop) / B+ (send, Gossip) | 9/10 (ding: price is reported, not company-confirmed — attributed on screen) | runs at /root/day36/run: AC_News_Day36_stripe-openrouter subs/clean/silent (11.7s) · COVER.png · AC_Day36_VO.pdf · caption.txt · zip AC_Day36_stripe-openrouter.zip | — |
| 2026-08-18 | 35 | Tool of the Day (23.4s) | **"You don't need an editor." OpusClip** - cuts long video into ranked, captioned vertical clips; free plan is real: 60 processing min/mo (vendor's own "Free Forever"), $15 Starter / $29 Pro, 1 min source = 1 credit. Honest ceiling ON SCREEN (scene F): watermark on free, 3-day export window, it cuts, it doesn't create. **First run of the vo-hooks offer-3 workflow**: 3 filled hooks from 3 banks presented, AC picked Controversy ("You don't need an editor to post clips every day", stop A / send A- Gift); Storytelling + Curiosity are the A/B trial variants. BANK LOGGED: Controversy - next run offers other banks first. Shortlist survivors killed: Hostinger builder (no free tier), AI phone receptionist (Day 28's fake-free-tier category). **Engine improvement shipped**: News-engine push-in ported to TOD seek() - gate 4 debt 8 stretches/2.10s worst -> 5/1.60s; remainder is the documented sub-floor ceiling, shipped logged-not-hidden (Day 26/27 precedent). RE-CHECK opus.pro/pricing morning of posting | help.opus.pro Plans ("Free Forever", 60 min/mo) · opus.pro/pricing ($15/$29) · opus.pro homepage FAQ · prizmad.com review "verified July 2026" | margin · dark (crest ran Days 24+27) | A (stop) / A- (send, Gift - the friend paying an editor) | 9/10 (fresh row dinged: known tool; freshness = verified-pricing angle) | runs/day35-tod/: AC_TOD_Day35_opusclip_subs / clean / _silent (23.37s) · COVER.png · AC_Day35_VO.pdf (55 words, 3.4 syl/sec, gate 8 CLEAN) · caption.txt (5 wording gates) · dm_reply.txt (CLIP) · beatsheet-draft (day35-tod-draft/). **FIGURE ADDED 2026-08-19** on AC's note "the AC figure is missing in the video": the News-engine narrator mark, rig and pose set ported verbatim into the TOD engine (FIGURE='on' is now this engine's default). He carries A, F and G - hook, rule, sign-off - and is deliberately absent from the four data scenes, because a narrator standing beside the 60, the chart or the steps turns evidence into an opinion. He stands in the subtitle lane and the typed caption is his speech; the lane left-aligns at x=310 for the WHOLE video (a per-scene padding reads as a jumping caption and puts a moving box under gate 1's force-show). **GATE 4 NOW PASSES** - no window over 1.0s, the first clean motion floor this engine has ever measured: his breathing and gestures put continuous large-area motion on a frame that is 90% black, which is the thing the gate was asking for since Day 24. Run also ships as ONE zip now (scripts/package_run.sh, wired into SKILL.md step 9). Gates 1/2/6 CLEAN · 3 PASS · 4 PASS · **7 (filmstrip) READ CLEAN** · (pre-figure: 4 had one stretch left, 1.40s from 12.90s (scene E's opening: step 1 lands but a single text row is below the frame-global -50 dB floor, so the gate only clears when step 2 arrives) - logged then CLOSED by the figure) · 5 WARN-by-design. Beat-map retime took gate 4 from 3 stretches / 3.33s to 1 / 1.40s across four measured builds; scene F's opening stretch closed by pulling the strike and the swap forward off the lone icon. SEO line "Free AI video editing for busy owners: one long video, a week of clips." CTA: comment CLIP -> DM quickstart **POLISH PASS same day (2026-08-18), on AC's note "fix the 60 · smoother transitions · prevent this and check it first"**: five engine defects root-caused and fixed in tod.template.html, not in this run's copy - (1) the hero figure counted up NAKED, unit snapping in at the end ("60" then "60 min"); (2) prices could count, so a frame read "$28/mo" for a $29 plan - money now lands whole (MONEY-NEVER-COUNTS rule, override with number.count); (3) scene F's strike was drawn across the whole icon row instead of the mark it struck (slash now lives in its own rotated wrapper) and the icon swap cross-dissolves as one move; (4) scene B's icon was hardcoded to the globe whatever the run set (now honours number.icon; clock icon added); (5) the rotated stamp's ink box clipped the line beneath it (12px spacer). Plus: scene E's progress dots were 1.35s out of sync with the steps they report, and the tagline wrapped. **Beat map retimed** (A: app window opens at 0.30 with the prompt, not at 1.25 after it; C: card stagger 0.55s -> 0.45s) so no scene opens on a still. **NEW GATE 7 - THE FILMSTRIP** (scripts/qa_filmstrip.sh): every other gate inspects SETTLED frames only (audit_capture freezes at start+dur*0.55), which is why all five defects shipped clean; gate 7 samples entry / IN FLIGHT / settled / exit per scene plus both sides of every cut and tiles them for reading. Gate 8's TOD windows were still the pre-Day-27 31.6s map - corrected. VO rewritten against the FILLED template (the first pass was written from the beat sheet's generic beat names, so 3 lines sat on the wrong picture); new rule: beat-sheet rows carry the engine's slot names. Adversarial audit: 5 lenses x 31 frames, 29 findings, 27 refuted, 2 confirmed (both the tagline wrap, already fixed). | — |
| 2026-08-18 | 34 | AI News engine (11.7s) — **page-introduction reel** | **"To the AI gurus. 14 "free" tools. 6 were trials."** Structure borrowed move-for-move from @realsimonsquibb DZdWv_jMQfJ (80.8K likes / 9.1K comments, ~11% ratio): villain-address open ("This is a message to all universities" → kicker "To the AI gurus") · contrarian mass-identity claim (uni is a scam → most AI advice is an ad, ADVICE→ADS toggle) · trailer logic (reel proves, page is the doc) · comment-keyword gate (UNI → **PLAIN**, DM = starter kit in dm_reply.txt) · identity question ("Has uni scammed you?" → "What's the last AI promise that turned out to be an ad?") · tone-flip release valve (his editor's deadpan → caption's "(Yes, the warning tone is dramatic. The receipts aren't.)"). Both receipts self-sourced from logged runs: 6-of-14 free-tier check (Day 28) + the unsourceable 80% follow-up stat (Day 25's kill). Wording gates: never name the unnamed vendor; 80% stat is "nobody can source it", never "false". Analyzed from AC's screen recording of the source reel (21.7s) — full breakdown in runs/day34-intro/structure-analysis.md | AC's own checks (Days 25/28 runs) · source reel via public embed + AC's recording | margin · dark (rotation: Day 29 crest; usable News set crest+margin) | A (stop) / A- (send, Gift — the friend who forwards AI-hype reels) | 9/10 (fresh row dinged: both receipts previously posted; format+theme fresh) | runs/day34-intro/: **SHIPPED CUT: AC_Intro_Trailer_stickfigure_MUSIC (18.5s, figure-as-Simon trailer, BIA track muxed; subtitles dropped by design, words are the captions; no-hair figure per AC's reference; engine promoted to assets/trailer.template.html + references/trailer-scenes.md; gates 1/2/6 CLEAN, 3/4 PASS, 5 WARN-by-design; map A=0 B=2.0 C=5.0 D=12.6 E=15.4)** · superseded first cut AC_News_Day34_intro-warning_subs / clean / _silent (11.7s) · COVER.png · AC_Day34_VO.pdf (29 words, 3.4 syl/sec, gate 8 CLEAN) · beatsheet.md · caption.txt (primary + Squibb-short variant + 6 wording gates + posting note) · dm_reply.txt · structure-analysis.md · vo_spec.json. Gates 1/2/6 CLEAN pre-render. SEO line "AI in plain English for business owners: how to tell AI advice from AI ads." CTA: comment PLAIN → DM starter kit. **Pin to profile top once posted** | — |
| 2026-08-13 | 29 | AI News reel (11.7s) | **"Your prompt failed. That was not you."** From the 13 Aug morning shortlist, top pick. Anthropic's zeta result: first session generated and tried **650 ideas, none of which worked** - that session FAILED. A separate second session ran ~60 Claude subagents over "a day and a half"; of the 60, **2 developed the key ideas and 30 attempted but were unable**. The human in the loop was not a mathematician and contributed "mostly variants of 'keep going' or 'believe in yourself'". Reframe: the version of AI people post online is one prompt and a perfect answer; the real thing is 650 dead ends and somebody refusing to stop. The people posting flawless one-shot screenshots are showing you attempt 651. Direct-callout hook takes the blame off the viewer in the first four words | Anthropic, *Learning more about Claude's mathematical capabilities*, 10 Aug 2026, anthropic.com/research/riemann-zeta - opened and read directly TWICE (shortlist run + production run). 6 wording gates in caption.txt, load-bearing three: it did NOT prove the Riemann hypothesis and "solved" appears nowhere; UNRELEASED research model so nothing implies the viewer can try it; the 650 failures are session ONE and are never merged with the successful second session. 41.6->67.2% deliberately kept OFF screen (lower bound, easy to misread, closed fact) | crest · dark (repeat of Day 27, 2 days - dinged honestly on the freshness row; column is still unfixed for News reels and base's floor bar is still in the covered strip, so the usable set is two) | A | 9/10 | AC_News_Day29_650-ideas_subs / clean / _silent (11.7s) · COVER.png · VO PDF (29 words) · beatsheet · caption.txt · vo_spec.json. **Gates 1/2/6 CLEAN · gate 3 PASS · gate 4 PASS · gate 5 WARN.** SEO line "AI news for small business owners: the biggest AI result of the year needed 650 failed attempts first." CTA: comment GAVE UP or KEPT GOING. **TAG @anthropic** | — |
| 2026-08-12 | 28 | Carousel (Tool of the Day) | **"14 'free' tools. 6 were trials."** The morning shortlist swept the tool lane and NOTHING cleared the free-tier gate - the brief's own words: "this is a finding, not a gap." AC asked for a fresh hunt first; that returned one honest kill and three mediocre candidates, so the run came back to the board. **The rejection IS the post.** Today the Tool of the Day pillar carries a METHOD, not a product: three 30-second checks before you trust a free AI tool. Read the pricing page not the homepage (one tool still headlines itself "#1 free AI phone agent" while its pricing page lists only $24 and $99) · a trial is a countdown, card up front means billed later · find the GHOST TIER, the paid plans still say "Everything in free, plus" for a tier that no longer exists - that leftover sentence is the receipt. **Company deliberately UNNAMED per the brief's standing risk flag.** KILLED THIS RUN: ChatGPT's unlimited free text chats + Think button - OpenAI's release notes carry Aug 7 and Aug 10 entries but NONE confirming rollout, so the Aug 6 "starting next week" is still future tense and it fails Day 26's cannot-post-until-verified-live rule | @itsac.ai morning shortlist 2026-08-12 section D (14 tools named and checked). Unnamed case verified on the vendor's own pricing page: two plans, no free plan, while plan cards still read "Everything in <X> free"; corroborated by Trustpilot reports of withdrawal and a third-party Apr 2026 discontinuation analysis. 6 wording gates in caption.txt, load-bearing: DO NOT NAME THE COMPANY (incl. in replies); the 14 and the 6 are AC's own check, never "a study found"; no accusation of fraud, the frame is "the homepage and the pricing page disagree and only one is binding" | base · dark (longest unused, last ran Day 15; base's covered-bottom-bar defect is REEL-only, the bar is fully visible on a 1080x1350 carousel and fills across all five slides) | A | 9/10 (recency row: the sweep is same-day but the underlying withdrawal is months old) | AC_TOD_Day28_free-tier-check_01..05.png · caption.txt (SEO line + caption + 5 tags + 3 A/B hooks + full 14-tool list + 6 wording gates + posting note) · deck.html. qa_deck.js CLEAN, 30 blocks. SEO line "How to tell if an AI tool is actually free: read the pricing page, not the homepage." CTA: comment TRIAL or TIER (week's binary, no keyword gate). **First TOD where the pillar carries a method rather than a product** - if it performs, it is the template for any day the tool lane comes up empty | — |
| 2026-08-11 | 27 | Tool of the Day (23.4s) | **"You talk. The board moves."** Trello MCP, Atlassian's official AI bridge, live 22 Jul. Talk to any board instead of clicking it: build a board from one sentence, move a card, tick a checklist, ask what is overdue. **The contrarian beat came from Trello's own pricing page** - Trello sells AI on your boards as a paid upgrade ($5/user/mo Standard, $10 Premium, and AI-GENERATED BOARDS is one of the paid rows), then shipped a free door that does that same headline job on any plan including Free. Honest ceiling stated ON SCREEN in scene F, not buried in the caption: "It is a doorway. Not a worker." No triggers, nothing runs while the chat is closed, archive only and no permanent delete. Planner focus-time use cases deliberately CUT from the copy because creating focus time needs Premium - every use case on screen is free-plan safe | Atlassian blog 22 Jul 2026 ("over 100 million people have signed up to use"; "available to all Trello users") · support.atlassian.com prerequisite verbatim "A Trello account on any plan" + capabilities/limits table · trello.com/pricing for the $5 and $10 · usecarly.com 16 Jul teardown for the ceiling ("a doorway, not a worker") · Express Computer 29 Jul as 3rd independent confirmation of the free tier. 7 wording gates in caption.txt, load-bearing one: free-from-Trello is not free-of-everything, it draws on your AI client's own message limits | crest · dark (AC picked a repeat over base once told base's floor bar sits in the covered bottom 26px) | A- | 9/10 (watch-time row honestly failed: engine motion debt, see below) | AC_TOD_Day27_trello-mcp_subs / clean / _silent (23.4s) · COVER.png · VO PDF (65 words, retimed) · beatsheet · caption.txt · vo_spec.json. **Gates: 1/2/6 CLEAN · gate 3 FAIL -> PASS · gate 4 improved ~45% but still fails · gate 5 WARN (unchanged, 0 cuts by design)**. SEO line "Free AI tools for small business owners: Trello just let ChatGPT and Claude run your boards for you, on the free plan." CTA: comment THREAD or LIST (week 1 comment-binary, no keyword gate). **TAG @trello / @atlassian** | — |
| 2026-08-10 | 26 | AI News (11.7s) | **"Everyone is using AI. Almost nobody pays."** Week 1 of the comment-binary experiment (every post ends on a two-option question; decided off AC's first full Insights drop 2026-08-09: reach fixed — 175/139 peaks vs old 39.7 mean — but 562 views across 8 reels returned 0 comments, 0 shares, 1 send). Scene A: 77% use AI regularly (Intuit survey, 34k owners, named on screen incl. vendor-interest disclosure). Scene C: 17.7% ever paid (JPMorganChase bank records, 4.6M firms) + chip "86% who paid in 2024 still paid in 2025". The two figures labelled "use regularly" vs "ever paid", NEVER one funnel. CTA: comment PAID or FREE, no keyword gate. Corrected the 2026-08-08 shortlist in passing: JPMC wording is "By December 2025" not "end of 2025"; per-country pay figures (11% CA / 7% UK) not on Intuit's page, dropped | Intuit QuickBooks 2026 AI Impact Report (12 May 2026, intuit.com/blog/global-stories/ai-impact-report) · JPMorganChase Institute April 2026 PDF (17.7%; Census BTOS 17.8% corroboration) | margin · dark (least-covered block under the IG player; base bar sits in the covered bottom 26px — engine fix still owed) | A | 9/10 (recency row honestly failed: May/April sources, freshness = two datasets agreeing) | AC_News_Day26_use-vs-pay_subs / clean / _silent (11.7s) · COVER.png · VO PDF · beatsheet · caption.txt · posting_note. Gates 1/2/6 clean · gate 3 PASS · gate 4 FAIL (News engine motion debt, 4 stretches ≤1.5s — same class as TOD's, logged not hidden) | — |
| 2026-08-08 | 25 | Carousel (Prompt Drop pack 02) | **"The follow-ups you keep not sending."** Boarded by `ac-week` on 2026-08-02 and produced as boarded. Cover figure: **only 36% of buyers get a reply within an hour of submitting a form, against 56% who expect one.** Pack is five muscles of the follow-up job: answer fast (new enquiry) / chase the quote (money not yet won, placed 2nd to pull the swipe deep) / kill the check-in (the craft beat) / wake the dead (reactivation) / **who is waiting** (general-purpose capstone that ranks which of the other four to run, so "run this one first" is structurally true and not just advice). **KILLED IN RESEARCH:** the "80% of sales need 5 follow-ups but 44% give up after one" stat that runs through every follow-up blog on the internet - no primary source survives, every trail dead-ends at a content-marketing page citing another content-marketing page. Exactly the figure this page exists to be the antidote to | Invoca, *The B2C Buyer Experience Report 2026* - press release 9 Jun 2026 (invoca.com/press-release/new-invoca-study-finds-consumers-wont-wait-ai-gives-brands-the-speed-to-win-the-sale), confirmed a 2nd time on the report page. 693 US consumers, 7 high-stakes industries, purchases generally above $500, fieldwork 8-22 May 2026. Verbatim "56% expect a business to respond within one hour after they submit a form" / "Only 36% actually receive a response in that window". **Scope kept US + high-stakes on screen and in caption; vendor interest named in caption (Invoca sells software that fixes this).** The 79% "will switch to a faster competitor" figure is stated intention, not behaviour, so it was deliberately kept OFF the slides | column · dark · card (last column was Day 17b, 30 Jul) | A | 10/10 | AC_PromptDrop02_followups_01..07.png (1080x1350) · caption.txt (SEO line + caption + 5 tags + 3 A/B cover hooks + slide-order rationale + 4 wording gates + killed-stat note) · **dm_reply.txt** (one pasteable message carrying all five prompts) · deck.html. SEO line "AI prompts for following up with customers: most sales are not lost on price, they are lost on silence." CTA: Comment PROMPTS -> DM the pack (format law) | — |
| 2026-08-07 | 24 | Tool of the Day (31.5s) | **"A $20 AI report. Yours for free."** Deep research is the feature the paid tiers charge $20/mo for, and Google still ticks it on the Gemini free plan. **The locked story was FALSE and got reframed at the checkpoint** — "three of the four went paid" fails on two counts: Microsoft is *removing* Deep Research from consumer Copilot on 18 Aug (11 days AFTER this posts, so future tense, and removal is not a paywall), and OpenAI + Perplexity both still publish a free allowance. Also corrected: a previous session recorded "Perplexity publishes no free-tier figure" — wrong, their help centre lists Research Queries Free = 1/month | All vendor-owned pages: OpenAI Help Center ($20/mo Plus) · perplexity.ai/hub/pricing ($20/mo Pro) + help centre (1/month) · support.google.com/gemini/answer/16275805 (Deep Research ticked "Without a Google AI plan", plus the "may be unavailable during periods of high demand" caveat quoted on screen) · support.microsoft.com (retires 18 Aug 2026) | crest · dark (AC overrode the locked `base` once told the theme block IS the progress bar and base's bar lives in the bottom 26px, which the player covers) | A | 10/10 | AC_TOD_Day24_deep-research_subs / clean / _silent (31.5s) · COVER.png · VO PDF · beatsheet · caption.txt (incl. DM reply + 6 wording gates) · posting_note. SEO line "Free AI research tools for small business owners: the deep research report the paid plans charge $20 a month for is still free in the Gemini app." · CTA: comment RESEARCH + "what's the one thing you'd hand it first?" · **TAG @google / @googlegemini** | — |
| 2026-08-03 | 20 | AI News reel (11.7s + 24s) | **"Not the AI. The access."** Anthropic disclosed that during its OWN cybersecurity evaluations, Claude models "gained unauthorized access to the real systems of three different organizations". Cause was a sandbox misconfiguration with eval partner Irregular that left test machines with live internet while prompts said otherwise, NOT a model going rogue. April 2026 to 23-24 July before it was identified. Read: the question is not "is my AI safe" but "what can the credentials I gave it actually reach" | Anthropic, *Investigating three real-world incidents in our cybersecurity evaluations*, 30 Jul 2026 — anthropic.com/news/investigating-incidents-cybersecurity-evals. SINGLE primary source, self-disclosed and self-investigated, no independent audit, by the vendor of the models involved. Chip + caption both say so on screen | crest · dark (last crest REEL was Day 8; 19/19b were margin, 16/17 column) | A | 9/10 | AC_News_Day20_ai-access _subs / clean / _silent (11.7s, all gates PASS) + _24s_subs / _24s_silent (24.0s, map A=0 B=5.2 C=10.3 D=15.4 E=19.7, **VO-ONLY — fails gates 3+4 silent**) · 2 VO PDFs · beatsheet · SEO line "AI security for small business: the risk was never the AI, it's what you gave it access to." · CTA: Save + "what's the one tool you've given more access than it needs?" · **TAG @anthropic** | — |
| 2026-08-03 | 19b | Carousel (AI News) — **rebuild, art blocks** | Same ATLAS story, rebuilt after AC asked for the Google/Gemini logos and "more icons and imagery". **Deck engine extended with ART BLOCKS** (`art:` swaps the single 172px icon for a full-width block; `kicon:` puts a small mark in the kicker row): `source` (Google/Gemini attribution chip) · `split` (two direct-labelled bars) · `depth` (100 dots, 21 lit) · `comb` (shallow teeth, one going all the way down) · `choice` (tappable A/B cards). Slide copy re-cut so headline = claim, art = evidence, sub = meaning (slide 2 headline moved from "20.7% vs 13.5%" to "It is not close." because the bars already say the numbers) | unchanged from Day 19 | margin · dark; art audited CLEAN in all four themes | A | 10/10 | slides_art/AC_News_atlas-learning_01..05.png · deck_art.html · engine merged back into `assets/deck.template.html` + `references/carousel.md` documented | — |
| 2026-08-03 | 19 | Carousel (AI News) — **first `ac-week` batch, slot 1 of 5** | **"Learning beat work."** Google read 15M Gemini conversations: Education is **20.7%** of all conversations, every work task combined is **13.5%** — learning alone is a bigger slice than all work use. Depth beat: median occupation with any AI use touches only **21% of tasks**, 29% of occupations show zero. Read: breadth is table stakes, depth is unclaimed. AC approved as a REEL on the board, then switched to **carousel instead** before production. **Verification corrected the shortlist's framing**: the brief called the 86% non-work share "household admin after hours" — the paper's own table shows it is leisure 26.4% + education 20.7%, which is what produced the education-beats-work angle (a stronger story than the one planned) | Google + Google DeepMind, *AI & Economy ATLAS v1.0*, 23 Jul 2026 — ai.google/static/documents/GoogleATLASv1.pdf. 14,653,926 de-identified interactions, Gemini App + AI Mode + API, 6–19 Apr 2026, 800+ occupations / 4,000 tasks / 150 countries. Reviewed by Diane Coyle (Cambridge) + David Autor (MIT). Full-text verified by subagent against the raw PDF | margin · dark (longest unused since Day 14; the analytical theme, correct for two competing figures) | A | 10/10 | AC_News_atlas-learning_01..05.png (1080x1350) · caption.txt (SEO line + caption + 5 tags + 3 A/B cover hooks + wording gates + comment-challenge answers) · deck.html · WEEK_BOARD.html. **No dm_reply.txt needed** — comment device is a two-option question, not a keyword gate. SEO line "What people actually use AI for, according to Google's own data: mostly not work." CTA: Save + A/B question | — |
| 2026-07-31 | 18 | Carousel (Prompt Drop, format born) | **New recurring Saturday format.** Reverse-engineered a high-engagement competitor carousel (@itsaiguide, "7 Claude prompts"): the mechanics that work are a countable pack, copy-paste instruments rather than inspiration, payload spread across slides, locked structure, and a format that repeats weekly. Stripped its hype (BREAKING on evergreen content, "$500/hour expert", red circuit-brain stock, face on 60% of every slide). AC's edge is the `You get back` line: everyone else ships the prompt, this ships the prompt plus what it hands back. AC picked the **`card`** style from a 3-way render, then grew the pack to **5 prompts / 7 slides**. Pack 01: get paid / quote it / sort the money / clear the inbox / **sound like you** (the general-purpose capstone AC asked for, deliberately last so it improves the four above it; caption says "run the last one first") | Amex + Small Business Saturday UK SME Business Barometer, published 2026-07-20, 1,000 UK micro/small/medium business owners: "an average of 11 hours per week on administrative or finance-related tasks", ~6 working days/month vs 3.6 on sales and business development. Verified across Retail Times + ChannelX. UK-only, and the caption does not upgrade it to global | crest · dark (longest unused, Day 8) | A | 10/10 | **Deck engine extended:** `type:'prompt'` archetype + `CONFIG.card` (card / terminal / ledger), all 4 themes x 2 looks x 3 card styles audited clean. New `assets/qa_deck.js` (per-slide glyph-ink audit for decks - `qa_layout.sh` gate 2 reads SCENES and dies on a deck, so decks had NO ink gate until now). New `references/prompt-drop.md`. Final 7 slides (crest/dark/card) + 3-way comparison sheets + caption.txt (SEO line, caption, 5 tags, 3 A/B cover hooks, slide-order rationale, runner-up prompt) + **dm_reply.txt** (the one-message DM artifact the PROMPTS keyword promises). SEO line "The best AI prompts for small business owners are not the clever ones." CTA: Comment PROMPTS -> DM the pack (first keyword CTA since Day 11b) | — |
| 2026-07-30 | 17b | Carousel | Same Meta business-agents story as Day 17, restructured for recall: 5 beats (hook · shift · proof · **the catch** · rule). The catch slide (free to start, paid tiers coming, gated rollout) is the beat the 11.7s reel had no room for, and it is what makes the deck anti-hype rather than a Meta ad | Same primary sources as Day 17 | column · dark (AC picked from all four rendered) | — | — | AC_Carousel_meta-agents_01..05.png (1080x1350) · carousel_caption.txt (own caption, deliberately not the reel's) · **deck engine REBUILT and packaged**: assets/deck.template.html + assets/render_slides.js | — |
| 2026-07-30 | 17 | AI News | Meta Business Agents: 1M+ businesses using them EVERY WEEK on WhatsApp + Messenger, rolling onto Instagram now. Proof: Movida (Brazil car rental, ~400 locations, NOT a small business) reported 44% more daily WhatsApp bookings + 85% of chats resolved with no human. Angle: the bar moved from smarter to faster; you do not need the agent, you need the faster reply. Concrete-image hook, first time the page has used the "your competitor's inbox" frame | Meta Q2 2026 Earnings Call Transcript 2026-07-29 (Meta IR, s21.q4cdn.com/399680738) — Zuckerberg verbatim "more than 1 million businesses using them to talk to their customers or complete sales every week"; Movida figures same call. Free-to-start + "paid subscription offerings in the coming months" from Meta Newsroom 2026-06-03 | column · dark (AC picked it over crest mid-run; 2nd column day running) | A | 10/10 | AC_News_Day17_meta-agents-1m _subs / clean / _silent (11.7s) + _24s_subs / _24s / _24s_silent (24.0s, silent 24.3s; map A=0 B=5.2 C=10.3 D=15.4 E=19.7) · cover · 2 VO PDFs (11.7s + 24s) · beatsheet · caption.txt · SEO line "AI news for small business owners: a million businesses now have AI answering their messages at 2am." · CTA: Save then send (led with Save because Days 15 + 16 both led with send) | — |
| 2026-07-30 | 16 | AI News | Microsoft FY26 Q4: $115.9B additions to property and equipment (NOT "AI spend" — line item named exactly on screen, wording gate from AC) + 30M+ paid M365 Copilot seats. Angle: giants spend, you use — flips "am I behind" into permission. Verdict close + "we" framing (same spine as Day 15) | Microsoft FY26 Q4 earnings release 2026-07-29 — Cash Flows Stmt $115,948M 12mo ended 30 Jun 2026; Nadella "over 30 million paid seats"; Q4 rev $90.0B, FY26 $331.8B | column · dark (gold upper half; $115.9B falls at the fold) | A | 10/10 | AC_News_Day16_microsoft-115-9B _subs / clean / _silent (24.0s; silent 24.3s; map A=0 B=5.2 C=10.3 D=15.4 E=19.7) · cover · VO+caption doc · SEO line "If you feel behind on AI, Microsoft's own numbers say otherwise." · CTA: send | — |
| 2026-07-30 | 15 | AI News | Bluevine: 74% of SMBs use/test AI · 78% don't trust it on basic tasks · 82% hit roadblocks · 48% save 4+ hrs/wk. Verdict close "don't trust it, test it" (trademark live test) · TRUST→TEST toggle · "us" framing for AC's VO | Bluevine 2026 SMB AI Trends (Centiment, n=942, fielded 7–9 Apr, ±3%) via PR Newswire 2026-07-15 | base · dark | A | 10/10 | AC_News_Day15_bluevine-74-78 _subs / clean / _silent (11.7s) + _24s_subs / _24s / _24s_silent (24.0s, silent 24.3s; map A=0 B=5.2 C=10.3 D=15.4 E=19.7, 24s subs track the VO not the graphics) · cover · beatsheet (VO + caption + 5 tags + A/B) · SEO line "Most small businesses using AI don't actually trust it." · CTA: send ("the friend who acts like everyone else has AI figured out") | — |
| 2026-07-29 | 14 | AI News | Weekly roundup: bots = 57% of web traffic (Cloudflare) · Meta AI now acts (Muse Spark 1.1) · Andrew Ng $100M "AI won't take your job" | Cloudflare Radar (Jun 2026) · Meta/Reuters 2026-07-24 · Reuters/Axios 2026-07-28 | margin · dark + light | A- | 10/10 | 11.7s (margin + _light) AND ~24s cut (margin_24s + _light, retimed — scene map now in references/variants.md) · caption · VO (11.7 + 24s) · lowercase tags | — |
| 2026-07-27 | 11b | Tip reel (retro entry) | ChatGPT custom instructions: 1,500 → 5,000 chars; comment keyword SETUP → DM brief | OpenAI release notes (Jul 2026) | Split Ledger layout (engine retired) | — | — | 20.5s silent MP4 for AC's own VO · same-day A/B partner to Day 11 post one | — |
| 2026-07-27 | 11 | AI News (retro entry) | SBE Council: small businesses using AI save ~16.5 hours/week | SBE Council survey (2026) | spotlight → maps to `column` · Signal v2 engine (retired) | — | — | ~20.5s three-zone cut, burned-in word-pop subs, face-safe bottom third | — |
| 2026-07-23 | 8 | AI News | 66% of US small businesses use AI, up from 55%; 70% need more training (Thryv survey, 561 owners) | CPA Practice Advisor 2026-07-14 · Sahm Capital 2026-07-09 | aurora → maps to `crest` | A | (pre-scorecard era) | AC_Reel_Day8_AInews.mp4 + silent cut · cover · caption · script · VO | — |

Notes:
- Day 8 shipped with handle @itsac.ai; all future runs use the `HANDLE` constant.
- **Day 9 closed unshipped** (TOD shortlist: Hostinger AI builder · AI phone receptionist ·
  OpusClip — still fair game as future TOD picks). **Day 10 skipped** — AC deliberately
  jumped the numbering to Day 11 for the Week 3 opener. **Days 12–13 have no log entry**
  (lost to a pre-persist-step session); if AC posted those days, backfill from him.
- Day 11 entries are retro-logged from session memory, not a shipped-day record — grades
  and scorecards were not captured.

**Template fix 2026-07-29 (Day 15):** `.newschip` margin-top 10px -> 30px in `reel.template.html`. The rotated chip's raised corner sat 8px under the line above (18px required); the default cut only passed because the ink gate samples scene C at 0.55*dur, before the chip settles. Exposed by the 24s retime. Day 15 chip text also dropped '· Bluevine' (source already in scene A).

**Theme system rebuilt 2026-07-29.** The old lighting-based themes are retired. Read
`references/themes.md`. Mapping for the entries above:
`ember → base`, `aurora → crest`, `spotlight → column`, `grid → margin`.

**Engines superseded 2026-07-29 (deliberate, per AC):** the Day-11 "Signal v2" engine
(three-zone, face-safe bottom third, word-pop subs) and the "Split Ledger" layout are
retired in favour of the four-theme system — nothing to recover.

Day 8 shipped what is now closest to **crest**. Day 14 used **margin**. TOD carries the same
four themes; pick one per run and log it. **Rotation status after Day 17:** column has now run
two days back to back (16, 17) at AC's request; `crest` is the longest unused (Day 8) and is
the natural next News theme, `base` after it.

**Two template notes from Day 17 (both still unfixed in `assets/`):**
1. **`cover.template.html` leaks text onto the page.** Its header comment contains a literal
   `<!--EDIT-->`, whose `-->` closes the comment early, so the rest of the sentence renders as
   body copy above the frame. Fix in the working copy by rewriting that header comment (or
   delete it) before rendering the cover.
2. **`crest` needs shorter rule lines than the other themes.** At 88px caps, scene D wraps at
   about 15 characters per line; `You do not need AI. / You need a faster reply.` orphaned
   "AI." and "REPLY." onto their own lines. `qa_layout.sh` passes this (nothing overlaps or
   leaves frame) — only the eyeball pass catches it. Keep crest D lines to ~15 chars.

**No day number or date on any post graphic (AC, 2026-07-30).** The page is not a numbered
series. `cover.template.html` no longer ships the day pill and the kicker row now centres on
the pillar alone; the `.newpill` style stays for a genuine one-off flag (NEW, FREE) and is
unused by default. Day numbers in THIS log are internal rotation bookkeeping and never reach
a frame. A cited source date inside a stat line is a citation, not a post date, and is fine.

**QA extended 2026-07-30 - `qa_layout.sh` now takes MP4s as well as HTML.** Gates 1-2 only
ever saw one frozen scene, so nothing about the *cut* was being checked. New
`scripts/audit_motion.py` adds three timeline gates, wired into `produce.sh` after the
build (`QA_ARGS` passes flags through):
- **Gate 3 - architecture change** in 2.6-3.6s. Compares a coarse layout signature either
  side of the cut. Validated both ways: the reference reel scores **grid 0.673** at 3.10s;
  a synthetic text-only swap inside the same layout scores **0.002**. The 0.12 threshold
  sits in a very wide gap, so this is not a delicate measurement.
- **Gate 4 - motion floor**, 1.0s, via ffmpeg `freezedetect`. Default calibrated against
  the reference reel, whose longest title-card hold is **0.83s** - at 0.8s it flagged that
  deliberate hold, at 1.0s it passes clean. Measures *global* motion, so a small moving
  element in a large frame will not rescue an otherwise static shot. That is intended.
- **Gate 5 - cut budget** (duration / 1.9) plus a count of cuts inside the first 3s. Warns
  by default, `--strict-cuts` to enforce. Note the reference reel scores 20 cuts against a
  budget of 23 - 1.9s/cut is the **faceless** target; 2.19s is what a face-led reel gets
  away with. Do not read its WARN as a defect in that video.

`--calibrate` measures without failing. Run it on a render AC already likes before trusting
these thresholds on his own look - they were tuned on someone else's reel.

**Gold-on-gold is invisible to the audit.** In `column`, scene B's `to` chip and scene C's news
chip sit near the fold; both resolve correctly (the chip inverts to black-on-gold, the stamp
lands below the fold) but neither is visible at the audit's 0.55*dur sample. Check scene B at
~+2.0s and scene C at ~+2.3s from scene start, not at the midpoint.

**Prompt Drop born 2026-07-31 (Day 18).** The page's only *instrument* format: cover +
3 to 5 copy-paste prompts + close, Saturdays. Pack 01 shipped at five. Spec in `references/prompt-drop.md`. **AC picked `card`** from the 3-way render; `terminal` and `ledger` stay built,
audited and selectable via `CONFIG.card` for future packs.
Three real bugs the new `qa_deck.js` caught that eyeballing one slide would have missed:
the quote glyph's opaque notch pad ate the first word of the prompt; the ledger numeral
collided with any title longer than two words; the same numeral hung 26px off the canvas
(absolute children offset from #pbody's PADDING BOX, which is the full 1080 wide, so
`right:-26px` is 26px off-canvas, not 86px inside the gutter).
**Keyword CTAs need the asset ready before posting, as ONE message.** AC answers DMs
by hand, so his standing rule is that a keyword gate promises a pasteable one-message
artifact, never a list. Five prompts is a list - resolved by writing `dm_reply.txt`,
a single ~1,850-character DM containing all five. Build that file before the post
goes up, every pack.

**`gear` icon reads as a SUN — deck engine, found Day 19 (2026-08-03).** In `deck.template.html`'s
`ICONS` map, `gear` is a 14px-radius circle plus eight radiating ticks. At the engine's 5px stroke
and 172px render size the teeth read as rays, so the glyph is a brightness/sun icon, not a gear.
It shipped onto a slide about task coverage and meant nothing until it was eyeballed. `qa_deck.js`
passes it — the audit measures ink position and overlap, never semantics. **Use `calendar` for
task/coverage beats until the path is redrawn.** Whoever fixes it: real gear teeth need trapezoids
around the rim, not line segments radiating from the centre.

**`ac-week` batching went live 2026-08-02 (week of 3–9 Aug).** Five planned slots plus two reserved,
board delivered as one scannable HTML page. Two things worth carrying forward:
1. **Deep verification changed the story, twice.** The Monday brief's framing was wrong (see Day 19)
   and a Tool of the Day candidate died outright: the Gemini free-video window's only source was a
   login-walled X post, absent from Google's product page, help centre AND release notes — where the
   release notes had been updated *after* the announcement date. A candidate that survives a shortlist
   can still fail gate 1 under a full-text check. Budget for that.
2. **AC switched format at production time** (reel → carousel) after approving the slot on the board.
   The board's story, sources, read, hooks, send target and comment device all survived the switch
   unchanged — which is the argument for the board carrying those fields independently of format.

**Three defects the Day 19b art rebuild exposed, all worth keeping.**
1. **Reading order.** The default stack is icon -> headline -> sub, so an art slide showed the
   reader the CHART BEFORE THE CLAIM it proves. Art slides now run kicker -> headline -> art ->
   sub via `order` on `#stage.has-art`. That works only because `#zoneA`/`#zoneB` are
   `display:contents` outside COLUMN.
2. **A 4px overlap `qa_deck.js` caught and no eyeball would have.** Reordering removed the 46px
   top margin `#iconwrap` had been holding between kicker and headline; they overlapped by 4px
   across all five slides. The gap is now restated on `.word`. This is the second time that
   auditor has paid for itself.
3. **COLUMN put the art on the gold half and the audit passed it anyway.** Every gold bar and
   gold dot went gold-on-gold and became invisible while the gate reported CLEAN, because
   nothing overlapped and nothing left the frame. Fixed with a full inversion block
   (`#stage.t-column` art -> `--ink`). **The audit measures position, never legibility or
   meaning** — same blind spot that let the sun-shaped `gear` icon ship on Day 19. Eyeball
   every theme you might switch to, not just the one you are shipping.

**Third-party logos, standing decision (2026-08-02).** Source marks are drawn in the page's own
language: a plain four-point spark for Gemini, "Google" set in Poppins, both gold, in a hairline
chip. NOT the four-colour corporate logos, which would put a second and third accent on a slide
whose whole law is one gold idea on flat black. Attribution, not brand artwork. AC was told and
can override.

**Gate 4 has a story-shaped failure mode: SMALL HERO NUMBERS (Day 20, 2026-08-03).**
`sceneAnim` runs the odometer on a FIXED window — `eExpo((lt-0.5)/1.0)`, i.e. 0.5s to 1.5s
into the scene — regardless of the value. A hero number of `3` or `4` reaches its final digit
almost immediately and changes a handful of pixels in a 1080x1920 frame, so `freezedetect`
(which measures GLOBAL motion) reads the scene as static and gate 4 fails. `$725B`, `66%` and
`141,006` churn ink on nearly every frame and pass comfortably.

Day 20 hit this twice (scene A on `3`, scene C on `4`) and needed three builds:
1. A fixed by moving `141,006` into it — confirmed the diagnosis.
2. C and D still failed. **D has no odometer at all** — its copy was so short (`Not the AI.` /
   `The access.`) that the entrance animation settled with 1.0s of scene left. Lengthening
   `rule.sub` fixed it. Short rule copy is its own freeze risk.
3. Final structure: A keeps `3` (matches the headline) with a long dense label, C carries
   `141,006` where the "test runs reviewed" label makes the figure unmisreadable.

**Practical rule: give scene A and scene C a 4+ digit figure where the story has one, and if it
does not, lengthen the labels.** A story with only one big number will fight this engine.

**Retimed 24s cuts are VO-ONLY. Do not post one silent.** Day 20's 24s failed gate 3
(architecture change is measured in a hardcoded 2.6-3.6s window, but at 24s the first scene
change is at 5.2s) and gate 4 with six static windows up to 2.90s. Neither is a defect:
`variants.md` says a stretched scene "simply holds its composed frame, which is what a VO-paced
cut wants", and the voice is what fills the hold. But the gates cannot know a VO is coming, so
**a silent 24s post would genuinely be too static.** Log says it, gates cannot.

**Reel LENGTH is a reach lever nobody had measured here (Socialinsider, 140,000 Reels,
Jan-Jun 2026).** Reach rate by length: **under 30s = 5.20%, 30-60s = 5.60% (peak)**, 60-90s =
5.30%, 90-120s = 4.30%, over 120s = 3.50%. The 11.7s News cut sits in the WEAKEST band; the
31.6s TOD sits exactly on the peak. That is a second, independent explanation for the TOD's
3.4x outperformance beyond format quality. Worth pushing News cuts toward 30s.

**Biggest documented lever at this account size, still unused: TAG THE COMPANY.** For accounts
under 2,000 followers a mention is worth **+108% reach and +167% comments** (Metricool, 24.4M
posts, Jun 2026). Days 15-17 and 19 named Bluevine, Microsoft, Meta and Google and tagged none
of them. Same study: comment-focused CTA +202.78% comments, question in caption +36.70%, save
CTA +92% saves, and asking for likes **-4.9%**. Full evidence review with conflicts flagged in
`POSTING_FREQUENCY.md` (delivered 2026-08-03).

**Cover template note (Day 20).** `.idea .l` ships at **112px**, which is tuned for short
lines like "Describe it." A 17-character gold line ("3 real companies.") wrapped and split the
noun phrase across two lines — fine full-size, bad at grid-thumbnail size, which is the only
size a cover is actually judged at. **Dropped to 94px in the working copy and it fits on one
line.** Rule of thumb: over ~14 characters on either idea line, come down to 94-100px and
re-check. The header-comment leak bug from Day 17 is confirmed FIXED in the shipped template —
a leak check (text rendering outside `#stage`) returned 0.

**Day 20 hashtags shipped:** `#AIsafety #AIagents #AInews #SmallBusinessTips #AIforBusiness`.
Only `#AInews` repeats from Day 19, deliberately — it is the lane anchor. Worth knowing when
picking future sets: Metricool (24.4M posts, Jun 2026) found posts carrying at least one
hashtag ran **-31.70% views and -33.89% interactions** against the platform average. That is
correlational and they say so, but it is the second study in a row pointing the same way. The
brand law is still 5 tags; if a hashtag-free test is ever wanted, run it as a deliberate A/B on
two comparable posts rather than quietly dropping them.


---

## Day 22c (2026-08-06) — AC caught a contrast defect in playback. Root cause is a template bug.

**AC flagged it from QuickTime: scene D's `rule.sub` was stone-grey on the gold field, near
invisible.** Both rebuilt cuts now carry the fix. Chain of causes, each worth keeping:

1. **No gate measures contrast.** Gates 1-2 check geometry (bounds, ink overlap); gates 3-5
   check the timeline. Stone-on-gold is geometrically perfect and invisible. Sixth defect in
   six runs caught by a human eye after the audits passed CLEAN.
2. **The `.onGold` midpoint classifier cannot handle straddling elements.** Column theme
   assigns black-accent styling at load to any element whose box MIDPOINT sits above the
   gold/black boundary. Scene D's sub straddles it; midpoint fell below; it kept dark-field
   stone while rendering mostly on gold.
3. **The real killer: column's gold field MOVES during scene D.** First fix (black, to match
   the headline's onGold treatment) failed the other way — at 17.6s the sub sits on BLACK and
   black text vanished. The boundary sweeps downward through the scene, so the sub sits on
   black early and gold late. **No static dark-or-stone choice can survive a straddle on a
   moving field.** A load-time position classifier is wrong by construction there.
4. **The fix that works on both fields: white + soft dark shadow.**
   `color:#FFFFFF; text-shadow:0 1px 3px rgba(10,10,10,.55), 0 2px 18px rgba(10,10,10,.35)`,
   and the `.gold` span inside goes solid white bold (gradient gold-on-gold is invisible).
   Verified at 16.0 / 17.6 / 19.4s and in the encoded MP4.

**Standing rules from this:**
- **Under `column`, any element that can straddle or be swept by the gold boundary uses white
  + shadow, never stone and never a load-time onGold guess.** Scene D's sub is the known case.
- **Eyeball EVERY scene, not a sample.** This run checked A and C and skipped D; AC found D.
- The eyeball checklist gains a line: **check text contrast against the field UNDER it, at the
  scene's START and END, not just at the midpoint** — a moving field makes one-frame checks lie.

Process note: eyeball checks on this engine must render through `render_frames.js <html> qa
"<times>"` — the outdir must be literally `qa` (third confirmation of that trap).

Both cuts (plain + SPINE), all six files, rebuilt with the fix. Gates 3+4 failed identically
to the pre-fix builds, as expected for a 24s retime.

---

## Day 23 (2026-08-06) — Spine reel built as a permanent third engine, from three screenshots.

AC sent three screenshots of an earlier working copy (never persisted — lost with its
session) flagging two defects: a headline's second line overlapping the first / the spine
hairline cutting through body text, and white (`#F4F0E7`) text in two spots ("HIRES" chip,
a bold aside) where the palette should hold to black ink, stone grey, and gold. Content
recovered from the screenshots: a 43%-revenue-up stat, a CUTS→HIRES hiring-shift beat, and
a "don't take the number, take one job and test it" rule beat — reads like a Day-in-progress
about AI's effect on hiring/revenue. AC's copy for those three carried over verbatim into
the new `assets/spine.template.html`; the other two beats (proof, CTA) ship as neutral
placeholder copy — no invented stat.

**Root-cause read, not just a patch:** the old defect wasn't really "a line in the wrong
place" — it was that the engine had no place a line was GUARANTEED not to be. Two fixes,
both structural rather than a coordinate tweak:
1. **The gold/black fold is now FIXED (640px), not content-measured.** COLUMN's dynamic
   gap-finder is right for a kicker+icon stack; Spine's gold zone carries a full headline,
   and a boundary that moves with copy length is only as safe as the copy it was tested
   with. Fixed + stress-tested with real copy (per `qa-audit.md`) closes the failure mode
   instead of chasing it.
2. **The spine is a fixed, reserved 380px band, not a per-slide hand-tuned hairline.** The
   old `carousel-spine.template.html` hairline needed `exit[n] === entry[n+1]` kept in sync
   by hand across a `GEO` array — exactly the kind of law that only holds until someone
   edits copy and forgets the pair. New version: five nodes on a fixed lane that never
   depends on scene content at all. Nothing to keep in sync, nothing for a hairline to
   drift into.

**A real bug the audit caught, not just eyeballing:** the first version eased the spine
nodes with a CSS `transition`. `qa_layout.sh` gate 2 flagged phantom ink overlaps between
wrapper elements that share no content — turned out to be the node still mid-transition
when the next per-element screenshot fired, a few hundred ms later in wall-clock time.
Root cause: this engine is rendered by calling `seek(t)` and screenshotting out of real
time, so **anything keyed to wall-clock time instead of `t` is a bug**, even where it looks
fine live in a browser. Removed the transition; nodes snap to state instantly inside
`spineTick()`. Worth remembering for any future animated element here: eased motion has to
be computed FROM `t` inside `seek()`, never left to CSS.

**Both qa_layout.sh gates ran CLEAN** (bounds + ≥18px glyph-ink clearance) across the full
11.4s timeline after the fix, not just at the five settle frames. Full writeup, the CONTENT
shape, and the timing rule this build had to learn (finish every entrance animation before
`start + dur*0.55`, or the standard settle-frame QA convention catches it mid-fade):
`references/spine-reel.md`.

**Standing rule from this:** the old `spine_reel.prototype.html` in the retired `ac-design`
skill is superseded — do not build on it again. Its geometry law (hand-synced entry/exit
Y per slide) is the exact bug class this rebuild exists to remove.

Theme: n/a (Spine is a fixed identity, not theme-rotated). Files: `assets/spine.template.html`,
`references/spine-reel.md`. Metrics: —.

### Day 23, second pass (same day) — AC test-posted and the APP FRAME rejected the layout.

AC uploaded a test cut and sent the Reels-player screenshot back. Nothing overlapped in
the file; the APP covered it: the bottom typed caption sat inside IG's username/music/
caption block (the post's own caption text ran straight over the `@ITSAC.AI` watermark),
and the fifth spine node sat under the like/comment/share rail. **A frame that passes
every geometry gate can still be unreadable in the player — the gates check the file, not
the app.** Measured the chrome off his screenshot and rebuilt the vertical layout around
an explicit safe window (top y>170 · bottom y<1300 · right x<930 below mid-frame):

- Typed caption moved from the bottom band to DIRECTLY UNDER THE FOLD (`top:684`) — the
  one line the app never covers, proven by AC's own post (its loop line sat exactly there
  and read perfectly). Deliberate override of `subtitles.md`'s column-fold default.
- Spine lane 1560→1180–1260; nodes end at x=870 so none sit under the rail; only the
  decorative exit line continues right. Node/arc styling now matches the posted reel
  (ring-and-dot nodes, arc bumps, segments turn gold as beats pass).
- Bottom ~620px deliberately empty black — the app fills it. Compose for the app.
- Scene C filled with copy DERIVED from AC's own A-caption pair (2% decreased — no new
  figure invented; AC confirms before real ship). Scene E rebuilt to match the posted CTA:
  circled AC monogram + handle + tagline, all inside the safe window.
- Verification now includes an OVERLAY CHECK: red-box composite of the three chrome zones
  onto all five settle frames, read frame by frame. Gates 1+2 CLEAN again after the move.

**Standing rule:** on this engine, safe-window placement is part of layout QA. Any element
that must be read lives inside (170 < y < 1300, and x < 930 in the lower half). The
overlay check ships with every Spine run until a gate automates it.

---

## Day 29f (2026-08-13) — the figure is animated: two-bone rig, gesture timeline, talking mouth.

AC's brief: more animation, talking, hand gestures, pauses, synced to his VO. Asked me to
work as an animator and interview him on what else to add. His answers: **script-timed now
and upgrade when he sends a recording · two-state open/close mouth · conversational energy
· head turns to the numbers + beat-matched reactions + breathing throughout.**

**The honest constraint, stated up front:** AC records VO separately over the `_silent`
cut, so nothing here can sync to his actual voice today. This is keyed to the beat sheet's
VO timecodes, which is what he reads to. `SPEECH[]` holds those windows; swapping in
measured intervals from a real recording is the only change needed for true sync.

### The rig

Arms are now **two-bone**: the upper bone is drawn along +x from the shoulder and rotated
by S, the forearm pivots at the elbow and is rotated by E. A gesture became a pair of
angles instead of a redrawn path, which is what makes poses interpolatable. Named hooks:
`#f-body #f-head #f-mouth #f-armL #f-armR`. Pose sheet in `assets/figure/ac-pose-rig.html`
— eight poses drawn and eyeballed BEFORE any timeline work, which caught the angle tuning
cheaply.

`POSES`: rest/akimbo · wave · shrug · point · palms · palms2 · cut.
`GEST[]` is the keyframe track — `{t: the moment the pose is REACHED, p, h}` — and he
HOLDS between keys. Gestures arrive on `easeOutBack` (a small overshoot, so they pop);
returns to rest use `easeInOutCubic` (so they settle). Head rotation always eases
independently of the arms, which is overlapping action — arms and head moving in lockstep
is the single clearest tell of amateur character animation.

Mouth is two-state, and only moves inside a `SPEECH[]` window. The open/close oscillator is
a sum of three primes-ish sines so it reads as syllables rather than a metronome — and it
is still a pure function of t.

### The finding: a hold is never frozen, and gate 4 proves it

AC asked for pauses. Gate 4 forbids anything static beyond 1.0s. Those are in direct
tension, and the resolution is the oldest rule in character animation: **a moving hold.**

The long "you are not bad at this" palms beat (7.90 → 9.35) failed gate 4 twice:
1.03s static at 8.40s, then **1.00s** at 8.37s after a first, too-timid settle keyframe
(6 degrees of arm rotation moves almost no ink — measured, not guessed). It passed only
once the settle became a real one: ~11 degrees on every joint PLUS a head nod. **The head
is by far the largest ink on the figure, so it buys more motion per degree than any limb** —
worth remembering as the cheapest fix whenever a beat runs long.

Final state: gates 1, 2, 6 CLEAN · gate 3 PASS · **gate 4 PASS** · gate 5 WARN as always.

### Gesture map shipped

A 0.55 dismissive wave on "none of them worked", then turns to watch 650 count · B 3.00
shrug on "the only human help was encouragement" · C 5.40 head to the 30, 5.85 point, 6.50
flat cut-off on "got nowhere" · D 7.90 open palms, the reassurance pose, with the 8.55
settle and 9.05 release · E 10.00 points at the handle.

Files: `AC_News_Day29_650-ideas_ANIM_subs / clean / _silent` (11.7s). Supersede all earlier
Day 29 cuts. Cover, VO PDF, beatsheet, caption unchanged.

**Open for the next pass:** AC sends a recorded VO, `SPEECH[]` gets measured intervals, and
the mouth plus gesture triggers move onto his real emphasis and pauses.

---

## Day 29e (2026-08-13) — NARRATOR MODE: the figure talks through the whole reel.

AC asked for the figure present and talking across the entire video, not just the sign-off.

**The design.** He is now a PERSISTENT sibling of the scenes — he never fades between cuts
— standing in the subtitle band, and **the typed subtitle became his speech**: it shifts
right of him and left-aligns, so every line in the reel is him saying it. His mouth caret
is driven by the real subtitle clock inside `subTick()`: lit while the line types, resting
at 0.34 between lines. He talks for all 11.7s using copy that already existed and was
already gated. No new words, no new QA surface.

The subtitle band was chosen because it is **the one horizontal lane no scene's content
enters** (crest's scene box starts at y400; the band sits at y288-495). Putting him beside
the scene copy would have forced every headline in every theme to re-wrap.

### Two real bugs I introduced, both caught by gates, both worth remembering

**1. A CSS transition on the caret broke frame determinism.** I gave `.fcar` a
`transition:opacity .08s linear` so the mouth would ease. The ink gate immediately threw
**10 false overlaps in scene A** — every element against every other. Cause: the gate
seeks to one time then takes N screenshots (a reference plus one per isolated element),
and a CSS transition means the page keeps changing between those shots, so the caret's
moving pixels get attributed to every element. **This engine's rendering must be a pure
function of seek(t).** No CSS transitions or keyframe animations anywhere in the frame —
they break the gate AND make the video render non-deterministic. Law added at the CSS site.

**2. Left-aligning the subtitle silently removed motion and gate 4 failed.** A centered
line RE-CENTERS on every typed character, so the whole string shifts left continuously —
that shimmer was quietly carrying scene C's quiet stretch. Left-aligned, only the last
glyph changes, and a **1.07s static window appeared at 5.43s**. Fix: a deterministic idle
bob on the narrator, `translateY(sin(t*4.49)*10)` — pure function of t, ~10px over 1.4s.
Gate 4 back to PASS. It also fixes a design problem: a frozen figure on screen for 11.7s
reads as a sticker, not a presence.

**This is the Day 29 finding proven twice over: the News engine's motion budget is
copy-and-composition dependent.** A layout choice with no motion intent removed enough
shimmer to fail the floor, and a 10px bob restored it.

### State

Gates on the shipped cut: 1, 2, 6 CLEAN · gate 3 PASS · **gate 4 PASS** · gate 5 WARN.
Verified across themes with the figure on: `base` CLEAN, `margin` CLEAN, `crest` CLEAN.
`column` reports two violations **which are pre-existing and unrelated** — confirmed by
running column with FIGURE off and getting the identical output (the y1811 watermark and
the caption band, both logged unfixed since Day 24).

`FIGURE` still defaults `'off'`; narrator mode is what `'on'` now means. The scene-E-only
placement is retired — he is either absent or he narrates.

Files: `AC_News_Day29_650-ideas_NARRATOR_subs / clean / _silent` (11.7s). These supersede
both earlier Day 29 cuts. Cover, VO PDF, beatsheet and caption unchanged and still valid.

---

## Day 29d (2026-08-13) — the figure's first shipped video.

AC asked for today's reel rebuilt with the mark in it. Rather than patching the shipped
working copy, Day 29's `CONTENT` and `SUBS` were ported onto the CURRENT template, so the
rebuild inherits every engine change made after the first build (canonical figure, final
stroke weights, the corrected scene-E placement). Worth repeating as a pattern: **when the
engine has moved, re-port the content forward rather than back-patching the old copy.**

`FIGURE='on'` · `THEME='crest'`. All gates re-run with the figure present: 1, 2 and 6
CLEAN; **gate 3 PASS, gate 4 PASS**, gate 5 WARN as always. Figure verified on the encoded
MP4, not just the HTML — it survives compression cleanly at 196px, shades and caret both
legible.

Files: `AC_News_Day29_650-ideas_FIG_subs / clean / _silent` (11.7s). These SUPERSEDE the
morning's figure-less cuts. Cover, VO PDF, beatsheet and caption are unchanged and still
valid.

**Honest note on presence:** scene E runs 9.6–11.4s, so he is on screen ~1.8s of 11.7s,
about 15% of the reel. That is a signature placement by design (he stays out of A–D so the
payoff and the numbers own the frame), but it is thin for *establishing* a character.
Second placement worth testing when AC wants more: **scene D**, where "You are not bad at
this" lands — the emotional beat is the one where a narrator earns his keep. Not done
unilaterally; scene D's sub already had a gate-6 near-miss this run and expanding the
figure's footprint is a brand decision, not a build decision.

---

## Day 29c (2026-08-13, same day) — the mark is finalised, by interview.

AC flipped the direction and asked to be interviewed on the finishing touches. The
answers, now canon: **akimbo pose with the 5-degree head tilt** (the wry one) · **watch
CUT** ("looks too out" — right call; two accessories read as costume, and nothing on the
body should compete with the face) · **polo collar stays, with the button dot** — the only
body detail · **one raised brow above the right lens** — the sceptic's face · **no feet
ticks** (offered, declined, veto thumbnail shown) · **7.2px poster-cut stroke** over the
6px elegant cut (feed presence beats delicacy on a phone screen) · **no name — he IS AC,
captions say "me"** · **presence is scene-dependent**: small beside the scene-E CTA daily,
full-height hero moments allowed per run.

Two drawing lessons banked during the pass, both the same species: **a detail that needs a
second look is a defect.** The armless one-bar shades read as a visor (v2 finding, held),
and the first brow merged with the head rim and read as a hair flick — caught by reading
the render, fixed by shortening the arc and pulling it clear of the rim.

Engine: `FIGURE` is now `'off' | 'on'` with the single canonical drawing (the two
exploration poses are retired to `assets/figure/`). Default stays `'off'`, opt-in per run.
Gates clean with the figure on. Standalone `ac-mark.svg` exported for use outside the
engines. Still owed: the art-block system (charts in News scenes) — Day 30.

---

## Day 29b (2026-08-13, same day) — cover shipped broken, the AC figure is born.

**AC caught the Day 29 cover defective in the delivered files.** Two faults: the kicker
read "Tool of the Day" on an AI News post (the template default was never edited), and
the 112px headline — sized for two-word lines like "Describe it." — wrapped both
sentences and flowed straight into the absolutely-positioned support block at y1046,
printing "you." through the support text. Root cause of the second: step 8 says render
AND READ the cover; the render happened, the read did not. Fixed (kicker → AI News,
headline 80px for sentence-length lines), re-rendered, and read this time. **Covers have
no QA gate — the eyeball IS the gate, and skipping it shipped a broken frame the same
week gate 6 was being praised. Open item: a minimal cover ink-overlap check.**

**The AC figure v2 shipped and is in the engine.** v1 finding held: one-bar shades
without temple arms read as a visor. v2 draws two lenses at eye level spanning ~60% of
the head WITH temple arms to the rim (the arms are what make glasses read as glasses),
plus a watch with face, crown and band ticks. Caret mouth unchanged — he does not speak,
he types. Two poses drawn: **presenter** (arm raised toward the content — AC's pick as
the canonical pose) and **standing** (hands down, collar hint). Both survive 140px.

**Engine: `FIGURE` constant in `reel.template.html`** ('off' | 'presenter' | 'standing'),
default **'off' — AC chose opt-in per run**, not a standing element. Scene E only,
beside the CTA cluster at left:118/top:34% where it clears the wide tagline row (first
placement at top:44% collided with the kicker and loopline — gates 1+2 caught it,
fixed before ship). Enters via the standard data-a machinery so seek(t) stays
deterministic; light look maps strokes to ink via `--figstroke`. Figure source sheet in
`assets/figure/`. Caret is static; a seek-driven blink is future work.

Also still owed from this session: the reel ART-BLOCK system (charts in News scenes —
the 60-agent breakdown chart exists as a draft in `assets/figure/` context) — Day 30.

---

## Day 29 (2026-08-13) — gate 4 PASSED on the News engine, and that is a finding.

I predicted gate 4 would fail. Day 26 logged four static stretches over 1.0s on this exact
engine, and Day 27 established that TOD's motion debt is structural — small elements
animating on a still black field sit below `freezedetect`'s -50dB floor no matter how you
respace them.

**The News reel passed it clean.** Same engine class, same detector, same threshold.

The difference is scene length and beat density. News scenes run 2.2–2.7s against TOD's
2.9–4.5s, and this reel's copy put a moving element in every single scene — a counting
odometer in A, an animated toggle in B, a second counter plus a stamped chip in C, a
two-line rise in D, the loop in E. Nothing was left to sit.

**So the News engine's motion debt is copy-dependent, not structural.** That is genuinely
different from TOD, where the problem is the moment map itself. A News reel that fails
gate 4 is a writing problem and can be fixed in the beat sheet; a TOD that fails it needs
the design pass that is still open. Worth knowing before anyone spends a session retiming
the News engine for nothing.

### Gate 6 caught what gates 1 and 2 waved through, again

Scene D's sub originally read "This is what it actually looks like. Comment GAVE UP or
KEPT GOING." — it wrapped to x=950, under the Instagram action rail, across 8 frames.
Gates 1 and 2 both returned CLEAN, because neither knows the player draws chrome over the
file. Shortened to just the binary and it cleared.

That is the fourth time a geometry gate has passed something the app would have broken.
Gate 6 is now the most valuable of the six.

### The story, and the one comment risk

The reframe is the process rather than the result: 650 dead ends, 30 of 60 subagents
producing nothing, and a non-mathematician typing "keep going." If the most impressive AI
run of the year looked like that, a viewer's prompt failing first try is not evidence they
are bad at this.

**Single biggest risk is a comment-section misreading that it "solved" the Riemann
hypothesis.** It did not, Anthropic say they do not expect the method to get there, and
the word appears nowhere in the deliverables. The posting note says to correct that
warmly and immediately if it shows up, because letting it stand would undo the page's
whole anti-hype position.

### Theme rotation is now genuinely constrained

crest repeats Day 27 and the freshness row is dinged for it. The usable set for a News
reel is down to **two**: `column` is still unfixed (caption at y1666, logged Day 24) and
`base`'s floor bar still sits in the covered bottom 26px. AC has now declined the base bar
fix twice. Either it gets fixed or News reels alternate crest/margin indefinitely.

### Also — the AC figure was commissioned this run

AC asked for a stick-figure narrator that "talks". Three directions were rendered; he
picked **caret mouth** — no face, a blinking gold caret where the mouth would be, reusing
the caret already in the typed subtitles and the TOD prompt bar. He does not speak, he
types. Then asked for a retouch with sunglasses and a watch. Honest result of that pass:
the two-lens version (retouch A) works and survives 140px; **the one-bar versions read as
a visor or headband rather than sunglasses**, because the bar spans the full head width
and sits too high. Not shipped. Figure and the reel art-block system land Day 30.

---

## Day 28 (2026-08-12) — the tool lane came up empty and that became the post.

The morning shortlist swept the tool lane properly and rejected everything, opening both
serious candidates on their own vendor pages. Its own framing: **"this is a finding, not a
gap."** AC asked for a fresh hunt anyway. Worth recording what that returned, because it
validates the brief rather than beating it:

- **ChatGPT unlimited free text chats + Think button — KILLED.** OpenAI announced it 6 Aug
  with "starting next week." Their release notes carry entries dated 7 Aug and 10 Aug and
  **none of them confirms the rollout**, so the claim is still future tense. Day 26 set the
  rule that this cannot post until verified live. It does not clear.
- **Meridian QuickBooks Connector** (free MCP, launched 11 Aug) — real and strong, but it is
  an MCP-connector story one day after Day 27's Trello MCP. Same shape twice running.
- **RotaPlanner** (free forever to 10 staff, full AI scheduling, no card, verified on their
  own page) — genuine, but a small vendor and only fits shift-based businesses.
- **NotebookLM / Gemini Notebook** — free tier fully verified on Google's own help page
  (100 notebooks, 50 sources, 50 chats/day, 3 audio + 3 video overviews/day, every feature
  included, only volume capped). Not news, and it carries real criticism about grounding
  regressions after the Feb 2026 Gemini 3.1 migration.

So the run came back to the board, which is where AC pointed it.

### The post

The Tool of the Day pillar carries a **method** today rather than a product, and that is the
first time. Three checks, about 30 seconds each: read the pricing page not the homepage; a
trial is a countdown; find the ghost tier. The anchor case is real and verified — a tool
that still headlines itself the number one *free* AI phone agent while its pricing page
lists only $24 and $99, and whose paid plan cards still say "Everything in <X> free" for a
tier that no longer exists. **That leftover sentence is the whole post.**

**The company is deliberately unnamed**, per the brief's standing risk flag: naming a small
vendor as bait-and-switch invites a complaint and is not worth it. Run it as a rule. The
caption also states plainly that nothing here alleges illegality — the homepage and the
pricing page simply disagree, and only one of them is binding.

### Why this is worth repeating

The tool lane will come up empty again; this morning is evidence of how often "free" does
not survive its own pricing page. This format is the answer for those days, and it is more
on-brand than any tool would have been — the page exists to be the antidote to hype, and
this is the page doing the checking in public and showing its work.

Honest scorecard note: 9/10, not 10. The recency row is soft — the sweep happened this
morning but the underlying free-tier withdrawal is months old.

### Also

`base` returns for the first time since Day 15. Its known defect (the floor bar sitting in
the bottom 26px the Instagram player covers) is **reel-only** — on a 1080x1350 carousel the
bar is fully visible and fills across the five slides, which is exactly what the theme is
supposed to do. Worth remembering when rotating themes for decks vs reels: they do not
share the same constraint.

---

## Day 27 (2026-08-11) — the TOD engine retimed. Gate 3 fixed, gate 4 halved, gate 5 judged not worth passing.

AC asked for the format itself to be fixed, not just the video. This is that pass.

### What Day 24 left behind, and what was actually wrong

Day 24 logged three gate failures on this engine and called the motion one "the top open
defect." It also fixed "frame one is black" — but only halfway, and that is the finding
that matters most here.

**Frame 0 was non-black but still empty.** Day 24 wired `#A .kicker` and
`#A .promptbar[data-live]` live at t=0. The prompt bar is live but its text TYPES IN, so at
frame 0 it is an empty box, and the headline `.h1` elements were still ordinary `.el`
animating at **3.0s and 3.28s**. So every Tool of the Day since Day 24 has opened on a gold
search box and the words "Tool of the Day," with the actual claim arriving three seconds
later. Non-black is not the same as loud. `#A .h1` now joins the live set. Verified on the
encoded MP4, not just the HTML.

### The retime

The root cause of the motion debt was structural and simple once measured: **every scene
front-loaded all its motion and then sat still for the last 1.4-3.2 seconds.** Scene
durations had been set by VO pacing, not by motion density. Summed, that dead tail was
roughly 15s of a 31.6s runtime.

Each duration is now (last beat + a short tail), and scene A is cut to 3.40s specifically so
the A->B transition lands inside gate 3's 2.6-3.6s window.

| | old | new |
|---|---|---|
| A | 0.00 (5.00) | 0.00 (3.40) |
| B | 4.85 (4.15) | 3.25 (3.45) |
| C | 8.85 (3.95) | 6.55 (3.30) |
| D | 12.65 (4.85) | 9.70 (3.20) |
| E | 17.35 (6.65) | 12.75 (4.50) |
| F | 23.85 (3.45) | 17.10 (2.90) |
| G | 27.15 (4.05) | 19.75 (3.30) |
| **total** | **31.6s** | **23.4s** |

Intra-scene beats moved too: scene A's card build pulled forward to 1.25 (it was waiting for
the typing to finish), C's four cards respread from 0.35s to 0.55s apart, E's three steps
from 1.70s to 1.10s apart, D's caption moved late to 1.95, B's stamp pulled in to 2.15.

**`tod_audio.py` is remapped to match, and the deltas are PER SCENE, not one constant:**
A 0.00 · B -1.60 · C -2.30 · D -2.95 · E -4.60 · F -6.75 · G -7.40. `DUR` 31.6 -> 23.5.
Scene C's pops and scene E's step cues were additionally respread to follow the new visual
stagger. Change one file without the other and the sound desyncs.

### Results, measured on the encoded MP4

- **Gate 3 · FAIL -> PASS.** Was 0.005 against a 0.120 threshold, because scene A ran
  0-5.0s and no cut could ever land in the window. Now the strongest change sits at
  **3.30s**, row-decorrelation **0.342** against 0.150 needed.
- **Gate 4 · still FAIL, but roughly halved.** Was 10 stretches, longest 2.23s, ~15s total.
  Now **7 stretches, longest 1.27s, 8.37s total** — longest stretch down 43%.
- **Gate 5 · WARN, unchanged.** 0 cuts, because TOD cross-fades and a cross-fade is not a
  cut. Left alone deliberately: the budget wants ~12 cuts in 23.4s, and cutting this format
  twelve times would destroy the calm that is the whole point of it. Reported, not chased.
- Runtime is **26% shorter**, which helps completion rate directly.

### Why gate 4 cannot be finished by retiming, and what it would actually take

This is the useful finding. Gate 4 is `ffmpeg freezedetect=n=-50dB:d=1.0`, which needs a
large-area frame change to register. **TOD's visual language is small elements animating on
a still black field, and almost none of them clear that bar:** character-by-character typing,
a 52px step icon sliding in, a single counter ticking. They are real motion that the detector
genuinely cannot see.

Proof from this run: tightening scene E's steps from 1.35s to 1.10s apart did NOT remove its
static window — it split one 1.37s stretch into three ~1.1s stretches. The stretch count went
6 -> 7 while the longest dropped 1.60s -> 1.27s. Respacing beats moves the gaps around; it
cannot close them, because the beats themselves are invisible to the gate.

So the remaining gap is a design decision, not a bug, and it needs AC:
1. **Ambient large-area motion** — a slow push-in or drift on the whole content block. Would
   pass the gate outright. Changes the format's stillness, which is currently part of the
   brand's "quiet luxury."
2. **A different transition language** — full-frame changes between every beat rather than
   small elements on a fixed field. Bigger redesign.
3. **Leave it and keep reporting it** — TOD is a slide-based explainer and the 1.0s floor was
   calibrated for a cut-driven reel.

Do NOT lower the threshold to make it green; Day 24 was right about that. The finding is now
characterised precisely enough to act on rather than just restated.

### Also from this run

- **The chart labels collided and BOTH scene gates passed it.** `oldSub` "Standard, per user"
  wrapped to two lines and printed straight through the "TRELLO AI" label above it. Gates 1
  and 2 sample each scene at one settle moment and the chart's labels land after it. Fixed by
  matching Trello's own wording, "per user/month". Third contrast/wrap-class defect in a row
  that a geometry gate has waved through — the eyeball pass is still doing real work.
- **The story got better from a pricing page.** The reel was going to be a plain "new free
  tool" until trello.com/pricing showed AI is a paid Trello feature and AI-GENERATED BOARDS
  is one of the paid rows. That turned it into a real contrarian beat: the free door does the
  headline paid job.
- **`render_frames.js` QA mode only triggers when the outdir argument is literally `qa`.**
  Passing any other name silently falls through to full-timeline capture and dumps ~700
  frames. Cost a wasted render and some disk. Worth a usage note in the script.
- Open, not applied: the hook could be "You talk. / Trello moves." — "the board" is ambiguous
  until scene B names Trello, which costs the hook an A- instead of an A. Offered at
  checkpoint; AC chose the engine work over the copy tweak, so it shipped as checkpointed.

---

## Day 25 (2026-08-08) — the COLUMN progress rail was invisible above the fold. Fixed in the engine.

Found by eyeballing the first render, not by any gate.

COLUMN is the only theme whose **ground changes colour halfway down the frame**, and its
progress block is a gold rail running the full height of that frame. Gold rail on the gold
half is gold-on-gold: invisible. So on every COLUMN deck ever built, the rail did not
appear at all until the deck was more than half over — on this 7-slide pack that meant
**no visible progress rail on slides 1 through 4.**

That is not cosmetic. Brand law says *"the progress indicator IS the theme's block"* — it
is the thing that makes COLUMN identifiable as COLUMN. For the first four slides the theme
was carrying its identity with nothing but the gold half and the display face.

**`qa_deck.js` passed it every single time.** The auditor measures ink position and overlap.
It has no concept of contrast, so an element that is perfectly placed and completely
unreadable scores identical to a correct one. Same blind-spot class as the Day 22c playback
defect, and the third time now that a contrast bug has walked straight through a geometry
gate. Worth considering a real contrast check in `qa_deck.js`; it is not built yet and the
eyeball is still the only thing catching these.

**The fix** applies the inversion law COLUMN *already* uses for its kicker, icon, ticks and
step counter: on gold ground the accent goes black. The rail is now ink above the fold and
gold below it.

The one non-obvious part: the gradient is keyed to the **frame** (`background-size:14px 1350px`,
anchored top-left) and NOT to the bar. The bar's height changes with progress, so a
percentage colour stop would slide the break around from slide to slide — the break has to
sit at 675px of the *frame* regardless of how full the rail is.

**Light COLUMN needed its own rule.** `.light.t-column` inverts the fold (black on top, gold
on bottom), and the generic `.light #block i` paints the whole rail ink — which is the same
bug mirrored, invisible on light's black top half. Both rules now ship. Audited clean in
dark and light, all three card styles.

### Also from this run

- **A widely-repeated stat died.** "80% of sales require 5 follow-ups, 44% give up after
  one" is unsourceable. Every citation chain ends at a marketing blog quoting another
  marketing blog. Anything in this topic area needs the same treatment — the follow-up
  niche is unusually full of laundered folklore.
- **Pack 02's capstone is structural, not rhetorical.** Prompt 05 ranks which of prompts
  01-04 to run, so "run the last one first" is a true instruction rather than the
  afterthought-patch it was on Pack 01.
- Open, not fixed: on a COLUMN *beat* slide the zoneA content centres in the gold half,
  while on a *prompt* slide it sits at the bottom of it. Reads slightly inconsistent
  across the deck. Left alone rather than redesigned mid-run.
- Open, not applied: slide 6's title "Who is waiting." is the only one of the five that
  is not a clean imperative. "Who's waiting." was proposed at checkpoint and not approved,
  so the copy shipped as checkpointed.


---

## Day 24 (2026-08-07) — three engine defects found by building one video.

The post itself was routine. What the run turned up was not.

### 1. The locked story was false, and the previous session's research note was wrong

Friday was locked as "deep research went paid at three of the four big names." Verification to
vendor pages killed it: **all four still offer deep research on a free tier.** Only Microsoft is
closing a door, it is a *removal* from the consumer Copilot app rather than a price rise, and it
happens **18 August — eleven days after this posts**, so any past-tense framing would have been
wrong on the day. Reframed to what is true and still interesting: the $20 feature is free in
Gemini, and the free lane is narrowing.

Separately, a note carried in memory from the previous session said **"Perplexity's help centre
publishes NO free-tier figure, so no free-cap number may ever go on screen."** That is wrong.
Their plan-comparison table lists **Research Queries · Free · 1/month**, verified in two
independent fetches. Corrected here so it stops propagating. **Lesson: a "we checked, it doesn't
exist" note is exactly as perishable as a figure, and deserves re-checking on the same schedule.**

### 2. TOD had never had the app-safe window — and neither did the News reel

Spine got the safe-window rebuild on Day 23. Nothing carried it to the other two engines. Gate 6
(new, below) on the pristine templates:

- **TOD** — caption at `y1770`, watermark at `y1846`, both under Instagram's caption block, plus
  bottom/right-rail breaks in scenes A, D, F and G. **Every Tool of the Day ever posted had its
  burned-in captions covered in the feed.** Fixed: content box `190/110/800`, caption to
  `bottom:708px` (y1169), watermark to `bottom:645px` (y1240). Clean in all four themes; deepest
  ink is y1132, so the caption clears content by 37px.
- **News reel** — watermark at `y1846` in all four themes; **column's caption at `y1666`**, which
  is what Day 17 and Day 22 both shipped. Fixed for base / crest / margin (watermark moved; crest
  content lifted, it was running to y1293). **Column is NOT fixed and is annotated in the
  template**: its fold is pinned at 50%, scene ink runs to ~y1232, and there is no clear band left
  before y1300. Fixing it means recomposing column around the fixed fold — a design pass, not a
  padding tweak. An attempt to do it inside this run made it worse (caption landed on scene copy)
  and was reverted. Gate 6 reports it every run so it cannot go quiet again.

### 3. Frame one of every TOD was black

Not a copy problem — an engine one. `seek()` faded the scene container in over `IN=0.24s`, so at
`t=0` scene A had opacity 0. **Every Tool of the Day opened on a fade from black**, which the
guardrails forbid outright, and it spent the single most valuable half-second saying nothing.
Fixed two ways: the first scene now gets no fade-in envelope (later cross-fades untouched), and
scene A's kicker and prompt bar are wired live on frame 0. **No audio cue moved** — whoosh 0.05,
pop 0.20, typing 0.40 all still land. Verified on the encoded MP4, not just the HTML.

### 4. New gate 6, and a blind spot it closes in gate 2

`scripts/audit_safearea.js`, wired into `qa_layout.sh` so `produce.sh` runs it as a hard gate.
Checks the window (`170 < y < 1300`, `x < 930` below mid-frame) across a 0.1s sweep of the whole
timeline, optionally in all four themes (`SAFE_ALL_THEMES=1`).

It also closes a real hole: **`#subline` and `#wm` are SIBLINGS of the scenes, and gate 2 only
compares children inside one scene** — so a caption sitting directly on top of scene copy, or on
the watermark, passes gate 2 in complete silence. That is not hypothetical; it is what my own
first attempt at the reel fix did, and gate 2 called it CLEAN. Gate 6 now tests real per-frame
rectangle intersection for both.

Two false-positive traps found while building it, worth keeping: empty layout spacers (Spine's
reserved 380px lane) must not count as ink — a leaf only counts if it actually paints; and
comparing a caption against the *deepest ink across the whole timeline* wrongly condemns any
caption placed above the content, which is precisely Spine's deliberate under-the-fold position.
Test intersection per frame, never against an aggregate.

### 5. Gates 3-5 fail on this engine, by construction

Reported, not hidden. Gate 3 wants an architecture change in the 2.6-3.6s window; TOD's scene A
runs 0-5.0s, so **no scene cut can ever land there** — strongest change measured 0.005 against a
0.120 threshold. Gate 4 found **ten static stretches over 1.0s, longest 2.23s, roughly 15s of the
31.5s runtime**. Gate 5 detected **0 cuts** — TOD cross-fades, and a cross-fade is not a cut.

None of this is content-fixable; the engine's own moment map is the cause. Do NOT calibrate the
thresholds down to make it green — that would hide the finding. It needs a dedicated pass on TOD's
motion design (retiming scenes means matching cue edits in `tod_audio.py` by hand). **This is now
the top open defect on the engine**, and it bears directly on AC's stated bottleneck, since
watch-time is the #2 ranking signal.

### Also noted

TOD's `crest` does not implement the caps / no-gold-headline hierarchy that `themes.md` specifies
for crest — the display face changes but the headline keeps its gold second line. Reads well and
is unchanged from previous TODs, so it was left alone rather than redesigned mid-run. Worth
reconciling: either the doc or the engine is wrong.

`number.prefix` added to the TOD odometer so scene B can carry `$20` (base's 5-character hero
limit still applies).

---

## 2026-08-13 · Day 29g · AI News (re-render) · the sign-off + hair

**Story / theme / files:** unchanged from Day 29 (650 ideas, Anthropic 10 Aug 2026, `crest`).
Rebuilt from `assets/reel.template.html` after four permanent engine changes.
`~/day29/signoff/AC_News_Day29_650-ideas_SIGNOFF{_subs,,_silent}.mp4` · 11.70s.

**What AC asked for:** revamp the last scene so the AC figure waves bye or interacts with the
audience, and give the figure hair.

**Four decisions, taken by interview:**

1. **Hair = T3 "tousled"** — four strands at four different angles, his pick from an
   eight-variant textured sheet (T1 crop, T2 quiff, T3 tousled, T4 wavy crown, T5 crop+fade,
   T6 volume top, T7 curly, T8 spiked). Judge hair at 140px, not full size: the crown arc has
   to carry the silhouette on its own, and the strands are the character sitting on it.
2. **Sign-off = wave, then point at the viewer** — the point lands on the GAVE UP / KEPT GOING
   binary, so the gesture reinforces the comment ask instead of just decorating it.
3. **Scene E stays 1.8s**, compressed, rather than extending the reel to ~12.5s. No audio
   retime, no re-record: `SCENES` is untouched, so `reel_audio.py` cues still hold.
4. **He steps forward on E** — scales 15% and shifts toward centre, then settles back.

### The finding worth keeping: a reel is a loop, so t=LOOP and t=0 are adjacent frames

Asking the figure to "wave through the loop" turned a pose problem into a continuity problem.
Everything continuous has to agree across that seam, and three things did not:

- **Pose.** Fixed by making the first and last `GEST` keys the same pose. `GEST[0]` is now
  `waveup`, not `rest`, and the reel opens with his hand sweeping down out of the wave.
- **Oscillator phase.** The breathing rate was a hand-typed 2.62 rad/s, which fits 4.75 cycles
  into 11.4s — a **7px vertical jump** every time the video restarted. Invisible once, a tic by
  the tenth loop. Frequencies are now DERIVED from `LOOP` (`W_BR`, `W_WV`) so an integer number
  of cycles always fits. Any future retime keeps this for free.
- **The step forward.** Returns to 0 by `LOOP`, which is also why "step forward and stay big"
  was the wrong option to take.

Verified numerically, not by eye: a seam check reads every driven transform at `t=LOOP` and
`t=0` and compares. All eight match.

### Two craft notes

**Pointing at camera cannot be done with an angle.** A flat 2D mark has no depth, so an arm
aimed at the viewer has to be FORESHORTENED. The forearm bone now sits in its own group that
scales along its length (`rF`), and a hand disc grows as the arm shortens — one value drives
both, so it can never pop. Without the hand, a shortening limb reads as an amputation.

**The point had to aim UP.** He stands IN the subtitle lane, so his shoulder is at caption
height and a level point put his hand through the first word (measured: reached x=356 with the
copy starting at x=275). Angled up, it clears the cap line entirely.

### New: gate 7 · figure-vs-copy clearance (`scripts/qa_figure.js`)

Gates 1 and 2 freeze ONE settle moment per scene. That is right for static copy and useless for
a figure whose arms sweep through the caption lane between those samples — both reported CLEAN
on the version whose hand reached the subtitle. Gate 7 samples across time and, at each t,
renders three passes from the same seek: copy hidden, figure hidden, and BOTH hidden. The third
is the baseline — the theme block and watermark survive both single hides and land in both
masks, which made the first version report a 0px gap on every frame. Distance is measured in 2D,
because a 1-D column test flags an arm raised above the cap line as a collision when it clears.

Shipping version: **CLEAN, tightest gap 39px** (198 samples). The rejected level-point version
measured 14px at the same threshold — the gate discriminates.

**Gates:** 1 CLEAN · 2 CLEAN · 3 PASS (2.60s, row-decorrelation 0.405 vs 0.150) · 4 PASS
(no window over 1.0s — the wave carries scene E, which used to be the thinnest stretch) ·
5 WARN (0 cuts, unchanged and warn-only) · 6 CLEAN · 7 CLEAN.

**Permanent (canonical, not run-local):** hair in `reel.template.html`, `assets/figure/ac-mark.svg`
(viewBox now starts at y=-10 — the strand tips sit above the old origin), `ac-figure-final.html`,
`ac-pose-rig.html`. New poses `waveup` / `pointcam` / `pointcam2`; `GEST` keys accept a per-key
`tr` override, needed because the 0.34s default smears three beats into one twitch inside 1.8s.

**Hook grade:** unchanged, A (the hook is scene A and was not touched).

### AC caught the VO. It was unperformable, and nothing in the pipeline could see it.

`voice-and-caption.md` already specified "~30–35 words total" for a News VO. The shipped script
was 72 words. The rule existed in prose and was ignored, which is the argument for gate 8: a
number in a reference file is not a gate.

The shipped VO script was **113 syllables inside 11.4s — 9.9 syl/sec**, about double a natural
read, with scene D at 14.8. AC's note was one line: "less words, it is only 12 seconds." He was
right and it should never have reached him. Rewritten to **39 syllables at 3.4 syl/sec** (25
words): the claim and the instruction only, because the screen and the subtitle already carry
$96/yr, the toggle, 62% and the full images/files/data line. Narrating the screen is what made
it long.

**The real defect was structural: every gate in this skill measures pixels, and words had no
gate at all.** Layout, ink, safe area, timeline, figure clearance — all pixels. A VO script
could be any length and ship. New **`scripts/vo_budget.py` (gate 8)**: counts syllables per
scene against the engine's own scene windows, warns over 4.0 syl/sec, fails over 4.7. Run on
the rejected script it returns four hard FAILs, so it discriminates. Scene A is allowed at the
top of the band (loud open); the sign-off should be the slowest scene in the reel. Wired into
SKILL.md step 8b before the PDF is built, and the syllable budget is now a table in
`beatsheet.template.md` so the VO is written to budget rather than trimmed afterwards.

**Metrics:** —

### Still open

- The reel **art-block system** (charts inside News scenes) — the 60-agent breakdown chart drafted
  on Day 29 is the first candidate. Owed.
- Covers still have **no QA gate**; the eyeball is the gate. A minimal cover ink check is owed.
- `SPEECH[]` is script-timed off the beat sheet. A recorded VO from AC replaces it with measured
  intervals — nothing else changes.
- TOD's structural motion debt (Day 27) is still the top open engine defect.

---

## 2026-08-14 · Hook deep-research pass — hooks.md rewritten to v2. No video shipped.

AC asked for deep research on improving the viral-format hooks and making the videos "keen
to look at," with me acting as hook editor. Four parallel research sweeps (hook copy science,
visual hooks for faceless reels, Aug-2026 platform data, competitive teardown). Full findings
with sources: `HOOK_RESEARCH_REPORT.md` (delivered 2026-08-14).

**The diagnosis, one line:** hooks were graded on stopping power; the zero-engagement problem
(2026-08-09 Insights: 562 views, 0 comments, 0 shares, 1 send) lives on axes the rubric never
graded — nothing left open to resolve, low-arousal register, no named send target.

**What changed in the skill (all shipped this pass):**
1. `references/hooks.md` → **v2.** Payoff-first survives but scene A now carries a STAKE in
   the same breath (payoff-as-new-question). Six hook styles (adds identity/Gift,
   dated-prediction, receipts). Grading adds stake-left-open, arousal (neutral caps at B+),
   and a separate SEND grade (named person + motive; below B doesn't ship). Burned-phrase
   blacklist (incl. "It's not X. It's Y." — Day 20's hook shape is now an AI-tell). Loop
   upgraded from copy-rhyme to engineered seam (mid-sentence loop, matched frame, unbroken
   audio). Two length plays: loop play (sub-12s) vs depth play (30–45s, more beats — sub-30s
   confirmed the weakest reach band across two independent samples). Validation loop: grades
   get checked against IG's per-reel Skip Rate (~63% brand average) when AC drops numbers.
2. `references/algorithm-2026.md` → dated Aug-14 addendum (8.5s avg watch time +117% YoY,
   shares +67% YoY, comments NOT top-3, 45–60s peak ER/views, CTA effect sizes, honesty note
   that the "3–5×" sends weighting is vendor speculation).
3. `assets/beatsheet.template.md` → stake / arousal / send-target(motive) rows; six-style
   list; A/B hooks graded stop+send.
4. `SKILL.md` step 3 + step 4 updated to match.

**Regrades under v2 (worked examples in the report):** Day 29 "Your prompt failed" A/send A-
(empathy is the #1 share emotion — keep making these) · Day 28 receipts A/send B+ · Day 27
"You talk. The board moves." B/send C (rewrite: "Trello sells AI for $10 a month. It just
gave the job away free.") · Day 26 A-/send B · Day 24 A-/send B+ · Day 20 B+/send C+
(blacklist shape).

**Visual verdict for "keen to look at": dark, calm, faceless is not the problem — static is.**
Build backlog (report §5, each fits inside a normal run): frame 0 mid-motion (not just live);
payload under 2.3s; engineered loop seam; onsets every 2–4s (TOD's structural gate-4 debt →
slow 3–8% push-in on the content block, which 2026 trend evidence now calls the premium
language, removing the Day 27 objection); gold keyword-highlight in typed captions (+15–30%
retention, operator-reported); second hook at scene B; one deliberate slow beat; non-round
numbers; one tactile texture layer; figure gaze always lands on the number (now law).

Metrics: — (validation loop starts when AC drops the next Insights numbers).

---

## 2026-08-14 · Day 30 · AI News · ChatGPT free went unlimited (`margin`)

**Story.** OpenAI made free ChatGPT unlimited for everyday text chats. That was the headline
reason to pay $8/mo for ChatGPT Go, and Go's own live page no longer lists messages as a
benefit at all.

- Unlimited, present tense, live: OpenAI Help Centre, ChatGPT Free Tier FAQ (updated within
  the day) — "Free users have unlimited everyday text chats, subject to abuse-prevention
  safeguards."
- $8/mo (→ $96/yr on screen), and "10x more messages, file uploads and image creation than
  the free tier": OpenAI, *Introducing ChatGPT Go*, 16 Jan 2026. Same page: Plus $20, Pro $200.
- 62%: OpenAI, 6 Aug 2026 — "responses containing at least one factual error were about 62%
  less common with GPT-5.6 Luna ... than with GPT-5.5 Instant."
- The receipt: Go's CURRENT help page (updated 2 days ago) lists only extended image
  generation, file uploads, data analysis, longer memory, projects. No message benefit.

**This is the story Day 26 and Day 28 both killed for being future tense.** It cleared because
the live help page now states it in the present, not because the announcement got older. The
rule worked: checking the product doc rather than the press release is what made it postable,
and it is also what surfaced the Go page change that nobody reported.

**Theme `margin`** — last used Day 14, so 16 days of separation. crest was burned (Day 27 + 29).

**Hook.** AC picked identity/Gift at the creative gate, then called for it to be widened at the
checkpoint, correctly: the identity version ("You pay for more messages") only lands on people
who already pay. Shipped thesis-first — "Free ChatGPT is now unlimited. $96/yr. The $8 tier was
selling you the limit." Grade **A · send A- (Gift)**. The identity cut is logged as hook B for a
straight A/B on the same story. Kicker changed to `Breaking · ChatGPT` so frame 0 names the
topic, sound off.

**Scorecard 10/10** — hook 3 · send 2 · loop 2 · SEO line 1 · verified numbers 1 · fresh 1.

### Three engine defects, found in one run, all fixed permanently

**1. The loop seam was broken on every reel ever shipped.** Scene E faded out over its last
0.24s and the 0.3s render tail drew nothing, so every reel spent its final ~0.5s dying to an
empty frame immediately before the restart. Worst possible place for it on a format whose
strategy is the rewatch. The last scene now holds full opacity to the final frame, subtitle
included. No `SCENES` change, so the audio cue map is untouched.

**2. Gate 4 had been passing on the FADES, not on the content.** The moment the seam fix removed
the last fade, four windows over 1.0s appeared at once. That is the finding: the cross-fades were
masking genuinely static scenes, and every gate-4 PASS before today was partly an artifact.
Fixed with a **3% slow push-in** per scene (settle, then continuous drift) — the calm way to hold
a motion floor on a page whose look is stillness, and the sanctioned item from the hook research
backlog. Bounds verified at MAXIMUM push, not just at the settle points, via a new `maxpush.js`
check: frame, app-safe window and the margin rail all clear.

**3. Scene C was under-built, and the ink gate cannot measure a transformed scene.**
- The push-in cleared 3 of 4 windows. The survivor was scene C's first 1.4s: the kicker landed
  at 0.4 and nothing new happened until the label at 1.4, leaving the odometer alone to carry a
  full second. A counting number, however big it looks, is too small a share of a 1080x1920
  mostly-black frame to clear freezedetect at -50dB — measured directly: ~18k pixels changing,
  mean frame delta ~1.0/255. **Label moved 1.4 → 0.8, chip 1.62 → 1.55.** Gate 4 CLEAN.
- Worth recording that gate 4 was NOT mis-calibrated: Day 29's shipped reel passes `--calibrate`
  at the same -50dB while Day 30 failed, so the gate discriminates. The content was the problem.
- Scene C's proof odometer also moved from `eExpo` over 1.1s to `eOut` over 1.9s. eExpo is
  1-2^(-10p) and puts 97% of the count in the first half of its window. Scene A keeps eExpo on
  purpose: its job is the loud open, where the number must be legible fast.
- **`scripts/audit_capture.js`:** the ink gate diffs a one-element screenshot against an
  all-hidden reference, and a fractional `scale()` on the scene promotes it to a composited
  layer whose rasterisation differs between the two shots — every element's mask then bleeds
  across the whole scene (10 false overlaps in scene A, all of scene A). It now neutralises the
  scene transform before measuring. Sound rather than a workaround: a uniform scale about the
  centre multiplies every gap by the same factor, so clearance at scale 1 is the worst case.

**Gates:** 1 CLEAN · 2 CLEAN · 3 PASS (2.60s, row-decorrelation 0.905 vs 0.150) · 4 PASS (no
window over 1.0s — first honest pass) · 5 WARN (0 cuts, unchanged and warn-only) · 6 CLEAN ·
7 CLEAN (tightest gap 37px).

**Files:** `~/day30/run/AC_News_Day30_chatgpt-unlimited{_subs,,_silent}.mp4` 11.70s · cover ·
`AC_News_Day30_VO.pdf` · `beatsheet.md`.

**Caption CTA: SEND-led, not a comment keyword.** Days 26 and 29 both ran comment devices and
the page has leaned on them for weeks. Sends are top-3 for non-follower reach, comments are
not, and this story has an unusually specific recipient — "the person who upgraded just to stop
hitting the limit" is a Gift send, the strongest motive on the list. The question one line above
the CTA does the comment-pulling. SEO line: "Is ChatGPT Go still worth it now that the free plan
is unlimited?" (65 chars, survives the ~125-char truncation). Hashtags one per lane: #AInews ·
#AItools · #ChatGPT · #SmallBusinessOwner · #AIforBusiness — picked on lane logic, NOT on
measured traction, because the trending-tag check returned only generator spam. Flagged to AC.
Caption shipped as `caption.txt` (1,139 chars).

**Metrics:** —

### Still open

- The reel **art-block system** (charts inside News scenes). Owed since Day 29.
- Covers still have **no QA gate**. Today's cover tagline sits on the bottom edge of the
  1080x1350 grid crop and clips slightly; `@itsac.ai` is clear. A minimal cover ink check is owed.
- The **depth play** (30-45s News) is still untried. AC chose the loop play today, and the loop
  seam is now actually engineered, so the A/B is worth running once.
- `base`'s floor bar still sits in the covered bottom 26px; `column`'s caption still at y1666.
  News reels remain on a two-theme rotation until one of those is fixed.
- TOD's structural motion debt (Day 27) — note that defect 2 above almost certainly applies to
  TOD as well, since it shares the fade-based scene envelope. Worth re-running gate 4 on TOD.

---

## 2026-08-15 · Day 31 · Carousel (Prompt Drop pack 03) · `margin`

**"The messages you dread writing."** Handling an unhappy customer, five muscles:
the bad review / **the refund** (strongest chore, placed 2nd to earn the swipe) / when it
was your fault / holding the line when they are wrong / **the one you are avoiding**
(general-purpose capstone, works for someone with no business at all).

**Cover figure: 64%.** "64% of customers who experienced a problem feeling rage about it"
and "50% raising their voice to express displeasure, a record high" — National Customer
Rage Survey, 11th ed., CCMC with the Center for Services Leadership at ASU's W. P. Carey
School, published 2 Dec 2025, n=1,000 Americans, online. **Fieldwork dates are not
disclosed** (full report gated), so the slide and caption say "published December 2025"
and never "surveyed in December". The study's $596B figure is a national aggregate and was
deliberately left off. The 43% "never responded" figure applies only to the 1-in-4 who
complained via social media and was also left off.

### THREE zombie stats killed in research

The customer-service lane is worse than the follow-up lane was on Pack 02. All three of
the famous numbers failed:

- **"96% of unhappy customers never complain, 91% just leave"** — every trail ends at a
  content page citing "Lee Resources" or "1st Financial Training Services". No dataset, no
  n, no date. And the real research lineage on this exact question (TARP 1976 → the
  ASU/CCMC Rage series) found the **opposite**: 82% did complain to the company.
- **"5x more to acquire than to retain"** — TARP, late 1980s, untraceable. Ipsos's own
  paper repeats it while admitting it cannot cite the original and calling it "a recipe
  for financial disappointment".
- **"Happy customer tells 9, unhappy tells 20"** — earliest documented version is a 1984
  newspaper item with different numbers. Folklore.

The kills became the caption's closing section, same move as Pack 02. It is turning into
the page's most differentiating recurring beat: the post is partly *about* the verification.

### The figure went into the carousel, and the character zone law was retired

AC asked for the AC figure on the deck mid-run. `carousel.md` had reserved a character zone
"for AC's animated character **when it exists**" and said to leave it empty until then. The
character exists (Day 29), so the condition was met and the zone is now filled. He stands
bottom-left at 132px on **beat slides only** — on a prompt slide the gold idea IS the
prompt, and a second gold element competing with it breaks that law, so he bookends.

**New gate · `scripts/qa_deck_figure.js`.** The first build had the cover's sub running
**88px straight through him** and `qa_deck.js` reported CLEAN on all 42 blocks — because it
measures text blocks against each other and the figure is not one of them. Exactly the
blind spot that produced gate 7 on the reel engine. `#stage.has-fig #body{padding-bottom}`
now reserves his band; measured gap 15px on the cover, 55px on the close.

**This is the fourth gate born from the same lesson** (gate 6 app-safe, gate 7 figure-vs-copy
on reels, gate 8 VO budget, now this): a gate only ever sees what it was told to look at, so
every new element on the canvas is unmeasured until someone writes its check.

### T3 hair had silently reverted, and Day 30 shipped with the wrong head

Found while wiring the figure: `ac-mark.svg` and `reel.template.html` were both back on
**T8 spiked**, and **Day 30's reel shipped with T8**, not the T3 tousled AC picked on
Day 29g. The synced skill folder is a read-only cache that gets restored from AC's saved
account copy; the Day 29g package evidently was not saved, so this morning's template copy
was already T8. Today's Day 30 fixes survived only because they were made after the last
re-sync. Restored T3 across the template, the mark and both figure sheets, and today's deck
uses it. **This is the persist step failing in production, exactly as SKILL.md step 9 warns.
Day 29 and Day 30 are now on different heads and that cannot be fixed without a repost.**

**Gates:** `qa_deck.js` CLEAN (42 blocks) · `qa_deck_figure.js` CLEAN (15px / 55px) ·
prompt word counts all 49-53, inside the 40-55 law · slide 1 survives the square centre crop.

**Files:** `AC_PromptDrop03_angry_01..07.png` (1080x1350) · `caption.txt` (SEO line, caption,
5 tags, 5 wording gates, 3 killed-stat notes, slide-order rationale, 3 A/B cover hooks) ·
`dm_reply.txt` (one pasteable message, all five prompts verified verbatim against the slides)
· `deck.html`. SEO line: "AI prompts for handling an angry customer: the message you are
dreading is usually one line long." CTA: Comment PROMPTS -> DM the pack (format law).

**Metrics:** —

---

## 2026-08-17 · Day 32 · AI News · Copilot retires three features (`base`, CONTRAST opener)

**Story.** Microsoft retires three features from the **consumer** Copilot app on 18 Aug 2026.
Podcasts ("will no longer be available after August 18, 2026"), Deep Research ("being retired
in the Copilot app for consumers starting August 18, 2026"), Group Chat (migrated to individual
chats, not deleted). Source: Microsoft's own support page, `changes-microsoft-copilot-app`,
**updated 13 Aug 2026**, re-opened directly this run because the brief was a day old and the
claim is dated.

**The angle:** two of the three you can save. Podcasts download from the library; group-chat
media has Microsoft's own instruction to "download any media shared by other participants that
you want to keep." Deep Research has no equivalent. So the reel is a deadline plus a
fifteen-minute job, and the rule that outlives it: the tool is theirs, your work inside it is
only yours if you can get it out.

From the 16 Aug shortlist (one day stale, re-verified). Picked over Stanford six-facts,
Anthropic watermark and Census five-tasks because it **expires tomorrow** — dated-prediction is
the one hook class still climbing, and this was the 14 Aug brief's top pick that never shipped.
Does NOT re-run Day 24: that post was the Gemini free-tier comparison, this is the deadline and
the download, and Gemini is deliberately unmentioned.

**FIRST RUN OF THE CONTRAST OPENER.** `OPENER='contrast'` — scene A only, Poppins Bold 96px,
pure white, no italic. Chosen by AC off the 5-way hook board built 17 Aug. The control
(`ChatGPT Go`, Day 30, 14 Aug) has a **measured 85.7% skip rate**, so this run has a real
baseline to be compared against rather than a guess. **Check skip rate on both next Monday.**

### base is unblocked, after being logged as broken since Day 24

`base`'s floor bar sealed the FILE's floor — `bottom:0` — which the Instagram player covers.
The block that IS this theme's identity was invisible in the app on **every base post ever
shipped**. Logged Day 24, declined twice as optional, and it had quietly reduced the News
rotation to two themes. Fixed: `bottom:620px`, so it seals the floor of the VISIBLE frame. The
watermark lifts to `bottom:700px` for this theme only, because the bar now occupies where it sat.

### Gate 6 earned its keep, four times

Gates 1 and 2 were CLEAN on the first fill. Gate 6 reported **33 app-safe violations** — the
scene-C source chip colliding with the watermark. Four passes to clear: shorten chip, lift
watermark, one-line the label, fold the source into the label. A frame that passes ink and
bounds can still be unreadable in the player, which is the whole reason that gate exists.

### Template bug found: an empty chip renders an empty box

Setting `proof.chip` to `''` still emitted `.newschip`, which carries a gold border, padding and
a glow — so a run with no second proof point shipped a blank gold box AND had it push the block
into the watermark. Now guarded: `${C.proof.chip ? el(...) : ''}`.

**Gates:** 1 CLEAN · 2 CLEAN · 3 PASS (2.60s, row-decorrelation 0.804 vs 0.150) · 4 PASS ·
5 WARN (0 cuts, warn-only) · 6 CLEAN (after four passes) · 7 CLEAN (36px) · 8 CLEAN (33
syllables, 2.9 syl/sec).

**Hook grade A. Scorecard 9/10** — hook 3 · loop 2 · SEO 1 · verified 1 · fresh 1 ·
**share trigger dinged to 1**, honestly: "send to whoever uses the Copilot app" is a real named
person-type but a smaller population than this page's usual story.

**Open question left with AC:** scene A is now Poppins Bold while B–E stay Gloock, so the reel
changes typeface at 2.6s. Correct for isolating the skip-rate variable, visible to anyone who
stays. He was asked whether to carry contrast through all five.

**Files:** `~/day32/run/AC_News_Day32_copilot-retires{_subs,,_silent}.mp4` 11.70s · cover ·
`AC_News_Day32_VO.pdf` (24 words) · `caption.txt` (5 wording gates, Day 24 relationship noted).
SEO line: "Microsoft is retiring three Copilot features tomorrow: what to download before you
lose it." CTA: comment KEEP or LOSE — first binary since Day 29.

**Metrics:** — (skip rate on this vs Day 30's 85.7% is the first real A/B this page has run)

---

## 2026-08-17 · Day 33 · AI News CAROUSEL · "Stop using AI" (`crest`, 7 slides, NEW `shout` + `quote` types)

**Format experiment**, reverse-engineered from a @realjacobmiller carousel AC sent (243
comments, 51 shares): manufactured drama for five slides, then a reveal that it was staged.

**Built twice.** V1 opened on a quoted card — the viral claim presented as reported speech.
AC then asked for "the Chris effect": an accusation, `STOP USING AI`, `you are using it wrong`.
That is not a restyle, it changes what the reveal has to be. A shout promises an accusation the
deck must *resolve*; V1's reveal was a gotcha about media distortion, which would have left the
opening line dangling and made the post feel like a trick. Restructured so **fact five resolves
the accusation**: the declines land where AI substitutes for a person, and "where AI is used
more to complement workers, employment is flat or rising." The shout is true, never withdrawn,
and pays off as a rule.

**AC authorised inventing a scenario if revealed. It was never spent.** Every word on screen is
real. The claim in the phone mock is a distortion that genuinely circulates; the accusation is a
finding.

**Spine:** shout → the 19% is real → 15% to 19% → that is fact TWO → fact one verbatim → fact
five → the rule, `not instead of you`. CTA comment **INSTEAD or MORE**, which makes the viewer
classify their own behaviour rather than recall a fact.

Source: Brynjolfsson, Chandar & Chen, revised 12 Aug 2026, ADP payroll through June 2026.
Stanford's own summary opened directly this run; all six facts quoted, not paraphrased.

### Two new slide types, both now in the template

- **`shout`** — the accusation slot. Display-size command, then a **phone mock** carrying the
  thing the viewer actually scrolled past. The reference gets its punch from a human face; this
  page has no face by standing rule, so the artefact does that job. The mock names **nobody**:
  wireframe avatar and name bars, generic action row. It must never name a real account or the
  page is putting false words in a real mouth.
- **`quote`** — reported speech as a light card, foreign to the house look. Built for V1, kept
  because it is the honest way to put somebody else's claim on screen.

### Quote-mark discipline failed twice in one deck

Slide 5 shipped `"We do not see widespread job displacement..."` — **"economy-wide" trimmed out
of a slide labelled "word for word."** Caught, full wording restored, headline dropped to 70px
via a new per-slide `wsize`. Then slide 5's fix pattern repeated on slide 6: `"Where AI is used
more to complement workers..."` dropped **"In occupations"** and **"particularly among more
experienced workers"** while keeping the quote marks. Now marked with ellipses and flagged as
quoted mid-sentence.

**Both were caught by eye, not by a gate.** There is no gate that compares a quoted string on a
slide against its source. On a page whose whole promise is verified wording, that is the most
valuable gate not yet built — logged as the next one.

### The worst latent defect found in the deck engine so far

**Every art builder had Day 19's data hardcoded.** `split` returned 20.7% / 13.5% labelled
"Share of every Gemini conversation. Google and DeepMind, July 2026"; `choice` returned "I use
it to learn / I use it for work". Any deck calling them shipped a previous run's numbers on an
unrelated story, and `qa_deck.js` measures geometry so it passed CLEAN every time. This deck
rendered Gemini figures on a Stanford story before it was caught by eye. Fixed: all builders
take the beat and read `bars` / `opts` / `artlab`.

**Gates:** qa_deck CLEAN (114 blocks) · gate 7 deck-figure CLEAN after **two** failures —
-72px on slide 5 (figure through the fact-one quote) and -56px then -7px on slide 6 during the
quote fix.

**Hook grade A. Scorecard 9/10** — shout 3 · reveal payoff 2 · SEO 1 · verified 1 · fresh 1 ·
share trigger 1 (dinged: broad send target, and the format is untested on this page).

**Files:** `~/day33/run/slides/AC_News_Day33_01..07.png` · `caption.txt` (6 wording gates, the
two slide-1 standing gates, and the quote-mark rule). SEO line: "Why AI is coming for
entry-level jobs in some roles and not others: the Stanford study, read properly."

**Metrics:** — (carousel reach is the open question: Prompt Drop 03 reached 14 against 91 for a
reel. If this lands near 14 too, the format is the problem, not the story or the hook.)

---

## 2026-08-24 · Engine maintenance · no post · all four video engines

Not a content day. AC sent three render screenshots — type overlapping through a
transition, a figure with its last glyph sliced, and motion he called "very unsmooth" —
and all three turned out to be engine or pipeline faults rather than anything in the
timelines or the copy.

### Every cut was painting two scenes on top of each other

The scene windows in `SCENES` genuinely overlap: a scene's `start+dur` runs past the next
scene's `start` by 0.1s on the News reel and Spine, 0.15s on TOD. The cross-fade rendered
BOTH scenes through that window, each at 0.2-0.36 opacity, which stacked two full-bleed
layouts AND dipped the luminance at every cut. Probing every scene boundary in all four
engines found **145 frames** rendering more than one scene. The trailer contributed 13 of
those on its own: it already hard-cut, but its window was inclusive at both ends while its
shots are contiguous, so any frame landing exactly on a boundary drew two shots at full
strength.

Every scene now owns the half-open window `[start, next.start)`. Re-probed: **0 overlapping
frames across 511 boundary samples.** TOD and Spine also picked up the loop seam the News
engine got on Day 30 — a hard cut requires it, or the last scene vanishes at its end and
the render tail encodes black. `SCENES` timings are untouched everywhere, so every audio
cue map still matches and no variant needs retiming.

### The odometer mask has been shearing glyph ink, and it took TWO fixes

`.odc` carried bottom bleed only, so ink overhanging a character's ADVANCE box was cut off
at the sides. On the stress string `$725B`: **margin lost 63.7px of ink, base 51.2px,
vault 10.2px, column 2.0px**, crest clean. Widening the mask alone did not fix margin or
column, because there are two independent clippers and only one of them is the mask:

1. `.odc{overflow:hidden}` shears the ink outright;
2. `.odc>i` paints with `background-clip:text` over a transparent fill, so ink outside the
   gradient box is painted with **nothing at all** and vanishes even with the mask open.

Both now carry 0.16em of horizontal bleed, cancelled by an equal negative margin so layout
and the cascade are unchanged. Re-measured: 0.0px lost on all five themes. The TOP edge
stays clipped deliberately — that is the masked reveal the digits descend through, and
bleeding it would leak the incoming glyph early.

Worth remembering: this is the same blind spot gate 2 was built for. Comparing the mask box
against the glyph BOX said clean every time, because the box is exactly the advance width.
Only measuring true ink extents against it found the shear.

### "Unsmooth" was the pipeline, not the animation

Three causes, none in the timelines. Frames rendered at **30fps**, below what the type moves
and the continuous push-in need. Frames written as **JPEG q95** — a lossy intermediate that
libx264 then encoded again, two generations of loss on gradients that are almost all
gold-on-black. And the shutter fired immediately after `seek()` with no forced compositor
commit, so a capture could read the previous frame's layer state for anything declaring
`will-change` (`.el` and `.odc>i` both do) — a duplicated or half-updated frame at random,
invisible to QA because QA shoots one frame at a time.

Now 60fps, lossless PNG frames, and a double `requestAnimationFrame` before every capture;
the encode gained explicit bt709 tags and CRF 16. QA-mode filenames were deliberately left
alone — gate 7 parses them as tenths of a second and renaming them corrupts the contact
sheet.

**Gates:** 1, 2 and 6 CLEAN on the News reel; 6 CLEAN on TOD and Spine. Gate 2 reports one
17px-vs-18px gap on TOD scene E — it reproduces identically on the unpatched files, so it is
pre-existing and was left alone rather than folded into this change.

Gate 3 **PASS at row-decorrelation 0.623** against a 0.150 threshold, strongest change at
2.70s. Day 38 measured 0.404 with the cross-fade in place, so removing it roughly halved
again the correlation across the cut. Gate 4 **PASS** — worth stating plainly, because the
Day 30 note warned the cross-fades had been papering over static stretches, and the concern
was that deleting them would re-expose that. It did not; the push-in carries it.

### Gates 3-5 had been unrunnable, and gate 5 cannot see this brand's cuts

Running the gates rather than reading them turned up two things.

`audit_motion.py` calls `ffprobe` and does NOT swallow the error, so gates 3, 4 and 5 died
with `FileNotFoundError` on any container without a system ffprobe — and the toolchain
resolves ffmpeg from the imageio-ffmpeg wheel, which ships **ffmpeg only**. `qa_layout.sh`
made it worse by resolving `NODE_PATH` and nothing else, so the MP4 branch had no ffmpeg
either. The same missing binary silently voided the verify step in both `build_video.sh` and
`produce.sh`, where `|| true` swallowed it and the build reported success having checked
nothing. Fixed by shipping `scripts/ffprobe_shim.py` (ffprobe's three used invocation shapes,
answered from ffmpeg's own banner) and having all three scripts install it on PATH. Proven
from an `env -i` shell with nothing pre-resolved.

Then gate 5 reported **0 cuts** on a reel with four. It selects on `gt(scene,0.25)`, but the
measured scene scores at the real cuts are **0.046, 0.035 and 0.042** — an order of magnitude
under the threshold. On a flat `#0A0A0A` ground a cut changes only a small area of sparse gold
ink, so 0.25 never fires. This is not a regression from the hard cut (an instant change
produces a LARGER inter-frame delta than a fade), and it is the same class of limitation
already documented for gate 4. Left as-is rather than retuned: thresholds here are
look-dependent and the skill wants them set from `--calibrate` on a render AC already trusts.
The detector firing at exactly 2.6s, 5.0s and 7.5s is independent confirmation that the cuts
land precisely on the SCENES boundaries.

**Open:** with the ghosting gone, scenes are visibly composing over ~1.25s (element delays
0.05→0.95 on a 2.5s scene) — the cross-fade had been covering that hole. AC is watching a
draft before deciding whether to tighten the entrance cascades.

**Files:** engine templates + `render_frames.js` + `build_video.sh`. Pushed to
`claude/ac-studio-animation-workflow-rc2yxp`.

**Metrics:** — (engine change, nothing posted)

---

## 2026-08-24 · Engine maintenance II · no post · transitions

AC asked for the transition to fade in and fade out, and for a menu to choose from.

### There is no such thing as a zero-overlap cross-fade

Worth stating plainly, because it is the whole tension in the request: a fade-out that
touches a fade-in IS two scenes on screen at once, which is exactly the ghosting the
engine was fixed to remove a few hours earlier. So a fade with zero overlap has to pass
through black. `fade` does it briefly (out 0.13 / in 0.17); `dip` holds black for 0.10s.

Six modes now live behind a single `TRANSITION` constant, ghost-free by one of two
different means:
- **by opacity** (`cut`, `fade`, `dip`) — only ONE scene is ever painted.
- **by geometry** (`wipe`, `slide`, `bar`) — both scenes paint, into DISJOINT regions,
  so no pixel ever carries two of them. This is how you get a softer move without a
  dissolve.

`fade` is the new default in all three engines. `wipe`/`slide`/`bar` are News-reel only
until AC picks one. SCENES timings untouched everywhere, so every audio cue map matches.

### The ghost gate had to be rebuilt twice before it measured anything

Counting live scenes is the wrong test the moment a geometry mode exists — wipe and slide
legitimately paint two scenes at once. The first rewrite compared per-scene screenshots
directly and reported 3400+ shared pixels on wipe and slide: it was comparing the shared
CHROME (frame, ticks, watermark, figure, subtitle), present identically in both shots. The
second rewrite diffed each scene against a baseline with every scene hidden — the trick
gate 2 already uses — and still reported 53 shared pixels on wipe, at x 456..608 while the
incoming scene was clipped to x <= 54. It could not physically be scene ink: it was the
subtitle text RE-ANTIALIASING against a different backdrop in each shot. Restricting the
count to pixels where the baseline is empty ground settled it. All six modes: **0 shared
ink pixels** across 20 pair-samples each, and cut/fade/dip/bar never paint two scenes at
all.

Lesson worth keeping: when a measurement disagrees with the geometry, suspect the
measurement. Twice here the "ghost" was the instrument.

### fade costs one gate-4 stretch, and it is the documented ceiling

Gates 1, 2 and 6 CLEAN. Gate 3 PASS at row-decorrelation 0.625 (needs 0.150) — a fade this
short does not blunt the cut. Gate 5 still reports 0 cuts, unchanged and still a threshold
problem, not a regression.

Gate 4 FAILS on `fade`: static from 7.73s for **1.08s** against a 1.00s floor. The same
content on `cut` passes, so the fade caused it by spreading the change. Read the window
per the standing rule rather than believing the number: between 7.80 and 8.80 the figure
changes pose twice, a gold rule draws under line two, the closing sub arrives, and the
progress bar grows — 16,811 then 24,980 pixels changing between samples. It is alive and
merely quiet, which is exactly the documented ceiling: a -50dB whole-frame mean cannot see
small events on a flat black ground. Logged at 1.08s and shipped, not papered over.

**Files:** `TRANSITION`/`TRANS` in reel, tod and spine templates. Menu sheet rendered for
AC's pick.

**Metrics:** — (engine change, nothing posted)

