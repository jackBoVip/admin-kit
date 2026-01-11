/**
 * 临时类型声明文件
 * 用于解决 @admin-core/ui 包缺少类型声明的问题
 * TODO: 修复 @admin-core/ui 包的类型声明生成
 */
declare module '@admin-core/ui' {
  import type { Component } from 'vue';
  
  export const AdminButton: Component;
  export const AdminCheckbox: Component;
  export const Input: Component;
  export const AdminInputPassword: Component;
  export const AdminPinInput: Component;
  export const AdminSelect: Component;
  export const AdminExpandableArrow: Component;
  export const AdminHelpTooltip: Component;
  export const AdminRenderContent: Component;
  export const AdminTooltip: Component;
  export const Form: Component;
  export const FormControl: Component;
  export const FormDescription: Component;
  export const FormField: Component;
  export const FormItem: Component;
  export const FormLabel: Component;
  export const FormMessage: Component;
  
  export function createContext<T>(name: string): [
    () => T,
    (value: T) => void
  ];
  
  export type AdminButtonProps = any;
}
