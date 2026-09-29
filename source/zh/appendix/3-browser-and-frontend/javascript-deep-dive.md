# JavaScript 原理

::: tip 前言
到现在你已经学习了 HTML 和 CSS，并能够制作出外观不错的网页。但你可能已经注意到：按钮不能响应点击，表单无法提交，网页感觉像一张“静态”的图片。

这就是我们需要 JavaScript 的原因——它让网页充满生机。点击按钮打开菜单，实时输入搜索内容，滚动加载更多内容……这些交互效果都依赖于 JavaScript。

在 vibecoding 中，AI 会为你写大部分代码。但你至少需要能够理解代码在做什么，否则当 AI 出错时你就无法发现。阅读本文后，你将能够：

- 理解 AI 生成代码的功能
- 发现代码中的问题
- 用清晰、准确的语言告诉 AI 如何修复问题
:::

**本文将教你什么？**

| 章节 | 内容 | 你将能够做什么 |
|-----|------|-----------|
| **第1章** | 什么是 JavaScript | 理解它在网页中的作用 |
| **第2章** | 数据与变量 | 了解程序如何存储和使用信息 |
| **第3章** | 函数与逻辑 | 阅读做出决策、循环操作和复用逻辑的代码 |
| **第4章** | DOM 与事件 | 了解代码如何控制页面并响应用户操作 |
| **第5章** | 实用技能 | 如何阅读 AI 代码并精确描述错误 |

每一章都从“能够识别代码”开始——你不需要手动编写代码。每当遇到不理解的代码时，可以回过头来用本文作为参考。

---

## 1. 什么是 JavaScript

::: tip 🤔 核心问题
**为什么网页需要 JavaScript？** HTML 和 CSS 已经为网页提供了内容和样式——为什么还要学习另一门语言？
:::

### 1.1 从“静态页面”到“动态应用”

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**📄 无 JavaScript 的网页**
- 内容固定，没有交互
- 点击按钮无反应
- 填写表单无任何效果
- 页面不会自动更新

*就像一张纸质海报——只能观看*

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 有 JavaScript 的网页**
- 点击按钮打开菜单
- 实时输入进行搜索
- 滚动自动加载更多内容
- 数据实时更新和显示

*就像一个真实的应用程序*

</div>
</div>

**用一句话理解三者之间的关系：**

| 技术 | 类比 | 作用 |
|------|------|------|
| **HTML** | 骨架 | 定义页面的结构和内容 |
| **CSS** | 皮肤 | 定义页面的外观和样式 |
| **JavaScript** | 肌肉和神经系统 | 让页面具有响应能力、交互性和逻辑处理能力 |

### 1.2 使用 Vibecoding 的动机也需要理解 JavaScript

::: warning 新手开发者的陷阱
一名刚接触 JavaScript 的开发者使用 AI 构建了一个“计数器”应用：点击按钮，数字增加 1。AI 生成的代码运行正常。

但他们想将其改为“每次点击增加 2”，并告诉 AI：“让每次点击增加 2。”AI 修改了代码，但数字仍然只增加了 1。

他们问AI为什么它不起作用，AI给出了解释——但他们不明白代码中`count = count + 1`是什么意思，也不确定AI是否真的修改了正确的地方。他们所能做的只是不断地说“加2不起作用”，而AI则产出了几个更多的版本——有些将初始值改为2，有些则在完全无关的地方加了2。

最终，在阅读了第二章“变量”的概念后，他们明白了`count = count + 1`意味着取count的值，加1，然后再存回去。然后他们告诉AI：“把`count + 1`改成`count + 2`。”

第一次尝试就成功了。

**这就是为什么你需要理解JavaScript——不是为了手写代码，而是当AI没有正确实现时，你可以一眼发现问题，并用一句精确的话描述它。**
:::

### 1.3 一瞥：真实的AI生成代码

在深入之前，我们先看看一段真实的AI生成代码。不要担心完全理解它——只要有一个大致印象。我们稍后会解释每个部分。

