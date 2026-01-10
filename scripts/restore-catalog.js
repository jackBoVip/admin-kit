#!/usr/bin/env node

/**
 * 发布后恢复 catalog: 引用
 * 这个脚本会在 postpublish 钩子中自动运行
 */

const fs = require('fs');
const path = require('path');

console.log('♻️  开始恢复 catalog 引用...\n');

// 获取当前包的 package.json 路径
const packageJsonPath = process.env.npm_package_json || path.join(process.cwd(), 'package.json');
const backupPath = packageJsonPath + '.catalog-backup';

// 检查备份文件是否存在
if (fs.existsSync(backupPath)) {
  const backupContent = fs.readFileSync(backupPath, 'utf-8');
  fs.writeFileSync(packageJsonPath, backupContent, 'utf-8');
  fs.unlinkSync(backupPath);
  
  console.log('✅ package.json 已恢复为 catalog: 引用');
  console.log('🗑️  备份文件已删除\n');
} else {
  console.log('✓ 没有找到备份文件，无需恢复\n');
}
