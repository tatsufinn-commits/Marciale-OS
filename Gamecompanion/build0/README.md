# Mushoku Tensei: Taskbar Hero — Build 0 Quickstart Kit

## What This Is

A fully scaffolded **Build 0** (Aetherweave 0.0.0.0.a) — the absolute minimum working game that:

1. Renders a canvas with an MT-inspired color palette
2. Shows Rudeus (as a colored rectangle) fighting slimes and goblins
3. Has wave-based demo combat
4. Connects to IndexedDB for save/load
5. Has the complete data layer ready for content

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
http://localhost:3000
```

## File Structure

```
build0/
├── index.html                     # Entry point with canvas
├── package.json                   # Vite + idb dependencies
├── vite.config.js                 # Build config
├── public/                        # Static assets (sprites go here)
├── src/
│   ├── main.js                    # Bootstrap sequence
│   ├── core/
│   │   ├── GameLoop.js            # Fixed-timestep loop
│   │   ├── StateManager.js        # Central state store
│   │   ├── EventBus.js            # Pub/sub event system
│   │   ├── SaveManager.js         # IndexedDB persistence
│   │   └── TimeKeeper.js          # Playtime tracking
│   ├── rendering/
│   │   ├── CanvasRenderer.js      # Canvas drawing
│   │   ├── SpriteAtlas.js         # Placeholder sprites
│   │   └── HUD.js                 # Heads-up display
│   ├── styles/
│   │   ├── variables.css          # MT color palette
│   │   └── base.css               # Reset + typography
│   ├── data/
│   │   ├── weavers.json           # 5 playable characters
│   │   ├── enemies.json           # 18 monster types + 2 bosses
│   │   ├── items.json             # 18 equipment items + materials
│   │   ├── zones.json             # 6 zones, 4 difficulties
│   │   ├── skills.json            # 12 spells across 7 schools
│   │   ├── npcs.json              # 12 NPCs
│   │   ├── quests.json            # Dailies, weeklies, achievements
│   │   ├── factions.json          # 4 factions with rank trees
│   │   ├── affixes.json           # Affix pools per slot/rarity
│   │   └── collectibles/
│   │       ├── echoes.json        # 10 lore collectibles
│   │       └── (more as content expands)
│   └── integration/
│       └── TheHUBBridge.js        # postMessage protocol
```

## What Works Now

- [x] Canvas renders at 600×400 with MT zone background
- [x] Rudeus (blue rectangle) stands on the left
- [x] Slimes and goblins (colored rectangles) appear on the right
- [x] Wave system: 3 waves, enemies get harder
- [x] Chest placeholder with shimmer animation
- [x] HUD: gold counter, zone name, stage number, FPS
- [x] Debug info bar at bottom
- [x] Save system scaffold (IndexedDB ready)
- [x] TheHUB bridge ready (runs standalone too)
- [x] All JSON data stubs populated

## Next Steps (Build 1+)

See `MASTER_ROADMAP_AETHERWEAVE.md` for the full build plan. Short term:

- **Build 1:** Replace colored rectangles with actual sprite rendering
- **Build 2:** Implement real combat tick with damage calculation
- **Build 3:** Wire save/load to auto-save on events
- **Build 4:** Full event bus integration

## Data-Driven Design

All content lives in `src/data/`. To add a new character, monster, item, zone, or quest:

1. Open the relevant JSON file
2. Add a new entry following the existing format
3. No code changes needed — the game reads data dynamically

This is the foundation for all future expansions (v2.0 Echoes, v3.0 Convergence, v4.0 The Weave).
