/**
 * Preferences Provider
 * 
 * @description
 * 偏好设置管理器，负责状态管理、缓存和 CSS 变量更新，使用 ESNext 最新特性
 * 
 * @remarks
 * 功能特性：
 * - 🔄 响应式状态管理
 * - 💾 自动缓存到 localStorage
 * - 🎨 自动更新 CSS 变量
 * - 📱 自动检测移动端
 * - 🌓 支持主题切换（浅色/暗色/自动）
 * - 🎯 命名空间隔离
 * 
 * @example
 * 基础使用
 * ```ts
 * import { preferencesManager } from '@admin-core/composables'
 * 
 * // 初始化
 * await preferencesManager.initPreferences({
 *   namespace: 'my-app',
 *   overrides: {
 *     theme: { mode: 'dark' }
 *   }
 * })
 * 
 * // 获取偏好设置
 * const preferences = preferencesManager.getPreferences()
 * 
 * // 更新偏好设置
 * preferencesManager.updatePreferences({
 *   theme: { colorPrimary: 'hsl(212 100% 45%)' }
 * })
 * ```
 */

import type { DeepPartial } from '@admin-core/shared/types'
import type { InitialOptions, Preferences } from './types'

import { markRaw, reactive, readonly, watch } from 'vue'

import { StorageManager } from '@admin-core/shared/cache'
import { isMacOs, merge } from '@admin-core/shared/utils'
import { generatorColorVariables } from '@admin-core/shared/color'
import { updateCSSVariables as executeUpdateCSSVariables } from '@admin-core/shared/utils'

import {
  breakpointsTailwind,
  useBreakpoints,
  useDebounceFn,
} from '@vueuse/core'

import { defaultPreferences, BUILT_IN_THEME_PRESETS } from './constants'

/**
 * 存储键常量
 * 
 * @description
 * 用于 localStorage 的键名定义
 */
const STORAGE_KEYS = {
  MAIN: 'preferences',
  LOCALE: 'preferences-locale',
  THEME: 'preferences-theme',
} as const

// ============ CSS 变量更新逻辑 ============

/**
 * 判断是否为暗色主题
 * 
 * @description
 * 根据主题模式判断当前是否应该使用暗色主题，使用 ESNext 最新特性
 * 
 * @param theme - 主题模式（'light' | 'dark' | 'auto'）
 * @returns 是否为暗色主题
 * 
 * @example
 * ```ts
 * isDarkTheme('dark')  // true
 * isDarkTheme('light') // false
 * isDarkTheme('auto')  // 根据系统偏好返回
 * ```
 */
