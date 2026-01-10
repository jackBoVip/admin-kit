import type { Config } from 'tailwindcss'

/**
 * Demo 项目的 Tailwind CSS 配置
 * 继承 @admin-core/design 的配置
 */
export default {
  // 扫描 demo 项目的源文件
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  // 暗色模式策略 - 使用 class 策略（通过 .dark 类名切换）
  darkMode: 'class',

  theme: {
    extend: {
      // 颜色扩展 - 使用 CSS 变量，支持透明度修饰符
      colors: {
        // 边框和输入框
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',

        // 背景和前景
        background: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          deep: 'hsl(var(--background-deep) / <alpha-value>)',
        },
        foreground: 'hsl(var(--foreground) / <alpha-value>)',

        // 主色
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },

        // 次要色
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },

        // 柔和色
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },

        // 强调色
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },

        // 破坏性操作色
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },

        // 信息提示色
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
        },

        // 成功提示色
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },

        // 警告提示色
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
        },

        // 卡片
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },

        // 弹出层
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },

        // 头部
        header: 'hsl(var(--header) / <alpha-value>)',
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
    },
  },

  plugins: [],
} satisfies Config
