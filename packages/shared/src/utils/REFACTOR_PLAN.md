# Utils 目录重构计划

## 📋 重构目标

1. **使用 ES2025 最新特性**
2. **完善中文注解信息**
3. **按功能重新分类文件**
4. **优化代码结构和命名**
5. **提高代码可维护性**

## 🗂️ 新的文件结构

### 核心模块

#### 1. **async.ts** - 异步工具
**功能**：
- `noop()` - 空函数
- `sleep(ms)` - 延迟执行
- `debounce(fn, delay)` - 防抖函数
- `throttle(fn, delay)` - 节流函数
- `to(promise, errorExt)` - Promise 错误处理
- `makeCancelable(promise)` - 可取消的 Promise
- `retry(fn, retries, delay)` - 重试函数
- `timeout(promise, ms)` - 超时包装器

**ES2025 特性**：
- 使用 `globalThis.setTimeout` 替代 `window.setTimeout`
- 使用 `undefined` 替代 `null` 作为初始值
- 使用 `for...of` 循环
- 使用可选链 `?.`

#### 2. **env.ts** - 环境判断
**功能**：
- `isDev` - 是否为开发环境
- `isProd` - 是否为生产环境
- `isBrowser` - 是否为浏览器环境
- `isServer` - 是否为服务端环境
- `isMacOs()` - 是否为 Mac OS
- `isWindowsOs()` - 是否为 Windows
- `isMobile()` - 是否为移动设备
- `isIOS()` - 是否为 iOS
- `isAndroid()` - 是否为 Android
- `isWechat()` - 是否为微信浏览器
- `isTouchDevice()` - 是否支持触摸
- `getBrowserInfo()` - 获取浏览器信息
- `getOSInfo()` - 获取操作系统信息

**ES2025 特性**：
- 使用 `?.` 可选链访问 `process.env`
- 使用 `const` 声明常量

#### 3. **validation.ts** - 验证工具
**功能**：
- `isUndefined(value)` - 检查是否为 undefined
- `isBoolean(value)` - 检查是否为 boolean
- `isNumber(value)` - 检查是否为数字
- `isEmpty(value)` - 检查是否为空
- `isHttpUrl(url)` - 检查是否为 HTTP URL
- `isWindow(value)` - 检查是否为 window 对象
- `isDate(value)` - 检查是否为 Date
- `isPromise(value)` - 检查是否为 Promise
- `isRegExp(value)` - 检查是否为正则
- `isNull(value)` - 检查是否为 null
- `isNullOrUndefined(value)` - 检查是否为 null 或 undefined
- `isArray(value)` - 检查是否为数组
- `isMap(value)` - 检查是否为 Map
- `isSet(value)` - 检查是否为 Set
- `isSymbol(value)` - 检查是否为 Symbol
- `isBigInt(value)` - 检查是否为 BigInt
- `isEmail(email)` - 检查是否为邮箱
- `isPhone(phone)` - 检查是否为手机号
- `isIdCard(idCard)` - 检查是否为身份证号
- `getFirstNonNullOrUndefined(...values)` - 获取第一个非空值

**ES2025 特性**：
- 使用类型守卫 `value is Type`
- 使用 `for...of` 循环
- 使用 `instanceof` 检查类型

### 待创建的模块

#### 4. **array.ts** - 数组工具
**计划功能**：
- `unique(arr)` - 数组去重
- `uniqueByField(arr, key)` - 根据字段去重
- `flatten(arr, depth)` - 数组扁平化
- `chunk(arr, size)` - 数组分块
- `shuffle(arr)` - 数组随机排序
- `sample(arr, count)` - 随机抽取元素
- `arraysEqual(a, b)` - 比较数组是否相等
- `intersection(arr1, arr2)` - 数组交集
- `union(arr1, arr2)` - 数组并集
- `difference(arr1, arr2)` - 数组差集

**ES2025 特性**：
- 使用 `Array.from()` 创建数组
- 使用 `toSorted()` 不可变排序
- 使用 `toSpliced()` 不可变切片
- 使用 `Set` 进行去重

#### 5. **object.ts** - 对象工具
**计划功能**：
- `deepClone(obj)` - 深度克隆
- `merge(target, source)` - 对象合并
- `get(obj, path)` - 获取嵌套值
- `set(obj, path, value)` - 设置嵌套值
- `pick(obj, keys)` - 选取属性
- `omit(obj, keys)` - 排除属性
- `removeEmpty(obj)` - 移除空值
- `flattenObject(obj)` - 对象扁平化
- `unflattenObject(obj)` - 对象反扁平化

