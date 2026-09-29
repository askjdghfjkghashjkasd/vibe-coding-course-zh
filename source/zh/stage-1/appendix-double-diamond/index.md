---
标题：《双钻：先做正确的事，然后做对的事》
描述：“适合初学者了解双钻。理解、发现、定义、开发和交付，避免在真正问题明朗前急于制作原型。”
---

<脚本设置>
从 '@theme/components/StageAssignmentCard.vue' 导入 StageAssignmentCard
</script>

# 双钻：先做正确的事，然后做好

<a id=“top-dd”></a>

经过需求分析和用户访谈后，我们通常会收集大量资料：不同用户的账户、现有工具的问题，以及多个改进方向。材料增长后，下一个难题是决定保留哪些内容。

当“理解问题”和“设计解决方案”不分离时，很容易进行访谈，同时寻找支持某一偏好特征的理由。**双钻石**通过两个发散与收敛循环将这两种工作区分开来。

本章介绍了发现、定义、开发和交付，并解释了每个阶段的输入、输出及常见错误。

<a id=“dd-what”></a>
## [1.两个发散与收敛的循环]（#top-dd）

双菱形是由英国**设计委员会**推广的经典设计流程框架。它代表了完整的设计和创新过程，作为两个相连的菱形形状。

它被称为“钻石”，因为每个钻石包含两个相反但同等重要的运动：

- **分歧**：打开视图，看看更多可能性
- **汇聚**：缩小范围并做出选择

整个流程包含四个步骤：

1. **发现**：广泛理解用户、问题、背景和市场
2. **定义**：提取真正值得解决的核心问题
3. **开发**：围绕该问题探索多重解决方案方向
4. **交付**：选择、原型、测试并交付更合适的解决方案

前两阶段关注问题空间;后两阶段则处理解空间。

<图形类=“场-场-图形--图”>
  <a href=“https://www.designcouncil.org.uk/resources/framework-for-innovation/” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/double-diamond/design-council-double-diamond-wide.png” alt=“设计委员会双钻石：发现、定义、开发和交付，形成两个连接的钻石” loading =“懒惰” />
  </a>
  <figcaption><strong>从原始图开始。</strong>左侧菱形通过发现（Discover）发散，并在定义（Define）收敛;右侧钻石再次通过开发（Develop）发散，并在交付（Deliver）收敛。设计委员会还指出，这不是一个只能推进一次的线性过程。当测试发现问题时，团队可以回到更早的阶段。来源：<a href=“https://www.designcouncil.org.uk/resources/framework-for-innovation/” target=“_blank” rel=“noreferrer”>Design Council</a>， <a href=“https://creativecommons.org/licenses/by/4.0/” target=“_blank” rel=“noreferrer”>CC BY 4.0</a>。</figcaption>
</figure>

## 2.为什么要将问题与解决方案区分开来

最常见的初学者节奏如下：

- 有个想法
- 觉得方向听起来很刺激
- 立即开始原型制作
- 持续添加更多功能
- 最终失去对实际问题的关注

双钻模型的价值不在于它使过程更复杂。它**迫使你将“理解问题”和“设计解决方案”分开。**

这听起来很显而易见，但却非常重要。许多失败的产品并不是执行不力而导致失败。它们失败的原因是：

- 选择了错误的问题
- 误解了用户
- 过早地锁定了解决方案
- 在验证方向之前，把大量时间花在打磨细节上

双钻模型不断提醒你：

- 不要因为一个想法容易想象，就假设问题是真实存在的
- 不要因为技术上可实现，就假设某个东西值得去建造
- 不要因为原型看起来完整，就假设原型具有意义

这三条警告都指向同一个错误：把已经投入的数量当作方向正确的证据。一个原型只显示团队已经做了什么。访谈、现场观察和实际使用提供了问题存在的证据。

<a id="dd-first"></a>
## [3. 第一个钻石：问题空间](#top-dd)

第一个钻石关注的是**问题本身**，而不是解决方案。它的输出是问题定义，而不是产品原型。

### 3.1 发现：先打开问题空间

发现阶段的核心任务是**广泛调研，而不是快速下结论。**

这一阶段的典型工作包括：

