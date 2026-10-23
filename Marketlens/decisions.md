---
up: "[[Marketlens]]"
tags: [marketlens]
---
# Why we chose X
- Python backend, not Express: CLIP and the data are Python ([[server-engine]]).
- No vector database: 7,428 rows multiply in milliseconds.
- In-memory catalogue: 1,394 rows ([[server-catalog]]).
- One server serves the built screens: one thing to run, no CORS ([[server-main]], [[client-app]]).
- Access codes instead of accounts: two trusted people ([[server-auth]]).
- Tailscale instead of hosting online: stays private ([[tailscale-setup]], [[security]]).
- No scipy / sentence-transformers: Windows blocks a scipy DLL on this PC.
- Design: light page with lime as a flat field, not the usual black page with a lime accent. The memorable part is the price scale (every comparable as a photo pin on a price line). Fonts bundled with the app, no outside requests ([[client-screens]]).
- Shoe kind is picked by the user, not guessed from the photo: guessing was unreliable on real photos (see [[limits]]).
- Hybrid search (exact names + photo + CLIP words) in memory, not a vector database: 1,394 products fit in memory and name matching needs no embeddings ([[server-engine]]).
- Best match card on top, price range below: the user wants one most-accurate answer plus the market spread ([[client-screens]]).
- Two CLIP models: the small one (ViT-B-32) fingerprints every photo for fast matching; the big one (ViT-L-14) reads only the query photo to decide the kind. Re-embedding everything with the big one would take about 4 hours ([[server-engine]], [[limits]]).
