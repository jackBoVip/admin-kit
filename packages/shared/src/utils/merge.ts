/**
 * 对象合并工具模块
 * @description 提供对象合并相关的工具函数，使用 ES2025 最新特性优化
 * @module merge
 */

import { createDefu } from 'defu';

export { createDefu as createMerge, defu as merge } from 'defu';

/**
 * 创建一个数组覆盖合并函数
 * @description 在合并对象时，如果遇到数组，直接使用新数组覆盖旧数组，而不是合并数组元素
 * @example
 * ```typescript
 * const obj1 = { items: [1, 2, 3], name: 'old' }
 * const obj2 = { items: [4, 5], age: 20 }
 * 
 * // 使用默认 merge，数组会被合并
 * merge(obj1, obj2) // { items: [4, 5, 3], name: 'old', age: 20 }
 * 
 * // 使用 mergeWithArrayOverride，数组会被覆盖
 * mergeWithArrayOverride(obj1, obj2) // { items: [4, 5], name: 'old', age: 20 }
 * ```
 */
export const mergeWithArrayOverride = createDefu((originObj, key, updates) => {
  if (Array.isArray(originObj[key]) && Array.isArray(updates)) {
    originObj[key] = updates;
    return true;
  }
});
