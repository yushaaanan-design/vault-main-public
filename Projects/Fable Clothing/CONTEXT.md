---
up: "[[Fable Clothing]]"
---
# Context — Fable Clothing (full handoff — read this, not the old chat)

This file exists so a future session never needs the original conversation. Everything decided, why, and where the rest lives is here. It's a living document — when something changes, edit this file in the same session, don't let it drift stale.

## What this is
A real e-commerce clothing business (not a learning project) for the Bangladeshi market, run personally by the user. Products: Henleys, ringer t-shirts, hoodies, pants, trending accessories now; Punjabi (traditional wear) as a future line. Direct-to-consumer, own site, priced in BDT. Customer base: age 15–30, quiet-luxury/aspirational aesthetic, reached via Instagram/Facebook ads.

## Non-negotiables (stated directly by the user — don't re-litigate these)
- **This project is execution-focused, not a learning exercise.** The user said explicitly: "I will learn later, this project is particularly me executing" and "you do not need to teach me." This overrides the user's *global* CLAUDE.md working style ("Claude writes the code, user reads every line, wait for 'I understand'") — for Fable Clothing only, write code and move fast without pausing to teach. Still flag real security/payment/data-handling issues, just don't gate progress on explaining them line-by-line.
- **Fake "coming soon" and fake "sold out" listings are intentional** — a deliberate manufactured-demand tactic, not a bug or an oversight. The user confirmed this is legal in Bangladesh and wants it kept. Don't raise the ethics objection again.
- **Exchanges allowed, no refunds.** This is final, matches what the closest competitor (Maneel Club) also does.
- **Guest checkout AND optional accounts, both required** — not a choice between them.
- **Admin panel must be self-service** (add products, manage stock, process orders without touching the database directly).
- Domain, real merchant credentials, and a few other external items are explicitly not blockers — build against sandbox/placeholders now, swap in real values later (see "External/not-blocking" section below).

## Timeline reality check
The user's original ask was "live within 1 week, testing starts immediately" (stated 2026-09-25). As of this writing, most of the session since then has gone into PRD/tech-stack/design/competitor-research/site-map planning — **no application code has been written yet beyond initial scaffolding** (see "Current code state" below). If a week has already passed, that deadline has likely slipped; worth acknowledging plainly to the user rather than pretending it's still on track, without re-litigating any decision.

---

