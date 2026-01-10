/**
 * 剪贴板工具模块
 * @description 提供剪贴板操作相关的工具函数，使用 ES2025 最新特性优化
 * @module clipboard
 */

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 * @returns Promise，复制成功时 resolve
 * @example
 * ```typescript
 * await copyToClipboard('Hello World')
 * console.log('Text copied!')
 * 
 * try {
 *   await copyToClipboard('Some text')
 * } catch (error) {
 *   console.error('Failed to copy:', error)
 * }
 * ```
 */
export async function copyToClipboard(text: string): Promise<void> {
  // 优先使用现代 Clipboard API
  if (globalThis.navigator?.clipboard?.writeText) {
    try {
      await globalThis.navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      console.warn('Clipboard API failed, falling back to execCommand:', error);
    }
  }
  
  // 降级方案：使用 execCommand
  return fallbackCopyToClipboard(text);
}

/**
 * 降级方案：使用 execCommand 复制文本
 * @param text - 要复制的文本
 */
function fallbackCopyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textarea = globalThis.document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    
    globalThis.document.body.append(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      const successful = globalThis.document.execCommand('copy');
      textarea.remove();
      
      if (successful) {
        resolve();
      } else {
        reject(new Error('Failed to copy text using execCommand'));
      }
    } catch (error) {
      textarea.remove();
      reject(error);
    }
  });
}

/**
 * 从剪贴板读取文本
 * @returns 剪贴板中的文本内容
 * @example
 * ```typescript
 * const text = await readFromClipboard()
 * console.log('Clipboard text:', text)
 * 
 * try {
 *   const text = await readFromClipboard()
 *   console.log(text)
 * } catch (error) {
 *   console.error('Failed to read:', error)
 * }
 * ```
 */
export async function readFromClipboard(): Promise<string> {
  if (!globalThis.navigator?.clipboard?.readText) {
    throw new Error('Clipboard API is not supported in this browser');
  }
  
  try {
    return await globalThis.navigator.clipboard.readText();
  } catch (error) {
    throw new Error(`Failed to read from clipboard: ${error}`);
  }
}

/**
 * 复制图片到剪贴板
 * @param blob - 图片 Blob 对象
 * @returns Promise，复制成功时 resolve
 * @example
 * ```typescript
 * const response = await fetch('https://example.com/image.jpg')
 * const blob = await response.blob()
 * await copyImageToClipboard(blob)
 * console.log('Image copied!')
 * 
 * // 从 canvas 复制
 * canvas.toBlob(async (blob) => {
 *   if (blob) {
 *     await copyImageToClipboard(blob)
 *   }
 * })
 * ```
 */
export async function copyImageToClipboard(blob: Blob): Promise<void> {
  if (!globalThis.navigator?.clipboard?.write) {
    throw new Error('Clipboard API is not supported in this browser');
  }
  
  try {
    const item = new ClipboardItem({ [blob.type]: blob });
    await globalThis.navigator.clipboard.write([item]);
  } catch (error) {
    throw new Error(`Failed to copy image to clipboard: ${error}`);
  }
}

/**
 * 从剪贴板读取图片
 * @returns 图片 Blob 对象数组
 * @example
 * ```typescript
 * const blobs = await readImageFromClipboard()
 * if (blobs.length > 0) {
 *   const url = URL.createObjectURL(blobs[0])
 *   img.src = url
 * }
 * ```
 */
export async function readImageFromClipboard(): Promise<Blob[]> {
  if (!globalThis.navigator?.clipboard?.read) {
    throw new Error('Clipboard API is not supported in this browser');
  }
  
  try {
    const items = await globalThis.navigator.clipboard.read();
    const blobs: Blob[] = [];
    
    for (const item of items) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          const blob = await item.getType(type);
          blobs.push(blob);
        }
      }
    }
    
    return blobs;
  } catch (error) {
    throw new Error(`Failed to read image from clipboard: ${error}`);
  }
}

/**
 * 检查剪贴板 API 是否可用
 * @returns 是否支持剪贴板 API
 * @example
 * ```typescript
 * if (isClipboardSupported()) {
 *   await copyToClipboard('Hello')
 * } else {
 *   console.log('Clipboard API not supported')
 * }
 * ```
 */
export function isClipboardSupported(): boolean {
  return Boolean(globalThis.navigator?.clipboard);
}

/**
 * 检查是否支持读取剪贴板
 * @returns 是否支持读取剪贴板
 * @example
 * ```typescript
 * if (canReadClipboard()) {
 *   const text = await readFromClipboard()
 * }
 * ```
 */
export function canReadClipboard(): boolean {
  return Boolean(globalThis.navigator?.clipboard?.readText);
}

/**
 * 检查是否支持写入剪贴板
 * @returns 是否支持写入剪贴板
 * @example
 * ```typescript
 * if (canWriteClipboard()) {
 *   await copyToClipboard('Hello')
 * }
 * ```
 */
export function canWriteClipboard(): boolean {
  return Boolean(globalThis.navigator?.clipboard?.writeText);
}
