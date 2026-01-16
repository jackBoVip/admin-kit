import type {
  BaseFormComponentType,
  ExtendedFormApi,
  AdminFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@admin-core/shared/utils';

import { FormApi } from './form-api';
import AdminUseForm from './admin-use-form.vue';

/**
 * 创建表单实例（组件 + API）
 *
 * @description
 * 返回一个二元组：
 * - `Form`：一个可渲染的 Vue 组件（内部包装 `AdminUseForm`），适用于模板/JSX 渲染
 * - `formApi`：编程式 API（包含 `useStore` 扩展），用于 setState/getValues/submit 等控制
 *
 * @example
 * ```ts
 * const [Form, formApi] = useAdminForm({
 *   schema: [{ fieldName: 'name', component: 'AdminInput' }],
 * })
 * ```
 *
 * @param options 表单配置（可为 reactive，以便动态更新 schema 等）
 */
export function useAdminForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: AdminFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  // 以运行时形态为准进行扩展，不改变 api 行为，仅补充类型与方法
  const extendedApi = api as unknown as ExtendedFormApi;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: AdminFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(AdminUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'AdminUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
