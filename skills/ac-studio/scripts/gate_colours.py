#!/usr/bin/env python3
"""Gate 10 · the three-colour law.

    python3 gate_colours.py <png|jpg|mp4|dir> [...] [--declare black,gold,cream[,red][,team]]
                            [--allow "#RRGGBB,#RRGGBB"] [--tolerance 0.05] [--fps 2] [--json out.json]

Every post carries at most THREE colour families — BLACK (the ground and its
inks), GOLD (every gold from light to dim) and CREAM (warm white and its stone
and dim greys). Shades of one family count as one. Two exceptions exist and
both must be DECLARED at Stop 0 for the run (AC, 2026-09-20/21):
  - RED, for ONE very important highlight (one element, never chrome or art);
  - TEAM colours on a named person in a comparison stage (`--allow` lists the
    hexes; a hue within 14° of any of them counts as the "team" family).
Anything else on the frame is a foreign colour and fails the gate.

The gate classifies every opaque pixel into a family by hue, chroma and
lightness, then reports coverage per family. It fails when:
  - a foreign colour covers more than --tolerance % of the frame (default
    0.05 % — enough to forgive anti-aliasing, not a logo);
  - red or team colours are present above tolerance but were not declared.
It warns (does not fail) when a declared family is absent from a frame.

An MP4 is sampled at --fps frames per second through ffmpeg (system ffmpeg,
/root/bin/ffmpeg, or the imageio-ffmpeg wheel — the same resolution order the
build scripts use); every sampled frame is gated and the worst frame is
reported. A directory is walked for PNG/JPG.

Exit 0 pass · 1 fail · 2 could not run (no decoder). Never silently passes.
"""
import argparse, colorsys, json, os, shutil, subprocess, sys, tempfile

try:
    from PIL import Image
except ImportError:
    sys.exit("gate_colours: Pillow is required (pip install pillow)")

FAMILIES = ("black", "gold", "cream", "red", "team")
BASE = ("black", "gold", "cream")       # always legal; red and team need a declaration
TEAM_HUE_TOL = 14.0                     # degrees either side of a declared team hex

REDUCE = 8   # box-average 8x8 px before classifying — see gate_image


def parse_allow(spec):
    """'#2ECC71,#FFD700' -> hue centres (degrees) of the declared team colours."""
    hues = []
    for hx in (spec or "").split(","):
        hx = hx.strip().lstrip("#")
        if not hx:
            continue
        if len(hx) != 6:
            sys.exit("gate_colours: bad hex in --allow: " + hx)
        r, g, b = int(hx[0:2], 16), int(hx[2:4], 16), int(hx[4:6], 16)
        hues.append(colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)[0] * 360.0)
    return hues


def classify(r, g, b, allow=None):
    """Map one RGB pixel to a colour family.

    Thresholds were set against the brand palette in references/brand.md and
    the approved exceptions (tier gradations, dim-gold footnotes, the red
    pair). Change them here, in one place, and re-run on a known-good slide.

    "Coloured" is decided on CHROMA (max - min channel), not HLS saturation:
    HLS inflates saturation on light colours, so warm white #F4F0E7 scored
    0.37 and landed in gold. Chroma 0.05 says what the eye says — neutral.
    """
    rf, gf, bf = r / 255.0, g / 255.0, b / 255.0
    mx, mn = max(rf, gf, bf), min(rf, gf, bf)
    chroma = mx - mn
    light = (mx + mn) / 2.0
    if light < 0.14:
        return "black"                      # #0A0A0A · #12100A · #141414 · #111009
    if chroma < 0.12:
        # neutrals: warm white, stone, the dim greys — or a dark grey card
        return "cream" if light >= 0.30 else "black"
    hue = colorsys.rgb_to_hsv(rf, gf, bf)[0] * 360.0
    if 34.0 <= hue <= 62.0:
        return "gold"                       # #F4DF95 → #E7C765 → #C9A23F → #8A7331 → #3A3218 (orange #FF8C00 is 33° — out)
    if hue >= 340.0 or hue <= 12.0:
        return "red"                        # #E5484D · #A32328 · #8E1219 · #D8262F
    # gold and red are checked first, so a team hex inside those bands simply counts
    # as that family — both are declared, so nothing is lost. A red jersey is "red":
    # declare it as red, with its one-element meaning.
    for h in (allow or ()):
        d = abs(hue - h)
        if min(d, 360.0 - d) <= TEAM_HUE_TOL:
            return "team"
    return "other"