- 观察用户在真实场景中的行为
- 采访潜在用户，询问问题上一次出现的时间
- 观察用户当前是如何临时解决问题的
- 调查竞争者和替代方案的处理方式
- 收集市场、工作流程、约束和周边系统的相关背景信息

很多人认为发现阶段只是“阅读更多信息”。但更重要的是：**你需要理解人和情境，而不仅仅是收集信息。**

例如，假设你想为整理会议记录开发一个 AI 工具。在发现阶段，更好的问题是：

- 会议结束后，具体哪里让人感到麻烦
- 困难部分是记录、整理还是同步
- 人们是自己写笔记、让实习生写、事后听录音，还是干脆跳过记录
- 哪些类型的会议真的需要记录，哪些不需要

发现阶段的主要目标不是立刻找到答案，而是**避免过早假设自己已经知道答案。**

<图形类=“场-图形”>
  <a href=“https://creativecommons.org/2018/09/25/findings-from-the-discovery-phase-of-cc-usability/” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/double-diamond/creative-commons-design-workshop.jpg” alt=“知识共用可用性研究工作坊，面试回答被整理在纸上，墙上贴着便签” loading =“懒惰” />
  </a>
  <figcaption><strong>Real Discover 的材料很杂乱。</strong>在2018年的一次可用性研究中，知识共享团队进行了81次访谈，并综合了另外36次现有访谈。照片中的每张纸代表一个问题，便签记录参与者的回答，点则帮助标记和比较。此时，团队保留了差异，而不是强行将材料集中在一个答案中。照片与案例：<a href=“https://creativecommons.org/2018/09/25/findings-from-the-discovery-phase-of-cc-usability/” target=“_blank” rel=“noreferrer”>知识共享</a>，<a href=“https://creativecommons.org/licenses/by/4.0/” target=“_blank” rel=“noreferrer”>CC BY 4.0</a>。</figcaption>
</figure>

### 3.2 定义：从信息堆中提取核心问题

如果Discover打开视图，Define则开始缩小视图。

Define并不是要保留每一个观测。它关乎的是：

- 哪个问题最值得先解决
- 哪个问题出现得最频繁、最受影响或最重要
- 应关注哪个单一情境版本

这一阶段的核心是将一个广泛的话题转化为一个清晰的问题定义。

例如，你可能从以下内容开始：

>我想打造一个提升会议效率的AI工具。

当你达到Define时，一个更强的版本可能已经是：

> 我们将首先解决项目团队常常无法在30-60分钟的协作会议后10分钟内生成包含行动事项、所有者和截止日期的可共享会议记录的问题。

到那时，问题开始变得明朗：

- 用户身份
- 情况
- 瓶颈所在
- 成功的样子

Define的核心是：**从“有很多问题”转变为“这是我们首先要解决的一个问题”。**

<图形类=“场-图形”>
  <a href=“https://creativecommons.org/2018/09/25/findings-from-the-discovery-phase-of-cc-usability/” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/double-diamond/creative-commons-research-synthesis.jpg” alt=“知识共享团队正在整理和聚类访谈笔记以确定研究主题” loading ing=“lazy” />
  </a>
  <figcaption><strong>定义并不是选择最吸引人的引言。</strong>在同一案例中，团队合并并聚类了117次访谈，寻找反复出现的模式，最终形成了9条洞见。照片中的空间、分组和颜色展示了原始答案与主题和优先事项之间的中间工作。照片与案例：<a href=“https://creativecommons.org/2018/09/25/findings-from-the-discovery-phase-of-cc-usability/” target=“_blank” rel=“noreferrer”>知识CC，</a><a href=“https://creativecommons.org/licenses/by/4.0/” target=“_blank” rel=“noreferrer”>CC BY 4.0</a>。</figcaption>
</figure>

## 4.第二颗钻石：解空间

只有完成第一个菱形后，才有意义完全进入第二个。到那时，你不再是在解决模糊的方向。你是在解决一个已经缩小范围的特定问题。

### 4.1 开发：围绕同一问题探索多种解决方案

开发的重点是**围绕一个定义的问题扩展解决方案空间**

这种发散与发现不同：

- 发现 扩展问题空间
- Develop扩展解空间

