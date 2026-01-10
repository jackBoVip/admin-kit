# 第三方组件库主题集成

Admin Core 设计系统基于 CSS 变量实现，可以与主流 UI 组件库集成，让它们使用我们的主题颜色。

## 兼容性说明

### ✅ 完全兼容（开箱即用）

这些组件库原生支持 CSS 变量或提供了 CSS 变量配置：

- **Naive UI** - 原生支持 CSS 变量主题
- **Arco Design** - 支持 CSS 变量定制
- **TDesign** - 支持 CSS 变量
- **Vant** - 支持 CSS 变量主题
- **Varlet** - 支持 CSS 变量

### ⚠️ 需要配置（部分兼容）

这些组件库需要额外配置才能使用我们的主题：

- **Element Plus** - 需要配置 SCSS 变量或使用 CSS 变量覆盖
- **Ant Design Vue** - 需要配置 Less 变量或使用 ConfigProvider
- **Vuetify** - 需要配置主题对象

### ❌ 不兼容

- 使用 CSS-in-JS 且不支持 CSS 变量的组件库

---

## Element Plus 集成

Element Plus 支持通过 CSS 变量覆盖主题。

### 方法一：使用 CSS 变量覆盖（推荐）

```css
/* 在你的全局样式中 */
@import '@admin-core/design/css';

/* 覆盖 Element Plus 的 CSS 变量 */
:root {
  /* 主色 */
  --el-color-primary: hsl(var(--primary));
  --el-color-primary-light-3: hsl(var(--primary) / 0.7);
  --el-color-primary-light-5: hsl(var(--primary) / 0.5);
  --el-color-primary-light-7: hsl(var(--primary) / 0.3);
  --el-color-primary-light-8: hsl(var(--primary) / 0.2);
  --el-color-primary-light-9: hsl(var(--primary) / 0.1);
  --el-color-primary-dark-2: hsl(var(--primary));
  
  /* 成功色 */
  --el-color-success: hsl(var(--success));
  --el-color-success-light-3: hsl(var(--success) / 0.7);
  --el-color-success-light-5: hsl(var(--success) / 0.5);
  --el-color-success-light-7: hsl(var(--success) / 0.3);
  --el-color-success-light-8: hsl(var(--success) / 0.2);
  --el-color-success-light-9: hsl(var(--success) / 0.1);
  
  /* 警告色 */
  --el-color-warning: hsl(var(--warning));
  --el-color-warning-light-3: hsl(var(--warning) / 0.7);
  --el-color-warning-light-5: hsl(var(--warning) / 0.5);
  --el-color-warning-light-7: hsl(var(--warning) / 0.3);
  --el-color-warning-light-8: hsl(var(--warning) / 0.2);
  --el-color-warning-light-9: hsl(var(--warning) / 0.1);
  
  /* 危险色 */
  --el-color-danger: hsl(var(--destructive));
  --el-color-danger-light-3: hsl(var(--destructive) / 0.7);
  --el-color-danger-light-5: hsl(var(--destructive) / 0.5);
  --el-color-danger-light-7: hsl(var(--destructive) / 0.3);
  --el-color-danger-light-8: hsl(var(--destructive) / 0.2);
  --el-color-danger-light-9: hsl(var(--destructive) / 0.1);
  
  /* 信息色 */
  --el-color-info: hsl(var(--muted-foreground));
  
  /* 文本颜色 */
  --el-text-color-primary: hsl(var(--foreground));
  --el-text-color-regular: hsl(var(--foreground) / 0.9);
  --el-text-color-secondary: hsl(var(--muted-foreground));
  --el-text-color-placeholder: hsl(var(--muted-foreground) / 0.6);
  
  /* 边框颜色 */
  --el-border-color: hsl(var(--border));
  --el-border-color-light: hsl(var(--border) / 0.7);
  --el-border-color-lighter: hsl(var(--border) / 0.5);
  --el-border-color-extra-light: hsl(var(--border) / 0.3);
  
  /* 背景颜色 */
  --el-bg-color: hsl(var(--background));
  --el-bg-color-page: hsl(var(--background-deep));
  --el-bg-color-overlay: hsl(var(--card));
  
  /* 填充颜色 */
  --el-fill-color: hsl(var(--muted));
  --el-fill-color-light: hsl(var(--muted) / 0.7);
  --el-fill-color-lighter: hsl(var(--muted) / 0.5);
  --el-fill-color-extra-light: hsl(var(--muted) / 0.3);
  --el-fill-color-blank: hsl(var(--background));
}

/* 暗色模式 */
.dark {
  --el-bg-color: hsl(var(--background));
  --el-bg-color-page: hsl(var(--background-deep));
  --el-text-color-primary: hsl(var(--foreground));
  --el-border-color: hsl(var(--border));
}
```

