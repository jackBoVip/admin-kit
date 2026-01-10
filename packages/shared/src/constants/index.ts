/**
 * 常量定义
 */

/**
 * 应用名称
 */
export const APP_NAME = 'Admin Kit'

/**
 * 应用版本
 */
export const APP_VERSION = '1.0.0'

/**
 * 默认语言
 */
export const DEFAULT_LOCALE = 'zh-CN'

/**
 * 支持的语言列表
 */
export const SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const

/**
 * 默认主题
 */
export const DEFAULT_THEME = 'default'

/**
 * 默认主题模式
 */
export const DEFAULT_THEME_MODE = 'light'

/**
 * 本地存储键名
 */
export const STORAGE_KEYS = {
  TOKEN: 'admin_token',
  USER_INFO: 'admin_user_info',
  THEME: 'admin_theme',
  THEME_MODE: 'admin_theme_mode',
  LOCALE: 'admin_locale',
  SIDEBAR_COLLAPSED: 'admin_sidebar_collapsed',
  TABS: 'admin_tabs',
} as const

/**
 * HTTP 状态码
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

/**
 * 请求方法
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const

/**
 * 内容类型
 */
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  TEXT: 'text/plain',
} as const

/**
 * 文件类型
 */
export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
  AUDIO: ['mp3', 'wav', 'ogg', 'aac', 'flac'],
  DOCUMENT: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
} as const

/**
 * 文件大小限制（字节）
 */
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  DEFAULT: 20 * 1024 * 1024, // 20MB
} as const

/**
 * 分页默认值
 */
export const PAGINATION = {
  PAGE: 1,
  PAGE_SIZE: 10,
  PAGE_SIZES: [10, 20, 50, 100],
} as const

/**
 * 日期格式
 */
export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  MONTH: 'YYYY-MM',
  YEAR: 'YYYY',
} as const

/**
 * 正则表达式
 */
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^1[3-9]\d{9}$/,
  URL: /^https?:\/\/.+/,
  IP: /^(\d{1,3}\.){3}\d{1,3}$/,
  ID_CARD: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{4,16}$/,
  CHINESE: /^[\u4e00-\u9fa5]+$/,
  NUMBER: /^\d+$/,
  DECIMAL: /^\d+(\.\d+)?$/,
} as const

/**
 * 动画持续时间（毫秒）
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

/**
 * 防抖/节流默认延迟（毫秒）
 */
export const DEBOUNCE_DELAY = 300
export const THROTTLE_DELAY = 300

/**
 * 请求超时时间（毫秒）
 */
export const REQUEST_TIMEOUT = 30000

/**
 * 重试次数
 */
export const RETRY_COUNT = 3

/**
 * 缓存过期时间（毫秒）
 */
export const CACHE_EXPIRY = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
} as const

