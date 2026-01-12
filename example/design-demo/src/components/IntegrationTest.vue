<template>
  <div class="card-box p-6">
    <h2 class="text-xl font-semibold mb-4">🔌 {{ currentLocale === 'zh-CN' ? '第三方组件库集成测试' : 'Third-Party Integration Test' }}</h2>
    
    <div class="space-y-6">
      <!-- HSL 格式颜色 -->
      <div>
        <h3 class="text-lg font-medium mb-3">{{ currentLocale === 'zh-CN' ? 'HSL 格式颜色' : 'HSL Format Colors' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="color in hslColors" :key="color.token" class="p-4 bg-muted rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">{{ color.name }}</span>
              <div 
                class="w-8 h-8 rounded border border-border"
                :style="{ backgroundColor: color.value }"
              ></div>
            </div>
            <code class="text-xs text-muted-foreground break-all">{{ color.value }}</code>
          </div>
        </div>
      </div>

      <!-- RGB 格式颜色 -->
      <div>
        <h3 class="text-lg font-medium mb-3">{{ currentLocale === 'zh-CN' ? 'RGB 格式颜色' : 'RGB Format Colors' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="color in rgbColors" :key="color.token" class="p-4 bg-muted rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">{{ color.name }}</span>
              <div 
                class="w-8 h-8 rounded border border-border"
                :style="{ backgroundColor: color.value }"
              ></div>
            </div>
            <code class="text-xs text-muted-foreground break-all">{{ color.value }}</code>
          </div>
        </div>
      </div>

      <!-- HEX 格式颜色 -->
      <div>
        <h3 class="text-lg font-medium mb-3">{{ currentLocale === 'zh-CN' ? 'HEX 格式颜色' : 'HEX Format Colors' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="color in hexColors" :key="color.token" class="p-4 bg-muted rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">{{ color.name }}</span>
              <div 
                class="w-8 h-8 rounded border border-border"
                :style="{ backgroundColor: color.value }"
              ></div>
            </div>
            <code class="text-xs text-muted-foreground break-all">{{ color.value }}</code>
          </div>
        </div>
      </div>

      <!-- 批量获取测试 -->
      <div>
        <h3 class="text-lg font-medium mb-3">{{ currentLocale === 'zh-CN' ? '批量获取所有颜色' : 'Get All Colors' }}</h3>
        <div class="space-y-4">
          <div class="p-4 bg-muted rounded-lg">
            <div class="font-medium mb-2">getThemeColors() - HSL</div>
            <pre class="text-xs text-muted-foreground overflow-x-auto">{{ JSON.stringify(allHslColors, null, 2) }}</pre>
          </div>
          <div class="p-4 bg-muted rounded-lg">
            <div class="font-medium mb-2">getThemeColorsRGB() - RGB</div>
            <pre class="text-xs text-muted-foreground overflow-x-auto">{{ JSON.stringify(allRgbColors, null, 2) }}</pre>
          </div>
          <div class="p-4 bg-muted rounded-lg">
            <div class="font-medium mb-2">getThemeColorsHex() - HEX</div>
            <pre class="text-xs text-muted-foreground overflow-x-auto">{{ JSON.stringify(allHexColors, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="p-4 bg-info/10 border border-info rounded-lg">
        <h4 class="font-medium mb-2">💡 {{ currentLocale === 'zh-CN' ? '使用说明' : 'Usage Instructions' }}</h4>
        <div class="text-sm text-muted-foreground space-y-2">
          <p v-if="currentLocale === 'zh-CN'">
            这些工具函数可以帮助你将 Admin Core 的主题颜色集成到第三方组件库中：
          </p>
          <p v-else>
            These utility functions help you integrate Admin Core theme colors into third-party component libraries:
          </p>
          <ul class="list-disc list-inside space-y-1 ml-2">
            <li v-if="currentLocale === 'zh-CN'">
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getHSLColor(token)</code> - 获取单个 HSL 颜色
            </li>
            <li v-else>
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getHSLColor(token)</code> - Get single HSL color
            </li>
            <li v-if="currentLocale === 'zh-CN'">
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getRGBColor(token)</code> - 获取单个 RGB 颜色
            </li>
            <li v-else>
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getRGBColor(token)</code> - Get single RGB color
            </li>
            <li v-if="currentLocale === 'zh-CN'">
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getHexColor(token)</code> - 获取单个 HEX 颜色
            </li>
            <li v-else>
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getHexColor(token)</code> - Get single HEX color
            </li>
            <li v-if="currentLocale === 'zh-CN'">
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getThemeColors()</code> - 批量获取所有 HSL 颜色
            </li>
            <li v-else>
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getThemeColors()</code> - Get all HSL colors
            </li>
            <li v-if="currentLocale === 'zh-CN'">
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getThemeColorsRGB()</code> - 批量获取所有 RGB 颜色
            </li>
            <li v-else>
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getThemeColorsRGB()</code> - Get all RGB colors
            </li>
            <li v-if="currentLocale === 'zh-CN'">
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getThemeColorsHex()</code> - 批量获取所有 HEX 颜色
            </li>
            <li v-else>
              <code class="text-xs bg-muted px-1 py-0.5 rounded">getThemeColorsHex()</code> - Get all HEX colors
            </li>
          </ul>
        </div>
      </div>

      <!-- 支持的组件库 -->
      <div class="p-4 bg-success/10 border border-success rounded-lg">
        <h4 class="font-medium mb-2">✅ {{ currentLocale === 'zh-CN' ? '支持的组件库' : 'Supported Libraries' }}</h4>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-success">●</span>
            <span>Element Plus</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-success">●</span>
            <span>Ant Design Vue</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-success">●</span>
            <span>Naive UI</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-success">●</span>
            <span>Arco Design</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-success">●</span>
            <span>TDesign</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-success">●</span>
            <span>Vant / Varlet</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  getHSLColor, 
  getRGBColor, 
  getHexColor,
  getThemeColors,
  getThemeColorsRGB,
  getThemeColorsHex,
  getLocale,
  type Locale
} from '@admin-core/design'

// 当前语言
const currentLocale = computed<Locale>(() => getLocale())

// 测试的颜色令牌
const colorTokens = [
  { token: 'primary', name: 'Primary' },
  { token: 'secondary', name: 'Secondary' },
  { token: 'accent', name: 'Accent' },
  { token: 'destructive', name: 'Destructive' },
  { token: 'success', name: 'Success' },
  { token: 'warning', name: 'Warning' },
]

// HSL 格式颜色
const hslColors = computed(() => 
  colorTokens.map(({ token, name }) => ({
    token,
    name,
    value: getHSLColor(token)
  }))
)

// RGB 格式颜色
const rgbColors = computed(() => 
  colorTokens.map(({ token, name }) => ({
    token,
    name,
    value: getRGBColor(token)
  }))
)

// HEX 格式颜色
const hexColors = computed(() => 
  colorTokens.map(({ token, name }) => ({
    token,
    name,
    value: getHexColor(token)
  }))
)

// 批量获取所有颜色
const allHslColors = computed(() => getThemeColors())
const allRgbColors = computed(() => getThemeColorsRGB())
const allHexColors = computed(() => getThemeColorsHex())
</script>
