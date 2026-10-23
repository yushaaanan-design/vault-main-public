# State

**Read [[CONTEXT]] for the original handoff, then this file.** Rewritten 2026-09-28, mid-flight. Full detail: [[design-system]], [[security-checklist]], [[security-workflow.canvas]], [[code-map]], and `server/API.md` in the repo.

> [!warning] Work in progress right now
> A large restructure is **in flight** as of this writing. The committed code (two commits on `main`) is the finished drop-based site. The catalogue rework described below is being built and is **not committed yet**. If you are resuming cold, read "Where the restructure stands" before touching anything.

## Run it
```
cd server && npm run dev     # API on http://localhost:4000
cd client && npm run dev     # site on http://localhost:5173
```
Dev admin password: `server/data/ADMIN_DEV_PASSWORD.txt` (git-ignored). `npm run seed` in `server/` resets the store including the sample orders that make the admin dashboard worth looking at.

## What is finished and committed
The whole site was rebuilt on 2026-09-28 against the founders' 94-page written critique (the "brain dump" PDF). Two commits:
1. **The rebuild**: new visual world, real backend, real admin auth, 11 admin screens, 38 stand-in photographs.
2. **Design review fixes**: draft specs now flagged on the storefront, the lookbook no longer implies customer photos, the badge moved off the product heading, low stock removed from browsing, stamped mark on the title page, trust line at the first price, an editorial band on Shop, one ribbon weight.

Verified: every route renders with no console errors, no horizontal overflow, one h1, at 1440 and 390. Full purchase flow completes. All admin screens work. `impeccable detect` 0 findings. Server tests 8/8.

**Six security issues were found and fixed**, including one that would have cost real money: the delivery charge was dropped from every order total, so every order shipped free. Details in [[security-checklist]].

## Where the restructure stands (2026-09-28, in flight)
The owner gave three rounds of feedback after seeing the site:

**Round 1, decided and being built:**
- **Drops are wrong for this business.** "If you do drops, then it would be very difficult. I need a more or less complete website with the catalogs." The drop model is being removed entirely.
- **New categories**: Formal Trousers, Tailored Trousers, Tailored Shirts, Henleys, Quarter Zips, plus Accessories (all coming soon). 3 to 4 pieces per category, so roughly 16 to 20 products.
- **Navigation becomes** Shop (dropdown of categories) · New In · Our Story. `/drop/:number` and `/next-drop` are deleted; `/new-in` is added.
- **"Too black."** The owner: "the entire point of Fable was it shouldn't be that black." Decision taken: **stay dark, but lift it**. Done already (see below).
- Ringer Tee and Chestnut Hoodie have no home in the new categories and are being **archived, not deleted**.

**Round 2:** photography should be aesthetic and aspirational, models visibly fit with some muscle mass, appealing to young men. No gym settings, no shirtless shots: menswear shot as menswear, on a good frame.

**Round 3 (the last feedback before the owner stepped away):**
- **Images load late and badly.** Compress them.
- **Sections feel unfulfilled**, large parts of the screen sit empty. "The screen should be fulfilling." A design review independently found the same: three dead vertical bands of 250 to 350px on the desktop home page.

### Already done by the main session (uncommitted)
- **Palette lifted off pure black.** `--cloth` is now `#17150F` warm dark cloth, with real steps up through `--cloth-2/3/4` and a `--cloth-deep` kept for hero letterboxing and the footer. Ink raised to `#F3EADA`. A slow warm radial wash plus the woven texture means the page is never one flat tone. The header, scrims, search overlay and sold-out badge no longer hardcode black.
- **Type rebalanced.** Libre Caslon Display is cut for large sizes, so tracking and leading now tighten as the size grows (h1 -0.022em, down to h4 -0.004em). The whole scale stepped down slightly so section headings stop competing with page titles.
- **Image loading rewritten.** `components/ui/Photo.jsx` no longer relies on native lazy loading, which only fetches when an image is nearly on screen. It now uses an IntersectionObserver with a 150% margin, so photographs start downloading about two screens early and are ready on arrival. The loading ground is a lifted warm tone rather than near-black, and the fade is shorter.

