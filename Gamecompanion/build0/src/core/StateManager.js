/**
 * StateManager — Central game state store.
 * All game state flows through this single source of truth.
 */
export class StateManager {
  constructor() {
    this._state = this._getInitialState();
    this._subscriptions = new Map();
  }

  _getInitialState() {
    return {
      version: '0.0.0',
      lastSaveTime: null,
      totalPlayTime: 0,

      player: {
        gold: 0,
        aetherDust: 0,
        memoryShards: 0,
        loomFragments: 0,
        totalRiftsCleared: 0,
        totalBossesDefeated: 0
      },

      party: {
        activeMembers: [],
        roster: [
          {
            id: 'rudeus',
            classId: 'channeler',
            name: 'Rudeus',
            level: 1,
            xp: 0,
            hp: 60,
            maxHp: 60,
            mana: 100,
            maxMana: 100,
            attackDamage: 1.14,
            attackSpeed: 0.55,
            armor: 5,
            isAlive: true,
            position: 50,
            gear: {},
            skills: [],
            affinity: {}
          }
        ],
        formation: { front: null, mid: [null, null], back: null },
        pet: null
      },

      progression: {
        currentZone: 'fittoa',
        currentStage: 1,
        currentDifficulty: 0,
        highestZoneCleared: null,
        highestDifficultyCleared: 0,
        zones: {}
      },

      combat: {
        enemies: [],
        projectiles: [],
        chests: [],
        currentWave: 0,
        totalWaves: 0,
        state: 'idle' // idle | fighting | wave_clear | stage_clear
      },

      inventory: { items: [], maxSlots: 50, stash: [], maxStashSlots: 100 },
      attunement: {},
      forge: { level: 1, xp: 0 },
      quests: { activeDaily: [], activePersonal: [], activeFaction: [], completedQuestIds: [], weeklyChallenge: null },
      factions: { adventurersGuild: { reputation: 0, rank: 1 }, magicCorps: { reputation: 0, rank: 1 } },
      relationships: {},
      achievements: { unlocked: [], inProgress: {} },
      settings: { fpsCap: 60, reducedMotion: false, colorBlindMode: false, fontSize: 'small', masterVolume: 0, sfxVolume: 0, musicVolume: 0 },
      unlocks: [],
      flags: {}
    };
  }

  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this._state);
  }

  set(path, value) {
    const keys = path.split('.');
    const key = keys.pop();
    const target = keys.reduce((obj, k) => {
      if (!(k in obj)) obj[k] = {};
      return obj[k];
    }, this._state);
    const oldValue = target[key];
    target[key] = value;
    this._notify(path, value, oldValue);
  }

  update(path, updater) {
    const current = this.get(path);
    this.set(path, updater(current));
  }

  subscribe(path, callback) {
    if (!this._subscriptions.has(path)) {
      this._subscriptions.set(path, new Set());
    }
    this._subscriptions.get(path).add(callback);
    return () => this._subscriptions.get(path)?.delete(callback);
  }

  _notify(path, newValue, oldValue) {
    const handlers = this._subscriptions.get(path);
    if (handlers) {
      handlers.forEach(cb => cb(newValue, oldValue));
    }
  }

  getState() {
    return this._state;
  }

  loadState(savedState) {
    this._state = { ...this._getInitialState(), ...savedState };
  }

  reset() {
    this._state = this._getInitialState();
  }
}

export const stateManager = new StateManager();
