<script setup lang="ts">
/**
 * 字段依赖功能演示
 * 
 * @description
 * 测试字段之间的依赖关系：条件显示、动态禁用、动态必填等
 */
import { useAdminForm, z } from '@admin-core/layouts';

const [Form] = useAdminForm({
  schema: [
    {
      component: 'AdminSelect',
      fieldName: 'userType',
      label: '用户类型',
      defaultValue: 'personal',
      rules: z.string(),
      componentProps: {
        placeholder: '请选择用户类型',
        options: [
          { label: '个人用户', value: 'personal' },
          { label: '企业用户', value: 'company' },
        ],
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'companyName',
      label: '公司名称',
      rules: z.string().min(1, '请输入公司名称'),
      componentProps: {
        placeholder: '请输入公司名称',
      },
      dependencies: {
        triggerFields: ['userType'],
        show: (values) => values['userType'] === 'company',
        required: (values) => values['userType'] === 'company',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'taxNumber',
      label: '税号',
      rules: z.string().optional(),
      componentProps: {
        placeholder: '请输入税号',
      },
      dependencies: {
        triggerFields: ['userType'],
        if: (values) => values['userType'] === 'company',
      },
    },
    {
      component: 'AdminCheckbox',
      fieldName: 'hasAddress',
      label: '填写地址',
      defaultValue: false,
      componentProps: {
        label: '我要填写详细地址',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'address',
      label: '详细地址',
      rules: z.string().optional(),
      componentProps: {
        placeholder: '请输入详细地址',
      },
      dependencies: {
        triggerFields: ['hasAddress'],
        show: (values) => values['hasAddress'] === true,
      },
    },
    {
      component: 'AdminCheckbox',
      fieldName: 'agreeTerms',
      label: '同意条款',
      defaultValue: false,
      componentProps: {
        label: '我已阅读并同意服务条款',
      },
    },
    {
      component: 'AdminInput',
      fieldName: 'submitButton',
      label: '',
      componentProps: {
        placeholder: '提交按钮',
      },
      dependencies: {
        triggerFields: ['agreeTerms'],
        disabled: (values) => !values['agreeTerms'],
      },
    },
  ],
  handleSubmit: (values) => {
    console.log('依赖表单提交:', values);
    alert('提交成功！');
  },
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">字段依赖</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        测试字段之间的依赖关系和动态行为
      </p>
    </div>

    <Form />

    <div class="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
      <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">依赖功能说明</h3>
      <ul class="mt-2 space-y-1 text-xs text-yellow-700 dark:text-yellow-300">
        <li>• 选择"企业用户"时，显示公司名称和税号字段</li>
        <li>• 勾选"填写地址"时，显示详细地址输入框</li>
        <li>• 必须同意服务条款才能启用提交按钮</li>
        <li>• show: 控制字段显示/隐藏（保留DOM）</li>
        <li>• if: 控制字段渲染（移除DOM）</li>
        <li>• disabled: 控制字段禁用状态</li>
        <li>• required: 动态控制必填状态</li>
      </ul>
    </div>
  </div>
</template>
