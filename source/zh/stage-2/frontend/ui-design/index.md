<脚本设置>
从 '@theme/data/relatedArticles' 导入 { relatedArticlesMap }

const relatedArticles = relatedArticlesMap['zh-cn/stage-2/frontend/ui-design'] ？？[]
</script>

# 构建你的第一个现代应用 - 界面设计

还记得第一次偶然发现一个设计精美的产品页面时的感觉吗？即使功能相似，别人的页面看起来也更“高级”：干净的颜色、舒适的空白、完美圆润的按钮。你不禁会想——**“他们是怎么设计的？我们也能做出这样的页面吗？”**

那种“弄明白别人是怎么做的”的冲动正是前端设计的最佳起点。在深入之前，让我们回顾一下已经掌握的内容：

- 在之前的课程中，我们学会了用NanoBanana批量生成设计素材，并理解提示中的“风格”如何塑造最终输出;
- 我们了解了专业设计工具，如Figma和MasterGo，以及设计文件的组织方式;
- 我们还看到了将设计文件转化为前端代码的流程。

但当你真的需要为自己的项目构建一个不错的页面时，你仍然可能会卡住：你知道如何使用工具，也能生成素材，却**不知道什么是“好看”，更别说如何拆解并模仿一个优秀的页面了**。别担心——本课正是针对这个问题的。

为了帮助你把所有东西联系起来，先考虑几个小问题：

1. 现代网页通常包含哪些部分？
2. “好看”是一种主观感受，还是可以用数字（颜色值、字体大小、间距、角落半径）来量化的东西？
3. 如果你必须模仿网站的视觉风格，你会从哪里开始？

如果你还没有明确的答案，也没关系——这正是这堂课要教给你的。如果你遇到难以跟上的步骤，可以截图当前页面，并向大型语言模型提问;不要害怕尝试和犯错——每一次尝试都是学习和提升的机会。

::: 提示 🎯 核心问题
**当面对一个设计精美的应用或网站时，你如何分析它的设计过程，并用AI设计工具将其重现，直到与原版无法区分？**
:::

---

## 你将在这节课中学到什么

1. **学会“看”设计**：拿到一页时，要知道该看什么以及如何拆解
2. **掌握入门级方法**：寻找参考文献→分析→模仿→匹配，→开始
3. **了解两条设计路线**：Figma/MasterGo和Claude Design/开放设计（包括界面设计技能）
4. **亲手模仿**：选一个真实网页，从零开始进行高保真切换
5. **整合设计系统**：将大科技设计规则变成您自己的规则

::: 提示 📚 先决条件
本教程适合已经使用AI编码工具（如Trae）并希望完善前端视觉技能的开发者。如果你想先熟悉图像生成，我们建议从[NanoBanana Asset Production]（../lovart-assets/）;想更深入地学习设计工具，可以结合[Figma和MasterGo Basics]（../figma-mastergo/）。
:::

---

## 第一章：前端设计从“复制”开始

在上一节中，我们提出了三个问题——页面包含哪些部分，“好看”是什么意思，以及如何模仿。本节从方法论开始：**前端设计的第一课不是创造，而是复制。**

就像你临摹书法作品来学习书法，或者画石膏像来学习绘画，为什么要“临摹”呢？

- 设计的“优劣”是可以量化的——**颜色数值、字体大小、间距、圆角半径、阴影**都是数字
- 当你逐像素复制成熟设计时，你被迫去理解其背后的每一个决策
- 一旦你能“还原原作”，下次面对类似场景时，你就会知道“从哪个方向去临摹”

![](/zh-cn/stage-2/frontend/ui-design/images/design-reference.jpg)

> 💡一句话总结：**能够模仿一个优秀的产品意味着你已经掌握了前端设计的基础；能够在此基础上进行修改，则意味着你真正毕业了。**

### 1.1 为什么模仿是最快的入门方式

