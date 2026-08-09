/** Build 4 — thin application orchestrator; Bootstrap owns initialization order. */
import { gameLoop } from './core/GameLoop.js';
import { stateManager } from './core/StateManager.js';
import { timeKeeper } from './core/TimeKeeper.js';
import { eventBus, Events } from './core/EventBus.js';
import { SaveManager } from './core/SaveManager.js';
import { Bootstrap } from './core/Bootstrap.js';
import { CanvasRenderer } from './rendering/CanvasRenderer.js';
import { ParticleSystem } from './rendering/ParticleSystem.js';
import { spriteAtlas } from './rendering/SpriteAtlas.js';
import { hud } from './rendering/HUD.js';
import { Modal } from './ui/components/Modal.js';
import { EntityFactory } from './entities/EntityFactory.js';
import { CombatEngine } from './combat/CombatEngine.js';
import enemyData from './data/enemies.json';
import heroData from './data/weavers.json';
import { DamageCalculator } from './combat/DamageCalculator.js';
import { affinityTable } from './data/affinities.js';
import { WaveManager } from './combat/WaveManager.js';
import { stages } from './data/stages.js';
import { AIController } from './combat/AIController.js';
import { LootEngine } from './systems/LootEngine.js';
import itemData from './data/items.json';
import { InventorySystem } from './systems/InventorySystem.js';
import { StatEngine } from './systems/StatEngine.js';
import { CraftingSystem } from './systems/CraftingSystem.js';
import { recipes } from './data/recipes.js';
import { EconomyManager } from './systems/EconomyManager.js';
import { ProgressionSystem } from './systems/ProgressionSystem.js';
import { RosterSystem } from './systems/RosterSystem.js';
import { ZoneContentSystem } from './systems/ZoneContentSystem.js';
import zoneData from './data/zones.json';

const AUTO_SAVE_INTERVAL = 120000;
const setSaveStatus = (text, type = '') => { const element = document.querySelector('#save-status'); if (element) { element.textContent = text; element.dataset.type = type; } };

