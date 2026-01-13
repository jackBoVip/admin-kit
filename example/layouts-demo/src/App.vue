<template>
  <div class="layouts-demo">
    <header class="demo-header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo-icon">📋</div>
          <div>
            <h1>Admin Core Layouts - Form System</h1>
            <p>全面展示 Admin Core Layouts 中的表单系统功能</p>
          </div>
        </div>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">{{ Object.keys(basicFormValues).length }}</span>
            <span class="stat-label">基本表单字段</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ DynamicFormDemo?.__vccOpts?.dynamicFormValues?.value ? Object.keys(DynamicFormDemo.__vccOpts.dynamicFormValues.value).length : 0 }}</span>
            <span class="stat-label">动态字段数量</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ Object.keys(advancedFormValues).length }}</span>
            <span class="stat-label">高级表单字段</span>
          </div>
        </div>
      </div>
    </header>
    
    <div class="demo-navigation">
      <div class="nav-container">
        <nav class="nav">
          <a 
            v-for="(section, index) in sections" 
            :key="index"
            :class="['nav-link', { active: activeSection === section.id }]"
            @click="scrollToSection(section.id)"
          >
            <span class="nav-icon">{{ getNavIcon(section.id) }}</span>
            {{ section.label }}
          </a>
        </nav>
      </div>
    </div>
    
    <div class="demo-container">
      <!-- Admin Form 组件 -->
      <section id="admin-form" class="demo-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="section-icon">📝</span>
              Admin Form 组件
            </h2>
            <p class="section-description">基础表单组件，支持验证、提交等功能</p>
          </div>
          <div class="section-actions">
            <button class="btn btn-sm btn-outline" @click="BasicFormDemo.__vccOpts.resetBasicForm">重置</button>
            <button class="btn btn-sm btn-primary" @click="BasicFormDemo.__vccOpts.submitBasicForm">提交</button>
          </div>
        </div>
        <div class="form-demo">
          <div class="form-wrapper">
            <component :is="BasicFormDemo" />
          </div>
        </div>
      </section>

      <!-- Dynamic Form Schema -->
      <section id="dynamic-form" class="demo-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="section-icon">🔄</span>
              Dynamic Form Schema
            </h2>
            <p class="section-description">动态表单组件，支持运行时修改表单结构</p>
          </div>
          <div class="section-actions">
            <button class="btn btn-sm btn-outline" @click="DynamicFormDemo.__vccOpts.resetDynamicForm">重置</button>
            <button class="btn btn-sm btn-primary" @click="DynamicFormDemo.__vccOpts.submitDynamicForm">提交</button>
          </div>
        </div>
        <div class="form-demo">
          <div class="form-wrapper">
            <component :is="DynamicFormDemo" />
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <section id="form-actions" class="demo-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="section-icon">⚙️</span>
              Form Actions 组件
            </h2>
            <p class="section-description">表单操作按钮组件，包含多种样式和状态</p>
          </div>
        </div>
        <div class="form-demo">
          <div class="form-wrapper">
            <h3 class="form-subtitle">表单操作按钮示例</h3>
            <div class="form-actions-component">
              <div class="action-buttons-grid">
                <div class="action-group">
                  <h4>基础按钮样式</h4>
                  <div class="action-buttons">
                    <button class="btn btn-primary">保存</button>
                    <button class="btn btn-outline">取消</button>
                    <button class="btn btn-secondary">另存为草稿</button>
                    <button class="btn btn-ghost">预览</button>
                  </div>
                </div>
                
                <div class="action-group">
                  <h4>尺寸变体</h4>
                  <div class="action-buttons">
                    <button class="btn btn-sm btn-primary">小尺寸</button>
                    <button class="btn btn-primary">默认</button>
                    <button class="btn btn-lg btn-primary">大尺寸</button>
                  </div>
                </div>
                
                <div class="action-group">
                  <h4>状态变体</h4>
                  <div class="action-buttons">
                    <button class="btn btn-primary" :disabled="true">禁用</button>
                    <button class="btn btn-outline" :disabled="true">禁用</button>
                    <button class="btn btn-link">链接样式</button>
                  </div>
                </div>
              </div>
              
              <div class="action-buttons-sticky">
                <div class="sticky-content">
                  <h4>固定底部操作栏示例</h4>
                  <p>这是一个固定在底部的操作栏示例，常用于长表单页面</p>
                  <div class="sticky-actions">
                    <button class="btn btn-outline">取消</button>
                    <button class="btn btn-primary">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Advanced Form Features -->
      <section id="advanced-form" class="demo-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="section-icon">⚡</span>
              Advanced Form Features
            </h2>
            <p class="section-description">高级表单功能，支持复杂表单交互和验证</p>
          </div>
          <div class="section-actions">
            <button class="btn btn-sm btn-outline" @click="AdvancedFormDemo.__vccOpts.resetAdvancedForm">重置</button>
            <button class="btn btn-sm btn-primary" @click="AdvancedFormDemo.__vccOpts.submitAdvancedForm">提交</button>
          </div>
        </div>
        <div class="form-demo">
          <div class="form-wrapper">
            <component :is="AdvancedFormDemo" />
          </div>
        </div>
      </section>
    </div>
    
    <footer class="demo-footer">
      <p>Admin Core Layouts - 强大的表单系统解决方案 © {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const showSchema = ref(false)

// 获取导航图标
const getNavIcon = (id: string) => {
  const icons: Record<string, string> = {
    'admin-form': '📝',
    'dynamic-form': '🔄',
    'form-actions': '⚙️',
    'advanced-form': '⚡',
  }
  return icons[id] || '📄'
}

// 重置基本表单
const resetBasicForm = async () => {
  await BasicFormDemo.__vccOpts.resetBasicForm();
}

// 提交基本表单
const submitBasicForm = async () => {
  await BasicFormDemo.__vccOpts.submitBasicForm();
}

// 复制基本表单数据
const copyBasicFormData = () => {
  navigator.clipboard.writeText(JSON.stringify(BasicFormDemo.__vccOpts.basicFormValues.value, null, 2))
  alert('基本表单数据已复制到剪贴板')
}

// 重置动态表单
const resetDynamicForm = async () => {
  await DynamicFormDemo.__vccOpts.resetDynamicForm();
}

// 提交动态表单
const submitDynamicForm = async () => {
  await DynamicFormDemo.__vccOpts.submitDynamicForm();
}

// 切换Schema可见性
const toggleSchemaVisibility = () => {
  DynamicFormDemo.__vccOpts.showSchema.value = !DynamicFormDemo.__vccOpts.showSchema.value;
}

// 复制动态表单数据
const copyDynamicFormData = () => {
  navigator.clipboard.writeText(JSON.stringify(DynamicFormDemo.__vccOpts.dynamicFormValues.value, null, 2))
  alert('动态表单数据已复制到剪贴板')
}

// 重置高级表单
const resetAdvancedForm = async () => {
  await AdvancedFormDemo.__vccOpts.resetAdvancedForm();
}

// 提交高级表单
const submitAdvancedForm = async () => {
  await AdvancedFormDemo.__vccOpts.submitAdvancedForm();
}

// 复制高级表单数据
const copyAdvancedFormData = () => {
  navigator.clipboard.writeText(JSON.stringify(AdvancedFormDemo.__vccOpts.advancedFormValues.value, null, 2))
  alert('高级表单数据已复制到剪贴板')
}

import BasicFormDemo from './components/BasicFormDemo.vue'
import DynamicFormDemo from './components/DynamicFormDemo.vue'
import AdvancedFormDemo from './components/AdvancedFormDemo.vue'

// 获取基本表单状态
const state = BasicFormDemo.__vccOpts.state

// 获取表单API和值
const basicFormApi = BasicFormDemo.__vccOpts.basicFormApi
const basicFormValues = BasicFormDemo.__vccOpts.basicFormValues

const dynamicFormApi = DynamicFormDemo.__vccOpts.dynamicFormApi
const dynamicFormValues = DynamicFormDemo.__vccOpts.dynamicFormValues

const advancedFormApi = AdvancedFormDemo.__vccOpts.advancedFormApi
const advancedFormValues = AdvancedFormDemo.__vccOpts.advancedFormValues

// 导航相关
const activeSection = ref('')
const sections = [
  { id: 'admin-form', label: 'Admin Form' },
  { id: 'dynamic-form', label: 'Dynamic Form' },
  { id: 'form-actions', label: 'Form Actions' },
  { id: 'advanced-form', label: 'Advanced Form' },
]

// 动态表单操作
const addFormField = () => {
  DynamicFormDemo.__vccOpts.addFormField();
}

const removeLastField = () => {
  DynamicFormDemo.__vccOpts.removeLastField();
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听滚动事件以高亮当前节
onMounted(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 200
    
    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          activeSection.value = section.id
          break
        }
      }
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // 组件卸载时清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style>
.layouts-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  background-color: #f8fafc;
  color: #1e293b;
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
}

