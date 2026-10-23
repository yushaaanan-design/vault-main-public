---
up: "[[N8N]]"
tags: [n8n, context]
---
# Context — N8N (innate vs. learning)

Purpose: separate what the user already knows and can lean on, from what n8n actually requires learning fresh. Update this as workflows get built — move things from "learning" to "innate" once they stop being new.

## Innate (already known, transfers directly)
- **HTTP/REST fundamentals** — methods, status codes, headers, JSON bodies. Directly reusable for the HTTP Request node and any webhook trigger.
- **APIs and webhooks conceptually** — already built Express routes and consumed APIs, so "a URL that triggers code when called" is not a new idea, just a new tool doing it visually instead of in Express.
- **JavaScript/ES6+** — directly usable inside the Code node when a built-in node can't do something.
- **Data modeling instincts (from Prisma/Postgres)** — understanding of rows/fields/relations carries over to how n8n "items" flow between nodes.
- **Reading documentation / debugging methodically** — general engineering skill, not n8n-specific, but the biggest asset when a node behaves unexpectedly.

## Learning (new to this tool, don't assume prior knowledge)
- **Node-based / visual workflow paradigm** — thinking in a left-to-right graph of nodes instead of top-to-bottom code. No prior exposure.
- **n8n expression syntax** — `{{ $json.field }}`, `{{ $('Node Name').item.json.field }}`, and the difference between item-level and workflow-level context.
- **The "items" data model** — every node passes an array of `{ json, binary }` objects; understanding how branching/merging nodes split and recombine that array.
- **Trigger vs. regular node distinction** — every workflow needs exactly one trigger; that's an n8n-specific rule, not a general programming one.
- **Credentials system** — stored per-service, reused across workflows, separate from the workflow JSON itself (matters for not leaking secrets when exporting/sharing a workflow).
- **Self-hosting n8n on Hostinger** — deployment/runtime specifics (env vars, webhook URL configuration, persistence of workflow data) once past the course and into a real instance.
- **Error handling model** — the separate "Error Trigger workflow" pattern is unlike a try/catch block; it's its own workflow wired to catch failures from others.
- **CLI tools driven via Execute Command node** — n8n shelling out to real command-line programs on the VPS, same as running them by hand:
  - **yt-dlp** — downloads video/audio from a URL (originally YouTube-specific, now supports hundreds of sites including Instagram). Turns "a link" into an actual video file on disk.
  - **ffmpeg** — the standard tool for cutting/converting audio and video. Used twice in the reel pipeline: extract the audio track (for Whisper transcription) and extract still frames (for the vision model to "see" the video). Purely mechanical extraction, no understanding of content.
  - **whisper.cpp** — self-hosted speech-to-text (an implementation of OpenAI's Whisper model that runs locally instead of calling an API). Chosen over the Whisper API for cost, at the price of more setup.

## Where this is going
Course (n8n's own) is the current learning source. Vault will grow to: `nodes-reference.md` (already started — node cheat sheet), and workflow-specific notes once real builds start (one note per workflow, decisions + gotchas, same pattern as the other projects in this vault).
