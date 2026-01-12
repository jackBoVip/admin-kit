<template>
  <div class="shared-features-demo">
    <h2>共享功能演示</h2>
    
    <!-- 标签页导航 -->
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.title }}
      </button>
    </div>
    
    <!-- 通用工具标签页 -->
    <div v-if="activeTab === 'utils'" class="tab-content">
      <UtilsDemo />
    </div>
    
    <!-- 数据处理标签页 -->
    <div v-if="activeTab === 'data'" class="tab-content">
      <DataProcessingDemo />
    </div>
    
    <!-- 缓存功能标签页 -->
    <div v-if="activeTab === 'cache'" class="tab-content">
      <CacheDemo />
    </div>
    
    <!-- 浏览器工具标签页 -->
    <div v-if="activeTab === 'browser'" class="tab-content">
      <BrowserUtilsDemo />
    </div>
    
    <!-- 颜色功能标签页 -->
    <div v-if="activeTab === 'color'" class="tab-content">
      <ColorDemo />
    </div>
    
    <!-- 外部依赖标签页 -->
    <div v-if="activeTab === 'external'" class="tab-content">
      <ExternalDemo />
    </div>
    
    <!-- 常量标签页 -->
    <div v-if="activeTab === 'constants'" class="tab-content">
      <ConstantsDemo />
    </div>
    
    <!-- 类型定义标签页 -->
    <div v-if="activeTab === 'types'" class="tab-content">
      <TypesDemo />
    </div>
    
    <!-- 状态存储标签页 -->
    <div v-if="activeTab === 'store'" class="tab-content">
      <StoreDemo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import UtilsDemo from './UtilsDemo.vue'
import DataProcessingDemo from './DataProcessingDemo.vue'
import CacheDemo from './CacheDemo.vue'
import BrowserUtilsDemo from './BrowserUtilsDemo.vue'
import ColorDemo from './ColorDemo.vue'
import ExternalDemo from './ExternalDemo.vue'
import ConstantsDemo from './ConstantsDemo.vue'
import TypesDemo from './TypesDemo.vue'
import StoreDemo from './StoreDemo.vue'

// 定义标签页类型
interface Tab {
  id: string;
  title: string;
}

// 标签页相关数据
const tabs = ref<Tab[]>([
  { id: 'utils', title: '通用工具' },
  { id: 'data', title: '数据处理' },
  { id: 'browser', title: '浏览器工具' },
  { id: 'external', title: '外部依赖' },
  { id: 'cache', title: '缓存功能' },
  { id: 'color', title: '颜色工具' },
  { id: 'constants', title: '常量' },
  { id: 'types', title: '类型定义' },
  { id: 'store', title: '状态存储' },
]);

const activeTab = ref<string>('utils');

// 工具函数演示
const sleepResult = ref('')
const noopResult = ref('')
const debounceInput = ref('')
const debouncedValue = ref('')
const throttleClickCount = ref(0)
const treeDataInput = ref('[{"id": 1, "name": "Parent", "children": [{"id": 2, "name": "Child"}]}]')
const processedTreeData = ref<any>(null)
const searchTerm = ref('')
const filteredArray = ref<{ id: number; name: string; category: string }[]>([])

// 通用工具相关变量
const environmentResult = ref<any>(null)
const validationInput = ref('')
const validationResult = ref<any>(null)

// 缓存管理相关变量
const storagePrefix = ref('demo')
const storageKey = ref('')
const storageValue = ref('')
const storageTTL = ref<number | null>(null)
const storageResult = ref<any>(null)

// 颜色处理相关变量
const colorInput = ref('#3b82f6')
const colorResults = ref<any>(null)

// 其他工具函数相关变量
const idPrefix = ref('')
const idResult = ref('')
const fileSizeBytes = ref<number | null>(null)
const fileSizeResult = ref('')
const numberToFormat = ref<number | null>(null)
const numberResult = ref('')
const urlToParse = ref('')
const urlParamsResult = ref<any>(null)
const textToCopy = ref('Hello World!')
const copyResult = ref('')
const downloadUrl = ref('https://www.w3.org/W3C-IPO/ipo.jpg')
const downloadFilename = ref('test-image.jpg')
const cssVariableName = ref('--primary-color')
const cssVariableValue = ref('blue')
const dateToFormat = ref(new Date().toISOString())
const dateFormat = ref('YYYY-MM-DD HH:mm:ss')
const dateResult = ref('')

