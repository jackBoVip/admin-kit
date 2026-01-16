import type {
  FormState,
  GenericObject,
  ResetFormOpts,
  ValidationOptions,
} from 'vee-validate';

import type { ComponentPublicInstance } from 'vue';

import type { Recordable } from '@admin-core/shared/types';

import type { FormActions, FormSchema, AdminFormProps } from './types';

import { isRef, toRaw } from 'vue';

import { Store } from '@admin-core/shared/utils';
import {
  bindMethods,
  createMerge,
  formatDate,
  isDate,
  isDayjsObject,
  isFunction,
  isObject,
  mergeWithArrayOverride,
  StateHandler,
} from '@admin-core/shared/utils';

/**
 * 表单默认状态（保持现有默认值不变）
 *
 * @description
 * 用于 `FormApi` 初始化 store state 的兜底值。
 */
function getDefaultState(): AdminFormProps {
  return {
    actionWrapperClass: '',
    collapsed: false,
    collapsedRows: 1,
    collapseTriggerResize: false,
    commonConfig: {},
    handleReset: undefined,
    handleSubmit: undefined,
    handleValuesChange: undefined,
    handleCollapsedChange: undefined,
    layout: 'horizontal',
    resetButtonOptions: {},
    schema: [],
    scrollToFirstError: false,
    showCollapseButton: false,
    showDefaultActions: true,
    submitButtonOptions: {},
    submitOnChange: false,
    submitOnEnter: false,
    wrapperClass: 'grid-cols-1',
  };
}

export class FormApi {
  // private api: Pick<AdminFormProps, 'handleReset' | 'handleSubmit'>;
  public form = {} as FormActions;
  isMounted = false;

  public state: null | AdminFormProps = null;
  stateHandler: StateHandler;

  public store: Store<AdminFormProps>;

  /**
   * 组件实例映射
   */
  private componentRefMap: Map<string, unknown> = new Map();

  // 最后一次点击提交时的表单值
  private latestSubmissionValues: null | Recordable<any> = null;

  private prevState: null | AdminFormProps = null;

  /**
   * 创建表单 API
   *
   * @param options 初始表单配置（通常来自 `useAdminForm` 的参数或组件 props）
   */
  constructor(options: AdminFormProps = {}) {
    const { ...storeState } = options;

    const defaultState = getDefaultState();

    this.store = new Store<AdminFormProps>(
      {
        ...defaultState,
        ...storeState,
      },
      {
        onUpdate: () => {
          this.prevState = this.state;
          this.state = this.store.state;
          this.updateState();
        },
      },
    );

    this.state = this.store.state;
    this.stateHandler = new StateHandler();
    bindMethods(this);
  }

  /**
   * 获取字段组件实例
   * @param fieldName 字段名
   * @returns 组件实例
   */
  getFieldComponentRef<T = ComponentPublicInstance>(
    fieldName: string,
  ): T | undefined {
    let target = this.componentRefMap.has(fieldName)
      ? (this.componentRefMap.get(fieldName) as ComponentPublicInstance)
      : undefined;
    if (
      target &&
      target.$.type.name === 'AsyncComponentWrapper' &&
      target.$.subTree.ref
    ) {
      if (Array.isArray(target.$.subTree.ref)) {
        if (
          target.$.subTree.ref.length > 0 &&
          isRef(target.$.subTree.ref[0]?.r)
        ) {
          target = target.$.subTree.ref[0]?.r.value as ComponentPublicInstance;
        }
      } else if (isRef(target.$.subTree.ref.r)) {
        target = target.$.subTree.ref.r.value as ComponentPublicInstance;
      }
    }
    return target as T;
  }

  /**
   * 获取当前聚焦的字段，如果没有聚焦的字段则返回undefined
   *
   * @description
   * - 用于“自动滚动到聚焦项”“键盘交互”等场景
   * - SSR/Node 环境下会直接返回 `undefined`
   */
  getFocusedField() {
    // SSR/Node 环境下没有 document，直接返回
    if (typeof document === 'undefined') return undefined;

    for (const fieldName of this.componentRefMap.keys()) {
      const ref = this.getFieldComponentRef(fieldName);
      if (ref) {
        let el: HTMLElement | null = null;
        if (ref instanceof HTMLElement) {
          el = ref;
        } else if (ref.$el instanceof HTMLElement) {
          el = ref.$el;
        }
        if (!el) {
          continue;
        }
        if (
          el === document.activeElement ||
          el.contains(document.activeElement)
        ) {
          return fieldName;
        }
      }
    }
    return undefined;
  }

