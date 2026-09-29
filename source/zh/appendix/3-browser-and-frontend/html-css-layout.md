# HTML/CSS 布局基础
::: 提示 🎯 核心问题
**网页是如何制作的？为什么有些页面只有文本，而有些则像应用程序一样互动？** 这个问题引出了网页开发的三大基石，帮助你理解每个网页背后的结构。
:::

---

## 1.HTML、CSS 和 JavaScript 概述

### 1.1 从静态页面到动态应用

想象一下你在街上看到一张**海报**。你只能看它，不能与它互动——海报不会因为你看了它而改变内容，也不会因为你点击了某个地方而弹出更多信息。

早期网页就像这些“电子海报”：仅浏览、不可变、内容固定。

但现代网页完全不同。它们的行为像**桌面应用**：

- 你可以点击、拖动、输入和上传
- 页面会根据你的操作实时变化
- 他们能够完成复杂的任务，如软件（例如在线视频剪辑）

**这一转变的核心原因是网络技术的三大基石：HTML CSS、JavaScript**。

### 1.2 一个类比：建造房子

|技术 |🏠房屋类比 |实际角色 |具体示例 |
|-------------- |----------------------------------- |------------------------------ |----------------------------------------- |
|**HTML** |房子的**结构和材料**定义了页面的内容和层级 |这是一面墙，这是一扇窗，这是一间房间 |
|**CSS** |房屋的**装饰与外观** |控制页面的风格和布局 |将墙壁刷成蓝色，窗户放在东侧，铺设瓷砖 |
|**JavaScript** |房子的**家电和智能系统**在页面上启用互动性和逻辑 |按下开关灯，灯亮，打开门帘自动拉上|

::: 三💡者的关系

**HTML → CSS**：你得先建好房子，才能装饰它。HTML是基础，CSS是美化。

**HTML CSS → JavaScript**：你需要先有房子和装饰，才能安装智能系统。JavaScript 让一个“死”页面“焕发生机。

**核心理念**：这三者各有其作用，没有一个是可有可无的。只有HTML的页面很丑，只有HTML的CSS页面无法互动，只有三者兼具才能构建像微信网页或淘宝这样的“网页应用”。
:::

### 1.3 自己试试

👇 下面的演示展示了 HTML/CSS/JavaScript 如何协同工作：

<WebTechTriad />

---

## 2.HTML：网页骨架

### 2.1 需要HTML的动机

在HTML出现之前，互联网上的内容只是**纯文本**。就像你现在正在阅读的文本——没有格式，没有层级，没有链接。

纯文本有什么问题？

- ❌ **无法表达层级结构**：分不清什么是标题，什么是正文，什么是脚注
- ❌ **机器无法理解内容**：搜索引擎和屏幕阅读器（盲人版）无法理解内容
- ❌ **无法交互**：无链接，无按钮，无输入字段

**HTML（超文本标记语言）** 就是为了解决这些问题而创建的。它使用“标签”来标记内容的意义，告诉浏览器“这是什么”。

### 2.2 HTML代码是什么样的

HTML的基本单位是“标签”。标签用尖括号包裹，编号为`< >`，成对排列：

```html
<h1>This is a heading</h1>
<p>This is a paragraph</p>
<a href="url">This is a link</a>
```

**关键概念**：

| 概念 | 说明 | 示例 |
|------|------|------|
| **标签** | 用尖括号包裹的标记 | `<h1>`, `</h1>` |
| **元素** | 标签及其内容的整体 | `<h1>Heading</h1>` |
| **属性** | 标签上的附加信息 | `href="url"`, `class="card"` |
| **嵌套** | 标签放置在其他标签内部 | `<div><p>Text</p></div>` |

### 2.3 如何阅读 HTML 代码

::: tip 🎯 初学者必读：如何阅读代码

许多初学者看到一堆 `<xxx>` 会头晕。实际上，阅读 HTML 代码遵循一个 **固定模式**：

**步骤 1：找到“最外层”**

```html
<div class="card">        ← This is a container, holding content inside
  <h2>Title</h2>
  <p>Description text</p>
</div>
```

**步骤 2：根据标签名猜测含义**

| 标签名 | 快速记忆 | 内部内容 |
|--------|-----------|-----------|
| `<div>` | 大盒子 | 任何内容，用于分组 |
| `<span>` | 小盒子 | 文字片段，用于标记 |
| `<p>` | 段落 | 一段文本 |
| `<h1>`-`<h6>` | 标题 | 标题文本，数字越小表示越重要 |
| `<a>` | 锚点/链接 | 可点击内容，用于导航 |
| `<img>` | 图片 | 内部没有内容，用 src 指向图片 |
| `<button>` | 按钮 | 可点击的文字/图标 |
| `<input>` | 输入框 | 内部没有内容，用户输入的位置 |

**步骤 3：查看 class 和 id**

```html
<div class="user-card" id="user-123">
```

- `class="user-card"` → 该元素的“类型”，CSS 可以批量选择它
- `id="user-123"` → 该元素的“ID 编号”，唯一标识符

**步骤 4：缩进显示层级**

```html
<body>
  <header>           ← Indentation shows header is a child of body
    <nav>            ← nav is a child of header
      <a>Home</a>    ← a is a child of nav
    </nav>
  </header>
</body>
```::: 

### 2.4 常用 HTML 标签快速参考

**结构性标签**（定义页面骨架）:

```html
<h1>This is a level-1 heading</h1>
<h2>This is a level-2 heading</h2>
<p>This is a paragraph</p>
<div>This is a container (for grouping)</div>
<span>This is an inline container (for marking text)</span>
```

**链接和媒体**（丰富页面）：

```html
<a href="https://example.com">Click here to navigate</a>
<img src="photo.jpg" alt="Photo description" />
<video src="movie.mp4" controls></video>
```

**表单**（收集用户输入）：

```html
<form>
  <input type="text" placeholder="Enter username" />
  <input type="password" placeholder="Enter password" />
  <button type="submit">Log in</button>
</form>
```

**语义标签**（HTML5新增，使页面含义更清晰）：

```html
<header>Page header</header>
<nav>Navigation bar</nav>
<main>Main content area</main>
<article>An article</article>
<aside>Sidebar</aside>
<footer>Footer</footer>
```

