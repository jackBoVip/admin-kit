<template>
  <div class="browser-utils-demo">
    <section class="feature-section">
      <h3>CSS工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <input v-model="classNamesInput" placeholder="输入类名，例如: 'px-2 py-1 bg-red-500'" class="input-field" />
          <button @click="testCn" class="btn-primary">合并类名 (cn)</button>
          <div class="result" v-if="cnResult">合并结果: {{ cnResult }}</div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>DOM工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <button @click="testGetElementVisibleRect" class="btn-info">获取元素可见区域 (getElementVisibleRect)</button>
          <div v-if="rectResult" class="result">
            <h5>可见区域信息:</h5>
            <pre>{{ JSON.stringify(rectResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>剪贴板与文件工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <input v-model="textToCopy" placeholder="要复制的文本" class="input-field" />
          <button @click="testCopyToClipboard" class="btn-success">复制到剪贴板</button>
          <div class="result" v-if="copyResult">复制结果: {{ copyResult }}</div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="downloadUrl" placeholder="下载URL" class="input-field" />
            <input v-model="downloadFilename" placeholder="文件名" class="input-field" />
            <button @click="testDownloadFile" class="btn-info">下载文件</button>
          </div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>CSS变量工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="cssVariableName" placeholder="CSS变量名 (如: --primary-color)" class="input-field" />
            <input v-model="cssVariableValue" placeholder="CSS变量值" class="input-field" />
            <button @click="testUpdateCSSVariable" class="btn-primary">更新CSS变量</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 浏览器工具相关变量
const classNamesInput = ref('')
const cnResult = ref('')
const rectResult = ref<any>(null)
const textToCopy = ref('Hello World!')
const copyResult = ref('')
const downloadUrl = ref('https://www.w3.org/W3C-IPO/ipo.jpg')
const downloadFilename = ref('test-image.jpg')
const cssVariableName = ref('--primary-color')
const cssVariableValue = ref('blue')

// 合并类名
const testCn = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.cn) {
      const result = shared.cn(classNamesInput.value.split(' '))
      cnResult.value = result
    } else {
      cnResult.value = 'cn function not available'
    }
  } catch (error) {
    console.error('cn test failed:', error)
    cnResult.value = 'cn function not available'
  }
}

// 获取元素可见区域
const testGetElementVisibleRect = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.getElementVisibleRect) {
      // 使用文档中body元素作为示例
      const element = document.body
      const result = shared.getElementVisibleRect(element)
      rectResult.value = result
    } else {
      rectResult.value = { error: 'getElementVisibleRect function not available' }
    }
  } catch (error) {
    console.error('getElementVisibleRect test failed:', error)
    rectResult.value = { error: 'Function not available' }
  }
}

// 复制到剪贴板测试
const testCopyToClipboard = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.copyToClipboard) {
      const success = await shared.copyToClipboard(textToCopy.value)
      copyResult.value = success ? '复制成功' : '复制失败'
    } else {
      copyResult.value = 'copyToClipboard 函数不可用'
    }
  } catch (error) {
    console.error('剪贴板操作失败:', error)
    copyResult.value = '剪贴板操作失败'
  }
}

// 下载文件测试
const testDownloadFile = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.downloadFile) {
      shared.downloadFile(downloadUrl.value, downloadFilename.value)
      alert('文件下载已启动')
    } else {
      alert('downloadFile 函数不可用')
    }
  } catch (error) {
    console.error('文件下载失败:', error)
    alert('文件下载失败')
  }
}

// 更新CSS变量测试
const testUpdateCSSVariable = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.updateCSSVariables) {
      shared.updateCSSVariables({
        [cssVariableName.value]: cssVariableValue.value
      })
      alert(`CSS变量 ${cssVariableName.value} 已更新为 ${cssVariableValue.value}`)
    } else {
      alert('updateCSSVariables 函数不可用')
    }
  } catch (error) {
    console.error('CSS变量更新失败:', error)
    alert('CSS变量更新失败')
  }
}
</script>

<style scoped>
.browser-utils-demo {
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