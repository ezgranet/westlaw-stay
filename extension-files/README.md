# Westlaw Session Keeper (MVP)

This Chrome extension helps prevent **Westlaw** sessions from logging out due to inactivity.  
It works by **simulating tiny, harmless user actions** (a fake mouse movement or a 1-pixel scroll) every few minutes.

- ✅ Keeps your session alive
- ✅ Extremely lightweight
- ✅ Scoped to `*.westlaw.com/*` only
- ✅ Toggleable via the popup
- ✅ No data collection, no tracking, no external connections

---

## How It Works
- The content script runs on Westlaw pages only.
- Every **4–6 minutes (randomized)**, it dispatches either:
  - A **mousemove** event (most of the time), or
  - A **tiny scroll down/up** (every 3rd cycle).
- These actions are invisible to the user but count as “activity” for the page.

---

## Installation (Developer Mode)
1. Download this folder (`westlaw-keepalive/`).
2. Go to `chrome://extensions/` in Chrome.
3. Enable **Developer Mode**.
4. Click **Load Unpacked** and select the folder.
5. Navigate to [https://westlaw.com](https://westlaw.com) and confirm the extension is active.

---

## Usage
- Click the extension icon → **popup** shows a toggle (`Keep Alive`).
- Checked = extension runs on Westlaw tabs.
- Unchecked = extension does nothing.

---

## Development Notes
- Written in **Manifest V3** (current Chrome extension standard).
- Files:
  - `manifest.json` – extension configuration
  - `background.js` – remembers toggle state
  - `content.js` – simulates activity inside Westlaw
  - `popup.html` + `popup.js` – user interface

---

## Known Limitations
- Currently supports only **westlaw.com**.
- Does not manage multiple open Westlaw tabs (activity will run in each).
- Interval is fixed at **random 4–6 minutes**. Future versions may allow user customization.

---

## Contributing / Testing
- If you encounter issues (e.g., still being logged out), report:
  - Your OS + Chrome version
  - Timeout duration observed
  - Any errors from Chrome DevTools console
