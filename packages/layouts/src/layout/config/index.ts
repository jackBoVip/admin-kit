import type { LayoutType } from '@admin-core/shared/types';

/**
 * 布局配置类型定义
 * 为不同的布局模式提供类型安全的配置选项
 */
export interface LayoutConfig {
  /** 布局模式标识 */
  readonly mode: LayoutType;
  
  /** 布局名称（用于显示） */
  readonly name: string;
  
  /** 布局描述 */
  readonly description: string;
  
  /** 是否支持移动端 */
  readonly mobileSupported: boolean;
  
  /** 建议的使用场景 */
  readonly recommendedFor: string[];
  
  /** 布局特点 */
  readonly features: string[];
  
  /** 布局图标标识（可选） */
  readonly icon?: string;
  
  /** CSS 类名前缀（可选） */
  readonly cssClass?: string;
  
  /** 是否默认开启响应式（可选） */
  readonly responsiveByDefault?: boolean;
}

/**
 * 预定义的布局配置
 * 为每种布局类型提供详细的配置信息
 */
export const LAYOUT_CONFIGS: Readonly<Record<LayoutType, LayoutConfig>> = {
  'full-content': {
    mode: 'full-content',
    name: '全屏内容布局',
    description: '专注于内容的布局模式，移除了所有导航和装饰元素，适用于仪表板、编辑器等需要最大化内容区域的场景',
    mobileSupported: true,
    recommendedFor: ['仪表板', '代码编辑器', '设计工具', '演示模式'],
    features: ['无侧边栏', '无头部导航', '无底部栏', '无标签栏', '最大化内容区域'],
    icon: 'fullscreen',
    cssClass: 'layout-full-content',
    responsiveByDefault: true,
  },
  'sidebar-nav': {
    mode: 'sidebar-nav',
    name: '侧边导航布局',
    description: '经典的侧边导航布局，导航菜单位于左侧，适合大多数后台管理系统',
    mobileSupported: true,
    recommendedFor: ['后台管理系统', '企业应用', '多级菜单应用'],
    features: ['左侧导航菜单', '可折叠侧边栏', '移动端适配', '面包屑导航'],
    icon: 'sidebar',
    cssClass: 'layout-sidebar-nav',
    responsiveByDefault: true,
  },
  'sidebar-mixed-nav': {
    mode: 'sidebar-mixed-nav',
    name: '侧边混合导航布局',
    description: '增强的侧边导航布局，支持主侧边栏和扩展面板，适合复杂的功能集合',
    mobileSupported: false,
    recommendedFor: ['复杂业务系统', '多模块应用', '需要扩展面板的应用'],
    features: ['主侧边栏', '扩展面板', '悬停展开', '多级导航'],
    icon: 'sidebar-split',
    cssClass: 'layout-sidebar-mixed-nav',
    responsiveByDefault: false,
  },
  'header-nav': {
    mode: 'header-nav',
    name: '头部导航布局',
    description: '顶部导航布局，所有导航项位于页面顶部，适合内容优先的网站或简单应用',
    mobileSupported: true,
    recommendedFor: ['内容网站', '博客后台', '简单应用', '移动端优先'],
    features: ['顶部导航栏', '响应式菜单', '简洁布局', '移动端友好'],
    icon: 'header',
    cssClass: 'layout-header-nav',
    responsiveByDefault: true,
  },
  'mixed-nav': {
    mode: 'mixed-nav',
    name: '混合导航布局',
    description: '结合顶部导航和侧边栏的混合布局，提供更灵活的导航结构',
    mobileSupported: false,
    recommendedFor: ['复杂应用', '需要多层级导航的系统', '大型管理后台'],
    features: ['顶部主导航', '左侧辅助导航', '多层级结构', '灵活的布局'],
    icon: 'layout-mixed',
    cssClass: 'layout-mixed-nav',
    responsiveByDefault: false,
  },
  'header-sidebar-nav': {
    mode: 'header-sidebar-nav',
    name: '头部+侧边导航布局',
    description: '同时包含顶部导航和完整侧边栏的布局，适合需要大量导航项的应用',
    mobileSupported: false,
    recommendedFor: ['大型企业应用', '多部门系统', '需要大量菜单项的应用'],
    features: ['顶部一级导航', '左侧二级导航', '面包屑导航', '多层级菜单'],
    icon: 'layout-header-sidebar',
    cssClass: 'layout-header-sidebar-nav',
    responsiveByDefault: false,
  },
  'header-mixed-nav': {
    mode: 'header-mixed-nav',
    name: '头部混合导航布局',
    description: '顶部导航与侧边混合导航的结合，提供最丰富的导航选项',
    mobileSupported: false,
    recommendedFor: ['超大型系统', '平台型应用', '需要极致导航能力的场景'],
    features: ['顶部主导航', '侧边混合导航', '扩展面板', '多维度导航'],
    icon: 'layout-header-mixed',
    cssClass: 'layout-header-mixed-nav',
    responsiveByDefault: false,
  },
} as const;

