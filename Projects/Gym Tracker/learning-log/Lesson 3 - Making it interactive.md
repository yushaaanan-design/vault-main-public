# Lesson 3 - Making it interactive

> Order: [[Lesson 2 - Hello React and the first screen]] <- this lesson -> [[Lesson 4 - Router, Plate Ladder redesign and backend]]. Date: 2026-09-21. All lessons: [[INDEX]].

> [!warning] Read the banners
> This lesson covers Phases 2 to 6 of the first build. **Phase 2 (navigation with `useState`) is superseded by React Router**, which is taught in [[Lesson 4 - Router, Plate Ladder redesign and backend]]. Phases 3 to 6 (controlled inputs, lifting state, pure functions, search) are still current. The "All files" table below is generated from disk and was checked 2026-09-21; the true file list is [[architecture]] section 10.5.

## Phases 2 to 6: the rest of the frontend (built in one pass at the user's request)
Everything from [[architecture]] section 6 up to Phase 6 is now built. Phase 1's files were upgraded (Sidebar works, Home computes its numbers). **Data lives only in memory: refreshing the page resets everything.** That is expected until the backend exists.

### Map: which file teaches which idea
| Phase | Idea | Read this first |
|---|---|---|
| 2 Navigation (superseded by React Router) | `useState`, event handlers, conditional render | Historic. Today: `App.jsx` `<Routes>`, `Sidebar.jsx` `NavLink` |
| 3 Forms | Controlled inputs, immutable updates | `SetRow.jsx` (`value` + `onChange`), `lib/active.js` (`withUpdatedSet`) |
| 4 Lifting state up | State in the parent, callbacks up, derived values | `App.jsx` (`active`, `actions`, `finishWorkout`), `ExerciseBlock.jsx` |
| 5 Pure functions | e1RM, PRs, volume, all computed not stored | `lib/calc.js`, `lib/calc.test.js` |
| 6 Search | `.filter()`, derived state | `ExercisesView.jsx`, `ExercisePicker.jsx`, `filterByName` in `calc.js` |

### All files (client/src), counts checked against disk
| File | Lines | Job |
|---|---|---|
| `App.jsx` | 154 | Owns ALL state: `exercises`, `workouts`, `active`, `restSeconds`, `restEndsAt`. Declares the 7 routes. |
| `main.jsx` | 36 | Imports fonts and `index.css`, wraps `<App />` in `BrowserRouter`. |
| `api.js` | 52 | Bridge to the Express API. Written, **not imported anywhere yet**. |
| `mock.js` | 69 | Generates 12 exercises and 8 weeks / 23 workouts, API-shaped, with two stall weeks. |
| `index.css` | 434 | The whole design system in 14 numbered sections. |
| `lib/calc.js` | 191 | Pure math: `e1rm`, `findPRs`, `livePRs`, `previousSets`, `weeklyVolumes`, `suggestNext`, `recordSets`, `liftOf`, and more. |
| `lib/calc.test.js` | 42 | Tests for calc.js. Run `npm test` in `client/` (Node built-in runner). |
| `lib/plates.js` | 33 | `platesFor`, plate clubs, `clubWeight`, `loadable`. |
| `lib/plates.test.js` | 45 | Tests for plates.js. |
| `lib/active.js` | 113 | Pure helpers that return a NEW `active` draft (`withSet`, `withUpdatedSet`, `toWorkout`...). |
| `lib/format.js` | 20 | `formatDate`, `formatKg`. |
| `lib/paths.js` | 15 | One place that names every URL. |
| `lib/useNow.js` | 21 | Custom hook: a clock that re-renders once a second (setInterval + cleanup). |
| `components/Sidebar.jsx` | 57 | Four NavLinks plus Start/Resume. |
| `components/Segments.jsx` | 72 | Seven-segment numerals with ghost cells. |
| `components/PlateBar.jsx` | 45 | A weight drawn as a loaded barbell in plate colours. |
| `components/PRBadge.jsx` | 17 | Three referee lights. |
| `components/RestTimer.jsx` | 43 | Rest countdown started by ticking a set. |
| `components/LiftLadder.jsx` | 63 | The big-three ladder on Today. |
| `components/WeekStrip.jsx` | 27 | Last 7 days. |
| `components/WorkoutRow.jsx` | 33 | One session row (History and Today). |
| `components/ExerciseRow.jsx` | 23 | One row in the Library. |
| `components/LineChart.jsx` | 86 | Hand-drawn SVG e1RM chart. |
| `components/BarChart.jsx` | 47 | Hand-drawn SVG weekly volume chart. |
| `components/SetRow.jsx` | 97 | One set: weight, reps, tick, plates, PR lights. |
| `components/ExerciseBlock.jsx` | 64 | One exercise: title, table of SetRows, Add set. |
| `components/ExercisePicker.jsx` | 60 | Search and add an exercise to the workout. |
| `views/HomeView.jsx` | 67 | Today. |
| `views/ProgressView.jsx` | 71 | Progress charts and records. |
| `views/HistoryView.jsx` | 48 | Sessions grouped by month. |
| `views/WorkoutDetailView.jsx` | 72 | One finished workout. |
| `views/ExercisesView.jsx` | 69 | Library: search and add custom. |
| `views/ExerciseDetailView.jsx` | 87 | One exercise: readout, bar, chart, sessions. |
| `views/ActiveWorkoutView.jsx` | 96 | The live workout: sticky bar, blocks, rest timer. |

