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
