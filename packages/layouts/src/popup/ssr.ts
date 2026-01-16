export type PopupSsrMode = 'reject' | 'noop';

let popupSsrMode: PopupSsrMode = 'reject';

/**
 * 设置 @popup 在 SSR/非 DOM 环境下的行为策略
 *
 * @description
 * - `'reject'`（默认）：直接抛错/Promise reject，提醒调用方当前环境不可用
 * - `'noop'`：静默跳过（resolve），便于同构项目在服务端渲染阶段不被打断
 */
export function setPopupSsrMode(mode: PopupSsrMode) {
  popupSsrMode = mode;
}

export function getPopupSsrMode(): PopupSsrMode {
  return popupSsrMode;
}

export function isDomAvailable(): boolean {
  return typeof document !== 'undefined';
}

export function createNonDomError(fnName: string) {
  return new Error(`${fnName} is not available in non-DOM environments`);
}

