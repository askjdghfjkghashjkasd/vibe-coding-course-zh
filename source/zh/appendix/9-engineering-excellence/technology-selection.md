# 技术选择方法论

::: tip 前言
**React 还是 Vue？MySQL 还是 PostgreSQL？** 技术选择是任何项目开始阶段最重要的决策之一。选错了，你可能需要花几个月重新开发；选对了，团队的生产力将翻倍。

本章将帮助你建立系统化的技术选择方法——不再凭感觉选择技术。
:::

**本文你将学到什么？**

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第1章** | 技术雷达 | 理解技术成熟度 |
| **第2章** | 选择维度 | 从哪些角度评估技术 |
| **第3章** | 决策矩阵 | 用量化方式比较做决策 |
| **第4章** | 常见陷阱 | 避免技术选择中的误区 |

阅读本章后，你将掌握系统化的技术选择方法，并能够为你的项目做出合理的技术决策。

---

## 0. 全局视角：技术选择的本质

技术选择不是“哪种技术最好”，而是“哪种技术最适合当前场景”。这就像选择交通工具：飞机最快，但你不需要飞去隔壁邻居家。

::: tip 选择核心原则
- **没有万能解**：没有单一技术适用于所有场景
- **场景驱动**：先定义需求，再选择技术
- **团队优先**：团队熟悉的技术往往是最佳选择
- **可逆性**：优先选择易于替换的方案
:::

使用下方交互组件探索当前技术生态的全貌：

<TechRadarDemo />

---

## 1. 选择维度

### 1.1 核心评估维度

| 维度 | 关注点 | 建议权重 |
|------|--------|---------|
| **团队能力** | 团队熟悉吗？学习曲线陡吗？ | 高 |
| **社区生态** | 文档质量、第三方库、Stack Overflow 回答 | 高 |
| **性能需求** | 能满足性能要求吗？ | 中高 |
| **维护状态** | 是否有持续维护？上次发布什么时候？ | 中 |
| **许可证** | 是否与项目的商业模式兼容？ | 中 |
| **招聘市场** | 能否招到熟悉此技术的人才？ | 中 |

### 1.2 真实案例：前端框架选择

```
Project: Enterprise internal management system
Team: 5 people, 3 familiar with Vue, 1 familiar with React, 1 beginner
Requirements: Form-heavy, complex permissions, no SEO needed

Analysis:
- 60% of team familiar with Vue → Vue preferred
- Form-heavy → Element Plus ecosystem is mature
- No SSR needed → Next.js/Nuxt not necessary
- Conclusion: Vue 3 + Element Plus
```

---

## 2. 决策矩阵

当多个选项仅靠直觉难以判断时，可使用决策矩阵进行量化比较。

使用下面的互动组件体验决策矩阵方法：

<DecisionMatrixDemo />

### 2.1 如何使用决策矩阵

1. **列出候选项**：例如 React vs Vue vs Svelte
2. **定义评估维度**：团队能力、生态系统、性能、学习曲线
3. **分配权重**：根据项目需求，为每个维度分配权重（总计 100%）
4. **为每项评分**：对每个选项在每个维度上打分，范围 1-5
5. **计算加权总和**：得到最终总分

### 2.2 示例

| 维度 | 权重 | React | Vue | Svelte |
|------|------|-------|-----|--------|
| 团队能力 | 30% | 3 | 5 | 1 |
| 社区生态 | 25% | 5 | 4 | 2 |
| 学习曲线 | 20% | 3 | 4 | 5 |
| 性能 | 15% | 4 | 4 | 5 |
| 招聘市场 | 10% | 5 | 4 | 2 |
| **加权总分** | | **3.75** | **4.35** | **2.75** |

---

## 3. 常见陷阱

### 3.1 简历驱动开发

> “使用这项新技术意味着我可以在简历上加一行”

技术选择应基于项目需求，而不是个人简历。新技术意味着更多未知风险和较少的社区支持。

### 3.2 盲目追新

| 思维模式 | 现实 |
|------|------|
| “新的一定更好” | 新技术可能存在未发现的漏洞 |
| “大公司用，我也应该用” | 他们的使用场景可能与你完全不同 |
| “这个技术在 GitHub 上星数最多” | 星数多不代表适合你的项目 |

### 3.3 忽视迁移成本

在选择技术时，要考虑的不仅是“使用效果如何”，还要考虑“迁移成本多少”。优先考虑以下方案：
- 遵循标准协议（例如 SQL vs 专有查询语言）
- 拥有清晰的迁移路径
- 不会造成深度锁定

---

## 4. AI 支持：使用 LLM 辅助技术选择

大型语言模型（LLMs）可以帮助你快速调研技术选项，对比优缺点，并生成决策报告。

### 4.1 技术比较

> **提示**：```
> I need to choose a database for an e-commerce project. Candidates:
> MySQL, PostgreSQL, MongoDB.
> Project characteristics: read-heavy, write-light; needs complex queries;
> data volume expected to reach tens of millions.
>
> Please compare the three options across these dimensions:
> performance, ecosystem, learning curve, operational costs, scalability.
> Present in table format and give a final recommendation with reasoning.
> ```

### 4.2 生成架构决策记录（ADR）

> **提示**：
> ```
> Help me write an Architecture Decision Record (ADR) in this format:
> - Title: Choosing Vue 3 as the frontend framework
> - Background: [project background and requirements]
> - Candidates: React, Vue 3, Svelte
> - Decision: Vue 3
> - Reasoning: [based on team capability, ecosystem, performance, etc.]
> - Consequences: [impact and risks of this choice]
> ```

### 4.3 研究新技术

> **提示**:
> ```
> I'm considering introducing Bun to replace Node.js in my project.
> Please analyze:
> 1. Core advantages and disadvantages of Bun compared to Node.js
> 2. Current ecosystem maturity (npm compatibility, mainstream framework support)
> 3. Risk points for production use
> 4. Scenarios where Bun is and isn't appropriate
> Provide an objective assessment — don't only mention the positives.
> ```

::: 提示 AI 使用建议
AI 知识有时间限制——它可能不了解最新版本中的变化。对于快速迭代的技术，在使用 AI 进行初步研究后，始终检查官方文档以确认最新信息。
:::

---

## 5. 总结

1. **技术雷达**：了解技术成熟度，区分 Adopt/Trial/Assess/Hold
2. **选择维度**：团队能力 > 社区生态 > 性能需求 > 维护状态
3. **决策矩阵**：定量比较以减少主观偏差
4. **避免陷阱**：不要追新，不要盲目跟风，考虑迁移成本

::: 提示 最后的思考
最佳的技术选择往往是**最无趣的那一个**。选择成熟、稳定且团队熟悉的技术，把创新精力留给业务本身。记住：**技术是手段，不是目的。用户不关心你用了什么框架——他们只关心产品是否好用。**
:::

---

## 延伸阅读

- **ThoughtWorks 技术雷达**：每六个月发布一次，是理解技术趋势的权威参考。
- **实用建议**：下次进行技术选择时，尝试使用决策矩阵进行定量比较。
- **架构决策记录 (ADR)**：记录每个技术选择的决策理由和权衡。
- **警示案例**：学习那些因技术选择不当而导致项目失败的案例。