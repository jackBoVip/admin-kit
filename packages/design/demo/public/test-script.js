/**
 * 主题系统自动化测试脚本
 * 
 * 使用方法：
 * 1. 打开浏览器控制台
 * 2. 复制此脚本并粘贴到控制台
 * 3. 按 Enter 执行
 */

(function() {
  console.log('🎨 开始主题系统自动化测试...\n')

  // 测试配置
  const themes = [
    '', 'violet', 'pink', 'rose', 'sky-blue', 'deep-blue',
    'green', 'deep-green', 'orange', 'yellow', 'zinc', 'neutral', 'slate', 'gray'
  ]
  const modes = ['light', 'dark']
  const delay = 1000 // 每个主题停留时间（毫秒）

  // 测试结果
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    errors: []
  }

  // 工具函数：获取 CSS 变量值
  function getCSSVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  }

  // 工具函数：检查颜色是否有效
  function isValidColor(color) {
    return color && color !== '' && color !== 'undefined'
  }

  // 测试函数：检查主题是否正确应用
  function testTheme(mode, theme) {
    results.total++
    
    try {
      // 应用主题
      if (mode === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme)
      } else {
        document.documentElement.removeAttribute('data-theme')
      }

      // 检查关键 CSS 变量
      const primary = getCSSVar('--primary')
      const background = getCSSVar('--background')
      const foreground = getCSSVar('--foreground')

      if (!isValidColor(primary) || !isValidColor(background) || !isValidColor(foreground)) {
        throw new Error('关键 CSS 变量缺失')
      }

      // 测试通过
      results.passed++
      console.log(`✅ ${mode.padEnd(5)} + ${(theme || 'default').padEnd(12)} - 通过`)
      
      return true
    } catch (error) {
      // 测试失败
      results.failed++
      results.errors.push({
        mode,
        theme: theme || 'default',
        error: error.message
      })
      console.error(`❌ ${mode.padEnd(5)} + ${(theme || 'default').padEnd(12)} - 失败: ${error.message}`)
      
      return false
    }
  }

  // 测试函数：检查颜色对比度（简化版）
  function testContrast() {
    console.log('\n📊 检查颜色对比度...')
    
    const bg = getCSSVar('--background')
    const fg = getCSSVar('--foreground')
    
    console.log(`背景色: ${bg}`)
    console.log(`前景色: ${fg}`)
    console.log('提示: 使用浏览器开发者工具的对比度检查器进行详细检查')
  }

  // 测试函数：检查 localStorage 持久化
  function testPersistence() {
    console.log('\n💾 测试主题持久化...')
    
    try {
      // 保存测试数据
      localStorage.setItem('theme-mode', 'dark')
      localStorage.setItem('theme-variant', 'violet')
      
      // 读取测试数据
      const mode = localStorage.getItem('theme-mode')
      const variant = localStorage.getItem('theme-variant')
      
      if (mode === 'dark' && variant === 'violet') {
        console.log('✅ localStorage 持久化正常')
        return true
      } else {
        throw new Error('localStorage 数据不匹配')
      }
    } catch (error) {
      console.error('❌ localStorage 持久化失败:', error.message)
      return false
    }
  }

  // 测试函数：性能测试
  function testPerformance() {
    console.log('\n⚡ 测试主题切换性能...')
    
    const iterations = 10
    const times = []
    
    for (let i = 0; i < iterations; i++) {
      const start = performance.now()
      document.documentElement.classList.toggle('dark')
      const end = performance.now()
      times.push(end - start)
    }
    
    const avg = times.reduce((a, b) => a + b, 0) / times.length
    const max = Math.max(...times)
    const min = Math.min(...times)
    
    console.log(`平均切换时间: ${avg.toFixed(2)}ms`)
    console.log(`最快: ${min.toFixed(2)}ms`)
    console.log(`最慢: ${max.toFixed(2)}ms`)
    
    if (avg < 100) {
      console.log('✅ 性能良好')
      return true
    } else {
      console.warn('⚠️ 性能可能需要优化')
      return false
    }
  }

  // 主测试流程
  async function runTests() {
    console.log('=' .repeat(50))
    console.log('1️⃣ 测试所有主题组合\n')
    
    // 测试所有组合
    for (const mode of modes) {
      for (const theme of themes) {
        testTheme(mode, theme)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log('2️⃣ 其他测试\n')
    
    // 对比度测试
    testContrast()
    
    // 持久化测试
    testPersistence()
    
    // 性能测试
    testPerformance()

    // 输出测试报告
    console.log('\n' + '='.repeat(50))
    console.log('📋 测试报告\n')
    console.log(`总测试数: ${results.total}`)
    console.log(`通过: ${results.passed} ✅`)
    console.log(`失败: ${results.failed} ❌`)
    console.log(`成功率: ${((results.passed / results.total) * 100).toFixed(2)}%`)
    
    if (results.errors.length > 0) {
      console.log('\n❌ 失败的测试:')
      results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.mode} + ${error.theme}: ${error.error}`)
      })
    }
    
    console.log('\n' + '='.repeat(50))
    console.log('✨ 测试完成！')
    
    // 恢复默认主题
    document.documentElement.classList.remove('dark')
    document.documentElement.removeAttribute('data-theme')
  }

  // 执行测试
  runTests().catch(error => {
    console.error('测试过程中发生错误:', error)
  })
})()
