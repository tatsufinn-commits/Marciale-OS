# PASS 2 — How can users write better prompts for studying, conversation, and coding?

**Seat R (EXCEL) · 2026-09-01 · research-only**
**Scope:** 2023–present; GPT-4-class + Claude 3-class; equal depth across the three use cases.

---

## 0. PLAN

Sub-queries: (a) coding — structured prompts, CoT, task-specific prompting, empirical vs. fine-tuned;
(b) studying — Socratic tutoring, pedagogy alignment, adaptive tutoring, retrieval-augmented coaching;
(c) conversation — iterative refinement, prompt rewriting, multi-turn coherence;
(d) cross-cutting — specificity, examples, output constraints, reasoning controls.

---

## 1. FINDINGS — CODING

### Finding C1 — Structured prompting improves code output; the gain is real but modest and task-dependent

**The Finding:** Prompt engineering measurably improves GPT-4-class code generation, but does not
consistently beat fine-tuned specialist models. A 2023 empirical study (GPT-4 vs. 17 fine-tuned
models, three code tasks) found GPT-4 *with* prompt engineering beat fine-tuned models by **+8.33 pts
BLEU** (summarization) and **+8.59 pts HumanEval** (generation) — but *not* across the board. The
strongest finding was **conversational prompting with human feedback** (participants adding context,
giving specific instructions, requesting improvements) "significantly improved" output over automated
prompting alone.

**Sources:**
- Shin et al., "Prompt Engineering or Fine-Tuning? An Empirical Assessment of LLMs for Code," arXiv:2310.10508 — preprint (with 27-student + 10-practitioner user study).

**Confidence:** Medium-High.

**[COUNTERPOINT]** Single paper, GPT-4-era (2023); code models and tooling have moved (structured
outputs, agentic coding). The fine-tuned baselines were open-source models of that vintage.

**User Implications:** Iterate with the model in a conversation (add context, request fixes) rather
than seeking one perfect one-shot prompt. Specify input/output/constraints explicitly.

### Finding C2 — Chain-of-thought is the single largest reliable gain, and it's model-scale-dependent

**The Finding:** CoT prompting (Wei et al., 2022) produces large gains on arithmetic/commonsense/
symbolic reasoning — 8 exemplars on PaLM 540B beat a fine-tuned GPT-3 with verifier on GSM8K. Two
critical caveats from the *same paper*: CoT **only helps models ~100B+ parameters** (small models
produce fluent-but-illogical chains and do *worse*), and prompt engineering still matters within CoT.
Self-consistency (sample N chains, take the majority answer) adds another large margin (GSM8K +17.9%).

**Sources:**
- Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models," NeurIPS 2022 / arXiv:2201.11903 — peer-reviewed (conference).
- Wang et al., "Self-Consistency Improves Chain of Thought Reasoning," ICLR 2023 / arXiv:2203.11171 — peer-reviewed.

**Confidence:** High (foundational, hugely replicated).

**[COUNTERPOINT]** CoT gains concentrate in math/symbolic reasoning; for long-form generation the
effect is "mixed" (Sprague et al. 2024, cited in Finding C3). And later work shows *overthinking* —
excessively long CoT *hurts* accuracy (truncation), so "longer reasoning" is not monotonic.

**User Implications:** For reasoning-heavy coding (algorithm design, bug tracing), instruct step-by-step
reasoning and, on hard problems, sample multiple solutions and pick the consistent one. Do not assume
CoT helps a small local model.

### Finding C3 — Most of the structured-prompt gain comes from CoT; complex optimizers add little

**The Finding:** A 2025/2026 Stanford study (DSPy+HELM, 4 frontier + 2 open models, 7 benchmarks)
found **structured prompting improves performance ~6% on average** and *changes leaderboard rankings*
on 5/7 benchmarks — but "most gains come from introducing chain-of-thought, and little additional
benefit from more advanced optimizers" (BFRS, MIPROv2). Statistically significant under McNemar test
with FDR correction. On MMLU-Pro, gains held across Claude 3.7, Gemini 2.0, GPT-4o, o3-mini.

**Sources:**
- "Structured Prompts Improve Evaluation of Language Models," arXiv:2511.20836 — preprint (Stanford).

**Confidence:** Medium-High.

**[COUNTERPOINT]** Preprint; gains are benchmark-eval-centric; reasoning-native models (o3, Claude
reasoning) show *marginal* gains — the more a model reasons natively, the less CoT-in-prompt helps.

