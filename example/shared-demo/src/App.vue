<script setup lang="ts">
import SharedFeaturesDemo from './components/SharedFeaturesDemo.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1>@admin-core/shared 功能演示</h1>
    </header>
    <main>
      <SharedFeaturesDemo />
    </main>
  </div>
</template>

<style>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

h1 {
  font-size: 2rem;
  color: #1f2937;
}

main {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>