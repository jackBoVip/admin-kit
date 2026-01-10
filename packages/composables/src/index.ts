/**
 * @admin-kit/composables
 * Vue 组合式函数和状态管理
 */

export * from './use-toggle'
export * from './use-boolean'
export * from './use-counter'
export * from './use-loading'
export * from './use-clipboard'
export * from './use-local-storage'

// 重新导出 @vueuse/core 的常用函数
export {
  useToggle as useVueUseToggle,
  useDark,
  useStorage,
  useLocalStorage as useVueUseLocalStorage,
  useSessionStorage,
  useMouse,
  useScroll,
  useScrollLock,
  useWindowSize,
  useEventListener,
  useDebounce,
  useThrottle,
  useTitle,
  useFavicon,
  useFullscreen,
  useNetwork,
  useOnline,
  useClipboard as useVueUseClipboard,
} from '@vueuse/core'
