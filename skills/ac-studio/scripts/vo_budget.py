#!/usr/bin/env python3
"""
gate 8 · VO budget — does the script physically fit the cut?

    python3 vo_budget.py vo_spec.json [--engine news|tod]

Born 2026-08-14 (Day 30). AC caught a VO script that was ~90 syllables inside an
11.4s reel: about 8 syllables per second, roughly double a natural read. It could
not have been performed, and nothing in the pipeline would have noticed, because
every other gate looks at pixels. Words had no gate at all.

The rates below are for a CALM, authoritative read, which is this brand's voice.
Fast conversational English runs 5-6 syl/sec; broadcast narration sits nearer 4;
an unhurried premium read is ~3.0-3.5. So:

    <= 4.0   fine
    4.0-4.7  tight, will sound hurried, warn
    > 4.7    does not fit, fail

Scene A is allowed to run at the top of the band on purpose: it is the loud open
and it carries the payoff, so a little urgency there is correct. The closing scene
should be the SLOWEST in the reel - that is where the instruction lands.

Syllable counting is a heuristic (vowel groups, silent-e, a small override table).
It is approximate by design: this gate is a budget check, not a phonetics engine,
and being off by one syllable never changes the verdict.
"""
import json, re, sys

OVERRIDE = {
    'ai': 2, 'chatgpt': 4, 'openai': 4, 'gpt': 3, 'api': 3, 'ui': 2, 'ceo': 3,
    'ok': 2, 'io': 2, 'sql': 3, 'url': 3, 'pdf': 3, 'mcp': 3, 'llm': 3,
}

def syllables(word: str) -> int:
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return 0
    if w in OVERRIDE:
        return OVERRIDE[w]
    # a token with no vowels is being spelled out: CTA -> C-T-A
    if not re.search(r"[aeiouy]", w):
        return len(w)
    groups = len(re.findall(r"[aeiouy]+", w))
    if w.endswith("e") and groups > 1 and not w.endswith(("le", "ee", "ye")):
        groups -= 1
    if w.endswith(("les", "des", "tes")) and groups > 1:
        pass
    return max(1, groups)

def count(line: str):
    words = [w for w in re.split(r"\s+", line.strip()) if re.search(r"[A-Za-z0-9]", w)]
    return len(words), sum(syllables(w) for w in words)

# scene windows are the engine's own, and must match SCENES in the template
WINDOWS = {
    'news': [('A', 2.6), ('B', 2.4), ('C', 2.5), ('D', 2.1), ('E', 1.8)],
    'tod':  [('A', 3.6), ('B', 4.0), ('C', 3.6), ('D', 4.3), ('E', 7.0),
             ('F', 3.7), ('G', 5.4)],
}
WARN, FAIL = 4.0, 4.7

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    engine = 'news'
    if '--engine' in sys.argv:
        engine = sys.argv[sys.argv.index('--engine') + 1]
    if not args:
        print(__doc__)
        return 2
    spec = json.load(open(args[0]))
    scenes = spec.get('scenes', [])
    win = WINDOWS.get(engine, WINDOWS['news'])
    if len(scenes) > len(win):
        print(f"  note: spec has {len(scenes)} scenes, {engine} engine has {len(win)}")

    print(f"gate 8 · VO budget  ({engine} engine, warn >{WARN}, fail >{FAIL} syl/sec)")
    print(f"  {'scene':<14}{'window':>8}{'words':>7}{'syl':>6}{'syl/sec':>10}  ")
    tot_w = tot_s = tot_d = 0
    worst, bad = 0.0, []
    for (sid, dur), sc in zip(win, scenes):
        w, s = count(sc.get('line', ''))
        rate = s / dur if dur else 0
        tot_w += w; tot_s += s; tot_d += dur
        worst = max(worst, rate)
        flag = 'FAIL' if rate > FAIL else ('warn' if rate > WARN else '')
        if flag:
            bad.append((sid, rate, flag))
        print(f"  {sid + ' · ' + sc.get('id','')[:9]:<14}{dur:7.1f}s{w:7}{s:6}{rate:10.1f}  {flag}")
    overall = tot_s / tot_d if tot_d else 0
    print(f"  {'TOTAL':<14}{tot_d:7.1f}s{tot_w:7}{tot_s:6}{overall:10.1f}")

    if any(f == 'FAIL' for _, _, f in bad):
        print(f"\nFAIL — {', '.join(s for s,_,f in bad if f=='FAIL')} cannot be read in the time. Cut words.")
        return 1
    if bad:
        print(f"\nWARN — {', '.join(s for s,_,f in bad)} will sound hurried. Fine for scene A, suspect elsewhere.")
        return 0
    print(f"\nCLEAN — fits the cut with air. Fastest scene {worst:.1f} syl/sec.")
    return 0

if __name__ == '__main__':
    sys.exit(main())
