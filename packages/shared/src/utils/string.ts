/**
 * 字符串工具模块
 * @description 提供字符串处理相关的工具函数，使用 ES2025 最新特性优化
 * @module string
 */

/**
 * 将字符串的首字母转换为大写
 * @param str - 要转换的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```typescript
 * capitalize('hello') // 'Hello'
 * capitalize('world') // 'World'
 * capitalize('') // ''
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 将字符串的首字母转换为小写
 * @param str - 要转换的字符串
 * @returns 首字母小写的字符串
 * @example
 * ```typescript
 * uncapitalize('Hello') // 'hello'
 * uncapitalize('World') // 'world'
 * uncapitalize('') // ''
 * ```
 */
export function uncapitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * 将字符串转换为驼峰命名法 (camelCase)
 * @param str - 要转换的字符串
 * @returns 驼峰命名的字符串
 * @example
 * ```typescript
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('hello world') // 'helloWorld'
 * camelCase('HelloWorld') // 'helloWorld'
 * ```
 */
export function camelCase(str: string): string {
  if (!str) return str;
  
  // 处理各种分隔符：短横线、下划线、空格
  return str
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replaceAll(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * 将字符串转换为短横线命名法 (kebab-case)
 * @param str - 要转换的字符串
 * @returns 短横线命名的字符串
 * @example
 * ```typescript
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('HelloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 * kebabCase('hello world') // 'hello-world'
 * ```
 */
export function kebabCase(str: string): string {
  if (!str) return str;
  
  return str
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2') // 驼峰转短横线
    .replaceAll(/[\s_]+/g, '-') // 空格和下划线转短横线
    .toLowerCase();
}

/**
 * 将字符串转换为下划线命名法 (snake_case)
 * @param str - 要转换的字符串
 * @returns 下划线命名的字符串
 * @example
 * ```typescript
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('HelloWorld') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 * snakeCase('hello world') // 'hello_world'
 * ```
 */
export function snakeCase(str: string): string {
  if (!str) return str;
  
  return str
    .replaceAll(/([a-z])([A-Z])/g, '$1_$2') // 驼峰转下划线
    .replaceAll(/[\s-]+/g, '_') // 空格和短横线转下划线
    .toLowerCase();
}

/**
 * 将字符串转换为帕斯卡命名法 (PascalCase)
 * @param str - 要转换的字符串
 * @returns 帕斯卡命名的字符串
 * @example
 * ```typescript
 * pascalCase('hello-world') // 'HelloWorld'
 * pascalCase('hello_world') // 'HelloWorld'
 * pascalCase('hello world') // 'HelloWorld'
 * pascalCase('helloWorld') // 'HelloWorld'
 * ```
 */
export function pascalCase(str: string): string {
  if (!str) return str;
  
  const camelCased = camelCase(str);
  return capitalize(camelCased);
}

/**
 * 截断字符串到指定长度，并添加省略号
 * @param str - 要截断的字符串
 * @param length - 最大长度
 * @param suffix - 省略号后缀，默认为 '...'
 * @returns 截断后的字符串
 * @example
 * ```typescript
 * truncate('Hello World', 5) // 'Hello...'
 * truncate('Hello World', 20) // 'Hello World'
 * truncate('Hello World', 5, '…') // 'Hello…'
 * ```
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

/**
 * 转义 HTML 特殊字符
 * @param str - 要转义的字符串
 * @returns 转义后的字符串
 * @example
 * ```typescript
 * escapeHtml('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
 * escapeHtml('Tom & Jerry') // 'Tom &amp; Jerry'
 * ```
 */
export function escapeHtml(str: string): string {
  if (!str) return str;
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  
  return str.replaceAll(/[&<>"']/g, (char) => htmlEscapes[char] ?? char);
}

/**
 * 反转义 HTML 特殊字符
 * @param str - 要反转义的字符串
 * @returns 反转义后的字符串
 * @example
 * ```typescript
 * unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
 * unescapeHtml('Tom &amp; Jerry') // 'Tom & Jerry'
 * ```
 */
export function unescapeHtml(str: string): string {
  if (!str) return str;
  
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  
  return str.replaceAll(/&(?:amp|lt|gt|quot|#39);/g, (entity) => htmlUnescapes[entity] ?? entity);
}

/**
 * 格式化数字，添加千分位分隔符
 * @param num - 要格式化的数字
 * @param decimals - 小数位数，默认为 2
 * @param decimalSeparator - 小数分隔符，默认为 '.'
 * @param thousandsSeparator - 千分位分隔符，默认为 ','
 * @returns 格式化后的字符串
 * @example
 * ```typescript
 * formatNumber(1234567.89) // '1,234,567.89'
 * formatNumber(1234567.89, 0) // '1,234,568'
 * formatNumber(1234567.89, 2, ',', ' ') // '1 234 567,89'
 * ```
 */
export function formatNumber(
  num: number,
  decimals = 2,
  decimalSeparator = '.',
  thousandsSeparator = ',',
): string {
  const fixed = num.toFixed(decimals);
  const [integer, decimal] = fixed.split('.');
  
  // 添加千分位分隔符
  const formattedInteger = integer.replaceAll(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  // 如果有小数部分，则添加小数分隔符
  return decimal ? `${formattedInteger}${decimalSeparator}${decimal}` : formattedInteger;
}

/**
 * 移除字符串中的所有空白字符
 * @param str - 要处理的字符串
 * @returns 移除空白后的字符串
 * @example
 * ```typescript
 * removeWhitespace('  hello  world  ') // 'helloworld'
 * removeWhitespace('hello\n\tworld') // 'helloworld'
 * ```
 */
export function removeWhitespace(str: string): string {
  if (!str) return str;
  return str.replaceAll(/\s+/g, '');
}

/**
 * 将字符串重复指定次数
 * @param str - 要重复的字符串
 * @param count - 重复次数
 * @returns 重复后的字符串
 * @example
 * ```typescript
 * repeat('abc', 3) // 'abcabcabc'
 * repeat('*', 5) // '*****'
 * ```
 */
export function repeat(str: string, count: number): string {
  if (!str || count <= 0) return '';
  return str.repeat(count);
}

/**
 * 反转字符串
 * @param str - 要反转的字符串
 * @returns 反转后的字符串
 * @example
 * ```typescript
 * reverse('hello') // 'olleh'
 * reverse('12345') // '54321'
 * ```
 */
export function reverse(str: string): string {
  if (!str) return str;
  return Array.from(str).reverse().join('');
}

/**
 * 检查字符串是否以指定的子串开头（忽略大小写）
 * @param str - 要检查的字符串
 * @param searchString - 要搜索的子串
 * @returns 是否以指定子串开头
 * @example
 * ```typescript
 * startsWithIgnoreCase('Hello World', 'hello') // true
 * startsWithIgnoreCase('Hello World', 'HELLO') // true
 * startsWithIgnoreCase('Hello World', 'world') // false
 * ```
 */
export function startsWithIgnoreCase(str: string, searchString: string): boolean {
  if (!str || !searchString) return false;
  return str.toLowerCase().startsWith(searchString.toLowerCase());
}

/**
 * 检查字符串是否以指定的子串结尾（忽略大小写）
 * @param str - 要检查的字符串
 * @param searchString - 要搜索的子串
 * @returns 是否以指定子串结尾
 * @example
 * ```typescript
 * endsWithIgnoreCase('Hello World', 'world') // true
 * endsWithIgnoreCase('Hello World', 'WORLD') // true
 * endsWithIgnoreCase('Hello World', 'hello') // false
 * ```
 */
export function endsWithIgnoreCase(str: string, searchString: string): boolean {
  if (!str || !searchString) return false;
  return str.toLowerCase().endsWith(searchString.toLowerCase());
}
