#!/usr/bin/env python3
"""
AC — VO script PDF generator.

Turns a beat-sheet's VO column into a black-and-gold, record-while-reading PDF.
AC's standing preference (2026-07-29): every run ships the VO as a PDF.

Usage:
    python3 make_vo_pdf.py spec.json out.pdf

spec.json shape:
{
  "day": 16,
  "title": "Microsoft · Not behind. Not paying.",
  "cut": "24s · column theme",
  "file": "AC_News_Day16_microsoft-115-9B_silent.mp4",
  "meta": "58 words · 79 syllables · 3.33 syl/sec",
  "scenes": [
    {"t": "0.0s", "id": "A · hook", "line": "...", "cue": "..."},
    ...
  ],
  "clean_read": "...",
  "notes": ["...", "..."],
  "gate": "optional one-line wording gate reminder"
}

Design rules baked in:
  - Flat #0A0A0A ground, one gold accent. Same brand law as the reels.
  - The LINE is the hero: large Gloock, high contrast, never competes with the cue.
  - Timecodes are gold and left-anchored so the eye can jump while speaking.
  - Cues sit under the line in small stone type — present, subordinate.
  - Auto-paginates; every page repeats the day/cut header.
"""
import json
import sys
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

BLACK = HexColor("#0A0A0A")
GOLD = HexColor("#E7C765")
GOLD_DEEP = HexColor("#C9A23F")
WHITE = HexColor("#F4F0E7")
STONE = HexColor("#B9B1A1")
GREY = HexColor("#6F6A60")

FONT_DIR = Path(__file__).resolve().parent.parent / "assets" / "fonts"
DISPLAY, BODY, BODY_B = "Helvetica-Bold", "Helvetica", "Helvetica-Bold"
try:
    pdfmetrics.registerFont(TTFont("Gloock", str(FONT_DIR / "Gloock-Regular.ttf")))
    DISPLAY = "Gloock"
except Exception:
    pass
try:
    pdfmetrics.registerFont(TTFont("Bricolage", str(FONT_DIR / "BricolageGrotesque-Bold.ttf")))
    BODY_B = "Bricolage"
except Exception:
    pass

W, H = A4
ML, MR = 48, 48
CW = W - ML - MR


def wrap(c, text, font, size, width):
    c.setFont(font, size)
    return simpleSplit(text, font, size, width)