### 方法二：使用 SCSS 变量（构建时）

```scss
// element-plus-theme.scss
@use 'element-plus/theme-chalk/src/common/var.scss' as * with (
  $colors: (
    'primary': (
      'base': hsl(var(--primary)),
    ),
    'success': (
      'base': hsl(var(--success)),
    ),
    'warning': (
      'base': hsl(var(--warning)),
    ),
    'danger': (
      'base': hsl(var(--destructive)),
    ),
  )
);

@use 'element-plus/theme-chalk/src/index.scss' as *;
```

---

## Ant Design Vue 集成

### 方法一：使用 ConfigProvider（推荐）

```vue
<template>
  <a-config-provider :theme="antdTheme">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useTheme, getCSSVariable } from '@admin-core/design'

const { isDark } = useTheme()

// 将 HSL 转换为 RGB
function hslToRgb(hsl: string): string {
  const [h, s, l] = hsl.split(' ').map(v => parseFloat(v))
  // ... HSL 转 RGB 逻辑
  return `rgb(${r}, ${g}, ${b})`
}

const antdTheme = computed(() => ({
  algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: hslToRgb(getCSSVariable('primary')),
    colorSuccess: hslToRgb(getCSSVariable('success')),
    colorWarning: hslToRgb(getCSSVariable('warning')),
    colorError: hslToRgb(getCSSVariable('destructive')),
    colorInfo: hslToRgb(getCSSVariable('info')),
    colorBgBase: hslToRgb(getCSSVariable('background')),
    colorTextBase: hslToRgb(getCSSVariable('foreground')),
    borderRadius: 8,
  },
}))
</script>
```

### 方法二：使用 CSS 变量覆盖

```css
/* 覆盖 Ant Design Vue 的 CSS 变量 */
:root {
  --ant-primary-color: hsl(var(--primary));
  --ant-success-color: hsl(var(--success));
  --ant-warning-color: hsl(var(--warning));
  --ant-error-color: hsl(var(--destructive));
  --ant-info-color: hsl(var(--info));
  --ant-text-color: hsl(var(--foreground));
  --ant-border-color-base: hsl(var(--border));
  --ant-background-color-base: hsl(var(--background));
}
```

---

## Naive UI 集成（最佳兼容）

Naive UI 原生支持 CSS 变量，集成最简单：

```vue
<template>
  <n-config-provider :theme="naiveTheme" :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { darkTheme } from 'naive-ui'
import { useTheme, getCSSVariable } from '@admin-core/design'

const { isDark } = useTheme()

const naiveTheme = computed(() => isDark.value ? darkTheme : null)

const themeOverrides = computed(() => ({
  common: {
    primaryColor: `hsl(${getCSSVariable('primary')})`,
    primaryColorHover: `hsl(${getCSSVariable('primary')} / 0.8)`,
    primaryColorPressed: `hsl(${getCSSVariable('primary')} / 0.9)`,
    successColor: `hsl(${getCSSVariable('success')})`,
    warningColor: `hsl(${getCSSVariable('warning')})`,
    errorColor: `hsl(${getCSSVariable('destructive')})`,
    infoColor: `hsl(${getCSSVariable('info')})`,
    textColorBase: `hsl(${getCSSVariable('foreground')})`,
    borderColor: `hsl(${getCSSVariable('border')})`,
    bodyColor: `hsl(${getCSSVariable('background')})`,
  },
}))
</script>
```

---

## Arco Design 集成

```vue
<template>
  <a-config-provider :theme="arcoTheme">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme, getCSSVariable } from '@admin-core/design'

const { isDark } = useTheme()

const arcoTheme = computed(() => ({
  token: {
    colorPrimary: `hsl(${getCSSVariable('primary')})`,
    colorSuccess: `hsl(${getCSSVariable('success')})`,
    colorWarning: `hsl(${getCSSVariable('warning')})`,
    colorDanger: `hsl(${getCSSVariable('destructive')})`,
    colorInfo: `hsl(${getCSSVariable('info')})`,
    colorTextBase: `hsl(${getCSSVariable('foreground')})`,
    colorBgBase: `hsl(${getCSSVariable('background')})`,
    colorBorder: `hsl(${getCSSVariable('border')})`,
  },
}))
</script>
```

