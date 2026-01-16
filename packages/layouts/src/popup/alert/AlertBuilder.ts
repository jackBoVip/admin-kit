import type { Component, VNode } from 'vue';

import type { Recordable } from '@admin-core/shared/types';

import type { AlertProps, BeforeCloseScope, PromptProps } from './alert';

import { h, nextTick, ref, render } from 'vue';

import { useSimpleLocale } from '@admin-core/composables';
import { Input, AdminRenderContent } from '@admin-core/ui';
import { isFunction, isString } from '@admin-core/shared/utils';

import Alert from './alert.vue';
import { createNonDomError, getPopupSsrMode, isDomAvailable } from '../ssr';

export type ClearAllAlertsOptions = {
  /**
   * 是否需要结算（resolve/reject）由 programmatic API 返回的 Promise
   *
   * @default 'none'
   * @description
   * - `'none'`：仅清理 DOM（保持旧行为），不会 resolve/reject（可能导致 Promise 悬挂）
   * - `'resolve'`：将所有弹层视作“已确认”，统一 resolve
   * - `'reject'`：将所有弹层视作“已取消”，统一 reject
   */
  settle?: 'none' | 'resolve' | 'reject';
  /**
   * 关闭原因（用于日志/调试）
   */
  reason?: string;
  /**
   * 是否静默（不输出 console.warn）
   * @default false
   */
  silent?: boolean;
};

type AlertEntry = {
  container: HTMLElement;
  instance: Component | null;
  settleOnce: (isConfirm: boolean) => void;
};

const alerts = ref<AlertEntry[]>([]);

const { $t } = useSimpleLocale();

export function adminAlert(options: AlertProps): Promise<void>;
export function adminAlert(
  message: string,
  options?: Partial<AlertProps>,
): Promise<void>;
export function adminAlert(
  message: string,
  title?: string,
  options?: Partial<AlertProps>,
): Promise<void>;

export function adminAlert(
  arg0: AlertProps | string,
  arg1?: Partial<AlertProps> | string,
  arg2?: Partial<AlertProps>,
): Promise<void> {
  return new Promise((resolve, reject) => {
    // SSR/Node 环境下没有 DOM，弹层无法渲染
    if (!isDomAvailable()) {
      if (getPopupSsrMode() === 'noop') {
        console.warn('[adminAlert]: skipped in non-DOM environments');
        resolve();
      } else {
        reject(createNonDomError('adminAlert'));
      }
      return;
    }

    const options: AlertProps = isString(arg0)
      ? {
          content: arg0,
        }
      : { ...arg0 };
    if (arg1) {
      if (isString(arg1)) {
        options.title = arg1;
      } else if (!isString(arg1)) {
        // 如果第二个参数是对象，则合并到选项中
        Object.assign(options, arg1);
      }
    }

    if (arg2 && !isString(arg2)) {
      Object.assign(options, arg2);
    }
    // 创建容器元素
    const container = document.createElement('div');
    document.body.append(container);

    let settled = false;
    const settleOnce = (isConfirm: boolean) => {
      if (settled) return;
      settled = true;
      if (isConfirm) resolve();
      else reject(new Error('dialog cancelled'));
    };

    // 创建一个引用，用于在回调中访问实例
    const alertRef: AlertEntry = { container, instance: null, settleOnce };

    const props: AlertProps & Recordable<any> = {
      onClosed: (isConfirm: boolean) => {
        // 移除组件实例以及创建的所有dom（恢复页面到打开前的状态）
        // 从alerts数组中移除该实例
        alerts.value = alerts.value.filter((item) => item !== alertRef);

        // 从DOM中移除容器
        render(null, container);
        if (container.parentNode) {
          container.remove();
        }

        // 结算 Promise，传递用户操作结果（仅执行一次，避免重复触发）
        settleOnce(isConfirm);
      },
      ...options,
      open: true,
      title: options.title ?? $t.value('prompt'),
    };

    // 创建Alert组件的VNode
    const vnode = h(Alert, props);

    // 渲染组件到容器
    render(vnode, container);

    // 保存组件实例引用
    alertRef.instance = (vnode.component?.proxy as Component) ?? null;

    // 将实例和容器添加到alerts数组中
    alerts.value.push(alertRef);
  });
}

export function adminConfirm(options: AlertProps): Promise<void>;
export function adminConfirm(
  message: string,
  options?: Partial<AlertProps>,
): Promise<void>;
export function adminConfirm(
  message: string,
  title?: string,
  options?: Partial<AlertProps>,
): Promise<void>;

