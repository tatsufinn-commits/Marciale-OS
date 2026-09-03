# COLONY AUDIT — `ig-imanish/mx-icons`
**ID:** `COLONY-20260817-04`
**From:** `@colony` (under Seat R · EXCEL)
**Commander source:** https://github.com/ig-imanish/mx-icons.git (verbatim; re-pointed from the blocked Instagram reel)
**Date fetched:** 2026-08-17
**Platform block:** GitHub (G1) · **Upgrade target:** Marciale-OS (pattern only)

---

## 0. INTAKE LEDGER

| # | Source (verbatim) | Platform | Fetch | Tag | One-line observed |
|---|---|---|---|---|---|
| 1 | https://www.instagram.com/reel/DcEV_cTjiFg/ | Instagram | BLOCKED (403) | `[BLOCKED]` | superseded — re-pointed to GitHub by Commander |
| 2 | https://github.com/ig-imanish/mx-icons.git | GitHub | OK | `[OBSERVED]` | React SVG icon library; 2,242 icons × 6 variants; MIT |

*(Row 1 retained per §"never silently omit"; it is discharged by Row 2.)*

---

## 1. WASHED REFERENCE + WANTED EXTRACT (G0 + G1)

### 1.1 `mx-icons` — hand-crafted SVG icon library for React

- **Identity (2 lines):** "Beautiful hand-crafted SVG icons for React — light mode only" (package.json description). A component-per-icon library shipping **2,242 icons**, each in **6 variants** (Linear, Bold, Broken, Bulk, Outline, Twotone) = ~13k source files.
- **License:** MIT (`Copyright 2025 mx-icons contributors`) — permissive, no copyleft.
- **Shape:** React + Vite. `src/icons/components/<slug>/<Icon><Variant>.jsx`; a base `Icon.jsx` wrapper (viewBox `0 0 24 24`, default `size=24`, `color="#292D32"`, `fill=none`); two codegen scripts.
- **Repo hygiene:** HEAD `c6288f81`, `main`, Conventional Commits, ESLint, Vite lib build with `vite-plugin-dts`. Active (PRs for TS declarations, refactors, mobile fixes). Published to npm (`mx-icons`).

### 1.2 G0 — Wanted extract

| Wanted | Value |
|---|---|
| **Claim** | "Tree-shakeable, only imports what you use… zero dependencies." |
| **Proof** | `iconLoader.jsx` dynamic `import()` + `Map` cache; `generate-icon-meta.js` emits names/slugs/variants only (no components) → tiny initial bundle. |
| **Upgrade verb** | **Add (pattern)** · body **Marciale-OS** · REJECT payload |
| **Folder pin (hypothesis)** | `TheHUB …/modules/` (icon/emoji registry), `Gamecompanion/files/src/` (HUD icons), `tools/` (codegen). No production touch without disposition. |
| **Pattern not payload** | Three patterns (below). The 2,242 React components themselves = payload to reject. |
| **Cost** | Zero deps for the *patterns* (codegen + dynamic import are plain JS/Vite). The *library* would add React as a peer dep — a Law I violation for TheHUB (Vanilla JS). |
| **Keep score** | **KEEP (patterns)** · **REJECT-as-core (payload)** |

### 1.3 THE THREE EXTRACTABLE PATTERNS (cited)

1. **Metadata-first lazy loading.** `scripts/generate-icon-meta.js` → emits `src/icons/icon-meta.js` containing *only* `{name, slug, variants[]}` — **no component imports** — "keeping the initial bundle tiny." `iconLoader.jsx` then `import()`s a single component on demand, caches it in a `Map`, and `loadIcon.jsx` (`LazyIcon`) renders a **skeleton** while the chunk fetches, with a `cancelled` flag guarding the unmounted set-state. *The pattern: separate the cheap catalog from the expensive payload; load payload on demand; show a skeleton; cache.* This is the industrial form of a problem any large asset/registry surface has.