有人会担心：“我在抄别人的作品——我真的能学到东西吗？”答案是：能，而且这是最快的路径。这是因为模仿不是复制结果，而是**强迫自己重建设计过程**：

- 你被迫测量每一个间隙，从而理解“空白如何创造呼吸感”
- 你被迫查每一个颜色数值，从而理解“为什么这个配色看起来协调”
- 你被迫比较每一层层级关系，从而理解“主要信息和次要信息是如何排列的”

当你能够“将优秀页面拆解到参数级别”并重建它时，你对设计的理解已经超过了许多仅凭感觉设计的人。

### 1.2 连大公司也在“参考”——这不是秘密

参考本身就是设计师工作流的一部分：Pinterest 求灵感，Dribbble 看趋势，竞争对手分析看结构。AI 时代放大了这一点——因为工具可以直接将“参考”变成可执行能力：

![](/zh-cn/stage-2/frontend/ui-design/images/design-inspiration.jpg)

- Claude Design 可以导入你保存的参考网站，并生成其风格的初稿
- Open Design 提供 151 个开源设计系统，你可以一键应用到你的项目中
- 各种 UI 设计工具包将“大厂视觉规范”打包成 AI 可执行指令

所以，你的问题不应该是“我能否抄袭”，而是“**如何专业、合法地临摹，并最终做出属于自己的作品**”。

#### 哪里找参考？先收藏这些网站

参考的第一步是**建立‘参考库’**。以下网站按用途分组——全部收藏，根据需要使用：

|网站 |目的 |需要注意什么 |
|:--- |:--- |:--- |
|[惊叹]（https://www.awwwards.com） |网页设计界的“奥斯卡” |顶级的创意、动态与互动——了解“天花板”长什么样 |
|[近期（前称Godly）]（https://godly.website） |高质量网页灵感画廊 |人工智能、Web3及作品集网站的前沿设计 |
|[土地手册]（https://land-book.com） |策划的登陆页设计 |按行业/配色筛选官方网站、定价页面和英雄布局 |
|[拉帕忍者]（https://www.lapa.ninja） |一个包含7300张着陆页截图的库 |按元素查找导航、功能展示和客户评价 |
|[群众]（https://mobbin.com） |真实应用界面库 |研究真实页面和产品流，如Uber和Notion|
|[滴答]（https://dribbble.com） |设计师社区 |色彩调色板、图标、插画风格与微互动灵感 |
|[Behance]（https://www.behance.net） |完整项目案例库 |设计思维、研究流程与完整作品集 |

这些网站是什么样的？抢先一看（点击图片可放大）：

![Awwwards — 网页设计的“奥斯卡”]（/zh-cn/stage-2/frontend/ui-design/images/site-awwwards.jpg）

![近期（前Godly）——高质量网页灵感库]（/zh-cn/stage-2/frontend/ui-design/images/site-godly.jpg）

![Landbook — 策划的登陆页设计]（/zh-cn/stage-2/frontend/ui-design/images/site-landbook.jpg）

![Lapa Ninja — 一个包含7300张着陆页截图的库]（/zh-cn/stage-2/frontend/ui-design/images/site-lapa.jpg）

![Mobbin — 真实应用界面库]（/zh-cn/stage-2/frontend/ui-design/images/site-mobbin.jpg）

![Dribbble — 设计师社区]（/zh-cn/stage-2/frontend/ui-design/images/site-dribbble.jpg）

![Behance — 完整项目案例库]（/zh-cn/stage-2/frontend/ui-design/images/site-behance.jpg）

::: 提示 💡 自己构建参考库
当页面吸引你的注意时，**截图并立即保存链接**，然后按“着陆页/组件/配色方案/动态”分类。模仿时，直接从这个库里选目标——比现场上网搜索快得多。
:::

### 1.3 参考与抄袭：清晰的界限

