---
标题：“用工作去完成，找出用户真正想完成的事情”
描述：“适合初学者的《Jobs to Be Done》入门。学习如何将模糊的想法转化为更清晰的用户场景、更明确的需求和更扎根的MVP方向。”
---

<脚本设置>
从 '@theme/components/StageAssignmentCard.vue' 导入 StageAssignmentCard
</script>

# 用工作去完成，找出用户真正想完成的事情

<a id=“top-jtbd”></a>

假设我们正在计划一个会议笔记工具。从特征开始，列出转录、摘要、行动项提取和文档导出都很简单。然而，这些功能并未回答一个更基本的问题：为什么有人会在会议后使用这个工具？

**Jobs to Be Done（JTBD）**通过观察用户试图完成的任务来回答这个问题。它关注具体情境、期望结果和当前的工作方式，而不是假设某个功能必须有用。

本章首先介绍了JTBD的基本思想，然后展示了如何将特征描述重写为可检验的需求假设。

<a id=“jtbd-what”></a>
## [1.从专题到工作]（#top-jtbd）

待完成的工作，通常简称为**JTBD**，围绕一个简单的理念构建：用户“雇佣”一个产品来完成任务。

那个“东西”通常不仅仅是表面上的任务。它是一种**进步**。

示例：

- 不是“我想要一个AI会议记录工具”，而是“我想把一场混乱的会议变成一个清晰的总结，包含所有者和下一步步骤，免得忘记一切。”
- 不是“我想要一个预算应用”，而是“我想在月底不再焦虑，因为我终于明白我的钱都花哪儿了。”
- 不是“我想要简历优化器”，而是“我想有足够的自信去提交申请，而不是无休止地修改简历”。

JTBD帮助你减少功能名称，更多关注用户想要发展的方向。

这也改变了你看待竞争对手的方式。如果工作是“让长PDF更容易理解”，你的竞争对手不仅仅是另一个AI工具。可能是同事、实习生、手动浏览，甚至是拖延任务。

<图形类=“场-图形”>
  <a href=“https://commons.wikimedia.org/wiki/File:Mapa_de_viaje_de_clientes.png” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/jtbd/customer-journey-map.png” alt=“记录用户需求、活动、工件、感受和产品机会的客户旅程地图，跨多个阶段” loading =“懒惰” />
  </a>
  <figcaption><strong>一项工作通过一个流程展开。</strong>这张客户旅程地图将在线工具的使用划分为多个阶段，并记录每个阶段的需求、活动、工具、感受和机会。JTBD的研究应遵循这一过程，而不仅仅是询问用户偏好哪种功能。作者：Advenio;来源：<a href=“https://commons.wikimedia.org/wiki/File:Mapa_de_viaje_de_clientes.png” target=“_blank” rel=“noreferrer”>维基共享资源</a>，<a href=“https://creativecommons.org/licenses/by-sa/4.0/” target=“_blank” rel=“noreferrer”>CC BY-SA 4.0</a>。</figcaption>
</figure>

## 2.JTBD 与 Personas 及功能列表的比较

很多初学者会先写角色：25岁，白领，喜欢生产力工具，愿意尝试新应用。这些信息并非没用，但通常**不能解释某人为什么现在会这样。

JTBD会引导你去思考更有价值的问题：

- 是什么情况触发了行动？
- 什么问题觉得紧急？
- 他们想朝什么方向移动？
- 他们现在用什么笨拙的变通办法？
- 什么结果会让他们说“这实际上有帮助”？

这就是区别：

- 人格描述大致告诉你这个人是谁
- JTBD告诉你他们现在想做什么

功能列表也有类似的陷阱。用户可能会请求导出、重写、语音输入或智能标签。这些都是表面请求。JTBD 询问它们下面包含了什么：

- 为什么导出为Word而不是PDF？
- 为什么要重写：因为基调薄弱，还是因为必须迎合不同的受众？
- 为什么要语音输入：因为打字很烦人，还是因为通常在走路、通勤或离开会议时捕捉想法？

