#!/usr/bin/env python3
"""Re-apply the canonical Instagram handle to the personal skills.

Why this exists: `~/.claude/skills/` is repopulated from the claude.ai skills library at the start of
every session, and a local edit never syncs back. Until the library copies are updated by hand, every
new session starts with the retired `@ac.wins` restored across the four Instagram skills.

This script re-applies the change in one command. It is idempotent — run it as many times as you like.
Once the claude.ai copies are updated, this script becomes a no-op and can be deleted.

Canonical handle: see system/foundation/brand.md.

    python3 system/scripts/reapply_handle.py            # apply
    python3 system/scripts/reapply_handle.py --check     # report only, change nothing
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

SKILLS = Path(os.environ.get("CLAUDE_SKILLS_DIR", Path.home() / ".claude" / "skills"))
IG_SKILLS = ("ac-instagram", "ac-reel-creator", "ac-tool-of-the-day", "ac-ai-news")

RETIRED = "@ac.wins"
CANONICAL = "@itsac.ai"

# The mechanical swap. The literal dot and leading @ mean this cannot touch the website
# `ac-wins.com`, the AC Wins client-services skills, or the old `@austin.acwins` handle.
MECHANICAL = (re.compile(re.escape(RETIRED)), CANONICAL)

# Structural rewrites. A plain swap would leave these self-contradicting — the first would
# name the canonical handle as both primary and its own backup, the second would read
# "Default @itsac.ai. To use @itsac.ai instead".
STRUCTURAL: list[tuple[str, str, str]] = [
    (
        "ac-instagram/references/part-1-foundation.md",
        "**Handle** — primary is `@ac.wins` (recommended). Backups if unavailable:\n"
        "`@itsac.ai`, `@austin.acwins`, `@connectthedots.ai`.",
        "**Handle:** `@itsac.ai` — the one handle, everywhere. Every Instagram surface optimizes\n"
        "for it: profile, bio, watermark, CTAs, captions, and all growth and SEO work. Do not list\n"
        "or use alternates; a primary-plus-backups list is exactly what let two handles ship side\n"
        "by side. Canonical value: `<repo>/system/foundation/brand.md`.",
    ),
    (
        "ac-reel-creator/references/brand.md",
        "- **Handle:** on every frame (footer watermark + the CTA card), set in ONE place — the\n"
        "  `HANDLE` constant in `reel.template.html`. Default `@itsac.ai`. To use `@ac.wins`\n"
        "  instead (the handle on AC's Instagram, ac-instagram, and ac-tool-of-the-day), change\n"
        "  that single line. Never hardcode a handle elsewhere or mix two on one reel.",
        "- **Handle:** `@itsac.ai` on every frame (footer watermark + the CTA card), set in ONE\n"
        "  place — the `HANDLE` constant in `reel.template.html`. This is the handle across all of\n"
        "  AC's Instagram, including ac-instagram, ac-tool-of-the-day, and ac-ai-news. There is no\n"
        "  alternate: never hardcode a handle elsewhere, never mix two on one reel. Canonical\n"
        "  value: `<repo>/system/foundation/brand.md`.",
    ),
    (
        "ac-instagram/SKILL.md",
        "- **Handle:** `@ac.wins` (primary)\n"
        "- **Home base:** `ac-wins.com` — Austin helps regular businesses (not tech\n"
        "  giants) actually use AI. Hong Kong → worldwide.\n",
        "- **Handle:** `@itsac.ai` — the one handle, on every surface. No alternates.\n"
        "- **Home base:** `ac-wins.com` — Austin helps regular businesses (not tech\n"
        "  giants) actually use AI. Hong Kong → worldwide.\n"
        "  *(Carried over from before the handle change and not yet re-confirmed against\n"
        "  `@itsac.ai` — ask Austin before changing it, and never invent a new domain.)*\n",
    ),
    (
        "ac-reel-creator/assets/reel.template.html",
        "   switch handles everywhere (e.g. '@ac.wins'). Do not hardcode it elsewhere. ===== */",
        "   switch handles everywhere. Do not hardcode it elsewhere. There is no alternate\n"
        "   handle — see <repo>/system/foundation/brand.md. ===== */",
    ),
    (
        "ac-reel-creator/assets/tod.template.html",
        "   everywhere (e.g. '@ac.wins'). Keep it in sync with cover.template.html. ===== */",
        "   everywhere. Keep it in sync with cover.template.html. There is no alternate\n"
        "   handle — see <repo>/system/foundation/brand.md. ===== */",
    ),
]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="report what would change, write nothing")
    args = ap.parse_args()

    if not SKILLS.is_dir():
        print(f"skills dir not found: {SKILLS}", file=sys.stderr)
        return 2

    missing = [s for s in IG_SKILLS if not (SKILLS / s).is_dir()]
    if missing:
        print(f"note: not installed this session, skipping — {', '.join(missing)}")

    # Structural rewrites run first: they consume text containing the retired handle, so
    # letting the mechanical swap go first would stop them from matching.
    structural_done = 0
    for rel, old, new in STRUCTURAL:
        path = SKILLS / rel
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        if new in text:
            continue  # already applied
        if old not in text:
            print(f"  ?  {rel}: structural block not found and not already applied — check by hand")
            continue
        if not args.check:
            path.write_text(text.replace(old, new, 1), encoding="utf-8")
        print(f"  {'would fix' if args.check else 'fixed'}  {rel} (structural)")
        structural_done += 1

    pattern, replacement = MECHANICAL
    swept = 0
    for skill in IG_SKILLS:
        root = SKILLS / skill
        if not root.is_dir():
            continue
        for path in sorted(root.rglob("*")):
            if not path.is_file() or path.suffix not in {".md", ".html", ".py", ".js", ".sh", ".json"}:
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            hits = len(pattern.findall(text))
            if not hits:
                continue
            if not args.check:
                path.write_text(pattern.sub(replacement, text), encoding="utf-8")
            print(f"  {'would swap' if args.check else 'swapped'}  {path.relative_to(SKILLS)} ({hits}×)")
            swept += hits

    total = structural_done + swept
    if total == 0:
        print(f"Nothing to do — {CANONICAL} already canonical across {len(IG_SKILLS)} Instagram skills.")
    else:
        verb = "would change" if args.check else "changed"
        print(f"\n{verb}: {structural_done} structural block(s), {swept} handle occurrence(s).")
        if args.check:
            # --check writes nothing, so the structural blocks it reports still contain their
            # retired handles when the sweep counts them. The two figures overlap by design.
            print("(counts overlap: the structural blocks above also hold some of those occurrences)")
            print("Re-run without --check to apply.")

    left = sum(
        len(pattern.findall(p.read_text(encoding="utf-8", errors="ignore")))
        for s in IG_SKILLS
        for p in (SKILLS / s).rglob("*")
        if (SKILLS / s).is_dir() and p.is_file() and p.suffix in {".md", ".html", ".py", ".js", ".sh"}
    )
    if left and not args.check:
        print(f"WARNING: {left} occurrence(s) of {RETIRED} still present — inspect manually.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
