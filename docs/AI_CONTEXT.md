# AI_CONTEXT.md — Marciale-OS Persistent AI Knowledge Base
## Target Audience: Autonomous AI Coding Agents & Systems Engineers
**Project Repository:** Marciale-OS (TheHUB + Companion RPG)  
**Baseline Version:** TheHUB v1.5.5.2.3 / Companion Engine v0.3.0.0.a (Build 20)  
**Primary Language Stack:** JavaScript (ES2020 Modules + Vanilla Browser JS), Python 3.9+, HTML5 Canvas, CSS3  

---

# 1. ARCHITECTURAL OVERVIEW & PURPOSE

Marciale-OS is a **local-first, zero-cloud personal command center** that unifies personal productivity, biometric monitoring, encrypted note/secret storage, offline AI reasoning, grandmaster chess calculation, and gamified momentum tracking.

### The 4 Core Architectural Subsystems:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. BACKEND & PROXY (TheHUB/server.py & TheHUB/ollama-proxy.py)              │
│    • SimpleHTTP + Threading server listening on 127.0.0.1:8000.             │
│    • Serves static files, manages hub-data.json, proxies ICS calendar feeds, │
│      and routes RuView WebSocket sensing traffic through /ruview-proxy/.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. THEHUB DASHBOARD (TheHUB/index.html & TheHUB/modules/00-*.js to 19-*.js) │
│    • Single-Page Vanilla JS Application with 11 primary tab pages.          │
│    • Hybrid storage: LocalStorage for synchronous config, IndexedDB for     │
│      large datasets (AI chats, notes library, activity archives).           │
│    • Features: Today, Kanban Tasks, Pomodoro "LOCK IN", Caffeine Tracker,   │
│      AES-GCM Vault, Calendar (.ics), Marciale AI, ChessLab, RuView Sensing. │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. COMPANION RPG (Gamecompanion/files/ & TheHUB/companion/)                 │
│    • Standalone HTML5 Canvas 2D Idle RPG built with Vite and ES Modules.    │
│    • Systems: StateManager, CombatEngine, WaveManager, LootEngine, Crafting,│
│      SaveManager (IndexedDB), and TheHUBBridge (postMessage listener).      │
│    • Embedded inside TheHUB via <iframe> to receive productivity rewards.   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. LOCAL AI BRAIN (Ollama Daemon on 127.0.0.1:11434)                       │
│    • Streaming chat and function tool execution via modules/08-assistant.js.│
│    • Supports Qwen 2.5:7b, Llama 3.2:3b, DeepSeek-R1 local quants.          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 2. IMPORTANT DIRECTORIES & REPOSITORY MAP

```text
Marciale-OS/
├── TheHUB 1.5.5.2.3 a v/              # Core Web Command Center
│   ├── server.py                      # Python HTTP server & RuView/Calendar proxy
│   ├── ollama-proxy.py                # Optional standalone CORS proxy for Ollama
│   ├── index.html                     # Main shell, modal containers, and script imports
│   ├── style.css                      # Cyberpunk / Dark UI Design System
│   ├── modules/                       # 20 Modular JavaScript components (00 through 19)
│   │   ├── 00-storage.js              # LocalStorage & IndexedDB Hybrid Adapter
│   │   ├── 00-utils-config.js         # Sanitize, escaping, dates, brain presets
│   │   ├── 01-migrations.js           # Schema versions 0 -> 2 data migrators
│   │   ├── 04-tracker.js              # Biometrics, caffeine decay half-life math
│   │   ├── 05-calendar.js             # RFC-5545 ICS parser & recurrence engine
│   │   ├── 07-vault.js                # Web Crypto API AES-GCM encrypted notes
│   │   ├── 08-assistant.js            # Ollama streaming LLM & native tool caller
│   │   ├── 11-tasks.js                # Kanban task board & Pomodoro focus sessions
│   │   ├── 12-today.js                # Today dashboard, alerts, autopilot cards
│   │   ├── 14-companion.js            # Hub-to-iframe postMessage reward bridge
│   │   ├── 15-chess.js                # ChessLab UI, Stockfish WASM, Maia AI, Vesta
│   │   └── 17-19-presence.js          # Spatial presence & RuView RF sensing bridge
│   ├── companion/                     # Embedded static build of Idle Hero companion
│   ├── companion-mini/                # Lightweight activity card mini-companion widget
│   └── tests/                         # Automated test suites (unit, smoke, storage, app)
│
├── Gamecompanion/                     # Companion RPG Source & Lore Repository
│   ├── files/                         # Active Vite source project
│   │   ├── src/                       # Combat, core, systems, rendering, data
│   │   ├── tests/                     # 31 Node.js automated unit tests
│   │   ├── vite.config.js             # Vite build configuration
│   │   └── package.json               # Dependencies: idb, vite, terser
│   ├── content/                       # Content Bibles (Quests, NPCs, Monsters, Items)
│   ├── entities/                      # Entity specs, character backstories
│   ├── integration/                   # Game Design & Technical Specifications
│   └── research/                      # Mushoku Tensei & Taskbar Hero deep research
│
├── MASTER_ROADMAP_V7.md               # Historical build log (Builds 0 - 33.9)
├── Proposal v3.0.txt                  # Speculative post-v2.0 JARVIS proposal (Parked)
└── README(updated).txt                # Original feature manual
```

