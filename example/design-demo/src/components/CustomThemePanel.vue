<template>
  <div class="card-box p-6">
    <h3 class="text-lg font-semibold mb-4">🎨 自定义主题颜色</h3>
    
    <div class="space-y-4">
      <!-- 主色选择器 -->
      <div>
        <label class="block text-sm font-medium mb-2">选择主色（其他颜色将自动生成）</label>
        <div class="flex gap-3 items-center">
          <input
            v-model="primaryColor"
            type="color"
            class="w-20 h-20 rounded-lg border-2 border-border cursor-pointer"
            @input="onColorChange"
          />
          <div class="flex-1">
            <input
              v-model="primaryColor"
              type="text"
              placeholder="#8B5CF6"
              class="w-full px-4 py-3 rounded-lg bg-input-background border border-input text-foreground text-lg font-mono focus:ring-2 focus:ring-ring outline-none"
              @input="onColorChange"
            />
            <p class="text-xs text-muted-foreground mt-1">
              支持 HEX 格式（如 #8B5CF6）
            </p>
          </div>
        </div>
      </div>

      <!-- 颜色预览 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-muted rounded-lg">
        <div class="text-center">
          <div class="w-full h-16 rounded-lg mb-2" :style="{ backgroundColor: primaryColor }"></div>
          <span class="text-xs text-muted-foreground">主色</span>
        </div>
        <div class="text-center">
          <div class="w-full h-16 bg-secondary rounded-lg mb-2"></div>
          <span class="text-xs text-muted-foreground">次要色</span>
        </div>
        <div class="text-center">
          <div class="w-full h-16 bg-accent rounded-lg mb-2"></div>
          <span class="text-xs text-muted-foreground">强调色</span>
        </div>
        <div class="text-center">
          <div class="w-full h-16 bg-muted rounded-lg border border-border mb-2"></div>
          <span class="text-xs text-muted-foreground">柔和色</span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3">
        <button
          @click="applyCustom"
          class="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
        >
          ✨ 应用主题
        </button>
        <button
          @click="saveCustom"
          class="flex-1 px-4 py-3 rounded-lg bg-success text-success-foreground hover:opacity-90 transition-opacity font-medium"
        >
          💾 保存到本地
        </button>
        <button
          @click="resetCustom"
          class="px-4 py-3 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
        >
          🔄 重置
        </button>
      </div>

      <!-- 快速预设 -->
      <div class="pt-4 border-t border-border">
        <h4 class="text-sm font-medium mb-3">快速预设</h4>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
          <button
            v-for="preset in presets"
            :key="preset.name"
            @click="applyPreset(preset)"
            class="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent transition-colors"
            :title="preset.name"
          >
            <div 
              class="w-10 h-10 rounded-full border-2 border-border"
              :style="{ backgroundColor: preset.color }"
            ></div>
            <span class="text-xs">{{ preset.icon }}</span>
          </button>
        </div>
      </div>

      <!-- 说明 -->
      <div class="text-xs text-muted-foreground bg-info p-3 rounded-lg">
        <p class="font-medium mb-2">💡 智能配色说明：</p>
        <ul class="list-disc list-inside space-y-1">
          <li>只需选择一个主色，系统会自动生成协调的配色方案</li>
          <li>自动计算次要色、强调色、柔和色等所有颜色</li>
          <li>根据当前模式（浅色/暗色）智能调整亮度和饱和度</li>
          <li>保存后刷新页面会自动恢复你的自定义主题</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { applyThemeFromPrimary, clearCustomTheme } from '@admin-core/design'

// 主色
const primaryColor = ref('#8B5CF6')

// 预设颜色
const presets = [
  { name: '紫罗兰', icon: '💜', color: '#8B5CF6' },
  { name: '海洋蓝', icon: '🌊', color: '#06B6D4' },
  { name: '翡翠绿', icon: '💚', color: '#10B981' },
  { name: '日落橙', icon: '🌅', color: '#F59E0B' },
  { name: '樱花粉', icon: '🌸', color: '#EC4899' },
  { name: '深空灰', icon: '🌑', color: '#64748B' },
  { name: '薄荷绿', icon: '🍃', color: '#14B8A6' },
  { name: '玫瑰红', icon: '🌹', color: '#E11D48' },
  { name: '柠檬黄', icon: '🍋', color: '#EAB308' },
  { name: '天空蓝', icon: '☁️', color: '#3B82F6' },
  { name: '薰衣草', icon: '🪻', color: '#A78BFA' },
  { name: '珊瑚橙', icon: '🪸', color: '#FB923C' },
]

// 颜色变化时实时预览
const onColorChange = () => {
  if (primaryColor.value && primaryColor.value.startsWith('#') && primaryColor.value.length === 7) {
    applyCustom()
  }
}

// 应用自定义主题
const applyCustom = () => {
  try {
    applyThemeFromPrimary(primaryColor.value, undefined, false)
  } catch (error) {
    // 静默处理错误
  }
}

// 保存自定义主题
const saveCustom = () => {
  try {
    applyThemeFromPrimary(primaryColor.value, undefined, true)
    alert('✅ 自定义主题已保存到本地！刷新页面后会自动恢复。')
  } catch (error) {
    alert('❌ 保存失败，请检查颜色格式是否正确')
  }
}

// 重置自定义主题
const resetCustom = () => {
  clearCustomTheme()
  primaryColor.value = '#8B5CF6'
  alert('✅ 已重置为默认颜色！')
}

// 应用预设
const applyPreset = (preset: typeof presets[0]) => {
  primaryColor.value = preset.color
  applyCustom()
}
</script>
