<template>
  <div class="form-section">
    <h3 class="form-subtitle">基本表单示例</h3>
    <div class="form-controls">
      <div class="control-group">
        <label class="control-label">折叠状态:</label>
        <div class="control-value">{{ state?.collapsed ?? false }}</div>
      </div>
      <div class="control-group">
        <label class="control-label">表单API状态:</label>
        <div class="control-value">{{ basicFormApi.isMounted ? '已挂载' : '未挂载' }}</div>
      </div>
    </div>
    <div class="basic-form">
      <component :is="BasicForm" />
    </div>
  </div>
  
  <div class="form-result">
    <div class="result-header">
      <h4>表单数据:</h4>
      <button class="btn btn-xs btn-ghost" @click="copyBasicFormData">复制数据</button>
    </div>
    <pre class="result-content">{{ JSON.stringify(basicFormValues, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from 'vee-validate'

import { ref } from 'vue'
import { useAdminForm, z } from '@admin-core/layouts'

// 基本表单示例
const [BasicForm, basicFormApi] = useAdminForm({
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'username',
      label: '用户名',
      componentProps: {
        placeholder: '请输入用户名',
      },
      rules: z.string().min(1, '用户名不能为空'),
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
    {
      component: 'AdminInputPassword',
      fieldName: 'password',
      label: '密码',
      componentProps: {
        placeholder: '请输入密码',
      },
      rules: z.string().min(6, '密码至少6位'),
    },
    {
      component: 'AdminSelect',
      fieldName: 'role',
      label: '角色',
      componentProps: {
        placeholder: '请选择角色',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
          { label: '访客', value: 'guest' },
        ],
      },
      rules: z.string().min(1, '请选择角色'),
    },
    {
      component: 'AdminCheckbox',
      fieldName: 'agree',
      label: '同意用户协议',
      componentProps: {},
      rules: z.boolean(),
    },
  ],
  showDefaultActions: true,  // 显示默认操作按钮
  collapsedRows: 3,           // 折叠时显示3行
  showCollapseButton: true,   // 显示折叠按钮
  handleSubmit: async (values: GenericObject) => {
    console.log('提交基本表单:', values)
    alert('基本表单提交成功！')
    
    // 获取表单值
    const formValues = await basicFormApi.getValues()
    console.log('表单值:', formValues)
  },
  handleReset: async (values: GenericObject) => {
    console.log('重置基本表单:', values)
    alert('基本表单已重置')
  },
  handleValuesChange: (values: GenericObject, fieldsChanged: string[]) => {
    console.log('基本表单值变化:', values, '字段变化:', fieldsChanged)
  },
})

// 获取基本表单状态
const state = basicFormApi.useStore?.()

// 获取表单值的响应式数据
const basicFormValues = ref({})
basicFormApi.getValues().then((values: GenericObject) => {
  basicFormValues.value = values
})

// 重置基本表单
const resetBasicForm = async () => {
  await basicFormApi.resetForm()
}

// 提交基本表单
const submitBasicForm = async () => {
  await basicFormApi.validateAndSubmitForm()
}

// 复制基本表单数据
const copyBasicFormData = () => {
  navigator.clipboard.writeText(JSON.stringify(basicFormValues.value, null, 2))
  alert('基本表单数据已复制到剪贴板')
}

defineExpose({
  resetBasicForm,
  submitBasicForm,
  basicFormApi,
  basicFormValues,
})
</script>