<script setup lang="ts">
import type { CSSProperties } from 'vue';

import type { AdminLayoutProps } from './admin-layout';

import { computed, ref, watch, watchEffect } from 'vue';

import {
  SCROLL_FIXED_CLASS,
  useLayoutFooterStyle,
  useLayoutHeaderStyle,
} from '@admin-core/composables';
import { IconifyIcon } from '@admin-core/icons';
import { AdminIconButton } from '@admin-core/ui';
import { ELEMENT_IDS } from '@admin-core/shared/constants';

import { useMouse, useScroll, useThrottleFn, useMediaQuery } from '@vueuse/core';

import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSidebar,
  LayoutTabbar,
} from './components';
import { useLayout } from './hooks/use-layout';
import { 
  DEFAULT_LAYOUT_OPTIONS, 
  DEFAULT_BREAKPOINTS,
} from './config';

/**
 * 布局组件属性接口
 * 继承自 AdminLayoutProps 并扩展特定属性
 * @extends AdminLayoutProps
 */
interface Props extends AdminLayoutProps {}

/**
 * 定义组件名称
 */
defineOptions({
  name: 'AdminLayout',
});

/**
 * 使用 `defineProps` 宏定义组件属性
 * 采用 TypeScript 类型标注方式，结合 `withDefaults` 设置默认值
 */
const props = withDefaults(defineProps<Props>(), {
  contentCompact: 'wide',
  contentCompactWidth: 1200,
  contentPadding: 0,
  contentPaddingBottom: 0,
  contentPaddingLeft: 0,
  contentPaddingRight: 0,
  contentPaddingTop: 0,
  footerEnable: false,
  footerFixed: true,
  footerHeight: 32,
  headerHeight: 50,
  headerHidden: false,
  headerMode: 'fixed',
  headerToggleSidebarButton: true,
  headerVisible: true,
  isMobile: false,
  layout: DEFAULT_LAYOUT_OPTIONS.defaultLayout,
  sidebarCollapsedButton: true,
  sidebarCollapseShowTitle: false,
  sidebarExtraCollapsedWidth: 60,
  sidebarFixedButton: true,
  sidebarHidden: false,
  sidebarMixedWidth: 80,
  sidebarTheme: 'dark',
  sidebarWidth: 180,
  sideCollapseWidth: 60,
  tabbarEnable: true,
  tabbarHeight: 40,
  zIndex: 200,
});

/**
 * 组件事件定义
 * @typedef {Object} Emits
 * @property {'sideMouseLeave'} sideMouseLeave - 鼠标离开侧边栏时触发
 * @property {'toggleSidebar'} toggleSidebar - 切换侧边栏状态时触发
 */
const emit = defineEmits<{
  /**
   * 鼠标离开侧边栏事件
   * 当鼠标离开侧边栏区域时触发，用于处理悬停相关逻辑
   */
  sideMouseLeave: [];
  
  /**
   * 切换侧边栏事件
   * 当需要切换侧边栏的折叠/展开状态时触发
   */
  toggleSidebar: [];
}>();

/**
 * 双向绑定属性定义
 * 使用 Vue 3.4+ 的 defineModel 宏，简化双向数据绑定
 */
const sidebarCollapse = defineModel<boolean>('sidebarCollapse', {
  default: false,
});
const sidebarExtraVisible = defineModel<boolean>('sidebarExtraVisible', {
  default: false,
});
const sidebarExtraCollapse = defineModel<boolean>('sidebarExtraCollapse', {
  default: false,
});
const sidebarExpandOnHover = defineModel<boolean>('sidebarExpandOnHover', {
  default: false,
});
const sidebarEnable = defineModel<boolean>('sidebarEnable', { 
  default: true 
});

/**
 * 侧边栏是否处于悬停展开状态
 * 用于控制鼠标悬停时侧边栏的展开行为
 * @type {Ref<boolean>}
 */
const sidebarExpandOnHovering = ref(false);

/**
 * 头部是否隐藏状态
 * 用于控制头部区域的自动隐藏/显示逻辑
 * @type {Ref<boolean>}
 */
