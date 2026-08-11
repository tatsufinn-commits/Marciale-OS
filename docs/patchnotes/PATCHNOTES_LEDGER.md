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

### [PATCH-20260811-05] Zero-Asset Procedural Web Audio Synthesizer Integration
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@forge` / `@frontend`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/00-utils-config.js`, `Gamecompanion/files/src/systems/AudioSystem.js`
* **Severity Level:** SEV-4 (Enhancement & Architecture Validation)
* **Symptoms Observed:** TheHUB and Companion RPG lacked native audio feedback for UI clicks, task completions, and combat strikes; importing external `.mp3`/`.wav` assets would bloat bundle sizes and break offline file portability.
* **Root Cause Analysis:** Offline single-file HTML distributions require zero external asset dependencies; sound effects must be generated mathematically via Web Audio API oscillators and gain envelope modulations ($f(t) = f_0 \cdot e^{-kt}$, $g(t) = g_0 \cdot e^{-t/\tau}$).
* **Logic / Math Fix Equation:** 
  $$\text{Hit Waveform: } f(t) = 400 \cdot (60 / 400)^{t / 0.10} \text{ Hz with Low-Pass } 1200\text{ Hz Filter}$$
  $$\text{Fanfare Triad: } f_n \in [523.25, 659.25, 783.99, 1046.50] \text{ Hz with Triangle Oscillators}$$
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/00-utils-config.js` (`window.playHubSound`)
  * `Gamecompanion/files/src/systems/AudioSystem.js` (`AudioSystem` class)
  * `Gamecompanion/files/src/main.js` (Combat onHit, chest opened, level up triggers)
  * `Gamecompanion/files/tests/AudioSystem.test.js` (Unit test suite with Web Audio mock)
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/AudioSystem.test.js` (3 assertions verifying headless tolerance, volume clamping, and waveform node scheduling).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-06] Pharmacokinetic Half-Life Calibration & Iframe Origin Hardening
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sentinel` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/04-tracker.js`, `tests/unit-tracker.js`, `Gamecompanion/files/src/integration/TheHUBBridge.js`
* **Severity Level:** SEV-3 (Mathematical Calibration & Security Hardening)
* **Symptoms Observed:** Adversarial stress test diagnosis caught caffeine half-life constant set to $5\text{h}$ instead of the clinical $5.7\text{h}$ pharmacokinetic standard, and `TheHUBBridge` lacked origin filtering on inbound event listeners.
* **Root Cause Analysis:** Elimination kinetics require $t_{1/2} = 5.7\text{h}$ to accurately model bedtime residual concentrations ($C(t) = C_0 \cdot 0.5^{t/5.7}$). Iframe messaging needed explicit `window.location.origin` binding to prevent rogue frame spoofing.
* **Logic / Math Fix Equation:** 
  $$C_{\text{bedtime}} = \sum C_i \cdot 0.5^{(t_{\text{bedtime}} - t_i)/5.7}$$
  $$T_{\text{cutoff}} = t_{\text{bedtime}} - \left( \log_2\left(\frac{Dose}{Threshold}\right) \times 5.7 \right) \text{ hours}$$
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/04-tracker.js` (`HALF_LIFE_CAF_H = 5.7`)
  * `TheHUB 1.5.5.2.3 a v/tests/unit-tracker.js` (Updated half-life, cutoff, and residual assertions)
  * `Gamecompanion/files/src/integration/TheHUBBridge.js` (Origin allowlist validation)
  * `TheHUB 1.5.5.2.3 a v/package-lock.json` (Resolved 3 transitive vulnerabilities via `npm audit fix`)
* **Regression Test Assertion Added:** `tests/unit-tracker.js` (10/10 passing assertions with $5.7\text{h}$ mathematical rigor).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-07] SRE Tooling Hardening, Governance Audit Engine & State Registry
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre` / `@joint`
* **Subsystem:** `tools/scout-audit.js`, `tools/qa-wcag-audit.js`, `tools/governance-audit.js`, `package.json`, `docs/SYSTEM_STATE.md`
* **Severity Level:** SEV-2 (Governance & Verification Integrity)
* **Symptoms Observed:** Remote SRE audit caught static string heuristics in license scanner (`tools/scout-audit.js`), WCAG audit exiting 0 despite warnings (`tools/qa-wcag-audit.js`), and lack of automated governance drift detection.
* **Root Cause Analysis:** Verification tools must inspect actual package manifests in `node_modules` and differentiate blocking vs advisory errors with non-zero exit codes.
* **Logic / Math Fix Equation:** 
  $$\text{Exit Code} = \begin{cases} 0 & \text{if } \text{blockingErrors} = 0 \land \text{copyleftRisks} = 0 \land \text{governanceIssues} = 0 \\ 1 & \text{otherwise} \end{cases}$$
* **Files Modified:**
  * `tools/scout-audit.js` (Deep manifest license inspection in `node_modules`)
  * `tools/qa-wcag-audit.js` (Enforced non-zero exit for blocking accessibility errors)
  * `tools/governance-audit.js` (Automated governance, scenario, and version consistency scanner)
  * `package.json` (Added `"audit:governance"` and updated `"audit:all"`)
  * `docs/SYSTEM_STATE.md` (Created canonical ground-truth state registry)
* **Regression Test Assertion Added:** `tools/governance-audit.js` (4/4 automated checks verified passing).
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