/**
 * 布局系统配置接口
 * 用于全局布局系统的配置选项
 */
export interface LayoutSystemOptions {
  /** 默认布局类型 */
  readonly defaultLayout: LayoutType;
  
  /** 移动端默认布局类型 */
  readonly mobileDefaultLayout: LayoutType;
  
  /** 是否允许动态切换布局 */
  readonly allowLayoutSwitching: boolean;
  
  /** 支持的布局类型列表 */
  readonly supportedLayouts: readonly LayoutType[];
  
  /** 布局切换时的过渡动画时长（毫秒） */
  readonly transitionDuration: number;
  
  /** 是否启用响应式设计 */
  readonly responsive: boolean;
  
  /** 移动端断点（像素） */
  readonly mobileBreakpoint: number;
  
  /** 平板断点（像素） */
  readonly tabletBreakpoint: number;
  
  /** 是否启用布局持久化（localStorage） */
  readonly persistLayout: boolean;
  
  /** 持久化键名 */
  readonly persistKey: string;
}

/**
 * 默认布局系统配置
 */
export const DEFAULT_LAYOUT_OPTIONS: Readonly<LayoutSystemOptions> = {
  defaultLayout: 'sidebar-nav',
  mobileDefaultLayout: 'sidebar-nav',
  allowLayoutSwitching: true,
  supportedLayouts: [
    'full-content',
    'sidebar-nav',
    'sidebar-mixed-nav',
    'header-nav',
    'mixed-nav',
    'header-sidebar-nav',
    'header-mixed-nav',
  ],
  transitionDuration: 300,
  responsive: true,
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  persistLayout: true,
  persistKey: 'admin-layout',
} as const;

/**
 * 布局断点配置接口
 */
export interface LayoutBreakpoints {
  /** 移动端断点（最大宽度） */
  readonly mobile: number;
  
  /** 平板断点（最小宽度，最大宽度） */
  readonly tablet: {
    readonly min: number;
    readonly max: number;
  };
  
  /** 桌面端断点（最小宽度） */
  readonly desktop: number;
  
  /** 大桌面端断点（最小宽度） */
  readonly largeDesktop: number;
}

/**
 * 默认布局断点配置
 */
export const DEFAULT_BREAKPOINTS: Readonly<LayoutBreakpoints> = {
  mobile: 768,
  tablet: {
    min: 769,
    max: 1024,
  },
  desktop: 1025,
  largeDesktop: 1440,
} as const;

/**
 * 布局组件尺寸配置接口
 */
export interface LayoutDimensions {
  /** 侧边栏宽度（像素） */
  readonly sidebarWidth: number;
  
  /** 侧边栏折叠宽度（像素） */
  readonly sidebarCollapsedWidth: number;
  
  /** 混合模式下侧边栏宽度（像素） */
  readonly mixedSidebarWidth: number;
  
  /** 头部高度（像素） */
  readonly headerHeight: number;
  
  /** 工具栏高度（像素） */
  readonly toolbarHeight: number;
  
  /** 底部栏高度（像素） */
  readonly footerHeight: number;
  
  /** 标签栏高度（像素） */
  readonly tabHeight: number;
}

/**
 * 默认布局尺寸配置
 */
export const DEFAULT_DIMENSIONS: Readonly<LayoutDimensions> = {
  sidebarWidth: 240,
  sidebarCollapsedWidth: 48,
  mixedSidebarWidth: 70,
  headerHeight: 64,
  toolbarHeight: 48,
  footerHeight: 60,
  tabHeight: 40,
} as const;

/**
 * 布局主题配置接口
 */
export interface LayoutThemeConfig {
  /** 默认主题 */
  readonly defaultTheme: string;
  
  /** 支持的主题列表 */
  readonly themes: readonly string[];
  
  /** 是否允许动态切换主题 */
  readonly allowThemeSwitching: boolean;
  
  /** 主题持久化键名 */
  readonly persistKey: string;
}

/**
 * 默认布局主题配置
 */
export const DEFAULT_THEME_CONFIG: Readonly<LayoutThemeConfig> = {
  defaultTheme: 'light',
  themes: ['light', 'dark', 'system'],
  allowThemeSwitching: true,
  persistKey: 'admin-theme',
} as const;

/**
 * 获取指定布局的配置信息
 * 
 * @param layout - 布局类型
 * @returns {LayoutConfig} - 布局配置对象
 * @throws {Error} - 当布局类型不存在时抛出错误
 */