def ground(c, day, cut):
    c.setFillColor(BLACK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#3A3020"))
    c.setLineWidth(0.8)
    c.rect(24, 24, W - 48, H - 48, fill=0, stroke=1)
    c.setFillColor(GOLD)
    c.setFont(BODY_B, 8.5)
    c.drawString(ML, H - 46, f"AC  ·  DAY {day}  ·  VO SCRIPT".upper())
    c.setFillColor(GREY)
    c.drawRightString(W - MR, H - 46, cut.upper())
    c.setStrokeColor(HexColor("#2A2418"))
    c.line(ML, H - 56, W - MR, H - 56)
    # bottom gold rule = the base theme's block
    c.setFillColor(GOLD_DEEP)
    c.rect(24, 24, (W - 48) * 0.34, 3, fill=1, stroke=0)
    c.setFillColor(GREY)
    c.setFont(BODY, 7.5)
    c.drawRightString(W - MR, 34, "@itsac.ai")


def new_page(c, day, cut):
    c.showPage()
    ground(c, day, cut)
    return H - 92


def build(spec, out):
    day, cut = spec["day"], spec["cut"]
    c = canvas.Canvas(str(out), pagesize=A4)
    c.setTitle(f"AC Day {day} — VO script")
    ground(c, day, cut)
    y = H - 92

    # title block
    c.setFillColor(WHITE)
    for ln in wrap(c, spec["title"], DISPLAY, 25, CW):
        c.setFont(DISPLAY, 25)
        c.drawString(ML, y, ln)
        y -= 30
    y -= 4
    c.setFillColor(GOLD)
    c.setFont(BODY, 9.5)
    c.drawString(ML, y, spec["meta"])
    y -= 14
    c.setFillColor(GREY)
    c.setFont(BODY, 9)
    c.drawString(ML, y, f"Record over  {spec['file']}")
    y -= 26

    if spec.get("gate"):
        c.setFillColor(HexColor("#1A1610"))
        gl = wrap(c, spec["gate"], BODY, 9, CW - 24)
        bh = 14 + 12 * len(gl)
        c.rect(ML, y - bh + 12, CW, bh, fill=1, stroke=0)
        c.setFillColor(GOLD_DEEP)
        c.rect(ML, y - bh + 12, 2.5, bh, fill=1, stroke=0)
        c.setFillColor(STONE)
        yy = y + 2
        for ln in gl:
            c.setFont(BODY, 9)
            c.drawString(ML + 14, yy, ln)
            yy -= 12
        y -= bh + 14

    # scenes
    for sc in spec["scenes"]:
        line_l = wrap(c, f'"{sc["line"]}"', DISPLAY, 17, CW - 78)
        cue_l = wrap(c, sc["cue"], BODY, 9, CW - 78)
        need = 22 + 22 * len(line_l) + 12 * len(cue_l) + 20
        if y - need < 70:
            y = new_page(c, day, cut)

        c.setFillColor(GOLD)
        c.setFont(BODY_B, 13)
        c.drawString(ML, y, sc["t"])
        c.setFillColor(GREY)
        c.setFont(BODY, 8)
        c.drawString(ML, y - 13, sc["id"].upper())

        tx = ML + 78
        c.setFillColor(WHITE)
        yy = y
        for ln in line_l:
            c.setFont(DISPLAY, 17)
            c.drawString(tx, yy, ln)
            yy -= 22
        yy -= 3
        c.setFillColor(STONE)
        for ln in cue_l:
            c.setFont(BODY, 9)
            c.drawString(tx, yy, ln)
            yy -= 12

        y = yy - 12
        c.setStrokeColor(HexColor("#241F14"))
        c.setLineWidth(0.7)
        c.line(ML, y + 4, W - MR, y + 4)
        y -= 14

    # clean read
    cr = wrap(c, spec["clean_read"], DISPLAY, 12.5, CW - 28)
    need = 40 + 18 * len(cr)
    if y - need < 70:
        y = new_page(c, day, cut)
    c.setFillColor(GOLD)
    c.setFont(BODY_B, 9)
    c.drawString(ML, y, "ONE-BREATH CLEAN READ")
    y -= 20
    c.setFillColor(HexColor("#14110B"))
    c.rect(ML, y - 18 * len(cr) + 8, CW, 18 * len(cr) + 12, fill=1, stroke=0)
    c.setFillColor(WHITE)
    yy = y
    for ln in cr:
        c.setFont(DISPLAY, 12.5)
        c.drawString(ML + 14, yy, ln)
        yy -= 18
    y = yy - 16

    # notes — measure real wrapped height, don't estimate (an over-estimate
    # exiles four bullets onto an otherwise empty page 2)
    if spec.get("notes"):
        nh = 18
        for n in spec["notes"]:
            nh += 12.5 * len(wrap(c, n, BODY, 9.5, CW - 18)) + 6
        if y - nh < 52:
            y = new_page(c, day, cut)
        c.setFillColor(GOLD)
        c.setFont(BODY_B, 9)
        c.drawString(ML, y, "BEFORE YOU RECORD")
        y -= 18
        for n in spec["notes"]:
            nl = wrap(c, n, BODY, 9.5, CW - 18)
            c.setFillColor(GOLD_DEEP)
            c.circle(ML + 3, y + 3, 2, fill=1, stroke=0)
            c.setFillColor(STONE)
            for ln in nl:
                c.setFont(BODY, 9.5)
                c.drawString(ML + 14, y, ln)
                y -= 12.5
            y -= 6

    c.save()
    return out


if __name__ == "__main__":
    spec = json.loads(Path(sys.argv[1]).read_text())
    print("wrote", build(spec, sys.argv[2]))