继续使用会议记录的例子，在开发中你可以询问：

- 这应该是一个网页工具还是会议插件
- 会议后应处理录音还是实时工作
- 应仅聚焦于摘要，还是主要聚焦于提取行动项目
- 它应该优化个人生产力还是团队同步
- 用户是否应自由编辑，还是产品应直接输出结构化模板

这是一个适合头脑风暴、比较和共创的阶段。

但有一个重要的前提：**所有这些解方向都必须服务于同一定义的问题。**  
如果问题不明确，开发很快就会变成随机的特征蔓延。

<图形类=“场-图形”>
  <a href=“https://commons.wikimedia.org/wiki/File:Design_Thinking_Workshop_WMDE_1.jpg” target=“_blank” rel=“noreferrer”>
    <img src=“ /images/product-discovery/double-diamond/develop-idea-board.jpg” alt=“来自维基媒体德国设计思维研讨会的解答板，彩色笔记分布在多个候选方向” loading =“lazy” />
  </a>
  <figcaption><strong>开发保留了多个答案。</strong>本板来自维基媒体德国设计思维研讨会。候选想法按主题展开，尚未压缩成功能列表。分歧的价值不在于便签数量;而是团队在选择路径前真正比较了不同路径。照片：<a href=“https://commons.wikimedia.org/wiki/File:Design_Thinking_Workshop_WMDE_1.jpg” target=“_blank” rel=“noreferrer”>Corinna Schuster（WMDE）/ 维基共享资源</a>，<a href=“_blank https://creativecommons.org/licenses/by-sa/4.0/” target=“noreferrer”>CC BY-SA 4.0</a>。</figcaption>
</figure>

### 4.2 交付：选择、原型、测试并将解决方案付诸现实

Deliver是第二个钻石内的收敛相位。

在这个阶段，你不再试图想象更多可能性。你正在做出选择：

- 哪个方向最适合当前阶段
- 哪个版本最小但仍然有用
- 哪些特征是优先需要的，哪些可以等待
- 如何用较小的团队进行原型制作、测试和验证

许多人认为“交付”意味着“启动”。更准确的理解是：

**将一个解决方案转变为可测试、可用且可改进的方案。**

这可能是：

- 低保真度流程图
- Figma原型机
- 一个可运行的MVP
- 小型用户测试
- 经过一轮反馈后的修订版本

交付的意义不是完美。而是**让解决方案足够快地进入真实环境中以进行验证。**

<图形类=“场-图形”>
  <a href=“https://commons.wikimedia.org/wiki/File:TestingPaperPrototype.jpg” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/double-diamond/paper-prototype-test.jpg” alt=“参与者在纸质原型上输入输入字段，以模拟与未构建接口的交互” loading =“懒惰” />
  </a>
  <figcaption><strong>可测试并不意味着完全编码完成。</strong>纸质原型在纸上绘制界面。参与者点击并写写，研究者替换下一张。这足以检查流程、措辞和动作顺序，而无需花费数周时间执行可能错误的方向。照片：<a href=“https://commons.wikimedia.org/wiki/File:TestingPaperPrototype.jpg” target=“_blank” rel=“noreferrer”>d_jan / 维基共享资源</a>，<a href=“https://creativecommons.org/licenses/by/2.0/” target=“_blank” rel=“noreferrer”>CC BY 2.0</a>。</figcaption>
</figure>

## 5.区分四个阶段

我们现在分别考察了四个阶段。下面的交互式图表将它们归入一个流程。选择一个阶段，比较其工作、产出以及被故意推迟的任务。

<双钻导航员/>

## 6.常见的双方块错误

### 6.1 在做Discover之前跳进Deliver

这是最常见的一种。人们一有想法就立刻开始画屏幕、写PRD、整合模型或构建页面。

问题不在于他们不认真。问题在于他们甚至可能不知道这个问题是否值得去解决。

### 6.2 在Discover待太久却永远无法到达定义

相反的错误是无休止的研究、无休止的阅读、无尽的采访，却没有融合。

双钻并不是在告诉你永远扩张。它提醒你，扩张之后，你最终必须做出选择。

### 6.3 在定义之后悄悄改变问题

