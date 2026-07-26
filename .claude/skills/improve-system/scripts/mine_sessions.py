#!/usr/bin/env python3
"""Mine Claude Code session transcripts for learnings the system never captured.

Claude Code writes one JSONL file per session under
``~/.claude/projects/<cwd-slug>/<session-id>.jsonl``. Austin's own turns are in
there verbatim, which makes the transcripts the only honest record of what he
had to correct, repeat, or explain twice. Every one of those is a rule that was
missing from a skill.

This script pulls out his turns and tags the ones that carry signal. It does not
decide anything — reading and routing is the agent's job.

Usage
-----
    python3 mine_sessions.py                  # last 14 days, signal-bearing turns
    python3 mine_sessions.py --days 30
    python3 mine_sessions.py --all            # every turn, not just tagged ones
    python3 mine_sessions.py --project AC     # only sessions whose cwd matches "AC"
    python3 mine_sessions.py --inventory      # just list sessions, mine nothing

Exit codes: 0 on success, 2 when no transcripts were found at all.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import Counter
from datetime import datetime, timedelta, timezone
from pathlib import Path

PROJECTS_DIR = Path(os.environ.get("CLAUDE_PROJECTS_DIR", Path.home() / ".claude" / "projects"))

# Text the harness injects into the user role. None of it is Austin talking.
INJECTED_PREFIXES = (
    "<command-name>",
    "<command-message>",
    "<local-command-stdout>",
    "<local-command-stderr>",
    "<system-reminder>",
    "<user-prompt-submit-hook>",
    "<github-webhook-activity>",
    "<task-notification>",
    "Caveat: The messages below",
    "[Request interrupted",
    "API Error",
)

# Ordered most- to least-specific: a turn is tagged with the first category that
# matches, so "always do X" reads as a standing rule rather than a correction.
SIGNALS: list[tuple[str, str]] = [
    (
        "RULE",
        r"\b(from now on|going forward|every time|each time|by default|as a rule|"
        r"always|never|make sure (?:you|to)|remember to|remember that|"
        r"i want you to|don't ever|rule is)\b",
    ),
    (
        "CORRECTION",
        r"(\bno,|\bnope\b|\bwrong\b|that'?s not|that isn'?t|not what i|"
        r"\bactually\b|\binstead\b|i (?:said|asked|told you)|"
        r"you (?:missed|forgot|ignored|didn'?t)|\bstop\b|\brevert\b|\bundo\b|"
        r"\bdon'?t\b|\bdoesn'?t\b|why did you|shouldn'?t)",
    ),
    (
        "VOICE",
        r"\b(too (?:long|short|formal|casual|much|wordy|salesy|generic)|"
        r"sounds? like|tone|voice|shorter|simpler|plain english|less \w+|more \w+|"
        r"rewrite|reword|no em.?dash)\b",
    ),
    (
        "PRAISE",
        r"(\bperfect\b|\bexactly\b|nailed it|love (?:it|this|that)|that'?s it|"
        r"\bship it\b|keep (?:that|this)|much better|yes!)",
    ),
    (
        "FRICTION",
        r"\b(again|still|one more time|as i (?:said|mentioned)|like before|"
        r"same as|you keep|every single time)\b",
    ),
]
COMPILED = [(name, re.compile(pat, re.I)) for name, pat in SIGNALS]


def parse_ts(raw: str | None) -> datetime | None:
    if not raw:
        return None
    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except ValueError:
        return None


def turn_text(entry: dict) -> str | None:
    """Return Austin's words from a user entry, or None if it isn't him talking.

    Real prompts carry a plain string (or an all-text block list). Tool results
    arrive in the same ``user`` role but carry ``tool_result`` blocks, so any
    entry containing one is machinery, not a prompt.
    """
    if entry.get("type") != "user" or entry.get("isSidechain"):
        return None
    content = (entry.get("message") or {}).get("content")

    if isinstance(content, str):
        text = content
    elif isinstance(content, list):
        parts = []
        for block in content:
            if not isinstance(block, dict):
                continue
            if block.get("type") != "text":
                return None  # tool_result / image → not a prompt
            parts.append(block.get("text") or "")
        text = "\n".join(parts)
    else:
        return None

    text = text.strip()
    if not text or text.startswith(INJECTED_PREFIXES):
        return None
    return text


def classify(text: str) -> list[str]:
    return [name for name, pat in COMPILED if pat.search(text)]


def condense(text: str, width: int) -> str:
    collapsed = re.sub(r"\s+", " ", text).strip()
    if len(collapsed) <= width:
        return collapsed
    return collapsed[: width - 1].rstrip() + "…"


def read_session(path: Path) -> dict | None:
    turns: list[tuple[datetime | None, str]] = []
    cwd = branch = None
    stamps: list[datetime] = []

    try:
        with path.open(encoding="utf-8", errors="replace") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    entry = json.loads(line)
                except json.JSONDecodeError:
                    continue
                ts = parse_ts(entry.get("timestamp"))
                if ts:
                    stamps.append(ts)
                cwd = cwd or entry.get("cwd")
                branch = branch or entry.get("gitBranch")
                text = turn_text(entry)
                if text:
                    turns.append((ts, text))
    except OSError as exc:
        print(f"# could not read {path.name}: {exc}", file=sys.stderr)
        return None

    return {
        "path": path,
        "id": path.stem,
        "cwd": cwd or "unknown",
        "branch": branch or "-",
        "start": min(stamps) if stamps else None,
        "end": max(stamps) if stamps else None,
        "turns": turns,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--days", type=int, default=14, help="how far back to look (default 14)")
    ap.add_argument("--project", help="substring matched against each session's cwd")
    ap.add_argument("--all", action="store_true", help="print every turn, not just tagged ones")
    ap.add_argument("--inventory", action="store_true", help="list sessions and stop")
    ap.add_argument("--width", type=int, default=400, help="max chars per quoted turn (default 400)")
    args = ap.parse_args()

    if not PROJECTS_DIR.is_dir():
        print(f"No transcripts: {PROJECTS_DIR} does not exist.", file=sys.stderr)
        return 2

    sessions = [s for s in (read_session(p) for p in sorted(PROJECTS_DIR.glob("*/*.jsonl"))) if s]
    if not sessions:
        print(f"No transcripts found under {PROJECTS_DIR}.", file=sys.stderr)
        return 2

    total_found = len(sessions)
    if args.project:
        needle = args.project.lower()
        sessions = [s for s in sessions if needle in s["cwd"].lower()]

    cutoff = datetime.now(timezone.utc) - timedelta(days=args.days)
    fresh = [s for s in sessions if s["end"] is None or s["end"] >= cutoff]
    sessions_sorted = sorted(fresh, key=lambda s: s["end"] or datetime.min.replace(tzinfo=timezone.utc))

    def day(s: dict, key: str) -> str:
        return s[key].strftime("%Y-%m-%d %H:%M") if s[key] else "?"

    scope = f", {len(sessions)} matching --project {args.project!r}" if args.project else ""
    print(f"# Session inventory — {PROJECTS_DIR}")
    print(f"# {total_found} transcript(s) total{scope}, {len(sessions_sorted)} within {args.days} days\n")
    for s in sessions_sorted:
        print(f"  {day(s,'end'):16}  {len(s['turns']):3} turns  {s['branch']:34.34}  {s['cwd']}")
    if not sessions_sorted:
        print("  (none in range — widen with --days, or run this on the machine that owns the history)")

    if args.project and not sessions:
        print(
            f"\n# NOTE: no session's cwd matched {args.project!r}. Check the inventory without\n"
            "# --project before concluding there is no history."
        )
    elif total_found <= 1:
        print(
            "\n# NOTE: one transcript only. A fresh remote container has no session history —\n"
            "# there is nothing to mine beyond the current session. Say so plainly instead of\n"
            "# reporting a thin harvest as a completed review."
        )

    if args.inventory:
        return 0

    tally: Counter[str] = Counter()
    printed = 0

    print("\n\n# Tagged turns (oldest first)")
    for s in sessions_sorted:
        rows = []
        for ts, text in s["turns"]:
            tags = classify(text)
            if tags or args.all:
                rows.append((ts, tags, text))
                tally.update(tags or ["UNTAGGED"])
        if not rows:
            continue
        printed += len(rows)
        print(f"\n## {day(s,'start')} → {day(s,'end')}  ·  {s['cwd']}  ·  {s['branch']}")
        print(f"   session {s['id']}")
        for ts, tags, text in rows:
            stamp = ts.strftime("%m-%d %H:%M") if ts else "  ?  "
            label = ",".join(tags) or "—"
            print(f"\n   [{stamp}] {label}")
            print(f"   {condense(text, args.width)}")

    if not printed:
        print("\n  (no turns matched — try --all to see everything in range)")

    print("\n\n# Signal counts")
    for name, count in tally.most_common():
        print(f"  {name:11} {count}")

    print(
        "\n# Next: each CORRECTION / RULE / FRICTION turn is a candidate learning. Dedupe against\n"
        "# what the skills already say, then route survivors per references/historical-review.md."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
