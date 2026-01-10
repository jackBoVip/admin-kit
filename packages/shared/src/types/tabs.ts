/**
 * 标签页相关类型定义
 */

/**
 * 标签页定义
 * 
 * 扩展路由位置信息，用于标签页管理
 * 
 * @example
 * ```ts
 * const tab: TabDefinition = {
 *   key: 'user-123',
 *   name: 'UserDetail',
 *   path: '/user/123',
 *   fullPath: '/user/123?tab=profile',
 *   meta: {
 *     title: '用户详情'
 *   }
 * };
 * ```
 */
export interface TabDefinition {
  /**
   * 标签页的唯一键
   * 
   * 用于标识和管理标签页，通常使用路由的 fullPath
   */
  key?: string;
  
  /**
   * 路由名称
   */
  name?: string | symbol;
  
  /**
   * 路由路径
   */
  path: string;
  
  /**
   * 完整路径（包含查询参数和 hash）
   */
  fullPath: string;
  
  /**
   * 路由元信息
   */
  meta?: Record<string, any>;
  
  /**
   * 路由参数
   */
  params?: Record<string, any>;
  
  /**
   * 查询参数
   */
  query?: Record<string, any>;
  
  /**
   * Hash 值
   */
  hash?: string;
}
