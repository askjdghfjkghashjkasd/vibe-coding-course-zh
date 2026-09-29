# 前端框架的原理

> **学习指南**：本文回答一个根本性的问题——**前端框架（Vue、React、Svelte 等）到底做什么？** 如果你只学过 HTML、CSS 和一点点 JavaScript，也完全没问题——我们会从最基础开始。

在开始之前，请确保你了解以下两个基本概念。如果不确定，可以先查看对应章节：

- **HTML**：网页的骨架，定义页面上有哪些元素（标题、段落、按钮、图片……）。参见 [HTML 和 CSS 布局](./html-css-layout.md)。
- **JavaScript**：让网页“活起来”的编程语言，能够修改页面内容并响应用户操作。参见 [JavaScript 深入](./javascript-deep-dive.md)。

还有一个概念在后面会频繁出现，所以在这里我们完整说明一下。

### DOM 概览

DOM 代表文档对象模型（Document Object Model）。

当你在浏览器中打开网页时，浏览器首先会读取 HTML 代码。读取后，浏览器不会直接用 HTML 文本来显示页面，而是**先把 HTML 代码转换成树状结构**并储存在内存中。这棵树叫做 DOM 树。

树上的每个节点（Node）对应一个 HTML 标签。标签之间的嵌套关系变成 DOM 树中的父子关系。

👇 **试试看**：
将鼠标悬停在左侧的 HTML 代码上，对应的 DOM 树右侧节点会高亮显示。反过来也一样，每行 HTML 标签都对应 DOM 树上的一个节点。

<WhatIsDomDemo />

**为什么要理解 DOM？** 因为 JavaScript 修改页面的方式就是操作这棵 DOM 树——增加节点、删除节点、修改节点内容。而前端框架的核心工作就是帮助你自动化这些 DOM 操作。后面我们会多次提到 DOM——理解它是理解框架原理的基础。

---

## 0. 前言：“前端框架”概览

首先解释一下“框架”这个词。在编程中，**框架（Framework）**是一套预先写好的代码和规则，规定你的代码应该如何组织和运行。你按照其规范写代码，它会帮你处理大量重复繁琐的底层工作。

**前端框架**是专门帮助你**构建网页界面**的框架。如今最常见的有 Vue、React、Svelte 和 Angular。

那么它们到底解决了哪些问题呢？这三张卡片总结了核心逻辑：

<FrameworkMotivationDemo />

我们一步步展开，从最基本的问题开始。

---

## 1. 核心问题：数据变化的准则，UI 会发生什么

### 1.1 先弄清楚“数据”和“UI”是什么

在任何 web 应用中，同时存在两类事物：

- **数据（Data / 状态 State）**：程序内部存储的信息。例如“购物车里有 3 件商品”、“用户名是张三”、“第二个标签页当前被选中”。这些数据在 JavaScript 变量中存在，用户无法直接看到。
- **UI（用户界面 User Interface）**：用户在屏幕上看到的内容。例如页面显示“购物车（3）”、显示“欢迎，张三”，并且第二个标签页被高亮。它们是由 HTML 元素呈现出的视觉效果。

**数据和界面之间存在对应关系**：如果数据是“3 个项目”，界面应显示“3”。如果数据变为“4 个项目”，界面也应随之更改为“4”。

问题是：**谁负责这个“跟随变化”的过程？**

👇 **试着点击**：
点击“添加项目”按钮，你会注意到：数据（左侧）已经改变，但界面（右侧）并没有随之更新——它们是“脱节”的。”点击“同步界面”即可手动修复。

<DataUIGapDemo />

### 1.2 为什么 JavaScript 变量变化不会自动更新界面

这是初学者最困惑的部分，所以我们一步步解释其基本原理。

在 JavaScript 中，变量只是用来存储数据的一块内存空间。当你执行 `count = count + 1` 时，JavaScript 引擎做了一件非常简单的事情：将内存中 count 的值从 3 改为 4。**完成这一步之后，其他什么也不会发生。**

页面上显示的内容（如 DOM 节点 `<span>3</span>`）存储在完全不同的内存块中。当 JavaScript 引擎修改变量时，它并不知道页面上的 DOM 节点正在显示该变量的值，也没有任何机制来检查这一点。

