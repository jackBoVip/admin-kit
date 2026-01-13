<script setup lang="ts">
/**
 * 表单渲染核心组件
 * 
 * @description
 * 负责表单的实际渲染，包括表单字段的布局、折叠展开、
 * 验证规则处理等核心功能。这是表单系统的渲染引擎。
 * 
 * @example
 * ```vue
 * <Form
 *   :schema="schema"
 *   :form="form"
 *   :collapsed="false"
 *   @submit="handleSubmit"
 * />
 * ```
 */
import type { GenericObject } from 'vee-validate';
import type { ZodTypeAny } from 'zod';

import type {
  FormCommonConfig,
  FormRenderProps,
  FormSchema,
  FormShape,
} from '../types';

import { computed } from 'vue';

import { Form } from '@admin-core/ui';

import { normalizeSchema } from './helper';
import {
  cn,
  isFunction,
  isString,
  deepMerge,
} from '@admin-core/shared/utils';

import { provideFormRenderProps } from './context';
import { useExpandable } from './expandable';
import FormField from './form-field.vue';
import { getBaseRules, getDefaultValueInZodStack } from './helper';

interface Props extends FormRenderProps {}

const props = withDefaults(
  defineProps<Props & { globalCommonConfig?: FormCommonConfig }>(),
  {
    collapsedRows: 1,
    commonConfig: () => ({}),
    globalCommonConfig: () => ({}),
    showCollapseButton: false,
    wrapperClass: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  },
);

const emits = defineEmits<{
  submit: [event: any];
}>();

/**
 * 计算表单容器的样式类
 * 
 * @description
 * 根据布局模式（inline/vertical）和紧凑模式生成对应的样式类
 */
const wrapperClass = computed(() => {
  const cls = ['flex'];
  if (props.layout === 'inline') {
    cls.push('flex-wrap gap-x-2');
  } else {
    cls.push(props.compact ? 'gap-x-2' : 'gap-x-4', 'flex-col grid');
  }
  return cn(...cls, props.wrapperClass);
});

/** 提供表单渲染属性给子组件 */
provideFormRenderProps(props as any);

/** 使用展开/折叠功能 */
// @ts-expect-error - wrapperRef is used in template
const { isCalculated, keepFormItemIndex, wrapperRef } = useExpandable(props as any);

/**
 * 计算表单字段的形状信息
 * 
 * @description
 * 从 schema 中提取每个字段的默认值、验证规则、是否必填等信息，
 * 用于表单初始化和验证
 */
const shapes = computed((): FormShape[] => {
  const schemaArray = normalizeSchema(props.schema);
  return schemaArray.map((schema: FormSchema) => {
    const { fieldName, rules } = schema;
    
    if (!rules || isString(rules)) {
      return {
        default: undefined,
        fieldName,
        required: false,
        rules: undefined as any,
      };
    }
    
    const typeName = rules._def.typeName;
    const baseRules = getBaseRules(rules) as ZodTypeAny;

    return {
      default: getDefaultValueInZodStack(rules),
      fieldName,
      required: !['ZodNullable', 'ZodOptional'].includes(typeName),
      rules: baseRules,
    };
  });
});

/**
 * 动态选择表单组件
 * 
 * @description
 * 如果传入了 form 实例，使用原生 form 标签；
 * 否则使用 UI 库的 Form 组件
 */
const formComponent = computed(() => {
  // 当有外部 form 实例时，使用原生 form 标签，否则使用 vee-validate 的 Form 组件
  return props.form ? 'form' : Form;
});

/**
 * 计算表单组件的属性
 * 
 * @description
 * 使用 Form 组件或原生 form 标签，根据是否传入外部 form 实例
 */
const formComponentProps = computed(() => ({
  onSubmit: props.form
    ? (values: any) => props.form!.handleSubmit((val: GenericObject) => emits('submit', val))(values)
    : (values: GenericObject) => emits('submit', values)
}));

/**
 * 计算表单是否处于折叠状态
 * 
 * @description
 * 只有在折叠属性为 true 且已完成行计算时，才认为是折叠状态
 */
const formCollapsed = computed(() => props.collapsed && isCalculated.value);

/**
 * 计算最终的表单 schema
 * 
 * @description
 * 合并全局配置和单个字段配置，处理折叠状态下的字段隐藏，
 * 生成每个字段的完整配置信息
 */
const computedSchema = computed(
  (): (Omit<FormSchema, 'formFieldProps'> & {
    commonComponentProps: Record<string, any>;
    formFieldProps: Record<string, any>;
  })[] => {
    const {
      colon = false,
      componentProps = {},
      controlClass = '',
      disabled,
      disabledOnChangeListener = true,
      disabledOnInputListener = true,
      emptyStateValue = undefined,
      formFieldProps = {},
      formItemClass = '',
      hideLabel = false,
      hideRequiredMark = false,
      labelClass = '',
      labelWidth = 100,
      modelPropName = '',
      wrapperClass = '',
    } = deepMerge(props.commonConfig, props.globalCommonConfig);
    
    const keepIndex = keepFormItemIndex.value;
    const isCollapsed = formCollapsed.value;
    
    const schemaArray = normalizeSchema(props.schema);
    return schemaArray.map((schema, index) => {
      const hidden = props.showCollapseButton && isCollapsed && keepIndex
        ? keepIndex <= index
        : false;

      const resolvedSchemaFormItemClass = isFunction(schema.formItemClass)
        ? (() => {
            try {
              return schema.formItemClass();
            } catch (error) {
              console.error('Error calling formItemClass function:', error);
              return '';
            }
          })()
        : schema.formItemClass;

      return {
        colon,
        disabled,
        disabledOnChangeListener,
        disabledOnInputListener,
        emptyStateValue,
        hideLabel,
        hideRequiredMark,
        labelWidth,
        modelPropName,
        wrapperClass,
        ...schema,
        commonComponentProps: componentProps as Record<string, any>,
        componentProps: schema.componentProps,
        controlClass: cn(controlClass, schema.controlClass),
        formFieldProps: {
          ...formFieldProps,
          ...schema.formFieldProps,
        } as Record<string, any>,
        formItemClass: cn(
          'flex-shrink-0',
          { hidden },
          formItemClass,
          resolvedSchemaFormItemClass,
        ),
        labelClass: cn(labelClass, schema.labelClass),
      };
    }) as any;
  },
);
</script>

<template>
  <component :is="formComponent" v-bind="formComponentProps">
    <div ref="wrapperRef" :class="wrapperClass">
      <template v-for="cSchema in computedSchema" :key="cSchema.fieldName">
        <!-- <div v-if="$slots[cSchema.fieldName]" :class="cSchema.formItemClass">
          <slot :definition="cSchema" :name="cSchema.fieldName"> </slot>
        </div> -->
        <FormField
          v-bind="cSchema as any"
          :class="cSchema.formItemClass"
          :rules="cSchema.rules"
        >
          <template #default="slotProps">
            <slot v-bind="slotProps" :name="cSchema.fieldName"> </slot>
          </template>
        </FormField>
      </template>
      <slot :shapes="shapes"></slot>
    </div>
  </component>
</template>