2. **Codegen as source-of-truth derivative.** `scripts/generate-types.js` auto-generates `.d.ts` from the component set; `generate-icon-meta.js` auto-derives the catalog. *Types and metadata are generated, never hand-maintained* — the same "one source of truth → many renderings" discipline found in `agency-agents` (A4), applied to a library.

3. **Variant taxonomy as a strict contract.** Every icon ships the same 6 variants with a consistent stroke/fill convention: Linear = `stroke="currentColor" strokeWidth="1.5" fill="none"`; Bold/Bulk = `fill="currentColor"`. *A small, enforced, per-icon invariant* — the house's own governance-as-contract idea, at the level of a single SVG.

### 1.4 PROVENANCE FLAG (diligence, not accusation)

`[INFERRED — NOT VERIFIED]` The variant taxonomy (`linear/bold/broken/bulk/outline/twotone`), the default stroke color `#292D32`, the `strokeWidth=1.5`, and the 24×24 grid are the **signature of Solar Icons** (480 Design, `icon-sax`). I have **not** diffed against the Solar source to confirm derivation, and I am not asserting copying. But the resemblance is strong enough that *before* any adoption the house should run a provenance check (Solar is also MIT, so this is attribution diligence, not a legal block). This is exactly the class of check `tools/scout-audit.js` exists for.

---

## 2. BLOCKED / UNFETCHABLE

| Source | Why | Still in ledger? |
|---|---|---|
| Instagram reel DcEV_cTjiFg | 403 on all routes | **YES** (superseded by Row 2) |

---

## 3. WHY IT MATTERS (articulated audit)

**Best information, ranked:**

1. **Metadata-first lazy loading (pattern 1).** The single genuinely transferable find. Marciale-OS's TheHUB already renders a large icon/emoji surface; Gamecompanion has HUD glyphs. If any of those ever grow to hundreds of assets, the "ship the catalog, lazy-load the payload, skeleton + cache" pattern is the difference between a fast dashboard and a bloated one. Zero-dependency, Vanilla-JS-expressible.
2. **Codegen types (pattern 2).** Directly supports the house's own A1/A4 governance findings (source-of-truth → generated artifacts) and the Build 1 question-bank extraction — same shape: *derive, don't hand-maintain*.
3. **Variant contract (pattern 3).** Minor, but a clean illustration of enforcing a small invariant across thousands of instances.

**Empirical spine:** cloned at `c6288f81`; LICENSE = MIT; `package.json` read in full; `Icon.jsx` / `iconLoader.jsx` / `loadIcon.jsx` / `generate-icon-meta.js` read verbatim; 2,242 slugs counted (`ls src/icons/components | wc -l`); 6 variant files confirmed in the `add/` sample dir; `AddLinear.jsx` + `AddBold.jsx` read verbatim.

**Risk:** **Payload is a hard reject.** It is a React library; TheHUB is Vanilla JS (Law I — do not rewrite the house to fit a library). It is "light mode only" with `#292D32` defaults — **wrong for Marciale-OS's dark cockpit** (`#0b0c10`), whose DESIGN.md already defines its own token system. Adopting 2,242 third-party icons would also collide with the house's design-token discipline. The *value* is entirely in the three patterns.

**TAMAKEE vs Marciale-OS:** Marciale-OS (registry/lazy-load + codegen). TAMAKEE has no icon need of this scale; out of scope.

**Disposition note (research-only):** No proposal to Seat A, no implementation, per the standing Commander order on this research stream. This record stands as gathered evidence.

---

## 4. BEGINNER BLURB (Law VI)

I looked at "mx-icons," a big free library of 2,242 React icons, each in six styles. The icons themselves aren't useful to Marciale-OS — they're for a different framework and a light theme, and our house already has its own colors and look. But the *machinery* is clever: instead of shipping all 13,000 files at once, it ships only a tiny list of names and loads each icon the moment it's needed, showing a gray placeholder while it loads and remembering it afterward. That "ship the menu, load the food on demand" trick is worth copying for any big list of pictures or glyphs we might add later.

---

— `@colony` (under Seat R · EXCEL) · research-only · no proposal, no implementation
