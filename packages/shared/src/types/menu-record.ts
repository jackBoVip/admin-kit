/**
 * 菜单记录相关类型定义
 */

import type { Component } from 'vue';

/**
 * 路由记录原始对象
 * 
 * 基础路由配置接口
 */
export interface RouteRecordRaw {
  /** 路由路径 */
  path: string;
  
  /** 路由名称 */
  name?: string | symbol;
  
  /** 路由组件 */
  component?: Component | (() => Promise<Component>);
  
  /** 子路由 */
  children?: RouteRecordRaw[];
  
  /** 路由元信息 */
  meta?: Record<string, any>;
  
  /** 其他属性 */
  [key: string]: any;
}

/**
 * 扩展路由原始对象
 * 
 * 在基础路由配置上扩展父级路径信息
 * 
 * @example
 * ```ts
 * const route: ExRouteRecordRaw = {
 *   path: '/user/profile',
 *   name: 'UserProfile',
 *   component: () => import('./UserProfile.vue'),
 *   parent: '/user',
 *   parents: ['/', '/user']
 * };
 * ```
 */
export type ExRouteRecordRaw = RouteRecordRaw & {
  /** 父级路径 */
  parent?: string;
  
  /** 所有父级路径数组 */
  parents?: string[];
  
  /** 路径（可以是任意类型，用于特殊场景） */
  path?: any;
};

/**
 * 菜单徽标配置
 * 
 * 用于在菜单项上显示徽标（如未读消息数量）
 * 
 * @example
 * ```ts
 * const badge: MenuRecordBadgeRaw = {
 *   badge: '5',
 *   badgeType: 'normal',
 *   badgeVariants: 'primary'
 * };
 * ```
 */
export interface MenuRecordBadgeRaw {
  /**
   * 徽标内容
   * 
   * 可以是数字或文本，如 '5'、'NEW'
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
  badgeVariants?: 'destructive' | 'primary' | string;
}

/**
 * 菜单原始对象
 * 
 * 定义菜单项的完整配置信息
 * 
 * @example
 * ```ts
 * const menu: MenuRecordRaw = {
 *   name: '用户管理',
 *   path: '/user',
 *   icon: 'UserIcon',
 *   activeIcon: 'UserFilledIcon',
 *   order: 1,
 *   badge: '5',
 *   badgeType: 'normal',
 *   badgeVariants: 'primary',
 *   children: [
 *     {
 *       name: '用户列表',
 *       path: '/user/list',
 *       parent: '/user'
 *     }
 *   ]
 * };
 * ```
 */
export interface MenuRecordRaw extends MenuRecordBadgeRaw {
  /**
   * 激活时的图标名
   * 
   * 当菜单项处于激活状态时显示的图标
   */
  activeIcon?: string;
  
  /**
   * 子菜单列表
   * 
   * 嵌套的子菜单项
   */
  children?: MenuRecordRaw[];
  
  /**
   * 是否禁用菜单
   * 
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 图标名或图标组件
   * 
   * 可以是字符串（图标名称）或 Vue 组件
   */
  icon?: Component | string;
  
  /**
   * 菜单名称
   * 
   * 显示在菜单中的文本
   */
  name: string;
  
  /**
   * 排序号
   * 
   * 用于控制菜单项的显示顺序，数字越小越靠前
   */
  order?: number;
  
  /**
   * 父级路径
   * 
   * 指向父菜单的路径
   */
  parent?: string;
  
  /**
   * 所有父级路径
   * 
   * 从根到当前菜单的完整路径数组
   */
  parents?: string[];
  
  /**
   * 菜单路径
   * 
   * 唯一标识，可作为 key 使用
   */
  path: string;
  
  /**
   * 是否显示菜单
   * 
   * @default true
   */
  show?: boolean;
}
