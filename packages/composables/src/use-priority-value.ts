import type { ComputedRef, Ref } from 'vue';

import { computed, getCurrentInstance, unref, useAttrs, useSlots } from 'vue';

import {
  getFirstNonNullOrUndefined,
  kebabToCamelCase,
} from '@admin-core/shared/utils';

/**
 * 优先级值获取组合式函数
 * 
 * @description
 * 依次从插槽、attrs、props、state 中获取值，实现灵活的属性优先级控制
 * 
 * @param key - 要获取的属性键名
 * @param props - 组件 props 对象
 * @param state - 状态对象（可选）
 * 
 * @returns 计算属性，按优先级返回第一个非空值
 * 
 * @example
 * ```ts
 * import { usePriorityValue } from '@admin-core/composables'
 * 
 * const title = usePriorityValue('title', props, state)
 * // 优先级：slot > attrs > props > state
 * ```
 */
export function usePriorityValue<
  T extends Record<string, any>,
  S extends Record<string, any>,
  K extends keyof T = keyof T,
>(key: K, props: T, state: Readonly<Ref<NoInfer<S>>> | undefined) {
  const instance = getCurrentInstance();
  const slots = useSlots();
  const attrs = useAttrs() as T;

  const value = computed((): T[K] => {
    // props不管有没有传，都会有默认值，会影响这里的顺序，
    // 通过判断原始props是否有值来判断是否传入
    const rawProps = (instance?.vnode?.props || {}) as T;

    const standardRawProps = {} as T;

    for (const [key, value] of Object.entries(rawProps)) {
      standardRawProps[kebabToCamelCase(key) as K] = value;
    }
    const propsKey =
      standardRawProps?.[key] === undefined ? undefined : props[key];

    // slot可以关闭
    return getFirstNonNullOrUndefined(
      slots[key as string],
      attrs[key],
      propsKey,
      state?.value?.[key as keyof S],
    ) as T[K];
  });

  return value;
}

/**
 * 批量获取优先级值组合式函数
 * 
 * @description
 * 批量获取 state 中的值，每个值都是独立的 ref
 * 
 * @param props - 组件 props 对象
 * @param state - 状态对象（可选）
 * 
 * @returns 包含所有属性计算值的对象
 * 
 * @example
 * ```ts
 * import { usePriorityValues } from '@admin-core/composables'
 * 
 * const values = usePriorityValues(props, state)
 * // values.title, values.description 等都是独立的 computed ref
 * ```
 */
export function usePriorityValues<
  T extends Record<string, any>,
  S extends Ref<Record<string, any>> = Readonly<Ref<NoInfer<T>, NoInfer<T>>>,
>(props: T, state: S | undefined) {
  const result: { [K in keyof T]: ComputedRef<T[K]> } = {} as never;

  for (const key of Object.keys(props) as (keyof T)[]) {
    result[key] = usePriorityValue(key as keyof typeof props, props, state)
  }

  return result;
}

/**
 * 转发优先级值组合式函数
 * 
 * @description
 * 批量获取 state 中的值，集中在一个 computed 中，适用于透传场景
 * 
 * @param props - 组件 props 对象
 * @param state - 状态对象（可选）
 * 
 * @returns 单个计算属性，包含所有解包后的值
 * 
 * @example
 * ```ts
 * import { useForwardPriorityValues } from '@admin-core/composables'
 * 
 * const forwardProps = useForwardPriorityValues(props, state)
 * // forwardProps 是一个 computed，包含所有解包后的值，适合 v-bind 透传
 * ```
 */
export function useForwardPriorityValues<
  T extends Record<string, any>,
  S extends Ref<Record<string, any>> = Readonly<Ref<NoInfer<T>, NoInfer<T>>>,
>(props: T, state: S | undefined) {
  const computedResult: { [K in keyof T]: ComputedRef<T[K]> } = {} as never;

  for (const key of Object.keys(props) as (keyof T)[]) {
    computedResult[key] = usePriorityValue(
      key as keyof typeof props,
      props,
      state,
    )
  }

  return computed(() => {
    const unwrapResult: Record<string, any> = {}
    for (const key of Object.keys(props)) {
      unwrapResult[key] = unref(computedResult[key])
    }
    return unwrapResult as { [K in keyof T]: T[K] }
  })
}
