import type { FieldOptions, FormContext, GenericObject } from 'vee-validate';
import type { ZodTypeAny } from 'zod';

import type { Component, HtmlHTMLAttributes, Ref } from 'vue';

import type { AdminButtonProps } from '@admin-core/ui';
import type { ClassType, MaybeComputedRef } from '@admin-core/shared/types';

import type { FormApi } from './form-api';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

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
  /** 默认值 */
  default?: any;
  /** 字段名 */
  fieldName: string;
  /** 是否必填 */
  required?: boolean;
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
  componentProps?: FormItemDependenciesConditionWithProps | undefined;
  /**
   * 是否禁用
   * @returns 是否禁用
   */
  disabled?: (boolean | FormItemDependenciesCondition) | undefined;
  /**
   * 是否渲染（删除dom）
   * @returns 是否渲染
   */
  if?: (boolean | FormItemDependenciesCondition) | undefined;
  /**
   * 是否必填
   * @returns 是否必填
   */
  required?: FormItemDependenciesCondition | undefined;
  /**
   * 字段规则
   */
  rules?: FormItemDependenciesConditionWithRules | undefined;
  /**
   * 是否隐藏(Css)
   * @returns 是否隐藏
   */
  show?: (boolean | FormItemDependenciesCondition) | undefined;
  /**
   * 任意触发都会执行
   */
  trigger?: FormItemDependenciesCondition<void> | undefined;
  /**
   * 触发字段
   */
  triggerFields: string[];
}

export type ComponentProps =
  | ((
      value: Partial<Record<string, any>>,
      actions: FormActions,
    ) => MaybeComponentProps)
  | MaybeComponentProps;

export interface FormCommonConfig {
  /**
   * 在Label后显示一个冒号
   */
  colon?: boolean | undefined;
  /**
   * 所有表单项的props
   */
  componentProps?: ComponentProps | undefined;
  /**
   * 所有表单项的控件样式
   */
  controlClass?: string | undefined;
  /**
   * 所有表单项的禁用状态
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * 是否禁用所有表单项的change事件监听
   * @default true
   */
  disabledOnChangeListener?: boolean | undefined;
  /**
   * 是否禁用所有表单项的input事件监听
   * @default true
   */
  disabledOnInputListener?: boolean | undefined;
  /**
   * 所有表单项的空状态值,默认都是undefined，naive-ui的空状态值是null
   */
  emptyStateValue?: null | undefined;
  /**
   * 所有表单项的控件样式
   * @default {}
   */
  formFieldProps?: FormFieldOptions | undefined;
  /**
   * 所有表单项的栅格布局，支持函数形式
   * @default ""
   */
  formItemClass?: ((() => string) | string) | undefined;
  /**
   * 隐藏所有表单项label
   * @default false
   */
  hideLabel?: boolean | undefined;
  /**
   * 是否隐藏必填标记
   * @default false
   */
  hideRequiredMark?: boolean | undefined;
  /**
   * 所有表单项的label样式
   * @default ""
   */
  labelClass?: string | undefined;
  /**
   * 所有表单项的label宽度
   */
  labelWidth?: number | undefined;
  /**
   * 所有表单项的model属性名
   * @default "modelValue"
   */
  modelPropName?: string | undefined;
  /**
   * 所有表单项的wrapper样式
   */
  wrapperClass?: string | undefined;
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
  /** 组件 */
  component: Component | T;
  /** 组件参数 */
  componentProps?: ComponentProps;
  /** 默认值 */
  defaultValue?: any | undefined;
  /** 依赖 */
  dependencies?: FormItemDependencies | undefined;
  /** 描述 */
  description?: CustomRenderType | undefined;
  /** 字段名 */
  fieldName: string;
  /** 帮助信息 */
  help?: CustomRenderType | undefined;
  /** 是否隐藏表单项 */
  hide?: boolean | undefined;
  /** 表单项 */
  label?: CustomRenderType | undefined;
  // 自定义组件内部渲染
  renderComponentContent?: RenderComponentContentType | undefined;
  /** 字段规则 */
  rules?: FormSchemaRuleType | undefined;
  /** 后缀 */
  suffix?: CustomRenderType | undefined;
}

