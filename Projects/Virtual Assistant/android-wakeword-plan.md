# Step 15 plan: "Hey Jarvis" Android app (written 2026-10-04)

Goal: say "Hey Jarvis" to the phone, even locked, and Jarvis turns on on the phone AND the PC. Free forever, no account, no vendor key.

## Decisions (user)
- Engine: **openWakeWord** (pretrained `hey_jarvis`). Porcupine rejected: free tier ended 2026-06-30 (see run-log 2026-10-04).
- Hard build, built to run for a long time, not a demo.
- **Always-listening ON/OFF switch is a requirement** (user, 2026-10-04).

## How it works
Foreground service (mic, on-device) -> openWakeWord model hears "hey jarvis" -> app opens `https://msi.tail851826.ts.net/?go=1` (already built in phone.html: summons the PC window + starts listening on the phone).

## ON/OFF controls (all three, same state)
1. Big switch inside the app.
2. "Pause / Resume" button on the persistent notification (works from the lock screen).
3. Quick Settings tile (pull-down shortcut).
Off = service stopped, mic released, notification gone. State survives reboot (remembered setting).

## Long-run reliability
- Starts after reboot (BOOT_COMPLETED) only if the switch was ON.
- Restarts itself if killed (sticky service + watchdog).
- Asks the user to exempt it from battery optimization; Samsung "never sleeping apps" step shown in-app.
- Debounce so one phrase = one trigger; cooldown after a trigger.
- Mic conflict handling (phone call, another app using the mic): pause and resume.
- Log file of detections (time, score) for tuning the threshold. No audio is ever saved or sent.

## Security
- Audio never leaves the phone.
- The Jarvis token lives in Android Keystore-backed encrypted storage, not in plain files, not in the code, not in git.
- URL fixed to the tailnet address; app opens only that host over https.
- No INTERNET permission needed for listening itself (only the browser opens the link).

## Build steps (one idea each, user reads and says "I understand")
1. Toolchain: Android Studio + SDK installed, empty app runs on the phone (USB or Wi-Fi debugging).
2. Mic permission + show a live mic level.
3. Run the openWakeWord models (melspectrogram -> embedding -> hey_jarvis) on a test WAV; print the score.
4. Same, on live mic.
5. Foreground service + notification + ON/OFF switch.
6. Trigger: open the `?go=1` link.
7. Notification Pause/Resume + Quick Settings tile.
8. Boot start, restart, battery exemption screen, detection log.
9. Real-world test: pocket, noise, 24 h battery read, tune threshold.

## Open / risks
- Samsung battery killing is the biggest long-term risk.
- Model accuracy on the phone mic is untested.
- Pretrained model license is CC BY-NC-SA 4.0: personal use only.
- Android Studio is not installed yet (installing 2026-10-04).