所以根本原因是：**JavaScript 变量和 DOM 节点是两个独立的内存块，它们之间没有自动关联机制。**修改变量只会改变变量所在的内存，DOM 节点所在的内存完全不受影响。

```javascript
let count = 3

// There's a DOM node on the page displaying count's value:
// <span id="counter">3</span>

count = 4
// What did the JavaScript engine do?
//   → Changed the value of variable count in memory from 3 to 4
//   → Done. That's it.
// The <span> on the page still shows "3"
```

如果你希望页面上的显示也变为“4”，你必须**编写额外的代码**来手动查找该DOM节点，然后修改其内容：

```javascript
count = 4  // Step 1: Change the variable

// Step 2: You must write this yourself — find the DOM node, change its text
document.getElementById('counter').textContent = count
```

如果页面上有5个地方显示 count 的值（购物车数量、产品列表、总价、小计、状态指示器），你需要写5个这样的代码块。**漏掉任何一个，该位置仍然会显示旧的值——用户看到的是错误的信息。**

### 1.3 框架是如何通过两步建立自动连接的


框架可以自动同步，依赖于**两个协调步骤**——缺一不可。

**第一步：你需要在模板中“注册”哪些地方应该显示这个变量**

在框架的 HTML 模板中，你使用 `{{ count }}` 这样的语法来标记“在这里显示 count 的值”：

```html
<!-- Vue template -->
<span>Shopping Cart: {{ count }} items</span>    <!-- Position A: I want to display count -->
<span>Total: ¥{{ count * 99 }}</span>   <!-- Position B: I also use count -->
<span>{{ count > 5 ? 'Too many' : 'Normal' }}</span>  <!-- Position C: I also use count -->
```

当框架首次渲染页面时，它会记录这个“注册关系”：**位置 A、B 和 C 都依赖于 count**。

**第二步：框架监控该变量，当它发生变化时，会检查注册表并自动更新**

框架使用 JavaScript 内置的 `Proxy` 来“包装”你的变量，使其成为一个“受监控的变量”。当你修改这个变量时，Proxy 在赋值的同时会悄悄执行额外操作：它会通知框架“count 已更改”。在收到通知后，框架会检查第一步中的注册表，并更新位置 A、B 和 C。

```
Native JS:
  You write HTML → <span id="counter">3</span> (no connection to variable)
  You change variable → count = 4 → Done, no UI reaction
  You manually add → document.getElementById('counter').textContent = 4 → UI updates

Vue Framework:
  You write template → <span>{{ count }}</span> (framework remembers: this depends on count)
  You change variable → count = 4 → Proxy intercepts → notifies framework → framework checks registration table → auto-updates A/B/C
```

这就是为什么“只有框架可以自动同步”——因为原生 HTML 的 `<span>` 与 JS 变量之间本质上没有连接。框架的模板语法 (`{{ }}`) 是建立这种连接的关键。当你写 `{{ count }}` 时，框架知道这个位置应该显示 count；只有这样，当 count 发生变化时框架才能精确地找到并更新它。

👇 **试着点击**：
先选择“原生 JavaScript”，点击“执行”，你会注意到变量改变了但 UI 没有动；你需要逐步手动同步每个位置。然后切换到“使用框架”并再次点击“执行”——一旦变量变化，框架会自动完成所有步骤，UI 会立即同步。

<WhyNoAutoSyncDemo />

### 1.4 对比：手动同步 vs 自动同步的实践

在理解原理后，让我们看看在稍微复杂一点的场景中，手动同步与自动同步的差别有多大。

👇 **试着点击**：
左侧显示的是“手动同步”方式，没有使用框架——每个显示区域，你都需要单独点击“同步”按钮来更新。右侧显示的是使用框架的“自动同步”方式——你只需点击“添加项目”，所有显示区域会自动更新。尝试故意不在左侧同步某个区域，看看会发生什么。

<ManualVsAutoSyncDemo />

**这就是前端框架存在的根本原因：为 JavaScript 变量增加“修改时自动通知 UI 更新”的能力，消除手动同步造成的错误。**

