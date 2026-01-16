/**
 * @packageDocumentation
 * @module menu
 *
 * 菜单模块（@admin-core/layouts/menu）
 *
 * ## 主要导出
 * - `Menu`：菜单视图组件（支持递归渲染 `MenuRecordRaw[]`）
 * - `NormalMenu`：简化菜单（normal-menu）
 * - `MenuBadge`：徽标
 * - `useMenuScroll` 等 hooks
 *
 * ## 说明
 * - 该模块主要依赖 `@admin-core/shared/types` 的 `MenuRecordRaw` 数据结构
 * - 组件默认名称为 `MenuView`
 */
export { default as MenuBadge } from './components/menu-badge.vue';
export * from './components/normal-menu';
export { default as Menu } from './menu.vue';
export type * from './types';
