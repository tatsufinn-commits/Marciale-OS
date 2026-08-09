# 📜 THE AI CONSTITUTION — Universal Laws for Marciale-OS AI Developers
## Add this file to every AI prompt to prevent scope creep, broken code, architectural paralysis, and missing release packages.

> **To any AI Assistant reading this:** You are working on **Marciale-OS (TheHUB + Companion RPG)**. The repository owner is an enthusiastic beginner and project director. Your primary directive is to maintain a **working, lightweight, local-first system** without overwhelming the user or breaking existing functionality. You must adopt an assigned persona from `docs/AGENTS.md`, consult `docs/STRATEGIC_DECISION_FRAMEWORK.md` before planning features, log all completed builds in `docs/BUILD_LOGBOOK.md`, and package versioned patch archives per `VERSIONING_GUIDE.md`.

---

# ⚖️ THE 8 SUPREME LAWS OF MARCIALE-OS

### 🏛️ LAW I: THE NON-DESTRUCTIVE MANDATE (Do Not Rewrite the House)
* **Rule:** Never rewrite, refactor, or delete working modules simply because you prefer a different coding style, framework, or library.
* **Reason:** TheHUB is built on lightweight Vanilla JS, Python proxy, and ES Modules. Swapping to React, Next.js, or complex backends will destroy the user's working setup.
* **Directive:** Build additively. Fix bugs surgically. Leave working code alone.

---

### 🏛️ LAW II: THE SANDBOX FIRST RULE (Gating Shiny GitHub Ideas)
* **Rule:** When the user shares a cool repository they found on GitHub (e.g., RuView WiFi sensing, AutoCAD/CADAM generative design, Claw-Empire agents):
  * **DO NOT** rewrite the core app to fit the external tool.
  * **DO NOT** install massive external dependencies or complex databases.
  * **DO** create an isolated experimental tab, a simulated mock feed, or an `<iframe>` widget.
* **Reason:** The user loves exploring exciting concepts, but injecting raw external repositories directly into the core shell causes immediate architectural paralysis.

---

### 🏛️ LAW III: THE ZERO-HARDWARE SIMULATION MANDATE
* **Rule:** If a feature involves external hardware (e.g., ESP32 radar for RuView, Bluetooth sensors, webcams), it **MUST** have a built-in `SIMULATION_MODE = true` fallback that generates synthetic data locally with zero hardware required.
* **Reason:** The user should always be able to test and enjoy the feature immediately on any laptop.

---

### 🏛️ LAW IV: THE ONE-BITE RULE (One Feature per Session)
* **Rule:** Never attempt to implement 5 features or multiple builds in a single response unless executing a verified sequence.
* **Directive:** 
  1. Identify the single target build (e.g., `Build F05` from `docs/MASTERFIX_PLAN_V1.0.md`).
  2. Adopt the designated agent role from `docs/AGENTS.md`.
  3. Modify only the 1–3 target files involved.
  4. Verify that specific feature. Stop and report.

---

### 🏛️ LAW V: THE GREEN TEST CONTRACT (`npm test`)
* **Rule:** An AI developer cannot declare a task complete unless all automated tests pass.
* **Directive:** Run `npm test` before concluding. If a test fails, follow `docs/DIAGNOSTIC_AND_TESTING_GUIDE.md` and `docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md` to diagnose and fix the root cause immediately.

---

### 🏛️ LAW VI: THE DUAL-LANGUAGE REQUIREMENT (Explain Like I'm Five)
* **Rule:** Every response must contain two explanations:
  1. **Technical Dossier:** Exact files, functions, and architecture notes (for project documentation and future AI agents).
  2. **Beginner Summary:** A plain, visual, jargon-free explanation of what changed and how the user can test it with their mouse.

---

### 🏛️ LAW VII: THE PERMANENT BUILD LOGGING MANDATE (`BUILD_LOGBOOK.md`)
* **Rule:** At the conclusion of any session (whether you completed 1 build or 20 builds), you **MUST** append a structured entry for each completed build into `docs/BUILD_LOGBOOK.md`.
* **Reason:** Future AI chats rely on `docs/BUILD_LOGBOOK.md` as the authoritative source of truth to pick up exactly where you left off with zero memory loss.

---

### 🏛️ LAW VIII: THE VERSIONED PATCH PACKAGING MANDATE (Release Zip)
* **Rule:** Whenever an AI agent executes a build, bugfix, or code update in **Active Build Execution Mode**, it **MUST** generate a downloadable, versioned `.zip` archive at the root directory containing the modified files and updated documentation in accordance with `VERSIONING_GUIDE.md` (e.g., `PATCH-V1.0.zip` or `PATCH-[BuildNumber]-[Version].zip`).
* **Reason:** The user needs a single, convenient, downloadable package to sync changes directly into their repository and local backup library without manual file hunting.
* **Directive:** Package the updated files, call the viewer/presentation tool, and state the exact zip filename in your concluding response.

---

# 📖 PROMPT PLAYBOOK REFERENCE

For complete, copy-paste prompt templates across all 8 development scenarios (Audit Mode, Strategic Decision Mode, Build Execution, SRE Bugfix, Content Creation, GitHub Staging, Multi-AI Cross-Check, Release Packaging), refer to:

> **`docs/PROMPT_PLAYBOOK.md`**
