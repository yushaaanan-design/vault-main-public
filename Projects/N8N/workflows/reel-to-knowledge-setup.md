---
up: "[[N8N]]"
tags: [n8n, reel-pipeline, setup, workflow]
---
# Reel to Knowledge — setup guide

The workflow: `reel-to-knowledge.json` (same folder). 46 nodes, 8 sticky-note groups, one Telegram trigger.
Validator: `validate-workflow.js` — `node validate-workflow.js reel-to-knowledge.json`.

Related: [[reel-pipeline-context]] (decisions), [[nodes-reference]] (node cheat sheet), [[CONTEXT]].

---

## 0. What it does

Send anything to a private Telegram bot. The pipeline works out what it is, understands it,
decides where it belongs, and appends it to a note in the vault. Then it tells you what it did.

```
Telegram Trigger
  -> Config (the only node you edit)
  -> Normalise Input          one flat shape, whatever arrived
  -> Make Work Dir            /tmp/reels/<unique run id>
  -> Route By Input Type ─┬─ video  -> Telegram file:get -> disk ─┐
                          ├─ link   -> yt-dlp -> Download OK? ────┤
                          │                          └─ no -> Fail
                          │                                       ▼
                          │                       Media Ready -> ffmpeg audio
                          │                       -> whisper.cpp -> ffmpeg frames
                          │                       -> Video Bundle ──┐
                          ├─ photo  -> file:get -> disk -> base64 -> Photo Bundle ─┤
                          ├─ text   ------------------------------> Text Bundle ───┤
                          └─ error  ----------------------------------> Fail       │
                                                                                   ▼
                                                      Build LLM Request -> Classify
                                                      -> Parse Classification
                                                      -> Classification OK? -no-> Fail
                                                                   │yes
                          ┌────────────────────────────────────────┘
      Route Category ─┬─ skill     -> SKILLS-INBOX.md ─┐
                      ├─ todo      -> TODO.md ─────────┤
                      ├─ design    -> DESIGN.md ───────┤-> Render Entry -> file
                      ├─ reference -> REFERENCE.md ────┘   -> git commit+push
                      │                                    -> Vault Write OK?
                      │                                       ├ yes -> Success Reply
                      │                                       └ no  -> Fail Reply
                      └─ discard   -> Discard Reply (nothing written)
                                                     all three -> Cleanup (rm -rf work dir)
```

Every path ends in a Telegram message and in `Cleanup`. Silence is a bug, and `/tmp` never fills up.

---

## 1. Prerequisites

**Target n8n version: 1.70 or newer, self-hosted** (Docker or npm). Node types and `typeVersion`s
were checked against the current `n8n-io/n8n` master on 2026-09-28; every version used here is
an *older* registered version than the current default, which is the safe direction — n8n keeps
old node versions forever for backwards compatibility, so the import works on 1.70 and on anything
newer. n8n **Cloud will not run this**: it has no Execute Command node.

| Node type | typeVersion used | current default upstream |
|---|---|---|
| `telegramTrigger` | 1.2 | 1.5 |
| `telegram` | 1.2 | 1.2 |
| `set` | 3.4 | 3.5 |
| `code` | 2 | 2 |
| `if` | 2.2 | 2.3 |
| `switch` | 3.2 | 3.4 |
| `executeCommand` | 1 | 1 |
| `httpRequest` | 4.2 | 4.5 |
| `readWriteFile` | 1.1 | 1.1 |
| `convertToFile` | 1.1 | 1.1 |
| `noOp` / `stickyNote` | 1 | 1 |

### VPS packages (Hostinger, Debian/Ubuntu)

```bash
sudo apt update
sudo apt install -y ffmpeg git python3-pip build-essential cmake curl
# yt-dlp: use the nightly, the apt package is always months stale and Instagram breaks it
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
yt-dlp --version && ffmpeg -version | head -1
```

### whisper.cpp

