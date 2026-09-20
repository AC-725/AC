# Prompt Drop — the Saturday prompt pack (v3 · 2026-08-30)

Supersedes v2 (7 slides, cover hero = pack title). Source of law: **"The Finish Line"**
run, 2026-08-30 — 9 slides, rebuilt from an earlier cut AC brought in, shell path with a
real render + gate pipeline, AC-approved through three boards.

v2's shape stays legal. v3 adds the **question opener**, the **9-slide teaching shape**,
the **exchange slide**, and a **reusable engine** (`assets/promptdrop.template.html`)
so the next pack is a content-only edit.

> **v4 (2026-09-09) supersedes this file for any pack built in Claude Design** — see
> `prompt-drop-dc.md`: intro cover (heading + pack name + hook question + WORKS IN strip),
> polished MeshPhysical pack icons at 1024px, platform logos on 01 + 02, a Story cover in
> the ship list, and the prompt house style "You are X. Input. Output shape. Done line."
> (never "Act as"). Everything below is still the law for the shell engine
> (`assets/promptdrop.template.html` + `scripts/qa_promptdrop.js`).

---

## Format

**9 slides**, 1080×1350, base theme (Gloock display, Poppins small type), flat #0A0A0A.

```
01 COVER    the question
02 THE RULE the answer — the teaching list as hero
03-07       PROMPT 01-05, identical layout
08 THE KEY  the exchange
09 CLOSE    the rule line + one keyword
```

The 7-slide v2 shape (cover + 5 + close) remains legal for a thin week. Choose 9 when the
pack has a **rule worth teaching** — the rule slide is what makes a pack teaching rather
than a list, and the tool slide is what earns the comment. Neither is padding; cutting
either costs more than the swipe depth is worth.

---

## The narrative spine (v3 — the reason 9 works)

**question → answer → proof → the key → the ask.**

Slide 1 asks, slide 2 answers, 3–7 prove, 8 hands over the thing, 9 collects. Two
statements in a row (the v2 default: title cover, then rule) gives the reader nothing
pulling them across the gap. A question creates the gap the swipe closes.

Check this before drafting. If slide 2 does not answer slide 1's question, the pack is
a list wearing a carousel.

---

## The cover — v3 changes the law

**The cover may open on a RHETORICAL QUESTION, and the question outranks
pack-title-as-hero when the question is strong.** v2 made the pack title the hero
unconditionally. AC was shown three directions on this run (pack title / problem
statement / question) and picked the question in a straight comparison.

Cover anatomy:

| Slot | Spec |
| --- | --- |
| Stat line | Poppins caps ~21px, ls 2.1, `--dim`, number in `--goldlit`. Sits ABOVE the hero at y206, width ≤730. This is the evidence, not the hook. |
| Hero | Gloock, auto-fit from 112px down to a floor of 76px against the sub's top. 3 lines is the sweet spot. |
| Sub | Poppins 30px `--dim`, 2 lines, width ≤812. **This is where the question gets answered and bridged to the pack.** |
| Motif | one icon, bottom-right, ~258px, inside the grid crop |
| Foot | `SAVE THIS · SWIPE` bottom-left, corner mark bottom-right |

**The question must be a real question, not an ad question.** "Why is AI still giving you
generic answers?" ships. "Tired of generic AI answers?" does not — it buys the hook and
sells the quiet-luxury register the whole page runs on.

**Put the qualifier in.** "*Still* getting…" assumes they have already been trying, which
is what makes a stranger self-identify instead of scrolling. A bare "Are you struggling
with AI?" is too broad to catch anyone.

**Check the question's logic before designing it.** AC's first phrasing on this run was
"struggling to get generic AI answers" — inverted. They are not struggling to GET generic
answers; they are getting them, and that is the struggle. Read the hook back as a
sentence before it becomes 112px type.

Build every cover variant into the template's `COVERS` map, not into one-off files. A/B
swaps are then a one-word CONFIG change and a single render.

---

## Prompt slides (03–07) — unchanged from v2

