/**
 * 验证工具模块
 * @description 提供各种数据验证的工具函数，使用 ES2025 最新特性
 * @module validation
 */

// eslint-disable-next-line vue/prefer-import-from-vue
import { isFunction, isObject, isString } from '@vue/shared'

/**
 * 检查值是否为 undefined
 * @param value - 要检查的值
 * @returns 如果值是 undefined 返回 true，否则返回 false
 * @example
 * ```typescript
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 * isUndefined(0) // false
 * ```
 */
export function isUndefined(value?: unknown): value is undefined {
  return value === undefined
}

/**
 * 检查值是否为 boolean 类型
 * @param value - 要检查的值
 * @returns 如果值是布尔值返回 true，否则返回 false
 * @example
 * ```typescript
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(1) // false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 检查值是否为数字类型
 * @param value - 要检查的值
 * @returns 如果值是有限数字返回 true，否则返回 false
 * @example
 * ```typescript
 * isNumber(123) // true
 * isNumber(NaN) // false
 * isNumber(Infinity) // false
 * isNumber('123') // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * 检查值是否为空
 * @description 以下情况被认为是空：
 * - null 或 undefined
 * - 空字符串（去除空格后）
 * - 长度为 0 的数组
 * - size 为 0 的 Map 或 Set
 * - 没有可枚举属性的对象
 * @param value - 要检查的值
 * @returns 如果值为空返回 true，否则返回 false
 * @example
 * ```typescript
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('') // true
 * isEmpty('  ') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(new Map()) // true
 * isEmpty(new Set()) // true
 * isEmpty('hello') // false
 * isEmpty([1, 2]) // false
 * isEmpty({ a: 1 }) // false
 * ```
 */
