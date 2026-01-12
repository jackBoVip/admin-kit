<template>
  <div class="demo-section">
    <h3>useToggle 演示</h3>
    <p>当前状态: {{ state ? '开启' : '关闭' }}</p>
    <button class="btn" @click="toggle">切换</button>
    <button class="btn btn-success" @click="setTrue">设为开启</button>
    <button class="btn btn-danger" @click="setFalse">设为关闭</button>
    <div class="result">
      状态值: {{ state }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@admin-core/composables'

const { state, toggle, setTrue, setFalse } = useToggle(false)
</script>