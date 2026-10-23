---
up: "[[Marketlens]]"
tags: [marketlens]
---
# server/main.py
All the routes: the doors of the app. Contract in [[api-contract]]. Every route except health and login calls `current_user()` from [[server-auth]].

Calls: [[server-engine]] (CLIP), [[server-catalog]] (products + price package), [[server-history]] (saved lookups). Also serves the built screens from [[client-app]].
Upload rules and photo-by-row safety: [[security]]. Walkthrough of one lookup: [[data-flow]]. Checked by [[tests]].
