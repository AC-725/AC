#!/usr/bin/env python3
"""State and preflight tool for the AC command deck (/deck, /post, /week, ...).

Standard library only, so there is nothing to install.

    python3 scripts/deck.py status            # readiness report + recent runs
    python3 scripts/deck.py day               # day-number counter from the run log
    python3 scripts/deck.py outbox post       # create + print today's output dir
    python3 scripts/deck.py log --command post --summary "Day 10 TOD shipped"

Every subcommand takes --json for machine-readable output.

Two sources of truth, deliberately separate:

  - `skills/ac-studio/run-log.md` owns the *series* memory (day numbers, themes,
    grades). This tool only reads it — the skill appends to it as part of a run.
  - `deck/runs.jsonl` owns the *deck* memory (which command ran when). This tool
    appends to it via `log`.

Both are committed files: remote sessions run in ephemeral containers, so any
state that matters must reach git to survive.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RUN_LOG = os.path.join(REPO, "skills", "ac-studio", "run-log.md")
RUNS_JSONL = os.path.join(REPO, "deck", "runs.jsonl")
OUTBOX = os.path.join(REPO, "outbox")

COMMANDS = ["post", "week", "brief", "wins", "leads"]

# What each env var unlocks. Absence is a warning, never an error — every
# command has a degraded mode and the skill decides what to do about it.
ENV_CHECKS = [
    ("IG_ACCESS_TOKEN", "/brief pulls real Instagram numbers (docs/instagram-setup.md)"),
    ("FIRECRAWL_API_KEY", "research extraction for /post, /week, /leads (JS-heavy pages)"),
]

DATE_RE = re.compile(r"\d{4}-\d{2}-\d{2}")


def parse_run_log() -> list[dict]:
    """Rows of the run-log table, newest first (the file's own order)."""
    if not os.path.exists(RUN_LOG):
        return []
    rows = []
    with open(RUN_LOG, encoding="utf-8") as f:
        for line in f:
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cells) < 4 or not DATE_RE.fullmatch(cells[0]):
                continue
            try:
                day = int(cells[1])
            except ValueError:
                continue
            rows.append({
                "date": cells[0],
                "day": day,
                "format": cells[2],
                "story": cells[3],
                "in_progress": "in progress" in line.lower(),
            })
    return rows


def day_report() -> dict:
    rows = parse_run_log()
    if not rows:
        return {"last": None, "next_day": 1,
                "note": "run log missing or empty; day numbering starts at 1"}
    last = max(rows, key=lambda r: r["day"])
    report = {"last": last, "next_day": last["day"] + 1}
    if last["in_progress"]:
        report["note"] = (
            f"day {last['day']} is logged as in progress, not shipped — "
            f"finishing it may be the real next move"
        )
    return report


def read_runs() -> list[dict]:
    if not os.path.exists(RUNS_JSONL):
        return []
    runs = []
    with open(RUNS_JSONL, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                runs.append(json.loads(line))
    return runs


def cmd_status(args: argparse.Namespace) -> int:
    env = [{"var": var, "set": bool(os.environ.get(var)), "unlocks": what}
           for var, what in ENV_CHECKS]
    runs = read_runs()
    last_run: dict[str, dict] = {}
    for r in runs:  # file is append-only, so later lines win
        last_run[r.get("command", "?")] = r
    recent_outbox = []
    if os.path.isdir(OUTBOX):
        recent_outbox = sorted(
            (d for d in os.listdir(OUTBOX) if os.path.isdir(os.path.join(OUTBOX, d))),
            reverse=True,
        )[:5]
    status = {
        "day": day_report(),
        "env": env,
        "last_run_per_command": last_run,
        "recent_outbox": recent_outbox,
    }
    if args.json:
        print(json.dumps(status, indent=2))
        return 0

    d = status["day"]
    if d["last"]:
        flag = " (in progress)" if d["last"]["in_progress"] else ""
        print(f"series   day {d['last']['day']}{flag} on {d['last']['date']} "
              f"— {d['last']['format']} · next: day {d['next_day']}")
    else:
        print(f"series   next: day {d['next_day']}")
    if "note" in d:
        print(f"         note: {d['note']}")
    for e in env:
        mark = "ok " if e["set"] else "-- "
        print(f"env      {mark}{e['var']:<20} {e['unlocks']}")
    for c in COMMANDS:
        r = last_run.get(c)
        when = f"{r['at'][:10]} — {r.get('summary', '')}" if r else "never run"
        print(f"run      /{c:<6} {when}")
    if recent_outbox:
        print("outbox   " + "  ".join(recent_outbox))
    return 0


def cmd_day(args: argparse.Namespace) -> int:
    report = day_report()
    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print(report["next_day"])
        if "note" in report:
            print(f"note: {report['note']}", file=sys.stderr)
    return 0


def cmd_outbox(args: argparse.Namespace) -> int:
    name = re.sub(r"[^a-z0-9-]", "-", args.name.lower())
    path = os.path.join(OUTBOX, f"{dt.date.today().isoformat()}-{name}")
    os.makedirs(path, exist_ok=True)
    if args.json:
        print(json.dumps({"path": path}))
    else:
        print(path)
    return 0


def cmd_log(args: argparse.Namespace) -> int:
    entry: dict = {
        "at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "command": args.command,
        "summary": args.summary,
    }
    if args.day is not None:
        entry["day"] = args.day
    if args.files:
        entry["files"] = [f.strip() for f in args.files.split(",") if f.strip()]
    os.makedirs(os.path.dirname(RUNS_JSONL), exist_ok=True)
    with open(RUNS_JSONL, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")
    if args.json:
        print(json.dumps(entry))
    else:
        print(f"logged: /{args.command} — {args.summary}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("status", help="readiness report: series day, env, recent runs")
    p.add_argument("--json", action="store_true")
    p.set_defaults(fn=cmd_status)

    p = sub.add_parser("day", help="next day number, derived from the run log")
    p.add_argument("--json", action="store_true")
    p.set_defaults(fn=cmd_day)

    p = sub.add_parser("outbox", help="create and print today's output directory")
    p.add_argument("name", help="command name, e.g. post")
    p.add_argument("--json", action="store_true")
    p.set_defaults(fn=cmd_outbox)

    p = sub.add_parser("log", help="append a run record to deck/runs.jsonl")
    p.add_argument("--command", required=True, choices=COMMANDS)
    p.add_argument("--summary", required=True)
    p.add_argument("--day", type=int)
    p.add_argument("--files", help="comma-separated deliverable paths")
    p.add_argument("--json", action="store_true")
    p.set_defaults(fn=cmd_log)

    args = ap.parse_args()
    return args.fn(args)


if __name__ == "__main__":
    sys.exit(main())
