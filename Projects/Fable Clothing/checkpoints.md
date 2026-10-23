---
up: "[[Fable Clothing]]"
---
# Checkpoints — Fable Clothing

Git tags/commits marking known-good states, so any version can be recovered with:
```
git checkout v1-baseline        # look at it detached
git checkout -b some-branch v1-baseline   # work from it
git reset --hard v1-baseline    # DESTRUCTIVE — only if you want to throw away everything after it
```

## `v1-baseline` — commit `0caed82` (2026-09-28)
**What this is:** the state of the site right after the catalogue restructure (drop-based releases → ongoing catalogue) but *before* any of the owner's Round 4 walkthrough fixes were applied. This is the version the owner clicked through live on `localhost:5175` to produce the 34-item feedback list in [[STATE]].

**What's in it:**
- New catalogue home page: hero, category tiles, "New in" shelf, one family feature, per-category shelves, reassurance band, story teaser.
- Backend catalogue rewritten for the new categories: Henleys, Quarter Zips, Shirts, Trousers (Accessories coming-soon), roughly 16-20 products, drops removed from the data model and seed data.
- Palette lifted off pure black (`--cloth` warm dark `#17150F` with real tonal steps, ink raised to `#F3EADA`).
- Type scale rebalanced (tracking/leading tighten as size grows).
- Image loading rewritten to an IntersectionObserver with 150% margin instead of native lazy loading.

**What's known-broken or incomplete in this exact commit** (see [[STATE]] "Round 4" section for the full list):
- Drop model is **not** fully removed — `/drop/:number` and `/next-drop` routes, `Drop.jsx`, `NextDrop.jsx`, `CurrentDrop.jsx`, `NextDropFeature.jsx`, and admin `Drops.jsx` all still exist and are wired in. `CatalogContext` still exposes drop-related fields.
- No size chart on any product page.
- No sticky/fixed header.
- No customer accounts (sign up/sign in) and no admin Customers screen.
- No order-confirmation email, no working inbound "reach out to us" email.
- Cart doesn't clearly support multiple items / multiple sizes.
- Full list: 34 numbered items in [[STATE]], Round 4 section.

**Why this checkpoint exists:** the owner asked explicitly, before starting the next round of fixes, to freeze and name a recoverable point — "I don't want you to kill this website" — so that if the next round of changes (nav fixes, size charts, cart, drop cleanup, etc.) goes wrong, the site can be reverted to exactly this state without losing the restructure work.

**Next checkpoint:** will be tagged after the Round 4 fixes land and get committed (see [[STATE]] for what's being worked and by which model — Sonnet for the bulk, Opus for customer accounts and payments specifically).
