---
up: "[[Web Scraping]]"
tags: [web-scraping, architecture, apex]
---
# Apex (apex4u.com): recon note, 2026-10-01

Registry row: [[sites]]. Rules: scraping-rules. Feeds Blue by Fable market research (leather only). Recon was read-only: sitemaps, one category page, one product page, one real-browser session.

## Verdict
**OK to scrape politely.** robots.txt `allow: *`; terms cover pricing, orders, COD and warranty and say nothing about bots or copying; no API; no CAPTCHA or block. Photos are private research only.

## Not the corporate site
apexfootwearltd.com is a brochure site (no prices, no cart). The shop is **apex4u.com** (logged in [[problems-log]]).

## Product structure (what we need)
Everything below is on the **plain product page HTML**, so `requests` + BeautifulSoup is enough. No Playwright needed (checked: HTTP 200, 286 KB, all fields present without JavaScript).

| Field | Where | Example (Sprint Men's Sneaker, SKU 93525A92) |
|---|---|---|
| Name, SKU, style | page text | Sprint Men's Sneaker, 93525A92, Sneaker |
| Brand | JSON-LD `brand.name` | Sprint |
| Price | JSON-LD `offers.price` (BDT) | 3990 |
| Sale price | listing cards show original + discounted, e.g. ৳1,990 ৳1,692 | confirm on product page in the test run |
| Colour | JSON-LD `color` | Brown (the description text says "beige": the site's own data disagrees, so store both) |
| Sizes | page text list | 39 to 44 (stock per size to check) |
| **Material** | "Materials" block: `Upper Material`, `Sole Material` | PU / EVA. **This is the leather filter.** |
| Rating, review count | JSON-LD `aggregateRating` | 5, 1 |
| **Popularity** | page text: "Viewed: 5,840 people recently VIEWED" and "Popular: 117 people have BOUGHT this product" | the site's own counts, a real popularity signal |
| Photos | JSON-LD `image` array, full size, `storage.apex4u.com/<uuid>.JPG` | 9 photos |
| Category | JSON-LD BreadcrumbList | Home / Men / Men Footwear / Casual Shoes |

## Site shape (only what scraping needs)
- **Sitemaps** (listed in robots.txt): `sitemap_products.xml` = **2,730 product URLs**; `sitemap_category_brand.xml` = 155 category/brand URLs. Product URLs look like `/product/<name>-<sku>`.
- The 2,730 includes apparel, Adidas and other non-leather items, so filtering matters.
- Leather-relevant category slugs: `men-formal-shoes`, `men-casual-shoes`, `men-boots`, `men-sandals`, `men-wallets`, `men-belts`, `men-bags`, `men-accessories`, `ib-beltswallets`, `ib-bags`. Skip `men-sports-shoes`, `men-canvas`, `men-sports-sandals`, clothing, women, kids.
- Listing pages show 20 products, then a "Show more" button. Filters: Style, Size, Colour, Brand, Gender. Sort: New Arrivals and others.
- Backend host `api.apex4u.com` exists; page text for policies comes from `wordpress.apex4u.com`. No listing API found yet.
- In-house brands: Apex, Venturini, Nino Rossi, Moochie, Maverick, Sprint, plus international brands.

## How data loads
Server-rendered HTML with JSON-LD `Product` data. No hidden JSON endpoint needed for product pages.

## Open question: how to get from "leather categories" to product URLs
The sitemap has all URLs but not their category.
- **Option A:** read all 2,730 product pages from the sitemap (about 90 min at 2 s each, about 780 MB), filter by the Material field afterwards. Simple, but heavier on their server and includes apparel.
- **Option B:** find how the listing's "Show more" loads products (probably a call to `api.apex4u.com`), and pull only the leather category listings. Lighter and cleaner, needs one more small recon step.
- **Result (2026-10-01): B failed.** Category pages show exactly 20 products, no pagination (`?page=2` ignored, scrolling and clicking load nothing). **Going with A**, plus a URL-name pre-filter to skip obvious non-leather (apparel, women, kids). See [[run-log]] step 8.

## Scraper plan (after the user's OK)
1. Get the product URL list (A or B).
2. Test on ~20 products; user reads the code and the output.
3. Per page: parse JSON-LD + Materials block + viewed/bought counts.
4. Keep only `Upper Material` containing genuine leather; PU/synthetic dropped; unclear goes to `check.csv`.
5. Download photos for kept items only.

## Screenshots
- `screenshots/apex4u/apex4u-listing-men-footwear-desktop.png` (listing, cookie banner overlaps the bottom)
- `screenshots/apex4u/apex4u-product-sprint-sneaker-desktop.png`

## Changes this causes elsewhere
- [[database-architecture]]: `products` gains `upper_material`, `sole_material`; `price_snapshots` gains `viewed_count`, `bought_count` (the site's own popularity numbers).
- Popularity no longer has to be guessed from proxies for Apex, though both counts are the site's own claims.
