/**
 * 浏览器工具函数模块
 * @description 包含 DOM 操作、CSS 处理、剪贴板、文件处理、URL 等浏览器相关工具函数
 * @module browser
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ============================================================================
// CSS 工具函数
// ============================================================================

/**
 * 合并 Tailwind CSS 类名
 * @description 使用 clsx 和 tailwind-merge 合并类名，自动处理冲突
 * @param inputs - 类名输入
 * @returns 合并后的类名字符串
 * @example
 * ```typescript
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // 根据条件合并
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ============================================================================
// DOM 工具函数
// ============================================================================

/**
 * 元素可见区域矩形信息
 */
export interface VisibleDomRect {
  /** 底部位置 */
  bottom: number
  /** 高度 */
  height: number
  /** 左侧位置 */
  left: number
  /** 右侧位置 */
  right: number
  /** 顶部位置 */
  top: number
  /** 宽度 */
  width: number
}

/**
 * 获取元素在视口中的可见区域信息
 * @param element - 目标元素
 * @returns 元素可见区域的矩形信息
 * @example
 * ```typescript
 * const rect = getElementVisibleRect(element)
 * console.log(rect.width, rect.height) // 可见区域的宽高
 * ```
 */
export function getElementVisibleRect(
  element?: HTMLElement | null | undefined
): VisibleDomRect {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }
  }

  const rect = element.getBoundingClientRect()
  const viewHeight = Math.max(
    globalThis.document.documentElement.clientHeight,
    globalThis.innerHeight
  )
  const viewWidth = Math.max(
    globalThis.document.documentElement.clientWidth,
    globalThis.innerWidth
  )

  const top = Math.max(rect.top, 0)
  const bottom = Math.min(rect.bottom, viewHeight)
  const left = Math.max(rect.left, 0)
  const right = Math.min(rect.right, viewWidth)

  return {
    bottom,
    height: Math.max(0, bottom - top),
    left,
    right,
    top,
    width: Math.max(0, right - left),
  }
}

/**
 * 获取浏览器滚动条宽度
 * @returns 滚动条宽度（像素）
 * @example
 * ```typescript
 * const scrollbarWidth = getScrollbarWidth()
 * console.log(`滚动条宽度: ${scrollbarWidth}px`)
 * ```
 */
export function getScrollbarWidth(): number {
  const scrollDiv = globalThis.document.createElement('div')

  scrollDiv.style.visibility = 'hidden'
  scrollDiv.style.overflow = 'scroll'
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'

  globalThis.document.body.append(scrollDiv)

  const innerDiv = globalThis.document.createElement('div')
  scrollDiv.append(innerDiv)

  const scrollbarWidth = scrollDiv.offsetWidth - innerDiv.offsetWidth

  scrollDiv.remove()
  return scrollbarWidth
}

// ============================================================================
// 剪贴板工具函数
// ============================================================================

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 * @returns Promise<boolean> - 是否复制成功
 * @example
 * ```typescript
 * const success = await copyToClipboard('Hello World')
 * if (success) {
 *   console.log('复制成功')
 * }
 * ```
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
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
 * 从剪贴板读取文本
 * @returns Promise<string> - 剪贴板中的文本
 * @example
 * ```typescript
 * const text = await readFromClipboard()
 * console.log('剪贴板内容:', text)
 * ```
 */
export async function readFromClipboard(): Promise<string> {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return await navigator.clipboard.readText()
    }
    return ''
  } catch {
    return ''
  }
}

// ============================================================================
// 文件工具函数
// ============================================================================

/**
 * 下载文件
 * @param url - 文件 URL
 * @param filename - 文件名
 * @example
 * ```typescript
 * downloadFile('https://example.com/file.pdf', 'document.pdf')
 * ```
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 下载文本内容为文件
 * @param content - 文本内容
 * @param filename - 文件名
 * @param mimeType - MIME 类型，默认为 'text/plain'
 * @example
 * ```typescript
 * downloadTextFile('Hello World', 'hello.txt')
 * downloadTextFile('{"name":"John"}', 'data.json', 'application/json')
 * ```
 */
export function downloadTextFile(
  content: string,
  filename: string,
  mimeType = 'text/plain'
): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

/**
 * 读取文件内容为文本
 * @param file - 文件对象
 * @returns Promise<string> - 文件文本内容
 * @example
 * ```typescript
 * const input = document.querySelector('input[type="file"]')
 * input.addEventListener('change', async (e) => {
 *   const file = e.target.files[0]
 *   const content = await readFileAsText(file)
 *   console.log(content)
 * })
 * ```
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

/**
 * 读取文件内容为 Data URL
 * @param file - 文件对象
 * @returns Promise<string> - 文件 Data URL
 * @example
 * ```typescript
 * const file = input.files[0]
 * const dataUrl = await readFileAsDataURL(file)
 * img.src = dataUrl
 * ```
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ============================================================================
// URL 工具函数
// ============================================================================

/**
 * 解析 URL 查询参数
 * @param url - URL 字符串，默认为当前页面 URL
 * @returns 查询参数对象
 * @example
 * ```typescript
 * parseQueryString('https://example.com?name=John&age=30')
 * // { name: 'John', age: '30' }
 * ```
 */
export function parseQueryString(url?: string): Record<string, string> {
  const searchParams = new URLSearchParams(url || globalThis.location.search)
  const params: Record<string, string> = {}

  for (const [key, value] of searchParams.entries()) {
    params[key] = value
  }

  return params
}

/**
 * 构建 URL 查询字符串
 * @param params - 查询参数对象
 * @returns 查询字符串
 * @example
 * ```typescript
 * buildQueryString({ name: 'John', age: '30' })
 * // 'name=John&age=30'
 * ```
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value))
    }
  }

  return searchParams.toString()
}

/**
 * 向 URL 添加查询参数
 * @param url - 基础 URL
 * @param params - 要添加的查询参数
 * @returns 添加参数后的 URL
 * @example
 * ```typescript
 * addQueryParams('https://example.com', { name: 'John', age: 30 })
 * // 'https://example.com?name=John&age=30'
 * ```
 */
export function addQueryParams(url: string, params: Record<string, any>): string {
  const queryString = buildQueryString(params)
  if (!queryString) return url

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${queryString}`
}

/**
 * 从 URL 中移除指定的查询参数
 * @param url - 原始 URL
 * @param keys - 要移除的参数键数组
 * @returns 移除参数后的 URL
 * @example
 * ```typescript
 * removeQueryParams('https://example.com?name=John&age=30', ['age'])
 * // 'https://example.com?name=John'
 * ```
 */
export function removeQueryParams(url: string, keys: string[]): string {
  const urlObj = new URL(url)
  const searchParams = urlObj.searchParams

  for (const key of keys) {
    searchParams.delete(key)
  }

  urlObj.search = searchParams.toString()
  return urlObj.toString()
}

/**
 * 获取 URL 中指定的查询参数值
 * @param key - 参数键
 * @param url - URL 字符串，默认为当前页面 URL
 * @returns 参数值，不存在返回 null
 * @example
 * ```typescript
 * getQueryParam('name', 'https://example.com?name=John')
 * // 'John'
 * ```
 */
export function getQueryParam(key: string, url?: string): string | null {
  const searchParams = new URLSearchParams(url || globalThis.location.search)
  return searchParams.get(key)
}
