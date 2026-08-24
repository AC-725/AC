/* ac-studio · move builders — the 3D vocabulary a reel scene can draw from.
 *
 * Every builder returns an object exposing { group, at(p) } where at(p) drives the move
 * from p=0 to p=1. That shape is what lets the SAME builder serve both routes:
 *   - baked   : bake/moves/<name>.html steps p and screenshots each frame
 *   - live    : reel.template.html calls at(p) from inside seek(t)
 * Nothing here touches a clock, rAF or Math.random. Pure function of p, always.
 *
 * LAW (locked 2026-08-22): wireframe, line and point only, flat gold, unlit. Metal,
 * liquid and film grain were rejected permanently. MeshBasicMaterial and LineBasicMaterial
 * are the only materials that may appear in this file — a MeshStandardMaterial here is a
 * law violation, not a style choice.
 *
 * The occlusion trick, from the coin-stack build: a solid INK-coloured core inside a
 * wireframe object lets the depth buffer hide its back edges. Without it any stacked or
 * boxy wireframe reads as a coiled spring rather than a solid. `shell()` below applies it.
 */
import { PALETTE, ease, clamp, lerp } from './vault.js';

/* A wireframe box with an ink core, so back edges are properly hidden. */
export function shell(THREE, w, h, d, { color = PALETTE.gold, opacity = 1 } = {}) {
  const g = new THREE.Group();
  const box = new THREE.BoxGeometry(w, h, d);
  const core = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: PALETTE.ink }));
  core.scale.setScalar(0.985);                       // just inside the edges, never poking through
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(box),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  g.add(core, edges);
  g.userData.edgeMat = edges.material;
  return g;
}

/* ---------------------------------------------------------------------------
 * MOVE · bars — the proof beat.
 *
 * Scene C carries the story's number and today has nothing behind it. Bars rise as the
 * odometer counts, one bar hot (the story's figure), the rest dim context. Heights are a
 * PARAMETER, which is the whole argument for the live route: baked, they are whatever was
 * baked; live, they are the actual figures.
 * ------------------------------------------------------------------------- */
export function bars(THREE, { values = [0.35, 0.5, 0.42, 0.68, 1.0], hot = 4,
                              w = 0.34, gap = 0.52, maxH = 2.4 } = {}) {
  const group = new THREE.Group();
  const items = values.map((v, i) => {
    const isHot = i === hot;
    const s = shell(THREE, w, 1, w * 0.7,
      /* 0.75 not 0.62 on the context bars - tuned at the size this actually posts at,
       * which is the lab's standing rule for line opacity. */
      { color: isHot ? PALETTE.gold : PALETTE.dim, opacity: isHot ? 1 : 0.75 });
    s.position.x = (i - (values.length - 1) / 2) * gap;
    group.add(s);
    return { s, v, isHot };
  });
  return {
    group,
    at(p) {
      items.forEach(({ s, v, isHot }, i) => {
        /* staggered so the row builds left to right instead of inflating as one block */
        const local = clamp((p - i * 0.06) / 0.62);
        const h = Math.max(0.0001, v * maxH * ease(local));
        s.scale.y = h;
        s.position.y = h / 2;
        if (isHot) s.userData.edgeMat.opacity = lerp(0.5, 1, ease(local));
      });
    },
  };
}

/* ---------------------------------------------------------------------------
 * MOVE · toggle — the shift beat.
 *
 * Scene B is the turn, and today it is `strikeB.style.transform='scaleX(...)'` — a flat
 * line growing sideways. This is the same argument in depth: the wrong card greys, tilts
 * back and recedes while the right one comes forward and brightens.
 *
 * Grey always means the wrong or old version; gold always means the correction. Same law
 * as the covers, so the viewer reads the argument before reading a word.
 * ------------------------------------------------------------------------- */
export function toggle(THREE, { w = 2.5, h = 1.15, gapY = 0.78 } = {}) {
  const group = new THREE.Group();
  const top = shell(THREE, w, h, 0.09, { color: PALETTE.gold });
  const bot = shell(THREE, w, h, 0.09, { color: PALETTE.gold });
  top.position.y = gapY; bot.position.y = -gapY;
  const strike = new THREE.Mesh(new THREE.BoxGeometry(1, 0.055, 0.02),
    new THREE.MeshBasicMaterial({ color: PALETTE.gold }));
  strike.position.set(0, -gapY, 0.07);
  strike.scale.x = 0;
  group.add(top, bot, strike);
  return {
    group,
    at(p) {
      const enter = ease(clamp(p / 0.34));
      top.position.x = lerp(-3.6, 0, enter);
      bot.position.x = lerp(3.6, 0, enter);

      const turn = ease(clamp((p - 0.42) / 0.4));
      bot.rotation.x = lerp(0, -0.34, turn);
      bot.position.z = lerp(0, -1.2, turn);
      bot.position.y = lerp(-gapY, -gapY - 0.16, turn);
      bot.userData.edgeMat.color.setHex(PALETTE.dim);
      /* FLOOR AT 0.5, not 0.28. At 0.28 on ink the demoted card reads as DELETED rather
       * than superseded, and the whole point of the beat is that the wrong version is
       * still there, just no longer the answer. Same lesson the theme candidates learned
       * when dim nodes at 0x4a4030 turned out to be invisible on a phone. */
      bot.userData.edgeMat.opacity = lerp(1, 0.5, turn);

      strike.scale.x = clamp((p - 0.5) / 0.3) * (w + 0.05);
      strike.position.y = bot.position.y;
      strike.position.z = lerp(0.07, -1.1, turn);

      const win = ease(clamp((p - 0.62) / 0.38));
      top.position.z = lerp(0, 0.75, win);
      top.userData.edgeMat.opacity = 1;
    },
  };
}

/* ---------------------------------------------------------------------------
 * MOVE · dolly — the rule beat.
 *
 * Lab move 22. The camera pushes in while the FOV widens to compensate, so the subject
 * holds its size and only the background stretches. It is the one camera move that reads
 * as meaning rather than decoration, which is why it belongs on the beat that states the
 * rule. Returns a camera driver rather than geometry.
 * ------------------------------------------------------------------------- */
export function dolly(camera, { z0 = 8.2, z1 = 4.6, fov0 = 50 } = {}) {
  /* A DOLLY ZOOM WITH NOTHING IN THE FOREGROUND IS NOT A DOLLY ZOOM. The first draft
   * drove the camera over the bare floor and frames 0 and 19 were indistinguishable -
   * the effect only exists as a RELATIONSHIP between a subject that holds its size and a
   * background that stretches behind it. The caller must put something at the subject
   * plane; `subjectPlane` below is where it goes. */
  /* Hold the visible height constant: h = 2*z*tan(fov/2) must not change, so
   * fov(z) = 2*atan(z0*tan(fov0/2)/z). Solved, not eyeballed. */
  const halfH = z0 * Math.tan((fov0 * Math.PI / 180) / 2);
  return {
    group: null,
    at(p) {
      const e = ease(clamp(p));
      const z = lerp(z0, z1, e);
      camera.position.z = z;
      camera.fov = 2 * Math.atan(halfH / z) * 180 / Math.PI;
      camera.updateProjectionMatrix();
    },
  };
}

export const MOVES = { bars, toggle };
