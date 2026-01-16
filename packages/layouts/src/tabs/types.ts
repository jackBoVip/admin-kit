import type { IContextMenuItem } from '@admin-core/ui';
import type { TabDefinition, TabsStyleType } from '@admin-core/shared/types';

export type TabsEmits = {
  close: [string];
  sortTabs: [number, number];
  unpin: [TabDefinition];
};

export interface TabsProps {
  active?: string;
  /**
   * tabs 容器 class（用于拖拽/滚动定位）
   * @default 'admin-tabs-content'
   */
  contentClass?: string;
  /**
   * 右键菜单（返回菜单项）
   */
  contextMenus?: (data: any) => IContextMenuItem[];
  /**
   * 是否可以拖拽排序
   */
  draggable?: boolean;
  /**
   * @zh_CN 间隙
   * @default 7
   * 仅限 tabs-chrome
   */
  gap?: number;
  /**
   * @zh_CN tab 最大宽度
   * 仅限 tabs-chrome
   */
  maxWidth?: number;
  /**
   * @zh_CN 点击中键时关闭Tab
   */
  middleClickToClose?: boolean;

  /**
   * @zh_CN tab最小宽度
   * 仅限 tabs-chrome
   */
  minWidth?: number;

  /**
   * 是否显示图标
   */
  showIcon?: boolean;
  /**
   * 标签页风格
   */
  styleType?: TabsStyleType;

  /**
   * 选项卡数据
   */
  tabs?: TabDefinition[];

  /**
   * 是否响应滚轮事件（用于横向滚动 Tabs）
   */
  wheelable?: boolean;
}

export interface TabConfig extends TabDefinition {
  affixTab: boolean;
  closable: boolean;
  icon: string;
  key: string;
  title: string;
}