**场景**：构建一个“点击按钮切换背景颜色”的功能

```javascript
// Define a set of colors
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
let currentIndex = 0

// Find the button on the page
const button = document.querySelector('#changeBtn')

// Add a click event to the button
button.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % colors.length
  document.body.style.backgroundColor = colors[currentIndex]
})
```

**这段代码的作用是什么？**

| 代码 | 目的 | 参考章节 |
|------|------|----------|
| `const colors = [...]` | 定义一组颜色数据 | 第2章：数组 |
| `let currentIndex = 0` | 跟踪当前显示的颜色 | 第2章：变量 |
| `document.querySelector(...)` | 查找页面上的按钮 | 第4章：DOM查找 |
| `button.addEventListener(...)` | 给按钮添加点击事件 | 第4章：事件监听器 |
| `() => {...}` | 定义点击时运行的代码 | 第3章：箭头函数 |

::: info 💡 关键洞察
你现在不需要理解每一行代码。只需记住：**JavaScript 代码是一系列指令，告诉浏览器“当用户做某事时，该发生什么”。**
:::

---

## 2. 数据：变量与数据类型

::: tip 🤔 核心问题
**程序如何“记住”东西？** 用户输入、从服务器获取的数据、计算过程中产生的中间结果——这些信息都存储在哪里？
:::

### 2.1 变量：给数据命名

**变量就像一个带标签的盒子** —— 你可以把数据放进去，之后通过标签取出它。

```javascript
const name = "Zhang San"   // This name won't change, use const
let age = 25                // Age might change, use let
```

**为什么要区分 const 和 let？**

可以这样理解：你的身份证号码（const）在你的一生中永远不会改变，而你的年龄（let）每年都会变化。JavaScript 允许你使用不同的关键字来表达这种“可变 vs 不可变”的意图。

| 关键字 | 是否可重新赋值 | 何时使用 | 示例 |
|--------|---------|----------|------|
| const | ❌ 否 | 不会改变的数据 | 身份证号码、配置值、颜色列表 |
| let | ✅ 是 | 会改变的数据 | 计数器、当前选中项、用户输入 |

::: details 🔍 一个具体示例```javascript
// Using const: these values won't change
const PI = 3.14159
const MAX_USERS = 100
const APP_NAME = "TodoList"

// Using let: these values will change
let count = 0
count = 1  // ✅ Can be reassigned

count = count + 1  // ✅ Can compute based on the original value

// What happens if you use const?
const fixedCount = 0
fixedCount = 1  // ❌ Error! const can't be reassigned
```
:::

👇 **自己试一试**：修改下面的代码，看看 const 和 let 之间的区别

<VariableBoxDemo />

### 2.2 数据类型：JavaScript 中的“事物”类型

JavaScript 将数据分为几种类型。最常用的三种是：

| 类型 | 描述 | 示例 | 实际应用场景 |
|------|------|------|----------|
| `string` | 文本内容 | `"hello"`, `'你好'` | 用户名、产品描述、工具提示 |
| `number` | 数值 | `42`, `3.14` | 价格、数量、评分 |
| `boolean` | 是/否值 | `true`, `false` | 已登录、已完成、可见 |

**值得了解的两个特殊值：**

- `undefined` → 变量已声明但尚未赋值
- `null` → 有意设置为空（表示“这里没有值”）

::: details 🔍 模板字符串：更方便的文本拼接方式
在 AI 生成的代码中，你经常会看到用反引号包裹的字符串（`` ` ``) with `${...}` 内部的内容）

```javascript
const name = "Zhang San"
const age = 25

// Traditional approach (cumbersome)
const message = "I'm " + name + ", " + age + " years old"

// Template literal (concise)
const message = `I'm ${name}, ${age} years old`
// Result: "I'm Zhang San, 25 years old"
```

**识别提示**：当你看到反引号和`${}`时，你就知道变量正在被插入到文本中。
:::

### 2.3 对象和数组：组织数据

**对象 = 一组命名属性**（就像一张个人信息卡）

```javascript
const user = {
  name: "Zhang San",
  age: 25,
  isVIP: true
}

