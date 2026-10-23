---
tags: [resource, rules, web-scraping]
up: "INDEX"
---
# Scraping rule sheet (central, every project, every site)

Read this before scraping any site. Rules the user stated are marked **(user)**. Theory lives in problems-and-fixes; this sheet is what we do. First built 2026-10-01 for Blue by Fable (leather shoes).

## 0. Before anything
1. ~~Site must be in the registry.~~ **REMOVED by the user, 2026-10-05.** Still add a row to sites when convenient, as a record, not a gate.
2. ~~Nothing is fetched until the user says go.~~ **REMOVED by the user, 2026-10-05.** A scraping request is the go.
3. **Pick the model with the best record** for this task in model-log; log the run afterwards and ask for a rating.

## 1. Blocks and personal data (the robots/terms permission check was REMOVED by the user, 2026-10-01: no per-site permission gate any more)
- **Blocks (revised 2026-10-01):** a 429 (slow down) is handled by backing off, retrying, and if needed pausing and resuming later; we do not stop the whole run for one 429. On a hard block (repeated 403, CAPTCHA, ban) the script pauses and reports to the user. Claude does **not** build proxy rotation, user-agent/fingerprint spoofing or CAPTCHA solving to defeat a block. Options after a block: wait and resume later, slow down further, or contact the site owner.
- No personal data (names, emails, photos of people).

## 2. Recon (read-only, before any scraper code)
**The user wants the PRODUCT structure, not the website structure (2026-10-01).** Skip nav trees and site design. Write a short `architectures/<site>.md` (copy _template) covering only:
- The URLs of the in-scope category listings, pagination, item counts.
- Product fields available on a product page.
- **How data loads:** View Source first. In the HTML = `requests` + BeautifulSoup. Hidden JSON in the Network tab (XHR) = call it directly. JavaScript-only = Playwright (`playwright-cli`, real Chrome).
- **Screenshots (user):** one listing page and one product page per site, plus any page that breaks the scraper, to `screenshots/<site>/<site>-<page>-<viewport>.png`.
- **Canvas (user):** build the canvas around **products**, grouped by product type (oxford, loafer, boot, wallet, belt...), with product photos as nodes labelled with price and source site, so items can be compared side by side. A small second group shows the scraper flow (fetch, parse, filter, save). Use the `obsidian:json-canvas` skill.

## 2a. Order of work (user, 2026-10-01)
1. **Shoes first, as the pilot.** Build the product database and lookup for leather shoes/accessories and check that it works.
2. Competitor *website* structure is deferred until we build the upload/store side.
3. Later: Blue's product upload calls the lookup, so a new product gets a market price package before it is priced.
4. Only after shoes work: repeat for other categories (shirts, Henleys, etc.) with their own competitor databases.

## 2b. Product database and market lookup (user, 2026-10-01)
Goal: given a photo or description of any shoe, return a market package whatever its name.
- One row per product, with a **structured attribute set** extracted from the photo and text (type, colour, material, sole, closure, toe shape, brand), alongside price, source site and photo paths.
- **Lookup:** extract the attributes from the user's photo/description, filter the database, then report low/median/high price, the comparable photos, sources, number of comparables and a confidence note. Fewer than about 10 comparables = say the range is weak.
- Web search supplements the database but is a weaker source (US-only tool, few Bangladeshi shops). ~~Never scrape Google Images/Shopping.~~ **REMOVED by the user, 2026-10-06:** Google Images/Shopping may be searched and scraped.
- Photo matching finds similar items, not identical ones. Add an image-similarity tool only if the database outgrows manual attribute matching.
- Prices are asking prices, not sales.

## 3. Politeness (always)
- Browser-like `User-Agent` and `Accept-Language`, `requests.Session()`.
- Random delay 1.5 to 3 s between requests. Never parallel hammering.
- Retry 429/503 with backoff (2, 4, 8 s, then give up), honour `Retry-After`.
- Test on one category (about 20 items) before any full run.

## 4. What to collect (per item)
Name, brand, category, price, sale price, sizes **with stock per size**, colours, material text (raw), rating, review count, badge, position in "best selling" sort, product URL, photo URLs, **scrape date on every row**.

## 5. Filtering to the scope (leather example, user)
1. Collect only scope-relevant categories (never fetch the rest).
2. Keep an item only if the text states genuine leather ("genuine / full grain / cow / pure leather").
3. Drop PU, synthetic, faux, rexine, leatherette. Dropped items get **no photos**.
4. "Leather" mentioned but unclear goes to `check.csv`, not the main list; the user decides by hand.
5. Always store the raw material text so rules can change without re-scraping.

## 6. Data pipeline
```
1 COLLECT  -> data/<site>/products.jsonl  (raw, append-only, never edited)
2 CLEAN    -> data/<site>/products.csv    (price as number, sizes list, leather flag)  + check.csv
3 SORT     -> user opens CSV in Excel/Sheets
4 ANALYSE  -> one summary pass (price tiers, popularity, gaps), then the on-demand lookup in 2b
```
- Append each row as it is scraped so the user watches the file grow live in VS Code; progress in `run.log`.
- Dedupe by product URL; re-runs must be safe.
- Photos: only for kept items, resized, saved as `photos/<productid>-<n>.jpg`. **Private research only, never reused on a live site.** Allowed use (user, 2026-10-01): comparing the user's own product photos against them for market research. Keep them local: never in Blue/Fable code or any git repo, never in shared links, Drive folders or published pages.

## 7. Fail loudly
- Zero rows, or a missing selector = crash with a clear message, never a silent empty CSV.
- Handle missing fields (`select_one` can return `None`).
- Prefer stable selectors: ids, `data-*`, `ld+json` over styling classes.

## 8. Popularity and margin (what we can and cannot know)
- Competitors never show sales or cost. Popularity = proxies: review count, best-seller badge/sort position, sizes sold out, **stock change between two runs** (repeat the scrape after 1 to 2 weeks; one run is a snapshot, two runs show movement). Heavy discounting is a weak, ambiguous signal.
- Margin = their price minus **our own sourcing cost**. Add `our_cost` and `margin` columns once the user has costs. Category price spread shows pricing room, not margin.

## 9. After every run (do not skip)
- Add a line to the Web Scraping project's `run-log.md` after **every step**, not just every run (user asked for a step-by-step log, 2026-10-01).
- Update sites row: status, verdict, how data loads, last run.
- Update the site's architecture note and result.
- Append every problem to problems-log the moment it happens, before fixing, with a screenshot if the page shows it.
- Append a model-log row; ask the user for a rating.

## 9a. Obsidian layout and colour (user, 2026-10-01)
- **One folder per site** under `Projects/Web Scraping/sites/<site>/`: hub `<site>.md`, `<site>-recon.md`, `<site>-run-log.md`, `<site>-problems.md`, `<site>.canvas`. Local scripts and data under `Desktop\Web Scraping\sites\<site>\`. The vault must keep growing as a clear pathway; register every site in sites.
- **Everything scraping is teal `#00C2B8` (changed from gold 2026-10-01, gold was too close to Fable's yellow):** CSS snippet `scraping-teal` (file explorer), graph colour groups (Web Scraping folder, Blue by Fable, this sheet), and every canvas group/node gets `"color": "#00C2B8"`.

## 10. Working style for scraping projects (user)
Claude writes the script; the user reads every line. Small steps, one new idea at a time, plain-word comments on every variable and function, explain breakage before fixing, wait for "I understand".
