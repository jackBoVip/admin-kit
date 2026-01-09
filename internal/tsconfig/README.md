# @admin-kit/tsconfig

admin-kit monorepo 的共享 TypeScript 配置。

## 概述

本包提供了一组可复用的 TypeScript 配置文件，确保 monorepo 中所有包的编译选项和类型检查保持一致。所有配置都使用最新的 ECMAScript 特性（ESNext）和 TypeScript 5.0+ 严格模式选项。

## 可用配置

### base.json

现代 TypeScript 设置的基础配置。

**特性：**
- Target: ESNext（最新 JavaScript 特性）
- 严格模式：启用所有严格类型检查选项
- TypeScript 5.0+ 特性：`verbatimModuleSyntax`、`useUnknownInCatchVariables`、`exactOptionalPropertyTypes`、`noImplicitOverride`
- 增强的安全检查：`noPropertyAccessFromIndexSignature`、`allowUnreachableCode: false`
- 模块解析：Bundler 模式，适配现代构建工具
- 排除：node_modules、dist、测试文件、.turbo 缓存

**适用场景：** 需要基础配置进行自定义设置时使用。

### library.json

针对库包优化的配置。

**特性：**
- 继承：`base.json`
- 项目引用：`composite: true`
- 声明文件：生成 `.d.ts` 和 `.d.ts.map` 文件
- Types：空数组（避免类型污染）

**适用场景：** 构建任何 TypeScript 库包（工具库、组件等）。

### vue.json

针对 Vue 3 组件库优化的配置。

**特性：**
- 继承：`library.json`
- JSX：`preserve` 模式，使用 Vue 作为导入源
- 库：ESNext + DOM + DOM.Iterable
- Types：Node（构建工具）+ vite/client（Vite 环境）
- 允许导入 `.vue` 文件
- 不生成输出（由 Vite 处理编译）

**适用场景：** 构建 Vue 3 组件库或 UI 包。

## 使用方法

### 标准库包

在包根目录创建 `tsconfig.json`：

```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

> **注意：** 你必须在项目的 tsconfig.json 中指定 `outDir` 和 `rootDir`，因为不同项目可能有不同的目录结构。

### Vue 组件库

对于 Vue 3 组件库：

```json
{
  "extends": "@admin-kit/tsconfig/vue.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

> **注意：** Vue 项目也需要根据其结构指定 `outDir` 和 `rootDir`。

### 自定义配置

你可以扩展任何配置并覆盖特定选项：

```json
{
  "extends": "@admin-kit/tsconfig/base.json",
  "compilerOptions": {
    "target": "ES2022",
    "outDir": "./build",
    "lib": ["ESNext", "DOM"],
    "types": ["node"],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["**/*.test.ts"]
}
```

### 不同库类型的配置

**纯工具库（无 DOM）：**
```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "compilerOptions": {
    "lib": ["ESNext"]
  }
}
```

**浏览器库（需要 DOM）：**
```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "compilerOptions": {
    "lib": ["ESNext", "DOM", "DOM.Iterable"]
  }
}
```

**Node.js 库：**
```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "compilerOptions": {
    "lib": ["ESNext"],
    "types": ["node"]
  }
}
```

## 配置继承关系

```
base.json（基础）
    ├── library.json（库设置）
    └── vue.json（Vue 组件库）
```

简单灵活：
- **TypeScript 库？** → 使用 `library.json`
- **Vue 组件库？** → 使用 `vue.json`
- **自定义需求？** → 扩展 `base.json`

## 关键编译选项

### 严格类型检查

所有配置都启用了全面的严格模式：

- `strict: true` - 启用所有严格类型检查选项
- `strictNullChecks: true` - 严格的 null 和 undefined 检查
- `strictFunctionTypes: true` - 严格的函数类型检查
- `noImplicitThis: true` - 禁止隐式 `this` 类型
- `useUnknownInCatchVariables: true` - catch 变量使用 `unknown` 而非 `any`
- `exactOptionalPropertyTypes: true` - 精确的可选属性类型
- `noImplicitOverride: true` - 要求显式使用 `override` 关键字

### 代码质量

- `noUnusedLocals: true` - 检测未使用的局部变量
- `noUnusedParameters: true` - 检测未使用的函数参数
- `noImplicitReturns: true` - 检测缺失的返回语句
- `noFallthroughCasesInSwitch: true` - 检测 switch 穿透
- `noUncheckedIndexedAccess: true` - 为索引签名添加 undefined
- `noPropertyAccessFromIndexSignature: true` - 索引签名属性需要使用括号访问
- `allowUnreachableCode: false` - 禁止不可达代码
- `allowUnusedLabels: false` - 禁止未使用的标签

### 现代特性

- `target: "ESNext"` - 使用最新的 JavaScript 特性
- `module: "ESNext"` - 使用 ES 模块
- `moduleResolution: "Bundler"` - 现代打包工具解析模式
- `verbatimModuleSyntax: true` - 精确的模块语法（TypeScript 5.0+）
- `isolatedModules: true` - 确保每个文件可以独立转译

## 最佳实践

### 1. 从 library.json 开始

对于大多数包，`library.json` 提供了你需要的一切：

```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "include": ["src"]
}
```

### 2. 仅在需要时覆盖

只在需要自定义时添加编译选项：

```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "compilerOptions": {
    "lib": ["ESNext", "DOM"]  // 为浏览器 API 添加 DOM
  }
}
```

### 3. 使用项目引用

对于大型 monorepo，使用 TypeScript 项目引用（已通过 `composite: true` 启用）：

```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "references": [
    { "path": "../other-package" }
  ]
}
```

### 4. 路径别名

在包的 `tsconfig.json` 中定义路径别名：

```json
{
  "extends": "@admin-kit/tsconfig/library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}
```

## 故障排除

### 找不到配置

如果 TypeScript 找不到配置：

1. 确保 `@admin-kit/tsconfig` 在你的 `package.json` 依赖中
2. 运行 `pnpm install` 来链接 workspace 包
3. 检查 `extends` 中的路径是否正确

### 更新后出现类型错误

严格配置可能会暴露之前隐藏的类型错误：

1. 仔细查看错误信息
2. 修复类型问题而不是禁用检查
3. 谨慎使用类型断言，仅在必要时使用

### 构建性能

如果构建速度慢：

1. 使用 `skipLibCheck: true`（已启用）
2. 启用增量构建：`"incremental": true`
3. 对大型 monorepo 使用项目引用

## 维护

### 更新配置

更新共享配置时：

1. 先在单个包中测试更改
2. 在变更日志中记录破坏性更改
3. 使用新选项或模式更新此 README
4. 考虑向后兼容性

### 版本兼容性

- TypeScript: ^5.9.3
- Node.js: >=24.12.0

## 许可证

仅供 admin-kit monorepo 内部使用的私有包。
