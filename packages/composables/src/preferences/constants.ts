/**
 * Preferences 常量和默认配置
 * 
 * @description
 * 包含主题预设、时区选项和默认偏好设置配置
 */

import type { Preferences } from './types'

/**
 * 内置主题预设类型
 */
interface BuiltinThemePreset {
  /** 主题颜色 */
  color: string
  /** 暗色模式主色（可选） */
  darkPrimaryColor?: string
  /** 亮色模式主色（可选） */
  primaryColor?: string
  /** 主题类型标识 */
  type: string
}

/**
 * 时区选项类型
 */
interface TimezoneOption {
  /** 时区偏移量 */
  offset: number
  /** 时区标识符 */
  timezone: string
  /** 时区显示标签 */
  label: string
}

/**
 * 内置主题预设列表
 * 
 * @description
 * 提供多种预设主题颜色方案
 */
const BUILT_IN_THEME_PRESETS: BuiltinThemePreset[] = [
  {
    color: 'hsl(212 100% 45%)',
    type: 'default',
  },
  {
    color: 'hsl(245 82% 67%)',
    type: 'violet',
  },
  {
    color: 'hsl(347 77% 60%)',
    type: 'pink',
  },
  {
    color: 'hsl(42 84% 61%)',
    type: 'yellow',
  },
  {
    color: 'hsl(231 98% 65%)',
    type: 'sky-blue',
  },
  {
    color: 'hsl(161 90% 43%)',
    type: 'green',
  },
  {
    color: 'hsl(240 5% 26%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'zinc',
  },
  {
    color: 'hsl(181 84% 32%)',
    type: 'deep-green',
  },
  {
    color: 'hsl(211 91% 39%)',
    type: 'deep-blue',
  },
  {
    color: 'hsl(18 89% 40%)',
    type: 'orange',
  },
  {
    color: 'hsl(0 75% 42%)',
    type: 'rose',
  },
  {
    color: 'hsl(0 0% 25%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'neutral',
  },
  {
    color: 'hsl(215 25% 27%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'slate',
  },
  {
    color: 'hsl(217 19% 27%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'gray',
  },
  {
    color: '',
    type: 'custom',
  },
]

/**
 * 默认时区选项列表
 * 
 * @description
 * 提供常用时区选项
 */
const DEFAULT_TIME_ZONE_OPTIONS: TimezoneOption[] = [
  {
    offset: -5,
    timezone: 'America/New_York',
    label: 'America/New_York(GMT-5)',
  },
  {
    offset: 0,
    timezone: 'Europe/London',
    label: 'Europe/London(GMT0)',
  },
  {
    offset: 8,
    timezone: 'Asia/Shanghai',
    label: 'Asia/Shanghai(GMT+8)',
  },
  {
    offset: 9,
    timezone: 'Asia/Tokyo',
    label: 'Asia/Tokyo(GMT+9)',
  },
  {
    offset: 9,
    timezone: 'Asia/Seoul',
    label: 'Asia/Seoul(GMT+9)',
  },
]

/**
 * 颜色预设（前 7 个主题）
 * 
 * @description
 * 用于快速选择的颜色预设
 */
export const COLOR_PRESETS = [...BUILT_IN_THEME_PRESETS].slice(0, 7)

/**
 * 默认偏好设置配置
 * 
 * @description
 * 系统的默认配置值，包含所有偏好设置的初始状态
 */
const defaultPreferences: Preferences = {
  app: {
    accessMode: 'frontend',
    authPageLayout: 'panel-right',
    checkUpdatesInterval: 1,
    colorGrayMode: false,
    colorWeakMode: false,
    compact: false,
    contentCompact: 'wide',
    contentCompactWidth: 1200,
    contentPadding: 0,
    contentPaddingBottom: 0,
    contentPaddingLeft: 0,
    contentPaddingRight: 0,
    contentPaddingTop: 0,
    defaultAvatar:
      'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp',
    defaultHomePath: '/analytics',
    dynamicTitle: true,
    enableCheckUpdates: true,
    enablePreferences: true,
    enableRefreshToken: false,
    enableStickyPreferencesNavigationBar: true,
    isMobile: false,
    layout: 'sidebar-nav',
    locale: 'zh-CN',
    loginExpiredMode: 'page',
    name: 'Admin',
    preferencesButtonPosition: 'auto',
    watermark: false,
    watermarkContent: '',
    zIndex: 200,
  },
  breadcrumb: {
    enable: true,
    hideOnlyOne: false,
    showHome: false,
    showIcon: true,
    styleType: 'normal',
  },
  copyright: {
    companyName: 'Admin',
    companySiteLink: 'https://www.vben.pro',
    date: '2026',
    enable: true,
    icp: '',
    icpLink: '',
    settingShow: true,
  },
  footer: {
    enable: false,
    fixed: false,
    height: 32,
  },
  header: {
    enable: true,
    height: 50,
    hidden: false,
    menuAlign: 'start',
    mode: 'fixed',
  },
  logo: {
    enable: true,
    fit: 'contain',
    source: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
  },
  navigation: {
    accordion: true,
    split: true,
    styleType: 'rounded',
  },
  shortcutKeys: {
    enable: true,
    globalLockScreen: true,
    globalLogout: true,
    globalPreferences: true,
    globalSearch: true,
  },
  sidebar: {
    autoActivateChild: false,
    collapsed: false,
    collapsedButton: true,
    collapsedShowTitle: false,
    collapseWidth: 60,
    enable: true,
    expandOnHover: true,
    extraCollapse: false,
    extraCollapsedWidth: 60,
    fixedButton: true,
    hidden: false,
    mixedWidth: 80,
    width: 224,
  },
  tabbar: {
    draggable: true,
    enable: true,
    height: 38,
    keepAlive: true,
    maxCount: 0,
    middleClickToClose: false,
    persist: true,
    showIcon: true,
    showMaximize: true,
    showMore: true,
    styleType: 'chrome',
    wheelable: true,
  },
  theme: {
    builtinType: 'default',
    colorDestructive: 'hsl(348 100% 61%)',
    colorPrimary: 'hsl(212 100% 45%)',
    colorSuccess: 'hsl(144 57% 58%)',
    colorWarning: 'hsl(42 84% 61%)',
    mode: 'dark',
    radius: '0.5',
    fontSize: 16,
    semiDarkHeader: false,
    semiDarkSidebar: false,
  },
  transition: {
    enable: true,
    loading: true,
    name: 'fade-slide',
    progress: true,
  },
  widget: {
    fullscreen: true,
    globalSearch: true,
    languageToggle: true,
    lockScreen: true,
    notification: true,
    refresh: true,
    sidebarToggle: true,
    themeToggle: true,
    timezone: true,
  },
}

export { BUILT_IN_THEME_PRESETS, DEFAULT_TIME_ZONE_OPTIONS, defaultPreferences }

export type { BuiltinThemePreset, TimezoneOption }
