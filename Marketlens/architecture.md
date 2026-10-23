---
up: "[[Marketlens]]"
---
# Architecture: Marketlens

See also `architecture.canvas` (picture of the same thing).

## The three layers
```
phone / PC browser  --HTTPS-->  FastAPI server (server/)  --reads-->  Web Scraping data (read-only)
   React app (client/)            login, routes, CLIP                  5 databases + photos + CLIP index
                                  own files: history.db, thumbnails
```
Tailscale sits between the phone and the server: a private network, so the server is never on the public internet.

## Server files (`server/`), one job each
| File | Job |
|---|---|
| `config.py` | All settings from `.env`; crashes at start with a clear message if something is missing |
| `auth.py` | Access-code login (scrypt hash), signed httpOnly cookie, `current_user()` and `require_header()` guards |
| `catalog.py` | Loads the 1,394 products + latest price into memory (read-only); `package()` = low/median/high + confidence note |
| `engine.py` | CLIP: photo or text to 512 numbers, find the closest stored photos; same model setting as `clip_index.py` |
| `history.py` | Saved lookups in `storage/history.db`; every query filtered by user |
| `main.py` | All routes (see [[api-contract]]), upload checks, serves the built frontend |
| `tools/new_code.py` | Makes an access code for one person |
| `tests/test_api.py` | The 7 checks |

## Client files (`client/src/`)
`App.jsx` (login check, tabs, product popup) · `api.js` (every server call in one wrapper) · `Login`, `Lookup` (photo), `TextSearch`, `Browse`, `HistoryPage`, `ProductModal`, `Results` (price package + cards) · `styles.css` (one accent variable, `--accent`).
Style follows the vault notes: plain CSS, manual loading/error/data state, server-confirmed updates, `request()` wrapper.

## One lookup, step by step
1. Browser sends the photo (`POST /api/lookup`) with the cookie and the `X-Requested-With` header.
2. Server checks cookie, checks size (8 MB) and that it really is an image.
3. CLIP turns it into 512 numbers; one multiply scores it against all 7,428 stored photos.
4. Best photo per product is kept; the top 12 products get their price from memory.
5. `package()` computes low/median/high and the typical range; the result is saved to history and returned.

## Security decisions (flagged, since auth is new)
- **No public exposure:** server listens on `127.0.0.1` only; Tailscale gives partner access privately.
- **Access codes, not passwords:** random 12 characters, only a scrypt hash is stored in `.env`; compared in constant time; 5 wrong tries lock that name for 5 minutes; unknown names cost the same time as known ones.
- **Cookie:** httpOnly (JavaScript cannot read it), SameSite=Strict, Secure when HTTPS, signed with `SECRET_KEY`, 7 days, dies if the user's code is removed.
- **CSRF:** SameSite=Strict plus a required custom header on every POST/DELETE.
- **Photos by row number only:** `/api/photo/{row}` never takes a path from the client, so no path traversal.
- **History scoped per user** in the query itself, so guessing ids returns "not found".
- **Uploads:** size limit, image verification, pixel limit, random server-chosen file names.
- **Read-only data:** scraped databases are opened `mode=ro`.
- **Not done:** HTTPS is Tailscale's job, not ours; no rate limit besides login lockout; no audit log. Fine for 2 trusted people.

## Why these choices
- Python backend: CLIP and the data are already Python; Express would need a second process.
- In-memory catalogue and a vectors file instead of a vector database: 7,428 rows multiply in milliseconds.
- One server serves the built frontend, so there is one thing to run and no CORS.

## Related notes
Server: [[server-main]], [[server-auth]], [[server-engine]], [[server-catalog]], [[server-history]]. Screens: [[client-app]], [[client-screens]], [[client-api]]. Also [[data-flow]], [[security]], [[decisions]], [[tests]], [[limits]], [[api-contract]].
