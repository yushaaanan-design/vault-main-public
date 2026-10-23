---
up: "[[INDEX]]"
tags: [project, instagram, web-scraping]
---
# State: Instagram campaign scraping (raised 2026-10-04)

**Goal (user):** give access to the user's Instagram and scrape a brand's Instagram account to analyse its campaign. Separate from the MUN vault.

Workflow (colour-coded): [[Instagram Campaign Scraping/workflow.canvas|workflow]]. Colour: teal like all scraping.

## Not started. Open before anything runs
- Read [[scraping-rules]] and register Instagram in [[sites]] (nothing is fetched until the user says go).
- Approach is undecided: Instagram's terms restrict automated collection and a logged-in scrape risks blocking the user's own account. Options to weigh: Meta Ad Library / Content Library, the Graph API (own business accounts), or manual saving for a small set. The user must decide, and the account log-in is the user's to handle (never paste credentials in chat).
- Where the videos go (private folder only) and how to analyse them (transcripts via Whisper, hooks, formats). Related item already on the to-do list: "Instagram video downloader for campaign analysis" under Virtual Assistant.
- Which brand and which campaign: not named yet.

## Notes
- [[Instagram Campaign Scraping/reel-analysis-pipeline|Reel analysis pipeline]] (free tools, rubric), added 2026-10-05.

## 2026-10-08: access set up (the user's decision and risk)
- The user chose to give yt-dlp their Instagram session and accepted the account risk. Method: the open-source Chrome extension 'Get cookies.txt LOCALLY' (kairi003, store link taken from its own GitHub README) exported the cookies of the user's already-logged-in Chrome. No password was ever typed or pasted anywhere.
- File: `C:\dev\reels\cookies.txt` (outside OneDrive, vaults and git; access limited to the user's Windows account, SYSTEM and Administrators). Contains a `sessionid` valid until 2027-10-08. NEVER print, paste or commit it. To cut access: log out of Instagram in that Chrome (this ends the session) and delete the file.
- Use: `yt-dlp --cookies C:\dev\reels\cookies.txt <reel link>`. Pace: one reel about every 30 s, back off on 429, stop and tell the user on a hard block or a login challenge. No proxy rotation, fingerprint spoofing or CAPTCHA solving (scraping-rules section 1).
- Not tested yet: waiting for the first reel link.

- **2026-10-08 first test: SUCCESS.** One public reel link (share token stripped) downloaded with `yt-dlp --cookies` from this PC (home IP): `C:\dev\reels\1-inbox\DeL9MAfINkC.mp4` (4.2 MB, 1080x1920, 16.4 s) + info json. Gotcha: `--print` implies simulate, add `--no-simulate` or nothing downloads. Not yet tested: the same link WITHOUT cookies, a private reel, volume (many in a row), the Telegram bot, the VPS (Instagram blocks datacentre IPs more than home ones).

- **2026-10-08 Telegram bot (PC, no n8n):** `C:\dev\reels\bot\reel_bot.py` written and self-tested (link parsing incl. look-alike domains); token file empty, bot not created yet. Resume steps are in [[Web Scraping/STATE|Web Scraping STATE]] (top block).
