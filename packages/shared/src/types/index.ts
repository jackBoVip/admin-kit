/**
 * 类型定义
 */

/**
 * 可为 null 的类型
 */
export type Nullable<T> = T | null

/**
 * 可为 undefined 的类型
 */
export type Optional<T> = T | undefined

/**
 * 可为 null 或 undefined 的类型
 */
export type Maybe<T> = T | null | undefined

/**
 * 记录类型
 */
export type Recordable<T = any> = Record<string, T>

/**
 * 只读记录类型
 */
export type ReadonlyRecordable<T = any> = Readonly<Record<string, T>>

/**
 * 函数类型
 */
export type Fn<T = any, R = T> = (...args: T[]) => R

/**
 * Promise 函数类型
 */
export type PromiseFn<T = any, R = T> = (...args: T[]) => Promise<R>

/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T

/**
 * 深度部分类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * 深度只读类型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/**
 * 深度必需类型
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

/**
 * 值类型
 */
export type ValueOf<T> = T[keyof T]

/**
 * 提取 Promise 类型
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

/**
 * 提取数组元素类型
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never

/**
 * 排除 null 和 undefined
 */
export type NonNullable<T> = Exclude<T, null | undefined>

/**
 * 时间戳类型
 */
export type Timestamp = number

/**
 * ID 类型
 */
export type ID = string | number

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页响应
 */
export interface PaginationResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * API 响应
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
}

/**
 * 树形节点
 */
export interface TreeNode<T = any> {
  id: ID
  parentId?: ID
  children?: TreeNode<T>[]
  [key: string]: any
}

/**
 * 选项
 */
export interface Option<T = any> {
  label: string
  value: T
  disabled?: boolean
  [key: string]: any
}

/**
 * 用户信息
 */
export interface UserInfo {
  id: ID
  username: string
  nickname?: string
  avatar?: string
  email?: string
  phone?: string
  roles?: string[]
  permissions?: string[]
  [key: string]: any
}

/**
 * 菜单项
 */
export interface MenuItem {
  id: ID
  name: string
  path: string
  icon?: string
  parentId?: ID
  children?: MenuItem[]
  meta?: MenuMeta
  [key: string]: any
}

/**
 * 菜单元信息
 */
export interface MenuMeta {
  title: string
  icon?: string
  hidden?: boolean
  disabled?: boolean
  badge?: string | number
  [key: string]: any
}

/**
 * 路由元信息
 */
export interface RouteMeta {
  title: string
  icon?: string
  requiresAuth?: boolean
  roles?: string[]
  permissions?: string[]
  keepAlive?: boolean
  [key: string]: any
}

/**
 * 表单规则
 */
export interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  validator?: (rule: any, value: any, callback: any) => void
  [key: string]: any
}

/**
 * 表格列
 */
export interface TableColumn<T = any> {
  prop: string
  label: string
  width?: number | string
  minWidth?: number | string
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean
  formatter?: (row: T, column: TableColumn<T>, cellValue: any, index: number) => any
  [key: string]: any
}

/**
 * 上传文件
 */
export interface UploadFile {
  uid: string
  name: string
  size: number
  type: string
  url?: string
  status?: 'ready' | 'uploading' | 'success' | 'error'
  percent?: number
  response?: any
  [key: string]: any
}

/**
 * 主题配置
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  variant: string
  primaryColor?: string
  [key: string]: any
}

/**
 * 布局配置
 */
export interface LayoutConfig {
  sidebarCollapsed: boolean
  sidebarWidth: number
  headerHeight: number
  footerHeight: number
  showHeader: boolean
  showFooter: boolean
  showTabs: boolean
  [key: string]: any
}

/**
 * 应用配置
 */
export interface AppConfig {
  name: string
  version: string
  locale: string
  theme: ThemeConfig
  layout: LayoutConfig
  [key: string]: any
}

