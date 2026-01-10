# @admin-core/design

<div align="center">

**Modern Vue 3 Design System**

A complete design system based on Tailwind CSS v4, providing theme management, design tokens, and third-party component library integration

[![npm version](https://img.shields.io/npm/v/@admin-core/design.svg)](https://www.npmjs.com/package/@admin-core/design)
[![License](https://img.shields.io/npm/l/@admin-core/design.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

English | [简体中文](./README.md)

</div>

---

## ✨ Features

- 🎨 **15+ Preset Themes** - 2026 trending color series with light/dark mode support
- 🔧 **Tailwind CSS v4** - Built with the latest Tailwind CSS v4 features
- 🎯 **Design Tokens** - CSS variable-based design token system
- 🔌 **Third-party Integration** - Out-of-the-box theme integration for Element Plus, Ant Design Vue, and more
- 🌍 **Internationalization** - Support for Chinese and English theme names and descriptions
- 🎭 **Custom Themes** - Smart color generation algorithm - just pick a primary color
- 📦 **TypeScript** - Full TypeScript type support
- 🚀 **Zero Config** - Import and use, no complex configuration needed

---

## 📦 Installation

```bash
# Using pnpm
pnpm add @admin-core/design

# Using npm
npm install @admin-core/design

# Using yarn
yarn add @admin-core/design
```

---

## 🚀 Quick Start

### Basic Usage

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import design system
import '@admin-core/design/css'

const app = createApp(App)
app.mount('#app')
```

### Using in Components

```vue
<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="card-box p-6 rounded-lg">
      <h1 class="text-2xl font-bold text-primary">Welcome to Admin Core</h1>
      <p class="text-muted-foreground mt-2">Modern Design System</p>
      
      <button class="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
        Get Started
      </button>
    </div>
  </div>
</template>
```

---

## 🎨 Theme System

### Toggle Dark Mode

```typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

```html
<!-- Light mode (default) -->
<html>
  <body>...</body>
</html>

<!-- Dark mode -->
<html class="dark">
  <body>...</body>
</html>
```

### Switch Theme Variant

```typescript
// Set theme
document.documentElement.setAttribute('data-theme', 'deep-teal')
```

```html
<!-- Deep Teal theme -->
<html data-theme="deep-teal">
  <body>...</body>
</html>

<!-- Dark + Deep Teal theme -->
<html class="dark" data-theme="deep-teal">
  <body>...</body>
</html>
```

### Available Themes (15 x 2026 Trending Colors)

| Theme ID | Name | Description |
|---------|------|-------------|
| `default` | Classic Blue | Classic blue theme suitable for most scenarios |
| `slate` | Slate Gray | Professional and stable neutral gray tone |
| `burnished-lilac` | Burnished Lilac | Elegant and mysterious purple-gray tone |
| `teaberry` | Teaberry | Vibrant rose-red tone |
| `amaranth` | Amaranth | Noble and elegant deep purple tone |
| `pulse-blue` | Pulse Blue | Energetic bright blue |
| `deep-teal` | Deep Teal | Calm and atmospheric teal tone |
| `mermaid-aqua` | Mermaid Aqua | Fresh and dreamy aqua blue |
| `pearl-purple` | Pearl Purple | Soft and elegant light purple |
| `burgundy` | Burgundy | Mature and stable wine red |
| `burnt-sienna` | Burnt Sienna | Warm and retro orange-brown |
| `olive-sage` | Olive Sage | Natural and fresh olive green |
| `champagne-gold` | Champagne Gold | Luxurious and elegant gold tone |
| `dusty-rose` | Dusty Rose | Gentle and romantic pink-gray |
| `citrus-green` | Citrus Green | Fresh and energetic lemon green |

### Using Vue Composable

```vue
<script setup lang="ts">
import { useTheme } from '@admin-core/design'

const { 
  mode,           // Current mode: 'light' | 'dark'
  variant,        // Current theme variant
  isDark,         // Is dark mode
  setMode,        // Set mode
  setVariant,     // Set theme variant
  toggleDarkMode, // Toggle dark mode
} = useTheme()

// Toggle dark mode
const handleToggle = () => {
  toggleDarkMode()
}

// Switch theme
const handleThemeChange = (theme: string) => {
  setVariant(theme)
}
</script>

<template>
  <div>
    <button @click="handleToggle">
      {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
    </button>
    
    <select @change="handleThemeChange($event.target.value)">
      <option value="default">Classic Blue</option>
      <option value="deep-teal">Deep Teal</option>
      <option value="teaberry">Teaberry</option>
    </select>
  </div>
</template>
```

---

## 🎯 Custom Themes

### Smart Color Generation

Just pick a primary color, and the system will automatically generate a complete color scheme:

```typescript
import { applyThemeFromPrimary } from '@admin-core/design'

// Using HEX color
applyThemeFromPrimary('#8B5CF6')

// Using HSL color
applyThemeFromPrimary('280 60% 50%')

// Specify mode and persist
applyThemeFromPrimary('#8B5CF6', 'dark', true)
```

### Full Customization

```typescript
import { applyCustomTheme } from '@admin-core/design'

applyCustomTheme({
  primary: '280 60% 50%',
  secondary: '280 30% 90%',
  accent: '280 55% 85%',
  // ... more colors
}, true) // true means persist to localStorage
```

---

## 🔌 Third-party Component Library Integration

### One-line Integration

We provide out-of-the-box theme integration files for popular component libraries:

#### Element Plus

```typescript
// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@admin-core/design/css'

// One line integration!
import '@admin-core/design/css/integrations/element-plus.css'

app.use(ElementPlus)
```

#### Ant Design Vue

```typescript
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import '@admin-core/design/css'
import '@admin-core/design/css/integrations/ant-design-vue.css'

app.use(Antd)
```

#### Naive UI

```typescript
import naive from 'naive-ui'
import '@admin-core/design/css'
import '@admin-core/design/css/integrations/naive-ui.css'

app.use(naive)
```

#### Arco Design

```typescript
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import '@admin-core/design/css'
import '@admin-core/design/css/integrations/arco-design.css'

app.use(ArcoVue)
```

### Integration Benefits

✅ **Auto Theme Sync** - Switch themes, component colors update instantly  
✅ **Dark Mode Support** - Toggle dark mode, components adapt automatically  
✅ **Custom Themes** - Use custom themes, components sync automatically  
✅ **Zero Config** - No additional configuration needed  
✅ **High Performance** - Based on CSS variables, excellent performance  

### Advanced Usage: Using ConfigProvider

```vue
<template>
  <a-config-provider :theme="antdTheme">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useTheme, getRGBColor } from '@admin-core/design'

const { isDark } = useTheme()

const antdTheme = computed(() => ({
  algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: getRGBColor('primary'),
    colorSuccess: getRGBColor('success'),
    colorWarning: getRGBColor('warning'),
    colorError: getRGBColor('destructive'),
  },
}))
</script>
```

### Integration Utility Functions

```typescript
import { 
  getHSLColor,      // Get HSL format color
  getRGBColor,      // Get RGB format color
  getHexColor,      // Get HEX format color
  getThemeColors,   // Get all colors in batch (HSL)
  getThemeColorsRGB,// Get all colors in batch (RGB)
  getThemeColorsHex,// Get all colors in batch (HEX)
} from '@admin-core/design'

// Get single color
const primaryHSL = getHSLColor('primary')  // 'hsl(212, 100%, 48%)'
const primaryRGB = getRGBColor('primary')  // 'rgb(0, 102, 245)'
const primaryHex = getHexColor('primary')  // '#0066F5'

// Get all colors in batch
const allColors = getThemeColors()
```

---

## 🌍 Internationalization

### Set Language

```typescript
import { setLocale, getLocale } from '@admin-core/design'

// Set to English
setLocale('en-US')

// Set to Chinese
setLocale('zh-CN')

// Get current language
const currentLocale = getLocale() // 'zh-CN' | 'en-US'
```

### Get Internationalized Theme Information

```typescript
import { getThemeName, getThemeDescription, getThemeMetadata } from '@admin-core/design'

// Get theme name (based on current language)
const name = getThemeName('deep-teal')
// Chinese: '深邃青'
// English: 'Deep Teal'

// Get theme description
const description = getThemeDescription('deep-teal')
// Chinese: '2026流行色 - 深邃的青色，沉稳大气'
// English: '2026 Trending Color - Deep teal, calm and atmospheric'

// Get all themes (auto internationalized)
const themes = getThemeMetadata()
```

### Using in Vue Components

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { setLocale, getLocale, getThemeMetadata, type Locale } from '@admin-core/design'

const currentLocale = ref<Locale>(getLocale())
const themes = ref(getThemeMetadata())

const changeLanguage = (locale: Locale) => {
  setLocale(locale)
  currentLocale.value = locale
  themes.value = getThemeMetadata() // Re-fetch to update language
}
</script>

<template>
  <div>
    <select v-model="currentLocale" @change="changeLanguage(currentLocale)">
      <option value="zh-CN">🇨🇳 中文</option>
      <option value="en-US">🇺🇸 English</option>
    </select>
    
    <select>
      <option v-for="theme in themes" :key="theme.id" :value="theme.id">
        {{ theme.icon }} {{ theme.name }}
      </option>
    </select>
  </div>
</template>
```

---

## 🎨 Design Tokens

All colors are defined using HSL format CSS variables, supporting opacity modifiers:

### Base Colors

```html
<!-- Background and foreground -->
<div class="bg-background text-foreground">Content</div>

<!-- Card -->
<div class="bg-card text-card-foreground">Card content</div>

<!-- Popover -->
<div class="bg-popover text-popover-foreground">Popover content</div>
```

### Semantic Colors

```html
<!-- Primary -->
<button class="bg-primary text-primary-foreground">Primary Button</button>

<!-- Secondary -->
<button class="bg-secondary text-secondary-foreground">Secondary Button</button>

<!-- Accent -->
<div class="bg-accent text-accent-foreground">Accent content</div>

<!-- Muted -->
<div class="bg-muted text-muted-foreground">Muted content</div>

<!-- Destructive -->
<button class="bg-destructive text-destructive-foreground">Delete</button>
```

### Status Colors

```html
<!-- Success -->
<div class="bg-success text-success-foreground">Success message</div>

<!-- Warning -->
<div class="bg-warning text-warning-foreground">Warning message</div>

<!-- Info -->
<div class="bg-info text-info-foreground">Info message</div>
```

### Opacity Modifiers

```html
<div class="bg-primary/10">10% opacity</div>
<div class="bg-primary/50">50% opacity</div>
<div class="bg-primary/90">90% opacity</div>
```

### Using in CSS

```css
.my-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}

/* Using opacity */
.my-overlay {
  background-color: hsl(var(--primary) / 0.5);
}
```

---

## 🛠️ Utility Classes

### Layout Utilities

```html
<!-- Horizontal center -->
<div class="flex-center">
  <div>Centered content</div>
</div>

<!-- Vertical center -->
<div class="flex-col-center">
  <div>Vertically centered</div>
</div>

<!-- Card container -->
<div class="card-box p-6">
  <h3>Card title</h3>
  <p>Card content</p>
</div>

<!-- Outline box -->
<div class="outline-box">
  Clickable box
</div>

<div class="outline-box outline-box-active">
  Active state box
</div>
```

### Link Styles

```html
<a href="#" class="admin-link">Link text</a>
```

---

## 📱 Responsive Design

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card-box p-4">Card 1</div>
  <div class="card-box p-4">Card 2</div>
  <div class="card-box p-4">Card 3</div>
</div>
```

---

## 🎭 Special Modes

### Invert Mode

```html
<html class="invert-mode">
  <body>All colors inverted</body>
</html>
```

### Grayscale Mode

```html
<html class="grayscale-mode">
  <body>All colors in grayscale</body>
</html>
```

---

## ⚙️ Tailwind CSS Configuration

If your project needs to extend Tailwind configuration:

```typescript
// tailwind.config.ts
import designConfig from '@admin-core/design/tailwind.config'
import type { Config } from 'tailwindcss'

export default {
  ...designConfig,
  content: [
    ...designConfig.content,
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    ...designConfig.theme,
    extend: {
      ...designConfig.theme.extend,
      // Your custom extensions
      colors: {
        brand: '#FF6B6B',
      },
    },
  },
} satisfies Config
```

---

## 📚 API Reference

### Theme Management

```typescript
// Composable
const {
  mode,           // Current mode
  variant,        // Current theme variant
  isDark,         // Is dark mode
  setMode,        // Set mode
  setVariant,     // Set theme variant
  toggleDarkMode, // Toggle dark mode
  getCurrentThemeMetadata, // Get current theme metadata
} = useTheme()

// Utility functions
initTheme()                    // Initialize theme
applyTheme(config, options)    // Apply theme configuration
detectSystemTheme()            // Detect system theme
watchSystemTheme(callback)     // Watch system theme changes
```

### Custom Themes

```typescript
// Smart color generation
applyThemeFromPrimary(color, mode?, persist?)

// Full customization
applyCustomTheme(colors, persist?)

// Clear custom theme
clearCustomTheme()

// Restore custom theme
restoreCustomTheme()
```

### Color Utilities

```typescript
// Get colors
getHSLColor(token)      // Get HSL format
getRGBColor(token)      // Get RGB format
getHexColor(token)      // Get HEX format

// Batch get
getThemeColors()        // All colors (HSL)
getThemeColorsRGB()     // All colors (RGB)
getThemeColorsHex()     // All colors (HEX)

// Color conversion
hexToHSL(hex)          // HEX to HSL
rgbToHSL(r, g, b)      // RGB to HSL
hslToRgb(hsl)          // HSL to RGB
hslToHex(hsl)          // HSL to HEX
```

### Internationalization

```typescript
setLocale(locale)              // Set language
getLocale()                    // Get current language
getThemeName(themeId)          // Get theme name
getThemeDescription(themeId)   // Get theme description
getThemeMetadata()             // Get all theme metadata
getTranslations()              // Get current language translations
```

---

## 🌐 Browser Compatibility

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

---

## 📦 Exports

```typescript
// Main entry
import '@admin-core/design'

// CSS only
import '@admin-core/design/css'

// Import theme system
import { useTheme, setLocale } from '@admin-core/design'

// Import integration files
import '@admin-core/design/css/integrations/element-plus.css'
import '@admin-core/design/css/integrations/ant-design-vue.css'
import '@admin-core/design/css/integrations/naive-ui.css'
import '@admin-core/design/css/integrations/arco-design.css'

// Import Tailwind config
import designConfig from '@admin-core/design/tailwind.config'
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

MIT License © 2024 [Admin Kit Team](https://github.com/jackBoVip/admin-kit)

---

## 🔗 Links

- [GitHub Repository](https://github.com/jackBoVip/admin-kit)
- [Issue Tracker](https://github.com/jackBoVip/admin-kit/issues)
- [Changelog](./CHANGELOG.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
