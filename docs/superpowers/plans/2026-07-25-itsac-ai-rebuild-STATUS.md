# @itsac.ai Rebuild — Status

**Design spec:** `2026-07-25-itsac-ai-rebuild-design.md`
**Infrastructure plan:** `2026-07-25-itsac-ai-rebuild.md`

## Done

- `itsac-instagram` brand protocol skill — positioning, voice, visual system,
  content engine, launch sequence. Vendored into `.claude/skills/`, version
  controlled, loads automatically in this repo.
- `ac-reel-creator` vendored into the repo, so template edits are tracked.
- Font pipeline: Space Grotesk + JetBrains Mono committed as binaries, an
  idempotent install script, and a test that actually detects missing fonts.
- Reel templates retyped. Body copy stays in Space Grotesk — monospace is for
  numbers, labels, and verdicts, not paragraphs.
- Verdict color tokens (`#4ADE80` works / `#F87171` failed) in both reel
  templates and the brand reference.
- Stale references retired: no `ac-instagram`, `Lora`, `Poppins`, `@ac.wins`,
  or "AI in Plain English" survives in the vendored skill.
- Screenshot frame template for proof-layer posts, with a structural test.

## Bugs found and fixed along the way

- **Reels were never rendering in the brand fonts.** The templates named `Lora`
  and `Poppins` with no `@font-face` and no webfont link, and neither font was
  installed. Chromium substituted a default sans on every render, silently.
- **The first font test could not detect its own failure mode.** It compared
  brand-font width against the CSS generic keywords `sans-serif` / `monospace`.
  Chromium resolves an unrecognized *specific* family through a different
  fallback path than a generic keyword, so the widths never collided and the
  test passed with zero fonts installed. Fixed by comparing against a
  guaranteed-nonexistent family; verified by removing the fonts and watching
  all four measurements collapse to an identical `586.640625`.

## Not started — needs Austin

Writing the first 9 posts is blocked on real testing. A bakeoff, teardown, or
failure post requires tools he has actually run; inventing results would break
the brand's core rule that every claim carries a real receipt.

**To unblock:** pick the bakeoff subject (3–4 tools doing one task), run them,
and keep the screenshots and numbers. That becomes the strongest launch post.

Manual account steps, none of which any tooling here can perform — Instagram is
unreachable from this environment and there is no API access:

1. Name field → `AC · AI tools, tested`; bio and avatar per
   `.claude/skills/itsac-instagram/references/part-3-launch.md`.
2. Create four empty highlights: `Start Here`, `Bakeoffs`, `Stacks`, `Failures`.
3. Produce all 9 pieces **before** archiving the old grid, then archive and post
   them across 2–3 days. The spec's literal order (archive first) would leave
   the page empty during the highest-curiosity window.

## Deferred by decision

Monetization, offers, and the link-in-bio replacement. The account is
audience-first; revisit once the audience exists. Standing tension to revisit
then: the page targets builders while `ac-wins.com` sells to businesses.

## Environment notes

- Render and test commands need `NODE_PATH="$(npm root -g)"` — no local
  `node_modules`, Playwright is global-only. This affects the vendored
  `render_frames.js` too.
- Commits on this branch are unsigned and show as Unverified on GitHub. The
  configured SSH signing key at `/home/claude/.ssh/commit_signing_key.pub` is a
  0-byte file, so signing is impossible here regardless of git config.
