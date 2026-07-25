#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convert deep-research JSON results into a markdown report.

Reads all JSON from results/, covers every field defined in fields.yaml,
skips uncertain/empty values, and writes report.md with a linked TOC.
"""

import json
import re
from pathlib import Path

import yaml

PROJECT_DIR = Path(__file__).parent
RESULTS_DIR = PROJECT_DIR / "results"
FIELDS_PATH = PROJECT_DIR / "fields.yaml"
OUTLINE_PATH = PROJECT_DIR / "outline.yaml"
REPORT_PATH = PROJECT_DIR / "report.md"

# fields.yaml category name -> possible JSON nesting keys (flat structure expected,
# but tolerate nesting under these keys)
CATEGORY_MAPPING = {
    "Basic Info": ["basic_info", "Basic Info"],
    "Key Data": ["key_data", "Key Data"],
    "Strategy": ["strategy", "Strategy"],
    "Business": ["business", "Business"],
    "Application": ["application", "Application"],
    "Sources": ["sources_category", "Sources"],
}

INTERNAL_KEYS = {"_source_file", "uncertain"}
NESTED_KEYS = {k for keys in CATEGORY_MAPPING.values() for k in keys}

CATEGORY_LABELS = {
    "competitor_account": "Competitor / peer account",
    "platform_mechanics": "Platform mechanics",
    "growth_tactic": "Growth tactic",
    "market_demand": "Market demand",
}


def load_fields():
    data = yaml.safe_load(FIELDS_PATH.read_text(encoding="utf-8"))
    ordered = []  # list of (category, [field names])
    for cat in data.get("field_categories", []):
        ordered.append((cat["category"], [f["name"] for f in cat.get("fields", [])]))
    return ordered


def flatten(data):
    """Flatten possible one-level category nesting into a flat dict."""
    flat = {}
    for k, v in data.items():
        if k in INTERNAL_KEYS:
            continue
        if k in NESTED_KEYS and isinstance(v, dict):
            for k2, v2 in v.items():
                flat.setdefault(k2, v2)
        else:
            flat.setdefault(k, v)
    return flat


def is_uncertain(value, name, uncertain_list):
    if name in uncertain_list:
        return True
    if value is None or value == "" or value == [] or value == {}:
        return True
    if isinstance(value, str) and "[uncertain]" in value:
        return True
    return False


def fmt(value, indent=0):
    pad = "  " * indent
    if isinstance(value, dict):
        return "\n".join(f"{pad}- **{k}**: {fmt(v, 0)}" for k, v in value.items())
    if isinstance(value, list):
        if all(isinstance(x, dict) for x in value) and value:
            return "\n".join(pad + "- " + " | ".join(f"{k}: {v}" for k, v in d.items()) for d in value)
        if all(isinstance(x, str) for x in value):
            if sum(len(x) for x in value) < 120:
                return ", ".join(value)
            return "\n".join(f"{pad}- {x}" for x in value)
        return "\n".join(f"{pad}- {fmt(x, 0)}" for x in value)
    text = str(value)
    if text.startswith("http"):
        return f"<{text}>"
    if len(text) > 100:
        return "\n" + "\n".join(f"> {line}" for line in text.split("\n"))
    return text


def anchor(title):
    a = title.lower()
    a = re.sub(r"[^\w\s-]", "", a, flags=re.UNICODE)
    return re.sub(r"[\s]+", "-", a.strip())


def main():
    field_structure = load_fields()
    defined_fields = {name for _, names in field_structure for name in names}

    outline = yaml.safe_load(OUTLINE_PATH.read_text(encoding="utf-8"))
    topic = outline.get("topic", "Research report")

    items = []
    for path in sorted(RESULTS_DIR.glob("*.json")):
        raw = json.loads(path.read_text(encoding="utf-8"))
        uncertain_list = raw.get("uncertain", []) or []
        flat = flatten(raw)
        items.append({"file": path.name, "data": flat, "uncertain": uncertain_list})

    # order items to follow outline order where possible
    outline_order = [it["name"] for it in outline.get("items", [])]

    def sort_key(item):
        name = item["data"].get("name", item["file"])
        for i, oname in enumerate(outline_order):
            if name.lower()[:20] in oname.lower() or oname.lower()[:20] in name.lower():
                return i
        return len(outline_order)

    items.sort(key=sort_key)

    lines = [f"# Research Report — {topic}", "", f"_Generated 2026-07-25 · {len(items)} items researched_", "", "## Table of Contents", ""]
    for i, item in enumerate(items, 1):
        name = item["data"].get("name", item["file"])
        cat = CATEGORY_LABELS.get(str(item["data"].get("category", "")).strip(), item["data"].get("category", ""))
        lines.append(f"{i}. [{name}](#{anchor(name)}) — {cat}")
    lines.append("")

    for item in items:
        data, uncertain_list = item["data"], item["uncertain"]
        name = data.get("name", item["file"])
        lines += [f"## {name}", ""]
        for category, field_names in field_structure:
            block = []
            for fname in field_names:
                if fname in ("name",):
                    continue
                value = data.get(fname)
                if is_uncertain(value, fname, uncertain_list):
                    continue
                block.append(f"**{fname}**: {fmt(value)}\n")
            if block:
                lines.append(f"### {category}")
                lines.append("")
                lines.extend(block)
        # extra fields not defined in fields.yaml
        extras = [
            (k, v) for k, v in data.items()
            if k not in defined_fields and k not in INTERNAL_KEYS
            and not is_uncertain(v, k, uncertain_list)
        ]
        if extras:
            lines.append("### Other Info")
            lines.append("")
            for k, v in extras:
                lines.append(f"**{k}**: {fmt(v)}\n")
        if uncertain_list:
            lines.append("### Uncertain fields (skipped)")
            lines.append("")
            for f in uncertain_list:
                lines.append(f"- {f}")
            lines.append("")
        lines.append("---")
        lines.append("")

    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Report written: {REPORT_PATH} ({len(items)} items)")


if __name__ == "__main__":
    main()
