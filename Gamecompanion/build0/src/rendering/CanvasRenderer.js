/**
 * CanvasRenderer — Owns the canvas context and all drawing operations.
 * Renders characters as colored rectangles until sprite atlases are loaded.
 */
export class CanvasRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this._sprites = {};
    this._debugMode = true;
  }

  clear() {
    this.ctx.fillStyle = '#1a1c23';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawBackground(zoneId = 'fittoa') {
    const backgrounds = {
      fittoa: { sky: '#87CEEB', ground1: '#4a7c59', ground2: '#3a6a49' },
      demon: { sky: '#4a2a2a', ground1: '#3a2a1a', ground2: '#2a1a0a' },
      milis: { sky: '#6a8aba', ground1: '#5a8a4a', ground2: '#4a7a3a' },
      beggaritt: { sky: '#4a4a5a', ground1: '#5a5a4a', ground2: '#4a4a3a' },
      ranoa: { sky: '#8abad4', ground1: '#d0e0e8', ground2: '#c0d0d8' },
      asura: { sky: '#d4e8f0', ground1: '#e8e0d0', ground2: '#d8d0c0' }
    };
    const bg = backgrounds[zoneId] || backgrounds.fittoa;

    /* Sky */
    this.ctx.fillStyle = bg.sky;
    this.ctx.fillRect(0, 0, this.width, this.height * 0.6);

    /* Ground */
    this.ctx.fillStyle = bg.ground1;
    this.ctx.fillRect(0, this.height * 0.6, this.width, this.height * 0.4);

    /* Ground detail line */
    this.ctx.fillStyle = bg.ground2;
    this.ctx.fillRect(0, this.height * 0.6, this.width, 2);
  }

  drawEntity(entity) {
    const { x, y, width, height, color, isAlive } = entity;
    if (!isAlive) return;

    /* Shadow */
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.fillRect(x - 1, y + height - 2, width + 2, 4);

    /* Body */
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);

    /* HP bar for enemies */
    if (entity.type === 'enemy' && entity.maxHp) {
      const barWidth = width;
      const barHeight = 3;
      const hpPercent = entity.hp / entity.maxHp;
      this.ctx.fillStyle = '#2a1a1a';
      this.ctx.fillRect(x, y - 5, barWidth, barHeight);
      this.ctx.fillStyle = hpPercent > 0.5 ? '#4ad94a' : hpPercent > 0.25 ? '#d9c44a' : '#d94a4a';
      this.ctx.fillRect(x, y - 5, barWidth * hpPercent, barHeight);
    }

    /* Name for heroes */
    if (entity.type === 'hero') {
      this.ctx.fillStyle = '#e8eaf0';
      this.ctx.font = '9px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(entity.displayName || '?', x + width / 2, y - 8);
    }
  }

  drawChest(chest) {
    const { x, y, isOpen } = chest;
    if (isOpen) {
      /* Open chest */
      this.ctx.fillStyle = '#d4a034';
      this.ctx.fillRect(x, y, 16, 12);
      this.ctx.fillStyle = '#3a2a1a';
      this.ctx.fillRect(x + 1, y + 3, 14, 6);
    } else {
      /* Closed chest */
      this.ctx.fillStyle = '#6a4a2a';
      this.ctx.fillRect(x, y, 16, 12);
      this.ctx.fillStyle = '#d4a034';
      this.ctx.fillRect(x + 3, y + 2, 10, 3);
      /* Shimmer */
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        this.ctx.fillStyle = 'rgba(255,255,200,0.4)';
        this.ctx.fillRect(x + 1, y + 1, 5, 5);
      }
    }
  }

  drawFloatingText(text, x, y, color = '#e8eaf0') {
    this.ctx.fillStyle = color;
    this.ctx.font = 'bold 11px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, x, y);
  }

  drawHUD(gold, zoneName, stageNum, fps) {
    const left = document.querySelector('.hud-left');
    const right = document.querySelector('.hud-right');
    if (left) {
      left.innerHTML = `
        <div class="hud-gold">Gold: ${gold.toLocaleString()}</div>
        <div class="hud-zone">${zoneName} — Stage ${stageNum}</div>
      `;
    }
    if (right) {
      right.innerHTML = `<div style="font-size:9px;color:#616780;">${fps} FPS</div>`;
    }
  }

  drawDebugInfo(wave, enemiesAlive) {
    if (!this._debugMode) return;
    this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
    this.ctx.fillRect(4, this.height - 24, 200, 20);
    this.ctx.fillStyle = '#9da3b8';
    this.ctx.font = '9px monospace';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Wave ${wave} | Enemies: ${enemiesAlive} | Build 0.0.0.0.a`, 8, this.height - 10);
  }
}