chrome → meta row (y224) → Gloock headline auto-fit from 84px, width ≤604 (y264) →
3D anchor (right 64, top 252, **208px**) → prompt card (y492, 912w, 1px gold border on
`--card`, prompt verbatim, Poppins 33/1.52, slots in `--goldlit`) → `YOU GET BACK` label
+ ≤2 lines at width 748 (y1016).

**Prompts ship VERBATIM.** Only supporting copy may be tightened.

**Read the previous pack's five prompts before drafting** (standing rule since Pack 04's
duplicate catch) — and read the CURRENT pack's five against each other too. This run had
"No apologising" on both slide 4 and slide 7; the fix was a named banned word on 7
("Never use the word unfortunately"), which is more concrete anyway.

---

## The rule slide (02) — new in v3

The teaching list is the **hero**, not body copy. On this run the four lines were buried
at 33px inside a paragraph; promoted, they became the slide people screenshot.

- **No card, no border, no quote mark.** `#card.plain`.
- **No 3D anchor.** The copy owns the frame. This is the only slide in the pack without one.
- Gold small-caps label above the list (`FOUR LINES. EVERY TIME.`).
- List in Gloock 52px / 1.34, each line prefixed by a short hairline tick.
- **The last item takes the gold** and a 2px tick — it is the one nobody does, which is
  the whole reason the pack exists.
- One Poppins line underneath at 29px `--dim`, saying why the last one matters.
- A 5-item list drops to 44px / 1.30 (`#four.five`).

---

## The tool slide (08) — v3 makes it the EXCHANGE slide

**Never headline the disclaimer.** v2 packs credited the tool in the headline
("I did not build this. I found it."). AC killed it, correctly: the last slide before the
CTA has to build desire, not manage expectations.

The slide's job is the exchange. Its anatomy:

- **Name the thing they get and use that word as the keyword.** This run: the headline is
  "All five run on the same **key**", the keyword on slide 9 is **KEY**. Slide 8 names it,
  slide 9 asks for it, one idea top to bottom. A vague keyword ("ASK" — ask what?) wastes
  the strongest word on the page.
- The card explains what it does in plain English. No vendor name on the graphic.
- `WHAT YOU GET` replaces `YOU GET BACK`, and it must describe **what is actually sent**.
  If the DM carries access plus a walkthrough, the slide says "where to get it, how to set
  it up, and me walking you through your first one" — not something vaguer.
- **Keep a small dim credit at the bottom** (`#foot8`, 14px, `#6E695C`, y1196): "The tool
  is a developer's. The way I run it is mine." Off the headline, but present. With no
  credit at all the slide implies AC built the tool, and no-hype is the page's position.
- The anchor is a **drawn** mark, not a baked icon, when the pack has its own symbol. The
  key on this run is inline SVG whose **bow is the brand diamond**, so the pack's own
  signature is the thing that unlocks it.

---

## The close (09)

Mark → Gloock rule line (≤820 wide, centred) → keyword card → one body line → footers →
full-gold floor bar with the counter in `#12100A`.

- **ONE ask.** A `SAVE / SEND / FOLLOW / COMMENT` icon row was cut from this pack: four
  asks reliably gets none.
- **Ask them to say WHICH ONE they need.** A qualified opener you can guide beats a wall
  of identical one-word comments, and it is what makes the DM a conversation instead of
  a file drop.
- Footers: `NO HYPE · NO JARGON` left, `ONE REPLY EACH` right.

---

## The walker

~112×160px, akimbo pose, weight-7.2 cut (poster cut — holds against big display type).
Feet welded to the floor bar: the drawn foot cap sits at **89.3%** of the SVG height
(viewBox `0 -10 210 300`, cap at y258), so `top = 1286 − H × 0.893`.

He stands at the leading edge of the gold segment (`lead = segWidth − 74`) and walks
across the pack. **Beat and prompt slides only** — never the cover (one hero) and never
the close (the mark signs).

**He must CLEAR the counter, not be excused from it.** Cap `lead` at **820px**. The first
cut of this pack capped at 900 and his trailing arm crossed the "8 / 9" counter — invisible
in a contact sheet, obvious at full size.

---

## Icon hygiene — new in v3

The baked `assets/icons3d/*.png` are 900×800 with **~60% transparent padding**. Mounted
raw they read as faint smudges. Before every pack:

