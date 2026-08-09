/** CanvasRenderer — owns all canvas drawing and sprite/placeholder fallback. */
export class CanvasRenderer {
  constructor(canvasId, spriteAtlas = null) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) throw new Error(`Canvas #${canvasId} was not found.`);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.spriteAtlas = spriteAtlas;
    this._debugMode = true;
  }

  clear(color = '#1a1c23') { this.ctx.fillStyle = color; this.ctx.fillRect(0, 0, this.width, this.height); }
  drawRect(x, y, width, height, color) { this.ctx.fillStyle = color; this.ctx.fillRect(Math.round(x), Math.round(y), width, height); }
  drawText(text, x, y, color = '#e8eaf0', font = '10px monospace', align = 'left') {
    this.ctx.fillStyle = color; this.ctx.font = font; this.ctx.textAlign = align; this.ctx.fillText(text, Math.round(x), Math.round(y));
  }

  drawBackground(zoneId = 'fittoa') {
    const backgrounds = {
      fittoa: { sky: '#87ceeb', ground1: '#4a7c59', ground2: '#3a6a49' },
      demon: { sky: '#4a2a2a', ground1: '#3a2a1a', ground2: '#2a1a0a' },
      milis: { sky: '#6a8aba', ground1: '#5a8a4a', ground2: '#4a7a3a' },
      beggaritt: { sky: '#4a4a5a', ground1: '#5a5a4a', ground2: '#4a4a3a' },
      ranoa: { sky: '#8abad4', ground1: '#d0e0e8', ground2: '#c0d0d8' },
      asura: { sky: '#d4e8f0', ground1: '#e8e0d0', ground2: '#d8d0c0' }
    };
    const bg = backgrounds[zoneId] || backgrounds.fittoa;
    this.drawRect(0, 0, this.width, this.height * 0.6, bg.sky);
    this.drawRect(0, this.height * 0.6, this.width, this.height * 0.4, bg.ground1);
    this.drawRect(0, this.height * 0.6, this.width, 2, bg.ground2);
  }

  drawSprite(frame, x, y, width, height) {
    const { image, sourceRect } = frame;
    if (sourceRect) {
      this.ctx.drawImage(image, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, x, y, width, height);
    } else {
      this.ctx.drawImage(image, x, y, width, height);
    }
  }

  drawEntity(entity) {
    if (!entity.isAlive) return;
    const { x, y, width, height, color } = entity;
    const frame = this.spriteAtlas?.getFrame(entity.spriteId || entity.id);
    this.drawRect(x - 1, y + height - 2, width + 2, 4, 'rgba(0,0,0,0.3)');

    if (frame) this.drawSprite(frame, x, y, width, height);
    else {
      this.drawRect(x, y, width, height, color);
      // Small marker makes placeholders visibly distinct from real sprites.
      this.drawRect(x + Math.floor(width / 2) - 1, y + 3, 2, 2, 'rgba(255,255,255,0.55)');
    }

    if (entity.type === 'enemy' && entity.maxHp) this.drawHealthBar(entity);
    if (entity.type === 'hero') this.drawText(entity.displayName || '?', x + width / 2, y - 8, '#e8eaf0', '9px monospace', 'center');
  }

  drawHealthBar(entity) {
    const hpPercent = Math.max(0, Math.min(1, entity.hp / entity.maxHp));
    this.drawRect(entity.x, entity.y - 5, entity.width, 3, '#2a1a1a');
    this.drawRect(entity.x, entity.y - 5, entity.width * hpPercent, 3, hpPercent > .5 ? '#4ad94a' : hpPercent > .25 ? '#d9c44a' : '#d94a4a');
  }

  drawChest(chest) {
    const { x, y, isOpen } = chest;
    this.drawRect(x, y, 16, 12, isOpen ? '#d4a034' : '#6a4a2a');
    this.drawRect(x + (isOpen ? 1 : 3), y + (isOpen ? 3 : 2), isOpen ? 14 : 10, isOpen ? 6 : 3, isOpen ? '#3a2a1a' : '#d4a034');
    if (!isOpen && Math.floor(Date.now() / 500) % 2 === 0) this.drawRect(x + 1, y + 1, 5, 5, 'rgba(255,255,200,0.4)');
  }

  drawHUD(gold, zoneName, stageNum, fps) {
    const left = document.querySelector('.hud-left'); const right = document.querySelector('.hud-right');
    if (left) left.innerHTML = `<div class="hud-gold">Gold: ${gold.toLocaleString()}</div><div class="hud-zone">${zoneName} — Stage ${stageNum}</div>`;
    if (right) right.innerHTML = `<div class="hud-fps">${fps} FPS</div><div class="hud-assets">Sprite fallback active</div>`;
  }

  drawDebugInfo(wave, enemiesAlive) {
    if (!this._debugMode) return;
    this.drawRect(4, this.height - 24, 230, 20, 'rgba(0,0,0,0.6)');
    this.drawText(`Wave ${wave} | Enemies: ${enemiesAlive} | Build 0.3.0.0.a`, 8, this.height - 10, '#9da3b8', '9px monospace');
  }
}
