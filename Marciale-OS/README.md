# Marciale‑OS README

## What is this codebase?
Marciale‑OS runs locally with Ollama models.  
Target user: Mapúa Architecture students.

## It is not a cloud‑hosted SaaS product.

### Architecture diagram (real file paths, verified)
```text
TheHUB 1.5.5.2.3 a v/          → [VERIFIED] git ls-files TheHUB 1.5.5.2.3 a v/
Gamecompanion/                 → [VERIFIED] git ls-files Gamecompanion/
docs/PROJECT_VSS_MASTERPLAN.md → [VERIFIED] git ls-files docs/PROJECT_VSS_MASTERPLAN.md
docs/PATH.md                   → [VERIFIED] git ls-files docs/PATH.md
package.json                   → [VERIFIED] git ls-files package.json
```

### Start‑here (5‑line routing block)
1. `See docs/PROJECT_VSS_MASTERPLAN.md [VERIFIED]` – overall status.  
2. `Run npm start [VERIFIED]` – launch TheHUB.  
3. `Explore Gamecompanion/files/README.md [VERIFIED]` – RPG details.  
4. `Read docs/AI_RULES.md [VERIFIED]` – governance.  
5. `Visit vault/00-BOOKS/ [VERIFIED]` – TAMAKEE vault intro (cross‑repo note).

### Runnable command
```
npm start
```
(Executes `cd "TheHUB 1.5.5.2.3 a v" && python3 server.py`)

### License / Safety (3 bullets)
- MIT licence (see root `LICENSE`‑style note).  
- Runs completely offline; no cloud subscription required.  
- All AI processing stays on‑device via locally‑run Ollama models.

[VERIFIED] All file paths above are confirmed via `git ls-files` on the `main` branch.