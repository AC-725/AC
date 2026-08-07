#!/usr/bin/env python3
"""
KIRA Design Ltd — Website Revamp pitch deck, as a vector PDF.

This mirrors build.js (the pptxgenjs deck) slide-for-slide, layout-for-layout,
copy-for-copy — not a screenshot of it. LibreOffice cannot convert this
sandbox's .pptx to PDF (confirmed a sandbox-level defect: soffice fails even
on a plain one-line .txt file, independent of the socket shim the toolkit
already carries for AF_UNIX restrictions), so rather than ship a rasterized
image-per-page substitute, this rebuilds the deck directly with reportlab —
real selectable text, crisp at any zoom, in the same 13.333x7.5in frame.

Fonts are the same metric-compatible substitutes preview.py used for the
PPTX's visual QA (Liberation Sans for Arial/Calibri, Liberation Serif for
the Cambria italic accent, WenQuanYi Zen Hei for 紅牆), so this reads
identically to the deck already reviewed.
"""
import os
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(HERE, "img") + "/"
OUT = os.path.join(HERE, "KIRA-Design-Website-Revamp.pdf")

PAGE_W, PAGE_H = 13.333 * inch, 7.5 * inch

# ── palette — identical values to build.js ─────────────────────────────
INK, LACQUER, VERMILION = "#131110", "#A02C1C", "#E8621C"
OAK, CHAMPAGNE, LINEN, PAPER = "#C9A984", "#C6A87C", "#F5F1EA", "#FBF9F5"
MUTED, ON_DARK, ON_DARK_2 = "#6B6259", "#F2EDE4", "#A99C8D"
PEACH, PEACH_LT, RED_CARD, RED_CARD_LT = "#F6C9A8", "#FFD9C4", "#F0C4B8", "#F2C9BC"

# ── fonts ────────────────────────────────────────────────────────────
FT = os.path.join(os.sep, "usr", "share", "fonts", "truetype")
pdfmetrics.registerFont(TTFont("Sans",        FT + "/liberation/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold",   FT + "/liberation/LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Serif-It",    FT + "/liberation/LiberationSerif-Italic.ttf"))
pdfmetrics.registerFont(TTFont("Serif-BoldIt",FT + "/liberation/LiberationSerif-BoldItalic.ttf"))
pdfmetrics.registerFont(TTFont("CJK",         FT + "/wqy/wqy-zenhei.ttc"))

c = canvas.Canvas(OUT, pagesize=(PAGE_W, PAGE_H))
c.setTitle("KIRA Design — Website Revamp")
c.setAuthor("KIRA Design Ltd")