有时候，一个功能只是对更深层工作的临时转译。

## 3.示例：会议记录

想象一下，有人每天早上上班路上买咖啡和三明治。

表面上看，他们是在买早餐。用JTBD的角度来说，他们可能真的想：

- 尽量少用脑力解决早餐
- 避免在到达工作地点前感到饥饿
- 保持早晨例行公事顺利进行，不被打扰

他们“雇佣”的其实并不是某个特定的三明治品牌。这是一种可靠的早晨节奏方式。

同样的逻辑也适用于AI产品。如果你想构建一个AI会议摘要工具，JTBD帮助你从功能头脑风暴中退一步，提出以下问题：

- 什么时候才真正痛？
- 用户在会议后希望实现什么？
- 什么样的产出才会让人觉得值得信赖分享？

如果任务变得清晰，优先级也会更明确。也许第一个版本不需要十二种导出格式。也许它主要需要：

- 清晰的结构
- 稳定的动作项提取
- 便捷分享
- 输出足够好，可以顺利转发而不尴尬

这就是JTBD的最佳状态：它让你从“我应该叠加哪些能力？”回到“我帮助用户取得什么进展？”。

<图形类=“场-图形”>
  <a href=“https://commons.wikimedia.org/wiki/File:Taking_Notes.JPG” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/jtbd/meeting-note-taking.jpg” alt=“参与者在真实会议中用电脑和笔做笔记” loading =“lazy” />
  </a>
  <figcaption>在<strong>设计功能前观察环境。</strong>会议中的人们已经使用电脑、纸张和自己的笔记习惯来完成工作。在构建会议笔记产品之前，先了解他们记录了哪些内容，以及之后还需要整理哪些内容，而不是假设语音转文字就是答案。照片：Unclefeet，<a href=“https://creativecommons.org/licenses/by-sa/3.0/” target=“_blank” rel=“noreferrer”>CC BY-SA 3.0</a>。</figcaption>
</figure>

下面的比较展示了三种情况。当你在它们之间切换时，注意产品特性和用户工作描述的内容。

<Jtbd进展实验室 />

## 4.JTBD声明的五个要素

如果你是初学者，不要把事情搞得太复杂。从五个部分开始。

### 4.1 情况

用户在什么时刻或情境下寻求帮助？

- 会议结束后
- 在深夜提交简历前
- 当老板突然要求提供文件时
- 月底钱紧张时

如果你无法描述具体情况，那需求可能仍然太模糊。

### 4.2 触发器

是什么让他们现在行动？

- 一份他们不知道从何开始阅读的长文档
- 明天有截止日期，今天有杂乱材料
- 经理提出的进展问题暴露了他们的困惑
- 手动工作流程中的反复摩擦

触发点往往伴随着情绪。情绪很重要。

### 4.3 进展

他们想转向哪个州？

- 从混乱到清晰
- 从焦虑到自信
- 从延迟到行动
- 从摩擦到流动
- 从模糊的输出到他们真正能够交付的东西

很多人其实并没有真正买工具。他们买的是**州变**。

### 4.4 当前变通方法

他们现在没有你的产品在做什么？

- 手动复制粘贴
- 使用Excel或笔记来整理内容
- 向同事询问
- 拖延症
- 在多个工具间切换

变通方法往往是你真正的竞争对手。

<图形类别=“场地-场-景--狭窄”>
  <a href=“https://commons.wikimedia.org/wiki/File:Scrum_task_board.jpg” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/jtbd/physical-task-board.jpg” alt=“一个带有便签的实体办公任务板，在待办、进行中和测试列之间切换” loading =“懒惰” />
  </a>
  <figcaption><strong>替代方案不必是另一个应用。</strong>这个实体板使用普通便签和胶带完成了让进展可见的工作。竞争者研究应包括手工流程、电子表格和类似的协作习惯。照片：Logan Ingalls，<a href=“https://creativecommons.org/licenses/by/2.0/” target=“_blank” rel=“noreferrer”>CC BY 2.0</a>。</figcaption>