const headerIsHidden = ref(false);

/**
 * 内容区域的模板引用
 * 用于获取内容区域的 DOM 元素，进行鼠标位置检测
 * @type {Ref<HTMLElement | undefined>}
 */
const contentRef = ref<HTMLElement>();

/**
 * 使用 VueUse 的 useScroll 组合式函数
 * 监控文档的滚动状态，包括滚动位置、方向和到达状态
 */
// 滚动目标：支持外部传入更精准的滚动容器；默认 document（SSR 下为 undefined）
const fallbackScrollTarget = typeof document !== 'undefined' ? document : undefined;
const { arrivedState, directions, isScrolling, y: scrollY } = useScroll(
  props.scrollTarget ?? fallbackScrollTarget
);

/**
 * 使用 VueUse 的 useMouse 组合式函数
 * 监控鼠标在内容区域内的位置
 */
const { y: mouseY } = useMouse({ 
  target: contentRef, 
  type: 'client' 
});

/**
 * 使用媒体查询检测设备类型
 * 当视口宽度小于移动端断点时，自动更新 isMobile 状态
 */
const isMobileMedia = useMediaQuery(
  `(max-width: ${DEFAULT_BREAKPOINTS.mobile}px)`
);

/**
 * 统一的移动端状态（props 优先，其次 mediaQuery）
 * 避免在不同计算属性中分别使用 props.isMobile 与 mediaQuery 导致状态不一致
 */
const isMobileState = computed(() => props.isMobile || isMobileMedia.value);

/**
 * 使用布局组合式函数
 * 根据设备类型和布局配置计算当前布局模式和状态
 */
const {
  currentLayout,
  isFullContent,
  isHeaderMixedNav,
  isHeaderNav,
  isMixedNav,
  isSidebarMixedNav,
} = useLayout({
  ...props,
  isMobile: isMobileState.value,
});

/**
 * 使用布局样式组合式函数
 * 设置头部和底部的高度，用于全局样式管理
 */
const { setLayoutHeaderHeight } = useLayoutHeaderStyle();
const { setLayoutFooterHeight } = useLayoutFooterStyle();

/**
 * 计算属性：顶部栏是否为自动模式
 * 自动模式下，头部会根据滚动位置自动显示/隐藏
 * 
 * @returns {ComputedRef<boolean>} - 是否为自动模式
 */
const isHeaderAutoMode = computed(() => props.headerMode === 'auto');

/**
 * 计算属性：头部包装器的高度
 * 包含头部和标签栏（如果启用）的总高度
 * 
 * @returns {ComputedRef<number>} - 头部包装器的高度（像素）
 */
const headerWrapperHeight = computed(() => {
  let height = 0;
  
  // 添加头部高度（如果可见且未隐藏）
  if (props.headerVisible && !props.headerHidden) {
    height += props.headerHeight;
  }
  
  // 添加标签栏高度（如果启用）
  if (props.tabbarEnable) {
    height += props.tabbarHeight;
  }
  
  return height;
});

/**
 * 计算属性：获取侧边栏折叠时的宽度
 * 根据配置和设备类型动态计算折叠宽度
 * 
 * @returns {ComputedRef<number>} - 侧边栏折叠宽度（像素）
 */
const getSideCollapseWidth = computed(() => {
  const { sidebarCollapseShowTitle, sidebarMixedWidth, sideCollapseWidth } = props;

  return sidebarCollapseShowTitle ||
    isSidebarMixedNav.value ||
    isHeaderMixedNav.value
    ? sidebarMixedWidth
    : sideCollapseWidth;
});

/**
 * 计算属性：侧边栏是否启用
 * 根据布局类型和配置决定侧边栏是否可用
 * 
 * @returns {ComputedRef<boolean>} - 侧边栏是否启用
 */
const sidebarEnableState = computed(() => {
  return !isHeaderNav.value && sidebarEnable.value;
});

/**
 * 计算属性：侧边栏距离顶部的边距
 * 在混合导航模式下，侧边栏需要与头部对齐
 * 
 * @returns {ComputedRef<number>} - 侧边栏顶部边距（像素）
 */
