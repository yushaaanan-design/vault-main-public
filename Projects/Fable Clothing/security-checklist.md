---
up: "[[Fable Clothing]]"
---
# Security checklist — Fable Clothing

Working checklist for a store that takes real money and real home addresses. Tick items as they land. Visual version: [[security-workflow.canvas]]. Route-by-route reference: [[backend-architecture]].

A full security audit was run on 2026-09-28. Six real issues were found; the five that could be fixed in code were fixed and re-tested the same day (see "Fixed on 2026-09-28" at the bottom). Nothing outstanding is exploitable today, because no payment gateway is connected. Customer logins were added on 2026-09-29 with their own review (section 1b).

Status key: **[x]** done and verified · **[ ]** not done · **[~]** partly done, see the note.

## 1. Admin access
- [x] Password is never stored in plain text (scrypt with a per-install random salt, `server/src/lib/auth.ts`).
- [x] Login compares hashes in constant time (`timingSafeEqual`), so a wrong password cannot be guessed by timing.
- [x] Session is a signed token in an **httpOnly** cookie, so page scripts can never read it.
- [x] Session secret is keyed to the password hash, so **changing the password signs out every device**.
- [x] Login is rate limited (5 failed attempts per IP per 15 minutes) and counts the attempt *before* checking, so parallel guessing cannot slip past.
- [x] Every `/api/admin/*` route requires the session; only login and logout are open.
- [x] Every admin write also checks the `Origin` header (CSRF guard). A malicious site cannot make your browser change stock or orders.
- [x] Admin responses are `Cache-Control: no-store`, so customer data is not left in a shared cache.
- [ ] **Before launch:** run `npm run admin:password` in `server/` and set a real password (10+ characters). Until then a random dev password sits in `server/data/ADMIN_DEV_PASSWORD.txt`.
- [ ] **Before launch:** delete `server/data/ADMIN_DEV_PASSWORD.txt` and `admin-dev.json` from the production machine.
- [ ] **Before launch:** set `NODE_ENV=production` so the cookie is marked `Secure` (HTTPS only) and the dev password path is disabled.
- [ ] **Before launch:** set `ADMIN_SESSION_SECRET` to a long random value in the production environment.
- [ ] Never open the admin panel on a shared or public computer; log out when finished.

## 1b. Customer accounts (added 2026-09-29, commit `79b7852`)
Optional phone + password accounts. Guest checkout unchanged. Code: `server/src/lib/customerAuth.ts`, `server/src/routes/account.ts`, `server/src/routes/admin/customers.ts`.
- [x] Passwords hashed with scrypt (same as admin), 8 to 200 characters (the cap stops giant inputs burning CPU).
- [x] Separate from admin in every way: own cookie (`fable_customer`), own secret, typed token. Verified: a customer token is rejected on every admin route.
- [x] Token signed with the secret plus the customer's password hash, so a password change or account deletion signs out every device. Verified: a tampered token (extended expiry) is rejected.
- [x] Login rate limited per IP (10 / 15 min) **and** per phone (10 / 15 min), counted before checking.
- [x] One error for wrong password and unknown phone, and scrypt runs against a dummy hash for unknown phones, so neither the message nor the timing reveals which numbers have accounts. (Sign-up does say "already registered", which is unavoidable; it is limited to 5 per hour per IP.)
- [x] Phones are **not verified** (no SMS provider). So an account never claims guest orders by phone. Only orders placed while signed in link to it. Verified: a guest order with the same phone did not appear on the account.
- [x] A customer's order list is filtered by the session's own id, never an id from the request. Verified: account B sees none of account A's orders.
- [x] Password hashes never leave the server, including in admin responses.
- [x] Account routes check `Origin` (CSRF) and send `Cache-Control: no-store`.
- [x] Delete account: customer (password required) or admin (on request). Orders stay for delivery and exchanges but are unlinked.
- [ ] **Before launch:** set `CUSTOMER_SESSION_SECRET` (32+ random characters, different from the admin one). Without it, accounts are switched off in production.
- [ ] **No password reset yet.** A customer who forgets it has to message the shop; the admin can delete the account so they can sign up again. Needs SMS or email to fix properly.
- [ ] Someone could register a phone number that is not theirs and block the real owner from signing up. Fix needs SMS verification.
- [ ] Rate limits are in-memory: fine for one server, must move to a shared store if there is ever more than one.