### Running as parallel agents (check their output before duplicating work)
1. **Photography**: sourcing 25 to 30 new licensed photos for shirts, quarter zips, formal trousers, accessories and more lifestyle shots, into `client/public/images/stock/`, appending to `SOURCES.json` with a new `dominantTone` field. Briefed on the fit-model direction and told to prefer light and mid-toned frames.
2. **Backend catalogue**: rewriting `server/src/data/seed.ts`, the store, and `API.md` for the new categories and ~20 products, removing drops from the data model and the admin API.
3. **Frontend restructure**: deleting the drop pages, rebuilding home as a catalogue home, new navigation, `/new-in`, real category pages, **and fixing the empty-space problem** on every page at 1440 and 1920.
4. **Competitor functional teardown**: scraping Maneel Club and Get The Juice for the working components they ship (variant behaviour, cart and checkout mechanics, search and filters, trust and tracking, marketing plumbing, platform and apps), writing `Projects/Web Design/design-references/functional-components.md` with a ranked "build next" list and questions for the owner.

### Still to do after those land
- **Compress the photographs.** `sharp` is being installed in the session scratchpad. Resize to about 1400px on the long edge at quality ~72, in place, same filenames, once the photo agent stops writing to that folder. Currently 38 files at 8.7MB; expect roughly a third of that.
- Swap the home frontispiece for one of the lighter new photographs: the current hero is a near-black frame and reads as a hole now that the page around it is warm.
- Re-run the QA capture (`.impeccable/qa-capture.js` via `playwright-cli run-code`) at 1440 and 390, check for dead bands, then commit.
- `CatalogContext` still exposes `drops`, `currentDrop`, `nextDrop`, `inDrop`, `dropByNumber`, `plateNumber`. The main session owns that file and must strip the drop parts once the frontend agent reports what it needs.

## Next after the restructure
1. Founders review the catalogue version.
2. Replace the drafts: real specs (every product is flagged `specsDraft`), real photography, logo, tagline, contact details, delivery prices.
3. Before launch: real admin password, `NODE_ENV=production` plus a session secret, back up `store.json`, move uploads off local disk. Full list in [[security-checklist]].
4. Database phase: swap the JSON store for Prisma + Neon. Only `server/src/lib/store.ts` changes.
5. Payments and courier once sandbox credentials arrive. Checkout is honest about test mode today.
6. GA4 and Clarity need the founders' tracking IDs.

## Latest (2026-09-29): customer accounts done, in Opus
Commits after Round 4: `c5e006f` nav dropdown scroll + cart drawer, `c842570` revert of an accidental nodemailer install, `dd3708c` / `c8e9b36` size guide always visible under the sizes + real quantity stepper on the product page, `a734568` size guide moved into the dark palette, `79b7852` **optional customer accounts + admin Customers screen**.

