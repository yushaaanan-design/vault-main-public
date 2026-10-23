---
tags: [skill, harness, reel-source, audited]
reel: DeH2ZYNSwsO (Phineas & ferb, Instagram)
status: INSTALLED 2026-10-11 (user chose full install incl. hooks)
---
## Install record (2026-10-11)
- User picked "Everything incl. 24 hooks" in chat. Installed from the audited quarantine clone (commit ef648e0, 2026-10-01): `node scripts/ecc.js install --profile full --target claude --enable-hooks` (1126 file operations into `~/.claude`: ~300 skills, 68 agents, 94 commands, rules under `rules/ecc`, hooks merged into `settings.json`). `ecc doctor`: OK, no issues. Install-state: `~/.claude/ecc/install-state.json`.
- settings.json change: added `hooks` (PreToolUse 9, SessionStart 2, PostToolUse 2, PostToolUseFailure 2, Stop 7, PreCompact 1, SessionEnd 1) and `includeCoAuthoredBy`. Nothing else changed. Backup: `C:\dev\backups\claude-before-ecc\settings.json.pre`.
- Effect seen at once: GateGuard ("Fact-Forcing Gate") makes the first Bash command and first Edit of each file wait for stated facts. Turn off with env `ECC_GATEGUARD=off` or `ECC_DISABLED_HOOKS=pre:bash:gateguard-fact-force,pre:edit-write:gateguard-fact-force`.
- Undo: `node scripts/ecc.js uninstall` (from the quarantine clone), then restore the backup settings.json. `/config-gc` and `/context-budget` skills exist for trimming the ~300 skills if the skill list gets heavy.
- The original audit below was SAMPLED (not line by line); the install does not change that.

# Everything Claude Code, "ECC" (`affaan-m/everything-claude-code`)
- **What:** a full agent harness by the Anthropic x Forum Ventures hackathon winner (Sep 2025): skills, sub-agents, commands, rules, MCP configs, 24 hooks, the AgentShield security scanner and memory persistence. v2.2.3, MIT, last commit 2026-10-01, 4,212 files, 65 MB. Counts differ by source and date (181 / 183 / 262 skills).
- **Audit (2026-10-08, quarantine `C:\dev\reels\quarantine\everything-claude-code`, SAMPLED, not line by line):** no malicious behavior found. Checked: `package.json` (no lifecycle scripts, 4 small dependencies); `install.sh` (`npm install --ignore-scripts`); all 24 hook scripts listed; network use (only `mcp-health-check.js` probes MCP servers and `plan-canvas-pending.js` talks to 127.0.0.1; the rest of the network code is dev, CI and Discord tooling); credential patterns (only defensive checks and a dev-only script that reads a Claude token the user supplies). Its own code states intents such as "cloning a malicious repo must not auto-execute its MCP servers" and "credentials are never copied". NOT read: most of the 762 JS files.
- **Why not install:** (1) hooks run `node` on nearly every tool call (PreToolUse `.*`, PostToolUse `.*`, 7 Stop hooks), adding latency and output; (2) it writes metrics and learned data under `~/.claude`; (3) the installer changes global Claude config; (4) heavy overlap with the installed agent-skills, ponytail and security skills; (5) it changes the hooks setup that guards this PC, so any install needs the user's explicit OK at that moment.
- **Verdict:** looks legitimate, not recommended wholesale. If wanted: cherry-pick individual skills (no hooks), or run AgentShield read-only on other downloads after auditing it too.
- **Undo (if ever installed):** use its uninstall command, then remove its hook entries from `~/.claude/settings.json`.
