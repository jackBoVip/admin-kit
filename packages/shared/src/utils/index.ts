/**
 * 工具函数
 */

/**
 * 空函数
 */
export function noop() {}

/**
 * 判断是否为开发环境
 */
export const isDev = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV) || 
  (typeof process !== 'undefined' && process.env['NODE_ENV'] === 'development')

/**
 * 判断是否为生产环境
 */
export const isProd = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.PROD) || 
  (typeof process !== 'undefined' && process.env['NODE_ENV'] === 'production')

/**
 * 判断是否为浏览器环境
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * 判断是否为服务端环境
 */
export const isServer = !isBrowser

/**
 * 延迟执行
 * @param ms 延迟时间（毫秒）
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 要节流的函数
 * @param delay 延迟时间（毫秒）
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastTime = 0
  
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 深度克隆
 * @param obj 要克隆的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as any
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }

  return obj
}

/**
 * 生成唯一 ID
 * @param prefix 前缀
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * 格式化数字（添加千分位分隔符）
 * @param num 数字
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 获取 URL 参数
 * @param url URL 字符串
 */
export function getUrlParams(url: string): Record<string, string> {
  const params: Record<string, string> = {}
  const searchParams = new URL(url).searchParams
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

/**
 * 构建 URL 参数
 * @param params 参数对象
 */
export function buildUrlParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}

/**
 * 下载文件
 * @param url 文件 URL
 * @param filename 文件名
 */
export function downloadFile(url: string, filename?: string): void {
  const link = document.createElement('a')
  link.href = url
  if (filename) {
    link.download = filename
  }
  link.click()
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    }
    
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch {
    return false
  }
}

/**
 * 判断是否为空值
 * @param value 要判断的值
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 移除对象中的空值
 * @param obj 对象
 */
export function removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: any = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (!isEmpty(value)) {
      result[key] = value
    }
  })
  return result
}

/**
 * 树形数据扁平化
 * @param tree 树形数据
 * @param childrenKey 子节点键名
 */
export function flattenTree<T extends Record<string, any>>(
  tree: T[],
  childrenKey = 'children'
): T[] {
  const result: T[] = []
  
  function flatten(nodes: T[]) {
    nodes.forEach(node => {
      result.push(node)
      if (node[childrenKey] && Array.isArray(node[childrenKey])) {
        flatten(node[childrenKey])
      }
    })
  }
  
  flatten(tree)
  return result
}

/**
 * 数组转树形结构
 * @param list 数组
 * @param options 配置项
 */
export function arrayToTree<T extends Record<string, any>>(
  list: T[],
  options: {
    idKey?: string
    parentKey?: string
    childrenKey?: string
    rootValue?: any
  } = {}
): T[] {
  const {
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
    rootValue = null,
  } = options

  const map = new Map<any, any>()
  const result: T[] = []

  // 创建映射
  list.forEach(item => {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  // 构建树
  list.forEach(item => {
    const node = map.get(item[idKey])!
    const parent = map.get(item[parentKey])

    if (item[parentKey] === rootValue || !parent) {
      result.push(node)
    } else {
      if (!parent[childrenKey]) {
        parent[childrenKey] = []
      }
      parent[childrenKey].push(node)
    }
  })

  return result
}

