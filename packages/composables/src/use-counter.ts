import { ref, computed } from 'vue'

export interface UseCounterOptions {
  min?: number
  max?: number
  step?: number
}

/**
 * 计数器组合式函数
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
