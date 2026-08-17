# Layout QA — the scene gates

Run before every render. Not optional.

```bash
bash SKILL_DIR/scripts/qa_layout.sh reel.html          # or tod.html, or several at once
```

Exits non-zero if any gate fails. If it fails, fix the template — never ship past it.
`SAFE_ALL_THEMES=1` makes gate 6 check all four themes rather than only the one set.

---

## Why these gates

**Gate 1 · bounds.** Walks the whole timeline and checks that no element's box overlaps
a sibling's, and that nothing leaves the 1080×1920 frame.

**Gate 2 · glyph ink.** For each scene at its settled moment, it shoots a reference frame
with all content hidden, then one frame per element with only that element visible, and
diffs to get each element's **true glyph ink**. Then it compares those.

**Gate 6 · the app-safe window.** Everything a viewer must READ has to sit inside
`170 < y < 1300`, and `x < 930` below mid-frame. Those numbers are Instagram's own chrome,
measured off AC's Reels-player screenshot: the top scrim, the username/caption/audio block,
and the like/comment/share rail. Gate 6 also checks that the typed caption and the watermark
clear the scene ink and each other.

Gate 6 exists because **gates 1 and 2 check the FILE, and the file is not what the viewer
sees.** A frame can be geometrically perfect and still be unreadable once the app draws over
it — which is exactly how a Spine reel got rejected in playback after passing every gate
(run-log Day 23, second pass), and how every TOD shipped with its captions covered until
2026-08-06. It also covers a structural blind spot in gate 2: `#subline` and `#wm` are
SIBLINGS of the scenes, and gate 2 only ever compares children inside one scene, so a caption
sitting on top of scene copy passes gate 2 in silence.

Gate 2 exists because **gate 1 cannot see a descender.** Glyph ink routinely overflows its
line box, so two elements can have perfectly separated boxes while the ink visibly
collides. This was found the hard way: with the neutral master copy everything measured
clean, but with a real headline — *"Big tech will pay / $725B this year."* — MARGIN's
italic descenders overlapped the figures below by 2px. Box checks said fine.

## The standard

- **Separate content groups** (headline vs figure vs sub vs chip vs handle): **≥18px** of
  clear glyph space.
- **Two lines of one headline:** judged proportionally, minimum 11px. Tight leading
  between the lines of a single headline is correct typography; a flat rule would force
  ugly leading on small sizes.

Both are encoded in `scripts/audit_report.py`. Change the standard there, in one place.

## Always test with real copy

The neutral master copy hides collisions because it has no descenders under figures and
no long words. Before shipping a template change, swap in a stress case:

```
line1:'Big tech will pay'   line2:'$725B this year.'   num: $725B
```

Long lines, deep descenders, a currency figure, and a capital letter that `lowercase`
would destroy. If it passes with that, it passes.

## Scope

The auditor reads the page's own `SCENES` array, so it works on either engine without
being told the timeline. It handles inline SVG (whose `className` is an
`SVGAnimatedString`, not a string — this broke the first version).

## Known and unfixed

`reel.template.html` under the **column** theme fails gate 6: its fold is pinned at 50%, so
scene ink runs to ~y1232 and there is no clear band left before y1300 for the caption. The
caption sits at y≈1666 and one scene-A sub reaches x=964, under the action rail. Fixing it is
a recomposition of column around the fixed fold, not a padding tweak. Gate 6 reports it on
every run so it stays visible instead of silently shipping. The other three reel themes, all
four TOD themes, and Spine are clean.

## The other test that matters

Gates catch collisions. They cannot tell you the themes look alike. **Render all four at
140px and look at them** — see `references/themes.md`.
