import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@admin-core/composables': resolve(__dirname, '../../packages/composables/src/index.ts'),
      
    },
  },
  server: {
    port: 3008,
  },
})