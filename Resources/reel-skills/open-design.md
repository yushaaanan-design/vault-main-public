---
tags: [tool, app, reel-source, audited]
reel: DYcaq-GIpCV (Stewie AI Expert, Instagram)
status: not installed
---
# Open Design (`nexu-io/open-design`)
- **What:** open-source, local-first alternative to Claude Design: a web and local app that drives the coding-agent CLIs you already have (Claude Code, Codex, Cursor and others) to make websites, prototypes, decks, images, video and HyperFrames motion. BYOK keys stay local. Apache-2.0, v0.23.1 in the repo, last commit 2026-09-30. 311 MB, 12,940 files, 30 package.json. Star counts in sources: 57K to 84K.
- **Audit (2026-10-08, quarantine `C:\dev\reels\quarantine\open-design`, TARGETED):** no malicious code found in what was checked. PRIVACY.md is detailed. The daemon binds to loopback (127.0.0.1) by default and requires a token if `OD_BIND_HOST=0.0.0.0`. One lifecycle script: root `postinstall.mjs` (531 lines; builds a native addon, needs python3, make and g++ or Windows build tools). NOT read: most of the ~3,600 TypeScript files and the dependency tree.
- **Caveat, telemetry:** product analytics and quality traces are ON by default (PostHog, privacy-masked session replay; if the user chooses "Share" it can send scrubbed prompts and tool content to Langfuse). Safety and reliability telemetry is always on in official builds. Per its own doc, forks and builds from source without telemetry credentials send neither.
- **Requirements:** Node ~24 (this PC has 24.21, OK), pnpm >=10.33.2 (NOT installed), Windows C++ build tools (unknown).
- **Overlap:** partly with design skills (impeccable, taste-skill, frontend-design) and HyperFrames. Relevant to Fable website and design work.
- **Verdict:** probably safe if built from source, loopback only, sharing declined. It is a heavy project install, not a skill, so not now. Revisit when starting design or website work.
- **Undo:** delete its folder and stop the daemon (port 7456 by default).
