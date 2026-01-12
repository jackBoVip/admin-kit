<template>
  <div class="demo-section">
    <h3>useNamespace 演示</h3>
    <p>基于 BEM 规范生成 CSS 类名</p>
    
    <div :class="ns.b()">基础块 ({{ ns.b() }})</div>
    <div :class="ns.b('primary')">带后缀块 ({{ ns.b('primary') }})</div>
    <div :class="ns.e('icon')">元素 ({{ ns.e('icon') }})</div>
    <div :class="ns.m('large')">修饰符 ({{ ns.m('large') }})</div>
    <div :class="ns.be('primary', 'icon')">块-元素 ({{ ns.be('primary', 'icon') }})</div>
    <div :class="ns.is('active')">状态 ({{ ns.is('active') }})</div>
    
    <div class="result">
      <p>命名空间: {{ ns.namespace }}</p>
      <p>生成的 BEM 类名用于统一的样式管理</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@admin-core/composables'

const ns = useNamespace('test')
</script>

<style scoped>
/* 这些样式仅用于演示，实际的类名会根据命名空间生成 */
.admin-test {
  padding: 8px;
  margin: 4px 0;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
}

.admin-test-primary {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.admin-test__icon {
  font-style: italic;
}

.admin-test--large {
  font-size: 1.2em;
}

.is-active {
  color: #007bff;
  font-weight: bold;
}
</style>