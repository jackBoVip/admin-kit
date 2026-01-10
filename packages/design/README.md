# @admin-core/design

<div align="center">

**现代化的 Vue 3 设计系统**

基于 Tailwind CSS v4 的完整设计系统，提供主题管理、设计令牌和第三方组件库集成

[![npm version](https://img.shields.io/npm/v/@admin-core/design.svg)](https://www.npmjs.com/package/@admin-core/design)
[![License](https://img.shields.io/npm/l/@admin-core/design.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

[English](./README.en.md) | 简体中文

</div>

---

## ✨ 特性

- 🎨 **15+ 预设主题** - 2026 流行色系列，支持浅色/暗色模式
- 🔧 **Tailwind CSS v4** - 使用最新的 Tailwind CSS v4 特性
- 🎯 **设计令牌** - 基于 CSS 变量的设计令牌系统
- 🔌 **第三方集成** - 开箱即用的 Element Plus、Ant Design Vue 等组件库主题集成
- 🌍 **国际化** - 支持中英文主题名称和描述
- 🎭 **自定义主题** - 智能配色算法，只需选择主色即可生成完整主题
- 📦 **TypeScript** - 完整的 TypeScript 类型支持
- 🚀 **零配置** - 导入即用，无需复杂配置

---

## 📦 安装

```bash
# 使用 pnpm
pnpm add @admin-core/design

# 使用 npm
npm install @admin-core/design

# 使用 yarn
yarn add @admin-core/design
```

---

## 🚀 快速开始

### 基础使用

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 导入设计系统
import '@admin-core/design/css'

const app = createApp(App)
app.mount('#app')
```

### 在组件中使用

```vue
<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="card-box p-6 rounded-lg">
      <h1 class="text-2xl font-bold text-primary">欢迎使用 Admin Core</h1>
      <p class="text-muted-foreground mt-2">现代化的设计系统</p>
      
      <button class="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
        开始使用
      </button>
    </div>
  </div>
</template>
```

---

## 🎨 主题系统

### 切换暗色模式

```typescript
// 切换暗色模式
document.documentElement.classList.toggle('dark')
```

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

```typescript
// 设置主题
document.documentElement.setAttribute('data-theme', 'deep-teal')
```

```html
<!-- 深邃青主题 -->
<html data-theme="deep-teal">
  <body>...</body>
</html>

<!-- 暗色 + 深邃青主题 -->
<html class="dark" data-theme="deep-teal">
  <body>...</body>
</html>
```

### 可用主题（15 个 2026 流行色）

| 主题 ID | 名称 | 描述 |
|---------|------|------|
| `default` | 经典蓝 | 适合大多数场景的经典蓝色主题 |
| `slate` | 石板灰 | 专业沉稳的中性灰色调 |
| `burnished-lilac` | 烟熏薰衣草 | 优雅神秘的紫灰色调 |
| `teaberry` | 茶莓红 | 活力四射的玫瑰红色调 |
| `amaranth` | 苋菜紫 | 高贵典雅的深紫色调 |
| `pulse-blue` | 脉冲蓝 | 充满活力的明亮蓝色 |
| `deep-teal` | 深邃青 | 沉稳大气的青色调 |
| `mermaid-aqua` | 美人鱼蓝 | 清新梦幻的水蓝色 |
| `pearl-purple` | 珍珠紫 | 柔和优雅的淡紫色 |
| `burgundy` | 勃艮第 | 成熟稳重的酒红色 |
| `burnt-sienna` | 焦赭石 | 温暖复古的橙棕色 |
| `olive-sage` | 橄榄绿 | 自然清新的橄榄绿 |
| `champagne-gold` | 香槟金 | 奢华典雅的金色调 |
| `dusty-rose` | 灰玫瑰 | 温柔浪漫的粉灰色 |
| `citrus-green` | 柑橘绿 | 清新活力的柠檬绿 |

### 使用 Vue Composable

```vue
<script setup lang="ts">
import { useTheme } from '@admin-core/design'

const { 
  mode,           // 当前模式：'light' | 'dark'
  variant,        // 当前主题变体
  isDark,         // 是否暗色模式
  setMode,        // 设置模式
  setVariant,     // 设置主题变体
  toggleDarkMode, // 切换暗色模式
} = useTheme()

// 切换暗色模式
const handleToggle = () => {
  toggleDarkMode()
}

// 切换主题
const handleThemeChange = (theme: string) => {
  setVariant(theme)
}
</script>

<template>
  <div>
    <button @click="handleToggle">
      {{ isDark ? '切换到浅色' : '切换到暗色' }}
    </button>
    
    <select @change="handleThemeChange($event.target.value)">
      <option value="default">经典蓝</option>
      <option value="deep-teal">深邃青</option>
      <option value="teaberry">茶莓红</option>
    </select>
  </div>
</template>
```

---

## 🎯 自定义主题

### 智能配色

只需选择主色，系统会自动生成完整的配色方案：

```typescript
import { applyThemeFromPrimary } from '@admin-core/design'

// 使用 HEX 颜色
applyThemeFromPrimary('#8B5CF6')

// 使用 HSL 颜色
applyThemeFromPrimary('280 60% 50%')

// 指定模式并持久化
applyThemeFromPrimary('#8B5CF6', 'dark', true)
```

### 完全自定义

```typescript
import { applyCustomTheme } from '@admin-core/design'

applyCustomTheme({
  primary: '280 60% 50%',
  secondary: '280 30% 90%',
  accent: '280 55% 85%',
  // ... 更多颜色
}, true) // true 表示持久化到 localStorage
```

---

## 🔌 第三方组件库集成

### 一行代码集成

我们提供了开箱即用的第三方组件库主题集成文件：

#### Element Plus

```typescript
// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@admin-core/design/css'

// 一行代码集成！
import '@admin-core/design/css/integrations/element-plus.css'

app.use(ElementPlus)
```

#### Ant Design Vue

```typescript
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import '@admin-core/design/css'
import '@admin-core/design/css/integrations/ant-design-vue.css'

app.use(Antd)
```

#### Naive UI

```typescript
import naive from 'naive-ui'
import '@admin-core/design/css'
import '@admin-core/design/css/integrations/naive-ui.css'

app.use(naive)
```

#### Arco Design

```typescript
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import '@admin-core/design/css'
import '@admin-core/design/css/integrations/arco-design.css'

app.use(ArcoVue)
```

### 集成效果

✅ **主题自动同步** - 切换主题，组件库颜色立即更新  
✅ **暗色模式支持** - 切换暗色模式，组件库自动适配  
✅ **自定义主题** - 使用自定义主题，组件库同步应用  
✅ **零配置** - 无需任何额外配置  
✅ **高性能** - 基于 CSS 变量，性能优秀  

### 高级用法：使用 ConfigProvider

```vue
<template>
  <a-config-provider :theme="antdTheme">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useTheme, getRGBColor } from '@admin-core/design'

const { isDark } = useTheme()

const antdTheme = computed(() => ({
  algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: getRGBColor('primary'),
    colorSuccess: getRGBColor('success'),
    colorWarning: getRGBColor('warning'),
    colorError: getRGBColor('destructive'),
  },
}))
</script>
```

### 集成工具函数

```typescript
import { 
  getHSLColor,      // 获取 HSL 格式颜色
  getRGBColor,      // 获取 RGB 格式颜色
  getHexColor,      // 获取 HEX 格式颜色
  getThemeColors,   // 批量获取所有颜色（HSL）
  getThemeColorsRGB,// 批量获取所有颜色（RGB）
  getThemeColorsHex,// 批量获取所有颜色（HEX）
} from '@admin-core/design'

// 获取单个颜色
const primaryHSL = getHSLColor('primary')  // 'hsl(212, 100%, 48%)'
const primaryRGB = getRGBColor('primary')  // 'rgb(0, 102, 245)'
const primaryHex = getHexColor('primary')  // '#0066F5'

// 批量获取所有颜色
const allColors = getThemeColors()
```

---

## 🌍 国际化

### 设置语言

```typescript
import { setLocale, getLocale } from '@admin-core/design'

// 设置为英文
setLocale('en-US')

// 设置为中文
setLocale('zh-CN')

// 获取当前语言
const currentLocale = getLocale() // 'zh-CN' | 'en-US'
```

### 获取国际化主题信息

```typescript
import { getThemeName, getThemeDescription, getThemeMetadata } from '@admin-core/design'

// 获取主题名称（根据当前语言）
const name = getThemeName('deep-teal')
// 中文: '深邃青'
// 英文: 'Deep Teal'

// 获取主题描述
const description = getThemeDescription('deep-teal')
// 中文: '2026流行色 - 深邃的青色，沉稳大气'
// 英文: '2026 Trending Color - Deep teal, calm and atmospheric'

// 获取所有主题（自动国际化）
const themes = getThemeMetadata()
```

### 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { setLocale, getLocale, getThemeMetadata, type Locale } from '@admin-core/design'

const currentLocale = ref<Locale>(getLocale())
const themes = ref(getThemeMetadata())

const changeLanguage = (locale: Locale) => {
  setLocale(locale)
  currentLocale.value = locale
  themes.value = getThemeMetadata() // 重新获取以更新语言
}
</script>

<template>
  <div>
    <select v-model="currentLocale" @change="changeLanguage(currentLocale)">
      <option value="zh-CN">🇨🇳 中文</option>
      <option value="en-US">🇺🇸 English</option>
    </select>
    
    <select>
      <option v-for="theme in themes" :key="theme.id" :value="theme.id">
        {{ theme.icon }} {{ theme.name }}
      </option>
    </select>
  </div>
</template>
```

---

## 🎨 设计令牌

所有颜色都使用 HSL 格式的 CSS 变量定义，支持透明度修饰符：

### 基础颜色

```html
<!-- 背景和前景 -->
<div class="bg-background text-foreground">内容</div>

<!-- 卡片 -->
<div class="bg-card text-card-foreground">卡片内容</div>

<!-- 弹出层 -->
<div class="bg-popover text-popover-foreground">弹出内容</div>
```

### 语义颜色

```html
<!-- 主色 -->
<button class="bg-primary text-primary-foreground">主要按钮</button>

<!-- 次要色 -->
<button class="bg-secondary text-secondary-foreground">次要按钮</button>

<!-- 强调色 -->
<div class="bg-accent text-accent-foreground">强调内容</div>

<!-- 柔和色 -->
<div class="bg-muted text-muted-foreground">柔和内容</div>

<!-- 破坏性操作 -->
<button class="bg-destructive text-destructive-foreground">删除</button>
```

### 状态颜色

```html
<!-- 成功 -->
<div class="bg-success text-success-foreground">操作成功</div>

<!-- 警告 -->
<div class="bg-warning text-warning-foreground">警告信息</div>

<!-- 信息 -->
<div class="bg-info text-info-foreground">提示信息</div>
```

### 透明度修饰符

```html
<div class="bg-primary/10">10% 透明度</div>
<div class="bg-primary/50">50% 透明度</div>
<div class="bg-primary/90">90% 透明度</div>
```

### 在 CSS 中使用

```css
.my-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}

/* 使用透明度 */
.my-overlay {
  background-color: hsl(var(--primary) / 0.5);
}
```

---

## 🛠️ 工具类

### 布局工具类

```html
<!-- 水平居中 -->
<div class="flex-center">
  <div>居中内容</div>
</div>

<!-- 垂直居中 -->
<div class="flex-col-center">
  <div>垂直居中</div>
</div>

<!-- 卡片容器 -->
<div class="card-box p-6">
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</div>

<!-- 轮廓框 -->
<div class="outline-box">
  可点击的框
</div>

<div class="outline-box outline-box-active">
  激活状态的框
</div>
```

### 链接样式

```html
<a href="#" class="admin-link">链接文本</a>
```

---

## 📱 响应式设计

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card-box p-4">卡片 1</div>
  <div class="card-box p-4">卡片 2</div>
  <div class="card-box p-4">卡片 3</div>
</div>
```

---

## 🎭 特殊模式

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

---

## ⚙️ Tailwind CSS 配置

如果你的项目需要扩展 Tailwind 配置：

```typescript
// tailwind.config.ts
import designConfig from '@admin-core/design/tailwind.config'
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
      colors: {
        brand: '#FF6B6B',
      },
    },
  },
} satisfies Config
```

---

## 📚 API 参考

### 主题管理

```typescript
// Composable
const {
  mode,           // 当前模式
  variant,        // 当前主题变体
  isDark,         // 是否暗色模式
  setMode,        // 设置模式
  setVariant,     // 设置主题变体
  toggleDarkMode, // 切换暗色模式
  getCurrentThemeMetadata, // 获取当前主题元数据
} = useTheme()

