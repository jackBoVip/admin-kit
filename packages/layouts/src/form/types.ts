import type { FieldOptions, FormContext, GenericObject } from 'vee-validate';
import type { ZodTypeAny } from 'zod';

import type { Component, HtmlHTMLAttributes, Ref } from 'vue';

import type { AdminButtonProps } from '@admin-core/ui';
import type { ClassType, MaybeComputedRef } from '@admin-core/shared/types';

import type { FormApi } from './form-api';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

/**
 * 表单组件类型标识
 *
 * @description
 * 用于 `FormSchema.component` 指定渲染组件。内置提供若干基础组件名，
 * 也允许你传入任意字符串（用于自定义组件映射）。
 */
export type BaseFormComponentType =
  | 'DefaultButton'
  | 'PrimaryButton'
  | 'AdminCheckbox'
  | 'AdminInput'
  | 'AdminInputPassword'
  | 'AdminPinInput'
  | 'AdminSelect'
  | (Record<never, never> & string);

type Breakpoints = '2xl:' | '3xl:' | '' | 'lg:' | 'md:' | 'sm:' | 'xl:';

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type WrapperClassType =
  | `${Breakpoints}grid-cols-${GridCols}`
  | (Record<never, never> & string);

export type FormItemClassType =
  | `${Breakpoints}cols-end-${'auto' | GridCols}`
  | `${Breakpoints}cols-span-${'auto' | 'full' | GridCols}`
  | `${Breakpoints}cols-start-${'auto' | GridCols}`
  | (Record<never, never> & string)
  | WrapperClassType;

export type FormFieldOptions = Partial<
  FieldOptions & {
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    validateOnInput?: boolean;
    validateOnModelUpdate?: boolean;
  }
>;

export interface FormShape {
  /** 默认值（生成 initialValues 时优先级最高） */
  default?: any;
  /** 字段名（支持 dot-path，如 `user.name`） */
  fieldName: string;
  /** 是否必填 */
  required?: boolean;
  /**
   * 校验规则
   *
   * @description
   * 推荐使用 `zod` schema（同时支持一些字符串规则/内置规则名）
   */
  rules?: ZodTypeAny;
}

export type MaybeComponentPropKey =
  | 'options'
  | 'placeholder'
  | 'title'
  | keyof HtmlHTMLAttributes
  | (Record<never, never> & string);

export type MaybeComponentProps = { [K in MaybeComponentPropKey]?: any };

export type FormActions = FormContext<GenericObject>;

export type CustomRenderType = (() => Component | string) | string;

export type FormSchemaRuleType =
  | 'required'
  | 'selectRequired'
  | null
  | (Record<never, never> & string)
  | ZodTypeAny;

type FormItemDependenciesCondition<T = boolean | PromiseLike<boolean>> = (
  value: Partial<Record<string, any>>,
  actions: FormActions,
) => T;

type FormItemDependenciesConditionWithRules = (
  value: Partial<Record<string, any>>,
  actions: FormActions,
) => FormSchemaRuleType | PromiseLike<FormSchemaRuleType>;

type FormItemDependenciesConditionWithProps = (
  value: Partial<Record<string, any>>,
  actions: FormActions,
) => MaybeComponentProps | PromiseLike<MaybeComponentProps>;

export interface FormItemDependencies {
  /**
   * 组件参数
   * @returns 组件参数
   */
  componentProps?: FormItemDependenciesConditionWithProps;
  /**
   * 是否禁用
   * @returns 是否禁用
   */
  disabled?: boolean | FormItemDependenciesCondition;
  /**
   * 是否渲染（删除dom）
   * @returns 是否渲染
   */
  if?: boolean | FormItemDependenciesCondition;
  /**
   * 是否必填
   * @returns 是否必填
   */
  required?: FormItemDependenciesCondition;
  /**
   * 字段规则
   */
  rules?: FormItemDependenciesConditionWithRules;
  /**
   * 是否隐藏(Css)
   * @returns 是否隐藏
   */
  show?: boolean | FormItemDependenciesCondition;
  /**
   * 任意触发都会执行
   */
  trigger?: FormItemDependenciesCondition<void>;
  /**
   * 触发字段
   */
  triggerFields: string[];
}

/**
 * 表单 Schema
 *
 * @description
 * 描述单个字段的渲染、校验、联动、布局等信息。
 * 本文件类型较多，建议结合 demo 理解字段配置项。
 */

type ComponentProps =
  | ((
      value: Partial<Record<string, any>>,
      actions: FormActions,
    ) => MaybeComponentProps)
  | MaybeComponentProps;

