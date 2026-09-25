"""Measure a skill (or slash command) so the audit starts from numbers, not impressions.

Usage: python measure.py <skill-dir | SKILL.md | command.md>

Stdlib only. Prints the frontmatter, what the skill costs in context, and the
mechanical problems a person misses by eye: over-limit fields, broken file
references, files nothing points to, Windows paths, dated lines.
"""
import re
import sys
from pathlib import Path

# Limits from the Agent Skills spec and Claude Code docs (checked 25 Sep 2026):
# name <= 64 chars, lowercase/digits/hyphens; description <= 1,024 chars;
# Claude Code truncates description + when_to_use at 1,536 chars in the listing;
# SKILL.md body should stay under 500 lines.
NAME_MAX, DESC_MAX, LISTING_MAX, BODY_LINES_MAX = 64, 1024, 1536, 500
CHARS_PER_TOKEN = 4  # rough; Indonesian text runs a little higher per token


def parse(text):
    """Split frontmatter from body. Handles the flat key: value YAML skills use."""
    if not text.startswith("---"):
        return {}, text, 0
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text, 0
    fm_text = text[3:end].strip("\n")
    body = text[end + 4:].lstrip("\n")
    fm, key = {}, None
    for line in fm_text.splitlines():
        m = re.match(r"^([A-Za-z_-]+):\s*(.*)$", line)
        if m:
            key = m.group(1)
            fm[key] = m.group(2).strip().strip('"').strip("'")
        elif key and line.startswith((" ", "\t")):
            fm[key] = (fm[key] + " " + line.strip()).strip()
    return fm, body, fm_text.count("\n") + 3


def tokens(s):
    return round(len(s) / CHARS_PER_TOKEN)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    sys.stdout.reconfigure(encoding="utf-8")
    target = Path(sys.argv[1])
    md = target / "SKILL.md" if target.is_dir() else target
    if not md.exists():
        sys.exit(f"not found: {md}")
    root = md.parent
    is_skill = md.name == "SKILL.md"
    full = md.read_text(encoding="utf-8")
    fm, body, body_start = parse(full)
    problems = []

    print(f"== {md}")
    print("\n-- frontmatter")
    if not fm:
        problems.append("no frontmatter: first line must be '---' or none of it is parsed")
    for k, v in fm.items():
        print(f"{k}: {v[:90]}{'...' if len(v) > 90 else ''}")

    name = fm.get("name", root.name if is_skill else md.stem)
    if len(name) > NAME_MAX or not re.fullmatch(r"[a-z0-9-]+", name):
        problems.append(f"name '{name}': must be <= {NAME_MAX} chars, lowercase letters, digits, hyphens")
    if re.search(r"claude|anthropic", name):
        problems.append(f"name '{name}' contains a reserved word (claude/anthropic)")

    desc = fm.get("description", "")
    listing = (desc + " " + fm.get("when_to_use", "")).strip()
    auto = fm.get("disable-model-invocation", "").lower() not in ("true", "yes", "on", "1")
    print("\n-- cost")
    print(f"description: {len(desc)} chars (~{tokens(desc)} tok), "
          f"{'in context EVERY session' if auto else 'not in context (manual-only)'}")
    print(f"body: {len(body.splitlines())} lines, {len(body)} chars (~{tokens(body)} tok), loaded on each invoke")
    if not desc:
        problems.append("no description: Claude cannot tell when to use it")
    if len(desc) > DESC_MAX:
        problems.append(f"description {len(desc)} chars > {DESC_MAX} (spec limit; rejected outside Claude Code)")
    if len(listing) > LISTING_MAX:
        problems.append(f"description+when_to_use {len(listing)} chars > {LISTING_MAX}: the tail is cut from the listing")
    if re.search(r"<[a-zA-Z/][^>]*>", desc):
        problems.append("description contains <...>: fine in Claude Code, rejected on claude.ai upload")
    if re.match(r"(I|You)\b", desc) or re.search(r"\b(I can|you can use this)\b", desc, re.I):
        problems.append("description not in third person / imperative")
    if len(body.splitlines()) > BODY_LINES_MAX:
        problems.append(f"body {len(body.splitlines())} lines > {BODY_LINES_MAX}: move bulk to reference files")

    # Siblings: the whole always-on bill this skill is part of.
    if is_skill and root.parent.exists():
        total, rows = 0, []
        for sib in sorted(root.parent.glob("*/SKILL.md")):
            sfm, _, _ = parse(sib.read_text(encoding="utf-8"))
            d = sfm.get("description", "")
            if sfm.get("disable-model-invocation", "").lower() in ("true", "yes", "on", "1"):
                d = ""
            total += len(d)
            rows.append(f"  {sib.parent.name}: {len(d)} chars")
        print(f"all skills in {root.parent.name}/: {total} description chars (~{tokens(' ' * total)} tok) always on")
        print("\n".join(rows))

    print("\n-- files")
    refs = set()
    for m in re.finditer(r"\]\(([^)#\s]+)\)|`([\w./-]+\.(?:md|py|sh|ps1|js|json|txt|csv))`", body):
        p = m.group(1) or m.group(2)
        if not re.match(r"[a-z]+://", p):
            refs.add(p)
    others = [f for f in root.rglob("*") if f.is_file() and f != md
              and "__pycache__" not in f.parts] if is_skill else []
    for f in others:
        rel = f.relative_to(root).as_posix()
        used = rel in full or f.name in full
        print(f"{rel}: {f.stat().st_size} bytes{'' if used else '   <- never referenced in SKILL.md'}")
    for r in sorted(refs) if is_skill else []:
        if "/" in r or r.endswith(".md"):
            if not (root / r).exists() and not any(f.name == Path(r).name for f in others):
                problems.append(f"referenced file not in skill dir: {r} (fine only if it lives elsewhere on purpose)")
    if not others:
        print("(SKILL.md only)" if is_skill else "(command file)")

    print("\n-- lines to check")
    for i, line in enumerate(body.splitlines(), body_start + 1):
        if re.search(r"\b\w+\\\w+\.\w+", line) and "http" not in line:
            print(f"L{i} windows path: {line.strip()[:80]}")
        if re.search(r"\b(as of|per|since|sebelum|sejak)\b.*\b20\d\d\b|\b\d{1,2} \w{3,9} 20\d\d\b", line, re.I):
            print(f"L{i} dated: {line.strip()[:80]}")

    print("\n-- problems")
    print("\n".join(f"! {p}" for p in problems) or "none found mechanically")


if __name__ == "__main__":
    main()
