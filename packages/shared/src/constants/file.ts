/**
 * 文件相关常量
 * 
 * 包含文件类型、大小限制、MIME 类型等
 */

/**
 * 文件类型扩展名
 */
export const FILE_TYPES = {
  /** 图片文件 */
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico'] as const,
  
  /** 视频文件 */
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'] as const,
  
  /** 音频文件 */
  AUDIO: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'] as const,
  
  /** 文档文件 */
  DOCUMENT: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'md'] as const,
  
  /** 压缩文件 */
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'] as const,
  
  /** 代码文件 */
  CODE: ['js', 'ts', 'jsx', 'tsx', 'vue', 'html', 'css', 'scss', 'less', 'json', 'xml'] as const,
} as const;

/**
 * 文件大小限制（字节）
 */
export const FILE_SIZE_LIMITS = {
  /** 图片文件：5MB */
  IMAGE: 5 * 1024 * 1024,
  
  /** 视频文件：100MB */
  VIDEO: 100 * 1024 * 1024,
  
  /** 音频文件：20MB */
  AUDIO: 20 * 1024 * 1024,
  
  /** 文档文件：10MB */
  DOCUMENT: 10 * 1024 * 1024,
  
  /** 压缩文件：50MB */
  ARCHIVE: 50 * 1024 * 1024,
  
  /** 默认限制：20MB */
  DEFAULT: 20 * 1024 * 1024,
} as const;

/**
 * 常用 MIME 类型
 */
export const MIME_TYPES = {
  // 图片
  JPG: 'image/jpeg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  WEBP: 'image/webp',
  SVG: 'image/svg+xml',
  
  // 视频
  MP4: 'video/mp4',
  WEBM: 'video/webm',
  
  // 音频
  MP3: 'audio/mpeg',
  WAV: 'audio/wav',
  OGG: 'audio/ogg',
  
  // 文档
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPT: 'application/vnd.ms-powerpoint',
  PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  
  // 压缩
  ZIP: 'application/zip',
  RAR: 'application/x-rar-compressed',
  
  // 文本
  TXT: 'text/plain',
  JSON: 'application/json',
  XML: 'application/xml',
} as const;

/**
 * 文件单位转换
 */
export const FILE_SIZE_UNITS = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
} as const;
