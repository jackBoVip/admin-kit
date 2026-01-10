/**
 * 状态存储管理模块
 * @description 提供轻量级的响应式状态管理工具
 * @module store
 */

/**
 * 状态订阅器类型
 * @description 状态变化时的回调函数
 */
export type StoreSubscriber<T> = (state: T, prevState: T) => void

/**
 * 状态更新器类型
 * @description 用于更新状态的函数类型
 */
export type StoreUpdater<T> = (prevState: T) => T

/**
 * 状态存储接口
 * @description 定义状态存储的完整 API
 */
export interface Store<T> {
  /** 获取当前状态 */
  getState: () => T
  /** 设置新状态 */
  setState: (updater: T | StoreUpdater<T>) => void
  /** 订阅状态变化 */
  subscribe: (subscriber: StoreSubscriber<T>) => () => void
  /** 销毁存储 */
  destroy: () => void
}

/**
 * 创建状态存储
 * @description 创建一个轻量级的响应式状态存储，支持订阅和更新
 * @template T - 状态类型
 * @param initialState - 初始状态
 * @returns 状态存储对象
 * @example
 * ```typescript
 * // 创建用户状态存储
 * const userStore = createStore({
 *   name: 'Guest',
 *   age: 0,
 *   isLoggedIn: false
 * })
 * 
 * // 订阅状态变化
 * const unsubscribe = userStore.subscribe((state, prevState) => {
 *   console.log('状态更新:', state)
 *   console.log('之前状态:', prevState)
 * })
 * 
 * // 更新状态（对象方式）
 * userStore.setState({
 *   name: 'Alice',
 *   age: 25,
 *   isLoggedIn: true
 * })
 * 
 * // 更新状态（函数方式）
 * userStore.setState(prev => ({
 *   ...prev,
 *   age: prev.age + 1
 * }))
 * 
 * // 获取当前状态
 * const currentState = userStore.getState()
 * console.log(currentState) // { name: 'Alice', age: 26, isLoggedIn: true }
 * 
 * // 取消订阅
 * unsubscribe()
 * 
 * // 销毁存储
 * userStore.destroy()
 * ```
 */
export function createStore<T>(initialState: T): Store<T> {
  let state = initialState
  const subscribers = new Set<StoreSubscriber<T>>()

  return {
    getState: () => state,

    setState: (updater: T | StoreUpdater<T>) => {
      const prevState = state
      state = typeof updater === 'function' ? (updater as StoreUpdater<T>)(state) : updater

      // 通知所有订阅者
      for (const subscriber of subscribers) {
        subscriber(state, prevState)
      }
    },

    subscribe: (subscriber: StoreSubscriber<T>) => {
      subscribers.add(subscriber)

      // 返回取消订阅函数
      return () => {
        subscribers.delete(subscriber)
      }
    },

    destroy: () => {
      subscribers.clear()
    },
  }
}

/**
 * 创建派生状态
 * @description 基于源状态创建一个派生状态，当源状态变化时自动更新
 * @template T - 源状态类型
 * @template U - 派生状态类型
 * @param sourceStore - 源状态存储
 * @param selector - 选择器函数，从源状态中提取派生状态
 * @returns 派生状态存储对象
 * @example
 * ```typescript
 * const userStore = createStore({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   age: 30
 * })
 * 
 * // 创建派生状态：全名
 * const fullNameStore = createDerivedStore(
 *   userStore,
 *   state => `${state.firstName} ${state.lastName}`
 * )
 * 
 * console.log(fullNameStore.getState()) // 'John Doe'
 * 
 * // 更新源状态
 * userStore.setState(prev => ({
 *   ...prev,
 *   firstName: 'Jane'
 * }))
 * 
 * console.log(fullNameStore.getState()) // 'Jane Doe'
 * ```
 */
export function createDerivedStore<T, U>(
  sourceStore: Store<T>,
  selector: (state: T) => U
): Store<U> {
  const derivedStore = createStore(selector(sourceStore.getState()))

  // 订阅源状态变化
  sourceStore.subscribe(state => {
    derivedStore.setState(selector(state))
  })

  return derivedStore
}

/**
 * 组合多个状态存储
 * @description 将多个状态存储组合成一个统一的状态对象
 * @template T - 组合后的状态类型
 * @param stores - 状态存储映射对象
 * @returns 组合后的状态存储对象
 * @example
 * ```typescript
 * const userStore = createStore({ name: 'Alice', age: 25 })
 * const settingsStore = createStore({ theme: 'dark', language: 'zh-CN' })
 * 
 * // 组合多个存储
 * const appStore = combineStores({
 *   user: userStore,
 *   settings: settingsStore
 * })
 * 
 * console.log(appStore.getState())
 * // {
 * //   user: { name: 'Alice', age: 25 },
 * //   settings: { theme: 'dark', language: 'zh-CN' }
 * // }
 * 
 * // 订阅组合状态变化
 * appStore.subscribe((state, prevState) => {
 *   console.log('组合状态更新:', state)
 * })
 * ```
 */
export function combineStores<T extends Record<string, Store<any>>>(
  stores: T
): Store<{ [K in keyof T]: T[K] extends Store<infer U> ? U : never }> {
  type CombinedState = { [K in keyof T]: T[K] extends Store<infer U> ? U : never }

  // 获取初始组合状态
  const getInitialState = (): CombinedState => {
    const state = {} as CombinedState
    for (const [key, store] of Object.entries(stores)) {
      state[key as keyof CombinedState] = store.getState()
    }
    return state
  }

  const combinedStore = createStore(getInitialState())

  // 订阅所有子存储的变化
  for (const store of Object.values(stores)) {
    store.subscribe(() => {
      combinedStore.setState(getInitialState())
    })
  }

  return combinedStore
}

/**
 * 创建持久化状态存储
 * @description 创建一个支持本地存储持久化的状态存储
 * @template T - 状态类型
 * @param key - 存储键名
 * @param initialState - 初始状态
 * @param storage - 存储对象，默认为 localStorage
 * @returns 持久化状态存储对象
 * @example
 * ```typescript
 * // 创建持久化用户偏好设置
 * const preferencesStore = createPersistedStore('user-preferences', {
 *   theme: 'light',
 *   language: 'zh-CN',
 *   fontSize: 14
 * })
 * 
 * // 状态会自动保存到 localStorage
 * preferencesStore.setState(prev => ({
 *   ...prev,
 *   theme: 'dark'
 * }))
 * 
 * // 刷新页面后状态会自动恢复
 * console.log(preferencesStore.getState()) // { theme: 'dark', language: 'zh-CN', fontSize: 14 }
 * ```
 */
export function createPersistedStore<T>(
  key: string,
  initialState: T,
  storage: Storage = globalThis.localStorage
): Store<T> {
  // 尝试从存储中恢复状态
  const getPersistedState = (): T => {
    try {
      const item = storage.getItem(key)
      return item ? JSON.parse(item) : initialState
    } catch {
      return initialState
    }
  }

  const store = createStore(getPersistedState())

  // 订阅状态变化并持久化
  store.subscribe(state => {
    try {
      storage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error(`Failed to persist state for key "${key}":`, error)
    }
  })

  return store
}
