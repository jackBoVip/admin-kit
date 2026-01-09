# @admin-kit/design

设计系统（样式、令牌）

## 安装

```bash
# npm
npm install @admin-kit/design

# pnpm
pnpm add @admin-kit/design

# yarn
yarn add @admin-kit/design
```

## 使用方式

### 1. CSS 样式导入

#### ESM (推荐)

```typescript
import '@admin-kit/design/css'

// 使用 CSS 变量
// 在你的组件中直接使用设计令牌
```

#### CommonJS

```javascript
require('@admin-kit/design/css')
```

### 2. SCSS BEM 工具

如果你的项目使用 SCSS，可以导入 BEM 命名规范工具：

```scss
// 导入 BEM Mixin 工具
@use '@admin-kit/design/scss-bem' as *;

// 使用 BEM Mixin
@include b(button) {
  padding: 8px 16px;
  
  @include e(icon) {
    margin-right: 8px;
  }
  
  @include m(primary) {
    background: blue;
  }
  
  @include is(disabled) {
    opacity: 0.5;
  }
}
```

详细的 BEM 工具使用文档，请查看 [SCSS BEM 文档](./src/scss-bem/README.md)

### 3. CDN (UMD)

#### unpkg

```html
<!-- 样式 -->
<link rel="stylesheet" href="https://unpkg.com/@admin-kit/design/dist/style.css">

<!-- JavaScript -->
<script src="https://unpkg.com/@admin-kit/design/dist/index.umd.js"></script>
<script>
  // 全局变量 AdminKitDesign
  console.log(AdminKitDesign)
</script>
```

#### jsDelivr

```html
<!-- 样式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@admin-kit/design/dist/style.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@admin-kit/design/dist/index.umd.js"></script>
<script>
  console.log(AdminKitDesign)
</script>
```

## 包含内容

### 样式文件

- **global.css** - 全局样式、盒模型、滚动条、视图过渡
- **nprogress.css** - 进度条样式和旋转加载动画
- **transition.css** - Vue 过渡动画（滑动、淡入淡出、缩放等）
- **ui.css** - UI 组件样式（侧边内容、面包屑、弹窗层级等）
- **light.css** - 浅色主题 CSS 变量
- **dark.css** - 暗色主题 CSS 变量

---

# 设计令牌（Design Tokens）

## 概述

设计令牌是设计系统的基础，定义了应用中所有的颜色、间距、字体等视觉属性。通过 CSS 变量实现，可以轻松切换主题和适配暗色模式。

## 文件说明

### light.css - 浅色主题

**用途：**
- 定义浅色主题下的所有 CSS 变量
- 提供 12 种预设主题变体（default、violet、pink、rose、sky-blue、deep-blue、green、deep-green、orange、yellow、zinc、neutral、slate、gray）
- 作为整个设计系统的颜色基础

**核心变量：**
- `--background` - 页面背景色
- `--foreground` - 文字颜色
- `--primary` - 主题色
- `--secondary` - 次要色
- `--accent` - 强调色
- `--destructive` - 危险操作色
- `--success` - 成功提示色
- `--warning` - 警告提示色
- `--border` - 边框色
- `--input` - 输入框边框色
- `--card` - 卡片背景色
- `--popover` - 弹出层背景色

**使用示例：**
```html
<!-- 默认主题 -->
<html>
  <body>默认浅色主题</body>
</html>

<!-- 紫色主题 -->
<html data-theme="violet">
  <body>紫色浅色主题</body>
</html>
```

### dark.css - 暗色主题

**用途：**
- 定义暗色模式下的所有 CSS 变量
- 提供护眼的深色配色方案
- 支持与浅色主题相同的 12 种主题变体
- 通过 `.dark` 类名自动应用

**特点：**
- 背景色使用深色调（低亮度值）
- 前景色使用浅色调（高亮度值）
- 优化的对比度，确保文字可读性
- 减少夜间使用时的眼睛疲劳

**使用示例：**
```html
<!-- 暗色模式 -->
<html class="dark">
  <body>默认暗色主题</body>
</html>

<!-- 暗色模式 + 紫色主题 -->
<html class="dark" data-theme="violet">
  <body>紫色暗色主题</body>
</html>
```

## 主题系统

### 预设主题列表

| 主题名称 | data-theme 值 | 描述 |
|---------|--------------|------|
| 默认 | 不设置 | 蓝色系主题 |
| 紫罗兰 | `violet` | 紫色系主题 |
| 粉色 | `pink` | 粉色系主题 |
| 玫瑰 | `rose` | 玫瑰色系主题 |
| 天蓝 | `sky-blue` | 天蓝色系主题 |
| 深蓝 | `deep-blue` | 深蓝色系主题 |
| 绿色 | `green` | 绿色系主题 |
| 深绿 | `deep-green` | 深绿色系主题 |
| 橙色 | `orange` | 橙色系主题 |
| 黄色 | `yellow` | 黄色系主题 |
| 锌灰 | `zinc` | 锌灰色系主题 |
| 中性灰 | `neutral` | 中性灰色系主题 |
| 石板灰 | `slate` | 石板灰色系主题 |
| 灰色 | `gray` | 灰色系主题 |

