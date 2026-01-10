/**
 * 动画相关常量
 * 
 * 包含动画持续时间、缓动函数等
 */

/**
 * 动画持续时间（毫秒）
 */
export const ANIMATION_DURATION = {
  /** 极快：100ms */
  FASTEST: 100,
  
  /** 快速：150ms */
  FAST: 150,
  
  /** 正常：300ms */
  NORMAL: 300,
  
  /** 慢速：500ms */
  SLOW: 500,
  
  /** 极慢：800ms */
  SLOWEST: 800,
} as const;

/**
 * 缓动函数
 */
export const EASING_FUNCTIONS = {
  /** 线性 */
  LINEAR: 'linear',
  
  /** 缓入 */
  EASE_IN: 'ease-in',
  
  /** 缓出 */
  EASE_OUT: 'ease-out',
  
  /** 缓入缓出 */
  EASE_IN_OUT: 'ease-in-out',
  
  /** 三次贝塞尔曲线 */
  CUBIC_BEZIER: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * 防抖默认延迟（毫秒）
 */
export const DEBOUNCE_DELAY = 300 as const;

/**
 * 节流默认延迟（毫秒）
 */
export const THROTTLE_DELAY = 300 as const;

/**
 * 滚动节流延迟（毫秒）
 */
export const SCROLL_THROTTLE_DELAY = 100 as const;

/**
 * 窗口调整大小节流延迟（毫秒）
 */
export const RESIZE_THROTTLE_DELAY = 200 as const;
