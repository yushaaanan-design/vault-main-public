---
tags: [resource, phone, android, os, server]
up: "[[INDEX]]"
---
# Android phone: server use and OS-level control (written 2026-10-23)

Sister note: [[ios-os]]. Status: **research and plan only; nothing installed or changed on the phone yet.** Facts about the phone are blank until read from the device (see "Device sheet").

## Goal (user, 2026-10-23)
Understand what the Android phone can be used for as a server and how far we can work at the operating-system level to change what we need. The user also owns one iPhone.

## Device sheet (fill from the phone, never guess)
| Field | Value | How to read it |
|---|---|---|
| Model / codename | ? | `adb shell getprop ro.product.model` / `ro.product.device` |
| Android version, patch level | ? | `getprop ro.build.version.release` / `ro.build.version.security_patch` |
| RAM, free storage | ? | `adb shell cat /proc/meminfo` (first lines), `adb shell df /data` |
| Battery health, temp | ? | `adb shell dumpsys battery` |
| Bootloader unlockable? | ? | Settings > Developer options > OEM unlocking (greyed out = locked by maker/carrier) |
| Daily phone or spare? | ? | ask the user; decides whether level 3 is allowed |
| Screen size | ? | `adb shell wm size` |

## The three levels of control
| Level | What it gives | Cost / risk | Reversible |
|---|---|---|---|
| 1. Termux (no root) | Linux shell on the phone: Python, Node, SSH, cron, nginx; scrapers, small APIs, scheduled jobs | None | Yes |
| 2. ADB from the PC (no root) | Install/remove apps, change many system settings, logs, screenshots, taps and keystrokes, file push/pull, debloat per user | None | Yes |
| 3. Unlock bootloader + root (Magisk) or custom ROM (e.g. LineageOS) | True OS-level change: system files, services, kernel settings, removing preinstalled apps for good | Unlocking **wipes the phone**; banking/payment apps may refuse to run (Play Integrity); Samsung trips Knox permanently; Xiaomi has a waiting period; some carrier-locked phones cannot unlock; a bad flash can brick it | No (data wipe is final) |

Rule: finish levels 1 and 2 first. Go to level 3 only if something needs it, only on a phone the user can wipe, and only after a backup and the user says go.

## Level 1: phone as a server (Termux + Tailscale)
- Install Termux from **F-Droid** (or its GitHub releases), not the Play Store build (outdated).
- Inside Termux: `pkg update`, `pkg install openssh python nodejs git`. SSH server runs on port **8022** (`sshd`); add the PC's public key, no password login.
- Keep it alive: `termux-wake-lock`; turn off battery optimisation for Termux and Tailscale; keep the phone plugged in with the charge cap at about 80 % if the phone offers one (24/7 charging can swell the battery).
- Android 12 and later kill background child processes ("phantom process killer"). Android 12-13: `adb shell "/system/bin/device_config put activity_manager max_phantom_processes 2147483647"`; Android 14 and later: Developer options > "Disable child process restrictions". (Exact command per Android version: verify on the real phone before relying on it.)
- Reachability: phones on mobile data sit behind carrier NAT, so nothing can connect in. **Tailscale** (already on the PC) makes the phone a private node; reach it at its 100.x address, no port forwarding, no public exposure. Bind services to the Tailscale address, never to 0.0.0.0 on public Wi-Fi.
- Good jobs for it: scheduled scrapers (follow `Resources/scraping-rules.md`), small APIs, a Telegram/webhook listener, file sync, uptime pings. Bad jobs: GPU rendering, heavy builds, anything needing 24/7 high CPU (throttles, heats).

## Level 2: control from the PC (ADB)
- Install Android platform-tools on the PC (not installed yet; `adb` not on PATH as of 2026-10-23). On the phone: Settings > About phone > tap Build number 7 times > Developer options > USB debugging.
- Wireless debugging (Android 11+): Developer options > Wireless debugging > `adb pair <ip:port>` then `adb connect <ip:port>`.
- Useful commands: `adb devices`, `adb shell pm list packages`, `adb install app.apk`, `adb exec-out screencap -p > shot.png`, `adb shell input tap X Y`, `adb shell input text "..."`, `adb logcat`, `adb push` / `adb pull`, `adb shell settings put global <key> <value>`.
- Debloat without root (per user, reversible): `adb shell pm uninstall -k --user 0 <package>`; bring it back with `adb shell cmd package install-existing <package>`. Never remove system UI, dialer or SIM packages; list candidates and get the user's OK first.
- Driving apps by taps/keystrokes works for personal testing; automated posting or scraping through a platform's app can break its terms, so check before building.

## Level 3: unlock, root, custom ROM (decision, not default)
1. Back up everything (the unlock factory-resets).
2. Developer options > OEM unlocking on; then the maker's path: Pixel/most stock-like: `fastboot flashing unlock`; Samsung: download mode and Knox trip; Xiaomi: Mi Unlock after a waiting period.
3. Root: patch the stock `boot.img` with Magisk, flash it with fastboot. Custom ROM (LineageOS) only if the device is officially supported; read its install page for that exact codename first.
4. Cost list the user must accept: wiped data, possible app refusals (banking), no OTA updates without re-patching, brick risk.
Admin-only or system-level steps are written as exact commands for the user to run; log each in the System Settings Guide.

## Recommended path
1. Fill the device sheet (plug in, USB debugging, I read it).
2. Install platform-tools, confirm `adb devices` sees it.
3. Termux + Tailscale + SSH from the PC; run one harmless test job.
4. Decide on level 3 only after that.

## Open questions for the user
Model and Android version; daily or spare; what to run or change (scrapers 24/7, Ares hosting, app automation, debloat, launcher); is a wipe acceptable.

## Rules
- Nothing is changed on the phone until the user says go; show the plan page first for any multi-step round (global rule).
- Every install or change goes into `Resources/tools-in-use.md` and the System Settings Guide.
- Secrets (SSH keys, Tailscale auth) never in chat, notes or git.
