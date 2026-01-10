/**
 * 数组工具函数模块
 * @description 提供数组操作相关的工具函数，使用 ES2025 最新特性优化
 * @module array
 */

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
    ;[result[i], result[j]] = [result[j], result[i]]
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
  
  const result: any[][] = Array.from({ length: arr[0].length }, () => [])
  
  for (const tuple of arr) {
    for (let i = 0; i < tuple.length; i++) {
      result[i].push(tuple[i])
    }
  }
  
  return result
}
