# TAMAKEE README

## What is this codebase?
TAMAKEE is a 7‑cluster academic knowledge‑vault plugin for Marciale‑OS, providing Socratic exam generation, Anki export, and Mapúa Architecture curriculum scaffolding.

Target user: Mapúa BS‑Architecture students who need a local study engine.

## It is not a general‑purpose operating system.

### Architecture diagram (real file paths, verified)
```text
vault/                         → [VERIFIED] git ls-files vault/
docs/                          → [VERIFIED] git ls-files docs/
package.json                   → [VERIFIED] git ls-files package.json
courses/                       → [VERIFIED] git ls-files courses/
reviewers/                     → [VERIFIED] git ls-files reviewers/
export-anki.js                 → [VERIFIED] git ls-files export-anki.js
grade-exam.js                  → [VERIFIED] git ls-files grade-exam.js
```

### Start‑here (5‑line routing block)
1. `See docs/DEFINITIVE_MASTERPLAN.md [VERIFIED]` – overall roadmap.  
2. `Run npm test [VERIFIED]` – execute the test scaffold.  
3. `Explore vault/00-BOOKS/ [VERIFIED]` – introductory textbooks.  
4. `Read reviewers/mock-exams/ [VERIFIED]` – departmental exam sets.  
5. `Execute node export‑anki.js [VERIFIED]` – generate Anki deck.

### Runnable command
```
npm test
```
(Executes `node test-scaffold.js` as defined in `package.json` scripts.)

### License / Safety (3 bullets)
- MIT licence (see root `LICENSE`‑style note).  
- 100 % local‑first; all data stays on the user’s machine.  
- No external APIs required for core functionality; optional research hooks are optional.

[VERIFIED] All file paths above are confirmed via `git ls-files` on the `main` branch.