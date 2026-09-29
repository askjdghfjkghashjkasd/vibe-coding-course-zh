# 设计模式基础

::: tip 前言
**为什么你的代码总是“能用但很乱”？** 你可能遇到过这种情况：当需求变化时，代码需要大幅重写；你想复用某段逻辑，却发现它和其他代码纠缠在一起。设计模式是前人总结的“代码组织秘籍”，可以帮助你编写灵活、可维护的代码。

本章将帮助你理解最实用的设计模式——不是死记硬背，而是理解“哪种模式适用于哪种场景”。
:::

**本文你将学到什么？**

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第1章** | 什么是设计模式 | 模式的本质与分类 |
| **第2章** | 创建型模式 | 如何优雅地创建对象 |
| **第3章** | 结构型模式 | 如何组织代码结构 |
| **第4章** | 行为型模式 | 如何管理对象间交互 |

读完本章后，你将掌握最常用的设计模式，并能识别适用场景，在实际项目中灵活应用。

---

## 0. 总览：设计模式的本质

想象你正在学习烹饪。你可以每次都从零摸索，或者学习经典食谱——食谱并不会限制你的创意，它让你站在前人的肩膀上。设计模式就是编程世界的“经典食谱”。

::: tip 设计模式的价值
- **通用语言**：说“这里使用观察者模式”，团队立即理解你的设计意图
- **经验复用**：无需重蹈别人已经踩过的坑
- **灵活扩展**：好的模式允许代码以较小修改适应变化，而不是大幅重写
:::

使用下面的交互组件浏览常见设计模式的分类和用途：

<DesignPatternCatalogDemo />

---

## 1. 创建型模式：如何优雅地创建对象

### 1.1 单例模式

**场景**：全局只需要一个实例，例如配置管理器、日志记录器或数据库连接池。

```javascript
class ConfigManager {
  static instance = null

  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  constructor() {
    this.config = {}
  }
}

// No matter how many times you call it, it's always the same instance
const a = ConfigManager.getInstance()
const b = ConfigManager.getInstance()
console.log(a === b) // true
```

### 1.2 工厂模式

**场景**：根据不同条件创建不同类型的对象，调用者无需了解具体的创建细节。

```javascript
function createNotification(type, message) {
  switch (type) {
    case 'email':
      return { send: () => console.log(`Send email: ${message}`) }
    case 'sms':
      return { send: () => console.log(`Send SMS: ${message}`) }
    case 'push':
      return { send: () => console.log(`Push notification: ${message}`) }
    default:
      throw new Error(`Unknown notification type: ${type}`)
  }
}

// The caller doesn't care about the specific implementation
const notification = createNotification('email', 'Hello')
notification.send()
```

---

## 2. 结构模式：如何组织代码结构

### 2.1 适配器模式

**场景**：两个接口不兼容，需要一个“转换插头”。例如，旧 API 返回的数据格式与新组件期望的不匹配。

```javascript
// Format returned by the old API
const oldApi = {
  getUserInfo: () => ({ user_name: 'Zhang San', user_age: 25 })
}

// Adapter: convert to new format
function adaptUser(oldUser) {
  return { name: oldUser.user_name, age: oldUser.user_age }
}

const user = adaptUser(oldApi.getUserInfo())
// { name: 'Zhang San', age: 25 }
```

### 2.2 装饰器模式

**场景**：在不修改原有代码的情况下为对象添加新功能。就像给手机加一个保护壳——手机的功能保持不变，但你获得了保护。

```javascript
// Basic log function
function log(message) {
  console.log(message)
}

// Decorator: add timestamp
function withTimestamp(fn) {
  return (message) => fn(`[${new Date().toISOString()}] ${message}`)
}

// Decorator: add log level
function withLevel(fn, level) {
  return (message) => fn(`[${level}] ${message}`)
}

const enhancedLog = withTimestamp(withLevel(log, 'INFO'))
enhancedLog('Service started successfully')
// [2025-01-15T10:30:00.000Z] [INFO] Service started successfully
```

---

## 3. 行为型模式：如何管理对象之间的交互

### 3.1 观察者模式

**场景**：当一个对象的状态发生变化时，其他对象需要自动收到通知。例如，在用户下单后，你需要同时发送电子邮件、扣减库存并记录事件。

