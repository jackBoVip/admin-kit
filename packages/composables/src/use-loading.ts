import { ref } from 'vue'

/**
 * 加载状态管理组合式函数
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
