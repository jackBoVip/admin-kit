<script setup lang="ts">
/**
 * 动态表单功能演示
 * 
 * @description
 * 测试动态添加/删除字段、动态修改配置等功能
 */
import { ref } from 'vue';
import { useAdminForm, z, type AdminFormSchema } from '@admin-core/layouts';

// 动态字段列表
const dynamicFields = ref<AdminFormSchema[]>([
  {
    component: 'AdminInput',
    fieldName: 'name',
    label: '姓名',
    rules: z.string().min(1, '请输入姓名'),
    componentProps: {
      placeholder: '请输入姓名',
    },
  },
]);

// 字段计数器
let fieldCounter = 1;

// 添加字段
const addField = () => {
  fieldCounter++;
  dynamicFields.value.push({
    component: 'AdminInput',
    fieldName: `field_${fieldCounter}`,
    label: `动态字段 ${fieldCounter}`,
    rules: z.string().optional(),
    componentProps: {
      placeholder: `动态字段 ${fieldCounter}`,
    },
  });
};

// 删除字段
const removeField = (index: number) => {
  if (dynamicFields.value.length > 1) {
    dynamicFields.value.splice(index, 1);
  }
};

// 创建表单
const [Form, formApi] = useAdminForm({
  schema: dynamicFields,
  handleSubmit: (values) => {
    console.log('动态表单提交:', values);
    alert('提交成功！');
  },
});

// 动态修改字段属性
const toggleFieldDisabled = (fieldName: string) => {
  const field = dynamicFields.value.find((f) => f.fieldName === fieldName);
  if (field) {
    field.disabled = !field.disabled;
  }
};
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">动态表单</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        测试动态添加/删除字段和修改配置
      </p>
    </div>

    <!-- 字段管理 -->
    <div class="space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">字段管理</h3>
      <div class="flex flex-wrap gap-2">
        <button
          @click="addField"
          class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
        >
          ➕ 添加字段
        </button>
        <button
          v-for="(field, index) in dynamicFields"
          :key="field.fieldName"
          @click="removeField(index)"
          :disabled="dynamicFields.length === 1"
          class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 disabled:opacity-50"
        >
          ❌ 删除 {{ field.label }}
        </button>
      </div>
    </div>

    <Form />

    <!-- 字段列表 -->
    <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
      <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">当前字段列表</h3>
      <ul class="mt-2 space-y-1 text-xs text-blue-700 dark:text-blue-300">
        <li v-for="field in dynamicFields" :key="field.fieldName">
          • {{ field.label }} ({{ field.fieldName }})
          <button
            @click="toggleFieldDisabled(field.fieldName)"
            class="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            {{ field.disabled ? '启用' : '禁用' }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
