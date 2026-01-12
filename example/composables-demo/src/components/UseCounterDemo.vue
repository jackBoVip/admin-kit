<template>
  <div class="demo-section">
    <h3>useCounter 演示</h3>
    <p>计数值: {{ count }}</p>
    <p>是否最小值: {{ isMin }}</p>
    <p>是否最大值: {{ isMax }}</p>
    <button class="btn" @click="inc()">增加 (1)</button>
    <button class="btn" @click="inc(5)">增加 (5)</button>
    <button class="btn" @click="dec()">减少 (1)</button>
    <button class="btn" @click="dec(3)">减少 (3)</button>
    <button class="btn btn-success" @click="set(50)">设为 50</button>
    <button class="btn btn-secondary" @click="reset()">重置</button>
    <div class="result">
      当前计数: {{ count }} | 最小值: {{ isMin }} | 最大值: {{ isMax }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@admin-core/composables'

const { count, inc, dec, set, reset, isMin, isMax } = useCounter(0, {
  min: 0,
  max: 100,
  step: 1
})
</script>