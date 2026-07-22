/**
 * TimeKeeper — Delta time tracking and playtime accumulator.
 */
export class TimeKeeper {
  constructor() {
    this._startTime = 0;
    this._totalPlayTime = 0;
    this._lastTickTime = 0;
    this._isRunning = false;
  }

  init() {
    this._startTime = Date.now();
    this._lastTickTime = performance.now();
    this._isRunning = true;
  }

  getDelta() {
    const now = performance.now();
    const dt = now - this._lastTickTime;
    this._lastTickTime = now;
    return Math.min(dt, 500);
  }

  getPlayTime() {
    return this._totalPlayTime;
  }

  addPlayTime(dt) {
    this._totalPlayTime += dt;
  }

  getSessionTime() {
    return Date.now() - this._startTime;
  }

  pause() { this._isRunning = false; }
  resume() {
    this._isRunning = true;
    this._lastTickTime = performance.now();
  }
}

export const timeKeeper = new TimeKeeper();
