---
up: "[[bata]]"
tags: [web-scraping, recon, bata]
---
# Bata Bangladesh recon (batabd.com), 2026-10-01

## Verdict
Shopify store. The public JSON feed works with no block: `https://www.batabd.com/collections/<handle>/products.json?limit=250&page=N` (HTTP 200, no CAPTCHA, no 403/429 seen). No HTML crawling needed. Lightest polite method = this feed.

## Terms / robots (note only, not a gate)
Not checked in detail (user rule: a note, not a stop). Feed is the same data the shop pages use; photos are private research only ([[scraping-rules]] section 6).

## In-scope collections fetched (men only)
formal-shoes (353 listed), casual-shoes (481), mocassino-1 (84), mens-sandal (723), mens-all-shoes (1867), hush-puppies (315), weinbrenner (196), belt (52), wallets (47), accessories (614), backpack (116). Counts are the shop's `products_count`; the feed returns fewer (formal-shoes gave 179 of 353; likely sold-out items are not listed, not verified). Skipped collections: sports, school, kids, ladies, canvas, sneaker-fest, sale/deal collections.
Page size 250, pages until an empty page. 26 requests for the whole run.

## Product fields in the feed
title, handle, vendor (Bata (MEN), Hush Puppies, Comfit...), product_type, tags, body_html, variants (size / colour / price / compare_at_price / available per size), images (several per product), published_at. No ratings, reviews or sold counts.
Material is a spec line inside the description: `-Upper Material: Genuine leather`, also Type, Gender, In-sole, Outsole, Color, Closing. 89 percent of rows have it; the rest (some sandals, bags, wallets) are judged from text.
Each colour is its own product (own handle) so the same model appears several times.

## Quirks
- Every product carries a compare_at_price (crossed-out price), so "sale" is permanent. Treated as: price = original, sale_price = what you pay.
- Some descriptions contain a broken character (U+FFFD) where an apostrophe was.
- Sizes are UK 6 to 10.
