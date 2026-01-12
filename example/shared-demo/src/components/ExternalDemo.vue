<template>
  <div class="external-demo">
    <section class="feature-section">
      <h3>日期处理工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="dateToFormat" placeholder="日期 (YYYY-MM-DD 或 时间戳)" class="input-field" />
            <input v-model="dateFormat" placeholder="格式 (默认 YYYY-MM-DD HH:mm:ss)" class="input-field" />
            <button @click="testFormatDate" class="btn-success">格式化日期 (formatDate)</button>
          </div>
          <div class="result" v-if="dateResult">格式化结果: {{ dateResult }}</div>
        </div>
        
        <div class="tool-demo">
          <input v-model="relativeDate" placeholder="日期 (相对时间计算)" class="input-field" />
          <button @click="testGetRelativeTime" class="btn-info">获取相对时间 (getRelativeTime)</button>
          <div class="result" v-if="relativeTimeResult">相对时间: {{ relativeTimeResult }}</div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="checkDate" placeholder="检查日期" class="input-field" />
            <input v-model="startDate" placeholder="开始日期" class="input-field" />
            <input v-model="endDate" placeholder="结束日期" class="input-field" />
            <button @click="testIsDateInRange" class="btn-warning">检查日期范围 (isDateInRange)</button>
          </div>
          <div class="result">日期范围检查: {{ dateRangeResult }}</div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="daysDate1" placeholder="第一个日期" class="input-field" />
            <input v-model="daysDate2" placeholder="第二个日期" class="input-field" />
            <button @click="testDaysDiff" class="btn-primary">计算天数差 (getDaysDiff)</button>
          </div>
          <div class="result">天数差: {{ daysDiffResult }}</div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>对象合并工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="defuObj1" placeholder="对象1 (JSON格式)" class="input-field" />
            <input v-model="defuObj2" placeholder="对象2 (JSON格式)" class="input-field" />
            <button @click="testDefu" class="btn-success">深度合并 (defu)</button>
          </div>
          <div class="result" v-if="defuResult">
            <h5>合并结果:</h5>
            <pre>{{ JSON.stringify(defuResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>进度条工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <div class="input-group">
            <button @click="testNProgressStart" class="btn-primary">开始进度条 (nprogress.start)</button>
            <button @click="testNProgressDone" class="btn-success">完成进度条 (nprogress.done)</button>
            <button @click="testNProgressInc" class="btn-info">增加进度 (nprogress.inc)</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 外部依赖相关变量
const dateToFormat = ref(new Date().toISOString())
const dateFormat = ref('YYYY-MM-DD HH:mm:ss')
const dateResult = ref('')
const relativeDate = ref(new Date().toISOString())
const relativeTimeResult = ref('')
const checkDate = ref(new Date().toISOString())
const startDate = ref(new Date().toISOString())
const endDate = ref(new Date().toISOString())
const dateRangeResult = ref('')
const daysDate1 = ref(new Date().toISOString())
const daysDate2 = ref(new Date().toISOString())
const daysDiffResult = ref('')
const defuObj1 = ref('{}')
const defuObj2 = ref('{}')
const defuResult = ref<any>(null)

// 格式化日期测试
const testFormatDate = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.formatDate) {
      const formatted = shared.formatDate(dateToFormat.value, dateFormat.value)
      dateResult.value = formatted
    } else {
      dateResult.value = 'formatDate 函数不可用'
    }
  } catch (error) {
    console.error('日期格式化失败:', error)
    dateResult.value = '日期格式化失败'
  }
}

// 获取相对时间
const testGetRelativeTime = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.getRelativeTime) {
      const result = shared.getRelativeTime(relativeDate.value)
      relativeTimeResult.value = result
    } else {
      relativeTimeResult.value = 'getRelativeTime function not available'
    }
  } catch (error) {
    console.error('getRelativeTime test failed:', error)
    relativeTimeResult.value = 'getRelativeTime function not available'
  }
}

// 检查日期范围
const testIsDateInRange = async () => {
  try {
    // 验证日期输入
    if (!checkDate.value || !startDate.value || !endDate.value) {
      dateRangeResult.value = '请提供所有日期参数'
      return
    }
    
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isDateInRange) {
      const result = shared.isDateInRange(checkDate.value, startDate.value, endDate.value)
      dateRangeResult.value = result
    } else {
      dateRangeResult.value = 'isDateInRange function not available'
    }
  } catch (error) {
    console.error('isDateInRange test failed:', error)
    dateRangeResult.value = `错误: ${error instanceof Error ? error.message : '未知错误'}`
  }
}

// 计算天数差
const testDaysDiff = async () => {
  try {
    // 验证日期输入
    if (!daysDate1.value || !daysDate2.value) {
      daysDiffResult.value = '请提供两个日期参数'
      return
    }
    
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.getDaysDiff) {
      const result = shared.getDaysDiff(daysDate1.value, daysDate2.value)
      daysDiffResult.value = result
    } else {
      daysDiffResult.value = 'getDaysDiff function not available'
    }
  } catch (error) {
    console.error('getDaysDiff test failed:', error)
    daysDiffResult.value = `错误: ${error instanceof Error ? error.message : '未知错误'}`
  }
}

// 深度合并
const testDefu = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.defu) {
      const obj1 = JSON.parse(defuObj1.value)
      const obj2 = JSON.parse(defuObj2.value)
      const result = shared.defu(obj1, obj2)
      defuResult.value = result
    } else {
      defuResult.value = { error: 'defu function not available' }
    }
  } catch (error) {
    console.error('defu test failed:', error)
    defuResult.value = { error: 'Invalid JSON or function not available' }
  }
}

// 进度条开始
const testNProgressStart = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.startProgress) {
      shared.startProgress()
    } else {
      alert('NProgress not available')
    }
  } catch (error) {
    console.error('NProgress start failed:', error)
    alert('NProgress not available')
  }
}

// 进度条完成
const testNProgressDone = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.doneProgress) {
      shared.doneProgress()
    } else {
      alert('NProgress not available')
    }
  } catch (error) {
    console.error('NProgress done failed:', error)
    alert('NProgress not available')
  }
}

// 进度条增加
const testNProgressInc = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.incProgress) {
      shared.incProgress()
    } else {
      alert('NProgress not available')
    }
  } catch (error) {
    console.error('NProgress inc failed:', error)
    alert('NProgress not available')
  }
}
</script>

<style scoped>
.external-demo {
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