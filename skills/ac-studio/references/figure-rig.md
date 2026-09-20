# The AC Figure Rig — the narrator

Approved 26 Aug 2026. Canonical file in the project: `AC Figure Rig.dc.html`.
Built from AC's own artwork (`assets/ac-figure-trim.png`), not a redraw of a
generic pictogram. Three candidate constructions were shown; he picked the brand
figure and specified every property below.

---

## Construction

Authored in a `0 0 600 1050` viewBox as **stroke geometry**, not filled shapes.

| Part | Spec |
| --- | --- |
| Stroke | `#E4C468`, **flat — no gradient ramp**, `stroke-linecap/linejoin: round`, width 20 |
| Head | hollow circle, `cx 300 cy 200 r 185` — never filled |
| Neck / torso | one line, `M300 800 L300 400` |
| Collar strokes | `M262 402 L286 468` and `M338 402 L314 468` |
| Glasses | two filled lenses, `rect 98×58 rx 27` at (168,170) and (292,160) |
| Bridge / temples | three 12-width strokes: `M266 192L292 184`, `M168 196L112 180`, `M390 172L446 148` |
| Raised eyebrow | `M300 128 Q346 100 396 118`, width 16 |
| Mouth mark | `rect 18×52 rx 8` at (288,248), fill `#F0DFA0` |
| Legs | thigh `M300 800L300 915`, shin `M300 915L300 1030` |
| Feet | **none.** The shin ends in its rounded cap and the cap touches the rule. |

**Full face at every size** — glasses, eyebrow and mouth mark are never dropped,
even at the far-lane size where the mouth renders ~1.5px. That was an explicit
choice over a size threshold.

**Stroke scales with the figure.** Same drawing, bigger or smaller — never a
constant-width stroke over a changing body.

---

## Joints

Six, nested so rotations compose:

```
hip (300,800)
  thigh  → knee (300,915) → shin
  lean   → torso, head, face, both arms
             shoulder (300,505) → upper arm
               elbow (300,600) → forearm
```

Sign convention in this viewBox: a **positive** rotation swings a downward limb's
far end to the **left** (backward, for a figure facing right). Lean is positive to
tip the torso forward.

## Pose table

| Pose | lt | rt | lean | al | alf | ar | arf |
| --- | --- | --- | --- | --- | --- | --- | --- |
| stand | 17 | −21 | 0 | 50 | −88 | −41 | 34 |
| turn | 14 | −14 | 0 | 22 | −10 | −22 | 10 |
| point | 14 | −18 | 0 | 45 | −80 | −95 | −5 |
| watch | 14 | −14 | 0 | 30 | −14 | −30 | 14 |
| type | 12 | −14 | 5 | −18 | −68 | −12 | −72 |
| win | 16 | −20 | 0 | 150 | −15 | −150 | 15 |
| run | 30 (ls 75) | −26 (rs 14) | 8 | −40 | −55 | 34 | 50 |

Run is the only pose using knee rotations. On a run the lead foot lands slightly
short of the rule — drop the body by the overshoot, never stretch the leg.

---

## Placement and behaviour in a reel

- **Lane 2, left of centre, in every beat.** It never leaves until the sign-off.
- When a graphic needs the stage it **shrinks to the far lane at 55% and watches**
  (`watch` pose, opacity 0.55).
- Full size in the stage band: ~250px wide (≈437 tall) with the foot glyph at
  98.1% of svg height — set `top = floorY − height × 0.981` so the cap welds to the
  rule.
- **Gold belongs to the figure by default**, so type stays cream. When the stage
  graphic takes the gold, the figure steps back and dims.
- The figure narrates; **the mark signs**. On the final beat the figure fades out
  and `ac-mark.png` scales in — never both as heroes in the same frame.
