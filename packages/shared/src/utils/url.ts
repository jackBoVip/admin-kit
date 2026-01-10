/**
 * URL 工具模块
 * @description 提供 URL 处理相关的工具函数，使用 ES2025 最新特性优化
 * @module url
 */

/**
 * 打开新窗口的选项
 */
export interface OpenWindowOptions {
  /** 是否设置 noopener，默认为 true */
  noopener?: boolean;
  /** 是否设置 noreferrer，默认为 true */
  noreferrer?: boolean;
  /** 目标窗口，默认为 '_blank' */
  target?: '_blank' | '_parent' | '_self' | '_top' | string;
}

/**
 * 获取 URL 中的查询参数
 * @param url - URL 字符串，如果不传则使用当前页面 URL
 * @returns 查询参数对象
 * @example
 * ```typescript
 * getUrlParams('https://example.com?name=John&age=30')
 * // { name: 'John', age: '30' }
 * 
 * getUrlParams() // 获取当前页面的查询参数
 * ```
 */
export function getUrlParams(url?: string): Record<string, string> {
  const targetUrl = url ?? globalThis.location?.href;
  if (!targetUrl) return {};
  
  try {
    const urlObj = new URL(targetUrl);
    const params: Record<string, string> = {};
    
    for (const [key, value] of urlObj.searchParams.entries()) {
      params[key] = value;
    }
    
    return params;
  } catch {
    return {};
  }
}

/**
 * 构建 URL 查询参数字符串
 * @param params - 参数对象
 * @returns 查询参数字符串（不包含 ?）
 * @example
 * ```typescript
 * buildUrlParams({ name: 'John', age: '30' })
 * // 'name=John&age=30'
 * 
 * buildUrlParams({ search: 'hello world', page: '1' })
 * // 'search=hello+world&page=1'
 * ```
 */
export function buildUrlParams(params: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) return '';
  
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  
  return searchParams.toString();
}

/**
 * 解析 URL 为各个组成部分
 * @param url - 要解析的 URL
 * @returns URL 各部分组成的对象
 * @example
 * ```typescript
 * parseUrl('https://user:pass@example.com:8080/path?query=1#hash')
 * // {
 * //   protocol: 'https:',
 * //   username: 'user',
 * //   password: 'pass',
 * //   hostname: 'example.com',
 * //   port: '8080',
 * //   pathname: '/path',
 * //   search: '?query=1',
 * //   hash: '#hash',
 * //   origin: 'https://example.com:8080',
 * //   href: 'https://user:pass@example.com:8080/path?query=1#hash'
 * // }
 * ```
 */
export function parseUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol,
      username: urlObj.username,
      password: urlObj.password,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
      href: urlObj.href,
    };
  } catch {
    return null;
  }
}

/**
 * 拼接 URL 路径
 * @param base - 基础 URL
 * @param paths - 要拼接的路径段
 * @returns 拼接后的完整 URL
 * @example
 * ```typescript
 * joinUrl('https://example.com', 'api', 'users')
 * // 'https://example.com/api/users'
 * 
 * joinUrl('https://example.com/', '/api/', '/users/')
 * // 'https://example.com/api/users'
 * 
 * joinUrl('https://example.com/api', '../users')
 * // 'https://example.com/users'
 * ```
 */
export function joinUrl(base: string, ...paths: string[]): string {
  try {
    let url = new URL(base);
    
    for (const path of paths) {
      if (!path) continue;
      
      // 移除路径开头和结尾的斜杠
      const cleanPath = path.replace(/^\/+|\/+$/g, '');
      
      // 如果当前路径名不以斜杠结尾，添加斜杠
      if (!url.pathname.endsWith('/')) {
        url.pathname += '/';
      }
      
      // 拼接路径
      url = new URL(cleanPath, url.href);
    }
    
    return url.href;
  } catch {
    // 如果解析失败，使用简单的字符串拼接
    const cleanBase = base.replace(/\/+$/, '');
    const cleanPaths = paths
      .filter(Boolean)
      .map((p) => p.replace(/^\/+|\/+$/g, ''))
      .join('/');
    
    return cleanPaths ? `${cleanBase}/${cleanPaths}` : cleanBase;
  }
}

/**
 * 在新窗口中打开 URL
 * @param url - 要打开的 URL
 * @param options - 打开窗口的选项
 * @example
 * ```typescript
 * // 在新标签页打开
 * openWindow('https://example.com')
 * 
 * // 在当前窗口打开
 * openWindow('https://example.com', { target: '_self' })
 * 
 * // 不设置 noopener 和 noreferrer
 * openWindow('https://example.com', { 
 *   noopener: false, 
 *   noreferrer: false 
 * })
 * ```
 */
export function openWindow(url: string, options: OpenWindowOptions = {}): void {
  const { noopener = true, noreferrer = true, target = '_blank' } = options;
  
  // 构建窗口特性字符串
  const features = [
    noopener && 'noopener=yes',
    noreferrer && 'noreferrer=yes',
  ]
    .filter(Boolean)
    .join(',');
  
  globalThis.open(url, target, features);
}

/**
 * 在新窗口中打开路由路径
 * @param path - 路由路径
 * @example
 * ```typescript
 * // 在新标签页打开 /users 路由
 * openRouteInNewWindow('/users')
 * 
 * // 在新标签页打开 users 路由（自动添加 /）
 * openRouteInNewWindow('users')
 * ```
 */
export function openRouteInNewWindow(path: string): void {
  const { hash, origin } = globalThis.location;
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${origin}${hash && !fullPath.startsWith('/#') ? '/#' : ''}${fullPath}`;
  
  openWindow(url, { target: '_blank' });
}

/**
 * 为 URL 添加或更新查询参数
 * @param url - 原始 URL
 * @param params - 要添加或更新的参数
 * @returns 更新后的 URL
 * @example
 * ```typescript
 * addUrlParams('https://example.com', { page: '2', size: '10' })
 * // 'https://example.com?page=2&size=10'
 * 
 * addUrlParams('https://example.com?page=1', { page: '2', size: '10' })
 * // 'https://example.com?page=2&size=10'
 * ```
 */
export function addUrlParams(url: string, params: Record<string, any>): string {
  try {
    const urlObj = new URL(url);
    
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.set(key, String(value));
      }
    }
    
    return urlObj.href;
  } catch {
    const paramString = buildUrlParams(params);
    if (!paramString) return url;
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${paramString}`;
  }
}

/**
 * 从 URL 中移除指定的查询参数
 * @param url - 原始 URL
 * @param keys - 要移除的参数键名
 * @returns 移除参数后的 URL
 * @example
 * ```typescript
 * removeUrlParams('https://example.com?page=1&size=10', ['page'])
 * // 'https://example.com?size=10'
 * 
 * removeUrlParams('https://example.com?page=1&size=10', ['page', 'size'])
 * // 'https://example.com'
 * ```
 */
export function removeUrlParams(url: string, keys: string[]): string {
  try {
    const urlObj = new URL(url);
    
    for (const key of keys) {
      urlObj.searchParams.delete(key);
    }
    
    return urlObj.href;
  } catch {
    return url;
  }
}
