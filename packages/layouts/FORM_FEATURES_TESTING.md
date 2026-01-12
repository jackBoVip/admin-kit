# Admin Form 功能全面测试指南

本文档介绍了 admin-kit 中 form 组件的所有功能以及如何进行全面测试。

## 功能列表

### 1. 基础表单功能
- **基本字段渲染**: 支持多种输入组件（AdminInput, AdminSelect, AdminCheckbox等）
- **字段配置**: 支持 label、placeholder、defaultValue 等基本配置
- **表单布局**: 支持水平、垂直、行内布局模式
- **响应式设计**: 支持网格布局和断点控制

### 2. 表单验证功能
- **内置验证**: 支持 Zod 验证库进行类型安全验证
- **多种验证规则**: 
  - 必填验证
  - 长度验证（最小/最大）
  - 正则表达式验证
  - 数字范围验证
  - URL 验证
  - 自定义验证规则
- **实时验证**: 支持 onBlur、onChange、onInput 等时机的验证
- **错误提示**: 显示清晰的验证错误信息

### 3. 字段依赖功能
- **条件显示**: 根据其他字段值决定是否显示字段（show 选项）
- **条件渲染**: 根据其他字段值决定是否渲染字段（if 选项）
- **动态禁用**: 根据其他字段值动态禁用字段（disabled 选项）
- **动态必填**: 根据其他字段值动态设置必填状态（required 选项）
- **动态规则**: 根据其他字段值动态设置验证规则（rules 选项）
- **动态属性**: 根据其他字段值动态设置组件属性（componentProps 选项）

### 4. 高级功能
- **折叠展开**: 支持长表单的折叠展开功能，节省空间
- **自定义渲染**: 支持字段后缀、描述、帮助提示等
- **操作按钮定制**: 支持自定义提交/重置按钮
- **表单操作位置**: 支持操作按钮在不同位置（居左、居中、居右）
- **紧凑模式**: 移除表单每一项底部为校验信息预留的空间

### 5. 动态表单功能
- **动态字段管理**: 支持动态添加/删除字段
- **Schema 更新**: 支持运行时更新表单 Schema
- **响应式配置**: 支持响应式的表单配置

### 6. API 操作功能
- **setValues**: 批量设置表单字段的值
- **getValues**: 获取当前表单的所有值
- **setFieldValue**: 设置特定字段的值
- **validate**: 对整个表单进行验证
- **validateField**: 对特定字段进行验证
- **resetForm**: 重置表单到初始状态
- **updateSchema**: 动态更新表单字段配置
- **submitForm**: 手动提交表单
- **resetValidate**: 重置验证状态
- **getFieldComponentRef**: 获取字段组件实例
- **getFocusedField**: 获取当前聚焦的字段
- **getLatestSubmissionValues**: 获取最后一次提交的表单值
- **scrollToFirstError**: 滚动到第一个错误字段
- **setState/getState**: 设置/获取表单状态
- **merge**: 合并多个表单 API

## 测试页面说明

### 综合测试页面 (ComprehensiveFormDemo.vue)
包含了所有功能的综合展示，适合一次性查看所有功能。

### 分类测试页面
- **BasicFormDemo**: 基础表单功能测试
- **ValidationDemo**: 表单验证功能测试
- **DependenciesDemo**: 字段依赖功能测试
- **AdvancedDemo**: 高级功能测试
- **DynamicFormDemo**: 动态表单功能测试
- **ApiDemo**: API 操作功能测试

## 测试步骤

1. 启动开发服务器：
   ```bash
   cd packages/layouts/demo
   pnpm dev
   ```

2. 访问 `http://localhost:3001`

3. 切换不同的标签页进行功能测试

4. 在综合测试页面查看所有功能的集中展示

## 组件结构

### 主要组件
- **AdminForm**: 基础表单组件
- **useAdminForm**: 表单 Hook，提供表单实例和 API
- **FormApi**: 表单 API 类，提供丰富的操作方法
- **FormActions**: 表单操作按钮组件
- **FormField**: 表单字段组件

### 配置选项
- **FormSchema**: 定义表单字段的配置接口
- **AdminFormProps**: 定义表单的属性接口
- **FormItemDependencies**: 定义字段依赖的配置接口

## 使用示例

```typescript
import { useAdminForm, z } from '@admin-core/layouts';

const [Form, formApi] = useAdminForm({
  schema: [
    {
      component: 'AdminInput',
      fieldName: 'name',
      label: '姓名',
      rules: z.string().min(1, '请输入姓名'),
      componentProps: { placeholder: '请输入姓名' },
    },
    {
      component: 'AdminInput',
      fieldName: 'email',
      label: '邮箱',
      rules: z.string().email('请输入有效的邮箱'),
      componentProps: { placeholder: '请输入邮箱' },
    },
  ],
  handleSubmit: (values) => {
    console.log('提交的数据:', values);
  },
});
```

## 注意事项

1. FormActions 类型实际上是 FormContext<GenericObject> 的别名
2. 表单值通过 toRaw() 获取原始值，避免响应式代理问题
3. 验证失败时可以通过 scrollToFirstError 选项自动滚动到第一个错误字段
4. 动态更新 schema 时，需要确保每个字段都有唯一的 fieldName
5. 在生产环境中避免使用 setTimeout 来模拟异步操作