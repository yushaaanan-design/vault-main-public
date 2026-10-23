---
up: "[[Fable Clothing]]"
---
# Tech Stack — Fable Clothing (decided)

User explicitly lifted the "must use what I know" constraint, but the 1-week deadline overrides "no limits, go all out": the biggest risk isn't picking the wrong framework, it's losing days learning unfamiliar tooling. Decision: reuse what the user already knows where it matters for speed, accept TypeScript on the backend since this project is execution-focused (not a TS-learning exercise), and keep the whole stack free with no credit card required.

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite, plain JavaScript | Already known; fastest path to shipping |
| Frontend hosting | Vercel (free tier, no card) | Free, trivial React deploy |
| Backend | Express + TypeScript | User doesn't know TS yet, but this project is execution-focused, not a learning exercise — see [[CONTEXT]]. TS catches bugs early in payment/stock logic |
| ORM | Prisma | Already known |
| Database | PostgreSQL via **Neon** (free tier, no card, no expiry) | Replaces the original Railway-Postgres plan — Railway now requires a card for its trial |
| Backend hosting | **Render** (free tier, no card) | Replaces Railway for the same reason. Tradeoff accepted: free web service sleeps after ~15 min idle, first request after that takes ~30-60s to wake up. Fine at launch scale; revisit once real order volume justifies a few dollars/month |
| Customer auth | **Clerk** (free tier, no card) | Managed auth for optional customer accounts — safer than rolling password/session handling from scratch under a 1-week deadline with real payments involved |
| Admin auth | Custom-built: bcrypt-hashed password + httpOnly session, single admin user | Low-risk (one user), doesn't need a third-party service |
| Payments | bKash, Nagad, SSLCommerz, Cash on Delivery | All four required by user; sandbox creds now, live creds swapped in once merchant accounts approved |
| Shipping | Pathao merchant API | Automated order → courier handoff |
| Admin | Custom-built panel inside this app | Product/variant/stock management, order processing, coming-soon/sold-out toggles, low-stock alerts |
| Domain | Not registered yet | Vercel's free subdomain covers development in the meantime |

## Explicitly deferred (not because they don't matter — because the deadline doesn't allow it now)
- TypeScript on the frontend (backend only for now)
- Real merchant credentials (blocked on external approval, not on us)
- Domain registration
- Finalized product catalog / drop-based vs ongoing model (waiting on competitor research)
- Upgrading off Render's free tier (once order volume makes the cold start actually annoying)
