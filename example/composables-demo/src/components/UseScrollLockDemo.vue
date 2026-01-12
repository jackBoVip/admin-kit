<template>
  <div class="demo-section">
    <h3>useScrollLock 演示</h3>
    <p>此功能主要用于锁定页面滚动，常用于模态框、抽屉等场景</p>
    <p>当启用滚动锁定时，页面背景将无法滚动</p>
    <button class="btn" @click="lockScroll">锁定滚动</button>
    <button class="btn btn-secondary" @click="unlockScroll">解锁滚动</button>
    <div class="result">
      <p>页面内容较长，用于演示滚动锁定功能</p>
      <div v-for="n in 50" :key="n" class="placeholder-content">
        这是第 {{ n }} 行内容，用于测试滚动锁定功能
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollLock as _useScrollLock } from '@vueuse/core'
import { onMounted, onUnmounted } from 'vue'

const bodyScrollLock = _useScrollLock(document.body)

const lockScroll = () => {
  bodyScrollLock.value = true
}

const unlockScroll = () => {
  bodyScrollLock.value = false
}

onMounted(() => {
  // 初始化时不锁定
  bodyScrollLock.value = false
})

onUnmounted(() => {
  // 组件卸载时解锁滚动
  bodyScrollLock.value = false
})
</script>

<style scoped>
.placeholder-content {
  padding: 8px;
  margin: 4px 0;
  background-color: #e9ecef;
  border-radius: 4px;
}
</style>