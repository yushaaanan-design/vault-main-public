---
tags: [harness, central]
up: "[[INDEX]]"
---
# Central harness (the system that improves the whole setup)

The model forgets between sessions. The harness is everything that does NOT forget: notes, scripts, checks and rules that every new session loads. It is central because lessons here apply to every project; each vault keeps its OWN small `_Harness/` for project-specific lessons and resume steps (see [[Vault Registry]]).

## Two layers
| Layer | Where | Holds |
|---|---|---|
| Central | this folder (`C:\OBSIDIAN VAULT\Codebase and learning\Harness\`) | cross-project lessons, the user's working preferences, the done-checklist, the registry of vaults, the tools and skills review |
| Per vault | `<vault>\_Harness\` | that project's lessons, resume protocol, checks, specific tools |

Rule: a lesson that would apply to a different project goes HERE; a lesson tied to one project's tools or data stays in that vault.

## The loop (end of every work chunk)
1. Record what happened in the project's run-log.
2. A failure, surprise or correction becomes a row in the right Lessons file (central or per vault): symptom, cause, fix.
3. A lesson that repeats twice gets promoted: a script, a check in an Eval Checklist, or a rule in [[Preferences]].
4. Before calling work done, run [[Eval Checklist]] plus the vault's own.
5. Keep each vault's Resume Protocol short and current so a fresh session (after /clear) restarts in minutes without the chat.

## Files
- [[Vault Registry]]: every vault, its harness and where to resume.
- [[Lessons]]: cross-project lessons.
- [[Preferences]]: how the user wants me to work.
- [[Eval Checklist]]: generic done-criteria.
- [[Tools and Skills Review]]: is each installed or saved tool/skill actually worth it.

## Limits (honest)
- Changes to Claude's own configuration (CLAUDE.md, settings, hooks, skills, MCP) can be blocked by Claude Code's auto mode. If blocked: do not work around it; write the exact change here or in the vault and ask the user to apply it.
- Global rule stays: context comes from notes, never from re-reading the chat.
