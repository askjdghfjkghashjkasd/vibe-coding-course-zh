---
标题：“亲自构建原型——从业务分析到多页产品原型实施”
描述：“体验从业务分析到多页产品原型实施的完整环节。学习如何提出业务问题，拆解需求，使用AI 集成开发环境生成单页和多页应用，并打磨和测试原型。”
---

<脚本设置>
从 '@theme/components/StageAssignmentCard.vue' 导入 StageAssignmentCard
从 '@theme/data/relatedArticles' 导入 { relatedArticlesMap }

周期时长 = “约<strong>8小时</strong>”
与文章相关的文章 =
  相关文章地图['en/stage-1/building-prototype'] ？？[]
</script>

# 初学者3：亲手制作原型

## 章节简介

<章节引言 :d uration=“duration” ：tags=“['业务分析'，'原型设计'，'AI辅助编码'，'多页应用']” coreOutput=“1个电子商务资产工作台原型” expectedOutput=“交互式网页原型”>

在上一章，我们学到了如何<strong>找到一个好点子</strong>——从用户需求出发，找到人们愿意付费的方向。但找到方向只是第一步。<strong>真正考验产品经理的是：如何将模糊的需求转化为可用的产品。</strong>

在本章中，我们解决了一个<strong>现实问题</strong>：你的老板突然对你说一句话：“利用人工智能提升向电商平台发布产品的效率。”你如何将其转化为<strong>可用的产品原型</strong>？

与构建蛇或计算器不同，<strong>真实的商业工作不能依赖想象中的特性</strong>：

1. <strong>澄清痛点</strong>：与运营部门沟通，挖掘隐藏在“提高效率”模糊词句背后的<strong>真正痛点</strong>
2. <strong>优先排序</strong>：在众多问题中，先解决<strong>最痛苦</strong>的，而不是试图一次性完成所有事情
3. <strong>快速验证</strong>：先用 AI 集成开发环境 构建<strong>单页原型</strong>;一旦成功，扩展为多个页面
4. <strong>交付可用的产品</strong>：最终交付<strong>一个可演示和操作的电子商务资产工作台</strong>

我们将学习从<strong>制造玩具转向开发应用</strong>的转变，并学会同<strong>理心并从真实客户需求出发思考</strong>。

</ChapterIntroduction>

::: 信息 备注
本章包含一些商业术语。如果你不理解其中一个，可以向人工智能寻求解释。
:::

<div style=“margin： 50px 0;”>
  <ClientOnly>
    <StepBar ：active=“0” ：items=“[ { 标题：”需求分析“，描述：”从模糊到具体“}， { 标题：”单页验证“，描述：”实现核心玩法“}， { 标题：”多页面扩展“，描述：”完整的应用结构“}， { 标题：”打磨与精炼“，说明：”提升用户体验“} ]” />
  </ClientOnly>
</div>

## 1.在编写代码前定义需求

在之前的教程中，我们用AI集成开发环境工具快速生成了蛇和小游戏。但这些只是玩具项目，对日常生活和工作没有直接帮助。如果我们希望AI能力真正创造价值，就应该将氛围编码与真实工作和生活场景结合起来。

在上一章中，我们学习了如何找到<strong>人们愿意为之付费的想法</strong>，但找到方向只是开始。在实际的产品工作中，你会意识到：<strong>“知道该做什么”和“知道如何去做”之间存在巨大的差距。</strong>

这个差距就是<strong>将需求具体化</strong>。

例如，在课堂或个人项目中，我们经常从最简单的可执行功能开始：

- “建立一个任务列表板。”
- “帮我建立一个绘图工具。”
- “帮我建立一款收集问卷的软件。”

这些往往只是工具或孤立的功能模块，有时甚至不是一个明确定义的商业问题。更重要的是，<strong>这些想法往往是“我认为这有用”，而不是“用户真正需要这个。”</strong>

在企业项目或初创项目中，产品经理和工程师通常从更大的业务目标出发。例如，假设这个场景：

