#!/usr/bin/env python3
"""Prepare baked icons3d PNGs for mounting on a Prompt Drop slide.

The baked icons are 900x800 with ~60% transparent padding, so mounted raw they
read as faint smudges at feed size. This crops each to its alpha bbox, squares
it so mounts stay consistent, then lifts alpha and RGB so the thin gold
wireframe survives at ~208px on flat #0A0A0A.

    python3 prep_icons.py <src_dir> <out_dir> [names...]

Never writes back over assets/icons3d — the originals stay untouched.
"""
import os, shutil, sys
from PIL import Image

A_GAIN = 2.1
RGB_GAIN = (1.28, 1.22, 1.10)

def prep(src, dst):
    im = Image.open(src).convert('RGBA')
    bb = im.getchannel('A').getbbox()
    if bb:
        im = im.crop(bb)
    s = max(im.size)
    sq = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    sq.paste(im, ((s - im.width) // 2, (s - im.height) // 2), im)
    r, g, b, a = sq.split()
    a = a.point(lambda v: min(255, int(v * A_GAIN)))
    r = r.point(lambda v: min(255, int(v * RGB_GAIN[0])))
    g = g.point(lambda v: min(255, int(v * RGB_GAIN[1])))
    b = b.point(lambda v: min(255, int(v * RGB_GAIN[2])))
    Image.merge('RGBA', (r, g, b, a)).save(dst)
    return sq.size

def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    src_dir, out_dir = sys.argv[1], sys.argv[2]
    names = sys.argv[3:]
    if os.path.abspath(src_dir) == os.path.abspath(out_dir):
        sys.exit('refusing to overwrite the baked originals — give a separate out_dir')
    os.makedirs(out_dir, exist_ok=True)
    files = [n if n.endswith('.png') else n + '.png' for n in names] or \
            sorted(f for f in os.listdir(src_dir) if f.endswith('.png'))
    for f in files:
        size = prep(os.path.join(src_dir, f), os.path.join(out_dir, f))
        print(f'{f:20s} -> {size[0]}x{size[1]}')
    print(f'\n{len(files)} icon(s) ready in {out_dir}. Mount at ~208px.')
    print('Note: brain.png reads as noise at feed size — use documentstack for explainers.')

if __name__ == '__main__':
    main()
