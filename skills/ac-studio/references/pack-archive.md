# The pack archive — every imagery pack the page has shipped

One row per pack, newest first. The archive exists for two reasons: **no hero object
repeats inside 14 days** (the Stop 0 sheet checks this line first), and a later post on
the same topic may **re-bake** an archived object into its own pack's look instead of
inventing a new one. Re-baked, never mounted as-is: a pack is one family, and an object
from another family reads as a sticker.

The baked PNGs live where the row says. Packs built in a shell ride in the run zip under
`pack/`; packs built in Claude Design stay in that project until AC sends them.

| Date | Pack | Topic · number | Format | Dimension · look | Objects (hero first) | Colours | Files |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-09-13 | Workflow Builder (Pack 09) | prompts that write prompts · Goldman 76 / 14 | prompt drop 7 | 3D · wire (reference sheet overrode polished) | geartrain (hero) · gear · fanoffive · speechbubble · docstack | black · gold · cream · **red** on the rule slide (AC's pick) | Claude Design project "Weekend content preparation" — `assets/icons3d/pd09-*.png` not in package |
| 2026-09-13 | 76 / 14 (Day 42 reel) | Goldman 10KSB: 76% use AI, 14% integrate | reel 6 beats · crest | 3D · wire + GS wordmark in band | toolbox → workbench stage · docstack · gear | black · gold · cream | Claude Design project — not in package |
| 2026-09-12 | Two Counts | a loud claim vs the real count | carousel 7 · crest | 3D · wire (particle fill) | hourglass (cover) · datachart · documentstack · globe-v2 · shield · mark | black · gold · cream · **red pair** on the hero numbers | Claude Design project `assets/icons/*.png` — not in package |
| 2026-09-11 | Three labs locked the door (Day 41) | 650+ security teams · OpenAI / Google / Anthropic | reel · column | 3D · matte | padlock (hero) · three doors (stage) · vendor marks recoloured `#C9A961` | black · gold · cream | `assets/icons3d/matte/padlock.png` + `assets/logos/*` — in AC's Claude Design project |
| 2026-09-09 | The Edges (Pack 08) | Pew · where AI answers go wrong | prompt drop 9 | 3D · polished | pd08 set (hero + five) | black · gold · cream | Claude Design project — not in package |
| 2026-09-03 | AI Efficiency Tier List + Iceberg | Gallup 52 / 30 / 15 (May 2026) | two statics 1080×1350 · base | 3D matte ladder (72px) + 2D flat berg (traced from AC's reference) | trophy · medal · ribbon · ticket · deflated balloon · iceberg (flat) | black · gold · cream (gold gradations) | Claude Design — bakes in `ac-studio-lab/threejs-lab/tierlist/` |
| 2026-09-02 | Ask, don't tell (Day 40) | technique day carousel | carousel 7 | 3D · matte (the first matte set) | chip (hero) · bubbles · scale · dial · key · question · messagestack · hourglass · shield · brain | black · gold · cream | lost in the 4 Sep packaging regression — bake page `ac-studio-lab/threejs-lab/bake_icons_day40.html` |
| 2026-08-30 | The Finish Line (Pack 07) | LLMs lose 39% when the ask arrives in pieces | prompt drop 9 | 3D · wire | hourglass (cover) · chatbubbles · envelope · datachart · brain · shield · key (drawn, bow = diamond) | black · gold · cream | `assets/icons3d/*.png` (wire set) · board `assets/icon-boards/finish-line-icon-board.png` |
| 2026-08-22 | The twelve (catalog bake) | — | bench | 3D · wire | envelope · hourglass · brain · chatbubbles · documentstack · shield · coinstack · rocket · robotarm · globeroutes · hkjunkboat · datachart | — | `assets/icons3d/` — the bench, not a pack |

## Filing a pack

After Stop 2, add the row above, newest first, with the hero first in the objects
column and the colours as declared at Stop 0 (name the red element if red was on).
Then run the persist step — an archive row that never leaves the session did not happen.
