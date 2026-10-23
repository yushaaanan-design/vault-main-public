# Docker connector gateway: options (note only, nothing installed)

Goal: connectors (Gmail, GitHub, Instagram, YouTube...) without Composio's 100K calls/month cap.

| | Activepieces | n8n (self-hosted) |
|---|---|---|
| Licence | MIT (community edition) | Sustainable Use License (free for own use, not for reselling) |
| Fit | Built around "pieces" (connectors), also exposes them as MCP tools | Workflow engine, huge node library; you already run it on the Hostinger VPS (see Projects/N8N) |
| Docker needed? | Yes (compose: app, Postgres, Redis) | Already running on the VPS, so no new Docker on the PC |
| Cost | $0 self-hosted | $0 (VPS already paid) |

**Recommendation:** use the n8n you already host. Jarvis calls an n8n webhook per connector action (token header), n8n holds the credentials. No Docker to learn now; Activepieces only if n8n's connectors fall short. Docker on the PC (Docker Desktop + WSL2) is only needed if a gateway must run locally.

**Needed if we go this way:** (1) one n8n workflow per action (e.g. "send mail", "list repos") behind a webhook with a secret header; (2) a `call_n8n(action, args)` tool in Jarvis tagged `confirm`; (3) credentials stay in n8n, never in Jarvis. Security: webhook URL + secret never in chat; a fixed list of actions, not free-form.
**Status:** not started. Decision pending.
