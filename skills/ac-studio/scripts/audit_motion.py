#!/usr/bin/env python3
"""AC — Studio · video-level structural audit.

Two gates the HTML audits cannot see, because both are properties of the
TIMELINE rather than of any single scene:

  Gate 3 — architecture change.  A hard layout change must land inside the
           scroll-decision window (default 2.6-3.6s).  Not a new graphic in
           the same frame: the shape of the frame itself has to change.
  Gate 4 — motion floor.  No stretch of the reel may sit near-static for
           longer than MAX_STATIC seconds.  Without a face on screen there is
           no micro-expression covering the gap, and a still frame reads as a
           photograph.  The 1.0s default is calibrated, not guessed: the
           reference reel holds its longest title card for 0.83s, so 0.8s
           flags deliberate holds and 1.0s does not.

Gate 5 (cut budget) is reported alongside and can be promoted to a hard gate
with --strict-cuts.

    python3 audit_motion.py <video.mp4> [flags]

Flags:
    --window A,B      architecture-change search window   (default 2.6,3.6)
    --grid-min F      grid-distance pass threshold        (default 0.12)
    --row-min F       row-decorrelation pass threshold    (default 0.15)
    --max-static F    motion-floor window, seconds        (default 1.0)
    --freeze-db F     freezedetect noise tolerance, dB    (default -50)
    --cut-target F    seconds per cut for the budget      (default 1.9)
    --strict-cuts     fail (not warn) when under budget
    --calibrate       measure and print, never fail — run this on a render you
                      already trust to find the right thresholds for your look

Exit 0 = all gates pass. Exit 1 = a gate failed. Exit 2 = could not analyse.
"""
import io, re, subprocess, sys

import numpy as np
from PIL import Image

GRID_W, GRID_H = 12, 21          # coarse 9:16 signature — layout mass, not glyphs


# ---------------------------------------------------------------- helpers
def die(msg, code=2):
    print(f"ERROR  {msg}")
    sys.exit(code)


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def duration(path):
    r = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", path])
    try:
        return float(r.stdout.strip())
    except ValueError:
        die(f"cannot read duration of {path}")


def frame_at(path, t):
    """One frame at time t, as a float array normalised 0-1."""
    r = subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", path,
         "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"],
        capture_output=True)
    if not r.stdout:
        return None
    img = Image.open(io.BytesIO(r.stdout)).convert("L")
    return np.asarray(img, dtype=np.float64) / 255.0


def signature(frame):
    """Coarse grid + per-row luminance profile."""
    img = Image.fromarray((frame * 255).astype(np.uint8))
    grid = np.asarray(img.resize((GRID_W, GRID_H), Image.BOX),
                      dtype=np.float64) / 255.0
    rows = np.asarray(img.resize((1, GRID_H * 4), Image.BOX),
                      dtype=np.float64).ravel() / 255.0
    return grid, rows


def structural_delta(a, b):
    """(grid distance, row decorrelation) between two frames."""
    ga, ra = signature(a)
    gb, rb = signature(b)
    grid = float(np.abs(ga - gb).mean())
    if ra.std() < 1e-9 or rb.std() < 1e-9:      # a flat frame correlates with nothing
        row = 1.0
    else:
        row = float(1.0 - np.corrcoef(ra, rb)[0, 1])
    return grid, row


# ---------------------------------------------------------------- gate 3
def gate_architecture(path, win, grid_min, row_min, dur):
    lo, hi = win
    if dur < hi:
        hi = max(lo + 0.2, dur - 0.1)
    best = (-1.0, -1.0, None)
    t = lo
    while t <= hi + 1e-6:
        a, b = frame_at(path, t - 0.15), frame_at(path, t + 0.15)
        if a is not None and b is not None and a.shape == b.shape:
            g, r = structural_delta(a, b)
            if g > best[0]:
                best = (g, r, t)
        t += 0.1

    g, r, t = best
    if t is None:
        return False, "could not sample the window"
    ok = g >= grid_min or r >= row_min
    detail = (f"strongest change at {t:.2f}s  ·  grid {g:.3f} (need {grid_min:.3f})  "
              f"·  row-decorrelation {r:.3f} (need {row_min:.3f})")
    return ok, detail


