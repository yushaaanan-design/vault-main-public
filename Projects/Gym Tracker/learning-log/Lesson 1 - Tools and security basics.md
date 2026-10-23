# Lesson 1 - Tools and security basics

> Date: 2026-09-20

## Learned
- Claude Code plugins install with `/plugin marketplace add <repo>` then `/plugin install <plugin>@<marketplace-name>`. The marketplace name comes from its `marketplace.json`, not the repo name (`addyosmani/agent-skills` registers as `addy-agent-skills`).
- `/plugin` only runs in the local Claude Code prompt, not over Remote Control.
- Env vars (`ANTHROPIC_BASE_URL` etc.) are read once at startup; restart Claude Code after `setx`.
- Never paste secret keys into chat. Anything in a transcript is burned; rotate it.
- Local gateways can default to `0.0.0.0`. Check what a server binds to before trusting it.
- An Obsidian vault is just a folder of markdown files.

## Questions
-
