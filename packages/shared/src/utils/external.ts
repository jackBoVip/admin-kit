/**
 * 外部依赖工具函数模块
 * @description 包含日期处理、对象比较、合并、进度条、状态处理等依赖外部库的工具函数
 * @module external
 */

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { defu } from 'defu'
import NProgress from 'nprogress'

// 扩展 dayjs 插件
dayjs.extend(relativeTime)

// ============================================================================
// 日期工具函数
// ============================================================================

/**
 * 格式化日期
 * @param date - 日期对象、时间戳或日期字符串
 * @param format - 格式化模板，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 * @example
 * ```typescript
 * formatDate(new Date()) // '2024-01-10 15:30:00'
 * formatDate(Date.now(), 'YYYY-MM-DD') // '2024-01-10'
 * formatDate('2024-01-10', 'MM/DD/YYYY') // '01/10/2024'
 * ```
 */
export function formatDate(
  date: Date | number | string,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  return dayjs(date).format(format)
}

/**
 * 获取相对时间描述
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 相对时间描述
 * @example
 * ```typescript
 * getRelativeTime(Date.now() - 1000 * 60) // '1 分钟前'
 * getRelativeTime(Date.now() + 1000 * 60 * 60) // '1 小时后'
 * ```
 */
export function getRelativeTime(date: Date | number | string): string {
  return dayjs(date).fromNow()
}

/**
 * 判断日期是否在指定范围内
 * @param date - 要检查的日期
 * @param start - 开始日期
 * @param end - 结束日期
 * @returns 是否在范围内
 * @example
 * ```typescript
 * isDateInRange(new Date(), '2024-01-01', '2024-12-31') // true
 * ```
 */
export function isDateInRange(
  date: Date | number | string,
  start: Date | number | string,
  end: Date | number | string
): boolean {
  const d = dayjs(date)
  return d.isAfter(dayjs(start)) && d.isBefore(dayjs(end))
}

/**
 * 计算两个日期之间的天数差
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 天数差（绝对值）
 * @example
 * ```typescript
 * getDaysDiff('2024-01-01', '2024-01-10') // 9
 * ```
 */
export function getDaysDiff(
  date1: Date | number | string,
  date2: Date | number | string
): number {
  return Math.abs(dayjs(date1).diff(dayjs(date2), 'day'))
}

// ============================================================================
// 对象合并工具函数
// ============================================================================

/**
 * 深度合并对象（使用 defu）
 * @description 深度合并多个对象，后面的对象会覆盖前面的，但会保留未定义的值
 * @param objects - 要合并的对象数组
 * @returns 合并后的对象
 * @example
 * ```typescript
 * merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function merge<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  return defu({}, ...objects) as T
}

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

// ============================================================================
// 状态处理工具函数
// ============================================================================

/**
 * 状态处理器类型
 */
export type StateHandler<T = any> = {
  /** 获取当前状态 */
  get: () => T
  /** 设置新状态 */
  set: (value: T | ((prev: T) => T)) => void
  /** 订阅状态变化 */
  subscribe: (listener: (value: T) => void) => () => void
  /** 重置为初始状态 */
  reset: () => void
}

/**
 * 创建状态处理器
 * @description 创建一个简单的状态管理器，支持订阅和更新
 * @param initialValue - 初始值
 * @returns 状态处理器对象
 * @example
 * ```typescript
 * const counter = createStateHandler(0)
 *
 * // 订阅状态变化
 * const unsubscribe = counter.subscribe(value => {
 *   console.log('Counter:', value)
 * })
 *
 * // 更新状态
 * counter.set(1) // 输出: Counter: 1
 * counter.set(prev => prev + 1) // 输出: Counter: 2
 *
 * // 获取当前状态
 * console.log(counter.get()) // 2
 *
 * // 重置状态
 * counter.reset() // 输出: Counter: 0
 *
 * // 取消订阅
 * unsubscribe()
 * ```
 */
export function createStateHandler<T>(initialValue: T): StateHandler<T> {
  let value = initialValue
  const listeners = new Set<(value: T) => void>()

  return {
    get: () => value,

    set: (newValue: T | ((prev: T) => T)) => {
      const nextValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue
      if (nextValue !== value) {
        value = nextValue
        for (const listener of listeners) {
          listener(value)
        }
      }
    },

    subscribe: (listener: (value: T) => void) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },

    reset: () => {
      if (value !== initialValue) {
        value = initialValue
        for (const listener of listeners) {
          listener(value)
        }
      }
    },
  }
}
