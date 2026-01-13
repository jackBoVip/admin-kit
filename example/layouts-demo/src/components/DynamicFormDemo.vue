<template>
  <div class="form-section">
    <h3 class="form-subtitle">动态表单示例</h3>
    <div class="form-controls">
      <div class="control-group">
        <label class="control-label">字段数量:</label>
        <div class="control-value">{{ dynamicFormSchema.length }}</div>
      </div>
      <div class="control-group">
        <label class="control-label">表单API状态:</label>
        <div class="control-value">{{ dynamicFormApi.isMounted ? '已挂载' : '未挂载' }}</div>
      </div>
    </div>
    <div class="dynamic-form-controls">
      <button @click="addFormField" class="btn btn-secondary">
        <span class="btn-icon">➕</span> 添加字段
      </button>
      <button @click="removeLastField" class="btn btn-outline">
        <span class="btn-icon">➖</span> 移除字段
      </button>
      <button @click="toggleSchemaVisibility" class="btn btn-ghost">
        <span class="btn-icon">👁️</span> {{ showSchema ? '隐藏' : '显示' }} Schema
      </button>
    </div>
    
    <div v-if="showSchema" class="schema-preview">
      <h4>Schema 预览:</h4>
      <pre>{{ JSON.stringify(dynamicFormSchema, null, 2) }}</pre>
    </div>
    
    <component :is="DynamicForm" />
    
    <div class="form-result">
      <div class="result-header">
        <h4>动态表单数据:</h4>
        <button class="btn btn-xs btn-ghost" @click="copyDynamicFormData">复制数据</button>
      </div>
      <pre class="result-content">{{ JSON.stringify(dynamicFormValues, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from 'vee-validate'

import { ref } from 'vue'
import { useAdminForm, z } from '@admin-core/layouts'

// 响应式数据
const showSchema = ref(false)

// 动态表单示例
const dynamicFormSchema = ref([
  {
    component: 'AdminInput',
    fieldName: 'name',
    label: '姓名',
    componentProps: {
      placeholder: '请输入姓名',
    },
    rules: z.string().min(1, '姓名不能为空'),
  },
  {
    component: 'AdminInput',
    fieldName: 'email',
    label: '邮箱',
    componentProps: {
      placeholder: '请输入邮箱',
      type: 'email',
    },
    rules: z.string().email('请输入有效的邮箱地址'),
  },
])

const [DynamicForm, dynamicFormApi] = useAdminForm({
  schema: dynamicFormSchema.value,
  showDefaultActions: true,  // 显示默认操作按钮
  handleSubmit: async (values: GenericObject) => {
    console.log('提交动态表单:', values)
    alert('动态表单提交成功！')
    
    // 获取表单值
    const formValues = await dynamicFormApi.getValues()
    console.log('动态表单值:', formValues)
  },
  handleValuesChange: (values: GenericObject, fieldsChanged: string[]) => {
    console.log('动态表单值变化:', values, '字段变化:', fieldsChanged)
  },
})

// 获取表单值的响应式数据
const dynamicFormValues = ref({})
dynamicFormApi.getValues().then((values: GenericObject) => {
  dynamicFormValues.value = values
})

// 动态表单操作
const addFormField = () => {
  const newFieldName = `field_${Date.now()}`
  
  // 添加新字段到 schema
  dynamicFormSchema.value = [
    ...dynamicFormSchema.value,
    {
      component: 'AdminInput',
      fieldName: newFieldName,
      label: `字段 ${dynamicFormSchema.value.length + 1}`,
      componentProps: {
        placeholder: `请输入${newFieldName}`,
      },
      rules: z.string(),
    }
  ];
  
  // 更新表单
  dynamicFormApi.setState({ schema: dynamicFormSchema.value })
}

const removeLastField = () => {
  if (dynamicFormSchema.value.length > 0) {
    dynamicFormSchema.value.pop()
    dynamicFormApi.setState({ schema: dynamicFormSchema.value })
  }
}

// 切换Schema可见性
const toggleSchemaVisibility = () => {
  showSchema.value = !showSchema.value
}

// 复制动态表单数据
const copyDynamicFormData = () => {
  navigator.clipboard.writeText(JSON.stringify(dynamicFormValues.value, null, 2))
  alert('动态表单数据已复制到剪贴板')
}

// 重置动态表单
const resetDynamicForm = async () => {
  await dynamicFormApi.resetForm()
}

// 提交动态表单
const submitDynamicForm = async () => {
  await dynamicFormApi.validateAndSubmitForm()
}

defineExpose({
  resetDynamicForm,
  submitDynamicForm,
  dynamicFormApi,
  dynamicFormValues,
  addFormField,
  removeLastField,
  toggleSchemaVisibility,
  showSchema,
})
</script>