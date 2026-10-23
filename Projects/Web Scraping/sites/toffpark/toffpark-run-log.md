---
up: "[[toffpark]]"
tags: [web-scraping, run-log, toffpark]
---
# Toffpark run log (one row per step)

| # | date | step | result | status |
|---|---|---|---|---|
| 1 | 2026-10-01 | permission check: robots.txt, terms-conditions, API | no scraping clause; Store API public and allowed | ok |
| 2 | 2026-10-01 | recon: sitemap, categories, Store API fields | in-scope ids 27 (208), 213 belts (29), 50 wallets (14) = 251 | ok |
| 3 | 2026-10-01 | `toffpark_fetch.py test` | 11 requests, 208 footwear rows (test mode paged everything, see problem 1); name/price/photos/sizes 100% | ok |
| 4 | 2026-10-01 | `toffpark_fetch.py` full | +43 belts/wallets, 208 dupes skipped, 0 failed; 251 rows, 16 requests total | ok |
| 5 | 2026-10-01 | `toffpark_clean.py` (rule fixed once, problem 2) | 251 read: 202 yes, 2 check, 47 no | ok |
| 6 | 2026-10-01 | `toffpark_photos.py test` | 5 products, 27 photos, 800px source (below 1000 cap) | ok |
| 7 | 2026-10-01 | `toffpark_photos.py` full | 202 products, 1104 photos, 3 transient fails | ok |
| 8 | 2026-10-01 | photos re-run | 3 recovered, 0 failed; 1107 photos, 101 MB | ok |
| 9 | 2026-10-01 | `toffpark_load_db.py` | 202 products, 1107 photos; checks: missing 0, orphans 0, no-photo 0 | ok |
| 10 | 2026-10-01 | `toffpark.canvas` | 8 product groups (74 nodes incl. flow), teal #00C2B8 | ok |
