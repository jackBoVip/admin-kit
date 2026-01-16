<script setup lang="ts">
import type { CSSProperties} from 'vue';

/**
 * 导入来自 `@admin-core/shared/types` 模块的 `ContentCompactType` 类型定义
 * 该类型用于定义内容区域的紧凑模式选项
 * 通常定义为 'compact' | 'default' 的联合类型
 */
import type { ContentCompactType } from '@admin-core/shared/types';

import { computed } from 'vue';

/**
 * 导入 `useLayoutContentStyle` 组合式函数
 * 该函数用于管理布局内容区域的样式逻辑
 */
import { useLayoutContentStyle } from '@admin-core/composables';

/**
 * 导入 `Slot` 组件
 * 该组件用于创建具名插槽的包装器
 */
import { Slot } from '@admin-core/ui';

/**
 * 组件属性接口定义
 * @interface Props
 * @property {ContentCompactType} contentCompact - 内容区域紧凑模式配置
 *     可选值为 'compact'（定宽）或 'default'（自适应）
 * @property {number} contentCompactWidth - 定宽布局的宽度（像素）
 *     仅在 `contentCompact` 为 'compact' 时生效
 * @property {number} padding - 内容区域的内边距（像素）
 *     设置所有方向的内边距，会被具体方向的内边距属性覆盖
 * @property {number} paddingBottom - 内容区域底部内边距（像素）
 *     优先级高于 `padding` 属性
 * @property {number} paddingLeft - 内容区域左侧内边距（像素）
 *     优先级高于 `padding` 属性
 * @property {number} paddingRight - 内容区域右侧内边距（像素）
 *     优先级高于 `padding` 属性
 * @property {number} paddingTop - 内容区域顶部内边距（像素）
 *     优先级高于 `padding` 属性
 */
interface Props {
  readonly contentCompact?: ContentCompactType;
  readonly contentCompactWidth?: number;
  readonly padding?: number;
  readonly paddingBottom?: number;
  readonly paddingLeft?: number;
  readonly paddingRight?: number;
  readonly paddingTop?: number;
}

/**
 * 使用 `defineProps` 宏定义组件属性
 * 直接在泛型参数中指定默认值，避免使用 withDefaults 的类型推断问题
 */
const props = defineProps<Props & {
  contentCompact?: ContentCompactType
  contentCompactWidth?: number
  padding?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
}>() as Props & {
  contentCompact: NonNullable<Props['contentCompact']>
  contentCompactWidth: NonNullable<Props['contentCompactWidth']>
  padding: NonNullable<Props['padding']>
  paddingBottom: NonNullable<Props['paddingBottom']>
  paddingLeft: NonNullable<Props['paddingLeft']>
  paddingRight: NonNullable<Props['paddingRight']>
  paddingTop: NonNullable<Props['paddingTop']>
};

/**
 * 使用解构赋值并设置默认值，解决 TypeScript 类型推断问题
 */
const {
  contentCompact = 'default' as ContentCompactType,
  contentCompactWidth = 1200,
  padding = 16,
  paddingBottom = 16,
  paddingLeft = 16,
  paddingRight = 16,
  paddingTop = 16,
} = props;

/**
 * 使用 `useLayoutContentStyle` 组合式函数
 * 获取内容区域的 DOM 引用和覆盖层样式
 * @returns {Object} - 包含 `contentElement` 和 `overlayStyle` 的对象
 *   - `contentElement`：内容区域的模板引用
 *   - `overlayStyle`：覆盖层的样式对象
 */
const { contentElement, overlayStyle } = useLayoutContentStyle();

// Ensure contentElement is used to avoid TypeScript warnings
if (!contentElement) {
  console.warn('contentElement is not available');
}

/**
 * 计算内容区域样式的计算属性
 * 根据 `contentCompact` 属性决定是否应用定宽样式
 * 合并处理统一内边距和具体方向内边距的优先级
 * @returns {ComputedRef<CSSProperties>} - 计算后的样式对象
 */
const style = computed((): CSSProperties => {
  /**
   * 紧凑模式样式配置
   * 当 `contentCompact` 为 'compact' 时，内容区域居中并设置固定宽度
   */
  const compactStyle: CSSProperties =
    contentCompact === 'compact'
      ? { 
          marginInline: 'auto', 
          width: `${contentCompactWidth}px` 
        }
      : {};

  /**
   * 返回合并后的样式对象
   * 注意：具体方向的内边距会覆盖统一内边距设置
   */
  return {
    ...compactStyle,
    flex: 1,
    padding: `${padding}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    paddingTop: `${paddingTop}px`,
  };
});
</script>

<template>
  <!-- 
    主内容区域容器
    @ref {Ref<HTMLElement | undefined>} contentElement - 绑定到内容区域的模板引用
    @style {CSSProperties} style - 动态计算的内容区域样式
    @class {string} relative bg-background-deep - Tailwind CSS 类名
         relative: 设置相对定位
         bg-background-deep: 设置背景颜色为深色背景
  -->
  <main 
    ref="contentElement" 
    :style="style" 
    class="relative bg-background-deep"
  >
    <!--
      覆盖层插槽容器
      使用 `Slot` 组件包装具名插槽 'overlay'
      @style {CSSProperties} overlayStyle - 动态计算的覆盖层样式
    -->
    <Slot :style="overlayStyle">
      <slot name="overlay" />
    </Slot>
    
    <!--
      默认插槽
      用于插入主内容区域的内容
    -->
    <slot />
  </main>
</template>