// 模拟数组过滤功能
const sampleArray = [
  { id: 1, name: 'Apple', category: 'fruit' },
  { id: 2, name: 'Banana', category: 'fruit' },
  { id: 3, name: 'Carrot', category: 'vegetable' },
  { id: 4, name: 'Broccoli', category: 'vegetable' },
]

// 浏览器工具相关变量
const classNamesInput = ref('')
const cnResult = ref('')
const rectResult = ref<any>(null)

// 外部依赖相关变量
const relativeDate = ref(new Date().toISOString())
const relativeTimeResult = ref('')
const checkDate = ref(new Date().toISOString())
const startDate = ref(new Date().toISOString())
const endDate = ref(new Date().toISOString())
const dateRangeResult = ref('')
const daysDate1 = ref(new Date().toISOString())
const daysDate2 = ref(new Date().toISOString())
const daysDiffResult = ref('')
const defuObj1 = ref('{}')
const defuObj2 = ref('{}')
const defuResult = ref<any>(null)

// 测试环境判断函数
const testEnvironment = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared) {
      const result = {
        isDev: shared.isDev,
        isProd: shared.isProd,
        isBrowser: shared.isBrowser,
        isServer: shared.isServer,
        isMacOs: shared.isMacOs ? shared.isMacOs() : 'N/A',
        isWindowsOs: shared.isWindowsOs ? shared.isWindowsOs() : 'N/A',
        isMobile: shared.isMobile ? shared.isMobile() : 'N/A',
        isIOS: shared.isIOS ? shared.isIOS() : 'N/A',
        isAndroid: shared.isAndroid ? shared.isAndroid() : 'N/A',
        isWechat: shared.isWechat ? shared.isWechat() : 'N/A',
        isTouchDevice: shared.isTouchDevice ? shared.isTouchDevice() : 'N/A',
        getBrowserInfo: shared.getBrowserInfo ? shared.getBrowserInfo() : 'N/A',
        getOSInfo: shared.getOSInfo ? shared.getOSInfo() : 'N/A',
      }
      
      environmentResult.value = result
    } else {
      environmentResult.value = { error: 'Environment functions not available' }
    }
  } catch (error) {
    console.error('导入 @admin-core/shared 失败:', error)
    environmentResult.value = { error: '导入失败，请检查包是否正确安装' }
  }
}

// 测试验证函数
const testIsEmpty = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isEmpty) {
      const result = shared.isEmpty(validationInput.value)
      validationResult.value = { function: 'isEmpty', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isEmpty function not available' }
    }
  } catch (error) {
    console.error('isEmpty test failed:', error)
    validationResult.value = { error: 'isEmpty test failed' }
  }
}

const testIsHttpUrl = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isHttpUrl) {
      const result = shared.isHttpUrl(validationInput.value)
      validationResult.value = { function: 'isHttpUrl', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isHttpUrl function not available' }
    }
  } catch (error) {
    console.error('isHttpUrl test failed:', error)
    validationResult.value = { error: 'isHttpUrl test failed' }
  }
}

const testIsEmail = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isEmail) {
      const result = shared.isEmail(validationInput.value)
      validationResult.value = { function: 'isEmail', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isEmail function not available' }
    }
  } catch (error) {
    console.error('isEmail test failed:', error)
    validationResult.value = { error: 'isEmail test failed' }
  }
}

const testIsPhone = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isPhone) {
      const result = shared.isPhone(validationInput.value)
      validationResult.value = { function: 'isPhone', input: validationInput.value, result }
    } else {
      validationResult.value = { error: 'isPhone function not available' }
    }
  } catch (error) {
    console.error('isPhone test failed:', error)
    validationResult.value = { error: 'isPhone test failed' }
  }
}

// 合并类名
const testCn = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.cn) {
      const result = shared.cn(classNamesInput.value.split(' '))
      cnResult.value = result
    } else {
      cnResult.value = 'cn function not available'
    }
  } catch (error) {
    console.error('cn test failed:', error)
    cnResult.value = 'cn function not available'
  }
}

// 获取元素可见区域
const testGetElementVisibleRect = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.getElementVisibleRect) {
      // 使用文档中body元素作为示例
      const element = document.body
      const result = shared.getElementVisibleRect(element)
      rectResult.value = result
    } else {
      rectResult.value = { error: 'getElementVisibleRect function not available' }
    }
  } catch (error) {
    console.error('getElementVisibleRect test failed:', error)
    rectResult.value = { error: 'Function not available' }
  }
}

