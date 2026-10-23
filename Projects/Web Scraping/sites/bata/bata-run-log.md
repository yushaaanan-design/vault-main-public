---
up: "[[bata]]"
tags: [web-scraping, run-log, bata]
---
# Bata run log (2026-10-01)

| # | date | step | result | status |
|---|------|------|--------|--------|
| 1 | 2026-10-01 | Read scraping-rules and Web Scraping STATE | rules loaded; reference = toffpark scripts | done |
| 2 | 2026-10-01 | Recon: Shopify check (collections products.json, collections.json) | 200 OK, 169 collections listed, no block | done |
| 3 | 2026-10-01 | Pick men's collections + feed sample | 11 collections; material is a spec line in body_html | done |
| 4 | 2026-10-01 | bata_fetch.py written, test on formal-shoes | 20 rows, price/photos/sizes/colours 100%, material line 100% | done |
| 5 | 2026-10-01 | bata_fetch.py FULL run | 26 requests, 1,970 seen, 777 duplicates, 508 out of scope (375 sneaker/sport, 133 women/kids), 18 no men marker; 687 men's rows saved; 0 failed | done |
| 6 | 2026-10-01 | bata_clean.py written and run | 296 leather, 5 check, 386 dropped; self-check asserts pass | done |
| 7 | 2026-10-01 | bata_photos.py test (5 products) then full | 296 products, 1,234 photos, 0 failed (resized 1000px, sha256 index) | done |
| 8 | 2026-10-01 | bata_load_db.py | 296 products, 296 price snapshots, 1,234 photos; checks: 0 missing files, 0 orphans, 0 products without photo | done |
| 9 | 2026-10-01 | Notes + canvas written | bata-recon, bata-problems, bata.canvas (teal) | done |
