---
up: "[[N8N]]"
tags: [n8n, context, reel-pipeline]
---
# Reel-to-Knowledge Pipeline — handoff context

Written so a fresh session can pick this up without the original chat. First real n8n workflow being built (not just the course). Read this, then [[nodes-reference]] for node syntax, then [[CONTEXT]] for the general innate-vs-learning n8n background.

## The problem this solves
User scrolls Instagram reels, saves knowledgeable ones (new Claude Code skills, verification procedures, things to try), but saved reels get forgotten — never revisited, never acted on. Goal: an automated pipeline that turns a saved reel into either an installed/verified skill or a to-do item surfaced the next morning.

> [!done] Superseded, 2026-09-28
> Phases 1 and 2 are both **written and validated** as one workflow: `workflows/reel-to-knowledge.json`,
> with [[reel-to-knowledge-setup]] as the guide. Everything below in "Phase 1 decisions" still holds;
> the "Open / not yet decided" section is resolved and rewritten at the bottom. Nothing is imported yet —
> the VPS setup in §1 of the guide is the remaining work.

## Full scope
1. **Phase 1 (done, in JSON):** get the reel → download → analyse → structured key points.
2. **Phase 2 (done, in JSON):** classify and route — skill / todo / design / reference / discard, each writing into its own vault note.
3. **Phase 3+ (later, unscoped):** email and "whatnot" — user said they'll expand once phases 1–2 work.

