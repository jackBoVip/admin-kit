import type { Sortable } from '@admin-core/composables';
import type { EmitType } from '@admin-core/shared/types';

import type { TabsProps } from './types';

import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import { useIsMobile, useSortable } from '@admin-core/composables';

// 可能会找到拖拽的子元素，这里需要确保拖拽的dom时tab元素
function findParentElement(element: HTMLElement) {
  const parentCls = 'group';
  return element.classList.contains(parentCls)
    ? element
    : element.closest(`.${parentCls}`);
}

type GetRootEl = () => HTMLElement | null | undefined;

/**
 * Tabs 拖拽排序（内部 hook）
 *
 * @description
 * - 仅在桌面端启用（移动端自动跳过）
 * - 依赖 DOM/Sortable，SSR 环境自动跳过
 * - 通过 emit('sortTabs', oldIndex, newIndex) 通知外部更新 tabs 顺序
 */
export function useTabsDrag(
  props: TabsProps,
  emit: EmitType,
  getRootEl?: GetRootEl,
) {
  const sortableInstance = ref<null | Sortable>(null);

  async function initTabsSortable() {
    // SSR/Node 环境下没有 document
    if (typeof document === 'undefined') return;

    await nextTick();

    const contentClass = props.contentClass || 'admin-tabs-content';
    const rootEl = getRootEl?.();
    // 支持直接传入 tabs 内容容器（零 querySelector）
    const el = (rootEl?.classList?.contains(contentClass)
      ? rootEl
      : (rootEl?.querySelector?.(`.${contentClass}`) as
          | HTMLElement
          | null)) as HTMLElement | null;

    if (!el) {
      console.warn('Element not found for sortable initialization');
      return;
    }

    const resetElState = async () => {
      el.style.cursor = 'default';
      // el.classList.remove('dragging');
      el.querySelector('.draggable')?.classList.remove('dragging');
    };

    const { initializeSortable } = useSortable(el, {
      filter: (_evt, target: HTMLElement) => {
        const parent = findParentElement(target);
        const draggable = parent?.classList.contains('draggable');
        return !draggable || !props.draggable;
      },
      onEnd(evt) {
        const { newIndex, oldIndex } = evt;
        // const fromElement = evt.item;
        const { srcElement } = (evt as any).originalEvent;

        if (!srcElement) {
          resetElState();
          return;
        }

        const srcParent = findParentElement(srcElement);

        if (!srcParent) {
          resetElState();
          return;
        }

        if (!srcParent.classList.contains('draggable')) {
          resetElState();

          return;
        }

        if (
          oldIndex !== undefined &&
          newIndex !== undefined &&
          !Number.isNaN(oldIndex) &&
          !Number.isNaN(newIndex) &&
          oldIndex !== newIndex
        ) {
          emit('sortTabs', oldIndex, newIndex);
        }
        resetElState();
      },
      onMove(evt) {
        const parent = findParentElement(evt.related);
        if (parent?.classList.contains('draggable') && props.draggable) {
          const isCurrentAffix = evt.dragged.classList.contains('affix-tab');
          const isRelatedAffix = evt.related.classList.contains('affix-tab');
          // 不允许在固定的tab和非固定的tab之间互相拖拽
          return isCurrentAffix === isRelatedAffix;
        } else {
          return false;
        }
      },
      onStart: () => {
        el.style.cursor = 'grabbing';
        el.querySelector('.draggable')?.classList.add('dragging');
        // el.classList.add('dragging');
      },
    });

    sortableInstance.value = await initializeSortable();
  }

  async function init() {
    const { isMobile } = useIsMobile();

    // 移动端下tab不需要拖拽
    if (isMobile.value) {
      return;
    }
    // SSR/Node 环境下没有 document
    if (typeof document === 'undefined') return;
    await nextTick();
    initTabsSortable();
  }

  onMounted(init);

  watch(
    () => props.styleType,
    () => {
      sortableInstance.value?.destroy();
      init();
    },
  );

  onUnmounted(() => {
    sortableInstance.value?.destroy();
  });
}