// 获取相对时间
const testGetRelativeTime = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.getRelativeTime) {
      const result = shared.getRelativeTime(relativeDate.value)
      relativeTimeResult.value = result
    } else {
      relativeTimeResult.value = 'getRelativeTime function not available'
    }
  } catch (error) {
    console.error('getRelativeTime test failed:', error)
    relativeTimeResult.value = 'getRelativeTime function not available'
  }
}

// 检查日期范围
const testIsDateInRange = async () => {
  try {
    // 验证日期输入
    if (!checkDate.value || !startDate.value || !endDate.value) {
      dateRangeResult.value = '请提供所有日期参数'
      return
    }
    
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.isDateInRange) {
      const result = shared.isDateInRange(checkDate.value, startDate.value, endDate.value)
      dateRangeResult.value = result
    } else {
      dateRangeResult.value = 'isDateInRange function not available'
    }
  } catch (error) {
    console.error('isDateInRange test failed:', error)
    dateRangeResult.value = `错误: ${error instanceof Error ? error.message : '未知错误'}`
  }
}

// 计算天数差
const testDaysDiff = async () => {
  try {
    // 验证日期输入
    if (!daysDate1.value || !daysDate2.value) {
      daysDiffResult.value = '请提供两个日期参数'
      return
    }
    
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.getDaysDiff) {
      const result = shared.getDaysDiff(daysDate1.value, daysDate2.value)
      daysDiffResult.value = result
    } else {
      daysDiffResult.value = 'getDaysDiff function not available'
    }
  } catch (error) {
    console.error('getDaysDiff test failed:', error)
    daysDiffResult.value = `错误: ${error instanceof Error ? error.message : '未知错误'}`
  }
}

// 深度合并
const testDefu = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.defu) {
      const obj1 = JSON.parse(defuObj1.value)
      const obj2 = JSON.parse(defuObj2.value)
      const result = shared.defu(obj1, obj2)
      defuResult.value = result
    } else {
      defuResult.value = { error: 'defu function not available' }
    }
  } catch (error) {
    console.error('defu test failed:', error)
    defuResult.value = { error: 'Invalid JSON or function not available' }
  }
}

// 进度条开始
const testNProgressStart = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.startProgress) {
      shared.startProgress()
    } else {
      alert('NProgress not available')
    }
  } catch (error) {
    console.error('NProgress start failed:', error)
    alert('NProgress not available')
  }
}

// 进度条完成
const testNProgressDone = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.doneProgress) {
      shared.doneProgress()
    } else {
      alert('NProgress not available')
    }
  } catch (error) {
    console.error('NProgress done failed:', error)
    alert('NProgress not available')
  }
}

// 进度条增加
const testNProgressInc = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.incProgress) {
      shared.incProgress()
    } else {
      alert('NProgress not available')
    }
  } catch (error) {
    console.error('NProgress inc failed:', error)
    alert('NProgress not available')
  }
}

// 测试 sleep 函数
const testSleep = async () => {
  sleepResult.value = '等待中...'
  
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.sleep) {
      await shared.sleep(2000)
      sleepResult.value = '延迟2秒执行完成!'
    } else {
      sleepResult.value = 'sleep 函数不可用'
    }
  } catch (error) {
    console.error('导入 @admin-core/shared 失败:', error)
    sleepResult.value = '导入失败，请检查包是否正确安装'
  }
}

// 防抖函数
const handleDebounceInput = async (e: Event) => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.debounce) {
      const debouncedFn = shared.debounce((event: Event) => {
        const target = event.target as HTMLInputElement
        debouncedValue.value = target.value
      }, 1000)
      debouncedFn(e)
    }
  } catch (error) {
    console.error('导入 debounce 失败:', error)
  }
}

// 节流函数
let throttledClick: (() => void) | null = null

const handleThrottleClick = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.throttle) {
      if (!throttledClick) {
        throttledClick = shared.throttle(() => {
          throttleClickCount.value += 1
        }, 2000)
      }
      if(throttledClick) {
        throttledClick()
      }
    }
  } catch (error) {
    console.error('导入 throttle 失败:', error)
  }
}

