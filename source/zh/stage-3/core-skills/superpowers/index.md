# Claude Code 工程级开发超能力

## 超能力简介

**超能力**是由 Jesse Vincent（网络昵称：obra）创建的一个开源代理技能框架，专门用于解决 AI 编程中的核心问题：如何让 AI 生成“工程级”的代码，而不是“玩具级”的代码。

想象一个普通的 AI 编码助手是一个“聪明的实习生”。它可以写可运行的代码，但可能没有测试、没有文档，也没有最佳实践规范。超能力就像给那个实习生分配了一个“资深工程导师”，强制它遵循完整的软件开发流程。

### 为什么需要超能力？

在超能力出现之前，使用 Claude Code 存在几个问题：

- **随意编码的混乱**：AI 直接开始编码，没有规划，导致频繁返工
- **缺乏 TDD 纪律**：AI 往往先写代码，再补充测试，或者干脆跳过测试
- **在模糊需求下编码**：用户说“开发登录功能”，AI 立即开始，结果可能不符合预期
- **代码质量不稳定**：没有代码审查机制，质量取决于 AI 的“心情”

超能力解决了这些问题，把 Claude 打造成一个“有纪律的开发团队”。它帮助先明确需求，然后创建计划，再使用 TDD 开发，最后通过代码审查确保质量。

---

## 快速上手

### 步骤 1：安装超能力

在 Claude Code 中运行：

```bash
# Add marketplace
/plugin marketplace add obra/superpowers-marketplace

# Install superpowers
/plugin install superpowers@superpowers-marketplace
```

或者手动克隆：

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 步骤 2：尝试你的第一个技能

让我们使用 Superpowers 的 **头脑风暴** 技能来体验它的价值。

在 Claude Code 中输入：

```text
Build me a user login feature
```

**在拥有超能力之前**：Claude 会直接开始写代码，并可能产生你并不真正需要的东西。

**拥有超能力之后**：Claude 会使用苏格拉底式提问来帮助明确需求：

> 这个登录功能是针对网页应用还是移动应用？
>
> 需要哪些登录方式？邮箱/密码？第三方登录（Google、GitHub）？
>
> 你需要“记住我”功能吗？
>
> 密码重置应该通过邮箱还是短信？
>
> ...

这些问题迫使你在编写代码之前澄清你真正需要的内容，从而避免大量未使用的代码。

### 第三步：理解技能触发机制

超能力不是“魔法开关”。它是一**套技能**。理解技能是如何被触发的很重要。

**三种触发方式：**

1. **关键字触发**
   - 当你提到“TDD”、“测试驱动开发”或“先写测试”
   - `test-driven-development` 技能被激活

2. **场景触发**
   - 当需求不明确时，`brainstorming` 会主动提问
   - 当出现 bug 时，`systematic-debugging` 被激活

3. **手动调用**
   - 直接使用技能名称，例如：`/test-driven-development`

#### 💡 重要澄清：如果你没有指定 TDD 会发生什么？

这是一个常见的误解。让我们澄清一下：

```text
# Case A: TDD not mentioned
"Implement a calculator"
-> Claude may write tests, or may not
-> Depends on the model's own habits

# Case B: TDD explicitly requested
"Implement a calculator with TDD"
-> test-driven-development skill is activated
-> RED-GREEN-REFACTOR is enforced
```

**超级能力的真正价值**：不是凭空创造能力，而是强化纪律。

- 没有 TDD 技能：Claude 写测试是“可能”
- 有了 TDD 技能：Claude 被迫遵循 TDD 流程

### 理解超级能力的价值

从上面的解释中，超级能力的核心价值很清楚：

1. **优先需求**：`brainstorming` 在需求模糊时主动询问
2. **流程纪律**：`test-driven-development` 强制执行 TDD 的红-绿-重构循环
3. **任务分解**：`writing-plans` 将大项目分解为小任务
4. **质量控制**：`code-review` 技能确保代码质量

---

## 超级能力核心技能详解

超级能力包含 **20 个可组合技能**，涵盖完整的软件生命周期。我们按类别逐一介绍。

### 🧪 测试技能

#### 测试驱动开发

**触发方式**：提及“TDD”、“测试驱动开发”或“先写测试”等关键词。

**此技能作用**：迫使 Claude 遵循 TDD 的红-绿-重构循环，而不是“可能以后写测试”。

**传统方法**（常见问题）：
1. 直接写代码
2. 快速手动测试
3. 找到 Bug 并修补代码
4. 重复……（测试？可能下次）

