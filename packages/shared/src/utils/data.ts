/**
 * 数据处理工具函数模块
 * @description 包含数组、对象、字符串、树结构等数据处理工具函数
 * @module data
 */

// 从 es-toolkit 导入
export { get, set, isEqual } from 'es-toolkit/compat'
export { default as cloneDeep } from 'lodash.clonedeep'

// ============================================================================
// 数组工具函数
// ============================================================================

/**
 * 数组去重
 * @description 使用 Set 进行数组去重，保持原始顺序
 * @template T - 数组元素类型
 * @param arr - 要去重的数组
 * @returns 去重后的新数组
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 * unique(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * 根据指定字段对对象数组进行去重
 * @description 根据对象的某个字段值进行去重，保留第一次出现的对象
 * @template T - 对象类型
 * @param arr - 要去重的对象数组
 * @param key - 去重依据的字段名
 * @returns 去重后的对象数组
 * @example
 * ```typescript
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice2' }
 * ]
 * uniqueByField(users, 'id')
 * // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 * ```
 */
export function uniqueByField<T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): T[] {
  const seen = new Map<any, T>()

  return arr.filter(item => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    }
    seen.set(value, item)
    return true
  })
}

/**
 * 数组扁平化
 * @description 将多维数组扁平化为一维数组
 * @template T - 数组元素类型
 * @param arr - 要扁平化的数组
 * @param depth - 扁平化深度，默认为 Infinity（完全扁平化）
 * @returns 扁平化后的数组
 * @example
 * ```typescript
 * flatten([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
 * flatten([1, [2, [3, [4]]]], 2) // [1, 2, 3, [4]]
 * ```
 */
export function flatten<T>(arr: any[], depth = Infinity): T[] {
  return arr.flat(depth)
}

/**
 * 数组分块
 * @description 将数组分割成指定大小的块
 * @template T - 数组元素类型
 * @param arr - 要分块的数组
 * @param size - 每块的大小
 * @returns 分块后的二维数组
 * @example
 * ```typescript
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk(['a', 'b', 'c', 'd'], 3) // [['a', 'b', 'c'], ['d']]
 * ```
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0')
  }

  const result: T[][] = []

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }

  return result
}

/**
 * 数组随机排序
 * @description 使用 Fisher-Yates 算法随机打乱数组顺序
 * @template T - 数组元素类型
 * @param arr - 要打乱的数组
 * @returns 打乱后的新数组（不修改原数组）
 * @example
 * ```typescript
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (随机结果)
 * ```
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]!
    result[i] = result[j]!
    result[j] = temp
  }

  return result
}

/**
 * 随机抽取数组元素
 * @description 从数组中随机抽取指定数量的元素
 * @template T - 数组元素类型
 * @param arr - 源数组
 * @param count - 要抽取的数量，默认为 1
 * @returns 抽取的元素数组
 * @example
 * ```typescript
 * sample([1, 2, 3, 4, 5], 2) // [3, 1] (随机结果)
 * sample(['a', 'b', 'c']) // ['b'] (随机结果)
 * ```
 */
export function sample<T>(arr: T[], count = 1): T[] {
  if (count <= 0) return []
  if (count >= arr.length) return shuffle(arr)

  const shuffled = shuffle(arr)
  return shuffled.slice(0, count)
}

/**
 * 比较两个数组是否相等
 * @description 比较两个数组的元素是否完全相同（不考虑顺序）
 * @template T - 数组元素类型
 * @param a - 第一个数组
 * @param b - 第二个数组
 * @returns 如果数组相等返回 true，否则返回 false
 * @example
 * ```typescript
 * arraysEqual([1, 2, 3], [1, 2, 3]) // true
 * arraysEqual([1, 2, 3], [3, 2, 1]) // true
 * arraysEqual([1, 2, 3], [1, 2, 4]) // false
 * ```
 */
export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false

  const counter = new Map<T, number>()

  for (const value of a) {
    counter.set(value, (counter.get(value) ?? 0) + 1)
  }

  for (const value of b) {
    const count = counter.get(value)
    if (count === undefined || count === 0) {
      return false
    }
    counter.set(value, count - 1)
  }

  return true
}

