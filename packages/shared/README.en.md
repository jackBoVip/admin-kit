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

> 💡 **Dependency Note**: All dependencies will be installed automatically. See [Dependency Guide](./DEPENDENCY_GUIDE.md) for details.

---

## 🚀 Quick Start

### Full Import

```typescript
// Import utility functions
import { debounce, formatFileSize, deepClone } from '@admin-core/shared'

// Import constants
import { STORAGE_KEYS, HTTP_STATUS } from '@admin-core/shared'

// Import types
import type { ApiResponse, PaginationParams } from '@admin-core/shared'
```

### Subpath Imports (Recommended)

For better tree-shaking and faster build times, use subpath imports:

```typescript
// Import only color utilities
import { generateThemeColors, hexToRgb } from '@admin-core/shared/color'

// Import only constants
import { STORAGE_KEYS, HTTP_STATUS } from '@admin-core/shared/constants'

// Import only types
import type { ApiResponse, UserInfo } from '@admin-core/shared/types'

// Import only utility functions
import { debounce, formatFileSize } from '@admin-core/shared/utils'
```

**Available subpaths:**

- `@admin-core/shared/cache` - Storage management (~7 KB)
- `@admin-core/shared/color` - Color utilities (~2 KB)
- `@admin-core/shared/constants` - Constant definitions (~9 KB)
- `@admin-core/shared/types` - TypeScript types (~33 B)
- `@admin-core/shared/utils` - Utility functions (~5 KB)

---

## 📖 Subpath Imports Guide

### Usage Recommendations

#### ✅ Recommended: On-Demand Import

```typescript
// Import only what you need
import { STORAGE_KEYS } from '@admin-core/shared/constants'
import { formatFileSize } from '@admin-core/shared/utils'
import type { ApiResponse } from '@admin-core/shared/types'
```

**Benefits:**
- Better tree-shaking
- Faster build times
- Smaller bundle size
- Clearer dependencies

#### ⚠️ Optional: Full Import

```typescript
// Import everything
import { STORAGE_KEYS, formatFileSize } from '@admin-core/shared'
import type { ApiResponse } from '@admin-core/shared'
```

**Use Cases:**
- Need multiple module features
- Don't care about bundle size
- Rapid prototyping

### Bundle Size Comparison

| Import Method | Bundle Size | Build Time |
|--------------|-------------|------------|
| Full Import | ~13 KB | Slower |
| Subpath (Single Module) | ~2-9 KB | Faster |
| Subpath (Multiple Modules) | Cumulative | Medium |

### Real-World Examples

#### Vue 3 Project

```typescript
// src/composables/useTheme.ts
import { convertToHslCssVar } from '@admin-core/shared/color'
import { STORAGE_KEYS } from '@admin-core/shared/constants'
import type { ThemeConfig } from '@admin-core/shared/types'

export function useTheme() {
  const theme = ref<ThemeConfig>({
    mode: 'light',
    variant: 'default'
  })
  
  const applyTheme = (color: string) => {
    const hsl = convertToHslCssVar(color)
    document.documentElement.style.setProperty('--primary', hsl)
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme.value))
  }
  
  return { theme, applyTheme }
}
```

#### React Project

```typescript
// src/hooks/useApi.ts
import { debounce } from '@admin-core/shared/utils'
import { HTTP_STATUS } from '@admin-core/shared/constants'
import type { ApiResponse, PaginationParams } from '@admin-core/shared/types'

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  
  const fetchData = debounce(async (params: PaginationParams) => {
    const response: ApiResponse<T> = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(res => res.json())
    
    if (response.code === HTTP_STATUS.OK) {
      setData(response.data)
    }
  }, 300)
  
  return { data, fetchData }
}
```

### Migration Guide

If you're currently using full imports, you can gradually migrate to subpath imports:

#### Step 1: Identify Imports

```typescript
// Before
import { STORAGE_KEYS, formatFileSize, ApiResponse } from '@admin-core/shared'
```

#### Step 2: Group by Module

- `STORAGE_KEYS` → `constants`
- `formatFileSize` → `utils`
- `ApiResponse` → `types`

#### Step 3: Update Imports

```typescript
// After
import { STORAGE_KEYS } from '@admin-core/shared/constants'
import { formatFileSize } from '@admin-core/shared/utils'
import type { ApiResponse } from '@admin-core/shared/types'
```

### TypeScript Configuration

Ensure your `tsconfig.json` supports module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // or "node16", "nodenext"
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

### FAQ

**Q: Does subpath import affect type inference?**

A: No. TypeScript will correctly infer all types regardless of import method.

**Q: Can I mix full imports and subpath imports?**

A: Yes, but not recommended. It's better to use one consistent approach.

**Q: Which build tools support subpath imports?**

A: All modern build tools including Vite, Webpack 5+, Rollup, esbuild, and Turbopack.

**Q: How do I see what a module exports?**

A: Check the corresponding type definition files:
- `dist/color.d.ts` - Color utilities
- `dist/constants.d.ts` - Constants
- `dist/types.d.ts` - Types
- `dist/utils.d.ts` - Utility functions

---

---

## 💾 Storage Management (Cache)

Provides browser storage management with prefix, expiration, and type safety, optimized with ES2025 features.

### Features

- ✅ **Type Safe** - Complete TypeScript type support
- ✅ **Prefix Isolation** - Namespace support to avoid key conflicts
- ✅ **Expiration Management** - Automatic handling of expired data
- ✅ **Batch Operations** - Support for batch read/write/delete
- ✅ **ES2025 Features** - Using private fields, `globalThis`, modern array methods, etc.
- ✅ **Error Handling** - Comprehensive error handling and automatic retry

### Basic Usage

