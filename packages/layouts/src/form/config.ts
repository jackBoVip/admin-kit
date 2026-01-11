import type { Component } from 'vue';

import type {
  BaseFormComponentType,
  FormCommonConfig,
  AdminFormAdapterOptions,
} from './types';

import { h } from 'vue';

import {
  AdminButton,
  AdminCheckbox,
  Input as AdminInput,
  AdminInputPassword,
  AdminPinInput,
  AdminSelect,
} from '@admin-core/ui';
import { globalShareState } from '@admin-core/shared/utils';

import { defineRule } from 'vee-validate';

/** 默认的 model 属性名 */
const DEFAULT_MODEL_PROP_NAME = 'modelValue';

/** 默认的表单通用配置 */
export const DEFAULT_FORM_COMMON_CONFIG: FormCommonConfig = {};

/** 组件映射表 */
export const COMPONENT_MAP: Record<BaseFormComponentType, Component> = {
  DefaultButton: h(AdminButton, { size: 'sm', variant: 'outline' }),
  PrimaryButton: h(AdminButton, { size: 'sm', variant: 'default' }),
  AdminCheckbox,
  AdminInput,
  AdminInputPassword,
  AdminPinInput,
  AdminSelect,
};

/** 组件绑定事件映射表 */
export const COMPONENT_BIND_EVENT_MAP: Partial<
  Record<BaseFormComponentType, string>
> = {
  AdminCheckbox: 'checked',
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

  if (defineRules) {
    for (const key of Object.keys(defineRules)) {
      defineRule(key, defineRules[key as never]);
    }
  }

  const baseModelPropName =
    config?.baseModelPropName ?? DEFAULT_MODEL_PROP_NAME;
  const modelPropNameMap = config?.modelPropNameMap as
    | Record<BaseFormComponentType, string>
    | undefined;

  const components = globalShareState.getComponents();

  for (const component of Object.keys(components)) {
    const key = component as BaseFormComponentType;
    COMPONENT_MAP[key] = components[component as never];

    if (baseModelPropName !== DEFAULT_MODEL_PROP_NAME) {
      COMPONENT_BIND_EVENT_MAP[key] = baseModelPropName;
    }

    // 覆盖特殊组件的modelPropName
    if (modelPropNameMap && modelPropNameMap[key]) {
      COMPONENT_BIND_EVENT_MAP[key] = modelPropNameMap[key];
    }
  }
}
