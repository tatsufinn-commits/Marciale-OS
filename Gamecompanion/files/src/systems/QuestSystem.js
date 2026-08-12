/**
 * QuestSystem — Build 21 Quest Journal, Progress Tracking & Reward Distribution
 * Single authority on quest state, progress evaluation, and daily rotation.
 */
export class QuestSystem {
  constructor({ stateManager, eventBus, events, questTemplates = [] } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.questTemplates = questTemplates;
    this._initQuestState();
    this._bindEvents();
  }

  _initQuestState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('quests.active');
    if (!current || !Array.isArray(current) || current.length === 0) {
      const initial = this.questTemplates.map(q => ({
        id: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        targetType: q.targetType,
        targetCount: q.targetCount,
        progress: 0,
        completed: false,
        rewards: q.rewards
      }));
      this.stateManager.set('quests.active', initial, { source: 'quest_init' });
    }
  }

  _bindEvents() {
    if (!this.eventBus || !this.events) return;

    this.eventBus.on(this.events.MONSTER_KILLED, () => {
      this.updateProgress('monster_killed', 1);
    });

    this.eventBus.on(this.events.CHEST_OPENED, () => {
      this.updateProgress('chest_opened', 1);
    });

    this.eventBus.on(this.events.STAGE_CLEARED, () => {
      this.updateProgress('stage_cleared', 1);
    });

    this.eventBus.on(this.events.WAVE_CLEARED, () => {
      this.updateProgress('wave_cleared', 1);
    });
  }

  getActiveQuests(type = null) {
    const list = this.stateManager?.get('quests.active') || [];
    if (!type) return list;
    return list.filter(q => q.type === type);
  }

  updateProgress(targetType, delta = 1) {
    if (!this.stateManager) return [];
    const quests = this.stateManager.get('quests.active') || [];
    const completedNow = [];

    const updated = quests.map(q => {
      if (q.completed || q.targetType !== targetType) return q;
      const progress = Math.min(q.targetCount, (q.progress || 0) + delta);
      const completed = progress >= q.targetCount;
      if (completed && !q.completed) {
        completedNow.push({ ...q, progress, completed });
      }
      return { ...q, progress, completed };
    });

    this.stateManager.set('quests.active', updated, { source: 'quest_progress' });

    completedNow.forEach(q => {
      this.claimReward(q.id);
    });

    return completedNow;
  }

  claimReward(questId) {
    const quests = this.stateManager?.get('quests.active') || [];
    const q = quests.find(item => item.id === questId);
    if (!q) return null;

    // Disburse gold
    if (q.rewards?.gold) {
      this.stateManager.update('player.gold', (g) => (g || 0) + q.rewards.gold, { source: 'quest_reward' });
    }

    if (this.eventBus && this.events?.QUEST_COMPLETED) {
      this.eventBus.emit(this.events.QUEST_COMPLETED, { quest: q });
    }

    return q.rewards;
  }
}
