---
up: "[[INDEX]]"
tags: [project, documentary, video]
---
# Documentary (project created 2026-10-07)
> **2026-10-08: the animation and content work is also tracked in the separate vault `C:\CONTENT VAULT`** (folder `3 AI Animation`). The tools, install log and research stay here.

Colour: aqua `#18FFFF` (graph group, Graph Legend row, file-explorer snippet).

**Goal (user):** an hour-long documentary made only of infographics, for nextwork.io's new plan (details not yet received), made with free tools. The user labels the reference site **"documentary, full documentary"**.

**Reference:** Promptbase "AI Video With Code" course, https://promptbase.shop/daily?tab=video (also in [[important-websites]]). 30 lessons, 3 free, 27 behind a $49 paywall. All 30 titles and the public blurbs: [[lessons]]. Free prompt: [[starter-prompt]].

## Decisions so far
- Approach: video drawn by code (renderFrame(t) to frames to ffmpeg), not AI video generation (the 6 GB GPU cannot give high quality).
- Course NOT bought. User said "we find free alternatives": table in [[lessons]].

## Status 2026-10-07: MAJOR PROJECT. Pipeline canvas [[documentary-pipeline.canvas]]; render harness tested.

## Reference reading done (2026-10-07)
- [[nextwork-editor-deep-dive]]: NextWork video editor (MIT repo, Remotion-based, chunked parallel render, taste file, plan/render checks). Not installed.

## Next
1. User: nextwork.io plan details (what it is, deadline), script or outline, style.
2. Decide stack: Puppeteer + ffmpeg (as the page) vs Remotion.
3. Test the free starter prompt: one title-card MP4 in `C:\dev\documentary\`.
4. Research free typography and cinematography material to fill the locked lessons 04-10.
5. Voice (Kokoro or Piper), captions (faster-whisper), sound (ffmpeg).