def gate_image(path, declared, tolerance, reduce=REDUCE, allow=None):
    im = Image.open(path).convert("RGBA")
    # Chromium's sub-pixel text anti-aliasing leaves one-pixel orange and blue
    # fringes on every glyph edge — about 1% of a slide, all of it "foreign".
    # An 8x8 box average folds each fringe into the glyph and ground around it,
    # so only a REGION of foreign colour survives (a logo, a swatch, a chart
    # bar), which is exactly what the law is about. Measured on the deck
    # engine's slides: 4x left 0.06-0.10% of fringe residue, 8x leaves none,
    # and a 30x30px block of solid foreign colour still lands at ~0.06%.
    if reduce > 1:
        im = im.reduce(reduce)
    w, h = im.size
    buf = im.tobytes()
    counts = {k: 0 for k in FAMILIES + ("other",)}
    foreign = {}
    total = 0
    for i in range(0, len(buf), 4):
        a = buf[i + 3]
        if a < 128:
            continue                        # transparent pixels are not colour
        r, g, b = buf[i], buf[i + 1], buf[i + 2]
        total += 1
        fam = classify(r, g, b, allow)
        counts[fam] += 1
        if fam == "other":
            key = (r >> 4 << 4, g >> 4 << 4, b >> 4 << 4)   # 16-level bins
            foreign[key] = foreign.get(key, 0) + 1
    if total == 0:
        return {"file": path, "error": "no opaque pixels"}
    pct = {k: 100.0 * v / total for k, v in counts.items()}
    present = [k for k in FAMILIES if pct[k] > tolerance]
    problems, warnings = [], []
    # with team colours declared, the seams between them and gold blend to in-between
    # hues on every edge of the subject — allow three times the tolerance for "other"
    other_tol = tolerance * (3.0 if "team" in declared else 1.0)
    if pct["other"] > other_tol:
        top = sorted(foreign.items(), key=lambda kv: -kv[1])[:3]
        swatches = ", ".join("#%02X%02X%02X (%.2f%%)" % (k[0], k[1], k[2], 100.0 * v / total) for k, v in top)
        problems.append("foreign colour %.2f%% of frame: %s" % (pct["other"], swatches))
    for k in present:
        if k not in BASE and k not in declared:
            problems.append("%s present (%.2f%%) but not declared at Stop 0" % (
                "red" if k == "red" else "team colours", pct[k]))
    for k in declared:
        if k not in present:
            warnings.append("declared family absent: %s" % k)
    return {"file": path, "pct": {k: round(v, 3) for k, v in pct.items()},
            "present": present, "problems": problems, "warnings": warnings}


def find_ffmpeg():
    for cand in ("ffmpeg", "/root/bin/ffmpeg"):
        p = shutil.which(cand) if not cand.startswith("/") else (cand if os.path.exists(cand) else None)
        if p:
            return p
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return None


def sample_video(path, fps):
    ff = find_ffmpeg()
    if not ff:
        return None, "no ffmpeg on PATH, /root/bin or the imageio-ffmpeg wheel"
    out = tempfile.mkdtemp(prefix="gate_colours_")
    cmd = [ff, "-loglevel", "error", "-i", path, "-vf", "fps=%s" % fps, os.path.join(out, "f_%04d.png")]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        return None, r.stderr.strip()
    frames = sorted(os.path.join(out, f) for f in os.listdir(out))
    return frames, None


def expand(targets, fps):
    files, errors = [], []
    for t in targets:
        if os.path.isdir(t):
            for root, _, names in os.walk(t):
                for n in sorted(names):
                    if n.lower().endswith((".png", ".jpg", ".jpeg")):
                        files.append(os.path.join(root, n))
        elif t.lower().endswith((".mp4", ".mov", ".webm")):
            frames, err = sample_video(t, fps)
            if err:
                errors.append("%s: %s" % (t, err))
            else:
                files.extend(frames)
        else:
            files.append(t)
    return files, errors


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("targets", nargs="+")
    ap.add_argument("--declare", default="black,gold,cream",
                    help="families declared at Stop 0 (default black,gold,cream; add red / team only when declared)")
    ap.add_argument("--allow", default="",
                    help="declared team colours as hexes, e.g. '#FFD700,#2ECC71' (implies team in --declare)")
    ap.add_argument("--tolerance", type=float, default=0.05, help="max %% of frame a stray family may cover")
    ap.add_argument("--fps", type=float, default=2.0, help="frames per second sampled from a video")
    ap.add_argument("--reduce", type=int, default=REDUCE, help="box-average factor before classifying (default 8)")
    ap.add_argument("--json", help="write the per-frame report here")
    a = ap.parse_args()

    declared = [d.strip().lower() for d in a.declare.split(",") if d.strip()]
    allow = parse_allow(a.allow)
    if allow and "team" not in declared:
        declared.append("team")
    if "team" in declared and not allow:
        sys.exit("gate_colours: team declared but no --allow hexes given")
    bad = [d for d in declared if d not in FAMILIES]
    if bad:
        sys.exit("gate_colours: unknown family %s (use %s)" % (bad, "/".join(FAMILIES)))
    if len([d for d in declared if d in BASE]) > 3:
        sys.exit("gate_colours: more than three base families declared — the law is three, plus the declared exceptions")

    files, errors = expand(a.targets, a.fps)
    for e in errors:
        print("gate_colours: cannot decode " + e, file=sys.stderr)
    if not files:
        print("gate_colours: nothing to check", file=sys.stderr)
        sys.exit(2)

    reports, fails = [], 0
    for f in files:
        rep = gate_image(f, declared, a.tolerance, a.reduce, allow)
        reports.append(rep)
        if rep.get("error"):
            print("  ?? %s: %s" % (f, rep["error"]))
            continue
        cov = " ".join("%s %.1f%%" % (k, rep["pct"][k]) for k in FAMILIES + ("other",) if rep["pct"][k] > 0)
        if rep["problems"]:
            fails += 1
            print("  FAIL %s\n       %s\n       %s" % (f, cov, "\n       ".join(rep["problems"])))
        else:
            print("  ok   %s  [%s]%s" % (os.path.basename(f), cov,
                  ("  (warn: " + "; ".join(rep["warnings"]) + ")") if rep["warnings"] else ""))

    if a.json:
        with open(a.json, "w") as fh:
            json.dump({"declared": declared, "allow": a.allow, "tolerance": a.tolerance, "frames": reports}, fh, indent=1)

    print("\ngate 10 · colours: %d frame(s), %d fail(s), declared %s" % (len(files), fails, "+".join(declared)))
    if errors:
        sys.exit(2)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
