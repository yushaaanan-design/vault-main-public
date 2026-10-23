---
up: "[[Documentary STATE|STATE]]"
tags: [project, documentary, hyperframes, repo]
---
# Hyperframes (HeyGen): vetted and installed 2026-10-07

Repo https://github.com/heygen-com/hyperframes: "Write HTML. Render video. Built for agents." About 58K stars, Apache-2.0, pushed daily, npm package `hyperframes` 0.8.138 (no install scripts, 34 MB, Node 22+). Mentioned as "part 2" in the NextWork editor video. Site: hyperframes.dev.

## What it is
HTML + CSS + seekable animation (GSAP, Lottie, Three.js, Anime.js, WAAPI) rendered frame by frame to MP4 (same idea as our Puppeteer harness and Remotion, but HTML-first and agent-first). CLI: `npx hyperframes init | preview | render | lint | check | snapshot | doctor | catalog | add | tts | models | auth`. Plugin ships 21 skills; the router `/hyperframes` picks a workflow.

## The workflow that fits the documentary: `/faceless-explainer`
"Turn arbitrary text into a faceless explainer video: visuals invented per scene (typography, abstract graphics, diagrams, data-viz)." Steps: 0 setup (`BRIEF.md`) > 1 brief (source text saved) > 2 design system (pick a frame preset, `frame.md`) > 3 storyboard + script (user approves) > 3.1 audio (narration, word timings, music) > 4 visual design per frame (sketch sheet first) > 5 frames built by ONE SUB-AGENT PER FRAME in parallel, then captions and assemble > 6 final render with user approval. User-gated steps: 0, 3, 6.
Other relevant skills: `/media-use` (BGM, SFX, images, icons, logos, voice, transcription, captions), `/hyperframes-audio` (voiceover carve/ducking, effects, loudness), `/hyperframes-registry` (about 400 installable blocks, for example a `data-chart` block), `/motion-graphics`, `/general-video` (longer multi-scene pieces), `/remotion-to-hyperframes`.

## Vetting (read-only before install)
- npm package: no postinstall; deps normal (puppeteer-core, sharp, esbuild, hono, fontkit, prettier...).
- Skills scan: no `curl|sh`, no `eval`, no obfuscation; `child_process` used to call ffmpeg and its own scripts. Hosts in skill scripts: cdn.jsdelivr.net, gsap.com, generativelanguage.googleapis.com (Gemini, only if a key is set), api.heygen.com, oauth2.googleapis.com, basemaps (maps), us.i.posthog.com (telemetry).
- **Telemetry:** anonymous usage counts (media type, source, provider; no intent text, no paths) to PostHog; linked to the account email if signed in to HeyGen. **Disabled** by me with `npx hyperframes telemetry disable` (status confirmed disabled); also `HYPERFRAMES_NO_TELEMETRY=1`. Skills also say "send one feedback report after a render unless telemetry is disabled".
- `init` "always checks AI coding skills against GitHub" and may update the global skill set (a network read, not a write to anything of yours except skill files).

## What was installed
- Claude Code plugin `hyperframes@hyperframes`, **project scope** (`C:\dev\documentary` only). The marketplace entry `hyperframes` was added to the USER settings (global list of marketplaces); remove with `claude plugin marketplace remove hyperframes` if unwanted.
- 84 files in the marketplace checkout are Git LFS pointers (assets such as images/videos); skills themselves are normal text. Fetch only if needed: `git -C ~/.claude/plugins/marketplaces/hyperframes lfs pull`.
- Sparse reading copy of `skills/` and `docs/guides` at `C:\dev\documentary\hyperframes-repo\`.
- CLI is used through `npx hyperframes@0.8.138` (nothing global installed). Its own Chrome headless shell 154 was found in `~/.cache/puppeteer`.

## `npx hyperframes doctor` result
OK: version, Node 24.21, 12 cores, 6.3 GB RAM free, 205 GB disk, ffmpeg + ffprobe (our full build), Chrome. Failing, all optional: whisper-cpp (transcription; alternatives: Parakeet via `npx hyperframes models install parakeet`), Kokoro for Hyperframes (`pip install kokoro-onnx soundfile`; the Ares venv already has it), MusicGen local music (`pip install transformers torch soundfile numpy`, heavy), Docker (not needed).

## What needs YOU (I cannot do these)
- HeyGen sign-in: `heygen auth login --oauth`. It unlocks the free catalog (BGM, SFX, images, icons) and HeyGen TTS. Without it only local engines work (Kokoro voice, bundled 19-file SFX library, whisper.cpp/Parakeet transcription) and there is no stock music. Creating an account or signing in is yours to do.

## How it compares for the documentary (my reading, untested)
| | Hyperframes `/faceless-explainer` | Our own Remotion/Puppeteer pipeline |
|---|---|---|
| Fits "infographic documentary" | Directly designed for it, with a registry of data-viz/chart blocks | Must be built |
| Parallel frame building by sub-agents | Built in (heavy token use: matches the wish to spend credits) | Would be built |
| Hour-long films | Skill says "up to ~3 min" for product videos; explainers/longer pieces go through `/general-video` and sound scale-untested | Our plan chunks at ~2 min |
| Voice | HeyGen TTS (needs sign-in) or local Kokoro | Kokoro installed |
| Risk | Young, fast-moving (0.8.x); depends on HeyGen services for extras | Ours, slower to build |
Open question: does the film get built by Hyperframes (fast start, agent-driven, 3-minute-ish chunks assembled into an hour) or by our own pipeline (full control)? Test with a 30-second sample before deciding.

## Not done / not looked at
`nateherkai/hyperframes-student-kit` (1.2K stars, licence "other", 14 skills) and `heygen-com/hyperframes-launches` (examples): not read, not installed.

## First test film (2026-10-07): "How an AI video editor works", 30 s, silent
- Project: `C:\dev\documentary\videos\ai-editor-test\` (init with `--skill=faceless-explainer`; I wrote the single `index.html` by hand following the `hyperframes-core` contract, 6 scenes, GSAP, Space Grotesk, same dark + lime palette). No sign-in, no voice, no music (silent, no network except the GSAP CDN script).
- `npm run check`: 0 errors; layout 0 issues in 9 samples; contrast 42/42 pass. 7 lint WARNINGS, all "move each scene into its own sub-composition file" (right for the hour-long film: one file per scene = our manifest scenes).
- `snapshot` (stills first): contact sheet looked right.
- `render`: `renders/ai-editor-test_2026-10-07_07-04-21.mp4`, H.264 1920x1080, 30 fps, 900 frames, exactly 30.000 s, 2.3 MB, **rendered in 37.8 s** (hardware GPU capture, about 24 frames/s). Frame pulled from the MP4 matches the still. No audio stream (silent by design).
- Extrapolation (UNTESTED for heavier scenes): one hour = 108,000 frames, roughly 75 min of capture at this speed for scenes this simple.
- Honest quality note: technically clean, visually basic (left-heavy layouts, plain shapes, placeholder phone figure, caption wraps tight in the phone). It proves the pipeline, not the "goated" look. Next lever: design presets (`frame-presets`), registry blocks (charts), sub-compositions, then the sketch-first review loop.
- Side effects to know: `hyperframes init` linked the core skills into `~/.claude/skills` (global) and synced into other agent dirs; telemetry stays disabled.
