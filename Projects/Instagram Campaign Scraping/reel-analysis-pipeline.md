---
up: "[[INDEX]]"
tags: [project, instagram, web-scraping, pipeline]
---
# Reel analysis pipeline (free tools only)

Part of [[Instagram Campaign Scraping/STATE|Instagram Campaign Scraping]]. Written 2026-10-05. Nothing here fetches a site: it reads a reel file you saved.

## The idea
A reel = **audio** + **video frames** on one clock. Split them, analyse each, then **merge on the timestamp**. Result: a table where every second has what was said, what was on screen, and what changed.

```
reel.mp4
 ├─ ffmpeg → audio.wav ──► faster-whisper ──► words + start/end times ─┐
 ├─ ffmpeg → frames (2 per second) ─► OCR + vision ─► detail per frame ┼─► MERGE by time ─► timeline.json ─► report
 └─ PySceneDetect → cut timestamps (pacing) ───────────────────────────┘
```

## Steps
1. **Get the file.** Save it manually (safest). Automated download (`yt-dlp`) needs your "go" and Instagram registered in `sites.md` first.
2. **Audio out:** `ffmpeg -i reel.mp4 -vn -ac 1 -ar 16000 audio.wav` (Whisper wants 16 kHz mono).
3. **Transcribe with times:** faster-whisper `large-v3-turbo`, `word_timestamps=True`. Gives each word a start and end. The first 3 seconds are the **hook**.
4. **Frames:** `ffmpeg -i reel.mp4 -vf fps=2 frames/%04d.jpg` (frame N is at N/2 s). Plus **PySceneDetect** for exact cut moments: cut count and shot length = pacing. One frame per shot is enough to describe.
5. **Details per frame**, cheapest first:
   - **OCR** reads on-screen text, captions, prices.
   - **Vision model** answers one fixed question per frame (shot type, people, product, setting, text, colours, emotion). A fixed question gives the same fields every time.
   - **OpenCV stats:** brightness, dominant colour, face present or not.
6. **Merge on time.** Every item carries `t_start`/`t_end`; sort by time. Example row:
   `0.0–1.2 s | close-up of shoe | text "New drop" | voice "stop scrolling" | cut at 1.2 s`
7. **Analyse the timeline** with the rubric below.
8. **Many reels:** same timeline for each, then compare numbers (length, hook type, cuts per 10 s, CTA position).

## Free tools (all local, no paid API key)
| Job | Tool | Cost |
|---|---|---|
| Split audio/frames | ffmpeg | free |
| Speech to text | faster-whisper (tested on this PC) | free |
| Shot cuts | PySceneDetect | free |
| Frame handling, stats | OpenCV | free |
| On-screen text | EasyOCR or PaddleOCR | free |
| Glue | Python | free |
| Describe frames (vision) | **Option A:** local model via Ollama (Qwen2-VL / LLaVA; needs GPU/RAM; ask before any download). **Option B:** Claude reads the frames in-session (inside the existing subscription, no extra API cost). | free |

## What the analysis is based on: a rubric we write
There is no ready-made "reel analyzer" among the installed skills. The merged timeline is the **data**; the **rubric** is the questions; Claude applies it.

| # | Question | Where the answer comes from |
|---|---|---|
| 1 | Hook type in the first 3 s (question, claim, visual shock, text) | voice + frame 0–3 s |
| 2 | Cuts per 10 s, average shot length | PySceneDetect |
| 3 | When the product first appears | vision, per frame |
| 4 | Where the call to action sits | voice + OCR |
| 5 | On-screen text: how much, when | OCR |
| 6 | Voice vs music vs silence | Whisper |
| 7 | Caption and hashtags | saved with the reel |
| 8 | Format (talking head, product demo, b-roll, trend) | vision |

Optional: package the rubric as our own skill with the installed `anthropic-skills:skill-creator` (free, local, no web).

## About the "skill finder" plugin you heard of
Probably a tool that searches a public skill registry and installs skills. **Name not verified**; confirming it needs a web search, which I only do on your go. Third-party skills run with Claude's permissions, so vet before installing (same rule as GitHub repos). We don't need one for this: the rubric above is the analyzer.

