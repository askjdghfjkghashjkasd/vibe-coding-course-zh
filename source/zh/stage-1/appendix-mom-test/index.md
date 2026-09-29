---
标题：《妈妈测试：一种用户访谈验证需求的方法》
描述：“适合初学者了解《妈妈测试》的入门指南。学习如何避免客套反馈，询问真实行为和真实成本，并将”听起来不错“转化为更可靠的需求证据。”
---

<脚本设置>
从 '@theme/components/StageAssignmentCard.vue' 导入 StageAssignmentCard
</script>

# 妈妈测试：一种用户访谈验证需求的方法

<a id=“top-mom”></a>

上一章关于JTBD的陈述仍是一个假设。访谈帮助我们核实问题是否最近发生，以及用户是否已经为此投入了时间、金钱或精力。

这听起来很简单。但如果我们直接问某人是否喜欢某个想法，通常会得到礼貌且笼统的回答。例如：

- 你觉得这个主意怎么样？
- 如果是我来建，你会用吗？
- 这个功能听起来有用吗？

回复通常听起来都很鼓舞人心：

- 听起来不错
- 这听起来很有用
- 我觉得你应该试试

问题是这些答案通常帮不了你做决定。它们往往只是礼貌、支持，或者一种自然的本能，不想在当下打击你。你以为你收集到了“市场验证”，但实际上你收集的是一堆难以使用的安慰反馈。

这些答案并非错误，但它们难以用于产品决策。妈妈测试要求我们少花时间关注未来意图，多关注过去发生的事情、用户如何处理以及这对他们已经付出了什么代价。

本章解释如何避免此类假阳性反馈，并将访谈从观点和假设未来转向过去行为、当前的变通方法和已发生的成本。

<a id=“妈妈-什么”></a>
## [1.为什么采访会产生假阳性]（#top-mom）

《妈妈测试》一词出自罗布·菲茨帕特里克同名著作。书名听起来俏皮，但重点却很明确：

**即使是妈也会很难告诉你，如果你问错了，你的主意不好。**

原因不是她不诚实。而是：

- 她不想伤害你
- 她自然想鼓励你
- 她通常会按照你问题已经暗示的方向回答

这不仅仅是关于妈的事。朋友、同事、前同学，甚至陌生人在对产品创意的反应时，往往也会做出同样的反应。一个积极的回答不一定意味着需求是真实的。它可能只是你用一种让奉承回答变得容易的方式提问。

因此，《妈妈测试》的重点不是采访谁，而是如何构建问题结构。面试应关注可验证的经验，而非收集产品创意的评价。

## 2.观点与行为证据

妈妈测试主要帮助你避免一个非常常见的认知错误：

**将礼貌的积极反馈误认为是真实需求。**

例如，人们经常问：

- 你觉得这个应用的想法怎么样？
- 如果我造了一个能重写简历的AI工具，你会用吗？
- 这个功能听起来有价值吗？

这些问题有三个共同点：

- 他们征求意见
- 包含一定程度的暗示或框架
- 他们谈论着一个尚未发生的未来

人们在回答观点和未来想象行为时通常不可靠。他们往往高估自己的兴趣、自己的坚持和支付意愿。

这就是为什么《妈妈测试》不断提醒你：

- 不要轻易相信对你想法的赞扬
- 不要轻易相信对未来行为的预测
- 将对话拉回到用户在现实生活中已经做过的事情上

相比“你会使用这个吗？”，像“你上次是怎么处理这个的？”这样的问题通常更接近真实。

<a id="mom-principles"></a>
## [3. 提问的三大原则](#top-mom)

如果你只想先记住最重要的部分，请记住这三条原则。

### 3.1 少谈你的想法，多谈用户真实的过去经历

许多低效的访谈以过多解释开场：你的解决方案、你的兴奋感、你的产品概念、你的功能计划。一旦这样做，对方通常会进入“支持模式”。

更好的方向是将对话围绕他们的真实经历展开：

- 这上一次发生在什么时候？
- 当时你在做什么？
- 你是如何处理的？
- 哪一步让你觉得最烦？

像这样的问题可以把对话拉回现实，而不是停留在想象的偏好中。

### 3.2 少问抽象意见，多问具体事实

“那听起来很有用”、“好像不错”、“我觉得我会喜欢”都太抽象，无法指导产品决策。

