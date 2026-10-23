---
up: "[[Documentary STATE|STATE]]"
tags: [project, documentary, lessons]
---
# The 30 lessons: "AI Video With Code" (Promptbase)

Source: https://promptbase.shop/daily?tab=video (read 2026-10-07 by headless browser; raw text saved at `C:\dev\documentary\page.txt`). Course by @piyush.glitch, $49 one payment, "about 9 hours", 29-file kit. **Only lessons 1-3 are free.** For lessons 4-30 the page shows only the title (and, for 21-30, a blurb, what you build, and minutes). The body text the page shows for the locked parts is blurred filler ("Camera easing pipeline texture prompt...") and is NOT real content. Nothing here was taken from behind the paywall.

Status key: FREE = content is public. TITLE = only the title is public.

## Part 1: Motion graphics from code (20 lessons)
| # | Lesson | Status |
|---|---|---|
| 01 | Zero-cost setup: editor, model, Node, ffmpeg, headless Chrome | FREE (steps below) |
| 02 | The renderFrame(t) contract | FREE (see [[starter-prompt]]) |
| 03 | Your first title card | FREE (see [[starter-prompt]]) |
| 04 | Kinetic typography | TITLE |
| 05 | Canvas2D illustration that does not look like clip-art | TITLE |
| 06 | WebGL2 shaders: backgrounds, light and post-processing | TITLE |
| 07 | Particles: thousands of them, deterministic | TITLE |
| 08 | 3D cards and scenes with three.js | TITLE |
| 09 | Camera moves and transitions | TITLE |
| 10 | Copying a YouTube style from reference frames | TITLE |
| 11 | Captions and on-screen text without audio | TITLE |
| 12 | The render harness: puppeteer frame capture | TITLE (basic harness is in the free prompt) |
| 13 | Encoding and upscaling: CRF, supersampling, 4K, lanczos | TITLE (basic ffmpeg line is in the free prompt) |
| 14 | Vertical 9:16 cuts | TITLE |
| 15 | The Opus 5.5 build session | TITLE |
| 16 | Handing off to Sonnet 5 when tokens run out | TITLE |
| 17 | Debugging jank, flicker and non-determinism | TITLE |
| 18 | A full 30-second promo, end to end | TITLE |
| 19 | Packaging for YouTube, Shorts and Reels | TITLE |
| 20 | Selling and scaling the work | TITLE |

Typography and cinematography (what the user asked about) live in 04 (kinetic typography), 06 (shaders, light), 09 (camera moves), 10 (copying a style) and 13 (encoding). **All TITLE-only, so what they teach is unknown.** Free route: see "Free alternatives" below.

## Part 2: Long-form, from clip to channel (10 lessons)
| # | Lesson | You build | Min |
|---|---|---|---|
| 21 | The long-form architecture: an hour of film is 480 small renders. Why one prompt cannot make an hour; the system that can: a manifest, a scene library, an audio stack. | Project skeleton + first narrated, captioned film | 22 |
| 22 | Research and script: from a topic to a scene manifest. Source ledger against made-up facts, script written for the ear, the JSON the engine turns into a film. | Researched script + validated scene manifest | 26 |
| 23 | The scene library: nine visuals that carry a documentary. Titles, big numbers, charts, timelines, diagrams, comparisons, lists, your own photos; each a small file the model fills with data. | Nine reusable scene types + contact sheet | 28 |
| 24 | Free voiceover: any engine, one WAV per scene. No voice subscription, fix mispronounced names, swap engines without touching the pipeline. | Narration for every scene, cached so only edited lines are re-spoken | 20 |
| 25 | Captions that land on the word. Word-by-word captions timed with a free local model, drawn inside the scene, plus the real .srt file. | Burned-in word-highlight captions + .srt | 22 |
| 26 | Sound design with zero downloads. Whooshes, hits, music bed synthesised with ffmpeg, ducked under the voice, normalised, frame-accurate. | Per-scene audio, ducking bed, loudness-checked master | 24 |
| 27 | Render at scale: cache, draft pass, workers and resume. Tens of thousands of frames without losing a night to one crash. | Cached, parallel, resumable renderer + fast draft mode | 24 |
| 28 | Edit by chatting: change one scene and see it in minutes. Scene ids as handles, re-render only what changed. | A revision loop where a change costs seconds | 18 |
| 29 | The channel playbook: niche, cadence, packaging, policy, Reels to long-form. | A niche, a 30-day plan, chapters + thumbnails, Reels-to-YouTube loop | 30 |
| 30 | Master prompt 2: the director that runs the whole pipeline. One long prompt, topic to finished film, stopping for approval at every stage. | Reusable director prompt, state file, hand-off routine for cheaper models | 20 |