**TDD 方法**（技能激活后）：
1. 🔴 **红色**：先写一个失败的测试
2. 🟢 **绿色**：写最少的代码以通过测试
3. 🔵 **重构**：在保持测试通过的同时重构
4. 重复

**示例用法**：

```text
Implement a user authentication module using TDD
```

Claude 将会：
1. 先编写测试（用户名/密码验证、令牌生成等）
2. 运行测试并确认全部失败（RED）
3. 编写最小实现代码
4. 运行测试并确认通过（GREEN）
5. 重构代码并提取共享逻辑
6. 再次运行测试并确认通过（REFACTOR）

> **注意**：如果你不提及“TDD”，Claude 可能会也可能不会编写测试。该技能的作用是**强制执行流程纪律**，以确保测试不会“被遗忘”。

### 🐛 调试技能

#### system-debugging（系统调试）

当出现 bug 时，开发人员往往会尝试随机修复。Superpowers 强制执行四阶段根因分析：

**阶段 1：重现问题**
- 确认 bug 可以持续重现
- 记录准确的重现步骤

**阶段 2：隔离根因**
- 使用二分查找式的缩小范围方法
- 添加日志以定位问题代码

**阶段 3：验证假设**
- 提出根因假设
- 设计验证实验

**阶段 4：修复与验证**
- 实施修复
- 确认 bug 已解决
- 添加回归测试

#### 完成前验证（verification-before-completion）

该技能防止 Claude 在事情只“看起来差不多”时停止。在声称完成之前，它要求 Claude：

1. 运行所有测试
2. 手动测试关键功能
3. 检查代码质量（lint）
4. 确认文档已更新

### 🤝 协作技能

#### 头脑风暴（brainstorming）

这是 Superpowers 技能中最有趣的之一。它使用苏格拉底式提问来澄清需求。

**工作原理**：当你提供模糊需求时，Claude 不会直接开始编码，而会提出问题：

```text
You: Build a blog system

Claude:
- Who is this blog for? Technical readers or general readers?
- Should Markdown editing be supported?
- Do you need comments?
- Do you need search?
- Single-user or multi-author?
- ...
```

这些问题迫使你思考真正需要的功能，从而避免大量未使用的功能。

#### 写作计划

此技能将大任务分解为可以在 2-5 分钟内完成的小任务。

**示例**：

```text
Use writing-plans to plan development of a todo API
```

克劳德将生成一个详细的计划：

```markdown
# Implementation Plan

## Task 1: Design database schema (estimated 5 minutes)
- Create todos table
- Define fields: id, title, completed, createdAt

## Task 2: Create Express routes (estimated 10 minutes)
- POST /todos - create task
- GET /todos - list tasks
- GET /todos/:id - get one task
- PUT /todos/:id - update
- DELETE /todos/:id - delete

## Task 3: Add input validation (estimated 10 minutes)
- title cannot be empty
- completed must be boolean

## Task 4: Write tests (estimated 15 minutes)
- Write tests for each endpoint
- Cover edge cases

## Task 5: Start server and verify (estimated 5 minutes)
- Run tests
- Manually test API

Acceptance criteria:
- All tests pass
- curl test passes for every endpoint
```

#### 执行计划

此技能按批次执行计划，并在每个检查点暂停以确认。

**使用示例**：

```text
Execute the plan above, and pause after each completed task
```

Claude 将：
1. 完成任务 1，然后暂停：`✅ Database schema done. Continue?`
2. 在你确认后，完成任务 2 然后再次暂停
3. 以此类推

这让你在每个阶段都能验证方向，避免迟发现事情偏离轨道。

#### 并行分派子代理

此技能可以同时启动多个子代理。

**使用场景**：当你需要同时处理多个独立任务时。

```text
Use parallel agents to complete:
- Agent A: write backend APIs
- Agent B: write frontend components
- Agent C: write tests
```

每个代理在其独立的环境中工作，不会互相干扰。

#### 子代理驱动开发

此技能为每个小任务启动一个独立的子代理。

**优点**:
- 每个子代理都有独立的上下文
- 一个任务失败不会影响其他任务
- 多个任务可以并行运行

#### 使用 Git 工作树

此技能使用 Git 工作树创建独立的开发环境。

**好处**:
- 可以并行开发多个功能
- 每个工作树都是独立的
- 不会互相冲突

### 👀 代码审查技能

#### 请求代码审查

代码完成后，此技能会自动请求代码审查。

```text
Automatically trigger code review after finishing the feature
```

#### 接收代码评审

此技能定义了如何接收和处理评审反馈。

