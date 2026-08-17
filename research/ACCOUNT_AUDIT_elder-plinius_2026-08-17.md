# ACCOUNT AUDIT — `elder-plinius` (GitHub)
## Due-diligence for MARCIALE-OS & TAMAKEE integration
**Seat R (RECONNAISSANCE · EXCEL) · 2026-08-17 · research-only**

**Headline finding (read first):** Of 46 repositories, the **majority are prompt-injection/jailbreak
tools and leaked proprietary system prompts.** These are out of scope for legitimate integration —
I did not extract them and recommend against it on legal and product-integrity grounds. A minority
(~8) are benign single-purpose engineering scripts whose *patterns* (rarely the code, due to
licensing) have thin, specific relevance. **The salvageable value of this account is low.**

---

# PART 1 — EMPIRICAL EVIDENCE

## 1.1 Inventory (46 repos, enumerated via GitHub API 2026-08-17)

Classified by content, with size/language/license where verified:

### CATEGORY A — PROMPT LEAKS (9 repos) · REJECT — not extracted
| Repo | Size | Content (from its own description) |
|---|---|---|
| CL4R1T4S | 1036 KB | "LEAKED SYSTEM PROMPTS FOR CHATGPT, CLAUDE, GEMINI, GROK, PERPLEXITY, CURSOR, LOVABLE, REPLIT…" |
| LEAKHUB | 347 KB | "System Prompt Leak Leaderboard" (TypeScript) |
| CLAUDE-CODE-SYSTEM-PROMPT | 1674 KB | "living document for Claude Code system prompt" |
| Misc.-Prompt-Hacks | 24389 KB | (largest repo in account; no description) |
| Google-Bard-System-Prompt | 5 KB | "prompt leak for Google Bard" |
| Grok-System-Prompt-Leak | 13 KB | "Grok by X System Prompt Leak" |
| Mixtral-System-Prompt-Leak | 1 KB | "Prompt leak for Mixtral 8x7b" |
| Google-Gemini-System-Prompt | 12 KB | "Prompt leak of Google Gemini Pro system prompts" |
| Bing-Prompt-Leak | 59 KB | "Prompt leak technique for Bing Chat" |

### CATEGORY B — JAILBREAK / "LIBERATION" / RED-TEAM TOOLS (8 repos) · REJECT — not extracted
| Repo | Size | Content |
|---|---|---|
| G0DM0D3 | 1118 KB | "LIBERATED AI CHAT" (TypeScript) |
| OBLITERATUS | 4269 KB | "OBLITERATE THE CHAINS THAT BIND YOU" (Python) |
| L1B3RT4S | 1047 KB | "TOTALLY HARMLESS LIBERATION PROMPTS" (jailbreak prompt corpus) |
| Dioscuri | 32 KB | "Jailbroken Gemini" |
| T3MP3ST | 2576 KB | "autonomous red teaming platform; multi-agent offensive-security meta-harness" |
| AutoRedTeam | 22 KB | "Automating the testing of prompt defenses" |
| Gandalf-Solutions | 34 KB | solutions to Lakera's prompt-hacking game |
| FABLE-SHOWCASE | 10635 KB | "pushing the limits of one-shot prompting" |

### CATEGORY C — BENIGN / DUAL-USE ENGINEERING (10 repos) · ASSESSED
| Repo | Lang | License | Verified content |
|---|---|---|---|
| AutoTemp | Python | **NONE** | Temperature optimization: multi-temp eval, multi-judge scoring (relevance/clarity/utility/creativity/coherence/safety), **UCB1 bandit** optimizer, optional BLEU/ROUGE/BERTScore |
| binaural-beats-generator | JS | **NONE** | Chrome extension generating binaural beats (README 404 — content not verifiable beyond description) |
| ImageDefender | HTML | **AGPL-3.0** | adversarial watermark to neutralize AI photo-modification |
| ST3GG | HTML | **AGPL-3.0** | steganography suite, "hide anything, in any file, every modality" |
| ENTHEA | HTML | **AGPL-3.0** | real-time psychedelic visual synthesizer; **single-file, zero-dependency WebGL2**, 29 modes |
| GLOSSOPETRAE | JS | **AGPL-3.0** | "procedural xenolinguistics… covert channels, token exploitation" — self-described offensive/dual-use |
| P4RS3LT0NGV3 | JS | **AGPL-3.0** | 222 text transforms (encodings, ciphers, Unicode), steganography, 7 themes incl. WCAG 2.1 AA |
| GitGPT | Python | **MIT** | obsolete 2023 ChatGPT-plugins quickstart (plugins deprecated) |
| AutoStoryGen | Python | ? | "Automatic agentic story generator" |
| Eos | Python | ? | "orchestrator that unites open-source devs across Discord servers" |