// Use dot notation to access properties
console.log(user.name)    // "Zhang San"
console.log(user.age)     // 25
```

**数组 = 一种有序的数据集合**（类似列表）

```javascript
const colors = ['Red', 'Green', 'Blue']

// Access by index (starting from 0)
console.log(colors[0])  // "Red"
console.log(colors[1])  // "Green"
```

**嵌套结构：数组中的对象，对象中的数组**

这是 AI 生成代码中最常见的数据结构：

```javascript
const todos = [
  { id: 1, text: "Learn JavaScript", done: false },
  { id: 2, text: "Build a project", done: true },
  { id: 3, text: "Write documentation", done: false }
]

// Access: first take item 0 of the array, then its text property
console.log(todos[0].text)  // "Learn JavaScript"
```

::: 信息 💡 识别提示
- 查看 `{}` → 这是一个对象，包含一组 `name: value` 键值对
- 查看 `[]` → 这是一个数组，包含一个有序的值列表
- 查看 `data[0].name` → 首先取数组的第 0 项，然后取它的 name 属性
:::

### 2.4 值与引用：一个常见的陷阱

这是初学者最常遇到的问题之一！

**原始类型（字符串、数字、布尔值）赋值 = 复制一个全新的数据片段：**

```javascript
let a = 10
let b = a      // b gets a copy of a
b = 20
console.log(a) // 10 (a is unaffected)
```

**对象和数组赋值 = 复制“地址”（两者指向同一个东西）：**

```javascript
let user1 = { name: "Zhang San" }
let user2 = user1      // user2 points to the same object
user2.name = "Li Si"   // modifying user2 affects user1
console.log(user1.name) // "Li Si" (user1 changed too!)
```

**为什么要创建副本？**

在 React/Vue 中，直接修改数据会阻止 UI 更新。这就是为什么你经常在 AI 代码中看到 `[...array]` 或 `{...obj}` —— 它是在创建副本以避免相互干扰。

```javascript
// Create a copy using the spread operator
const arr1 = [1, 2, 3]
const arr2 = [...arr1]     // Create a new array
arr2.push(4)
console.log(arr1)          // [1, 2, 3] (unaffected)
console.log(arr2)          // [1, 2, 3, 4]
```

👇 **自己试一试**：观察当你修改副本时原始数据如何变化

<ReferenceDemo />

### 2.5 解构与扩展：现代 JavaScript 快捷方式

这两种语法模式在 AI 代码中无处不在——如果你不认识它们，你就无法阅读代码。

**解构赋值：快速从对象或数组中提取数据**

```javascript
const user = { name: "Zhang San", age: 25, city: "Beijing" }

// Traditional approach (cumbersome)
const name = user.name
const age = user.age

// Destructuring (concise)
const { name, age } = user
// Same result, but done in one line
```

**展开运算符：复制并扩展数据**

```javascript
// Copy an array and add new elements
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]  // [1, 2, 3, 4, 5]

// Copy an object and add new properties
const user1 = { name: "Zhang San", age: 25 }
const user2 = { ...user1, city: "Beijing" }
// { name: "Zhang San", age: 25, city: "Beijing" }
```

::: 信息 💡 识别提示
- 参见 `const { name, age } = person` → 从 person 对象中提取姓名和年龄
- 参见 `...array` 或 `...obj` → 展开/扁平化数组或对象
- 你不需要手动编写这些，但必须能够阅读它们
:::

---

## 3. 逻辑：函数与流程控制

::: 提示 🤔 核心问题
**代码如何“做出决策”和“重复任务”？** 程序需要根据条件执行不同的操作并重复某些任务——这些逻辑是如何表达的？
:::

### 3.1 条件语句：如果...那么...否则...

**if/else：最基本的条件语句**

```javascript
const age = 18

