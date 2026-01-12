import type {
  BaseFormComponentType,
  ExtendedFormApi,
  AdminFormProps,
  FormSchema,
} from './types';

import type { Component } from 'vue';

import { defineComponent, h, isReactive, watch } from 'vue';

import { normalizeSchema } from './utils';


import { useStore } from '@admin-core/shared/utils';

import { FormApi } from './form-api';
import AdminUseFormSimple from './admin-use-form-simple.vue';

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
>(options: AdminFormProps<T>): readonly [Component, ExtendedFormApi] {
  // 检查 schema 是否是 ref 并进行相应处理
  const normalizedOptions = { 
    ...options,
    schema: normalizeSchema(options.schema)
  };
  
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(normalizedOptions as AdminFormProps<T>);
  
  // 使用类型断言
  const extendedApi = api as ExtendedFormApi;
  extendedApi.useStore = (selector) => useStore(api.store, selector);

  // 创建一个包装组件，将 options 和 formApi 传递给 AdminUseFormSimple
  const Form = defineComponent({
    name: 'AdminFormWrapper',
    setup() {
      // 在 setup 函数中再次处理 ref，确保动态更新也能正常工作
      return () => h(AdminUseFormSimple as Component, {
        ...normalizedOptions,
        formApi: extendedApi,
      } as any);
    },
  });
  
  // 添加响应式支持
  if (IS_REACTIVE) {
    watch(
      () => normalizeSchema(options.schema),
      (newSchema) => {
        if (newSchema) {
          if (newSchema !== undefined) {
            api.setState({ schema: newSchema as FormSchema<BaseFormComponentType>[] });
          }
        }
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
