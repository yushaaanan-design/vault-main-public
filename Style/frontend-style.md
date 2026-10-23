---
tags: [style, frontend]
---
# Frontend style

Cross-project conventions. Project-specific choices live in each project's own folder.

## Stack defaults
- React + Vite, JavaScript. TypeScript later, once React feels comfortable.
- Plain CSS with flexbox (`display:flex`, `justify-content`, `align-items`, `gap`, `flex-direction`). No CSS framework by default.
- Icons: a library (Lucide), not photos.
- Vite over Next.js when the backend is a separate Express server; Next blurs that split.

## Structure (small apps)
```
client/src/
  main.jsx      mounts <App />
  App.jsx       state, handlers, layout
  <Component>.jsx  one focused component each
  api.js        all fetch calls behind a request() wrapper
```

## Patterns
- `request()` wrapper checks `res.ok` (fetch doesn't throw on 4xx/5xx) and handles `204` (no body).
- Manual `loading / error / data` state first; adopt TanStack Query later, after seeing what it replaces.
- Server-confirmed updates first (UI updates after the server responds); optimistic updates later.
- Lists: `key` = stable DB id, never the array index.
- State: never mutate, always copy (`[...prev, x]`, `map`, `filter`); `setX(prev => ...)` when new depends on old.
- Controlled inputs (`value` + `onChange`), `e.preventDefault()` on forms.
- Hooks at top level only. Avoid `dangerouslySetInnerHTML`.
- API base URL from an env var (`VITE_API_URL`), not hardcoded, once deploying.

See also [[backend-style]], [[working-style]].
