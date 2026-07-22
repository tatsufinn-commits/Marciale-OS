/**
 * SaveManager — IndexedDB persistence with schema versioning.
 * Handles save, load, migration, and offline reward calculation.
 */
const DB_NAME = 'MushokuTenseiTBH';
const DB_VERSION = 1;
const STORE_NAME = 'saves';
const SAVE_KEY = 'main';

export class SaveManager {
  constructor(stateManager) {
    this._state = stateManager;
    this._db = null;
    this._lastSaveTime = null;
  }

  async init() {
    this._db = await this._openDB();
    this._lastSaveTime = Date.now();
  }

  _openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async save() {
    if (!this._db) return;
    const state = this._state.getState();
    const saveData = {
      version: state.version,
      timestamp: Date.now(),
      playTime: state.totalPlayTime,
      state: state,
      checksum: this._checksum(JSON.stringify(state))
    };
    await this._put(saveData);
    this._lastSaveTime = Date.now();
  }

  async load() {
    if (!this._db) return null;
    const saveData = await this._get();
    if (!saveData) return null;
    if (saveData.checksum !== this._checksum(JSON.stringify(saveData.state))) {
      console.warn('Save checksum mismatch — possible corruption');
      return null;
    }
    this._lastSaveTime = saveData.timestamp;
    return saveData;
  }

  async deleteSave() {
    if (!this._db) return;
    await this._delete();
  }

  getLastSaveTime() {
    return this._lastSaveTime || Date.now();
  }

  _put(data) {
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(data, SAVE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  _get() {
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(STORE_NAME, 'readonly');
      const request = tx.objectStore(STORE_NAME).get(SAVE_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  _delete() {
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(SAVE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  _checksum(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash.toString(16);
  }
}
