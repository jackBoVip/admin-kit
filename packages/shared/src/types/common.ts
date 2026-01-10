/**
 * 通用类型定义模块
 * 
 * 提供应用中使用的所有 TypeScript 类型定义
 */

// ============================================================================
// 外部模块类型导出
// ============================================================================

// 从 .ts 文件导出
export * from './menu-record';
export * from './tabs';

// 从 .d.ts 文件手动导出类型
export type {
  AccessModeType,
  AuthPageLayoutType,
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  LoginExpiredModeType,
  NavigationStyleType,
  PageTransitionType,
  PreferencesButtonPositionType,
  TabsStyleType,
  ThemeModeType,
  TimezoneOption,
} from './app';

export type {
  BasicOption,
  BasicUserInfo,
  ClassType,
  SelectOption,
  TabOption,
} from './basic';

export type {
  AnyFunction,
  AnyNormalFunction,
  AnyPromiseFunction,
  DeepPartial,
  DeepReadonly,
  EmitType,
  IntervalHandle,
  MaybeComputedRef,
  MaybePromise,
  MaybeReadonlyRef,
  Merge,
  MergeAll,
  NonNullable,
  Nullable,
  ReadonlyRecordable,
  Recordable,
  TimeoutHandle,
} from './helper';

// ============================================================================
// 通用工具类型
// ============================================================================

/**
 * ID 类型
 * 
 * 表示唯一标识符，可以是字符串或数字
 * 
 * @example
 * ```ts
 * const userId: ID = '123';
 * const orderId: ID = 456;
 * ```
 */
export type ID = number | string;

/**
 * 时间戳类型
 * 
 * 表示 Unix 时间戳（毫秒）
 * 
 * @example
 * ```ts
 * const now: Timestamp = Date.now();
 * const created: Timestamp = 1704067200000;
 * ```
 */
export type Timestamp = number;

// ============================================================================
// API 相关类型
// ============================================================================

/**
 * 标准的 API 响应
 * 
 * @template T - 响应数据的类型
 * 
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 * }
 * 
 * const response: ApiResponse<User> = {
 *   code: 200,
 *   message: 'Success',
 *   data: { id: '1', name: 'John' },
 *   timestamp: Date.now()
 * };
 * ```
 */
export interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number;
  
  /** 响应消息 */
  message: string;
  
  /** 响应数据 */
  data: T;
  
  /** 响应时间戳（可选） */
  timestamp?: number;
}

/**
 * 分页参数
 * 
 * 用于 API 请求的分页参数
 * 
 * @example
 * ```ts
 * const params: PaginationParams = {
 *   page: 1,
 *   pageSize: 20
 * };
 * fetchUsers(params);
 * ```
 */
export interface PaginationParams {
  /** 当前页码，从 1 开始 */
  page: number;
  
  /** 每页条数 */
  pageSize: number;
}

/**
 * 分页响应
 * 
 * API 返回的分页数据结构
 * 
 * @template T - 列表项的类型
 * 
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 * }
 * 
 * const response: PaginationResponse<User> = {
 *   list: [{ id: '1', name: 'John' }],
 *   total: 100,
 *   page: 1,
 *   pageSize: 20
 * };
 * ```
 */
export interface PaginationResponse<T = any> {
  /** 数据列表 */
  list: T[];
  
  /** 总记录数 */
  total: number;
  
  /** 当前页码 */
  page: number;
  
  /** 每页条数 */
  pageSize: number;
}

// ============================================================================
// 数据结构类型
// ============================================================================

/**
 * 树形节点
 * 
 * 表示树形结构的节点
 * 
 * @template T - 节点额外数据的类型
 * 
 * @example
 * ```ts
 * interface Department {
 *   name: string;
 *   code: string;
 * }
 * 
 * const tree: TreeNode<Department> = {
 *   id: '1',
 *   name: '技术部',
 *   code: 'TECH',
 *   children: [
 *     { id: '2', name: '前端组', code: 'FE', parentId: '1' }
 *   ]
 * };
 * ```
 */
export interface TreeNode<T = any> {
  /** 节点唯一标识 */
  id: ID;
  
  /** 父节点 ID（可选） */
  parentId?: ID;
  
  /** 子节点列表（可选） */
  children?: TreeNode<T>[];
  
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 选项
 * 
 * 用于下拉框、单选框等组件的选项数据
 * 
 * @template T - 选项值的类型
 * 
 * @example
 * ```ts
 * const options: Option<number>[] = [
 *   { label: '启用', value: 1 },
 *   { label: '禁用', value: 0, disabled: true }
 * ];
 * ```
 */
export interface Option<T = any> {
  /** 显示文本 */
  label: string;
  
