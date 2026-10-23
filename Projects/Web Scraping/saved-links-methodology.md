---
up: "[[Web Scraping]]"
---
# Saved folders to the reel bot: methodology (planned 2026-10-08, not built)
Picture: `C:\dev\reels\docs\saved-links-methodology.html` (local, never published).

**Goal:** collect links from the user's saved folders and feed them to the reel bot in bulk, safely.
**Key decision:** do NOT push links through Telegram (a bot cannot message itself; sending as the user needs a login library). The bot reads a queue file `C:\dev\reels\queue\links.txt`, same download code, same limits.

## Pipeline
1 Collect (links only) > 2 Clean (strip tracking, dedupe, skip files already in 1-inbox, tag platform) > 3 Queue + manifest CSV > 4 Feed (30 s gap, 10 min pause on 429, stop on login challenge, daily cap 100 Instagram) > 5 Verify (in = saved + failed, reasons logged) > 6 Report (Telegram summary + run-log).

## Test gates (each must pass first)
0 Dry run: collect + clean, print counts and 20 samples, no downloads. 1 One link through the queue. 2 Five nasty links: normal, duplicate, private/dead, photo/carousel, tracking junk. 3 Twenty-five real links, watch pacing. 4 Full run, capped per day, resume-safe.
Stop on: hard block, login challenge, disk under 50 GB free, crash or silent drop.

## Safety
Cookies SECRET, token SECRET. No proxies, fingerprint tricks or CAPTCHA solving. Downloads stay in `C:\dev\reels`. Manifest makes every batch removable. Nothing deleted without the user's say.

## Sources (user to choose)
A Instagram Saved collections via the official data export (whether folder names survive in the export is UNVERIFIED), B Chrome bookmark folders (local `Bookmarks` file), C files on the PC (`.url`/`.txt`), D Telegram Saved Messages (needs a login library, not now).

## Build order
`collect_links.py` (gate 0), queue mode in `reel_bot.py` + `--selftest` for queue parsing, batch-end Telegram summary.

**Status:** waiting for the user's "go" and which folders.

## DECISIONS (user, 2026-10-08, supersede the plan above where they differ)
- **Source:** the user's own logged-in Instagram in Chrome (Claude in Chrome), not the data export. Links are sent to the bot through Telegram. Gates 0 and 1 passed (see run-log).
- **Collections:** the user keeps adding new ones, so every cycle re-reads the collection list from the Saved page; nothing is hard-coded.
- **Never delete anything from Instagram Saved.** Only local files are ever deleted.
- **Deletion rule:** delete the downloaded VIDEO once that reel's actions have been analysed and extracted, after a waiting period (default 7 days, to confirm). Keep transcript, frames, notes and ledger row.
- **Autonomy on actions:** Claude may do everything. For skills/tools/tips found in reels: AUDIT and REPORT first; if the audit says SAFE, download/install it; if NOT safe or doubtful, do not install, report to the user and ask.
- **Pipeline:** 1 download + track (ledger: queued / downloaded / analysed / actioned / failed), 2 analyse + extract actions (audio, Whisper words, frames, cuts), 3 act on actions (browser: download/check/audit skills, tips) and file them in Obsidian: where it goes, running skills list, redundancy check against existing skills.
- **Loop:** a plain Python scheduler (not a Claude loop) does collect + download; Claude is used for analysis and actions. Instagram collection check every 30 to 60 min, not 5 (default 60); bot keeps its 30 s gap and a cap of 100 Instagram links per day.
- The user will say before each day what to analyse; checkup the next morning or when wanted.
- **Confirmed (user, 2026-10-08 ~7:25 AM):** only SOME folders are processed, the user names them (not every reel, no backlog from other folders); check interval 60 min; the "safe" checklist approved (read all files, no calls to unknown hosts, no obfuscation, no credential access, no install scripts running downloaded code, source looks real); 7-day delete delay assumed (user did not object).