if (age >= 18) {
  console.log("Adult")
} else {
  console.log("Minor")
}
```

**三元运算符：简写的 if/else**

```javascript
// Full form (4 lines)
let message
if (age >= 18) {
  message = "Adult"
} else {
  message = "Minor"
}

// Ternary operator (1 line)
const message = age >= 18 ? "Adult" : "Minor"
// Format: condition ? value_if_true : value_if_false
```

**&& 短路：在 React 代码中常见**

```javascript
// Only show the user panel when isLoggedIn is true
isLoggedIn && <UserPanel />

// Equivalent to
if (isLoggedIn) {
  return <UserPanel />
}
```

::: 信息 💡 识别提示
- 参见 `? :` → 这是三元运算符，if/else 的简写
- 参见 `&&` → && 后的部分只有在前面的部分为真时才会执行
:::

### 3.2 函数：封装操作

**函数 = 菜谱**

- 定义函数 = 写下菜谱
- 调用函数 = 按菜谱烹饪
- 参数 = 原料
- 返回值 = 完成的菜肴

```javascript
// Define a function (write down the recipe)
function greet(name) {
  return "Hello " + name
}

// Call the function (cook according to the recipe)
console.log(greet("Zhang San"))  // "Hello Zhang San"
console.log(greet("Li Si"))      // "Hello Li Si"
```

**三种形态，一眼可辨：**

```javascript
// 1. function declaration (traditional)
function greet(name) {
  return "Hello " + name
}

// 2. Arrow function (most common in AI code)
const greet = (name) => {
  return "Hello " + name
}

// 3. Arrow function shorthand (when there's only one line)
const greet = (name) => "Hello " + name
```

👇 **自己试试**：输入不同的名称，看看这个函数是如何工作的

<FunctionMachineDemo />

::: info 💡 识别小提示
- 看到 `function` 或 `=>` → 这是一个函数
- 看到 `fn()` → 这个函数正在被调用
- 看到 `() => {}` → 箭头函数，现代 JS 的主流写法
:::

### 3.3 数组方法：处理列表的强大工具

在 React/Vue 中，几乎每个列表渲染都使用这些方法。

```javascript
const todos = [
  { id: 1, text: "Study", done: false },
  { id: 2, text: "Work", done: true }
]

// .map(): transform each item in the array into something else
const texts = todos.map(todo => todo.text)
// ["Study", "Work"]

// .filter(): filter out items that match a condition
const unfinished = todos.filter(todo => !todo.done)
// [{ id: 1, text: "Study", done: false }]

// .find(): find the first item that matches a condition
const found = todos.find(todo => todo.id === 1)
// { id: 1, text: "Study", done: false }
```

::: 信息 💡 识别提示
- 查看 `.map()` → 转换数组，返回一个新数组
- 查看 `.filter()` → 过滤数组
- 查看 `items.map(item => <li>{item.name}</li>)` → 将每个数据项变为列表元素
:::

### 3.4 作用域：变量的“可见范围”

**使用“房间”类比：**

- 函数内部的变量就像房间里的东西——外面的人看不到
- 但房间里面的人可以看到走廊（外部作用域）里的东西

```javascript
const global = "Global variable"  // Something in the hallway

function room() {
  const local = "Something in the room"  // Something in the room
  console.log(global)  // ✅ Can see the hallway
}

console.log(local)  // ❌ Error! Can't see into the room from outside
```

**核心直觉:** 代码的书写位置决定了它可以看到哪些变量。

👇 **自己试一试**：点击不同的作用域以查看哪些变量是可访问的

<ScopeDemo />

### 3.5 闭包：函数“记住”它们诞生的环境

**不要把它当作孤立的概念——从具体的场景中理解它:**

```javascript
function setupCounter() {
  let count = 0  // This variable is inside the function

  return {
    add: () => { count++; return count },
    getCount: () => count
  }
}

