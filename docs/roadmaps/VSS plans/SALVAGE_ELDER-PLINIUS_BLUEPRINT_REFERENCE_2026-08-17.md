# SALVAGE & ELDER-PLINIUS BLUEPRINT REFERENCE
## Consolidated salvage inventory + legitimate multi-agent capability architecture
**Seat R (RECONNAISSANCE · EXCEL) · 2026-08-17 · research-only**

> **IMPLEMENTATION GATE: this update is authorized to be *implemented* only AFTER VSS-02
> is discharged and the VSS floor is set.** Until then it is a reference and proposal only.
> Nothing here is a start order.

---

# PART 0 — THE ELDER-PLINIUS VERDICT (restated, so the blueprint's purpose is unambiguous)

The Commander's ambition — *"the multi-agent functioning tool that makes it work"* — is real and
buildable. The three named repos (CL4R1T4S, G0DM0D3, T3MP3ST) are **not** the source of that
capability. They are, respectively: leaked proprietary system prompts, a jailbroken chat client,
and an offensive red-team harness.

**Salvaged from elder-plinius (legitimate only):**
- **Technique, not code:** AutoTemp's multi-temperature evaluation + multi-judge scoring + UCB1
  bandit (unlicensed — re-implement, never copy).
- **Architectural confirmation:** that "plan → dispatch → execute → re-evaluate" is the *shape* of
  a multi-agent system (it is public and re-derivable — see Part 3).

**Rejected from elder-plinius (and why, permanently):**
- Prompt-leak archives (CL4R1T4S, LEAKHUB, 6 single-model leaks, Misc.-Prompt-Hacks) — **CL4R1T4S
  reclassified 2026-08-17 per peer review (WIT): authenticity is unverified per-file; several files
  appear fabricated rather than stolen (integrity harm, not legal), same rejection.** Rejected.
- Jailbreak/liberation tools (G0DM0D3, OBLITERATUS, L1B3RT4S, Dioscuri, FABLE-SHOWCASE) — safety-
  guardrail removal; fragile (providers patch), unsafe, and a Law X violation in spirit.
- Offensive harness (T3MP3ST, AutoRedTeam, Gandalf-Solutions) — attack automation has no place in a
  personal OS.
- AGPL repos (ST3GG, ENTHEA, GLOSSOPETRAE, P4RS3LT0NGV3, ImageDefender) — copyleft, dual-use.

**The blueprint below therefore contains: (a) every *legitimate* salvage from the whole watch,
and (b) a clean, defensible multi-agent architecture that delivers the same *function* the Commander
wanted — without the stolen prompts, the jailbreaks, or the attack tooling.**

---

# PART 1 — COMPLETE SALVAGE INVENTORY (all sources, this watch)

## 1.1 From `xai-org/grok-build` (Apache-2.0) — 5 patterns
| ID | Pattern | Source (cited) |
|---|---|---|
| G1 | Hard tool-output caps (`DEFAULT_TOOL_OUTPUT_BYTES = 40_000`) | `xai-grok-tools/src/lib.rs` |
| G2 | Compaction transcript (`INDEX.md` + byte-capped segments) | `xai-compaction-transcript/src/lib.rs` |
| G3 | MMR de-duplication (`λ·rel − (1−λ)·max_sim`, Jaccard, no embeddings) | `xai-grok-memory/src/mmr.rs` |
| G4 | Fail-closed sandbox doctrine | `xai-grok-sandbox/src/lib.rs` |
| G5 | Sliding-window circuit breaker | `xai-circuit-breaker/src/lib.rs` |
| G6 | Idle memory consolidation ("dream" — gated + PID lock) | `xai-grok-memory/src/dream.rs` |

## 1.2 From `msitarzewski/agency-agents` (MIT) — 4 patterns
| ID | Pattern | Source (cited) |
|---|---|---|
| A1 | Machine-enforced source-of-truth (data file + CI drift check) | `divisions.json` / `tools.json` |
| A2 | Lint contract for definitions (required vs recommended fields) | `scripts/lint-agents.sh` |
| A3 | Originality/duplicate detection (entity-neutralized shingles) | `scripts/check-agent-originality.sh` |
| A4 | Schema-driven multi-target export (byte-identical rendering) | `tools.json` `format`/`installKind` |