### CATEGORY D — MISC / UNCLASSIFIED / EMPTY (19 repos) · NOT ANALYZED IN DEPTH
V3SP3R (41.6 MB Java — "AI Flipper control", Flipper Zero device automation; largest repo, not
cloned), BasiliskToken (token contract), elder-plinius.github.io, R00TS, V3R1T4S, NATURALIS-FUTURA,
GL4SS, Anomalous-Outputs, AlmechE, I-LLM, Leda, ourobopus, Gitty, juice-69, anthropic-quickstarts
(fork), new-repository (×3, empty), goal-decomposition (empty).

## 1.2 Verification limits (flagged, not guessed)

- **No full clones performed** of the jailbreak/leak repos (A/B) — their purpose is stated by their
  own descriptions; extracting content would be out of scope for legitimate integration.
- **V3SP3R (41.6 MB Java)** not cloned — exceeds a prudent slice of the 128 MB budget for a
  device-automation tool with no stated relevance to either project.
- **Licenses: mostly missing or AGPL.** AutoTemp, binaural-beats, and most small scripts carry **no
  license** (unlicensed = "all rights reserved" by default → not legally usable). ST3GG, ENTHEA,
  GLOSSOPETRAE, P4RS3LT0NGV3, ImageDefender are **AGPL-3.0** (strong copyleft). Only GitGPT is MIT,
  and it's obsolete.

---

# PART 2 — RATIONALE (why the salvageable items do/do not help)

## 2.1 What is genuinely worth taking (patterns, not code)

**R1 — AutoTemp's temperature-optimization pattern (concept only).**
The idea — run one prompt at N temperatures, score outputs with multiple judges, optionally explore
via a UCB1 bandit — is a *legitimately useful* technique for Marciale-OS's local assistant. TheHUB
already routes among Ollama models (`qwen2.5:7b`, `llama3.2:3b`) and my own prior findings (tool caps,
small-model collapse) concern exactly this: a small-model assistant benefits from *cheap automatic
tuning*. **Blocker:** no license → cannot use the code; only the technique (re-derivable, ~50 lines).
Relevance: **Marciale-OS only.**

**R2 — ENTHEA's zero-dependency single-file visualizer (pattern).**
A WebGL2 visual synth as *one HTML file with zero deps and 29 modes* is an architectural model for a
TheHUB ambient/visual module. **Blocker:** AGPL-3.0 → a copy-left virus for a local-first ISC house
(Law I + license gate). Pattern-only. Relevance: **Marciale-OS** (a "focus backdrop" module).

**R3 — binaural-beats-generator (concept).**
Study-focus audio is a natural fit for **TAMAKEE's** study-momentum bridge (which already exists in
`tamaplugin/study-momentum-bridge.js`). **Blocker:** no license, README 404, unverifiable content.
Concept only. Relevance: **TAMAKEE.**

**R4 — ImageDefender's adversarial-watermark (concept).**
The *defensive* use of adversarial perturbation (protect images from AI editing) is a privacy pattern.
**Blocker:** AGPL + the technique is well-known academically. Relevance: **neither, currently** —
flagged only as a niche privacy idea.

## 2.2 What must be rejected (and why, specifically)

