import { TinyColor } from '@ctrl/tinycolor';

/**
 * 角度单位正则表达式
 * 用于匹配和移除 CSS 角度单位（deg、grad、rad、turn）
 */
const ANGLE_UNITS_REGEX = /deg|grad|rad|turn/g;

/**
 * 将颜色转换为 HSL 格式字符串
 *
 * HSL 是一种颜色模型，包括色相(Hue)、饱和度(Saturation)和亮度(Lightness)三个部分。
 * 该函数会将任意格式的颜色转换为标准的 HSL 格式字符串。
 *
 * @param color - 输入的颜色值，支持多种格式：
 *   - 十六进制：'#ffffff', '#fff'
 *   - RGB：'rgb(255, 255, 255)'
 *   - HSL：'hsl(0, 0%, 100%)'
 *   - 颜色名称：'white', 'red'
 * @returns HSL 格式的颜色字符串，格式为 'hsl(h s% l%)' 或 'hsl(h s% l%) alpha'
 * 
 * @example
 * ```ts
 * convertToHsl('#ff0000') // 'hsl(0 100% 50%)'
 * convertToHsl('rgb(255, 0, 0)') // 'hsl(0 100% 50%)'
 * convertToHsl('rgba(255, 0, 0, 0.5)') // 'hsl(0 100% 50%) 0.5'
 * ```
 */
export function convertToHsl(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl();
  const hsl = `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
  return a < 1 ? `${hsl} ${a}` : hsl;
}

/**
 * 将颜色转换为 CSS 变量兼容的 HSL 格式
 *
 * 该函数返回不带 `hsl()` 包装的 HSL 值，可以直接用作 CSS 变量。
 * 这种格式便于在 CSS 中使用 `hsl(var(--color))` 的方式引用。
 *
 * @param color - 输入的颜色值，支持多种格式：
 *   - 十六进制：'#ffffff', '#fff'
 *   - RGB：'rgb(255, 255, 255)'
 *   - HSL：'hsl(0, 0%, 100%)'
 *   - 颜色名称：'white', 'red'
 * @returns CSS 变量兼容的 HSL 格式字符串，格式为 'h s% l%' 或 'h s% l% / alpha'
 * 
 * @example
 * ```ts
 * convertToHslCssVar('#ff0000') // '0 100% 50%'
 * convertToHslCssVar('rgba(255, 0, 0, 0.5)') // '0 100% 50% / 0.5'
 * 
 * // 在 CSS 中使用
 * // :root { --primary: 0 100% 50%; }
 * // .button { background: hsl(var(--primary)); }
 * ```
 */
export function convertToHslCssVar(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl();
  const hsl = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  return a < 1 ? `${hsl} / ${a}` : hsl;
}

/**
 * 将颜色转换为 RGB 颜色字符串
 * 
 * 该函数会自动处理 HSL 颜色中的角度单位（deg、grad、rad、turn），
 * 因为 TinyColor 无法正确解析带有这些单位的 HSL 字符串。
 * 例如：'hsl(231deg 98% 65%)' 会被预处理为 'hsl(231 98% 65%)' 后再转换。
 * 
 * @param str - 表示颜色值的字符串，支持多种格式：
 *   - 十六进制：'#ffffff', '#fff'
 *   - RGB：'rgb(255, 255, 255)'
 *   - HSL：'hsl(0, 0%, 100%)' 或 'hsl(0deg 0% 100%)'
 *   - 颜色名称：'white', 'red'
 * @returns RGB 格式的颜色字符串，格式为 'rgb(r, g, b)' 或 'rgba(r, g, b, a)'
 * 
 * @example
 * ```ts
 * convertToRgb('#ff0000') // 'rgb(255, 0, 0)'
 * convertToRgb('hsl(0deg 100% 50%)') // 'rgb(255, 0, 0)'
 * convertToRgb('rgba(255, 0, 0, 0.5)') // 'rgba(255, 0, 0, 0.5)'
 * ```
 */
export function convertToRgb(str: string): string {
  const normalizedStr = str.replaceAll(ANGLE_UNITS_REGEX, '');
  return new TinyColor(normalizedStr).toRgbString();
}

/**
 * 检查颜色值是否有效
 * 
 * 使用 TinyColor 库验证颜色值的有效性。
 * 支持验证多种颜色格式，包括十六进制、RGB、HSL、颜色名称等。
 * 
 * @param color - 待检查的颜色值，可选参数
 * @returns 如果颜色有效返回 true，否则返回 false
 * 
 * @example
 * ```ts
 * isValidColor('#ff0000') // true
 * isValidColor('rgb(255, 0, 0)') // true
 * isValidColor('red') // true
 * isValidColor('invalid-color') // false
 * isValidColor(undefined) // false
 * isValidColor('') // false
 * ```
 */
export function isValidColor(color?: string): boolean {
  return !!color && new TinyColor(color).isValid;
}

export { TinyColor };