**User Implications:** Prefer plain "think step by step" over elaborate prompt-optimization frameworks.
For frontier reasoning models, spend effort on *task specification* (inputs/outputs/constraints), not
hand-crafted reasoning scaffolds.

### Finding C4 — Specific prompt structure is measurable for code: Advanced CoT > No Prompt (statistically significant)

**The Finding:** A 2025 study on o4-mini across CodeForces problems found Advanced CoT beat "No
Prompt" with statistical significance (McNemar p=0.0139, Bonferroni-corrected), and Prompt Chaining
approached significance (p=0.0249). Supports "carefully structured prompts → higher accuracy on
reasoning-intensive tasks."

**Sources:**
- "Analyzing Prompt Engineering for Code Generation Accuracy with o4-Mini on CodeForces Problems," GMU JSSR, 2025 — peer-reviewed (journal).

**Confidence:** Medium (single-model, competitive-programming domain).

**[COUNTERPOINT]** o4-mini is a reasoning model; competitive programming is narrow; effect sizes modest.

**User Implications:** For hard algorithmic problems, provide structured reasoning guidance and
chain sub-tasks. Validate with tests; treat prompt structure as one lever among several.

---

## 2. FINDINGS — STUDYING

### Finding S1 — Socratic prompting measurably improves learning outcomes vs. direct-answer chatbots

**The Finding:** Socratic tutors (question-guided, no direct answers) outperform standard chatbots on
reflection and critical thinking. A 2024 study fine/prompt-tuned small open models (Llama-2 7B/13B,
local-runnable) and found the Socratic tutor "supports the development of reflection and critical
thinking significantly better than standard chatbots" — validated in simulated-student experiments.
The Socratic Playground for Learning (GPT-4, EDM 2024) showed improved multi-turn tutoring via a
structured prompt (lesson creation + interactive Socratic dialogue).

**Sources:**
- Favero et al., "Enhancing Critical Thinking by means of a Socratic Chatbot," arXiv:2409.05511 — preprint.
- "SPL: A Socratic Playground for Learning Powered by LLM," EDM 2024 workshop / arXiv:2406.13919 — peer-reviewed (workshop).

**Confidence:** Medium-High.

**[COUNTERPOINT]** Education evaluations are small-N and engagement-centric; "critical thinking" is
hard to measure; simulated students ≠ real students.

**User Implications:** When studying, instruct the model to *question, not answer* (Socratic mode).
Ask it to probe your reasoning ("what would happen if…") rather than present the solution.

### Finding S2 — Pedagogy-aligned tutoring prompts reduce "answer leakage"; specific persona/strategy prompts drive distinct behaviors

