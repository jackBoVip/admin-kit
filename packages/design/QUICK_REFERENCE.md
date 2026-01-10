# @admin-core/design 快速参考

## 安装

```bash
pnpm add @admin-core/design
```

## 导入

```typescript
// 完整导入
import '@admin-core/design'

// 只导入 CSS
import '@admin-core/design/css'

// 使用 BEM 工具
import '@admin-core/design/scss-bem'
```

## 颜色令牌

| 令牌 | 用途 | 示例 |
|------|------|------|
| `bg-background` | 页面背景 | `<div class="bg-background">` |
| `bg-primary` | 主色 | `<button class="bg-primary">` |
| `bg-secondary` | 次要色 | `<button class="bg-secondary">` |
| `bg-destructive` | 危险操作 | `<button class="bg-destructive">` |
| `bg-success` | 成功状态 | `<div class="bg-success">` |
| `bg-warning` | 警告状态 | `<div class="bg-warning">` |
| `bg-info` | 信息提示 | `<div class="bg-info">` |
| `bg-card` | 卡片背景 | `<div class="bg-card">` |
| `bg-muted` | 柔和背景 | `<div class="bg-muted">` |

## 透明度修饰符

```html
<div class="bg-primary/50">50% 透明度</div>
<div class="bg-primary/75">75% 透明度</div>
<div class="bg-primary/90">90% 透明度</div>
```

## 圆角

```html
<div class="rounded-sm">小圆角</div>
<div class="rounded-md">中圆角</div>
<div class="rounded-lg">大圆角</div>
<div class="rounded-xl">超大圆角</div>
```

## 工具类

```html
<!-- 水平居中 -->
<div class="flex-center">内容</div>

<!-- 垂直居中 -->
<div class="flex-col-center">内容</div>

<!-- 卡片容器 -->
<div class="card-box">卡片</div>

<!-- 链接样式 -->
<a href="#" class="admin-link">链接</a>

<!-- 轮廓框 -->
<div class="outline-box">框</div>
```

## 主题切换

```typescript
// 暗色模式
document.documentElement.classList.toggle('dark')

// 主题变体
document.documentElement.setAttribute('data-theme', 'violet')
```

## 可用主题

`violet` | `pink` | `rose` | `sky-blue` | `deep-blue` | `green` | `deep-green` | `orange` | `yellow` | `zinc` | `neutral` | `slate` | `gray`

## Vue 过渡动画

```vue
<Transition name="fade">
  <div v-if="show">内容</div>
</Transition>
```

可用动画：`fade` | `slide-up` | `slide-down` | `slide-left` | `slide-right` | `fade-slide` | `fade-scale`

## Tailwind 动画

```html
<div class="animate-slide-down">滑入</div>
<div class="animate-fade-in">淡入</div>
<div class="animate-shrink">收缩</div>
```

## BEM 快速使用

```scss
@use '@admin-core/design/scss-bem' as *;

@include b(button) {
  // .admin-button
  @include e(icon) {
    // .admin-button__icon
  }
  @include m(primary) {
    // .admin-button--primary
  }
  @include is(disabled) {
    // .admin-button.is-disabled
  }
}
```

## 响应式

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>
```

## 暗色模式

```html
<!-- 自动适配 -->
<div class="bg-background text-foreground">内容</div>

<!-- 手动指定 -->
<div class="bg-white dark:bg-gray-900">内容</div>
```

## 常用组合

### 按钮

```html
<button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
  按钮
</button>
```

### 卡片

```html
<div class="card-box p-6 rounded-lg space-y-4">
  <h2 class="text-xl font-bold">标题</h2>
  <p class="text-muted-foreground">描述</p>
</div>
```

### 输入框

```html
<input 
  class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
  placeholder="输入内容"
/>
```

### 徽章

```html
<span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
  徽章
</span>
```

## 性能提示

```typescript
// ✅ 按需导入
import '@admin-core/design/css'

// ❌ 避免全量导入（如果只需要样式）
import '@admin-core/design'
```

## 调试

```typescript
// 查看当前主题
console.log(document.documentElement.getAttribute('data-theme'))

// 查看暗色模式状态
console.log(document.documentElement.classList.contains('dark'))

// 查看 CSS 变量值
console.log(getComputedStyle(document.documentElement).getPropertyValue('--primary'))
```

## 更多资源

- [完整文档](./README.md)
- [使用指南](./USAGE.md)
- [迁移指南](./TAILWIND_V4_MIGRATION.md)
- [BEM 工具文档](./src/scss-bem/README.md)