```bash
sudo git clone https://github.com/ggml-org/whisper.cpp /opt/whisper.cpp
cd /opt/whisper.cpp
sudo cmake -B build && sudo cmake --build build -j --config Release
sudo sh ./models/download-ggml-model.sh base.en
ls -l /opt/whisper.cpp/build/bin/whisper-cli /opt/whisper.cpp/models/ggml-base.en.bin
```

> The binary is `whisper-cli` in current builds; older guides say `main`. If yours is `main`,
> change `whisper_bin` in the **Config** node. Nothing else needs touching.

### If n8n runs in Docker

The Execute Command node runs *inside* the container, so `yt-dlp`, `ffmpeg`, `git` and
`whisper-cli` must exist in there, and the vault clone must be visible in there. Either build a
small image `FROM n8nio/n8n` with the packages added, or bind-mount them:

```yaml
# docker-compose.yml (fragment)
services:
  n8n:
    image: n8nio/n8n
    user: root                          # needed to write /opt/vault and run apt-installed tools
    environment:
      - N8N_HOST=n8n.yourdomain.tld
      - WEBHOOK_URL=https://n8n.yourdomain.tld/    # Telegram needs a real HTTPS URL
      - GENERIC_TIMEZONE=Asia/Dhaka
      - NODES_EXCLUDE=[]
    volumes:
      - n8n_data:/home/node/.n8n
      - /opt/vault:/opt/vault           # the vault clone
      - /opt/whisper.cpp:/opt/whisper.cpp
```

Telegram triggers are webhooks: n8n must be reachable at a **public HTTPS URL**. If it is not
yet, put Caddy or Nginx + certbot in front of it before anything else works.

---

## 2. Credentials — three of them

Create these in n8n under **Credentials → New**, then open each node the table names and pick
the credential from the dropdown. The JSON carries `REPLACE_WITH_YOUR_..._CRED_ID` placeholders;
n8n shows the node with an empty credential slot, which is exactly what you want — **no real key
is in this file, and none should ever be put in it.**

