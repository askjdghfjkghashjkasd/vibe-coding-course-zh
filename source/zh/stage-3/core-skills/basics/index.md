# Claude Code 快速入门核心指南

Claude Code 是 Anthropic 官方的 AI 原生编码工具。它将大语言模型能力直接集成到终端中，因此您可以通过自然语言与 AI 协作完成编程任务。与传统的代码补全工具不同，Claude Code 能够理解整个项目的上下文并执行复杂的开发任务。从代码生成到重构，从调试到文档编写，它都能胜任。

本章将帮助您快速掌握 Claude Code 的核心使用方法，包括安装和设置、基本操作、实用技巧以及常用命令。无论这是您第一次使用 AI 编程工具，还是希望更高效地使用 Claude Code，这里都能找到您需要的内容。

---

## 快速安装

Claude Code 构建在 Node.js 上，因此安装前请确保系统中已安装 Node.js 18 或更高版本。安装过程非常简单，通常只需几分钟。

### 为什么需要 Claude Code

在传统的开发工作流程中，开发者经常在编辑器、终端、浏览器和文档之间切换。Claude Code 将这些工作流程统一到一个界面中：在同一个终端窗口中，您可以编写代码、运行测试、阅读文档，甚至与团队成员协作。更重要的是，它能够理解您的项目结构并记住您的编码习惯，成为真正的编程助手。

### 方法一：手动安装

手动安装适合喜欢对每一步都完全掌控的开发者，同时也有助于您清楚地了解工具的各个组件。

```bash
# Install Claude Code CLI globally
# Use -g to install command globally, so it can be used in any directory
npm install -g @anthropic-ai/claude-code

# Verify installation
# If version is shown (for example 0.1.25), installation succeeded
claude --version
```

在安装过程中，npm 会自动下载依赖项并配置环境变量。如果遇到权限问题，请尝试 `sudo`（macOS/Linux）或以管理员身份运行终端（Windows）。

### 方法 2：让 AI 代理为你安装

如果你已经在使用其他 AI 编程助手（例如 Cursor、Windsurf，或本项目中的 AI 代理），你可以让它们为你完成安装。好处是 AI 可以自动检测你的环境，处理依赖冲突，并为你的系统选择最佳的安装路径。

**你只需要说：**

```text
Help me install Anthropic Claude Code.
```

或者更具体地说：

```text
Install Claude Code CLI and check whether my Node.js version is compatible.
```

一个 AI 代理将会：
1. 检查当前的 Node.js 版本
2. 如果不符合要求，将提示您升级
3. 运行安装命令
4. 验证安装结果
5. 如果有问题，尝试自动修复

### 首次启动和初始化

安装完成后，进入您的项目目录并启动 Claude Code：

```bash
# Enter project directory (Claude Code works in current directory)
cd /path/to/your/project

# Start Claude Code
claude
```

首次启动时，Claude Code 会引导您完成几个重要的设置步骤：

1. **登录 Anthropic 账户**：您需要一个 Anthropic 账户才能使用 Claude Code。如果没有账户，系统会提示您注册。
2. **选择计划**：
   - **免费计划**：适合个人学习和轻量使用，有调用次数限制
   - **专业计划**：适合专业开发者，拥有更高配额和优先响应
3. **接受条款**：阅读并接受 Anthropic 条款和隐私政策
4. **可选：配置 API 密钥**：如果您有自定义密钥（例如来自第三方提供商），可以在此处配置

::: info 中国大陆用户特别说明

由于网络原因，中国大陆用户可能无法直接访问 Anthropic 官方服务。Claude Code 支持与 Anthropic API 格式兼容的第三方服务，这在技术上是可行的。

**您有两个选择：**

1. **直接使用 API 令牌**：从兼容 Anthropic API 的提供商购买令牌，并通过环境变量进行配置
2. **使用编码计划**：一些提供商提供的编码优化计划通常在编码场景下更具成本效益

**推荐方法**：让 AI 代理帮助您配置。您只需提供提供商的配置信息（API 端点、密钥等），AI 就可以正确设置环境变量。

**查看详细设置指南：** [如何安装 claudecode 并配置环境变量](/en/stage-2/backend/modern-cli/)

:::

---

## 快速开始：运行几个小实验

安装完成后，不要急于进入正式项目。先运行几个小实验，了解 Claude Code 的工作方式。这三个实验从简单到高级设计，分别对应三项核心能力：自然语言理解、内容生成和代码执行。

### 实验 1：对话 - 感受 AI 理解能力

目的是体验 Claude Code 的自然语言理解。与普通搜索引擎不同，Claude Code 能理解上下文，进行多轮对话，并根据您的反馈调整答案。

**尝试以下提示：**

```text
Hello, who are you?
```

Claude 自我介绍为 Claude Code，是由 Anthropic 开发的 AI 编程助手。

```text
What is a closure? Give me the too-long-didnt-read version.
```

观察克劳德如何将“太长没看”用作提示，并给出简明但准确的解释。

```text
What is the difference between JavaScript and TypeScript?
```

这是一个技术性对比问题。请检查 Claude 是否提供了结构化且深入的答案。

**实验要点**：注意 Claude 的回答风格。它通常先给出核心结论，然后再提供详细信息。这种“倒金字塔”式的风格非常适合快速获取信息。

### 实验 2：生成 Markdown 文档 - 体验内容创作

该实验演示了 Claude Code 的内容生成能力。对于开发者来说，编写文档通常很痛苦。Claude 可以根据需求快速生成清晰完整的文档。

**输入此指令：**

```text
Write a Markdown document of commonly used Git commands.
Requirements: include command, explanation, and example.
```

**Claude 的工作内容：**

