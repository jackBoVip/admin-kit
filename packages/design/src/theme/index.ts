/**
 * 主题系统
 * 
 * 提供完整的主题管理功能，包括：
 * - 浅色/暗色模式切换
 * - 13+ 预设主题变体
 * - Vue Composables
 * - TypeScript 类型支持
 * - localStorage 持久化
 * - 系统主题跟随
 * 
 * @example
 * ```typescript
 * // Vue 组件中使用
 * import { useTheme } from '@admin-core/design/theme'
 * 
 * const { mode, variant, isDark, setMode, setVariant, toggleDarkMode } = useTheme()
 * 
 * // 切换暗色模式
 * toggleDarkMode()
 * 
 * // 设置主题变体
 * setVariant('violet')
 * 
 * // 设置完整主题
 * setTheme({ mode: 'dark', variant: 'violet' })
 * ```
 * 
 * @example
 * ```typescript
 * // 在非 Vue 环境中使用
 * import { applyTheme, toggleDarkMode, getAvailableThemes } from '@admin-core/design/theme'
 * 
 * // 应用主题
 * applyTheme({ mode: 'dark', variant: 'violet' })
 * 
 * // 切换暗色模式
 * toggleDarkMode()
 * 
 * // 获取所有可用主题
 * const themes = getAvailableThemes()
 * ```
 */

// 导出类型
export type {
  ThemeMode,
  ThemeVariant,
  ThemeCategory,
  ThemeMetadata,
  ThemeConfig,
  ThemeState,
  ThemeChangeOptions,
  UseThemeReturn,
  ColorToken,
  ColorValue,
  ThemeColors,
  ThemeEventType,
  ThemeEventCallback,
  ThemeEventListener,
} from './types'

// 导出常量
export {
  DEFAULT_THEME_MODE,
  DEFAULT_THEME_VARIANT,
  STORAGE_KEYS,
  CSS_CLASSES,
  HTML_ATTRIBUTES,
  THEME_TRANSITION_DURATION,
  THEME_METADATA,
  THEMES_BY_CATEGORY,
  THEME_MAP,
  getThemeMetadata,
} from './constants'

// 导出国际化
export {
  setLocale,
  getLocale,
  getTranslations,
  getThemeName,
  getThemeDescription,
  locales,
  DEFAULT_LOCALE,
  zhCN,
  enUS,
  type Locale,
  type ThemeTranslations,
} from './i18n'

// 导出工具函数
export {
  getHtmlElement,
  getStoredMode,
  getStoredVariant,
  storeMode,
  storeVariant,
  clearStoredTheme,
  applyMode,
  applyVariant,
  getCurrentMode,
  getCurrentVariant,
  applyTheme,
  enableTransition,
  disableTransition,
  toggleDarkMode,
  initTheme,
  detectSystemTheme,
  watchSystemTheme,
  getAvailableThemes,
  getThemeMetadataById,
  parseHSL,
  toHSLString,
  getCSSVariable,
  setCSSVariable,
  getThemeColor,
  isValidVariant,
  isValidMode,
  applyCustomTheme,
  getStoredCustomTheme,
  clearCustomTheme,
  restoreCustomTheme,
  hexToHSL,
  rgbToHSL,
  generateThemeFromPrimary,
  applyThemeFromPrimary,
} from './utils'

// 导出自定义主题类型
export type { CustomThemeColors } from './utils'

// 导出第三方集成工具
export {
  getHSLColor,
  getRGBColor,
  getHexColor,
  hslToRgb,
  hslToHex,
  getThemeColors,
  getThemeColorsRGB,
  getThemeColorsHex,
} from './integration'

// 导出 Vue Composables
export {
  useTheme,
  useSystemTheme,
  useThemeColor,
  useThemeTransition,
} from './composables'

// 默认导出
export { useTheme as default } from './composables'
