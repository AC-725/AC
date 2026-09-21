# Two-subject comparisons: make the difference legible in one frame

AC's note, 2026-08-25: two abstract marks racing read as one blob. What fixed it:

- **Separate lanes**, 120px apart, each with its own rule (gold lane for the machine, 1px
  ink-alpha lane for the human).
- **Draw the subjects, don't abbreviate them.** Abstract blades read as identical blobs at
  thumbnail size. What worked: ~145px pictograms with a head, torso, one driving arm and two
  legs on a stride cycle (`sin(t*19)`, amplitude scaled by speed) — a blocky gold machine with
  a black visor slit versus a white figure in the real kit. AC's call, 2026-08-25: if the
  subject is a named person, put their **team colours** on them (Bolt: yellow vest, green band,
  white bib, dark shorts, green shoes). The gold-means-AI law survives because the human is
  mostly warm ink and the machine is solid gold.
- **Label the lane, not the runner.** Travelling labels crossed the numerals above and stacked
  a second BOLT under the row label. Static tags sitting on each lane's own rule (y just above
  the rule, at the start of the lane) never collide and read as a legend.
- Colour law: gold = the new thing, warm ink = the human, dim gold = a year ago.
- **Team colours are a declared exception now** (AC, 2026-09-21, under the three-colour law in
  `imagery-pack.md` §5). They go on only when Stop 0 declares `colours.team` — the named
  subject, the hexes, the reason — and only on the stage subject. Undeclared, the human runs in
  cream. Gate 10 is told the hexes through `produce.sh`.
