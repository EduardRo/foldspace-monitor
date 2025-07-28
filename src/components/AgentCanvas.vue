<template>
  <div class="agent-canvas">
    <h2>🤖 Agent Canvas</h2>

    <div class="agents-grid">
      <AgentNode
        v-for="agent in agents"
        :key="agent.name"
        :agent="agent"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAgentStore } from '../stores/agentStore'
import AgentNode from './AgentNode.vue'

const agentStore = useAgentStore()
const agents = computed(() => agentStore.agents)
</script>

<style scoped>
.agent-canvas {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
