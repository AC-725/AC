# Icon set

Icons are minimal gold **line-icons** defined in the `ICONS` registry near the top of
`assets/reel.template.html`. Reference them by key (in `build.cards[].icon`, `steps.items[].icon`,
`rule.fromIcon/toIcon`). They're drawn on a `0 0 100 100` viewBox, stroke only (no fill), so they
match the "quiet luxury" line-art look automatically.

## Available keys
`globe` · `calculator` · `quiz` (checklist) · `browser` (landing page) · `calendar` (booking) ·
`plus` (new design) · `chat` (describe) · `rocket` (publish) · `pdf` · `tool` (browser+check) ·
`check` (badge) · `save` (bookmark) · `gear` · `bolt` (default fallback) · `chart` (bars) ·
`doc` (document) · `audio` (headphones) · `cards` (stacked cards)

## Adding a new icon
Add one line to the `ICONS` object: `key:'<inner svg paths>'`. Rules that keep it on-brand:
- viewBox is `0 0 100 100`; center the art roughly in the box.
- Use `path`/`line`/`circle`/`rect` with **no fill** — the CSS strokes them gold at width 5.
- Keep it to a few strokes. Simple reads better at small sizes than detailed.
- Test by setting it as a `build.cards` icon and rendering a QA frame of Scene C.

**Example** (a simple document icon):
`doc:'<rect x="28" y="14" width="44" height="72" rx="6"/><line x1="38" y1="36" x2="62" y2="36"/><line x1="38" y1="50" x2="62" y2="50"/><line x1="38" y1="64" x2="54" y2="64"/>'`

## Matching icons to a tool
Pick icons that literally depict the 4 build-types / use-cases and the 3 steps. If a concept has no
matching icon, either add one (above) or fall back to the closest fit — `bolt` is the safe default and
still looks intentional. Don't overthink it; the label text carries the meaning, the icon is accent.
