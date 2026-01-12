<script setup lang="ts">
import { Input } from '@admin-core/ui';
import { ref } from 'vue';
import { useAdminForm, z } from '@admin-core/layouts';

const value = ref('');
const submitResult = ref<any>(null);

// 测试最简单的表单
const [SimpleForm, simpleFormApi] = useAdminForm({
  showDefaultActions: true,
  schema: [
    {
      component: Input, // 直接使用 Input 组件而不是字符串
      fieldName: 'test',
      label: '测试字段',
      rules: z.string().optional(),
      componentProps: {
        placeholder: '请输入',
        class: 'h-12',
      },
    },
  ],
  handleSubmit: async (values) => {
    submitResult.value = values;
  },
});
</script>

<template>
  <div class="space-y-8">
    <!-- 第一部分：直接测试 Input 组件 -->
    <div class="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl ring-1 ring-blue-500/10 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div class="border-b border-blue-200/50 bg-white/50 px-8 py-6 backdrop-blur-sm dark:border-blue-700/50 dark:bg-blue-900/30">
        <div class="flex items-center">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-5">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">1. 直接测试 Input 组件</h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">验证 UI 组件是否正常工作</p>
          </div>
        </div>
      </div>
      
      <div class="p-8">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">测试输入框：</label>
            <Input 
              v-model="value" 
              placeholder="请输入内容" 
              class="h-12 text-base shadow-sm"
            />
          </div>
          
          <div class="mt-6 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-5 ring-1 ring-blue-500/20">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <p class="text-sm font-medium text-blue-900 dark:text-blue-100">当前输入值</p>
                <p class="mt-1 text-lg font-semibold text-blue-700 dark:text-blue-300">{{ value || '(空)' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二部分：测试表单系统 -->
    <div class="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl ring-1 ring-emerald-500/10 dark:from-emerald-900/20 dark:to-teal-900/20">
      <div class="border-b border-emerald-200/50 bg-white/50 px-8 py-6 backdrop-blur-sm dark:border-emerald-700/50 dark:bg-emerald-900/30">
        <div class="flex items-center">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
            <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div class="ml-5">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">2. 测试表单系统</h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">验证 useAdminForm 是否正常工作</p>
          </div>
        </div>
      </div>
      
      <div class="p-8">
        <div class="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10">
          <div class="p-6">
            <SimpleForm />
          </div>
        </div>

        <!-- 提交结果显示 -->
        <div v-if="submitResult" class="mt-6 overflow-hidden rounded-xl bg-green-50 p-5 ring-1 ring-green-500/20 dark:bg-green-900/20">
          <h3 class="text-lg font-semibold text-green-900 dark:text-green-100">提交结果：</h3>
          <pre class="mt-2 text-sm text-green-800 dark:text-green-200">{{ JSON.stringify(submitResult, null, 2) }}</pre>
        </div>

        <!-- API 测试按钮 -->
        <div class="mt-6 flex gap-4">
          <button
            @click="async () => console.log('当前值:', await simpleFormApi.getValues())"
            class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            获取表单值 (控制台)
          </button>
          <button
            @click="simpleFormApi.setFieldValue('test', '测试数据')"
            class="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
          >
            设置测试值
          </button>
        </div>

        <div class="mt-6 flex items-start rounded-xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/20">
          <svg class="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <p class="text-sm font-medium text-emerald-900 dark:text-emerald-100">✅ 测试成功</p>
            <p class="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
              表单系统正常工作！现在可以切换到其他标签页查看完整的表单功能演示。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
