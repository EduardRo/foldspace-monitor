<template>
  <div id="app">
    <header>
      <h1>🌐 Foldspace Monitor</h1>
      <p>Where presence unfolds — and you guide the fold</p>
    </header>

    <main>
      <PipelineController />
      <AgentCanvas />
    </main>
  </div>
</template>

<script setup>
import PipelineController from './components/PipelineController.vue'
import AgentCanvas from './components/AgentCanvas.vue'
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
