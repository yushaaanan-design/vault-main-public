---
up: "[[Web Scraping]]"
tags: [web-scraping, architecture]
---
# Architecture: the whole system in one page

Visual versions: architecture.canvas (everything connected) and database.canvas (tables, photos, lookup). Table detail: [[database-architecture]]. Rules: scraping-rules. Status: **design, nothing built yet** (2026-10-01).

## The goal
Give me a photo or description of any leather shoe or accessory, and get back the market price range and comparable products, whatever they are called. Pilot: leather shoes, source: Apex. Later it plugs into Blue's product upload.

## The five layers (left to right on the canvas)
| # | Layer | What it is | Where it lives |
|---|---|---|---|
| 1 | Rules and notes | The rule sheet, site list, problems log, model log | the vault |
| 2 | Sources | Competitor sites. Apex first; Bay, Jennys later; Bata parked | the internet |
| 3 | Scraper | Python: permission check, recon, fetch, leather filter, attributes, photos | `Web Scraping/` code folder |
| 4 | Storage | Raw file, SQLite database, photo files, check list | `Web Scraping/data/` and `market.db` |
| 5 | Use | The market lookup, viewing tools, Blue's upload (later) | me, VS Code, Sheets |

## One scrape, start to finish
1. Add the site to [[sites]]. Check robots.txt and terms. Stop if the site says no.
2. Read-only recon: leather category URLs, product fields, how the data loads. One listing and one product screenshot.
3. Fetch the leather categories politely (delay, retries). Append each product to the raw file as it arrives, so you watch it grow.
4. Filter: keep genuine leather only. Unclear items go to `check.csv`.
5. Extract attributes for the kept items.
6. Download photos for the kept items. Name them by product id, record their fingerprint.
7. Load products, photos and a price snapshot into `market.db`.
8. Run the check script (missing photos, orphan files). Log any problem in [[problems-log]], update [[sites]], log the model in model-log.

## The five scripts (Apex; same pattern for later sites)
Each script does one job, so you read and understand one piece at a time, and a mistake in one does not force a re-scrape.

| # | Script (in `Web Scraping/`) | Job | Reads | Writes | Touches their server? | Status |
|---|---|---|---|---|---|---|
| 1 | `apex_urls.py` | Product URLs from the sitemap; skip obvious non-leather by URL name | their sitemap | `data/apex/urls.txt`, `skipped_urls.txt` | 1 request | **done** |
| 2 | `apex_fetch.py` | Visit each page (1 to 1.5 s gap, retries, resumable, stops on a block); pull name, brand, SKU, price, colour, sizes, materials, viewed/bought counts, photo URLs | `urls.txt` | `products.jsonl`, `run.log` | yes, ~1,737 pages | next |
| 3 | `apex_clean.py` | Leather filter on the Material field; price as a number, sizes as a list | `products.jsonl` | `products.csv`, `check.csv` | no | later |
| 4 | `apex_photos.py` | Photos for kept leather items only, resized, named by product id, sha256 fingerprint | `products.csv` | `photos/` | yes, photos only for kept items | later |
| 5 | `apex_load_db.py` | Load products, photos and a price snapshot into the database; run the check script | CSV + photos | `market.db` | no | later |

Pipeline: `1 -> 2 -> 3 -> 4 -> 5`. Rerunning only script 3 is enough when the leather rule changes. Script 2's raw file is never edited.

Later, outside the five: the **check script** (missing photos, orphan files, products with no photo) and the **lookup** (you send a photo, I query the database). New sites reuse scripts 3 to 5; only the fetch script differs per site.

Live status of each script: [[run-log]].

## One lookup, start to finish
You send a photo, I extract its attributes, the database returns matching leather products with their latest prices, and I give you low / median / high, the comparable photos, sources and a confidence note. Fewer than about 10 comparables means a weak range, and I say so.

## Concepts, in plain words (we learn these together)
- **Scraper:** a script that visits web pages like a browser and copies out the data we want.
- **JSONL:** a text file with one record per line. Safe to append to, easy to read. Our raw backup format.
- **SQLite:** a whole database inside one file. No server to run. Good for private research data.
- **Table / row / column:** a table is a sheet, each row is one thing (a product), each column is one fact about it.
- **Primary key:** the unique id of a row, like `apex-oxford-204`. Nothing else shares it.
- **Foreign key:** a column that holds another table's primary key, like `product_id` in `product_photos`. That is how a photo points to its product.
- **Snapshot:** one reading of a price on one date. Many snapshots of the same product show price and stock changes over time.
- **sha256:** a fingerprint of a file. Same photo, same fingerprint. Lets us skip duplicates and notice swapped pictures.
- **Attribute matching:** comparing products by facts (type, colour, material) instead of by name.
- **Embedding / vector:** a list of numbers describing how an image looks. Similar photos get similar numbers. Added later, only if attributes miss look-alikes.

## What is NOT decided yet
- The allowed values for type, sole, closure, toe shape (after we see Apex's real products).
- Whether attributes are extracted at scrape time (recommended, leather only) or at lookup time.
- Price range, Bangladeshi sizing, and the image-storage choice for Blue's live site.
