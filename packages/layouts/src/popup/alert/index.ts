export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export type { ClearAllAlertsOptions } from './AlertBuilder';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  adminAlert as alert,
  clearAllAlerts,
  clearAllAlertsWithOptions,
  adminConfirm as confirm,
  adminPrompt as prompt,
} from './AlertBuilder';

// SSR 行为策略（统一入口）
export { getPopupSsrMode, setPopupSsrMode } from '../ssr';
