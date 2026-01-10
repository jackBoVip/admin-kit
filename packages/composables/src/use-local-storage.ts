import { ref, watch } from 'vue'

/**
 * LocalStorage 持久化组合式函数
 * 
 * @description
 * 提供 LocalStorage 的响应式封装，自动同步数据到本地存储，使用 ES2025 最新特性
 * 
 * @param key - LocalStorage 的键名
 * @param defaultValue - 默认值
 * 
 * @returns 包含响应式数据和删除方法的对象
 * 
 * @example
 * ```ts
 * import { useLocalStorage } from '@admin-core/composables'
 * 
 * // 基本用法
 * const { data, remove } = useLocalStorage('user', { name: 'Admin' })
 * 
 * // 修改数据会自动保存到 LocalStorage
 * data.value = { name: 'John' }
 * 
 * // 删除数据
 * remove()
 * 
 * // 支持复杂对象
 * const { data: settings } = useLocalStorage('settings', {
 *   theme: 'light',
 *   language: 'zh-CN'
 * })
 * ```
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)

  // 从 localStorage 读取初始值
  const read = () => {
    try {
      const item = globalThis.localStorage.getItem(key)
      if (item !== null) {
        data.value = JSON.parse(item)
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }

  // 写入 localStorage
  const write = () => {
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(data.value))
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error)
    }
  }

  // 删除 localStorage
  const remove = () => {
    try {
      globalThis.localStorage.removeItem(key)
      data.value = defaultValue
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  // 初始化时读取
  read()

  // 监听变化并自动保存
  watch(
    data,
    () => {
      write()
    },
    { deep: true }
  )

  return {
    data,
    remove,
  }
}
