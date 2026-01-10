# 发布指南

## 自动化发布流程

本项目已配置自动化发布流程，支持在开发时使用 `catalog:` 引用，发布时自动替换为实际版本号。

### 发布步骤

#### 1. 创建 Changeset

```bash
pnpm changeset
```

选择要发布的包和版本类型（patch/minor/major），然后描述变更内容。

#### 2. 更新版本号

```bash
pnpm version-packages
```

这会：
- 更新 package.json 中的版本号
- 更新 CHANGELOG.md
- 删除 .changeset 中的变更文件

#### 3. 提交版本更新

```bash
git add -A
git commit -m "chore: 发布 v0.x.x"
git push
```

#### 4. 发布到 npm

```bash
# 方式 1: 使用 changeset 发布（推荐）
pnpm release

# 方式 2: 手动发布单个包
cd packages/shared
pnpm publish
```

### 自动化流程说明

#### prepublishOnly 钩子

在执行 `pnpm publish` 之前自动运行：

1. 读取 `pnpm-workspace.yaml` 中的 catalog 配置
2. 备份原始 package.json 到 `.catalog-backup` 文件
3. 将所有 `catalog:` 引用替换为实际版本号
4. 继续执行发布流程

#### postpublish 钩子

在发布完成后自动运行：

1. 从 `.catalog-backup` 恢复原始 package.json
2. 删除备份文件
3. 确保开发环境中仍然使用 `catalog:` 引用

### 手动发布流程（不推荐）

如果需要完全手动控制发布流程：

```bash
node scripts/prepare-publish.js
```

这个脚本会：
1. 构建项目
2. 临时替换 catalog 引用
3. 执行发布
4. 自动恢复 catalog 引用

## 发布检查清单

- [ ] 所有测试通过
- [ ] 代码已构建成功
- [ ] CHANGELOG.md 已更新
- [ ] 版本号已正确更新
- [ ] README.md 文档已更新（如有必要）
- [ ] 已提交所有更改到 Git
- [ ] 已推送到远程仓库

## 版本号规范

遵循 [Semantic Versioning](https://semver.org/) 规范：

- **Major (x.0.0)**: 破坏性变更
- **Minor (0.x.0)**: 新功能，向后兼容
- **Patch (0.0.x)**: Bug 修复，向后兼容

## 常见问题

### Q: 为什么要使用 catalog 引用？

A: 使用 catalog 可以在 monorepo 中统一管理依赖版本，避免版本不一致的问题。

### Q: 发布后 package.json 会被修改吗？

A: 不会。发布流程会自动备份和恢复，确保开发环境中仍然使用 `catalog:` 引用。

### Q: 如果发布失败怎么办？

A: 发布失败时，脚本会自动恢复原始 package.json。如果没有自动恢复，可以手动运行：

```bash
node scripts/restore-catalog.js
```

### Q: 可以跳过自动化流程吗？

A: 不建议。如果确实需要，可以使用 `--ignore-scripts` 标志：

```bash
pnpm publish --ignore-scripts
```

但这样需要手动处理 catalog 引用。

## 相关文件

- `scripts/resolve-catalog.js` - 发布前解析 catalog 引用
- `scripts/restore-catalog.js` - 发布后恢复 catalog 引用
- `scripts/prepare-publish.js` - 完整的手动发布流程
- `.changeset/` - Changeset 配置和变更文件
- `pnpm-workspace.yaml` - Catalog 版本定义
