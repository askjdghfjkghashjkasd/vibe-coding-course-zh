# 使用大型语言模型编写 API 代码和 API 文档

在前几章中，我们学习了如何使用 Figma 创建 UI 草图，如何使用 AI 快速生成静态前端页面，以及如何使用 Supabase 构建数据库和基本身份验证。这自然而然地引出了一个新问题：当有人点击前端那些生动的按钮时，数据实际上是如何存储到 Supabase 的？当我们需要更复杂的业务逻辑，例如并发支付、定时推送或敏感数据处理时，直接让前端与数据库通信仍然安全吗？

这个问题引出了现代 Web 架构中最重要的部分之一：**后端 API**。

过去，后端开发者常常手动编写数百甚至数千行路由、控制器和验证逻辑。今天，我们可以将大量重复的脚手架交给大型语言模型。在本章中，我们将超越模糊的“AI 生成代码”，看看如何使用强大的提示引导 LLM 编写可靠的 Node.js 后端接口，以及相应的文档和测试用例的真实工作流程。

> 💡 **前置知识**
>
> 开始本章之前，建议了解：
> - [从数据库到 Supabase](../database-supabase/) 以掌握基本数据库和数据模型概念
> - [Git 和 GitHub 工作流](../git-workflow/) 以了解项目协作和版本控制
> - [什么是终端/命令行](/en/appendix/2-development-tools/command-line-shell) 以熟悉项目初始化和启动命令

# 你将学到什么

1. **什么是 API**：理解前端与后端之间的桥梁，以及基本的 RESTful 设计。
2. **LLM 如何帮助服务构建**：使用结构化提示生成一个干净的 Node.js Express 入门项目。
3. **接口逻辑开发**：引导模型生成带有适当业务验证和 Supabase 集成的 CRUD API。
4. **自动化 API 文档**：要求模型从你的代码逆向生成 OpenAPI/Swagger 文档。
5. **测试与集成循环**：使用模型创建 Postman 集合和 Jest 单元测试，以保障代码质量。

---

# 1. 我们为什么需要 API？

传统上，前端是“可见部分”，数据库是“存储室”。但它们之间缺少一个协调者。

如果你把应用程序比作一家餐厅：

- **前端（客户端）** 是菜单和点餐台，顾客在这里浏览和发出请求。
- **数据库（Supabase 等）** 是厨房储藏室，存放食材和记录。
- **后端 API** 是服务员。顾客不应该直接跑进厨房拿食材，而是通过 HTTP 请求告诉服务员他们的需求。服务员检查请求、验证权限、与厨房沟通，并通过 HTTP 响应把结果返回，通常是 JSON 格式。

通过 API，我们实现了干净的**前后端分离**：前端专注于渲染，后端专注于业务逻辑、数据处理和安全性。

---

# 2. 项目架构与初始化

一个清晰的项目骨架是从 LLM 获取高质量代码的前提。在你请求 AI 编写代码之前，你应该已经对所需结构有一个心中模型。

## 2.1 常见的 API 项目结构

即使一个大型语言模型正在生成代码，你也不应该把所有内容都倾倒到一个 `server.js` 文件中。一个可维护的 Node.js 后端通常看起来像这样：

```text
my-api-project/
├── .env                  # Sensitive environment variables such as API keys and DB URLs
├── server.js             # Project entry point: boot server, register global middleware
├── package.json          # Dependency management
├── src/
│   ├── routes/           # Route layer: define URLs and HTTP methods
│   ├── controllers/      # Controller layer: process request params, call services, return responses
│   ├── services/         # Service layer: database access and core business logic
│   └── middlewares/      # Middleware: auth, global error handling
└── docs/                 # API documentation
```

## 2.2 使用 AI 初始化项目

与其手动运行 `npm init` 并逐个安装包，不如将上述结构以提示的形式提供给模型：

> 🗣️ **提示示例**
> “帮我搭建一个可以连接 Supabase 的 Node.js 后端项目。保持结构清晰、易于后期维护。”

如果提示设计得好，你得到的代码就已经可以让你有一个在 `localhost:3000` 运行的、基础扎实的后端应用。

---

# 3. 核心实践：使用 LLM 开发 API

这是本章的核心。当 LLM 生成的代码看起来浅显或不安全时，根本原因通常是缺少上下文。**LLM 不怕复杂需求，它们怕的是模糊的需求。**