---

## 2. 框架的核心理念：用数据描述 UI

### 2.1 两种方法的区别

在理解了“自动同步”的价值后，让我们看看框架是如何具体实现的。

在框架出现之前（比如使用 jQuery），代码是这样写的——你一步步告诉浏览器该做什么：

```javascript
// Step 1: Find the element with id "counter" on the page
var element = document.getElementById('counter')
// Step 2: Change this element's text content to the new value
element.textContent = '4'
// Step 3: Find another element, change it too
document.getElementById('total').textContent = '¥396'
// Step 4: If quantity is greater than 5, also change the status indicator...
```

这种方法叫做**命令式**——你是在“命令”浏览器逐步执行操作。

使用框架，代码就变成这样——你只需要描述“UI 应该是什么样子”：

```html
<!-- I don't care how this value gets updated on the page -->
<!-- I'm just saying: this should display count's value -->
<span>{{ count }}</span>
<span>Total: ¥{{ count * 99 }}</span>
<span v-if="count > 5">Too many items!</span>
```

这种方法称为 **声明式** — 你是在“声明” UI 的最终状态，而框架处理如何达到该状态。

### 2.2 核心公式：UI = f(状态)

所有现代前端框架——无论是 Vue、React 还是 Svelte——都遵循相同的核心理念，可以用公式表示为：

> **UI = f(状态)**

这个公式的意思是：

- **状态 (State)**：你的应用数据。那些 JavaScript 变量：购物车中有多少商品、用户是否已登录、当前页面是哪一个……
- **f（函数）**：框架的渲染机制。它知道如何将数据转换为 UI。
- **UI**：用户最终在屏幕上看到的结果。

**含义**：给定一组数据（状态），经过框架的处理（f），你可以确定性地得到对应的 UI。当数据变化时，UI 会随之变化。开发者只需要关心数据，而不需要关心 UI 如何更新。

👇 **试着点击一下**：
修改左侧的数据（状态），观察右侧 UI 如何自动变化。这是 `UI = f(State)` 的直观体现。

<DeclarativeFormulaDemo />

### 2.3 声明式相比命令式的动机

声明式编写的优势在于：

| 对比维度 | 命令式（无框架） | 声明式（有框架） |
| :--- | :--- | :--- |
| **代码量** | 必须为每次更新写具体操作代码 | 模板写一次，框架自动处理 |
| **错误概率** | 容易漏更新某个位置 | 框架确保所有位置都更新 |
| **可读性** | 代码里混杂大量 DOM 操作 | 代码清晰描述 UI 结构 |
| **维护成本** | 修改一个功能需要改很多地方 | 只需修改数据逻辑，UI 自动跟随 |

简单来说：声明式让你专注于“业务逻辑”（数据如何变化），而无需担心重复且易错的“如何更新 UI”的工作。

---

## 3. 响应式系统：让框架知道数据变化的方法

### 3.1 “响应式”概述

前面我们说过“当数据变化时，UI 会自动更新”。但有一个技术问题：**JavaScript 本身没有“变量修改时自动通知其他方”的能力。**

当你写 `count = 4` 时，JavaScript 只是把 count 的值从 3 改为 4，并不会自动告诉任何人。框架需要一个机制来“检测”你何时修改了数据。

**响应式** 是这个机制的总称：当数据变化时，系统可以自动感知变化并执行相应的更新操作。

### 3.2 三种不同的实现方式

不同框架使用不同的技术来实现响应式，这也是 Vue、React 和 Svelte 最根本的差异。

**方式一：Proxy 拦截（Vue 的方式）**

Vue 使用 JavaScript 内置的 `Proxy` 机制。`Proxy` 可以在你读取或修改对象属性时自动执行你指定的代码。

Vue 用 `Proxy` 包装你的数据对象。当你执行 `count = 4` 时，`Proxy` 会拦截这个写操作并通知 Vue：“count 的值已改变”。Vue 然后更新所有使用 `count` 的 UI 部分。

作为开发者，你无需做额外操作——只需直接赋值，Vue 会自动感知。

