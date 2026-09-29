# 如何让 Claude Code 长时间工作

## 简介

传统的 AI 编码助手是“对话式”的：你说一句，它回复一次，然后就停了。但对于真正的开发任务，这种模式远远不够。

设想以下场景：你希望 Claude 重构整个项目，但它只编辑了几份文件就说“完成”；你希望 Claude 持续修复 bug 直到所有测试通过，但它只运行一次就停了；你希望 Claude “通宵工作”，但第二天早上你发现它早已停止。

在 2025 年夏天，一位名叫 Geoffrey Huntley（也是一名养羊农场主）的澳大利亚开发者写了一个 5 行的 bash 脚本。脚本很简单：不断重启 Claude Code 并再次给它同样的任务。他把它命名为“Ralph Wiggum”，取自《辛普森一家》中的角色，永不放弃的尝试者。

这个简单的脚本震惊了硅谷。在短短两周内，相关项目获得了 7,000 个 GitHub 星标。人们用它一夜之间生成了 6 个完整项目，以仅 297 美元的 API 成本交付了 50,000 美元的合同工作，甚至用它在三个月内构建了一个完整的编程语言。

本章要解决的核心问题是：如何让 Claude Code 像真正的开发者一样持续工作，直到任务真正完成。

---

## 核心原则：为什么 AI 会“过早停止”？

在讨论具体方法之前，先了解根本原因。

### AI 的完成判断不可靠

大型语言模型有一个根本弱点：它们无法可靠地判断工作是否真正完成。

人类的完成标准是客观的：所有测试通过、功能完整、代码质量符合标准。但 AI 只能通过“感觉”来判断。它可能因为“看起来差不多了”，或者“输出似乎足够”，或因为不知道下一步该做什么而停止。

这就是为什么我们需要外部系统来判断实际完成情况，而不是依赖 AI 的内部感知。

### 解决方案的核心思想

核心解决方案是让 AI 在一个“循环”中持续工作。

每当 AI 尝试退出时，外部系统检查三个问题：任务是否真正完成？是否符合客观标准？有什么遗漏吗？如果没有，就重新注入任务并继续下一轮。

这个思想可以通过多种形式实现，从简单的 bash 脚本到复杂的编排系统，但本质是相同的。

---

## 方法一：While True Bash 循环（最原始方法）

这是最简单、最直接的实现方式。基本思路是写一个无限循环，每一轮重启 Claude Code 并再次提供相同的任务描述。

最简单的实现仅 5 行：

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### 工作原理

脚本流程非常简单。第 1 步从 `PROMPT.md` 读取任务描述。第 2 步启动 Claude Code 并传入任务描述。第 3 步 Claude 执行并输出结果。第 4 步 Claude 完成后退出。第 5 步循环会自动重新开始并返回第 1 步，形成一个无限循环，除非你手动使用 `Ctrl+C` 中断。

### 优缺点

优点是极其简单：任何人都能理解，无需配置，立刻可用，非常适合快速实验。

但缺点也很明显：无法判断实际完成情况，可能会无限运行，没有安全防护措施，并且可能浪费 API 调用。

### 实际使用示例

首先，创建一个 `PROMPT.md` 文件来描述你的任务。例如，重构用户认证模块：

```markdown
# Task: Refactor user authentication module

Requirements:
1. Extract all authentication logic into an independent AuthService class
2. Add unit tests, coverage > 80%
3. Update related documentation

When all tests pass and docs are updated, output: task complete
```

然后创建并运行循环脚本：

```bash
chmod +x loop.sh
./loop.sh
```

### 更安全的改进版本

为了避免无限循环，请添加迭代上限：

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== Iteration $iteration/$MAX_ITERATIONS ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "Reached maximum iterations, stopping"
        break
    fi

    sleep 5  # small delay to avoid API rate limits
