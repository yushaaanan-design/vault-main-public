---
up: "[[Web Scraping]]"
---
# State: Web Scraping (updated 2026-10-01)

**Read scraping-rules (central rules) and [[run-log]] (every step, what is done and next) first.**

## RESUME HERE (saved 2026-10-08, after a long session): the Instagram reel pipeline on this PC
The user switched to a new pipeline: **send a reel link to a private Telegram bot, it is saved on this PC, then analysed and filed.** Decision (user, 2026-10-08): run it on THIS PC with plain Python, no n8n and no VPS (Instagram blocks server IPs more than home ones). The older n8n design stays in [[reel-pipeline-context]] as the long-term plan.
**Proven today:** `yt-dlp --cookies` downloaded a real reel (4.2 MB, 1080x1920, sound) into `C:\dev\reels\1-inbox\`. Session cookies are at `C:\dev\reels\cookies.txt` (SECRET: never print, paste or commit; valid to 2027-10-08; the user accepted the account risk; details in [[Instagram Campaign Scraping/STATE|Instagram STATE]]).
**UPDATE 2026-10-08 ~6:14 AM: steps 1 and 2 DONE.** Bot `@yusha_reel_saver_bot` exists, token saved, bot running and paired; link receive/dedupe proven. Only a fresh Instagram reel download through the bot is untested, then step 3. Screen control (Windows-MCP) is now TESTED and works (use App mode=switch, not taskbar clicks).
**Built (was not running, now running):** `C:\dev\reels\bot\reel_bot.py` (stdlib only; Instagram/YouTube/TikTok links or a video file under 20 MB; owner pairing by one-time code; 30 s gap between Instagram downloads, 10 min pause on 429, stop on a login challenge; `--selftest` passes). Helpers `start-bot.cmd`, `stop-bot.ps1`. **The token file `.telegram-token` is still EMPTY: the bot does not exist yet.**
**NEXT STEPS, in order:**
1. Create the bot: in Telegram Desktop, chat with @BotFather: `/newbot`, name `Reel Saver`, a username ending in `bot`; save the token ONLY into `C:\dev\reels\bot\.telegram-token` (never in chat). Exact task text for a computer-use session: `C:\dev\reels\bot\TELEGRAM-SETUP-TASK.md`.
2. Run `C:\dev\reels\bot\start-bot.cmd`, read `pair-code.txt`, send `/start <code>` to the bot, then send a reel link and check the file lands in `1-inbox`.
3. Then wire analysis (audio, Whisper words with times, frames, cuts, timeline: an earlier run exists in `C:\dev\reels\3-analysed\yt_Y2gLUMjhiBs`), the classifier and the vault inbox. Design: [[Instagram Campaign Scraping/reel-analysis-pipeline|reel analysis pipeline]].
**Screen control (so Claude can do step 1 itself):** the Windows-MCP server (CursorTouch, v0.8.5) is installed for THIS project only, local scope, telemetry off, tools PowerShell/Registry/FileSystem/Scrape/Process/Clipboard excluded; its tools were listed as available in the session but are **untested**. Test order: screenshot, open Notepad, type one line, then the BotFather steps. Anything on screen could try to steer it: use it only on the user's instruction. Also on: Claude desktop app computer use (flag `chicagoEnabled`), not used yet; Dispatch (phone to PC, needs Pro, included) not set up; Claude Code updated to 2.1.293. Repo notes: `Resources/github-repos.md` (2026-10-08).
**Open questions for the user:** control the phone too (Android debug tools) or PC only; first reel batch size; vision step for frames (local model or Claude in session).
**Same day, other threads (all logged in their own notes):** Chelsea boot 3D + tech pack ([[Projects/img2threejs/STATE|img2threejs]]); Ares phone page now the PC node map with a to-do button and a new icon, server restarted, stray `http.server` on port 8765 killed ([[Projects/Virtual Assistant/STATE|Virtual Assistant]]); separate vault `C:\CONTENT VAULT` created for the three kinds of content, four notes moved with stubs; top to-do item "3D model of every product on the Fable website"; MUN loop cron deleted (does not run now); animation sound/animals plan awaits the user's go ([[Projects/Documentary/Documentary STATE|Documentary]]).

## What this project is now
Competitor **market research for Blue by Fable** (leather shoes + leather accessories, men only). Goal: a product database (photos, attributes, prices, popularity) and a lookup: give a photo, get a market price package. Design: [[architecture]], architecture.canvas, [[database-architecture]], database.canvas.

## Where we are (Apex pilot, site = apex4u.com)
- Permission check and recon DONE ([[architectures/apex]], [[sites]]). OK to scrape politely; data is in plain HTML; Material field decides leather; page shows viewed/bought counts.
- Listing pages are capped at 20 products, so URLs come from the sitemap (2,730), pre-filtered by URL name to 1,737.
- **Script 1 `apex_urls.py`: written and run.** Output in `Web Scraping/data/apex/` (`urls.txt`, `skipped_urls.txt`).
- **Script 2 `apex_fetch.py`: full run DONE 2026-10-01** (1,637 products, 76 gone, 0 blocked).
- **Scripts 3 to 5 + `run_apex.py` written and run.** Clean found 854 leather items (after fixing a next-line material bug). Photos, DB and export DONE 2026-10-02; see [[run-log]].
- Pillow installed; photos resized to 1000 px.

## Decisions to remember
- **Blocks:** back off and retry on 429; on repeated 403 the script stops and reports. Claude does NOT build proxy/fingerprint/CAPTCHA evasion (user asked once to "find a way around"; declined, see scraping-rules section 1).
- Photos are private research only, kept local, never in Blue/Fable or any git repo or shared link.
- No cost to run scripts (local Python). Cost = user's internet data (~500 MB) and Claude usage when I read results or look at photos.
- Python only for now; `requests` + `bs4`; SQLite database `market.db` (no setup needed). Vector layer only if attribute matching proves too weak.
- Competitor sites later, one at a time: Bay, Jennys, others. Bata parked (too big, mostly non-leather). Each site gets an architecture note, a row in [[sites]], screenshots, and a line in [[run-log]] after every step.

## Open
- Extract photo attributes at scrape time (my recommendation: leather items only) or only at lookup time: user has not answered.
- Attribute vocabulary (type, sole, closure, toe shape) to fix after seeing real Apex products.
- User's sourcing costs per item type (for the margin columns): later.

## UN Security Council resolutions (MUN vault, 2026-10-04)
Scraper now lives in `C:\dev\MUN assistant\` (moved 2026-10-04), written, not run. Plan and status in MUN Vault (C:\dev\mun-pipeline\docs\STATE.md). Instagram campaign scraping raised too: [[Instagram Campaign Scraping/STATE|STATE]], not started.

## Practice project (older)
`scrape.py` + `books.csv` (books.toscrape.com). Done 2026-09-30. See [[how-it-runs]], [[problems-and-fixes]].

## All sites, 2026-10-01 (details in [[sites]], data in `data/<site>-products.md`)
| Site | Leather kept | Photos | Status |
|---|---|---|---|
| Apex | 854 | 4,948 | done (DB built, checks clean) |
| Toffpark | 202 | 1,107 | done |
| Bata (leather categories only) | 296 | 1,234 | done |
| Wears Zone | 36 | 110 | done |
| PS Leather | 6 | 29 | done |
| Bay | n/a | n/a | skipped by user |
| Jennys | n/a | n/a | no shop to scrape |
Open decisions for the user: Wears Zone/Toffpark/Bata `check` items; "Action Leather" at Bata; whether the attribute extraction happens at scrape time.

## Image-matching lookup: BUILT, now lives in the Marketlens project (2026-10-02)
- Web Scraping side is done: `clip_index.py` (7,428 photos embedded into `data/clip/vectors.npy` + `index.json`, 0 failed), `lookup.py`, `clip_test.py`, `clip_try.py`, canvases `clip-lookup.canvas` and `assets-architecture.canvas` (plus a public fake-data copy for posting).
- The app that uses it is **Marketlens** (separate vault folder `Marketlens/`, repo `Desktop/Marketlens/`): FastAPI + React, reads this project's databases and CLIP index read-only. Do not move `data/clip/` without updating Marketlens' `DATA_ROOT`.
- Python on this PC: `torch` and `open_clip_torch` work; `scipy` and `sentence-transformers` do NOT (Windows Application Control blocks a scipy DLL, see problems-log).
- Next for scraping, when wanted: more shops and more of the thin kinds (boots 45, sneakers 15), driven by Blue by Fable's product types; re-scrape every 2 to 4 weeks (prices are from 2026-10-01).
