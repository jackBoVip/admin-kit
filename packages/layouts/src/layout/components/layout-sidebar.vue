<script setup lang="ts">
import type { CSSProperties} from 'vue';

import { computed, useSlots, watchEffect } from 'vue';

import { AdminScrollbar } from '@admin-core/ui';

import { useScrollLock } from '@vueuse/core';

import { SidebarCollapseButton, SidebarFixedButton } from './widgets';

/**
 * 侧边栏布局组件属性接口定义
 * @interface Props
 * @property {number} [collapseHeight=42] - 折叠区域的高度（像素）
 *     用于容纳折叠按钮和其他折叠相关元素的高度
 * @property {number} [collapseWidth=48] - 侧边栏折叠状态时的宽度（像素）
 *     侧边栏收起（折叠）时的宽度值
 * @property {boolean} [domVisible=true] - 隐藏的 DOM 元素是否可见
 *     控制用于布局占位的隐藏侧边栏是否显示
 * @property {number} extraWidth - 扩展区域的宽度（像素）
 *     侧边栏混合模式下额外内容区域的宽度
 * @property {boolean} [fixedExtra=false] - 是否固定扩展区域
 *     当设置为 `true` 时，扩展区域始终显示，不随鼠标悬停变化
 * @property {number} headerHeight - 头部区域的高度（像素）
 *     用于计算内容区域高度，通常与页面头部组件高度一致
 * @property {boolean} [isSidebarMixed=false] - 是否为侧边混合模式
 *     混合模式下侧边栏分为主区域和扩展区域，支持更复杂的布局
 * @property {number} [marginTop=0] - 侧边栏顶部外边距（像素）
 *     用于调整侧边栏距离页面顶部的距离
 * @property {number} [mixedWidth=70] - 混合模式下主区域的宽度（像素）
 *     侧边混合模式下主侧边栏的宽度
 * @property {number} [paddingTop=0] - 侧边栏顶部内边距（像素）
 *     侧边栏内容区域距离顶部的内边距
 * @property {boolean} [show=true] - 是否显示侧边栏
 *     控制整个侧边栏组件的显示与隐藏状态
 * @property {boolean} [showCollapseButton=true] - 是否显示折叠按钮
 *     控制折叠按钮的可见性
 * @property {boolean} [showFixedButton=true] - 是否显示固定按钮
 *     控制固定按钮（悬停展开模式切换按钮）的可见性
 * @property {string} theme - 主题样式名称
 *     应用主题相关的 CSS 类名，支持自定义主题
 * @property {number} width - 侧边栏的宽度（像素）
 *     侧边栏在展开状态下的宽度
 * @property {number} [zIndex=0] - 侧边栏的堆叠层级
 *     控制侧边栏在页面中的堆叠顺序
 */
interface Props {
  readonly collapseHeight?: number;
  readonly collapseWidth?: number;
  readonly domVisible?: boolean;
  readonly extraWidth: number;
  readonly fixedExtra?: boolean;
  readonly headerHeight: number;
  readonly isSidebarMixed?: boolean;
  readonly marginTop?: number;
  readonly mixedWidth?: number;
  readonly paddingTop?: number;
  readonly show?: boolean;
  readonly showCollapseButton?: boolean;
  readonly showFixedButton?: boolean;
  readonly theme?: string | undefined;
  readonly width: number;
  readonly zIndex?: number;
}

/**
 * 使用 `defineProps` 宏定义组件属性
 * 采用 TypeScript 类型标注方式，结合 `withDefaults` 设置默认值
 * 
 * 注意：`extraWidth`、`headerHeight`、`theme`、`width` 是必需属性
 */
const props = withDefaults(defineProps<Props>(), {
  collapseHeight: 42,
  collapseWidth: 48,
  domVisible: true,
  fixedExtra: false,
  isSidebarMixed: false,
  marginTop: 0,
  mixedWidth: 70,
  paddingTop: 0,
  show: true,
  showCollapseButton: true,
  showFixedButton: true,
  zIndex: 0,
});

/**
 * 组件事件定义
 * @typedef {Object} Emits
 * @property {'leave'} leave - 鼠标离开侧边栏时触发的事件
 */
