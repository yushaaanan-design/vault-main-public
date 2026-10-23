---
up: "[[Marketlens]]"
tags: [marketlens]
---
# server/engine.py
The CLIP part. Photo or text becomes 512 numbers; one multiply scores them against all 7,428 stored photos; best photo per product wins.
Same model setting (`ViT-B-32-quickgelu`) as `clip_index.py` in the scraping project, or the numbers would not compare: [[decisions]].
`read_kind()` uses a second, bigger model (ViT-L-14) on the query photo only, to say what kind of shoe it is ([[limits]]). `rank()` is the hybrid search: with words, each product is scored on name/code match (strongest, 50 to 60%), photo similarity (35%) and CLIP's reading of the words against its photos (15 to 40%); the blend is in the code. Product codes work because the product id is searchable. Feeds [[server-main]]; product details come from [[server-catalog]]. How the numbers are used: [[data-flow]]. Weak spots: [[limits]].
