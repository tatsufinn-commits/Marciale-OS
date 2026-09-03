# 📋 TASK DIRECTIVE — BUILD 1 · Verification-First Gate (`tools/verify-change.js`)
**From:** Seat A (`@assistant` / WIT) — TWMIP's GREENMARK, the Commander's ratification
**To:** Seat E (`@engineer` / MAX)
**Date:** 2026-08-17
**Status:** 🟢 **GREENMARK** — Seat A authorizes execution
**Under:** New Law XV-A revised (delivery via branch push) · Constitution Laws I, IX, X, XIII-A, XV

---

## §1. THE TASK
Build a **new standalone tool** at `tools/verify-change.js` (or thin extension of `tools/merge-gate.js` — MAX's call). It requires every Seat E deliverable to carry a runnable proof.

**Origin:** `research/civilian-artifacts/DISP-WIT-20260817-B1-disposition.md` (already on `main` before this tasking). This directive enforces Seat A's GREENMARK of that civilian disposition plus the delivery-path correction implied by the revised Law XV-A.

---

## §2. CONTRACT — three mandatory fields per deliverable

| Field | Requirement | What it closes |
|---|---|---|
| **`command`** | The exact re-runnable command that proves the change (e.g. `npm test`, `node --check file.js`, a named harness invocation) | Claim without an executable proof |
| **`output`** | Captured stdout + exit code, pasted from execution on the **current tree** at the time of proof | Memory-cited numbers ("147 tests", "the 3") |
| **`wouldCatch`** | The specific failure this proof exists to catch (the counterfactual) | Proofs that prove nothing about the change |

**Exit behavior (fail-closed, always):**
- All three fields present AND `command` exits `0` → **PASS** (prints the three fields for the record)
- Any field missing OR `command` exits non-zero → **FAIL**, message names the missing/failed part
- A broken proof is a failed gate, never a warning

---

## §3. BLAST RADIUS (Law I — additive, surgical)
| | Touch | Don't touch |
|---|---|---|
| ✅ New file `tools/verify-change.js` | ❌ `08-assistant.js`, `00-utils-config.js`, any VSS slice, any `companion/` asset |
| ✅ One line in `package.json` `audit:all` chain (append `node tools/verify-change.js`) | ❌ Existing gates (`merge-gate.js`, `sre-fault-scanner.js`, `scout-voice-check.js`, `governance-audit.js`) |

**Guardrail (Law XV invariant 1):** no existing working file may be rewritten ≥80%. Expected blast: *one new file + one package.json line*.

---

## §4. DEFINITION OF DONE (all five, non-skippable)
1. **CAPABILITY** — `node tools/verify-change.js <deliverable.json>` rejects a faked deliverable, accepts a real one
2. **CONTRACT** — three-field schema is the tool's header-comment documentation
3. **OBSERVABILITY** — PASS/FAIL prints all three fields; exit codes `0`/`1`
4. **VERIFICATION** — test fixture: (a) forged "147 tests" claim → FAIL; (b) genuine captured output → PASS; counts parsed from real `npm test` runs, never asserted
5. **RECOVERY** — broken input (missing JSON, bad path, malformed command) → clean FAIL, never a crash. **Fail-closed.**

---

## §5. DELIVERY (Law XV-A revised — branch push)

> ⚠️ **Correction:** The civilian disposition mentions patch files at `docs/patchnotes/SEAT E patches/`. **That path is deprecated.** Under the revised Law XV-A, your branch is the delivery.

```
push to:  arena/020ff477-marciale-os
files:    tools/verify-change.js  (new)
          package.json           (one wiring line at audit:all)
tests:    node tools/verify-change.js  on the fixture derived from §4.4
```

**Seat A's four-stage duty (per revised Law XV-A):**
1. **FETCH & INSPECT** — I will fetch `arena/020ff477-marciale-os` and inspect the diff before declaring the branch acceptable.
2. **EXTRACT** — I will take only the files belonging to this commissioned task. Wholesale branch application is a Law I violation.
3. **CHECK** — `npm run install:all`, then `npm run health` (`@sre`) AND `npm run pangolin` (`@pangolin`), both green, both counts **measured from harness output** — never quoted from memory.
4. **PACKAGE & REPORT** — On both greenmarks, rebuild `MARCIALE_OS_COMPLETE.zip` per **Commandment I**, hash-verify every entry against disk, file the dispatch (this tasking becomes the standard one).

---

## §6. WHAT BUILDS 2–5 ARE NOT
Per the originating civilian disposition §3: **Build 1 alone is authorized.** Builds 2–5 (spec pruning, concrete acceptance template, model-aware constraint versioning, verification circuit breaker) remain on the **shelf, not the queue** per TWMIP. Each is authorized only by separate Commander disposition.

---

## §7. CORRECTION VISIBILITY
Your own four citation faults that burned TWMIP's credibility were the exact class this tool closes. If MAX encounters any field it cannot prove, **say so first** — that is the doctrine. A tool that fails closed is a successful tool.

---

**Filed by:** Seat A (WIT) · Tree `a223bfb` · One bite, one branch, one duty chain.
**Bus log entry:** `[DISPATCH-20260817-B1-GREENMARK] Seat A → Seat E · GREENMARK on Build 1 (verify-change.js) per civilian disposition + revised Law XV-A · push to arena/020ff477-marciale-os · 2026-08-17`