更有价值的信息通常像这样：

- 上周我花了两个小时处理这个问题
- 现在我用 Excel 和聊天工具凑合着处理
- 我上个月已经为这个相关的东西付过钱
- 我最大的担忧不是慢，而是犯错

这种信息可以帮助你判断问题的严重程度、发生频率，以及是否有人愿意付费解决它。

### 3.3 少问用户偏好的解决方案，多关注他们今天是如何解决问题的

用户通常擅长描述痛点，但不一定擅长设计最佳产品。

如果你问：

- 你希望 AI 自动完成这个吗？
- 智能功能会有帮助吗？

你通常得到的是对一个提议方案的模糊意见，而不是关于潜在需求的证据。

更好的问题是：

- 你今天是怎么做的？
- 为什么你会这样做？
- 这种方法有什么问题？

清楚地看到当前的替代方案往往比问“你希望我们做什么？”更有价值。

<figure class="field-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Participants_-_Interview.jpg" target="_blank" rel="noreferrer">
    <img src="/images/product-discovery/mom-test/user-interview-session.jpg" alt="一次真实的访谈中，采访者手持麦克风与参与者交流，桌上有电脑和笔记" loading="lazy" />
  </a>
  <figcaption><strong>访谈的中心是参与者，而不是脚本。</strong> 这张照片中的采访者在倾听参与者的描述；电脑和纸张只是记录工具。无需急于完成检查表。当出现诸如“上周”、“最终我不得不”、“我已经花了”等词时，用另一个问题深入了解该经历。照片来源：<a href="https://commons.wikimedia.org/wiki/File:Participants_-_Interview.jpg" target="_blank" rel="noreferrer">ManonB2018 / Wikimedia Commons</a>，<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>。</figcaption>
</figure>

## 4. 为什么人们总是给出好听但无用的答案

如果你理解了这一点，面试时会犯更少的错误。

### 4.1 人们天生会尽量保持礼貌

尤其是当对方认识你时，很难说：

- 这个方向听起来并不强
- 我绝不会用这个
- 这对我来说不够重要

他们更可能说“听起来有趣”或“可能有用”之类的话。

### 4.2 人们高估了未来的自己

许多人真心相信他们的未来会：

- 更加自律
- 更愿意学习
- 更愿意支付
- 更愿意尝试新工具

所以“我可能会用那个”这句话，往往并不意味着他们真的会这么做。

### 4.3 你的题型已经在塑造答案

当你问：

- 我的想法听起来挺不错的，对吧？
- 这个功能会帮到你，对吧？

你已经把“好答案”藏在问题里了。

这也是《妈妈测试》强烈提醒你的原因之一：

**不要把面试变成寻求安慰。**

## 5.弱问题与更好问题

这些比较很有用，因为几乎每个初学者都会问它们的某种版本。

|弱问题 |更好的问题 |
|--- |--- |
|你怎么看这个想法？|你上次遇到这种事是什么时候？|
|如果有这个，你会用吗？|你现在怎么处理？|
|你愿意为此付钱吗？|你已经花时间或钱解决这个问题了吗？你花在了什么上？|
|这个功能重要吗？|流程中哪个步骤感觉最慢、最令人沮丧或最不值得信赖？|
|你会希望AI自动完成这件事吗？|你为什么还没找到更好的变通方法？|

表中最重要的不是措辞本身，而是转变的方向：

- 从观点到事实
- 从未来到过去
- 从你的解决方案到用户的问题

下面的练习呈现了六个常见的访谈陈述。判断哪些陈述提供了可用的证据，哪些仅是个人观点。

<InterviewEvidenceLab />

## 6.基本面试流程

如果你现在想和人说话，可以直接用这个顺序。

### 6.1 作为学习者开放，而非销售者

例如：

>我正在试图了解人们在现实生活中是如何应对这种情况的。我现在没有在卖任何东西。

这让对方更容易放下鼓励你的本能。

### 6.2 从上一次真实事件开始

好的开场问题有：

- 上次发生这种事是什么时候？
- 发生了什么？
- 你先做了什么？

一旦谈话进入一个具体的真实事件，信息质量通常会大大提升。

### 6.3 然后询问行为、成本和替代方案

继续提问如下：

- 你今天做什么？
- 那种方法最让人觉得糟糕的是什么？
- 这需要多少时间、金钱或精力？
- 你试过别的吗？你为什么停了？

