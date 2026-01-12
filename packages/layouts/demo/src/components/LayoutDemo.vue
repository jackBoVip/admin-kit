<script setup lang="ts">
/**
 * 布局模式演示
 * 
 * @description
 * 测试不同的表单布局：水平、垂直、内联、栅格等
 */
import { ref } from 'vue';
import { useAdminForm, z } from '@admin-core/layouts';

const layout = ref<'horizontal' | 'vertical' | 'inline'>('horizontal');
const compact = ref(false);

const baseSchema = [
  {
    component: 'AdminInput',
    fieldName: 'username',
    label: '用户名',
    rules: z.string().min(1),
    componentProps: { placeholder: '用户名' },
  },
  {
    component: 'AdminInput',
    fieldName: 'email',
    label: '邮箱',
    rules: z.string().email(),
    componentProps: { placeholder: '邮箱' },
  },
  {
    component: 'AdminInput',
    fieldName: 'phone',
    label: '手机',
    rules: z.string(),
    componentProps: { placeholder: '手机号' },
  },
];

// 水平布局
const [HorizontalForm] = useAdminForm({
  layout: 'horizontal',
  schema: baseSchema,
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

// 垂直布局
const [VerticalForm] = useAdminForm({
  layout: 'vertical',
  schema: baseSchema,
  wrapperClass: 'grid-cols-1',
});

// 内联布局
const [InlineForm] = useAdminForm({
  layout: 'inline',
  schema: baseSchema,
});

// 栅格布局 - 3列
const [GridForm3] = useAdminForm({
  layout: 'horizontal',
  schema: [
    ...baseSchema,
    {
      component: 'AdminInput',
      fieldName: 'address',
      label: '地址',
      rules: z.string(),
      componentProps: { placeholder: '详细地址' },
      formItemClass: 'md:col-span-3',
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-3',
});

// 紧凑模式
const [CompactForm] = useAdminForm({
  layout: 'horizontal',
  compact: true,
  schema: baseSchema,
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">布局模式</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        测试不同的表单布局方式
      </p>
    </div>

    <!-- 水平布局 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">水平布局 (Horizontal)</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <HorizontalForm />
      </div>
    </div>

    <!-- 垂直布局 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">垂直布局 (Vertical)</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <VerticalForm />
      </div>
    </div>

    <!-- 内联布局 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">内联布局 (Inline)</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <InlineForm />
      </div>
    </div>

    <!-- 栅格布局 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">栅格布局 (3列)</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <GridForm3 />
      </div>
    </div>

    <!-- 紧凑模式 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">紧凑模式 (Compact)</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <CompactForm />
      </div>
    </div>

    <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
      <h3 class="text-sm font-medium text-purple-800 dark:text-purple-200">布局说明</h3>
      <ul class="mt-2 space-y-1 text-xs text-purple-700 dark:text-purple-300">
        <li>• horizontal: 标签在左，控件在右（默认）</li>
        <li>• vertical: 标签在上，控件在下</li>
        <li>• inline: 所有字段在一行内显示</li>
        <li>• 栅格布局: 使用 wrapperClass 控制列数</li>
        <li>• 紧凑模式: 减少字段间距，移除错误信息预留空间</li>
      </ul>
    </div>
  </div>
</template>
