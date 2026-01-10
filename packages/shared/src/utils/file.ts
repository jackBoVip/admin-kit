/**
 * 文件工具模块
 * @description 提供文件处理相关的工具函数，使用 ES2025 最新特性优化
 * @module file
 */

/**
 * 下载选项接口
 */
export interface DownloadOptions<T = string> {
  /** 文件名 */
  fileName?: string;
  /** 数据源 */
  source: T;
  /** 目标窗口 */
  target?: string;
}

/** 默认文件名 */
const DEFAULT_FILENAME = 'downloaded_file';

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @param decimals - 小数位数，默认为 2
 * @returns 格式化后的文件大小字符串
 * @example
 * ```typescript
 * formatFileSize(1024) // '1.00 KB'
 * formatFileSize(1048576) // '1.00 MB'
 * formatFileSize(1073741824) // '1.00 GB'
 * formatFileSize(1024, 0) // '1 KB'
 * ```
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${Number.parseFloat((bytes / k ** i).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * 通用下载触发函数
 * @param href - 文件下载的 URL
 * @param fileName - 下载文件的名称
 * @param revokeDelay - 清理 URL 的延迟时间（毫秒），默认为 100
 * @example
 * ```typescript
 * triggerDownload('https://example.com/file.pdf', 'document.pdf')
 * triggerDownload(blobUrl, 'data.json', 200)
 * ```
 */
export function triggerDownload(
  href: string,
  fileName: string,
  revokeDelay = 100,
): void {
  const link = globalThis.document.createElement('a');
  link.href = href;
  link.download = fileName || DEFAULT_FILENAME;
  link.style.display = 'none';
  
  if (link.download === undefined) {
    link.setAttribute('target', '_blank');
  }
  
  globalThis.document.body.append(link);
  link.click();
  link.remove();
  
  // 清理临时 URL 以释放内存
  globalThis.setTimeout(() => URL.revokeObjectURL(href), revokeDelay);
}

/**
 * 解析文件名
 * @param url - URL 字符串
 * @param fileName - 自定义文件名
 * @returns 解析后的文件名
 */
function resolveFileName(url: string, fileName?: string): string {
  return fileName || url.slice(url.lastIndexOf('/') + 1) || DEFAULT_FILENAME;
}

/**
 * 通过 URL 下载文件，支持跨域
 * @param options - 下载选项
 * @throws {Error} 当下载失败时抛出错误
 * @example
 * ```typescript
 * await downloadFileFromUrl({
 *   source: 'https://example.com/file.pdf',
 *   fileName: 'document.pdf'
 * })
 * 
 * // 在新窗口打开
 * await downloadFileFromUrl({
 *   source: 'https://example.com/file.pdf',
 *   target: '_blank'
 * })
 * ```
 */
export async function downloadFileFromUrl({
  fileName,
  source,
  target = '_blank',
}: DownloadOptions): Promise<void> {
  if (!source || typeof source !== 'string') {
    throw new Error('Invalid URL.');
  }
  
  const userAgent = globalThis.navigator.userAgent.toLowerCase();
  const isChrome = userAgent.includes('chrome');
  const isSafari = userAgent.includes('safari');
  const isIOS = /iP(ad|hone|od)/.test(globalThis.navigator.userAgent);
  
  if (isIOS) {
    console.error('Your browser does not support download!');
    return;
  }
  
  if (isChrome || isSafari) {
    triggerDownload(source, resolveFileName(source, fileName));
    return;
  }
  
  // 对于其他浏览器，在新窗口打开
  let url = source;
  if (!url.includes('?')) {
    url += '?download';
  }
  
  globalThis.open(url, target);
}

/**
 * 通过 Base64 下载文件
 * @param options - 下载选项
 * @throws {Error} 当 Base64 数据无效时抛出错误
 * @example
 * ```typescript
 * downloadFileFromBase64({
 *   source: 'data:text/plain;base64,SGVsbG8gV29ybGQ=',
 *   fileName: 'hello.txt'
 * })
 * ```
 */
export function downloadFileFromBase64({ fileName, source }: DownloadOptions): void {
  if (!source || typeof source !== 'string') {
    throw new Error('Invalid Base64 data.');
  }
  
  const resolvedFileName = fileName || DEFAULT_FILENAME;
  triggerDownload(source, resolvedFileName);
}

/**
 * 通过图片 URL 下载图片文件
 * @param options - 下载选项
 * @example
 * ```typescript
 * await downloadFileFromImageUrl({
 *   source: 'https://example.com/image.jpg',
 *   fileName: 'photo.jpg'
 * })
 * ```
 */
export async function downloadFileFromImageUrl({
  fileName,
  source,
}: DownloadOptions): Promise<void> {
  const base64 = await urlToBase64(source);
  downloadFileFromBase64({ fileName, source: base64 });
}

/**
 * 通过 Blob 下载文件
 * @param options - 下载选项
 * @throws {TypeError} 当 Blob 数据无效时抛出错误
 * @example
 * ```typescript
 * const blob = new Blob(['Hello World'], { type: 'text/plain' })
 * downloadFileFromBlob({
 *   source: blob,
 *   fileName: 'hello.txt'
 * })
 * ```
 */
export function downloadFileFromBlob({
  fileName = DEFAULT_FILENAME,
  source,
}: DownloadOptions<Blob>): void {
  if (!(source instanceof Blob)) {
    throw new TypeError('Invalid Blob data.');
  }
  
  const url = URL.createObjectURL(source);
  triggerDownload(url, fileName);
}

/**
 * 下载文件，支持 Blob、字符串和其他 BlobPart 类型
 * @param options - 下载选项
 * @example
 * ```typescript
 * // 下载文本
 * downloadFileFromBlobPart({
 *   source: 'Hello World',
 *   fileName: 'hello.txt'
 * })
 * 
 * // 下载 JSON
 * downloadFileFromBlobPart({
 *   source: JSON.stringify({ name: 'John' }),
 *   fileName: 'data.json'
 * })
 * ```
 */
export function downloadFileFromBlobPart({
  fileName = DEFAULT_FILENAME,
  source,
}: DownloadOptions<BlobPart>): void {
  // 如果 source 不是 Blob，则转换为 Blob
  const blob =
    source instanceof Blob
      ? source
      : new Blob([source], { type: 'application/octet-stream' });
  
  // 创建对象 URL 并触发下载
  const url = URL.createObjectURL(blob);
  triggerDownload(url, fileName);
}

/**
 * 将图片 URL 转换为 Base64
 * @param url - 图片 URL
 * @param mimeType - MIME 类型，默认为 'image/png'
 * @returns Base64 字符串
 * @example
 * ```typescript
 * const base64 = await urlToBase64('https://example.com/image.jpg')
 * console.log(base64) // 'data:image/png;base64,...'
 * 
 * const base64Jpeg = await urlToBase64('https://example.com/image.jpg', 'image/jpeg')
 * ```
 */
export function urlToBase64(url: string, mimeType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = globalThis.document.createElement('canvas') as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');
    const img = new Image();
    
    img.crossOrigin = 'anonymous';
    
    img.addEventListener('load', () => {
      if (!canvas || !ctx) {
        return reject(new Error('Failed to create canvas.'));
      }
      
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      
      const dataURL = canvas.toDataURL(mimeType || 'image/png');
      canvas = null;
      resolve(dataURL);
    });
    
    img.addEventListener('error', () => {
      reject(new Error('Failed to load image.'));
    });
    
    img.src = url;
  });
}

