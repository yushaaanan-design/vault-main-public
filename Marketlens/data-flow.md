---
up: "[[Marketlens]]"
tags: [marketlens]
---
# One lookup, step by step
1. Browser sends the photo ([[client-api]]) with the cookie ([[server-auth]]).
2. [[server-main]] checks size (8 MB) and that it is a real image.
3. [[server-engine]] makes 512 numbers. If the user typed words, every product is scored on exact-name match + photo + words (`rank`); the words can also pick the shoe kind ("chelsea boot" means boots). Otherwise it scores all 7,428 stored photos.
4. If the user picked a kind, only photos of that family can win. Best photo per product, top 12 products; prices from [[server-catalog]].
5. `package()` summarises the prices; the result is saved by [[server-history]] and returned.
6. [[client-screens]] shows the Best match (top result with the reasons), the price package and the product cards.
Match quality and caveats: [[limits]].
