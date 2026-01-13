<script setup lang="ts">
/**
 * 表单字段组件
 * 
 * @description
 * 渲染单个表单字段，包括标签、输入控件、验证消息、帮助文本等。
 * 支持动态依赖、条件显示/隐藏、自定义渲染等高级功能。
 * 
 * @example
 * ```vue
 * <FormField
 *   :component="Input"
 *   :fieldName="username"
 *   :label="用户名"
 *   :rules="z.string().min(3)"
 * />
 * ```
 */
import type { ZodType } from 'zod';

import type { FormSchema, MaybeComponentProps } from '../types';

import { computed, nextTick, onUnmounted, useTemplateRef, watch } from 'vue';

import { CircleAlert } from '@admin-core/icons';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  AdminRenderContent,
  AdminTooltip,
  Input,
} from '@admin-core/ui';
import { cn, isFunction, isObject, isString } from '@admin-core/shared/utils';

import { toTypedSchema } from '@vee-validate/zod';
import { useFieldError, useFormValues } from 'vee-validate';

import { injectComponentRefMap } from '../use-form-context';
import { injectRenderFormProps, useFormContext } from './context';
import useDependencies from './dependencies';
import FormLabel from './form-label.vue';
import { isEventObjectLike } from './helper';

interface Props extends Omit<FormSchema, 'componentProps'> {}

const props = withDefaults(
  defineProps<
    Props & {
      commonComponentProps: MaybeComponentProps;
      componentProps?: any; // 使用 any 避免运行时类型检查错误
    }
  >(),
  {}
);

const {
  colon,
  commonComponentProps,
  component,
  componentProps,
  dependencies,
  description,
  disabled,
  disabledOnChangeListener,
  disabledOnInputListener,
  emptyStateValue,
  fieldName,
  formFieldProps,
  hide,
  label,
  labelClass,
  labelWidth,
  modelPropName,
  renderComponentContent,
  rules,
} = props;

/** 获取表单上下文 */
const { componentBindEventMap, componentMap, isVertical } = useFormContext();

/** 获取表单渲染属性 */
const formRenderProps = injectRenderFormProps();

/** 获取表单所有值 */
const values = useFormValues();

/** 获取当前字段的错误信息 */
const errors = useFieldError(fieldName);

/** 字段组件的模板引用 */
const fieldComponentRef = useTemplateRef<HTMLInputElement>('fieldComponentRef');

/** 表单 API 实例 */
const formApi = formRenderProps.form;

/** 是否紧凑模式 */
const compact = computed(() => formRenderProps.compact);

/** 当前字段是否有验证错误 */
const isInValid = computed(() => errors.value?.length > 0);

/**
 * 获取字段组件
 * 
 * @description
 * 如果 component 是字符串，从组件映射表中查找；
 * 否则直接使用传入的组件
 */
const FieldComponent = computed(() => {
  const finalComponent = isString(component)
    ? componentMap.value[component]
    : component;
  
  if (!finalComponent) {
    console.warn(`Component ${component} is not registered`);
    console.log('Available components:', Object.keys(componentMap.value));
    console.log('Component map:', componentMap.value);
    // 返回一个默认组件作为备选
    return Input; // 使用 Input 作为默认组件
  }
  
  return finalComponent;
});

/**
 * 使用依赖功能
 * 
 * @description
 * 处理字段的动态依赖关系，包括条件显示、禁用、必填等
 */
const {
  dynamicComponentProps,
  dynamicRules,
  isDisabled,
  isIf,
  isRequired,
  isShow,
} = useDependencies(() => dependencies);

/**
 * 计算标签样式
 * 
 * @description
 * 如果标签类中包含宽度类或是垂直布局，不设置固定宽度；
 * 否则使用 labelWidth 设置固定宽度
 */
const labelStyle = computed(() => 
  labelClass?.includes('w-') || isVertical.value
    ? {}
    : { width: `${labelWidth}px` }
);

/**
 * 获取当前生效的验证规则
 * 
 * @description
 * 优先使用动态规则，否则使用静态规则
 */
const currentRules = computed(() => dynamicRules.value ?? rules);

/**
 * 计算字段是否可见
 * 
 * @description
 * 综合考虑 hide、if 和 show 条件
 */
const visible = computed(() => !hide && isIf.value && isShow.value);

/**
 * 计算字段是否必填
 * 
 * @description
 * 综合考虑可见性、规则和依赖条件来判断字段是否必填
 */
