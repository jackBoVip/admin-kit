/**
 * 状态存储管理模块
 * @description 提供对 @tanstack/vue-store 的导出
 * @module store
 */

// 导出 @tanstack/vue-store 相关函数
// NOTE: 为了确保 tsup 构建后的运行时导出稳定，显式 re-export 关键成员
export { useStore, shallow } from '@tanstack/vue-store';
export type { NoInfer } from '@tanstack/vue-store';

// 额外导出 Store（供上层包在不直接依赖 @tanstack/store 的情况下使用）
export { Store } from '@tanstack/store';
export type { Derived } from '@tanstack/store';