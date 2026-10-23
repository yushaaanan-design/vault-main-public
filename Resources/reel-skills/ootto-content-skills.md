---
tags: [skill, reel-source, audited]
reel: DeG9u_slJ4z (Jayant, Instagram)
status: not installed
---
# Ootto content skills (`ootto-ai/claude-content-skills`)
- **What:** about 55 markdown skill folders for Instagram content: reel-builder, reel-scripter, reel-analyzer, hook-mining (plus one Python helper), caption-and-hashtags, carousel-builder, bio-profile-optimizer, comment-responder, content-factory (orchestrator), content-research and more. Repo v1.4.0, MIT, last commit 2026-08-23. The reel claims "52 skills"; plugin.json says 13; not confirmed.
- **Audit (2026-10-08, quarantine `C:\dev\reels\quarantine\claude-content-skills`, 681 KB, nothing executed):** code CLEAN. `install.sh` only copies folders; `mine_hooks.py` imports only csv, json and re. No Claude hooks, no instruction-override text, no exfiltration. **UNSAFE: the `agent-reach` skill** tells the agent to `pipx install` unvetted third-party CLIs (twitter-cli, rdt-cli from a GitHub repo, bilibili-cli) and to take the user's cookies. `content-factory` can publish to Instagram via Composio after an OK step. Several skills push the vendor's paid product (ootto.ai).
- **Overlap:** partly with our own reel pipeline (analysis, hooks, research) and the planned Fable content work.
- **Cost:** installing all of them adds about 55 descriptions to every session's context.
- **Verdict:** repo safe except `agent-reach`. Install nothing now. Later copy only what is needed (suggested: reel-analyzer, hook-mining, caption-and-hashtags) into `~/.claude/skills/<name>/`.
- **Undo:** delete the copied folders from `~/.claude/skills/`.
