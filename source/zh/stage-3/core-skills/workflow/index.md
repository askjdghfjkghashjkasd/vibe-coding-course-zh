# AI 辅助开发工作流

在前几章中，我们学习了如何使用 AI 集成开发环境 来编写代码，如何使用 Git 管理代码版本，以及如何设计和实现 API 接口。但当你面对一个真实的开发任务时，你可能会遇到如下问题：

- “这个项目有成千上万个文件。我应该从哪里开始？”
- “我的老板让我添加一个新功能，但我不熟悉这一部分代码。”
- “我根本不知道这个 bug 在哪里，代码实在太多了。”
- “我需要重构这一大堆代码，但又怕弄坏东西。”

这些问题的本质是：**如何在真实开发场景中高效使用 AI 工具来完成工作？**

在本课中，我们将学习如何构建系统化的 AI 辅助开发工作流，以便在不同开发场景中高效使用 AI。通过具体示例，我们将展示如何在新功能开发、修复 bug、代码重构等场景中使用 AI。

> 💡 **先决条件**
>
> 在学习本节内容之前，建议你先了解：
> - [AI 集成开发环境 基础](../../stage-1/ai-ide/) - 掌握 AI 集成开发环境 的基本使用
> - [Git 和 GitHub 工作流](../../stage-2/backend/git-workflow/) - 理解代码版本管理
> - [使用大模型帮助编写 API 代码](../../stage-2/backend/ai-interface-code/) - 理解 AI 辅助开发的基本概念

::: info 📚 你将学到的内容

1. 了解 AI 在开发过程中的作用及能力边界
2. 掌握不同项目类型下的 AI 辅助开发策略
3. 学习在新功能开发、修复 bug 和代码重构等场景中使用 Claude Code
4. 构建项目知识库，提高与 Claude Code 的协作效率
5. 掌握提高 AI 协作效率的实用技巧

:::

# 1. 了解 AI 的能力边界

在开始使用 AI 辅助开发之前，我们首先需要了解 AI 能做什么、不能做什么。只有这样，我们才能建立正确的协作模式。

## 1.1 AI 的擅长之处

可以把 AI 想象成一个非常聪明的助手，但仍然需要明确的指令。它可以根据你的描述快速生成代码骨架，也可以在几秒钟内读取数千行代码，找到你需要的部分。如果存在明显的语法错误或常见的安全漏洞，它也能帮你发现。重复性的任务，如批量重命名变量、格式化代码和生成文档注释，尤其适合交给 AI 来处理。

简单来说，AI 擅长那些规则明确且可以自动化的工作。

## 1.2 AI 的局限性

但 AI 也有它的局限。它不理解你的业务逻辑。除非你详细说明，它不会知道你公司的订单流程是怎样的。它也无法做出需要权衡利弊的决策，比如技术选型或架构设计，因为这些取决于你的经验和对项目的理解。AI 也不了解你团队的特殊规范，例如“所有 API 必须有日志”或“错误码必须使用枚举”。你需要配置这些规则或明确告知它。

最重要的是，AI 生成的代码不能直接使用。你必须进行审核和测试。它可能生成看起来正确但实际上有问题的代码，也可能忽略某些边界情况。

## 1.3 如何与 AI 协作

一旦你理解了人工智能的能力边界，协作模式就会变得清晰：你负责决定要构建什么、做出决策并确保质量；人工智能则负责执行具体的编码工作、查找信息以及发现明显的问题。

这就像与一名初级开发者合作。你告诉他们需要完成什么，他们去实现，然后你审查代码。不同的是，人工智能执行速度更快，但判断力不如人类。

# 2. 不同项目类型的开发策略

不同类型的项目需要不同的开发风格和人工智能使用策略。选择正确的策略可以大大提高开发效率。

## 2.1 全新项目（从零开始）

**项目特点:**
- 没有历史包袱，因此可以自由设计
- 需要建立项目结构和代码规范
- 适合快速迭代和试错

**推荐工作流程:**

**步骤 1：规划项目结构**

在开始编码之前，先请人工智能帮助你规划项目结构和技术选择：

```text
I want to build a task management app with these features:
- User registration and login
- Create, edit, and delete tasks
- Task categories and tags
- Task reminders

Please help me:
1. Recommend a suitable tech stack
2. Design the project directory structure
3. Plan the database schema
```

