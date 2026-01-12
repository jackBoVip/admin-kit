<template>
  <div class="demo-section">
    <h3>useLoading 演示</h3>
    <p>加载状态: {{ loading ? '加载中...' : '空闲' }}</p>
    <button class="btn" @click="startLoading" :disabled="loading">开始加载</button>
    <button class="btn" @click="stopLoading" :disabled="!loading">停止加载</button>
    <button class="btn btn-success" @click="simulateAsyncOperation">模拟异步操作</button>
    <div class="result" v-if="loading">
      正在加载中，请稍候...
    </div>
    <div class="result" v-else>
      加载完成
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from '@admin-core/composables'

const { loading, startLoading, stopLoading, withLoading } = useLoading(false)

const simulateAsyncOperation = async () => {
  await withLoading(async () => {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000))
  })
}
</script>