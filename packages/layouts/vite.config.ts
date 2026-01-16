import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

/**
 * Vite 配置（library mode）
 *
 * @description
 * 输出 ES/CJS/UMD，便于 npm 与 CDN（unpkg/jsdelivr）使用
 */
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'AdminKitLayouts',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'index.js'
        if (format === 'cjs') return 'index.cjs'
        return 'index.umd.js'
      },
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'vee-validate',
        '@vee-validate/zod',
        'zod',
        'zod-defaults',
        '@admin-core/ui',
        '@admin-core/composables',
        '@admin-core/icons',
        '@admin-core/shared',
        '@admin-core/shared/constants',
        '@admin-core/shared/types',
      ],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          '@vueuse/core': 'VueUse',
          'vee-validate': 'VeeValidate',
          '@vee-validate/zod': 'VeeValidateZod',
          zod: 'zod',
          'zod-defaults': 'zodDefaults',
          '@admin-core/ui': 'AdminCoreUI',
          '@admin-core/composables': 'AdminCoreComposables',
          '@admin-core/icons': 'AdminCoreIcons',
          '@admin-core/shared': 'AdminCoreShared',
          '@admin-core/shared/constants': 'AdminCoreShared',
          '@admin-core/shared/types': 'AdminCoreShared',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'style.css'
          return assetInfo.name || ''
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
})

