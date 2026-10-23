---
up: "[[Fable Clothing]]"
---
# PRD — Fable Clothing

Living document — gets updated as answers/decisions come in, not written once and frozen.

## Overview
E-commerce clothing brand for the Bangladeshi market. Henleys, ringer t-shirts, hoodies, pants, trending accessories; Punjabi (traditional wear) planned as a future addition. Sold direct-to-consumer, own site, in BDT.

## Goals / success criteria
- Live and taking real orders within 1 week of build start.
- Payments and shipping work end-to-end (order → payment → automated courier handoff) even before real merchant credentials are approved (sandbox now, swap later).
- Admin can run the store day-to-day without touching the database directly (add products, manage stock, process orders).

## Target users
- **Customer**: age 15–30, "old money"/quiet-luxury aesthetic (not hypebeast streetwear), reached via Instagram/Facebook ads, based in Bangladesh.
- **Admin**: the user, managing products/orders through a self-service panel — separate, restricted login from customer accounts.

## Positioning
- Not claiming product differentiation. Betting on scalability and marketing style (reference: khan.com's AI-generated comedy-video ads) to stand out specifically within the Bangladeshi market.

## Functional requirements
- Storefront: browse products, view variants (by color).
- Checkout: **both** guest checkout (email required) and optional account creation/login — not either/or.
- Per-variant (color) stock tracking, not just per-product.
- Manual "coming soon" and "sold out" flags on products, settable independent of real stock (manufactured-demand feature — confirmed legal in Bangladesh, keep it).
- Payments: bKash, Nagad, SSLCommerz, cash-on-delivery — all four.
- Shipping: automated Pathao courier handoff triggered on order confirmation (no manual booking step).
- Self-service admin panel: add/edit products and variants, adjust stock, view and process orders, toggle coming-soon/sold-out.
- Exchanges allowed; **no refunds** — needs a policy page reflecting this, not a full refund flow.

## Non-functional requirements
- Admin routes require real auth + role check (never a hidden URL).
- Payment webhook/callback endpoints must verify provider signatures — never trust an unverified "payment succeeded" callback.
- Server-side price/stock validation at order time — never trust prices sent from the client.
- Stack must be buildable by the user within a 1-week deadline — see [[tech-stack]] for why "known tools" beat "best possible tools" here.

## Pricing
- Henley reference price: BDT ~800–850 (~$7–8 USD). Full catalog price range not finalized.
- Revenue model: direct e-commerce sales only (no subscriptions/wholesale currently planned).

## Assets & accounts (status)
- Logo + brand colors exist, not yet dropped into the vault/project.
- Domain not registered yet. Hostinger already paid for; Vercel (free tier) also available for frontend hosting.
- bKash/Nagad/SSLCommerz merchant account applications in progress in parallel with the build — not a blocker, sandbox credentials used until approved.

## Out of scope / deferred (not forgotten — just not v1)
- TypeScript on the **frontend** only (backend uses TypeScript now — this project is execution-focused, not a TS-learning exercise, see [[CONTEXT]]).
- Real merchant payment credentials (external approval process, swapped in when ready).
- Final catalog model — drop-based vs. ongoing catalog, pending competitor research.
- Full refund flow (exchanges only for now).
- Domain registration.

## Open questions
- Tagline / mission statement.
- Exact price range beyond the one reference Henley price.
- Final catalog model (drop-based vs. ongoing).
- Design direction — see [[design]] (TBD).

## Reference brands
- khan.com — marketing style reference only (AI-generated comedy video ads), not a product/catalog reference.
