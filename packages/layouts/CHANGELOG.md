# @admin-core/layouts

## 0.0.9

### Patch Changes

- fix: 修复表单系统 componentProps 类型验证问题和 vee-validate 警告
  - 修复 form-field.vue 中 componentProps 的 prop 类型定义，允许 Function 和 Object
  - 修复 useFormField.ts 中 vee-validate "field not found" 警告
  - 优化表单字段的 props 传递逻辑，确保只传递 vee-validate Field 支持的 props

- Updated dependencies
  - @admin-core/ui@0.0.8
