---
title: '初学者 1：在 AI 时代，会说话就是会编程'
description: '通过对话构建一个 AI 原生的贪吃蛇游戏，然后将工作流程泛化，创建你自己的迷你游戏或演示。'
---

# 第一单元 1：AI 时代，如果你会说话，你就会编程

这是一个**项目驱动学习**教程。我们鼓励你按步骤逐一操作，并尝试复现结果。
不要担心犯错或修改内容。我们始终相信你可以做到。请务必记住：

<div style="text-align: center;">
<div style="display: inline-block; padding: 8px 20px; border-radius: 8px; border: 1px dashed #FFB6C1; background: linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%); margin: 12px 0;">
  <span style="font-size: 15px; font-weight: 500; color: #666;">完成比完美更重要 🐣</span>
</div>
</div>

<script setup>
import StageAssignmentCard from '@theme/components/StageAssignmentCard.vue'
const duration = '大约 <strong>4 小时</strong>，可分多次完成'
</script>

## 章节大纲

<ChapterIntroduction :duration="duration" :tags="['对话式 AI 编程', 'AI 原生迷你游戏', '贪吃蛇游戏练习']" coreOutput="AI 原生贪吃蛇 自定义迷你游戏" expectedOutput="1 个可玩的 AI 原生贪吃蛇游戏 （可选）1 个自定义 AI 原生迷你游戏或演示">

如果你<strong>完全不会编程</strong>，或者只懂基础知识，本章节适合你。我们将从最基础开始：通过<strong>对话</strong>让 AI 为你编写代码，无需记忆语法或搭建环境。它可以直接在浏览器中运行。

你将亲自创建<strong>你的第一个可运行程序</strong>——一个可以“吃文字、写诗、画画”的贪吃蛇游戏。通过这个实践，你将体验到 AI 编程的真正含义：AI 并不是取代你的思考，而是当你表达你的想法时，AI 帮助你实现它。

所有创造都是从 0 到 1 开始的。我们很高兴将每一点信心和专业传递给你。对于你而言，<strong>执行就是全部</strong>。

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: '困境与机会', description: '编程的新可能' },
      { title: '能力探索', description: '60 秒快速开发' },
      { title: '原生实践', description: '构建 AI 原生贪吃蛇' },
      { title: '扩展创作', description: '创建其他游戏' }
    ]" />
  </ClientOnly>
</div>

## 1. 普通人的困境与机会

许多人脑海里有一堆产品想法：一个帮助管理财务的小工具，一个记录孩子成长的网页，或者一个迷你游戏。但想到需要写代码或找程序员，往往会直接让他们望而却步。

