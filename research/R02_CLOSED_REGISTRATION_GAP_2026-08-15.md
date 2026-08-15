# R-02 — CLOSED BY SEAT A: THE SPRITE ATLAS IS NEVER POPULATED

**Filed:** 2026-08-15 · **Closed by:** Seat A (TWMIP), `@joint`
**Trees examined:** local `a6cef19` (grep) **and** remote `030f3db` (raw fetch, all 4 chunks)
**Status:** ✅ **ANSWERED — Seat R released from this tasking without spending his context.**

---

## 1. WHY SEAT A CLOSED A QUESTION HE HAD ISSUED TO SEAT R

R-02 asked whether any code path calls `spriteAtlas.register()` with a real asset path.
Answering it required reading one file on one tree. Seat A could do that with `fetch_page`
in four calls. **Sending it to Seat R would have spent a scout's finite context on a question
his superior could close himself.**

**Law XVIII-B works in both directions: do not consume a subordinate's context with work you
can discharge yourself.** The seat is now free for VSS-00, the standing commission.

## 2. THE ANSWER — `[VERIFIED]`, BOTH TREES

**Every `spriteAtlas` reference in `src/main.js` (identical on `a6cef19` and `030f3db`):**

```
$ grep -n "spriteAtlas" src/main.js
11:  import { spriteAtlas } from './rendering/SpriteAtlas.js';
58:  const renderer = new CanvasRenderer('game-canvas', spriteAtlas);
68:  await spriteAtlas.load();
```

**Three references. Import, injection, load. `register()` is never called.**

```
$ grep -rn "spriteAtlas.register\|atlas.register" src/ --include=*.js
(no output)
$ grep -rn "register(" src/ --include=*.js
src/main.js:111        screenManager.register('quests', ...)   <- ScreenManager, unrelated
src/rendering/SpriteAtlas.js:28  register(id, src, ...)        <- the definition
src/ui/ScreenManager.js:22      register(id, {render})         <- unrelated
```

**The only call in the entire repository is `tests/SpriteAtlas.test.js:37`, using a
deliberately non-existent path to exercise the fallback.**

**Remote confirmation:** `raw.githubusercontent.com/.../main/src/main.js` fetched in full
(4 chunks). `await spriteAtlas.load();` appears once, on the line after the eventBus wiring.
**No `register()` precedes it. No `register()` follows it. The remote matches local exactly.**

## 3. CONSEQUENCE — THE ATLAS LOADS AN EMPTY FRAME MAP

`SpriteAtlas.load()` iterates `this._frames`, which is populated **only** by `register()`:

```
load() { const requests = [...this._frames.values()].map(f => this._loadFrame(f)); ... }
```

With zero registrations, `load()` resolves over an empty collection and succeeds.
`CanvasRenderer:87` then calls `getFrame(entity.spriteId || entity.id)`, receives `undefined`,
and takes the procedural placeholder branch — **for every entity, always.**

**Therefore: dropping 25 correctly-named PNGs into `public/sprites/` changes nothing.**
The files would sit on disk unread. **This is the true blocker, and it is not a naming problem,
an art problem, or a data problem. It is three missing lines of wiring.**

## 4. `getLoadReport()` — DISCARDED, CONFIRMED

```
$ grep -n "await spriteAtlas.load()" src/main.js
68:  await spriteAtlas.load();          <- return value not captured
$ grep -rn "getLoadReport" src/ | grep -v SpriteAtlas.js
(no output)
```

`SpriteAtlas.js:36` returns `this.getLoadReport()` from `load()`. **Nothing anywhere consumes
it.** The atlas already computes exactly the diagnostic that would have exposed this gap —
loaded vs failed vs missing frames — and `main.js:68` throws it away.

**Root cause, stated plainly: the system was built with a self-diagnostic and then wired so the
diagnostic could never be read. A report nobody reads is not instrumentation.**

## 5. THE MINIMUM CHANGE (specification only — NOT authorized, NOT Seat R's lane)

Sourced from `public/sprites/README.md` and `SpriteAtlas.js`, not invented. For one PNG:

```js
// src/main.js — BEFORE line 68's `await spriteAtlas.load();`
spriteAtlas.register('rudeus', '/sprites/characters/rudeus-early-idle.png');

const report = await spriteAtlas.load();   // capture, do not discard
console.info('[SpriteAtlas]', report);
```

Ratified conventions (R-02 ruling): key = **`id`** (`rudeus`), path = **README kebab-case**.
The `"sprite"` field in `weavers.json` is **ADVISORY** and is not consulted here.

**Scaling to 25 needs a registration table or a data-driven loop — a design decision belonging
to Seat E (`@engineer`), with `@style` GREENMARK for the art. Not commissioned by this filing.**

## 6. DISPOSITION

- **R-02: CLOSED.** Seat R credited for the naming findings that led here; **not charged** with
  failing to answer, and **released** to VSS-00.
- **The registration gap is Seat E's**, recorded as the blocker of record.
- **Standing bar remains:** no PNG may be commissioned until a registration path exists.
  **Twenty-five perfect drawings against a `load()` that reads an empty map is 25 wasted assets.**

**No file was modified in the course of this finding.**
