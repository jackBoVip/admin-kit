/**
 * 外部依赖工具函数模块
 * @description 包含日期处理、对象比较、合并、进度条、状态处理等依赖外部库的工具函数
 * @module external
 */

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/zh-cn'
import { defu } from 'defu'
import NProgress from 'nprogress'

// 扩展 dayjs 插件
dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(dayOfYear)
dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)

// 设置默认语言为中文
dayjs.locale('zh-cn')

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

/**
 * 获取日期的开始时间
 * @param date - 日期对象、时间戳或日期字符串
 * @param unit - 时间单位，默认为 'day'
 * @returns 开始时间的日期对象
 * @example
 * ```typescript
 * startOf(new Date(), 'day') // 今天 00:00:00
 * startOf(new Date(), 'month') // 本月 1 号 00:00:00
 * startOf(new Date(), 'year') // 今年 1 月 1 号 00:00:00
 * ```
 */
export function startOf(
  date: Date | number | string,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): Date {
  return dayjs(date).startOf(unit).toDate()
}

/**
 * 获取日期的结束时间
 * @param date - 日期对象、时间戳或日期字符串
 * @param unit - 时间单位，默认为 'day'
 * @returns 结束时间的日期对象
 * @example
 * ```typescript
 * endOf(new Date(), 'day') // 今天 23:59:59
 * endOf(new Date(), 'month') // 本月最后一天 23:59:59
 * endOf(new Date(), 'year') // 今年 12 月 31 号 23:59:59
 * ```
 */
export function endOf(
  date: Date | number | string,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): Date {
  return dayjs(date).endOf(unit).toDate()
}

/**
 * 添加时间
 * @param date - 日期对象、时间戳或日期字符串
 * @param amount - 要添加的数量
 * @param unit - 时间单位，默认为 'day'
 * @returns 添加后的日期对象
 * @example
 * ```typescript
 * addTime(new Date(), 1, 'day') // 明天
 * addTime(new Date(), 1, 'month') // 下个月
 * addTime(new Date(), -1, 'year') // 去年
 * ```
 */
export function addTime(
  date: Date | number | string,
  amount: number,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): Date {
  return dayjs(date).add(amount, unit).toDate()
}

/**
 * 减去时间
 * @param date - 日期对象、时间戳或日期字符串
 * @param amount - 要减去的数量
 * @param unit - 时间单位，默认为 'day'
 * @returns 减去后的日期对象
 * @example
 * ```typescript
 * subtractTime(new Date(), 1, 'day') // 昨天
 * subtractTime(new Date(), 1, 'month') // 上个月
 * subtractTime(new Date(), 1, 'year') // 去年
 * ```
 */
export function subtractTime(
  date: Date | number | string,
  amount: number,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): Date {
  return dayjs(date).subtract(amount, unit).toDate()
}

/**
 * 判断日期是否在另一个日期之前
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 是否在之前
 * @example
 * ```typescript
 * isBefore('2024-01-01', '2024-01-10') // true
 * ```
 */
export function isBefore(
  date1: Date | number | string,
  date2: Date | number | string
): boolean {
  return dayjs(date1).isBefore(dayjs(date2))
}

/**
 * 判断日期是否在另一个日期之后
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 是否在之后
 * @example
 * ```typescript
 * isAfter('2024-01-10', '2024-01-01') // true
 * ```
 */
export function isAfter(
  date1: Date | number | string,
  date2: Date | number | string
): boolean {
  return dayjs(date1).isAfter(dayjs(date2))
}

/**
 * 判断两个日期是否相同
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @param unit - 比较的时间单位，默认为 'day'
 * @returns 是否相同
 * @example
 * ```typescript
 * isSame('2024-01-01 10:00', '2024-01-01 15:00', 'day') // true
 * isSame('2024-01-01 10:00', '2024-01-01 15:00', 'hour') // false
 * ```
 */
export function isSame(
  date1: Date | number | string,
  date2: Date | number | string,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): boolean {
  return dayjs(date1).isSame(dayjs(date2), unit)
}

/**
 * 判断日期是否是今天
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是今天
 * @example
 * ```typescript
 * isToday(new Date()) // true
 * isToday('2024-01-01') // false
 * ```
 */