```javascript
class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data))
  }
}

const bus = new EventEmitter()
bus.on('order:created', (order) => console.log('Send confirmation email', order.id))
bus.on('order:created', (order) => console.log('Deduct inventory', order.id))
bus.emit('order:created', { id: 'ORD-001' })
```

### 3.2 策略模式

**场景**：相同的操作有多种算法/策略，需要在运行时切换。例如，不同的排序方法或不同的定价规则。

```javascript
const pricingStrategies = {
  normal: (price) => price,
  vip: (price) => price * 0.8,
  svip: (price) => price * 0.6
}

function calculatePrice(price, memberLevel) {
  const strategy = pricingStrategies[memberLevel] || pricingStrategies.normal
  return strategy(price)
}

calculatePrice(100, 'vip')  // 80
calculatePrice(100, 'svip') // 60
```

使用下面的交互组件来尝试不同设计模式的效果：

<PatternPlaygroundDemo />

---

## 4. 选择设计模式的方法

| 遇到的问题 | 推荐模式 | 核心思想 |
|-------------|---------|---------|
| 仅需要一个全局实例 | 单例模式 | 控制实例数量 |
| 根据条件创建不同对象 | 工厂模式 | 封装创建逻辑 |
| 接口不兼容需要转换 | 适配器模式 | 用转换层包装 |
| 动态添加功能 | 装饰者模式 | 一层一层地增强 |
| 状态变化需要通知多个对象 | 观察者模式 | 发布-订阅解耦 |
| 多个算法需要运行时切换 | 策略模式 | 将算法封装为对象 |

::: tip 核心原则
设计模式并不是“越多越好”。**过度设计**和**没有设计**同样糟糕。只有在确实需要灵活性时才使用模式；简单问题用简单解决方案。记住 KISS 原则：保持简单，愚蠢也能实现。
:::

---

## 5. AI 驱动：使用大型语言模型学习和应用设计模式

大型语言模型（LLM）可以帮助你识别代码中适合使用设计模式的场景，并提供具体的重构解决方案。

### 5.1 识别适用模式

> **提示**：```
> Analyze the following code and determine if there are opportunities
> to improve it with design patterns.
> If so, please explain:
> 1. Problems with the current code
> 2. Which design pattern is recommended
> 3. Refactored code example
> 4. Why this pattern fits this scenario
>
> [Paste your code]
> ```

### 5.2 通过具体场景学习模式

> **提示**：
> ```
> Using a "food delivery ordering system" as a real scenario,
> demonstrate the application of these design patterns:
> - Factory Pattern: creating different types of orders
> - Observer Pattern: order status change notifications
> - Strategy Pattern: different delivery fee calculation rules
>
> Use JavaScript code examples. For each pattern, first show the
> problem without the pattern, then show the improvement with it.
> ```

### 5.3 判断过度工程

> **提示**：
> ```
> Review the following code and determine if there is over-engineering.
> Are there unnecessary abstractions, unused design patterns,
> or premature optimizations?
> If so, suggest how to simplify, following the KISS principle.
>
> [Paste your code]
> ```

::: 提示 AI 使用建议
让 AI 使用你熟悉的业务场景来解释设计模式，比阅读抽象的 UML 图要有效得多。但请记住：AI 可能倾向于推荐更复杂的解决方案——你需要自己判断它们是否真的必要。
:::

---

## 6. 总结

1. **创建型模式**：解决“如何创建对象”的问题，使创建过程更灵活
2. **结构型模式**：解决“如何组织代码”的问题，使结构更清晰
3. **行为型模式**：解决“对象如何交互”的问题，实现更松散的耦合
4. **灵活应用**：根据实际场景选择——不要只是为了使用而使用模式

::: 提示 最后的思考
设计模式的核心是**管理变化**。好的设计使可变部分易于修改，同时保持稳定部分不变。写代码时，问自己：“如果需求改变，我需要修改多少地方？”——如果答案是“很多地方”，你可能需要设计模式来帮助。
:::

---

## 延伸阅读

- **经典书籍**：GoF 的《设计模式：可复用面向对象软件的基础》是设计模式的奠基之作。
- **现代视角**：得益于语言特性（闭包、高阶函数），很多模式在 JavaScript 中变得更简洁。
- **实用建议**：先理解问题，再考虑模式。不要拿着锤子去找钉子。
- **高级学习**：学习 SOLID 原则——它们是设计模式背后的指导哲学。