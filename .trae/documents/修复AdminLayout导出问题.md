## 问题分析

通过分析代码结构和构建配置，我发现了AdminLayout组件导出异常的根本原因：

1. **源码导出结构正确**：
   - `src/layout/exports.ts` 正确导出了 `AdminLayout` 作为命名导出
   - `src/layout/index.ts` 通过 `export * from './exports'` 重新导出
   - `src/index.ts` 通过 `export * from './layout'` 重新导出到主入口

2. **构建配置问题**：
   - `vite.config.ts` 中设置了 `preserveModules: true` 和 `preserveModulesRoot: 'src'`
   - 这导致Rollup保留了每个模块的独立文件结构
   - 但主入口文件 `index.mjs` 只导入了模块，没有正确将它们作为命名导出导出

3. **现象**：
   - 这导致 `import { AdminLayout } from '@admin-core/layouts'` 语法报错
   - 只有 `import AdminLayout from '@admin-core/layouts'` 可以工作

## 解决方案

修改 `packages/layouts/vite.config.ts` 文件，将 `preserveModules` 设置为 `false`，这样Rollup会将所有导出合并到主入口文件中，确保正确的命名导出：

```typescript
// vite.config.ts
// 修改前
rollupOptions: {
  external: ['vue'],
  output: {
    exports: 'named',
    globals: {
      vue: 'Vue',
    },
    // 确保每个入口点都有自己的命名空间
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
}

// 修改后
rollupOptions: {
  external: ['vue'],
  output: {
    exports: 'named',
    globals: {
      vue: 'Vue',
    },
    // 关闭preserveModules，让Rollup合并导出到主入口
    preserveModules: false,
  },
}
```

## 预期效果

- 修复后，`import { AdminLayout } from '@admin-core/layouts'` 语法将正常工作
- 同时保留 `import AdminLayout from '@admin-core/layouts'` 的兼容性
- 确保所有组件都能正确通过命名导出方式导入

## 实施步骤

1. 修改 `packages/layouts/vite.config.ts` 文件
2. 重新构建 `layouts` 包
3. 验证导入语法是否正常工作