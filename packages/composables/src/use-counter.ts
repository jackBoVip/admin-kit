import { ref, computed } from 'vue'

/**
 * 计数器选项接口
 */
export interface UseCounterOptions {
  /** 最小值，默认为 -Infinity */
  min?: number
  /** 最大值，默认为 Infinity */
  max?: number
  /** 步长，默认为 1 */
  step?: number
}

/**
 * 计数器组合式函数
 * 
 * @description
 * 提供计数器功能，支持最小值、最大值和步长限制，使用 ES2025 最新特性
 * 
 * @param initialValue - 初始值，默认为 0
 * @param options - 配置选项
 * 
 * @returns 包含计数值和操作方法的对象
 * 
 * @example
 * ```ts
 * import { useCounter } from '@admin-core/composables'
 * 
 * const { count, inc, dec, set, reset, isMin, isMax } = useCounter(0, {
 *   min: 0,
 *   max: 10,
 *   step: 1
 * })
 * 
 * inc()      // count.value = 1
 * inc(5)     // count.value = 6
 * dec()      // count.value = 5
 * set(8)     // count.value = 8
 * reset()    // count.value = 0
 * 
 * console.log(isMin.value) // false
 * console.log(isMax.value) // false
 * ```
 */
export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity, step = 1 } = options

  const count = ref(initialValue)

  const inc = (delta = step) => {
    count.value = Math.min(max, count.value + delta)
  }

  const dec = (delta = step) => {
    count.value = Math.max(min, count.value - delta)
  }

  const set = (value: number) => {
    count.value = Math.max(min, Math.min(max, value))
  }

  const reset = () => {
    count.value = initialValue
  }

  const isMin = computed(() => count.value <= min)
  const isMax = computed(() => count.value >= max)

  return {
    count,
    inc,
    dec,
    set,
    reset,
    isMin,
    isMax,
  }
}