|尺寸 |参考文献（推荐✅） |复制（危险❌） |
|:--- |:--- |:--- |
|目标 |版面结构、视觉风格、设计规则 |品牌标志、专有图标、原创插图 |
|方法 |理解后重做，融合成你自己的产品 |直接复制素材、代码和图片 |
|结果 |感觉是风格，但内容完全不同 |连文案、颜色和素材都完全相同 |
|风险 |低 |高版权/商业风险 |

第七章将详细讨论版权边界;现在请记住一句话：**复制“规则”没问题，但复制“结果”是危险的。**

---

## 第二章：先看，再设计——拆解一页

“匹配原文”的前提是“理解你所看到的内容”。本章为你提供了一个通用的框架，帮助你拆解任何页面。

![]（/zh-cn/stage-2/frontend/ui-design/images/page-structure.jpg）

### 2.1 看结构：页面由哪些部分组成

绝大多数现代网页可以分为四个主要区块：

```
┌─────────────────────────┐
│ ① Navbar                 │  Logo · Menu · Login/CTA
├─────────────────────────┤
│ ② Hero                   │  Headline · Subheadline · Primary Button · Product Shot
├─────────────────────────┤
│ ③ Content Sections       │  Feature Cards · Data · Testimonials · Pricing
├─────────────────────────┤
│ ④ Footer                 │  Links · Copyright · Newsletter
└─────────────────────────┘
```

在浏览页面时，不要先关注细节——**用眼睛勾勒它的“骨架”**：哪个部分是导航栏，哪个是主视觉区域，中间有多少段落，每个段落有多少元素。

### 2.2 查看视觉元素：4 个可量化元素

| 元素 | 查看内容 | 如何记录 |
| :--- | :--- | :--- |
| **颜色** | 主要颜色、背景色和文本颜色 | 使用取色器直接选择十六进制值 |
| **排版** | 标题/正文使用的字体、大小和字重 | 在浏览器开发者工具中检查 font-family/size/weight |
| **间距** | 各部分之间以及卡片内部的空白 | 记录常见的 8 / 16 / 24 / 48 像素节奏 |
| **圆角与阴影** | 卡片和按钮的圆角及阴影强度 | 在开发者工具中检查 border-radius / box-shadow |

::: tip 💡 前端设计的内建优势
**作为前端开发者，开发者工具就是你的设计分析器。** 右键 → 检查，页面的颜色值、字体大小、间距和圆角信息都完全暴露出来。这是设计师梦寐以求的能力，而开发者天生就拥有。

常用取色工具：Chrome 开发者工具中的取色器、`color-picker` 类型的扩展程序；你也可以将截图丢给多模态大语言模型，让它为你提取设计规范。
:::

### 2.3 查看组件：拆解“可复用部分”

将页面分解为组件，并记录每个组件的样式参数：

```text
Button (Primary)
- Background: #4F46E5
- Text: #FFFFFF, 14px / 600
- Border radius: 8px
- Padding: 12px 24px
- Shadow: 0 2px 8px rgba(79,70,229,0.3)

Card
- Background: #FFFFFF
- Border radius: 16px
- Border: 1px solid #E2E8F0
- Shadow: 0 4px 12px rgba(15,23,42,0.08)
```

在拆解 3-5 页之后，你将手握一个“组件样式库”——这是你自己的设计系统的种子。

### 2.4 将“你看到的内容”翻译成“AI 能理解的语言”

在 AI 工具中进行模仿时，你需要将视觉内容转化为结构化的描述。**观察得越仔细，翻译就越准确，AI 模仿得也就越好。**

```text
Follow the style of this landing page and build a page with the same structure:
- Structure: navbar + hero + 3 feature cards + pricing section + footer
- Colors: primary Indigo #4F46E5, background #F8FAFC, text #0F172A
- Typography: headings Space Grotesk 700, body Inter 400
- Spacing: sections 96px, cards 24px, grid 24px
- Radius: cards 16px, buttons 8px
- Shadow: 0 4px 12px rgba(15,23,42,0.08)
```

---

## 第三章：AI时代前端设计工具全景

