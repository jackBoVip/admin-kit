import type { FormRenderProps } from '../types';

import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';

import {
  breakpointsTailwind,
  useBreakpoints,
  useElementVisibility,
} from '@vueuse/core';

/**
 * 表单展开/折叠功能的组合式函数
 * 
 * @description
 * 用于实现表单的展开和折叠功能，动态计算每行的表单项数量，
 * 根据折叠行数自动隐藏超出的表单项。支持响应式布局，
 * 在不同屏幕尺寸下自动重新计算。
 * 
 * @param props - 表单渲染属性
 * @returns 返回展开/折叠相关的状态和引用
 * 
 * @example
 * ```ts
 * const { isCalculated, keepFormItemIndex, wrapperRef } = useExpandable(props);
 * ```
 */
export function useExpandable(props: FormRenderProps) {
  /** 表单容器的模板引用 */
  const wrapperRef = useTemplateRef<HTMLElement>('wrapperRef');
  
  /** 容器是否可见 */
  const isVisible = useElementVisibility(wrapperRef);
  
  /** 行号到该行表单项数量的映射 */
  const rowMapping = ref<Record<number, number>>({});
  
  /** 是否已经计算过一次 */
  const isCalculated = ref(false);

  /** 响应式断点工具 */
  const breakpoints = useBreakpoints(breakpointsTailwind);

  /**
   * 计算需要保留的表单项索引
   * 
   * @description
   * 根据折叠行数和每行的表单项数量，计算出折叠状态下
   * 应该保留的最后一个表单项的索引位置
   */
  const keepFormItemIndex = computed(() => {
    const rows = props.collapsedRows ?? 1;
    const mapping = rowMapping.value;
    
    let maxItem = 0;
    for (let index = 1; index <= rows; index++) {
      maxItem += mapping[index] ?? 0;
    }
    
    return maxItem - 1 || 1;
  });

  /**
   * 监听相关属性变化，重新计算行映射
   * 
   * @description
   * 当折叠按钮显示状态、屏幕断点、表单项数量或容器可见性变化时，
   * 重置并重新计算行映射关系
   */
  watch(
    [
      () => props.showCollapseButton,
      () => breakpoints.active().value,
      () => props.schema?.length,
      () => isVisible.value,
    ],
    async ([val]) => {
      if (val) {
        await nextTick();
        rowMapping.value = {};
        isCalculated.value = false;
        await calculateRowMapping();
      }
    },
  );

  /**
   * 计算行映射关系
   * 
   * @description
   * 通过分析表单容器的 grid 布局和每个表单项的位置，
   * 计算出每一行包含多少个表单项，并存储到 rowMapping 中。
   * 这个映射用于确定折叠状态下应该显示哪些表单项。
   */
  async function calculateRowMapping(): Promise<void> {
    if (!props.showCollapseButton) return;

    await nextTick();
    if (!wrapperRef.value) return;

    const container = wrapperRef.value;
    const formItems = [...container.children];
    const containerStyles = window.getComputedStyle(container);
    const rowHeights = containerStyles
      .getPropertyValue('grid-template-rows')
      .split(' ');
    const containerRect = container.getBoundingClientRect();
    const maxRows = props.collapsedRows ?? 1;

    for (const el of formItems) {
      const itemRect = el.getBoundingClientRect();
      const itemTop = itemRect.top - containerRect.top;
      
      let rowStart = 0;
      let cumulativeHeight = 0;

      for (const [i, rowHeight] of rowHeights.entries()) {
        cumulativeHeight += Number.parseFloat(rowHeight);
        if (itemTop < cumulativeHeight) {
          rowStart = i + 1;
          break;
        }
      }
      
      if (rowStart > maxRows) continue;
      
      rowMapping.value[rowStart] = (rowMapping.value[rowStart] ?? 0) + 1;
      isCalculated.value = true;
    }
  }

  onMounted(() => {
    calculateRowMapping();
  });

  return { isCalculated, keepFormItemIndex, wrapperRef };
}
