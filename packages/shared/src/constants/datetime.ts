/**
 * 日期时间相关常量
 * 
 * 包含日期格式、时间单位等
 */

/**
 * 日期格式
 */
export const DATE_FORMATS = {
  /** 日期：YYYY-MM-DD */
  DATE: 'YYYY-MM-DD',
  
  /** 时间：HH:mm:ss */
  TIME: 'HH:mm:ss',
  
  /** 日期时间：YYYY-MM-DD HH:mm:ss */
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  
  /** 月份：YYYY-MM */
  MONTH: 'YYYY-MM',
  
  /** 年份：YYYY */
  YEAR: 'YYYY',
  
  /** 简短日期时间：MM-DD HH:mm */
  SHORT_DATETIME: 'MM-DD HH:mm',
  
  /** ISO 8601 格式 */
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const;

/**
 * 时间单位（毫秒）
 */
export const TIME_UNITS = {
  /** 1 秒 */
  SECOND: 1000,
  
  /** 1 分钟 */
  MINUTE: 60 * 1000,
  
  /** 1 小时 */
  HOUR: 60 * 60 * 1000,
  
  /** 1 天 */
  DAY: 24 * 60 * 60 * 1000,
  
  /** 1 周 */
  WEEK: 7 * 24 * 60 * 60 * 1000,
  
  /** 1 月（30天） */
  MONTH: 30 * 24 * 60 * 60 * 1000,
  
  /** 1 年（365天） */
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

/**
 * 星期枚举
 */
export const WEEKDAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

/**
 * 星期名称（中文）
 */
export const WEEKDAY_NAMES_ZH = ['日', '一', '二', '三', '四', '五', '六'] as const;

/**
 * 星期名称（英文）
 */
export const WEEKDAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
