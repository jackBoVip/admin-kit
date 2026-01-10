import { ref } from 'vue';

/**
 * 切换状态的组合式函数
 * 
 * @description
 * 提供布尔值切换功能，常用于开关、显示/隐藏等场景，使用 ES2025 最新特性
 * 
 * @param initialValue - 初始状态，默认为 false
 * 
 * @returns 包含状态和操作方法的对象
 * 
 * @example
 * ```ts
 * import { useToggle } from '@admin-core/composables'
 * 
 * const { state, toggle, setTrue, setFalse } = useToggle(false)
 * 
 * toggle()   // state.value = true
 * toggle()   // state.value = false
 * setTrue()  // state.value = true
 * setFalse() // state.value = false
 * 
 * // 在模板中使用
 * <button @click="toggle">切换</button>
 * <div v-if="state">显示内容</div>
 * ```
 */
export function useToggle(initialValue = false) {
  const state = ref(initialValue);

  const toggle = () => {
    state.value = !state.value;
  };

  const setTrue = () => {
    state.value = true;
  };

  const setFalse = () => {
    state.value = false;
  };

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
}
