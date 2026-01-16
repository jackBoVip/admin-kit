/**
 * @packageDocumentation
 * @module form
 *
 * AdminKit 表单模块（@admin-core/layouts/form）
 *
 * ## 设计目标
 * - **Schema 驱动**：通过 `FormSchema` 描述表单结构与校验规则
 * - **可扩展**：`setupAdminForm` 支持注册自定义组件映射与规则
 * - **双形态使用**
 *   - 简单：直接使用组件 `AdminForm`（可选）
 *   - 高级：使用 `useAdminForm` 获取 `Form` 组件 + `formApi` 实例进行编程式控制
 *
 * ## 重要说明
 * - 本模块依赖 `vee-validate`（表单状态/校验）与 `zod`（规则描述）
 * - 该包会再导出 `zod` 的命名空间：`export * as z from 'zod'`
 */

export { setupAdminForm } from './config';

export type {
  BaseFormComponentType,
  ExtendedFormApi,
  AdminFormProps,
  FormSchema as AdminFormSchema,
} from './types';

export * from './use-admin-form';
// export { default as AdminForm } from './admin-form.vue';
export * as z from 'zod';
