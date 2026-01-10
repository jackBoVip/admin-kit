/**
 * DOM 工具模块
 * @description 提供 DOM 操作相关的工具函数，使用 ES2025 最新特性优化
 * @module dom
 */

/**
 * 元素可见区域矩形信息
 */
export interface VisibleDomRect {
  /** 底部位置 */
  bottom: number;
  /** 高度 */
  height: number;
  /** 左侧位置 */
  left: number;
  /** 右侧位置 */
  right: number;
  /** 顶部位置 */
  top: number;
  /** 宽度 */
  width: number;
}

/**
 * 获取元素在视口中的可见区域信息
 * @param element - 目标元素
 * @returns 元素可见区域的矩形信息
 * @example
 * ```typescript
 * const rect = getElementVisibleRect(element)
 * console.log(rect.width, rect.height) // 可见区域的宽高
 * 
 * // 检查元素是否完全可见
 * const isFullyVisible = rect.height === element.offsetHeight
 * ```
 */
export function getElementVisibleRect(
  element?: HTMLElement | null | undefined,
): VisibleDomRect {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };
  }
  
  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(
    globalThis.document.documentElement.clientHeight,
    globalThis.innerHeight,
  );
  const viewWidth = Math.max(
    globalThis.document.documentElement.clientWidth,
    globalThis.innerWidth,
  );
  
  const top = Math.max(rect.top, 0);
  const bottom = Math.min(rect.bottom, viewHeight);
  const left = Math.max(rect.left, 0);
  const right = Math.min(rect.right, viewWidth);
  
  return {
    bottom,
    height: Math.max(0, bottom - top),
    left,
    right,
    top,
    width: Math.max(0, right - left),
  };
}

/**
 * 获取浏览器滚动条宽度
 * @returns 滚动条宽度（像素）
 * @example
 * ```typescript
 * const scrollbarWidth = getScrollbarWidth()
 * console.log(`滚动条宽度: ${scrollbarWidth}px`)
 * 
 * // 在布局计算中使用
 * const contentWidth = containerWidth - scrollbarWidth
 * ```
 */
export function getScrollbarWidth(): number {
  const scrollDiv = globalThis.document.createElement('div');
  
  scrollDiv.style.visibility = 'hidden';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  
  globalThis.document.body.append(scrollDiv);
  
  const innerDiv = globalThis.document.createElement('div');
  scrollDiv.append(innerDiv);
  
  const scrollbarWidth = scrollDiv.offsetWidth - innerDiv.offsetWidth;
  
  scrollDiv.remove();
  return scrollbarWidth;
}

/**
 * 检查页面是否需要滚动条
 * @returns 是否需要滚动条
 * @example
 * ```typescript
 * if (needsScrollbar()) {
 *   console.log('页面内容超出视口，需要滚动条')
 * }
 * 
 * // 根据是否需要滚动条调整布局
 * const padding = needsScrollbar() ? getScrollbarWidth() : 0
 * ```
 */
export function needsScrollbar(): boolean {
  const doc = globalThis.document.documentElement;
  const body = globalThis.document.body;
  
  // 检查 body 的 overflow-y 样式
  const overflowY = globalThis.getComputedStyle(body).overflowY;
  
  // 如果明确设置了需要滚动条的样式
  if (overflowY === 'scroll' || overflowY === 'auto') {
    return doc.scrollHeight > globalThis.innerHeight;
  }
  
  // 在其他情况下，根据 scrollHeight 和 innerHeight 比较判断
  return doc.scrollHeight > globalThis.innerHeight;
}

/**
 * 手动触发 window 的 resize 事件
 * @description 在某些情况下（如动态改变布局），需要手动触发 resize 事件以更新相关组件
 * @example
 * ```typescript
 * // 在侧边栏展开/收起后触发 resize
 * toggleSidebar()
 * triggerWindowResize()
 * 
 * // 在图表容器大小改变后触发 resize
 * resizeChartContainer()
 * triggerWindowResize()
 * ```
 */
export function triggerWindowResize(): void {
  const resizeEvent = new Event('resize');
  globalThis.dispatchEvent(resizeEvent);
}

/**
 * 获取元素相对于文档的偏移位置
 * @param element - 目标元素
 * @returns 元素的偏移位置 { top, left }
 * @example
 * ```typescript
 * const offset = getElementOffset(element)
 * console.log(`元素距离文档顶部: ${offset.top}px`)
 * console.log(`元素距离文档左侧: ${offset.left}px`)
 * ```
 */
export function getElementOffset(element: HTMLElement): { top: number; left: number } {
  const rect = element.getBoundingClientRect();
  const scrollTop = globalThis.scrollY ?? globalThis.document.documentElement.scrollTop;
  const scrollLeft = globalThis.scrollX ?? globalThis.document.documentElement.scrollLeft;
  
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}

/**
 * 检查元素是否在视口中可见
 * @param element - 目标元素
 * @param threshold - 可见阈值（0-1），默认为 0（任意部分可见即返回 true）
 * @returns 元素是否可见
 * @example
 * ```typescript
 * // 检查元素是否有任意部分可见
 * if (isElementInViewport(element)) {
 *   console.log('元素可见')
 * }
 * 
 * // 检查元素是否至少 50% 可见
 * if (isElementInViewport(element, 0.5)) {
 *   console.log('元素至少 50% 可见')
 * }
 * ```
 */
export function isElementInViewport(element: HTMLElement, threshold = 0): boolean {
  const rect = element.getBoundingClientRect();
  const viewHeight = globalThis.innerHeight ?? globalThis.document.documentElement.clientHeight;
  const viewWidth = globalThis.innerWidth ?? globalThis.document.documentElement.clientWidth;
  
  const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, viewWidth) - Math.max(rect.left, 0);
  
  const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
  const totalArea = rect.height * rect.width;
  
  return totalArea > 0 && visibleArea / totalArea >= threshold;
}

/**
 * 平滑滚动到指定元素
 * @param element - 目标元素
 * @param options - 滚动选项
 * @example
 * ```typescript
 * // 平滑滚动到元素
 * scrollToElement(element)
 * 
 * // 滚动到元素顶部，并添加偏移量
 * scrollToElement(element, { block: 'start', offset: -100 })
 * 
 * // 立即滚动（不使用动画）
 * scrollToElement(element, { behavior: 'auto' })
 * ```
 */
export function scrollToElement(
  element: HTMLElement,
  options: {
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
    offset?: number;
  } = {},
): void {
  const { behavior = 'smooth', block = 'start', inline = 'nearest', offset = 0 } = options;
  
  if (offset !== 0) {
    const elementPosition = getElementOffset(element);
    globalThis.scrollTo({
      top: elementPosition.top + offset,
      behavior,
    });
  } else {
    element.scrollIntoView({ behavior, block, inline });
  }
}
