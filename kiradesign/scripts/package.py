#!/usr/bin/env python3
"""
Package the KIRA homepage for delivery in two forms:

  1. KIRA-Design-Homepage.html — ONE self-contained file. Every image is
     inlined as a data URI, so it opens by double-clicking from anywhere,
     with no folder next to it and no web server. This is the form to send
     to a client or open on a laptop in a meeting.

  2. KIRA-Design-Homepage.zip  — index.html plus a real assets/ folder,
     which is what an actual developer deploys. Images stay as separate
     files so the browser can cache them individually.

Both are built from the same verified source, so they render identically.
"""
import base64
import io
import os
import re
import shutil
import zipfile
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # site root, not scripts/
OUT = os.path.join(ROOT, "dist")
SRC = os.path.join(ROOT, "index.html")

# Section art is generated at print-ish resolution; the page never displays it
# larger than a wide viewport, so cap the long edge before inlining. Keeps the
# single-file build small enough to email without touching visible quality.
MAX_EDGE = 1900
QUALITY = 84


def optimised(path):
    im = Image.open(path).convert("RGB")
    if max(im.size) > MAX_EDGE:
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return buf.getvalue()


def main():
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)

    html = open(SRC, encoding="utf-8").read()
    refs = sorted(set(re.findall(r"assets/[A-Za-z0-9/_.-]+\.jpg", html)))
    print(f"{len(refs)} image reference(s) in index.html")

    # ── 1. single self-contained file ────────────────────────────────
    single = html
    inlined = 0
    for ref in refs:
        src = os.path.join(ROOT, ref)
        if not os.path.exists(src):
            raise SystemExit(f"missing asset: {ref}")
        data = optimised(src)
        uri = "data:image/jpeg;base64," + base64.b64encode(data).decode()
        single = single.replace(ref, uri)
        inlined += 1
        print(f"  inlined {ref:34s} {len(data)//1024:4d} KB")

    if "assets/" in single:
        raise SystemExit("an asset path survived inlining — single file would break offline")

    single_path = os.path.join(OUT, "KIRA-Design-Homepage.html")
    open(single_path, "w", encoding="utf-8").write(single)
    print(f"\n  -> KIRA-Design-Homepage.html  {os.path.getsize(single_path)//1024} KB "
          f"({inlined} images inlined, opens with no folder)")

    # ── 2. deployable folder, zipped ─────────────────────────────────
    readme = """KIRA Design Ltd — Homepage
==========================

TO VIEW
  Open index.html in any browser. Keep the assets/ folder beside it.

  (If you only want a single file with nothing beside it, use
   KIRA-Design-Homepage.html instead — same page, images built in.)

TO DEPLOY
  Upload index.html and the assets/ folder to any web host, keeping
  the same structure. There is no build step, no framework and no
  dependencies — it is plain HTML, CSS and a little JavaScript.

WHAT IS IN IT
  - Bilingual English / 繁體中文, via the toggle at the top right
  - Responsive down to mobile
  - An enquiry form that routes by project type
    (not yet connected to a backend — see below)

STILL TO DO BEFORE GOING LIVE
  1. Photography. The three named project images are deliberately left
     as marked placeholders rather than filled with stand-in imagery,
     because they represent real delivered projects. Every slot is
     labelled with the crop and resolution it needs.
  2. The hotel projects — names, locations, years, scope.
  3. The logo as SVG, to replace the CSS-rendered wordmark.
  4. Point the enquiry form at a real endpoint or inbox.
  5. Have the 繁體中文 copy read by a native speaker in the office.

  Full image direction is in ART-DIRECTION.md in the project repo.
"""

    zip_path = os.path.join(OUT, "KIRA-Design-Homepage.zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        z.writestr("KIRA-Design-Homepage/README.txt", readme)
        z.writestr("KIRA-Design-Homepage/index.html", html)
        for ref in refs:
            z.writestr(f"KIRA-Design-Homepage/{ref}", optimised(os.path.join(ROOT, ref)))
    print(f"  -> KIRA-Design-Homepage.zip   {os.path.getsize(zip_path)//1024} KB "
          f"(index.html + assets/ + README)")


if __name__ == "__main__":
    main()