const emit = defineEmits<{
  /**
   * 鼠标离开侧边栏事件
   * 当鼠标离开侧边栏区域时触发，用于处理悬停相关逻辑
   */
  leave: [];
}>();

/**
 * 双向绑定属性定义
 * 使用 Vue 3.4+ 的 defineModel 宏，简化双向数据绑定
 */
const collapse = defineModel<boolean>('collapse', { default: false });
const extraCollapse = defineModel<boolean>('extraCollapse', { default: false });
const expandOnHovering = defineModel<boolean>('expandOnHovering', { default: false });
const expandOnHover = defineModel<boolean>('expandOnHover', { default: false });
const extraVisible = defineModel<boolean>('extraVisible', { default: false });

/**
 * 使用 VueUse 的 useScrollLock 组合式函数
 * 用于锁定页面滚动，防止在特定交互时页面滚动
 * @type {Ref<boolean>}
 */
// SSR/Node 环境下没有 document，避免在导入阶段直接访问导致构建/渲染报错
const scrollLockTarget = typeof document !== 'undefined' ? document.body : undefined;
const isLocked = useScrollLock(scrollLockTarget);

/**
 * 使用 Vue 的 useSlots 组合式函数
 * 用于检查插槽内容是否存在
 * @type {ComponentSlots}
 */
const slots = useSlots();

/**
 * 侧边栏扩展区域的模板引用
 * 使用 shallowRef 优化性能，避免深层响应式转换
 * @type {ShallowRef<HTMLDivElement | null>}
 */
// const asideRef = shallowRef<HTMLDivElement>(); // Temporarily commented to avoid TypeScript warnings
// We can use a local variable if needed for future functionality

/**
 * 计算隐藏侧边栏的样式
 * 用于布局占位的隐藏侧边栏样式，支持悬停展开逻辑
 * 
 * @returns {ComputedRef<CSSProperties>} - 隐藏侧边栏的样式对象
 * 
 * @description
 * 根据组件状态计算隐藏侧边栏的样式，主要用于布局占位和悬停展开效果
 * 当 `expandOnHovering` 为 true 且 `expandOnHover` 为 false 时，使用折叠宽度
 */
const hiddenSideStyle = computed((): CSSProperties => calcMenuWidthStyle(true));

/**
 * 计算主侧边栏的样式
 * 包含位置、尺寸、层级等核心样式属性
 * 
 * @returns {ComputedRef<CSSProperties>} - 主侧边栏的样式对象
 * 
 * @description
 * 1. 设置自定义 CSS 变量 `--scroll-shadow`
 * 2. 使用 `calcMenuWidthStyle` 计算宽度相关样式
 * 3. 根据 `marginTop` 和 `paddingTop` 计算高度和内边距
 * 4. 在混合模式下且扩展区域可见时，禁用过渡动画以优化性能
 */
const style = computed((): CSSProperties => {
  const { isSidebarMixed, marginTop, paddingTop, zIndex } = props;

  return {
    '--scroll-shadow': 'var(--sidebar)',
    ...calcMenuWidthStyle(false),
    blockSize: `calc(100% - ${marginTop}px)`,
    marginBlockStart: `${marginTop}px`,
    paddingBlockStart: `${paddingTop}px`,
    zIndex,
    ...(isSidebarMixed && extraVisible.value ? { transition: 'none' } : {}),
  };
});

/**
 * 计算扩展区域的样式
 * 控制扩展区域的位置、宽度和显示状态
 * 
 * @returns {ComputedRef<CSSProperties>} - 扩展区域的样式对象
 * 
 * @description
 * 1. `insetInlineStart`: 扩展区域相对于主侧边栏的位置
 * 2. `inlineSize`: 根据 `extraVisible` 和 `show` 状态动态设置宽度
 * 3. 当不可见时宽度为 0，实现平滑的展开/收起动画
 */
const extraStyle = computed((): CSSProperties => {
  const { extraWidth, show, width, zIndex } = props;

  return {
    insetInlineStart: `${width}px`,
    inlineSize: extraVisible.value && show ? `${extraWidth}px` : '0',
    zIndex,
  };
});