**ES2025 特性**：
- 使用 `Object.fromEntries()` 和 `Object.entries()`
- 使用 `structuredClone()` 进行深度克隆
- 使用对象展开运算符 `...`
- 使用 `Object.hasOwn()` 替代 `hasOwnProperty`

#### 6. **string.ts** - 字符串工具
**计划功能**：
- `capitalize(str)` - 首字母大写
- `camelCase(str)` - 转驼峰命名
- `kebabCase(str)` - 转短横线命名
- `snakeCase(str)` - 转下划线命名
- `pascalCase(str)` - 转帕斯卡命名
- `truncate(str, length)` - 截断字符串
- `escape(str)` - 转义 HTML
- `unescape(str)` - 反转义 HTML
- `formatNumber(num)` - 格式化数字

**ES2025 特性**：
- 使用模板字符串
- 使用 `String.prototype.replaceAll()`
- 使用 `String.prototype.at()` 访问字符

#### 7. **url.ts** - URL 工具
**计划功能**：
- `getUrlParams(url)` - 获取 URL 参数
- `buildUrlParams(params)` - 构建 URL 参数
- `parseUrl(url)` - 解析 URL
- `joinUrl(base, path)` - 拼接 URL
- `openWindow(url, options)` - 打开新窗口
- `openRouteInNewWindow(path)` - 在新窗口打开路由

**ES2025 特性**：
- 使用 `URL` 和 `URLSearchParams` API
- 使用对象展开运算符

#### 8. **file.ts** - 文件工具
**计划功能**：
- `formatFileSize(bytes, decimals)` - 格式化文件大小
- `downloadFile(url, filename)` - 下载文件
- `downloadFileFromUrl(options)` - 从 URL 下载
- `downloadFileFromBase64(options)` - 从 Base64 下载
- `downloadFileFromBlob(options)` - 从 Blob 下载
- `urlToBase64(url)` - URL 转 Base64
- `loadScript(src)` - 加载 JS 文件

**ES2025 特性**：
- 使用 `async/await`
- 使用 `Promise`
- 使用解构赋值

#### 9. **dom.ts** - DOM 工具
**计划功能**：
- `getElementVisibleRect(element)` - 获取元素可见区域
- `getScrollbarWidth()` - 获取滚动条宽度
- `needsScrollbar()` - 是否需要滚动条
- `triggerWindowResize()` - 触发窗口 resize 事件

**ES2025 特性**：
- 使用 `?.` 可选链
- 使用 `??` 空值合并
- 使用 `Math.max()` 和 `Math.min()`

#### 10. **tree.ts** - 树形数据工具
**计划功能**：
- `traverseTreeValues(tree, getValue)` - 遍历树获取值
- `filterTree(tree, filter)` - 过滤树节点
- `mapTree(tree, mapper)` - 映射树节点
- `sortTree(tree, sortFn)` - 排序树节点
- `flattenTree(tree)` - 树形数据扁平化
- `arrayToTree(list, options)` - 数组转树形结构

**ES2025 特性**：
- 使用 `toSorted()` 不可变排序
- 使用 `for...of` 循环
- 使用 `Map` 提高性能

#### 11. **date.ts** - 日期工具
**保留现有功能**：
- `formatDate(time, format)` - 格式化日期
- `formatDateTime(time)` - 格式化日期时间
- `isDate(value)` - 是否为 Date
- `isDayjsObject(value)` - 是否为 Dayjs 对象
- `getSystemTimezone()` - 获取系统时区
- `setCurrentTimezone(timezone)` - 设置时区
- `getCurrentTimezone()` - 获取当前时区

**优化**：
- 添加完善的中文注解
- 使用 `?.` 可选链

#### 12. **clipboard.ts** - 剪贴板工具
**计划功能**：
- `copyToClipboard(text)` - 复制文本到剪贴板
- `readFromClipboard()` - 从剪贴板读取
- `copyImageToClipboard(blob)` - 复制图片到剪贴板

**ES2025 特性**：
- 使用 `navigator.clipboard` API
- 使用 `async/await`

#### 13. **css.ts** - CSS 工具
**计划功能**：
- `cn(...inputs)` - 合并 className
- `updateCSSVariables(variables)` - 更新 CSS 变量

**ES2025 特性**：
- 使用 `for...in` 循环
- 使用 `Object.prototype.hasOwnProperty.call()`

#### 14. **state.ts** - 状态管理工具
**保留现有功能**：
- `StateHandler` 类 - 状态处理器

**优化**：
- 添加完善的中文注解
- 使用私有字段 `#`

