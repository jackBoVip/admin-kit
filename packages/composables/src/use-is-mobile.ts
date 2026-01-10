import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

/**
 * 移动端检测组合式函数
 * 
 * @description
 * 检测当前设备是否为移动端，基于 Tailwind CSS 断点，使用 ES2025 最新特性
 * 
 * @returns 包含移动端检测状态的对象
 * 
 * @example
 * ```ts
 * import { useIsMobile } from '@admin-core/composables'
 * 
 * const { isMobile } = useIsMobile()
 * 
 * // 在模板中使用
 * <div v-if="isMobile">移动端内容</div>
 * <div v-else>桌面端内容</div>
 * 
 * // 在逻辑中使用
 * if (isMobile.value) {
 *   console.log('当前是移动端')
 * }
 * ```
 */
export function useIsMobile() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('md')
  
  return { isMobile }
}
