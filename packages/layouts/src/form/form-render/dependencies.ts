import type {
  FormItemDependencies,
  FormSchemaRuleType,
  MaybeComponentProps,
} from '../types';

import { computed, ref, watch } from 'vue';

import { isBoolean, isFunction } from '@admin-core/shared/utils';

import { useFormValues } from 'vee-validate';

import { injectRenderFormProps } from './context';

/**
 * 表单字段依赖处理组合式函数
 * 
 * @description
 * 处理表单字段之间的依赖关系，支持条件显示/隐藏、动态禁用、
 * 动态必填、动态规则、动态属性等功能。当依赖的字段值变化时，
 * 自动更新当前字段的状态。
 * 
 * @param getDependencies - 获取依赖配置的函数
 * @returns 返回依赖相关的响应式状态
 * 
 * @example
 * ```ts
 * const {
 *   dynamicComponentProps,
 *   dynamicRules,
 *   isDisabled,
 *   isIf,
 *   isRequired,
 *   isShow,
 * } = useDependencies(() => dependencies);
 * ```
 */
export default function useDependencies(
  getDependencies: () => FormItemDependencies | undefined,
) {
  /** 获取表单所有值 */
  const values = useFormValues();

  /** 获取表单渲染属性 */
  const formRenderProps = injectRenderFormProps();

  /** 表单 API 实例 */
  const formApi = formRenderProps.form!;

  if (!values) {
    throw new Error('useDependencies should be used within <AdminForm>');
  }

  /** 是否渲染（v-if） */
  const isIf = ref(true);
  
  /** 是否禁用 */
  const isDisabled = ref(false);
  
  /** 是否显示（v-show） */
  const isShow = ref(true);
  
  /** 是否必填 */
  const isRequired = ref(false);
  
  /** 动态组件属性 */
  const dynamicComponentProps = ref<MaybeComponentProps>({});
  
  /** 动态验证规则 */
  const dynamicRules = ref<FormSchemaRuleType>();

  /**
   * 计算触发字段的值
   * 
   * @description
   * 获取所有依赖字段的当前值，用于监听变化
   */
  const triggerFieldValues = computed(() => {
    const triggerFields = getDependencies()?.triggerFields ?? [];
    return triggerFields.map((dep) => values.value[dep]);
  });

  /**
   * 重置所有条件状态
   * 
   * @description
   * 将所有依赖相关的状态重置为默认值
   */
  const resetConditionState = () => {
    isDisabled.value = false;
    isIf.value = true;
    isShow.value = true;
    isRequired.value = false;
    dynamicRules.value = undefined;
    dynamicComponentProps.value = {};
  };

  /**
   * 监听触发字段值变化
   * 
   * @description
   * 当依赖的字段值发生变化时，重新计算当前字段的状态。
   * 按照优先级顺序处理：if -> show -> componentProps -> rules -> disabled -> required -> trigger
   */
  watch(
    [triggerFieldValues, getDependencies],
    async ([_values, dependencies]) => {
      if (!dependencies?.triggerFields?.length) return;

      resetConditionState();
      const {
        componentProps,
        disabled,
        if: whenIf,
        required,
        rules,
        show,
        trigger,
      } = dependencies;

      const formValues = values.value;

      // 1. 优先判断 if，如果 if 为 false，则不渲染 DOM，后续判断也不再执行
      if (isFunction(whenIf)) {
        isIf.value = !!(await whenIf(formValues, formApi));
        if (!isIf.value) return;
      } else if (isBoolean(whenIf)) {
        isIf.value = whenIf;
        if (!isIf.value) return;
      }

      // 2. 判断 show，如果 show 为 false，则隐藏（但仍渲染 DOM）
      if (isFunction(show)) {
        isShow.value = !!(await show(formValues, formApi));
        if (!isShow.value) return;
      } else if (isBoolean(show)) {
        isShow.value = show;
        if (!isShow.value) return;
      }

      // 3. 处理动态组件属性
      if (isFunction(componentProps)) {
        dynamicComponentProps.value = await componentProps(formValues, formApi);
      }

      // 4. 处理动态验证规则
      if (isFunction(rules)) {
        dynamicRules.value = await rules(formValues, formApi);
      }

      // 5. 处理禁用状态
      if (isFunction(disabled)) {
        isDisabled.value = !!(await disabled(formValues, formApi));
      } else if (isBoolean(disabled)) {
        isDisabled.value = disabled;
      }

      // 6. 处理必填状态
      if (isFunction(required)) {
        isRequired.value = !!(await required(formValues, formApi));
      }

      // 7. 执行触发器回调
      if (isFunction(trigger)) {
        void trigger(formValues, formApi);
      }
    },
    { deep: true, immediate: true },
  );

  return {
    dynamicComponentProps,
    dynamicRules,
    isDisabled,
    isIf,
    isRequired,
    isShow,
  };
}
