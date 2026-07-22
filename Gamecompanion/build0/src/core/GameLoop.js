/**
 * GameLoop — Fixed-timestep update + variable rate render.
 * Updates game logic at 10Hz, renders at display refresh rate.
 */
export class GameLoop {
  constructor() {
    this.FIXED_DT = 100;
    this.MAX_FRAME_DT = 500;
    this._accumulator = 0;
    this._lastTime = 0;
    this._isRunning = false;
    this._rafId = null;
    this._updateFn = null;
    this._renderFn = null;
    this._targetFPS = 60;
    this._frameInterval = 1000 / 60;
    this._lastFrameTime = 0;
  }

  start(updateFn, renderFn) {
    this._updateFn = updateFn;
    this._renderFn = renderFn;
    this._isRunning = true;
    this._lastTime = performance.now();
    this._lastFrameTime = this._lastTime;
    this._loop(this._lastTime);
  }

  stop() {
    this._isRunning = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  setTargetFPS(fps) {
    this._targetFPS = fps;
    this._frameInterval = fps > 0 ? 1000 / fps : 0;
  }

  pause() { this._isRunning = false; }
  resume() { if (!this._isRunning) { this._isRunning = true; this._lastTime = performance.now(); this._loop(this._lastTime); } }

  _loop(timestamp) {
    if (!this._isRunning) return;

    let frameTime = timestamp - this._lastTime;
    this._lastTime = timestamp;

    if (frameTime > this.MAX_FRAME_DT) frameTime = this.MAX_FRAME_DT;

    this._accumulator += frameTime;
    while (this._accumulator >= this.FIXED_DT) {
      if (this._updateFn) this._updateFn(this.FIXED_DT);
      this._accumulator -= this.FIXED_DT;
    }

    if (this._targetFPS <= 0 || (timestamp - this._lastFrameTime) >= this._frameInterval) {
      if (this._renderFn) this._renderFn(timestamp);
      this._lastFrameTime = timestamp;
    }

    this._rafId = requestAnimationFrame((t) => this._loop(t));
  }
}

export const gameLoop = new GameLoop();