**方式二：显式调用（React 的方式）**

React 不使用 `Proxy`。它要求你通过专用函数修改数据：

```javascript
// React's approach
const [count, setCount] = useState(0)

// Can't just write count = 4 (React won't sense it)
// Must call setCount:
setCount(4)
```

只有当你调用`setCount()`时，React才知道数据发生了变化，并会更新UI。如果你直接写`count = 4`，React不会知道，UI也不会更新。

这种方法更“明确”——每一次数据变更都要主动告知框架，防止意外更新。

**方法三：编译器分析（Svelte方法）**

Svelte 走的是完全不同的路线。它有一个编译器，会在运行前分析你的源代码。

当编译器看到你写了像 `count += 1` 这样的赋值时，它会自动在那一行后插入代码，“通知界面更新”。换句话说，当代码运行时，“通知”动作已经被编译器预先安排好了。

你的代码看起来像普通的JavaScript赋值，但编译后的代码包含了额外的UI更新逻辑。

👇 **试着点击**：
选择不同的框架标签页，点击“修改数据”，观察每个框架在“底层”中经过了哪些步骤来检测数据变更并更新界面。

<反应机制演示 />

### 3.3 三种方法的比较

|比较维度 |Vue（代理） |React（显式调用）|Svelte（编译器） |
|:--- |:--- |:--- |:--- |
|**开发者写作风格** |直接指派 `count = 4` |必须使用 `setCount(4)` |直接指派 `count = 4` |
|**检测到变更时**运行时自动拦截 |开发者主动通知 |编译器预插入通知代码 |
|**运行时性能开销** |代理有轻微的拦截开销 |setState调度有轻微开销 |几乎没有额外开销 |
|**调试难度**中等 |数据流清晰，相对简单 |需要理解编译代码 |
|**合适场景** |追求开发效率与自然语法 |追求可预测的数据流 |追求最终运行时性能 |

这三种方法没有绝对的优劣。Vue 是最自然的编写方式，React 的数据流最可控，Svelte 运行时性能最佳。选择哪种取决于项目的具体需求。

---

## 4.组件：将用户界面拆分为可重复使用的小块

### 4.1 分裂的动机

一个完整的网页可能包含导航栏、侧边栏、内容区、搜索框、用户头像、各种按钮......如果所有代码都集中在一个文件里，那个文件会变得非常长且难以维护。

**组件**是将界面拆分成独立的小部分，每个部分管理自己的数据、自己的界面和逻辑。

例如，电子商务页面可以拆分为以下几个部分：

- `NavBar` 组件：负责顶部导航栏
- `SearchBox` 组件：负责搜索框
- `ProductCard` 组件：负责一张产品卡
- `ShoppingCart` 组件：负责购物车

每个组件都是独立的。`ProductCard` 不需要知道 `NavBar` 里的代码——它只需要管理自己。

### 4.2 组件的三大优点

**好处一：重复使用。** 一旦写入 `ProductCard` 组件，它可以在页面上使用 100 次——每次传递不同的产品数据时，它都会渲染出不同的产品卡。无需复制粘贴 100 份 HTML 代码。

**优点二：封装。** 组件内部的数据和逻辑是独立的。修改`SearchBox`组件的代码不会影响`ProductCard`组件。当多人协作时，不同的人可以同时开发不同的组件而互不干扰。

**优点三：可维护性。** 当某个功能出现问题时，你可以直接定位到对应的组件进行修复，而不需要在数千行的文件中查找。

👇 **试着点击**：
点击左侧的组件名称，可以看到它在页面上的对应区域。注意同一个`ProductCard`组件被多次重复使用，每次显示的数据都不同。

<ComponentTreeDemo />

### 4.3 组件在代码中是什么样子

以 Vue 为例，组件是一个`.vue`文件，包含三个部分：

```html
<!-- ProductCard.vue -->
<template>
  <!-- HTML structure here — the component's "appearance" -->
  <div class="card">
    <h3>{{ name }}</h3>
    <p>Price: ¥{{ price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup>
// JavaScript logic here — the component's "behavior"
const props = defineProps(['name', 'price'])

function addToCart() {
  // Handle "add to cart" logic
}
</script>

<style scoped>
/* CSS styles here — the component's "look" */
.card {
  border: 1px solid #ccc;
  padding: 16px;
}
</style>
```

