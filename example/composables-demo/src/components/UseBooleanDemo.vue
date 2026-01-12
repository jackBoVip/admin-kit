<template>
  <div class="demo-section">
    <h3>useBoolean 演示</h3>
    <p>当前值: {{ value ? 'true' : 'false' }}</p>
    <button class="btn" @click="toggle">切换</button>
    <button class="btn btn-success" @click="setTrue">设为 true</button>
    <button class="btn btn-danger" @click="setFalse">设为 false</button>
    <button class="btn btn-secondary" @click="() => setValue(!value)">设置为 {{ !value }}</button>
    <div class="result">
      值: {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoolean } from '@admin-core/composables'

const { value, setTrue, setFalse, toggle, setValue } = useBoolean(false)
</script>