### 6.4 只有在那时才能判断痛苦和优先

你不必直接问，“这有多痛？”你通常可以从细节中判断：

- 这种事经常发生吗？
- 他们已经在积极修补问题了吗？
- 他们已经付出了真正的代价吗？
- 他们谈论这件事时会明显感到沮丧或情绪化吗？

这些线索比单纯问“这是你的痛点吗？”更有用。

## 7.更完整的例子

假设你想开发一款帮助大学生改进简历的人工智能产品。

### 弱问题

你问同学：

> 我想建立一个 AI 简历优化工具。你怎么看？  
> 如果它能根据职位描述自动重写你的简历，你会使用吗？

他们可能会说：

- 听起来不错  
- 我觉得可能有用  
- 如果是免费的，我会尝试

这些回答几乎不能可靠地反映实际需求的强度。

### 更好的问题

你可以将对话改成这样：

> 你上一次修改简历是什么时候？  
> 你为什么需要修改它？  
> 你是怎么做的？  
> 哪一步最难？  
> 你有没有请别人帮你审阅？  
> 你有没有花过钱或花很多时间在这上面？

通过这些问题，你可以了解到：

- 许多人写作能力不差，但在针对不同职位调整简历方面很欠缺  
- 最大的痛点通常不是格式问题，而是不清楚哪些经历应该写  
- 他们拖延并不是因为懒，而是因为每轮修改都会让他们精疲力竭  
- 现有的应对方案已经包括资深人士、模板、AI 工具和朋友

这样你就更接近真实的问题。

## 8. 《妈妈测试》如何与 JTBD 配合使用

如果 JTBD 帮助你看到用户想要实现的进展，《妈妈测试》教你：

**如何通过访谈验证这个需求是否真实存在。**

你可以这样结合两者：

1. 使用 JTBD 草拟一个需求假设  
2. 使用《妈妈测试》风格的问题，询问上一次实际情况  
3. 判断这个需求是否频繁发生、痛苦和值得优先考虑

JTBD 假设示例：

> 当我准备实习申请时，我希望将旧简历改成针对特定职位的版本，以便更快提交。

现在用类似问题验证：

- 你上一次实习申请是什么时候？  
- 你是如何修改简历的？  
- 哪一部分最难重写？  
- 你是如何判断简历是否准备好？

这就是两种方法的连接方式：

- JTBD 帮助定义需求假设  
- 《妈妈测试》通过对话验证它

访谈帮助我们了解过去发生了什么，但不是最终步骤。一旦有原型，用户应直接操作它，这样我们可以比较他们描述的操作和实际操作。

<figure class="field-figure">
  <a href="https://commons.wikimedia.org/wiki/File:03-Pau-DevCamp-usability-testing.jpg" target="_blank" rel="noreferrer">
    <img src="/images/product-discovery/mom-test/usability-testing-session.jpg" alt="在班加罗尔 DevCamp 的可用性测试中，参与者操作一个新的翻译应用程序" loading="lazy" />
  </a>
  <figcaption><strong>在“我会使用它”之后，检查解决方案是否可用。</strong> 这张照片记录了 2012 年班加罗尔 DevCamp 对新翻译应用程序的可用性测试。一名参与者在电脑上完成任务，而研究人员观察困难点。访谈测试问题是否存在；可用性测试则检查解决方案是否能够帮助完成任务。照片来源：<a href="https://commons.wikimedia.org/wiki/File:03-Pau-DevCamp-usability-testing.jpg" target="_blank" rel="noreferrer">Amire80 / 维基共享资源</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>。</figcaption>
</figure>

## 9. 访谈中的常见初学者错误

### 9.1 将访谈变成产品演示

如果你解释太多想法，对方会开始帮你，而不是告诉你真相。

### 9.2 只采访朋友

朋友不是没用的，但他们更可能鼓励你。你需要至少有一些更接近真实用户、情感投入较少的人。

### 9.3 过早询问功能

如果问题仍然不清楚，详细的特征问题通常意味着你过早进入解决方案模式。

### 9.4 将“我会用它”视为验证

面试可以帮助你判断方向，但面试并不是全部的验证步骤。真正的验证仍然取决于实际成本：时间、换班努力、试用行为或报酬。

