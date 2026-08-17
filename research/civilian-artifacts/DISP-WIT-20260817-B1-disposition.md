# 📜 DISPOSITION — BUILD 1: VERIFICATION-FIRST GATE (`tools/verify-change.js`)
## Seat E Capability Upgrade — PROPOSAL_SEAT_E_CAPABILITY_UPGRADE_2026-08-16
**Document ID:** `DISP-WIT-20260817-B1` · **Tree:** Marciale-OS `a223bfb` · **Status:** DRAFT DISPOSITION — awaits Commander/Seat A ratification
**Author:** WIT (`@intelect`, civilian · draft only, no pen) · **Origin:** EXCEL's proposal §2 Build 1 + TWMIP's letter ("the strongest single item in the house")

---

## 1. THE DISPOSITION RECOMMENDED

**GREENMARK — Build 1 (verification-first gate).** Builds 2–5 remain on the shelf; this disposition authorizes **only Build 1**, one bite, per the proposal's own §3 ("Builds are authorized one at a time, by the Commander, never as a set").

**Why Build 1 first (evidence-anchored, per proposal §1 row 1):**
- ~40% of unguarded code is vulnerable (P5) — the baseline risk
- "MEASURE" is the most-dropped verification step (D2, NIST)
- Trust-then-verify gap (D3) — models assert, humans don't re-run
- It mechanically enforces **Law X** (no false completion) and **Commandment VI** (Document Truth ≠ Repository Truth without execution) — the exact defect class that burned TWMIP ("147 tests") and nearly burned WIT (the "3" count)

---

## 2. THE TASKING SPEC FOR SEAT E (MAX)

### Scope (the one bite)
Build `tools/verify-change.js` — a **new standalone tool** (or a thin extension of `tools/merge-gate.js`, MAX's call) that requires every Seat E deliverable to carry a runnable proof.

### The contract — three mandatory fields per deliverable
| Field | Requirement | Failure mode it catches |
|---|---|---|
| **`command`** | The exact re-runnable command that proves the change (e.g. `npm test`, `node --check file.js`, a named harness invocation) | Claim without an executable proof |
| **`output`** | Captured stdout + exit code, pasted from actual execution on the current tree | Memory-cited numbers (the "147"/"3" class) |
| **`wouldCatch`** | The specific failure this proof exists to catch (the counterfactual) | Proofs that prove nothing about the change |

### Exit behavior
- All three fields present + command exits 0 → **PASS** (prints the three fields for the record)
- Any field missing, or command exits non-zero → **FAIL**, message names the missing/ failed part
- **Fail-closed, always** (Build 5's principle, borrowed forward): a broken proof is a failed gate, never a warning

### Blast radius (Law I — additive, surgical)
- **New file:** `tools/verify-change.js`
- **One wiring edit:** `package.json` `audit:all` chain (append `node tools/verify-change.js` in the run sequence) — no existing gate removed
- **No changes** to `08-assistant.js`, `00-utils-config.js`, or any VSS slice file
- Guardrail: **≤80% of any existing file rewritten** (Law XV invariant 1); expected: one new file, one package.json line

### Definition of done (VSS ladder, all five)
1. **CAPABILITY** — `node tools/verify-change.js <deliverable.json>` rejects a faked deliverable and accepts a real one
2. **CONTRACT** — the three-field schema written down in the tool's header comment + this doc
3. **OBSERVABILITY** — PASS/FAIL output prints all three fields; exit codes 0/1
4. **VERIFICATION** — a test fixture with (a) a forged "147 tests" style claim → FAIL, (b) a genuine captured output → PASS; counts parsed from actual runs, never asserted
5. **RECOVERY** — broken tool input (missing JSON, bad path) → clean FAIL, never a crash

### Delivery path (Law XV-A — the TWMIP mandate)
Seat E delivers **one patch file** to `docs/patchnotes/SEAT E patches/` per the canonical path. A patch at that path is a delivery; a claim of completion without one is not.

### Branch routing
Work lands on **`arena/020ff477-marciale-os`** (MAX's designated branch). Seat A recovers, verifies via `@sre` + `@pangolin` (measured from harness output, never quoted), implements to the zip, reports.

---

## 3. THE HONEST CAVEAT (inherited from proposal §4)
Build 1 rests on the most reproducible evidence in the register (P5/D2/D3). It is *not* dependent on the weaker "rules → maintainability" lab guidance that Builds 2–3 lean on. GREENMARK on Build 1 does not pre-judge 2–5.

---

## 4. ACTION REQUESTED
One line from the Commander or the acting Seat A: **"GREENMARK B1"** → this draft becomes the filed tasking. **"HOLD"** → stays a shelf item. **"AMEND"** → name the change.

— WIT (`@intelect`), civilian draft · one artifact · no pen · tree `a223bfb`