// 测试 noop 函数
const testNoop = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.noop) {
      shared.noop() // 调用 noop 函数
      noopResult.value = 'Noop 函数已执行 (实际上什么都不做)'
    } else {
      noopResult.value = 'noop 函数不可用'
    }
  } catch (error) {
    console.error('导入 @admin-core/shared 失败:', error)
    noopResult.value = '导入失败，请检查包是否正确安装'
  }
}

// 处理树形数据
const processTreeData = async () => {
  try {
    const data = JSON.parse(treeDataInput.value)
    
    // 尝试使用 @admin-core/shared 中的数据处理工具
    try {
      const shared: any = await import('@admin-core/shared')
      // 如果有树形数据处理工具，可以在这里使用
      processedTreeData.value = data
    } catch (sharedError) {
      console.warn('无法使用 @admin-core/shared 数据处理工具:', sharedError)
      processedTreeData.value = data
    }
  } catch (error) {
    processedTreeData.value = { error: 'Invalid JSON format' }
  }
}

// 初始化存储管理器
let storageManager: any = null

const initStorageManager = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    if (shared && shared.StorageManager) {
      storageManager = new shared.StorageManager({ 
        prefix: storagePrefix.value, 
        storageType: 'localStorage' 
      })
      storageResult.value = { message: `存储管理器初始化成功，前缀: ${storagePrefix.value}` }
    } else {
      storageResult.value = { error: 'StorageManager 不可用' }
    }
  } catch (error) {
    console.error('初始化存储管理器失败:', error)
    storageResult.value = { error: '初始化失败' }
  }
}

// 设置存储项
const setStorageItem = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const ttlMs = storageTTL.value ? storageTTL.value * 1000 : undefined
    storageManager.setItem(storageKey.value, storageValue.value, ttlMs)
    storageResult.value = { message: `已设置: ${storageKey.value} = ${storageValue.value}`, ttl: ttlMs ? `${storageTTL.value}秒` : '永不过期' }
  } catch (error: any) {
    storageResult.value = { error: `设置失败: ${error.message}` }
  }
}

// 获取存储项
const getStorageItem = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const value = storageManager.getItem(storageKey.value)
    storageResult.value = { key: storageKey.value, value: value }
  } catch (error: any) {
    storageResult.value = { error: `获取失败: ${error.message}` }
  }
}

// 清除前缀项
const clearStorage = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    storageManager.clear()
    storageResult.value = { message: '已清除所有带前缀的存储项' }
  } catch (error: any) {
    storageResult.value = { error: `清除失败: ${error.message}` }
  }
}

// 清除过期项
const clearExpiredStorage = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    storageManager.clearExpiredItems()
    storageResult.value = { message: '已清除所有过期的存储项' }
  } catch (error: any) {
    storageResult.value = { error: `清除过期项失败: ${error.message}` }
  }
}

// 获取键列表
const getStorageKeys = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const keys = storageManager.keys()
    storageResult.value = { keys: keys }
  } catch (error: any) {
    storageResult.value = { error: `获取键列表失败: ${error.message}` }
  }
}

// 获取存储大小
const getStorageSize = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    const size = storageManager.size()
    storageResult.value = { size: size, message: `存储项总数: ${size}` }
  } catch (error: any) {
    storageResult.value = { error: `获取大小失败: ${error.message}` }
  }
}

// 创建过期项测试
const createExpiredItem = async () => {
  if (!storageManager) {
    storageResult.value = { error: '请先初始化存储管理器' }
    return
  }
  
  try {
    // 使用StorageManager创建一个已过期的项目（过去的时间）
    const pastTime = 10000; // 10秒，StorageManager会将其转换为过期时间戳
    
    // 使用StorageManager的setItem方法，它会自动处理前缀和过期逻辑
    storageManager.setItem(`expired-test-${Date.now()}`, 'This is an expired item', pastTime);
    
    storageResult.value = { message: '已创建过期测试项，现在可以尝试清除过期项功能' };
  } catch (error: any) {
    storageResult.value = { error: `创建过期项失败: ${error.message}` };
  }
}

// 生成ID测试
const testGenerateId = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.generateId) {
      const id = shared.generateId(idPrefix.value || undefined)
      idResult.value = id
    } else {
      idResult.value = 'generateId 函数不可用'
    }
  } catch (error) {
    console.error('ID生成失败:', error)
    idResult.value = 'ID生成失败'
  }
}

