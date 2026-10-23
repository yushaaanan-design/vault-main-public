---
up: "[[Marketlens]]"
tags: [marketlens]
---
# Security decisions
Auth is new to the user: read [[server-auth]] line by line, and do a review pass before the partner uses it ([[todo]]).
- Never public: localhost only, partner via [[tailscale-setup]].
- Codes not passwords; only hashes in `.env`; lockout ([[server-auth]]).
- httpOnly + SameSite=Strict cookie; custom header on every POST/DELETE ([[client-api]]).
- Photos by row number, never a client path ([[server-main]]).
- History scoped per user ([[server-history]]).
- Uploads: size, image check, pixel limit, random file names ([[server-main]]).
- Scraped databases opened read-only ([[server-catalog]]).
- Not done: audit log, extra rate limits. Proven by [[tests]].
Flags: OneDrive syncs `.env` and `storage/` ([[STATE]]).
