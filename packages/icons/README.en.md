# @admin-core/icons

<div align="center">

**Vue 3 Icon Component Library**

Complete icon solution based on Iconify and Lucide, supporting on-demand loading and custom icons

[![npm version](https://img.shields.io/npm/v/@admin-core/icons.svg)](https://www.npmjs.com/package/@admin-core/icons)
[![License](https://img.shields.io/npm/l/@admin-core/icons.svg)](https://github.com/jackBoVip/admin-kit/blob/main/LICENSE)

English | [简体中文](./README.md)

</div>

---

## ✨ Features

- 🎨 **Multiple Icon Libraries** - Integrates Iconify (150,000+ icons) and Lucide (1,000+ icons)
- 📦 **On-demand Loading** - Only bundle icons you use, optimize package size
- 🔧 **Easy to Use** - Simple API, ready to use out of the box
- 🎯 **TypeScript** - Full TypeScript type support
- 🚀 **High Performance** - SVG-based, excellent rendering performance
- 🎭 **Custom Icons** - Support for adding custom icon sets
- 🌈 **Flexible Styling** - Support for custom colors, sizes, and more

---

## 📦 Installation

```bash
# Using pnpm
pnpm add @admin-core/icons

# Using npm
npm install @admin-core/icons

# Using yarn
yarn add @admin-core/icons
```

---

## 🚀 Quick Start

### Using Lucide Icons (Recommended)

Lucide icons are pre-imported and ready to use:

```vue
<script setup lang="ts">
import { Menu, Settings, User, Search } from '@admin-core/icons'
</script>

<template>
  <div>
    <Menu :size="24" />
    <Settings :size="24" color="blue" />
    <User :size="24" :stroke-width="2" />
    <Search :size="24" />
  </div>
</template>
```

### Using Iconify Icons

Iconify supports 150,000+ icons with on-demand loading:

```vue
<script setup lang="ts">
import { IconifyIcon } from '@admin-core/icons'
</script>

<template>
  <div>
    <!-- Material Design Icons -->
    <IconifyIcon icon="mdi:home" :width="24" />
    
    <!-- Font Awesome -->
    <IconifyIcon icon="fa:user" :width="24" />
    
    <!-- Bootstrap Icons -->
    <IconifyIcon icon="bi:github" :width="24" />
    
    <!-- Ant Design Icons -->
    <IconifyIcon icon="ant-design:setting-outlined" :width="24" />
  </div>
</template>
```

### Creating Custom Icon Components

```typescript
import { createIconifyIcon } from '@admin-core/icons'

// Create a custom icon component
const MyCustomIcon = createIconifyIcon('mdi:account-circle')

// Use in component
export default {
  components: {
    MyCustomIcon
  }
}
```

---

## 📚 Available Lucide Icons

The package pre-exports commonly used Lucide icons:

### Navigation Icons
- `Menu` - Menu
- `ChevronLeft`, `ChevronRight`, `ChevronDown` - Chevrons
- `ChevronsLeft`, `ChevronsRight` - Double chevrons
- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown` - Direction arrows
- `ExternalLink` - External link

### Action Icons
- `Search`, `SearchX` - Search
- `Plus`, `X` - Add, close
- `Check` - Check
- `Copy` - Copy
- `RotateCw` - Refresh
- `Settings` - Settings
- `Ellipsis` - More

### Status Icons
- `Circle`, `Square` - Shapes
- `CircleCheckBig`, `SquareCheckBig` - Checked
- `CircleAlert`, `CircleX` - Alert, error
- `CircleHelp`, `Info` - Help, info
- `LoaderCircle` - Loading

### UI Icons
- `Eye`, `EyeOff` - Show, hide
- `Maximize`, `Minimize`, `Minimize2` - Maximize, minimize
- `Fullscreen`, `Expand`, `Shrink` - Fullscreen, expand, shrink
- `PanelLeft`, `PanelRight` - Panels
- `Pin`, `PinOff` - Pin, unpin

### Theme Icons
- `Sun`, `MoonStar`, `SunMoon` - Light, dark, auto
- `Palette`, `SwatchBook` - Palette, themes

### User Icons
- `UserRoundPen` - User edit
- `LockKeyhole` - Lock
- `LogOut` - Logout

### Other Icons
- `Bell` - Notifications
- `Inbox` - Inbox
- `MailCheck` - Mail
- `BookOpenText` - Documentation
- `Github` - GitHub
- `Languages` - Languages

View complete list: [Lucide Icons](https://lucide.dev/icons/)

---

## 🎨 Icon Styling

### Lucide Icon Props

```vue
<template>
  <!-- Size -->
  <Menu :size="24" />
  <Menu :size="32" />
  
  <!-- Color -->
  <Menu color="red" />
  <Menu color="#3b82f6" />
  
  <!-- Stroke width -->
  <Menu :stroke-width="1.5" />
  <Menu :stroke-width="2.5" />
  
  <!-- Absolute stroke width -->
  <Menu :absolute-stroke-width="true" />
  
  <!-- CSS class -->
  <Menu class="text-blue-500 hover:text-blue-700" />
</template>
```

### Iconify Icon Props

```vue
<template>
  <!-- Width and height -->
  <IconifyIcon icon="mdi:home" :width="24" />
  <IconifyIcon icon="mdi:home" :width="32" :height="32" />
  
  <!-- Color -->
  <IconifyIcon icon="mdi:home" color="red" />
  
  <!-- Flip -->
  <IconifyIcon icon="mdi:home" :horizontal="true" />
  <IconifyIcon icon="mdi:home" :vertical="true" />
  
  <!-- Rotate -->
  <IconifyIcon icon="mdi:home" :rotate="90" />
  <IconifyIcon icon="mdi:home" :rotate="180" />
  
  <!-- CSS class -->
  <IconifyIcon icon="mdi:home" class="text-blue-500" />
</template>
```

---

## 🔧 Advanced Usage

### Adding Custom Icon Sets

```typescript
import { addCollection, addIcon } from '@admin-core/icons'

// Add entire icon set
addCollection({
  prefix: 'custom',
  icons: {
    'icon1': {
      body: '<path d="..." fill="currentColor"/>',
      width: 24,
      height: 24,
    },
    'icon2': {
      body: '<path d="..." fill="currentColor"/>',
      width: 24,
      height: 24,
    },
  },
})

// Add single icon
addIcon('custom:my-icon', {
  body: '<path d="..." fill="currentColor"/>',
  width: 24,
  height: 24,
})
```

### Listing Available Icons

```typescript
import { listIcons } from '@admin-core/icons'

// List all icons with specified prefix
const icons = listIcons('mdi')
console.log(icons) // ['mdi:home', 'mdi:account', ...]
```

### Using with Tailwind CSS

```vue
<template>
  <div class="flex items-center gap-2">
    <Menu class="w-6 h-6 text-primary" />
    <Settings class="w-5 h-5 text-gray-500 hover:text-gray-700" />
    <User class="w-4 h-4 text-blue-500" />
  </div>
</template>
```

---

## 🌐 Iconify Icon Libraries

Iconify supports over 150 icon sets, including:

| Icon Set | Prefix | Count | Description |
|----------|--------|-------|-------------|
| Material Design Icons | `mdi` | 7,000+ | Google Material Design icons |
| Font Awesome | `fa`, `fa6-solid` | 2,000+ | Most popular icon library |
| Bootstrap Icons | `bi` | 2,000+ | Official Bootstrap icons |
| Ant Design Icons | `ant-design` | 800+ | Ant Design icons |
| Heroicons | `heroicons` | 300+ | Designed by Tailwind CSS team |
| Feather Icons | `feather` | 280+ | Simple and elegant icons |
| Tabler Icons | `tabler` | 4,000+ | Customizable open-source icons |
| Carbon Icons | `carbon` | 2,000+ | IBM Design System icons |
| Remix Icon | `ri` | 2,800+ | Neutral style icons |
| Phosphor Icons | `ph` | 6,000+ | Flexible icon system |

Browse all icons: [Iconify Icon Sets](https://icon-sets.iconify.design/)

---

## 📱 Responsive Icons

```vue
<template>
  <!-- Responsive size -->
  <Menu class="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
  
  <!-- Responsive color -->
  <Settings class="text-gray-500 dark:text-gray-400" />
  
  <!-- Responsive display -->
  <div class="hidden md:block">
    <Search :size="24" />
  </div>
</template>
```

---

## 🎯 Best Practices

### 1. Prefer Lucide Icons

Lucide icons are pre-bundled, no network requests needed, better performance:

```vue
<!-- ✅ Recommended -->
<script setup>
import { Menu, Settings } from '@admin-core/icons'
</script>

<!-- ❌ Not recommended (requires network request) -->
<script setup>
import { IconifyIcon } from '@admin-core/icons'
</script>
<template>
  <IconifyIcon icon="lucide:menu" />
</template>
```

### 2. Consistent Icon Sizes

Maintain consistent icon sizes across your project:

```typescript
// constants/icons.ts
export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const
```

```vue
<template>
  <Menu :size="ICON_SIZES.md" />
</template>
```

### 3. Create Icon Component Library

Create wrapper components for commonly used icons:

```vue
<!-- components/icons/MenuIcon.vue -->
<script setup lang="ts">
import { Menu } from '@admin-core/icons'

interface Props {
  size?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
})
</script>

<template>
  <Menu :size="size" :color="color" />
</template>
```

### 4. Use Semantic Naming

```vue
<script setup>
import { 
  Menu as MenuIcon,
  Settings as SettingsIcon,
  User as UserIcon,
} from '@admin-core/icons'
</script>
```

---

## 📚 API Reference

### Lucide Icon Props

```typescript
interface LucideIconProps {
  size?: number | string          // Icon size, default 24
  color?: string                  // Icon color, default 'currentColor'
  strokeWidth?: number | string   // Stroke width, default 2
  absoluteStrokeWidth?: boolean   // Use absolute stroke width
  class?: string                  // CSS class name
  style?: StyleValue              // Inline styles
}
```

### Iconify Icon Props

```typescript
interface IconifyIconProps {
  icon: string                    // Icon name (required)
  width?: number | string         // Width
  height?: number | string        // Height
  color?: string                  // Color
  horizontal?: boolean            // Horizontal flip
  vertical?: boolean              // Vertical flip
  rotate?: number | string        // Rotation angle (0, 90, 180, 270)
  class?: string                  // CSS class name
  style?: StyleValue              // Inline styles
}
```

### Utility Functions

```typescript
// Create Iconify icon component
createIconifyIcon(icon: string): Component

// Add icon collection
addCollection(data: IconifyJSON): boolean

// Add single icon
addIcon(name: string, data: IconifyIcon): boolean

// List icons
listIcons(prefix?: string): string[]
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
// Import Lucide icons
import { Menu, Settings, User } from '@admin-core/icons'

// Import Iconify component
import { IconifyIcon } from '@admin-core/icons'

// Import utility functions
import { 
  createIconifyIcon,
  addCollection,
  addIcon,
  listIcons,
} from '@admin-core/icons'

// Import types
import type { IconifyIconStructure } from '@admin-core/icons'
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
- [Lucide Icons](https://lucide.dev/icons/)
- [Iconify Icon Sets](https://icon-sets.iconify.design/)
- [Iconify Documentation](https://iconify.design/docs/)
