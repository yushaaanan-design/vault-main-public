---
up: "[[wearszone]]"
tags: [web-scraping, problems]
---
# Wears Zone: problems (appended the moment they happened)

| # | step | symptom | cause | fix |
|---|------|---------|-------|-----|
| 1 | test print | UnicodeEncodeError on the taka sign | Windows console is cp1252 | run with `PYTHONIOENCODING=utf-8` (scripts themselves read/write utf-8) |
| 2 | fetch test | prices 0 on 5 items (e.g. 00652, 00771, 00530) | site stores sale price 0 and `is_purchasable` false; regular price is real | clean script: price = regular price, sale price blank when 0 |
| 3 | fetch test | description is a pasted Alibaba spec table, two layouts (table cells, or loose "Label: value" lines), some with no Upper material at all | WooCommerce description pasted by hand | parse both layouts; fall back to description text; fallback never gives yes unless wording says genuine/grain/cowhide |
| 4 | fetch test | 3 items have empty site categories, names contain `&#8217;` | site data quality | `found_in` kept on every row; names html-unescaped in clean |
| 5 | fetch test | the 4 categories overlap fully (belts, wallet, official shoes all also sit under Men's Shoes: 41 unique) | WooCommerce multi-category | dedupe by URL (31 duplicates skipped) |
| 6 | photos | full photo run exceeded the 2 min tool timeout | many photos at 1 to 1.5 s gap | moved to background, resumable |
