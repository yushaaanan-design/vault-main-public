---
up: "[[Fable Clothing]]"
---
# Backend Architecture — Fable Clothing

Full backend map: every route, every middleware, every external integration, planned vs. built. [[architecture]] has the high-level components diagram + data model; this file is the detailed backend reference. Visual version: [[backend-architecture.canvas]].

## Request flow
```
Browser (React/Vite, Vercel)
   |  fetch() with credentials
   v
Express app (Render)
   |-- CORS (origin allowlist, credentials:true)
   |-- express.json()
   |-- [future] Clerk session verify (customer routes)
   |-- [future] admin session cookie check (admin routes)
   v
Route handlers -> Data layer -> Response
```

## Current implementation status
| Piece | Status |
|---|---|
| Express + TypeScript server | Built — `server/src/index.ts` |
| CORS + JSON middleware | Built |
| `GET /api/health` | Built |
| `GET /api/products`, `GET /api/products/:id` | Built — serves in-memory mock data, `server/src/data/products.ts` |
| Everything below this line | Planned, not yet built |

## Folder structure (current + planned)
```
server/
  src/
    index.ts              # app entry, middleware wiring
    routes/
      products.ts          # built
      cart.ts               # planned
      checkout.ts           # planned
      orders.ts              # planned (admin + customer views)
      auth-admin.ts           # planned
      webhooks/
        bkash.ts               # planned
        nagad.ts                # planned
        sslcommerz.ts            # planned
        pathao.ts                 # planned
    middleware/
      require-admin.ts       # planned — session cookie check
      require-customer.ts     # planned — Clerk token verify
      error-handler.ts         # planned — central try/catch -> JSON error
    data/
      products.ts            # built (mock) -> replaced by prisma client calls
    lib/
      prisma.ts               # planned, once DB phase starts
      sftp.ts                  # planned — Hostinger image push
      image-resize.ts           # planned — sharp wrapper
  prisma/
    schema.prisma             # planned
```

## Routes — full table
| Method | Path | Purpose | Auth | Status |
|---|---|---|---|---|
| GET | `/api/health` | Uptime check | none | Built |
| GET | `/api/products` | List products (storefront) | none | Built |
| GET | `/api/products/:id` | Single product + variants/images | none | Built |
| POST | `/api/cart/validate` | Server-side re-check of price/stock before checkout | none | Planned |
| POST | `/api/checkout` | Create order, kick off payment/shipping flow | none (guest) or Clerk | Planned |
| POST | `/api/webhooks/bkash` | Payment callback | signature verify | Planned |
| POST | `/api/webhooks/nagad` | Payment callback | signature verify | Planned |
| POST | `/api/webhooks/sslcommerz` | Payment callback | signature verify | Planned |
| GET | `/api/orders/:id` | Order status (confirmation page, order tracking) | owner or admin | Planned |
| GET | `/api/account/orders` | Customer's own order history | Clerk session | Planned |
| POST | `/api/admin/login` | Admin auth | none (creates session) | Planned |
| GET/POST/PUT | `/api/admin/products` | Product + variant CRUD | admin session | Planned |
| POST | `/api/admin/products/:id/images` | Upload image -> sharp -> Hostinger SFTP | admin session | Planned |
| GET/PUT | `/api/admin/orders` | View/update order status | admin session | Planned |
| GET/POST | `/api/admin/discount-codes` | Discount code CRUD | admin session | Planned |
| GET | `/api/admin/low-stock` | Variants under threshold | admin session | Planned |

## Middleware — full table
| Middleware | Purpose | Status |
|---|---|---|
| `cors` | Allow Vercel origin, `credentials: true` (needed for both Clerk cookies and the admin session cookie across the Vercel↔Render domain split) | Built |
| `express.json()` | Parse JSON bodies | Built |
| `require-customer` | Verify Clerk session token server-side before trusting "which customer is this" | Planned |
| `require-admin` | Check admin session cookie + role before any `/api/admin/*` route | Planned |
| `error-handler` | Central error -> consistent JSON error shape, avoids leaking stack traces | Planned |
| raw-body capture on webhook routes | Payment providers sign the raw body — must capture it before `express.json()` parses, or signature checks fail | Planned |

## Auth
- **Customer**: Clerk issues the session; backend uses Clerk's server SDK to verify the token on any route that needs to know the customer's identity (e.g. order history). Guest checkout never touches this.
- **Admin**: bcrypt-hashed password (single user) -> httpOnly, `SameSite=None; Secure` session cookie (cross-domain, Vercel frontend / Render backend) -> `require-admin` middleware checks it on every `/api/admin/*` route. Completely separate from Clerk — a Clerk bug can never grant admin access.

## Payment webhook handling (planned)
1. Each provider (bKash/Nagad/SSLCommerz) POSTs to its own `/api/webhooks/<provider>` route.
2. Verify the provider's signature/checksum against the **raw** request body before trusting anything in it.
3. Look up the order by the provider's transaction ID; if already marked paid, return 200 and do nothing (idempotency — providers retry webhooks).
4. On first successful verification: mark order paid, trigger Pathao courier handoff.

## Data layer
- **Now**: static in-memory array in `data/products.ts`, matches the shape of the eventual `Product`/`Variant`/`ProductImage` Prisma models so swapping later doesn't change route logic.
- **Later**: Prisma Client (see [[architecture]] for full schema) — routes call `prisma.product.findMany()` etc. instead of the in-memory array. Route signatures don't change.

## External integrations
| Service | Used by | Status |
|---|---|---|
| Clerk | Customer auth | Not wired in |
| bKash / Nagad / SSLCommerz | Payment | Not wired in (sandbox creds not yet obtained) |
| Pathao | Shipping handoff | Not wired in |
| Hostinger (SFTP) | Product image storage | Not wired in |
| Neon (Postgres) | Database | Not provisioned |
| Google Analytics 4 | Page/event analytics | Not wired in — frontend-only script tag, no backend work needed |
| Microsoft Clarity | Heatmaps/click tracking/session replay | Not wired in — frontend-only script tag, no backend work needed |

## Environment variables
| Var | Used in | Notes |
|---|---|---|
| `PORT` | server | Render sets this automatically in production |
| `CLIENT_ORIGIN` | server (CORS) | Vercel URL in production |
| `DATABASE_URL` | server (Prisma) | Neon connection string — not set yet |
| `CLERK_SECRET_KEY` | server | Not set yet |
| `ADMIN_SESSION_SECRET` | server | Not set yet |
| `BKASH_*` / `NAGAD_*` / `SSLCOMMERZ_*` | server | Sandbox keys — not set yet |
| `PATHAO_*` | server | Not set yet |
| `HOSTINGER_SFTP_*` | server | Not set yet |
| `VITE_API_URL` | client | Backend URL, `.env.example` in `client/` |

## Deployment (Render, planned)
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Free tier sleeps after ~15 min idle — first request after that takes ~30–60s (accepted tradeoff, see [[tech-stack]]).
