# @admin-kit/design

## 0.1.0

### Minor Changes

- 优化设计系统包
  - 迁移构建工具从 unbuild 到 vite
  - 添加 UMD 格式支持，支持 CDN 使用（unpkg 和 jsdelivr）
  - 优化 CSS 文件（light.css 和 dark.css）
    - 删除注释掉的代码
    - 移除未使用的 CSS 变量
    - 统一颜色格式
    - 简化暗色主题选择器
  - 新增 SCSS BEM 命名规范工具集
    - 支持 Block、Element、Modifier、State、When、Pseudo
    - 支持组合修饰符
    - 完整的中文文档和使用示例
    - 可通过 `@admin-kit/design/scss-bem` 导入
  - 更新依赖到最新版本
  - 添加完整的 README 文档
  - 修复 Rollup 弃用警告
