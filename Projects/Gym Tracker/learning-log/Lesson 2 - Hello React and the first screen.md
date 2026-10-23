# Lesson 2 - Hello React and the first screen

> Order: this lesson -> [[Lesson 3 - Making it interactive]]. Date: 2026-09-21. All lessons: [[INDEX]].

> [!warning] Historic build
> This lesson is the FIRST build (Phases 0 and 1). The files it names (`StatCard.jsx`, `WorkoutCard.jsx`) were deleted in the later redesign, and its `view`-state idea was replaced by a router ([[Lesson 3 - Making it interactive]] explains why). The ideas taught here (props, `map`, semantic HTML) are still current. True file list: [[architecture]] section 10.5.

## Phase 0: "Hello" (scaffold stripped to the minimum)
**New idea:** what the pieces of a Vite + React app are, and which two files matter. Vite is only the tool that turns JSX into plain JavaScript and serves it at http://localhost:5173. It is not a framework. You write plain React and CSS.

| File | What it does | Read it? |
|---|---|---|
| `client/index.html` | The one real HTML page. Has an empty `<div id="root">` and a `<script>` that loads `main.jsx`. | Yes, 12 lines |
| `client/src/main.jsx` | The doorway. Finds `#root` and tells React to draw `<App />` inside it. Runs once. | Yes, 10 lines |
| `client/src/App.jsx` | Our first component: a function that returns JSX. Everything we build hangs off it. | Yes, 5 lines |
| `client/src/index.css` | Global styles and the design tokens (CSS custom properties) from the first design (that section is gone; see [[architecture]] section 10 and `DESIGN.md`). | Skim |
| `client/package.json` | List of installed packages (react, react-dom, lucide-react) and the `dev`/`build` commands. | Skim |

### `App.jsx`, line by line
- `function App() {` : a component is just a JS function whose name starts with a capital letter.
- `return <h1>Hello, Gym Tracker</h1>` : JSX. Looks like HTML, but it is JavaScript. Vite converts it before the browser sees it.
- `export default App` : lets `main.jsx` import it.

### `main.jsx`, line by line
- `import { createRoot } from 'react-dom/client'` : the tool that connects React to a real page.
- `import './index.css'` : pulling the CSS in here is how it gets onto the page.
- `createRoot(document.getElementById('root')).render(...)` : "take the empty `#root` div and draw React in it".
- `<StrictMode>` : a development helper. It runs some code twice on purpose to expose bugs early. Invisible in the final app.

### Where the deleted demo went
Removed: `App.css`, `src/assets/` (logos), `public/icons.svg`, and about 110 lines of demo JSX (counter, links). Kept `public/favicon.svg`.

### Explain it back (your turn)
1. If you delete `<div id="root">` from `index.html`, what breaks and why?
2. What is the difference between `main.jsx` and `App.jsx`?
3. Why can the browser run `App.jsx` if it cannot read JSX?

### Try to break it
- Change the text in `App.jsx`, save, and watch the browser update without a refresh (that is HMR, hot module reload).
- Remove the `return` keyword and read the error.
- Rename `App` to `app` (lowercase) and see what happens.

---

## Phase 1: Home screen, hardcoded (no clicking yet)
**New ideas (in this order):** components with **props**, `.map()` to draw a list, `key`, `import`/`export` between files, mock data shaped like the API, semantic HTML.

Screen: sidebar (left) + main area. Home shows 3 stat cards and 3 recent workout cards. Nothing is clickable yet; that is Phase 2.

### Files (all under `client/src/`)
| File | Lines | Job | New idea |
|---|---|---|---|
| `mock.js` | 52 | 3 fake workouts, same shape as `GET /workouts` | data shape = API contract |
| `lib/format.js` | 8 | `formatDate("2026-09-19T12:00Z")` gives `Sat 19 Sept` | plain helper function, no React |
| `components/StatCard.jsx` | 10 | One number + a label | **props** |
| `components/WorkoutCard.jsx` | 18 | One workout: name, date, exercises, set count | props + `[...new Set(...)]` |
| `components/Sidebar.jsx` | 37 | Brand, 3 nav buttons, Start workout button | `.map()` + `key`, icons as components |
| `views/HomeView.jsx` | 33 | The Home screen: stats + list of cards | `.map()` over `workouts` |
| `App.jsx` | 16 | The shell: `<Sidebar />` and `<main>` around `<HomeView />` | passing props down |
| `index.css` | 201 | Tokens, layout (flexbox), every component's style | flexbox, custom properties |