done
```

这个改进版本增加了最大迭代次数限制，显示每轮的进度，并在达到限制时自动停止。它还在每个循环中增加了5秒延迟，以避免速率限制。

---

## 方法二：Ralph Wiggum 插件（官方推荐）

Ralph Wiggum 是一个官方 Anthropic 插件，专门为长时间运行的任务构建。它以《辛普森一家》中的角色命名，代表“即使失败也要继续尝试”的精神。

### 核心机制：停止钩子

Ralph 的核心是停止钩子。 当 Claude 想要退出时，停止钩子会拦截退出信号。然后系统会检查：输出是否包含特定的完成标记？如果未找到标记，它会重新注入原始提示并开始下一次迭代。只有当检测到完成标记时，Claude 才被允许退出。

这保证了 Claude 不会仅因为“感觉差不多了”就停止。它必须完成明确标记的要求。

### 安装

Ralph Wiggum 是官方 Claude 代码插件，可以通过两种方式安装。

**选项 1：从官方插件市场安装（推荐）**

```bash
# run in Claude Code
claude

# add official plugin marketplace
/plugin marketplace add anthropics/claude-code

# install Ralph Wiggum
/plugin install ralph-wiggum@claude-code-plugins

# verify installation
/plugin
```

**选项 2：直接从 GitHub 安装**

```bash
# enter plugin directory
cd ~/.claude/plugins/

# clone plugin repo
git clone https://github.com/anthropics/ralph-wiggum-plugin.git
```

安装后，您可以使用：

- `/ralph-wiggum:ralph-loop` - 开始循环
- `/ralph-wiggum:cancel-ralph` - 取消循环
- `/ralph-wiggum:help` - 显示帮助

### 基本用法

使用 `/ralph-wiggum:ralph-loop`：

```bash
/ralph-wiggum:ralph-loop "Build a todo API with CRUD operations, input validation, and tests.
             Output <promise>COMPLETE</promise> when everything is done." \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### 参数说明

两个最重要的参数是 `--max-iterations` 和 `--completion-promise`。

`--max-iterations` 设置了硬性安全上限。推荐值通常在 20 到 100 之间。即使任务未完成，Ralph 也会在达到此限制时停止，以防止无限制的 API 消耗。

`--completion-promise` 指定完成标记文本，该文本必须明确且唯一。只有当 Claude 输出包含该标记时，Ralph 才会将任务视为完成。使用清晰的标记，例如 `COMPLETE` 或 `TASK_DONE`，避免使用模糊词。

### 提示词最佳实践

撰写良好的提示词是 Ralph 成功的关键。

不良的提示词通常没有定义完成标准。例如，“写一个 todo API”可能导致 AI 仅输出一个粗略的结构而停止，没有测试、没有验证，也没有文档。

良好的提示词应包括分阶段的要求和明确的验收标准。例如：

先描述分阶段任务。阶段 1 是核心功能，包括所有 CRUD 接口：POST `/todos` 创建，GET `/todos` 列表，GET `/todos/:id` 获取单个，PUT `/todos/:id` 更新，DELETE `/todos/:id` 删除。阶段 2 是输入验证：标题不能为空，完成状态必须为布尔值。阶段 3 是测试：为每个接口编写测试，覆盖率 > 80%。

然后定义验收标准：所有测试通过，代码通过 linter 检查，README 包含 API 文档。

最后定义唯一完成标记：`<promise>TODO_API_COMPLETE</promise>`。

这样 Claude 就会确切知道该做什么，以及何时真正完成任务。

### 更多提示模板

以下是一些常见任务模板，你可以直接使用或进行调整。

**模板 1：测试迁移（Jest -> Vitest）**

```text
/ralph-wiggum:ralph-loop "
Migrate all tests in this project from Jest to Vitest:
- Keep all test logic unchanged
- Update config files (vite.config.js, vitest.config.js)
- Replace Jest-specific APIs (e.g., jest.mock -> vi.mock)
- Ensure all tests pass
- Remove Jest-related dependencies

Acceptance criteria:
- npm test passes fully
- no Jest dependency in package.json
- project builds successfully

Output after completion: <promise>VITEST_MIGRATION_COMPLETE</promise>
" --max-iterations 40 --completion-promise "VITEST_MIGRATION_COMPLETE"
```