function isDarkTheme(theme: string): boolean {
  let dark = theme === 'dark'
  if (theme === 'auto') {
    dark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return dark
}

/**
 * 更新主题的 CSS 变量
 * 
 * @description
 * 根据偏好设置更新文档的 CSS 变量，包括主题色、圆角、字体大小等，使用 ESNext 最新特性
 * 
 * @param preferences - 当前偏好设置对象
 * 
 * @remarks
 * 更新内容：
 * - 主题模式（dark class）
 * - 内置主题类型（data-theme 属性）
 * - 主题颜色变量
 * - 圆角变量
 * - 字体大小变量
 * 
 * @example
 * ```ts
 * updateCSSVariables({
 *   theme: {
 *     mode: 'dark',
 *     colorPrimary: 'hsl(212 100% 45%)',
 *     radius: '0.5',
 *     fontSize: 16
 *   }
 * })
 * ```
 */
function updateCSSVariables(preferences: Preferences): void {
  const root = document.documentElement
  if (!root) {
    return
  }

  const theme = preferences?.theme ?? {}
  const { builtinType, mode, radius } = theme

  // 设置 dark 类
  if (Reflect.has(theme, 'mode')) {
    const dark = isDarkTheme(mode)
    root.classList.toggle('dark', dark)
  }

  // 设置 data-theme 属性
  if (Reflect.has(theme, 'builtinType')) {
    const rootTheme = root.dataset.theme
    if (rootTheme !== builtinType) {
      root.dataset.theme = builtinType
    }
  }

  // 获取当前的内置主题
  const currentBuiltType = [...BUILT_IN_THEME_PRESETS].find(
    (item) => item.type === builtinType,
  )

  let builtinTypeColorPrimary: string | undefined = ''

  if (currentBuiltType) {
    const isDark = isDarkTheme(preferences.theme.mode)
    // 设置不同主题的主要颜色
    const color = isDark
      ? currentBuiltType.darkPrimaryColor || currentBuiltType.primaryColor
      : currentBuiltType.primaryColor
    builtinTypeColorPrimary = color || currentBuiltType.color
  }

  // 更新主题颜色
  if (
    builtinTypeColorPrimary ||
    Reflect.has(theme, 'colorPrimary') ||
    Reflect.has(theme, 'colorDestructive') ||
    Reflect.has(theme, 'colorSuccess') ||
    Reflect.has(theme, 'colorWarning')
  ) {
    updateMainColorVariables(preferences)
  }

  // 更新圆角
  if (Reflect.has(theme, 'radius')) {
    root.style.setProperty('--radius', `${radius}rem`)
  }

  // 更新字体大小
  if (Reflect.has(theme, 'fontSize')) {
    const fontSize = theme.fontSize
    root.style.setProperty('--font-size-base', `${fontSize}px`)
    root.style.setProperty('--menu-font-size', `calc(${fontSize}px * 0.875)`)
  }
}

/**
 * 更新主要的颜色 CSS 变量
 * 
 * @description
 * 将偏好设置中的颜色值转换为 HSL 格式并设置为 CSS 变量，使用 ESNext 最新特性
 * 
 * @param preference - 当前偏好设置对象
 * 
 * @remarks
 * 更新的颜色变量：
 * - primary: 主题色
 * - success: 成功色
 * - warning: 警告色
 * - destructive: 错误色
 * 
 * @example
 * ```ts
 * updateMainColorVariables({
 *   theme: {
 *     colorPrimary: 'hsl(212 100% 45%)',
 *     colorSuccess: 'hsl(144 57% 58%)',
 *     colorWarning: 'hsl(42 84% 61%)',
 *     colorDestructive: 'hsl(348 100% 61%)'
 *   }
 * })
 * ```
 */
function updateMainColorVariables(preference: Preferences): void {
  if (!preference.theme) {
    return
  }

  const { colorDestructive, colorPrimary, colorSuccess, colorWarning } =
    preference.theme

  const colorVariables = generatorColorVariables([
    { color: colorPrimary, name: 'primary' },
    { alias: 'warning', color: colorWarning, name: 'yellow' },
    { alias: 'success', color: colorSuccess, name: 'green' },
    { alias: 'destructive', color: colorDestructive, name: 'red' },
  ])

  // 要设置的 CSS 变量映射
  const colorMappings = {
    '--green-500': '--success',
    '--primary-500': '--primary',
    '--red-500': '--destructive',
    '--yellow-500': '--warning',
  }

  // 统一处理颜色变量的更新
  for (const [sourceVar, targetVar] of Object.entries(colorMappings)) {
    const colorValue = colorVariables[sourceVar]
    if (colorValue) {
      document.documentElement.style.setProperty(targetVar, colorValue)
    }
  }

  executeUpdateCSSVariables(colorVariables)
}

// ============ PreferenceManager 类 ============

/**
 * 偏好设置管理器类
 * 
 * @description
 * 管理应用的偏好设置，包括状态管理、缓存、CSS 更新等，使用 ESNext 最新特性
 * 
 * @remarks
 * 核心功能：
 * - 响应式状态管理（基于 Vue reactive）
 * - 自动缓存到 localStorage
 * - 防抖保存（150ms）
 * - 自动更新 CSS 变量
 * - 监听系统主题变化
 * - 监听窗口大小变化（移动端检测）
 * 
 * @example
 * ```ts
 * const manager = new PreferenceManager()
 * 
 * // 初始化
 * await manager.initPreferences({
 *   namespace: 'my-app',
 *   overrides: {
 *     theme: { mode: 'dark' }
 *   }
 * })
 * 
 * // 使用
 * const prefs = manager.getPreferences()
 * manager.updatePreferences({ theme: { colorPrimary: 'blue' } })
 * ```
 */
class PreferenceManager {
  /**
   * 缓存管理器
   * @private
   */
  private cache: StorageManager

  /**
   * 防抖保存函数
   * @private
   */
  private debouncedSave: (preference: Preferences) => void

  /**
   * 初始偏好设置
   * @private
   */
  private initialPreferences: Preferences = defaultPreferences

  /**
   * 是否已初始化
   * @private
   */
  private isInitialized = false

  /**
   * 响应式状态
   * @private
   */
  private state: Preferences

  /**
   * 构造函数
   * 
   * @description
   * 创建偏好设置管理器实例，使用 ESNext 最新特性
   */
  constructor() {
    this.cache = new StorageManager()
    this.state = reactive<Preferences>(
      this.loadFromCache() || { ...defaultPreferences },
    )
    this.debouncedSave = useDebounceFn(
      (preference) => this.saveToCache(preference),
      150,
    )
  }

  /**
   * 清除所有缓存的偏好设置
   * 
   * @description
   * 从 localStorage 中删除所有偏好设置相关的缓存
   * 
   * @example
   * ```ts
   * preferencesManager.clearCache()
   * ```
   */
  clearCache = (): void => {
    for (const key of Object.values(STORAGE_KEYS)) {
      this.cache.removeItem(key)
    }
  }

  /**
   * 获取初始化偏好设置
   * 
   * @description
   * 返回初始化时的偏好设置（用于重置或对比）
   * 
   * @returns 初始偏好设置
   * 
   * @example
   * ```ts
   * const initial = preferencesManager.getInitialPreferences()
   * ```
   */
  getInitialPreferences = (): Preferences => {
    return this.initialPreferences
  }

  /**
   * 获取当前偏好设置（只读）
   * 
   * @description
   * 返回当前的偏好设置，返回值是只读的，不能直接修改
   * 
   * @returns 只读的偏好设置对象
   * 
   * @example
   * ```ts
   * const preferences = preferencesManager.getPreferences()
   * console.log(preferences.theme.mode) // 'dark'
   * ```
   */
  getPreferences = () => {
    return readonly(this.state)
  }

  /**
   * 初始化偏好设置
   * 
   * @description
   * 初始化偏好设置管理器，设置命名空间和覆盖配置，使用 ESNext 最新特性
   * 
   * @param options - 初始化选项
   * @param options.namespace - 命名空间，用于隔离不同应用的配置
   * @param options.overrides - 要覆盖的偏好设置
   * 
   * @remarks
   * 初始化流程：
   * 1. 检查是否已初始化（防止重复）
   * 2. 设置命名空间
   * 3. 合并初始配置
   * 4. 加载缓存配置
   * 5. 设置监听器
   * 6. 初始化平台标识
   * 
   * @example
   * ```ts
   * await preferencesManager.initPreferences({
   *   namespace: 'my-app',
   *   overrides: {
   *     app: { locale: 'en-US' },
   *     theme: { mode: 'dark', colorPrimary: 'hsl(212 100% 45%)' }
   *   }
   * })
   * ```
   */
  initPreferences = async ({ namespace, overrides }: InitialOptions): Promise<void> => {
    // 防止重复初始化
    if (this.isInitialized) {
      return
    }

    // 使用命名空间初始化存储管理器
    this.cache = new StorageManager({ prefix: namespace })

    // 合并初始偏好设置
    this.initialPreferences = merge({}, overrides || {}, defaultPreferences) as Preferences

    // 加载缓存的偏好设置并与初始配置合并
    const cachedPreferences = this.loadFromCache() || {}
    const mergedPreference = merge(
      {},
      cachedPreferences,
      this.initialPreferences,
    ) as Preferences

    // 更新偏好设置
    this.updatePreferences(mergedPreference)

    // 设置监听器
    this.setupWatcher()

    // 初始化平台标识
    this.initPlatform()

    this.isInitialized = true
  }

  /**
   * 重置偏好设置到初始状态
   * 
   * @description
   * 将所有偏好设置重置为初始化时的状态
   * 
   * @example
   * ```ts
   * preferencesManager.resetPreferences()
   * ```
   */
  resetPreferences = (): void => {
    // 将状态重置为初始偏好设置
    Object.assign(this.state, this.initialPreferences)

    // 保存偏好设置至缓存
    this.saveToCache(this.state)

    // 直接触发 UI 更新
    this.handleUpdates(this.state)
  }

  /**
   * 更新偏好设置
   * 
   * @description
   * 更新部分或全部偏好设置，支持深度合并，使用 ESNext 最新特性
   * 
   * @param updates - 要更新的偏好设置（支持部分更新）
   * 
   * @remarks
   * 更新流程：
   * 1. 深度合并更新内容和当前状态
   * 2. 触发相关的副作用（CSS 更新、颜色模式等）
   * 3. 防抖保存到缓存
   * 
   * @example
   * ```ts
   * // 更新主题
   * preferencesManager.updatePreferences({
   *   theme: { mode: 'dark' }
   * })
   * 
   * // 更新多个配置
   * preferencesManager.updatePreferences({
   *   app: { locale: 'en-US' },
   *   theme: { colorPrimary: 'hsl(212 100% 45%)' }
   * })
   * ```
   */
  updatePreferences = (updates: DeepPartial<Preferences>): void => {
    // 深度合并更新内容和当前状态
    const mergedState = merge({}, updates, markRaw(this.state))
    Object.assign(this.state, mergedState)

    // 根据更新的值执行更新
    this.handleUpdates(updates)

    // 保存到缓存
    this.debouncedSave(this.state)
  }

  /**
   * 处理更新
   * 
   * @description
   * 根据更新的内容触发相应的副作用
   * 
   * @param updates - 更新的偏好设置
   * @private
   */
  private handleUpdates(updates: DeepPartial<Preferences>): void {
    const { theme, app } = updates

    if (
      theme &&
      (Object.keys(theme).length > 0 || Reflect.has(theme, 'fontSize'))
    ) {
      updateCSSVariables(this.state)
    }

    if (
      app &&
      (Reflect.has(app, 'colorGrayMode') || Reflect.has(app, 'colorWeakMode'))
    ) {
      this.updateColorMode(this.state)
    }
  }

  /**
   * 初始化平台标识
   * 
   * @description
   * 在 document.documentElement 上设置平台标识（macOS 或 Windows）
   * 
   * @private
   */
  private initPlatform(): void {
    document.documentElement.dataset.platform = isMacOs() ? 'macOs' : 'window'
  }

  /**
   * 从缓存加载偏好设置
   * 
   * @description
   * 从 localStorage 加载缓存的偏好设置
   * 
   * @returns 缓存的偏好设置，如果不存在则返回 null
   * @private
   */
  private loadFromCache(): null | Preferences {
    return this.cache.getItem<Preferences>(STORAGE_KEYS.MAIN)
  }

  /**
   * 保存偏好设置到缓存
   * 
   * @description
   * 将偏好设置保存到 localStorage
   * 
   * @param preference - 要保存的偏好设置
   * @private
   */
  private saveToCache(preference: Preferences): void {
    this.cache.setItem(STORAGE_KEYS.MAIN, preference)
    this.cache.setItem(STORAGE_KEYS.LOCALE, preference.app.locale)
    this.cache.setItem(STORAGE_KEYS.THEME, preference.theme.mode)
  }

  /**
   * 监听状态和系统偏好设置的变化
   * 
   * @description
   * 设置响应式监听器，监听窗口大小和系统主题变化
   * 
   * @private
   */
  private setupWatcher(): void {
    if (this.isInitialized) {
      return
    }

    // 监听断点，判断是否移动端
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isMobile = breakpoints.smaller('md')

    watch(
      () => isMobile.value,
      (val) => {
        this.updatePreferences({
          app: { isMobile: val },
        })
      },
      { immediate: true },
    )

    // 监听系统主题偏好设置变化
    globalThis
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        // 仅在自动模式下跟随系统主题
        if (this.state.theme.mode === 'auto') {
          // 先应用实际的主题
          this.updatePreferences({
            theme: { mode: isDark ? 'dark' : 'light' },
          })
          // 再恢复为 auto 模式，保持跟随系统的状态
          this.updatePreferences({
            theme: { mode: 'auto' },
          })
        }
      })
  }

  /**
   * 更新页面颜色模式（灰色、色弱）
   * 
   * @description
   * 根据偏好设置更新页面的颜色模式
   * 
   * @param preference - 偏好设置
   * @private
   */
  private updateColorMode(preference: Preferences): void {
    const { colorGrayMode, colorWeakMode } = preference.app
    const dom = document.documentElement

    dom.classList.toggle('invert-mode', colorWeakMode)
    dom.classList.toggle('grayscale-mode', colorGrayMode)
  }
}

// ============ 导出 ============

/**
 * 全局偏好设置管理器实例
 * 
 * @description
 * 单例模式的偏好设置管理器，全局共享
 * 
 * @example
 * ```ts
 * import { preferencesManager } from '@admin-core/composables'
 * 
 * await preferencesManager.initPreferences({ namespace: 'my-app' })
 * const prefs = preferencesManager.getPreferences()
 * ```
 */
const preferencesManager = new PreferenceManager()

export { PreferenceManager, preferencesManager, isDarkTheme }