AI 出现后，普通人第一次有了全新的可能性：你无需会写代码，只需学习如何清晰地告诉 AI 你想要什么。[GitHub Copilot 数据](https://www.wearetenet.com/blog/github-copilot-usage-data-statistics)显示，超过 1500 万开发者正在使用 AI 辅助编程，平均有 46% 的代码由 AI 生成！在 Java 项目中，这一比例可达 61%。

<el-card shadow=“hover” style=“margin： 20px 0; border-radius： 12px;”>
  <模板 #header>
    <div style=“display： flex;align-items： center; gap： 8px;”>
      <span style=“font-size： 20px;”> 🚀</span>
      <span style=“font-weight：加粗;font-size：16px;”>效率与采用率飞跃</span>
    </div>
  </template>
  
  <el-row ：gutter=“20” style=“margin-bottom： 24px;”>
    <el-col ：span=“6” ：xs=“12”>
      <div style=“text-align： center;padding： 10px;”>
        <div style=“color： #409EFF;font-size： 24px;font-weight： blo;”>55%</div>
        <div style=“color： #909399; font-size： 12px; margin-top： 4px;”>速度提升</div>
      </div>
    </el-col>
    <el-col ：span=“6” ：xs=“12”>
      <div style=“text-align： center;padding： 10px;”>
        <div style=“color： #67C23A; font-size： 24px; font-weight： blan;”>2.4 <span style=“font-size： 14px;”>Days</span></div>
        <div style=“color： #909399; font-size： 12px; margin-top： 4px;”>任务时间（9.6版本起）</div>
      </div>
    </el-col>
    <el-col ：span=“6” ：xs=“12”>
      <div style=“text-align： center;padding： 10px;”>
        <div style=“color： #E6A23C; font-size： 24px; font-weight： borgan;”>81%</div>
        <div style=“color： #909399; font-size： 12px; margin-top： 4px;”>第一天安装率</div>
      </div>
    </el-col>
    <el-col ：span=“6” ：xs=“12”>
      <div style=“text-align： center;padding： 10px;”>
        <div style=“color： #F56C6C; font-size： 24px; font-weight： blod;”>96%</div>
        <div style=“color： #909399; font-size： 12px; margin-top： 4px;”>建议采用</div>
      </div>
    </el-col>
  </el-row>

  <div style=“行高：1.8;color： #606266;”>
    真正令人兴奋的是效率的飞跃：开发者的任务完成速度提升了<b>55%。</b>原本需要9.6天交付的代码，现在只需<b>2.4天</b>即可完成。这一明显的提升表明，AI不再只是“可选功能”，而是成为开发流程中不可或缺的助手。采用率数据也证实了这一点：在获准访问当天，<b>81%</b>的开发者安装并立即开始使用;其中<b>96%</b>的开发者当天就开始采纳AI的代码建议。换句话说，开发者几乎瞬间将AI融入了他们的日常编码流程。
  </div>
</el-card>

对普通人来说，这一趋势更为重要：如果专业程序员大量依赖人工智能写代码，**为什么我们这些不会编程的人不能直接与AI沟通，实现我们的想法**？

本课程的目标是帮助你练习一项新技能：通过自然语言对话构建应用。我们将教你如何用计算机语言与人工智能交流，以及如何让人工智能将你脑中的想法转化为真实可用的产品。

<div style=“margin： 50px 0;”>
  <ClientOnly>
    <StepBar ：active=“1” ：items=“[ { 标题：”困境与机遇“，描述：”新可能性“}， { 标题：”能力探索“，描述：”60秒速度“ }， { 标题：”原生实践“，描述：”构建AI原生蛇“}， { 标题：”扩展创作“，描述：”创建其他游戏“} ]” />
  </ClientOnly>
</div>

## 2.人工智能能在多大程度上帮助你？

在本节中，我们只讨论一个问题：如果你完全不会写代码，今天的人工智能能在多大程度上帮助你？

大致来说，你可以这样理解当前大型语言模型（LLM）的能力：能够胜任开发**简单的内部工具**、**数据可视化仪表盘**以及一些**轻量级小型游戏**。这些通常足够用于制作**个人使用的工具**或从**产品经理的视角**验证需求。但要想一键生成一个**商业成熟的产品**，通常仍需要对**流程设计**和**细节**进行手动且持续的打磨。

接下来，我们以贪吃蛇为例，看看 AI 编程究竟能实现什么。

### 2.1 在 60 秒内构建贪吃蛇游戏

首先，请打开课程中使用的实验网站 [z.ai](https://chat.z.ai/)。`z.ai` 是由知谱 AI（中国领先的 LLM 公司之一）开发的 AI 平台，基于其自主 GLM 模型。该平台包含多种功能，如幻灯片生成、海报设计以及全栈开发。在本教程中，我们将重点关注其全栈开发模块。

::: details 💡 什么是“在网页上编程”的范式？

过去，开发 web 应用需要：
- 安装编程环境（Node.js、Python 等）
- 配置代码编辑器
- 学习 HTML/CSS/JavaScript
- 处理依赖和错误

现在，有了 AI 编程平台，你只需：
- 打开浏览器并访问网站
- 用自然语言描述你想要的功能
- 让 AI 即刻生成代码并实时预览结果

这种“对话式编程”的范式，将编码从“编写指令”转变为“描述需求”。你无需关心底层技术细节，只需清晰地说明你的需求。这是 AI 时代的新编程范式——**氛围编程**。
:::

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-25-03.webp)

输入我们的简单需求并点击**全栈开发**按钮。你可以实时观看网页的构建过程。通常，这仅需要冲泡一杯咖啡的时间！

```
Help me create a Snake game:
1. Control snake movement with arrow keys
2. When it eats food, it gets longer and the score increases
3. Hitting walls or itself results in Game Over
4. Include Start and Restart buttons
5. The UI should be clean and elegant
```

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-34-03.webp）

生成后，你会在右侧看到一个可浏览的网页界面。滚动或点击🧭顶部按钮即可全屏查看。

> 从左到右的按钮是：箭头按钮展开聊天历史，铅笔按钮启动新聊天，刷新图标重建页面，指南针图标切换全屏，下载按钮下载项目，<>按钮查看代码，发布按钮发布。

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-35-11.webp）

如果您想查看网页的源代码，请点击右上角的代码图标查看整个代码库。

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image7.png）

::: 提示 🌐 探索更多AI编程工具

除了 z.ai，我们还推荐尝试以下优秀的AI编程平台：

|工具 |链接 |功能 |
|------|------|----------|
|**Kimi代码** |[kimi.com/code/console]（https://kimi.com/code/console） |Moonshot AI 的 AI 编码助手，提供基于终端的 Kimi Code CLI 和 VS Code 扩展，基于专门的 Kimi K2.7 代码模型，兼容 Claude Code、Roo Code 及其他工具 |
|**Google AI Studio**（推荐）|[aistudio.google.com/apps]（https://aistudio.google.com/apps） |谷歌官方工具，由Gemini支持，非常适合快速原型制作 |
|**Figma Make**[figma.com/make]（https://www.figma.com/make） |深度集成设计工具，非常适合互动原型 |
|**Coze** |[coze.com]（https://www.coze.cn）|字节跳动的AI机器人平台，零代码视觉构建 |
|**v0.dev** |[v0.dev]（https://v0.dev） |Vercel 的 React 组件 AI 生成 |
|**Bolt.new** |[bolt.new]（https://bolt.new） |能够生成已部署应用的AI全栈开发 |
|**可爱**[lovable.dev]（https://lovable.dev） |高质量的React应用生成 |
|**Replit 智能体**|[replit.com]（https://replit.com） |集成AI的在线IDE |

欲了解更多比较，请参见附录：[7个AI编程工具比较]（../../stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial.md）
:::

### 2.2 对话式编程能做什么，不能做什么

本节聚焦于一个具体问题：当完全依赖对话式人工智能且完全不写代码时，项目能推到多远？
就经验而言，一个相当一致的结论是：它可以帮助你完成“小而完整”的项目，但判断“多少才算足够”仍需你在每一步细节上做出个人决定。

#### 擅长“小巧清晰”的应用

从蛇类游戏的例子来看，你已经看到了一个典型的模式：
只要你能清晰描述界面和交互，AI通常能在几轮对话内拼凑出一个功能完整、可点击的网页。

这类任务通常具有几个共同特征：

- 清晰范围：一页，一个简单的内部工具，一个小型游戏机制。
- 可见效果：你能立即看到它是否如预期般工作。
- 直接调试：您可以轻松指出错误并请求纠正。

在这些框架内，你可以把AI看作一个能力极强的“初级助手”。

**人工智能处理小规模任务的成功率：**
<el-progress :p ercentage=“90” ：stroke-width=“15” status=“success” 条纹-条纹-flow />

#### 大型项目需要“流程视角”

一旦超出小范围和明确范围，单靠对话式请求构建复杂系统端到端，很快就会遇到天花板。大型项目涉及后端数据库、第三方服务、认证、权限、边缘案例、状态管理等。

在这种情况下，合乎逻辑的做法是定义清晰的流程图，并将其拆分成单独处理的部分。

#### 生成与验证的区别

仅仅因为AI写了它，并不意味着它已经准备好商业发布！一定要验证AI生成的代码，尤其是在安全系统中。

::: 警告 ⚠️ 使用指南
- **原型/工具/演示**：非常适合早期构建迭代。
- **面向消费者的大型产品**：通常需要开发者来做架构。
- **高安全系统**：不适合立即部署。需要严格的检查。
:::

<div style=“margin： 50px 0;”>
  <ClientOnly>
    <StepBar ：active=“2” ：items=“[ { 标题：”两难“，描述：”新可能性“}， { 标题：”基础能力“，描述：”60秒速度“ }， { 标题：”原生练习“，描述：”构建AI原生蛇“}， { 标题：”扩展版“，描述：”创建其他游戏“ } ]” />
  </ClientOnly>
</div>

## 3.亲手操作：你的第一个AI原生应用

让我们动手操作。我们会在游戏中加入一些原生的AI集成元素。

### 3.1 AI原生蛇

你只需提供以下提示：

> ** 💡 示例提示：** 帮我做一个蛇类游戏。
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image12.webp）

> ** 💡 示例提示：** 帮我做一个支持以下内容的蛇类游戏：
> 1.吃不同的单词并把它们放进收集箱里。
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image13.webp）

> ** 💡 示例提示：** 构建一个支持以下条件的蛇类游戏：
> 1.我能吃下盒子里收集的独特词汇。
> 2.当吃下8个单词时，LLM会用它们生成一首诗。
> 3.诗歌创作后立即调用图像生成API。
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image14.webp）

如果遇到问题，只需截图错误或告诉机器人问题所在，它会不断迭代修改。

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image15.webp）

### 3.2 为游戏添加新功能

完成基本功能后，我们可以尝试为程序添加一些新变化！如果你觉得蛇吃词或角色的过程有点无聊，可以让蛇吃不同颜色的词，并相应改变蛇的颜色。

你还可以在“吃东西”过程中添加特殊效果，或者引入触发特殊效果的魔法词汇——比如增加蛇的速度或体型。另一个想法是让模型每次吃一个词时生成一首诗和一幅图片，而不是等到吃八个。

如果这些题目有挑战性，你可以直接向语言模型求助！它能提供创意建议，让你的游戏更有趣。试试看吧！

```
1. "Word Unlocks World" Mechanic
   Feature: After the snake eats a word, the image model instantly generates a small artwork for that word, gradually piecing together a unique panorama created by the player—painting and "writing poetry" as you play.

2. "Poetry Puzzle" Gameplay
   Feature: Each word the snake eats triggers the LLM to generate a line of poetry and the image model to generate an illustration, which combine like puzzle pieces into an AI-collaborative poem and painting at the end of the round.

3. "Magic Words" & "Story Branches"
   Feature: Eating magic words like "wind", "night", or "dream" makes the LLM change the scene's theme, switching the image style to nighttime, stormy, or dreamlike atmospheres; the different words the player eats also keep the AI-generated story evolving.

4. "Real-time Interactive Generation"
   Feature: Each word eaten makes the LLM generate a line of dialogue or description, so NPCs in the game can "speak" and the environment changes accordingly; the snake's appearance and obstacles also change based on the words eaten.

5. "Sentence Snake" Challenge
   Feature: Reverse mode—the LLM gives a line of poetry or a riddle, and the player guides the snake to eat words in order to reconstruct the sentence; eating the wrong word triggers the image model to generate funny, artistic consequences.

6. "Themed Levels" & "Style Selection"
   Feature: At the start of the game, the player chooses a theme (e.g., "fairy tale", "sci-fi", "Tang poetry"), and the LLM and image model adjust the words, poetic style, and visuals to match, making every run feel fresh.

7. "Live Co-creation"
   Feature: When a special word is eaten, the LLM prompts the player to input a phrase or choose a style, then generates matching verses and illustrations, making it a true human-AI co-creation.

8. "A Growing Story"
   Feature: As the snake keeps growing, the LLM continues writing the story-poem, and the image model generates a long panoramic scroll, letting the player experience "writing, painting, and playing" all at once.
```

此外，我们还可以直接让大型语言模型（LLM）为你生成项目级提示。在上一节中，我们只是自己编写了贪吃蛇游戏的提示。现在，让我们尝试让LLM生成一个包含整体框架和实现路径的提示（你可以直接使用 z.ai 生成）。

如果你想学习如何编写更好的提示，请查看 [提示工程附录](/en/appendix/8-artificial-intelligence/prompt-engineering)。

> 我希望AI生成一个基于网页的贪吃蛇游戏，并且需要一个更完整的提示，让结果更出色、有趣。请生成相应的提示。当前目标是：生成一个具有吃不同单词生成诗歌功能的贪吃蛇游戏，同时应包含图像生成模块。

z.ai 的回应会是这样的：

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image56.webp)

