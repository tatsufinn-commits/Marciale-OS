/**
 * MAIN — Bootstrap sequence.
 * Loads → initializes → checks save → starts loop.
 */
import { gameLoop } from './core/GameLoop.js';
import { stateManager } from './core/StateManager.js';
import { SaveManager } from './core/SaveManager.js';
import { timeKeeper } from './core/TimeKeeper.js';
import { EventBus, Events } from './core/EventBus.js';
import { CanvasRenderer } from './rendering/CanvasRenderer.js';
import { spriteAtlas } from './rendering/SpriteAtlas.js';
import { hud } from './rendering/HUD.js';
import { TheHUBBridge } from './integration/TheHUBBridge.js';

/* ===== BOOT ===== */
async function boot() {
  console.log('[MT-TBH] Booting version 0.0.0.0.a...');

  /* 1. Init systems */
  const renderer = new CanvasRenderer('game-canvas');
  const saveManager = new SaveManager(stateManager);
  const hubBridge = new TheHUBBridge();

  /* 2. Load assets */
  await spriteAtlas.load();

  /* 3. Init time */
  timeKeeper.init();

  /* 4. Check for save */
  let isNewGame = true;
  try {
    await saveManager.init();
    const saveData = await saveManager.load();
    if (saveData) {
      stateManager.loadState(saveData.state);
      isNewGame = false;
      console.log('[MT-TBH] Save loaded. Last played:', new Date(saveData.timestamp).toLocaleString());
    }
  } catch (e) {
    console.warn('[MT-TBH] No save found or save error:', e.message);
  }

  /* 5. Attempt TheHUB bridge */
  try {
    hubBridge.init();
  } catch (e) {
    console.log('[MT-TBH] Running in standalone mode (no TheHUB detected)');
  }

  /* 6. Setup demo entities for Build 0 */
  const hero = {
    id: 'rudeus',
    type: 'hero',
    displayName: 'Rudeus',
    x: 60, y: 220, width: 20, height: 40,
    color: spriteAtlas.getColor('rudeus'),
    hp: 60, maxHp: 60, isAlive: true
  };

  let enemies = [
    { id: 'slime1', type: 'enemy', x: 500, y: 230, width: 18, height: 18, color: spriteAtlas.getColor('slime'), hp: 20, maxHp: 20, isAlive: true },
    { id: 'slime2', type: 'enemy', x: 460, y: 228, width: 18, height: 18, color: spriteAtlas.getColor('slime'), hp: 20, maxHp: 20, isAlive: true },
    { id: 'goblin1', type: 'enemy', x: 520, y: 220, width: 16, height: 24, color: spriteAtlas.getColor('goblin'), hp: 15, maxHp: 15, isAlive: true }
  ];

  let chests = [
    { id: 'chest1', x: 380, y: 235, isOpen: false }
  ];

  let floatingTexts = [];
  let waveCount = 1;
  let stageTimer = 0;
  const WAVE_INTERVAL = 15000; /* 15s per wave */
  const TOTAL_WAVES = 3;

  /* 7. Event bus demo */
  EventBus.on(Events.GAME_LOADED, () => console.log('[MT-TBH] Game loaded event fired'));
  EventBus.on(Events.GOLD_CHANGED, (amount) => console.log(`[MT-TBH] Gold: ${amount}`));

  /* 8. Emit loaded event */
  EventBus.emit(Events.GAME_LOADED, { isNewGame });

  /* 9. Boot sequence complete */
  console.log('[MT-TBH] Boot complete. Starting game loop.');

  /* 10. Start game loop */
  gameLoop.start(
    /* UPDATE */
    (dt) => {
      timeKeeper.addPlayTime(dt);

      /* Move enemies slowly left */
      enemies.forEach(e => {
        if (e.isAlive) {
          e.x -= 0.2;
          if (e.x < 100) { e.x = 100; } /* Don't cross hero line */
        }
      });

      /* Check wave timer */
      stageTimer += dt;
      if (stageTimer >= WAVE_INTERVAL && waveCount < TOTAL_WAVES) {
        waveCount++;
        stageTimer = 0;
        /* Spawn more enemies */
        const newEnemy = {
          id: `enemy_${Date.now()}`,
          type: 'enemy',
          x: 550,
          y: 220 + Math.random() * 20,
          width: 18,
          height: 20,
          color: spriteAtlas.getColor(Math.random() > 0.5 ? 'orc' : 'goblin'),
          hp: 20 + waveCount * 5,
          maxHp: 20 + waveCount * 5,
          isAlive: true
        };
        enemies.push(newEnemy);
        floatingTexts.push({
          text: `Wave ${waveCount}/${TOTAL_WAVES}`,
          x: 300, y: 150,
          color: '#d4a034',
          life: 2000
        });
      }

      /* Animate chest shimmer */
      /* (handled in render) */

      /* Update HUD */
      hud.setGold(1250);
      hud.setZone('Fittoa Region');
      hud.setStage(waveCount);
      hud.updateFPS(dt);
    },
    /* RENDER */
    (timestamp) => {
      renderer.clear();
      renderer.drawBackground('fittoa');

      /* Draw hero */
      renderer.drawEntity(hero);

      /* Draw enemies */
      enemies.forEach(e => renderer.drawEntity(e));

      /* Draw chests */
      chests.forEach(c => renderer.drawChest(c));

      /* Draw floating texts */
      floatingTexts = floatingTexts.filter(ft => {
        const age = timestamp - (ft._startTime || timestamp);
        if (!ft._startTime) ft._startTime = timestamp;
        if (age > ft.life) return false;
        renderer.drawFloatingText(ft.text, ft.x, ft.y - age * 0.02, ft.color);
        return true;
      });

      /* Draw HUD */
      renderer.drawHUD(hud.getGold(), hud.getZone(), hud.getStage(), hud.getFPS());

      /* Draw debug */
      const aliveEnemies = enemies.filter(e => e.isAlive).length;
      renderer.drawDebugInfo(waveCount, aliveEnemies);

      /* Wave clear notification */
      if (aliveEnemies === 0 && waveCount <= TOTAL_WAVES) {
        renderer.ctx.fillStyle = 'rgba(0,0,0,0.5)';
        renderer.ctx.fillRect(200, 160, 200, 40);
        renderer.ctx.fillStyle = '#d4a034';
        renderer.ctx.font = 'bold 14px monospace';
        renderer.ctx.textAlign = 'center';
        if (waveCount === TOTAL_WAVES) {
          renderer.ctx.fillText('STAGE CLEAR!', 300, 185);
        } else {
          renderer.ctx.fillText('WAVE CLEAR', 300, 185);
        }
      }
    }
  );
}

/* Handle visibility changes for FPS management */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gameLoop.setTargetFPS(5);
  } else {
    gameLoop.setTargetFPS(60);
  }
});

/* Save on close */
window.addEventListener('beforeunload', () => {
  gameLoop.stop();
});

/* Boot */
document.addEventListener('DOMContentLoaded', boot);
