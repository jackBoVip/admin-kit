import { getScrollbarWidth, needsScrollbar } from '@admin-core/shared/utils';

import {
  useScrollLock as _useScrollLock,
  tryOnBeforeUnmount,
  tryOnMounted,
} from '@vueuse/core';

/**
 * 滚动锁定类名常量
 * 用于标识需要在滚动锁定时调整 padding 的固定定位元素
 */
export const SCROLL_FIXED_CLASS = `_scroll__fixed_`;

/**
 * 滚动锁定组合式函数
 * 
 * @description
 * 锁定页面滚动，防止背景内容滚动（常用于模态框、抽屉等场景）
 * 自动处理滚动条宽度补偿，避免页面抖动
 * 
 * @example
 * ```ts
 * import { useScrollLock } from '@admin-core/composables'
 * 
 * // 在组件中使用
 * const { } = useScrollLock()
 * ```
 * 
 * @remarks
 * - 自动在组件挂载时锁定滚动
 * - 自动在组件卸载时解锁滚动
 * - 自动处理滚动条宽度补偿，避免页面抖动
 * - 自动处理带有 SCROLL_FIXED_CLASS 类名的固定定位元素
 */
export function useScrollLock() {
  const isLocked = _useScrollLock(document.body);
  const scrollbarWidth = getScrollbarWidth();

  tryOnMounted(() => {
    if (!needsScrollbar()) {
      return;
    }
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const layoutFixedNodes = document.querySelectorAll<HTMLElement>(
      `.${SCROLL_FIXED_CLASS}`,
    );
    const nodes = Array.from(layoutFixedNodes);
    if (nodes.length > 0) {
      for (const node of nodes) {
        node.dataset.transition = node.style['transition']
        node.style['transition'] = 'none'
        node.style.paddingRight = `${scrollbarWidth}px`
      }
    }
    isLocked.value = true;
  });

  tryOnBeforeUnmount(() => {
    if (!needsScrollbar()) {
      return;
    }
    isLocked.value = false;
    const layoutFixedNodes = document.querySelectorAll<HTMLElement>(
      `.${SCROLL_FIXED_CLASS}`,
    );
    const nodes = Array.from(layoutFixedNodes);
    if (nodes.length > 0) {
      for (const node of nodes) {
        node.style.paddingRight = ''
        requestAnimationFrame(() => {
          node.style['transition'] = node.dataset.transition || ''
        })
      }
    }
    document.body.style.paddingRight = '';
  });
}
