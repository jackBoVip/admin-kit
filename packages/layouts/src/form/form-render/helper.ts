import type {
  AnyZodObject,
  ZodDefault,
  ZodEffects,
  ZodNumber,
  ZodString,
  ZodTypeAny,
} from 'zod';

import { isObject, isString } from '@admin-core/shared/utils';

/**
 * 获取最底层的 Zod 类型
 * @description 解包可选类型、精炼类型等，获取基础的 Zod 类型
 * @template ChildType - 子类型
 * @param schema - Zod schema
 * @returns 基础的 Zod 类型或 null
 */
export function getBaseRules<
  ChildType extends AnyZodObject | ZodTypeAny = ZodTypeAny,
>(schema: ChildType | ZodEffects<ChildType>): ChildType | null {
  if (!schema || isString(schema)) return null;
  
  // 使用 Object.hasOwn() 替代 in 操作符（ES2022+）
  if (Object.hasOwn(schema._def, 'innerType')) {
    return getBaseRules(schema._def.innerType as ChildType);
  }

  if (Object.hasOwn(schema._def, 'schema')) {
    return getBaseRules(schema._def.schema as ChildType);
  }

  return schema as ChildType;
}

/**
 * 在 Zod 堆栈中搜索 "ZodDefault" 并返回其值
 * @description 递归查找 Zod schema 中的默认值
 * @param schema - Zod schema
 * @returns 默认值或 undefined
 */
export function getDefaultValueInZodStack(schema: ZodTypeAny): any {
  if (!schema || isString(schema)) return undefined;
  
  const typedSchema = schema as unknown as ZodDefault<ZodNumber | ZodString>;

  if (typedSchema._def.typeName === 'ZodDefault') {
    return typedSchema._def.defaultValue();
  }

  // 使用 Object.hasOwn() 替代 in 操作符
  if (Object.hasOwn(typedSchema._def, 'innerType')) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as ZodTypeAny,
    );
  }
  
  if (Object.hasOwn(typedSchema._def, 'schema')) {
    return getDefaultValueInZodStack(
      (typedSchema._def as any).schema as ZodTypeAny,
    );
  }

  return undefined;
}

/**
 * 判断对象是否类似事件对象
 * @description 检查对象是否具有事件对象的特征（target 和 stopPropagation）
 * @param obj - 要检查的对象
 * @returns 是否类似事件对象
 */
export function isEventObjectLike(obj: any): boolean {
  if (!obj || !isObject(obj)) return false;
  
  // 使用 Object.hasOwn() 替代 Reflect.has()
  return Object.hasOwn(obj, 'target') && Object.hasOwn(obj, 'stopPropagation');
}
