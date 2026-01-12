# Admin Core 表单系统演示

这是一个完整的演示应用，用于测试 `@admin-core/layouts` 中 form 包的所有功能。

## 功能测试清单

### ✅ 基础功能
- [x] 基本输入字段
- [x] 表单提交
- [x] 表单重置
- [x] 字段值获取/设置
- [x] 表单验证触发

### ✅ 验证功能
- [x] 必填验证
- [x] 最小/最大长度验证
- [x] 正则表达式验证
- [x] 数字范围验证
- [x] URL 验证
- [x] Email 验证
- [x] 自定义验证规则
- [x] Zod schema 集成

### ✅ 字段依赖
- [x] 条件显示 (show)
- [x] 条件渲染 (if)
- [x] 动态禁用 (disabled)
- [x] 动态必填 (required)
- [x] 动态规则 (rules)
- [x] 动态属性 (componentProps)
- [x] 触发器回调 (trigger)

### ✅ 动态表单
- [x] 动态添加字段
- [x] 动态删除字段
- [x] 动态修改字段配置
- [x] 响应式 schema

### ✅ 布局模式
- [x] 水平布局 (horizontal)
- [x] 垂直布局 (vertical)
- [x] 内联布局 (inline)
- [x] 栅格布局 (grid)
- [x] 紧凑模式 (compact)
- [x] 响应式布局

### ✅ 高级功能
- [x] 折叠展开
- [x] 自定义渲染
- [x] 后缀/前缀
- [x] 帮助提示
- [x] 描述文本
- [x] API 操作
- [x] 字段引用

### ✅ 表单 API
- [x] setValues - 批量设置值
- [x] getValues - 获取所有值
- [x] setFieldValue - 设置单个字段
- [x] getFieldValue - 获取单个字段
- [x] validateField - 验证单个字段
- [x] validate - 验证整个表单
- [x] resetForm - 重置表单
- [x] resetField - 重置单个字段

## 运行方式

### 1. 安装依赖

```bash
# 在项目根目录
pnpm install
```

### 2. 启动开发服务器

```bash
# 方式1: 在项目根目录
pnpm --filter @admin-core/layouts-demo dev

# 方式2: 在 demo 目录
cd packages/layouts/demo
pnpm dev
```

### 3. 访问应用

打开浏览器访问: http://localhost:3001

## 项目结构

```
demo/
├── src/
│   ├── components/
│   │   ├── BasicFormDemo.vue      # 基础表单功能
│   │   ├── ValidationDemo.vue     # 验证功能
│   │   ├── DependenciesDemo.vue   # 字段依赖
│   │   ├── DynamicFormDemo.vue    # 动态表单
│   │   ├── LayoutDemo.vue         # 布局模式
│   │   └── AdvancedDemo.vue       # 高级功能
│   ├── App.vue                    # 主应用
│   ├── main.ts                    # 入口文件
│   └── style.css                  # 样式文件
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## 测试说明

### 基础表单测试
1. 输入各种类型的数据
2. 测试表单提交和重置
3. 使用 API 按钮测试编程控制

### 验证测试
1. 尝试提交空表单，查看必填验证
2. 输入不符合规则的数据，查看错误提示
3. 输入正确数据，验证通过后提交

### 依赖测试
1. 切换用户类型，观察字段显示/隐藏
2. 勾选复选框，观察依赖字段变化
3. 测试动态禁用和必填状态

### 动态表单测试
1. 点击添加字段按钮
2. 点击删除字段按钮
3. 切换字段禁用状态

### 布局测试
1. 查看不同布局模式的表现
2. 调整浏览器窗口大小，测试响应式
3. 对比紧凑模式和普通模式

### 高级功能测试
1. 测试折叠展开功能
2. 查看自定义渲染效果
3. 使用 API 按钮测试各种操作

## 技术栈

- Vue 3.5+
- TypeScript 5.9+
- Vite 7.3+
- Tailwind CSS 4.1+
- Zod 3.24+
- vee-validate 4.15+

## 注意事项

1. 确保已经构建了 `@admin-core/layouts` 包
2. 如果遇到类型错误，尝试重新构建依赖包
3. 查看浏览器控制台获取详细的日志信息

## 相关文档

- [Form API 文档](../src/form/README.md)
- [Zod 文档](https://zod.dev/)
- [vee-validate 文档](https://vee-validate.logaretm.com/)
