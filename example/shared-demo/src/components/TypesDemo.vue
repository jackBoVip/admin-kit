<template>
  <section class="feature-section">
    <h3>类型定义</h3>
    <div class="type-demo">
      <h4>通用类型示例</h4>
      <div class="code-block">
        <pre>// ID 类型
interface User {
  id: ID;  // number | string
  name: string;
}

// 分页类型
interface ApiResponse&lt;T&gt; {
  code: number;
  message: string;
  data: T;
}

// 树形节点类型
interface TreeNode&lt;T = any&gt; {
  id: ID;
  parentId?: ID;
  children?: TreeNode&lt;T&gt;[];
  [key: string]: any;
}

// 选项类型
interface Option&lt;T = any&gt; {
  label: string;
  value: T;
  disabled?: boolean;
}

// 表单规则类型
interface FormRule {
  required?: boolean;
  message?: string;
  trigger?: string | string[];
  validator?: (rule: any, value: any, callback: any) => void;
}

// 状态存储类型
interface Store&lt;T&gt; {
  getState: () => T;
  setState: (updater: T | StoreUpdater&lt;T&gt;) => void;
  subscribe: (subscriber: StoreSubscriber&lt;T&gt;) => () => void;
  destroy: () => void;
}</pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 类型定义组件 - 仅用于展示类型定义
</script>

<style scoped>
.feature-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.feature-section h3 {
  color: #2d3748;
  border-bottom: 2px solid #3182ce;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.type-demo {
  padding: 1rem;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.code-block {
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-block pre {
  margin: 0;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
}
</style>