<el-card shadow="hover" style="border-left: 5px solid #409EFF; background-color: #ecf5ff; margin: 20px 0;">
  <div style="font-weight: bold; color: #303133; margin-bottom: 10px;">🛍️ 业务场景：</div>
  <div style="color: #606266; line-height: 1.6;">
    <p>你是一家店铺的电商运营产品经理。你的老板给了你一个模糊但压力很大的任务：</p>
    <p style="font-style: italic; margin-top: 10px;">“所有人在公开渠道上都在用AI做图片和文案，看起来很容易。帮我们搭建这个，这样我们能更高效地在抖音电商上推出新产品。”</p>
  </div>
</el-card>

你可能会想：“老板，你又在做梦了。”然而在实际工作中，这种一句话的模糊指令非常常见。要成为一名有能力的专业人士（或者更好，成为早期创业公司的CEO），我们必须学会如何从构建个人工具转向构建真实的产品原型。

既然我们已经学习了AI 集成开发环境的使用，你可能会觉得这个需求很容易：给AI一个提示，让代理完成一切：

```text
Please refer to my requirement xxxx,
help me design an e-commerce asset workbench,
including generation and management of product descriptions, images, videos, and other assets.
```

如果你兴奋地把它直接转化成原型并发给你的老板——恭喜你，你的季度奖金可能会消失。

**为什么？这正是我们需要解决的核心痛点：**

以前，学习AI集成开发环境工具时，我们大多是为自己做**玩具项目**，比如Snake和计算器：简单功能、明确的个人目标，“适合我”就够了。但**真实的商业场景完全不同**：

- **你不是用户**：老板说“提高效率”，但你并不了解日常运营的实际运作方式，也不知道瓶颈在哪里。
- **AI也不了解你的业务**：如果你给AI一个模糊的要求，它只能从通用知识中猜测。结果看似合理，但实际上无法使用。
- **一个好点子不等同于一个好产品**：你可能觉得“添加AI生成”很酷，但用户可能不需要，或者这会带来更多摩擦。

**这就是为什么我们必须“从有想法到理解用户”学习。** 只有当你的想法真正解决了别人的问题，并且你提出问题并深入了解商业背景时，才能创造真正的价值。（一个好点子甚至比好技术更重要。）

### 1.1 从想象到现实：学会向企业提问

::: 信息 💡 先澄清一下：什么是要求？什么是业务？

**需求**是用户真正想要的：他们遇到并希望解决的问题。  
例如，“我的老板希望我更快推出产品”是必须的。

**业务**是用户每天实际做的事情：他们的运营工作流程。  
例如，日常电子商务运营任务包括推出产品、调整价格、制作图片、审查数据等。

**为什么要专注于商业？**  
如果你不了解业务，你可能会做出“看起来不错但没人用”的东西。只有当你了解用户的日常工作流程和瓶颈时，才能做出真正有用的产品。

:::

从最简单的角度，问问自己：

- 老板说“**提高效率**，具体是什么意思？**更快交付**？**降低成本**？**销售额更高**？
- 现在产品是怎么上市的？**当前流程在哪里出现问题**？
- 每天推出多少**新产品**？每个产品需要多少**图片**和多少**文本**？
- 当前工作流程中哪些任务是**最痛苦**且**最不受欢迎**的？

这些仍然是假设。我们需要直接问一线抖音电商从业者：“你们实际遇到的困难在哪里？你们最关心什么？”这能给出更准确的答案。

::: 信息 📋 真实商业面试结果

我们询问了电商运营商，听到了：

**1.太多，太支离破碎**
- 一个人管理多个商店，每个商店有许多产品
- 日常工作不断切换：**发布产品**、**变换价格**、**创建图片**和**检查数据**

**2.内容是迭代的，不是一次性的**
- 首先使用**厂商提供的图片**、**历史资源**或**参考截图**以快速启动
- 花一小笔预算测试并观察销售情况
- 只有**性能优异的产品**才会在图片设计、详情页和视频上投入大量资源

