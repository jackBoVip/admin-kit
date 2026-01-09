# 依赖管理说明

## 📦 依赖结构

Admin Kit 采用 monorepo 架构，使用 pnpm workspace 管理依赖。

### 依赖提升策略

所有 **devDependencies** 都提升到根目录的 `package.json` 中，各包只保留：
- `dependencies` - 运行时依赖
- `peerDependencies` - 对等依赖

## 🎯 优势

### 1. 减少重复安装
- 所有包共享同一份开发依赖
- 节省磁盘空间
- 减少 `node_modules` 体积

### 2. 统一版本管理
- 所有包使用相同版本的构建工具
- 避免版本冲突
- 便于统一升级

### 3. 简化配置
- 各包的 `package.json` 更简洁
- 只关注运行时依赖
- 减少维护成本

### 4. 加快安装速度
- pnpm 只需安装一次开发依赖
- 利用硬链接共享文件
- 提升 CI/CD 效率

## 📋 依赖分类

### 根目录 devDependencies

```json
{
  "devDependencies": {
    "@admin-kit/tsconfig": "workspace:*",
    "@changesets/cli": "catalog:",
    "@vitejs/plugin-vue": "catalog:",
    "prettier": "catalog:",
    "sass": "catalog:",
    "tsup": "catalog:",
    "turbo": "catalog:",
    "typescript": "catalog:",
    "unbuild": "catalog:",
    "vite": "catalog:",
    "vite-enhance": "catalog:",
    "vue": "catalog:",
    "vue-tsc": "^2.2.0"
  }
}
```

### 包级别依赖

#### @admin-kit/shared
```json
{
  "dependencies": {},
  "peerDependencies": {}
}
```

#### @admin-kit/icons
```json
{
  "dependencies": {
    "@iconify/vue": "catalog:"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  }
}
```

#### @admin-kit/design
```json
{
  "dependencies": {},
  "peerDependencies": {}
}
```

#### @admin-kit/composables
```json
{
  "dependencies": {
    "@vueuse/core": "catalog:"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  }
}
```

#### @admin-kit/ui
```json
{
  "dependencies": {
    "@admin-kit/design": "workspace:*",
    "@admin-kit/icons": "workspace:*"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  }
}
```

#### @admin-kit/layouts
```json
{
  "dependencies": {
    "@admin-kit/ui": "workspace:*",
    "@admin-kit/composables": "workspace:*"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  }
}
```

## 🔧 Catalog 版本管理

使用 pnpm catalog 统一管理依赖版本：

```yaml
# pnpm-workspace.yaml
catalog:
  turbo: ^2.7.3
  prettier: ^3.7.4
  typescript: ^5.9.3
  vite: ^7.3.1
  unbuild: ^3.6.1
  tsup: ^8.3.5
  sass: ^1.97.1
  vue: ^3.5.13
  "@vitejs/plugin-vue": ^6.0.1
  "@changesets/cli": ^2.29.8
  "@iconify/vue": ^5.0.0
  "@vueuse/core": ^14.1.0
```

### Catalog 优势

1. **集中管理**：所有版本号在一个地方定义
2. **引用简单**：使用 `"catalog:"` 引用
3. **统一升级**：修改一处，所有包同步更新
4. **避免冲突**：确保版本一致性

## 📦 Workspace 协议

内部包之间使用 `workspace:*` 协议：

```json
{
  "dependencies": {
    "@admin-kit/design": "workspace:*",
    "@admin-kit/icons": "workspace:*"
  }
}
```

### Workspace 协议优势

1. **开发便利**：自动链接到本地包
2. **发布自动替换**：发布时自动替换为实际版本号
3. **类型支持**：完整的 TypeScript 类型提示
4. **热更新**：修改依赖包立即生效

## 🚀 依赖安装

```bash
# 安装所有依赖
pnpm install

# 安装特定包的依赖
pnpm --filter @admin-kit/ui install

# 添加根目录依赖
pnpm add -D <package> -w

# 添加包级别依赖
pnpm --filter @admin-kit/ui add <package>
```

## 📊 依赖关系图

```
根目录 (devDependencies)
├── typescript
├── tsup
├── unbuild
├── vite
├── vue-tsc
├── @vitejs/plugin-vue
└── ...

packages/
├── shared (无依赖)
├── icons (依赖: @iconify/vue)
├── design (无依赖)
├── composables (依赖: @vueuse/core)
├── ui (依赖: design, icons)
└── layouts (依赖: ui, composables)
```

## 🔄 依赖更新

### 更新所有依赖到最新版本

```bash
pnpm update --latest --recursive
```

### 更新 catalog 中的依赖

1. 修改 `pnpm-workspace.yaml` 中的版本号
2. 运行 `pnpm install`

### 检查过期依赖

```bash
pnpm outdated
```

## ⚠️ 注意事项

1. **不要在包中添加 devDependencies**
   - 所有开发依赖应添加到根目录

2. **使用 catalog 引用**
   - 优先使用 `"catalog:"` 而不是具体版本号

3. **workspace 协议**
   - 内部包依赖必须使用 `"workspace:*"`

4. **peerDependencies**
   - Vue 相关包必须声明 `vue` 为 peerDependency
   - 避免重复打包 Vue

5. **版本一致性**
   - 确保所有包使用相同版本的 Vue 和 TypeScript

## 📚 相关文档

- [pnpm Workspace](https://pnpm.io/workspaces)
- [pnpm Catalog](https://pnpm.io/catalogs)
- [Monorepo 最佳实践](https://monorepo.tools/)
