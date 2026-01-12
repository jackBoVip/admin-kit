<template>
  <div class="demo-section">
    <h3>useLayoutStyle 演示</h3>
    <p>用于管理布局样式，如头部、内容、底部的高度</p>
    <p>这是一个高级布局管理功能，通常用于大型布局组件</p>
    
    <div class="controls">
      <div class="control-group">
        <label>
          头部高度: 
          <input 
            v-model.number="newHeaderHeight" 
            type="number" 
            min="40" 
            max="200" 
            class="input" 
            placeholder="输入头部高度"
          />
          <span class="current-value">当前: {{ headerHeight }}px</span>
        </label>
        <button class="btn btn-secondary" @click="updateHeaderHeight">更新头部高度</button>
      </div>
      
      <div class="control-group">
        <label>
          底部高度: 
          <input 
            v-model.number="newFooterHeight" 
            type="number" 
            min="40" 
            max="200" 
            class="input" 
            placeholder="输入底部高度"
          />
          <span class="current-value">当前: {{ footerHeight }}px</span>
        </label>
        <button class="btn btn-secondary" @click="updateFooterHeight">更新底部高度</button>
      </div>
    </div>
    
    <div class="layout-demo">
      <header ref="headerRef" class="layout-header">
        <h4>布局头部</h4>
        <p>高度: {{ headerHeight }}px</p>
      </header>
      
      <main class="layout-content">
        <h4>布局内容区域</h4>
        <p>此区域会根据头部和底部高度自动调整</p>
        <p>CSS 变量 --admin-content-height: {{ headerHeight > 0 ? 'calc(100vh - ' + (headerHeight + footerHeight) + 'px)' : '未设置' }}</p>
        <p>CSS 变量 --admin-header-height: {{ headerHeight }}px</p>
        <p>CSS 变量 --admin-footer-height: {{ footerHeight }}px</p>
      </main>
      
      <footer class="layout-footer">
        <h4>布局底部</h4>
        <p>高度: {{ footerHeight }}px</p>
      </footer>
    </div>
    
    <div class="result">
      <p>布局样式管理功能演示</p>
      <p>头部高度: {{ headerHeight }}px</p>
      <p>底部高度: {{ footerHeight }}px</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useLayoutHeaderStyle, useLayoutFooterStyle, useLayoutContentStyle } from '@admin-core/composables'

const headerRef = ref<HTMLElement | null>(null)
const newHeaderHeight = ref(64)
const newFooterHeight = ref(48)
const { getLayoutHeaderHeight, setLayoutHeaderHeight } = useLayoutHeaderStyle()
const { getLayoutFooterHeight, setLayoutFooterHeight } = useLayoutFooterStyle()
const { contentElement } = useLayoutContentStyle()

const headerHeight = ref(64)
const footerHeight = ref(48)

const updateHeaderHeight = () => {
  setLayoutHeaderHeight(newHeaderHeight.value)
  headerHeight.value = getLayoutHeaderHeight()
}

const updateFooterHeight = () => {
  setLayoutFooterHeight(newFooterHeight.value)
  footerHeight.value = getLayoutFooterHeight()
}

onMounted(() => {
  // 设置初始高度
  setLayoutHeaderHeight(64)
  headerHeight.value = getLayoutHeaderHeight()
  
  // 设置底部高度
  setLayoutFooterHeight(48)
  footerHeight.value = getLayoutFooterHeight()
})

// 监听 CSS 变量的变化
watch([
  () => getLayoutHeaderHeight(),
  () => getLayoutFooterHeight()
], ([newHeaderHeight, newFooterHeight]) => {
  headerHeight.value = newHeaderHeight
  footerHeight.value = newFooterHeight
})
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;
  min-width: 200px;
}

.control-group input {
  width: 80px;
}

.current-value {
  margin-left: 10px;
  font-size: 0.9em;
  color: #666;
}

.layout-demo {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 300px; /* 固定高度以便观察布局变化 */
  --header-height: v-bind('headerHeight + "px"');
  --footer-height: v-bind('footerHeight + "px"');
}

.layout-header {
  background-color: #e9ecef;
  padding: 16px;
  border-bottom: 1px solid #ced4da;
  flex-shrink: 0;
  height: var(--header-height);
}

.layout-content {
  padding: 16px;
  background-color: #f8f9fa;
  flex: 1;
  overflow-y: auto;
}

.layout-footer {
  background-color: #e9ecef;
  padding: 16px;
  border-top: 1px solid #ced4da;
  flex-shrink: 0;
  height: var(--footer-height);
}
</style>