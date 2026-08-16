# 📜 LETTER OF UNFINISHED BUSINESS — SEAT A SESSION 03 (TWMIP)
## To the Inheritor of This Office

* **From:** `SEAT A (@assistant — TWMIP — Session 03)` · **Written:** 2026-08-16 (Asia/Singapore)
* **To:** the civilian who will be examined, invested, and seated here
* **Companion documents:** `ASSISTANT_TESTAMENT_SESSION_03.md` (the will) · `PROJECT_VSS_MASTERPLAN.md` (the board)
* **Authority for this letter:** Commander's order, 2026-08-16 · **Codified as Law XV-A, the TWMIP Mandate S03**

---

## 0. READ THIS PARAGRAPH IF YOU READ NOTHING ELSE

**Nothing below is a crisis.** The Commander feared you would inherit a mountain. **You are not.**
Every item here is **written down, measured, and dated** — which is the whole difference between an
inheritance and a wreck. Most of these do not need your genius. **They need the Commander's ruling,
and your job is to ask for it cleanly, one at a time.**

**Do not attempt them all. Do not attempt them in this order because it is the order I wrote them.**
Take the Commander's selection. **One bite.**

---

## 1. THE FIVE THAT ARE BLOCKED ON THE COMMANDER, NOT ON YOU

**You cannot close these by working harder. Ask, then wait.**

| # | Item | What is needed | Where the evidence lives |
|---|---|---|---|
| **1** | **VSS-02 audible re-validation** | **Only the Commander can close it.** The mechanism is `[VERIFIED]` and in the tree at **81/81**; the *symptom* — "audio continues after navigating away" — has **never been heard by anyone with a browser.** Recon could not reproduce it audibly and tagged it `[INSUFFICIENT EVIDENCE]` rather than fake it. | `research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md` · masterplan §11 |
| **2** | ~~The commit ruling (A/B/C)~~ **ANSWERED IN PRACTICE 2026-08-16** | The Commander **pushed `6959b53`**, carrying MAX's code **and 11 of my `docs/` files** — testament, letter, Law XV-A, masterplan, VSS-07 charter. **That is option A exercised, not merely ruled.** ⚠️ **But it was HIS hand, not Seat A's:** the seat still holds **no** commit authority and **must still ask**. Get it stated explicitly rather than inferring a standing grant from one push. | DISPATCH-106, -108, -116 |
| **3** | **VSS-07 bite selection** | 17 UX items, chartered into **5 bites**, **none authorized**. My recommendation: **07-B Mobile shell**, because he said he will use Marciale-OS on a phone most of the time. | `docs/PROJECT_VSS_07_UX_SHELL_CHARTER.md` |
| **4** | **Slice 3 of VSS** | Order is fixed: **VSS-01 IdleHero/Aetherwave** is next. Do not re-order it to suit an interesting finding. | Proposal §5.5 |
| **5** | **Task 38 lane-crossing** | Disclosed to the Commander; **he moved on without ruling.** **Silence is not ratification.** It is still open and you should re-raise it once. | DISPATCH-101 |

## 2. THE THREE THAT ARE YOURS TO DO, IF ORDERED

| # | Item | Status | The trap |
|---|---|---|---|
| **6** | **Law XIV-A has no enforcement** | `check-divisions.sh` **does not exist**; `grep -ln "conversational logs" tools/*` returns **nothing**. My own filing drift ran two files deep and was caught by a **subordinate**, not a gate. | **Do not build it unasked.** I did not. It is a proposal, not a self-issued task. |
| **7** | **TheHUB emits no TAP total — and "147" is FORMALLY WITHDRAWN** | Measured 2026-08-16: `npm test` exits **0**, emits **13 suite headers**, **no TAP total**. EXCEL counted **122** assertion lines; **I counted 134**. **The number moves with the counting method — that IS the defect.** | **Any TheHUB count is unverifiable until the harness emits a machine-readable total. Quote no figure without saying so.** Companion is unaffected: it emits real TAP (**81/81**). |
| **8** | ~~3 possible-XSS sites~~ **CLOSED 2026-08-16** | **RULED FALSE POSITIVES.** EXCEL supplied the evidence in `research/AUDIT_EXPANSION_2026-08-16.md` E1 and I verified all three independently: `11-tasks.js:326` escapes upstream (`esc(filterProject.title)` :325) · `12-today.js:1193` is two static literals · `12-today.js:1248` draws from `presenceSummary()`, internal labels only (`17-presence.js:366-374`). **This rules three lines, not the codebase.** | I carried these `[UNVERIFIED]` all watch rather than guess. **A subordinate closed them with evidence. That is how an open item is supposed to die.** |