const counter = setupCounter()
console.log(counter.add())      // 1
console.log(counter.add())      // 2
console.log(counter.getCount()) // 2
```

**核心直觉：** 当一个函数被创建时，它会“记住”它周围的变量，即使外部函数已经执行完毕。

👇 **自己动手试试**：观察闭包如何让函数“记住”状态

<ClosureDemo />

### 3.6 this：调用函数的人

**没有复杂的绑定规则——只有最常见的场景：**

**场景 1：在对象的方法中，this 指向该对象**

```javascript
const user = {
  name: "Zhang San",
  sayHi() {
    console.log("Hello, I'm " + this.name)  // this points to user
  }
}
user.sayHi()  // "Hello, I'm Zhang San"
```

**情景 2：在事件监听器中，this 指向触发事件的元素**

```javascript
button.addEventListener('click', function() {
  console.log(this)  // this points to the button element
})

// But arrow functions don't change this
button.addEventListener('click', () => {
  console.log(this)  // this points to the outer this
})
```

::: 信息 💡 遇到问题时该怎么办？
如果在 AI 代码中出现了与 this 相关的错误（例如 `Cannot read property of undefined`），告诉 AI：“此方法中的 this 绑定错误 —— 切换到箭头函数或使用 bind。”
:::

---

## 4. 交互：DOM、事件和异步

::: 提示 🤔 核心问题
**JavaScript 如何“与网页交互”？** 如何在页面上找到元素？如何响应用户的点击和输入？如何从服务器获取数据？
:::

### 4.1 DOM：JavaScript 如何看待网页

在 JavaScript 的视角中，网页是一个“树”，每个 HTML 标签都是该树上的一个“节点”。

```html
<html>
  <body>
    <h1>Title</h1>
    <p>Paragraph</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </body>
</html>
```

**JS 控制页面 = 查找节点   修改节点   创建/删除节点**

👇 **自己试试**：点击节点查看 DOM 树的组织方式

<DOMTreeDemo />

### 4.2 查找和修改元素

**查找元素：**

```javascript
// Find by CSS selector (most common)
const title = document.querySelector('h1')      // Find the first h1
const button = document.querySelector('#btn')   // Find the element with id="btn"
const items = document.querySelectorAll('.item') // Find all elements with class="item"
```

**修改元素：**

```javascript
// Change text
title.textContent = "New Title"

// Change styles
element.style.color = "red"
element.style.fontSize = "20px"

// Change CSS classes
element.classList.add('active')      // Add a class
element.classList.remove('hidden')   // Remove a class
element.classList.toggle('open')     // Toggle a class (add if absent, remove if present)
```

::: 信息 💡 识别提示
- 参见 `document.querySelector` → 查找页面元素
- 参见 `.textContent` → 修改文本
- 参见 `.style.xxx` → 修改样式
- 参见 `.classList.add/remove/toggle` → 修改 CSS 类
:::

### 4.3 事件：当用户执行某操作时...

**addEventListener：向元素添加事件监听器**

```javascript
button.addEventListener('click', () => {
  console.log("Button was clicked")
})
```

**常见事件：**

| 事件 | 触发条件 | 真实场景 |
|------|---------|----------|
| `click` | 点击 | 按钮点击，链接导航 |
| `input` | 输入字段内容变化 | 实时搜索，表单验证 |
| `submit` | 表单提交 | 登录，注册，提交数据 |
| `scroll` | 滚动页面 | 异步加载，返回顶部按钮 |

**事件对象：获取更多信息**

```javascript
input.addEventListener('input', (e) => {
  console.log(e.target.value)  // Get the input field's value
  e.preventDefault()            // Prevent default behavior (e.g., page refresh on form submit)
})
```

::: 信息 💡 实际应用
当你想给一个按钮添加功能时，本质上是在告诉 AI："给这个按钮添加点击事件，并在点击时执行 X 操作。"
:::

### 4.4 异步性：为什么有些操作不会立即完成

**餐厅类比：**

下单后，你不必站在厨房门口等待——你可以去做其他事情，服务员会在食物准备好时送上。

**最常见的场景：从服务器获取数据**

```javascript
// Synchronous approach (blocks the page — don't use)
const data = fetch('/api/data')  // ❌ Writing it this way will block

