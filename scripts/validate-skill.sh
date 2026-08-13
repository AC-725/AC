#!/usr/bin/env bash
# Validate a skill directory. Usage: scripts/validate-skill.sh .claude/skills/my-skill
set -uo pipefail
D="${1%/}"; F="$D/SKILL.md"; fail=0
[ -f "$F" ] || { echo "FAIL: no SKILL.md in $D"; exit 1; }

# 1. name must match the directory name
n=$(sed -n '/^---$/,/^---$/p' "$F" | sed -n 's/^name:[[:space:]]*//p' | head -1)
[ "$n" = "$(basename "$D")" ] \
  && echo "ok   name '$n' matches directory" \
  || { echo "FAIL name '$n' != directory '$(basename "$D")'"; fail=1; }

# 2. description must be non-empty and under 1024 chars
c=$(awk '/^---$/{n++;next} n==1' "$F" \
    | awk '/^description:/{f=1;sub(/^description:[[:space:]]*[>|]?-?[[:space:]]*/,"")} \
           /^[a-z_]+:/&&!/^description:/{f=0} f' \
    | tr -d '\n' | sed 's/^[[:space:]]*//' | wc -c)
[ "$c" -gt 0 ] && [ "$c" -lt 1024 ] \
  && echo "ok   description $c chars (limit 1024)" \
  || { echo "FAIL description $c chars (must be 1-1023)"; fail=1; }

# 3. every references/scripts/assets path named in the body must exist
while read -r p; do
  [ -e "$D/$p" ] && echo "ok   $p" || { echo "FAIL missing $p"; fail=1; }
done < <(grep -oE '(references|scripts|assets)/[A-Za-z0-9._-]+' "$F" | sort -u)

exit $fail