**模板 2：UI/UX 优化（移动优先）**

```text
/ralph-wiggum:ralph-loop "
Polish this project's UI/UX into a refined mobile-first language learning app:
- unify spacing and whitespace (use 4px base unit)
- establish clear type hierarchy (title/body/auxiliary text)
- unify styles for cards, lists, and shared components
- add bottom navigation (Home/Learn/Quiz/Progress/Settings)
- ensure mobile rendering quality

Acceptance criteria:
- npm run build succeeds
- no TypeScript errors
- key pages preview correctly on mobile

Output after completion: <promise>UI_UX_COMPLETE</promise>
" --max-iterations 25 --completion-promise "UI_UX_COMPLETE"
```

**模板 3：批量 TypeScript 注解**

```text
/ralph-wiggum:ralph-loop "
Add TypeScript type annotations to all functions in the project:
- prioritize src/ directory
- add types for function params and return values
- avoid any, use concrete types or unknown
- add necessary type definitions

Acceptance criteria:
- npm run typecheck passes
- no @ts-ignore or @ts-any comments
- code runs correctly

Output after completion: <promise>TYPES_ADDED</promise>
" --max-iterations 30 --completion-promise "TYPES_ADDED"
```

**模板 4：以 TDD 驱动的功能开发**

```text
/ralph-wiggum:ralph-loop "
Implement checkout functionality using TDD:
1. Write tests first (checkout.test.ts)
2. Run tests (should fail)
3. Write minimal code to pass tests
4. Refactor and optimize
5. Repeat until all tests pass

Feature requirements:
- shopping cart item list
- shipping fee calculation
- coupon application
- payment form validation

Acceptance criteria:
- all tests pass (npm test checkout.test.ts)
- code coverage > 80%
- no ESLint errors

Output after completion: <promise>CHECKOUT_COMPLETE</promise>
" --max-iterations 25 --completion-promise "CHECKOUT_COMPLETE"
```

**模板 5：代码风格统一**

```text
/ralph-wiggum:ralph-loop "
Unify code style across the project:
- format all files with Prettier
- unify naming conventions (variables camelCase, components PascalCase)
- remove unused imports and variables
- unify string quotes (single quotes)
- unify semicolon style (no semicolons)

Acceptance criteria:
- npm run lint passes
- consistent code style
- build succeeds

Output after completion: <promise>STYLE_UNIFIED</promise>
" --max-iterations 20 --completion-promise "STYLE_UNIFIED"
```

### 现实案例

一个著名案例发生在 Y Combinator 的黑客马拉松上，当时一个团队使用了 Ralph Loop。晚上 11 点，他们设定了一个任务：按顺序实现 6 个产品规格的 MVP，并为每个规格输出特定的完成标记。他们将最大迭代次数设为 200，然后去睡觉。

第二天早晨，他们有了 6 个可以演示的项目，API 成本仅为 297 美元。这就是 Ralph 的强大之处：当你睡觉时，AI 继续工作。

另一个案例来自 Boris Cherny（Claude Code 的负责人）。借助 Ralph 和 Opus 4.5，他在 30 天内交付了 259 个 PR，包括 497 次提交，新增 40,000 行代码，删除 38,000 行代码。最令人震惊的是，这一切都是由 Claude Code 生成的，而没有手动编写代码。

一个更疯狂的案例是 CURSED 编程语言。Ralph 的创造者 Geoffrey Huntley 用了 Ralph Loop 3 个月，自动构建了一个完整的编程语言。它的关键词使用了 Z 世代俚语（如 `slay`、`sus`、`based`），更重要的是，它包括一个完整的 LLVM 编译器实现、标准库，以及部分编辑器支持。这展示了 Ralph Loop 的真正潜力：只要你提供明确的目标，它可以持续工作数月，直到复杂项目真正完成。

### 更多现实案例