/**
 * 数组交集
 * @description 返回两个数组的交集（共同元素）
 * @template T - 数组元素类型
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 交集数组
 * @example
 * ```typescript
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * intersection(['a', 'b'], ['b', 'c']) // ['b']
 * ```
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return unique(arr1.filter(item => set2.has(item)))
}

/**
 * 数组并集
 * @description 返回两个数组的并集（所有不重复元素）
 * @template T - 数组元素类型
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 并集数组
 * @example
 * ```typescript
 * union([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]
 * union(['a', 'b'], ['b', 'c']) // ['a', 'b', 'c']
 * ```
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2])
}

/**
 * 数组差集
 * @description 返回第一个数组中不在第二个数组中的元素
 * @template T - 数组元素类型
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 差集数组
 * @example
 * ```typescript
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 * difference(['a', 'b', 'c'], ['b']) // ['a', 'c']
 * ```
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return arr1.filter(item => !set2.has(item))
}

/**
 * 数组分组
 * @description 根据指定函数对数组元素进行分组
 * @template T - 数组元素类型
 * @template K - 分组键类型
 * @param arr - 要分组的数组
 * @param fn - 分组函数，返回分组键
 * @returns 分组后的 Map 对象
 * @example
 * ```typescript
 * const users = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ]
 * groupBy(users, user => user.age)
 * // Map { 25 => [{name: 'Alice', age: 25}, {name: 'Charlie', age: 25}], 30 => [{name: 'Bob', age: 30}] }
 * ```
 */
export function groupBy<T, K>(arr: T[], fn: (item: T) => K): Map<K, T[]> {
  const result = new Map<K, T[]>()

  for (const item of arr) {
    const key = fn(item)
    const group = result.get(key)

    if (group) {
      group.push(item)
    } else {
      result.set(key, [item])
    }
  }

  return result
}

/**
 * 数组求和
 * @description 计算数组中所有数字的总和
 * @param arr - 数字数组
 * @returns 总和
 * @example
 * ```typescript
 * sum([1, 2, 3, 4, 5]) // 15
 * sum([]) // 0
 * ```
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0)
}

/**
 * 数组平均值
 * @description 计算数组中所有数字的平均值
 * @param arr - 数字数组
 * @returns 平均值，如果数组为空返回 0
 * @example
 * ```typescript
 * average([1, 2, 3, 4, 5]) // 3
 * average([10, 20, 30]) // 20
 * average([]) // 0
 * ```
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0
  return sum(arr) / arr.length
}

/**
 * 数组最大值
 * @description 返回数组中的最大值
 * @param arr - 数字数组
 * @returns 最大值，如果数组为空返回 -Infinity
 * @example
 * ```typescript
 * max([1, 5, 3, 9, 2]) // 9
 * max([-1, -5, -3]) // -1
 * ```
 */
export function max(arr: number[]): number {
  return Math.max(...arr)
}

/**
 * 数组最小值
 * @description 返回数组中的最小值
 * @param arr - 数字数组
 * @returns 最小值，如果数组为空返回 Infinity
 * @example
 * ```typescript
 * min([1, 5, 3, 9, 2]) // 1
 * min([-1, -5, -3]) // -5
 * ```
 */
export function min(arr: number[]): number {
  return Math.min(...arr)
}

/**
 * 数组范围
 * @description 创建一个指定范围的数字数组
 * @param start - 起始值
 * @param end - 结束值（不包含）
 * @param step - 步长，默认为 1
 * @returns 范围数组
 * @example
 * ```typescript
 * range(0, 5) // [0, 1, 2, 3, 4]
 * range(1, 10, 2) // [1, 3, 5, 7, 9]
 * range(5, 0, -1) // [5, 4, 3, 2, 1]
 * ```
 */
export function range(start: number, end: number, step = 1): number[] {
  if (step === 0) {
    throw new Error('Step cannot be zero')
  }

  const result: number[] = []

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  }

  return result
}

/**
 * 数组压缩
 * @description 将多个数组的对应位置元素组合成元组数组
 * @template T - 元组类型
 * @param arrays - 要压缩的数组
 * @returns 压缩后的元组数组
 * @example
 * ```typescript
 * zip([1, 2, 3], ['a', 'b', 'c']) // [[1, 'a'], [2, 'b'], [3, 'c']]
 * zip([1, 2], ['a', 'b'], [true, false]) // [[1, 'a', true], [2, 'b', false]]
 * ```
 */
export function zip<T extends any[]>(...arrays: T[]): any[][] {
  if (arrays.length === 0) return []

  const minLength = Math.min(...arrays.map(arr => arr.length))
  const result: any[][] = []

  for (let i = 0; i < minLength; i++) {
    result.push(arrays.map(arr => arr[i]))
  }

  return result
}

