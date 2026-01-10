/**
 * 工具函数模块
 * @description 提供各种实用工具函数，使用 ES2025 最新特性优化
 * @module utils
 */

// ==================== 异步工具 ====================
export * from './async';

// ==================== 环境判断 ====================
export * from './env';

// ==================== 验证工具 ====================
export * from './validation';

// ==================== 数组工具 ====================
export * from './array';

// ==================== 对象工具 ====================
export * from './object';
export { get, isEqual, set } from 'es-toolkit/compat';
export { default as cloneDeep } from 'lodash.clonedeep';

// ==================== 字符串工具 ====================
export * from './string';

// ==================== URL 工具 ====================
export * from './url';

// ==================== 文件工具 ====================
export * from './file';

// ==================== 剪贴板工具 ====================
export * from './clipboard';

// ==================== CSS 工具 ====================
export * from './css';

// ==================== DOM 工具 ====================
export * from './dom';

// ==================== 树形数据工具 ====================
export * from './tree';

// ==================== 日期工具 ====================
export * from './date';

// ==================== 差异比较工具 ====================
export * from './diff';

// ==================== 合并工具 ====================
export * from './merge';

// ==================== 通用工具 ====================
export * from './util';

// ==================== 其他工具 ====================
export * from './nprogress';
export * from './resources';
export * from './state-handler';

// Re-export from @vue/shared for compatibility
export { isFunction, isObject, isString } from '@vue/shared';