  getLatestSubmissionValues() {
    return this.latestSubmissionValues || {};
  }

  /**
   * 获取当前表单配置状态（store.state）
   *
   * @description
   * 这不是 vee-validate 的 values，而是 `AdminFormProps`（schema、布局、回调等配置）。
   */
  getState() {
    return this.state;
  }

  /**
   * 获取当前表单的 values（带时间字段处理）
   *
   * @description
   * - 返回值来自 vee-validate 的 `form.values`
   * - 会根据 `fieldMappingTime` 做 date/dayjs 的格式化/转换（保持现有行为）
   */
  async getValues<T = Recordable<any>>() {
    const form = await this.getForm();
    return (form.values ? this.handleRangeTimeValue(form.values) : {}) as T;
  }

  async isFieldValid(fieldName: string) {
    const form = await this.getForm();
    return form.isFieldValid(fieldName);
  }

  /**
   * 合并多个表单 API（链式）
   *
   * @description
   * 主要用于“多表单分块”的场景，把多个 `FormApi` 组合成一个代理对象。
   * 组合后可使用 `submitAllForm(needMerge?)` 统一校验/提交并返回合并后的值。
   *
   * @example
   * ```ts
   * const merged = api1.merge(api2).merge(api3)
   * const values = await merged.submitAllForm(true)
   * ```
   */
  merge(formApi: FormApi) {
    const chain = [this, formApi];
    const proxy = new Proxy(formApi, {
      get(target: any, prop: any) {
        if (prop === 'merge') {
          return (nextFormApi: FormApi) => {
            chain.push(nextFormApi);
            return proxy;
          };
        }
        if (prop === 'submitAllForm') {
          return async (needMerge: boolean = true) => {
            try {
              const results = await Promise.all(
                chain.map(async (api) => {
                  const validateResult = await api.validate();
                  if (!validateResult.valid) {
                    return;
                  }
                  const rawValues = toRaw((await api.getValues()) || {});
                  return rawValues;
                }),
              );
              if (needMerge) {
                const mergedResults = Object.assign({}, ...results);
                return mergedResults;
              }
              return results;
            } catch (error) {
              console.error('Validation error:', error);
            }
          };
        }
        return target[prop];
      },
    });

    return proxy;
  }

  /**
   * 挂载（由 `AdminUseForm` 在组件 mounted 时调用）
   *
   * @description
   * - 将 vee-validate 的 `FormActions` 绑定到 `this.form`
   * - 标记 `isMounted=true`，允许后续 API 调用
   * - 记录当前提交快照（latestSubmissionValues）
   *
   * 注意：这是内部生命周期方法，外部通常不需要手动调用。
   */
  mount(formActions: FormActions, componentRefMap: Map<string, unknown>) {
    if (!this.isMounted) {
      Object.assign(this.form, formActions);
      this.stateHandler.setConditionTrue();
      this.setLatestSubmissionValues({
        ...toRaw(this.handleRangeTimeValue(this.form.values)),
      });
      this.componentRefMap = componentRefMap;
      this.isMounted = true;
    }
  }

  /**
   * 根据字段名移除表单项
   * @param fields
   */
  async removeSchemaByFields(fields: string[]) {
    const fieldSet = new Set(fields);
    const schema = this.state?.schema ?? [];

    const filterSchema = schema.filter((item) => !fieldSet.has(item.fieldName));

    this.setState({
      schema: filterSchema,
    });
  }

  /**
   * 重置表单
   *
   * @description
   * 对 vee-validate 的 `resetForm` 的轻量封装。
   *
   * @param state 目标 state（values/errors/touched 等）
   * @param opts vee-validate reset 选项
   */
  async resetForm(
    state?: Partial<FormState<GenericObject>> | undefined,
    opts?: Partial<ResetFormOpts>,
  ) {
    const form = await this.getForm();
    return form.resetForm(state, opts);
  }