“他们是怎么设计的？”答案越来越多样化。这里有两条典型路线，从“手动精细控制”到“对话式自动生成”。

![](/zh-cn/stage-2/frontend/ui-design/images/ai-design.jpg)

### 3.1 路线 1：Figma / MasterGo — 专业设计工具

如果你需要的是**可编辑、可协作、像素级可控的设计文件**，可以使用 Figma（国际主流）或 MasterGo（国内，学习曲线更轻）：

- 在画布上布局、调整组件并构建交互原型
- 使用 Figma Make / MasterGo AI 等功能辅助生成和批量调整
- 最后将设计文件交给前端开发实现，或通过插件转换为代码

![Figma 编辑器：左侧为图层面板，中间为画布，右侧为属性面板](/zh-cn/stage-2/frontend/ui-design/images/figma_editor.jpg)

![MasterGo 编辑器：一款国内云端设计工具，画布布局类似 Figma](/zh-cn/stage-2/frontend/ui-design/images/mastergo_editor.jpg)

> 最适合：需要严格设计文件交付、团队协作以及复杂交互的场景。工具操作参考 [Figma 和 MasterGo 基础](../figma-mastergo/)。

### 3.2 路线 2：Claude Design / Open Design — 对话式设计画布

这类工具的共同点是**直接用自然语言生成交互式设计原型**，而不是静态图片。代表性工具有 Claude Design 及其开源替代方案 Open Design。

#### Claude Design：官方对话式设计画布

Claude Design 是 Anthropic 推出的 AI 设计产品（入口 `claude.ai/design`）：

- 输入一句需求，默认生成 3 个设计方案，涵盖落地页、线框图、演示文稿等
- 支持导入设计系统（GitHub 仓库、Figma 导出文件、网站截图、品牌文件）并自动提取颜色/字体/组件
- 可在画布上直接评论和微调，通过拖拽进行精细调整，然后导出 HTML / PDF / PPTX，或交给 Claude Code 转化为真实代码

**典型使用场景：**

**① 直接从参考截图重建高保真页面（最常见）**

描述你的产品和风格参考，Claude 会自动生成完整的落地页——左侧对话记录展示提示和生成过程，右侧画布实时渲染结果。

```text
Create a high-fidelity landing page designed to raise $500,000 from angel investors
for "雾屿咖啡 Mist Island Coffee" - a boutique specialty coffee shop that combines
premium coffee, quiet workspaces, and warm community events.
Tone should feel warm, premium, calm, and trustworthy - think a mix of Blue Bottle
Coffee + Apple Store + minimalist lifestyle design.
```

![Claude Design 实战：一个高保真 Mist Island Coffee 的登陆页，左侧是对话和进展，右侧画布上完整英雄部分显示]（/zh-cn/stage-2/frontend/ui-design/images/claude_case_landing.jpg）

**（2） 默认有3种设计变体——先选定方向，再完善**

Claude Design 不会只给你一个答案;它默认生成多个方向供你选择——编辑风格、博物馆风格、杂志风格等。点击其中一个，进行细化。

![真实案例：一位PCWorld记者请Claude解释AI代币，并获得了编辑/博物馆/现场笔记样式可选]（/zh-cn/stage-2/frontend/ui-design/images/claude_case_variants.jpg）

**（3） 生成交互式原型（而非静态图像）**

生成的页面是真正可点击、可输入的 HTML 格式——按钮有悬停效果，表单接受输入，数据实时计算。

![生成的代币说明页：内置实时代币管理器在你输入时用彩色块高亮每个代币，底部标注字符/单词/代币数量]（/zh-cn/stage-2/frontend/ui-design/images/claude_case_interactive.jpg）

**（4） 构建产品演示 / PPTs**

除了网页外，它还能生成完整的幻灯片资料片（多页，带导航，可导出为PDF/PPTX）。

![实际输出：一份咖啡品牌推介卡，左侧有13页大纲，右侧渲染当前幻灯片，底部有页面导航]（/zh-cn/stage-2/frontend/ui-design/images/claude_case_slide.jpg）

