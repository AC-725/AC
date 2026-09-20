#!/usr/bin/env python3
"""Turn per-element ink captures into a collision report.
Compares real glyph ink, not CSS boxes — the only way to catch descenders
and tall caps overrunning their line box."""
import json, sys, pathlib
import numpy as np
from PIL import Image

d = pathlib.Path(sys.argv[1])
MIN_GAP = int(sys.argv[2]) if len(sys.argv) > 2 else 0   # required clear px between elements
man = json.load(open(d/'manifest.json'))
issues = []

for entry in man:
    tag, scene, names = entry['tag'], entry['scene'], entry['names']
    ref = np.asarray(Image.open(d/f'{tag}_{scene}_REF.png').convert('RGB'), dtype=np.int16)
    boxes = []
    for i, nm in enumerate(names):
        img = np.asarray(Image.open(d/f'{tag}_{scene}_E{i}.png').convert('RGB'), dtype=np.int16)
        mask = np.abs(img-ref).max(axis=2) > 12
        if not mask.any():
            boxes.append(None); continue
        ys, xs = np.where(mask)
        boxes.append((xs.min(), ys.min(), xs.max(), ys.max(), nm))
    for i in range(len(boxes)):
        a = boxes[i]
        if not a: continue
        if a[0] < 0 or a[1] < 0 or a[2] > 1079 or a[3] > 1919:
            issues.append(f'OUT OF FRAME  {tag} {scene}  {a[4]}  {a[:4]}')
        for j in range(i+1, len(boxes)):
            b = boxes[j]
            if not b: continue
            ox = min(a[2],b[2]) - max(a[0],b[0])
            oy = min(a[3],b[3]) - max(a[1],b[1])
            same_headline = ('h1' in a[4] and 'h1' in b[4])
            limit = 11 if same_headline else MIN_GAP
            if ox > 0 and oy > -limit:
                kind = 'INK OVERLAP' if oy > 0 else f'GAP {abs(oy)}px (need {limit})'
                issues.append(f'{kind}  {tag} {scene}  {a[4]}  x  {b[4]}  '
                              f'[{ox}px wide]')
print('\n'.join(issues) if issues else 'CLEAN — no ink collisions')
print(f'\n{len(issues)} issue(s) · {len(man)} scenes checked')
