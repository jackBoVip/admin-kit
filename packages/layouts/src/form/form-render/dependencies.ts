import type {
  FormItemDependencies,
  FormSchemaRuleType,
  MaybeComponentProps,
} from '../types';

import { computed, ref, watch } from 'vue';

import { isBoolean, isFunction } from '@admin-core/shared/utils';

import { useFormValues } from 'vee-validate';

import { injectRenderFormProps } from './context';

export default function useDependencies(
  getDependencies: () => FormItemDependencies | undefined,
) {
  const values = useFormValues();

  const formRenderProps = injectRenderFormProps();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const formApi = formRenderProps.form!;

  if (!values) {
    throw new Error('useDependencies should be used within <AdminForm>');
  }

  const isIf = ref(true);
  const isDisabled = ref(false);
  const isShow = ref(true);
  const isRequired = ref(false);
  const dynamicComponentProps = ref<MaybeComponentProps>({});
  const dynamicRules = ref<FormSchemaRuleType>();

  const triggerFieldValues = computed(() => {
    // 该字段可能会被多个字段触发
    const triggerFields = getDependencies()?.triggerFields ?? [];
    return triggerFields.map((dep) => {
      return values.value[dep];
    });
  });

  const resetConditionState = () => {
    isDisabled.value = false;
    isIf.value = true;
    isShow.value = true;
    isRequired.value = false;
    dynamicRules.value = undefined;
    dynamicComponentProps.value = {};
  };

  // 性能/正确性优化：快速输入时，异步依赖计算可能乱序回写；用递增 token 防止旧结果覆盖新结果
  let runToken = 0;

  watch(
    [triggerFieldValues, getDependencies],
    async ([_values, dependencies]) => {
      const currentToken = ++runToken;
      if (!dependencies || !dependencies?.triggerFields?.length) {
        return;
      }
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

      // 1. 优先判断if，如果if为false，则不渲染dom，后续判断也不再执行
      const formValues = values.value;

      if (isFunction(whenIf)) {
        isIf.value = !!(await whenIf(formValues, formApi));
        if (currentToken !== runToken) return;
        // 不渲染
        if (!isIf.value) return;
      } else if (isBoolean(whenIf)) {
        isIf.value = whenIf;
        if (!isIf.value) return;
      }

      // 2. 判断show，如果show为false，则隐藏
      if (isFunction(show)) {
        isShow.value = !!(await show(formValues, formApi));
        if (currentToken !== runToken) return;
        if (!isShow.value) return;
      } else if (isBoolean(show)) {
        isShow.value = show;
        if (!isShow.value) return;
      }

      if (isFunction(componentProps)) {
        dynamicComponentProps.value = await componentProps(formValues, formApi);
        if (currentToken !== runToken) return;
      }

      if (isFunction(rules)) {
        dynamicRules.value = await rules(formValues, formApi);
        if (currentToken !== runToken) return;
      }

      if (isFunction(disabled)) {
        isDisabled.value = !!(await disabled(formValues, formApi));
        if (currentToken !== runToken) return;
      } else if (isBoolean(disabled)) {
        isDisabled.value = disabled;
      }

      if (isFunction(required)) {
        isRequired.value = !!(await required(formValues, formApi));
        if (currentToken !== runToken) return;
      }

      if (isFunction(trigger)) {
        await trigger(formValues, formApi);
        if (currentToken !== runToken) return;
      }
    },
    // 性能优化：triggerFieldValues 本身已是依赖字段的值列表，无需 deep 递归追踪
    { immediate: true },
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