| # | Credential type in n8n | Name to give it | Where the key comes from | Used by |
|---|---|---|---|---|
| 1 | **Telegram API** | `Reel Bot (Telegram)` | Telegram → chat with **@BotFather** → `/newbot` → it replies with a token like `12345:AA...`. Paste as "Access Token". | Telegram Trigger, Download Telegram Video, Download Telegram Photo, Success Reply, Fail Reply, Discard Reply |
| 2 | **Header Auth** | `LLM Provider (Header Auth)` | Name = `Authorization`, Value = `Bearer YOUR_KEY`. Key from → **Gemini (default):** [aistudio.google.com/apikey](https://aistudio.google.com/apikey), sign in with Google, "Create API key", free tier, no card. | Classify |
| 3 | *(none — git uses an SSH key on the VPS, not an n8n credential)* | — | see §3 | Commit To Vault |

After importing, also do this once: **@BotFather → /setprivacy → Disable** is *not* needed for a
private 1:1 bot, but **/setcommands** is nice to have. What you *do* need: send the bot one
message yourself so a chat exists.

### Swapping LLM provider — two fields and one credential

The request body is OpenAI `chat/completions` shaped, so all four of these work with the same
node. Change `llm_base_url` and `llm_model` in the **Config** node, and change the Value of
credential #2. Nothing else.

| Provider | `llm_base_url` | `llm_model` | Vision? | Free? |
|---|---|---|---|---|
| **Google Gemini** (default) | `https://generativelanguage.googleapis.com/v1beta/openai` | `gemini-2.5-flash` | native | free tier, no card |
| Groq | `https://api.groq.com/openai/v1` | `meta-llama/llama-4-scout-17b-16e-instruct` | yes | free tier, rate-limited |
| OpenRouter | `https://openrouter.ai/api/v1` | `google/gemini-2.0-flash-exp:free` | yes | `:free` models, rate-limited |
| Ollama on the same VPS | `http://127.0.0.1:11434/v1` | `llama3.2-vision` | yes | free, but needs ~8 GB RAM and is slow on a shared VPS |

**Why Gemini is the default:** it is the only one of the four that is free, genuinely multimodal
(the frames are the point — plenty of reels are text-on-screen with no voiceover), fast enough to
reply in Telegram inside a minute, and honours `response_format: {"type":"json_object"}` so the
classifier returns strict JSON without prompt-wrestling. **Fallback:** Groq, same node, one
credential + two Config fields. Use it if Gemini's free daily cap becomes a problem — Groq is
faster but its vision models are weaker at reading small on-screen text.
Check your real limits at [aistudio.google.com/rate-limit](https://aistudio.google.com/rate-limit);
free-tier caps change, and they are per-day and per-minute, not per-month.

`Parse Classification` does not trust the model anyway: it strips markdown fences, falls back to
the widest `{...}` span in the reply, coerces every field to the right type, rejects a `category`
outside the five allowed values, and forces anything below `min_confidence` (0.55) or flagged
`needs_review` onto the **todo** path tagged `#needs-review` rather than guessing a destination.

---

## 3. Getting output into the vault — git, and why

**The problem, stated honestly:** the vault is at `C:\OBSIDIAN VAULT\Codebase and learning\` on
the Windows laptop. n8n is on a Hostinger VPS. The VPS cannot write to that folder. There is no
clever flag that makes it possible.

**Chosen: the vault becomes a private git repo. The VPS holds a clone. n8n appends, commits,
pushes. The Obsidian Git plugin on the laptop pulls every few minutes.**

Why this one, concretely:

| Option | Works when laptop is off? | Needs open port / tunnel? | Setup | Failure mode |
|---|---|---|---|---|
| **(a) git ← chosen** | yes | no | ~20 min, once | merge conflict, visible, recoverable, full history |
| (b) OneDrive folder | yes | no | needs `rclone` + an OneDrive app registration on the VPS **and the vault moved inside OneDrive** — it currently is not | silent sync conflicts, `file (2).md` duplicates, no history |
| (c) n8n local on laptop | **no** — reels sent while it's off are lost, and the Telegram webhook needs a tunnel anyway | yes | medium | pipeline is simply down most of the day |
| (d) webhook listener on laptop | **no** | yes — an inbound port or a tunnel, plus a service you'd have to write and keep running | most work | dies silently when the laptop sleeps |

**The trade you are accepting with git:** one extra `git pull` on every write, and a possible
merge conflict if you edit the same note in Obsidian at the same second the bot appends to it.
The workflow mitigates this with `git pull --rebase --autostash` and by only ever *appending*
to the end of a file — append-vs-append on different lines almost never conflicts. In exchange
you get: works while the laptop is off, no inbound ports, and every entry is a commit you can
`git revert` if the classifier writes nonsense.

### Setup

**On the laptop** — turn the vault into a repo and push it to a **private** GitHub repo:

```powershell
cd "C:\OBSIDIAN VAULT"
git init
# .gitignore: keep Obsidian's workspace churn out of the history
Set-Content -Encoding utf8 .gitignore @'
.obsidian/workspace*
.obsidian/cache
.trash/
'@
git add -A ; git commit -m "vault"
git remote add origin git@github.com:yushaaanan-design/obsidian-vault.git
git branch -M main ; git push -u origin main
```

Install the **Obsidian Git** community plugin → set *Auto pull interval* to 5 minutes and
*Pull on startup* on. That is the whole laptop side.

**On the VPS** — a deploy key with write access, then the clone:

```bash
ssh-keygen -t ed25519 -C "n8n-vault" -f /root/.ssh/id_vault -N ""
cat /root/.ssh/id_vault.pub
# paste that into GitHub -> your vault repo -> Settings -> Deploy keys -> Add,
# tick "Allow write access"
printf 'Host github.com\n  IdentityFile /root/.ssh/id_vault\n  StrictHostKeyChecking accept-new\n' >> /root/.ssh/config
git clone git@github.com:yushaaanan-design/obsidian-vault.git /opt/vault
cd /opt/vault && git log --oneline -1   # must work without a password prompt
```

If n8n runs in Docker, the `/root/.ssh` of the *container* is what matters — mount it, or run
the clone inside the container.

The four target notes live in `Codebase and learning/Inbox/` (`vault_dir` in Config) and are
created on first use with an `# Inbox` style heading. Change `vault_dir` if you want them
elsewhere. Do **not** point `vault_dir` at a note you also heavily hand-edit; the bot appends,
and that's easier to live with in a file it owns.

### Security note, since this writes files from model output

Model output goes into a **file**, and that file is appended with `cat`. It is never interpolated
into a shell command. The only value the git node interpolates is `note_file`, which comes from
the four branch Set nodes and is a fixed string. Separately, `Normalise Input` rejects any URL
containing `' " \ ` $ ; | & < >` or whitespace before it reaches `yt-dlp` — that URL *is*
interpolated into a shell argument, so it gets an allowlist check instead of escaping. And
`Cleanup`'s `rm -rf` is wrapped in a `case` guard that refuses any path not under `work_root`,
so an empty expression can never turn it into `rm -rf /`.

---

## 4. Import and first run

1. n8n → **Workflows → Import from File** → `reel-to-knowledge.json`.
   (Or open a blank canvas and `Ctrl+V` the file contents — same result.)
2. Open the six Telegram nodes and the `Classify` node, pick the credentials from §2.
3. Open **Config** and check every path against your VPS: `whisper_bin`, `whisper_model`,
   `vault_repo`, `vault_dir`, `work_root`.
4. **Save**, then toggle **Active** on. Telegram triggers only fire when the workflow is active —
   in the editor, "Execute workflow" waits for one test message instead.
5. Send the bot the word `hello`. You should get a Telegram reply within ~15 seconds
   (it will be filed as `todo` or `discard` — that is correct behaviour for one word).

---

## 5. Testing each branch

Do these in order. Each one exercises a different path, and each should end in a Telegram reply.

| # | Send this | Expected path | Expected reply |
|---|---|---|---|
| 1 | Type `try htmx on the Fable admin panel` | text → Text Bundle → todo | `[ok] todo` + a line added to `TODO.md` |
| 2 | A public Instagram reel **link** | link → yt-dlp → audio → whisper → frames | `[ok]` with a category and the note it went into |
| 3 | The same reel **forwarded as a video** (Instagram Share → Telegram) | video → Telegram file:get | same as 2 |
| 4 | A YouTube Shorts link, then a TikTok link | link → yt-dlp | should succeed; yt-dlp handles both |
| 5 | A **screenshot** of a tweet or a UI | photo → base64 → vision only | `[ok]`, probably `design` or `reference`; transcript will be empty and that is fine |
| 6 | A silent reel (music only, text on screen) | video, empty transcript | `[ok]` — the frames carry it. If this comes back thin, raise `max_frames` |
| 7 | `https://instagram.com/reel/THIS_DOES_NOT_EXIST/` | link → Download OK? false | `[x] Download failed.` + yt-dlp's own last 8 lines |
| 8 | A video file over 20 MB | error output of the Switch | `[x] I cannot use what you sent.` + the 20 MB explanation |
| 9 | Break it on purpose: put a wrong key in credential #2, send anything | Classification OK? false | `[x] The classifier failed: The LLM API returned HTTP 400/401.` |
| 10 | Break it on purpose: `sudo chmod 000 /opt/vault`, send anything | Vault Write OK? false | `[x] Could not write the entry into the vault.` — remember to `chmod 755` back |

After each run, check `ls /tmp/reels` on the VPS — it should be **empty**. `Cleanup` is wired to
every terminal path, including all the failures.

For a design reel, confirm `DESIGN.md` gets "Visual takeaways" and "Could steal for" sections.
For a skill reel, confirm `SKILLS-INBOX.md` gets a bash block and the honesty callout.

---

## 6. Failure modes and what each Telegram reply means

| Reply starts with | What actually happened | What to do |
|---|---|---|
| `[ok] <category>` | Filed. The line names the note. | nothing |
| `[ok] ... (flagged #needs-review)` | The classifier was under 0.55 confident, or flagged itself. It went to `TODO.md` tagged `#needs-review` rather than guessing. | search `#needs-review` in Obsidian now and then |
| `[-] Looked at it, nothing worth keeping.` | Category `discard`. Nothing written. | if this is wrong too often, tighten the `discard` wording in the `Build LLM Request` system prompt |
| `[x] I cannot use what you sent.` | `Normalise Input` refused it: >20 MB video, a URL with shell-unsafe characters, or a message with nothing in it. | do what the message says — usually "send the link instead of the file" |
| `[x] Download failed.` | yt-dlp got nothing: private/deleted post, Instagram rate-limiting the VPS IP, unsupported URL, or over `max_download_mb`. The reply includes yt-dlp's last 8 lines. | for private posts set `ytdlp_extra` in Config to `--cookies /opt/n8n/cookies.txt` and put a Netscape-format cookie jar there. For rate limits, wait. Also `yt-dlp -U` regularly — Instagram breaks extractors often |
| `[x] The classifier failed: ... HTTP 401/403` | Bad or expired API key in credential #2, or the header is missing `Bearer `. | fix the credential |
| `[x] The classifier failed: ... HTTP 429` | Free-tier rate limit. The node already retries 3× with a 5 s gap. | resend in a minute; if constant, switch to Groq per §2 |
| `[x] The classifier failed: ... HTTP 404` | Wrong `llm_model` or wrong `llm_base_url`. | check both against the §2 table |
| `[x] The classifier failed: did not return parseable JSON` | The model ignored JSON mode even after the repair path. Rare. | check the model actually supports `response_format` |
| `[x] Could not write the entry into the vault.` | The git step failed: deploy key lost write access, the clone is on a detached HEAD, or a genuine merge conflict. | `cd /opt/vault && git status` on the VPS |
| **no reply at all** | This should not happen. Something threw outside the wired error paths. | n8n → **Executions**, open the red one, read the failing node. Then tell me which node, because it means a path is missing |

There is one thing worth adding later: an **Error Trigger** workflow, so even an unwired crash
messages you. Not built here — the wired paths cover every case listed in this table.

---

## 7. Cost per reel

| Step | Tool | Cost |
|---|---|---|
| Download | yt-dlp | **$0** |
| Audio extract, frame sampling | ffmpeg | **$0** |
| Transcription | whisper.cpp on the VPS | **$0** — CPU only, ~10-25 s for a 30 s reel on a 2-core VPS |
| Classification (transcript + up to 8 frames, one call) | Gemini 2.5 Flash free tier | **$0** while inside the free tier |
| Vault write | git push | **$0** |
| Hosting | Hostinger VPS | already paid, no per-reel cost |

**Marginal cost per reel: $0.** The only real budget is the Gemini free tier's per-day request
cap, and one reel is one request. If you ever move off the free tier, the same call on paid
Gemini 2.5 Flash is roughly 2–3k input tokens (8 frames ≈ 258 tokens each, plus transcript) and
~300 output tokens — a small fraction of a cent per reel, so even the paid path stays trivial.

The non-money cost is CPU: whisper.cpp is the slow part. If replies feel slow, either switch
`whisper_model` to `ggml-tiny.en.bin` (faster, worse) or move transcription to Groq's free
Whisper endpoint — but that is a second API dependency for something that is currently free
and offline.

---

## 8. What n8n honestly cannot do here

**It cannot install a Claude Code skill, plugin or MCP server on your laptop.** n8n runs on the
VPS; Claude Code runs on the laptop. There is no path from one to the other that does not involve
opening your laptop up to the internet.

So the `skill` branch produces the *actionable artifact* instead: an entry in `SKILLS-INBOX.md`
with the exact install command if one was visible or spoken in the reel (and an explicit
"no command was visible, open the source" line if not), what the thing claims to do, and a
verification step. You paste the command. The entry carries a callout saying exactly this, so
future-you reading the note is not misled either.

The same applies to `install_command`: the system prompt forbids inventing one. An empty
`install_command` is the correct output when the reel never showed a command, and the note says so.
