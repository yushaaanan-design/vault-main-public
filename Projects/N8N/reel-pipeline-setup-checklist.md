---
up: "[[N8N]]"
tags: [n8n, context, reel-pipeline, checklist]
---
# Reel Pipeline — Phase 1 Setup Checklist

Companion to [[reel-pipeline-context]] (the design) — this is the *setup* to-do that has to be done before any node gets wired in the n8n editor. Also tracked visually in [[reel-pipeline-progress.canvas|reel-pipeline-progress]] (same info, canvas view). Update both when a step completes.

## Confirmed state (as of 2026-09-27)
- n8n: self-hosted, already running on the Hostinger VPS.
- Whisper: going self-hosted (`whisper.cpp`), not the API — chosen for cost.
- Vision/summarization model: **Gemini 2.5 Flash, free tier** (switched from Claude on 2026-09-27 — user needs $0 cost for personal use; free tier gives 1,500 requests/day, 15/min, multimodal, no card required).

## Checklist (do in this order)

- [x] **1. Install yt-dlp + ffmpeg on the Hostinger VPS** — done 2026-09-27
  ```
  apt update
  apt install -y ffmpeg python3-pip
  pip3 install --break-system-packages -U yt-dlp
  ffmpeg -version
  yt-dlp --version
  ```
  (Logged in as root already, so no `sudo` needed — using it caused a garbled paste. Ubuntu 24.04's PEP 668 externally-managed-environment guard needed `--break-system-packages`; skipped a venv, this VPS runs one job so it's not worth the overhead.)
  Confirmed: **ffmpeg 6.1.1**, **yt-dlp 2026.08.19** both run cleanly.

- [ ] **2. Install and build whisper.cpp on the VPS**
  Clone, build, download a small/base model.
  Verify: transcribe one local test audio file from the command line before wiring it into n8n.

- [ ] **3. Create the Telegram bot via @BotFather**
  Message @BotFather → create bot → get token → add as a Telegram credential in n8n (not hardcoded in a node).
  Verify: Telegram Trigger node in n8n authenticates as the bot.

- [ ] **4. Add a Gemini API credential in n8n**
  Get a free API key from Google AI Studio → add as an n8n credential for the HTTP Request node. No card required for the free tier.
  Verify: a trivial text-only HTTP Request call to the Gemini API succeeds before the multimodal call is built.

- [ ] **5. Build the phase 1 workflow in the n8n editor** (only after 1–4 are all verified)
  Telegram Trigger → IF has video → HTTP Request (Telegram getFile, resolves file_id to a URL) → Execute Command (yt-dlp) → Execute Command (ffmpeg audio) → Execute Command (whisper.cpp transcribe) → Execute Command (ffmpeg key frames) → Code (build multimodal prompt) → HTTP Request (Gemini 2.5 Flash vision) → Edit Fields (shape output) → Telegram reply. See `reel-pipeline-workflow-build.canvas` for the full node-by-node build guide.

## Known follow-ups
- Cleanup: nothing currently deletes files in `/tmp/reels/` — decide on a final `rm` node vs. a separate scheduled cleanup workflow before this runs unattended for long.
