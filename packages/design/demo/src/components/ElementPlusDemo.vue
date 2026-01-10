<template>
  <div class="card-box p-6">
    <h2 class="text-xl font-semibold mb-4">
      🎨 {{ currentLocale === 'zh-CN' ? 'Element Plus 集成演示' : 'Element Plus Integration Demo' }}
    </h2>

    <div class="space-y-6">
      <!-- 说明 -->
      <div class="p-4 bg-info/10 border border-info rounded-lg">
        <p class="text-sm">
          <span v-if="currentLocale === 'zh-CN'">
            以下 Element Plus 组件使用了 Admin Core 的主题颜色。切换主题或暗色模式，Element Plus 组件会自动同步颜色。
          </span>
          <span v-else>
            The following Element Plus components use Admin Core theme colors. Switch themes or dark mode, and Element Plus components will automatically sync colors.
          </span>
        </p>
      </div>

      <!-- 按钮组 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '按钮 (Buttons)' : 'Buttons' }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <el-button type="primary">{{ currentLocale === 'zh-CN' ? '主要按钮' : 'Primary' }}</el-button>
          <el-button type="success">{{ currentLocale === 'zh-CN' ? '成功按钮' : 'Success' }}</el-button>
          <el-button type="warning">{{ currentLocale === 'zh-CN' ? '警告按钮' : 'Warning' }}</el-button>
          <el-button type="danger">{{ currentLocale === 'zh-CN' ? '危险按钮' : 'Danger' }}</el-button>
          <el-button type="info">{{ currentLocale === 'zh-CN' ? '信息按钮' : 'Info' }}</el-button>
        </div>
      </div>

      <!-- 输入框 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '输入框 (Input)' : 'Input' }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <el-input 
            v-model="inputValue" 
            :placeholder="currentLocale === 'zh-CN' ? '请输入内容' : 'Please input'"
          />
          <el-input 
            v-model="inputValue2" 
            :placeholder="currentLocale === 'zh-CN' ? '带图标的输入框' : 'Input with icon'"
          >
            <template #prefix>
              <span>🔍</span>
            </template>
          </el-input>
        </div>
      </div>

      <!-- 选择器 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '选择器 (Select)' : 'Select' }}
        </h3>
        <div class="max-w-md">
          <el-select 
            v-model="selectValue" 
            :placeholder="currentLocale === 'zh-CN' ? '请选择' : 'Please select'"
            class="w-full"
          >
            <el-option 
              v-for="item in options" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <!-- 开关 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '开关 (Switch)' : 'Switch' }}
        </h3>
        <div class="flex items-center gap-4">
          <el-switch v-model="switchValue1" />
          <el-switch v-model="switchValue2" />
          <el-switch v-model="switchValue3" />
        </div>
      </div>

      <!-- 标签 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '标签 (Tags)' : 'Tags' }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <el-tag>{{ currentLocale === 'zh-CN' ? '默认标签' : 'Default' }}</el-tag>
          <el-tag type="success">{{ currentLocale === 'zh-CN' ? '成功标签' : 'Success' }}</el-tag>
          <el-tag type="warning">{{ currentLocale === 'zh-CN' ? '警告标签' : 'Warning' }}</el-tag>
          <el-tag type="danger">{{ currentLocale === 'zh-CN' ? '危险标签' : 'Danger' }}</el-tag>
          <el-tag type="info">{{ currentLocale === 'zh-CN' ? '信息标签' : 'Info' }}</el-tag>
        </div>
      </div>

      <!-- 进度条 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '进度条 (Progress)' : 'Progress' }}
        </h3>
        <div class="space-y-3 max-w-2xl">
          <el-progress :percentage="50" />
          <el-progress :percentage="70" status="success" />
          <el-progress :percentage="90" status="warning" />
          <el-progress :percentage="100" status="exception" />
        </div>
      </div>

      <!-- 消息提示 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '消息提示 (Alert)' : 'Alert' }}
        </h3>
        <div class="space-y-3">
          <el-alert 
            :title="currentLocale === 'zh-CN' ? '成功提示' : 'Success alert'" 
            type="success" 
            show-icon 
          />
          <el-alert 
            :title="currentLocale === 'zh-CN' ? '信息提示' : 'Info alert'" 
            type="info" 
            show-icon 
          />
          <el-alert 
            :title="currentLocale === 'zh-CN' ? '警告提示' : 'Warning alert'" 
            type="warning" 
            show-icon 
          />
          <el-alert 
            :title="currentLocale === 'zh-CN' ? '错误提示' : 'Error alert'" 
            type="error" 
            show-icon 
          />
        </div>
      </div>

      <!-- 通知按钮 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '通知 (Notification)' : 'Notification' }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <el-button @click="showNotification('success')">
            {{ currentLocale === 'zh-CN' ? '成功通知' : 'Success' }}
          </el-button>
          <el-button @click="showNotification('warning')">
            {{ currentLocale === 'zh-CN' ? '警告通知' : 'Warning' }}
          </el-button>
          <el-button @click="showNotification('info')">
            {{ currentLocale === 'zh-CN' ? '信息通知' : 'Info' }}
          </el-button>
          <el-button @click="showNotification('error')">
            {{ currentLocale === 'zh-CN' ? '错误通知' : 'Error' }}
          </el-button>
        </div>
      </div>

      <!-- 卡片 -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          {{ currentLocale === 'zh-CN' ? '卡片 (Card)' : 'Card' }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <el-card shadow="hover">
            <template #header>
              <div class="font-medium">
                {{ currentLocale === 'zh-CN' ? '卡片标题' : 'Card Title' }}
              </div>
            </template>
            <div>
              {{ currentLocale === 'zh-CN' ? '这是卡片内容' : 'Card content' }}
            </div>
          </el-card>
          <el-card shadow="hover">
            <template #header>
              <div class="font-medium">
                {{ currentLocale === 'zh-CN' ? '卡片标题' : 'Card Title' }}
              </div>
            </template>
            <div>
              {{ currentLocale === 'zh-CN' ? '这是卡片内容' : 'Card content' }}
            </div>
          </el-card>
          <el-card shadow="hover">
            <template #header>
              <div class="font-medium">
                {{ currentLocale === 'zh-CN' ? '卡片标题' : 'Card Title' }}
              </div>
            </template>
            <div>
              {{ currentLocale === 'zh-CN' ? '这是卡片内容' : 'Card content' }}
            </div>
          </el-card>
        </div>
      </div>

      <!-- 主题颜色信息 -->
      <div class="p-4 bg-success/10 border border-success rounded-lg">
        <h4 class="font-medium mb-2">
          ✅ {{ currentLocale === 'zh-CN' ? '集成状态' : 'Integration Status' }}
        </h4>
        <div class="text-sm space-y-1">
          <p v-if="currentLocale === 'zh-CN'">
            • Element Plus 组件已成功集成 Admin Core 主题系统
          </p>
          <p v-else>
            • Element Plus components successfully integrated with Admin Core theme system
          </p>
          <p v-if="currentLocale === 'zh-CN'">
            • 当前主题：<strong>{{ currentTheme?.name }}</strong>
          </p>
          <p v-else>
            • Current theme: <strong>{{ currentTheme?.name }}</strong>
          </p>
          <p v-if="currentLocale === 'zh-CN'">
            • 模式：<strong>{{ isDark ? '暗色' : '浅色' }}</strong>
          </p>
          <p v-else>
            • Mode: <strong>{{ isDark ? 'Dark' : 'Light' }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElNotification } from 'element-plus'
import { useTheme, getLocale, type Locale } from '@admin-core/design'

// 主题系统
const { isDark, getCurrentThemeMetadata } = useTheme()
const currentTheme = getCurrentThemeMetadata()

// 当前语言
const currentLocale = computed<Locale>(() => getLocale())

// 表单数据
const inputValue = ref('')
const inputValue2 = ref('')
const selectValue = ref('')
const switchValue1 = ref(true)
const switchValue2 = ref(false)
const switchValue3 = ref(true)

// 选择器选项
const options = computed(() => {
  if (currentLocale.value === 'zh-CN') {
    return [
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
    ]
  } else {
    return [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
    ]
  }
})

// 显示通知
const showNotification = (type: 'success' | 'warning' | 'info' | 'error') => {
  const messages = {
    'zh-CN': {
      success: { title: '成功', message: '这是一条成功通知消息' },
      warning: { title: '警告', message: '这是一条警告通知消息' },
      info: { title: '信息', message: '这是一条信息通知消息' },
      error: { title: '错误', message: '这是一条错误通知消息' },
    },
    'en-US': {
      success: { title: 'Success', message: 'This is a success notification' },
      warning: { title: 'Warning', message: 'This is a warning notification' },
      info: { title: 'Info', message: 'This is an info notification' },
      error: { title: 'Error', message: 'This is an error notification' },
    }
  }

  const msg = messages[currentLocale.value][type]
  
  ElNotification({
    title: msg.title,
    message: msg.message,
    type,
  })
}
</script>