**评审工作流程**：
1. 提交代码
2. 自动触发评审
3. 评审者检查代码质量、安全性和测试覆盖率
4. 评审者提供改进建议
5. 修复问题
6. 重新评审直到获得批准

---

## 完整超级技能工作流程

超级技能的真正威力来自将多种技能组合到完整的开发工作流程中。

### 标准开发工作流程

```text
1. Brainstorming
   ↓ Clarify real requirements through Q&A

2. Design Document
   ↓ Present design in chunks and wait for confirmation

3. Writing Plans
   ↓ Break down into 2-5 minute tasks

4. Subagent Development
   ↓ Launch isolated sub-agent per task
   ↓ Two-stage review: spec conformance + code quality

5. TDD
   ↓ Enforce RED-GREEN-REFACTOR

6. Code Review
   ↓ Quality gate

7. Done
```

### 实用示例：使用超级功能构建用户认证系统

让我们通过一个完整的示例来体验超级功能的工作流程。

#### 步骤1：通过头脑风暴明确需求

```text
I need a user authentication system
```

Claude 将会问：
- 这是网页应用还是移动应用？
- 需要哪些登录方式？
- 是否需要密码重置？
- 是否需要“记住我”功能？
- ...

#### 第2步：生成设计文档

在需求确认后，Claude 将会生成一份设计文档：

```markdown
# User Authentication System Design

## Functional Requirements
1. User registration (email + password)
2. User login
3. Password reset (email)
4. Remember me (JWT + Refresh Token)

## Technology Choices
- Backend: Node.js + Express
- Database: SQLite
- Auth: JWT
- Encryption: bcrypt

## API Design
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### 第3步：编写实施计划

```text
Use writing-plans to create the implementation plan
```

Claude 将生成一个详细的任务清单，每个任务可在 2-5 分钟内完成。

#### 第四步：执行开发

```text
Execute the plan above with TDD
```

Claude 将会：
1. 先写测试
2. 确认测试失败（RED）
3. 编写实现代码
4. 确认测试通过（GREEN）
5. 重构代码（REFACTOR）

#### 第 5 步：代码审查

完成后，代码审查将自动触发以检查：
- 代码质量
- 安全性（SQL 注入、XSS 等）
- 测试覆盖率
- 文档完整性

---

## Superpowers 与直接使用 Claude 代码的对比

| 维度 | 直接使用 Claude 代码 | 使用 Superpowers |
|------|---------------------|-----------------|
| **需求澄清** | AI 直接开始编码 | 先用苏格拉底式问题澄清需求 |
| **开发流程** | 根据 AI 自由流程 | 强制 TDD 红-绿-重构 |
| **任务管理** | 一次性完成 | 拆分为小任务并设检查点 |
| **代码质量** | 依赖 AI 判断 | 强制代码审查 |
| **可预测性** | 结果不稳定 | 可复现流程 |
| **最适合** | 简单任务、原型验证 | 复杂项目、生产代码 |

### 视觉比喻

如果 Claude 代码是一个“聪明的实习生”：

- **直接使用**：告诉实习生“实现登录功能”，他们可能会立即开始编码，但结果可能与你预期不符
- **使用 Superpowers**：给实习生分配高级导师，先澄清需求、制定计划，并检查代码质量

---

## 安装和配置详细说明

### 方法 1：通过市场（推荐）

```bash
# Add marketplace
/plugin marketplace add obra/superpowers-marketplace

# Install
/plugin install superpowers@superpowers-marketplace

# Verify installation
/skills
```

### 方法二：手动克隆

```bash
# Create directory
mkdir -p ~/.claude/skills

# Clone repository
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 方法 3：项目级安装

如果你想在特定项目中使用 Superpowers：

