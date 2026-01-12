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

import type { Store } from '@admin-core/shared/utils';
import {
  bindMethods,
  createStore,
  deepMerge,
  formatDate,
  isDate,
  isFunction,
  isObject,
} from '@admin-core/shared/utils';

/**
 * 获取默认表单状态
 * @returns 默认的表单配置
 */
function getDefaultState(): Partial<AdminFormProps> {
  return {
    actionWrapperClass: '',
    collapsed: false,
    collapsedRows: 1,
    collapseTriggerResize: false,
    commonConfig: {},
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

/**
 * 表单 API 类
 * @description 提供表单的核心功能，包括状态管理、验证、提交等
 * @example
 * ```typescript
 * const api = new FormApi({
 *   schema: [
 *     {
 *       component: 'AdminInput',
 *       fieldName: 'username',
 *       label: '用户名',
 *     }
 *   ]
 * })
 * 
 * // 设置字段值
 * await api.setFieldValue('username', 'admin')
 * 
 * // 验证表单
 * const result = await api.validate()
 * 
 * // 提交表单
 * await api.submitForm()
 * ```
 */
export class FormApi {
  // private api: Pick<AdminFormProps, 'handleReset' | 'handleSubmit'>;
  public form = {} as FormActions;
  isMounted = false;

  public state: null | AdminFormProps = null;
  private mountedPromise: Promise<void>;
  private resolveMounted!: () => void;

  public store: Store<AdminFormProps>;

  /**
   * 组件实例映射
   */
  private componentRefMap: Map<string, unknown> = new Map();

  // 最后一次点击提交时的表单值
  private latestSubmissionValues: null | Recordable<any> = null;

  private prevState: null | AdminFormProps = null;

  constructor(options: AdminFormProps = {}) {
    const { ...storeState } = options;

    const defaultState = getDefaultState();

    this.store = createStore<AdminFormProps>(
      {
        ...defaultState,
        ...storeState,
      },
    );

    // 添加 onUpdate 监听器
    this.store.subscribe(() => {
      this.prevState = this.state;
      this.state = this.store.getState();
      this.updateState();
    });

    this.state = this.store.getState();
    
    // 创建挂载等待 Promise
    this.mountedPromise = new Promise((resolve) => {
      this.resolveMounted = resolve;
    });
    
    bindMethods(this);
  }

  /**
   * 获取字段组件实例
   * @param fieldName - 字段名
   * @returns 组件实例
   */
  getFieldComponentRef<T = ComponentPublicInstance>(
    fieldName: string,
  ): T | undefined {
    const target = this.componentRefMap.get(fieldName) as ComponentPublicInstance | undefined;
    
    if (!target) return undefined;
    
    // 处理异步组件包装器
    if (target.$.type.name === 'AsyncComponentWrapper' && target.$.subTree.ref) {
      const { ref } = target.$.subTree;
      
      if (Array.isArray(ref)) {
        return ref[0]?.r && isRef(ref[0].r) 
          ? ref[0].r.value as T 
          : undefined;
      }
      
      return ref.r && isRef(ref.r) 
        ? ref.r.value as T 
        : undefined;
    }
    
    return target as T;
  }

  /**
   * 获取当前聚焦的字段
   * @returns 聚焦的字段名，如果没有则返回 undefined
   */
  getFocusedField(): string | undefined {
    for (const fieldName of this.componentRefMap.keys()) {
      const ref = this.getFieldComponentRef(fieldName);
      if (!ref) continue;
      
      const el = ref instanceof HTMLElement 
        ? ref 
        : ref.$el instanceof HTMLElement 
          ? ref.$el 
          : null;
      
      if (el && (el === document.activeElement || el.contains(document.activeElement))) {
        return fieldName;
      }
    }
    
    return undefined;
  }

  /**
   * 获取最后一次提交的表单值
   * @returns 最后一次提交的值对象
   */
  getLatestSubmissionValues(): Recordable<any> {
    return this.latestSubmissionValues ?? {};
  }

  /**
   * 获取当前表单状态
   * @returns 表单状态对象
   */
  getState(): AdminFormProps | null {
    return this.state;
  }

  /**
   * 获取表单所有值
   * @template T - 返回值类型
   * @returns 处理后的表单值
   */
  async getValues<T = Recordable<any>>(): Promise<T> {
    const form = await this.getForm();
    return (form.values ? this.handleRangeTimeValue(form.values) : {}) as T;
  }

  /**
   * 检查字段是否有效
   * @param fieldName - 字段名
   * @returns 字段是否有效
   */
  async isFieldValid(fieldName: string): Promise<boolean> {
    const form = await this.getForm();
    return form.isFieldValid(fieldName);
  }

  /**
   * 合并多个表单 API
   * @param formApi - 要合并的表单 API
   * @returns 代理对象，支持链式调用
   */
  merge(formApi: FormApi): FormApi {
    const chain = [this, formApi];
    
    return new Proxy(formApi, {
      get(target, prop) {
        if (prop === 'merge') {
          return (nextFormApi: FormApi) => {
            chain.push(nextFormApi);
            return this;
          };
        }
        
        if (prop === 'submitAllForm') {
          return async (needMerge = true) => {
            try {
              const results = await Promise.all(
                chain.map(async (api) => {
                  const { valid } = await api.validate();
                  if (!valid) return undefined;
                  
                  return toRaw(await api.getValues() ?? {});
                })
              );
              
              const validResults = results.filter(Boolean);
              
              return needMerge 
                ? Object.assign({}, ...validResults)
                : validResults;
            } catch (error) {
              console.error('Validation error:', error);
              throw error;
            }
          };
        }
        
        return Reflect.get(target, prop);
      },
    });
  }

  /**
   * 挂载表单
   * @param formActions - 表单操作对象
   * @param componentRefMap - 组件引用映射
   */
  mount(formActions: FormActions, componentRefMap: Map<string, unknown>): void {
    if (this.isMounted) return;
    
    Object.assign(this.form, formActions);
    
    this.resolveMounted();
    this.setLatestSubmissionValues(toRaw(this.handleRangeTimeValue(this.form.values)));
    this.componentRefMap = componentRefMap;
    this.isMounted = true;
  }

  /**
   * 根据字段名移除表单项
   * @param fields - 要移除的字段名数组
   */
  async removeSchemaByFields(fields: string[]): Promise<void> {
    const fieldSet = new Set(fields);
    const schema = this.state?.schema ?? [];

    const filterSchema = schema.filter((item) => !fieldSet.has(item.fieldName));

    this.setState({ schema: filterSchema });
  }

  /**
   * 重置表单
   * @param state - 要重置的状态
   * @param opts - 重置选项
   */
  async resetForm(
    state?: Partial<FormState<GenericObject>>,
    opts?: Partial<ResetFormOpts>,
  ): Promise<void> {
    const form = await this.getForm();
    return form.resetForm(state, opts);
  }

  /**
   * 重置验证状态
   */
  async resetValidate(): Promise<void> {
    const form = await this.getForm();
    const fields = Object.keys(form.errors.value);
    
    for (const field of fields) {
      form.setFieldError(field, undefined);
    }
  }

  /**
   * 滚动到第一个错误字段
   * @param errors - 验证错误对象或字段名
   */
  scrollToFirstError(errors: Record<string, any> | string): void {
    const firstErrorFieldName = typeof errors === 'string' 
      ? errors 
      : Object.keys(errors)[0];

    if (!firstErrorFieldName) return;

    // 尝试通过 name 属性查找元素
    let el = document.querySelector<HTMLElement>(`[name="${firstErrorFieldName}"]`);

    // 如果找不到，尝试通过组件引用查找
    if (!el) {
      const componentRef = this.getFieldComponentRef(firstErrorFieldName);
      el = componentRef?.$el instanceof HTMLElement ? componentRef.$el : null;
    }

    // 滚动到错误字段
    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }

  /**
   * 设置字段值
   * @param field - 字段名
   * @param value - 字段值
   * @param shouldValidate - 是否触发验证
   */
  async setFieldValue(field: string, value: any, shouldValidate?: boolean): Promise<void> {
    const form = await this.getForm();
    form.setFieldValue(field, value, shouldValidate);
  }

  /**
   * 设置最后一次提交的值
   * @param values - 表单值
   */
  setLatestSubmissionValues(values: Recordable<any> | null): void {
    this.latestSubmissionValues = values ? structuredClone(toRaw(values)) : null;
  }

  /**
   * 设置表单状态
   * @param stateOrFn - 状态对象或状态更新函数
   */
  setState(
    stateOrFn:
      | ((prev: AdminFormProps) => Partial<AdminFormProps>)
      | Partial<AdminFormProps>,
  ): void {
    this.store.setState((prev) => {
      const partial = isFunction(stateOrFn) ? stateOrFn(prev) : stateOrFn;
      return { ...prev, ...partial };
    });
  }

  /**
   * 设置表单值
   * @param fields - 要设置的字段值对象
   * @param filterFields - 是否过滤不在 schema 中定义的字段，默认为 true
   * @param shouldValidate - 是否触发验证
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

    // 使用 Object.hasOwn() 替代 in 操作符（ES2022+）
    const filteredFields = Object.fromEntries(
      Object.entries(fields)
        .filter(([key]) => Object.hasOwn(form.values, key))
        .map(([key, newValue]) => {
          const existingValue = form.values[key];
          
          // 如果现有值是对象且不是数组、Date，则深度合并
          if (
            isObject(existingValue) &&
            !Array.isArray(existingValue) &&
            !isDate(existingValue) &&
            isObject(newValue) &&
            !Array.isArray(newValue) &&
            !isDate(newValue)
          ) {
            return [key, deepMerge(existingValue, newValue)];
          }
          return [key, newValue];
        })
    );
    
    form.setValues(filteredFields, shouldValidate);
  }

  /**
   * 提交表单
   * @param e - 事件对象
   * @returns 表单值
   */
  async submitForm(e?: Event): Promise<Recordable<any>> {
    e?.preventDefault();
    e?.stopPropagation();
    
    const form = await this.getForm();
    
    // 先验证表单
    const { valid } = await form.validate();
    if (!valid) {
      return {};
    }
    
    // 在调用任何可能重置表单的方法之前获取值
    const rawValues = toRaw(await this.getValues());
    
    // 更新最后一次提交的值
    this.setLatestSubmissionValues(rawValues);
    
    // 调用用户的提交回调
    await this.state?.handleSubmit?.(rawValues);

    return rawValues;
  }

  /**
   * 卸载表单
   */
  unmount(): void {
    this.form?.resetForm?.();
    this.latestSubmissionValues = null;
    this.isMounted = false;
    
    // 清理组件引用映射，防止内存泄漏
    this.componentRefMap.clear();
    
    // 重新创建挂载 Promise
    this.mountedPromise = new Promise((resolve) => {
      this.resolveMounted = resolve;
    });
  }

  /**
   * 更新表单 schema
   * @param schema - 要更新的 schema 数组
   */
  updateSchema(schema: Partial<FormSchema>[]): void {
    const updated = structuredClone(schema);
    
    // 验证所有项都有 fieldName
    if (!updated.every((item) => Object.hasOwn(item, 'fieldName') && item.fieldName)) {
      console.error(
        'All items in the schema array must have a valid `fieldName` property to be updated',
      );
      return;
    }
    
    const currentSchema = structuredClone(this.state?.schema ?? []);

    // 使用 Map 提高查找性能（O(1) vs O(n)）
    const updatedMap = new Map(
      updated
        .filter((item): item is Partial<FormSchema> & { fieldName: string } => !!item.fieldName)
        .map((item) => [item.fieldName, item])
    );

    const mergedSchema = currentSchema.map((schema) => {
      const updatedData = updatedMap.get(schema.fieldName);
      return updatedData ? { ...schema, ...updatedData } as FormSchema : schema;
    });
    
    this.setState({ schema: mergedSchema });
  }

  /**
   * 验证表单
   * @param opts - 验证选项
   * @returns 验证结果
   */
  async validate(opts?: Partial<ValidationOptions>) {
    const form = await this.getForm();
    const validateResult = await form.validate(opts);

    const errorCount = Object.keys(validateResult?.errors ?? {}).length;
    
    if (errorCount > 0) {
      console.error('validate error', validateResult?.errors);

      if (this.state?.scrollToFirstError) {
        this.scrollToFirstError(validateResult.errors);
      }
    }
    
    return validateResult;
  }

  /**
   * 验证并提交表单
   * @returns 表单值或 undefined
   */
  async validateAndSubmitForm(): Promise<Recordable<any> | undefined> {
    const form = await this.getForm();
    const { valid, errors } = await form.validate();
    
    if (!valid) {
      if (this.state?.scrollToFirstError) {
        this.scrollToFirstError(errors);
      }
      return undefined;
    }
    
    return await this.submitForm();
  }

  /**
   * 验证单个字段
   * @param fieldName - 字段名
   * @param opts - 验证选项
   * @returns 验证结果
   */
  async validateField(fieldName: string, opts?: Partial<ValidationOptions>) {
    const form = await this.getForm();
    const validateResult = await form.validateField(fieldName, opts);

    const errorCount = Object.keys(validateResult?.errors ?? {}).length;
    
    if (errorCount > 0) {
      console.error('validate error', validateResult?.errors);

      if (this.state?.scrollToFirstError) {
        this.scrollToFirstError(fieldName);
      }
    }
    
    return validateResult;
  }

  /**
   * 获取表单实例
   * @private
   * @returns 表单实例
   * @throws 如果表单未挂载或等待超时则抛出错误
   */
  private async getForm(): Promise<FormActions> {
    if (!this.isMounted) {
      // 添加超时机制，防止无限等待
      const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('<AdminForm /> mount timeout: Form was not mounted within 10 seconds'));
        }, 10000);
      });
      
      await Promise.race([this.mountedPromise, timeout]);
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
    // Use toRaw to convert Vue reactive objects to plain objects before cloning
    const rawValues = toRaw(originValues);
    // Create a shallow copy first to avoid cloning issues with non-serializable values
    const values = { ...rawValues };
    const fieldMappingTime = this.state?.fieldMappingTime;

    this.handleMultiFields(values);
    if (!fieldMappingTime?.length) {
      return values;
    }

    for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMappingTime) {
      if (startTimeKey && endTimeKey && values[field] === null) {
        delete values[startTimeKey];
        delete values[endTimeKey];
      }

      if (!values[field]) {
        delete values[field];
        continue;
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
      delete values[field];
    }
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
    
    // 进行了删除 schema 操作
    if (currentSchema.length < prevSchema.length) {
      const currentFields = new Set(
        currentSchema.map((item) => item.fieldName),
      );
      
      // 使用 for...of 替代 forEach，性能更好
      for (const schema of prevSchema) {
        if (!currentFields.has(schema.fieldName)) {
          this.form?.setFieldValue?.(schema.fieldName, undefined);
        }
      }
    }
  }
}
