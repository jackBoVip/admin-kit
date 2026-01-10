# @admin-core/composables

<div align="center">

**Vue 3 Composables Library**

Provides commonly used Vue 3 composables, extended from VueUse

[![npm version](https://img.shields.io/npm/v/@admin-core/composables.svg)](https://www.npmjs.com/package/@admin-core/composables)
[![License](https://img.shields.io/npm/l/@admin-core/composables.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

English | [简体中文](./README.md)

</div>

---

## ✨ Features

- 🎯 **Practical Composables** - Common state management and utility functions
- 🔋 **Based on VueUse** - Integrates and re-exports VueUse common functions
- 📦 **TypeScript** - Full TypeScript type support
- 🚀 **Tree-shakable** - Support on-demand import
- 🌐 **CDN Support** - Use directly via CDN

---

## 📦 Installation

```bash
# Using pnpm
pnpm add @admin-core/composables

# Using npm
npm install @admin-core/composables

# Using yarn
yarn add @admin-core/composables
```

---

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { useToggle, useCounter, useLoading } from '@admin-core/composables'

// Toggle state
const { state: visible, toggle } = useToggle(false)

// Counter
const { count, inc, dec } = useCounter(0, { min: 0, max: 10 })

// Loading state
const { loading, withLoading } = useLoading()

const fetchData = async () => {
  await withLoading(async () => {
    // Async operation
    await new Promise(resolve => setTimeout(resolve, 1000))
  })
}
</script>

<template>
  <div>
    <button @click="toggle">{{ visible ? 'Hide' : 'Show' }}</button>
    <div v-if="visible">Content</div>
    
    <button @click="dec">-</button>
    <span>{{ count }}</span>
    <button @click="inc">+</button>
    
    <button @click="fetchData" :disabled="loading">
      {{ loading ? 'Loading...' : 'Fetch Data' }}
    </button>
  </div>
</template>
```

---

## 📚 Composables

### useToggle

Toggle boolean state

```typescript
import { useToggle } from '@admin-core/composables'

const { state, toggle, setTrue, setFalse } = useToggle(false)

toggle()    // Toggle state
setTrue()   // Set to true
setFalse()  // Set to false
```

### useCounter

Counter state management

```typescript
import { useCounter } from '@admin-core/composables'

const { count, inc, dec, set, reset, isMin, isMax } = useCounter(0, {
  min: 0,
  max: 10,
  step: 1,
})

inc()       // Increment
dec()       // Decrement
inc(5)      // Increment by 5
dec(3)      // Decrement by 3
set(5)      // Set to 5
reset()     // Reset to initial value
```

### useLoading

Loading state management

```typescript
import { useLoading } from '@admin-core/composables'

const { loading, startLoading, stopLoading, withLoading } = useLoading()

// Manual control
startLoading()
// ... async operation
stopLoading()

// Auto control
await withLoading(async () => {
  // Async operation with auto loading state management
  await fetchData()
})
```

### useClipboard

Clipboard operations

```typescript
import { useClipboard } from '@admin-core/composables'

const { copy, copied, isSupported, error } = useClipboard()

const handleCopy = async () => {
  const success = await copy('Text to copy')
  if (success) {
    console.log('Copied successfully')
  }
}

// copied will be true for 2 seconds after copying
```

### useLocalStorage

LocalStorage persistence

```typescript
import { useLocalStorage } from '@admin-core/composables'

const { data, remove } = useLocalStorage('user-settings', {
  theme: 'light',
  language: 'en-US',
})

// Changes are automatically saved to localStorage
data.value.theme = 'dark'

// Remove
remove()
```

---

## 🔋 VueUse Integration

This package re-exports commonly used VueUse functions:

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

---

## 🌐 CDN Usage

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Composables CDN Demo</title>
</head>
<body>
  <div id="app">
    <button @click="toggle">{{ state ? 'Hide' : 'Show' }}</button>
    <div v-if="state">Content</div>
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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

MIT License © 2024 [Admin Kit Team](https://github.com/jackBoVip/admin-kit)

---

## 🔗 Links

- [GitHub Repository](https://github.com/jackBoVip/admin-kit)
- [Issue Tracker](https://github.com/jackBoVip/admin-kit/issues)
- [VueUse Documentation](https://vueuse.org/)