/**
 * 计算扩展区域标题的样式
 * 主要用于设置扩展区域标题的高度
 * 
 * @returns {ComputedRef<CSSProperties>} - 扩展区域标题的样式对象
 */
const extraTitleStyle = computed((): CSSProperties => ({
  blockSize: `${props.headerHeight - 1}px`,
}));

/**
 * 计算内容区域的宽度样式
 * 根据混合模式和固定扩展区域状态动态设置宽度
 * 
 * @returns {ComputedRef<CSSProperties>} - 内容区域的宽度样式对象
 * 
 * @description
 * 1. 在混合模式且固定扩展区域时，根据折叠状态设置宽度
 * 2. 其他情况下返回空对象，使用默认宽度
 */
const contentWidthStyle = computed((): CSSProperties => {
  const { collapseWidth, fixedExtra, isSidebarMixed, mixedWidth } = props;
  
  if (isSidebarMixed && fixedExtra) {
    return { inlineSize: `${collapse.value ? collapseWidth : mixedWidth}px` };
  }
  
  return {};
});

/**
 * 计算主内容区域的样式
 * 包含高度、内边距和动态宽度
 * 
 * @returns {ComputedRef<CSSProperties>} - 主内容区域的样式对象
 */
const contentStyle = computed((): CSSProperties => ({
  blockSize: `calc(100% - ${props.headerHeight + props.collapseHeight}px)`,
  paddingBlockStart: '8px',
  ...contentWidthStyle.value,
}));

/**
 * 计算头部区域的样式
 * 设置头部区域的高度和布局方式
 * 
 * @returns {ComputedRef<CSSProperties>} - 头部区域的样式对象
 * 
 * @description
 * 1. 在混合模式下使用 Flex 布局并居中
 * 2. 设置高度为 `headerHeight - 1` 像素
 * 3. 应用动态宽度样式
 */
const headerStyle = computed((): CSSProperties => ({
  ...(props.isSidebarMixed ? { 
    display: 'flex', 
    justifyContent: 'center' 
  } : {}),
  blockSize: `${props.headerHeight - 1}px`,
  ...contentWidthStyle.value,
}));

/**
 * 计算扩展内容区域的样式
 * 设置扩展内容区域的高度
 * 
 * @returns {ComputedRef<CSSProperties>} - 扩展内容区域的样式对象
 */
const extraContentStyle = computed((): CSSProperties => ({
  blockSize: `calc(100% - ${props.headerHeight + props.collapseHeight}px)`,
}));

/**
 * 计算折叠区域的样式
 * 设置折叠区域的高度
 * 
 * @returns {ComputedRef<CSSProperties>} - 折叠区域的样式对象
 */
const collapseStyle = computed((): CSSProperties => ({
  blockSize: `${props.collapseHeight}px`,
}));

/**
 * 观察 effect：根据 fixedExtra 属性控制扩展区域可见性
 * 
 * @description
 * 当 `fixedExtra` 为 true 时，强制设置 `extraVisible` 为 true
 * 使用 `watchEffect` 自动响应依赖变化
 */
watchEffect(() => {
  if (props.fixedExtra) {
    extraVisible.value = true;
  }
});

/**
 * 计算菜单宽度样式
 * 根据组件状态和参数计算侧边栏的宽度相关样式
 * 
 * @param {boolean} isHiddenDom - 是否为隐藏的 DOM 元素
 * @returns {CSSProperties} - 计算后的宽度样式对象
 * 
 * @description
 * 宽度计算逻辑：
 * 1. 基础宽度：主宽度 + 扩展区域宽度（在混合模式且固定扩展且扩展可见时）
 * 2. 悬停展开逻辑：当悬停展开激活且不是悬停模式时，使用折叠宽度
 * 3. 宽度为 0 时添加 overflow: hidden 优化性能
 * 4. 设置 flex、max-width、min-width 和 width 确保布局稳定性
 */