const shouldRequired = computed((): boolean => {
  if (!visible.value) return false;
  if (!currentRules.value) return isRequired.value;
  if (isRequired.value) return true;

  if (isString(currentRules.value)) {
    return ['required', 'selectRequired'].includes(currentRules.value);
  }

  let isOptional = currentRules.value?.isOptional?.();

  const typeName = currentRules.value?._def?.typeName;
  if (typeName === 'ZodDefault') {
    const innerType = currentRules.value?._def.innerType;
    if (innerType) {
      isOptional = innerType.isOptional?.();
    }
  }

  return !isOptional;
});

/**
 * 计算字段的验证规则
 * 
 * @description
 * 根据可见性和必填状态处理验证规则，
 * 将 Zod schema 转换为 vee-validate 可用的格式
 */
const fieldRules = computed(() => {
  if (!visible.value) return null;

  let rules = currentRules.value;
  if (!rules) return isRequired.value ? 'required' : null;
  if (isString(rules)) return rules;

  const isOptional = !shouldRequired.value;
  if (!isOptional) {
    const unwrappedRules = (rules as any)?.unwrap?.();
    if (unwrappedRules) rules = unwrappedRules;
  }
  
  return toTypedSchema(rules as ZodType);
});

/**
 * 计算组件的最终属性
 * 
 * @description
 * 合并通用属性、字段特定属性和动态属性
 */
const computedProps = computed(() => {
  const finalComponentProps = isFunction(componentProps)
    ? componentProps(values.value, formApi!)
    : componentProps;

  return {
    ...commonComponentProps,
    ...finalComponentProps,
    ...dynamicComponentProps.value,
  };
});

/**
 * 监听 autofocus 属性变化
 * 
 * @description
 * 当 autofocus 为 true 时，自动聚焦到该字段
 */
watch(
  () => computedProps.value?.['autofocus'],
  (value) => {
    if (value === true) {
      void nextTick(autofocus);
    }
  },
  { immediate: true },
);

/**
 * 计算字段是否应该禁用
 * 
 * @description
 * 综合考虑依赖禁用、全局禁用和组件属性禁用
 */
const shouldDisabled = computed(() => 
  isDisabled.value || disabled || computedProps.value?.['disabled']
);

/**
 * 计算自定义内容渲染配置
 * 
 * @description
 * 如果提供了 renderComponentContent 函数，执行它获取自定义渲染内容
 */
const customContentRender = computed(() => 
  isFunction(renderComponentContent)
    ? renderComponentContent(values.value, formApi!)
    : {}
);

/** 获取自定义渲染的插槽名称列表 */
const renderContentKey = computed(() => Object.keys(customContentRender.value));

/**
 * 计算字段的属性
 * 
 * @description
 * 包含验证规则、标签等基础属性
 */
const fieldProps = computed(() => {
  const rules = fieldRules.value;
  return {
    keepValue: true,
    label: isString(label) ? label : '',
    ...(rules ? { rules } : {}),
    ...(formFieldProps as Record<string, any>),
  };
});

/**
 * 绑定字段事件
 * 
 * @description
 * 处理不同组件的值绑定和事件监听，
 * 支持自定义 modelPropName 和事件对象解包
 * 
 * @param slotProps - 插槽属性
 * @returns 事件绑定对象
 */
function fieldBindEvent(slotProps: Record<string, any>): Record<string, any> {
  const componentField = slotProps['componentField'] || {};
  const modelValue = componentField.modelValue;
  const handler = componentField['onUpdate:modelValue'];

  const bindEventField = modelPropName 
    ?? (isString(component) ? componentBindEventMap.value?.[component] : null);

  let value = modelValue;
  if (modelValue && isObject(modelValue) && bindEventField) {
    value = isEventObjectLike(modelValue)
      ? modelValue['target']?.[bindEventField]
      : (modelValue[bindEventField] ?? modelValue);
  }

  if (bindEventField) {
    return {
      [`onUpdate:${bindEventField}`]: handler,
      [bindEventField]: value === undefined ? emptyStateValue : value,
      onChange: disabledOnChangeListener
        ? undefined
        : (e: Record<string, any>) => {
            const onChange = componentField.onChange;
            if (!isEventObjectLike(e)) return onChange?.(e);
            return onChange?.(e['target']?.[bindEventField] ?? e);
          },
      ...(disabledOnInputListener ? { onInput: undefined } : {}),
    };
  }
  
  return {
    ...(disabledOnInputListener ? { onInput: undefined } : {}),
    ...(disabledOnChangeListener ? { onChange: undefined } : {}),
  };
}

/**
 * 创建组件属性
 * 
 * @description
 * 合并字段绑定、事件处理和计算属性，
 * 生成传递给实际组件的完整属性对象
 * 
 * @param slotProps - 插槽属性
 * @returns 组件属性对象
 */
