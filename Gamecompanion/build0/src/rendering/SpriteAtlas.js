/**
 * SpriteAtlas — Placeholder sprite system.
 * Returns colored rectangles until real sprites are loaded.
 */
export class SpriteAtlas {
  constructor() {
    this._atlases = {};
    this._loaded = false;
    this._placeholderColors = {
      rudeus: '#b8963c',
      sylphy: '#8aba8a',
      roxy: '#8abaf0',
      eris: '#cc2222',
      zanoba: '#2a2a2a',
      orsted: '#e0e0e0',
      ruijerd: '#3a6a6a',
      paul: '#6a4a2a',
      ghislaine: '#d4a034',
      slime: '#4aba8a',
      goblin: '#6aba4a',
      orc: '#5a6a3a',
      demonDog: '#3a0a0a',
      chest: '#d4a034',
      enemy: '#d94a4a',
      hero: '#4a9ad9'
    };
  }

  async load() {
    /* TODO: Load real sprite sheets here */
    this._loaded = true;
    return true;
  }

  getColor(entityId) {
    return this._placeholderColors[entityId] || '#e4e4e4';
  }

  isLoaded() {
    return this._loaded;
  }
}

export const spriteAtlas = new SpriteAtlas();
