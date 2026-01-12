import type { ZodRawShape } from 'zod';

import type { ComputedRef } from 'vue';

import type { ExtendedFormApi, FormActions, AdminFormProps } from './types';

import { computed, unref, useSlots } from 'vue';

import { normalizeSchema } from './utils';



import { createContext } from '@admin-core/ui';
import { isString, set } from '@admin-core/shared/utils';

import { useForm } from 'vee-validate';
import { ZodIntersection, ZodNumber, ZodObject, ZodString } from 'zod';

type ExtendFormProps = AdminFormProps & { formApi?: ExtendedFormApi };

/** 表单属性注入/提供上下文 */
export const [injectFormProps, provideFormProps] =
  createContext<[ComputedRef<ExtendFormProps> | ExtendFormProps, FormActions]>(
    'AdminFormProps',
  );

/** 组件引用映射注入/提供上下文 */
export const [injectComponentRefMap, provideComponentRefMap] =
  createContext<Map<string, unknown>>('ComponentRefMap');

/**
 * 使用表单初始化
 * @description 初始化表单实例和插槽
 * @param props - 表单属性（可以是响应式的）
 * @returns 返回委托的插槽和表单实例
 * @example
 * ```typescript
 * const { delegatedSlots, form } = useFormInitial(props)
 * 
 * // 使用表单实例
 * form.setFieldValue('username', 'admin')
 * 
 * // 使用委托的插槽
 * delegatedSlots.value.forEach(slot => {
 *   console.log(slot)
 * })
 * ```
 */
export function useFormInitial(
  props: ComputedRef<AdminFormProps> | AdminFormProps,
) {
  const slots = useSlots();
  const initialValues = generateInitialValues();
  
  const form = useForm({
    // 按照vben的方式：只有当initialValues不为空时才传递
    ...(Object.keys(initialValues)?.length ? { initialValues } : {}),
  });

  // 使用 computed 和 Object.keys().filter() 的组合
  const delegatedSlots = computed(() => 
    Object.keys(slots).filter((key) => key !== 'default')
  );

  /**
   * 生成初始值
   * @description 根据 schema 生成表单的初始值
   */
  function generateInitialValues() {
    const initialValues: Record<string, any> = {};
    const zodObject: ZodRawShape = {};
    
    const propsValue = unref(props);
    const schema = normalizeSchema(propsValue.schema);
    
    for (const item of schema) {
      if (Object.hasOwn(item, 'defaultValue')) {
        set(initialValues, item.fieldName, item.defaultValue);
      } else if (item.rules && !isString(item.rules)) {
        const customDefaultValue = getCustomDefaultValue(item.rules);
        zodObject[item.fieldName] = item.rules;
        initialValues[item.fieldName] = customDefaultValue;
      }
    }
    
    return initialValues;
  }
  
  /**
   * 获取自定义默认值
   * @description 根据 Zod 规则提取默认值
   * @param rule - Zod 验证规则
   */
  function getCustomDefaultValue(rule: any): any {
    // 对于 ZodOptional 和 ZodNullable，返回 undefined
    // 但我们仍然会将 undefined 添加到 initialValues 中
    // 这样 vee-validate 才能追踪这个字段
    if (rule._def?.typeName === 'ZodOptional' || rule._def?.typeName === 'ZodNullable') {
      return undefined;
    }
    
    if (rule instanceof ZodString) {
      return ''; // 默认为空字符串
    }
    
    if (rule instanceof ZodNumber) {
      return null; // 默认为 null（避免显示 0）
    }
    
    if (rule instanceof ZodObject) {
      // 递归提取嵌套对象的默认值
      return Object.fromEntries(
        Object.entries(rule.shape).map(([key, valueSchema]) => [
          key,
          getCustomDefaultValue(valueSchema),
        ])
      );
    }
    
    if (rule instanceof ZodIntersection) {
      // 对于交集类型，从 schema 提取默认值
      const leftDefaultValue = getCustomDefaultValue(rule._def.left);
      const rightDefaultValue = getCustomDefaultValue(rule._def.right);

      // 如果左右两边都能提取默认值，合并它们
      if (
        typeof leftDefaultValue === 'object' &&
        typeof rightDefaultValue === 'object'
      ) {
        return { ...leftDefaultValue, ...rightDefaultValue };
      }

      // 否则优先使用左边的默认值
      return leftDefaultValue ?? rightDefaultValue;
    }
    
    return undefined; // 其他类型不提供默认值
  }

  return {
    delegatedSlots,
    form,
  };
}
