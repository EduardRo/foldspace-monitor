import { defineStore } from 'pinia'

export const useAgentStore = defineStore('agents', {
  state: () => ({
    agents: [
      {
        name: "Analyzer",
        job: "Reads files, categorizes content",
        tasks: ["Load files", "Analyze content", "Generate ideas"],
        status: "idle",
        progress: 0,
        message: "",
        error: null,
        presence_state: "simulated"
      },
      {
        name: "Writer",
        job: "Writes full article",
        tasks: ["Generate content"],
        status: "idle",
        progress: 0,
        message: "",
        error: null,
        presence_state: "simulated"
      },
      {
        name: "Editor",
        job: "Formats for newspaper",
        tasks: ["Apply format"],
        status: "idle",
        progress: 0,
        message: "",
        error: null,
        presence_state: "simulated"
      },
      {
        name: "ImagePrompter",
        job: "Creates image prompt",
        tasks: ["Generate prompt"],
        status: "idle",
        progress: 0,
        message: "",
        error: null,
        presence_state: "simulated"
      },
      {
        name: "ImageGenerator",
        job: "Calls API, saves image",
        tasks: ["Generate image"],
        status: "idle",
        progress: 0,
        message: "",
        error: null,
        presence_state: "simulated"
      },
      {
        name: "Translator",
        job: "Translates to Romanian",
        tasks: ["Translate content"],
        status: "idle",
        progress: 0,
        message: "",
        error: null,
        presence_state: "simulated"
      },
      {
        name: "DatabaseSaver",
        job: "Stores in MySQL",
        tasks: ["Save to DB"],
        status: "idle",
        progress: 0,
        message: "",
        error: null,
        presence_state: "simulated"
      }
    ],
    pipelineStatus: "idle",
    pipelineId: null
  }),

  getters: {
    activeAgents: (state) => state.agents.filter(a => a.status === 'active'),
    completedAgents: (state) => state.agents.filter(a => a.status === 'completed'),
    errorAgents: (state) => state.agents.filter(a => a.status === 'error')
  },

  actions: {
    updateAgent(update) {
      const agent = this.agents.find(a => a.name === update.agent_name)
      if (agent) {
        Object.assign(agent, update)
      }
    },

    resetPipeline() {
      this.agents.forEach(agent => {
        agent.status = 'idle'
        agent.progress = 0
        agent.message = ''
        agent.error = null
        agent.presence_state = 'simulated'
      })
      this.pipelineStatus = 'idle'
      this.pipelineId = null
    },

    setPipelineStatus(status, id = null) {
      this.pipelineStatus = status
      if (id) this.pipelineId = id
    }
  }
})
