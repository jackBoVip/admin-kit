<script setup lang="ts">
import type { CSSProperties } from 'vue';

import { computed } from 'vue';

/**
 * 布局工具栏组件属性接口定义
 * @interface Props
 * @property {number} height - 工具栏高度（像素）
 *     设置工具栏组件的垂直尺寸，影响组件内部布局和整体高度
 */
interface Props {
  readonly height: number;
}

/**
 * 使用 `defineProps` 宏定义组件属性
 * 采用 TypeScript 类型标注方式，为属性提供明确的类型定义
 * 
 * 注意：`height` 是必需属性，没有默认值
 */
const props = defineProps<Props>();

/**
 * 计算工具栏样式的计算属性
 * 将高度数值转换为 CSS 像素单位，生成内联样式对象
 * 
 * @returns {ComputedRef<CSSProperties>} - 包含动态样式的响应式对象
 * 
 * @description
 * 样式计算逻辑：
 * 1. `blockSize`: 将数值转换为像素单位，使用 CSS 逻辑属性 `blockSize` 替代 `height`
 *    确保组件在不同书写模式（水平/垂直文本）下正常工作
 */
const style = computed((): CSSProperties => ({
  blockSize: `${props.height}px`,
}));
</script>

<template>
  <!--
    布局工具栏容器
    使用 Vue 3.5+ 的 `<template>` 语法和 ES2025 最佳实践

    @style {CSSProperties} style - 动态计算的工具栏样式
    @class {string} 静态CSS类名 - 应用基础样式和布局
  -->
  <section
    :style="style"
    class="flex w-full border-b border-border bg-background transition-all"
  >
    <!--
      默认插槽
      用于插入工具栏的内容，如操作按钮、面包屑导航、搜索框等
      
      使用自闭合语法 `<slot />`，这是 Vue 3.5+ 和 ES2025 的推荐写法
    -->
    <slot />
  </section>
</template>