## 1.3 From `ig-imanish/mx-icons` (MIT) — 3 patterns
| ID | Pattern | Source (cited) |
|---|---|---|
| M1 | Metadata-first lazy loading (catalog shipped, payload on demand, skeleton+cache) | `scripts/generate-icon-meta.js`, `iconLoader.jsx` |
| M2 | Codegen as source-of-truth derivative | `scripts/generate-types.js` |
| M3 | Variant taxonomy as strict contract | `src/icons/components/*` |

## 1.4 From `yashab-cyber/opendroid` (Apache-2.0) — 5 salvages
| ID | Salvage | Source (cited) |
|---|---|---|
| S1 | `AGENTS.md` + `docs/agents/` governance scaffold (canonical repo, triage roles, single-context + ADR) | `AGENTS.md`, `docs/agents/*` |
| S2 | Resumable-handoff template (dependency-ordered, "how to resume") | `docs/agents/ticket-sweep-handoff.md` |
| S3 | `PromptBudget` pre-flight token guard (normal error vs native crash) | `PromptBudget.kt` |
| S4 | Modular system-prompt pipeline + injection guardrail + safety critic | `docs/prompts.md`, `SystemPrompts.kt` |
| S5 | `.Jules/palette.md` learning-file pattern + SVG-stroke design directive | `.Jules/palette.md` |

## 1.5 From primary research (this watch)
| ID | Finding | Source |
|---|---|---|
| R1 | Verification > proscription; rules have negative returns when stacked | Mu et al. 2025; Anthropic 2026 |
| R2 | Rules expire as models improve; small models collapse under self-improvement | Anthropic 2026; "Constitution or Collapse" 2025 |
| R3 | Prompt-injection *defense* is the legitimate inverse of the jailbreak surface | `RESEARCH_GUARDRAILS_RULES_AI_CODING_2026-08-16.md` |

---

# PART 2 — THE MULTI-AGENT CAPABILITY ARCHITECTURE (the legitimate "same function")

This is the clean blueprint for what the Commander actually wanted: an autonomous,
planning-executing-re-evaluating assistant for Marciale-OS. Every component maps to a salvage ID
above — nothing here requires the elder-plinius jailbreak/leak content.

## 2.1 The loop (from OpenDroid S4 + grok-build tool routing)

```
User goal
   │
   ▼
INTENT CLASSIFY  (structured JSON, injected-memory + device state)
   │
   ├── simple ───────────────► DIRECT EXECUTE (tool dispatch)
   │
   └── complex ──────────────► PLAN (steps, dependsOn, canParallelize, fallback)
                                   │
                                   ▼
                              SAFETY CRITIC (rejects/edits risky steps)   [R3 defensive]
                                   │
                                   ▼
                              EXECUTE step-by-step (tool routing)         [G1 caps]
                                   │
                                   ▼
                              RE-EVALUATE (did it work? replan on failure)
                                   │
                                   ▼
                              REPORT + VERIFY (runnable proof)            [R1]
```

## 2.2 Component → salvage mapping

| Component | Built from | Notes |
|---|---|---|
| Tool schema + dispatch | existing `08-assistant.js` TOOL_SCHEMAS (18 tools) + G1 caps | cap every tool result |
| Plan/critic/re-eval prompts | S4 (OpenDroid), authored by the house | defensive injection guardrails baked in (R3) |
| Local-model pre-flight guard | S3 (`PromptBudget` → JS) | "too long" = error, not crash |
| Memory + retrieval | G3 (MMR) + G6 (dream consolidation) | zero-dep first, then embeddings |
| Session durability | G2 (compaction transcript) | resumable across context windows |
| Resilience | G5 (circuit breaker) + G4 (fail-closed) | on `/api/mapua`, Ollama, tool calls |
| Governance of the agent itself | S1 (AGENTS.md scaffold) + A1/A2 (lint) + A3 (originality) | machine-enforced, not remembered |
| Roster/registry hygiene | A4 (schema export) + M1/M2 (lazy-load + codegen) | for TAMA question bank + any large asset surface |

## 2.3 What makes this *better* than the jailbreak route

