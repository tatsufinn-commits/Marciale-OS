# PASS 3 — What are the limits of AI skills, and what failure modes should users know?

**Seat R (EXCEL) · 2026-09-01 · research-only**
**Scope:** 2023–present; GPT-4-class + Claude 3-class; hallucination, ghost references, tourist responses, reasoning brittleness.

---

## 0. PLAN

Sub-queries: (a) hallucination — taxonomy, causes, rates; (b) ghost references — legal/citation
fabrication, longitudinal trends; (c) tourist responses — shallow-but-confident output; (d) reasoning
brittleness / prompt sensitivity; (e) inherent vs. version-specific; (f) mitigation.

---

## 1. FINDINGS

### Finding H1 — Hallucination is inherent to generative architecture; no single fix eliminates it

**The Finding:** Hallucination — fluent, syntactically-correct text that is factually inaccurate or
unsupported — is rooted in the generative architecture, training-data biases, and the
instruction-tuning capability gap (models asked to produce beyond their knowledge). The comprehensive
2026 survey's conclusion is blunt: **"no single approach completely mitigates hallucination"; the most
promising are hybrid combinations** of prompting/reasoning + retrieval + model-centric training. So
hallucination is an *inherent architectural* limitation, reducible but not eliminable.

**Sources:**
- "Large Language Models Hallucination: A Comprehensive Survey," arXiv:2510.06265 (2026) — preprint (survey).
- Huang et al., "A Survey on Hallucination in LLMs," arXiv:2311.05232 (2023) — preprint (foundational taxonomy: factuality vs. faithfulness).

**Confidence:** High.

**[COUNTERPOINT]** "Inherent" is a strong claim contested by scaling results (hallucination rates
*declined* GPT-3→GPT-4); the architecture makes it *possible*, but rates are model- and task-dependent.

**User Implications:** Treat "reduce, not eliminate" as the design premise. Combine grounding
(retrieval) with reasoning and verification; never rely on a single unverified generation.

### Finding H2 — Hallucination rates vary wildly by task/domain and are benchmark-dependent; the headline numbers are unstable

**The Finding:** Reported rates span orders of magnitude depending on benchmark: ~1.5% (GPT-4o, Vectara
RAG summaries) to ~67% (Claude 2, TruthfulQA counterfactuals). FACTS (Dec 2025) found **every** frontier
reasoning model exceeded 10% hallucination on grounded summarization; Vectara-style simple QA shows
sub-5%. The lesson: there is **no single "hallucination rate"** for a model — the number is a function
of task, domain, and benchmark. Higher-stakes domains (legal, medical) are documented as highest-risk.

**Sources:**
- Vectara hallucination leaderboard + FACTS benchmark (2025–2026) — industry benchmark (secondary aggregation).
- Aggregated model-rate tables (chatgptguide.ai, wifitalents, 2025–2026) — other/aggregation.

**Confidence:** Medium (benchmark methodology is contested; magnitudes are not stable across sources).

**[COUNTERPOINT]** These aggregates mix proprietary and open benchmarks of varying rigor; treat exact
percentages as indicative, the *variance* as the real finding.

**User Implications:** Do not quote a single "X% hallucination" for any model. State the task and
benchmark. Assume higher risk in legal/medical/financial domains and verify accordingly.

### Finding G1 — Ghost references are a *persistent, non-declining* failure, and the verification burden grows

**The Finding:** Citation hallucination is **not** a temporary artifact that newer models outgrow. A
longitudinal study across **eight ChatGPT generations (2023→2025)** found legal citation hallucination
rates are "no longer consistently decreasing": mid-2024 GPT-4o hit the lowest rate (1.23%), but later
models (GPT-5.1) hallucinated citations at a *significantly higher* rate (p=0.001). Meanwhile the
number of AI-generated filings grows, and newer models emit *more* citations per document — so the
total verification burden compounds. Early rates were far worse: Dahl et al. (2024) found 69% (GPT-3.5)
to 88% (Llama-2) hallucination on verifiable federal-court questions; Walters & Wilder (2023): 55%
(GPT-3.5) and 18% (GPT-4) of bibliographic citations entirely fabricated.

**Sources:**
- "Who Checks the Citations? Benchmarking Legal Hallucination Detection," arXiv:2606.21155 (2026) — preprint (longitudinal, p=0.001 result).
- Dahl et al., "Large Legal Fictions," arXiv:2401.01301 (2024) — preprint.
- Walters & Wilder, Scientific Reports 13:14045 (2023) — peer-reviewed.

**Confidence:** High (multiple independent studies; the longitudinal claim is the most important).

**[COUNTERPOINT]** Domain-specific (legal); the exact "non-declining" pattern may not generalize to
all citation types — but the *direction* (no automatic self-correction) is the robust finding.

