# @admin-core/ui

<div align="center">

**Vue 3 UI 组件库**

基于 Reka UI 和 Shadcn 设计的现代化 UI 组件库

[![npm version](https://img.shields.io/npm/v/@admin-core/ui.svg)](https://www.npmjs.com/package/@admin-core/ui)
[![License](https://img.shields.io/npm/l/@admin-core/ui.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

</div>

---

## ✨ 特性

- 🎨 **现代设计** - 基于 Shadcn 设计系统
- 🔧 **易于使用** - 简洁的 API，开箱即用
- 📦 **TypeScript** - 完整的 TypeScript 类型支持
- 🚀 **高性能** - 基于 Reka UI，性能优秀
- 🎯 **可访问性** - 遵循 WAI-ARIA 标准
- 🌈 **主题定制** - 支持深色模式和主题定制
- 🔌 **可组合** - 灵活的组件组合方式

---

## 📦 安装

### 基础安装

```bash
# 使用 pnpm
pnpm add @admin-core/ui

# 使用 npm
npm install @admin-core/ui

# 使用 yarn
yarn add @admin-core/ui
```

### Peer Dependencies

此包需要以下对等依赖（peer dependencies）：

```bash
pnpm add vue @vueuse/core reka-ui lucide-vue-next
```

### 完整安装（推荐）

```bash
# 一次性安装所有依赖
pnpm add @admin-core/ui vue @vueuse/core reka-ui lucide-vue-next
```

> **为什么需要 peer dependencies？**
> 
> 为了避免依赖重复打包，我们将常用的大型库声明为 peer dependencies。
> 这样可以：
> - ✅ 减少打包体积（节省约 450KB，约 35%）
> - ✅ 确保版本一致性
> - ✅ 更好的缓存策略
> - ✅ 避免多个实例导致的问题

### 引入样式

```typescript
// main.ts
import '@admin-core/ui/dist/style.css'
```

---

## 🚀 快速开始

### 基础组件

```vue
<script setup lang="ts">
import { Button, Input, Checkbox } from '@admin-core/ui'
import { ref } from 'vue'

const checked = ref(false)
const inputValue = ref('')
</script>

<template>
  <div class="space-y-4">
    <!-- 按钮 -->
    <Button variant="default">默认按钮</Button>
    <Button variant="outline">轮廓按钮</Button>
    <Button variant="ghost">幽灵按钮</Button>
    
    <!-- 输入框 -->
    <Input v-model="inputValue" placeholder="请输入..." />
    
    <!-- 复选框 -->
    <Checkbox v-model="checked">同意条款</Checkbox>
  </div>
</template>
```

### 表单组件

```vue
<script setup lang="ts">
import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@admin-core/ui'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>用户名</FormLabel>
        <FormControl>
          <Input 
            type="text" 
            placeholder="请输入用户名" 
            v-bind="componentField" 
          />
        </FormControl>
        <FormDescription>
          这是您的公开显示名称
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>邮箱</FormLabel>
        <FormControl>
          <Input 
            type="email" 
            placeholder="请输入邮箱" 
            v-bind="componentField" 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">提交</Button>
  </form>
</template>
```

### 对话框

```vue
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@admin-core/ui'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">打开对话框</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>确认操作</DialogTitle>
        <DialogDescription>
          此操作无法撤销，请确认是否继续？
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">取消</Button>
        <Button>确认</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

---

## 📚 组件列表

### 基础组件

- **Button** - 按钮
- **Input** - 输入框
- **Textarea** - 文本域
- **Checkbox** - 复选框
- **Switch** - 开关
- **RadioGroup** - 单选框组
- **Label** - 标签
- **Badge** - 徽章
- **Avatar** - 头像
- **Separator** - 分隔线

### 表单组件

- **Form** - 表单（集成 vee-validate）
- **FormField** - 表单字段
- **FormItem** - 表单项
- **FormLabel** - 表单标签
- **FormControl** - 表单控件
- **FormDescription** - 表单描述
- **FormMessage** - 表单消息
- **Select** - 选择器
- **NumberField** - 数字输入
- **PinInput** - PIN 码输入

### 反馈组件

- **Dialog** - 对话框
- **AlertDialog** - 警告对话框
- **Sheet** - 抽屉
- **Tooltip** - 工具提示
- **HoverCard** - 悬浮卡片
- **Popover** - 弹出框

### 导航组件

- **Tabs** - 标签页
- **Accordion** - 折叠面板
- **Breadcrumb** - 面包屑
- **ContextMenu** - 右键菜单
- **DropdownMenu** - 下拉菜单
- **Pagination** - 分页

### 数据展示

- **Card** - 卡片
- **Tree** - 树形控件
- **ScrollArea** - 滚动区域
- **Resizable** - 可调整大小

### 业务组件

- **AdminButton** - 增强按钮（带 loading）
- **AdminCheckbox** - 增强复选框（带 label）
- **BackTop** - 返回顶部
- **Breadcrumb** - 面包屑导航
- **FullScreen** - 全屏
- **Logo** - Logo
- **Scrollbar** - 滚动条
- **Spinner** - 加载动画

---

## 🎨 主题定制

### 使用 CSS 变量

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... 更多变量 */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... 更多变量 */
}
```

### 使用 Tailwind CSS

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... 更多颜色
      },
    },
  },
} satisfies Config
```

---

## 🔧 高级用法

### 组合使用

```vue
<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Badge,
} from '@admin-core/ui'
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle>卡片标题</CardTitle>
        <Badge>新</Badge>
      </div>
      <CardDescription>
        这是卡片的描述信息
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>卡片内容...</p>
    </CardContent>
    <CardFooter class="flex justify-end gap-2">
      <Button variant="outline">取消</Button>
      <Button>确认</Button>
    </CardFooter>
  </Card>
</template>
```

### 自定义样式

```vue
<template>
  <!-- 使用 class 属性 -->
  <Button class="bg-gradient-to-r from-blue-500 to-purple-500">
    渐变按钮
  </Button>
  
  <!-- 使用 Tailwind 工具类 -->
  <Input class="border-2 border-blue-500 focus:border-blue-700" />
  
  <!-- 响应式样式 -->
  <Card class="w-full md:w-1/2 lg:w-1/3">
    响应式卡片
  </Card>
</template>
```

---

## 📱 响应式设计

所有组件都支持响应式设计：

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card v-for="item in items" :key="item.id">
      <CardHeader>
        <CardTitle>{{ item.title }}</CardTitle>
      </CardHeader>
      <CardContent>
        {{ item.content }}
      </CardContent>
    </Card>
  </div>
</template>
```

---

## 🌐 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

---

## 📄 许可证

MIT License © 2024 [Admin Kit Team](https://github.com/jackBoVip/admin-kit)

---

## 🔗 相关链接

- [GitHub 仓库](https://github.com/jackBoVip/admin-kit)
- [问题反馈](https://github.com/jackBoVip/admin-kit/issues)
- [Reka UI 文档](https://reka-ui.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [VeeValidate 文档](https://vee-validate.logaretm.com/)
