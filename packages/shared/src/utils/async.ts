/**
 * 异步工具函数模块
 * @description 提供异步操作相关的工具函数，使用 ES2025 最新特性优化
 * @module async
 */

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
 * @description 返回一个在指定毫秒数后 resolve 的 Promise
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
 * 
 * search('hello') // 300ms 内不会执行
 * search('world') // 重新计时，只会执行这次
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
 * 
 * window.addEventListener('scroll', handleScroll)
 * // 300ms 内只会执行一次
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
 * 
 * if (error) {
 *   console.error('获取用户失败:', error)
 *   return
 * }
 * 
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
 * 
 * // 5 秒后取消
 * setTimeout(cancel, 5000)
 * 
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