const sidebarMarginTop = computed(() => {
  const { headerHeight } = props;
  return isMixedNav.value && !isMobileState.value ? headerHeight : 0;
});

/**
 * 计算属性：动态获取侧边栏宽度
 * 根据设备类型、折叠状态和布局模式计算侧边栏宽度
 * 
 * @returns {ComputedRef<number>} - 侧边栏宽度（像素）
 */
const getSidebarWidth = computed(() => {
  const { isMobile, sidebarHidden, sidebarMixedWidth, sidebarWidth } = props;
  let width = 0;

  // 如果侧边栏隐藏，宽度为0
  if (sidebarHidden) {
    return width;
  }

  // 如果侧边栏未启用，或者隐藏且不是特定混合布局，宽度为0
  if (
    !sidebarEnableState.value ||
    (sidebarHidden &&
      !isSidebarMixedNav.value &&
      !isMixedNav.value &&
      !isHeaderMixedNav.value)
  ) {
    return width;
  }

  // 计算不同布局模式下的宽度
  if ((isHeaderMixedNav.value || isSidebarMixedNav.value) && !isMobile) {
    width = sidebarMixedWidth;
  } else if (sidebarCollapse.value) {
    width = isMobile ? 0 : getSideCollapseWidth.value;
  } else {
    width = sidebarWidth;
  }
  
  return width;
});

/**
 * 计算属性：获取扩展区域宽度
 * 根据扩展区域的折叠状态计算宽度
 * 
 * @returns {ComputedRef<number>} - 扩展区域宽度（像素）
 */
const sidebarExtraWidth = computed(() => {
  const { sidebarExtraCollapsedWidth, sidebarWidth } = props;

  return sidebarExtraCollapse.value ? sidebarExtraCollapsedWidth : sidebarWidth;
});

/**
 * 计算属性：是否为侧边栏模式
 * 包含所有使用侧边栏的布局模式
 * 
 * @returns {ComputedRef<boolean>} - 是否为侧边栏模式
 */
const isSideMode = computed(() =>
  currentLayout.value === 'mixed-nav' ||
  currentLayout.value === 'sidebar-mixed-nav' ||
  currentLayout.value === 'sidebar-nav' ||
  currentLayout.value === 'header-mixed-nav' ||
  currentLayout.value === 'header-sidebar-nav'
);

/**
 * 计算属性：头部是否为固定定位
 * 根据布局模式和头部模式设置决定
 * 
 * @returns {ComputedRef<boolean>} - 头部是否为固定定位
 */
const headerFixed = computed(() => {
  const { headerMode } = props;
  return (
    isMixedNav.value ||
    headerMode === 'fixed' ||
    headerMode === 'auto-scroll' ||
    headerMode === 'auto'
  );
});

/**
 * 计算属性：是否显示侧边栏
 * 根据布局模式、侧边栏启用状态和隐藏设置决定
 * 
 * @returns {ComputedRef<boolean>} - 是否显示侧边栏
 */
const showSidebar = computed(() => {
  return isSideMode.value && sidebarEnable.value && !props.sidebarHidden;
});

/**
 * 计算属性：遮罩是否可见
 * 在移动端且侧边栏展开时显示遮罩
 * 
 * @returns {ComputedRef<boolean>} - 遮罩是否可见
 */
const maskVisible = computed(() => !sidebarCollapse.value && props.isMobile);

/**
 * 计算属性：主内容区域样式
 * 根据布局模式和侧边栏状态计算宽度
 * 
 * @returns {ComputedRef<{ sidebarAndExtraWidth: string, width: string }>} - 主内容区域样式
 */
