import { TinyColor } from '@ctrl/tinycolor';

/**
 * 判断颜色是否为深色
 * 
 * 使用 TinyColor 库的亮度算法来判断颜色是否为深色。
 * 该算法基于 W3C 的相对亮度计算标准。
 * 
 * @param color - 颜色值，支持多种格式：
 *   - 十六进制：'#ffffff', '#fff'
 *   - RGB：'rgb(255, 255, 255)'
 *   - HSL：'hsl(0, 0%, 100%)'
 *   - 颜色名称：'white', 'red'
 * @returns 如果颜色为深色返回 true，否则返回 false
 * 
 * @example
 * ```ts
 * isDarkColor('#000000') // true
 * isDarkColor('#ffffff') // false
 * isDarkColor('rgb(50, 50, 50)') // true
 * ```
 */
export function isDarkColor(color: string): boolean {
  return new TinyColor(color).isDark();
}

/**
 * 判断颜色是否为浅色
 * 
 * 使用 TinyColor 库的亮度算法来判断颜色是否为浅色。
 * 该算法基于 W3C 的相对亮度计算标准。
 * 
 * @param color - 颜色值，支持多种格式：
 *   - 十六进制：'#ffffff', '#fff'
 *   - RGB：'rgb(255, 255, 255)'
 *   - HSL：'hsl(0, 0%, 100%)'
 *   - 颜色名称：'white', 'red'
 * @returns 如果颜色为浅色返回 true，否则返回 false
 * 
 * @example
 * ```ts
 * isLightColor('#ffffff') // true
 * isLightColor('#000000') // false
 * isLightColor('rgb(200, 200, 200)') // true
 * ```
 */
export function isLightColor(color: string): boolean {
  return new TinyColor(color).isLight();
}