```bash
# In project root
mkdir -p .claude/skills

# Clone or copy superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

这允许团队成员共享相同的超级技能配置。

---

## 常用技能快速参考

| 技能名称 | 功能 | 使用场景 |
|---------|------|---------|
| `brainstorming` | 通过苏格拉底式提问澄清需求 | 当需求不清晰时 |
| `writing-plans` | 将任务拆分为小步骤 | 在开始大型项目之前 |
| `executing-plans` | 执行计划并设置检查点 | 在计划驱动开发期间 |
| `test-driven-development` | TDD 红-绿-重构循环 | 所有功能开发使用 |
| `systematic-debugging` | 四阶段根本原因分析 | 当出现缺陷时 |
| `verification-before-completion` | 完成前验证 | 在任务完成时 |
| `requesting-code-review` | 请求代码审查 | 提交代码之前 |
| `subagent-driven-development` | 子代理驱动开发 | 并行任务 |
| `using-git-worktrees` | Git 工作树隔离 | 并行功能开发 |

---

## 最佳实践

### 1. 使用清晰的触发关键词

超级技能由关键词触发。学习常用触发词：

| 技能 | 触发关键词 |
|------|-----------|
| `test-driven-development` | “TDD”, “测试驱动”, “先写测试” |
| `brainstorming` | 当需求不清晰时自动触发 |
| `systematic-debugging` | “调试”, “缺陷”, “无法运行” |
| `writing-plans` | “制定计划”, “规划” |

### 2. 在需要流程纪律时使用超级技能

- 生产级代码开发 -> 提及“TDD”
- 需求不清晰 -> 让 `brainstorming` 澄清
- 复杂项目 -> 使用 `writing-plans` 拆解任务

### 3. 简单任务不必强制使用

如果是快速原型或一次性脚本，你不需要完整流程。超级技能最适合需要长期维护的代码。

### 4. 技能可以组合

```text
Implement user authentication with TDD, and after completion, help me do a code review
```

这会触发`test-driven-development`和`code-review`技能。

---

## 常见问题解答

### Q1：使用超能力时需要特别说明“TDD”吗？

**非必需**。

超能力是一套技能，每种技能都有自己的触发条件：
- 说“use TDD” - >触发 `test-driven-development`
- 不要说TDD - > Claude可以写测试，也可以不写（取决于模型行为）

超级大国的存在是为了**强制流程纪律**，而不是从无到有创造能力。

### Q2：超能力会让开发变慢吗？

起初，可能会感觉更慢，因为：
- 需求澄清需要时间
- 测试是在代码之前编写的
- 代码审查要求

但从长远来看，由于重做减少和漏洞减少，整体效率会提升。

### Q3：小型项目也需要超能力吗？

对于原型验证或非常简单的任务，你可以直接使用 Claude Code。Superpowers 更适合：
- 生产级项目
- 多人协作
- 长期可维护性

### Q4：超能力和技能有什么区别？

|维度 |超能力 |技能 |
|------|-------------|--------|
|**自然** |完整开发方法论框架 |可重复使用技能包 |
|**范围**涵盖完整的开发流程 |聚焦特定功能 |
|**关系**超能力内部使用技能 |超能力是技能的集合 |

### Q5：我可以自定义超能力技能吗？

是的。Superpowers是开源的，你可以：
1. 分支仓库
2. 修改现有技能
3. 添加新技能
4. 回馈社区

---

## 参考文献

### 官方资源

- [obra/superpowers GitHub]（https://github.com/obra/superpowers） - 官方仓库（50,000 ⭐）
- 【详细超能力使用教程】（https://www.cnblogs.com/gyc567/p/19510203）——详细中文教程
- [超能力环境设置指南]（https://m.blog.csdn.net/gitblog_00683/article/details/144768992）- 设置指南

### 社区资源

|资料库 |描述 |
|------|------|
|[affaan-m/everything-claude-code]（https://github.com/affaan-m/everything-claude-code） |包括TDD工作流程的全面工具包 |
|[Shanraisshan/Claude-Code-最佳实践]（https://github.com/shanraisshan/claude-code-best-practice）|社区维护的最佳实践合集 |

### 相关文章

- 【再见Vibe编程！用超能力让Claude代码写出工程级代码】（https://juejin.cn/post/7593573617648123956）
- [我如何利用超能力MCP强制Claude代码在编码前进行计划]（https://juejin.cn/post/7570341520551673871）
- [克劳德密码超能力初学者教程]（https://juejin.cn/post/7594832320030638123）

---

## 摘要

Superpowers是一套**工程级开发技能**，将Claude Code从“聪明实习生”升级为“有纪律的开发团队”。

### 核心要点

1. **超能力是一种技能，不是魔法**
   - 安装后，技能在后台可用
   - 通过关键词或场景触发
   - 你可以手动调用特定技能

2. **记住关键触发词**
   - 想要TDD - >说“使用TDD”
   - 模糊的要求 -> `brainstorming` 主动提出
   - Bug 出现 -> 提及“调试”以触发 `systematic-debugging`

3. **最佳拟合情景**
   - ✅ 生产级代码开发
   - ✅ 长期可维护项目
   - ✅ 团队协作项目
   - ❌ 快速原型（可选）
   - ❌ 一次性剧本（可选）

记住：**超能力并不会让人工智能更聪明；它会让人工智能更有纪律。**