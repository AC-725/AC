#!/usr/bin/env python3
"""Restore the corrected personal skills into `~/.claude/skills/`.

Why this exists: `~/.claude/skills/` is repopulated from the claude.ai skills library at the start of
every session, and local edits never sync back. Until the library copies are updated by hand, each new
session starts with the pre-fix versions restored — retired handle, old domain, and three reel skills
competing for the same request.

`system/skills/` holds the corrected copies. This script puts them back in one command.

It will not clobber a library copy that is already correct. Each skill is checked against the
invariants below first; a skill that satisfies them is left alone, which means once the library is
updated this script quietly becomes a no-op and can be deleted along with `system/skills/`.

    python3 system/scripts/sync_skills.py            # restore what's stale
    python3 system/scripts/sync_skills.py --check     # report only, copy nothing
    python3 system/scripts/sync_skills.py --force     # copy regardless of invariants
"""

from __future__ import annotations

import argparse
import filecmp
import os
import shutil
import sys
from pathlib import Path

REPO_SKILLS = Path(__file__).resolve().parent.parent / "skills"
LIVE_SKILLS = Path(os.environ.get("CLAUDE_SKILLS_DIR", Path.home() / ".claude" / "skills"))

# What "already correct" means per skill. required = must all be present somewhere in the skill;
# forbidden = must appear nowhere. Kept deliberately small — these are the facts the fix established,
# not a checksum, so unrelated library edits don't trigger a needless overwrite.
INVARIANTS: dict[str, dict[str, list[str]]] = {
    # The domain marker is spelled out in full: a bare "itsac.ai" is a substring of "@itsac.ai", so it
    # would pass on a copy that has the handle right and the old domain still in place.
    "ac-instagram": {
        "required": ["@itsac.ai", "**Home base:** `itsac.ai`"],
        "forbidden": ["@ac.wins", "point to `ac-wins.com`"],
    },
    "ac-reel-creator": {"required": ["@itsac.ai"], "forbidden": ["@ac.wins"]},
    "ac-tool-of-the-day": {"required": ["SUPERSEDED"], "forbidden": ["@ac.wins"]},
    "ac-ai-news": {"required": ["SUPERSEDED"], "forbidden": ["@ac.wins"]},
}

TEXT_SUFFIXES = {".md", ".html", ".py", ".js", ".sh", ".json", ".txt"}


def read_all_text(root: Path) -> str:
    parts = []
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.suffix in TEXT_SUFFIXES:
            try:
                parts.append(path.read_text(encoding="utf-8", errors="replace"))
            except OSError:
                pass
    return "\n".join(parts)


def check_invariants(name: str, root: Path) -> tuple[bool, str]:
    rules = INVARIANTS.get(name, {})
    blob = read_all_text(root)
    missing = [s for s in rules.get("required", []) if s not in blob]
    present = [s for s in rules.get("forbidden", []) if s in blob]
    if missing or present:
        why = []
        if missing:
            why.append("missing " + ", ".join(repr(s) for s in missing))
        if present:
            why.append("still contains " + ", ".join(repr(s) for s in present))
        return False, "; ".join(why)
    return True, "already correct"


def tree_differs(a: Path, b: Path) -> bool:
    cmp = filecmp.dircmp(a, b)
    if cmp.left_only or cmp.right_only or cmp.diff_files or cmp.funny_files:
        return True
    return any(tree_differs(a / sub, b / sub) for sub in cmp.common_dirs)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="report what would happen, copy nothing")
    ap.add_argument("--force", action="store_true", help="copy even if the live copy looks correct")
    args = ap.parse_args()

    if not REPO_SKILLS.is_dir():
        print(f"no stored skills at {REPO_SKILLS}", file=sys.stderr)
        return 2
    if not LIVE_SKILLS.is_dir():
        print(f"no live skills dir at {LIVE_SKILLS}", file=sys.stderr)
        return 2

    stored = sorted(p for p in REPO_SKILLS.iterdir() if p.is_dir())
    if not stored:
        print(f"{REPO_SKILLS} is empty — nothing to restore.")
        return 0

    synced = skipped = 0
    for src in stored:
        name = src.name
        dst = LIVE_SKILLS / name

        if not dst.exists():
            # Not installed this session. Restoring it would resurrect a skill the library may have
            # intentionally deleted — which is the desired end state for the superseded ones.
            print(f"  --  {name}: not installed this session, leaving alone")
            skipped += 1
            continue

        ok, why = check_invariants(name, dst)
        if ok and not args.force:
            print(f"  ok  {name}: {why}")
            skipped += 1
            continue

        if not tree_differs(src, dst):
            print(f"  ok  {name}: identical to the stored copy")
            skipped += 1
            continue

        if args.check:
            print(f"  >>  {name}: would restore ({why})")
        else:
            shutil.rmtree(dst)
            shutil.copytree(src, dst)
            print(f"  <-  {name}: restored ({why})")
        synced += 1

    print()
    if synced == 0:
        print(f"Nothing to restore — all {skipped} skill(s) already correct.")
        print("If the claude.ai library is updated, system/skills/ and this script can be deleted.")
    else:
        print(f"{'Would restore' if args.check else 'Restored'}: {synced}; left alone: {skipped}.")
        if args.check:
            print("Re-run without --check to apply.")
        else:
            print("Reminder: this only fixes THIS session. Update the claude.ai library to make it stick.")
    return 0


if __name__ == "__main__":
    # Restore default SIGPIPE handling so piping into `head` exits quietly instead of raising
    # BrokenPipeError. Guarded: SIGPIPE does not exist on Windows.
    try:
        import signal

        signal.signal(signal.SIGPIPE, signal.SIG_DFL)
    except (ImportError, AttributeError, ValueError):
        pass
    sys.exit(main())
