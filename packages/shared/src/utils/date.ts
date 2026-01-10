/**
 * 日期工具模块
 * @description 提供日期处理相关的工具函数，使用 ES2025 最新特性优化
 * @module date
 */

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 可格式化的日期类型
 */
export type FormatDate = Date | dayjs.Dayjs | number | string;

/**
 * 日期格式类型
 */
export type Format =
  | 'HH'
  | 'HH:mm'
  | 'HH:mm:ss'
  | 'YYYY'
  | 'YYYY-MM'
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | (string & {});

/**
 * 格式化日期
 * @param time - 要格式化的日期
 * @param format - 日期格式，默认为 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 * @example
 * ```typescript
 * formatDate(new Date()) // '2024-01-10'
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // '2024-01-10 12:30:45'
 * formatDate(1704873600000) // '2024-01-10'
 * formatDate('2024-01-10', 'YYYY年MM月DD日') // '2024年01月10日'
 * ```
 */
export function formatDate(time?: FormatDate, format: Format = 'YYYY-MM-DD'): string {
  try {
    const date = dayjs.isDayjs(time) ? time : dayjs(time);
    if (!date.isValid()) {
      throw new Error('Invalid date');
    }
    return date.tz().format(format);
  } catch (error) {
    console.error(`Error formatting date: ${error}`);
    return String(time ?? '');
  }
}

/**
 * 格式化日期时间（包含时分秒）
 * @param time - 要格式化的日期
 * @returns 格式化后的日期时间字符串
 * @example
 * ```typescript
 * formatDateTime(new Date()) // '2024-01-10 12:30:45'
 * formatDateTime(1704873600000) // '2024-01-10 12:30:45'
 * ```
 */
export function formatDateTime(time?: FormatDate): string {
  return formatDate(time, 'YYYY-MM-DD HH:mm:ss');
}

/**
 * 检查值是否为 Dayjs 对象
 * @param value - 要检查的值
 * @returns 是否为 Dayjs 对象
 * @example
 * ```typescript
 * isDayjsObject(dayjs()) // true
 * isDayjsObject(new Date()) // false
 * isDayjsObject('2024-01-10') // false
 * ```
 */
export function isDayjsObject(value: any): value is dayjs.Dayjs {
  return dayjs.isDayjs(value);
}

/**
 * 获取系统时区
 * @returns 系统时区字符串
 * @example
 * ```typescript
 * getSystemTimezone() // 'Asia/Shanghai'
 * ```
 */
export const getSystemTimezone = (): string => {
  return dayjs.tz.guess();
};

/**
 * 当前设置的时区
 */
let currentTimezone = getSystemTimezone();

/**
 * 设置默认时区
 * @param timezone - 时区字符串，不传则使用系统时区
 * @example
 * ```typescript
 * setCurrentTimezone('America/New_York')
 * setCurrentTimezone('Asia/Tokyo')
 * setCurrentTimezone() // 重置为系统时区
 * ```
 */
export const setCurrentTimezone = (timezone?: string): void => {
  currentTimezone = timezone ?? getSystemTimezone();
  dayjs.tz.setDefault(currentTimezone);
};

/**
 * 获取当前设置的时区
 * @returns 当前时区字符串
 * @example
 * ```typescript
 * getCurrentTimezone() // 'Asia/Shanghai'
 * ```
 */
export const getCurrentTimezone = (): string => {
  return currentTimezone;
};
