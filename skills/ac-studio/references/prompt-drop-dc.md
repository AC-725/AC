# Prompt Drop — the Claude Design engine (v4 · 2026-09-09)

Folded into ac-studio from AC's standalone `ac-prompt-drop` skill (Pack 08 "The Edges",
built in Claude Design). **Text below is his spec, verbatim.** Paths (`templates/prompt-drop/…`,
`bake/…`, `export/…`, `assets/logos/…`) are Claude Design project paths; the template
`.dc.html`, `bake_icons.html`, the logo PNGs and the `pd08-*` icons are NOT in this package
yet — see SKILL.md, update 2026-09-09. v3 (`prompt-drop.md`) remains the shell-engine law.

Conflicts resolved in SKILL.md, restated here so this file can be read alone:
- Cover: v4 INTRO (heading + pack name + hook question + WORKS IN strip) on the DC path;
  the v3 question hero stays legal on the shell engine.
- Icons: polished MeshPhysical for packs; matte for other carousels; wireframe legal.
- Prompts: "You are X…" house style, never "Act as".
- The walker line under 01 Intro and the "02–08" line under Pack structure disagree;
  the pack-structure line governs (walker on 02–08, off the intro) until AC says otherwise.

---

# Prompt Drop (established 2026-09-09, Pack 08 "The Edges")

## Start
1. Copy `templates/prompt-drop/Prompt Drop Template.dc.html` to root as `Prompt Drop NN <Name>.dc.html`. Repoint `../../` paths to root.
2. Copy `templates/prompt-drop/bake_icons.html` to `bake/pdNN_icons.html`.
3. Ask AC before baking: which icon per slide, intro hero object, any shape changes. Two question rounds max.

## Pack structure (9 slides, always)
01 Intro · 02 Rule · 03–07 Prompts · 08 Exchange · 09 Close. Counter n / 9 on every slide. Walker on 02–08 at the gold segment's leading edge, lead capped 820. No Saturday or day/date on any slide.

### 01 Intro
- Label line: `PACK NN · FIVE PROMPTS · ONE RULE` (dim gold, FIVE PROMPTS in gold-500)
- Heading Gloock 124px: "Prompt Drop" cream, pack name italic in gradient gold (the only gradient text allowed here)
- Hook question Gloock 44px, last word gold, inside the 1080 centre crop (top ≤ 500)
- Sub copy: cream / muted / whisper three-step
- `WORKS IN` strip: ChatGPT · Claude · Gemini, dim-gold marks in 56px gold rings
- Hero icon 400px right, 22% stat (or the pack's one number) in cream, five mini icons across the bottom (01–04 at .55 opacity, 05 lit), walker, SAVE · SWIPE cue

### 02 Rule
Four lines Gloock 52px, only the fourth in gold. `PASTE INTO` platform strip. Anchor: the capstone icon at .85.

### 03–07 Prompts
Label `PROMPT 0N · PILLAR`, Gloock 60px headline, anchor 208px top-right, prompt box (#0E0E0E, gold hairline, Poppins 35px), slots in gold, `YOU GET BACK` payoff with one gold phrase. Content column top 466, gap 44.

### 08 Exchange · 09 Close
08: drawn diamond corners lit, explainer box, WHAT YOU GET, footnote ≥20px. 09: hook line, Comment KEYWORD box, one reply each.

## Gold law
One gold idea per zone. Gold words = slots + one payoff phrase. Dim → bright gold hierarchy on labels. Never four gold lines in a list.

## Prompt house style
"You are X. Input. Output shape. Done line." No "Act as". Fixed output shape (numbered, labelled, line counts), no disclaimers.

## Icons
three.js, MeshPhysical (roughness .14, metalness .95, clearcoat 1, RoomEnvironment PMREM, ACES). Bevelled extrudes, no grey slabs; engraving in deep gold #6E5626. Key 3.0 + gold rim 1.8 + kick 1.2. Render 512 @ pixelRatio 2, capture via snapshot_element scale 2 → `assets/icons3d/pdNN-<name>.png` (1024px). Check every icon fits its frame before capture.

## Platform logos
Cut from AC's supplied sheet, recoloured #C9A961, `assets/logos/{chatgpt,claude,gemini}.png`. Appear on 01 + 02 only.

## Ship
- `export/pdNN-01…09.png` at 1x via snapshot_element on `[data-screen-label]`
- Story cover `Prompt Drop NN Story.dc.html` (1080x1920) → `export/pdNN-story.png`
- `PDNN caption + DM.md`: caption (base named, one question, em-dash CTA lead) + one-message DM with all prompts
- Update the source md with final wording and a REVISION line

## Gate before export
No text/image bbox intersections (walker vs payoff is the usual one). Intro hook inside centre crop. Read every slide at 140px. Header "PROMPT DROP ⟷ @itsac.ai" overlap flag is a known false positive.
