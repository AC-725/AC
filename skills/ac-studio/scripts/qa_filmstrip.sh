#!/usr/bin/env bash
# AC — gate 7 · THE FILMSTRIP. The eyeball gate, made systematic.
#
#   bash qa_filmstrip.sh <engine>.html [outdir]
#
# WHY THIS EXISTS (2026-08-18, Day 35). Two defects shipped in a TOD that every
# other gate passed clean: a hero figure that counted up carrying no unit, and an
# icon strike drawn across the whole row instead of the mark it struck. Neither is
# visible where the other gates look. audit_capture freezes each scene at
# start + dur*0.55 - a SETTLED moment - so anything wrong only WHILE something
# animates (a counter mid-count, a rule mid-draw, an icon mid-swap, a caption
# mid-type) is invisible to gates 1, 2 and 6; gates 3-5 measure the cut, not the
# picture. The blind spot was the whole middle of every animation.
#
# So this samples each scene at four phases - entry, IN FLIGHT, settled, exit -
# plus both sides of every cut, tiles them into one contact sheet with the
# timestamp burned onto each tile, and prints the map. It renders no verdict:
# a human or the model READS the sheet. That reading is the gate.
#
# Run it after qa_layout.sh and BEFORE produce.sh. Never render a video whose
# filmstrip has not been read.
#
# NOTE: render_frames.js only enters QA mode when the outdir argument is the
# literal string "qa", and it names frames q_<round(t*10)>.png - so timestamps
# are quantised to 0.1s here or frames silently overwrite each other. ./qa is
# used as scratch and removed.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; ASSETS="$HERE/../assets"
HTML="${1:?usage: qa_filmstrip.sh <engine>.html [outdir]}"
OUT="${2:-_filmstrip}"
WORK="$(cd "$(dirname "$HTML")" && pwd)"; BASE="$(basename "$HTML")"
cd "$WORK"; rm -rf "$OUT" qa; mkdir -p "$OUT"

# playwright is installed GLOBALLY in this toolchain, so a bare require() from a
# run directory fails with MODULE_NOT_FOUND. Resolve the global root once here
# rather than relying on whatever NODE_PATH the caller's shell happened to carry.
export NODE_PATH="${NODE_PATH:+$NODE_PATH:}$(npm root -g 2>/dev/null || echo /opt/node22/lib/node_modules)"

TIMES="$(node -e '
const {chromium}=require("playwright");const fs=require("fs"),path=require("path");
(async()=>{const b="/opt/pw-browsers";let exe;
 for(const d of fs.readdirSync(b)){if(d.startsWith("chromium-")){const p=path.join(b,d,"chrome-linux","chrome");if(fs.existsSync(p))exe=p;}}
 const br=await chromium.launch({executablePath:exe,args:["--allow-file-access-from-files"]});
 const pg=await br.newPage({viewport:{width:1080,height:1920}});
 await pg.goto("file://"+path.resolve(process.argv[1]),{waitUntil:"load"});
 const t=await pg.evaluate(()=>{
   const q=v=>Math.max(0,Math.round(v*10)/10);   // 0.1s grid: the renderer keys frames on it
   const out=[];
   for(let i=0;i<SCENES.length;i++){const s=SCENES[i];
     out.push(q(s.start+0.1));                   // entry: is frame one of this scene composed?
     out.push(q(s.start+s.dur*0.35));            // IN FLIGHT: counters, draws, swaps mid-move
     out.push(q(s.start+s.dur*0.6));             // settled (all the other gates see only this)
     out.push(q(s.start+s.dur-0.1));             // exit: what the cut leaves behind
     if(i<SCENES.length-1){const c=SCENES[i+1].start; out.push(q(c-0.1)); out.push(q(c+0.1));}
   }
   return [...new Set(out)].sort((a,b)=>a-b);
 });
 console.log(t.join(",")); await br.close();})();' "$BASE")"

echo "==> gate 7 · filmstrip — ${BASE}"
echo "    $(echo "$TIMES" | tr ',' '\n' | wc -l) samples: entry · in-flight · settled · exit · both sides of every cut"
node "$ASSETS/render_frames.js" "$BASE" qa "$TIMES" >/dev/null
mv qa/q_*.png "$OUT"/ && rm -rf qa
python3 - "$OUT" "$BASE" <<'PY'
import sys, glob, os
from PIL import Image, ImageDraw, ImageFont
out, base = sys.argv[1], sys.argv[2]
fs = sorted(glob.glob(os.path.join(out, 'q_*.png')),
            key=lambda f: int(os.path.basename(f)[2:-4]))
if not fs: sys.exit("gate 7: no frames rendered")
try:    font = ImageFont.truetype(os.path.join('fonts', 'BricolageGrotesque-Bold.ttf'), 34)
except Exception: font = ImageFont.load_default()
w, h = Image.open(fs[0]).size
tw, th = w // 4, h // 4
cols = min(6, len(fs)); rows = (len(fs) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * (th + 46)), (18, 18, 18))
d = ImageDraw.Draw(sheet)
for i, f in enumerate(fs):
    x, y = (i % cols) * tw, (i // cols) * (th + 46)
    sheet.paste(Image.open(f).resize((tw, th)), (x, y + 46))
    t = int(os.path.basename(f)[2:-4]) / 10.0
    d.text((x + 10, y + 6), f"{t:0.1f}s", fill=(231, 199, 101), font=font)
    d.line([(x, y + 45), (x + tw, y + 45)], fill=(60, 55, 45), width=1)
sheet.save(os.path.join(out, 'FILMSTRIP.jpg'), quality=88)
print(f"    wrote {out}/FILMSTRIP.jpg  ({len(fs)} tiles, {cols}x{rows})")
print("    READ IT. Every tile is a frame a viewer sees. Check: does every figure")
print("    carry its unit while it counts, does every drawn rule stay inside the")
print("    thing it marks, does every swap read as one move, is anything mid-type")
print("    left unreadable, and is the frame composed at the cut on both sides.")
PY
