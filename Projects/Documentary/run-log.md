---
up: "[[Documentary STATE|STATE]]"
tags: [project, documentary, log]
---
# Documentary run-log
## 2026-10-07
- User gave the Promptbase link (tracking parameters removed; only `?tab=video` kept). Plain WebFetch returned only the header (JS-rendered page), so I read it with headless Playwright (Chromium 1243): `C:\dev\documentary\grab.py`, output `page.txt` (27 KB) and `page.png`. No login, no paywall bypass.
- Found: 30 lessons, 3 free, $49 for the rest; locked bodies on the page are filler text, not real content.
- Created this project: [[Documentary STATE|STATE]], [[lessons]], [[starter-prompt]]. Added the site to [[important-websites]], a to-do entry, and the aqua colour in three places.

## 2026-10-07 (later): pipeline + first test
- User: keep as a MAJOR project, one hour, rendered part by part, build pipeline architecture, import skills afterwards.
- Installed in `C:\dev\documentary\`: puppeteer (npm; its Chrome download was left unapproved, so it drives the system Chrome 154 via executablePath), @fontsource/space-grotesk (OFL font copied to `fonts/`), ffmpeg 7.1 copied from imageio-ffmpeg to `bin/ffmpeg.exe` (no winget, no ffprobe). Verified filters: sidechaincompress, loudnorm, anoisesrc, apad, amix; encoders libx264 and h264_nvenc.
- Already available, not reinstalled: faster-whisper (captions), Kokoro + Piper in `C:\dev\Virtual Assistant\.venv` and `voices/` (voice).
- Wrote my own `tokens.js`, `index.html`, `render.mjs` from the free prompt's public contract (renderFrame(t) is a pure function of time). Result: stills check looked right; full run 331 frames in 9.9 s (about 33 fps), `out/title_cards.mp4` 11.0 s, 260 KB. Extrapolation (untested for complex scenes): 108,000 frames per hour is roughly 55 min of capture.
- Canvas: [[documentary-pipeline.canvas]]. Not built yet: manifest, validator, voice/captions/sound stages, scene library, cache/parallel/resume, join.
- Still needed from the user: nextwork.io plan details, tone, deadline.

## 2026-10-07 (later still): nextwork recon
- User asked to open their browser, go to nextwork.io and scrape it, find "the video by Claude Code". nextwork.io = domain for sale (Atom.com); real site nextwork.ai. Read the home page (first 40 KB of 79 KB) and the project "Edit Videos with Claude Code" in the user's Chrome via Claude in Chrome, read-only; no clicks that change anything, no personal data kept. Note: [[nextwork-research]].
- Finding: NextWork's editor = Remotion + ffmpeg + faster-whisper, same stack as ours. Plugin NOT installed (vet first).
- Open question for the user: what is "NextWork's new plan"?

## 2026-10-07 (evening): NextWork deep dive (user: "go through everything... for the next 10 minutes")
- Read in the user's Chrome (read-only): project "Edit Videos with Claude Code" in full incl. Secret Mission; YouTube video d_HBshlrJN8 (19:50) full auto-transcript; project "Video Editing with Claude x Remotion" in full.
- Read via gh (public repos, read-only): nextwork-projects/ai-video-editor (all 49 files copied to `C:\dev\documentary\nextwork\repo\` for reading; MIT; pattern + host scan clean) and the file list of remotion-dev/skills.
- Problems logged: yt-dlp subtitle fetch got HTTP 429 (twice), so no retry loop and no workaround; transcript taken from the YouTube transcript panel instead. A local receiver (`recv.mjs`) to move text out of the browser hung the tab (likely a local-network permission prompt); abandoned, not bypassed. Stray typing in the NextWork page just scrolled it.
- Nothing installed. Deep dive note: [[nextwork-editor-deep-dive]].

## 2026-10-07 (night): download attempt
- Cloned `nextwork-projects/ai-video-editor` and `remotion-dev/skills` into `C:\dev\documentary\` (read, vetted: clean). Full ffmpeg+ffprobe (BtbN gpl build) in `C:\dev\documentary\ffmpeg\bin\`.
- `~/.ai-video-editor/venv` created with faster-whisper and yt-dlp (others unconfirmed). Whisper small model folder present (completeness unconfirmed).
- Remotion renderer NOT installed: two overlapping install runs (my mistake: first script run outlived its shell, the rerun started a second one) both ran `npm install` into the same folder (TAR_ENTRY_ERROR), then the harness killed the rerun for low memory. I stopped the two orphan npm processes and deleted the corrupted `~/.ai-video-editor/remotion/node_modules`.
- Sample video (61 MB) not downloaded. Doctor check not run.
- Rule for the retry: ONE install process at a time, memory permitting; do not start it until the user says go.

## 2026-10-07 (night, later): install finished
- One-process rerun (`C:\dev\documentary\install-rest.sh`) succeeded: Whisper small model, Remotion renderer with Chrome headless shell 149 (113 MB), sample-take.mp4 (61 MB, `C:\dev\documentary\`).
- `setup.py doctor`: every line ok, final line `Ready.` (python 3.13, ffmpeg N-127222 full build, node 24.21, git, venv packages, model, renderer, gh logged in; ElevenLabs key not set, optional).
- ffmpeg is on PATH only inside my install script (`C:\dev\documentary\ffmpeg\bin`); permanent PATH change awaits the user's OK.
- Screen turned off (monitor power message) and Chrome partly closed at the user's request; Chrome main process left running, not force-killed.

## 2026-10-07 (night, later): editing pipeline canvas and voice note
- User asked whether the "entire canvas pipeline of the editing work" was made. Honest answer: only the planning canvas existed. Built [[editing-pipeline.canvas]] (10 stages + taste file + skills) and [[voice-options]]. Nothing in them is built as code yet except the render harness and installed tools.

## 2026-10-07 (night, later): Hyperframes
- User: "check those repos and install them". Found heygen-com/hyperframes (58K stars, Apache-2.0). Vetted npm package (no install scripts), skills (no risky patterns), hosts, telemetry. Installed Claude plugin `hyperframes@hyperframes` at project scope in `C:\dev\documentary`, marketplace added to user settings. Disabled telemetry. `hyperframes doctor` OK except optional whisper-cpp, Kokoro, MusicGen, Docker. Note: [[hyperframes]].
- Not installed: nateherkai/hyperframes-student-kit (not vetted). HeyGen sign-in left to the user.

## 2026-10-07 (night, later): Hyperframes test film
- Ran the faceless-explainer route by hand (silent). 30 s film rendered, details in [[hyperframes]] (section "First test film"). Screen turned off at the user's request.

## 2026-10-08: content notes moved to the Content vault
- voice-options.md now lives in `C:\CONTENT VAULT\3 AI Animation\`; a stub with a link stays here (the canvas and this log still link to it). The rest of the Documentary notes stay in this vault (install/vetting logs, research, canvases).
