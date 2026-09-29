# JavaScript 运行时原理

::: tip 前言
你已经学习了 JavaScript 的基础知识，但你是否曾经想过：
- 你的代码到底运行在哪里？
- 为什么相同的代码在浏览器和 Node.js 中会有不同的表现？
- 为什么有时候代码会“卡住”，而有时候似乎可以“并行”运行？

本文将带你深入 JavaScript 运行时环境，包括事件循环、调用栈、内存管理等。阅读后，你将理解代码为什么按照特定顺序执行，快速定位与异步相关的 bugs，优化代码性能，并避免内存泄漏。
:::

**你将在本文学到什么？**

| 章节 | 内容 | 你将能够做什么 |
|-----|------|-----------|
| **第1章** | 运行时概览 | 了解 JavaScript 代码运行的位置 |
| **第2章** | 浏览器运行时 | 了解浏览器提供了哪些 Web API |
| **第3章** | Node.js 运行时 | 了解服务端 JavaScript 环境 |
| **第4章** | 事件循环深入 | 掌握宏任务和微任务的执行顺序 |
| **第5章** | 调用栈与内存 | 了解代码执行和内存管理 |
| **第6章** | 实用技巧 | 优化性能并调试内存泄漏 |

---

## 1. 运行时概览

::: tip 🤔 核心问题
**什么是“运行时”？** JavaScript 只是语言——为什么相同的代码在不同环境中表现不同？
:::

### 1.1 运行时概览

**运行时 = JavaScript 引擎 + 环境提供的 API**

如果说 JavaScript 是“编程语言”，那么运行时就是“操作系统”——它决定了你的代码能做什么和不能做什么。

```
┌─────────────────────────────────────┐
│         JavaScript Code             │
├─────────────────────────────────────┤
│      JavaScript Engine (V8)         │  ← Responsible for parsing and executing code
├─────────────────────────────────────┤
│      Runtime Environment (Browser/Node.js) │  ← Provides additional capabilities
└─────────────────────────────────────┘
```

**一个类比：JavaScript 是“普通话”，运行环境是“城市”**

- JavaScript 语法（普通话）在任何地方都是相同的
- 但不同的城市提供不同的设施：
  - 浏览器 = 有 DOM、window、fetch（就像一个有商场、图书馆的城市）
  - Node.js = 有 fs、http、path（就像一个有工厂、高速公路的城市）

### 1.2 两个主流运行环境

| 功能 | 浏览器 | Node.js |
|------|--------|---------|
| **主要用途** | 网页交互、用户界面 | 服务器端应用、命令行工具 |
| **全局对象** | `window` | `global` |
| **DOM API** | ✅ 支持 | ❌ 不支持 |
| **文件系统** | ❌ 支持有限 | ✅ 完全支持 |
| **模块系统** | ES 模块 | CommonJS   ES 模块 |
| **定时器** | `setTimeout`, `setInterval` | `setTimeout`, `setInterval` |
| **网络请求** | `fetch`, `XMLHttpRequest` | `http`, `https` 模块 |

👇 **动手试试**：比较浏览器和 Node.js 的环境差异

<RuntimeEnvironmentDemo />

::: info 💡 核心要点
运行环境决定了你可以使用哪些 API。在浏览器可用的 DOM API 在 Node.js 中无法使用；在 Node.js 可用的文件 API 在浏览器中无法使用。这就是为什么某些代码需要“环境检测”。
:::

---

## 2. 浏览器运行环境

::: tip 🤔 核心问题
**浏览器为 JavaScript 操作网页提供了哪些能力？**
:::

### 2.1 浏览器运行环境的组成部分

```
┌─────────────────────────────────────────────┐
│            JavaScript Engine                │
│            (V8 / SpiderMonkey)              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              Web APIs                        │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐     │
│  │   DOM   │ │   BOM    │ │ Network  │     │
│  │Manipulate│ │Manipulate│ │ Network  │     │
│  │   pages  │ │ browser  │ │ requests │     │
│  └─────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Event Loop                        │
│     Coordinates code execution, event       │
│     handling, and task scheduling            │
└─────────────────────────────────────────────┘
```

### 2.2 三类 Web API

**1. DOM API - 操作页面内容**

```javascript
// Find elements
const title = document.querySelector('h1')

// Modify content
title.textContent = 'New Title'

// Add styles
title.style.color = 'red'
```

**2. BOM API - 操作浏览器**

```javascript
// Page navigation
window.location.href = 'https://example.com'

// Browser storage
localStorage.setItem('key', 'value')

// Browser history
history.back()
```

**3. 网络 API - 网络请求**

```javascript
// Send HTTP request
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
```

### 2.3 浏览器特定的事件机制

浏览器运行时最强大的特性之一是“事件驱动”编程——代码不需要持续运行，而是在用户执行操作时才执行。

```javascript
button.addEventListener('click', () => {
  console.log('Button was clicked')
})
```

**常见事件类型：**