1. 分析你的需求：常用 Git 命令、Markdown 格式，以及三个要素（命令/解释/示例）
2. 规划文档结构：通常按使用场景分组（初始化、日常开发、分支工作流、远程协作等）
3. 生成内容：为每个命令提供简明解释和实用示例
4. 格式化输出：使用 Markdown 语法和正确的结构

**预期输出示例**：

```markdown
# Common Git Command Cheat Sheet

## Initialize Repository

| Command | Explanation | Example |
|------|------|------|
| `git init` | Initialize new repository | `git init my-project` |
| `git clone` | Clone remote repository | `git clone https://github.com/user/repo.git` |

...
```

**高级尝试**：你可以添加额外要求，例如“添加中文注释”、“按频率排序”、“包含常见的错误处理”等，并观察Claude如何调整输出。

### 实验3：编写并运行游戏 - 端到端编码工作流程

这是最具挑战性的实验。它展示了Claude Code的完整工作流程：理解需求、编写代码、创建文件、运行程序以及处理错误。通过它，你可以真正感受到AI编程助手的强大。

**输入此指令：**

```text
Write a Snake game in Python.
Requirements:
1. Use pygame
2. Show score
3. Press ESC to exit

After writing, help me run it.
```

**Claude 执行以下步骤：**

**步骤 1：检查环境**
- 检查是否安装了 Python
- 检查是否可用 pygame
- 如果缺失则提示安装

**步骤 2：编写代码**
- 创建游戏入口文件（例如 `snake_game.py`）
- 实现移动、食物生成、碰撞检测
- 添加分数显示
- 实现 ESC 退出功能

**步骤 3：运行游戏**
- 执行 Python 脚本并启动游戏
- 游戏窗口弹出，使用方向键控制蛇

**步骤 4：后续支持**
- 如果有 bug，可以直接说“蛇可以穿墙，修复它”
- 如果你想要更多功能，例如“随着分数增加难度”，Claude 可以继续修改

**本实验的价值：**

1. **验证环境**：确认 Claude Code 可以正确执行代码
2. **体验交互**：感受与 AI 的协作开发
3. **建立信心**：看到 AI 完成端到端可运行程序

**常见问题：**

- **问：如果没安装 pygame 怎么办？**
  - 答：Claude 会检测并建议 `pip install pygame`，或你可以让 Claude 安装

- **问：游戏启动后终端被占用，怎么办？**
  - 答：按 ESC 退出游戏，或者在另一个终端窗口继续使用 Claude Code

- **问：可以切换语言吗？**
  - 答：当然可以。试试“用 JavaScript 编写”、“用 HTML5 Canvas 编写”等

---

## 核心技巧

掌握这些技巧可以让你的 Claude Code 效率提升数倍。它们来源于真实开发实践，涵盖高频场景。

### 技巧 1：双击 Esc 回滚对话 - 撤销误操作

这是 Claude Code 中最常用且重要的快捷键。在协作过程中，你可能输入错误、给出错误指令或不喜欢某个回答。双击 Esc 可以快速“时间回退”。

**快捷键详情：**

```text
Press Esc once     -> clear current input (similar to Ctrl+C)
Press Esc twice    -> roll back to previous conversation state (undo previous turn)
Press Esc three times -> clear all conversation history (start over)
```

**使用场景：**

- **场景 A**：你不小心发送了错误指令，Claude 开始执行。快速按两次 Esc 在执行前返回。
- **场景 B**：Claude 的回应不是你想要的，你想重新措辞。双按 Esc 以撤销并重新请求。
- **场景 C**：对话有很多轮次，且上下文混乱。三次按 Esc 清除并重新开始。

**重要提示**：双按 Esc 会回滚**对话状态**，而不是代码更改。如果 Claude 已经编辑了文件，这些编辑不会自动撤销。你必须通过 Git 手动恢复。

**建议**：在可能进行大规模代码修改之前，保存当前状态（`git commit` 或 `git stash`），以便轻松恢复。

### 技巧 2：使用 @ 来引用文件 - 精准控制上下文

虽然 Claude Code 可以自动读取项目文件，但显式引用文件可以使意图更清晰，并避免在无关文件上浪费令牌。

**基本用法：**

不要使用模糊的:

```text
Explain src/utils.ts
```

使用显式引用：

```text
@src/utils.ts Explain this file
```

**高级用法：**

**比较多个文件：**```text
@src/app.tsx @src/components/Header.tsx What is the relationship between these two files?
```

**参考目录：**```text
@src/components/ Summarize all components under this directory
```

**参考特定行（使用编辑器）：**```text
@src/utils.ts:45-60 Explain what this code does
```

**使用技巧：**

1. **Tab 补全**：输入 `@` 然后按 Tab，Claude 会显示当前目录下的文件列表，你可以用方向键选择
2. **相对路径**：支持引用如 `@./config.json` 或 `@../shared/types.ts`
3. **模糊匹配**：允许使用部分文件名，例如 `@utils` 可以匹配 `src/utils.ts` 或 `src/utils/index.ts`

### 技巧 3：使用 ! 执行命令 - 终端集成

Claude Code 内置命令执行功能。你可以在无需切换到其他终端的情况下运行命令。

**基本用法：**

```text
!npm test           # run tests
!git status         # check Git status
!ls -la             # list files
```

**实际场景：**

**场景：运行测试并分析失败**```text
!npm test
# after failure
Analyze test failure reasons and fix code
```

**场景：检查 Git 差异**```text
!git diff
# ask Claude to explain changes
Summarize key changes in this diff
```

**场景：构建项目**```text
!npm run build
# if build fails
Build failed, help me fix it
```

**安全提示：**

对于敏感命令（例如 `rm -rf`、`sudo`），Claude Code 会要求确认。这是一种保护机制。请仔细确认。

### 技巧 4：/plan 在编码前 - 正确处理复杂任务的方法

对于复杂任务，直接编码通常效率低下。`/plan` 进入规划模式：先定义实现计划，然后逐步执行。

**用法：**

```text
/plan
I want to add user authentication. Please create an implementation plan.
```

**Claude的工作内容：**

1. **分析需求**
2. **评估当前项目和技术栈**
3. **创建逐步计划**
4. **与您的反馈讨论并调整**

**示例输出：**

```text
📋 User Authentication Implementation Plan

