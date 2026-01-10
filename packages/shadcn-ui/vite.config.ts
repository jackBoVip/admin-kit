import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

/**
 * Vite 配置
 * 
 * @description
 * 使用 ESNext 和 Vue 3 最新特性构建 UI 组件库
 */
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'AdminKitUI',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'index.js'
        if (format === 'cjs') return 'index.cjs'
        return 'index.umd.js'
      },
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core', 'reka-ui', 'lucide-vue-next', '@admin-core/composables', '@admin-core/icons', '@admin-core/shared'],
      output: {
        globals: {
          vue: 'Vue',
          '@vueuse/core': 'VueUse',
          'reka-ui': 'RekaUI',
          'lucide-vue-next': 'LucideVueNext',
          '@admin-core/composables': 'AdminCoreComposables',
          '@admin-core/icons': 'AdminCoreIcons',
          '@admin-core/shared': 'AdminCoreShared',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name || ''
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
})
