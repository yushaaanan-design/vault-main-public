---
up: "[[toffpark]]"
tags: [web-scraping, architecture, toffpark]
---
# Scraper architecture: Toffpark (toffpark.com)

## Target
- toffpark.com, Bangladeshi footwear + accessories retailer (WooCommerce/WordPress, own label "Toffpark"). Feeds Blue by Fable market research. Started 2026-10-01.
- **robots.txt:** blocks only `wc-logs`, `woocommerce_transient_files`, `woocommerce_uploads`, `?add-to-cart=`, `/wp-admin/`. Product feed, product pages and images are allowed. Sitemap: `sitemap_index.xml` (Yoast).
- **Terms (`/terms-conditions/`, read 2026-10-01):** 15 short clauses (orders, delivery, returns). **No clause about scraping, bots or automated access.** Clause 9: site images, logos, text are Toffpark property, not to be used without permission: so photos stay private research only (as already planned). Clause 14: imported-product material info is "declared by the factory or supplier".
- **Official API/feed:** no private API, but the public WooCommerce Store API (`/wp-json/wc/store/v1/products`) is what the shop's own pages use. Allowed by robots. Verdict: **OK to scrape politely.**

## Product structure (not site design)
In-scope listings (men only), via category id on the API (`?category=<id>`):
| Category | id | items |
|---|---|---|
| Men Footwear (casual, formal, loafers, sandals, Martin + Chelsea boots, clogs) | 27 | 208 |
| Belts | 213 | 29 |
| Wallets (incl. card holders) | 50 | 14 |
Total 251 products. Not fetched: women, kids, Accessories-only socks / insoles / shoe care. Each colour is its own product (name ends "- Black").
- Pagination: `per_page=100&page=N`; headers `X-WP-Total`, `X-WP-TotalPages`.
- Fields in the feed: name, sku, permalink, price in hundredths of a taka (`194000` = 1,940), sale price + `on_sale`, categories, images (800px), size attribute list, variations (sizes still purchasable), `is_in_stock`, rating, review_count, description HTML.
- **Not in the feed:** brand (all Toffpark), stock count per size, viewed/bought counts. Sizes sold out = size in attribute list but missing from variations.
- **Material:** only inside the description. Two styles: a spec line (`Upper Material: Genuine Leather`, belts/wallets `Material:`) on about 85 percent, or a narrative sentence ("This one's genuine leather, brown ...") on the rest. Both written by the shop. The narrative style is looser; contrasts like "better than PU" go to check.csv.

## How the data loads
Hidden JSON endpoint (no HTML scraping): `https://toffpark.com/wp-json/wc/store/v1/products?category=27&per_page=100&page=1`. 5 requests fetch everything.

## Scraper architecture
```
fetch (Store API, 3 categories) -> parse -> products.jsonl -> clean (leather rule) -> products.csv / check.csv -> photos (leather only) -> SQLite
```
- Tool: `requests` + `bs4` (only to strip description HTML). Browser UA + Accept-Language, one Session, 1.0-1.5 s gap, 2/4/8 s backoff on 429/5xx, stop after 8 failures or a 403.
- Scripts: `Desktop\Web Scraping\sites\toffpark\toffpark_fetch.py`, `_clean.py`, `_photos.py`, `_load_db.py`. Output in `data\` (jsonl, csv, photos, `toffpark_market.db`).

## Problems we hit
See [[toffpark-problems]].

## Screenshots
Not taken (no browser used; data came from the JSON feed).

## Result
See toffpark-run-log.
