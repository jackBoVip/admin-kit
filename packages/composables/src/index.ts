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
export * from './use-scroll-lock'
export * from './use-priority-value'
export * from './use-namespace'
export * from './use-layout-style'
export * from './use-sortable'
export * from './use-is-mobile'

// 国际化
export * from './locale'
export type { Locale } from './locale/messages'

// 偏好设置
export * from './preferences'

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


export {
  useEmitAsProps,
  useForwardExpose,
  useForwardProps,
  useForwardPropsEmits,
} from 'reka-ui';