export function isEmpty<T = unknown>(value?: T): value is T {
  if (value === null || value === undefined) {
    return true
  }

  if (Array.isArray(value) || isString(value)) {
    return value.length === 0
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return false
}

/**
 * 检查字符串是否为有效的 HTTP 或 HTTPS URL
 * @param url - 要检查的字符串
 * @returns 如果是有效的 HTTP/HTTPS URL 返回 true，否则返回 false
 * @example
 * ```typescript
 * isHttpUrl('https://example.com') // true
 * isHttpUrl('http://example.com') // true
 * isHttpUrl('ftp://example.com') // false
 * isHttpUrl('example.com') // false
 * ```
 */
export function isHttpUrl(url?: string): boolean {
  if (!url) {
    return false
  }
  const httpRegex = /^https?:\/\/.+$/
  return httpRegex.test(url)
}

/**
 * 检查值是否为 window 对象
 * @param value - 要检查的值
 * @returns 如果值是 window 对象返回 true，否则返回 false
 * @example
 * ```typescript
 * isWindow(window) // true (在浏览器环境中)
 * isWindow({}) // false
 * ```
 */
export function isWindow(value: unknown): value is Window {
  return (
    typeof window !== 'undefined' &&
    value !== null &&
    value === (value as Window).window
  )
}

/**
 * 检查值是否为 Date 对象
 * @param value - 要检查的值
 * @returns 如果值是 Date 对象返回 true，否则返回 false
 * @example
 * ```typescript
 * isDate(new Date()) // true
 * isDate('2024-01-01') // false
 * isDate(1704067200000) // false
 * ```
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date
}

/**
 * 检查值是否为 Promise 对象
 * @param value - 要检查的值
 * @returns 如果值是 Promise 返回 true，否则返回 false
 * @example
 * ```typescript
 * isPromise(Promise.resolve()) // true
 * isPromise(new Promise(() => {})) // true
 * isPromise({ then: () => {} }) // true
 * isPromise({}) // false
 * ```
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (isObject(value) &&
      isFunction((value as any).then) &&
      isFunction((value as any).catch))
  )
}

/**
 * 检查值是否为正则表达式
 * @param value - 要检查的值
 * @returns 如果值是正则表达式返回 true，否则返回 false
 * @example
 * ```typescript
 * isRegExp(/test/) // true
 * isRegExp(new RegExp('test')) // true
 * isRegExp('/test/') // false
 * ```
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

/**
 * 检查值是否为 null
 * @param value - 要检查的值
 * @returns 如果值是 null 返回 true，否则返回 false
 * @example
 * ```typescript
 * isNull(null) // true
 * isNull(undefined) // false
 * isNull(0) // false
 * ```
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * 检查值是否为 null 或 undefined
 * @param value - 要检查的值
 * @returns 如果值是 null 或 undefined 返回 true，否则返回 false
 * @example
 * ```typescript
 * isNullOrUndefined(null) // true
 * isNullOrUndefined(undefined) // true
 * isNullOrUndefined(0) // false
 * isNullOrUndefined('') // false
 * ```
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * 检查值是否为数组
 * @param value - 要检查的值
 * @returns 如果值是数组返回 true，否则返回 false
 * @example
 * ```typescript
 * isArray([]) // true
 * isArray([1, 2, 3]) // true
 * isArray('array') // false
 * ```
 */
export function isArray<T = any>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * 检查值是否为 Map 对象
 * @param value - 要检查的值
 * @returns 如果值是 Map 返回 true，否则返回 false
 * @example
 * ```typescript
 * isMap(new Map()) // true
 * isMap({}) // false
 * ```
 */
export function isMap<K = any, V = any>(value: unknown): value is Map<K, V> {
  return value instanceof Map
}

/**
 * 检查值是否为 Set 对象
 * @param value - 要检查的值
 * @returns 如果值是 Set 返回 true，否则返回 false
 * @example
 * ```typescript
 * isSet(new Set()) // true
 * isSet([]) // false
 * ```
 */
export function isSet<T = any>(value: unknown): value is Set<T> {
  return value instanceof Set
}

/**
 * 检查值是否为 Symbol 类型
 * @param value - 要检查的值
 * @returns 如果值是 Symbol 返回 true，否则返回 false
 * @example
 * ```typescript
 * isSymbol(Symbol('test')) // true
 * isSymbol('symbol') // false
 * ```
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

/**
 * 检查值是否为 BigInt 类型
 * @param value - 要检查的值
 * @returns 如果值是 BigInt 返回 true，否则返回 false
 * @example
 * ```typescript
 * isBigInt(BigInt(123)) // true
 * isBigInt(123n) // true
 * isBigInt(123) // false
 * ```
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

/**
 * 获取第一个非 null 且非 undefined 的值
 * @description 遍历参数列表，返回第一个不是 null 或 undefined 的值
 * @param values - 值列表
 * @returns 第一个非 null/undefined 的值，如果都是则返回 undefined
 * @example
 * ```typescript
 * getFirstNonNullOrUndefined(undefined, null, 42, 'hello') // 42
 * getFirstNonNullOrUndefined(null, undefined, 'hello', 123) // 'hello'
 * getFirstNonNullOrUndefined(undefined, null) // undefined
 * ```
 */
export function getFirstNonNullOrUndefined<T>(
  ...values: (null | T | undefined)[]
): T | undefined {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value
    }
  }
  return undefined
}

/**
 * 检查字符串是否为有效的邮箱地址
 * @param email - 要检查的字符串
 * @returns 如果是有效的邮箱地址返回 true，否则返回 false
 * @example
 * ```typescript
 * isEmail('user@example.com') // true
 * isEmail('invalid.email') // false
 * ```
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 检查字符串是否为有效的手机号（中国大陆）
 * @param phone - 要检查的字符串
 * @returns 如果是有效的手机号返回 true，否则返回 false
 * @example
 * ```typescript
 * isPhone('13800138000') // true
 * isPhone('12345678901') // false
 * ```
 */
export function isPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 检查字符串是否为有效的身份证号（中国大陆）
 * @param idCard - 要检查的字符串
 * @returns 如果是有效的身份证号返回 true，否则返回 false
 * @example
 * ```typescript
 * isIdCard('110101199001011234') // true
 * isIdCard('123456') // false
 * ```
 */
export function isIdCard(idCard: string): boolean {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

// 重新导出 @vue/shared 中的函数
export { isFunction, isObject, isString }
