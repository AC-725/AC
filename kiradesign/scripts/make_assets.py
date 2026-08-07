#!/usr/bin/env python3
"""
Procedural material and backdrop generator for the KIRA Design site.

There is no image model in this environment, so nothing here pretends to be
a photograph. What it does produce honestly: physically-plausible material
surfaces (marble, walnut, fluted oak, terrazzo, limestone, brushed brass,
granite, lacquer) and art-directed abstract backdrops built from those same
materials plus modelled light.

Everything is derived from the studio's own palette:
    espresso  #16120E    lacquer  #A02C1C    vermilion #E8621C
    oak       #C9A984    champagne #C6A87C   linen     #EFEAE0

Run:  python3 scripts/make_assets.py
Out:  assets/materials/*.jpg   assets/sections/*.jpg
"""

import os
import numpy as np
from PIL import Image, ImageFilter

RNG_BASE = 20260807
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets")

# ── palette ───────────────────────────────────────────────────────────────
ESPRESSO  = (0x16, 0x12, 0x0E)
LACQUER   = (0xA0, 0x2C, 0x1C)
VERMILION = (0xE8, 0x62, 0x1C)
OAK       = (0xC9, 0xA9, 0x84)
CHAMPAGNE = (0xC6, 0xA8, 0x7C)
LINEN     = (0xEF, 0xEA, 0xE0)
WALNUT    = (0x4A, 0x33, 0x24)


# ══ noise primitives ══════════════════════════════════════════════════════
def _smooth(t):
    return t * t * t * (t * (t * 6 - 15) + 10)


def value_noise(h, w, freq, seed):
    """Bilinearly-interpolated value noise on a freq x freq lattice."""
    rng = np.random.default_rng(seed)
    gy, gx = int(freq) + 2, int(freq) + 2
    lat = rng.random((gy, gx))

    ys = np.linspace(0, freq, h, endpoint=False)
    xs = np.linspace(0, freq, w, endpoint=False)
    y0 = ys.astype(int)[:, None]
    x0 = xs.astype(int)[None, :]
    fy = _smooth(ys - ys.astype(int))[:, None]
    fx = _smooth(xs - xs.astype(int))[None, :]

    a = lat[y0, x0]
    b = lat[y0, x0 + 1]
    c = lat[y0 + 1, x0]
    d = lat[y0 + 1, x0 + 1]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy


def fbm(h, w, freq=4, octaves=6, gain=0.5, lac=2.0, seed=0):
    """Fractal Brownian motion — the workhorse for every surface here."""
    out = np.zeros((h, w))
    amp, f, norm = 1.0, float(freq), 0.0
    for o in range(octaves):
        out += amp * value_noise(h, w, f, seed + o * 977)
        norm += amp
        amp *= gain
        f *= lac
    return out / norm


def normalize(a):
    lo, hi = a.min(), a.max()
    return (a - lo) / (hi - lo + 1e-9)


def mix(c1, c2, t):
    """Blend two RGB tuples across a 0..1 field -> (h,w,3) float array."""
    t = t[..., None]
    a = np.array(c1, dtype=float)
    b = np.array(c2, dtype=float)
    return a * (1 - t) + b * t


