/**
 * 布局模块导出配置
 * 这个文件专门处理所有导出逻辑，确保正确的命名导出和类型安全
 * 遵循主流组件库的导出模式，支持按需导入和完整导入
 */

// 导入组件
import type { App, Plugin } from 'vue';
import AdminLayout from './admin-layout.vue';
import type { AdminLayoutProps } from './admin-layout';

// 导入子组件
import LayoutContent from './components/layout-content.vue';
import LayoutFooter from './components/layout-footer.vue';
import LayoutHeader from './components/layout-header.vue';
import LayoutSidebar from './components/layout-sidebar.vue';
import LayoutTabbar from './components/layout-tabbar.vue';

// 导入配置和工具
import type { 
  LayoutConfig,
  LayoutSystemOptions,
  LayoutBreakpoints,
  LayoutDimensions,
  LayoutThemeConfig,
} from './config';
import { 
  LAYOUT_CONFIGS,
  DEFAULT_LAYOUT_OPTIONS,
  DEFAULT_BREAKPOINTS,
  DEFAULT_DIMENSIONS,
  DEFAULT_THEME_CONFIG,
  getLayoutConfig,
  isLayoutMobileSupported,
  getMobileSupportedLayouts,
  getAllLayoutConfigs,
  searchLayoutConfigs,
  getRecommendedLayouts,
  createLayoutConfig,
  validateLayoutConfig,
  LayoutUtils,
} from './config';
import { useLayout } from './hooks/use-layout';

// 组件注册名常量（避免组件 name 在构建/压缩/包装后不稳定导致全局注册名漂移）
const COMPONENT_NAMES = {
  AdminLayout: 'AdminLayout',
  LayoutContent: 'LayoutContent',
  LayoutFooter: 'LayoutFooter',
  LayoutHeader: 'LayoutHeader',
  LayoutSidebar: 'LayoutSidebar',
  LayoutTabbar: 'LayoutTabbar',
} as const;

// 定义插件安装方法
function install(app: App): void {
  app.component(COMPONENT_NAMES.AdminLayout, AdminLayout);
  app.component(COMPONENT_NAMES.LayoutContent, LayoutContent);
  app.component(COMPONENT_NAMES.LayoutFooter, LayoutFooter);
  app.component(COMPONENT_NAMES.LayoutHeader, LayoutHeader);
  app.component(COMPONENT_NAMES.LayoutSidebar, LayoutSidebar);
  app.component(COMPONENT_NAMES.LayoutTabbar, LayoutTabbar);
}

/**
 * 插件导出（推荐）
 * 支持：app.use(Layouts)
 */
const Layouts: Plugin = { install };

/**
 * 兼容主流组件库用法：给主组件挂载 install
 * 支持：app.use(AdminLayout)
 */
(AdminLayout as any).install = install;

// 重新导出所有内容（确保命名导出）
export {
  // 主组件
  AdminLayout,
  
  // 子组件
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSidebar,
  LayoutTabbar,

  // 便捷别名导出（更贴近布局语义，便于模板里直观使用）
  LayoutContent as Content,
  LayoutFooter as Footer,
  LayoutHeader as Header,
  LayoutSidebar as Sidebar,
  LayoutTabbar as Tabbar,
  
  // 工具函数
  useLayout,
  
  // 配置相关值
  LAYOUT_CONFIGS,
  DEFAULT_LAYOUT_OPTIONS,
  DEFAULT_BREAKPOINTS,
  DEFAULT_DIMENSIONS,
  DEFAULT_THEME_CONFIG,
  getLayoutConfig,
  isLayoutMobileSupported,
  getMobileSupportedLayouts,
  getAllLayoutConfigs,
  searchLayoutConfigs,
  getRecommendedLayouts,
  createLayoutConfig,
  validateLayoutConfig,
  LayoutUtils,
  
  // 插件安装方法
  install,
  Layouts,
  COMPONENT_NAMES,
};

// 导出类型
export type { 
  AdminLayoutProps, 
  LayoutConfig,
  LayoutSystemOptions,
  LayoutBreakpoints,
  LayoutDimensions,
  LayoutThemeConfig,
};

// 默认导出（主组件）
export default AdminLayout;