/**
 * 主题工具函数
 */

import type {
  ThemeMode,
  ThemeVariant,
  ThemeConfig,
  ThemeChangeOptions,
  ColorValue,
} from './types'
import {
  DEFAULT_THEME_MODE,
  DEFAULT_THEME_VARIANT,
  STORAGE_KEYS,
  CSS_CLASSES,
  HTML_ATTRIBUTES,
  THEME_TRANSITION_DURATION,
  THEME_MAP,
  getThemeMetadata,
} from './constants'

/**
 * 获取 HTML 根元素
 */
export function getHtmlElement(): HTMLElement {
  return document.documentElement
}

/**
 * 从 localStorage 获取主题模式
 */
export function getStoredMode(): ThemeMode | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEYS.MODE)
  return stored === 'dark' || stored === 'light' ? stored : null
}

/**
 * 从 localStorage 获取主题变体
 */
export function getStoredVariant(): ThemeVariant | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEYS.VARIANT)
  return THEME_MAP.has(stored as ThemeVariant) ? (stored as ThemeVariant) : null
}

/**
 * 保存主题模式到 localStorage
 */
export function storeMode(mode: ThemeMode): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.MODE, mode)
}

/**
 * 保存主题变体到 localStorage
 */
export function storeVariant(variant: ThemeVariant): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.VARIANT, variant)
}

/**
 * 清除存储的主题配置
 */
export function clearStoredTheme(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.MODE)
  localStorage.removeItem(STORAGE_KEYS.VARIANT)
}

/**
 * 应用主题模式到 DOM
 */
export function applyMode(mode: ThemeMode): void {
  const html = getHtmlElement()
  
  if (mode === 'dark') {
    html.classList.add(CSS_CLASSES.DARK)
    html.classList.remove(CSS_CLASSES.LIGHT)
  } else {
    html.classList.remove(CSS_CLASSES.DARK)
    html.classList.add(CSS_CLASSES.LIGHT)
  }
  
  html.setAttribute(HTML_ATTRIBUTES.MODE, mode)
  
  // 只有在自定义主题激活时才重新应用
  const primaryColor = localStorage.getItem('custom-theme-primary')
  const isCustomActive = localStorage.getItem('custom-theme-active') === 'true'
  
  if (primaryColor && isCustomActive) {
    // 延迟执行，确保模式已经切换完成
    setTimeout(() => {
      const colors = generateThemeFromPrimary(primaryColor, mode)
      applyCustomTheme(colors, false)
    }, 0)
  }
}

/**
 * 应用主题变体到 DOM
 */
export function applyVariant(variant: ThemeVariant): void {
  const html = getHtmlElement()
  
  if (variant === 'default' || variant === DEFAULT_THEME_VARIANT) {
    html.removeAttribute(HTML_ATTRIBUTES.THEME)
  } else {
    html.setAttribute(HTML_ATTRIBUTES.THEME, variant)
  }
  
  // 切换预设主题时，停用自定义主题
  const primaryColor = localStorage.getItem('custom-theme-primary')
  if (primaryColor) {
    // 标记自定义主题为非激活状态
    localStorage.setItem('custom-theme-active', 'false')
    
    // 清除内联样式，让预设主题生效
    const colorKeys: string[] = [
      'primary',
      'primary-foreground',
      'secondary',
      'secondary-foreground',
      'accent',
      'accent-foreground',
      'muted',
      'muted-foreground',
      'background',
      'background-deep',
      'foreground',
      'card',
      'card-foreground',
      'border',
      'input',
      'ring',
      'sidebar',
      'sidebar-deep',
      'header',
      'menu',
    ]
    
    colorKeys.forEach((key) => {
      html.style.removeProperty(`--${key}`)
    })
  }
}

/**
 * 获取当前主题模式
 */
export function getCurrentMode(): ThemeMode {
  if (typeof window === 'undefined') return DEFAULT_THEME_MODE
  
  const html = getHtmlElement()
  return html.classList.contains(CSS_CLASSES.DARK) ? 'dark' : 'light'
}

/**
 * 获取当前主题变体
 */
