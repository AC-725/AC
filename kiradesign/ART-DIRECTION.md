# KIRA Design — Image Art Direction

Eight sections, eight horizontal images, one brand world.

**Why this document exists.** The environment this was built in has no image model, so the
photographic frames below could not be rendered here. What *was* generated procedurally —
material surfaces and atmospheric backdrops — lives in `assets/` and is already wired into
`index.html`. Everything below is the specification for the frames that still need a real
image model or a real camera.

Each entry is written to be pasted directly into an image model, or handed to a
photographer as a shot brief.

---

## Locked brand world

Every frame shares these. Vary composition, never identity.

| | |
|---|---|
| **Palette** | Espresso `#16120E` · Lacquer red `#A02C1C` · Vermilion `#E8621C` · Oak `#C9A984` · Champagne `#C6A87C` · Linen `#EFEAE0` |
| **Grade** | Warm, low-contrast shadows that stay open. Never cool, never crushed to pure black. Highlights roll off; no clipped whites. |
| **Light** | One dominant warm source, raking from upper left. Concealed cove lighting — you see the wall lit, never the fitting. |
| **Lens** | 24–35mm for rooms, 85mm for detail. Verticals perfectly plumb — a converging vertical in an interior shot reads as amateur. |
| **Material vocabulary** | Fluted oak, book-matched walnut, honed limestone, champagne metal, speckled granite, lacquer red |
| **Never** | Cold daylight, blue shadows, HDR halos, wide-angle distortion, empty staged rooms with no light story, visible light fittings |

**Concept spine — *Archive / dossier*.** Each project is a specimen with evidence attached.
Frames are calm, plumb, and documentary rather than aspirational-lifestyle.

**Second-read moment (once across the whole page).** In Section 05 only, a single swatch
sits slightly off the board's grid — the one decision still being made. Nowhere else.

---

## Section 01 — Hero · 21:9

- **Role** hook · **Anchor** image-as-canvas, text overlaid lower-left · **Background mode** full-bleed with tonal overlay
- **Status** ✅ generated — `assets/sections/01-hero.jpg`, already wired in

> Architectural interior detail, fluted pale-oak battens filling the left two-thirds, a deep
> lacquer-red wall meeting them at a clean vertical joint on the right. Warm afternoon light
> rakes from the upper left across the battens, falling off into shadow at the base. No
> furniture, no people. Verticals perfectly plumb, 28mm, warm grade, open shadows.

---

## Section 02 — Honours · 21:9, short band

- **Role** proof · **Anchor** full-width band behind typography · **Background mode** dark texture
- **Status** ✅ generated — `assets/sections/02-honours.jpg`

> Macro of dark speckled granite, almost abstract, lit by a single soft raking light from the
> right. Deep warm charcoal with fine pale mineral flecks. Very low contrast so award
> typography sits over it cleanly. 85mm macro.

---

## Section 03 — Design / Build / Furnish · 16:9

- **Role** educate · **Anchor** three-panel vertical division · **Background mode** color-blocked triptych
- **Status** ✅ generated — `assets/sections/03-model.jpg`

> Three materials meeting edge to edge in equal vertical thirds: fluted pale oak, dark
> speckled granite, brushed champagne metal. Each joint a crisp dark reveal. Even soft
> overhead light. Flat-on, no perspective — a specimen board, not a room.

---

## Section 04 — The Grand Marine Duplex · 3:2 ⚠️ NEEDS REAL PHOTOGRAPHY

- **Role** proof · **Anchor** left two-thirds visual, spec rail right · **Background mode** editorial side-image
- **Status** ⚠️ **placeholder retained.** This frame names a real project. An invented image
  under it would misrepresent delivered work — it must be a photograph of the actual duplex.

**Shot brief for the photographer:** Living area looking toward the sea. Shoot late afternoon
when the water goes grey-green and the interior warms up — that contrast is the whole picture.
Full-height glazing must hold detail in both the room and the view; bracket and blend rather
than letting the window blow out. 24mm, verticals plumb, camera at 1.4m. Include the custom
furniture, exclude styling props.

> *(If a comp is needed before the shoot:)* Luxury Hong Kong duplex living room, full-height
> glazing framing open grey-green water, warm champagne and walnut interior, honed limestone
> floor, concealed cove lighting, late afternoon, 24mm, plumb verticals, warm open-shadow grade.

---

## Section 05 — Material & craft · 16:9

- **Role** educate — *this is the section that makes the interior-design advantage visible*
- **Anchor** overhead flat-lay · **Background mode** material as the entire visual
- **Status** ✅ generated — `assets/sections/05-materials.jpg`

> Overhead flat-lay of interior material samples overlapping on a fluted oak surface: honed
> limestone, terrazzo with neutral aggregate, book-matched walnut veneer, white marble with
> thin grey veining, dark speckled granite, brushed champagne metal, one deep lacquer-red
> panel. Soft warm light from upper left, shallow contact shadows. One swatch sits slightly
> off the grid.

---

## Section 06 — Clients · 16:9, short band

- **Role** proof · **Anchor** quiet band behind developer names · **Background mode** micro-texture
- **Status** ✅ generated — `assets/sections/06-clients.jpg`

> Very dark warm stone, near-abstract, almost no incident. A single soft pool of light upper
> right. Deliberately quiet — the developer names are the content, this is only ground.

---

## Section 07 — Studio · 16:9 (crops to 4:5)

- **Role** trust · **Anchor** right-third caption, left two-thirds visual · **Background mode** full-bleed
- **Status** ✅ generated as the reception — `assets/sections/07-studio.jpg`
- ⚠️ **A portrait of Kim Wong should replace this.** A founder's face outperforms a room here.

> KIRA's reception: deep lacquer-red wall with black lettering, pale oak slatted joinery
> entering from the left, a low timber bench. Warm light from the left, falling off toward the
> right. 35mm, plumb verticals.
>
> *(Portrait alternative — preferred:)* Environmental portrait of a Hong Kong interior designer
> in his studio, standing beside a material board, three-quarter turn, natural window light
> from the left, warm neutral palette, 85mm at f/2, calm and unposed.

---

## Section 08 — Enquiry · 16:9

- **Role** convert · **Anchor** stacked, text over a calm ground · **Background mode** atmospheric
- **Status** ✅ generated — `assets/sections/08-contact.jpg`

> Empty corner of a finished interior: honed limestone floor meeting a pale wall, a soft pool
> of warm light on the floor, deep shadow at the edges. Almost nothing in frame. Calm and
> resolved — the visual equivalent of a finished handover.

---

## What to commission first

If there is budget for one shoot, it is **Section 04**. The named project frames are the only
ones that cannot be substituted, and they are the ones a developer scrolls to.

**Priority order**

1. The Grand Marine Duplex — award-winning, sea-facing, the strongest single asset
2. Kim Wong portrait — Section 07
3. The Knightsbridge and The Grands — the other two named plates
4. Everything else — the generated backdrops in `assets/` hold these positions indefinitely

## Regenerating the procedural assets

```
cd kiradesign && python3 scripts/make_assets.py     # requires numpy + Pillow
```

Seeds are fixed, so output is reproducible. Change the `seed=` arguments in
`build_materials()` / `build_sections()` for different variations of the same materials.
