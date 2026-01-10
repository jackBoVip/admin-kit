import { ref } from 'vue'

/**
 * 加载状态管理组合式函数
 * 
 * @description
 * 提供加载状态的便捷管理，支持异步函数自动管理加载状态
 * 
 * @param initialValue - 初始加载状态，默认为 false
 * 
 * @returns 包含加载状态和操作方法的对象
 * 
 * @example
 * ```ts
 * import { useLoading } from '@admin-core/composables'
 * 
 * const { loading, setLoading, startLoading, stopLoading, withLoading } = useLoading()
 * 
 * // 手动控制
 * startLoading()
 * // ... 执行操作
 * stopLoading()
 * 
 * // 自动管理加载状态
 * const data = await withLoading(async () => {
 *   const response = await fetch('/api/data')
 *   return response.json()
 * })
 * // loading 会自动在函数执行前设为 true，执行后设为 false
 * ```
 */
export function useLoading(initialValue = false) {
  const loading = ref(initialValue)

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const startLoading = () => {
    loading.value = true
  }

  const stopLoading = () => {
    loading.value = false
  }

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      startLoading()
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return {
    loading,
    setLoading,
    startLoading,
    stopLoading,
    withLoading,
  }
}