**（5） 生成动画视频**

通过“From template”，你可以制作动画HTML视频——分镜脚本加上实际渲染的动画帧，并带有播放控制栏。

![真实输出：一段45秒的咖啡制作动画视频，左侧有分镜时间线，右侧画布上播放动画（咖啡豆→烘焙→煮泡）]（/zh-cn/stage-2/前端/UI-design/图片/claude_case_video.jpg）

**（6） 对现有设计进行迭代（直接在画布上评论）**

生成原型后，无需重写提示——点击“评论”按钮，圈出元素，写评论，Claude 就会进行本地修改。

![点击画布上的评论按钮，圈出任意元素以打开评论框，并写入“建议给Claude”以在本地迭代]（/zh-cn/stage-2/frontend/ui-design/images/claude_case_comment.jpg）

**（7） 移动应用页面设计**

支持指定设备大小（如 iPhone）并生成带有设备帧的移动用户界面原型。

![真实输出：板球计分应用（Tracket）的移动界面——深色头部显示动作按钮，设计高对比度，适合户外阳光]（/zh-cn/stage-2/frontend/ui-design/images/claude_case_mobile.jpg）

![Claude Design 画布概览：左侧为对话，右侧为可实时调整主题、断点、颜色及其他参数的 Tweaks 面板]（/zh-cn/stage-2/frontend/ui-design/images/claude_design_canvas.jpg）

> 最适合：没有设计背景、想跳过Figma学习曲线、快速获得互动原型的人。

#### 开放设计：Claude 设计的开源替代方案

如果你不想订阅，或者更关心数据隐私，可以尝试 Open Design（nexu-io 开源项目）。它遵循与 Claude Design 相同的路线：**对话式生成设计原型**——不同之处在于它是**本地优先、自带模型密钥（BYOK），且不绑定任何代理**。

它有两个核心概念：

| 概念 | 描述 | 对你的价值 |
| :--- | :--- | :--- |
| **技能** | 16 种基于指令的设计技能（文案、配色方案、创意指导、头脑风暴……） | 一项技能 = 一个专业任务模板 |
| **模板** | 288 个可运行模板（原型、幻灯片、动态效果……），每个都有一个 `example.html` | 分叉一个模板，替换为你的数据，即可交付 |
| **设计系统** | 151 个可移植设计系统（配色方案、排版、动态效果、写作风格） | 用一句话应用大科技公司的视觉规范 |

它会检测你的本地编码代理（Claude Code、Codex、Cursor、Qwen、Kimi 等 —— 官方支持 21 种）作为“设计引擎”——**你现有的代理就是设计师**。此外，在像 Claude Code 这样的生态系统中的 **UI 设计技能**（例如 frontend-design）可以将设计规则打包为 AI 可执行的指令，这样 AI 输出就会遵循规格。

**典型使用场景：**

**① 新项目：选择技能 → 设计系统 → 完整度**

在创建原型时，你可以选择线框图或高保真，指定目标平台（响应式网页 / 移动端等），并从 150 个内置设计系统中选择一个作为视觉基础。

```text
Use Open Design with the Linear design system to generate a landing page HTML for a SaaS product
```

![Open Design 新原型对话框：中文界面，带有原型/幻灯片/媒体选项，线框/高保真切换，以及设计系统和目标平台选择](/zh-cn/stage-2/frontend/ui-design/images/od_case_create.jpg)

![Open Design 提供 150 个设计系统（Agentic、Airbnb、Airtable、Linear、Stripe、Vercel……），按类别分组，每个系统都有颜色调色板预览和描述](/zh-cn/stage-2/frontend/ui-design/images/od_case_designsystems.jpg)

**② Studio 工作区：以对话为驱动，实时生成**

