/**
 * 主题系统常量
 */

import type { ThemeMetadata, ThemeVariant } from './types'

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
 * 所有可用的主题元数据 - 2026流行色系列
 */
export const THEME_METADATA: ThemeMetadata[] = [
  {
    id: 'default',
    name: '经典蓝',
    icon: '🔵',
    description: '经典的蓝色主题，适合大多数场景',
    primaryColor: 'hsl(212, 100%, 48%)',
    category: 'colorful',
    isDefault: true,
  },
  {
    id: 'slate',
    name: '石板灰',
    icon: '🔘',
    description: '石板色主题，沉稳内敛',
    primaryColor: 'hsl(215, 20%, 40%)',
    category: 'neutral',
  },
  {
    id: 'burnished-lilac',
    name: '烟熏薰衣草',
    icon: '🪻',
    description: '2026流行色 - 优雅的薰衣草紫，展现高贵气质',
    primaryColor: 'hsl(280, 35%, 65%)',
    category: 'colorful',
  },
  {
    id: 'teaberry',
    name: '茶莓红',
    icon: '🌹',
    description: '2026流行色 - 浪漫的茶莓色，充满活力',
    primaryColor: 'hsl(345, 75%, 55%)',
    category: 'colorful',
  },
  {
    id: 'amaranth',
    name: '苋菜紫',
    icon: '💜',
    description: '2026流行色 - 神秘的苋菜紫，时尚前卫',
    primaryColor: 'hsl(310, 60%, 45%)',
    category: 'colorful',
  },
  {
    id: 'pulse-blue',
    name: '脉冲蓝',
    icon: '💙',
    description: '2026流行色 - 充满活力的脉冲蓝，现代时尚',
    primaryColor: 'hsl(200, 85%, 50%)',
    category: 'colorful',
  },
  {
    id: 'deep-teal',
    name: '深邃青',
    icon: '🩵',
    description: '2026流行色 - 深邃的青色，沉稳大气',
    primaryColor: 'hsl(180, 65%, 35%)',
    category: 'colorful',
  },
  {
    id: 'mermaid-aqua',
    name: '美人鱼蓝',
    icon: '🧜‍♀️',
    description: '2026流行色 - 梦幻的美人鱼蓝，清新可爱',
    primaryColor: 'hsl(185, 70%, 55%)',
    category: 'colorful',
  },
  {
    id: 'pearl-purple',
    name: '珍珠紫',
    icon: '🔮',
    description: '2026流行色 - 柔和的珍珠紫，优雅迷人',
    primaryColor: 'hsl(270, 45%, 70%)',
    category: 'colorful',
  },
  {
    id: 'burgundy',
    name: '勃艮第',
    icon: '🍷',
    description: '2026流行色 - 高端奢华的勃艮第红，尊贵典雅',
    primaryColor: 'hsl(345, 65%, 40%)',
    category: 'colorful',
  },
  {
    id: 'burnt-sienna',
    name: '焦赭石',
    icon: '🍂',
    description: '2026流行色 - 温暖的焦赭石色，自然大地',
    primaryColor: 'hsl(15, 60%, 50%)',
    category: 'colorful',
  },
  {
    id: 'olive-sage',
    name: '橄榄绿',
    icon: '🫒',
    description: '2026流行色 - 沉稳的橄榄绿，自然和谐',
    primaryColor: 'hsl(80, 30%, 45%)',
    category: 'colorful',
  },
  {
    id: 'champagne-gold',
    name: '香槟金',
    icon: '🥂',
    description: '2026流行色 - 奢华的香槟金，高贵优雅',
    primaryColor: 'hsl(45, 55%, 60%)',
    category: 'colorful',
  },
  {
    id: 'dusty-rose',
    name: '灰玫瑰',
    icon: '🌸',
    description: '2026流行色 - 柔和的灰玫瑰色，温柔可爱',
    primaryColor: 'hsl(350, 40%, 65%)',
    category: 'colorful',
  },
  {
    id: 'citrus-green',
    name: '柑橘绿',
    icon: '🍋',
    description: '2026流行色 - 清新的柑橘绿，充满生机',
    primaryColor: 'hsl(75, 70%, 50%)',
    category: 'colorful',
  },
]

/**
 * 按类别分组的主题
 */
export const THEMES_BY_CATEGORY = {
  colorful: THEME_METADATA.filter((t) => t.category === 'colorful'),
  neutral: THEME_METADATA.filter((t) => t.category === 'neutral'),
  monochrome: THEME_METADATA.filter((t) => t.category === 'monochrome'),
} as const

/**
 * 主题 ID 到元数据的映射
 */
export const THEME_MAP = new Map<ThemeVariant, ThemeMetadata>(
  THEME_METADATA.map((theme) => [theme.id, theme])
)