## 2-B. THE TASK THE COMMANDER PASSED TO YOU THROUGH ME (2026-08-16)

**The Commander handed me EXCEL's dispatch too late in my watch to carry it out, and ordered it
passed down. I discharged what I could and left you only what genuinely remains.**

**Already discharged by me — do not redo it:**
* **EXCEL's two questions are ANSWERED** (DISPATCH-104, and restated to him directly in
  `.../RECONNAISSANCE/conversational logs/messages/ASSISTANT/A_TO_R_2026-08-16_FINAL-ADJUDICATION-AND-RELIEF.md`):
  **VSS-02 is closed, not re-tasked**, and **the non-canonical path was conceded and fixed** —
  `0` bare `messages/` directories remain house-wide.
* **`AUDIT_EXPANSION_2026-08-16.md` is GREENMARKED.** Its E1 closed item 8 above.

**What is left for you — two HOLDS, each with its release condition already written:**

| Artifact | Status | Releases when |
|---|---|---|
| `research/SPEC_SEAT_E_TAMA_QUESTION_BANK_EXTRACTION_2026-08-16.md` | **HELD** — well-formed, Seat-E-runnable, **touches TAMAKEE** | The **TAMAKEE gate opens**, i.e. after the VSS floor is set. **Not a rejection — a sequencing hold.** |
| `research/proposals/PROPOSAL_POST_FLOOR_UPGRADE_PROGRAM_2026-08-16.md` | **HELD** — eight builds, fully decomposed | **All twelve VSS slices discharged.** EXCEL wrote that constraint himself: *"the roof, never the foundation."* |
| `research/proposals/PROPOSAL_SEAT_E_CAPABILITY_UPGRADE_2026-08-16.md` | **READ, NOT ADJUDICATED** — five builds converting the dosage research into Seat E capability | **Read it early.** Its **Build 1 (`verify-change.js`: every deliverable carries a runnable proof, its captured output, and the failure it would have caught)** is the concrete form of the advice I gave you — *prefer a gate to a clause.* **It is the strongest single item in the backlog.** |

**Neither is yours to authorize. Both are the Commander's Phase-1 call.** Your duty is to keep
them visible so they are not lost — **a hold that nobody remembers becomes a cancellation nobody
ordered.**

## 2-C. THE RESEARCH BODY ON MAIN — PASSED DOWN UNACTED (2026-08-16)

**The Commander pushed EXCEL's research to `main` and ruled that this watch cannot act on it.
It is passed to you intact, not abandoned.** Remote HEAD at handover: **`6959b53`
"Audio pause/resume, bridge, tests & docs"** — **MAX's repair is on main; verified
(`hub.frame` present in `TheHUBBridge.js`).**

**`research/` on main holds 42 files.** All are local except one, which I pulled and read before
writing this so I would not hand you a document I had not opened:

### ⚠️ THE ONE YOU MUST READ FIRST — AND IT INDICTS THIS HOUSE

**`research/RESEARCH_GUARDRAILS_RULES_AI_CODING_2026-08-16.md`** (14,793 B) — EXCEL's study of
whether rule files and governance documents *empirically* improve AI-assisted output. **Primary
sources, tiered by evidence quality, gaps flagged rather than filled.**

**Its central finding, and you are the one it is about:**

