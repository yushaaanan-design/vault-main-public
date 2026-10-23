---
up: "[[Documentary STATE|STATE]]"
tags: [project, documentary, nextwork, research]
---
# NextWork: what the site is and what is on it (read 2026-10-07, in the user's own Chrome, logged in as the user)

## The domain mix-up
- `nextwork.io` is NOT the learning site: it redirects to a **domain-for-sale page on Atom.com** ($7,000, or $302/mo lease). Do not use it.
- `nextwork.org` redirects to **https://nextwork.ai/** ("NextWork - Learn anything by building"). That is the real site.
- Source note: the home page greets the user by their first name, so the session was logged in. Nothing was changed, clicked through or submitted; read-only. Other learners' names in the "Trending" feed were NOT recorded (personal data).

## What the site is
A project-based learning platform: short hands-on projects (10 min to 2 h 30), each with steps, a quiz and a "Secret Mission". Filters: Roadmaps, AI agents, Cloud computing, Beginner, Intermediate, Advanced, Claude, DevOps, Networking, Security, Internship. A "Project of the Day" banner (on 2026-10-07: **Build an AI Second Brain with Claude Code**, Beginner, 1 h). Projects are grouped in "learnlists".

## Learnlists seen on the home page (first half of the page only; page text was 79 KB and I read the first 40 KB)
Trending AI Tools (16 projects) / System Design (23) / Content Creation (5) / ChatGPT Power User (2) / Prompt Engineering (4) / Git & Github (4) / Ollama (2) / **Claude AI Second Brain (2)** / Design (4) / Intro to Claude (3) / **Claude Code (10)** / Learn with People (8) / Claude for Everyday Life (3) / Claude for Work Productivity (4) / Cursor (2) / All AI/ML (40) / Vercel (1) / AI Security Scanners (3) / Model Context Protocol (3) / AWS CodePipeline (5), then more below (not read).

Projects most relevant to us (all on nextwork.ai/projects/<id>):
- **Edit Videos with Claude Code** (Beginner, 55 min, Free, Windows OK): `/projects/500af6ec-a904-4057-9002-1b1351d973de`. Detailed below. **This is very likely the "video ... by Claude Code" you meant.**
- Build a Claude Video Research Agent (Intermediate, 58 min), `/projects/bbf42282-43a2-4bf9-a10c-44d9fc6c48ad`
- Viral Carousels with Claude x Paper (45 min), Build a Custom Agent Harness (55 min), Build a Jev Model Router for Claude Code (40 min)
- Build an AI Second Brain with Claude Code (Beginner), `/projects/3c934ac2-caa3-544c-bccb-a3aa89b1a1cc`; Automate Your AI Second Brain
- **Do this before downloading any MCP or Skill** (Beginner, 20 min), `/projects/e933f851-f343-4108-adbb-e62482dede58`: matches your rule to vet skills first; read it before the skills step.
- Set Up Claude Code Guardrails; Set Up Claude Code's Status Line; Claude Code Skills Basics; Get Started with Claude Code
- Run Ollama On Your Own Machine; Build a RAG API with FastAPI; URL Shortener System Design; Break a Distributed System on Purpose (relevant to your architecture-learning track)

## "Edit Videos with Claude Code": what it teaches (my summary of the public project page)
Goal: turn a raw talking-head clip into a creator-style short. Result files: `edits/<name>/render.mp4`, a measured creator profile, a reusable taste rule. Needs: Claude Code with a Claude subscription, about 2 GB disk, Windows/macOS/Linux; GitHub account only for the optional Secret Mission.
Steps:
1. **Install the editor.** In an empty folder `ai-video-editor`, run in Claude Code: `/plugin marketplace add nextwork-projects/ai-video-editor`, then `/plugin install ai-editor@nextwork` (local scope), then say "set up the editor". Setup installs a toolchain into `~/.ai-video-editor/`: Python 3.9+ (venv), Node 20+ with **Remotion 4.0.530**, ffmpeg, Git, **faster-whisper small** (local transcription). About 1.5 GB. Check with "run the editor doctor" until it prints Ready.
2. **Break down a creator.** Give 5 public TikTok or YouTube Shorts links of one creator (Instagram is login-walled for this); the bundled `creator-teardown` skill downloads and measures them and writes `teardown.md` (hooks, pacing, structure, captions, visuals) and `style.json` (pace, zoom, captions, sound, layout).
3. **Cut your video.** "edit my video: <path>": transcribes, removes false starts with a **last-take-wins** cut, renders a first cut; you give all corrections in ONE timestamped message, then approve.
4. **Apply the creator style and render.** Stills are generated for approval first, then the full render.
5. **Save your own taste** as a reusable rule that overrides the creator profile.
Secret Mission: render in the cloud on GitHub Actions from a private repo (render artifact kept 7 days).

## What this means for the documentary (my reading, unverified until tested)
- Their editor uses the SAME stack we already chose: **Remotion + ffmpeg + faster-whisper + Node/Python**. That is independent confirmation, and Remotion is the open alternative to the Puppeteer harness.
- It is built for **talking-head shorts**, not for an hour of infographics. We would borrow ideas (stills-first approval, one batched correction message, last-take-wins, taste rules, cloud render fallback), not necessarily the plugin.
- **Not installed.** Third-party plugins run code with Claude's permissions: vet the repo `nextwork-projects/ai-video-editor` (read hooks and scripts) and do their "before downloading any MCP or Skill" project first. Install only on your word.
- Still unknown: what "NextWork's new plan" means (pricing plan? learning plan? roadmap?). Need your clarification.

## Not captured
The second half of the home page (more learnlists), every other project's steps, any pricing/plans page, the Second Brain project body.

## Search "videos with Claude Code" on nextwork.ai (2026-10-07, 344 matches: 331 projects, 4 learnlists, 4 roadmaps)
The user confirmed "Edit Videos with Claude Code" is the one they meant (the original by the course author is the one read above; the other copies in the results are learners' own versions, not read). Other video projects found, **not read yet**:
- **Video Editing with Claude x Remotion**, **Animated Video Overlays with Remotion**, **Video Animation Generator with Remotion** (all directly relevant to the documentary renderer)
- Build a Product Launch Video with AI, Create a Video Brief with Claude Code, Build a Claude Video Research Agent (58 min), Build Your Content Brain with Claude Code
- Learnlist "Claude Code" (10 projects), "Content Creation" (5 projects)
