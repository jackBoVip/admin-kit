<script setup lang="ts">
import type { ZodType, ZodTypeAny } from 'zod';
import type { PropType } from 'vue';

import type { FormSchema, FormItemDependencies, MaybeComponentProps } from '../types';

import { computed, nextTick, onUnmounted, useTemplateRef, watch } from 'vue';

defineOptions({
  inheritAttrs: false,
});

import { CircleAlert } from '@admin-core/icons';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  AdminRenderContent,
  AdminTooltip,
} from '@admin-core/ui';
import { cn, isFunction, isObject, isString } from '@admin-core/shared/utils';

import { toTypedSchema } from '@vee-validate/zod';
import { useFieldError, useFormValues } from 'vee-validate';

import { injectComponentRefMap } from '../use-form-context';
import { injectRenderFormProps, useFormContext } from './context';
import useDependencies from './dependencies';
import FormLabel from './form-label.vue';
import { isEventObjectLike } from './helper';

interface Props extends FormSchema {}

// Use runtime prop definition to explicitly allow both Function and Object for componentProps
// This prevents Vue from incorrectly inferring componentProps as only Function type during compilation
const props = defineProps({
  // FormCommonConfig props
  colon: { type: Boolean, default: false },
  componentProps: {
    type: [Function, Object], // Explicitly allow both Function and Object
    default: undefined,
  },
  controlClass: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  disabledOnChangeListener: { type: Boolean, default: true },
  disabledOnInputListener: { type: Boolean, default: true },
  emptyStateValue: { type: null as any, default: undefined },
  formFieldProps: {
    type: Object,
    default: () => ({}),
  },
  formItemClass: [String, Function],
  hideLabel: { type: Boolean, default: false },
  hideRequiredMark: { type: Boolean, default: false },
  labelClass: [String, Function],
  labelWidth: { type: Number, default: 100 },
  modelPropName: { type: String, default: '' },
  wrapperClass: { type: String, default: '' },
  // FormSchema specific props
  commonComponentProps: {
    type: Object,
    default: () => ({}),
  },
  component: [String, Object],
  dependencies: Object as PropType<Props['dependencies'] | undefined>,
  description: [String, Function, Object],
  fieldName: String,
  hide: { type: Boolean, default: false },
  label: [String, Function, Object],
  renderComponentContent: Function,
  rules: {
    type: [String, Object, null] as PropType<Props['rules']>,
    default: undefined,
  },
  suffix: [String, Function, Object],
  help: [String, Function, Object],
  defaultValue: undefined as any,
});

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

const { componentBindEventMap, componentMap, isVertical } = useFormContext();
const formRenderProps = injectRenderFormProps();
const values = useFormValues();
// Guard against undefined fieldName to prevent vee-validate errors
const errors = fieldName ? useFieldError(fieldName) : computed(() => undefined);
const fieldComponentRef = useTemplateRef<HTMLInputElement>('fieldComponentRef');
const formApi = formRenderProps.form;
const compact = computed(() => formRenderProps.compact);
const isInValid = computed(() => (errors.value?.length ?? 0) > 0);

const FieldComponent = computed(() => {
  const finalComponent = isString(component)
    ? componentMap.value[component]
    : component;
  if (!finalComponent) {
    // 组件未注册
    console.warn(`Component ${component} is not registered`);
  }
  return finalComponent;
});

const {
  dynamicComponentProps,
  dynamicRules,
  isDisabled,
  isIf,
  isRequired,
  isShow,
} = useDependencies(() => (dependencies as FormItemDependencies | undefined) || undefined);

const labelStyle = computed(() => {
  return (isString(labelClass) && labelClass.includes('w-')) || isVertical.value
    ? {}
    : {
        width: `${labelWidth}px`,
      };
});

const currentRules = computed(() => {
  return dynamicRules.value || rules;
});

const visible = computed(() => {
  return !hide && isIf.value && isShow.value;
});

const shouldRequired = computed(() => {
  if (!visible.value) {
    return false;
  }

  if (!currentRules.value) {
    return isRequired.value;
  }

  if (isRequired.value) {
    return true;
  }

  if (isString(currentRules.value)) {
    return ['required', 'selectRequired'].includes(currentRules.value);
  }

  // Type guard: check if currentRules is a ZodType (has isOptional method)
  const rulesValue = currentRules?.value;
  let isOptional: boolean | undefined;
  
  // Check if rulesValue is a ZodType (not a string, not null, and has isOptional method)
  if (rulesValue && !isString(rulesValue) && typeof rulesValue === 'object' && 'isOptional' in rulesValue && typeof (rulesValue as any).isOptional === 'function') {
    const zodType = rulesValue as ZodTypeAny;
    isOptional = zodType.isOptional?.();
    
    // 如果有设置默认值，则不是必填，需要特殊处理
    if (zodType._def && typeof zodType._def === 'object') {
      const typeName = (zodType._def as any)?.typeName;
      if (typeName === 'ZodDefault') {
        const innerType = (zodType._def as any)?.innerType;
        if (innerType && typeof innerType === 'object' && 'isOptional' in innerType && typeof innerType.isOptional === 'function') {
          isOptional = (innerType as ZodTypeAny).isOptional?.();
        }
      }
    }
  }

  return !isOptional;
});

