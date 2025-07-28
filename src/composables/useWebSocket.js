import { ref, onMounted, onUnmounted } from 'vue'
import { useAgentStore } from '../stores/agentStore'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

export function useWebSocket() {
  const agentStore = useAgentStore()
  const connected = ref(false)

  onMounted(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
      connected.value = true
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
      connected.value = false
    })

    // Handle agent updates
    socket.on('agent_update', (update) => {
      console.log('Agent update received:', update)
      agentStore.updateAgent(update)

      // Update pipeline status if needed
      if (update.agent_name === 'PipelineController') {
        agentStore.setPipelineStatus(update.status, update.message.includes('Pipeline') ? update.message.split(' ')[1] : null)
      }
    })

    // Handle system events
    socket.on('system_event', (event) => {
      console.log('System event received:', event)
      // Handle system-level messages here
    })
  })

  onUnmounted(() => {
    socket.disconnect()
  })

  const startPipeline = (autoMode) => {
    socket.emit('start_pipeline', { auto: autoMode })
  }

  return {
    connected,
    startPipeline
  }
}