const mainStyle = computed(() => {
  let width = '100%';
  let sidebarAndExtraWidth = 'unset';
  
  if (
    headerFixed.value &&
    currentLayout.value !== 'header-nav' &&
    currentLayout.value !== 'mixed-nav' &&
    currentLayout.value !== 'header-sidebar-nav' &&
    showSidebar.value &&
    !isMobileState.value
  ) {
    // 固定模式下生效
    const isSideNavEffective =
      (isSidebarMixedNav.value || isHeaderMixedNav.value) &&
      sidebarExpandOnHover.value &&
      sidebarExtraVisible.value;

    if (isSideNavEffective) {
      const sideCollapseWidth = sidebarCollapse.value
        ? getSideCollapseWidth.value
        : props.sidebarMixedWidth;
      const sideWidth = sidebarExtraCollapse.value
        ? props.sidebarExtraCollapsedWidth
        : props.sidebarWidth;

      // 100% - 侧边菜单混合宽度 - 菜单宽度
      sidebarAndExtraWidth = `${sideCollapseWidth + sideWidth}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    } else {
      sidebarAndExtraWidth =
        sidebarExpandOnHovering.value && !sidebarExpandOnHover.value
          ? `${getSideCollapseWidth.value}px`
          : `${getSidebarWidth.value}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    }
  }
  
  return {
    sidebarAndExtraWidth,
    width,
  };
});

/**
 * 计算属性：标签栏样式
 * 根据布局模式和侧边栏状态计算标签栏的位置和宽度
 * 
 * @returns {ComputedRef<CSSProperties>} - 标签栏样式
 */
const tabbarStyle = computed((): CSSProperties => {
  let width = '';
  let marginInlineStart = 0;

  // 如果不是混合导航，标签栏的宽度为 100%
  if (!isMixedNav.value || props.sidebarHidden) {
    width = '100%';
  } else if (sidebarEnable.value) {
    // 鼠标在侧边栏上时，且侧边栏展开时的宽度
    const onHoveringWidth = sidebarExpandOnHover.value
      ? props.sidebarWidth
      : getSideCollapseWidth.value;

    // 设置 marginInlineStart，根据侧边栏是否折叠来决定
    marginInlineStart = sidebarCollapse.value
      ? getSideCollapseWidth.value
      : onHoveringWidth;

    // 设置标签栏的宽度，计算方式为 100% 减去侧边栏的宽度
    width = `calc(100% - ${sidebarCollapse.value ? getSidebarWidth.value : onHoveringWidth}px)`;
  } else {
    // 默认情况下，标签栏的宽度为 100%
    width = '100%';
  }

  return {
    marginInlineStart: `${marginInlineStart}px`,
    inlineSize: width,
  };
});

/**
 * 计算属性：内容区域样式
 * 根据头部和底部状态设置内容区域的边距
 * 
 * @returns {ComputedRef<CSSProperties>} - 内容区域样式
 */
const contentStyle = computed((): CSSProperties => {
  const fixed = headerFixed.value;
  const { footerEnable, footerFixed, footerHeight } = props;
  
  return {
    marginBlockStart:
      fixed &&
      !isFullContent.value &&
      !headerIsHidden.value &&
      (!isHeaderAutoMode.value || scrollY.value < headerWrapperHeight.value)
        ? `${headerWrapperHeight.value}px`
        : 0,
    paddingBlockEnd: `${footerEnable && footerFixed ? footerHeight : 0}px`,
  };
});

/**
 * 计算属性：头部区域层级
 * 根据布局模式和基础层级计算头部的 z-index
 * 
 * @returns {ComputedRef<number>} - 头部区域层级
 */
const headerZIndex = computed(() => {
  const { zIndex } = props;
  const offset = isMixedNav.value ? 1 : 0;
  return zIndex + offset;
});

/**
 * 计算属性：头部包装器样式
 * 控制头部区域的定位、尺寸和显示状态
 * 
 * @returns {ComputedRef<CSSProperties>} - 头部包装器样式
 */
const headerWrapperStyle = computed((): CSSProperties => {
  const fixed = headerFixed.value;
  
  return {
    blockSize: isFullContent.value ? '0' : `${headerWrapperHeight.value}px`,
    insetInlineStart: isMixedNav.value ? 0 : mainStyle.value.sidebarAndExtraWidth,
    position: fixed ? 'fixed' : 'static',
    insetBlockStart:
      headerIsHidden.value || isFullContent.value
        ? `-${headerWrapperHeight.value}px`
        : 0,
    inlineSize: mainStyle.value.width,
    zIndex: headerZIndex.value,
  };
});