::: 提示 💡 为什么要使用语义标签？

`<div class="header">`和`<header>`似乎产生了相同的视觉效果，那为什么要用后者呢？

1. **SEO友好**：搜索引擎能更好地理解页面结构
2. **无障碍**：屏幕阅读器可以快速定位“导航”和“主内容”等区域
3. **代码可读性**：看到`<header>`立刻知道它是个头

**何时使用div？** 当没有合适的语义标签时。例如，纯装饰性容器。
:::

### 2.5 记忆大量HTML标签的方法

::: 小贴士 🎯 初学者困惑

“有一百多个HTML标签，我怎么可能全都记住？”

**答案：你不需要记住所有标签。** 在实际开发中，90%的情况只用大约20个标签。
:::

#### 按目的记忆

**1.页面结构（绘制骨架）**

|标签 |记忆辅助 |目的 |
|-----|-----------|---------|
|`<header>` |标题 |页面或章节的标题 |
|`<nav>` |导航 |导航链接区域 |
|`<main>` |主页 |页面的主要内容（每页仅一个） |
|`<article>` |文章 |独立内容块（单独删除仍有意义） |
|`<section>` |章节 |主题内容分组 |
|`<aside>` |旁注 |侧边栏，补充内容 |
|`<footer>` |脚 |页面或章节的页脚 |

**记忆法**：想象一份报纸——它有报头（标题）、目录（导航）、正文（主文/条目）、列（旁置）和页脚（页脚）。

**2.内容标记（澄清内容）**

|标签 |记忆辅助 |目的 |
|-----|-----------|---------|
|`<h1>`-@`<h6>` |标题1-6 |标题层级，h1是最大且最重要的|
|`<p>` |段落 |一段文字 |
|`<ul>`/`<ol>`/`<li>` |未排序/排序/清单项目 |列表 |
|`<a>` |锚点 |导航链接 |
|`<img>` |图片 |图片 |
|`<video>`/`<audio>` |视频/音频 |多媒体 |
|`<strong>`/`<em>` |强/重 |语义重 |

**记忆法**：`<a>`代表“锚”——想象一艘船在某个地点抛锚;一个链接“锚定”你到另一个页面。

**3.表单交互（收集用户输入）**

|标签 |记忆辅助 |目的 |
|-----|-----------|---------|
|`<form>` |表格 |表格容器 |
|`<input>` |输入 |各种输入字段（类型决定类型） |
|`<textarea>` |文本区域 |多行文本输入 |
|`<select>`/`<option>` |选择/选项 |下拉选题 |
|`<button>` |巴顿 |巴顿 |
|`<label>` |标签 |输入字段的描述性文本 |

**内存方法**：`<input>`@的`type`属性决定了它的外观：
- `type="text"` → 文本框
- `type="password"` → 密码框
- `type="email"` →邮箱
- `type="checkbox"` → 复选框
- `type="radio"` → 无线电按钮

**4.容器（用于分组）**

|标签 |记忆辅助 |目的 |
|-----|-----------|---------|
|`<div>` |大箱子 |区块级容器，占满一整行 |
|`<span>` |小盒子 |内联容器，只接受内容宽度 |

**内存方法**：div = 除法，span = span。div 划分大面积区域，span 标记文本片段。

#### 遇到陌生标签该怎么办？

**方法一：猜英文单词**

许多标签是英文单词的缩写：
- `<abbr>` = 缩写
- `<blockquote>` = 块状引用
- `<caption>` = 说明
- `<figcaption>` = 图解

**方法2：检查MDN**

[MDN HTML 元素参考]（https://developer.mozilla.org/en-US/docs/Web/HTML/Element） 对所有标签都有详细说明。

**方法三：问AI**

> “HTML中的`<dl>`标签是什么意思？我应该什么时候使用它？”

#### 不要故意记住标签

**真正的工作流程是这样的**：

1. 你知道你需要一个“容器” → 写 `<div>`
2. 后来你意识到它是一个“导航区域” → 改为 `<nav>`
3. 后来你意识到它是一个“独立文章” → 改为 `<article>`

**先写出来，然后优化语义**。标签可以随时更改，不必一开始就纠结使用哪个。

---

## 3. CSS：网页的皮肤

### 3.1 需要 CSS 的动机

想象你搬进了一个**毛坯公寓**：有墙、有窗、有门——可以居住，但：

- 墙是灰色混凝土，不美观
- 插座和开关随意摆放，不美观
- 没有家具，日常生活不方便

仅有 HTML 的网页就像这样：有内容和结构，但**难看**、**凌乱**、**不友好**。

CSS（层叠样式表）是网页的“装饰团队”。它不改变 HTML 结构（不拆墙、不搬门），它只负责：

- 🎨 **刷墙**：更改颜色和背景
- 🖼️ **挂画**：添加边框、阴影、圆角
- 🪑 **摆放家具**：调整布局、间距和对齐

### 3.2 CSS 代码是什么样的

CSS 代码有固定格式：

```css
selector {
  property-name: property-value;
  property-name: property-value;
}
```

**三种书写方式**：

```html
<!-- Method 1: Inline styles (for temporary testing) -->
<div style="color: red;">Red text</div>

<!-- Method 2: Internal styles (written inside the HTML file) -->
<style>
  .red-text { color: red; }
</style>

<!-- Method 3: External styles (separate CSS file, recommended) -->
<link rel="stylesheet" href="styles.css" />
```

### 3.3 如何阅读 CSS 代码

::: tip 🎯 初学者必读：如何阅读 CSS

**步骤 1：观察选择器 — “谁将被装饰？”**

| 选择器 | 语法 | 含义 |
|--------|------|------|
| 标签选择器 | `p { }` | 所有 `<p>` 标签 |
| 类选择器 | `.card { }` | 所有具有 `class="card"` 的元素 |
| ID 选择器 | `#header { }` | 唯一的 `id="header"` 元素 |
| 后代选择器 | `.card h2 { }` | `.card` 内的所有 `<h2>` |
| 组合选择器 | `.card, .box { }` | 选择 `.card` 和 `.box` |

**步骤 2：观察属性 — “装饰什么？”**

