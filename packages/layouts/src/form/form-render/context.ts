import type { FormRenderProps } from '../types';

import { computed } from 'vue';

import { createContext } from '@admin-core/ui';

/** 表单渲染属性注入/提供上下文 */
export const [injectRenderFormProps, provideFormRenderProps] =
  createContext<FormRenderProps>('FormRenderProps');

/**
 * 使用表单上下文
 * @description 获取表单渲染相关的上下文信息
 * @returns 返回组件映射、事件绑定映射和布局信息
 * @example
 * ```typescript
 * const { componentMap, componentBindEventMap, isVertical } = useFormContext()
 * 
 * // 检查是否垂直布局
 * if (isVertical.value) {
 *   // 垂直布局逻辑
 * }
 * ```
 */
export const useFormContext = () => {
  const formRenderProps = injectRenderFormProps();

  // 使用箭头函数简化 computed
  const isVertical = computed(() => formRenderProps.layout === 'vertical');
  const componentMap = computed(() => formRenderProps.componentMap);
  const componentBindEventMap = computed(() => formRenderProps.componentBindEventMap);
  
  return {
    componentBindEventMap,
    componentMap,
    isVertical,
  } as const; // 使用 as const 提供更精确的类型
};
