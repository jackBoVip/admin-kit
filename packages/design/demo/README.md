# Admin Core 主题系统演示

这是一个完整的演示应用，用于测试和展示 `@admin-core/design` 主题系统的所有功能。

## 功能特性

### 🎨 主题系统
- ✅ 13 种预设主题变体
- ✅ 浅色/暗色模式切换
- ✅ 26 种主题组合（13 × 2）
- ✅ 主题状态持久化（localStorage）
- ✅ 平滑过渡动画

### 🎯 测试覆盖

#### 1. 颜色令牌
- Primary（主色）
- Secondary（次要色）
- Accent（强调色）
- Muted（柔和色）
- Destructive（破坏性）
- Success（成功）
- Warning（警告）
- Info（信息）
- Card（卡片）

#### 2. 组件示例
- 按钮（6 种变体）
- 卡片（3 种样式）
- 表单元素（输入框、文本域、选择框）
- 消息提示（4 种类型）

#### 3. 工具类
- `.flex-center` - 水平居中
- `.flex-col-center` - 垂直居中
- `.outline-box` - 轮廓框
- `.admin-link` - 链接样式
- `.card-box` - 卡片容器

#### 4. Tailwind 功能
- 圆角大小（sm、md、lg、xl）
- 透明度修饰符（/10、/30、/50、/70、/90）
- 响应式布局
- 过渡动画

## 快速开始

### 安装依赖

```bash
# 在项目根目录
pnpm install
```

### 启动开发服务器

```bash
# 方式 1：在 demo 目录
cd packages/design/demo
pnpm dev

# 方式 2：在项目根目录
pnpm --filter @admin-core/design-demo dev
```

### 构建生产版本

```bash
pnpm --filter @admin-core/design-demo build
```

### 预览生产构建

```bash
pnpm --filter @admin-core/design-demo preview
```

## 使用说明

### 主题切换

1. **暗色模式切换**
   - 点击右上角的 "☀️ 浅色" / "🌙 暗色" 按钮
   - 主题会立即切换并保存到 localStorage

2. **主题变体选择**
   - 使用右上角的下拉菜单选择主题
   - 支持 13 种预设主题：
     - 🟣 紫色 (Violet)
     - 🩷 粉色 (Pink)
     - 🌹 玫瑰 (Rose)
     - 🔵 天蓝 (Sky Blue)
     - 💙 深蓝 (Deep Blue)
     - 🟢 绿色 (Green)
     - 💚 深绿 (Deep Green)
     - 🟠 橙色 (Orange)
     - 🟡 黄色 (Yellow)
     - ⚫ 锌色 (Zinc)
     - ⚪ 中性 (Neutral)
     - 🔘 石板 (Slate)
     - 🩶 灰色 (Gray)

3. **组合使用**
   - 可以同时选择暗色模式和主题变体
   - 例如：暗色 + 紫色主题

### 测试场景

#### 场景 1：颜色一致性测试
1. 切换不同主题
2. 观察所有颜色令牌是否正确更新
3. 检查文字对比度是否清晰可读

#### 场景 2：暗色模式测试
1. 切换到暗色模式
2. 检查所有组件是否正确显示
3. 验证颜色对比度

#### 场景 3：主题组合测试
1. 尝试所有 26 种主题组合
2. 验证每种组合的视觉效果
3. 检查是否有颜色冲突

#### 场景 4：响应式测试
1. 调整浏览器窗口大小
2. 检查布局是否正确适配
3. 验证移动端显示效果

#### 场景 5：持久化测试
1. 选择一个主题
2. 刷新页面
3. 验证主题是否保持

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式系统**: Tailwind CSS v4
- **设计系统**: @admin-core/design

## 项目结构

```
demo/
├── src/
│   ├── components/
│   │   └── ColorCard.vue      # 颜色卡片组件
│   ├── App.vue                # 主应用组件
│   ├── main.ts                # 应用入口
│   └── vite-env.d.ts          # 类型声明
├── index.html                 # HTML 模板
├── vite.config.ts             # Vite 配置
├── tsconfig.json              # TypeScript 配置
├── package.json               # 依赖配置
└── README.md                  # 本文档
```

## 开发指南

### 添加新的测试场景

1. 在 `App.vue` 中添加新的 section
2. 使用主题系统的颜色令牌
3. 测试不同主题下的显示效果

### 自定义组件

1. 创建新组件文件
2. 使用 Tailwind 工具类
3. 引用主题系统的 CSS 变量

### 调试技巧

1. **查看 CSS 变量**
   ```javascript
   // 在浏览器控制台
   getComputedStyle(document.documentElement).getPropertyValue('--primary')
   ```

2. **检查主题状态**
   ```javascript
   // 查看当前模式
   document.documentElement.classList.contains('dark')
   
   // 查看当前主题
   document.documentElement.getAttribute('data-theme')
   ```

3. **清除缓存**
   ```javascript
   // 清除主题缓存
   localStorage.removeItem('theme-mode')
   localStorage.removeItem('theme-variant')
   ```

## 常见问题

### Q: 主题切换后样式没有更新？
A: 检查是否正确导入了 `@admin-core/design/style.css`

### Q: 某些颜色显示不正确？
A: 确保使用了正确的 Tailwind 类名，例如 `bg-primary` 而不是 `bg-primary-500`

### Q: 暗色模式下对比度不够？
A: 这是已知问题，可以在 `dark.css` 中调整颜色值

### Q: 如何添加新的主题变体？
A: 在 `light.css` 和 `dark.css` 中添加新的 `[data-theme='xxx']` 规则

## 反馈与贡献

如果发现任何问题或有改进建议，请：
1. 记录问题详情（主题、浏览器、截图）
2. 提交 Issue 或 Pull Request
3. 在团队中讨论解决方案

## 许可证

MIT License
