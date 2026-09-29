# 代码质量与重构入门

::: tip 前言
**代码仅仅能运行就够了吗？** 你可能写过这样的代码：功能可以使用，但两周后你自己都看不懂。或者团队成员留下了一堆“只有上帝和他们自己才能理解的代码”。

本章将帮助你理解什么是优质代码，如何识别糟糕代码，以及如何安全地改进代码。
:::

**你将在本文中学到什么？**

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第1章** | 代码气味 | 识别常见问题 |
| **第2章** | 重构技巧 | 安全地改进代码 |
| **第3章** | 代码审查 | 团队协作中的质量保证 |
| **第4章** | 质量指标 | 用数据衡量代码健康状况 |

阅读本章后，你将能够识别代码问题、安全重构，并通过团队协作持续提升代码质量。

---

## 0. 全局概览：代码生命周期

在软件开发中，有一个常被忽视的事实：**代码被阅读的次数远远多于被编写的次数**。

一段代码从创建到退役，大致经历如下过程：

::: tip 代码的生命周期
- **编写阶段**：开发者写出第一个实现。功能可用，测试通过。
- **审查阶段**：团队成员阅读代码并提出改进建议。
- **维护阶段**：修复 Bug、添加功能、适应新需求 —— 这个阶段占据代码生命周期的 80% 以上。
- **重构阶段**：当代码难以维护时，需要在不改变外部行为的情况下改进内部结构。
- **退役阶段**：技术发展，旧代码被新解决方案取代。
:::

Martin Fowler 曾在《重构》中说：**“任何傻瓜都可以写出计算机能理解的代码。优秀的程序员写出人类能理解的代码。”**

---

## 1. 代码气味：识别常见问题

### 1.1 代码气味概述

“代码气味”这一概念由 Kent Beck 提出。它指的是代码中**不是错误但表明设计存在更深问题的特征**。就像房间里的异味——不会马上让你生病，但表明需要清理。

使用下面的交互组件识别一些最常见的代码气味：

<CodeSmellDemo />

### 1.2 常见代码气味清单

| 代码气味 | 症状 | 危害 |
|-------|------|------|
| **长方法** | 函数超过 50 行 | 难以理解、测试和复用 |
| **神奇数字** | 直接在代码中写 `86400000` | 含义不明确，修改时容易遗漏 |
| **重复代码** | 多处逻辑相似 | 修改必须同步每处，容易遗漏 |
| **深度嵌套** | if/for 超过 3 层 | 逻辑迷宫般难以追踪 |
| **长参数列表** | 函数参数超过 4 个 | 调用困难，容易顺序混淆 |
| **上帝类** | 一个类/模块职责过多 | 职责不清，改动一处可能影响全部 |

::: tip 核心洞察
代码气味不是“错误”——它们是“信号”。它告诉你：这里的设计可能需要改进。并非所有气味都需要立即修复，但你需要具备识别它们的能力。
:::

---

## 2. 重构技巧：安全地改进代码

### 2.1 重构概述

重构的定义很明确：**在不改变代码外部行为的情况下改善代码的内部结构。**

关键短语是“在不改变外部行为的情况下”。重构不是重写，不是增加功能，也不是修复错误。它是对代码内部进行“组织和整理”。

使用下面的组件可以比较常见重构技术的前后效果：

<RefactoringDemo />

### 2.2 常见的重构技术

**提取函数**

这是最常用的重构技术。当一段代码可以用一个有意义的名称来概括时，它应该被提取到一个函数中。

```javascript
// Before refactoring
function printReport(data) {
  // Calculate total price
  let total = 0
  for (const item of data.items) {
    total += item.price * item.qty
  }
  // Print...
}

// After refactoring
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function printReport(data) {
  const total = calculateTotal(data.items)
  // Print...
}
```

**重命名**

良好的命名是最便宜且最有效的文档。当你需要写注释来解释一个变量或函数的含义时，这说明它的名字还不够好。

```javascript
// Before refactoring
const d = new Date() - startTime  // Elapsed time
const arr = users.filter(u => u.a) // Active users

// After refactoring
const elapsedMs = new Date() - startTime
const activeUsers = users.filter(user => user.isActive)
```

**用保护子句替换嵌套条件**

```javascript
// Before refactoring
function getPayAmount(employee) {
  if (employee.isSeparated) {
    return { amount: 0 }
  } else {
    if (employee.isRetired) {
      return { amount: employee.pension }
    } else {
      return { amount: employee.salary }
    }
  }
}

// After refactoring
function getPayAmount(employee) {
  if (employee.isSeparated) return { amount: 0 }
  if (employee.isRetired) return { amount: employee.pension }
  return { amount: employee.salary }
}
```

::: 重构安全网提示
重构最大的风险是“在做更改时引入bug”。所以重构的前提是**有测试覆盖**。每做一个小重构步骤后就跑测试，确保行为没有变化。对于没有测试的代码，先添加测试再重构。
:::

---

## 3.代码审查：团队协作中的质量保证

### 3.1 编程复习动机

