---
up: "[[Fable Clothing]]"
---
# Features — Fable Clothing

Running list, separate from [[PRD]]. Add to this as new needs come up — don't wait for a "review pass" to update it.

## Confirmed (in PRD)
- [x] Storefront: browse products, view color variants
- [x] Per-variant stock display (in stock / coming soon / sold out)
- [x] Manual coming-soon / sold-out override (manufactured demand, independent of real stock)
- [ ] Guest checkout (email required) — form built, email currently optional not required, confirm before DB phase
- [ ] Optional account creation/login — stub page only, no Clerk yet
- [ ] Payments: bKash — checkout UI + mock branch built, no real gateway
- [ ] Payments: Nagad — same as above
- [ ] Payments: SSLCommerz — same as above
- [x] Payments: Cash on Delivery (mock — confirms instantly, no DB/persistence yet)
- [ ] Automated Pathao courier handoff on order confirmation
- [x] Admin panel: add/edit products & variants (mock form, no persistence yet)
- [ ] Admin panel: adjust stock
- [x] Admin panel: view/process orders (mock data, status update works in-memory)
- [x] Admin panel: toggle coming-soon/sold-out (in Product Form)
- [ ] Exchange policy page (no refunds)

## Approved additions (confirmed this session)
- [x] Discount/coupon codes — admin list+create UI built (mock)
- [ ] Size chart per product
- [x] Low-stock admin alert — mock list built

## Approved additions (round 2 — design pass)
- [x] Order notes field at checkout
- [x] Trust badges/policy links at checkout (one-line trust text, expand later)
- [ ] WhatsApp/SMS order confirmation (in addition to email + on-screen page — all three required)
- [x] Add to Cart **and** Buy Now as separate buttons on PDP
- [ ] Trust line under primary CTA (e.g. "Trusted by X customers, cash on delivery available") — add once real order numbers exist
- [ ] Payment method icons shown in cart/checkout footer

## Approved additions (round 3 — admin uploads + hover interaction)
- [ ] Admin product image upload — form has a plain file input, sharp+SFTP pipeline not built
- [x] Product card hover crossfade (front image → reveal/silhouette image) — built, using placeholder images

## Approved additions (round 4 — analytics, this session)
- [ ] Google Analytics 4 — decided, not yet embedded (need tracking ID)
- [ ] Microsoft Clarity (heatmaps/click tracking/session replay) — decided, not yet embedded (need project ID). Replaces any custom mouse-tracking code.

## Identified gaps (not yet built into PRD requirements — confirm scope, then check off)
- [x] Shopping cart (multi-item) vs. single buy-now — built both, cart is real multi-item, Buy Now skips it
- [ ] Meta Pixel / ad conversion tracking (for the Instagram/Facebook ad spend)
- [ ] Privacy policy page
- [ ] Terms of service page
- [x] Category navigation (Henleys / Tees / Hoodies / Pants) — built 2026-09-26 after the user reversed the minimal-nav lock (see [[design]]). Accessories not added (no products in that category yet).
- [x] Shipping cost model — mechanism locked (see [[architecture]]), not yet shown in checkout UI total

## Built 2026-09-26 (homepage + scroll pass, see [[homepage-sections.canvas]])
- [x] Homepage sections below the hero: The Edit, Category Tiles, Scarcity Strip, Brand Statement, Trust Strip marquee, Instagram DM CTA
- [x] Scarcity Strip sticky-stack scroll effect (the one GSAP moment)
- [x] Scroll-reveal animations (IntersectionObserver), reduced-motion safe
- [x] Mobile menu (slide-in panel), transparent-over-hero header
- [x] Site-wide footer with oversized wordmark
- [x] Shop skeleton loading state (the CSS existed earlier but was never wired until today; an earlier note claiming it was done was wrong)
- [ ] Real Instagram URL for the DM button (placeholder now)
- [ ] Real product photography (hand-picked picsum placeholders now)

## Deferred (explicitly not v1)
- Refund flow (exchanges only)
- Punjabi product line
- n8n integration
- TypeScript on frontend (backend only for now)
- Database (Prisma + Neon) — frontend/backend structure intentionally built against mock data first, DB phase comes after
- Real admin auth (bcrypt + httpOnly session) — mock sessionStorage gate only, for now
- Stock race-condition handling — deferred to DB-hardening pass, see [[backend-architecture]]
- Payment webhook idempotency, real order numbers — deferred to DB phase
