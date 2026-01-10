/**
 * Vue Router 相关类型定义
 */

import type { Component } from 'vue';

/**
 * 路由器实例接口
 */
export interface Router {
  /** 添加路由 */
  addRoute: (route: any) => void;
  
  /** 移除路由 */
  removeRoute: (name: string | symbol) => void;
  
  /** 获取所有路由 */
  getRoutes: () => any[];
  
  /** 其他路由器方法 */
  [key: string]: any;
}

/**
 * 路由元信息
 * 
 * 路由的附加配置信息，用于权限控制、页面标题等
 * 
 * @example
 * ```ts
 * const meta: RouteMeta = {
 *   title: '用户管理',
 *   icon: 'UserIcon',
 *   requiresAuth: true,
 *   roles: ['admin'],
 *   keepAlive: true
 * };
 * ```
 */
export interface RouteMeta {
  /**
   * 激活图标（菜单/tab）
   * 
   * 当路由处于激活状态时显示的图标
   */
  activeIcon?: string;
  
  /**
   * 当前激活的菜单
   * 
   * 有时候不想激活现有菜单，需要激活父级菜单时使用
   */
  activePath?: string;
  
  /**
   * 是否固定标签页
   * 
   * @default false
   */
  affixTab?: boolean;
  
  /**
   * 固定标签页的顺序
   * 
   * @default 0
   */
  affixTabOrder?: number;
  
  /**
   * 需要特定的角色标识才可以访问
   * 
   * @default []
   */
  authority?: string[];
  
  /**
   * 徽标内容
   * 
   * 显示在菜单项或标签页上的徽标
   */
  badge?: string;
  
  /**
   * 徽标类型
   * 
   * - dot: 小圆点样式
   * - normal: 正常徽标样式
   */
  badgeType?: 'dot' | 'normal';
  
  /**
   * 徽标颜色变体
   * 
   * 支持预设颜色或自定义颜色值
   */
  badgeVariants?:
    | 'default'
    | 'destructive'
    | 'primary'
    | 'success'
    | 'warning'
    | string;
  
  /**
   * 路由的完整路径作为 key
   * 
   * @default true
   */
  fullPathKey?: boolean;
  
  /**
   * 当前路由的子级在菜单中不展现
   * 
   * @default false
   */
  hideChildrenInMenu?: boolean;
  
  /**
   * 当前路由在面包屑中不展现
   * 
   * @default false
   */
  hideInBreadcrumb?: boolean;
  
  /**
   * 当前路由在菜单中不展现
   * 
   * @default false
   */
  hideInMenu?: boolean;
  
  /**
   * 当前路由在标签页不展现
   * 
   * @default false
   */
  hideInTab?: boolean;
  
  /**
   * 图标（菜单/tab）
   * 
   * 可以是字符串（图标名称）或 Vue 组件
   */
  icon?: Component | string;
  
  /**
   * iframe 地址
   * 
   * 如果设置，将在 iframe 中加载该地址
   */
  iframeSrc?: string;
  
  /**
   * 忽略权限，直接可以访问
   * 
   * @default false
   */
  ignoreAccess?: boolean;
  
  /**
   * 开启 KeepAlive 缓存
   * 
   * 是否缓存该路由对应的组件实例
   */
  keepAlive?: boolean;
  
  /**
   * 外链 - 跳转路径
   * 
   * 如果设置，点击菜单将跳转到外部链接
   */
  link?: string;
  
  /**
   * 路由是否已经加载过
   * 
   * 用于动态路由的加载状态标记
   */
  loaded?: boolean;
  
  /**
   * 标签页最大打开数量
   * 
   * @default -1 (无限制)
   */
  maxNumOfOpenTab?: number;
  
  /**
   * 菜单可以看到，但是访问会被重定向到 403
   * 
   * 用于显示但禁止访问的菜单项
   */
  menuVisibleWithForbidden?: boolean;
  
  /**
   * 不使用基础布局（仅在顶级生效）
   * 
   * 设置为 true 时，该路由不会使用默认的布局组件
   */
  noBasicLayout?: boolean;
  