**7 screens** (Today, Progress, History, Workout, Library, Exercise, Active). Deleted since Phase 1: `StatCard.jsx`, `WorkoutCard.jsx`, `Sparkline.jsx`.

### Phase 2: navigation without a router (SUPERSEDED)
> [!warning] Superseded 2026-09-21
> This is how navigation worked in the FIRST build and it is kept only as a lesson in `useState` and conditional rendering. The app now uses React Router with real URLs: the Back button, refresh and bookmarks all work. Do not copy this pattern. Current version: [[Lesson 4 - Router, Plate Ladder redesign and backend]] section A item 2 and [[Decision - Router and remodel]].

`const [view, setView] = useState({ name: 'home' })`. `useState` returns the current value and a function to change it. **Calling `setView` makes React run `App` again with the new value.** That re-run is the whole trick behind every click that changes the screen.
`renderScreen()` is a `switch` on `view.name`: conditional rendering. The Sidebar does not know about screens; it just calls `onNavigate('history')`. Events go UP, data goes DOWN.
With no router there was no Back button and a refresh returned to Home. That was the bug the user found, and it is why the router was added.

### Phase 3: controlled inputs
`<input value={set.weight} onChange={(e) => edit({ weight: e.target.value })} />`. React owns the value: what you see is always what is in state. Typing calls `onChange`, which updates state, which re-draws the input. If you remove `onChange`, the box refuses to type.
Inputs give **strings**, so weight/reps stay strings in state and become numbers only in `toWorkout`.
**Immutable updates:** `{ ...set, ...patch }` and `.map` / `.filter` build new objects. React compares old vs new; if you change the old one in place it thinks nothing happened and does not redraw.

### Phase 4: lifting state up
`active` (the workout being logged) lives in `App`, not in `SetRow`, because several places need it: the Sidebar says "Resume workout", `ActiveWorkoutView` draws it, `Finish` turns it into a saved workout.
The path of one tick: `SetRow` calls `onChange(patch)` -> `ExerciseBlock` turns it into `actions.updateSet(...)` -> `App` runs `setActive((a) => withUpdatedSet(a, ...))`. The `(a) => ...` form gives you the latest state, which is safest when the new value depends on the old one.
`finishWorkout` builds an API-shaped workout with `toWorkout`, puts it at the front of `workouts`, and clears `active`. Later this becomes `POST /workouts`. Only done sets are saved.
**Ghost text:** the `Previous` column and the greyed placeholders show last session. Leave the boxes empty and press the tick: `SetRow.toggleDone` uses the placeholder values.
`+ Add set` copies the previous set's weight and reps.