我们可以使用这个提示以全栈开发模式重新生成项目：

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image57.webp)

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image58.webp)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: '困境', description: '新的可能性' },
      { title: '基础能力', description: '60秒速度' },
      { title: '原生实践', description: '构建AI原生贪吃蛇' },
      { title: '扩展', description: '创建其他游戏' }
    ]" />
  </ClientOnly>
</div>

### 3.3 尝试制作其他小游戏

除了贪吃蛇，我们还可以尽情发挥想象力。

创建任何我们想创建的东西，甚至尝试搞乱一切！然后重新开始！

1. AI 艺术画廊平台：帮我建立一个在线画廊，用户可以上传、浏览、点赞和评论 AI 生成的艺术作品，支持按类别浏览。
2. 复古游戏档案馆：帮我建立一个致敬经典游戏的网站，展示游戏历史、玩法指南，并提供一些可以直接在线玩的经典复古小游戏。
3. 可持续生活追踪器：帮我建立一个碳足迹追踪工具，用户填写日常活动即可获得自动碳排放估算，并提供环保小贴士和每周挑战。
4. 虚拟厨房助手：帮我建立一个 AI 烹饪助手，用户输入家里的食材即可获得食谱推荐及逐步烹饪指导。
5. 地下音乐发现平台：帮我建立一个音乐流媒体网站，突出独立和新兴艺术家，支持播放列表创建和社区评论。
6. 极简任务管理系统：帮我建立一个极简任务管理工具，支持创建任务、设置优先级、拖放排序以及查看完成进度。
7. 科幻写作工作坊：帮我建立一个科幻写作平台，提供世界观模板、角色档案卡和故事大纲工具，帮助作者构建其故事设定。
8. 个人知识图谱：帮我建立一个可视化笔记工具，将零散想法变成节点，并将相关内容连接成知识网络。
9. 虚拟植物园：帮我建立一个植物百科网站，展示各种植物的插画资料，用户还可以种植自己的虚拟植物并观察其生长。
10. 编程挑战竞技场：帮我建立一个在线编程比赛平台，提供不同难度的算法题、在线代码编辑器、自动评测和排行榜。

