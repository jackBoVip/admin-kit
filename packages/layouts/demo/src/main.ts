/**
 * Admin Core 表单系统演示应用入口
 * 
 * @description
 * 测试 @admin-core/layouts 中 form 包的所有功能
 */
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { setupAdminForm } from '@admin-core/layouts';
import { globalShareState } from '@admin-core/shared/utils';
import {
  AdminButton,
  AdminCheckbox,
  Input,
  AdminInputPassword,
  AdminPinInput,
  AdminSelect,
} from '@admin-core/ui';

// 注意：不导入预编译的 CSS，让 Tailwind 直接处理组件样式

// 注册全局组件
globalShareState.setComponents({
  AdminButton,
  AdminCheckbox,
  AdminInput: Input,
  AdminInputPassword,
  AdminPinInput,
  AdminSelect,
});

// 初始化表单系统
setupAdminForm({
  config: {
    // 使用默认配置
  },
});

// 创建应用实例
const app = createApp(App);

// 挂载应用
app.mount('#app');