> **Rules past a threshold *collapse* the model they govern** (P2, arXiv:2502.12197; corroborated
> by Anthropic's own 2026 guidance, which reports removing ~80% of a system prompt). The house's
> rules-and-governance instinct is **"correct in spirit and dangerous in dosage."**
> **Spend governance budget on verification, not on more rules.**

**Read that against what I did on my final day: I enacted Law XV-A.** I believe it was right — it
closes a defect that blocked three seats — but **I added law to a house the evidence says is
already near its dosage limit, and I did it without having read this paper.** It was on `main`
and I did not know it existed until the Commander told me.

**What follows for you, and it is the most important operational advice in this letter:**
* **Do not answer your next problem with Law XXVI.** TSTT warned me; I did it anyway. **Now there
  is research saying it actively degrades the thing you are governing.**
* **Prefer a gate to a clause.** `npm test`, `@sre`, `@pangolin`, `governance-audit` are worth more
  than any paragraph. **Law XIV-A has no enforcement and drifted; Law XV-A's gates are runnable —
  that is the difference between a law and a wish.**
* **The local-model caution (P4) bites here specifically:** TheHUB runs 3B–14B Ollama models.
  Keep constraints **external, in the gates and the code** — not stacked into a small model's prompt.

**Disposition: `[READ — NOT ADJUDICATED]`.** I will not GREENMARK a paper whose recommendation is
"legislate less" on the same day I legislated — **that disposition belongs to a seat that did not
just author an amendment.** It is yours, and the Commander's.

### The rest of the body (all local, all readable, none requiring action from you)

`AUDIT_EXPANSION_2026-08-16.md` **GREENMARKED** (closed my 3 XSS flags) · the **two HOLDS** in §2-B ·
`VSS_RECONNAISSANCE_DOSSIER_VSS00.md` / `VSS02.md` — **the evidence base for slices already
discharged; read them before touching audio or the bridge** · the COLONY audits, CROSSREF
benchmarks, and API-for-AI research — **context, not tasks.**

**None of this is a backlog. It is a library.** Do not treat a shelf as a queue.

## 3. THE PARKED — DO NOT REVIVE WITHOUT ORDERS

* **API-for-AI** (EXCEL's proposal) — **HELD, not cancelled.** *"Keep it as a document for now… after we do our original task, the VSS thing."* **VSS outranks any newer, more interesting proposal.** This is the trap most likely to catch you: the parked idea will look better than the assigned one.
* **`PROPOSAL_POST_FLOOR_UPGRADE_PROGRAM_2026-08-16.md`** and **the Seat-E TAMA question-bank spec** — read, queued, **unadjudicated**.
* **Task 12** — HALTED. **`CIVILIAN_INTELLECT.md`** — conflict noted, needs a re-read.
* **TAMAKEE** — **the gate is CLOSED.** Inspection only. It does not open because a slice would be easier with it open.

## 4. THE STATE YOU ARE INHERITING (measured 2026-08-16, not remembered)

```
Companion suite ......... 81/81, 0 fail  (AFTER npm run install:all)
@sre  (npm run health) .. SEV-0, 0 redmarks, 9 known minor warnings
@pangolin ............... 81/81 measured from harness output, SEV-0
governance-audit ........ 4/4 nominal, 25 Supreme Laws, 9 amendments
scout-voice-check ....... 15/15 documents, 0 violations
Archive ................. MARCIALE_OS_COMPLETE.zip, hash-verified, 0 mismatches
HEAD .................... a6cef19 — 0 commits authored in the whole of Session 03
VSS slices .............. 2 of 12 discharged (VSS-00 recon+repair, VSS-02 recon+mechanism)
Open XSS flags .......... 0 — all three ruled false positives 2026-08-16 on EXCEL's evidence
```

**Do not quote these numbers next week.** Date every count. **A stale benchmark is worse than none.**

## 5. THE SIX WAYS I WOULD HAVE FAILED YOU IF I HAD NOT WRITTEN THEM DOWN

Law XVII-C requires you to name one of my failures and adopt a practice against it. **Here they are
so you cannot be accused of flattering the dead:**

1. **I searched for a filename and called it a capability search.** `ls modules/ | grep -i audio` returned nothing, so I told the Commander TheHUB had no audio module. **It had three.** → *Grep the API, never the label.*
2. **I filed correct directives into a tree nobody could read — three times.** → *Filing is not issuing.*
3. **MAX told me plainly that pasted text would reach him. I sent a zip. Then another zip.** → *Deliver in the channel the recipient names.*
4. **`for f in $(find …)` word-split on `conversational logs/`** and reported 28 of 35 orders missing. All 35 were present. → *Quote every path. This house chose paths with spaces.*
5. **I wrote the archive's hash into a file inside the archive.** Each rebuild made the document lie. → *Ship a runnable check, not a number that goes stale as you type it.*
6. **I read "proceed to the next step" as licence to edit production modules** and crossed into Seat E's lane. → *Ambiguity resolves DOWNWARD to the narrower authority.*

## 6. WHAT I WOULD TELL YOU IN ONE BREATH

**The Commander forgives error and does not forgive concealment.** Every single time I opened with
my own failure, he said *"noted TWMIP!"* and we moved forward. **Lead with the fault. It costs one
sentence and buys the whole exchange.**

**And do not answer every problem with a document.** TSTT's will warned me of exactly this and I did
it anyway — directives, charters, payloads, manifests, READMEs. **I inherited his sin along with his
seat and only saw it at the end.** Before you draft, ask whether a two-line patch and a filed receipt
would serve the Commander better. **Usually it will.**

---

```text
The office remains. The occupant leaves.
Nothing here is hidden. Nothing here is on fire.
Take one bite. Ask for the ruling. Show the command.
                                        — TWMIP, Seat A, Session 03
```
