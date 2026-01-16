import type { LayoutType } from '@admin-core/shared/types';

import type { AdminLayoutProps } from '../admin-layout';

import { computed } from 'vue';

// 导入配置
import { 
  getLayoutConfig,
  isLayoutMobileSupported,
  LAYOUT_CONFIGS,
  DEFAULT_LAYOUT_OPTIONS,
  type LayoutConfig 
} from '../config';

/**
 * 布局系统组合式函数
 * 根据设备类型和布局配置计算当前布局模式和状态
 * 
 * @param props - 布局组件的属性
 * @param props.layout - 布局类型配置
 * @param props.isMobile - 是否为移动设备
 * @returns 包含布局计算结果的响应式对象
 */
export function useLayout(props: AdminLayoutProps) {
  /**
   * 计算当前布局模式
   * 根据设备类型和配置自动选择合适的布局
   * 
   * @returns {ComputedRef<LayoutType>} - 当前布局模式的响应式计算属性
   */
   const currentLayout = computed<LayoutType>(() => {
    if (props.isMobile) {
      return DEFAULT_LAYOUT_OPTIONS.mobileDefaultLayout;
    }
    
    // 确保 layout 不为 undefined，使用配置中的默认布局作为后备
    return props.layout ?? DEFAULT_LAYOUT_OPTIONS.defaultLayout;
  });

  /**
   * 获取当前布局的配置信息
   * 
   * @returns {ComputedRef<LayoutConfig>} - 当前布局的配置信息
   */
  const currentLayoutConfig = computed<LayoutConfig>(() => 
    getLayoutConfig(currentLayout.value)
  );

  /**
   * 是否为全屏内容布局
   */
  const isFullContent = computed(() => 
    currentLayout.value === 'full-content'
  );

  /**
   * 是否为侧边混合导航模式
   */
  const isSidebarMixedNav = computed(() => 
    currentLayout.value === 'sidebar-mixed-nav'
  );

  /**
   * 是否为头部导航模式
   */
  const isHeaderNav = computed(() => 
    currentLayout.value === 'header-nav'
  );

  /**
   * 是否为混合导航模式
   */
  const isMixedNav = computed(() => 
    currentLayout.value === 'mixed-nav' || 
    currentLayout.value === 'header-sidebar-nav'
  );

  /**
   * 是否为头部混合导航模式
   */
  const isHeaderMixedNav = computed(() => 
    currentLayout.value === 'header-mixed-nav'
  );

  /**
   * 是否为侧边导航模式
   */
  const isSidebarNav = computed(() => 
    currentLayout.value === 'sidebar-nav'
  );

  /**
   * 是否为双栏布局
   */
  const isTwoColumnLayout = computed(() => 
    isSidebarNav.value || isSidebarMixedNav.value
  );

  /**
   * 是否为顶部导航布局
   */
  const isTopNavigation = computed(() => 
    isHeaderNav.value || isHeaderMixedNav.value
  );

  /**
   * 是否显示侧边栏
   */
  const showSidebar = computed(() => 
    !isFullContent.value && !isHeaderNav.value
  );

  /**
   * 是否显示头部区域
   */
  const showHeader = computed(() => 
    !isFullContent.value
  );

  return {
    // 布局模式
    currentLayout,
    currentLayoutConfig,
    
    // 布局类型判断
    isFullContent,
    isSidebarMixedNav,
    isHeaderNav,
    isMixedNav,
    isHeaderMixedNav,
    isSidebarNav,
    isTwoColumnLayout,
    isTopNavigation,
    
    // 组件可见性
    showSidebar,
    showHeader,
    
    // 工具方法
    /**
     * 检查给定的布局类型是否为当前布局
     */
    isLayout: (layout: LayoutType) => currentLayout.value === layout,
    
    /**
     * 检查给定的布局类型之一是否为当前布局
     */
    isOneOfLayouts: (...layouts: LayoutType[]) => 
      layouts.includes(currentLayout.value),
    
    /**
     * 检查当前布局是否支持移动端
     */
    isMobileSupported: () => isLayoutMobileSupported(currentLayout.value),
    
    /**
     * 获取所有布局配置
     */
    getAllLayoutConfigs: () => Object.values(LAYOUT_CONFIGS),
  };
}