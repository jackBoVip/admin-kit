# @admin-kit/ui

## 0.0.8

### Patch Changes

- fix: 修复表单系统 componentProps 类型验证问题和 vee-validate 警告
  - 修复 form-field.vue 中 componentProps 的 prop 类型定义，允许 Function 和 Object
  - 修复 useFormField.ts 中 vee-validate "field not found" 警告
  - 优化表单字段的 props 传递逻辑，确保只传递 vee-validate Field 支持的 props

## 0.0.7

### Patch Changes

- 优化 Input 组件

## 0.0.6

### Patch Changes

- Updated dependencies
  - @admin-core/composables@0.1.4
  - @admin-core/shared@0.4.2

## 0.0.5

### Patch Changes

- Updated dependencies
  - @admin-core/shared@0.4.1
  - @admin-core/composables@0.1.3

## 0.0.4

### Patch Changes

- Enhance package keywords for better npm search visibility

## 0.0.3

### Patch Changes

- 移除未使用的依赖
  - 移除 `@admin-core/design`
  - 移除 `@admin-core/icons`
  - 保持包的轻量化，需要时再添加

## 0.0.2

### Patch Changes

- Updated dependencies
  - @admin-core/design@0.2.0

## 0.0.1

### Patch Changes

- Updated dependencies
  - @admin-kit/design@0.1.0
