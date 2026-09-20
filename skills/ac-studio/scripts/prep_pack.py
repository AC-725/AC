#!/usr/bin/env python3
"""Prep a baked imagery pack for mounting — crop, square, edge-check.

    python3 prep_pack.py <raw_dir> <out_dir> [--look matte|polished|wire] [names...]

For every PNG in <raw_dir>:
  1. Gate 9 · alpha — the file must carry real transparency (a fully opaque
     bake mounts as a box on the ground and no pixel gate sees it).
  2. Edge check — the alpha bbox must not touch the raw frame. A cut-out that
     reaches the edge is a CROPPED render: the camera was too close. Fix the
     bake (pull FAMILY.camera.pad up), do not ship it.
  3. Crop to the alpha bbox, pad to a square at x1.08 so every mount is the
     same shape, and write <out_dir>/<name>.png.
  4. Wire look only: lift alpha x1.45 — hairlines vanish at 208px without it.

Never writes over the raw bakes. Exit 1 if any object fails a gate.
"""
import argparse, os, sys

try:
    from PIL import Image
except ImportError:
    sys.exit("prep_pack: Pillow is required (pip install pillow)")

SQUARE = 1.08
WIRE_ALPHA = 1.45


def prep(src, dst, look):
    im = Image.open(src).convert("RGBA")
    W, H = im.size
    alpha = im.getchannel("A")
    # bbox of INK, not of every faintly-lit pixel: a contact shadow's tail fades
    # to alpha 1-2 well past anything the eye reads, and would flag every bake
    bb = alpha.point(lambda v: 255 if v > 6 else 0).getbbox()
    problems = []
    if bb is None:
        return None, ["empty render (no opaque pixels)"]
    opaque = sum(1 for v in alpha.tobytes() if v > 8)
    if opaque >= 0.98 * W * H:
        problems.append("Gate 9: no transparency — the bake filled the frame")
    x0, y0, x1, y1 = bb
    touches = [e for e, hit in (("left", x0 <= 0), ("top", y0 <= 0), ("right", x1 >= W), ("bottom", y1 >= H)) if hit]
    if touches:
        problems.append("bbox touches the %s edge — cropped render, pull the camera back" % "/".join(touches))
    if problems:
        return None, problems
    cut = im.crop(bb)
    s = int(max(cut.size) * SQUARE)
    sq = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    sq.paste(cut, ((s - cut.width) // 2, (s - cut.height) // 2), cut)
    if look == "wire":
        r, g, b, a = sq.split()
        a = a.point(lambda v: min(255, int(v * WIRE_ALPHA)))
        sq = Image.merge("RGBA", (r, g, b, a))
    sq.save(dst)
    return sq.size, []


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("raw_dir"); ap.add_argument("out_dir")
    ap.add_argument("--look", default="matte", choices=("matte", "polished", "wire"))
    ap.add_argument("names", nargs="*")
    a = ap.parse_args()
    if os.path.abspath(a.raw_dir) == os.path.abspath(a.out_dir):
        sys.exit("prep_pack: refusing to overwrite the raw bakes — give a separate out_dir")
    os.makedirs(a.out_dir, exist_ok=True)
    names = [n if n.endswith(".png") else n + ".png" for n in a.names] or \
            sorted(f for f in os.listdir(a.raw_dir) if f.lower().endswith(".png"))
    fails = 0
    for f in names:
        size, problems = prep(os.path.join(a.raw_dir, f), os.path.join(a.out_dir, f), a.look)
        if problems:
            fails += 1
            print("  FAIL %-18s %s" % (f, "; ".join(problems)))
        else:
            print("  ok   %-18s -> %dx%d" % (f, size[0], size[1]))
    print("\n%d object(s), %d fail(s). Prepped icons in %s — mount per pack.json." % (len(names), fails, a.out_dir))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
