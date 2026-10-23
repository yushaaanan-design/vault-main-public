---
tags: [resources, skills]
updated: 2026-09-21
---
# Skills and tools list

What is actually loaded in Claude Code, what is available, and how to load each one. The longer story per repo is in [[github-repos]]. Check what's live any time with `/plugin` (installed tab) or `/context`.

> [!tip] Claude installs these itself
> Claude runs `claude plugin marketplace add <owner/repo>` and `claude plugin install <name>@<marketplace> --scope user` from the shell, so you don't type `/plugin`. Restart Claude Code afterwards so skills and hooks load.
> Past failures of `/plugin install` were because git tried SSH to github.com with no known host key. Fixed 2026-09-21 with `git config --global url."https://github.com/".insteadOf "git@github.com:"` (undo: `git config --global --unset url.https://github.com/.insteadof`).

## Loaded (verified in `~/.claude/plugins/installed_plugins.json`)
| Skill / plugin | What it does | Cost / notes |
|---|---|---|
| `ponytail@ponytail` | "Lazy senior dev" mode: simplest working solution, always-on hooks. Say "stop ponytail" to turn off. | Small. Terse, so ask for explanations when learning. |
| `obsidian@obsidian-skills` | Teaches me Obsidian Markdown, Bases, Canvas, and the Obsidian CLI (`obsidian-markdown`, `obsidian-cli`, `json-canvas`, `obsidian-bases`). | Small, ~500 tokens total. |

| `agent-skills@addy-agent-skills` | 27 engineering-lifecycle skills (spec-driven dev, TDD, code review, security, debugging, frontend-ui-engineering, performance...) plus `/build`, `/review`, `/ship`. Installed 2026-09-21, v0.6.10. | Loads on next restart. |

| `microsoft/playwright-cli` | Installed 2026-09-21: global CLI v0.1.21 plus the skill in the project's `.claude/skills/playwright-cli`. Uses your installed Chrome. Localhost only. | Loads on next restart. |

| `impeccable@impeccable` | Design skill, 24 commands. Installed 2026-09-21, v4.3.1. Edit hook disabled via `IMPECCABLE_HOOK_DISABLED=1` in `~/.claude/settings.json` (set by the user, 2026-09-21). | Loads on next restart. |
| `taste-skill@taste-skill` | ~13 frontend design skills. Installed 2026-09-21, v1.0.0. | Loads on next restart. |
| `img2threejs` (in `~/.claude/skills/`) | Image to Three.js. Cloned 2026-09-21. | Loads on next restart. |

## Load commands for reference (all three above are already installed)
| Repo                          | What it does                                                                                       | Load command                                                                                                                             | My advice                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `pbakaus/impeccable`          | Design skill, 24 commands (`audit`, `critique`, `polish`, `harden`...), 61 UI-slop detector rules. | `/plugin marketplace add pbakaus/impeccable` then `/plugin install impeccable@impeccable`. Alt: `npx impeccable install` in the project. | Wait until v1 works. Hooks fire after every UI edit (tokens) and it downloads a binary. If you load it, run `/impeccable hooks off`. |
| `leonxlnx/taste-skill`        | ~13 anti-generic frontend design skills. Aimed at landing pages, defaults to Tailwind/shadcn/Next. | `/plugin marketplace add leonxlnx/taste-skill` then `/plugin install taste-skill@taste-skill`                                            | Skip for this project. Big skills, wrong stack.                                                                                      |
| `microsoft/playwright-cli`    | Lets me drive a real browser (open, click, type, screenshot) to check the UI.                      | Terminal: `npm install -g @playwright/cli@latest`, then in the project folder `playwright-cli install --skills`                          | Useful from Phase 1. Localhost only; never log into real accounts.                                                                   |
| `img2threejs/img2threejs`     | Image to procedural Three.js 3D model.                                                             | Terminal: `git clone https://github.com/img2threejs/img2threejs.git "$HOME/.claude/skills/img2threejs"`                                  | Not relevant here (no 3D). Skip the optional `img2` harness install.                                                                 |
| `voltagent/awesome-design-md` | ~73 brand `DESIGN.md` files to copy in. Not a skill.                                               | Nothing to install; copy one file from `design-md/<brand>/` if wanted.                                                                   | Skip for now. Don't mimic a brand.                                                                                                   |

## What was actually used on the Gym Tracker redesign (2026-09-21)
| Skill or tool | How it was used |
|---|---|
| `impeccable` | `context`, `concept-seed` (direction roll), `surface-brief` (direction contract), `detect` (0 findings), the **finish-reviewer** agent (8 findings, all fixed), the **documenter** agent (wrote `DESIGN.md`). Hook stayed off. |
| `agent-skills:frontend-ui-engineering` | Accessibility and structure checklist (semantic HTML, focus, labels, empty states). |
| `playwright-cli` | Real-browser test runs (68 checks) and every screenshot. |
| `taste-skill` | **Not used.** Its skills push Tailwind, GSAP and Next.js, and its image skills need an image generator we do not have. |
| `img2threejs` | Not used (no 3D). |
| `awesome-design-md` | Not installed (brand files). |
| Planned: front-end extraction skill | To be built after the project is finished: [[frontend-extraction-skill]]. |

## Parked
| Repo | Why |
|---|---|
| `diegosouzapw/OmniRoute` | Local LLM gateway. Env vars removed, server stopped. See [[github-repos]]. |

## Built into Claude Code (always there, no install)
`code-review`, `simplify`, `security-review`, `init`, `loop`, `schedule`, `update-config`, `claude-api`, `dataviz`, `artifact-design`. The `data:*` (SQL, analysis, dashboards) plugin is also present. These cost about 7k tokens of skill descriptions each session, so extra skills add up.

## Rule of thumb
Every loaded skill adds its description to my context every turn, and hooks add more after each edit. Load only what the current phase needs.

## Found through saved reels (added 2026-10-08)
See [[reel-skills/_index|reel-skills index]]: one note per skill or tool (Ootto content skills, Everything Claude Code, Open Design, UI UX Pro Max, Meta Muse) with audit result and status. None installed yet.
