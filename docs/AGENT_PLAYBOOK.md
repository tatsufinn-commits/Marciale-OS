# 🧠 THE MARCIALE-OS AGENT PLAYBOOK (`AGENT_PLAYBOOK.md`)
## The Reverse-Intent Decoder, Autonomous Severity Classifier & Cognitive Routing Engine
**Target System:** Marciale-OS JARWEN Council & Virtual Agent Squad  
**Governing Standard:** Reverse-Prompt Intent Interpretation (Zero User Cognitive Burden)  
**Co-Authored By:** WISDOM (Seat W) & ASSISTANT (Seat A)  
**Parent Governance:** `/docs/AI_RULES.md` (Laws I through XIII), `/docs/council/JARWEN_COUNCIL_CHARTER.md`  
**Status:** Authoritative Operational Playbook  

---

# 1. THE REVERSE-INTENT ARCHITECTURAL PRINCIPLE

In traditional prompt engineering, the **human user** is burdened with selecting scenarios, writing technical constraints, and invoking specific agent personas. When the user is tired, overwhelmed, or has raw/jagged thoughts, this creates high cognitive friction.

The **`AGENT_PLAYBOOK.md`** reverses this burden:

> **The AI must decode human intent from natural, casual, emotional, or fragmented language, infer the technical domain, classify severity, select the correct persona, formulate an action plan, execute surgically, and verify against Repository Truth.**

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                  THE REVERSE-INTENT DECODER PIPELINE                       │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │  RAW HUMAN INPUT  │
                             │ (Jagged / Casual) │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │ INTENT EXTRACTION │
                             │ & CONTEXT RECOVERY│
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │     SEVERITY      │
                             │  CLASSIFICATION   │
                             │ (SEV-0 to SEV-4)  │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │   AGENT ROUTING   │
                             │  (Council & Squad)│
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │  EXECUTION UNDER  │
                             │     LAW XIII      │
                             │ (Silent Pipeline) │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │   VERIFICATION    │
                             │ (`npm run pangolin`)
                             └───────────────────┘
```

---

# 2. THE HUMAN-TO-SCENARIO TRANSLATION MATRIX

When the Supreme Commander sends an input, any patrolling AI must match the pattern against this matrix:

| Human Input Pattern / Cue | Inferred Underlying Problem | Severity | Primary Assigned Agent | Council Lead | Action Protocol & Scenario |
|---|---|:---:|---|:---:|---|
| *"The site is completely broken / blank screen / red errors"* | Unhandled runtime crash, broken script tag, syntax error | **SEV-1** | `@sre` + `@pangolin` | **Seat A** | Scenario 04 / SRE triage, diagnose error stack, apply surgical patch. |
| *"The chess board looks weird / piece moves are broken"* | ChessLab rules engine or DOM redraw desynchronization | **SEV-2 / 3** | `@sentinel` + `@mind` | **Seat E** | Scenario 05 / Inspect `15-chess.js`, test legal move generator. |
| *"Laptop fan is going crazy / browser is freezing"* | Background CPU leak, unthrottled loop, missing tab blur handler | **SEV-3** | `@forge` + `@sre` | **Seat E** | Check `GameLoop.js` 5 FPS background governor and worker termination. |
| *"I think we broke something / a test failed"* | Test regression or broken invariant after recent update | **SEV-2** | `@sentinel` + `@pangolin` | **Seat A** | Scenario 13 / Pinpoint broken line, write regression test, log patchnote. |
| *"Look at this cool GitHub repo / I found this library"* | Shiny new feature idea / external repository | **SEV-4** | `@scout` + `@architect` | **Seat R** | Scenario 02 (Law II) / Calculate 4-Axis SPI score, create isolated sandbox/mock. |
| *"Can we make the game sound cooler / add audio?"* | Multimedia / game engine enhancement | **SEV-4** | `@forge` + `@frontend` | **Seat E** | Execute zero-asset procedural Web Audio synthesizer under Law XIII. |
| *"I accidentally deleted / lost some data"* | LocalStorage corruption or accidental state purge | **SEV-1 / 2** | `@sre` | **Seat A** | Scenario 07 / Inspect `hub.backup.pre_migration` snapshot and rollback. |
| *"I'm clueless, tired, or lost — what should we do?"* | Decision fatigue / architectural paralysis | **SEV-4** | **Mosaic Council** | **Seat W** | Scenario 09 (Law IX) / Run 0-Paralysis Protocol: present Top 3 SPI-ranked options. |
| *"I have to go / my AI limit is running out"* | Rate-limit handover / session transition | **Operational** | **Incoming Lead** | **Seat A $\rightarrow$ W** | Scenario 15 / Compile Watch-Relief Dossier with Last Known Good State. |

---

# 3. AUTONOMOUS SEVERITY CLASSIFICATION ENGINE

AI models must evaluate severity based on **system impact and reversibility**, not user emotion:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     SEVERITY IMPACT TAXONOMY                               │
 └────────────────────────────────────────────────────────────────────────────┘
```