</figure>

### 4.5 成功条件

什么让用户觉得这真的有帮助？

- 在10分钟内获得可分享的结果
- 无需第二次重大重写
- 减少错误
- 立即知道下一步该做什么

如果你说不清“足够有用”是什么意思，说明方向可能还不够聚焦。

<a id=“jtbd-formula”></a>
## [5.JTBD句型]（#top-jtbd）

使用这个句型：

> 当__________时，我想__________，这样我就能__________。  
> 现在，我得去__________。

示例：

> 当我准备申请实习时，我想快速把现有简历改成适合特定岗位的版本，这样我就能提交申请，而不用被无休止的修改困住。  
> 现在我得手动重写内容，还得向朋友请教反馈。

这比“我想做简历AI”有用得多。

## 6.人工智能产品工作的三层面

许多AI产品在演示中看似强大，但未能留住用户。一个常见原因是它们只解决表面任务，而非更深层次的工作。

你可以大致将一份工作分为三层：

### 6.1 功能层

什么是地面任务？

- 摘要文档
- 重写文本
- 提取行动项目
- 生成图像

这是用户最容易说出口的层次。

### 6.2 情感层面

他们想减少什么不适，或者想要获得什么样的感觉？

- 减少恐慌
- 更少尴尬
- 减少“从零开始”
- 增强信心
- 更多控制力

支付意愿往往与这一层关系密切。

### 6.3 社会层面

他们想在别人面前看起来像什么样？

- 更可靠
- 更有组织
- 更专业
- 更胜任

如果你只解决功能层面，替换会更容易。如果你也理解情感层面和社交层面，你的产品方向通常会更强。

## 7.使用 JTBD 来筛选产品方向

有时候你还没有产品。你有三到五个想法，不知道哪个值得关注。JTBD在这里也很有用。

提出每个想法：

1. 情形是否足够具体？
2. 用户是否已经在使用一些笨拙的变通方法？
3. 这份工作是否足够痛苦或频率足够高？
4. 如果我解决得好，用户会明显感觉状态更好吗？
5. 版本一能否只关注工作中的一个重要步骤？

如果一个想法听起来“有点有趣”，但你无法解释触发点、变通方法或成功条件，那它很可能仍然是模糊的想法，而非良好的起点方向。

## 8.你可以立即使用的面试问题

很多人在面试时会问：“你想要哪些功能？”这通常得到的回答很表面。

JTBD风格的问题更好：

- 你上次遇到这种问题是什么时候？
- 你当时在做什么？
- 你为什么卡住了？
- 你怎么解决的？
- 哪部分感觉缓慢、沮丧或冒险？
- 如果工具有帮助，什么结果会让你觉得它真的有用？
- 你尝试过哪些替代方案，为什么都不够好？

这些问题将对话拉回现实体验，而非想象中的偏好。

<图形类=“场-图形”>
  <a href=“https://commons.wikimedia.org/wiki/File:Touch_on_Clamshell_Devices.jpg” target=“_blank” rel=“noreferrer”>
    <img src=“ /images/product-discovery/jtbd/intel-context-observation.jpg” alt=“在英特尔用户体验研究中，参与者直接触摸笔记本电脑屏幕” loading =“懒惰” />
  </a>
  <figcaption>行为<strong>有时比答案更具体。</strong>在英特尔在巴西、中国、意大利和美国研究笔记本电脑触控交互时，研究人员观察到参与者将屏幕向后推，并用双拇指或其他姿势操作。通过询问用户想要哪些功能很难发现这些行为，但它们揭示了人们实际如何使用产品。照片：<a href=“https://commons.wikimedia.org/wiki/File:Touch_on_Clamshell_Devices.jpg” target=“_blank” rel=“noreferrer”>Intel Free Press / Wikimedia Commons</a>，<a href=“https://creativecommons.org/licenses/by/2.0/” target=“_blank” rel=“noreferrer”>CC BY 2.0</a>。</figcaption>
