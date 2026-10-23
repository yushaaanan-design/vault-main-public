---
tags: [resources, github]
---
# GitHub repos I've saved

Every repo I paste to Claude lands here so I don't forget it. Newest first. Status: `installed` / `saved-idea` / `parked` / `rejected`.

## 2026-10-22 (later)

### heygen-com/hyperframes (user: "Hyperframes is open source now, can you check?")
- **What:** open-source framework from HeyGen: write HTML, CSS and seekable animations, render deterministic MP4. Built for agents: ships 7 skills (core set: hyperframes, hyperframes-cli, hyperframes-registry, media-use; on demand: slideshow, remotion-to-hyperframes, figma), CLI (`npx hyperframes`), Studio, Claude Code plugin (`claude plugin marketplace add heygen-com/hyperframes`). Needs Node 22+.
- **Repo:** Apache-2.0 (LICENSE file read, SPDX Apache-2.0), 69,238 stars, 6,268 forks, 394 open issues, created 2026-03-10, pushed 2026-10-22. Star count unverified like other huge repos. I cannot see when it became open source; the repo has carried Apache-2.0 since at least its creation date.
- **Status:** saved-idea for clipping (best fit: render engine for format templates: word-by-word captions, picture inserts, countdown lists, split-screen layouts, instead of ffmpeg + ASS). INSTALLED (plugin `hyperframes@hyperframes` enabled at user + project scope, confirmed 2026-10-23); not yet tested for clipping.
- **Not tested:** render speed on the RTX 3060 laptop (headless Chrome frame capture is usually slower than ffmpeg), vertical 9:16 short with a facecam crop.

## 2026-10-22

### Panniantong/Agent-Reach (user asked for it as a skill or repo)
- **What:** Python CLI + skill that gives an agent "internet eyes": read/search Twitter/X, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, Douyin and more through one CLI. README is Chinese-first (English in docs/README_en.md); lists sponsors (BrowserAct, CoreClaw, Tencent Cloud).
- **Repo:** MIT, 100,619 stars / 8,858 forks, created 2026-02-24, pushed 2026-10-20. Python 3.10+. Look-alikes exist (EdisonChenAI/agent-reach, xiaoou-waou/agent-reach, buddybuses-dev fork): avoid.
- **Status:** saved-idea. Cloned (not installed) to `C:/dev/agent-reach-repo/Agent-Reach`. Not vetted: install scripts, pip deps, scripts/ folder. Useful for clipping research (reading YouTube/Reddit/X for what goes viral).

## 2026-10-20

