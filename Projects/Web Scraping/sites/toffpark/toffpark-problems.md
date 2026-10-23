---
up: "[[toffpark]]"
tags: [web-scraping, problems, toffpark]
---
# Toffpark problems (symptom, cause, fix)

| # | date | symptom | cause | fix |
|---|---|---|---|---|
| 1 | 2026-10-01 | "20-item test" fetched the whole men-footwear category (11 pages, 208 rows) | test mode set per_page=20 but the loop still followed all pages | harmless (11 polite requests, rows are valid); added `break` after page 1 in test mode |
| 2 | 2026-10-01 | cleaner marked 5 narrative-description products wrongly (material read as "brown", "black", "microfiber..." and genuine leather shoes dropped) | fallback regex took the word after "This one's", but descriptions vary | replaced with whole-description logic: leather word and no fake word = yes; fake word without "genuine leather" = no; both = check.csv |
| 3 | 2026-10-01 | `UnicodeEncodeError` printing the taka sign in the console | Windows console is cp1252 | run with `PYTHONIOENCODING=utf-8` (data files are fine) |
| 4 | 2026-10-01 | 3 photo downloads failed with ConnectionError | transient network drop | none needed, re-ran script 3 (resumable): 3 saved, 0 failed |
