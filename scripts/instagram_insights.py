#!/usr/bin/env python3
"""Pull Instagram profile stats, account insights, and top posts via the Graph API.

Standard library only, so there is nothing to install.

    export IG_ACCESS_TOKEN=...   # long-lived token, see docs/instagram-setup.md
    python3 scripts/instagram_insights.py --days 28
    python3 scripts/instagram_insights.py --json > snapshot.json

Works with either of Meta's two setups. The defaults target **Instagram API with
Instagram Login**, which needs no linked Facebook Page and is the sane choice
when you own the account:

    IG_API_HOST=graph.instagram.com   IG_USER_ID=me            (default)

For **Instagram API with Facebook Login** — needed only for hashtag search,
product tagging, or partnership ads — point it at the other host and pass the
numeric account id:

    IG_API_HOST=graph.facebook.com    IG_USER_ID=17841400000000000

Written against Graph API v25.0. Three version traps worth knowing about:

  - `impressions` was removed in v22.0 and is gone from every version as of
    2025-04-21. `views` replaces it.
  - Several account metrics only return data when `metric_type=total_value` is
    passed, and error out without it.
  - The two hosts expose overlapping but not identical metric sets.

The metric lists below are requested defensively: anything the API rejects is
dropped and reported rather than failing the whole run, because Meta retires
metrics on its own schedule and the two setups disagree about what exists.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

API_VERSION = "v25.0"
DEFAULT_API_HOST = "graph.instagram.com"

# Account-level. All are metric_type=total_value in v25.0.
ACCOUNT_METRICS = [
    "reach",
    "views",
    "accounts_engaged",
    "total_interactions",
    "likes",
    "comments",
    "shares",
    "saves",
    "profile_views",
]

# Media-level. Reels and images support different subsets, so failures here are
# expected and non-fatal.
MEDIA_METRICS = ["reach", "saved", "shares", "total_interactions"]


class GraphError(RuntimeError):
    """A Graph API error with the message Meta actually returned."""


def _redact(text: str, token: str) -> str:
    """Keep the access token out of anything we print."""
    return text.replace(token, "<TOKEN>") if token else text


def api_base() -> str:
    host = os.environ.get("IG_API_HOST", DEFAULT_API_HOST)
    return f"https://{host}/{API_VERSION}"


def get(path: str, token: str, **params: Any) -> dict:
    params["access_token"] = token
    base = api_base()
    url = f"{base}/{path}?{urllib.parse.urlencode(params)}"
    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", "replace")
        try:
            msg = json.loads(body)["error"]["message"]
        except Exception:
            msg = body[:300]
        raise GraphError(_redact(msg, token)) from None
    except urllib.error.URLError as exc:
        raise GraphError(
            f"could not reach {base} ({exc.reason}). In a sandboxed session this "
            f"host is likely blocked by the egress policy."
        ) from None


def fetch_profile(token: str, user_id: str) -> dict:
    return get(
        user_id,
        token,
        fields="username,name,biography,followers_count,follows_count,media_count",
    )


def fetch_account_insights(token: str, user_id: str, days: int) -> tuple[dict, list[str]]:
    """Return {metric: value} plus the names of any metrics the API refused.

    Metrics are requested one at a time. A single batched call fails entirely if
    any one metric is unsupported, which makes the whole report hostage to Meta's
    deprecation schedule.
    """
    period = "days_28" if days > 7 else "day"
    values, rejected = {}, []
    for metric in ACCOUNT_METRICS:
        try:
            data = get(
                f"{user_id}/insights",
                token,
                metric=metric,
                period=period,
                metric_type="total_value",
            )
        except GraphError:
            rejected.append(metric)
            continue
        for entry in data.get("data", []):
            total = entry.get("total_value", {}).get("value")
            if total is not None:
                values[entry["name"]] = total
    return values, rejected


def fetch_media(token: str, user_id: str, limit: int) -> list[dict]:
    """Recent posts, ranked later by engagement.

    like_count and comments_count come off the media node itself, so ranking
    works even without the instagram_manage_insights permission.
    """
    data = get(
        f"{user_id}/media",
        token,
        fields="id,caption,media_type,media_product_type,permalink,timestamp,"
        "like_count,comments_count",
        limit=limit,
    )
    return data.get("data", [])


def enrich_media(token: str, media: list[dict]) -> None:
    """Attach per-post insights in place. Best effort — subsets vary by type."""
    for post in media:
        stats = {}
        for metric in MEDIA_METRICS:
            try:
                data = get(f"{post['id']}/insights", token, metric=metric)
            except GraphError:
                continue
            for entry in data.get("data", []):
                vals = entry.get("values") or []
                if vals:
                    stats[entry["name"]] = vals[0].get("value")
        post["insights"] = stats


def engagement(post: dict) -> int:
    return (post.get("like_count") or 0) + (post.get("comments_count") or 0)


def summarize(caption: str | None, width: int = 60) -> str:
    if not caption:
        return "(no caption)"
    flat = " ".join(caption.split())
    return flat if len(flat) <= width else flat[: width - 1] + "…"


def render(profile: dict, insights: dict, rejected: list[str], media: list[dict], days: int) -> str:
    out = []
    name = profile.get("name") or ""
    out.append(f"@{profile.get('username', '?')}" + (f" — {name}" if name else ""))
    out.append(
        f"{profile.get('followers_count', 0):,} followers · "
        f"{profile.get('media_count', 0):,} posts · "
        f"following {profile.get('follows_count', 0):,}"
    )

    if insights:
        out.append(f"\nLast {days} days")
        label = {
            "reach": "Accounts reached",
            "views": "Views",
            "accounts_engaged": "Accounts engaged",
            "total_interactions": "Interactions",
            "profile_views": "Profile views",
            "likes": "Likes",
            "comments": "Comments",
            "shares": "Shares",
            "saves": "Saves",
        }
        for key in ACCOUNT_METRICS:
            if key in insights:
                out.append(f"  {label.get(key, key):<20} {insights[key]:>10,}")
        reach, engaged = insights.get("reach"), insights.get("accounts_engaged")
        if reach and engaged:
            out.append(f"  {'Engagement rate':<20} {engaged / reach:>9.1%}  (engaged/reach)")
    if rejected:
        out.append(f"\n  unavailable: {', '.join(rejected)}")
        out.append("  (missing instagram_manage_insights, or retired in this API version)")

    if media:
        ranked = sorted(media, key=engagement, reverse=True)
        out.append(f"\nTop posts by engagement (of last {len(media)})")
        for i, post in enumerate(ranked[:10], 1):
            kind = post.get("media_product_type") or post.get("media_type") or "?"
            date = (post.get("timestamp") or "")[:10]
            out.append(f"  {i:>2}. [{kind:<5}] {date}  {engagement(post):>6,} eng")
            out.append(f"      {summarize(post.get('caption'))}")
            extra = {k: v for k, v in (post.get("insights") or {}).items() if v}
            if extra:
                out.append("      " + "  ".join(f"{k}={v:,}" for k, v in extra.items()))
            out.append(f"      {post.get('permalink', '')}")
    return "\n".join(out)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--days", type=int, default=28, help="insights window (default 28)")
    ap.add_argument("--limit", type=int, default=25, help="recent posts to rank (default 25)")
    ap.add_argument("--json", action="store_true", help="emit raw JSON instead of a report")
    ap.add_argument("--no-media-insights", action="store_true",
                    help="skip per-post insights (much faster: 1 call instead of ~4 per post)")
    args = ap.parse_args()

    token = os.environ.get("IG_ACCESS_TOKEN")
    # "me" resolves to the token's own account, which is what the Instagram
    # Login setup returns. The Facebook Login setup needs the numeric id.
    user_id = os.environ.get("IG_USER_ID", "me")
    if not token:
        print(
            "IG_ACCESS_TOKEN is not set.\n"
            "See docs/instagram-setup.md for how to obtain a long-lived token.",
            file=sys.stderr,
        )
        return 2

    try:
        profile = fetch_profile(token, user_id)
        insights, rejected = fetch_account_insights(token, user_id, args.days)
        media = fetch_media(token, user_id, args.limit)
        if media and not args.no_media_insights:
            enrich_media(token, media)
    except GraphError as exc:
        print(f"Graph API error: {exc}", file=sys.stderr)
        return 1

    if args.json:
        json.dump(
            {"profile": profile, "insights": insights,
             "unavailable_metrics": rejected, "media": media},
            sys.stdout, indent=2,
        )
        print()
    else:
        print(render(profile, insights, rejected, media, args.days))
    return 0


if __name__ == "__main__":
    sys.exit(main())
