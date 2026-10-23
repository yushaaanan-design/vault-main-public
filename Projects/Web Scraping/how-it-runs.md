---
up: "[[Web Scraping]]"
tags: [web-scraping]
---
# How the scraper runs, and how it is built

Code: `C:\Users\yusha\OneDrive\Desktop\Web Scraping\scrape.py` (one file, 13 lines). Status: [[Projects/Web Scraping/STATE|STATE]].

## Run it
1. Open a **new** terminal (PowerShell or Windows Terminal). New, so it picks up Python's PATH entry.
2. Go to the folder and run the file:
```
cd "C:\Users\yusha\OneDrive\Desktop\Web Scraping"
python scrape.py
```
3. Output: one line per book, `Title | £price`, 20 books (one page).

If `python` is "not recognized": the terminal is old, close and reopen it. Fallback: `& "$env:LOCALAPPDATA\Programs\Python\Python313\python.exe" scrape.py`.

If `£` shows as `�`: the terminal's code page, not the data. Run `$OutputEncoding = [Console]::OutputEncoding = [Text.Encoding]::UTF8` first.

## Setup (already done, only for a new machine)
- Python 3.13 from python.org (tick "Add to PATH").
- `python -m pip install requests beautifulsoup4`

## Architecture
```
scrape.py
  Internet ──(1) requests.get(url)──> raw HTML text
                 (2) BeautifulSoup(html) ──> searchable tree
                       (3) select("article.product_pod") ──> list of book cards
                             (4) per card: title + price ──> print
```

| Step | Line | What it does | Why |
|---|---|---|---|
| 1. Fetch | `requests.get(url, timeout=10)` | Downloads the page like a browser would | `timeout` stops it hanging forever on a dead site |
| Check | `raise_for_status()` | Crashes loudly on 404/500 | Better than silently parsing an error page |
| Decode | `res.encoding = "utf-8"` | Tells requests how to read the bytes | Site doesn't declare it; the guess turned `£` into `Â£` |
| 2. Parse | `BeautifulSoup(res.text, "html.parser")` | Turns HTML text into a tree you can query | `html.parser` is built into Python, no extra install |
| 3. Select | `soup.select("article.product_pod")` | CSS selector: every `<article class="product_pod">` | Each one is a book card |
| 4. Extract | `book.h3.a["title"]`, `.price_color` text | Pulls fields out of one card | Title is in an attribute (the visible text is cut off with "..."); price is the text of an element |

## Libraries
| Library | Job |
|---|---|
| `requests` | HTTP: fetch the page |
| `beautifulsoup4` (imported as `bs4`) | Parse HTML, find elements |

## Limits (known, on purpose)
- **One page only.** The site has 50 pages; pagination is not built.
- **Prints, does not save.** No CSV/JSON output yet.
- **Static HTML only.** Sites that build their content with JavaScript need a browser tool (Playwright), not `requests`.
- **Practice site.** books.toscrape.com exists to be scraped. For a real site, check its `robots.txt` and terms first, and add a delay between requests.
