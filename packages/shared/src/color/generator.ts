import { getColors } from 'theme-colors';

import { convertToHslCssVar, TinyColor } from './convert';

/**
 * 颜色项配置接口
 * 
 * 用于定义需要生成 CSS 变量的颜色配置。
 */
export interface ColorItem {
  /**
   * 颜色别名，可选
   * 
   * 如果提供别名，将会额外生成一组使用别名的 CSS 变量。
   * 例如：alias='primary' 会生成 --primary-50, --primary-100 等变量。
   * 
   * @example 'primary', 'secondary', 'accent'
   */
  readonly alias?: string;
  
  /**
   * 颜色值
   * 
   * 支持多种颜色格式：十六进制、RGB、HSL、颜色名称等。
   * 该颜色将作为基础色生成完整的色阶（50-950）。
   * 
   * @example '#ff0000', 'rgb(255, 0, 0)', 'hsl(0, 100%, 50%)', 'red'
   */
  readonly color: string;
  
  /**
   * 颜色名称
   * 
   * 用于生成 CSS 变量名称。
   * 例如：name='blue' 会生成 --blue-50, --blue-100 等变量。
   * 
   * @example 'blue', 'red', 'green'
   */
  readonly name: string;
}

/**
 * 主色色阶键名
 * 用于标识主色（500 色阶）
 */
const MAIN_COLOR_KEY = '500' as const;

/**
 * 生成颜色 CSS 变量
 * 
 * 根据提供的颜色配置，自动生成完整的色阶（50-950）CSS 变量。
 * 使用 theme-colors 库生成色阶，并转换为 HSL 格式的 CSS 变量。
 * 
 * 生成的变量格式：
 * - 基础变量：--{name}-{shade} (例如：--blue-50, --blue-100, ..., --blue-950)
 * - 别名变量：--{alias}-{shade} (如果提供了 alias)
 * - 主色变量：--{alias} (指向 500 色阶，如果提供了 alias)
 * 
 * @param colorItems - 颜色配置数组
 * @returns CSS 变量对象，键为变量名（带 --），值为 HSL 格式的颜色值
 * 
 * @example
 * ```ts
 * const colors = generatorColorVariables([
 *   { name: 'blue', color: '#3b82f6', alias: 'primary' }
 * ]);
 * 
 * // 返回结果示例：
 * // {
 * //   '--blue-50': '214 100% 97%',
 * //   '--blue-100': '214 95% 93%',
 * //   ...
 * //   '--blue-500': '217 91% 60%',
 * //   ...
 * //   '--blue-950': '216 100% 7%',
 * //   '--primary-50': '214 100% 97%',
 * //   '--primary-100': '214 95% 93%',
 * //   ...
 * //   '--primary': '217 91% 60%'
 * // }
 * 
 * // 在 CSS 中使用：
 * // :root {
 * //   --blue-500: 217 91% 60%;
 * //   --primary: 217 91% 60%;
 * // }
 * // .button {
 * //   background: hsl(var(--primary));
 * // }
 * ```
 */
export function generatorColorVariables(
  colorItems: readonly ColorItem[]
): Readonly<Record<string, string>> {
  // 使用 Object.fromEntries 和 flatMap 实现更函数式的方法
  const colorVariables = Object.fromEntries(
    colorItems.flatMap(({ alias, color, name }) => {
      if (!color) return [];

      // 使用 theme-colors 生成完整的色阶（50-950）
      const colorsMap = getColors(new TinyColor(color).toHexString());
      const entries: Array<[string, string]> = [];

      // 处理所有色阶
      for (const [key, colorValue] of Object.entries(colorsMap)) {
        if (!colorValue) continue;

        // 转换为 CSS 变量兼容的 HSL 格式
        const hslColor = convertToHslCssVar(colorValue);
        
        // 生成基础变量名
        entries.push([`--${name}-${key}`, hslColor]);
        
        // 如果有别名，生成别名变量
        if (alias) {
          entries.push([`--${alias}-${key}`, hslColor]);
          
          // 如果是主色（500 色阶），生成主色变量（不带色阶后缀）
          if (key === MAIN_COLOR_KEY) {
            entries.push([`--${alias}`, hslColor]);
          }
        }
      }
      
      return entries;
    })
  );
  
  return Object.freeze(colorVariables);
}
