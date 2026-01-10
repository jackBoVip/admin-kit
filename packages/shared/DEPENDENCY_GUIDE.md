# 依赖安装指南

## 📦 通过 npm/pnpm/yarn 安装（推荐）

当你通过包管理器安装 `@admin-core/shared` 时，所有依赖会**自动安装**：

```bash
# 使用 pnpm
pnpm add @admin-core/shared

# 使用 npm
npm install @admin-core/shared

# 使用 yarn
yarn add @admin-core/shared
```

### ✅ 自动安装的依赖

以下依赖会自动安装到你的 `node_modules`，**无需手动安装**：

- `@ctrl/tinycolor` - 颜色处理
- `@vue/shared` - Vue 共享工具
- `clsx` - 类名合并
- `dayjs` - 日期处理
- `defu` - 对象合并
- `es-toolkit` - 现代工具库
- `lodash.clonedeep` - 深度克隆
- `nprogress` - 进度条
- `tailwind-merge` - Tailwind 类名合并
- `theme-colors` - 主题颜色

### 📝 使用示例

```typescript
import { formatDate, createStore, globalShareState } from '@admin-core/shared'

// 使用日期工具
const now = formatDate(new Date())

// 使用状态管理
const store = createStore({ count: 0 })

// 使用全局状态
globalShareState.setComponent('modal', ModalComponent)
```

---

## 🌐 通过 CDN 使用

### 方式 1：Standalone 版本（推荐）

使用包含所有依赖的独立版本：

```html
<!-- 从 unpkg -->
<script src="https://unpkg.com/@admin-core/shared/dist/index.umd.standalone.min.js"></script>

<!-- 从 jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@admin-core/shared/dist/index.umd.standalone.min.js"></script>

<script>
  // 全局变量 AdminCoreShared
  const { formatDate, createStore } = AdminCoreShared
  
  console.log(formatDate(new Date()))
</script>
```

### 方式 2：普通版本（需要手动引入依赖）

如果使用普通 UMD 版本，需要先引入所有依赖：

```html
<!-- 依赖 -->
<script src="https://unpkg.com/dayjs"></script>
<script src="https://unpkg.com/clsx"></script>
<script src="https://unpkg.com/nprogress"></script>
<!-- ... 其他依赖 ... -->

<!-- 主包 -->
<script src="https://unpkg.com/@admin-core/shared/dist/index.umd.min.js"></script>
```

---

## 📊 构建产物说明

| 文件 | 格式 | 依赖 | 用途 |
|------|------|------|------|
| `dist/index.js` | ESM | External | 现代打包工具（Vite、Webpack 5+） |
| `dist/index.cjs` | CJS | External | Node.js、旧版打包工具 |
| `dist/index.umd.js` | UMD | External | 浏览器（需手动引入依赖） |
| `dist/index.umd.min.js` | UMD (压缩) | External | 浏览器（需手动引入依赖） |
| `dist/index.umd.standalone.min.js` | UMD (独立) | Bundled | 浏览器（包含所有依赖）⭐ |

---

## 🎯 依赖策略说明

### 为什么依赖是 external？

1. **减小包体积** - 避免重复打包相同的依赖
2. **版本一致性** - 确保项目中使用统一版本的依赖
3. **Tree Shaking** - 允许打包工具进行更好的优化
4. **灵活性** - 用户可以选择自己需要的依赖版本

### 什么时候依赖会被打包？

- ✅ 使用 `standalone` 版本时（CDN 使用）
- ❌ 使用 ESM/CJS 版本时（npm 安装）

---

## 💡 常见问题

### Q: 我需要手动安装 es-toolkit 吗？

**A:** 不需要！当你通过 npm/pnpm/yarn 安装 `@admin-core/shared` 时，所有依赖会自动安装。

### Q: 为什么我的 node_modules 里有这些依赖？

**A:** 这是正常的。这些是 `@admin-core/shared` 的运行时依赖，必须安装才能正常工作。

### Q: 我可以使用不同版本的依赖吗？

**A:** 不推荐。我们在 `package.json` 中指定的版本是经过测试的，使用其他版本可能导致兼容性问题。

### Q: CDN 版本为什么这么大？

**A:** Standalone 版本包含了所有依赖，所以体积较大。如果你关心体积，建议使用 npm 安装并通过打包工具使用。

---

## 📚 相关文档

- [主 README](./README.md)
- [English README](./README.en.md)
- [Changelog](../../CHANGELOG.md)
