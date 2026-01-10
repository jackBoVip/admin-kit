# @admin-core/icons

<div align="center">

**Vue 3 图标组件库**

基于 Iconify 和 Lucide 的完整图标解决方案，支持按需加载和自定义图标

[![npm version](https://img.shields.io/npm/v/@admin-core/icons.svg)](https://www.npmjs.com/package/@admin-core/icons)
[![License](https://img.shields.io/npm/l/@admin-core/icons.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

[English](./README.en.md) | 简体中文

</div>

---

## ✨ 特性

- 🎨 **多图标库支持** - 集成 Iconify（150,000+ 图标）和 Lucide（1,000+ 图标）
- 📦 **按需加载** - 只打包使用的图标，优化包体积
- 🔧 **易于使用** - 简单的 API，开箱即用
- 🎯 **TypeScript** - 完整的 TypeScript 类型支持
- 🚀 **高性能** - 基于 SVG，渲染性能优秀
- 🎭 **自定义图标** - 支持添加自定义图标集
- 🌈 **样式灵活** - 支持自定义颜色、大小等样式

---

## 📦 安装

```bash
# 使用 pnpm
pnpm add @admin-core/icons

# 使用 npm
npm install @admin-core/icons

# 使用 yarn
yarn add @admin-core/icons
```

---

## 🚀 快速开始

### 使用 Lucide 图标（推荐）

Lucide 图标已预先导入，可以直接使用：

```vue
<script setup lang="ts">
import { Menu, Settings, User, Search } from '@admin-core/icons'
</script>

<template>
  <div>
    <Menu :size="24" />
    <Settings :size="24" color="blue" />
    <User :size="24" :stroke-width="2" />
    <Search :size="24" />
  </div>
</template>
```

### 使用 Iconify 图标

Iconify 支持 150,000+ 图标，按需加载：

```vue
<script setup lang="ts">
import { IconifyIcon } from '@admin-core/icons'
</script>

<template>
  <div>
    <!-- Material Design Icons -->
    <IconifyIcon icon="mdi:home" :width="24" />
    
    <!-- Font Awesome -->
    <IconifyIcon icon="fa:user" :width="24" />
    
    <!-- Bootstrap Icons -->
    <IconifyIcon icon="bi:github" :width="24" />
    
    <!-- Ant Design Icons -->
    <IconifyIcon icon="ant-design:setting-outlined" :width="24" />
  </div>
</template>
```

### 创建自定义图标组件

```typescript
import { createIconifyIcon } from '@admin-core/icons'

// 创建一个自定义图标组件
const MyCustomIcon = createIconifyIcon('mdi:account-circle')

// 在组件中使用
export default {
  components: {
    MyCustomIcon
  }
}
```

---

## 📚 可用的 Lucide 图标

包中预导出了常用的 Lucide 图标：

### 导航图标
- `Menu` - 菜单
- `ChevronLeft`, `ChevronRight`, `ChevronDown` - 箭头
- `ChevronsLeft`, `ChevronsRight` - 双箭头
- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown` - 方向箭头
- `ExternalLink` - 外部链接

### 操作图标
- `Search`, `SearchX` - 搜索
- `Plus`, `X` - 添加、关闭
- `Check` - 勾选
- `Copy` - 复制
- `RotateCw` - 刷新
- `Settings` - 设置
- `Ellipsis` - 更多

### 状态图标
- `Circle`, `Square` - 形状
- `CircleCheckBig`, `SquareCheckBig` - 选中
- `CircleAlert`, `CircleX` - 警告、错误
- `CircleHelp`, `Info` - 帮助、信息
- `LoaderCircle` - 加载中

### 界面图标
- `Eye`, `EyeOff` - 显示、隐藏
- `Maximize`, `Minimize`, `Minimize2` - 最大化、最小化
- `Fullscreen`, `Expand`, `Shrink` - 全屏、展开、收缩
- `PanelLeft`, `PanelRight` - 面板
- `Pin`, `PinOff` - 固定、取消固定

### 主题图标
- `Sun`, `MoonStar`, `SunMoon` - 浅色、暗色、自动
- `Palette`, `SwatchBook` - 调色板、主题

### 用户图标
- `UserRoundPen` - 用户编辑
- `LockKeyhole` - 锁定
- `LogOut` - 登出

### 其他图标
- `Bell` - 通知
- `Inbox` - 收件箱
- `MailCheck` - 邮件
- `BookOpenText` - 文档
- `Github` - GitHub
- `Languages` - 语言

查看完整列表：[Lucide Icons](https://lucide.dev/icons/)

---

## 🎨 图标样式

### Lucide 图标属性

```vue
<template>
  <!-- 大小 -->
  <Menu :size="24" />
  <Menu :size="32" />
  
  <!-- 颜色 -->
  <Menu color="red" />
  <Menu color="#3b82f6" />
  
  <!-- 线条宽度 -->
  <Menu :stroke-width="1.5" />
  <Menu :stroke-width="2.5" />
  
  <!-- 绝对定位 -->
  <Menu :absolute-stroke-width="true" />
  
  <!-- CSS 类名 -->
  <Menu class="text-blue-500 hover:text-blue-700" />
</template>
```

### Iconify 图标属性

```vue
<template>
  <!-- 宽度和高度 -->
  <IconifyIcon icon="mdi:home" :width="24" />
  <IconifyIcon icon="mdi:home" :width="32" :height="32" />
  
  <!-- 颜色 -->
  <IconifyIcon icon="mdi:home" color="red" />
  
  <!-- 翻转 -->
  <IconifyIcon icon="mdi:home" :horizontal="true" />
  <IconifyIcon icon="mdi:home" :vertical="true" />
  
  <!-- 旋转 -->
  <IconifyIcon icon="mdi:home" :rotate="90" />
  <IconifyIcon icon="mdi:home" :rotate="180" />
  
  <!-- CSS 类名 -->
  <IconifyIcon icon="mdi:home" class="text-blue-500" />
</template>
```

---

## 🔧 高级用法

### 添加自定义图标集

```typescript
import { addCollection, addIcon } from '@admin-core/icons'

// 添加整个图标集
addCollection({
  prefix: 'custom',
  icons: {
    'icon1': {
      body: '<path d="..." fill="currentColor"/>',
      width: 24,
      height: 24,
    },
    'icon2': {
      body: '<path d="..." fill="currentColor"/>',
      width: 24,
      height: 24,
    },
  },
})

// 添加单个图标
addIcon('custom:my-icon', {
  body: '<path d="..." fill="currentColor"/>',
  width: 24,
  height: 24,
})
```

### 列出可用图标

```typescript
import { listIcons } from '@admin-core/icons'

// 列出指定前缀的所有图标
const icons = listIcons('mdi')
console.log(icons) // ['mdi:home', 'mdi:account', ...]
```

### 在 Tailwind CSS 中使用

```vue
<template>
  <div class="flex items-center gap-2">
    <Menu class="w-6 h-6 text-primary" />
    <Settings class="w-5 h-5 text-gray-500 hover:text-gray-700" />
    <User class="w-4 h-4 text-blue-500" />
  </div>
</template>
```

---

## 🌐 Iconify 图标库

Iconify 支持超过 150 个图标集，包括：

| 图标集 | 前缀 | 数量 | 描述 |
|--------|------|------|------|
| Material Design Icons | `mdi` | 7,000+ | Google Material Design 图标 |
| Font Awesome | `fa`, `fa6-solid` | 2,000+ | 最流行的图标库 |
| Bootstrap Icons | `bi` | 2,000+ | Bootstrap 官方图标 |
| Ant Design Icons | `ant-design` | 800+ | Ant Design 图标 |
| Heroicons | `heroicons` | 300+ | Tailwind CSS 团队设计 |
| Feather Icons | `feather` | 280+ | 简洁优雅的图标 |
| Tabler Icons | `tabler` | 4,000+ | 可定制的开源图标 |
| Carbon Icons | `carbon` | 2,000+ | IBM 设计系统图标 |
| Remix Icon | `ri` | 2,800+ | 中性风格图标 |
| Phosphor Icons | `ph` | 6,000+ | 灵活的图标系统 |

浏览所有图标：[Iconify Icon Sets](https://icon-sets.iconify.design/)

---

## 📱 响应式图标

```vue
<template>
  <!-- 响应式大小 -->
  <Menu class="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
  
  <!-- 响应式颜色 -->
  <Settings class="text-gray-500 dark:text-gray-400" />
  
  <!-- 响应式显示 -->
  <div class="hidden md:block">
    <Search :size="24" />
  </div>
</template>
```

---

## 🎯 最佳实践

### 1. 优先使用 Lucide 图标

Lucide 图标已预先打包，无需网络请求，性能更好：

```vue
<!-- ✅ 推荐 -->
<script setup>
import { Menu, Settings } from '@admin-core/icons'
</script>

<!-- ❌ 不推荐（需要网络请求） -->
<script setup>
import { IconifyIcon } from '@admin-core/icons'
</script>
<template>
  <IconifyIcon icon="lucide:menu" />
</template>
```

### 2. 统一图标大小

在项目中保持一致的图标大小：

```typescript
// constants/icons.ts
export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const
```

```vue
<template>
  <Menu :size="ICON_SIZES.md" />
</template>
```

### 3. 创建图标组件库

为常用图标创建封装组件：

```vue
<!-- components/icons/MenuIcon.vue -->
<script setup lang="ts">
import { Menu } from '@admin-core/icons'

interface Props {
  size?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
})
</script>

<template>
  <Menu :size="size" :color="color" />
</template>
```

### 4. 使用语义化命名

```vue
<script setup>
import { 
  Menu as MenuIcon,
  Settings as SettingsIcon,
  User as UserIcon,
} from '@admin-core/icons'
</script>
```

---

## 📚 API 参考

### Lucide 图标属性

```typescript
interface LucideIconProps {
  size?: number | string          // 图标大小，默认 24
  color?: string                  // 图标颜色，默认 'currentColor'
  strokeWidth?: number | string   // 线条宽度，默认 2
  absoluteStrokeWidth?: boolean   // 是否使用绝对线条宽度
  class?: string                  // CSS 类名
  style?: StyleValue              // 内联样式
}
```

### Iconify 图标属性

```typescript
interface IconifyIconProps {
  icon: string                    // 图标名称（必需）
  width?: number | string         // 宽度
  height?: number | string        // 高度
  color?: string                  // 颜色
  horizontal?: boolean            // 水平翻转
  vertical?: boolean              // 垂直翻转
  rotate?: number | string        // 旋转角度（0, 90, 180, 270）
  class?: string                  // CSS 类名
  style?: StyleValue              // 内联样式
}
```

### 工具函数

```typescript
// 创建 Iconify 图标组件
createIconifyIcon(icon: string): Component

// 添加图标集
addCollection(data: IconifyJSON): boolean

// 添加单个图标
addIcon(name: string, data: IconifyIcon): boolean

// 列出图标
listIcons(prefix?: string): string[]
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
// 导入 Lucide 图标
import { Menu, Settings, User } from '@admin-core/icons'

// 导入 Iconify 组件
import { IconifyIcon } from '@admin-core/icons'

// 导入工具函数
import { 
  createIconifyIcon,
  addCollection,
  addIcon,
  listIcons,
} from '@admin-core/icons'

// 导入类型
import type { IconifyIconStructure } from '@admin-core/icons'
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
- [Lucide Icons](https://lucide.dev/icons/)
- [Iconify Icon Sets](https://icon-sets.iconify.design/)
- [Iconify 文档](https://iconify.design/docs/)