如果你喜欢玩游戏，我们也可以一起尝试制作游戏！

1. 3D开放世界RPG：帮我打造一款自由探索的3D开放世界游戏，拥有昼夜循环、动态天气、任务系统和角色成长。
2. 第一人称射击（FPS）竞技场：帮我打造一款节奏快速的多人FPS游戏，支持团队死斗、夺旗、多种游戏模式和多张地图。
3. AI国际象棋与多人游戏：帮我搭建一个国际象棋平台，既能在不同难度下与AI对弈，也能在线与真实玩家对战。
4. 麻将在线多人游戏：帮我打造一款支持多规则、私人房间和自动计分的传统麻将游戏。
5. 回合制策略游戏：帮我打造一款基于网格地图的回合制策略游戏，包含单位移动、攻击、升级和战争迷雾。
6. 计时赛游戏：帮我打造一款以计时赛玩法为核心的3D赛车游戏，支持多赛道、车辆自定义和幽灵回放。
7. 卡牌对战游戏（构筑卡组）：帮我打造一款卡牌对战游戏，玩家可以收集卡牌、自由组建卡组并参加排位赛。
8. 大逃杀（俯视角2D）：帮我打造一款俯视角2D大逃杀游戏，包含缩小区域、随机战利品和单人/小队模式。
9. 恐怖生存游戏（第一人称）：帮我打造一款以资源管理、潜行避开敌人和寻找逃脱方法为核心的第一人称恐怖生存游戏。
10. 音乐节奏游戏（3D）：帮我打造一款3D音乐节奏游戏，音符从远处飞来，配合音乐节拍，玩家在恰当时机击中音符得分。

### 3.4 网络精选案例：别人用AI构建了什么

此时你可能还在想：Snake只是个入门例子——AI真的能做出更复杂的游戏吗？

答案是肯定的。以下是**8**个来自网络各处精心策划的真实案例——从经典街机游戏合集和2048风格谜题，到《我的世界》和《超级马里奥》的重现，甚至还有中国LLM Kimi制作的3D游戏和官方游戏平台。其中一些开发者是专业程序员，另一些则完全没有编程经验，但他们有一个共同点：**他们让AI通过对话编写了大部分代码**。

#### 🕹️ 案例1：10款经典街机游戏在一个下午重现（WotAI Games）

[WotAI游戏]（https://games.wotai.co/）是一组完全用Claude代码（氛围编程）从零开始构建的浏览器游戏合集，**没有使用任何游戏引擎**。通过对话，他们让AI一次性重现了10款经典街机游戏：吃豆人、俄罗斯方块、太空侵略者、蛇蛇、飞翔鸟、突破、银河战士、青蛙过河、涂鸦跳和数独。每款游戏都可以直接在线游玩，甚至内置排行榜系统。

