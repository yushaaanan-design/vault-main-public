---
up: "[[Marketlens]]"
tags: [marketlens]
---
# To do
1. Look at the UI in a browser, list changes ([[client-screens]]).
2. Partner + phone access ([[tailscale-setup]]).
3. Security review pass ([[security]]).
4. Later ideas: key filter by type/material, price chart, more sites, real hosting (needs full auth review) ([[limits]], [[decisions]]).
5. **Later, with the RAG fine-tuning work (user's words, 2026-10-02): automated test-and-tune pipeline.** Start with the benchmark only (does it deserve tuning?). Parts: a benchmark of test photos and searches (right kind, right style in the top results, exact name or code rank); a stress test with cropped, mirrored, darker and cluttered versions of each photo; an automatic tuner for the name/photo blend, the confidence cut-offs, the kind sentences and shop-wording synonyms; a failure report; optional "right / wrong" button in the app to grow the test set. Needs first: 50 to 100 of the user's own photos with the correct kind and style (the answer key), split so tuning never sees the photos used for the score. Limits: cannot fix missing data, cannot judge price accuracy ([[limits]], [[tests]]).
6. Fill thin kinds with more scraping, driven by Blue by Fable's own product types (aim for 30 or more comparables per style, 8 to 10 or more shops, a re-scrape every 2 to 4 weeks) ([[limits]]).
7. If the PC runs out of memory again, load the big model only when a lookup needs it ([[server-engine]]).

Status: [[STATE]].
