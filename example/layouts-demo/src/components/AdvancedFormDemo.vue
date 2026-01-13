<template>
  <div class="form-section">
    <h3 class="form-subtitle">高级表单特性</h3>
    <div class="form-controls">
      <div class="control-group">
        <label class="control-label">表单API状态:</label>
        <div class="control-value">{{ advancedFormApi.isMounted ? '已挂载' : '未挂载' }}</div>
      </div>
    </div>
    <component :is="AdvancedForm" />
    
    <div class="form-result">
      <div class="result-header">
        <h4>高级表单数据:</h4>
        <button class="btn btn-xs btn-ghost" @click="copyAdvancedFormData">复制数据</button>
      </div>
      <pre class="result-content">{{ JSON.stringify(advancedFormValues, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from 'vee-validate'

import { ref } from 'vue'
import { useAdminForm, z } from '@admin-core/layouts'

// 高级表单示例
const [AdvancedForm, advancedFormApi] = useAdminForm({
  schema: [
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
      fieldName: 'age',
      label: '年龄',
      componentProps: {
        placeholder: '请输入年龄',
        type: 'number',
      },
      rules: z.number().min(1, '年龄必须大于0'),
    },
    {
      component: 'AdminInput',
      fieldName: 'bio',
      label: '简介',
      componentProps: {
        placeholder: '请输入个人简介',
        as: 'textarea',
        rows: 4,
      },
    },
    {
      component: 'AdminSelect',
      fieldName: 'city',
      label: '所在城市',
      componentProps: {
        placeholder: '请选择城市',
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
        ],
      },
    },
  ],
  showDefaultActions: true,  // 显示默认操作按钮
  collapsedRows: 2,            // 折叠时显示2行
  showCollapseButton: true,    // 显示折叠按钮
  handleSubmit: async (values: GenericObject) => {
    console.log('提交高级表单:', values)
    alert('高级表单提交成功！')
    
    // 获取表单值
    const formValues = await advancedFormApi.getValues()
    console.log('高级表单值:', formValues)
  },
  handleReset: async (values: GenericObject) => {
    console.log('重置高级表单:', values)
    alert('高级表单已重置')
  },
  handleValuesChange: (values: GenericObject, fieldsChanged: string[]) => {
    console.log('表单值变化:', values, '字段变化:', fieldsChanged)
  },
})

// 获取表单值的响应式数据
const advancedFormValues = ref({})
advancedFormApi.getValues().then((values: GenericObject) => {
  advancedFormValues.value = values
})

// 重置高级表单
const resetAdvancedForm = async () => {
  await advancedFormApi.resetForm()
}

// 提交高级表单
const submitAdvancedForm = async () => {
  await advancedFormApi.validateAndSubmitForm()
}

// 复制高级表单数据
const copyAdvancedFormData = () => {
  navigator.clipboard.writeText(JSON.stringify(advancedFormValues.value, null, 2))
  alert('高级表单数据已复制到剪贴板')
}

defineExpose({
  resetAdvancedForm,
  submitAdvancedForm,
  advancedFormApi,
  advancedFormValues,
})
</script>