有些团队定义了一个问题，但在开发过程中他们发现某个解决方案更容易构建。然后他们悄悄地重写问题，使其符合他们偏好的解决方案。

这是危险的。到那时，你可能已经不再解决真正的问题了。你可能只是在为某个喜欢的实现辩护。

### 6.4 将Deliver视为“建造一切”

交付并不意味着发布一个庞大的完整产品。通常，一个可测试的原型或一轮真实用户测试已经是一个强有力的交付成果。

## 7.如何在AI产品中使用双钻

人工智能产品尤其容易陷入以能力为先的思维方式，因为模型能力极具诱惑力。很容易直接跳到：

- 是否应添加多模输入
- 我们要不要造一个代理
- 我们是否应该连接工作流程自动化
- 我们应该添加语音、图片还是网页搜索

《双钻》迫使你先问：

- 用户实际卡在哪里
- 这个瓶颈真的是人工智能所必需的吗
- 没有人工智能，目前的方法有什么弱点
- 如果加入了人工智能，它创造了哪些实际进展

这有助于你避免一个非常常见的故障模式：

**能力高，价值低。**

一个实用的序列如下：

1. 在Discover中，观察用户当前如何处理该任务
2. 在定义中，将最痛苦的情景写成一个清晰的问题陈述
3. 在“开发”中，比较哪些AI能力最适合解决该问题
4. 在Deliver中，构建一个小型的第一个版本，并在真实用户中进行测试

## 8.一个可以重复使用的双钻模板

如果你正在开发自己的产品，可以按以下顺序写出各个阶段：

### 发现

- 我观察的用户是谁？
- 他们上次遇到这个问题是什么时候？
- 他们现在怎么解决？
- 什么感觉最烦人、最慢或者最冒险？

### 定义一下

- 在所有问题中，哪个最值得先解决？
- 哪种情况最常见或最重要？
- 第一版到底服务于谁，它到底解决了什么问题？
- 如果我们解决得好，用户状态会发生什么变化？

### 发展

- 该问题有哪些可能的解决方案方向？
- 哪些方向最轻、最快、最容易验证？
- 哪些部分现在是关键的，哪些可以等？

<图形类=“田野-人物-肖像”>
  <a href=“https://commons.wikimedia.org/wiki/File:Design_Thinking_Workshop_WMDE_Gruppenarbeit_2.jpg” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/double-diamond/wmde-group-workshop.jpg” alt=“维基媒体德国设计思维研讨会参与者通过动手小组工作让解决方案想法可见” loading =“lazy” />
  </a>
  <figcaption><strong>发展不是等待一个好点子。</strong>参与者不断切割、排列和制作，使不同的人的想法成为小组讨论的对象。解决方案越早显现，比较、合并或放弃就越容易。照片：Corinna Schuster（WMDE），<a href=“https://creativecommons.org/licenses/by-sa/4.0/” target=“_blank” rel=“noreferrer”>CC BY-SA 4.0</a>。</figcaption>
</figure>

### 送货

- 我们能交付的最小东西是什么来验证这个方向？
- 它是流程草图、原型还是MVP？
- 我们需要和谁测试？
- 测试后，我们如何决定继续、改变还是停止？

## 9.一个初学者也能理解的完整示例

假设你想开发一个帮助大学生准备求职简历的人工智能工具。

很多人会立刻跳到第二个菱形，开始问：

- 是否应实现一键美化
- 是否应该进行智能重写
- 是否应与职位描述自动匹配
- 是否能产生自我介绍

但对于双钻，更强的过程如下：

### 第一颗钻石

**发现**

- 与应届毕业生聊聊他们上次修改简历是什么时候
- 看他们如何把旧版本变成新版本
- 弄清楚他们最大的问题是“我写不出来”、“我不能修改”还是“我无法评判质量”

**定义**

- 将问题范围缩小到更具体的范围内
- 不是“学生不能制作简历”
- 但“首次申请实习的学生难以将现有经历改写成符合岗位的措辞，因此他们会推迟申请”

### 第二颗钻石

**开发**

- 比较多个方向：模板库、AI重写、职位比较、简历评分、示例参考

**送货**

- 只构建一个狭义的初始版本，例如“根据职位描述重写简历要点”
- 让五名学生测试，看看是否能帮助他们更快提交第一版

