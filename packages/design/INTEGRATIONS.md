# 第三方组件库集成

Admin Core 设计系统提供了开箱即用的第三方组件库主题集成文件。

## 快速开始

### Element Plus

```typescript
// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入 Admin Core 主题系统
import '@admin-core/design/css'

// 导入 Element Plus 集成
import '@admin-core/design/css/integrations/element-plus.css'

app.use(ElementPlus)
```

### Ant Design Vue

```typescript
// main.ts
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 导入 Admin Core 主题系统
import '@admin-core/design/css'

// 导入 Ant Design Vue 集成
import '@admin-core/design/css/integrations/ant-design-vue.css'

app.use(Antd)
```

### Naive UI

```typescript
// main.ts
import naive from 'naive-ui'

// 导入 Admin Core 主题系统
import '@admin-core/design/css'

// 导入 Naive UI 集成（可选，Naive UI 原生支持 CSS 变量）
import '@admin-core/design/css/integrations/naive-ui.css'

app.use(naive)
```

### Arco Design

```typescript
// main.ts
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

// 导入 Admin Core 主题系统
import '@admin-core/design/css'

// 导入 Arco Design 集成
import '@admin-core/design/css/integrations/arco-design.css'

app.use(ArcoVue)
```

## 工作原理

集成文件通过 CSS 变量映射实现主题同步：

```css
/* Admin Core 主题变量 */
:root {
  --primary: 212 100% 48%;
  --success: 142 76% 36%;
  /* ... */
}

/* Element Plus 变量映射 */
:root {
  --el-color-primary: hsl(var(--primary));
  --el-color-success: hsl(var(--success));
  /* ... */
}
```

当你切换 Admin Core 主题时，组件库的颜色会自动同步更新。

## 功能特性

### ✅ 自动主题同步

- 切换主题变体，组件库颜色自动更新
- 切换暗色/浅色模式，组件库自动适配
- 使用自定义主题，组件库同步应用

### ✅ 完整颜色映射

- 主色 (Primary)
- 成功色 (Success)
- 警告色 (Warning)
- 危险/错误色 (Danger/Error)
- 信息色 (Info)
- 文本颜色
- 背景颜色
- 边框颜色

### ✅ 暗色模式支持

所有集成文件都包含暗色模式适配：

```css
.dark {
  --el-bg-color: hsl(var(--background));
  --el-text-color-primary: hsl(var(--foreground));
  /* ... */
}
```

### ✅ 零配置

只需导入对应的 CSS 文件，无需额外配置。

## 支持的组件库

| 组件库 | 集成文件 | 兼容性 | 推荐度 |
|--------|---------|--------|--------|
| Element Plus | `element-plus.css` | ✅ 完全兼容 | ⭐⭐⭐⭐ |
| Ant Design Vue | `ant-design-vue.css` | ✅ 完全兼容 | ⭐⭐⭐⭐ |
| Naive UI | `naive-ui.css` | ✅ 原生支持 | ⭐⭐⭐⭐⭐ |
| Arco Design | `arco-design.css` | ✅ 完全兼容 | ⭐⭐⭐⭐ |

## 高级用法

### 使用 ConfigProvider（可选）

某些组件库支持通过 ConfigProvider 动态配置主题。你可以结合集成工具函数使用：

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

### 自定义颜色映射

如果需要自定义颜色映射，可以在你的项目中覆盖 CSS 变量：

```css
/* 自定义 Element Plus 主色 */
:root {
  --el-color-primary: hsl(var(--accent)); /* 使用强调色而不是主色 */
}
```

### 按需导入

如果你只使用某个组件库，只需导入对应的集成文件：

```typescript
// 只导入 Element Plus 集成
import '@admin-core/design/css/integrations/element-plus.css'
```

## 注意事项

### 1. 导入顺序

确保按照以下顺序导入：

```typescript
// 1. 组件库 CSS
import 'element-plus/dist/index.css'

// 2. Admin Core 主题系统
import '@admin-core/design/css'

// 3. 组件库集成
import '@admin-core/design/css/integrations/element-plus.css'
```

### 2. CSS 优先级

集成文件使用 `:root` 选择器，优先级较低。如果组件库有内联样式或更高优先级的样式，可能需要调整。

### 3. 浏览器兼容性

所有集成文件都使用 CSS 变量，需要现代浏览器支持：

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

### 4. 性能

CSS 变量更新是高效的，不会导致性能问题。主题切换时只更新变量值，无需重新渲染组件。

## 示例项目

查看完整的集成示例：

- [Element Plus 集成演示](./demo/ELEMENT_PLUS_INTEGRATION.md)
- [集成测试文档](./demo/INTEGRATION_TEST.md)

## 常见问题

### Q: 为什么组件颜色没有变化？

A: 检查以下几点：
1. 确保导入了集成 CSS 文件
2. 确保导入顺序正确
3. 检查浏览器开发者工具中的 CSS 变量值
4. 确保组件库版本兼容

### Q: 可以同时使用多个组件库吗？

A: 可以，只需导入对应的集成文件即可：

```typescript
import '@admin-core/design/css/integrations/element-plus.css'
import '@admin-core/design/css/integrations/ant-design-vue.css'
```

### Q: 如何自定义某个组件的颜色？

A: 在你的项目中覆盖对应的 CSS 变量：

```css
.my-custom-button {
  --el-color-primary: hsl(280, 60%, 50%);
}
```

### Q: 暗色模式下组件显示异常？

A: 确保组件库支持暗色模式，并且集成文件包含了 `.dark` 选择器的样式。

## 贡献

如果你想为其他组件库添加集成支持，欢迎提交 PR：

1. 在 `src/css/integrations/` 目录下创建新的 CSS 文件
2. 参考现有集成文件的格式
3. 更新 `package.json` 的 `exports` 字段
4. 添加文档和示例

## 相关文档

- [主题系统文档](./README.md)
- [第三方集成详细文档](./THIRD_PARTY_INTEGRATION.md)
- [国际化文档](./I18N.md)
- [自定义主题文档](./CUSTOM_THEME.md)