| 属性类别 | 常用属性 | 作用 |
|-----------|-----------|------|
| 文本 | `color`, `font-size`, `font-weight` | 颜色、大小、粗细 |
| 背景 | `background`, `background-color` | 背景颜色、背景图片 |
| 边框 | `border`, `border-radius` | 边框线条、圆角 |
| 间距 | `margin`, `padding` | 外边距、内边距 |
| 布局 | `display`, `flex`, `grid` | 排列方式 |

**步骤 3：观察值 — “装饰后它应该是什么样子？”**

```css
.card {
  width: 300px;        /* Fixed width */
  padding: 16px;       /* Inner padding of 16 pixels */
  border-radius: 8px;  /* Rounded corners of 8 pixels */
  background: #fff;    /* White background */
}
```

**常用单位**：
- `px`：像素，固定大小
- `%`：百分比，相对于父元素
- `rem`：相对于根元素的字体大小
- `vw/vh`：相对于视口宽度/高度
:::

### 3.4 选择器优先级

如果一个元素同时被多个选择器选中，哪一个会生效？

```html
<p class="highlight" id="special">What color is this text?</p>
```

```css
p { color: red; }             /* Specificity: 1 */
.highlight { color: yellow; } /* Specificity: 10 */
#special { color: blue; }     /* Specificity: 100 */
```

**答案**：蓝色。ID选择器具有最高的特异性，其次是类选择器，最后是标签选择器。

**内联样式**（写在 style 属性中）具有 1000 的特异性——最高！

### 3.5 盒模型：宽度不匹配的原因动机

::: 提示 🎯 现实场景

你正在构建一个网页，有三张卡片并排显示，每张卡片宽 300px，容器总宽度为 900px。你写道：

```css
.card { width: 300px; }
```

结果：**第三张卡片掉到下一行！**

**为什么？** 因为 `width: 300px` 只是内容宽度 —— 你忘记考虑内边距和边框。如果卡片有 `padding: 20px` 和 `border: 1px`，实际宽度是 342px，三张卡片 = 1026px，超过了容器！
:::

在 CSS 中，每个 HTML 元素都被视为一个“盒子”，由四层组成。想象你正在**打包一个包裹**：内容是物品，内边距是气泡膜，边框是纸箱，外边距是盒子之间的空间。

👇 **自己试试**：拖动滑块调整每一层的大小，观察盒模型是如何变化的：

<CssBoxModel />

**解决方案**:

```css
.box {
  box-sizing: border-box;  /* Make width include padding and border */
  width: 200px;
  padding: 10px;
  border: 5px;
}
```

这样，`width: 200px` 是最终宽度，填充和边框则被“挤压”在内部。

### 3.6 Flexbox：自动对齐元素的方法

Flexbox 是现代 CSS 中最常用的布局方法。它让元素自动对齐和排列，就像书架上的书自动保持对齐一样。

👇 **自己试试**：切换方向和对齐，看看盒子是如何自己排列的：

<CssFlexbox />

**灵活核心概念**：

|属性 |目的 |共同价值观 |
|----------|---------|---------------|
|`display: flex` |启用Flex布局 |- |
|`flex-direction` |主轴方向 |`row`（水平），`column`（垂直） |
|`justify-content` |主轴对准 |`flex-start`， `center`， `space-between` |
|`align-items` |横轴对准 |`stretch`， `center`， `flex-start` |
|`flex-wrap` |是否要包裹 |`nowrap`， `wrap` |
|`gap` |元素间距 |`10px`， `1rem` |

### 3.7 CSS 预处理器：SCSS/SASS 及以下

::: 提示 🎯 现实场景

你已经用一个2000行的CSS文件构建了一个项目。之后，你需要更改主题颜色，你会发现：

- 主色 `#3b82f6` 出现50次
- 更改一种颜色需要全局搜索并替换，你会担心遗漏一个
- 像`.nav .nav-list .nav-item .nav-link`这样的选择者时间长且难以维持

**CSS 预处理器**就是为了解决这些问题而被创造出来的。它们让 CSS 能够“编程”：包含变量、嵌套和可重用代码。
:::

#### 3.7.1 什么是CSS预处理器？

**通俗易懂的**：预处理器是一种“更智能的CSS”。你用更强大的语法编写样式，然后它**将其编译成浏览器能识别的常规CSS。

**为什么要用？**

|痛点 |原版CSS |预处理器 |
|------------|-------------|--------------|
|颜色处处重复 |复制粘贴到处 |定义一个变量，改变一次，它会全局应用 |
|深度选择器嵌套 |写一条长链 |嵌套语法，层级一览 |
|同样的样式重复出现 |复制粘贴 |混合，类似函数的可重复使用|

#### 3.7.2 三大预处理器比较

|功能 |原版CSS |**SCSS/SASS** |**较少** |
|---------|-------------|---------------|----------|
|**变量语法** |`--primary` |`$primary` |`@primary` |
|**嵌套语法**❌不支持 |✅支持 |✅支持 |
|**混合（代码重用）** |❌不支持 |✅`@mixin` |✅`.mixin()` |
|**学习曲线** |简单 |中等 |中等 |
|**人气** |- |⭐⭐⭐ 最受欢迎的 |⭐⭐相当受欢迎 |

**快速记忆**：
- **SCSS**：使用 `$` 符号，由 Bootstrap 5 使用，最佳生态系统
- **减少**：使用`@`符号，符合CSS `@media`语法，更易上手

#### 3.7.3 核心功能示例比较

##### 1.变量：更改一次，全局应用

**场景**：主题色`#3b82f6`在20个地方使用，需要改为红色。

<Tabs>
<TabItem label=“Vanilla CSS”>

```css
/* Need to change 20 places, easy to miss one */
.button { background: #3b82f6; }
.link { color: #3b82f6; }
.border { border-color: #3b82f6; }
```

</TabItem>
<TabItem 标签="SCSS">

```scss
$primary: #3b82f6;

.button { background: $primary; }
.link { color: $primary; }
.border { border-color: $primary; }
/* Change $primary in one place only */
```

</TabItem>
<TabItem 标签="更少">

```less
@primary: #3b82f6;

.button { background: @primary; }
.link { color: @primary; }
.border { border-color: @primary; }
/* Change @primary in one place only */
```

</TabItem>
</Tabs>

##### 2. 嵌套：一目了然的层级结构

**场景**：具有多层结构的导航栏。

