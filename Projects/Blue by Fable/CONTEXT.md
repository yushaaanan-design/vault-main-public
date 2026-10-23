---
up: "[[Blue by Fable]]"
---
# Context: Blue by Fable (read this, not the chat)

Living doc. When something changes, edit it in the same session.

## What this is
**Blue by Fable**: a shoe line, an extension of [[Fable Clothing]]. Separate project and repo, connected to Fable by brand. Stated 2026-10-01.

Plan the user gave, in order:
1. Set up the project and its context/global rules (this note).
2. User supplies reference websites; we scrape/tear them down (method: `Projects/Web Design/procedures/competitor-teardown-procedure.md`).
3. Build the site by **modifying the Fable site** (fork its code, don't start from zero).

## Decisions (user, 2026-10-01)
- **Not a copy. One website, one codebase.** Blue is a branch/division of the Fable site: shared customers, admin, orders, cart, checkout. "The absolute same website."
- Vault: separate project folder from Fable's, but linked to it.
- **Catalogue architecture comes before the website.** Blue will be a huge, shoes-only catalogue. See [[catalogue-architecture]].
- Own brand ("Blue"), but stock is **sourced from other brands too** (keep a `brand` field). **Men only.** Postgres move approved (Fable is still on `server/data/store.json`, no Prisma installed as of 2026-10-01).
- **Leather only (2026-10-01):** Blue sells leather shoes and leather accessories (belts, wallets, bags, etc.), nothing non-leather. Scraping and the catalogue both filter to this. "Synthetic / PU / faux / rexine" counts as NOT leather.
- **Market-research system (2026-10-01):** build a competitor product database (photos, attributes, prices) and an on-demand lookup: give a photo/description, get a market price package. **Shoes are the pilot**; other categories (Fable shirts, Henleys, etc.) only after it works. Later, Blue's product-upload flow calls the lookup before pricing. Website structure of competitors is deferred. Details: `Resources/scraping-rules.md` sections 2a/2b.
- Sizing: Bangladeshi system, user will specify. Price range: user will specify.
- Identity/logo: keep Fable's look for now, decide Blue's later.

## Where things live
- `C:\Users\yusha\OneDrive\Desktop\fable shoes\` holds only notes/CLAUDE.md for now; code work happens in the Fable repo (`C:\Users\yusha\OneDrive\Desktop\FABLE CLOTHING\`, `client/` React+Vite, `server/` Express+TS; JSON store, Prisma+Neon planned). Read its [[Fable Clothing]] notes: [[CONTEXT]], [[design-system]], [[code-map]].
- Vault folder: `Projects/Blue by Fable/` (this one)

## Working rules
- Global CLAUDE.md rules apply: user reads every line, small steps, explain added lines, explain breakage before fixing, flag security immediately, never trust the client, secrets never in chat/git/notes.
- Fable's "execution-focused, no teaching" override is **Fable-only**. Not inherited here unless the user says so. Ask once, then record here.
- Style notes: `Style/frontend-style.md`, `Style/backend-style.md`, `Style/working-style.md`.
- Pull context from these docs, never from chat history.
- Local git only, never push.

## Carried over from Fable (inherit unless the user changes it)
Stack: React + Vite (JS), Express + TS, same store layer, own-auth customer accounts, COD + gateways in test mode. Verify against Fable's current STATE before assuming; Fable is still in flux.

## Open questions (need the user)
- Answered already: own brand + sourced brands, men only, leather only, Postgres move approved (see Decisions above).
- Still open: Bangladeshi size system, price range, image storage (Hostinger vs Cloudinary: user has not chosen), git plan (assumed a `blue` branch of the Fable repo), Blue identity/logo (later; keep Fable's look for now), whether images/attributes are extracted at scrape time.
- Competitor sites: Apex (apex4u.com) is the pilot; Bay, Jennys, others later; Bata parked. Details in the Web Scraping project, not here.

## Related
- Market research and scraping: Web Scraping STATE, `Resources/scraping-rules.md`.
- Model usage log (central): `Resources/model-log.md`.