// 格式化文件大小测试
const testFormatFileSize = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.formatFileSize && fileSizeBytes.value !== null) {
      const formatted = shared.formatFileSize(fileSizeBytes.value)
      fileSizeResult.value = formatted
    } else {
      fileSizeResult.value = 'formatFileSize 函数不可用或输入无效'
    }
  } catch (error) {
    console.error('文件大小格式化失败:', error)
    fileSizeResult.value = '文件大小格式化失败'
  }
}

// 格式化数字测试
const testFormatNumber = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.formatNumber && numberToFormat.value !== null) {
      const formatted = shared.formatNumber(numberToFormat.value)
      numberResult.value = formatted
    } else {
      numberResult.value = 'formatNumber 函数不可用或输入无效'
    }
  } catch (error) {
    console.error('数字格式化失败:', error)
    numberResult.value = '数字格式化失败'
  }
}

// 解析URL参数测试
const testGetUrlParams = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.getUrlParams) {
      const params = shared.getUrlParams(urlToParse.value)
      urlParamsResult.value = params
    } else {
      urlParamsResult.value = { error: 'getUrlParams 函数不可用' }
    }
  } catch (error) {
    console.error('URL参数解析失败:', error)
    urlParamsResult.value = { error: 'URL参数解析失败' }
  }
}

// 下载文件测试
const testDownloadFile = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.downloadFile) {
      shared.downloadFile(downloadUrl.value, downloadFilename.value)
      alert('文件下载已启动')
    } else {
      alert('downloadFile 函数不可用')
    }
  } catch (error) {
    console.error('文件下载失败:', error)
    alert('文件下载失败')
  }
}

// 更新CSS变量测试
const testUpdateCSSVariable = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.updateCSSVariables) {
      shared.updateCSSVariables({
        [cssVariableName.value]: cssVariableValue.value
      })
      alert(`CSS变量 ${cssVariableName.value} 已更新为 ${cssVariableValue.value}`)
    } else {
      alert('updateCSSVariables 函数不可用')
    }
  } catch (error) {
    console.error('CSS变量更新失败:', error)
    alert('CSS变量更新失败')
  }
}

// 格式化日期测试
const testFormatDate = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.formatDate) {
      const formatted = shared.formatDate(dateToFormat.value, dateFormat.value)
      dateResult.value = formatted
    } else {
      dateResult.value = 'formatDate 函数不可用'
    }
  } catch (error) {
    console.error('日期格式化失败:', error)
    dateResult.value = '日期格式化失败'
  }
}

// 复制到剪贴板测试
const testCopyToClipboard = async () => {
  try {
    const shared: any = await import('@admin-core/shared')
    
    if (shared && shared.copyToClipboard) {
      const success = await shared.copyToClipboard(textToCopy.value)
      copyResult.value = success ? '复制成功' : '复制失败'
    } else {
      copyResult.value = 'copyToClipboard 函数不可用'
    }
  } catch (error) {
    console.error('剪贴板操作失败:', error)
    copyResult.value = '剪贴板操作失败'
  }
}

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

// 监听搜索词变化并过滤数组
watch(searchTerm, (newValue) => {
  if (newValue) {
    filteredArray.value = sampleArray.filter(item => 
      item.name.toLowerCase().includes(newValue.toLowerCase())
    )
  } else {
    filteredArray.value = []
  }
})
</script>

<style scoped>
.shared-features-demo {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

.result {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #ebf8ff;
  border-radius: 6px;
  border-left: 3px solid #3182ce;
  font-size: 0.9rem;
}

.constant-display {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.75rem;
}

.constant-display div {
  padding: 0.5rem;
  background: #f7fafc;
  border-radius: 6px;
  border-left: 3px solid #48bb78;
}

.type-demo {
  padding: 1rem;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.code-block {
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-block pre {
  margin: 0;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
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

.api-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.api-item {
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 6px;
  border-left: 3px solid #4299e1;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* 标签页样式 */
.tabs {
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
  background: white;
  padding: 0.5rem;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #4a5568;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  border-radius: 6px 6px 0 0;
}

.tab-button:hover {
  color: #2b6cb0;
  background-color: #f7fafc;
}

.tab-button.active {
  color: #2b6cb0;
  border-bottom: 2px solid #3182ce;
  background-color: #ebf8ff;
}

.tab-content {
  display: block;
}
</style>