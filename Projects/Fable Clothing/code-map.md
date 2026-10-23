---
type: project
up: "[[Fable Clothing]]"
---
# Code map

What each file does, in `C:\Users\yusha\OneDrive\Desktop\FABLE CLOTHING\`. Rewritten 2026-09-28 after the full rebuild. Decisions live in [[CONTEXT]] and [[design-system]]; the API contract lives in `server/API.md` in the repo.

Roughly 13,200 lines in `client/src` and 2,400 in `server/src`.

## server/ (Express 5 + TypeScript)
| File | What it does |
|---|---|
| `src/index.ts` | App entry: CORS, JSON limits, static `/uploads`, route mounting, error handler |
| `src/lib/store.ts` | The database: one JSON file loaded into memory, written atomically through a queue. `mutate()` runs a change and saves it |
| `src/lib/pricing.ts` | **The only place prices are computed.** Lines, stock caps, discounts, delivery, totals |
| `src/lib/pricing.test.ts` | 8 tests: free-delivery threshold, zones, percent and flat discounts, expired codes, unavailable variants |
| `src/lib/auth.ts` | Admin password hashing (scrypt), signed session cookie, origin check, `requireAdmin` |
| `src/lib/validate.ts` | Field validation, including the Bangladeshi mobile rule |
| `src/lib/rateLimit.ts` | In-memory rate limiting |
| `src/lib/shapes.ts` | Converts stored records into what the public is allowed to see |
| `src/lib/http.ts` | `fail()` and the error handler that turns errors into clean JSON |
| `src/data/seed.ts` | The starting catalogue, settings, discount codes and sample orders. **All product copy lives here** |
| `src/seed.ts` | `npm run seed`: resets the store from the seed |
| `src/routes/public.ts` | Catalog, products, settings, cart quote, order tracking, drop list, contact messages |
| `src/routes/checkout.ts` | Places an order: validate, price, check stock, decrement, save |
| `src/routes/admin/` | `index.ts` (login, session, guards), `orders.ts`, `catalog.ts` (products, categories, drops, uploads), `other.ts` (discounts, waitlist, messages, settings, overview) |
| `src/scripts/set-admin-password.ts` | `npm run admin:password`: sets a real admin password |
| `data/` | The live store, the dev admin password. Git-ignored. **`store.json` is the only copy of every order** |
| `uploads/` | Admin-uploaded product photos. Git-ignored |

## client/ (React 19 + Vite, plain JavaScript, plain CSS)
### Foundation
| File | What it does |
|---|---|
| `src/main.jsx` | Entry: fonts, global styles, the router |
| `src/App.jsx` | The route table. A **data router**, needed for page-turn transitions and the admin's unsaved-changes guard |
| `src/styles/global.css` | The whole design system: colour and type tokens, spacing, buttons, forms, badges, reveals, page transitions |
| `src/lib/api.js` | One fetch wrapper. Throws `ApiError` with field errors |
| `src/lib/format.js` | Taka formatting, dates, roman numerals for plate numbers, phone validation |
| `src/lib/product.js` | Small helpers over a product: images by role, badges, spec lines, variant lookup |
| `src/state/CatalogContext.jsx` | Loads the catalogue once; every page reads from it |
| `src/state/CartContext.jsx` | The cart (ids and quantities only), the server quote, and orders placed on this device |
| `src/motion/MotionProvider.jsx` | One motion clock: smooth scrolling, scroll scenes, the reveal observer, scroll locking |

### Pages (`src/pages/`)
Home, Shop, Category, Drop, NextDrop, Story, Help, Product, Checkout, OrderReceived, Track, Account, NotFound. Each with its own `.css`. `admin/` holds the 11 admin screens.

### Components (`src/components/`)
| Folder | What is in it |
|---|---|
| `ui/` | Icon (one drawn set), Photo (aspect box, lazy, fallback), Badge, Ribbon (the chestnut marker) |
| `commerce/` | Plate (the product card as a numbered plate), PurchasePanel (colour, size, add to cart), SizeGuide, NotifyForm (drop list), ContactForm |
| `layout/` | Header with the Shop contents panel, MobileMenu (a table of contents), SearchOverlay (an index), Footer with "Reach out to us", AnnouncementBar |
| `home/` | The nine home sections |
| `shop/` | Grid, shelves, loading and error states, merchandising order, policy constants |
| `editorial/` | Colophon, features, FAQ, fit guide, help topics |
| `cart/` | The cart drawer |
| `checkout/` | Payment options, order summary, the 64 districts |
| `order/` | Receipt slip, timeline, tracking form, order list |
| `admin/` | Shell, table kit, sales chart, stock matrix, image manager |

### Assets
`public/images/stock/` holds 38 licensed stand-in photographs and `SOURCES.json` describing each one. Replace these with the real shoot; only `server/src/data/seed.ts` and the admin need to point at the new files.

## Known gaps
- No database (a JSON file), no payment gateway, no courier integration, no customer accounts.
- Product specs are drafts, flagged `specsDraft` in the admin.
- Renaming a colour in the product editor resets that colour's stock. Re-enter the numbers.
- Analytics script tags are not added yet (need the founders' IDs).
