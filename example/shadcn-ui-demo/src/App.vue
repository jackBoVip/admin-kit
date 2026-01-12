<template>
  <div class="shadcn-ui-demo">
    <header class="demo-header">
      <h1>Shadcn UI 组件演示</h1>
      <p>全面展示 Shadcn UI 库中的各种组件</p>
    </header>
    
    <div class="demo-navigation">
      <nav class="nav">
        <a 
          v-for="(section, index) in sections" 
          :key="index"
          :class="['nav-link', { active: activeSection === section.id }]"
          @click="scrollToSection(section.id)"
        >
          {{ section.label }}
        </a>
      </nav>
    </div>
    
    <div class="demo-container">
      <!-- Button 组件 -->
      <section id="buttons" class="demo-section">
        <h2 class="section-title">Button 组件</h2>
        <div class="button-demo">
          <button class="btn">Default</button>
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-destructive">Destructive</button>
          <button class="btn btn-outline">Outline</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-link">Link</button>
        </div>
        <div class="button-sizes">
          <h3>不同尺寸</h3>
          <div class="button-row">
            <button class="btn btn-sm">Small</button>
            <button class="btn">Default</button>
            <button class="btn btn-lg">Large</button>
          </div>
        </div>
      </section>

      <!-- Card 组件 -->
      <section id="cards" class="demo-section">
        <h2 class="section-title">Card 组件</h2>
        <div class="card-demo">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">卡片标题</h4>
              <p class="card-description">卡片描述</p>
            </div>
            <div class="card-content">
              <p>这里是卡片内容区域。您可以放置任意内容。</p>
            </div>
            <div class="card-footer">
              <p>卡片底部信息</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-content">
              <p>只有内容区域的简单卡片。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Input 组件 -->
      <section id="inputs" class="demo-section">
        <h2 class="section-title">Input 组件</h2>
        <div class="input-demo">
          <div class="input-group">
            <label>用户名</label>
            <input type="text" class="input" placeholder="请输入用户名" />
          </div>
          <div class="input-group">
            <label>邮箱地址</label>
            <input type="email" class="input" placeholder="请输入邮箱地址" />
          </div>
          <div class="input-group">
            <label>密码</label>
            <input type="password" class="input" placeholder="请输入密码" />
          </div>
        </div>
      </section>

      <!-- Textarea 组件 -->
      <section id="textareas" class="demo-section">
        <h2 class="section-title">Textarea 组件</h2>
        <div class="textarea-demo">
          <div class="input-group">
            <label>详细描述</label>
            <textarea class="textarea" placeholder="请输入详细描述..." rows="4"></textarea>
          </div>
        </div>
      </section>

      <!-- Checkbox 组件 -->
      <section id="checkboxes" class="demo-section">
        <h2 class="section-title">Checkbox 组件</h2>
        <div class="checkbox-demo">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="checkbox" />
            <span>同意用户协议</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="checkbox" checked />
            <span>记住登录状态</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="checkbox" disabled />
            <span>禁用选项</span>
          </label>
        </div>
      </section>

      <!-- Radio Group 组件 -->
      <section id="radios" class="demo-section">
        <h2 class="section-title">Radio Group 组件</h2>
        <div class="radio-group-demo">
          <label class="flex items-center gap-2">
            <input type="radio" name="radio-group" class="radio" checked />
            <span>选项 1</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" name="radio-group" class="radio" />
            <span>选项 2</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" name="radio-group" class="radio" />
            <span>选项 3</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" name="radio-disabled" class="radio" disabled />
            <span>禁用选项</span>
          </label>
        </div>
      </section>

      <!-- Switch 组件 -->
      <section id="switches" class="demo-section">
        <h2 class="section-title">Switch 组件</h2>
        <div class="switch-demo">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" role="switch" />
            <span>启用通知</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" role="switch" checked />
            <span>启用暗黑模式</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" role="switch" disabled />
            <span>禁用开关</span>
          </label>
        </div>
      </section>

      <!-- Badge 组件 -->
      <section id="badges" class="demo-section">
        <h2 class="section-title">Badge 组件</h2>
        <div class="badge-demo">
          <span class="badge">默认</span>
          <span class="badge badge-primary">主要</span>
          <span class="badge badge-destructive">危险</span>
          <span class="badge badge-outline">轮廓</span>
          <span class="badge badge-secondary">次要</span>
          <span class="badge badge-success">成功</span>
          <span class="badge badge-warning">警告</span>
        </div>
      </section>

      <!-- Alert Dialog 组件 -->
      <section id="dialogs" class="demo-section">
        <h2 class="section-title">Alert Dialog 示例</h2>
        <button class="btn btn-destructive" @click="showAlert = true">显示警告对话框</button>
        
        <!-- 简单的模态框实现 -->
        <div v-if="showAlert" class="modal-overlay" @click="showAlert = false">
          <div class="modal-content" @click.stop>
            <div class="dialog-header">
              <h4 class="dialog-title">确认操作</h4>
              <p class="dialog-description">您确定要执行此操作吗？此操作不可撤销。</p>
            </div>
            <div class="dialog-footer">
              <button class="btn btn-outline" @click="showAlert = false">取消</button>
              <button class="btn btn-destructive" @click="confirmAction">确认</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Avatar 组件 -->
      <section id="avatars" class="demo-section">
        <h2 class="section-title">Avatar 组件</h2>
        <div class="avatar-demo">
          <div class="avatar">
            <img src="https://github.com/shadcn.png" alt="Avatar" />
            <span class="avatar-fallback">CN</span>
          </div>
          <div class="avatar avatar-sm">
            <img src="https://github.com/shadcn.png" alt="Avatar" />
            <span class="avatar-fallback">SM</span>
          </div>
          <div class="avatar avatar-lg">
            <img src="https://github.com/shadcn.png" alt="Avatar" />
            <span class="avatar-fallback">LG</span>
          </div>
          <div class="avatar avatar-xl">
            <img src="https://github.com/shadcn.png" alt="Avatar" />
            <span class="avatar-fallback">XL</span>
          </div>
        </div>
      </section>

      <!-- Tabs 组件 -->
      <section id="tabs" class="demo-section">
        <h2 class="section-title">Tabs 组件</h2>
        <div class="tabs-demo">
          <div class="tabs-list">
            <button 
              :class="['tab', { active: activeTab === 'tab1' }]" 
              @click="activeTab = 'tab1'"
            >
              Tab 1
            </button>
            <button 
              :class="['tab', { active: activeTab === 'tab2' }]" 
              @click="activeTab = 'tab2'"
            >
              Tab 2
            </button>
            <button 
              :class="['tab', { active: activeTab === 'tab3' }]" 
              @click="activeTab = 'tab3'"
            >
              Tab 3
            </button>
          </div>
          
          <div class="tabs-content">
            <div v-show="activeTab === 'tab1'" class="tab-panel">
              <h4>第一个标签页内容</h4>
              <p>这是第一个标签页的内容区域。</p>
            </div>
            <div v-show="activeTab === 'tab2'" class="tab-panel">
              <h4>第二个标签页内容</h4>
              <p>这是第二个标签页的内容区域。</p>
            </div>
            <div v-show="activeTab === 'tab3'" class="tab-panel">
              <h4>第三个标签页内容</h4>
              <p>这是第三个标签页的内容区域。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Select 组件 -->
      <section id="selects" class="demo-section">
        <h2 class="section-title">Select 组件</h2>
        <div class="select-demo">
          <div class="select-group">
            <label>国家选择</label>
            <select class="select">
              <option value="">请选择国家</option>
              <option value="cn">中国</option>
              <option value="us">美国</option>
              <option value="jp">日本</option>
              <option value="kr">韩国</option>
            </select>
          </div>
          <div class="select-group">
            <label>城市选择</label>
            <select class="select">
              <option value="">请选择城市</option>
              <option value="bj">北京</option>
              <option value="sh">上海</option>
              <option value="gz">广州</option>
              <option value="sz">深圳</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Toggle 组件 -->
      <section id="toggles" class="demo-section">
        <h2 class="section-title">Toggle 组件</h2>
        <div class="toggle-demo">
          <button class="toggle">
            <span>Bold</span>
          </button>
          <button class="toggle">
            <span>Italic</span>
          </button>
          <button class="toggle toggle-active">
            <span>Underline</span>
          </button>
          <button class="toggle">
            <span>Strikethrough</span>
          </button>
        </div>
      </section>

      <!-- Tooltip 组件 -->
      <section id="tooltips" class="demo-section">
        <h2 class="section-title">Tooltip 示例</h2>
        <div class="tooltip-demo">
          <div class="tooltip-wrapper">
            <button class="btn btn-secondary">悬停显示提示</button>
            <div class="tooltip">这是一个提示信息</div>
          </div>
        </div>
      </section>
      
      <!-- 高级组件 -->
      <AdvancedComponentsDemo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AdvancedComponentsDemo from './components/AdvancedComponentsDemo.vue'