**自动化项目重构**

一位开发者使用 Ralph 对一个遗留项目进行了重构，该项目代码混乱，没有测试，缺少文档。分配的任务是：

1. 为现有代码添加测试
2. 分步重构，确保每次修改后测试通过
3. 更新文档

Ralph 在整个周末运行。到周一，已有 47 次提交，代码结构更清晰，测试覆盖率达到 75%，API 文档完整。成本约为 12 美元。

### Ralph 的理念

Ralph 体现了三个核心理念。

第一个是迭代优于完美。不期望一次就完美；使用循环来改进。第一次迭代可能只构建骨架，第二次修复错误，第三次优化，第四次添加测试；每轮都会更好。

第二个是将失败视为数据。每一次测试失败都是改进的机会；不要害怕失败，要从中学习。

第三个是持续尝试：不断尝试直到成功。这就是 Ralph 的精神。

### Ralph 适用与不适用的场景

了解 Ralph 适用的地方有助于节省时间和成本。

**Ralph 适用的场景**

这些任务有明确的完成标准，适合自动迭代：

| 场景 | 原因 |
|------|------|
| 测试迁移 | 有明确目标框架，通过测试验证 |
| 大规模重构 | 可以定义具体的重构规则 |
| 框架迁移 | 成功迁移可以通过工作代码验证 |
| 批量类型注解 | 类型检查通过即完成 |
| 提高测试覆盖率 | 覆盖率百分比是客观指标 |
| 文档生成 | API 文档可以自动验证 |
| UI/UX 统一 | 可以定义具体设计规则 |
| 可复现的 Bug 修复 | 测试可验证通过条件 |

**Ralph 不适用的场景**

这些任务需要人工判断或探索：

| 场景 | 原因 |
|------|------|
| 架构决策 | 例如微服务与单体架构需要权衡判断 |
| 安全敏感代码 | 漏洞可能隐蔽，难以自动检测 |
| 模糊需求 | 没有明确完成标准 |
| 探索性工作 | 方向不断变化 |
| 创意设计 | 需要人工审美判断 |
| 简单的一次性任务 | 使用 Ralph 过于复杂 |

**决策清单**

问自己三个问题：
1. **我能定义明确的完成标准吗？** 如果不能，则不适合
2. **是否有客观的验证方法？**（测试/构建/类型检查）如果没有，则不适合
3. **这个任务是否需要持续的人工反馈？** 如果是，则不适合

如果这三个问题的答案都是“否”，就让 Ralph 运行吧。

---

## 方法 3：增强版 Ralph

这是官方 Ralph 的社区增强实现。[frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) 项目增加了更强的安全机制。

### 附加功能

增强版 Ralph 添加了几个额外的安全功能。

首先是双重退出条件。官方 Ralph 只检查完成标记，而增强版需要完成标记和显式 `EXIT_SIGNAL` 才能停止。这意味着即使 Claude 输出了完成标记，循环也可以继续进行额外的验证，除非出现显式退出。

其次是速率限制。默认是每小时 100 次运行，防止如果出现错误导致无限循环而产生高额 API 费用。你可以调整这个限制。

第三是智能断路器。如果系统连续检测到五次完成标记，它将强制停止。这可以防止循环未正确终止的罕见边缘情况。

第四是实时仪表盘。增强版 Ralph 提供命令行仪表盘，显示当前迭代次数、任务进度和预计成本。

### 安装

通过从 GitHub 克隆来安装增强版 Ralph：

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

安装脚本会自动设置所需的文件和配置。

### 用途

增强版Ralph的使用有两个步骤。首先用`ralph-setup`初始化项目：

```bash
ralph-setup my-project
```

这将在项目中创建所需的配置文件。然后用 `ralph loop` 开始循环：

```bash
ralph loop
```

### 配置文件

