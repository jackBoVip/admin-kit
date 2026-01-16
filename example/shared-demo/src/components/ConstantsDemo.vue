<template>
  <section class="feature-section">
    <h3>常量</h3>
    
    <div class="feature-group">
      <h4>应用常量</h4>
      <div class="constant-display">
        <div><strong>APP_NAME:</strong> {{ appConstants.APP_NAME || 'N/A' }}</div>
        <div><strong>APP_VERSION:</strong> {{ appConstants.APP_VERSION || 'N/A' }}</div>
        <div><strong>DEFAULT_LOCALE:</strong> {{ appConstants.DEFAULT_LOCALE || 'N/A' }}</div>
        <div><strong>SUPPORTED_LOCALES:</strong> {{ appConstants.SUPPORTED_LOCALES?.join(', ') || 'N/A' }}</div>
      </div>
    </div>
    
    <div class="feature-group">
      <h4>HTTP常量</h4>
      <div class="constant-display">
        <div><strong>HTTP_TIMEOUT:</strong> {{ httpConstants.HTTP_TIMEOUT || 'N/A' }}</div>
        <div><strong>RETRY_COUNT:</strong> {{ httpConstants.RETRY_COUNT || 'N/A' }}</div>
        <div><strong>STATUS_CODES:</strong> {{ httpConstants.STATUS_CODES ? Object.keys(httpConstants.STATUS_CODES).slice(0, 5).join(', ') + '...' : 'N/A' }}</div>
        <div><strong>CONTENT_TYPES:</strong> {{ httpConstants.CONTENT_TYPES ? Object.keys(httpConstants.CONTENT_TYPES).join(', ') : 'N/A' }}</div>
      </div>
    </div>
    
    <div class="feature-group">
      <h4>文件相关常量</h4>
      <div class="constant-display">
        <div><strong>MAX_FILE_SIZE:</strong> {{ fileConstants.MAX_FILE_SIZE ? formatFileSize(fileConstants.MAX_FILE_SIZE) : 'N/A' }}</div>
        <div><strong>ALLOWED_IMAGE_TYPES:</strong> {{ fileConstants.ALLOWED_IMAGE_TYPES?.join(', ') || 'N/A' }}</div>
        <div><strong>FILE_SIZE_UNITS:</strong> {{ fileConstants.FILE_SIZE_UNITS ? Object.keys(fileConstants.FILE_SIZE_UNITS).join(', ') : 'N/A' }}</div>
        <div><strong>FILE_TYPES:</strong> {{ fileConstants.FILE_TYPES ? Object.keys(fileConstants.FILE_TYPES).join(', ') : 'N/A' }}</div>
      </div>
    </div>
    
    <div class="feature-group">
      <h4>存储常量</h4>
      <div class="constant-display">
        <div><strong>STORAGE_KEYS:</strong> {{ storageConstants.STORAGE_KEYS ? Object.keys(storageConstants.STORAGE_KEYS).join(', ') : 'N/A' }}</div>
        <div><strong>CACHE_EXPIRY:</strong> {{ storageConstants.CACHE_EXPIRY ? Object.keys(storageConstants.CACHE_EXPIRY).join(', ') : 'N/A' }}</div>
      </div>
    </div>
    
    <div class="feature-group">
      <h4>布局常量</h4>
      <div class="constant-display">
        <div><strong>CSS_VARIABLES:</strong> {{ layoutConstants.CSS_VARIABLES ? Object.keys(layoutConstants.CSS_VARIABLES).join(', ') : 'N/A' }}</div>
        <div><strong>ELEMENT_IDS:</strong> {{ layoutConstants.ELEMENT_IDS.MAIN_CONTENT ? Object.keys(layoutConstants.ELEMENT_IDS.MAIN_CONTENT).join(', ') : 'N/A' }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 常量演示 - 使用默认值
const appConstants = {
  APP_NAME: 'Admin Kit',
  APP_VERSION: '1.0.0',
  DEFAULT_LOCALE: 'zh-CN',
  SUPPORTED_LOCALES: ['zh-CN', 'en-US']
}

const httpConstants = {
  HTTP_TIMEOUT: 30000, // 30秒
  RETRY_COUNT: 3,
  STATUS_CODES: { OK: 200, NOT_FOUND: 404, SERVER_ERROR: 500 },
  CONTENT_TYPES: { JSON: 'application/json', FORM: 'application/x-www-form-urlencoded' }
}

const fileConstants = {
  MAX_FILE_SIZE: 20971520, // 20MB
  ALLOWED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico'],
  FILE_SIZE_UNITS: { B: 1, KB: 1024, MB: 1024 * 1024 },
  FILE_TYPES: { IMAGE: 'image/*', PDF: 'application/pdf', DOC: 'application/msword' }
}

const storageConstants = {
  STORAGE_KEYS: { TOKEN: 'token', USER_INFO: 'userInfo', THEME: 'theme' },
  CACHE_EXPIRY: { MINUTE: 60000, HOUR: 3600000, DAY: 86400000 }
}

const layoutConstants = {
  CSS_VARIABLES: { PRIMARY_COLOR: '--primary-color', SECONDARY_COLOR: '--secondary-color' },
  ELEMENT_IDS: { HEADER: 'header', SIDEBAR: 'sidebar', MAIN_CONTENT: 'main-content' }
}

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
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
</style>