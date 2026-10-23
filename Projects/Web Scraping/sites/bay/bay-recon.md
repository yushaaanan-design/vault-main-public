---
up: "[[bay]]"
tags: [web-scraping, architecture, bay]
---
# Scraper architecture: Bay (amarbay.com)

## Target
- https://amarbay.com (Bay Emporium), for Blue by Fable. Recon 2026-10-01.
- robots.txt: none published (returns the app shell, HTTP 200). Not permission.
- **Terms of Use verdict: FORBIDS automated access. SCRAPE NOT RUN.** Terms text (served by the site's own API `GET backend.amarbay.com/home/footer-menu/terms-of-use/`), clause 4.4.1: the user is prohibited from using "any devices, programs, procedures, algorithms and methods, automatic devices or equivalent manual processes to access, acquire, copy or track the content of the Site". Clause 4.4.3 also bans bypassing the site's navigation structure to obtain information "not specifically provided by the services of this Site".
- No official API or feed published. The JSON API the front end uses is private to the app.

## How the data loads (found, NOT used for a scrape)
JavaScript SPA (React/Vite). Base `https://backend.amarbay.com` (no key needed for read calls; the bundle only adds a Basic auth header for logged-in users, not copied anywhere).
- `/product/categories/`: whole category tree incl. embedded product records (about 2 MB).
- `/product/products_pagination/?page=N&category=<slug>` (24 per page; `page_size` accepted): list. Whole shop: 722 active products.
- `/product/product_details/<slug>/`: detail (price, colour, images, per-size stock `variants`).
- Fields exposed: title, keywords (brand line, e.g. ELEGANTE / BAY), description (material is rarely stated: "Upper: Leather", "Mens", "Men dress"), price, after_discount, colour, sizes + stock per size, images. No rating or review count seen.
- In-scope categories if ever allowed: Men Dress (`men dress-7685`, 53 active), Men Casual (`men casual-2448`), Men Summer sandals/slides (`men summer-4159`), Belts (`belts-9042`), Mens Bag (`mens bag-2244`), Others > Wallet (`wallet-1492`).

## Requests made during recon (about 12, read-only)
Home page, JS bundle + 5 chunks, categories list, 5 list calls (page 1 only), 1 detail call, terms text. No product data was saved to disk, no photos downloaded.

## Result
0 products scraped. Blocked by terms (see [[bay-problems]]). Needs the user's decision.
