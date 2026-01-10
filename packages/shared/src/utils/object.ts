/**
 * 对象工具函数模块
 * @description 提供对象操作相关的工具函数，使用 ES2025 最新特性优化
 * @module object
 */

// 从 es-toolkit 导入
export { get, set, isEqual } from 'es-toolkit/compat'
export { default as cloneDeep } from 'lodash.clonedeep'

/**
 * 深度克隆对象
 * @description 使用 structuredClone 进行深度克隆（支持大多数类型）
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
        clonedObj[key] = deepClone(obj[key])
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
    let current = result

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]
      if (!(k in current)) {
        current[k] = {}
      }
      current = current[k]
    }

    current[keys[keys.length - 1]] = value
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
    
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
}

/**
 * 对象键值对互换
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