  /** 选项值 */
  value: T;
  
  /** 是否禁用（可选） */
  disabled?: boolean;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 用户相关类型
// ============================================================================

/**
 * 用户信息
 * 
 * 表示系统用户的基本信息
 * 
 * @example
 * ```ts
 * const user: UserInfo = {
 *   id: '123',
 *   username: 'john_doe',
 *   nickname: 'John',
 *   avatar: 'https://example.com/avatar.jpg',
 *   email: 'john@example.com',
 *   roles: ['admin', 'user'],
 *   permissions: ['user:read', 'user:write']
 * };
 * ```
 */
export interface UserInfo {
  /** 用户 ID */
  id: ID;
  
  /** 用户名（登录名） */
  username: string;
  
  /** 昵称（可选） */
  nickname?: string;
  
  /** 头像 URL（可选） */
  avatar?: string;
  
  /** 邮箱（可选） */
  email?: string;
  
  /** 手机号（可选） */
  phone?: string;
  
  /** 角色列表（可选） */
  roles?: string[];
  
  /** 权限列表（可选） */
  permissions?: string[];
  
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 菜单相关类型
// ============================================================================

/**
 * 菜单元信息
 * 
 * 菜单的附加信息
 * 
 * @example
 * ```ts
 * const meta: MenuMeta = {
 *   title: '用户管理',
 *   icon: 'UserIcon',
 *   hidden: false,
 *   badge: '5'
 * };
 * ```
 */
export interface MenuMeta {
  /** 菜单标题 */
  title: string;
  
  /** 图标名称（可选） */
  icon?: string;
  
  /** 是否隐藏（可选） */
  hidden?: boolean;
  
  /** 是否禁用（可选） */
  disabled?: boolean;
  
  /** 徽标内容（可选） */
  badge?: string | number;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 菜单项
 * 
 * 表示系统菜单的数据结构
 * 
 * @example
 * ```ts
 * const menu: MenuItem = {
 *   id: '1',
 *   name: 'Dashboard',
 *   path: '/dashboard',
 *   icon: 'DashboardIcon',
 *   meta: {
 *     title: '仪表盘'
 *   },
 *   children: []
 * };
 * ```
 */
export interface MenuItem {
  /** 菜单 ID */
  id: ID;
  
  /** 菜单名称（路由名称） */
  name: string;
  
  /** 菜单路径 */
  path: string;
  
  /** 图标名称（可选） */
  icon?: string;
  
  /** 父菜单 ID（可选） */
  parentId?: ID;
  
  /** 子菜单列表（可选） */
  children?: MenuItem[];
  
  /** 菜单元信息（可选） */
  meta?: MenuMeta;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 路由相关类型
// ============================================================================

/**
 * 路由元信息
 * 
 * 路由配置信息的附加数据
 * 
 * @example
 * ```ts
 * const meta: RouteMeta = {
 *   title: '用户详情',
 *   icon: 'UserIcon',
 *   requiresAuth: true,
 *   roles: ['admin'],
 *   keepAlive: true
 * };
 * ```
 */
export interface RouteMeta {
  /** 路由标题 */
  title: string;
  
  /** 图标名称（可选） */
  icon?: string;
  
  /** 是否需要认证（可选） */
  requiresAuth?: boolean;
  
  /** 允许访问的角色列表（可选） */
  roles?: string[];
  
  /** 允许访问的权限列表（可选） */
  permissions?: string[];
  
  /** 是否缓存页面（可选） */
  keepAlive?: boolean;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 表单相关类型
// ============================================================================

/**
 * 表单规则
 * 
 * 表单验证规则配置
 * 
 * @example
 * ```ts
 * const rules: Record<string, FormRule[]> = {
 *   username: [
 *     { required: true, message: '请输入用户名', trigger: 'blur' },
 *     { validator: (rule, value, callback) => {
 *       if (value.length < 3) {
 *         callback(new Error('用户名至少3个字符'));
 *       } else {
 *         callback();
 *       }
 *     }, trigger: 'blur' }
 *   ]
 * };
 * ```
 */
export interface FormRule {
  /** 是否必填（可选） */
  required?: boolean;
  
  /** 错误提示信息（可选） */
  message?: string;
  
  /** 触发验证的时机（可选） */
  trigger?: string | string[];
  