```typescript
import { StorageManager } from '@admin-core/shared/cache'

// Create storage manager
const storage = new StorageManager({ 
  prefix: 'myapp', 
  storageType: 'localStorage' 
})

// Set permanent storage
storage.setItem('user', { name: 'John', age: 30 })

// Set storage with expiration (5 minutes)
storage.setItem('token', 'abc123', 5 * 60 * 1000)

// Get storage item
const user = storage.getItem<{ name: string; age: number }>('user')
console.log(user) // { name: 'John', age: 30 }

// Check if exists
if (storage.has('token')) {
  console.log('Token exists')
}

// Remove storage item
storage.removeItem('token')
```

### Batch Operations

```typescript
// Batch set
storage.setItems({
  user: { name: 'John' },
  token: 'abc123',
  config: { theme: 'dark' }
}, 60 * 60 * 1000) // All items expire in 1 hour

// Batch get
const items = storage.getItems<string>(['token', 'refreshToken'])
console.log(items) // { token: 'abc123', refreshToken: 'xyz789' }

// Batch remove
storage.removeItems(['token', 'refreshToken', 'session'])
```

### Management Operations

```typescript
// Get all keys
const keys = storage.keys()
console.log(keys) // ['user', 'token', 'config']

// Get storage item count
const count = storage.size()
console.log(`Total items: ${count}`)

// Clear all expired items
storage.clearExpiredItems()

// Clear all items with prefix
storage.clear()
```

### Periodic Cleanup

```typescript
// Clean up expired items every minute
setInterval(() => {
  storage.clearExpiredItems()
}, 60000)
```

### ES2025 Modern Features

This module uses the following ES2025 and modern JavaScript features:

#### 1. Private Field Syntax (`#`)
```typescript
class StorageManager {
  readonly #prefix: string  // True private field
  readonly #storage: Storage
}
```
**Advantage**: More secure than `private` keyword, private at runtime too

#### 2. `globalThis` Instead of `window`
```typescript
globalThis.localStorage  // Instead of window.localStorage
```
**Advantage**: Cross-environment compatibility (browser, Node.js, Web Workers)

#### 3. Modern Array Methods
```typescript
// Using Array.from and functional programming
const keys = Array.from(
  { length: this.#storage.length },
  (_, i) => this.#storage.key(i)
).filter((key): key is string => key?.startsWith(this.#prefix) ?? false)
```
**Advantage**: More concise, readable, and functional

#### 4. `Object.fromEntries()` and `Object.entries()`
```typescript
// Batch get
return Object.fromEntries(
  keys.map(key => [key, this.getItem<T>(key)])
)

// Batch set
for (const [key, value] of Object.entries(items)) {
  this.setItem(key, value, ttl)
}
```
**Advantage**: Elegant conversion between objects and arrays

#### 5. `for...of` Loop
```typescript
for (const key of keysToRemove) {
  this.#storage.removeItem(key)
}
```
**Advantage**: Better performance than `forEach`, supports break/continue

### API Documentation

#### Constructor

```typescript
constructor(options?: StorageManagerOptions)
```

**Parameters**:
- `options.prefix` - Storage key prefix, default is empty string
- `options.storageType` - Storage type, `'localStorage'` or `'sessionStorage'`, default is `'localStorage'`

#### Methods

| Method | Description | Parameters | Return |
|--------|-------------|------------|--------|
| `setItem<T>` | Set storage item | `key, value, ttl?` | `void` |
| `getItem<T>` | Get storage item | `key, defaultValue?` | `T \| null` |
| `removeItem` | Remove storage item | `key` | `void` |
| `has` | Check if exists | `key` | `boolean` |
| `keys` | Get all key names | - | `string[]` |
| `size` | Get item count | - | `number` |
| `clear` | Clear all items | - | `void` |
| `clearExpiredItems` | Clear expired items | - | `void` |
| `setItems<T>` | Batch set | `items, ttl?` | `void` |
| `getItems<T>` | Batch get | `keys` | `Record<string, T \| null>` |
| `removeItems` | Batch remove | `keys` | `void` |

### Browser Compatibility

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

Requires support for:
- Private class fields (`#`)
- `globalThis`
- `Object.fromEntries()`
- Optional chaining (`?.`)
- Nullish coalescing (`??`)

---

## 🎨 Color Utilities

### Color Generation

```typescript
import { generatorColorVariables } from '@admin-core/shared/color'

// Generate complete color scale CSS variables (50-950)
const colors = generatorColorVariables([
  { name: 'blue', color: '#3b82f6', alias: 'primary' }
])

console.log(colors)
// {
//   '--blue-50': '214 100% 97%',
//   '--blue-100': '214 95% 93%',
//   ...
//   '--blue-500': '217 91% 60%',
//   ...
//   '--primary': '217 91% 60%'
// }
```

### Color Conversion

```typescript
import { convertToHsl, convertToRgb, convertToHslCssVar } from '@admin-core/shared/color'

// Convert to HSL
convertToHsl('#1890ff')  // 'hsl(209 100% 55%)'

// Convert to RGB
convertToRgb('hsl(210 100% 55%)')  // 'rgb(26, 140, 255)'

// Convert to CSS variable compatible HSL format
convertToHslCssVar('#1890ff')  // '209 100% 55%'
```

### Color Detection

```typescript
import { isDarkColor, isLightColor, isValidColor } from '@admin-core/shared/color'

// Check if dark
isDarkColor('#000000')  // true
isDarkColor('#ffffff')  // false

// Check if light
isLightColor('#ffffff')  // true
isLightColor('#000000')  // false

// Validate color
isValidColor('#1890ff')  // true
isValidColor('invalid')  // false
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