async function boot() {
  console.log('[MT-TBH] Starting Build 7: Wave Manager & Stage Progression.');
  const renderer = new CanvasRenderer('game-canvas', spriteAtlas); const particles = new ParticleSystem(renderer); const modal = new Modal();
  const saveManager = new SaveManager(stateManager, { onSaved: (record) => { setSaveStatus(`Saved ${new Date(record.timestamp).toLocaleTimeString()}`, 'success'); eventBus.emit(Events.GAME_SAVED, record); } });
  const bootstrap = new Bootstrap({ stateManager, saveManager, timeKeeper, eventBus, events: Events, modal, setStatus: setSaveStatus });

  eventBus.clear();
  Object.values(Events).forEach((eventName) => eventBus.on(eventName, (payload) => console.debug(`[Event] ${eventName}`, payload ?? '')));
  stateManager.subscribeAll((change) => eventBus.emit(Events.STATE_CHANGED, change));
  eventBus.once(Events.GAME_LOADED, ({ hasSave }) => particles.addFloatingText({ x: 300, y: 145 }, hasSave ? 'SAVE RESTORED' : 'NEW GAME READY', '#d4a034', { lifetime: 1600 }));
  eventBus.on(Events.GAME_RESET, () => particles.addFloatingText({ x: 300, y: 145 }, 'NEW GAME INITIALIZED', '#8aba8a', { lifetime: 1600 }));

  await spriteAtlas.load();
  const bootResult = await bootstrap.initialize();
  const entityFactory = new EntityFactory({ heroes: heroData.weavers, enemies: enemyData.enemies });
  const existingHero = stateManager.get('combat.hero');
  // Build 3 preview saves do not have Build 5 combat properties, so normalize them once.
  if (!bootResult.hasSave || !existingHero?.attackRange) {
    stateManager.batch('build-5-preview', [
      { path: 'combat.hero', value: entityFactory.createHero('rudeus') },
      { path: 'combat.enemies', value: [entityFactory.createEnemy('slime', { x: 480, y: 230 }), entityFactory.createEnemy('slime', { x: 520, y: 228 }), entityFactory.createEnemy('goblin', { x: 555, y: 220 })] },
      { path: 'combat.state', value: 'fighting' }
    ]);
  }
  const combatEngine = new CombatEngine({ stateManager, eventBus, events: Events, damageCalculator: new DamageCalculator({ affinityTable }), onHit: ({ defender, damage }) => {
    particles.addFloatingText({ x: defender.x + defender.width / 2, y: defender.y - 8 }, `-${Math.ceil(damage)}`, defender.type === 'enemy' ? '#8abaf0' : '#e06c75');
    particles.addBurst({ x: defender.x + defender.width / 2, y: defender.y + defender.height / 2 }, defender.type === 'enemy' ? '#8abaf0' : '#e06c75', 4);
  } });
  eventBus.on(Events.MONSTER_KILLED, ({ enemyId }) => console.info(`[Combat] Defeated ${enemyId}`));
  const aiController = new AIController({ stateManager, eventBus, events: Events, combatEngine });
  eventBus.on(Events.SKILL_USED, ({ skillName }) => console.info(`[AI] Used ${skillName}`));
  document.querySelector('#ai-mode')?.addEventListener('change', (event) => stateManager.update('combat.hero', (hero) => ({ ...hero, aiMode: event.target.value }), { source: 'ai-setting' }));
  const lootEngine = new LootEngine({ stateManager, eventBus, events: Events, items: itemData.items });
  const zoneContentSystem = new ZoneContentSystem({ zones: zoneData.zones });
  document.querySelector('#zones')?.addEventListener('click', () => { const rows=zoneData.zones.map(z=>`<li><strong>${z.name}</strong> — ${zoneContentSystem.getStages(z.id).length} stages</li>`).join(''); modal.show({title:'World zones',body:`<ul class="inventory-list">${rows}</ul>`,actions:[{label:'Close',kind:'primary',onClick:()=>modal.close()}]}); });
  const rosterSystem = new RosterSystem({ stateManager, templates: heroData.weavers });
  document.querySelector('#roster')?.addEventListener('click', () => { const rows=rosterSystem.getRoster().map(x=>`<li>${x.name} — ${x.unlocked ? 'Unlocked' : 'Locked'}</li>`).join(''); modal.show({title:'Character roster',body:`<ul class="inventory-list">${rows}</ul>`,actions:[{label:'Close',kind:'primary',onClick:()=>modal.close()}]}); });
  const progressionSystem = new ProgressionSystem({ stateManager, eventBus, events: Events });
  eventBus.on(Events.MONSTER_KILLED, (payload) => { lootEngine.onMonsterKilled(payload); progressionSystem.grantXp(payload.xp ?? 0); });
  eventBus.on(Events.STAGE_CLEARED, ({ stageId }) => lootEngine.dropStageChest(stageId));
  const inventorySystem = new InventorySystem({ stateManager, itemTemplates: itemData.items });
  eventBus.on(Events.CHEST_OPENED, ({ reward }) => inventorySystem.addReward(reward));
  const economyManager = new EconomyManager({ stateManager });
  document.querySelector('#sell-first')?.addEventListener('click', () => { const item=stateManager.get('inventory.items')[0]; const result=item && economyManager.sell(item.uid); setSaveStatus(result?.sold ? `Sold for ${result.value} gold` : 'Nothing to sell', result?.sold ? 'success' : 'neutral'); });
  const craftingSystem = new CraftingSystem({ stateManager, inventorySystem, recipes });
  document.querySelector('#craft-staff')?.addEventListener('click', () => { const result = craftingSystem.craft('forge-apprentice-staff'); setSaveStatus(result.crafted ? 'Crafted Apprentice Staff' : `Craft failed: ${result.reason}`, result.crafted ? 'success' : 'error'); });
  const statEngine = new StatEngine({ stateManager });
  document.querySelector('#equip-first')?.addEventListener('click', () => { const item = stateManager.get('inventory.items').find((entry) => entry.slot); if (!item) return setSaveStatus('No equippable item', 'neutral'); const result = statEngine.equip(item.uid); if (result.equipped) eventBus.emit(Events.ITEM_EQUIPPED, { uid: item.uid, slot: item.slot }); });
  document.querySelector('#inventory')?.addEventListener('click', () => {
    const items = inventorySystem.filter(); const rows = items.length ? items.map((item) => `<li><strong>${item.name}</strong> ×${item.quantity} <em>${item.rarity}</em></li>`).join('') : '<li>Inventory is empty.</li>';
    modal.show({ title: `Inventory · ${items.length}/${stateManager.get('inventory.maxSlots')}`, body: `<ul class="inventory-list">${rows}</ul>`, actions: [{ label: 'Close', kind: 'primary', onClick: () => modal.close() }] });
  });
  document.querySelector('#open-chest')?.addEventListener('click', () => {
    const chest = stateManager.get('combat.chests').find((entry) => !entry.isOpen);
    if (!chest) return setSaveStatus('No unopened chest', 'neutral');
    const reward = lootEngine.openChest(chest.id);
    modal.show({ title: 'Chest opened', body: `<p><strong>${reward.name}</strong></p><p>${reward.rarity.toUpperCase()} reward acquired. Inventory placement begins in Build 10.</p>`, actions: [{ label: 'Continue', kind: 'primary', onClick: () => modal.close() }] });
  });
  const waveManager = new WaveManager({ stateManager, eventBus, events: Events, entityFactory, stages });
  waveManager.startStage('fittoa-1');
  document.querySelector('#portal')?.addEventListener('click', () => {
    waveManager.portalToStageSelect();
    modal.show({ title: 'Stage selection', body: '<p>Select an unlocked stage. There is no portal penalty.</p>', actions: [{ label: 'Fittoa Outskirts · 1-1', kind: 'primary', onClick: () => { waveManager.startStage('fittoa-1'); modal.close(); } }, { label: 'Close', onClick: () => modal.close() }] });
  });
  [Events.STAGE_CLEARED, Events.CHEST_OPENED, Events.ITEM_EQUIPPED, Events.WEAVER_LEVEL_UP].forEach((event) => eventBus.on(event, () => saveManager.save(event).catch((error) => console.error('Event save failed', error))));
  window.setInterval(() => saveManager.save('interval').catch((error) => console.error('Interval save failed', error)), AUTO_SAVE_INTERVAL);
  document.querySelector('#save-now')?.addEventListener('click', () => saveManager.save('manual').catch((error) => setSaveStatus(`Save failed: ${error.message}`, 'error')));
  document.querySelector('#new-game')?.addEventListener('click', () => modal.show({ title: 'Start a new game?', body: '<p>This permanently removes this browser’s current saved progress.</p>', actions: [{ label: 'Cancel', onClick: () => modal.close() }, { label: 'Delete save and restart', kind: 'danger', onClick: async () => { await bootstrap.newGame(); modal.close(); } }] }));

  gameLoop.start((dt) => {
    timeKeeper.addPlayTime(dt); stateManager.set('totalPlayTime', timeKeeper.getPlayTime(), { source: 'loop' });
    waveManager.update(dt);
    combatEngine.tick(dt);
    aiController.tickCooldowns(dt);
    aiController.update();
    particles.update(dt); hud.updateFPS(dt);
  }, () => {
    const state = stateManager.getState(); const { combat, player, progression } = state;
    renderer.clear(); renderer.drawBackground(progression.currentZone); renderer.drawEntity(combat.hero); combat.enemies.forEach((enemy) => renderer.drawEntity(enemy)); combat.chests.forEach((chest) => renderer.drawChest(chest)); particles.render();
    hud.setGold(player.gold); hud.setZone('Fittoa Region'); hud.setStage(combat.currentWave); renderer.drawHUD(hud.getGold(), hud.getZone(), hud.getStage(), hud.getFPS()); renderer.drawDebugInfo(combat.currentWave, combat.enemies.length);
  });
  window.addEventListener('pagehide', () => { saveManager.save('pagehide').catch(() => {}); });
}
document.addEventListener('visibilitychange', () => { if (document.hidden) { gameLoop.setTargetFPS(5); timeKeeper.pause(); eventBus.emit(Events.GAME_PAUSED); } else { gameLoop.setTargetFPS(60); timeKeeper.resume(); eventBus.emit(Events.GAME_RESUMED); } });
document.addEventListener('DOMContentLoaded', boot);
