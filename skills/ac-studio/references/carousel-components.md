# Carousel components — the Two Counts law (2026-09-12)

Folded into ac-studio from AC's update pack after the "Two Counts" deck (7 slides, crest,
Claude Design). **Section 1–3 below are his text, verbatim.** Load this file at the start
of every session that touches a carousel; `carousel.md` (the shell deck engine) stays the
law for `deck.template.html` builds, this file is the law for the Claude Design path and
for the interview that now precedes EVERY carousel.

Reconciled against the standing brand law before folding, so this file can be read alone:
- **Ground stays flat `#0A0A0A`.** The gold GRADIENT is on the crest band (0–88px) only —
  an approved exception, like the Prompt Drop pack-name gradient. Not a licence for
  gradient grounds.
- **One gold accent** stands. The red pair `#E5484D` (loud claim) / `#A32328` (real count)
  is an approved exception for HERO NUMBERS in a two-count contrast, chosen by AC in the
  interview (question 5); everything else on the slide stays gold.
- **Figure:** `assets/ac-figure-akimbo.png` is the approved PNG mounted at its own aspect,
  transform-only — legal under the resolved figure law. Beat slides only; never cover or
  checklist. White-backed uploads are unusable — ask for a transparent cut (Gate 9).
- **Icons:** the Two Counts pack is the wireframe family (gold wireframe, particle fill).
  Carousels use whichever approved pack AC picks in the interview — wireframe or matte;
  polished stays Prompt-Drop-only. **Never draw a new icon in SVG; bake or ask.** The brand
  diamond mark is the mark, not an icon, and stays drawn.
- **Chrome on the crest carousel** differs from base: counter top-right "n / N", handle
  bottom-centre, source footnote on every slide, spine 148px above the floor.
- **Stop 0 answers question 2 (2026-09-20).** The icon-per-slide map now comes from the
  pack brainstorm (`imagery-pack.md`): three directions, the pick named, every object baked
  into ONE look for the deck and boarded at true size (Stop 1a) before the stills board.
  Wireframe / matte is recommended per topic with the reason; AC decides. Three colour
  families per deck; the red pair stays legal as the declared exception on the hero numbers.
- Assets named in section 4 live in AC's Claude Design project and are NOT in this
  package: the Stills Board `.dc.html`, `Two Counts - Caption and DM.md`,
  `assets/ac-figure-akimbo.png`, `assets/icons/*.png`, `bake/icons.html`,
  `bake/ac-icons.module.js`. (`CLAUDE.md` arrived 12 Sep — see `carousel-house-rules.md`.)

---

Paste this into the ac-studio SKILL.md (or its carousel section). Everything below is approved by AC on the Two Counts deck and must be loaded at the start of every session that touches a carousel.

## 1. Interview before every carousel (one ask_user form, always)
Even when the brief looks complete, ask:
1. Theme: base / crest / column / margin
2. Icon per slide, from the approved pack (show the proposed map, let AC remap)
3. Figure on/off per slide
4. Which slide is the save/screenshot slide
5. Accent colour for the hero number(s): gold default, or the approved red pair
6. Comment keyword for the close
Then build a 50% stills board (`<Deck> - Stills Board.dc.html`) and stop. Nothing renders full-size until AC approves the board.

## 2. Component vocabulary (learn every session)

**Frame (crest)** 1080x1350, ground #0A0A0A. Gold band 0 to 88px top with `linear-gradient(172deg,#EFD588 0%,#E7C76F 52%,#C9A14E 100%)`. Hairline frame inset 40px top-below-band, 1px rgba(201,169,97,.2). Kicker top-left at 72px (600 Poppins caps, tracking .42em, #E7C765, 6px square dot). Counter top-right "n / N" (500 Poppins, #7A756A). Handle bottom-centre "@ITSAC.AI" (600 caps .42em, #796938).

**Spine** on every slide: 7 nodes on a 1px hairline (rgba(201,169,97,.28)), 14px square nodes with 1px #C9A961 border, filled #E7C765 up to the current slide. Sits 148px above the floor. On ink-on-gold slides: border/fill #12100A, line rgba(18,16,10,.3).

**Source footnote** on every slide, not only the source slides: 500 Poppins 20px, #5E522C, left 72px, 108px above the floor. The close slide's footnote carries the follow line instead.

**Hero numbers** Bricolage Grotesque 800, up to 236px on the split slide. Default ink #F4F0E7. Two-count contrast, AC approved: loud claim #E5484D (bright red), real count #A32328 (deep red). Same colours reused wherever those numbers recur in body copy and score bands. Everything else on the slide stays gold.

**Headline** Bricolage Grotesque 800 caps, 80 to 124px. 3 lines maximum at board scale. When a figure or icon shares the slide, constrain `right` so text never runs under it (right >= 400px full-size).

**Body** Poppins 400 32px, #B9B1A1. Never under the figure: right >= 420px full-size on figure slides.

**Checklist rows** lifted cards: #141414, 1px rgba(201,169,97,.14) border, 24px 32px padding, 40px square tick box 1.5px #C9A961, 14px gap between rows. Six rows fit above the score bands. Score bands: 600 Poppins 22px, band label in the matching accent.

**Ink-on-gold slide** exactly one per deck, the rule slide by default. Ground is the gold gradient; top band becomes #0A0A0A; kicker, headline, spine go #12100A; body #3A3218; counter/footnote/handle #5E522C. Gold PNGs (figure, icon) are darkened with `filter:brightness(.18 to .25)` as a stand-in until true ink versions exist.

**Save bookmark** close slide only: 44x52 outline, 2px #C9A961 stroke, beside a one-line save prompt in Poppins 500 26px #B9B1A1.

**Figure** `assets/ac-figure-akimbo.png` (transparent, system asset). Mid scale ~420px tall, right 60px, bottom 192px. Beat slides only; never on cover or checklist. White-backed uploads of the figure are not usable; ask for a transparent cut.

**Icons** approved 3D pack (gold wireframe, particle fill) in `assets/icons/`: hourglass, datachart, documentstack, globe-v2, shield, mark. Cropped from AC's approval board so they soften above 250px; ask AC for the original PNGs when a sharper mount is needed. The close always takes the diamond mark. Checklist slide carries no icon. Mount top-right at 260 to 400px, opposite the headline. Never draw new icons in SVG; bake or ask. Bench bakes (dark body, hairline gold rim, three-quarter camera, soft contact shadow) live in `bake/ac-icons.module.js`.

**Two Counts icon map** (reusable for any "who counted" deck): cover hourglass, split data chart, source A document stack, source B globe, rule shield, close mark.

## 3. Layout gate (run before the board ships)
- No text box intersects the figure or icon box
- Headline <= 3 lines; body never wraps under the figure
- Spine node count equals slide count and fills to the current index
- Footnote present on all slides
- Exactly one ink-on-gold slide, exactly one save bookmark
- Cover survives the 1080x1080 centre crop
- No dates or day numbers on any graphic; sources only in the footnote

## 4. Assets in this project
- `Two Counts - Stills Board.dc.html` (approved board, 7 slides)
- `Two Counts - Caption and DM.md` (caption, COUNT DM note, hashtags, alt text)
- `assets/ac-figure-akimbo.png`, `assets/icons/*.png`
- `bake/icons.html`, `bake/ac-icons.module.js` (bench baker)
- `CLAUDE.md` (project house rules, mirrors sections 1 to 3)
