/* ZoneOut brand module for Three.js beats.
 * Palette and type rules mirror references/covers.md. Grey ALWAYS means the wrong
 * or old version; gold ALWAYS means the correction. That logic is load-bearing —
 * the viewer reads the argument before reading a word.
 */
import * as THREE from './three.module.min.js';

export const PALETTE = {
  black:     0x0B0B0C,
  gold:      0xE0B54C,
  goldDeep:  0xA87C1F,
  grey:      0x8C8C90,
  white:     0xFFFFFF,
};

/* Brand faces are Poppins (covers) and Oswald Bold (captions). Neither is installed
 * in the render sandbox, so previews fall back to Liberation Sans. Install the real
 * faces before shipping a beat or the type will not match the grid. */
export const FONT_STACK = '"Poppins","Oswald","Liberation Sans",sans-serif';

/** Draw text to a CanvasTexture. Avoids font loaders entirely — headless Chromium
 *  has no network, so any loader fetching a font would render blank. */
export function textTexture(lines, {
  w = 1024, h = 512, size = 150, weight = 700,
  color = '#FFFFFF', bg = null, align = 'center', lineGap = 1.18,
} = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.font = `${weight} ${size}px ${FONT_STACK}`;
  g.textAlign = align;
  g.textBaseline = 'middle';
  g.fillStyle = color;
  const arr = Array.isArray(lines) ? lines : [lines];
  const step = size * lineGap;
  const y0 = h / 2 - (step * (arr.length - 1)) / 2;
  const x = align === 'center' ? w / 2 : (align === 'right' ? w - 24 : 24);
  arr.forEach((t, i) => g.fillText(t, x, y0 + i * step));
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** A nameplate: a thin slab carrying a text texture on its front face. */
export function plate(lines, { width = 3.2, height = 1.6, depth = 0.09,
  color = PALETTE.white, tint = PALETTE.white, size = 150, weight = 700 } = {}) {
  const tex = textTexture(lines, {
    w: 1024, h: Math.round(1024 * height / width),
    size, weight, color: '#' + color.toString(16).padStart(6, '0'),
  });
  const face = new THREE.MeshStandardMaterial({
    map: tex, transparent: true, metalness: 0.1, roughness: 0.75,
    color: tint, emissive: tint, emissiveMap: tex, emissiveIntensity: 0.45,
  });
  const edge = new THREE.MeshStandardMaterial({
    color: PALETTE.goldDeep, metalness: 0.7, roughness: 0.35,
  });
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    [edge, edge, edge, edge, face, edge]
  );
  mesh.userData.face = face;
  mesh.userData.tex = tex;
  return mesh;
}

/** Standard ZoneOut three-point rig: warm key, cool-neutral fill, gold rim. */
export function lightRig(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xFFF1D0, 2.0);
  key.position.set(3, 5, 6); scene.add(key);
  const fill = new THREE.DirectionalLight(0x9FB0C8, 0.55);
  fill.position.set(-5, -1, 3); scene.add(fill);
  const rim = new THREE.DirectionalLight(PALETTE.gold, 1.6);
  rim.position.set(-2, 3, -5); scene.add(rim);
  return { key, fill, rim };
}

/** Renderer + scene + camera wired for the 1080x1920 vertical frame. */
export function stage({ fov = 38, z = 9 } = {}) {
  const W = 1080, H = 1920;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PALETTE.black);
  scene.fog = new THREE.Fog(PALETTE.black, 12, 26);
  const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 100);
  camera.position.set(0, 0, z);
  return { renderer, scene, camera };
}

/* Easing. Deterministic, no clock — every frame is a pure function of t so the
 * render is reproducible and resumable. */
export const ease = {
  out:    p => 1 - Math.pow(1 - p, 3),
  inOut:  p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  back:   p => { const c = 1.70158, s = c + 1;
                 return 1 + s * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
};

/** Normalised progress of t across [a,b], clamped, optionally eased. */
export function span(t, a, b, fn = ease.out) {
  if (b <= a) return t >= b ? 1 : 0;
  return fn(Math.min(1, Math.max(0, (t - a) / (b - a))));
}

export const lerp = (a, b, p) => a + (b - a) * p;

/* ---------------------------------------------------------------- sauropod
 * The 3D counterpart of the `sauropod` cover icon — same silhouette, same gold
 * stroke, built from tubes so it reads as drawn rather than modelled.
 *
 * Proportions are the icon's and they are load-bearing: a steep neck and a deep
 * body. Shallow both and it reads as a bench.
 */
const SAUROPOD_TOP = [
  [-2.30, 2.35], [-1.90, 1.75], [-1.50, 1.05], [-1.05, 0.35], [-0.55, -0.05],
  [0.00, 0.18], [0.60, 0.18], [1.05, -0.02],
  [1.75, -0.12], [2.50, 0.05], [3.15, 0.50],
];
const SAUROPOD_UNDER = [
  [3.15, 0.50], [2.45, -0.25], [1.75, -0.50], [1.10, -0.58],
  [0.40, -0.78], [-0.25, -0.75], [-0.62, -0.55],
  [-1.05, 0.00], [-1.55, 0.85], [-1.95, 1.60], [-2.20, 2.10],
];
const SAUROPOD_HEAD = [
  [-2.20, 2.10], [-2.92, 2.24], [-2.86, 2.56], [-2.30, 2.35],
];

function tube(pts2, mat, radius = 0.07, closed = false) {
  const curve = new THREE.CatmullRomCurve3(
    pts2.map(([x, y]) => new THREE.Vector3(x, y, 0)), closed, 'catmullrom', 0.4);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 140, radius, 8, closed), mat);
}

/** Returns a Group. `group.userData.neck` is the head+neck subgroup, pivoted at
 *  the shoulder so it can sway independently of the body. */
export function sauropod({ color = PALETTE.gold, radius = 0.075, emissive = 0.55 } = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: emissive,
    metalness: 0.5, roughness: 0.35,
  });

  const g = new THREE.Group();
  // Split the outline at the shoulder so the neck can articulate: indices 0-4 of
  // the topline and 7-10 of the underline are neck, the rest is body.
  const body = new THREE.Group();
  body.add(tube(SAUROPOD_TOP.slice(3), mat, radius));
  body.add(tube(SAUROPOD_UNDER.slice(0, 8), mat, radius));

  const neck = new THREE.Group();
  neck.add(tube(SAUROPOD_TOP.slice(0, 5), mat, radius));
  neck.add(tube(SAUROPOD_UNDER.slice(6), mat, radius));
  neck.add(tube(SAUROPOD_HEAD, mat, radius * 0.85));
  // pivot at the shoulder so rotation swings the head, not the whole animal
  neck.position.set(-0.6, -0.2, 0);
  neck.children.forEach(c => c.position.set(0.6, 0.2, 0));

  const legs = new THREE.Group();
  const legGeo = new THREE.CylinderGeometry(radius * 0.95, radius * 0.8, 1.25, 8);
  [[-0.35, 0.32], [-0.10, -0.30], [0.80, 0.32], [1.05, -0.30]].forEach(([x, z]) => {
    const l = new THREE.Mesh(legGeo, mat);
    l.position.set(x, -1.32, z);
    legs.add(l);
  });

  g.add(body, neck, legs);
  g.userData = { neck, body, legs, mat };
  return g;
}
