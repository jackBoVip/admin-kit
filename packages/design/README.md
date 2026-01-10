# @admin-kit/design

基于 Tailwind CSS v4 的设计系统，提供完整的样式、令牌和主题管理解决方案。

## 功能特性

- ✅ **Tailwind CSS v4** - 使用最新的 Tailwind CSS v4 特性
- ✅ **主题系统** - 支持浅色/暗色模式，提供 13+ 预设主题
- ✅ **设计令牌** - 基于 CSS 变量的设计令牌系统
- ✅ **BEM 工具** - SCSS BEM 命名规范 Mixin 工具集
- ✅ **动画库** - 丰富的 Vue 过渡动画和 CSS 动画
- ✅ **TypeScript** - 完整的 TypeScript 类型支持

## 安装

```bash
pnpm add @admin-kit/design
```

## 使用方式

### 1. 导入完整样式

```typescript
// 导入所有样式和令牌
import '@admin-kit/design'
```

### 2. 按需导入

```typescript
// 只导入 CSS
import '@admin-kit/design/css'

// 只导入令牌
import '@admin-kit/design/tokens'
```

### 3. 使用 SCSS BEM 工具

```scss
@use '@admin-kit/design/scss-bem' as *;

@include b(button) {
  padding: 8px 16px;
  
  @include e(icon) {
    margin-right: 8px;
  }
  
  @include m(primary) {
    background: blue;
  }
}
```

## Tailwind CSS 配置

如果你的项目需要扩展 Tailwind 配置，可以继承本包的配置：

```typescript
// tailwind.config.ts
import designConfig from '@admin-kit/design/tailwind.config'
import type { Config } from 'tailwindcss'

export default {
  ...designConfig,
  content: [
    ...designConfig.content,
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    ...designConfig.theme,
    extend: {
      ...designConfig.theme.extend,
      // 你的自定义扩展
    },
  },
} satisfies Config
```

## 主题系统

### 切换暗色模式

```html
<!-- 浅色模式（默认） -->
<html>
  <body>...</body>
</html>

<!-- 暗色模式 -->
<html class="dark">
  <body>...</body>
</html>
```

### 切换主题变体

```html
<!-- 紫色主题 -->
<html data-theme="violet">
  <body>...</body>
</html>

<!-- 暗色 + 紫色主题 -->
<html class="dark" data-theme="violet">
  <body>...</body>
</html>
```

### 可用主题

- `violet` - 紫色主题
- `pink` - 粉色主题
- `rose` - 玫瑰色主题
- `sky-blue` - 天蓝色主题
- `deep-blue` - 深蓝色主题
- `green` - 绿色主题
- `deep-green` - 深绿色主题
- `orange` - 橙色主题
- `yellow` - 黄色主题
- `zinc` - 锌色主题
- `neutral` - 中性色主题
- `slate` - 石板色主题
- `gray` - 灰色主题

## 设计令牌

所有颜色都使用 HSL 格式的 CSS 变量定义，支持透明度修饰符：

```html
<!-- 使用 Tailwind 工具类 -->
<div class="bg-primary text-primary-foreground">主色按钮</div>
<div class="bg-primary/50">50% 透明度的主色背景</div>

<!-- 使用 CSS 变量 -->
<style>
.my-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
</style>
```

### 可用的颜色令牌

#### 基础颜色
- `--background` / `--foreground` - 背景和前景色
- `--card` / `--card-foreground` - 卡片颜色
- `--popover` / `--popover-foreground` - 弹出层颜色

#### 语义颜色
- `--primary` / `--primary-foreground` - 主色
- `--secondary` / `--secondary-foreground` - 次要色
- `--muted` / `--muted-foreground` - 柔和色
- `--accent` / `--accent-foreground` - 强调色
- `--destructive` / `--destructive-foreground` - 破坏性操作色

#### 状态颜色
- `--info` / `--info-foreground` - 信息提示色
- `--success` / `--success-foreground` - 成功提示色
- `--warning` / `--warning-foreground` - 警告提示色

#### 边框和输入
- `--border` - 边框颜色
- `--input` - 输入框边框颜色
- `--ring` - 焦点环颜色

#### 其他
- `--radius` - 圆角大小
- `--font-family` - 字体家族
- `--popup-z-index` - 弹出层层级

## 动画

### Vue 过渡动画

```vue
<template>
  <Transition name="fade">
    <div v-if="show">内容</div>
  </Transition>
</template>
```

可用的过渡动画：
- `fade` - 淡入淡出
- `slide-up` - 向上滑动
- `slide-down` - 向下滑动
- `slide-left` - 向左滑动
- `slide-right` - 向右滑动
- `fade-slide` - 淡入淡出 + 滑动
- `fade-scale` - 淡入淡出 + 缩放

### Tailwind 动画类

```html
<div class="animate-slide-down">向下滑入</div>
<div class="animate-fade-in">淡入</div>
<div class="animate-shrink">收缩动画</div>
```

## BEM 命名规范

使用 SCSS Mixin 快速生成 BEM 类名：

```scss
@use '@admin-kit/design/scss-bem' as *;

@include b(card) {
  // 生成 .admin-card
  padding: 16px;
  
  @include e(header) {
    // 生成 .admin-card__header
    font-weight: bold;
  }
  
  @include m(primary) {
    // 生成 .admin-card--primary
    border-color: blue;
  }
  
  @include is(active) {
    // 生成 .admin-card.is-active
    box-shadow: 0 0 10px blue;
  }
}
```

详细文档请查看 [BEM 工具文档](./src/scss-bem/README.md)。

## 工具类

### 布局工具类

```html
<!-- 水平居中 -->
<div class="flex-center">内容</div>

<!-- 垂直居中 -->
<div class="flex-col-center">内容</div>

<!-- 卡片容器 -->
<div class="card-box">卡片内容</div>

<!-- 轮廓框 -->
<div class="outline-box">可点击的框</div>
<div class="outline-box outline-box-active">激活状态</div>
```

### 链接样式

```html
<a href="#" class="admin-link">链接文本</a>
```

## 特殊模式

### 反色模式

```html
<html class="invert-mode">
  <body>所有颜色反转</body>
</html>
```

### 灰度模式

```html
<html class="grayscale-mode">
  <body>所有颜色变为灰度</body>
</html>
```

## 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化）
pnpm dev

# 构建
pnpm build
```

## 许可证

MIT

## 相关链接

- [Tailwind CSS v4 文档](https://tailwindcss.com/docs)
- [BEM 命名规范](http://getbem.com/)
- [HSL 颜色格式](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)