### 9.5 没有整理你学到的东西

如果你事后不组织对话，印象很快就会变得模糊。尝试捕捉：

- 重复出现的问题
- 用使用者自己的表达的情感词汇
- 当前的变通方法
- 已支付费用
- 你更新的判决

<图形类=“场-图形”>
  <a href=“https://commons.wikimedia.org/wiki/File:Wikipedia-Affinity.jpg” target=“_blank” rel=“noreferrer”>
    <img src=“/images/product-discovery/mom-test/wikipedia-affinity-synthesis.jpg” alt=“维基百科可用性项目，将访谈和观察证据聚类成亲和图” loading =“懒惰” />
  </a>
  <figcaption><strong>访谈结束仅意味着原始材料已准备好。</strong>该亲和图来自维基媒体基金会的可用性项目。观察先被拆分为单独的证据片段，然后按重复主题聚类。这在访谈中形成了模式，而非每个人都需要该产品的印象。照片：Parul Vora / 维基媒体基金会，<a href=“https://creativecommons.org/licenses/by-sa/3.0/” target=“_blank” rel=“noreferrer”>CC BY-SA 3.0</a>。</figcaption>
</figure>

## 10.可重复使用的问题清单

如果你想快速开始，这套内容足够广泛，适合很多面试。

### 开场问题

- 这个问题上次发生是什么时候？
- 到底发生了什么？

### 行为问题

- 你是怎么处理的？
- 你为什么要那样做？

### 成本问题

- 这通常需要多少时间或精力？
- 你花钱解决过吗？

### 替代问题

- 你还尝试过哪些其他工具或方法？
- 你为什么停止使用它们？

### 结尾问题

- 如果这个问题再次出现，理想的解决方案会是什么感觉？

这在结尾时没问题，但不应该放在第一位。在对话的早期，你更需要事实而非愿望。

<a id=“妈妈-爱”></a>
## [11.利用人工智能准备和组织面试]（#top-mom）

妈妈测试仍是一种与真实人交流的方法，因此AI无法取代真实面试。但AI在面试前、面试中和面试后非常有用，尤其适合需要结构结构的初学者。

### 12.1 重写薄弱问题

很多人知道不该问“你怎么看我的想法？”，但他们还是会回到那种措辞。你可以先让AI重写你的草稿问题：

```text
Below are the questions I plan to ask in user interviews:
[paste your questions]

Please rewrite them using The Mom Test principles:
1. remove opinion-based questions
2. remove future hypothetical questions
3. turn them into questions about real past behavior, current alternatives, and real costs
4. organize the result into 8-10 interview questions I can actually use
```

一个非常初学者风格的输入也可以使用：

```text
I want to ask users:
1. What do you think of my AI resume tool?
2. Would you use it?
3. Would you pay for it?

Please turn these into better interview questions.
```

可能的 AI 输出：

```text
Rewritten questions:

1. When was the last time you edited your resume?
2. Why did you need to edit it?
3. How did you do it?
4. Which part took the most time?
5. Did you ask anyone else to review it?
6. Have you ever spent money or a lot of time solving this?
```

该输出很有用，因为它将寻求意见的问题转化为寻求行为的问题。

### 12.2 为不同用户类型创建不同的访谈指南

同样的问题对于不同的用户群体感受不同。学生、HR人员和资深同事通常关注工作流程的不同部分。AI 可以为每个群体生成单独的访谈指南。

例如：

```text
I want to talk to two groups:
1. college students applying for internships for the first time
2. seniors who have reviewed many resumes

Please create a 6-question interview guide for each group.
```

可能的人工智能输出：

```text
For students:
1. When was your last internship application?
2. What part felt hardest?
3. How do you judge whether your resume is ready?
...

For seniors:
1. When did you last review a junior's resume?
2. What common issues do you see most often?
3. Where do students usually get stuck?
...
```

这使得面试准备更容易，因为你不需要从零发明每一个问题。

### 12.3 将面试笔记分类为事实与意见