Phase 1: Database design
- [ ] Create users table (id, email, password_hash, created_at)
- [ ] Create sessions table (id, user_id, expires_at)

Phase 2: Backend API
- [ ] POST /api/auth/register - register
- [ ] POST /api/auth/login - login
- [ ] POST /api/auth/logout - logout
- [ ] GET /api/auth/me - get current user

Phase 3: Frontend integration
- [ ] Create login page
- [ ] Create register page
- [ ] Add route guards

Phase 4: Testing
- [ ] Write unit tests
- [ ] Write integration tests

Which phase do you want to start with? Or should we adjust the plan?
```

**最佳实践：**

- 对于超过30分钟的任务，首先使用`/plan`
- 分阶段执行并验证每个阶段
- 如果需求发生变化，重新运行`/plan`进行调整

### 技术 5：/init 自动生成配置 - 快速项目初始化

`/init` 是 Claude Code 最强大的命令之一。它会自动扫描你的项目，识别堆栈和结构，并生成完整的 `CLAUDE.md`。

**用法：**

```text
/init
```

**Claude 执行：**

1. **扫描项目结构**：识别框架/语言/构建工具
2. **分析配置文件**：读取 package.json、tsconfig.json 等
3. **推断风格**：命名约定和文件组织
4. **生成 CLAUDE.md**

**生成的 CLAUDE.md 示例：**

```text
# My Project

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Database: Prisma + PostgreSQL

## Common Commands

\`\`\`bash
npm run dev      # start dev server
npm run build    # production build
npm run test     # run tests
npx prisma migrate dev  # DB migration
\`\`\`

## Code Conventions
- Use function components + Hooks
- File naming: PascalCase (components), camelCase (utility funcs)
- Commit style: Conventional Commits
```

**为什么这很重要：**

`CLAUDE.md` 是 Claude Code 的“项目记忆”。每次启动时，Claude 会读取此文件并理解项目背景。这意味着：

- 你不需要反复解释框架和技术栈
- Claude 会遵循你的规范和最佳实践
- 新团队成员可以更快上手

**建议**：在项目初始化后，立即运行 `/init`，然后根据实际情况优化生成的配置。

### 技巧 6：/compact 压缩上下文 - 节省 词元

Claude Code 的上下文窗口有限（通常约 20 万个 token）。长对话会消耗大量 token，增加成本，并可能将重要的早期信息推出上下文。

**用法：**

```text
/compact
```

**工作原理：**

`/compact` 分析聊天记录，提取关键信息（所做的决策、生成的代码、确认的需求），并创建简明摘要。后续对话将基于此摘要而非完整历史记录。

**使用时机：**

- 在进行 5-6 轮对话后
- 当 Claude 似乎“忘记”之前的上下文时
- 切换到新子任务但保留关键背景信息时

**建议：**

```text
# compress after long conversation
/compact

# keep working
Now that user module is done, let's build order module.
```

### 技巧 7：使用 Claude Code 辅助 Git 提交

在 Claude Code 中，推荐的提交工作流是：让 Claude 检查差异并起草提交信息，然后你运行标准 Git 命令。这很清楚，并且在提交前给你提供了一个额外的审查检查点。

官方参考资料：

