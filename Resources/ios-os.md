---
tags: [resource, phone, ios, iphone, os]
up: "[[INDEX]]"
---
# iPhone: what it can do and OS-level control (written 2026-10-23)

Sister note: [[android-os]]. Status: **research and plan only; nothing installed or changed on the phone yet.**

## Short verdict
The iPhone is **not a practical server**. iOS suspends background apps within about 30 seconds (exceptions: audio, location, VoIP, background fetch), gives no shell, and sandboxes every app. Best use: real-Safari test device, remote control for the PC, and the device where reels and sites are checked as people see them.

## Device sheet (fill from the phone, never guess)
| Field | Value | How to read it |
|---|---|---|
| Model | ? | Settings > General > About |
| iOS version | ? | same screen |
| Chip (A-series) | ? | from the model; decides jailbreak options |
| Free storage, battery health | ? | Settings > General > iPhone Storage / Battery |
| Daily phone or spare? | ? | ask the user |

## What is possible without a jailbreak
| Tool | What it does | Notes |
|---|---|---|
| Tailscale (iOS app) | Phone joins the private network and reaches PC services | Works as a client; it does not make the phone a server |
| Shortcuts + Personal Automations | Trigger actions on time, location, charging, app open; call a PC endpoint over Tailscale | Some automations still ask for a tap |
| a-Shell, iSH, Pythonista | Small shell/Python on the phone | Run only while the app is on screen; iSH is an emulated x86 Linux (slow) |
| libimobiledevice from the PC | `idevice_id`, `ideviceinfo`, `idevicesyslog`, `idevicescreenshot`, `idevicebackup2`: read info, logs, screenshots, backups | On Windows it needs Apple's USB driver (comes with iTunes / Apple Devices app); not installed/verified yet |
| Sideloading (AltStore, Sideloadly) | Install your own IPA builds | Free Apple ID: apps expire every 7 days; paid developer account: 1 year |
| Developer Mode (iOS 16+) | Needed to run sideloaded dev builds | Settings > Privacy & Security |
| Safari Web Inspector | Debug pages on the phone | Normally needs a Mac; on Windows use ios-webkit-debug-proxy (limited, verify) |
| Apple Configurator / MDM profiles | Supervised mode, restrictions, deeper settings | Configurator is Mac-only |

## OS-level change = jailbreak (only for some phones)
- Possible only for specific chip + iOS combinations. The one solid fact: the **checkm8 bootrom exploit covers A5 to A11 chips (iPhone 4S up to iPhone 8 / iPhone X)** and cannot be patched by Apple. Newer chips depend on the exact iOS version and on what exploits are public now; **verify at the time with the model and iOS version, do not assume.**
- Costs: security risk (sandbox and signature protections are off), some banking/payment apps refuse to run, updates can break it or lock the exploit out, a failed attempt can need a restore (data loss). Back up first (`idevicebackup2` or iTunes).
- Do not jailbreak a daily phone for convenience. Only a spare, only with a purpose a non-jailbroken phone cannot meet.

## Recommended path
1. Read model + iOS version, then decide if a jailbreak is even an option.
2. Install Tailscale on it; try one Shortcut that hits a small test endpoint on the PC.
3. Install the Windows USB driver and libimobiledevice; read device info and take a screenshot from the PC.
4. Use it as the test device for the 3D reels and sites (how they look in iOS Safari and Instagram).

## Open questions for the user
Model and iOS version; daily or spare; whether a jailbreak is something you want or only curiosity.

## Rules
- Nothing is changed on the phone until the user says go. Back up before anything that can erase data.
- Log every install in `Resources/tools-in-use.md` and the System Settings Guide.
- Secrets never in chat, notes or git.