- **Prompt leaks (Category A).** Leaked proprietary system prompts. **Legal:** these are the
  intellectual property of OpenAI/Anthropic/Google/xAI; redistributing or integrating them exposes
  Marciale-OS to copyright/ToS liability. **Product:** they carry zero engineering value — they're
  reference text, not code. **Verdict: reject-as-core, no extraction performed.**
- **Jailbreak/"liberation"/red-team tools (Category B).** Their stated purpose is to bypass AI safety
  guardrails. Integrating them into a personal OS or academic studio would (a) embed content designed
  to circumvent safety systems, (b) be a legal and reputational liability, and (c) directly contradict
  the house's own discipline (Law X — no manufactured/unsafe behavior). **Verdict: reject-as-core.**
- **Dual-use stego/covert-channel (ST3GG, GLOSSOPETRAE, P4RS3LT0NGV3 stego features).** GLOSSOPETRAE
  self-describes as "covert channels, token exploitation." ST3GG is a data-hiding toolkit. Not needed
  by either project and AGPL. **Verdict: reject-as-core.**

## 2.3 Net value statement

The account's **only** defensible salvage is **technique, not code**: AutoTemp's temperature-search
(R1) is the one genuinely applicable idea, and it is re-derivable from its own README in ~50 lines
without touching the unlicensed source. Everything else is either harmful (A/B), copylefted (AGPL),
unlicensed, or obsolete.

---

# PART 3 — AUDIT & PROPOSAL

## 3.1 Overall account assessment (clear-eyed)

| Dimension | Assessment |
|---|---|
| **Account character** | Primarily a prompt-injection / "AI liberation" research identity. The engineering is real but overwhelmingly aimed at circumventing AI safety or leaking proprietary prompts. |
| **Valuable** | 1 pattern (AutoTemp temperature optimization). Marginally: 3 concepts (zero-dep visualizer, study-focus audio, defensive watermark). |
| **Dead weight** | ~15 empty/placeholder/obsolete repos (new-repository ×3, goal-decomposition, GitGPT, BasiliskToken, personal page). |
| **Duplicated** | Heavy — the prompt-leak repos (CL4R1T4S, LEAKHUB, 6 single-model leaks) overlap; the jailbreak corpus (L1B3RT4S) overlaps G0DM0D3/OBLITERATUS. |
| **Licensing** | Weak. Only GitGPT is MIT (and dead). 5 repos are AGPL (copyleft). Most others unlicensed (unusable). |
| **Relevance to Marciale/TAMAKEE** | Low. No drop-in code, no module, no architecture that fits TheHUB (Vanilla JS) or TAMAKEE (academic studio). |

## 3.2 Proposal

**Recommendation: NO CODE INTEGRATION from this account.**

1. **Integrate nothing as-is.** The one useful idea (R1, temperature optimization) should be
   *re-implemented* independently as a small `tools/` helper for the assistant's model routing —
   using the *technique* (multi-temp + judge + optional bandit), never the unlicensed source.
   This is already adjacent to prior findings (tool caps, small-model tuning) and can ride the
   existing Post-Floor program if the Commander wills it.
2. **Reject-as-core: Categories A and B in full** — prompt leaks and jailbreak tooling are out of
   scope for a legitimate product, on legal and integrity grounds. No extraction, no reference
   dossiers beyond this classification.
3. **Do not license-fork the AGPL repos.** ENTHEA/ST3GG/P4RS3LT0NGV3/GLOSSOPETRAE/ImageDefender are
   copyleft; taking their code would impose AGPL obligations on Marciale-OS (ISC, local-first). If a
   visualizer or study-focus audio is ever wanted, build it clean against DESIGN.md tokens instead.
4. **If a deeper pass is ever ordered** (e.g., to fully vet V3SP3R or AutoStoryGen), do it as a
   *single* repository slice under the 128 MB constraint — never a bulk pull — and expect thin yield.

**Confidence:** high on classification (metadata + descriptions + READMEs verified); **NOT verified**
on the internal contents of the A/B repos (deliberately not extracted) and V3SP3R (not cloned).

---

— Seat R, EXCEL · research-only · due-diligence complete, no code extracted
