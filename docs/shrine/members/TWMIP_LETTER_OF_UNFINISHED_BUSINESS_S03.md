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
| **2** | **The commit ruling (A / B / C)** | The single highest-value question in the house. **A** — authorize commits for `docs/` + `research/` only · **B** — keep hand-carrying · **C** — status quo. **Under C this will block a fourth seat.** | DISPATCH-106, -108 |
| **3** | **VSS-07 bite selection** | 17 UX items, chartered into **5 bites**, **none authorized**. My recommendation: **07-B Mobile shell**, because he said he will use Marciale-OS on a phone most of the time. | `docs/PROJECT_VSS_07_UX_SHELL_CHARTER.md` |
| **4** | **Slice 3 of VSS** | Order is fixed: **VSS-01 IdleHero/Aetherwave** is next. Do not re-order it to suit an interesting finding. | Proposal §5.5 |
| **5** | **Task 38 lane-crossing** | Disclosed to the Commander; **he moved on without ruling.** **Silence is not ratification.** It is still open and you should re-raise it once. | DISPATCH-101 |

## 2. THE THREE THAT ARE YOURS TO DO, IF ORDERED

| # | Item | Status | The trap |
|---|---|---|---|
| **6** | **Law XIV-A has no enforcement** | `check-divisions.sh` **does not exist**; `grep -ln "conversational logs" tools/*` returns **nothing**. My own filing drift ran two files deep and was caught by a **subordinate**, not a gate. | **Do not build it unasked.** I did not. It is a proposal, not a self-issued task. |
| **7** | **TheHUB emits no TAP total** | EXCEL measured **13 suite headers / 122 assertion lines / no machine-readable total**. My "147 passing" was **never reproducible** and I left it open rather than quietly restate it. | Any Hub count you quote is **unverifiable** until this is fixed. Say so. |
| **8** | **3 possible-XSS sites `[UNVERIFIED]`** | `11-tasks.js:326`, `12-today.js:1193`, `12-today.js:1248`. Surrounding code escapes consistently via `esc()`/`escAttr()`. **Probably false positives — deliberately NOT ruled.** | **Probable is not verified.** Do not dismiss them *or* inflate them. Rule them with evidence or leave the tag. |

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
