# 🌌 Marciale-OS (TheHUB + Companion RPG)

> **A local-first, private personal command center with an integrated idle companion RPG, local streaming AI assistant (Marciale), biometric tracker, encrypted vault, and ChessLab AI.**

Everything runs 100% locally on your machine with zero cloud subscriptions, complete offline resilience, and total privacy.

---

## ⚡ Quickstart (The 3 Commands You Need)

### 1. Run Automated Test Suite
```bash
npm test
```
*(Runs all 43 automated unit and smoke tests across both TheHUB and Companion RPG with 0 failures).*

### 2. Start Marciale-OS
```bash
npm start
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### 3. Build the Companion RPG
```bash
npm run build
```

---

## 📂 Project Architecture

```text
Marciale-OS/
├── package.json                         # Root workspace controller (npm start, npm test, npm run build)
├── .gitignore                           # Excludes node_modules, build outputs, and caches
├── README.md                            # Main project overview & quickstart
├── VERSIONING_GUIDE.md                  # Official semantic versioning policy
│
├── TheHUB 1.5.5.2.3 a v/                # Core Web Command Center
│   ├── server.py                        # Python HTTP server & RuView/Calendar proxy (Port 8000)
│   ├── index.html                       # Dashboard Shell (11 Tab Views)
│   ├── style.css                        # Cyberpunk / Dark UI Design System
│   ├── modules/                         # 20 Modular JavaScript Engines (00 through 19)
│   ├── companion/                       # Embedded Companion Game (Vite Build Output)
│   └── tests/                           # 12 Automated Test Suites
│
├── Gamecompanion/                       # Companion RPG Engine Source & Content
│   ├── files/                           # Vite + ES Module Game Code (src/, tests/, package.json)
│   ├── content/                         # Content Bibles (Quests, NPCs, Monsters, Items)
│   └── integration/                     # Game Design & Technical Specifications
│
└── docs/                                # The 11-Document AI Operations & Governance Suite
    ├── AI_RULES.md                      # The AI Constitution (8 Supreme Laws)
    ├── AGENTS.md                        # The Specialized AI Squad (@architect, @sentinel, etc.)
    ├── BUILD_LOGBOOK.md                 # Permanent Engineering Ledger recording all builds
    ├── DIAGNOSTIC_AND_TESTING_GUIDE.md  # Proactive QA probes for ChessLab, RuView, & AI
    ├── CODE_ANALYSIS_AND_ISSUE_DETECTION.md # Static code analysis & defect dossiers
    ├── INCIDENT_RESPONSE_SRE_PLAYBOOK.md# Emergency triage (SEV-1 to SEV-4) & playbooks
    ├── CODEBASE_DEEP_DIVE_STUDY.md      # Full module-by-module anatomy & state schemas
    ├── AI_CONTEXT.md                    # Quick Reference Architecture Card
    ├── REPAIR_DOSSIER.md                # 23-phase deep empirical research report
    ├── MASTERFIX_PLAN_V1.0.md           # Work orders for Builds F01 through F16
    └── Refinedplan.md                   # Master Roadmap V7 + MasterFix + Master Roadmap V8
```

---

## 🤖 Directing AI Developers (The Prompt Template)

Whenever you share this repository with an AI coding assistant, paste this prompt:

```text
Hello AI! Please assume the role of [@architect | @sentinel | @forge | @mind | @sre] per `docs/AGENTS.md` and strictly follow `docs/AI_RULES.md`.

MODE: ACTIVE BUILD EXECUTION

MY CURRENT GOAL:
1. Check the bottom of `docs/BUILD_LOGBOOK.md` to see recent progress.
2. Execute [NAME OF TARGET BUILD, e.g. Build F02-R (Companion Auto-Link) or Build F05 (Storage Guard)].

MANDATORY RULES:
1. Follow your specific agent jurisdiction in docs/AGENTS.md.
2. Follow the 8 Supreme Laws in docs/AI_RULES.md (no rewrites, local-first, simulation mode for hardware).
3. Run `npm test` and make sure all 43 tests pass (100% green).
4. Append your completed build entry into `docs/BUILD_LOGBOOK.md`.
5. Package all updated files into a versioned `.zip` file per Law VIII (e.g. `PATCH-V1.0.zip`) for me to download.
6. Explain what you did in simple beginner terms so I understand!
```

---

## 🛠️ Handy Developer Commands

| Command | Action |
|---|---|
| `npm start` | Launches Python server at `http://localhost:8000` |
| `npm test` | Runs both Hub (12 suites) & Companion (31 tests) suites |
| `npm run test:hub` | Runs TheHUB unit, storage, chess, and smoke tests |
| `npm run test:companion` | Runs 31 RPG engine unit tests |
| `npm run build` | Compiles companion engine into `companion/` |
| `npm run dev` | Runs standalone Vite dev server for companion RPG |