左侧是对话面板（显示 AI 的思考步骤、Todo 列表和写作操作），右侧是 iframe 画布实时渲染输出——类似于 Claude Design，但底部显示正在调用的本地 CLI 代理（Claude Code、Codex、deepseek 等）。

![Open Design Studio 工作区：左侧的聊天面板显示生成计划和进度，右侧画布以幻灯片模式渲染大型“Open Design”封面页，顶部有预览/源文件/评论/编辑标签](/zh-cn/stage-2/frontend/ui-design/images/od_case_studio.jpg)

**③ 应用设计系统生成幻灯片/PPT**

选择幻灯片类型，输入主题，即可生成完整的多页演示文稿。下图为社区用户使用 Open Design 生成的中文演讲幻灯片。

![真实用户案例：演讲幻灯片封面，题为“一人公司·AI 折叠的组织”——深色背景，大号衬线标题，演讲者信息，底部有页面导航](/zh-cn/stage-2/frontend/ui-design/images/od_case_deck.jpg)

**④ 生成高保真移动应用原型**

支持一次预览多个屏幕，自动生成 iPhone 设备框架，并包含标签栏、卡片布局、进度条及其他组件。

![真实生成案例：游戏化生活管理应用（Level）——三个屏幕并排预览，包括每日任务首页、任务分类仪表盘和任务详情页，浅色模式，卡片多彩](/zh-cn/stage-2/frontend/ui-design/images/od_case_mobile.jpg)

**⑤ 使用 UI 设计技能规范 AI 输出**

在 Claude Code / Cursor 中安装 frontend-design 等技能，AI 在编写页面时会自动遵循设计规范：

```text
# Call inside Claude Code
/frontend-design implement a login page for me
→ Automatically outputs following the Skill's built-in design specs:
   - Colors: primary #4F46E5, success #10B981, error #EF4444
   - Spacing: 8px base grid
   - Components: accessible Button / Input / Form
   - Responsive: mobile / tablet / desktop
```

**⑥ 本地私人项目永不离开网络**

对于包含敏感数据的内部项目或产品设计，所有文件均在本地处理，模型可通过本地部署或自带密钥（BYOK）运行：

```text
# Start Open Design locally, with a locally deployed Qwen model
OPENAI_API_KEY=your-local-key OPENAI_BASE_URL=http://localhost:8000/v1 \
opendesign
# All design files are saved locally in ~/.open-design/, never passing through any third-party server
```

![Open Design 首页：选择一个技能（原型/幻灯片/图片/视频等），并描述您希望生成的内容，本地 CLI 代理将自动作为引擎运行](/zh-cn/stage-2/frontend/ui-design/images/opendesign_home.jpg)

> 最适合：重视数据隐私、已经拥有编码代理，并希望完全掌控设计流程的开发者。

### 3.3 如何在两条路线之间选择

| 对比 | 路线 1：Figma / MasterGo | 路线 2：Claude Design / Open Design |
| :--- | :--- | :--- |
| 定位 | 专业设计文件工具 | 对话式 AI 设计画布 |
| 代表工具 | Figma, MasterGo | Claude Design（官方）、Open Design（开源替代方案） |
| 输出 | 可编辑的设计文件 | 交互式 HTML 原型 |
| 学习曲线 | ⭐⭐ 中等 | ⭐ 低 |
| 成本 | 提供免费套餐 | Claude Design 需要订阅；Open Design 是开源且免费（自备工具） |
| 最适合 | 严谨的交接与协作 | 快速原型、优先隐私 |

::: tip 💡 实际结合使用
**参考 → 设计 → 交付** 可以灵活混合：使用 Claude Design / Open Design 快速获得方向和原型 → 最终定稿后导入 Figma/MasterGo 进行微调 → 再交给 Claude Code 编写代码。每条路线可以互补。
:::

![](/zh-cn/stage-2/frontend/ui-design/images/design-tools.jpg)

---

## 第四章：动手实践 1 —— 模仿“别人的网页”以实现匹配

