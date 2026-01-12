<template>
  <section class="feature-section">
    <h3>状态存储工具</h3>
    
    <div class="feature-group">
      <div class="tool-demo">
        <div class="input-group">
          <input v-model="storeKey" placeholder="存储键名" class="input-field" />
          <input v-model="storeValue" placeholder="存储值" class="input-field" />
          <input v-model="storeTTL" type="number" placeholder="过期时间(秒, 可选)" class="input-field" />
          <button @click="testCreateStore" class="btn-primary">创建存储</button>
        </div>
        <div class="result" v-if="storeResult">
          <h5>存储结果:</h5>
          <pre>{{ JSON.stringify(storeResult, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 状态存储相关变量
const storeKey = ref('')
const storeValue = ref('')
const storeTTL = ref<number | null>(null)
const storeResult = ref<any>(null)

// 状态存储功能测试
const testCreateStore = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.createStore) {
      // 创建一个简单的存储
      const testStore = shared.createStore({ key: storeKey.value, value: storeValue.value })
      
      // 如果设置了TTL，可以添加定时器来模拟过期
      if (storeTTL.value) {
        setTimeout(() => {
          testStore.destroy()
        }, storeTTL.value * 1000)
      }
      
      storeResult.value = {
        state: testStore.getState(),
        message: '状态存储创建成功'
      }
      
      // 订阅状态变化
      const unsubscribe = testStore.subscribe((state: any, prevState: any) => {
        console.log('状态变化:', prevState, '->', state)
      })
      
      // 一定时间后取消订阅
      setTimeout(() => {
        unsubscribe()
      }, 5000)
    } else {
      storeResult.value = { error: 'createStore 函数不可用' }
    }
  } catch (error) {
    console.error('导入 @admin-core/shared 失败:', error)
    storeResult.value = { error: '导入失败，请检查包是否正确安装' }
  }
}
</script>

<style scoped>
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