/**
 * 动态加载 JavaScript 文件
 * @param src - 脚本 URL
 * @param async - 是否异步加载，默认为 true
 * @returns Promise，加载成功时 resolve
 * @example
 * ```typescript
 * await loadScript('https://cdn.example.com/library.js')
 * console.log('Script loaded!')
 * 
 * // 同步加载
 * await loadScript('https://cdn.example.com/library.js', false)
 * ```
 */
export function loadScript(src: string, async = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = globalThis.document.createElement('script');
    script.src = src;
    script.async = async;
    
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)));
    
    globalThis.document.head.append(script);
  });
}

/**
 * 动态加载 CSS 文件
 * @param href - 样式表 URL
 * @returns Promise，加载成功时 resolve
 * @example
 * ```typescript
 * await loadStylesheet('https://cdn.example.com/styles.css')
 * console.log('Stylesheet loaded!')
 * ```
 */
export function loadStylesheet(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = globalThis.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    link.addEventListener('load', () => resolve());
    link.addEventListener('error', () => reject(new Error(`Failed to load stylesheet: ${href}`)));
    
    globalThis.document.head.append(link);
  });
}

/**
 * 读取文件内容为文本
 * @param file - File 对象
 * @returns 文件文本内容
 * @example
 * ```typescript
 * const file = event.target.files[0]
 * const text = await readFileAsText(file)
 * console.log(text)
 * ```
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });
    
    reader.addEventListener('error', () => {
      reject(new Error('Failed to read file.'));
    });
    
    reader.readAsText(file);
  });
}

/**
 * 读取文件内容为 Data URL
 * @param file - File 对象
 * @returns 文件 Data URL
 * @example
 * ```typescript
 * const file = event.target.files[0]
 * const dataUrl = await readFileAsDataURL(file)
 * console.log(dataUrl) // 'data:image/png;base64,...'
 * ```
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });
    
    reader.addEventListener('error', () => {
      reject(new Error('Failed to read file.'));
    });
    
    reader.readAsDataURL(file);
  });
}