目标非常明确：**选择一个你喜欢的真实网页并模仿，直到“匹配”。** 这里我们以登录页作为示例。

![](/zh-cn/stage-2/frontend/ui-design/images/design-workspace.jpg)

### 第一步：选择目标

选择一个结构清晰且你感兴趣的登录页面（SaaS 首页或产品介绍页都可以）。保存其截图和链接。

### 第二步：使用第二章的框架拆解

在浏览器中右键 → 检查，并按四个步骤记录：

```text
Target: some SaaS official website landing page
① Structure: navbar(Logo/Menu/CTA) → hero(headline/subheadline/button/screenshot) → 3 feature cards → pricing(3 tiers) → footer
② Colors: primary #0F172A dark, accent #6366F1, background #FFFFFF / #F8FAFC
③ Typography: headings Inter 800 48px, body Inter 400 16px
④ Components: buttons radius 8px/solid, cards radius 16px/light gray background/no border
```

### 第三步：将其输入 AI 设计工具并生成第一个版本

将分解内容交给 Claude Design / Open Design，并让其按照这些规格生成：

```text
Generate a landing page with the same structure following these design specs:
[paste the Step 2 breakdown notes]
Product: my project (one sentence describing its purpose)
Requirement: follow the color, typography, spacing, and radius specs above at the pixel level
```

第一种版本通常是“精神接近但形式不近”——结构正确，但细节有所不同。**这不是失败;它正是告诉你下一步该如何调整的。**

### 步骤4：逐节比较并迭代

把参考截图和生成的结果放在一起，逐节比较，然后用“修改命令”来弥合差距：

|发现问题 |修改命令 |
|:--- |:--- |
|原色太亮 |“将原色改为 #0F172A，强调色改为 #6366F1” |
|按钮半径错误 |“给所有按钮均匀的8像素半径，背景实心” |
|间距太紧 |“将部分间距改为96像素，卡片填充改为24像素” |
|排版错误 |“将标题切换为Inter 800，正文切换为Inter 400” |
|装饰元素太多 |“去除背景装饰，只保留核心内容” |

### 步骤5：接受标准——“匹配”

你怎么知道自己已经开始了？为自己设定一个客观的标准：

- [ ] 截两张图：原始页面和你的模仿页面
- [ ] 并排放大并逐像素比较
- [ ] 颜色值、字体大小、间距和角角半径显示**无明显布局差异**
- [ ] 缩小到50%再对比——你仍然分不清哪个是原版

> 💡 **“匹配”不是目标;而是手段。** 在模仿了2-3种完全不同风格的网站后，你自然会积累出一种“设计感觉”：什么时候用宽裕的空白，什么时候用高饱和度，什么时候降低角落半径。到那时，模仿新页面会快得多。

---

## 第五章：动手操作2——从设计到编程

被模仿的设计/原型最终必须成为你产品中的真实页面。两条交接路径：

![]（/zh-cn/stage-2/frontend/ui-design/images/design-to-code.jpg）

### 5.1 路径A：人工智能设计工具→前端代码

- **Claude Design**：在画布上最终定稿后，使用 `/design-sync` 同步到 Claude 代码，继续直接从设计中编写代码，无需从截图中重写
- **Open Design**：直接导出 HTML，然后让代理将其重构为项目组件
- **Figma/MasterGo**：通过插件或MCP导出React / Vue代码

### 5.2 路径B：多模态大型语言模型重建截图→

最简单的方法是：直接把最终设计截图放进多模态LLM，“重构为React组件”，然后逐段完成。

> 关于三条“设计到代码”路径的详细比较，请参见[从设计原型到项目代码]（../design-to-code/）。关于组件级工程效率，也可以查看[用现代组件库更新你的UI]（../modern-component-library/）。

---

## 第六章：打造属于你自己的大型科技设计系统

模仿三页后，你会发现：**每一页好看的页面都建立在一个稳定的“设计体系”之上**。与其从零开始构建一个，不如站在巨人的肩膀上。