| 事件类型 | 触发时机 | 实际场景 |
|---------|---------|---------|
| `click` | 鼠标点击 | 按钮交互 |
| `input` | 输入框内容变化 | 实时搜索 |
| `scroll` | 页面滚动 | 懒加载 |
| `load` | 资源加载完成 | 初始化数据 |
| `error` | 发生错误 | 错误处理 |

---

## 3. Node.js 运行时

::: tip 🤔 核心问题
**是什么让 JavaScript 可以在服务器端运行？**
:::

### 3.1 Node.js 的组成部分

```
┌─────────────────────────────────────────────┐
│            JavaScript Engine                │
│                 (V8)                        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Node.js Built-in Modules           │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐     │
│  │   fs    │ │   http   │ │   path   │     │
│  │  File   │ │  HTTP    │ │  Path    │     │
│  │operations│ │  server  │ │ handling │     │
│  └─────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          libuv Event Loop Library           │
│      Cross-platform async I/O support       │
└─────────────────────────────────────────────┘
```

### 3.2 Node.js 特定功能

**1. 文件系统操作**

```javascript
const fs = require('fs')

// Read file
fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// Write file
fs.writeFile('./output.txt', 'Hello', (err) => {
  if (err) throw err
  console.log('Write successful')
})
```

**2. HTTP 服务器**

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('<h1>Hello World</h1>')
})

server.listen(3000)
```

**3. 模块系统**

```javascript
// CommonJS (Node.js default)
const fs = require('fs')
module.exports = { myFunction }

// ES Modules (modern approach)
import fs from 'fs'
export { myFunction }
```

### 3.3 浏览器与 Node.js 对比

| 特性 | 浏览器 | Node.js |
|------|--------|---------|
| **入口文件** | HTML 文件 | JavaScript 文件 |
| **全局对象** | `window`, `document` | `global`, `process` |
| **模块加载** | `<script>` 标签 | `require()` / `import` |
| **安全性** | 沙箱环境，受限 | 可访问系统资源 |
| **使用场景** | 用户界面 | 后端服务，工具 |

---

## 4. 事件循环深入

::: tip 🤔 核心问题
**JavaScript 是单线程的——它如何实现“非阻塞”行为？**
:::

### 4.1 事件循环概述

**事件循环 = JavaScript 的“任务调度中心”**

JavaScript 是单线程的，一次只能做一件事。但事件循环让它看起来可以同时做很多事情。

**核心机制：**

1. **执行同步代码**（调用栈）
2. **处理异步任务**（任务队列）
3. **等待新任务**（持续循环）

```
Call Stack                 Task Queue
┌─────────┐              ┌──────────┐
│ Task 1  │              │ Macro 1  │
│ Task 2  │ ←──────────── │ Macro 2  │
│ Task 3  │   After one    │ Macro 3  │
└─────────┘   completes,   └──────────┘
      ↓        take next         ↑
      └──────────────────────────┘
         Event loop checks continuously
```

### 4.2 宏任务 vs 微任务

这是在面试和实际开发中最容易混淆的概念！

**宏任务:**
- `setTimeout`, `setInterval`
- I/O 操作
- UI 渲染

**微任务:**
- `Promise.then`
- `MutationObserver`
- `queueMicrotask`

**执行顺序: 同步代码 → 微任务 → 宏任务**

👇 **试一试**: 观察宏任务和微任务的执行顺序

<TaskQueueDemo />

### 4.3 经典面试题

```javascript
console.log('1')

setTimeout(() => console.log('2'), 0)

Promise.resolve().then(() => console.log('3'))

console.log('4')

// Output: 1, 4, 3, 2
```

**为什么是这个顺序？**

1. 执行同步代码: `console.log('1')`, `console.log('4')` → 输出 1, 4  
2. 检查微任务队列: `Promise.then` → 输出 3  
3. 检查宏任务队列: `setTimeout` → 输出 2  

::: info 💡 实用提示
- 如果你希望代码尽快执行，使用微任务 (`Promise.then`)  
- 如果你希望延迟执行，使用宏任务 (`setTimeout`)  
- 永远不要混用过多异步操作，否则你会陷入“回调地狱”
:::

---

## 5. 调用栈与内存

::: tip 🤔 核心问题
**代码是如何执行的？变量存储在哪里？什么时候被垃圾回收？**
:::

### 5.1 调用栈：函数执行的“足迹”

**调用栈 = 记录函数调用的“笔记本”**

每次调用函数时，栈中会增加一条记录；当函数执行完毕，这条记录会被移除。

```javascript
function a() {
  b()
}

function b() {
  c()
}

function c() {
  console.log('Execution complete')
}

a()
```

**调用栈变化：**

```
Step 1: Call a()
┌─────────┐
│    a    │
└─────────┘

Step 2: a() calls b()
┌─────────┐
│    b    │
│    a    │
└─────────┘

Step 3: b() calls c()
┌─────────┐
│    c    │
│    b    │
│    a    │
└─────────┘