export function getCurrentVariant(): ThemeVariant {
  if (typeof window === 'undefined') return DEFAULT_THEME_VARIANT
  
  const html = getHtmlElement()
  const variant = html.getAttribute(HTML_ATTRIBUTES.THEME)
  return (variant as ThemeVariant) || DEFAULT_THEME_VARIANT
}

/**
 * 应用主题配置
 */
export function applyTheme(
  config: Partial<ThemeConfig>,
  options: ThemeChangeOptions = {}
): void {
  const { mode, variant, persist = true } = config
  const { transition = true } = options
  
  // 启用过渡动画
  if (transition) {
    enableTransition()
  }
  
  // 应用模式
  if (mode) {
    applyMode(mode)
    if (persist) {
      storeMode(mode)
    }
  }
  
  // 应用变体
  if (variant) {
    applyVariant(variant)
    if (persist) {
      storeVariant(variant)
    }
  }
  
  // 禁用过渡动画
  if (transition) {
    setTimeout(() => {
      disableTransition()
    }, THEME_TRANSITION_DURATION)
  }
}

/**
 * 启用主题切换过渡动画
 */
export function enableTransition(): void {
  const html = getHtmlElement()
  html.style.setProperty('transition', `background-color ${THEME_TRANSITION_DURATION}ms ease, color ${THEME_TRANSITION_DURATION}ms ease`)
}

/**
 * 禁用主题切换过渡动画
 */
export function disableTransition(): void {
  const html = getHtmlElement()
  html.style.removeProperty('transition')
}

/**
 * 切换暗色模式
 */
export function toggleDarkMode(options: ThemeChangeOptions = {}): ThemeMode {
  const currentMode = getCurrentMode()
  const newMode: ThemeMode = currentMode === 'dark' ? 'light' : 'dark'
  
  applyTheme({ mode: newMode }, options)
  
  return newMode
}

/**
 * 初始化主题
 * 从 localStorage 恢复主题配置，如果没有则使用默认值
 */
export function initTheme(): ThemeConfig {
  const storedMode = getStoredMode()
  const storedVariant = getStoredVariant()
  
  const config: ThemeConfig = {
    mode: storedMode || DEFAULT_THEME_MODE,
    variant: storedVariant || DEFAULT_THEME_VARIANT,
    persist: true,
    enableTransition: false, // 初始化时不启用过渡
  }
  
  applyTheme(config, { transition: false })
  
  return config
}

/**
 * 检测系统主题偏好
 */
export function detectSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return DEFAULT_THEME_MODE
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

/**
 * 监听系统主题变化
 */
export function watchSystemTheme(callback: (mode: ThemeMode) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }
  
  mediaQuery.addEventListener('change', handler)
  
  return () => {
    mediaQuery.removeEventListener('change', handler)
  }
}

/**
 * 获取所有可用主题
 */
export function getAvailableThemes() {
  return getThemeMetadata()
}

/**
 * 根据 ID 获取主题元数据
 */
export function getThemeMetadataById(variant: ThemeVariant) {
  return THEME_MAP.get(variant)
}

/**
 * 解析 HSL 颜色字符串
 * @param hsl - HSL 颜色字符串，格式：'hsl(262.1, 83.3%, 57.8%)' 或 '262.1 83.3% 57.8%'
 */
export function parseHSL(hsl: string): ColorValue | null {
  // 移除 'hsl(' 和 ')' 以及空格
  const cleaned = hsl.replace(/hsl\(|\)|%/g, '').trim()
  const parts = cleaned.split(/[\s,]+/).map(Number)
  
  if (parts.length < 3 || parts[0] === undefined || parts[1] === undefined || parts[2] === undefined) {
    return null
  }
  
  const result: ColorValue = {
    h: parts[0],
    s: parts[1],
    l: parts[2],
  }
  
  if (parts[3] !== undefined) {
    result.a = parts[3]
  }
  
  return result
}

/**
 * 将 ColorValue 转换为 HSL 字符串
 */
