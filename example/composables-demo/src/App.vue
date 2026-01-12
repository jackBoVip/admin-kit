<template>
  <div class="composables-demo">
    <h1>Composables 功能测试</h1>
    <div class="demo-sections">
      <UseToggleDemo />
      <UseBooleanDemo />
      <UseCounterDemo />
      <UseLoadingDemo />
      <UseClipboardDemo />
      <UseLocalStorageDemo />
      <UseScrollLockDemo />
      <UsePriorityValueDemo />
      <UseNamespaceDemo />
      <UseLayoutStyleDemo />
      <UseSortableDemo />
      <UseIsMobileDemo />
      <UseSimpleLocaleDemo />
      <UsePreferencesDemo />
    </div>
  </div>
</template>

<script setup lang="ts">
import UseToggleDemo from './components/UseToggleDemo.vue'
import UseBooleanDemo from './components/UseBooleanDemo.vue'
import UseCounterDemo from './components/UseCounterDemo.vue'
import UseLoadingDemo from './components/UseLoadingDemo.vue'
import UseClipboardDemo from './components/UseClipboardDemo.vue'
import UseLocalStorageDemo from './components/UseLocalStorageDemo.vue'
import UseScrollLockDemo from './components/UseScrollLockDemo.vue'
import UsePriorityValueDemo from './components/UsePriorityValueDemo.vue'
import UseNamespaceDemo from './components/UseNamespaceDemo.vue'
import UseLayoutStyleDemo from './components/UseLayoutStyleDemo.vue'
import UseSortableDemo from './components/UseSortableDemo.vue'
import UseIsMobileDemo from './components/UseIsMobileDemo.vue'
import UseSimpleLocaleDemo from './components/UseSimpleLocaleDemo.vue'
import UsePreferencesDemo from './components/UsePreferencesDemo.vue'
</script>

<style>
.composables-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.demo-section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
}

.demo-section h3 {
  margin-top: 0;
  color: #444;
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 4px;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-success {
  background-color: #28a745;
}

.btn-success:hover {
  background-color: #1e7e34;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.input {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin: 4px;
}

.result {
  margin: 10px 0;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 4px;
  font-family: monospace;
}

.sortable-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.sortable-item {
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: move;
}

.sortable-item.dragging {
  opacity: 0.5;
  background-color: #e2e6ea;
}
</style>