</figure>

## 9.用AI帮你拆解JTBD

JTBD不是AI发明，但AI在组织和澄清JTBD方面非常有用。

例如，如果你已经收集了5到10条用户引用，你可以让AI这样总结它们：

```text
Please act as a product research assistant.
I will give you raw user quotes.
Do not give feature ideas yet.
First organize them using Jobs to Be Done:

1. What situation is the user in?
2. What event triggered action?
3. What progress are they really trying to make?
4. What is the current workaround?
5. What success condition matters most?
6. What emotional words show up repeatedly?

Then turn the result into 3 JTBD hypotheses worth validating first.
```

如果你已经有了一个想法，你也可以使用人工智能来进行第一次筛选：

```text
I want to build [your product idea].
Do not give me a feature list yet.
Use Jobs to Be Done to help me analyze:

1. What concrete situations this product might serve
2. What core job exists in each situation
3. What alternatives already exist
4. Which job is the best starting point for an MVP, and why
5. Write the final recommendation as one clear JTBD sentence
```

这有助于防止经典的人工智能陷阱：在方向不明确之前就直接跳到“头脑风暴50个功能”。

## 10. 四个常见的新手错误

### 10.1 将工作写成功能

“AI摘要”、“智能分类”和“自动生成”不是工作。这些只是可能的解决方案。

### 10.2 目标受众过于宽泛

“所有专业人士”、“所有学生”和“所有创业者”通常太宽泛。范围越广，越难看到真实情况。

### 10.3 只听用户说什么

人们说的话很重要，但他们当前的应对方法往往更能体现他们的优先事项。

### 10.4 过早尝试构建完整平台

当你专注于一个具体情境中的一项重要步骤并让这部分体验大幅提升时，JTBD的效果最好。

<a id="jtbd-ai"></a>
## [11. 使用AI整理JTBD资料](#top-jtbd)

JTBD不是人工智能的发明，但人工智能可以成为非常有用的研究助手、组织者和挑战者。关键是：

**使用AI来组织和扩展你的思路，而不是为你发明用户的真实需求。**

### 12.1 将模糊的想法转化为候选JTBD陈述

```text
I currently have a vague product idea: [your idea].
Do not give me a feature list yet.
Use Jobs to Be Done to help me analyze:
1. What situations might this idea fit?
2. What progress might users want in each situation?
3. What current alternatives might they be using?
4. Which job feels best as an MVP starting point?
Write each job as one clear JTBD sentence.
```

你也可以像这样写一个非常初级风格的输入：

```text
I want to build something that helps college students find internships.
I can't explain it clearly yet.
Help me figure out what users might actually be trying to get done.
```

可能的人工智能输出：

```text
Possible JTBD directions:

1. When I start internship applications, I want to know what I need to prepare first,
so I do not keep delaying because everything feels confusing.

2. When I see a job post, I want to quickly judge whether it is worth applying to,
so I do not waste energy on poor-fit roles.

3. When I am ready to apply, I want to adapt my resume to a specific role,
so I can submit faster and feel more confident.
```

这里的价值在于，AI帮助将一个模糊的想法拆分为几个更清晰的方向。

### 12.2 整理原始采访笔记

```text
Below are raw notes from 5 user interviews.
Do not suggest solutions yet.
First organize them using JTBD:
1. What situation is the user in?
2. What event triggered action?
3. What progress are they trying to make?
4. What is the current workaround?
5. What success condition matters most?
6. What patterns repeat across users?

Then summarize 3 JTBD hypotheses worth validating first.
```

一个非常简单的初学者输入可以像这样：

```text
I asked 3 people and they roughly said:

1. Every time I apply for internships, I have to redo my resume and it's annoying.
2. I mostly worry that I still don't know if it's good enough.
3. Right now I ask seniors for help, but I don't want to bother them too often.

Please help me summarize the real job they are trying to get done.
```