**User Implications:** Verify every citation the model emits; never trust a reference list without
checking existence. For TAMAKEE law study, this is why vault-grounding (Pass 1/B7.5) is foundational.

### Finding G2 — Ghost references vary by domain and even by citation *type*

**The Finding:** Fabrication rates differ systematically: DOI hallucination reaches **89.4% in
humanities vs 29.1% in natural sciences**; legal hallucination ranges 58–88% by model and court
hierarchy (lower courts worse); reference-title hallucination ~47% (GPT-4) to 77% (Llama-2 7B) in CS.
Notably, models *are* consistent on real references' author lists and inconsistent on fabricated ones
— a detectable signature. The hardest hallucination type to detect is **content misrepresentation**
(real citation, wrong holding), which "most likely to distort outcomes."

**Sources:**
- "Detecting and Correcting Reference Hallucinations in Commercial LLMs and Deep Research Agents," arXiv:2604.03173 (2026) — preprint.
- Agrawal et al. (2024, self-consistency on references) — cited in the above.

**Confidence:** Medium-High.

**[COUNTERPOINT]** Some rates are from early models (Llama-2 era); current frontier models are lower
but the *type hierarchy* (content misrepresentation hardest) persists.

**User Implications:** Treat "real citation, wrong content" as the most dangerous failure — verify the
*substance*, not just the existence. Use self-consistency (ask twice, compare) as a cheap probe.

### Finding T1 — "Tourist responses" are real but under-formalized; the closest rigorous constructs are shallow-heuristics and overconfidence

**The Finding:** The term "tourist response" (authoritative-sounding but shallow) has **no canonical
peer-reviewed definition** — this is a practitioner term. The rigorous literature captures the
underlying phenomena differently: (a) **fluency-over-accuracy** (hallucination surveys: models
prioritize plausible text over true text); (b) **overconfidence / poor self-calibration** — models
"cannot always predict when they are producing hallucinations" (Dahl et al.); (c) **shallow pattern
matching** — "do models truly reason, or exploit shallow statistical patterns?" (CoCC). So the honest
answer: the *phenomenon* is documented; the *label* is not a research construct.

**Sources:**
- Dahl et al., "Large Legal Fictions" (2024) — preprint (overconfidence finding).
- Chain-of-Code Collapse, arXiv:2506.06971 (2025) — preprint (shallow-pattern question).

**Confidence:** Medium on the label; High on the underlying phenomena (overconfidence, fluency-bias).

**[COUNTERPOINT]** I found no controlled study quantifying "tourist responses" as such; flagging that
explicitly rather than fabricating a citation for it.

**User Implications:** Probe for depth — ask for *why*, *counterexamples*, *limits* — not just a fluent
answer. Treat confidence as uncorrelated with correctness.

### Finding R1 — Reasoning is brittle to *surface-level* prompt variation, even when meaning is preserved

**The Finding:** Semantics-preserving perturbations (rephrasing, storytelling, reordering, irrelevant
constraints) degrade performance up to **−42.1%** — and, paradoxically, some *improve* it up to +35.3%
— on code generation (700 instances, 9 models). Brittlebench (2026) formalizes this: semantics-preserving
perturbations degrade frontier models up to **12%**, and **a single perturbation changes model rankings
in 63% of cases**; prompt variation accounts for **up to half** of a model's performance variance. So
brittleness to phrasing is a *systematic, inherent* property, not a rare edge case.

**Sources:**
- Chain-of-Code Collapse, arXiv:2506.06971 (2025) — preprint.
- Brittlebench, arXiv:2603.13285 (2026) — preprint (FAIR/Meta co-authors).

**Confidence:** High.

**[COUNTERPOINT]** Adversarially-constructed perturbations may overstate real-world brittleness; clean
benchmarks overstate robustness — the truth is between, which is the point (evals are noisy).

**User Implications:** Do not assume a rephrased question gives the same answer. Re-run critical tasks
with varied phrasings; treat single-shot answers as unstable for anything consequential.

### Finding R2 — Reasoning failures scale with difficulty and concentrate in "middle" information

**The Finding:** Perturbations hit hard problems harder than easy ones (CoCC); and long-context
reasoning fails worst in the *middle* of the input (Pass 1, "lost in the middle" / context rot). Both
imply the same thing: failure is *not* uniformly distributed — it clusters at the edges of a model's
capability and at specific positions.

**Sources:**
- Chain-of-Code Collapse (2025) — preprint.
- Liu et al., Lost in the Middle (TACL 2023) — peer-reviewed (cross-ref Pass 1).

**Confidence:** High.

**[COUNTERPOINT]** Difficulty-interaction is from one code-domain study; middle-position is QA/retrieval
— generalization across domains is reasonable but not identical.

