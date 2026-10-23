---
up: "[[Marketlens]]"
---
# API contract

All routes need the login cookie except `health` and `login`. **POST/DELETE need header `X-Requested-With: marketlens`.** Errors are `{"detail": "message"}` with a 4xx status.

| Method + URL | Body / params | Returns |
|---|---|---|
| GET `/api/health` | | `{ok: true}` (no login) |
| POST `/api/auth/login` | `{name, code}` | `{name}` + sets cookie. 401 wrong, 429 locked |
| POST `/api/auth/logout` | | `{ok}` |
| GET `/api/auth/me` | | `{name}` or 401 |
| POST `/api/lookup` | multipart `file` (image, max 8 MB), optional `text` (name, type or product code, max 200), optional `group` (`""` = auto from your words, `any`, `boot`, `loafer`, `formal`, `sandal`, `sneaker`, `belt`, `wallet`, `bag`: only compare with that kind), optional `redo_of` (id of the lookup this replaces) | `{id, results[], package, kind, note}` |
| POST `/api/search` | `{q}` (2 to 200 chars): exact names and codes first, then CLIP | `{id, results[], package, kind, note}` |
| GET `/api/filters` | | `{sites, brands, types, kinds, price_min, price_max}` |
| GET `/api/products` | `q, site, brand, type, min_price, max_price, sort(name/price_asc/price_desc/popular), page` | `{total, page, page_size, items[]}` (24 per page) |
| GET `/api/products/{site}/{id}` | | full product + `photos[]` |
| GET `/api/products/{site}/{id}/similar` | | `{results[], package}` |
| GET `/api/photo/{row}` | | the image file |
| GET `/api/history` | | last 100 lookups of this user |
| GET `/api/history/{id}` | | one lookup (404 if not yours) |
| GET `/api/history/{id}/thumb` | | thumbnail of the query photo |
| DELETE `/api/history/{id}` | | `{ok}` |

**result** = `{words (your words found in its name/type/code), key, site, site_label, id, name, brand, type, colour, price, score, photo, ...}`. `score` is cosine similarity, 1 = identical look.
**package** = `{count, low, median, high, typical_low, typical_high, prices[], note}`; `note` is "OK" or a weak-range warning (fewer than about 10 comparables).

## Related
Server side: [[server-main]], [[server-auth]]. Client side: [[client-api]]. Safety rules: [[security]]. Checked by [[tests]].
