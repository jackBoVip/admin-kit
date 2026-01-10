import { ref, watch } from 'vue'

/**
 * LocalStorage 持久化组合式函数
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)

  // 从 localStorage 读取初始值
  const read = () => {
    try {
      const item = localStorage.getItem(key)
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
      localStorage.setItem(key, JSON.stringify(data.value))
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error)
    }
  }

  // 删除 localStorage
  const remove = () => {
    try {
      localStorage.removeItem(key)
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
