<script setup lang="ts">
/**
 * Admin 表单组件（简化版）
 * 
 * @description
 * 用于 useAdminForm 的简化表单组件
 */
import type { ExtendedFormApi, AdminFormProps } from './types';

import { normalizeSchema } from './utils';

import FormActions from './components/form-actions.vue';
import {
  COMPONENT_BIND_EVENT_MAP,
  COMPONENT_MAP,
  DEFAULT_FORM_COMMON_CONFIG,
} from './config';
import { Form } from './form-render';
import {
  provideComponentRefMap,
  provideFormProps,
  useFormInitial,
} from './use-form-context';

interface Props extends AdminFormProps {
  formApi?: ExtendedFormApi;
}

const props = defineProps<Props>();

/** 从 formApi 获取响应式状态 */
const state = props.formApi?.useStore?.();

/** 组件引用映射表 */
const componentRefMap = new Map<string, unknown>();

/** 确保 schema 被正确解包 */
const normalizedProps = {
  ...props,
  schema: normalizeSchema(props.schema),
};

/** 初始化表单和插槽 */
// 注意：useFormInitial 内部调用 useForm()，它会自动 provide FormContextKey
// 所以不需要手动 provide，vee-validate 的 Field 组件会自动获取到表单上下文
const { delegatedSlots, form } = useFormInitial(normalizedProps as any);

/** 提供表单属性和组件引用映射给子组件 */
provideFormProps([normalizedProps as any, form]);
provideComponentRefMap(componentRefMap);

/** 挂载表单 API */
props.formApi?.mount?.(form, componentRefMap);

/** 处理折叠状态更新 */
const handleUpdateCollapsed = (value: boolean) => {
  props.formApi?.setState({ collapsed: value });
  props.handleCollapsedChange?.(value);
};
</script>

<template>
  <Form
    v-bind="normalizedProps as any"
    :collapsed="state?.collapsed"
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
          v-if="normalizedProps.showDefaultActions"
          :model-value="state?.collapsed ?? false"
          @update:model-value="handleUpdateCollapsed"
        />
      </slot>
    </template>
  </Form>
</template>