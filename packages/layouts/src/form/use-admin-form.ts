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
 * 使用 Admin 表单
 * @description 创建一个响应式表单组件和 API 实例
 * @template T - 表单组件类型
 * @param options - 表单配置选项
 * @returns 返回表单组件和扩展的表单 API
 * @example
 * ```typescript
 * const [Form, formApi] = useAdminForm({
 *   schema: [
 *     {
 *       component: 'AdminInput',
 *       fieldName: 'username',
 *       label: '用户名',
 *     }
 *   ]
 * })
 * 
 * // 在模板中使用
 * <Form />
 * 
 * // 使用 API
 * formApi.setFieldValue('username', 'admin')
 * ```
 */
export function useAdminForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: AdminFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
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
  // 添加响应式支持
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        if (options.schema) {
          api.setState({ schema: options.schema });
        }
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
