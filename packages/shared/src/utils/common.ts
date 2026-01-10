/**
 * 通用工具函数模块
 * @description 包含异步操作、环境判断、数据验证等通用工具函数
 * @module common
 */

// eslint-disable-next-line vue/prefer-import-from-vue
import { isFunction, isObject, isString } from '@vue/shared'

// ============================================================================
// 异步工具函数
// ============================================================================

/**
 * 空函数
 * @description 不执行任何操作的函数，常用作默认回调或占位符
 * @example
 * ```typescript
 * const callback = noop
 * callback() // 不执行任何操作
 * ```
 */
export function noop(): void {}

/**
 * 延迟执行
 * @description 返回一个在指定毫秒后 resolve 的 Promise
 * @param ms - 延迟时间（毫秒）
 * @returns Promise<void>
 * @example
 * ```typescript
 * await sleep(1000) // 延迟 1 秒
 * console.log('1 秒后执行')
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    globalThis.setTimeout(resolve, ms)
  })
}

/**
 * 防抖函数
 * @description 在事件被触发 n 毫秒后再执行回调，如果在这 n 毫秒内又被触发，则重新计时
 * @template T - 函数类型
 * @param fn - 要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 * @example
 * ```typescript
 * const search = debounce((keyword: string) => {
 *   console.log('搜索:', keyword)
 * }, 300)
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function (this: unknown, ...args: Parameters<T>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = undefined
    }, delay)
  }
}

/**
 * 节流函数
 * @description 规定时间内只执行一次函数，如果在规定时间内多次触发，只有一次生效
 * @template T - 函数类型
 * @param fn - 要节流的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 节流后的函数
 * @example
 * ```typescript
 * const handleScroll = throttle(() => {
 *   console.log('滚动事件')
 * }, 300)
 * window.addEventListener('scroll', handleScroll)
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastTime = 0

  return function (this: unknown, ...args: Parameters<T>): void {
    const now = Date.now()

    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * Promise 错误处理包装器
 * @description 将 Promise 的 resolve 和 reject 转换为元组形式，避免 try-catch
 * @template T - Promise resolve 的类型
 * @template U - 错误类型，默认为 Error
 * @param promise - 要处理的 Promise
 * @param errorExt - 附加到错误对象的额外信息
 * @returns Promise<[null, T] | [U, undefined]> - 成功返回 [null, data]，失败返回 [error, undefined]
 * @example
 * ```typescript
 * const [error, data] = await to(fetchUser())
 * if (error) {
 *   console.error('获取用户失败:', error)
 *   return
 * }
 * console.log('用户数据:', data)
 * ```
 */
export async function to<T, U = Error>(
  promise: Readonly<Promise<T>>,
  errorExt?: object
): Promise<[null, T] | [U, undefined]> {
  try {
    const data = await promise
    return [null, data]
  } catch (error) {
    if (errorExt) {
      const parsedError = Object.assign({}, error, errorExt)
      return [parsedError as U, undefined]
    }
    return [error as U, undefined]
  }
}

/**
 * 创建可取消的 Promise
 * @description 返回一个可以被取消的 Promise 包装器
 * @template T - Promise resolve 的类型
 * @param promise - 要包装的 Promise
 * @returns 包含 promise 和 cancel 方法的对象
 * @example
 * ```typescript
 * const { promise, cancel } = makeCancelable(fetchData())
 * setTimeout(cancel, 5000)
 * try {
 *   const data = await promise
 *   console.log(data)
 * } catch (error) {
 *   if (error.isCanceled) {
 *     console.log('请求已取消')
 *   }
 * }
 * ```
 */
export function makeCancelable<T>(promise: Promise<T>): {
  cancel: () => void
  promise: Promise<T>
} {
  let isCanceled = false

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then(value => {
        if (!isCanceled) {
          resolve(value)
        }
      })
      .catch(error => {
        if (!isCanceled) {
          reject(error)
        }
      })
  })

  return {
    cancel: () => {
      isCanceled = true
    },
    promise: wrappedPromise,
  }
}

