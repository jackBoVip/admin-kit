# @admin-core/shared

<div align="center">

**Shared Utilities, Constants, and Types**

Provides common utility functions, constant definitions, and TypeScript type definitions

[![npm version](https://img.shields.io/npm/v/@admin-core/shared.svg)](https://www.npmjs.com/package/@admin-core/shared)
[![License](https://img.shields.io/npm/l/@admin-core/shared.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

English | [简体中文](./README.md)

</div>

---

## ✨ Features

- 🛠️ **Rich Utility Functions** - Common utility functions, ready to use
- 📋 **Complete Constants** - Predefined constants, unified management
- 🎯 **TypeScript Types** - Complete type definitions, enhanced development experience
- 📦 **Zero Dependencies** - No external dependencies, lightweight
- 🚀 **Tree-shakable** - Support on-demand import, optimize bundle size

---

## 📦 Installation

```bash
# Using pnpm
pnpm add @admin-core/shared

# Using npm
npm install @admin-core/shared

# Using yarn
yarn add @admin-core/shared
```

---

## 🚀 Quick Start

```typescript
// Import utility functions
import { debounce, formatFileSize, deepClone } from '@admin-core/shared'

// Import constants
import { STORAGE_KEYS, HTTP_STATUS } from '@admin-core/shared'

// Import types
import type { ApiResponse, PaginationParams } from '@admin-core/shared'
```

---

## 🛠️ Utility Functions

### Environment Detection

```typescript
import { isDev, isProd, isBrowser, isServer } from '@admin-core/shared'

console.log(isDev)      // Is development environment
console.log(isProd)     // Is production environment
console.log(isBrowser)  // Is browser environment
console.log(isServer)   // Is server environment
```

### Async Utilities

```typescript
import { sleep } from '@admin-core/shared'

// Delay 1 second
await sleep(1000)
```

### Debounce and Throttle

```typescript
import { debounce, throttle } from '@admin-core/shared'

// Debounce: execute only the last call within 300ms
const debouncedFn = debounce(() => {
  console.log('Searching...')
}, 300)

// Throttle: execute only once within 300ms
const throttledFn = throttle(() => {
  console.log('Scrolling...')
}, 300)
```

### Object Operations

```typescript
import { deepClone, isEmpty, removeEmpty } from '@admin-core/shared'

// Deep clone
const cloned = deepClone({ a: 1, b: { c: 2 } })

// Check if empty
isEmpty(null)        // true
isEmpty('')          // true
isEmpty([])          // true
isEmpty({})          // true
isEmpty('hello')     // false

// Remove empty values
removeEmpty({ a: 1, b: null, c: '', d: 0 })
// Result: { a: 1, d: 0 }
```

### String and Number

```typescript
import { generateId, formatFileSize, formatNumber } from '@admin-core/shared'

// Generate unique ID
generateId()           // 'id_1234567890_abc123'
generateId('user')     // 'user_1234567890_abc123'

// Format file size
formatFileSize(1024)           // '1 KB'
formatFileSize(1048576)        // '1 MB'
formatFileSize(1073741824, 3)  // '1.000 GB'

// Format number (thousands separator)
formatNumber(1234567)  // '1,234,567'
```

### Tree Data

```typescript
import { flattenTree, arrayToTree } from '@admin-core/shared'

// Flatten tree data
const tree = [
  {
    id: 1,
    name: 'Parent',
    children: [
      { id: 2, name: 'Child 1' },
      { id: 3, name: 'Child 2' }
    ]
  }
]
const flat = flattenTree(tree)

// Array to tree
const list = [
  { id: 1, name: 'Parent', parentId: null },
  { id: 2, name: 'Child 1', parentId: 1 },
  { id: 3, name: 'Child 2', parentId: 1 }
]
const treeData = arrayToTree(list)
```

---

## 📋 Constants

### Application Constants

```typescript
import { APP_NAME, APP_VERSION, DEFAULT_LOCALE } from '@admin-core/shared'

console.log(APP_NAME)        // 'Admin Kit'
console.log(APP_VERSION)     // '1.0.0'
console.log(DEFAULT_LOCALE)  // 'zh-CN'
```

### Storage Keys

```typescript
import { STORAGE_KEYS } from '@admin-core/shared'

localStorage.setItem(STORAGE_KEYS.TOKEN, 'xxx')
localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo))
localStorage.setItem(STORAGE_KEYS.THEME, 'dark')
```

### HTTP Constants

```typescript
import { HTTP_STATUS, HTTP_METHODS, CONTENT_TYPES } from '@admin-core/shared'

if (response.status === HTTP_STATUS.OK) {
  // Request successful
}

fetch(url, {
  method: HTTP_METHODS.POST,
  headers: {
    'Content-Type': CONTENT_TYPES.JSON
  }
})
```

### Regular Expressions

```typescript
import { REGEX } from '@admin-core/shared'

// Validate email
REGEX.EMAIL.test('user@example.com')  // true

// Validate phone
REGEX.PHONE.test('13800138000')  // true

// Validate URL
REGEX.URL.test('https://example.com')  // true

// Validate password (at least 8 characters, including uppercase, lowercase, and numbers)
REGEX.PASSWORD.test('Password123')  // true
```

---

## 🎯 TypeScript Types

### Basic Types

```typescript
import type { 
  Nullable,
  Optional,
  Maybe,
  Recordable,
  Fn,
  PromiseFn 
} from '@admin-core/shared'

// Nullable
const value: Nullable<string> = null

// Optional
const value: Optional<string> = undefined

// Maybe (null or undefined)
const value: Maybe<string> = null

// Recordable
const obj: Recordable = { key: 'value' }

// Function type
const fn: Fn<number, string> = (num) => String(num)

// Promise function type
const asyncFn: PromiseFn<number, string> = async (num) => String(num)
```

### Deep Types

```typescript
import type { DeepPartial, DeepReadonly, DeepRequired } from '@admin-core/shared'

interface User {
  name: string
  profile: {
    age: number
    address: string
  }
}

// Deep partial
const user: DeepPartial<User> = {
  profile: { age: 18 }
}

// Deep readonly
const user: DeepReadonly<User> = {
  name: 'Admin',
  profile: { age: 18, address: 'Beijing' }
}
```

### API Types

```typescript
import type { 
  ApiResponse,
  PaginationParams,
  PaginationResponse 
} from '@admin-core/shared'

// API response
const response: ApiResponse<User> = {
  code: 200,
  message: 'success',
  data: { id: 1, name: 'Admin' }
}

// Pagination params
const params: PaginationParams = {
  page: 1,
  pageSize: 10
}

// Pagination response
const result: PaginationResponse<User> = {
  list: [{ id: 1, name: 'Admin' }],
  total: 100,
  page: 1,
  pageSize: 10
}
```

### Business Types

```typescript
import type { 
  UserInfo,
  MenuItem,
  TreeNode,
  Option,
  TableColumn 
} from '@admin-core/shared'

// User info
const user: UserInfo = {
  id: 1,
  username: 'admin',
  nickname: 'Administrator',
  roles: ['admin'],
  permissions: ['user:read', 'user:write']
}

// Menu item
const menu: MenuItem = {
  id: 1,
  name: 'dashboard',
  path: '/dashboard',
  icon: 'dashboard',
  meta: {
    title: 'Dashboard',
    icon: 'dashboard'
  }
}
```

---

## 📚 Complete API

See [Chinese README](./README.md) for complete API documentation.

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