**第2步：建立基本框架**

根据计划，要求AI创建基本的项目结构：

```text
Based on the plan we just discussed, help me:
1. Create the project directory structure
2. Initialize config files (package.json, .env, etc.)
3. Create the basic server code
```

**步骤 3：逐一实现功能**

按优先顺序一次实现一个功能模块：

```text
Now implement the user registration feature with these requirements:
- Register with email and password
- Store passwords in encrypted form
- Email verification
```

**关键点:**
- 及早建立代码规范，以便 AI 生成遵循这些规范的代码
- 在每个功能模块完成后立即进行测试和验证
- 及时保持项目文档更新

## 2.2 成熟项目（大型现有代码库）

**项目特征:**
- 拥有历史性规范的大型代码库
- 需要保持代码风格一致
- 变更必须考虑影响范围

**推荐工作流程:**

**步骤 1: 了解项目结构**

在修改代码之前，首先请 AI 帮助你理解项目：

```text
This is an e-commerce project, and I need to add a coupon feature.
Please help me:
1. Analyze the overall project structure
2. Find the order-related code
3. See how other similar features are implemented
```

**步骤 2：查找参考代码**

请 AI 在项目中查找类似的实现作为参考：

```text
Find how other promotional features in the project, such as full reduction and discounts, are implemented
```

**步骤 3：遵循现有风格**

请 AI 以现有代码的风格实现新功能：

```text
Please implement the coupon feature by referring to how the full-reduction promotion is implemented.
Keep the same code style and directory structure.
```

**关键点：**
- 先理解，再改变事物，这样你就不会破坏现有架构
- 保持编码风格一致
- 变更后测试相关功能

## 2.3 快速原型（验证想法）

**项目特点：**
- 速度最重要，代码质量次之
- 用于验证产品想法或技术方案
- 以后可能会被丢弃或重写

**推荐工作流程：**

**直接描述需求并快速实现：**

```text
Build a simple todo app with these requirements:
- Add, delete, and mark tasks as completed
- Store data locally
- Keep the UI simple, as long as it works
```

**快速迭代：**

```text
Add search
Switch it to a dark theme
Add task categories
```

**关键点：**
- 不必过于担心代码质量或规范
- 快速验证想法，并及时调整方向
- 如果原型成功，之后需要重构

## 2.4 维护项目（主要是修复漏洞）

**项目特征：**
- 代码已经比较稳定，主要任务是修复问题
- 需要快速定位问题
- 必须小心修改，以避免引入新的问题

**推荐工作流程：**

**步骤 1：定位问题**

```text
User feedback: after clicking the "Submit Order" button, the page freezes
Console error: TypeError: Cannot read property 'id' of undefined

Please help me:
1. Analyze possible causes
2. Find the relevant code
```

**步骤 2：分析根本原因**

```text
Check in what situations this error occurs
Inspect the data flow
```

**第3步：应用修复**

```text
Fix this problem, and:
1. Add defensive code to avoid similar issues
2. Add error messages to improve user experience
```

**关键点：**
- 修复后彻底测试，以确保不影响其他功能
- 添加防御性代码以提高系统健壮性
- 记录问题和解决方案以备将来参考

# 3. 常见开发任务的工作流程

在日常开发中，我们会遇到许多不同类型的任务。以下是几种最常见的 AI 辅助工作流程。

## 3.1 开发新功能

**场景：** 产品经理给你一个新需求，你需要实现一个新功能。

**完整工作流程：**

**步骤 1：理解需求**（由你完成）

在开始编码之前，首先要澄清：
- 需要实现什么功能？
- 输入和输出是什么？
- 边界条件和异常情况有哪些？
- 性能和安全要求是什么？

**步骤 2：了解现有代码**（请 AI 帮助）

```text
I need to implement a user comment feature. Please help me:
1. Check whether there is anything similar in the project
2. Find how user data and article data are stored
3. Understand the database operation conventions in this project
```

**第3步：制定实施计划**（使用人工智能）

```text
Based on the analysis we just did, implementing the comment feature requires:
1. Creating a comment data model
2. Implementing CRUD APIs for comments
3. Adding comment display and posting functionality to the frontend

Please help me confirm whether this plan is reasonable and whether anything is missing
```

