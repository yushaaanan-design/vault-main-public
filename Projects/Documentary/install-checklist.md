---
up: "[[Documentary STATE|STATE]]"
tags: [project, documentary, install]
---
# Documentary: everything to install and download (list made 2026-10-07)

Status key: DONE / RUNNING / TODO (needs user) / LATER. Rule: one install process at a time (the PC has only about 1.5 GB free RAM); no step starts a second `npm`/`pip`.

| # | What | Size | Where | Status |
|---|---|---|---|---|
| 1 | Puppeteer + Space Grotesk font + test render harness | small | `C:\dev\documentary\` | DONE (test MP4 rendered) |
| 2 | ffmpeg + ffprobe full build (BtbN gpl) | about 150 MB | `C:\dev\documentary\ffmpeg\bin\` | DONE |
| 3 | NextWork editor repo (MIT, read and vetted) | 1 MB | `C:\dev\documentary\ai-video-editor\` | DONE (cloned) |
| 4 | Remotion official skills repo | 1 MB | `C:\dev\documentary\remotion-skills\` | DONE (cloned) |
| 5 | Editor Python packages (faster-whisper, av, numpy, pillow, opencv, yt-dlp) | about 400 MB | `~/.ai-video-editor/venv` | DONE |
| 6 | Whisper `small` model (the editor keeps its own copy) | about 500 MB | `~/.ai-video-editor/models` | DONE |
| 7 | Remotion 4.0.530 renderer (npm install) | about 700 MB | `~/.ai-video-editor/remotion` | DONE |
| 8 | Chrome headless shell for Remotion (`remotion browser ensure`) | about 150 MB | Remotion cache | DONE |
| 9 | Sample raw take (their practice video) | 61 MB | `C:\dev\documentary\sample-take.mp4` | DONE |
| 10 | Doctor check (must print `Ready.`) | none | | DONE |
| 11 | YuNet face model (only for talking-head edits, not needed for infographics) | small | `~/.ai-video-editor/models` | LATER, skipped on purpose |
| 12 | Remotion skills into a documentary Remotion project (`.claude/skills/`) | small | new project folder | LATER (after step 7, in the "portions" phase) |
| 13 | Claude Code plugin registration: type in Claude Code `/plugin marketplace add nextwork-projects/ai-video-editor` then `/plugin install ai-editor@nextwork` | none | Claude Code | TODO user (slash commands cannot be typed by me) |
| 14 | ffmpeg on the permanent PATH | none | Windows user PATH | TODO user's OK (it changes an environment setting) |
| 15 | ElevenLabs key (better transcripts) | free tier | `~/.config/creator-teardown/.env` | OPTIONAL, user only, never in chat |
| 16 | AWS Lambda rendering | costs money | | NOT NEEDED |
| 17 | GitHub CLI | already installed and logged in | | DONE |
| 18 | Hyperframes (HeyGen): plugin installed (project scope), CLI via npx, telemetry off; see [[hyperframes]] | about 40 MB | `C:devdocumentary` | DONE |
| 19 | HeyGen sign-in (`heygen auth login --oauth`) for free music, SFX and TTS | free allowance | user only | TODO user |
| 20 | Optional: Kokoro for Hyperframes, Parakeet transcription, MusicGen local music | 0.3 to several GB | | OPTIONAL, ask first |

Not needed for the documentary: face detection, creator teardown, ElevenLabs, Lambda.