以 [数据库章节](../database-supabase/) 中的 `menu_items` 插入 API 为例。

## 3.1 给模型完整上下文

在让模型编写 API 之前，提供 **数据库模式** 和 **业务约束**。

> 🗣️ **高质量提示模板**
> “帮我写一个创建菜单项的 API。每个菜单项包括产品名称、价格、分类（汉堡、零食、饮料）以及是否上架。产品名称和价格为必填项。价格不能为负数。用户输入无效时返回有用的验证错误。”

## 3.2 审查生成的代码

一个好的模型通常会清晰地分离职责，例如：

```javascript
// services/menuService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.createMenuItem = async (menuData) => {
    // Push data into the table via the Supabase SDK
    const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select();

    if (error) throw new Error(`Database insert failed: ${error.message}`);
    return data[0];
};
```

你可以看到，有了足够的上下文，模型生成的结构更清晰：Supabase初始化被分离，错误处理，代码更容易推理。这与你通常从“创建端点”等模糊请求中得到的混乱代码截然不同。

---

# 4.自由发挥：自动生成API文档

对于开发团队来说，未公开的 API 就像一个盲盒。前端工程师无法猜测需要哪些参数或响应形态。业内最常见的 API 描述标准是 **OpenAPI**（以前常称为 Swagger）。

手写Swagger YAML或JSON过去既痛苦又容易出错。现在，这已成为LLM最能帮助的领域之一。

您可以选择您的`routes`和`controllers`代码并提出：

> 🗣️ **文档提示**
> “从上述代码生成API文档。清晰解释每个参数的含义以及终端返回的数据，以便前端团队能够轻松整合。”

你甚至可以让模型填写描述和模拟示例值，比如`price_cents: 1200`，适用于一个价值12美元的商品。这大大减少了大量的来回沟通。

---

# 5.保障措施：生成测试和邮递员收集

代码和文档准备好后，还有一个步骤：验证一切是否正常工作。

## 5.1 生成Postman或Apifox测试配置

在开发API时，我们经常使用像Postman这样的工具来模拟HTTP请求。没有AI的话，通常需要手动填写URL、头部和JSON请求主体。

你可以简单地告诉模型：

> “将此API文档转换为Postman可导入格式，并包含成功和失败的请求示例。”

一旦你把返回的 JSON 保存成类似 `menu_api.json` 的格式并导入到 Postman，你就能立刻得到一个可用的测试面板。

## 5.2 编写自动化单元测试

如果你想要更严格的工程质量，也可以让模型用`Jest`或类似框架写测试。这对边界条件特别有用，比如确保数据到达数据库前拒绝负价格。

---

# 6.你仍然需要了解的后端API最佳实践

即使有AI支持，你仍然是系统的守门人。你需要根据几个重要原则审查生成代码：

1. **RESTful 路径命名**
   - 良好：`GET /api/users`用于列出用户，`POST /api/users`用于创建用户
   - 坏：`POST /api/getUser` 或 `POST /api/createUser`
   URL应代表资源。动作属于HTTP方法。

2. **正确的HTTP状态代码**
   - `200/201`：请求成功 / 资源创建成功
   - `400`：错误请求、参数无效或缺少必填字段
   - `401/403`：未经授权/禁止
   - `404`：未找到资源
   - `500`：服务器错误，如后端异常或数据库故障
   不要将完整的后端栈痕迹暴露给前端。

3. **永远不要相信用户输入**
   前端输入可以被伪造。所有重要的验证都必须在后端重新运行。

# 7.摘要

这一章之后，你的角色应该会开始变得不同。你不再只是一个被语法和标点困住的打字员。你正在成为一名**系统设计师和架构协调员**。

你现在已经了解到：

1. **API 和前后端分离** 背后的核心系统思维
2. 如何通过提供 **良好的上下文和分层结构** 大幅提升 LLM 生成的后端代码质量
3. 如何将繁琐的 **文档撰写** 和 **测试创建** 转化为 AI 能很好处理的自动化任务
4. 如何将这些与您已经学习的 **Supabase** 知识结合起来，完成从前端请求到数据库更新的完整流程

::: 提示 下一步
一旦您的数据流和后端服务准备好，它们仍然只能在您自己的本地机器上运行。在下一章中，我们将学习如何将该服务 **部署** 到公共服务器，以便真实用户可以访问您的产品。
:::