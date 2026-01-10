/**
 * 主题系统常量
 */

import type { ThemeMetadata, ThemeVariant } from './types'
import { getThemeName, getThemeDescription } from './i18n'

/**
 * 默认主题模式
 */
export const DEFAULT_THEME_MODE = 'light'

/**
 * 默认主题变体
 */
export const DEFAULT_THEME_VARIANT: ThemeVariant = 'default'

/**
 * localStorage 键名
 */
export const STORAGE_KEYS = {
  MODE: 'theme-mode',
  VARIANT: 'theme-variant',
} as const

/**
 * CSS 类名
 */
export const CSS_CLASSES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const

/**
 * HTML 属性名
 */
export const HTML_ATTRIBUTES = {
  THEME: 'data-theme',
  MODE: 'data-mode',
} as const

/**
 * 主题切换过渡时间（毫秒）
 */
export const THEME_TRANSITION_DURATION = 300

/**
 * 主题基础配置（不含国际化文本）
 */
const THEME_BASE_CONFIG = [
  {
    id: 'default',
    icon: '🔵',
    primaryColor: 'hsl(212, 100%, 48%)',
    category: 'colorful',
    isDefault: true,
  },
  {
    id: 'slate',
    icon: '🔘',
    primaryColor: 'hsl(215, 20%, 40%)',
    category: 'neutral',
  },
  {
    id: 'burnished-lilac',
    icon: '🪻',
    primaryColor: 'hsl(280, 35%, 65%)',
    category: 'colorful',
  },
  {
    id: 'teaberry',
    icon: '🌹',
    primaryColor: 'hsl(345, 75%, 55%)',
    category: 'colorful',
  },
  {
    id: 'amaranth',
    icon: '💜',
    primaryColor: 'hsl(310, 60%, 45%)',
    category: 'colorful',
  },
  {
    id: 'pulse-blue',
    icon: '💙',
    primaryColor: 'hsl(200, 85%, 50%)',
    category: 'colorful',
  },
  {
    id: 'deep-teal',
    icon: '🩵',
    primaryColor: 'hsl(180, 65%, 35%)',
    category: 'colorful',
  },
  {
    id: 'mermaid-aqua',
    icon: '🧜‍♀️',
    primaryColor: 'hsl(185, 70%, 55%)',
    category: 'colorful',
  },
  {
    id: 'pearl-purple',
    icon: '🔮',
    primaryColor: 'hsl(270, 45%, 70%)',
    category: 'colorful',
  },
  {
    id: 'burgundy',
    icon: '🍷',
    primaryColor: 'hsl(345, 65%, 40%)',
    category: 'colorful',
  },
  {
    id: 'burnt-sienna',
    icon: '🍂',
    primaryColor: 'hsl(15, 60%, 50%)',
    category: 'colorful',
  },
  {
    id: 'olive-sage',
    icon: '🫒',
    primaryColor: 'hsl(80, 30%, 45%)',
    category: 'colorful',
  },
  {
    id: 'champagne-gold',
    icon: '🥂',
    primaryColor: 'hsl(45, 55%, 60%)',
    category: 'colorful',
  },
  {
    id: 'dusty-rose',
    icon: '🌸',
    primaryColor: 'hsl(350, 40%, 65%)',
    category: 'colorful',
  },
  {
    id: 'citrus-green',
    icon: '🍋',
    primaryColor: 'hsl(75, 70%, 50%)',
    category: 'colorful',
  },
] as const

/**
 * 获取所有可用的主题元数据（带国际化）
 */
export function getThemeMetadata(): ThemeMetadata[] {
  return THEME_BASE_CONFIG.map((theme) => ({
    ...theme,
    name: getThemeName(theme.id),
    description: getThemeDescription(theme.id),
  }))
}

/**
 * 所有可用的主题元数据 - 2026流行色系列
 * @deprecated 使用 getThemeMetadata() 以支持国际化
 */
export const THEME_METADATA: ThemeMetadata[] = getThemeMetadata()

/**
 * 按类别分组的主题
 */
export const THEMES_BY_CATEGORY = {
  get colorful() {
    return getThemeMetadata().filter((t) => t.category === 'colorful')
  },
  get neutral() {
    return getThemeMetadata().filter((t) => t.category === 'neutral')
  },
  get monochrome() {
    return getThemeMetadata().filter((t) => t.category === 'monochrome')
  },
} as const

/**
 * 主题 ID 到元数据的映射
 */
export const THEME_MAP = new Map<ThemeVariant, ThemeMetadata>(
  getThemeMetadata().map((theme) => [theme.id, theme])
)
