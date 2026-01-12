<template>
  <div class="utils-demo">
    <section class="feature-section">
      <h3>异步工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <button @click="testSleep" class="btn-primary">测试 Sleep (延迟2秒)</button>
          <div v-if="sleepResult" class="result">{{ sleepResult }}</div>
        </div>
        
        <div class="tool-demo">
          <button @click="testNoop" class="btn-secondary">测试 Noop (空函数)</button>
          <div v-if="noopResult" class="result">{{ noopResult }}</div>
        </div>
        
        <div class="tool-demo">
          <input v-model="debounceInput" @input="handleDebounceInput" placeholder="输入内容体验防抖（1秒）" class="input-field" />
          <div v-if="debouncedValue" class="result">防抖结果: {{ debouncedValue }}</div>
        </div>
        
        <div class="tool-demo">
          <button @click="handleThrottleClick" class="btn-warning">点击体验节流（2秒内限制一次）</button>
          <div class="result">节流按钮点击次数: {{ throttleClickCount }}</div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>环境判断工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <button @click="testEnvironment" class="btn-info">测试环境判断函数</button>
          <div v-if="environmentResult" class="result">
            <pre>{{ JSON.stringify(environmentResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>数据验证工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <input v-model="validationInput" placeholder="输入要验证的数据" class="input-field" />
          <div class="input-group">
            <button @click="testIsEmpty" class="btn-success">测试 isEmpty</button>
            <button @click="testIsHttpUrl" class="btn-info">测试 isHttpUrl</button>
            <button @click="testIsEmail" class="btn-warning">测试 isEmail</button>
            <button @click="testIsPhone" class="btn-danger">测试 isPhone</button>
          </div>
          <div v-if="validationResult" class="result">
            <pre>{{ JSON.stringify(validationResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 工具函数演示
const sleepResult = ref('')
const noopResult = ref('')
const debounceInput = ref('')
const debouncedValue = ref('')
const throttleClickCount = ref(0)

// 通用工具相关变量
const environmentResult = ref<any>(null)
const validationInput = ref('')
const validationResult = ref<any>(null)

// 测试环境判断函数
const testEnvironment = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared) {
      const result = {
        isDev: shared.isDev,
        isProd: shared.isProd,
        isBrowser: shared.isBrowser,
        isServer: shared.isServer,
        isMacOs: shared.isMacOs ? shared.isMacOs() : 'N/A',
        isWindowsOs: shared.isWindowsOs ? shared.isWindowsOs() : 'N/A',
        isMobile: shared.isMobile ? shared.isMobile() : 'N/A',
        isIOS: shared.isIOS ? shared.isIOS() : 'N/A',
        isAndroid: shared.isAndroid ? shared.isAndroid() : 'N/A',
        isWechat: shared.isWechat ? shared.isWechat() : 'N/A',
        isTouchDevice: shared.isTouchDevice ? shared.isTouchDevice() : 'N/A',
        getBrowserInfo: shared.getBrowserInfo ? shared.getBrowserInfo() : 'N/A',
        getOSInfo: shared.getOSInfo ? shared.getOSInfo() : 'N/A',
      }
      
      environmentResult.value = result
    } else {
      environmentResult.value = { error: 'Environment functions not available' }
    }
  } catch (error) {
    console.error('导入 @admin-core/shared 失败:', error)
    environmentResult.value = { error: '导入失败，请检查包是否正确安装' }
  }
}

// 测试验证函数
const testIsEmpty = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isEmpty) {
      const result = shared.isEmpty(validationInput.value)
      validationResult.value = { function: 'isEmpty', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isEmpty function not available' }
    }
  } catch (error) {
    console.error('isEmpty test failed:', error)
    validationResult.value = { error: 'isEmpty test failed' }
  }
}

const testIsHttpUrl = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isHttpUrl) {
      const result = shared.isHttpUrl(validationInput.value)
      validationResult.value = { function: 'isHttpUrl', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isHttpUrl function not available' }
    }
  } catch (error) {
    console.error('isHttpUrl test failed:', error)
    validationResult.value = { error: 'isHttpUrl test failed' }
  }
}

const testIsEmail = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isEmail) {
      const result = shared.isEmail(validationInput.value)
      validationResult.value = { function: 'isEmail', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isEmail function not available' }
    }
  } catch (error) {
    console.error('isEmail test failed:', error)
    validationResult.value = { error: 'isEmail test failed' }
  }
}

const testIsPhone = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isPhone) {
      const result = shared.isPhone(validationInput.value)
      validationResult.value = { function: 'isPhone', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isPhone function not available' }
    }
  } catch (error) {
    console.error('isPhone test failed:', error)
    validationResult.value = { error: 'isPhone test failed' }
  }
}

// 测试 sleep 函数
const testSleep = async () => {
  sleepResult.value = '等待中...'
  
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.sleep) {
      await shared.sleep(2000)
      sleepResult.value = '延迟2秒执行完成!'
    } else {
      sleepResult.value = 'sleep 函数不可用'
    }
  } catch (error) {
    console.error('导入 @admin-core/shared 失败:', error)
    sleepResult.value = '导入失败，请检查包是否正确安装'
  }
}

// 防抖函数
const handleDebounceInput = async (e: Event) => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.debounce) {
      const debouncedFn = shared.debounce((event: Event) => {
        const target = event.target as HTMLInputElement
        debouncedValue.value = target.value
      }, 1000)
      debouncedFn(e)
    }
  } catch (error) {
    console.error('导入 debounce 失败:', error)
  }
}

// 节流函数
let throttledClick: (() => void) | null = null

const handleThrottleClick = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.throttle) {
      if (!throttledClick) {
        throttledClick = shared.throttle(() => {
          throttleClickCount.value += 1
        }, 2000)
      }
      if(throttledClick) {
        throttledClick()
      }
    }
  } catch (error) {
    console.error('导入 throttle 失败:', error)
  }
}

// 测试 noop 函数
const testNoop = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.noop) {
      shared.noop() // 调用 noop 函数
      noopResult.value = 'Noop 函数已执行 (实际上什么都不做)'
    } else {
      noopResult.value = 'noop 函数不可用'
    }
  } catch (error) {
    console.error('导入 @admin-core/shared 失败:', error)
    noopResult.value = '导入失败，请检查包是否正确安装'
  }
}
</script>

<style scoped>
.utils-demo {
  width: 100%;
}

.feature-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.feature-section h3 {
  color: #2d3748;
  border-bottom: 2px solid #3182ce;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.feature-group {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #3182ce;
}

.tool-demo {
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease-in-out;
}

.tool-demo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.result {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #ebf8ff;
  border-radius: 6px;
  border-left: 3px solid #3182ce;
  font-size: 0.9rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.input-group input {
  flex: 1;
  min-width: 150px;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 1px #3182ce;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2c5282;
}

.btn-secondary {
  background-color: #718096;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-secondary:hover {
  background-color: #4a5568;
}

.btn-warning {
  background-color: #dd6b20;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-warning:hover {
  background-color: #c05621;
}

.btn-success {
  background-color: #38a169;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-success:hover {
  background-color: #2f855e;
}

.btn-info {
  background-color: #319795;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-info:hover {
  background-color: #2c7a7b;
}

.btn-danger {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-danger:hover {
  background-color: #c53030;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 1px #3182ce;
}
</style>