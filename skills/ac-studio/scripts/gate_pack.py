#!/usr/bin/env python3
"""Gate 11 · the pack manifest.

    python3 gate_pack.py <pack.json>

The imagery pack is declared once, in pack.json, and this gate holds the
declaration to the files on disk before the pack board ships:

  - every slot the post has carries an object, or is listed in `no_anchor`
    (the rule slide carries none by law — that is a declaration, not a gap)
  - every object's file exists, carries real transparency (Gate 9) and its
    alpha bbox clears the frame edge (a cropped render)
  - every object's ink sits inside the declared colour families; red on an
    icon is never legal (the red exception is ONE element of type, not art);
    team colours are legal only on a `stage` object, and only when
    colours.team is on with a subject, its hexes and the reason
  - a 3D object is never mounted below 60px (hairline law: 2D below 60)
  - one look per pack — objects declare no look of their own; the pack does
  - the red exception, when on, names the element and the reason

Exit 0 pass · 1 fail. Warnings never fail the gate but are printed.
"""
import json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gate_colours import classify, parse_allow  # noqa: E402

try:
    from PIL import Image
except ImportError:
    sys.exit("gate_pack: Pillow is required (pip install pillow)")

LOOKS = ("matte", "polished", "wire", "flat")
FAMILIES = ("black", "gold", "cream", "red")
ROLES = ("hero", "anchor", "rail", "chip", "mark", "stage")


def icon_families(path, allow=None):
    im = Image.open(path).convert("RGBA").reduce(2)
    buf = im.tobytes()
    counts = {}
    total = 0
    for i in range(0, len(buf), 4):
        if buf[i + 3] < 128:
            continue
        total += 1
        fam = classify(buf[i], buf[i + 1], buf[i + 2], allow)
        counts[fam] = counts.get(fam, 0) + 1
    return {k: 100.0 * v / total for k, v in counts.items()} if total else {}


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    mpath = sys.argv[1]
    base = os.path.dirname(os.path.abspath(mpath))
    with open(mpath) as fh:
        P = json.load(fh)

    problems, warnings = [], []
    for k in ("pack", "topic", "format", "dimension", "look", "colours", "slots", "objects"):
        if k not in P:
            problems.append("manifest missing `%s`" % k)
    if problems:
        print("\n".join("  FAIL " + p for p in problems)); sys.exit(1)

    if P["look"] not in LOOKS:
        problems.append("look `%s` is not one of %s" % (P["look"], "/".join(LOOKS)))
    if P["dimension"] not in ("2d", "3d", "mixed"):
        problems.append("dimension must be 2d, 3d or mixed (mixed = 3D hero + 2D rail, declared)")

    fams = [f.lower() for f in P["colours"].get("families", [])]
    if len(fams) > 3 or any(f not in FAMILIES or f == "red" for f in fams):
        problems.append("colours.families must be up to three of black/gold/cream — red is the exception, declared under colours.red")
    red = P["colours"].get("red", {"on": False})
    if red.get("on"):
        if not red.get("element") or not red.get("reason"):
            problems.append("red is on but colours.red.element / .reason is empty — say WHAT is red and WHY it is the one thing")
    team = P["colours"].get("team", {"on": False})
    allow = None
    if team.get("on"):
        if not team.get("subject") or not team.get("hexes") or not team.get("reason"):
            problems.append("team colours are on but colours.team.subject / .hexes / .reason is incomplete — name the person, the hexes and why")
        else:
            allow = parse_allow(",".join(team["hexes"]))
    declared = fams + (["red"] if red.get("on") else []) + (["team"] if team.get("on") else [])

    slots = list(P["slots"])
    no_anchor = set(P.get("no_anchor", []))
    covered = {}
    for o in P["objects"]:
        for k in ("key", "slot", "role", "mount", "file"):
            if k not in o:
                problems.append("object %s missing `%s`" % (o.get("key", "?"), k))
        if "look" in o and o["look"] != P["look"]:
            problems.append("object %s declares look `%s` — one look per pack (%s)" % (o.get("key"), o["look"], P["look"]))
        if o.get("role") not in ROLES:
            warnings.append("object %s role `%s` is not one of %s" % (o.get("key"), o.get("role"), "/".join(ROLES)))
        covered.setdefault(o.get("slot"), []).append(o.get("key"))
        f = os.path.join(base, o.get("file", ""))
        if not os.path.exists(f):
            problems.append("object %s: file not found %s" % (o.get("key"), o.get("file")))
            continue
        im = Image.open(f).convert("RGBA")
        W, H = im.size
        alpha = im.getchannel("A")
        bb = alpha.point(lambda v: 255 if v > 6 else 0).getbbox()
        if bb is None:
            problems.append("object %s: empty image" % o["key"]); continue
        opaque = sum(1 for v in alpha.tobytes() if v > 8)
        if opaque >= 0.98 * W * H:
            problems.append("object %s: Gate 9 — no transparency, it will mount as a box" % o["key"])
        x0, y0, x1, y1 = bb
        if x0 <= 0 or y0 <= 0 or x1 >= W or y1 >= H:
            problems.append("object %s: alpha bbox touches the frame edge — cropped render" % o["key"])
        pct = icon_families(f, allow)
        # A declared team subject is multicoloured by definition, so the anti-aliased seams
        # between its team colours and gold blend to hues that are neither (2.9% on a
        # synthetic striped runner). Those seams are tolerated on the STAGE subject only;
        # everywhere else a stray hue above 1% is a real foreign colour.
        other_tol = 5.0 if (allow and o.get("role") == "stage") else 1.0
        stray = {k: v for k, v in pct.items()
                 if (k not in declared or k == "red") and v > (other_tol if k == "other" else 1.0)}
        if pct.get("team", 0) > 1.0 and o.get("role") != "stage":
            stray["team"] = pct["team"]     # team colours live on the named subject only
        if stray:
            problems.append("object %s: ink outside the pack's families: %s" % (
                o["key"], ", ".join("%s %.1f%%" % kv for kv in stray.items())))
        if P["dimension"] == "3d" and int(o.get("mount", 0)) < 60 and o.get("role") != "mark":
            problems.append("object %s: 3D at %spx — below 60px the icon is a 2D hairline (law)" % (o["key"], o.get("mount")))
        if o.get("source") == "catalog":
            warnings.append("object %s comes from the catalog unbaked — the pack law wants it re-baked into this pack's look" % o["key"])

    for s in slots:
        if s in no_anchor and s in covered:
            warnings.append("slot %s is in no_anchor but carries %s" % (s, covered[s]))
        if s not in no_anchor and s not in covered:
            problems.append("slot %s carries no object and is not declared in no_anchor" % s)
    for s in covered:
        if s not in slots:
            warnings.append("object(s) %s mapped to unknown slot %s" % (covered[s], s))

    for w in warnings:
        print("  warn " + w)
    for p in problems:
        print("  FAIL " + p)
    print("\ngate 11 · pack: %d object(s) over %d slot(s) · look %s · colours %s · %d fail(s)" % (
        len(P["objects"]), len(slots), P["look"], "+".join(declared), len(problems)))
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
