# 发布脚本

## resolve-catalog.js

自动解析 `catalog:` 依赖为实际版本号的脚本。

### 功能

- 在发布前自动运行（通过 `prepublishOnly` 钩子）
- 读取 `pnpm-workspace.yaml` 中的 catalog 配置
- 将 package.json 中的 `catalog:` 依赖替换为实际版本号
- 支持所有依赖类型：dependencies、devDependencies、peerDependencies、optionalDependencies

### 使用方法

#### 自动运行（推荐）

发布时会自动运行，无需手动操作：

```bash
# 使用 changeset 发布（推荐）
pnpm run release

# 或直接发布单个包
cd packages/design
npm publish
```

#### 手动运行

如果需要手动测试或运行：

```bash
# 从根目录运行，指定要处理的 package.json
npm_package_json="packages/design/package.json" node scripts/resolve-catalog.js

# 或使用环境变量
export npm_package_json="packages/design/package.json"
node scripts/resolve-catalog.js
```

### 工作原理

1. 读取 `pnpm-workspace.yaml` 获取 catalog 配置
2. 读取指定的 package.json 文件
3. 遍历所有依赖，查找 `catalog:` 标记
4. 从 catalog 中查找对应的版本号
5. 替换并写回 package.json

### 示例

**发布前的 package.json：**
```json
{
  "devDependencies": {
    "vite": "catalog:",
    "typescript": "catalog:"
  }
}
```

**发布时自动转换为：**
```json
{
  "devDependencies": {
    "vite": "^7.3.1",
    "typescript": "^5.9.3"
  }
}
```

### 注意事项

- 脚本会直接修改 package.json 文件
- 建议在发布前确保代码已提交
- 如果 catalog 中找不到对应的包，会输出警告但不会中断发布
- 发布后记得恢复 `catalog:` 格式（或使用 git checkout）

### 配置

在根目录的 `package.json` 中配置：

```json
{
  "scripts": {
    "prepublishOnly": "node scripts/resolve-catalog.js"
  }
}
```

这样每次运行 `npm publish` 时都会自动执行。
