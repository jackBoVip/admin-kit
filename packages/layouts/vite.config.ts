import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Force runtime-only Vue build
      vue: 'vue/dist/vue.runtime.esm-bundler.js',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AdminKitLayouts',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'index.js'
        if (format === 'cjs') return 'index.cjs'
        return 'index.umd.js'
      },
    },
    rollupOptions: {
      external: ['vue', '@admin-kit/ui', '@admin-kit/composables', '@admin-core/ui', '@admin-core/composables', '@admin-core/shared', '@admin-core/icons', 'vee-validate', 'zod'],
      output: {
        globals: {
          vue: 'Vue',
          '@admin-kit/ui': 'AdminKitUI',
          '@admin-kit/composables': 'AdminKitComposables',
          '@admin-core/ui': 'AdminCoreUI',
          '@admin-core/composables': 'AdminCoreComposables',
          '@admin-core/shared': 'AdminCoreShared',
          '@admin-core/icons': 'AdminCoreIcons',
          'vee-validate': 'VeeValidate',
          'zod': 'Zod',
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
