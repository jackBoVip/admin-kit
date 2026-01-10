/**
 * 全局常量
 * 
 * 包含 CSS 变量名、元素 ID、命名空间等全局配置
 */

/**
 * CSS 变量名
 * 
 * 用于布局组件的 CSS 自定义属性
 */
export const CSS_VARIABLES = {
  /** layout content 组件的高度 */
  LAYOUT_CONTENT_HEIGHT: '--admin-content-height',
  
  /** layout content 组件的宽度 */
  LAYOUT_CONTENT_WIDTH: '--admin-content-width',
  
  /** layout header 组件的高度 */
  LAYOUT_HEADER_HEIGHT: '--admin-header-height',
  
  /** layout footer 组件的高度 */
  LAYOUT_FOOTER_HEIGHT: '--admin-footer-height',
} as const;

/**
 * 元素 ID
 * 
 * 应用中使用的特殊元素 ID
 */
export const ELEMENT_IDS = {
  /** 内容区域的组件 ID */
  MAIN_CONTENT: '__admin_main_content',
} as const;

/**
 * 默认命名空间
 * 
 * 用于组件、样式等的统一前缀
 */
export const DEFAULT_NAMESPACE = 'admin' as const;
