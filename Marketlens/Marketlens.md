---
tags: [project, marketlens]
type: project
status: v1 built and tested on this PC; phone/partner access not set up yet (see STATE)
repo: C:\Users\yusha\OneDrive\Desktop\Marketlens
---
# Marketlens (project node)

A side project, **not linked to INDEX or any other project**. A private web app (works on a phone) that does the market lookup built in the Web Scraping project: upload a shoe photo, get similar products and a price package. Colour: acid lime `#C6FF00` on ink black. Stack: Python FastAPI + React/Vite.

| Need | Note |
|---|---|
| Where we are, what is next | [[STATE]], [[todo]] |
| Run it | [[how-to-run]] |
| Big picture (+ `architecture.canvas`) | [[architecture]], [[data-flow]], [[decisions]] |
| Server files | [[server-main]], [[server-auth]], [[server-engine]], [[server-catalog]], [[server-history]] |
| Screens | [[client-app]], [[client-screens]], [[client-api]] |
| Every endpoint | [[api-contract]] |
| Safety | [[security]], [[tests]] |
| Partner / phone | [[tailscale-setup]] |
| Honest limits | [[limits]] |

It only **reads** the Web Scraping data (opened read-only); it never changes it.