  /**
   * 在新窗口打开
   * 
   * 点击菜单时是否在新窗口打开
   */
  openInNewWindow?: boolean;
  
  /**
   * 用于路由 -> 菜单排序
   * 
   * 数字越小越靠前
   */
  order?: number;
  
  /**
   * 菜单所携带的参数
   * 
   * 用于在菜单跳转时传递额外参数
   */
  query?: Record<string, any>;
  
  /**
   * 标题名称
   * 
   * 显示在菜单、标签页、面包屑中的文本
   */
  title: string;
}

/**
 * 路由记录原始对象（字符串组件版本）
 * 
 * 将 RouteRecordRaw 的 component 属性更改为字符串类型
 * 用于后端返回的路由配置，组件路径以字符串形式存储
 * 
 * @template T - 组件路径的类型，默认为 string
 * 
 * @example
 * ```ts
 * const route: RouteRecordStringComponent = {
 *   path: '/user',
 *   name: 'User',
 *   component: '@/views/user/index.vue',
 *   meta: {
 *     title: '用户管理'
 *   },
 *   children: [
 *     {
 *       path: 'list',
 *       name: 'UserList',
 *       component: '@/views/user/list.vue',
 *       meta: {
 *         title: '用户列表'
 *       }
 *     }
 *   ]
 * };
 * ```
 */
export type RouteRecordStringComponent<T = string> = {
  /** 路由路径 */
  path: string;
  
  /** 路由名称 */
  name?: string | symbol;
  
  /** 组件路径（字符串形式） */
  component: T;
  
  /** 子路由 */
  children?: RouteRecordStringComponent<T>[];
  
  /** 路由元信息 */
  meta?: RouteMeta;
  
  /** 重定向 */
  redirect?: string;
  
  /** 其他属性 */
  [key: string]: any;
};

/**
 * 组件记录类型
 * 
 * 用于存储组件路径到组件加载函数的映射
 * 
 * @example
 * ```ts
 * const pageMap: ComponentRecordType = {
 *   '@/views/user/index.vue': () => import('@/views/user/index.vue'),
 *   '@/views/user/list.vue': () => import('@/views/user/list.vue')
 * };
 * ```
 */
export type ComponentRecordType = Record<string, () => Promise<Component>>;

/**
 * 生成菜单和路由的选项
 * 
 * 用于配置动态路由和菜单的生成逻辑
 * 
 * @example
 * ```ts
 * const options: GenerateMenuAndRoutesOptions = {
 *   router,
 *   routes: staticRoutes,
 *   roles: ['admin'],
 *   fetchMenuListAsync: async () => {
 *     const response = await fetch('/api/menus');
 *     return response.json();
 *   },
 *   layoutMap: {
 *     'BasicLayout': () => import('@/layouts/BasicLayout.vue')
 *   },
 *   pageMap: {
 *     '@/views/user/index.vue': () => import('@/views/user/index.vue')
 *   },
 *   forbiddenComponent: () => import('@/views/error/403.vue')
 * };
 * ```
 */
export interface GenerateMenuAndRoutesOptions {
  /**
   * 异步获取菜单列表的函数
   * 
   * 从后端获取动态路由配置
   */
  fetchMenuListAsync?: () => Promise<RouteRecordStringComponent[]>;
  
  /**
   * 403 禁止访问页面组件
   * 
   * 当用户无权访问时显示的组件
   */
  forbiddenComponent?: Component | (() => Promise<Component>);
  
  /**
   * 布局组件映射
   * 
   * 布局组件路径到组件加载函数的映射
   */
  layoutMap?: ComponentRecordType;
  
  /**
   * 页面组件映射
   * 
   * 页面组件路径到组件加载函数的映射
   */
  pageMap?: ComponentRecordType;
  
  /**
   * 用户角色列表
   * 
   * 用于权限过滤
   */
  roles?: string[];
  
  /**
   * 路由器实例
   * 
   * Vue Router 实例
   */
  router: Router;
  
  /**
   * 静态路由列表
   * 
   * 预定义的静态路由配置
   */
  routes: any[];
}
