---
up: "[[Gym Tracker]]"
tags: [project, gym-tracker, vision, plan]
---
# Gym Tracker Vision: the vision part of Gym Tracker (decided 2026-10-05)

**One project, not two (user):** Gym Tracker becomes **Gym Tracker Vision**: the workout tracker plus a vision model that watches your lifts. The folder keeps the name `Gym Tracker` (renaming it would break links, paths and the colour setup); the display name is Gym Tracker Vision (alias on the hub note).

## What it must do (user: "bar path, progress over time, everything")
1. **Bar path:** track the barbell in each rep, draw the path, bar speed, sideways drift.
2. **Form:** joint angles, depth, back angle, knee travel, tempo, rep counting, with plain feedback on the video.
3. **Progress over time:** weight, reps, estimated 1RM, PRs, trends (what Gym Tracker already does), plus bar-speed and form trends per exercise, per session.
4. **Your own change over time:** you record, change your form, and compare before and after on the same lift.

## How you use it (user): the phone
You film on your phone in the gym. Two routes (not yet tested):
- **A (build first):** the phone page uploads the video to the PC over your private Tailscale network (the same way the Ares phone page works), a Python worker analyses it on the PC (6 GB GPU), the result and the annotated video appear in the app. Videos stay on your PC.
- **B (later):** run the pose part directly on the phone in the browser (MediaPipe has a web version), so a quick form check needs no upload. Bar detection on-phone is harder.

## Phases (estimates are mine, part-time, unverified)
| Phase | What | Training | Time |
|---|---|---|---|
| 0 | Finish Gym Tracker basics first: database connected, wired frontend, **auth** (hard gate: videos are personal data) | none | already on the todo list |
| 1 | Pose estimation on one phone video: joint angles, rep count, depth, tempo (one exercise: squat or deadlift) | none (pretrained MediaPipe or YOLO pose) | prototype 1 to 2 weeks |
| 2 | Bar path: detect and track the bar or plate (YOLO fine-tuned on a few hundred frames from your own videos) | small, fits the 6 GB GPU | 2 to 4 weeks |
| 3 | Form rules per exercise, feedback drawn on the video | rules, not learning | 2 to 3 weeks per exercise |
| 4 | Store results in Gym Tracker (new tables: video, rep, bar-path points, form metrics); charts over time; before/after compare | none | 1 to 3 weeks |
| 5 | Phone upload flow and background analysis worker | none | 1 to 2 weeks |
| 6 | Learned good/bad-rep classifier (optional) | needs hundreds of labelled reps | months |

Useful tool for one exercise with the phone workflow: about 2 to 3 months part-time. Reliable multi-exercise coach: 6 months or more. Honest limits: one 2D phone angle, plates and clothing hide joints, lighting, camera placement must be the same each time; informational only, not medical advice.

## Research leads (web, 2026-10-05, unverified)
- Similar open-source stack (Express, React, PostgreSQL, Python OpenCV/MediaPipe), barbell path and pose from video upload: https://github.com/AdeiTamayo/GrAl_Tamayo_Adei
- Single-camera barbell trajectory with a YOLO detector, perspective correction and 2D trackers: https://link.springer.com/article/10.1007/s42979-026-04875-z
- Barbell squat coaching with computer vision and ML: https://arxiv.org/pdf/2503.23731
- MediaPipe barbell velocity reportedly correlates 0.96 with Kinovea: https://journalpejuang.web.id/index.php/jurnalpkopejuang/article/download/85/79

## Next steps
1. Film the first test clips (5 to 10 reps, side view, phone on a tripod or leaned against something, same spot) and send them to the PC. Pick the first exercise.
2. Phase 1 prototype in Python on those clips (no app needed): joint angles, rep count, you read every line.
3. In parallel on the Gym Tracker side: finish the database connection and the auth phase.