/**
 * 数组解压
 * @description 将元组数组解压为多个数组
 * @template T - 元组类型
 * @param arr - 要解压的元组数组
 * @returns 解压后的数组
 * @example
 * ```typescript
 * unzip([[1, 'a'], [2, 'b'], [3, 'c']]) // [[1, 2, 3], ['a', 'b', 'c']]
 * ```
 */
export function unzip<T extends any[]>(arr: T[]): any[][] {
  if (arr.length === 0) return []

  const firstTuple = arr[0]
  if (!firstTuple) return []

  const result: any[][] = Array.from({ length: firstTuple.length }, () => [])

  for (const tuple of arr) {
    for (let i = 0; i < tuple.length; i++) {
      const row = result[i]
      if (row) {
        row.push(tuple[i])
      }
    }
  }

  return result
}

// ============================================================================
// 对象工具函数
// ============================================================================

/**
 * 深度克隆对象
 * @description 使用递归进行深度克隆（支持大多数类型）
 * @template T - 对象类型
 * @param obj - 要克隆的对象
 * @returns 克隆后的对象
 * @example
 * ```typescript
 * const original = { a: 1, b: { c: 2 } }
 * const cloned = deepClone(original)
 * cloned.b.c = 3
 * console.log(original.b.c) // 2
 * ```
 */
export function deepClone<T>(obj: T): T {
  // 处理基本类型
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理 Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as any
  }

  // 处理普通对象
  if (obj instanceof Object) {
    const clonedObj = {} as T

    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const value = obj[key]
        if (value !== undefined) {
          clonedObj[key] = deepClone(value)
        }
      }
    }

    return clonedObj
  }

  return obj
}

/**
 * 选取对象的指定属性
 * @description 从对象中选取指定的属性，创建新对象
 * @template T - 对象类型
 * @template K - 属性键类型
 * @param obj - 源对象
 * @param keys - 要选取的属性键数组
 * @returns 包含指定属性的新对象
 * @example
 * ```typescript
 * const user = { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }
 * pick(user, ['id', 'name']) // { id: 1, name: 'Alice' }
 * ```
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const key of keys) {
    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key]
    }
  }

  return result
}

/**
 * 排除对象的指定属性
 * @description 从对象中排除指定的属性，创建新对象
 * @template T - 对象类型
 * @template K - 属性键类型
 * @param obj - 源对象
 * @param keys - 要排除的属性键数组
 * @returns 排除指定属性后的新对象
 * @example
 * ```typescript
 * const user = { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }
 * omit(user, ['age', 'email']) // { id: 1, name: 'Alice' }
 * ```
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }

  for (const key of keys) {
    delete result[key]
  }

  return result
}

/**
 * 移除对象中的空值属性
 * @description 移除值为 null、undefined、空字符串的属性
 * @template T - 对象类型
 * @param obj - 源对象
 * @returns 移除空值后的新对象
 * @example
 * ```typescript
 * removeEmpty({ a: 1, b: null, c: '', d: undefined, e: 0 })
 * // { a: 1, e: 0 }
 * ```
 */
export function removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (value === null || value === undefined) return false
      if (typeof value === 'string' && value.trim() === '') return false
      return true
    })
  ) as Partial<T>
}

/**
 * 对象扁平化
 * @description 将嵌套对象扁平化为单层对象，使用点号分隔键名
 * @param obj - 要扁平化的对象
 * @param prefix - 键名前缀（内部使用）
 * @returns 扁平化后的对象
 * @example
 * ```typescript
 * flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } })
 * // { 'a': 1, 'b.c': 2, 'b.d.e': 3 }
 * ```
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey))
    } else {
      result[newKey] = value
    }
  }

  return result
}

/**
 * 对象反扁平化
 * @description 将扁平化的对象还原为嵌套对象
 * @param obj - 扁平化的对象
 * @returns 嵌套对象
 * @example
 * ```typescript
 * unflattenObject({ 'a': 1, 'b.c': 2, 'b.d.e': 3 })
 * // { a: 1, b: { c: 2, d: { e: 3 } } }
 * ```
 */
export function unflattenObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split('.')
    let current: Record<string, any> = result

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]
      if (!k) continue
      if (!(k in current)) {
        current[k] = {}
      }
      current = current[k] as Record<string, any>
    }

    const lastKey = keys[keys.length - 1]
    if (lastKey) {
      current[lastKey] = value
    }
  }

  return result
}