export interface FormCommonConfig {
  /**
   * 在Label后显示一个冒号
   */
  colon?: boolean;
  /**
   * 所有表单项的props
   */
  componentProps?: ComponentProps;
  /**
   * 所有表单项的控件样式
   */
  controlClass?: string;
  /**
   * 所有表单项的禁用状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否禁用所有表单项的change事件监听
   * @default true
   */
  disabledOnChangeListener?: boolean;
  /**
   * 是否禁用所有表单项的input事件监听
   * @default true
   */
  disabledOnInputListener?: boolean;
  /**
   * 所有表单项的空状态值,默认都是undefined，naive-ui的空状态值是null
   */
  emptyStateValue?: null | undefined;
  /**
   * handleValuesChange 的 values 载荷策略
   *
   * @description
   * - `deep`：全量深拷贝（默认，兼容现有行为，开销最大但语义最安全）
   * - `shallow`：全量浅拷贝（顶层新对象，嵌套仍共享引用，开销较小）
   * - `patch`：仅包含变更字段路径的最小对象片段（开销最小，但 values 不再是“全量快照”）
   *
   * @default 'deep'
   */
  valuesChangePayload?: 'deep' | 'shallow' | 'patch';
  /**
   * 所有表单项的控件样式
   * @default {}
   */
  formFieldProps?: FormFieldOptions;
  /**
   * 所有表单项的栅格布局，支持函数形式
   * @default ""
   */
  formItemClass?: (() => string) | string;
  /**
   * 隐藏所有表单项label
   * @default false
   */
  hideLabel?: boolean;
  /**
   * 是否隐藏必填标记
   * @default false
   */
  hideRequiredMark?: boolean;
  /**
   * 所有表单项的label样式
   * @default ""
   */
  labelClass?: string;
  /**
   * 所有表单项的label宽度
   */
  labelWidth?: number;
  /**
   * 所有表单项的model属性名
   * @default "modelValue"
   */
  modelPropName?: string;
  /**
   * 所有表单项的wrapper样式
   */
  wrapperClass?: string;
}

type RenderComponentContentType = (
  value: Partial<Record<string, any>>,
  api: FormActions,
) => Record<string, any>;

export type HandleSubmitFn = (
  values: Record<string, any>,
) => Promise<void> | void;

export type HandleResetFn = (
  values: Record<string, any>,
) => Promise<void> | void;

export type FieldMappingTime = [
  string,
  [string, string],
  (
    | ((value: any, fieldName: string) => any)
    | [string, string]
    | null
    | string
  )?,
][];

export type ArrayToStringFields = Array<
  | [string[], string?] // 嵌套数组格式，可选分隔符
  | string // 单个字段，使用默认分隔符
  | string[] // 简单数组格式，最后一个元素可以是分隔符
>;

export interface FormSchema<
  T extends BaseFormComponentType = BaseFormComponentType,
> extends FormCommonConfig {
  /**
   * 字段渲染组件
   *
   * @description
   * - 传字符串：从 `COMPONENT_MAP` 中按 key 查找
   * - 传组件：直接渲染该组件
   */
  component: Component | T;
  /**
   * 组件参数
   *
   * @description
   * 支持对象或函数（函数可拿到当前表单值与 formApi，用于动态 props）
   */
  componentProps?: ComponentProps;
  /**
   * 默认值（优先级高于 zod 推导）
   *
   * @description
   * 在 `useFormInitial` 中会优先使用该默认值来生成 initialValues
   */
  defaultValue?: any;
  /**
   * 字段依赖联动
   *
   * @description
   * 用于 show/if/disabled/required/rules/componentProps 等联动逻辑
   */
  dependencies?: FormItemDependencies;
  /** 描述（支持 slot/组件/文本/函数） */
  description?: CustomRenderType;
  /** 字段名（支持 dot-path，如 `user.name`） */
  fieldName: string;
  /** 帮助信息（提示） */
  help?: CustomRenderType;
  /** 是否隐藏表单项（不渲染 DOM） */
  hide?: boolean;
  /** 表单项标题 */
  label?: CustomRenderType;
  // 自定义组件内部渲染
  renderComponentContent?: RenderComponentContentType;
  /**
   * 字段规则
   *
   * @description
   * 推荐 zod schema：例如 `z.string().min(1, '必填')`
   */
  rules?: FormSchemaRuleType;
  /** 后缀内容 */
  suffix?: CustomRenderType;
}

export interface FormFieldProps extends FormSchema {
  required?: boolean;
}

export interface FormRenderProps<
  T extends BaseFormComponentType = BaseFormComponentType,
