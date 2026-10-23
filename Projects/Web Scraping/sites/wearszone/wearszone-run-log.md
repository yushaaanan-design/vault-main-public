---
up: "[[wearszone]]"
tags: [web-scraping, run-log]
---
# Wears Zone run log

| # | date | step | result | status |
|---|------|------|--------|--------|
| 1 | 2026-10-01 | robots.txt (read earlier) | blocks only admin/cart/logs | done |
| 2 | 2026-10-01 | terms + privacy read | no scraping clause | done |
| 3 | 2026-10-01 | recon: Store API + categories | open JSON API, 13 categories, 41 unique in-scope products | done |
| 4 | 2026-10-01 | `wearszone_fetch.py` test (LIMIT 20) | 20 rows, checked by eye | done |
| 5 | 2026-10-01 | `wearszone_fetch.py` full | 4 requests, 41 unique, 0 failed | done |
| 6 | 2026-10-01 | `wearszone_clean.py` | 36 yes, 3 check, 2 dropped (EVA slipper, Ultraboost) | done |
| 7 | 2026-10-01 | `wearszone_photos.py` | 110 photos for 36 kept items, 0 failed | done |
| 8 | 2026-10-01 | `wearszone_load_db.py` | 36 products, 110 photos; checks 0 / 0 / 0 | done |
| 9 | 2026-10-01 | `wearszone_canvas.py` | 50 nodes, all gold #D4AF37 | done |