## 2. Money
- [x] The server prices every order itself. A tampered price in the request is ignored (verified: an order sent with `price: 1` was still charged ৳850).
- [x] Discounts are validated server side (active, not expired, under its usage limit) and cannot exceed the subtotal.
- [x] Delivery is computed from the delivery zone, never from the client. **Bug found and fixed 2026-09-28:** the zone was not reaching the pricing function, so every order shipped free. Re-verified: Dhaka order ৳850 + ৳80 = ৳930.
- [x] Stock is checked, then decremented, inside one write, so two shoppers cannot buy the last piece at once.
- [x] Placing an order is rate limited (6 per 10 minutes per connection). Without this, a script could have drained every size to zero in seconds and shown the whole store as sold out.
- [x] Quantities are capped (10 per line) and duplicate lines for one variant are merged, so the cap cannot be bypassed.
- [ ] **When payments go live:** verify each provider's signature or checksum on the raw request body before trusting any "payment succeeded" callback.
- [ ] **When payments go live:** make callbacks idempotent (a repeated callback must not double-confirm or double-ship an order).
- [ ] **When payments go live:** never mark an order paid from a redirect the browser controls; only from the verified server callback.

## 3. Customer data
- [x] Public order lookups need the order number **and** the matching phone number.
- [x] Public order data hides the full phone and the street address; the confirmation page masks the phone (`017XXXXXX78`).
- [x] Order tracking is rate limited (20 per 10 minutes per IP) so order numbers cannot be walked through in bulk.
- [x] Contact and drop-list forms are rate limited (10 per 10 minutes per IP).
- [ ] Decide how long orders are kept, and who else ever sees the exported address data.
- [ ] Privacy page currently says what is collected; confirm it matches reality before launch.

## 4. Input and uploads
- [x] Every field is validated on the server (length, format, allowed values); phone must be a real Bangladeshi mobile.
- [x] Admin updates use a whitelist of editable fields, so nobody can inject unexpected keys into a record.
- [x] Uploaded images are checked by their actual file signature (JPEG, PNG, WebP), not by the name or the claimed type, capped at 6 MB, and stored under a random filename.
- [x] Uploads are served with `X-Content-Type-Options: nosniff`, so a disguised file cannot run as a script.
- [x] React escapes all text by default, and nothing in the site renders raw HTML from data.

## 5. Infrastructure and secrets
- [x] `.env`, `server/data/`, and `server/uploads/` are git-ignored; no secret is committed.
- [x] The server hides its `X-Powered-By` header and returns clean JSON errors with no stack traces.
- [x] CORS allows only the configured storefront origin, with credentials.
- [ ] **Before launch:** the site must be served over HTTPS end to end (Vercel and Render do this by default).
- [ ] **Before launch:** move uploads off local disk (Hostinger over SFTP, or object storage) so a redeploy cannot lose product photos.
- [ ] **Before launch:** back up `server/data/store.json` on a schedule. It is currently the only copy of every order.
- [ ] **Database phase:** the JSON store is single-process only. Moving to Postgres is required before running more than one server instance.

## 6. Routine habits
- [ ] Run `npm audit` in `client/` and `server/` before each deploy.
- [ ] Never paste real credentials into chat, notes, or screenshots.
- [ ] Review the order list for anything odd (impossible totals, repeated addresses) once a week.
- [ ] Keep the admin password in a password manager, not in a note.

## Fixed on 2026-09-28 (found by the audit, fixed and re-tested)
| What was wrong | Why it mattered | Now |
|---|---|---|
| Delivery was dropped from the order total | Every order shipped free. ৳80 to ৳130 lost per order | Verified: a ৳850 Dhaka order now totals ৳930 |
| Placing an order had no rate limit | A script could zero out all stock in seconds, and burn every discount code to its limit | 6 per 10 minutes per connection. Verified: the 7th attempt is refused |
| Order numbers were 6 digits | Someone who knew a customer's phone could guess their order number and read their name, area and items | Now 8 digits, a hundred times harder to guess |
| The generated dev admin password could activate on the real server | A password file would sit on the server, and the session cookie would allow plain HTTP | Now needs an explicit `ALLOW_DEV_ADMIN=1`. Verified: without it, admin login refuses to work at all |
| Session cookie was only marked HTTPS-only when `NODE_ENV` was set | One forgotten setting meant the admin session could be read off the wire | Now HTTPS-only for anything that is not localhost |
| Login lockout counted per address only | Rotating addresses made the lockout meaningless | Added a shared counter: 30 failures in 15 minutes locks login for everyone until it clears |

Two smaller issues were left as they are, on purpose:
- **An admin session cannot be cancelled remotely.** A stolen session lasts up to 7 days. Changing the password ends every session, which is the intended remedy.
- **Renaming a colour resets that colour's stock to zero.** Not an attack, but easy to trip over. Re-enter the stock numbers after renaming a colour, or add the new colour and archive the old one.

## Known accepted risks (deliberate, revisit later)
- The store is one JSON file on one server. Accepted while the catalogue and order volume are small; the swap to Postgres is planned.
- Customer accounts are not built yet, so there is no customer login to attack. Order tracking by number plus phone is the only lookup.
- Payment gateways are not connected; orders are confirmed by phone. Nothing charges a card yet.