export function adminConfirm(
  arg0: AlertProps | string,
  arg1?: Partial<AlertProps> | string,
  arg2?: Partial<AlertProps>,
): Promise<void> {
  const defaultProps: Partial<AlertProps> = {
    showCancel: true,
  };
  if (!arg1) {
    return isString(arg0)
      ? adminAlert(arg0, defaultProps)
      : adminAlert({ ...defaultProps, ...arg0 });
  } else if (!arg2) {
    return isString(arg1)
      ? adminAlert(arg0 as string, arg1, defaultProps)
      : adminAlert(arg0 as string, { ...defaultProps, ...arg1 });
  }
  return adminAlert(arg0 as string, arg1 as string, {
    ...defaultProps,
    ...arg2,
  });
}

export async function adminPrompt<T = any>(
  options: PromptProps<T>,
): Promise<T | undefined> {
  if (!isDomAvailable()) {
    if (getPopupSsrMode() === 'noop') {
      console.warn('[adminPrompt]: skipped in non-DOM environments');
      return options.defaultValue;
    }
    throw createNonDomError('adminPrompt');
  }
  const {
    component: _component,
    componentProps: _componentProps,
    componentSlots,
    content,
    defaultValue,
    modelPropName: _modelPropName,
    ...delegated
  } = options;

  const modelValue = ref<T | undefined>(defaultValue);
  const inputComponentRef = ref<null | VNode>(null);
  const staticContents: Component[] = [
    h(AdminRenderContent, { content, renderBr: true }),
  ];

  const modelPropName = _modelPropName || 'modelValue';
  const componentProps = { ..._componentProps };

  // 每次渲染时都会重新计算的内容函数
  const contentRenderer = () => {
    const currentProps = {
      ...componentProps,
      [modelPropName]: modelValue.value,
      [`onUpdate:${modelPropName}`]: (val: T) => {
        modelValue.value = val;
      },
    };

    // 设置当前值

    // 设置更新处理函数

    // 创建输入组件
    inputComponentRef.value = h(
      _component || Input,
      currentProps,
      componentSlots,
    );

    // 返回包含静态内容和输入组件的数组
    return h(
      'div',
      { class: 'flex flex-col gap-2' },
      { default: () => [...staticContents, inputComponentRef.value] },
    );
  };

  const props: AlertProps & Recordable<any> = {
    ...delegated,
    async beforeClose(scope: BeforeCloseScope) {
      if (delegated.beforeClose) {
        return await delegated.beforeClose({
          ...scope,
          value: modelValue.value,
        });
      }
      return true;
    },
    // 使用函数形式，每次渲染都会重新计算内容
    content: contentRenderer,
    contentMasking: true,
    async onOpened() {
      await nextTick();
      const componentRef: null | VNode = inputComponentRef.value;
      if (componentRef) {
        if (
          componentRef.component?.exposed &&
          isFunction(componentRef.component.exposed.focus)
        ) {
          componentRef.component.exposed.focus();
        } else {
          if (componentRef.el) {
            if (
              isFunction(componentRef.el.focus) &&
              ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(
                componentRef.el.tagName,
              )
            ) {
              componentRef.el.focus();
            } else if (isFunction(componentRef.el.querySelector)) {
              const focusableElement = componentRef.el.querySelector(
                'input, select, textarea, button',
              );
              if (focusableElement && isFunction(focusableElement.focus)) {
                focusableElement.focus();
              }
            } else if (
              componentRef.el.nextElementSibling &&
              isFunction(componentRef.el.nextElementSibling.focus)
            ) {
              componentRef.el.nextElementSibling.focus();
            }
          }
        }
      }
    },
  };

  await adminConfirm(props);
  return modelValue.value;
}

export function clearAllAlerts() {
  clearAllAlertsWithOptions();
}

/**
 * 批量关闭所有 alert（programmatic API 创建的实例）
 *
 * @description
 * 默认情况下仅做 DOM 清理（保持与旧版 `clearAllAlerts()` 一致），但这可能导致
 * `adminAlert/adminConfirm/adminPrompt` 返回的 Promise 悬挂。
 *
 * 若你在路由切换/页面卸载时需要“强制清理并结算 Promise”，可传入 settle：
 *
 * ```ts
 * import { clearAllAlertsWithOptions } from '@admin-core/layouts'
 *
 * // 将所有弹层视为“取消”，统一 reject
 * clearAllAlertsWithOptions({ settle: 'reject', reason: 'route-change' })
 * ```
 */
export function clearAllAlertsWithOptions(options: ClearAllAlertsOptions = {}) {
  const { settle = 'none', reason, silent = false } = options;

  if (!silent && import.meta.env.DEV && (reason || settle !== 'none')) {
    console.warn(
      `[clearAllAlerts]: settle=${settle}${reason ? `, reason=${reason}` : ''}`,
    );
  }

  const list = alerts.value.slice();
  alerts.value = [];

  list.forEach((alert) => {
    if (settle === 'resolve') alert.settleOnce(true);
    if (settle === 'reject') alert.settleOnce(false);

    // 从DOM中移除容器
    render(null, alert.container);
    if (alert.container.parentNode) {
      alert.container.remove();
    }
  });
}