## Phase 1 decisions (locked)
- **Trigger: Telegram**, not a native Instagram bot. Instagram's Graph API doesn't expose "intercept what I share/save" to a personal bot without business app review — that API is for managing content you own, not automating your own saved-reels list. Instagram's native "Share to..." sheet already lists Telegram, so forwarding a reel there to a private bot (made via @BotFather) gets the same "send it to a bot" behavior the user wanted, using Telegram's open Bot API instead.
- **Download: self-hosted `yt-dlp`** — free, well-maintained, no per-request cost. Requires shell access, which means n8n must be **self-hosted on the Hostinger VPS** (n8n Cloud doesn't support the Execute Command node this needs). This confirms self-hosting on Hostinger, already the plan, is the right call.
- **Analysis: multimodal** — extract audio, transcribe with Whisper, extract a handful of key frames (~1 every 3s, capped ~6-8 per reel), send transcript + frames together to a vision-capable LLM in one call to get key points + key activities. Chosen over audio-only (misses on-screen text/visual-only reels).
- **Vision/summarization model: Gemini 2.5 Flash, free tier** (reversed from the original Claude-only plan — see below). User requires $0 cost since this is personal use; Gemini's free tier (1,500 requests/day, 15/min, multimodal image+video+audio input, no card required) comfortably covers personal reel volume. This does reintroduce the multi-provider dependency the original design avoided, but was an explicit, informed tradeoff: cost took priority over single-provider simplicity.

## Architecture (single n8n workflow, phase 1)
```
Telegram Trigger
  -> IF has video  --false--> reply "send a reel"
  -> Execute Command: yt-dlp download -> /tmp/reels/{id}.mp4
  -> Execute Command: ffmpeg extract audio -> {id}.mp3
  -> HTTP Request: Whisper transcription
  -> Execute Command: ffmpeg extract key frames -> {id}_f1..fN.jpg
  -> Code node: build multimodal prompt (transcript text + base64 frames)
  -> HTTP Request: Gemini API (2.5 Flash, vision) -> key points + key activities
  -> Edit Fields: shape output { title, key_points[], key_activities[], raw_transcript }
  -> Telegram: reply with the summary   <- phase 1 ends here
```
Phase 2 will branch after the Edit Fields node once phase 1 works end-to-end.

## Setup still needed before building
- Create the Telegram bot via @BotFather, store its token as an n8n credential.
- Confirm/complete n8n self-hosted on the Hostinger VPS (shell access required for Execute Command).
- Install `yt-dlp` and `ffmpeg` on that VPS.
- Whisper: **self-hosted `whisper.cpp`** (decided — free, in progress as of 2026-09-27).
- Add a **Gemini API key** as an n8n credential for the vision/summarization call (free tier, no card required).

## Now decided (2026-09-28) — all of this is implemented in `workflows/reel-to-knowledge.json`

- **Input handling is exhaustive, not just the happy path.** A `Normalise Input` Code node collapses every possible Telegram message into one flat shape, then a 5-way Switch routes: uploaded video, photo/screenshot, link (Instagram / YouTube Shorts / TikTok / X / FB — yt-dlp handles them all, no hard-fail), plain text, and a rejected-input error output. Nothing after that node reads `$json.message` again.
- **Plain text is a first-class input, not an error.** Typing a thought gets classified and filed like a reel. The old "send a reel" false-branch reply is gone.
- **Classifier: Google Gemini 2.5 Flash on the free tier, called through its OpenAI-compatible endpoint.** Because the body is OpenAI `chat/completions` shaped, swapping to Groq / OpenRouter / local Ollama is *two Config fields and one credential value* — see the table in the setup guide. Strict JSON via `response_format: {"type":"json_object"}`, plus a repair path (strip fences → widest `{...}` span) and full field coercion in `Parse Classification`. Confidence below 0.55 or `needs_review` is forced onto the **todo** path tagged `#needs-review` instead of guessing a destination.
- **Four destinations, one shared writer.** `SKILLS-INBOX.md` / `TODO.md` / `DESIGN.md` / `REFERENCE.md` under `Codebase and learning/Inbox/`, plus a fifth `discard` path that replies but writes nothing. The four branch nodes only pick the target file and the entry kind; all the markdown rendering and all the git work is shared, so there is one copy of it.
- **Vault writing: git.** The vault becomes a private GitHub repo, the VPS holds a clone at `/opt/vault`, n8n appends + commits + pushes, and the Obsidian Git plugin pulls on the laptop every 5 min. Picked over OneDrive (the vault is not inside OneDrive, and would need rclone + an app registration, with silent conflicts and no history), over running n8n locally (dead whenever the laptop is off, and still needs a tunnel for the Telegram webhook), and over a laptop webhook listener (same problem, more work). The trade accepted: one extra `git pull --rebase --autostash` per write, and a possible conflict if a note is hand-edited at the same instant — mitigated by only ever appending.
- **Honesty constraint on the skill branch.** n8n cannot install a Claude Code skill on the laptop: n8n is on the VPS, Claude Code is not. The skill branch produces a paste-ready install command (or an explicit "no command was visible" line — the prompt forbids inventing one), what it claims to do, and a verification step, with a callout in the note saying nothing was installed.
- **Cleanup is solved.** Every run gets `/tmp/reels/<message_id>-<epoch>-<random>/`, so two reels arriving at once cannot collide. One `Cleanup` node is wired to all three terminal paths — success, discard and failure — so temp files go away even when the run failed. `rm -rf` is wrapped in a `case` guard that refuses any path outside `work_root`.
- **No silent failures.** Six failure sources (rejected input, download failed, Telegram file download failed, disk write failed, classifier failed, vault write failed) all converge on one `Build Failure Message` node that works out which fired and sends a plain-English Telegram reply with a likely fix.
- **Telegram `file_id` → file:** solved with the Telegram node's `file:get` operation (`download: true`), not a hand-rolled `getFile` HTTP request. That keeps the bot token inside the credential instead of interpolating it into a shell command or URL.
- **Security decisions:** model output is written to a file and appended with `cat`, never interpolated into a shell command. URLs are allowlist-checked (host + no shell metacharacters) before reaching yt-dlp, because the URL *is* interpolated into a shell argument.

## Still open
- Phase 3: email, and whatever else. Unscoped.
- An **Error Trigger** workflow, so even an unwired crash pings Telegram. Not built; the wired paths cover every failure currently known.
- Whether the four inbox notes should be one note per month instead of append-forever. Decide after a month of real use.

## Verification plan (once built)
- Forward a real reel to the Telegram bot, check each node's execution output in n8n (video downloaded, audio extracted, transcript sane, frames captured, Gemini's summary reasonable).
- Confirm the bot replies in Telegram with a readable summary.
- Send plain text (no video) and confirm the false-branch reply fires instead of an error.