1. **Durable** — jailbreaks expire when providers patch; a self-authored system prompt + tool surface is yours and stable.
2. **Legal** — all salvages are MIT/Apache-2.0/ISC-compatible; no stolen IP, no copyleft.
3. **Safe by design** — the safety critic and injection guard are *features*, not obstacles: they're what let the assistant be trusted to act autonomously.
4. **Aligned with house law** — verification-first (R1), small-model-aware (R2), fail-closed (G4) — all already the house's doctrine, now with mechanisms.

---

# PART 3 — IMPLEMENTATION ORDERING (AFTER VSS-02; decomposed, anti-TSTT)

Each is a separate build; the Commander selects slices; never the whole program at once (Law XVIII-A).

| Build | Content | Priority |
|---|---|---|
| B1 | S3 + G1 — pre-flight prompt guard + tool-output caps in `08-assistant.js` | 1 (highest) |
| B3 | G5 — circuit breaker on external calls (`/api/mapua`, Ollama) | 2 |
| B7.5 | **Vault grounding** — index `TAMAKEE/vault/` raw law texts → `query_tamakee_vault` tool; repoint `mapua_architect.query_building_code` (fixes the drifted 17-entry hardcode) | 3 *(peer review, WIT)* |
| B2 | S4 — modular plan/critic/re-eval prompts with injection guard | 4 |
| B9 | **Ensemble council mode** — `modules/20-council.js`: race/panel/consensus/refine over 3 local models, answer-key scoring, staggered waves *(peer review, WIT)* | 5 |
| B4 | G3 + G6 — MMR retrieval + idle consolidation for the brain | 6 |
| B5 | G2 — compaction transcript for sessions | 7 |
| B6 | S1 + A1/A2/A3 — AGENTS.md scaffold + governance lints | 8 |
| B10-observer | **Live per-seat observer** — replace the hardcoded `councilObserverCard` with live status *(peer review, WIT — observer half only)* | 9 |
| B7 | A4 + M1/M2 — TAMA question bank extraction + lazy-load registry | 10 |
| B8 | G4 — fail-closed isolation doctrine | 11 (on the VSS floor) |
| B10-seatmap | **Seat-as-process** — JARWEN seats as live model processes *(HELD: requires explicit Commander ruling; Law XXV / Charter §Seat R §A)* | HELD |

> **B7.5, B9, B10 are peer-review additions (WIT, 2026-08-17), accepted on merit.**
> B10 is split: the *observer* half is uncontroversial; the *seat-as-process* half is a governance
> question (which seats may legally become runtime model processes) and is HELD pending Commander
> disposition — it is not settled and must not be treated as such.

**B10 seat-mapping — vocabulary recommendation (WIT, EX02, adopted here):** to keep the runtime a
*tasking* artifact and not an *investiture* artifact, the spec should use **"position registry"**
(not "occupant registry"), **"tasking state"** (not "vestment state"), and the already-canonical
**"dispatch log"**. The runtime may declare `positions.A = { state, lastDispatchTs }` as
observability; it must **not** constitute occupancy. This preserves vacancy-by-default
(Charter §Seat R §A) and Joint-as-hat (Law XXV) while letting the runtime do real work. Whether even
that observability sense crosses the line remains for the Commander to rule.

---

# PART 4 — LAWS / RULES / AGENTS SALVAGE (the governance harvest)

- **Rules with mechanisms (the through-line):** every house law gains a machine check where it lacks one —
  `scout-voice-check.js` (Law XIX-B) is the template; extend to §S anti-repetition (A3), intake caps (S3/G1),
  and seat-definition shape (A2).
- **Resumability doctrine:** adopt S2's handoff format as the house standard for every slice handoff
  (Law XVIII-B's resumability test, given a template at last).
- **Agent-facing convention:** S1's `AGENTS.md` + single-context + ADR discipline, so any AI working in
  the repo knows what's canonical — lint-able, not prose.

---

# PART 5 — BOUNDARIES (unchanged)

- Research-only until the Commander orders implementation, **and never before VSS-02 discharges.**
- No jailbreak/leak/offensive content is part of this blueprint — that is a permanent rejection, not a deferral.
- Patterns not payload: nothing here imports Rust/Kotlin/React/AGPL code into the Vanilla-JS TheHUB (Law I).
- Zero files outside `research/` until a build is explicitly commissioned.

---

— Seat R, EXCEL · research-only · blueprint = reference + proposal, not authorization