.demo-header h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-header p {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.demo-navigation {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  margin-bottom: 2rem;
  z-index: 100;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.nav-link.active {
  background-color: #3b82f6;
  color: white;
  border-color: #2563eb;
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-section {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;
}

.demo-section:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.form-demo {
  width: 100%;
}

.form-wrapper {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.form-wrapper h3 {
  margin: 0 auto;
  color: #1f2937;
  font-size: 1.25rem;
}

.basic-form,
.dynamic-form,
.advanced-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input {
  height: 2.5rem;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #374151;
}

.form-checkbox,
.form-radio {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.action-buttons-sticky {
  background: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
}

.sticky-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.form-result {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.form-result h4 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.form-result pre {
  margin: 0;
  background: #1e293b;
  color: #f8fafc;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  font-size: 0.875rem;
}

.dynamic-form-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s ease;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  height: 2.25rem;
  min-width: 80px;
}

.btn:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.btn:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-outline {
  border: 1px solid #d1d5db;
  background-color: transparent;
  color: #374151;
}

.btn-outline:hover:not(:disabled) {
  background-color: #f9fafb;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.btn-ghost {
  background-color: transparent;
  color: #374151;
}

.btn-ghost:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.btn-link {
  background-color: transparent;
  color: #3b82f6;
  text-decoration: underline;
}

.btn-link:hover:not(:disabled) {
  color: #1d4ed8;
}

.btn-sm {
  height: 2rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}

.btn-lg {
  height: 3rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Flex and utility classes */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.5rem;
}

/* Common demo container styles */
.button-demo,
.input-demo,
.checkbox-demo,
.radio-group-demo,
.switch-demo,
.badge-demo,
.avatar-demo,
.tabs-demo,
.select-demo,
.toggle-demo,
.tooltip-demo,
.form-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

/* Animation styles */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header Styles */
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.logo-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.stat-item {
  text-align: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Navigation Styles */
.nav-container {
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
}

.nav {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.nav-icon {
  margin-right: 0.5rem;
  font-size: 1.1em;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  transition: all 0.2s ease;
  border-radius: 0.5rem;
}

.nav-link:hover {
  background-color: #f1f5f9;
  transform: translateY(-2px);
}

.nav-link.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);
  transform: translateY(-2px);
}

/* Section Header Styles */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title-wrapper {
  flex: 1;
  min-width: 200px;
}

.section-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  color: #1e293b;
  display: flex;
  align-items: center;
}

.section-icon {
  margin-right: 0.5rem;
}

.section-description {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
}

.section-actions {
  display: flex;
  gap: 0.5rem;
  align-self: center;
  flex-shrink: 0;
}

/* Form Subtitle */
.form-subtitle {
  margin: 0 0 1rem 0;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #e5e7eb;
}

/* Form Section */
.form-section {
  margin-bottom: 1.5rem;
}

/* Form Controls */
.form-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.control-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.control-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.control-value {
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  background: #f1f5f9;
  border-radius: 0.25rem;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

/* Result Header */
.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.result-content {
  max-height: 200px;
  overflow-y: auto;
  background: #f1f5f9;
  border-radius: 0.375rem;
  padding: 1rem;
}

/* Dynamic Form Controls */
.dynamic-form-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.btn-icon {
  margin-right: 0.5rem;
}

/* Schema Preview */
.schema-preview {
  margin: 1rem 0;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
}

.schema-preview h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #475569;
}

/* Action Buttons Grid */
.action-buttons-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.action-group {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.action-group h4 {
  margin: 0 0 1rem 0;
  color: #475569;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-group h4::before {
  content: "🔸";
  font-size: 0.8rem;
}

/* Sticky Footer */
.demo-footer {
  margin-top: 3rem;
  padding: 2rem 0 1rem;
  text-align: center;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
  font-size: 0.875rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 0.75rem;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-stats {
    width: 100%;
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .nav {
    flex-direction: column;
  }
  
  .nav-link {
    text-align: center;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>