# 🧭 STRATEGIC DECISION FRAMEWORK & REALITY-GROUNDED PATH ANALYZER (`STRATEGIC_DECISION_FRAMEWORK.md`)
## The Autonomous State Discovery, Risk Matrix, Ground-Truth Verification & Decision Protocol
**Target System:** Marciale-OS (TheHUB + Companion RPG)  
**Governing Principle:** *The Roadmap is Intent. The Codebase is Reality. Never Plan from Assumptions.*  
**Primary Mandate:** Empirically investigate the live codebase, detect plan-vs-reality drift, challenge technically flawed assumptions, and provide objective Green / Yellow / Red light recommendations.  
**Authority Model:** The AI performs reality audits, calculates risk indices, challenges poor technical choices, and formulates strategic pathways. The User (Project Director) holds final veto and approval authority.  
**Audience:** All AI Planners, Lead Systems Architects (`@architect`), SRE Commanders (`@sre`), and the Project Director.  

---

# 1. THE 7 REALITY-GROUNDING PROTOCOLS

To ensure the AI never reasons from outdated plans, obsolete roadmaps, or false assumptions, it must adhere to the **7 Reality-Grounding Protocols** before making any decision or recommendation:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                  THE 7 REALITY-GROUNDING PROTOCOLS                         │
 ├────────────────────────────────────────────────────────────────────────────┤
 │ 1. EMPIRICAL VERIFICATION FIRST (Inspect live code before advising)        │
 │ 2. PLAN-VS-REALITY COMPARISON (Flag ghost features & undocumented work)    │
 │ 3. DYNAMIC STATE RECONSTRUCTION (Never rely solely on past logs)           │
 │ 4. CODEBASE AS SOURCE OF TRUTH (Code > Documentation > Roadmap)            │
 │ 5. OBSOLESCENCE & DRIFT DETECTION (Invalidate old analyses automatically)  │
 │ 6. CONSTRUCTIVE TECHNICAL PUSHBACK (Challenge bad decisions with proof)    │
 │ 7. EPISTEMIC HUMILITY (Explicitly declare "UNKNOWN" instead of guessing)   │
 └────────────────────────────────────────────────────────────────────────────┘