---

## 工具函数

为了方便集成，我们提供了一些工具函数：

```typescript
import { getCSSVariable } from '@admin-core/design'

/**
 * 获取 HSL 格式的颜色值
 */
export function getHSLColor(token: string): string {
  return `hsl(${getCSSVariable(token)})`
}

/**
 * 将 HSL 转换为 RGB（用于不支持 HSL 的组件库）
 */
export function hslToRgb(hsl: string): string {
  const [h, s, l] = hsl.split(' ').map(v => parseFloat(v))
  
  const hDecimal = h / 360
  const sDecimal = s / 100
  const lDecimal = l / 100
  
  let r, g, b
  
  if (sDecimal === 0) {
    r = g = b = lDecimal
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = lDecimal < 0.5 
      ? lDecimal * (1 + sDecimal) 
      : lDecimal + sDecimal - lDecimal * sDecimal
    const p = 2 * lDecimal - q
    
    r = hue2rgb(p, q, hDecimal + 1/3)
    g = hue2rgb(p, q, hDecimal)
    b = hue2rgb(p, q, hDecimal - 1/3)
  }
  
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
}

/**
 * 将 HSL 转换为 HEX
 */
export function hslToHex(hsl: string): string {
  const rgb = hslToRgb(hsl)
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number)
  
  return '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * 获取所有主题颜色（用于 ConfigProvider）
 */
export function getThemeColors() {
  return {
    primary: getHSLColor('primary'),
    success: getHSLColor('success'),
    warning: getHSLColor('warning'),
    error: getHSLColor('destructive'),
    info: getHSLColor('info'),
    background: getHSLColor('background'),
    foreground: getHSLColor('foreground'),
    border: getHSLColor('border'),
    muted: getHSLColor('muted'),
  }
}
```

---

## 最佳实践

### 1. 优先使用原生支持 CSS 变量的组件库

推荐顺序：
1. Naive UI（最佳兼容）
2. Arco Design
3. TDesign
4. Element Plus
5. Ant Design Vue

### 2. 创建主题桥接层

```typescript
// theme-bridge.ts
import { watch } from 'vue'
import { useTheme, getCSSVariable } from '@admin-core/design'

export function setupThemeBridge() {
  const { mode, variant } = useTheme()
  
  // 监听主题变化，同步到第三方组件库
  watch([mode, variant], () => {
    updateThirdPartyTheme()
  }, { immediate: true })
}

function updateThirdPartyTheme() {
  // 更新 Element Plus
  updateElementPlusTheme()
  
  // 更新 Ant Design Vue
  updateAntdTheme()
  
  // ... 其他组件库
}
```

### 3. 使用 CSS 变量作为中间层

```css
/* 定义通用的主题变量 */
:root {
  /* Admin Core 变量 */
  --primary: 212 100% 48%;
  
  /* 映射到 Element Plus */
  --el-color-primary: hsl(var(--primary));
  
  /* 映射到 Ant Design */
  --ant-primary-color: hsl(var(--primary));
  
  /* 映射到 Naive UI */
  --n-color-primary: hsl(var(--primary));
}
```

---

## 注意事项

1. **颜色格式转换**：我们的主题使用 HSL 格式，某些组件库可能需要 RGB 或 HEX 格式
2. **性能考虑**：使用 ConfigProvider 时，避免频繁更新主题对象
3. **暗色模式**：确保第三方组件库的暗色模式与我们的主题同步
4. **优先级问题**：CSS 变量覆盖可能需要提高选择器优先级

---

## 示例项目

查看完整的集成示例：

- [Element Plus 集成示例](./examples/element-plus)
- [Ant Design Vue 集成示例](./examples/antd)
- [Naive UI 集成示例](./examples/naive-ui)

---

## 常见问题

### Q: 为什么第三方组件的颜色没有变化？

A: 检查以下几点：
1. 是否正确导入了主题 CSS
2. CSS 变量覆盖的选择器优先级是否足够
3. 组件库是否支持 CSS 变量

### Q: 如何处理颜色格式不兼容？

A: 使用我们提供的工具函数进行转换：
```typescript
import { hslToRgb, hslToHex } from '@admin-core/design/utils'
```

### Q: 暗色模式下第三方组件显示异常？

A: 确保同时更新了暗色模式的 CSS 变量：
```css
.dark {
  --el-bg-color: hsl(var(--background));
  /* ... 其他变量 */
}
```
