---
up: "[[psleather]]"
tags: [web-scraping, run-log, psleather]
---
# PS Leather run log

| # | date | step | result | status |
|---|---|---|---|---|
| 1 | 2026-10-01 | permission check | robots allow all; terms have no scraping clause; no API; bestbiponi sitemap line is unrelated | done |
| 2 | 2026-10-01 | recon | server-rendered HTML on ClickDokan; 6 products, Bengali material text | done |
| 3 | 2026-10-01 | script 1 urls | 6 product URLs from 3 listing pages | done |
| 4 | 2026-10-01 | script 2 fetch (full: whole site is 6 pages) | 6 ok, 0 failed, 0 blocked; name/price/sizes/photos 100%, material bullet 83% | done |
| 5 | 2026-10-01 | script 3 clean (1st run) | all 6 wrongly dropped, Unicode bug (problem 3) | fixed |
| 6 | 2026-10-01 | script 3 clean (after fix) | yes 6, check 0, dropped 0 | done |
| 7 | 2026-10-01 | script 4 photos | 29 saved (1000 px), 0 failed | done |
| 8 | 2026-10-01 | script 5 db + checks | psleather_market.db 6 products, 29 photos; missing 0, orphans 0, no-photo 0 | done |
| 9 | 2026-10-01 | canvas | psleather.canvas built (gold #D4AF37) | done |
