# Reel frame geometry — crest, 1080x1920

Passes gates 1, 2 and 6.

| Element | y | Notes |
| --- | --- | --- |
| Crest band | 0–96 | full bleed, `--gold-block`, 1px `hairline-on-gold` under it |
| Frame box + corner ticks | 112–1332 | stop the box at 1332; do not run it into the app chrome |
| Kicker (left x140) + watermark (centred) | 182–208 | kicker carries the pillar only |
| Scene label / eyebrow | 316 | 26px, .42em, gold-whisper |
| Headline, 2 lines max | 358–580 | 104px (92px if a line exceeds 14 caps) |
| Hero figure or compare row | 600–800 | |
| The lane / graphic band | 800–1060 | keep ink above y960 wherever it runs past x930 |
| Source credit | 1054 | 20px, .2em, gold-whisper, one line |
| Subtitle carrier | 1150 | per the shipped reel kit |
| Empty black | 1332+ | never reclaim it |

Text column is x140–940. The AC figure stands at x836 with its feet on the lane's *current*
screen baseline (interpolate the feet with the camera, or it floats).


---

## Superseded 2026-08-26 — four hard bands

The y-table above is retired for AI News reels. Use the four-band system in
no-overlap-system.md Step 0: CHROME 0-176, TYPE 196-640, STAGE 640-1160, SUB 1170-1300, dead
black below 1300. Each band is a clipped box; the type band is never inside a camera transform,
and the stage camera pans on X only (no zoom). Subject closeness comes from scaling each subject
about its planted foot, not from a camera scale.

## Column theme · reel — door stage geometry (Day 41, 2026-09-11)

Doors 116×250 on floor y=1120, pitch 156, lane x400–984. Camera pans X only; the active
door scales 1.18 about its foot. Leaf hinged left, ajar = 34% width, shuts over .6s, bolt
slides .35s after. **Bolt:** door foot, y = floor−14, inside the jamb, no overhang.
**Handle dot:** y = floor−52. **Logo:** high on the leaf, drops 54→82 as it shuts.
Reason this is written down: the first bolt crossed the vendor mark and the gate missed it
because it measured the door `<g>`, not its parts — see `no-overlap-system.md`, Step 3e.