/**
 * 获取嵌套对象的字段值
 * @description 通过路径字符串安全地获取嵌套对象的值
 * @template T - 对象类型
 * @param obj - 要查找的对象
 * @param path - 字段路径，使用点号分隔
 * @returns 字段值，如果未找到返回 undefined
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 123 } } }
 * getNestedValue(obj, 'a.b.c') // 123
 * getNestedValue(obj, 'a.b.d') // undefined
 * ```
 */
export function getNestedValue<T>(obj: T, path: string): any {
  if (typeof path !== 'string' || path.length === 0) {
    throw new Error('Path must be a non-empty string')
  }

  const keys = path.split('.')
  let current: any = obj

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined
    }
    current = current[key]
  }

  return current
}

/**
 * 设置嵌套对象的字段值
 * @description 通过路径字符串设置嵌套对象的值，自动创建中间对象
 * @template T - 对象类型
 * @param obj - 要设置的对象
 * @param path - 字段路径，使用点号分隔
 * @param value - 要设置的值
 * @example
 * ```typescript
 * const obj = {}
 * setNestedValue(obj, 'a.b.c', 123)
 * console.log(obj) // { a: { b: { c: 123 } } }
 * ```
 */
export function setNestedValue<T extends Record<string, any>>(
  obj: T,
  path: string,
  value: any
): void {
  if (typeof path !== 'string' || path.length === 0) {
    throw new Error('Path must be a non-empty string')
  }

  const keys = path.split('.')
  let current: any = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!key) continue

    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }

    current = current[key]
  }

  const lastKey = keys[keys.length - 1]
  if (lastKey) {
    current[lastKey] = value
  }
}

/**
 * 对象键值互换
 * @description 将对象的键和值互换
 * @param obj - 源对象
 * @returns 键值互换后的对象
 * @example
 * ```typescript
 * invert({ a: '1', b: '2', c: '3' })
 * // { '1': 'a', '2': 'b', '3': 'c' }
 * ```
 */
export function invert(obj: Record<string, string | number>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [String(value), key])
  )
}

/**
 * 对象映射
 * @description 对对象的每个值应用映射函数
 * @template T - 源值类型
 * @template U - 目标值类型
 * @param obj - 源对象
 * @param fn - 映射函数
 * @returns 映射后的新对象
 * @example
 * ```typescript
 * mapValues({ a: 1, b: 2, c: 3 }, v => v * 2)
 * // { a: 2, b: 4, c: 6 }
 * ```
 */
export function mapValues<T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => U
): Record<string, U> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value, key)])
  )
}

/**
 * 对象键映射
 * @description 对对象的每个键应用映射函数
 * @template T - 值类型
 * @param obj - 源对象
 * @param fn - 映射函数
 * @returns 映射后的新对象
 * @example
 * ```typescript
 * mapKeys({ a: 1, b: 2, c: 3 }, k => k.toUpperCase())
 * // { A: 1, B: 2, C: 3 }
 * ```
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  fn: (key: string, value: T) => string
): Record<string, T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [fn(key, value), value])
  )
}

/**
 * 绑定对象方法
 * @description 将对象的所有方法绑定到对象实例
 * @template T - 对象类型
 * @param instance - 对象实例
 * @example
 * ```typescript
 * class MyClass {
 *   value = 42
 *   getValue() { return this.value }
 * }
 * const obj = new MyClass()
 * bindMethods(obj)
 * const { getValue } = obj
 * getValue() // 42 (this 仍然指向 obj)
 * ```
 */
export function bindMethods<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance)
  const propertyNames = Object.getOwnPropertyNames(prototype)

  for (const propertyName of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName)
    const propertyValue = instance[propertyName as keyof T]

    if (
      typeof propertyValue === 'function' &&
      propertyName !== 'constructor' &&
      descriptor &&
      !descriptor.get &&
      !descriptor.set
    ) {
      instance[propertyName as keyof T] = propertyValue.bind(instance)
    }
  }
}

