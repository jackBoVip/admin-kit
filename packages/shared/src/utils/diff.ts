/**
 * 差异比较工具模块
 * @description 提供对象和数组差异比较相关的工具函数，使用 ES2025 最新特性优化
 * @module diff
 */

import { arraysEqual } from './array';

/**
 * 差异结果类型
 */
export type DiffResult<T> = Partial<{
  [K in keyof T]: T[K] extends object ? DiffResult<T[K]> : T[K];
}>;

// Re-export arraysEqual for convenience
export { arraysEqual };

/**
 * 深度比较两个对象，返回差异部分
 * @param obj1 - 第一个对象
 * @param obj2 - 第二个对象
 * @returns 差异对象，如果没有差异则返回空对象
 * @example
 * ```typescript
 * const obj1 = { a: 1, b: { c: 2, d: 3 } }
 * const obj2 = { a: 1, b: { c: 4, d: 3 } }
 * diff(obj1, obj2) // { b: { c: 4 } }
 * 
 * const arr1 = { items: [1, 2, 3] }
 * const arr2 = { items: [1, 2, 4] }
 * diff(arr1, arr2) // { items: [1, 2, 4] }
 * ```
 */
export function diff<T extends Record<string, any>>(obj1: T, obj2: T): DiffResult<T> {
  function findDifferences(o1: any, o2: any): any {
    // 处理数组
    if (Array.isArray(o1) && Array.isArray(o2)) {
      if (!arraysEqual(o1, o2)) {
        return o2;
      }
      return undefined;
    }
    
    // 处理对象
    if (
      typeof o1 === 'object' &&
      typeof o2 === 'object' &&
      o1 !== null &&
      o2 !== null
    ) {
      const diffResult: any = {};
      
      const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);
      
      for (const key of keys) {
        const valueDiff = findDifferences(o1[key], o2[key]);
        if (valueDiff !== undefined) {
          diffResult[key] = valueDiff;
        }
      }
      
      return Object.keys(diffResult).length > 0 ? diffResult : undefined;
    }
    
    // 处理基本类型
    return o1 === o2 ? undefined : o2;
  }
  
  return findDifferences(obj1, obj2);
}
