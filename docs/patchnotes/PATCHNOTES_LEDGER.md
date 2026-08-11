# 🛡️ MARCIALE-OS PATCHNOTES LEDGER (`/docs/patchnotes/PATCHNOTES_LEDGER.md`)
## The Living Dropbox of All Surgical Bugfixes, Hotfixes, and Armor Patches
**Overseeing Commander:** `@sre` (Site Reliability Engineer & Incident Commander)  
**Field Patchmaster:** `@pangolin` (Autonomous Repair & Patch Officer)  
**Parent Governance:** `/docs/AI_RULES.md` (Laws V, X, XI), `/docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`  
**Status:** Living Patchnotes Ledger  

---

# 📋 HOW THE PANGOLIN PATCH PROTOCOL OPERATES

Whenever a bug, test failure, redmark, or integration defect is detected in Marciale-OS:

1. **`@sre`** catches the incident and classifies the severity (**SEV-1** to **SEV-4**).
2. **`@sre`** dispatches **`@pangolin`** to inspect the broken line, formulate the logic equation, and apply the surgical patch.
3. **`@pangolin`** writes a new automated test assertion into `TheHUB .../tests/` or `Gamecompanion/files/tests/` to prevent regression.
4. **`@pangolin`** records the formal patch entry into this ledger.
5. If the issue requires user architectural direction, `@sre` automatically packages **`[BUILD_NAME] - HOTFIX PROPOSAL.zip`** containing the incident diagnosis and copy-paste prompt!

---

# 📜 CHRONOLOGICAL PATCH LEDGER

### [PATCH-20260811-01] ChessLab Board Tab Distortion & Rules Engine Migration
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/15-chess.js`
* **Root Cause:** Sizing distortion occurred when switching between tabs due to hardcoded CSS heights and un-synced FEN string states.
* **Fix Applied:** Integrated standard `chess.js` browser-side rules engine with surgical DOM redraws, preserving sub-5ms attack heatmap overlays.
* **Regression Test:** `tests/unit-chess.js` (11 passing assertions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-02] RuView WebSocket Proxy Non-Blocking Relay & Gating
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/server.py`, `modules/18-ruview-bridge.js`
* **Root Cause:** Raw WebSocket messages sent every 500ms caused main-thread blocking when un-throttled LocalStorage writes executed.
* **Fix Applied:** Implemented 5-second throttling on telemetry writes and added non-blocking select polling in Python server proxy.
* **Regression Test:** `tests/unit-ruview.js` and `tests/unit-ruview-proxy.py` (26 passing assertions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-03] Storage Quota Safeguard & Pre-Migration Backups
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/00-storage.js`, `01-migrations.js`
* **Root Cause:** `QuotaExceededError` crashed the UI when localStorage exceeded 5MB during version migrations.
* **Fix Applied:** Added automatic pre-migration backup snapshots in `localStorage.setItem('hub.backup.pre_migration')` and asynchronous `HubStorage` IndexedDB fallbacks.
* **Regression Test:** `tests/unit-storage.js` (4 passing assertions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-04] Companion RPG Power & Frame-Rate Governor
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@forge`
* **Subsystem:** `Gamecompanion/files/src/core/GameLoop.js`
* **Root Cause:** Canvas game loop continued rendering at 60 FPS in hidden background tabs, draining laptop battery and accumulating delta-time frame burst spikes.
* **Fix Applied:** Implemented `_bindVisibilityHandler()` automatically throttling hidden tabs to 5 FPS and clamping maximum timestep to 100ms.
* **Regression Test:** `Gamecompanion/files/tests/` (31 passing unit tests).
* **Status:** 🟢 RESOLVED & VERIFIED

---

# 3. TEMPLATE FOR FUTURE PANGOLIN PATCHES

```text
### [PATCH-YYYYMMDD-ID] [Short Patch Title]
* **Date:** [YYYY-MM-DD]
* **Patched By:** @pangolin / @sre
* **Subsystem:** [Target file paths]
* **Severity Level:** [SEV-1 Critical | SEV-2 Storage/Data | SEV-3 Bug | SEV-4 Minor]
* **Symptoms Observed:** [What was broken / error message]
* **Root Cause Analysis:** [Why it happened]
* **Logic / Math Fix Equation:** [The exact fix logic]
* **Files Modified:** [List exact files changed]
* **Regression Test Assertion Added:** [Exact test file and assertion]
* **Status:** 🟢 RESOLVED & VERIFIED
```
