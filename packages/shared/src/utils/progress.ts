/**
 * 进度条工具函数模块
 * @description 包含NProgress进度条的相关工具函数
 * @module progress
 */

import NProgress from 'nprogress';

// ============================================================================
// 进度条工具函数
// ============================================================================

/**
 * 开始显示进度条
 * @example
 * ```typescript
 * startProgress()
 * // 执行异步操作
 * await fetchData()
 * doneProgress()
 * ```
 */
export function startProgress(): void {
  NProgress.start()
}

/**
 * 完成进度条
 * @example
 * ```typescript
 * startProgress()
 * await fetchData()
 * doneProgress()
 * ```
 */
export function doneProgress(): void {
  NProgress.done()
}

/**
 * 增加进度条进度
 * @param amount - 增加的进度量（0-1 之间）
 * @example
 * ```typescript
 * startProgress()
 * incProgress(0.2) // 增加 20%
 * ```
 */
export function incProgress(amount?: number): void {
  NProgress.inc(amount)
}

/**
 * 设置进度条进度
 * @param progress - 进度值（0-1 之间）
 * @example
 * ```typescript
 * setProgress(0.5) // 设置为 50%
 * ```
 */
export function setProgress(progress: number): void {
  NProgress.set(progress)
}

/**
 * 配置进度条
 * @param config - 配置选项
 * @example
 * ```typescript
 * configureProgress({
 *   minimum: 0.1,
 *   easing: 'ease',
 *   speed: 500,
 *   showSpinner: false
 * })
 * ```
 */
export function configureProgress(config: Partial<NProgress.NProgressOptions>): void {
  NProgress.configure(config)
}