**步骤4：实现功能**（AI生成，您审查）

```text
According to the plan, first implement the comment data model.
Requirements:
- Include comment content, author, article ID, and creation time
- Support nested comment replies
- Add necessary indexes
```

```text
Now implement the comment API endpoints.
Requirements:
- Post a comment
- Delete a comment (only your own comments can be deleted)
- Get all comments for an article
- Support pagination
```

```text
Finally implement the frontend comment component.
Requirements:
- Show the comment list
- Comment posting form
- Support replying to comments
```

**第5步：测试和验证**（由你完成）

- 手动测试主要流程
- 测试边界情况，例如空内容和过长内容
- 测试权限控制，例如无法删除别人的评论
- 请求AI帮助你编写自动化测试

**真实对话示例：**

```text
You: I want to add a user comment feature so users can post comments on articles

AI: Okay, let me first understand the project structure.
    [AI analyzes the project code]
    I see that the project already has a user system (models/user.js)
    and an article system (models/article.js).

    Implementing the comment feature requires:
    1. Creating a comment data model (models/comment.js)
    2. Adding comment-related APIs (routes/comment.js)
    3. Adding comment display and posting functionality to the article detail page

    Should I start implementing it?

You: Yes, let's start. Create the data model first

AI: [Generates models/comment.js]
    I have created the comment data model with these fields:
    - id: comment ID
    - content: comment content
    - userId: author ID
    - articleId: article ID
    - parentId: parent comment ID (for nested replies)
    - createdAt: creation time

    Should I implement the API next?

You: Yes, implement the API
```

## 3.2 修复错误

**场景:** 用户报告了一个问题，你需要快速定位并修复它。

**完整工作流程:**

**步骤 1: 收集信息**（由你完成）

记录以下信息：
- 错误信息是什么？
- 如何重现这个问题？
- 什么时候开始发生的？
- 影响范围有多大？

**步骤 2: 定位问题**（请 AI 帮助）

```text
User feedback: after clicking the "Submit Order" button, the page freezes
Browser console error: TypeError: Cannot read property 'id' of undefined
The error occurs on line 45 of checkout.js

Please help me:
1. Analyze possible causes
2. Find the relevant code
3. Check the data flow
```

**第3步：分析根本原因**（使用人工智能）

```text
Check where this user object comes from
Inspect under what circumstances user could be undefined
```

**步骤4：实施修复**（AI生成，你审查）

```text
Fix this problem with these requirements:
1. Add defensive code to check whether user exists
2. If user does not exist, redirect to the login page
3. Add a friendly error message
```

**步骤5：验证修复**（由你完成）

- 使用原始步骤重现问题，并确认问题已解决
- 测试相关功能，确保没有引入新的问题
- 考虑是否在其他地方存在类似问题

**真实对话示例：**

```text
You: A user reported that after logging in, refreshing the page logs them out

AI: This is usually a token storage or validation issue. Let me check:
    1. Where is the token stored, localStorage or cookies?
    2. Is the token reloaded when the page refreshes?

    Please tell me which file contains the token-related code

You: utils/auth.js

AI: [Analyzes utils/auth.js]
    I found the issue: the token is stored in sessionStorage,
    and sessionStorage is cleared when the page is refreshed.

    Solution: use localStorage instead

    Would you like me to change it?

You: Yes, change it

AI: [Modifies the code]
    The change is complete. The token is now stored in localStorage,
    so it will not be lost after a page refresh.

    I recommend that you test:
    1. Log in and refresh the page to confirm the user stays logged in
    2. Close and reopen the browser to confirm the user stays logged in
```

## 3.3 重构代码

**场景：**代码变得难以维护，需要进行重构以提高代码质量。

**完整工作流程：**

**步骤 1：定义重构目标**（由你完成）

明确以下内容：
- 你正在尝试解决什么问题？（重复代码？结构混乱？性能问题？）
- 重构的范围有多大？
- 可以接受的风险水平是多少？

**步骤 2：制定重构计划**（与 AI 一起）

```text
These three functions (getUserList, getArticleList, getCommentList)
contain a lot of duplicated code for pagination, sorting, and filtering.

Please help me:
1. Analyze the duplicated parts
2. Propose a refactoring plan
3. Evaluate the risk of the refactor
```

