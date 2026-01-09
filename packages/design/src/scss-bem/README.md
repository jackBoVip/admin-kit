# BEM 命名规范工具集

基于 BEM（Block Element Modifier）方法论的 SCSS Mixin 工具集，用于快速生成符合规范的 CSS 类名。

## 功能特性

- ✅ **Block（块）** - 定义独立组件
- ✅ **Element（元素）** - 定义组件的子元素
- ✅ **Modifier（修饰符）** - 定义组件的变体，支持单个和组合修饰符
- ✅ **State（状态）** - 定义组件的状态类（is-*）
- ✅ **When（条件）** - 定义组件的条件类（has-*、with-*、without-*）
- ✅ **Pseudo（伪类/伪元素）** - 快速添加伪类和伪元素样式

## 配置常量

```scss
$namespace: 'admin';              // 命名空间前缀
$common-separator: '-';           // 通用分隔符，用于连接命名空间和块名
$element-separator: '__';         // 元素分隔符
$modifier-separator: '--';        // 修饰符分隔符
$state-prefix: 'is';              // 状态类前缀
$when-prefixes: ('has', 'with', 'without'); // 条件类前缀列表
```

### 自定义配置示例

如果你想自定义命名规范，可以在导入前覆盖这些变量：

```scss
// 自定义配置
$namespace: 'my-app';
$common-separator: '_';
$element-separator: '-';
$modifier-separator: '--';

// 导入 BEM 工具
@use '@admin-core/design/scss-bem' as *;

@include b(button) {
  // 生成 .my-app_button
  padding: 8px 16px;
  
  @include e(icon) {
    // 生成 .my-app_button-icon
    font-size: 16px;
  }
}
```

## 使用示例

### 基础用法

```scss
@use '@admin-core/design/scss-bem' as *;

@include b(button) {
  // 生成 .admin-button
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  
  @include e(icon) {
    // 生成 .admin-button__icon
    margin-right: 8px;
    font-size: 16px;
  }
  
  @include e(text) {
    // 生成 .admin-button__text
    font-weight: 500;
  }
  
  @include m(primary) {
    // 生成 .admin-button--primary
    background: blue;
    color: white;
  }
  
  @include m(large) {
    // 生成 .admin-button--large
    padding: 12px 24px;
    font-size: 18px;
  }
  
  @include is(disabled) {
    // 生成 .admin-button.is-disabled
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @include when(icon) {
    // 生成 .admin-button.has-icon
    padding-left: 32px;
  }
  
  @include pseudo(hover) {
    // 生成 .admin-button:hover
    opacity: 0.9;
  }
}
```

### 组合修饰符

```scss
@include b(card) {
  padding: 16px;
  
  // 单个修饰符
  @include m(primary) {
    // 生成 .admin-card--primary
    border-color: blue;
  }
  
  // 组合修饰符（需要同时满足多个条件）
  @include m((primary, large)) {
    // 生成 .admin-card--primary.admin-card--large
    border-color: blue;
    padding: 24px;
    font-size: 18px;
  }
}
```

### 条件类的不同前缀

```scss
@include b(input) {
  border: 1px solid #ccc;
  
  @include when(icon) {
    // 生成 .admin-input.has-icon
    padding-left: 32px;
  }
  
  @include when(border, 'with') {
    // 生成 .admin-input.with-border
    border: 2px solid #000;
  }
  
  @include when(padding, 'without') {
    // 生成 .admin-input.without-padding
    padding: 0;
  }
}
```

### 伪类和伪元素

```scss
@include b(link) {
  color: blue;
  
  @include pseudo(hover) {
    // 生成 .admin-link:hover
    color: darkblue;
  }
  
  @include pseudo(visited) {
    // 生成 .admin-link:visited
    color: purple;
  }
  
  @include pseudo(before) {
    // 生成 .admin-link::before
    content: '→';
    margin-right: 4px;
  }
  
  @include pseudo(after) {
    // 生成 .admin-link::after
    content: '←';
    margin-left: 4px;
  }
}
```

## 生成的 CSS 示例

```css
/* Block */
.admin-button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

/* Element */
.admin-button__icon {
  margin-right: 8px;
  font-size: 16px;
}

.admin-button__text {
  font-weight: 500;
}

/* Modifier */
.admin-button--primary {
  background: blue;
  color: white;
}

.admin-button--large {
  padding: 12px 24px;
  font-size: 18px;
}

/* State */
.admin-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* When */
.admin-button.has-icon {
  padding-left: 32px;
}

/* Pseudo */
.admin-button:hover {
  opacity: 0.9;
}
```

## 优化亮点

### 1. 移除未使用的变量
- 删除了 `$common-separator` 变量（未在代码中使用）

### 2. 增强的 Modifier 支持
- 支持单个修饰符：`@include m(primary)`
- 支持组合修饰符：`@include m((primary, large))`

### 3. 新增 When Mixin
- 支持条件类的定义
- 灵活的前缀配置（has、with、without）
- 语义化的条件状态表达

### 4. 新增 Pseudo Mixin
- 自动识别伪类和伪元素
- 简化伪类/伪元素的编写
- 支持所有常用的伪类和伪元素

## API 参考

### @mixin b($block)
定义一个块（Block）

**参数：**
- `$block` (String) - 块的名称

### @mixin e($name)
定义一个元素（Element）

**参数：**
- `$name` (String) - 元素的名称

### @mixin m($name)
定义一个修饰符（Modifier）

**参数：**
- `$name` (String | List) - 修饰符的名称，支持单个或多个

### @mixin is($state, $prefix: 'is')
定义一个状态类（State）

**参数：**
- `$state` (String) - 状态的名称
- `$prefix` (String) - 状态前缀，默认为 'is'

### @mixin when($condition, $prefix: 'has')
定义一个条件类（When）

**参数：**
- `$condition` (String) - 条件的名称
- `$prefix` (String) - 条件前缀，默认为 'has'

### @mixin pseudo($pseudo)
定义伪类或伪元素

**参数：**
- `$pseudo` (String) - 伪类或伪元素名称（不需要冒号）

## 最佳实践

1. **保持扁平化**：避免过深的嵌套，最多 Block > Element > Modifier
2. **语义化命名**：使用有意义的名称，如 `button`、`card`、`header`
3. **状态优先**：使用 `is-*` 表示状态，`has-*` 表示条件
4. **避免缩写**：使用完整单词，提高可读性
5. **一致性**：在整个项目中保持命名风格一致

## 许可证

MIT
