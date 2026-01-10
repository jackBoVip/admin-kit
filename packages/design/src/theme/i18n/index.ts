/**
 * 国际化支持
 */

import { zhCN, type ThemeTranslations } from './zh-CN'
import { enUS } from './en-US'

export type Locale = 'zh-CN' | 'en-US'

/**
 * 所有支持的语言
 */
export const locales: Record<Locale, ThemeTranslations> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

/**
 * 默认语言
 */
export const DEFAULT_LOCALE: Locale = 'zh-CN'

/**
 * 当前语言（可以通过 setLocale 修改）
 */
let currentLocale: Locale = DEFAULT_LOCALE

/**
 * 设置当前语言
 */
export function setLocale(locale: Locale): void {
  if (locales[locale]) {
    currentLocale = locale
  } else {
    console.warn(`Locale "${locale}" is not supported, falling back to "${DEFAULT_LOCALE}"`)
    currentLocale = DEFAULT_LOCALE
  }
}

/**
 * 获取当前语言
 */
export function getLocale(): Locale {
  return currentLocale
}

/**
 * 获取当前语言的翻译
 */
export function getTranslations(): ThemeTranslations {
  return locales[currentLocale]
}

/**
 * 获取主题名称（国际化）
 */
export function getThemeName(themeId: string): string {
  const translations = getTranslations()
  return translations.themes[themeId as keyof typeof translations.themes]?.name || themeId
}

/**
 * 获取主题描述（国际化）
 */
export function getThemeDescription(themeId: string): string {
  const translations = getTranslations()
  return translations.themes[themeId as keyof typeof translations.themes]?.description || ''
}

// 导出类型和翻译
export type { ThemeTranslations }
export { zhCN, enUS }
