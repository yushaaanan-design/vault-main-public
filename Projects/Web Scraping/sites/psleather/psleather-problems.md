---
up: "[[psleather]]"
tags: [web-scraping, problems, psleather]
---
# PS Leather problems

| # | symptom | cause | fix |
|---|---|---|---|
| 1 | robots.txt Sitemap points at bestbiponi.com | platform misconfiguration; bestbiponi.com is an unrelated WordPress shop with an expired TLS certificate (python requests refused it) | ignored that domain entirely; product URLs read from the shop's own listing pages |
| 2 | `curl` gets 406 Not Acceptable; psleather.com/sitemap.xml 404 | server rejects curl's default headers; no sitemap exists | use a normal browser User-Agent via requests; no sitemap needed (catalogue is 6 items) |
| 3 | Clean step dropped all 5 loafers as "no" although the text says 100% genuine leather | Bengali letter ড় is spelled with different Unicode (one character vs two) in the page and in my word list, so "চামড়া" never matched | normalise both with NFC before comparing (psleather_clean.py) |