使用这个组件时，就像使用自定义的 HTML 标签一样：

```html
<!-- Using the ProductCard component elsewhere -->
<ProductCard name="Wireless Earbuds" price="299" />
<ProductCard name="Mechanical Keyboard" price="599" />
<ProductCard name="Monitor" price="1999" />
```

三行代码渲染三个不同的产品卡片。

---

## 5. DOM 操作的成本：使用框架的动力

### 5.1 DOM 操作概述

如前所述，DOM 是浏览器解析 HTML 后生成的树状结构。**DOM 操作**是使用 JavaScript 来修改这棵树上的节点。例如，更改文本、添加元素、删除元素或修改样式。

这些操作本身并不复杂，但执行 DOM 操作后，浏览器需要做大量额外工作来更新屏幕显示：

1. **重新计算样式**：这个节点及其子节点的 CSS 样式需要改变吗？
2. **布局（回流）**：需要重新计算页面上所有元素的位置和大小。因为一个元素的改变可能会影响其他元素的位置。
3. **重绘**：将计算好的内容绘制到屏幕上。

每一步都有计算成本。如果你的代码频繁触发 DOM 操作，浏览器将重复执行这些步骤，页面将变得卡顿。

👇 **尝试点击**：
观察直接 DOM 操作与批量 DOM 操作的时间对比。随着修改次数增加，“逐个操作”的时间急剧上升。

<DomOperationCostDemo />

### 5.2 框架解决该问题的方法

由于直接的 DOM 操作代价高，框架寻找方法来**减少 DOM 操作的数量**。有两种具体策略：

**策略一：虚拟 DOM & Diff（Vue 和 React 的方法）**

虚拟 DOM 是一个 JavaScript 对象，其结构与真实 DOM 树一一对应，但它只存在于内存中，不触发浏览器的布局和绘制。

当数据变化时，框架的处理流程是：

1. 使用 JavaScript 对象创建一个“新的虚拟 DOM 树”，描述数据变化后 UI 应该的样子
2. 将这棵新树与旧树进行比较（这个过程称为 **Diff**），找出哪些节点发生了变化
3. 仅将真正发生变化的部分应用到真实 DOM（这个过程称为 **Patch**）

这样，不管数据如何变化，对真实 DOM 的最终操作总是最少的。

👇 **尝试点击**：
点击“修改数据”并观察虚拟 DOM 如何比较新旧树找出变化节点。注意最右侧的“真实 DOM”——只有真正变化的部分闪烁。

<VirtualDomDiffDemo />

**策略二：编译时精确定位（Svelte 的方法）**

Svelte 不使用虚拟 DOM。它的编译器在你编写代码时分析：“当 `count` 变化时，第 3 行的 `<span>` 需要更新。” 在运行时，它直接针对该元素进行更新，完全不需要比较新旧树。

这种方法跳过了 Diff 步骤，理论上性能更高。但这依赖于编译器的分析能力——编译器必须足够智能才能正确识别所有需要更新的地方。

---

## 6. 运行时 vs 编译时：框架设计的核心权衡

### 6.1 两个阶段

前端代码从你编写到最终在浏览器运行经历两个阶段：

- **编译时（构建时）**：你的源代码由构建工具（如 Vite、Webpack）处理，并转化为浏览器可直接执行的代码。该过程在用户打开网页之前，在你的电脑上完成。
- **运行时**：转换后的代码在用户浏览器中执行。框架的核心逻辑（如虚拟DOM差值、反应跟踪）在此阶段工作。

### 6.2 框架如何将工作分布到这两个阶段

不同框架在这两个阶段分配的工作量不同，这决定了它们的性能特性和捆绑大小：

