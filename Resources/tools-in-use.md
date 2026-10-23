---
up: "[[Resources]]"
---
# Tools in use (started 2026-10-08)

One running list of every tool, server, library and folder in use. **Rule: when a tool is installed, removed or its access changes, add or edit its row here and say what changed (date, why).** Facts only; no secrets. See also [[github-repos]] (saved repos), [[skills-list]] (skills), [[important-websites]].

## Claude Code and its access
| Tool | What it does | Access / scope | Notes |
|---|---|---|---|
| Claude Code (VS Code extension) v2.1.293 | Main assistant, edits files, runs commands | Auto mode on | Model: Sonnet 5.5 (Claude Pro) |
| **Windows-MCP** (CursorTouch v0.8.5, `uvx windows-mcp@0.8.5 serve`) | Screenshot, click, type, launch apps, shell, registry, files, clipboard, process | **FULL ACCESS since 2026-10-08** (all tools; the earlier `--exclude-tools PowerShell,Registry,FileSystem,Scrape,Process,Clipboard` was removed at the user's request). **User scope: every project on this PC** (moved 2026-10-08 by the user). Telemetry off. | Other projects pick it up after a session restart. Risk: anything on screen could try to steer it; use on the user's instruction only. |
| Claude in Chrome | Drives the user's Chrome | Per-site permissions in the extension | |
| claude.ai connectors | Gmail, Google Drive, Claude Docs, Jotform, composio | Connected | Cognito Forms, Hex, Atlassian, Amplitude EU need sign-in; Definite endpoint fails (not found) |
| Plugins | agent-skills, frontend-design, impeccable, obsidian, ponytail, taste-skill (enabled); hyperframes (enabled, user 0.8.185 + project 0.8.139, checked 2026-10-23) | User scope | Skill list in [[skills-list]] |
| Hooks | Ponytail mode (laziest working solution) active each session | | |

## Obsidian
| Tool | Use |
|---|---|
| Obsidian 1.14.4 (reinstalled 2026-10-19 after a PC reset, silent install from the official GitHub release, sha256 + signature checked) | Notes. Vaults: `C:\OBSIDIAN VAULT\Codebase and learning` (main), MUN VAULT (sold product, keep separate), `C:\CONTENT VAULT` (content) |
| Canvases | Architecture pictures, e.g. `Projects/Web Scraping/screen-control-reel-bot.canvas` |

## Reel pipeline on this PC
| Tool | Use | Where |
|---|---|---|
| Telegram Desktop + bot `@yusha_reel_saver_bot` | Send reel links from phone or PC | Token in `C:\dev\reels\bot\.telegram-token` (SECRET) |
| `reel_bot.py` (stdlib Python) | Receives links, downloads, replies | `C:\dev\reels\bot`, start with `start-bot.cmd`, log `bot.log` |
| yt-dlp 2026.8.19 + session cookies | Downloads Instagram / YouTube / TikTok | `C:\dev\reels\cookies.txt` (SECRET, valid to 2027-10-08) |
| faster-whisper 1.2.1, scenedetect, opencv, imageio-ffmpeg | Analysis: words with times, cuts, frames | `C:\dev\reels\3-analysed` |
| instaloader 4.15.3 | Instagram helper (blocked by 429 anonymously) | |

## Scraping and data (Web Scraping project)
Python 3.13 with requests, beautifulsoup4, pillow, playwright 1.63, numpy, fastapi; SQLite `market.db`; CLIP lookup with open_clip_torch + torch (CPU build 2.14.1; note: scipy and sentence-transformers are blocked by Windows Application Control). Data in `Web Scraping/data/`. Apps: Marketlens (FastAPI + React, `Desktop/Marketlens`).

## Dev folders under `C:\dev`
`reels`, `agents`, `documentary`, `gym-vision` (own venv, CUDA torch, mediapipe, ultralytics), `img2threejs`, `MUN assistant`, `mun-pipeline`, `mun-pipeline-a11`, `Virtual Assistant` (Ares).

## Whole-PC inventory (surveyed 2026-10-08 from the Windows uninstall list, npm, py launcher)
| Group | Installed |
|---|---|
| Dev | VS Code 1.141, Git 2.55, GitHub CLI 2.102, Node.js 24.21 (npm globals: `@playwright/cli` 0.1.21, `omniroute` 3.8.50), Python 3.13.7 + 3.14.7 (uv-managed), PostgreSQL 18, Android Studio 2026.2 |
| AI | Ollama 0.35.1 (local models), NVIDIA App (driver 580.88, CUDA 13.0 capable; no CUDA Toolkit) |
| Notes and chat | Obsidian 1.13.7, Telegram Desktop 7.2.9, Microsoft 365 (OneNote, Teams add-in), Copilot |
| Browsers | Chrome 154, Edge 154 |
| Network | Tailscale 1.102, qBittorrent 5.2.3, Norton Security |
| Cloud | OneDrive |
| Hardware / OEM | MSI Center, MSI App Player, NVIDIA App |
| NOT installed | ffmpeg on PATH (only the `imageio-ffmpeg` Python copy), `uv tool` packages (none) |
Other apps: IDLE (Python 3.13), Notepad, Xbox.

## Housekeeping
- Windows-MCP screenshots are cached as `mcp-windows-mcp-blob-*.png` under `~\.claude\projects\...`. Delete old ones by hand for now (a scheduled cleanup was blocked by the permission classifier, to be decided later).

## Change log
- 2026-10-08: list created. Windows-MCP given full access (exclusions removed). Reel bot created and proven end to end.
- 2026-10-08: Windows-MCP moved from local to USER scope (all projects), full tools, same pinned version. Whole-PC inventory added.
- 2026-10-08: pip installed nvidia-cublas-cu12, nvidia-cudnn-cu12, nvidia-cuda-nvrtc-cu12 into Python 3.13 so faster-whisper can use the RTX 3060 (6 GB). Full CUDA Toolkit still not installed.


- 2026-10-09: FFmpeg 9.0.2 essentials (gyan.dev, sha256 checked) at C:\dev\tools\ffmpeg-extract\ffmpeg-9.0.2-essentials_build\bin, not on system PATH; needed by `hyperframes render`. HyperFrames CLI 0.8.143 (npx), project C:\dev\reel-edits\story. Ares phone page: new resumable file upload (paperclip) into C:\dev\reel-edits\inbox.
- 2026-10-09: Whisper large-v3 (faster-whisper, HF cache, ~3 GB) added beside large-v3-turbo. Reel bot autostart: Startup folder `reel-bot.cmd`. `music_analysis.py` (numpy) in Web Scraping.
- 2026-10-10: planned/downloading: ComfyUI portable v0.39.0 + SDXL base 1.0 in C:\dev\comfy-dl (not yet installed). See CONTENT VAULT/3 AI Animation/Sketchbook Reels - to-do.
- 2026-10-10: ComfyUI portable v0.39.0 installed at C:\dev\comfy (running, --lowvram, 127.0.0.1 only), SDXL base 1.0 in models/checkpoints; shims for blocked regex/av; sketchbook scripts in C:\dev\sketchbook. Reel loop in C:\dev\reels\loop (config.json).

- 2026-10-10: ComfyUI-GGUF custom node + gguf 0.19.0 installed; FLUX.1 schnell/dev Q4_K_S GGUF, t5xxl fp8, clip_l, ae VAE downloading (carousel images).

- 2026-10-14: pip installed pymupdf 1.28.2 (PDF page/figure rendering) and matplotlib 3.11.2 (charts) into the user Python, for BUP MUN paper notes (scripts in C:\dev\bup-mun\scripts).
- 2026-10-11: Everything Claude Code (affaan-m/ECC v2.2.3, MIT) INSTALLED globally in ~/.claude (full profile + hooks; ~300 skills, 68 agents, 94 commands, 24 hooks). Backup C:\dev\backups\claude-before-ecc. Windows OCR (WinRT) used for reel on-screen text; Qwen3-8B/4B abliterated via Ollama for reel briefings.
- 2026-10-19: **PC was reset (network adapter problem; happens every few weeks).** After the reset only these of the 2026-10-08 inventory were found: VS Code, Node.js 24.22, Chrome, Edge, OneDrive, Microsoft 365, Norton, NVIDIA/MSI/Intel drivers. MISSING: Git, GitHub CLI, Python 3.13/3.14, PostgreSQL 18, Android Studio, Ollama, Telegram Desktop, Tailscale, qBittorrent, Obsidian (reinstalled today, 1.14.4). Reset kit in OneDrive: `C:\Users\yusha\OneDrive\PC Reset Kit\` = `apps.ps1` (save / `-Compare` the installed-app list, `installed-apps.csv` 113 apps), `backup.ps1` (copies the 4 vaults + C:\dev code/notes to `backup\`, secrets excluded). Not backed up: comfy, comfy-dl, LuxMax, gym-vision, venvs, models, media, cookies.txt, .telegram-token.
- 2026-10-14: pip installed markdown (Python-Markdown) into the user Python; new script C:\dev\bup-mun\scripts\md2pdf.py turns Obsidian notes (Mermaid, callouts, footnotes) into PDF via Edge headless (Mermaid 10.9.1 loaded from jsdelivr at print time).
- 2026-10-20: MUN Academy website prototype at C:\dev\mun-academy\web: React 18.3.1, react-dom 18.3.1, Vite 5.4.11, @vitejs/plugin-react 4.3.4 (local node_modules, 62 packages, npm 11.19 on Node 24.22). Dev server port 5180 (`web\Start site.cmd`). Stdlib scripts added: build_course.py, md_lite.py, canvas_to_html.py, scrape_ref_site.py, next_flight.py, analyze_ref_sites.py. REA skill (morluto/rea) downloaded to C:\dev\_quarantine\reverse-engineer-skill, NOT installed. Note: `git` was not found on PATH this session (inventory above lists Git 2.55; check after the reset).
- 2026-10-21: **Windows-MCP was failing** ("Connection closed"): `uvx` defaulted to Python 3.15 where `pyyaml` fails to build. Fixed by launching it as `uvx --python 3.13 windows-mcp@0.8.5 serve` in `~\.claude.json` (backup `.claude.json.before-windows-mcp-fix`); reconnect with `/mcp`. Claude in Chrome extension was not connected; Classroom was read through Windows-MCP in the School Chrome profile instead.
- 2026-10-21: Gmail connector confirmed as the BRAC account `yusha.aanan.ahasan@g.bracu.ac.bd` (read-only use); the Google Drive connector is a different, older account and cannot see BRAC files. School Chrome profile = `Profile 1`.
- 2026-10-21: Slack Desktop 4.52.182 installed via `winget install SlackTechnologies.Slack` (user asked; hash verified). Composio Slack connection started (alias `cse321-brac`), pending the user's approval. Academic links and the Academics shortcut now open in Chrome `Profile 1` (BRAC account).
- 2026-10-21: Academics app built at `C:\dev\academics-app` (plain HTML/CSS/JS, no dependencies): `index.html`, `data.js`, `workspace.js`, `academics.ico`, desktop shortcut `Academics.lnk`. Notes vault `C:\ACADEMICS VAULT`.

- 2026-10-21: Reel pipeline Python packages reinstalled after the 19 Oct reset (user approved all incl. torch): yt-dlp 2026.8.19, faster-whisper 1.2.1, ctranslate2 4.8.3, opencv-python 5.0.0.93, scenedetect 0.7.2, instaloader 4.15.4, requests 2.34.2, imageio-ffmpeg, nvidia-cublas/cudnn/nvrtc-cu12, torch 2.14.1+cu126 and torchvision 0.29.1 (CUDA True on RTX 3060 Laptop). Versions saved to OneDrive PC Reset Kit\requirements-python313.txt. New: PC Reset Kit\System Settings\System Settings Guide.md (Wi-Fi fix, restore point, backups, package order). backup.ps1 now also copies C:\ACADEMICS VAULT. Restore point NOT created (needs admin, user to run).

- 2026-10-21: Blender 5.2.2 installed via winget (BlenderFoundation.Blender, official blender.org MSI, hash checked, user approved) at C:\Program Files\Blender Foundation\Blender 5.2\blender.exe. For the game-style avatar (plan: C:\dev\avatar\plan.html). Also fixed faster-whisper on this PC: decode audio with ffmpeg to a numpy array (PyAV 19 breaks decode_audio) and put site-packages\nvidia\*\bin on PATH (cublas DLL).

- 2026-10-21: Blender extension MPFB (MakeHuman human generator, extensions.blender.org, build 20261010) installed; MakeHuman CC0 system asset pack (268 MB) at C:\dev\avatar\assets and copied into MPFB user data (%APPDATA%\Blender Foundation\Blender\5.2\extensions\.user\blender_org\mpfb\data). GitHub CLI logged in as yushaaanan-design; six vault repos (private).
- 2026-10-21: installed mediapipe 1.1.1 (pip, Python 3.13; pulled opencv-contrib-python 5.0.0.93, absl-py, sounddevice) + face_landmarker.task model at C:\dev\tools\models (3D Avatar: closed-mouth reference finder).
- 2026-10-21: 3D likeness kit at C:\dev\avatar\kit (own scripts, no install): face_ratios, head_widths, eye_probe, width_probe, target_probe, grid, find_closed_mouth + build_template.py (Blender/MPFB, curves hair). Method: Resources/3d-likeness-framework.md + .canvas.

- 2026-10-22: added **cloudflared** 2026.10.3 (C:\dev\tools\cloudflared.exe, official signed exe; winget install failed with code 94). Used for free quick tunnels to share a local dev site (Fable preview). No account, no service installed.
- 2026-10-23: **HyperFrames plugin confirmed installed and enabled** (`claude plugin list`): `hyperframes@hyperframes` 0.8.185 at user scope and 0.8.139 at project scope (note: its bun.lock does not list the plugin as only workspace, so its listed packages were not installed; not tested, user said no tests yet). **find-skills** (vercel-labs/skills, via `npx skills add vercel-labs/skills --skill find-skills -g -y`) installed at `~\.agents\skills\find-skills`, symlinked for Claude Code; PromptScript target failed (harmless). SKILL.md vetted: it tells the agent to run `npx skills add ... -g -y` (global, no confirmation) and `npx skills update`; rule here: show the user a skill and ask before installing any skill it finds.


- 2026-10-23: **Reel download via Norton fix.** Instagram downloads fail with `CERTIFICATE_VERIFY_FAILED` (Norton re-signs HTTPS); `reel_bot.download()` mislabels it "wants a login". Working route: `C:\dev\clipping\yt.py` (truststore) with `C:\dev\reels\cookies.txt`. `analyze_reel.py` (Web Scraping folder) `transcribe()` now reads the wav itself (PyAV 19 broke faster-whisper `decode_audio`). Not yet applied to `reel_bot.py` / `loop.py`. Bot owner: ask before editing.

- 2026-10-23: **New app folder `C:\dev\assistant\`** (Assistant / Orchestrator, git initialised, private, no commit yet). P0: `chief/core.py` + `chief/run_all.py` (plain Python + SQLite + psutil, `data/assistant.db`, lock + STOP file). No new installs (psutil already present). Reuses `C:\dev\reels\bot\reel_bot.py` for Telegram.

- 2026-10-23 (overnight): `C:\dev\assistant\` now holds the Watch, Moment Finder, Cutter, Hook Writer, review gate and chief; Windows Task Scheduler tasks **Assistant nightly** (2:00 AM) and **Assistant brief** (7:00 AM), per-user, only while logged on (remove with `Unregister-ScheduledTask`). Uses `claude -p --model haiku|sonnet --no-session-persistence` on the user's login (budget 20 calls/night in `config/budget.json`), Ollama `huihui_ai/qwen3-abliterated:4b` (local judge/voice check), feedparser, truststore, yt-dlp via `chief/ytdl.py`, ffmpeg (libx264, ass subtitles), Pillow, numpy. No new installs. Output folders: `C:\dev\assistant\outbox\`, vault `Projects\Assistant\digests\` and `reviews\`.

## Added 2026-10-22 (clipping work; verdicts in [[Tools and Skills Review]])
| Tool | What it does | Where / status | Notes |
|---|---|---|---|
| ManiClips 1.0.0 | free Windows clip maker (Tauri/Rust, bundled ffmpeg, yt-dlp, whisper.cpp CPU) | `C:\Program Files\Mani Clips`, installed, never launched, unsigned installer (hash F1299A0E...63E0) | reference only |
| Temurin JDK 21.0.12 | Java runtime for Ghidra | winget (`--source winget`) | system install |
| Ghidra 12.1.4 | disassembler for REA | `C:\dev\tools\ghidra_12.1.4_PUBLIC`, env var `GHIDRA_INSTALL_DIR` (user) | only needed for REA native analysis |
| REA (rea-agents 6.7.0) | reverse-engineering MCP | INSTALLED 2026-10-22 (user left auto mode and said download both): `npx rea-agents setup --client claude_code --yes`; MCP entry `rea` in ~/.claude.json pinned 6.7.0, skill `~/.claude/skills/reverse-engineer-anything`; first MCP health check timed out at 30 s (npx cold start), restart Claude Code | low priority for clipping |
| Agent Reach 1.5.0 | agent internet reading CLI | INSTALLED 2026-10-22: `pip install .` from the vetted local clone `C:\dev\agent-reach-repo\Agent-Reach` (1.5.0); skill at `~/.claude/skills/agent-reach` and `~/.agents/skills/agent-reach`; doctor: 4 of 16 channels work (GitHub, V2EX, RSS, any web via Jina Reader, Bilibili search), YouTube needs `--js-runtimes node` config; X, Reddit, Instagram, Facebook backends NOT installed | situational, vet backends first |
| truststore, yt-dlp[default] 2026.10.21 + yt-dlp-ejs, Node runtime | YouTube downloads behind Norton's HTTPS scanning, JS challenge | pip, wrapper `C:\dev\clipping\yt.py` | needs cookies `C:\dev\clipping\yt-cookies.txt` (YouTube+Google rows only) |
| study cycle `C:\dev\clipping\study\cycle.py` | download + comments + frame analysis of 576 shorts, deletes videos | running since 2026-10-22 | Python + OpenCV 5.0 (face cascade file fetched into study/) |
| C:\CLIPPING VAULT | notes vault for clipping (own git repo) | created 2026-10-22 | pointer note in the Primary vault |
