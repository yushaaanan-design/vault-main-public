---
up: "[[wearszone]]"
tags: [web-scraping, architecture, wearszone]
---
# Scraper architecture: Wears Zone (wearszone.com.bd)

## Target
- https://wearszone.com.bd, WooCommerce/WordPress, Bangladeshi retailer (imports from China, Alibaba-style product text). Feeds Blue by Fable market research (men's leather shoes + accessories). Started 2026-10-01.
- **robots.txt:** blocks only admin, cart, logs. Sitemap `/wp-sitemap.xml`. Verdict: OK.
- **Terms ([[wearszone-problems]] none):** `/terms-and-conditions/` covers delivery, exchange and order policy only. `/privacy-policy/` has no clause on scraping, crawling or automated access. Verdict: nothing forbids it.
- **Official API/feed:** the public WooCommerce Store API `/wp-json/wc/store/v1/products` is open without a key. Used.

## Product structure (not website design)
Categories (Store API ids and counts): Men's Shoes 20 (41), Genuine Leather 83 (34), Formal Shoe 71 (22), Loafer 70 (22), Official Shoe 82 (8), Martin Boot 72 (2), High Neck 102 (1), Sleeper 73 (4), Rubber 105 (5), Rain Shoe 104 (1), Sports 92 (1), Belt 101 (2), Wallet 93 (1). Out of scope, never fetched: Ladies Hand Bag 103 (6).
Querying the 4 roots (20, 82, 101, 93) returned **41 unique products**: the rest are inside Men's Shoes too (belts, wallet and official shoes are multi-categorised).

## How the data loads
JSON endpoint, no HTML parsing needed: `GET /wp-json/wc/store/v1/products?per_page=100&page=N&category=<id>`. Prices are in hundredths of a taka (455000 = 4,550).

## Product fields available
name, slug/URL, SKU, categories, regular/sale price, on_sale, sizes (variation attribute, no stock per size), in_stock flag, rating, review count (all 0 so far), up to 9 photos, description. Not available: brand (empty), colours (usually only in the spec text), viewed/bought counts.
**Material** lives only in the description: a pasted spec sheet with "Upper material" (shoes) or "Material" (belt/wallet). 3 products have no such field and say e.g. "Genuine Leather. Sole: Rubber" in free text (less reliable).

## Scraper architecture
```
Store API (4 category requests) -> flatten + parse description spec table -> products.jsonl
-> clean (leather verdict by upper material) -> products.csv / check.csv
-> photos (kept only, 1000px) -> wearszone_market.db + 3 checks
```
Tool: `requests` + bs4 (only for the description HTML). 1.0 to 1.5 s gap, backoff 2/4/8 s, stop after 3 bad answers.

## Result
See [[wearszone-run-log]]. Problems: [[wearszone-problems]]. Scripts: `Desktop\Web Scraping\sites\wearszone\`.
