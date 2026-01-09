# Tailwind CSS v4 迁移说明

本项目已升级到 Tailwind CSS v4.0，这是一个全新的版本，带来了显著的性能提升和现代化的 CSS 特性。

## 🚀 主要变更

### 1. 导入方式改变

**v3 (旧语法):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 (新语法):**
```css
@import "tailwindcss";
```

### 2. 层级定义

v4 需要显式定义层级顺序：

```css
@layer theme, base, components, utilities;
```

### 3. 移除 @apply 指令

**v3 (旧语法):**
```css
.my-class {
  @apply text-primary bg-background;
}
```

**v4 (新语法):**
```css
.my-class {
  color: var(--color-primary);
  background-color: var(--color-background);
}
```

### 4. 使用 CSS 变量

v4 将所有设计令牌暴露为 CSS 变量：

```css
/* 颜色 */
var(--color-primary)
var(--color-background)
var(--color-foreground)
var(--color-border)

/* 字体 */
var(--font-family-sans)
var(--font-size-base)
```

## 📦 已更新的文件

### global.css
- ✅ 改用 `@import "tailwindcss"`
- ✅ 添加 `@layer` 定义
- ✅ 移除所有 `@apply` 指令
- ✅ 使用 CSS 变量替代工具类

### nprogress.css
- ✅ 移除 `@apply` 指令
- ✅ 使用原生 CSS 属性
- ✅ 使用 CSS 变量

### transition.css
- ✅ 无需修改（纯 CSS 动画）

### ui.css
- ✅ 无需修改（纯 CSS 样式）

## 🎯 性能提升

根据官方基准测试：

| 指标 | v3.4 | v4.0 | 提升 |
|---|---|---|---|
| 完整构建 | 378ms | 100ms | **3.78x** |
| 增量构建（新 CSS） | 44ms | 5ms | **8.8x** |
| 增量构建（无新 CSS） | 35ms | 192µs | **182x** |

## 🆕 新特性

### 1. CSS-first 配置

不再需要 `tailwind.config.js`，直接在 CSS 中配置：

```css
@theme {
  --color-primary: oklch(0.5 0.2 250);
  --font-family-sans: "Inter", sans-serif;
  --spacing-custom: 2.5rem;
}
```

### 2. 动态工具值

```css
/* 任意网格大小 */
grid-cols-7
grid-cols-13

/* 自定义数据属性 */
data-[state=open]:block
data-[disabled]:opacity-50

/* 动态间距 */
px-17
mt-23
```

### 3. 容器查询

```css
@min-lg:text-xl
@max-md:hidden
@min-sm/@max-lg:flex
```

### 4. 3D 变换

```css
rotate-x-45
rotate-y-90
scale-z-150
translate-z-10
```

### 5. 扩展的渐变 API

```css
/* 角度 */
bg-linear-45

/* 插值模式 */
bg-linear-to-r/oklch

/* 圆锥和径向渐变 */
bg-conic-to-r
bg-radial-to-br
```

### 6. @starting-style 支持

```css
starting:opacity-0
starting:scale-95
```

### 7. not-* 变体

```css
not-hover:opacity-50
not-focus:border-gray-300
not-[data-active]:hidden
```

## 📚 配置示例

### 主题配置

```css
@import "tailwindcss";

@theme {
  /* 颜色 */
  --color-primary: oklch(0.5 0.2 250);
  --color-secondary: oklch(0.6 0.15 180);
  
  /* 字体 */
  --font-family-sans: "Inter", system-ui, sans-serif;
  --font-family-mono: "Fira Code", monospace;
  
  /* 间距 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

### 自定义工具类

```css
@utility tab-* {
  tab-size: *;
}

@utility grid-area-* {
  grid-area: *;
}
```

### 自定义变体

```css
@variant hocus (&:hover, &:focus);
@variant supports-grid (supports(display: grid));
```

## 🔧 开发工具

### Vite 插件

```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [
    tailwindcss(),
  ],
}
```

### PostCSS 插件

```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

## ⚠️ 注意事项

### 1. @apply 限制

在 v4 中，`@apply` 在 `@layer base` 和 `@layer components` 中可能不工作。建议：
- 使用原生 CSS 属性
- 使用 CSS 变量
- 将样式移到 `@layer utilities`

### 2. 配置迁移

如果有 `tailwind.config.js`，需要迁移到 CSS：

**v3:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
}
```

**v4:**
```css
@theme {
  --color-primary: #3b82f6;
}
```

### 3. 插件兼容性

某些 v3 插件可能不兼容 v4，需要等待更新或寻找替代方案。

## 📖 相关资源

- [Tailwind CSS v4.0 官方博客](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 文档](https://tailwindcss.com/docs)
- [升级指南](https://tailwindcss.com/docs/upgrade-guide)
- [自动升级工具](https://github.com/tailwindlabs/tailwindcss-upgrade)

## 🎉 总结

Tailwind CSS v4 带来了：
- ✅ 显著的性能提升（3.5-182x）
- ✅ 更现代的 CSS 特性
- ✅ 更简洁的配置方式
- ✅ 更强大的工具类
- ✅ 更好的开发体验

项目已完全迁移到 v4，可以享受这些新特性和性能提升！
