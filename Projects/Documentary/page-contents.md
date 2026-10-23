---
up: "[[Documentary STATE|STATE]]"
tags: [project, documentary, reference]
---
# Everything public on the Promptbase page (read 2026-10-07)

Companion to [[lessons]] (the 30 lessons) and [[starter-prompt]]. Only what the page shows openly. Locked parts are marked LOCKED and left empty; their on-page text is filler.

## Pitch
"Make a whole YouTube episode from code, free to start." No credits, no subscription, no stock footage. A coding model (Claude, Cursor, Codex, Gemini, Antigravity, VS Code) writes the code, your laptop renders every frame, ffmpeg makes the MP4. Three levels: a clip tonight (free), Shorts and Reels (full setup), full-length YouTube films (full setup).

## Offers
| | Free prompt ($0) | Full Setup ($49, one payment, lifetime, "all sales are final") |
|---|---|---|
| Starter prompt, plain title cards to MP4 | yes | yes |
| Render stack setup (3 steps) | yes | yes |
| Lessons | 3 of 30 | all 30 |
| Showcase clips with technique named | 2 | all 6 breakdowns |
| 874-word studio prompt (scramble reveals, split exits, living grain, camera drift) | no | yes |
| 4 finishing steps (stills, render, encode, phone check) | no | yes |
| 20 motion-graphics lessons (shaders, particles, three.js, camera moves, 4K, 9:16) | no | yes |
| 10 long-form lessons | no | yes |
| Tested starter kit, script to finished film (29 files, 1100+ lines) | no | yes |
| 4-page master prompt + director prompt (runs a whole film, approval at each stage) | no | yes |
| Channel playbook | no | yes |
| Every future lesson | no | yes |

## The 7 steps, start to MP4 (a 15-20 s silent motion-graphics video)
1. Install the render stack: Node.js 20+, ffmpeg, Google Chrome; `npm init -y`, `npm pkg set type=module`, `npm install puppeteer`. FREE
2. Download one font (.woff2 into `fonts/`; Space Grotesk, Inter, SIL OFL). FREE
3. Paste the prompt into your coding tool. FREE
4. Approve stills, not video. LOCKED
5. Render the frames. LOCKED
6. Encode the MP4. LOCKED
7. Check it on a phone. LOCKED

## What the studio version adds (feature list is public, the prompt is LOCKED)
- Scramble-reveal and type-on entrances, varied card by card
- Split-line exits with faked motion blur
- A living background: drifting light and film grain that moves every frame
- Slow camera drift and scale on every card
- Safe-margin and type-size rules that survive a phone screen
- A stills-first approval process, a determinism test and ffprobe checks

## Showcase clips (6; technique line is public, breakdown and prompt LOCKED for 4)
1. **Above the cloud sea:** WebGL2 raymarched terrain and volumetric clouds, HDR accumulation, bloom and ACES tone mapping (free)
2. **Are we in a simulation?:** Canvas2D boiling-ink explainer, hatched fills, one continuous morphing camera (free)
3. **Winter window, anime style:** Canvas2D cel shading, shader-painted skies, depth-of-field (locked)
4. **The prisoner's dilemma:** paper-cutout mascots, halftone fills, seeded jitter (locked)
5. **Paper-collage explainer:** collage kit, boiling sprites, keyword captions (locked)
6. **Tolstoy in pencil:** pencil-boil linework, cross-hatch shading, warm grade (locked)

## The channel system (9 stages, each tied to a lesson)
Topic (L29, scorecard) > Research (L22, source ledger, fact check) > Script (L22, for the ear, hook, open loops, one idea per scene) > Scenes (L23, nine visual types: big numbers, charts, timelines, diagrams, comparisons, your own photos) > Voice (L24, one file per scene) > Captions (L25, word-timed, burned in, real .srt) > Sound (L26, ffmpeg effects, music bed ducked, -14 LUFS) > Render (L27, cached per scene, parallel, resumable) > Publish (L29, chapters, thumbnails, platform rules, Reels cut from every film).
A 10-minute film: about 1,500 words of narration, about 80 scenes, 18,000 frames, 1 MP4 + a captions file.

## Four use cases on the page
1. **Start a faceless YouTube channel** (L22, 29): niche scorecard, find 20 topics people search for, weekly rhythm (research, script, render overnight, publish), titles/thumbnails/chapters from the same engine, monetisation and copyright rules.
2. **Turn your Instagram into long-form** (L27, 29): mine top Reels for questions, expand each into a 6-10 minute film that opens with the Reel, cut 3-5 vertical Reels back out with one command, a comment-trigger loop between platforms.
3. **Sell it as a service** (L28, 29): packaged offer with deliverables and revision rules, client feedback by scene id or timestamp, revisions in minutes (only the changed scene re-renders), proposal outline and pricing from your own hours.
4. **Explainers, data stories, diagrams, tutorials** in general.

## Code vs AI subscription (the page's own table)
| | AI subscriptions | Films from code |
|---|---|---|
| Pay | monthly plan + credits | one payment, then your own computer |
| Length of one film | seconds per generation, stitched | any length, scenes render separately |
| Text and numbers on screen | generated, can be wrong | drawn from your data, exact |
| Fixing one scene | generate again, spend credits | change a line, re-render that scene |
| Runs | someone else's cloud | your laptop, offline once set up |
| Look | photoreal people and footage | motion graphics, charts, diagrams, no people |

## For you / not for you (page's words)
- For: creators wanting long-form without a per-film tool fee; people already using Claude/Cursor/Codex/Gemini; freelancers selling explainers; people comfortable pasting terminal commands.
- Not for: photoreal people or live-action footage; a one-click app; guaranteed views or income.
- Also needed: a coding model (free tiers exist, paid plans have limits), a computer that runs Node and ffmpeg, patience for long renders.

## FAQ questions (9; the answers are collapsed and were not captured)
Is the voiceover really free? / Can it really make an hour-long film? / Does it find real-world footage? / Does it do the research? / Do I need to know how to code? / Which AI tools work? / Will it run on Windows or Linux? / What does making a film cost? / Refunds? (stated elsewhere on the page: all sales are final).

## The site and its other products (listed in the footer)
Courses: Carousel Automation, Ultra-Realistic AI UGC, The Zack D. Films Engine, AI Video With Code (this one), Hyperreal AI Video, 3D Website Building, Website templates, IG Growth Engine (free), Agent AI. Other free drops: AI UGC selfies, Carousels, 3D Websites, free AI tools. Built "in public" by @piyush.glitch. Free daily email drop.

## Not captured
Answers to the 9 FAQs (collapsed), and everything in the locked lessons and prompts. Raw capture: `C:\dev\documentary\page.txt`.