  /**
   * 清空校验错误（不改变 values）
   *
   * @description
   * 通过遍历 `form.errors` 并 setFieldError(undefined) 清空错误展示。
   */
  async resetValidate() {
    const form = await this.getForm();
    const fields = Object.keys(form.errors.value);
    fields.forEach((field) => {
      form.setFieldError(field, undefined);
    });
  }

  /**
   * 滚动到第一个错误字段
   * @param errors 验证错误对象
   */
  scrollToFirstError(errors: Record<string, any> | string) {
    // SSR/Node 环境下没有 document
    if (typeof document === 'undefined') return;

    // https://github.com/logaretm/vee-validate/discussions/3835
    const firstErrorFieldName =
      typeof errors === 'string' ? errors : Object.keys(errors)[0];

    if (!firstErrorFieldName) {
      return;
    }

    let el = document.querySelector(
      `[name="${firstErrorFieldName}"]`,
    ) as HTMLElement;

    // 如果通过 name 属性找不到，尝试通过组件引用查找, 正常情况下不会走到这，怕哪天 vee-validate 改了 name 属性有个兜底的
    if (!el) {
      const componentRef = this.getFieldComponentRef(firstErrorFieldName);
      if (componentRef && componentRef.$el instanceof HTMLElement) {
        el = componentRef.$el;
      }
    }

    if (el) {
      // 滚动到错误字段，添加一些偏移量以确保字段完全可见
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }

  /**
   * 设置单个字段值
   *
   * @param field 字段名（dot-path）
   * @param value 新值
   * @param shouldValidate 是否触发校验
   */
  async setFieldValue(field: string, value: any, shouldValidate?: boolean) {
    const form = await this.getForm();
    form.setFieldValue(field, value, shouldValidate);
  }

  /**
   * 设置最新一次提交快照（内部使用）
   *
   * @description
   * 用于后续对比/调试等场景（保持现有行为）。
   */
  setLatestSubmissionValues(values: null | Recordable<any>) {
    this.latestSubmissionValues = { ...toRaw(values) };
  }

  /**
   * 更新表单配置 state
   *
   * @description
   * - 支持传入部分 state
   * - 支持传入函数（基于 prev state 计算增量）
   * - 内部使用 `mergeWithArrayOverride` 合并（数组以新值覆盖旧值）
   */
  setState(
    stateOrFn:
      | ((prev: AdminFormProps) => Partial<AdminFormProps>)
      | Partial<AdminFormProps>,
  ) {
    if (isFunction(stateOrFn)) {
      this.store.setState((prev) => {
        return mergeWithArrayOverride(stateOrFn(prev), prev);
      });
    } else {
      this.store.setState((prev) => mergeWithArrayOverride(stateOrFn, prev));
    }
  }

  /**
   * 设置表单值
   * @param fields record
   * @param filterFields 过滤不在schema中定义的字段 默认为true
   * @param shouldValidate
   */
  async setValues(
    fields: Record<string, any>,
    filterFields: boolean = true,
    shouldValidate: boolean = false,
  ) {
    const form = await this.getForm();
    if (!filterFields) {
      form.setValues(fields, shouldValidate);
      return;
    }

    /**
     * 合并算法有待改进，目前的算法不支持object类型的值。
     * antd的日期时间相关组件的值类型为dayjs对象
     * element-plus的日期时间相关组件的值类型可能为Date对象
     * 以上两种类型需要排除深度合并
     */
    const fieldMergeFn = createMerge((obj, key, value) => {
      if (key in obj) {
        obj[key] =
          !Array.isArray(obj[key]) &&
          isObject(obj[key]) &&
          !isDayjsObject(obj[key]) &&
          !isDate(obj[key])
            ? fieldMergeFn(value, obj[key])
            : value;
      }
      return true;
    });
    const filteredFields = fieldMergeFn(fields, form.values);
    form.setValues(filteredFields, shouldValidate);
  }

  /**
   * 提交表单（并触发 handleSubmit 回调）
   *
   * @description
   * - 调用 vee-validate 的 `submitForm()`
   * - 获取处理后的 values（含时间字段映射/数组字段处理）
   * - 调用 `state.handleSubmit(values)`
   *
   * @returns 提交时的 values（raw）
   */
  async submitForm(e?: Event) {
    e?.preventDefault();
    e?.stopPropagation();
    const form = await this.getForm();
    await form.submitForm();
    const rawValues = toRaw(await this.getValues());
    await this.state?.handleSubmit?.(rawValues);

    return rawValues;
  }

  /**
   * 卸载/销毁（由 useAdminForm 组件卸载时调用）
   *
   * @description
   * - 重置 vee-validate form（清理 errors/touched 等）
   * - 清理内部标记与最新提交快照
   */
  unmount() {
    this.form?.resetForm?.();
    // this.state = null;
    this.latestSubmissionValues = null;
    this.isMounted = false;
    this.stateHandler.reset();
  }

  /**
   * 更新 schema（按 fieldName 对已有 schema 做增量合并）
   *
   * @description
   * - 传入数组必须都包含有效 `fieldName`
   * - 会把匹配 fieldName 的项与当前项做合并（数组覆盖）
   */
  updateSchema(schema: Partial<FormSchema>[]) {
    const updated: Partial<FormSchema>[] = [...schema];
    const hasField = updated.every(
      (item) => Reflect.has(item, 'fieldName') && item.fieldName,
    );

    if (!hasField) {
      console.error(
        'All items in the schema array must have a valid `fieldName` property to be updated',
      );
      return;
    }
    const currentSchema = [...(this.state?.schema ?? [])];

    const updatedMap: Record<string, any> = {};

    updated.forEach((item) => {
      if (item.fieldName) {
        updatedMap[item.fieldName] = item;
      }
    });

    currentSchema.forEach((schema, index) => {
      const updatedData = updatedMap[schema.fieldName];
      if (updatedData) {
        currentSchema[index] = mergeWithArrayOverride(
          updatedData,
          schema,
        ) as FormSchema;
      }
    });
    this.setState({ schema: currentSchema });
  }

  /**
   * 校验整个表单
   *
   * @description
   * - 返回 vee-validate 的 validateResult
   * - 如果开启 `scrollToFirstError`，会自动滚到第一个错误字段
   */
  async validate(opts?: Partial<ValidationOptions>) {
    const form = await this.getForm();

    const validateResult = await form.validate(opts);

    if (Object.keys(validateResult?.errors ?? {}).length > 0) {
      console.error('validate error', validateResult?.errors);

      if (this.state?.scrollToFirstError) {
        this.scrollToFirstError(validateResult.errors);
      }
    }
    return validateResult;
  }

  /**
   * 校验并提交（常用）
   *
   * @description
   * - 先 validate
   * - valid 才 submit
   * - 若开启 `scrollToFirstError`，invalid 时自动滚动
   */
  async validateAndSubmitForm() {
    const form = await this.getForm();
    const { valid, errors } = await form.validate();
    if (!valid) {
      if (this.state?.scrollToFirstError) {
        this.scrollToFirstError(errors);
      }
      return;
    }
    return await this.submitForm();
  }

  /**
   * 校验单个字段
   *
   * @description
   * - invalid 且开启 `scrollToFirstError` 时，会滚动到该字段
   */
  async validateField(fieldName: string, opts?: Partial<ValidationOptions>) {
    const form = await this.getForm();
    const validateResult = await form.validateField(fieldName, opts);

    if (Object.keys(validateResult?.errors ?? {}).length > 0) {
      console.error('validate error', validateResult?.errors);

      if (this.state?.scrollToFirstError) {
        this.scrollToFirstError(fieldName);
      }
    }
    return validateResult;
  }

  private async getForm() {
    if (!this.isMounted) {
      // 等待form挂载
      await this.stateHandler.waitForCondition();
    }
    if (!this.form?.meta) {
      throw new Error('<AdminForm /> is not mounted');
    }
    return this.form;
  }

  private handleMultiFields = (originValues: Record<string, any>) => {
    const arrayToStringFields = this.state?.arrayToStringFields;
    if (!arrayToStringFields || !Array.isArray(arrayToStringFields)) {
      return;
    }

    const processFields = (fields: string[], separator: string = ',') => {
      this.processFields(fields, separator, originValues, (value, sep) => {
        if (Array.isArray(value)) {
          return value.join(sep);
        } else if (typeof value === 'string') {
          // 处理空字符串的情况
          if (value === '') {
            return [];
          }
          // 处理复杂分隔符的情况
          const escapedSeparator = sep.replaceAll(
            /[.*+?^${}()|[\]\\]/g,
            String.raw`\$&`,
          );
          return value.split(new RegExp(escapedSeparator));
        } else {
          return value;
        }
      });
    };

    // 处理简单数组格式 ['field1', 'field2', ';'] 或 ['field1', 'field2']
    if (arrayToStringFields.every((item) => typeof item === 'string')) {
      const lastItem =
        arrayToStringFields[arrayToStringFields.length - 1] || '';
      const fields =
        lastItem.length === 1
          ? arrayToStringFields.slice(0, -1)
          : arrayToStringFields;
      const separator = lastItem.length === 1 ? lastItem : ',';
      processFields(fields, separator);
      return;
    }

    // 处理嵌套数组格式 [['field1'], ';']
    arrayToStringFields.forEach((fieldConfig) => {
      if (Array.isArray(fieldConfig)) {
        const [fields, separator = ','] = fieldConfig;
        // 根据类型定义，fields 应该始终是字符串数组
        if (!Array.isArray(fields)) {
          console.warn(
            `Invalid field configuration: fields should be an array of strings, got ${typeof fields}`,
          );
          return;
        }
        processFields(fields, separator);
      }
    });
  };

  private handleRangeTimeValue = (originValues: Record<string, any>) => {
    const values = { ...originValues };
    const fieldMappingTime = this.state?.fieldMappingTime;

    this.handleMultiFields(values);
    if (!fieldMappingTime || !Array.isArray(fieldMappingTime)) {
      return values;
    }

    fieldMappingTime.forEach(
      ([field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD']) => {
        if (startTimeKey && endTimeKey && values[field] === null) {
          Reflect.deleteProperty(values, startTimeKey);
          Reflect.deleteProperty(values, endTimeKey);
          // delete values[startTimeKey];
          // delete values[endTimeKey];
        }

        if (!values[field]) {
          Reflect.deleteProperty(values, field);
          // delete values[field];
          return;
        }

        const [startTime, endTime] = values[field];
        if (format === null) {
          values[startTimeKey] = startTime;
          values[endTimeKey] = endTime;
        } else if (isFunction(format)) {
          values[startTimeKey] = format(startTime, startTimeKey);
          values[endTimeKey] = format(endTime, endTimeKey);
        } else {
          const [startTimeFormat, endTimeFormat] = Array.isArray(format)
            ? format
            : [format, format];

          values[startTimeKey] = startTime
            ? formatDate(startTime, startTimeFormat)
            : undefined;
          values[endTimeKey] = endTime
            ? formatDate(endTime, endTimeFormat)
            : undefined;
        }
        // delete values[field];
        Reflect.deleteProperty(values, field);
      },
    );
    return values;
  };

  private processFields = (
    fields: string[],
    separator: string,
    originValues: Record<string, any>,
    transformFn: (value: any, separator: string) => any,
  ) => {
    fields.forEach((field) => {
      const value = originValues[field];
      if (value === undefined || value === null) {
        return;
      }
      originValues[field] = transformFn(value, separator);
    });
  };

  private updateState() {
    const currentSchema = this.state?.schema ?? [];
    const prevSchema = this.prevState?.schema ?? [];
    // 进行了删除schema操作
    if (currentSchema.length < prevSchema.length) {
      const currentFields = new Set(
        currentSchema.map((item) => item.fieldName),
      );
      const deletedSchema = prevSchema.filter(
        (item) => !currentFields.has(item.fieldName),
      );
      for (const schema of deletedSchema) {
        this.form?.setFieldValue?.(schema.fieldName, undefined);
      }
    }
  }
}
