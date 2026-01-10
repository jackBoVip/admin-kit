# @admin-core/composables

<div align="center">

**Vue 3 组合式函数库**

提供常用的 Vue 3 组合式函数（Composables），基于 VueUse 扩展

[![npm version](https://img.shields.io/npm/v/@admin-core/composables.svg)](https://www.npmjs.com/package/@admin-core/composables)
[![License](https://img.shields.io/npm/l/@admin-core/composables.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

[English](./README.en.md) | 简体中文

</div>

---

## ✨ 特性

- 🎯 **实用组合式函数** - 提供常用的状态管理和工具函数
- 🔋 **基于 VueUse** - 集成并重新导出 VueUse 常用函数
- 📦 **TypeScript** - 完整的 TypeScript 类型支持
- 🚀 **Tree-shakable** - 支持按需引入
- 🌐 **CDN 支持** - 支持通过 CDN 直接使用

---

## 📦 安装

```bash
# 使用 pnpm
pnpm add @admin-core/composables

# 使用 npm
npm install @admin-core/composables

# 使用 yarn
yarn add @admin-core/composables
```

---

## 🚀 快速开始

```vue
<script setup lang="ts">
import { useToggle, useCounter, useLoading } from '@admin-core/composables'

// 切换状态
const { state: visible, toggle } = useToggle(false)

// 计数器
const { count, inc, dec } = useCounter(0, { min: 0, max: 10 })

// 加载状态
const { loading, withLoading } = useLoading()

const fetchData = async () => {
  await withLoading(async () => {
    // 异步操作
    await new Promise(resolve => setTimeout(resolve, 1000))
  })
}
</script>

<template>
  <div>
    <button @click="toggle">{{ visible ? '隐藏' : '显示' }}</button>
    <div v-if="visible">内容</div>
    
    <button @click="dec">-</button>
    <span>{{ count }}</span>
    <button @click="inc">+</button>
    
    <button @click="fetchData" :disabled="loading">
      {{ loading ? '加载中...' : '获取数据' }}
    </button>
  </div>
</template>
```

---

## 📚 组合式函数

### useToggle

切换布尔值状态

```typescript
import { useToggle } from '@admin-core/composables'

const { state, toggle, setTrue, setFalse } = useToggle(false)

toggle()    // 切换状态
setTrue()   // 设置为 true
setFalse()  // 设置为 false
```

### useBoolean

布尔值状态管理（useToggle 的别名增强版）

```typescript
import { useBoolean } from '@admin-core/composables'

const { value, setTrue, setFalse, toggle, setValue } = useBoolean(false)

setTrue()           // 设置为 true
setFalse()          // 设置为 false
toggle()            // 切换状态
setValue(true)      // 设置指定值
```

### useCounter

计数器状态管理

```typescript
import { useCounter } from '@admin-core/composables'

const { count, inc, dec, set, reset, isMin, isMax } = useCounter(0, {
  min: 0,
  max: 10,
  step: 1,
})

inc()       // 增加
dec()       // 减少
inc(5)      // 增加 5
dec(3)      // 减少 3
set(5)      // 设置为 5
reset()     // 重置为初始值
```

### useLoading

加载状态管理

```typescript
import { useLoading } from '@admin-core/composables'

const { loading, startLoading, stopLoading, withLoading } = useLoading()

// 手动控制
startLoading()
// ... 异步操作
stopLoading()

// 自动控制
await withLoading(async () => {
  // 异步操作会自动管理 loading 状态
  await fetchData()
})
```

### useClipboard

剪贴板操作

```typescript
import { useClipboard } from '@admin-core/composables'

const { copy, copied, isSupported, error } = useClipboard()

const handleCopy = async () => {
  const success = await copy('要复制的文本')
  if (success) {
    console.log('复制成功')
  }
}

// copied 会在复制后的 2 秒内为 true
```

### useLocalStorage

LocalStorage 持久化

```typescript
import { useLocalStorage } from '@admin-core/composables'

const { data, remove } = useLocalStorage('user-settings', {
  theme: 'light',
  language: 'zh-CN',
})

// 修改会自动保存到 localStorage
data.value.theme = 'dark'

// 删除
remove()
```

---

## 🔋 VueUse 集成

本包重新导出了 VueUse 的常用函数，可以直接使用：

```typescript
import {
  useDark,
  useStorage,
  useMouse,
  useScroll,
  useWindowSize,
  useEventListener,
  useDebounce,
  useThrottle,
  useTitle,
  useFavicon,
  useFullscreen,
  useNetwork,
  useOnline,
} from '@admin-core/composables'
```

### 示例：暗色模式

```vue
<script setup lang="ts">
import { useDark } from '@admin-core/composables'

const isDark = useDark()
</script>

<template>
  <button @click="isDark = !isDark">
    {{ isDark ? '切换到浅色' : '切换到暗色' }}
  </button>
</template>
```

### 示例：窗口大小

```vue
<script setup lang="ts">
import { useWindowSize } from '@admin-core/composables'

const { width, height } = useWindowSize()
</script>

<template>
  <div>窗口大小: {{ width }} x {{ height }}</div>
</template>
```

---

## 🌐 CDN 使用

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Composables CDN Demo</title>
</head>
<body>
  <div id="app">
    <button @click="toggle">{{ state ? '隐藏' : '显示' }}</button>
    <div v-if="state">内容</div>
  </div>

  <script src="https://unpkg.com/vue@3"></script>
  <script src="https://unpkg.com/@admin-core/composables"></script>

  <script>
    const { createApp } = Vue
    const { useToggle } = AdminCoreComposables

    createApp({
      setup() {
        const { state, toggle } = useToggle(false)
        return { state, toggle }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

---

## 📚 API 参考

### useToggle(initialValue?)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialValue | `boolean` | `false` | 初始值 |

**返回值：**

| 属性 | 类型 | 说明 |
|------|------|------|
| state | `Ref<boolean>` | 状态值 |
| toggle | `() => void` | 切换状态 |
| setTrue | `() => void` | 设置为 true |
| setFalse | `() => void` | 设置为 false |

### useCounter(initialValue?, options?)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialValue | `number` | `0` | 初始值 |
| options.min | `number` | `-Infinity` | 最小值 |
| options.max | `number` | `Infinity` | 最大值 |
| options.step | `number` | `1` | 步长 |

**返回值：**

| 属性 | 类型 | 说明 |
|------|------|------|
| count | `Ref<number>` | 计数值 |
| inc | `(delta?: number) => void` | 增加 |
| dec | `(delta?: number) => void` | 减少 |
| set | `(value: number) => void` | 设置值 |
| reset | `() => void` | 重置 |
| isMin | `ComputedRef<boolean>` | 是否达到最小值 |
| isMax | `ComputedRef<boolean>` | 是否达到最大值 |

### useLoading(initialValue?)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialValue | `boolean` | `false` | 初始值 |

**返回值：**

| 属性 | 类型 | 说明 |
|------|------|------|
| loading | `Ref<boolean>` | 加载状态 |
| setLoading | `(value: boolean) => void` | 设置加载状态 |
| startLoading | `() => void` | 开始加载 |
| stopLoading | `() => void` | 停止加载 |
| withLoading | `<T>(fn: () => Promise<T>) => Promise<T>` | 包装异步函数 |

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
- [VueUse 文档](https://vueuse.org/)