const fieldRules = computed(() => {
  if (!visible.value) {
    return null;
  }

  let rules = currentRules.value;
  if (!rules) {
    return isRequired.value ? 'required' : null;
  }

  if (isString(rules)) {
    return rules;
  }

  const isOptional = !shouldRequired.value;
  if (!isOptional) {
    const unwrappedRules = (rules as any)?.unwrap?.();
    if (unwrappedRules) {
      rules = unwrappedRules;
    }
  }
  return toTypedSchema(rules as ZodType);
});

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

watch(
  () => computedProps.value?.['autofocus'],
  (value) => {
    if (value === true) {
      nextTick(() => {
        autofocus();
      });
    }
  },
  { immediate: true },
);

const shouldDisabled = computed(() => {
  return isDisabled.value || disabled || computedProps.value?.['disabled'];
});

const customContentRender = computed(() => {
  if (!isFunction(renderComponentContent)) {
    return {};
  }
  return renderComponentContent(values.value, formApi!);
});

const renderContentKey = computed(() => {
  return Object.keys(customContentRender.value);
});

const fieldProps = computed(() => {
  const rules = fieldRules.value;
  // Filter out componentProps and other non-vee-validate props from formFieldProps
  const { componentProps: _, ...validFormFieldProps } = (formFieldProps as Record<string, any>) || {};
  
  // Only include vee-validate Field supported props
  // Reference: https://vee-validate.logaretm.com/v4/api/field
  const veeValidateFieldProps: Record<string, any> = {
    keepValue: true,
    label: isString(label) ? label : '',
    ...(rules ? { rules } : {}),
  };
  
  // Only merge valid vee-validate Field props from formFieldProps
  // vee-validate Field supports: validateOnBlur, validateOnChange, validateOnInput, 
  // validateOnModelUpdate, validateOnMount, bails, type, value, unchecked-value, standalone, etc.
  const allowedVeeValidateProps = [
    'validateOnBlur', 'validateOnChange', 'validateOnInput', 
    'validateOnModelUpdate', 'validateOnMount', 'bails', 
    'type', 'value', 'unchecked-value', 'standalone'
  ];
  
  for (const key of allowedVeeValidateProps) {
    if (key in validFormFieldProps) {
      veeValidateFieldProps[key] = validFormFieldProps[key];
    }
  }
  
  return veeValidateFieldProps;
});

function fieldBindEvent(slotProps: Record<string, any>) {
  const componentField = slotProps['componentField'];
  const modelValue = componentField?.modelValue;
  const handler = componentField?.['onUpdate:modelValue'];

  const bindEventField =
    modelPropName ||
    (isString(component) ? componentBindEventMap.value?.[component] : null);

  let value = modelValue;
  // antd design 的一些组件会传递一个 event 对象
  if (modelValue && isObject(modelValue) && bindEventField) {
    value = isEventObjectLike(modelValue)
      ? modelValue?.['target']?.[bindEventField]
      : (modelValue?.[bindEventField] ?? modelValue);
  }

  if (bindEventField) {
    return {
      [`onUpdate:${bindEventField}`]: handler,
      [bindEventField]: value === undefined ? emptyStateValue : value,
      onChange: disabledOnChangeListener
        ? undefined
        : (e: Record<string, any>) => {
            const shouldUnwrap = isEventObjectLike(e);
            const onChange = slotProps?.['componentField']?.onChange;
            if (!shouldUnwrap) {
              return onChange?.(e);
            }

            return onChange?.(e?.['target']?.[bindEventField] ?? e);
          },
      ...(disabledOnInputListener ? { onInput: undefined } : {}),
    };
  }
  return {
    ...(disabledOnInputListener ? { onInput: undefined } : {}),
    ...(disabledOnChangeListener ? { onChange: undefined } : {}),
  };
}

function createComponentProps(slotProps: Record<string, any>) {
  const bindEvents = fieldBindEvent(slotProps);

  const binds = {
    ...slotProps['componentField'],
    ...computedProps.value,
    ...bindEvents,
    ...(Reflect.has(computedProps.value, 'onChange')
      ? { onChange: computedProps.value['onChange'] }
      : {}),
    ...(Reflect.has(computedProps.value, 'onInput')
      ? { onInput: computedProps.value['onInput'] }
      : {}),
  };

  return binds;
}

function autofocus() {
  if (
    // SSR/Node 环境下没有 document
    typeof document !== 'undefined' &&
    fieldComponentRef.value &&
    isFunction(fieldComponentRef.value.focus) &&
    // 检查当前是否有元素被聚焦
    document.activeElement !== fieldComponentRef.value
  ) {
    fieldComponentRef.value?.focus?.();
  }
}
const componentRefMap = injectComponentRefMap();
watch(fieldComponentRef, (componentRef) => {
  if (fieldName) {
    componentRefMap?.set(fieldName, componentRef);
  }
});
onUnmounted(() => {
  if (fieldName && componentRefMap?.has(fieldName)) {
    componentRefMap.delete(fieldName);
  }
});
</script>

<template>
  <FormField
    v-if="!hide && isIf && fieldName"
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
        :help="help as any"
        :colon="colon"
        :label="label as any"
        :required="shouldRequired && !hideRequiredMark"
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
                <FormMessage />
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
          <FormMessage class="absolute" />
        </Transition>
      </div>
    </FormItem>
  </FormField>
</template>
