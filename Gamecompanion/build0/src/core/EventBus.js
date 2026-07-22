/**
 * EventBus — Typed pub/sub event system.
 * Decouples all game systems from each other.
 */
export class EventBus {
  constructor() {
    this._listeners = new Map();
    this._onceListeners = new Map();
  }

  on(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(callback);
    return () => this._listeners.get(event)?.delete(callback);
  }

  once(event, callback) {
    if (!this._onceListeners.has(event)) {
      this._onceListeners.set(event, new Set());
    }
    this._onceListeners.get(event).add(callback);
  }

  emit(event, payload) {
    const handlers = this._listeners.get(event);
    if (handlers) {
      handlers.forEach(cb => cb(payload));
    }
    const onceHandlers = this._onceListeners.get(event);
    if (onceHandlers) {
      onceHandlers.forEach(cb => cb(payload));
      this._onceListeners.delete(event);
    }
  }

  off(event, callback) {
    this._listeners.get(event)?.delete(callback);
  }

  clear() {
    this._listeners.clear();
    this._onceListeners.clear();
  }
}

/* Event catalog */
export const Events = {
  /* Combat */
  MONSTER_KILLED: 'monster:killed',
  WAVE_CLEARED: 'wave:cleared',
  STAGE_CLEARED: 'stage:cleared',
  BOSS_DEFEATED: 'boss:defeated',
  HERO_DAMAGED: 'hero:damaged',
  HERO_DIED: 'hero:died',
  HERO_REVIVED: 'hero:revived',

  /* Loot */
  CHEST_DROPPED: 'chest:dropped',
  CHEST_OPENED: 'chest:opened',
  ITEM_EQUIPPED: 'item:equipped',
  ITEM_SHATTERED: 'item:shattered',
  ITEM_FUSED: 'item:fused',

  /* Character */
  WEAVER_LEVEL_UP: 'weaver:level_up',
  WEAVER_SKILL_UNLOCKED: 'weaver:skill_unlocked',
  AFFINITY_CHANGED: 'affinity:changed',
  AFFINITY_MILESTONE: 'affinity:milestone',
  PERSONAL_QUEST_PROGRESS: 'quest:personal_progress',
  WEAVER_DEPARTED: 'weaver:departed',

  /* Progression */
  ZONE_UNLOCKED: 'zone:unlocked',
  DIFFICULTY_UNLOCKED: 'difficulty:unlocked',
  ATUNEMENT_POINT_EARNED: 'attunement:point',

  /* Economy */
  GOLD_CHANGED: 'gold:changed',
  DUST_CHANGED: 'dust:changed',

  /* System */
  GAME_SAVED: 'game:saved',
  GAME_LOADED: 'game:loaded',
  OFFLINE_REWARDS_COLLECTED: 'offline:rewards',
  ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',

  /* TheHUB Integration */
  HUB_ACTIVITY_RECEIVED: 'hub:activity',
  HUB_REWARD_ACKNOWLEDGED: 'hub:reward_ack',

  /* UI */
  TAB_CHANGED: 'tab:changed',
  MODE_CHANGED: 'mode:changed',
  TOOLTIP_SHOWN: 'tooltip:shown',
  TOOLTIP_HIDDEN: 'tooltip:hidden'
};
