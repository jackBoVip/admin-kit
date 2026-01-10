/**
 * 环境判断工具模块
 * @description 提供各种环境判断的工具函数，使用 ES2025 最新特性
 * @module env
 */

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
    version = RegExp.$1
  }
  // Edge
  else if (/Edg\/(\d+)/.test(ua)) {
    name = 'Edge'
    version = RegExp.$1
  }
  // Firefox
  else if (/Firefox\/(\d+)/.test(ua)) {
    name = 'Firefox'
    version = RegExp.$1
  }
  // Safari
  else if (/Safari\/(\d+)/.test(ua) && !/Chrome/.test(ua)) {
    name = 'Safari'
    version = RegExp.$1
  }
  // IE
  else if (/MSIE (\d+)/.test(ua) || /Trident.*rv:(\d+)/.test(ua)) {
    name = 'IE'
    version = RegExp.$1
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
    if (match && match[1]) {
      version = match[1].replace(/_/g, '.')
    }
  } else if (isIOS()) {
    name = 'iOS'
    const match = ua.match(/OS (\d+[._]\d+)/)
    if (match && match[1]) {
      version = match[1].replace(/_/g, '.')
    }
  } else if (isAndroid()) {
    name = 'Android'
    const match = ua.match(/Android (\d+\.\d+)/)
    if (match && match[1]) {
      version = match[1]
    }
  }

  return { name, version }
}