### morluto/rea (skill: reverse-engineer-anything, "REA")
- **What:** "Reverse Engineer Anything": an MCP server + CLI (npm `rea-agents`) that lets an agent analyze shipped binaries, Electron/JS apps, APKs, firmware, browser traffic, through Ghidra/Hopper/IDA. The Claude skill is only the instruction file `.agents/skills/reverse-engineer-anything/SKILL.md` (+ 6 reference .md files); it routes a target to REA's tools. The skill alone does nothing without the MCP server.
- **Repo:** https://github.com/morluto/rea, MIT, API shows 335,546 stars / 84,773 forks (implausibly high, unverified), created 2026-04-14, pushed 2026-10-19. Official sources per README: rea.tools, npm rea-agents. Many look-alike repos exist (NabilRFG12, sketchie-durk, REA-Github org, etc.): avoid. Lighter alternative: aicodeking/leanrea (962 stars, MIT, one 8 KB skill, CLI only).
- **Status:** saved-idea (quarantined, pending user approval to install). Local copy: `C:\dev\_quarantine\reverse-engineer-skill\rea-main\`.
- **Update 2026-10-22:** user asked for a full explanation. Full shallow clone (5,130 files, v6.7.0 of rea-agents) at `C:/dev/rea-repo/rea`. API now shows 357,027 stars / 89,614 forks / 1,271 watchers (still implausible, unverified); owner morluto account created 2020-12-22, 259 repos, 9,509 followers. README tells users to get it only from github.com/morluto/rea, rea.tools or npm rea-agents. Nothing from it run yet.
- **Vetted (skill folder only):** SKILL.md + 6 references read/grepped: markdown only, no scripts, no hooks, no obfuscation. It tells the agent to run `npx -y rea-agents@latest doctor/setup/analyze-javascript-application` (downloads an npm package; setup edits client MCP config, only after a dry-run and approval). Not vetted: the rea-agents npm package, the repo's bridges and install.sh. Verdict: skill file safe to install; running the npx setup is a separate decision needing its own review.

## 2026-10-08

### CursorTouch/Windows-MCP
- **What:** open-source MCP server that lets Claude see the Windows screen and drive mouse and keyboard (screenshots, click, type, scroll, launch apps; plus PowerShell, Registry, FileSystem, Process, Clipboard and web-scrape tools). Third-party, outside Claude's own computer-use feature (which on Windows only exists in the desktop app).
- **Repo:** about 8,000 stars, 909 forks, MIT, created 2025-05-13, pushed 2026-10-07. On PyPI as `windows-mcp` (0.8.5). Python. Alternatives looked at (0 to 1 stars, weeks old): winuse-mcp, windows-computer-use-mcp, computer-use-mcp, lowlevel-computer-use-mcp; MCPControl and computer-control-mcp (MIT, less active).
- **Status:** installed, **this project only** (Claude Code local scope, private; `claude mcp get windows-mcp`), pinned `uvx windows-mcp@0.8.5 serve --exclude-tools PowerShell,Registry,FileSystem,Scrape,Process,Clipboard`, `ANONYMIZED_TELEMETRY=false`. Health check: connected. Tools load after a session restart; not yet tested. Go user-wide later with `claude mcp add windows-mcp --scope user -- uvx windows-mcp@0.8.5 serve ...`.
- **Vetted:** README read; the actual 0.8.5 wheel unpacked and read (71 files, MIT, normal dependencies: fastmcp, comtypes, dxcam, pywin32, pillow, psutil, requests, posthog). No eval/exec/encoded payloads. Outbound calls: PostHog anonymous telemetry (switched off by the env var) and one `requests.get` inside the scrape tool (excluded). Did NOT use its `install` command (it adds a start-at-login task).
- **Risk to remember:** no per-app approval like Anthropic's version, so anything on screen could try to steer Claude (prompt injection). Use only on the user's instruction, not while an untrusted page is open.

### kairi003/Get-cookies.txt-LOCALLY (Chrome extension)
- **What:** open-source Chrome extension "Get cookies.txt LOCALLY" that exports a site's cookies to a `cookies.txt` file without sending them anywhere.
- **Status:** installed by the user in Chrome on 2026-10-08, used once to export instagram.com cookies for `yt-dlp` (file `C:\dev\reels\cookies.txt`, see [[Instagram Campaign Scraping/STATE|Instagram STATE]]).
- **Vetted:** the Chrome Web Store link was taken from the project's own README (there is a malicious look-alike called "Get cookies.txt" without "LOCALLY"). Extension code and repo stats were not read.
- **Note:** an extension that can read cookies is powerful. Consider disabling or removing it in `chrome://extensions` between exports, and re-export when the Instagram session expires (2027-10-08) or after a logout.

## 2026-10-04

### JuliusBrussee/caveman
- **What:** Claude Code skill that makes replies terse (cuts output tokens). `/caveman`, `lite|full|ultra`, off with "stop caveman" / "normal mode".
- **Repo:** ~109k stars, Apache-2.0. Also has a proxy, CLI and SDKs (not installed).
- **Status:** installed (skill only): `~/.claude/skills/caveman/SKILL.md`, fetched raw from main, 4 KB.
- **Vetted:** read the file; no scripts, network calls or hooks. Skipped `npx skills add`, the curl|bash installer and the proxy/CLI.
- **Note:** other repos titled "caveman" are copies/forks; this is the original author.

## 2026-09-21

