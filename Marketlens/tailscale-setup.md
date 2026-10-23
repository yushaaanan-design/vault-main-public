---
up: "[[Marketlens]]"
tags: [marketlens]
---
# Partner and phone access (Tailscale)
Why Tailscale: a private network between invited devices, so the server is never public. See [[decisions]] and [[security]].

Steps (check Tailscale's current docs; written from memory):
1. Install Tailscale on this PC and on both phones, sign in.
2. Share this PC with the partner's Tailscale account.
3. In a terminal: `tailscale serve --bg 8000` gives a private `https://<pc>.<tailnet>.ts.net` address.
4. Set `COOKIE_SECURE=1` in `.env` ([[server-auth]]) and restart ([[how-to-run]]).
5. On each phone open the address and "Add to Home Screen".

The PC must be on and the server running. Not done yet: tracked in [[todo]].
