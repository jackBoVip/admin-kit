import type { Locale } from './messages';

import { computed, ref } from 'vue';

import { createSharedComposable } from '@vueuse/core';

import { getMessages } from './messages';

/**
 * 简单国际化组合式函数
 * 
 * @description
 * 提供轻量级的国际化功能，支持语言切换和文本翻译，使用 ESNext 最新特性
 * 
 * @remarks
 * 特性：
 * - 🌍 支持多语言切换（中文/英文）
 * - 🔄 响应式语言状态
 * - 📦 共享状态（所有组件使用同一个实例）
 * - 🎯 简单易用的 API
 * - 🚀 基于 Vue 3 Composition API
 * 
 * 注意事项：
 * - 使用 createSharedComposable 确保全局单例
 * - 当翻译键不存在时，返回键本身作为后备
 * - 默认语言为简体中文（zh-CN）
 * 
 * @returns 国际化工具对象
 * @returns $t - 翻译函数（计算属性）
 * @returns currentLocale - 当前语言环境（响应式）
 * @returns setSimpleLocale - 设置语言环境的方法
 * 
 * @example
 * 基础使用
 * ```ts
 * import { useSimpleLocale } from '@admin-core/composables'
 * 
 * const { $t, currentLocale, setSimpleLocale } = useSimpleLocale()
 * 
 * // 获取翻译文本
 * console.log($t.value('confirm')) // '确认'
 * console.log($t.value('cancel'))  // '取消'
 * 
 * // 切换语言
 * setSimpleLocale('en-US')
 * console.log($t.value('confirm')) // 'Confirm'
 * console.log($t.value('cancel'))  // 'Cancel'
 * 
 * // 查看当前语言
 * console.log(currentLocale.value) // 'en-US'
 * ```
 * 
 * @example
 * 在 Vue 组件中使用
 * ```vue
 * <script setup lang="ts">
 * import { useSimpleLocale } from '@admin-core/composables'
 * 
 * const { $t, currentLocale, setSimpleLocale } = useSimpleLocale()
 * 
 * const toggleLanguage = () => {
 *   const newLocale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
 *   setSimpleLocale(newLocale)
 * }
 * </script>
 * 
 * <template>
 *   <div>
 *     <button @click="toggleLanguage">
 *       {{ currentLocale === 'zh-CN' ? '切换到英文' : 'Switch to Chinese' }}
 *     </button>
 *     
 *     <div>
 *       <button>{{ $t('confirm') }}</button>
 *       <button>{{ $t('cancel') }}</button>
 *       <button>{{ $t('reset') }}</button>
 *     </div>
 *     
 *     <p>当前语言: {{ currentLocale }}</p>
 *   </div>
 * </template>
 * ```
 * 
 * @example
 * 处理不存在的翻译键
 * ```ts
 * const { $t } = useSimpleLocale()
 * 
 * // 存在的键
 * console.log($t.value('confirm')) // '确认'
 * 
 * // 不存在的键（返回键本身作为后备）
 * console.log($t.value('unknown_key')) // 'unknown_key'
 * ```
 * 
 * @example
 * 跨组件共享状态
 * ```ts
 * // ComponentA.vue
 * import { useSimpleLocale } from '@admin-core/composables'
 * 
 * const { setSimpleLocale } = useSimpleLocale()
 * setSimpleLocale('en-US')
 * 
 * // ComponentB.vue
 * import { useSimpleLocale } from '@admin-core/composables'
 * 
 * const { currentLocale } = useSimpleLocale()
 * console.log(currentLocale.value) // 'en-US' (与 ComponentA 共享状态)
 * ```
 * 
 * @example
 * 监听语言变化
 * ```ts
 * import { watch } from 'vue'
 * import { useSimpleLocale } from '@admin-core/composables'
 * 
 * const { currentLocale, setSimpleLocale } = useSimpleLocale()
 * 
 * watch(currentLocale, (newLocale, oldLocale) => {
 *   console.log(`语言从 ${oldLocale} 切换到 ${newLocale}`)
 *   // 可以在这里执行其他操作，如保存到 localStorage
 *   localStorage.setItem('locale', newLocale)
 * })
 * 
 * setSimpleLocale('en-US')
 * // 输出: 语言从 zh-CN 切换到 en-US
 * ```
 * 
 * @example
 * 结合 localStorage 持久化
 * ```ts
 * import { useSimpleLocale } from '@admin-core/composables'
 * 
 * const { currentLocale, setSimpleLocale } = useSimpleLocale()
 * 
 * // 初始化时从 localStorage 读取
 * const savedLocale = localStorage.getItem('locale') as Locale | null
 * if (savedLocale) {
 *   setSimpleLocale(savedLocale)
 * }
 * 
 * // 切换语言并保存
 * const changeLanguage = (locale: Locale) => {
 *   setSimpleLocale(locale)
 *   localStorage.setItem('locale', locale)
 * }
 * ```
 */
export const useSimpleLocale = createSharedComposable(() => {
  /**
   * 当前语言环境
   * 
   * @description
   * 响应式的语言环境状态，默认为简体中文
   * 
   * @default 'zh-CN'
   */
  const currentLocale = ref<Locale>('zh-CN');

  /**
   * 设置语言环境
   * 
   * @description
   * 切换当前的语言环境，会触发所有使用 $t 的地方重新计算
   * 
   * @param locale - 要设置的语言环境
   * 
   * @example
   * ```ts
   * // 切换到英文
   * setSimpleLocale('en-US')
   * 
   * // 切换到中文
   * setSimpleLocale('zh-CN')
   * ```
   */
  const setSimpleLocale = (locale: Locale) => {
    currentLocale.value = locale;
  };

  /**
   * 翻译函数
   * 
   * @description
   * 计算属性，返回一个翻译函数，根据当前语言环境返回对应的翻译文本
   * 
   * @remarks
   * - 当翻译键存在时，返回对应的翻译文本
   * - 当翻译键不存在时，返回键本身作为后备
   * - 语言切换时会自动重新计算
   * 
   * @returns 翻译函数，接收翻译键，返回翻译文本
   * 
   * @example
   * ```ts
   * // 使用翻译函数
   * const text = $t.value('confirm')
   * 
   * // 在模板中使用
   * <button>{{ $t('submit') }}</button>
   * ```
   */
  const $t = computed(() => {
    const localeMessages = getMessages(currentLocale.value);
    return (key: string) => {
      return localeMessages[key] || key;
    };
  });

  return {
    /**
     * 翻译函数（计算属性）
     * 
     * @description
     * 根据当前语言环境返回翻译文本的函数
     * 
     * @example
     * ```ts
     * $t.value('confirm') // '确认' 或 'Confirm'
     * ```
     */
    $t,

    /**
     * 当前语言环境（响应式）
     * 
     * @description
     * 当前激活的语言环境标识符
     * 
     * @example
     * ```ts
     * console.log(currentLocale.value) // 'zh-CN'
     * ```
     */
    currentLocale,

    /**
     * 设置语言环境
     * 
     * @description
     * 切换当前的语言环境
     * 
     * @example
     * ```ts
     * setSimpleLocale('en-US')
     * ```
     */
    setSimpleLocale,
  };
});
