/**
 * 存储类型
 * @description 支持的浏览器存储类型
 */
export type StorageType = 'localStorage' | 'sessionStorage';

/**
 * 存储值包装器
 * @description 用于包装存储的数据和过期时间
 * @template T - 存储数据的类型
 */
export interface StorageValue<T> {
  /** 存储的实际数据 */
  data: T;
  /** 过期时间戳（毫秒），null 表示永不过期 */
  expiry: null | number;
}

/**
 * 存储项结构
 * @description 内部使用的存储项结构
 * @template T - 存储数据的类型
 */
export interface StorageItem<T> {
  /** 过期时间戳（毫秒），undefined 表示永不过期 */
  expiry?: number;
  /** 存储的实际值 */
  value: T;
}

/**
 * 存储管理器配置选项
 * @description 用于初始化 StorageManager 的配置
 */
export interface StorageManagerOptions {
  /** 存储键的前缀，用于命名空间隔离 */
  prefix?: string;
  /** 存储类型，默认为 localStorage */
  storageType?: StorageType;
}

/**
 * 存储缓存接口
 * @description 定义存储缓存的标准操作接口
 */
export interface IStorageCache {
  /**
   * 清除所有存储项
   */
  clear(): void;

  /**
   * 获取存储项
   * @template T - 返回值的类型
   * @param key - 存储键
   * @returns 存储的值，如果不存在或已过期则返回 null
   */
  getItem<T>(key: string): null | T;

  /**
   * 获取指定索引的键名
   * @param index - 索引位置
   * @returns 键名，如果索引无效则返回 null
   */
  key(index: number): null | string;

  /**
   * 获取存储项数量
   * @returns 存储项的数量
   */
  length(): number;

  /**
   * 移除指定的存储项
   * @param key - 存储键
   */
  removeItem(key: string): void;

  /**
   * 设置存储项
   * @template T - 存储值的类型
   * @param key - 存储键
   * @param value - 要存储的值
   * @param expiryInMinutes - 过期时间（分钟），可选
   */
  setItem<T>(key: string, value: T, expiryInMinutes?: number): void;
}
