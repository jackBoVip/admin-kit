/**
 * 本地存储常量
 * 
 * 定义应用中使用的所有本地存储键名
 */

/**
 * 本地存储键名
 * 
 * 统一管理所有 localStorage/sessionStorage 的键名，
 * 避免键名冲突和拼写错误
 */
export const STORAGE_KEYS = {
  /** 用户认证令牌 */
  TOKEN: 'admin_token',
  
  /** 用户信息 */
  USER_INFO: 'admin_user_info',
  
  /** 主题配置 */
  THEME: 'admin_theme',
  
  /** 主题模式（亮色/暗色） */
  THEME_MODE: 'admin_theme_mode',
  
  /** 语言设置 */
  LOCALE: 'admin_locale',
  
  /** 侧边栏折叠状态 */
  SIDEBAR_COLLAPSED: 'admin_sidebar_collapsed',
  
  /** 标签页配置 */
  TABS: 'admin_tabs',
  
  /** 用户偏好设置 */
  PREFERENCES: 'admin_preferences',
  
  /** 路由缓存 */
  ROUTE_CACHE: 'admin_route_cache',
} as const;

/**
 * 存储键名类型
 */
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

/**
 * 缓存过期时间（毫秒）
 */
export const CACHE_EXPIRY = {
  /** 1 分钟 */
  MINUTE: 60 * 1000,
  
  /** 1 小时 */
  HOUR: 60 * 60 * 1000,
  
  /** 1 天 */
  DAY: 24 * 60 * 60 * 1000,
  
  /** 1 周 */
  WEEK: 7 * 24 * 60 * 60 * 1000,
  
  /** 1 月 */
  MONTH: 30 * 24 * 60 * 60 * 1000,
} as const;
