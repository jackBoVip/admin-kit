/**
 * 分页相关常量
 * 
 * 定义分页的默认值和配置选项
 */

/**
 * 分页默认配置
 */
export const PAGINATION = {
  /** 默认页码 */
  PAGE: 1,
  
  /** 默认每页条数 */
  PAGE_SIZE: 10,
  
  /** 每页条数选项 */
  PAGE_SIZES: [10, 20, 50, 100] as const,
  
  /** 最大每页条数 */
  MAX_PAGE_SIZE: 1000,
} as const;

/**
 * 分页参数名称
 */
export const PAGINATION_PARAMS = {
  /** 页码参数名 */
  PAGE: 'page',
  
  /** 每页条数参数名 */
  PAGE_SIZE: 'pageSize',
  
  /** 总数参数名 */
  TOTAL: 'total',
} as const;