---

# 3. INTER-MODULE DATA FLOW & PROTOCOLS

### 3.1 The Productivity-to-Game Reward Flow (`postMessage`)
```text
[User completes task in 11-tasks.js]
               │
               ▼
[Hub logs activity event to hub.activity.v1]
               │
               ▼
[14-companion.js: emitCompanionEvent()]
  - Validates event type (task_done, focus_completed, chess_won)
  - Calculates XP and gold reward
  - Sends iframe.postMessage({ type: 'hub.activity', payload: {...} })
               │
               ▼
[Game Companion: TheHUBBridge.js: _handleMessage()]
  - Receives event payload
  - Calls ProgressionSystem.grantXp()
  - Spawns in-game floating text particles & saves to IndexedDB
  - Sends parent.postMessage({ type: 'idlehero.ack', sourceActivityId: ... })
               │
               ▼
[14-companion.js: handleCompanionFrameMessage()]
  - Marks event as acknowledged in COMPANION_EVENTS_KEY
```

### 3.2 The AI Streaming & Tool Calling Loop
```text
[User types prompt in Marciale Chat]
               │
               ▼
[08-assistant.js: sendAssistantMessage()]
  - Injects System Date Anchor + User Profile + Hub State Summary
  - Passes Native Tool Schemas (add_task, log_drink, query_schedule)
  - Sends POST to http://127.0.0.1:8000/api/chat (proxied to Ollama:11434)
               │
               ▼
[readOllamaChatStream()]
  - Yields streaming text chunks directly to DOM
  - Buffers fragmented tool_calls via mergeStreamToolCalls()
               │
               ▼
[strictToolActionsFromCalls()]
  - Validates JSON argument schema
  - Renders user approval confirmation card in chat UI
  - Upon user click, executes native JavaScript action (e.g. Hub.tasks.create())
```

---

# 4. HIGH-RISK CODE AREAS & SAFE MODIFICATION RULES

### ⚠️ HIGH RISK FILES (Modify with extreme caution)
1. **`TheHUB/modules/00-storage.js` & `01-migrations.js`**: Core data layer. Never alter storage keys without writing an explicit migration function in `01-migrations.js`.
2. **`TheHUB/server.py`**: Handles security boundaries, CORS filtering, ICS line unfolding, and RuView WebSocket relays. Never allow unvalidated URL fetching in `/api/fetch`.
3. **`TheHUB/modules/08-assistant.js`**: 106KB monolithic AI engine. Do not alter `readOllamaChatStream` or `mergeStreamToolCalls` without running `node tests/app-smoke.js`.
4. **`Gamecompanion/files/src/core/StateManager.js`**: Central reactive state store. Must maintain immutable state snapshots on `get()`.

### 🟢 SAFE MODIFICATION AREAS
1. **`Gamecompanion/files/src/data/*.json`**: Safe to add new items, monsters, quests, and affixes.
2. **`TheHUB/style.css`**: Safe to customize CSS color variables, font families, and modal animations.
3. **`TheHUB/modules/00-utils-config.js`**: Safe to add new AI Brain profile presets.

---

# 5. TESTING & VERIFICATION COMMANDS

Before committing any change or declaring a repair complete, an AI agent MUST run:

```bash
# In TheHUB directory:
npm test
# (Executes smoke.js, unit.js, unit-storage.js, unit-hub.js, unit-calendar.js,
#  unit-tracker.js, unit-chess.js, unit-presence.js, unit-ruview.js,
#  unit-presence-automation.js, unit-ruview-proxy.py, app-smoke.js)

# In Gamecompanion/files directory:
npm test
# (Executes 31 automated unit tests across all RPG game systems)
```

**Passing Standard:** Zero errors, zero unhandled promise rejections, zero DOM exceptions.