const showAlert = ref(false)
const activeTab = ref('tab1')
const activeSection = ref('')

// 定义导航节
const sections = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'textareas', label: 'Textareas' },
  { id: 'checkboxes', label: 'Checkboxes' },
  { id: 'radios', label: 'Radios' },
  { id: 'switches', label: 'Switches' },
  { id: 'badges', label: 'Badges' },
  { id: 'dialogs', label: 'Dialogs' },
  { id: 'avatars', label: 'Avatars' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'selects', label: 'Selects' },
  { id: 'toggles', label: 'Toggles' },
  { id: 'tooltips', label: 'Tooltips' },
  { id: 'tables', label: 'Tables' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'accordions', label: 'Accordions' },
  { id: 'advanced-dialogs', label: 'Advanced Dialogs' },
  { id: 'dropdowns', label: 'Dropdowns' },
]

const confirmAction = () => {
  console.log('用户确认了操作')
  showAlert.value = false
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
.shadcn-ui-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
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

/* Button styles */
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
  line-height: 1;
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

.btn-destructive {
  background-color: #ef4444;
  color: white;
}

.btn-destructive:hover:not(:disabled) {
  background-color: #dc2626;
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

.button-sizes {
  margin-top: 1.5rem;
}

.button-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Card styles */
.card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

.card-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

.card-content {
  padding: 1rem 1.5rem;
}

.card-footer {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.card-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Input styles */
.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.input {
  display: flex;
  height: 2.25rem;
  width: 100%;
  max-width: 300px;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: white;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input::placeholder {
  color: #9ca3af;
}

/* Textarea styles */
.textarea {
  display: flex;
  min-height: 80px;
  width: 100%;
  max-width: 400px;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: white;
  padding: 0.75rem;
  font-size: 0.875rem;
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Checkbox styles */
.checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  left: 0.25rem;
  top: 0.125rem;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 0.125rem 0.125rem 0;
  transform: rotate(45deg);
}

/* Radio styles */
.radio {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.radio:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.radio:checked::after {
  content: '';
  position: absolute;
  left: 0.25rem;
  top: 0.25rem;
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background-color: white;
}

/* Switch styles */
.switch {
  width: 2.5rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #d1d5db;
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.15s ease;
}

.switch:checked {
  background-color: #3b82f6;
}

.switch:checked::after {
  content: '';
  position: absolute;
  left: calc(100% - 1.1rem);
  top: 0.125rem;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background-color: white;
  transition: left 0.15s ease;
}

.switch:not(:checked)::after {
  left: 0.125rem;
}

/* Badge styles */
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  white-space: nowrap;
}

.badge-primary {
  background-color: #3b82f6;
  color: white;
}

.badge-destructive {
  background-color: #ef4444;
  color: white;
}

.badge-outline {
  border: 1px solid #d1d5db;
  color: #374151;
  background-color: transparent;
}

.badge-secondary {
  background-color: #6b7280;
  color: white;
}

.badge-success {
  background-color: #10b981;
  color: white;
}

.badge-warning {
  background-color: #f59e0b;
  color: white;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 24rem;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;
}

.dialog-header {
  margin-bottom: 1rem;
}

.dialog-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.dialog-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Avatar styles */
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  width: 2.5rem;
  height: 2.5rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
}

.avatar-sm {
  width: 2rem;
  height: 2rem;
}

.avatar-lg {
  width: 3rem;
  height: 3rem;
}

.avatar-xl {
  width: 4rem;
  height: 4rem;
}

/* Tabs styles */
.tabs-list {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  cursor: pointer;
  border-radius: 0.5rem 0.5rem 0 0;
  transition: all 0.2s ease;
}

.tab.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  background-color: #eff6ff;
}

.tab:hover:not(.active) {
  color: #374151;
  background-color: #f9fafb;
}

.tab-panel {
  padding: 1rem 0;
}

/* Select styles */
.select-group {
  margin-bottom: 1rem;
}

.select-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.select {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Toggle styles */
.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle:hover {
  background-color: #f9fafb;
}

.toggle.toggle-active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Tooltip styles */
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f2937;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 1000;
}

.tooltip-wrapper:hover .tooltip {
  opacity: 1;
  visibility: visible;
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
.tooltip-demo {
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

</style>