/**
 * 第三方组件库集成工具函数
 */

import { getCSSVariable } from './utils'

/**
 * 获取 HSL 格式的颜色值
 * @param token - CSS 变量名（不带 -- 前缀）
 * @returns HSL 格式的颜色字符串，如 'hsl(212, 100%, 48%)'
 */
export function getHSLColor(token: string): string {
  const value = getCSSVariable(token)
  return value ? `hsl(${value})` : ''
}

/**
 * 将 HSL 字符串转换为 RGB 字符串
 * @param hsl - HSL 字符串，格式：'212 100% 48%' 或 'hsl(212, 100%, 48%)'
 * @returns RGB 格式字符串，如 'rgb(0, 102, 245)'
 */
export function hslToRgb(hsl: string): string {
  // 移除 'hsl(' 和 ')' 以及 '%'
  const cleaned = hsl.replace(/hsl\(|\)|%/g, '').trim()
  const [h, s, l] = cleaned.split(/[\s,]+/).map(Number)
  
  if (h === undefined || s === undefined || l === undefined) {
    return 'rgb(0, 0, 0)'
  }
  
  const hDecimal = h / 360
  const sDecimal = s / 100
  const lDecimal = l / 100
  
  let r: number, g: number, b: number
  
  if (sDecimal === 0) {
    r = g = b = lDecimal
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    
    const q = lDecimal < 0.5
      ? lDecimal * (1 + sDecimal)
      : lDecimal + sDecimal - lDecimal * sDecimal
    const p = 2 * lDecimal - q
    
    r = hue2rgb(p, q, hDecimal + 1 / 3)
    g = hue2rgb(p, q, hDecimal)
    b = hue2rgb(p, q, hDecimal - 1 / 3)
  }
  
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
}

/**
 * 将 HSL 字符串转换为 HEX 字符串
 * @param hsl - HSL 字符串，格式：'212 100% 48%' 或 'hsl(212, 100%, 48%)'
 * @returns HEX 格式字符串，如 '#0066F5'
 */
export function hslToHex(hsl: string): string {
  const rgb = hslToRgb(hsl)
  const matches = rgb.match(/\d+/g)
  
  if (!matches || matches.length < 3) {
    return '#000000'
  }
  
  const [r, g, b] = matches.map(Number)
  
  return '#' + [r, g, b]
    .filter((x): x is number => x !== undefined)
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * 获取 RGB 格式的颜色值
 * @param token - CSS 变量名（不带 -- 前缀）
 * @returns RGB 格式的颜色字符串，如 'rgb(0, 102, 245)'
 */
export function getRGBColor(token: string): string {
  const hsl = getCSSVariable(token)
  return hsl ? hslToRgb(hsl) : 'rgb(0, 0, 0)'
}

/**
 * 获取 HEX 格式的颜色值
 * @param token - CSS 变量名（不带 -- 前缀）
 * @returns HEX 格式的颜色字符串，如 '#0066F5'
 */
export function getHexColor(token: string): string {
  const hsl = getCSSVariable(token)
  return hsl ? hslToHex(hsl) : '#000000'
}

/**
 * 获取所有主题颜色（HSL 格式）
 * @returns 包含所有主题颜色的对象
 */
export function getThemeColors() {
  return {
    primary: getHSLColor('primary'),
    primaryForeground: getHSLColor('primary-foreground'),
    secondary: getHSLColor('secondary'),
    secondaryForeground: getHSLColor('secondary-foreground'),
    accent: getHSLColor('accent'),
    accentForeground: getHSLColor('accent-foreground'),
    muted: getHSLColor('muted'),
    mutedForeground: getHSLColor('muted-foreground'),
    destructive: getHSLColor('destructive'),
    destructiveForeground: getHSLColor('destructive-foreground'),
    success: getHSLColor('success'),
    successForeground: getHSLColor('success-foreground'),
    warning: getHSLColor('warning'),
    warningForeground: getHSLColor('warning-foreground'),
    info: getHSLColor('info'),
    infoForeground: getHSLColor('info-foreground'),
    background: getHSLColor('background'),
    backgroundDeep: getHSLColor('background-deep'),
    foreground: getHSLColor('foreground'),
    card: getHSLColor('card'),
    cardForeground: getHSLColor('card-foreground'),
    border: getHSLColor('border'),
    input: getHSLColor('input'),
    ring: getHSLColor('ring'),
  }
}

/**
 * 获取所有主题颜色（RGB 格式）
 * @returns 包含所有主题颜色的对象（RGB 格式）
 */
export function getThemeColorsRGB() {
  return {
    primary: getRGBColor('primary'),
    primaryForeground: getRGBColor('primary-foreground'),
    secondary: getRGBColor('secondary'),
    secondaryForeground: getRGBColor('secondary-foreground'),
    accent: getRGBColor('accent'),
    accentForeground: getRGBColor('accent-foreground'),
    muted: getRGBColor('muted'),
    mutedForeground: getRGBColor('muted-foreground'),
    destructive: getRGBColor('destructive'),
    destructiveForeground: getRGBColor('destructive-foreground'),
    success: getRGBColor('success'),
    successForeground: getRGBColor('success-foreground'),
    warning: getRGBColor('warning'),
    warningForeground: getRGBColor('warning-foreground'),
    info: getRGBColor('info'),
    infoForeground: getRGBColor('info-foreground'),
    background: getRGBColor('background'),
    backgroundDeep: getRGBColor('background-deep'),
    foreground: getRGBColor('foreground'),
    card: getRGBColor('card'),
    cardForeground: getRGBColor('card-foreground'),
    border: getRGBColor('border'),
    input: getRGBColor('input'),
    ring: getRGBColor('ring'),
  }
}

/**
 * 获取所有主题颜色（HEX 格式）
 * @returns 包含所有主题颜色的对象（HEX 格式）
 */
export function getThemeColorsHex() {
  return {
    primary: getHexColor('primary'),
    primaryForeground: getHexColor('primary-foreground'),
    secondary: getHexColor('secondary'),
    secondaryForeground: getHexColor('secondary-foreground'),
    accent: getHexColor('accent'),
    accentForeground: getHexColor('accent-foreground'),
    muted: getHexColor('muted'),
    mutedForeground: getHexColor('muted-foreground'),
    destructive: getHexColor('destructive'),
    destructiveForeground: getHexColor('destructive-foreground'),
    success: getHexColor('success'),
    successForeground: getHexColor('success-foreground'),
    warning: getHexColor('warning'),
    warningForeground: getHexColor('warning-foreground'),
    info: getHexColor('info'),
    infoForeground: getHexColor('info-foreground'),
    background: getHexColor('background'),
    backgroundDeep: getHexColor('background-deep'),
    foreground: getHexColor('foreground'),
    card: getHexColor('card'),
    cardForeground: getHexColor('card-foreground'),
    border: getHexColor('border'),
    input: getHexColor('input'),
    ring: getHexColor('ring'),
  }
}
