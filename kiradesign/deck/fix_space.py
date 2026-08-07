#!/usr/bin/env python3
"""
pptxgenjs writes runs with significant leading/trailing spaces but omits
xml:space="preserve", so OOXML consumers are free to collapse them —
"than the " + "website." can render as "thewebsite.".

This rewrites every <a:t> whose text has edge whitespace to carry the
attribute. Operates on the raw XML text so namespace prefixes are untouched.
"""
import sys, re, zipfile, shutil, os

PAT = re.compile(r'<a:t>([^<]*)</a:t>')


def fix_xml(xml: str):
    n = 0

    def sub(m):
        nonlocal n
        t = m.group(1)
        if t != t.strip() and t.strip():
            n += 1
            return f'<a:t xml:space="preserve">{t}</a:t>'
        return m.group(0)

    return PAT.sub(sub, xml), n


def main(path):
    tmp = path + ".tmp"
    total = 0
    with zipfile.ZipFile(path) as zin, \
         zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename.startswith("ppt/slides/") and item.filename.endswith(".xml"):
                xml, n = fix_xml(data.decode("utf-8"))
                total += n
                data = xml.encode("utf-8")
            zout.writestr(item, data)
    shutil.move(tmp, path)
    print(f"xml:space=preserve added to {total} run(s) in {os.path.basename(path)}")


if __name__ == "__main__":
    main(sys.argv[1])