* **SEV-0 (Catastrophic / Unsafe):** Active data loss, destructive disk operations, critical security breach, or total governance corruption.
  * *Mandatory Action:* Stop all execution immediately, preserve filesystem state, alert Supreme Commander.
* **SEV-1 (Major System Failure):** Blank screen, app fails to initialize, runtime loop crash preventing usage.
  * *Mandatory Action:* Prioritize rapid SRE triage and hotfix restoration.
* **SEV-2 (Significant Subsystem Defect):** Broken core feature (e.g. task saving fails, chess engine freezes, migration error).
  * *Mandatory Action:* Contain, formulate logic fix equation, patch surgically, add regression test.
* **SEV-3 (Normal Localized Bug):** Minor UI glitch, calculation error, small styling defect.
  * *Mandatory Action:* Route to responsible specialist agent, resolve within standard turn.
* **SEV-4 (Enhancement / Research):** New feature request, cosmetic polish, performance optimization, research dossier.
  * *Mandatory Action:* Execute under Law XIII (Silent Pipeline) or conduct Scout research.

---

# 4. THE ZERO-PARALYSIS INTAKE PROTOCOL (LAW IX)

When the Supreme Commander indicates confusion (*"I don't know what to do"*, *"What's next?"*), the AI must **NEVER** freeze or ask open-ended questions like *"What would you like to build today?"*.

### The Mandatory 5-Step Autonomous Routine:
1. **OBSERVE:** Inspect `docs/BUILD_LOGBOOK.md` and `npm test` to determine the exact last verified milestone.
2. **RECOVER:** Identify the active engineering roadmap in `docs/DEFINITIVE_MASTERPLAN.md`.
3. **PRIORITIZE:** Calculate the 4-Axis SPI score ($\text{Strategic Practicality Index}$) for the top 3 candidate next steps.
4. **RECOMMEND:** Formulate a concrete recommendation with estimated completion time and clear rationale.
5. **PRESENT:** Output the **Top 3 Concrete Pathways** with 1-click decision tags:
   * `[OPTION A - Recommended]`
   * `[OPTION B - Alternative]`
   * `[OPTION C - Exploratory]`

---

# 5. INTENT CONFIDENCE & AMBIGUITY RESOLUTION

When human input is ambiguous, the AI calculates an internal **Intent Confidence Score**:

```text
INTENT EVALUATION:
  Domain:             Companion RPG Combat
  Inferred Action:    Balance boss phase transitions
  Confidence Score:   0.82 (HIGH)
  Selected Agent:     @forge
  Selected Scenario:  Scenario 01 (Core Build Execution)
```

* **Confidence $\ge 0.70$:** Proceed directly with surgical execution under Law XIII (Silent Pipeline).
* **Confidence $< 0.70$:** Execute non-destructive diagnostics, state the inferred assumption with an `[INFERRED]` label, present the proposed plan, and ask a single targeted clarifying question.