### Read these lines first
- **Props:** `StatCard.jsx` line 1: `function StatCard({ label, value })`. The curly braces pull `label` and `value` out of the props object. Used as `<StatCard label="Workouts" value="3" />`. Change what you pass in, change what you see. One component, three cards.
- **`.map()` + `key`:** `HomeView.jsx`, `workouts.map((workout) => <li key={workout.id}>...)`. `.map` turns an array of 3 workouts into 3 `<li>` elements. `key` is React's name tag for each item so it can tell them apart when the list changes. It must be unique and stable, so we use the database `id` (never the array index).
- **Data flows down:** `App.jsx` imports `MOCK_WORKOUTS`, hands it to `HomeView` as `workouts={...}`, which hands each one to `WorkoutCard` as `workout={...}`. Data only goes down through props. Phase 4 adds the way back up.
- **Unique exercise names:** `WorkoutCard.jsx` line 4 (the `const exercises` line): `[...new Set(workout.sets.map((set) => set.exerciseName))]`. `.map` pulls the 8 exercise names, `new Set` drops duplicates, `[...]` turns it back into an array so `.join(' · ')` works.
- **Icons as components:** `Sidebar.jsx` stores `Icon: House` in an array, then draws it as `<Icon size={18} />`. React components are just values, and the capital letter is required.
- **Flexbox:** `.app { display: flex }` puts the sidebar and main side by side. `.sidebar` has a fixed width; `.content` has `flex: 1` so it takes the rest. `.btn-primary { margin-top: auto }` pushes the Start button to the bottom of the sidebar.
- **Two columns:** `.workout-list { display: flex; flex-wrap: wrap }` and each `li` is `flex: 0 0 calc(50% - gap/2)`. Third card wraps to a new row.

### Semantic HTML (why not just divs)
`<nav>`, `<main>`, `<aside>`, `<section aria-labelledby>`, `<article>`, `<time dateTime>`, `<ul>/<li>`, and real `<button>`s. Screen readers and keyboards understand these for free. `:focus-visible` gives a green outline when you Tab through the page. The active nav item has `aria-current="page"`. Icons are `aria-hidden` because the text next to them already says the same.

### Bug that taught something: dates off by one day
Mock dates like `2026-09-17T18:30:00Z` showed as **Fri 18** instead of Thu 17. The `Z` means UTC. `toLocaleDateString` converts to the browser's timezone, and in a UTC+5:30 zone 18:30Z is already 00:00 the next day. The code was right; the data was awkward. Fix: mock times at 12:00Z, which is the same calendar day almost everywhere. **Real lesson for Phase 7:** the server should store UTC and the browser shows local time. A workout logged at 11pm can land on "tomorrow" if we are careless.

### Hardcoded on purpose
The stat cards ("3", "15,538", "2") are typed in by hand. Phase 5 computes them from `workouts`. The 15,538 kg matches the mock sets (weight x reps, summed), but "2 PRs" is a placeholder since PRs need history.

### Explain it back
1. In `<StatCard label="PRs" value="2" />`, where do `label` and `value` end up inside `StatCard`?
2. Why does `workouts.map(...)` need `key={workout.id}`, and why not use the array index?
3. `HomeView` has no data of its own. Where does `workouts` come from?
4. Why does `mock.js` look exactly like the API's JSON?

### Try to break it
- In `mock.js`, delete the `id` of one workout and read the console warning about `key`.
- Add a 4th workout object and watch a 4th card appear with no other code changes.
- Change `value="3"` to `value=3` (no quotes) and read the error.
- Press Tab repeatedly and watch the focus ring move.

---
