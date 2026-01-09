import { defineConfig } from 'tsup'

export default defineConfig({
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
  external: ['vue', '@iconify/vue'],
  tsconfig: './tsconfig.json',
})
