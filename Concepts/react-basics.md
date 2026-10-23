# React basics

- **Mental model**: UI = f(state). Never touch the DOM; change state and React re-renders.
- **JSX**: one root element, `className`, `{}` for expressions, self-closing tags. React escapes output (avoid `dangerouslySetInnerHTML`).
- **Props**: one-way, read-only. Pass callbacks down (`onToggle`, `onDelete`).
- **State**: `useState`. Never mutate, always copy (`[...prev, x]`, `map`, `filter`). Use `setX(prev => ...)` when the new value depends on the old.
- **Forms**: controlled inputs (`value` + `onChange`), `e.preventDefault()`.
- **Lists**: `key` = stable DB id, never the array index.
- **useEffect**: side effects after render. `[]` runs once, `[a, b]` re-runs when they change, no array runs every render (usually a bug). Dependencies compare by reference, so objects/arrays created in render loop. Strict Mode double-runs effects in dev, harmless.
- **Hook rules**: top level only, never inside `if`, loops, or nested functions.
- **Frontend to backend**: React never talks to Postgres. It sends HTTP + JSON to Express, Express uses Prisma to query Postgres, the response comes back the same way. The route (method + URL) is the contract. DevTools Network tab shows it all.
- **CORS errors** are fixed on Express, not React.

## Later, not now
`useRef`, `useContext` (auth user), `useReducer`, `useMemo`/`useCallback`, custom hooks (`useWorkouts()`), React Router, TanStack Query, optimistic updates, error boundaries, React Hook Form, testing.

## Planned frontend build order
Vite "Hello" -> hardcoded array with `map` -> `useState` + controlled input -> `fetch` in `useEffect` -> wire create/edit/delete one at a time.
