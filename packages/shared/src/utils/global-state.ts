/**
 * 全局状态管理模块
 * @description 全局复用的变量、组件、配置，各个模块之间共享
 * @module global-state
 * 
 * @remarks
 * 通过单例模式实现，单例必须注意不受请求影响
 * 例如用户信息这些需要根据请求获取的数据不应存储在此
 * 设计考虑了 SSR 场景，不会影响服务端渲染
 */

/**
 * 组件状态类型
 * @description 存储全局共享的组件实例或配置
 */
export interface ComponentsState {
  [key: string]: any
}

/**
 * 消息提示状态类型
 * @description 定义框架内部各个场景的消息提示回调函数
 */
export interface MessageState {
  /** 复制偏好设置成功的消息提示 */
  copyPreferencesSuccess?: (title: string, content?: string) => void
  /** 可扩展其他消息类型 */
  [key: string]: ((title: string, content?: string) => void) | undefined
}

/**
 * 全局共享状态接口
 * @description 定义全局状态的完整结构
 */
export interface IGlobalSharedState {
  /** 组件状态 */
  components: ComponentsState
  /** 消息提示状态 */
  message: MessageState
}

/**
 * 全局共享状态管理类
 * @description 使用单例模式管理全局状态，支持组件和消息的统一管理
 * @example
 * ```typescript
 * // 定义消息提示
 * globalShareState.defineMessage({
 *   copyPreferencesSuccess: (title, content) => {
 *     console.log(`${title}: ${content}`)
 *   }
 * })
 * 
 * // 设置组件
 * globalShareState.setComponents({
 *   modal: ModalComponent,
 *   drawer: DrawerComponent
 * })
 * 
 * // 获取组件
 * const components = globalShareState.getComponents()
 * 
 * // 获取消息配置
 * const message = globalShareState.getMessage()
 * ```
 */
class GlobalShareState {
  /** 私有组件状态 */
  #components: ComponentsState = {}
  
  /** 私有消息状态 */
  #message: MessageState = {}

  /**
   * 定义框架内部各个场景的消息提示
   * @param messageConfig - 消息配置对象
   * @example
   * ```typescript
   * globalShareState.defineMessage({
   *   copyPreferencesSuccess: (title, content) => {
   *     notification.success({ title, content })
   *   }
   * })
   * ```
   */
  defineMessage(messageConfig: MessageState): void {
    // 使用对象展开合并，保留未定义的消息类型
    this.#message = {
      ...this.#message,
      ...messageConfig,
    }
  }

  /**
   * 获取所有组件状态
   * @returns 组件状态对象
   * @example
   * ```typescript
   * const components = globalShareState.getComponents()
   * const modal = components.modal
   * ```
   */
  getComponents(): ComponentsState {
    return this.#components
  }

  /**
   * 获取所有消息配置
   * @returns 消息配置对象
   * @example
   * ```typescript
   * const message = globalShareState.getMessage()
   * message.copyPreferencesSuccess?.('成功', '偏好设置已复制')
   * ```
   */
  getMessage(): MessageState {
    return this.#message
  }

  /**
   * 设置组件状态
   * @param value - 组件状态对象
   * @example
   * ```typescript
   * globalShareState.setComponents({
   *   modal: ModalComponent,
   *   drawer: DrawerComponent
   * })
   * ```
   */
  setComponents(value: ComponentsState): void {
    this.#components = value
  }

  /**
   * 更新组件状态（合并模式）
   * @param value - 要合并的组件状态对象
   * @example
   * ```typescript
   * // 不会覆盖已有的组件，只添加或更新指定的组件
   * globalShareState.updateComponents({
   *   tooltip: TooltipComponent
   * })
   * ```
   */
  updateComponents(value: Partial<ComponentsState>): void {
    this.#components = {
      ...this.#components,
      ...value,
    }
  }

  /**
   * 获取单个组件
   * @param key - 组件键名
   * @returns 组件实例或配置
   * @example
   * ```typescript
   * const modal = globalShareState.getComponent('modal')
   * ```
   */
  getComponent<T = any>(key: string): T | undefined {
    return this.#components[key]
  }

  /**
   * 设置单个组件
   * @param key - 组件键名
   * @param value - 组件实例或配置
   * @example
   * ```typescript
   * globalShareState.setComponent('modal', ModalComponent)
   * ```
   */
  setComponent(key: string, value: any): void {
    this.#components[key] = value
  }

  /**
   * 删除单个组件
   * @param key - 组件键名
   * @example
   * ```typescript
   * globalShareState.removeComponent('modal')
   * ```
   */
  removeComponent(key: string): void {
    delete this.#components[key]
  }

  /**
   * 清空所有组件
   * @example
   * ```typescript
   * globalShareState.clearComponents()
   * ```
   */
  clearComponents(): void {
    this.#components = {}
  }

  /**
   * 清空所有消息配置
   * @example
   * ```typescript
   * globalShareState.clearMessage()
   * ```
   */
  clearMessage(): void {
    this.#message = {}
  }

  /**
   * 重置所有状态
   * @example
   * ```typescript
   * globalShareState.reset()
   * ```
   */
  reset(): void {
    this.#components = {}
    this.#message = {}
  }
}

/**
 * 全局共享状态单例实例
 * @description 导出的单例实例，在整个应用中共享
 * @example
 * ```typescript
 * import { globalShareState } from '@admin-core/shared'
 * 
 * // 使用全局状态
 * globalShareState.setComponent('modal', ModalComponent)
 * const modal = globalShareState.getComponent('modal')
 * ```
 */
export const globalShareState = new GlobalShareState()
