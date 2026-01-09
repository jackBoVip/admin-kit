# Changesets 配置

本项目使用 [Changesets](https://github.com/changesets/changesets) 来管理版本发布和变更日志。

## 使用方法

### 添加变更集

当您完成一个功能或修复后，运行以下命令来创建一个新的变更集：

```bash
pnpm changeset
```

这将引导您选择受影响的包和版本类型（major、minor、patch）。

### 版本发布

在发布前，运行以下命令来更新包的版本：

```bash
pnpm version-packages
```

### 发布到npm

要发布包到npm，运行：

```bash
pnpm release
```

## 配置说明

- `changelog`: 使用默认的changelog生成器
- `commit`: 不自动提交变更（由开发者手动提交）
- `access`: 包的访问级别（public表示公开）
- `baseBranch`: 主分支名称
- `updateInternalDependencies`: 更新内部依赖的版本级别
- `privatePackages`: 配置私有包的处理方式
