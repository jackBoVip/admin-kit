import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 3001,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      // Force runtime-only Vue build to avoid compiler issues
      'vue': 'vue/dist/vue.runtime.esm-bundler.js',
    },
  },
});
