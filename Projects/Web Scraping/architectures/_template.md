---
up: "[[Web Scraping]]"
tags: [web-scraping, architecture]
---
# Scraper architecture: <site>

Copy this per site. Fill it as you go, not afterwards.

## Target
- URL, why this site, which project it feeds, date started.
- robots.txt verdict + terms check + official API/feed? (stop here if the site says no)

## Site architecture (what the site looks like)
- Nav tree: categories, subcategories, filters, sort options.
- URL patterns: listing, product, pagination. Item counts per category.
- Product fields available.

## How the data loads
Static HTML / hidden JSON endpoint (give the URL) / JavaScript-only. Evidence: what View Source and the Network tab showed.

## Scraper architecture (how our scraper works)
```
fetch -> parse -> extract -> save   (draw the real flow for this site)
```
- Tool chosen and why (requests+bs4 / JSON endpoint / Playwright).
- Pagination method, delay, headers, retry rules.
- Output: `data/<site>/products.jsonl`, `run.log`, `photos/`.

## Problems we hit
One line each, also copied to [[problems-log]]: symptom -> cause -> fix.

## Screenshots
`screenshots/<site>/` : home, listing, product, plus any page that broke the scraper. Name: `<site>-<page>-<viewport>.png`.

## Result
Items collected, fields filled %, gaps, what to improve next run.
