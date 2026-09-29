# 技术写作简介

::: tip 前言
**有人会阅读你写的文档吗？** 许多开发者认为“如果代码能运行就够了——文档可以以后再写。” 结果是：新员工无法理解项目，API 集成完全依赖口头沟通，六个月后即使是你自己也忘记了当初为什么要这样设计。

本章将帮助你掌握技术写作的核心方法，使你的文档真正被阅读、理解并且有用。
:::

**本文你将学到什么？**

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第1章** | 文档类型与结构 | 如何撰写不同类型的文档 |
| **第2章** | 写作原则 | 清晰、准确、简洁 |
| **第3章** | 实践对比 | 好文档 vs 坏文档 |
| **第4章** | 文档维护 | 保持文档更新 |

阅读本章后，你将能够撰写结构合理、准确且易于维护的技术文档。

---

## 0. 全局视角：为什么技术文档重要

代码告诉计算机“如何做”；文档告诉人们“为什么”。没有文档的项目就像没有说明书的电器——它可以工作，但使用完全靠猜。

::: tip 好文档的价值
- **降低沟通成本**：新成员可以独立上手，减少重复解释
- **保留决策上下文**：记录“为什么”，而不仅是“做什么”
- **提升项目可信度**：良好的文档是开源项目的门面
- **加速协作**：API 文档支持前后端并行开发
:::

---

## 1. 文档类型与结构

使用下面的互动组件学习不同类型文档的标准结构：

<DocStructureDemo />

### 1.1 常见文档类型

| 文档类型 | 目标受众 | 核心内容 |
|---------|---------|---------|
| **README** | 所有人 | 项目是什么、如何使用、如何贡献 |
| **API 文档** | API 使用者 | 接口端点、参数、响应、错误码 |
| **架构文档** | 开发团队 | 系统设计、技术选型、数据流 |
| **更新日志** | 用户/开发者 | 版本变更、新增/修复/破坏性变更 |
| **贡献指南** | 贡献者 | 开发环境、代码规范、PR 流程 |

### 1.2 README 的黄金结构

一个好的 README 应包括：

1. **项目名称   一句话描述**：让人3秒知道这是做什么的
2. **快速开始**：用最少的步骤运行项目
3. **功能亮点**：核心卖点
4. **安装**：详细的环境要求和安装步骤
5. **使用示例**：可直接复制粘贴的代码
6. **贡献指南**：如何参与项目
7. **许可证**：法律信息

---

## 2. 写作原则

### 2.1 清晰为先

```markdown
<!-- Bad: vague and unclear -->
This function processes data.

<!-- Good: specific and clear -->
Converts raw order data to invoice format, including tax calculation and currency conversion.
```

### 2.2 面向受众

在编写文档之前，先问自己：**谁会阅读这些内容？他们需要哪些信息？**

- 为初学者编写：解释术语，提供完整示例
- 为有经验的开发者编写：直入主题，提供 API 参考
- 为非技术人员编写：使用类比，避免行话

### 2.3 代码示例是最好的文档

```markdown
<!-- Bad: text description only -->
Call the createUser function, passing in the username and email parameters.

<!-- Good: runnable example -->
const user = await createUser({
  name: 'Zhang San',
  email: 'zhangsan@example.com'
})
// Returns: { id: 'u_123', name: 'Zhang San', createdAt: '2025-01-15' }
```

---

## 3. 实际比较

使用下面的互动组件来比较好的和不好的技术写作：

<TechWritingPracticeDemo />

### 3.1 提交信息标准

```
# Bad
fix bug
update code

# Good (Conventional Commits)
fix: resolve login page white screen issue on Safari
feat: support batch export of PDF reports
docs: update example code in API authentication section
```

### 3.2 评论的艺术

```javascript
// Bad: describes "what" (the code already says this)
// Iterate through the array
for (const item of items) { ... }

// Good: explains "why"
// Iterate in reverse because forward iteration skips the next item when deleting
for (let i = items.length - 1; i >= 0; i--) { ... }
```

---

## 4. 文档维护

### 4.1 文档即代码

将文档和代码保持在同一个仓库中，并使用相同的工作流进行管理：

- 在同一个 PR 中提交文档和代码的更改
- 使用 CI 检查文档格式和链接有效性
- 随版本发布同步更新文档

### 4.2 防止文档老化

| 问题 | 解决方案 |
|------|---------|
| 文档过时 | 强制随着代码更改更新文档（PR 检查） |
| 无人维护 | 指定文档负责人 |
| 内容重复 | 单一真实来源，其他地方链接引用 |

---

## 5. AI 助力：使用大语言模型提升文档质量

大型语言模型几乎在技术写作方面是“天生有天赋”的——生成文档、改进表达、翻译内容都是其强项。

### 5.1 生成 API 文档

> **提示**：
> ```
> Based on the following Express route code, generate complete API documentation including:
> - Endpoint path and method
> - Request parameters (path params, query params, request body) and types
> - Success and error response examples
> - curl usage examples
>
> [Paste your route code]
> ```

### 5.2 改进技术写作

> **提示**：
> ```
> Please improve the expression of the following technical documentation:
> 1. Use concise and clear language, remove redundant expressions
> 2. Replace passive voice with active voice
> 3. Keep technical terms accurate
> 4. Add necessary code examples
> Preserve the original meaning; only improve the quality of expression.
>
> [Paste your documentation content]
> ```

### 5.3 生成 README

> **提示**：
> ```
> Based on the following project information, generate a high-quality README.md:
> - Project name: [name]
> - One-line description: [description]
> - Tech stack: [list]
> - Core features: [list]
>
> Must include: project introduction, quick start, features,
> installation steps (with code), usage examples, contributing guide, license.
> ```

::: 提示 AI 使用建议
始终验证 AI 生成文档中的技术细节——它可能会编造不存在的 API 参数或错误的返回值。始终与实际代码进行交叉检查。
:::

---

## 6. 总结

1. **类型匹配**：不同的文档有不同的结构和写作风格
2. **清晰优先**：要具体、准确，并面向受众
3. **示例驱动**：好的代码示例胜过千言万语
4. **持续维护**：把文档视作代码，随项目发展而演变

::: 提示 最终想法
写文档不是浪费时间——它是**节省未来时间**。你今天花 30 分钟写的文档可能为 10 人每人节省一小时。好的文档是你为团队所做的最佳投资。
:::

---

## 延伸阅读

- **写作指南**：谷歌的技术写作课程免费且实用。
- **文档工具**：VitePress、Docusaurus、GitBook 以及其他现代文档框架。
- **API 文档**：OpenAPI/Swagger 规范是 API 文档的行业标准。
- **实用建议**：从为自己的项目写一个好的 README 开始。