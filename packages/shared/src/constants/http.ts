/**
 * HTTP 相关常量
 * 
 * 包含 HTTP 状态码、请求方法、内容类型等
 */

/**
 * HTTP 状态码
 * 
 * 常用的 HTTP 响应状态码定义
 */
export const HTTP_STATUS = {
  /** 请求成功 */
  OK: 200,
  
  /** 资源已创建 */
  CREATED: 201,
  
  /** 请求成功但无返回内容 */
  NO_CONTENT: 204,
  
  /** 请求参数错误 */
  BAD_REQUEST: 400,
  
  /** 未授权，需要身份验证 */
  UNAUTHORIZED: 401,
  
  /** 禁止访问 */
  FORBIDDEN: 403,
  
  /** 资源未找到 */
  NOT_FOUND: 404,
  
  /** 请求方法不允许 */
  METHOD_NOT_ALLOWED: 405,
  
  /** 请求超时 */
  REQUEST_TIMEOUT: 408,
  
  /** 资源冲突 */
  CONFLICT: 409,
  
  /** 请求实体过大 */
  PAYLOAD_TOO_LARGE: 413,
  
  /** 请求过于频繁 */
  TOO_MANY_REQUESTS: 429,
  
  /** 服务器内部错误 */
  INTERNAL_SERVER_ERROR: 500,
  
  /** 网关错误 */
  BAD_GATEWAY: 502,
  
  /** 服务不可用 */
  SERVICE_UNAVAILABLE: 503,
  
  /** 网关超时 */
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * HTTP 状态码类型
 */
export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

/**
 * HTTP 请求方法
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
} as const;

/**
 * HTTP 请求方法类型
 */
export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];

/**
 * 内容类型
 */
export const CONTENT_TYPES = {
  /** JSON 格式 */
  JSON: 'application/json',
  
  /** 表单格式 */
  FORM: 'application/x-www-form-urlencoded',
  
  /** 多部分表单（文件上传） */
  MULTIPART: 'multipart/form-data',
  
  /** 纯文本 */
  TEXT: 'text/plain',
  
  /** HTML */
  HTML: 'text/html',
  
  /** XML */
  XML: 'application/xml',
  
  /** 二进制流 */
  OCTET_STREAM: 'application/octet-stream',
} as const;

/**
 * 内容类型类型
 */
export type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES];

/**
 * 请求超时时间（毫秒）
 */
export const REQUEST_TIMEOUT = 30000 as const;

/**
 * 请求重试次数
 */
export const RETRY_COUNT = 3 as const;

/**
 * 请求重试延迟（毫秒）
 */
export const RETRY_DELAY = 1000 as const;
