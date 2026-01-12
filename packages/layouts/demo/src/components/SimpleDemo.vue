<script setup lang="ts">
/**
 * 简单表单演示
 * 
 * @description
 * 最简单的表单示例，用于测试基础功能
 */
import { useAdminForm, z } from '@admin-core/layouts';

console.log('useAdminForm:', useAdminForm);
console.log('z:', z);

const [Form, formApi] = useAdminForm({
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'name',
      label: '姓名',
      rules: z.string().min(1, '请输入姓名'),
      componentProps: {
        placeholder: '请输入姓名',
      },
    },
  ],
  handleSubmit: (values) => {
    console.log('提交:', values);
    alert(JSON.stringify(values, null, 2));
  },
});

console.log('Form:', Form);
console.log('formApi:', formApi);
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">简单表单测试</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        测试最基础的表单功能
      </p>
    </div>

    <Form />

    <div class="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
      <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">测试说明</h3>
      <ul class="mt-2 space-y-1 text-xs text-blue-700 dark:text-blue-300">
        <li>• 表单组件正在构建中</li>
        <li>• 查看控制台输出</li>
        <li>• 验证导入是否正常</li>
      </ul>
    </div>
  </div>
</template>
