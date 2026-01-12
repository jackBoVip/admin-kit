<script setup lang="ts">
/**
 * 高级功能演示
 * 
 * @description
 * 测试表单的高级功能：折叠展开、自定义渲染、API操作等
 */
import { ref } from 'vue';
import { useAdminForm, z } from '@admin-core/layouts';

// 折叠展开表单
const collapsed = ref(true);

const [CollapseForm] = useAdminForm({
  collapsed: collapsed.value,
  collapsedRows: 1,
  showCollapseButton: true,
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'field1',
      label: '字段1',
      rules: z.string(),
      componentProps: { placeholder: '第一行字段1' },
    },
    {
      component: 'AdminInput',
      fieldName: 'field2',
      label: '字段2',
      rules: z.string(),
      componentProps: { placeholder: '第一行字段2' },
    },
    {
      component: 'AdminInput',
      fieldName: 'field3',
      label: '字段3',
      rules: z.string(),
      componentProps: { placeholder: '第二行字段1' },
    },
    {
      component: 'AdminInput',
      fieldName: 'field4',
      label: '字段4',
      rules: z.string(),
      componentProps: { placeholder: '第二行字段2' },
    },
    {
      component: 'AdminInput',
      fieldName: 'field5',
      label: '字段5',
      rules: z.string(),
      componentProps: { placeholder: '第三行字段1' },
    },
    {
      component: 'AdminInput',
      fieldName: 'field6',
      label: '字段6',
      rules: z.string(),
      componentProps: { placeholder: '第三行字段2' },
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  handleCollapsedChange: (isCollapsed) => {
    console.log('折叠状态变化:', isCollapsed);
  },
});

// 自定义渲染表单
const [CustomForm] = useAdminForm({
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'title',
      label: '标题',
      rules: z.string(),
      componentProps: { placeholder: '请输入标题' },
      suffix: '字',
      description: '这是一个带后缀和描述的字段',
    },
    {
      component: 'AdminInput',
      fieldName: 'content',
      label: '内容',
      rules: z.string(),
      componentProps: {
        placeholder: '请输入内容',
        type: 'textarea',
        rows: 4,
      },
      help: '这是帮助提示信息',
    },
  ],
});

// API 操作表单
const [ApiForm, apiFormApi] = useAdminForm({
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'name',
      label: '姓名',
      rules: z.string(),
      componentProps: { placeholder: '姓名' },
    },
    {
      component: 'AdminInput',
      fieldName: 'age',
      label: '年龄',
      rules: z.coerce.number(),
      componentProps: { placeholder: '年龄', type: 'number' },
    },
  ],
});

// API 操作
const setValues = () => {
  apiFormApi.setValues({
    name: '张三',
    age: 25,
  });
};

const getValues = () => {
  const values = apiFormApi.getValues();
  console.log('当前值:', values);
  alert(JSON.stringify(values, null, 2));
};

const setFieldValue = () => {
  apiFormApi.setFieldValue('name', '李四');
};

const validateField = async () => {
  const result = await apiFormApi.validateField('age');
  console.log('验证结果:', result);
};

const resetForm = () => {
  apiFormApi.resetForm();
};
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">高级功能</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        测试表单的高级特性和API操作
      </p>
    </div>

    <!-- 折叠展开 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">折叠展开</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <CollapseForm />
        <div class="mt-4 flex gap-2">
          <button
            @click="collapsed = !collapsed"
            class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            {{ collapsed ? '展开' : '折叠' }}
          </button>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            当前状态: {{ collapsed ? '折叠' : '展开' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 自定义渲染 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">自定义渲染</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <CustomForm />
      </div>
    </div>

    <!-- API 操作 -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">API 操作</h3>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <ApiForm />
        <div class="mt-4 flex flex-wrap gap-2">
          <button
            @click="setValues"
            class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
          >
            设置所有值
          </button>
          <button
            @click="getValues"
            class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            获取所有值
          </button>
          <button
            @click="setFieldValue"
            class="rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600"
          >
            设置单个字段
          </button>
          <button
            @click="validateField"
            class="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
          >
            验证字段
          </button>
          <button
            @click="resetForm"
            class="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
          >
            重置表单
          </button>
        </div>
      </div>
    </div>

    <div class="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
      <h3 class="text-sm font-medium text-indigo-800 dark:text-indigo-200">高级功能说明</h3>
      <ul class="mt-2 space-y-1 text-xs text-indigo-700 dark:text-indigo-300">
        <li>• 折叠展开: 支持折叠多行表单，节省空间</li>
        <li>• 自定义渲染: 支持后缀、描述、帮助提示等</li>
        <li>• API 操作: 提供完整的表单API进行编程控制</li>
        <li>• setValues: 批量设置表单值</li>
        <li>• getValues: 获取所有表单值</li>
        <li>• setFieldValue: 设置单个字段值</li>
        <li>• validateField: 验证单个字段</li>
        <li>• resetForm: 重置表单到初始状态</li>
      </ul>
    </div>
  </div>
</template>
