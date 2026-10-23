---
up: "[[Web Scraping]]"
tags: [web-scraping, log]
---
# Problems actually hit (running log)

Real problems from real runs, newest first. The general theory is in [[problems-and-fixes]]; this is what happened to *us*. Add a row the moment something breaks, before fixing it. Include a screenshot when the page itself shows the problem.

| Date | Site | Symptom | Cause | Fix | Screenshot |
|---|---|---|---|---|---|
| 2026-10-01 | Apex shop | Category listings show only 20 products, no way to load more (`?page=2` ignored, scroll/click do nothing) | Listing is capped or loads through a path we did not find | Do not use listings to enumerate. Use the product sitemap (2,730 URLs) with a URL-name pre-filter, then the Material field decides leather | `screenshots/apex4u/apex4u-listing-formal-shoes-bottom-desktop.png` |
| 2026-10-01 | Apex | Terms page text came back empty / as homepage text | Page is drawn by JavaScript; policy text lives on wordpress.apex4u.com | Read it from the WordPress URL | none |
| 2026-10-01 | Apex | Planned site had no shop: no prices, cart or product pages, no terms page | apexfootwearltd.com is the corporate site; the shop is a different domain | Web search found apex4u.com. Rule: verify a site is a real shop before registering it | none |
| 2026-09-30 | books.toscrape.com | `£` printed as `Â£` | Site does not declare encoding, requests guessed wrong | `res.encoding = "utf-8"` | none |
| 2026-09-26 | Fable teardown (all sites) | `npx playwright install` timed out | Sandbox could not download the browser binary | Use `playwright-cli` with the real installed Chrome | none |

- 2026-10-01 | apex_fetch.py crashed on page 5 of the test (IndexError). Cause: material line "Sole MaterialRUBBER" has no colon, parser assumed one. Page: venturini-mens-sandal-92114v61. Fixed with an optional-colon regex.

- 2026-10-02 | CLIP step 1 (clip_step1.py) crashed on import: "DLL load failed while importing _arpacklib: An Application Control policy has blocked this file" (scipy, pulled in by sentence-transformers via scikit-learn). Cause: Windows Application Control blocks an unsigned DLL inside scipy. Plan: skip sentence-transformers and load CLIP with transformers + torch directly (no scipy needed); no policy changes.
