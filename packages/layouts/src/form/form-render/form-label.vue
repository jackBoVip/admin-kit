<script setup lang="ts">
/**
 * 表单标签组件
 * 
 * @description
 * 渲染表单字段的标签，支持必填标记、帮助提示和冒号后缀。
 * 
 * @example
 * ```vue
 * <FormLabel
 *   :label="用户名"
 *   :required="true"
 *   :colon="true"
 *   :help="请输入您的用户名"
 * />
 * ```
 */
import type { CustomRenderType } from '../types';

import {
  AdminHelpTooltip,
  AdminRenderContent,
} from '@admin-core/ui';
import { cn } from '@admin-core/shared/utils';

interface Props {
  /** 自定义样式类 */
  class?: string;
  /** 是否显示冒号 */
  colon?: boolean;
  /** 帮助提示内容 */
  help?: CustomRenderType;
  /** 标签内容 */
  label?: CustomRenderType;
  /** 是否必填 */
  required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <label :class="cn('flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)">
    <span v-if="required" class="mr-[2px] text-destructive">*</span>
    <slot></slot>
    <AdminHelpTooltip v-if="help" trigger-class="size-3.5 ml-1">
      <AdminRenderContent :content="help" />
    </AdminHelpTooltip>
    <span v-if="colon && label" class="ml-[2px]">:</span>
  </label>
</template>