/**
 * 计算属性：侧边栏层级
 * 根据设备类型和布局模式计算侧边栏的 z-index
 * 
 * @returns {ComputedRef<number>} - 侧边栏层级
 */
const sidebarZIndex = computed(() => {
  const { isMobile, zIndex } = props;
  let offset = isMobile || isSideMode.value ? 1 : -1;

  if (isMixedNav.value) {
    offset += 1;
  }

  return zIndex + offset;
});

/**
 * 计算属性：底部区域宽度
 * 根据是否固定定位计算底部区域的宽度
 * 
 * @returns {ComputedRef<string>} - 底部区域宽度
 */
const footerWidth = computed(() => {
  if (!props.footerFixed) {
    return '100%';
  }

  return mainStyle.value.width;
});

/**
 * 计算属性：遮罩样式
 * 设置遮罩的层级
 * 
 * @returns {ComputedRef<CSSProperties>} - 遮罩样式
 */
const maskStyle = computed((): CSSProperties => ({
  zIndex: props.zIndex,
}));

/**
 * 计算属性：是否显示头部切换按钮
 * 根据设备类型和布局模式决定
 * 
 * @returns {ComputedRef<boolean>} - 是否显示头部切换按钮
 */
const showHeaderToggleButton = computed(() => {
  return (
    isMobileState.value ||
    (props.headerToggleSidebarButton &&
      isSideMode.value &&
      !isSidebarMixedNav.value &&
      !isMixedNav.value &&
      !isMobileState.value)
  );
});

/**
 * 计算属性：是否在头部显示 Logo
 * 根据布局模式和设备类型决定
 * 
 * @returns {ComputedRef<boolean>} - 是否在头部显示 Logo
 */
const showHeaderLogo = computed(() => {
  return !isSideMode.value || isMixedNav.value || isMobileState.value;
});

/**
 * 监听设备类型变化，自动折叠侧边栏
 * 当切换到移动端时，自动折叠侧边栏以优化移动端体验
 */
watch(
  () => isMobileState.value,
  (val) => {
    if (val) {
      sidebarCollapse.value = true;
    }
  },
  {
    immediate: true,
  },
);

/**
 * 监听头部高度变化，更新全局头部高度
 * 确保其他组件能够正确计算布局
 */
watch(
  [() => headerWrapperHeight.value, () => isFullContent.value],
  ([height]) => {
    setLayoutHeaderHeight(isFullContent.value ? 0 : height);
  },
  {
    immediate: true,
  },
);

/**
 * 监听底部高度变化，更新全局底部高度
 * 确保其他组件能够正确计算布局
 */
watch(
  () => props.footerHeight,
  (height: number) => {
    setLayoutFooterHeight(height);
  },
  {
    immediate: true,
  },
);

/**
 * 头部自动隐藏逻辑：基于鼠标位置
 *
 * 优化：仅在 headerMode === 'auto' 且允许时才订阅 mouseY 变化，避免无效 watch 常驻
 */
watchEffect((onCleanup) => {
  const enabled = props.headerMode === 'auto' && !isMixedNav.value && !isFullContent.value;
  if (!enabled) {
    // 非 auto 模式：确保不隐藏（auto-scroll 由另一个分支处理）
    if (props.headerMode !== 'auto-scroll') headerIsHidden.value = false;
    return;
  }

  // auto 模式：鼠标在 header 之下时隐藏，否则显示
  headerIsHidden.value = true;
  const stop = watch(
    () => mouseY.value,
    () => {
      headerIsHidden.value = mouseY.value > headerWrapperHeight.value;
    },
    { immediate: true },
  );
  onCleanup(stop);
});

/**
 * 头部自动隐藏逻辑：基于滚动位置
 *
 * 优化：仅在 headerMode === 'auto-scroll' 且允许时才订阅 scrollY 变化
 */
