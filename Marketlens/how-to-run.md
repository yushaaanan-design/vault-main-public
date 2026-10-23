---
up: "[[Marketlens]]"
tags: [marketlens]
---
# How to run it
Where we are: [[STATE]]. Big picture: [[architecture]].

1. Terminal in `server/`: `python -m uvicorn main:app --host 127.0.0.1 --port 8000` ([[server-main]]). Wait about 10 s while CLIP loads ([[server-engine]]).
2. Open `http://127.0.0.1:8000` and log in with the access code ([[server-auth]]).
3. Editing the screens: terminal in `client/`, `npm run dev`, open `http://localhost:5173` ([[client-app]]). `npm run build` before the server shows your edits.
4. Check it still works: `python -m pytest tests -q` in `server/` ([[tests]]).
5. For your partner: [[tailscale-setup]].