增强的 Ralph 使用 `.claude/ralph-config.json`：

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations` 是最大环数。`rateLimitPerHour` 是每小时费率上限。`completionPromise` 是完成标记文本。`exitSignal` 是明确的出口信号。`costAlertThresholds` 定义预算警示水平。

---

## 方法4：代理团队（并行多代理）

当任务足够庞大时，一个Claude是不够的;你需要“团队协作”。

智能体 Teams 是一项高级功能，允许多个 Claude 实例并行运行，并通过共享的任务列表和依赖进行协调。这适用于非常大型的项目。在 Nicholas Carlini 的实验中，16 个并行代理在两周内生成了 100,000 行代码，并构建了一个能够编译 Linux 内核的 C 编译器。

智能体 Teams 更为复杂，我们将在下一节“3.3 智能体 Teams 多代理协作”中详细介绍。

---

## 方法5：后台任务（Ctrl B）

这是一种简单实用的非阻塞执行方法。

### 基本操作

使用非常简单。当Claude开始任务时，按下`Ctrl+B`将其推送到后台。

例如，你说：“运行完整测试套件。”Claude 开始运行。你按 `Ctrl+B`，Claude 回复：“任务推送到后台（ID： task_abc123）。”然后你可以继续：“同时，分析这个日志文件。”Claude 可以在测试继续时分析日志。

### 查看背景任务

有多种方法可以检查后台任务。使用 `/tasks` 列出所有任务，并附带任务 ID、状态和开始时间。点击 `Ctrl+T` 查看快速状态摘要。您还可以将任务带回前景，检查实时输出。

### 适合的情景

背景任务适合典型情境：

首先是长时间测试。完整套曲可能需要数十分钟，且后台模式避免阻塞。

其次，大型项目构建。构建流水线可以在你继续其他工作时运行。

第三，批处理文件操作，如批量重命名和格式化。

第四，任何你不想同步等待的事情。

---

## 安全机制：防止无限循环

任何自动化环路系统都必须包含保护措施，否则可能会失控。

### 硬性界限

最基本的保护是设置 `--max-iterations`（最大循环次数）。这是强制的。无论完成状态如何，任务都会在这个上限停止，阻止无限 API 支出。

你还可以强制执行时间限制，比如4小时后自动停止。你还可以设置预算提醒，在支出门槛时暂停并通知（例如10美元、50美元、100美元）。

### 智能检测

你可以添加智能死循环检测。例如，检查最近的提交是否包含有意义的更改：

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "No substantive changes in the last 5 commits, possible loop"
    exit 1
fi
```

如果最近的差异很小，系统可能卡住，应当停止并发出警报。

### 成本警报

在配置中设置成本警报阈值：

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

当支出达到10、50或100美元时，系统会暂停并通知，以便您决定是否继续。

### 手动检查点

对于重要任务，添加手动检查点：

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "Completed $iteration iterations. Continue? (y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

每10次迭代会暂停一次以进行确认，从而允许及时的人为干预。

---

## 实战构建：完整的BBS论坛与Ralph Loop

让我们用一个完整的示例展示Ralph Loop的强大功能。我们将从零开始构建一个BBS风格的论坛系统，包括用户认证、发帖、个人中心和管理员后台。

### 项目目标

构建一个功能齐全的BBS论坛系统，功能包括：

**用户端功能：**
- 用户注册、登录、登出
- 浏览帖子列表（分页）
- 查看帖子详情
- 发布新帖子
- 评论功能
- 个人中心（查看自己的帖子、更新资料）

**管理员后台功能：**
- 管理员登录
- 用户管理（封禁/解封）
- 帖子管理（删除/置顶）
- 评论管理
- 系统统计

**技术栈：**
- 后端：Node.js   Express   SQLite
- 前端：React   React Router   Axios
- 认证：JWT令牌
- 样式：Tailwind CSS

### 准备工作

首先安装Ralph Wiggum插件：

```bash
claude /plugins:add ralph-wiggum
```

### 启动 Ralph Loop

现在启动 Ralph Loop 来构建整个项目：