**User Implications:** Budget extra verification for hard problems and for information buried mid-document.

### Finding L1 — Out-of-domain performance is weak, and calibration degrades out-of-distribution

**The Finding:** Fine-tuned mitigation (monitor models, SFT on long-context classification) "failed to
generalize to out-of-distribution evaluations" (context-rot paper). Combined with the domain-variance
finding (H2/G2), the pattern is: **performance and reliability are highest in-domain, degrade OOD**, and
fixes that tune for one distribution don't transfer. This is version-stable behavior, not a specific-model quirk.

**Sources:**
- Classifier Context Rot, arXiv:2605.12366 (2026) — preprint (OOD SFT failure).
- Dahl et al. (2024) — preprint (domain/contra-factual bias).

**Confidence:** Medium-High.

**[COUNTERPOINT]** "OOD" is broad; some transfers do work (few-shot). The robust claim is *don't assume* transfer, not *it never happens*.

**User Implications:** Test in the actual domain before trusting; don't extrapolate a model's in-domain
accuracy to a new domain.

---

## 2. SYNTHESIS — INHERENT vs. VERSION-SPECIFIC

| Failure mode | Inherent (architecture) | Version-specific |
|---|---|---|
| Hallucination (H1, H2) | **Inherent** — generative, fluency-biased | Rates vary by model & generation |
| Ghost references (G1, G2) | **Inherent tendency** | Rates **non-monotonic** — later models can be *worse* (GPT-5.1 > GPT-4o) |
| Tourist/shallow output (T1) | **Inherent** (overconfidence, shallow heuristics) | Partially mitigated by reasoning training |
| Prompt brittleness (R1) | **Inherent** — surface-form sensitivity | Magnitude varies; rankings shift 63% |
| Reasoning errors (R2) | **Inherent** — clusters at difficulty/position | Improves with model scale |
| OOD failure (L1) | **Inherent** — distribution dependence | Improves with scale, never resolves |

**The through-line:** every major failure mode is *architecturally rooted*, so no "next model" will
eliminate them — which is why the field's own conclusion is **verification + retrieval + reasoning
hybrids**, not "wait for a better model."

---

## 3. MITIGATION (user-facing, action-verb form)

- **Verify** citations and references against the source — never accept a reference list unread.
- **Ground** responses in supplied source material (paste the text; require citation).
- **Probe** depth explicitly ("why? counterexamples? limits?") to defeat tourist/shallow answers.
- **Re-run** consequential tasks with varied phrasing (brittleness); treat single answers as unstable.
- **Assume** higher risk in legal/medical/financial domains and verify proportionally.
- **Use** self-consistency (sample multiple answers, compare) as a cheap hallucination probe.
- **Monitor** long autonomous workflows incrementally (Pass 1 — monitor models also degrade).

---

## 4. GAPS & NEXT STEPS

- **"Tourist responses" has no canonical peer-reviewed construct** — I flagged this rather than
  fabricating a citation. A formal definition + benchmark is a genuine gap.
- **Hallucination "rates" are benchmark-fragile** — no standard metric; aggregates disagree. A
  consensus measurement protocol is needed.
- **Most failure-mode studies are 2023–2025, single-domain**; multi-provider, multi-domain replication
  is thin, especially for the non-monotonic citation trend (single study, though strong).
- **Some current-model figures (FACTS, Vectara 2026) are from industry aggregates**, not peer-reviewed —
  treated as indicative.
- No paywall blocked this pass; all sources retrieved as abstract/HTML/PDF.

---

## 5. SOURCE LOGGING TABLE

| Source | Type | Date | Accessible | Used |
|---|---|---|---|---|
| LLM Hallucination Comprehensive Survey (2510.06265) | preprint | 2026 | yes | yes |
| Huang et al., Hallucination Survey (2311.05232) | preprint | 2023 | yes | yes |
| Who Checks the Citations (2606.21155) | preprint | 2026 | yes | yes |
| Large Legal Fictions (2401.01301) | preprint | 2024 | yes | yes |
| Walters & Wilder, Sci Reports 13:14045 | peer-reviewed | 2023 | yes | yes |
| Detecting/Correcting Reference Hallucinations (2604.03173) | preprint | 2026 | yes | yes |
| Chain-of-Code Collapse (2506.06971) | preprint | 2025 | yes | yes |
| Brittlebench (2603.13285) | preprint | 2026 | yes | yes |
| Classifier Context Rot (2605.12366) | preprint | 2026 | yes | yes |
| Lost in the Middle (TACL 2023) | peer-reviewed | 2023 | yes | yes |
| Vectara/FACTS + rate aggregations | industry benchmark/other | 2025–2026 | yes | yes |

---

*Pass 3 complete. All three passes delivered sequentially per the execution rule.*
