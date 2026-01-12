import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    // 包含 shadcn-ui 组件的源文件
    '../../shadcn-ui/src/**/*.{vue,js,ts,jsx,tsx}',
    // 包含 layouts 组件的源文件
    '../src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