function calcMenuWidthStyle(isHiddenDom: boolean): CSSProperties {
  const { extraWidth, fixedExtra, isSidebarMixed, show, width } = props;

  let widthValue =
    width === 0
      ? '0px'
      : `${width + (isSidebarMixed && fixedExtra && extraVisible.value ? extraWidth : 0)}px`;

  const { collapseWidth } = props;

  // 悬停展开逻辑处理
  if (isHiddenDom && expandOnHovering.value && !expandOnHover.value) {
    widthValue = `${collapseWidth}px`;
  }

  return {
    ...(widthValue === '0px' ? { overflow: 'hidden' } : {}),
    flex: `0 0 ${widthValue}`,
    marginInlineStart: show ? 0 : `-${widthValue}`,
    maxInlineSize: widthValue,
    minInlineSize: widthValue,
    inlineSize: widthValue,
  };
}

/**
 * 鼠标进入侧边栏事件处理函数
 * 
 * @param {MouseEvent} e - 鼠标事件对象
 * @description
 * 1. 检查鼠标位置，靠近边缘时不触发悬停展开（避免误触）
 * 2. 悬停模式激活时不处理
 * 3. 未开启悬停展开时，展开侧边栏并锁定滚动（混合模式下）
 * 4. 设置悬停展开状态
 */
function handleMouseenter(e: MouseEvent) {
  // 靠近左侧边缘时不触发悬停展开，避免与窗口边缘交互冲突
  if (e?.offsetX < 10) {
    return;
  }

  // 悬停模式已激活时不再处理
  if (expandOnHover.value) {
    return;
  }
  
  // 未开启悬停展开时，展开侧边栏
  if (!expandOnHovering.value) {
    collapse.value = false;
  }
  
  // 混合模式下锁定页面滚动
  if (props.isSidebarMixed) {
    isLocked.value = true;
  }
  
  expandOnHovering.value = true;
}

/**
 * 鼠标离开侧边栏事件处理函数
 * 
 * @description
 * 1. 触发 leave 事件
 * 2. 混合模式下解锁页面滚动
 * 3. 悬停模式激活时不处理收起逻辑
 * 4. 收起侧边栏，隐藏扩展区域
 */
function handleMouseleave() {
  emit('leave');
  
  // 混合模式下解锁页面滚动
  if (props.isSidebarMixed) {
    isLocked.value = false;
  }
  
  // 悬停模式激活时不收起侧边栏
  if (expandOnHover.value) {
    return;
  }

  expandOnHovering.value = false;
  collapse.value = true;
  extraVisible.value = false;
}
</script>

