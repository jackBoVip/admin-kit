/**
 * @packageDocumentation
 * @module popup
 *
 * 弹层模块（@admin-core/layouts/popup）
 *
 * ## 子模块
 * - `modal`：弹窗
 * - `drawer`：抽屉
 * - `alert`：轻量提示/确认
 *
 * ## SSR/Node
 * - 该模块依赖 DOM（创建容器、绑定事件），SSR 环境下无法真正渲染弹层
 *
 * ### SSR 策略（alert programmatic API）
 * 默认：`adminAlert/adminConfirm/adminPrompt` 在非 DOM 环境会抛错/Promise reject。
 *
 * 你可以在 SSR 期间设置为静默跳过（resolve），避免服务端渲染被打断：
 *
 * ```ts
 * import { setPopupSsrMode } from '@admin-core/layouts'
 *
 * // 仅建议在服务端渲染入口设置
 * setPopupSsrMode('noop')
 * ```
 *
 * ### 批量关闭（避免 Promise 悬挂）
 * 当你在路由切换/卸载时强制清理弹层，建议用：
 *
 * ```ts
 * import { clearAllAlertsWithOptions } from '@admin-core/layouts'
 *
 * clearAllAlertsWithOptions({ settle: 'reject', reason: 'route-change' })
 * ```
 */
export * from './alert';
export * from './drawer';
export * from './modal';
export * from './ssr';