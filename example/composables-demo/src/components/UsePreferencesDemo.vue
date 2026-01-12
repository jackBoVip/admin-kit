<template>
  <div class="demo-section">
    <h3>usePreferences 演示</h3>
    <p>偏好设置管理功能演示</p>
    
    <div class="preferences-controls">
      <div class="control-group">
        <label>
          <input 
            type="checkbox" 
            v-model="currentPreferences.app.colorGrayMode"
            @change="updatePreference"
          >
          灰色模式
        </label>
        
        <label>
          <input 
            type="checkbox" 
            v-model="currentPreferences.app.colorWeakMode"
            @change="updatePreference"
          >
          色弱模式
        </label>
        
        <label>
          <input 
            type="checkbox" 
            v-model="currentPreferences.app.compact"
            @change="updatePreference"
          >
          紧凑模式
        </label>
      </div>
      
      <div class="control-group">
        <label>
          主题模式:
          <select 
            v-model="currentPreferences.theme.mode" 
            @change="updatePreference"
            class="select-input"
          >
            <option value="light">明亮</option>
            <option value="dark">暗黑</option>
            <option value="auto">自动</option>
          </select>
        </label>
        
        <label>
          布局方式:
          <select 
            v-model="currentPreferences.app.layout" 
            @change="updatePreference"
            class="select-input"
          >
            <option value="sidebar-nav">侧边导航</option>
            <option value="top-nav">顶部导航</option>
            <option value="mixed-nav">混合导航</option>
          </select>
        </label>
      </div>
      
      <div class="control-group">
        <label>
          主题颜色:
          <input 
            type="color" 
            v-model="currentPreferences.theme.colorPrimary"
            @input="updatePreference"
            class="color-input"
          >
        </label>
        
        <label>
          圆角大小:
          <select 
            v-model="currentPreferences.theme.radius" 
            @change="updatePreference"
            class="select-input"
          >
            <option value="0.5rem">小</option>
            <option value="0.75rem">中</option>
            <option value="1rem">大</option>
          </select>
        </label>
      </div>
    </div>
    
    <div class="result">
      <h4>当前偏好设置:</h4>
      <pre>{{ JSON.stringify(currentPreferences, null, 2) }}</pre>
    </div>
    
    <div class="actions">
      <button class="btn" @click="resetPrefs">重置为默认</button>
      <button class="btn btn-secondary" @click="savePreferences">保存设置</button>
      <button class="btn btn-info" @click="loadPreferences">加载设置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getPreferences, updatePreferences, resetPreferences } from '@admin-core/composables'

// 当前偏好设置状态
const currentPreferences = reactive<any>(getPreferences())

// 更新偏好设置
const updatePreference = () => {
  updatePreferences(currentPreferences)
}

// 重置偏好设置
const resetPrefs = () => {
  resetPreferences()
  Object.assign(currentPreferences, getPreferences())
}

// 保存偏好设置
const savePreferences = () => {
  localStorage.setItem('admin-preferences', JSON.stringify(currentPreferences))
}

// 加载偏好设置
const loadPreferences = () => {
  const saved = localStorage.getItem('admin-preferences')
  if (saved) {
    const parsed = JSON.parse(saved)
    Object.assign(currentPreferences, parsed)
    updatePreferences(parsed)
  }
}

// 初始化时加载当前偏好设置
onMounted(() => {
  Object.assign(currentPreferences, getPreferences())
})
</script>

<style scoped>
.preferences-controls {
  margin: 1rem 0;
}

.control-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.select-input {
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background: white;
}

.color-input {
  width: 40px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
}

.result {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.result h4 {
  margin-top: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .control-group {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>