Step 4: c() completes, pop in order
┌─────────┐
│    b    │
│    a    │
└─────────┘
```

👇 **试一试**：观察调用栈的变化

<CallStackDemo />

### 5.2 内存管理：垃圾回收器的位置

JavaScript 有一个“自动垃圾回收”机制——你不需要手动释放内存；引擎会帮你处理。

**垃圾回收原理：标记-清除算法**

1. **标记阶段**：从“根”开始，找到所有可达的变量
2. **清除阶段**：未标记的变量就是“垃圾”，会被回收

```javascript
// Garbage collection example
let obj1 = { name: 'Object 1' }
let obj2 = { name: 'Object 2' }

// obj1 is reassigned, the original object loses its reference
obj1 = null  // The original { name: 'Object 1' } will be collected

// obj2 is still in use, won't be collected
console.log(obj2.name)
```

👇 **试一试**：观察垃圾回收过程

<GarbageCollectionDemo />

### 5.3 内存泄漏：忘记清理的后果

**内存泄漏 = 应该释放的内存没有被释放，随着时间累积**

常见原因：

**1. 全局变量过多**

```javascript
// ❌ Wrong: Global variables won't be collected
globalCache = []

function addItem(item) {
  globalCache.push(item)
}
```

**2. 事件监听器未移除**

```javascript
// ❌ Wrong: Listener not removed
button.addEventListener('click', handleClick)

// ✅ Correct: Remove listener when no longer needed
button.removeEventListener('click', handleClick)
```

**3. 闭包引用大型对象**

```javascript
// ❌ Wrong: Closure keeps referencing large object, won't be collected
function createHandler() {
  const bigData = new Array(1000000).fill('data')
  return function() {
    console.log('Processing')
  }
}

const handler = createHandler()  // bigData persists in memory
```

👇 **试一试**：观察内存泄漏是如何发生的

<MemoryLeakDemo />

::: info 💡 实用技巧
- **定期检查**：打开浏览器开发者工具 → 内存 → 拍摄堆快照以查看内存使用情况
- **避免全局变量**：使用 `const` 和 `let`，而不是 `var`
- **及时清理**：完成后移除事件监听器和定时器
- **弱引用**：使用 `WeakMap` 和 `WeakSet` 存储对象引用
:::

---

## 6. 实用技巧

::: tip 🤔 核心问题
**如何编写高性能的 JavaScript 代码？如何调试问题？**
:::

### 6.1 性能优化技巧

**1. 减少重排和重绘**

```javascript
// ❌ Wrong: Triggers reflow on every loop iteration
for (let i = 0; i < 1000; i++) {
  element.style.top = i + 'px'
}

// ✅ Correct: Batch modification
element.style.transform = `translateY(${position}px)`
```

**2. 使用事件委托**

```javascript
// ❌ Wrong: Add listener to every button
buttons.forEach(btn => {
  btn.addEventListener('click', handleClick)
})

// ✅ Correct: Add only one listener to parent element
container.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    handleClick(e)
  }
})
```

**3. 防抖和节流**

```javascript
// Debounce: Execute after user stops typing
function debounce(fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Throttle: Limit execution frequency
function throttle(fn, delay) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}
```

### 6.2 调试技巧

**1. 使用开发者工具查看调用堆栈**

```javascript
function a() {
  b()
}

function b() {
  c()
}

function c() {
  debugger  // Pause here to view call stack
}

a()
```

**2. 使用 `console.trace()` 跟踪执行路径**

```javascript
function trackExecution() {
  console.trace('Execution path')
  // Will output the complete call stack
}
```

**3. 使用 Performance API 分析性能**

```javascript
performance.mark('start')

// Execute some code
for (let i = 0; i < 10000; i++) {
  // ...
}

performance.mark('end')
performance.measure('Loop performance', 'start', 'end')

const measure = performance.getEntriesByName('Loop performance')[0]
console.log(`Execution time: ${measure.duration}ms`)
```

### 6.3 常见问题快速参考

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| **内存使用过高** | 内存泄漏、缓存过多 | 检查全局变量、移除监听器 |
| **页面卡顿** | 长任务阻塞主线程 | 拆分任务，使用 Web Workers |
| **事件未触发** | 监听器未绑定，元素不存在 | 检查 DOM 加载时机 |
| **异步顺序不正确** | 混合使用宏任务和微任务 | 一致使用 Promise 或 async/await |
| **定时器不准确** | 主线程被阻塞 | 使用 Web Workers 或 requestAnimationFrame |

---

## 总结

你现在应该能够理解：

- **运行时 = 引擎 + 环境 API** —— 不同的运行时提供不同的功能
- **事件循环** 协调同步代码、微任务和宏任务的执行顺序
- **调用栈** 记录函数执行过程 —— **栈溢出** 发生于递归过深
- **垃圾回收** 自动清理未使用的变量，但要注意 **内存泄漏**
- **性能优化** 关键在于减少回流/重绘并适当使用异步

::: info 💡 遇到问题时，可以这样告诉你的 AI
- “这个函数执行太慢，帮我优化性能”
- “内存使用不断增长，可能是内存泄漏，帮我检查”
- “异步操作顺序错了——应该先 A 再 B，但 A 和 B 几乎同时开始”
- “事件监听器没有触发，检查元素是否已经加载到 DOM 中”
:::