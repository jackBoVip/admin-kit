import { createApp } from 'vue'
import App from './App.vue'

// 导入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入本地样式（包含 Tailwind CSS v4 和设计系统）
import './style.css'

// 导入 Element Plus 主题集成
import './element-plus-theme.css'

const app = createApp(App)

// 使用 Element Plus
app.use(ElementPlus)

app.mount('#app')
