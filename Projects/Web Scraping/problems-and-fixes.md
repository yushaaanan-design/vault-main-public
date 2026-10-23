---
up: "[[Web Scraping]]"
tags: [web-scraping, concept]
---
# The 3 main problems of web scraping (and the fixes)

Goal: scrape many real sites reliably and legally. This note is the map; each fix becomes a small step in [[Projects/Web Scraping/STATE|STATE]]. Current code: [[how-it-runs]] (`scrape.py` has none of these fixes yet).

## Problem 1: Getting blocked

**Why it happens.** A site cannot tell a script from a person, so it looks for signs: too many requests too fast, no browser-like headers, the same IP hitting everything, no cookies, no JavaScript executed. Each sign raises a "bot score". Past a threshold you get a rate limit (HTTP `429`), a ban (`403`), or a CAPTCHA.

**What a default `requests` call looks like to a site:** the header `User-Agent: python-requests/2.x`. That announces "I am a script" on request one.

| Signal the site checks | Polite fix | Step |
|---|---|---|
| Speed: many requests per second | `time.sleep()` between requests, with a random jitter (`random.uniform(1, 3)`) | Easy |
| `User-Agent` says python-requests | Send a normal browser `User-Agent` and `Accept-Language` headers | Easy |
| No cookies / session | `requests.Session()` keeps cookies between requests like a browser | Easy |
| Temporary errors (`429`, `503`) | Retry with **backoff**: wait 2s, 4s, 8s, then give up. Respect the `Retry-After` header if sent | Medium |
| One IP sending everything | Slow down first. Rotating proxies come only if slowing down is not enough | Later |
| Site runs a JS bot check (Cloudflare etc.) | A real browser tool (Playwright), see Problem 2 | Medium |
| CAPTCHA | Treat it as a "stop" sign. See the line below | n/a |

**Where the line is.** Everything above (slow down, honest-looking headers, sessions, backoff) is normal, accepted practice. Actively defeating a block, like solving CAPTCHAs with services or spoofing browser fingerprints to sneak past a site that said no, is what breaks terms of service and can create legal trouble. Rule: if a site clearly says no, look for another source (its official API, a data provider, asking permission) before building an evasion.

**Check before scraping any site:**
1. `https://site.com/robots.txt`: which paths the owner asks bots to avoid, and sometimes a `Crawl-delay`.
2. The site's terms of service.
3. Does an official API exist? An API is faster, cleaner and safer than scraping.
4. Personal data (names, emails, photos of people): different rules (GDPR etc.). Avoid unless you have a reason.

## Problem 2: Content built by JavaScript

**Why it happens.** `requests` downloads only the raw HTML. Many sites ship an empty page and fill it with JavaScript in the browser, so `soup.select(...)` finds nothing.

**Diagnose in 30 seconds:**
1. Right-click the page, **View Page Source** (not Inspect). Is the data in there? Yes: `requests` works.
2. If not, open DevTools, **Network** tab, filter **Fetch/XHR**, reload. Look for a request returning JSON with your data.

**Fixes, in order of preference:**
1. **Call the hidden JSON endpoint directly** with `requests` (`res.json()`). Fastest and most stable, no HTML parsing at all.
2. **Playwright**: drives a real Chromium browser, waits for JS to finish, then you read the rendered HTML. Slower and heavier, but works when 1 does not. It also passes many basic bot checks because it is a real browser.
3. Selenium: older tool, same job. Prefer Playwright.

## Problem 3: Fragility

**Why it happens.** Your scraper depends on exact HTML (`article.product_pod`, `.price_color`). The site redesigns, renames a class, or a field is missing on one item, and the script crashes or quietly returns nothing.

**Fixes:**
- **Fail loudly.** `assert rows, "no books found: selector broke?"`. A crash you notice beats an empty CSV you trust.
- **Handle missing fields.** `select_one(...)` returns `None` when absent, and `None.text` crashes. Check first.
- **Prefer stable selectors:** ids, `data-*` attributes and structured data (`<script type="application/ld+json">`) change less than styling classes.
- **Pagination.** Loop over pages until there is no "next" link. `scrape.py` reads page 1 of 50 only.
- **Clean the data.** `"£51.77"` is text; convert to a number (`float(price.lstrip("£"))`) before analysing.
- **Dedupe and re-run safely.** Save with a stable key (URL or id) so running twice does not double your rows.

## Learning order (one idea per step)
1. Headers + `time.sleep()` + `Session` (Problem 1, easy fixes)
2. Pagination over all 50 pages (Problem 3)
3. Retry with backoff + fail-loudly checks
4. Find a hidden JSON API in the Network tab (Problem 2)
5. Playwright for a JS-only site
6. Only if needed: proxies, and the legal/ToS review per real target

Practice sites made for this, no legal risk: `books.toscrape.com` (static), `quotes.toscrape.com/js/` (JavaScript-rendered).