**Decisions taken by the owner (2026-09-29):**
- Customer accounts use **our own auth** (extends the admin's scrypt + signed cookie), **not Clerk**. Login is phone + password. No new dependencies.
- **Payments deferred** until sandbox credentials exist. COD works; the others stay in test mode.

**Accounts, how it works:** see [[security-checklist]] section 1b. Account page at `/account` (sign in / create account; signed in shows the account's orders). Checkout prefills from the account. Admin: Customers in the sidebar, detail page shows account orders plus (admin-only) guest orders with the same phone. Order detail says "Placed while signed in" or "Guest checkout".

**Dev note:** three Vite servers are running on 5173, 5174, 5175 (all this same folder). Use **localhost:5173**: the API only trusts that origin (`CLIENT_ORIGIN`), so sign-in and admin login fail with "origin not allowed" on the other ports.

**Still open, Sonnet-tier:** order confirmation email (#34), contact form emailing the owner (#33) (both need an email provider decision; nodemailer install was declined once), Gurkha trousers family (#28), server-side drop routes cleanup. **Needs the owner:** shirt hover-swap (#12), "more options" (#13), real Our Story text (#29), real prices (#21). **Opus, blocked:** payments (need sandbox keys), password reset (needs SMS or email).

## Round 4 fixes landed (2026-09-28), commit `326598a`
Checkpoint `v1-baseline` (`0caed82`) was tagged first — see [[checkpoints]] — then these landed, in Sonnet:
- Drop model fully removed from the client (routes, pages, `CatalogContext` fields, every `dropUrl`/`currentDrop`/`nextDrop` reference across 12 files). Admin's Drops screen is now **Waitlist** — notify-list signups only, drop CRUD removed.
- `/new-in` route added; header/mobile nav gained **Home**, **All Pieces**, **New In** (none existed before — item #1/#30).
- Size chart (#4/#16/#11): `FitGuide` and its seed measurement data already existed but were only ever wired into the single-product category landing, never `/product/:slug`. Now on every product page.
- Header no longer hides on scroll (#15) — it was already `position: sticky`, the JS headroom effect was the only thing hiding it; removed.
- Footer's "Reach out to us" (#6) now only renders on the home page; colophon nav stays everywhere else.
- Product page no longer force-scrolls to top when opened from a category grid (#23) — exempted `/product/*` from the global scroll-to-top so the shared-element photo transition doesn't snap.
- Trousers scroll trap (#14): the family filter bar (`.shop-keys`, used by both Shop and Category) was missing `data-lenis-prevent`, so Lenis's global smooth-scroll fought the horizontal scrollbar under the cursor. Fixed with `data-lenis-prevent` + `overscroll-behavior-x: contain`, matching the pattern already used elsewhere (cart body, size-chart table).
- Cart multi-item/multi-size (#19): already worked — cart lines are keyed by `variantId`, so different sizes/colours and different products each get their own line. Not a bug, just untested in the walkthrough.
- Verified: client + server builds clean, 9/9 server tests pass, all routes 200 on the running dev servers.

**Still open from Round 4, not done in this pass:**
- #8 (quarter zip product-link verification), #12 (shirt hover-swap decision), #13 ("more options" — needs clarification), #21 (pricing, deferred on purpose), #28 (Gurkha trousers family), #29 (Our Story real content), #31/#32 (customer accounts + admin Customers screen — Opus), #33/#34 (order-confirmation email; inbound contact email already works via the existing `ContactForm`, worth re-checking live).
- Server-side drop routes and `Product.dropId`/`Store.drops` are now unused (empty array, dead admin UI) but were left in place — harmless and type-safe, just not deleted. Full removal touches `shapes.ts`, `store.ts`, `seed.ts`, `routes/admin/catalog.ts`.

## Round 4: owner's live walkthrough (2026-09-28), not yet built
The owner walked the running site (`localhost:5175` client, `localhost:4000` server, both dev servers) tab by tab and dictated problems. Nothing below is fixed yet. Model plan: **Sonnet does the bulk of this list; Opus specifically reviews/implements the two auth-and-payments items (#31 customer accounts, and real payment integration when it comes), per the standing CLAUDE.md rule that auth/payments/data-handling get an explicit review pass.**

**Confirmed working / liked, no change needed:** Home page content, Henleys category + hover, product page fabric/fit/construction sections, Quarter Zips category page, Quarter Zip product photos (2-photo hover), "More from Fable" section, Shirts category size guide, add-to-cart not auto-redirecting to cart, checkout page, nav→Henleys anchor scroll, Decal shirt (chalk/cream), Recto shirt (parchment), trousers color picker, Octavo trousers.

**Bugs / missing features, numbered as tracked in conversation:**
1. No "Home" tab/link in the main nav.
4/16. No size chart (measurements table) on any product page — only size buttons (S/M/L/etc). Confirmed on Henley and Quarter Zip pages. Was explicitly deferred earlier ("we'll add a sizing chart later") — now wanted.
6. Footer "Reach out to us" CTA repeats on every single page — should not.
8. Open question, needs verification: do all Quarter Zip product cards link to distinct products, or do several point at the same one?
11. Size guide should be on every product page, not just Shirts.
12. Open design question (not decided): is the hover image-swap on shirt family cards (Decal/Recto/etc.) wanted or necessary? Discuss before touching.
13. Unclear ask, needs clarification from owner: "more options" — more product variants, or more shirt families?
14. Trousers individual product page: scroll gets trapped/can't scroll the page when hovering the product image/gallery area.
15. Header nav is not sticky/fixed — disappears after scrolling instead of staying pinned.
19. Cart needs to support adding multiple different items, and multiple different sizes of the same item, in one cart.
21. Quarter Zip pricing looks too cheap — known placeholder, fix later, no action now.
23. Navigating from a category page to a product page resets scroll to the top of the new page — wanted: don't jump to top, keep it contextual/relative to where the user was.
28. Feature request: add a **Gurkha trousers** family (new product family, not currently in the catalogue).
30. "All Pieces" (`/shop`, the full catalogue) needs its own separate nav entry, not just reachable through a category dropdown.
31. Customer accounts (sign up / sign in, optional — guest checkout stays) — locked requirement from original planning, never built. **Opus review item.**
32. Admin needs a "Customers" screen: list of registered accounts, click into one for their order history (same Order data, filtered by `customerId` instead of guest phone/email). Doesn't exist yet.
33. Customers need a working inbound email channel ("Reach out to us" should actually send, not be a dead link/mailto) — separate from transactional order-confirmation email.
34. Order confirmation email: customer should get an automated email after checkout, alongside the existing on-screen confirmation. WhatsApp/SMS is the third planned channel, also not built.

**Also still open from the in-flight restructure (see "Where the restructure stands" above), not new but not yet resolved:**
- Drop model still not fully removed: `App.jsx` still routes `/drop/:number` and `/next-drop`; `Drop.jsx`, `NextDrop.jsx`, `CurrentDrop.jsx`, `NextDropFeature.jsx`, admin `Drops.jsx` all still exist and are wired in; no `/new-in` route; `CatalogContext` still exposes `drops`/`currentDrop`/`nextDrop`/`inDrop`/`dropByNumber`/`plateNumber`.
- 185 modified/untracked files, nothing committed since the two rebuild commits (`062e26a`, `4d5b38d`).

## Open questions for the owner
- The tagline (draft in use: "Everyday menswear, made with intention.").
- Real specs and measurements. A sizing chart was explicitly deferred: "we'll add a sizing chart later."
- Instagram handle, WhatsApp, phone, email, address.
- Real delivery prices and free-delivery threshold (placeholders: free over ৳1,500, ৳80 Dhaka, ৳130 outside).
- The exchange window is written as 3 days.
- Whether to keep Tees and Hoodies as categories later (their two products are archived, not lost).

## 2026-10-21 PIVOT: clothing dropped, site becomes SHOES (brand stays "Blue by Fable")
Owner decisions (answers to my 12 questions):
- Clothing removed completely (too complicated now). Site is rebuilt as a shoe catalogue; brand name on site stays **Blue by Fable** (Instagram page may be "Shoes by Fable").
- Catalogue comes from ~6 catalogue images the owner sends; **Claude identifies the shoes** from them (owner has no time). Premium category structure like the Henleys/Quarter Zips setup, but per shoe type.
- Supplier-bought. Prices: owner sets later; keep high-end placeholder prices for now.
- Sizes: S / M / L for now; owner will supply a foot-length size chart table later.
- All genuine leather.
- Photos: owner sends links; otherwise find good placeholder photos (ideally a foot/lower leg wearing the shoe, not full person) or generate. Competitor/web photos are placeholders only (scraping-rules: not for live site).
- Everything is "coming soon" (no live selling yet). Payments: COD, bKash/Nagad/SSLCommerz as before. NO exchange window (remove the 3-day exchange copy).
- Theme stays the same, small tweaks allowed; Claude to ask questions while rebuilding.
- Opus to do the rebuild; infographic of plan first (global rule).
| 2026-10-21 | Shoe pivot step A: 3 albums downloaded, 20 shoes identified, shoe-list.html for owner review; status line installed (C:\dev\claude-statusline) | done |
| 2026-10-21 | Demo shoe site built (commit above, tag pre-shoes = before): 19 shoes / 4 categories, coming soon + Notify me, Pexels cinematic placeholders, exchange copy removed, tests 9/9, tsc + vite build clean. NOT done: visual QA at 1440/390, server/API.md update | done, QA pending |
| 2026-10-22 | QA + docs done (uncommitted): Home showed 5 empty clothing category tiles -> now uses `liveCategories`; home overflowed 23px at 390 (feature grid auto column) -> `minmax(0,1fr)`; all 8 routes 0 overflow, 0 console errors at 390; API.md examples now shoes, drops marked unused. Build clean, tests 9/9. playwright-cli is NOT installed: QA used headless Chrome + a CDP script. **Demo site is finished; next needs the owner:** real photos, prices, foot-length size chart, contact details, then commit + founders review. | done |
| 2026-10-22 | Tagged `preview-v1` (commit 7e74b24). Shared via Cloudflare quick tunnel (C:\dev\tools\cloudflared.exe, link https://humans-sampling-ccd-snake.trycloudflare.com, works only while PC + both dev servers + tunnel run; URL changes on restart: then update CLIENT_ORIGIN in server/.env and restart the API). /admin and /api/admin return 404 through the tunnel (vite.config.js tunnelGuard). Test waitlist entry 01700000099 added while testing. | done |
