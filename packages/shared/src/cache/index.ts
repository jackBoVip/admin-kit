/**
 * Cache 模块
 * @description 提供浏览器存储管理功能，支持前缀、过期时间和类型安全
 * @module @admin-core/shared/cache
 * @example
 * ```typescript
 * import { StorageManager } from '@admin-core/shared/cache';
 * 
 * const storage = new StorageManager({ 
 *   prefix: 'myapp', 
 *   storageType: 'localStorage' 
 * });
 * 
 * // 设置存储项
 * storage.setItem('user', { name: 'John' });
 * 
 * // 获取存储项
 * const user = storage.getItem('user');
 * ```
 */

export * from './storage-manager';
export type * from './types';