# ══ materials ═════════════════════════════════════════════════════════════
def marble(h, w, base=LINEN, vein=(0x8E, 0x88, 0x7C), dark=(0x4A, 0x46, 0x40), seed=1):
    """Domain-warped turbulence — the standard way veining actually forms."""
    wx = fbm(h, w, freq=2, octaves=5, seed=seed) - 0.5
    wy = fbm(h, w, freq=2, octaves=5, seed=seed + 101) - 0.5

    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    t = (xx / w * 2.1 + yy / h * 0.8) + wx * 2.9 + wy * 1.7

    def ridge(phase, width, octv_seed):
        """A thin gaussian ridge along the zero-crossings of a warped sine.
        Marble veins are narrow and branching — broad sine bands read as fabric."""
        s = np.abs(np.sin((t + phase) * np.pi))
        branch = (fbm(h, w, freq=9, octaves=3, seed=octv_seed) - 0.5) * 0.22
        return np.exp(-((s + branch) ** 2) / (width ** 2))

    ground = fbm(h, w, freq=14, octaves=5, seed=seed + 55)
    img = mix(base, (0xDD, 0xD7, 0xCB), ground * 0.55)

    # one primary vein network, thin and dark
    v1 = np.clip(ridge(0.00, 0.055, seed + 201), 0, 1)
    # a secondary, softer, wider set at an offset — gives depth, not repetition
    v2 = np.clip(ridge(0.47, 0.16, seed + 202), 0, 1) * 0.45

    img = img * (1 - v2[..., None] * 0.7) + np.array(vein, float) * (v2[..., None] * 0.7)
    img = img * (1 - v1[..., None] * 0.9) + np.array(dark, float) * (v1[..., None] * 0.9)
    return img * (0.96 + 0.08 * ground[..., None])


