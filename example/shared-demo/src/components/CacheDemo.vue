<template>
  <div class="cache-demo">
    <section class="feature-section">
      <h3>缓存功能</h3>
      
      <div class="feature-group">
        <h4>存储管理器</h4>
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="storagePrefix" placeholder="存储前缀" class="input-field" />
            <button @click="initStorageManager" class="btn-primary">初始化存储管理器</button>
          </div>
          
          <div class="input-group">
            <input v-model="storageKey" placeholder="键名" class="input-field" />
            <input v-model="storageValue" placeholder="值" class="input-field" />
            <input v-model="storageTTL" type="number" placeholder="TTL(秒)" class="input-field" />
            <button @click="setStorageItem" class="btn-success">设置</button>
            <button @click="getStorageItem" class="btn-info">获取</button>
          </div>
          
          <div class="input-group">
            <button @click="clearStorage" class="btn-warning">清除前缀项</button>
            <button @click="clearExpiredStorage" class="btn-warning">清除过期项</button>
            <button @click="createExpiredItem" class="btn-danger">创建过期项测试</button>
            <button @click="getStorageKeys" class="btn-info">获取键列表</button>
            <button @click="getStorageSize" class="btn-info">获取大小</button>
          </div>
          
          <div class="result" v-if="storageResult">
            <h5>存储结果:</h5>
            <pre>{{ JSON.stringify(storageResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 缓存管理相关变量
const storagePrefix = ref('demo')
const storageKey = ref('')
const storageValue = ref('')
const storageTTL = ref<number | null>(null)
const storageResult = ref<any>(null)

// 初始化存储管理器
let storageManager: any = null

const initStorageManager = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.StorageManager) {
      storageManager = new shared.StorageManager({ 
        prefix: storagePrefix.value, 
        storageType: 'localStorage' 
      })
      storageResult.value = { message: `存储管理器初始化成功，前缀: ${storagePrefix.value}` }
    } else {
      storageResult.value = { error: 'StorageManager 不可用' }
    }
  } catch (error) {
    console.error('初始化存储管理器失败:', error)
    storageResult.value = { error: '初始化失败' }
  }
}

// 设置存储项
const setStorageItem = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const ttlMs = storageTTL.value ? storageTTL.value * 1000 : undefined
    storageManager.setItem(storageKey.value, storageValue.value, ttlMs)
    storageResult.value = { message: `已设置: ${storageKey.value} = ${storageValue.value}`, ttl: ttlMs ? `${storageTTL.value}秒` : '永不过期' }
  } catch (error: any) {
    storageResult.value = { error: `设置失败: ${error.message}` }
  }
}

// 获取存储项
const getStorageItem = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const value = storageManager.getItem(storageKey.value)
    storageResult.value = { key: storageKey.value, value: value }
  } catch (error: any) {
    storageResult.value = { error: `获取失败: ${error.message}` }
  }
}

// 清除前缀项
const clearStorage = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    storageManager.clear()
    storageResult.value = { message: '已清除所有带前缀的存储项' }
  } catch (error: any) {
    storageResult.value = { error: `清除失败: ${error.message}` }
  }
}

// 清除过期项
const clearExpiredStorage = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    storageManager.clearExpiredItems()
    storageResult.value = { message: '已清除所有过期的存储项' }
  } catch (error: any) {
    storageResult.value = { error: `清除过期项失败: ${error.message}` }
  }
}

// 获取键列表
const getStorageKeys = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const keys = storageManager.keys()
    storageResult.value = { keys: keys }
  } catch (error: any) {
    storageResult.value = { error: `获取键列表失败: ${error.message}` }
  }
}

// 获取存储大小
const getStorageSize = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const size = storageManager.size()
    storageResult.value = { size: size, message: `存储项总数: ${size}` }
  } catch (error: any) {
    storageResult.value = { error: `获取大小失败: ${error.message}` }
  }
}

// 创建过期项测试
const createExpiredItem = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    // 创建一个已过期的项目（过去的时间）
    const pastTime = Date.now() - 10000; // 10秒前
    
    // 直接操作localStorage来创建一个已过期的项目
    const fullKey = `${storagePrefix.value}-expired-test-${Date.now()}`;
    const expiredItem = JSON.stringify({
      value: 'This is an expired item',
      expiry: pastTime
    });
    
    localStorage.setItem(fullKey, expiredItem);
    
    storageResult.value = { message: '已创建过期测试项，现在可以尝试清除过期项功能' };
  } catch (error: any) {
    storageResult.value = { error: `创建过期项失败: ${error.message}` };
  }
}
</script>

<style scoped>
.cache-demo {
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

.feature-group h4 {
  color: #2b6cb0;
  margin-top: 0;
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