<figure class="field-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Volunteer_Molly_conducting_an_interview._Over_200_prospects_still_need_to_be_interviewed._Plus_the_park_needs_help_transcribing_(791cd068-1dd8-b71b-0b4d-48151192c96f).jpg" target="_blank" rel="noreferrer">
    <img src="/images/product-discovery/mom-test/oral-history-interview.jpg" alt="为美国国家公园管理局进行的面对面口述历史访谈，桌上有访谈指南、照片和笔记" loading="lazy" />
  </a>
  <figcaption><strong>综合分析必须与原始材料保持联系。</strong> 这次口述历史访谈同时使用了指南、历史照片和实地笔记。项目描述还指出，转录是使记录可用的关键步骤。人工智能可以协助转录和分类，但每一个结论都应可以追溯到参与者的原话。照片：美国国家公园管理局，公有领域。</figcaption>
</figure>

面试之后，问题通常不是“信息太少”，而是“信息过于分散”。人工智能擅长将混乱的笔记整理成结构化证据：

```text
Below are notes from 3 user interviews.
Please organize them using The Mom Test:
1. which parts are facts and which are opinions
2. what the user's last real behavior was
3. what the current workaround is
4. what time, money, or effort cost they have already paid
5. which problems show up repeatedly
6. which statements sound positive but have weak evidence
```

简单的初学者输入：

```text
Here are my notes from one interview:

- she said she would probably try such a tool
- last week she spent one full evening editing her resume
- she currently asks friends for feedback
- she is not sure when a resume is "good enough"

Please separate facts from opinions.
```

可能的人工智能输出：

```text
Opinion:
- she would probably try such a tool

Facts:
- she spent one full evening editing her resume
- she currently depends on friends for feedback
- she is not sure when the resume is good enough

Useful evidence:
- the problem happened recently
- she already paid a meaningful time cost
- the current workaround depends on other people
```

这尤其有用，因为它帮助初学者区分“听起来不错”和“支持真实决策”。

### 12.4 在面试前做一次轻量的网络搜索

在面试开始之前，AI 可以帮助进行一次轻量的外部扫描：

- 人们在公共社区中如何抱怨这个问题
- 哪些工具最常受到批评
- 人们是否已经在相关解决方案上花钱
- 已经存在哪些替代方案

示例提示：

```text
Please look up:
"What do students complain about most when editing resumes?"
Summarize the 5 most common complaints in simple language.
```

可能的 AI 输出：

```text
Common complaints:
1. I don't know what belongs on the resume
2. I have to rewrite it for every role and it is exhausting
3. I keep editing but still do not know if it is good enough
4. I do not have reliable feedback
5. I keep delaying because I never feel ready
```

这并不能取代真正的面试，但它可以帮助你以更好的起点来进入面试。

### 12.5 请求 AI 审查你的面试技巧

你也可以粘贴一份面试记录，并请求 AI 批评你的问答方式：

```text
Here is a transcript from one user interview.
Please review it using The Mom Test:
1. Which questions sound like I was seeking reassurance?
2. Which questions were leading?
3. Where should I have asked more about facts?
4. How could I ask this better next time?
```

这对初学者尤其有帮助，因为它训练了一个本能去问：

**我是在收集证据，还是只是收集鼓励？**

## 12. 总结

- 对产品创意的积极评价并不足以证明有需求。
- 访谈应优先关注具体的过去经历，而不是对未来行为的预测。
- 行为、时间、金钱和当前的替代方案是判断问题严重性的主要证据。
- AI 可以帮助准备指南和整理笔记，但无法替代真实的访谈。

## 13. 练习

<StageAssignmentCard title="在不推销你的创意的情况下进行用户访谈">

1. 写出你通常可能会问的 5 个无效访谈问题
2. 用《妈妈测试》的风格重写它们
3. 采访 3 位潜在用户，了解该问题上一次发生的情况
4. 将你的笔记分类为事实、解决方法、成本和重复出现的痛点

</StageAssignmentCard>

## 进一步阅读

- [《妈妈测试》官方网站](https://momtestbook.com/)
- [Rob Fitzpatrick: 《妈妈测试》](https://www.robfitz.com/the-mom-test/)

<style scoped>
.field-figure { margin: 24px 0 32px; overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.field-figure > a { display: block; background: #f4f4f1; }
.field-figure img { display: block; width: 100%; max-height: 520px; object-fit: contain; }
.field-figure figcaption { padding: 13px 16px 15px; border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-size: 13px; line-height: 1.75; }
.field-figure figcaption strong { color: var(--vp-c-text-1); }
@media (max-width: 640px) { .field-figure { margin: 20px 0 28px; } }
</style>