- [内置命令](https://code.claude.com/docs/en/commands)
- [发现插件](https://code.claude.com/docs/en/discover-plugins)

**推荐工作流：**

```bash
# 1. Check current changes
/diff
!git status

# 2. Ask Claude to summarize and generate commit message
Based on current git diff, generate a Conventional Commits message,
and explain in Chinese why this category is appropriate.

# 3. After you confirm, run standard Git commit
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**这种方法的好处：**

1. **与当前官方能力一致**：不依赖已移除的内置功能
2. **透明**：在提交前查看差异和提交信息
3. **可移植**：相同的工作流程可在其他 AI 集成开发环境 或纯 Git 中使用

**如果你想要“单命令提交”的体验：**

Claude Code 现在推荐基于插件的扩展。例如，`commit-commands` 提供像 `/commit-commands:commit` 这样的命令。

```bash
# 1. Add plugin marketplace example
/plugin marketplace add anthropics/claude-code

# 2. Install commit workflow plugin
/plugin install commit-commands@anthropics-claude-code

# 3. Reload plugins
/reload-plugins

# 4. Use plugin command to commit
/commit-commands:commit
```

**附加说明：**

- `/commit-commands:commit` 由插件提供，而不是当前默认内置命令
- 如果你只需要在提交前检查更改，建议使用 `/diff` 或请 Claude 解释 `git diff`
- 官方 `/review` 也已被标记为弃用；具有类似功能，请使用插件或自然语言审查流程

### 技巧 8：Shift Tab 自动接受 - 提升流畅性

默认情况下，Claude 在编辑代码前会要求确认。这在学习阶段很有用，但之后可能会感觉慢。`Shift+Tab` 启用自动接受模式以加快迭代速度。

**使用方法：**

- 按 `Shift+Tab` -> 进入自动接受模式
- 再次按 `Shift+Tab` -> 退出自动接受模式

**模式对比：**

| 模式 | 行为 | 使用场景 |
|------|------|----------|
| 默认模式 | 每次编辑都要求确认 | 学习阶段，重要代码 |
| 自动接受 | 直接应用编辑 | 熟悉后，快速迭代 |

**注意事项：**

- 在自动接受模式下，Claude 会直接编辑文件，无需二次确认
- 建议与 Git 配合使用，以便回滚
- 对于敏感操作（删除文件、修改关键配置），Claude 仍会询问

### 技巧 9：Ctrl C 取消操作 - 紧急刹车

当 Claude 正在运行长任务，或者你发现给出了错误指令时，`Ctrl+C` 就是紧急刹车。

**使用方法：**

- 按一次 `Ctrl+C` -> 取消当前正在运行的操作
- 连续按两次 `Ctrl+C` -> 完全退出 Claude Code

**使用场景：**

- 需要中断长时间运行的命令
- Claude 正在生成大量无关代码
- 检测到错误指令，需要立即停止

**与双 Esc 的区别：**

- `Ctrl+C`：停止正在进行的**操作**（运行命令/生成代码）
- `double Esc`：回滚**对话状态**（撤销上一步）

### 技巧 10：/context 检查上下文使用 - 优化 词元 成本

`/context` 显示当前会话上下文使用情况，帮助你了解 token 消耗并优化成本。

**使用方法：**

```text
/context
```

**示例输出：**

```text
📊 Context Usage

Token usage: 45,230 / 200,000 (22.6%)
File references: 12 files
Conversation rounds: 8

Top token-consuming files:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Suggestions:
- Current usage is healthy, no compression needed
- To reduce usage, add node_modules into .claudeignore
```

**如何使用这些信息：**

1. **识别大文件**：如果某个文件占用了很多令牌，检查它是否真的需要
2. **优化 .claudeignore**：忽略无关文件（node_modules、构建输出等）
3. **决定何时压缩**：当使用率超过 70% 时，考虑 `/compact`

### 技巧 11：/resume 恢复会话 - 切换多任务对话

在处理多个任务时，你可能会运行多个对话线程。`/resume` 让你在当前聊天中切换回之前的会话上下文，而无需重新启动。

**用法：**

```text
/resume
```

**工作原理：**

Claude Code 会自动记录以前的会话。当你运行 `/resume` 时，它会切换到之前的会话上下文，并保留所有先前的讨论内容和状态。

**使用场景：**

**场景 A：并行多任务处理**```text
# Task 1: fix bug
claude> Fix login-page validation issue
# ... one conversation ...

# Task 2: add feature (new thread)
claude> Add user registration feature
# ... another conversation ...

# Switch back to task 1
claude> /resume
# Continue previous bug-fix work
```

**案例 B：临时查找然后返回**```text
claude> Explain this algorithm
# ... discuss algorithm ...

claude> /resume
# Return to previous coding work
```

**情况C：中断后恢复**```text
claude> Continue previous work
# If you interrupted before, /resume brings you back
```

**与相关命令的比较：**

| 命令 | 功能 | 场景 |
|------|------|----------|
| `/resume` | 在当前聊天中切换回上一个会话 | 多任务切换 |
| `claude -c` | 继续最近的会话 | 退出后重新连接 |
| `claude -r` | 恢复上一个会话 | 退出后恢复先前状态 |
| `double Esc` | 回滚一轮对话 | 撤销最近的一次对话 |

**建议：**

1. **多任务管理**：`/resume` 比重新说明上下文更高效
2. **会话记忆**：每个会话有独立的上下文；`/resume` 可保留上下文
3. **与 /compact 一起使用**：在长会话中，先压缩，然后再切换回会话以保持上下文清晰

---

## 核心配置

合理的配置有助于 Claude Code 更好地适应你的项目和团队。本节讲解配置的作用、优先级以及在不同使用场景下的优化方法。

### 配置文件位置和优先级

Claude Code 使用分层配置策略。不同层级具有不同的作用域和优先级。了解这些可以灵活管理设置。

**配置优先级（从高到低）：**

| 位置 | 作用域 | 目的 | 是否提交到 Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | 本地项目 | 个人偏好 | ❌ 否 |
| `.claude/settings.json` | 项目共享 | 团队配置 | ✅ 是 |
| `~/.claude/settings.json` | 全局 | 个人默认 | ❌ 否 |

**合并规则：**

- 高优先级配置会覆盖低优先级配置中的同名键
- 不冲突的键会被合并
- 项目配置覆盖全局配置
- 本地个人配置覆盖共享项目配置

**实际场景：**

**场景 1：团队项目**```text
~/.claude/settings.json          # your personal default editor settings
.claude/settings.json            # team coding standards and permission config
.claude/settings.local.json      # your debug preferences and theme settings
```

**情境 2：个人项目**```text
~/.claude/settings.json          # global default config
.claude/settings.json            # project-specific config (e.g. special permission rules)
```

### CLAUDE.md - 项目记忆

`CLAUDE.md` 是 Claude 代码配置中最重要的文件。它像一个项目的“手册”。每次 Claude 代码启动时，它都会读取当前目录下的 `CLAUDE.md`，以理解背景、技术栈和规范。

**为什么 CLAUDE.md 如此重要：**

想象加入一个新项目：你需要了解技术栈、编码规范和常用命令。通常这需要几个小时的文档/代码审查和向团队成员提问。有了 `CLAUDE.md`，Claude 在启动时就知道这些信息，你可以立即高效协作。

**最小可行模板：**

```text
# [Project Name]

## Tech Stack
- Framework: React 18 + TypeScript
- State: Zustand
- Styling: Tailwind CSS
- Build tool: Vite

## Common Commands

\`\`\`bash
npm run dev      # start development server (port 5173)
npm run test     # run unit tests
npm run build    # production build
npm run lint     # lint checks
\`\`\`

## Code Conventions
- Components use function components + Hooks
- Naming: PascalCase (components), camelCase (utility funcs)
- Git commits use Conventional Commits
- All API calls must go through unified request wrapper
```

**完整模板（推荐）：**

```text
# [Project Name]

## Project Overview
One-sentence description of main functionality and target users.

## Tech Stack
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- State: Zustand + React Query
- Styling: Tailwind CSS + Headless UI
- Build: Vite

### Backend (if applicable)
- Runtime: Node.js + Express
- Database: PostgreSQL + Prisma
- Auth: JWT + bcrypt

## Project Structure

\`\`\`
src/
├── components/      # reusable components
├── pages/           # page components
├── hooks/           # custom Hooks
├── lib/             # utility functions
├── types/           # TypeScript types
└── api/             # API calls
\`\`\`

## Common Commands

\`\`\`bash
# development
npm run dev              # start dev server
npm run dev:mock         # use mock data in development

# testing
npm run test             # run all tests
npm run test:watch       # watch mode
npm run test:coverage    # generate coverage report

# code quality
npm run lint             # ESLint check
npm run lint:fix         # auto-fix ESLint issues
npm run format           # Prettier format
npm run typecheck        # TypeScript type check

# build
npm run build            # production build
npm run preview          # preview production build
\`\`\`

## Development Rules
### Code style
- Use function components, avoid class components
- Prefer custom Hooks for logic abstraction
- Component props must define TypeScript interfaces

### Git workflow
- Branch prefix: `feature/`, `fix/`, `refactor/`
- Commit messages follow Conventional Commits
- PR must pass CI and code review

### Performance requirements
- Component lazy loading to reduce first-screen load time
- Use WebP images and enable lazy loading
- Keep API response time under 200ms

## Environment Variables

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Common Issues

### Dev server failed to start?

Check whether port 5173 is occupied, or try `npm run dev -- --port 3000`

### Type errors?

Run `npm run typecheck` to see detailed errors
```

**快速生成 CLAUDE.md：**

如果您的项目存在但没有 `CLAUDE.md`，请运行 `/init`：

```bash
claude
# inside Claude Code
/init
```

Claude 分析项目结构、package.json 和当前代码，然后生成一个实用的 `CLAUDE.md`。生成后，需要手动审查和调整。

### .claudeignore - 节省 词元

`.claudeignore` 告诉 Claude Code 哪些文件不应读入上下文。正确的配置可以显著减少 词元 使用量（通常 40-60%）并提高响应速度。

**为何需要 .claudeignore：**

当 Claude Code 尝试理解项目时，它会读取相关文件。有些文件对理解项目没有帮助，并可能：
- 消耗大量 词元（例如 node_modules 中的类型定义文件）
- 引入噪音（日志、构建输出）
- 包含敏感信息（.env 文件）

**推荐配置：**

```text
# ===== dependencies =====
# huge third-party code, usually unnecessary for Claude context
node_modules/
.pnp/
.pnp.js

# ===== build outputs =====
# generated artifacts, not source logic
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== logs =====
# runtime logs, no value for understanding architecture
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== testing outputs =====
coverage/
.nyc_output/

# ===== editor / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== system files =====
.DS_Store
Thumbs.db

# ===== env files =====
.env
.env.local
.env.*.local

# ===== large binary assets =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== lock files (optional) =====
# If you do not need Claude to analyze dependency versions, ignore these
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**配置提示：**

1. **从最小开始**：首先忽略 node_modules 和构建输出文件，然后观察令牌使用情况
2. **按项目调整**：图像-heavy 项目 -> 忽略图像格式；文档项目 -> 保留 Markdown
3. **定期优化**：使用 `/context` 查看消耗令牌最多的文件，并决定是否忽略

### 权限配置

默认情况下，Claude Code 在执行敏感操作前会要求确认。通过 `settings.json` 中的 `permissions`，您可以控制哪些操作自动允许、需要确认或完全禁止。

**权限配置结构：**

```json
{
  "permissions": {
    "allow": [
      // auto-allow without asking
    ],
    "ask": [
      // ask before execution
    ],
    "deny": [
      // fully deny
    ]
  }
}
```

**规则语法：**

权限规则使用 `ActionType(pattern)` 格式：

| 操作类型 | 描述 | 示例 |
|----------|------|------|
| `Bash` | 运行终端命令 | `Bash(git status)` |
| `Edit` | 编辑文件 | `Edit(src/**/*.ts)` |
| `Read` | 读取文件 | `Read(README.md)` |
| `Write` | 创建文件 | `Write(src/components/*.tsx)` |

**通配符支持：**

- `*` 匹配任意字符（不包括 `/`）
- `**` 匹配任意路径
- `?` 匹配一个字符

**实际配置示例：**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**配置建议：**

1. **开发阶段**：权限相对宽松，以便更快迭代
2. **生产阶段**：权限更严格，尤其是部署和敏感数据操作
3. **团队协作**：将基线规则放在共享的 `settings.json`，个人调整放在 `settings.local.json`

### 规则目录

对于大型项目，单个 `CLAUDE.md` 可能会变得臃肿且难以维护。Claude Code 支持通过 **规则目录** 进行模块化管理，将不同主题的约定拆分到单独的文件中。

**目录结构：**

```text
.claude/
├── settings.json          # main config file
├── CLAUDE.md              # project overview (still needed)
└── rules/                 # rules directory
    ├── 00-security.md     # security rules (global)
    ├── 01-coding-style.md # coding style rules (global)
    ├── 10-api.md          # API dev rules
    ├── 11-frontend.md     # frontend dev rules
    ├── 12-backend.md      # backend dev rules
    └── 20-testing.md      # testing rules
```

**文件名建议：**

使用数字前缀 (`00-`、`01-`) 来控制加载顺序：先是基本规则，后是特定规则。

**规则文件格式：**

规则文件支持 YAML 前置内容以定义适用性：

```markdown
---
# Optional: paths where this rule applies
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Optional: commands where this rule applies
commands:
  - "generate api"
  - "create endpoint"

# Optional: rule priority (smaller number = higher priority)
priority: 10
---

# API Development Rules

## Route design
- RESTful style, use plural nouns
- Versioning: /api/v1/users
- Nested resources: /api/v1/users/123/orders

## Request/response format
- Use JSON consistently
- Error response must include code and message
- Pagination response uses { data, pagination } structure

## Security requirements
- All endpoints must verify authentication (except public endpoints)
- Sensitive operations require secondary confirmation
- Implement rate limiting to prevent abuse
```

**规则继承与覆盖：**

- 全局规则（无 frontmatter 或 `globs: *`）适用于所有文件
- 路径特定规则仅适用于匹配的文件
- 如果规则冲突，优先级更高的规则生效
- 特定规则可以覆盖全局规则

**使用场景示例：**

**场景 1：前端-后端分离的项目**```text
.claude/rules/
├── 00-general.md          # general standards (commit message, naming)
├── 10-backend.md          # backend standards (NestJS-specific)
├── 11-frontend.md         # frontend standards (React-specific)
└── 20-database.md         # database standards (Prisma-specific)
```

**场景 2：微服务架构**```text
.claude/rules/
├── 00-global/             # global rules
│   ├── security.md
│   └── logging.md
├── 10-services/           # service-specific rules
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # shared component rules
    ├── shared-lib.md
    └── common-utils.md
```

**迁移建议：**

如果你已经有一个非常大的 `CLAUDE.md`，请按如下方法迁移到 Rules 目录：

1. 创建 `.claude/rules/`
2. 按主题拆分 `CLAUDE.md`
3. 每个规则文件添加适当的 frontmatter
4. 保留 `CLAUDE.md` 作为项目概览，将详细标准移出
5. 测试并确保规则加载正常

---

## 核心操作命令

Claude Code 提供了一整套操作命令，以实现高效的 AI 协作。这些命令分为几类：斜杠命令（内置功能）、符号系统（简短操作）、自然语言指令（日常开发）。

### 斜杠命令快速参考

斜杠命令是以 `/` 开头的内置操作。它们提供标准化操作，如项目初始化、配置管理和状态检查。

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `/help` | 显示所有命令 | 忘记命令时快速查找 |
| `/init` | 初始化项目并生成 CLAUDE.md | 新项目或添加配置 |
| `/plan` | 进入计划模式 | 在复杂任务前创建计划 |
| `/clear` | 清除对话历史 | 上下文混乱时重启 |
| `/compact` | 压缩上下文 | 长对话后节省 tokens |
| `/diff` | 打开交互式 diff 视图 | 检查当前未提交的更改 |
| `/plugin` | 管理插件 | 安装提交/审核扩展 |
| `/context` | 显示上下文使用情况 | 优化 token 消耗 |
| `/cost` | 显示会话费用 | 监控使用成本 |
| `/config` | 打开配置面板 | 更新设置 |
| `/permissions` | 权限管理 | 调整操作权限 |
| `/model` | 切换模型 | 选择不同模型 |

**命令组合示例：**

```bash
# complete development workflow
/plan                    # 1. create plan
# ... execute development ...
/diff                    # 2. inspect changes
Generate a commit message from current diff
!git add -A              # 3. stage changes
!git commit -m "..."     # 4. commit
/cost                    # 5. check cost
```

### 符号系统

符号系统是Claude Code的速记操作机制。特殊符号可以快速触发特定功能。

| 符号 | 名称 | 目的 | 示例 |
|------|------|------|------|
| `/` | 斜杠命令 | 执行内置操作 | `/help`, `/plan` |
| `@` | @引用 | 引用文件/目录 | `@src/app.tsx` |
| `!` | 感叹号模式 | 运行终端命令 | `!npm test` |
| `&` | 后台运行 | 在后台运行任务 | `&npm run dev` |

**符号组合提示：**

```bash
# combine symbols
@src/utils.ts !npm test
# meaning: read utils.ts, then run tests

@src/components/ @src/pages/ compare structures of these two directories
# meaning: reference two directories simultaneously for comparison

!git diff @src/app.tsx explain these changes
# meaning: inspect Git diff and ask Claude to explain specific file changes
```

### 文件操作

文件操作是最常见的日常操作：读取、编辑、创建和删除文件。

**读取文件：**

```bash
# basic read
@src/app.tsx explain this file

# read + analyze
@src/utils/helpers.ts find potential performance issues

# compare read
@src/components/OldButton.tsx @src/components/NewButton.tsx compare differences
```

**编辑文件：**

```bash
# simple edit
Modify formatDate in src/utils/date.ts to support Chinese locale format

# complex edit
@src/api/users.ts Refactor this file:
1. Extract duplicated error handling into shared handleError
2. Replace Promise chains with async/await
3. Add JSDoc comments

# batch edit
Convert all class components under src/components/ into function components
```

**创建文件：**

```bash
# create one file
Create src/components/UserCard.tsx, a card component to display user info

# create related files
Create user module:
1. src/types/user.ts - define User interface
2. src/api/users.ts - user API calls
3. src/components/UserCard.tsx - user card component
4. src/hooks/useUser.ts - hook to fetch user data
```

**删除文件：**

```bash
# delete with confirmation
Delete src/old-component.tsx (this component is no longer used)

# Claude asks for confirmation and may suggest checking references first
```

### Git 操作

Claude Code 与 Git 深度集成，因此您可以在不离开终端的情况下完成完整的版本控制工作流。

**检查状态：**

```bash
# show Git status
Show git status and uncommitted changes

# detailed diff
!git diff
Explain changes in src/api/users.ts
```

**创建提交：**

```bash
# inspect changes
/diff

# generate commit message
Generate a Conventional Commit message from current git diff

# commit manually
!git add -A
!git commit -m "..."
```

**分支操作：**

```bash
# create feature branch
!git checkout -b feature/user-authentication

# after implementation
Generate commit message based on current changes
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**完整的 Git 工作流程示例：**

```bash
# 1. start new feature
!git checkout -b feature/payment-integration

# 2. develop feature (with Claude assistance)
Create payment module with Alipay and WeChat Pay

# 3. run tests
!npm test

# 4. inspect changes
/diff

# 5. generate and confirm commit message
Generate a Conventional Commit message from current git diff
!git add -A
!git commit -m "..."

# 6. push remote
!git push -u origin feature/payment-integration

# 7. create PR (optional, with GitHub CLI)
!gh pr create --title "feat: add payment integration" --body "Support Alipay and WeChat Pay"
```

### 代码操作

代码操作是 Claude Code 的核心优势：生成、解释、重构和优化。

**生成代码：**

```bash
# generate component
Create a React Hook to manage auth state, including login/logout/permission checks

# generate utility function
Create a date-formatting utility that supports relative time (e.g. "2 hours ago")

# generate complete module
Create order module with:
- order list page
- order detail page
- create-order API
- order status management
```

**解释代码：**

```bash
# line-by-line explanation
Explain src/algorithms/quicksort.ts line by line

# high-level explanation
@src/services/payment.ts explain architecture design of this module

# explain complex logic
Explain what reduce in src/utils/dataTransformer.ts is doing
```

**重构代码：**

```bash
# architecture refactor
Convert class components in src/components/ to function components

# performance refactor
Optimize rendering performance in src/App.tsx, reduce unnecessary re-renders

# cleanup refactor
@src/utils/helpers.ts Refactor this file:
1. Delete unused functions
2. Extract repeated logic into shared utilities
3. Add type definitions
4. Improve function naming
```

**调试代码：**

```bash
# error analysis
npm test failed, analyze root cause and fix it

# performance analysis
@src/components/DataTable.tsx This component renders slowly, find bottlenecks

# log analysis
!cat logs/error.log
Analyze these error logs and identify root cause
```

### 测试操作

测试对于质量保证至关重要。Claude Code 可以帮助生成测试、运行测试并分析结果。

**生成测试：**

```bash
# unit tests
Generate unit tests for src/utils/math.ts, including boundary cases

# component tests
Generate React Testing Library tests for src/components/UserForm.tsx

# integration tests
Create integration test for user registration flow from form submission to DB write
```

**运行和调试测试：**

```bash
# run tests
!npm test

# debug failed tests
Analyze failure reasons and fix
@tests/auth.test.ts

# coverage check
!npm run test:coverage
Which code paths are not covered?
```

**测试策略建议：**

```bash
I added user authentication. Please:
1. Generate unit tests for auth.service.ts
2. Generate component tests for LoginForm
3. Run all tests and ensure pass
```

### 命令链和工作流组合

使用 Claude Code 的最高效方式是将命令链接成完整的工作流。

**场景 1：修复漏洞的工作流**

```bash
# 1. inspect issue
!npm test
Tests failed, analyze why

# 2. locate issue
@src/utils/validation.ts Is the issue in this file?

# 3. fix issue
Fix isEmail in validation.ts to correctly handle addresses containing +

# 4. verify fix
!npm test

# 5. commit fix
Generate a fix-type commit message from current diff
!git add -A
!git commit -m "fix: ..."
```

**场景 2：代码审查工作流程**

```bash
# 1. inspect changes
!git diff --stat
Which files changed?

# 2. detailed review
@src/components/ Review these component changes

# 3. suggest improvements
What improvements should be made based on this review?

# 4. implement improvements
Optimize performance of UserList component

# 5. final review
/diff
Review current changes and point out potential risks and improvements
```

**场景 3：新功能工作流程**

```bash
# 1. plan first
/plan
I want to add shopping cart feature

# 2. create branch
!git checkout -b feature/shopping-cart

# 3. implement feature
Implement step by step according to plan

# 4. add tests
Generate tests for shopping cart module

# 5. run tests
!npm test

# 6. code review
/diff
Please do a code review on current diff

# 7. commit
Generate commit message for this feature development
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## 常见问题解答

在使用 Claude Code 时，您可能会遇到各种问题。本节总结了常见问题及解决方案。

### 令牌使用过快？

令牌消耗过快是最常见的问题之一。以下是完整的优化策略。

**诊断：**

首先运行 `/context` 检查当前的令牌使用情况：

```text
/context
```

关注：
- **令牌使用率**：如果超过70%，考虑进行上下文压缩
- **引用文件数量**：文件越多，令牌消耗越高
- **大文件**：检查哪些文件消耗的令牌最多

**优化策略：**

**1. 改进 .claudeignore**

确保 `.claudeignore` 包含不必要的文件：

```text
# must ignore
node_modules/
dist/
build/
*.log
.env

# project-specific
# React
.next/
out/

# Vue
.nuxt/
.output/

# generic
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. 定期压缩上下文**

长对话会累积大量 token。建议每 5-6 轮运行 `/compact`：

```text
# after long conversation
/compact

# continue
Now let's implement order module...
```

**3. 精确引用文件**

如果不必要，避免引用整个目录：

```bash
# not recommended
@src/ Explain this code

# recommended
@src/utils/auth.ts @src/components/Login.tsx Explain login flow
```

**4. 避免阅读巨大的文件**

如果 `/context` 显示某个文件消耗了很多 token，考虑：
- 你真的需要它吗？
- 是否只能引用其中一部分？
- 这个文件能否拆分成更小的模块？

### Claude 不理解项目？

如果 Claude 回答不准确或反复询问基本的项目信息，说明它缺乏项目上下文。

**解决方案：**

**1. 生成 CLAUDE.md**

运行 `/init` 来生成项目配置：

```bash
/init
```

生成后，验证：
- 项目概述是否准确？
- 技术栈是否完整？
- 常用命令是否正确？
- 编码规范是否清晰？

**2. 手动编辑 CLAUDE.md**

如果自动生成的配置不够详细，添加：

```markdown
## Project-Specific Information

### Architecture Decisions
- Why choose X over Y?
- What are core design patterns?

### Common Pitfalls
- When using useEffect, watch out for...
- DB queries must...

### Third-Party Integrations
- Payments via Stripe
- Email via SendGrid
- File storage via AWS S3
```

**3. 使用规则目录**

对于大型项目，将约定组织在规则目录中：

```text
.claude/rules/
├── 00-architecture.md    # architecture overview
├── 01-coding-style.md    # coding style
├── 10-frontend.md        # frontend rules
├── 11-backend.md         # backend rules
└── 20-testing.md         # testing rules
```

**4. 在需要时在提示中添加上下文**

对于特定任务，附加相关背景：

```text
We use a custom useAuth Hook for authentication.
It returns { user, login, logout, isLoading }.
Please build a user-menu component based on this Hook.
```

### 如何回滚操作？

Claude Code 为不同的场景提供了多种回滚机制。

**场景 1：回滚会话状态**

如果您只是输入错误或不喜欢回复：

```text
Double Esc  -> rollback previous turn
Triple Esc  -> clear all conversation history
```

**注意**：这只会回滚对话状态，而不会回滚文件编辑。

**场景2：撤销文件编辑**

如果Claude已经修改了文件，请手动撤销：

```bash
# check changes
!git status
!git diff

# revert one file
git checkout -- src/utils/helpers.ts

# revert all working tree changes
git checkout -- .

# if already committed
# soft rollback (keep changes)
git reset --soft HEAD~1

# hard rollback (discard changes)
git reset --hard HEAD~1
```

**场景 3：预防性使用 Git 工作流**

最佳实践：在 Claude 会话前保存当前工作：

```bash
# save current state before starting
git add .
git commit -m "WIP: before Claude Code session"
# or use stash
git stash push -m "before claude"

# develop with Claude Code...

# if result is unsatisfactory, full rollback
git reset --hard HEAD~1
# or
git stash pop
```

### 太多的权限提示？

频繁的权限确认会降低效率。正确的权限配置可以让工作流程更顺畅。

**权限模型：**

Claude Code 的权限有三个级别：
- **允许**：自动允许
- **询问**：执行前询问
- **拒绝**：完全拒绝

**优化配置：**

编辑 `.claude/settings.json`：

```json
{
  "permissions": {
    "allow": [
      // Git read operations
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // test and checks
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // dev server
      "Bash(npm run dev:*)",

      // source edits
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Git write operations
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // package management
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // build and deployment
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // config file edits
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // sensitive file reads
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // dangerous commands
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // system files
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // Git internals
      "Edit(.git/*)"
    ]
  }
}
```

**渐进式权限策略：**

- **学习阶段**：保持默认设置，并了解Claude尝试执行的操作
- **熟悉阶段**：将常见的安全操作（如 git status、npm test）加入允许列表
- **高效阶段**：根据项目特点创建细粒度规则

### 在中国大陆如何使用？

由于网络限制，中国用户可能无法直接访问Anthropic官方服务。这里有几种选择。

**选项1：使用API代理服务**

许多云提供商提供兼容Anthropic的API代理服务：

```bash
# set env vars
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# start Claude Code
claude
```

**选项 2：使用第三方 Claude Code 兼容工具**

一些国内供应商提供兼容的工具：

```bash
# install compatible version
npm install -g @some-provider/claude-code

# configure API key
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**选项 3：使用其他 AI 编程工具**

如果 Claude Code 不可用，可考虑以下替代选项：

| 工具 | 特点 | 使用场景 |
|------|------|----------|
| Cursor | 基于 VS Code，全功能 | 完整的 IDE 体验 |
| GitHub Copilot | 强大的自动补全 | 主要用于代码补全 |
| 统义灵马 | 国内产品，在中国稳定 | 国内开发环境 |
| Codeium | 免费额度丰富 | 预算有限 |

**选项 4：让 AI 助手帮忙配置**

如果你不确定如何配置，可以请 AI 助手帮忙：

```text
I want to use Claude Code, but I cannot directly access it in mainland China.
I bought an API from provider XXX.
API endpoint is https://api.xxx.com,
key is sk-xxx.

Please configure environment variables so Claude Code can work correctly.
```

**常见问题：**

- **问：配置后仍然无法连接？**
  - 答：检查 API 端点是否正确，包括 `/v1` 路径
  - 答：检查 API 密钥的有效性和余额
  - 答：检查本地网络是否需要代理

- **问：响应速度慢？**
  - 答：选择地理位置更近的提供商
  - 答：使用为编码优化的方案而非通用 API 方案
  - 答：使用 `/compact` 以减少令牌使用量

- **问：某些功能不可用？**
  - 答：某些第三方提供商可能不完全支持全部 Claude Code 功能
  - 答：查看提供商文档了解支持的功能范围

---

## 参考资源

- [Claude Code 官方文档](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)