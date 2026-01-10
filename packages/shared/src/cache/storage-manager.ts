import type { StorageItem, StorageManagerOptions } from './types';

/**
 * 存储管理器
 * @description 提供带前缀、过期时间和类型安全的浏览器存储管理功能
 * 使用 ES2025 最新特性优化性能和代码质量
 * @example
 * ```typescript
 * // 创建 localStorage 管理器
 * const storage = new StorageManager({ prefix: 'app', storageType: 'localStorage' });
 * 
 * // 设置永久存储
 * storage.setItem('user', { name: 'John', age: 30 });
 * 
 * // 设置带过期时间的存储（5分钟）
 * storage.setItem('token', 'abc123', 5 * 60 * 1000);
 * 
 * // 获取存储项
 * const user = storage.getItem<{ name: string; age: number }>('user');
 * 
 * // 批量获取存储项
 * const items = storage.getItems(['user', 'token', 'config']);
 * 
 * // 移除存储项
 * storage.removeItem('token');
 * 
 * // 清除所有带前缀的存储项
 * storage.clear();
 * 
 * // 清除所有过期的存储项
 * storage.clearExpiredItems();
 * 
 * // 获取所有键
 * const keys = storage.keys();
 * 
 * // 获取存储项数量
 * const count = storage.size();
 * ```
 */
export class StorageManager {
  /** 存储键的前缀（使用私有字段语法） */
  readonly #prefix: string;
  
  /** 底层存储对象（localStorage 或 sessionStorage） */
  readonly #storage: Storage;

  /**
   * 创建存储管理器实例
   * @param options - 配置选项
   * @param options.prefix - 存储键的前缀，默认为空字符串
   * @param options.storageType - 存储类型，默认为 'localStorage'
   * @throws {Error} 如果浏览器不支持 Web Storage API
   * @example
   * ```typescript
   * const storage = new StorageManager({ 
   *   prefix: 'myapp', 
   *   storageType: 'localStorage' 
   * });
   * ```
   */
  constructor({
    prefix = '',
    storageType = 'localStorage',
  }: StorageManagerOptions = {}) {
    this.#prefix = prefix;
    this.#storage =
      storageType === 'localStorage'
        ? globalThis.localStorage
        : globalThis.sessionStorage;
  }