:::

在采访业务方后，我们可能会觉得，“现在我们可以构建完美的原型了。”但这仍然是错误的。如果我们试图一次满足所有需求，产品会变得庞大，无法在课程时间内完成。我们仍然需要缩小范围并优先解决核心痛点。

### 1.2 从发散到收敛：锁定核心痛点和功能

::: info 💡 为什么叫“收敛”？什么是“痛点”？

**问题很多，我们先解决哪个？**

用户可能列出许多问题：A痛，B痛，C痛。如果我们试图同时解决所有问题，可能一个都解决不好。所以我们必须**收敛**：优先选择**最痛、最紧迫、最可解决**的问题。

**什么是痛点？**
它是用户认为**最让人挫败、最耗时、最急需解决**的具体问题。不是“我觉得这个有用”，而是用户在实际工作中反复抱怨的问题。

:::

通过访谈，我们发现了许多问题：活动驱动的干扰、多店铺管理压力、上线/定价/创意/数据任务之间频繁切换。

如果我们尝试“全部解决”，最终会得到一个**大而不可用**的工具。

借助AI，我们可以将问题分为三组：

1. **节奏问题**：何时上线，何时调整价格
2. **效率问题**：如何同时管理多个店铺/产品
3. **内容问题**：如何快速生成产品图片和文案

对于本课程，最佳的首要目标是**第3组：内容创作**。但“快速制作内容”仍然范围广泛，所以我们询问他们具体卡在哪些环节：

::: info 📋 业务方表示内容有两个最大痛点

**痛点1：批量图片/文案制作非常耗力**
- 资产分散（云盘、聊天记录、后台），**难以找到**
- 多产品同时上线，无 **时间去逐个精细优化**
- 标准是实用的：**够用即可上线**，不追求完美设计

**痛点2：好的方法不可复用**
- 以前成功的标题/排版 **下次难以找到**
- 有用的方法散落在聊天记录和旧产品链接中
- 复用需要 **人工搜索 → 复制/粘贴 → 大量编辑**
- 缺少工具可 **直接保存、管理并应用模板**

:::

基于这两个痛点，我们定义了一个简单工具：**帮助运营批量生成图片和文案草稿，并保存好的模式以便下次直接复用**。

该工具只关注两大功能（随着业务反馈到来，你可以借助AI不断裁剪功能）：

::: info 功能1：批量生成电商产品图片与文案

**它能做什么？**
根据产品信息，系统自动生成可用于抖音、淘宝等平台的产品图片和文字。

**输入**
| 类型 | 内容 |
|------|------|
| 产品数据 | 名称、类别、品牌、材质、尺寸、颜色、目标用户等 |
| 产品图片 | 白底图或简单场景图 |
| 参考素材 | 以前成功产品的截图/链接 |
| 导入方式 | Excel批量导入或直接表单输入/上传 |

**输出（生成的商品素材）**
- **主图**：带核心卖点的可展示图片草稿
- **产品标题**：适合搜索的关键词结构化标题
- **卖点文案**：吸引购买者的1-2句文案
- 所有输出应为**可直接上线或轻微修改即可使用**

**工作流程影响**
- 之前：每个产品的创意工作都从零开始
- 之后：提交一批，获取草稿，再筛选和微调

:::

::: info 功能 2：将有效输出保存为可复用模板

**输入**
| 类型 | 内容 |
|------|------|
| 完整套装 | 主图   标题   卖点文案 |

**输出**
| 功能 | 描述 |
|------|------|
| 应用 | 将已保存的模板用于新产品生成 |
| 编辑 | 直接编辑标题或文案 |
| 管理 | 为模板命名和打标签（例如“男包模板”、“活动标题”），以后可搜索 |

**工作流程影响**
1. 导入新产品
2. 选择默认生成或**应用已保存模板**
3. 系统应用模板风格并输出新的图片和文案草稿

