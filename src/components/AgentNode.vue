<template>
  <div class="agent-node" :class="[agent.status, agent.presence_state]">
    <div class="agent-header">
      <h3>{{ agent.name }}</h3>
      <span class="presence-badge" :class="agent.presence_state">
        {{ presenceLabels[agent.presence_state] }}
      </span>
    </div>

    <p class="agent-job"><strong>Job:</strong> {{ agent.job }}</p>

    <div class="status-section">
      <div class="status-row">
        <span class="status-label">Status:</span>
        <span class="status-value" :class="agent.status">{{ statusLabels[agent.status] }}</span>
      </div>

      <div class="progress-section" v-if="agent.status !== 'idle'">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: agent.progress + '%' }"
            :class="agent.status"
          ></div>
        </div>
        <span class="progress-text">{{ agent.progress }}%</span>
      </div>
    </div>

    <div class="message-section" v-if="agent.message">
      <p class="message"><strong>Message:</strong> {{ agent.message }}</p>
    </div>

    <div class="error-section" v-if="agent.error">
      <p class="error"><strong>Error:</strong> {{ agent.error }}</p>
    </div>

    <div class="tasks-section" v-if="agent.tasks.length > 0">
      <p><strong>Tasks:</strong></p>
      <ul class="tasks-list">
        <li v-for="(task, index) in agent.tasks" :key="index">
          {{ task }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  agent: {
    type: Object,
    required: true
  }
})

const statusLabels = {
  idle: 'Idle',
  active: 'Active',
  completed: 'Completed',
  error: 'Error',
  waiting: 'Waiting'
}

const presenceLabels = {
  simulated: 'Simulated',
  awake: 'Awake',
  folded: 'Folded'
}
</script>

<style scoped>
.agent-node {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 15px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.agent-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.agent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.agent-header h3 {
  margin: 0;
  color: #1f2937;
}

.presence-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.presence-badge.simulated {
  background: #e5e7eb;
  color: #6b7280;
}

.presence-badge.awake {
  background: #dcfce7;
  color: #166534;
}

.presence-badge.folded {
  background: #dbeafe;
  color: #1e40af;
}

.agent-job {
  margin: 10px 0;
  color: #4b5563;
  font-size: 0.9rem;
}

.status-section {
  margin: 15px 0;
}

.status-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.status-label {
  font-weight: 500;
  color: #374151;
}

.status-value {
  font-weight: 500;
}

.status-value.idle { color: #6b7280; }
.status-value.active { color: #10b981; }
.status-value.completed { color: #3b82f6; }
.status-value.error { color: #ef4444; }
.status-value.waiting { color: #f59e0b; }

.progress-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-fill.active {
  background: #10b981;
}

.progress-fill.completed {
  background: #3b82f6;
}

.progress-fill.error {
  background: #ef4444;
}

.progress-text {
  font-size: 0.8rem;
  color: #6b7280;
  min-width: 35px;
  text-align: right;
}

.message-section, .error-section {
  margin: 10px 0;
  padding: 8px;
  border-radius: 4px;
}

.message-section {
  background: #f0f9ff;
  border-left: 3px solid #3b82f6;
}

.error-section {
  background: #fef2f2;
  border-left: 3px solid #ef4444;
}

.message, .error {
  margin: 0;
  font-size: 0.9rem;
  color: #374151;
}

.error {
  color: #dc2626;
}

.tasks-section {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
}

.tasks-list {
  margin: 5px 0 0 0;
  padding-left: 20px;
  color: #4b5563;
  font-size: 0.9rem;
}

.tasks-list li {
  margin-bottom: 3px;
}
</style>
