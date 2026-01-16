<script setup lang="ts">
import type { CSSProperties } from 'vue';

import { computed, useSlots } from 'vue';

/**
 * 布局头部组件属性接口定义
 * @interface Props
 * @property {boolean} fullWidth - 是否横屏全宽度模式
 *     当设置为 `true` 时，头部将占据整个视口宽度
 *     当设置为 `false` 时，头部宽度受侧边栏影响
 * @property {number} height - 头部高度（像素）
 *     设置头部组件的垂直尺寸
 * @property {boolean} isMobile - 是否为移动端设备
 *     根据设备类型调整布局样式和尺寸
 * @property {boolean} show - 是否显示头部组件
 *     控制头部组件的显示与隐藏状态
 * @property {number} sidebarWidth - 侧边菜单宽度（像素）
 *     用于计算头部logo区域的最小宽度
 * @property {string | undefined} theme - 主题样式名称
 *     用于动态应用主题类名，支持自定义主题
 * @property {string} width - 头部组件宽度
 *     支持 CSS 宽度值，如 '100%'、'auto' 等
 * @property {number} zIndex - 头部组件的层级
 *     控制头部在页面中的堆叠顺序，默认为较高层级
 */
interface Props {
  readonly fullWidth: boolean;
  readonly height: number;
  readonly isMobile: boolean;
  readonly show: boolean;
  readonly sidebarWidth: number;
  readonly theme?: string | undefined;
  readonly width: string;
  readonly zIndex: number;
}

/**
 * 使用 `defineProps` 宏定义组件属性
 * 采用 TypeScript 类型标注方式，为所有属性提供明确的类型定义
 * 
 * 注意：所有属性都标记为 `readonly`，确保响应式数据的不可变性
 */
const props = defineProps<Props>();

/**
 * 使用 `useSlots` 组合式函数获取插槽信息
 * 用于动态判断插槽内容是否存在
 * 
 * @returns {ComponentSlots} - 包含所有插槽信息的对象
 */
const slots = useSlots();

/**
 * 计算头部组件样式的计算属性
 * 根据属性值动态生成 CSS 样式对象
 * 
 * @returns {ComputedRef<CSSProperties>} - 包含动态样式的响应式对象
 * 
 * @description
 * 样式计算逻辑：
 * 1. `height`: 将数值转换为像素单位
 * 2. `marginBlockStart`: 控制显示/隐藏，使用负边距实现平滑隐藏效果
 * 3. `insetInlineEnd`: 逻辑属性，控制元素在行内结束方向的定位
 *     当 `fullWidth` 为 `true` 且组件显示时，设置为 0
 *     使用 CSS 逻辑属性替代传统的 `right`，支持 RTL 布局
 */
const style = computed((): CSSProperties => {
  const { fullWidth, height, show } = props;
  
  return {
    height: `${height}px`,
    marginBlockStart: show ? '0' : `-${height}px`,
    insetInlineEnd: (!show || !fullWidth) ? undefined : '0',
    zIndex: props.zIndex,
  };
});

/**
 * 计算 Logo 区域样式的计算属性
 * 根据设备类型和侧边栏宽度动态调整 Logo 区域的最小宽度
 * 
 * @returns {ComputedRef<CSSProperties>} - 包含 Logo 区域样式的响应式对象
 * 
 * @description
 * 样式计算逻辑：
 * 1. 移动端设备：最小宽度为 40px，适应小屏幕显示
 * 2. 桌面端设备：最小宽度等于侧边栏宽度，保持布局对齐
 */
const logoStyle = computed((): CSSProperties => ({
  minInlineSize: `${props.isMobile ? 40 : props.sidebarWidth}px`,
}));

/**
 * 计算头部容器样式的计算属性
 * 为头部容器提供内联样式，确保组件宽度正确应用
 * 
 * @returns {ComputedRef<CSSProperties>} - 包含容器样式的响应式对象
 */
const containerStyle = computed((): CSSProperties => ({
  width: props.width,
}));
</script>

<template>
  <!--
    布局头部容器
    使用 Vue 3.5+ 的 `<template>` 语法和 ES2025 最佳实践

    @class {string} 动态主题类名 - 根据 theme 属性动态应用主题样式
    @style {CSSProperties} style - 动态计算的头部组件样式
    @class {string} 静态CSS类名 - 应用基础样式和布局
    @style {CSSProperties} containerStyle - 头部容器宽度样式
  -->
  <header
    :class="theme"
    :style="{ ...style, ...containerStyle }"
    class="top-0 flex w-full flex-[0_0_auto] items-center border-b border-border bg-header pl-2 transition-[margin-block-start] duration-200"
  >
    <!--
      Logo 区域插槽
      当 `slots.logo` 存在时渲染 Logo 容器
      
      @style {CSSProperties} logoStyle - 动态计算的 Logo 区域样式
      @slot logo - Logo 显示区域，支持自定义 Logo 组件
    -->
    <div
      v-if="slots['logo']"
      :style="logoStyle"
      class="flex items-center justify-center"
    >
      <slot name="logo" />
    </div>

    <!--
      切换按钮插槽
      用于显示侧边栏或菜单的切换按钮
      
      @slot toggle-button - 切换按钮区域，通常包含汉堡菜单图标
    -->
    <div
      v-if="slots['toggle-button']"
      class="ml-2 flex items-center"
    >
      <slot name="toggle-button" />
    </div>

    <!--
      默认插槽（主内容区域）
      用于插入头部的主要内容，如导航菜单、用户信息、搜索框等
      
      @slot default - 头部主内容区域，支持任意自定义内容
    -->
    <div class="flex flex-1 items-center justify-between px-4">
      <slot />
    </div>
  </header>
</template>