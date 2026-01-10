# 第三方组件库集成 - 快速开始

## 一行代码集成

现在你可以通过一行代码将 Admin Core 主题集成到第三方组件库！

### Element Plus

```typescript
import '@admin-core/design/css/integrations/element-plus.css'
```

### Ant Design Vue

```typescript
import '@admin-core/design/css/integrations/ant-design-vue.css'
```

### Naive UI

```typescript
import '@admin-core/design/css/integrations/naive-ui.css'
```

### Arco Design

```typescript
import '@admin-core/design/css/integrations/arco-design.css'
```

## 完整示例

### Element Plus 完整配置

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 1. 导入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 2. 导入 Admin Core 主题系统
import '@admin-core/design/css'

// 3. 导入 Element Plus 集成（一行代码！）
import '@admin-core/design/css/integrations/element-plus.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

就这么简单！现在 Element Plus 的所有组件都会自动使用 Admin Core 的主题颜色。

## 效果

✅ **主题自动同步**：切换主题，组件库颜色立即更新  
✅ **暗色模式支持**：切换暗色模式，组件库自动适配  
✅ **自定义主题**：使用自定义主题，组件库同步应用  
✅ **零配置**：无需任何额外配置  
✅ **高性能**：基于 CSS 变量，性能优秀  

## 在线演示

访问 http://localhost:3000 查看完整的 Element Plus 集成演示。

## 支持的组件库

| 组件库 | 导入路径 | 状态 |
|--------|---------|------|
| Element Plus | `@admin-core/design/css/integrations/element-plus.css` | ✅ 已测试 |
| Ant Design Vue | `@admin-core/design/css/integrations/ant-design-vue.css` | ✅ 可用 |
| Naive UI | `@admin-core/design/css/integrations/naive-ui.css` | ✅ 可用 |
| Arco Design | `@admin-core/design/css/integrations/arco-design.css` | ✅ 可用 |

## 更多信息

- [完整集成文档](./INTEGRATIONS.md)
- [Element Plus 集成演示](./demo/ELEMENT_PLUS_INTEGRATION.md)
- [第三方集成详细说明](./THIRD_PARTY_INTEGRATION.md)
