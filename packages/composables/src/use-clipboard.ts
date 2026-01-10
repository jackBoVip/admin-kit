import { ref } from 'vue'
import { useClipboard as useVueUseClipboard } from '@vueuse/core'

/**
 * 剪贴板操作组合式函数
 */
export function useClipboard() {
  const { copy: vueCopy, copied, isSupported } = useVueUseClipboard()
  const error = ref<Error | null>(null)

  const copy = async (text: string) => {
    try {
      error.value = null
      await vueCopy(text)
      return true
    } catch (e) {
      error.value = e as Error
      return false
    }
  }

  return {
    copy,
    copied,
    isSupported,
    error,
  }
}
