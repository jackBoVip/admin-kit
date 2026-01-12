import { isRef, unref } from 'vue';

/**
 * 规范化 schema，处理 ref 类型
 * @param schema - 表单 schema，可能是 ref 或普通数组
 * @returns 规范化的 schema 数组
 */
export function normalizeSchema(schema: any) {
  if (schema === undefined || schema === null) {
    return [];
  }
  
  const schemaValue = isRef(schema) ? unref(schema) : schema;
  return Array.isArray(schemaValue) ? schemaValue : [];
}