代码审查是团队中最有效的质量保证方法之一。其价值不仅限于发现漏洞：

- **知识共享**：团队成员相互学习代码，减少“公交车因素”（如果有人被公交车撞到，项目能否继续？）
- **一致风格**：审查逐步确立团队的编码标准
- **设计问题的早期发现**：糟糕的架构决策比缺陷更难修复
- **相互学习**：阅读他人代码是提升自身编程技能的捷径

### 3.2 评测内容

|维度 |焦点 |
|------|--------|
|**正确性**逻辑正确吗？边缘情况处理得好吗？|
|**易读性** |名字清晰吗？结构容易理解吗？|
|**安全** |有注入风险吗？敏感数据会被泄露吗？|
|**性能** |有明显的性能问题吗？N 1个查询？|
|**测试** |有相应的测试吗？它们覆盖关键路径吗？|

### 3.3 评测礼仪

好的代码审查是**关于代码的讨论，而不是批评别人**：

- 使用“我们”代替“you”：~~“你写错了”~~ →“这里我们可以考虑使用护卫子句”
- 问而非命令：~~“变为const”~~ →“这个变量以后会重新分配吗？如果不会，const会更安全”
- 给出理由：不要只说“不好”——要解释“为什么不好”和“如何改进”

---

## 4.代码质量指标

### 4.1 环状复杂性

环复杂度衡量代码中独立路径的数量。每个 `if`、`for`、`case`、`&&`、`||` 都会增加复杂度。

|复杂度 |评分 |推荐 |
|--------|------|------|
|1-10 |简单 |易于理解和测试 |
|11-20 |中等 |考虑分拆 |
|21-50 |复数 |必须重构 |
|50 |无法维护 |需要紧急重构 |

### 4.2 代码覆盖

代码覆盖率衡量测试执行的代码比例。常见指标：

- **行覆盖率**：已执行代码行占总行的比例
- **分支覆盖率**：已执行条件分支占总分支的比例

::: 贴心陷阱
80%的覆盖率并不意味着代码质量好。覆盖率只告诉你“哪些代码还没被测试过”，而不是“测试是否有意义”。一个只断言`expect(true).toBe(true)`的测试可以增加覆盖率，但完全没有用。
:::

### 4.3 实用工具

|工具 |目的 |
|------|------|
|**ESLint** |JavaScript/TypeScript 静态分析 |
|**更漂亮** |代码格式，风格一致 |
|**SonarQube**综合代码质量平台 |
|**Husky** |git钩子，提交前自动检查|

---

## 5.人工智能驱动：利用大型语言模型提升代码质量

LLM在代码质量领域已经非常实用——它们可以作为你的“全天候在线代码审查员”。

### 5.1 识别代码气味

> **提示**：
>```
> Please review the following code and identify code smells, including but not limited to:
> long methods, magic numbers, duplicated code, deep nesting, long parameter lists.
> For each issue, provide the specific location, description, and improvement suggestions.
>
> [Paste your code]
> ```

### 5.2 自动化重构

> **提示**：
> ```
> Please refactor the following code with these requirements:
> 1. Do not change external behavior
> 2. Use techniques like extract function, guard clauses to replace nesting
> 3. Improve naming, eliminate magic numbers
> 4. Explain the reasoning behind each refactoring step
>
> [Paste your code]
> ```

### 5.3 模拟代码审查

> **提示**：
> ```
> Please review this code from the perspective of a senior developer, providing feedback on these dimensions:
> - Correctness: Are there logic bugs? Are edge cases handled?
> - Readability: Are names clear? Is the structure easy to understand?
> - Performance: Are there obvious performance issues?
> - Security: Are there injection or data leakage risks?
> Use a "suggestion" tone rather than "command," and provide improvement plans.
>
> [Paste your code]
> ```

::: 提示 AI 使用建议
你需要自己验证 AI 提出的重构建议——运行测试以确认行为没有变化。将 AI 当作“提供建议的同事”，而不是“可以无条件信任的权威”。
:::

---

## 6. 总结

回顾一下，我们已经从识别问题到解决问题，构建了一个完整的代码质量改进体系：

1. **识别**：学会识别代码异味，知道哪里需要改进
2. **重构**：掌握安全的重构技巧，在测试保护下小步改进
3. **协作**：利用代码评审让团队共同维护代码质量
4. **测量**：用客观指标跟踪代码健康状况

::: 提示 最后想法
代码质量不是一次性的努力，而是一种持续的习惯。就像保持房间整洁一样——你不会等到一团糟才进行彻底清理，而是每天稍微整理一下。**童子军规则**很好地说明了这一点：让代码比你找到时更整洁。
:::

---

## 延伸阅读

- **经典书籍**：Martin Fowler 的《重构：改善既有代码的设计》是该领域的圣经。
- **整洁代码**：Robert C. Martin 的《代码整洁之道》提供了许多实用的编码原则。
- **实用工具**：尝试在你的项目中配置 ESLint、Prettier、Husky，体验自动化的代码质量保障。
- **代码评审**：谷歌的代码评审指南是业界的黄金标准，非常值得学习。