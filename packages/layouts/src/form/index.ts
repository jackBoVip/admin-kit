/**
 * Admin 表单模块
 * 
 * @description
 * 提供完整的表单解决方案，包括表单配置、类型定义、
 * 组合式函数和 Zod 验证库的导出
 */

/** 导出表单配置函数 */
export { setupAdminForm } from './config';

/** 导出表单相关类型定义 */
export type {
  BaseFormComponentType,
  ExtendedFormApi,
  AdminFormProps,
  FormSchema as AdminFormSchema,
} from './types';

/** 导出表单组合式函数 */
export * from './use-admin-form';

export * from './utils';


/** 导出 Zod 验证库 */
export * as z from 'zod';