  /** 自定义验证函数（可选） */
  validator?: (rule: any, value: any, callback: any) => void;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 表格相关类型
// ============================================================================

/**
 * 表格列配置
 * 
 * 表格列的配置信息
 * 
 * @template T - 行数据的类型
 * 
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 *   age: number;
 * }
 * 
 * const columns: TableColumn<User>[] = [
 *   { prop: 'name', label: '姓名', width: 120 },
 *   { 
 *     prop: 'age', 
 *     label: '年龄',
 *     sortable: true,
 *     formatter: (row) => `${row.age}岁`
 *   }
 * ];
 * ```
 */
export interface TableColumn<T = any> {
  /** 列属性名 */
  prop: string;
  
  /** 列标题 */
  label: string;
  
  /** 列宽度（可选） */
  width?: number | string;
  
  /** 最小列宽（可选） */
  minWidth?: number | string;
  
  /** 是否固定列（可选） */
  fixed?: boolean | 'left' | 'right';
  
  /** 是否可排序（可选） */
  sortable?: boolean;
  
  /** 格式化函数（可选） */
  formatter?: (row: T, column: TableColumn<T>, cellValue: any, index: number) => any;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 文件上传类型
// ============================================================================

/**
 * 上传文件
 * 
 * 文件上传的数据结构
 * 
 * @example
 * ```ts
 * const file: UploadFile = {
 *   uid: 'file-1',
 *   name: 'document.pdf',
 *   size: 102400,
 *   type: 'application/pdf',
 *   status: 'uploading',
 *   percent: 50
 * };
 * ```
 */
export interface UploadFile {
  /** 文件唯一标识 */
  uid: string;
  
  /** 文件名 */
  name: string;
  
  /** 文件大小（字节） */
  size: number;
  
  /** 文件类型（MIME type） */
  type: string;
  
  /** 文件 URL（可选） */
  url?: string;
  
  /** 上传状态（可选） */
  status?: 'ready' | 'uploading' | 'success' | 'error';
  
  /** 上传进度（0-100）（可选） */
  percent?: number;
  
  /** 服务器响应（可选） */
  response?: any;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 应用配置类型
// ============================================================================

/**
 * 布局配置
 * 
 * 应用布局的配置信息
 * 
 * @example
 * ```ts
 * const layout: LayoutConfig = {
 *   showHeader: true,
 *   showFooter: true,
 *   showTabs: true,
 *   headerHeight: 64,
 *   footerHeight: 48,
 *   sidebarWidth: 240,
 *   sidebarCollapsed: false
 * };
 * ```
 */
export interface LayoutConfig {
  /** 是否显示头部 */
  showHeader: boolean;
  
  /** 是否显示底部 */
  showFooter: boolean;
  
  /** 是否显示标签页 */
  showTabs: boolean;
  
  /** 头部高度（像素） */
  headerHeight: number;
  
  /** 底部高度（像素） */
  footerHeight: number;
  
  /** 侧边栏宽度（像素） */
  sidebarWidth: number;
  
  /** 侧边栏是否折叠 */
  sidebarCollapsed: boolean;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 主题配置
 * 
 * 应用主题的配置信息
 * 
 * @example
 * ```ts
 * const theme: ThemeConfig = {
 *   mode: 'dark',
 *   variant: 'default',
 *   primaryColor: '#1890ff'
 * };
 * ```
 */
export interface ThemeConfig {
  /** 主题模式 */
  mode: 'light' | 'dark' | 'auto';
  
  /** 主题变体 */
  variant: string;
  
  /** 主色调（可选） */
  primaryColor?: string;
  
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 应用配置
 * 
 * 应用的全局配置信息
 * 
 * @example
 * ```ts
 * const config: AppConfig = {
 *   name: 'Admin Kit',
 *   version: '1.0.0',
 *   locale: 'zh-CN',
 *   theme: {
 *     mode: 'light',
 *     variant: 'default'
 *   },
 *   layout: {
 *     showHeader: true,
 *     headerHeight: 64,
 *     sidebarWidth: 240,
 *     sidebarCollapsed: false,
 *     showFooter: true,
 *     footerHeight: 48,
 *     showTabs: true
 *   }
 * };
 * ```
 */
export interface AppConfig {
  /** 应用名称 */
  name: string;
  
  /** 应用版本 */
  version: string;
  
  /** 语言设置 */
  locale: string;
  
  /** 主题配置 */
  theme: ThemeConfig;
  
  /** 布局配置 */
  layout: LayoutConfig;
  
  /** 其他自定义属性 */
  [key: string]: any;
}