def hx(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def top(y_in):
    """Convert 'inches down from the top' (how build.js thinks) to
    reportlab's bottom-left origin."""
    return PAGE_H - y_in * inch


def fill(hexcol, alpha=1.0):
    r, g, b = hx(hexcol)
    c.setFillColorRGB(r, g, b, alpha=alpha)


def rect(x, y, w, h, color, alpha=1.0):
    fill(color, alpha)
    c.rect(x * inch, top(y) - h * inch, w * inch, h * inch, stroke=0, fill=1)


def image(path, x, y, w, h, cover=True):
    # Non-stroking alpha ("ca") is a persistent graphics-state value in PDF —
    # it applies to images as well as fills, and reportlab does not reset it
    # for you. Any prior low-alpha rect() (shadows, overlays) would otherwise
    # bleed into this image and wash it out toward invisible.
    c.setFillAlpha(1)
    img = ImageReader(path)
    iw, ih = img.getSize()
    if cover:
        scale = max(w / (iw / 100.0), h / (ih / 100.0))
        dw, dh = (iw / 100.0) * scale, (ih / 100.0) * scale
        ox, oy = (dw - w) / 2, (dh - h) / 2
        c.saveState()
        p = c.beginPath()
        p.rect(x * inch, top(y) - h * inch, w * inch, h * inch)
        c.clipPath(p, stroke=0)
        c.drawImage(img, (x - ox) * inch, top(y) - h * inch - oy * inch,
                    dw * inch, dh * inch, mask="auto")
        c.restoreState()
    else:
        c.drawImage(img, x * inch, top(y) - h * inch, w * inch, h * inch, mask="auto")


def shadow_image(path, x, y, w, h):
    """A soft drop shadow approximated as stacked translucent offsets —
    reportlab has no native blur, so this steps the alpha outward."""
    for i, a in enumerate([0.03, 0.025, 0.02, 0.015, 0.01, 0.007]):
        off = (i + 1) * 0.014
        rect(x + off, y + off, w, h, "#000000", a)
    image(path, x, y, w, h)


def wrap_runs(runs, box_w_in, size):
    """Greedy word-wrap across styled runs, splitting on spaces while
    preserving each word's own colour/font/size."""
    words = []
    for txt, col, fnt, fsz in runs:
        for i, w in enumerate(txt.split(" ")):
            if i:
                words.append((" ", col, fnt, fsz or size))
            if w:
                words.append((w, col, fnt, fsz or size))

    lines, cur, cur_w = [], [], 0.0
    limit = box_w_in * inch
    for w, col, fnt, fsz in words:
        ww = c.stringWidth(w, fnt, fsz)
        if cur and cur_w + ww > limit and w != " ":
            while cur and cur[-1][0] == " ":
                cur.pop()
            lines.append(cur); cur, cur_w = [], 0.0
        cur.append((w, col, fnt, fsz)); cur_w += ww
    if cur:
        while cur and cur[-1][0] == " ":
            cur.pop()
        lines.append(cur)
    return lines


def para(runs, x, y_in, box_w_in, size, leading=None, color=None):
    if isinstance(runs, str):
        runs = [(runs, color or MUTED, "Sans", size)]
    for i, (t, col, f, s) in enumerate(runs):
        if col is None:
            runs[i] = (t, color or MUTED, f, s)
    lines = wrap_runs(runs, box_w_in, size)
    leading = leading or size * 1.35
    baseline = top(y_in) - size * 0.82
    for line in lines:
        cx = x * inch
        for txt, col, fnt, fsz in line:
            if not txt:
                continue
            fill(col); c.setFont(fnt, fsz)
            c.drawString(cx, baseline, txt)
            cx += c.stringWidth(txt, fnt, fsz)
        baseline -= leading
    return (top(y_in) - baseline) / inch  # total height consumed


def chip(path_key, x, y, size):
    image(IMG + f"chip-{path_key}.jpg", x, y, size, size, cover=False)


def is_cjk(ch):
    return "一" <= ch <= "鿿" or "　" <= ch <= "〿" or "＀" <= ch <= "￯"


def draw_mixed(x_in, y_in, size, s, font="Sans", color=ON_DARK):
    """Draw a line that may mix Latin and CJK text, routing each run to
    a font that actually has the glyphs — Liberation Sans has no CJK
    coverage and silently renders those characters as tofu boxes."""
    fill(color)
    cx = x_in * inch
    baseline = top(y_in) - size * 0.82
    buf, buf_cjk = "", None

    def flush():
        nonlocal cx
        if not buf:
            return
        f = "CJK" if buf_cjk else font
        c.setFont(f, size)
        c.drawString(cx, baseline, buf)
        cx += c.stringWidth(buf, f, size)

    for ch in s:
        cjk = is_cjk(ch)
        if buf_cjk is None or cjk == buf_cjk:
            buf += ch
        else:
            flush(); buf = ch
        buf_cjk = cjk
    flush()


def wordmark(x, y, size, on_dark):
    """K|RA, with a tight 'DESIGN LTD' lockup directly beneath — sized off
    the main line's own baseline, not a fraction borrowed from pptxgenjs's
    unrelated box-top convention (that produced a ~0.4in gap instead)."""
    ink = ON_DARK if on_dark else INK
    muted = ON_DARK_2 if on_dark else MUTED
    main_baseline = top(y) - size * 0.78
    c.setFont("Sans", size)
    cx = x * inch
    for ch, col in [("K", ink), ("I", VERMILION), ("R", ink), ("A", ink)]:
        fill(col); c.drawString(cx, main_baseline, ch)
        cx += c.stringWidth(ch, "Sans", size) + size * 0.34
    sub_size = size * 0.26
    fill(muted); c.setFont("Sans", sub_size)
    c.drawString(x * inch, main_baseline - size * 0.34, "D E S I G N   L T D")


CHIP_ROW = ["lacquer-red", "fluted-oak", "walnut", "limestone", "champagne-metal", "granite"]

# ════════════════════════════════════════════════════════════════════
# SLIDE 1 — TITLE
# ════════════════════════════════════════════════════════════════════
rect(0, 0, 13.333, 7.5, INK)
image(IMG + "bg-hero.jpg", 0, 0, 13.333, 7.5)
rect(0, 0, 13.333, 7.5, INK, 0.26)
rect(0, 0, 7.6, 7.5, INK, 0.12)

wordmark(0.85, 0.72, 26, True)

c.setFont("Sans", 11); fill(OAK)
c.drawString(0.85 * inch, top(2.35) - 11 * 0.82, "W E B S I T E   R E V A M P     ·     2 0 2 6")

fill(ON_DARK); c.setFont("CJK", 40)
c.drawString(0.85 * inch, top(2.9) - 40 * 0.82, "紅牆")

y = 3.75
fill(ON_DARK); c.setFont("Sans", 54)  # matches build.js: no bold on this line
c.drawString(0.85 * inch, top(y) - 54 * 0.78, "The Red")
w1 = c.stringWidth("The Red", "Sans", 54)
fill(PEACH); c.setFont("Serif-It", 54)
c.drawString(0.85 * inch + w1 + 54 * 0.28, top(y) - 54 * 0.78, "Wall")

para([("A homepage built the way KIRA builds a room — from its own materials, "
       "its own light, and its own red wall.", ON_DARK_2, "Sans", 15)],
     0.85, 5.15, 6.5, 15, leading=24)

for i, m in enumerate(CHIP_ROW):
    chip(m, 0.85 + i * 0.45, 6.35, 0.36)

c.setFont("Sans", 11); fill(ON_DARK_2)
c.drawString(0.85 * inch, top(6.9) - 11 * 0.82, "Prepared for Kim Wong, Design Director")

c.showPage()

# ════════════════════════════════════════════════════════════════════
# SLIDE 2 — THE DIAGNOSIS
# ════════════════════════════════════════════════════════════════════
rect(0, 0, 13.333, 7.5, LINEN)

c.setFont("Sans-Bold", 11); fill(LACQUER)
c.drawString(0.85 * inch, top(0.62) - 11 * 0.82, "0 1   —   W H E R E   W E   A R E")

c.setFont("Sans", 38); fill(INK)
c.drawString(0.85 * inch, top(1.06) - 38 * 0.78, "The work is better than the")
w1 = c.stringWidth("The work is better than the", "Sans", 38)
fill(LACQUER); c.setFont("Serif-It", 38)
c.drawString(0.85 * inch + w1 + 38 * 0.22, top(1.06) - 38 * 0.78, "website.")

findings = [
    ("walnut", "Awards sit on top of the photography",
     "Four badges cover the rooms you were awarded for. They shrink the work they're meant to prove."),
    ("limestone", "Projects are thumbnails, not evidence",
     "No developer, area, scope or year. A buyer can't assess capability from a caption in brackets."),
    ("granite", "Your best clients are a footnote",
     "Henderson, Chinachem, Wheelock, Grand Ming, Poly, K&K — the strongest credential you own, set in small grey text."),
    ("champagne-metal", "The categories don't match the grid",
     "Commercial / Residential / Art Collection read as columns, but the projects beneath them ignore it."),
]
for i, (m, head, body) in enumerate(findings):
    fy = 2.2 + i * 1.16
    chip(m, 0.85, fy + 0.04, 0.32)
    c.setFont("Sans-Bold", 15); fill(INK)
    c.drawString(1.35 * inch, top(fy) - 15 * 0.78, head)
    para(body, 1.35, fy + 0.36, 6.6, 12.5, leading=17, color=MUTED)

rect(8.9, 2.2, 3.6, 3.55, LACQUER)
c.setFont("Sans", 9.5); fill(RED_CARD)
c.drawString(9.3 * inch, top(2.6) - 9.5 * 0.82, "I N   Y O U R   O W N   W O R D S")

quote_runs = [
    ("“Minimal, but it does not bring out the ", "#FFF8F0", "Serif-It", 19),
    ("Interior Design", "#FFD9C4", "Serif-BoldIt", 19),
    (" advantage.”", "#FFF8F0", "Serif-It", 19),
]
para(quote_runs, 9.3, 3.08, 2.9, 19, leading=27)
para("That is the whole brief. Restraint only reads as confidence when something is being withheld.",
     9.3, 4.85, 2.9, 11, leading=15, color=RED_CARD_LT)

c.showPage()

# ════════════════════════════════════════════════════════════════════
# SLIDE 3 — THE IDEA  (material board on the right, per the swapped layout)
# ════════════════════════════════════════════════════════════════════
rect(0, 0, 13.333, 7.5, INK)
image(IMG + "bg-board.jpg", 6.9, 0, 6.433, 7.5)
rect(6.9, 0, 6.433, 7.5, INK, 0.42)

c.setFont("Sans-Bold", 11); fill(OAK)
c.drawString(0.85 * inch, top(0.62) - 11 * 0.82, "0 2   —   T H E   I D E A")

fill(ON_DARK); c.setFont("Sans", 34)
c.drawString(0.85 * inch, top(1.06) - 34 * 0.78, "Your palette was already")
c.drawString(0.85 * inch, top(1.06 + 0.62) - 34 * 0.78, "in your")
w1 = c.stringWidth("in your ", "Sans", 34)
fill(CHAMPAGNE); c.setFont("Serif-It", 34)
c.drawString(0.85 * inch + w1, top(1.06 + 0.62) - 34 * 0.78, "reception.")

para("A lacquer-red wall. Black lettering. Pale oak battens. An orange bench — "
     "the same orange as the I in your wordmark. Nothing needed inventing; it needed noticing.",
     0.85, 2.75, 5.5, 14, leading=22, color=ON_DARK_2)

for i, (m, name, hexv) in enumerate([
    ("lacquer-red", "Lacquer", "#A02C1C"), ("fluted-oak", "Oak", "#C9A984"),
    ("walnut", "Walnut", "#4A3324"), ("limestone", "Limestone", "#E4DED2"),
    ("champagne-metal", "Champagne", "#C6A87C"), ("granite", "Granite", "#3A3733"),
]):
    x = 0.85 + i * 0.92
    chip(m, x, 4.35, 0.78)
    c.setFont("Sans", 9.5); fill(ON_DARK)
    c.drawString((x - 0.06) * inch, top(5.24) - 9.5 * 0.82, name)
    c.setFont("Sans", 8.5); fill(ON_DARK_2)
    c.drawString((x - 0.06) * inch, top(5.45) - 8.5 * 0.82, hexv)

para([("Almost nobody in Hong Kong luxury interiors uses red. ", ON_DARK, "Sans", 13.5),
      ("It is auspicious, and it is unmistakably yours.", CHAMPAGNE, "Sans", 13.5)],
     0.85, 6.0, 5.7, 13.5, leading=20)

c.showPage()

# ════════════════════════════════════════════════════════════════════
# SLIDE 4 — THE SITE
# ════════════════════════════════════════════════════════════════════
rect(0, 0, 13.333, 7.5, PAPER)

c.setFont("Sans-Bold", 11); fill(LACQUER)
c.drawString(0.85 * inch, top(0.55) - 11 * 0.82, "0 3   —   T H E   N E W   H O M E P A G E")

fill(INK); c.setFont("Sans", 34)
c.drawString(0.85 * inch, top(0.97) - 34 * 0.78, "Built, not")
w1 = c.stringWidth("Built, not ", "Sans", 34)
fill(LACQUER); c.setFont("Serif-It", 34)
c.drawString(0.85 * inch + w1, top(0.97) - 34 * 0.78, "sketched.")

shadow_image(IMG + "page-hero.jpg", 0.85, 1.85, 7.75, 4.84)
draw_mixed(0.85, 6.82, 11, "Live, responsive, bilingual EN / 繁體中文 — not a mockup.", color=MUTED)

c.setFont("Sans", 10); fill(MUTED)
c.drawString(9.15 * inch, top(1.85) - 10 * 0.82, "W H A T   C H A N G E S")

fixes = [
    ("walnut", "Awards move off the photography", "Into a typographic honours rail. The rooms are finally uncovered."),
    ("limestone", "Projects become plates", "Developer, area, scope, year and award on every one."),
    ("granite", "Your clients lead", "Six major Hong Kong developers, given their own section."),
    ("champagne-metal", "Four clear routes", "Residential · Commercial · Hospitality · Art Collection."),
    ("lacquer-red", "The form routes itself", "A developer brief and a private home reach different people."),
]
for i, (m, head, body) in enumerate(fixes):
    fy = 2.32 + i * 0.94
    chip(m, 9.15, fy + 0.03, 0.26)
    c.setFont("Sans-Bold", 12.5); fill(INK)
    c.drawString(9.56 * inch, top(fy) - 12.5 * 0.78, head)
    para(body, 9.56, fy + 0.3, 3.15, 11, leading=15, color=MUTED)

c.showPage()

# ════════════════════════════════════════════════════════════════════
# SLIDE 5 — NEXT  (studio/reception background, per the swapped layout)
# ════════════════════════════════════════════════════════════════════
rect(0, 0, 13.333, 7.5, LACQUER)
image(IMG + "bg-studio.jpg", 0, 0, 13.333, 7.5)
rect(0, 0, 13.333, 7.5, LACQUER, 0.92)

c.setFont("Sans-Bold", 11); fill(RED_CARD)
c.drawString(0.85 * inch, top(0.72) - 11 * 0.82, "0 4   —   T O   G O   L I V E")

fill("#FFF8F0"); c.setFont("Sans", 38)
c.drawString(0.85 * inch, top(1.16) - 38 * 0.78, "Three things, and it")
w1 = c.stringWidth("Three things, and it ", "Sans", 38)
fill(PEACH_LT); c.setFont("Serif-It", 38)
c.drawString(0.85 * inch + w1, top(1.16) - 38 * 0.78, "ships.")

asks = [
    ("01", "Your photography", "Whatever exists, at whatever quality. Every image slot is already sized and labelled for what it needs."),
    ("02", "The hotel projects", "Names, locations, years and scope. Hospitality becomes a real fourth route the moment they arrive."),
    ("03", "The logo as SVG", "The wordmark is staying. Real letterforms will tune the spacing of the whole type system."),
]
for i, (n, head, body) in enumerate(asks):
    x = 0.85 + i * 4.05
    rect(x, 2.5, 3.6, 2.5, "#7A1F10", 0.78)
    # numeral and headline need a clean baseline gap — the direct
    # port of build.js's box-top coordinates compressed them into
    # each other (the numeral's descender zone overlapped the
    # headline's cap-height zone)
    fill("#FFC9A8"); c.setFont("Serif-It", 26)
    c.drawString((x + 0.35) * inch, top(2.95) - 26 * 0.78, n)
    fill("#FFF8F0"); c.setFont("Sans-Bold", 15)
    c.drawString((x + 0.35) * inch, top(3.60) - 15 * 0.78, head)
    para(body, x + 0.35, 3.92, 2.95, 11.5, leading=16, color="#F5CFC4")

para("Once those land: project pages, the three sector routes, and the Chinese copy read "
     "by someone in your office. Two weeks to a site you can send a developer.",
     0.85, 5.35, 8.2, 13.5, leading=21, color="#FFF0E6")

wordmark(0.85, 6.45, 20, True)
c.setFont("Sans", 12); fill("#F5CFC4")
line = "admin@kiradesign.com.hk   ·   +852 2981 2838"
c.drawString((12.5 - c.stringWidth(line, "Sans", 12)) * inch, top(6.62) - 12 * 0.82, line)

c.showPage()
c.save()
print(f"wrote {OUT}  ({os.path.getsize(OUT)//1024} KB)")
