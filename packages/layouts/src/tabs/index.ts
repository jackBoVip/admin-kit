/**
 * @packageDocumentation
 * @module tabs
 *
 * Tabs 模块（@admin-core/layouts/tabs）
 *
 * ## 主要导出
 * - `TabsView`：标签页容器（支持滚动、拖拽、右键菜单等）
 * - `useTabsDrag` / `useTabsViewScroll`：内部能力（一般由 TabsView 使用）
 *
 * ## 注意事项
 * - 拖拽能力依赖 DOM，在 SSR/Node 环境下会自动跳过初始化（不报错）
 */
export * from './components/widgets';
export { default as TabsView } from './tabs-view.vue';
export type { IContextMenuItem } from '@admin-core/ui';