/**
 * 重试函数
 * @description 在函数执行失败时自动重试指定次数
 * @template T - 函数返回类型
 * @param fn - 要执行的异步函数
 * @param retries - 重试次数，默认 3 次
 * @param delay - 重试间隔（毫秒），默认 1000ms
 * @returns Promise<T>
 * @example
 * ```typescript
 * const data = await retry(
 *   () => fetch('/api/data').then(res => res.json()),
 *   3,
 *   1000
 * )
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) {
      throw error
    }

    await sleep(delay)
    return retry(fn, retries - 1, delay)
  }
}

/**
 * 超时包装器
 * @description 为 Promise 添加超时限制
 * @template T - Promise resolve 的类型
 * @param promise - 要包装的 Promise
 * @param ms - 超时时间（毫秒）
 * @param timeoutError - 超时错误信息
 * @returns Promise<T>
 * @throws {Error} 超时时抛出错误
 * @example
 * ```typescript
 * try {
 *   const data = await timeout(fetchData(), 5000, '请求超时')
 * } catch (error) {
 *   console.error(error) // '请求超时'
 * }
 * ```
 */
export async function timeout<T>(
  promise: Promise<T>,
  ms: number,
  timeoutError = 'Operation timed out'
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(timeoutError))
    }, ms)
  })

  try {
    return await Promise.race([promise, timeoutPromise])
  } finally {
    clearTimeout(timeoutId!)
  }
}

// ============================================================================
// 环境判断工具函数
// ============================================================================

/**
 * 判断是否为开发环境
 * @description 通过 process.env.NODE_ENV 判断是否为开发环境
 * @example
 * ```typescript
 * if (isDev) {
 *   console.log('当前是开发环境')
 * }
 * ```
 */
export const isDev =
  typeof process !== 'undefined' && process.env?.['NODE_ENV'] === 'development'

/**
 * 判断是否为生产环境
 * @description 通过 process.env.NODE_ENV 判断是否为生产环境
 * @example
 * ```typescript
 * if (isProd) {
 *   console.log('当前是生产环境')
 * }
 * ```
 */
export const isProd =
  typeof process !== 'undefined' && process.env?.['NODE_ENV'] === 'production'

/**
 * 判断是否为浏览器环境
 * @description 通过检测 window 对象判断是否在浏览器环境中运行
 * @example
 * ```typescript
 * if (isBrowser) {
 *   document.title = 'Hello'
 * }
 * ```
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * 判断是否为服务端环境
 * @description 与 isBrowser 相反，判断是否在服务端环境中运行
 * @example
 * ```typescript
 * if (isServer) {
 *   console.log('服务端渲染')
 * }
 * ```
 */
export const isServer = !isBrowser

/**
 * 判断是否为 Mac OS 系统
 * @description 通过 navigator.userAgent 判断是否为 Mac OS
 * @returns 如果是 Mac OS 返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isMacOs()) {
 *   console.log('当前是 Mac 系统')
 * }
 * ```
 */
export function isMacOs(): boolean {
  if (!isBrowser) return false
  const macRegex = /macintosh|mac os x/i
  return macRegex.test(navigator.userAgent)
}

/**
 * 判断是否为 Windows OS 系统
 * @description 通过 navigator.userAgent 判断是否为 Windows
 * @returns 如果是 Windows 返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isWindowsOs()) {
 *   console.log('当前是 Windows 系统')
 * }
 * ```
 */
export function isWindowsOs(): boolean {
  if (!isBrowser) return false
  const windowsRegex = /windows|win32/i
  return windowsRegex.test(navigator.userAgent)
}

/**
 * 判断是否为移动设备
 * @description 通过 navigator.userAgent 判断是否为移动设备
 * @returns 如果是移动设备返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isMobile()) {
 *   console.log('当前是移动设备')
 * }
 * ```
 */
export function isMobile(): boolean {
  if (!isBrowser) return false
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  return mobileRegex.test(navigator.userAgent)
}

/**
 * 判断是否为 iOS 设备
 * @description 通过 navigator.userAgent 判断是否为 iOS 设备
 * @returns 如果是 iOS 设备返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isIOS()) {
 *   console.log('当前是 iOS 设备')
 * }
 * ```
 */
export function isIOS(): boolean {
  if (!isBrowser) return false
  const iosRegex = /iphone|ipad|ipod/i
  return iosRegex.test(navigator.userAgent)
}

/**
 * 判断是否为 Android 设备
 * @description 通过 navigator.userAgent 判断是否为 Android 设备
 * @returns 如果是 Android 设备返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isAndroid()) {
 *   console.log('当前是 Android 设备')
 * }
 * ```
 */
