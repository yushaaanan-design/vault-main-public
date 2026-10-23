---
tags: [harness, central, tools]
up: "[[README]]"
---
# Tools and skills review (is it effective? 2026-10-22)

Honest verdicts. "Vetted" says exactly what I read. The full list of installed tools stays in `Resources/tools-in-use.md`.

| Tool / skill | What it is | Useful for clipping? | Vetted | Status | Verdict |
|---|---|---|---|---|---|
| **REA** (morluto/rea, npm rea-agents 6.7.0) | MCP + CLI that lets an agent inspect binaries, Electron/JS apps, websites (Ghidra, Hopper, IDA) | Barely. Its one clipping use is reading ManiClips' scoring weights out of a compiled Rust exe. We already know ManiClips only picks fixed windows; real viral data is the bottleneck, not its weights | README, install.sh skimmed, dry-run plan read (one MCP entry + skill folder). Star count (357k) unverified | INSTALLED 2026-10-22 once the user left auto mode (MCP entry + skill; JDK 21 and Ghidra 12.1.4 also installed). Restart Claude Code to load the MCP | Low priority for clipping. Strong for "how does this app's feature work" jobs. Do not spend more on it until such a job exists |
| **Agent Reach** (Panniantong/Agent-Reach 1.5.0, MIT) | Python CLI + skill that lets an agent read and search Twitter/X, Reddit, YouTube, GitHub, Bilibili, Instagram and more | Partly. YouTube we already do better (yt-dlp with cookies: metadata, comments, downloads). Its real value for us is reading Reddit and X about a streamer's community | pyproject (deps: requests, feedparser, yt-dlp, rich...; optional browser-cookie3 and playwright), file list, grep for exec/curl-pipe-shell: none found. NOT vetted: install scripts per channel, the third-party CLIs it wraps | INSTALLED 2026-10-22 (pip from the local clone + skill). Only 4 of 16 channels work out of the box; web reading goes through Jina Reader, so URLs are sent to a third party: not for private pages | Moderate and situational. It is a thin layer over separate tools (twitter-cli, rdt-cli installed from a git source, OpenCLI), each one more thing holding your logins. Install only when we start the Reddit/X community research, one channel at a time, after vetting each backend |
| **ManiClips** (maniclips.site) | free Windows app, Tauri/Rust, makes 30/45/60 s captioned shorts | No as a component: no way to feed it our own picks; fixed windows | installer hash and signature checked (unsigned), binary strings read | Installed `C:\Program Files\Mani Clips`, never launched | Reference only. One test run on a user video is optional |
| yt-dlp + cookies + JS runtime + truststore wrapper | download, metadata, comments | Yes, core | tested | working (`C:\dev\clipping\yt.py`) | Keep |
| faster-whisper large-v3-turbo on the RTX 3060 | word-timed transcripts | Yes, core | tested: 4:50 h audio in 20 min | working | Keep |
| OpenCV Haar face detector + sharpness heuristics | framing measurements | Weak: split-screen share reads about 1.0 on everything | tested | in study cycle | Cross-check only; rely on looking at frames |
