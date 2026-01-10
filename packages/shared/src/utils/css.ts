/**
 * CSS 工具模块
 * @description 提供 CSS 相关的工具函数，使用 ES2025 最新特性优化
 * @module css
 */

import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 className，支持 Tailwind CSS 类名冲突解决
 * @param inputs - 类名输入，支持字符串、数组、对象等多种格式
 * @returns 合并后的类名字符串
 * @example
 * ```typescript
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn('text-red-500', { 'text-blue-500': true }) // 'text-blue-500'
 * cn(['bg-white', 'text-black'], 'bg-gray-100') // 'text-black bg-gray-100'
 * cn(
 *   'base-class',
 *   condition && 'conditional-class',
 *   { 'active': isActive }
 * )
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 更新 CSS 变量
 * @param variables - CSS 变量与其值的映射对象
 * @param id - 样式元素的 ID，默认为 '__vben-styles__'
 * @example
 * ```typescript
 * updateCSSVariables({
 *   '--primary-color': '#1890ff',
 *   '--text-color': '#333',
 *   '--border-radius': '4px'
 * })
 * 
 * // 使用自定义 ID
 * updateCSSVariables({
 *   '--theme-color': '#ff0000'
 * }, 'custom-theme')
 * ```
 */
export function updateCSSVariables(
  variables: Record<string, string>,
  id = '__vben-styles__',
): void {
  // 获取或创建样式元素
  const existingElement = globalThis.document.querySelector(`#${id}`);
  const styleElement = existingElement || globalThis.document.createElement('style');
  
  styleElement.id = id;
  
  // 构建 CSS 变量样式文本
  let cssText = ':root {';
  
  for (const [key, value] of Object.entries(variables)) {
    if (Object.hasOwn(variables, key)) {
      cssText += `${key}: ${value};`;
    }
  }
  
  cssText += '}';
  
  // 设置样式内容
  styleElement.textContent = cssText;
  
  // 如果元素不存在，则添加到文档头部
  if (!existingElement) {
    globalThis.setTimeout(() => {
      globalThis.document.head.append(styleElement);
    });
  }
}

/**
 * 获取 CSS 变量的值
 * @param variable - CSS 变量名（包含 --）
 * @param element - 要获取变量的元素，默认为 document.documentElement
 * @returns CSS 变量的值
 * @example
 * ```typescript
 * getCSSVariable('--primary-color') // '#1890ff'
 * getCSSVariable('--text-color', document.body) // '#333'
 * ```
 */
export function getCSSVariable(
  variable: string,
  element: HTMLElement = globalThis.document.documentElement,
): string {
  return globalThis.getComputedStyle(element).getPropertyValue(variable).trim();
}

/**
 * 设置单个 CSS 变量
 * @param variable - CSS 变量名（包含 --）
 * @param value - CSS 变量的值
 * @param element - 要设置变量的元素，默认为 document.documentElement
 * @example
 * ```typescript
 * setCSSVariable('--primary-color', '#1890ff')
 * setCSSVariable('--text-color', '#333', document.body)
 * ```
 */
export function setCSSVariable(
  variable: string,
  value: string,
  element: HTMLElement = globalThis.document.documentElement,
): void {
  element.style.setProperty(variable, value);
}

/**
 * 移除 CSS 变量
 * @param variable - CSS 变量名（包含 --）
 * @param element - 要移除变量的元素，默认为 document.documentElement
 * @example
 * ```typescript
 * removeCSSVariable('--primary-color')
 * removeCSSVariable('--text-color', document.body)
 * ```
 */
export function removeCSSVariable(
  variable: string,
  element: HTMLElement = globalThis.document.documentElement,
): void {
  element.style.removeProperty(variable);
}

/**
 * 批量获取 CSS 变量
 * @param variables - CSS 变量名数组
 * @param element - 要获取变量的元素，默认为 document.documentElement
 * @returns CSS 变量名与值的映射对象
 * @example
 * ```typescript
 * getCSSVariables(['--primary-color', '--text-color'])
 * // { '--primary-color': '#1890ff', '--text-color': '#333' }
 * ```
 */
export function getCSSVariables(
  variables: string[],
  element: HTMLElement = globalThis.document.documentElement,
): Record<string, string> {
  const result: Record<string, string> = {};
  const computedStyle = globalThis.getComputedStyle(element);
  
  for (const variable of variables) {
    result[variable] = computedStyle.getPropertyValue(variable).trim();
  }
  
  return result;
}

/**
 * 切换类名
 * @param element - 目标元素
 * @param className - 要切换的类名
 * @param force - 强制添加或移除，true 为添加，false 为移除
 * @returns 切换后是否包含该类名
 * @example
 * ```typescript
 * toggleClass(element, 'active') // 切换 active 类
 * toggleClass(element, 'hidden', true) // 强制添加 hidden 类
 * toggleClass(element, 'visible', false) // 强制移除 visible 类
 * ```
 */
export function toggleClass(
  element: HTMLElement,
  className: string,
  force?: boolean,
): boolean {
  return element.classList.toggle(className, force);
}

/**
 * 添加多个类名
 * @param element - 目标元素
 * @param classNames - 要添加的类名数组
 * @example
 * ```typescript
 * addClasses(element, ['active', 'visible', 'highlight'])
 * ```
 */
export function addClasses(element: HTMLElement, classNames: string[]): void {
  element.classList.add(...classNames);
}

/**
 * 移除多个类名
 * @param element - 目标元素
 * @param classNames - 要移除的类名数组
 * @example
 * ```typescript
 * removeClasses(element, ['active', 'visible', 'highlight'])
 * ```
 */
export function removeClasses(element: HTMLElement, classNames: string[]): void {
  element.classList.remove(...classNames);
}

/**
 * 检查元素是否包含指定类名
 * @param element - 目标元素
 * @param className - 要检查的类名
 * @returns 是否包含该类名
 * @example
 * ```typescript
 * hasClass(element, 'active') // true or false
 * ```
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * 获取元素的所有类名
 * @param element - 目标元素
 * @returns 类名数组
 * @example
 * ```typescript
 * getClasses(element) // ['btn', 'btn-primary', 'active']
 * ```
 */
export function getClasses(element: HTMLElement): string[] {
  return Array.from(element.classList);
}
