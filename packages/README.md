# Admin Kit Packages

Admin Kit 是一个基于 Vue 3 的现代化管理后台组件库，采用 monorepo 架构管理多个包。

## 📦 包列表

### [@admin-kit/shared](./shared)
**共享工具、常量和类型**
- 构建工具：tsup
- 输出格式：ESM + CJS
- 用途：提供跨包共享的工具函数、常量定义和 TypeScript 类型

### [@admin-kit/icons](./icons)
**图标组件库**
- 构建工具：tsup
- 输出格式：ESM + CJS
- 依赖：@iconify/vue
- 用途：提供统一的图标组件封装

### [@admin-kit/design](./design)
**设计系统（样式、令牌）**
- 构建工具：unbuild
- 输出格式：ESM + CJS + CSS
- 用途：提供设计令牌（design tokens）和基础样式

### [@admin-kit/composables](./composables)
**Vue 组合式函数和状态管理**
- 构建工具：tsup
- 输出格式：ESM + CJS
- 依赖：@vueuse/core
- 用途：提供可复用的 Vue 组合式函数（Composables）

### [@admin-kit/ui](./ui)
**基础 UI 组件库**
- 构建工具：vite
- 输出格式：ESM + CJS + UMD
- CDN 支持：unpkg, jsdelivr
- 依赖：@admin-kit/design, @admin-kit/icons
- 用途：提供基础 UI 组件（按钮、输入框、表单等）

### [@admin-kit/layouts](./layouts)
**布局和业务组件**
- 构建工具：vite
- 输出格式：ESM + CJS + UMD
- CDN 支持：unpkg, jsdelivr
- 依赖：@admin-kit/ui, @admin-kit/composables
- 用途：提供布局组件和业务组件（导航、侧边栏、页面布局等）

## 🛠️ 构建工具选择

| 包 | 构建工具 | 原因 |
|---|---|---|
| shared | tsup | 纯 TypeScript 工具库，tsup 快速且简单 |
| icons | tsup | Vue 组件但无样式，tsup 足够轻量 |
| design | unbuild | 需要处理 CSS/SCSS，unbuild 支持更好 |
| composables | tsup | Vue 组合式函数，无需复杂构建 |
| ui | vite | 完整的 Vue 组件库，需要 UMD 支持 CDN |
| layouts | vite | 完整的 Vue 组件库，需要 UMD 支持 CDN |

## 📤 发布格式

### NPM 包
所有包都支持通过 npm/pnpm/yarn 安装：

```bash
# 安装单个包
pnpm add @admin-kit/ui

# 安装多个包
pnpm add @admin-kit/ui @admin-kit/layouts @admin-kit/icons
```

### CDN 引入
UI 和 Layouts 包支持通过 CDN 直接引入：

```html
<!-- unpkg -->
<script src="https://unpkg.com/@admin-kit/ui"></script>
<script src="https://unpkg.com/@admin-kit/layouts"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@admin-kit/ui"></script>
<script src="https://cdn.jsdelivr.net/npm/@admin-kit/layouts"></script>
```

## 🔧 开发命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 构建单个包
pnpm --filter @admin-kit/ui build

# 开发模式（监听文件变化）
pnpm --filter @admin-kit/ui dev

# 格式化代码
pnpm format
```

## 📝 包依赖关系

```
@admin-kit/shared (基础)
    ↓
@admin-kit/design (样式)
    ↓
@admin-kit/icons (图标)
    ↓
@admin-kit/composables (组合式函数)
    ↓
@admin-kit/ui (基础组件)
    ↓
@admin-kit/layouts (布局组件)
```

## 🚀 发布流程

使用 changesets 管理版本和发布：

```bash
# 1. 创建 changeset
pnpm changeset

# 2. 更新版本号
pnpm version-packages

# 3. 发布到 npm
pnpm release
```

## 📄 License

MIT
