# @admin-core/shared

## 0.4.0

### Minor Changes

- 新增功能和优化
  - **日期快捷函数**：新增 12 个日期快捷函数（获取上个月最后一天、本月第一天、本年第一天等）
  - **状态管理优化**：使用 ES2025 私有字段优化 global-state 模块，新增 8 个实用方法
  - **轻量级状态管理**：创建 store 模块，提供 createStore、createDerivedStore、combineStores、createPersistedStore 等功能
  - **依赖管理**：统一使用 pnpm catalog 管理所有依赖，更新到最新版本
  - **CDN 支持增强**：新增 standalone 构建版本，包含所有依赖，适用于 CDN 直接引入
  - **文档完善**：新增依赖安装指南文档，说明依赖自动安装机制和 CDN 使用方式

## 0.3.0

### Minor Changes

- 新增功能和优化
  - **日期快捷函数**：新增 12 个日期快捷函数（获取上个月最后一天、本月第一天、本年第一天等）
  - **状态管理优化**：使用 ES2025 私有字段优化 global-state 模块，新增 8 个实用方法
  - **轻量级状态管理**：创建 store 模块，提供 createStore、createDerivedStore、combineStores、createPersistedStore 等功能
  - **依赖管理**：统一使用 pnpm catalog 管理所有依赖，更新到最新版本
  - **CDN 支持增强**：新增 standalone 构建版本，包含所有依赖，适用于 CDN 直接引入
  - **文档完善**：新增依赖安装指南文档，说明依赖自动安装机制和 CDN 使用方式

## 0.2.0

### Minor Changes

- 新增功能和优化
  - **日期快捷函数**：新增 12 个日期快捷函数（获取上个月最后一天、本月第一天、本年第一天等）
  - **状态管理优化**：使用 ES2025 私有字段优化 global-state 模块，新增 8 个实用方法
  - **轻量级状态管理**：创建 store 模块，提供 createStore、createDerivedStore、combineStores、createPersistedStore 等功能
  - **依赖管理**：统一使用 pnpm catalog 管理所有依赖，更新到最新版本
  - **CDN 支持增强**：新增 standalone 构建版本，包含所有依赖，适用于 CDN 直接引入
  - **文档完善**：新增依赖安装指南文档，说明依赖自动安装机制和 CDN 使用方式

## 0.1.8

### Patch Changes

- Enhance package keywords for better npm search visibility

## 0.1.7

### Patch Changes

- 完善 types 模块的注解和分类
  - **详细注解**：为所有类型添加完整的 JSDoc 注释和使用示例
  - **移除外部依赖**：移除对 vue-router 的依赖，自定义必要的类型
  - **类型优化**：优化 TabDefinition、MenuRecordRaw、RouteMeta 等类型定义
  - **代码组织**：按功能分类组织类型（基础工具、API、数据结构、用户、菜单、路由等）
  - **类型安全**：增强类型定义的完整性和准确性

## 0.1.6

### Patch Changes

- 优化 color 模块符合 ES2025/ESNext 最新标准
  - **函数式编程**：使用 `Object.fromEntries` 和 `flatMap` 重构 `generatorColorVariables` 函数
  - **代码简化**：减少中间变量，提高代码可读性和性能
  - **不可变性**：使用更现代的函数式方法处理数据
  - **代码组织**：将常量定义移到文件顶部，符合最佳实践
  - **性能优化**：减少循环嵌套，使用声明式编程风格

## 0.1.5

### Patch Changes

- 完善 constants 模块并拆分 index.ts
  - **模块化拆分**：将 constants 拆分为 8 个独立模块（datetime、pagination、app、storage、regex、file、http、animation）
  - **类型安全**：所有常量使用 `as const` 确保类型安全和不可变性
  - **TypeScript 类型**：导出类型定义（SupportedLocale、HttpStatus、HttpMethod、ContentType 等）
  - **代码优化**：优化 globals.ts 和 admin.ts，使用对象组织相关常量
  - **详细注释**：每个常量都有详细的中文说明
  - **最佳实践**：符合 ES2021+ 和 TypeScript 5.x 最新规范
  - **破坏性变更**：移除旧的常量导出方式，统一使用对象形式（如 `CSS_VARIABLES.LAYOUT_CONTENT_HEIGHT`、`ADMIN_URLS.GITHUB`）

## 0.1.4

### Patch Changes

- 优化代码符合最新 ES 规范和最佳实践
  - **TypeScript 现代化**：使用现代 JSDoc 语法（移除 `{type}` 标注）
  - **接口优化**：使用 `readonly` 修饰符增强不可变性
  - **常量提取**：提取魔法字符串为常量（`MAIN_COLOR_KEY`、`ANGLE_UNITS_REGEX`）
  - **性能优化**：使用 `for...of` 和 `Object.entries()` 替代 `forEach`
  - **代码简化**：简化 `isValidColor` 使用短路运算符
  - **不可变性**：返回值使用 `Object.freeze()` 和 `Readonly` 类型
  - **参数类型**：使用 `readonly` 数组参数类型提高类型安全
  - **变量提取**：避免重复计算，提取中间变量

## 0.1.3

### Patch Changes

- 移除 `import.meta` 使用以消除构建警告
  - 修复 CJS 和 IIFE 格式构建时的 `import.meta` 警告
  - 使用 `process.env` 替代 `import.meta.env` 以提高兼容性
  - 确保所有输出格式（ESM、CJS、IIFE）都能正常工作

## 0.1.2

### Patch Changes

- 完善颜色工具模块
  - 添加 `@ctrl/tinycolor` 和 `theme-colors` 依赖
  - 为所有颜色工具函数添加完整的 JSDoc 注释
  - 更新 TypeScript 配置支持 ES2021（支持 `replaceAll` 方法）
  - 导出 `ColorItem` 类型定义
  - 改进函数类型定义和返回值类型

## 0.1.1

### Patch Changes

- 添加 CDN 支持
  - 新增 UMD 格式构建（未压缩和压缩版本）
  - 支持通过 unpkg 和 jsDelivr CDN 直接使用
  - 全局变量名：`AdminCoreShared`

## 0.1.0

### Minor Changes

- 初始版本发布
  - 提供丰富的工具函数（防抖、节流、深度克隆、树形数据处理等）
  - 完整的常量定义（HTTP 状态码、存储键名、正则表达式等）
  - 完整的 TypeScript 类型定义（API 响应、分页、用户信息等）
  - 零依赖，轻量级
  - 支持 Tree-shaking
  - 提供中英文文档