```bash
python3 SKILL_DIR/scripts/prep_icons.py SKILL_DIR/assets/icons3d ./icons
```

Crops each to its alpha bbox, squares it, then lifts alpha ×2.1 and RGB ×1.28/1.22/1.10.

- **Mount at ~208px**, not 300. Bigger made the wireframes worse, not better — the line
  density stops reading as a mark and starts reading as mesh.
- **`brain.png` fails at feed size** — a point cloud reads as noise. Use `documentstack`
  for explainer slides.
- Gate 9 still applies: alpha-check any new asset before mounting.

---

## The engine

`assets/promptdrop.template.html` — one file, `CONFIG` + `COVERS` + `SLIDE8` + `CONTENT`
at the top, everything else is the engine. Slide types: `cover` · `beat` (rule) ·
`prompt` · `close`. Fonts must sit beside it.

```bash
mkdir -p run && cd run
cp SKILL_DIR/assets/promptdrop.template.html deck.html
cp -r SKILL_DIR/assets/fonts .
python3 SKILL_DIR/scripts/prep_icons.py SKILL_DIR/assets/icons3d ./icons
# edit CONFIG + CONTENT, then:
node SKILL_DIR/scripts/qa_promptdrop.js deck.html          # HARD GATE
node SKILL_DIR/assets/render_slides.js deck.html slides FL
```

### The gate

`scripts/qa_promptdrop.js` walks every slide and, for each visible block, measures the
**clipped** rect (intersected with every `overflow:hidden` ancestor) — then fails on
anything outside the safe frame or sharing ink with another block.

**No exemptions.** The first version of this gate carried `#fig|#count` as an allowed
pair "because the walker stands on the bar", and that exemption is exactly what hid the
counter collision. An exemption in a gate is a defect in hiding. If two things may not
touch, fix the geometry — do not excuse the pair.

Two legitimate accommodations, both narrow: the floor bar owns the bottom band, so
`#count` and `#fig` may extend to y1344; and every measured box must **hug its content**
(no fixed heights on text blocks) or the gate reports box overlaps that are not ink
overlaps.

---

## Verified numbers — the reusable one from this run

**LLMs Get Lost In Multi-Turn Conversation** — Laban, Hayashi, Zhou & Neville
(Microsoft Research + Salesforce Research), arXiv:2505.06120, 9 May 2025. Read direct
from the paper's own HTML, not from coverage.

- **39%** average performance drop across six generation tasks when an instruction is
  revealed gradually instead of given fully specified up front
- 200,000+ simulated conversations, 15 models across 8 families
- Unreliability **+112%**; aptitude drop only 16% — the failure is consistency, not capability
- Authors' verbatim recommendation: **"Consolidate before retrying."**

Wording gates: simulated conversations, so say "in testing", never "in real use"; the
cause is an underspecified instruction revealed gradually, NOT "long chats make AI dumb";
Microsoft Research co-authored it and Microsoft ships Copilot, so disclose; May 2025, so
evergreen not breaking.

---

## Approval flow

Three stops on this run, and the shape held:

1. **The cover board** — every direction rendered at true size, AC's pick named. Also the
   icon board when the pack needs new marks (v2 law, unchanged).
2. **Any slide being restructured** — boarded against the old version side by side, so the
   change is visible rather than described.
3. **The finished pack.**

Arrive with the work done and the call already made; the board is for him to overrule, not
to choose from a blank. Name your pick and say why.

---

## Deliverables per pack

One zip: 9 post-ready PNGs numbered in order, `caption.txt` (SEO first line, one big
number, one question near the end, em-dash CTA carrying the keyword, wording gates, A/B
cover hooks), `dm_reply.txt` (paste-ready, all prompts verbatim, the rule line, access +
install steps, one qualifying question), `posting-note.txt` (order, CTA ladder, grid crop,
gates run, what changed), `deck.html`, and a `qa/` folder with the contact sheet, the
cover checks and any approval boards.

**One question in the caption, not two.** This run drafted a "which of the four lines do
you never write?" question alongside the CTA's "which of the five do you need?" — two
questions is the same failure as four CTAs. The question in the caption must be the one
that routes to the DM.
