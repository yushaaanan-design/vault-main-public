---
up: "[[Fable Clothing]]"
---
# To-do — Fable Clothing

Open-ended, keep adding as problems come up. Not ordered by priority unless marked.

- [ ] Replace placeholder photos (hand-picked picsum.photos IDs in `server/src/data/products.ts`, `Home.css` hero, `CategoryTiles.jsx`, `InstagramCTA.jsx`) with real product shots
- [ ] Give the real Instagram URL for the "DM on Instagram" button (`client/src/components/home/InstagramCTA.jsx`, placeholder now)
- [x] chrome-devtools MCP configured in `.mcp.json` (project root), active from the next Claude Code session, for self-verifying UI with screenshots
- [x] Expand nav with category links (done 2026-09-26, user reversed the minimal-nav decision)

- [ ] Get Google Analytics 4 tracking ID + Microsoft Clarity project ID — decided this session (heatmaps/click tracking), just need the IDs to drop into `client/index.html`
- [ ] Register domain
- [ ] Apply for bKash merchant account
- [ ] Apply for Nagad merchant account
- [ ] Apply for SSLCommerz merchant account
- [ ] Set up Pathao merchant/API access
- [ ] Provide logo + brand colors to the project (for [[design]])
- [ ] Provide product photos (or decide on a photo/asset pipeline)
- [x] Decide: cart vs. single buy-now checkout — both built, cart is real multi-item, Buy Now skips it entirely
- [ ] Give real free-shipping threshold + flat rate numbers (mechanism already locked — see [[architecture]] — just needs the actual numbers, config value, easy to change)
- [ ] Decide: catalog model (drop-based vs. ongoing) — after competitor research
- [ ] Write privacy policy + terms of service text
- [ ] Set up Meta Pixel / ad account for conversion tracking
- [ ] Set up Vercel account (frontend hosting)
- [ ] Set up Render account (backend hosting)
- [ ] Set up Neon account (database)
- [ ] Set up Clerk account (customer auth)
- [ ] Decide later: content-editable admin (e.g. homepage banner/announcement) vs. business-data-only admin — deferred, not v1
- [ ] Set up a WhatsApp/SMS messaging API for order confirmations (needed alongside email — more setup, not just SMTP)
- [ ] Provide/finalize logo file — chestnut-brown (#5C3A21) usage rules depend on it
- [ ] Get Hostinger SFTP/FTP credentials + confirm a public folder path for product images
- [ ] When catalogs arrive: make sure each product has at least 2 images (front + hover-reveal) for the crossfade interaction to work
- [ ] Avatar tool test (details in [[social-content-strategy]] and [[Content Creation]]): free-test HeyGen + Hedra with the same face and 15s script, score with the sheet, then pay one month of Higgsfield's cheapest plan only if neither is realistic enough
