import { ref, onMounted, onUnmounted } from 'vue'
import { useAgentStore } from '../stores/agentStore'

let ws = null
const connected = ref(false)

export function useWebSocket() {
  const agentStore = useAgentStore()

  onMounted(() => {
    // Connect to raw WebSocket
    ws = new WebSocket('ws://localhost:3001')

    ws.onopen = () => {
      console.log('✅ Connected to WebSocket server')
      connected.value = true

      // Send initial connection message
      ws.send(JSON.stringify({
        type: 'vue_client_connected',
        timestamp: new Date().toISOString()
      }))
    }

    ws.onclose = () => {
      console.log('❌ Disconnected from WebSocket server')
      connected.value = false
    }

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error)
      connected.value = false
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('📥 Received:', data)

        // Handle different message types
        if (data.agent_name) {
          agentStore.updateAgent(data)
        }

        if (data.event_type === 'pipeline_start') {
          agentStore.setPipelineStatus('active')
        }

        if (data.event_type === 'pipeline_complete') {
          agentStore.setPipelineStatus('completed')
        }

        // Handle system events
        if (data.type === 'system_event') {
          if (data.event_type === 'pipeline_start') {
            agentStore.setPipelineStatus('active')
          } else if (data.event_type === 'pipeline_complete') {
            agentStore.setPipelineStatus('completed')
          }
        }

      } catch (error) {
        console.error('❌ Invalid JSON received:', event.data, error)
      }
    }
  })

  onUnmounted(() => {
    if (ws) {
      ws.close()
    }
  })

  const startPipeline = (autoMode) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        start_pipeline: { auto: autoMode }
      }))
      console.log('▶️ Pipeline start command sent')
    } else {
      console.error('❌ Cannot start pipeline - WebSocket not connected')
    }
  }

  return {
    connected,
    startPipeline
  }
}
