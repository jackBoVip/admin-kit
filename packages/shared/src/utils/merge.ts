/**
 * 对象合并工具函数模块
 * @description 包含对象深度合并、数组覆盖等相关工具函数
 * @module merge
 */

import { defu } from 'defu';

// ============================================================================
// 对象合并工具函数
// ============================================================================

/**
 * 深度合并对象（使用 defu）
 * @description 深度合并多个对象，后面的对象会覆盖前面的，但会保留未定义的值
 * @param objects - 要合并的对象数组
 * @returns 合并后的对象
 * @example
 * ```typescript
 * merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function merge<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  return defu({}, ...objects) as T
}

/**
 * 创建具有数组覆盖行为的对象合并函数
 * @description 当遇到数组时，直接覆盖而不是合并
 * @returns 自定义合并函数
 * @example
 * ```typescript
 * const mergeWithArrayOverride = createMergeWithArrayOverride();
 * const result = mergeWithArrayOverride({ arr: [1, 2] }, { arr: [3, 4] });
 * // { arr: [3, 4] }  // 数组被覆盖而不是合并
 * ```
 */
export function createMergeWithArrayOverride() {
  return (originObj: any, key: string, updates: any) => {
    if (Array.isArray(originObj[key]) && Array.isArray(updates)) {
      originObj[key] = updates;
      return true;
    }
    return false; // 让默认行为处理其他情况
  };
}

/**
 * 深度合并对象（使用 defu 并覆盖数组）
 * @description 深度合并多个对象，但数组会被覆盖而不是合并，使用 ES2025 最佳实践
 * @param objects - 要合并的对象数组
 * @returns 合并后的对象
 * @example
 * ```typescript
 * mergeWithArrayOverride({ a: [1, 2], b: 2 }, { a: [3, 4], c: 4 })
 * // { a: [3, 4], b: 2, c: 4 }
 * ```
 */
export function mergeWithArrayOverride<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  // 使用 ES2025 最佳实践的自定义合并函数
  const customMerger = (target: any, source: any) => {
    // 使用 Object.entries() 和 for...of 循环 (ES2015+特性)
    for (const [key, value] of Object.entries(source)) {
      if (Array.isArray(target[key]) && Array.isArray(value)) {
        // 对于数组，直接覆盖而不是合并 (ES2025 最佳实践)
        target[key] = value;
      } else if (
        typeof target[key] === 'object' &&
        typeof value === 'object' &&
        target[key] !== null &&
        value !== null &&
        !Array.isArray(target[key]) &&
        !Array.isArray(value)
      ) {
        // 对于嵌套对象，递归合并
        customMerger(target[key], value);
      } else {
        // 其他情况，直接赋值
        target[key] = value;
      }
    }
    return target;
  };
  
  return objects.reduce((acc, obj) => customMerger(acc, obj), {}) as T;
}

// 导出 defu 相关函数，避免与已定义的merge函数冲突
export { createDefu as createMerge } from 'defu';