#### 15. **progress.ts** - 进度条工具
**保留现有功能**：
- `startProgress()` - 开始进度条
- `stopProgress()` - 停止进度条

**优化**：
- 添加完善的中文注解
- 使用 `?.` 可选链

#### 16. **diff.ts** - 差异比较工具
**保留现有功能**：
- `arraysEqual(a, b)` - 比较数组是否相等
- `diff(obj1, obj2)` - 对象差异比较

**优化**：
- 添加完善的中文注解
- 使用 `Set` 提高性能

#### 17. **merge.ts** - 合并工具
**保留现有功能**：
- `merge(target, source)` - 对象合并
- `mergeWithArrayOverride` - 数组覆盖合并

**优化**：
- 添加完善的中文注解

#### 18. **util.ts** - 通用工具
**保留现有功能**：
- `bindMethods(instance)` - 绑定方法
- `getNestedValue(obj, path)` - 获取嵌套值

**优化**：
- 添加完善的中文注解
- 使用 `for...of` 循环

## 🎯 ES2025 特性应用

### 1. 私有字段 (`#`)
```typescript
class StateHandler {
  #condition = false
  #resolveCondition = null
}
```

### 2. `globalThis`
```typescript
globalThis.setTimeout(resolve, ms)
globalThis.localStorage
```

### 3. 现代数组方法
```typescript
// toSorted() - 不可变排序
const sorted = arr.toSorted((a, b) => a - b)

// toSpliced() - 不可变切片
const spliced = arr.toSpliced(0, 1)

// Array.from() - 创建数组
const keys = Array.from({ length: 10 }, (_, i) => i)
```

### 4. `Object.fromEntries()` 和 `Object.entries()`
```typescript
const obj = Object.fromEntries(
  Object.entries(source).filter(([key, value]) => value !== null)
)
```

### 5. 可选链 (`?.`) 和空值合并 (`??`)
```typescript
const value = obj?.nested?.property ?? defaultValue
```

### 6. `for...of` 循环
```typescript
for (const item of items) {
  console.log(item)
}
```

### 7. `structuredClone()`
```typescript
const cloned = structuredClone(obj)
```

### 8. `Object.hasOwn()`
```typescript
if (Object.hasOwn(obj, 'key')) {
  // ...
}
```

### 9. `String.prototype.replaceAll()`
```typescript
const result = str.replaceAll('old', 'new')
```

### 10. `String.prototype.at()`
```typescript
const lastChar = str.at(-1)
```

## 📝 注解规范

### JSDoc 注解模板
```typescript
/**
 * 函数简短描述
 * @description 详细描述（可选）
 * @template T - 泛型参数说明（如果有）
 * @param paramName - 参数说明
 * @returns 返回值说明
 * @throws {ErrorType} 抛出错误说明（如果有）
 * @example
 * ```typescript
 * // 使用示例
 * const result = functionName(param)
 * console.log(result) // 预期输出
 * ```
 */
```

### 模块注解模板
```typescript
/**
 * 模块名称
 * @description 模块功能描述，使用 ES2025 最新特性优化
 * @module moduleName
 */
```

## 🔄 迁移步骤

### 阶段 1：创建新文件（已完成）
- ✅ async.ts
- ✅ env.ts
- ✅ validation.ts

### 阶段 2：创建剩余核心文件
- ⏳ array.ts
- ⏳ object.ts
- ⏳ string.ts
- ⏳ url.ts
- ⏳ file.ts

### 阶段 3：优化现有文件
- ⏳ dom.ts
- ⏳ tree.ts
- ⏳ date.ts
- ⏳ clipboard.ts
- ⏳ css.ts

### 阶段 4：整合和清理
- ⏳ 更新 index.ts
- ⏳ 删除旧文件
- ⏳ 更新文档
- ⏳ 测试验证

## 📊 预期收益

1. **代码质量提升**
   - 使用最新 ES 特性
   - 更好的类型安全
   - 更清晰的代码结构

2. **可维护性提升**
   - 按功能分类清晰
   - 完善的中文注解
   - 统一的代码风格

3. **性能优化**
   - 使用原生 API
   - 减少不必要的依赖
   - 更好的 Tree-shaking

4. **开发体验提升**
   - 更好的 IDE 提示
   - 更清晰的文档
   - 更易于查找和使用

## 🎉 总结

本次重构将 utils 目录从 18 个零散文件重新组织为 18 个功能明确的模块，每个模块都使用 ES2025 最新特性优化，并添加了完善的中文注解。这将大大提升代码的可维护性和开发体验。