# ---------------------------------------------------------------- gate 4
def gate_motion(path, max_static, freeze_db):
    r = run(["ffmpeg", "-hide_banner", "-nostats", "-i", path,
             "-vf", f"freezedetect=n={freeze_db}dB:d={max_static}",
             "-map", "0:v", "-f", "null", "-"])
    starts = [float(x) for x in re.findall(r"freeze_start:\s*([0-9.]+)", r.stderr)]
    durs = [float(x) for x in re.findall(r"freeze_duration:\s*([0-9.]+)", r.stderr)]
    windows = list(zip(starts, durs)) if starts else []
    # a freeze still running at EOF reports a start with no duration
    if len(starts) > len(durs):
        windows = list(zip(starts, durs + ["to end"]))
    return (len(windows) == 0), windows


# ---------------------------------------------------------------- gate 5
def cut_times(path):
    r = run(["ffmpeg", "-v", "error", "-i", path, "-vf",
             "select='gt(scene,0.25)',metadata=print:file=-", "-an", "-f", "null", "-"])
    return [float(x) for x in re.findall(r"pts_time:([0-9.]+)", r.stdout)]


# ---------------------------------------------------------------- main
def main():
    if len(sys.argv) < 2:
        die("usage: audit_motion.py <video.mp4> [flags]")
    path = sys.argv[1]
    a = sys.argv[2:]

    def flag(name, default, cast=float):
        if name in a:
            return cast(a[a.index(name) + 1])
        return default

    win = flag("--window", (2.6, 3.6),
               lambda s: tuple(float(x) for x in s.split(",")))
    grid_min = flag("--grid-min", 0.12)
    row_min = flag("--row-min", 0.15)
    max_static = flag("--max-static", 1.0)
    freeze_db = flag("--freeze-db", -50.0)
    cut_target = flag("--cut-target", 1.9)
    strict_cuts = "--strict-cuts" in a
    calibrate = "--calibrate" in a

    dur = duration(path)
    print(f"    {path}  ·  {dur:.2f}s")

    failures = []

    # --- gate 3 ---
    ok3, detail3 = gate_architecture(path, win, grid_min, row_min, dur)
    tag = "MEAS" if calibrate else ("PASS" if ok3 else "FAIL")
    print(f"\n[{tag}]  gate 3 · architecture change in {win[0]}-{win[1]}s")
    print(f"         {detail3}")
    if not ok3 and not calibrate:
        print("         The frame is carrying new content inside the same layout.")
        print("         Switch theme, or move the split, at the three-second mark.")
        failures.append("architecture")

    # --- gate 4 ---
    ok4, windows = gate_motion(path, max_static, freeze_db)
    tag = "MEAS" if calibrate else ("PASS" if ok4 else "FAIL")
    print(f"\n[{tag}]  gate 4 · motion floor (nothing static > {max_static}s)")
    if ok4:
        print(f"         no window exceeds {max_static}s at {freeze_db}dB tolerance")
    else:
        for start, d in windows:
            length = d if isinstance(d, str) else f"{d:.2f}s"
            print(f"         static from {start:.2f}s  ·  {length}")
        if not calibrate:
            print("         Add a counter tick, a tile landing, a rule draw or a punch zoom.")
        failures.append("motion")

    # --- gate 5 ---
    cuts = cut_times(path)
    need = int(dur / cut_target)
    mean_shot = dur / len(cuts) if cuts else dur
    under = len(cuts) < need
    tag = "MEAS" if calibrate else ("FAIL" if (under and strict_cuts) else ("WARN" if under else "PASS"))
    print(f"\n[{tag}]  gate 5 · cut budget")
    print(f"         {len(cuts)} cuts · mean shot {mean_shot:.2f}s · "
          f"budget {need} at {cut_target}s/cut")
    if cuts:
        early = [c for c in cuts if c <= 3.0]
        print(f"         {len(early)} cut(s) inside the first 3s "
              f"{'— spec wants 2' if len(early) < 2 else ''}")
    if under and strict_cuts:
        failures.append("cuts")

    # --- verdict ---
    print()
    if calibrate:
        print("CALIBRATE — measured only, nothing enforced.")
        print("Run this on a render you already trust, then set --grid-min and")
        print("--row-min just under the numbers it reports for gate 3.")
        return 0
    if failures:
        print(f"{len(failures)} gate(s) failed: {', '.join(failures)}")
        return 1
    print("CLEAN — structural gates passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