## The pipeline as the page describes it (public overview)
Topic (scorecard, L29) > Research (source ledger + fact check, L22) > Script (for the ear: hook, open loops, one idea per scene, L22) > Scenes (nine visual types, L23) > Voice (one WAV per scene, L24) > Captions (word-timed + .srt, L25) > Sound (ffmpeg-made, ducked, -14 LUFS, L26) > Render (cached per scene, parallel, resumable, L27) > Publish (chapters, thumbnails, Reels cut from each film, L29).
A 10-minute film = about 1,500 words of narration, about 80 scenes, 18,000 frames.

## "Eight things almost nobody teaches" (public headings)
1. **The voice sets the length** (L21): audio-first timelines so picture cannot drift from sound.
2. **Fingerprint every scene** (L27): cache keyed on exactly what changes a scene; edit one word, one scene re-renders.
3. **The frame-rounding trap** (L26): floating point leaves narration about 3 s ahead after 80 scenes. Free excerpt: `frames = Math.ceil((lead + voiceDur + tail) * FPS - 1e-6); dur = frames / FPS;` then pad the scene audio to exactly `dur` (`apad=whole_dur`, `atrim`) so joining 80 stays in sync.
4. **Captions from your script, timing from the audio** (L25): a speech recogniser never matches your script; keep your words, borrow only its timing.
5. **Sound effects made from maths** (L26): whooshes, hits, risers from ffmpeg alone, no licences.
6. **Music that ducks under the voice** (L26): sidechain compression, then loudness normalisation.
7. **A validator for the model** (L22): catches digits in narration, unreadable charts, three identical scenes in a row, unknown scene types, before any render.
8. **Draft first, render once** (L27): quarter-size pass for pacing, wording and sound.

## Free steps from the page (lessons 1-3, public)
1. Install Node.js 20+, ffmpeg, Google Chrome. In an empty folder: `npm init -y`, `npm pkg set type=module`, `npm install puppeteer`.
2. Download one display font as .woff2 into `fonts/` (Space Grotesk, Inter: SIL Open Font License). Headless Chrome renders only fonts it loads.
3. Paste the prompt ([[starter-prompt]]) into Claude Code / Cursor / Gemini CLI / a VS Code agent.
Steps 4-7 (approve stills, render frames, encode MP4, check on phone) are paywalled: only titles are public.

## Free alternatives (MY notes, not from the course; unverified until tested)
| Need | Free option |
|---|---|
| Frame renderer | Puppeteer approach above (free), or Remotion (React; check licence for commercial use), Manim for diagrams |
| Voice | Kokoro (Ares already uses `bm_fable`), Piper TTS |
| Word-timed captions | faster-whisper with `word_timestamps=True` (already installed here) |
| Sound and music | ffmpeg synthesis (`sine`, `anoisesrc`, `sidechaincompress`, `loudnorm`), no downloads |
| Assembly, cache, resume | own Python/Node script; scene id + hash of its inputs as the cache key |
| 3D scenes | three.js (+ the img2threejs track) |
| Typography and cinematography knowledge | free sources not yet researched: motion-design and kinetic-type tutorials, easing curves, camera-move references |
