# Lesson 4 - Router, Plate Ladder redesign and backend

> Order: [[Lesson 3 - Making it interactive]] <- this lesson -> [[Lesson 5 - Motion library]]. Date: 2026-09-21. All lessons: [[INDEX]].

> [!tip] This is the lesson with the big "what to learn" list
> Section **A** = things to learn now (26 concepts, each with the file where you meet it). **B** = backend to learn. **C** = design ideas to recognise. **D** = what you do NOT need to learn. **E** = file map of the redesign. **F** = explain-it-back questions. **G** = try-to-break-it exercises. Motion library learn-list: [[Lesson 5 - Motion library]].

You said: "anything extra that I have to learn, list it in the learning log." This is that list, ordered by how soon you will trip over it.

### A. New things you must learn (each one is used in the code now)

| # | Concept | Where to read it | The one-sentence idea |
|---|---|---|---|
| 1 | **Port vs path** | `lib/paths.js` | The port (`5173`) is the door on your computer and never changes; the path (`/history`) is which screen you are on. |
| 2 | **React Router** (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useNavigate`, `useParams`) | `main.jsx`, `App.jsx`, `Sidebar.jsx` | It keeps the address bar in sync with the screen, so Back, refresh and bookmarks work. `:id` in a path is a placeholder; `useParams()` returns it as TEXT. |
| 3 | **useEffect + cleanup** | `lib/useNow.js` | Code that must run OUTSIDE drawing (a timer) goes in an effect; the function it returns undoes it, or timers pile up. |
| 4 | **Custom hooks** | `lib/useNow.js` | A function whose name starts with `use` that components call to share stateful logic. |
| 5 | **Timestamps for timers** | `components/RestTimer.jsx` | Store the END time, not "seconds left", so a sleeping tab cannot make the clock drift. |
| 6 | **Hand-drawn SVG** | `Segments.jsx`, `PlateBar.jsx`, `LineChart.jsx`, `BarChart.jsx` | `viewBox` is your own coordinate grid; convert each value to x and y; SVG's y counts DOWN so you flip it. `<title>` gives a hover tooltip. |
| 7 | **Scaling data to pixels** | `LineChart.jsx` (`x()` and `y()`) | `(value - min) / (max - min)` gives 0 to 1; multiply by the drawing size. |
| 8 | **Self-hosted fonts** | `main.jsx` imports, `index.css` `--font` | `@fontsource/*` ships the font files; each import registers a weight. No request to Google at runtime. |
| 9 | **CSS variables as design tokens** | `index.css` section 1, `PlateBar.jsx` | Every colour is named once (`--plate-25`). JavaScript can build the name (`var(--plate-${weight})`, see `PlateBar.jsx`) so a number picks its colour. Change one line, the whole app changes. |
| 10 | **CSS animation** | `index.css` `@keyframes ignite`, `.lights` | `@keyframes` describes the change, `animation-delay` staggers three lights, `both` keeps the start state during the delay. |
| 11 | **prefers-reduced-motion** | section 2 of `index.css` | Users who get motion sick turn animation off in their OS; the CSS must obey. |
| 12 | **Animate transform, not layout** | `.progress-fill` | Animating `width` re-lays-out the page every frame; `transform: scaleX()` does not. impeccable's detector caught this. |
| 13 | **position: sticky** | `.workout-bar`, `.sidebar` | Scrolls with the page until it reaches an edge, then stays. Negative margins cancel a parent's padding. |
| 14 | **Themed browser surfaces** | section 3 of `index.css` | `::selection`, `caret-color`, `scrollbar-color`, `::placeholder`, `:focus-visible` all ship with browser defaults unless you style them. |
| 15 | **ARIA for widgets** | `aria-pressed`, `aria-current`, `role="progressbar"`, `role="status"`, `role="img"` with `aria-label` | Tells screen readers what a control IS and its state. Prefer real HTML (`button`, `nav`, `table`) first. |
| 16 | **Tabular figures** | `font-variant-numeric: tabular-nums` | Every digit gets the same width so numbers line up in columns. |
| 17 | **JS: Map, Set, reduce with an accumulator object** | `HistoryView.jsx`, `PlateBar.jsx`, `calc.js` | `Map` keeps insertion order; `reduce` can carry a whole object, not just a number. |
| 18 | **JS: dates** | `calc.js` `startOfWeek`, `WeekStrip.jsx` | `getDay()` (Sunday = 0), `setDate(getDate() - n)`, `toDateString()` as a same-day key, `toLocaleDateString('en-GB', {...})`. |
| 19 | **JS: small tools** | across `lib/` | `padStart`, `Number.isInteger`, `?.` and `??`, `Array.from({ length: n }, fn)`, closures. |
| 20 | **node:test** | `lib/*.test.js`, `npm test` | Node has a test runner built in; `assert.deepEqual` compares arrays and objects. |
| 21 | **Generating mock data** | `mock.js` `buildHistory()` | A loop can build 8 weeks of realistic data. It includes two stall weeks on purpose: if every session is a PR, a PR mark tells you nothing. |
| 22 | **One hue, one meaning** | `index.css` top comment, `LineChart.jsx` header | Colour is a code. Plates own every hue, so lifts are told apart by name and by line style (solid, dashed, dotted). A red squat line would falsely say "25 kg plate". The finish review caught this contradiction. |
| 23 | **`table-layout: fixed` + `<colgroup>`** | `ExerciseBlock.jsx`, `index.css` `.sets` | Auto-sized tables give every table different column widths; fixing them makes columns line up across tables. |
| 24 | **Gating an animation on user action** | `SetRow.jsx` `justTicked` | Components are re-created when you leave and return. State that remembers "the user just did this" stops an animation replaying on every visit. |
| 25 | **`preserveAspectRatio`** | `PlateBar.jsx` | Controls how an SVG fits its box: `none` distorts (it turned chart dots into ovals once), `xMinYMid meet` keeps proportions and pins left. |
| 26 | **Absolute positioning inside a sticky parent** | `.progress`, `.workout-bar` | A positioned parent is the reference for its `position: absolute` child, so the progress bar can lie along the bar's bottom edge for free. |

### B. Backend things you must learn (server/, not wired to the frontend yet)

| Concept | Where |
|---|---|
| Express as a **pipeline** (`app.use`, `next()`, the error handler goes last) | `server/src/server.js` |
| **CORS**: browsers block cross-origin reads unless the server names the allowed origin | `server.js` |
| **Never trust the client**: validate on the server | `server/src/validate.js` |
| **Prisma schema**, relations, `@unique`, `@@index`, `onDelete: Cascade` | `server/prisma/schema.prisma` |
| **Migrations** (`npm run migrate`) and **seeding** (`upsert`) | `prisma/seed.js` |
| **Transactions**: a nested `create` saves a workout and its sets together or not at all | `routes/workouts.js` |
| **Prisma error codes** `P2002` (unique rule broken), `P2025` (record not found) | `routes/*.js` |
| **HTTP status codes** 200, 201, 204, 400, 404, 409, 500 and what each promises | every route |
| **.env files**: secrets and per-machine settings, listed in `.gitignore`, never pasted into chat | `server/.env.example` |
| **Bind to 127.0.0.1** so the API is not open to the whole network | `server.js` |
| **res.ok**, and why `fetch` does not throw on 404 or 500 | `client/src/api.js` |
| `node --watch` (instead of nodemon) and `node --env-file` | `server/package.json` |

### C. Design ideas you met (recognise them, no need to memorise)
Design tokens, a 4px spacing scale, WCAG contrast (4.5:1 for text), hairline rules, one authored motion moment, "operate mode" (a tool should disappear into the task), and what impeccable's "AI-slop" detector flags. The direction contract is in `.impeccable/surfaces/client-src.md`; the product record is `PRODUCT.md`.

### D. Deliberately NOT needed (do not spend time here)
- **TypeScript.** Still out.
- **Tailwind or any CSS framework.** The whole design system is one plain CSS file.
- **CSS Grid.** Used only as a centring trick (`place-items: center` on `.check` and `.icon-btn`). Layout is flexbox.
- **Chart libraries** (D3, Recharts, Chart.js). Each chart is about 100 lines of SVG, on purpose, so you learn what a chart is.
- **GSAP.** Not needed. (Earlier this said "no animation library"; that changed on 2026-09-21: the `motion` library is now planned, see [[Lesson 5 - Motion library]].)
- **State libraries** (Redux, Zustand, Context, TanStack Query). All state is `useState` in `App.jsx`.
- **useMemo, useCallback, useRef, useContext.** Not used anywhere. Do not learn them yet.
- **Component libraries** (shadcn, MUI), **Next.js**, **React Testing Library, Vitest, Jest**.
- **Sound, Web Audio, PWA, service workers, WebSockets.**
- **Docker, CI/CD, deployment.**
- **Installed skills that do not apply:** `img2threejs`, and the Tailwind/GSAP sub-skills of `taste-skill`.

### E. Where the redesign lives (file map)
| File | Job |
|---|---|
| `lib/plates.js` | `platesFor(140)` gives `[25, 25, 10]`; plate clubs (60, 100, 140 kg...) |
| `lib/calc.js` (additions) | `liftOf`, `weeklyVolumes`, `suggestNext`, `recordSets` |
| `lib/useNow.js` | the clock hook |
| `components/Segments.jsx` | seven-segment numerals, unlit cells drawn as ghosts |
| `components/PlateBar.jsx` | a weight as a loaded barbell in plate colours |
| `components/PRBadge.jsx` | three referee lights |
| `components/RestTimer.jsx` | rest countdown that starts when you tick a set |
| `components/LiftLadder.jsx`, `WeekStrip.jsx`, `WorkoutRow.jsx` | the Today screen |
| `components/LineChart.jsx`, `BarChart.jsx` | Progress screen charts |
| `views/ProgressView.jsx` | new screen |
| `mock.js` | now generates 8 weeks and 23 workouts |
| `index.css` | the whole design system, in 14 numbered sections |

### F. Explain it back (pick any six)
1. What is the difference between the port and the path? Which one changes when you click History?
2. Why does `useNow` return a function from `useEffect`? What breaks without it?
3. Why does the rest timer store `endsAt` instead of a counter?
4. In `LineChart`, why is the y formula `H - M.b - ...` and not just the value?
5. How does `PlateBar` pick the colour of a 15 kg plate? Where is that colour defined, and what happens if you change it there?
6. Why does `platesFor(140)` give `[25, 25, 10]` and not `[25, 20, 15]`? Are both valid?
7. Why did I stop `/active` from redirecting when there is no draft? (See [[Decision - Router and remodel]].)
8. What does `aria-pressed` do, and why is the tick's look driven by it in CSS?
9. Which of the three lights is delayed, and where is that written?

### G. Try to break it
- Press Back after finishing a workout. Then type `/workouts/abc` in the address bar.
- Tick a set, watch the rest timer, switch to History, come back. Does it keep counting?
- Set the rest to 1:00, tick a set, wait for "Rest over. Go.", then press Skip.
- In `plates.js` change the `PLATES` order and read which tests fail.
- Change `--plate-25` in `index.css` and see where it changes (plates only, by design). Then find the one place you would edit to make the whole app sky-blue, and why that is a bad idea.
- Turn on "reduce motion" in your OS and watch the PR lights.
- In `Segments.jsx` change one digit's recipe and look at the ghost cells.