<Tabs>
<TabItem label="原生 CSS">

```css
/* Written as a long chain, hard to see hierarchy */
.navbar .nav-list .nav-item .nav-link { }
.navbar .nav-list .nav-item .nav-link:hover { }
```

</TabItem>
<TabItem 标签="SCSS">

```scss
.navbar {
  .nav-list {
    .nav-item {
      .nav-link {
        &:hover { }  /* & refers to the parent selector */
      }
    }
  }
}
```

</TabItem>
<TabItem 标签="LESS">

```less
.navbar {
  .nav-list {
    .nav-item {
      .nav-link {
        &:hover { }
      }
    }
  }
}
```

</TabItem>
</Tabs>

##### 3. 混入（Mixins）：可重用的代码片段

**场景**：多个按钮都需要“居中显示”的样式。

<Tabs>
<TabItem label="原生 CSS">

```css
/* Copy-paste 3 times */
.btn-primary {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-secondary {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

</TabItem>
<TabItem 标签="SCSS">

```scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-primary { @include center; }
.btn-secondary { @include center; }
```

</TabItem>
<TabItem 标签="LESS">

```less
.center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-primary { .center(); }
.btn-secondary { .center(); }
```

</TabItem>
</Tabs>

#### 3.7.4 如何选择？

| 情况 | 建议 |
|------|------|
| 刚开始，小项目 | **原生 CSS**（先打好扎实基础） |
| 项目使用 Bootstrap 5 | **SCSS**（Bootstrap 源码是 SCSS） |
| 团队熟悉 `@` 语法 | **LESS**（与 CSS `@media` 语法一致） |
| 需要复杂逻辑（循环、条件） | **SCSS**（功能更强大） |

#### 3.7.5 在项目中使用

**Vite 项目（最简单）**:

```bash
# Install sass
npm install -D sass

# Use .scss or .less files directly
```

::: 提示 💡 初学者建议

1. **先学习原生 CSS**：预处理器只是“语法糖”——如果不理解 CSS 基础，你会更加困惑
2. **不要在小项目中强行使用**：如果你的 CSS 不到 200 行，写原生 CSS 更简单
3. **从 SCSS 开始**：语法几乎与 CSS 相同，只是添加了 `$` 变量
4. **不要嵌套太深**：超过 3 级会让代码难以维护
:::

#### 3.7.6 跨技术栈的文件组织对比

**对于同一个项目，不同技术栈的文件结构有何不同？**

<Tabs>
<TabItem label="原生 HTML CSS">

```
my-website/
├── index.html              # Page structure
├── about.html
├── css/
│   ├── reset.css           # Reset styles
│   ├── layout.css          # Layout styles
│   ├── components.css      # Component styles
│   └── style.css           # Main styles (potentially thousands of lines)
├── js/
│   └── main.js
└── images/
    └── logo.png
```

**特点**：
- CSS 集中在一个或几个文件中
- 更改样式需要在 HTML 和 CSS 文件之间切换
- 样式容易相互冲突

</TabItem>
<TabItem label="Vue   原生 CSS">

```
src/
├── components/             # Component folder
│   ├── Button/
│   │   ├── Button.vue      # Template + styles + logic
│   │   └── Button.test.js
│   ├── Header/
│   │   └── Header.vue
│   └── Footer/
│       └── Footer.vue
├── views/                  # Page folder
│   ├── Home.vue
│   └── About.vue
├── App.vue                 # Root component
└── main.js                 # Entry file
```

**Button.vue 内部结构**：```vue
<template>
  <button class="btn">Click</button>
</template>

<script>
export default { name: 'Button' }
</script>

