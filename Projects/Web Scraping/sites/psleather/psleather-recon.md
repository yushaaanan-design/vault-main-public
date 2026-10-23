---
up: "[[psleather]]"
tags: [web-scraping, architecture, psleather]
---
# Scraper architecture: PS Leather (psleather.com)

## Target
- psleather.com, own-brand genuine leather loafers and sandals (men's sizes 39-44), Bangladesh. Feeds Blue by Fable. Started 2026-10-01 (autonomous run).
- **robots.txt:** `User-agent: * / Allow: /`. Its Sitemap line points to `bestbiponi.com/sitemap.xml`, a different domain. bestbiponi.com is an unrelated WordPress/WooCommerce site (its robots.txt differs, its TLS certificate is expired); it does NOT list PS Leather. The line is a platform misconfiguration. We ignored it and did not scrape bestbiponi.com.
- **Platform:** the shop runs on **ClickDokan** (multi-tenant Laravel; footer "Powered by ClickDokan", real shop path `/store/ps-leather`). We only touched `/store/ps-leather/...`.
- **Terms / privacy** (`/store/ps-leather/additional/terms-and-conditions`, `.../privacy-policy`): generic text. Content (images, text) is copyrighted, no reproduction without permission; **no clause about automated access or scraping**. Photos kept as private research only. No official API or feed found.
- **Verdict: OK to scrape politely.**
- No sitemap (`/sitemap.xml` returns 404). `curl` with its default headers gets 406; a normal browser User-Agent works.

## How the data loads
**Plain server-rendered HTML** (View Source shows everything): `requests` + BeautifulSoup. No JSON-LD, no XHR needed, no Playwright.

## Category URLs and counts
| Page | URL | Items |
|---|---|---|
| Shop (all) | /store/ps-leather/categorie/0 | 6 |
| Casual Loafer | /store/ps-leather/categorie/555 | 5 loafers |
| Sandal | /store/ps-leather/categorie/812 | 1 |
All on one page (no pagination: "Showing 1 to 6 of 6"). The whole catalogue is 6 products, all in scope (men's leather shoes). No accessories.

## Product fields (product page `/store/ps-leather/product/<slug>`)
- name: `h2.text-xl`; SKU; sale price `#sale-price`, regular price `#regular-price` (shown crossed out when discounted).
- sizes 39-44 (no per-size stock; only a "Stock in" status); no colour field (derived from name); **no rating or review count**.
- **Material is in BENGALI** in the description bullets: `উপাদান: ১০০% জেনুইন চামড়া` (= material: 100% genuine leather), `সোল:` sole, `ইনসোল:` insole, `লাইলিন:` lining. The Executive Doctor Sandal has no bullet list; its description says "100% Genuine Leather" in English (marketing text, less reliable but explicit).
- photos: `<img>` under `/storage/uploads/product_image/` (3 to 10 per product). `is_cover_image` images belong to related products and are skipped.

## Scraper architecture
```
urls (3 listing pages) -> fetch (6 product pages) -> clean (leather verdict) -> photos -> db
```
requests.Session, browser UA, 1.0-1.5 s gap, rest every 50, 429/5xx backoff 2/4/8 s. Code: `Desktop\Web Scraping\sites\psleather\`.

## Result (2026-10-01)
6 found, 6 genuine leather (5 from the details bullet, 1 sandal from description), 0 check, 0 dropped, 29 photos (max 6 per product). See [[psleather-run-log]], [[psleather-problems]].
