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
    tsconfig: './tsconfig.json',
  },
  // UMD build for CDN
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
    esbuildOptions(options) {
      options.banner = {
        js: '/* @admin-core/shared - MIT License */',
      }
    },
  },
  // UMD minified build for CDN
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
    esbuildOptions(options) {
      options.banner = {
        js: '/* @admin-core/shared - MIT License */',
      }
    },
  },
])
