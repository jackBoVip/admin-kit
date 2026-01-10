# @admin-kit/design 使用指南

本文档提供详细的使用示例和最佳实践。

## 目录

- [快速开始](#快速开始)
- [Tailwind CSS 集成](#tailwind-css-集成)
- [主题定制](#主题定制)
- [BEM vs Tailwind](#bem-vs-tailwind)
- [最佳实践](#最佳实践)

## 快速开始

### 1. 在 Vue 项目中使用

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 导入设计系统
import '@admin-kit/design'

const app = createApp(App)
app.mount('#app')
```

### 2. 在组件中使用 Tailwind 工具类

```vue
<template>
  <div class="bg-background text-foreground">
    <div class="card-box p-6 rounded-lg">
      <h1 class="text-2xl font-bold text-primary">标题</h1>
      <p class="text-muted-foreground mt-2">描述文本</p>
      
      <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
        点击按钮
      </button>
    </div>
  </div>
</template>
```

### 3. 使用预定义的工具类

```vue
<template>
  <!-- 水平居中布局 -->
  <div class="flex-center h-screen">
    <div class="card-box p-8">
      <h2>居中内容</h2>
    </div>
  </div>
  
  <!-- 垂直居中布局 -->
  <div class="flex-col-center gap-4">
    <div>项目 1</div>
    <div>项目 2</div>
  </div>
  
  <!-- 链接样式 -->
  <a href="#" class="admin-link">查看更多</a>
</template>
```

## Tailwind CSS 集成

### 在项目中扩展 Tailwind 配置

如果你的项目需要自定义 Tailwind 配置，可以继承 design 包的配置：

```typescript
// tailwind.config.ts
import designConfig from '@admin-kit/design/tailwind.config'
import type { Config } from 'tailwindcss'

export default {
  // 继承 design 包的配置
  ...designConfig,
  
  // 扩展内容路径
  content: [
    ...designConfig.content,
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './index.html',
  ],
  
  // 扩展主题
  theme: {
    ...designConfig.theme,
    extend: {
      ...designConfig.theme.extend,
      
      // 添加自定义颜色
      colors: {
        ...designConfig.theme.extend.colors,
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... 更多色阶
        },
      },
      
      // 添加自定义间距
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      // 添加自定义字体
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  
  // 添加自定义插件
  plugins: [
    ...designConfig.plugins,
    // 你的插件
  ],
} satisfies Config
```

### 使用 @theme 自定义令牌

在你的项目 CSS 文件中，可以覆盖或扩展设计令牌：

```css
/* styles/custom-theme.css */
@import '@admin-kit/design/css';

@theme {
  /* 覆盖现有令牌 */
  --color-primary: 220 100% 50%;
  
  /* 添加新的令牌 */
  --color-brand: 280 100% 60%;
  --spacing-custom: 2.5rem;
}

/* 自定义组件样式 */
@layer components {
  .btn-brand {
    background-color: hsl(var(--color-brand));
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
  }
}
```

## 主题定制

### 动态切换主题

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
const theme = ref<string>()

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const setTheme = (themeName: string) => {
  theme.value = themeName
  document.documentElement.setAttribute('data-theme', themeName)
}

const removeTheme = () => {
  theme.value = undefined
  document.documentElement.removeAttribute('data-theme')
}
</script>

<template>
  <div>
    <!-- 暗色模式切换 -->
    <button @click="toggleDark">
      {{ isDark ? '切换到浅色' : '切换到暗色' }}
    </button>
    
    <!-- 主题选择器 -->
    <select @change="setTheme($event.target.value)">
      <option value="">默认主题</option>
      <option value="violet">紫色</option>
      <option value="pink">粉色</option>
      <option value="green">绿色</option>
      <option value="orange">橙色</option>
    </select>
  </div>
</template>
```

### 创建自定义主题变体

在你的项目中添加新的主题变体：

```css
/* styles/custom-themes.css */

/* 自定义蓝绿色主题 */
[data-theme='teal'] {
  --primary: 180 100% 40%;
  --primary-foreground: 0 0% 100%;
  --secondary: 180 50% 90%;
  --secondary-foreground: 180 100% 20%;
  /* ... 其他颜色 */
}

/* 暗色模式下的蓝绿色主题 */
.dark[data-theme='teal'] {
  --primary: 180 100% 50%;
  --primary-foreground: 180 100% 10%;
  --background: 180 20% 10%;
  --foreground: 0 0% 95%;
  /* ... 其他颜色 */
}
```

## BEM vs Tailwind

### 何时使用 BEM

BEM 适合用于：
1. **复杂组件的内部样式** - 当组件有复杂的内部结构时
2. **需要严格命名规范的团队** - 确保样式的可维护性
3. **组件库开发** - 提供清晰的 CSS API

```scss
// Button.scss
@use '@admin-kit/design/scss-bem' as *;

@include b(button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  
  @include e(icon) {
    margin-right: 0.5rem;
    font-size: 1.25rem;
  }
  
  @include e(text) {
    font-weight: 500;
  }
  
  @include m(primary) {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  @include m(secondary) {
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
  }
  
  @include m(large) {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }
  
  @include is(disabled) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
```

```vue
<template>
  <button class="admin-button admin-button--primary admin-button--large">
    <span class="admin-button__icon">🚀</span>
    <span class="admin-button__text">提交</span>
  </button>
</template>
```

### 何时使用 Tailwind

Tailwind 适合用于：
1. **快速原型开发** - 无需编写 CSS 即可快速构建界面
2. **布局和间距** - 使用工具类快速调整布局
3. **响应式设计** - 利用 Tailwind 的响应式修饰符
4. **简单组件** - 结构简单的组件直接使用工具类

```vue
<template>
  <button 
    class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
    :disabled="isDisabled"
  >
    <span class="text-xl">🚀</span>
    <span class="font-medium">提交</span>
  </button>
</template>
```

### 混合使用策略

推荐的混合使用策略：

```vue
<template>
  <!-- 使用 BEM 定义组件基础结构 -->
  <div class="admin-card">
    <!-- 使用 Tailwind 处理布局和间距 -->
    <div class="admin-card__header flex items-center justify-between p-4">
      <h3 class="text-lg font-semibold">标题</h3>
      <button class="admin-card__close-btn">×</button>
    </div>
    
    <div class="admin-card__body p-4 space-y-4">
      <!-- 内容 -->
    </div>
    
    <div class="admin-card__footer flex justify-end gap-2 p-4 border-t">
      <button class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
        取消
      </button>
      <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        确认
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@admin-kit/design/scss-bem' as *;

@include b(card) {
  background-color: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  
  @include e(close-btn) {
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius);
    
    &:hover {
      background-color: hsl(var(--muted));
    }
  }
}
</style>
```

## 最佳实践

### 1. 颜色使用

```vue
<template>
  <!-- ✅ 推荐：使用语义化颜色 -->
  <div class="bg-primary text-primary-foreground">主要操作</div>
  <div class="bg-destructive text-destructive-foreground">删除操作</div>
  
  <!-- ❌ 不推荐：使用具体颜色值 -->
  <div class="bg-blue-500 text-white">操作</div>
</template>
```

### 2. 响应式设计

```vue
<template>
  <!-- 使用 Tailwind 的响应式修饰符 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="card-box p-4">卡片 1</div>
    <div class="card-box p-4">卡片 2</div>
    <div class="card-box p-4">卡片 3</div>
  </div>
</template>
```

### 3. 暗色模式适配

```vue
<template>
  <!-- 使用 dark: 修饰符 -->
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    自动适配暗色模式的内容
  </div>
  
  <!-- 或使用设计令牌（自动适配） -->
  <div class="bg-background text-foreground">
    自动适配的内容
  </div>
</template>
```

### 4. 动画使用

```vue
<template>
  <!-- Vue 过渡动画 -->
  <Transition name="fade">
    <div v-if="show" class="card-box">内容</div>
  </Transition>
  
  <!-- Tailwind 动画类 -->
  <div class="animate-slide-down">滑入的内容</div>
  
  <!-- 组合使用 -->
  <Transition name="fade-scale">
    <div v-if="show" class="animate-shrink">
      组合动画
    </div>
  </Transition>
</template>
```

### 5. 性能优化

```typescript
// ✅ 推荐：按需导入
import '@admin-kit/design/css'

// ❌ 不推荐：导入所有内容（如果只需要样式）
import '@admin-kit/design'
```

### 6. TypeScript 类型支持

```typescript
// 定义主题类型
type Theme = 
  | 'violet' 
  | 'pink' 
  | 'rose' 
  | 'sky-blue' 
  | 'deep-blue' 
  | 'green' 
  | 'deep-green' 
  | 'orange' 
  | 'yellow' 
  | 'zinc' 
  | 'neutral' 
  | 'slate' 
  | 'gray'

// 主题管理器
class ThemeManager {
  private currentTheme?: Theme
  private isDark = false
  
  setTheme(theme: Theme) {
    this.currentTheme = theme
    document.documentElement.setAttribute('data-theme', theme)
  }
  
  toggleDark() {
    this.isDark = !this.isDark
    document.documentElement.classList.toggle('dark', this.isDark)
  }
  
  reset() {
    this.currentTheme = undefined
    this.isDark = false
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  }
}

export const themeManager = new ThemeManager()
```

## 常见问题

### Q: 如何在 Vite 项目中使用？

A: 确保安装了 Tailwind CSS 和 PostCSS：

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

然后在项目根目录创建 `postcss.config.js`：

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Q: 如何自定义 BEM 命名空间？

A: 在导入前覆盖 SCSS 变量：

```scss
// 自定义命名空间
$namespace: 'my-app';

// 导入 BEM 工具
@use '@admin-kit/design/scss-bem' as *;

@include b(button) {
  // 生成 .my-app-button
}
```

### Q: 如何禁用某些 Tailwind 功能？

A: 在你的 `tailwind.config.ts` 中配置：

```typescript
export default {
  corePlugins: {
    preflight: false, // 禁用基础样式重置
    container: false, // 禁用容器工具类
  },
} satisfies Config
```

### Q: 如何在 SSR 项目中使用？

A: 确保在服务端和客户端都导入样式：

```typescript
// server.ts
import '@admin-kit/design'

// client.ts
import '@admin-kit/design'
```

## 更多资源

- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [BEM 命名规范](http://getbem.com/)
- [CSS 变量指南](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