**步骤3：准备安全网**（请AI协助）

```text
Before refactoring, please write test cases for me first
so that the behavior stays the same after the refactor
```

**第4步：逐步重构**（AI 执行，你来验证）

```text
According to the plan we just discussed, first extract the shared function
```

```text
Now optimize the data structure
```

```text
Finally update the call sites
```

**步骤 5：验证结果**（由你完成）

- 运行所有测试并确保它们通过
- 手动测试关键功能
- 检查代码质量是否有所提升

**真实对话示例：**

```text
You: These three functions have a lot of duplicate code. Can you help me refactor them?
    [Paste the code of the three functions]

AI: I analyzed them, and the main differences are:
    - getUserList: gets the user list
    - getArticleList: gets the article list
    - getCommentList: gets the comment list

    Their common logic is pagination, sorting, and filtering.

    Refactoring plan:
    1. Extract a generic getList function
    2. Pass the different parts as parameters

    This can reduce 80% of the duplicated code.

    Should I implement it?

You: Yes, but first help me write test cases

AI: [Generates tests]
    I have written tests for all three functions,
    covering the main use cases.

    Can I start refactoring now?

You: Yes, start refactoring

AI: [Refactors the code]
    Refactoring is complete. I created a generic getList function,
    and the original three functions now all call that shared function.

    Please run the tests to confirm everything works: npm test
```

## 3.4 代码审查

**场景：** 有队友提交了代码，你需要进行审查。

**完整工作流程：**

**步骤 1：快速了解变更**（请 AI 帮助）

```text
Summarize what this PR changed
Which files were mainly modified
```

**步骤 2：检查常见问题**（请 AI 帮助）

```text
Check this change for:
1. Security issues (SQL injection, XSS, etc.)
2. Performance problems (N+1 queries, memory leaks, etc.)
3. Obvious bugs
4. Whether the coding style follows the project conventions
```

**第3步：深入审查**（由你完成）

- 业务逻辑是否正确
- 是否考虑了边界情况
- 是否有更好的实现方法
- 是否需要添加测试

**第4步：给出反馈**（由你完成）

- 指出需要修改的地方
- 解释为什么需要修改
- 提供改进建议

**真实对话示例：**

```text
You: Help me review this PR
    [Provide the PR link or code]

AI: I reviewed the change and found these issues:

    1. Security issues:
       - Line 23: user input is not escaped, which may lead to XSS risk
       - Line 45: the SQL query is built by string concatenation, which risks injection

    2. Performance problems:
       - Line 67: the database is queried inside a loop, which creates an N+1 problem

    3. Code quality:
       - The handleSubmit function is too long (200 lines); consider splitting it
       - Error handling is missing

    Would you like me to explain any of these in more detail?

You: Explain the SQL injection issue in detail

AI: On line 45:
    ```javascript
    const query = `SELECT * FROM users WHERE name = '${userName}'`;
    ```

    This directly concatenates user input into the SQL statement.
    If a user enters `' OR '1'='1`, it becomes:
    ```sql
    SELECT * FROM users WHERE name = '' OR '1'='1'```
    This would return all user data.

    The correct approach is to use a parameterized query:
    ```javascript
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [userName]);```

    Would you like me to fix it?
```

# 4. 构建项目知识库

为了帮助 AI 更好地理解你的项目，建议在项目内部构建一个知识库。这样 AI 就可以按照你的惯例和习惯工作。

## 4.1 创建项目描述文件

在项目根目录下创建一个 `CLAUDE.md` 或 `AGENTS.md` 文件，以记录关键的项目信息：

```markdown
# Project Overview

## Project Summary
This is an online learning platform that provides course management, user learning, assignment submission, and other features.

## Tech Stack
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express + PostgreSQL
- Deployment: Vercel (frontend) + Railway (backend)

## Project Structure
```
src/
├── components/     # React 组件
├── pages/          # 页面组件
├── api/            # API 调用
├── utils/          # 工具函数
└── types/          # TypeScript 类型定义
```

## Code Conventions
- Use ESLint and Prettier to format code
- Component files use PascalCase (such as UserProfile.tsx)
- Utility functions use camelCase (such as formatDate.ts)
- Constants use UPPER_SNAKE_CASE (such as API_BASE_URL)

## Development Flow
1. Create a feature branch from main
2. Submit a PR after development is complete
3. Merge after code review passes

## Common Tasks
- Start the development server: `npm run dev`
- Run tests: `npm test`
- Build for production: `npm run build`
- Format code: `npm run format`

## Notes
- All API calls must include error handling
- User input must be validated and escaped
- Use parameterized queries for database operations to avoid SQL injection
- Sensitive information (passwords, tokens) must not be written to logs

## Database Schema
- users: user table (id, email, password_hash, created_at)
- courses: course table (id, title, description, teacher_id)
- enrollments: enrollment table (id, user_id, course_id, enrolled_at)
```