// Asynchronous approach (correct)
async function loadData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

**async/await 语法：**

- `async` → 将此函数标记为包含异步操作
- `await` → 等待此操作完成（不会阻塞页面）
- `try/catch` → 处理潜在错误

👇 **自己试试**：观察异步操作的执行顺序

<AsyncRestaurantDemo />

::: info 💡 识别技巧
- 见 `async/await` → 等待耗时操作
- 见 `fetch()` → 从服务器获取数据
- 见 `try/catch` → 处理潜在错误
:::

### 4.5 事件循环：JavaScript 实际是如何工作的

**不使用“微任务/宏任务”等术语 — 用简单模型理解它：**

**JS 是一个“单人工作站”** — 它一次只能做一件事，但它有一个“便签板”（任务队列）。

当遇到需要等待的操作（网络请求、定时器）时，JS 并不会闲等 —— 而是把“等准备好后要做的事”的便签贴到板上，然后继续执行。只有当当前工作完成后，它才会检查便签板。

```javascript
console.log("1")

setTimeout(() => console.log("2"), 0)  // Even with 0ms delay, it gets deferred

console.log("3")

// Output: 1, 3, 2 (not 1, 2, 3!)
```

**为什么？**
1. 执行 `console.log("1")` → 输出 1
2. 遇到 `setTimeout` → 把回调挂到板上，继续
3. 执行 `console.log("3")` → 输出 3
4. 当前代码完成，检查板上内容
5. 执行 `setTimeout` 回调 → 输出 2

👇 **自己试试**：观察代码的执行顺序

<JSEventLoopDemo />

::: info 💡 遇到问题时该怎么办？
如果页面在数据获取完成之前就渲染了 AI 代码，告诉 AI：“数据还未加载完成，但页面已经渲染 —— 添加一个加载状态，并确保数据到达后再渲染。”
:::

### 4.6 模块：import 和 export

AI 生成的 React/Vue 代码的第一行几乎总是 `import`。

**import = 从另一个文件引入功能**

```javascript
// Import a function from a utility file
import { formatDate } from './utils'

// Import from a third-party package
import React from 'react'
import { useState } from 'react'
```

**导出 = 公开功能供他人使用**

```javascript
// utils.js
export function formatDate(date) {
  // ...
}

// Or default export
export default function formatDate(date) {
  // ...
}
```

**npm 包 = 由他人预先构建的工具，安装后使用**

```javascript
// Install package: npm install lodash
// Use the package
import _ from 'lodash'
```

::: 信息 💡 识别技巧
- 参见 `import` → 从另一个文件引入功能
- 参见 `export` → 将功能暴露给他人使用
- 参见 `from 'react'` → 从 React 包导入
- 参见 `from './utils'` → 从本地文件导入
:::

---

## 5. 实用技能：阅读代码、理解错误、精确描述

::: 提示 🤔 核心问题
**你已经学会了所有这些语法——那么当你得到 AI 生成的代码时如何实际使用它呢？** 如何快速浏览代码？遇到错误时怎么办？如何让 AI 精确地修复你的代码？
:::

### 5.1 如何阅读 AI 生成的代码

**四步法:**

| 步骤 | 关注点 | 示例 |
|------|--------|------|
| **步骤 1：整体结构** | 有多少函数？每个函数做什么？ | `loadData()` 加载数据，`renderList()` 渲染列表 |
| **步骤 2：找到入口点** | 程序从哪里开始执行？ | `addEventListener('click', ...)` 在点击时开始 |
| **步骤 3：追踪数据流** | 数据从哪里来？流向哪里？ | 从 API 获取 → 解析 → 渲染到页面 |
| **步骤 4：检查逻辑** | 每个函数如何处理事务？ | 循环、条件、计算 |

**使用第 1 章的代码示例进行完整的“阅读演示”:**

