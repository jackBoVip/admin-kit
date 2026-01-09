# 类型定义导出说明

所有 Admin Kit 包都完整支持 TypeScript 类型定义导出。

## 📦 类型定义文件

每个包都会生成完整的类型定义文件：

### tsup 构建的包（shared, icons, composables）
- `dist/index.d.ts` - ESM 模块类型定义
- `dist/index.d.cts` - CommonJS 模块类型定义

### vite 构建的包（ui, layouts）
- `dist/index.d.ts` - 类型定义
- `dist/index.d.ts.map` - 类型定义 sourcemap

## 🔧 package.json 配置

每个包的 `package.json` 都正确配置了类型导出：

```json
{
  "type": "module",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

### 配置说明

1. **顶层 `types` 字段**：为旧版 TypeScript 和工具提供兼容性
2. **exports 中的 `types` 字段**：现代 TypeScript 和 Node.js 的标准方式
3. **types 字段排在最前**：确保 TypeScript 优先解析类型定义

## 💡 使用示例

### 1. 基础使用

```typescript
// 自动获得完整的类型支持
import { APP_NAME, noop } from '@admin-kit/shared'
import { Icon } from '@admin-kit/icons'
import { useToggle } from '@admin-kit/composables'

// TypeScript 会自动推断类型
const name: string = APP_NAME
const toggle = useToggle(false)
```

### 2. 导入类型

```typescript
// 从 shared 包导入类型
import type { SomeType } from '@admin-kit/shared'

// 从 composables 包导入类型
import type { UseToggleReturn } from '@admin-kit/composables'

// 使用导入的类型
const myValue: SomeType = { /* ... */ }
const toggle: UseToggleReturn = useToggle(false)
```

### 3. Vue 组件类型

```typescript
import { Icon } from '@admin-kit/icons'
import type { Component } from 'vue'

// Icon 组件会有完整的 props 类型提示
const IconComponent: Component = Icon
```

### 4. 在 Vue SFC 中使用

```vue
<script setup lang="ts">
import { Icon } from '@admin-kit/icons'
import { useToggle } from '@admin-kit/composables'

// 自动获得类型推断和智能提示
const [isOpen, toggle] = useToggle(false)
</script>

<template>
  <Icon icon="mdi:home" />
  <button @click="toggle">Toggle: {{ isOpen }}</button>
</template>
```

## 🎯 TypeScript 配置建议

在你的项目 `tsconfig.json` 中：

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // 或 "node16", "nodenext"
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": false,  // 启用类型检查
    "strict": true
  }
}
```

## ✅ 类型检查验证

所有包都经过严格的 TypeScript 类型检查：

```bash
# 构建时自动进行类型检查
pnpm build

# 单独运行类型检查
pnpm --filter @admin-kit/shared build
```

## 📝 类型定义覆盖

| 包 | 类型定义 | 导出方式 |
|---|---|---|
| @admin-kit/shared | ✅ 完整 | ESM + CJS |
| @admin-kit/icons | ✅ 完整 | ESM + CJS |
| @admin-kit/design | ✅ 完整 | ESM + CJS |
| @admin-kit/composables | ✅ 完整 | ESM + CJS |
| @admin-kit/ui | ✅ 完整 | ESM + CJS + UMD |
| @admin-kit/layouts | ✅ 完整 | ESM + CJS + UMD |

## 🔍 IDE 支持

所有主流 IDE 都能正确识别类型定义：

- ✅ **VS Code**：完整的智能提示和类型检查
- ✅ **WebStorm**：完整的智能提示和类型检查
- ✅ **Sublime Text**（with LSP）：基础类型支持
- ✅ **Vim/Neovim**（with LSP）：基础类型支持

## 🐛 类型问题排查

如果遇到类型无法识别的问题：

1. **清理缓存**：
```bash
# 删除 node_modules 和 lockfile
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

2. **重新构建**：
```bash
pnpm build
```

3. **检查 TypeScript 版本**：
```bash
# 确保使用 TypeScript 5.0+
pnpm list typescript
```

4. **检查 moduleResolution**：
确保 `tsconfig.json` 中的 `moduleResolution` 设置正确。

## 📚 相关资源

- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [Node.js Package Exports](https://nodejs.org/api/packages.html#exports)
- [tsup Documentation](https://tsup.egoist.dev/)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