:::

---

**我们刚刚做了什么？**

1. **首先询问**：不是立即编码，而是询问操作者最痛的点
2. **找到核心痛点**：“图片/文案制作太费力”和“好的模式无法复用”
3. **收敛范围**：不是构建庞大的平台；先实现两个核心功能

**为什么这很重要**

初学者的陷阱是“功能越多越好”。实际上，用户首先需要你解决**最痛的问题**。许多弱功能不如几个真正有效的功能有价值。

**核心产品/业务思维**
- 不要从假设出发做决定
- 询问用户日常操作以及最痛的点
- 收敛到最痛且可解决的点
- 首先构建**最小可用版本**，然后迭代

在编码之前，这些必须清楚。代码只是工具；**理解用户并锁定正确问题**是第一步。

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: '需求分析', description: '从模糊到具体' },
      { title: '单页验证', description: '实现核心玩法' },
      { title: '多页扩展', description: '完成应用结构' },
      { title: '打磨优化', description: '提升用户体验' }
    ]" />
  </ClientOnly>
</div>

## 2. 在 10 分钟内构建原型：让 AI 集成开发环境 实现核心玩法

::: info 💡 工具说明
AI 集成开发环境 的接口、可用模型和配额持续变化。选择一个你能稳定使用的工具；本章的流程——描述需求、生成、检查和修改——不依赖于特定品牌。如果你需要命令行编码工具，请参见 [现代 AI CLI 工具](../../stage-2/backend/modern-cli/)。
:::

思考是好的，但避免过度思考。我们从一页开始，先构建一个原型。

### 2.1 步骤 1：用通俗语言告诉 AI 你的需求

一开始，不要追求完美的提示词。用你自然的描述开始。像对队友讲述目标一样向 AI 说明，然后让 AI 帮助将其优化为更清晰的语言。

#### 2.1.1 从口语化描述开始（推荐给初学者）

用自己的话描述你的想法。粗略也没关系：

```text
I want to build a tool that helps e-commerce operators automatically generate product main images and copy.
Operators currently make images and copy one by one manually, which is painful.
My idea: they upload product info, and the system generates a batch of drafts.
Operators pick useful ones and make light edits.

Start with the simplest version: one page. Input area on the left,
generated results on the right. Support image upload and text fields.
After generation, show main image preview and copy.
```

然后将此发送给 AI（ChatGPT、Claude 等），并要求它扩展和组织内容。AI 通常会补充你可能遗漏的细节，并生成一个更好的 AI 集成开发环境 提示。

你可以这样提问：

```text
Please expand the idea above into a clear business-logic document,
then generate a prompt suitable for an AI IDE (for example Cursor or Trae)
to generate a single-page prototype application.
```

AI 将返回一个结构化的需求和提示。请审查它，删除不必要的功能，确认它，然后用它进行代码生成。

为什么这有效：你口头描述的内容捕捉了你的真实意图，但可能会遗漏关键细节。AI 扩展可以提出诸如“你需要批量上传吗？”的问题，这有助于验证。通过添加或删除功能不断完善，直到你的第一个可用提示稳定。

#### 2.1.2 跳过扩展：直接给 AI 你的有组织的业务文档

如果你的业务逻辑文档已经准备好（例如来自前面的章节），你可以使用结构化格式将其直接输入到 AI 集成开发环境 中。当需求已经明确且你希望快速推进时，这种方式很适合。

```text
Please implement a single-page app based on the business logic below
to validate the core gameplay.

Business logic:
1. Help operations batch-generate first-round image+copy drafts:
- **Input (support direct upload and batch import):**
  - Product fields: name, category, brand, material, size, color, target users, etc.
  - Product image: white background image / simple scene image
  - Per generation, support additional uploads of historical bestseller screenshots or reference links
  - Support Excel batch import or direct online input/upload
  - Support an option to save product assets to an asset library for later use
- **Output (usable for listing with no or light edits):**
  - For each product, one "acceptable, basic-selling-point" main-image draft
  - One "well-structured, keyword-containing" title + 1-2 selling-point lines
- **Expected workflow change:**
  Move from writing every product from scratch to dropping batches into the system and selecting/fine-tuning generated drafts.

First implement feature 1. Feature 2 (template library) can be added later.
```