export function getLayoutConfig(layout: LayoutType): LayoutConfig {
  const config = LAYOUT_CONFIGS[layout];
  
  if (!config) {
    throw new Error(`未知的布局类型: ${layout}`);
  }
  
  return config;
}

/**
 * 检查布局是否支持移动端
 * 
 * @param layout - 布局类型
 * @returns {boolean} - 是否支持移动端
 */
export function isLayoutMobileSupported(layout: LayoutType): boolean {
  return getLayoutConfig(layout).mobileSupported;
}

/**
 * 获取所有支持移动端的布局类型
 * 
 * @returns {LayoutType[]} - 支持移动端的布局类型数组
 */
export function getMobileSupportedLayouts(): LayoutType[] {
  return Object.values(LAYOUT_CONFIGS)
    .filter(config => config.mobileSupported)
    .map(config => config.mode);
}

/**
 * 获取所有布局配置
 * 
 * @returns {LayoutConfig[]} - 所有布局配置数组
 */
export function getAllLayoutConfigs(): LayoutConfig[] {
  return Object.values(LAYOUT_CONFIGS);
}

/**
 * 根据布局名称搜索布局配置
 * 
 * @param keyword - 搜索关键词
 * @returns {LayoutConfig[]} - 匹配的布局配置数组
 */
export function searchLayoutConfigs(keyword: string): LayoutConfig[] {
  const lowerKeyword = keyword.toLowerCase();
  
  return Object.values(LAYOUT_CONFIGS).filter(config => 
    config.name.toLowerCase().includes(lowerKeyword) ||
    config.description.toLowerCase().includes(lowerKeyword) ||
    config.features.some(feature => feature.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 获取推荐布局配置
 * 根据使用场景推荐合适的布局
 * 
 * @param scenario - 使用场景
 * @returns {LayoutConfig[]} - 推荐的布局配置数组
 */
export function getRecommendedLayouts(scenario: string): LayoutConfig[] {
  return Object.values(LAYOUT_CONFIGS).filter(config =>
    config.recommendedFor.some(recommended => 
      recommended.toLowerCase().includes(scenario.toLowerCase())
    )
  );
}

/**
 * 创建自定义布局配置
 * 
 * @param options - 自定义选项
 * @returns {Partial<LayoutSystemOptions>} - 自定义布局配置
 */
export function createLayoutConfig(
  options: Partial<LayoutSystemOptions>
): Partial<LayoutSystemOptions> {
  return {
    ...DEFAULT_LAYOUT_OPTIONS,
    ...options,
  };
}

/**
 * 验证布局配置的有效性
 * 
 * @param config - 布局配置
 * @returns {boolean} - 是否有效
 */
export function validateLayoutConfig(config: Partial<LayoutSystemOptions>): boolean {
  if (config.defaultLayout && !LAYOUT_CONFIGS[config.defaultLayout]) {
    return false;
  }
  
  if (config.mobileDefaultLayout && !LAYOUT_CONFIGS[config.mobileDefaultLayout]) {
    return false;
  }
  
  if (config.supportedLayouts) {
    const invalidLayout = config.supportedLayouts.find(
      layout => !LAYOUT_CONFIGS[layout]
    );
    if (invalidLayout) {
      return false;
    }
  }
  
  return true;
}

/**
 * 布局工具类
 * 提供布局相关的工具函数
 */
export class LayoutUtils {
  /**
   * 获取布局的CSS类名
   * 
   * @param layout - 布局类型
   * @returns {string} - CSS类名
   */
  static getLayoutClass(layout: LayoutType): string {
    return LAYOUT_CONFIGS[layout]?.cssClass || `layout-${layout}`;
  }
  
  /**
   * 获取布局图标
   * 
   * @param layout - 布局类型
   * @returns {string} - 图标名称或路径
   */
  static getLayoutIcon(layout: LayoutType): string {
    return LAYOUT_CONFIGS[layout]?.icon || 'layout';
  }
  
  /**
   * 检查是否为响应式布局
   * 
   * @param layout - 布局类型
   * @returns {boolean} - 是否为响应式布局
   */
  static isResponsiveLayout(layout: LayoutType): boolean {
    return LAYOUT_CONFIGS[layout]?.responsiveByDefault ?? false;
  }
  
  /**
   * 获取布局的简要描述
   * 
   * @param layout - 布局类型
   * @param maxLength - 最大长度
   * @returns {string} - 简要描述
   */
  static getLayoutSummary(layout: LayoutType, maxLength = 100): string {
    const description = LAYOUT_CONFIGS[layout]?.description || '';
    
    if (description.length <= maxLength) {
      return description;
    }
    
    return description.substring(0, maxLength) + '...';
  }
}