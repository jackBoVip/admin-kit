/**
 * 发布前准备脚本
 * 在发布时临时替换 catalog: 引用，发布后恢复
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'
import { execSync } from 'node:child_process'

const workspaceRoot = resolve(process.cwd())
const workspaceYamlPath = resolve(workspaceRoot, 'pnpm-workspace.yaml')
const packageJsonPath = resolve(workspaceRoot, 'packages/shared/package.json')

// 读取 catalog 版本
const workspaceYaml = readFileSync(workspaceYamlPath, 'utf-8')
const workspace = parse(workspaceYaml)
const catalog = workspace.catalog

// 读取原始 package.json
const originalPackageJson = readFileSync(packageJsonPath, 'utf-8')
const packageJson = JSON.parse(originalPackageJson)

console.log('📦 准备发布:', `${packageJson.name}@${packageJson.version}`)
console.log('')

// 创建临时的 package.json 副本用于发布
const publishPackageJson = JSON.parse(originalPackageJson)

// 替换 dependencies 中的 catalog:
if (publishPackageJson.dependencies) {
  for (const [name, version] of Object.entries(publishPackageJson.dependencies)) {
    if (version === 'catalog:') {
      if (catalog[name]) {
        publishPackageJson.dependencies[name] = catalog[name]
        console.log(`✓ 替换 dependencies.${name}: catalog: -> ${catalog[name]}`)
      } else {
        console.warn(`⚠ 警告: catalog 中未找到 ${name}`)
      }
    }
  }
}

// 替换 devDependencies 中的 catalog:
if (publishPackageJson.devDependencies) {
  for (const [name, version] of Object.entries(publishPackageJson.devDependencies)) {
    if (version === 'catalog:') {
      if (catalog[name]) {
        publishPackageJson.devDependencies[name] = catalog[name]
        console.log(`✓ 替换 devDependencies.${name}: catalog: -> ${catalog[name]}`)
      } else {
        console.warn(`⚠ 警告: catalog 中未找到 ${name}`)
      }
    }
  }
}

console.log('')
console.log('🔨 开始构建...')

// 1. 先构建
try {
  execSync('pnpm --filter @admin-core/shared build', { 
    stdio: 'inherit',
    cwd: workspaceRoot 
  })
  console.log('✅ 构建完成')
} catch (error) {
  console.error('❌ 构建失败')
  process.exit(1)
}

console.log('')
console.log('📝 临时替换 package.json 中的 catalog 引用...')

// 2. 临时写入替换后的 package.json
writeFileSync(packageJsonPath, JSON.stringify(publishPackageJson, null, 2) + '\n', 'utf-8')

console.log('✅ package.json 已临时更新')
console.log('')
console.log('🚀 开始发布...')

// 3. 发布
try {
  execSync('pnpm --filter @admin-core/shared publish --access public --no-git-checks', { 
    stdio: 'inherit',
    cwd: workspaceRoot 
  })
  console.log('✅ 发布成功')
} catch (error) {
  console.error('❌ 发布失败')
  // 恢复原始 package.json
  writeFileSync(packageJsonPath, originalPackageJson, 'utf-8')
  process.exit(1)
}

console.log('')
console.log('♻️  恢复 package.json 中的 catalog 引用...')

// 4. 恢复原始 package.json
writeFileSync(packageJsonPath, originalPackageJson, 'utf-8')

console.log('✅ package.json 已恢复')
console.log('')
console.log('🎉 发布流程完成！')
console.log(`📦 已发布: ${packageJson.name}@${packageJson.version}`)

