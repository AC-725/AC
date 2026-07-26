# Production guide — render, sound, encode

The whole pipeline is one command (`scripts/build_video.sh`). This file explains what it does,
the dependencies, the gotchas learned building it, and how to QA.

## Dependencies (check first, install if missing)
- **Node + Playwright + Chromium.** `render_frames.js` drives headless Chromium. In this sandbox the
  binary is under `/opt/pw-browsers/chromium-*/chrome-linux/chrome` (the script auto-finds it). If Playwright
  isn't installed: `npm i -g playwright` (Chromium already present here — don't run `playwright install`).
- **ffmpeg** — encode + mux.
- **Python 3 + numpy** — the sound synth. `pip install numpy --break-system-packages`.
- **Fonts: Lora + Poppins** must be system-installed (Chromium uses system fonts). Here they live in
  `/usr/share/fonts/truetype/google-fonts/`. Verify with `fc-list | grep -iE 'lora|poppins'`; if missing,
  install the Google Fonts package or drop the TTFs into `~/.fonts` and `fc-cache -f`.

## One-shot build
```bash
# work in a scratch dir; copy the template so you never edit the skill's original in place
cp /root/.claude/skills/ac-tool-of-the-day/assets/reel.template.html ./reel.html
# ...edit the CONTENT object in ./reel.html for this tool...
bash /root/.claude/skills/ac-tool-of-the-day/scripts/build_video.sh ./reel.html AC_ToolOfTheDay_<tool>.mp4
```
Output: 1080×1920, H.264 + AAC, 30fps, ~31.6s, ~2.5MB. Add `--silent` as a 3rd arg for a no-audio version.

## QA (do this before delivering)
```bash
# fast contact sheet — one PNG per scene, no full render
node .../assets/render_frames.js ./reel.html qa "3.6,7.6,11.2,15.5,22.5,26.2,29.6"
```
Open the `qa/*.png` and check: copy fits (no overflow/overlap), one gold idea per scene, chart labels sit
inside the plot, @itsac.ai present. Then spot-check the final MP4 with `ffprobe` (duration ~31.6, has audio+video)
and extract a frame at an audio-cue time (e.g. 6.6s odometer, 14.1s chart) to confirm sync.

## Gotchas (hard-won)
- **No SVG `feTurbulence` grain** in a per-frame render — it re-rasterizes every frame and tanks throughput
  (~13× slower). The gradients give enough depth.
- **Capture JPEG (q95), not PNG** — ~10× faster frame writes, no visible quality loss after H.264.
- **Chart labels must live inside a fixed-size plot box** (absolute positioning). A flex chart with
  negative-offset labels overflows and collides with the caption.
- **Headlines ≤ ~19 chars** per big line or they wrap awkwardly at 1080px wide.
- **Rendering is CPU-bound** (~90s for ~950 frames). Run it backgrounded (`nohup … &`) and poll so a 2-min
  tool timeout doesn't kill it. Delete the frames dir after (the build script does this).
- **Audio is a synced SFX layer** (~−22 dB mean, −0.7 dB peak) — punctuation, not a loud music bed. It's
  synced to the fixed scene times; if you change timings, update the cues in `synth_audio.py`.

## Cover
`assets/cover.template.html` → edit the `<!--EDIT-->` text → screenshot at 2× and downscale for crispness:
```bash
node .../assets/render_frames.js ./cover.html qa "0"     # or a tiny screenshot script at deviceScaleFactor 2
```
(Any headless screenshot at 1080×1920 works; render at 2× then `ffmpeg -i in.png -vf scale=1080:1920:flags=lanczos out.png`.)
Keep key elements inside the center 1080×1350 (the profile-grid crop).