def _stretched(h, w, freq, octaves, seed, ratio=40):
    """Noise sampled on a squat grid then stretched — features run along x.
    Real grain is strongly anisotropic; isotropic noise reads as contour lines."""
    sw = max(6, int(w / ratio))
    n = fbm(h, sw, freq=freq, octaves=octaves, seed=seed)
    im = Image.fromarray((normalize(n) * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(im, float) / 255.0


def wood(h, w, light=OAK, dark=WALNUT, rings=26, seed=2, grain=1.0):
    """Flat-sawn board: near-parallel rings, gently cathedralled, fine striation.

    The ring warp must stay anisotropic and low-amplitude — an isotropic warp
    closes the rings into loops and the result reads as a topographic map."""
    yy = np.mgrid[0:h, 0:w][0].astype(float)

    # long, shallow undulation along the board — never enough to close a loop
    warp = (_stretched(h, w, freq=3, octaves=3, seed=seed, ratio=26) - 0.5) * 0.16
    fine = (_stretched(h, w, freq=7, octaves=4, seed=seed + 31, ratio=55) - 0.5) * 0.05

    d = (yy / h + warp + fine) * rings
    r = np.abs(np.sin(d * np.pi))
    # sharpen the ring boundary: dark latewood is a thin band, not a soft sine
    r = np.clip(r ** 0.34, 0, 1)

    # fine longitudinal striation, stretched hard along the board
    g = _stretched(h, w, freq=34, octaves=4, seed=seed + 71, ratio=70)
    # pore flecks
    p = _stretched(h, w, freq=90, octaves=2, seed=seed + 143, ratio=90)

    t = np.clip(r * 0.72 + g * 0.2 * grain + p * 0.08, 0, 1)
    img = mix(dark, light, t)
    return img * (0.95 + 0.10 * g[..., None])


def fluted(h, w, base=OAK, batten=34, seed=3, depth=0.55):
    """Vertical battens with cylindrical shading — the studio's slatted joinery."""
    xx = np.arange(w)[None, :].repeat(h, 0).astype(float)
    phase = (xx % batten) / batten                    # 0..1 across one batten
    # cylindrical falloff, brightest just left of centre (light from upper left)
    shade = np.cos((phase - 0.42) * np.pi * 1.9)
    shade = np.clip(shade, -1, 1)
    lit = 0.5 + depth * shade * 0.5

    # a dark reveal in the gap between battens
    gap = np.clip(1.0 - np.abs(phase - 0.98) / 0.06, 0, 1)
    lit = lit * (1 - gap * 0.85)

    # Battens are vertical, so the grain must run vertically too — generate the
    # board on its side and transpose. Grain running across the battens reads
    # as oval blotches once the cylindrical shading is applied.
    rings = max(5, int(w / (batten * 2.6)))
    grain_img = wood(w, h, light=base, dark=(0x7E, 0x61, 0x42),
                     rings=rings, seed=seed, grain=0.45)
    grain_img = np.transpose(grain_img, (1, 0, 2))
    out = np.clip(grain_img * lit[..., None] * 1.25, 0, 255)

    # slight optical softening — a real lens never resolves a hard batten edge
    im = Image.fromarray(out.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    return np.asarray(im, float)


def terrazzo(h, w, base=LINEN, seed=4, chips=2600):
    """Scattered aggregate on a matrix — elliptical chips, mixed stone colours."""
    rng = np.random.default_rng(seed)
    img = mix(base, (0xDF, 0xD8, 0xCA), fbm(h, w, freq=9, octaves=4, seed=seed + 3))
    yy, xx = np.mgrid[0:h, 0:w].astype(float)

    # weighted: aggregate is overwhelmingly neutral stone. Red is an accent
    # that appears rarely — an even split reads as confetti, not terrazzo.
    palette = [(0x8E, 0x88, 0x7C)] * 7 + [(0x3A, 0x37, 0x33)] * 5 + \
              [(0xD8, 0xD2, 0xC6)] * 5 + [(0x4A, 0x33, 0x24)] * 3 + \
              [(0xC6, 0xA8, 0x7C)] * 2 + [(0xA0, 0x2C, 0x1C)]
    scale = (h * w) ** 0.5
    for _ in range(chips):
        cx, cy = rng.random() * w, rng.random() * h
        rx = rng.uniform(0.0022, 0.0085) * scale
        ry = rx * rng.uniform(0.55, 1.5)
        ang = rng.random() * np.pi
        col = np.array(palette[rng.integers(0, len(palette))], float) * rng.uniform(0.85, 1.15)

        # local bounding box only — full-image math per chip is far too slow
        pad = int(max(rx, ry) * 1.6) + 2
        x0, x1 = max(0, int(cx) - pad), min(w, int(cx) + pad)
        y0, y1 = max(0, int(cy) - pad), min(h, int(cy) + pad)
        if x1 <= x0 or y1 <= y0:
            continue
        lx = xx[y0:y1, x0:x1] - cx
        ly = yy[y0:y1, x0:x1] - cy
        rxr = lx * np.cos(ang) + ly * np.sin(ang)
        ryr = -lx * np.sin(ang) + ly * np.cos(ang)
        m = ((rxr / rx) ** 2 + (ryr / ry) ** 2) <= 1.0
        img[y0:y1, x0:x1][m] = np.clip(col, 0, 255)
    return img


def limestone(h, w, base=(0xE4, 0xDE, 0xD2), seed=5):
    """Soft mottled sediment with faint horizontal bedding."""
    a = fbm(h, w, freq=5, octaves=6, seed=seed)
    b = fbm(h, w, freq=30, octaves=3, seed=seed + 17)
    yy = np.mgrid[0:h, 0:w][0].astype(float)
    bedding = 0.5 + 0.5 * np.sin(yy / h * np.pi * 7 + (a - 0.5) * 5)
    t = np.clip(a * 0.62 + b * 0.24 + bedding * 0.14, 0, 1)
    return mix((0xC7, 0xBF, 0xB0), base, t)


def granite(h, w, base=(0x3A, 0x37, 0x33), seed=6, density=52000):
    """Dense speckle over a dark matrix."""
    rng = np.random.default_rng(seed)
    img = mix(base, (0x22, 0x20, 0x1E), fbm(h, w, freq=8, octaves=5, seed=seed))
    n = density
    ys = rng.integers(0, h, n)
    xs = rng.integers(0, w, n)
    tone = rng.random(n)[:, None]
    spec = np.where(tone > 0.72,
                    np.array([0xD8, 0xD2, 0xC6], float),
                    np.array([0x6B, 0x66, 0x60], float))
    img[ys, xs] = spec * rng.uniform(0.8, 1.2, (n, 1))
    return img


def brushed(h, w, base=CHAMPAGNE, seed=7):
    """Anisotropic streaks — brushed metal is noise stretched on one axis."""
    n = fbm(h, max(10, w // 40), freq=48, octaves=4, seed=seed)
    n = np.array(Image.fromarray((n * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)) / 255.0
    broad = fbm(h, w, freq=3, octaves=3, seed=seed + 9)
    t = np.clip(n * 0.55 + broad * 0.45, 0, 1)
    img = mix((0x8A, 0x6E, 0x38), base, t)
    # a soft specular band across the sheet
    yy = np.mgrid[0:h, 0:w][0].astype(float) / h
    band = np.exp(-((yy - 0.34) ** 2) / 0.045)
    return np.clip(img * (0.9 + band[..., None] * 0.5), 0, 255)


def lacquer(h, w, base=LACQUER, seed=8):
    """Deep pigmented lacquer — smooth, with subtle depth and a wide sheen."""
    depth = fbm(h, w, freq=4, octaves=5, seed=seed)
    img = mix((0x79, 0x20, 0x0F), base, depth * 0.8 + 0.2)
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    sheen = np.exp(-(((xx / w - 0.26) ** 2) / 0.10 + ((yy / h - 0.18) ** 2) / 0.30))
    return np.clip(img * (0.88 + sheen[..., None] * 0.55), 0, 255)


# ══ finishing ═════════════════════════════════════════════════════════════
def vignette(img, strength=0.42, softness=0.9):
    h, w = img.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    dx = (xx / w - 0.5) / softness
    dy = (yy / h - 0.5) / softness
    r = np.sqrt(dx ** 2 + dy ** 2) * 1.42
    return img * (1 - np.clip(r, 0, 1)[..., None] ** 2 * strength)


def grain(img, amount=5.0, seed=99):
    rng = np.random.default_rng(seed)
    return img + rng.normal(0, amount, img.shape[:2])[..., None]


def light_pool(img, cx, cy, radius, warmth=(1.18, 1.06, 0.92), power=0.85):
    """A soft pool of warm light — how a room is actually lit."""
    h, w = img.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    d = np.sqrt(((xx / w - cx) / radius) ** 2 + ((yy / h - cy) / (radius * h / w * 1.6)) ** 2)
    fall = np.exp(-d ** 2) * power
    tint = np.array(warmth, float)
    return img * (1 + fall[..., None] * (tint - 1)) * (1 + fall[..., None] * 0.55)


def save(arr, path, quality=88):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    im.save(path, quality=quality, optimize=True)
    print(f"  {os.path.relpath(path, OUT):46s} {im.size[0]}x{im.size[1]}")


# ══ material swatches ═════════════════════════════════════════════════════
def build_materials():
    print("\nMaterials (1000x800):")
    H, W = 800, 1000
    d = os.path.join(OUT, "materials")
    jobs = [
        ("fluted-oak.jpg",       lambda: fluted(H, W, batten=52, seed=11)),
        ("walnut.jpg",           lambda: wood(H, W, light=(0x8A, 0x6A, 0x50), dark=(0x3E, 0x29, 0x19), rings=9, seed=12)),
        ("limestone.jpg",        lambda: limestone(H, W, seed=13)),
        ("marble.jpg",           lambda: marble(H, W, seed=14)),
        ("terrazzo.jpg",         lambda: terrazzo(H, W, seed=15)),
        ("granite.jpg",          lambda: granite(H, W, seed=16)),
        ("champagne-metal.jpg",  lambda: brushed(H, W, seed=17)),
        ("lacquer-red.jpg",      lambda: lacquer(H, W, seed=18)),
    ]
    for name, fn in jobs:
        save(grain(vignette(fn(), 0.22), 3.0), os.path.join(d, name))


# ══ section backdrops ═════════════════════════════════════════════════════
def _paste(canvas, patch, x, y, shadow=14, rot=0.0):
    """Drop a material swatch onto a canvas with a soft contact shadow."""
    ph, pw = patch.shape[:2]
    im = Image.fromarray(np.clip(patch, 0, 255).astype(np.uint8))
    if rot:
        im = im.rotate(rot, resample=Image.BICUBIC, expand=True)
    pw, ph = im.size

    sh = Image.new("L", (pw, ph), 255).filter(ImageFilter.GaussianBlur(0))
    sh = Image.new("L", (pw + shadow * 4, ph + shadow * 4), 0)
    sh.paste(255, (shadow * 2, shadow * 2, shadow * 2 + pw, shadow * 2 + ph))
    sh = sh.filter(ImageFilter.GaussianBlur(shadow))
    sm = np.asarray(sh, float) / 255.0

    H, W = canvas.shape[:2]
    sy, sx = y - shadow * 2 + shadow // 2, x - shadow * 2 + shadow // 2
    y0, y1 = max(0, sy), min(H, sy + sm.shape[0])
    x0, x1 = max(0, sx), min(W, sx + sm.shape[1])
    if y1 > y0 and x1 > x0:
        sub = sm[y0 - sy:y1 - sy, x0 - sx:x1 - sx]
        # warm, shallow contact shadow. A dense neutral shadow makes the
        # swatches read as paper cut-outs floating above the board.
        canvas[y0:y1, x0:x1] *= (1 - sub[..., None] * np.array([0.30, 0.33, 0.36]))

    arr = np.asarray(im, float)
    y0, y1 = max(0, y), min(H, y + ph)
    x0, x1 = max(0, x), min(W, x + pw)
    if y1 > y0 and x1 > x0:
        canvas[y0:y1, x0:x1] = arr[y0 - y:y1 - y, x0 - x:x1 - x]
    return canvas


def sec_material_board(h, w):
    """The studio's own material board — overlapping swatches on fluted oak."""
    canvas = fluted(h, w, batten=int(w / 15), seed=21) * 0.70
    sw = int(w * 0.235)
    plan = [
        (limestone(sw, sw, seed=31),                                   int(w * .05), int(h * .30), -4),
        (terrazzo(sw, sw, seed=32),                                    int(w * .21), int(h * .17),  3),
        (marble(int(sw * .95), int(sw * .95), seed=33),                int(w * .40), int(h * .34), -2),
        (wood(int(sw * .62), int(sw * .62), light=(0x8A, 0x6A, 0x50),
              dark=(0x3E, 0x29, 0x19), rings=6, seed=34),              int(w * .34), int(h * .12),  6),
        (granite(int(sw * 1.05), int(sw * 1.05), seed=35),             int(w * .57), int(h * .18), -3),
        (brushed(int(sw * .55), int(sw * .8), seed=36),                int(w * .74), int(h * .46),  2),
        (lacquer(int(sw * .7), int(sw * .7), seed=37),                 int(w * .80), int(h * .12), -5),
    ]
    for patch, x, y, rot in plan:
        canvas = _paste(canvas, patch, x, y, shadow=int(w * 0.020), rot=rot)
    canvas = light_pool(canvas, 0.30, 0.20, 0.62, power=0.55)
    return grain(vignette(canvas, 0.40), 4.0)


def sec_hero(h, w):
    """Warm light raking across fluted oak, with the lacquer wall beyond."""
    oak = fluted(h, w, batten=int(w / 19), seed=41)
    lac = lacquer(h, w, seed=42)
    xx = np.mgrid[0:h, 0:w][1].astype(float) / w
    # oak joinery on the left two-thirds, lacquer wall on the right
    edge = np.clip((xx - 0.60) * 14, 0, 1)
    img = oak * (1 - edge[..., None]) + lac * edge[..., None]
    img *= (0.42 + 0.72 * np.clip(1.25 - xx, 0, 1.25)[..., None])   # falloff from the light
    img = light_pool(img, 0.20, 0.16, 0.52, power=1.05)
    yy = np.mgrid[0:h, 0:w][0].astype(float) / h
    img *= (0.55 + 0.55 * np.clip(1.15 - yy, 0, 1.15))[..., None]   # floor falls into shadow
    return grain(vignette(img, 0.52, 1.05), 4.5)


def sec_dark_stone(h, w, seed=51):
    img = granite(h, w, seed=seed) * 1.05
    img = light_pool(img, 0.72, 0.30, 0.55, power=0.42)
    return grain(vignette(img, 0.46), 3.5)


def sec_triptych(h, w):
    """Design / Build / Furnish, told as three materials meeting."""
    third = w // 3
    a = fluted(h, third, batten=int(third / 6), seed=61)
    b = granite(h, third, seed=62) * 1.15
    c = brushed(h, w - third * 2, seed=63)
    img = np.concatenate([a, b, c], axis=1)
    xx = np.mgrid[0:h, 0:w][1].astype(float)
    for e in (third, third * 2):                                     # dark reveal at each joint
        img *= (1 - np.exp(-((xx - e) ** 2) / (w * 0.0006))[..., None] * 0.55)
    img = light_pool(img, 0.5, 0.22, 0.75, power=0.45)
    return grain(vignette(img, 0.38), 3.5)


def sec_room_light(h, w, warm=True):
    """An abstract interior: stone floor, warm wall wash, light from one side."""
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    ny, nx = yy / h, xx / w
    horizon = 0.56
    wall = limestone(h, w, seed=71) * (1.02 if warm else 0.9)
    floor = marble(h, w, base=(0xD8, 0xD0, 0xC2), seed=72) * 0.86
    m = np.clip((ny - horizon) * 22, 0, 1)[..., None]
    img = wall * (1 - m) + floor * m
    img *= (1 - np.exp(-((ny - horizon) ** 2) / 0.0006)[..., None] * 0.42)   # skirting shadow
    img = light_pool(img, 0.74, 0.30, 0.46, power=1.15)
    img *= (0.5 + 0.62 * np.clip(nx + 0.25, 0, 1.35))[..., None]
    return grain(vignette(img, 0.5), 4.0)


def sec_lacquer_wall(h, w):
    """The reception wall: deep lacquer, oak joinery entering from the left."""
    lac = lacquer(h, w, seed=81)
    oak = fluted(h, w, batten=int(w / 21), seed=82)
    xx = np.mgrid[0:h, 0:w][1].astype(float) / w
    edge = np.clip((xx - 0.26) * 16, 0, 1)
    img = oak * (1 - edge[..., None]) + lac * edge[..., None]
    img = light_pool(img, 0.60, 0.26, 0.50, power=0.85)
    yy = np.mgrid[0:h, 0:w][0].astype(float) / h
    img *= (0.6 + 0.5 * np.clip(1.1 - yy, 0, 1.1))[..., None]
    return grain(vignette(img, 0.48), 4.0)


def build_sections():
    print("\nSection backdrops:")
    d = os.path.join(OUT, "sections")
    W21, H21 = 2400, 1030          # 21:9  — hero band
    W16, H16 = 2000, 1125          # 16:9  — standard section
    jobs = [
        ("01-hero.jpg",         lambda: sec_hero(H21, W21)),
        ("02-honours.jpg",      lambda: sec_dark_stone(560, W21, seed=52)),
        ("03-model.jpg",        lambda: sec_triptych(H16, W16)),
        ("04-work-lead.jpg",    lambda: sec_room_light(H16, W16)),
        ("05-materials.jpg",    lambda: sec_material_board(H16, W16)),
        ("06-clients.jpg",      lambda: sec_dark_stone(700, W16, seed=53)),
        ("07-studio.jpg",       lambda: sec_lacquer_wall(H16, W16)),
        ("08-contact.jpg",      lambda: sec_room_light(H16, W16, warm=False)),
    ]
    for name, fn in jobs:
        save(fn(), os.path.join(d, name), quality=86)


if __name__ == "__main__":
    print("KIRA — procedural asset generation")
    build_materials()
    build_sections()
    print(f"\nDone. Written to {OUT}/")