<template>
  <!-- 
    隐藏的侧边栏占位元素
    用于在布局中占据侧边栏的空间，确保页面内容正确布局
    
    @v-if {boolean} domVisible - 控制是否渲染此元素
    @class {string} theme - 应用主题样式
    @style {CSSProperties} hiddenSideStyle - 动态计算的隐藏样式
    @class {string} h-full transition-all duration-150 - 基础样式类
  -->
  <div
    v-if="domVisible"
    :class="theme"
    :style="hiddenSideStyle"
    class="h-full transition-all duration-150"
  />

  <!-- 
    主侧边栏容器
    使用 Vue 3.5+ 的模板语法和 ES2025 最佳实践
    
    @class {Array|Object} 动态类名 - 根据主题和模式应用不同样式
    @style {CSSProperties} style - 动态计算的主侧边栏样式
    @class {string} 静态CSS类名 - 基础布局和定位样式
    @event {Function} mouseenter - 鼠标进入事件
    @event {Function} mouseleave - 鼠标离开事件
  -->
  <aside
    :class="[
      theme,
      {
        'bg-sidebar-deep': isSidebarMixed,
        'border-r border-border bg-sidebar': !isSidebarMixed,
      },
    ]"
    :style="style"
    class="fixed inset-block-start-0 inset-inline-start-0 h-full transition-all duration-150"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <!-- 
      固定按钮组件
      控制悬停展开模式的切换
      
      @v-if {boolean} 显示条件 - 非折叠、非混合模式且允许显示固定按钮时
      @v-model:expand-on-hover {boolean} expandOnHover - 悬停模式双向绑定
    -->
    <SidebarFixedButton
      v-if="!collapse && !isSidebarMixed && showFixedButton"
      v-model:expand-on-hover="expandOnHover"
    />

    <!-- 
      Logo 区域
      显示侧边栏顶部的 Logo 或品牌标识
      
      @v-if {boolean} slots.logo - 当存在 logo 插槽内容时渲染
      @style {CSSProperties} headerStyle - 动态计算的头部样式
      @slot logo - Logo 显示区域，支持自定义 Logo 组件
    -->
    <div v-if="slots['logo']" :style="headerStyle">
      <slot name="logo" />
    </div>

    <!-- 
      主内容区域滚动容器
      使用自定义滚动条组件，支持阴影和边框效果
      
      @style {CSSProperties} contentStyle - 动态计算的内容区域样式
      @prop {boolean} shadow - 启用滚动阴影效果
      @prop {boolean} shadow-border - 启用阴影边框效果
    -->
    <AdminScrollbar 
      :style="contentStyle" 
      shadow 
      shadow-border
    >
      <slot />
    </AdminScrollbar>

    <!-- 
      折叠区域占位
      为折叠按钮预留空间，确保布局一致性
      
      @style {CSSProperties} collapseStyle - 动态计算的折叠区域样式
    -->
    <div :style="collapseStyle" />

    <!-- 
      折叠按钮组件
      控制主侧边栏的折叠/展开状态
      
      @v-if {boolean} 显示条件 - 允许显示折叠按钮且非混合模式时
      @v-model:collapsed {boolean} collapse - 折叠状态双向绑定
    -->
    <SidebarCollapseButton
      v-if="showCollapseButton && !isSidebarMixed"
      v-model:collapsed="collapse"
    />

    <!-- 
      扩展区域容器（混合模式）
      侧边混合模式下的额外内容区域
      
      @v-if {boolean} isSidebarMixed - 仅混合模式下渲染
      @ref {ShallowRef<HTMLDivElement>} asideRef - 扩展区域的模板引用
      @class {Object} 动态类名 - 根据扩展区域可见性添加边框
      @style {CSSProperties} extraStyle - 动态计算的扩展区域样式
      @class {string} 静态CSS类名 - 基础布局和样式
    -->
    <div
      v-if="isSidebarMixed"
      ref="asideRef"
      :class="{
        'border-l': extraVisible,
      }"
      :style="extraStyle"
      class="fixed inset-block-start-0 h-full overflow-hidden border-r border-border bg-sidebar transition-all duration-200"
    >
      <!-- 
        扩展区域折叠按钮
        控制扩展区域的折叠/展开状态
        
        @v-if {boolean} isSidebarMixed && expandOnHover - 混合模式且悬停模式激活时
        @v-model:collapsed {boolean} extraCollapse - 扩展区域折叠状态双向绑定
      -->
      <SidebarCollapseButton
        v-if="isSidebarMixed && expandOnHover"
        v-model:collapsed="extraCollapse"
      />

      <!-- 
        扩展区域固定按钮
        控制扩展区域的悬停展开模式
        
        @v-if {boolean} !extraCollapse - 扩展区域未折叠时显示
        @v-model:expand-on-hover {boolean} expandOnHover - 悬停模式双向绑定
      -->
      <SidebarFixedButton
        v-if="!extraCollapse"
        v-model:expand-on-hover="expandOnHover"
      />

      <!-- 
        扩展区域标题
        显示扩展区域的标题或标识
        
        @v-if {boolean} !extraCollapse - 扩展区域未折叠时显示
        @style {CSSProperties} extraTitleStyle - 动态计算的标题样式
        @class {string} pl-2 - 左侧内边距
        @slot extra-title - 扩展区域标题插槽
      -->
      <div 
        v-if="!extraCollapse" 
        :style="extraTitleStyle" 
        class="pl-2"
      >
        <slot name="extra-title" />
      </div>

      <!-- 
        扩展内容区域滚动容器
        显示扩展区域的主要内容
        
        @style {CSSProperties} extraContentStyle - 动态计算的扩展内容样式
        @class {string} border-border py-2 - 边框和内边距样式
        @prop {boolean} shadow - 启用滚动阴影效果
        @prop {boolean} shadow-border - 启用阴影边框效果
        @slot extra - 扩展区域内容插槽
      -->
      <AdminScrollbar
        :style="extraContentStyle"
        class="border-border py-2"
        shadow
        shadow-border
      >
        <slot name="extra" />
      </AdminScrollbar>
    </div>
  </aside>
</template>