export function isAndroid(): boolean {
  if (!isBrowser) return false
  const androidRegex = /android/i
  return androidRegex.test(navigator.userAgent)
}

/**
 * 判断是否为微信浏览器
 * @description 通过 navigator.userAgent 判断是否在微信浏览器中
 * @returns 如果是微信浏览器返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isWechat()) {
 *   console.log('当前在微信浏览器中')
 * }
 * ```
 */
export function isWechat(): boolean {
  if (!isBrowser) return false
  const wechatRegex = /micromessenger/i
  return wechatRegex.test(navigator.userAgent)
}

/**
 * 判断是否支持触摸事件
 * @description 检测设备是否支持触摸事件
 * @returns 如果支持触摸返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isTouchDevice()) {
 *   console.log('支持触摸操作')
 * }
 * ```
 */
export function isTouchDevice(): boolean {
  if (!isBrowser) return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  )
}

/**
 * 获取浏览器信息
 * @description 解析 userAgent 获取浏览器名称和版本
 * @returns 包含浏览器名称和版本的对象
 * @example
 * ```typescript
 * const { name, version } = getBrowserInfo()
 * console.log(`${name} ${version}`) // 'Chrome 120.0'
 * ```
 */
export function getBrowserInfo(): { name: string; version: string } {
  if (!isBrowser) {
    return { name: 'Unknown', version: 'Unknown' }
  }

  const ua = navigator.userAgent
  let name = 'Unknown'
  let version = 'Unknown'

  // Chrome
  if (/Chrome\/(\d+)/.test(ua) && !/Edg/.test(ua)) {
    name = 'Chrome'
    const match = ua.match(/Chrome\/(\d+)/)
    version = match?.[1] ?? 'Unknown'
  }
  // Edge
  else if (/Edg\/(\d+)/.test(ua)) {
    name = 'Edge'
    const match = ua.match(/Edg\/(\d+)/)
    version = match?.[1] ?? 'Unknown'
  }
  // Firefox
  else if (/Firefox\/(\d+)/.test(ua)) {
    name = 'Firefox'
    const match = ua.match(/Firefox\/(\d+)/)
    version = match?.[1] ?? 'Unknown'
  }
  // Safari
  else if (/Safari\/(\d+)/.test(ua) && !/Chrome/.test(ua)) {
    name = 'Safari'
    const match = ua.match(/Safari\/(\d+)/)
    version = match?.[1] ?? 'Unknown'
  }
  // IE
  else if (/MSIE (\d+)/.test(ua) || /Trident.*rv:(\d+)/.test(ua)) {
    name = 'IE'
    const match = ua.match(/(?:MSIE |rv:)(\d+)/)
    version = match?.[1] ?? 'Unknown'
  }

  return { name, version }
}

/**
 * 获取操作系统信息
 * @description 解析 userAgent 获取操作系统名称和版本
 * @returns 包含操作系统名称和版本的对象
 * @example
 * ```typescript
 * const { name, version } = getOSInfo()
 * console.log(`${name} ${version}`) // 'Windows 10'
 * ```
 */
export function getOSInfo(): { name: string; version: string } {
  if (!isBrowser) {
    return { name: 'Unknown', version: 'Unknown' }
  }

  const ua = navigator.userAgent
  let name = 'Unknown'
  let version = 'Unknown'

  if (isWindowsOs()) {
    name = 'Windows'
    if (/Windows NT 10/.test(ua)) version = '10'
    else if (/Windows NT 6.3/.test(ua)) version = '8.1'
    else if (/Windows NT 6.2/.test(ua)) version = '8'
    else if (/Windows NT 6.1/.test(ua)) version = '7'
  } else if (isMacOs()) {
    name = 'Mac OS'
    const match = ua.match(/Mac OS X (\d+[._]\d+[._]\d+)/)
    if (match?.[1]) {
      version = match[1].replace(/_/g, '.')
    }
  } else if (isIOS()) {
    name = 'iOS'
    const match = ua.match(/OS (\d+[._]\d+)/)
    if (match?.[1]) {
      version = match[1].replace(/_/g, '.')
    }
  } else if (isAndroid()) {
    name = 'Android'
    const match = ua.match(/Android (\d+\.\d+)/)
    if (match?.[1]) {
      version = match[1]
    }
  }

  return { name, version }
}

// ============================================================================
// 数据验证工具函数
// ============================================================================

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