  /**
   * 清除所有带前缀的存储项
   * @description 使用现代数组方法遍历并删除所有匹配前缀的项
   * @example
   * ```typescript
   * storage.clear(); // 清除所有 'myapp-*' 的存储项
   * ```
   */
  clear(): void {
    // 使用 Array.from 和 filter 的现代写法
    const keysToRemove = Array.from(
      { length: this.#storage.length },
      (_, i) => this.#storage.key(i)
    )
      .filter((key): key is string => key?.startsWith(this.#prefix) ?? false);

    // 使用 for...of 替代 forEach（性能更好）
    for (const key of keysToRemove) {
      this.#storage.removeItem(key);
    }
  }

  /**
   * 清除所有过期的存储项
   * @description 遍历所有带前缀的存储项，自动删除已过期的项
   * @example
   * ```typescript
   * // 定期清理过期项
   * setInterval(() => {
   *   storage.clearExpiredItems();
   * }, 60000); // 每分钟清理一次
   * ```
   */
  clearExpiredItems(): void {
    const now = Date.now();
    const keysToCheck = Array.from(
      { length: this.#storage.length },
      (_, i) => this.#storage.key(i)
    )
      .filter((key): key is string => key?.startsWith(this.#prefix) ?? false);

    for (const fullKey of keysToCheck) {
      try {
        const itemStr = this.#storage.getItem(fullKey);
        if (!itemStr) continue;

        const item = JSON.parse(itemStr) as StorageItem<unknown>;
        // 如果已过期，删除该项
        if (item.expiry && now > item.expiry) {
          this.#storage.removeItem(fullKey);
        }
      } catch {
        // 解析失败，删除损坏的项
        this.#storage.removeItem(fullKey);
      }
    }
  }

  /**
   * 获取存储项
   * @template T - 返回值的类型
   * @param key - 存储键（不含前缀）
   * @param defaultValue - 当项不存在或已过期时返回的默认值，默认为 null
   * @returns 存储的值，如果项已过期、不存在或解析错误则返回默认值
   * @example
   * ```typescript
   * // 获取用户信息，不存在时返回 null
   * const user = storage.getItem<User>('user');
   * 
   * // 获取配置，不存在时返回默认配置
   * const config = storage.getItem('config', { theme: 'light' });
   * ```
   */
  getItem<T>(key: string, defaultValue: null | T = null): null | T {
    const fullKey = this.#getFullKey(key);
    const itemStr = this.#storage.getItem(fullKey);
    
    if (!itemStr) {
      return defaultValue;
    }

    try {
      const item = JSON.parse(itemStr) as StorageItem<T>;
      
      // 使用可选链和空值合并运算符
      if (item.expiry && Date.now() > item.expiry) {
        this.#storage.removeItem(fullKey);
        return defaultValue;
      }
      
      return item.value;
    } catch (error) {
      console.error(`Error parsing item with key "${fullKey}":`, error);
      this.#storage.removeItem(fullKey);
      return defaultValue;
    }
  }

  /**
   * 批量获取多个存储项
   * @template T - 返回值的类型
   * @param keys - 存储键数组（不含前缀）
   * @returns 键值对对象
   * @example
   * ```typescript
   * const items = storage.getItems<string>(['token', 'refreshToken']);
   * // { token: 'abc123', refreshToken: 'xyz789' }
   * ```
   */
  getItems<T>(keys: string[]): Record<string, null | T> {
    // 使用 Object.fromEntries 和 map 的现代写法
    return Object.fromEntries(
      keys.map(key => [key, this.getItem<T>(key)])
    );
  }

  /**
   * 检查存储项是否存在且未过期
   * @param key - 存储键（不含前缀）
   * @returns 如果存在且未过期返回 true
   * @example
   * ```typescript
   * if (storage.has('token')) {
   *   console.log('Token exists');
   * }
   * ```
   */
  has(key: string): boolean {
    const fullKey = this.#getFullKey(key);
    const itemStr = this.#storage.getItem(fullKey);
    
    if (!itemStr) return false;

    try {
      const item = JSON.parse(itemStr) as StorageItem<unknown>;
      // 检查是否过期
      if (item.expiry && Date.now() > item.expiry) {
        this.#storage.removeItem(fullKey);
        return false;
      }
      return true;
    } catch {
      this.#storage.removeItem(fullKey);
      return false;
    }
  }

  /**
   * 获取所有带前缀的键名（不含前缀）
   * @returns 键名数组
   * @example
   * ```typescript
   * const keys = storage.keys();
   * // ['user', 'token', 'config']
   * ```
   */
  keys(): string[] {
    return Array.from(
      { length: this.#storage.length },
      (_, i) => this.#storage.key(i)
    )
      .filter((key): key is string => key?.startsWith(this.#prefix) ?? false)
      .map(key => key.replace(this.#prefix, ''));
  }

  /**
   * 移除存储项
   * @param key - 存储键（不含前缀）
   * @example
   * ```typescript
   * storage.removeItem('token'); // 移除 'myapp-token'
   * ```
   */
  removeItem(key: string): void {
    const fullKey = this.#getFullKey(key);
    this.#storage.removeItem(fullKey);
  }

  /**
   * 批量移除多个存储项
   * @param keys - 存储键数组（不含前缀）
   * @example
   * ```typescript
   * storage.removeItems(['token', 'refreshToken', 'session']);
   * ```
   */
  removeItems(keys: string[]): void {
    for (const key of keys) {
      this.removeItem(key);
    }
  }

  /**
   * 设置存储项
   * @template T - 存储值的类型
   * @param key - 存储键（不含前缀）
   * @param value - 要存储的值（会被 JSON 序列化）
   * @param ttl - 存活时间（毫秒），可选。如果不提供则永不过期
   * @throws {Error} 如果存储空间已满或值无法序列化
   * @example
   * ```typescript
   * // 永久存储
   * storage.setItem('user', { name: 'John' });
   * 
   * // 存储 5 分钟
   * storage.setItem('token', 'abc123', 5 * 60 * 1000);
   * 
   * // 存储 1 小时
   * storage.setItem('session', data, 60 * 60 * 1000);
   * ```
   */
  setItem<T>(key: string, value: T, ttl?: number): void {
    const fullKey = this.#getFullKey(key);
    const expiry = ttl ? Date.now() + ttl : undefined;
    
    // 使用对象展开和条件属性的现代写法
    const item: StorageItem<T> = { 
      value, 
      ...(expiry !== undefined && { expiry }) 
    };
    
    try {
      this.#storage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      console.error(`Error setting item with key "${fullKey}":`, error);
      
      // 可能是存储空间已满，尝试清理过期项后重试
      this.clearExpiredItems();
      
      try {
        this.#storage.setItem(fullKey, JSON.stringify(item));
      } catch (retryError) {
        console.error(`Retry failed for key "${fullKey}":`, retryError);
        throw retryError;
      }
    }
  }

  /**
   * 批量设置多个存储项
   * @template T - 存储值的类型
   * @param items - 键值对对象
   * @param ttl - 存活时间（毫秒），可选。应用于所有项
   * @example
   * ```typescript
   * storage.setItems({
   *   user: { name: 'John' },
   *   token: 'abc123',
   *   config: { theme: 'dark' }
   * }, 60 * 60 * 1000); // 所有项 1 小时后过期
   * ```
   */
  setItems<T>(items: Record<string, T>, ttl?: number): void {
    for (const [key, value] of Object.entries(items)) {
      this.setItem(key, value, ttl);
    }
  }

  /**
   * 获取存储项数量（仅计算带前缀的项）
   * @returns 存储项数量
   * @example
   * ```typescript
   * const count = storage.size();
   * console.log(`Total items: ${count}`);
   * ```
   */
  size(): number {
    return this.keys().length;
  }

  /**
   * 获取完整的存储键
   * @param key - 原始键（不含前缀）
   * @returns 带前缀的完整键
   * @private
   * @example
   * ```typescript
   * // 如果 prefix = 'myapp'
   * this.#getFullKey('user') // 返回 'myapp-user'
   * ```
   */
  #getFullKey(key: string): string {
    return `${this.#prefix}-${key}`;
  }
}