watchEffect((onCleanup) => {
  const enabled =
    props.headerMode === 'auto-scroll' && !isMixedNav.value && !isFullContent.value;
  if (!enabled) return;

  const checkHeaderIsHidden = useThrottleFn((top, bottom, topArrived) => {
    if (scrollY.value < headerWrapperHeight.value) {
      headerIsHidden.value = false;
      return;
    }
    if (topArrived) {
      headerIsHidden.value = false;
      return;
    }

    if (top) headerIsHidden.value = false;
    else if (bottom) headerIsHidden.value = true;
  }, 300);

  const stop = watch(
    () => scrollY.value,
    () => {
      if (!isScrolling.value) return;
      checkHeaderIsHidden(directions.top, directions.bottom, arrivedState.top);
    },
  );
  onCleanup(stop);
});

/**
 * 点击遮罩处理函数
 * 在移动端点击遮罩时折叠侧边栏
 */
function handleClickMask() {
  sidebarCollapse.value = true;
}

/**
 * 头部切换按钮点击处理函数
 * 根据设备类型执行不同的切换逻辑
 */
function handleHeaderToggle() {
  if (isMobileState.value) {
    sidebarCollapse.value = false;
  } else {
    emit('toggleSidebar');
  }
}

/**
 * 主内容区域的元素 ID
 * 用于页面锚点定位和样式应用
 */
const idMainContent = ELEMENT_IDS.MAIN_CONTENT;
</script>

