import { defineConfig } from 'tsup'

const externalDeps = [
  'clsx',
  'tailwind-merge',
  'es-toolkit',
  'es-toolkit/compat',
  'lodash.clonedeep',
  'nprogress',
  'dayjs',
  'defu',
  '@vue/shared',
]

export default defineConfig([
  // ESM and CJS builds with multiple entry points
  {
    entry: {
      index: 'src/index.ts',
      cache: 'src/cache/index.ts',
      color: 'src/color/index.ts',
      constants: 'src/constants/index.ts',
      types: 'src/types/common.ts',
      utils: 'src/utils/index.ts',
    },
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
    tsconfig: './tsconfig.json',
    external: externalDeps,
  },
  // UMD build for CDN (main entry only)
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    outExtension: () => ({ js: '.umd.js' }),
    globalName: 'AdminCoreShared',
    clean: false,
    splitting: false,
    sourcemap: true,
    minify: false,
    tsconfig: './tsconfig.json',
    external: externalDeps,
    esbuildOptions(options) {
      options.banner = {
        js: '/* @admin-core/shared - MIT License */',
      }
    },
  },
  // UMD minified build for CDN (main entry only)
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    outExtension: () => ({ js: '.umd.min.js' }),
    globalName: 'AdminCoreShared',
    clean: false,
    splitting: false,
    sourcemap: true,
    minify: true,
    tsconfig: './tsconfig.json',
    external: externalDeps,
    esbuildOptions(options) {
      options.banner = {
        js: '/* @admin-core/shared - MIT License */',
      }
    },
  },
])