```bash
/ralph-wiggum:ralph-loop "
Please build a complete BBS forum system from scratch using TDD.

Project structure requirements:
- backend/ directory: Express API server
- frontend/ directory: React frontend app
- both directories have their own tests

Backend requirements:
- use Express framework
- SQLite storage (better-sqlite3)
- JWT auth (jsonwebtoken + bcrypt)
- user table: id, username, password, email, role, createdAt
- post table: id, title, content, authorId, category, pinned, createdAt
- comment table: id, content, postId, authorId, createdAt

Backend API endpoints:
- POST /api/auth/register - user register
- POST /api/auth/login - user login
- GET /api/posts - get post list (pagination + category filter)
- GET /api/posts/:id - get post detail
- POST /api/posts - create post (auth required)
- PUT /api/posts/:id - edit post (author or admin)
- DELETE /api/posts/:id - delete post (author or admin)
- POST /api/posts/:id/comments - add comment (auth required)
- GET /api/user/profile - get profile (auth required)
- PUT /api/user/profile - update profile (auth required)
- GET /api/admin/stats - admin statistics (admin only)
- GET /api/admin/users - user list (admin only)
- PUT /api/admin/users/:id/ban - ban user (admin only)

Frontend page requirements:
- /login - login page
- /register - register page
- / - home page (post list)
- /post/:id - post detail
- /new - publish post
- /profile - profile center
- /admin - admin panel (admin permission required)

Admin panel features:
- user management (view, ban, unban)
- post management (view, delete, pin)
- comment management (view, delete)
- system statistics (user count, post count, comment count)

TDD requirements:
- write tests first, then implementation
- each feature must have corresponding tests
- backend uses Jest, API tests cover all endpoints
- frontend uses Vitest, component tests cover major features
- auth middleware must have tests

Acceptance criteria:
- npm test (backend) passes
- npm test (frontend) passes
- frontend starts and works correctly
- backend API responds correctly
- proper permission isolation between normal users and admin
- code passes ESLint checks

Output after completion: <promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### 预计时间

根据复杂性：

**如果手动编码**：大约 40-60 小时（包括模式设计、认证系统、前后端集成和测试）

**使用 Ralph Loop**：
- 基础版本（核心功能）：大约 3-5 小时
- 完整版本（管理员后台 + 测试）：大约 6-10 小时

### 进度监控

在 Ralph Loop 运行时，你可以通过多种方式监控进度：

**迭代次数**：Ralph 显示当前和最大迭代次数，有助于估算剩余时间。

**日志**：你可以看到 Claude 当前的操作，例如设计模式、编写 API、构建组件和修复漏洞。

**测试状态**：每次测试运行结果都会显示。通过的测试增加，失败的测试减少。当失败数开始下降时，项目接近完成。

### 完成后验证

在 Ralph 输出完成标记后，进行人工验证：

```bash
# backend tests
cd backend
npm test

# frontend tests
cd frontend
npm test

# start backend
cd backend
npm start

