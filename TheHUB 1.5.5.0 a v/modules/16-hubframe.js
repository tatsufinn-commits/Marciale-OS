/* ===========================================================
   HUB FRAME — Build 26.11
   Reusable managed iframe container for Companion, Chess, RuView, CADAM.

   Responsibilities:
   - Consistent chrome (title, subtitle, reload, close)
   - Load/status lifecycle
   - Safe postMessage wrapper
   - Optional visibility pause/resume
   - Cleanup on destroy
   =========================================================== */

class HubFrame {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? $(container) : container;
    this.options = Object.assign({
      id: '',
      src: '',
      title: '',
      subtitle: '',
      className: 'hub-frame-iframe',
      frameClass: 'companion-game-frame', // legacy bridge hook for companion
      reloadable: true,
      closable: false,
      showUrl: false,
      showStatus: true,
      sandbox: 'allow-scripts allow-same-origin',
      onLoad: null,
      onMessage: null,
      pauseOnHidden: false,
      lazy: true
    }, options);

    this.frame = null;
    this.ready = false;
    this.status = 'loading';
    this._listeners = [];
    this._build();
  }

  _build() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.container.classList.add('hub-frame-shell');
    this.container.classList.add('hub-frame-' + (this.options.className.replace(/[^a-z0-9_-]/gi, '') || 'default'));

    const head = document.createElement('div');
    head.className = 'hub-frame-head';
    head.innerHTML = `
      <div class="hub-frame-title">
        <b>${esc(this.options.title)}</b>
        ${this.options.subtitle ? `<span>${esc(this.options.subtitle)}</span>` : ''}
      </div>
      <div class="hub-frame-actions">
        ${this.options.reloadable ? `<button class="btn sm" type="button" data-hubframe-reload title="Reload">Reload</button>` : ''}
        ${this.options.closable ? `<button class="btn sm primary" type="button" data-hubframe-close title="Close">Close</button>` : ''}
      </div>`;

    const body = document.createElement('div');
    body.className = 'hub-frame-body';

    this.frame = document.createElement('iframe');
    if (this.options.id) this.frame.id = this.options.id;
    this.frame.className = `${this.options.className} ${this.options.frameClass} hub-frame-iframe`.trim();
    this.frame.src = this.options.src;
    this.frame.title = esc(this.options.title);
    this.frame.setAttribute('referrerpolicy', 'no-referrer');
    if (this.options.lazy) this.frame.setAttribute('loading', 'lazy');
    if (this.options.sandbox) this.frame.setAttribute('sandbox', this.options.sandbox);
    body.appendChild(this.frame);

    const foot = document.createElement('div');
    foot.className = 'hub-frame-foot';
    foot.innerHTML = `<span data-hubframe-status>${esc(this.status)}</span>${this.options.showUrl ? `<span title="${escAttr(this.options.src)}">${esc(this.options.src)}</span>` : ''}`;

    this.container.appendChild(head);
    this.container.appendChild(body);
    this.container.appendChild(foot);

    this._wireActions();
    this._wireLoad();
    this._wireVisibility();
    this._wireMessages();
  }

  _wireActions() {
    const reload = this.container.querySelector('[data-hubframe-reload]');
    if (reload) reload.addEventListener('click', () => this.reload());
    const close = this.container.querySelector('[data-hubframe-close]');
    if (close) close.addEventListener('click', () => this.close());
  }

  _wireLoad() {
    const handler = () => {
      this.ready = true;
      this.status = 'loaded';
      this._updateStatus();
      if (typeof this.options.onLoad === 'function') this.options.onLoad(this);
    };
    this.frame.addEventListener('load', handler);
    this._listeners.push({ el: this.frame, type: 'load', fn: handler });
  }

  _wireVisibility() {
    if (!this.options.pauseOnHidden) return;
    const handler = () => {
      this.postMessage({ type: document.hidden ? 'hub.frame.pause' : 'hub.frame.resume' });
    };
    document.addEventListener('visibilitychange', handler);
    this._listeners.push({ el: document, type: 'visibilitychange', fn: handler });
  }

  _wireMessages() {
    if (typeof this.options.onMessage !== 'function') return;
    const handler = (e) => {
      if (!this.frame || e.source !== this.frame.contentWindow) return;
      this.options.onMessage(e, this);
    };
    window.addEventListener('message', handler);
    this._listeners.push({ el: window, type: 'message', fn: handler });
  }

  _updateStatus() {
    const el = this.container?.querySelector('[data-hubframe-status]');
    if (el) el.textContent = this.status;
  }

  setStatus(text) {
    this.status = String(text || '');
    this._updateStatus();
  }

  reload() {
    this.ready = false;
    this.status = 'reloading';
    this._updateStatus();
    if (this.frame) {
      // Force reload by reassigning src, even if it is the same URL.
      const src = this.frame.src;
      this.frame.src = 'about:blank';
      setTimeout(() => { if (this.frame) this.frame.src = src; }, 30);
    }
  }

  postMessage(msg) {
    if (!this.frame || !this.frame.contentWindow) return false;
    try {
      this.frame.contentWindow.postMessage(Object.assign({ from: 'TheHUB' }, msg || {}), '*');
      return true;
    } catch (e) {
      logHubError?.('HubFrame.postMessage', e);
      return false;
    }
  }

  close() {
    this.container?.classList.remove('show');
    if (this.options.pauseOnHidden) this.postMessage({ type: 'hub.frame.pause' });
  }

  destroy() {
    this._listeners.forEach(({ el, type, fn }) => el.removeEventListener(type, fn));
    this._listeners = [];
    if (this.container) this.container.innerHTML = '';
    this.frame = null;
  }
}

window.HubFrame = HubFrame;