### Phase 5: calculations, never stored
`e1rm = weight * (1 + reps / 30)` (Epley). `findPRs` sorts workouts oldest-first and walks every set, remembering the best e1RM per exercise; a set is a PR only if it beats an earlier one (the first time you do a lift is not a PR). Home's numbers, the PR badges and the Exercise page all come from `workouts` every render. Edit or delete an old set and every number fixes itself.
`livePRs` uses the same rule while you are logging, so the badge you see live matches what gets saved.
"Last 7 days" (not "this week") is used because the mock data is from mid-September. It goes stale when the real date moves on; that is fine for mock data.
`npm test` runs `calc.test.js`. These are the only tests, because this is the one place where a wrong answer looks plausible.

### Phase 6: search
`filterByName(exercises, query)` is a plain function; the screen calls it during render, so the list is always in sync with the box. No extra state for "filtered list".

### Bugs and lessons from this build
- **Sorting state in place.** `filterByName(...)` returns the original array when the query is empty, so `.sort()` on it would have reordered the state array itself. Fixed with `[...array].sort(...)`. Rule: `.sort()`, `.reverse()`, `.push()`, `.splice()` change the array they are called on. Copy first.
- **`key` on `SetRow`.** Uses a `crypto.randomUUID()` made when the set is created, not the index, so removing set 2 does not confuse React about which row is which.
- **A button inside a card.** `WorkoutCard` needs to be clickable, but headings cannot sit inside a `<button>`. Instead the title is a `<button>` inside the `<h3>`, and CSS (`.card-link::after { position: absolute; inset: 0 }`) stretches it over the whole card.
- **Test bugs, not app bugs:** I expected 3 Bench Press history rows but the mock data has 2; and Tab after "Start workout" lands on an input, not a button. Wrong expectations, right app.

### Verified (all passing)
Lint clean. `npm test`: 5 of 5. Production build OK. A scripted real-browser run: **37 checks, 0 failures, 0 console errors or warnings** (every screen, search, add custom exercise, duplicate and blank rejection, start workout, ghost-value tick, Enter to confirm, add set copies, live PR, invalid reps rejected, remove set, picker disables added exercise, Resume keeps the draft, finish, saved workout opens with PR, Home updates, discard).

### Not built (on purpose)
Rest timer and an elapsed-time clock (need `useEffect` + `setInterval`, so later), RPE input, warm-up sets, month grouping in History, edit/delete a saved workout (Phase 9 with the backend), saving across refresh (backend), mobile layout. See [[Decision - Frontend defaults]].

### Explain it back (pick any, in your own words)
1. What happens, step by step, between clicking "History" in the sidebar and the History screen appearing?
2. In `SetRow`, why does `<input value={set.weight} />` also need `onChange`?
3. Why is `active` stored in `App` and not inside `SetRow`?
4. Why does `withUpdatedSet` return `{ ...active, ... }` instead of just changing `active` directly?
5. `findPRs` is not stored anywhere. Why is that better than saving "isPR" on each set?
6. Why is the first time you do a lift never counted as a PR?
7. What does `[...filterByName(exercises, query)].sort(...)` protect against?
8. Which parts of this app will change when the backend exists, and which will not?

### Try to break it
- Type `-5` or `abc` in a reps box and press the tick. Then try `1001` kg.
- Add the same exercise twice; add "bench press" (lowercase) as a custom exercise.
- Start a workout, leave to History, come back via Resume. Refresh the page and see what is lost.
- Finish a workout with no name. Finish with only some sets ticked.
- In `calc.js` change `value > soFar` to `value >= soFar` and run `npm test`. Read the failure.
- Remove the `[...]` in `ExercisesView` and watch whether the library list changes order.