// 工具函数
initTheme()                    // 初始化主题
applyTheme(config, options)    // 应用主题配置
detectSystemTheme()            // 检测系统主题
watchSystemTheme(callback)     // 监听系统主题变化
```

### 自定义主题

```typescript
// 智能配色
applyThemeFromPrimary(color, mode?, persist?)

// 完全自定义
applyCustomTheme(colors, persist?)

// 清除自定义主题
clearCustomTheme()

// 恢复自定义主题
restoreCustomTheme()
```

### 颜色工具

```typescript
// 获取颜色
getHSLColor(token)      // 获取 HSL 格式
getRGBColor(token)      // 获取 RGB 格式
getHexColor(token)      // 获取 HEX 格式

// 批量获取
getThemeColors()        // 所有颜色（HSL）
getThemeColorsRGB()     // 所有颜色（RGB）
getThemeColorsHex()     // 所有颜色（HEX）

// 颜色转换
hexToHSL(hex)          // HEX 转 HSL
rgbToHSL(r, g, b)      // RGB 转 HSL
hslToRgb(hsl)          // HSL 转 RGB
hslToHex(hsl)          // HSL 转 HEX
```

### 国际化

```typescript
setLocale(locale)              // 设置语言
getLocale()                    // 获取当前语言
getThemeName(themeId)          // 获取主题名称
getThemeDescription(themeId)   // 获取主题描述
getThemeMetadata()             // 获取所有主题元数据
getTranslations()              // 获取当前语言的翻译
```

---

## 🌐 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

---

## 📦 导出说明

```typescript
// 主入口
import '@admin-core/design'

// 只导入 CSS
import '@admin-core/design/css'

// 导入主题系统
import { useTheme, setLocale } from '@admin-core/design'

// 导入集成文件
import '@admin-core/design/css/integrations/element-plus.css'
import '@admin-core/design/css/integrations/ant-design-vue.css'
import '@admin-core/design/css/integrations/naive-ui.css'
import '@admin-core/design/css/integrations/arco-design.css'

// 导入 Tailwind 配置
import designConfig from '@admin-core/design/tailwind.config'
```

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

---

## 📄 许可证

MIT License © 2024 [Admin Kit Team](https://github.com/jackBoVip/admin-kit)

---

## 🔗 相关链接

- [GitHub 仓库](https://github.com/jackBoVip/admin-kit)
- [问题反馈](https://github.com/jackBoVip/admin-kit/issues)
- [更新日志](./CHANGELOG.md)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
