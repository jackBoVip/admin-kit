<template>
  <div class="advanced-components-demo">
    <!-- Table 组件 -->
    <section id="tables" class="demo-section">
      <h2 class="section-title">Table 组件</h2>
      <div class="table-demo">
        <table class="table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>职位</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.position }}</td>
              <td>
                <span :class="['badge', { 'badge-success': item.status === 'Active', 'badge-warning': item.status === 'Pending', 'badge-destructive': item.status === 'Inactive' }]">
                  {{ item.status }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline">编辑</button>
                <button class="btn btn-sm btn-destructive">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Pagination 组件 -->
    <section id="pagination" class="demo-section">
      <h2 class="section-title">Pagination 组件</h2>
      <div class="pagination-demo">
        <nav class="pagination">
          <button class="btn btn-outline" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
            上一页
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page"
            :class="['btn', { 'btn-primary': currentPage === page, 'btn-outline': currentPage !== page }]"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button class="btn btn-outline" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
            下一页
          </button>
        </nav>
        <p class="pagination-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页</p>
      </div>
    </section>

    <!-- Accordion 组件 -->
    <section id="accordions" class="demo-section">
      <h2 class="section-title">Accordion 组件</h2>
      <div class="accordion-demo">
        <div 
          v-for="(item, index) in accordionItems" 
          :key="index"
          class="accordion-item"
        >
          <button 
            class="accordion-trigger"
            @click="toggleAccordion(index)"
          >
            <span>{{ item.title }}</span>
            <svg 
              :class="['accordion-icon', { 'accordion-icon-open': activeAccordion === index }]" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          <div 
            :class="['accordion-content', { 'accordion-content-open': activeAccordion === index }]"
            v-show="activeAccordion === index"
          >
            <div class="accordion-body">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dialog 组件 -->
    <section id="dialogs" class="demo-section">
      <h2 class="section-title">Dialog 示例</h2>
      <button class="btn btn-primary" @click="showDialog = true">打开对话框</button>
      
      <!-- 简单的对话框实现 -->
      <div v-if="showDialog" class="modal-overlay" @click="closeDialog">
        <div class="modal-content" @click.stop>
          <div class="dialog-header">
            <h4 class="dialog-title">对话框标题</h4>
            <button class="btn btn-sm btn-ghost" @click="closeDialog">✕</button>
          </div>
          <div class="dialog-body">
            <p>这是对话框的内容区域。您可以在这里放置任何内容。</p>
          </div>
          <div class="dialog-footer">
            <button class="btn btn-outline" @click="closeDialog">取消</button>
            <button class="btn btn-primary" @click="confirmDialog">确认</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Dropdown Menu 组件 -->
    <section id="dropdowns" class="demo-section">
      <h2 class="section-title">Dropdown Menu 示例</h2>
      <div class="dropdown-demo">
        <div class="dropdown-wrapper">
          <button class="btn btn-secondary" @click="toggleDropdown">
            更多操作
            <svg 
              :class="['dropdown-icon', { 'dropdown-icon-open': showDropdown }]" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          <div v-if="showDropdown" class="dropdown-menu" @click.stop>
            <button class="dropdown-item" @click="handleDropdownAction('edit')">编辑</button>
            <button class="dropdown-item" @click="handleDropdownAction('duplicate')">复制</button>
            <button class="dropdown-item" @click="handleDropdownAction('archive')">归档</button>
            <div class="dropdown-separator"></div>
            <button class="dropdown-item dropdown-item-danger" @click="handleDropdownAction('delete')">删除</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

// 表格数据
const tableData = ref([
  { name: '张三', position: '前端工程师', status: 'Active' },
  { name: '李四', position: '后端工程师', status: 'Active' },
  { name: '王五', position: 'UI设计师', status: 'Pending' },
  { name: '赵六', position: '产品经理', status: 'Inactive' },
  { name: '钱七', position: '测试工程师', status: 'Active' },
])

// 分页数据
const currentPage = ref(1)
const totalPages = 5

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page
  }
}

// 手风琴数据
const accordionItems = [
  {
    title: '什么是 Shadcn UI?',
    content: 'Shadcn UI 是一个基于 Tailwind CSS 的可访问、可定制的 UI 组件库，专为 React 设计。它提供了高质量的组件，具有良好的无障碍支持。'
  },
  {
    title: '如何安装?',
    content: '可以通过 npm 或 yarn 安装 Shadcn UI。首先安装必要的依赖，然后使用 npx shadcn-ui@latest init 命令进行初始化。'
  },
  {
    title: '如何自定义主题?',
    content: '可以通过修改 tailwind.config.js 文件来自定义主题颜色、间距、字体等。还可以通过 CSS 变量来覆盖默认样式。'
  }
]

const activeAccordion = ref<number | null>(null)

const toggleAccordion = (index: number) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}

// 对话框控制
const showDialog = ref(false)

const closeDialog = () => {
  showDialog.value = false
}

const confirmDialog = () => {
  console.log('用户确认了对话框操作')
  closeDialog()
}

// 下拉菜单控制
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleDropdownAction = (action: string) => {
  console.log(`执行操作: ${action}`)
  showDropdown.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown-wrapper')) {
    showDropdown.value = false
  }
}

document.addEventListener('click', handleClickOutside)

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.advanced-components-demo {
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.table th,
.table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #1f2937;
}

.table tr:last-child td {
  border-bottom: none;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.pagination-info {
  margin-left: 1rem;
  color: #6b7280;
}

.accordion-demo {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #e5e7eb;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-trigger {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  transition: background-color 0.2s ease;
}

.accordion-trigger:hover {
  background-color: #f3f4f6;
}

.accordion-icon {
  transition: transform 0.2s ease;
}

.accordion-icon-open {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
  transition: all 0.2s ease;
}

.accordion-content-open {
  background-color: white;
}

.accordion-body {
  padding: 1rem;
  color: #4b5563;
}

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  min-width: 160px;
  padding: 0.25rem 0;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dropdown-item {
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #1f2937;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item-danger {
  color: #ef4444;
}

.dropdown-item-danger:hover {
  background-color: #fee2e2;
}

.dropdown-separator {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.25rem 0;
}

.dropdown-icon {
  transition: transform 0.2s ease;
  margin-left: 0.5rem;
}

.dropdown-icon-open {
  transform: rotate(180deg);
}
</style>