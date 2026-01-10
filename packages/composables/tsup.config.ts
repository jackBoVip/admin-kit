import { defineConfig } from 'tsup'

export default defineConfig([
  // ESM and CJS builds
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: {
      resolve: true,
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
    clean: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    external: ['vue', '@vueuse/core'],
    tsconfig: './tsconfig.json',
  },
  // UMD build for CDN
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    outExtension: () => ({ js: '.umd.js' }),
    globalName: 'AdminCoreComposables',
    clean: false,
    splitting: false,
    sourcemap: true,
    minify: false,
    external: ['vue'],
    tsconfig: './tsconfig.json',
    esbuildOptions(options) {
      options.banner = {
        js: '/* @admin-core/composables - MIT License */',
      }
    },
  },
  // UMD minified build for CDN
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    outExtension: () => ({ js: '.umd.min.js' }),
    globalName: 'AdminCoreComposables',
    clean: false,
    splitting: false,
    sourcemap: true,
    minify: true,
    external: ['vue'],
    tsconfig: './tsconfig.json',
    esbuildOptions(options) {
      options.banner = {
        js: '/* @admin-core/composables - MIT License */',
      }
    },
  },
])