## 1. Brand & positioning (PRD — full detail in [[PRD]])
- Not claiming product differentiation — betting on scalability and marketing style (reference: khan.com's AI-generated comedy-video ads) to stand out specifically within the Bangladeshi market.
- **"Old money" as a phrase is banned from the site.** Maneel Club (the closest direct competitor — same products, same market, similar price tier, also founded Dec 2024) uses the literal phrase "old money" three times on their live site: hero banner tagline, a product description, and as an actual SKU name ("Old Money Half Sleeve T-shirt"). Decision: **Fable keeps the quiet-luxury/aspirational feel but never uses the exact words "old money" anywhere on-site**, so it doesn't read as copying Maneel Club's signature line.
- Reference price: BDT ~800–850 for a Henley (~$7–8 USD). Full catalog price range not finalized.
- Revenue: direct e-commerce sales only, no subscriptions/wholesale planned.
- Tagline/mission statement: still not given — open question.
- Catalog model (drop-based releases vs. an ongoing always-available catalog): **still not decided** — was meant to be informed by the competitor research, which is now done (see section 4), but the explicit drop-vs-ongoing call was never made. Ask, don't assume.
- Launch catalog: 2 real products, plus fake "coming soon"/"sold out" listings (see non-negotiables above).
- Sourcing: via suppliers, not self-manufactured. Print-on-demand: undecided.

## 2. Tech stack (full detail + reasoning in [[tech-stack]])
Locked, and it changed twice mid-session — this is the CURRENT correct version:

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React + Vite, **plain JavaScript** | Not TypeScript — kept simple since the user already knows this |
| Frontend hosting | **Vercel** (free tier, no card) | — |
| Backend | Express + **TypeScript** | TypeScript IS used here, reversing the original "JS only" plan, because this project is execution-focused (see non-negotiables) — TS catches bugs in payment/stock logic, and the user doesn't need to understand every line |
| ORM | Prisma | — |
| Database | PostgreSQL via **Neon** (free tier, no card, no expiry) | **Not Railway** — Railway was the original plan but now requires a card for its trial, so it was dropped |
| Backend hosting | **Render** (free tier, no card) | **Not Railway**, same reason. Tradeoff accepted: free web service sleeps after ~15 min idle, first request after that takes ~30–60s to wake up |
| Customer auth | **Clerk** (free tier, no card) | Managed auth for the optional-account path — lower risk than rolling password/session handling from scratch under a deadline, with real payments involved |
| Admin auth | Custom-built: bcrypt-hashed password + httpOnly session cookie, single admin user | **Not Clerk** — overkill for one user, and keeping it separate means a customer-side Clerk issue can never touch admin access |
| Payments | bKash, Nagad, SSLCommerz, Cash on Delivery | All four required. Sandbox/test credentials now; real merchant credentials swapped in once approved (applications in progress in parallel, not blocking) |
| Shipping | Pathao merchant API | Automated order → courier handoff, no manual booking |
| Image hosting | **Hostinger** (already paid for) | **Not Cloudinary** — this was also changed mid-session. User already pays for Hostinger and preferred reusing it over adding a new account, even though it means more custom code (SFTP push + manual resizing with the `sharp` npm package) instead of Cloudinary's drop-in upload widget with automatic optimization |
| Domain | Not registered yet | Vercel's free subdomain covers development meanwhile |

**Why "known tools" over "best possible tools":** the user originally said "no limits, go all out" on tech choice, but a 1-week deadline overrides that — the biggest risk isn't picking an imperfect framework, it's losing days to unfamiliar tooling. Reuse what's already known (Express, Prisma, Postgres, React) wherever it doesn't cost anything to do so.

## 3. Design system (full detail in [[design]])
**Colors (user-provided, hand-written and confirmed):**
| Name | Hex | Role |
|---|---|---|
| Black | `#000000` | Dark-mode base/background |
| Ivory | `#EDE4D3` | Body text on dark; light-mode background |
| Gold (muted gold) | `#8A7355` | Primary accent — CTAs, highlights |
| Chestnut brown (signature) | `#5C3A21` | Secondary accent — borders, secondary buttons |
| White | `#FFFFFF` | Light-mode base |

Theme: **shiftable (light/dark toggle), defaults to dark.**

**Typography — Direction B, locked** (chosen over an elegant-serif direction and an ornate-display-accent direction; comparison still viewable at https://claude.ai/artifact/EiuKP1ypwA7UaHe17W677V, now updated to show the real locked palette):
- Display/headline: **Archivo**, bold (700), wide letter-spacing, gold gradient text (`#C9A876` → `#8A7355`) for hero moments
- Body/UI: **Archivo**, regular/medium weights
- Small labels/eyebrows: **Jost**, uppercase, wide letter-spacing
- No serif, no script anywhere — full commitment to modern sans

**Other locked design decisions:**
- Scarcity/urgency badges: **loud pill badge** (Maneel Club style) — bold, front-and-center on the product card, not a quiet corner tag.
- Marketing energy: khan.com-style AI comedy-video energy stays **ads-only** (Instagram/Facebook) — never on-site. The site itself stays quiet/premium.
- Navigation: **minimal flat nav** at launch — Home / Shop / Coming Soon, no category links yet (expand later, tracked in [[todo]]).
- Home page: **bold hero banner** (Maneel Club style — large photography with overlaid text/CTA), not a quiet product-first grid.
- Product detail page: **kept minimal** at launch — image, name, price, size/color, inline size guide. No fabric/care block, no fit description, no on-page delivery estimate yet.
- Checkout fields: name, phone, address, email, order notes (free-text), trust badges/policy links, discount code field.
- Order confirmation: **three channels, all required** — on-screen page, email, AND WhatsApp/SMS (the last one needs a messaging API, more setup than email alone — tracked in [[todo]]).
- Cart: **real multi-item cart**, confirmed — not single buy-now only. Implemented as a **slide-over panel**, not a full page (see site map, section 5) — opened by the header cart icon or by "Add to Cart".
- "Buy Now" button skips the cart entirely, straight to checkout.
- Shipping cost: **free over a threshold, flat rate below it** (mechanism locked). Real numbers not given yet — placeholder for building/testing: free over BDT 1,500, flat BDT 80 (Dhaka) / BDT 130 (outside) below it. This is a config value, trivial to change once real numbers arrive.
- Product images: **at least 2 per product required** (front + hover-reveal) for the hover-crossfade interaction (front image fades to reveal a second image underneath on hover — standard technique, not complex). Falls back gracefully to just showing the front image if only one exists.
- No competitor/site was named as something to explicitly avoid resembling.
- Logo: not provided yet — build with a placeholder text wordmark ("FABLE CLOTHING" in the locked gold/Archivo styling) and swap the real file in later. This is a low-effort swap, not a blocker (unlike colors/typography, which touch every component and had to be locked first).

## 4. Competitor research (full detail in `Projects/Web Design/design-references/` — see section 6 for file inventory)
Three sites were torn down exhaustively, both structurally (every nav item/category/page crawled via WebFetch, then expanded via background agents) and visually (44 real screenshots + extracted computed colors/fonts via `playwright-cli`, driving the user's actual installed Chrome — see [[competitor-teardown-procedure]] for the reusable method, including the failure mode of `npx playwright install` timing out in this sandbox).

- **Maneel Club** (maneelclub.com) — **closest direct competitor**: same products, same market, similar price tier, also a young brand (founded Dec 2024). Uses "old money" 3x (see section 1). Reusable patterns: flat shipping rates (BDT 80/130, superseded by Fable's own threshold-based model), 24-hour exchange window with no refunds (matches Fable's own policy), screenshot-based reviews with no star system, "Stock Clearance" as a permanent urgency category (not real dead stock), a generic size-selector dropdown whose *options* change per product type (letters for tops, waist numbers for jeans — same component, different values, directly informs Fable's `Variant` model needing a flexible size field), Add to Cart + Buy Now as separate buttons, a trust line under the CTA ("Trusted by 30,000+ customers..."). Visual: dark maroon/burgundy (`~#6B1F2A`) with bold heavy sans type — louder than Fable's chosen direction. One flagged oddity: a visibly unlicensed The North Face–branded item in their "Stock Clearance" — not a pattern to copy.
- **Get The Juice** (getthejuice.store) — the "quiet luxury" reference: zero urgency/discount tactics anywhere, inline variant selector directly on the product card with an instant "Add" button, real payment icons shown at checkout (SSLCommerz + bKash + Nagad + card — confirms this exact payment mix already works in this market), checkout hands off to a separate hosted checkout page. Visual: pure white/black/grey UI with zero brand accent color in the chrome — all color comes from product photography itself; plain Helvetica/Arial type.
- **Illiyeen** (ilyn.global) — large multi-brand retailer with a tier system (Premium/Luxury/Platinum/Sahara/etc.) as its core merchandising pattern across almost every category (not relevant at Fable's 2-product launch scale, but the pattern to adopt if the catalog grows later). Reusable patterns: arch-frame studio product photography, inline expandable size guide + explicit fabric composition/care block (trust-building for a new brand), cart implemented as a **slide-over panel** (directly adopted for Fable), CTA gracefully degrades to a "Find in store" fallback when a variant has no online stock (informs Fable's fake-sold-out UX — degrade gracefully, don't just hide the product), a shipping policy with a "closed box delivery" clause requiring video proof for damage disputes (given COD is in scope, worth adapting).

## 5. Page structure & navigation flow
Full button-by-button detail lives in two synced places — don't re-derive this, read them:
- **[[site-map.canvas]]** — visual, 45 nodes/46 edges. Every header element (logo, nav tabs, search/account/cart icons) is its own node with its own arrow; every button on every page traced individually, including the payment-method branch (COD → straight to confirmation; bKash/Nagad/SSLCommerz → external gateway redirect → separate success/failure paths back into the flow) and the full admin add-product/edit-order flow. Customer flow is gold, admin flow is brown, matching the locked palette.
- **[[site-map]]** — the identical structure as plain markdown tables, one per screen, for a fast read without opening Obsidian's canvas view.

Key structural points not to forget: the cart is an **overlay panel**, not a page (Illiyeen pattern); "Add to Cart" opens that panel without navigating away; "Buy Now" skips the cart and goes straight to Checkout; the search icon is **not built in v1** (deferred); Account/Order History has no further drill-down at launch (kept minimal).

## 6. Data model (full detail in [[architecture]])
- **Product**: name, description, base price, category, status (`active` / `coming_soon` / `sold_out` — `sold_out` can be manually forced true regardless of real stock, per the manufactured-demand feature), low-stock threshold field.
- **Variant**: belongs to Product — color, size (flexible field, not hardcoded to one size system — see Maneel Club finding above), stock quantity (tracked per variant, not per product).
- **ProductImage**: belongs to Product (or Variant, if images differ per color) — a public **Hostinger** URL (not Cloudinary), a `role` field (`front` / `hover` minimum), an `order` field for gallery sequencing. Multiple images per product designed in from day one.
- **Order**: customer info (guest email, or linked Customer/Clerk ID), line items (product+variant+qty+price at time of order), payment method, payment status, courier status, discount code applied if any.
- **DiscountCode**: code string, percent/flat amount, expiry, usage limit.
- **Customer** (optional accounts via Clerk): Clerk user ID + order history — **no password field lives in our own database**, Clerk owns that.
- **Admin**: separate table/role from Customer — a customer account must never be able to reach admin routes.

**Security notes, build in from day one, not bolted on later:**
- Admin routes need real auth + role check, never a hidden URL.
- Payment webhook/callback endpoints must verify the provider's signature/checksum — never trust an unverified "payment succeeded" callback.
- Guest checkout needs server-side validation of price/stock/discount code at order time — never trust values sent from the client.
- Clerk's server-side SDK verifies session tokens on the backend for any route needing to know "which customer is this."

## 7. Admin image upload & hover interaction (full detail in [[architecture]])
- Admin uploads an image in the product form → backend resizes/compresses with **`sharp`** (standard Node image library, avoids serving raw phone-camera-sized files) → pushed to **Hostinger via SFTP** → resulting public URL saved to `ProductImage` with its `role`.
- This is more custom code than a drop-in widget would be (no upload widget, no automatic optimization/CDN like Cloudinary provides) — a deliberate tradeoff for reusing storage already paid for.
- Needs Hostinger SFTP/FTP credentials as backend env vars (never committed) — not yet provided, tracked in [[todo]].
- Product card hover: two images stacked in the same container, front image's opacity transitions to 0 on hover, revealing the image underneath. Needs 2 images per product minimum.

## 8. Current code state (as of this writing)
Working directory: `C:\Users\yusha\OneDrive\Desktop\FABLE CLOTHING\`
- `git init` has been run.
- `client/` — Vite + React scaffolded, `npm install` already run, **no custom code written yet** beyond the default Vite template. Stays plain JavaScript per the locked stack.
- `server/` — folder exists, `npm init` has been run (there's a `package.json`), but **no dependencies installed and no code written yet**. Needs: `express`, `typescript`, `ts-node`/`tsx`, `@types/node`, `@types/express`, `prisma`, `@prisma/client`, `bcrypt`, `cors`, `dotenv`, `sharp`, an SFTP client library (e.g. `ssh2-sftp-client` or `basic-ftp`), then `npx tsc --init` and `npx prisma init`.
- **Nothing else has been built.** No Prisma schema written yet, no Express routes, no React components beyond the default template, no admin panel, no Clerk integration, no payment integration code. Everything in this document above is planning/architecture, not implementation.

## 9. Vault file inventory — where everything lives
All under `C:\OBSIDIAN VAULT\Codebase and learning\Projects\Fable Clothing\`:
- **`Fable Clothing.md`** — hub note, links to everything below.
- **`CONTEXT.md`** — this file. Read first.
- **`STATE.md`** — short "what's built, what's next" status, updated more frequently than this file.
- **`PRD.md`** — full product requirements (goals, functional/non-functional requirements, scope, open questions).
- **`design.md`** — full design system (see section 3), plus the locked navigation/homepage/checkout/confirmation decisions.
- **`tech-stack.md`** — full stack table + reasoning (see section 2).
- **`architecture.md`** — components diagram, auth, data model, payment/shipping flow, security notes, image upload, hover interaction, and a pointer to the site map (see sections 5–7).
- **`features.md`** — running checklist of every feature, organized by when it was approved, plus identified gaps and explicitly-deferred items.
- **`todo.md`** — open-ended action list, mostly external/non-blocking items (see section 10).
- **`site-map.canvas`** / **`site-map.md`** — button-by-button navigation flow (see section 5).
- **`Fable Clothing.canvas`** — the original project-overview canvas (central hub + PRD/design/tech-stack/architecture spokes in yellow, Business branch in purple) — a higher-level map than site-map.canvas, made early in the project before most detail existed.
- **`Business.md`** — hub for the business side (brand/ops/marketing), kept separate from product/tech, still empty beyond its own stub.
- **`Projects/Web Design/design-references/`** folder:
  - `illiyeen.md`, `getthejuice.md`, `maneel-club.md` — full structural + visual teardowns (see section 4).
  - `illiyeen-screens.canvas`, `getthejuice-screens.canvas`, `maneel-club-screens.canvas` — every screenshot as its own traversable node, grouped by page type.
  - `screenshots/` — 44 PNG files backing the above.

Also relevant, outside this project's folder:
- **`C:\OBSIDIAN VAULT\Codebase and learning\Projects\Web Design\procedures\competitor-teardown-procedure.md`** — the reusable methodology for tearing down reference sites (structure via WebFetch, visuals via `playwright-cli`, with the `npx playwright install` sandbox-timeout failure mode documented so it's not repeated).
- **`C:\OBSIDIAN VAULT\Codebase and learning\INDEX.md`** — has a row for this project pointing here.

## 10. Claude's own memory (not the vault — Claude Code's persistent memory system)
Three memory files exist for this project, readable across future sessions regardless of vault access:
- `project_fable_clothing.md` — top-level pointer (brand, stack, deadline, where the vault docs live).
- `feedback_execution_not_learning.md` — the non-negotiable from section "Non-negotiables" above, formalized.
- `feedback_design_reference_convention.md` — when the user gives a visual reference, they want it scoped to a named section (e.g. "khan.com-hero"), not a full-site fetch/paste — token conservation.

## 11. External / not-blocking (from [[todo]] — none of this stops code from being written)
- Domain registration.
- bKash, Nagad, SSLCommerz merchant account applications — in progress in parallel, build against sandbox meanwhile.
- Pathao merchant/API access.
- Hostinger SFTP/FTP credentials + a confirmed public folder path for images.
- Logo file (chestnut-brown usage rules depend on it — placeholder text wordmark meanwhile).
- Real product photos (placeholders for now — user will provide catalogs "very soon"; when they arrive, each product needs at least 2 images for the hover interaction).
- Real free-shipping threshold + flat-rate numbers (placeholder in use, see section 3).
- Privacy policy + Terms of Service text.
- Meta Pixel / ad account setup.
- Vercel, Render, Neon, Clerk account creation (none done yet — do NOT create these accounts or deploy anything without the user directly present, even though they're "free, no card").
- WhatsApp/SMS messaging API setup for order confirmations.
- Category nav expansion, once the catalog grows past launch scale.
- A deferred decision on content-editable admin (e.g. a homepage banner/announcement admins can edit) vs. business-data-only admin — explicitly not v1.

## 12. Genuinely still-open decisions (not external setup — need the user's actual answer)
- Catalog model: drop-based releases vs. an ongoing catalog (see section 1).
- Tagline/mission statement.
- Exact price range beyond the one reference Henley price.

## What to do next
Everything through design and architecture is locked. The next real step is **starting actual implementation**: finish `server/` dependency installation, write the Prisma schema (section 6), scaffold the Express app structure, and start building the storefront pages per the site map (section 5) — with placeholder images/logo/numbers everywhere the real assets aren't in yet. Nothing above should need to be re-asked; if something here looks wrong or the user contradicts it, trust the user and update this file, don't silently revert to what's written here.
