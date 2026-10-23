---
up: "[[Marketlens]]"
tags: [marketlens]
---
# server/catalog.py
Loads the 1,394 products and their latest price from the 5 scraped databases (opened read-only), once at start.
`package()` turns a list of prices into low / median / high, the typical range (middle half) and a warning when fewer than about 10 comparables.
`group_of()` sorts each product into a shoe family (boot, loafer, formal, sandal, sneaker, belt, wallet, bag, other) from its messy type text and name; this powers the "what is it?" filter ([[limits]]).
Used by [[server-main]] and [[server-engine]]; shown by [[client-screens]]. Data rules: [[security]]. Limits of the prices: [[limits]].