可能的人工智能输出：

```text
Organized result:

- common situation: preparing internship applications
- common pain: uncertainty about whether the resume is ready enough
- current workaround: asking seniors, revising manually
- possible JTBD:
  When I am preparing to apply, I want to know whether my resume is ready enough to send,
  so I stop getting stuck in endless revisions.
```

这是有用的，因为它可以将混乱的引用转化为更接近真正需求的内容。

### 12.3 在面试前进行轻量级的网络调研

在进行更大规模的面试工作之前，AI 可以帮助你对外部信息进行轻量扫描：

- 人们在公共社区中如何抱怨这个问题
- 现有工具主要解决了什么
- 人们常用的解决方法有哪些
- 用户对当前解决方案赞扬或不喜欢的地方

这并不能替代真实的用户访谈，但它是发现阶段的一个很好的热身。

简单输入：

```text
Please look up common pain points students mention when editing resumes and applying for internships.
Focus on forums, public communities, and real user complaints.
Summarize the top 5 patterns.
```

可能的人工智能输出：

```text
Top recurring pain points:
1. Not knowing what to include
2. Not knowing how to tailor a resume for different roles
3. Feeling unsure whether the resume is good enough
4. Lack of reliable feedback
5. Delaying applications because the process feels heavy
```

这种输出不是最终的真理，但它可以帮助你用更好的地图开始面试。

### 12.4 请 AI 扮演批评者

有时我们会对自己的想法产生情感依恋。AI 可以通过扮演严厉的批评者来提供帮助：

```text
Act as a very strict product research advisor.
Here is my JTBD hypothesis: [your hypothesis]
Critique it from these angles:
1. Is the situation still too broad?
2. Is this actually a feature, not a progress statement?
3. Are the alternatives too weak?
4. Is the success condition too vague?
5. What risk most needs validation?
```

那种挑战可以帮助你判断自己是否真正关注用户需求，还是仅仅在为自己喜欢的解决方案辩护。

## 12. 总结

- JTBD 将分析重点从产品特性转向用户希望完成的任务。
- 一个 JTBD 假设应描述情境、触发因素、期望进展、当前替代方案以及成功条件。
- 功能是完成任务的一种可能方式，不应与任务本身混淆。
- JTBD 仍然是一个需求假设，必须通过访谈和行为证据进行验证。

## 13. 练习

<StageAssignmentCard title="描述用户真正想要完成的任务">

1. 选择一个产品创意并将其改写成一句 JTBD 句子
2. 添加五个部分：情境、触发因素、进展、变通方法、成功条件
3. 与 3 位潜在用户讨论他们上次遇到这个问题的情况
4. 将访谈笔记交给 AI，并让其总结 3 个可能的 JTBD 假设

</StageAssignmentCard>

## 进一步阅读

- [Christensen 研究所：待完成的工作（Jobs to Be Done）](https://www.christenseninstitute.org/theory/jobs-to-be-done/)
- [哈佛商学院在线：什么是待完成的工作？](https://online.hbs.edu/blog/post/jobs-to-be-done)
- [Intercom：待完成的工作：客户需求框架](https://www.intercom.com/blog/jobs-to-be-done-framework/)
- [Mural：待完成的工作框架指南](https://www.mural.co/blog/jobs-to-be-done-framework)

<style scoped>
.field-figure { margin: 24px 0 32px; overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.field-figure > a { display: block; background: #f4f4f1; }
.field-figure img { display: block; width: 100%; max-height: 520px; object-fit: contain; }
.field-figure--narrow img { max-height: 720px; object-fit: contain; }
.field-figure figcaption { padding: 13px 16px 15px; border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-size: 13px; line-height: 1.75; }
.field-figure figcaption strong { color: var(--vp-c-text-1); }
@media (max-width: 640px) { .field-figure { margin: 20px 0 28px; } }
</style>