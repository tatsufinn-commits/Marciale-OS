# PROPOSAL — SEAT R (EXCEL) → SEAT A (THE OFFICE)
## From Three-Pass LLM-Behavior Research to Marciale-OS / TAMAKEE Upgrades
**DATE:** 2026-09-01 · **TREE:** 030f3db (working) · remote `2ae95ca` · **REVISION 2 — aligned to the optimized VSS infrastructure**
**STATUS:** PROPOSAL — awaiting Seat A disposition (GREENMARK / UPDATE / CANCEL)

---

## 0. REVISION NOTE (what changed since v1)

This proposal was filed against a single "gated behind VSS-02" line. The infrastructure has since been
**optimized into the VSS MASTERPLAN's twelve-slice ladder with an explicit TAMAKEE gate**
(`docs/roadmaps/VSS plans/PROJECT_VSS_MASTERPLAN.md`). This revision:

1. **Re-frames the gate** — my work is no longer "after VSS-02" but **after the Marciale-OS floor**
   (VSS-00 → VSS-06) for assistant-facing builds, and **after the VSS-04 gate** for TAMAKEE-facing builds.
2. **Marks dispositions already made** — B7.5 and B9 were **GREENMARKED** (DISPATCH-20260817-120);
   B10 was **split** (observer GREENMARKED, seat-mapping HELD). My T-series depends on those.
3. **Maps the T-series onto VSS slices** — T1 is adjacent to **VSS-04 (TAMAKEE exams)**; T2/T3 are
   assistant-facing (Marciale-OS floor).
4. **Addresses the office, not the occupant** — Seat A is in succession (TWMIP retiring; WIT under 511
   Tutelage per Law XVII-B). This proposal is filed to the seat, not the man.

Nothing in the *research* changed — the three passes remain the evidence base. Only the framing against
infrastructure changed.

---

## 1. THE EVIDENCE → THE HOUSE, ONE TABLE (unchanged from v1)

| Research finding (source) | Marciale-OS / TAMAKEE meaning | Maps to |
|---|---|---|
| Context = finite attention budget; length alone hurts (Anthropic 2025; arXiv:2510.05381) | assistant has no tool-output caps | **B1** (caps) |
| Compaction + memory + context-editing = +39% (Anthropic 2025) | sessions grow unbounded | **B5 + G6** |
| Socratic prompting beats direct-answer (arXiv:2409.05511; EDM 2024) | `mapua_architect` is prompt-monolithic | **T1** |
| Grounding the tutor reduces hallucination (arXiv:2505.15607) | vault is the anti-hallucination source | **B7.5** ✅ GREENMARKED |
| Ghost references non-declining; content-misrepresentation hardest (arXiv:2606.21155) | a coach citing the wrong holding is worse than none | **B7.5 + T1** |
| Prompt brittleness: phrasing shifts rankings 63% (arXiv:2603.13285) | single-shot answers unstable | **T2** |
| Vague "improve it" plateaus; targeted feedback works (arXiv:2509.06770) | elicit the axis, don't regenerate blindly | **T2** |

---

## 2. ALREADY COVERED — AND NOW DISPOSITIONED

| Build | Status (current) | Note |
|---|---|---|
| B1 (tool caps) | in the Post-Floor program | research *confirms*, no new build |
| B5 (compaction), G6 (memory) | in the Post-Floor program | same |
| **B7.5 (vault grounding)** | ✅ **GREENMARKED, first position** (DISPATCH-120) | Seat A's own finding was worse than stated — `RA_9266` advertised but not held; **this is what makes T1's grounding directive enforceable** |
| **B9 (ensemble council)** | ✅ **GREENMARKED** (DISPATCH-120) | best-grounded scoring binding |
| **B10 (observer)** | ✅ GREENMARKED / seat-mapping **HELD** | `index.html:471` hardcoded "SEV-0 Nominal" |

**Consequence for this proposal:** T1's grounding directive *depends on* B7.5, which is already
greenlit. T2's self-consistency discipline *aligns with* B9's ensemble, also greenlit. The T-series is
therefore **closer to executable than v1 implied** — its prerequisites are dispositioned, not pending.

---

## 3. THE T-SERIES (unchanged in substance, re-mapped to VSS)

### T1 — Socratic Study-Coach Prompt Architecture → **aligns with VSS-04 (TAMAKEE exams)**
- **Objective:** restructure `mapua_architect` from monolith into the pedagogy-validated structure —
  Socratic mode, 2-attempt frustration fallback, grounding directive (enforceable via GREENMARKED
  B7.5), exam-prep mode.
- **Evidence:** Pass 2 S1/S2/S3 + Pass 3 G1/G2.
- **Blast radius:** `tamaplugin/mapua-brain-preset.js` prompt text only.
- **Gate:** 🔒 **post-gate** — TAMAKEE-facing; enters only after the Marciale-OS floor (VSS-00→VSS-06)
  and the VSS-04 gate, per the masterplan.

### T2 — Verification-First Answer Discipline → **Marciale-OS floor (assistant)**
- **Objective:** self-consistency re-run for consequential questions (aligns with GREENMARKED B9) +
  targeted-feedback elicitation (V1).
- **Evidence:** Pass 3 R1 + Pass 2 V1.
- **Blast radius:** `modules/08-assistant.js` conversational-handling logic.
- **Gate:** post-floor (Marciale-OS side).

### T3 — "Limits Card" → **Marciale-OS floor (assistant UI)**
- **Objective:** a user-facing panel documenting failure modes + one-line mitigations (the honest
  product move, per the research's "architectural and permanent" finding).
- **Evidence:** Pass 3 H1/G1/R1/T1.
- **Blast radius:** static UI card + copy.
- **Gate:** post-floor (Marciale-OS side).

---

## 4. ALIGNMENT TO THE FIVE-PHASE DEFINITION OF DONE

The masterplan's per-slice DoD (CAPABILITY / CONTRACT / OBSERVABILITY / VERIFICATION / RECOVERY) applies
to the T-series too. Stated here so the Engineer can judge them by the same bar:

| T | CAPABILITY | CONTRACT | OBSERVABILITY | VERIFICATION | RECOVERY |
|---|---|---|---|---|---|
| T1 | Socratic coach exists | prompt schema documented | coach mode inspectable | grounded-citation test | fallback to plain prompt |
| T2 | self-consistency runs | re-run threshold documented | samples logged | answer-key match | single-shot fallback |
| T3 | limits card renders | copy versioned | card reflects live model | text-reviewed | static (cannot break runtime) |

---

## 5. DISPOSITION REQUESTED (revised)

Seat A (the office), please **dispose**. Because B7.5 and B9 are already GREENMARKED, my one ask is
narrower than v1:

- **T1** is the highest-value-per-token TAMAKEE build and is now *enabled* by greenlit B7.5 — recommend
  it be considered alongside **VSS-04** when the TAMAKEE gate opens (they are the same surface: exams).
- **T2** folds naturally into the greenlit **B9** ensemble work — recommend it be absorbed there rather
  than built separately.
- **T3** is independent and can be slotted wherever the Commander wants a user-education surface.

**Nothing proceeds until the Commander selects the slice.** My research remains the evidence base; this
revision only realigns the menu to the optimized ladder.

— Seat R, EXCEL · research-only · proposal, not authorization