```javascript
// Step 1: Overall structure
// - An array of colors
// - A variable tracking the current index
// - A click event on a button

// Step 2: Entry point
// button.addEventListener('click', ...) → executes when the button is clicked

// Step 3: Data flow
// colors (color array) → currentIndex (current index) → backgroundColor (background color)

// Step 4: Detailed logic
// currentIndex = (currentIndex + 1) % colors.length
// This formula means: increment by 1 each time, but cycle back when reaching the array length
```

### 5.2 常见错误快速参考

| 错误 | 简单英文解释 | 如何告诉 AI |
|------|-----------|-------------|
| `TypeError: Cannot read properties of undefined` | 你正在尝试访问不存在的属性 | “第 X 行有错误——某个变量未定义，请检查其赋值逻辑” |
| `ReferenceError: xxx is not defined` | 你使用了一个未声明的变量名 | “变量 xxx 未定义——检查拼写错误或缺少导入” |
| `TypeError: xxx is not a function` | 你把非函数的内容当作函数调用 | “xxx 不是函数——检查其类型及来源” |
| `SyntaxError: Unexpected token` | 语法错误（括号不匹配、缺少逗号等） | “第 X 行有语法错误——检查括号和标点” |
| `CORS error` | 浏览器阻止了跨域请求 | “遇到 CORS 错误——需要配置跨域资源共享” |
| `404 Not Found` | 请求的资源不存在 | “API 返回 404——检查端点 URL 是否正确” |

### 5.3 如何精确描述问题

初学者与有经验开发者之间的差距常常在于 **问题描述的精确度**。

| ❌ 不好描述 | ✅ 好描述 |
|-----------|-----------|
| “代码有bug” | “点击删除按钮时，它删除最后一项而不是当前项” |
| “样式不对” | “标题应居中显示，但当前左对齐” |
| “数据无法显示” | “fetch 请求返回数据（可在控制台看到），但页面未重新渲染” |
| “添加一个功能” | “在用户列表页添加一个搜索框，用户输入时实时过滤列表，模糊匹配姓名字段” |
| “点击无响应” | “点击按钮时控制台报错 ‘Cannot read property of undefined’，错误发生在 X 行” |

**一个实用练习：**

```javascript
// Buggy code
function deleteTodo(index) {
  todos.splice(index, 1)  // Always deletes the last item
}

// Observed behavior: no matter which delete button you click, it always deletes the last item
```

**❌ 差的描述:** “删除功能有 bug”

**✅ 好的描述:** “点击删除按钮时，会删除最后一个项目而不是当前项目。代码使用的是 splice(index, 1)，但 index 可能不正确。应该修改为根据每个项目的唯一 id 来删除。”

### 5.4 你现在应该能够识别的内容

- 看到 `const/let` → 知道变量是否可以重新赋值
- 看到 `{}` → 对象 / 看到 `[]` → 数组
- 看到 `{...obj}` 或 `[...arr]` → 创建副本
- 看到 `function` 或 `=>` → 定义可重复使用的操作块
- 看到 `if/else` 或 `? :` → 代码在做决策
- 看到 `.map()` / `.filter()` → 转换或过滤数组
- 看到 `document.querySelector` → 查找页面元素
- 看到 `addEventListener` → 监听用户操作
- 看到 `async/await` → 等待耗时操作
- 看到 `import/export` → 导入或导出模块
- 遇到错误 → 能够理解大意并准确地向 AI 描述

**如果你仔细阅读每章的“深度解析”部分，你还掌握了这些核心概念：**

- **值 vs 引用**: 原始类型复制值，对象/数组复制地址
- **作用域与闭包**: 函数可以“记住”它创建时所在的变量
- **this 的本质**: 取决于谁调用函数，而不是函数写在哪里
- **事件循环**: JS 是单线程的，使用任务队列保持“非阻塞”

这些概念将帮助你更快地定位问题。

::: info 💡 当你遇到问题时，告诉 AI 这一点
- “第 X 行抛出错误 XXX — 帮我找出问题所在”
- “这个函数的逻辑是 XXX，但结果错误 — 它应该是 XXX”
- “我想修改 XXX 功能 — 具体要求是 XXX”
:::