---
tags:
  - business
  - central
up: "[[INDEX]]"
---
# Business list (money-making projects)

Created 2026-10-21 (user: "I can't keep track of my projects"). One line per business: what it is, where its notes live, status, what is next. Update this note when a business changes. Academics (university) is NOT a business and is tracked in `C:\ACADEMICS VAULT`.

**Focus (user, 2026-10-23): ACTIVE this month = Clipping, YouTube documentaries, Fable / 3D content.** Everything else is PARKED: it only gets the assistant's nightly research, no build time. Change this line when the focus changes.

| # | Business | What it is | Status | Notes / hub |
|---|---|---|---|---|
| 1 | **MUN Academy** | Delegate-training site, starting with the UN Security Council. To be charged for later (user: "we're going to charge it later"). | Building: React + Vite prototype, structure v2 approved, one mission written. Lacks credits right now, so work is in small slices. | Vault `C:\MUN ACADEMY VAULT\_Project\` (CONTEXT, STATE, Handoff 2026-10-20, run-log); site `C:\dev\mun-academy\web` |
| 2 | **Fable Shoe Business** | Blue by Fable: leather shoes and accessories, online shop. | Running; competitor research and 3D product models in progress. | [[Projects/Fable Clothing/STATE\|Fable Clothing STATE]], [[Projects/Web Scraping/STATE\|Web Scraping STATE]], [[Projects/img2threejs/STATE\|img2threejs STATE]] |
| 3 | **3D business (3D content)** | Content made with 3D characters, in TWO segments (user, 2026-10-22: "also make it like content"). **3A. Marlon-style 3D characters:** Blender-built stylised character (the Marlon build: MakeHuman base, Mixamo rig, likeness work; reference skit reel, feasible as low-poly/PS2 look per the first analysis). **3B. Three.js small avatars ("Claude avatar" type):** small, simple avatars rendered in Three.js; the user says they are NOT high quality and NOT PS2-game quality, "campfire small type" (exact meaning of "campfire" not confirmed). | Planning. 3A: character in progress (round r6 of realistic v2, next: face texture, outfit, animation). 3B: img2threejs pipeline exists (image to Three.js), no avatar product defined yet. Pipeline tools installed: yt-dlp, faster-whisper, ffmpeg, torch with CUDA, Blender 5.2.2. | 3A: [[Projects/3D Avatar/STATE\|3D Avatar STATE]], [[Resources/3d-likeness-framework\|likeness framework]], [[Resources/3d-sculpting-lessons\|3D lessons]]; 3B: [[Projects/img2threejs/STATE\|img2threejs STATE]]; reels: [[Projects/Instagram Campaign Scraping/STATE\|reel analysis STATE]] |
| 4 | **Clipping** | Cutting clips from longer videos for short-form platforms. | Started 2026-10-22: own vault `C:\CLIPPING VAULT` (pointer at Projects/Clipping). Studying viral Jynxzi clips first. Rights and earning still undecided. | See the vault Index |
| 5 | **YouTube documentaries** | Documentary-style videos for YouTube (user, 2026-10-22: "like YouTube documentaries, I completely forgot about it"). Existing groundwork: a code-drawn infographic film method and the nextwork.ai one-hour infographic film (to-do item, MUST DO). Whether the nextwork.ai film is the first YouTube documentary or a separate job is not confirmed. | Idea plus groundwork. Assembly tool candidate: HyperFrames (open source, Apache-2.0, free; on the to-do list). Nothing published. | [[Projects/Documentary/Documentary STATE\|Documentary STATE]], [[github-repos]] (HyperFrames entry) |
| 6 | **Trading** | Trading (user, 2026-10-22: "put trading in there"). What market, what capital, manual or automated is NOT stated yet, so nothing is assumed here. | Idea only (added 2026-10-22). Nothing decided, nothing built. | No project folder yet; create `Projects\Trading\` (STATE + run-log) when work starts. Any strategy or money-handling work needs an explicit risk review first |
| 7 | **MUN product vault (SOLD)** | The finished MUN knowledge vault already sold to a buyer (added 2026-10-23 by the scan: it was missing from this list). | Sold. Buyer, updates and support are NOT tracked anywhere yet (open: who, what was promised). BUP MUN (UNSC research) is a separate vault and unclear in its link to this; decide whether it is a business or study. | `C:\MUN VAULT` (no owner info inside), internal notes `C:\dev\mun-pipeline\docs\`, BUP MUN vault `C:\BUP MUN VAULT` (separate) |


Status of focus: 1 MUN Academy PARKED, 2 Fable ACTIVE, 3 3D business ACTIVE (Fable / 3D content), 4 Clipping ACTIVE, 5 YouTube documentaries ACTIVE, 6 Trading PARKED (research only), 7 MUN product vault PARKED.

## How the businesses connect
- The video pipeline (download, transcript, cuts, frames) serves both the 3D business and clipping.
- Reels analysis feeds the 3D business (what to build) and later clipping (what works).
- Documentaries and clipping can share tools (HyperFrames renders HTML to video; yt-dlp, Whisper and ffmpeg for sources).

## Open decisions
- Order of work. Current thinking (2026-10-21): academics deadlines first; then the reel/3D pipeline (cheap, runs on this PC); MUN Academy in small slices because credits are short.
- Clipping: sources, platforms, rights and permission for source footage, how it earns.
- 3D business: who the customer is and what is sold (videos, avatars, a service). Two segments now: 3A Marlon-style characters and 3B small Three.js avatars ("campfire small type", meaning to confirm); what content each segment produces and where it is posted.
- YouTube documentaries: topics, channel, how it earns, and whether the nextwork.ai film is the first one.
- Trading: which market (stocks, crypto, forex), how much capital, manual or automated, and the risk limit. Nothing is decided.

## Log
- 2026-10-21: list created with the four businesses the user named.
- 2026-10-22: added business 5, YouTube documentaries (user had forgotten it); Clipping moved to its own vault.
- 2026-10-22: added business 6, Trading (idea only, details not given yet).
- 2026-10-22: 3D business reworded as 3D content with two segments (3A Marlon-style characters, 3B small Three.js avatars).

