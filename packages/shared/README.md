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

---

## 🚀 快速开始

```typescript
// 导入工具函数
import { debounce, formatFileSize, deepClone } from '@admin-core/shared'

// 导入常量
import { STORAGE_KEYS, HTTP_STATUS } from '@admin-core/shared'

// 导入类型
import type { ApiResponse, PaginationParams } from '@admin-core/shared'
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