export function isToday(date: Date | number | string): boolean {
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 判断日期是否是昨天
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是昨天
 * @example
 * ```typescript
 * isYesterday(subtractTime(new Date(), 1, 'day')) // true
 * ```
 */
export function isYesterday(date: Date | number | string): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

/**
 * 判断日期是否是明天
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是明天
 * @example
 * ```typescript
 * isTomorrow(addTime(new Date(), 1, 'day')) // true
 * ```
 */
export function isTomorrow(date: Date | number | string): boolean {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
}

/**
 * 判断日期是否是本周
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是本周
 * @example
 * ```typescript
 * isThisWeek(new Date()) // true
 * ```
 */
export function isThisWeek(date: Date | number | string): boolean {
  return dayjs(date).isSame(dayjs(), 'week')
}

/**
 * 判断日期是否是本月
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是本月
 * @example
 * ```typescript
 * isThisMonth(new Date()) // true
 * ```
 */
export function isThisMonth(date: Date | number | string): boolean {
  return dayjs(date).isSame(dayjs(), 'month')
}

/**
 * 判断日期是否是今年
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是今年
 * @example
 * ```typescript
 * isThisYear(new Date()) // true
 * ```
 */
export function isThisYear(date: Date | number | string): boolean {
  return dayjs(date).isSame(dayjs(), 'year')
}

/**
 * 获取日期是星期几
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 星期几（0-6，0 表示星期日）
 * @example
 * ```typescript
 * getDayOfWeek(new Date()) // 0-6
 * ```
 */
export function getDayOfWeek(date: Date | number | string): number {
  return dayjs(date).day()
}

/**
 * 获取日期是星期几的中文名称
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 星期几的中文名称
 * @example
 * ```typescript
 * getDayOfWeekName(new Date()) // '星期一'
 * ```
 */
export function getDayOfWeekName(date: Date | number | string): string {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const dayIndex = getDayOfWeek(date)
  return days[dayIndex] || '星期日'
}

/**
 * 获取日期是一年中的第几天
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 一年中的第几天（1-366）
 * @example
 * ```typescript
 * getDayOfYear('2024-01-01') // 1
 * getDayOfYear('2024-12-31') // 366
 * ```
 */
export function getDayOfYear(date: Date | number | string): number {
  return dayjs(date).dayOfYear()
}

/**
 * 获取日期是一年中的第几周
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 一年中的第几周（1-53）
 * @example
 * ```typescript
 * getWeekOfYear('2024-01-01') // 1
 * ```
 */
export function getWeekOfYear(date: Date | number | string): number {
  return dayjs(date).week()
}

/**
 * 获取日期所在月份的天数
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 月份的天数（28-31）
 * @example
 * ```typescript
 * getDaysInMonth('2024-02-01') // 29 (闰年)
 * getDaysInMonth('2024-01-01') // 31
 * ```
 */
export function getDaysInMonth(date: Date | number | string): number {
  return dayjs(date).daysInMonth()
}

/**
 * 获取日期所在的季度
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 季度（1-4）
 * @example
 * ```typescript
 * getQuarter('2024-01-01') // 1
 * getQuarter('2024-07-01') // 3
 * ```
 */
export function getQuarter(date: Date | number | string): number {
  const month = dayjs(date).month() + 1 // month() 返回 0-11
  return Math.ceil(month / 3)
}

/**
 * 判断是否是闰年
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是闰年
 * @example
 * ```typescript
 * isLeapYear('2024-01-01') // true
 * isLeapYear('2023-01-01') // false
 * ```
 */
export function isLeapYear(date: Date | number | string): boolean {
  const year = dayjs(date).year()
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 判断日期是否是工作日（周一到周五）
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是工作日
 * @example
 * ```typescript
 * isWeekday(new Date()) // true/false
 * ```
 */
export function isWeekday(date: Date | number | string): boolean {
  const day = getDayOfWeek(date)
  return day >= 1 && day <= 5
}

/**
 * 判断日期是否是周末（周六或周日）
 * @param date - 日期对象、时间戳或日期字符串
 * @returns 是否是周末
 * @example
 * ```typescript
 * isWeekend(new Date()) // true/false
 * ```
 */
export function isWeekend(date: Date | number | string): boolean {
  const day = getDayOfWeek(date)
  return day === 0 || day === 6
}

/**
 * 计算两个日期之间的时间差
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @param unit - 时间单位，默认为 'day'
 * @returns 时间差
 * @example
 * ```typescript
 * getTimeDiff('2024-01-10', '2024-01-01', 'day') // 9
 * getTimeDiff('2024-01-10 12:00', '2024-01-10 10:00', 'hour') // 2
 * ```
 */
export function getTimeDiff(
  date1: Date | number | string,
  date2: Date | number | string,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): number {
  return dayjs(date1).diff(dayjs(date2), unit)
}

/**
 * 格式化时间段
 * @param milliseconds - 毫秒数
 * @returns 格式化后的时间段字符串
 * @example
 * ```typescript
 * formatDuration(90000) // '1 分钟 30 秒'
 * formatDuration(3661000) // '1 小时 1 分钟 1 秒'
 * ```
 */
export function formatDuration(milliseconds: number): string {
  const duration = dayjs.duration(milliseconds)
  const hours = Math.floor(duration.asHours())
  const minutes = duration.minutes()
  const seconds = duration.seconds()

  const parts: string[] = []
  if (hours > 0) parts.push(`${hours} 小时`)
  if (minutes > 0) parts.push(`${minutes} 分钟`)
  if (seconds > 0) parts.push(`${seconds} 秒`)

  return parts.length > 0 ? parts.join(' ') : '0 秒'
}

/**
 * 解析日期字符串
 * @param dateString - 日期字符串
 * @param format - 日期格式
 * @returns 日期对象，解析失败返回 null
 * @example
 * ```typescript
 * parseDate('2024-01-10', 'YYYY-MM-DD') // Date 对象
 * parseDate('10/01/2024', 'DD/MM/YYYY') // Date 对象
 * ```
 */
export function parseDate(dateString: string, format: string): Date | null {
  const parsed = dayjs(dateString, format, true)
  return parsed.isValid() ? parsed.toDate() : null
}

/**
 * 判断日期字符串是否有效
 * @param dateString - 日期字符串
 * @param format - 日期格式（可选）
 * @returns 是否有效
 * @example
 * ```typescript
 * isValidDate('2024-01-10') // true
 * isValidDate('2024-13-01') // false
 * isValidDate('10/01/2024', 'DD/MM/YYYY') // true
 * ```
 */
export function isValidDate(dateString: string, format?: string): boolean {
  if (format) {
    return dayjs(dateString, format, true).isValid()
  }
  return dayjs(dateString).isValid()
}

/**
 * 获取两个日期之间的所有日期
 * @param start - 开始日期
 * @param end - 结束日期
 * @returns 日期数组
 * @example
 * ```typescript
 * getDateRange('2024-01-01', '2024-01-03')
 * // [Date(2024-01-01), Date(2024-01-02), Date(2024-01-03)]
 * ```
 */
export function getDateRange(
  start: Date | number | string,
  end: Date | number | string
): Date[] {
  const dates: Date[] = []
  let current = dayjs(start)
  const endDate = dayjs(end)

  while (current.isSameOrBefore(endDate, 'day')) {
    dates.push(current.toDate())
    current = current.add(1, 'day')
  }

  return dates
}

/**
 * 转换为 UTC 时间
 * @param date - 日期对象、时间戳或日期字符串
 * @returns UTC 时间的日期对象
 * @example
 * ```typescript
 * toUTC(new Date()) // UTC 时间
 * ```
 */
export function toUTC(date: Date | number | string): Date {
  return dayjs(date).utc().toDate()
}

/**
 * 转换为本地时间
 * @param date - 日期对象、时间戳或日期字符串
 * @param timezone - 时区，默认为本地时区
 * @returns 本地时间的日期对象
 * @example
 * ```typescript
 * toLocal(new Date()) // 本地时间
 * toLocal(new Date(), 'America/New_York') // 纽约时间
 * ```
 */
export function toLocal(date: Date | number | string, timezone?: string): Date {
  if (timezone) {
    return dayjs(date).tz(timezone).toDate()
  }
  return dayjs(date).local().toDate()
}

/**
 * 获取当前时间戳（毫秒）
 * @returns 当前时间戳
 * @example
 * ```typescript
 * getTimestamp() // 1704902400000
 * ```
 */
export function getTimestamp(): number {
  return Date.now()
}

/**
 * 获取当前时间戳（秒）
 * @returns 当前时间戳（秒）
 * @example
 * ```typescript
 * getUnixTimestamp() // 1704902400
 * ```
 */
export function getUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000)
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