## First build
`analyze_reel.py reel.mp4`: steps 2–4 and 6, frames at 1 per second, no vision yet, writes `timeline.json` + a markdown table. You read every line and test it on a reel you saved. Vision step second.

## Open
- Which brand and campaign (see STATE).
- Vision: Option A (local) or B (Claude in-session)?

## Editing factors (added 2026-10-05)
Goal behind all this: feed a **free video editor** that Claude drives. So the analysis must capture *how the reel was edited*, not only what it says. Each factor, and the free way to measure it:

| Edit factor | How to detect (free) |
|---|---|
| Cuts, shot length | PySceneDetect (content + adaptive detectors) |
| Transition type (hard cut, dissolve, whip pan, flash) | frame-difference over the 3–10 frames around each cut (OpenCV) |
| Speed changes, slow-mo, speed ramps | motion per frame (OpenCV optical flow), ffprobe frame timing |
| Zoom / punch-in / camera move | optical flow direction (OpenCV) |
| On-screen text: style, position, in/out timing, animation | OCR on dense frames around each text change |
| Colour grade, contrast, filters | histogram + dominant colour per shot (OpenCV) |
| Music beat vs cut sync | librosa beat tracking, compare beat times to cut times |
| Audio mix: music under voice, loudness, SFX hits | ffmpeg `ebur128` loudness, librosa onset detection |
| Captions (burned-in subtitles): font size, position, word-by-word | OCR + position boxes |
| A-roll vs B-roll ratio, overlays, stickers | vision model, per shot |
| Format specs | ffprobe: resolution, fps, aspect, duration |

All of these go into the same timeline, so each row can say e.g. `3.2 s | cut | whip-pan transition | zoom-in 110% | beat hit | text pops in "SALE"`.

## Output = an edit spec (what the free editor consumes)
The analysis ends in an **edit spec** (JSON): shots with start/end, transition, speed, zoom, text overlays with timing, music cue, caption style. Same format both ways:
- **Analyse a reel** -> edit spec describing it.
- **Make a new reel** -> Claude writes an edit spec from your footage + a chosen reference spec, and a renderer builds it.

Free renderers to choose from (decide at build time, check licence for any commercial use): **ffmpeg** (the engine, always), **MoviePy** (Python, simplest to script), or an open-source editor project (Shotcut/Kdenlive) for manual touch-ups. Start with ffmpeg + MoviePy: fully scriptable, so Claude can drive it.

## Automated folder pipeline
Folders (private, never in a repo or shared link):
```
reels/
  1-inbox/       raw reels land here (manual save now; scraper later)
  2-processing/  watcher moves a file here while it works
  3-analysed/    timeline.json + frames + audio per reel
  4-specs/       edit specs (analysis result, or Claude's new spec)
  5-renders/     finished videos
  failed/        anything that errored, with the error text
```
Flow: **inbox -> watcher (Python `watchdog`, free) runs analysis -> analysed -> Claude reads the timeline + rubric and writes/updates the spec -> renderer -> renders**. Each stage only reads the previous folder, so any stage can be rerun or swapped.

- **Scrape stage (the only part that touches a site):** drops files into `1-inbox/`. Stays off until you pick the approach, Instagram is registered in `sites.md`, and you say go. Until then, you drop saved reels into `1-inbox/` by hand and everything after it already works.
- **Claude stage:** I read `3-analysed/<reel>/timeline.json` in a session (free inside your subscription). Fully unattended Claude needs the API (paid), so for now this step is you saying "process the inbox" and me doing the batch. Decide later if it must be hands-off.

## Build order (smallest steps)
1. `analyze_reel.py` -> timeline.json (audio, frames, cuts). Test on one saved reel.
2. Add edit factors (transitions, zoom, speed, beat sync, loudness), one per step.
3. Folder watcher around it.
4. Edit-spec schema + a renderer that rebuilds a simple reel from a spec (round-trip test: analyse a reel, render its spec, compare).
5. Claude writes new specs from your footage.
6. Scraper into `1-inbox/` last, after the approach decision and your go.