# start frontend (in another terminal)
cd frontend
npm run dev
```

打开浏览器并测试：

1. 注册新用户
2. 登录
3. 浏览帖子
4. 发布新帖子
5. 添加评论
6. 打开个人中心
7. 注销并以管理员身份登录（默认账户：admin/admin123）
8. 测试管理员后台功能

### 注意事项

Ralph Loop 功能强大，但请注意以下几点：

**首先，更详细的提示会产生更好的结果。** 模糊的提示可能需要多次迭代来纠正。

**其次，设定合理的迭代上限。** BBS 系统较为复杂；建议至少 100 次迭代。

**第三，推荐 TDD（测试驱动开发）。** 先编写测试可以显著减少调试时间。

**第四，最终需要人工验证。** AI 可能会遗漏边缘情况或特殊场景，尤其是在安全敏感路径上。

**第五，密切关注数据库模式设计。** Ralph 可能需要多次迭代才能形成稳健的模式。

---

## 方法比较与选择

每种方法都有其特点，适用于不同场景。

True Loop 是最简单的：只需 5 行代码即可运行，适合快速实验和原型。但它功能有限，不能检测真实完成情况，仅依赖迭代上限。

Ralph Wiggum 是大多数场景的一般推荐。它有完整的 Stop Hook 机制，支持完成标记检查，提供官方支持，文档完善。

Enhanced Ralph 更适合生产环境，具有双退出条件、速率限制和智能断路器。

后台任务适合简单的非阻塞执行：只需按 `Ctrl+B`。但它仅是后台执行，不用于迭代循环编排。

---

## 总结

让 Claude Code 长期有效的核心理念很简单：不要要求它“一次完成”，而是要求“持续尝试直到真正完成”。

所有方法本质上都在做同一件事：给 Claude 一个任务，让它运行，检查是否真正完成，如果没有，则继续下一轮。

选择哪种方法取决于你的需求。

如果你想要简单快速，使用 While True Loop。只需五行就能运行，但功能有限。

如果你想要通用推荐，使用 Ralph Wiggum。官方支持，功能完善，适用于大多数情况。

如果用于生产场景，使用 Enhanced Ralph。它有额外的安全机制，更加可靠。

（对于 智能体 Teams 多智能体协作，见下一节：“3.3 智能体 Teams 多智能体协作。”）

希望本章能帮助你更有效地使用 Claude Code，使 AI 真正成为生产力工具，而不仅仅是聊天机器人。

---

## 参考资料

### 官方资源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code) - 完整的 Claude Code 官方文档
- [Ralph Wiggum 插件 README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - 官方插件文档
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - 官方 Hooks 系统文档

### 社区项目

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) (2.1k stars) - 增强版 Ralph 实现，具备额外保护措施
- [Awesome Ralph](https://github.com/snwfdhmp/awesome-ralph) - 精选 Ralph 资源和示例
- [Ralph Ryan](https://github.com/wquguru/ralph-ryan) - PRD 生成与 Ralph loop 集成
- [snarktank/ralph](https://github.com/snarktank/ralph) - 原版 Ralph 实现

### 文章与教程

**英文资源**

- [Geoffrey Huntley - Ralph 技术](https://ghuntley.com/ralph/) - 创作者原创 Ralph 概念  
- [可靠长时间运行 AI 代理的有效框架实践](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - 对 Anthropic 工程博客的深入阅读  
- [完整 Claude 代码指南](https://developer.aliyun.com/article/1705912) - 完整使用指南  

**中文教程**  

- [新手友好教程 - CSDN](https://m.blog.csdn.net/zsr154278963/article/details/156637281) - 详细安装和使用指南  
- [深度分析 - 头条](https://m.toutiao.com/a7585579989207188006/) - 机制和核心原理  
- [全栈通俗指南](https://www.jdon.com/90167-ralph-wigum-loop-explained-for-teens.html) - 从原理到实践的完整讲解  
- [新手和实用指南 - CNBlogs](https://www.cnblogs.com/buwai/p/19625356) - 基础与实用示例  
- [Ralph 循环深度解析 - CSDN](https://m.blog.csdn.net/roamingcode/article/details/156732443) - Stop Hook 机制细节  
- [Claude 代码永久引擎 - CSDN](https://m.blog.csdn.net/qq_44866828/article/details/156736656) - 无限循环迭代插件深度解析  
- [Ralph 循环新用户入门 - CNBlogs](https://www.cnblogs.com/gyc567/p/19495639) - 最佳实践和提示总结  

### 实践案例研究  

- [CURSED 编程语言](https://github.com/geoffreyhuntley/cursed) - 用 Ralph 在 3 个月内构建的完整编程语言  
- [Boris Cherny 的 30 天](https://twitter.com/boriskirov/status/1756002385683786616) - 259 个 PR 案例分享  
- [Y Combinator 黑客马拉松](https://github.com/geoffreyhuntley/ralph) - 6 个项目一夜生成案例  
- [Geoffrey Huntley 的博客](https://ghuntley.com/) - 创作者的技术博客