### 主题切换实现

**JavaScript 切换：**
```javascript
// 切换到暗色模式
document.documentElement.classList.add('dark')

// 切换到浅色模式
document.documentElement.classList.remove('dark')

// 切换主题颜色
document.documentElement.setAttribute('data-theme', 'violet')
```

**Vue 组合式函数：**
```typescript
import { ref } from 'vue'

export function useTheme() {
  const isDark = ref(false)
  const theme = ref('default')

  const toggleDark = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return { isDark, theme, toggleDark, setTheme }
}
```

## CSS 变量使用

### 在组件中使用

```css
.my-button {
  /* 使用主题色 */
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  
  /* 使用边框色 */
  border: 1px solid hsl(var(--border));
  
  /* 使用圆角 */
  border-radius: var(--radius);
}

.my-button:hover {
  /* 使用强调色 */
  background-color: hsl(var(--accent));
}

.my-button.destructive {
  /* 使用危险色 */
  background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}
```

### 颜色值格式

所有颜色变量使用 HSL 格式（色相 饱和度 亮度），需要配合 `hsl()` 函数使用：

```css
/* ✅ 正确 */
background-color: hsl(var(--primary));

/* ❌ 错误 */
background-color: var(--primary);
```

### 透明度支持

可以通过 HSL 的第四个参数添加透明度：

```css
/* 50% 透明度的主题色 */
background-color: hsl(var(--primary) / 0.5);

/* 20% 透明度的边框色 */
border-color: hsl(var(--border) / 0.2);
```

## 变量分类

### 基础颜色
- `--background` / `--background-deep` - 背景色
- `--foreground` - 前景色（文字）
- `--border` - 边框色

### 组件颜色
- `--card` - 卡片背景
- `--popover` - 弹出层背景
- `--input` - 输入框边框
- `--muted` - 柔和背景

### 语义颜色
- `--primary` - 主题色（品牌色）
- `--secondary` - 次要色
- `--accent` - 强调色（悬停效果）
- `--destructive` - 危险操作（删除、警告）
- `--success` - 成功提示
- `--warning` - 警告提示
- `--info` - 信息提示

### 布局组件
- `--sidebar` - 侧边栏背景
- `--header` - 头部背景
- `--menu` - 菜单背景

### 其他
- `--radius` - 圆角大小
- `--ring` - 焦点环颜色
- `--overlay` - 遮罩颜色
- `--font-size-base` - 基础字体大小

## 最佳实践

1. **始终使用语义化变量**
   ```css
   /* ✅ 推荐 */
   color: hsl(var(--foreground));
   
   /* ❌ 不推荐 */
   color: #000000;
   ```

2. **为不同状态使用对应的颜色**
   ```css
   .button-primary { background: hsl(var(--primary)); }
   .button-danger { background: hsl(var(--destructive)); }
   .button-success { background: hsl(var(--success)); }
   ```

3. **利用前景色变量确保对比度**
   ```css
   .card {
     background: hsl(var(--card));
     color: hsl(var(--card-foreground));
   }
   ```

4. **使用 accent 系列实现悬停效果**
   ```css
   .menu-item {
     background: transparent;
   }
   
   .menu-item:hover {
     background: hsl(var(--accent));
     color: hsl(var(--accent-foreground));
   }
   ```

## 扩展自定义主题

如需添加新的主题变体，在对应的 CSS 文件中添加：

```css
/* light.css */
[data-theme='my-theme'] {
  --primary: 200 100% 50%;
  --primary-foreground: 0 0% 100%;
  /* ... 其他变量 */
}

/* dark.css */
.dark[data-theme='my-theme'] {
  --primary: 200 80% 40%;
  --primary-foreground: 0 0% 100%;
  /* ... 其他变量 */
}
```

---

## 构建输出

- `dist/index.js` - ESM 格式（已压缩）
- `dist/index.cjs` - CommonJS 格式（已压缩）
- `dist/index.umd.js` - UMD 格式，用于 CDN（已压缩）
- `dist/index.d.ts` - TypeScript 类型定义
- `dist/style.css` - 合并的样式文件（42.20 kB，gzip: 9.01 kB）

## 技术栈

- **构建工具**: Vite 7.x
- **样式**: Tailwind CSS v4 + 原生 CSS
- **类型定义**: TypeScript 5.x

## License

MIT
