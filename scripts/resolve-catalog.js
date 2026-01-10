#!/usr/bin/env node

/**
 * 在发布前自动解析 catalog: 依赖为实际版本号
 * 这个脚本会在 prepublishOnly 钩子中自动运行
 * 发布后会自动恢复 catalog: 引用
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// 读取 pnpm-workspace.yaml 获取 catalog 配置
const workspaceYaml = fs.readFileSync(
  path.join(__dirname, '../pnpm-workspace.yaml'),
  'utf-8'
);
const workspace = yaml.parse(workspaceYaml);
const catalog = workspace.catalog || {};

console.log('📦 开始解析 catalog 依赖...\n');

// 获取当前包的 package.json 路径
const packageJsonPath = process.env.npm_package_json || path.join(process.cwd(), 'package.json');
const originalContent = fs.readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(originalContent);

// 保存原始内容到临时文件
const backupPath = packageJsonPath + '.catalog-backup';
fs.writeFileSync(backupPath, originalContent, 'utf-8');

let hasChanges = false;

// 解析依赖
function resolveDependencies(deps, depType) {
  if (!deps) return;
  
  for (const [name, version] of Object.entries(deps)) {
    if (version === 'catalog:') {
      const catalogVersion = catalog[name];
      if (catalogVersion) {
        console.log(`  ✓ ${depType}: ${name}: catalog: → ${catalogVersion}`);
        deps[name] = catalogVersion;
        hasChanges = true;
      } else {
        console.warn(`  ⚠ ${depType}: ${name}: catalog 中未找到版本`);
      }
    }
  }
}

// 处理各种依赖类型
resolveDependencies(packageJson.dependencies, 'dependencies');
resolveDependencies(packageJson.devDependencies, 'devDependencies');
resolveDependencies(packageJson.peerDependencies, 'peerDependencies');
resolveDependencies(packageJson.optionalDependencies, 'optionalDependencies');

// 如果有变更，写回文件
if (hasChanges) {
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf-8'
  );
  console.log('\n✅ catalog 依赖已解析完成！');
  console.log('💾 原始文件已备份到:', backupPath);
} else {
  console.log('\n✓ 没有需要解析的 catalog 依赖');
  // 如果没有变更，删除备份文件
  if (fs.existsSync(backupPath)) {
    fs.unlinkSync(backupPath);
  }
}
