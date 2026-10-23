---
up: "[[Fable Clothing]]"
---
# Architecture — Fable Clothing

## Components
```
[React/Vite storefront] --Vercel--
        |  REST calls
        v
[Express + TypeScript API] --Render-- --> [PostgreSQL via Prisma, hosted on Neon]
        |
        |-- Auth: Clerk (customer accounts) + custom session auth (admin)
        |-- Payments: bKash / Nagad / SSLCommerz (sandbox now) / COD
        |-- Shipping: Pathao merchant API (automated handoff on order creation)
        |
[Admin panel] -- same Express API, separate auth/role, same React app (protected routes) or a separate small app if it's simpler to build fast
        |
        |-- Image hosting: Hostinger (already paid for) — admin uploads pushed there via SFTP from the backend, not stored on Render/Neon
```

Full backend detail (every route, middleware, env var, webhook handling, deployment) — not duplicated here: [[backend-architecture]] / [[backend-architecture.canvas]].

## Page structure & navigation flow
Full button-by-button detail lives in two synced places, not duplicated here:
- [[site-map.canvas]] — visual, every header element/button/page as its own node, every click as a labeled arrow, including the payment-gateway success/fail branch and the admin add/edit flows.
- [[site-map]] — the same structure as tables, one per screen, for quick scanning without opening Obsidian's canvas view.

Summary: minimal customer nav (Home / Shop / Coming Soon), a slide-over cart panel (not a full page) opened from either the header cart icon or "Add to Cart", "Buy Now" skips the cart entirely, and payment method choice at checkout branches into either an immediate confirmation (COD) or an external gateway redirect (bKash/Nagad/SSLCommerz) with separate success/failure paths. Admin panel is fully separate (own login), with Products/Orders/Discount Codes/Low-Stock tabs off one dashboard.

## Auth
- **Customers**: Clerk handles signup/login/sessions for the optional-account path. Guest checkout bypasses Clerk entirely (just email + address at checkout). A lightweight `Customer` record links a Clerk user ID to order history — no password field lives in our own database.
- **Admin**: single user, custom-built — bcrypt-hashed password stored in our own database, httpOnly session cookie. Not Clerk — overkill for one user, and keeping it separate means a customer-side Clerk issue can never touch admin access.

## Data model (draft — refine once building starts)
- **Product**: name, description, base price, category, status (active / coming_soon / sold_out — sold_out can be manually forced true regardless of real stock, per the manufactured-demand feature). Low-stock threshold field to drive the admin alert.
- **Variant**: belongs to Product, color, size, stock quantity — stock tracked per variant, not per product.
- **ProductImage**: belongs to Product (or Variant, if images differ per color), a public Hostinger URL, a `role` field (`front` / `hover` at minimum — the hover-reveal interaction needs both per product/variant), `order` for gallery sequencing. Multiple images per product from day one, not a single `imageUrl` field on Product — retrofitting this later is far more painful than designing it in now.
- **Order**: customer info (guest email, or linked Customer/Clerk ID), line items (product+variant+qty+price at time of order), payment method, payment status, courier status, discount code applied (if any).
- **DiscountCode**: code string, percent/flat amount, expiry, usage limit.
- **Customer** (optional accounts via Clerk): Clerk user ID, order history. No password stored here.
- **Admin**: separate table/role from Customer — a customer account must never be able to reach admin routes.

## Payment flow
1. Checkout collects order + chosen payment method.
2. bKash/Nagad/SSLCommerz: redirect/API call to sandbox endpoint now; swapped to production endpoint + real merchant keys once approved — same code path, different env vars/keys.
3. COD: order marked pending, no payment gateway call, fulfilled on delivery.

## Shipping flow
1. On order confirmation, call Pathao merchant API to create a delivery request automatically (no manual step).
2. Store Pathao's tracking/consignment ID on the order.

## Cart & shipping cost model (locked mechanism, placeholder numbers)
- **Real multi-item cart** — confirmed, matches the existing Order/line-items design. Add multiple products, one checkout.
- **Shipping cost: free over a threshold, flat rate below it** — mechanism locked. Exact threshold amount and flat rate(s) are a config value (env var or a settings row), not hardcoded — user will provide real numbers later; trivial to change when they do. Placeholder for building/testing: free over BDT 1,500, flat BDT 80 (Dhaka) / BDT 130 (outside) below it.

## Security notes (flag now, build in from day one — not bolted on later)
- Admin routes must be behind real auth + role check, never just a hidden URL.
- Payment webhook endpoints (bKash/Nagad/SSLCommerz callbacks) must verify the signature/checksum from the provider — never trust an unverified "payment succeeded" callback.
- Guest checkout still needs server-side validation of price/stock/discount code at order time — never trust prices sent from the client.
- Clerk's server-side SDK verifies session tokens on the backend for any route that needs to know "which customer is this" — never trust a customer ID sent plainly from the client.

## Admin image upload
- Admin product form uploads image(s) to our own Express backend; backend resizes/compresses with **sharp** (a standard, well-known Node image library — avoids raw phone-camera-sized files going out) then pushes the file to Hostinger over SFTP; the resulting public URL is saved to `ProductImage` with its `role` (front/hover).
- More custom code than a drop-in widget (Hostinger has no upload widget or automatic optimization like Cloudinary does) — this is the tradeoff accepted for using storage already paid for instead of a new third-party account.
- Needs Hostinger SFTP/FTP credentials as backend env vars (never committed) — see [[todo]].

## Product card hover interaction
- Two images stacked in the same container (front image on top, hover/reveal image beneath); front image's `opacity` transitions to 0 on `:hover`/touch-equivalent, revealing the one underneath — standard crossfade, not complex.
- **Requires 2 images per product** (front + reveal) to work — if a product only has one image uploaded, hover does nothing (falls back to just showing the front image, no broken state).

## Open / deferred
- Exact React routing structure, component breakdown: decide when scaffolding starts.
- Whether admin panel is a separate app or protected routes in the same app: decide when scaffolding starts (leaning same app, for speed).
- Size chart content per product: needs real data once product photos/specs exist.
