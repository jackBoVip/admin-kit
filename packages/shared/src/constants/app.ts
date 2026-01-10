/**
 * 应用配置常量
 * 
 * 包含应用的基本配置信息，如名称、版本、语言等
 */

/**
 * 应用名称
 */
export const APP_NAME = 'Admin Kit' as const;

/**
 * 应用版本
 */
export const APP_VERSION = '1.0.0' as const;

/**
 * 默认语言
 */
export const DEFAULT_LOCALE = 'zh-CN' as const;

/**
 * 支持的语言列表
 */
export const SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const;

/**
 * 支持的语言类型
 */
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/**
 * 默认主题
 */
export const DEFAULT_THEME = 'default' as const;

/**
 * 默认主题模式
 */
export const DEFAULT_THEME_MODE = 'light' as const;

/**
 * 主题模式类型
 */
export type ThemeMode = 'light' | 'dark';
