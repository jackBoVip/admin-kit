import type { CSSProperties } from 'vue';

import type { VisibleDomRect } from '@admin-core/shared/utils';

import { computed, onMounted, onUnmounted, ref } from 'vue';

import { CSS_VARIABLES } from '@admin-core/shared/constants';
import { getElementVisibleRect } from '@admin-core/shared/utils';

import { useCssVar, useDebounceFn } from '@vueuse/core';

/**
 * 布局内容样式组合式函数
 * 
 * @description
 * 管理布局内容区域的样式，自动计算可见区域尺寸并更新 CSS 变量
 * 
 * @returns 包含内容元素引用、覆盖层样式和可见区域信息的对象
 * 
 * @example
 * ```ts
 * import { useLayoutContentStyle } from '@admin-core/composables'
 * 
 * const { contentElement, overlayStyle, visibleDomRect } = useLayoutContentStyle()
 * 
 * // 在模板中绑定
 * <div ref="contentElement">内容区域</div>
 * <div :style="overlayStyle">覆盖层</div>
 * ```
 */
export function useLayoutContentStyle() {
  let resizeObserver: null | ResizeObserver = null;
  const contentElement = ref<HTMLDivElement | null>(null);
  const visibleDomRect = ref<null | VisibleDomRect>(null);
  const contentHeight = useCssVar(CSS_VARIABLES.LAYOUT_CONTENT_HEIGHT);
  const contentWidth = useCssVar(CSS_VARIABLES.LAYOUT_CONTENT_WIDTH);

  const overlayStyle = computed((): CSSProperties => {
    const { height, left, top, width } = visibleDomRect.value ?? {};
    return {
      height: `${height}px`,
      left: `${left}px`,
      position: 'fixed',
      top: `${top}px`,
      width: `${width}px`,
      zIndex: 150,
    };
  });

  const debouncedCalcHeight = useDebounceFn(
    (_entries: ResizeObserverEntry[]) => {
      visibleDomRect.value = getElementVisibleRect(contentElement.value);
      contentHeight.value = `${visibleDomRect.value.height}px`;
      contentWidth.value = `${visibleDomRect.value.width}px`;
    },
    16,
  );

  onMounted(() => {
    if (contentElement.value && !resizeObserver) {
      resizeObserver = new ResizeObserver(debouncedCalcHeight);
      resizeObserver.observe(contentElement.value);
    }
  });

  onUnmounted(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
  });

  return { contentElement, overlayStyle, visibleDomRect };
}

/**
 * 布局头部样式组合式函数
 * 
 * @description
 * 管理布局头部的高度，提供获取和设置头部高度的方法
 * 
 * @returns 包含获取和设置头部高度方法的对象
 * 
 * @example
 * ```ts
 * import { useLayoutHeaderStyle } from '@admin-core/composables'
 * 
 * const { getLayoutHeaderHeight, setLayoutHeaderHeight } = useLayoutHeaderStyle()
 * 
 * // 设置头部高度
 * setLayoutHeaderHeight(64)
 * 
 * // 获取头部高度
 * const height = getLayoutHeaderHeight() // 64
 * ```
 */
export function useLayoutHeaderStyle() {
  const headerHeight = useCssVar(CSS_VARIABLES.LAYOUT_HEADER_HEIGHT);

  return {
    getLayoutHeaderHeight: () => {
      return Number.parseInt(`${headerHeight.value}`, 10);
    },
    setLayoutHeaderHeight: (height: number) => {
      headerHeight.value = `${height}px`;
    },
  };
}

/**
 * 布局底部样式组合式函数
 * 
 * @description
 * 管理布局底部的高度，提供获取和设置底部高度的方法
 * 
 * @returns 包含获取和设置底部高度方法的对象
 * 
 * @example
 * ```ts
 * import { useLayoutFooterStyle } from '@admin-core/composables'
 * 
 * const { getLayoutFooterHeight, setLayoutFooterHeight } = useLayoutFooterStyle()
 * 
 * // 设置底部高度
 * setLayoutFooterHeight(48)
 * 
 * // 获取底部高度
 * const height = getLayoutFooterHeight() // 48
 * ```
 */
export function useLayoutFooterStyle() {
  const footerHeight = useCssVar(CSS_VARIABLES.LAYOUT_FOOTER_HEIGHT);

  return {
    getLayoutFooterHeight: () => {
      return Number.parseInt(`${footerHeight.value}`, 10);
    },
    setLayoutFooterHeight: (height: number) => {
      footerHeight.value = `${height}px`;
    },
  };
}
