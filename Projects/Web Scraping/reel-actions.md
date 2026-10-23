---
up: "[[Web Scraping]]"
---
# Reel actions (step 3 of the saved-reels pipeline)
Running list of what each analysed reel asks us to DO, with audit status. Analysis files: `C:\dev\reels\3-analysed\ig_<id>\timeline.md` (caption + coverage + transcript). Ledger: `C:\dev\reels\ledger.csv`. Method: [[saved-links-methodology]]. Rule (user, 2026-10-08): audit and report; if SAFE, install; if not safe or doubtful, do not install, report and ask. Never comment/follow/DM from the user's account without asking (comment-gated links: found by web search instead, matches UNVERIFIED).

| Reel | Creator | What it says | Real source (web search, 2026-10-08) | Redundant with what is installed? | Status / next |
|---|---|---|---|---|---|
| DeM-PhxulJ0 | Deon Menezes | Meta "Muse" always-on agent | News: Meta Muse launched in the US on 2026-09-08 (iOS, Android, muse.ai), runs in its own cloud VM. The "8 GB RAM / 100 GB" claim is NOT confirmed anywhere. | n/a | INFO ONLY, no action. Idea note for agent work. |
| Daxj09yTmr_ | Tech Guy Peter | "One-line" web design setup: Claude Code + UI UX Pro Max + 21st.dev + Framer Motion | `nextlevelbuilder/ui-ux-pro-max-skill` (skill, CLI `uipro-cli`); 21st.dev components via shadcn CLI need an API key (free tier limited); Motion (was Framer Motion, package now `motion`). The "ultimate repo" in his bio is NOT identified. | YES: overlaps impeccable, taste-skill, frontend-design (all installed) | RECOMMEND SKIP. Not audited. |
| DYcaq-GIpCV | Stewie (AI Expert) | "Open Design": open-source Claude Design clone | `nexu-io/open-design`, Apache-2.0, local-first app that drives coding-agent CLIs you have, BYOK; star counts in sources range 57K-84K | Partly (design skills, hyperframes) | AUDITED 2026-10-08, see [[reel-skills/open-design]]. Safe if built from source; telemetry on by default; heavy. Not installed. |
| DeH2ZYNSwsO | Phineas & ferb | "Everything Claude Code": 181 skills, 47 agents, 79 commands, AgentShield | `affaan-m/everything-claude-code`, MIT, author won Anthropic x Forum Ventures hackathon (Sep 2025). Counts differ by source and date (181 / 183 / 262). Includes 20+ automated HOOKS and rules. | YES, heavily: overlaps agent-skills, ponytail, security skills | AUDITED 2026-10-08 (sampled), see [[reel-skills/everything-claude-code]]. No malice found; not recommended wholesale. Not installed. |
| DeG9u_slJ4z | Jayant | 5 Claude skills for Instagram content (reels, carousels, captions, profile, comments) | `ootto-ai/claude-content-skills` (MIT, v1.4.0, last commit 2026-08-23). The "52 skills" figure NOT confirmed (plugin.json says 13, repo has ~55 skill folders). | Partly: overlaps our own reel pipeline (reel-analyzer, hook-mining, content-research) | **AUDITED 2026-10-08, see below.** Decision waiting on the user. |

## Audit: ootto-ai/claude-content-skills (quarantine `C:\dev\reels\quarantine\claude-content-skills`, 681 KB, nothing executed)
- Files: 59 markdown, 1 shell installer, 1 Python helper, 2 JSON configs, 3 images. License MIT.
- `install.sh`: only copies skill folders into `~/.claude/skills/`; if run outside the repo it would git clone the same repo. No hidden calls. CLEAN.
- `skills/hook-mining/mine_hooks.py`: imports only csv, json, re, collections, pathlib; no network, no exec. CLEAN.
- "hooks" in the plugin config means video hooks, not Claude Code hooks. No Claude hooks in the repo.
- Skill text: no instruction-override wording, no exfiltration, no base64/eval.
- **Concerns:** (1) `agent-reach` skill tells the agent to `pipx install` unvetted third-party CLIs (twitter-cli, rdt-cli from a GitHub repo, bilibili-cli) and says "the user only provides cookies, the agent does the rest": NOT SAFE, exclude it. (2) `content-factory` can publish to the user's Instagram via Composio, after an OK step: outward-facing, keep the OK gate. (3) Several skills push toward the vendor's paid product (ootto.ai, "Ootto MCP"). (4) ~55 skills would add ~55 descriptions to every session's context (token cost), so install only the few needed.
- **Verdict:** repo code is safe; `agent-reach` is not. Recommend installing NOTHING now, and later copying only chosen skills (for example reel-analyzer, hook-mining, caption-and-hashtags) when a content task starts. Waiting for the user.

## Registry
Every skill or tool gets a note in `Resources/reel-skills/` (index: [[reel-skills/_index]]).

## Where things go
Skills actually installed are added to `Resources/skills-list.md` (row + date) and `Resources/tools-in-use.md`; redundancy is checked against both before any install.

