---
up: "[[INDEX]]"
tags: [resource, automation, plan, mun]
---
# Nightly automation plan (written 2026-10-05)

Goal (user): every night the projects get researched and advanced on their own, on a loop, with context kept in files. Start with the **MUN vault pipeline**, then the rest. **Gym Tracker is excluded** (user, 2026-10-05). Free tools first; the user's cloud budget (about $100, check `/usage`) is for the model work.

## 1. The three building blocks
1. **Context in files, not chat.** Every run starts by reading the project's `STATE.md` and a `QUEUE` file, and ends by writing results and ticking the queue. A run that dies loses nothing.
2. **A queue per project** (`queue.json`: item, status todo/doing/done/failed, attempts). A run takes the next N items, so any run can be repeated.
3. **A gate that fails closed.** Output is accepted only if a script verifies it (for MUN: every quote must exist verbatim in the source text). Failed items go to `failed`, never into the vault.

## 2. Where it runs
| Layer | Where | Why |
|---|---|---|
| Fetching public documents, extraction, verification scripts, queue | **Your PC**, nightly via Windows Task Scheduler (free, no Claude needed) | files are local, no model cost |
| The model work (analysis, drafting, research summaries) | **Headless Claude Code** (`claude -p`, local, scheduled) or a **cloud routine** | needs a model |
| Handover for the cloud | a **private GitHub repo** holding text + queue + results | a cloud session cannot see `C:\` |

Facts found so far (web, **unverified**; CORRECTED 2026-10-05: the plan to move `claude -p` into a separate $100 credit pool was reportedly PAUSED on 2026-06-15, so headless runs probably still use the normal subscription limits; the user's "$100" is not yet identified, check `/usage`); cloud routines have daily caps (about 15 a day on Max); session cron jobs die when the terminal closes and expire after 7 days. Check `/usage` before relying on any of this. Sources: https://www.alexdunlop.com/writing/claude-code-scheduled-tasks , https://wmedia.es/en/tips/claude-code-headless-mode-autonomous-agent

**How to start a cloud run (what the user does, needs GitHub):** (1) create a private repo, (2) I put the project folder in it (no secrets, no PDFs), (3) from a terminal in the repo: `claude --remote "follow CLOUD-TASK.md"`, or use the `/schedule` skill to make it a nightly routine. A cloud run starts blank, so `CLOUD-TASK.md` and `STATE.md` carry all context.

**Models:** bulk extraction on a cheaper model, **Opus for the verifier and the hard parts** (pilot, drafting, contradictions). Prices not checked: ask the claude-api skill before any large batch.

## 3. MUN vault: the automated, verified pipeline
Built already (see architecture (C:\dev\mun-pipeline\docs\architecture.md)): index, fetch (2,812 PDFs), meta, extract (2,812 texts; 3 scans need OCR). Missing: stages 4 to 7.

```
NIGHTLY (PC, Task Scheduler)
 A  index + fetch --all        new resolutions only, polite, stop on 403
 B  extract                    text files; scans -> OCR queue
 C  queue.json                 new numbers appended as "todo"
NIGHTLY (model, 20-50 items a run)
 D  EXTRACT FACTS   per resolution: date, meeting no., vote line as written, Chapter VI/VII mentions, operative clauses,
                    each fact = {claim, source symbol, verbatim quote}
 E  VERIFY (script) every quote must be found verbatim in text/S-RES-n.txt; every number/date re-parsed by regex;
                    fail = back to queue (max 2 retries) then "failed"
 F  VERIFY (Opus)   second model reads text + facts, flags any claim the quote does not support. Disagreement = failed
 G  WRITE NOTE      Resolutions/S-RES-n.md from verified facts only; facts and interpretation in separate sections
 H  AGENDA TIMELINES rebuilt from verified notes, grouped by the approved topic mapping
 I  REPORT          dashboard.md: done, failed, new tonight, quote-check pass rate, 100-item spot-check sample for the user
PHASE 2 (country policy)
 J  fetch S/PV meeting records (same UN endpoint, symbol S/PV.n) and explanations of vote
 K  per country per resolution: position + reason, ONLY as a verbatim quote with the meeting record symbol
 L  country profile notes: positions across resolutions, linked to the quotes
