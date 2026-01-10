/**
 * Vue Composables for Theme System
 */

import { ref, computed, readonly, onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'
import type {
  ThemeMode,
  ThemeVariant,
  ThemeConfig,
  ThemeState,
  ThemeChangeOptions,
  UseThemeReturn,
  ThemeMetadata,
} from './types'
import {
  initTheme,
  applyTheme,
  toggleDarkMode as utilToggleDarkMode,
  getAvailableThemes,
  getThemeMetadata,
  watchSystemTheme,
} from './utils'

/**
 * 全局主题状态
 */
const globalThemeState = ref<ThemeState>({
  mode: 'light',
  variant: 'default',
  isChanging: false,
})

/**
 * 是否已初始化
 */
let isInitialized = false

/**
 * 系统主题监听器清理函数
 */
let cleanupSystemThemeWatcher: (() => void) | null = null

/**
 * 使用主题系统
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useTheme } from '@admin-core/design'
 * 
 * const { mode, variant, isDark, setMode, setVariant, toggleDarkMode } = useTheme()
 * </script>
 * 
 * <template>
 *   <div>
 *     <p>当前模式: {{ mode }}</p>
 *     <p>当前主题: {{ variant }}</p>
 *     <button @click="toggleDarkMode()">切换暗色模式</button>
 *     <button @click="setVariant('violet')">切换到紫色主题</button>
 *   </div>
 * </template>
 * ```
 */
export function useTheme(): UseThemeReturn {
  // 初始化主题（只在第一次调用时执行）
  if (!isInitialized && typeof window !== 'undefined') {
    const config = initTheme()
    globalThemeState.value = {
      mode: config.mode,
      variant: config.variant,
      isChanging: false,
    }
    isInitialized = true
  }
  
  // 计算属性
  const mode = computed(() => globalThemeState.value.mode)
  const variant = computed(() => globalThemeState.value.variant)
  const isDark = computed(() => globalThemeState.value.mode === 'dark')
  const isChanging = computed(() => globalThemeState.value.isChanging)
  
  /**
   * 设置主题模式
   */
  const setMode = (newMode: ThemeMode, changeOptions: ThemeChangeOptions = {}) => {
    globalThemeState.value.isChanging = true
    
    applyTheme({ mode: newMode }, changeOptions)
    globalThemeState.value.mode = newMode
    
    setTimeout(() => {
      globalThemeState.value.isChanging = false
    }, 300)
  }
  
  /**
   * 设置主题变体
   */
  const setVariant = (newVariant: ThemeVariant, changeOptions: ThemeChangeOptions = {}) => {
    globalThemeState.value.isChanging = true
    
    applyTheme({ variant: newVariant }, changeOptions)
    globalThemeState.value.variant = newVariant
    
    setTimeout(() => {
      globalThemeState.value.isChanging = false
    }, 300)
  }
  
  /**
   * 切换暗色模式
   */
  const toggleDarkMode = (changeOptions: ThemeChangeOptions = {}) => {
    const newMode = utilToggleDarkMode(changeOptions)
    globalThemeState.value.mode = newMode
  }
  
  /**
   * 设置完整主题
   */
  const setTheme = (config: Partial<ThemeConfig>, changeOptions: ThemeChangeOptions = {}) => {
    globalThemeState.value.isChanging = true
    
    applyTheme(config, changeOptions)
    
    if (config.mode) {
      globalThemeState.value.mode = config.mode
    }
    if (config.variant) {
      globalThemeState.value.variant = config.variant
    }
    
    setTimeout(() => {
      globalThemeState.value.isChanging = false
    }, 300)
  }
  
  /**
   * 获取当前主题元数据
   */
  const getCurrentThemeMetadata = (): ThemeMetadata | undefined => {
    return getThemeMetadata(globalThemeState.value.variant)
  }
  
  return {
    theme: globalThemeState.value,
    mode: mode.value,
    variant: variant.value,
    isDark: isDark.value,
    isChanging: isChanging.value,
    setMode,
    setVariant,
    toggleDarkMode,
    setTheme,
    getAvailableThemes,
    getCurrentThemeMetadata,
  }
}

/**
 * 使用系统主题偏好
 * 自动跟随系统主题变化
 * 
 * @param enabled - 是否启用系统主题跟随
 * 
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useSystemTheme } from '@admin-core/design'
 * 
 * const followSystem = ref(true)
 * useSystemTheme(followSystem)
 * </script>
 * ```
 */
export function useSystemTheme(enabled: Ref<boolean> = ref(true)): void {
  const { setMode } = useTheme()
  
  const startWatching = () => {
    if (cleanupSystemThemeWatcher) {
      cleanupSystemThemeWatcher()
    }
    
    cleanupSystemThemeWatcher = watchSystemTheme((systemMode) => {
      if (enabled.value) {
        setMode(systemMode, { transition: true, persist: false })
      }
    })
  }
  
  const stopWatching = () => {
    if (cleanupSystemThemeWatcher) {
      cleanupSystemThemeWatcher()
      cleanupSystemThemeWatcher = null
    }
  }
  
  // 监听 enabled 变化
  watch(
    enabled,
    (isEnabled) => {
      if (isEnabled) {
        startWatching()
      } else {
        stopWatching()
      }
    },
    { immediate: true }
  )
  
  // 组件卸载时清理
  onUnmounted(() => {
    stopWatching()
  })
}

/**
 * 使用主题颜色
 * 获取当前主题的颜色值
 * 
 * @param token - 颜色令牌名称
 * @returns 颜色值（HSL 格式）
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useThemeColor } from '@admin-core/design'
 * 
 * const primaryColor = useThemeColor('primary')
 * const backgroundColor = useThemeColor('background')
 * </script>
 * 
 * <template>
 *   <div :style="{ backgroundColor: backgroundColor, color: primaryColor }">
 *     自定义颜色
 *   </div>
 * </template>
 * ```
 */
export function useThemeColor(token: string): Ref<string> {
  const color = ref('')
  
  const updateColor = () => {
    if (typeof window === 'undefined') return
    
    const html = document.documentElement
    const value = getComputedStyle(html).getPropertyValue(`--${token}`).trim()
    
    // 如果是 HSL 格式（不带 hsl()），添加包装
    if (value && !value.startsWith('hsl')) {
      color.value = `hsl(${value})`
    } else {
      color.value = value
    }
  }
  
  onMounted(() => {
    updateColor()
    
    // 监听主题变化
    const observer = new MutationObserver(() => {
      updateColor()
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })
    
    onUnmounted(() => {
      observer.disconnect()
    })
  })
  
  return readonly(color)
}

/**
 * 使用主题过渡
 * 在主题切换时添加过渡效果
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useThemeTransition } from '@admin-core/design'
 * 
 * const { isTransitioning } = useThemeTransition()
 * </script>
 * 
 * <template>
 *   <div :class="{ 'theme-transitioning': isTransitioning }">
 *     内容
 *   </div>
 * </template>
 * ```
 */
export function useThemeTransition() {
  const { isChanging } = useTheme()
  
  return {
    isTransitioning: isChanging,
  }
}
