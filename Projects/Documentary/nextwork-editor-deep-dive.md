---
up: "[[Documentary STATE|STATE]]"
tags: [project, documentary, nextwork, editor, remotion]
---
# NextWork "Edit Videos with Claude Code": full deep dive (2026-10-07)

Everything below was read, not installed. Sources: the project page ([[nextwork-research]]), the YouTube video "I let Claude Opus 5.5 edit my videos (Free Repo)" (NextWork channel, 19:50, 4 days old, transcript read through the user's browser), the public GitHub repo `nextwork-projects/ai-video-editor` (MIT, 8 stars, last push 2026-10-06; every file read or scanned), and the Remotion project "Video Editing with Claude x Remotion". Raw copies of the repo files: `C:\dev\documentary\nextwork\repo\`.

## 1. The video, minute by minute (my summary of the auto-generated transcript)
| Time | What happens |
|---|---|
| 0:00 | Presenter says every video on screen was edited by AI. He has grown NextWork accounts past 500,000 followers and edited by hand for years. Promises: install a free GitHub repo plus the skills and plugins he uses; videos "don't look like generic AI slop" but need some fine-tuning; a skill to copy a creator's editing style. |
| 0:49 | Follows the project guide step by step. Makes folder `ai-video-editor` on the Desktop, starts `claude` in it (any IDE works: Claude desktop, Cursor, Antigravity). |
| 1:45 | Adds the two plugins (marketplace add, then install). Picks LOCAL scope (only this folder; user scope would make the skills available in any folder). Check: typing `/creator` shows `creator-teardown`. |
| 3:01 | Says "set up the editor". Setup skill installs everything in about a minute (he had a lot already): Python, free GitHub Actions render support, Whisper model, Remotion. Mentions an ElevenLabs key: better transcription (keeps ums and false starts), costs money, "around $5 a year" if you do a lot (his claim). |
| 4:11 | "Run the editor doctor": everything ready. Shows that the project guide lets you paste screenshot proof per step, which builds a portfolio page. |
| 5:25 | Step 2, break down a creator: copy 5 URLs of one creator's videos in the SAME format (his are all his system-design videos with a "wrong answer, wrong answer, right answer" format) and paste them into Claude. Tip: the aim is a style for a format, not for the whole channel. |
| 6:53 | Cost and tokens: he uses a Max plan, edits a YouTube video a day plus reels, never hit session limits; Pro may hit them. He is working on making it more token-efficient. |
| 7:50 | Result: `creator-teardowns/<handle>/teardown.md` with hooks, visual style, per-video analysis and the full format; accurate for his own videos. |
| 8:44 | Step 3, cut: drops two raw files (a "manager" and an "intern" character) into the chat with "edit my video, system design style" plus context about which file is which (optional but helps). Runs the cut skill only. Local Whisper is not perfect; ElevenLabs would be better. |
| 10:25 | Plays `cut.mp4` (rate-limit joke script). Notices pauses too long (about 6 s, 13 s) and gives ONE batched feedback message. Lesson he draws: say "cut only" up front, because animating before the cut is right wastes tokens. Local cut took 15 minutes and about 46,000 tokens; with the ElevenLabs key he got a full edit in under 15 minutes. After feedback no gap is over 0.2 s and 9 more seconds are cut; it re-transcribes the cut to verify. |
| 12:40 | First styled render: partly animated, real AWS logos used. Dislikes: on-screen text too small, hook text too high (in the app's dead zone), wants screen recordings occasionally instead of stills. Sends feedback: bigger text, rounded image corners, animate images in, bigger/lower hook, "add to a taste preferences file". |
| 13:50 | The taste file lives in the `taste` skill and keeps updating; later renders read it so mistakes are not repeated. This is how he now one-shots reels. Can change styles (hand-drawn vs polished, more zooms). |
| 15:29 | Rendering when the laptop cannot cope: free GitHub Actions render. Uses `!` shell mode inside Claude to run `gh` commands; already logged in; asks "render my edit on GitHub Actions and give me the direct workflow run URL". About 15 minutes, runs as parallel jobs then a join job. |
| 18:00 | Mentions AWS Lambda rendering (much faster, costs money, AWS credits exist), which he uses because he ships a YouTube video a day and 3 to 4 reels a day. |
| 18:39 | Compares laptop render vs GitHub render: same length, identical looking. |
| 19:20 | Wrap-up: part 2 planned with more advanced setup: another repo called **Hyperframes**, animation libraries and motion graphics. Asks viewers if they want it. |

## 2. How the editor is built (from the repo)
Two Claude Code plugins in one marketplace repo (`.claude-plugin/marketplace.json`, name `nextwork`):
- **creator-teardown** (v2.x): `fetch.py` (lists a creator's videos with views, via yt-dlp for TikTok/YouTube Shorts; Instagram is login-walled so not supported), `transcribe.py` (word-level; Whisper default, ElevenLabs Scribe if a key exists), `metrics.py` (WPM, pauses, fillers), `visual.py` (finds cuts by frame differencing, zoom events, contact sheets at 2 frames a second), `strip.py`, `editplan.py`. Hard rules in its SKILL: real numbers only, verbatim transcripts only, at least two median-performing videos as a control group, never invent a stat, never ask for the ElevenLabs key in chat. Outputs `teardown.md`, `style.json`, `events.json`.
- **ai-editor** (v1.1.1) with four skills:
  - **setup**: `doctor`, `venv`, `model`, `remotion`, plus optional `awskey`/`lambda`. Stdlib only.
  - **cut**: transcribe, Claude writes `spans.json` (quoted words to remove, kinds: retake, false_start, filler, meta, audio_event, redundant; last take wins; never types timestamps; never writes spans for pauses), `build_timeline.py` shortens every pause over the target (default 0.15 s) to 0.10 s from the audio itself, `render.py` (plain ffmpeg, CRF 18, AAC 192k, frame-accurate, no stream copy), `verify_cut.py` re-transcribes the cut and diffs it, `preview_cut.py` makes `cut-check.html` for approval (struck-through words are cuts).
  - **style-edit**: captions timed to words (chunk size, position, highlight colour from the creator's measured style), zooms at the creator's rate, logo cards (Simple Icons CC0), real website screenshots with a highlighted sentence (`capture.mjs`), animated scenes (`flow`, `race`, `pile`, counters, steps, versus) using Lucide icons, auto-generated sound effects (ffmpeg-synthesised, set about 4 dB under the speech), two layouts (overlay or split), face detection (OpenCV YuNet) so nothing lands on the face or under the app's buttons, an instant plan check (`check.py plan`), stills for approval, then render on laptop, GitHub Actions or Lambda, then a render check (`check.py render`).
  - **taste**: `taste.md` (rules in words) and `taste.json` (settings that win over the creator's style.json), kept in `~/.ai-video-editor/` so plugin updates never touch them.
- **Contracts** (`docs/CONTRACTS.md`): the only coupling between skills is a set of file shapes: `style.json`, `words.json` (transcript), `cut.mp4`, `visuals.json`, `images.json`, `plan.json`, `sfx` cues. Worth copying as a design idea for our own manifest.
- **Renderer** (`plugins/ai-editor/remotion/`): Remotion 4.0.530 project (`StyleEdit.tsx`, `Anims.tsx`, `Sfx.tsx`), `render.mjs` with commands `stills`, `bench`, `local`, `chunk`, `lambda-estimate`, `lambda`. The GitHub path splits the video into chunks of about 2 minutes (max 20 parallel jobs), renders each as h264 + PCM audio, then a join job concatenates video with `-c copy` and encodes the audio once (no AAC gap). Media goes up as a release file of a PRIVATE repo (the tool refuses a public repo; zips over 1.9 GB are split).
- **Tests/CI**: `tests/smoke.py` and a GitHub Actions workflow run self-checks and an end-to-end render on Mac/Linux/Windows every Monday and on each push.

## 3. Versions and requirements (as written in the repo/project)
| Thing | Required | On this PC (checked 2026-10-07) |
|---|---|---|
| Python | 3.9+ | 3.13.7 |
| Node | 20+ (CI uses 22) | v24.21.0 |
| ffmpeg | any recent, on PATH | none on PATH; v7.1 copy at `C:\dev\documentary\bin\ffmpeg.exe` (no ffprobe) |
| git | any | present (gh CLI present) |
| Remotion | pinned 4.0.530 (bundler, cli, renderer, google-fonts, lambda, lottie, transitions) | not installed |
| React | ^19 | via Remotion |
| Python packages | faster-whisper, `av<16`, numpy, pillow>=10.1, yt-dlp, opencv-python-headless>=4.8 | faster-whisper, numpy, yt-dlp, opencv present globally; they install into their own venv |
| Whisper model | `small` (about 500 MB), optional `medium` (1.5 GB) | `small` and `large-v3-turbo` already cached in the HF cache (the tool wants its own copy in `~/.ai-video-editor/models`) |
| Disk | about 1.5 GB (renderer about 700 MB) | 210 GB free |
| Claude | Claude Code + a paid Claude subscription | yes |
| Optional | ElevenLabs key (better cuts), GitHub CLI (free cloud render, 2,000 min/month on private repos, 500 MB artifacts), AWS account (Lambda, pay as you go) | gh present |
Remotion licence (from the repo README): free for individuals and companies of up to 3 people; bigger companies need a Remotion company licence.

## 4. Safety vetting of the plugin (read-only; verdict: low risk, not installed)
- `setup.py`: stdlib only; runs `pip install` of well-known packages into its own venv, `npm install` for Remotion, `remotion browser ensure`; prints (does not run) `sudo`/`winget`/`brew` install hints for the user; the AWS key helper hides input and saves with 0600 permissions.
- Whole-repo pattern scan: no `eval`, `exec`, `os.system`, `shell=True`; `shutil.rmtree` only on its own temp dirs; no obfuscated or base64-decoded code (base64 only decodes screenshot PNG data).
- Network hosts in the code: tiktok.com, youtube.com, instagram.com (to say it is unsupported), api.elevenlabs.io (only with a key), cdn.jsdelivr.net and cdn.simpleicons.org (icons/logos), github.com, google.com. Nothing else.
- Reads/writes: `~/.ai-video-editor/` (tools, taste, optional AWS key), `~/.config/creator-teardown/.env` (optional ElevenLabs key), project folders `creator-teardowns/` and `edits/`.
- Caveats: `capture.mjs` opens any URL Claude writes into `visuals.json` in a headless browser to screenshot it (so review the URLs); the GitHub path uploads footage to a repo in the user's account (it insists on private); the plugin runs with the user's permissions, so install only from this exact repo and re-vet after updates.
- NextWork's own lesson "Do this before downloading any MCP or Skill" (20 min) is the matching vetting guide: not read yet.

## 5. Remotion project "Video Editing with Claude x Remotion" (read in full)
Free, Easy, 1 h, Windows OK, by the same author (refreshed 3 Jul 2026). Builds animated lower-thirds and title cards over real footage with Remotion, driven by a `theme.ts` (colours, fonts, timing in frames), prompted into existence by Claude Code. Key facts:
- `npx create-video@latest` scaffolds a project (template Blank, TailwindCSS yes, **Agent Skills yes**). The Agent Skills come from GitHub `remotion-dev/skills` (about 4,900 stars, description "Agent Skills", NO licence file shown): they teach Claude Code correct Remotion patterns and install into `.claude/skills/`.
- Remotion Studio (`npm run dev`, localhost:3000) previews live; compositions are registered in `Root.tsx` with width, height, fps, frames.
- `OffthreadVideo` + `Sequence` layer graphics over footage; render with Studio's Render button (H.264 to `out/`).
- Steps 6 is missing from the page numbering (goes 5 to 7). Secret mission: a split-screen transition (video slides down at 5 s to reveal a diagram in the top third).
- The `remotion-dev/skills` repo (listed, not read in full) contains `remotion-best-practices` with sub-skills for captions (display, import SRT, transcribe), compositions, audio, audio-visualisation, calculate-metadata, effects, fonts, gifs, images, light leaks, Lottie, 3D, maps (Cesium, Mapbox, MapLibre, MapTiler, static map), interactivity, create/docs.
- Other Remotion/video projects on nextwork.ai seen in search but NOT read: Animated Video Overlays with Remotion, Video Animation Generator with Remotion, Build Animated Video Overlays, Create an Animated Social Media Video, Video Editing: Devin x Remotion, Build a Product Launch Video with AI, Create a Video Brief with Claude Code, Build a Claude Video Research Agent.

## 6. What this means for the DOCUMENTARY (my reading, unverified until tested)
| Their idea | Use for the documentary? |
|---|---|
| Remotion as the renderer | Strong candidate to replace/extend our Puppeteer harness: components, easing, transitions, Lottie, fonts, captions, charts, maps come ready. Check licence if it ever becomes a company. |
| Chunked parallel render + join (`-c copy` video, audio encoded once) | Exactly our "part by part" plan; copy the design (2-minute chunks, PCM audio per chunk). Free GitHub Actions needs a private repo and only 2,000 min/month, so a local worker pool is the default. |
| Contracts between stages as file shapes | Use for our manifest, scene files, audio files. |
| Stills first, approve, then render; one batched correction message | Adopt as our approval rule. |
| Taste file that overrides defaults | Adopt: one `taste.md/json` for the documentary style. |
| Plan check and render check scripts | Matches our "validator before render" box. |
| Talking-head cut/zoom/face logic | NOT needed (no face on screen); skip. |
| Creator teardown | Optional: could measure the pacing of infographic-style documentaries. |
| Remotion agent skills (captions, maps, charts) | The "skills to import" candidates; vet (no licence listed) then install on the user's word. |
| Hyperframes (mentioned for part 2) | Not looked up yet. |

## 7. Open items
- Not installed anything. Waiting for the user's go to (a) install the NextWork plugin into a test folder, (b) scaffold a Remotion project and the Remotion skills, or (c) both.
- Not captured: second half of the NextWork home page, the other video projects' text, Hyperframes, the 9 FAQs on Promptbase.