当第一个菱形变实心后，第二个菱形会变得更清晰。

<figure class="field-figure field-figure--artifact">
  <a href="https://commons.wikimedia.org/wiki/File:Design_Thinking_Workshop_Prototyp_Mitmach-O-Mat.png" target="_blank" rel="noreferrer">
    <img src="/images/product-discovery/double-diamond/wmde-workshop-prototype.png" alt="在维基媒体德国设计思维工作坊中制作的手绘Mitmach-O-Mat界面" loading="lazy" />
  </a>
  <figcaption><strong>一个原型只需要回答一个问题。</strong> 这个工作坊产物没有完整的视觉系统，只有一个欢迎信息、一个操作按钮和一个简短解释。它已经足够用于观察参与者是否理解下一步。交付的目的是获取反馈，而不是先让界面看起来完成。原型：Corinna Schuster / WMDE, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>。</figcaption>
</figure>

<a id="dd-ai"></a>
## [10. 在双钻模型中使用人工智能](#top-dd)

双钻模型本身不是人工智能工具，但人工智能可以在四个阶段中很好地充当加速器。关键是不要让人工智能替你做决定。关键是让它帮助你拓展视野、组织信息、比较方向和生成验证材料。

### 11.1 在发现阶段，先使用人工智能构建粗略的问题地图

在正式访谈和深入研究之前，人工智能可以帮助你进行轻量级的空间扫描，例如：

- 当前已有的常见替代方案
- 用户在公共社区中最常抱怨的问题
- 问题出现的场景和用户群体
- 当前产品经常忽略的点

这不能替代真实研究，但对于创建空间的初步地图非常有用。

一个简单的新手提示可以是：

```text
I want to build a tool that helps college students improve resumes.
Do not help me think about features yet.
First help me figure out what problems people most often run into here.
```

可能的人工智能输出：

```text
Initial problem map:

1. They do not know what experiences to include
2. They do not know how to tailor the resume to different roles
3. They revise many times and still do not know if it is good enough
4. They need someone else to review it, but cannot always ask
5. Because they feel unsure, they keep delaying applications
```

那种输出并不是用来取代你的判断的。它帮助你更快地进入发现阶段。

### 11.2 在定义阶段，使用 AI 缩小问题陈述

在收集了大量信息之后，最难的事情之一就是将其转化为一个非常清晰的问题陈述。你可以将研究笔记提供给 AI，并让它将这些笔记压缩为候选定义：

```text
Below are user notes and research notes I collected during Discover:
[paste the content]

Please do 3 things:
1. summarize the most common problem patterns
2. based on frequency, pain, and ease of validation, suggest 3 problems worth prioritizing
3. write each problem as one clear problem statement
```

你也可以保持输入非常简单：

```text
These are the issues I collected:
1. people do not know what to write on the resume
2. people do not know how to revise it
3. people keep feeling it is not good enough, so they do not apply

Please help me decide which problem is the best first one to solve.
```

可能的人工智能输出：

```text
Recommended first problem:

"Students applying for internships for the first time are unsure whether their resume has reached a submit-ready level, so they keep revising and delay applying."

Reasons:
1. it is more concrete
2. it explains the delay behavior
3. it is easier to test with a smaller first version
```

这是有用的，因为它可以帮助你将模糊的一系列问题缩小到更接近 MVP 起点的状态。

### 11.3 在开发阶段，使用 AI 扩展多种解决方案方向

一旦人们定义了一个问题，他们往往会立即专注于脑海中出现的第一个解决方案。AI 在这里非常有用，作为一种强制发散的工具：

```text
I have defined this core problem: [your problem statement]
Please do not give me only one final answer.
Instead, propose 2-3 solution directions from each of these angles:
1. the lightest MVP
2. the best option for validating demand
3. the best option for improving user experience
4. a non-AI solution
5. an AI-based solution

At the end, compare the strengths, risks, and validation cost of each direction.
```

那可以防止你过早被某个最喜欢的解决方案困住。

一个更简单的提示可以是：

```text
My problem statement is:
"Students delay applying because they are not sure whether their resume is ready."

Please suggest 4 different solution directions, not just one.
```

