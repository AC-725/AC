#!/usr/bin/env python3
"""Install ZoneOut's extra cover icons into the skill's generator.

zoneout_cover.py lives in the synced skill directory, outside this repo, and a
skill re-sync reverts it. Anything added to its ICONS registry has to live here
to survive. Idempotent — safe to run on every fresh container.

    python3 zoneout/install-cover-icons.py
"""
import re
import sys
from pathlib import Path

TARGET = Path("/root/.claude/skills/synced/project-brainrot/assets/zoneout_cover.py")

BEZIER = '''
def _bez(p0, p1, p2, p3, n=26):
    """Cubic bezier as a point list, for stroked organic curves."""
    pts = []
    for i in range(n + 1):
        t = i / n; u = 1 - t
        x = u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0]
        y = u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]
        pts.append((x, y))
    return pts
'''

SAUROPOD = '''
def icon_sauropod(d, box, s, c):
    """Sauropod in profile, drawn as one continuous outline.

    The silhouette is the whole job: at the 160px grid crop the viewer must read
    'dinosaur' before reading a word. Two proportions carry it and both are easy to
    get wrong — the neck must rise STEEPLY (a shallow neck plus a shallow tail reads
    as a bench), and the body must be deep rather than a sliver. No ground line: it
    turns the legs into furniture. Strokes only, to survive the thumbnail check."""
    x0, y0, x1, y1 = box
    W, H = x1 - x0, y1 - y0
    X = lambda u: x0 + W * u
    Y = lambda v: y0 + H * v
    P = lambda u, v: (X(u), Y(v))
    thin = max(3, int(s * 0.8))

    def curve(*segs):
        pts = []
        for seg in segs:
            pts += _bez(*[P(*q) for q in seg])
        d.line(pts, fill=c, width=s, joint="curve")

    # topline: skull -> steep neck -> arched back -> long tail
    curve(((.23, .07), (.30, .16), (.36, .27), (.42, .41)),
          ((.42, .41), (.50, .36), (.60, .36), (.67, .42)),
          ((.67, .42), (.80, .45), (.90, .41), (.99, .32)))

    # underline: tail tip -> deep belly -> chest -> throat -> chin
    curve(((.99, .32), (.87, .50), (.78, .57), (.69, .58)),
          ((.69, .58), (.58, .63), (.48, .62), (.43, .57)),
          ((.43, .57), (.34, .42), (.27, .24), (.22, .13)))

    # head — small tapered wedge, clear of the neck line
    d.line([X(.22), Y(.13), X(.09), Y(.09)], fill=c, width=thin)
    d.line([X(.09), Y(.09), X(.11), Y(.035)], fill=c, width=thin)
    d.line([X(.11), Y(.035), X(.23), Y(.07)], fill=c, width=thin)

    # pillar legs — near pair full weight, far pair lighter for depth
    for u, near in ((.47, False), (.53, True), (.63, True), (.69, False)):
        d.line([X(u), Y(.58), X(u), Y(.86)], fill=c, width=s if near else thin)
'''

TAG = """
def icon_tag(d, box, s, c):
    \"\"\"A garment care label / hang tag. Strokes only.

    Used by SPLIT on seq 45, where the same icon is passed as both icon_a and
    icon_b and the theme's own palette does the arguing - grey tag for the plain
    label, gold tag for the one carrying the word 'only'. Kept deliberately plain
    so it survives the 160px thumbnail check; a tag with legible text on it does
    not.\"\"\"
    x0, y0, x1, y1 = box
    W, H = x1 - x0, y1 - y0
    X = lambda u: x0 + W * u
    Y = lambda v: y0 + H * v
    thin = max(2, int(s * 0.7))

    # the tag body, corner clipped top-left where the string goes
    d.line([X(.30), Y(.22), X(.82), Y(.22)], fill=c, width=s)
    d.line([X(.82), Y(.22), X(.82), Y(.78)], fill=c, width=s)
    d.line([X(.82), Y(.78), X(.30), Y(.78)], fill=c, width=s)
    d.line([X(.30), Y(.78), X(.18), Y(.50)], fill=c, width=s)
    d.line([X(.18), Y(.50), X(.30), Y(.22)], fill=c, width=s)

    # the eyelet
    _ring(d, X(.30), Y(.50), H * .055, thin, c)

    # three ruled lines standing in for care instructions
    for v in (.38, .50, .62):
        d.line([X(.44), Y(v), X(.74), Y(v)], fill=c, width=thin)
"""

def main():
    if not TARGET.exists():
        sys.exit(f"generator not found at {TARGET} — is the skill synced?")
    src = TARGET.read_text()
    added = []

    if "def _bez(" not in src:
        src = src.replace("\nICONS = {", BEZIER + "\nICONS = {"); added.append("_bez")
    if "def icon_sauropod(" not in src:
        src = src.replace("\nICONS = {", SAUROPOD + "\nICONS = {"); added.append("icon_sauropod")

    if "def icon_tag(" not in src:
        src = src.replace("\nICONS = {", TAG.strip('\n') + "\nICONS = {"); added.append("icon_tag")

    if '"tag"' not in src:
        src = re.sub(r"(ICONS = \{.*?)\}", r'\1,\n         "tag": icon_tag}',
                     src, count=1, flags=re.S)
        added.append("tag registry")

    if '"sauropod"' not in src:
        # append to the ICONS dict literal, before its closing brace
        src = re.sub(r"(ICONS = \{.*?)\}", r'\1,\n         "sauropod": icon_sauropod}',
                     src, count=1, flags=re.S)
        added.append("registry")

    if not added:
        print("already installed — nothing to do"); return
    TARGET.write_text(src)
    print("installed:", ", ".join(added))

if __name__ == "__main__":
    main()
