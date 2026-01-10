import type { SortableOptions } from 'sortablejs'
import type Sortable from 'sortablejs'

/**
 * 拖拽排序组合式函数
 * 
 * @description
 * 提供拖拽排序功能，基于 SortableJS，使用 ES2025 最新特性
 * 
 * @param sortableContainer - 可排序容器元素
 * @param options - SortableJS 配置选项
 * 
 * @returns 包含初始化方法的对象
 * 
 * @example
 * ```ts
 * import { useSortable } from '@admin-core/composables'
 * import { ref, onMounted } from 'vue'
 * 
 * const listRef = ref<HTMLElement>()
 * const { initializeSortable } = useSortable(listRef.value!, {
 *   animation: 150,
 *   onEnd: (event) => {
 *     console.log('拖拽结束', event)
 *   }
 * })
 * 
 * onMounted(async () => {
 *   const sortable = await initializeSortable()
 *   console.log('Sortable 实例', sortable)
 * })
 * ```
 */
export function useSortable<T extends HTMLElement>(
  sortableContainer: T,
  options: SortableOptions = {},
) {
  const initializeSortable = async () => {
    const Sortable = await import(
      // @ts-expect-error - 动态导入
      'sortablejs/modular/sortable.complete.esm.js'
    )
    const sortable = Sortable?.default?.create?.(sortableContainer, {
      animation: 300,
      delay: 400,
      delayOnTouchOnly: true,
      ...options,
    })
    return sortable as Sortable
  }

  return {
    initializeSortable,
  }
}

export type { Sortable }