![WotAI Games 主页——10款经典街机游戏合集](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-wotai-games.webp）

![俄罗斯方块（WotAI 游戏，使用 Vibe 代码生成）](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-wotai-tetris.png）

![吃豆人（WotAI Games，用氛围编程生成）](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-wotai-pacman.webp）

> 🔗 在线游玩：[games.wotai.co]（https://games.wotai.co/） | 开发者回顾：[我们用Claude代码vibe Code了10款经典街机游戏]（https://wotai.co/blog/wotai-games-vibe-coded-arcade-classics）

#### 🌸 案例2：一个完全的新手在2小时内完成了一款2048风格的游戏（Blooming Garden）

日本开发者[in0ho1no]（https://github.com/in0ho1no），对编程一无所知，却用纯粹对话（氛围编程）用Claude在**大约2小时**内打造了2048风格的“花园”游戏[Blooming Garden]（https://in0ho1no.github.io/2025-adhoc-blooming-garden/）：合并相同植物升级、华丽的开花效果、粒子动画、排行榜、音效、移动端改编......所有这些功能都是通过自然语言对话完成的，没有一行手写代码。

!【盛开花园植物匹配游戏（100% AI生成）](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-blooming-garden.webp）

> 🔗 在线游玩：[in0ho1no.github.io/2025-adhoc-blooming-garden]（https://in0ho1no.github.io/2025-adhoc-blooming-garden/） | 源代码：[github.com/in0ho1no/2025-adhoc-blooming-garden]（https://github.com/in0ho1no/2025-adhoc-blooming-garden）

#### 🌍 案例3：一位设计师利用人工智能构建了一款3D在线多人游戏（星球跳跃者）

设计师[Ricardo de Zoete（Hammy）]（https://x.com/RicardoDeZoete）利用OpenAI的AI通过纯对话（氛围编程）在three.js之上构建了[Planet Jumper]（https://gamesbyhammy.cloud/play/planetjumper）——一款**3D多人平台游戏**：在一个小型球形星球表面奔跑、冲刺和跳跃，在线上与陌生人在同一竞技场中竞争。远非简单的系统——球形重力、网络同步和跳跃感觉——都通过提示“聊天”诞生。

![Planet Jumper 3D多人平台游戏（用Vibe Codeing生成）](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-planet-jumper.webp）

> 🔗 在线游玩：[gamesbyhammy.cloud/play/planetjumper]（https://gamesbyhammy.cloud/play/planetjumper） | 详细介绍：[星球跳跃者：一款氛围编码的Three.js多人平台游戏]（https://www.webgpu.com/showcase/planet-jumper-threejs-multiplayer/）

#### 🎮 案例4：一个人用Vibe编程制作了100款浏览器游戏（2026年）

2026年7月，中国社区开发者[wangzifan396-wzf]（https://github.com/wangzifan396-wzf）开源了[mini-browser-games]（https://github.com/wangzifan396-wzf/mini-browser-games）——**由一人用氛围编程开发和持续打磨的100款浏览器小游戏**，全部为零依赖的单一HTML文件，只需双击即可运行。游戏玩法涵盖动作、策略、塔防、管理、卡牌游戏、物理、推理、竞速、节奏、桌游和益智等多种类型，其中不少已经达到了产品层面的深度，包含多章节战役、进度系统和跨设备存档同步。整个项目均以MIT许可开源，在线目录让你可以立即开始游玩。

![100款浏览器游戏在线目录（氛围编程 2026年开源项目）](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-100-games.webp）

!【霓虹2048：六章节、18节点远征、多模式及工具系统】(../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-100-games-neon2048.webp）

> 🔗 在线目录：[wangzifan396-wzf.github.io/mini-browser-games]（https://wangzifan396-wzf.github.io/mini-browser-games/） | 源代码：[github.com/wangzifan396-wzf/mini-browser-games]（https://github.com/wangzifan396-wzf/mini-browser-games） | 创作回顾：[我用Vibe编程制作了100款浏览器游戏并全部开源]（https://blog.csdn.net/m0_74023007/article/details/162945755）

####案例⛏️ 5：为创作者的侄子们制作的《我的世界》重制版（CraftMine，2026年）

2026年2月，开发者[Trent Sterling]（https://tront.xyz/blog/posts/craftmine/）想让他的侄子们玩*Minecraft*，但他们没有官方游戏版权，于是他直接打开一个空白的HTML文件，通过纯对话用Claude代码构建了[CraftMine]（https://tront.xyz/craftmine/）——一款**6,820行单文件**的基于网页的*Minecraft*重制版：46种方块类型（外加21个DOOM地狱主题方块）、36种生物（从鸡到拥有300生命值的泰坦Boss）、19种武器（包括BFG 9000）、5个生物群系、昼夜循环，甚至还有**P2P多人模式**。没有构建步骤——打开网页即可游玩。

![CraftMine：Minecraft重制版，单文件6,820行（用氛围编程生成）](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-craftmine.webp）

> 🔗 在线游玩：[tront.xyz/craftmine]（https://tront.xyz/craftmine/） | 开发回顾：[CraftMine：一个6820行的氛围编码Minecraft 克隆，仅一个HTML文件]（https://tront.xyz/blog/posts/craftmine/）

#### 🍄 案例6：拥有实时AI生成无限关卡的超级马里奥（2026）

2026年3月，一位开发者将开源版《超级马里奥》与OpenAI的模型结合，打造了[AI超级马里奥]（https://supermario.leanmcp.live/）：你可以游玩经典的原始关卡，或者让AI**实时生成新关卡**——在“无限模式”中，AI会随着你的进展动态生成全新的场景和敌人，测试中可连续播放45分钟。你甚至可以直接在游戏中输入文字，要求AI添加敌人、放置平台或更换主题。

![AI超级马里奥：三种玩法——经典、AI关卡和无限模式](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-ai-mario-menu.png）

![马里奥游戏，关卡由AI实时生成](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-ai-mario-gameplay.png）

> 🔗 在线游玩：[supermario.leanmcp.live]（https://supermario.leanmcp.live/） | 详细说明：[OpenAI 和 Idiomorph Power 无限马里奥关卡生成于浏览器中]（https://www.thenextgentechinsider.com/pulse/openai-and-idiomorph-power-infinite-mario-level-generation-in-browser）

####案例🇨🇳 7：一个提示让中国大语言模型Kimi K3制作了一款3D游戏（2026年）

2026年7月，开发者[Dr. Josh Simmons]（https://www.drjoshcsimmons.com/writing/kimi-k3-built-the-game-i-still-had-to-play-it）仅向中国大型语言模型 **Kimi K3** 发送了一个提示，它就打造了一个可玩的第一人称3D游戏：在程序生成的服务器设施中收集数据核心，躲避巡逻无人机，并乘坐货运电梯下三层。整个游戏在一代内即可游玩，经过两轮对话修复两个漏洞后，游戏顺利完成——费用约为**2美元**。

![由Kimi K3根据单一提示生成的3D服务器设施游戏](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-kimi-k3-game.webp）

> 🔗 在线游玩：[kimi-test-theta.vercel.app]（https://kimi-test-theta.vercel.app/） | 源代码：[github.com/jcpsimmons/kimi-test]（https://github.com/jcpsimmons/kimi-test） | 开发回顾：[Kimi K3 开发了这款游戏。我还是得玩。]（https://www.drjoshcsimmons.com/writing/kimi-k3-built-the-game-i-still-had-to-play-it）

#### 🎯 案例8：K399，Kimi官方游戏平台——数十款在线AI游戏（2026）

2026年7月17日，Moonshot AI发布了Kimi K3模型，同时推出了浏览器游戏平台[K399]（https://www.k399.games/）——数十款游戏均基于K3模型制作，且可一键游玩。这些类型涵盖了3D射击、节奏游戏、横版动作、宫廷阴谋AVG、3D谜题，甚至开放世界游戏：除了重现经典玩法的作品如《塞尔达传说》、《黑色神话：悟空》、《泡泡乐园》和《吸血鬼幸存者》之外，还有远超演示级完整度的原创游戏，如《先锋练习场》（一款具移动、跳跃、滑行、瞄准和射击功能的3D第一人称射击游戏）、开放世界的《蜘蛛朋克》以及拥有五章主线故事、八个支线任务和32个随机事件的宫廷阴谋游戏《风拳神功》。

![K399平台界面——K3游戏街机，点击任意游戏即可立即游玩](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-k399-platform-live.webp）

![SpiderPunk，K399上的一款开放世界游戏：在蜘蛛网上的赛博朋克摩天大楼间荡秋千（由K3模型生成，真实游戏画面）](../../../zh-cn/stage-1/ai-capabilities-through-games/images/case-k399-spiderpunk.webp）

> 🔗 在线游玩：[k399.games]（https://www.k399.games/）（K3 游戏街机，一键游玩）| 详细介绍：[一位前米哈游高管加入，最火的AI公司突然制作了数十款游戏]（https://eu.36kr.com/zh/p/3906895998178441）| [Kimi K3：谁开始紧张了？]（https://36kr.com/p/3905392402748801）

看完这些案例后，你会明白：**Snake只是AI编程的冰山一角**。无论是经典街机游戏、2048解谜、3D游戏、*Minecraft*和*超级马里奥*的重现、数百款游戏合集，甚至是中国大型语言模型的官方游戏平台，只要你能清晰描述想法，并愿意通过多次对话打磨，AI都能帮你从零到零构建。接下来，轮到你了！

## 📚 任务

<StageAssignmentCard 标题=“完成你的第一个AI原生小游戏”>

<p>
    在本节中，你将按照步骤体验从“对话式蛇生成”到“理解AI原生游戏设计思维”的完整过程。接下来的作业将帮助你将这些理解转化为真正的技能。
  </p>

<ol>
    <li>
      <strong>完全重现AI原生蛇类游戏</strong>
      <ul>
        <li>至少，要实现：蛇可以移动，吃“食物”会改变它的长度和得分，撞到墙壁或自己会结束游戏。</li>
        <li>在复制过程中，练习一次性发送错误描述和错误信息的关键代码片段给 AI，让它在“初学者模式”中修复问题。</li>
      </ul>
    </li>
    <li>
      <strong>（可选）创建1个原创AI原生小游戏或演示</strong>
      <ul>
        <li>它可以是任何轻量级的游戏，包含文本、图像、音乐、节奏等，比如“吃词写诗”、“节奏点击”、“生成跑者”等。</li>
        <li>重点不在于华丽的画面，而是能够清晰表达：AI具体帮了哪些忙，解决了哪些“难以手动或繁琐”的部分。</li>
      </ul>
    </li>
  </ol>

  <p>
    这就是完整的教程！你可能需要大约<strong>4小时</strong>来完成所有内容并打造自己的蛇类游戏。不要急——探索、尝试并享受这个过程。如果你在过程中遇到不太理解的概念，建议查看附录中的相关章节。
  </p>

</StageAssignmentCard>

## 附录

<el-card id=“appendix-nav” shadow=“hover” style=“margin-top： 24px; margin-bottom： 24px; border-left： 5px 实心 #67C23A;”>
  <div style=“font-weight：加粗;边距底部：8px;”>附录导航</div>
  <div style=“color： #606266; font-size： 14px; line-height： 1.6; margin-bottom： 12px;”>
    这里我们整理了一些与本章相关的基础概念：如果你在学习过程中遇到“什么是前端？”或“氛围编程 到底是什么意思？”这样的问题，随时可以回来这里查找。
  </div>
  <el-row ：gutter=“16”>
    <el-col ：span=“12”>
      <a href=“#appendix-1” style=“text-decoration： none;color： inherit;”><b>附录1：我们需要前端知识吗？</b></a><br/>
      <span style=“font-size： 12px; color： #909399”>理解前端在整体应用中的位置，并知道哪些部分是“可见”的。</span>
    </el-col>
    <el-col ：span=“12”>
      <a href=“#appendix-2” style=“text-decoration： none;color： inherit;”><b>附录2：什么是Vibe Codeding</b>？</a><br/>
      <span style=“font-size： 12px; color： #909399”>理解“对话式开发”的核心理念以及如何与人工智能协作。</span>
    </el-col>
  </el-row>
  <el-row ：gutter=“16” style=“margin-top： 10px;”>
    <el-col ：span=“12”>
      <a href=“#appendix-3” style=“text-decoration： none; color： inherit;”><b>附录3：模型上下文</b></a><br/>
      <span style=“font-size： 12px; color： #909399”>理解常见但容易混淆的概念，比如“上下文长度”。</span>
    </el-col>
    <el-col ：span=“12”>
      <a href=“#appendix-4” style=“文本-装饰：无;颜色：继承;”<b>>附录4：遵循指令</b></a><br/>
      <span style=“font-size： 12px; color： #909399”>了解为什么模型有时“不理解”以及如何写出更清晰的指令。</span>
    </el-col>
  </el-row>
  <div style=“margin-top： 12px; font-size： 12px; color： #909399;”>
    提示：你可以按Ctrl/⌘ F来搜索关键词，或者把让人困惑的段落复制给AI，让它用“完全的新手也能理解”的方式再次解释。
  </div>
</el-card>

## <span id=“附录-1”>[附录1：我们需要前端知识吗？]（#appendix 导航）</span>

::: 提示 💡 一行摘要
你不需要写代码，但理解基本概念能帮助你更有效地向人工智能描述需求。
:::

<el-row ：gutter=“16” style=“margin： 20px 0;”>
  <el-col ：span=“12” ：xs=“24” style=“margin-bottom： 16px;”>
    <el-card shadow=“hover” style=“border-radius： 12px; height： 100%;”>
      <模板 #header>
        <div style=“display： flex;align-items： center; gap： 8px;”>
          <span style=“font-size： 20px;”> 👁️</span>
          <span style=“font-weight： bold;”>前端</span>
          <el-tag 类型=“成功” size=“small”>可见</el-tag>
        </div>
      </template>
      <div style=“color： #606266; line-height： 1.8;”>
        用户能<strong>看到和点击</strong>的所有内容
        <ul style=“余距：12px 0;填充左侧：20px;”>
          <li>页面标题、文本、图片</li>
          <li>按钮、输入字段、下拉菜单</li>
          <li>游戏界面，动画特效</li>
        </ul>
      </div>
    </el-card>
  </el-col>
  <el-col ：span=“12” ：xs=“24” style=“margin-bottom： 16px;”>
    <el-card shadow=“hover” style=“border-radius： 12px; height： 100%;”>
      <模板 #header>
        <div style=“display： flex;align-items： center; gap： 8px;”>
          <span style=“font-size： 20px;”> ⚙️</span>
          <span style=“font-weight： bold;”>后端</span>
          <el-tag type=“info” size=“small”>Invisible</el-tag>
        </div>
      </template>
      <div style=“color： #606266; line-height： 1.8;”>
        服务器上运行的数据处理
        <ul style=“余距：12px 0;填充左侧：20px;”>
          <li>用户评分存储</li>
          <li>登录账户验证</li>
          <li>关卡内容分布</li>
        </ul>
      </div>
    </el-card>
  </el-col>
</el-row>

### 前端三人组

把网页想象成一栋房子。三种“代码”分别处理一件事：

- **HTML**：决定**页面上**的内容——比如先画房子蓝图
- **CSS**：决定**外观**——比如粉刷墙壁和摆放家具
- **JavaScript**：决定**它的反应**——就像开关一样：按下它，灯就会亮起

### 代码如何变成一页？

浏览器**用HTML构建框架，用CSS装饰，然后用JavaScript开启电源**——三步，网页就完成了。

### 那么，React和Vue是什么？

它们是**用于构建复杂页面的“预制工具”**——更快更可靠。你不需要学习它们;只要知道它们是帮手就行。

### 在氛围编码中

**不写代码，只是描述。** 用通俗易懂的语言与人工智能交流，例如：

> “使用 React 创建一个排行榜页面，右侧有得分列表。点击行后会显示下面的玩家详细信息。简洁、现代风格。”

想了解更多，可以查看 [Web 基础附录]（/en/appendix/3-browser-and-frontend/javascript-deep-dive）和 [前端 Evolution 附录]（/en/appendix/3-browser-and-frontend/frontend-frameworks）。

## <span id=“附录-2”>[附录2：什么是氛围编程]（#appendix 导航）</span>

> 💡 什么是 氛围编程？计算机科学家 [Andrej Karpathy](https://karpathy.ai/)（OpenAI 联合创始人之一，特斯拉前 AI 负责人）在 2025 年 2 月提出了 **vibe coding** 这一术语。这个概念指的是一种依赖大型语言模型（LLM）的编程方法，**允许程序员通过提供自然语言描述而不是手动编写代码来生成可运行的代码。**

![1767350588191](../../../zh-cn/stage-1/ai-capabilities-through-games/images/1767350588191.webp)

字面上，氛围编程 可以理解为一种“通过对话进行开发”的方式。核心变化是：你不再需要逐行编写代码、查询语法或自己调试。取而代之的是，你直接用自然语言描述你想要的内容，例如：

"我需要一个登录页面，有手机号输入框和验证码输入框。"
"登录成功后，重定向到首页，并在右上角显示用户名。"
"给我一个简易的贪吃蛇游戏，可以用键盘方向键控制。"

大型语言模型（LLM）会自动将这些描述翻译成真实、可运行的代码，并生成对应的页面、逻辑和数据结构。在看到结果后，你可以用自然语言提出修改意见，例如“把按钮做大一点”“把背景改成深色”“记录分数并显示排行榜”，AI 会继续根据你的要求调整实现。

在这种模式下，你不需要先学习一门编程语言再开始写代码。相反，你将主要精力集中在：清楚地说明你想做什么、在看到结果后判断“哪里不对”、然后提出新的修改。AI 负责将这些高级想法转化为具体实现，大大减少了机械、重复的编码工作。

你可以点击这里了解更多关于 vibe coding 的内容：[https://www.ibm.com/think/topics/vibe-coding](https://www.ibm.com/think/topics/vibe-coding)

你可以点击这里查看更多 Karpathy 分享的内容：[https://karpathy.bearblog.dev/blog/](https://karpathy.bearblog.dev/blog/)

### 如何假装自己是 氛围编程 大师

在实际操作中，在真正进行 vibe coding 时，我们通常不会使用很多复杂的提示。也许在一开始，为整个程序需要一个具体且中等复杂的提示，但之后每一步，你可能只需要类似这样的提示：

```
"There's a bug in the code, please fix it."
"I don't want partial code, give me the complete modified code."
"Your code still has problems."
"Please modify again and give me the complete corrected code."
"It was working before, why isn't it working now?"
"Did you not understand what I meant? Don't change my original code."
"Don't add any debugging features."
"Don't do things I didn't ask you to do."
"Where is the feature I asked you to implement?"
"Can you not understand what I'm saying?"
"I only want one function."
"I told you to refer to my previous code."
"Please don't add unnecessary comments."
"Please don't modify the basic logic of my original code."
"Help me modify the code."
"Modify based on my code..."
"Don't change my variable names!!!"
"Don't change the original function names!"
"Don't mess with my variables."
"Don't add extra features."
"Don't just generate a skeleton, generate the complete code."
```

这听起来可能有些夸张，但实际上，这些正是我们在日常工作中可能会使用的提示。由于大型语言模型的**上下文长度限制**，或者有时因为它们的**指令跟随能力**不强，模型可能会忘记对话中之前讨论的内容。在氛围编码中，我们倾向于使用具有长上下文和强指令跟随能力的模型。我们可以通过排名或衡量这两个方面来判断模型是否优秀。

另外，由于训练数据集的风格，大型模型往往会按照训练数据的风格做出反应。例如，有些模型说话非常严肃，有些喜欢添加大量装饰，还有些模型喜欢给代码添加大量注释或不必要的模块。

## <span id=“附录-3”>[附录3：模型上下文]（#appendix 导航）</span>

模型上下文可以理解为人工智能的短期记忆。它指的是模型在单次对话或任务中能够“看到”和“记住”的所有文本内容，包括你之前的问题、系统提供的说明、相关材料等。

正是因为上下文，人工智能才能理解你是在从之前的内容延续，从而实现一轮又一轮连贯自然的对话。没有上下文，你说的每一句话对模型来说都像是全新的问题——它不会知道你之前说了什么，也无法继续对话。

每个模型都有其有效的上下文长度（上下文窗口）。该长度通常以词元（大致可理解为“词片段”单位）来衡量，目前大多数主流模型的词元数范围在32k到128k之间。上下文越长，模型一次能“读取”的内容越多，例如：

- 一次性阅读整篇长篇论文或报告
- 在同一对话中引用多个材料和案例
- 让模型记住几轮前复杂讨论的结论

当输入接近或超过模型的上下文极限时，通常会出现一些常见现象：

- 模型开始忘记长文中早期的细节或关键信息
- 随着对话进行，话题逐渐偏离最初的目标
- 在不同问答中，针对同一内容，引用内容变得不一致

这些现象并不意味着模型突然“变笨”——它们是上下文容量被消耗或几乎用尽的自然结果。

在实际使用中，我们希望上下文尽可能长，同时也要意识到：

- 上下文越长，消耗的计算资源越多
- 相应的API成本（费用）也会相应增加

因此，在设计AI应用时，你需要在让模型看到足够信息的同时，控制成本和提高效率之间取得平衡。例如：

- 在输入模型前提炼真正需要长期保留的信息
- 避免反复将不再需要的细节信息塞入上下文中
- 利用外部知识库及类似方法，将“长期记忆”交给系统，而非强行嵌入模型上下文中

## <span id=“附录-4”>[附录4：后续指令]（#appendix 导航）</span>

遵循指令是指：在模型理解你的指令后，它是否能够根据你的要求准确且完整地执行。这不仅包括回答问题，还包括以指定的格式、风格和步骤完成任务。

例如，以下都是对模型有明确要求的指令：

- 将本文总结为三要点
- 用正式、礼貌的语气写一封回复邮件
- 将这个词翻译成英文，并为每个词造一个例句
- 从文章中提取作者、时间和主要事件

具有较强指令遵循能力的模型通常具有以下特征：

- 输出内容数量符合要求
  例如，如果要求总结三要点，它不会给出五个。
- 涵盖所有指定元素
  例如，如果要求提取作者、时间和事件，它不会遗漏任何一项。
- 遵循指定格式和语气
  例如，如果要求使用正式语气，它不会输出过于口语化的回复。
- 不进行不必要的额外扩展
  例如，如果只要求翻译并造句，它不会输出一大段无关说明。

在实际应用中，强指令遵循能力非常重要，原因如下：

- 提高稳定性：相同指令在不同时间和多次运行中产生的输出结构和行为模式更加一致，不容易偏离预期。
- 提高可重复性：当将提示配置到产品或工作流程中时，你可以大致预测模型的响应，使测试和迭代更容易。
- 更易于系统集成：当模型输出符合预期格式时，更容易与后台程序、工作流程或其他工具自动对接。

因此，在选择和评估大型语言模型时，除了关注其智能程度和知识覆盖面之外，还需要特别关注其指令遵循能力。对于工业级应用来说，能够稳定且准确地执行指令通常比偶尔给出惊人答案更为重要。