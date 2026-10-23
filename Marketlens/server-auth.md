---
up: "[[Marketlens]]"
tags: [marketlens]
---
# server/auth.py
Who are you? Access code, then a signed cookie.
- Code is checked against a scrypt hash from `.env`, in constant time; 5 wrong tries lock that name for 5 minutes.
- Cookie `ml_session`: httpOnly, SameSite=Strict, signed, 7 days.
- `require_header()` makes POST/DELETE carry `X-Requested-With` (CSRF shield).
Used by [[server-main]] on every route. Why these choices: [[security]], [[decisions]]. Making a code: `tools/new_code.py`. Setup for HTTPS: [[tailscale-setup]]. Checked by [[tests]].
