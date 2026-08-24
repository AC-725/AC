#!/usr/bin/env python3
"""ffprobe stand-in, backed by ffmpeg's own banner.

WHY THIS EXISTS (2026-08-24). The toolchain resolves ffmpeg from the python
imageio-ffmpeg wheel, and that wheel ships ffmpeg ONLY — there is no ffprobe in
it. Three places call ffprobe anyway:

  * build_video.sh's verify step  (swallowed the error via `|| true`, so a build
    reported success having verified nothing)
  * produce.sh's verify step      (same)
  * audit_motion.py               (does NOT swallow it — gates 3, 4 and 5 died
    with FileNotFoundError, so the three timeline gates the skill calls law were
    simply unrunnable on any container without a system ffprobe)

Rather than teach three callers to degrade, this restores the missing binary, so
`ffprobe` means the same thing everywhere. Per the skill's own rule: if a script
grows an external dependency, resolve it in the script.

Implements exactly the invocation shapes the skill uses:
  -show_entries format=duration                       [-of ...nokey=1]
  -show_entries stream=codec_type                     [-of ...nokey=1]
  -show_entries format=duration:stream=codec_type,width,height
Anything else exits 2 rather than inventing an answer.
"""
import os, re, subprocess, sys

def ffmpeg_banner(path):
    exe = os.environ.get("FFMPEG_BIN") or "ffmpeg"
    r = subprocess.run([exe, "-hide_banner", "-i", path],
                       capture_output=True, text=True)
    return r.stderr

def parse(path):
    b = ffmpeg_banner(path)
    dur = None
    m = re.search(r"Duration:\s*(\d+):(\d\d):(\d\d(?:\.\d+)?)", b)
    if m:
        dur = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    streams = []
    for sm in re.finditer(r"Stream #\d+:\d+.*?:\s*(Video|Audio|Subtitle):(.*)", b):
        kind, rest = sm.group(1).lower(), sm.group(2)
        wh = re.search(r"(\d{2,5})x(\d{2,5})", rest)
        streams.append({"codec_type": kind,
                        "width":  wh.group(1) if wh else "N/A",
                        "height": wh.group(2) if wh else "N/A"})
    return dur, streams

def main(argv):
    if "-show_entries" not in argv:
        return 2
    entries = argv[argv.index("-show_entries") + 1]
    path = argv[-1]
    if not os.path.exists(path):
        sys.stderr.write("ffprobe_shim: no such file: %s\n" % path); return 1
    nokey = any("nokey=1" in a for a in argv)
    dur, streams = parse(path)

    want_dur = "format=duration" in entries
    sm = re.search(r"stream=([\w,]+)", entries)
    want_stream = [f for f in sm.group(1).split(",")] if sm else []

    out = []
    if want_dur:
        v = "%.6f" % dur if dur is not None else "N/A"
        out.append(v if nokey else "duration=" + v)
    for st in streams:
        for f in want_stream:
            v = st.get(f, "N/A")
            out.append(v if nokey else "%s=%s" % (f, v))
    sys.stdout.write("\n".join(out) + ("\n" if out else ""))
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