## 4.2 记录常见问题及解决方案

在项目中创建 `docs/troubleshooting.md` 来记录常见问题：

```markdown
# Common Problems

## Development Environment Problems

### Problem: npm install fails
**Cause:** Node version is incompatible
**Solution:** Use Node.js 18 or higher

### Problem: database connection fails
**Cause:** environment variables are not configured
**Solution:** Copy .env.example to .env and fill in the database connection info

## Feature Problems

### Problem: after users log in, refreshing the page logs them out
**Cause:** the token is stored in sessionStorage
**Solution:** switch to localStorage

### Problem: image upload fails
**Cause:** file size exceeds the limit
**Solution:** add a file size check on the frontend and limit it to 5MB
```

## 4.3 维护技术决策记录

创建一个 `docs/decisions/` 目录来记录重要的技术决策：

```markdown
# ADR-001: Choosing PostgreSQL as the Database

## Status
Accepted

## Background
The project needs to choose a relational database. The candidates are MySQL and PostgreSQL.

## Decision
Choose PostgreSQL

## Rationale
1. Better JSON support, suitable for storing course content
2. Stronger full-text search
3. The team is more familiar with PostgreSQL

## Consequences
- We need to learn PostgreSQL-specific features
- Deployment requires a PostgreSQL environment
```

# 5. 提高 AI 协作效率的技巧

通过掌握一些实用技巧，您可以让与 AI 的协作更加高效。

## 5.1 描述问题时要清晰具体

**不好的描述：**```text
This feature has a problem
Help me optimize it
```

**好描述：**```text
After the user clicks the "Submit" button, the form is not submitted
The browser console reports: Uncaught TypeError: Cannot read property 'value' of null
The error occurs on line 23 of form.js

This list loads very slowly and has 1000 items
Please help me add pagination with 20 items per page
```

**关键点：**
- 提供具体的错误信息
- 解释预期结果
- 提供相关的背景

## 5.2 一次只做一件事

**不良方法：**```text
Help me implement login, registration, password recovery, profile center,
password change, and email verification
```

**好方法：**```text
Implement the login feature first, with these requirements:
- Email and password login
- Remember login state
- Error messages

(After it is done) Now implement the registration feature

(After it is done) Now implement the password recovery feature
```

**关键点：**
- 将大任务拆分为小任务
- 每完成一个任务就进行测试和验证
- 确认没有问题后再进行下一个任务

## 5.3 及时验证结果

**错误的方法：**
- 让 AI 连续修改 10 个文件
- 直到最后才发现第一个修改已经出错
- 浪费大量时间

**正确的方法：**
- 修改一个文件后立即测试
- 确认没有问题，然后再继续
- 一旦发现问题，立即修正

**关键点：**
- 小步前进并快速获取反馈
- 不要盲目信任 AI
- 保持对代码的控制

## 5.4 善用上下文

**技巧 1：参考之前的对话**```text
Implement according to the plan we just discussed
Refer to the previous getUserList function
```

**技巧 2：提供相关代码**```text
This is the existing user model code:
[paste code]

Please implement the article model in the same style
```

**技巧 3：解释项目背景**```text
This is an e-commerce project using React + Node.js
It already has a user system and a product system
Now we need to add a shopping cart feature
```

## 5.5 保存有用的对话

**场景：** 你解决了一个复杂的问题

**操作方法：**
1. 在项目文档中记录解决方案
2. 下一次出现类似问题时参考它
3. 与其他团队成员分享

**示例：**

在 `docs/solutions/` 下创建一个文档：