export interface FormFieldProps extends FormSchema {
  required?: boolean | undefined;
}

export interface FormRenderProps<
  T extends BaseFormComponentType = BaseFormComponentType,
> {
  /**
   * 表单字段数组映射字符串配置 默认使用","
   */
  arrayToStringFields?: ArrayToStringFields | undefined;
  /**
   * 是否折叠，在showCollapseButton=true下生效
   * true:折叠 false:展开
   */
  collapsed?: boolean | undefined;
  /**
   * 折叠时保持行数
   * @default 1
   */
  collapsedRows?: number | undefined;
  /**
   * 是否触发resize事件
   * @default false
   */
  collapseTriggerResize?: boolean | undefined;
  /**
   * 表单项通用后备配置，当子项目没配置时使用这里的配置，子项目配置优先级高于此配置
   */
  commonConfig?: FormCommonConfig | undefined;
  /**
   * 紧凑模式（移除表单每一项底部为校验信息预留的空间）
   */
  compact?: boolean | undefined;
  /**
   * 组件v-model事件绑定
   */
  componentBindEventMap?: Partial<Record<BaseFormComponentType, string>> | undefined;
  /**
   * 组件集合
   */
  componentMap: Record<BaseFormComponentType, Component>;
  /**
   * 表单字段映射到时间格式
   */
  fieldMappingTime?: FieldMappingTime | undefined;
  /**
   * 表单实例
   */
  form?: FormContext<GenericObject> | undefined;
  /**
   * 表单项布局
   */
  layout?: FormLayout | undefined;
  /**
   * 表单定义
   */
  schema?: FormSchema<T>[] | undefined;

  /**
   * 是否显示展开/折叠
   */
  showCollapseButton?: boolean | undefined;
  /**
   * 格式化日期
   */

  /**
   * 表单栅格布局
   * @default "grid-cols-1"
   */
  wrapperClass?: WrapperClassType | undefined;
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
   * 操作按钮是否反转（提交按钮前置）
   */
  actionButtonsReverse?: boolean;
  /**
   * 操作按钮组的样式
   * newLine: 在新行显示。rowEnd: 在行内显示，靠右对齐（默认）。inline: 使用grid默认样式
   */
  actionLayout?: 'inline' | 'newLine' | 'rowEnd' | undefined;
  /**
   * 操作按钮组显示位置，默认靠右显示
   */
  actionPosition?: 'center' | 'left' | 'right' | undefined;
  /**
   * 表单操作区域class
   */
  actionWrapperClass?: ClassType | undefined;
  /**
   * 表单字段数组映射字符串配置 默认使用","
   */
  arrayToStringFields?: ArrayToStringFields | undefined;

  /**
   * 表单字段映射
   */
  fieldMappingTime?: FieldMappingTime | undefined;
  /**
   * 表单收起展开状态变化回调
   */
  handleCollapsedChange?: ((collapsed: boolean) => void) | undefined;
  /**
   * 表单重置回调
   */
  handleReset?: HandleResetFn | undefined;
  /**
   * 表单提交回调
   */
  handleSubmit?: HandleSubmitFn | undefined;
  /**
   * 表单值变化回调
   */
  handleValuesChange?: ((
    values: Record<string, any>,
    fieldsChanged: string[],
  ) => void) | undefined;
  /**
   * 重置按钮参数
   */
  resetButtonOptions?: ActionButtonOptions | undefined;

  /**
   * 验证失败时是否自动滚动到第一个错误字段
   * @default false
   */
  scrollToFirstError?: boolean | undefined;

  /**
   * 是否显示默认操作按钮
   * @default true
   */
  showDefaultActions?: boolean | undefined;

  /**
   * 提交按钮参数
   */
  submitButtonOptions?: ActionButtonOptions | undefined;

  /**
   * 是否在字段值改变时提交表单
   * @default false
   */
  submitOnChange?: boolean | undefined;

  /**
   * 是否在回车时提交表单
   * @default false
   */
  submitOnEnter?: boolean | undefined;
}

export type ExtendedFormApi = FormApi & {
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
    modelPropNameMap?: Partial<Record<T, string>>;
  } | undefined;
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
  } | undefined;
}
