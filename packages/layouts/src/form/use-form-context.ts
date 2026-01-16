import type { ZodRawShape } from 'zod';

import type { ComputedRef } from 'vue';

import type { ExtendedFormApi, FormActions, AdminFormProps } from './types';

import { computed, unref, useSlots } from 'vue';

import { createContext } from '@admin-core/ui';
import { isString, mergeWithArrayOverride, set } from '@admin-core/shared/utils';

import { useForm } from 'vee-validate';
import { object, ZodIntersection, ZodNumber, ZodObject, ZodString } from 'zod';
import { getDefaultsForSchema } from 'zod-defaults';

type ExtendFormProps = AdminFormProps & { formApi?: ExtendedFormApi };

/**
 * 注入/提供：表单 props 与 vee-validate 的 form actions
 *
 * @description
 * - 第一个元素：当前表单 props（可能是 computed，也可能是普通对象）
 * - 第二个元素：`useForm()` 返回的 actions（用于校验、提交、取值等）
 */
export const [injectFormProps, provideFormProps] = createContext<
  [ComputedRef<ExtendFormProps> | ExtendFormProps, FormActions]
>('AdminFormProps');

/**
 * 注入/提供：字段组件实例映射
 *
 * @description
 * 用于 `FormApi.getFieldComponentRef()` 等场景拿到字段组件实例。
 */
export const [injectComponentRefMap, provideComponentRefMap] = createContext<
  Map<string, unknown>
>('ComponentRefMap');

export function useFormInitial(
  props: ComputedRef<AdminFormProps> | AdminFormProps,
) {
  const slots = useSlots();
  const initialValues = generateInitialValues();

  const form = useForm({
    ...(Object.keys(initialValues)?.length ? { initialValues } : {}),
  });

  const delegatedSlots = computed(() => {
    const resultSlots: string[] = [];

    for (const key of Object.keys(slots)) {
      if (key !== 'default') {
        resultSlots.push(key);
      }
    }
    return resultSlots;
  });

  /**
   * 根据 schema 与 zod 规则推导 initialValues
   *
   * 优先级：
   * 1. schema 上的 `defaultValue`
   * 2. 从 zod rule 中提取的默认值（含 zod-defaults）
   */
  function generateInitialValues() {
    const initialValues: Record<string, any> = {};

    const zodObject: ZodRawShape = {};
    (unref(props).schema || []).forEach((item) => {
      if (Reflect.has(item, 'defaultValue')) {
        set(initialValues, item.fieldName, item.defaultValue);
      } else if (item.rules && !isString(item.rules)) {
        // 检查规则是否适合提取默认值
        const customDefaultValue = getCustomDefaultValue(item.rules);
        zodObject[item.fieldName] = item.rules;
        if (customDefaultValue !== undefined) {
          initialValues[item.fieldName] = customDefaultValue;
        }
      }
    });

    const schemaInitialValues = getDefaultsForSchema(object(zodObject));

    const zodDefaults: Record<string, any> = {};
    for (const key in schemaInitialValues) {
      set(zodDefaults, key, schemaInitialValues[key]);
    }
    return mergeWithArrayOverride(initialValues, zodDefaults);
  }
  /**
   * 自定义默认值提取逻辑（保持与现有行为一致）
   */
  function getCustomDefaultValue(rule: unknown): unknown {
    if (rule instanceof ZodString) {
      return ''; // 默认为空字符串
    } else if (rule instanceof ZodNumber) {
      return null; // 默认为 null（避免显示 0）
    } else if (rule instanceof ZodObject) {
      // 递归提取嵌套对象的默认值
      const defaultValues: Record<string, any> = {};
      for (const [key, valueSchema] of Object.entries(rule.shape)) {
        defaultValues[key] = getCustomDefaultValue(valueSchema as unknown);
      }
      return defaultValues;
    } else if (rule instanceof ZodIntersection) {
      // 对于交集类型，从schema 提取默认值
      const leftDefaultValue = getCustomDefaultValue(rule._def.left as unknown);
      const rightDefaultValue = getCustomDefaultValue(rule._def.right as unknown);

      // 如果左右两边都能提取默认值，合并它们
      if (
        typeof leftDefaultValue === 'object' &&
        typeof rightDefaultValue === 'object'
      ) {
        return { ...leftDefaultValue, ...rightDefaultValue };
      }

      // 否则优先使用左边的默认值
      return leftDefaultValue ?? rightDefaultValue;
    } else {
      return undefined; // 其他类型不提供默认值
    }
  }

  return {
    delegatedSlots,
    form,
  };
}