```markdown
# Solving the N+1 Query Problem

## Problem Description
When fetching the article list, the system queries the author information once per article,
which causes a performance problem.

## Solution
Use a JOIN query to fetch all the data in one go:

```sql
SELECT articles.*, users.name AS author_name
FROM articles
LEFT JOIN users ON articles.author_id = users.id```

**Result:** query time dropped from 2000ms to 50ms

## 5.6 Learn the Art of Asking Questions

**Technique 1: ask "why" first**
```文本
为什么这段代码会导致内存泄漏？
我们为什么应该使用 useCallback 而不是普通函数？```

**Technique 2: ask for multiple options**
```文本
实现用户身份验证的不同方法有哪些？
每种方法的优缺点是什么？```

**Technique 3: ask for explanations**
```文本
这段代码是如何工作的？
你能详细解释一下这个算法吗？```

# 6. Frequently Asked Questions

## Q1: Can I use AI-generated code directly?

**A:** No, not directly. It needs review and testing.

AI-generated code may have the following problems:
- logical errors or poor handling of edge cases
- failure to match the project's coding conventions
- security risks
- insufficient performance optimization

You need to:
- carefully read the generated code
- understand its logic
- test different scenarios
- confirm that it follows the project conventions

## Q2: What if AI misunderstands what I mean?

**A:** Correct it in time and describe the requirement again.

```文本
那不是我的意思。我的意思是……
这种理解是不正确的。它应该是……
让我再描述一遍需求……
```

如果经过几次修改仍然错误，你可以：
- 提供更多上下文
- 给出具体的代码示例
- 将任务拆分为更小的部分

## Q3: 如果遇到 AI 无法解决的事情怎么办？

**A:** AI 不是万能的。有些问题仍然需要你自己解决。

AI 可能无法解决的问题：
- 非常新的技术（AI 的知识有截止日期）
- 你团队特有的业务逻辑
- 需要访问外部系统的问题
- 复杂的性能优化问题

这时，你需要：
- 阅读官方文档
- 搜索相关解决方案
- 向有经验的队友请教
- 在社区中提问

## Q4: 我如何判断 AI 的建议是否合理？

**A:** 用你自己的经验和知识来判断。

评估标准：
- 是否遵循最佳实践
- 是否考虑边界情况
- 是否存在潜在的安全风险
- 是否符合项目的技术栈
- 性能是否可接受

如果不确定，你可以：
- 请 AI 解释为什么它建议这种方法
- 请求替代方案
- 咨询团队成员

## Q5: 团队应该如何在协作中使用 AI？

**A:** 建立共享约定和共享知识库。

团队协作建议：
- 分享项目的 `CLAUDE.md` 配置
- 统一代码规范和风格
- 记录常见问题的解决方案
- 定期分享有用的提示
- 在代码评审中检查 AI 生成的代码

## Q6: 我如何避免过度依赖 AI？

**A:** 持续学习和思考。AI 是助手，不是替代品。

建议：
- 理解 AI 生成的代码，而不是盲目复制
- 积极学习不懂的概念
- 定期复习基础知识
- 尝试先自己解决问题，再用 AI 验证
- 参与代码评审，从他人的经验中学习

# 7. 总结

通过本章，你现在已经掌握了：

1. **AI 的能力边界**：了解 AI 擅长和不擅长的领域，建立正确的协作模式
2. **项目类型策略**：对全新项目、成熟项目、快速原型和维护项目采用不同的发展策略
3. **常见任务工作流程**：新功能开发、Bug 修复、代码重构和代码评审的完整工作流程
4. **项目知识库**：学习如何建立项目文档，让 AI 更好地理解你的项目
5. **协作技巧**：提升 AI 协作效率的实用方法

**关键收获：**

- **角色明确**：由你做决策并确保质量，AI 负责执行和辅助
- **沟通清晰**：具体明确，一次集中处理一件事
- **及时验证**：不要盲目信任，进行测试和验证
- **持续学习**：了解 AI 的能力边界，不断完善协作模式

记住：AI 是工具，而不是替代品。它可以提高效率，但最终的代码质量仍取决于你的判断。从简单任务开始，逐步建立信任。你会发现 AI 可以节省大量时间，让你专注于更有价值的工作。

::: 提示 💡 下一步
在下一章，我们将学习如何使用 AI 进行代码评审和质量保证，以确保代码的可维护性和安全性。
:::