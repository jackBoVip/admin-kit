#!/usr/bin/env node

/**
 * 测试 catalog 处理脚本
 * 验证所有包的 catalog 引用是否能正确解析
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

console.log('🔍 检查所有包的 catalog 引用...\n');

// 获取所有包
const packagesDir = path.join(__dirname, '../packages');
const packages = fs.readdirSync(packagesDir).filter(name => {
  const packagePath = path.join(packagesDir, name);
  return fs.statSync(packagePath).isDirectory() && 
         fs.existsSync(path.join(packagePath, 'package.json'));
});

let totalCatalogRefs = 0;
let missingInCatalog = 0;
let packagesWithCatalog = 0;

packages.forEach(pkgName => {
  const packageJsonPath = path.join(packagesDir, pkgName, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  
  let hasCatalog = false;
  let pkgCatalogRefs = 0;
  let pkgMissing = 0;
  
  console.log(`📦 ${packageJson.name} (v${packageJson.version})`);
  
  // 检查各种依赖类型
  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
  
  depTypes.forEach(depType => {
    const deps = packageJson[depType];
    if (!deps) return;
    
    Object.entries(deps).forEach(([name, version]) => {
      if (version === 'catalog:') {
        hasCatalog = true;
        pkgCatalogRefs++;
        totalCatalogRefs++;
        
        if (catalog[name]) {
          console.log(`  ✓ ${depType}.${name}: catalog: → ${catalog[name]}`);
        } else {
          console.log(`  ✗ ${depType}.${name}: catalog 中未找到`);
          pkgMissing++;
          missingInCatalog++;
        }
      }
    });
  });
  
  if (hasCatalog) {
    packagesWithCatalog++;
    
    // 检查是否配置了钩子
    const hasHooks = packageJson.scripts?.prepublishOnly && packageJson.scripts?.postpublish;
    if (hasHooks) {
      console.log(`  ✓ 已配置发布钩子`);
    } else {
      console.log(`  ⚠ 未配置发布钩子`);
    }
    
    console.log(`  📊 catalog 引用: ${pkgCatalogRefs} 个${pkgMissing > 0 ? ` (${pkgMissing} 个缺失)` : ''}`);
  } else {
    console.log(`  ℹ 未使用 catalog`);
  }
  
  console.log('');
});

console.log('━'.repeat(60));
console.log('📊 统计信息:');
console.log(`  总包数: ${packages.length}`);
console.log(`  使用 catalog 的包: ${packagesWithCatalog}`);
console.log(`  catalog 引用总数: ${totalCatalogRefs}`);
if (missingInCatalog > 0) {
  console.log(`  ⚠ catalog 中缺失: ${missingInCatalog} 个`);
} else {
  console.log(`  ✓ 所有 catalog 引用都有对应版本`);
}
console.log('');

if (missingInCatalog > 0) {
  console.log('❌ 发现问题！请在 pnpm-workspace.yaml 中添加缺失的依赖版本');
  process.exit(1);
} else {
  console.log('✅ 所有 catalog 引用检查通过！');
}