function createComponentProps(slotProps: Record<string, any>): Record<string, any> {
  const bindEvents = fieldBindEvent(slotProps);

  const binds = {
    ...slotProps['componentField'],
    ...computedProps.value,
    ...bindEvents,
    ...(Reflect.has(computedProps.value, 'onChange')
      ? { onChange: computedProps.value.onChange }
      : {}),
    ...(Reflect.has(computedProps.value, 'onInput')
      ? { onInput: computedProps.value.onInput }
      : {}),
  };

  return binds;
}

/**
 * 自动聚焦到字段
 * 
 * @description
 * 如果字段组件支持 focus 方法且当前没有其他元素被聚焦，
 * 则聚焦到该字段
 */
function autofocus(): void {
  const ref = fieldComponentRef.value;
  if (ref && isFunction(ref.focus) && document.activeElement !== ref) {
    ref.focus();
  }
}

/** 获取组件引用映射表 */
const componentRefMap = injectComponentRefMap();

/**
 * 监听字段组件引用变化
 * 
 * @description
 * 将字段组件实例存储到映射表中，供外部访问
 */
watch(fieldComponentRef, (componentRef) => {
  componentRefMap?.set(fieldName, componentRef);
});

/**
 * 组件卸载时清理引用
 */
onUnmounted(() => {
  if (componentRefMap?.has(fieldName)) {
    componentRefMap.delete(fieldName);
  }
});
</script>

<template>
  <FormField
    v-if="!hide && isIf"
    v-bind="fieldProps"
    v-slot="slotProps"
    :name="fieldName"
  >
    <FormItem
      v-show="isShow"
      :class="{
        'form-valid-error': isInValid,
        'form-is-required': shouldRequired,
        'flex-col': isVertical,
        'flex-row items-center': !isVertical,
        'pb-4': !compact,
        'pb-2': compact,
      }"
      class="relative flex"
      v-bind="$attrs"
    >
      <FormLabel
        v-if="!hideLabel"
        :class="
          cn(
            'flex leading-6',
            {
              'mr-2 flex-shrink-0 justify-end': !isVertical,
              'mb-1 flex-row': isVertical,
            },
            labelClass,
          )
        "
        v-bind="{
          ...(help !== undefined ? { help } : {}),
          ...(colon !== undefined ? { colon } : {}),
          ...(label !== undefined ? { label } : {}),
          required: shouldRequired && !hideRequiredMark,
        }"
        :style="labelStyle"
      >
        <template v-if="label">
          <AdminRenderContent :content="label" />
        </template>
      </FormLabel>
      <div class="flex-auto overflow-hidden p-[1px]">
        <div :class="cn('relative flex w-full items-center', wrapperClass)">
          <FormControl :class="cn(controlClass)">
            <slot
              v-bind="{
                ...slotProps,
                ...createComponentProps(slotProps),
                disabled: shouldDisabled,
                isInValid,
              }"
            >
              <component
                :is="FieldComponent"
                ref="fieldComponentRef"
                :class="{
                  'border-destructive hover:border-destructive/80 focus:border-destructive focus:shadow-[0_0_0_2px_rgba(255,38,5,0.06)]':
                    isInValid,
                }"
                v-bind="createComponentProps(slotProps)"
                :disabled="shouldDisabled"
              >
                <template
                  v-for="name in renderContentKey"
                  :key="name"
                  #[name]="renderSlotProps"
                >
                  <AdminRenderContent
                    :content="customContentRender[name]"
                    v-bind="{ ...renderSlotProps, formContext: slotProps }"
                  />
                </template>
                <!-- <slot></slot> -->
              </component>
              <AdminTooltip
                v-if="compact && isInValid"
                :delay-duration="300"
                side="left"
              >
                <template #trigger>
                  <slot name="trigger">
                    <CircleAlert
                      :class="
                        cn(
                          'inline-flex size-5 cursor-pointer text-foreground/80 hover:text-foreground',
                        )
                      "
                    />
                  </slot>
                </template>
                <p v-if="errors" class="text-sm font-medium text-destructive">{{ errors }}</p>
              </AdminTooltip>
            </slot>
          </FormControl>
          <!-- 自定义后缀 -->
          <div v-if="suffix" class="ml-1">
            <AdminRenderContent :content="suffix" />
          </div>
          <FormDescription v-if="description" class="ml-1">
            <AdminRenderContent :content="description" />
          </FormDescription>
        </div>

        <Transition name="slide-up" v-if="!compact">
          <p v-if="errors" class="absolute text-sm font-medium text-destructive">{{ errors }}</p>
        </Transition>
      </div>
    </FormItem>
  </FormField>
</template>
