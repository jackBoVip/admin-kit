#!/bin/bash

# Form Demo 快速修复和运行脚本

echo "🔧 开始修复和构建..."

# 1. 构建依赖包
echo "📦 构建 UI 包..."
pnpm --filter @admin-core/ui build

echo "📦 构建 layouts 包..."
pnpm --filter @admin-core/layouts build

# 2. 清理 demo 缓存
echo "🧹 清理缓存..."
rm -rf packages/layouts/demo/node_modules/.vite
rm -rf packages/layouts/demo/dist

# 3. 启动开发服务器
echo "🚀 启动开发服务器..."
pnpm --filter @admin-core/layouts-demo dev