<style scoped>              <!-- scoped styles only affect the current component -->
.btn { background: #3b82f6; }
</style>
```

</TabItem>
<TabItem 标签="Vue SCSS">

```
src/
├── assets/
│   └── styles/
│       ├── _variables.scss     # Variables: colors, spacing, etc.
│       ├── _mixins.scss        # Mixins: reusable code blocks
│       ├── _functions.scss     # Functions: color calculations, etc.
│       └── global.scss         # Global styles entry point
├── components/
│   ├── Button/
│   │   └── Button.vue          # Components use @import to bring in variables
│   └── Card/
│       └── Card.vue
├── views/
│   ├── Home.vue
│   └── About.vue
├── App.vue
└── main.js
```

**_variables.scss**：```scss
$primary: #3b82f6;
$secondary: #64748b;
$spacing-sm: 8px;
$spacing-md: 16px;
```

**Button.vue**：```vue
<style scoped lang="scss">
@import '@/assets/styles/variables';

.btn {
  background: $primary;      // Using variables
  padding: $spacing-md;
}
</style>
```

</TabItem>
<TabItem label="Vue Tailwind CSS">

```
src/
├── components/
│   ├── Button.vue          # No style block needed
│   ├── Card.vue
│   └── Header.vue
├── views/
│   ├── Home.vue
│   └── About.vue
├── App.vue
└── main.js

# Configuration files (root directory)
tailwind.config.js          # Theme configuration
tailwind.css                # Base styles entry point
```

**Button.vue**（无样式块）：```vue
<template>
  <button class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
    Click
  </button>
</template>
```

**特点**：
- 没有单独的样式文件
- 类名就是样式 (`bg-blue-500` = 蓝色背景)
- 配置集中在 `tailwind.config.js`

</TabItem>
</Tabs>

**核心差异总结**：

| 技术栈 | 样式文件位置 | 主题管理 | 代码复用 |
|--------|-----------------|-----------|---------|
| 原生 HTML CSS | 集中在 `css/` 文件夹 | 查找与替换 | 复制粘贴 |
| Vue CSS | 分散在 `.vue` 组件中 | 查找与替换 | 复制粘贴 |
| Vue SCSS | 在组件 `styles/` 共享文件中 | 使用变量统一管理 | 使用 mixin 复用 |
| Vue Tailwind | 无（在类名中） | `tailwind.config.js` | 类名组合 |

### 3.8 记忆众多 CSS 属性的方法

::: tip 🎯 初学者困惑

“有上百个 CSS 属性，我怎么能记住全部呢？”

**答案：按用途分类，记住核心属性，其他根据需要查阅。**
:::

#### 按用途记忆

**1. 文本与排版（文字的外观）**

| 属性 | 记忆方法 | 常用值 |
|------|----------|--------|
| `color` | 颜色 | `red`, `#fff`, `rgb(0,0,0)` |
| `font-size` | 字体大小 | `16px`, `1rem`, `1.5em` |
| `font-weight` | 字重 | `normal`, `bold`, `100`-`900` |
| `font-family` | 字体系列 | `"Microsoft YaHei"`, `sans-serif` |
| `line-height` | 行高 | `1.5`, `24px` |
| `text-align` | 文字对齐 | `left`, `center`, `right` |
| `text-decoration` | 文字装饰 | `none`, `underline`, `line-through` |

**记忆方法**：想象你在 Word 中排版——更改颜色、调整大小、加粗、改变字体、调整行距、对齐、添加下划线。

**2. 盒模型（元素占据的空间）**

| 属性 | 记忆方法 | 常用值 |
|------|----------|--------|
| `width`/`height` | 宽度/高度 | `100px`, `50%`, `100vw` |
| `padding` | 内边距 | `10px`, `10px 20px` |
| `margin` | 外边距 | `10px`, `auto`（用于居中） |
| `border` | 边框 | `1px solid #ccc` |
| `border-radius` | 圆角 | `4px`, `50%`（圆形） |
| `box-sizing` | 盒模型 | `border-box`（推荐） |

**记忆方法**：padding 是“内部”间距（内容到边框的距离），margin 是“外部”间距（边框到其他元素的距离）。

**简写规则**：```css
/* Four values: top right bottom left (clockwise) */
padding: 10px 20px 15px 25px;

/* Two values: top-bottom left-right */
padding: 10px 20px;

/* One value: all four directions the same */
padding: 10px;
```

**3. 背景与边框（一个元素的外观）**

| 属性 | 记忆辅助 | 常见值 |
|----------|-----------|---------------|
| `background` | 背景 | `#fff`, `url(bg.jpg)`, `linear-gradient(...)` |
| `background-color` | 背景颜色 | `#fff`, `rgba(0,0,0,0.5)` |
| `background-image` | 背景图片 | `url(photo.jpg)` |
| `background-size` | 背景大小 | `cover`, `contain`, `100%` |
| `background-position` | 背景位置 | `center`, `top left` |
| `box-shadow` | 盒子阴影 | `0 2px 10px rgba(0,0,0,0.1)` |
| `opacity` | 透明度 | `0`-`1`（0 = 完全透明）|

**记忆方法**：`background` 是一个可以一次设置多个值的简写:```css
background: #fff url(bg.jpg) no-repeat center/cover;
/*          color  image     repeat     position/size */
```

**4. 布局（元素的排列方式）**

| 属性 | 记忆辅助 | 常见值 |
|----------|-----------|---------------|
| `display` | 显示模式 | `block`, `inline`, `flex`, `grid`, `none` |
| `position` | 定位方式 | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| `top`/`right`/`bottom`/`left` | 四个方向 | `10px`, `50%`（与定位一起使用） |
| `z-index` | 堆叠顺序 | 数值越大 = 越在上面 |
| `float` | 浮动 | `left`, `right`（遗留，不推荐） |
| `overflow` | 溢出处理 | `visible`, `hidden`, `scroll`, `auto` |

**定位记忆方法**:
- `static`：默认，正常文档流
- `relative`：相对于原始位置的偏移
- `absolute`：相对于最近的已定位祖先元素
- `fixed`：相对于视口定位（滚动时不移动）
- `sticky`：滚动到某一点后固定位置

**5. 弹性盒布局（一维布局利器）**

| 属性 | 记忆辅助 | 作用 |
|----------|-----------|---------|
| `display: flex` | 启用弹性布局 | 容器变为 Flex 容器 |
| `flex-direction` | 方向 | `row`（水平）、`column`（垂直） |
| `justify-content` | 主轴对齐 | 元素在主轴上的排列方式 |
| `align-items` | 交叉轴对齐 | 元素在交叉轴上的对齐方式 |
| `flex-wrap` | 换行 | `nowrap`, `wrap` |
| `gap` | 间隙 | 元素之间的间距 |
| `flex` | 弹性比例 | 子元素的增长/缩小比例 |

**记忆方法**:
- `justify` = justify/align → 主轴对齐
- `align` = align → 交叉轴对齐

**6. 动画与过渡（元素的运动方式）**

| 属性 | 记忆辅助 | 常见值 |
|----------|-----------|---------------|
| `transition` | 过渡 | `all 0.3s ease` |
| `transform` | 变换 | `translate(10px)`, `rotate(45deg)`, `scale(1.1)` |
| `animation` | 动画 | `fadeIn 1s ease forwards` |

**简写规则**:```css
/* transition: property duration timing-function delay */
transition: all 0.3s ease 0s;

/* transform can combine multiple transformations */
transform: translateX(10px) rotate(45deg) scale(1.1);
```

#### 遇到不熟悉的属性时怎么办？

**方法 1：猜英文单词**

许多属性是英文单词或缩写：
- `margin` = 边距, 边缘
- `padding` = 内边距, 填充
- `border` = 边框, 界限
- `visibility` = 可见性
- `cursor` = 光标

**方法 2：通过场景联想**

当你想要实现某个效果时，想一下“关键词”:

| 我想要... | 可能的属性 |
|-------------|---------------------|
| 改变颜色 | `color`, `background-color`, `border-color` |
| 改变大小 | `width`, `height`, `font-size` |
| 改变位置 | `margin`, `position`, `top/left` |
| 改变间距 | `padding`, `margin`, `gap` |
| 隐藏一个元素 | `display: none`, `visibility: hidden`, `opacity: 0` |
| 居中 | `margin: auto`, `text-align: center`, `justify-content: center` |
| 添加圆角 | `border-radius` |
| 添加阴影 | `box-shadow`, `text-shadow` |
| 添加动画 | `transition`, `animation` |

**方法 3：查 MDN 或问 AI**

[MDN CSS 参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) 对所有属性都有详细说明。

> “我如何在 CSS 中让文本显示在一行，并在溢出时显示省略号？”

**方法 4：用 DevTools “学习借鉴”**

当你看到某个网页效果喜欢时：
1. 右键 → “检查”
2. 选择元素，查看样式面板
3. 直接复制 CSS 属性

#### 不要刻意去背属性

**真正的工作流程是这样的**:

1. 你知道你想要“居中” → 搜索“CSS 居中”
2. 复制代码，调整数值
3. 使用足够多次后，你就会记住它

**推荐学习路径**:

1. **先掌握盒模型**: `width`, `height`, `padding`, `margin`, `border`
2. **再掌握 Flexbox**: `display: flex`, `justify-content`, `align-items`
3. **再掌握定位**: `position`, `top/left`, `z-index`
4. **最后学习动画**: `transition`, `transform`, `animation`

需要时查其他属性；使用足够多次后，你自然会记住它们。

---

## 4. JavaScript：网页的大脑

### 4.1 为什么需要 JavaScript

只有 HTML 和 CSS 的网页就像**橱窗里的模特**：

- ✅ 看起来漂亮 (CSS)
- ✅ 结构清晰 (HTML)
- ❌ 但如果和它说话，它不会回应
- ❌ 按按钮也没有任何反应

**JavaScript** 将网页从“模特”变成“真人”：

- ✅ 点击按钮，会弹出提示框
- ✅ 输入文本，可实时检查格式
- ✅ 滚动页面，会加载更多内容
- ✅ 提交表单，会显示“提交中...”

### 4.2 JavaScript 代码是什么样的

**能力 1：记住数据** (变量)

```javascript
let userName = 'John'
let isLoggedIn = true
let cartCount = 5
```

**能力 2：重复做事情**（功能）

```javascript
function sayHello(name) {
  return 'Hello, ' + name + '!'
}

console.log(sayHello('John'))  // Output: Hello, John!
```

**能力 3：响应事件**（事件监听器）

```javascript
button.addEventListener('click', function() {
  alert('The button was clicked!')
})
```

**能力 4：修改页面**（DOM 操作）

```javascript
document.getElementById('title').textContent = 'New Title'
document.getElementById('box').style.background = 'red'
```

### 4.3 如何阅读 JavaScript 代码

::: tip 🎯 初学者必读：如何阅读 JS 代码

**步骤 1：找到变量 — “正在被记住的是什么？”**

```javascript
const API_URL = 'https://api.example.com'  // Constant, won't change
let count = 0                                // Variable, can change
const user = { name: 'John', age: 25 }       // Object, multiple data points
const items = ['Apple', 'Banana', 'Orange']  // Array, list data
```

**步骤 2：寻找功能 — “它能做什么？”**

```javascript
// Function names usually hint at their purpose
function handleClick() { }      // Handle clicks
function fetchData() { }        // Fetch data
function validateForm() { }     // Validate forms
```

**步骤3：查找事件 — “它什么时候触发？”**

```javascript
button.addEventListener('click', handleClick)     // On click
input.addEventListener('input', validateForm)     // On input
window.addEventListener('scroll', loadMore)       // On scroll
```

**步骤4：查找DOM操作 — “发生了什么变化？”**

```javascript
element.textContent = 'New content'     // Change text
element.classList.add('active')         // Add a style class
element.style.display = 'none'          // Hide the element
parent.appendChild(child)               // Add an element
```::: 

### 4.4 DOM：用于 JavaScript 操作页面的方法

在浏览器读取 HTML 代码之后，它不会将它们视为一堆字符串。相反，它会在内存中将它们绘制成一个“树”:

```
Document
    ↓
<html>
    ├─<head>
    │   └─<title>My Web Page</title>
    └─<body>
        ├─<h1>Welcome</h1>
        └─<div class="card">
            ├─<img src="photo.jpg">
            └─<p>A paragraph of text</p>
```

这棵树被称为 **DOM 树**。每个 HTML 标签都是这棵树上的一个“节点”。

**如何查找节点？**

```javascript
// By ID (fastest, unique)
const element = document.getElementById('header')

// By selector (most common)
const element = document.querySelector('.card h2')    // Find the first one
const elements = document.querySelectorAll('button')  // Find all

// By relationship
element.parentNode           // Find parent node
element.children             // Find child nodes
element.nextElementSibling   // Find next sibling
```

**性能警告**：DOM 操作是**昂贵的**。每次修改 DOM 时，浏览器都必须重新计算布局并重绘。

```javascript
// ❌ Inefficient: Loop 1000 times, operating on the DOM each time
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(createDiv())
}

// ✅ Efficient: Assemble first, then insert all at once
const fragment = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createDiv())
}
document.body.appendChild(fragment)
```

这正是现代框架如 **Vue / React** 诞生的原因：它们在内存中操作“虚拟 DOM”，计算最小的变更集，然后才操作真实 DOM。

👇 **自己试试**：基本 DOM 操作方法：

<DomManipulator />

### 4.5 ECMAScript：JavaScript 版本的演变

**ECMAScript** 是 JavaScript 的“标准规范”。浏览器厂商根据这一标准实现 JavaScript 引擎。

#### 为什么版本号很重要？

JavaScript 并非静态。每年都会添加新功能并修复问题。版本号告诉你“这个浏览器支持哪些功能”。

#### 重要版本一览

| 版本 | 年份 | 关键功能 | 解决的问题 |
|---------|------|-------------|------------------------|
| **ES5** | 2009 | 严格模式, `forEach`/`map`/`filter` | 规范化语言, 添加数组方法 |
| **ES6/ES2015** | 2015 | `let/const`, 箭头函数, `class`, `Promise`, 模块 | 最大的更新, 现代 JS 的起点 |
| **ES2016** | 2016 | `includes()`, `**` 幂运算 | 小更新 |
| **ES2017** | 2017 | `async/await`, `Object.entries()` | 异步代码更易读 |
| **ES2018** | 2018 | `...` 展开操作符, `Promise.finally()` | 对象和异步增强 |
| **ES2020** | 2020 | 可选链 `?.`, 空值合并 `??`, `BigInt` | 安全访问嵌套属性 |
| **ES2021** | 2021 | `replaceAll()`, 逻辑赋值 `??=` | 字符串和赋值增强 |
| **ES2022** | 2022 | 顶层 `await`, `.at()` 索引 | 更容易加载异步模块 |

#### 最常用的 ES6 语法

**1. `let` 和 `const` 代替 `var`**

```javascript
// ❌ Old way: var has hoisting, prone to bugs
var name = 'John'
if (true) {
  var name = 'Jane'  // Overwrites the outer name
}
console.log(name)  // 'Jane', not the expected result

// ✅ New way: let has block scope
let name = 'John'
if (true) {
  let name = 'Jane'  // Only valid inside this if block
}
console.log(name)  // 'John', as expected

// ✅ const: Cannot be reassigned after declaration
const PI = 3.14159
PI = 3  // Error! Prevents accidental modification
```

**2. 箭头函数：更简洁的函数语法**

```javascript
// ❌ Old way
const add = function(a, b) {
  return a + b
}

// ✅ New way
const add = (a, b) => a + b

// Arrow functions bind this to the enclosing scope
const obj = {
  name: 'John',
  // ❌ Regular function: this points to the caller
  oldWay: function() {
    setTimeout(function() {
      console.log(this.name)  // undefined
    }, 100)
  },
  // ✅ Arrow function: this inherits from obj
  newWay: function() {
    setTimeout(() => {
      console.log(this.name)  // 'John'
    }, 100)
  }
}
```

**3. 解构赋值：从对象/数组中提取数据**

```javascript
// Object destructuring
const user = { name: 'John', age: 25, city: 'Beijing' }
const { name, age } = user  // Direct extraction
console.log(name)  // 'John'

// Array destructuring
const colors = ['red', 'green', 'blue']
const [first, second] = colors
console.log(first)  // 'red'

// Function parameter destructuring
function greet({ name, age }) {
  console.log(`${name} is ${age} years old`)
}
greet(user)  // 'John is 25 years old'
```

**4. 模板字面量：轻松进行字符串拼接**

```javascript
// ❌ Old way: A mess of quotes and plus signs
const msg = 'User ' + name + ' is ' + age + ' years old'

// ✅ New way: Backticks + ${}
const msg = `User ${name} is ${age} years old`

// Also supports multi-line
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`
```

**5. `async/await`：像同步代码一样编写异步代码**

```javascript
// ❌ Callback hell
fetchUser(function(user) {
  fetchOrders(user.id, function(orders) {
    fetchDetails(orders[0].id, function(details) {
      console.log(details)
    })
  })
})

// ✅ async/await
async function getUserData() {
  const user = await fetchUser()
  const orders = await fetchOrders(user.id)
  const details = await fetchDetails(orders[0].id)
  console.log(details)
}
```

**6. 可选链 `?.` 和空值合并 `??`**

```javascript
const user = {
  name: 'John',
  address: {
    city: 'Beijing'
  }
}

// ❌ Old way: Layer-by-layer checks
const street = user && user.address && user.address.street
const streetName = street !== undefined ? street : 'Unknown'

// ✅ New way: Optional chaining + nullish coalescing
const streetName = user?.address?.street ?? 'Unknown'
```

::: 提示 💡 如何了解浏览器支持哪些功能？

1. **查看兼容性表**：[caniuse.com](https://caniuse.com/) — 输入功能名称
2. **使用构建工具**：Babel 可以将新语法转换为旧浏览器可理解的代码
3. **了解你的目标用户**：如果你只支持现代浏览器，大多数 ES6 功能可以直接使用
:::

### 4.6 TypeScript：为 JavaScript 添加类型约束

#### 为什么我们需要 TypeScript？

**场景 1：函数参数类型不确定**

```javascript
// JavaScript
function calculateTotal(price, quantity) {
  return price * quantity
}

calculateTotal(100, 5)      // 500 ✅
calculateTotal('100', 5)    // '1005' ❌ String concatenation, not multiplication
calculateTotal(100, '5')    // 500 ✅ But this is just luck
```

JavaScript 不会告诉你参数类型错误，直到你在运行时发现问题。

**场景 2：对象属性拼写错误**

```javascript
// JavaScript
const user = {
  name: 'John',
  age: 25
}

console.log(user.nmae)  // undefined, typo but no error
```

**TypeScript 解决这些问题**：

```typescript
// TypeScript
interface User {
  name: string
  age: number
}

function greet(user: User) {
  console.log(`Hello, ${user.name}`)
  console.log(user.nmae)  // ❌ Compile-time error: Property 'nmae' does not exist
}

greet({ name: 'John', age: 25 })        // ✅
greet({ name: 'John', age: '25' })      // ❌ Compile-time error: age should be number
greet({ name: 'John' })                 // ❌ Compile-time error: missing age
```

#### TypeScript 的核心概念

**1. 基本类型**

```typescript
let name: string = 'John'
let age: number = 25
let isActive: boolean = true
let anyValue: any = 'Can be any type'  // Not recommended, defeats the purpose of type checking
```

**2. 接口：定义对象结构**

```typescript
interface Product {
  id: number
  name: string
  price: number
  discount?: number  // Optional property
  readonly createdAt: Date  // Read-only property
}

const product: Product = {
  id: 1,
  name: 'iPhone 15',
  price: 6999,
  createdAt: new Date()
}
```

**3. 类型别名**

```typescript
type ID = string | number  // Union type
type Status = 'pending' | 'approved' | 'rejected'  // Literal type

function updateStatus(id: ID, status: Status) {
  // ...
}

updateStatus(1, 'approved')      // ✅
updateStatus('abc', 'pending')   // ✅
updateStatus(1, 'processing')    // ❌ 'processing' is not a valid Status
```

**4. 泛型：可重用类型**

```typescript
// Without generics: Write once per type
function getFirstNumber(arr: number[]): number {
  return arr[0]
}
function getFirstString(arr: string[]): string {
  return arr[0]
}

// With generics: One function handles it all
function getFirst<T>(arr: T[]): T {
  return arr[0]
}

getFirst([1, 2, 3])        // Returns number
getFirst(['a', 'b', 'c'])  // Returns string
```

#### TypeScript 与 JavaScript 对比

| 功能 | JavaScript | TypeScript |
|---------|------------|------------|
| 类型检查 | 运行时发现错误 | 编译时发现错误 |
| IDE 支持 | 基本提示 | 智能自动完成、重构、跳转定义 |
| 学习曲线 | 容易 | 需要学习类型系统 |
| 适用场景 | 小型项目、原型 | 大型项目、团队协作 |
| 运行方式 | 浏览器直接运行 | 需要编译为 JavaScript |

#### TypeScript 在实际开发中的应用

```typescript
// API response type definition
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

interface User {
  id: number
  name: string
  email: string
}

// Typed API request
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// IDE will hint all properties when using
fetchUser(1).then(res => {
  console.log(res.data.name)   // ✅ IDE autocomplete
  console.log(res.data.nmae)   // ❌ Compile-time error
})
```

::: 提示 💡 初学者建议

1. **先好好学习 JavaScript**：TypeScript 是 JS 的超集；如果不了解 JS 就学 TS 会很痛苦
2. **不要在小项目上强行使用 TS**：类型定义会增加代码量，使简单项目变得更复杂
3. **从 JSDoc 过渡**：在 JS 文件中编写 `/** @type {User} */` 注释以体验类型提示
4. **使用 `any` 是折中方案，而不是解决方案**：当遇到类型问题时，先尝试解决它，而不是直接使用 `any`
:::

### 4.7 现代 JavaScript 开发工具链

::: 提示 🎯 为什么我们需要工具链？

浏览器只理解 HTML/CSS/JS。但在现代开发中，我们使用：

- **TypeScript**：浏览器不理解，需要编译成 JS
- **SCSS/Less**：浏览器不理解，需要编译成 CSS
- **模块**：`import/export` 需要打包成单个文件
- **新语法**：ES6 需要转换成旧浏览器支持的代码

工具链将“开发时代码”转换为“浏览器可运行代码”。
:::

**核心工具**：

| 工具 | 目的 | 类比 |
|------|---------|---------|
| **Node.js** | JavaScript 运行时 | 让 JS 能在浏览器外运行 |
| **npm/yarn/pnpm** | 包管理器 | 下载其他人写的代码库 |
| **Vite/Webpack** | 构建工具 | 将源代码打包成浏览器可运行的代码 |
| **Babel** | 编译器 | 将新语法转换为旧语法 |
| **ESLint** | 代码检查工具 | 查找代码问题和风格不一致 |

**典型的开发工作流程**:

```bash
# 1. Initialize the project
npm create vite@latest my-app -- --template vue-ts

# 2. Install dependencies
cd my-app
npm install

# 3. Development mode (hot reload)
npm run dev

# 4. Build for production
npm run build
```

---

## 5. 三者如何协作

### 5.1 分工

| 角色 | 负责内容 | 不做的事 | 典型示例 |
|------|----------------|------------|-----------------|
| **HTML** | 定义结构和语义 | 不处理样式/交互 | `<section><h1>Title</h1></section>` |
| **CSS** | 控制外观和布局 | 不处理逻辑/数据 | `.card { background: white; }` |
| **JavaScript** | 处理交互和逻辑 | 不定义结构 | `button.onclick = () => alert()` |

### 5.2 一个完整的协作示例

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* CSS: Make the card look good */
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      max-width: 300px;
    }
    .card button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <!-- HTML: Define the card structure -->
  <div class="card">
    <h2 id="title">Click the Button</h2>
    <button id="btn">Click Me</button>
  </div>

  <script>
    // JavaScript: Make the button clickable
    const btn = document.getElementById('btn')
    const title = document.getElementById('title')

    btn.addEventListener('click', function() {
      title.textContent = 'Clicked!'
      alert('Title has been changed')
    })
  </script>
</body>
</html>
```

---

## 6.遇到陌生代码时该怎么办

### 6.1 问AI

> “HTML中的`<aside>`标签是什么意思？我应该什么时候使用它？”
>
> “`position: sticky`在CSS中有什么影响？”

### 6.2 检查MDN

[MDN 网络文档]（https://developer.mozilla.org/） 是最权威的网络技术文档。当你遇到陌生的标签、属性或方法时，只需搜索即可。

### 6.3 浏览器开发者工具

1. 右键点击页面元素→“检查”
2. 查看**元素**面板中的HTML结构
3. 参见 **Styles** 面板中的 CSS 样式
4. 在**控制台**面板中执行JS代码

### 6.4 常见CSS属性快速参考

|如果你看到这个 |它的作用 |
|-----------------|--------------|
|`display: flex` |启用Flexbox布局 |
|`position: absolute` |绝对定位 |
|`z-index: 100` |堆叠顺序，数字较高 = 在顶部 |
|`overflow: hidden` |隐藏溢出的内容 |
|`cursor: pointer` |将鼠标光标切换为手 |
|`transition: all 0.3s` |动画过渡效果 |
|`box-sizing: border-box` |宽度包含填充和边框 |

---

## 7.术语表

|术语 |全名 |通俗英语说明 |
|------|-----------|---------------------------|
|**HTML** |超文本标记语言 |一种使用标签描述网页结构的标记语言 |
|**CSS** |层叠样式表 |控制颜色、布局和动画 |
|**JavaScript** |JavaScript |网络编程语言，负责交互和逻辑 |
|**DOM** |文档对象模型 |将页面表示为对象树 |
|**Flexbox** |灵活盒布局 |一维布局方案，易于对齐和分布 |
|**框模型** |CSS框模型 |每个元素从内容到外缘的分层框 |
|**SCSS** |Sassy CSS |一个支持变量、嵌套和混合的 CSS 预处理器 |
|**TypeScript** |TypeScript |JavaScript 的超集，添加了类型系统 |
|**ES6** |ECMAScript 2015 |JavaScript 的一个主要版本，增加了许多新的语法特性 |
|**语义** |语义HTML |使用有意义的标签（如标题）代替 div |
|**响应式设计**响应式设计 |自动适应不同屏幕尺寸的设计 |

---

## 摘要

现在你知道了：**HTML 定义骨架，CSS 负责外观，JavaScript 赋予它灵魂**。

这三者是网页开发的基石。理解它们意味着你可以：

- 读取任何网页的源代码（右键点击→“查看页面源代码”）
- 修改他人网页（浏览器开发工具→元素）
- 开始学习前端框架（Vue/React），这些框架都是建立在这三者之上

**下一步**：

- 如果你想快速构建网页，学习**Vue**或**React**框架
- 如果你想深入了解CSS，可以学习**Flexbox**和**Grid**布局
- 如果你想提升代码质量，学习 **TypeScript**