可能的人工智能输出：

```text
Option 1: resume readiness checklist
Option 2: job-description-based rewrite assistant
Option 3: resume risk detector
Option 4: example comparison library
```

现在你处于比较模式，而不是只盯着一个 AI 重写路径。

### 11.4 在交付阶段，使用 AI 生成原型文案和测试材料

一旦进入交付阶段，AI 在加快工作方面非常有用，例如：

- 为低保真原型撰写文案
- 组织用户测试脚本
- 生成多版本的标题、按钮和说明
- 总结测试反馈和问题列表

例如，你可以让 AI 生成一个 20 分钟的用户测试脚本，或将五条反馈总结成像“继续 / 修改 / 暂停”这样的决策框架。

一个非常小的输入可能是：

```text
I made a very simple prototype:
the user uploads a resume, and the system tells them which parts are not yet ready for submission.

Please generate a 15-minute user testing script.
```

可能的 AI 输出：

```text
15-minute user testing script:

1. Ask the user to describe their most recent resume submission experience
2. Let them upload a resume independently
3. Observe whether they understand the feedback
4. Ask which parts feel helpful and which parts feel confusing
5. Ask whether they would want to use this again before the next application
```

这是有用的，因为它能把你从“我完成了原型”转变为“我实际上如何测试它？”

### 11.5 让人工智能充当阶段守卫

双钻模型中最大的风险之一是人们跳过阶段。你可以直接让人工智能充当流程守卫：

```text
Please act as a product process coach.
Here is my current project state: [your description]
Please judge whether I am mainly in Discover, Define, Develop, or Deliver.
Then tell me:
1. whether I am jumping ahead too early
2. what the most important action in the current stage is
3. what I should not do yet
```

这对初学者尤其有帮助，因为在问题还没完全明确之前，很容易开始原型制作。

## 11.摘要

- 发现与定义、生成问题定义;开发与交付、生成和测试解决方案。
- 散度扩展候选集;收敛通过证据进行权衡。
- 问题定义应在解探索之前，但后续测试可能需要修订。
- 交付旨在产生支持学习的测试结果，而不一定是完整的产品。

## 12.锻炼

<StageAssignmentCard 标题=“用双钻组织你的想法”>

1. 选一个你一直在考虑的产品创意，为其发现、定义、开发和交付阶段写一份草稿
2. 在定义中，强迫自己将问题压缩成一句具体的句子
3. 在开发中，列出至少3个不同的解决方案方向，而不是死守第一个方向
4. 在Deliver中，写下一个你能在一周内发送的最小验证版本

</StageAssignmentCard>

## 延伸阅读

本文主要参考设计委员会关于双钻的官方资料。以下是继续的好地方：

- [设计委员会：双钻]（https://www.designcouncil.org.uk/our-resources/the-double-diamond/）
- [设计委员会：创新框架]（https://www.designcouncil.org.uk/our-work/skills-learning/tools-frameworks/framework-for-innovation-design-councils-evolved-double-diamond/）
- [设计委员会：双钻历史]（https://www.designcouncil.org.uk/our-resources/the-double-diamond/history-of-the-double-diamond/）

<式瞄准镜>
.field-figure { 边距：24px 0 32px;溢出：隐藏;边框：1px 实心 var（--vp-c-分隔符）; border-radius： 12px; background： var（--vp-c-bg-soft）; }
.field-figure > a { display： block; background： #f4f4f1; }
.field-figure img { display： block; width： 100%; 最大高度：520px;object-fit： contain; }
.field-figure--diagram img { 最大高度：580px;填充：18px; }
.field-figure--portrait img { 最大高度：640px; object-fit： contain; }
.field-figure--artifact img { 填充：20px; background： #f4f1eb; object-fit： contain; }
.field-figure 图解 { 填充：13px 16px 15px; border-top： 1px 实心 var（--vp-c-分隔符）; color： var（--vp-c-text-2）; font-大小：13px;行高：1.75; }
.field-figure figcaption strong { color： var（--vp-c-text-1）; }
@media（最大宽度：640px） { .field-figure { margin： 20px 0 28px; } .field-figure--diagram img { 填充：8px; } }
</style>