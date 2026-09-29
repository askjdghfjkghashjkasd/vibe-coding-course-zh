# 从直觉编程到规格编程：人工智能编程的演变

> “代码是意图的有损投影。”
> 代码是意图的有损投影。
> - Sean Grove，OpenAI，2025年AI工程师世界博览会

## 规格编程的核心理念：一切都是Markdown

在深入了解规格编程之前，首先要理解Claude Code的核心哲学：**一切都是Markdown**。

在Claude Code的设计哲学中，流程记录、信息传递，甚至与模型的对话都可以用Markdown表示：

- **CLAUDE.md**：项目规范的Markdown文档
- **.claude/rules/**：分层Markdown规则文件集合
- **specs/**：功能需求的Markdown描述
- **对话历史**：Claude Code的聊天记录本身就是Markdown格式
- **AGENTS.md**：定义代理行为的Markdown指令

这正是规格编程的核心：**规范本身就是代码**。当你用Markdown编写需求、设计决策和验收标准时，你实际上已经在“写代码”——AI会读取这些Markdown，然后生成真实的实现代码。

Josh Beckman对Grove演讲的总结完美地概括了这一点：

> “软件工程（以及立法与法律审查）就是规范修复。”
> 软件工程（以及立法与法律审查）就是规范修复。

在Claude Code中，这个“规范修复”的过程是：**修改Markdown -> AI读取Markdown -> 生成/修改代码 -> 验证结果**。整个工作流由Markdown驱动。

---

## 1. Sean Grove的“新代码”：一次改变你思维的演讲

2025年，OpenAI研究员**Sean Grove**在AI工程师世界博览会上发表了题为**“新代码”**的演讲，震撼了整个开发者社区。他提出了一个颠覆性观点：**过去70年我们一直在写代码来解决问题，但代码只是意图的有损投影——真正的“新代码”是规范。**

这次演讲催生了一种新的开发范式：**规格编程**——以规范文档而非代码作为开发的核心产物，让AI根据规范生成代码。

基于Grove的演讲，本文将帮助你理解规格编程的核心思想，回顾直觉编程的局限，并展示如何在Claude Code中应用这一方法进行实际开发。

::: info 📚 你将学习到的内容

1. 理解Sean Grove《新代码》演讲的关键思想
2. 掌握规格编程的核心概念和方法论
3. 认识直觉编程的价值及其上限
4. 学会在Claude Code中实践规格编程工作流
5. 掌握从直觉编程平滑过渡到规格编程的策略

:::

---

## 1. Sean Grove的“新代码”：一次改变你思维的演讲

2025年，OpenAI研究员Sean Grove在AI工程师世界博览会上发表了题为**“新代码”**的演讲。这次演讲被广泛认为是规格编程运动的思想起点。

Grove此前创办了GraphQL开发者工具公司OneGraph，该公司后被Netlify收购，现在在OpenAI从事对齐推理工作——帮助将高层次意图转化为可执行的规范和评估标准。

### 1.1 核心观点：代码是意图的有损投影

Grove演讲的核心概念可用一句话概括：

> **代码是意图的有损投影。**
> 代码是意图的有损投影。

这意味着什么？当你脑中有个想法并转化为代码时，过程中会丢失大量上下文——**为什么**选择这种方法，**你考虑了哪些权衡**，以及**哪些约束**重要。最终代码只保留“如何做”，而丢失了“为什么要这样做”。

这就像把一本书压缩成一条推文——信息密度急剧下降，原始意图也被严重削弱。

### 1.2 编程的本质在于沟通

格罗夫提出了一个简单却深刻的想法：

>“如果你能有效沟通，你就能编程。”
> 如果你能有效沟通，你就能编程。

他认为实际编码工作只占开发的 **10-20%**。另外 80% 是围绕需求和目标的结构化沟通——理解用户需求、与团队对齐解决方案、定义验收标准以及处理边缘情况。

这意味着编程能力的核心不在于掌握某种语言的语法，而是将模糊的意图转化为精确描述的能力。

### 1.3 写出规范的人就是程序员

这是格罗夫最具颠覆性的观点：

> “无论是项目经理、立法者、工程师还是市场营销人员，谁写了规范，现在就是程序员。”
> 无论是总理、立法者、工程师还是市场营销人员，谁写了规范，现在就是程序员。

随着人工智能越来越擅长将规范转化为代码，**真正的编程工作**从“编写代码”转向“编写规范”。谁能最准确地表达意图，谁就成为最有价值的“程序员”。

### 1.4 规范可以有类似代码的工具链

Grove指出，规范可以像代码一样拥有完整的工具链：

> “规范实际上给了我们非常相似的工具链，但它更注重意图而非语法。”

- **组合**：规范可以是模块化且可组合的，如代码模块
- **测试**：规范可以嵌入单元测试以验证行为是否符合预期
- **linting**：规范中的歧义语言可以被检测，就像linter捕捉语法问题一样
- **一致性检查**：跨部门的规范可以进行一致性检查，类似于类型检查器

### 1.5 OpenAI模型规范：活生生的证明

Grove引用了OpenAI自己的**模型规范**文档作为证据。

当OpenAI发现諂媚问题时，他们没有重新训练模型。相反，他们**修改了规范文档**。变更自动在系统中传播，问题得到了纠正。

这证明了一个关键点：**规范本身可以像可执行代码**。更改规范等同于改变行为，而无需动用传统代码的任何一行。

乔什·贝克曼对格罗夫演讲的总结完美地捕捉到了这一点：

> “软件工程（以及立法和法律审查）就是规范修复。”
> 软件工程（以及立法和法律审查）是规范修复。

---

## 2.规范编码：规范即代码

### 2.1 什么是规格编码

规格编码，也称为规范驱动开发（SDD），是一种将**规范文档视为开发核心产物**的方法论。

核心思想是：**先清晰地写出规范，然后让AI从该规范生成代码。规范是真实的来源，代码只是由此衍生的实现成果。**

罗伯特·C·马丁在《代码整洁之道》中的经典表述在人工智能时代变得焕然相关：

> “将需求精确到机器可以执行的程度就是编程。”
> 将需求精确到机器可以执行的程度就是编程。

### 2.2 比较 Vibe 编码与 Spec 编码

| 维度 | Vibe 编码 | Spec 编码 |
|------|------------|-------------|
| **方法** | 即兴提示，反复迭代 | 先写完整规范，然后生成代码 |
| **最佳用途** | 原型、黑客马拉松、探索 | 生产系统、团队协作、企业工作 |
| **代码质量** | 快速但脆弱 | 结构化、可测试、可审计 |
| **首次成功率** | 不稳定 | 目标 95% |
| **可重用性** | 一次性提示 | 规范可跨项目重用 |
| **安全性** | 容易忽略 | 在规范层内建立 |
| **文档** | 缺失或总是滞后 | 规范就是文档，并保持维护 |
| **团队协作** | 依赖个人提示技能 | 共享规范，共享标准 |

这两种方式并不相互对立。正如布拉德·乔利科尔所指出：

> “聪明的工程师甚至会先使用 Vibe 编码来生成规范的初稿。”
> 聪明的工程师甚至会先使用 Vibe 编码来生成规范的初稿。

### 2.3 Spec 编码的三层规范结构

红帽的工程师总结出了一个实用的三层规范模型：

**层 1：功能规范（做什么）**

用自然语言描述预期结果，并回答“它应该做什么”:

```markdown
## User Authentication Feature

### User Stories
- As a new user, I want to register with my email
- As a registered user, I want to log in with email and password
- As a user who forgot my password, I want to reset it by email

### Acceptance Criteria
- Validate email format and password strength during registration
- Lock the account for 15 minutes after 5 failed login attempts
- Password reset links are valid for 30 minutes
```

**第2层：语言无关规范（如何 - 架构层）**

定义数据结构、架构模式和安全要求：

```markdown
## Technical Design

### Data Model
- users table: id, email, password_hash, created_at, locked_until
- sessions table: id, user_id, token, expires_at

### API Design
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### Security Requirements
- Passwords use bcrypt with cost factor >= 12
- JWT expires in 15 minutes, refresh token in 7 days
- Enable rate limiting on all endpoints
```

**第3层：特定语言规范（如何 - 实现层）**

版本要求、测试框架和文档标准：

```markdown
## Implementation Constraints

### Tech Stack
- Runtime: Node.js 20+
- Framework: Express 5
- ORM: Prisma
- Testing: Vitest

### Code Conventions
- Use TypeScript strict mode
- Use a custom AppError class for error handling
- All API endpoints require JSDoc comments
```

---

## 3. 在 Claude Code 中练习规格编码

一旦你理解了理论，下一个问题是如何在 Claude Code 中应用它。Claude Code 的设计理念天然契合规格编码——它的 `CLAUDE.md`、Rules 目录以及 `/plan` 命令都是以规格驱动开发的形式。

当 OpenAI 自己使用 Codex 构建项目时，也采用类似模式：使用 `AGENTS.md` 文件作为规格来指导 AI 代理。他们的核心经验是：**当代理遇到困难时，把它视为一个信号——找出缺失的部分，无论是工具、保护机制还是文档，然后将其添加到仓库中**。这与规格编码完美契合：规格是动态的文档，应不断演进。

Augment Code 的研究也得出了相同的结论：**可执行规格保持准确性，因为 AI 代理直接从中生成代码，形成一种强制机制——过时的规格会产生错误的实现**。这意味着规格不会像传统文档那样“腐败”。

### 3.1 第一步：使用 `CLAUDE.md` 建立项目规格

`CLAUDE.md` 是你项目的“动态规格”。每次 Claude Code 启动时，它都会读取该文件，相当于为 AI 提供一本持久的项目手册。

在前一章 [Claude Code 快速入门核心指南](../basics/) 中，我们已经学习了如何创建 `CLAUDE.md`。在规格编码的语境下，它的角色变得更加重要——**它不仅仅是一个配置文件，更是项目规格的入口**。

LogRocket 的工程师强调，**扎实的上下文对 AI 代理至关重要，因为它可以防止幻觉和低效**。没有规格，AI 代理可能会对项目进行大幅、无法控制的更改。`CLAUDE.md` 是提供这种“扎实上下文”的第一道防线。

```markdown
# E-commerce Project Specification

## Project Positioning
A SaaS e-commerce platform for small and medium-sized merchants, supporting multiple stores and multiple payment channels.

## Architectural Decisions
- Frontend-backend separation with an API-first design
- Microservice backend architecture, with services communicating through a message queue
- Read-write database separation

## Core Constraints
- Store all monetary amounts as integers in cents to avoid floating-point precision issues
- The order state machine must strictly follow: pending payment -> paid -> shipped -> completed
- Payment-related endpoints must be idempotent
```

飞行员团队总结了规格说明应捕获的关键信息——而这正是你的`CLAUDE.md`应涵盖的内容：

- 输入和输出格式及数据类型
- 业务规则和边界情况
- 系统依赖和约束
- 性能和可扩展性要求
- 错误处理和安全要求

### 3.2 第二步：使用规则目录管理分层规格

随着项目的发展，单一的`CLAUDE.md`将不足够。此时，使用`.claude/rules/`目录来组织分层规格。

这正是Augment Code所称的“可执行规格”的理念：**规格不是静态文档，而是由AI代理直接使用的活文档**。当你将规则拆分到规则目录中时，每个规则文件仅在相关文件被编辑时加载，这既节省了令牌，又保持了精确度。

Tessl的工程师发现，将需求拆分为结构化文档——由PRD定义“是什么以及为什么”，技术规格定义“如何做”——有助于防止AI在长时间对话中积累混乱，并显著提高输出一致性。

```text
.claude/rules/
├── 00-architecture.md      # Architecture rules (global)
├── 01-security.md          # Security rules (global)
├── 10-api-design.md        # API design rules
├── 11-frontend-patterns.md # Frontend pattern rules
├── 12-database.md          # Database rules
└── 20-testing.md           # Testing rules
```

每个规则文件可以通过页眉部分指定其作用范围：

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# API Design Rules

## Route Design
- RESTful style, use plural nouns: /api/v1/orders
- Nested resources can go at most two levels deep: /api/v1/users/123/orders

## Response Format
- Success: { data, pagination? }
- Error: { error: { code, message, details? } }

## Must Follow
- All write operations require authentication
- All list endpoints must support pagination
- Sensitive operations must write audit logs
```

这样，当 Claude Code 编辑与 API 相关的文件时，它将自动加载此规范，并确保生成的代码符合标准。

### 3.3 第三步：使用 `/plan` 来实现 Specify -> Plan -> Tasks -> Implement

标准的 Spec 编码工作流程是一个四阶段循环。GitHub Spec Kit 将其标准化为 Specify -> Plan -> Tasks -> Implement，而 Claude Code 的 `/plan` 命令自然支持此流程。

SpecThis 团队强调了一个关键原则：**在代理运行之前定义边界——在任何代码更改发生之前知道哪些应该改变**。这恰恰是 `/plan` 的价值所在。

**阶段 1：Specify**

首先清楚地写下你想要构建的内容。不要急于编写代码：

```text
/plan
I need to implement an order refund feature. The specification is:

Functional requirements:
- Users can request a full refund before shipment
- Within 7 days after shipment, users can request a return and refund
- Refunds require administrator approval

Acceptance criteria:
- The refund amount cannot exceed the amount actually paid for the order
- Refund state machine: requested -> approved -> refunding -> refunded
- Inventory is restored after the refund is completed
- Log every operation throughout the process
```

**阶段 2：计划**

Claude 将根据您的规格生成一份技术计划：

```text
📋 Refund Feature Implementation Plan

1. Data model design
   - Create a refunds table
   - Add refund-related states to the order state machine

2. API design
   - POST /api/orders/:id/refund - request a refund
   - PUT /api/refunds/:id/approve - approve a refund
   - GET /api/refunds - refund list

3. Business logic
   - Refund eligibility checks
   - Refund amount calculation
   - Inventory restoration logic

4. Integrations
   - Connect to the payment provider's refund API
   - Send refund notifications
```

**阶段 3：任务**

将计划分解为可以独立执行的小任务，并为每个任务设定明确的完成标准。

**阶段 4：实施**

一次实施一个任务，每完成一个任务就进行验证。

### 3.4 实例：使用规格编码构建用户通知系统

让我们用一个完整的示例来比较 Vibe 编码和规格编码。来自 Orchestrator.dev 的数据表明，在 2025 年的 Stack Overflow 调查中，84% 的开发者使用或计划使用 AI 工具，但只有 22% 对结果满意，46% 认为准确性是一个问题。规格编码正是缩小这一满意度差距的关键。

**Vibe 编码方法：**

```text
You: Build a notification feature
AI: [Immediately starts writing code and generates a simple notification list]

You: It should support read and unread
AI: [Modifies the code and adds a read field]

You: It also needs multiple notification types
AI: [Changes it again and adds a type field]

You: It should push notifications to phones too
AI: [Makes a big rewrite, and the previous structure no longer fits very well...]
```

结果：经过四轮更改，架构一次又一次被推翻，代码随着时间变得越来越混乱。

**规范编码方法：**

首先编写一个规范文档 `specs/notification.md`：

```markdown
# User Notification System Specification

## Functional Requirements
1. Support three channels: in-app notifications, email notifications, and push notifications
2. Notification types: system announcements, order status, promotional campaigns, security alerts
3. Users can configure notification preferences by channel and type
4. Support read/unread state and bulk mark-as-read

## Data Model
- notifications table: id, user_id, type, channel, title, content,
  is_read, created_at
- notification_preferences table: user_id, type, channel, enabled

## API Design
- GET /api/notifications?type=&is_read= - get notification list (paginated)
- PUT /api/notifications/:id/read - mark as read
- PUT /api/notifications/read-all - mark all as read
- GET /api/notification-preferences - get preference settings
- PUT /api/notification-preferences - update preference settings

## Acceptance Criteria
- The unread notification count updates in real time
- The notification list supports infinite scrolling
- Push notification latency < 3 seconds
- Preference changes take effect immediately
```

然后在克劳德代码中：

```text
@specs/notification.md
Implement the user notification system according to this specification.
Start with the data model, then implement the API, and finally build the frontend components.
Pause after each module is complete, and I will confirm before you continue.
```

结果：它一次性干净利落地落地，架构清晰，无需反复拆解和重建。

### 3.5 使用超级能力强化规范编码

在前一章 [工程级开发的超级能力](../superpowers/) 中，我们了解了超级能力技能系统。规范编码与超级能力是天然的搭档：

| 规范编码阶段 | 对应超级能力技能 |
|---------------|----------------|
| 定义规范 | `brainstorming` - 使用苏格拉底式提问澄清需求 |
| 技术规划 | `writing-plans` - 将规范拆分为小任务 |
| 增量实现 | `test-driven-development` - TDD 红绿重构 |
| 质量验证 | `code-review` `verification-before-completion` |

**联合使用示例：**

```text
@specs/notification.md
Implement the notification system according to this specification using TDD,
and help me review the code after it is done
```

这一条指令同时激活了规格编码工作流和像 TDD 及代码审查这样的超级技能，形成一个完整的工程级开发流程。

### 3.6 版本控制与规格的持续演进

氛围编程 Substack 提出了一个重要观点：**规格现在就是代码**。如果规格是代码，那么它们就应该像代码一样进行管理：

- **版本控制**：将规格文件保存在 Git 中，并与代码一起提交
- **变更跟踪**：规格的每一次变更都要有提交记录，这样你就知道谁改了什么，以及为什么改
- **代码审查**：规格的变更也应经过 PR 审查，以保持团队一致
- **CI 集成**：规格变更会触发自动化测试，以验证实现是否仍然符合规格

在 Claude Code 中，这意味着你的 `CLAUDE.md`、`.claude/rules/` 和 `specs/` 目录都应受版本控制。Robomotion 的经验是，**将规格与实现一同版本化可以防止偏移，并保持一切可审计**。

OpenAI 的 Harness 工程实践也证实了这一点：他们的 `AGENTS.md` 文件本身是由 Codex 编写的，并随着项目的发展持续更新。当代理遇到困难时，修复的方法不是直接修改代码，而是**让 Codex 自身更新规格**——形成规格的自愈循环。

---

## 4. 混合策略：逐步从 Vibe 迁移到规格编码

行业共识不是“放弃 氛围编程”，而是**为合适的场景选择合适的方法**。

### 4.1 何时使用 氛围编程

- 在 30 分钟内通过原型验证想法是否可行
- 探索不熟悉的技术或框架
- 黑客马拉松或内部演示
- 一次性脚本或工具

### 4.2 何时使用规格编码

- 生产环境功能开发
- 多人协作项目
- 需要长期维护的代码
- 安全、支付或数据等敏感领域
- API 设计和系统集成

### 4.3 推荐的渐进工作流

**阶段 1：Vibe 探索**

使用 氛围编程 快速验证想法。此阶段无需编写规格，也无需担心代码质量：

```text
Build a simple notification popup so we can see how it feels
```

**阶段 2：完善规格**

一旦确认可行性，将在探索过程中学到的内容整理成规格。你甚至可以请 AI 来帮忙：

```text
Based on the notification feature prototype we just built,
help me organize a formal functional specification document,
including the data model, API design, and acceptance criteria
```

**阶段3：依据规范重建**

根据该规范，使用规范编码重新实现生产级版本：

```text
@specs/notification.md
Implement this from scratch according to the specification, and do not refer to the previous prototype code
```

这种工作流程的优势很明显：**利用 氛围编程 的速度来验证方向，用 Spec Coding 的质量来交付产品**。

Robomotion 总结得很好：

> “规格是事实的来源。AI 生成的输出是草稿实现。验证不是可选的。”
规格是事实的来源。AI 生成的输出是草稿实现。验证不是可选的。

---

## 5. 常见问题

### Q1：Spec Coding 会不会显得太慢？

编写规格确实需要前期投入。但 Greg Ceccarelli 的团队利用 Spec Coding 在 **四周内用三个人** 完成了一个完整的 macOS 产品——这是传统开发几乎不可能做到的。

早期编写规格所花费的时间，将通过较少的返工、更少的 bug 和更低的沟通成本在后期得到回报。

### Q2：规格应该有多详细？

Robomotion 的建议是：**高质量的规格可以只有一页**。关键在于它是否回答了以下八个问题：

1. 我们在自动化什么？
2. 输入是什么？
3. 输出是什么？
4. 有哪些约束？
5. 可能的失败模式有哪些？
6. 安全需求有哪些？
7. 性能需求有哪些？
8. 哪些测试可以证明它有效？

### Q3：如果 AI 只按规格做而错过了“显而易见”的功能怎么办？

这确实是 Spec Coding 的一个限制。来自 GitHub Spec Kit 用户的反馈是，AI 会 **“严格且仅”** 按规格执行。

解决方法是在规格中添加“非功能性需求”部分，并列出常见期望，例如错误处理、日志记录和无障碍性。或者在 `CLAUDE.md` 中设置全局规则。

### Q4：小型项目也需要 Spec Coding 吗？

不需要。Spec Coding 最适合于：

- 生产级项目
- 协作团队项目
- 需要长期维护的项目

对于快速原型、一次性脚本和学习实验，氛围编程 更加适合。

### Q5：如何让团队接受 Spec Coding？

从小功能开始试点。让团队看到 Spec Coding 如何减少返工并提高一次通过率。Stack Overflow 2025 的调查显示，84% 的开发者使用或计划使用 AI 工具，但只有 22% 对结果满意——Spec Coding 正是提高这种满意度的关键。

---

## 6. 总结

从 氛围编程 转向 Spec Coding 并非革命，而是进化。

Sean Grove 在《The New Code》中明确指出：**在过去 70 年里，我们写代码来解决问题；现在我们应该写规格来生成代码**。代码是意图的有损投影，而规格可以完整捕捉意图、上下文和约束。

对于使用 Claude Code 的开发者来说，这种转变已经在发生：

- 你写的 `CLAUDE.md` 是你的项目规格
- 你配置的 Rules 目录是你的分层规格系统
- 用 `/plan` 做的计划是 Specify -> Plan -> Tasks 流程
- 结合 Superpowers 的 TDD 和代码评审，你得到完整的 Spec Coding 工作流程

**关键要点：**

- Vibe 编码适合探索和原型开发，而 Spec 编码适合生产和协作
- 规范是事实来源，代码是从规范生成的实现产物
- 编写规范的能力 = 编程能力，沟通能力比语法能力更重要
- 从小处开始：只要把 `CLAUDE.md` 写好，你就已经迈出了进入 Spec 编码的第一步

::: 提示 💡 下一步
在下一章中，我们将学习如何使用 Claude Code 的代理团队功能，使多个 AI 实例能够像真实开发团队一样协作。
:::

---

## 参考资料

### 与 Sean Grove 的《The New Code》演讲相关

- [代码只是意图的有损投影 — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [编码的终结？规范如何成为新的源代码 — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI：意图而非代码驱动未来软件开发 — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [关于《The New Code》的笔记 — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [《The New Code》完整记录](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Spec 编码方法论

- [规范驱动开发如何提升 AI 编码质量 — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [规范驱动开发与 AI：2025 完整指南 — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [规范驱动开发：用 AI 构建可投入生产的软件 — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [代理可以编码，但明确规范的问题依然存在 — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe 编码 vs Spec 编码

- [Vibe 编码 vs 规范驱动 — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [掌握软件工程中的 AI：Vibe 与 Spec 编码 — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [从 Vibe 编码到规范驱动开发 — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [企业的优先规范方法 — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### 工具与实践

- [GitHub Spec Kit vs Vibe 编码 — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [面向代理 AI 的优先规范工作流 — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [规范即代码 — The 氛围编程 Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness 工程 — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [规范驱动开发 & AI 代理解析 — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [规范驱动开发：可扩展 AI 代理的关键 — Aviator](https://www.aviator.co/blog/spec-driven-development/)