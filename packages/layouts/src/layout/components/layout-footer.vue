<script setup lang="ts">
import type { CSSProperties} from 'vue';

import { computed } from 'vue';

/**
 * 底部栏组件属性接口定义
 * @interface Props
 * @property {boolean} [fixed] - 是否固定在页面底部
 *     当设置为 `true` 时，底部栏会使用 `fixed` 定位固定在页面底部
 *     当设置为 `false` 或未设置时，使用 `static` 定位
 * @property {number} height - 底部栏的高度（像素）
 *     用于设置底部栏的垂直尺寸
 * @property {boolean} [show] - 是否显示底部栏
 *     控制底部栏的显示与隐藏，通过负 margin 实现平滑的显示/隐藏动画
 * @property {string} width - 底部栏的宽度
 *     支持 CSS 宽度值，如 '100%'、'200px'、'50vw' 等
 * @property {number} zIndex - 底部栏的层级
 *     控制底部栏在页面中的堆叠顺序
 */
interface Props {
  readonly fixed?: boolean;
  readonly height: number;
  readonly show?: boolean;
  readonly width: string;
  readonly zIndex: number;
}

/**
 * 使用 `defineProps` 宏定义组件属性
 * 采用 TypeScript 类型标注方式，结合 `withDefaults` 设置默认值
 * 
 * 注意：`height`、`width` 和 `zIndex` 是必需属性，`fixed` 和 `show` 是可选的
 */
const props = withDefaults(defineProps<Props>(), {
  show: true,
  fixed: false,
});

/**
 * 计算底部栏样式的计算属性
 * 根据属性值动态生成 CSS 样式对象
 * 
 * @returns {ComputedRef<CSSProperties>} - 包含动态样式的响应式对象
 * 
 * @description
 * 样式计算逻辑：
 * 1. `height`: 将数值转换为像素单位
 * 2. `marginBlockEnd`: 控制显示/隐藏，当 `show` 为 `false` 时使用负边距隐藏
 * 3. `position`: 根据 `fixed` 属性决定定位方式
 * 4. `width`: 直接使用传入的宽度值
 * 5. `zIndex`: 设置堆叠层级
 * 
 * 使用 `marginBlockEnd` 替代 `marginBottom`，这是 CSS 逻辑属性，
 * 能更好地支持不同书写模式（如 RTL 语言）
 */
const style = computed((): CSSProperties => {
  const { fixed, height, show, width, zIndex } = props;
  
  return {
    height: `${height}px`,
    marginBlockEnd: show ? '0' : `-${height}px`,
    position: fixed ? 'fixed' : 'static',
    width,
    zIndex,
  };
});
</script>

<template>
  <!--
    底部栏容器
    使用 Vue 3.5+ 的 `<template>` 语法和 ES2025 最佳实践

    @style {CSSProperties} style - 动态计算的底部栏样式
    @class {string} bottom-0 w-full bg-background-deep transition-all duration-200
         bottom-0: 当使用固定定位时，固定在页面底部
         w-full: 宽度为父容器的 100%（会被内联样式覆盖）
         bg-background-deep: 使用深色背景，具体颜色由 CSS 变量定义
         transition-all duration-200: 添加所有属性的过渡动画，持续 200 毫秒
  -->
  <footer
    :style="style"
    class="bottom-0 w-full bg-background-deep transition-all duration-200"
  >
    <!--
      默认插槽
      用于插入底部栏的内容，如导航链接、版权信息、操作按钮等
      
      使用自闭合语法 `<slot />`，这是 Vue 3.5+ 和 ES2025 的推荐写法
    -->
    <slot />
  </footer>
</template>