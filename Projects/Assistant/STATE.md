---
tags: [project, state, assistant]
up: "[[INDEX]]"
---
# State: Assistant / Orchestrator (created 2026-10-23)

Colour: magenta `#E040FB` (graph group, Graph Legend row, file-explorer snippet).

**Goal (user):** one free, local assistant that is a full Jarvis for all projects: nightly research, a weekly Idea Orchestrator session (ranked video/audio ideas, then scripts), editing + voiceover, a post queue, comment replies and community. Hosted locally, free.

**Plan (approved 2026-10-23):** `C:\Users\yusha\.claude\plans\i-forgot-to-put-validated-clarke.md`. Key decisions are copied below so the plan file is not the only source.

## Decided
- Brain: HYBRID. Local Ollama (Qwen3 8B/4B) reads and summarises in bulk, Claude (Haiku, Sonnet) writes the final digest and scripts. Claude API is not available; use the Pro login sparingly and measure usage after week 1.
- Autonomy: APPROVAL QUEUE. Every post and every reply waits for the user.
- Delivery: Obsidian digest note + Ares panel/briefing + Telegram summary.
- First build: the RESEARCH ENGINE. Before it, the overall workflow + schedule (this round).
- Active businesses this month: Clipping, YouTube documentaries, Fable / 3D content. Others parked (research only). One brand per business for channels.
- Built on this laptop, PORTABLE: plain Python + SQLite in a private git repo at `C:\dev\assistant\` (outside OneDrive and vaults), nothing Windows-only (new PC, maybe Linux, planned).
- Shape: Ares = face (exists), Orchestrator = brain (new: queue, schedule, budgets, approvals, logs), Workers = hands (plain scripts).

## Schedule (proposed, user edits)
Nightly 2:00 AM research sweep, 4:30 AM digests, 7:00 AM Telegram + Ares briefing; weekly Idea Orchestrator session (a few hours); Sunday performance review; on demand: scripts; render queue only after an approved script; evening post/reply approvals; separate morning academics check (needs a logged-in desktop). Daily 15-minute learning slot.

## Decided later 2026-10-23
- **Clipping is the FIRST content type** (user: "because it's the easiest"). Canvas: `Content pipeline - clipping first.canvas` (departments from the colton.ai.dean reel mapped to clipping, with build order). Reel analysis: [[Reel analysis - AI content team (colton.ai.dean)]]. Nothing built yet; wait for the user's review of the canvas and "go".
- Content generation: no filming by the user; documentaries and clipping need no face; realistic AI video of a person is NOT feasible on the 6 GB laptop.

## Build status (2026-10-23)
- Plan approved (phases P0-P8 in the plan file). **P0 DONE**: `C:\dev\assistant\` (git initialised, no commit yet) with `chief/core.py`, `chief/run_all.py`, `config/budget.json`. Test source: Jynxzi. Nothing posted; rights open. Review via an Obsidian review file. The ML pipeline (training editors, backtests) is a SEPARATE later pipeline; we only store `decisions` and `outcomes` for it.
- **OVERNIGHT 2026-10-23 (user asleep, authorised "build everything that doesn't need me"):** code written in `C:\dev\assistant\` (not committed): `chief/` (core, run_all with `--nightly --dry --health --brief --selftest`, ytdl), `watch/` (channels = Channel Watch + Trend Scout, digest), `moments/finder.py`, `cutter/cutter.py`, `writer/writer.py` (Hook Writer + Voice Check), `review/review.py` (review file + approvals + outbox hand-off), `config/` (budget, sources, voice). Notes: `Brand Voice.md` (draft for you to edit), `digests\`, `reviews\`. Facecam box for Jynxzi in `config/sources.json`.
- **State at the end of the night (2026-10-23 about 10:15 AM):** P0-P6 built and run once end to end on the 4:50 h Jynxzi VOD; 3 draft clips + copy + a review file exist; Task Scheduler runs `Assistant nightly` (2:00 AM) and `Assistant brief` (7:00 AM, Telegram) from 2026-10-24. Details and every bug: run-log.
- **For the user to do (in order):** (1) open `Projects\Assistant\reviews\Review 2026-10-23.md`, watch the 3 clips in `C:\dev\clipping\jynxzi-pLO8AVvIbkg\clips\`, tick approve/change/reject (the next run reads the ticks); (2) edit `Brand Voice.md`; (3) decide rights (nothing is posted until then); (4) tell me which channels/brand names; (5) revoke the leaked sk- key (to-do list, top).
- Not built: P7 inbox/stats (needs posted clips), P8 Ares morning briefing/HUD, git commit, backup of `C:\dev\assistant` into the OneDrive Reset Kit, Competitor-Watch scoring by Ollama, YouTube API upload.

## Open
- Topic list and subreddits (starter set to propose); trading = research only.
- Is the 2:00 AM sweep OK?
- Channel names/brands per business (none exist yet).
- Nextwork.ai documentary details + deadline (blocked 16 days).

## Next
1. DONE 2026-10-23: workflow canvas `Assistant workflow.canvas` v1. User: "For now, I like this flow. Later, we will expand it." Do not expand until asked.
2. User gives topics/subreddits (or asks for a starter set); user revokes the leaked key.
(Note: the open Obsidian vault is `C:\OBSIDIAN VAULT` (outer); colours/snippets live in the inner `Codebase and learning\.obsidian`. Open the inner folder as a vault to see them. Link form: `obsidian://open?vault=OBSIDIAN%20VAULT&file=Codebase and learning/...`.)
3. Research engine in small steps (SQLite + topics.json -> Reddit adapter -> Ollama scoring -> Haiku digest -> delivery -> scheduler).

See [[run-log]].
