import { ref } from 'vue'

/**
 * 布尔值状态管理组合式函数
 * 
 * @description
 * 提供布尔值状态的便捷管理方法，使用 ES2025 最新特性
 * 
 * @param initialValue - 初始值，默认为 false
 * 
 * @returns 包含状态值和操作方法的对象
 * 
 * @example
 * ```ts
 * import { useBoolean } from '@admin-core/composables'
 * 
 * const { value, setTrue, setFalse, toggle, setValue } = useBoolean(false)
 * 
 * setTrue()      // value.value = true
 * setFalse()     // value.value = false
 * toggle()       // 切换状态
 * setValue(true) // 设置为指定值
 * ```
 */
export function useBoolean(initialValue = false) {
  const value = ref(initialValue)

  const setTrue = () => {
    value.value = true
  }

  const setFalse = () => {
    value.value = false
  }

  const toggle = () => {
    value.value = !value.value
  }

  const setValue = (newValue: boolean) => {
    value.value = newValue
  }

  return {
    value,
    setTrue,
    setFalse,
    toggle,
    setValue,
  }
}
