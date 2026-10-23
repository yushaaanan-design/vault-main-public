---
up: "[[INDEX]]"
tags: [resource, research, projects]
---
# Overnight projects loop (started 2026-10-05, user asleep)

> [!summary] MORNING SUMMARY (2026-10-05, written about 9:00 AM)
> 1. Cards for projects 1 to 11 and the ranked "do first" list (project 12) are written below. Cards 7 to 11 reuse earlier research rather than a new search.
> 2. **MUN:** a cloud Opus agent verified 150 resolutions (99.3% pass, about 2.3k tokens each); I re-checked locally, all 153 notes pass.
> 3. MUN is now fully separate from this vault: notes in `C:\dev\mun-pipeline\docs\`, product vault `C:\MUN VAULT`.
> 4. Downloads running locally: all meeting records (some middle numbers are not served) and 2,544 presidential statements and reports.
> 5. **Instagram:** the pipeline works end to end on a real video; Wants and Needs reels still need you to run Sort Feed (Instagram blocks anonymous requests).
> 6. Research notes: `Projects/Instagram Campaign Scraping/overnight-research.md` (Q1 to Q14), including a CORRECTION: the `claude -p` credit pool was paused, so your "$100" is still unidentified.
> 7. Mistakes I made and fixed: a wrong `claude --remote` command; a splitter edit that broke 80 notes (reverted, all re-verified).
> 8. First things to do: run `/usage`; choose the cap for cloud run 2; run Sort Feed on the brand; fix the Obsidian MCP config and regenerate the key.
> 9. Nothing was installed, spent, logged into or scraped by the loop itself.
> 10. This loop stops now (job deleted).


Built from the [[Central To-Do List]]. One project per loop run. For each project the loop writes a **project card** (what it is, where it stands, what is blocking, the free and uninterrupted way forward, next 3 steps) and does web research on its biggest open question, with source links.

**Hard limits:** research and note-writing only. No installs, downloads, logins, entering credentials, scraping Instagram, spending money, sending messages, or changing system/power settings. Read only each project's `STATE.md` (never rebuild context from chat). Findings are leads, not verified, unless a line says tested.

## Project queue (loop takes the first unchecked)
1. [x] **Instagram reel analysis** (+ browser control, Sort Feed, free uninterrupted loop). First finish the open questions in [[Projects/Instagram Campaign Scraping/overnight-research|overnight-research]] (Q4 to Q14), then write the card.
2. [x] **Blue by Fable: photos to 3D** (photogrammetry, image-to-3D that fits 6 GB, `img2threejs`).
3. [x] **Fable Clothing site** (owner-blocked items, Bangladesh payments bKash/Nagad/SSLCommerz, Pathao, email provider, security checklist before launch).
4. [x] **Content Creation** (avatar tools: HeyGen, Hedra, ElevenLabs free tiers, Chatterbox, Qwen3-TTS; what is still free in 2026).
5. [x] **N8N reel-to-knowledge** (Telegram bot, Gemini key, whisper.cpp on the VPS, vault on GitHub).
6. [x] **Virtual Assistant / Ares** (what is broken, what is next; Docker connector gateway: Activepieces vs n8n vs Composio self-host).
7. [x] **MUN vault** (SEPARATE from this vault since 2026-10-05; read its notes at `C:\dev\mun-pipeline\docs\STATE.md`, never put MUN notes in this vault) (pilot resolution, next documents, search/RAG over 2,812 PDFs for free).
8. [x] **Learn security/authentication** (one free learning path for a JS/Express/PostgreSQL learner). **Gym Tracker is EXCLUDED (user, 2026-10-05): do not research it.**
9. [x] **Free video editor idea** (scriptable open-source building blocks, licences, Recordly AGPL as reference).
10. [x] **Marketlens** (parked; just a short status card).
11. [x] **Skills and plugins to vet** (skill finders, video/reel analysis, scraping, 3D). Fill [[Projects/Instagram Campaign Scraping/skill-suggestions|skill-suggestions]].
12. [x] **Master summary:** a ranked "what to do first tomorrow" list across all projects, free options only.

Workflow and automation design for all of this: [[Resources/nightly-automation-plan|nightly-automation-plan]] (MUN first). The loop should read it and add anything project-specific it finds.

## Project cards and findings
(the loop appends below, newest last)

### 1. Instagram reel analysis: PROJECT CARD (loop, 2026-10-05 about 7:00 AM)
- **What it is:** analyse a competitor's reels (hooks, cuts, pacing, speech, edit factors) and feed a free Claude-driven video editor. Target brand: Wants and Needs (`@wantsandneedsbrand_`, about 101 posts).
- **Where it stands:** `analyze_reel.py` works end to end (ffmpeg, PySceneDetect, faster-whisper on CPU, merged timeline), tested on one real YouTube short. Instagram itself is blocked for anonymous requests (429); `instaloader` could not list the profile; `yt-dlp` cannot list profiles. Sort Feed (Chrome extension) is installed in the user's browser and downloads videos on the free plan, but needs the user's signed-in Instagram session; the free plan sorts only the latest 25 posts. No Instagram reel of the brand analysed yet.
- **What blocks it:** getting the reels into `C:\dev
eels-inbox\` (needs the user to run Sort Feed on the profile, or paste reel links for `download_links.py`); Whisper on the GPU needs the NVIDIA cuBLAS DLLs (Windows Application Control may block them).
- **Free and uninterrupted way:** Sort Feed free tier for the latest 25 posts; `yt-dlp` + `download_links.py` for pasted links (30 s apart); Whisper `small` on CPU meanwhile; vision with Qwen2.5-VL 3B / qwen3-vl 2B through Ollama; free scriptable editor = ffmpeg + MoviePy; Telegram intake with links (or a local Bot API server for files). All research is in `Projects/Instagram Campaign Scraping/overnight-research.md` (Q1 to Q14).
- **Next 3 steps:** (1) user runs Sort Feed on the profile and drops the downloads into the inbox; (2) run `analyze_reel.py` on them and read the timelines; (3) add edit-factor detection one at a time (transitions via TransNet V2 or frame differences, beat sync with librosa, speed/zoom with optical flow), then the rubric from `viral-reel-script-method.md`.

### 2. Blue by Fable: photos to 3D: PROJECT CARD (loop, 2026-10-05 about 7:30 AM)
- **What it is:** turn product photos of Blue by Fable's leather shoes (men only, own brand plus sourced brands) into 3D models or 3D images for the shop and content.
- **Where it stands:** only the idea. The Blue by Fable project itself (per its STATE, updated 2026-10-01) has no code yet: catalogue architecture drafted, Apex market-research pilot underway, open items for the owner (Bangladeshi sizing, price range, image storage, git branch plan). No photos have been turned into 3D; nothing tested.
- **What blocks it:** the photos must be shot for it (a multi-angle set per shoe, not just catalogue shots); shiny leather is hard for photogrammetry; the shop does not exist yet to show 3D in.
- **Free and uninterrupted way:** capture on a **turntable** (matte black base and background, shoe on it, camera on a tripod, 30 to 60 angles, even light), ideally with **cross-polarized** light (polarizing film on the lights + a CPL filter on the lens, rotated until reflections vanish; costs one to two stops of light) to remove gloss; process with **Meshroom** (free, needs the NVIDIA GPU you have) or **COLMAP**; quick single-photo test with **TripoSR** (fits 6 GB, may blur textures). One source warns cross-polarization alone can leave the surface flat and featureless, so combined captures can work better. For the web, a GLB model in a `<model-viewer>`-style viewer is the usual path (not researched here).
- **Next 3 steps:** (1) shoot one test shoe on a turntable, 40 photos, with and without polarization (cheap film is enough to try); (2) run Meshroom on it and judge the mesh; (3) try TripoSR on one catalogue photo as a speed test and compare. Decide a shop format only after the first result.
- **Sources:** https://www.pix-pro.com/blog/cross-polarization , https://blog.solaya.ai/blog/photogrammetry-lighting-setup , https://www.photographyattic.com/blog/2025/11/a-practical-guide-to-cross-polarisation-photography/ , https://polycount.com/discussion/211316/photogrammetry-with-specular-roughness-data-advice (search results; unverified). Earlier tool research: `Projects/Instagram Campaign Scraping/overnight-research.md` Q11.

### 3. Fable Clothing site: PROJECT CARD (loop, 2026-10-05 about 8:00 AM)
- **What it is:** an online menswear store for the Bangladeshi market (React/Vite client, Express server, JSON file store for now, admin with 11 screens); sister project of Blue by Fable (same codebase direction, shared customers/admin/orders).
- **Where it stands (from its STATE, written 2026-09-28):** the full site was rebuilt and committed in two commits; six security issues found and fixed, including a delivery charge that was missing from order totals. A catalogue restructure was in flight and uncommitted on that date: drops removed, new categories (Formal Trousers, Tailored Trousers, Tailored Shirts, Henleys, Quarter Zips, Accessories), lighter dark theme, image compression, filling empty screen areas. The owner still has to supply real photos, prices, logo, specs, story text, contact details and policies; placeholders are marked.
- **What blocks it:** owner-only content (above) and owner-present account setup (domain, merchant accounts, courier, hosting, analytics); an email provider decision for order confirmations; before launch: real admin password, `NODE_ENV=production` with a session secret, backup of `store.json`, uploads off the local disk, then the Prisma + Neon move.
- **Free and uninterrupted way:** keep building against **sandbox** payment keys and placeholders; SSLCommerz offers a free sandbox (create a sandbox account for a store id and password) and an official Node package (`sslcommerz-lts`); bKash and Nagad merchant approval is commonly cited at about 3 to 7 days and 24 to 48 hours, with NID/selfie verification, so start those applications early because they run in parallel with the build. A trade licence is generally required even for online shops (about 3 to 7 working days; NID, photos, rent deed or holding-tax receipt, TIN). All figures from web guides: **unverified**, confirm with each provider.
- **Next 3 steps:** (1) commit or review the in-flight catalogue restructure and re-run QA at 1440 and 390; (2) with the owner present: start the trade licence and bKash/Nagad/SSLCommerz applications and collect the missing content in one sitting; (3) build the order confirmation email and the SSLCommerz sandbox checkout, then the security checklist pass before any deploy.
- **Sources:** https://developer.sslcommerz.com/doc/v4/ , https://github.com/sslcommerz/SSLCommerz-NodeJS , https://banikh.com/en/blog/bkash-nagad-payment-guide , https://payatlas.com/countries/bangladesh-bd , https://srcobd.com/trade-license-in-bangladesh-a-complete-step-by-step-guide-2025/ (search results; unverified).

### 4. Content Creation: PROJECT CARD (loop, 2026-10-05 about 8:30 AM)
- **What it is:** AI-presenter short videos for social channels (two avatars with fixed faces and designed voices; 4 first-week scripts; strategy and scoring sheet written). Manual for now: no n8n until the avatars work and content is proven.
- **Where it stands (STATE 2026-09-29):** all planning done by Claude (strategy, tool comparison, voice plan, prompts, week-1 scripts, canvas). All 10 owner steps are still open: approve avatar looks, generate faces, make free accounts (HeyGen, Hedra, ElevenLabs), design voices, run the avatar test and score it, then videos and channel accounts.
- **What blocks it:** nothing technical: the owner has not started the accounts and the face/voice generation.
- **Free and uninterrupted way:** free tiers are for testing, not for posting (figures from review sites, unverified): **HeyGen free** about 3 videos a month, up to 3 minutes, 720p, **watermarked**; watermark-free export starts at the $29 a month plan. **Hedra free** reports conflict (100, 300 or 400 credits a month), roughly 50 seconds of 720p video, watermarked, paid from about $15 a month. **ElevenLabs free** 10,000 credits a month (about 10 minutes of speech) but **no commercial rights and attribution required**; the $5 Starter plan gives commercial rights. So the free route works for the avatar and voice **test**, but publishing needs either a paid month or the open-source voice route (Qwen3-TTS, Chatterbox) already on the list.
- **Next 3 steps:** (1) generate the 8 to 10 face options per avatar and pick one each; (2) make the three free accounts and run the scored test with the same face and script; (3) decide between one paid month (cheapest watermark-free plan) and the free open-source voice route before posting anything.
- **Sources:** https://bigvu.tv/blog/heygen-free-get-free-plan/ , https://rinzara.com/articles/free-ai-avatar-video-generators-2026 , https://coldiq.com/tools/hedra , https://bigvu.tv/blog/elevenlabs-pricing-2026-plans-credits-commercial-rights-api-costs/ , https://clarratools.com/elevenlabs-free-plan-limits/ (search results; unverified).

### 5. N8N reel-to-knowledge: PROJECT CARD (loop, 2026-10-05 about 8:30 AM)
- **What it is:** a Telegram-triggered workflow: send a saved reel, it downloads (yt-dlp), transcribes (Whisper), takes key frames, asks Gemini 2.5 Flash (free tier) for key points, classifies (skill / todo / design / reference / discard) and writes into the vault. Phases 1 and 2 are written and validated as `workflows/reel-to-knowledge.json`.
- **Where it stands (context note, 2026-09-28):** the JSON and the setup guide are done; nothing is imported yet; the VPS setup (Hostinger) is the remaining work: n8n self-hosted (needed for the Execute Command node), `whisper.cpp` built on the VPS, vault as a private GitHub repo cloned to the VPS, Telegram bot via BotFather, Gemini API key.
- **What blocks it:** owner-side setup steps above; the Telegram trigger needs a public **HTTPS** address for n8n.
- **Free and uninterrupted way:** reverse proxy with HTTPS (Caddy, Nginx or Traefik) on the VPS or a Cloudflare tunnel, then set `WEBHOOK_URL` to the public base URL and restart n8n, otherwise Telegram rejects the webhook (plain HTTP, local addresses and expired tunnels all fail). Restrict the workflow to the owner's Telegram user ID. Note for the Telegram file route: bot downloads are capped at 20 MB on the standard API (see Instagram research Q14), so passing reel **links** to yt-dlp avoids the limit. This overlaps with the local Python pipeline now being built (analyze_reel.py): decide later whether the VPS pipeline or the local one is the main path.
- **Next 3 steps:** (1) create the Telegram bot and add the token as an n8n credential (never in chat); (2) confirm the VPS has an HTTPS domain and `WEBHOOK_URL`; (3) import `reel-to-knowledge.json` and run the per-branch test plan from the setup guide.
- **Sources:** https://synta.io/blog/n8n-telegram-trigger-https-webhook-error , https://community.n8n.io/t/telegram-trigger-not-working-in-selfhosted-instance/160480 , https://2acrestudios.com/setting-up-a-base-url-for-telegram-triggers-on-a-local-n8n-instance/ , https://n8n.io/workflows/9363-transform-telegram-content-to-multi-platform-posts-with-openai-whisper-and-gemini (search results; unverified).

### 6. Virtual Assistant / Ares: PROJECT CARD (loop, 2026-10-05 about 9:00 AM; from its STATE of 2026-10-04, no new web search)
- **What it is:** a free assistant on the Windows laptop that controls the PC with tools (apps, windows, typing, Obsidian notes, shell), a phone remote, and "ARES", a native full-screen/panel HUD with a spoken voice (Kokoro `bm_fable` on the RTX 3060). In Claude Code, a message starting "Ares" acts as Ares.
- **Where it stands:** renamed from Jarvis to Ares on 2026-10-04; native window built; the server speaks announcements; recording mode (demo vault) for filming. The last layout change (spoken lines in the top-right box) was applied but not looked at on screen.
- **What blocks it / still open:** user checks of the new layout, the multi-task spoken-update test, voice still "too robotic", phone voice never tested on the real phone, a real (non-demo) briefing needs a schedule source (Obsidian daily note or Google Calendar via Composio, needs the user's OK), the Docker connector gateway idea (Activepieces MIT, n8n fair-code) not started, Docker not yet learned.
- **Free and uninterrupted way:** everything already runs locally and free; keep to the local voice and Claude Code; add no paid services.
- **Next 3 steps:** (1) look at the HUD layout and fix what is off; (2) re-run the multi-task test; (3) try other voice blends, then decide on a real briefing source.

### 7. MUN vault: PROJECT CARD (loop, 2026-10-05; the notes now live OUTSIDE this vault, see `C:\dev\mun-pipeline\docs\STATE.md`)
- **What it is:** a verified knowledge base of the UN Security Council, to be sold as a separate vault (`C:\MUN VAULT`).
- **Where it stands:** 2,812 resolution PDFs fetched; meetings index of 10,666 rows (S/PV.1 to 10232, 11 gaps); paragraph-level verifier; **150 resolutions verified in a cloud Opus run at about 2.3k tokens each (99.3% pass)**; 153 notes in total; drafting-evolution note; separate source map; background downloads of meeting records and reports running.
- **What blocks it:** the model cost of the remaining about 2,331 ready resolutions (not priced; the user's `/usage` result is unknown); about 270 old scans needing a better source and 56 needing OCR; meeting numbers roughly 1033 to 2591 are not served as PDFs by the endpoint; no route yet to each member's vote (psdata datasets).
- **Free and uninterrupted way:** fetching and verifying are free and local; only the model reading costs; do the second cloud run with a higher cap once the budget is known.
- **Next 3 steps:** (1) check `/usage`, raise the cap, run cloud run 2 from S/RES/404; (2) find the download route for the psdata voting data and an alternative source for old S/PV; (3) extract text from the downloaded meeting records and start the country-position layer.

### 8. Learn security/authentication: PROJECT CARD (loop; uses Q12 in `Projects/Instagram Campaign Scraping/overnight-research.md`)
- **What it is:** learn auth and authorization (not yet learned per the global notes). Gym Tracker is where it gets applied, but Gym Tracker was excluded from this research on the user's instruction.
- **Free path:** OWASP Password Storage cheat sheet, then the Session Management and Authentication cheat sheets; Argon2id (or bcrypt cost 10+), httpOnly session cookie, CSRF protection, rate limiting; Claude writes small examples, the user reads every line, then a security review pass.
- **Next 3 steps:** (1) read the OWASP password storage sheet; (2) build one tiny login (hashing + session cookie) with Claude, line by line; (3) add CSRF and rate limiting, then review.

### 9. Free video editor idea: PROJECT CARD (loop; uses Q10 and Q7)
- **What it is:** a free, Claude-drivable video editor: analyse a reference reel into an edit spec (JSON), then render a new reel from a spec.
- **Where it stands:** only the analysis side exists (`analyze_reel.py`, timeline); no renderer yet.
- **Free way:** ffmpeg + MoviePy (MIT) as the renderer; PySceneDetect + TransNet V2 + librosa + OpenCV for edit factors; Recordly (AGPL) as reference only; avoid GPL code (Shotcut, Kdenlive) in anything to be sold.
- **Next 3 steps:** (1) define the edit-spec schema (shots, transitions, speed, zoom, text, music); (2) a renderer that rebuilds a simple reel from a spec; (3) round-trip test: analyse a reel, render its spec, compare.

### 10. Marketlens: PROJECT CARD (loop; from its STATE of 2026-10-02)
- **Parked** by the user on 2026-10-02. Built and tested locally (13 tests pass; photo lookup, text search, browse with filters over 854 Apex products, find-similar). Open steps when resumed: replace the demo login (`demo` / `demo-lens`) with real access codes; Tailscale for the partner and phones with `COOKIE_SECURE=1` (the server refuses secure mode while the demo login exists); a security review pass with the user reading `server/auth.py`. No action needed now.

### 11. Skills and plugins to vet: PROJECT CARD (loop; uses Q13)
- **Rule:** third-party skills run with your permissions; the Snyk audit reported 76 malicious skills out of 3,984 on one marketplace. Prefer Anthropic-built plugins; read every file; no auto-install. Candidate not yet vetted: **Sort Feed** (Chrome extension, in the skill-suggestions log). Candidates to look for: a skill finder (name unverified), video/reel analysis, 3D. Log each in `Projects/Instagram Campaign Scraping/skill-suggestions.md` with source, licence and permissions.

### 12. MASTER SUMMARY: what to do first, ranked (loop, 2026-10-05 about 9:00 AM, free options only)
1. **Run `/usage` and read the numbers to Claude** (what the $100 is, when it ends, whether overage can charge you). It decides how much model work the MUN vault can get.
2. **MUN:** decide the cap and model for cloud run 2 (starts at S/RES/404); the pipeline and a first cloud run already work (150 verified).
3. **Instagram:** 10 minutes: open `@wantsandneedsbrand_` in your Chrome and let Sort Feed download the top reels into `C:\dev\reels\1-inbox\`; then the analysis can run.
4. **Obsidian MCP:** fix the misplaced block in `claude_desktop_config.json` and regenerate the API key (it was shown in chat).
5. **Fable Clothing:** with the owner, start the trade licence and bKash / Nagad / SSLCommerz applications (long lead times) and collect the missing content.
6. **Content Creation:** generate the face options, make the three free accounts, run the scored test.
7. **Learn authentication** with one small login built line by line.
8. **N8N:** Telegram bot, HTTPS and `WEBHOOK_URL` on the VPS, then import the workflow.
9. **Blue by Fable 3D:** shoot one shoe on a turntable and try Meshroom.
10. **Ares:** look at the new layout and re-run the multi-task test.
Parked: Marketlens. Excluded on request: Gym Tracker.

