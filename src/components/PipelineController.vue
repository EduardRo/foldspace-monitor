<template>
  <div class="pipeline-controller">
    <h2>🎛️ Pipeline Control</h2>

    <div class="connection-status" :class="{ connected: isConnected, disconnected: !isConnected }">
      <span class="status-indicator">
        {{ isConnected ? '🔗 Connected' : '❌ Disconnected' }}
      </span>
    </div>

    <div class="control-panel">
      <div class="status-indicator">
        <span class="status-dot" :class="pipelineStatus"></span>
        <span class="status-text">{{ statusText }}</span>
      </div>

      <div class="buttons">
        <button
          @click="startPipeline(true)"
          :disabled="isRunning || !isConnected"
          class="btn-auto"
        >
          ▶️ Run Automatically
        </button>

        <button
          @click="startPipeline(false)"
          :disabled="isRunning || !isConnected"
          class="btn-manual"
        >
          ⏯️ Run with Confirmation
        </button>

        <button
          @click="resetPipeline"
          :disabled="pipelineStatus === 'active'"
          class="btn-reset"
        >
          🔄 Reset
        </button>
      </div>
    </div>

    <div v-if="pipelineId" class="pipeline-id">
      Pipeline ID: <code>{{ pipelineId }}</code>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAgentStore } from '../stores/agentStore'
import { useWebSocket } from '../composables/useWebSocket'

const agentStore = useAgentStore()
const { startPipeline, connected } = useWebSocket()

// Now we use the connected variable
const isConnected = computed(() => connected.value)

const pipelineStatus = computed(() => agentStore.pipelineStatus)
const pipelineId = computed(() => agentStore.pipelineId)
const isRunning = computed(() => pipelineStatus.value === 'active')

const statusText = computed(() => {
  switch (pipelineStatus.value) {
    case 'active': return 'Pipeline Running'
    case 'completed': return 'Pipeline Completed'
    case 'error': return 'Pipeline Error'
    case 'waiting': return 'Waiting for Input'
    default: return 'Ready'
  }
})

const resetPipeline = () => {
  agentStore.resetPipeline()
}
</script>

<style scoped>
.pipeline-controller {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.connection-status {
  text-align: right;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.connection-status.connected {
  color: #10b981;
}

.connection-status.disconnected {
  color: #ef4444;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.idle { background: #6b7280; }
.status-dot.active { background: #10b981; animation: pulse 1.5s infinite; }
.status-dot.completed { background: #3b82f6; }
.status-dot.error { background: #ef4444; }
.status-dot.waiting { background: #f59e0b; }

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-auto {
  background: #10b981;
  color: white;
}

.btn-auto:hover:not(:disabled) {
  background: #059669;
}

.btn-manual {
  background: #3b82f6;
  color: white;
}

.btn-manual:hover:not(:disabled) {
  background: #2563eb;
}

.btn-reset {
  background: #6b7280;
  color: white;
}

.btn-reset:hover:not(:disabled) {
  background: #4b5563;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pipeline-id {
  margin-top: 15px;
  padding: 10px;
  background: #f3f4f6;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
}
</style>