/**
 * 对象深度合并
 * @description 深度合并多个对象，后面的对象会覆盖前面的
 * @template T - 对象类型
 * @param objects - 要合并的对象数组
 * @returns 合并后的新对象
 * @example
 * ```typescript
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function deepMerge<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  const result: any = {}

  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = deepMerge(result[key] || {}, value)
      } else {
        result[key] = value
      }
    }
  }

  return result
}

// ============================================================================
// 字符串工具函数
// ============================================================================

/**
 * 将字符串的首字母转换为大写
 * @param str - 要转换的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```typescript
 * capitalize('hello') // 'Hello'
 * capitalize('world') // 'World'
 * capitalize('') // ''
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将字符串的首字母转换为小写
 * @param str - 要转换的字符串
 * @returns 首字母小写的字符串
 * @example
 * ```typescript
 * uncapitalize('Hello') // 'hello'
 * uncapitalize('World') // 'world'
 * uncapitalize('') // ''
 * ```
 */
export function uncapitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 将字符串转换为驼峰命名法 (camelCase)
 * @param str - 要转换的字符串
 * @returns 驼峰命名的字符串
 * @example
 * ```typescript
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('hello world') // 'helloWorld'
 * camelCase('HelloWorld') // 'helloWorld'
 * ```
 */
export function camelCase(str: string): string {
  if (!str) return str

  // 处理各种分隔符：短横线、下划线、空格
  return str
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replaceAll(/^[A-Z]/, char => char.toLowerCase())
}

/**
 * 将字符串转换为短横线命名法 (kebab-case)
 * @param str - 要转换的字符串
 * @returns 短横线命名的字符串
 * @example
 * ```typescript
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('HelloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 * kebabCase('hello world') // 'hello-world'
 * ```
 */
export function kebabCase(str: string): string {
  if (!str) return str

  return str
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2') // 驼峰转短横线
    .replaceAll(/[\s_]+/g, '-') // 空格和下划线转短横线
    .toLowerCase()
}

/**
 * 将短横线命名法转换为驼峰命名法
 * @description 专门用于将 kebab-case 转换为 camelCase
 * @param str - 短横线命名的字符串
 * @returns 驼峰命名的字符串
 * @example
 * ```typescript
 * kebabToCamelCase('hello-world') // 'helloWorld'
 * kebabToCamelCase('my-component-name') // 'myComponentName'
 * ```
 */
export function kebabToCamelCase(str: string): string {
  if (!str) return str
  return str.replaceAll(/-([a-z])/g, (_, char) => char.toUpperCase())
}

/**
 * 将字符串转换为下划线命名法 (snake_case)
 * @param str - 要转换的字符串
 * @returns 下划线命名的字符串
 * @example
 * ```typescript
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('HelloWorld') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 * snakeCase('hello world') // 'hello_world'
 * ```
 */
export function snakeCase(str: string): string {
  if (!str) return str

  return str
    .replaceAll(/([a-z])([A-Z])/g, '$1_$2') // 驼峰转下划线
    .replaceAll(/[\s-]+/g, '_') // 空格和短横线转下划线
    .toLowerCase()
}

/**
 * 将字符串转换为帕斯卡命名法 (PascalCase)
 * @param str - 要转换的字符串
 * @returns 帕斯卡命名的字符串
 * @example
 * ```typescript
 * pascalCase('hello-world') // 'HelloWorld'
 * pascalCase('hello_world') // 'HelloWorld'
 * pascalCase('hello world') // 'HelloWorld'
 * pascalCase('helloWorld') // 'HelloWorld'
 * ```
 */
export function pascalCase(str: string): string {
  if (!str) return str

  const camelCased = camelCase(str)
  return capitalize(camelCased)
}

/**
 * 截断字符串到指定长度，并添加省略号
 * @param str - 要截断的字符串
 * @param length - 最大长度
 * @param suffix - 省略号后缀，默认为 '...'
 * @returns 截断后的字符串
 * @example
 * ```typescript
 * truncate('Hello World', 5) // 'Hello...'
 * truncate('Hello World', 20) // 'Hello World'
 * truncate('Hello World', 5, '…') // 'Hello…'
 * ```
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (!str || str.length <= length) return str
  return str.slice(0, length) + suffix
}

/**
 * 转义 HTML 特殊字符
 * @param str - 要转义的字符串
 * @returns 转义后的字符串
 * @example
 * ```typescript
 * escapeHtml('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
 * escapeHtml('Tom & Jerry') // 'Tom &amp; Jerry'
 * ```
 */
