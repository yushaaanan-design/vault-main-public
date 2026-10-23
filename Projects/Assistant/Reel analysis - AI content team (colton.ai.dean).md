---
tags: [assistant, reel-analysis, content-pipeline]
up: "[[STATE]]"
---
# Reel analysis: "29 posts today, I didn't edit one" (colton.ai.dean)

Source: https://www.instagram.com/reel/DeuDRD_EqWf/ (sent by the user 2026-10-23: "this is the content pipeline"). Creator: Colton Dean, same creator as the Hyperframes reel analysed earlier. Files: `C:\dev\reels\3-analysed\ig_DeuDRD_EqWf\` (timeline.md, timeline.json, screen_text.json, frames, `sheets\` = 4 contact sheets). Measured: 24 s, 119 words (about 5 words/s), 4 cuts found by the detector + 1 more I saw by eye (~20.5 s), 48 likes / 44 comments when downloaded. **Verified** = read from frames/OCR/transcript. **Inferred** = my reading, not shown.

Post caption: `Comment "content" for the free system` + #ai #content #contentcreator #aiagents #aitips.

## Second by second
| t | Picture | On-screen text | Voice | What it does |
|---|---|---|---|---|
| 0-1 | Selfie, handheld, head and shoulders, bedroom wall, one finger raised, lav mic clipped on shirt | White rounded caption box (2 lines): "29 posts today. I didn't edit one." Stays 0 to 20 s | "my AI agents are posting" | Hook: a number + a loss of effort (claim 1 + claim 2) |
| 1-4 | Same shot, hand gesture | Black pill appears 1.0 to 3.75 s: "Monday 10/19 is fully scheduled: 29 posts, all read back from Blotato." | "29 times today and I'm not editing a single video" | Proof overlay: looks like a chat/terminal reply from the agent; names the posting tool (Blotato) |
| 4.2 | CUT 1: face to phone filming a curved monitor | caption unchanged | "check this out, I have a" | Pattern interrupt exactly after the hook finishes |
| 5-6 | Monitor: dark purple isometric "office" with small robots at desks, glowing pink brain at left, label RESEARCH on the floor | | "research team who picks what to film" | Department 1 |
| 6.8 | CUT 2 (or camera move): closer, cards with view counts (464K, 340K, 276K...), labels Trend Scout, Competitor Watch, Transcript Reader | OCR picks up "Reel 122" tags | "who then hands it off to my scripting agents" | Shows real reels with numbers as inputs |
| 7-9 | Blurred camera move into the SCRIPTING room: robots with cards "Script Writer", "Hook Writer", "Voice Check", "Cutter", "Reel 127". A small mouse pointer sits at the bottom centre on the nav bar, hand enters from the right | | "who tell me what to actually say" | Department 2. The pointer is the only visible click |
| 10-11 | Motion-blur transition, then EDITING room: robots with "Reels", "Captions", "Thumbnails", "Cutter". "Brand Brain" node floats in the centre | | "then all I have to do is film and hand it straight off to the editing team" | Department 3; the human step is only filming |
| 12-13 | Blur then PUBLISHING room: "Cross-Poster", "Scheduler", "Thumbnails", "Reels"; INBOX label visible at right | | "which then... this is where all 29 of my posts" | Department 4 |
| 14-16 | Camera holds on Publishing, hand sweeps | | "will get scheduled out to all these different platforms" | Payoff of the hook number |
| 16.8 | CUT 3: back to wide view, more blur | | "on social media then" | |
| 17-18 | INBOX room: "Comment Replier", "DM Closer", "Lead Logger"; top-left a phone card with "...ai" and view counts | | "it's all handled by my inbox team" | Department 5 (community) |
| 18.6 | CUT 4: Chief of Staff robot with a halo above a big glowing pink brain on a pedestal; logo "A" above | | "and my chief of staff oversees all of those guys" | Department 6 = orchestrator |
| 19-20 | Hold on Chief of Staff; phone cards behind with 1.4M, 863K, 811K; a counter top right "...925,891 VIEWS 819 POSTS" | | "those guys just comment the" | Social proof counter, last visual |
| ~20.5 | CUT 5 (missed by detector): back to selfie, caption swaps | New caption: Comment "content" for the free system | "word content on this video and I'll send you the exact same system for free" | Call to action |
| 21-24 | Selfie, calm direct-to-camera, hand lowers | same caption | | End. No outro, no logo |

## Click by click
The reel shows almost no clicking. What is visible: a bottom navigation bar in the app with tabs that read (OCR) **Room, Chief, Brain, Research, Scripting, Editing, Publishing**; a mouse pointer at the bottom centre around 8-9 s and again near 18 s; the active tab matches the room being shown (Scripting at 8 s). **Inferred:** he clicks the tabs and the app flies the camera to that room (the blur between rooms is the app's own camera animation, not an editor's transition). The hand is used only to point at the monitor.

## How it was made (visible tools and style)
- **Verified:** vertical 1080x1920 phone footage; lav mic on the shirt (good voice); one white sticky caption for 20 s, then a swap; one black "proof" pill; Blotato named as the scheduling tool; custom dashboard drawn as an isometric office with robot workers; filmed by phone pointed at a curved monitor (not a screen recording).
- **Inferred:** the dashboard is a custom web app (a visual layer over real agent jobs), probably built with Claude Code given his account's theme; the "29 posts" are variants of a few videos cross-posted (not 29 original films); "free system" is a comment-keyword funnel (comment "content", get the setup by DM).
- **Not verifiable from the reel:** whether the 29 posts or the view counts are real, that the system is free, that no editing happened.

## The pipeline it shows (6 departments)
1. **Research:** Trend Scout, Competitor Watch, Transcript Reader (picks what to film).
2. **Scripting:** Script Writer, Hook Writer, Voice Check (brand voice QA), Cutter.
3. **Human:** only films.
4. **Editing:** Reels, Captions, Thumbnails, Cutter.
5. **Publishing:** Cross-Poster, Scheduler (Blotato), Thumbnails.
6. **Inbox:** Comment Replier, DM Closer, Lead Logger.
7. **Chief of Staff** over everything, with a shared **Brand Brain** (memory of style/voice).

## Comparison with our plan (`Assistant workflow.canvas`)
| His | Ours | Gap |
|---|---|---|
| Research (3 agents) | Stage 1 nightly research | Ours has no "Competitor Watch" on the user's own niches yet; add as a worker |
| Scripting + Hook Writer + Voice Check | Stage 2 + hook DB | **Add a Voice Check step** (compare each script to the brand-voice note) |
| Human films | Our stage 3 is voiceover/animation | Decide per business: filmed vs generated (clipping and documentaries do not need a face) |
| Editing | Stage 3 HyperFrames | Same idea |
| Publishing via Blotato | Post queue with approval | His is auto; ours approves first. Blotato is a paid third-party tool: check price/terms before using |
| Inbox: Comment Replier, DM Closer, Lead Logger | Stage 5 feedback | **Add Lead Logger** (turns comments into a list) and the comment-keyword funnel |
| Chief of Staff + Brand Brain | Orchestrator + style guide | Same role; the ECC `chief-of-staff` agent type exists locally to study |
| Isometric "office" dashboard | Ares HUD | **Ares already has a HUD**; this is a ready design for it |

## Hook breakdown (for the hook database)
Type: number + effortless claim ("29 posts today. I didn't edit one."). Proof within 1 s (pill). Pattern interrupt at 4.2 s. Demo shown in the order the voice names it, one department per ~3 s. CTA = comment keyword.
