# Instagram Insights setup

How to get the token that `scripts/instagram_insights.py` needs.

Meta offers two setups. Pick the first one unless you have a specific reason not to.

| | Instagram Login | Facebook Login |
| --- | --- | --- |
| Facebook Page required | No | **Yes** |
| Setup steps | ~2 | ~12 |
| Insights | Yes | Yes |
| Hashtag search, product tagging, partnership ads | No | Yes |
| API host | `graph.instagram.com` | `graph.facebook.com` |

Everything below covers **Instagram Login**. It's the one Meta now steers people
toward, and for reading your own account's numbers the extra surface in the
Facebook Login path buys you nothing.

## Prerequisites

- Your account must be a **professional** account — Business or Creator, not
  personal. Instagram app → Settings → Account type and tools → Switch to
  professional account. Insights don't exist for personal accounts at all.
- A Meta developer account at [developers.facebook.com](https://developers.facebook.com).

## 1. Create the app

1. App Dashboard → **Create App** → app type **Business**.
2. Add the **Instagram** product to it.
3. Open **Instagram → API setup with Instagram login**.
4. Under *3. Set up Instagram business login → Business login settings*, note
   your **Instagram App ID** and **Instagram App Secret**. These are distinct
   from the Meta app ID/secret — using the wrong pair is the most common way
   this goes wrong.
5. Add an **OAuth redirect URI**. It has to match later requests exactly; the
   dashboard sometimes appends a trailing slash, so copy it back out rather than
   retyping it.

You only need **Standard Access**, not Advanced, and therefore **no App Review**,
as long as you're accessing accounts you own and have added to the app.

## 2. Get a long-lived token

Three hops: authorize → short-lived → long-lived.

**Authorize.** Open this in a browser, approve, and copy the `code` parameter off
the redirect URL. It's valid for one hour and single-use.

```
https://www.instagram.com/oauth/authorize
  ?client_id=<INSTAGRAM_APP_ID>
  &redirect_uri=<REDIRECT_URI>
  &response_type=code
  &scope=instagram_business_basic
```

`instagram_business_basic` is the only scope this script needs. Add
`instagram_business_manage_comments` or `instagram_business_content_publish` only
if you later want those.

**Exchange for a short-lived token.**

```bash
curl -X POST https://api.instagram.com/oauth/access_token \
  -F client_id=<INSTAGRAM_APP_ID> \
  -F client_secret=<INSTAGRAM_APP_SECRET> \
  -F grant_type=authorization_code \
  -F redirect_uri=<REDIRECT_URI> \
  -F code=<CODE>
```

**Exchange for a long-lived token** (60 days). Do this server-side — it carries
your app secret.

```bash
curl -G https://graph.instagram.com/access_token \
  -d grant_type=ig_exchange_token \
  -d client_secret=<INSTAGRAM_APP_SECRET> \
  -d access_token=<SHORT_LIVED_TOKEN>
```

## 3. Run it

```bash
export IG_ACCESS_TOKEN=<LONG_LIVED_TOKEN>
python3 scripts/instagram_insights.py --days 28
```

`IG_USER_ID` defaults to `me`, which resolves to the token's own account — that's
correct for this setup. Set it to a numeric id only on the Facebook Login path,
alongside `IG_API_HOST=graph.facebook.com`.

Useful flags:

```bash
--days 7               # shorter window (uses period=day instead of days_28)
--limit 50             # rank more posts
--no-media-insights    # ~4x fewer API calls, drops per-post reach/saves
--json                 # machine-readable, for diffing snapshots over time
```

## Keeping the token alive

Long-lived tokens last 60 days and can be refreshed for another 60, but only if
the current one is **at least 24 hours old and not yet expired**. Let one lapse
and there's no refresh path — you redo the authorize flow.

```bash
curl -G https://graph.instagram.com/refresh_access_token \
  -d grant_type=ig_refresh_token \
  -d access_token=<LONG_LIVED_TOKEN>
```

Worth a calendar reminder at ~50 days, or a scheduled job that refreshes and
rewrites the stored value.

## Storing the token

It's a credential with full read access to your account. Keep it in the
environment, never in the repo — `.gitignore` already covers `.env`.

For Claude Code on the web, add `IG_ACCESS_TOKEN` under Environment variables in
the environment's settings so sessions pick it up automatically.

## Network policy

Sandboxed sessions egress through a policy-enforcing proxy, and at the time of
writing it denies these at CONNECT with a 403:

```
graph.instagram.com     graph.facebook.com
api.instagram.com       www.instagram.com
```

The script reports this as *"could not reach … likely blocked by the egress
policy"* rather than a stack trace. To run it from a remote session, allow
`graph.instagram.com` (plus `api.instagram.com` if you're doing the token
exchange there too) in the environment's network policy. Otherwise run it
locally — it's stdlib-only, so any Python 3 works with nothing to install.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| `Invalid OAuth access token` | Token expired, or you used the Meta app secret instead of the **Instagram** app secret |
| `Unsupported get request` on `/insights` | Account is still personal, not professional |
| Some metrics listed as `unavailable` | Normal — scope not granted, or Meta retired that metric. The run continues |
| Empty insights, populated profile | Account too new or too quiet; Meta suppresses insights below a threshold |
| `redirect_uri` mismatch | Trailing slash. Copy the URI out of the dashboard rather than retyping it |
