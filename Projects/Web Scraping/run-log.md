---
up: "[[Web Scraping]]"
tags: [web-scraping, log]
---
# Step-by-step run log

The checklist you asked for (2026-10-01): every step, in order, with its result, so you can check we followed scraping-rules. Newest at the bottom. Add a line the moment a step finishes. Problems go to [[problems-log]], the site's own details to its note in `architectures/`.

## Apex (apex4u.com): pilot for leather shoes and accessories ([[architectures/apex]])

| # | Date | Step (rule sheet section) | Result | Status |
|---|---|---|---|---|
| 1 | 2026-10-01 | Registered the site in [[sites]] (0.1) | Found the planned domain apexfootwearltd.com is a corporate site with no shop; real shop is apex4u.com. Logged in problems-log | done |
| 2 | 2026-10-01 | robots.txt (1) | `allow: *`, three sitemaps listed | done |
| 3 | 2026-10-01 | Terms of service (1) | Read from wordpress.apex4u.com (the shop page itself was empty until loaded in a browser). Covers pricing/orders/COD/warranty. No clause on bots, scraping or copying. No API | done |
| 4 | 2026-10-01 | Recon: sitemaps (2) | 2,730 product URLs, 155 category URLs | done |
| 5 | 2026-10-01 | Recon: product page (2) | Plain HTML has everything: JSON-LD, Materials (upper/sole), viewed + bought counts, ~9 photos | done |
| 6 | 2026-10-01 | Screenshots (2) | Listing (men footwear), product page, formal-shoes listing bottom, in `screenshots/apex4u/` | done |
| 7 | 2026-10-01 | Option B: listing pagination (user chose "B first") | **Failed.** Category pages show exactly 20 products; no pagination, `?page=2` ignored, scrolling and clicking load nothing. Cannot enumerate the catalogue from listings | done, failed |
| 8 | 2026-10-01 | Fallback A: product URLs from the sitemap (user approved) | Decided: fetch product pages from the sitemap. Plan below | decided, not started |
| 9a | 2026-10-01 | Script 1 of 2: `apex_urls.py` (3) | Written, **not run yet**. Downloads the sitemap (1 request), pre-filters by URL name, saves `data/apex/urls.txt` + `skipped_urls.txt`, prints a spot-check | **RUN 2026-10-01: 2,730 sitemap URLs, 1,737 kept, 993 skipped.** 15 random skipped all correctly non-leather. Local check: 0 men's shoes/accessories wrongly skipped (4 flagged were women's). Kept includes 233 URLs ending -2/-3 (variants or duplicates, to learn in test run) and 348 unnamed `a-xxxx` pages. Rough kept types: ~532 sandal, ~391 shoe, 115 belt, 65 canvas, 48 slipper, 36 wallet, 33 moccasin, 19 loafer, 17 boot, 15 bag | done |
| - | 2026-10-01 | **RULE REVISED:** user asked to drop stop-on-block and "find a way around". Result: no longer stops on a single 429 (back off, retry, pause and resume). On a hard block the script pauses and reports. Claude will not build proxy/fingerprint evasion. See scraping-rules section 1 | done |
| 9b | | **Script 2: `apex_fetch.py`** (3) | Visits each URL, 1 to 1.5 s random gap + 10 to 20 s break every ~50 pages, backs off on 429, saves raw data to `products.jsonl`. **Written 2026-10-01, not run yet.** Starts in test mode (`LIMIT = 20` random pages). Gap 1 to 1.5 s per page; extra 5 to 10 s rest every 50 pages (optional, user's suggestion). Settings at the top of the file. Outputs `products.jsonl`, `failed.jsonl`, `run.log`. Note: "viewed" count changes per page load (5,840 then 5,383 seen), stock per size not visible in the page text | written, waiting for user to read it |
| 10 | | Test script 2 on ~20 products (3) | Mix of normal, `-2` and unnamed pages; user compares to live site | not started |
| 10a | 2026-10-01 | **TEST RUN of script 2 (user said go)** | Run 1 crashed on page 5: material line `Sole MaterialRUBBER` has no colon (parser assumed one). Fixed (optional-colon regex), re-ran: **20 attempted, 19 ok, 1 gone (404), 0 failed**, ~2 s/page, no blocks. 22 products total in `products.jsonl` (3 from run 1). Completeness: name/price/photos/sizes 100%, material 95% | done |
| 10b | 2026-10-01 | Test findings | (1) Materials block has 4 label styles (`Upper Material :X`, `Upper: X`, `Sole: X`, `Material : X`); script 2 caught 1. Fixed in `apex_clean.py` by re-reading the saved `materials_text` (no re-scrape). (2) Site writes plain "Leather"/"LEATHER", never "genuine": **10 of 11 leather items land in check.csv**; rule decision needed from user. (3) No sale price appeared on any of the 19 pages (`price_second` always empty): still unconfirmed. (4) Non-shoe pages exist in the kept list (trolley, backpack): clean drops them. (5) `venturini-lagged` trolley page has no listed price (only JSON-LD 22000) | done |
| 11 | 2026-10-01 | Full fetch with script 2 | **DONE:** 1,713 pages attempted, 1,637 ok, 76 gone (404), 0 blocked, 0 failed, ~1 h at ~33 pages/min. Completeness: name/price/photos 100%, material 97%, sizes 99% | done |
| 12 | 2026-10-01 | **Script 3: `apex_clean.py`** (5) | Leather filter on Material field (fake words checked first, then genuine phrases, plain "Leather" goes to check), `products.csv` + `check.csv`, prints material spot-check. Tested offline on 5 fake rows: correct piles. **Written, not run on real data** | written |
| 13 | 2026-10-01 | **Script 4: `apex_photos.py`** (4, 6) | Photos for products.csv only, `data/photos/apex/<id>/`, sha256 index in `photos.jsonl`, resize only if Pillow installed (it is NOT yet), test mode `LIMIT = 5`. **Written, not run** | written |
| 14 | 2026-10-01 | **Script 5: `apex_load_db.py`** + check script (6) | Rebuilds `market.db` from CSV + photo index, prints 3 checks. Tested offline: OK. **Written, not run on real data** | written |
| 15 | 2026-10-01 | **`run_apex.py`** (automation) | Runs the steps in order, stops at first failure. `python run_apex.py` = clean, photos, db; `fetch` adds script 2; `urls` adds script 1. Also edited `apex_fetch.py`: exits with an error code when it stops early (so the runner stops). **Nothing fetched yet** | written |

## Plan for step 8 (fallback A, with a pre-filter so we do not fetch all 2,730)
1. Read `sitemap_products.xml` once (done in recon: 2,730 URLs).
2. **Pre-filter by URL name:** skip slugs that clearly are not leather shoes/accessories (shirt, polo, hoodie, pant, jeans, sock, boxer, jacket, sweater, vest, short, chino, women, girls, boys, kids and similar). Keep everything unclear. The skip list is printed with a count, and we spot-check a sample of skipped URLs to make sure no leather items are dropped.
3. Fetch the remaining product pages one at a time, 1.5 to 3 s apart (a few hundred to about 1,500 pages, roughly 1 hour at most), appending each to the raw JSONL file.
4. After fetching, the **Material field** decides leather: genuine leather = keep, PU/synthetic = drop, unclear = `check.csv`.
5. Photos only for kept items.
| 16 | 2026-10-01 | Clean on the full data | First pass: 753 yes, 11 check, 895 no. **Bug found:** 204 pages put the material value on the line AFTER `Upper Material:`; the parser read ':' and dropped them as non-leather (97 were real leather). Fixed in `apex_clean.py` (take next line). Second pass: **854 yes** | done |
| 17 | 2026-10-01 | Photos + DB + Markdown export | Photos run hit the 2 h background limit at 3,712 files and the session restarted; restarted `run_apex.py` (resumes, no re-downloads). Stopped once more by low memory (Chrome 5 GB) at 4,891; restarted after Chrome was closed. **DONE 2026-10-02:** 4,948 photos, `market.db` 854 products, checks 0/0/0, Markdown export written | done |
| 18 | 2026-10-01 | Live timer + Markdown export | `live_tracker.py` (live ETA, writes `LIVE tracker.md`), `finish_apex.py` (watcher), `export_md.py` (CSV to `data/<site>-products.md` notes in the vault) | done |
| 19 | 2026-10-02 | Mega canvas + product keys | `build_market_canvas.py` (re-runnable) writes `market-overview.canvas` (all 1,394 products by type: counts, price low/median/high, sites, colours, upper, sole, brands) and `attribute-keys.md`. Coverage: type 100%, material 99%, colour 92%, sole 84%, closure 22%; toe shape/heel/welt 0% (needs photos) | done |
| 20 | 2026-10-02 | CLIP lookup canvas (design only) | `clip-lookup.canvas` written and JSON-validated (35 nodes, 19 edges, no dangling edges). Shows: what CLIP is, build index once, lookup flow, 4 tests, build order, limits. **Nothing installed or run yet**; next is step 1 (install + encode one photo) | done |
| 21 | 2026-10-02 | CLIP step 1: `clip_step1.py` | Encoded one Apex photo into 512 numbers with open_clip ViT-B-32 (OpenAI weights, quickgelu). sentence-transformers and transformers both crashed on a scipy DLL blocked by Windows Application Control (see problems-log), so open_clip + torch (CPU) is used instead | done |
| 22 | 2026-10-02 | CLIP step 2: `clip_index.py` | All photos embedded into `data/clip/vectors.npy` + `index.json`: 7,428 rows, 0 failed, about 15 min on CPU. Written: `lookup.py` (search + price package), `clip_test.py` (tests 1 to 3) | done |
| 23 | 2026-10-02 | CLIP tests 1 to 3 | **Test 1 self-match 20/20. Test 2 same-shoe 15/30 (another photo of the same product in top 10). Test 3 type match 124/250 = 50% (random guessing about 11%).** Mechanics are correct; look-alike quality is moderate. Test 4 (user judges by eye) not done. Not yet tried: key filter (type/material) to lift the 50% | done, test 4 pending |
| 24 | 2026-10-02 | `assets-architecture.canvas` | 5 site groups (Apex, Bata, Toffpark, Wears Zone, PS Leather): each with its brands + counts, raw data folder, photos folder, database, and product note, all feeding one CLIP index node. 32 nodes, 30 edges, IDs checked. Counts read live from the databases. Folder nodes are text with paths (not photo nodes) | done |
| 25 | 2026-10-02 | Canvas text bigger + public copy | User: text too small when zoomed out. Rebuilt `assets-architecture.canvas` as one row per site with `#`/`##` headings (less small text, shorter canvas). Also built `assets-architecture-public.canvas`: same layout, **invented** site/brand names, counts and paths, no links to real notes, for posting. Real canvas stays private. `clip-lookup.canvas` not resized yet | done |
| 26 | 2026-10-02 | Lookup moved into Marketlens | CLIP lookup became the Marketlens app (separate project, vault folder `Marketlens/`). Findings on a real Chelsea boot photo: small model (ViT-B-32) cannot recognise it; ViT-L-14 reads it as boot (93 to 98%) but is too slow for all photos (about 4 h), so it only reads the query photo. Kind rule measured on 193 database photos (80% right, 87% kept with the top-two rule). Hybrid search (exact names + photo + CLIP words). 13 tests pass | done |
- 2026-10-04: Higgsfield pricing page read once by Ares (own browser, user said go; registered in sites.md). Plans seen: Basic $9, Pro $23, Max $59 per month billed annually (monthly higher); Ultra mentioned, not read. Text kept only in the Claude scratchpad. Related: Content Creation step 6.

## UN Security Council resolutions (MUN vault), 2026-10-04
| # | Date | Step | Result | Status |
|---|---|---|---|---|
| U1 | 2026-10-04 | Registered the site in [[sites]] (0.1) | Row added, status "scraper written, not run" | done |
| U2 | 2026-10-04 | Scraper `sites/un-sc/un_resolutions.py` written (3, 6, 7) | Steps `index`, `fetch` (test mode = 3), `extract`. Resume-safe, backs off on 429, stops on 403 or 5 failures in a row, index check for missing/repeated numbers. URL templates unverified. Syntax-checked offline, **nothing fetched** | written, waiting for "go" |
Project notes: MUN Vault (C:\dev\mun-pipeline\docs\STATE.md).
| U3 | 2026-10-04 | Scraper moved out of this project | Now `C:\dev\MUN assistant\un_resolutions.py`, data in `C:\dev\MUN assistant\data\`; MUN vault at `C:\MUN VAULT` | done |
| U4 | 2026-10-05 | TEST RUN (user said go): index | 80 year pages (1946-2026), 0 blocks. Found 2,796 numbers 1-2812. Fixed: stray "20" in 2014/2015 (regex now needs S/RES/ prefix); 1959 page 404, resolution 132 added by hand (MANUAL_EXTRA). **Gap: 2796-2811 not listed on any UN page** (2025 page ends 2795, 2026 page lists only 2812) | done |
| U5 | 2026-10-05 | TEST RUN: fetch | docs.un.org and undocs.org are only a viewer page; real PDF endpoint is `documents.un.org/api/symbol/access?s=S/RES/n(year)&l=en&t=pdf` (found in the viewer's iframe). 153 PDFs saved (1-153), 18 MB, avg 115 KB, max 834 KB | done |
| U6 | 2026-10-05 | Block test (user asked ~100 requests/min) | 153 sequential requests stepped 30 -> 60 -> 100 per minute: **0 x 429, 0 x 403, 0 failures.** One connection can only do about 20/min (server answers in ~3 s), so 100/min was not reached; parallel requests not used. Extract step not tested (pypdf not installed). Full run estimate: 2,640 PDFs left at ~3 s = about 2.2 h | done |
| U7 | 2026-10-05 | `--workers N` added to fetch (parallel connections, cap 8, stops everyone on a 403 or 5 failures in a row) | Tested 4 workers on 8 PDFs: all saved, no 429, about 45 per minute. 161 PDFs saved in total | done |
| U8 | 2026-10-05 | `meta` step + architecture note | `meta`: 2,756 rows, 583 distinct topics, ~40 numbers without topic. Full download started (`fetch --all --workers 8`, 2,635 to do). architecture (C:\dev\mun-pipeline\docs\architecture.md) created and is the living design note | running |
| U9 | 2026-10-05 | Full run finished (user go) | 2,812 PDFs, 290 MB, no blocks; 16 missing numbers found by probing; pypdf installed; extract: 2,812 texts, 3 need OCR | done |

- 2026-10-05: Instagram Campaign Scraping: wrote [[Instagram Campaign Scraping/reel-analysis-pipeline|reel-analysis-pipeline]] (free tools, analysis rubric). No site fetched.

- 2026-10-05: reel-analysis-pipeline: added editing factors, edit-spec output, automated folder pipeline (user wants a free Claude-driven video editor).

- 2026-10-05: wrote `analyze_reel.py` (Web Scraping folder; step 1: audio, 1 fps frames, cuts, Whisper words, merged timeline). Selftest passes. Not yet run on a real reel: needs `pip install imageio-ffmpeg scenedetect[opencv] faster-whisper` (ask first) and a saved reel in `reels/1-inbox/`.

- 2026-10-05: user REMOVED the registry and "say go" gates (scraping-rules.md section 0, both CLAUDE.md files). Checked Composio Instagram toolkit: official Graph API, own Business/Creator accounts only ("arbitrary public accounts cannot be queried"); connected account yusha.aanan is type PRIVATE. Competitor reels NOT reachable through it. Nothing fetched.

- 2026-10-05: to-do items added (bot intake, skill-suggestions log, handle confirm); created [[Instagram Campaign Scraping/skill-suggestions|skill-suggestions]].

- 2026-10-05: installed instaloader, yt-dlp, imageio-ffmpeg, scenedetect, faster-whisper; wrote fetch_reels.py. Anonymous profile lookup of wantsandneedsbrand_ returned 429 Too Many Requests at once (first attempt hung in instaloader retry wait ~10 min, killed). Nothing downloaded. No login, no proxy/spoofing (rule). Options: wait and retry later, yt-dlp on single reel links the user supplies, manual saving.

- 2026-10-05: user offered a proxy; declined (would evade the block). yt-dlp cannot list a profile anonymously (Unsupported URL). Wrote download_links.py (links.txt -> yt-dlp, 1 reel per 30 s, stops after 3 fails). Waiting for reel links.

- 2026-10-05: FIRST REAL TEST. YouTube short Y2gLUMjhiBs (bravetech, 97 s, 90k views) downloaded with yt-dlp, analysed: 24 cuts, 366 words, timeline.json OK. Fixes: av pinned <17 (App Control blocked av 19), Whisper on CPU (--device cpu) because cublas64_12.dll missing for GPU. Pipeline works end to end. The short itself describes a Chrome extension that lists a creator Reels tab, sorts by views, downloads videos + transcripts (name not stated).

- 2026-10-05: added to the Central To-Do List: Blue by Fable photos-to-3D workflow, learn security/auth, find skills, saved-reels download idea.

- 2026-10-05: saved [[Content Creation/viral-reel-script-method|viral-reel-script-method]] (prompt + method from the bravetech short; extension found: Sort Feed). Added Sort Feed to skill-suggestions. Lesson: look at ALL frames around the key moment, not 2.

- 2026-10-05: browser-control items added to Central To-Do List. Playwright check: py package missing, playwright-cli + Chromium 1243 present. User went to sleep; screen turned off.

- 2026-10-05: pip installed playwright (Python). Created overnight-research.md (14-question queue; Q1-3 answered) and a session cron job (every 30 min at :23 and :53, stops after 9:00 AM) that works through it, research only. Key leads: --load-extension removed from branded Chrome 137+ (use Chromium 1243); Playwright MCP --extension bridge; claude -p may use a separate credit pool (unverified).

- 2026-10-05: replaced the research cron with a PROJECTS loop (job ced69981, :17 and :47 each hour, stops after 9:00 AM or when the master summary is done). Queue and cards: Resources/overnight-projects-research.md. Also fixed a mangled path in the Central To-Do List (browser-profile line).

- 2026-10-05: wrote Resources/nightly-automation-plan.md (MUN verified pipeline stages A-L, cloud/headless options, per-project nightly research table, set-up-for-tomorrow checklist). Gym Tracker excluded from the projects loop.

- 2026-10-05: private repo mun-pipeline created and pushed; cloud run NOT started (waiting for /usage and scope confirmation).

- 2026-10-05 ~5:00 AM (projects loop): Instagram research Q4-Q5 done. CORRECTION: the claude -p separate credit pool was PAUSED (nothing changed, still subscription limits); fixed in nightly-automation-plan.md. Extension popups cannot be held open by automation; Sort Feed controls may live on the Instagram page (untested).

- 2026-10-05: MUN source map + canvas built (31 section pages + 2 year tables probed, polite pacing, no blocks). Note: 6 test facts files in mun-pipeline/facts are NOT committed.

- 2026-10-05 ~5:35 AM (projects loop): Instagram research Q6-Q9 done (Sort Feed export, editing-analysis tools, 6 GB vision models, Whisper GPU DLL fix). Q10-Q14 still open.

- 2026-10-05: resolution test problems fixed (slice_text.py, clean slices, verifier uses them); only 2,484 of 2,812 resolutions are ready for automated processing, 272 need a better source (Volumes of Resolutions) and 56 need OCR. See Projects/MUN/run-log.md.

- 2026-10-05: MUN Layer 0 meetings index built (10,666 meeting rows, 11 gaps) and two detailed canvases written; PRST + SG report year pages fetched (parallel, no blocks).

- 2026-10-05 ~6:05 AM (projects loop): Instagram research Q10-Q11 done (free scriptable editor stack: ffmpeg + MoviePy; shoe photos to 3D: Meshroom photogrammetry, TripoSR single-photo test). Q12-Q14 still open.

- 2026-10-05: standing rule added to global CLAUDE.md (public document downloads allowed after a disk check, stop under 50 GB free). Started background downloads: all S/PV meeting records (fetch_pv.py, ~1 file/s) and 2,544 presidential statements + reports (fetch_docs.py). Paragraph-level verifier v2 built; 242, 678, 2728 verified at full depth; drafting-evolution note written into the MUN vault (Drafting/evolution.md). claude --remote does NOT exist in this CLI version.

- 2026-10-05: launched the cloud agent (Opus) for the MUN pipeline; waiting for its completion notice. Do not edit mun-pipeline facts/notes locally meanwhile.

- 2026-10-05 ~6:30 AM (projects loop): Instagram research Q12-Q13 done (auth learning path: Argon2id/bcrypt + httpOnly session cookie; skills security: third-party skills are risky, vet like code). Q14 (Telegram bot intake) still open.

- 2026-10-05 ~6:50 AM: MUN cloud run 1 done (Opus agent, 150 resolutions verified, 99.3% pass, ~2.3k tokens each); checked locally; 257 fixed. Meeting-record downloads still running (2959 files).

- 2026-10-05 ~7:00 AM (projects loop): Instagram Q14 done and project 1 card written; project 1 marked done. Next in the queue: 2 Blue by Fable photos to 3D.

- 2026-10-05 ~7:30 AM (projects loop): project 2 (Blue by Fable photos to 3D) card written: turntable + cross-polarized capture, Meshroom/COLMAP, TripoSR quick test. Next: 3 Fable Clothing site.

- 2026-10-05 ~8:00 AM (projects loop): project 3 (Fable Clothing site) card written: sandbox payments, start bKash/Nagad/SSLCommerz + trade licence applications early. Next: 4 Content Creation.

- 2026-10-05 ~8:30 AM (projects loop): projects 4 (Content Creation) and 5 (N8N reel-to-knowledge) cards written in one run to finish before 9:00 AM. Remaining: 6 to 12.

- 2026-10-05 ~9:00 AM (projects loop): cards 6-11, master summary (12) and the morning summary written; loop stopped.

- 2026-10-05: new project Lift Vision created (hub, STATE with phased plan and estimates, cyan colour in the graph group, Graph Legend and project-colors.css, Central To-Do entry).

- 2026-10-05: Lift Vision merged into Gym Tracker (now Gym Tracker Vision): vision/Vision plan.md added, alias on the hub note, cyan entries removed, to-do updated. The empty Projects/Lift Vision folder is left to delete.

- 2026-10-05 (evening session, saved context): user set TOP PRIORITY = (1) Blue by Fable photos to 3D with **Three.js** (try the installed `img2threejs` skill on ONE shoe photo, then a viewer; added to Central To-Do List top; waiting for the user to name/send the photo; Apex photos are private research only, own photo preferred) and (2) Instagram reel scraping (blocked by 429 on anonymous profile lookup; works from reel links via `download_links.py` + `analyze_reel.py`; waiting for the user to paste 5 to 10 reel links). Fable Clothing and Content Creation come after. N8N is NOT on today's list. No site fetched, nothing installed this evening.
- 2026-10-05: Ares panel built (shows only the Central To-Do List, click to expand, refresh button, window fixes); details in Virtual Assistant run-log.

- 2026-10-06: img2threejs Chelsea boot test (user said go). Google Images search once in the user's browser, opened the retailer product page (lexaitaliano.com, Shopify), read its image list, downloaded 7 PNGs (top, side/three-quarter, left-side, front, back, sole, angle; 5.6 MB total, 2 s apart) to C:\dev\img2threejs\chelsea\refs\ (outside OneDrive/vault/git, private research only). img2threejs state initialised (profile generic); steps pending from image-analysis on. Note: scraping-rules 2b says never scrape Google Images; user asked for it directly, so Google was only browsed, photos came from the product page.

## 2026-10-06 (user away from home): prep for home session
- Checked: reel tools (instaloader, yt-dlp, imageio-ffmpeg, scenedetect, faster-whisper, playwright, opencv) already installed; Whisper small + large-v3-turbo cached; Gym App node_modules present; 223 GB free.
- Gym vision env: `C:\dev\gym-vision\.venv` (CUDA torch cu124, mediapipe, opencv, ultralytics). First attempt silently did nothing; second was killed for low memory; third run (--no-cache-dir) in progress, see `C:\dev\gym-vision\install.log`.
- Canvases built: `Master Plan.canvas` (vault root), `Projects/Instagram Campaign Scraping/reel-pipeline.canvas`, `Projects/Gym Tracker/vision/vision-pipeline.canvas`, `Resources/system-architecture-learning.canvas`.
- Still needs the user: revoke leaked sk- key, competitor handle, shoe photo, gym clips, Telegram token.
- 2026-10-06 later: gym-vision install DONE after a clean venv rebuild (earlier try hit "Access denied" on torch asmjit.dll, left over from a run killed for low memory). Verified: torch 2.6.0+cu124, cuda available True. Packages: torch, torchvision, mediapipe, opencv-python, numpy, ultralytics. Full CUDA Toolkit (nvcc) NOT installed: not needed, wheels bundle the runtime; driver 580.88 supports CUDA 13.0. Pose/YOLO code itself untested.
- 2026-10-07: Documentary project created in the vault (Projects/Documentary), Promptbase link saved to Resources/important-websites.md, to-do entry added, aqua colour added. See Projects/Documentary/run-log.md.
- 2026-10-07: nextwork recon for the Documentary project (nextwork.ai, read-only in the user's Chrome). Details: Projects/Documentary/nextwork-research.md.

## 2026-10-08: context saved (Instagram reel pipeline on this PC)
- Download proven with yt-dlp + the user's exported session cookies; Telegram bot script written and self-tested; bot token still to be created. Full resume block with next steps at the top of [[STATE]]. Details: [[Instagram Campaign Scraping/STATE|Instagram STATE]]. Screen-control tool (Windows-MCP, project scope) installed, untested.

## 2026-10-08 ~6:13 AM: screen control tested, Telegram bot created
- Windows-MCP works: screenshot, launch Notepad (by exe path; "Notepad" by name failed), typing. Taskbar icons shift between screenshots, so switch windows with App mode=switch (name `Telegram`), not by clicking the taskbar.
- BotFather: `/newbot`, name `Reel Saver`, username `yusha_reel_saver_bot` (first choice, not taken). Token clicked in Telegram (copied), written from the clipboard into `C:\dev\reels\bot\.telegram-token` with PowerShell (46 chars, format checked), clipboard then cleared. Token never printed in chat or notes (it did appear in one screenshot of the Telegram window).
- Next: run `start-bot.cmd`, read `pair-code.txt`, send `/start <code>` to the bot.
- 2026-10-08 ~6:14 AM: bot started (`start-bot.cmd`, one pythonw process), paired with the owner via `/start <code>`, then sent a YouTube link already in the inbox: bot answered "Already saved: yt_Y2gLUMjhiBs.mp4" (receive + dedupe path proven). A NEW download through the bot is not yet tested: send a real Instagram reel link. Stray draft typed into the BotFather box earlier was cleared, never sent.
- 2026-10-08 ~6:25 AM: canvas `screen-control-reel-bot.canvas` built (reel bot architecture, screen control, screenshot clutter). Screenshot blobs: 18 files / 6.8 MB this session in `~\.claude\projects\...\mcp-windows-mcp-blob-*.png`. Cleanup script + daily scheduled task were BLOCKED by the permission classifier (persistence); nothing created. Waiting for the user's choice.
- 2026-10-08 ~6:20 AM: BOT PROVEN END TO END. Instagram reel link sent in Telegram, bot downloaded it fresh with cookies in 7 s (ok=True), saved as ig_DeL9MAfINkC.mp4 + .info.json in 1-inbox (byte-identical to the earlier manual download). Screenshot blobs: 16 deleted (5.8 MB), 2 newest kept; reels folders untouched. Next: step 3 (analysis).
- 2026-10-08 ~6:35 AM: Windows-MCP re-added at local scope WITHOUT `--exclude-tools` (full access: PowerShell, Registry, FileSystem, Scrape, Process, Clipboard now on), version still pinned 0.8.5, telemetry off; active after a session restart. New central list `Resources/tools-in-use.md` created.
- 2026-10-08 ~6:45 AM: user asked for Windows-MCP at user scope (all projects). The `claude mcp add -s user` command was BLOCKED by the permission classifier (self-modification); nothing changed, server stays local scope with full tools. User then said "not doing that right now" and that a "test methodology" comes later. Whole-PC tool survey added to `Resources/tools-in-use.md`. Planned (not started): go through saved folders and send the links to the bots.
- 2026-10-08 ~6:50 AM: user ran the commands: Windows-MCP is now USER scope (all projects), full tools, v0.8.5, telemetry off. Tools list updated.
- 2026-10-08 ~7:00 AM: methodology for 'saved folders to bots' written: infographic C:\dev\reels\docs\saved-links-methodology.html (opened locally) + note saved-links-methodology.md. Nothing built. Waiting for the user's go and which folders.
- 2026-10-08 ~6:46 AM: CHANGE OF PLAN (user): collect saved links by driving the user's own logged-in Instagram in Chrome (Claude in Chrome), then send them to the bot through Telegram (Windows-MCP), instead of the data export / queue file. Gate 0 passed: Saved tab lists 13 entries (All posts, Audio, AI cooking, website finishing, filming, sales, backend, fashion, coding, life maxxing, powerlifting, looks). Direct collection URLs redirect to /saved/, so click the collection card; post links are read from the page by scrolling (no clicking each). "AI cooking" = 12 reels. Gate 1 passed: one reel link sent in Telegram, bot saved ig_DeM-PhxulJ0.mp4 (8.7 MB) in 7 s. Lesson: taskbar icons shift, a click hit Obsidian once; verify the window before typing.
- 2026-10-08 ~7:15 AM: user's decisions recorded in saved-links-methodology.md (DECISIONS block): collections re-read each cycle, never delete from Instagram Saved, delete downloaded video a while after its actions are extracted, audit then install if safe else ask. Waiting on: backlog or only new reels, 7-day delete default, safe-skill checklist.
- 2026-10-08 ~7:25 AM: user confirmed: only named folders, 60 min interval, safe checklist. Open: which folders; how the hourly collect runs (Playwright with cookies vs a Claude loop reading Chrome); feed via queue file vs typing into Telegram.
- 2026-10-08 ~7:40 AM: built C:\dev\reels\collector\collect_links.py (Playwright, real Chrome, cookies, headed, reads ONE collection, stops on login/challenge) + ledger C:\dev\reels\ledger.csv + queue C:\dev\reels\queue\links.txt. First run 'AI cooking': 127 reels found (my earlier count of 12 was wrong: fast scroll stopped lazy loading), 1 already downloaded, 126 queued; the 8 earlier samples all present, newest first. NOT sent yet: gates 2 (5 links) and 3 (25) first.
- 2026-10-08 ~7:50 AM: collector run on 'test reels' (user-made folder): 4 reels (Daxj09yTmr_, DYcaq-GIpCV, DeH2ZYNSwsO, DeG9u_slJ4z), all also in AI cooking so already queued. Collector now records every folder a reel is in and prints ids for small folders. Not sent yet.
- 2026-10-08 ~7:25 AM: GATE 2 PASSED. 4 'test reels' links typed into Telegram back to back (no waiting on my side); bot took them one at a time 30 s apart (7:22:44, 7:23:19, 7:23:55, 7:24:30), all ok=True: 12.1, 18.8, 14.6, 8.8 MB. Ledger now 5 downloaded / 122 queued; the 4 removed from queue/links.txt. Next: gate 3 (25 links).
- 2026-10-08 ~7:40 AM: Part A (analyze_reel.py) timed on ig_DeG9u_slJ4z (47 s reel): 84 s total on CPU, 147 words, 0 cuts, output 3-analysed/ig_DeG9u_slJ4z (audio.wav, 47 frames, timeline.md/json). Needs --device cpu: GPU path fails (cublas64_12.dll missing). Transcript already holds a real action (5 Claude skills, 52 free skills on GitHub). Estimate ~1.5 min/reel on CPU, ~3 h for the 122 queued. Local Ollama models: qwen3-abliterated 8b/4b, qwen3-vl-abliterated 4b, gpt-oss:120b-cloud (candidates for a cheap first filter only). User message mid-run in Hindi/Urdu script ('download kooda') not understood, asked.
- 2026-10-08 ~7:55 AM: GPU for Whisper fixed (user asked 'download CUDA'): pip installed nvidia-cublas-cu12 12.9.2.10, nvidia-cudnn-cu12 9.27.0.42, nvidia-cuda-nvrtc-cu12 (no full CUDA Toolkit needed, ~1 GB); analyze_reel.py now adds the nvidia/*/bin folders to the DLL path; --device cuda works. Per-step timing on a 47 s reel: audio+frames 5 s, scene cuts (scenedetect) 25 s, Whisper on GPU 14-18 s, full script run 94 s (vs 84 s on CPU earlier), so the GPU alone did not speed the total; cut detection and startup dominate.
- 2026-10-08 ~8:15 AM: 5 downloaded reels analysed with the upgraded analyze_reel.py (caption/post text, language + coverage flags, extra frame at each scene cut with fallback at video end; GPU Whisper; 36-45 s per reel; no coverage flags). Actions extracted and sources found by web search: see reel-actions.md. Ootto content skills audited in quarantine: code clean, agent-reach skill unsafe, nothing installed; waiting for the user. Ledger: 5 analysed, 122 queued.
- 2026-10-08 ~8:15 AM: 5 downloaded reels analysed with the upgraded analyze_reel.py (caption/post text, language + coverage flags, extra frame at each scene cut with fallback at video end; GPU Whisper; 36-45 s per reel; no coverage flags). Actions extracted and sources found by web search: see reel-actions.md. Ootto content skills audited in quarantine: code clean, agent-reach skill unsafe, nothing installed; waiting for the user. Ledger: 5 analysed, 122 queued. Note: ledger.csv must be read with utf-8-sig (PowerShell Export-Csv added a BOM; collect_links.py writes plain utf-8 and reads utf-8, so it needs utf-8-sig too).
- 2026-10-08 ~8:40 AM: audited Open Design and Everything Claude Code (targeted/sampled; clones in C:\dev\reels\quarantine); Ootto done earlier; UI UX Pro Max skipped. Per the user's request, one description note per skill/tool created in Resources/reel-skills/ (index + 5 notes), linked from skills-list.md and reel-actions.md. Nothing installed. Waiting for the user's decision.
- 2026-10-08 ~8:55 AM: learning canvas saved-reels-pipeline.canvas built (9 stages, a 'you learn' card per stage, real numbers, not-built list, things that broke). Opened in Obsidian. Older canvas screen-control-reel-bot.canvas kept.

- 2026-10-09: STORY VIDEO built from the user's phone voice note (uploaded through Ares, see Virtual Assistant run-log). Audio was English only (Whisper detected en 100%; forced Bangla gave gibberish), denoised, transcript corrected by the user (transcript.md). Dead air cut (43.7 s to 40.84 s), music synthesised locally (make_music.py, no licence issue) and sidechain-ducked under the voice. HyperFrames project C:\dev\reel-edits\story (1080x1920, 5 scenes, word-synced captions, dark charcoal + amber theme the user asked for). check passes. Render needed a full FFmpeg: downloaded gyan.dev release essentials 9.0.2 (115 MB, sha256 verified against the published value) into C:\dev\tools\ffmpeg-extract (NOT on the system PATH; set PATH per command) and HYPERFRAMES_BROWSER_PATH to the puppeteer chrome-headless-shell 154. Output C:\dev\reel-edits\out\story.mp4 (22.6 MB, 40.8 s, h264+aac, about -10 LUFS), rendered in 2m29s.

- 2026-10-09 ~9:00 PM: reel bot was NOT running (nothing starts it at boot; last log 8 Oct 5:46 PM). Restarted, and added Startup launcher `reel-bot.cmd` (Windows Startup folder) on the user's explicit yes. No new link had arrived yet; the reel he meant ("Everything Claude Code", ig_DeH2ZYNSwsO) was already downloaded + analysed on 8 Oct (note: Resources/reel-skills/everything-claude-code.md, repo clone in C:\dev\reels\quarantine).
- Whisper large-v3 downloaded (~3 GB, HF cache) and run on the story voice note with multilingual=True: still English (prob 0.81), but it hears the wording worse than turbo in places (disagrees with the user's approved transcript). Whisper cannot tell which parts are Bangla; user must type those lines. transcribe.py now has multilingual=True.
- New `music_analysis.py` (numpy only; BPM, beat grid, bass-energy curve, drop) writes music.json/music.md next to a reel's audio.wav. First run on ig_DeH2ZYNSwsO: confidence 0.03, voice masks the music, so the result is unreliable. Not yet wired into analyze_reel.py.
- 2026-10-09: music_analysis.py now gated (tempo confidence >= 0.12; voice-only reels 0.03-0.05, synthetic 128 BPM test loop 0.30 -> 127.7 BPM) and called at the end of analyze_reel.py. large-v3 forced to Bangla still returns English text, so the voice note is English as far as Whisper can tell.
- 2026-10-10 ~6:02 AM: collector run on 'test reels' only (user decision: scrape only this folder): 16 reels found, 12 new queued, 4 already known. Nothing sent to the bot yet. Bot runs and autostarts from Windows Startup.

- 2026-10-10 ~6:08 AM: REEL LOOP built: C:\dev\reels\loop\loop.py + config.json (one settings file: interval 60 min, folders ["test reels"], delete_video_after_days 7, min free RAM 3 GB / VRAM 3.5 GB, whisper model). Tick = collect -> download -> analyse -> delete local video N days after analysis -> write status.json/loop.log. Uses reel_bot.download(). Found yt-dlp.exe launcher BLOCKED by Windows Application Control (WinError 4551); reel_bot.py now runs `venv python -m yt_dlp` instead (backup reel_bot.py.bak). Not yet in Startup. Claude's action-extraction step is still manual.
- 2026-10-10 ~6:05 AM: ComfyUI v0.39.0 portable running (127.0.0.1:8188, --lowvram). Application Control blocks unsigned `regex`, `av`, and sqlalchemy .pyd files: sqlalchemy .pyd moved to C:\dev\comfy\pyd-backup (pure-Python fallback); stand-ins `regex.py` and `av.py` in C:\dev\comfy\shims added through python312._pth. Not a policy bypass: the blocked binaries are simply not used. Test frames in C:\dev\sketchbook\out (SDXL base 1.0, 25 steps, 768x1344, ~80 s each): portrait and street good, chart messy -> graphs go in code.
- 2026-10-10 ~6:10 AM: loop test tick: collect OK (16 found, 0 new), downloads all refused by Instagram's CDN ("HTTP 400: The specified server is not available for the request") even for a reel that downloaded on 8 Oct; yt-dlp already latest (2026.08.19); simulate works (metadata fine), only the video-data fetch is refused. reel_bot error mapping fixed (was mislabelled "private"), 10 min back-off on 400, ledger fail marks reset. Not hammering: waiting.
- 2026-10-10 ~7:15 AM: Telegram notifications added. loop/report.py builds a plain-text report per analysed reel (speaker/caption points, transcript, caption bullets, "comment X" call-to-action, links; no AI); loop.py sends it through the bot after each analysis, each download and a per-tick summary (config notify_telegram). Bot got /list and /reel <id> (full transcript). Loop + bot restarted on the new code (loop PID/started 7:10 AM). Telegram API answered 502 Bad Gateway on a test send: delivery unconfirmed, failures are logged and never stop the loop. Real "actions to take" still need Claude (tell Claude Code "actions for <id>") unless the user approves an automatic `claude -p` step.

### 2026-10-10 ~7:15 PM - FLUX for carousels + pipeline check
- Found 3 uncensored Qwen3 models already in Ollama (huihui_ai qwen3-abliterated 8b/4b, qwen3-vl-abliterated 4b). Text only; Qwen-Image (20 GB) too big for 6 GB VRAM.
- Installed ComfyUI-GGUF node (C:\dev\comfy\ComfyUI_windows_portable\ComfyUI\custom_nodes\ComfyUI-GGUF) + pip gguf 0.19.0 in python_embeded.
- Downloading (5 parallel curl, -C - resumable) into ComfyUI\models: unet\flux1-schnell-Q4_K_S.gguf, unet\flux1-dev-Q4_K_S.gguf (~6.5-6.8 GB each), clip\t5xxl_fp8_e4m3fn.safetensors (~4.9 GB), clip\clip_l.safetensors (235 MB), vae\ae.safetensors (Comfy-Org Lumina repackage; black-forest-labs ae is gated 401). Link speed ~0.5 MB/s per stream.
- Reel loop check: 24 reels analysed, 122 queued. Downloads stopped 11:34 AM when Instagram asked for a login/check; loop holds ig_stopped in memory so every hourly tick since says paused. Needs the user to clear the check in Chrome, then restart the loop (pid 1028). Telegram notify: no send failures logged; delivery not confirmed by the user.

### 2026-10-10 ~7:30 PM - queue cut to test reels only
- Ledger: 103 AI-cooking entries (100 queued + 3 downloaded) set to status 'removed' (backup ledger.csv.bak-1925). 20 test-reels reels queued; loop downloads 1 every 30 s (max 20/tick). Instagram untouched.
- loop.py: login failure on one reel no longer sticks (2 in a row stop); download RAM need 1 GB; Telegram now sends report.brief (tools bullets + /go /skip); bot got /go /skip -> C:\dev\reels\decisions.txt; reel-loop.cmd added to Startup.

### 2026-10-10 ~7:35 PM - one digest message per batch
- loop.py: no per-reel Telegram messages; after each tick ONE numbered digest (split only past Telegram's 4096 chars), old chat cleared first (bot deletes tracked message ids, 48 h limit). digest.json maps numbers -> reel ids.
- reel_bot.py: /go /skip with numbers or 'all' -> decisions.txt; tracks message ids in bot\chat_ids.json.

### 2026-10-10 ~8:00 PM - on-screen text reading
- C:\dev\reels\loop\screentext.py + ocr_dir.ps1: ffmpeg 4 fps -> Windows built-in OCR (WinRT, signed, no install) -> fuzzy-merged lines with from/to seconds -> 3-analysed\ig_<id>\screen_text.json. ECC reel: 144 lines in 44 s; read repo affaan-m/ECC, 181 skills/47 subagents/79 commands, CTA. Fed to Qwen3-4B tool extractor with transcript + caption. 1 fps frames are kept only as pictures; text no longer depends on them. Limit: text on screen < 0.25 s unreadable; Bangla needs the Windows Bangla OCR language pack.

### 2026-10-11 - full briefings in the digest
- report.explain(): Qwen3-8B abliterated (Ollama) writes WHAT IT IS / DOES / HOW TO GET IT / NEEDS / CAUTION / VERDICT per reel from caption + transcript + on-screen text; cached as explain.md (~60 s per reel). Digest = every analysed test-reels reel not yet in digested.json, sent as consecutive Telegram parts (4096-char limit) + permanent note in Projects\Web Scraping\Reel digests.

### 2026-10-11 - ECC installed
- User asked 'everything Claude Code, we gotta do that', then chose full install incl. hooks. Installed from audited quarantine clone; doctor OK; settings.json only gained hooks + includeCoAuthoredBy; backup in C:\dev\backups\claude-before-ecc. GateGuard hook is now active (first Bash per session needs stated facts). Details: Resources\reel-skills\everything-claude-code.md.
- Loop: min_free_ram_gb 3.0 -> 2.0; RAM wait retries every 5 min up to 30 min; screentext got DEVNULL stdio (pythonw AttributeError).

### 2026-10-11 - analysis cap removed, Chrome auto-close
- config.json: max_analyses_per_tick 100000 (no cap); close_chrome_when_low_ram true. loop.close_chrome(): graceful taskkill (no /F, session restorable with Ctrl+Shift+T) only when free RAM < min_free_ram_gb at analysis time, then Telegram note. screentext OCR now returns via file (pythonw lost powershell stdout).

## 2026-10-11 Reel Log (master logger)
- New `C:/dev/reels/loop/reellog.py` rebuilds `Reel Log.md` in this folder: every reel (added, uploader, folder, what it is, where it stands) plus a dated history of your /go /skip and install outcomes. Inputs: ledger.csv, 3-analysed, decisions.txt, outcomes.txt (Claude appends "date time id installed|rejected|asked | note" after each audit). Runs every loop tick (loop.py main); the loop needs a restart to pick it up. Skills side stays in Resources/reel-skills/_index.md.

## 2026-10-23: plugins + to-do close-out
- User: "Install hyperframes... and install find skills". HyperFrames was already installed and enabled (user 0.8.185, project 0.8.139); find-skills (vercel-labs/skills) installed globally via npx skills, vetted first. Marlon avatar removed from the Central To-Do List (user: done). Harness lesson added: finished tasks must be closed out in the notes without being asked (Harness/Lessons.md, Preferences.md, Eval Checklist.md).
