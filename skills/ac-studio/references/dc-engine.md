# Building a reel with no shell (Design Components)

When the session has no bash, python or ffmpeg, the video engines in `assets/` cannot run.
The equivalent path, which keeps every brand law intact:

- One `.dc.html` per reel + one sibling `.jsx` holding the composition; mount with
  `<x-import component-from-global-scope="…" from="./animations-v3.jsx ./scenes.jsx">`.
- The scene list lives as a JSON string literal in a plain inline `<script>` in `<helmet>`
  (`window.OM_SCENES`) — that literal is the cue table AND the user's timeline editor.
- Export is Share → Export → Video (the stage owns the exportable contract). Audio is added
  after; **the file is silent by construction**, which satisfies AC's no-sound-effects rule.
- QA replaces `qa_layout.sh` with a seek-and-read filmstrip: dispatch
  `data-om-seek-to-time-frame` at every scene boundary ±0.15s plus one in-flight frame per
  scene, then read the sheet. Gate 7's discipline applies unchanged — the in-flight frames are
  where the defects are.
- **Gotcha:** editing the sibling `.jsx` does not invalidate the page's module cache. Reload
  the page before screenshotting or you QA the previous build.
