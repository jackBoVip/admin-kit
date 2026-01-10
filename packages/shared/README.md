# @admin-core/shared

<div align="center">

**共享工具、常量和类型**

提供通用的工具函数、常量定义和 TypeScript 类型定义

[![npm version](https://img.shields.io/npm/v/@admin-core/shared.svg)](https://www.npmjs.com/package/@admin-core/shared)
[![License](https://img.shields.io/npm/l/@admin-core/shared.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

[English](./README.en.md) | 简体中文

</div>

---

## ✨ 特性

- 🛠️ **丰富的工具函数** - 提供常用的工具函数，开箱即用
- 📋 **完整的常量定义** - 预定义常用常量，统一管理
- 🎯 **TypeScript 类型** - 完整的类型定义，提升开发体验
- 📦 **零依赖** - 无外部依赖，轻量级
- 🚀 **Tree-shakable** - 支持按需引入，优化包体积

---

## 📦 安装

```bash
# 使用 pnpm
pnpm add @admin-core/shared

# 使用 npm
npm install @admin-core/shared

# 使用 yarn
yarn add @admin-core/shared
```

> 💡 **依赖说明**: 所有依赖会自动安装，无需手动安装。详见 [依赖安装指南](./DEPENDENCY_GUIDE.md)

---

## 🚀 快速开始

### 完整导入

```typescript
// 导入工具函数
import { debounce, formatFileSize, deepClone } from '@admin-core/shared'

// 导入常量
import { STORAGE_KEYS, HTTP_STATUS } from '@admin-core/shared'

// 导入类型
import type { ApiResponse, PaginationParams } from '@admin-core/shared'
```

### 按需导入（推荐）

为了更好的 Tree-shaking 效果和更快的构建速度，推荐使用子路径导入：

```typescript
// 只导入颜色工具
import { generateThemeColors, hexToRgb } from '@admin-core/shared/color'

// 只导入常量
import { STORAGE_KEYS, HTTP_STATUS } from '@admin-core/shared/constants'

// 只导入类型
import type { ApiResponse, UserInfo } from '@admin-core/shared/types'

// 只导入工具函数
import { debounce, formatFileSize } from '@admin-core/shared/utils'
```

**可用的子路径：**

- `@admin-core/shared/cache` - 存储管理工具（~7 KB）
- `@admin-core/shared/color` - 颜色处理工具（~2 KB）
- `@admin-core/shared/constants` - 常量定义（~9 KB）
- `@admin-core/shared/types` - TypeScript 类型（~33 B）
- `@admin-core/shared/utils` - 工具函数（~5 KB）

---

## 📖 子路径导入详细指南

### 使用建议

#### ✅ 推荐：按需导入

```typescript
// 只导入需要的模块
import { STORAGE_KEYS } from '@admin-core/shared/constants'
import { formatFileSize } from '@admin-core/shared/utils'
import type { ApiResponse } from '@admin-core/shared/types'
```

**优点：**
- 更好的 Tree-shaking 效果
- 更快的构建速度
- 更小的包体积
- 更清晰的依赖关系

#### ⚠️ 可选：完整导入

```typescript
// 导入所有内容
import { STORAGE_KEYS, formatFileSize } from '@admin-core/shared'
import type { ApiResponse } from '@admin-core/shared'
```

**适用场景：**
- 需要使用多个模块的功能
- 不关心包体积优化
- 快速原型开发

### 包体积对比

| 导入方式 | 包体积 | 构建时间 |
|---------|--------|---------|
| 完整导入 | ~13 KB | 较慢 |
| 子路径导入（单个模块） | ~2-9 KB | 较快 |
| 子路径导入（多个模块） | 按需累加 | 中等 |

### 实际应用示例

#### Vue 3 项目

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

#### React 项目

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

### 迁移指南

如果你之前使用完整导入，可以逐步迁移到子路径导入：

#### 步骤 1：识别导入

```typescript
// 之前
import { STORAGE_KEYS, formatFileSize, ApiResponse } from '@admin-core/shared'
```

#### 步骤 2：按模块分组

- `STORAGE_KEYS` → `constants`
- `formatFileSize` → `utils`
- `ApiResponse` → `types`

#### 步骤 3：更新导入

```typescript
// 之后
import { STORAGE_KEYS } from '@admin-core/shared/constants'
import { formatFileSize } from '@admin-core/shared/utils'
import type { ApiResponse } from '@admin-core/shared/types'
```

### TypeScript 配置

确保你的 `tsconfig.json` 支持模块解析：

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // 或 "node16", "nodenext"
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

### 常见问题

**Q: 子路径导入会影响类型推导吗？**

A: 不会。TypeScript 会正确推导所有类型，无论使用哪种导入方式。

**Q: 可以混合使用完整导入和子路径导入吗？**

A: 可以，但不推荐。建议在项目中统一使用一种导入方式。

**Q: 子路径导入支持哪些构建工具？**

A: 支持所有现代构建工具，包括 Vite、Webpack 5+、Rollup、esbuild、Turbopack。

**Q: 如何查看某个模块导出了哪些内容？**

A: 查看对应的类型定义文件：
- `dist/color.d.ts` - 颜色工具
- `dist/constants.d.ts` - 常量
- `dist/types.d.ts` - 类型
- `dist/utils.d.ts` - 工具函数

---

---

## 💾 存储管理（Cache）

提供带前缀、过期时间和类型安全的浏览器存储管理功能，使用 ES2025 最新特性优化。

### 特性

- ✅ **类型安全** - 完整的 TypeScript 类型支持
- ✅ **前缀隔离** - 支持命名空间，避免键名冲突
- ✅ **过期管理** - 自动处理过期数据
- ✅ **批量操作** - 支持批量读写和删除
- ✅ **ES2025 特性** - 使用私有字段、`globalThis`、现代数组方法等
- ✅ **错误处理** - 完善的错误处理和自动重试机制

### 基础用法

```typescript
import { StorageManager } from '@admin-core/shared/cache'

// 创建存储管理器
const storage = new StorageManager({ 
  prefix: 'myapp', 
  storageType: 'localStorage' 
})

// 设置永久存储
storage.setItem('user', { name: 'John', age: 30 })

// 设置带过期时间的存储（5分钟）
storage.setItem('token', 'abc123', 5 * 60 * 1000)

// 获取存储项
const user = storage.getItem<{ name: string; age: number }>('user')
console.log(user) // { name: 'John', age: 30 }

// 检查是否存在
if (storage.has('token')) {
  console.log('Token exists')
}

// 移除存储项
storage.removeItem('token')
```

### 批量操作

```typescript
// 批量设置
storage.setItems({
  user: { name: 'John' },
  token: 'abc123',
  config: { theme: 'dark' }
}, 60 * 60 * 1000) // 所有项 1 小时后过期

// 批量获取
const items = storage.getItems<string>(['token', 'refreshToken'])
console.log(items) // { token: 'abc123', refreshToken: 'xyz789' }

// 批量删除
storage.removeItems(['token', 'refreshToken', 'session'])
```

### 管理操作

```typescript
// 获取所有键
const keys = storage.keys()
console.log(keys) // ['user', 'token', 'config']

// 获取存储项数量
const count = storage.size()
console.log(`Total items: ${count}`)

// 清除所有过期项
storage.clearExpiredItems()

// 清除所有带前缀的项
storage.clear()
```

### 定期清理

```typescript
// 每分钟清理一次过期项
setInterval(() => {
  storage.clearExpiredItems()
}, 60000)
```

### ES2025 现代特性

本模块使用了以下 ES2025 和现代 JavaScript 特性：

#### 1. 私有字段语法 (`#`)
```typescript
class StorageManager {
  readonly #prefix: string  // 真正的私有字段
  readonly #storage: Storage
}
```
**优势**: 比 `private` 关键字更安全，运行时也是私有的

#### 2. `globalThis` 替代 `window`
```typescript
globalThis.localStorage  // 替代 window.localStorage
```
**优势**: 跨环境兼容（浏览器、Node.js、Web Workers）

#### 3. 现代数组方法
```typescript
// 使用 Array.from 和函数式编程
const keys = Array.from(
  { length: this.#storage.length },
  (_, i) => this.#storage.key(i)
).filter((key): key is string => key?.startsWith(this.#prefix) ?? false)
```
**优势**: 更简洁、更易读、更函数式

#### 4. `Object.fromEntries()` 和 `Object.entries()`
```typescript
// 批量获取
return Object.fromEntries(
  keys.map(key => [key, this.getItem<T>(key)])
)

// 批量设置
for (const [key, value] of Object.entries(items)) {
  this.setItem(key, value, ttl)
}
```
**优势**: 对象和数组之间的优雅转换

#### 5. `for...of` 循环
```typescript
for (const key of keysToRemove) {
  this.#storage.removeItem(key)
}
```
**优势**: 比 `forEach` 性能更好，支持 break/continue

### API 文档

#### 构造函数

```typescript
constructor(options?: StorageManagerOptions)
```

**参数**:
- `options.prefix` - 存储键的前缀，默认为空字符串
- `options.storageType` - 存储类型，`'localStorage'` 或 `'sessionStorage'`，默认为 `'localStorage'`

#### 方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `setItem<T>` | 设置存储项 | `key, value, ttl?` | `void` |
| `getItem<T>` | 获取存储项 | `key, defaultValue?` | `T \| null` |
| `removeItem` | 移除存储项 | `key` | `void` |
| `has` | 检查是否存在 | `key` | `boolean` |
| `keys` | 获取所有键名 | - | `string[]` |
| `size` | 获取存储项数量 | - | `number` |
| `clear` | 清除所有项 | - | `void` |
| `clearExpiredItems` | 清除过期项 | - | `void` |
| `setItems<T>` | 批量设置 | `items, ttl?` | `void` |
| `getItems<T>` | 批量获取 | `keys` | `Record<string, T \| null>` |
| `removeItems` | 批量移除 | `keys` | `void` |

### 浏览器兼容性

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

需要支持以下特性：
- Private class fields (`#`)
- `globalThis`
- `Object.fromEntries()`
- Optional chaining (`?.`)
- Nullish coalescing (`??`)

---

## 🎨 颜色工具

### 颜色生成

```typescript
import { generatorColorVariables } from '@admin-core/shared/color'

// 生成完整的色阶 CSS 变量（50-950）
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

### 颜色转换

```typescript
import { convertToHsl, convertToRgb, convertToHslCssVar } from '@admin-core/shared/color'

// 转换为 HSL
convertToHsl('#1890ff')  // 'hsl(209 100% 55%)'

// 转换为 RGB
convertToRgb('hsl(210 100% 55%)')  // 'rgb(26, 140, 255)'

// 转换为 CSS 变量兼容的 HSL 格式
convertToHslCssVar('#1890ff')  // '209 100% 55%'
```

### 颜色判断

```typescript
import { isDarkColor, isLightColor, isValidColor } from '@admin-core/shared/color'

// 判断是否为深色
isDarkColor('#000000')  // true
isDarkColor('#ffffff')  // false

// 判断是否为浅色
isLightColor('#ffffff')  // true
isLightColor('#000000')  // false

// 验证颜色是否有效
isValidColor('#1890ff')  // true
isValidColor('invalid')  // false
```

---

## 🛠️ 工具函数

### 环境判断

```typescript
import { isDev, isProd, isBrowser, isServer } from '@admin-core/shared'

console.log(isDev)      // 是否为开发环境
console.log(isProd)     // 是否为生产环境
console.log(isBrowser)  // 是否为浏览器环境
console.log(isServer)   // 是否为服务端环境
```

### 异步工具

```typescript
import { sleep } from '@admin-core/shared'

// 延迟 1 秒
await sleep(1000)
```

### 防抖和节流

```typescript
import { debounce, throttle } from '@admin-core/shared'

// 防抖：300ms 内只执行最后一次
const debouncedFn = debounce(() => {
  console.log('搜索...')
}, 300)

// 节流：300ms 内只执行一次
const throttledFn = throttle(() => {
  console.log('滚动...')
}, 300)
```

### 对象操作

```typescript
import { deepClone, isEmpty, removeEmpty } from '@admin-core/shared'

// 深度克隆
const cloned = deepClone({ a: 1, b: { c: 2 } })

// 判断是否为空
isEmpty(null)        // true
isEmpty('')          // true
isEmpty([])          // true
isEmpty({})          // true
isEmpty('hello')     // false

// 移除空值
removeEmpty({ a: 1, b: null, c: '', d: 0 })
// 结果: { a: 1, d: 0 }
```

### 字符串和数字

```typescript
import { generateId, formatFileSize, formatNumber } from '@admin-core/shared'

// 生成唯一 ID
generateId()           // 'id_1234567890_abc123'
generateId('user')     // 'user_1234567890_abc123'

// 格式化文件大小
formatFileSize(1024)           // '1 KB'
formatFileSize(1048576)        // '1 MB'
formatFileSize(1073741824, 3)  // '1.000 GB'

// 格式化数字（千分位）
formatNumber(1234567)  // '1,234,567'
```

### URL 操作

```typescript
import { getUrlParams, buildUrlParams } from '@admin-core/shared'

// 获取 URL 参数
const params = getUrlParams('https://example.com?id=1&name=admin')
// 结果: { id: '1', name: 'admin' }

// 构建 URL 参数
const query = buildUrlParams({ id: 1, name: 'admin' })
// 结果: 'id=1&name=admin'
```

### 文件操作

```typescript
import { downloadFile, copyToClipboard } from '@admin-core/shared'

// 下载文件
downloadFile('https://example.com/file.pdf', 'document.pdf')

// 复制到剪贴板
const success = await copyToClipboard('Hello World')
console.log(success)  // true 或 false
```

### 树形数据

```typescript
import { flattenTree, arrayToTree } from '@admin-core/shared'

// 树形数据扁平化
const tree = [
  {
    id: 1,
    name: '父节点',
    children: [
      { id: 2, name: '子节点1' },
      { id: 3, name: '子节点2' }
    ]
  }
]
const flat = flattenTree(tree)
// 结果: [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]

// 数组转树形结构
const list = [
  { id: 1, name: '父节点', parentId: null },
  { id: 2, name: '子节点1', parentId: 1 },
  { id: 3, name: '子节点2', parentId: 1 }
]
const treeData = arrayToTree(list)
// 结果: [{ id: 1, children: [{ id: 2 }, { id: 3 }] }]
```

---

## 📋 常量定义

### 应用常量

```typescript
import { APP_NAME, APP_VERSION, DEFAULT_LOCALE } from '@admin-core/shared'

console.log(APP_NAME)        // 'Admin Kit'
console.log(APP_VERSION)     // '1.0.0'
console.log(DEFAULT_LOCALE)  // 'zh-CN'
```

### 本地存储键名

```typescript
import { STORAGE_KEYS } from '@admin-core/shared'

localStorage.setItem(STORAGE_KEYS.TOKEN, 'xxx')
localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo))
localStorage.setItem(STORAGE_KEYS.THEME, 'dark')
```

### HTTP 状态码

```typescript
import { HTTP_STATUS, HTTP_METHODS, CONTENT_TYPES } from '@admin-core/shared'

if (response.status === HTTP_STATUS.OK) {
  // 请求成功
}

fetch(url, {
  method: HTTP_METHODS.POST,
  headers: {
    'Content-Type': CONTENT_TYPES.JSON
  }
})
```

### 文件类型

```typescript
import { FILE_TYPES, FILE_SIZE_LIMITS } from '@admin-core/shared'

// 判断文件类型
const isImage = FILE_TYPES.IMAGE.includes(ext)
const isVideo = FILE_TYPES.VIDEO.includes(ext)

// 文件大小限制
if (file.size > FILE_SIZE_LIMITS.IMAGE) {
  console.log('图片大小超过限制')
}
```

### 分页默认值

```typescript
import { PAGINATION } from '@admin-core/shared'

const params = {
  page: PAGINATION.PAGE,           // 1
  pageSize: PAGINATION.PAGE_SIZE,  // 10
}

// 分页大小选项
const pageSizes = PAGINATION.PAGE_SIZES  // [10, 20, 50, 100]
```

### 正则表达式

```typescript
import { REGEX } from '@admin-core/shared'

// 验证邮箱
REGEX.EMAIL.test('user@example.com')  // true

// 验证手机号
REGEX.PHONE.test('13800138000')  // true

// 验证 URL
REGEX.URL.test('https://example.com')  // true

// 验证密码（至少8位，包含大小写字母和数字）
REGEX.PASSWORD.test('Password123')  // true
```

### 动画和延迟

```typescript
import { 
  ANIMATION_DURATION,
  DEBOUNCE_DELAY,
  THROTTLE_DELAY,
  REQUEST_TIMEOUT 
} from '@admin-core/shared'

// 动画持续时间
setTimeout(() => {}, ANIMATION_DURATION.NORMAL)  // 300ms

// 防抖延迟
const debouncedFn = debounce(fn, DEBOUNCE_DELAY)  // 300ms

// 请求超时
axios.get(url, { timeout: REQUEST_TIMEOUT })  // 30000ms
```

---

## 🎯 TypeScript 类型

### 基础类型

```typescript
import type { 
  Nullable,
  Optional,
  Maybe,
  Recordable,
  Fn,
  PromiseFn 
} from '@admin-core/shared'

// 可为 null
const value: Nullable<string> = null

// 可为 undefined
const value: Optional<string> = undefined

// 可为 null 或 undefined
const value: Maybe<string> = null

// 记录类型
const obj: Recordable = { key: 'value' }

// 函数类型
const fn: Fn<number, string> = (num) => String(num)

// Promise 函数类型
const asyncFn: PromiseFn<number, string> = async (num) => String(num)
```

### 深度类型

```typescript
import type { DeepPartial, DeepReadonly, DeepRequired } from '@admin-core/shared'

interface User {
  name: string
  profile: {
    age: number
    address: string
  }
}

// 深度部分类型
const user: DeepPartial<User> = {
  profile: { age: 18 }
}

// 深度只读类型
const user: DeepReadonly<User> = {
  name: 'Admin',
  profile: { age: 18, address: 'Beijing' }
}
// user.profile.age = 20  // 错误：只读属性
```

### API 类型

```typescript
import type { 
  ApiResponse,
  PaginationParams,
  PaginationResponse 
} from '@admin-core/shared'

// API 响应
const response: ApiResponse<User> = {
  code: 200,
  message: 'success',
  data: { id: 1, name: 'Admin' }
}

// 分页参数
const params: PaginationParams = {
  page: 1,
  pageSize: 10
}

// 分页响应
const result: PaginationResponse<User> = {
  list: [{ id: 1, name: 'Admin' }],
  total: 100,
  page: 1,
  pageSize: 10
}
```

### 业务类型

```typescript
import type { 
  UserInfo,
  MenuItem,
  TreeNode,
  Option,
  TableColumn 
} from '@admin-core/shared'

// 用户信息
const user: UserInfo = {
  id: 1,
  username: 'admin',
  nickname: '管理员',
  roles: ['admin'],
  permissions: ['user:read', 'user:write']
}

// 菜单项
const menu: MenuItem = {
  id: 1,
  name: 'dashboard',
  path: '/dashboard',
  icon: 'dashboard',
  meta: {
    title: '仪表盘',
    icon: 'dashboard'
  }
}

// 树形节点
const node: TreeNode = {
  id: 1,
  parentId: null,
  children: []
}

// 选项
const option: Option<number> = {
  label: '选项1',
  value: 1
}

// 表格列
const column: TableColumn = {
  prop: 'name',
  label: '姓名',
  width: 120
}
```

---

## 📚 完整 API

### 工具函数

| 函数 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `noop` | 空函数 | - | `void` |
| `sleep` | 延迟执行 | `ms: number` | `Promise<void>` |
| `debounce` | 防抖函数 | `fn, delay` | `Function` |
| `throttle` | 节流函数 | `fn, delay` | `Function` |
| `deepClone` | 深度克隆 | `obj: T` | `T` |
| `generateId` | 生成唯一 ID | `prefix?: string` | `string` |
| `formatFileSize` | 格式化文件大小 | `bytes, decimals?` | `string` |
| `formatNumber` | 格式化数字 | `num: number` | `string` |
| `getUrlParams` | 获取 URL 参数 | `url: string` | `Record<string, string>` |
| `buildUrlParams` | 构建 URL 参数 | `params: Record` | `string` |
| `downloadFile` | 下载文件 | `url, filename?` | `void` |
| `copyToClipboard` | 复制到剪贴板 | `text: string` | `Promise<boolean>` |
| `isEmpty` | 判断是否为空 | `value: any` | `boolean` |
| `removeEmpty` | 移除空值 | `obj: T` | `Partial<T>` |
| `flattenTree` | 树形数据扁平化 | `tree, childrenKey?` | `T[]` |
| `arrayToTree` | 数组转树形结构 | `list, options?` | `T[]` |

### 常量

| 常量 | 说明 | 类型 |
|------|------|------|
| `APP_NAME` | 应用名称 | `string` |
| `APP_VERSION` | 应用版本 | `string` |
| `DEFAULT_LOCALE` | 默认语言 | `string` |
| `STORAGE_KEYS` | 本地存储键名 | `object` |
| `HTTP_STATUS` | HTTP 状态码 | `object` |
| `HTTP_METHODS` | 请求方法 | `object` |
| `CONTENT_TYPES` | 内容类型 | `object` |
| `FILE_TYPES` | 文件类型 | `object` |
| `FILE_SIZE_LIMITS` | 文件大小限制 | `object` |
| `PAGINATION` | 分页默认值 | `object` |
| `REGEX` | 正则表达式 | `object` |
| `ANIMATION_DURATION` | 动画持续时间 | `object` |

### 类型

查看 [类型定义文件](./src/types/index.ts) 获取完整的类型列表。

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
