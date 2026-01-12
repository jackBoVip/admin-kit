<script setup lang="ts">
/**
 * Admin 表单组件
 * 
 * @description
 * 基础的表单组件，提供表单渲染、操作按钮、折叠展开等功能。
 * 适用于不需要 formApi 的简单表单场景。
 * 
 * @example
 * ```vue
 * <AdminForm
 *   :schema="formSchema"
 *   :show-default-actions="true"
 *   @submit="handleSubmit"
 * />
 * ```
 */
import type { AdminFormProps } from './types';

import { ref, watchEffect } from 'vue';

import { useForwardPropsEmits } from '@admin-core/composables';

import FormActions from './components/form-actions.vue';
import {
  COMPONENT_BIND_EVENT_MAP,
  COMPONENT_MAP,
  DEFAULT_FORM_COMMON_CONFIG,
} from './config';
import { Form } from './form-render';
import { provideFormProps, useFormInitial } from './use-form-context';

// 通过 extends 会导致热更新卡死
interface Props extends AdminFormProps {}
const props = withDefaults(defineProps<Props>(), {
  actionWrapperClass: '',
  collapsed: false,
  collapsedRows: 1,
  commonConfig: () => ({}),
  layout: 'horizontal',
  resetButtonOptions: () => ({}),
  showCollapseButton: false,
  showDefaultActions: true,
  submitButtonOptions: () => ({}),
  wrapperClass: 'grid-cols-1',
});

/** 转发 props 和 emits */
const forward = useForwardPropsEmits(props);

/** 当前折叠状态 */
const currentCollapsed = ref(false);

/** 初始化表单和插槽 */
const { delegatedSlots, form } = useFormInitial(props as any);

/** 提供表单属性给子组件 */
provideFormProps([props as any, form]);

/**
 * 处理折叠状态更新
 * 
 * @param value - 新的折叠状态
 */
const handleUpdateCollapsed = (value: boolean) => {
  currentCollapsed.value = value;
  // 触发收起展开状态变化回调
  props.handleCollapsedChange?.(value);
};

/** 监听 props.collapsed 变化，同步到本地状态 */
watchEffect(() => {
  currentCollapsed.value = props.collapsed;
});
</script>

<template>
  <Form
    v-bind="forward as any"
    :collapsed="currentCollapsed"
    :component-bind-event-map="COMPONENT_BIND_EVENT_MAP"
    :component-map="COMPONENT_MAP"
    :form="form"
    :global-common-config="DEFAULT_FORM_COMMON_CONFIG"
  >
    <template
      v-for="slotName in delegatedSlots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
    <template #default="slotProps">
      <slot v-bind="slotProps">
        <FormActions
          v-if="showDefaultActions"
          :model-value="currentCollapsed"
          @update:model-value="handleUpdateCollapsed"
        />
      </slot>
    </template>
  </Form>
</template>
