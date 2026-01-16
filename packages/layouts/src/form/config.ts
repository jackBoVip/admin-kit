import type { Component, VNode } from 'vue';

import type {
  BaseFormComponentType,
  FormCommonConfig,
  AdminFormAdapterOptions,
} from './types';

import { h, markRaw } from 'vue';

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

/**
 * 默认 v-model 字段名（大多数 Vue 组件为 `modelValue`）
 * 可通过 `setupAdminForm({ config: { baseModelPropName } })` 覆盖
 */
const DEFAULT_MODEL_PROP_NAME = 'modelValue';

export const DEFAULT_FORM_COMMON_CONFIG: FormCommonConfig = {};

/**
 * 表单组件映射
 *
 * @description
 * - key：schema 中的 `component`
 * - value：对应的渲染目标（组件或 VNode）
 *
 * 说明：部分默认按钮在这里以 `h(...)` 形式提供预设 VNode，保持现有功能不变。
 */
export const COMPONENT_MAP: Record<BaseFormComponentType, Component | VNode> = {
  // 这些 VNode/组件不会被响应式修改，标记为 raw 可减少不必要的 proxy 开销
  DefaultButton: markRaw(h(AdminButton, { size: 'sm', variant: 'outline' })),
  PrimaryButton: markRaw(h(AdminButton, { size: 'sm', variant: 'default' })),
  AdminCheckbox: markRaw(AdminCheckbox),
  AdminInput: markRaw(AdminInput),
  AdminInputPassword: markRaw(AdminInputPassword),
  AdminPinInput: markRaw(AdminPinInput),
  AdminSelect: markRaw(AdminSelect),
};

export const COMPONENT_BIND_EVENT_MAP: Partial<
  Record<BaseFormComponentType, string>
> = {
  AdminCheckbox: 'checked',
};

/**
 * 表单适配器初始化（建议应用启动时调用一次）
 *
 * @description
 * 用于：
 * - 注册/覆盖表单组件映射（自定义组件）
 * - 设置不同组件的 v-model 字段名映射
 * - 注册 vee-validate 的自定义规则
 *
 * @param options 适配器配置
 */
export function setupAdminForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: AdminFormAdapterOptions<T>) {
  const { config, defineRules } = options;

  const {
    disabledOnChangeListener = true,
    disabledOnInputListener = true,
    emptyStateValue = undefined,
    valuesChangePayload = 'deep',
  } = (config || {}) as FormCommonConfig;

  Object.assign(DEFAULT_FORM_COMMON_CONFIG, {
    disabledOnChangeListener,
    disabledOnInputListener,
    emptyStateValue,
    valuesChangePayload,
  } satisfies FormCommonConfig);

  if (defineRules) {
    for (const key of Object.keys(defineRules)) {
      defineRule(key, defineRules[key as never]);
    }
  }

  const baseModelPropName =
    config?.baseModelPropName ?? DEFAULT_MODEL_PROP_NAME;
  const modelPropNameMap = config?.modelPropNameMap as
    | Partial<Record<BaseFormComponentType, string>>
    | undefined;

  const components = globalShareState.getComponents();

  for (const component of Object.keys(components)) {
    const key = component as BaseFormComponentType;
    COMPONENT_MAP[key] = markRaw(components[component as never]);

    if (baseModelPropName !== DEFAULT_MODEL_PROP_NAME) {
      COMPONENT_BIND_EVENT_MAP[key] = baseModelPropName;
    }

    // 覆盖特殊组件的modelPropName
    if (modelPropNameMap?.[key]) COMPONENT_BIND_EVENT_MAP[key] = modelPropNameMap[key]!;
  }
}
