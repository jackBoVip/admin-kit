<script setup lang="ts">
/**
 * 表单系统演示主应用
 * 
 * @description
 * 展示所有表单功能的测试示例
 */
import { ref } from 'vue';
import BasicFormDemo from './components/BasicFormDemo.vue';
import ValidationDemo from './components/ValidationDemo.vue';
import DependenciesDemo from './components/DependenciesDemo.vue';
import DynamicFormDemo from './components/DynamicFormDemo.vue';
import LayoutDemo from './components/LayoutDemo.vue';
import AdvancedDemo from './components/AdvancedDemo.vue';
import SimpleDemo from './components/SimpleDemo.vue';
import TestForm from './components/TestForm.vue';


const activeTab = ref('test');

const tabs = [
  { id: 'test', label: '测试', component: TestForm },
  { id: 'basic', label: '基础表单', component: BasicFormDemo },
  { id: 'validation', label: '表单验证', component: ValidationDemo },
  { id: 'dependencies', label: '字段依赖', component: DependenciesDemo },
  { id: 'dynamic', label: '动态表单', component: DynamicFormDemo },
  { id: 'layout', label: '布局模式', component: LayoutDemo },
  { id: 'advanced', label: '高级功能', component: AdvancedDemo },
  { id: 'simple', label: '简单示例', component: SimpleDemo },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Admin Core 表单系统演示
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          测试 @admin-core/layouts 中 form 包的所有功能
        </p>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- 标签页导航 -->
      <div class="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
              'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors',
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- 内容区域 -->
      <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <component :is="tabs.find((t) => t.id === activeTab)?.component" />
      </div>
    </main>
  </div>
</template>
