---
up: "[[bata]]"
tags: [web-scraping, problems, bata]
---
# Bata problems (newest last)

| # | date | problem | cause | fix |
|---|------|---------|-------|-----|
| 1 | 2026-10-01 | Writing bata_fetch.py via a shell heredoc failed (unexpected EOF) | apostrophes/quotes in the script confused the shell | wrote the file with the editor tool instead |
| 2 | 2026-10-01 | Feed returns fewer products than `products_count` (179 of 353 for formal-shoes) | probably sold-out items are not in the feed (not verified) | accepted; noted as a coverage limit |
| 3 | 2026-10-01 | First clean test failed: "PU leather" test input was in the wrong format | test line had a stray `|` after the label, so the label parsed as empty | fixed the test strings; also added a rule: "synthetic/PU/faux leather" in free text = drop |
| 4 | 2026-10-01 | Descriptions contain U+FFFD (broken apostrophes) | data is already broken on the site | left as is (raw kept) |
