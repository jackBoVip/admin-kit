# 问题排查指南

## 当前问题

### 问题描述
浏览器控制台报错：`SyntaxError: The requested module does not provide an export named 'AdminSelect'`

### 问题原因
1. UI 包 (`@admin-core/ui`) 没有正确构建
2. 组件导出配置不正确
3. 开发服务器缓存问题

## 解决步骤

### 1. 重新构建所有依赖包

```bash
# 构建 shared 包
pnpm --filter @admin-core/shared build

# 构建 icons 包
pnpm --filter @admin-core/icons build

# 构建 composables 包
pnpm --filter @admin-core/composables build

# 构建 UI 包
pnpm --filter @admin-core/ui build

# 构建 layouts 包
pnpm --filter @admin-core/layouts build
```

### 2. 清理缓存并重新安装

```bash
# 清理所有 node_modules
pnpm clean

# 重新安装依赖
pnpm install

# 重新构建所有包
pnpm build
```

### 3. 重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)

# 重新启动
pnpm --filter @admin-core/layouts-demo dev
```

### 4. 清理浏览器缓存

1. 打开浏览器开发者工具 (F12)
2. 右键点击刷新按钮
3. 选择"清空缓存并硬性重新加载"

## 常见问题

### Q1: 组件未定义错误

**错误信息**: `Component is not defined` 或 `Cannot find module`

**解决方案**:
1. 检查组件是否正确导出
2. 确认 UI 包已构建
3. 检查导入路径是否正确

### Q2: 样式不显示

**错误信息**: 组件显示但没有样式

**解决方案**:
1. 确认已导入 CSS: `import '@admin-core/ui/dist/ui.css'`
2. 检查 Tailwind CSS 配置
3. 确认 Vite 插件配置正确

### Q3: TypeScript 类型错误

**错误信息**: `Type 'X' is not assignable to type 'Y'`

**解决方案**:
1. 重新生成类型声明: `pnpm build`
2. 重启 TypeScript 服务器
3. 检查 tsconfig.json 配置

### Q4: Vite 热更新不工作

**解决方案**:
1. 重启开发服务器
2. 检查文件监听配置
3. 清理 `.vite` 缓存目录

## 验证步骤

### 1. 检查包是否正确构建

```bash
# 检查 UI 包的 dist 目录
ls packages/shadcn-ui/dist

# 应该看到:
# - index.js
# - index.cjs
# - index.umd.js
# - index.d.ts
# - ui.css
```

### 2. 检查组件导出

```bash
# 查看 UI 包导出的内容
cat packages/shadcn-ui/dist/index.d.ts | grep AdminSelect
```

### 3. 测试简单导入

创建测试文件 `test-import.ts`:

```typescript
import { AdminSelect, AdminInput, AdminButton } from '@admin-core/ui';

console.log('AdminSelect:', AdminSelect);
console.log('AdminInput:', AdminInput);
console.log('AdminButton:', AdminButton);
```

运行测试:
```bash
node --loader ts-node/esm test-import.ts
```

## 当前状态

- [x] UI 包已重新构建
- [x] layouts 包已重新构建
- [x] 开发服务器已重启
- [x] 添加了 UI CSS 导入
- [x] 创建了简化版示例

## 下一步

1. 刷新浏览器 (Ctrl+Shift+R 或 Cmd+Shift+R)
2. 检查控制台是否还有错误
3. 如果仍有问题，查看具体错误信息
4. 根据错误信息继续排查

## 联系支持

如果问题仍未解决，请提供以下信息：

1. 完整的错误堆栈
2. 浏览器类型和版本
3. Node.js 版本
4. pnpm 版本
5. 操作系统信息

## 有用的命令

```bash
# 查看所有包的版本
pnpm list --depth=0

# 查看特定包的信息
pnpm list @admin-core/ui

# 清理并重建
pnpm clean && pnpm install && pnpm build

# 只运行 demo
cd packages/layouts/demo && pnpm dev

# 查看 Vite 配置
cat packages/layouts/demo/vite.config.ts
```