![]（/zh-cn/stage-2/frontend/ui-design/images/design-system.jpg）

### 6.1 什么是“便携设计系统”

Open Design 将设计系统转化为 `DESIGN.md` 文件（线性、Vercel、Stripe、Apple、Cursor、Figma 等），而 Claude Design 则自动从你的代码仓库/设计文件中提取这些文件。它们的核心是一样的：

```text
DESIGN.md  =  color tokens + typography rules + spacing rhythm + component styles + usage conventions
```

一个真实的示例结构：

```markdown
# Design System: Linear

## Colors
- background: #08090A
- primary: #5E6AD2
- text: #F7F7F8

## Typography
- heading: 22px / 600, letter-spacing -0.4px
- body: 14px / 400

## Radius
- card: 8px
- button: 6px

## Spacing
- 4 / 8 / 12 / 16 / 24 / 32 px

## Do / Don't
- Do: generous whitespace, restrained use of color
- Don't: no gradients, no stacked shadows
```

### 6.2 构建你自己的设计系统的三步

1. **选择基础**：应用一个你认可的大型科技公司的设计系统（例如，Linear 的简约暗色风格，Apple 的留白设计）
2. **调整参数**：将主色替换为你的品牌色，调整圆角半径和间距
3. **整合到一个文件中**：将其保存为 `DESIGN.md` 或 Skill，以便 AI 在每次生成时自动遵循

### 6.3 更进一步：通过 UI 设计 Skill 固定你的风格

一旦你将设计系统打包为 Skill，只需一句话即可调用它：

```text
Use the my-brand skill design specs to generate hero concepts for 3 feature pages
```

有关如何创建和使用技能，请参见 [用 LLM 和技能让你的 UI 更美观](../llm-skills-beautiful/)。

---

## 第七章：版权与道德

你的模仿技能越强，就越需要坚持原则：

![](/zh-cn/stage-2/frontend/ui-design/images/copyright.jpg)

**复制规则，而不是结果。** 布局、配色方案、间距——这些“规则”可以学习；标志、图标、插图和文案——这些“结果”不应直接复制。

**商业项目要谨慎。** 在商业交付前，确认：素材版权、字体许可（商业字体需要购买）以及参考网站的使用条款。

**AI 生成内容的署名。** 不同平台（Claude Design、Open Design 等）有不同条款——在商业使用前请检查服务协议。

**披露 AI 参与。** 一些平台/法规要求披露内容由 AI 生成。

**最终把关。** 对于品牌识别和广告材料等敏感场景，务必进行人工审核。

::: tip 💡 建议
在学习和原型阶段可以自由模仿；**进入商业交付时，将“参考”转化为“基于你自己的设计系统的再创作”，并保留生成记录**。
:::

---

## 总结

本章将“前端设计入门”转化为可执行路径：

1. **心态**：前端设计从“复制”开始——复制规则，不复制结果
2. **观察**：拆解任意页面为三层——结构（4 大块）、视觉（颜色/排版/间距/圆角）、组件，使用 DevTools 作为分析工具
3. **工具**：两条路径——Figma/MasterGo（精细设计文件）、Claude Design / Open Design + UI 设计技能（会话式原型）
4. **模仿**：选择目标 → 拆解 → 生成 → 分部迭代 → 像素级验收比较
5. **巩固**：将大厂 DESIGN.md 转化为自己的设计系统，然后用 Skill 固定下来

::: tip 💡 下一步
今天完成一次完整的模仿练习：
1. 找到你想“复制”的登陆页面，用 DevTools 提取其颜色/排版/间距/圆角
2. 使用 Claude Design 或 Open Design 生成第一个版本，并逐部分迭代直到“匹配”
3. 将最终设计交给 AI 生成代码，并保存你自己的 DESIGN.md
:::

<RelatedArticlesSection
  title="相关文章"
  description="深入了解 AI 设计、素材制作以及设计到代码的实践。"
  :items="relatedArticles"
/>