export function toHSLString(color: ColorValue): string {
  const { h, s, l, a } = color
  
  if (a !== undefined && a !== 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`
  }
  
  return `hsl(${h}, ${s}%, ${l}%)`
}

/**
 * 获取 CSS 变量值
 */
export function getCSSVariable(name: string): string {
  if (typeof window === 'undefined') return ''
  
  const html = getHtmlElement()
  return getComputedStyle(html).getPropertyValue(`--${name}`).trim()
}

/**
 * 设置 CSS 变量值
 */
export function setCSSVariable(name: string, value: string): void {
  if (typeof window === 'undefined') return
  
  const html = getHtmlElement()
  html.style.setProperty(`--${name}`, value)
}

/**
 * 获取主题颜色
 */
export function getThemeColor(token: string): string {
  const value = getCSSVariable(token)
  
  // 如果是 HSL 格式（不带 hsl()），添加包装
  if (value && !value.startsWith('hsl')) {
    return `hsl(${value})`
  }
  
  return value
}

/**
 * 验证主题变体是否有效
 */
export function isValidVariant(variant: string): variant is ThemeVariant {
  return THEME_MAP.has(variant as ThemeVariant)
}

/**
 * 验证主题模式是否有效
 */
export function isValidMode(mode: string): mode is ThemeMode {
  return mode === 'light' || mode === 'dark'
}

/**
 * 自定义主题颜色配置
 */
export interface CustomThemeColors {
  /** 主色 */
  primary?: string
  /** 主色前景色 */
  primaryForeground?: string
  /** 次要色 */
  secondary?: string
  /** 次要色前景色 */
  secondaryForeground?: string
  /** 强调色 */
  accent?: string
  /** 强调色前景色 */
  accentForeground?: string
  /** 柔和色 */
  muted?: string
  /** 柔和色前景色 */
  mutedForeground?: string
  /** 背景色 */
  background?: string
  /** 深层背景色 */
  backgroundDeep?: string
  /** 前景色 */
  foreground?: string
  /** 卡片背景色 */
  card?: string
  /** 卡片前景色 */
  cardForeground?: string
  /** 边框色 */
  border?: string
  /** 输入框边框色 */
  input?: string
  /** 焦点环颜色 */
  ring?: string
  /** 侧边栏背景色 */
  sidebar?: string
  /** 侧边栏深层背景色 */
  sidebarDeep?: string
  /** 头部背景色 */
  header?: string
  /** 菜单背景色 */
  menu?: string
}

/**
 * 应用自定义主题颜色
 * @param colors - 自定义颜色配置（HSL 格式，如 '280 35% 65%' 或 'hsl(280, 35%, 65%)'）
 * @param persist - 是否持久化到 localStorage
 * 
 * @example
 * ```typescript
 * // 设置自定义主色
 * applyCustomTheme({
 *   primary: '280 35% 65%',
 *   primaryForeground: '0 0% 98%'
 * })
 * 
 * // 使用完整的 HSL 格式
 * applyCustomTheme({
 *   primary: 'hsl(280, 35%, 65%)',
 *   accent: 'hsl(200, 85%, 50%)'
 * })
 * ```
 */
export function applyCustomTheme(
  colors: CustomThemeColors,
  persist = false
): void {
  if (typeof window === 'undefined') return

  const html = getHtmlElement()
  
  // 转换颜色格式（移除 hsl() 包装，只保留数值）
  const normalizeColor = (color: string): string => {
    return color.replace(/hsl\(|\)|%/g, '').trim()
  }

  // 应用每个颜色变量
  Object.entries(colors).forEach(([key, value]) => {
    if (value) {
      // 将 camelCase 转换为 kebab-case
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      const normalizedValue = normalizeColor(value)
      html.style.setProperty(`--${cssVarName}`, normalizedValue)
    }
  })

  // 持久化到 localStorage
  if (persist) {
    localStorage.setItem('custom-theme-colors', JSON.stringify(colors))
  }
}

/**
 * 获取存储的自定义主题颜色
 */
export function getStoredCustomTheme(): CustomThemeColors | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem('custom-theme-colors')
  if (!stored) return null
  
  try {
    return JSON.parse(stored) as CustomThemeColors
  } catch {
    return null
  }
}

/**
 * 清除自定义主题颜色
 */
export function clearCustomTheme(): void {
  if (typeof window === 'undefined') return
  
  const html = getHtmlElement()
  
  // 移除所有可能的自定义颜色变量
  const colorKeys: (keyof CustomThemeColors)[] = [
    'primary',
    'primaryForeground',
    'secondary',
    'secondaryForeground',
    'accent',
    'accentForeground',
    'muted',
    'mutedForeground',
    'background',
    'backgroundDeep',
    'foreground',
    'card',
    'cardForeground',
    'border',
    'input',
    'ring',
    'sidebar',
    'sidebarDeep',
    'header',
    'menu',
  ]
  
  colorKeys.forEach((key) => {
    const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    html.style.removeProperty(`--${cssVarName}`)
  })
  
  // 清除 localStorage
  localStorage.removeItem('custom-theme-colors')
  localStorage.removeItem('custom-theme-primary')
  localStorage.removeItem('custom-theme-active')
}

/**
 * 恢复自定义主题颜色
 */
export function restoreCustomTheme(): boolean {
  const stored = getStoredCustomTheme()
  if (!stored) return false
  
  applyCustomTheme(stored, false)
  return true
}

/**
 * 从 HEX 颜色转换为 HSL
 * @param hex - HEX 颜色字符串，如 '#8B5CF6'
 * @returns HSL 格式字符串，如 '280 35% 65%'
 */
export function hexToHSL(hex: string): string {
  // 移除 # 号
  hex = hex.replace('#', '')
  
  // 转换为 RGB
  const r = Number.parseInt(hex.substring(0, 2), 16) / 255
  const g = Number.parseInt(hex.substring(2, 4), 16) / 255
  const b = Number.parseInt(hex.substring(4, 6), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lPercent = Math.round(l * 100)
  
  return `${h} ${s}% ${lPercent}%`
}

/**
 * 从 RGB 颜色转换为 HSL
 * @param r - 红色值 (0-255)
 * @param g - 绿色值 (0-255)
 * @param b - 蓝色值 (0-255)
 * @returns HSL 格式字符串，如 '280 35% 65%'
 */
export function rgbToHSL(r: number, g: number, b: number): string {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lPercent = Math.round(l * 100)
  
  return `${h} ${s}% ${lPercent}%`
}

/**
 * 生成完整的主题配色方案（基于单一主色）
 * @param primaryColor - 主色（HEX 或 HSL 格式）
 * @param mode - 主题模式（light 或 dark）
 * @returns 完整的主题颜色配置
 * 
 * @example
 * ```typescript
 * // 从紫色生成完整配色
 * const colors = generateThemeFromPrimary('#8B5CF6', 'light')
 * applyCustomTheme(colors)
 * ```
 */
export function generateThemeFromPrimary(
  primaryColor: string,
  mode: ThemeMode = 'light'
): CustomThemeColors {
  // 转换为 HSL 格式
  let primaryHSL: string
  if (primaryColor.startsWith('#')) {
    primaryHSL = hexToHSL(primaryColor)
  } else if (primaryColor.startsWith('hsl')) {
    const parsed = parseHSL(primaryColor)
    primaryHSL = parsed ? `${parsed.h} ${parsed.s}% ${parsed.l}%` : primaryColor
  } else {
    primaryHSL = primaryColor
  }
  
  const primary = parseHSL(primaryHSL)
  if (!primary) {
    throw new Error('Invalid color format')
  }
  
  if (mode === 'light') {
    // 浅色模式配色方案
    return {
      // 主色
      primary: primaryHSL,
      primaryForeground: primary.l > 50 ? '0 0% 10%' : '0 0% 98%',
      
      // 次要色（降低饱和度，提高亮度）
      secondary: `${primary.h} ${Math.max(5, primary.s - 30)}% ${Math.min(96, primary.l + 40)}%`,
      secondaryForeground: `${primary.h} ${Math.min(100, primary.s + 20)}% ${Math.max(10, primary.l - 40)}%`,
      
      // 强调色（稍微调整色相，保持饱和度）
      accent: `${primary.h} ${Math.max(5, primary.s - 25)}% ${Math.min(96, primary.l + 35)}%`,
      accentForeground: `${primary.h} ${Math.min(100, primary.s + 15)}% ${Math.max(10, primary.l - 35)}%`,
      
      // 柔和色（大幅降低饱和度）
      muted: `${primary.h} ${Math.max(5, primary.s - 40)}% 96%`,
      mutedForeground: `${primary.h} ${Math.max(5, primary.s - 35)}% 46%`,
      
      // 背景和前景
      background: '0 0% 100%',
      backgroundDeep: `${primary.h} ${Math.max(5, primary.s - 45)}% 95%`,
      foreground: `${primary.h} ${Math.max(5, primary.s - 40)}% 15%`,
      
      // 卡片
      card: '0 0% 100%',
      cardForeground: `${primary.h} ${Math.max(5, primary.s - 40)}% 15%`,
      
      // 边框和输入
      border: `${primary.h} ${Math.max(5, primary.s - 40)}% 90%`,
      input: `${primary.h} ${Math.max(5, primary.s - 40)}% 90%`,
      ring: primaryHSL,
      
      // 侧边栏和头部
      sidebar: '0 0% 100%',
      sidebarDeep: '0 0% 100%',
      header: '0 0% 100%',
      menu: '0 0% 100%',
    }
  } else {
    // 暗色模式配色方案
    return {
      // 主色（暗色模式下稍微提高亮度）
      primary: `${primary.h} ${primary.s}% ${Math.min(65, primary.l + 10)}%`,
      primaryForeground: '0 0% 98%',
      
      // 次要色
      secondary: `${primary.h} ${Math.max(5, primary.s - 30)}% 17%`,
      secondaryForeground: '0 0% 98%',
      
      // 强调色
      accent: `${primary.h} ${Math.max(5, primary.s - 25)}% 19%`,
      accentForeground: '0 0% 98%',
      
      // 柔和色
      muted: `${primary.h} ${Math.max(5, primary.s - 35)}% 16%`,
      mutedForeground: `${primary.h} ${Math.max(5, primary.s - 30)}% 65%`,
      
      // 背景和前景
      background: `${primary.h} ${Math.max(5, primary.s - 30)}% 12%`,
      backgroundDeep: `${primary.h} ${Math.max(5, primary.s - 35)}% 9%`,
      foreground: '0 0% 95%',
      
      // 卡片
      card: `${primary.h} ${Math.max(5, primary.s - 30)}% 12%`,
      cardForeground: '0 0% 95%',
      
      // 边框和输入
      border: `${primary.h} ${Math.max(5, primary.s - 35)}% 22%`,
      input: `${primary.h} ${Math.max(5, primary.s - 35)}% 22%`,
      ring: `${primary.h} ${primary.s}% ${Math.min(65, primary.l + 10)}%`,
      
      // 侧边栏和头部
      sidebar: `${primary.h} ${Math.max(5, primary.s - 30)}% 12%`,
      sidebarDeep: `${primary.h} ${Math.max(5, primary.s - 35)}% 9%`,
      header: `${primary.h} ${Math.max(5, primary.s - 30)}% 12%`,
      menu: `${primary.h} ${Math.max(5, primary.s - 30)}% 12%`,
    }
  }
}

/**
 * 应用基于主色的完整主题
 * @param primaryColor - 主色（HEX 或 HSL 格式）
 * @param mode - 主题模式（默认使用当前模式）
 * @param persist - 是否持久化
 * 
 * @example
 * ```typescript
 * // 使用 HEX 颜色
 * applyThemeFromPrimary('#8B5CF6')
 * 
 * // 指定模式并持久化
 * applyThemeFromPrimary('#8B5CF6', 'dark', true)
 * ```
 */
export function applyThemeFromPrimary(
  primaryColor: string,
  mode?: ThemeMode,
  persist = false
): void {
  const currentMode = mode || getCurrentMode()
  const colors = generateThemeFromPrimary(primaryColor, currentMode)
  applyCustomTheme(colors, persist)
  
  // 总是保存主色和激活状态，以便模式切换时重新生成
  localStorage.setItem('custom-theme-primary', primaryColor)
  localStorage.setItem('custom-theme-active', 'true')
}


