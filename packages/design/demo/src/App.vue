<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
    <!-- 头部控制栏 -->
    <header class="sticky top-0 z-50 bg-header border-b border-border backdrop-blur-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-primary">Admin Core 主题系统</h1>
          
          <div class="flex items-center gap-4">
            <!-- 暗色模式切换 -->
            <button
              @click="toggleDarkMode()"
              class="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
            >
              {{ isDark ? '🌙 暗色' : '☀️ 浅色' }}
            </button>

            <!-- 主题选择器 -->
            <select
              :value="variant"
              @change="(e) => setVariant((e.target as HTMLSelectElement).value as any)"
              class="px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:ring-2 focus:ring-ring outline-none"
            >
              <option value="default">默认主题</option>
              <option v-for="theme in themes" :key="theme.id" :value="theme.id">
                {{ theme.icon }} {{ theme.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="container mx-auto px-4 py-8">
      <!-- 主题信息卡片 -->
      <div class="card-box p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">当前主题配置</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-muted-foreground">模式：</span>
            <span class="font-medium">{{ isDark ? '暗色' : '浅色' }}</span>
          </div>
          <div>
            <span class="text-muted-foreground">主题：</span>
            <span class="font-medium">{{ currentThemeMetadata?.name || '默认' }}</span>
          </div>
          <div>
            <span class="text-muted-foreground">主色：</span>
            <span class="inline-block w-6 h-6 rounded bg-primary border border-border ml-2"></span>
          </div>
          <div>
            <span class="text-muted-foreground">背景色：</span>
            <span class="inline-block w-6 h-6 rounded bg-background border border-border ml-2"></span>
          </div>
        </div>
      </div>

      <!-- 自定义主题面板 -->
      <CustomThemePanel class="mb-8" />

      <!-- 颜色令牌展示 -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6">颜色令牌</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorCard
            v-for="color in colorTokens"
            :key="color.name"
            :name="color.name"
            :description="color.description"
            :bg-class="color.bgClass"
            :text-class="color.textClass"
          />
        </div>
      </section>

      <!-- 组件示例 -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6">组件示例</h2>
        
        <!-- 按钮组 -->
        <div class="card-box p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">按钮</h3>
          <div class="flex flex-wrap gap-4">
            <button class="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              主要按钮
            </button>
            <button class="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
              次要按钮
            </button>
            <button class="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity">
              危险按钮
            </button>
            <button class="px-4 py-2 rounded-lg bg-success text-success-foreground hover:opacity-90 transition-opacity">
              成功按钮
            </button>
            <button class="px-4 py-2 rounded-lg bg-warning text-warning-foreground hover:opacity-90 transition-opacity">
              警告按钮
            </button>
            <button class="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors">
              轮廓按钮
            </button>
          </div>
        </div>

        <!-- 卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="card-box p-6">
            <h4 class="text-lg font-semibold mb-2">默认卡片</h4>
            <p class="text-muted-foreground">这是一个使用默认卡片样式的示例。</p>
          </div>
          <div class="bg-muted text-muted-foreground rounded-lg p-6">
            <h4 class="text-lg font-semibold mb-2">柔和卡片</h4>
            <p>这是一个使用柔和背景色的卡片。</p>
          </div>
          <div class="bg-accent text-accent-foreground rounded-lg p-6">
            <h4 class="text-lg font-semibold mb-2">强调卡片</h4>
            <p>这是一个使用强调色的卡片。</p>
          </div>
        </div>

        <!-- 输入框 -->
        <div class="card-box p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">表单元素</h3>
          <div class="space-y-4 max-w-md">
            <div>
              <label class="block text-sm font-medium mb-2">文本输入</label>
              <input
                type="text"
                placeholder="请输入内容..."
                class="w-full px-4 py-2 rounded-lg bg-input-background border border-input text-foreground placeholder:text-input-placeholder focus:ring-2 focus:ring-ring outline-none transition-shadow"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">文本域</label>
              <textarea
                placeholder="请输入多行内容..."
                rows="3"
                class="w-full px-4 py-2 rounded-lg bg-input-background border border-input text-foreground placeholder:text-input-placeholder focus:ring-2 focus:ring-ring outline-none transition-shadow resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">选择框</label>
              <select class="w-full px-4 py-2 rounded-lg bg-input-background border border-input text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow">
                <option>选项 1</option>
                <option>选项 2</option>
                <option>选项 3</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 消息提示 -->
        <div class="card-box p-6">
          <h3 class="text-lg font-semibold mb-4">消息提示</h3>
          <div class="space-y-4">
            <div class="bg-info text-info-foreground rounded-lg p-4 border-l-4 border-primary">
              <div class="font-semibold mb-1">信息提示</div>
              <div class="text-sm">这是一条信息提示消息。</div>
            </div>
            <div class="bg-success text-success-foreground rounded-lg p-4 border-l-4 border-success">
              <div class="font-semibold mb-1">成功提示</div>
              <div class="text-sm">操作已成功完成！</div>
            </div>
            <div class="bg-warning text-warning-foreground rounded-lg p-4 border-l-4 border-warning">
              <div class="font-semibold mb-1">警告提示</div>
              <div class="text-sm">请注意这个警告信息。</div>
            </div>
            <div class="bg-destructive text-destructive-foreground rounded-lg p-4 border-l-4 border-destructive">
              <div class="font-semibold mb-1">错误提示</div>
              <div class="text-sm">发生了一个错误，请重试。</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 工具类示例 -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6">工具类示例</h2>
        <div class="card-box p-6">
          <div class="space-y-4">
            <div class="flex-center gap-4 p-4 bg-muted rounded-lg">
              <div class="w-12 h-12 bg-primary rounded-full"></div>
              <span>水平居中布局 (.flex-center)</span>
            </div>
            <div class="flex-col-center gap-4 p-4 bg-muted rounded-lg h-32">
              <div class="w-12 h-12 bg-primary rounded-full"></div>
              <span>垂直居中布局 (.flex-col-center)</span>
            </div>
            <div class="outline-box p-4">
              <span>轮廓框样式 (.outline-box)</span>
            </div>
            <div>
              <a href="#" class="admin-link">这是一个链接样式 (.admin-link)</a>
            </div>
          </div>
        </div>
      </section>

      <!-- 圆角示例 -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6">圆角大小</h2>
        <div class="card-box p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="w-24 h-24 bg-primary mx-auto rounded-sm mb-2"></div>
              <span class="text-sm">rounded-sm</span>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-primary mx-auto rounded-md mb-2"></div>
              <span class="text-sm">rounded-md</span>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-primary mx-auto rounded-lg mb-2"></div>
              <span class="text-sm">rounded-lg</span>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-primary mx-auto rounded-xl mb-2"></div>
              <span class="text-sm">rounded-xl</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 透明度修饰符 -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6">透明度修饰符</h2>
        <div class="card-box p-6">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="text-center">
              <div class="w-full h-24 bg-primary/10 rounded-lg mb-2"></div>
              <span class="text-sm">bg-primary/10</span>
            </div>
            <div class="text-center">
              <div class="w-full h-24 bg-primary/30 rounded-lg mb-2"></div>
              <span class="text-sm">bg-primary/30</span>
            </div>
            <div class="text-center">
              <div class="w-full h-24 bg-primary/50 rounded-lg mb-2"></div>
              <span class="text-sm">bg-primary/50</span>
            </div>
            <div class="text-center">
              <div class="w-full h-24 bg-primary/70 rounded-lg mb-2"></div>
              <span class="text-sm">bg-primary/70</span>
            </div>
            <div class="text-center">
              <div class="w-full h-24 bg-primary/90 rounded-lg mb-2"></div>
              <span class="text-sm">bg-primary/90</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-border bg-card mt-12">
      <div class="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        <p>Admin Core Design System v0.1.0</p>
        <p class="mt-2">支持 15 种主题变体 × 2 种模式 = 30 种主题组合</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@admin-core/design'
import ColorCard from './components/ColorCard.vue'
import CustomThemePanel from './components/CustomThemePanel.vue'

// 使用主题系统
const {
  mode,
  variant,
  isDark,
  setMode,
  setVariant,
  toggleDarkMode,
  getAvailableThemes,
  getCurrentThemeMetadata,
} = useTheme()

// 获取所有可用主题
const themes = getAvailableThemes()

// 颜色令牌
const colorTokens = [
  { name: 'Primary', description: '主色', bgClass: 'bg-primary', textClass: 'text-primary-foreground' },
  { name: 'Secondary', description: '次要色', bgClass: 'bg-secondary', textClass: 'text-secondary-foreground' },
  { name: 'Accent', description: '强调色', bgClass: 'bg-accent', textClass: 'text-accent-foreground' },
  { name: 'Muted', description: '柔和色', bgClass: 'bg-muted', textClass: 'text-muted-foreground' },
  { name: 'Destructive', description: '破坏性', bgClass: 'bg-destructive', textClass: 'text-destructive-foreground' },
  { name: 'Success', description: '成功', bgClass: 'bg-success', textClass: 'text-success-foreground' },
  { name: 'Warning', description: '警告', bgClass: 'bg-warning', textClass: 'text-warning-foreground' },
  { name: 'Info', description: '信息', bgClass: 'bg-info', textClass: 'text-info-foreground' },
  { name: 'Card', description: '卡片', bgClass: 'bg-card', textClass: 'text-card-foreground' },
]

// 获取当前主题元数据
const currentThemeMetadata = getCurrentThemeMetadata()
</script>
