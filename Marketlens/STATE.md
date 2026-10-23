---
up: "[[Marketlens]]"
---
# State: Marketlens (updated 2026-10-02)

> [!info] Parked 2026-10-02 at the user's decision: working on N8N and Content Creation next
> Built and working on this PC (13 tests pass; a Chelsea boot photo with no words returns boots; words box, Best match card, drag and drop, kind detection with a big model). To resume: start the server (below), then do the three open steps in [[todo]]: real access codes, Tailscale, security review. The server was stopped once by low memory (it uses about 2.7 GB with two CLIP models); close Chrome first. Do not start it on your own after a memory stop.

## Done and tested
- Backend (`server/`): login by access code, photo lookup, text search, browse + filters, product detail + "find similar", saved history, photo serving. **13 automated tests pass** (`python -m pytest tests -q` in `server/`): login required everywhere, wrong code rejected, CSRF header required, photo-by-row cannot be tricked into reading other files, a stored photo comes back rank 1 through the real upload route, bad upload rejected, history is private per person.
- Live smoke test on `127.0.0.1:8000`: login sets an httpOnly cookie, `/me`, browse (Apex 854 products), built frontend served. **Interface redesigned and checked in a real browser (desktop 1280 wide and phone 390 wide) on 2026-10-02.** First version was plain and generic; the redesign uses a light paper page, ink text, lime as a big flat colour, Bricolage Grotesque + Figtree fonts (bundled), a lime price tag, a price scale with a photo pin per comparable, and a lime scan line while matching.

## Run it (on this PC)
1. Sign in with the **demo** login: name `demo`, access code `demo-lens`. It is weak on purpose, for trying the app on this PC only. The server refuses to start with `COOKIE_SECURE=1` while a `demo` entry exists, so it cannot go onto Tailscale by accident. For real use make codes with `python tools/new_code.py <name>` and put the line in `.env` ([[server-auth]]).
2. Terminal 1, in `server/`: `python -m uvicorn main:app --host 127.0.0.1 --port 8000`. Wait about 10 s (CLIP loads).
3. Open `http://127.0.0.1:8000` (serves the built frontend). To edit the frontend live instead: terminal 2, in `client/`: `npm run dev`, open `http://localhost:5173`. After edits, `npm run build` to refresh what the server serves.

## Not done yet (in order)
1. Open the app and say what to change (colours, wording, layout).
2. **Partner and phone access (chosen: Tailscale).** Steps (check against Tailscale's current docs): install Tailscale on this PC and on both phones; sign in; share this PC with the partner's Tailscale account; run `tailscale serve --bg 8000` to get a private `https://<pc-name>.<tailnet>.ts.net` address; set `COOKIE_SECURE=1` in `.env` and restart. The PC must be on and the server running. Then on each phone: open the address, "Add to Home Screen".
3. Security review pass before the partner uses it (auth is new to the user: read `auth.py` line by line).

## Found by testing (2026-10-02)
Your Chelsea boot photo returned mostly loafers. Cause and fix are in [[limits]]: the user now picks the shoe kind before searching. 13 automated tests pass.

## Flags
- **OneDrive:** `Desktop` is synced to OneDrive, so `.env` (hashed codes + secret key) and `server/storage/` (history, query thumbnails) sync to the cloud. The scraped photos already live there. Fine for a personal tool, but your scraping rule says photos must not go in shared places: do not share the OneDrive folder.
- Prices are shown with ৳ (assumed BDT: the sites are Bangladeshi shops). The databases do not store a currency.
- Match quality is moderate (type match 50% in the earlier CLIP tests). The UI says "asking prices, not sales" and warns when fewer than about 10 comparables.
- Lockout counters reset when the server restarts; fine for 2 users on a private network.

## Ideas for later (not now)
Key filter (type/material) before ranking; an image-similarity price rail chart; more sites; real hosting (needs a proper auth + security review first).

## Related
[[how-to-run]] · [[todo]] · [[tailscale-setup]] · [[security]] · [[limits]] · [[tests]] · [[architecture]]