### ZadeedSwin/Portfolio
- **What:** A personal portfolio site (live at zadeedswin.github.io/Portfolio) for Zadeed Haque, a CS/AI student at Swinburne (previously BRAC University). Pitch line "Code. Create. Solve." Sections: About, Roles, Journey, Work, Skills, contact with a "Hire me" button. Lists Java, C++, web, plus video production and live streaming.
- **Repo:** public, 0 stars, 0 forks, 19 commits, no README, no license, no topics. Contents are just `index.html` and a `videos/` folder: a single-file static site on GitHub Pages, no framework and no build step.
- **Status:** saved-idea (reference for a future portfolio of my own). Not installed, nothing to install.
- **Vetted:** the fetched page showed no analytics, trackers, or external forms. Images are embedded as base64 inside the HTML. This came from a summary of the page, not a read of the raw source, so open View Source before copying anything.
- **Why it's useful:** shows the smallest possible portfolio setup: one HTML file, free hosting on GitHub Pages, nothing to maintain. No license means don't copy its code or content; take the structure as inspiration only.
- **Revisit:** when I build my own portfolio. Possible fit with [[#leonxlnx/taste-skill]] (built for portfolios and landing pages).

### img2threejs/img2threejs
- **What:** A skill that turns a reference image of an object or character into a procedural, code-only Three.js 3D model, through a staged pipeline with an AI-vision self-check loop. v2.0.0, Apache-2.0, ~16k stars, active (pushed 2026-09-13). Young repo: created 2026-07-15. Works with Claude Code, Codex, OpenCode. Live gallery at img2threejs.io.
- **Status:** saved-idea. Not installed. Not relevant to Gym Tracker (no 3D).
- **Vetted:** the core is a `SKILL.md` router plus ~226 Python 3.10+ stdlib scripts (`forge/`), no pip dependencies, no hooks found. Optional domain plugins come from `npx github:img2threejs/img2 install` (installs into `~/.img2` and adds a launcher); that runs code from a second repo I did **not** review. Skip it unless needed.
- **Watch out:** the README is heavy on sponsor badges and promo links. Some showcase demos rebuild game skins and trademarked characters (e.g. Pikachu); rebuilding others' IP is fine for experiments, not for shipping.
- **Revisit:** a future project that needs 3D (product viewer, landing-page hero, game asset). Needs Three.js knowledge first; not a beginner-React tool.

### voltagent/awesome-design-md
- **What:** ~73 ready-made `DESIGN.md` files (colors, type, spacing, component rules written in plain markdown), each extracted from a real brand's website (Linear, Apple, Airbnb, Figma, Ferrari, Claude...). You drop one in the project root and tell the agent to build UI in that style. MIT, ~117k stars. Last pushed 2026-07-31 (quiet for ~7 weeks, not archived).
- **Status:** saved-idea. Nothing to install: it's copy-a-file.
- **Vetted:** markdown only, no scripts or hooks. The README has promo blocks for the maker's other products (EveryFeed, LaunchKit); ignore them.
- **Watch out:** these describe *other companies'* visual identities. Fine as a personal learning reference, but don't ship an app that imitates a brand's look. Also `DESIGN.md` is the same filename [[#pbakaus/impeccable]] writes, so don't mix the two in one project.
- **Why not now:** Gym Tracker already has its own design system (the Plate Ladder, see [[architecture]] section 10 and `DESIGN.md`). Adding a brand file now would mean two competing design sources while you're learning CSS by hand.
- **Revisit:** polish pass after v1, or a future project with no design yet. Best pick then: a neutral dashboard-style one (e.g. Linear) as inspiration for spacing and type, not to copy.

### microsoft/playwright-cli
- **What:** Official Microsoft CLI that lets a coding agent drive a real browser with short commands (`open`, `type`, `press`, `check`, `screenshot`) instead of a heavy MCP server. Ships a `playwright-cli` skill. Apache-2.0, ~13k stars, v0.1.21, active (pushed 2026-09-18). Still early: pinned to a Playwright **alpha** build.
- **Status:** saved-idea. Not installed.
- **Install (when wanted):** `npm install -g @playwright/cli@latest`, then `playwright-cli install --skills` in the project. Headless by default; `--headed` shows the window.
- **Vetted:** no hooks, no post-install scripts in the repo; the skill is markdown plus reference docs. It will download a browser (Chromium, a few hundred MB) when set up. Its `run-code` feature runs arbitrary JS in the page, and `--persistent` writes cookies/storage to disk. Keep it pointed at `localhost` only, and never log into real accounts through it.
- **Why later:** useful from Phase 1, so I can open `localhost:5173`, click through, and screenshot to check that the UI matches the wireframes. Not needed for the Phase 0 "Hello". Screenshots read back into context cost tokens, so use sparingly. You can always just look in your own browser.
- **Revisit:** when the first real screen exists, and again for tests in the backend phase.

### pbakaus/impeccable
- **What:** Design guidance for AI coding agents: one skill (`/impeccable <command>`) with 24 commands (`shape`, `critique`, `audit`, `polish`, `harden`, `distill`, `layout`, `typeset`...) and 61 deterministic anti-"AI slop" detector rules. Apache-2.0, ~69k stars, v4.3.1, active (pushed 2026-09-20). Started from Anthropic's `frontend-design` skill. Works on real app UI, unlike [[#leonxlnx/taste-skill]].
- **Status:** saved-idea. Not installed.
- **Install (when wanted):** `npx impeccable install` from the project root, then `/impeccable init`. Also a Claude Code plugin manifest. Supports Hermes Agent (skills only, no hooks there).
- **Vetted, what it does to your machine:** ships a Rust engine binary that is **downloaded on first run into `~/.impeccable/bin/`** (unaudited native code). Adds a `PostToolUse` hook on every `Edit|Write` of UI files (`.jsx`, `.css`, `.html`, `.js`...) and a `Stop` hook ("design deep pass"). Both push reminders into my context. Writes `PRODUCT.md`, `DESIGN.md`, `.impeccable/` into the project. Hook can be turned off: `/impeccable hooks off`.
- **Why not now:** the hooks add context tokens after every edit, and we're in a learning phase where you read every line and I add one idea at a time. Automated redesign nudges would fight that. It stacks on top of ponytail's hooks too.
- **Revisit:** after v1 works, for a polish pass (`audit`, `critique`, `polish`). Then install project-scoped and start with the hook off, only the skill.

### leonxlnx/taste-skill
- **What:** ~13 "anti-slop" frontend design skills (minimalist, brutalist, soft, redesign, image-to-code, brand kit, output). Markdown only, no hooks or install scripts. MIT, ~89k stars, active (pushed 2026-09-20). Plugin name `taste-skill`; marketplace is the repo itself.
- **Status:** saved-idea. Not installed.
- **Why not now:** the main skill (~87 KB) targets landing pages and portfolios and says "not dashboards, not data tables, not multi-step product UI". It defaults to Tailwind, shadcn, Next.js, GSAP and motion. Gym Tracker is a data-heavy app on plain CSS + flexbox + Vite, so it clashes with our locked decisions. A big skill also costs context.
- **Revisit:** a future landing page or portfolio project, or the polish pass after v1 works (then only the small `minimalist-skill`, and keep plain CSS).
- **Watch out:** the README carries sponsor and affiliate links (API resellers, promo codes). Ignore those.

## 2026-09-20

### kepano/obsidian-skills
- **What:** Skills that teach an agent Obsidian Markdown, Bases, Canvas, and the Obsidian CLI. By Obsidian's CEO. MIT, ~49k stars.
- **Status:** installed (`/plugin install obsidian@obsidian-skills`)
- **Notes:** `defuddle` and `knap` sub-skills need `npm install -g` first; skipped.

### addyosmani/agent-skills
- **What:** ~25 engineering-lifecycle skills (spec, TDD, code review, security, performance, docs) plus `/build`, `/review`, `/ship` commands. MIT, ~97k stars.
- **Status:** saved-idea. Marketplace added (`addy-agent-skills`) but the plugin is **not installed** yet.
- **To install:** `/plugin install agent-skills@addy-agent-skills`
- **Why later:** most useful once Gym Tracker code exists (review, test, security skills).

### diegosouzapw/OmniRoute
- **What:** Local LLM gateway, one endpoint routing to 350+ providers (many free tiers). MIT, ~68k stars.
- **Status:** parked. Tried locally, removed the env vars, uninstall with `npm uninstall -g omniroute` if never needed.
- **Watch out:** defaults to `0.0.0.0` with no API key (network-exposed); bind `OMNIROUTE_SERVER_HOST=127.0.0.1`. Rerouting Claude Code through it risks broken caching/tool use and sends code through free-tier providers.
- **Revisit:** the AI phase, calling LLMs from Express.

### DietrichGebert/ponytail
- **What:** "Lazy senior dev" mode: forces the simplest working solution (YAGNI, stdlib first). Hooks + skills, always-on. MIT, ~143k stars.
- **Status:** installed (`/plugin install ponytail@ponytail`), always-on at `full`.
- **Notes:** terse output can clash with wanting every line explained while learning; say "stop ponytail" to turn it off.