- **React**：大部分工作在运行时完成。虚拟DOM的创建、差异和补丁均在浏览器中完成。优点是高度灵活性;成本是需要将整个框架的运行时代码（~40KB）发送到浏览器。
- **Vue**：一种混合方法。模板在编译时进行优化（编译器标记哪些节点是静态且不会更改），但最终的用户界面更新仍通过运行时的虚拟DOM进行。运行时代码约为30KB。
- **Svelte**：大部分工作在编译时完成。编译器分析你的代码，直接生成精确的DOM更新指令。运行时几乎没有框架代码——最终的捆绑包只包含你自己的业务代码。最小的捆绑包大小。

👇 **试着点击**：
点击不同的框架标签页，查看它们在“运行时↔编译”光谱上的位置，以及它们在捆绑包大小、运行时性能和开发者体验上的权衡。

<FrameworkSpectrumDemo />

### 6.3 行业趋势

近年来，框架开发的方向变得明确：**越来越多的工作从运行时转移到编译时。** 因为编译时计算不消耗用户设备资源，也不影响页面加载速度。

- **Vue** 正在开发 Vapor 模式，可以跳过虚拟 DOM 并在编译时直接生成 DOM 操作代码
- **React** 引入了 React 编译器，可在编译时自动优化组件重新渲染行为
- **Svelte 5**引入了Runes系统，进一步增强了编译时分析能力

---

## 7.摘要

让我们回顾本文的核心观点：

**前端框架解决的根本问题**：当应用中的数据发生变化时，能够自动、高效且可靠地更新用户界面，无需开发者手动操作DOM。

**他们都遵循的核心思想**：UI = f（State） — UI 是数据的函数。开发者只需关注数据变更，框架负责将数据变更反映到用户界面。

**它们的主要技术差异**：

|技术点 |含义 |
|:--- |:--- |
|**反应系统** |框架如何检测数据变更。Vue使用代理拦截，React使用显式setState，Svelte使用编译器分析。|
|**虚拟DOM** |Vue和React使用JavaScript对象模拟DOM树，通过比较新旧树（Diff）来减少实际DOM操作，从而找到最小更新。|
|**组件化** |将UI拆分为独立且可重复使用的小部分，每个组件管理自己的数据和UI。|
|**编译时优化** |在代码构建阶段提前进行分析和优化，减少运行时计算。Svelte在这方面走在了前列。|

**一句话总结**：前端框架的核心作用是——接管“数据到UI”的同步过程，让开发者只需关注数据逻辑，而无需手动操作UI。

---

## 术语表

| English Term | Chinese Translation | Explanation |
| :--- | :--- | :--- |
| **Framework** | 框架 | 一套预先编写的代码和规则，为开发者构建应用提供基础结构和常用功能。 |
| **DOM** | 文档对象模型 | 浏览器解析HTML后生成的树形数据结构，JavaScript通过操作它来修改页面。 |
| **Virtual DOM** | 虚拟DOM | 使用JavaScript对象模拟DOM树，通过Diff算法找到最小更新路径，以减少对真实DOM的操作。 |
| **State** | 状态 | 应用中的数据，例如用户信息、购物车内容、当前页面状态等。 |
| **Reactivity** | 响应式 | 当数据发生变化时，系统能够自动感知并执行相应的UI更新操作。 |
| **Proxy** | 代理 | JavaScript内置机制，可以拦截对象的读取和写入操作。Vue 3使用它来实现响应式。 |
| **Component** | 组件 | 一个独立的、可复用的UI代码片段，包含自己的HTML结构、JavaScript逻辑和CSS样式。 |
| **Declarative** | 声明式 | 一种编程风格：描述“你想要的最终结果”，由框架决定如何实现。 |
| **Imperative** | 命令式 | 一种编程风格：逐步告诉程序要“具体做什么”。 |
| **Diff** | Diff算法 | 比较新旧虚拟DOM树，找出哪些节点发生了变化。 |
| **Patch** | 打补丁 | 将Diff发现的变化应用到真实DOM中。 |
| **Compile-time** | 编译时 | 代码在构建阶段处理的时期，在用户打开网页之前。 |
| **Runtime** | 运行时 | 代码在用户浏览器中执行的时期。 |
| **编译器** | 编译器 | 将源代码转换为另一种形式代码的程序。Svelte的编译器将`.svelte`文件转换为高效的JavaScript。 |

