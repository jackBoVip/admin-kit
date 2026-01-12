<template>
  <div class="data-processing-demo">
    <section class="feature-section">
      <h3>数组处理工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="uniqueArrayInput" placeholder="输入数组元素，逗号分隔" class="input-field" />
            <button @click="processUniqueArray" class="btn-success">数组去重 (unique)</button>
          </div>
          <div class="result" v-if="uniqueResult && uniqueResult.length > 0">
            <h5>去重结果:</h5>
            <pre>{{ JSON.stringify(uniqueResult, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="fieldArrayInput" placeholder='输入对象数组，如: [{"id":1,"name":"A"},{"id":2,"name":"B"}]' class="input-field" />
            <input v-model="fieldKeyInput" placeholder="去重字段名 (如: id)" class="input-field" />
            <button @click="testUniqueByField" class="btn-info">按字段去重 (uniqueByField)</button>
          </div>
          <div class="result" v-if="fieldResult && fieldResult.length > 0">
            <h5>按字段去重结果:</h5>
            <pre>{{ JSON.stringify(fieldResult, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="flatArrayInput" placeholder="输入嵌套数组，如: [1,2,[3,4],[5,[6,7]]]" class="input-field" />
            <button @click="testFlatten" class="btn-warning">数组扁平化 (flatten)</button>
          </div>
          <div class="result" v-if="flatResult && Array.isArray(flatResult) && flatResult.length > 0">
            <h5>扁平化结果:</h5>
            <pre>{{ JSON.stringify(flatResult, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="chunkSizeInput" type="number" placeholder="块大小" class="input-field" />
            <input v-model="chunkArrayInput" placeholder="输入数组元素，逗号分隔" class="input-field" />
            <button @click="processChunkArray" class="btn-info">数组分块 (chunk)</button>
          </div>
          <div class="result" v-if="chunkResult && chunkResult.length > 0">
            <h5>分块结果:</h5>
            <pre>{{ JSON.stringify(chunkResult, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="shuffleArrayInput" placeholder="输入数组元素，逗号分隔" class="input-field" />
            <button @click="testShuffle" class="btn-success">数组随机排序 (shuffle)</button>
          </div>
          <div class="result" v-if="shuffleResult && Array.isArray(shuffleResult) && shuffleResult.length > 0">
            <h5>随机排序结果:</h5>
            <pre>{{ JSON.stringify(shuffleResult, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="sampleArrayInput" placeholder="输入数组元素，逗号分隔" class="input-field" />
            <input v-model="sampleCountInput" type="number" placeholder="抽取数量" class="input-field" />
            <button @click="testSample" class="btn-primary">随机抽取 (sample)</button>
          </div>
          <div class="result" v-if="sampleResult && Array.isArray(sampleResult) && sampleResult.length > 0">
            <h5>随机抽取结果:</h5>
            <pre>{{ JSON.stringify(sampleResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <h3>对象处理工具</h3>
      
      <div class="feature-group">
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="objectPath" placeholder="对象路径 (如: user.profile.name)" class="input-field" />
            <input v-model="objectData" placeholder="JSON对象数据" class="input-field" />
            <button @click="testGetObject" class="btn-primary">获取对象值 (get)</button>
          </div>
          <div class="result" v-if="objectResult !== null">
            <h5>获取结果:</h5>
            <pre>{{ JSON.stringify(objectResult, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="cloneData" placeholder="JSON对象数据" class="input-field" />
            <button @click="testCloneDeep" class="btn-success">深度克隆 (cloneDeep)</button>
          </div>
          <div class="result" v-if="clonedObject">
            <h5>克隆结果:</h5>
            <pre>{{ JSON.stringify(clonedObject, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="compareData1" placeholder="第一个对象(JSON格式)" class="input-field" />
            <input v-model="compareData2" placeholder="第二个对象(JSON格式)" class="input-field" />
            <button @click="testIsEqual" class="btn-warning">比较对象 (isEqual)</button>
          </div>
          <div class="result" v-if="compareResult !== null">
            <h5>比较结果:</h5>
            <pre>{{ JSON.stringify(compareResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 数据处理相关变量
const objectPath = ref('user.profile.name')
const objectData = ref('{"user":{"profile":{"name":"John Doe","age":30,"email":"john@example.com"}}}')
const objectResult = ref<any>(null)
const cloneData = ref('{"name":"Test","data":[1,2,3],"nested":{"value":"test"}}')
const clonedObject = ref<any>(null)

const uniqueArrayInput = ref('apple,banana,orange,apple,grape,banana')
const fieldArrayInput = ref('[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"},{"id":1,"name":"Alice"},{"id":3,"name":"Charlie"}]')
const fieldKeyInput = ref('id')
const flatArrayInput = ref('[1,2,[3,4],[5,[6,7,[8,9]]],10]')
const chunkSizeInput = ref('3')
const chunkArrayInput = ref('apple,banana,orange,grape,kiwi,mango,papaya,peach')
const shuffleArrayInput = ref('red,green,blue,yellow,purple,orange')
const sampleArrayInput = ref('cat,dog,bird,fish,horse,rabbit,turtle,lizard')
const sampleCountInput = ref('4')
const compareData1 = ref('{"name":"test","data":[1,2,3],"flag":true}')
const compareData2 = ref('{"name":"test","data":[1,2,3],"flag":true}')
const uniqueResult = ref<any[]>([])
const fieldResult = ref<any[]>([])
const flatResult = ref<any | any[]>(null)
const chunkResult = ref<any[]>([])
const shuffleResult = ref<any | any[]>(null)
const sampleResult = ref<any | any[]>(null)
const compareResult = ref<boolean | any>(null)

// 按字段去重
const testUniqueByField = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.uniqueByField) {
      const inputArray = JSON.parse(fieldArrayInput.value)
      const result = shared.uniqueByField(inputArray, fieldKeyInput.value)
      fieldResult.value = result
    } else {
      fieldResult.value = [{ error: 'uniqueByField function not available' }]
    }
  } catch (error) {
    console.error('uniqueByField test failed:', error)
    fieldResult.value = [{ error: 'Invalid JSON or function not available' }]
  }
}

// 数组扁平化
const testFlatten = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.flatten) {
      const inputArray = JSON.parse(flatArrayInput.value)
      const result = shared.flatten(inputArray)
      flatResult.value = result
    } else {
      flatResult.value = [] // 使用空数组
    }
  } catch (error) {
    console.error('flatten test failed:', error)
    flatResult.value = [] // 使用空数组
  }
}

// 数组随机排序
const testShuffle = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.shuffle) {
      const inputArray = shuffleArrayInput.value.split(',').map(item => item.trim())
      const result = shared.shuffle(inputArray)
      shuffleResult.value = result
    } else {
      shuffleResult.value = [] // 使用空数组代替错误对象
    }
  } catch (error) {
    console.error('shuffle test failed:', error)
    shuffleResult.value = [] // 使用空数组代替错误对象
  }
}

// 随机抽取
const testSample = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.sample) {
      const inputArray = sampleArrayInput.value.split(',').map(item => item.trim())
      const count = parseInt(sampleCountInput.value) || 1
      const result = shared.sample(inputArray, count)
      sampleResult.value = result
    } else {
      sampleResult.value = [] // 使用空数组代替错误对象
    }
  } catch (error) {
    console.error('sample test failed:', error)
    sampleResult.value = [] // 使用空数组代替错误对象
  }
}

// 数组去重
const processUniqueArray = async () => {
  try {
    const inputArray = uniqueArrayInput.value.split(',').map(item => item.trim())
    
    try {
      const shared: any = await import('@admin-core/shared')
      if (shared && shared.unique) {
        uniqueResult.value = shared.unique(inputArray)
      } else {
        // 使用默认去重方法
        uniqueResult.value = [...new Set(inputArray)]
      }
    } catch (sharedError) {
      console.warn('无法使用 @admin-core/shared unique 函数:', sharedError)
      uniqueResult.value = [...new Set(inputArray)]
    }
  } catch (error) {
    console.error('数组去重处理错误:', error)
  }
}

// 数组分块
const processChunkArray = async () => {
  try {
    const inputArray = chunkArrayInput.value.split(',').map(item => item.trim())
    const size = parseInt(chunkSizeInput.value) || 2
    
    try {
      const shared: any = await import('@admin-core/shared')
      if (shared && shared.chunk) {
        chunkResult.value = shared.chunk(inputArray, size)
      } else {
        // 使用默认分块方法
        const result = []
        for (let i = 0; i < inputArray.length; i += size) {
          result.push(inputArray.slice(i, i + size))
        }
        chunkResult.value = result
      }
    } catch (sharedError) {
      console.warn('无法使用 @admin-core/shared chunk 函数:', sharedError)
      const result = []
      for (let i = 0; i < inputArray.length; i += size) {
        result.push(inputArray.slice(i, i + size))
      }
      chunkResult.value = result
    }
  } catch (error) {
    console.error('数组分块处理错误:', error)
  }
}

// 获取对象值
const testGetObject = async () => {
  try {
    const obj = JSON.parse(objectData.value)
    const path = objectPath.value
    
    try {
      const shared: any = await import('@admin-core/shared')
      if (shared && shared.get) {
        objectResult.value = shared.get(obj, path)
      } else {
        // 使用默认方法
        const keys = path.split('.')
        let result = obj
        for (const key of keys) {
          result = result[key]
          if (result === undefined) break
        }
        objectResult.value = result
      }
    } catch (sharedError) {
      console.warn('无法使用 @admin-core/shared get 函数:', sharedError)
      const keys = path.split('.')
      let result = obj
      for (const key of keys) {
        result = result[key]
        if (result === undefined) break
      }
      objectResult.value = result
    }
  } catch (error) {
    console.error('获取对象值错误:', error)
    objectResult.value = 'JSON解析错误或路径无效'
  }
}

// 深度克隆
const testCloneDeep = async () => {
  try {
    const obj = JSON.parse(cloneData.value)
    
    try {
      const shared: any = await import('@admin-core/shared')
      if (shared && shared.cloneDeep) {
        clonedObject.value = shared.cloneDeep(obj)
      } else {
        // 使用默认方法
        clonedObject.value = JSON.parse(JSON.stringify(obj))
      }
    } catch (sharedError) {
      console.warn('无法使用 @admin-core/shared cloneDeep 函数:', sharedError)
      clonedObject.value = JSON.parse(JSON.stringify(obj))
    }
  } catch (error) {
    console.error('深度克隆错误:', error)
    clonedObject.value = 'JSON解析错误'
  }
}

// 比较对象
const testIsEqual = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isEqual) {
      const obj1 = JSON.parse(compareData1.value)
      const obj2 = JSON.parse(compareData2.value)
      const result = shared.isEqual(obj1, obj2)
      compareResult.value = result
    } else {
      compareResult.value = { error: 'isEqual function not available' }
    }
  } catch (error) {
    console.error('isEqual test failed:', error)
    compareResult.value = { error: 'Invalid JSON or function not available' }
  }
}
</script>

<style scoped>
.data-processing-demo {
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