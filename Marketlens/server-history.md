---
up: "[[Marketlens]]"
tags: [marketlens]
---
# server/history.py
Saved lookups in Marketlens' own `storage/history.db`. Every query filters by user, so guessing another id gives "not found" ([[security]]).
Called by [[server-main]]; shown on the History screen ([[client-screens]]). Contract: [[api-contract]].
