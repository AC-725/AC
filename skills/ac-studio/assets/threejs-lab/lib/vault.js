/* ac-studio · vault lib — the ONE source of truth for the prime mark and the vault floor.
 *
 * WHY THIS EXISTS. `const GOLD=0xE7C765` was declared 17 times across the lab, and the
 * mark-drawing block was pasted verbatim into open_draft.html, signoff_draft.html and
 * logo3d.html. That duplication already cost real work once: the README logs a
 * slice-replace anchored on `const rim=circle(0.95);` that matched the wrong tile because
 * the helper name repeated, and silently deleted five icon tiles. Nothing caught it but
 * reading the render.
 *
 * It matters more now than it did then. The run-log records that the mark geometry is
 * A REDRAW standing in until AC's real logo file arrives. When that file lands, the mark
 * has to change in exactly one place — here — and every baked frame regenerates from it.
 * With the geometry pasted into three drafts, that is three chances to update two.
 *
 * LAW: flat gold only — wireframe, line and point. Metal, liquid and film grain were
 * rejected permanently on 2026-08-22. Nothing in this file may introduce a lit material.
 */

export const PALETTE = {
  gold: 0xE7C765,
  ink:  0x0A0A0A,
  bone: 0xF2EDE4,
  dim:  0x655838,   // lifted from 0x4a4030 on 2026-08-22 — the old value was invisible on a phone
};

/* ---------------------------------------------------------------------------
 * THE MARK — the interlocked A+C pendant, drawn as 2D canvas ink then sampled.
 *
 * Reconstructed by hand (the photo arrived vision-only and never hit disk). Three
 * read-and-fix rounds to converge: C too low/deep -> C terminals overreaching the
 * apex -> miter apex with arc span 0.8..2pi-0.5, which landed it.
 *
 * Draw order carries the over-under weave and is NOT cosmetic: C's back arc first,
 * the A over it, then C's lower arc re-drawn on top. Reorder these and the mark stops
 * reading as interlocked.
 * ------------------------------------------------------------------------- */
export const MARK_W = 600, MARK_H = 660;

export function markMask() {
  const c = document.createElement('canvas');
  c.width = MARK_W; c.height = MARK_H;
  const m = c.getContext('2d');
  m.lineCap = 'butt';
  m.strokeStyle = '#fff';
  const LW = 26;
  const Carc = (from, to, lw) => {
    m.lineWidth = lw ?? LW;
    m.beginPath(); m.arc(412, 315, 140, from, to); m.stroke();
  };

  Carc(0.8, 2 * Math.PI - 0.5);              // C, back layer
  m.lineWidth = LW; m.lineJoin = 'miter'; m.miterLimit = 8;
  m.beginPath(); m.moveTo(150, 505); m.lineTo(285, 132); m.lineTo(408, 505); m.stroke();  // A
  m.beginPath(); m.moveTo(206, 388); m.lineTo(378, 388); m.stroke();                      // A crossbar
  m.lineWidth = 9;
  m.beginPath(); m.moveTo(263, 140); m.lineTo(122, 505); m.stroke();                      // A second left leg
  Carc(1.4, 2.3);                            // C lower arc, re-drawn ON TOP = the weave
  m.lineWidth = 9;
  m.beginPath(); m.moveTo(285, 62); m.lineTo(316, 93); m.lineTo(285, 124); m.lineTo(254, 93); m.closePath(); m.stroke();
  m.beginPath(); m.moveTo(285, 77); m.lineTo(301, 93); m.lineTo(285, 109); m.lineTo(269, 93); m.closePath(); m.stroke();
  m.lineWidth = 16;
  m.beginPath(); m.arc(285, 34, 22, 0.35, Math.PI - 0.35, true); m.stroke();               // bail
  m.beginPath(); m.moveTo(266, 42); m.lineTo(272, 62); m.stroke();
  m.beginPath(); m.moveTo(304, 42); m.lineTo(298, 62); m.stroke();

  const data = m.getImageData(0, 0, MARK_W, MARK_H).data;
  return (x, y) => x >= 0 && y >= 0 && x < MARK_W && y < MARK_H && data[(y * MARK_W + x) * 4 + 3] > 128;
}

/* Normalised mark points. The /150 divisor and the (285,300) origin are the shipped
 * frame's coordinate system — changing either moves every baked asset, so don't. */
export function markSamples(step = 2, ink = markMask()) {
  const out = [];
  for (let y = 0; y < MARK_H; y += step)
    for (let x = 0; x < MARK_W; x += step)
      if (ink(x, y)) out.push([(x - 285) / 150, (300 - y) / 150]);
  return out;
}

/* Mark extents in normalised units, for framing a camera on it exactly.
 * x -1.90..2.10, y -2.40..2.00 -> 4.0 x 4.4, aspect 0.909, which is why the shipped
 * open frames are 720x792. */
export const MARK_BOX = { x0: -1.9, x1: 2.1, y0: -2.4, y1: 2.0 };

