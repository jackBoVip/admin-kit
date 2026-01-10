/**
 * 主题系统类型定义
 */

/**
 * 主题模式
 */
export type ThemeMode = 'light' | 'dark'

/**
 * 主题变体 ID
 */
export type ThemeVariant =
  | 'default'
  | 'slate'
  | 'burnished-lilac'
  | 'teaberry'
  | 'amaranth'
  | 'pulse-blue'
  | 'deep-teal'
  | 'mermaid-aqua'
  | 'pearl-purple'
  | 'burgundy'
  | 'burnt-sienna'
  | 'olive-sage'
  | 'champagne-gold'
  | 'dusty-rose'
  | 'citrus-green'

/**
 * 主题类别
 */
export type ThemeCategory = 'colorful' | 'neutral' | 'monochrome'

/**
 * 主题元数据
 */
export interface ThemeMetadata {
  /** 主题 ID */
  id: ThemeVariant
  /** 主题名称 */
  name: string
  /** 主题图标（Emoji） */
  icon: string
  /** 主题描述 */
  description: string
  /** 主色（HSL 格式） */
  primaryColor: string
  /** 主题类别 */
  category: ThemeCategory
  /** 是否为默认主题 */
  isDefault?: boolean
}

/**
 * 主题配置
 */
export interface ThemeConfig {
  /** 当前模式（浅色/暗色） */
  mode: ThemeMode
  /** 当前主题变体 */
  variant: ThemeVariant
  /** 是否启用过渡动画 */
  enableTransition?: boolean
  /** 是否持久化到 localStorage */
  persist?: boolean
  /** localStorage 键名前缀 */
  storageKeyPrefix?: string
}

/**
 * 主题状态
 */
export interface ThemeState {
  /** 当前模式 */
  mode: ThemeMode
  /** 当前变体 */
  variant: ThemeVariant
  /** 是否正在切换主题 */
  isChanging: boolean
}

/**
 * 主题切换选项
 */
export interface ThemeChangeOptions {
  /** 是否启用过渡动画 */
  transition?: boolean
  /** 是否持久化 */
  persist?: boolean
}

/**
 * 主题 Composable 返回值
 */
export interface UseThemeReturn {
  /** 当前主题状态 */
  theme: ThemeState
  /** 当前模式 */
  mode: ThemeMode
  /** 当前变体 */
  variant: ThemeVariant
  /** 是否为暗色模式 */
  isDark: boolean
  /** 是否正在切换主题 */
  isChanging: boolean
  /** 设置主题模式 */
  setMode: (mode: ThemeMode, options?: ThemeChangeOptions) => void
  /** 设置主题变体 */
  setVariant: (variant: ThemeVariant, options?: ThemeChangeOptions) => void
  /** 切换暗色模式 */
  toggleDarkMode: (options?: ThemeChangeOptions) => void
  /** 设置完整主题 */
  setTheme: (config: Partial<ThemeConfig>, options?: ThemeChangeOptions) => void
  /** 获取所有可用主题 */
  getAvailableThemes: () => ThemeMetadata[]
  /** 获取当前主题元数据 */
  getCurrentThemeMetadata: () => ThemeMetadata | undefined
}

/**
 * 颜色令牌名称
 */
export type ColorToken =
  | 'background'
  | 'background-deep'
  | 'foreground'
  | 'card'
  | 'card-foreground'
  | 'popover'
  | 'popover-foreground'
  | 'primary'
  | 'primary-foreground'
  | 'secondary'
  | 'secondary-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'accent'
  | 'accent-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'info'
  | 'info-foreground'
  | 'success'
  | 'success-foreground'
  | 'warning'
  | 'warning-foreground'
  | 'border'
  | 'input'
  | 'ring'
  | 'sidebar'
  | 'sidebar-deep'
  | 'header'
  | 'menu'

/**
 * 颜色值（HSL 格式）
 */
export interface ColorValue {
  /** 色相 (0-360) */
  h: number
  /** 饱和度 (0-100) */
  s: number
  /** 亮度 (0-100) */
  l: number
  /** 透明度 (0-1) */
  a?: number
}

/**
 * 主题颜色映射
 */
export type ThemeColors = Partial<Record<ColorToken, string>>

/**
 * 主题事件类型
 */
export type ThemeEventType = 'mode-change' | 'variant-change' | 'theme-change'

/**
 * 主题事件回调
 */
export interface ThemeEventCallback {
  (state: ThemeState): void
}

/**
 * 主题事件监听器
 */
export interface ThemeEventListener {
  type: ThemeEventType
  callback: ThemeEventCallback
}