#### 2.1.3 高级方法：让 AI 为你的编码代理写“提示”

如果你想对代码生成有更精细的控制，先让 AI 生成一个编码代理提示：

```text
Based on the idea below, write a coding-agent prompt for me.
I will use it to generate code.

[paste your business logic here]

Requirements:
1. Include a clear page layout description
2. Define data structures and interaction logic
3. Specify the tech stack (for example React + Tailwind)
4. List core features to implement
```

AI通常会输出类似这样的结构化提示：
![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-25-56.webp）

然后你可以做一些小修改，然后传入你的 AI 集成开发环境。

### 2.2 步骤2：让AI集成开发环境直接生成代码

#### 2.2.1 准备：理解基本的AI 集成开发环境操作

如果你还不熟悉 AI 集成开发环境（Cursor、Trae、Windsurf 等），请先阅读附录：[IDE 基础]（/en/appendix/2-development-tools/ide-basics）。学习：

- 如何创建新项目
- 如何与人工智能代理聊天
- 如何理解AI生成的代码流程

#### 2.2.2 开始生成代码

现在你已经有了初始提示。以第一个提示样式为例，让AI帮助生成项目。创建/打开一个文件夹并初始化一个新项目：


在侧边栏，选择你喜欢的模型（例如Gemini、GPT、GLM、Kimi、MiniMax），然后粘贴第一步的提示：


生成开始后，AI会规划文件夹结构，创建所需文件，并填充初始代码。

::: 警告 ⚠️ 重要：AI可能会暂停等待您的确认
在生成过程中，AI代理经常**停止等待你的输入**，例如：
- 询问是否继续
- 要求你按回车确认
- 请求技术选择

**如果AI看起来闲置，先查看聊天面板，看看它是否在等你。**  
许多初学者认为人工智能是在“思考”，但实际上它是暂停等待输入的。
:::

别忘了按回车确认（有些IDE的行为不同）：


如果你遇到下面的界面，通常意味着本地服务已经开始。如有需要，点击跳过，否则你可能会被困在那里。（如果生成完成但没有预览，请直接向 AI 询问：“请启动此项目。”）


::: 信息 💡 情景说明
**场景**：你使用 `npm create vite@latest` 初始化了一个 React TypeScript 项目（`easy-vibe-web`）。创建后，你的电脑启动本地 Web 服务，方便你立即预览。

**本地服务**：仅在你自己的机器上运行的临时网络服务。

**localhost**：意为“这台机器本身”。

**Port**：用于区分同一台机器上多个服务的ID（本项目使用端口5174）。

**链接 `http://localhost:5174/`**：在浏览器中打开此页面查看正在进行的项目。

**为什么是5174？** 5173可能已经有人了，所以Vite会自动切换到5174。这是正常的。

:::

确认后，稍等一下，你应该会看到初步结果：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-50-34.webp）

基础功能出现了，但界面很粗糙。现在直接和AI对话以提升视觉质量：


经过优化后，你可以得到更简洁的界面：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-05-16.webp）

然后按需求迭代，例如：

- “我现在不需要批量导入。删除它。”
- “左侧表格字段太多。只保留xxxx。”

你甚至可以让AI通过附上截图来引用已有的网站：


结果示例：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-15-18.webp）

### 2.3 错误发生时该怎么办

在实际操作中，错误是不可避免的。这是正常的，并不意味着你失败了。你不需要一次完全理解所有错误;你只需要给人工智能完整的观察到上下文。

常见的搬运模式：

- **情况1：页面或终端错误**
  如果页面变红、变黑，或者终端显示大量红色日志，截图或复制所有错误文本并发送给AI。

- **情况2：功能错误但未出现错误**
  比如按钮什么都不做，数据不显示，样式坏掉。用通俗的语言描述：“发生了什么”“我预期的”。如果需要，可以附上截图。

- **情况3：不确定是否存在问题**
  直接问 AI：“请检查此功能是否有明显问题，并建议是否需要调整。”

#### 2.3.1 常见初学者问题

- **Q：我不知道错误出在哪里**
  - A：找到终端/控制台/页面中的所有红色文本，全部复制，然后发送给AI。

- **Q：AI修复了，但错误依旧**
  - A：非常常见。再次发送最新的错误输出，并要求AI在之前的更改基础上继续修复。

- **Q：我需要立即完全理解修复吗**
  - 答：不会。每次专注于一两个点。理解是像词汇学习一样逐渐增长的。

- **Q：多次尝试后仍破损
  - A：试试这些：
    - 在聊天/历史中使用IDE版本回滚，恢复到已知的工作状态
    - 切换模型或提升提示的特殊性
    - 打包“当前代码错误记录预期行为”，并要求AI整体重构该部分

## 3.从单页扩展到多页应用

<div style=“margin： 50px 0;”>
  <ClientOnly>
    <StepBar ：active=“2” ：items=“[ { 标题：”需求分析“，描述：”从模糊到具体“}， { 标题：”单页验证“，描述：”实现核心玩法“}， { 标题：”多页面扩展“，描述：”完整的应用结构“}， { 标题：”打磨与精炼“，说明：”提升用户体验“} ]” />
  </ClientOnly>
</div>

一旦基本游戏逻辑大致生成，我们就可以继续构建剩余页面。例如，许多设置按钮可能仍然无效。

你可以让AI根据你的业务需求进行检查并生成缺失部分，或者直接让AI逐一实现未完成页面，直到所有页面交互都正常：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-17-55.webp）

稍等一会儿后，你可以看到在之前的基础上添加了多个页面和互动功能：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-40.webp）
![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-53.webp）

在这个阶段，手动点击你关心的密钥流并确认互动。如果某些内容不具交互性，请AI修正。

## 4.让原型感觉真实

<div style=“margin： 50px 0;”>
  <ClientOnly>
    <StepBar ：active=“3” ：items=“[ { 标题：”需求分析“，描述：”从模糊到具体“}， { 标题：”单页验证“，描述：”实现核心玩法“}， { 标题：”多页面扩展“，说明：”完整的应用结构“}， { 标题：”打磨与完善“，描述：”提升用户体验“ } ]” />
  </ClientOnly>
</div>

多页结构建立后，最后一步是从“运行”转变为“流畅且专业”。这意味着要从头到尾走遍整个用户流程，并请求AI修复任何故障，直到你作为新用户能从零开始刷新并运行完整流程。

让我们重新审视最初的要求：

```text
1. Help operations batch-generate first-round image+copy drafts:
- **Input (supports direct upload and batch import):**
  - Product basic data: name, category, brand, material, size, color, target audience, etc.
  - Product image: white background / simple scene image
  - Per generation, support extra upload of historical bestseller screenshots or reference links
  - Support Excel batch import or online entry/upload
  - Support a page option for saving product assets to asset library for future use
- **Output (directly listable or listable with light edits):**
  - For each product, one "presentable image draft with basic selling points"
  - One "well-structured, keyword-rich title" + 1-2 selling-point lines
- **Expected workflow change:**
  Move from creating every batch from scratch to dropping batches into the system, then filtering and fine-tuning generated drafts.

2. Turn useful output into a reusable template library:
- **What can be saved?**
  - Any output judged "useful" by operations can be saved in one click:
    - full combo: main image + title + selling points
    - partial save: for example title pattern only or copy snippet only
- **What can you do after saving?**
  - **Reuse:**
    - apply saved template to a new product batch
    - or generate multiple variants on same product for A/B testing
  - **Edit:**
    - edit title/copy directly
    - if image editing is supported, adjust text/stickers on main image
  - **Manage:**
    - name and tag collections (for example "men bag main image template", "campaign title structure"), and optionally categorize by store
- **How to use on next launch?**
  - after importing new products, operations can choose:
    - default system generation, or
    - "generate using my saved template"
  - system applies template structure/style to new product data and outputs new main image + title + selling-point drafts
```

如果每次测试都需要从零手动设置，测试就会变得昂贵。实际上，我们经常创建**测试数据入口点**来加速完整流程测试。你可以向 AI 询问：

```text
I need to test the full user journey and ensure everything works end to end.
Please generate test-data shortcuts based on the requirement below so I can quickly validate the entire flow:
1. Help operations batch-generate first-round image+copy drafts:
- **Input (supports direct upload and batch import):**
  - Product basic data: name, category, brand, material, size, color, target audience, etc.
  - Product image: white background / simple scene image
  - Per generation, support extra upload of historical bestseller screenshots or reference links
  - Support Excel batch import or online entry/upload
  - Support a page option for saving product assets to asset library for future use
- **Output (directly listable or listable with light edits):**
  - For each product, one "presentable image draft with basic selling points"
  - One "well-structured, keyword-rich title" + 1-2 selling-point lines
- **Expected workflow change:**
  Move from creating every batch from scratch to dropping batches into the system, then filtering and fine-tuning generated drafts.
```

你可以快速获得可用的结果（如果一个案例不够，可以让AI生成多个测试用例）：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-30-30.webp）

点击测试：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-31-23.webp）

此时，结果可能立即出现，无需模拟生成过程。如果你想要真实的延迟/反馈，可以问问AI：

“请模拟真实生成过程，点击后会在短暂延迟后显示结果。”

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-50-05.webp）

生成流程完成后，验证模板库的行为。如果缺少“保存模板”交互，请询问AI：

“请确保需求2正确：我可以将生成的结果保存为模板，打开并查看生成参数。”

生成通常是迭代的，且通常需要截图以便修正：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-57-14.webp）

预期最终结果：

![]（/zh-cn/stage-1/building-prototype/images/index-2026-01-14-16-12-56.webp）

除了手动用户流程测试外，你还可以让AI进行需求覆盖检查：

- “将此应用与我最初的要求进行比较。所有核心功能都涵盖了吗？”
- “给我一份清单：已完成、缺失和经验较弱的部分。”

AI通常会返回一个清单。用它来决定是否继续迭代。经过几轮后，你可以得到更强大的原型。

## 5.📚 作业：重现你自己的抖音电商工作台

<StageAssignmentCard 标题=“完成你的电商内容工作台”>

<p>
    按照本章的方法，完成一个完整的循环：
  </p>

  <ul>
    <li>
      <strong>全环练习</strong>
      <ul>
        <li>业务需求提示生成→单页原型生成→多页原型生成</li>
      </ul>
    </li>
    <li>
      <strong>分享你的结果</strong>
      <ul>
        <li>截取你的申请截图并分享给所有人</li>
      </ul>
    </li>
    <li>
      <strong>思考问题</strong>
      <ul>
        <li>请预留空间到下一章（“集成大型语言模型与文本转图像能力”）。提前思考：你的工作台如何嵌入AI文案写作、图片生成和脚本生成？</li>
      </ul>
    </li>
  </ul>

</StageAssignmentCard>

## 下一步

在下一章中，在这个内容生产工作台之上，我们将整合具体的人工智能能力（文本对文本、图像对文本、文本到图像），例如：

- 自动生成首稿文案及多个标题候选，针对特定内容任务
- 从任务描述自动生成视觉草稿（文本转图像）
- 自动分类和总结历史任务，帮助规划下一轮活动主题

<RelatedArticlesSection title=“继续学习” 描述=“推荐顺序：集成AI能力 ->完成完整项目循环 ->设计工程。” ：items=“relatedArticles” />