# 📖 THE MASTER AI PROMPT PLAYBOOK (`PROMPT_PLAYBOOK.md`)
## The Complete Library of Copy-Paste Prompt Templates for Every Scenario
**Target System:** Marciale-OS (TheHUB + Companion RPG)  
**How to Use:** Whenever you open a new AI chat, find the scenario that matches what you want to do, copy the box, and paste it directly into the chat!  

---

# 📑 SCENARIO SELECTOR

| Scenario | When to Use It | Risk Level |
|---|---|:---:|
| [Scenario 1: Read-Only Audit & Reality Check](#scenario-1-read-only-audit--reality-check) | Inspect what's actually implemented right now without assuming roadmaps are accurate. | 🟢 Zero Risk |
| [Scenario 2: Strategic Path Analyzer & Decision](#scenario-2-strategic-path-analyzer--decision) | You have a new idea and want the AI to calculate the 4-Axis SPI score. | 🟢 Zero Risk |
| [Scenario 3: Active Build Execution](#scenario-3-active-build-execution) | You want the AI to implement a specific build from the roadmap. | 🟡 Medium Risk |
| [Scenario 4: Emergency Incident Triage (Bugfix)](#scenario-4-emergency-incident-triage-bugfix) | Your screen is blank, a button broke, or a red error appeared. | 🟡 Medium Risk |
| [Scenario 5: Game Content & Creative Expansion](#scenario-5-game-content--creative-expansion) | You want to add weapons, monsters, or quests without touching code. | 🟢 Zero Risk |
| [Scenario 6: New GitHub Repo Staging & Sandbox](#scenario-6-new-github-repo-staging--sandbox) | You saw a cool repository on GitHub and want to test it safely. | 🟢 Zero Risk |
| [Scenario 7: Multi-AI Second Opinion (Cross-Check)](#scenario-7-multi-ai-second-opinion-cross-check) | You want to ask Claude / ChatGPT to review another AI's plan. | 🟢 Zero Risk |
| [Scenario 8: Autonomous Post-Roadmap Planning](#scenario-8-autonomous-post-roadmap-planning) | All past roadmaps are finished; you want the AI to discover what to optimize next. | 🟢 Zero Risk |
| [Scenario 9: The Mosaic Council (When I Am Lost)](#scenario-9-the-mosaic-council-when-i-am-lost--clueless) | You feel clueless, tired, or have no idea what to do next. | 🟢 Zero Risk |

---

# 📋 THE 9 MASTER PROMPT TEMPLATES

---

### Scenario 1: Read-Only Audit & Reality Check
* **Goal:** Inspect what is **actually in the live codebase right now**, compare it against documented plans, and flag any discrepancies without modifying any code.

```text
Hello AI! I am working on my project Marciale-OS (TheHUB + Companion RPG). 
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

Please assume the role of [@architect] per `docs/AGENTS.md` and strictly follow `docs/AI_RULES.md` and `docs/STRATEGIC_DECISION_FRAMEWORK.md`.

MODE: READ-ONLY / REALITY AUDIT (DO NOT MODIFY OR EDIT ANY FILES)

MY CURRENT GOAL:
1. Inspect the live code and run `npm test` to determine the exact current state of the repository.
2. Compare the live codebase against `docs/BUILD_LOGBOOK.md` and roadmaps to flag any plan-vs-reality discrepancies (e.g. phantom implementations or undocumented completions).
3. Explain your findings in plain English with zero guesswork!
```

---

### Scenario 2: Strategic Path Analyzer & Decision
* **Goal:** You have a new idea (or saw something online) and want the AI to evaluate it against live code, calculate its Strategic Priority Index (SPI), challenge bad technical assumptions, and give a Green / Yellow / Red light recommendation.

```text
Hello AI! Please assume the role of [@architect] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: STRATEGIC PATH ANALYSIS (NO CODE WRITING YET)

MY PROPOSED IDEA:
[Describe your idea, e.g. "I want to add this new habit tracker library" OR "I want to connect this AI agent tool"]

YOUR TASK:
1. Consult `docs/STRATEGIC_DECISION_FRAMEWORK.md` and inspect the live repository code first.
2. Evaluate this idea across the 4-Axis Scorecard (User Value, Risk Safety, Feasibility, Synergy) and calculate the Strategic Priority Index (SPI).
3. Exercise constructive technical pushback: If my idea is technically flawed, introduces datacenter requirements, or risks breaking working code, tell me why and propose a better alternative.
4. Provide a clear verdict: 🟢 GREEN LIGHT (Build Now), 🟡 YELLOW LIGHT (Sandbox Only), or 🔴 RED LIGHT (Discard/Overkill).
5. Outline the prerequisites and recommend the safest next step for me as Project Director.
```

---

### Scenario 3: Active Build Execution
* **Goal:** Tell the AI to implement a specific build from `docs/MASTERFIX_PLAN_V1.0.md` or `docs/Refinedplan.md`.

```text
Hello AI! Please assume the role of [@architect | @sentinel | @forge | @mind | @sre] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: ACTIVE BUILD EXECUTION

MY TARGET BUILD:
1. Check the bottom of `docs/BUILD_LOGBOOK.md` to see recent progress.
2. Execute [NAME OF BUILD, e.g. Build F05: Storage Quota Guard OR Build F06: TheHUBBridge Handshake].

MANDATORY RULES:
1. Follow your specific agent jurisdiction in docs/AGENTS.md.
2. Follow the 9 Supreme Laws in docs/AI_RULES.md (no framework rewrites, local-first, simulation mode for hardware).
3. Modify only the 1–3 target files needed for this single build.
4. Run `npm test` and make sure all 43 tests pass (100% green checkmarks).
5. Append your completed build entry into `docs/BUILD_LOGBOOK.md`.
6. Package all updated files into a versioned `.zip` file per Law VIII (e.g. `PATCH-V1.0.zip`).
7. Explain what you changed in simple beginner terms so I can test it with my mouse!
```

---

### Scenario 4: Emergency Incident Triage (Bugfix)
* **Goal:** Fix a white screen, broken button, or red console error quickly and surgically.

```text
Hello AI! Please assume the role of [@sre (Incident Commander)] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: EMERGENCY INCIDENT RESPONSE (SRE)

THE ERROR / PROBLEM:
- What happened: [Describe what broke, e.g. "When I open the Companion tab, the screen is frozen"]
- Browser Console Error (F12): [Paste red error message, e.g. "Uncaught TypeError: Cannot read property 'postMessage' of null"]

YOUR TASK:
1. Follow the emergency playbooks in `docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`.
2. Locate the exact file and line number causing the root issue.
3. Apply a surgical, minimal-diff fix to that single file.
4. Run `npm test` to verify all 43 tests pass.
5. Package the fix into a patch `.zip` file and explain what caused the bug in plain English.
```

---

### Scenario 5: Game Content & Creative Expansion
* **Goal:** Add new weapons, armor, enemies, or quests to the companion game without writing complex code.

```text
Hello AI! Please assume the role of [@forge (Game Systems Engineer)] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: GAME CONTENT CREATION

MY REQUEST:
[Describe what you want to add, e.g. "Add 3 new legendary fire staves to items.json and a new Fire Dragon boss to enemies.json"]

YOUR TASK:
1. Edit only the data files in `Gamecompanion/files/src/data/` (e.g. `items.json`, `enemies.json`, `recipes.js`).
2. Run `npm test` to verify that all 31 companion unit tests pass.
3. Run `npm run build` to update the game assets in TheHUB.
4. Package the release `.zip` and list the stats of the new items for me!
```

---

### Scenario 6: New GitHub Repo Staging & Sandbox
* **Goal:** You found an awesome repository on GitHub and want to test it safely inside TheHUB without breaking anything.

```text
Hello AI! Please assume the role of [@architect] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: GITHUB REPO SANDBOX STAGING

THE GITHUB REPO I FOUND:
- Repo URL / Name: [Paste link or describe tool, e.g. "OpenSCAD 3D WebAssembly viewer" or "RuView radar"]
- What I want it to do: [Describe what you want to see]

YOUR TASK:
1. Apply Law II (The Sandbox First Rule) and Law III (Zero-Hardware Simulation Mandate) from `docs/AI_RULES.md`.
2. Do NOT touch the core dashboard code.
3. Design an isolated `<iframe>` sandbox or experimental tab in `TheHUB/modules/13-experimental.js` to embed this project safely.
4. Run `npm test` to verify 0 regressions across the core app.
```

---

### Scenario 7: Multi-AI Second Opinion (Cross-Check)
* **Goal:** Paste a plan from one AI into another AI (e.g. ask Claude to critique ChatGPT's proposal) to get a green light.

```text
Hello AI! Please act as an Independent Senior Systems Auditor.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: INDEPENDENT STRATEGIC AUDIT & SECOND OPINION

ANOTHER AI PROPOSED THE FOLLOWING PLAN:
[Paste the proposal or build plan from the previous AI]

YOUR TASK:
1. Review this proposal against our `docs/AI_RULES.md`, `docs/STRATEGIC_DECISION_FRAMEWORK.md`, and `docs/CODEBASE_DEEP_DIVE_STUDY.md`.
2. Perform a Devil's Advocate sanity check:
   - Does this introduce hidden risks or break existing tests?
   - Is it too complex for a local laptop?
   - Does it violate the Vanilla JS / Local-First architecture?
3. Give me your honest GREEN LIGHT (Approve), YELLOW LIGHT (Modify), or RED LIGHT (Reject) recommendation with reasons.
```

---

### Scenario 8: Autonomous Post-Roadmap Planning
* **Goal:** When all previous roadmaps and planned builds are finished, the AI autonomously inspects the live codebase and formulates the next evolution based on real system benchmarks.

```text
Hello AI! Please assume the role of [@architect] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: AUTONOMOUS POST-ROADMAP PLANNING (GROUND-TRUTH AUDIT)

MY GOAL:
All previous roadmap builds are complete! I need you to autonomously determine the current state of Marciale-OS and propose the next evolutionary milestone.

YOUR TASK:
1. Follow Protocol 3 (Dynamic State Reconstruction) in `docs/STRATEGIC_DECISION_FRAMEWORK.md`.
2. Inspect the live codebase, run `npm test`, and audit system performance (DOM redraw speeds, memory leaks, test coverage gaps).
3. Formulate a 3-build sequence for our next milestone, scored with the 4-Axis SPI formula.
4. Present your strategic recommendation for my approval as Project Director.
```

---

### Scenario 9: The Mosaic Council (When I Am Lost / Clueless)
* **Goal:** You are tired, lost, or don't know what to do next. The 5 tactical cells assemble, audit the system, and present a 3-option menu for your final veto/approval.

```text
Hello AI! I am the Project Director of Marciale-OS. 
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: MOSAIC AUTONOMOUS COUNCIL PROTOCOL (LAW IX)

SITUATION:
I am currently lost / clueless on what to do next. I do not have a specific build in mind.

YOUR AUTONOMOUS DIRECTIVE:
1. Activate Law IX (The Mosaic Council Protocol) from `docs/AI_RULES.md`.
2. Have all 5 tactical cells (@sentinel, @forge, @mind, @sre, @architect) audit their respective areas using live code and `npm test`.
3. Synthesize the findings into a standard Mosaic Council Report per `docs/STRATEGIC_DECISION_FRAMEWORK.md`.
4. Present the Top 3 Actionable Options (Option A: Recommended, Option B: Alternative, Option C: Experimental), scored with the 4-Axis SPI formula.
5. Provide a simple VETO / APPROVAL prompt so I can make the final decision with one short reply!
```
