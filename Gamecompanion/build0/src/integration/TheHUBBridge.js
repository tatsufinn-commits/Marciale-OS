/**
 * TheHUBBridge — Communicates with parent TheHUB application via postMessage.
 * Same protocol pattern as the existing Idle Hero companion.
 */
export class TheHUBBridge {
  constructor() {
    this._ready = false;
    this._hubOrigin = '*';
    this._pendingRewards = [];
  }

  init() {
    window.addEventListener('message', (event) => {
      this._handleMessage(event.data);
    });
    this._send('mtgame.ready', { version: '0.0.0' });
    this._ready = true;
  }

  _handleMessage(data) {
    if (!data || !data.type) return;

    switch (data.type) {
      case 'hub.activity':
        this._convertActivity(data.payload);
        break;
      case 'hub.companion.snapshot':
        console.log('[HUB Bridge] Snapshot received:', data.payload);
        break;
      case 'hub.companion.pause':
        this._pauseGame();
        break;
      case 'hub.companion.resume':
        this._resumeGame();
        break;
      case 'hub.theme':
        this._applyTheme(data.payload);
        break;
    }
  }

  _send(type, payload) {
    try {
      window.parent.postMessage({ type, payload, source: 'mt-tbh' }, this._hubOrigin);
    } catch (e) {
      /* Silent fail — not in iframe */
    }
  }

  _convertActivity(activity) {
    if (!activity || !activity.points) return;
    const reward = { gold: Math.floor(activity.points * 10), xp: Math.floor(activity.points * 5) };
    this._pendingRewards.push(reward);
    this._send('mtgame.ack', { received: true, reward });
  }

  _pauseGame() {
    /* Hook into GameLoop pause */
    const event = new CustomEvent('tbh-pause');
    window.dispatchEvent(event);
  }

  _resumeGame() {
    const event = new CustomEvent('tbh-resume');
    window.dispatchEvent(event);
  }

  _applyTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.primary) root.style.setProperty('--hub-primary', theme.primary);
    if (theme.background) root.style.setProperty('--hub-background', theme.background);
    if (theme.text) root.style.setProperty('--hub-text', theme.text);
  }

  reportLevelUp(weaverId, newLevel) {
    this._send('mtgame.levelup', { weaverId, newLevel });
  }

  reportAchievement(achievementId) {
    this._send('mtgame.achievement', { achievementId });
  }
}
