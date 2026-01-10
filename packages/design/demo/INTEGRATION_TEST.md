# 第三方组件库集成功能测试

## 测试环境

- **开发服务器**: http://localhost:3000
- **测试组件**: `IntegrationTest.vue`

## 测试内容

### 1. HSL 格式颜色转换

测试 `getHSLColor(token)` 函数，验证能否正确获取 HSL 格式的颜色值。

**测试的颜色令牌**:
- `primary` - 主色
- `secondary` - 次要色
- `accent` - 强调色
- `destructive` - 破坏性颜色
- `success` - 成功色
- `warning` - 警告色

**预期结果**: 每个颜色都应该显示为 `hsl(h, s%, l%)` 格式，并且颜色块应该正确显示对应的颜色。

### 2. RGB 格式颜色转换

测试 `getRGBColor(token)` 函数，验证 HSL 到 RGB 的转换是否正确。

**预期结果**: 每个颜色都应该显示为 `rgb(r, g, b)` 格式，颜色块应该与 HSL 格式显示的颜色一致。

### 3. HEX 格式颜色转换

测试 `getHexColor(token)` 函数，验证 HSL 到 HEX 的转换是否正确。

**预期结果**: 每个颜色都应该显示为 `#RRGGBB` 格式，颜色块应该与前两种格式显示的颜色一致。

### 4. 批量获取所有颜色

测试以下三个批量获取函数：
- `getThemeColors()` - 获取所有 HSL 格式颜色
- `getThemeColorsRGB()` - 获取所有 RGB 格式颜色
- `getThemeColorsHex()` - 获取所有 HEX 格式颜色

**预期结果**: 
- 应该返回包含所有主题颜色的对象
- 包括: primary, secondary, accent, muted, destructive, success, warning, info, background, foreground, card, border 等
- JSON 格式应该正确且可读

## 测试步骤

### 步骤 1: 访问测试页面

1. 打开浏览器访问 http://localhost:3000
2. 滚动到 "第三方组件库集成测试" 部分

### 步骤 2: 验证颜色格式转换

1. **HSL 格式验证**:
   - 检查每个颜色的 HSL 值格式是否正确
   - 验证颜色块是否正确显示
   - 示例: `hsl(212, 100%, 48%)` 应该显示为蓝色

2. **RGB 格式验证**:
   - 检查每个颜色的 RGB 值格式是否正确
   - 验证颜色块与 HSL 格式的颜色是否一致
   - 示例: `rgb(0, 102, 245)` 应该与上面的蓝色一致

3. **HEX 格式验证**:
   - 检查每个颜色的 HEX 值格式是否正确
   - 验证颜色块与前两种格式的颜色是否一致
   - 示例: `#0066F5` 应该与上面的蓝色一致

### 步骤 3: 测试主题切换

1. 切换不同的主题变体（如 "深邃青"、"茶莓红" 等）
2. 观察所有颜色值是否正确更新
3. 验证颜色块是否正确显示新主题的颜色

### 步骤 4: 测试暗色模式

1. 点击 "暗色/浅色" 切换按钮
2. 观察所有颜色值是否正确更新
3. 验证暗色模式下的颜色是否符合预期

### 步骤 5: 测试语言切换

1. 切换语言（中文/英文）
2. 验证界面文本是否正确切换
3. 确认功能不受语言切换影响

### 步骤 6: 验证批量获取功能

1. 展开 "批量获取所有颜色" 部分
2. 检查 `getThemeColors()` 返回的 JSON 对象
3. 验证所有颜色令牌都存在
4. 检查 RGB 和 HEX 格式的批量获取结果

## 预期测试结果

### ✅ 成功标准

1. **颜色格式正确**:
   - HSL: `hsl(h, s%, l%)`
   - RGB: `rgb(r, g, b)`
   - HEX: `#RRGGBB`

2. **颜色一致性**:
   - 同一个令牌的三种格式应该显示相同的颜色
   - 颜色块应该与代码值匹配

3. **主题响应性**:
   - 切换主题时，所有颜色值应该立即更新
   - 暗色/浅色模式切换应该正确反映

4. **批量获取完整性**:
   - 应该包含所有主题颜色令牌
   - 格式应该正确且一致

### ❌ 失败情况

如果出现以下情况，说明测试失败：
- 颜色格式不正确
- 三种格式显示的颜色不一致
- 切换主题后颜色未更新
- 批量获取缺少某些颜色令牌
- 颜色转换计算错误

## 实际应用场景

这些工具函数可以用于以下场景：

### Element Plus 集成

```typescript
import { getThemeColorsRGB } from '@admin-core/design'

const colors = getThemeColorsRGB()
// 在 Element Plus ConfigProvider 中使用
```

### Ant Design Vue 集成

```typescript
import { getRGBColor } from '@admin-core/design'

const antdTheme = {
  token: {
    colorPrimary: getRGBColor('primary'),
    colorSuccess: getRGBColor('success'),
    // ...
  }
}
```

### Naive UI 集成

```typescript
import { getHSLColor } from '@admin-core/design'

const naiveTheme = {
  common: {
    primaryColor: getHSLColor('primary'),
    successColor: getHSLColor('success'),
    // ...
  }
}
```

## 浏览器兼容性

测试应该在以下浏览器中进行：
- ✅ Chrome/Edge (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)

## 性能测试

1. 打开浏览器开发者工具
2. 切换主题多次
3. 观察性能面板，确保没有性能问题
4. 验证颜色转换函数执行时间 < 1ms

## 文档参考

- [第三方组件库集成文档](../THIRD_PARTY_INTEGRATION.md)
- [主题系统文档](../README.md)
- [国际化文档](../I18N.md)

## 测试完成检查清单

- [ ] HSL 格式颜色显示正确
- [ ] RGB 格式颜色显示正确
- [ ] HEX 格式颜色显示正确
- [ ] 三种格式颜色一致
- [ ] 主题切换功能正常
- [ ] 暗色模式切换正常
- [ ] 语言切换功能正常
- [ ] 批量获取功能正常
- [ ] 所有颜色令牌都存在
- [ ] 性能表现良好
- [ ] 浏览器兼容性良好

## 问题反馈

如果发现任何问题，请记录：
1. 问题描述
2. 复现步骤
3. 预期结果 vs 实际结果
4. 浏览器和版本
5. 截图（如果适用）
