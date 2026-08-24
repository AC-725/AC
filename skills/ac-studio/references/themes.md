# The four themes

Shared by both engines. Same names, same block positions, same faces, so a news reel and
a Tool of the Day read as one system. Set the `THEME` constant near the top of whichever
template you are working in.

> **The generating rule:** the progress indicator IS the block. The corner ticks mark the
> edge it runs along. Hierarchy, type case and colour balance move with it.

---

## I · `base` — the figure is the hero

- **Block:** heavy bar sealing the floor, 26px, full bleed.
- **Ticks:** two lower corners.
- **Face:** Gloock. **Hierarchy:** the odometer figure at 276px; the headline shrinks to
  serve it. **Colour:** gold dominant.
- **Use it for:** a single overwhelming number. The default when the story *is* the stat.
- **Constraint:** the hero figure must be **5 characters or fewer** (`$725B`, `66%`,
  `280x`). Longer and it reaches the frame.

## II · `crest` — the headline is the hero

- **Block:** a gold band across the ceiling, 82px. *The band is the progress bar* — it
  fills across the runtime. The track is visible at 0% so it always reads as a band.
- **Ticks:** two upper corners. The frame drops to 118px to clear the band.
- **Face:** Bricolage Grotesque Bold, **set in caps**. **Hierarchy:** headline at 88px,
  figure small. **Colour:** white dominant — there is no gold in the headline at all;
  the band is the accent.
- **Use it for:** a claim that has to be read before it is understood. Newsroom energy.

## III · `column` — the frame splits

- **Block:** the upper half is gold (news engine) or a 220px gold header field (TOD).
- **Bar:** down the left edge, 14px, **two-tone** — black above the fold, gold below.
- **Ticks:** two left corners; the upper one inverts to black.
- **Face:** Italiana. **Hierarchy:** content gathers at the fold. **Colour:** gold field,
  and **black becomes the accent above it**.
- **Use it for:** the most premium story of the week. It is the only theme most people
  will recognise instantly.

**Nothing may cross the boundary.** At load, each scene's real content elements are
measured, the best natural gap is found, and the block slides so that gap lands exactly
on the split; elements are then tagged `.onGold` by settled position. One pass,
deterministic, identical on every render. Layout spacers are excluded — an earlier
iterative version oscillated on them and never converged.

**TOD adaptation:** TOD uses a gold *header field*, not a gold half, because its scenes
carry built components (browser mock, build cards, chart) that cannot invert to
black-on-gold.

## IV · `margin` — even weight, no hero

- **Block:** heavy rule hard against the right edge, 22px.
- **Ticks:** two right corners.
- **Face:** Instrument Serif **Italic**. **Hierarchy:** nothing dominates. **Colour:**
  stone dominant, flush left, one gold figure.
- **Use it for:** the analytical story. The only theme that abandons centred type.
- **Why italic and not lowercase:** `text-transform: lowercase` turns `$725B` into
  `$725b`. Headlines carry figures constantly. Italic is the setting difference that
  leaves numerals alone. Do not "simplify" this back to lowercase.

---

## Rotation

Pick the theme that suits the story's shape, and differ from the previous reel. Check
`run-log.md` for what recent days used. At the creative checkpoint, offer AC **three of
the four**, excluding what was used recently.

Mapping from the retired lighting-based names, for reading old log entries:
`ember → base`, `aurora → crest`, `spotlight → column`, `grid → margin`.

## The thumbnail test

Before you believe a theme works, render it at **140px wide** and look at it. Each of the
four must be identifiable by its gold placement alone. `base` and `margin` are the
closest pair — both mostly black with a thin gold edge, one horizontal and one vertical.
If a change makes them harder to tell apart, the change is wrong.
