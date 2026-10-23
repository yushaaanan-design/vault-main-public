---
up: "[[Marketlens]]"
tags: [marketlens]
---
# The 13 checks (`server/tests/test_api.py`)
Run: `python -m pytest tests -q` in `server/` ([[how-to-run]]).
1. Everything needs login ([[server-auth]]). 2. Wrong code and missing header rejected. 3. Browse and filters ([[server-catalog]]).
4. Photo route is safe ([[server-main]]). 5. A stored photo uploaded comes back rank 1 ([[server-engine]]).
6. Bad upload rejected. 7. History is private ([[server-history]]).
8. Picking a kind limits matches and unknown kinds are refused. 9. Words find exact names first and name a kind. 10. A product code finds that product. 11. Photo plus words: words win over the look. 12. Unknown words are reported.
13. Your real Chelsea boot photo, with no words and no kind picked, is read as boots and matched with boots (skipped on any PC without that photo).
Why they exist: [[security]].