```
**Verification rules (enforced by script, not trust):** no source, no claim; quotes must match the source text exactly; numbers re-derived by regex; the vote result is copied from the document, never inferred; interpretation lives in its own labelled section; each night the user gets 100 random items to spot-check; a pass-rate below a threshold (say 98%) stops the next night's run.


**Phase 2 sources found by the 2026-10-05 recon** (details: source-map (C:\dev\mun-pipeline\docs\source-map.md), canvas source-map canvas (C:\dev\mun-pipeline\docs\source-map.canvas.md)): the Dag Hammarskjöld Library publishes **one table per year (1946 to 2026) of every meeting with its S/PV number, agenda item, outcome and vote counts** (`research.un.org/en/docs/sc/quick/meetings/<year>`): parse these first into `meetings.jsonl`. Per-country votes: the psdata datasets `DPPA-SCVOTES` (since 1992) and `DPPA-SCVETOES` (since 1946), plus the Digital Library voting data (before 1992): download routes still to be found. Verbatim S/PV records: recent ones download, old ones (e.g. S/PV.1382) do not. Interpretation: the Repertoire of the Practice chapters.

**Country policy needs the meeting records (phase 2).** A resolution PDF gives the text and the meeting it was adopted at, not each country's reasoning. Reasons come from the verbatim records (S/PV) and explanations of vote. Size of that corpus is unknown: to be measured before the model run is priced.

**Decide before building stage D:** (1) which model does bulk extraction; (2) the pass-rate threshold; (3) pilot first (resolution 242) or straight to batches; (4) are meeting records (S/PV) in scope now.

## 4. Nightly research workflow per project (Gym Tracker excluded)
Each project has one "night question" and one output file. A loop run picks the next project, reads its `STATE.md`, does ONE research pass, writes a dated entry with source links and marks unverified items.

| Project | Night research (rotating) | Free automation | Output |
|---|---|---|---|
| **MUN vault** | new UN resolutions overnight; failed-verification list; OCR scans; S/PV coverage and size | Task Scheduler script A to C, queue + verifier | `dashboard.md`, verified notes |
| **Instagram reel analysis** | Sort Feed / browser control; free vision models for 6 GB; edit-factor libraries; Whisper on GPU | `analyze_reel.py`; Playwright automation browser (Chromium; `--load-extension` removed from branded Chrome 137+) | `overnight-research.md`, timelines |
| **Blue by Fable photos to 3D** | photogrammetry (Meshroom, COLMAP), image-to-3D that fits 6 GB, `img2threejs` | none yet; test one shoe photo set later | card + tool shortlist |
| **Fable Clothing site** | bKash/Nagad/SSLCommerz/Pathao requirements; email provider; pre-launch security checklist | none; list of owner-blocked items refreshed | checklist in `todo` |
| **Content Creation** | which avatar/voice tools still have free tiers; Chatterbox, Qwen3-TTS status | none | scoring sheet inputs |
| **N8N reel-to-knowledge** | Telegram bot, whisper.cpp on VPS, workflow import steps | n8n itself once set up | setup checklist |
| **Virtual Assistant / Ares** | what is broken; Docker connector gateway options (Activepieces, n8n, Composio self-host) | none | card |
| **Free video editor** | scriptable open-source pieces (ffmpeg, MoviePy), licences, Recordly (AGPL) as reference | none | architecture note |
| **Learn security/authentication** | one new free lesson or cheat sheet per night for a JS/Express/Postgres learner | none | study list |
| **Skills and plugins** | new Claude skills/plugins to vet; add to `skill-suggestions` | none | vetted list |
| **Marketlens** | parked | none | skip |

Rotation: MUN every night (it is the pipeline), the others one per night on a cycle. Weekly: a ranked "do this first" list.

## 5. Set up for tomorrow (checklist)
1. [ ] Check `/usage`: what the $100 is, when it ends (said to be 2 PM tomorrow), and whether headless runs use it.
2. [ ] Decide the four MUN questions above.
3. [ ] Create a **private GitHub repo** for the MUN pipeline (user does this; never paste tokens in chat).
4. [ ] I write: `queue.json` builder, `verify.py` (quote and number checks), `CLOUD-TASK.md`, `run_night.ps1` for Task Scheduler.
5. [ ] Test the whole chain on **10 resolutions** (including 242) before any large batch; read the dashboard together.
6. [ ] Then schedule: PC task for A to C; cloud/headless for D to I.
7. [ ] Keep the PC awake overnight yourself (I will not change power settings) or run the model stages in the cloud.

## 6. Limits and honest unknowns
- Cloud sessions cannot reach the PC or the UN fetch scripts' `data/` unless uploaded; PDFs (290 MB) are not needed in the cloud, only the 27 MB of text.
- Model cost for 2,812 resolutions plus meeting records is **not priced**; first measure tokens per resolution on 10 items.
- "Verified" here means every claim is traceable to an exact quote in an official UN document, not that the claim is true in a political sense.
- Country positions beyond what is written in the records are interpretation and stay labelled as such.
