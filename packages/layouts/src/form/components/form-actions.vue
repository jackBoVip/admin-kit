<script setup lang="ts">
/**
 * 表单操作按钮组件
 * 
 * @description
 * 渲染表单的操作按钮区域，包括提交、重置和展开/折叠按钮。
 * 支持自定义按钮配置、位置布局和插槽扩展。
 * 
 * @example
 * ```vue
 * <FormActions
 *   v-model="collapsed"
 *   @submit="handleSubmit"
 *   @reset="handleReset"
 * />
 * ```
 */
import { computed, toRaw, unref, watch } from 'vue';

import { useSimpleLocale } from '@admin-core/composables';
import { AdminExpandableArrow } from '@admin-core/ui';
import { cn, isFunction } from '@admin-core/shared/utils';

import { COMPONENT_MAP, COMPONENT_DEFAULT_PROPS } from '../config';
import { injectFormProps } from '../use-form-context';

/** 获取国际化函数 */
const { $t } = useSimpleLocale();

/** 注入表单属性 */
const [rootProps, form] = injectFormProps();

/** 折叠状态的双向绑定 */
const collapsed = defineModel({ default: false });

/**
 * 计算重置按钮配置
 * 
 * @description
 * 合并默认配置和用户自定义配置
 */
const resetButtonOptions = computed(() => {
  return {
    content: `${$t.value('reset')}`,
    show: true,
    ...unref(rootProps).resetButtonOptions,
  };
});

/**
 * 计算提交按钮配置
 * 
 * @description
 * 合并默认配置和用户自定义配置
 */
const submitButtonOptions = computed(() => {
  return {
    content: `${$t.value('submit')}`,
    show: true,
    ...unref(rootProps).submitButtonOptions,
  };
});

/**
 * 处理表单提交
 * 
 * @description
 * 验证表单后，如果验证通过则调用 handleSubmit 回调
 * 
 * @param e - 事件对象
 */
async function handleSubmit(e: Event) {
  e?.preventDefault();
  e?.stopPropagation();
  const props = unref(rootProps);
  if (!props.formApi) {
    return;
  }

  const { valid } = await props.formApi.validate();
  if (!valid) {
    return;
  }

  const values = toRaw(await props.formApi.getValues()) ?? {};
  await props.handleSubmit?.(values);
}

/**
 * 处理表单重置
 * 
 * @description
 * 如果提供了自定义 handleReset 回调则调用它，
 * 否则使用表单的默认重置方法
 * 
 * @param e - 事件对象
 */
async function handleReset(e: Event) {
  e?.preventDefault();
  e?.stopPropagation();
  const props = unref(rootProps);

  const values = toRaw(await props.formApi?.getValues()) ?? {};

  if (isFunction(props.handleReset)) {
    await props.handleReset?.(values);
  } else {
    form.resetForm();
  }
}

/**
 * 监听折叠状态变化
 * 
 * @description
 * 当折叠状态改变且启用了 collapseTriggerResize 时，
 * 触发窗口 resize 事件，用于更新依赖窗口尺寸的组件
 */
watch(
  () => collapsed.value,
  () => {
    const props = unref(rootProps);
    if (props.collapseTriggerResize) {
      // 触发窗口 resize 事件
      window.dispatchEvent(new Event('resize'));
    }
  },
);

/**
 * 计算操作按钮容器的样式类
 * 
 * @description
 * 根据布局模式、位置和其他配置生成对应的样式类
 */
const actionWrapperClass = computed(() => {
  const props = unref(rootProps);
  const actionLayout = props.actionLayout ?? 'rowEnd';
  const actionPosition = props.actionPosition ?? 'right';

  const cls = [
    'flex',
    'items-center',
    'gap-3',
    props.compact ? 'pb-2' : 'pb-4',
    props.layout === 'vertical' ? 'self-end' : 'self-center',
    props.layout === 'inline' ? '' : 'w-full',
    props.actionWrapperClass,
  ];

  // 根据操作按钮布局模式添加样式
  const layoutClasses = {
    newLine: 'col-span-full', // 独占一行
    rowEnd: 'col-[-2/-1]',    // 占据最后一列
    inline: '',               // 不需要额外类名
  } as const;
  
  cls.push(layoutClasses[actionLayout] ?? '');

  // 根据操作按钮位置添加对齐样式
  const positionClasses = {
    center: 'justify-center', // 居中对齐
    left: 'justify-start',    // 左对齐
    right: 'justify-end',     // 右对齐（默认）
  } as const;
  
  cls.push(positionClasses[actionPosition] ?? 'justify-end');

  return cls.join(' ');
});

/**
 * 暴露方法给父组件
 * 
 * @description
 * 允许父组件通过 ref 调用提交和重置方法
 */
defineExpose({
  handleReset,
  handleSubmit,
});
</script>
<template>
  <div :class="cn(actionWrapperClass)">
    <template v-if="rootProps.actionButtonsReverse">
      <!-- 提交按钮前 -->
      <slot name="submit-before"></slot>

      <component
        :is="COMPONENT_MAP.PrimaryButton"
        v-if="submitButtonOptions.show"
        type="button"
        @click="handleSubmit"
        v-bind="{ ...COMPONENT_DEFAULT_PROPS.PrimaryButton, ...submitButtonOptions }"
      >
        {{ submitButtonOptions.content }}
      </component>
    </template>

    <!-- 重置按钮前 -->
    <slot name="reset-before"></slot>

    <component
      :is="COMPONENT_MAP.DefaultButton"
      v-if="resetButtonOptions.show"
      type="button"
      @click="handleReset"
      v-bind="{ ...COMPONENT_DEFAULT_PROPS.DefaultButton, ...resetButtonOptions }"
    >
      {{ resetButtonOptions.content }}
    </component>

    <template v-if="!rootProps.actionButtonsReverse">
      <!-- 提交按钮前 -->
      <slot name="submit-before"></slot>

      <component
        :is="COMPONENT_MAP.PrimaryButton"
        v-if="submitButtonOptions.show"
        type="button"
        @click="handleSubmit"
        v-bind="{ ...COMPONENT_DEFAULT_PROPS.PrimaryButton, ...submitButtonOptions }"
      >
        {{ submitButtonOptions.content }}
      </component>
    </template>

    <!-- 展开按钮前 -->
    <slot name="expand-before"></slot>

    <AdminExpandableArrow
      class="ml-[-0.3em]"
      v-if="rootProps.showCollapseButton"
      v-model:model-value="collapsed"
    >
      <span>{{ collapsed ? $t('expand') : $t('collapse') }}</span>
    </AdminExpandableArrow>

    <!-- 展开按钮后 -->
    <slot name="expand-after"></slot>
  </div>
</template>
