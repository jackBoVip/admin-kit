import type { Component } from 'vue';

import type {
  BaseFormComponentType,
  FormCommonConfig,
  AdminFormAdapterOptions,
} from './types';

import {
  AdminButton,
  AdminCheckbox,
  AdminInputPassword,
  AdminPinInput,
  AdminSelect,
  Input,
} from '@admin-core/ui';
import { globalShareState } from '@admin-core/shared/utils';

import { defineRule } from 'vee-validate';

// 定义常量
const MODEL_VALUE_PROP = 'modelValue';
const CHECKED_PROP = 'checked';

/** 默认的 model 属性名 */
const DEFAULT_MODEL_PROP_NAME = MODEL_VALUE_PROP;

/** 默认的表单通用配置 */
export const DEFAULT_FORM_COMMON_CONFIG: FormCommonConfig = {};

/** 组件映射表 */
export const COMPONENT_MAP: Record<BaseFormComponentType, Component> = {
  DefaultButton: AdminButton,
  PrimaryButton: AdminButton,
  AdminCheckbox,
  AdminInput: Input,
  AdminInputPassword,
  AdminPinInput,
  AdminSelect,
};

/** 组件默认属性映射表 */
export const COMPONENT_DEFAULT_PROPS: Partial<Record<BaseFormComponentType, Record<string, any>>> = {
  DefaultButton: { size: 'sm', variant: 'outline' },
  PrimaryButton: { size: 'sm', variant: 'default' },
};

/** 组件绑定事件映射表 */
export const COMPONENT_BIND_EVENT_MAP: Partial<
  Record<BaseFormComponentType, string>
> = {
  AdminCheckbox: CHECKED_PROP,
};

/**
 * 设置 Admin 表单
 * @description 配置表单的全局选项，包括组件映射、验证规则等
 * @template T - 表单组件类型
 * @param options - 表单适配器选项
 * @example
 * ```typescript
 * setupAdminForm({
 *   config: {
 *     baseModelPropName: 'modelValue',
 *     disabledOnChangeListener: true,
 *   },
 *   defineRules: {
 *     required: (value) => !!value || '此字段为必填项',
 *   }
 * })
 * ```
 */
export function setupAdminForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: AdminFormAdapterOptions<T>) {
  const { config, defineRules } = options;

  const {
    disabledOnChangeListener = true,
    disabledOnInputListener = true,
    emptyStateValue = undefined,
  } = (config || {}) as FormCommonConfig;

  Object.assign(DEFAULT_FORM_COMMON_CONFIG, {
    disabledOnChangeListener,
    disabledOnInputListener,
    emptyStateValue,
  });

  // 使用 Object.entries() 和 for...of 替代 Object.keys()
  if (defineRules) {
    for (const [key, rule] of Object.entries(defineRules)) {
      defineRule(key, rule as never);
    }
  }

  const baseModelPropName =
    config?.baseModelPropName ?? DEFAULT_MODEL_PROP_NAME;
  const modelPropNameMap = config?.modelPropNameMap as
    | Record<BaseFormComponentType, string>
    | undefined;

  const components = globalShareState.getComponents();

  // 使用 Object.entries() 替代 Object.keys()
  for (const [component, componentValue] of Object.entries(components)) {
    const key = component as BaseFormComponentType;
    COMPONENT_MAP[key] = componentValue as Component;

    if (baseModelPropName !== DEFAULT_MODEL_PROP_NAME) {
      COMPONENT_BIND_EVENT_MAP[key] = baseModelPropName;
    }

    // 覆盖特殊组件的 modelPropName
    if (modelPropNameMap?.[key]) {
      COMPONENT_BIND_EVENT_MAP[key] = modelPropNameMap[key];
    }
  }
}
