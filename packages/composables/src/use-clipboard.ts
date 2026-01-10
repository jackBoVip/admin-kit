import { ref } from 'vue'
import { useClipboard as useVueUseClipboard } from '@vueuse/core'

/**
 * 剪贴板操作组合式函数
 * 
 * @description
 * 提供剪贴板复制功能，支持错误处理，使用 ES2025 最新特性
 * 
 * @returns 包含复制方法和状态的对象
 * 
 * @example
 * ```ts
 * import { useClipboard } from '@admin-core/composables'
 * 
 * const { copy, copied, isSupported, error } = useClipboard()
 * 
 * // 复制文本
 * const success = await copy('Hello World')
 * 
 * // 检查是否复制成功
 * if (copied.value) {
 *   console.log('复制成功')
 * }
 * 
 * // 检查浏览器是否支持
 * if (!isSupported.value) {
 *   console.log('浏览器不支持剪贴板 API')
 * }
 * ```
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