export function escapeHtml(str: string): string {
  if (!str) return str

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }

  return str.replaceAll(/[&<>"']/g, char => htmlEscapes[char] ?? char)
}

/**
 * 反转义 HTML 特殊字符
 * @param str - 要反转义的字符串
 * @returns 反转义后的字符串
 * @example
 * ```typescript
 * unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
 * unescapeHtml('Tom &amp; Jerry') // 'Tom & Jerry'
 * ```
 */
export function unescapeHtml(str: string): string {
  if (!str) return str

  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }

  return str.replaceAll(/&(?:amp|lt|gt|quot|#39);/g, entity => htmlUnescapes[entity] ?? entity)
}

/**
 * 格式化数字，添加千分位分隔符
 * @param num - 要格式化的数字
 * @param decimals - 小数位数，默认为 2
 * @param decimalSeparator - 小数分隔符，默认为 '.'
 * @param thousandsSeparator - 千分位分隔符，默认为 ','
 * @returns 格式化后的字符串
 * @example
 * ```typescript
 * formatNumber(1234567.89) // '1,234,567.89'
 * formatNumber(1234567.89, 0) // '1,234,568'
 * formatNumber(1234567.89, 2, ',', ' ') // '1 234 567,89'
 * ```
 */
export function formatNumber(
  num: number,
  decimals = 2,
  decimalSeparator = '.',
  thousandsSeparator = ','
): string {
  const fixed = num.toFixed(decimals)
  const parts = fixed.split('.')
  const integer = parts[0] || '0'
  const decimal = parts[1]

  // 添加千分位分隔符
  const formattedInteger = integer.replaceAll(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)

  // 如果有小数部分，则添加小数分隔符
  return decimal ? `${formattedInteger}${decimalSeparator}${decimal}` : formattedInteger
}

/**
 * 移除字符串中的所有空白字符
 * @param str - 要处理的字符串
 * @returns 移除空白后的字符串
 * @example
 * ```typescript
 * removeWhitespace('  hello  world  ') // 'helloworld'
 * removeWhitespace('hello\n\tworld') // 'helloworld'
 * ```
 */
export function removeWhitespace(str: string): string {
  if (!str) return str
  return str.replaceAll(/\s+/g, '')
}

/**
 * 将字符串重复指定次数
 * @param str - 要重复的字符串
 * @param count - 重复次数
 * @returns 重复后的字符串
 * @example
 * ```typescript
 * repeat('abc', 3) // 'abcabcabc'
 * repeat('*', 5) // '*****'
 * ```
 */
export function repeat(str: string, count: number): string {
  if (!str || count <= 0) return ''
  return str.repeat(count)
}

/**
 * 反转字符串
 * @param str - 要反转的字符串
 * @returns 反转后的字符串
 * @example
 * ```typescript
 * reverse('hello') // 'olleh'
 * reverse('12345') // '54321'
 * ```
 */
export function reverse(str: string): string {
  if (!str) return str
  return Array.from(str).reverse().join('')
}

/**
 * 检查字符串是否以指定的子串开头（忽略大小写）
 * @param str - 要检查的字符串
 * @param searchString - 要搜索的子串
 * @returns 是否以指定子串开头
 * @example
 * ```typescript
 * startsWithIgnoreCase('Hello World', 'hello') // true
 * startsWithIgnoreCase('Hello World', 'HELLO') // true
 * startsWithIgnoreCase('Hello World', 'world') // false
 * ```
 */
export function startsWithIgnoreCase(str: string, searchString: string): boolean {
  if (!str || !searchString) return false
  return str.toLowerCase().startsWith(searchString.toLowerCase())
}

/**
 * 检查字符串是否以指定的子串结尾（忽略大小写）
 * @param str - 要检查的字符串
 * @param searchString - 要搜索的子串
 * @returns 是否以指定子串结尾
 * @example
 * ```typescript
 * endsWithIgnoreCase('Hello World', 'world') // true
 * endsWithIgnoreCase('Hello World', 'WORLD') // true
 * endsWithIgnoreCase('Hello World', 'hello') // false
 * ```
 */
export function endsWithIgnoreCase(str: string, searchString: string): boolean {
  if (!str || !searchString) return false
  return str.toLowerCase().endsWith(searchString.toLowerCase())
}

// ============================================================================
// 树形数据工具函数
// ============================================================================

/**
 * 树形结构配置选项
 */
export interface TreeConfigOptions {
  /** 子节点属性名称，默认为 'children' */
  childProps?: string
}

/**
 * 遍历树形结构，并返回所有节点中指定的值
 * @param tree - 树形结构数组
 * @param getValue - 获取节点值的函数
 * @param options - 配置选项
 * @returns 所有节点中指定的值的数组
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * const ids = traverseTreeValues(tree, node => node.id) // [1, 2]
 * const names = traverseTreeValues(tree, node => node.name) // ['Node 1', 'Node 2']
 * ```
 */
export function traverseTreeValues<T, V>(
  tree: T[],
  getValue: (node: T) => V,
  options?: TreeConfigOptions
): V[] {
  const result: V[] = []
  const { childProps = 'children' } = options ?? {}

  const dfs = (treeNode: T): void => {
    const value = getValue(treeNode)
    result.push(value)

    const children = (treeNode as Record<string, any>)?.[childProps]
    if (!children || !Array.isArray(children) || children.length === 0) {
      return
    }

    for (const child of children) {
      dfs(child)
    }
  }

  for (const treeNode of tree) {
    dfs(treeNode)
  }

  return result.filter(Boolean)
}

/**
 * 根据条件过滤树形结构的节点
 * @param tree - 要过滤的树形结构数组
 * @param filter - 过滤条件函数
 * @param options - 配置选项
 * @returns 过滤后的树形结构
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', active: true, children: [
 *     { id: 2, name: 'Node 2', active: false },
 *     { id: 3, name: 'Node 3', active: true }
 *   ]}
 * ]
 * const filtered = filterTree(tree, node => node.active)
 * ```
 */
export function filterTree<T extends Record<string, any>>(
  tree: T[],
  filter: (node: T) => boolean,
  options?: TreeConfigOptions
): T[] {
  const { childProps = 'children' } = options ?? {}

  const _filterTree = (nodes: T[]): T[] => {
    return nodes.filter((node: Record<string, any>) => {
      if (filter(node as T)) {
        if (node[childProps]) {
          node[childProps] = _filterTree(node[childProps])
        }
        return true
      }
      return false
    })
  }

  return _filterTree(tree)
}

/**
 * 映射树形结构的节点
 * @param tree - 要映射的树形结构数组
 * @param mapper - 映射函数
 * @param options - 配置选项
 * @returns 映射后的树形结构
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * const mapped = mapTree(tree, node => ({
 *   ...node,
 *   label: node.name
 * }))
 * ```
 */
export function mapTree<T, V extends Record<string, any>>(
  tree: T[],
  mapper: (node: T) => V,
  options?: TreeConfigOptions
): V[] {
  const { childProps = 'children' } = options ?? {}

  return tree.map(node => {
    const mappedNode: Record<string, any> = mapper(node)

    if (mappedNode[childProps]) {
      mappedNode[childProps] = mapTree(mappedNode[childProps], mapper, options)
    }

    return mappedNode as V
  })
}

/**
 * 对树形结构数据进行递归排序
 * @param treeData - 树形数据数组
 * @param sortFunction - 排序函数
 * @param options - 配置选项
 * @returns 排序后的树形数据
 * @example
 * ```typescript
 * const tree = [
 *   { id: 3, name: 'C', children: [
 *     { id: 2, name: 'B' },
 *     { id: 1, name: 'A' }
 *   ]},
 *   { id: 1, name: 'A' }
 * ]
 * const sorted = sortTree(tree, (a, b) => a.id - b.id)
 * ```
 */
export function sortTree<T extends Record<string, any>>(
  treeData: T[],
  sortFunction: (a: T, b: T) => number,
  options?: TreeConfigOptions
): T[] {
  const { childProps = 'children' } = options ?? {}

  // 使用 [...arr].sort() 替代 toSorted() 以兼容 ES2021
  return [...treeData].sort(sortFunction).map(item => {
    const children = item[childProps]

    if (children && Array.isArray(children) && children.length > 0) {
      return {
        ...item,
        [childProps]: sortTree(children, sortFunction, options),
      }
    }

    return item
  })
}

/**
 * 将树形结构扁平化为一维数组
 * @param tree - 树形结构数组
 * @param options - 配置选项
 * @returns 扁平化后的数组
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * const flattened = flattenTree(tree)
 * // [
 * //   { id: 1, name: 'Node 1', children: [...] },
 * //   { id: 2, name: 'Node 2' }
 * // ]
 * ```
 */
export function flattenTree<T extends Record<string, any>>(
  tree: T[],
  options?: TreeConfigOptions
): T[] {
  const { childProps = 'children' } = options ?? {}
  const result: T[] = []

  const flatten = (nodes: T[]): void => {
    for (const node of nodes) {
      result.push(node)

      const children = node[childProps]
      if (children && Array.isArray(children) && children.length > 0) {
        flatten(children)
      }
    }
  }

  flatten(tree)
  return result
}

/**
 * 将扁平数组转换为树形结构
 * @param list - 扁平数组
 * @param options - 配置选项
 * @returns 树形结构数组
 * @example
 * ```typescript
 * const list = [
 *   { id: 1, name: 'Node 1', parentId: null },
 *   { id: 2, name: 'Node 2', parentId: 1 },
 *   { id: 3, name: 'Node 3', parentId: 1 }
 * ]
 * const tree = arrayToTree(list, {
 *   idKey: 'id',
 *   parentKey: 'parentId',
 *   childProps: 'children'
 * })
 * ```
 */
export function arrayToTree<T extends Record<string, any>>(
  list: T[],
  options?: TreeConfigOptions & {
    idKey?: string
    parentKey?: string
    rootValue?: any
  }
): T[] {
  const {
    childProps = 'children',
    idKey = 'id',
    parentKey = 'parentId',
    rootValue = null,
  } = options ?? {}

  const map = new Map<any, T>()
  const result: T[] = []

  // 第一遍：建立 id 到节点的映射
  for (const item of list) {
    map.set(item[idKey], { ...item, [childProps]: [] })
  }

  // 第二遍：建立父子关系
  for (const item of list) {
    const node = map.get(item[idKey])
    const parentId = item[parentKey]

    if (parentId === rootValue || parentId === undefined) {
      result.push(node!)
    } else {
      const parent = map.get(parentId)
      if (parent) {
        parent[childProps].push(node!)
      }
    }
  }

  return result
}

/**
 * 在树形结构中查找节点
 * @param tree - 树形结构数组
 * @param predicate - 查找条件函数
 * @param options - 配置选项
 * @returns 找到的节点，未找到返回 undefined
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * const node = findTreeNode(tree, node => node.id === 2)
 * // { id: 2, name: 'Node 2' }
 * ```
 */
export function findTreeNode<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options?: TreeConfigOptions
): T | undefined {
  const { childProps = 'children' } = options ?? {}

  for (const node of tree) {
    if (predicate(node)) {
      return node
    }

    const children = node[childProps]
    if (children && Array.isArray(children) && children.length > 0) {
      const found = findTreeNode(children, predicate, options)
      if (found) {
        return found
      }
    }
  }

  return undefined
}


// ============================================================================
// 对象差异比较工具函数
// ============================================================================

/**
 * 对象差异结果类型
 * @description 递归的部分类型，表示对象的差异
 */
export type DiffResult<T> = Partial<{
  [K in keyof T]: T[K] extends object ? DiffResult<T[K]> : T[K]
}>

/**
 * 深度比较两个对象，返回差异部分
 * @description 比较两个对象，返回第二个对象中与第一个对象不同的部分，使用 ESNext 最新特性
 * @template T - 对象类型
 * @param obj1 - 第一个对象（原始对象）
 * @param obj2 - 第二个对象（新对象）
 * @returns 差异对象，只包含不同的字段
 * @example
 * ```typescript
 * const old = { a: 1, b: { c: 2, d: 3 }, e: [1, 2] }
 * const new = { a: 1, b: { c: 4, d: 3 }, e: [1, 3] }
 * diff(old, new)
 * // { b: { c: 4 }, e: [1, 3] }
 * ```
 */
export function diff<T extends Record<string, any>>(
  obj1: T,
  obj2: T
): DiffResult<T> {
  /**
   * 递归查找差异
   * @param o1 - 第一个值
   * @param o2 - 第二个值
   * @returns 差异值，如果相同则返回 undefined
   */
  function findDifferences(o1: any, o2: any): any {
    // 处理数组
    if (Array.isArray(o1) && Array.isArray(o2)) {
      if (!arraysEqual(o1, o2)) {
        return o2
      }
      return undefined
    }

    // 处理对象
    if (
      typeof o1 === 'object' &&
      typeof o2 === 'object' &&
      o1 !== null &&
      o2 !== null
    ) {
      const diffResult: any = {}
      const keys = new Set([...Object.keys(o1), ...Object.keys(o2)])

      for (const key of keys) {
        const valueDiff = findDifferences(o1[key], o2[key])
        if (valueDiff !== undefined) {
          diffResult[key] = valueDiff
        }
      }

      return Object.keys(diffResult).length > 0 ? diffResult : undefined
    }

    // 处理基本类型
    return o1 === o2 ? undefined : o2
  }

  return findDifferences(obj1, obj2)
}
