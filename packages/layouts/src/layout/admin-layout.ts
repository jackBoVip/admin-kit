import type {
  ContentCompactType,
  LayoutHeaderModeType,
  LayoutType,
  ThemeModeType,
} from '@admin-core/shared/types';

interface AdminLayoutProps {
  /**
   * 内容区域定宽
   * @default 'wide'
   */
  contentCompact?: ContentCompactType | undefined;
  /**
   * 定宽布局宽度
   * @default 1200
   */
  contentCompactWidth?: number | undefined;
  /**
   * padding
   * @default 16
   */
  contentPadding?: number | undefined;
  /**
   * paddingBottom
   * @default 16
   */
  contentPaddingBottom?: number | undefined;
  /**
   * paddingLeft
   * @default 16
   */
  contentPaddingLeft?: number | undefined;
  /**
   * paddingRight
   * @default 16
   */
  contentPaddingRight?: number | undefined;
  /**
   * paddingTop
   * @default 16
   */
  contentPaddingTop?: number | undefined;
  /**
   * footer 是否可见
   * @default false
   */
  footerEnable?: boolean | undefined;
  /**
   * footer 是否固定
   * @default true
   */
  footerFixed?: boolean | undefined;
  /**
   * footer 高度
   * @default 32
   */
  footerHeight?: number | undefined;

  /**
   * header高度
   * @default 48
   */
  headerHeight?: number | undefined;
  /**
   * 顶栏是否隐藏
   * @default false
   */
  headerHidden?: boolean | undefined;
  /**
   * header 显示模式
   * @default 'fixed'
   */
  headerMode?: LayoutHeaderModeType | undefined;
  /**
   * header 顶栏主题
   */
  headerTheme?: ThemeModeType | undefined;
  /**
   * 是否显示header切换侧边栏按钮
   * @default
   */
  headerToggleSidebarButton?: boolean | undefined;
  /**
   * header是否显示
   * @default true
   */
  headerVisible?: boolean | undefined;
  /**
   * 是否移动端显示
   * @default false
   */
  isMobile?: boolean | undefined;
  /**
   * 布局方式
   * sidebar-nav 侧边菜单布局
   * header-nav 顶部菜单布局
   * mixed-nav 侧边&顶部菜单布局
   * sidebar-mixed-nav 侧边混合菜单布局
   * full-content 全屏内容布局
   * @default sidebar-nav
   */
  layout?: LayoutType | undefined;
  /**
   * 侧边菜单折叠状态
   * @default false
   */
  sidebarCollapse?: boolean | undefined;
  /**
   * 侧边菜单折叠按钮
   * @default true
   */
  sidebarCollapsedButton?: boolean | undefined;
  /**
   * 侧边菜单是否折叠时，是否显示title
   * @default true
   */
  sidebarCollapseShowTitle?: boolean | undefined;
  /**
   * 侧边栏是否可见
   * @default true
   */
  sidebarEnable?: boolean | undefined;
  /**
   * 侧边菜单折叠额外宽度
   * @default 48
   */
  sidebarExtraCollapsedWidth?: number | undefined;
  /**
   * 侧边菜单折叠按钮是否固定
   * @default true
   */
  sidebarFixedButton?: boolean | undefined;
  /**
   * 侧边栏是否隐藏
   * @default false
   */
  sidebarHidden?: boolean | undefined;
  /**
   * 混合侧边栏宽度
   * @default 80
   */
  sidebarMixedWidth?: number | undefined;
  /**
   * 侧边栏
   * @default dark
   */
  sidebarTheme?: ThemeModeType | undefined;
  /**
   * 侧边栏宽度
   * @default 210
   */
  sidebarWidth?: number | undefined;
  /**
   *  侧边菜单折叠宽度
   * @default 48
   */
  sideCollapseWidth?: number | undefined;
  /**
   * tab是否可见
   * @default true
   */
  tabbarEnable?: boolean | undefined;
  /**
   * tab高度
   * @default 30
   */
  tabbarHeight?: number | undefined;
  /**
   * zIndex
   * @default 100
   */
  zIndex?: number | undefined;

  /**
   * 滚动监听目标（用于 headerMode === 'auto-scroll' 等场景）
   *
   * @description
   * - 默认使用 `document`
   * - 在某些应用中实际滚动容器是某个内容区域，可通过该参数传入更精确的滚动容器
   */
  scrollTarget?: Document | Window | HTMLElement | null | undefined;
}
export type { AdminLayoutProps };