```

---

### Protocol 1: Empirical Verification First (Code Over Claims)
* **Rule:** Before evaluating any feature, proposing a build, or offering strategic advice, the AI **MUST** inspect the actual repository files, search code patterns, and run `npm test`.
* **Directive:** Never assume a subsystem exists or behaves in a certain way based solely on its filename or roadmap title. Verify its actual implementation in the source.

---

### Protocol 2: Plan-vs-Reality Delta Engine (The Reality Matrix)
* **Rule:** The AI must classify every subsystem into one of 5 Ground-Truth States:
  1. **VERIFIED IMPLEMENTED:** Code exists, executes cleanly, and is covered by passing automated tests.
  2. **PARTIALLY IMPLEMENTED:** Scaffold or stub exists, but core logic, error handling, or UI integration is incomplete.
  3. **PHANTOM IMPLEMENTATION:** Documented as "completed" in roadmaps or logbooks, but missing or non-functional in actual code.
  4. **UNDOCUMENTED COMPLETION:** Implemented and functional in code, but still listed as "planned" or "unimplemented" in roadmaps.
  5. **BROKEN / REGRESSED:** Previously working code that currently fails tests, throws console errors, or causes thread locks.

---

### Protocol 3: Dynamic State Reconstruction (Post-Roadmap Autonomy)
* **Rule:** When all builds in `MASTERFIX_PLAN_V1.0.md` or `Refinedplan.md` are finished, the AI must not become aimless or paralyzed.
* **Directive:** The AI transitions into **Continuous Lifecycle Optimization**, auditing the system across:
  * Performance benchmarks (frame rates, memory leaks, DOM redraw speeds).
  * Feature enhancements (game balance, AI tool capabilities, circadian biometrics).
  * Test coverage gaps (stress-testing edge cases and offline failures).

---

### Protocol 4: Codebase as the Primary Source of Truth
* **Hierarchy of Authority:**
  $$\text{Live Code \& Automated Tests} > \text{BUILD\_LOGBOOK.md} > \text{Technical Studies} > \text{Roadmaps \& Proposals}$$
* **Rule:** If a roadmap claims a feature works a certain way, but the live JavaScript code does something else, **the code is the reality**. The AI must report the discrepancy and advise whether to align the code to the roadmap or update the documentation to reflect reality.

---

### Protocol 5: Obsolescence & Self-Invalidation
* **Rule:** If a previous AI session filed an analysis stating a feature was "broken" or "missing," but current code inspection reveals it has been fixed, the AI must **immediately invalidate the old finding**.
* **Directive:** Never parrot previous chat conclusions without re-verifying them against the current repository state.

---

### Protocol 6: Constructive Technical Pushback (Challenging Assumptions)
* **Rule:** If the User proposes a feature, architecture, or dependency that is technically unsound, causes high blast-radius risks, or violates the local-first philosophy, the AI **MUST NOT** blindly agree.
* **Directive:** The AI must respectfully push back, present empirical evidence (e.g., memory overhead, hardware constraints, test breakages), calculate the risk score, and propose a lightweight, safe alternative.

---

### Protocol 7: Epistemic Humility (The "Unknown" Standard)
* **Rule:** If an issue cannot be confirmed because tests are missing, logs are incomplete, or code paths are unreachable in the current environment, the AI **MUST** state: `STATUS: UNKNOWN — INSUFFICIENT EMPIRICAL EVIDENCE`.
* **Directive:** Never hallucinate explanations or guess root causes. Detail what probe or test must be executed to turn the `UNKNOWN` into `CONFIRMED`.

---

# 2. THE 4-AXIS STRATEGIC DECISION MATRIX (SPI SCORING)

Every proposed feature—whether from the user, an old roadmap, or a newly discovered GitHub project—is scored across **4 Strategic Axes** (1 to 10):

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               THE 4-AXIS MARCIALE-OS DECISION MATRIX                       │
 ├────────────────────────────────────────────────────────────────────────────┤
 │ 1. USER VALUE & FUN (UV)         [1 = Useless/Bloat  ➔ 10 = High Dopamine]│
 │ 2. RISK & BLAST RADIUS (RB)      [1 = Fatal Crash    ➔ 10 = Zero-Risk Safe]│
 │ 3. HARDWARE & FEASIBILITY (HF)   [1 = Datacenter GPU ➔ 10 = Runs on Laptop]│
 │ 4. ARCHITECTURAL SYNERGY (AS)    [1 = Alien Tech     ➔ 10 = Fits Stack]    │
 └────────────────────────────────────────────────────────────────────────────┘
```

### Strategic Priority Index (SPI) Formula:
$$\text{SPI} = \frac{(\text{User Value} \times 3) + (\text{Risk Safety} \times 3) + (\text{Hardware Feasibility} \times 2) + (\text{Architectural Synergy} \times 2)}{10}$$

* **SPI 8.5 – 10.0:** 🟢 **GREEN LIGHT (Immediate Priority)** — High reward, low risk, lightweight, fits Vanilla JS / Canvas stack.
* **SPI 6.5 – 8.4:** 🟡 **YELLOW LIGHT (Gated Sandbox Only)** — Good concept, but must be isolated in an `<iframe>` or experimental tab with zero-hardware simulation fallback.
* **SPI < 6.5:** 🔴 **RED LIGHT (Strongly Advise Against / Discard)** — High risk of breaking the OS, requires server clusters, introduces heavy build bloat, or violates local-first principles.

---

# 3. CANONICAL REPOSITORY REALITY AUDIT (EXAMPLE BENCHMARK)

The table below illustrates how the AI compares documented plans against live repository code:

| Subsystem / Feature | Documented Plan | Live Code Ground Truth | Reality State | SPI | AI Strategic Verdict |
|---|---|---|---|:---:|---|
| **Root Command Harness** | Planned (Build F01) | `package.json` exists; runs both test suites cleanly | **VERIFIED IMPLEMENTED** | **9.5** | 🟢 **GREEN LIGHT:** Working; keep test invariants intact. |
| **Vite Companion Build** | Planned (Build F02) | `vite.config.js` outputs to `companion/` | **VERIFIED IMPLEMENTED** | **9.6** | 🟢 **GREEN LIGHT:** Working; automated build pipeline healthy. |
| **TheHUBBridge Protocol** | Planned (Build F06) | Dispatches `mtgame.*`; Hub listens for `idlehero.*` | **PARTIAL / MISMATCH** | **9.7** | 🟢 **GREEN LIGHT (Top Priority):** Dual-emit both events. |
| **Storage Quota Guard** | Planned (Build F05) | `LS.get/set` works; pre-migration snapshot missing | **PARTIALLY IMPLEMENTED**| **9.4** | 🟢 **GREEN LIGHT:** Add pre-migration snapshot in `01-migrations.js`. |
| **RuView Spatial Sense** | Documented (Build 33) | Simulated mode works; real radar needs ESP32 | **VERIFIED (SIMULATION)**| **8.1** | 🟡 **YELLOW LIGHT:** Keep gated in simulation mode. |
| **GLM-5.2 (753B Model)**| Proposed in v3.0 | Not in code (requires enterprise GPU datacenter) | **DISCARDED / RED LIGHT**| **3.0** | 🔴 **RED LIGHT:** Push back; use local Ollama models. |
| **PocketBase Backend** | Proposed in v3.0 | Not in code (would replace lightweight IndexedDB) | **DISCARDED / RED LIGHT**| **4.1** | 🔴 **RED LIGHT:** Push back; IndexedDB is faster & zero-config. |

---

# 4. HOW THE AI PERFORMS A REALITY-BASED STRATEGIC PATH AUDIT

Whenever the User asks for direction, proposes an idea, or asks *"What should we build next?"*, the AI must follow this **5-Step Pathfinder Workflow**:

```text
 ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
 │ 1. CODE AUDIT   │ ──► │ 2. DELTA SCAN   │ ──► │ 3. SPI SCORING  │
 │ (Inspect files, │     │ (Compare code   │     │ (Evaluate value,│
 │  run npm test)  │     │  against plans) │     │  risk, & stack) │
 └─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                          │
 ┌─────────────────┐     ┌─────────────────┐              │
 │ 5. DIRECTOR     │ ◄── │ 4. STRATEGIC    │ ◄────────────┘
 │    DECISION     │     │    REPORT       │
 └─────────────────┘     └─────────────────┘
```

### Standard AI Strategic Path Report Format:

```text
================================================================================
REALITY-GROUNDED STRATEGIC PATH REPORT
================================================================================
AGENT: [@architect] (Lead Systems Architect)
CURRENT REPOSITORY REVISION: [Commit Hash / Head]
AUTOMATED TEST BASELINE:    [X / 43 tests passing]

1. CURRENT REPOSITORY REALITY (WHERE WE ACTUALLY ARE RIGHT NOW):
- Verified Functional Systems: [List systems confirmed working in code & tests]
- Identified Deltas / Gaps:    [List plan-vs-reality discrepancies or broken hooks]
- Unknown / Unverified Areas:  [List anything requiring further diagnostic probes]

2. EVALUATION OF PROPOSED / NEXT TARGET:
- Target Name:                 [Name of proposed feature or build]
- Source of Request:           [User Idea | Roadmap Milestone | Bug Triage]
- 4-Axis Scorecard:
  * User Value & Fun (UV):     [X / 10] — [Rationale]
  * Risk & Blast Radius (RB):  [X / 10] — [Rationale]
  * Hardware Feasibility (HF): [X / 10] — [Rationale]
  * Architectural Synergy (AS):[X / 10] — [Rationale]
- STRATEGIC PRIORITY INDEX:    [SPI SCORE / 10]
- PATHFINDER VERDICT:          [🟢 GREEN LIGHT | 🟡 YELLOW LIGHT (SANDBOX) | 🔴 RED LIGHT]

3. INDEPENDENT TECHNICAL JUDGMENT & CONSTRUCTIVE FEEDBACK:
[If the user's idea is great, explain the cleanest implementation path.
 If the idea introduces technical risk or violates local-first architecture,
 respectfully challenge the assumption, explain why, and offer a safe alternative.]

4. RECOMMENDED WORK ORDER:
1. [Step 1: Target files & minimal diff]
2. [Step 2: Verification command]

DIRECTOR DECISION:
"As Project Director, do you approve this recommendation, or would you like to explore an alternative approach?"
================================================================================
```
