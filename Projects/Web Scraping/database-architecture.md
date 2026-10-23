---
up: "[[Web Scraping]]"
tags: [web-scraping, database, architecture]
---
# Database architecture: the market database

Status: **design, approved in principle 2026-10-01, nothing built yet.** Rules it follows: scraping-rules (sections 2a, 2b, 5, 6). Feeds Blue by Fable. Pilot: leather shoes and leather accessories, starting with Apex.

## 1. What this is for
Give a photo or description of any shoe and get a **market package**: low / median / high asking price, comparable photos, sources, and a confidence note, whatever the product is called. Competitor names differ, so we match on **attributes and photos, never names**.

## 2. The big picture
```
 Apex site ──scrape──> data/apex/products.jsonl   (RAW, append-only, never edited, the backup)
                              │ clean + leather filter + attribute extraction
                              ▼
                        market.db  (SQLite, one file)
                         ├─ sites
                         ├─ products
                         ├─ product_photos ──points to──> data/photos/<site>/<product_id>/*.jpg
                         └─ price_snapshots (one row per product per scrape date)
                              │
              you give a photo ─┴─> extract attributes ─> query ─> market package
```
- **Raw first, database second.** If a rule changes, delete `market.db` and rebuild it from the raw files. Nothing is lost.
- **Photos are files, not database content.** The database stores only their paths.

## 3. Tables
```
sites            id, name, url, scraped_first_on
products         id (e.g. "apex-oxford-204"), site_id, url, name, brand,
                 category (shoe / accessory), type (oxford, loafer, wallet, belt...),
                 colour, material_text (raw words from the site), upper_material, sole_material,
                 is_leather (yes / no / check),
                 sole, closure, toe_shape, attributes_source (site text / from photo)
product_photos   id, product_id, file_path, source_url, role (front/side/back/detail),
                 position, sha256, width, height, downloaded_on
price_snapshots  id, product_id, scraped_on, price, sale_price, in_stock,
                 sizes_in_stock, review_count, rating, badge, best_seller_rank,
                 viewed_count, bought_count   (the site's own popularity claims, added after Apex recon)
```
- A product is stored **once**. Each scrape adds a row to `price_snapshots`, so history shows price changes and sell-outs.
- `is_leather = check` rows live outside the main list until the user decides (scraping-rules section 5).
- Later columns, not now: `our_cost`, `margin`, an image embedding (see section 7).

## 4. How every image is tied to its product
Three links, so nothing can silently drift:
1. **Stable product id.** Built from the site and its own product URL, e.g. `apex-oxford-204`. It is the primary key in `products`.
2. **File path carries the id.** `data/photos/apex/apex-oxford-204/apex-oxford-204-1-front.jpg`. Even without the database, the filename says which product it belongs to.
3. **`product_photos` row** records the path, the original URL, the role, the order, and a **sha256 fingerprint**. The fingerprint lets us skip a photo we already have and notice when a site swaps the picture.

Rules:
- Photos are downloaded **only for kept (leather) products**, resized to about 1000 px on the long edge.
- Re-running the scraper never duplicates a photo (same sha256 = skip).
- A small **check script** lists photo rows whose file is missing, files that no row points to, and products with no photo. Run it after every scrape.

## 5. How comparison works (the lookup)
1. You send a photo or description.
2. I look at it and extract attributes (type, colour, material, sole, closure, toe shape).
3. Query: `products` where those attributes match and `is_leather = yes`, joined to each product's **latest** `price_snapshots` row.
4. Return low / median / high price, number of comparables, the comparable photos side by side, the sources, and a confidence note (fewer than about 10 comparables = weak range).
5. Prices are **asking prices**, not sales. Sales signals come from comparing snapshots over time (stock changes), see scraping-rules section 8.

## 6. Why SQLite
Built into Python, no server, one file, easy to back up, and a database is built for exactly this kind of comparison across sites and dates. If Blue's live store later needs the data, it exports cleanly to Postgres. View it with a free VS Code SQLite extension, or export any query to CSV for Google Sheets.

## 7. Vectors (image embeddings): later, only if needed
Attributes can miss look-alikes. If testing on real Apex items shows that, add **one column** in the same file holding each photo's embedding (from an image model such as CLIP) and rank filtered results by visual similarity. At a few thousand products, plain Python compares them in milliseconds, so no separate vector database server is needed. Vectors cannot tell leather from PU, so the `is_leather` filter always runs first.

## 8. Files and folders
```
Web Scraping/
  data/apex/products.jsonl     raw, append-only
  data/apex/run.log            live progress
  data/photos/apex/<product_id>/   kept photos
  market.db                    the database (rebuildable)
  check.csv                    ambiguous-material items for the user to judge
```

## 9. Open items
- Which attributes to extract at scrape time vs at lookup time (recommended: at scrape time, leather items only).
- Final attribute vocabulary (the allowed values for type, sole, closure, toe shape), decided after looking at Apex's real products.
- Image storage size check once the first run finishes.
