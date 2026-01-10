/**
 * 支持的语言类型
 * 
 * @description
 * 定义系统支持的所有语言环境
 * 
 * @example
 * ```ts
 * const locale: Locale = 'zh-CN'
 * const locale2: Locale = 'en-US'
 * ```
 */
export type Locale = 'en-US' | 'zh-CN';

/**
 * 国际化消息字典
 * 
 * @description
 * 包含所有支持语言的翻译文本，使用 ESNext 最新特性
 * 
 * @remarks
 * 当前支持的语言：
 * - zh-CN: 简体中文
 * - en-US: 美式英语
 * 
 * @example
 * ```ts
 * // 获取中文翻译
 * const zhMessages = messages['zh-CN']
 * console.log(zhMessages.confirm) // '确认'
 * 
 * // 获取英文翻译
 * const enMessages = messages['en-US']
 * console.log(enMessages.confirm) // 'Confirm'
 * ```
 */
export const messages: Record<Locale, Record<string, string>> = {
  'en-US': {
    cancel: 'Cancel',
    collapse: 'Collapse',
    confirm: 'Confirm',
    expand: 'Expand',
    prompt: 'Prompt',
    reset: 'Reset',
    submit: 'Submit',
  },
  'zh-CN': {
    cancel: '取消',
    collapse: '收起',
    confirm: '确认',
    expand: '展开',
    prompt: '提示',
    reset: '重置',
    submit: '提交',
  },
};

/**
 * 获取指定语言的消息字典
 * 
 * @description
 * 根据语言环境返回对应的翻译文本字典，使用 ESNext 最新特性
 * 
 * @param locale - 语言环境标识符
 * @returns 该语言环境的消息字典
 * 
 * @example
 * ```ts
 * // 获取中文消息
 * const zhMessages = getMessages('zh-CN')
 * console.log(zhMessages.cancel) // '取消'
 * 
 * // 获取英文消息
 * const enMessages = getMessages('en-US')
 * console.log(enMessages.cancel) // 'Cancel'
 * 
 * // 动态获取
 * const currentLocale: Locale = 'zh-CN'
 * const messages = getMessages(currentLocale)
 * console.log(messages.confirm) // '确认'
 * ```
 */
export const getMessages = (locale: Locale) => messages[locale];
