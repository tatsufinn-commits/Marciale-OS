# COLONY AUDIT — `yashab-cyber/opendroid`
## Salvage Assessment: skills · prompts · guidelines · laws · assets
**ID:** `COLONY-20260817-05`
**From:** `@colony` (under Seat R · EXCEL)
**Commander source:** https://github.com/yashab-cyber/opendroid.git (verbatim)
**Date fetched:** 2026-08-17
**Platform block:** GitHub (G1) · **Upgrade target:** Marciale-OS (patterns) + TAMA (secondary)

---

## 0. INTAKE LEDGER

| # | Source (verbatim) | Platform | Fetch | Tag | One-line observed |
|---|---|---|---|---|---|
| 1 | https://github.com/yashab-cyber/opendroid.git | GitHub | OK | `[OBSERVED]` | Android autonomous AI agent; rich agent-governance docs (AGENTS.md + docs/agents/) |

---

## 1. WASHED REFERENCE (G0 + G1)

- **Identity:** OpenDroid — "The Open-Source Autonomous AI Agent for Android." Self-planning, re-evaluation, on-device model manager (LiteRT-LM), full device control, vision engine. Kotlin/Gradle, Apache-2.0 (`Copyright 2026 OpenDroid Contributors`).
- **Shape:** Android app (`app/`) + `docs/` + `website/` + `.Jules/` (agent palette). HEAD `2ed7d47`.
- **License:** **Apache-2.0** — permissive, no copyleft. BUT two provenance notes (below).

### 1.1 PROVENANCE FLAGS (diligence, not accusation)

1. **`AGENTS.md` references `mattpocock/skills`** — the triage-labels and domain docs use a *known external skills framework* (Matt Pocock's AI skills). Any salvage of the label/domain pattern should attribute the framework, not just this repo.
2. **The README carries a Solana token contract** (`GwnzGtKh6L2prU9UiJmmW99zsC19XECnnfYW529upump` — a pump.fun address). Not a license issue, but a *signal*: the repo pairs a serious engineering effort with a meme-token. I flag it because the house's scout discipline is to separate the code/patterns (which are genuinely good) from the hype surface (which is not). **No bearing on the salvageable artifacts below.**

---

## 2. SALVAGE INVENTORY — WHAT IS WORTH TAKING (and what is not)

The user asked specifically for **skills, prompts, guidelines, laws, assets**. Ranked by value:

### TIER 1 — DIRECTLY SALVAGEABLE GOVERNANCE PATTERNS (KEEP, zero-dependency)

**S1. The `AGENTS.md` + `docs/agents/` tree — a complete agent-governance scaffold.**
Files: `AGENTS.md`, `docs/agents/{issue-tracker, triage-labels, domain, on-device-inference, ticket-sweep-handoff}.md`.
This is the single highest-value find this watch: a *working, documented* convention for governing an AI coding agent over a repo:
- **`AGENTS.md`** (root) declares three "agent skills" with pointers: issue tracker (which repo is canonical), triage labels (canonical default set), domain docs (single-context rule).
- **`docs/agents/triage-labels.md`** maps *five canonical triage roles* to actual label strings — "the skills speak in terms of roles; this file maps roles to your real vocabulary. Edit the right-hand column."
- **`docs/agents/domain.md`** establishes the **single-context + ADR discipline**: one `CONTEXT.md` glossary, ADRs in `docs/adr/`, "if your output contradicts an ADR, surface it explicitly rather than silently overriding." Multi-context upgrade path defined (`CONTEXT-MAP.md`).
- **`docs/agents/on-device-inference.md`** documents a *latency contract* (95th-percentile budget, no spec-derived thresholds) and an explicit fallback allowlist.

*Why it matters to Marciale-OS:* the JARWEN Council already has a governance culture (laws, charters, seat dirs), but its *agent-facing* convention — "how does an AI working in this repo know what's canonical?" — is prose, not a lint-able scaffold. This is the industrial, working version of the A1/A2 pattern already recommended in the cross-ref analysis. **Directly transferable.**

**S2. `docs/agents/ticket-sweep-handoff.md` — the resumable-handoff pattern.**
A real agent-session handoff: "Stopped early: the machine could not carry the parallel agent load. This file records exactly where the work stands so it can be resumed without re-deriving anything." Contents: done table, findings-that-outrank-the-work, remaining work in dependency order (`blocked_by`), merge-order constraints, and **"how to resume"** (run serially not parallel, post-findings-before-polishing, don't edit map bodies concurrently).

*Why it matters:* this is the **empirical, external confirmation of the house's own Law XVIII-B** (resumability test, decompose-don't-despair, checkpoint at boundaries). NTG/TSTT died for lack of exactly this artifact. It is a template the house should adopt for its own slice handoffs — and it *worked* (it documents the exact point of failure and how to resume).

**S3. `PromptBudget.kt` — pre-flight token budget for small local models.**
`estimateTokens()` (conservative 4 chars/token), `outputBudget()` returns `null` when the prompt won't fit — **surfacing "prompt too long" as a normal error instead of a native SIGABRT force-close**.

*Why it matters:* the house runs **local Ollama models** (3B–8B), and this is the *precise* mechanism for the guardrails-research finding that small models fail hard on oversized context. It is also the code-level form of the house's §S 10 KB intake cap. A ~30-line Vanilla JS port. **This is the most concrete single asset on the list.**

**S4. The system-prompt architecture — modular pipeline with an injection guardrail.**
`docs/prompts.md` + `SystemPrompts.kt`/`PlanningPrompts.kt`/`ReEvalPrompts.kt`/`AutoReplyPrompts.kt`: intent classifier → planning/critic pipeline → re-evaluation, all enforcing **structured JSON output** with an explicit **prompt-injection guardrail** and a safety critic that "modifies the plan's steps or params to mitigate risks."

*Why it matters:* a worked, *shipped* example of the "rules in the prompt" school (Google-style) with an injection countermeasure — directly relevant to the unresolved prompt-vs-architecture fork flagged in the guardrails research (§4.1). Pattern value, not payload.

**S5. `.Jules/palette.md` — the "learning" artifact pattern.**
A one-entry design-system transition log: "**Learning:** … **Action:** always clean out flat-color emojis, replacing with stroke-based inline SVG at 1.5px inheriting `currentColor`, preserve focus-visible."

*Why it matters:* (a) a *mini design-system directive* that is itself relevant to Marciale-OS's dark cockpit (SVG stroke icons over emoji — exactly the house's own HUD iconography question); (b) more importantly, the **pattern of a palette/learning file** — a tiny, durable, self-appending memory that agents read. The `.Jules` mechanism is the same idea as the house's "Marciale brain," in a one-file form.

