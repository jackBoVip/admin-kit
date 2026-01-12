<script setup lang="ts">
/**
 * 基础表单功能演示
 * 
 * @description
 * 测试基本的表单输入、提交、重置功能
 */
import { ref } from 'vue';
import { useAdminForm, z } from '@admin-core/layouts';

// 表单提交结果
const submitResult = ref<any>(null);

// 创建表单实例
const [Form, formApi] = useAdminForm({
  layout: 'vertical',
  showDefaultActions: true,
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'username',
      label: '用户名',
      help: '请输入您的用户名',
      rules: z.string().min(3, '用户名至少3个字符').max(20, '用户名最多20个字符'),
      componentProps: {
        placeholder: '请输入用户名',
        class: 'h-12',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'email',
      label: '邮箱地址',
      rules: z.string().email('请输入有效的邮箱地址'),
      componentProps: {
        placeholder: '请输入邮箱地址',
        type: 'email',
        class: 'h-12',
      },
    },
  ],
  handleSubmit: async (values) => {
    console.log('✅ 表单提交成功:', values);
    submitResult.value = values;
  },
  handleReset: () => {
    console.log('🔄 表单已重置');
    submitResult.value = null;
  },
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold">基础表单演示</h2>
      <p class="mt-2 text-gray-600">测试基本的输入、验证、提交和重置功能</p>
    </div>

    <div class="rounded-lg bg-white p-6 shadow">
      <Form />
    </div>

    <div v-if="submitResult" class="rounded-lg bg-green-50 p-6">
      <h3 class="text-lg font-semibold text-green-900">提交成功！</h3>
      <pre class="mt-2 text-sm text-green-800">{{ JSON.stringify(submitResult, null, 2) }}</pre>
    </div>
  </div>
</template>
