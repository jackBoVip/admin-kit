import type { Config } from 'tailwindcss'

/**
 * Tailwind CSS v4 配置
 * 
 * 用途：
 * 1. 扩展 Tailwind 的默认主题，使其与设计令牌（Design Tokens）集成
 * 2. 配置暗色模式策略（使用 class 策略）
 * 3. 定义内容扫描路径，确保所有使用的类都被包含
 * 4. 提供自定义颜色、圆角、字体等主题扩展
 * 
 * 特性：
 * - 使用 HSL 颜色格式，支持透明度修饰符（如 bg-primary/50）
 * - 所有颜色都映射到 CSS 变量，支持主题切换
 * - 圆角大小基于 --radius 变量动态计算
 * - 支持暗色模式（通过 .dark 类名切换）
 */
export default {
  // 内容扫描路径 - Tailwind 会扫描这些文件中的类名
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './demo/src/**/*.{vue,js,ts,jsx,tsx}',
    '../ui/src/**/*.{vue,js,ts,jsx,tsx}',
    '../layouts/src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  // 暗色模式策略 - 使用 class 策略（通过 .dark 类名切换）
  darkMode: 'class',

  theme: {
    extend: {
      // 颜色扩展 - 映射到 CSS 变量
      colors: {
        // 边框和输入框
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // 背景和前景
        background: {
          DEFAULT: 'hsl(var(--background))',
          deep: 'hsl(var(--background-deep))',
        },
        foreground: 'hsl(var(--foreground))',

        // 主色
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        // 次要色
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        // 柔和色
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        // 强调色
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        // 破坏性操作色
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        // 信息提示色
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },

        // 成功提示色
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },

        // 警告提示色
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },

        // 卡片
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // 弹出层
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        // 侧边栏
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          deep: 'hsl(var(--sidebar-deep))',
        },

        // 头部
        header: 'hsl(var(--header))',

        // 菜单
        menu: 'hsl(var(--menu))',
      },

      // 圆角扩展 - 基于 --radius 变量
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },

      // 字体家族扩展
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },

      // 层级扩展
      zIndex: {
        popup: 'var(--popup-z-index)',
      },

      // 动画扩展 - 与现有动画保持一致
      keyframes: {
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(50px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(-50px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          from: { opacity: '0', transform: 'translateX(-50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        shrink: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
        },
        'nprogress-spinner': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'slide-down': 'slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slide-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slide-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.2s ease-in-out',
        'fade-out': 'fade-out 0.2s ease-in-out',
        shrink: 'shrink 0.3s ease-in-out',
        'nprogress-spinner': 'nprogress-spinner 400ms linear infinite',
      },
    },
  },

  plugins: [],
} satisfies Config
