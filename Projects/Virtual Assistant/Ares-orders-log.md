---
tags: [virtual-assistant, log]
up: "[[Virtual Assistant]]"
---
# Ares orders log

Every order the user gives Ares / Claude, one line each, newest at the bottom. **Append-only: Claude writes here after each order and never reads this file for context** (context comes from STATE.md and run-log.md). Status: done / partly / pending / parked.

| Date | Order (the user's words, short) | Status | Notes |
|---|---|---|---|
| 2026-10-04 | Change the keyword from Jarvis to Ares (he dictates "Aries": both work) and take context from the Virtual Assistant folder | done | Code, vault notes and global CLAUDE.md renamed; jarvis.py is now ares.py |
| 2026-10-04 | It should not run in "Internet Explorer": make it a packaged application on the PC | partly | Edge window replaced by our own native window (`ares_window.py`) + desktop shortcut `Ares.lnk`; a true installer .exe NOT built (heavy, Smart App Control) |
| 2026-10-04 | Fix the voice: Ares reads the answer aloud from the PC | done, to confirm | Server speaks announcements itself; waiting for the user to confirm he hears it |
| 2026-10-04 | Be soft on the PC (it crashed last time), soft on the features | done | Nothing runs at login, one test at a time, lightweight window |
| 2026-10-04 | Tell me the time, my to-do list, my Obsidian projects, then open Higgsfield in the browser, scroll, read the pricing | done | Time 15:58; to-do + projects listed; pricing read in Ares's own browser (Basic $9, Pro $23, Max $59 per month billed annually; Ultra not read) |
| 2026-10-04 | Ares must talk while it works: small talk, ask for new tasks, follow-up questions | done, to test | Global rule: spoken line at start, short updates during, answer + one question at end |
| 2026-10-04 | Keep a log in Obsidian of all my orders, update it, don't read it every time | done | This file; rule added to global CLAUDE.md |
| 2026-10-04 | With several tasks, update me on EACH task as it finishes (not one big answer at the end), and crack a few sarcastic jokes mid-session | done, to test | Global CLAUDE.md "Ares" rule DURING step rewritten; first test = next multi-task order |
| 2026-10-04 | For now no web searching and no browser opened in front of me; extract and fetch from local sources only. Voice is too robotic: fix later | done / parked | "NO WEB FOR NOW" line in the rule; voice quality parked |
| 2026-10-04 | Ares, do everything I told you before (time, to-do, projects, Higgsfield pricing) | done | Per-task spoken updates; Higgsfield pricing answered from the earlier saved read, no browser (no-web rule); 69 open to-do boxes in the central list |
| 2026-10-04 | Fix the interruption (voice lines cut off) | done, to test | Cause: speech queue held only 3 lines and dropped the rest when updates came fast; now 12 |
| 2026-10-04 | Get a better, more realistic voice model | partly | Kokoro (bm_george) tried: too slow on this CPU (int8 14 s for 20 chars, fp32 12 s for a 4 s sentence); parked in voices/, Piper stays. Options: Kokoro on the GPU (onnxruntime-gpu), the user's hosting/cloud, or a Piper "high" voice |
| 2026-10-04 | When I say "Hey Ares" go full screen and fire up | done, to test | `ares.py full`, phone wake word, `/summon {full,fire}` and typed "hey ares" in the fast lane; global rule updated |
| 2026-10-04 | Run the better voice on the graphics card | done, to test | Kokoro bm_george on the RTX 3060 via onnxruntime-gpu 1.22; 1.3 s per 4 s of speech |
| 2026-10-04 | Ares, do every task I told you before (time, to-do, projects, Higgsfield) and go full screen; checking pace | done | Full screen via ares.py full; per-job spoken updates on the new GPU voice; Higgsfield from saved notes (no web) |
| 2026-10-04 | Move the speaking text to the right side, big and show-off; missions bottom-right; then smaller, clear of the map, missions a bit higher | done | display.html: #answer right side (500px, clear of the map), #missions bottom-right; window made DPI-aware (full screen was oversized); screenshot checked | 
| 2026-10-04 | Voice: "I love sample C" | done | Default voice is now Kokoro bm_fable at speed 0.95 (speak.py) |
| 2026-10-04 | Missions a bit higher, in its own fancy box at the bottom right, showing every job/step I do; speaking text keeps scrolling as it grows | done | display.html: #missions framed plate (bronze border, ember top line, pulsing dot); server note_mission(): each Ares order from the chat is a mission card, each spoken step a pill; answer box auto-scrolls to the bottom |
| 2026-10-04 | Keep all the small nodes glowing, shimmering, hovering and changing size all the time; fire only while working | done, to watch | display.html: per-node breathing size, glow and slow drift; idle draw 25 fps (was 16) |
| 2026-10-04 | If Ares is already open and full screen, a second command should just start the work | done | Server: no "firing up" note when already full screen; global rule says skip show/full when already open |
| 2026-10-04 | Spoken lines belong in the big box top right; missions only down there; move the Stream to the right side | done, to look at | server.py + display.html; see run-log last row |
| 2026-10-04 | Save everything to context so I can start over | done | STATE.md section LATEST + run-log + orders log updated |
| 2026-10-04 | Do your four tasks, Aries (time, to-do, projects, Higgsfield from notes) | done, to check | Run one at a time with a spoken line each; panel already open so no reopen; checks the new top-right text box + bottom-right missions/stream |
| 2026-10-04 | Redo the test: be more sarcastic and complimentary, a little flirtatious in most lines | done, to test | Global CLAUDE.md PERSONALITY line; rerun of the four tasks follows |
| 2026-10-04 | Don't compliment me on every action: sarcastic in some cases, subtle compliments in others, a little mysterious | done | Global CLAUDE.md PERSONALITY rewritten (varied, brief, mysterious) |
| 2026-10-04 | Talk more and be funny in EVERY task, speak more words, not concise unless I say so | done | Global CLAUDE.md PERSONALITY: every task line humorous + 2-4 sentences; compliments stay subtle and occasional |
| 2026-10-04 | Recording mode: the testing is over, treat the four tasks as the first time (Instagram post), no 'again'; give a DETAILED to-do list so I look busy | ready | Global CLAUDE.md RECORDING MODE rule; server restarted so the screen is clean (no earlier missions or lines); Ares screen closed on purpose so 'open full screen' fires up on camera |
| 2026-10-04 | For the Instagram recording: make it look like clients and keep real data hidden: fake to-do list and fake things, every answer detailed | done | DEMO MODE: C:\dev\Virtual Assistant\demo-vault (8 fictional clients, 32 notes, fake Central To-Do List); hud.py map reads it when demo_mode.txt = on; global rule says use only the fake vault in the take; Ares screen closed until 'open full screen' |
| 2026-10-04 | Keep Ares ON (open, full screen) so it can fire when the take starts; don't switch it off | done | Ares screen open in full screen, demo mode on; no restarts or closing before the take |
| 2026-10-04 | Between tasks it takes too long: start the next task immediately | done, to test | Speech lines queue in the server and play back to back; each line shows in the big box when the voice starts it (server.py note_mission / speech_worker); rule: no sleeps between tasks |
| 2026-10-04 | To-do list was too detailed: make it ONE good paragraph, detailed enough to sound cool, not too much | done | Global CLAUDE.md recording-mode rule: to-do = one spoken paragraph (3-4 sentences, 3-4 fake clients, count, one joke); other tasks 2-3 sentences |
| 2026-10-04 | Recording scenario: 'Hey Ares, what's up? What jobs do I have today?' -> full briefing + recommendations (instead of the four tasks); asked how to LARP it | done | demo-vault/Today.md (fake schedule, risks, order of play) + BRIEFING MODE rule in global CLAUDE.md; gave the user a filming script |
| 2026-10-04 | Briefing too long and unbelievable: make it a web developer's day, shorter; speak faster; remove the pauses between lines | done, to test | demo-vault rebuilt as a freelance web dev's week (Stripe webhook, SSL cert, LCP, PRs); voice speed 1.12; server now turns sentences into sound while the previous one plays (no gaps); briefing rule: 4 short lines |
| 2026-10-04 | Make the fake to-do shorter and about MY personal projects, no clients | done | demo-vault rebuilt: 8 fictional personal projects (Pulse, Ledgerly, Tidewatch, Sprout CLI, Portfolio v3, Notebin, Trailmap, Pixel Pantry), 8-item to-do, Today.md, rule updated (no clients) |
| 2026-10-04 | Warm it up so the briefing happens very quickly | done | `ares.py brief` fires the pre-written 4-line briefing (demo-vault/briefing.txt) in one command; voice preloaded and warmed at server start |
| 2026-10-04 | Keep the shooting/firing effect active so after I speak it fires up | done | server.py fire_until: the screen stays in 'working' (red firing) for the whole speech; mission card stays busy while speaking |
| 2026-10-04 | Previous speaking speed/way of talking was nice (not the faster one); keep it | done | speak.py speed back to 0.95 (bm_fable); no-gap sentence pipeline kept |
| 2026-10-04 | Keep exactly five items on the to-do list, and be charming | done | demo Central To-Do List.md = 5 items; briefing.txt rewritten (five jobs, charming, no 'eight projects') |
| 2026-10-04 | Wrap the briefing in about 30 seconds; every time mentioned must carry AM/PM | done | briefing.txt rewritten: 3 short paragraphs, measured 29.6 s at the liked pace (speed 0.95, no speed-up needed); AM/PM spoken as 'A M'/'P M'; global rule TIMES added |
| 2026-10-04 | Remove the chat history; we will do exactly this (the final take) | done | Ares server restarted clean (no missions, lines or stream), saved phone chat history emptied (backup in the Claude scratchpad), Ares open in full screen, briefing ready |
| 2026-10-04 | Server must already be warm after a restart; no stream entries on screen | done | server writes voice_ready.txt once the voice is loaded and warmed (waited for it, 5 s); Stream strip hidden in display.html |
| 2026-10-04 | Keep the Stream strip; no previous entries but show current ones; when I say clear, remove it from the screen only | done, tested by screenshots | Stream strip back; new 'ares.py clear' (server /clear-screen + epoch): wipes missions, spoken lines and stream entries live, no restart, no files touched; global rule CLEAR added; voice warm marker still used after restarts |
| 2026-10-04 | Clear the chat and keep it warmed up | done | ares.py clear (screen only); server and voice stay loaded (voice_ready.txt present, no restart) |
| 2026-10-04 | Clearing this chat (user) | done | Everything saved in STATE.md RECORDING MODE ADDENDUM, run-log and this log |
| 2026-10-04 | Build UN Security Council resolutions scraper (no scraping yet); update Obsidian; add MUN vault + Instagram projects to to-do | done | scraper written not run, notes and to-do updated |
| 2026-10-05 | Remove demo, give real to-do list incl. project items, then prioritize | done (list given, prioritizing next) | demo_mode set to off |
| 2026-10-05 | Rewrite rule to detailed mode (global CLAUDE.md); detailed briefing of last night | done | DETAILED MODE bullet added, item 4 changed |
| 2026-10-05 | Remove 30 s speech cap; full spoken+written briefing, MUN first, then every pipeline | done (spoken ~20 min queued) | rule edited in global CLAUDE.md |
| 2026-10-05 | MUN loop: every 2 min until 2 PM | running (job e9dc2157) | pull cloud facts, sync vault, log |
| 2026-10-05 | Ares panel: to-do/project list only, expandable, always running | done | click test pending |
| 2026-10-05 | Ares window: minimize works, cross closes, full<->panel slides in one window | done, tested by script | user to try by hand |
| 2026-10-07 | Opus branch of the 3D Chelsea boot, as close to the refs as possible | done (round 1) | chelsea-opus folder, viewer on port 5174 |
| 2026-10-07 | Stop the MUN loop; turn the Jarvis interface into the Ares interface (live task view) | done | cron 311cf4f5 (every 2 min) deleted; display.html slim panel shows orb, nodes, Now box above the to-do list |
| 2026-10-07 | Phone page: show the PC's nodes + animation only, to-do list button, change the Jarvis thumbnail to Ares | done | /ares-view, /ares-tasks, icon files, Ares.lnk icon; server restarted |
| 2026-10-08 | Add 'a 3D model of every product on the Fable website' to the to-do list, top, immediately | done | Central To-Do List.md, top of 'What to do next'; two older 3D lines marked superseded |
| 2026-10-08 | Separate Content vault with three kinds of content (AI generation, personal, AI animation), cross-referencing the main vault | done | C:\CONTENT VAULT created (21 notes); pointers added to Content Creation STATE and Documentary STATE; nothing moved |
| 2026-10-08 | Move content notes into the Content vault (my choice of what) | done | 4 notes moved with stubs left behind; hubs and cross-references updated; the project hubs, canvases and to-do stay in the main vault |
| 2026-10-08 | Daily briefing: today, last night, pending (Hey Aries, detailed) | done | read STATE, run-log, Central To-Do List; nothing changed |
| 2026-10-13 | Create separate Obsidian vault for BUP MUN (UNSC), context kept there | done | vault at C:\BUP MUN VAULT; research not started |
| 2026-10-14 | BUP MUN: full Fortna 2003 research briefing (.md in vault + PDF) | done | 68 pages, sent to phone |
| 2026-10-14 | BUP MUN: rebuild Fortna guide with diagrams to style answers | done | 105 pages, 69 diagrams, local only |
| 2026-10-14 | BUP MUN: ask questions to build ceasefire drills (analyse MUNMUN 26 data, fictional ceasefire scenario) | in progress | questions round first |

| 2026-10-15 | Briefings download through Ares: /briefings.zip route + 📄 button on phone page (backups server.py.before-briefings, phone.html.before-briefings); server restarted | done | verified 401 without token, 200 with token, zip has 3 PDFs |
| 2026-10-19 | Recover PC after reset: reinstall apps, backup kit (OneDrive), PC Watch mod + VS Code sidebar extension, turn off Delivery Optimization | mostly done | Android Studio killed by low memory; Windows-MCP needs --python 3.13 (pending) |
| 2026-10-19 | Plan MUN Academy: new vault, breakdown, raw brief in context, MUN site suggestions | done | C:\MUN ACADEMY VAULT; next: plan mode with Opus |
| 2026-10-19 | Show Chelsea boot 3D model in browser | done | chelsea-opus viewer on localhost:5174/split.html |
| 2026-10-19 | MUN Academy: exhaustive UNSC syllabus + canvases (plan mode), scrape UNSC site, concepts and research tracks | done | C:\MUN ACADEMY VAULT\Curriculum\Track - Security Council; 61 units, 431 lessons, 62 canvases |
| 2026-10-20 | MUN Academy: what's next after syllabus review | done | Recommended: answer open questions, write one pilot lesson, then PRD |
| 2026-10-20 | MUN Academy: scrape NextWork + 10MS + MyMUN, build course structure, canvas copies, Sonnet agent for REA skill | done | Teardown + Course Structure v1 (proposal); REA vetted, install blocked for Claude (user installs) |
| 2026-10-20 | MUN Academy: lessons too shallow; one long ceasefire syllabus or split interstate/intrastate? | answered | Recommended hub + two deep sub-units + one paper session per paper; awaiting go |
| 2026-10-20 | MUN Academy: Fortna note is 105 pages; how to size sessions, research-per-topic + one big video cut down? | answered | Recommended: deep note = reference, missions = cuts through it (core + deep routes), one long video cut at mission breaks |
| 2026-10-20 | MUN Academy: core not absolute beginner; routes approved; UNSC ~400-500 h; what are missions? | done | Decisions in Course Structure v1 section 8 |
| 2026-10-20 | MUN Academy: deep with no gaps in how/why; Fortna 105-page review = 1-2 h, interstate = 1-2 h | done | Recorded in Course Structure v1 section 8 |
| 2026-10-20 | MUN Academy: split the whole UNSC course into separate pages + course materials (content/videos later) | done | 8 paths, 87 topics, 693 mission pages, 369 h; old outline archived |
| 2026-10-20 | MUN Academy: structure approved; what's next, ask questions for overnight build (tech, visuals) | in progress | Asking questions |
| 2026-10-20 | MUN Academy: build the whole website overnight, content later, keep track; no questions | done | Prototype at C:\dev\mun-academy\web (Start site.cmd); demo mission sc-c04a-01; logs updated |
| 2026-10-20 | MUN Academy: open the site in the browser | done | http://127.0.0.1:5180/ opened in default browser |
| 2026-10-20 | MUN Academy site: path progress bars, own look/thumbnail per path, descriptions, two layers (path -> section pages) | done | about.txt + themes.js + thumbnails; checked in browser |
| 2026-10-20 | MUN Academy: save everything in detailed context, pick up soon | done | Handoff note + STATE + CONTEXT link + memory pointer |
| 2026-10-20 | BUP MUN: find ceasefire papers (Clayton 2023, Sticher 2021, Fortna interstate) + build plan for long intrastate teaching guides | plan written, build queued for auto mode | C:\BUP MUN VAULT\Research\Intrastate Ceasefires - Build Plan.md |
| 2026-10-20 | BUP MUN: resume intrastate ceasefire guides (Q2 Sticher guide onward) | in progress | resumed from run-log; ch3 line 1068 |
| 2026-10-20 | BUP MUN: Q2 Sticher guide finished (121 pp PDF, sent to phone) | done | next Q3 master guide |
| 2026-10-20 | BUP MUN: go on Q3 master intrastate ceasefire guide | in progress | |
| 2026-10-20 | BUP MUN: Q3 master guide + Q4 checks (user asleep, finish all) | done | queue Q0-Q4 complete; 3 PDFs on phone |
| 2026-10-20 | BUP MUN: master guide too short, must contain every detail + comparison; add watermark | done | v2 373 pp; 4 PDFs watermarked, on phone |
| 2026-10-20 | MUN Academy: overall structure, then P3: expand heavy Charter articles (Art 39 etc.), surface first then deep dive | done | P3 42 -> 143 missions; stale pages archived |
| 2026-10-20 | MUN Academy: add a Charter analysis segment to P3 | done | section CA, 10 missions |
| 2026-10-20 | Add "make a heartbeat sensor" to the Central To-Do List | done | top of "What to do next"; no project folder yet |
| 2026-10-20 | Add "3D figures in our videos, built with Three.js so they can move" to the Central To-Do List | done | top of "What to do next"; style and first video not decided |
| 2026-10-20 | Make a separate vault for this semester academics | done | C:\ACADEMICS VAULT skeleton; courses and dates not filled in yet |
| 2026-10-21 | Marlon PS2 avatar: find refs, full-body rig, technical guide, self-review overnight | Done v0.6 | C:\dev\avatar\marlon; face likeness needs a photo texture next |
| 2026-10-21 | Marlon: make face read as him, more refs, eye area; then mouth-closed rule | done r7-r14, awaiting review | rule saved in 3d-sculpting-lessons |
| 2026-10-21 | Marlon avatar: use user's 4 closed-mouth photos; head/cheek/jaw/eyes/neck/realism notes | done r15-r17, awaiting review | out_v2/r17/face_sheet.png |
| 2026-10-21 | Marlon: resume 3D build from STATE, finish r18, fix hair, fade, head shape, chin | done r19 | curves hair + fade, skull flare; next r20: harmony, eyes, skin |
| 2026-10-21 | Marlon r20: brows, bigger eyes, harmony, jaw/head ratio, Adam's apple; then framework + canvas | done | r20 sheet; kit C:\dev\avatar\kit; Resources/3d-likeness-framework |
| 2026-10-21 | Marlon r21-r22: brows, lips, head size, normal haircut | done, awaiting review | r22 sheet sent |
| 2026-10-21 | Marlon: revert to r19 face, then fix side profiles | r23 done, side notes pending | r23 sheet sent |
| 2026-10-21 | Marlon: fix side profile by ratios, comparative analysis | r24b done | compare_final sent |
| 2026-10-21 | Marlon: keep r19 face, hairline from side diagram | r25 done | side_vs_mark sent |
| 2026-10-21 | Marlon: r19 front, straight vertical + curve round the ear, no zigzag | r26 done | sent |
| 2026-10-22 | Review Marlon avatar r26 | done | gap list given, waiting on pick |
| 2026-10-22 | Finish Blue by Fable shoe site (QA + API.md) | done | 2 bugs fixed (clothing tiles on home, 390 overflow); uncommitted |
| 2026-10-22 | Marlon r27: goatee, fade, skin, sunglasses | done | awaiting review |
| 2026-10-22 | Commit + tag preview, private share link for a friend | done | preview-v1 tag, Cloudflare quick tunnel, admin blocked |
| 2026-10-23 | 3D content pipeline walkthrough + judge a new reel for recreation with 3D chairs | Waiting for the reel | Pipeline notes read; reel not yet received |
| 2026-10-23 | Saved both reel analyses + 10 frame sheets as style references in Content Creation (references/3d-js-reels) | Done | no build yet |
