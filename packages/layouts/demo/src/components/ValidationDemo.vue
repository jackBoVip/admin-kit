<script setup lang="ts">
/**
 * 表单验证功能演示
 * 
 * @description
 * 测试各种验证规则和错误提示
 */
import { useAdminForm, z } from '@admin-core/layouts';

const [Form] = useAdminForm({
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'required',
      label: '必填字段',
      rules: z.string().min(1, '此字段为必填项'),
      componentProps: {
        placeholder: '必须填写',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'minLength',
      label: '最小长度',
      rules: z.string().min(5, '至少需要5个字符'),
      componentProps: {
        placeholder: '至少5个字符',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'maxLength',
      label: '最大长度',
      rules: z.string().max(10, '最多10个字符'),
      componentProps: {
        placeholder: '最多10个字符',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'pattern',
      label: '正则验证',
      rules: z.string().regex(/^[A-Z][a-z]+$/, '必须以大写字母开头，后跟小写字母'),
      componentProps: {
        placeholder: '如: Hello',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'number',
      label: '数字验证',
      rules: z.coerce.number().min(0, '不能小于0').max(100, '不能大于100'),
      componentProps: {
        placeholder: '0-100之间的数字',
        type: 'number',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'url',
      label: 'URL验证',
      rules: z.string().url('请输入有效的URL'),
      componentProps: {
        placeholder: 'https://example.com',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'custom',
      label: '自定义验证',
      rules: z.string().refine(
        (val) => !val.includes('admin'),
        '不能包含 "admin" 关键字'
      ),
      componentProps: {
        placeholder: '不能包含admin',
      },
    },
  ],
  handleSubmit: (values) => {
    console.log('验证通过，提交数据:', values);
    alert('所有验证通过！');
  },
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">表单验证</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        测试各种 Zod 验证规则和错误提示
      </p>
    </div>

    <Form />

    <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
      <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">验证规则说明</h3>
      <ul class="mt-2 space-y-1 text-xs text-blue-700 dark:text-blue-300">
        <li>• 必填字段：不能为空</li>
        <li>• 最小长度：至少5个字符</li>
        <li>• 最大长度：最多10个字符</li>
        <li>• 正则验证：必须以大写字母开头，后跟小写字母</li>
        <li>• 数字验证：0-100之间的数字</li>
        <li>• URL验证：必须是有效的URL格式</li>
        <li>• 自定义验证：不能包含"admin"关键字</li>
      </ul>
    </div>
  </div>
</template>
