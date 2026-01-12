<template>
  <div class="color-demo">
    <section class="feature-section">
      <h3>颜色工具</h3>
      
      <div class="feature-group">
        <h4>颜色处理</h4>
        <div class="tool-demo">
          <div class="input-group">
            <input v-model="colorInput" placeholder="输入颜色值 (如: #ff0000, rgb(255,0,0), blue)" class="input-field" />
            <button @click="testColorFunctions" class="btn-primary">测试颜色函数</button>
          </div>
          
          <div class="color-display" v-if="colorResults">
            <div class="color-swatch" :style="{ backgroundColor: colorInput }"></div>
            <div class="color-info">
              <p><strong>输入颜色:</strong> {{ colorInput }}</p>
              <p><strong>是否深色:</strong> {{ colorResults.isDark ? '是' : '否' }}</p>
              <p><strong>是否浅色:</strong> {{ colorResults.isLight ? '是' : '否' }}</p>
              <p><strong>是否有效:</strong> {{ colorResults.isValid ? '是' : '否' }}</p>
              <p><strong>HSL格式:</strong> {{ colorResults.hsl }}</p>
              <p><strong>CSS变量格式:</strong> {{ colorResults.hslCssVar }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 颜色处理相关变量
const colorInput = ref('#3b82f6')
const colorResults = ref<any>(null)

// 颜色功能测试
const testColorFunctions = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isDarkColor && shared.isLightColor && shared.isValidColor && shared.convertToHsl && shared.convertToHslCssVar) {
      const isDark = shared.isDarkColor(colorInput.value)
      const isLight = shared.isLightColor(colorInput.value)
      const isValid = shared.isValidColor(colorInput.value)
      const hsl = shared.convertToHsl(colorInput.value)
      const hslCssVar = shared.convertToHslCssVar(colorInput.value)
      
      colorResults.value = {
        isDark,
        isLight,
        isValid,
        hsl,
        hslCssVar
      }
    } else {
      colorResults.value = { error: '颜色函数不可用' }
    }
  } catch (error) {
    console.error('颜色函数测试失败:', error)
    colorResults.value = { error: '颜色函数测试失败' }
  }
}
</script>

<style scoped>
.color-demo {
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

.color-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.color-swatch {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.color-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
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