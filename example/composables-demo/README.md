# Composables Demo

这是一个用于测试和演示 `@admin-core/composables` 包中所有组合函数功能的演示项目。

## 包含的 Composables

此演示项目涵盖了 `@admin-core/composables` 包中的所有组合函数：

### 基础状态管理
- `useToggle` - 切换状态管理
- `useBoolean` - 布尔值状态管理
- `useCounter` - 计数器功能
- `useLoading` - 加载状态管理

### 浏览器 API 封装
- `useClipboard` - 剪贴板操作
- `useLocalStorage` - 本地存储管理
- `useScrollLock` - 滚动锁定功能
- `useIsMobile` - 移动端检测

### 高级功能
- `usePriorityValue` - 优先级值获取
- `useNamespace` - BEM 命名空间生成
- `useLayoutStyle` - 布局样式管理
- `useSortable` - 拖拽排序功能

### 国际化
- `useSimpleLocale` - 简单国际化功能

## 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 功能特点

1. 每个 composables 都有独立的演示组件
2. 提供直观的 UI 界面进行功能测试
3. 包含使用示例和说明
4. 实时展示 composables 的状态变化

## 项目结构

```
src/
├── components/           # 各 composables 的演示组件
├── App.vue             # 主应用组件
└── main.ts             # 应用入口
```

这个演示项目可以帮助开发者快速了解和测试 `@admin-core/composables` 包中每个组合函数的功能和用法。