---
tags: [gym-tracker, research, features]
date: 2026-09-21
---
# Feature research: what real gym apps ship in 2026, and what we take

> [!note] How reliable this is
> Read from the apps' own feature pages plus 2026 comparison blogs (links at the bottom). It is marketing and review text, not hands-on testing of each app. Treat feature names as "what they advertise". Motion and layout references from motion.dev, madewithgsap and Awwwards are still to be captured in Step 1 of the plan ([[motion-system]]), not researched here.
> Decisions that come out of this note live in [[architecture]] section 11.

## Why this was done
The user will use the app personally with a real database, and **other people will use it too**. The first architecture assumed one implicit user and only the features the user had named. This note widens that using what the market leaders do.

## What each app is known for
| App | Known for | Worth taking | Not taking |
|---|---|---|---|
| **Hevy** (best overall, free tier + Pro about $9.99/mo) | Logging speed, social feed, routines and folders, supersets, set types (warm-up, drop, failure), muscle heatmap, weekly consistency streak, Year in Review, monthly report, plate and warm-up calculators, RPE, body measurements, progress photos, ChatGPT plugin | Consistency calendar and weekly streak rule, Year in Review, set types, supersets, routines, warm-up calculator, muscle distribution | Social feed, leaderboards, discovery feed, Strava, home-screen widgets and Live Activity (native only) |
| **Strong** (minimalist, about $4.99/mo) | Fastest logging, plate calculator, warm-up helper, CSV export, Apple Health, body measurements | Speed as a rule ("logging never waits"), CSV export | Nothing to reject; it is already our table stakes |
| **Fitbod** | Adaptive AI-generated workouts, recovery-aware plans | Deload and stall detection later | AI plan generator (needs data and coaching logic we do not have) |
| **Liftosaur** (open source) | Scriptable progression logic: programs as code | Idea of programs as data (5/3/1, nSuns, GZCLP) | A scripting language for users |
| **Alpha Progression** | Periodisation, deloads, plateau and overtraining signals | Deload / stall detection | Full periodisation engine |
| **PrimedLifter, Hardy, RepCheck** (powerlifting) | RPE per set, notes and video links per set, e1RM charts, weekly sets per block, **DOTS / Wilks / IPF GL scoring**, **9-attempt meet planner**, built-in 5/3/1, nSuns, GZCLP with percentage weights | RPE, DOTS/Wilks/IPF GL, attempt planner, percentage programs | Video links per set (file storage) |
| **RPE tools** (Fitness Volt, rpe.training) | RPE to %1RM table, RPE accuracy grade, RPE drift, program translator | RPE-adjusted e1RM | Grading and translators |
| **WHOOP, Oura, Eight Sleep** | Readiness scores from HRV and sleep | A manual 1 to 5 "readiness" check-in, maybe later | Wearable integration (needs devices and APIs) |
| **Streakout, Fitness Story** (small apps) | Calendar heatmap of active days, monthly and yearly views, streak highlighting, GitHub-style contribution graph of all history | The yearly heatmap | Their colour coding by category (breaks our one-hue rule) |
| **Offline-first trackers** (many open source) | Every set saved locally first, client-generated UUID per session so saves are idempotent, a normalised sets table for analytics, JSON for the write path, optional cloud sync, CSV import and export | Client-generated ids, draft that survives refresh, sets in their own indexed table (we already do this), export | Full offline sync engine (later, only if the user wants phone use) |

## Streaks and the yearly "blobs" (what the user asked for)
- **Hevy's rule:** the streak counts **consecutive weeks with at least one logged session**. If you miss a week and log again, the week is added to your previous streak rather than starting from zero; a longer inactive period resets to week one. Calendar view has month, full year and multi-year, tap a day to see the workout, share button.
- **Contribution-graph style** (GitHub-like, used by Fitness Story and many habit apps): 53 columns by 7 rows, one cell per day, intensity levels, month labels, year switcher. Best practice found: one takeaway per chart, no competing colour scales, instant switching between day, week, month and year.
- **Our version (decision in architecture section 11.3):** circles ("blobs") sized by that day's volume on a chalk-grey ramp, so no new hue is introduced; PR days get a small referee-light dot; today gets a ring; hover shows the workout. It enters with a ripple animation from the left.

## Things the market does that we deliberately do NOT copy
Social feed, leaderboards, discovery, coach assignment, AI trainer, wearable readiness, progress photos, Strava, native widgets, nutrition. Each either needs moderation and privacy work we cannot do yet, hardware, file storage, or a native app. Revisit after auth exists.

## What this research changed
1. **Multi-user is real**, so the schema needs a `User` table and a `userId` on every user-owned row **before any real data goes in** (migrating later is painful). Authentication is required before anyone else touches the app.
2. **New features** were added in tiers: foundation, consistency and insight, powerlifting, multi-user. See [[architecture]] section 11 and the checklist in [[todo]].
3. The old "Not taken" line in [[design-research]] (muscle heat maps) is reversed: muscle-group volume is now planned.

## Sources
- [Best Workout Tracker Apps for 2026 (Fitbod)](https://fitbod.me/blog/best-workout-tracker-apps-for-2026/)
- [Best Workout Tracker Apps in 2026, honest comparison (Stronger)](https://www.strongermobileapp.com/blog/best-workout-tracker-apps)
- [Best Workout Tracking App in 2026, 5 options (RepReturn)](https://repreturn.com/best-workout-tracking-app/)
- [Hevy vs Strong vs Fitbod vs Jefit (SensAI)](https://www.sensai.fit/blog/hevy-vs-strong-vs-fitbod-vs-jefit)
- [Hevy feature list](https://www.hevyapp.com/features/)
- [Hevy workout consistency and streak](https://www.hevyapp.com/features/gym-consistency/)
- [Hevy help centre: features guide](https://help.hevyapp.com/hc/en-us/articles/33106320824727-Everything-You-Need-to-Know-About-the-Hevy-App-2025-Features-Guide)
- [Hevy social features](https://www.hevyapp.com/features/social-features/)
- [Streakout: Workout Stats (App Store)](https://apps.apple.com/us/app/streakout-workout-stats/id6758457318)
- [Fitness Story (App Store)](https://apps.apple.com/us/app/fitness-story/id6748090363)
- [PrimedLifter](https://www.primedlifter.app/) · [Hardy](https://hardy.app/) · [RepCheck](https://repcheckapp.com/)
- [Powerlifting calculator: DOTS, IPF GL, Wilks (RPE Training)](https://rpetraining.com/powerlifting)
- [RPE Training tools](https://rpe.training/)
- [Offline-first sync design issue (Workout-Tracker #203)](https://github.com/n1k0blc/Workout-Tracker/issues/203)
- [Offline-first PWA example (naufalfalah/workout-log)](https://github.com/naufalfalah/workout-log)
- [2026 digital fitness ecosystem report (Feed.fm)](https://www.feed.fm/2026-digital-fitness-ecosystem-report)
- [7 Best Gym Apps in 2026 (Alpha Progression)](https://alphaprogression.com/en/blog/best-gym-apps)