### TIER 2 — CONTEXT, NOT DIRECT SALVAGE

**S6. `security_architecture.md` + `on-device-inference.md` routing rules.** "Plans containing sensitive, advanced-control, or irreversible actions never cross a provider boundary automatically." A *policy* worth studying for the house's own AI assistant tool-calling (which already has a `danger:true` gate) — the notion of **routing-sensitive-actions** is one notch beyond a danger flag.

### NOT SALVAGEABLE (REJECT)

- The Android/Kotlin app itself (`app/`, Gradle) — wrong platform, wrong language, no overlap with TheHUB (Law I).
- The 11 cloud-provider code — the repo's *own* handoff documents a live credential leak + cross-vendor exfiltration in it (finding 1/2 of the ticket sweep). Hard reject as payload.
- The token/marketing surface (README badges, Product Hunt embed, contract address) — hype, not substance.

---

## 3. WHY IT MATTERS (articulated audit)

**Best information, ranked:**
1. **S1 (AGENTS.md + docs/agents/)** — the most directly transferable *governance* find of the entire watch. It operationalizes exactly what the house's A1/A2 recommendation gestured at, and it's Apache-2.0.
2. **S2 (ticket-sweep-handoff)** — external validation of Law XVIII-B, with a production-quality template. The house should *adopt this format* for its own handoffs.
3. **S3 (PromptBudget)** — the smallest, most concrete, most resonant asset: the code-level answer to the small-model context-crash the guardrails research flagged as under-studied.
4. **S4 (modular prompt + injection guard)** — a shipped reference for the prompt-vs-architecture fork.
5. **S5 (palette)** — a one-file memory pattern + a design directive relevant to the dark cockpit.

**Empirical spine:** cloned at `2ed7d47`; `LICENSE` Apache-2.0 (read); `AGENTS.md` read verbatim; `docs/agents/*` (5 files) read verbatim; `PromptBudget.kt` read verbatim; `SystemPrompts.kt` head read; `.Jules/palette.md` read verbatim; `docs/prompts.md`, `docs/security_architecture.md` heads read.

**Risk:** lowest of the four intakes this watch — the salvage is *documentation and one tiny Kotlin object*, both of which are pattern-only and require zero new dependencies. The only cautions are the provenance flags (§1.1): attribute `mattpocock/skills`, and ignore the token surface.

**TAMAKEE vs Marciale-OS:** Marciale-OS (S1–S4 are agent-governance, directly for the Council + assistant). S5's SVG-stroke directive is a *design-token* item for the dark cockpit. TAMAKEE has no direct need here.

**Disposition note:** research-only, no proposal, no implementation, per the standing Commander order.

---

## 4. BEGINNER BLURB (Law VI)

I looked at OpenDroid, an AI that runs your whole Android phone. The app itself isn't useful to us — wrong platform, and its own notes even flag real security bugs in it. But its *instruction manual for AI helpers* is excellent: a single file telling an AI "this is the real repo, these are the labels, this is the glossary, and if you contradict a past decision say so out loud." It also has a tiny "make sure this prompt fits in the small model's memory before running it" check — which is exactly the kind of guard our local-model assistant needs. I'm recommending we copy the manual's structure and the memory-check idea, not the app.

---

— `@colony` (under Seat R · EXCEL) · research-only · no proposal, no implementation
