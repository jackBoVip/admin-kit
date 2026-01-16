import type { MenuProvider, SubMenuProvider } from '../types';

import { getCurrentInstance, inject, provide } from 'vue';

import { findComponentUpward } from '../utils';

const menuContextKey = Symbol('menuContext');

/**
 * 提供 Menu 根上下文
 *
 * @description
 * 由根 `Menu` 组件调用，用于子菜单/菜单项共享状态（active/opened/handlers 等）。
 */
function createMenuContext(injectMenuData: MenuProvider) {
  provide(menuContextKey, injectMenuData);
}

/**
 * 提供 SubMenu 上下文
 *
 * @description
 * 采用 `subMenu:${uid}` 作为 key，便于子树内精确注入。
 */
function createSubMenuContext(injectSubMenuData: SubMenuProvider) {
  const instance = getCurrentInstance();

  provide(`subMenu:${instance?.uid}`, injectSubMenuData);
}

/**
 * 注入 Menu 根上下文
 */
function useMenuContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const rootMenu = inject(menuContextKey) as MenuProvider;
  return rootMenu;
}

/**
 * 注入 SubMenu 上下文
 */
function useSubMenuContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const parentMenu = findComponentUpward(instance, ['Menu', 'SubMenu']);
  const subMenu = inject(`subMenu:${parentMenu?.uid}`) as SubMenuProvider;
  return subMenu;
}

export {
  createMenuContext,
  createSubMenuContext,
  useMenuContext,
  useSubMenuContext,
};
