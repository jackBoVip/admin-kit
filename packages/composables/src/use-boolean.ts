import { ref } from 'vue'

/**
 * 布尔值状态管理组合式函数
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