<template>
  <!-- 
    布局主容器
    使用 Flex 布局，确保子元素正确排列
    
    @class {string} relative flex min-h-full w-full - 基础布局样式
  -->
  <div class="relative flex min-h-full w-full">
    <!-- 
      侧边栏组件
      根据布局模式显示不同的侧边栏变体
      
      @v-if {boolean} sidebarEnableState - 是否启用侧边栏
      @v-model:collapse {boolean} sidebarCollapse - 侧边栏折叠状态双向绑定
      @v-model:expand-on-hover {boolean} sidebarExpandOnHover - 悬停展开模式双向绑定
      @v-model:expand-on-hovering {boolean} sidebarExpandOnHovering - 悬停展开状态双向绑定
      @v-model:extra-collapse {boolean} sidebarExtraCollapse - 扩展区域折叠状态双向绑定
      @v-model:extra-visible {boolean} sidebarExtraVisible - 扩展区域可见性双向绑定
      @prop {boolean} show-collapse-button - 是否显示折叠按钮
      @prop {boolean} show-fixed-button - 是否显示固定按钮
      @prop {number} collapse-width - 折叠宽度
      @prop {boolean} dom-visible - 隐藏的DOM元素是否可见
      @prop {number} extra-width - 扩展区域宽度
      @prop {boolean} fixed-extra - 是否固定扩展区域
      @prop {number} header-height - 头部高度
      @prop {boolean} is-sidebar-mixed - 是否为侧边混合模式
      @prop {number} margin-top - 顶部边距
      @prop {number} mixed-width - 混合模式宽度
      @prop {boolean} show - 是否显示侧边栏
      @prop {string} theme - 主题样式
      @prop {number} width - 侧边栏宽度
      @prop {number} z-index - 侧边栏层级
      @event {Function} leave - 鼠标离开事件
    -->
    <LayoutSidebar
      v-if="sidebarEnableState"
      v-model:collapse="sidebarCollapse"
      v-model:expand-on-hover="sidebarExpandOnHover"
      v-model:expand-on-hovering="sidebarExpandOnHovering"
      v-model:extra-collapse="sidebarExtraCollapse"
      v-model:extra-visible="sidebarExtraVisible"
      :show-collapse-button="sidebarCollapsedButton"
      :show-fixed-button="sidebarFixedButton"
      :collapse-width="getSideCollapseWidth"
      :dom-visible="!isMobile"
      :extra-width="sidebarExtraWidth"
      :fixed-extra="sidebarExpandOnHover"
      :header-height="isMixedNav ? 0 : (headerHeight ?? 50)"
      :is-sidebar-mixed="isSidebarMixedNav || isHeaderMixedNav"
      :margin-top="sidebarMarginTop ?? 0"
      :mixed-width="sidebarMixedWidth ?? 80"
      :show="showSidebar"
      :theme="sidebarTheme"
      :width="getSidebarWidth ?? 180"
      :z-index="sidebarZIndex ?? 200"
      @leave="() => emit('sideMouseLeave')"
    >
      <!-- 
        侧边栏 Logo 插槽
        在侧边栏模式下显示（非混合导航）
        
        @slot logo - 侧边栏 Logo 区域
      -->
      <template v-if="isSideMode && !isMixedNav" #logo>
        <slot name="logo" />
      </template>

      <!-- 
        混合菜单插槽
        在侧边混合导航或头部混合导航模式下显示
        
        @slot mixed-menu - 混合模式菜单内容
      -->
      <template v-if="isSidebarMixedNav || isHeaderMixedNav" #mixed-menu>
        <slot name="mixed-menu" />
      </template>
      
      <!-- 
        普通菜单插槽
        在其他侧边栏模式下显示
        
        @slot menu - 普通菜单内容
      -->
      <template v-else #menu>
        <slot name="menu" />
      </template>

      <!-- 
        侧边扩展区域插槽
        用于显示侧边栏的扩展内容
        
        @slot side-extra - 侧边扩展区域内容
      -->
      <template #extra>
        <slot name="side-extra" />
      </template>
      
      <!-- 
        侧边扩展区域标题插槽
        用于显示侧边栏扩展区域的标题
        
        @slot side-extra-title - 侧边扩展区域标题
      -->
      <template #extra-title>
        <slot name="side-extra-title" />
      </template>
    </LayoutSidebar>

    <!-- 
      主内容区域容器
      包含头部、内容、底部等主要区域
      
      @ref {Ref<HTMLElement>} contentRef - 内容区域模板引用
      @class {string} flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in - 基础样式
    -->
    <div
      ref="contentRef"
      class="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in"
    >
      <!-- 
        头部包装器
        包含头部和标签栏，支持固定定位和阴影效果
        
        @style {CSSProperties} headerWrapperStyle - 动态计算的头部包装器样式
        @class {Array} 动态类名 - 根据滚动位置添加阴影效果
        @class {string} SCROLL_FIXED_CLASS - 滚动固定类名
        @class {string} overflow-hidden transition-all duration-200 - 基础样式类
      -->
      <div
        :class="[
          {
            'shadow-[0_16px_24px_hsl(var(--background))]': scrollY > 20,
          },
          SCROLL_FIXED_CLASS,
        ]"
        :style="headerWrapperStyle"
        class="overflow-hidden transition-all duration-200"
      >
        <!-- 
          头部组件
          显示页面头部，包含 Logo、切换按钮和头部内容
          
          @v-if {boolean} headerVisible - 是否显示头部
          @prop {boolean} full-width - 是否为全宽度
          @prop {number} height - 头部高度
          @prop {boolean} is-mobile - 是否为移动端
          @prop {boolean} show - 是否显示头部
          @prop {number} sidebar-width - 侧边栏宽度
          @prop {string} theme - 头部主题
          @prop {string} width - 头部宽度
          @prop {number} z-index - 头部层级
        -->
        <LayoutHeader
          v-if="headerVisible"
          :full-width="!isSideMode"
          :height="headerHeight ?? 50"
          :is-mobile="isMobile ?? false"
          :show="!isFullContent && !headerHidden"
          :sidebar-width="sidebarWidth ?? 180"
          :theme="headerTheme"
          :width="mainStyle.width"
          :z-index="headerZIndex"
        >
          <!-- 
            头部 Logo 插槽
            在特定条件下显示 Logo
            
            @slot logo - 头部 Logo 区域
          -->
          <template v-if="showHeaderLogo" #logo>
            <slot name="logo" />
          </template>

          <!-- 
            切换按钮插槽
            显示侧边栏切换按钮
            
            @slot toggle-button - 切换按钮区域
          -->
          <template #toggle-button>
            <AdminIconButton
              v-if="showHeaderToggleButton"
              class="my-0 mr-1 rounded-md"
              @click="handleHeaderToggle"
            >
              <IconifyIcon v-if="showSidebar" icon="ep:fold" />
              <IconifyIcon v-else icon="ep:expand" />
            </AdminIconButton>
          </template>
          
          <!-- 
            头部内容插槽
            显示头部的主要内容
            
            @slot header - 头部内容区域
          -->
          <slot name="header" />
        </LayoutHeader>

        <!-- 
          标签栏组件
          显示页面标签导航
          
          @v-if {boolean} tabbarEnable - 是否启用标签栏
          @prop {number} height - 标签栏高度
          @style {CSSProperties} tabbarStyle - 动态计算的标签栏样式
          
          @slot tabbar - 标签栏内容
        -->
        <LayoutTabbar
          v-if="tabbarEnable"
          :height="tabbarHeight ?? 40"
          :style="tabbarStyle"
        >
          <slot name="tabbar" />
        </LayoutTabbar>
      </div>

      <!-- 
        内容区域组件
        显示页面的主要内容
        
        @id {string} idMainContent - 内容区域元素 ID
        @prop {string} content-compact - 内容紧凑模式
        @prop {number} content-compact-width - 内容紧凑宽度
        @prop {number} padding - 内容内边距
        @prop {number} padding-bottom - 内容底部内边距
        @prop {number} padding-left - 内容左侧内边距
        @prop {number} padding-right - 内容右侧内边距
        @prop {number} padding-top - 内容顶部内边距
        @style {CSSProperties} contentStyle - 动态计算的内容区域样式
        @class {string} transition-[margin-top] duration-200 - 过渡动画样式
        
        @slot content - 主要内容区域
        @slot content-overlay - 内容覆盖层区域
      -->
      <LayoutContent
        :id="idMainContent"
        :content-compact="contentCompact ?? 'wide'"
        :content-compact-width="contentCompactWidth ?? 1200"
        :padding="contentPadding ?? 0"
        :padding-bottom="contentPaddingBottom ?? 0"
        :padding-left="contentPaddingLeft ?? 0"
        :padding-right="contentPaddingRight ?? 0"
        :padding-top="contentPaddingTop ?? 0"
        :style="contentStyle"
        class="transition-[margin-top] duration-200"
      >
        <slot name="content" />

        <template #overlay>
          <slot name="content-overlay" />
        </template>
      </LayoutContent>

      <!-- 
        底部组件
        显示页面底部内容
        
        @v-if {boolean} footerEnable - 是否启用底部
        @prop {boolean} fixed - 是否固定底部
        @prop {number} height - 底部高度
        @prop {boolean} show - 是否显示底部
        @prop {string} width - 底部宽度
        @prop {number} z-index - 底部层级
        
        @slot footer - 底部内容区域
      -->
      <LayoutFooter
        v-if="footerEnable"
        :fixed="footerFixed ?? false"
        :height="footerHeight ?? 32"
        :show="!isFullContent"
        :width="footerWidth"
        :z-index="zIndex ?? 200"
      >
        <slot name="footer" />
      </LayoutFooter>
    </div>
    
    <!-- 
      额外内容插槽
      用于显示布局之外的自定义内容
      
      @slot extra - 额外内容区域
    -->
    <slot name="extra" />
    
    <!-- 
      遮罩层
      在移动端侧边栏展开时显示，点击可关闭侧边栏
      
      @v-if {boolean} maskVisible - 遮罩是否可见
      @style {CSSProperties} maskStyle - 遮罩样式
      @class {string} fixed left-0 top-0 h-full w-full bg-overlay transition-[background-color] duration-200 - 遮罩基础样式
      @event {Function} click - 点击事件
    -->
    <div
      v-if="maskVisible"
      :style="maskStyle"
      class="fixed left-0 top-0 h-full w-full bg-overlay transition-[background-color] duration-200"
      @click="handleClickMask"
    />
  </div>
</template>