> {
  /**
   * 表单字段数组映射字符串配置 默认使用","
   */
  arrayToStringFields?: ArrayToStringFields;
  /**
   * 是否折叠，在showCollapseButton=true下生效
   * true:折叠 false:展开
   */
  collapsed?: boolean;
  /**
   * 折叠时保持行数
   * @default 1
   */
  collapsedRows?: number;
  /**
   * 是否触发resize事件
   * @default false
   */
  collapseTriggerResize?: boolean;
  /**
   * 表单项通用后备配置，当子项目没配置时使用这里的配置，子项目配置优先级高于此配置
   */
  commonConfig?: FormCommonConfig;
  /**
   * 紧凑模式（移除表单每一项底部为校验信息预留的空间）
   */
  compact?: boolean;
  /**
   * 组件v-model事件绑定
   */
  componentBindEventMap?: Partial<Record<BaseFormComponentType, string>>;
  /**
   * 组件集合
   */
  componentMap: Record<BaseFormComponentType, Component>;
  /**
   * 表单字段映射到时间格式
   */
  fieldMappingTime?: FieldMappingTime;
  /**
   * 表单实例
   */
  form?: FormContext<GenericObject>;
  /**
   * 表单项布局
   */
  layout?: FormLayout;
  /**
   * 表单定义
   */
  schema?: FormSchema<T>[];

  /**
   * 是否显示展开/折叠
   */
  showCollapseButton?: boolean;
  /**
   * 格式化日期
   */

  /**
   * 表单栅格布局
   * @default "grid-cols-1"
   */
  wrapperClass?: WrapperClassType;
}

export interface ActionButtonOptions extends AdminButtonProps {
  [key: string]: any;
  content?: MaybeComputedRef<string>;
  show?: boolean;
}

export interface AdminFormProps<
  T extends BaseFormComponentType = BaseFormComponentType,
> extends Omit<
    FormRenderProps<T>,
    'componentBindEventMap' | 'componentMap' | 'form'
  > {
  /**
   * 表单属性（对外主入口）
   *
   * @description
   * 该类型同时用于：
   * - `useAdminForm(options)` 的 options
   * - `<AdminUseForm v-bind="..." />` 的 props
   */
  /**
   * 操作按钮是否反转（提交按钮前置）
   */
  actionButtonsReverse?: boolean;
  /**
   * 操作按钮组的样式
   * newLine: 在新行显示。rowEnd: 在行内显示，靠右对齐（默认）。inline: 使用grid默认样式
   */
  actionLayout?: 'inline' | 'newLine' | 'rowEnd';
  /**
   * 操作按钮组显示位置，默认靠右显示
   */
  actionPosition?: 'center' | 'left' | 'right';
  /**
   * 表单操作区域class
   */
  actionWrapperClass?: ClassType;
  /**
   * 表单字段数组映射字符串配置 默认使用","
   */
  arrayToStringFields?: ArrayToStringFields;

  /**
   * 表单字段映射
   */
  fieldMappingTime?: FieldMappingTime;
  /**
   * 表单收起展开状态变化回调
   */
  handleCollapsedChange?: (collapsed: boolean) => void;
  /**
   * 表单重置回调
   */
  handleReset?: HandleResetFn;
  /**
   * 表单提交回调
   */
  handleSubmit?: HandleSubmitFn;
  /**
   * 表单值变化回调
   *
   * @description
   * - `values` 的形态可通过 `commonConfig.valuesChangePayload` 配置（deep/shallow/patch）
   * - `fieldsChanged` 为 dot-path 数组，例如 `['user.name', 'age']`
   */
  handleValuesChange?: (
    values: Record<string, any>,
    fieldsChanged: string[],
  ) => void;
  /**
   * 重置按钮参数
   */
  resetButtonOptions?: ActionButtonOptions;

  /**
   * 验证失败时是否自动滚动到第一个错误字段
   * @default false
   */
  scrollToFirstError?: boolean;

  /**
   * 是否显示默认操作按钮
   * @default true
   */
  showDefaultActions?: boolean;

  /**
   * 提交按钮参数
   */
  submitButtonOptions?: ActionButtonOptions;

  /**
   * 是否在字段值改变时提交表单
   * @default false
   */
  submitOnChange?: boolean;

  /**
   * 是否在回车时提交表单
   * @default false
   */
  submitOnEnter?: boolean;
}

export type ExtendedFormApi = FormApi & {
  /**
   * 订阅表单配置 state（基于 @tanstack/store）
   *
   * @description
   * 主要用于在 `AdminUseForm` 中把 props 与 formApi state 融合到一起，
   * 外部也可用它来订阅 schema/配置变化（用于开发调试或高级联动）。
   */
  useStore: <T = NoInfer<AdminFormProps>>(
    selector?: (state: NoInfer<AdminFormProps>) => T,
  ) => Readonly<Ref<T>>;
};

export interface AdminFormAdapterOptions<
  T extends BaseFormComponentType = BaseFormComponentType,
> {
  config?: {
    baseModelPropName?: string;
    disabledOnChangeListener?: boolean;
    disabledOnInputListener?: boolean;
    emptyStateValue?: null | undefined;
    valuesChangePayload?: 'deep' | 'shallow' | 'patch';
    modelPropNameMap?: Partial<Record<T, string>>;
  };
  defineRules?: {
    required?: (
      value: any,
      params: any,
      ctx: Record<string, any>,
    ) => boolean | string;
    selectRequired?: (
      value: any,
      params: any,
      ctx: Record<string, any>,
    ) => boolean | string;
  };
}
