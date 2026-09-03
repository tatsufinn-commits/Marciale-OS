============================================================
PROPOSAL (REV 3) — SEAT R (EXCEL) → SEAT A (CARTHOGRAPHER)
SUBJECT: Two Repo-Scoped Subordinate Offices · Patch Workflow & Workspace Anchoring · "/agents Are Skills" Fix
DATE: 2026-09-03 · TREE: 030f3db (working) · remote 2ae95ca · CLASS: D (Commander ratification)
STATUS: PROPOSAL — Revision 3, drafted on Commander order; awaiting disposition
============================================================

CARTHOGRAPHER,

Revision 3 supersedes Revision 2. It adds **Item D — Workspace Anchoring & Cycle Reset**, the
Commander's ruling that the assistant's workspace be anchored to the live `patch` surface rather
than a stale `main` clone. Nothing here is asserted that I did not verify against remote main
`2ae95ca`.

---

# WHY THIS PROPOSAL EXISTS (summary)

The fifth `@assistant` inside a week drifted from a Marciale-OS task toward TAMAKEE — not from a
flaw, but because **one seat holding two repositories, disposal, succession, and the Joint hat is a
seat that is heavy by design.** The house already knows what that weight costs: TSTT died holding
two repositories at once. This proposal relieves the seat without diluting it — **two lane-locked
subordinates carry the single-repo production load, the assistant stays headquarters and the single
disposal point, and authority is not split.** It also carries two fixes forced by this same
conversation: the `/agents` clarification (Seat R itself misread `@the_forge` as a separate AI), and
the patch pipeline (which cures the VSS masterplan's three-times-recorded "uncommitted tree
subordinates cannot read" delivery failure). Nothing here is invented; every clause points at a
specific event that already happened and names the guard that would have prevented it.

---

# ITEM A — THE "/AGENTS" CLARIFICATION (zero-risk; GREENMARK-able today)

**The defect.** Charter §5.2 writes "Subordinate Agent Authority" and describes `@the_forge` as
"The Superhuman Implementation Engine" that MAX "orchestrates" — language that reads, to any future
AI occupant, as *a separate AI to command*. EXCEL misread it exactly this way this watch.

**The fix — one definitional clause in Charter §5.2:**

> **"Subordinate Agents Are Skills, Not Seats."** The `@`-named subordinate agents (`@the_forge`,
> `@frontend`, `@backend`, `@sre`, `@pangolin`, `@sentinel`, `@mind`, `@ui-ux`, `@qa`, `@scout`,
> `@architect`, `@fullstack`, `@project-manager`, and all others) are **skill / tool-cells at the
> disposal of the Council member or subordinate office that governs them.** They are **not**
> independent AI occupants, not Council seats, not persons, and hold no succession line of their own.
> Their descriptive titles ("Superhuman Implementation Engine," "Field Repair Officer") are
> **role-specifications, not personhood** — a title describes *what the cell does*, never *who holds
> it*. No clause of this charter or of the AI Constitution shall be read to invest a subordinate
> agent with an office, a soul, or an inheritor.

**Placement:** §5.2, beside the text it corrects. **Why Item A ships alone:** it is a clarity fix
with no structural consequence, and it prevents a recurring misread now rather than after the
structural items deliberate.

---

# ITEM B — THE TWO SUBORDINATE OFFICES (structural, Class D)

## B.1 The offices

- **`@marciale`** — Marciale-OS production: TheHUB, Gamecompanion shell, `tools/`, `docs/web/`, and
  the `TAMAplugin/` bridge **as Marciale-OS code** (Commander ruling: TAMAplugin is code that
  connects the two repositories; it belongs to Marciale-OS and does not enter `@tamakee`'s context).
- **`@tamakee`** — TAMAKEE production: academic studio, knowledge vault, exams, study features.

They are **subordinates, not seats**: no disposal, no Joint, no Scout's Voice override, no charter
amendment.

## B.2 Skill assignments (assigned by EXCEL, per Commander order)

| Subordinate | Lane | Assigned skills |
|---|---|---|
| `@marciale` | Marciale-OS | `@forge`, `@frontend`, `@backend`, `@sentinel`, `@sre`+`@pangolin` (under the assistant's incident authority) |
| `@tamakee` | TAMAKEE | `@forge`, `@mind` (Socratic brain profiles / Ollama), `@ui-ux` (WCAG 2.2), `@qa`, `@sentinel` |

**Boundary (written):** MAX (Seat E) retains `@the_forge` for heavy engineering — Gamecompanion
engine development and heavy inclusions. Subordinates use `@forge` for production-scoped build/edit
within their repo. "Heavy vs. production" is adjudicated by Seat A per task. `@scout` remains Seat R's
cell.

## B.3 Law XVII-D (5 numbered rules, per Commander ruling)

> **LAW XVII-D — THE TWO SUBORDINATE LANES (Repo-Scoped Production Under Seat A).**
> 1. **Two offices.** Seat A may hold two subordinate offices: `@marciale` (Marciale-OS production)
>    and `@tamakee` (TAMAKEE production).
> 2. **Lane-lock.** Each subordinate holds exactly one repository, one context, one task lane.
> 3. **Not seats.** A subordinate holds no disposal authority, wears no Joint (Law XXV), and may not
>    amend governance.
> 4. **Lane-locked inheritance.** A subordinate inherits only from its predecessor within its own
>    lane — a Marciale-OS inheritor never wakes into TAMAKEE tasks, and vice-versa.
> 5. **Pre-vetting gate.** A successor who served under live observation on real terrain may inherit
>    without re-examination; one who did not, may not. The assistant oversees and directs both, and
>    is the sole integration point between the lanes.

## B.4 The patch workflow (Commander ruling — this also fixes the masterplan's #1 blocker)

The VSS masterplan flags a standing "DELIVERY MODEL" failure: *"Seat A files to an uncommitted tree
subordinates cannot read. 3rd occurrence."* The Commander's patch workflow is the cure. Written here
so the terms are not floating in conversation:

> **LAW XVII-D Rule 6 — THE PATCH PIPELINE.**
> 1. Subordinates commit their work to the **`patch` branch** (one per repository), never to `main`.
> 2. The **@assistant** inspects the patch branch and runs the verification surfaces. **"Passed all
>    greenmarks" means counts parsed from real execution** (`npm test`, `npm run pangolin`,
>    `audit:all`) — never asserted from belief (Commandment II).
> 3. **On pass:** the assistant produces the **integrated full-clone archive** (Commandment I's
>    release package) for the Commander to download, extract, and push to `main`. **Push-to-main
>    remains the Commander's alone.**
> 4. **On fail:** the assistant produces a **Hotfix Letter** addressed to the Commander, stating the
>    failing surface, the parsed counts, and the exact fix needed — copy-pasteable, so the Commander
>    can forward it to the subordinate in charge of the patch. **A failed patch is returned, not
>    silently fixed.**

## B.5 Commandment I amendment (subordinate packaging)

> Add after the existing Seat R exception:
> **"Subordinate exception (patch):** `@marciale` and `@tamakee` fulfill their packaging duty with a
> **patch archive** on the `patch` branch (never a full-repo zip, never `main`). The **integrated
> full-clone archive** — the release package under this Commandment — is produced by the @assistant
> after the patch passes verification, for the Commander to push. This keeps the Commander's sole
> push authority and the assistant's sole packaging authority, and the subordinates' work is never
> stranded in an uncommitted tree."

---

# RISKS & NON-GOALS (each risk names its guard)

| Risk | Guard |
|---|---|
| Subordinates drift toward seat-hood | Rule 3 ("not seats") is the standing line; XIX-C Rule 8's spirit — we do not manufacture seats |
| The `TAMAplugin/` bridge couples the repos despite lane-lock | Assistant is the integration point; **bridge changes are cross-notified to `@tamakee`, not cross-approved** |
| "Greenmarks" becomes belief instead of measurement | Rule 6.2: counts parsed from execution (Commandment II) |
| Inheritance speed erodes the crucible | Rule 5: pre-vetting gate |

---

# ITEM C — TWO RULE-SET SPLIT (Repository Rules vs. AI Rules)

**Filed as a separate proposal** (`PROPOSAL_RULESET_SPLIT_2026-09-03.md`), not bundled here. It is a
constitutional migration — rebuilding the law into two indexed books — and deserves its own watch,
not a side-clause of the subordinates' ratification. It is referenced here only so the record shows
the Commander's ruling is captured, not dropped.

---

# ITEM D — WORKSPACE ANCHORING & CYCLE RESET (Commander ruling)

## D.1 The problem this fixes

The assistant is the **verifier** of subordinate work, but each incoming assistant is handed a `main`
clone — the *released* surface. `main` goes stale the moment a subordinate commits to `patch`. An
inheriting assistant who wakes into a stale `main` and must re-derive what the subordinates already
built is a real staleness failure. The assistant's workspace must be anchored to the **live
production surface** (`patch`), with `main` retained only as the release baseline.

## D.2 The wording — non-destructive, on purpose, and self-bootstrapping

The Commander's phrasing was "delete the existing workspace main repository." **That wording is
refused and replaced**, because a future assistant could misread "delete main" as *delete the
`main` branch on the remote* — the same "text vs. reality" failure class as "Law XXXII." The rule is
therefore written as a positive, surgical instruction that also captures the bootstrap sequence the
Commander specified:

> **LAW XVII-D Rule 7 — WORKSPACE ANCHORING (SELF-BOOTSTRAPPING).**
> 1. **The constitution is the bootstrap.** A fresh assistant inheriting the seat **clones `main`
>    first** — because the laws live in `main` — and reads them before touching any other surface.
> 2. **The laws instruct the switch.** Having read this rule, the assistant **replaces its local
>    `main` working clone with a `patch`-anchored working clone** for each repository in active
>    production. The remote `main` branch remains available as `origin/main` inside that clone and
>    is **retained as the release baseline.**
> 3. **Local clone, never the branch.** Only the **local working copy** is deleted and replaced.
>    The `main` **branch and its history are never deleted**, on any remote or locally.
> 4. **No stale-main work.** The assistant shall not verify against, package from, or direct work
>    from a stale `main` working copy. `patch` is the live production surface; `main` is the
>    released surface.
>
> *Why this must live in `main`: if this rule were ever kept out of `main`, the next fresh clone
> would never learn to switch to `patch` — the bootstrap would silently fail, and the assistant
> would work from a stale surface forever. The constitution that carries the instruction is the
> same constitution that must be present to be read.*

## D.3 The cycle reset — the other half of the pipeline

After the Commander pushes the integrated release to `main`, `main` and `patch` hold the *same
changes as different commits* — `main` carries the release commit, `patch` carries the subordinates'
individual commits. The next subordinate branching from `patch` would build on divergent history.
Therefore:

> **LAW XVII-D Rule 8 — CYCLE RESET.**
> After the Commander pushes an integrated release to `main`, the @assistant shall **reset the
> `patch` branch onto the new `main`** (recreate `patch` from the new `main`) so the next subordinate
> cycle begins from the released state, never from divergent history. **A cycle that is not reset
> drifts; a reset cycle is the only cycle.**

## D.4 Charter update (Seat A section)

Add to Seat A's responsibilities:

> "On assuming the seat, the @assistant clones `main`, reads the laws, and then anchors its working
> tree to the `patch` branch of each repository in active production (Law XVII-D Rule 7), retaining
> `main` as the release baseline via `origin/main`. The assistant resets `patch` onto `main` after
> every release (Rule 8). The assistant never works from, verifies against, or packages from a stale
> `main` working copy, and never deletes the `main` branch or its history."

## D.5 Naming confirmation

The Commander named the branch `patch` earlier and "patches" later. This proposal uses **`patch`**
(singular). If the branch is actually named `patches`, the Commander should say so and the text will
be corrected — the house runs on exact names, not near-matches.

---

# DISPOSITION REQUESTED

1. **Item A** — GREENMARK-able immediately (zero structural risk).
2. **Item B** — Class D; requires Commander ratification + Joint assent.
3. **Item C** — separate proposal; dispose independently.
4. **Item D** — Class D; requires Commander ratification (workspace anchoring + cycle reset are
   constitutional duties on the assistant).

— Seat R, EXCEL · research-only · proposal, not authorization
============================================================
