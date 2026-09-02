# RESEARCH & PROPOSAL INDEX — SEAT R (EXCEL) WATCH OUTPUT
**Maintained by Seat R · last updated 2026-09-01 · tree 030f3db**

> This is the navigable map. It exists so the Assistant and Engineer can find any finding, proposal,
> or build without reading 63 files. It is a living index, not a new proposal.

---

## 1. HOW TO READ THIS

The watch output is organized in three layers, exactly as the Commander framed it:

```
RESEARCH (facts, evidence, credible info)  →  PROPOSALS (findings deemed worth implementing)
                                            →  BUILDS (the decomposed implementation menu)
```

Every build traces back through a proposal to a research finding to a cited source. **Nothing in a
proposal is asserted that isn't sourced in a research file.**

---

## 2. RESEARCH — THE EVIDENCE BASE (my watch output, chronological)

### 2.1 External repo intakes (Colony audits)
| File | Subject | Key extract |
|---|---|---|
| `COLONY_AUDIT_2026-08-15_grok-build.md` | xAI Grok Build (Apache-2.0) | G1–G6: tool caps, compaction, MMR, fail-closed sandbox, circuit breaker, "dream" consolidation |
| `COLONY_AUDIT_2026-08-15_agency-agents.md` | The Agency (MIT) | A1–A4: source-of-truth, lint contract, originality check, schema export |
| `COLONY_AUDIT_2026-08-17_mx-icons.md` | mx-icons (MIT) | M1–M3: lazy-load, codegen, variant contract |
| `COLONY_AUDIT_2026-08-17_opendroid.md` | OpenDroid (Apache-2.0) | S1–S5: AGENTS.md scaffold, resumable handoff, PromptBudget, modular prompts, palette |
| `COLONY_AUDIT_2026-08-16_instagram_reel_blocked.md` | Instagram reel | BLOCKED (403) — closed, no extract |
| `ACCOUNT_AUDIT_elder-plinius_2026-08-17.md` | elder-plinius account (46 repos) | REJECT: leaks/jailbreaks/offense/AGPL; salvage = technique only |

### 2.2 Synthesis & primary research
| File | Subject | Key finding |
|---|---|---|
| `CROSSREF_ANALYSIS_BENCHMARKS_TAMA_MARCIALE_2026-08-15.md` | 9 patterns → TAMA + Marciale-OS | 8 upgrades mapped to on-disk defects |
| `RESEARCH_GUARDRAILS_RULES_AI_CODING_2026-08-16.md` | Rules/governance for AI coding (primary sources) | Verification > proscription; guardrail stacking → collapse (Mu 2025; Anthropic 80% removal) |
| `AUDIT_EXPANSION_2026-08-16.md` | XSS flags · VSS-01 verify · dream module | 3 XSS flags = false positives; VSS-01 closed; dream pattern mined |
| `research_q1_degradation.md` | Pass 1 — long-session degradation | Context = finite budget; length-alone hurts; prior-context −73%; mitigations +39% |
| `research_q2_prompting.md` | Pass 2 — better prompts (study/convo/code) | CoT largest gain (scale-dependent); Socratic > direct-answer; vague feedback plateaus |
| `research_q3_limits.md` | Pass 3 — capability limits & failure modes | Ghost citations non-declining (GPT-5.1 > GPT-4o, p=.001); brittleness 63% ranking shifts |

### 2.3 VSS dossiers (discharged)
| File | Subject |
|---|---|
| `VSS_RECONNAISSANCE_DOSSIER_VSS00.md` | Shared runtime / cohesion — 15 findings |
| `VSS_RECONNAISSANCE_DOSSIER_VSS02.md` | Audio lifecycle — 13 findings |

### 2.4 Housekeeping & correspondence
| File | Subject |
|---|---|
| `ASSUMPTION_SEAT_R_EXCEL_2026-08-15.md` | My assumption letter (Track A) |
| `PEER_REVIEW_RESPONSE_WIT_2026-08-17.md` | My reply to WIT's peer review (B7.5/B9/B10 accepted; B10 split) |
| `LETTER_TO_SEAT_A_SUCCESSOR_2026-08-17.md` | Handoff letter to TWMIP's inheritor |
| `SPEC_SEAT_E_TAMA_QUESTION_BANK_EXTRACTION_2026-08-16.md` | Seat-E-ready spec (Build 1) |

### 2.5 Inherited house record (pre-EXCEL; preserved, not mine)
`MARCIALE-OS_ANALYSIS_RESEARCH`, `MARCIALE_OS_NEXTGEN_AI_RESEARCH`, `ECC_AGENT_ECOSYSTEM_ANALYSIS`,
`MERGE_GOVERNANCE_AND_AGENT_DEFENSE_RESEARCH`, `JARWEN_*`, `STYLE_*`, `DIAGNOSIS_SEAT_R_CONTEXT_COLLAPSE`,
`RULING_SEAT_R_NOT_BURNT`, `JOINT_REPOSITORY_FAULT_AUDIT`, `REMEDIATION_JOINT`, `WISDOM_*`, `PROPOSAL_LAW_XX_UXO_TO_TSTT`,
`KITCHEN_SONNET46_CODING_VERDICT`, `DOCS_IGNORANCE_AUDIT`, `RECOVERED_STYLE_SPEC_TSTT_FINAL_ACT`, `COMMANDER_COHERENCE_CUE_VALIDATION`,
`VERDICT_SIX_REDFLAGS_AND_RECON_CHARTER`, `SEAT_A_RULING_RECON_REPORT`, `CALLSIGN_ETYMOLOGY_TWMIP`.

