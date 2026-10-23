---
tags: [gym-tracker, decision]
date: 2026-09-20
---
# Desktop-first, not mobile-first

**Decision:** design the UI for a laptop browser. Mobile is out of scope for now.

**Why:** the user is building a website first. A phone layout (bottom nav, 44px tap targets, 480px column) is a different design from a desktop one, so mixing them would mean designing twice.

**What changed in [[architecture]]:**
- 5.1: principles are now desktop-first, keyboard-friendly (Tab, Enter to confirm a set), sidebar + content (max 1000px).
- 5.3: all four wireframes redrawn with a left sidebar. Recent workouts in a 2-column grid; History as full-width rows.
- 5.4 / 5.6: `Nav.jsx` (bottom bar) became `Sidebar.jsx`.
- 6 and 7: Phase 2 is "sidebar nav"; locked decision is "Dark, desktop-first".

**Later:** flexbox layout stays the same. Mobile = one `@media (max-width: 700px)` block that turns the sidebar into a bottom bar. Not built now.
