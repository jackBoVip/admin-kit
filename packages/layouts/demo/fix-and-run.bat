@echo off
REM Form Demo 快速修复和运行脚本 (Windows)

echo 🔧 开始修复和构建...

REM 1. 构建依赖包
echo 📦 构建 UI 包...
call pnpm --filter @admin-core/ui build

echo 📦 构建 layouts 包...
call pnpm --filter @admin-core/layouts build

REM 2. 清理 demo 缓存
echo 🧹 清理缓存...
if exist packages\layouts\demo\node_modules\.vite rmdir /s /q packages\layouts\demo\node_modules\.vite
if exist packages\layouts\demo\dist rmdir /s /q packages\layouts\demo\dist

REM 3. 启动开发服务器
echo 🚀 启动开发服务器...
call pnpm --filter @admin-core/layouts-demo dev