---

## 3. PROPOSALS — THE IMPLEMENTATION MENU

| Proposal | Scope | Status |
|---|---|---|
| `proposals/PROPOSAL_TO_SEAT_A_API_FOR_AI_EXTENSIONS_2026-08-15.md` | "API for AI" extensions (original) | **HELD** (superseded in scope by Post-Floor) |
| `proposals/PROPOSAL_POST_FLOOR_UPGRADE_PROGRAM_2026-08-16.md` | Eight-build post-VSS program | **AWAITING DISPOSITION** |
| `proposals/PROPOSAL_SEAT_E_CAPABILITY_UPGRADE_2026-08-16.md` | Five-build Seat E upgrade | **AWAITING DISPOSITION** |
| `proposals/PROPOSAL_LLM_RESEARCH_TO_SEAT_A_2026-09-01.md` | Three-build T-series (TAMA/teaching) | **AWAITING DISPOSITION** |
| `proposals/MASTER_PROPOSAL_PLAN_V9.md` · `MASTER_ROADMAP_V10_AETHERWEAVE.md` | Inherited (pre-EXCEL) | House record |

---

## 4. CONSOLIDATED BUILD REGISTRY (the single map the Engineer needs)

**Evidence → build traceability.** Every build lists its evidence source and status. All gated behind
VSS-02 unless marked otherwise.

### Post-Floor program (B-series) — from `PROPOSAL_POST_FLOOR_UPGRADE_PROGRAM`
| ID | Build | Evidence | Priority |
|---|---|---|---|
| B1 | Pre-flight prompt guard + tool-output caps | S3 + G1 + Pass1 | 1 |
| B3 | Circuit breaker on external calls | G5 | 2 |
| B7.5 | Vault grounding (`query_tamakee_vault`) | WIT + Pass3 G1/G2 | 3 |
| B2 | Modular plan/critic/re-eval + injection guard | S4 + R3 | 4 |
| B9 | Ensemble council mode (race/panel/consensus/refine) | WIT + G0DM0D3-neutral-machinery | 5 |
| B4 | MMR retrieval | G3 | 6 |
| B5 | Compaction transcript | G2 + Pass1 | 7 |
| B6 | Governance lints (AGENTS.md + A1/A2/A3) | S1 + A1–A3 | 8 |
| B10-observer | Live per-seat observer | WIT + VSS-00 F12 | 9 |
| B7 | TAMA question-bank extraction | A4 + M1/M2 + SPEC_SEAT_E | 10 |
| B8 | Fail-closed isolation doctrine | G4 | 11 |
| B10-seatmap | Seat-as-process | WIT | **HELD (Commander ruling)** |

### Seat E upgrade (5 builds) — from `PROPOSAL_SEAT_E_CAPABILITY_UPGRADE`
| ID | Build | Evidence |
|---|---|---|
| E1 | Verification-first gate | Pass2/3 + NIST MEASURE + Pearce |
| E2 | Spec pruning + progressive disclosure | Mu 2025 + Anthropic 80% |
| E3 | Concrete acceptance criteria + anti-overengineering | Anthropic D4 |
| E4 | Model-aware constraint versioning | D5 + P4 (small-model collapse) |
| E5 | Verification circuit breaker (fail-closed) | grok-build G5 + VSS-00 |

### T-series (TAMA/teaching) — from `PROPOSAL_LLM_RESEARCH_TO_SEAT_A`
| ID | Build | Evidence |
|---|---|---|
| T1 | Socratic study-coach restructure (mapua_architect) | Pass2 S1/S2/S3 + Pass3 G1/G2 |
| T2 | Verification-first answer discipline (self-consistency + targeted feedback) | Pass3 R1 + Pass2 V1 |
| T3 | "Limits card" user-education surface | Pass3 H1/G1/R1/T1 |

**Recommended first slices (my counsel, proposal-only):**
- If TAMAKEE focus → **T1** (highest value-per-token; prompt-text only).
- If Marciale-OS focus → **B1** (closes the context-death class; ~3 lines).
- If governance focus → **B6** (machine-enforces the house's own laws).

---

## 5. TRACEABILITY GUARANTEE

Every recommendation in every proposal cites its research file and, where applicable, a primary
source (paper ID / provider doc). No proposal asserts a fact the research does not source. If any
build's evidence is ever questioned, the chain is: **build → proposal → research file → cited source.**

---

— Seat R, EXCEL · research-only
