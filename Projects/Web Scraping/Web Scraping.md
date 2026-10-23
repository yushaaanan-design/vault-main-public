---
tags: [project, web-scraping]
type: project
status: just started, no scrapers built yet (see STATE)
up: "INDEX"
---
# Web Scraping (project node)

Up: INDEX (the vault root, which lists every project). Everything about the web scrapers hangs off this note. Graph colour: **pink** (see Graph Legend).

> [!tip] Start here
> Read [[Projects/Web Scraping/STATE|STATE]] first (where we are, what is next). Then open **one** note from the table below.

| Need | Note | Read when |
|---|---|---|
| Current status, next step, blockers | [[Projects/Web Scraping/STATE\|STATE]] | Start of every session on this project |
| How to run `scrape.py`, line-by-line architecture, limits | [[how-it-runs]] | Running or changing the scraper |
| The 3 main scraping problems (blocking, JavaScript pages, fragility), fixes, learning order, legal checklist | [[problems-and-fixes]] | Scraping a new site, or a scraper gets blocked or returns nothing |

| **The rule sheet**: how we scrape any site (central, all projects) | scraping-rules | Before every scrape; it overrides ad-hoc habits |
| **The whole system on one page** (layers, one scrape, one lookup, concepts in plain words) | [[architecture]] | Start here to understand how everything fits |
| Canvas: everything connected (rules, sources, scraper, storage, use) | architecture.canvas | Seeing the full flow |
| Canvas: tables, photo links, lookup steps | database.canvas | Seeing how data and images connect |
| **How the market database works**: tables, how every photo ties to its product, how a lookup compares, why SQLite | [[database-architecture]] | Building or querying the database, or asking "how does it all fit" |
| **Step-by-step run log**: every step done so far and what is next, per site | [[run-log]] | Checking progress; update after every step |
| Every site scraped or planned, status, verdict, screenshots | [[sites]] | Before starting any scrape; update after every run |
| One architecture note per site (site structure, how our scraper works, problems, screenshots) | architectures/_template | Starting recon on a new site |
| Problems we actually hit, symptom to fix | [[problems-log]] | Something breaks (log it first), or before scraping a similar site |

> [!important] Standing rules (stated by the user 2026-10-01)
> 1. Every site gets its own architecture note (site structure + our scraper's flow + problems hit).
> 2. Keep [[sites]] current: no scraping a site that is not listed.
> 3. Log every problem in [[problems-log]] when it happens.
> 4. Take screenshots whenever possible (home, listing, product, and any page that broke the scraper).

Add one row per new note here, not in INDEX. Project-only notes stay in `Projects/Web Scraping/`.

## Shared notes this project uses
working-style · backend-style · security-notes · Learning path · github-repos

## Scraped data (Markdown export)
- [[apex-products]], [[toffpark-products]], [[wearszone-products]], [[psleather-products]] [[bata-products]]. Check lists: [[toffpark-check]], [[wearszone-check]], [[bata-check]]. Live timer: [[LIVE tracker]].

## Market map + keys
- [[market-overview]] (mega canvas: every type, prices, sites)
- [[attribute-keys]] (the comparison keys and how much data fills each)