/* ---------------------------------------------------------------------------
 * DETERMINISTIC SCATTER. No Math.random anywhere: a seeded sin-hash, so the same
 * particle takes the same path in every bake, on every machine, forever. That is what
 * makes a re-bake reproducible rather than merely similar — and it is the same
 * discipline as seek(t) being a pure function of t.
 * ------------------------------------------------------------------------- */
const frac = v => v - Math.floor(v);

export function scatterField(targets) {
  return targets.map(([tx, ty], i) => {
    const a1 = frac(Math.sin(i * 127.1) * 43758.5453) * Math.PI * 2;
    const a2 = frac(Math.sin(i * 311.7) * 12543.853) * Math.PI - Math.PI / 2;
    const d  = 1.6 + frac(Math.sin(i * 74.3) * 9631.41) * 2.6;
    return {
      tx, ty,
      sx: tx + Math.cos(a1) * Math.cos(a2) * d,
      sy: ty + Math.sin(a2) * d * 0.8,
      sz: Math.sin(a1) * d * 0.7,
      /* per-particle arrival: ~70% must be settled mid-phase or the morph reads as
       * noise rather than a mark forming. That is the lab morph law. */
      arrive: 0.12 + frac(Math.sin(i * 57.9) * 7919.7) * 0.78,
    };
  });
}

export const ease = t => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/* Flat XYZ array for a THREE.Points position attribute at assemble progress p (0..1). */
export function assembleAt(field, p) {
  const flat = new Float32Array(field.length * 3);
  for (let i = 0; i < field.length; i++) {
    const q = field[i];
    const t = p <= 0 ? 0 : clamp(ease(p / q.arrive));
    flat[i * 3]     = q.sx + (q.tx - q.sx) * t;
    flat[i * 3 + 1] = q.sy + (q.ty - q.sy) * t;
    flat[i * 3 + 2] = q.sz * (1 - t);
  }
  return flat;
}

/* ---------------------------------------------------------------------------
 * BUILDERS
 * ------------------------------------------------------------------------- */

/* Solid mark as ONE InstancedMesh instead of one Mesh per sample.
 * signoff_draft.html built a Group of ~4,000 individual Meshes; at 24 baked frames
 * that is ~96,000 draw calls for a shape that never changes. Instancing makes it 24. */
export function markInstanced(THREE, pts, { color = PALETTE.gold, voxel = 0.032, depth = 0.2 } = {}) {
  const geo = new THREE.BoxGeometry(voxel, voxel, depth);
  const mat = new THREE.MeshBasicMaterial({ color });        // Basic, not Standard — flat-gold law
  const mesh = new THREE.InstancedMesh(geo, mat, pts.length);
  const d = new THREE.Object3D();
  for (let i = 0; i < pts.length; i++) {
    d.position.set(pts[i][0], pts[i][1], 0);
    d.updateMatrix();
    mesh.setMatrixAt(i, d.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}

export function markPoints(THREE, field, p, { color = PALETTE.gold, size = 0.055, opacity = 0.95 } = {}) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(assembleAt(field, p), 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color, size, transparent: true, opacity }));
}

/* The vault floor: a perspective grid receding to a fogged horizon, split near/far so
 * depth reads on a phone. Opacities 0.5/0.24 are the v2 fine-tune AC signed off. */
export function vaultFloor(THREE, { y = -2.35, color = PALETTE.gold } = {}) {
  const g = new THREE.Group();
  const near = [], far = [];
  for (let i = -7; i <= 7; i++) {
    near.push(new THREE.Vector3(i * 1.2, y, 3), new THREE.Vector3(i * 1.2, y, -9));
    far.push(new THREE.Vector3(i * 1.2, y, -9), new THREE.Vector3(i * 1.2, y, -40));
  }
  for (let z = 3; z >= -40; z -= 1.2)
    (z > -9 ? near : far).push(new THREE.Vector3(-8.4, y, z), new THREE.Vector3(8.4, y, z));
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(near),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 })));
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(far),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.24 })));
  return g;
}

/* Renderer + scene + camera. alpha:true leaves the ground to the page (or to
 * Playwright's omitBackground) — the recipe that made the Pack 04 cover gate-safe. */
export function stage(THREE, canvas, { w, h, fov = 50, alpha = false, fog = 0 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha });
  renderer.setSize(w, h, false);
  if (!alpha) renderer.setClearColor(PALETTE.ink, 1);
  const scene = new THREE.Scene();
  if (fog) scene.fog = new THREE.FogExp2(PALETTE.ink, fog);
  const camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 120);
  return { renderer, scene, camera };
}

/* True ink bounds of the sampled mark, as opposed to MARK_BOX which is the mask's full
 * canvas. The cover corner asset is cropped to THIS with zero margin — the shipped
 * mark_corner.png has ink touching all four edges at 150x178, aspect 0.842, which is the
 * ink's own aspect and not the mask's 0.909. */
export function markInkBox(pts) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const [x, y] of pts) {
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  return { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0 };
}