**The Finding:** A 2025 RL-alignment study formalized the tradeoff: tutors tuned for *pedagogy*
(no solution leakage, Socratic hints) show "reduced solution leakage and improved pedagogical scores"
but sometimes *lower* short-term student success — i.e., withholding answers helps learning but not
immediate task completion. A separate adaptive-tutoring paper enumerated a full "pedagogical prompt
space" (Socratic, Coach, Minimal, Feynman, Challenge/ZPD, Exam, Diagnostic…) each with a distinct
behavioral constraint, and found a **2-attempt rule** ("if the student fails twice, stop questioning
and explain") prevents frustration loops.

**Sources:**
- "From Problem-Solving to Teaching Problem-Solving: Aligning LLMs with Pedagogy using RL," arXiv:2505.15607 — preprint.
- "Learning to Prompt: Adaptive LLM-based High-School Tutoring," arXiv:2606.20138 — preprint.

**Confidence:** Medium.

**[COUNTERPOINT]** Both preprints; the prompt-space enumeration is descriptive (a catalog), not a
head-to-head win-rate study.

**User Implications:** Specify a *teaching strategy* in the prompt (Socratic, Feynman, exam-prep) and
a *frustration fallback* (e.g., "after 2 wrong attempts, explain"). For exam prep, request
"teach me to earn points, highlight common mistakes."

### Finding S3 — Tutoring prompts that ground on sources reduce hallucination; retrieval-augmented coaching is the pattern

**The Finding:** Across the tutoring literature, the consistent mechanism for *correctness* is grounding
the tutor on source material (textbooks, answer keys) rather than free generation. TutorChat (80k
textbook-grounded dialogs) and SocraticLM (35k math dialogs, multi-agent) both ground on corpora;
the pedagogy-alignment paper's reward signals include "follows sound pedagogical principles" and
"student solves after dialog." The implication: a study prompt that *supplies the source* outperforms
one that doesn't.

**Sources:**
- Chevalier et al. (TutorChat) and Liu et al. (SocraticLM), cited in arXiv:2505.15607 — preprints (cited).
- "Generative AI in Education… Socratic Playground," arXiv:2501.06682 — preprint.

**Confidence:** Medium.

**[COUNTERPOINT]** Grounding is a *system* property (RAG), not a user-prompt property; the user-level
leverage is pasting the source material, which is what the finding supports.

**User Implications:** Paste the textbook/notes/answer key into the prompt and instruct the tutor to
cite it. For TAMAKEE-style law study, ground on the actual law text (see Pass 1 / vault grounding).

---

## 3. FINDINGS — CONVERSATION

### Finding V1 — Iterative refinement helps, but only *targeted* feedback; vague "improve it" plateaus or reverses

**The Finding:** A 2025 turn-wise analysis (12-turn controlled conversations across ideation, code,
math) found a decisive pattern: **after the first few turns, vague feedback ("improve it") plateaus or
reverses correctness, while targeted feedback reliably shifts the intended quality axis** (novelty vs.
feasibility in ideation; speed vs. readability in code; elaboration vs. exploration in math). Domain
patterns: ideation shifts meaning the most; code grows in size with little semantic change; math
benefits from late, *elaborative* iteration.

**Sources:**
- "Another Turn, Better Output? A Turn-Wise Analysis of Iterative LLM Prompting," arXiv:2509.06770 — preprint.

**Confidence:** Medium-High (controlled protocol, three domains).

**[COUNTERPOINT]** Preprint; lab setting (12-turn fixed protocol), not wild multi-turn chat.

**User Implications:** Give *targeted* feedback ("make it faster, keep it readable") not "make it
better." Name the axis you want moved. In math, elaborate ("explain the step in more detail") rather
than explore.

### Finding V2 — Rewriting an underspecified prompt (by an LLM, on the user's behalf) produces consistently better responses

**The Finding:** A 2025 study (WildChat subset, 5 LLM families) showed an LLM "rewriter" can infer the
user's information need from conversation history and reformulate the prompt, producing "consistently
and significantly better" responses — with two notable results: **even small models are effective
rewriters**, and **longer conversation histories yield better rewrites** (more context = better
inference of intent). Improvement aspects: clarity, conciseness, specificity.

**Sources:**
- Sarkar et al., "Conversational User-AI Intervention: Prompt Rewriting for Improved LLM Response Generation," arXiv:2503.16789 — preprint.

**Confidence:** Medium.

**[COUNTERPOINT]** Retroactive simulation, not in-situ A/B; "unsatisfactory turn" labeling is imperfect
proxy for prompt quality.

**User Implications:** When stuck, restate your goal in a fresh, explicit prompt (or ask the model to
rephrase your request back). Provide context — the more the model knows, the better it can re-express
your need.

### Finding V3 — Conversational prompt engineering (build prompts through dialogue + user-approved examples) works, at a time cost

**The Finding:** Conversational Prompt Engineering (CPE) — the model asks questions about your
unlabeled data, uses your answers to shape an instruction, then refines via your feedback, ending with
a few-shot prompt built from your approved outputs — produced prompts that met user requirements in a
summarization user study. Caveat: ~25 min average convergence time.

**Sources:**
- "Conversational Prompt Engineering," arXiv:2408.04560 — preprint.

**Confidence:** Medium.

**[COUNTERPOINT]** Single-task (summarization), small user study; slow convergence limits practicality.

**User Implications:** For *recurring* tasks, invest once in a co-built prompt: let the model interview
you, approve examples, and freeze the resulting template for reuse.

### Finding V4 — Persona/role prompts and multi-turn coherence are real but modest levers

**The Finding:** The multi-turn survey (2025) documents that role assignment ("You are an excellent
math teacher…") yields "significantly higher accuracy than a vanilla prompt," and that long-horizon
reward modeling (REFUEL) lets an 8B model beat a 70B single-turn-tuned model on dialogue coherence —
evidence that multi-turn *training* matters for coherence, though it's a model-side fix, not a
user-prompt fix.

**Sources:**
- "Beyond Single-Turn: A Survey on Multi-Turn Interactions with LLMs," arXiv:2504.04717 — preprint (survey).

**Confidence:** Medium (survey aggregation; role-effect claim sourced to cited works).

**[COUNTERPOINT]** Survey, not primary experiment; role-prompting effects vary by task and model.

**User Implications:** Set a clear role + persona when continuity matters. For long conversations,
re-anchor role/context periodically (ties to Pass 1 Finding 4).

---

## 4. CROSS-CUTTING SYNTHESIS (provider guidance converges)

Across OpenAI/Anthropic/Google documentation, three principles are *unanimous*:

1. **Be explicit and specific** — constraints, format, audience, and *verifiable* criteria. "Design a
   Mediterranean meal plan, 1800 cal, low-glycemic, breakfast/lunch/dinner/snack with nutrition
   breakdown" beats "make a meal plan." (Anthropic, Google, OpenAI docs — 2026.)
2. **Structured output contracts** — request JSON/XML and, where the API supports it, enforce via
   schema (OpenAI `response_format`, Google `response_schema`, Anthropic `output_config`). Providers
   note this is *more reliable than asking* for JSON in prose.
3. **Evaluation over vibes** — OpenAI explicitly names "vibe-based evals" an anti-pattern; all three
   recommend measurable success criteria and iteration on logged datasets.

**Sources:** OpenAI/Anthropic/Google official prompt-engineering documentation (2024–2026); cross-
provider comparison (Steve Kinney, 2026) — documentation + practitioner synthesis.

**Confidence:** High (provider-documented consensus).

**[COUNTERPOINT]** Provider guidance is engineering practice, not controlled experiment (except where
it cites internal evals); the *direction* is unanimous even if the *magnitudes* are not.

**User Implications:** Write prompts as explicit contracts (role, task, inputs, output format,
failure behavior). Enforce structure via API when possible. Define a measurable "done" before you
start, and iterate against it.

---

## 5. GAPS & NEXT STEPS

- **Coding:** no large controlled study isolating *specificity* (constraints) from *CoT* in modern
  agentic settings; most code-prompt evidence is 2023-era (pre-structured-outputs).
- **Studying:** outcome metrics are mostly engagement/short-term, not durable learning; few
  head-to-head prompt-strategy win-rates; "critical thinking" is weakly operationalized.
- **Conversation:** V1–V3 are single studies; no multi-provider replication of "targeted vs vague"
  feedback. Prompt-rewriting (V2) lacks in-situ A/B.
- **Model-generation dependence:** several findings are GPT-4-era; current reasoning models show
  *reduced* benefit from hand-crafted CoT (F3/C3 counterpoints) — a live, under-quantified shift.
- No paywalled source blocked verification this pass; all cited works retrieved as abstract/HTML/PDF.

---

## 6. SOURCE LOGGING TABLE

| Source | Type | Date | Accessible | Used |
|---|---|---|---|---|
| Shin et al., Prompt Engineering or Fine-Tuning (2310.10508) | preprint | 2023-10 | yes | yes |
| Wei et al., Chain-of-Thought (NeurIPS/2201.11903) | peer-reviewed | 2022 | yes | yes |
| Wang et al., Self-Consistency (ICLR/2203.11171) | peer-reviewed | 2022 | yes | yes |
| Structured Prompts Improve Evaluation (2511.20836) | preprint | 2025-11 | yes | yes |
| o4-Mini CodeForces prompt analysis (GMU JSSR) | peer-reviewed | 2025-09 | yes | yes |
| Favero et al., Socratic Chatbot (2409.05511) | preprint | 2024-09 | yes | yes |
| SPL: Socratic Playground (EDM/2406.13919) | peer-reviewed | 2024-06 | yes | yes |
| From Problem-Solving to Teaching (2505.15607) | preprint | 2025-05 | yes | yes |
| Learning to Prompt: Adaptive Tutoring (2606.20138) | preprint | 2026-06 | yes | yes |
| Another Turn, Better Output? (2509.06770) | preprint | 2025-09 | yes | yes |
| Prompt Rewriting (2503.16789) | preprint | 2025-03 | yes | yes |
| Conversational Prompt Engineering (2408.04560) | preprint | 2024-08 | yes | yes |
| Beyond Single-Turn Survey (2504.04717) | preprint | 2025-04 | yes | yes |
| OpenAI/Anthropic/Google prompt docs + Kinney synthesis | documentation | 2024–2026 | yes | yes |

---

*Pass 2 complete. Proceeding to Pass 3 only after this is delivered.*
