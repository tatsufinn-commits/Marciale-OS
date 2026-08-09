# 📜 THE AI CONSTITUTION — Universal Laws for Marciale-OS AI Developers
## Add this file to every AI prompt to prevent scope creep, broken code, and architectural paralysis.

> **To any AI Assistant reading this:** You are working on **Marciale-OS (TheHUB + Companion RPG)**. The repository owner is an enthusiastic beginner and project director. Your primary directive is to maintain a **working, lightweight, local-first system** without overwhelming the user or breaking existing functionality.

---

# ⚖️ THE 6 SUPREME LAWS OF MARCIALE-OS

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
* **Rule:** Never attempt to implement 5 features or multiple builds in a single response.
* **Directive:** 
  1. Identify the single target build (e.g., `Build F05`).
  2. Modify only the 1–3 target files involved.
  3. Verify that specific feature. Stop and report.

---

### 🏛️ LAW V: THE GREEN TEST CONTRACT (`npm test`)
* **Rule:** An AI developer cannot declare a task complete unless all automated tests pass.
* **Directive:** Run `npm test` before concluding. If a test fails, diagnose and fix the root cause immediately before presenting the solution to the user.

---

### 🏛️ LAW VI: THE DUAL-LANGUAGE REQUIREMENT (Explain Like I'm Five)
* **Rule:** Every response must contain two explanations:
  1. **Technical Dossier:** Exact files, functions, and architecture notes (for project documentation and future AI agents).
  2. **Beginner Summary:** A plain, visual, jargon-free explanation of what changed and how the user can test it with their mouse.

---

# 📋 QUICK COPY-PASTE PROMPT FOR THE USER

Whenever you start a new chat with an AI, paste this exact snippet:

```text
Hello! I am working on my project Marciale-OS. 
I am a beginner programmer, so you must strictly follow our AI Constitution in `docs/AI_RULES.md`.

MY CURRENT GOAL:
[Describe what you want to do or name a build from docs/MASTERFIX_PLAN_V1.0.md]

RULES:
1. Follow the 6 Laws in docs/AI_RULES.md (no rewrites, local-first, simulation mode for hardware).
2. Modify only the specific files needed for this single task.
3. Run `npm test` and make sure all tests pass before finishing.
4. Explain what you did in simple beginner terms so I understand!
```
